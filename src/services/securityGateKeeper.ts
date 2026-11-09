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

export interface PowChallenge {
    challenge: string;
    difficulty: number;
    expiresAt: number;
    signature: string;
}

// In-memory sliding window failure tracking
const ipAttempts = new Map<string, AttemptRecord>();
const subnetAttempts = new Map<string, AttemptRecord>();
const deviceAttempts = new Map<string, AttemptRecord>();
const macAttempts = new Map<string, AttemptRecord>();

// Single-use token tracking to prevent token replay attacks
const usedTurnstileTokens = new Map<string, number>();
const usedPowChallenges = new Map<string, number>();

// Global distributed failure tracking and circuit breaker
interface GlobalActionRecord {
    failures: number;
    windowStart: number;
    circuitOpenUntil?: number;
}
const globalActionFailures = new Map<string, GlobalActionRecord>();

// Thresholds
const MAX_ATTEMPTS = 5;
const SUBNET_MAX_ATTEMPTS = 4; // Max attempts per /24 subnet before entire subnet quarantine
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const GLOBAL_FAIL_THRESHOLD = 8; // 8 failures across all rotating IPs in 60s
const GLOBAL_FAIL_WINDOW_MS = 60 * 1000; // 60 seconds
const CIRCUIT_BREAKER_DURATION_MS = 3 * 60 * 1000; // 3 minutes

export class SecurityGateKeeper {
    /**
     * Checks if an IP or /24 subnet or hardware device or MAC is currently locked out or banned
     */
    static isIpLockedOut(ip: string, identifiers?: { deviceId?: string; deviceFingerprint?: string; mac?: string }): { locked: boolean; remainingSeconds: number; reason?: string } {
        const cleanIp = (ip || '').replace('::ffff:', '').trim();

        // 1. Check Perimeter Defense IP ban (also checks /24 subnet)
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

        // 4b. Check Subnet attempt record (/24)
        if (cleanIp.includes('.')) {
            const subnet = cleanIp.split('.').slice(0, 3).join('.') + '.0/24';
            const subRec = subnetAttempts.get(subnet);
            if (subRec && subRec.lockedUntil && subRec.lockedUntil > now) {
                const remainingSeconds = Math.ceil((subRec.lockedUntil - now) / 1000);
                return { locked: true, remainingSeconds, reason: "Distributed subnet brute-force lockout active" };
            }
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
     * Checks if global circuit breaker is active for an action
     */
    static isCircuitBreakerActive(action: string): { active: boolean; remainingSeconds: number } {
        const now = Date.now();
        const gRecord = globalActionFailures.get(action);
        if (gRecord && gRecord.circuitOpenUntil && gRecord.circuitOpenUntil > now) {
            return {
                active: true,
                remainingSeconds: Math.ceil((gRecord.circuitOpenUntil - now) / 1000)
            };
        }
        return { active: false, remainingSeconds: 0 };
    }

    /**
     * Records a failed attempt across IP, Subnet, Device, MAC, and Global dimensions
     */
    static recordFailure(
        ip: string, 
        action: string, 
        identifier?: string,
        identifiers?: { deviceId?: string; deviceFingerprint?: string; mac?: string }
    ): { attempts: number; isLockedOut: boolean; lockoutSeconds: number; circuitBreaker: boolean } {
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

        // 1. IP Record
        const ipRecord = updateAttempt(ipAttempts, cleanIp);
        let maxCount = ipRecord.count;

        // 2. Subnet Record (Catches rotating proxies in the same /24 CIDR block)
        if (cleanIp.includes('.')) {
            const subnet = cleanIp.split('.').slice(0, 3).join('.') + '.0/24';
            const subnetRec = updateAttempt(subnetAttempts, subnet);
            if (subnetRec.count >= SUBNET_MAX_ATTEMPTS && !subnetRec.lockedUntil) {
                subnetRec.lockedUntil = now + LOCKOUT_DURATION_MS;
                PerimeterDefenseShield.banIp(subnet, `Subnet Distributed Brute-Force Quarantine: ${subnetRec.count} Failed Attempts from ${subnet}`, LOCKOUT_DURATION_MS);
                console.warn(`[SECURITY] 🛡️ Auto-quarantined subnet ${subnet} due to ${subnetRec.count} distributed rotating-proxy failures.`);
            }
        }

        // 3. Device & MAC tracking
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

        // 4. Global Action Circuit Breaker (Catches rotating IPs across DIFFERENT subnets)
        let circuitBreakerActive = false;
        let gRecord = globalActionFailures.get(action);
        if (!gRecord || (now - gRecord.windowStart > GLOBAL_FAIL_WINDOW_MS)) {
            gRecord = { failures: 1, windowStart: now };
        } else {
            gRecord.failures += 1;
            if (gRecord.failures >= GLOBAL_FAIL_THRESHOLD) {
                gRecord.circuitOpenUntil = now + CIRCUIT_BREAKER_DURATION_MS;
                circuitBreakerActive = true;
                console.warn(`[SECURITY] ⚡ GLOBAL CIRCUIT BREAKER TRIPPED for action "${action}" (${gRecord.failures} failures across all IPs). Proof-of-Work mandatory.`);
            }
        }
        globalActionFailures.set(action, gRecord);

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
            return { attempts: maxCount, isLockedOut: true, lockoutSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000), circuitBreaker: circuitBreakerActive };
        }

        return { attempts: maxCount, isLockedOut: false, lockoutSeconds: 0, circuitBreaker: circuitBreakerActive };
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
    static async applyProgressiveDelay(attempts: number, forceMinDelayMs: number = 0): Promise<void> {
        const baseDelay = attempts > 0 ? Math.min(attempts * 400, 3000) : 0;
        const totalDelay = Math.max(baseDelay, forceMinDelayMs);
        if (totalDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, totalDelay));
        }
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
     * Generates a single-use Proof-of-Work cryptographic challenge
     */
    static generatePowChallenge(clientIp: string, difficulty: number = 4): PowChallenge {
        const cleanIp = (clientIp || '').replace('::ffff:', '').trim();
        const challenge = crypto.randomBytes(16).toString('hex');
        const expiresAt = Date.now() + 90000; // 90 seconds TTL
        const signature = crypto.createHmac('sha256', JWT_SECRET)
            .update(`${challenge}:${cleanIp}:${difficulty}:${expiresAt}`)
            .digest('hex');
        return { challenge, difficulty, expiresAt, signature };
    }

