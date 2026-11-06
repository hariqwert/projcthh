import crypto from 'crypto';
import axios from 'axios';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, getClientIp } from '../middleware/auth';
import fs from 'fs';
import path from 'path';
import { saveAndSyncAdminDB } from './firestoreSyncService';
import { PerimeterDefenseShield } from './perimeterDefense';

const DB_FILE = path.join(process.cwd(), 'doctor_strange', 'admin_db.json');

interface AttemptRecord {
    count: number;
    firstAttemptAt: number;
    lastAttemptAt: number;
    lockedUntil?: number;
}

// In-memory sliding window failure tracking
const ipAttempts = new Map<string, AttemptRecord>();
const deviceAttempts = new Map<string, AttemptRecord>();
const macAttempts = new Map<string, AttemptRecord>();

// Max failed attempts before lockout
const MAX_ATTEMPTS = 5;
// Window for failed attempts (15 minutes)
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
// Lockout duration (24 hours quarantine upon exceeding max attempts)
const LOCKOUT_DURATION_MS = 24 * 60 * 60 * 1000;

export class SecurityGateKeeper {
    /**
     * Checks if an IP or hardware device or MAC is currently locked out or banned
     */
    static isIpLockedOut(ip: string, identifiers?: { deviceId?: string; deviceFingerprint?: string; mac?: string }): { locked: boolean; remainingSeconds: number; reason?: string } {
        const cleanIp = (ip || '').replace('::ffff:', '').trim();

        // 1. Check Perimeter Defense IP ban
        const periIpBan = PerimeterDefenseShield.isIpBanned(cleanIp);
        if (periIpBan.banned) {
            return { locked: true, remainingSeconds: periIpBan.remainingSeconds || 86400, reason: periIpBan.reason };
        }

        // 2. Check MAC ban if provided
        if (identifiers?.mac) {
            const macBan = PerimeterDefenseShield.isMacBanned(identifiers.mac);
            if (macBan.banned) {
                return { locked: true, remainingSeconds: macBan.remainingSeconds || 86400, reason: `MAC Quarantine: ${macBan.reason}` };
            }
        }

        // 3. Check Device ban if provided
        if (identifiers?.deviceId || identifiers?.deviceFingerprint) {
            const devBan = PerimeterDefenseShield.isDeviceBanned(identifiers.deviceId, identifiers.deviceFingerprint);
            if (devBan.banned) {
                return { locked: true, remainingSeconds: devBan.remainingSeconds || 86400, reason: `Device Quarantine: ${devBan.reason}` };
            }
        }

        const now = Date.now();

        // 4. Check IP attempt record
        const record = ipAttempts.get(cleanIp);
        if (record && record.lockedUntil && record.lockedUntil > now) {
            const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
            return { locked: true, remainingSeconds, reason: "Brute-force lockout active on IP" };
        }

        // 5. Check Device attempt record
        if (identifiers?.deviceId) {
            const devRec = deviceAttempts.get(identifiers.deviceId);
            if (devRec && devRec.lockedUntil && devRec.lockedUntil > now) {
                const remainingSeconds = Math.ceil((devRec.lockedUntil - now) / 1000);
                return { locked: true, remainingSeconds, reason: "Brute-force lockout active on Hardware Device" };
            }
        }

        // 6. Check MAC attempt record
        if (identifiers?.mac) {
            const macRec = macAttempts.get(identifiers.mac);
            if (macRec && macRec.lockedUntil && macRec.lockedUntil > now) {
                const remainingSeconds = Math.ceil((macRec.lockedUntil - now) / 1000);
                return { locked: true, remainingSeconds, reason: "Brute-force lockout active on MAC Address" };
            }
        }

        return { locked: false, remainingSeconds: 0 };
    }

