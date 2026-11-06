import axios from 'axios';

export interface SubtitleTrack {
    id: string;
    language: string;
    label: string;
    format: string;
    url: string;
    downloadUrl: string;
    isDefault?: boolean;
}

export class SubtitleService {
    /**
     * Search subtitles by TMDB ID or Movie/TV Show Title
     */
    static async searchSubtitles(tmdbId?: string | number, title?: string, lang: string = 'en'): Promise<SubtitleTrack[]> {
        const results: SubtitleTrack[] = [];
        const port = process.env.PORT || 3000;

        // 1. Query the unified local aggregator (Stremio OpenSubtitles v3 + YTS + OpenSubtitles)
        try {
            const apiUrl = `http://127.0.0.1:${port}/api/subtitles/fetch?tmdb=${tmdbId || ''}&title=${encodeURIComponent(title || '')}&lang=${lang}`;
            const res = await axios.get(apiUrl, { timeout: 6000 });
            if (res.data?.subtitles && Array.isArray(res.data.subtitles)) {
                res.data.subtitles.forEach((s: any, idx: number) => {
                    const l = (s.langCode || s.language || 'en').toLowerCase().substring(0, 2);
                    results.push({
                        id: s.id || `sub-${idx}`,
                        language: l,
                        label: s.display || s.language || 'English',
                        format: s.format?.toLowerCase() || 'srt',
                        url: s.url || s.rawUrl,
                        downloadUrl: s.url || s.rawUrl,
                        isDefault: idx === 0 || l === 'en' || l === lang.toLowerCase()
                    });
                });
            }
        } catch (_) {}

        // 2. Direct external fallback if local server query is unavailable
        if (results.length === 0 && (tmdbId || title)) {
            try {
                const idPath = tmdbId ? `movie/${String(tmdbId).startsWith('tt') ? tmdbId : `tt${tmdbId}`}` : '';
                if (idPath) {
                    const stremioUrl = `https://opensubtitles-v3.strem.io/subtitles/${idPath}.json`;
                    const sRes = await axios.get(stremioUrl, { timeout: 4000, validateStatus: () => true });
                    if (sRes.status === 200 && Array.isArray(sRes.data?.subtitles)) {
                        sRes.data.subtitles.slice(0, 30).forEach((s: any, idx: number) => {
                            const l = (s.lang || 'eng').substring(0, 2).toLowerCase();
                            const rel = (s.movieReleaseName || s.subtitleFileName || '')
                                .replace(/\[[^\]]*\]/g, '')
                                .replace(/[\._]/g, ' ')
                                .trim();
                            results.push({
                                id: `strem-${s.id || idx}`,
                                language: l,
                                label: rel ? `${l.toUpperCase()} (${rel.substring(0, 30)})` : l.toUpperCase(),
                                format: 'srt',
                                url: `/api/subtitles/vtt?url=${encodeURIComponent(s.url)}`,
                                downloadUrl: s.url,
                                isDefault: idx === 0 || l === 'en' || l === lang.toLowerCase()
                            });
                        });
                    }
                }
            } catch (_) {}
        }

        return results;
    }
}