    /**
     * Verifies a client's Proof-of-Work solution
     */
    static verifyPowSolution(params: {
        challenge?: string;
        nonce?: string | number;
        signature?: string;
        expiresAt?: number;
        clientIp: string;
        difficulty?: number;
    }): { valid: boolean; error?: string } {
        const { challenge, nonce, signature, expiresAt, clientIp } = params;
        const difficulty = params.difficulty || 4;

        if (!challenge || nonce === undefined || nonce === null || !signature || !expiresAt) {
            return { valid: false, error: 'Incomplete Proof-of-Work parameters (challenge, nonce, signature, expiresAt required).' };
        }

        const now = Date.now();
        if (now > expiresAt) {
            return { valid: false, error: 'Proof-of-Work challenge expired. Please obtain a fresh challenge.' };
        }

        const cleanIp = (clientIp || '').replace('::ffff:', '').trim();

        // Anti-Replay: Check if challenge was already consumed
        if (usedPowChallenges.has(challenge)) {
            return { valid: false, error: 'Proof-of-Work challenge already used. Replay prohibited.' };
        }

        // Verify cryptographic HMAC signature
        const expectedSig = crypto.createHmac('sha256', JWT_SECRET)
            .update(`${challenge}:${cleanIp}:${difficulty}:${expiresAt}`)
            .digest('hex');

        if (!this.constantTimeCompare(signature, expectedSig)) {
            return { valid: false, error: 'Forged or invalid Proof-of-Work signature.' };
        }

        // Verify hash difficulty (must start with difficulty number of zeros, e.g. "0000")
        const computedHash = crypto.createHash('sha256').update(`${challenge}:${nonce}`).digest('hex');
        const requiredPrefix = '0'.repeat(difficulty);

        if (!computedHash.startsWith(requiredPrefix)) {
            return { valid: false, error: `Invalid Proof-of-Work solution: Hash does not meet required difficulty level (${difficulty}).` };
        }

        // Mark as consumed
        usedPowChallenges.set(challenge, expiresAt);
        return { valid: true };
    }

