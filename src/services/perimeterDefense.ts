import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { 
    banDevice as banDeviceInBinding, 
    isDeviceBanned as isDeviceBannedInBinding, 
    unbanDevice as unbanDeviceInBinding, 
    getAllBannedDevices 
} from './deviceBindingService';

export interface ThreatIncident {
    timestamp: number;
    ip: string;
    type: 'MALICIOUS_BOT' | 'SCRAPER_FLOOD' | 'HONEYPOT_TRAP' | 'EXPLOIT_PAYLOAD' | 'PROHIBITED_AGENT' | 'BRUTE_FORCE_ATTEMPT' | 'PROHIBITED_MAC' | 'PROHIBITED_DEVICE';
    detail: string;
    path: string;
    userAgent: string;
    mac?: string;
    deviceId?: string;
}

export interface BanRecord {
    bannedUntil: number; // 0 indicates permanent, or timestamp in ms
    reason: string;
    permanent?: boolean;
    createdAt?: number;
    offenseCount?: number;
}

const BANNED_IPS_FILE = path.join(process.cwd(), 'doctor_strange', 'banned_ips.json');
const BANNED_MACS_FILE = path.join(process.cwd(), 'doctor_strange', 'banned_macs.json');
const PERIMETER_THREATS_LOG = path.join(process.cwd(), 'doctor_strange', 'perimeter_threats.log');

// In-memory threat tracking & dynamic firewall
const bannedIps = new Map<string, BanRecord>();
const bannedMacs = new Map<string, BanRecord>();
const requestWindowMap = new Map<string, { count: number; windowStart: number }>();
const repeatOffenderMap = new Map<string, { count: number; lastSeen: number }>();
const ipProbedMacs = new Map<string, { macs: Set<string>; windowStart: number }>();
const threatIncidents: ThreatIncident[] = [];
const MAX_LOGGED_INCIDENTS = 100;

/**
 * Appends a structured syslog entry for external WAF / fail2ban integration
 */
