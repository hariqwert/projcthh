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

const BANNED_IPS_FILE = path.join(process.cwd(), 'doctor_strange', 'banned_ips.json');
const BANNED_MACS_FILE = path.join(process.cwd(), 'doctor_strange', 'banned_macs.json');

// In-memory threat tracking & dynamic firewall
const bannedIps = new Map<string, { bannedUntil: number; reason: string }>();
const bannedMacs = new Map<string, { bannedUntil: number; reason: string }>();
const requestWindowMap = new Map<string, { count: number; windowStart: number }>();
const threatIncidents: ThreatIncident[] = [];
const MAX_LOGGED_INCIDENTS = 100;

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
                if (item && item.ip && item.bannedUntil > now) {
                    bannedIps.set(item.ip, { bannedUntil: item.bannedUntil, reason: item.reason || 'Manual IP Quarantine' });
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
            .filter(([_, val]) => val.bannedUntil > now)
            .map(([ip, val]) => ({ ip, bannedUntil: val.bannedUntil, reason: val.reason }));
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
                if (item && item.mac && item.bannedUntil > now) {
                    bannedMacs.set(item.mac, { bannedUntil: item.bannedUntil, reason: item.reason || 'Manual MAC Quarantine' });
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
            .filter(([_, val]) => val.bannedUntil > now)
            .map(([mac, val]) => ({ mac, bannedUntil: val.bannedUntil, reason: val.reason }));
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

// Dangerous exploit signatures in URL / parameters
const EXPLOIT_PAYLOAD_REGEX = /(\.\.[\/\\]|\bunion\s+select\b|\bselect\s+.*\s+from\b|<script\b|\bjavascript:|\beval\(|\bbase64_decode|\/etc\/passwd|\/proc\/self|\bchmod\s+[0-7]+|\b(cat|nc|curl|wget)\s+.*http)/i;

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
    static isIpBanned(ip: string): { banned: boolean; reason?: string; remainingSeconds?: number } {
        if (this.isWhitelisted(ip)) {
            bannedIps.delete(ip);
            persistBannedIps();
            return { banned: false };
        }
        const record = bannedIps.get(ip);
        if (!record) return { banned: false };

        const now = Date.now();
        if (record.bannedUntil > now) {
            return {
                banned: true,
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
     * Bans an IP immediately
     */
    static banIp(ip: string, reason: string, durationMs: number = TEMP_BAN_DURATION_MS): void {
        if (this.isWhitelisted(ip)) return;
        bannedIps.set(ip, {
            bannedUntil: Date.now() + durationMs,
            reason
        });
        persistBannedIps();
        console.warn(`[PERIMETER DEFENSE] 🔥 IP BANNED: ${ip} for ${Math.round(durationMs / 60000)}m. Reason: ${reason}`);
    }

    /**
     * Checks if MAC address is currently banned in perimeter firewall
     */
    static isMacBanned(mac: string): { banned: boolean; reason?: string; remainingSeconds?: number } {
        const norm = this.normalizeMac(mac);
        if (!norm) return { banned: false };

        const record = bannedMacs.get(norm);
        if (!record) return { banned: false };

        const now = Date.now();
        if (record.bannedUntil > now) {
            return {
                banned: true,
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
     * Bans a MAC address in perimeter firewall
     */
    static banMac(mac: string, reason: string, durationMs: number = HONEYPOT_BAN_DURATION_MS): void {
        const norm = this.normalizeMac(mac);
        if (!norm) return;

        bannedMacs.set(norm, {
            bannedUntil: Date.now() + durationMs,
            reason
        });
        persistBannedMacs();
        console.warn(`[PERIMETER DEFENSE] 🛑 MAC BANNED: ${norm} for ${Math.round(durationMs / 60000)}m. Reason: ${reason}`);
    }

    /**
     * Unbans a MAC address
     */
    static unbanMac(mac: string): boolean {
        const norm = this.normalizeMac(mac);
        if (!norm) return false;
        const res = bannedMacs.delete(norm);
        if (res) persistBannedMacs();
        return res;
    }

    /**
     * Device Ban proxy to deviceBindingService
     */
    static banDevice(deviceId?: string, fingerprint?: string, reason: string = 'Perimeter Device Ban', durationMs: number = HONEYPOT_BAN_DURATION_MS): void {
        banDeviceInBinding(deviceId, fingerprint, reason, durationMs);
    }

    static isDeviceBanned(deviceId?: string, fingerprint?: string): { banned: boolean; reason?: string; remainingSeconds?: number } {
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
    }

    /**
     * Express Middleman Firewall Layer
     */
    static middleware() {
        return (req: Request, res: Response, next: NextFunction) => {
            const ip = PerimeterDefenseShield.getCleanIp(req);
            const userAgent = (req.headers['user-agent'] as string) || '';
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
                        retryAfterSeconds: devBan.remainingSeconds
                    });
                }
            }

            // Allow local loopback & whitelisted IPs to bypass IP ban and burst limits
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
                    retryAfterSeconds: banStatus.remainingSeconds
                });
            }

            // 2. Honeypot Traps: Instant 24-hour Ban
            if (HONEYPOT_PATHS.has(normalizedPath) || normalizedPath.startsWith('/.env') || normalizedPath.startsWith('/.git')) {
                PerimeterDefenseShield.honeypotHits++;
                PerimeterDefenseShield.banIp(ip, `Honeypot Trap Triggered: ${normalizedPath}`, HONEYPOT_BAN_DURATION_MS);
                PerimeterDefenseShield.logIncident(req, 'HONEYPOT_TRAP', `Attempted recon on decoy honeypot: ${normalizedPath}`);
                return res.status(403).send("403 Forbidden: Malicious reconnaissance detected and quarantined.");
            }

            // 3. Known Automated Attack Tooling / Malicious Bot User-Agents
            if (userAgent && BLOCKED_BOT_REGEX.test(userAgent)) {
                PerimeterDefenseShield.banIp(ip, `Prohibited Scraper/Attack Bot UA: ${userAgent.slice(0, 40)}`, TEMP_BAN_DURATION_MS);
                PerimeterDefenseShield.logIncident(req, 'MALICIOUS_BOT', `Blocked attack bot UA: ${userAgent}`);
                return res.status(403).send("403 Forbidden: Automated scrapers and scanning tools are strictly prohibited.");
            }

            // 4. Missing User-Agent on Web Client Pages (Block raw headless probes)
            const isClientPageRequest = (
                normalizedPath === '/' || 
                normalizedPath.endsWith('.html') || 
                normalizedPath.endsWith('.php')
            ) && !normalizedPath.startsWith('/api/');
            if (isClientPageRequest && (!userAgent || userAgent.trim().length < 5)) {
                PerimeterDefenseShield.logIncident(req, 'PROHIBITED_AGENT', 'Request missing User-Agent header');
                return res.status(403).send("403 Forbidden: Legitimate browser client signature required.");
            }

            // 5. Exploit / Injection Payload Scanner in URL & Query String
            if (EXPLOIT_PAYLOAD_REGEX.test(fullUrl)) {
                PerimeterDefenseShield.banIp(ip, `Exploit Signature Detected in Request URL`, TEMP_BAN_DURATION_MS);
                PerimeterDefenseShield.logIncident(req, 'EXPLOIT_PAYLOAD', `Dangerous payload in URL: ${fullUrl.slice(0, 80)}`);
                return res.status(403).send("403 Forbidden: Dangerous request signature prohibited by Perimeter Defense Shield.");
            }

            // 6. Anti-Scraping Burst Limiter (exempt static assets, logos, media streams, and image proxies)
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
        const activeBanned: Array<{ ip: string; reason: string; remainingMinutes: number }> = [];
        bannedIps.forEach((val, ip) => {
            if (val.bannedUntil > now) {
                activeBanned.push({
                    ip,
                    reason: val.reason,
                    remainingMinutes: Math.ceil((val.bannedUntil - now) / 60000)
                });
            }
        });

        const activeBannedMacs: Array<{ mac: string; reason: string; remainingMinutes: number }> = [];
        bannedMacs.forEach((val, mac) => {
            if (val.bannedUntil > now) {
                activeBannedMacs.push({
                    mac,
                    reason: val.reason,
                    remainingMinutes: Math.ceil((val.bannedUntil - now) / 60000)
                });
            }
        });

        const activeBannedDevices = getAllBannedDevices();

        return {
            status: "active",
            layer: "Outermost Perimeter Defense Shield (L7 WAF + Anti-Bot + Device/MAC Quarantine)",
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
        const res = bannedIps.delete(ip.trim());
        if (res) persistBannedIps();
        return res;
    }
}