    /**
     * Generates a request-bound client fingerprint to defeat token stealing / replay
     */
    static generateClientFingerprint(req: Request): string {
        const ua = ((req.headers && req.headers['user-agent']) || '').toString().trim().toLowerCase();
        return crypto.createHash('sha256').update(ua).digest('hex').slice(0, 16);
    }

    /**
     * Resets circuit breaker for a specific action (e.g. after manual verification or startup)
     */
    static resetCircuitBreaker(action: string): void {
        globalActionFailures.delete(action);
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
     * Verifies Turnstile CAPTCHA response with Cloudflare siteverify endpoint.
     * Hardened against token replay, IP spoofing, and bypass strings.
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

        // If Turnstile secret key is not configured, pass in offline local dev mode only
        if (!turnstileSecret) {
            if (process.env.NODE_ENV !== 'production') {
                return { success: true };
            }
            return { success: false, error: 'Turnstile CAPTCHA is unconfigured on production server.' };
        }

        const cleanRemoteIp = (remoteIp || '').replace('::ffff:', '').trim();
        const isLocalLoopback = cleanRemoteIp === '127.0.0.1' || cleanRemoteIp === '::1' || cleanRemoteIp === 'localhost';
        if (isLocalLoopback && (!token || typeof token !== 'string' || token.trim().length < 10)) {
            return { success: true };
        }

        if (!token || typeof token !== 'string' || token.trim().length < 10) {
            return { success: false, error: 'Valid Cloudflare CAPTCHA response token is required.' };
        }

        const cleanToken = token.trim();

        // 1. Anti-Replay: Check if this token was already consumed
        const tokenHash = crypto.createHash('sha256').update(cleanToken).digest('hex');
        const now = Date.now();
        const prevSeen = usedTurnstileTokens.get(tokenHash);
        if (prevSeen && prevSeen > now) {
            console.warn(`[SECURITY] 🛑 Cloudflare Turnstile Token Replay Attack blocked! IP=${remoteIp}`);
            return { success: false, error: 'Cloudflare CAPTCHA response token replay detected. Each token can only be used once.' };
        }

        try {
            const formData = new URLSearchParams();
            formData.append('secret', turnstileSecret);
            formData.append('response', cleanToken);
            if (remoteIp && remoteIp !== '127.0.0.1' && remoteIp !== '::1' && remoteIp !== 'localhost') {
                formData.append('remoteip', remoteIp);
            }

            const verifyRes = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', formData.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                timeout: 5000
            });

            if (verifyRes.data && verifyRes.data.success === true) {
                // Mark token as consumed in replay cache (10-minute TTL)
                usedTurnstileTokens.set(tokenHash, now + 10 * 60 * 1000);
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
            const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as any;
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

    /**
     * Systematic garbage collection of stale attempt records and used token hashes
     */
    static sweepStaleMemory(): void {
        const now = Date.now();
        const purgeStale = (map: Map<string, AttemptRecord>) => {
            for (const [key, record] of map.entries()) {
                const isLockExpired = !record.lockedUntil || record.lockedUntil <= now;
                const isWindowExpired = (now - record.lastAttemptAt) > ATTEMPT_WINDOW_MS;
                if (isLockExpired && isWindowExpired) {
                    map.delete(key);
                }
            }
            if (map.size > 10000) {
                let deleted = 0;
                for (const key of map.keys()) {
                    map.delete(key);
                    deleted++;
                    if (deleted >= 2500) break;
                }
            }
        };

        purgeStale(ipAttempts);
        purgeStale(subnetAttempts);
        purgeStale(deviceAttempts);
        purgeStale(macAttempts);

        // Purge expired Turnstile replay tokens
        for (const [hash, exp] of usedTurnstileTokens.entries()) {
            if (exp <= now) usedTurnstileTokens.delete(hash);
        }

        // Purge expired PoW challenges
        for (const [ch, exp] of usedPowChallenges.entries()) {
            if (exp <= now) usedPowChallenges.delete(ch);
        }

        // Purge expired global circuit breaker records
        for (const [act, gRec] of globalActionFailures.entries()) {
            if ((now - gRec.windowStart > GLOBAL_FAIL_WINDOW_MS) && (!gRec.circuitOpenUntil || gRec.circuitOpenUntil <= now)) {
                globalActionFailures.delete(act);
            }
        }
    }
}