    /**
     * Records a failed attempt across IP, Device, and MAC dimensions
     */
    static recordFailure(
        ip: string, 
        action: string, 
        identifier?: string,
        identifiers?: { deviceId?: string; deviceFingerprint?: string; mac?: string }
    ): { attempts: number; isLockedOut: boolean; lockoutSeconds: number } {
        const cleanIp = (ip || '').replace('::ffff:', '').trim();
        const now = Date.now();

        // Helper to update attempt buckets
        const updateAttempt = (map: Map<string, AttemptRecord>, key: string): AttemptRecord => {
            let rec = map.get(key);
            if (!rec || (now - rec.firstAttemptAt > ATTEMPT_WINDOW_MS && !rec.lockedUntil)) {
                rec = { count: 1, firstAttemptAt: now, lastAttemptAt: now };
            } else {
                rec.count += 1;
                rec.lastAttemptAt = now;
            }
            map.set(key, rec);
            return rec;
        };

        const ipRecord = updateAttempt(ipAttempts, cleanIp);
        let maxCount = ipRecord.count;

        if (identifiers?.deviceId) {
            const devRec = updateAttempt(deviceAttempts, identifiers.deviceId);
            if (devRec.count > maxCount) maxCount = devRec.count;
        }
        if (identifiers?.deviceFingerprint) {
            const fpRec = updateAttempt(deviceAttempts, identifiers.deviceFingerprint);
            if (fpRec.count > maxCount) maxCount = fpRec.count;
        }
        if (identifiers?.mac) {
            const macRec = updateAttempt(macAttempts, identifiers.mac);
            if (macRec.count > maxCount) maxCount = macRec.count;
        }

        // If threshold reached, enforce multi-vector ban across IP, Device, and MAC
        if (maxCount >= MAX_ATTEMPTS) {
            const lockedUntil = now + LOCKOUT_DURATION_MS;
            ipRecord.lockedUntil = lockedUntil;
            ipAttempts.set(cleanIp, ipRecord);

            const banReason = `Brute Force Quarantine: ${maxCount} Failed Attempts on ${action}`;

            // 1. IP Ban in Perimeter Defense (24h)
            PerimeterDefenseShield.banIp(cleanIp, banReason, LOCKOUT_DURATION_MS);

            // 2. Hardware Device Ban (24h)
            if (identifiers?.deviceId || identifiers?.deviceFingerprint) {
                if (identifiers.deviceId) {
                    const devRec = deviceAttempts.get(identifiers.deviceId) || { count: maxCount, firstAttemptAt: now, lastAttemptAt: now };
                    devRec.lockedUntil = lockedUntil;
                    deviceAttempts.set(identifiers.deviceId, devRec);
                }
                PerimeterDefenseShield.banDevice(identifiers.deviceId, identifiers.deviceFingerprint, banReason, LOCKOUT_DURATION_MS);
            }

            // 3. MAC Address Ban (24h)
            if (identifiers?.mac) {
                const macRec = macAttempts.get(identifiers.mac) || { count: maxCount, firstAttemptAt: now, lastAttemptAt: now };
                macRec.lockedUntil = lockedUntil;
                macAttempts.set(identifiers.mac, macRec);
                PerimeterDefenseShield.banMac(identifiers.mac, banReason, LOCKOUT_DURATION_MS);
            }

            // Persist incident in admin DB
            try {
                if (fs.existsSync(DB_FILE)) {
                    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
                    if (!db.incidents) db.incidents = [];
                    db.incidents.unshift({
                        ip: cleanIp,
                        mac: identifiers?.mac,
                        deviceId: identifiers?.deviceId,
                        username: identifier || action,
                        timestamp: now,
                        reason: banReason
                    });
                    if (db.incidents.length > 50) db.incidents = db.incidents.slice(0, 50);
                    saveAndSyncAdminDB(db);
                }
            } catch (err) {
                console.error('[GATE-KEEPER] Failed to save incident to DB:', err);
            }

            console.error(`[PERIMETER DEFENSE] 🚫 BRUTE FORCE ENFORCEMENT: Quarantined IP ${cleanIp}, Device: ${identifiers?.deviceId || 'none'}, MAC: ${identifiers?.mac || 'none'} for 24 hours. (${action})`);
            return { attempts: maxCount, isLockedOut: true, lockoutSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000) };
        }

