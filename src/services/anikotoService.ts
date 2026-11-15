import axios from 'axios';
import crypto from 'crypto';

// Anikoto RC4 key for VRF cipher
const ANIKOTO_RC4_KEY = 'simple-hash';

// MegaPlay AES-CBC keys for stream decryption
const MEGAPLAY_ENC_KEY = 'i?LMTAx0Q6,:}50U';
const MEGAPLAY_ENC_IV = "W0;27ToaUpl_P%'c";

// Cache for manga lookups & episode catalogs (TTL: 1 hour)
interface CacheEntry<T> {
    data: T;
    timestamp: number;
}
const anikotoCache = new Map<string, CacheEntry<any>>();
const CACHE_TTL_MS = 60 * 60 * 1000;

function getFromCache<T>(key: string): T | null {
    const entry = anikotoCache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
        anikotoCache.delete(key);
        return null;
    }
    return entry.data;
}

function setInCache<T>(key: string, data: T): void {
    anikotoCache.set(key, { data, timestamp: Date.now() });
}

/**
 * RC4 stream cipher matching Anikoto's client-side implementation
 */
export function rc4Encrypt(key: string, str: string): string {
    const s: number[] = [];
    let j = 0;
    let x: number;
    let res = '';

    for (let i = 0; i < 256; i++) s[i] = i;
    for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }
    let i = 0;
    j = 0;
    for (let y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
}

/**
 * Generates Anikoto VRF string (Base64 of RC4 binary output)
 */
export function generateVrf(input: string | number): string {
    const binary = rc4Encrypt(ANIKOTO_RC4_KEY, String(input));
    return Buffer.from(binary, 'binary').toString('base64');
}

/**
 * Pad key string into Buffer of specific byte length
 */
function padKeyBytes(str: string, len: number): Buffer {
    const buf = Buffer.alloc(len);
    const src = Buffer.from(str, 'utf8');
    src.copy(buf, 0, 0, Math.min(len, src.length));
    return buf;
}

/**
 * Decrypts MegaPlay's AES-256-CBC encrypted sources payload
 */
export function decryptMegaPlayEnc(encStr: string): { file: string; [key: string]: any } | null {
    try {
        let b64 = encStr.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4 !== 0) b64 += '=';
        const ciphertext = Buffer.from(b64, 'base64');

        const key = padKeyBytes(MEGAPLAY_ENC_KEY, 32);
        const iv = padKeyBytes(MEGAPLAY_ENC_IV, 16);

        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(ciphertext);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return JSON.parse(decrypted.toString('utf8'));
    } catch (e: any) {
        console.error('[Anikoto] Error decrypting MegaPlay payload:', e.message);
        return null;
    }
}

export interface AnikotoSearchResult {
    title: string;
    url: string;
    slug: string;
    poster?: string;
    rating?: string;
    year?: string;
    type?: string;
}

export interface AnikotoEpisode {
    id: string;
    number: number;
    slug: string;
    malId?: number;
    timestamp?: number;
    hasSub: boolean;
    hasDub: boolean;
    dataIds: string;
}

export interface AnikotoServerItem {
    name: string;
    type: 'sub' | 'dub';
    epId: string;
    svId: string;
    linkId: string;
}

export interface AnikotoStreamResult {
    success: boolean;
    serverName?: string;
    streamUrl?: string;
    rawUrl?: string;
    quality?: string;
    type?: string;
    sources: Array<{
        url: string;
        quality: string;
        type: string;
        label: string;
        name: string;
        rawUrl?: string;
        proxyUrl?: string;
    }>;
    subtitles?: Array<{
        lang: string;
        url: string;
        label: string;
    }>;
    intro?: { start: number; end: number };
    outro?: { start: number; end: number };
    error?: string;
}

const COMMON_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://anikoto.cz/'
};

/**
 * Searches Anikoto for anime titles
 */
