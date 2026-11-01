import { Request, Response, NextFunction } from 'express';
import net from 'net';
import { getClientIp, isAdminAuthenticated } from './auth';
import { logServerEvent } from '../services/loggerService';

// ============================================================================
// 1. MULTI-TIER SLIDING-WINDOW RATE LIMITER
// ============================================================================

interface RateBucket {
    count: number;
    resetAt: number;
    violations: number;
    blockedUntil: number;
}

const rateBuckets = new Map<string, RateBucket>();

// Periodic cleanup to prevent memory leaks
setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of rateBuckets.entries()) {
        if (now > bucket.resetAt && now > bucket.blockedUntil) {
            rateBuckets.delete(key);
        }
    }
}, 60 * 1000).unref();

export type RateTier = 'AUTH' | 'ADMIN_MUTATION' | 'SCRAPER_API' | 'GENERAL' | 'MEDIA_STREAM';

interface TierConfig {
    windowMs: number;
    maxRequests: number;
    blockDurationMs: number;
}

const TIER_CONFIGS: Record<RateTier, TierConfig> = {
    // Strict brute-force protection on login, 2FA, unlock, and vault endpoints
    AUTH: {
        windowMs: 5 * 60 * 1000, // 5 minutes
        maxRequests: 15,
        blockDurationMs: 10 * 60 * 1000 // 10 min cooldown on repeated brute-force
    },
    // State-changing POST/PUT/DELETE and admin endpoints
    ADMIN_MUTATION: {
        windowMs: 60 * 1000, // 1 minute
        maxRequests: 120,
        blockDurationMs: 2 * 60 * 1000
    },
    // External API proxies, scrapers, search, and AI routes
    SCRAPER_API: {
        windowMs: 60 * 1000, // 1 minute
        maxRequests: 240,
        blockDurationMs: 60 * 1000
    },
    // General HTML pages, static assets, and config reads
    GENERAL: {
        windowMs: 60 * 1000, // 1 minute
        maxRequests: 420,
        blockDurationMs: 60 * 1000
    },
    // High-frequency HLS/DASH video segments (.ts, .m4s, .m3u8, .mpd, /live.php)
    MEDIA_STREAM: {
        windowMs: 60 * 1000, // 1 minute
        maxRequests: 1800,
        blockDurationMs: 30 * 1000
    }
};

function classifyRequestTier(req: Request): RateTier {
    const p = (req.path || '').toLowerCase();
    const action = String(req.query?.action || req.body?.action || '').toLowerCase();

    // Tier 1: Authentication, Unlock, 2FA, PIN Verification
    if (
        p === '/api/admin/login' ||
        p === '/api/admin/verify-2fa' ||
        p === '/api/system/unlock-site' ||
        p === '/api/system/verify-m3u-vault' ||
        p === '/login.php' && req.method === 'POST' ||
        (p.includes('stalker_api.php') && action === 'admin_login')
    ) {
        return 'AUTH';
    }

    // Tier 5: High-throughput media streaming segments & manifests
    if (
        p === '/live.php' ||
        p === '/stream_proxy.php' ||
        p.startsWith('/api/mdtv/manifest') ||
        p.startsWith('/api/play_stream') ||
        p.startsWith('/api/bingr/proxy') ||
        p.startsWith('/api/music/proxy') ||
        p.startsWith('/api/v1/youtube/stream') ||
        p.endsWith('.ts') ||
        p.endsWith('.m4s') ||
        p.endsWith('.m3u8') ||
        p.endsWith('.mpd') ||
        p.endsWith('.m3u')
    ) {
        return 'MEDIA_STREAM';
    }

    // Tier 2: State-changing mutations or admin endpoints
    if (
        p.startsWith('/api/admin') ||
        p === '/hari' ||
        p === '/hari.html' ||
        ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method.toUpperCase())
    ) {
        return 'ADMIN_MUTATION';
    }

    // Tier 3: Scrapers, Search, External APIs
    if (
        p.startsWith('/api/bingr') ||
        p.startsWith('/api/consumet') ||
        p.startsWith('/api/comics') ||
        p.startsWith('/api/anime') ||
        p.startsWith('/api/kisskh') ||
        p.startsWith('/api/asiaflix') ||
        p.startsWith('/api/peakstream') ||
        p.startsWith('/api/streamic') ||
        p.startsWith('/api/music') ||
        p.startsWith('/api/local-ai') ||
        p.startsWith('/api/ai') ||
        p.startsWith('/api/gemini') ||
        p.startsWith('/api/sports') ||
        p.includes('stalker_api.php') ||
        p === '/scrape'
    ) {
        return 'SCRAPER_API';
    }

    return 'GENERAL';
}

