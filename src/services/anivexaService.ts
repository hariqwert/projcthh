import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import crypto from 'crypto';
// @ts-ignore
import anivexaWorker from './anivexa/index.js';
// @ts-ignore
import { getMedia } from './anivexa/core/anilist.js';
// @ts-ignore
import { mapAnimeIds } from './anivexa/core/mapper.js';

export interface AnivexaStreamSource {
    server: string;
    audio: 'sub' | 'dub';
    url: string;
    proxiedUrl?: string;
    type: string;
    embed?: string;
    key?: string;
    playlist_key?: string;
    subtitles?: Array<{
        file: string;
        url?: string;
        label: string;
        lang?: string;
        srclang?: string;
        kind?: string;
        default?: boolean;
    }>;
    thumbnails_vtt?: string;
    video_title?: string;
    intro?: { start: number; end: number; title?: string } | null;
    outro?: { start: number; end: number; title?: string } | null;
}

export interface AnivexaWatchResult {
    success: boolean;
    provider: string;
    anilistId: number;
    episode: number;
    audio: 'sub' | 'dub';
    streams: AnivexaStreamSource[];
    subtitles: Array<{
        file: string;
        url: string;
        label: string;
        lang: string;
        srclang: string;
        kind: string;
        default: boolean;
    }>;
    intro?: { start: number; end: number; title?: string } | null;
    outro?: { start: number; end: number; title?: string } | null;
    allServers?: Array<{ name: string; type: string; embed?: string }>;
    failedServers?: Array<{ name: string; type: string; error?: string }>;
    error?: string;
}

export interface AnivexaEpisodeItem {
    id: string;
    audio: 'sub' | 'dub';
    number: number;
    title: string;
    titleJapanese?: string;
    titleRomanji?: string;
    image?: string;
    airDate?: string;
    duration?: number;
    filler?: boolean;
    recap?: boolean;
    description?: string;
}

export interface AnivexaEpisodesResult {
    success: boolean;
    anilistId: number;
    title?: string;
    provider: string;
    sub: AnivexaEpisodeItem[];
    dub: AnivexaEpisodeItem[];
    error?: string;
}

// FlixCloud / ReAnime XOR keys for manifest and segment unwrap
const FLIX_IMAGE_SEGMENT_XOR_KEY = Uint8Array.from([
    157, 42, 241, 71, 179, 142, 92, 112,
    166, 25, 228, 59, 216, 98, 15, 197,
]);

/**
 * Decrypts XOR encrypted FlixCloud/ReAnime master and media playlists.
 */
export function decryptFlixManifest(bodyBuffer: Buffer, playlistKey?: string): string {
    const trimmed = bodyBuffer.toString('utf8').trim();
    if (trimmed.startsWith('#EXTM3U') || !playlistKey) return trimmed;

    try {
        const key = Buffer.from(playlistKey, 'base64');
        const payload = Buffer.from(trimmed, 'base64');
        const out = Buffer.alloc(payload.length);
        for (let i = 0; i < payload.length; i++) {
            out[i] = payload[i] ^ key[i % key.length];
        }
        const text = out.toString('utf8').trim();
        if (text.startsWith('#EXTM3U')) return text;
    } catch {
        // Fall back to raw text if decryption fails
    }
    return trimmed;
}

/**
 * Strips fake RIFF/WebP or PNG image headers and unmasks XOR video data on video segments.
 */
export function unwrapFlixImageSegment(bodyBuffer: Buffer): { body: Buffer; unwrapped: boolean } {
    let offset = 0;
    let needsXor = false;

    const isWebp =
        bodyBuffer.length > 12 &&
        bodyBuffer[0] === 0x52 &&
        bodyBuffer[1] === 0x49 &&
        bodyBuffer[2] === 0x46 &&
        bodyBuffer[3] === 0x46 &&
        bodyBuffer[8] === 0x57 &&
        bodyBuffer[9] === 0x45 &&
        bodyBuffer[10] === 0x42 &&
        bodyBuffer[11] === 0x50;

    const isPng =
        bodyBuffer.length > 8 &&
        bodyBuffer[0] === 0x89 &&
        bodyBuffer[1] === 0x50 &&
        bodyBuffer[2] === 0x4e &&
        bodyBuffer[3] === 0x47 &&
        bodyBuffer[4] === 0x0d &&
        bodyBuffer[5] === 0x0a &&
        bodyBuffer[6] === 0x1a &&
        bodyBuffer[7] === 0x0a;

    if (isWebp) {
        offset = 12;
        needsXor = bodyBuffer[offset] !== 0x47;
    } else if (isPng) {
        offset = 8;
        needsXor = bodyBuffer[offset] !== 0x47;
    }

    if (!offset) return { body: bodyBuffer, unwrapped: false };

    const out = Buffer.from(bodyBuffer.subarray(offset));
    if (needsXor) {
        for (let i = 0; i < out.length; i++) {
            out[i] ^= FLIX_IMAGE_SEGMENT_XOR_KEY[i % FLIX_IMAGE_SEGMENT_XOR_KEY.length];
        }
    }
    return { body: out, unwrapped: true };
}