export async function searchAnikoto(title: string): Promise<AnikotoSearchResult[]> {
    const cleanTitle = title.replace(/\s*\((?:anime|tv|series|\d{4})\)/gi, '').trim();
    const cacheKey = `search:${cleanTitle.toLowerCase()}`;
    const cached = getFromCache<AnikotoSearchResult[]>(cacheKey);
    if (cached) return cached;

    try {
        const res = await axios.get(`https://anikoto.cz/ajax/anime/search?keyword=${encodeURIComponent(cleanTitle)}`, {
            headers: {
                ...COMMON_HEADERS,
                'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 6000
        });

        if (res.data?.status === 200 && res.data?.result?.html) {
            const html: string = res.data.result.html;
            const results: AnikotoSearchResult[] = [];

            const itemRegex = /<a[^>]*class="item"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
            let match;
            while ((match = itemRegex.exec(html)) !== null) {
                const url = match[1];
                const block = match[2];

                const nameMatch = block.match(/class="name[^"]*"[^>]*>([^<]+)<\/div>/i);
                const posterMatch = block.match(/<img[^>]*src="([^"]+)"/i);
                const yearMatch = block.match(/<span class="dot">(\d{4})<\/span>/i);
                const ratingMatch = block.match(/class="dot rating">([^<]+)<\/span>/i);

                const slug = url.split('/watch/')[1]?.replace(/\/$/, '') || '';
                results.push({
                    title: (nameMatch ? nameMatch[1] : '').trim(),
                    url,
                    slug,
                    poster: posterMatch ? posterMatch[1] : undefined,
                    year: yearMatch ? yearMatch[1] : undefined,
                    rating: ratingMatch ? ratingMatch[1] : undefined
                });
            }

            setInCache(cacheKey, results);
            return results;
        }
    } catch (e: any) {
        console.error('[Anikoto] Search failed:', e.message);
    }
    return [];
}

/**
 * Extracts mangaId from Anikoto show watch page
 */
export async function getAnikotoMangaId(watchUrlOrSlug: string): Promise<number | null> {
    const url = watchUrlOrSlug.startsWith('http')
        ? watchUrlOrSlug
        : `https://anikoto.cz/watch/${watchUrlOrSlug}`;

    const cacheKey = `mangaId:${url}`;
    const cached = getFromCache<number>(cacheKey);
    if (cached) return cached;

    try {
        const res = await axios.get(url, {
            headers: COMMON_HEADERS,
            timeout: 7000
        });

        const html = res.data;
        // Search for const mangaId = 958; or data-manga-id="958" or data-id="958"
        const m1 = html.match(/const\s+mangaId\s*=\s*(\d+)/i);
        if (m1) {
            const id = parseInt(m1[1], 10);
            setInCache(cacheKey, id);
            return id;
        }

        const m2 = html.match(/data-(?:anime-id|manga-id|id)="(\d+)"/i);
        if (m2) {
            const id = parseInt(m2[1], 10);
            setInCache(cacheKey, id);
            return id;
        }
    } catch (e: any) {
        console.error('[Anikoto] Failed to fetch watch page for mangaId:', e.message);
    }
    return null;
}

/**
 * Retrieves the full episode list for an anime via mangaId
 */
export async function getAnikotoEpisodes(mangaId: number): Promise<AnikotoEpisode[]> {
    const cacheKey = `episodes:${mangaId}`;
    const cached = getFromCache<AnikotoEpisode[]>(cacheKey);
    if (cached) return cached;

    try {
        const vrf = encodeURIComponent(generateVrf(mangaId));
        const res = await axios.get(`https://anikoto.cz/ajax/episode/list/${mangaId}?vrf=${vrf}`, {
            headers: {
                ...COMMON_HEADERS,
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': `https://anikoto.cz/anime/${mangaId}`
            },
            timeout: 8000
        });

        if (res.data?.status === 200 && res.data?.result) {
            const html: string = res.data.result;
            const episodes: AnikotoEpisode[] = [];

            const epRegex = /<a[^>]*data-id="([^"]+)"[^>]*data-num="([^"]+)"[^>]*data-slug="([^"]+)"[^>]*data-ids="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
            let match;
            while ((match = epRegex.exec(html)) !== null) {
                const fullTag = match[0];
                const id = match[1];
                const num = parseFloat(match[2]);
                const slug = match[3];
                const dataIds = match[4];

                const malMatch = fullTag.match(/data-mal="(\d+)"/i);
                const timeMatch = fullTag.match(/data-timestamp="(\d+)"/i);
                const subMatch = fullTag.match(/data-sub="(\d+)"/i);
                const dubMatch = fullTag.match(/data-dub="(\d+)"/i);

                episodes.push({
                    id,
                    number: isNaN(num) ? 1 : num,
                    slug,
                    malId: malMatch ? parseInt(malMatch[1], 10) : undefined,
                    timestamp: timeMatch ? parseInt(timeMatch[1], 10) : undefined,
                    hasSub: subMatch ? subMatch[1] === '1' : true,
                    hasDub: dubMatch ? dubMatch[1] === '1' : false,
                    dataIds
                });
            }

            setInCache(cacheKey, episodes);
            return episodes;
        }
    } catch (e: any) {
        console.error('[Anikoto] Failed to load episode catalog:', e.message);
    }
    return [];
}