// ============================================================================
// 2. ANTI-BOT, ANTI-SCANNER & PATH PROBING FIREWALL
// ============================================================================

const MALICIOUS_BOT_UA_REGEX = /(sqlmap|nikto|acunetix|nessus|nuclei|zgrab|masscan|nmap|dirbuster|gobuster|feroxbuster|wpscan|havij|burpcollaborator|netsparker|appscan|arachni|jaeles|xray|httpx|dalfox|commix|xsstrike| meg |wfuzz|ffuf|hydra|medusa|patator|scrapy|httrack|teleport|webcopier|sitegrabber|mj12bot|ahrefsbot|semrushbot|dotbot|blexbot|petalbot|bytespider|megaindex|seznambot|sogou|yandexbot)/i;

const AUTOMATION_SCRAPER_UA_REGEX = /^(python-requests|python-urllib|aiohttp|pycurl|go-http-client|java\/|libwww-perl|mechanize|phantomjs|headlesschrome|puppeteer|playwright)/i;

const LEGIT_IPTV_PLAYER_REGEX = /(vlc|tivimate|kodi|ott\s*navigator|exoplayer|lavf|dalvik|iptv|smarters|perfect\s*player|sparkle|televizo|implayer|xciptv|GSE\s*Smart|mpv|ffmpeg)/i;

const BLOCKED_PROBE_PATHS_REGEX = /(\/\.(env|git|svn|hg|DS_Store|htaccess|htpasswd|aws|ssh|npmrc|docker)|\/wp-(admin|login|content|includes)|\/phpmyadmin|\/pma|\/myadmin|\/vendor\/phpunit|\/cgi-bin\/|\/etc\/(passwd|shadow|hosts)|\/proc\/self\/|\/xmlrpc\.php|\/config\.php\.bak|\/actuator\/|\/solr\/|\/console\/|\.(sql|bak|old|swp|tar\.gz|zip|pem|key)$)/i;

function isMediaOrPlaylistPath(pathStr: string): boolean {
    const p = pathStr.toLowerCase();
    return (
        p.endsWith('.m3u') ||
        p.endsWith('.m3u8') ||
        p.endsWith('.mpd') ||
        p.endsWith('.ts') ||
        p === '/live.php' ||
        p === '/playlist.php' ||
        p === '/stream_proxy.php' ||
        p === '/xtream.php' ||
        p.startsWith('/xtream') ||
        p.startsWith('/player_api.php') ||
        p.startsWith('/api/mdtv/') ||
        p.startsWith('/api/play_stream/') ||
        p.startsWith('/api/m3u') ||
        p.startsWith('/m3u')
    );
}

// ============================================================================
// 3. SSRF, SQLi, XSS, COMMAND INJECTION & PROTOTYPE POLLUTION VALIDATORS
// ============================================================================

