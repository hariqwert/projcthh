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
    audio: 'sub' | 'dub' = 'sub',
    seasonNum: number = 1
): Promise<MegaPlayBuzzStreamResult> {
    try {
        if (!title) return { success: false, error: 'Title required' };

        // Detect season from title if present (e.g. "Demon Slayer Season 2")
        let effectiveSeason = seasonNum;
        const sMatch = title.match(/season\s*(\d+)/i) || title.match(/s(\d+)/i);
        if (sMatch) {
            effectiveSeason = parseInt(sMatch[1], 10);
        }

        const cleanTitle = title
            .replace(/\s*\((?:anime|tv|series|\d{4})\)/gi, '')
            .replace(/\s*Season\s*\d+/i, '')
            .replace(/\s*2nd\s*Season/i, '')
            .replace(/\s*3rd\s*Season/i, '')
            .trim();

        const anikotoHeaders = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Referer': 'https://anikototv.bz/'
        };

        // 1. Search series on Anikoto TV (anikototv.bz)
        let searchHtml = '';
        for (const host of ['https://anikototv.bz', 'https://anikototv.to']) {
            try {
                const searchRes = await axios.get(`${host}/search?keyword=${encodeURIComponent(cleanTitle)}`, {
                    headers: anikotoHeaders,
                    timeout: 6000
                });
                if (searchRes.status === 200 && searchRes.data) {
                    searchHtml = searchRes.data;
                    break;
                }
            } catch (_) {}
        }

        if (!searchHtml) {
            return { success: false, error: `Could not search Anikoto catalog for "${cleanTitle}"` };
        }

        // Extract watch links from search results
        const matches = [...searchHtml.matchAll(/href=["']((?:https?:\/\/[^"']*anikoto[^"']*)?\/watch\/([^"'/]+)\/[^"']*)["']/g)];
        const candidates: Array<{ href: string; slug: string }> = [];
        const seenSlugs = new Set<string>();

        for (const m of matches) {
            const rawHref = m[1];
            const slug = m[2];
            if (!seenSlugs.has(slug)) {
                seenSlugs.add(slug);
                candidates.push({ href: rawHref, slug });
            }
        }

        if (candidates.length === 0) {
            return { success: false, error: `No series found on Anikoto for "${cleanTitle}"` };
        }

        // 2. Score candidates to choose the exact requested season/arc
        const normTitle = cleanTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        const scored = candidates.map(item => {
            let score = 0;
            const slug = item.slug.toLowerCase();

            if (slug.startsWith(normTitle)) score += 50;
            if (slug.includes(normTitle)) score += 20;

            if (effectiveSeason > 1) {
                if (slug.includes(`season-${effectiveSeason}`) ||
                    slug.includes(`${effectiveSeason}nd-season`) ||
                    slug.includes(`${effectiveSeason}rd-season`) ||
                    slug.includes(`${effectiveSeason}th-season`)) {
                    score += 200;
                }
                if (effectiveSeason === 2) {
                    if (slug.includes('entertainment-district') || slug.includes('arise-from-the-shadow') || slug.includes('yuukaku-hen')) {
                        score += 200;
                    }
                }
                if (effectiveSeason === 3) {
                    if (slug.includes('swordsmith-village') || slug.includes('katanakaji-no-sato-hen')) {
                        score += 200;
                    }
                }
                if (slug.includes('specials') || slug.includes('movie')) score -= 100;
            } else {
                // Season 1: heavily penalize specials, recap movies, and later seasons
                if (slug.includes('season-2') || slug.includes('2nd-season') || slug.includes('season-3') || slug.includes('3rd-season')) {
                    score -= 150;
                }
                if (slug.includes('specials') || slug.includes('movie') || slug.includes('sibling-s-bond') || slug.includes('reawakening') || slug.includes('hashira-meeting')) {
                    score -= 100;
                } else {
                    score += 100;
                }
            }
            return { item, score };
        });

        scored.sort((a, b) => b.score - a.score);
        const chosen = scored[0]?.item;
        if (!chosen) {
            return { success: false, error: `No matching series found for "${cleanTitle}"` };
        }

        // 3. Fetch watch page to extract mangaId
        const watchUrl = chosen.href.startsWith('http') ? chosen.href : `https://anikototv.bz${chosen.href}`;
        let targetSeriesId: number | null = null;
        try {
            const wRes = await axios.get(watchUrl, { headers: anikotoHeaders, timeout: 6000 });
            const idMatch = wRes.data.match(/const\s+mangaId\s*=\s*(\d+);/) || wRes.data.match(/data-id=["'](\d+)["']/);
            if (idMatch) {
                targetSeriesId = parseInt(idMatch[1], 10);
            }
        } catch (_) {}

        if (!targetSeriesId) {
            return { success: false, error: `Could not resolve series ID for "${chosen.slug}"` };
        }

        // 4. Fetch series episodes list from backend API
        const seriesRes = await axios.get(`https://anikotoapi.site/series/${targetSeriesId}`, {
            timeout: 7000
        });

        if (!seriesRes.data || !seriesRes.data.data || !Array.isArray(seriesRes.data.data.episodes)) {
            return { success: false, error: 'No episodes returned for series' };
        }

        const episodes = seriesRes.data.data.episodes;
        // Accurate episode lookup: match exact episode number or 1-based index
        const targetEp = episodes.find((ep: any) => Number(ep.number) === Number(episodeNum)) ||
                         (episodeNum <= episodes.length ? episodes[episodeNum - 1] : null);

        if (!targetEp || !targetEp.episode_embed_id) {
            return { success: false, error: `Episode ${episodeNum} not found in series "${seriesRes.data.data.anime?.title || chosen.slug}" (total episodes: ${episodes.length})` };
        }

        const embedId = targetEp.episode_embed_id;

        // 5. Fetch encrypted sources from MegaPlay with mandatory AJAX header
        const srcRes = await axios.get(`https://megaplay.buzz/stream/getSources?id=${embedId}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': `https://megaplay.buzz/stream/s-2/${embedId}/${audio}`,
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json, text/javascript, */*; q=0.01'
            },
            timeout: 8000
        });

        if (!srcRes.data || !srcRes.data.enc) {
            return { success: false, error: 'MegaPlay did not return encrypted payload' };
        }

        // 6. Decrypt AES-256 payload
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