/**
 * Retrieves the available streaming servers for a given episode's dataIds
 */
export async function getAnikotoServers(dataIds: string): Promise<AnikotoServerItem[]> {
    try {
        const res = await axios.get(`https://anikoto.cz/ajax/server/list?servers=${encodeURIComponent(dataIds)}`, {
            headers: {
                ...COMMON_HEADERS,
                'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 6000
        });

        if (res.data?.status === 200 && res.data?.result) {
            const html: string = res.data.result;
            const servers: AnikotoServerItem[] = [];

            // Parse SUB and DUB blocks
            const typeBlocks = html.split(/<div class="type" data-type="([^"]+)">/i);
            for (let i = 1; i < typeBlocks.length; i += 2) {
                const audioType = typeBlocks[i].toLowerCase() as 'sub' | 'dub';
                const blockContent = typeBlocks[i + 1] || '';

                const liRegex = /<li[^>]*data-ep-id="([^"]+)"[^>]*data-sv-id="([^"]+)"[^>]*data-link-id="([^"]+)"[^>]*>([^<]+)<\/li>/gi;
                let sMatch;
                while ((sMatch = liRegex.exec(blockContent)) !== null) {
                    servers.push({
                        type: audioType,
                        epId: sMatch[1],
                        svId: sMatch[2],
                        linkId: sMatch[3],
                        name: sMatch[4].trim()
                    });
                }
            }
            return servers;
        }
    } catch (e: any) {
        console.error('[Anikoto] Failed to fetch server list:', e.message);
    }
    return [];
}

/**
 * Resolves a direct MegaPlay/Vidtube embed link into an HLS M3U8
 */
