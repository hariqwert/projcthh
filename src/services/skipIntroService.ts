import axios from 'axios';

export interface SkipSegment {
    startMs: number;
    endMs: number;
    startSec: number;
    endSec: number;
    type: 'intro' | 'recap' | 'outro' | 'op' | 'ed' | 'mixed-op' | 'mixed-ed';
    provider: 'introdb' | 'aniskip';
    label: string;
}

export interface SkipIntroResponse {
    found: boolean;
    imdbId?: string;
    malId?: string;
    season?: number;
    episode?: number;
    segments: SkipSegment[];
    upNextSec?: number;
}

const segmentCache = new Map<string, { at: number; data: SkipSegment[] }>();
const malIdCache = new Map<string, string | null>();

export class SkipIntroService {
    /**
     * Parse IntroDB API response payload
     */
    private static parseIntroDb(body: any): SkipSegment[] {
        if (!body || typeof body !== 'object') return [];
        const out: SkipSegment[] = [];

        for (const type of ['recap', 'intro', 'outro'] as const) {
            const seg = body[type];
            if (!seg) continue;

            const startMs = Number(seg.start_ms ?? 0) > 0 ? Number(seg.start_ms) : Math.round(Number(seg.start_sec ?? 0) * 1000);
            const endMs = Number(seg.end_ms ?? 0) > 0 ? Number(seg.end_ms) : Math.round(Number(seg.end_sec ?? 0) * 1000);

            if (Number.isFinite(startMs) && Number.isFinite(endMs) && endMs > startMs && startMs >= 0) {
                out.push({
                    startMs,
                    endMs,
                    startSec: Number((startMs / 1000).toFixed(2)),
                    endSec: Number((endMs / 1000).toFixed(2)),
                    type,
                    provider: 'introdb',
                    label: type === 'outro' ? 'Skip Credits' : type === 'recap' ? 'Skip Recap' : 'Skip Intro'
                });
            }
        }

        return out.sort((a, b) => a.startMs - b.startMs);
    }

    /**
     * Parse AniSkip API response payload
     */
    private static parseAniSkip(body: any): SkipSegment[] {
        if (!body?.found || !Array.isArray(body?.results)) return [];
        const out: SkipSegment[] = [];

        for (const res of body.results) {
            const interval = res.interval;
            if (!interval) continue;

            const startMs = Math.round(Number(interval.startTime ?? 0) * 1000);
            const endMs = Math.round(Number(interval.endTime ?? 0) * 1000);
            const rawType = (res.skipType || 'op').toLowerCase();

            if (Number.isFinite(startMs) && Number.isFinite(endMs) && endMs > startMs && startMs >= 0) {
                const isCredits = /^(outro|ed|mixed-ed)$/i.test(rawType);
                const isRecap = /recap/i.test(rawType);
                out.push({
                    startMs,
                    endMs,
                    startSec: Number((startMs / 1000).toFixed(2)),
                    endSec: Number((endMs / 1000).toFixed(2)),
                    type: rawType as any,
                    provider: 'aniskip',
                    label: isCredits ? 'Skip Credits' : isRecap ? 'Skip Recap' : 'Skip Intro'
                });
            }
        }

        return out.sort((a, b) => a.startMs - b.startMs);
    }

    /**
     * Resolves MyAnimeList ID from IMDb ID using the ARM database
     */
    public static async resolveMalFromImdb(imdbId: string): Promise<string | null> {
        if (malIdCache.has(imdbId)) return malIdCache.get(imdbId) ?? null;

        try {
            const res = await axios.get(`https://arm.haglund.dev/api/v2/imdb?id=${encodeURIComponent(imdbId)}&include=myanimelist`, { timeout: 6000 });
            if (Array.isArray(res.data) && res.data[0]?.myanimelist) {
                const mal = String(res.data[0].myanimelist);
                malIdCache.set(imdbId, mal);
                return mal;
            }
        } catch {
            // fallback
        }

        malIdCache.set(imdbId, null);
        return null;
    }

