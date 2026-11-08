import axios from 'axios';

export interface NestZoneSourceEntry {
    id: string;
    name: string;
    langs: string[];
    adult: boolean;
    available: boolean;
}

export interface NestZoneEpisodeMeta {
    number: number;
    title: string;
    image?: string;
    airDate?: string;
    overview?: string;
    runtime?: number;
    filler?: boolean;
}

export interface NestZoneResolvedStream {
    provider: string;
    serverName: string;
    url: string;
    proxiedUrl: string;
    quality: string;
    format: 'hls' | 'embed' | 'mp4';
    subtitles?: Array<{ label: string; lang: string; url: string }>;
    intro?: { start: number; end: number };
    outro?: { start: number; end: number };
    headers?: Record<string, string>;
}

const NESTZONE_BASE = 'https://nestzone.site';
const DEFAULT_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

export class NestZoneAnimeService {
    private static cachedSources: { hls: NestZoneSourceEntry[]; embed: NestZoneSourceEntry[] } | null = null;
    private static sourcesExpiresAt = 0;

    /**
     * Fetches active server sources supported by NestZone (Miku, Hikari, Waguri, Aqua, etc.)
     */
    public static async getAvailableSources(): Promise<{ hls: NestZoneSourceEntry[]; embed: NestZoneSourceEntry[] }> {
        if (this.cachedSources && Date.now() < this.sourcesExpiresAt) {
            return this.cachedSources;
        }

        try {
            const res = await axios.get(`${NESTZONE_BASE}/api/sources`, {
                headers: { 'User-Agent': DEFAULT_UA },
                timeout: 8000
            });
            if (res.data?.hls && Array.isArray(res.data.hls)) {
                this.cachedSources = {
                    hls: res.data.hls,
                    embed: res.data.embed || []
                };
                this.sourcesExpiresAt = Date.now() + 30 * 60 * 1000;
                return this.cachedSources;
            }
        } catch {
            // fallback
        }

        return {
            hls: [
                { id: 'nestzone', name: 'Miku', langs: ['sub', 'dub'], adult: false, available: true },
                { id: 'hikari', name: 'Hikari', langs: ['sub', 'dub'], adult: false, available: true },
                { id: 'waguri', name: 'Waguri', langs: ['sub', 'dub'], adult: false, available: true },
                { id: 'komi', name: 'Komi', langs: ['sub', 'dub'], adult: false, available: true }
            ],
            embed: [
                { id: 'anixo', name: 'Aqua', langs: ['sub', 'dub'], adult: false, available: true },
                { id: 'shonen', name: 'Shiro', langs: ['sub', 'dub'], adult: false, available: true }
            ]
        };
    }

    /**
     * Fetches official episode metadata for any AniList ID
     */
    public static async getEpisodes(anilistId: string | number, count = 24): Promise<NestZoneEpisodeMeta[]> {
        try {
            const res = await axios.get(`${NESTZONE_BASE}/api/episodes/${anilistId}?count=${count}`, {
                headers: { 'User-Agent': DEFAULT_UA },
                timeout: 8000
            });
            if (res.data?.episodes && Array.isArray(res.data.episodes)) {
                return res.data.episodes;
            }
        } catch {
            // fallback
        }
        return [];
    }

    /**
     * Searches AniList anime IDs on NestZone by title
     */
    public static async searchAnime(query: string): Promise<number[]> {
        try {
            const res = await axios.get(`${NESTZONE_BASE}/api/search/more?q=${encodeURIComponent(query)}`, {
                headers: { 'User-Agent': DEFAULT_UA },
                timeout: 8000
            });
            if (res.data?.ids && Array.isArray(res.data.ids)) {
                return res.data.ids;
            }
        } catch {
            // fallback
        }
        return [];
    }