/**
 * Fetch Anime metadata from AniList
 */
export async function fetchAnivexaMedia(anilistId: number) {
    return await getMedia(anilistId);
}

/**
 * Map AniList ID to external databases (MAL, Kitsu, AniDB, Simkl, TVDB, TMDB, etc.)
 */
export async function fetchAnivexaMappings(anilistId: number) {
    return await mapAnimeIds(anilistId);
}

/**
 * Fetch Episode list for a given provider (default 'reanime', or 'anikoto', 'aniwaves', etc.)
 */
export async function fetchAnivexaEpisodes(
    anilistId: number,
    provider: string = 'reanime'
): Promise<AnivexaEpisodesResult> {
    try {
        const reqUrl = `http://localhost/episodes/${provider}/${anilistId}`;
        const response = await anivexaWorker.fetch(new Request(reqUrl), {});
        if (!response.ok) {
            const err = await response.json().catch(() => ({ error: `Status ${response.status}` }));
            return {
                success: false,
                anilistId,
                provider,
                sub: [],
                dub: [],
                error: (err as any)?.error || `Provider ${provider} failed with status ${response.status}`
            };
        }

        const data = await response.json();
        const providerData = (data as any)[provider] || data;
        const subList: AnivexaEpisodeItem[] = providerData?.episodes?.sub || [];
        const dubList: AnivexaEpisodeItem[] = providerData?.episodes?.dub || [];

        return {
            success: true,
            anilistId,
            title: providerData?.meta?.title || data?.mappings?.title,
            provider,
            sub: subList,
            dub: dubList
        };
    } catch (err: any) {
        return {
            success: false,
            anilistId,
            provider,
            sub: [],
            dub: [],
            error: err?.message || 'Failed to fetch episodes'
        };
    }
}

/**
 * Resolves streams for a specific provider, episode, and audio type.
 */
