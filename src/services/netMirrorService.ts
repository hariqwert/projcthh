import axios from 'axios';
import https from 'https';

export interface NetMirrorSource {
    file: string;
    label: string;
    type: string;
    quality?: string;
    audioTracks?: Array<{ label: string; lang: string }>;
    subtitles?: Array<{ file: string; label: string; kind: string }>;
}

export interface NetMirrorResolvedResult {
    provider: string;
    platform: 'netflix' | 'primevideo' | 'hotstar';
    title: string;
    year?: string;
    id: string;
    sources: NetMirrorSource[];
    proxiedSources: Array<{
        url: string;
        quality: string;
        format: 'hls' | 'mp4';
        headers: Record<string, string>;
    }>;
}

interface PlatformConfig {
    name: string;
    ott: string;
    platform: 'netflix' | 'primevideo' | 'hotstar';
    search: string;
    post: string;
    episodes: string;
    playlist: string;
}

const PLATFORMS: PlatformConfig[] = [
    {
        name: 'Disney+ Hotstar',
        ott: 'hs',
        platform: 'hotstar',
        search: '/mobile/hs/search.php',
        post: '/mobile/hs/post.php',
        episodes: '/mobile/hs/episodes.php',
        playlist: '/mobile/hs/playlist.php'
    },
    {
        name: 'Netflix',
        ott: 'nf',
        platform: 'netflix',
        search: '/mobile/search.php',
        post: '/mobile/post.php',
        episodes: '/mobile/episodes.php',
        playlist: '/mobile/playlist.php'
    },
    {
        name: 'Prime Video',
        ott: 'pv',
        platform: 'primevideo',
        search: '/mobile/pv/search.php',
        post: '/mobile/pv/post.php',
        episodes: '/mobile/pv/episodes.php',
        playlist: '/mobile/pv/playlist.php'
    }
];

const DEFAULT_UA = 'Mozilla/5.0 (Linux; Android 15; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.7680.177 Mobile Safari/537.36';
const NETMIRROR_BASE = 'https://net52.cc';

const httpsAgent = new https.Agent({
    keepAlive: true,
    rejectUnauthorized: false
});

export class NetMirrorService {
    private static cachedCookie: string | null = null;
    private static cookieExpiresAt = 0;

