import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

export interface ThreatIncident {
    timestamp: number;
    ip: string;
    type: 'MALICIOUS_BOT' | 'SCRAPER_FLOOD' | 'HONEYPOT_TRAP' | 'EXPLOIT_PAYLOAD' | 'PROHIBITED_AGENT';
    detail: string;
    path: string;
    userAgent: string;
}

// In-memory threat tracking & dynamic firewall
const bannedIps = new Map<string, { bannedUntil: number; reason: string }>();
const requestWindowMap = new Map<string, { count: number; windowStart: number }>();
const threatIncidents: ThreatIncident[] = [];
const MAX_LOGGED_INCIDENTS = 100;

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

// Rate limit: 40 requests per 1-second burst window for automated scrapers
const BURST_LIMIT = 40;
const BURST_WINDOW_MS = 1000;
const TEMP_BAN_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const HONEYPOT_BAN_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

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
     * Checks if IP is currently banned in perimeter firewall
     */
    static isIpBanned(ip: string): { banned: boolean; reason?: string; remainingSeconds?: number } {
        if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
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
        return { banned: false };
    }

    /**
     * Bans an IP immediately
     */
    static banIp(ip: string, reason: string, durationMs: number = TEMP_BAN_DURATION_MS): void {
        if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') return;
        bannedIps.set(ip, {
            bannedUntil: Date.now() + durationMs,
            reason
        });
        console.warn(`[PERIMETER DEFENSE] 🔥 IP BANNED: ${ip} for ${Math.round(durationMs / 60000)}m. Reason: ${reason}`);
    }

    /**
     * Logs threat incident
     */
    static logIncident(req: Request, type: ThreatIncident['type'], detail: string): void {
        const ip = this.getCleanIp(req);
        this.totalBlocked++;

        const incident: ThreatIncident = {
            timestamp: Date.now(),
            ip,
            type,
            detail,
            path: req.path || req.originalUrl || '',
            userAgent: (req.headers['user-agent'] as string) || 'none'
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

            // Allow local loopback always
            if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
                return next();
            }

            // 1. Check if IP is already in dynamic ban firewall
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

            // 6. Anti-Scraping Burst Limiter
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

        return {
            status: "active",
            layer: "Outermost Perimeter Defense Shield (L7 WAF + Anti-Bot)",
            totalThreatsBlocked: this.totalBlocked,
            scrapersTerminated: this.scrapersTerminated,
            honeypotHits: this.honeypotHits,
            activeBannedIpsCount: activeBanned.length,
            bannedIps: activeBanned,
            recentIncidents: threatIncidents.slice(0, 30)
        };
    }

    /**
     * Unban an IP manually
     */
    static unbanIp(ip: string): boolean {
        return bannedIps.delete(ip.trim());
    }
}
