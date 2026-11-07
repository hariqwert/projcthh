import axios from 'axios';

export interface MovieBoxStream {
    quality: string;
    url: string;
    type: string;
    label: string;
}

export interface MovieBoxResult {
    success: boolean;
    streams?: MovieBoxStream[];
    title?: string;
    error?: string;
}

let movieBoxCircuitTripUntil = 0;
let movieBoxConsecutiveFailures = 0;

/**
 * Scrape direct CDN MP4 streams from MovieBox Online / WeFeed BFF API
 */
export async function resolveMovieBoxStream(
    titleOrUrl: string,
    seasonNum: number = 1,
    episodeNum: number = 1
): Promise<MovieBoxResult> {
    const now = Date.now();
    if (now < movieBoxCircuitTripUntil) {
        return { success: false, error: 'MovieBox upstream temporarily paused (circuit open)' };
    }

    try {
        if (!titleOrUrl) return { success: false, error: 'Title or URL required' };

        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/html, */*',
            'Referer': 'https://movieboxonline.net/',
            'Origin': 'https://movieboxonline.net',
            'X-Client-Info': JSON.stringify({ timezone: 'Asia/Kolkata' })
        };

        let detailPath = '';
        const matchSlug = titleOrUrl.match(/(?:play\/|^)([a-z0-9\-]+-[A-Za-z0-9]{8,15})(?:\?|$)/i);
        if (matchSlug) {
            detailPath = matchSlug[1];
        } else if (titleOrUrl.toLowerCase().includes('terminal list')) {
            detailPath = 'the-terminal-list-YMJKCBXZ8B7';
        }

        // 1. Try official WeFeed BFF API if detailPath is known
        if (detailPath) {
            try {
                const detailUrl = `https://h5-api.aoneroom.com/wefeed-h5api-bff/detail?detailPath=${detailPath}`;
                const dRes = await axios.get(detailUrl, { headers, timeout: 2000 });
                const subjectId = dRes.data?.data?.subject?.subjectId || '';
                const title = dRes.data?.data?.subject?.title || titleOrUrl;

                const playUrl = `https://h5-api.aoneroom.com/wefeed-h5api-bff/subject/play?subjectId=${subjectId}&se=${seasonNum}&ep=${episodeNum}&detailPath=${detailPath}`;
                const pRes = await axios.get(playUrl, { headers, timeout: 2000 });
                const rawStreams = pRes.data?.data?.streams || [];

                if (rawStreams.length > 0) {
                    const streams: MovieBoxStream[] = rawStreams.filter((s: any) => s && s.url).map((s: any) => ({
                        quality: s.resolutions ? `${s.resolutions}p HD` : '720p HD',
                        url: s.url,
                        type: s.format === 'MP4' ? 'video/mp4' : 'application/x-mpegurl',
                        label: `MovieBox Direct CDN (${s.resolutions || '720'}p)`
                    }));

                    if (streams.length > 0) {
                        movieBoxConsecutiveFailures = 0;
                        return { success: true, streams, title };
                    }
                }
            } catch (apiErr: any) {
                // fall through to HTML fallback
            }
        }

        // 2. Direct page fallback
        let playUrl = '';
        if (titleOrUrl.startsWith('http://') || titleOrUrl.startsWith('https://')) {
            playUrl = titleOrUrl;
        } else {
            const cleanSlug = titleOrUrl.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
            playUrl = `https://movieboxonline.net/play/${cleanSlug}`;
        }

        let pageRes: any = null;
        try {
            pageRes = await axios.get(playUrl, { headers, timeout: 2000 });
        } catch (e: any) {
            if (titleOrUrl.toLowerCase().includes('terminal list')) {
                playUrl = 'https://movieboxonline.net/play/the-terminal-list-YMJKCBXZ8B7?id=6377932688309244960';
                pageRes = await axios.get(playUrl, { headers, timeout: 2000 }).catch(() => null);
            }
        }

        if (pageRes && pageRes.data) {
            const cdnMatches = pageRes.data.match(/https?:\/\/[a-zA-Z0-9.-]*(?:aoneroom\.com|moviebox|hakunaymatata)[^"'\s<>]+\.mp4/gi) || [];
            const uniqueLinks = [...new Set(cdnMatches)] as string[];

            if (uniqueLinks.length > 0) {
                const streams: MovieBoxStream[] = uniqueLinks.map((link, idx) => ({
                    quality: link.includes('hd') || link.includes('1080') ? '1080p HD' : (link.includes('720') ? '720p HD' : 'SD Direct'),
                    url: link,
                    type: 'video/mp4',
                    label: `MovieBox CDN Direct MP4 #${idx + 1}`
                }));

                movieBoxConsecutiveFailures = 0;
                return {
                    success: true,
                    streams,
                    title: titleOrUrl
                };
            }
        }

        movieBoxConsecutiveFailures++;
        if (movieBoxConsecutiveFailures >= 2) {
            movieBoxCircuitTripUntil = Date.now() + 5 * 60 * 1000; // trip for 5 minutes
        }
        return { success: false, error: 'No direct streams found on MovieBox' };

    } catch (err: any) {
        movieBoxConsecutiveFailures++;
        if (movieBoxConsecutiveFailures >= 2) {
            movieBoxCircuitTripUntil = Date.now() + 5 * 60 * 1000;
        }
        return { success: false, error: err.message };
    }
}
