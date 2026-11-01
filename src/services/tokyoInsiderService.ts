import https from 'https';
import { URL } from 'url';

export interface TokyoInsiderParsedMetadata {
    releaseGroup?: string;
    title: string;
    season: number;
    episode: number;
    quality: string;
    crc?: string;
    container: string;
    rawFilename: string;
}

export interface TokyoInsiderVerification {
    valid: boolean;
    statusCode: number;
    contentLength: number;
    contentType: string;
    acceptRanges: boolean;
    latencyMs: number;
    error?: string;
}

export interface TokyoInsiderStreamSource {
    url: string;
    rawUrl: string;
    quality: string;
    type: 'video/mp4';
    label: string;
    name: string;
    language: string;
    skipProxy: true;
    priority: number;
    fileSize?: number;
}

export interface TokyoInsiderResolveResult {
    success: boolean;
    source?: TokyoInsiderStreamSource;
    metadata?: TokyoInsiderParsedMetadata;
    error?: string;
}

// In-memory cache: key -> { stream: TokyoInsiderStreamSource, expiresAt: number }
const TOKYO_CACHE = new Map<string, { source: TokyoInsiderStreamSource; metadata: TokyoInsiderParsedMetadata; expiresAt: number }>();
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

/**
 * Normalizes title for robust anime matching
 */
export function normalizeAnimeKey(title: string): string {
    return (title || '')
        .toLowerCase()
        .replace(/\(tv\)/gi, '')
        .replace(/season\s*\d+/gi, '')
        .replace(/[^a-z0-9]/g, '');
}

/**
 * TokyoInsider Caesar Cipher (ROT13)
 */
export function rot13(s: string): string {
    return s.replace(/[a-zA-Z]/g, (c) => {
        const b = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - b + 13) % 26) + b);
    });
}

/**
 * Decrypts TokyoInsider <span class="dlk" data-a="..." data-b="..."> attributes into direct video CDN URLs
 */
export function decodeTokyoInsiderDlk(dataA: string, dataB: string): string {
    const combined = (dataA || '') + (dataB || '');
    if (!combined) return '';
    try {
        const K = rot13('9o20p4qn66o1'.split('').reverse().join('')); // '1b66ad4c0b29'
        const reversed = combined.split('').reverse().join('');
        const rot = rot13(reversed);
        const bin = Buffer.from(rot, 'base64').toString('binary');
        let out = '';
        for (let i = 0; i < bin.length; i++) {
            out += String.fromCharCode(bin.charCodeAt(i) ^ K.charCodeAt(i % K.length));
        }
        return out;
    } catch (_) {
        return '';
    }
}

/**
 * Extracts and decrypts direct video links from a TokyoInsider episode page HTML
 */
