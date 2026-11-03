import { Router, Request, Response } from 'express';
import { getFullNasaHeroTelemetry, getApodUpdates, getAsteroidsToday, getDeepSpaceImagery } from '../services/nasaService';

const router = Router();

/**
 * GET /api/nasa/telemetry - Full NASA Space Telemetry for Hero Stage
 */
router.get(['/telemetry', '/updates'], async (req: Request, res: Response) => {
    try {
        const data = await getFullNasaHeroTelemetry();
        res.json(data);
    } catch (e: any) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});

/**
 * GET /api/nasa/apod - Astronomy Picture of the Day
 */
router.get('/apod', async (req: Request, res: Response) => {
    try {
        const data = await getApodUpdates();
        res.json({ status: 'success', ...data });
    } catch (e: any) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});

/**
 * GET /api/nasa/asteroids - Near Earth Objects Passing Earth Today
 */
router.get('/asteroids', async (req: Request, res: Response) => {
    try {
        const data = await getAsteroidsToday();
        res.json({ status: 'success', ...data });
    } catch (e: any) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});

/**
 * GET /api/nasa/deep-space - James Webb & Deep Space Imagery
 */
router.get('/deep-space', async (req: Request, res: Response) => {
    try {
        const q = (req.query.q as string) || 'james webb space telescope';
        const items = await getDeepSpaceImagery(q);
        res.json({ status: 'success', count: items.length, items });
    } catch (e: any) {
        res.status(500).json({ status: 'error', message: e.message });
    }
});

export default router;