const SQL_INJECTION_REGEX = /(\b(union\s+(all\s+)?select|select\s+.*\bfrom\s+information_schema|insert\s+into\s+.*\bvalues|update\s+.*\bset\s+|delete\s+from\s+|drop\s+(table|database)|alter\s+table|truncate\s+table|exec(\s|\+)+(s|x)p\w+|waitfor\s+delay|benchmark\s*\(|sleep\s*\(\s*\d+\s*\)|pg_sleep\s*\(|load_file\s*\(|into\s+(outfile|dumpfile))\b|('\s*(or|and)\s*['"]?\d+['"]?\s*=\s*['"]?\d+)|(--\s*$)|(\/\*!\d+))/i;

const XSS_ATTACK_REGEX = /(<script[\s>]|<\/script>|javascript\s*:|vbscript\s*:|data\s*:\s*text\/html|on(error|load|mouseover|focus|blur|click|submit|animationstart|toggle)\s*=\s*['"\w]|<(iframe|object|embed|applet|meta|base|svg|math)[^>]*on\w+\s*=|document\.(cookie|domain|write)|window\.location\s*=|eval\s*\(|Function\s*\()/i;

const CMD_INJECTION_REGEX = /(;\s*(rm\s+-rf|cat\s+\/etc\/|wget\s+http|curl\s+http|bash\s+-i|sh\s+-i|nc\s+-e|python\s+-c|perl\s+-e)|\|\s*(bash|sh|zsh|nc|netcat)\b|`[^`]*(rm|cat|wget|curl|bash|sh|whoami|id\b)[^`]*`|\$\([^)]*(rm|cat|wget|curl|bash|sh|whoami|id\b)[^)]*\)|(\.\.\/){3,}|(\.\.\\){3,})/i;

const PROTOTYPE_POLLUTION_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

/**
 * Validates that an external URL does not point to internal/private networks or cloud metadata (SSRF protection).
 */
export function isSafeExternalUrl(rawUrl: string): boolean {
    try {
        if (!rawUrl || typeof rawUrl !== 'string') return false;
        const trimmed = rawUrl.trim();
        // Allow relative internal paths
        if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
            return !trimmed.includes('..') && !trimmed.includes('\0');
        }
        const parsed = new URL(trimmed);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return false;
        }
        const host = parsed.hostname.toLowerCase();
        if (
            host === 'localhost' ||
            host === '127.0.0.1' ||
            host === '0.0.0.0' ||
            host === '::1' ||
            host === 'metadata.google.internal' ||
            host === 'metadata' ||
            host.endsWith('.internal') ||
            host.endsWith('.local') ||
            host.endsWith('.localhost')
        ) {
            return false;
        }
        const ipVersion = net.isIP(host);
        if (ipVersion === 4) {
            const parts = host.split('.').map(Number);
            const [a, b] = parts;
            if (a === 0 || a === 10 || a === 127) return false;
            if (a === 169 && b === 254) return false; // AWS/GCP/Azure metadata
            if (a === 172 && b >= 16 && b <= 31) return false;
            if (a === 192 && b === 168) return false;
            if (a === 100 && b >= 64 && b <= 127) return false;
        } else if (ipVersion === 6) {
            if (host === '::1' || host === '::' || host.startsWith('fe80:') || host.startsWith('fc') || host.startsWith('fd')) {
                return false;
            }
        }
        return true;
    } catch {
        return false;
    }
}

/**
 * Recursively strips prototype pollution keys, null bytes, and checks for injection payloads.
 * Returns a violation string if a high-confidence attack is detected, or null if clean.
 */
export function validateAndSanitizeInputObject(
    obj: any,
    options: { allowHtmlForAdmin?: boolean; depth?: number } = {}
): { violation: string | null; sanitized: any } {
    const depth = options.depth || 0;
    if (depth > 12) {
        return { violation: 'Excessive JSON nesting depth', sanitized: {} };
    }

    if (obj === null || obj === undefined) {
        return { violation: null, sanitized: obj };
    }

    if (typeof obj === 'string') {
        // Strip null bytes
        let clean = obj.replace(/\0/g, '');

        // Cap extreme string lengths on non-admin requests to prevent ReDoS / memory bombs
        if (!options.allowHtmlForAdmin && clean.length > 50000) {
            clean = clean.substring(0, 50000);
        }

        // Check SQLi, Command Injection, and XSS on non-exempt strings
        // Skip base64 file uploads in admin M3U vault
        if (!options.allowHtmlForAdmin && clean.length < 10000) {
            if (SQL_INJECTION_REGEX.test(clean)) {
                return { violation: 'SQL Injection pattern detected', sanitized: '' };
            }
            if (CMD_INJECTION_REGEX.test(clean)) {
                return { violation: 'Command Injection / Path Traversal pattern detected', sanitized: '' };
            }
            if (XSS_ATTACK_REGEX.test(clean)) {
                return { violation: 'Cross-Site Scripting (XSS) payload detected', sanitized: '' };
            }
        } else if (options.allowHtmlForAdmin && clean.length < 10000) {
            // Even for admin, block SQLi and Command Injection
            if (SQL_INJECTION_REGEX.test(clean)) {
                return { violation: 'SQL Injection pattern detected', sanitized: '' };
            }
            if (CMD_INJECTION_REGEX.test(clean)) {
                return { violation: 'Command Injection pattern detected', sanitized: '' };
            }
        }

        return { violation: null, sanitized: clean };
    }

    if (Array.isArray(obj)) {
        const out: any[] = [];
        for (let i = 0; i < obj.length; i++) {
            const res = validateAndSanitizeInputObject(obj[i], { ...options, depth: depth + 1 });
            if (res.violation) return res;
            out.push(res.sanitized);
        }
        return { violation: null, sanitized: out };
    }

    if (typeof obj === 'object') {
        const out: Record<string, any> = {};
        for (const key of Object.keys(obj)) {
            if (PROTOTYPE_POLLUTION_KEYS.has(key) || key.includes('__proto__') || key.includes('prototype')) {
                return { violation: 'Prototype Pollution attempt detected', sanitized: {} };
            }
            // Block NoSQL injection operator keys like $where, $gt, $ne, $regex from user input
            if (key.startsWith('$') && !options.allowHtmlForAdmin) {
                return { violation: `NoSQL Injection operator (${key}) blocked`, sanitized: {} };
            }
            const res = validateAndSanitizeInputObject(obj[key], { ...options, depth: depth + 1 });
            if (res.violation) return res;
            out[key] = res.sanitized;
        }
        return { violation: null, sanitized: out };
    }

    return { violation: null, sanitized: obj };
}

/**
 * Recursively sanitizes untrusted data received from external APIs / scrapers before sending to frontend.
 * Prevents Stored/Reflected XSS, iframe hijacking, and Prototype Pollution from compromised upstream feeds.
 */
export function sanitizeExternalApiData(data: any, depth = 0): any {
    if (depth > 15 || data === null || data === undefined) return data;

    if (typeof data === 'string') {
        let str = data.replace(/\0/g, '');
        // Strip malicious <script>, <iframe>, <object>, <embed> tags or inline event handlers from external API text
        if (
            str.includes('<script') ||
            str.includes('</script') ||
            str.includes('javascript:') ||
            str.includes('vbscript:') ||
            str.includes('data:text/html') ||
            /on(error|load|mouseover|focus|click)\s*=/i.test(str)
        ) {
            str = str
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/<script[^>]*>/gi, '')
                .replace(/<\/script>/gi, '')
                .replace(/javascript\s*:/gi, 'blocked:')
                .replace(/vbscript\s*:/gi, 'blocked:')
                .replace(/data\s*:\s*text\/html/gi, 'blocked:')
                .replace(/\bon(error|load|mouseover|mouseout|focus|blur|click|dblclick|submit|keydown|keyup|change|input|animationstart|toggle)\s*=\s*(['"][^'"]*['"]|[^\s>]+)/gi, '');
        }
        return str;
    }

    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = sanitizeExternalApiData(data[i], depth + 1);
        }
        return data;
    }

    if (typeof data === 'object') {
        // Delete prototype pollution properties if present
        for (const k of Object.keys(data)) {
            if (PROTOTYPE_POLLUTION_KEYS.has(k)) {
                delete data[k];
                continue;
            }
            // Redact accidental upstream API key leaks in non-admin responses
            if (
                (k === 'api_key' || k === 'apiKey' || k === 'secretKey' || k === 'privateKey') &&
                typeof data[k] === 'string' &&
                data[k].length > 12
            ) {
                delete data[k];
                continue;
            }
            data[k] = sanitizeExternalApiData(data[k], depth + 1);
        }
        return data;
    }

    return data;
}

