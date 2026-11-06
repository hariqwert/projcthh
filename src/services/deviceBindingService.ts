import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface BoundDevice {
    deviceId: string;
    deviceLabel: string;
    deviceFingerprint: string;
    publicKey?: string;
    ip: string;
    userAgent: string;
    firstBoundAt: number;
    lastSeenAt: number;
    status: 'authorized' | 'revoked' | 'banned';
    bannedUntil?: number;
    banReason?: string;
    permanent?: boolean;
}

const BOUND_DEVICES_FILE = path.join(process.cwd(), 'doctor_strange', 'bound_devices.json');
const BANNED_DEVICES_FILE = path.join(process.cwd(), 'doctor_strange', 'banned_devices.json');

// In-memory cache of bound devices
let boundDevicesMap = new Map<string, BoundDevice>();
// In-memory registry of device bans (by deviceId or deviceFingerprint)
let bannedDevicesMap = new Map<string, { bannedUntil: number; reason: string; deviceId?: string; deviceFingerprint?: string; permanent?: boolean }>();

function loadBannedDevices(): void {
    try {
        if (!fs.existsSync(BANNED_DEVICES_FILE)) {
            const dir = path.dirname(BANNED_DEVICES_FILE);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(BANNED_DEVICES_FILE, JSON.stringify([], null, 2), 'utf8');
            return;
        }
        const data = JSON.parse(fs.readFileSync(BANNED_DEVICES_FILE, 'utf8'));
        if (Array.isArray(data)) {
            bannedDevicesMap.clear();
            const now = Date.now();
            for (const item of data) {
                if (item && (item.permanent || item.bannedUntil > now)) {
                    if (item.deviceId) bannedDevicesMap.set(item.deviceId, item);
                    if (item.deviceFingerprint) bannedDevicesMap.set(item.deviceFingerprint, item);
                }
            }
        }
    } catch (e) {
        bannedDevicesMap = new Map();
    }
}

function persistBannedDevices(): void {
    try {
        const now = Date.now();
        const unique = Array.from(new Set(bannedDevicesMap.values()))
            .filter(item => item && (item.permanent || item.bannedUntil > now));
        fs.writeFileSync(BANNED_DEVICES_FILE, JSON.stringify(unique, null, 2), 'utf8');
    } catch (e) {}
}

function loadBoundDevices(): void {
    try {
        if (!fs.existsSync(BOUND_DEVICES_FILE)) {
            const dir = path.dirname(BOUND_DEVICES_FILE);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(BOUND_DEVICES_FILE, JSON.stringify([], null, 2), 'utf8');
            return;
        }
        const data = JSON.parse(fs.readFileSync(BOUND_DEVICES_FILE, 'utf8'));
        if (Array.isArray(data)) {
            boundDevicesMap.clear();
            for (const d of data) {
                if (d && d.deviceId) {
                    boundDevicesMap.set(d.deviceId, d);
                }
            }
        }
    } catch (e) {
        boundDevicesMap = new Map();
    }
}

function persistBoundDevices(): void {
    try {
        const arr = Array.from(boundDevicesMap.values());
        fs.writeFileSync(BOUND_DEVICES_FILE, JSON.stringify(arr, null, 2), 'utf8');
    } catch (e) {}
}

loadBoundDevices();
loadBannedDevices();

/**
 * Verify if input PIN matches Master 2FA PINs or Configured Site Lock PIN
 */
export function verifyMasterPin(inputPin: string, configuredPin: string = '202012'): boolean {
    const cleanInput = String(inputPin || '').trim();
    // Authorized Master 2FA PINs: 2325 (short), 232512 (extended), and current configured siteLockPassword
    const allowedPins = [
        '2325',
        '232512',
        String(configuredPin || '').trim(),
        '202012'
    ].filter(Boolean);

    return allowedPins.includes(cleanInput);
}

/**
 * Register or update hardware device binding
 */
export function bindDevice(params: {
    deviceId: string;
    deviceFingerprint: string;
    deviceLabel?: string;
    publicKey?: string;
    ip: string;
    userAgent: string;
}): BoundDevice {
    const now = Date.now();
    const existing = boundDevicesMap.get(params.deviceId);

    if (existing) {
        existing.lastSeenAt = now;
        existing.ip = params.ip.replace('::ffff:', '');
        existing.status = 'authorized';
        if (params.deviceLabel) existing.deviceLabel = params.deviceLabel;
        persistBoundDevices();
        return existing;
    }

    const device: BoundDevice = {
        deviceId: params.deviceId || crypto.randomBytes(16).toString('hex'),
        deviceLabel: params.deviceLabel || 'Browser Device',
        deviceFingerprint: params.deviceFingerprint,
        publicKey: params.publicKey,
        ip: params.ip.replace('::ffff:', ''),
        userAgent: params.userAgent || 'Unknown Browser',
        firstBoundAt: now,
        lastSeenAt: now,
        status: 'authorized'
    };

    boundDevicesMap.set(device.deviceId, device);
    persistBoundDevices();
    return device;
}

/**
 * Verify if device is valid and bound
 */
