import { Router, Request, Response } from 'express';
import { StremioAddonService } from '../services/stremioAddonService';

const router = Router();

/**
 * GET /api/stremio/addons
 * Returns preloaded community Stremio addons
 */
router.get('/addons', (_req: Request, res: Response) => {
    return res.json({
        success: true,
        addons: StremioAddonService.getFeaturedAddons()
    });
});

/**
 * GET /api/stremio/manifest?url=...
 * Inspects a custom Stremio addon manifest
 */
router.get('/manifest', async (req: Request, res: Response) => {
    const manifestUrl = (req.query.url || '').toString().trim();
    if (!manifestUrl) {
        return res.status(400).json({ error: 'Query parameter url is required' });
    }

    try {
        const manifest = await StremioAddonService.getManifest(manifestUrl);
        if (!manifest) {
            return res.status(404).json({ error: 'Could not fetch Stremio addon manifest' });
        }
        return res.json({ success: true, manifest });
    } catch (err: any) {
        return res.status(500).json({ error: err?.message });
    }
});

/**
 * GET /api/stremio/catalog
 * Query params:
 *   - addon: manifest URL
 *   - type: 'events' | 'sports' | 'movie' | 'series'
 *   - id: catalog ID (optional)
 */
router.get('/catalog', async (req: Request, res: Response) => {
    const manifestUrl = (req.query.addon || 'https://mediafusion.elfhosted.com/manifest.json').toString().trim();
    const type = (req.query.type || 'events').toString().trim();
    const id = (req.query.id || '').toString().trim() || undefined;

    try {
        const events = await StremioAddonService.queryCatalog({
            manifestUrl,
            type,
            id
        });
        return res.json({
            success: true,
            count: events.length,
            events
        });
    } catch (err: any) {
        return res.status(500).json({ error: err?.message });
    }
});

/**
 * GET /api/stremio/streams
 * Query params:
 *   - addon: manifest URL (default Torrentio)
 *   - type: 'movie' | 'series' | 'tv'
 *   - id: IMDb ID (e.g. tt1234567) or tmdb:12345
 *   - season: number (optional)
 *   - episode: number (optional)
 */
router.get('/streams', async (req: Request, res: Response) => {
    const manifestUrl = (req.query.addon || 'https://torrentio.strem.fun/manifest.json').toString().trim();
    const rawType = (req.query.type || 'movie').toString().toLowerCase();
    const mediaType = (rawType === 'events' || rawType === 'sports') 
        ? (rawType as 'events' | 'sports') 
        : (rawType === 'series' || rawType === 'tv') ? 'series' : 'movie';
    const id = (req.query.id || req.query.imdb || '').toString().trim();
    const season = parseInt((req.query.season || req.query.s || '1').toString(), 10) || 1;
    const episode = parseInt((req.query.episode || req.query.ep || '1').toString(), 10) || 1;

    if (!id) {
        return res.status(400).json({ error: 'Query parameter id (IMDb or TMDB) is required' });
    }

    try {
        const streams = await StremioAddonService.queryAddonStreams({
            manifestUrl,
            mediaType,
            id,
            season,
            episode
        });

        return res.json({
            success: true,
            count: streams.length,
            streams
        });
    } catch (err: any) {
        return res.status(500).json({ error: err?.message || 'Failed to fetch Stremio streams' });
    }
});

export default router;