function logSyslogThreat(
    type: string, 
    ip: string, 
    mac: string | undefined, 
    deviceId: string | undefined, 
    detail: string, 
    durationDesc: string
): void {
    try {
        const logDir = path.dirname(PERIMETER_THREATS_LOG);
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
        const iso = new Date().toISOString();
        const safeDetail = String(detail || '').replace(/[\r\n]+/g, ' ').replace(/"/g, "'");
        const line = `[${iso}] [PERIMETER-FIREWALL] [${type}] IP=${ip} MAC=${mac || 'NONE'} DEV=${deviceId || 'NONE'} DURATION=${durationDesc} DETAIL="${safeDetail}"\n`;
        fs.appendFileSync(PERIMETER_THREATS_LOG, line, 'utf8');
    } catch (e) {
        // Suppress file write errors to keep request cycle non-blocking
    }
}

/**
 * Tracks repeat offense counts per identifier (IP or MAC)
 */
function recordOffense(target: string): number {
    const now = Date.now();
    let entry = repeatOffenderMap.get(target);
    if (!entry) {
        entry = { count: 1, lastSeen: now };
    } else {
        entry.count += 1;
        entry.lastSeen = now;
    }
    repeatOffenderMap.set(target, entry);
    return entry.count;
}

function loadBannedIps(): void {
    try {
        if (!fs.existsSync(BANNED_IPS_FILE)) {
            const dir = path.dirname(BANNED_IPS_FILE);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(BANNED_IPS_FILE, JSON.stringify([], null, 2), 'utf8');
            return;
        }
        const data = JSON.parse(fs.readFileSync(BANNED_IPS_FILE, 'utf8'));
        if (Array.isArray(data)) {
            const now = Date.now();
            bannedIps.clear();
            for (const item of data) {
                if (item && item.ip && (item.permanent || item.bannedUntil === 0 || item.bannedUntil > now)) {
                    bannedIps.set(item.ip, { 
                        bannedUntil: item.bannedUntil, 
                        reason: item.reason || 'Manual IP Quarantine',
                        permanent: !!item.permanent || item.bannedUntil === 0,
                        createdAt: item.createdAt || now,
                        offenseCount: item.offenseCount || 1
                    });
                }
            }
        }
    } catch (e) {
        // Fallback to in-memory
    }
}

function persistBannedIps(): void {
    try {
        const now = Date.now();
        const arr = Array.from(bannedIps.entries())
            .filter(([_, val]) => val.permanent || val.bannedUntil === 0 || val.bannedUntil > now)
            .map(([ip, val]) => ({ 
                ip, 
                bannedUntil: val.bannedUntil, 
                reason: val.reason,
                permanent: !!val.permanent,
                createdAt: val.createdAt,
                offenseCount: val.offenseCount
            }));
        fs.writeFileSync(BANNED_IPS_FILE, JSON.stringify(arr, null, 2), 'utf8');
    } catch (e) {}
}

function loadBannedMacs(): void {
    try {
        if (!fs.existsSync(BANNED_MACS_FILE)) {
            const dir = path.dirname(BANNED_MACS_FILE);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(BANNED_MACS_FILE, JSON.stringify([], null, 2), 'utf8');
            return;
        }
        const data = JSON.parse(fs.readFileSync(BANNED_MACS_FILE, 'utf8'));
        if (Array.isArray(data)) {
            const now = Date.now();
            bannedMacs.clear();
            for (const item of data) {
                if (item && item.mac && (item.permanent || item.bannedUntil === 0 || item.bannedUntil > now)) {
                    bannedMacs.set(item.mac, { 
                        bannedUntil: item.bannedUntil, 
                        reason: item.reason || 'Manual MAC Quarantine',
                        permanent: !!item.permanent || item.bannedUntil === 0,
                        createdAt: item.createdAt || now,
                        offenseCount: item.offenseCount || 1
                    });
                }
            }
        }
    } catch (e) {
        // Fallback to in-memory
    }
}

function persistBannedMacs(): void {
    try {
        const now = Date.now();
        const arr = Array.from(bannedMacs.entries())
            .filter(([_, val]) => val.permanent || val.bannedUntil === 0 || val.bannedUntil > now)
            .map(([mac, val]) => ({ 
                mac, 
                bannedUntil: val.bannedUntil, 
                reason: val.reason,
                permanent: !!val.permanent,
                createdAt: val.createdAt,
                offenseCount: val.offenseCount
            }));
        fs.writeFileSync(BANNED_MACS_FILE, JSON.stringify(arr, null, 2), 'utf8');
    } catch (e) {}
}

loadBannedIps();
loadBannedMacs();

// High-risk reconnaissance and exploit probe honeypots
const HONEYPOT_PATHS = new Set([
    '/.env',
    '/.env.local',
    '/.env.production',
    '/.git',
    '/.git/config',
    '/.git/head',
    '/.svn',
    '/.vscode',
    '/wp-admin',
    '/wp-login.php',
    '/xmlrpc.php',
    '/phpmyadmin',
    '/pma',
    '/admin.php',
    '/config.json',
    '/actuator',
    '/actuator/health',
    '/actuator/env',
    '/debug/vars',
    '/api/v1/dump',
    '/.aws/credentials',
    '/database.sql',
    '/dump.sql',
    '/backup.sql',
    '/solr',
    '/telescope',
    '/eval-stdin.php',
    '/cgi-bin',
    '/vendor/phpunit'
]);

// Known aggressive crawlers, scraping bots, and vulnerability scanners
const BLOCKED_BOT_REGEX = /\b(sqlmap|nikto|masscan|zgrab|nmap|nuclei|gobuster|dirbuster|acunetix|nessus|headlesschrome|phantomjs|selenium|puppeteer|playwright|scrapy|python-requests|aiohttp|urllib|libwww-perl|go-http-client|httpclient|packrat|harvest|emailcollector|cmsdetector|auto-scraper|site-grabber)\b/i;

// Comprehensive OWASP Exploit Regexes
const PATH_TRAVERSAL_REGEX = /(\.\.[\/\\]|%2e%2e[\/\\]|\.\.[^\/\\]*[\/\\])/i;
const SQLI_REGEX = /\b(union(\s+all)?\s+select|select\s+[\s\S]+?\s+from|insert\s+into|delete\s+from|drop\s+(table|database|schema)|information_schema|load_file|into\s+(out|dump)file|waitfor\s+delay|benchmark\(|sleep\(\s*\d+\s*\))\b/i;
const COMMAND_INJECTION_REGEX = /[;&|`$]\s*(cat\s|nc\s|curl\s|wget\s|bash\s|sh\s|cmd(\.exe)?\s|powershell|whoami|uname\b|id\b|rm\s+-rf)/i;
const PHP_WRAPPER_REGEX = /\b(php|data|phar|zip|glob|expect|input):\/\//i;
const XSS_REGEX = /(<script[\s>]|javascript:|onerror\s*=|onload\s*=|document\.cookie)/i;

// Rate limit: 250 API requests per 1-second burst window for automated scrapers (excluding static/media assets)
const BURST_LIMIT = 250;
const BURST_WINDOW_MS = 1000;
const TEMP_BAN_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const HONEYPOT_BAN_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Trusted / whitelisted IPs that must never be quarantined
const WHITELISTED_IPS = new Set([
    '127.0.0.1',
    '::1',
    'localhost',
    '111.92.124.169'
]);

// Static assets, channel logos, media segments, and stream/image proxies excluded from burst scraping counter
const STATIC_OR_MEDIA_EXT_REGEX = /\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot|mp4|webm|ts|m4s|m3u8|mpd|vtt|srt|json|map)$/i;

/**
 * Multi-layer payload normalization to defeat double encoding, comments, null-bytes, and space evasion
 */
export function normalizePayload(input: string): { normalized: string; hasNullByte: boolean } {
    if (!input || typeof input !== 'string') return { normalized: '', hasNullByte: false };

    let hasNullByte = input.includes('\0') || /%00|\\x00|\\0/i.test(input);

    // Multi-pass recursive URL decode (up to 3 passes to unwrap %252e%252e%252f -> %2e%2e/ -> ../)
    let decoded = input;
    for (let i = 0; i < 3; i++) {
        try {
            const next = decodeURIComponent(decoded);
            if (next === decoded) break;
            decoded = next;
        } catch {
            break;
        }
    }

    if (decoded.includes('\0') || /%00|\\x00|\\0/i.test(decoded)) {
        hasNullByte = true;
    }

    // Unescape Unicode escapes like \u002e, \u002f
    let unescaped = decoded.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
        try {
            return String.fromCharCode(parseInt(hex, 16));
        } catch {
            return '';
        }
    });

    // Strip SQL comments like /**/ or /*!50000...*/ which attackers use to bypass word boundaries
    let cleaned = unescaped.replace(/\/\*[\s\S]*?\*\//g, ' ');

    // Normalize backslashes to forward slashes to catch Windows-style path traversal
    cleaned = cleaned.replace(/\\/g, '/');

    // Collapse multiple whitespace characters and plus signs (often used as spaces in URL parameters)
    cleaned = cleaned.replace(/[\s+]+/g, ' ');

    return { normalized: cleaned, hasNullByte };
}

export class PerimeterDefenseShield {
    private static totalBlocked = 0;
    private static honeypotHits = 0;
    private static scrapersTerminated = 0;

    /**
     * Sanitizes client IP string
     */
    static getCleanIp(req: Request): string {
        const forwarded = (req.headers['x-forwarded-for'] as string || '').split(',')[0].trim();
        const rawIp = forwarded || req.socket.remoteAddress || '';
        return rawIp.replace(/^::ffff:/, '').trim() || '127.0.0.1';
    }

    /**
     * Normalizes and validates a MAC address string (e.g. 00:1A:79:XX:XX:XX)
     */
    static normalizeMac(rawMac: string): string | null {
        if (!rawMac || typeof rawMac !== 'string') return null;
        const cleaned = rawMac.trim().toUpperCase().replace(/[^0-9A-F]/g, '');
        if (cleaned.length === 12) {
            return cleaned.match(/.{1,2}/g)!.join(':');
        }
        return null;
    }

    /**
     * Extracts MAC address from headers, cookies, query parameters, or request body
     */
    static extractMacFromRequest(req: Request): string | null {
        // 1. Direct custom headers
        const headerMac = (req.headers['mac'] || req.headers['x-mac'] || req.headers['x-stalker-mac']) as string;
        if (headerMac) {
            const norm = this.normalizeMac(headerMac);
            if (norm) return norm;
        }

        // 2. Cookie header parsing (e.g., "mac=00:1A:79:B2:C3:D4; stb_lang=en")
        const cookieHeader = req.headers.cookie || '';
        if (cookieHeader) {
            const match = cookieHeader.match(/(?:^|;\s*)mac=([a-fA-F0-9:_-]{12,17})/i);
            if (match && match[1]) {
                const norm = this.normalizeMac(match[1]);
                if (norm) return norm;
            }
        }

        // 3. Query string
        const queryMac = (req.query?.mac || req.query?.macAddress) as string;
        if (queryMac) {
            const norm = this.normalizeMac(queryMac);
            if (norm) return norm;
        }

        // 4. Request Body
        const bodyMac = req.body && (req.body.mac || req.body.macAddress || req.body.stb_mac);
        if (bodyMac && typeof bodyMac === 'string') {
            const norm = this.normalizeMac(bodyMac);
            if (norm) return norm;
        }

        return null;
    }

    /**
     * Extracts hardware device identifiers (deviceId and fingerprint) from request
     */
    static extractDeviceFromRequest(req: Request): { deviceId?: string; deviceFingerprint?: string } {
        let deviceId = (req.headers['x-device-id'] as string) || (req.query?.deviceId as string) || (req.body?.deviceId as string);
        let deviceFingerprint = (req.headers['x-device-fingerprint'] as string) || (req.query?.deviceFingerprint as string) || (req.body?.deviceFingerprint as string);

        if (!deviceId && req.headers.cookie) {
            const match = req.headers.cookie.match(/(?:^|;\s*)stalker_device_id=([^;]+)/i);
            if (match && match[1]) deviceId = decodeURIComponent(match[1].trim());
        }

        return {
            deviceId: deviceId ? String(deviceId).trim() : undefined,
            deviceFingerprint: deviceFingerprint ? String(deviceFingerprint).trim() : undefined
        };
    }

    /**
     * Checks if IP is whitelisted
     */
    static isWhitelisted(ip: string): boolean {
        return WHITELISTED_IPS.has(ip);
    }

    /**
     * Checks if IP is currently banned in perimeter firewall
     */
    static isIpBanned(ip: string): { banned: boolean; reason?: string; remainingSeconds?: number; permanent?: boolean } {
        if (this.isWhitelisted(ip)) {
            bannedIps.delete(ip);
            persistBannedIps();
            return { banned: false };
        }
        const record = bannedIps.get(ip);
        if (!record) return { banned: false };

        if (record.permanent || record.bannedUntil === 0) {
            return {
                banned: true,
                permanent: true,
                reason: record.reason,
                remainingSeconds: -1
            };
        }

        const now = Date.now();
        if (record.bannedUntil > now) {
            return {
                banned: true,
                permanent: false,
                reason: record.reason,
                remainingSeconds: Math.ceil((record.bannedUntil - now) / 1000)
            };
        }

        // Expired
        bannedIps.delete(ip);
        persistBannedIps();
        return { banned: false };
    }

    /**
     * Bans an IP immediately. Automatically escalates repeat offenders (>=2 offenses) to permanent quarantine.
     */
    static banIp(ip: string, reason: string, durationMs: number = TEMP_BAN_DURATION_MS, permanent: boolean = false): void {
        if (this.isWhitelisted(ip)) return;
        const offenses = recordOffense(ip);
        const shouldBePermanent = permanent || offenses >= 2;
        const now = Date.now();
        const bannedUntil = shouldBePermanent ? 0 : now + durationMs;
        const effectiveReason = shouldBePermanent && !permanent 
            ? `${reason} (Auto-Escalated to Permanent Quarantine: ${offenses}+ Offenses)` 
            : reason;

        bannedIps.set(ip, {
            bannedUntil,
            reason: effectiveReason,
            permanent: shouldBePermanent,
            createdAt: now,
            offenseCount: offenses
        });
        persistBannedIps();

        const durDesc = shouldBePermanent ? 'PERMANENT' : `${Math.round(durationMs / 60000)}m`;
        logSyslogThreat('BAN', ip, undefined, undefined, effectiveReason, durDesc);
        console.warn(`[PERIMETER DEFENSE] 🔥 IP BANNED: ${ip} [${durDesc}]. Reason: ${effectiveReason}`);
    }

    /**
     * Checks if MAC address is currently banned in perimeter firewall
     */
    static isMacBanned(mac: string): { banned: boolean; reason?: string; remainingSeconds?: number; permanent?: boolean } {
        const norm = this.normalizeMac(mac);
        if (!norm) return { banned: false };

        const record = bannedMacs.get(norm);
        if (!record) return { banned: false };

        if (record.permanent || record.bannedUntil === 0) {
            return {
                banned: true,
                permanent: true,
                reason: record.reason,
                remainingSeconds: -1
            };
        }

        const now = Date.now();
        if (record.bannedUntil > now) {
            return {
                banned: true,
                permanent: false,
                reason: record.reason,
                remainingSeconds: Math.ceil((record.bannedUntil - now) / 1000)
            };
        }

        // Expired
        bannedMacs.delete(norm);
        persistBannedMacs();
        return { banned: false };
    }

    /**
     * Bans a MAC address in perimeter firewall. Auto-escalates on repeat offenses.
     */
    static banMac(mac: string, reason: string, durationMs: number = HONEYPOT_BAN_DURATION_MS, permanent: boolean = false): void {
        const norm = this.normalizeMac(mac);
        if (!norm) return;

        const offenses = recordOffense(norm);
        const shouldBePermanent = permanent || offenses >= 2;
        const now = Date.now();
        const bannedUntil = shouldBePermanent ? 0 : now + durationMs;
        const effectiveReason = shouldBePermanent && !permanent 
            ? `${reason} (Auto-Escalated to Permanent Quarantine: ${offenses}+ Offenses)` 
            : reason;

        bannedMacs.set(norm, {
            bannedUntil,
            reason: effectiveReason,
            permanent: shouldBePermanent,
            createdAt: now,
            offenseCount: offenses
        });
        persistBannedMacs();

        const durDesc = shouldBePermanent ? 'PERMANENT' : `${Math.round(durationMs / 60000)}m`;
        logSyslogThreat('BAN', 'MAC-BOUND', norm, undefined, effectiveReason, durDesc);
        console.warn(`[PERIMETER DEFENSE] 🛑 MAC BANNED: ${norm} [${durDesc}]. Reason: ${effectiveReason}`);
    }

    /**
     * Unbans a MAC address
     */
    static unbanMac(mac: string): boolean {
        const norm = this.normalizeMac(mac);
        if (!norm) return false;
        const res = bannedMacs.delete(norm);
        repeatOffenderMap.delete(norm);
        if (res) persistBannedMacs();
        return res;
    }

    /**
     * Device Ban proxy to deviceBindingService
     */
    static banDevice(
        deviceId?: string, 
        fingerprint?: string, 
        reason: string = 'Perimeter Device Ban', 
        durationMs: number = HONEYPOT_BAN_DURATION_MS,
        permanent: boolean = false
    ): void {
        const target = deviceId || fingerprint;
        const offenses = target ? recordOffense(target) : 1;
        const shouldBePermanent = permanent || offenses >= 2;
        banDeviceInBinding(deviceId, fingerprint, reason, durationMs, shouldBePermanent);
        logSyslogThreat('BAN', 'DEV-BOUND', undefined, deviceId || fingerprint, reason, shouldBePermanent ? 'PERMANENT' : `${Math.round(durationMs / 60000)}m`);
    }

    static isDeviceBanned(deviceId?: string, fingerprint?: string): { banned: boolean; reason?: string; remainingSeconds?: number; permanent?: boolean } {
        return isDeviceBannedInBinding(deviceId, fingerprint);
    }

    static unbanDevice(deviceId?: string, fingerprint?: string): boolean {
        return unbanDeviceInBinding(deviceId, fingerprint);
    }

    /**
     * Logs threat incident
     */
    static logIncident(req: Request, type: ThreatIncident['type'], detail: string): void {
        const ip = this.getCleanIp(req);
        const mac = this.extractMacFromRequest(req) || undefined;
        const dev = this.extractDeviceFromRequest(req);
        this.totalBlocked++;

        const incident: ThreatIncident = {
            timestamp: Date.now(),
            ip,
            type,
            detail,
            path: req.path || req.originalUrl || '',
            userAgent: (req.headers['user-agent'] as string) || 'none',
            mac,
            deviceId: dev.deviceId
        };

        threatIncidents.unshift(incident);
        if (threatIncidents.length > MAX_LOGGED_INCIDENTS) {
            threatIncidents.length = MAX_LOGGED_INCIDENTS;
        }

        logSyslogThreat(type, ip, mac, dev.deviceId, detail, 'INCIDENT');
    }

    /**
     * Behavioral bot detection that inspects Client Hints, Accept headers, and rapid MAC rotation
     */
    static detectBehavioralBot(req: Request): { isBot: boolean; reason?: string } {
        const userAgent = (req.headers['user-agent'] as string) || '';
        const normalizedPath = (req.path || '').toLowerCase();
        const isClientPageRequest = (
            normalizedPath === '/' || 
            normalizedPath.endsWith('.html') || 
            (normalizedPath.endsWith('.php') && 
             !normalizedPath.includes('stalker') && 
             !normalizedPath.includes('player_api') && 
             !normalizedPath.includes('live.php') && 
             !normalizedPath.includes('stream_proxy') && 
             !normalizedPath.includes('xtream'))
        ) && !normalizedPath.startsWith('/api/');

        // 1. Missing or ultra-short User-Agent on browser document requests
        if (isClientPageRequest && (!userAgent || userAgent.trim().length < 5)) {
            return {
                isBot: true,
                reason: 'Legitimate browser client signature required (Empty or truncated User-Agent)'
            };
        }

        // 2. Known automated attack tooling & scrapers
        if (userAgent && BLOCKED_BOT_REGEX.test(userAgent)) {
            return {
                isBot: true,
                reason: `Prohibited Scraper/Attack Bot UA: ${userAgent.slice(0, 50)}`
            };
        }

        // 3. Chromium Client Hints Anomaly (Catches OpenBullet, headless python, curl spoofing Chrome)
        if (isClientPageRequest && /Chrome\/(\d+)|Edg\/(\d+)/i.test(userAgent)) {
            const match = userAgent.match(/(?:Chrome|Edg)\/(\d+)/i);
            const majorVersion = match && match[1] ? parseInt(match[1], 10) : 0;
            const hasSecCh = !!(req.headers['sec-ch-ua'] || req.headers['sec-ch-ua-mobile'] || req.headers['sec-ch-ua-platform']);
            const hasSecFetch = !!(req.headers['sec-fetch-dest'] || req.headers['sec-fetch-mode'] || req.headers['sec-fetch-site']);
            const hasAcceptLanguage = !!req.headers['accept-language'];

            if (majorVersion >= 89 && !hasSecCh && !hasSecFetch && !hasAcceptLanguage) {
                return {
                    isBot: true,
                    reason: `Spoofed Chromium User-Agent: Missing required browser Client Hints and Accept-Language (Detected OpenBullet / Headless Automation)`
                };
            }
        }

        // 4. Wildcard Accept Header Anomaly on navigational document
        const accept = (req.headers['accept'] as string) || '';
        if (isClientPageRequest && (accept === '*/*' || !accept) && !req.headers['accept-language'] && userAgent.length > 20) {
            return {
                isBot: true,
                reason: `Behavioral Bot Anomaly: Wildcard Accept header on navigational document with missing language locale`
            };
        }

        // 5. Stalker MAC Credential Stuffer Scanner (OpenBullet detection)
        const clientMac = PerimeterDefenseShield.extractMacFromRequest(req);
        if (clientMac && (normalizedPath.includes('stalker') || normalizedPath.includes('player_api') || normalizedPath.includes('portal'))) {
            const ip = PerimeterDefenseShield.getCleanIp(req);
            const now = Date.now();
            let tracker = ipProbedMacs.get(ip);
            if (!tracker || (now - tracker.windowStart) > 60000) {
                tracker = { macs: new Set([clientMac]), windowStart: now };
                ipProbedMacs.set(ip, tracker);
            } else {
                tracker.macs.add(clientMac);
                if (tracker.macs.size >= 3) {
                    return {
                        isBot: true,
                        reason: `OpenBullet / Stalker MAC Credential Stuffer: Probed ${tracker.macs.size} distinct MAC addresses in 60s`
                    };
                }
            }
        }

        return { isBot: false };
    }

    /**
     * Systematic garbage collection of in-memory maps to prevent resource leaks and memory bloat
     */
    static sweepStaleMemory(): void {
        const now = Date.now();

        // 1. Sweep requestWindowMap
        for (const [ip, tracker] of requestWindowMap.entries()) {
            if ((now - tracker.windowStart) > 10000) {
                requestWindowMap.delete(ip);
            }
        }
        // Enforce hard cap of 10,000 entries
        if (requestWindowMap.size > 10000) {
            let deleted = 0;
            for (const key of requestWindowMap.keys()) {
                requestWindowMap.delete(key);
                deleted++;
                if (deleted >= 2500) break;
            }
        }

        // 2. Sweep expired temporary IP bans
        let ipChanged = false;
        for (const [ip, val] of bannedIps.entries()) {
            if (!val.permanent && val.bannedUntil > 0 && val.bannedUntil <= now) {
                bannedIps.delete(ip);
                ipChanged = true;
            }
        }
        if (ipChanged) persistBannedIps();

        // 3. Sweep expired temporary MAC bans
        let macChanged = false;
        for (const [mac, val] of bannedMacs.entries()) {
            if (!val.permanent && val.bannedUntil > 0 && val.bannedUntil <= now) {
                bannedMacs.delete(mac);
                macChanged = true;
            }
        }
        if (macChanged) persistBannedMacs();

        // 4. Sweep ipProbedMacs
        for (const [ip, tracker] of ipProbedMacs.entries()) {
            if ((now - tracker.windowStart) > 60000) {
                ipProbedMacs.delete(ip);
            }
        }

        // 5. Sweep repeatOffenderMap (clean inactive entries older than 7 days)
        const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
        for (const [target, entry] of repeatOffenderMap.entries()) {
            if ((now - entry.lastSeen) > SEVEN_DAYS) {
                repeatOffenderMap.delete(target);
            }
        }
        if (repeatOffenderMap.size > 5000) {
            let deleted = 0;
            for (const key of repeatOffenderMap.keys()) {
                repeatOffenderMap.delete(key);
                deleted++;
                if (deleted >= 1000) break;
            }
        }

        // 6. Sweep SecurityGateKeeper memory
        try {
            const { SecurityGateKeeper } = require('./securityGateKeeper');
            if (SecurityGateKeeper && typeof SecurityGateKeeper.sweepStaleMemory === 'function') {
                SecurityGateKeeper.sweepStaleMemory();
            }
        } catch (e) {}
    }

    /**
     * Exports the active blocklist in standard formats (iptables, nftables, ipset, fail2ban, plain, cidr)
     */
    static exportBlocklist(format: 'plain' | 'fail2ban' | 'iptables' | 'nftables' | 'ipset' | 'cidr' = 'plain'): string {
        const now = Date.now();
        const ips: string[] = [];
        bannedIps.forEach((val, ip) => {
            if (val.permanent || val.bannedUntil === 0 || val.bannedUntil > now) {
                ips.push(ip);
            }
        });

        switch (format.toLowerCase()) {
            case 'iptables':
                return [
                    '#!/bin/bash',
                    '# Stalker Pro 2.0 Perimeter Defense - Generated IPTABLES rules',
                    '# Drops all active quarantined IPs at Linux kernel level',
                    'iptables -N STALKER_BLOCKLIST 2>/dev/null || true',
                    ...ips.map(ip => `iptables -A STALKER_BLOCKLIST -s ${ip} -j DROP`),
                    'iptables -C INPUT -j STALKER_BLOCKLIST 2>/dev/null || iptables -I INPUT 1 -j STALKER_BLOCKLIST',
                    `echo "[+] Injected ${ips.length} blocked IPs into STALKER_BLOCKLIST iptables chain."`
                ].join('\n');

            case 'nftables':
                return [
                    '# Stalker Pro 2.0 Perimeter Defense - Generated NFTABLES set',
                    'table inet filter {',
                    '    set stalker_blocked_ips {',
                    '        type ipv4_addr',
                    '        flags interval',
                    '        elements = {',
                    ips.map(ip => `            ${ip}`).join(',\n'),
                    '        }',
                    '    }',
                    '    chain input {',
                    '        type filter hook input priority 0; policy accept;',
                    '        ip saddr @stalker_blocked_ips drop',
                    '    }',
                    '}'
                ].join('\n');

            case 'ipset':
                return [
                    '#!/bin/bash',
                    '# Stalker Pro 2.0 Perimeter Defense - Generated IPSET batch',
                    'ipset create stalker_blacklist hash:ip hashsize 4096 maxelem 100000 2>/dev/null || true',
                    ...ips.map(ip => `ipset add stalker_blacklist ${ip} -exist`),
                    'iptables -C INPUT -m set --match-set stalker_blacklist src -j DROP 2>/dev/null || iptables -I INPUT 1 -m set --match-set stalker_blacklist src -j DROP',
                    `echo "[+] Injected ${ips.length} blocked IPs into stalker_blacklist ipset."`
                ].join('\n');

            case 'fail2ban':
                return [
                    '# Stalker Pro 2.0 Perimeter Defense - Active Fail2ban Quarantined IPs',
                    ...ips.map(ip => `${ip} # Banned by Perimeter Defense`)
                ].join('\n');

            case 'cidr':
                return ips.map(ip => ip.includes(':') ? `${ip}/128` : `${ip}/32`).join('\n');

            case 'plain':
            default:
                return ips.join('\n');
        }
    }

    /**
     * Express Middleman Firewall Layer
     */
    static middleware() {
        return (req: Request, res: Response, next: NextFunction) => {
            const ip = PerimeterDefenseShield.getCleanIp(req);
            const normalizedPath = (req.path || '').toLowerCase();
            const fullUrl = req.originalUrl || req.url || '';

            // 1. Check if client MAC address is quarantined (Targeted at IPTV/Stalker Scanners)
            const clientMac = PerimeterDefenseShield.extractMacFromRequest(req);
            if (clientMac) {
                const macBan = PerimeterDefenseShield.isMacBanned(clientMac);
                if (macBan.banned) {
                    PerimeterDefenseShield.totalBlocked++;
                    PerimeterDefenseShield.logIncident(req, 'PROHIBITED_MAC', `Access blocked for quarantined MAC address: ${clientMac}. Reason: ${macBan.reason}`);
                    return res.status(403).json({
                        error: "403 Forbidden: MAC Address Quarantined by Perimeter Defense Shield",
                        mac: clientMac,
                        reason: macBan.reason,
                        permanent: macBan.permanent,
                        retryAfterSeconds: macBan.remainingSeconds
                    });
                }
            }

            // 1b. Check if Hardware Device ID / Fingerprint is quarantined
            const clientDev = PerimeterDefenseShield.extractDeviceFromRequest(req);
            if (clientDev.deviceId || clientDev.deviceFingerprint) {
                const devBan = PerimeterDefenseShield.isDeviceBanned(clientDev.deviceId, clientDev.deviceFingerprint);
                if (devBan.banned) {
                    PerimeterDefenseShield.totalBlocked++;
                    PerimeterDefenseShield.logIncident(req, 'PROHIBITED_DEVICE', `Access blocked for quarantined hardware device: ${clientDev.deviceId || clientDev.deviceFingerprint}. Reason: ${devBan.reason}`);
                    return res.status(403).json({
                        error: "403 Forbidden: Hardware Device Signature Quarantined by Perimeter Defense Shield",
                        deviceId: clientDev.deviceId,
                        reason: devBan.reason,
                        permanent: devBan.permanent,
                        retryAfterSeconds: devBan.remainingSeconds
                    });
                }
            }

            // Allow local loopback & whitelisted IPs to bypass IP ban, bot checks, and burst limits
            if (PerimeterDefenseShield.isWhitelisted(ip)) {
                bannedIps.delete(ip);
                return next();
            }

            // 1c. Check if IP is already in dynamic ban firewall
            const banStatus = PerimeterDefenseShield.isIpBanned(ip);
            if (banStatus.banned) {
                return res.status(403).json({
                    error: "403 Forbidden: IP Quarantined by Perimeter Defense Shield",
                    reason: banStatus.reason,
                    permanent: banStatus.permanent,
                    retryAfterSeconds: banStatus.remainingSeconds
                });
            }

            // 2. Honeypot Traps: Instant 24-hour Ban (Auto-escalates on repeat)
            if (HONEYPOT_PATHS.has(normalizedPath) || normalizedPath.startsWith('/.env') || normalizedPath.startsWith('/.git')) {
                PerimeterDefenseShield.honeypotHits++;
                PerimeterDefenseShield.banIp(ip, `Honeypot Trap Triggered: ${normalizedPath}`, HONEYPOT_BAN_DURATION_MS);
                PerimeterDefenseShield.logIncident(req, 'HONEYPOT_TRAP', `Attempted recon on decoy honeypot: ${normalizedPath}`);
                return res.status(403).send("403 Forbidden: Malicious reconnaissance detected and quarantined.");
            }

            // 3. Behavioral Bot Detection & Known Automated Attack Tooling
            const botCheck = PerimeterDefenseShield.detectBehavioralBot(req);
            if (botCheck.isBot) {
                PerimeterDefenseShield.banIp(ip, botCheck.reason || 'Automated Bot Anomaly', TEMP_BAN_DURATION_MS);
                PerimeterDefenseShield.logIncident(req, 'MALICIOUS_BOT', botCheck.reason || 'Automated Bot Anomaly');
                return res.status(403).send(`403 Forbidden: ${botCheck.reason || 'Automated attack bot detected'}`);
            }

            // 4. Advanced Exploit Payload Normalization & Inspection (URL, Query, and Body)
            const { normalized: normUrl, hasNullByte: nullInUrl } = normalizePayload(fullUrl);
            let hasExploit = nullInUrl;
            let exploitDetail = nullInUrl ? 'Null Byte (%00) Detected in Request URL' : '';

            if (!hasExploit) {
                if (PATH_TRAVERSAL_REGEX.test(normUrl)) {
                    hasExploit = true;
                    exploitDetail = 'Directory / Path Traversal Attack (../)';
                } else if (SQLI_REGEX.test(normUrl)) {
                    hasExploit = true;
                    exploitDetail = 'SQL Injection Payload';
                } else if (COMMAND_INJECTION_REGEX.test(normUrl)) {
                    hasExploit = true;
                    exploitDetail = 'Operating System Command Injection';
                } else if (PHP_WRAPPER_REGEX.test(normUrl)) {
                    hasExploit = true;
                    exploitDetail = 'Prohibited PHP Pseudo-Wrapper Stream';
                } else if (XSS_REGEX.test(normUrl)) {
                    hasExploit = true;
                    exploitDetail = 'Cross-Site Scripting (XSS) / Script Injection';
                }
            }

            // Check non-binary request body if present
            if (!hasExploit && req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
                try {
                    const bodyStr = JSON.stringify(req.body);
                    if (bodyStr.length < 50000) {
                        const { normalized: normBody, hasNullByte: nullInBody } = normalizePayload(bodyStr);
                        if (nullInBody) {
                            hasExploit = true;
                            exploitDetail = 'Null Byte (%00) Detected in Request Body';
                        } else if (PATH_TRAVERSAL_REGEX.test(normBody) && !normalizedPath.startsWith('/api/admin/')) {
                            hasExploit = true;
                            exploitDetail = 'Path Traversal Payload in Request Body';
                        } else if (SQLI_REGEX.test(normBody)) {
                            hasExploit = true;
                            exploitDetail = 'SQL Injection Payload in Request Body';
                        } else if (COMMAND_INJECTION_REGEX.test(normBody) && !normalizedPath.startsWith('/api/admin/')) {
                            hasExploit = true;
                            exploitDetail = 'Command Injection in Request Body';
                        }
                    }
                } catch (e) {}
            }

            if (hasExploit) {
                PerimeterDefenseShield.banIp(ip, `Exploit Signature: ${exploitDetail}`, HONEYPOT_BAN_DURATION_MS);
                PerimeterDefenseShield.logIncident(req, 'EXPLOIT_PAYLOAD', `Dangerous payload (${exploitDetail}): ${fullUrl.slice(0, 80)}`);
                return res.status(403).send("403 Forbidden: Dangerous exploit signature prohibited by Perimeter Defense Shield.");
            }

            // 5. Anti-Scraping Burst Limiter (exempt static assets, logos, media streams, and image proxies)
            const isExemptAssetOrStream =
                STATIC_OR_MEDIA_EXT_REGEX.test(normalizedPath) ||
                normalizedPath.startsWith('/assets/') ||
                normalizedPath.startsWith('/logos/') ||
                normalizedPath.startsWith('/live.php') ||
                normalizedPath.startsWith('/stream_proxy.php') ||
                normalizedPath.startsWith('/api/comics/proxy-image') ||
                normalizedPath.startsWith('/api/admin/') ||
                normalizedPath.startsWith('/api/play_stream/');

            if (!isExemptAssetOrStream) {
                const now = Date.now();
                let tracker = requestWindowMap.get(ip);
                if (!tracker || (now - tracker.windowStart) > BURST_WINDOW_MS) {
                    tracker = { count: 1, windowStart: now };
                    requestWindowMap.set(ip, tracker);
                } else {
                    tracker.count++;
                    if (tracker.count > BURST_LIMIT) {
                        PerimeterDefenseShield.scrapersTerminated++;
                        PerimeterDefenseShield.banIp(ip, `Excessive Scraping Burst (${tracker.count} req/s)`, TEMP_BAN_DURATION_MS);
                        PerimeterDefenseShield.logIncident(req, 'SCRAPER_FLOOD', `Rate limit exceeded: ${tracker.count} requests in 1s`);
                        return res.status(429).json({
                            error: "429 Too Many Requests: Scraping burst detected. Access temporarily suspended."
                        });
                    }
                }
            }

            next();
        };
    }

    /**
     * Get live telemetry status for admin monitor
     */
    static getStatus() {
        const now = Date.now();
        const activeBanned: Array<{ ip: string; reason: string; remainingMinutes: number; permanent?: boolean }> = [];
        bannedIps.forEach((val, ip) => {
            if (val.permanent || val.bannedUntil === 0 || val.bannedUntil > now) {
                activeBanned.push({
                    ip,
                    reason: val.reason,
                    permanent: !!val.permanent,
                    remainingMinutes: val.permanent ? -1 : Math.ceil((val.bannedUntil - now) / 60000)
                });
            }
        });

        const activeBannedMacs: Array<{ mac: string; reason: string; remainingMinutes: number; permanent?: boolean }> = [];
        bannedMacs.forEach((val, mac) => {
            if (val.permanent || val.bannedUntil === 0 || val.bannedUntil > now) {
                activeBannedMacs.push({
                    mac,
                    reason: val.reason,
                    permanent: !!val.permanent,
                    remainingMinutes: val.permanent ? -1 : Math.ceil((val.bannedUntil - now) / 60000)
                });
            }
        });

        const activeBannedDevices = getAllBannedDevices();

        return {
            status: "active",
            layer: "Outermost Perimeter Defense Shield (L7 WAF + Anti-Bot + Device/MAC Quarantine + Fail2ban Engine)",
            totalThreatsBlocked: this.totalBlocked,
            scrapersTerminated: this.scrapersTerminated,
            honeypotHits: this.honeypotHits,
            activeBannedIpsCount: activeBanned.length,
            bannedIps: activeBanned,
            activeBannedMacsCount: activeBannedMacs.length,
            bannedMacs: activeBannedMacs,
            activeBannedDevicesCount: activeBannedDevices.length,
            bannedDevices: activeBannedDevices,
            recentIncidents: threatIncidents.slice(0, 30)
        };
    }

    /**
     * Unban an IP manually
     */
    static unbanIp(ip: string): boolean {
        const clean = ip.trim();
        const res = bannedIps.delete(clean);
        repeatOffenderMap.delete(clean);
        if (res) persistBannedIps();
        return res;
    }
}

// Background memory sweeper running every 30 seconds to prevent map growth
const gcInterval = setInterval(() => {
    try {
        PerimeterDefenseShield.sweepStaleMemory();
    } catch (e) {}
}, 30000);
gcInterval.unref();