export async function fetchAnivexaWatch(
    provider: string,
    anilistId: number,
    audio: 'sub' | 'dub',
    episode: number
): Promise<AnivexaWatchResult> {
    try {
        const targetPath = `/watch/${provider}/${anilistId}/${audio}/${provider}-${episode}`;
        const req = new Request(`http://localhost${targetPath}`);
        const response = await anivexaWorker.fetch(req, {});

        if (!response.ok) {
            const err = await response.json().catch(() => ({ error: `Status ${response.status}` }));
            return {
                success: false,
                provider,
                anilistId,
                episode,
                audio,
                streams: [],
                subtitles: [],
                error: (err as any)?.error || `Failed with status ${response.status}`
            };
        }

        const data: any = await response.json();
        const rawStreams = Array.isArray(data.streams) ? data.streams : [];

        // Build proxied URLs with decryption keys embedded for seamless playback
        const streams: AnivexaStreamSource[] = rawStreams.map((s: any) => {
            const playlistKey = s.playlist_key || s.key || '';
            const referer = s.embed || (provider === 'reanime' ? 'https://flixcloud.cc/' : '');
            const params = new URLSearchParams();
            params.set('url', s.url);
            if (referer) params.set('referer', referer);
            if (playlistKey) params.set('playlist_key', playlistKey);
            const proxiedUrl = `/api/anime/anivexa/proxy?${params.toString()}`;

            return {
                server: s.server || 'Default',
                audio: s.audio || audio,
                url: s.url,
                proxiedUrl,
                type: s.type || 'hls',
                embed: s.embed,
                key: s.key,
                playlist_key: s.playlist_key,
                subtitles: s.subtitles,
                thumbnails_vtt: s.thumbnails_vtt,
                video_title: s.video_title,
                intro: s.intro,
                outro: s.outro
            };
        });

        // Collect and normalize all subtitles
        const rawSubs = [
            ...(Array.isArray(data.subtitles) ? data.subtitles : []),
            ...streams.flatMap((s) => (Array.isArray(s.subtitles) ? s.subtitles : []))
        ];
        const seenSubs = new Set<string>();
        const subtitles: Array<{
            file: string;
            url: string;
            label: string;
            lang: string;
            srclang: string;
            kind: string;
            default: boolean;
        }> = [];

        for (const sub of rawSubs) {
            const fileUrl = sub?.file || sub?.url;
            if (!fileUrl || seenSubs.has(fileUrl)) continue;
            if (sub?.kind === 'thumbnails' || fileUrl.includes('thumbnails')) continue;
            seenSubs.add(fileUrl);
            const label = sub?.label || sub?.lang || sub?.language || 'English';
            const vttProxiedUrl = `/api/subtitles/vtt?url=${encodeURIComponent(fileUrl)}`;
            subtitles.push({
                file: fileUrl,
                url: vttProxiedUrl,
                label,
                lang: label,
                srclang: sub?.srclang || sub?.lang || 'en',
                kind: sub?.kind || 'captions',
                default: Boolean(sub?.default)
            });
        }

        return {
            success: true,
            provider,
            anilistId,
            episode,
            audio,
            streams,
            subtitles,
            intro: data.intro || streams[0]?.intro || null,
            outro: data.outro || streams[0]?.outro || null,
            allServers: data.allServers,
            failedServers: data.failedServers
        };
    } catch (err: any) {
        return {
            success: false,
            provider,
            anilistId,
            episode,
            audio,
            streams: [],
            subtitles: [],
            error: err?.message || 'Watch resolution error'
        };
    }
}

/**
 * Tries providers in priority order with fast fallback until a stream is found.
 */
export async function fetchAnivexaBestStream(
    anilistId: number,
    episode: number,
    audio: 'sub' | 'dub' = 'sub'
): Promise<AnivexaWatchResult> {
    const priorityProviders = [
        'reanime',
        'anikoto',
        'aniwaves',
        'animeonsen',
        'mkissa',
        'kaa',
        'senshi',
        'animedunya',
        'anizone'
    ];

    let lastError = 'No providers responded';

    for (const provider of priorityProviders) {
        try {
            const res = await fetchAnivexaWatch(provider, anilistId, audio, episode);
            if (res.success && res.streams.length > 0) {
                return res;
            }
            if (res.error) lastError = `Provider ${provider}: ${res.error}`;
        } catch (e: any) {
            lastError = `Provider ${provider}: ${e?.message}`;
        }
    }

    return {
        success: false,
        provider: 'none',
        anilistId,
        episode,
        audio,
        streams: [],
        subtitles: [],
        error: lastError
    };
}

/**
 * Generates an M3U playlist with pure video stream URLs for Kodi, VLC, TiviMate, OTT Navigator.
 */
export async function generateAnivexaM3u(
    baseUrl: string,
    anilistId: number,
    audio: 'sub' | 'dub' = 'sub',
    provider: string = 'reanime'
): Promise<string> {
    const [media, episodesResult] = await Promise.all([
        getMedia(anilistId).catch(() => null),
        fetchAnivexaEpisodes(anilistId, provider)
    ]);

    const title = media?.title?.english || media?.title?.romaji || media?.title?.native || episodesResult.title || `Anime ${anilistId}`;
    const poster = media?.coverImage?.large || media?.coverImage?.medium || '';
    const episodes = audio === 'dub' ? (episodesResult.dub.length ? episodesResult.dub : episodesResult.sub) : episodesResult.sub;

    let m3u = `#EXTM3U x-tvg-url=""\n`;
    m3u += `#PLAYLIST:${title} (${audio.toUpperCase()})\n\n`;

    for (const ep of episodes) {
        const epNum = ep.number;
        const epTitle = ep.title ? `${title} - E${epNum}: ${ep.title}` : `${title} - Episode ${epNum}`;
        const thumb = ep.image || poster;
        // Direct stream endpoint that redirects (302) to decrypted/proxied .m3u8 manifest
        const streamUrl = `${baseUrl}/api/anime/anivexa/stream/${provider}/${anilistId}/${audio}/${epNum}`;

        m3u += `#EXTINF:-1 tvg-id="${anilistId}_${epNum}" tvg-name="${epTitle}" tvg-logo="${thumb}" group-title="${title}",${epTitle}\n`;
        m3u += `${streamUrl}\n\n`;
    }

    return m3u;
}

