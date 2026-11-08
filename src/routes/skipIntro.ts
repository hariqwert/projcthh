import { Router, Request, Response } from 'express';
import { SkipIntroService } from '../services/skipIntroService';

const router = Router();

/**
 * GET /api/skip-intro
 * Query params:
 *   - imdbId (e.g. tt0903747 or tt11737520)
 *   - season (number, default 1)
 *   - episode (number, default 1)
 *   - malId (optional MyAnimeList ID)
 *   - anilistId (optional AniList ID)
 *   - duration (optional video duration in seconds)
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const imdbId = (req.query.imdbId || req.query.imdb || '').toString().trim() || undefined;
        const season = parseInt((req.query.season || req.query.s || '1').toString(), 10) || 1;
        const episode = parseInt((req.query.episode || req.query.ep || req.query.e || '1').toString(), 10) || 1;
        const malId = (req.query.malId || req.query.mal || '').toString().trim() || undefined;
        const anilistId = (req.query.anilistId || req.query.al || '').toString().trim() || undefined;
        const durationSec = parseFloat((req.query.duration || req.query.dur || '0').toString()) || undefined;

        if (!imdbId && !malId && !anilistId) {
            return res.status(400).json({ error: 'At least one of imdbId, malId, or anilistId is required' });
        }

        const result = await SkipIntroService.getSkipSegments({
            imdbId,
            season,
            episode,
            malId,
            anilistId,
            durationSec
        });

        return res.json({
            success: true,
            ...result
        });
    } catch (err: any) {
        return res.status(500).json({ error: err?.message || 'Failed to fetch skip intro intervals' });
    }
});

export default router;
