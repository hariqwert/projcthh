import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Automatically generate a secure secret on startup to keep sessions safe

import fs from 'fs';
import path from 'path';

const SECRET_FILE = path.join(process.cwd(), 'doctor_strange', 'jwt_secret.txt');
let secret = process.env.JWT_SECRET;
if (!secret || secret.length < 32 || secret === 'stalker_pro_quantum_master_jwt_secret_2025_v2') {
    if (fs.existsSync(SECRET_FILE)) {
        secret = fs.readFileSync(SECRET_FILE, 'utf8').trim();
    }
    if (!secret || secret.length < 32 || secret === 'stalker_pro_quantum_master_jwt_secret_2025_v2') {
        secret = crypto.randomBytes(32).toString('hex');
        try {
            const secretDir = path.dirname(SECRET_FILE);
            if (!fs.existsSync(secretDir)) fs.mkdirSync(secretDir, { recursive: true });
            fs.writeFileSync(SECRET_FILE, secret, 'utf8');
        } catch (e) {}
    }
}
export const JWT_SECRET = secret;


export interface AdminPayload {
    ip: string;
    role: string;
    iat?: number;
    exp?: number;
}

/**
 * Retrieves the client's actual IP address, giving strict precedence to Cloudflare CF-Connecting-IP.
 */
export const getClientIp = (req: Request): string => {
    const cfIp = req.headers['cf-connecting-ip'] as string;
    if (cfIp && typeof cfIp === 'string') {
        return cfIp.replace(/^::ffff:/, '').trim();
    }
    const realIp = req.headers['x-real-ip'] as string;
    if (realIp && typeof realIp === 'string') {
        return realIp.replace(/^::ffff:/, '').trim();
    }
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
        const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded;
        return String(ip).split(',')[0].replace(/^::ffff:/, '').trim();
    }
    return (req.socket?.remoteAddress || req.ip || '127.0.0.1').replace(/^::ffff:/, '').trim();
};

/**
 * Protects admin API endpoints with strict JWT & IP-bound validation.
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const cookieHeader = req.headers.cookie || '';
    
    let token = '';
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } 
    
    // Fallback: Extract from query parameter (for direct file exports/downloads)
    if (!token && req.query && req.query.token) {
        token = req.query.token as string;
    }
    
    // Fallback: Extract from cookie
    if (!token && cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, c) => {
            const [name, val] = c.trim().split('=');
            if (name && val) acc[name] = val;
            return acc;
        }, {} as Record<string, string>);
        token = cookies.admin_auth || '';
    }

    if (!token) {
        return res.status(401).json({ status: "error", message: "Unauthorized: No security token provided" });
    }

    // Legacy bypass removed for security reasons

    try {
        const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as AdminPayload;
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({ status: "error", message: "Forbidden: Access denied" });
        }

        const clientIp = getClientIp(req);

        if (decoded.ip && decoded.ip !== clientIp && decoded.ip !== '127.0.0.1' && clientIp !== '127.0.0.1') {
            console.error(`[AUTH SECURITY] Session hijacking / rotating proxy blocked. Token IP: ${decoded.ip} !== Request IP: ${clientIp}`);
            return res.status(401).json({ status: "error", message: "Security Violation: Token IP mismatch. Session terminated." });
        }

        (req as any).adminSession = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ status: "error", message: "Session expired or is invalid. Please log in again." });
    }
};

/**
 * Synchronous check if a request has a valid 3-lock verified admin session.
 */
export const isAdminAuthenticated = (req: Request): boolean => {
    const authHeader = req.headers.authorization;
    const cookieHeader = req.headers.cookie || '';
    
    let token = '';
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (req.query && req.query.token) {
        token = req.query.token as string;
    } else if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce((acc, c) => {
            const [name, val] = c.trim().split('=');
            if (name && val) acc[name] = decodeURIComponent(val);
            return acc;
        }, {} as Record<string, string>);
        token = cookies.admin_auth || '';
    }

    if (!token) return false;

    try {
        const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as AdminPayload;
        if (!decoded || decoded.role !== 'admin') return false;
        const clientIp = getClientIp(req);
        if (decoded.ip && decoded.ip !== clientIp && decoded.ip !== '127.0.0.1' && clientIp !== '127.0.0.1') {
            return false;
        }
        return true;
    } catch {
        return false;
    }
};


