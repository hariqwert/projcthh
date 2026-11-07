import axios from 'axios';
import https from 'https';
import { scrapeMovie, scrapeTvEpisode } from './bingrScraperService';

const agent = new https.Agent({
    rejectUnauthorized: false,
    keepAlive: true,
    timeout: 8000
});

export interface CineProSource {
    name: string;
    provider: string;
    url: string;
    quality?: string;
    type: 'hls' | 'mp4' | 'embed';
    headers?: Record<string, string>;
    subtitles?: Array<{ label: string; file: string; kind?: string }>;
}

export interface CineProStreamResult {
    status: 'success' | 'error';
    tmdbId: string | number;
    title?: string;
    mediaType: 'movie' | 'tv';
    season?: number;
    episode?: number;
    streamUrl?: string;
    sources: CineProSource[];
    embedUrl?: string;
    m3uPlayUrl?: string;
    message?: string;
}

// OMSS-compliant CinePro Core providers list (verified active mirrors)
export const CINEPRO_PROVIDERS = [
    { id: 'vidlink', name: 'VidLink Pro 4K', embedPattern: (type: string, id: string | number, s = 1, e = 1) => type === 'tv' ? `https://vidlink.pro/tv/${id}/${s}/${e}?autoplay=true` : `https://vidlink.pro/movie/${id}?autoplay=true` },
    { id: 'autoembed', name: 'AutoEmbed 1080P', embedPattern: (type: string, id: string | number, s = 1, e = 1) => type === 'tv' ? `https://autoembed.co/tv/tmdb/${id}-${s}-${e}` : `https://autoembed.co/movie/tmdb/${id}` },
    { id: 'vidsrc_pm', name: 'VidSrc VIP 1080P', embedPattern: (type: string, id: string | number, s = 1, e = 1) => type === 'tv' ? `https://vidsrc.pm/embed/tv/${id}/${s}/${e}` : `https://vidsrc.pm/embed/movie/${id}` },
    { id: 'smashy', name: 'SmashyStream Multi-Host', embedPattern: (type: string, id: string | number, s = 1, e = 1) => type === 'tv' ? `https://embed.smashystream.com/playere.php?tmdb=${id}&season=${s}&episode=${e}` : `https://embed.smashystream.com/playere.php?tmdb=${id}` },
    { id: 'vidly', name: 'Vidly Pro Multi-Audio', embedPattern: (type: string, id: string | number, s = 1, e = 1) => type === 'tv' ? `https://vidly.pro/embed/tv/${id}/${s}/${e}` : `https://vidly.pro/embed/movie/${id}` }
];

/**
 * Resolve OMSS direct streams & embeds for CinePro Core
 */
export async function getCineProStreams(
    tmdbId: string | number,
    type: 'movie' | 'tv' = 'movie',
    season = 1,
    episode = 1,
    providerId = 'vidlink'
): Promise<CineProStreamResult> {
    const prov = CINEPRO_PROVIDERS.find(p => p.id === providerId) || CINEPRO_PROVIDERS[0];
    const embedUrl = prov.embedPattern(type, tmdbId, season, episode);

    const sources: CineProSource[] = [];

    // 1. Resolve Direct HLS .m3u8 Streams across top resilient clusters
    let directHlsUrl: string | undefined = undefined;
    const candidateClusters = ['vidlink', 'prism', 's80', 's30', 'm4u', 's40'];
    for (const srv of candidateClusters) {
        try {
            const directRes: any = type === 'tv'
                ? await scrapeTvEpisode(tmdbId, season, episode, { srv })
                : await scrapeMovie(tmdbId, { srv });

            if (directRes?.sources && directRes.sources.length > 0) {
                const validSources = directRes.sources.filter((s: any) => s.url && (s.url.includes('.m3u8') || s.type === 'application/x-mpegurl'));
                if (validSources.length > 0) {
                    validSources.forEach((s: any) => {
                        if (!directHlsUrl) directHlsUrl = s.url;
                        sources.push({
                            name: `CinePro Direct ${s.label || s.name || 'HLS 1080p'}`,
                            provider: 'cinepro_direct_hls',
                            url: s.url,
                            quality: s.quality || '1080p',
                            type: 'hls'
                        });
                    });
                    break; // Successfully obtained direct streams
                }
            }
        } catch (_) {}
    }

    // 2. Include OMSS Provider Embed Fallbacks
    CINEPRO_PROVIDERS.forEach(p => {
        sources.push({
            name: `${p.name} Embed`,
            provider: p.id,
            url: p.embedPattern(type, tmdbId, season, episode),
            quality: '1080p',
            type: 'embed'
        });
    });

    const m3uPlayUrl = `/api/cinepro/play?id=${tmdbId}&type=${type}&s=${season}&e=${episode}`;

    return {
        status: 'success',
        tmdbId,
        mediaType: type,
        season: type === 'tv' ? season : undefined,
        episode: type === 'tv' ? episode : undefined,
        streamUrl: directHlsUrl,
        m3uPlayUrl,
        sources,
        embedUrl
    };
}