export function extractTokyoInsiderStreamsFromHtml(html: string, fallbackTitle?: string, fallbackSeason: number = 1, fallbackEpisode: number = 1): TokyoInsiderStreamSource[] {
    const sources: TokyoInsiderStreamSource[] = [];
    if (!html) return sources;

    const dlkRegex = /<span\b[^>]*class=["'][^"']*dlk[^"']*["'][^>]*>/gi;
    let match;
    while ((match = dlkRegex.exec(html)) !== null) {
        const tag = match[0];
        const dataAMatch = tag.match(/data-a=["']([^"']+)["']/i);
        const dataBMatch = tag.match(/data-b=["']([^"']+)["']/i);
        if (dataAMatch && dataBMatch) {
            const directUrl = decodeTokyoInsiderDlk(dataAMatch[1], dataBMatch[1]);
            if (directUrl && (directUrl.startsWith('http://') || directUrl.startsWith('https://'))) {
                const meta = parseTokyoInsiderFilename(directUrl);
                if (fallbackTitle) meta.title = fallbackTitle;
                if (fallbackSeason) meta.season = fallbackSeason;
                if (fallbackEpisode) meta.episode = fallbackEpisode;

                const src: TokyoInsiderStreamSource = {
                    url: directUrl,
                    rawUrl: directUrl,
                    quality: meta.quality,
                    type: 'video/mp4',
                    label: `TokyoInsider Direct ${meta.quality.toUpperCase()} MP4 (${meta.releaseGroup || 'Fast CDN'})`,
                    name: 'TokyoInsider Direct',
                    language: 'Japanese Sub',
                    skipProxy: true,
                    priority: 1
                };
                sources.push(src);

                // Auto-register in cache
                const key = `${normalizeAnimeKey(meta.title)}:s${meta.season}e${meta.episode}`;
                if (!TOKYO_CACHE.has(key) || meta.quality.includes('1080')) {
                    TOKYO_CACHE.set(key, {
                        source: src,
                        metadata: meta,
                        expiresAt: Date.now() + CACHE_TTL_MS
                    });
                }
            }
        }
    }
    return sources;
}

/**
 * Parses release group, anime title, season, episode, and resolution from TokyoInsider filenames
 * Example: "[SubsPlease] Black Clover S2 - 174 (1080p) [720FB31C].mkv.mp4"
 */
export function parseTokyoInsiderFilename(filenameOrUrl: string): TokyoInsiderParsedMetadata {
    let clean = filenameOrUrl;
    try {
        if (clean.startsWith('http')) {
            const parsed = new URL(clean);
            const segments = parsed.pathname.split('/');
            clean = decodeURIComponent(segments[segments.length - 1] || '');
        }
    } catch (_) {}

    const rawFilename = clean;

    // 1. Release Group [SubsPlease], [Erai-raws], etc.
    let releaseGroup: string | undefined;
    const groupMatch = clean.match(/^\[([A-Za-z0-9_\-\s]+)\]/);
    if (groupMatch) {
        releaseGroup = groupMatch[1].trim();
        clean = clean.replace(groupMatch[0], '').trim();
    }

    // 2. CRC checksum [720FB31C]
    let crc: string | undefined;
    const crcMatch = clean.match(/\[([A-Fa-f0-9]{8})\]/);
    if (crcMatch) {
        crc = crcMatch[1];
        clean = clean.replace(crcMatch[0], '').trim();
    }

    // 3. Quality (1080p), (720p), (480p)
    let quality = '1080p';
    const qualityMatch = clean.match(/\b(1080p|720p|480p|360p)\b/i);
    if (qualityMatch) {
        quality = qualityMatch[1].toLowerCase();
        clean = clean.replace(qualityMatch[0], '').trim();
    }

    // 4. Season & Episode e.g. "S2 - 174" or " - 174" or "Season 2 Episode 5"
    let season = 1;
    let episode = 1;

    const sMatch = clean.match(/S(?:eason)?\s*(\d+)/i);
    if (sMatch) {
        season = parseInt(sMatch[1], 10);
    }

    const epMatch = clean.match(/(?:-\s*|E(?:p(?:isode)?)?\s*|#\s*)(\d+)/i);
    if (epMatch) {
        episode = parseInt(epMatch[1], 10);
    }

    // 5. Clean Title
    let title = clean
        .replace(/\bS(?:eason)?\s*\d+\b/gi, '')
        .replace(/-\s*\d+/g, '')
        .replace(/\.\w+(\.\w+)?$/, '') // remove extensions like .mkv.mp4
        .replace(/[_\.]+/g, ' ')
        .replace(/[\(\)\[\]]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (!title) title = 'Anime';

    return {
        releaseGroup,
        title,
        season,
        episode,
        quality,
        crc,
        container: 'mp4',
        rawFilename
    };
}

/**
 * Rapid HTTP Range verification (bytes=0-100) to confirm TokyoInsider direct stream readiness.
 * Runs in under 300ms without proxying or downloading video.
 */
export async function verifyTokyoInsiderUrl(streamUrl: string, timeoutMs: number = 6000): Promise<TokyoInsiderVerification> {
    const startTime = Date.now();
    return new Promise((resolve) => {
        try {
            const parsed = new URL(streamUrl);
            const req = https.request({
                hostname: parsed.hostname,
                port: parsed.port || 443,
                path: parsed.pathname + parsed.search,
                method: 'GET',
                headers: {
                    'Range': 'bytes=0-100',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                timeout: timeoutMs
            }, (res) => {
                const latencyMs = Date.now() - startTime;
                const statusCode = res.statusCode || 0;
                const acceptRanges = res.headers['accept-ranges'] === 'bytes' || Boolean(res.headers['content-range']);
                const contentType = res.headers['content-type'] || 'application/octet-stream';

                let contentLength = 0;
                if (res.headers['content-range']) {
                    const match = res.headers['content-range'].match(/\/(\d+)$/);
                    if (match) contentLength = parseInt(match[1], 10);
                } else if (res.headers['content-length']) {
                    contentLength = parseInt(res.headers['content-length'], 10);
                }

                // Discard data stream immediately
                res.resume();
                req.destroy();

                const valid = statusCode === 206 || statusCode === 200;
                resolve({
                    valid,
                    statusCode,
                    contentLength,
                    contentType,
                    acceptRanges,
                    latencyMs
                });
            });

            req.on('timeout', () => {
                req.destroy();
                resolve({
                    valid: false,
                    statusCode: 408,
                    contentLength: 0,
                    contentType: '',
                    acceptRanges: false,
                    latencyMs: Date.now() - startTime,
                    error: 'Request timed out'
                });
            });

            req.on('error', (err) => {
                resolve({
                    valid: false,
                    statusCode: 0,
                    contentLength: 0,
                    contentType: '',
                    acceptRanges: false,
                    latencyMs: Date.now() - startTime,
                    error: err.message
                });
            });

            req.end();
        } catch (e: any) {
            resolve({
                valid: false,
                statusCode: 0,
                contentLength: 0,
                contentType: '',
                acceptRanges: false,
                latencyMs: Date.now() - startTime,
                error: e.message
            });
        }
    });
}

/**
 * Register a verified TokyoInsider media stream in the priority stream memory cache
 */
export function registerTokyoInsiderStream(streamUrl: string, customTitle?: string): TokyoInsiderResolveResult {
    const metadata = parseTokyoInsiderFilename(streamUrl);
    if (customTitle) {
        metadata.title = customTitle;
    }

    const source: TokyoInsiderStreamSource = {
        url: streamUrl,
        rawUrl: streamUrl,
        quality: metadata.quality,
        type: 'video/mp4',
        label: `TokyoInsider Direct ${metadata.quality.toUpperCase()} MP4 (${metadata.releaseGroup || 'Fast CDN'})`,
        name: 'TokyoInsider Direct',
        language: 'Japanese Sub',
        skipProxy: true,
        priority: 1
    };

    const normKey = normalizeAnimeKey(metadata.title);
    const cacheKey = `${normKey}:s${metadata.season}e${metadata.episode}`;
    TOKYO_CACHE.set(cacheKey, {
        source,
        metadata,
        expiresAt: Date.now() + CACHE_TTL_MS
    });

    return {
        success: true,
        source,
        metadata
    };
}

/**
 * Resolve TokyoInsider Stream by title + season + episode, or directly by URL.
 */
export async function resolveTokyoInsiderStream(options: {
    title?: string;
    season?: number;
    episode?: number;
    url?: string;
}): Promise<TokyoInsiderResolveResult> {
    const { title, season = 1, episode = 1, url } = options;

    // 1. Direct URL provided
    if (url && (url.includes('tokyoinsider.com') || url.includes('.mp4'))) {
        const metadata = parseTokyoInsiderFilename(url);
        if (title) metadata.title = title;
        metadata.season = season;
        metadata.episode = episode;

        const check = await verifyTokyoInsiderUrl(url);
        if (check.valid) {
            const source: TokyoInsiderStreamSource = {
                url,
                rawUrl: url,
                quality: metadata.quality,
                type: 'video/mp4',
                label: `TokyoInsider Direct ${metadata.quality.toUpperCase()} MP4 (${metadata.releaseGroup || 'Ultra Fast CDN'})`,
                name: 'TokyoInsider Direct',
                language: 'Japanese Sub',
                skipProxy: true,
                priority: 1,
                fileSize: check.contentLength
            };

            const normKey = normalizeAnimeKey(metadata.title);
            const cacheKey = `${normKey}:s${season}e${episode}`;
            TOKYO_CACHE.set(cacheKey, {
                source,
                metadata,
                expiresAt: Date.now() + CACHE_TTL_MS
            });

            return {
                success: true,
                source,
                metadata
            };
        } else {
            return {
                success: false,
                error: `TokyoInsider stream URL verification failed (HTTP ${check.statusCode}: ${check.error || 'Invalid'})`
            };
        }
    }

    // 2. Lookup in memory registry by normalized title + season + episode
    if (title) {
        const normKey = normalizeAnimeKey(title);
        const cacheKey = `${normKey}:s${season}e${episode}`;
        const cached = TOKYO_CACHE.get(cacheKey);
        if (cached && cached.expiresAt > Date.now()) {
            return {
                success: true,
                source: cached.source,
                metadata: cached.metadata
            };
        }

        // Fallback: search keys starting with normKey and matching episode
        for (const [key, val] of TOKYO_CACHE.entries()) {
            if (key.includes(normKey) && key.endsWith(`e${episode}`) && val.expiresAt > Date.now()) {
                return {
                    success: true,
                    source: val.source,
                    metadata: val.metadata
                };
            }
        }
    }

    return {
        success: false,
        error: `No active TokyoInsider stream mapped for ${title || 'unknown'} S${season}E${episode}`
    };
}

// Initial seed for verified TokyoInsider direct streams
registerTokyoInsiderStream(
    'https://media.tokyoinsider.com:8383/dl/00000000030/318269/1/VlbxU8LMT2OjA82WCZnPuQ/3/37/375391/375391/%5BSubsPlease%5D%20Black%20Clover%20S2%20-%20174%20%281080p%29%20%5B720FB31C%5D.mkv.mp4',
    'Black Clover'
);

// One Piece Episode 1180 (1080p MP4 SubsPlease)
registerTokyoInsiderStream(
    'https://media.tokyoinsider.com:8383/dl/00000000030/317799/1/CR7idS2-57FYLrbPSdsgwQ/3/37/374738/374738/%5BSubsPlease%5D%20One%20Piece%20-%201180%20%281080p%29%20%5B97492A4D%5D.mkv.mp4',
    'One Piece'
);