    /**
     * Bypasses NetMirror's verify.php challenge by passing a valid RFC4122 UUIDv4 token
     * and caches the session cookie t_hash_t.
     */
    public static async getSessionCookie(forceFresh = false): Promise<string> {
        if (!forceFresh && this.cachedCookie && Date.now() < this.cookieExpiresAt) {
            return this.cachedCookie;
        }

        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });

        try {
            const res = await axios.post(
                `${NETMIRROR_BASE}/verify.php`,
                `g-recaptcha-response=${uuid}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Origin': 'https://net22.cc',
                        'Referer': 'https://net22.cc/verify2',
                        'User-Agent': DEFAULT_UA
                    },
                    httpsAgent,
                    maxRedirects: 0,
                    validateStatus: (status) => status >= 200 && status < 400
                }
            );

            const setCookie = res.headers['set-cookie'];
            if (setCookie && Array.isArray(setCookie)) {
                for (const cookieStr of setCookie) {
                    const match = cookieStr.match(/t_hash_t=([^;]+)/);
                    if (match) {
                        this.cachedCookie = match[1];
                        // Cache for 24 hours (cookie lasts 72 hours upstream)
                        this.cookieExpiresAt = Date.now() + 24 * 3600 * 1000;
                        return this.cachedCookie;
                    }
                }
            }

            throw new Error('No t_hash_t cookie returned by verify.php');
        } catch (err: any) {
            console.error('[NetMirrorService] Handshake failed:', err?.message || err);
            throw err;
        }
    }

    /**
     * Searches a single NetMirror platform by title
     */
    public static async searchPlatform(
        platform: PlatformConfig,
        query: string,
        cookie: string
    ): Promise<Array<{ id: string; title: string; year?: string }>> {
        const time = Math.floor(Date.now() / 1000);
        const url = `${NETMIRROR_BASE}${platform.search}?s=${encodeURIComponent(query)}&t=${time}`;

        try {
            const res = await axios.get(url, {
                headers: {
                    'Cookie': `t_hash_t=${cookie}; hd=on; ott=${platform.ott}`,
                    'X-Requested-With': 'XMLHttpRequest',
                    'User-Agent': DEFAULT_UA,
                    'Referer': `${NETMIRROR_BASE}/`
                },
                httpsAgent,
                timeout: 10000
            });

            if (res.data?.status === 'y' && Array.isArray(res.data?.searchResult)) {
                return res.data.searchResult.map((item: any) => ({
                    id: String(item.id || ''),
                    title: String(item.t || item.title || ''),
                    year: item.year ? String(item.year) : undefined
                })).filter((x: any) => x.id && x.title);
            }
            return [];
        } catch {
            return [];
        }
    }

    /**
     * Fetches stream playlist for a movie or episode ID
     */
    public static async getPlaylist(
        platform: PlatformConfig,
        id: string,
        cookie: string
    ): Promise<NetMirrorSource[]> {
        const time = Math.floor(Date.now() / 1000);
        const url = `${NETMIRROR_BASE}${platform.playlist}?id=${encodeURIComponent(id)}&t=${time}`;

        try {
            const res = await axios.get(url, {
                headers: {
                    'Cookie': `t_hash_t=${cookie}; hd=on; ott=${platform.ott}`,
                    'X-Requested-With': 'XMLHttpRequest',
                    'User-Agent': DEFAULT_UA,
                    'Referer': `${NETMIRROR_BASE}/`
                },
                httpsAgent,
                timeout: 12000
            });

            const data = Array.isArray(res.data) ? res.data[0] : res.data;
            if (data?.sources && Array.isArray(data.sources)) {
                return data.sources.map((s: any) => ({
                    file: s.file?.startsWith('http') ? s.file : `${NETMIRROR_BASE}${s.file}`,
                    label: s.label || s.quality || 'Auto',
                    type: s.type || 'application/vnd.apple.mpegurl',
                    quality: s.label || s.quality || 'Auto'
                }));
            }
            return [];
        } catch {
            return [];
        }
    }

    /**
     * Searches across Netflix, Prime Video, and Hotstar to resolve high-speed streams
     */
    public static async resolveMedia(
        title: string,
        mediaType: 'movie' | 'tv' = 'movie',
        season = 1,
        episode = 1
    ): Promise<NetMirrorResolvedResult | null> {
        let cookie: string;
        try {
            cookie = await this.getSessionCookie();
        } catch {
            return null;
        }

        const cleanTitle = title
            .replace(/\s*\(?(19|20)\d{2}\)?/g, '')
            .replace(/\s*\[?(19|20)\d{2}\]?/g, '')
            .replace(/[^\w\s:.-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        for (const platform of PLATFORMS) {
            try {
                const searchResults = await this.searchPlatform(platform, cleanTitle, cookie);
                if (!searchResults.length) continue;

                // Pick best matching title
                const match = searchResults.find(r => 
                    r.title.toLowerCase().includes(cleanTitle.toLowerCase()) ||
                    cleanTitle.toLowerCase().includes(r.title.toLowerCase())
                ) || searchResults[0];

                if (!match) continue;

                let targetId = match.id;

                // If TV series, resolve episode ID if needed
                if (mediaType === 'tv') {
                    const time = Math.floor(Date.now() / 1000);
                    const epUrl = `${NETMIRROR_BASE}${platform.episodes}?s=${match.id}&t=${time}`;
                    try {
                        const epRes = await axios.get(epUrl, {
                            headers: {
                                'Cookie': `t_hash_t=${cookie}; hd=on; ott=${platform.ott}`,
                                'X-Requested-With': 'XMLHttpRequest',
                                'User-Agent': DEFAULT_UA
                            },
                            httpsAgent,
                            timeout: 8000
                        });
                        if (epRes.data?.episodes && Array.isArray(epRes.data.episodes)) {
                            const epItem = epRes.data.episodes.find((e: any) => 
                                Number(e.s || e.season || 1) === season && 
                                Number(e.ep || e.episode || e.number || 1) === episode
                            ) || epRes.data.episodes[episode - 1];
                            if (epItem?.id) {
                                targetId = String(epItem.id);
                            }
                        }
                    } catch {
                        // Fall back to main id
                    }
                }

                const sources = await this.getPlaylist(platform, targetId, cookie);
                if (!sources.length) continue;

                const cdnHeaders = {
                    'Cookie': `t_hash_t=${cookie}; hd=on; ott=${platform.ott}`,
                    'Origin': 'https://net22.cc',
                    'Referer': `${NETMIRROR_BASE}/`,
                    'User-Agent': DEFAULT_UA
                };

                const proxiedSources = sources.map(s => {
                    const isM3u8 = s.file.includes('.m3u8') || s.type.includes('mpegurl');
                    const encodedUrl = encodeURIComponent(s.file);
                    const headerParam = encodeURIComponent(Buffer.from(JSON.stringify(cdnHeaders)).toString('base64'));
                    const proxyUrl = `/stream_proxy.php?url=${encodedUrl}&h=${headerParam}`;

                    return {
                        url: proxyUrl,
                        directUrl: s.file,
                        quality: s.label || 'Auto',
                        format: (isM3u8 ? 'hls' : 'mp4') as 'hls' | 'mp4',
                        headers: cdnHeaders
                    };
                });

                return {
                    provider: `NetMirror (${platform.name})`,
                    platform: platform.platform,
                    title: match.title,
                    year: match.year,
                    id: targetId,
                    sources,
                    proxiedSources
                };
            } catch {
                continue;
            }
        }

        return null;
    }
}
