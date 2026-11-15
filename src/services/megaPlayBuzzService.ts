import axios from 'axios';
import crypto from 'crypto';

function padKey(key: string, len: number): Buffer {
    const buf = Buffer.alloc(len, 0);
    const kBuf = Buffer.from(key, 'utf8');
    kBuf.copy(buf, 0, 0, Math.min(len, kBuf.length));
    return buf;
}

function b64UrlDecode(str: string): Buffer {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return Buffer.from(base64, 'base64');
}

export function decryptMegaPlayPayload(cipherTextB64: string): { file?: string } | null {
    try {
        const key = padKey("i?LMTAx0Q6,:}50U", 32);
        const iv = padKey("W0;27ToaUpl_P%'c", 16);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        decipher.setAutoPadding(true);
        const decrypted = Buffer.concat([decipher.update(b64UrlDecode(cipherTextB64)), decipher.final()]);
        return JSON.parse(decrypted.toString('utf8'));
    } catch (e) {
        return null;
    }
}

export interface MegaPlayBuzzStreamResult {
    success: boolean;
    masterM3u8?: string;
    sources?: Array<{
        url: string;
        quality?: string;
        type?: string;
        label?: string;
    }>;
    tracks?: Array<{
        file: string;
        label: string;
        kind: string;
        default?: boolean;
    }>;
    intro?: { start: number; end: number };
    outro?: { start: number; end: number };
    error?: string;
}

/**
 * Resolve direct MegaPlay Buzz HLS stream by Anime title and episode number
 */
export async function resolveMegaPlayBuzzStream(
    title: string,
    episodeNum: number = 1,
    audio: 'sub' | 'dub' = 'sub'
): Promise<MegaPlayBuzzStreamResult> {
    try {
        if (!title) return { success: false, error: 'Title required' };

        const cleanTitle = title
            .replace(/\s*\((?:anime|tv|series|\d{4})\)/gi, '')
            .replace(/\s*Season\s*\d+/i, '')
            .trim();

        // 1. Search series on Anikoto TV
        let targetSeriesId: number | null = null;
        const anikotoHeaders = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Referer': 'https://anikototv.to/'
        };

        try {
            const searchRes = await axios.get(`https://anikototv.to/search?keyword=${encodeURIComponent(cleanTitle)}`, {
                headers: anikotoHeaders,
                timeout: 8000
            });
            if (searchRes.data) {
                const watchMatches = [...searchRes.data.matchAll(/href=["'](https:\/\/anikototv\.to\/watch\/([^"'/]+)\/[^"']*)["']/g)];
                if (watchMatches.length > 0) {
                    let chosenUrl = watchMatches[0][1];
                    const seasonMatch = title.match(/season\s*(\d+)/i);
                    if (seasonMatch) {
                        const targetSeasonNum = seasonMatch[1];
                        const sMatch = watchMatches.find(m => new RegExp(`season-${targetSeasonNum}`, 'i').test(m[2]));
                        if (sMatch) chosenUrl = sMatch[1];
                    }

                    const watchRes = await axios.get(chosenUrl, { headers: anikotoHeaders, timeout: 8000 });
                    const idMatch = watchRes.data.match(/const\s+mangaId\s*=\s*(\d+);/) ||
                                    watchRes.data.match(/data-id=["'](\d+)["']/);
                    if (idMatch) {
                        targetSeriesId = parseInt(idMatch[1], 10);
                    }
                }
            }
        } catch (_) {}

        // Fallback to Anikoto recent-anime API
        if (!targetSeriesId) {
            const searchRes = await axios.get(`https://anikotoapi.site/recent-anime?page=1&per_page=50`, {
                timeout: 7000
            }).catch(() => null);

            if (searchRes && searchRes.data && searchRes.data.data) {
                const list = searchRes.data.data;
                const match = list.find((item: any) => {
                    const itemTitle = (item.title || '').toLowerCase();
                    const itemAlt = (item.alternative || '').toLowerCase();
                    const q = cleanTitle.toLowerCase();
                    return itemTitle.includes(q) || q.includes(itemTitle) || itemAlt.includes(q);
                });
                if (match) {
                    targetSeriesId = match.id;
                }
            }
        }

        // If not in recent, try search endpoint if available
        if (!targetSeriesId) {
            try {
                const queryRes = await axios.get(`https://anikotoapi.site/search?keyword=${encodeURIComponent(cleanTitle)}`, {
                    timeout: 7000
                }).catch(() => null);
                if (queryRes && queryRes.data && queryRes.data.data && queryRes.data.data.length > 0) {
                    targetSeriesId = queryRes.data.data[0].id;
                }
            } catch (_) {}
        }

        if (!targetSeriesId) {
            return { success: false, error: `Series "${cleanTitle}" not found in MegaPlay/Anikoto catalog` };
        }

        // 2. Fetch series episodes list
        const seriesRes = await axios.get(`https://anikotoapi.site/series/${targetSeriesId}`, {
            timeout: 7000
        });

        if (!seriesRes.data || !seriesRes.data.data || !seriesRes.data.data.episodes) {
            return { success: false, error: 'No episodes returned for series' };
        }

        const episodes = seriesRes.data.data.episodes;
        const targetEp = episodes.find((ep: any) => ep.number === episodeNum) || episodes[episodeNum - 1] || episodes[0];

        if (!targetEp || !targetEp.episode_embed_id) {
            return { success: false, error: `Episode ${episodeNum} embed ID not found` };
        }

        const embedId = targetEp.episode_embed_id;

        // 3. Fetch encrypted sources from MegaPlay
        const srcRes = await axios.get(`https://megaplay.buzz/stream/getSources?id=${embedId}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': `https://megaplay.buzz/stream/s-2/${embedId}/${audio}`
            },
            timeout: 8000
        });

        if (!srcRes.data || !srcRes.data.enc) {
            return { success: false, error: 'MegaPlay did not return encrypted payload' };
        }

        // 4. Decrypt AES-256 payload
        const decrypted = decryptMegaPlayPayload(srcRes.data.enc);
        if (!decrypted || !decrypted.file) {
            return { success: false, error: 'Failed to decrypt MegaPlay master manifest' };
        }

        return {
            success: true,
            masterM3u8: decrypted.file,
            sources: [
                {
                    url: decrypted.file,
                    quality: '1080p Multi-Bitrate',
                    type: 'application/x-mpegurl',
                    label: `MegaPlay Buzz Master HLS (${audio.toUpperCase()})`
                }
            ],
            tracks: srcRes.data.tracks || [],
            intro: srcRes.data.intro,
            outro: srcRes.data.outro
        };

    } catch (err: any) {
        return { success: false, error: err.message };
    }
}