async function resolveEmbedToM3u8(embedUrl: string): Promise<{
    m3u8?: string;
    subtitles?: Array<{ lang: string; url: string; label: string }>;
    intro?: { start: number; end: number };
    outro?: { start: number; end: number };
} | null> {
    try {
        const embedRes = await axios.get(embedUrl, {
            headers: {
                'User-Agent': COMMON_HEADERS['User-Agent'],
                'Referer': 'https://anikoto.cz/'
            },
            timeout: 6000
        });

        const embedHtml = embedRes.data;
        const idMatch = embedHtml.match(/data-id="(\d+)"/i) || embedHtml.match(/data-realid="(\d+)"/i);
        if (!idMatch) return null;

        const epId = idMatch[1];
        const baseUrl = embedUrl.includes('vidtube.site') ? 'https://vidtube.site/' : 'https://megaplay.buzz/';

        const sourcesRes = await axios.get(`${baseUrl}stream/getSources?id=${epId}&platform=OTHER&st=other`, {
            headers: {
                'User-Agent': COMMON_HEADERS['User-Agent'],
                'Referer': embedUrl,
                'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 6000
        });

        if (sourcesRes.data) {
            const data = sourcesRes.data;
            let m3u8Url = '';

            if (data.enc) {
                const dec = decryptMegaPlayEnc(data.enc);
                if (dec && dec.file) {
                    m3u8Url = dec.file;
                }
            } else if (data.sources && data.sources[0]?.file) {
                m3u8Url = data.sources[0].file;
            }

            if (m3u8Url) {
                const subtitles = (data.tracks || [])
                    .filter((t: any) => t.kind === 'captions' || t.kind === 'subtitles')
                    .map((t: any) => ({
                        lang: t.label || 'English',
                        url: t.file,
                        label: t.label || 'English'
                    }));

                return {
                    m3u8: m3u8Url,
                    subtitles,
                    intro: data.intro || undefined,
                    outro: data.outro || undefined
                };
            }
        }
    } catch (e: any) {
        console.error('[Anikoto] Error resolving embed to M3U8:', e.message);
    }
    return null;
}

/**
 * Master stream scraper for Anikoto
 */
export async function scrapeAnikotoAnime(params: {
    title?: string;
    slug?: string;
    mangaId?: number;
    episode?: number;
    audio?: 'sub' | 'dub';
    preferredServer?: string;
}): Promise<AnikotoStreamResult> {
    const epNum = params.episode || 1;
    const audioPref = params.audio || 'sub';

    try {
        let mangaId = params.mangaId;

        // 1. Resolve mangaId if not provided directly
        if (!mangaId) {
            if (params.slug) {
                mangaId = await getAnikotoMangaId(params.slug) || undefined;
            } else if (params.title) {
                const searchList = await searchAnikoto(params.title);
                if (searchList.length > 0) {
                    mangaId = await getAnikotoMangaId(searchList[0].url) || undefined;
                }
            }
        }

        if (!mangaId) {
            return { success: false, sources: [], error: 'Anime title not found on Anikoto' };
        }

        // 2. Load episode catalog
        const episodes = await getAnikotoEpisodes(mangaId);
        if (!episodes || episodes.length === 0) {
            return { success: false, sources: [], error: 'No episodes listed for anime on Anikoto' };
        }

        const targetEp = episodes.find(e => e.number === epNum) || episodes[epNum - 1] || episodes[0];
        if (!targetEp) {
            return { success: false, sources: [], error: `Episode ${epNum} not found` };
        }

        // 3. Fetch server list for episode
        const servers = await getAnikotoServers(targetEp.dataIds);
        if (!servers || servers.length === 0) {
            return { success: false, sources: [], error: 'No streaming servers active on Anikoto' };
        }

        // Filter by audio preference, or fallback to any audio
        let candidateServers = servers.filter(s => s.type === audioPref);
        if (candidateServers.length === 0) {
            candidateServers = servers;
        }

        // Check preferred server first (e.g. HD-1, Vidstream-2, VidPlay)
        if (params.preferredServer) {
            const pref = candidateServers.find(s => s.name.toLowerCase().includes(params.preferredServer!.toLowerCase()));
            if (pref) {
                candidateServers = [pref, ...candidateServers.filter(s => s !== pref)];
            }
        }

        // 4. Try candidate servers until one successfully resolves to M3U8
        for (const srv of candidateServers) {
            try {
                const srvRes = await axios.get(`https://anikoto.cz/ajax/server?get=${encodeURIComponent(srv.linkId)}`, {
                    headers: {
                        ...COMMON_HEADERS,
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    timeout: 5000
                });

                if (srvRes.data?.status === 200 && srvRes.data?.result?.url) {
                    const embedUrl = srvRes.data.result.url;
                    const resolved = await resolveEmbedToM3u8(embedUrl);

                    if (resolved && resolved.m3u8) {
                        const skipData = srvRes.data.result.skip_data;
                        const intro = resolved.intro || (skipData?.intro ? { start: skipData.intro[0], end: skipData.intro[1] } : undefined);
                        const outro = resolved.outro || (skipData?.outro ? { start: skipData.outro[0], end: skipData.outro[1] } : undefined);

                        return {
                            success: true,
                            serverName: `Anikoto (${srv.name}) [${srv.type.toUpperCase()}]`,
                            streamUrl: resolved.m3u8,
                            rawUrl: resolved.m3u8,
                            quality: '1080p FHD',
                            type: 'application/x-mpegurl',
                            sources: [{
                                url: resolved.m3u8,
                                rawUrl: resolved.m3u8,
                                quality: '1080p FHD',
                                type: 'application/x-mpegurl',
                                label: `Anikoto ${srv.name} (${srv.type.toUpperCase()})`,
                                name: `Anikoto [${srv.name}]`
                            }],
                            subtitles: resolved.subtitles || [],
                            intro,
                            outro
                        };
                    }
                }
            } catch (e: any) {
                console.warn(`[Anikoto] Server ${srv.name} failed:`, e.message);
            }
        }

        return { success: false, sources: [], error: 'All Anikoto servers failed to resolve stream' };
    } catch (err: any) {
        return { success: false, sources: [], error: err?.message || 'Anikoto scraping error' };
    }
}
