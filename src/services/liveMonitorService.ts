import fs from 'fs';
import path from 'path';
import { Request } from 'express';
import { getAllBoundDevices, revokeDevice } from './deviceBindingService';
import { getAllDetailedSessions, endUserStreamSession, formatDuration } from './loggerService';

export interface ActiveVisitor {
    ip: string;
    deviceId: string;
    deviceLabel: string;
    browserName: string;
    userAgent: string;
    currentPage: string;
    pageLabel: string;
    isStreaming: boolean;
    playingStream: string;
    playingUrl: string;
    firstSeenAt: number;
    lastSeenAt: number;
}

export interface UnlockedPasswordSession {
    ip: string;
    deviceId: string;
    deviceLabel: string;
    browserName: string;
    userAgent: string;
    authMethod: string;
    enteredAt: number;
    expiresAt: number;
    currentPage?: string;
    lastSeenAt?: number;
}

const UNLOCKED_META_FILE = path.join(process.cwd(), 'doctor_strange', 'unlocked_sessions_meta.json');
const UNLOCKED_IPS_FILE = path.join(process.cwd(), 'doctor_strange', 'unlocked_ips.json');

// In-Memory store for Active Visitors (swept after 90 seconds of inactivity)
const activeVisitorsMap = new Map<string, ActiveVisitor>();

// In-Memory store for Unlocked Password Sessions
const unlockedSessionsMap = new Map<string, UnlockedPasswordSession>();

/**
 * Clean and normalize client IP
 */
export function cleanIp(rawIp: any): string {
    if (!rawIp) return '127.0.0.1';
    const first = Array.isArray(rawIp) ? rawIp[0] : String(rawIp).split(',')[0].trim();
    return first.replace(/^::ffff:/, '').trim() || '127.0.0.1';
}

/**
 * Parse User Agent for human-friendly device & browser names
 */
export function parseUserAgent(ua: string): { browserName: string; deviceLabel: string } {
    if (!ua) return { browserName: 'Web Browser', deviceLabel: 'Standard Device' };
    const str = String(ua);
    let browser = 'Web Browser';
    let os = 'Device';

    if (str.includes('Edg/')) browser = 'Edge';
    else if (str.includes('Chrome/')) browser = 'Chrome';
    else if (str.includes('Firefox/')) browser = 'Firefox';
    else if (str.includes('Safari/') && !str.includes('Chrome/')) browser = 'Safari';
    else if (str.includes('VLC')) browser = 'VLC Player';
    else if (str.includes('TiviMate')) browser = 'TiviMate';
    else if (str.includes('Kodi')) browser = 'Kodi';
    else if (str.includes('ExoPlayer')) browser = 'ExoPlayer';

    if (str.includes('Windows')) os = 'Windows';
    else if (str.includes('Macintosh') || str.includes('Mac OS')) os = 'macOS';
    else if (str.includes('Android')) os = 'Android';
    else if (str.includes('iPhone') || str.includes('iPad')) os = 'iOS';
    else if (str.includes('Linux')) os = 'Linux';

    return {
        browserName: browser,
        deviceLabel: `${browser} on ${os}`
    };
}

/**
 * Get friendly page label based on request path
 */
export function getFriendlyPageLabel(p: string): string {
    if (!p || p === '/' || p === '/index.html') return 'Home TV Portal';
    if (p.includes('sports.html') || p.includes('sports')) return 'Live Sports Hub';
    if (p.includes('consumet.html') || p.includes('consumet')) return 'Consumet Cinema';
    if (p.includes('music.html') || p.includes('music')) return 'Quantum Audio Lounge';
    if (p.includes('hero.html') || p.includes('hero')) return 'Hero Aetheris Stage';
    if (p.includes('subway.html') || p.includes('subway')) return 'Subway Arcade';
    if (p.includes('live.php') || p.includes('play_stream')) return 'Streaming Player';
    if (p.includes('hari') || p.includes('admin')) return 'Citadel Admin';
    return p.length > 25 ? p.slice(0, 25) + '...' : p;
}

/**
 * Load Unlocked Sessions from disk
 */