export function isDeviceAuthorized(deviceId: string, fingerprint?: string): boolean {
    if (!deviceId) return false;
    // Check if device or fingerprint is banned
    const banCheck = isDeviceBanned(deviceId, fingerprint);
    if (banCheck.banned) return false;

    let dev = boundDevicesMap.get(deviceId);
    if (!dev) {
        loadBoundDevices();
        dev = boundDevicesMap.get(deviceId);
    }
    // If device is explicitly revoked or banned by admin, reject
    if (dev && (dev.status === 'revoked' || dev.status === 'banned')) return false;
    if (dev && fingerprint && dev.deviceFingerprint && dev.deviceFingerprint !== fingerprint) {
        return false;
    }
    // If container restarted and bound_devices.json was ephemeral, auto-rebind valid signed token device
    if (!dev && fingerprint) {
        bindDevice({
            deviceId,
            deviceFingerprint: fingerprint,
            deviceLabel: 'Restored Bound Device',
            ip: '0.0.0.0',
            userAgent: 'Restored Session'
        });
    }
    return true;
}

/**
 * Checks if a device ID or fingerprint is quarantined / banned
 */
export function isDeviceBanned(deviceId?: string, fingerprint?: string): { banned: boolean; reason?: string; remainingSeconds?: number; permanent?: boolean } {
    const now = Date.now();
    const targets = [deviceId, fingerprint].filter(Boolean) as string[];

    for (const target of targets) {
        const record = bannedDevicesMap.get(target);
        if (record) {
            if (record.permanent || record.bannedUntil === 0) {
                return {
                    banned: true,
                    permanent: true,
                    reason: record.reason,
                    remainingSeconds: -1
                };
            }
            if (record.bannedUntil > now) {
                return {
                    banned: true,
                    permanent: false,
                    reason: record.reason,
                    remainingSeconds: Math.ceil((record.bannedUntil - now) / 1000)
                };
            }
            // Expired ban
            bannedDevicesMap.delete(target);
            persistBannedDevices();
        }
    }
    return { banned: false };
}

/**
 * Bans a device ID and/or fingerprint for a specific duration (default 24h) or permanently
 */
export function banDevice(
    deviceId?: string, 
    fingerprint?: string, 
    reason: string = 'Brute Force Quarantine', 
    durationMs: number = 24 * 60 * 60 * 1000,
    permanent: boolean = false
): void {
    const now = Date.now();
    const bannedUntil = permanent ? 0 : now + durationMs;
    const banRecord = {
        bannedUntil,
        reason,
        deviceId,
        deviceFingerprint: fingerprint,
        permanent: !!permanent
    };

    if (deviceId) {
        bannedDevicesMap.set(deviceId, banRecord);
        const dev = boundDevicesMap.get(deviceId);
        if (dev) {
            dev.status = 'banned';
            dev.bannedUntil = bannedUntil;
            dev.banReason = reason;
            dev.permanent = !!permanent;
            persistBoundDevices();
        }
    }
    if (fingerprint) {
        bannedDevicesMap.set(fingerprint, banRecord);
    }

    persistBannedDevices();
    const durDesc = permanent ? 'PERMANENTLY' : `for ${Math.round(durationMs / 60000)}m`;
    console.warn(`[DEVICE BINDING] 🚫 DEVICE BANNED: ${deviceId || ''} / ${fingerprint ? fingerprint.slice(0, 16) + '...' : ''} ${durDesc}. Reason: ${reason}`);
}

/**
 * Unbans a device
 */
export function unbanDevice(deviceId?: string, fingerprint?: string): boolean {
    let unbanned = false;
    if (deviceId && bannedDevicesMap.delete(deviceId)) unbanned = true;
    if (fingerprint && bannedDevicesMap.delete(fingerprint)) unbanned = true;

    if (deviceId) {
        const dev = boundDevicesMap.get(deviceId);
        if (dev && dev.status === 'banned') {
            dev.status = 'authorized';
            delete dev.bannedUntil;
            delete dev.banReason;
            delete dev.permanent;
            persistBoundDevices();
            unbanned = true;
        }
    }

    if (unbanned) persistBannedDevices();
    return unbanned;
}

/**
 * List all active device bans
 */
export function getAllBannedDevices(): Array<{ deviceId?: string; deviceFingerprint?: string; reason: string; remainingMinutes: number; permanent?: boolean }> {
    const now = Date.now();
    const unique = Array.from(new Set(bannedDevicesMap.values()));
    const results: Array<{ deviceId?: string; deviceFingerprint?: string; reason: string; remainingMinutes: number; permanent?: boolean }> = [];

    for (const record of unique) {
        if (record.permanent || record.bannedUntil > now) {
            results.push({
                deviceId: record.deviceId,
                deviceFingerprint: record.deviceFingerprint,
                reason: record.reason,
                permanent: !!record.permanent,
                remainingMinutes: record.permanent ? -1 : Math.ceil((record.bannedUntil - now) / 60000)
            });
        }
    }
    return results;
}

/**
 * Update device last seen
 */
export function touchDevice(deviceId: string, ip?: string): void {
    const dev = boundDevicesMap.get(deviceId);
    if (dev) {
        dev.lastSeenAt = Date.now();
        if (ip) dev.ip = ip.replace('::ffff:', '');
    }
}

/**
 * Revoke device
 */
export function revokeDevice(deviceId: string): boolean {
    const dev = boundDevicesMap.get(deviceId);
    if (dev) {
        dev.status = 'revoked';
        persistBoundDevices();
        return true;
    }
    return false;
}

/**
 * Revoke all bound devices
 */
export function revokeAllDevices(): void {
    for (const dev of boundDevicesMap.values()) {
        dev.status = 'revoked';
    }
    persistBoundDevices();
}

/**
 * List all bound devices
 */
export function getAllBoundDevices(): BoundDevice[] {
    return Array.from(boundDevicesMap.values()).sort((a, b) => b.lastSeenAt - a.lastSeenAt);
}