    /**
     * Resolves MyAnimeList ID from AniList ID
     */
    public static async resolveMalFromAniList(anilistId: string | number): Promise<string | null> {
        const key = `al:${anilistId}`;
        if (malIdCache.has(key)) return malIdCache.get(key) ?? null;

        try {
            const res = await axios.get(`https://arm.haglund.dev/api/v2/anilist?id=${encodeURIComponent(anilistId)}&include=myanimelist`, { timeout: 6000 });
            if (Array.isArray(res.data) && res.data[0]?.myanimelist) {
                const mal = String(res.data[0].myanimelist);
                malIdCache.set(key, mal);
                return mal;
            }
        } catch {
            // fallback
        }

        malIdCache.set(key, null);
        return null;
    }

    /**
     * Primary lookup: Fetches skip segments for any TV episode or anime
     */
    public static async getSkipSegments(params: {
        imdbId?: string;
        season?: number;
        episode?: number;
        malId?: string;
        anilistId?: string | number;
        durationSec?: number;
    }): Promise<SkipIntroResponse> {
        const { imdbId, season = 1, episode = 1, durationSec } = params;
        let malId = params.malId;

        const cacheKey = `${imdbId || ''}:${season}:${episode}:${malId || ''}:${params.anilistId || ''}`;
        const cached = segmentCache.get(cacheKey);
        if (cached && Date.now() - cached.at < 24 * 3600 * 1000) {
            return {
                found: cached.data.length > 0,
                imdbId,
                malId,
                season,
                episode,
                segments: cached.data,
                upNextSec: durationSec ? this.calculateUpNextTime(durationSec, cached.data) : undefined
            };
        }

        let segments: SkipSegment[] = [];

        // 1. Try IntroDB for mainstream TV series
        if (imdbId && /^tt\d+$/.test(imdbId)) {
            try {
                const introRes = await axios.get(
                    `https://api.introdb.app/segments?imdb_id=${encodeURIComponent(imdbId)}&season=${season}&episode=${episode}`,
                    { timeout: 7000 }
                );
                segments = this.parseIntroDb(introRes.data);
            } catch {
                // fall through
            }
        }

        // 2. If no segments and this could be anime, resolve MAL ID and check AniSkip
        if (!segments.length) {
            if (!malId && imdbId) {
                malId = (await this.resolveMalFromImdb(imdbId)) ?? undefined;
            }
            if (!malId && params.anilistId) {
                malId = (await this.resolveMalFromAniList(params.anilistId)) ?? undefined;
            }

            if (malId) {
                try {
                    const types = ['op', 'ed', 'recap', 'mixed-op', 'mixed-ed'].map(t => `types=${t}`).join('&');
                    const aniRes = await axios.get(
                        `https://api.aniskip.com/v2/skip-times/${encodeURIComponent(malId)}/${episode}?${types}&episodeLength=0`,
                        { timeout: 7000 }
                    );
                    segments = this.parseAniSkip(aniRes.data);
                } catch {
                    // fall through
                }
            }
        }

        // Cache result
        segmentCache.set(cacheKey, { at: Date.now(), data: segments });
        if (segmentCache.size > 2000) {
            const first = segmentCache.keys().next().value;
            if (first) segmentCache.delete(first);
        }

        return {
            found: segments.length > 0,
            imdbId,
            malId,
            season,
            episode,
            segments,
            upNextSec: durationSec ? this.calculateUpNextTime(durationSec, segments) : undefined
        };
    }

    /**
     * Calculates the exact second when the "Up Next" auto-play next episode card should show
     */
    public static calculateUpNextTime(durationSec: number, segments: SkipSegment[] = []): number {
        if (!Number.isFinite(durationSec) || durationSec <= 0) return Infinity;

        // At credits start if outro segment is detected in the second half of video
        const credits = segments.find(s => 
            /^(outro|ed|mixed-ed)$/i.test(s.type) && 
            s.startSec > durationSec * 0.5 && 
            s.startSec < durationSec - 5
        );

        if (credits) return credits.startSec;

        // 40 seconds before the end for full-length episodes (>= 10 min), or 95%
        return durationSec >= 600 ? durationSec - 40 : Number((durationSec * 0.95).toFixed(2));
    }
}