/**
 * Reverse proxy handler for Anivexa HLS manifests and video segments with automatic XOR decryption.
 */
export async function handleAnivexaProxy(req: ExpressRequest, res: ExpressResponse) {
    const targetUrl = (req.query.url || '').toString();
    const referer = (req.query.referer || '').toString();
    const playlistKey = (req.query.playlist_key || req.query.key || '').toString();

    if (!targetUrl) {
        return res.status(400).send('Missing url parameter');
    }

    try {
        const urlObj = new URL(targetUrl);
        const headers: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
        };

        if (referer) {
            headers['Referer'] = referer;
            try {
                headers['Origin'] = new URL(referer).origin;
            } catch {}
        } else if (urlObj.hostname.includes('flixcloud')) {
            headers['Referer'] = 'https://flixcloud.cc/';
            headers['Origin'] = 'https://flixcloud.cc';
        }

        const upstreamRes = await fetch(targetUrl, {
            headers,
            redirect: 'follow',
        });

        if (!upstreamRes.ok) {
            return res.status(upstreamRes.status).send(`Upstream returned ${upstreamRes.status}`);
        }

        const contentType = (upstreamRes.headers.get('content-type') || '').toLowerCase();
        const rawBuf = Buffer.from(await upstreamRes.arrayBuffer());
        const cleanPath = targetUrl.split('?')[0];
        const isM3u8 = cleanPath.endsWith('.m3u8') || contentType.includes('mpegurl') || Boolean(playlistKey);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', '*');

        if (isM3u8) {
            let manifestText = decryptFlixManifest(rawBuf, playlistKey || undefined);

            if (manifestText.startsWith('#EXTM3U') || cleanPath.endsWith('.m3u8')) {
                const baseUrl = cleanPath.substring(0, cleanPath.lastIndexOf('/') + 1);

                // Rewrite lines to route through this proxy
                const lines = manifestText.split('\n');
                const rewritten = lines.map((line) => {
                    const trimmed = line.trim();
                    if (!trimmed) return line;

                    // Rewrite URI="..." attributes in tags like #EXT-X-KEY or #EXT-X-MEDIA
                    if (trimmed.startsWith('#EXT') && trimmed.includes('URI="')) {
                        return trimmed.replace(/URI="([^"]+)"/g, (match, uriVal) => {
                            let absUri = uriVal;
                            if (!uriVal.startsWith('http://') && !uriVal.startsWith('https://')) {
                                absUri = new URL(uriVal, baseUrl).toString();
                            }
                            const p = new URLSearchParams();
                            p.set('url', absUri);
                            if (referer) p.set('referer', referer);
                            if (playlistKey) p.set('playlist_key', playlistKey);
                            return `URI="/api/anime/anivexa/proxy?${p.toString()}"`;
                        });
                    }

                    // Leave comments and metadata tags alone
                    if (trimmed.startsWith('#')) return line;

                    // Rewrite segment or child playlist URLs
                    let absUrl = trimmed;
                    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
                        absUrl = new URL(trimmed, baseUrl).toString();
                    }
                    const p = new URLSearchParams();
                    p.set('url', absUrl);
                    if (referer) p.set('referer', referer);
                    if (playlistKey) p.set('playlist_key', playlistKey);
                    return `/api/anime/anivexa/proxy?${p.toString()}`;
                });

                res.setHeader('Content-Type', 'application/vnd.apple.mpegurl; charset=utf-8');
                res.setHeader('Cache-Control', 'public, max-age=60');
                return res.send(rewritten.join('\n'));
            }
        }

        // Handle video segments: unwrap fake RIFF/WebP/PNG wrappers and XOR
        const { body: unwrappedBody, unwrapped } = unwrapFlixImageSegment(rawBuf);

        if (unwrapped) {
            res.setHeader('Content-Type', 'video/mp2t');
        } else if (contentType) {
            res.setHeader('Content-Type', contentType);
        } else {
            res.setHeader('Content-Type', 'video/mp2t');
        }

        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.send(unwrappedBody);
    } catch (err: any) {
        return res.status(500).send(`Proxy error: ${err?.message}`);
    }
}