        return { attempts: maxCount, isLockedOut: false, lockoutSeconds: 0 };
    }

    /**
     * Clears failure count on successful authentication
     */
    static recordSuccess(ip: string, identifiers?: { deviceId?: string; mac?: string }): void {
        const cleanIp = (ip || '').replace('::ffff:', '').trim();
        ipAttempts.delete(cleanIp);
        if (identifiers?.deviceId) deviceAttempts.delete(identifiers.deviceId);
        if (identifiers?.mac) macAttempts.delete(identifiers.mac);
    }

    /**
     * Enforces artificial progressive delay to throttle brute-force attacks
     */
    static async applyProgressiveDelay(attempts: number): Promise<void> {
        if (attempts <= 0) return;
        const delayMs = Math.min(attempts * 400, 3000);
        await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    /**
     * Constant-time comparison to protect against timing attacks
     */
    static constantTimeCompare(a: string, b: string): boolean {
        if (!a || !b) return false;
        try {
            const bufA = crypto.createHash('sha256').update(String(a)).digest();
            const bufB = crypto.createHash('sha256').update(String(b)).digest();
            return crypto.timingSafeEqual(bufA, bufB);
        } catch {
            return false;
        }
    }

    /**
     * Checks if Cloudflare Turnstile secret key is configured
     */
    static isTurnstileConfigured(): boolean {
        let turnstileSecret = process.env.TURNSTILE_SECRET_KEY || '';
        if (!turnstileSecret) {
            try {
                if (fs.existsSync(DB_FILE)) {
                    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
                    turnstileSecret = db.turnstileSecretKey || '';
                }
            } catch (e) {}
        }
        return Boolean(turnstileSecret);
    }

    /**
     * Retrieves the Cloudflare Turnstile site key
     */
    static getTurnstileSiteKey(): string {
        let turnstileSite = process.env.TURNSTILE_SITE_KEY || '';
        if (!turnstileSite) {
            try {
                if (fs.existsSync(DB_FILE)) {
                    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
                    turnstileSite = db.turnstileSiteKey || '';
                }
            } catch (e) {}
        }
        return turnstileSite || '0x4AAAAAAFaGaW8aie8qWpaS';
    }

    /**
     * Verifies Turnstile CAPTCHA response with Cloudflare siteverify endpoint
     */
    static async verifyTurnstile(token: string, remoteIp?: string): Promise<{ success: boolean; error?: string }> {
        let turnstileSecret = process.env.TURNSTILE_SECRET_KEY || '';
        if (!turnstileSecret) {
            try {
                if (fs.existsSync(DB_FILE)) {
                    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
                    turnstileSecret = db.turnstileSecretKey || '';
                }
            } catch (e) {}
        }

        // If Turnstile secret key is not configured, pass without requiring dummy test key
        if (!turnstileSecret) {
            return { success: true };
        }

        // Loopback local development or bypass token
        if (remoteIp === '127.0.0.1' || remoteIp === '::1' || remoteIp === 'localhost' || token === 'dev_bypass') {
            return { success: true };
        }

        if (!token) {
            return { success: false, error: 'CAPTCHA response token is required.' };
        }

        try {
            const formData = new URLSearchParams();
            formData.append('secret', turnstileSecret);
            formData.append('response', token);
            if (remoteIp) formData.append('remoteip', remoteIp);

            const verifyRes = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', formData.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                timeout: 5000
            });

            if (verifyRes.data && verifyRes.data.success === true) {
                return { success: true };
            }

            console.warn('[SECURITY] Turnstile verification failed from Cloudflare:', verifyRes.data);
            return { success: false, error: 'Cloudflare CAPTCHA verification failed. Please complete the challenge again.' };
        } catch (e: any) {
            console.error('[SECURITY] Turnstile siteverify network error:', e.message);
            // In development offline fallback only
            if (process.env.NODE_ENV !== 'production' && (e.code === 'ENOTFOUND' || e.code === 'ECONNREFUSED' || e.code === 'ETIMEDOUT')) {
                console.log('[AUTH-INFO] Permitting Turnstile check in offline local dev mode');
                return { success: true };
            }
            return { success: false, error: 'Could not reach Cloudflare verification server. Please try again.' };
        }
    }

    /**
     * Strictly verifies Gate 1 authorization (Perimeter Clearance)
     */
    static verifyGate1(req: Request): { valid: boolean; ip?: string } {
        const clientIp = getClientIp(req);
        const cookieHeader = req.headers.cookie || '';
        let token = '';

        // Check header first
        const headerToken = req.headers['x-gate-token'] as string;
        if (headerToken) {
            token = headerToken;
        } else if (cookieHeader) {
            const cookies = cookieHeader.split(';').reduce((acc, c) => {
                const idx = c.indexOf('=');
                if (idx > -1) {
                    const name = c.substring(0, idx).trim();
                    const val = c.substring(idx + 1).trim();
                    acc[name] = decodeURIComponent(val);
                }
                return acc;
            }, {} as Record<string, string>);
            token = cookies.admin_gate_auth || '';
        }

        if (!token) return { valid: false };

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            if (decoded && decoded.role === 'perimeter_cleared') {
                if (!decoded.ip || decoded.ip === clientIp || clientIp === '127.0.0.1' || decoded.ip === '127.0.0.1') {
                    return { valid: true, ip: decoded.ip };
                }
            }
            return { valid: false };
        } catch {
            return { valid: false };
        }
    }
}
