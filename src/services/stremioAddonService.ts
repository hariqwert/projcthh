import axios from 'axios';

export interface StremioManifest {
    id: string;
    name: string;
    version: string;
    description?: string;
    resources: Array<string | { name: string; types: string[]; idPrefixes?: string[] }>;
    types: string[];
    catalogs?: Array<{ type: string; id: string; name: string }>;
    idPrefixes?: string[];
    logo?: string;
    background?: string;
}

export interface StremioStreamRaw {
    name?: string;
    title?: string;
    description?: string;
    url?: string;
    externalUrl?: string;
    infoHash?: string;
    fileIdx?: number;
    behaviorHints?: {
        notWebReady?: boolean;
        bingeGroup?: string;
        proxyHeaders?: { request?: Record<string, string>; response?: Record<string, string> };
        headers?: Record<string, string>;
        videoSize?: number;
        filename?: string;
    };
}

export interface StremioNormalizedStream {
    addonId: string;
    addonName: string;
    name: string;
    title: string;
    url: string;
    proxiedUrl: string;
    quality: string;
    size?: string;
    infoHash?: string;
    headers?: Record<string, string>;
    isTorrent: boolean;
}

export class StremioAddonService {
    private static manifestCache = new Map<string, { at: number; data: StremioManifest }>();

    /**
     * Resolves the clean manifest URL (converting stremio:// to https://)
     */
    public static normalizeManifestUrl(rawUrl: string): string {
        let url = rawUrl.trim().replace(/^stremio:\/\//i, 'https://');
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = `https://${url}`;
        }
        if (!url.endsWith('/manifest.json')) {
            url = url.replace(/\/+$/, '') + '/manifest.json';
        }
        return url;
    }

    /**
     * Fetches and parses a Stremio Addon manifest.json
     */
    public static async getManifest(manifestUrl: string): Promise<StremioManifest | null> {
        const cleanUrl = this.normalizeManifestUrl(manifestUrl);
        const cached = this.manifestCache.get(cleanUrl);
        if (cached && Date.now() - cached.at < 3600 * 1000) {
            return cached.data;
        }

        try {
            const res = await axios.get(cleanUrl, { timeout: 8000 });
            if (res.data?.id && res.data?.resources) {
                const manifest = res.data as StremioManifest;
                this.manifestCache.set(cleanUrl, { at: Date.now(), data: manifest });
                return manifest;
            }
            return null;
        } catch {
            return null;
        }
    }

    /**
     * Queries streams from a single Stremio addon
     */
    public static async queryAddonStreams(params: {
        manifestUrl: string;
        mediaType: 'movie' | 'tv' | 'series';
        id: string; // IMDb ID (tt1234567) or tmdb:12345
        season?: number;
        episode?: number;
    }): Promise<StremioNormalizedStream[]> {
        const manifest = await this.getManifest(params.manifestUrl);
        if (!manifest) return [];

        const streamResource = manifest.resources.some(r => {
            const name = typeof r === 'string' ? r : r?.name;
            return /^streams?$/i.test(name || '');
        });
        if (!streamResource) return [];

        const reqType = (params.mediaType === 'tv' || params.mediaType === 'series') ? 'series' : 'movie';
        let queryId = params.id;
        if (reqType === 'series' && params.season && params.episode) {
            queryId = `${params.id}:${params.season}:${params.episode}`;
        }

        const baseUrl = this.normalizeManifestUrl(params.manifestUrl).replace(/\/manifest\.json$/i, '');
        const streamUrl = `${baseUrl}/stream/${reqType}/${encodeURIComponent(queryId)}.json`;

        try {
            const res = await axios.get(streamUrl, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Stremio/4.4.168'
                },
                timeout: 12000
            });

            const rawStreams: StremioStreamRaw[] = res.data?.streams || [];
            return rawStreams.map(s => this.normalizeStream(s, manifest)).filter((s): s is StremioNormalizedStream => Boolean(s));
        } catch {
            return [];
        }
    }

    /**
     * Normalizes a raw Stremio stream into our standard player structure
     */
    private static normalizeStream(raw: StremioStreamRaw, manifest: StremioManifest): StremioNormalizedStream | null {
        const targetUrl = raw.url || raw.externalUrl || '';
        const infoHash = raw.infoHash || '';

        if (!targetUrl && !infoHash) return null;

        const combinedText = [raw.name, raw.title, raw.description].filter(Boolean).join(' ');
        const qualityMatch = combinedText.match(/\b(2160p|4k|1080p|720p|480p|360p)\b/i);
        const quality = qualityMatch ? qualityMatch[1].toUpperCase() : 'Auto';

        const headers = {
            ...(raw.behaviorHints?.headers || {}),
            ...(raw.behaviorHints?.proxyHeaders?.request || {})
        };

        let proxiedUrl = targetUrl;
        if (targetUrl && (targetUrl.startsWith('http://') || targetUrl.startsWith('https://'))) {
            const headerParam = Object.keys(headers).length > 0 
                ? `&h=${encodeURIComponent(Buffer.from(JSON.stringify(headers)).toString('base64'))}` 
                : '';
            proxiedUrl = `/stream_proxy.php?url=${encodeURIComponent(targetUrl)}${headerParam}`;
        }

        return {
            addonId: manifest.id,
            addonName: manifest.name,
            name: raw.name || manifest.name,
            title: raw.title || raw.name || 'Stream',
            url: targetUrl || (infoHash ? `magnet:?xt=urn:btih:${infoHash}` : ''),
            proxiedUrl,
            quality,
            size: raw.behaviorHints?.videoSize ? `${Math.round(raw.behaviorHints.videoSize / (1024 * 1024))} MB` : undefined,
            infoHash: infoHash || undefined,
            headers: Object.keys(headers).length > 0 ? headers : undefined,
            isTorrent: Boolean(infoHash)
        };
    }

    /**
     * Recommended preloaded community Stremio addons
     */
    public static getFeaturedAddons() {
        return [
            {
                id: 'torrentio',
                name: 'Torrentio',
                manifestUrl: 'https://torrentio.strem.fun/manifest.json',
                description: 'Scrapes torrent streams from multiple providers with debrid support.'
            },
            {
                id: 'mediafusion',
                name: 'MediaFusion',
                manifestUrl: 'https://mediafusion.elfhosted.com/manifest.json',
                description: 'Multi-source Movies, TV Shows, and Live Sports streaming aggregator.'
            },
            {
                id: 'cyberflix',
                name: 'CyberFlix Catalog',
                manifestUrl: 'https://cyberflix.elfhosted.com/manifest.json',
                description: 'Curated Netflix, Prime Video, Disney+, and HBO Max catalogs.'
            },
            {
                id: 'cinemeta',
                name: 'Cinemeta',
                manifestUrl: 'https://v3-cinemeta.strem.io/manifest.json',
                description: 'Official Stremio movie and TV series metadata and catalogs.'
            }
        ];
    }
}
