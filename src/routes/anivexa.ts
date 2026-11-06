import { Router, Request, Response } from 'express';
import {
    fetchAnivexaMedia,
    fetchAnivexaMappings,
    fetchAnivexaEpisodes,
    fetchAnivexaWatch,
    fetchAnivexaBestStream,
    generateAnivexaM3u,
    handleAnivexaProxy
} from '../services/anivexaService';

const router = Router();

// --- 1. AniList Anime Info & Metadata ---
router.get('/info/:anilistId', async (req: Request, res: Response) => {
    const rawId = Array.isArray(req.params.anilistId) ? req.params.anilistId[0] : req.params.anilistId;
    const anilistId = parseInt(rawId, 10);
    if (isNaN(anilistId)) {
        return res.status(400).json({ error: 'Valid AniList ID is required' });
    }
    try {
        const media = await fetchAnivexaMedia(anilistId);
        return res.json({ success: true, media });
    } catch (err: any) {
        return res.status(500).json({ error: err?.message });
    }
});

// --- 2. External ID Mappings (MAL, Kitsu, AniDB, Simkl, TVDB, TMDB, AniSkip) ---
router.get('/map/:anilistId', async (req: Request, res: Response) => {
    const rawId = Array.isArray(req.params.anilistId) ? req.params.anilistId[0] : req.params.anilistId;
    const anilistId = parseInt(rawId, 10);
    if (isNaN(anilistId)) {
        return res.status(400).json({ error: 'Valid AniList ID is required' });
    }
    try {
        const mappings = await fetchAnivexaMappings(anilistId);
        return res.json(mappings);
    } catch (err: any) {
        return res.status(500).json({ error: err?.message });
    }
});

// --- 3. Anime Episode Catalog with Sub & Dub ---
router.get(['/episodes/:anilistId', '/episodes/:provider/:anilistId'], async (req: Request, res: Response) => {
    const rawId = Array.isArray(req.params.anilistId) ? req.params.anilistId[0] : req.params.anilistId;
    const anilistId = parseInt(rawId, 10);
    const rawProv = req.params.provider ? (Array.isArray(req.params.provider) ? req.params.provider[0] : req.params.provider) : undefined;
    const provider = rawProv || (req.query.provider as string) || 'reanime';

    if (isNaN(anilistId)) {
        return res.status(400).json({ error: 'Valid AniList ID is required' });
    }
    try {
        const result = await fetchAnivexaEpisodes(anilistId, provider);
        return res.json(result);
    } catch (err: any) {
        return res.status(500).json({ error: err?.message });
    }
});

// --- 4. Resolve Stream for Specific Provider ---
router.get('/watch/:provider/:anilistId/:audio/:episode', async (req: Request, res: Response) => {
    const rawProv = Array.isArray(req.params.provider) ? req.params.provider[0] : req.params.provider;
    const rawId = Array.isArray(req.params.anilistId) ? req.params.anilistId[0] : req.params.anilistId;
    const rawAudio = Array.isArray(req.params.audio) ? req.params.audio[0] : req.params.audio;
    const rawEp = Array.isArray(req.params.episode) ? req.params.episode[0] : req.params.episode;

    const provider = String(rawProv);
    const anilistId = parseInt(rawId, 10);
    const audio = (String(rawAudio).toLowerCase() === 'dub' ? 'dub' : 'sub') as 'sub' | 'dub';
    const episode = parseInt(rawEp, 10);

    if (isNaN(anilistId) || isNaN(episode)) {
        return res.status(400).json({ error: 'Valid anilistId and episode are required' });
    }
    try {
        const watchResult = await fetchAnivexaWatch(provider, anilistId, audio, episode);
        return res.json(watchResult);
    } catch (err: any) {
        return res.status(500).json({ error: err?.message });
    }
});