export function loadUnlockedSessions(): void {
    try {
        if (fs.existsSync(UNLOCKED_META_FILE)) {
            const raw = fs.readFileSync(UNLOCKED_META_FILE, 'utf8');
            const data = JSON.parse(raw);
            const now = Date.now();
            unlockedSessionsMap.clear();
            if (Array.isArray(data)) {
                for (const item of data) {
                    if (item && item.ip && item.expiresAt > now) {
                        const key = item.deviceId ? `${item.ip}_${item.deviceId}` : item.ip;
                        unlockedSessionsMap.set(key, item);
                    }
                }
            }
        }
        // Also cross-reference unlocked_ips.json to ensure every unlocked IP is present
        if (fs.existsSync(UNLOCKED_IPS_FILE)) {
            const raw = fs.readFileSync(UNLOCKED_IPS_FILE, 'utf8');
            const ips = JSON.parse(raw);
            const now = Date.now();
            if (typeof ips === 'object' && ips !== null) {
                for (const [ip, expiry] of Object.entries(ips)) {
                    if (typeof expiry === 'number' && expiry > now) {
                        const exists = Array.from(unlockedSessionsMap.values()).some(s => s.ip === ip);
                        if (!exists) {
                            unlockedSessionsMap.set(ip, {
                                ip,
                                deviceId: '',
                                deviceLabel: 'Whitelisted IP Client',
                                browserName: 'Web Browser',
                                userAgent: 'Whitelisted Session',
                                authMethod: 'Site Passcode',
                                enteredAt: now - 60000,
                                expiresAt: expiry,
                                currentPage: '/'
                            });
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.error('[LiveMonitor] Failed to load unlocked sessions from disk:', e);
    }
}

/**
 * Persist Unlocked Sessions to disk
 */
export function persistUnlockedSessions(): void {
    try {
        const now = Date.now();
        const validSessions = Array.from(unlockedSessionsMap.values()).filter(s => s.expiresAt > now);
        fs.writeFileSync(UNLOCKED_META_FILE, JSON.stringify(validSessions, null, 2), 'utf8');

        // Also sync unlocked_ips.json
        const ipMap: Record<string, number> = {};
        for (const s of validSessions) {
            if (s.ip && s.ip !== '127.0.0.1' && s.ip !== '::1' && s.ip !== 'localhost') {
                ipMap[s.ip] = Math.max(ipMap[s.ip] || 0, s.expiresAt);
            }
        }
        fs.writeFileSync(UNLOCKED_IPS_FILE, JSON.stringify(ipMap, null, 2), 'utf8');
    } catch (e) {
        console.error('[LiveMonitor] Failed to persist unlocked sessions:', e);
    }
}

// Initial load on startup
loadUnlockedSessions();

/**
 * Record or update real-time visitor activity from an incoming HTTP request
 */
export function recordVisitorFromRequest(req: Request): void {
    try {
        const p = req.path || '';
        // Skip purely static assets and fonts
        if (/\.(js|css|png|jpg|jpeg|svg|ico|gif|woff|woff2|ttf|map)$/i.test(p)) {
            return;
        }

        const ip = cleanIp(
            req.headers['x-forwarded-for'] ||
            req.headers['cf-connecting-ip'] ||
            req.headers['x-real-ip'] ||
            req.ip ||
            req.socket?.remoteAddress
        );

        const ua = (req.headers['user-agent'] as string) || '';
        const { browserName, deviceLabel } = parseUserAgent(ua);

        // Check hardware deviceId from headers, query, or cookies
        const deviceId = String(
            req.headers['x-device-id'] ||
            req.query?.deviceId ||
            req.cookies?.deviceId ||
            ''
        ).trim();

        const visitorKey = deviceId ? `${ip}_${deviceId}` : ip;
        const now = Date.now();

        // Check if stream request
        const isStreaming = p.includes('/live.php') || p.includes('/api/play_stream') || p.includes('/proxy');
        let playingStream = '';
        let playingUrl = '';

        if (isStreaming) {
            playingStream = String(req.query?.name || req.query?.id || req.params?.id || 'Live Channel Stream');
            playingUrl = req.originalUrl || req.url;
        }

        const existing = activeVisitorsMap.get(visitorKey);
        if (existing) {
            existing.lastSeenAt = now;
            existing.currentPage = p;
            existing.pageLabel = getFriendlyPageLabel(p);
            if (ua) existing.userAgent = ua;
            if (isStreaming) {
                existing.isStreaming = true;
                existing.playingStream = playingStream;
                existing.playingUrl = playingUrl;
            }
        } else {
            activeVisitorsMap.set(visitorKey, {
                ip,
                deviceId,
                deviceLabel,
                browserName,
                userAgent: ua,
                currentPage: p,
                pageLabel: getFriendlyPageLabel(p),
                isStreaming,
                playingStream,
                playingUrl,
                firstSeenAt: now,
                lastSeenAt: now
            });
        }

        // Update session lastSeen and currentPage if unlocked
        for (const s of unlockedSessionsMap.values()) {
            if (s.ip === ip || (deviceId && s.deviceId === deviceId)) {
                s.currentPage = p;
                s.lastSeenAt = now;
            }
        }
    } catch (e) {}
}

/**
 * Register a successful password/PIN unlock
 */
export function recordPasswordUnlock(params: {
    ip: string;
    deviceId?: string;
    deviceLabel?: string;
    userAgent?: string;
    authMethod?: string;
    durationMs: number;
}): UnlockedPasswordSession {
    const ip = cleanIp(params.ip);
    const deviceId = params.deviceId ? String(params.deviceId).trim() : '';
    const ua = params.userAgent || '';
    const parsed = parseUserAgent(ua);
    const now = Date.now();
    const expiresAt = now + params.durationMs;

    const session: UnlockedPasswordSession = {
        ip,
        deviceId,
        deviceLabel: params.deviceLabel || parsed.deviceLabel,
        browserName: parsed.browserName,
        userAgent: ua,
        authMethod: params.authMethod || 'Master PIN',
        enteredAt: now,
        expiresAt,
        currentPage: '/',
        lastSeenAt: now
    };

    const key = deviceId ? `${ip}_${deviceId}` : ip;
    unlockedSessionsMap.set(key, session);
    persistUnlockedSessions();

    return session;
}

/**
 * Revoke password session for IP or device
 */
export function revokePasswordSession(ip?: string, deviceId?: string): boolean {
    let changed = false;
    const targetIp = ip ? cleanIp(ip) : '';

    for (const [key, s] of Array.from(unlockedSessionsMap.entries())) {
        if ((targetIp && s.ip === targetIp) || (deviceId && s.deviceId === deviceId)) {
            unlockedSessionsMap.delete(key);
            changed = true;
        }
    }

    if (deviceId) {
        revokeDevice(deviceId);
    }

    if (changed) {
        persistUnlockedSessions();
    }
    return changed;
}

/**
 * Extend password expiry hours for IP or device
 */
export function extendPasswordSession(params: {
    ip?: string;
    deviceId?: string;
    hours: number;
    mode: 'add' | 'set';
}): { success: boolean; newExpiresAt?: number; remainingHours?: number } {
    const now = Date.now();
    const targetIp = params.ip ? cleanIp(params.ip) : '';
    let foundSession: UnlockedPasswordSession | null = null;

    for (const s of unlockedSessionsMap.values()) {
        if ((targetIp && s.ip === targetIp) || (params.deviceId && s.deviceId === params.deviceId)) {
            foundSession = s;
            break;
        }
    }

    if (!foundSession && targetIp) {
        // Create session on the fly if not exists
        foundSession = {
            ip: targetIp,
            deviceId: params.deviceId || '',
            deviceLabel: 'Authorized Device',
            browserName: 'Web Browser',
            userAgent: '',
            authMethod: 'Admin Override',
            enteredAt: now,
            expiresAt: now + (params.hours * 3600000),
            currentPage: '/',
            lastSeenAt: now
        };
        const key = params.deviceId ? `${targetIp}_${params.deviceId}` : targetIp;
        unlockedSessionsMap.set(key, foundSession);
    }

    if (!foundSession) {
        return { success: false };
    }

    const durationMs = params.hours * 3600000;
    if (params.mode === 'add') {
        const base = Math.max(now, foundSession.expiresAt);
        foundSession.expiresAt = base + durationMs;
    } else {
        foundSession.expiresAt = now + durationMs;
    }

    persistUnlockedSessions();

    const remainingHours = Math.max(0, Math.round(((foundSession.expiresAt - now) / 3600000) * 10) / 10);
    return {
        success: true,
        newExpiresAt: foundSession.expiresAt,
        remainingHours
    };
}

/**
 * Clear all password sessions
 */
export function clearAllPasswordSessions(): void {
    unlockedSessionsMap.clear();
    persistUnlockedSessions();
}

/**
 * Kick user instantly (drop active streams & remove from visitor map)
 */
export function kickUser(ip: string, deviceId?: string): boolean {
    const targetIp = cleanIp(ip);
    let kicked = false;

    // 1. Remove from active visitors
    for (const [key, v] of Array.from(activeVisitorsMap.entries())) {
        if (v.ip === targetIp || (deviceId && v.deviceId === deviceId)) {
            activeVisitorsMap.delete(key);
            kicked = true;
        }
    }

    // 2. End stream session in logger service
    try {
        endUserStreamSession(targetIp);
    } catch (e) {}

    // 3. Revoke password unlock
    revokePasswordSession(targetIp, deviceId);

    return kicked;
}

/**
 * Get comprehensive Live Monitor overview payload
 */
export function getLiveMonitorOverview(blacklist: string[] = []): any {
    const now = Date.now();

    // 1. Sweep inactive visitors (>90 seconds without request)
    for (const [key, v] of Array.from(activeVisitorsMap.entries())) {
        if (now - v.lastSeenAt > 90000) {
            activeVisitorsMap.delete(key);
        }
    }

    // 2. Sweep expired password sessions
    let sessionsChanged = false;
    for (const [key, s] of Array.from(unlockedSessionsMap.entries())) {
        if (s.expiresAt <= now) {
            unlockedSessionsMap.delete(key);
            sessionsChanged = true;
        }
    }
    if (sessionsChanged) {
        persistUnlockedSessions();
    }

    // 3. Correlate active streams from loggerService
    const detailedStreams = getAllDetailedSessions();
    const streamMapByIp = new Map<string, any>();
    for (const ds of detailedStreams) {
        streamMapByIp.set(ds.ip, ds);
    }

    // 4. Build visitors list
    const visitors = Array.from(activeVisitorsMap.values()).map(v => {
        const streamInfo = streamMapByIp.get(v.ip);
        const isStreaming = v.isStreaming || !!streamInfo;
        const playingStream = streamInfo?.streamTitle || v.playingStream || 'Active Stream';
        const playingUrl = streamInfo?.streamId ? `/api/play_stream/${streamInfo.streamId}` : v.playingUrl || '';

        // Check if unlocked
        const session = Array.from(unlockedSessionsMap.values()).find(s => s.ip === v.ip || (v.deviceId && s.deviceId === v.deviceId));
        const isUnlocked = !!session && session.expiresAt > now;
        let passwordRemainingFormatted = 'Public';
        if (isUnlocked && session) {
            const remSec = Math.max(0, Math.round((session.expiresAt - now) / 1000));
            passwordRemainingFormatted = formatDuration(remSec);
        }

        const onlineSec = Math.max(1, Math.round((now - v.firstSeenAt) / 1000));
        const secondsAgo = Math.max(0, Math.round((now - v.lastSeenAt) / 1000));

        return {
            ip: v.ip,
            deviceId: v.deviceId,
            deviceLabel: v.deviceLabel,
            browserName: v.browserName,
            pageLabel: v.pageLabel,
            currentPage: v.currentPage,
            isStreaming,
            playingStream,
            playingUrl,
            onlineDurationFormatted: formatDuration(onlineSec),
            secondsAgo,
            isUnlocked,
            passwordRemainingFormatted
        };
    }).sort((a, b) => a.secondsAgo - b.secondsAgo);

    // 5. Build password sessions list
    const passwordSessions = Array.from(unlockedSessionsMap.values()).map(s => {
        const isOnlineNow = activeVisitorsMap.has(s.deviceId ? `${s.ip}_${s.deviceId}` : s.ip) || activeVisitorsMap.has(s.ip);
        const totalDuration = Math.max(1000, s.expiresAt - s.enteredAt);
        const remainingMs = Math.max(0, s.expiresAt - now);
        const remainingSec = Math.round(remainingMs / 1000);
        const remainingHours = Math.max(0, Math.round((remainingMs / 3600000) * 10) / 10);
        const percentRemaining = Math.round(Math.min(100, Math.max(0, (remainingMs / totalDuration) * 100)));

        return {
            ip: s.ip,
            deviceId: s.deviceId,
            isOnlineNow,
            authMethod: s.authMethod || 'Master PIN',
            deviceLabel: s.deviceLabel,
            currentPage: s.currentPage || '/',
            browserName: s.browserName,
            userAgent: s.userAgent,
            enteredAt: s.enteredAt,
            expiresAt: s.expiresAt,
            remainingFormatted: formatDuration(remainingSec),
            remainingHours,
            percentRemaining
        };
    }).sort((a, b) => b.expiresAt - a.expiresAt);

    // 6. Gather bound devices
    const boundDevices = getAllBoundDevices();

    // 7. Calculate summary metrics
    const onlineUsersCount = visitors.length;
    const activeStreamsCount = detailedStreams.length || visitors.filter(v => v.isStreaming).length;
    const passwordSessionsCount = passwordSessions.length;
    const boundDevicesCount = boundDevices.filter(d => d.status === 'authorized').length;
    const blacklistedCount = blacklist.length;

    return {
        status: 'success',
        summary: {
            onlineUsersCount,
            activeStreamsCount,
            passwordSessionsCount,
            boundDevicesCount,
            blacklistedCount
        },
        visitors,
        passwordSessions,
        boundDevices,
        blacklist
    };
}