    /**
     * Resolves streams for a given AniList ID and episode number
     * (e.g. 195516 / episode 4 for The Apothecary Diaries Season 3)
     */
    public static async resolveEpisodeStream(
        anilistId: string | number,
        episode: number,
        lang: 'sub' | 'dub' | 'hindi' = 'sub'
    ): Promise<NestZoneResolvedStream[]> {
        const results: NestZoneResolvedStream[] = [];
        const sources = await this.getAvailableSources();

        // Standard watch URL on NestZone
        const watchUrl = `${NESTZONE_BASE}/watch/${anilistId}/${episode}`;

        // 1. Try resolving primary HLS providers
        for (const hlsSource of sources.hls.slice(0, 4)) {
            try {
                const resolveUrl = `${NESTZONE_BASE}/api/resolve/${encodeURIComponent(hlsSource.id)}?anilistId=${anilistId}&ep=${episode}&lang=${lang}`;
                const res = await axios.get(resolveUrl, {
                    headers: {
                        'User-Agent': DEFAULT_UA,
                        'Referer': watchUrl
                    },
                    timeout: 7000,
                    validateStatus: (s) => s >= 200 && s < 500
                });

                if (res.status === 200 && res.data?.streams && Array.isArray(res.data.streams)) {
                    for (const s of res.data.streams) {
                        const rawUrl = s.url || s.direct || '';
                        if (!rawUrl) continue;

                        const fullUrl = rawUrl.startsWith('/') ? `https://st.nestzone.site${rawUrl}` : rawUrl;
                        const isM3u8 = fullUrl.includes('.m3u8') || s.kind === 'hls';

                        const cdnHeaders = {
                            'Referer': `${NESTZONE_BASE}/`,
                            'Origin': NESTZONE_BASE,
                            'User-Agent': DEFAULT_UA
                        };
                        const headerParam = encodeURIComponent(Buffer.from(JSON.stringify(cdnHeaders)).toString('base64'));
                        const proxiedUrl = `/stream_proxy.php?url=${encodeURIComponent(fullUrl)}&h=${headerParam}`;

                        results.push({
                            provider: 'NestZone',
                            serverName: `${hlsSource.name} (${s.quality || 'Auto'})`,
                            url: fullUrl,
                            proxiedUrl,
                            quality: s.quality || 'Auto',
                            format: isM3u8 ? 'hls' : 'mp4',
                            subtitles: res.data.subtitles || [],
                            intro: res.data.intro,
                            outro: res.data.outro,
                            headers: cdnHeaders
                        });
                    }
                }
            } catch {
                // proceed to next provider
            }
        }

        // 2. Try resolving Embed providers
        for (const embedSource of sources.embed) {
            try {
                const embedUrl = `${NESTZONE_BASE}/api/embed/${encodeURIComponent(embedSource.id)}?anilistId=${anilistId}&ep=${episode}&lang=${lang}&origin=${encodeURIComponent(NESTZONE_BASE)}`;
                const res = await axios.get(embedUrl, {
                    headers: {
                        'User-Agent': DEFAULT_UA,
                        'Referer': watchUrl
                    },
                    timeout: 6000,
                    validateStatus: (s) => s >= 200 && s < 500
                });

                if (res.status === 200 && res.data?.url) {
                    results.push({
                        provider: 'NestZone',
                        serverName: `${embedSource.name} (Embed)`,
                        url: res.data.url,
                        proxiedUrl: res.data.url,
                        quality: 'HD',
                        format: 'embed',
                        headers: {
                            'Referer': `${NESTZONE_BASE}/`,
                            'User-Agent': DEFAULT_UA
                        }
                    });
                }
            } catch {
                // proceed
            }
        }

        // 3. Fallback: Always provide the high-performance native NestZone Watch Frame
        if (!results.length) {
            results.push({
                provider: 'NestZone',
                serverName: 'NestZone Direct (Miku Player)',
                url: watchUrl,
                proxiedUrl: watchUrl,
                quality: 'Auto',
                format: 'embed',
                headers: {
                    'Referer': `${NESTZONE_BASE}/`,
                    'User-Agent': DEFAULT_UA
                }
            });
        }

        return results;
    }
}