// --- 5. Auto Resolve Best Stream across all Providers (Kitsune / Anivexa Engine) ---
router.get('/resolve/:anilistId/:episode', async (req: Request, res: Response) => {
    const rawId = Array.isArray(req.params.anilistId) ? req.params.anilistId[0] : req.params.anilistId;
    const rawEp = Array.isArray(req.params.episode) ? req.params.episode[0] : req.params.episode;

    const anilistId = parseInt(rawId, 10);
    const episode = parseInt(rawEp, 10);
    const audio = ((req.query.audio as string)?.toLowerCase() === 'dub' ? 'dub' : 'sub') as 'sub' | 'dub';

    if (isNaN(anilistId) || isNaN(episode)) {
        return res.status(400).json({ error: 'Valid anilistId and episode are required' });
    }
    try {
        const best = await fetchAnivexaBestStream(anilistId, episode, audio);
        return res.json(best);
    } catch (err: any) {
        return res.status(500).json({ error: err?.message });
    }
});

// --- 6. Direct Stream Playback (HTTP 302 redirect to proxied m3u8 for pure stream playlists) ---
router.get(['/stream/:provider/:anilistId/:audio/:episode', '/play/:anilistId/:episode'], async (req: Request, res: Response) => {
    const rawProv = req.params.provider ? (Array.isArray(req.params.provider) ? req.params.provider[0] : req.params.provider) : undefined;
    const provider = rawProv || (req.query.provider as string) || 'reanime';

    const rawId = Array.isArray(req.params.anilistId) ? req.params.anilistId[0] : req.params.anilistId;
    const rawEp = Array.isArray(req.params.episode) ? req.params.episode[0] : req.params.episode;
    const rawAudio = req.params.audio ? (Array.isArray(req.params.audio) ? req.params.audio[0] : req.params.audio) : undefined;

    const anilistId = parseInt(rawId, 10);
    const episode = parseInt(rawEp, 10);
    const audio = (rawAudio ? (String(rawAudio).toLowerCase() === 'dub' ? 'dub' : 'sub') : ((req.query.audio as string)?.toLowerCase() === 'dub' ? 'dub' : 'sub')) as 'sub' | 'dub';

    if (isNaN(anilistId) || isNaN(episode)) {
        return res.status(400).send('Invalid AniList ID or episode');
    }

    try {
        let watchResult = await fetchAnivexaWatch(provider, anilistId, audio, episode);
        if (!watchResult.success || watchResult.streams.length === 0) {
            watchResult = await fetchAnivexaBestStream(anilistId, episode, audio);
        }

        if (watchResult.success && watchResult.streams.length > 0) {
            const stream = watchResult.streams[0];
            const targetUrl = stream.proxiedUrl || stream.url;
            return res.redirect(302, targetUrl);
        }

        return res.status(404).send('Stream could not be resolved for requested anime episode');
    } catch (err: any) {
        return res.status(500).send(`Stream resolution error: ${err?.message}`);
    }
});

// --- 7. Pure Stream M3U Playlist Generator for VLC / Kodi / TiviMate ---
router.get(['/m3u/:anilistId', '/playlist/:anilistId'], async (req: Request, res: Response) => {
    const rawId = Array.isArray(req.params.anilistId) ? req.params.anilistId[0] : req.params.anilistId;
    const anilistId = parseInt(rawId, 10);
    const audio = ((req.query.audio as string)?.toLowerCase() === 'dub' ? 'dub' : 'sub') as 'sub' | 'dub';
    const provider = (req.query.provider as string) || 'reanime';

    if (isNaN(anilistId)) {
        return res.status(400).send('Valid AniList ID required');
    }

    try {
        const protocol = req.protocol || 'http';
        const host = req.get('host') || 'localhost:3000';
        const baseUrl = `${protocol}://${host}`;

        const m3uContent = await generateAnivexaM3u(baseUrl, anilistId, audio, provider);
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl; charset=utf-8');
        res.setHeader('Content-Disposition', `inline; filename="anime-${anilistId}-${audio}.m3u"`);
        return res.send(m3uContent);
    } catch (err: any) {
        return res.status(500).send(`Failed to generate M3U playlist: ${err?.message}`);
    }
});

// --- 8. Transparent HLS & Segment Proxy with FlixCloud Decryption ---
router.get('/proxy', async (req: Request, res: Response) => {
    await handleAnivexaProxy(req, res);
});

export default router;