// ============================================================================
// 4. STRICT ORIGIN / CORS & ADVANCED SECURITY HEADERS
// ============================================================================

function isTrustedSameOrigin(req: Request, originOrReferer: string): boolean {
    if (!originOrReferer) return true;
    try {
        const parsed = new URL(originOrReferer);
        const originHost = parsed.host.toLowerCase();
        const originHostname = parsed.hostname.toLowerCase();

        const reqHost = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim().toLowerCase();
        if (reqHost && originHost === reqHost) {
            return true;
        }

        // Allow local dev and Google AI Studio / Cloud Run preview domains
        if (
            originHostname === 'localhost' ||
            originHostname === '127.0.0.1' ||
            originHostname.endsWith('.run.app') ||
            originHostname.endsWith('.aistudio.google.com') ||
            originHostname.endsWith('.googleusercontent.com') ||
            originHostname.endsWith('.web.app') ||
            originHostname.endsWith('.firebaseapp.com')
        ) {
            return true;
        }

        return false;
    } catch {
        return false;
    }
}

// ============================================================================
// 5. UNIFIED EXPRESS SECURITY SHIELD MIDDLEWARE
// ============================================================================

export function enterpriseSecurityShield(req: Request, res: Response, next: NextFunction) {
    const clientIp = getClientIp(req);
    const reqPath = req.path || '/';
    const lowerPath = reqPath.toLowerCase();
    const ua = String(req.headers['user-agent'] || '');

    // ------------------------------------------------------------------------
    // A. ADVANCED HTTP SECURITY HEADERS (Anti-Hijacking, Anti-Scraping, Hardened CSP)
    // ------------------------------------------------------------------------
    res.removeHeader('X-Powered-By');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    res.setHeader(
        'Permissions-Policy',
        'camera=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), microphone=(self), autoplay=(self "https://www.youtube.com" "https://www.youtube-nocookie.com")'
    );
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');

    // Frame protection: DENY on admin/auth, SAMEORIGIN on pages
    if (lowerPath.startsWith('/hari') || lowerPath.startsWith('/admin') || lowerPath.startsWith('/api/admin') || lowerPath === '/login.php') {
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader(
            'Content-Security-Policy',
            "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:; object-src 'none'; base-uri 'self'; frame-ancestors 'none';"
        );
    } else {
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        res.setHeader(
            'Content-Security-Policy',
            "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: data: blob: wss: ws:; object-src 'none'; base-uri 'self'; frame-ancestors 'self' https://*.google.com https://*.aistudio.google.com https://*.googleusercontent.com;"
        );
    }

    // ------------------------------------------------------------------------
    // B. STRICT ORIGIN-VALIDATED CORS POLICY
    // ------------------------------------------------------------------------
    const origin = String(req.headers.origin || '');
    const referer = String(req.headers.referer || '');
    const isMediaRoute = isMediaOrPlaylistPath(lowerPath);

    if (isMediaRoute) {
        // Media streams (.m3u, .mpd, .m3u8, /live.php) require CORS for web/IPTV video players
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type, Authorization, X-Requested-With');
        res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    } else {
        // Sensitive APIs, Admin routes, and HTML pages: Enforce strict origin validation
        const originTrusted = isTrustedSameOrigin(req, origin);
        const refererTrusted = isTrustedSameOrigin(req, referer);

        if (origin && originTrusted) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Vary', 'Origin');
        }
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-Citadel-Shield');
        res.setHeader('Cross-Origin-Resource-Policy', 'same-site');

        // Block unauthorized cross-origin API scraping or CSRF mutations from foreign websites
        const isApiOrMutation =
            lowerPath.startsWith('/api/') ||
            lowerPath.includes('stalker_api.php') ||
            ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method.toUpperCase());

        if (isApiOrMutation && ((origin && !originTrusted) || (!origin && referer && !refererTrusted))) {
            logServerEvent('WARN', `Blocked cross-origin hijacking/scraping attempt from Origin="${origin || referer}" on ${req.method} ${reqPath}`, {
                ip: clientIp,
                userAgent: ua
            });
            return res.status(403).json({
                status: 'error',
                error: 'Cross-Origin Request Blocked by Citadel Security Policy.'
            });
        }
    }

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    // ------------------------------------------------------------------------
    // C. BLOCK VULNERABILITY SCANNERS, BOTS & SENSITIVE FILE PROBES
    // ------------------------------------------------------------------------
    if (BLOCKED_PROBE_PATHS_REGEX.test(lowerPath) || req.originalUrl.includes('\0') || req.originalUrl.includes('%00')) {
        logServerEvent('WARN', `Blocked exploit probe on sensitive path: ${req.originalUrl}`, {
            ip: clientIp,
            userAgent: ua
        });
        return res.status(403).json({ status: 'error', error: 'Access Denied: Forbidden Path Probe.' });
    }

    if (ua && MALICIOUS_BOT_UA_REGEX.test(ua)) {
        logServerEvent('WARN', `Blocked malicious scanner/bot User-Agent: "${ua}" on ${reqPath}`, {
            ip: clientIp,
            userAgent: ua
        });
        return res.status(403).json({ status: 'error', error: 'Access Denied: Automated Scanner Blocked.' });
    }

    // Block automated scraping scripts (curl/python-requests/headless) on API/HTML routes unless it's a legitimate M3U player
    if (ua && AUTOMATION_SCRAPER_UA_REGEX.test(ua) && !isMediaRoute && !LEGIT_IPTV_PLAYER_REGEX.test(ua)) {
        const isLocalhost = clientIp === '127.0.0.1' || clientIp === '::1' || clientIp === 'localhost';
        if (!isLocalhost) {
            logServerEvent('WARN', `Blocked automated scraper User-Agent: "${ua}" on ${reqPath}`, {
                ip: clientIp,
                userAgent: ua
            });
            return res.status(403).json({ status: 'error', error: 'Access Denied: Automated Scraping Prohibited.' });
        }
    }

    // ------------------------------------------------------------------------
    // D. MULTI-TIER SLIDING-WINDOW RATE LIMITING
    // ------------------------------------------------------------------------
    const tier = classifyRequestTier(req);
    const config = TIER_CONFIGS[tier];
    const bucketKey = `${tier}:${clientIp}`;
    const now = Date.now();

    let bucket = rateBuckets.get(bucketKey);
    if (!bucket) {
        bucket = {
            count: 0,
            resetAt: now + config.windowMs,
            violations: 0,
            blockedUntil: 0
        };
        rateBuckets.set(bucketKey, bucket);
    }

    // Check if IP is currently in a cooldown block for this tier
    if (bucket.blockedUntil > now) {
        const retryAfterSec = Math.ceil((bucket.blockedUntil - now) / 1000);
        res.setHeader('Retry-After', String(retryAfterSec));
        res.setHeader('X-RateLimit-Limit', String(config.maxRequests));
        res.setHeader('X-RateLimit-Remaining', '0');
        res.setHeader('X-RateLimit-Reset', String(Math.ceil(bucket.blockedUntil / 1000)));
        return res.status(429).json({
            status: 'error',
            error: `Too many requests (${tier}). Rate limit exceeded. Please wait ${retryAfterSec}s.`,
            retryAfter: retryAfterSec
        });
    }

    if (now > bucket.resetAt) {
        bucket.count = 0;
        bucket.resetAt = now + config.windowMs;
    }

    bucket.count++;
    const remaining = Math.max(0, config.maxRequests - bucket.count);
    res.setHeader('X-RateLimit-Limit', String(config.maxRequests));
    res.setHeader('X-RateLimit-Remaining', String(remaining));
    res.setHeader('X-RateLimit-Reset', String(Math.ceil(bucket.resetAt / 1000)));

    if (bucket.count > config.maxRequests) {
        bucket.violations++;
        bucket.blockedUntil = now + config.blockDurationMs * Math.min(4, bucket.violations);
        const retryAfterSec = Math.ceil((bucket.blockedUntil - now) / 1000);
        res.setHeader('Retry-After', String(retryAfterSec));

        logServerEvent('WARN', `Rate limit exceeded on tier [${tier}] by IP ${clientIp} (${bucket.count}/${config.maxRequests} reqs) on ${reqPath}`, {
            ip: clientIp,
            userAgent: ua
        });

        return res.status(429).json({
            status: 'error',
            error: `Rate limit exceeded. Please try again in ${retryAfterSec} seconds.`,
            retryAfter: retryAfterSec
        });
    }

    // ------------------------------------------------------------------------
    // E. DEEP INPUT VALIDATION & SANITIZATION (SQLi, XSS, NoSQLi, SSRF, Proto Pollution)
    // ------------------------------------------------------------------------
    const isAdmin = isAdminAuthenticated(req);

    // 1. Validate & sanitize req.query
    if (req.query && typeof req.query === 'object') {
        const qCheck = validateAndSanitizeInputObject(req.query, { allowHtmlForAdmin: isAdmin });
        if (qCheck.violation) {
            logServerEvent('WARN', `Blocked malicious query parameter (${qCheck.violation}) from IP ${clientIp} on ${reqPath}`, {
                ip: clientIp,
                userAgent: ua
            });
            return res.status(400).json({
                status: 'error',
                error: `Security Violation: Invalid query input (${qCheck.violation}).`
            });
        }
        // Validate external URL query parameters against SSRF
        for (const urlParam of ['url', 'stream_url', 'streamUrl', 'src', 'm3u_url']) {
            const val = req.query[urlParam];
            if (typeof val === 'string' && val.trim() && (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('file:') || val.startsWith('gopher:'))) {
                if (!isSafeExternalUrl(val)) {
                    logServerEvent('WARN', `Blocked SSRF attempt in query param "${urlParam}" from IP ${clientIp}: ${val}`, {
                        ip: clientIp,
                        userAgent: ua
                    });
                    return res.status(400).json({
                        status: 'error',
                        error: 'Security Violation: Unsafe or private network URL blocked.'
                    });
                }
            }
        }
    }

    // 2. Validate & sanitize req.params
    if (req.params && typeof req.params === 'object') {
        const pCheck = validateAndSanitizeInputObject(req.params, { allowHtmlForAdmin: isAdmin });
        if (pCheck.violation) {
            logServerEvent('WARN', `Blocked malicious route parameter (${pCheck.violation}) from IP ${clientIp} on ${reqPath}`, {
                ip: clientIp,
                userAgent: ua
            });
            return res.status(400).json({
                status: 'error',
                error: `Security Violation: Invalid URL parameter (${pCheck.violation}).`
            });
        }
    }

    // 3. Validate & sanitize req.body
    if (req.body && typeof req.body === 'object') {
        const bCheck = validateAndSanitizeInputObject(req.body, { allowHtmlForAdmin: isAdmin });
        if (bCheck.violation) {
            logServerEvent('WARN', `Blocked malicious request body (${bCheck.violation}) from IP ${clientIp} on ${reqPath}`, {
                ip: clientIp,
                userAgent: ua
            });
            return res.status(400).json({
                status: 'error',
                error: `Security Violation: Invalid request payload (${bCheck.violation}).`
            });
        }
        req.body = bCheck.sanitized;
    }

    // ------------------------------------------------------------------------
    // F. EXTERNAL API & OUTBOUND JSON SANITIZATION INTERCEPTOR
    // ------------------------------------------------------------------------
    if (!isAdmin && (lowerPath.startsWith('/api/') || lowerPath.includes('stalker_api.php'))) {
        const originalJson = res.json.bind(res);
        res.json = function (body: any) {
            try {
                const cleanBody = sanitizeExternalApiData(body);
                return originalJson(cleanBody);
            } catch {
                return originalJson(body);
            }
        };
    }

    next();
}
