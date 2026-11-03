import axios from 'axios';
import { resolveMalIdFromTitle, resolveZokoStream } from './animeScraperService';

export interface AnimePaheStream {
    quality: string;
    url: string;
    proxyUrl?: string;
    type: string;
    label: string;
}

export interface AnimePaheResult {
    success: boolean;
    streams?: AnimePaheStream[];
    subtitles?: Array<{ lang: string; url: string; label: string }>;
    error?: string;
}

/**
 * Extract direct Google Video MP4 streams or high-speed HLS from AnimePahe
 */
export async function resolveAnimePaheStream(
    titleOrUrl: string,
    episodeNum: number = 1
): Promise<AnimePaheResult> {
    try {
        let episodeUrl = '';
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        };

        const cleanTitle = titleOrUrl
            .replace(/\s*\((?:anime|tv|series|\d{4})\)/gi, '')
            .replace(/\s*Season\s*\d+/i, '')
            .trim();

        // 1. Search series on AnimePahe
        if (!titleOrUrl.startsWith('http://') && !titleOrUrl.startsWith('https://')) {
            try {
                const searchRes = await axios.get(`https://animepahe.ng/?s=${encodeURIComponent(cleanTitle)}`, { headers, timeout: 8000 }).catch(() => null);
                if (searchRes && searchRes.data) {
                    const seriesLinks = [...searchRes.data.matchAll(/href=["'](https:\/\/animepahe\.ng\/series\/[^"']+)["']/g)].map(m => m[1]);
                    if (seriesLinks.length > 0) {
                        let chosenSeries = seriesLinks[0];
                        const seasonMatch = titleOrUrl.match(/season\s*(\d+)/i);
                        if (seasonMatch) {
                            const sNum = seasonMatch[1];
                            const sMatch = seriesLinks.find(l => new RegExp(`season-${sNum}`, 'i').test(l));
                            if (sMatch) chosenSeries = sMatch;
                        }

                        const seriesPage = await axios.get(chosenSeries, { headers, timeout: 8000 }).catch(() => null);
                        if (seriesPage && seriesPage.data) {
                            const epMatch = seriesPage.data.match(new RegExp(`href=["'](https:\\/\\/animepahe\\.ng\\/[^"']*-episode-${episodeNum}[^"']*)["']`, 'i'));
                            if (epMatch) {
                                episodeUrl = epMatch[1];
                            }
                        }
                    }
                }
            } catch (_) {}

            // Fallback to direct slug
            if (!episodeUrl) {
                const clean = titleOrUrl
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .trim()
                    .replace(/\s+/g, '-');
                episodeUrl = `https://animepahe.ng/${clean}-episode-${episodeNum}-english-subbed/`;
            }
        } else {
            episodeUrl = titleOrUrl;
        }

        // 2. Fetch AnimePahe episode page
        let pageRes: any = null;
        try {
            pageRes = await axios.get(episodeUrl, { headers, timeout: 8000 });
        } catch (_) {}

        // 3. Extract Blogger video URL from iframe or base64 mirror options
        let bloggerUrl: string | null = null;
        if (pageRes && pageRes.data) {
            const iframeMatch = pageRes.data.match(/<iframe[^>]+src=["'](https:\/\/www\.blogger\.com\/video\.g\?token=[^"']+)["']/i) ||
                                pageRes.data.match(/https:\/\/www\.blogger\.com\/video\.g\?token=[a-zA-Z0-9_-]+/i);

            if (iframeMatch) {
                bloggerUrl = iframeMatch[1] || iframeMatch[0];
            }

            if (!bloggerUrl) {
                const mirrorMatches = [...pageRes.data.matchAll(/<option[^>]+value=["']([A-Za-z0-9+/=]{40,})["']/g)];
                for (const mm of mirrorMatches) {
                    try {
                        const decoded = Buffer.from(mm[1], 'base64').toString('utf8');
                        const m = decoded.match(/src=["'](https:\/\/www\.blogger\.com\/video\.g\?token=[^"']+)["']/i);
                        if (m) {
                            bloggerUrl = m[1];
                            break;
                        }
                    } catch (_) {}
                }
            }
        }

        // 4. If Blogger token found, resolve Google Video CDN stream
        if (bloggerUrl) {
            const bloggerRes = await axios.get(bloggerUrl, {
                headers: {
                    'User-Agent': headers['User-Agent'],
                    'Referer': episodeUrl
                },
                timeout: 8000
            });

            const decoded = bloggerRes.data
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/\\u0026/g, '&')
                .replace(/\\u003d/g, '=')
                .replace(/\\"/g, '"');

            const rawLinks = decoded.match(/https:\/\/[a-z0-9-]+\.googlevideo\.com\/videoplayback\?[^"\s']+/g) || [];
            if (rawLinks.length > 0) {
                const streams: AnimePaheStream[] = [];
                const seen = new Set<string>();

                rawLinks.forEach((link: string) => {
                    let quality = '360p SD';
                    let label = 'AnimePahe Google CDN (360p SD)';
                    if (link.includes('itag=22')) {
                        quality = '720p HD';
                        label = 'AnimePahe Google CDN (720p HD)';
                    } else if (link.includes('itag=18')) {
                        quality = '360p SD';
                        label = 'AnimePahe Google CDN (360p SD)';
                    } else {
                        return;
                    }

                    if (!seen.has(quality)) {
                        seen.add(quality);
                        const proxyUrl = `/stream_proxy.php?url=${encodeURIComponent(link)}`;
                        streams.push({
                            quality,
                            url: link,
                            proxyUrl,
                            type: 'video/mp4',
                            label
                        });
                    }
                });

                streams.sort((a, b) => (b.quality.includes('720') ? 1 : 0) - (a.quality.includes('720') ? 1 : 0));
                if (streams.length > 0) {
                    return {
                        success: true,
                        streams
                    };
                }
            }
        }

        // 5. Fallback to High-Speed Anime Master HLS
        const malId = await resolveMalIdFromTitle(cleanTitle);
        if (malId) {
            const zokoRes = await resolveZokoStream(malId, episodeNum, 'sub');
            if (zokoRes && zokoRes.success && zokoRes.masterM3u8) {
                return {
                    success: true,
                    streams: [
                        {
                            quality: '1080p Multi-Bitrate',
                            url: zokoRes.masterM3u8,
                            proxyUrl: zokoRes.masterM3u8,
                            type: 'application/x-mpegurl',
                            label: 'AnimePahe Master HLS (High-Speed)'
                        }
                    ],
                    subtitles: zokoRes.subtitles?.map(s => ({ lang: s.lang, url: s.src, label: s.label }))
                };
            }
        }

        return { success: false, error: 'Could not resolve stream for AnimePahe' };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}
