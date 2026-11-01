import { Router, Request, Response } from 'express';
import {
    resolveComicInfo,
    resolveChapterPages,
    searchComics,
    streamComicImage,
    parseComicUrl,
    ComicDetails,
    ChapterPagesResult
} from '../services/comicsService';

export const comicsRouter = Router();

// GET /api/comics/info - Resolves manga/comic metadata, synopsis, and chapter index
comicsRouter.get(['/info', '/details'], async (req: Request, res: Response) => {
    try {
        const url = (req.query.url as string || '').trim();
        const source = (req.query.source as string || '').trim();
        let id = (req.query.id as string || '').trim();
        if (id === 'peR8') id = 'oZOG5'; // Map deprecated Solo Leveling ID to active high-res scan entry

        if (!url && !id) {
            return res.status(400).json({
                success: false,
                error: 'Please provide either a comic URL (?url=...) or source/id (?source=&id=)'
            });
        }

        const details = await resolveComicInfo({ url, source, id });
        if (!details) {
            return res.status(404).json({
                success: false,
                error: 'Comic or Manga not found for given query'
            });
        }

        res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
        return res.json({
            success: true,
            manga: details
        });
    } catch (err: any) {
        console.error('[ComicsRoute] Info error:', err.message);
        return res.status(500).json({
            success: false,
            error: err.message || 'Internal server error while resolving comic details'
        });
    }
});

// GET /api/comics/chapter - Resolves page image URLs for a specific chapter
comicsRouter.get(['/chapter', '/pages'], async (req: Request, res: Response) => {
    try {
        const url = (req.query.url as string || '').trim();
        const source = (req.query.source as string || '').trim();
        let mangaId = (req.query.mangaId as string || req.query.id as string || '').trim();
        if (mangaId === 'peR8') mangaId = 'oZOG5';
        const chapterId = (req.query.chapterId as string || req.query.ch as string || req.query.chapter as string || '1').trim();

        if (!url && !mangaId) {
            return res.status(400).json({
                success: false,
                error: 'Please provide either a chapter URL (?url=...) or mangaId (?mangaId=&chapterId=)'
            });
        }

        const pagesResult = await resolveChapterPages({ url, source, mangaId, chapterId });
        if (!pagesResult || !pagesResult.pages || pagesResult.pages.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Chapter pages not found or failed to load from upstream CDN'
            });
        }

        res.setHeader('Cache-Control', 'public, max-age=600, stale-while-revalidate=1200');
        return res.json({
            success: true,
            ...pagesResult
        });
    } catch (err: any) {
        console.error('[ComicsRoute] Chapter pages error:', err.message);
        return res.status(500).json({
            success: false,
            error: err.message || 'Internal error resolving chapter pages'
        });
    }
});

// GET /api/comics/search - Searches across manga, manhwa and comics catalogs
comicsRouter.get('/search', async (req: Request, res: Response) => {
    try {
        const query = (req.query.q as string || req.query.query as string || '').trim();
        if (!query) {
            return res.json({ success: true, query: '', results: [] });
        }

        const results = await searchComics(query);
        res.setHeader('Cache-Control', 'public, max-age=120, stale-while-revalidate=300');
        return res.json({
            success: true,
            query,
            total: results.length,
            results
        });
    } catch (err: any) {
        console.error('[ComicsRoute] Search error:', err.message);
        return res.status(500).json({
            success: false,
            error: err.message || 'Search execution failed'
        });
    }
});

// GET /api/comics/proxy-image - Streams image directly with upstream referers
comicsRouter.get('/proxy-image', async (req: Request, res: Response) => {
    const imgUrl = (req.query.url as string || '').trim();
    if (!imgUrl) {
        return res.status(400).send('No image URL specified');
    }
    await streamComicImage(imgUrl, res);
});

// GET /api/comics/store - Full Store Catalog with Spotlight, Subsections & Shelves
comicsRouter.get(['/store', '/home'], async (req: Request, res: Response) => {
    const spotlight = [
        {
            id: 'oZOG5',
            source: 'atsu',
            title: 'Solo Leveling',
            subtitle: 'Stories Without Limits',
            tag: 'READ • EXPLORE • GET LOST',
            badge: 'Global Hit #1',
            type: 'Manhwa',
            year: 2018,
            rating: '9.9',
            cover: 'https://cdn.atsu.moe/static/posters/cGoOe70KFmmEBe4m.jpg',
            backdrop: 'https://cdn.atsu.moe/static/posters/cGoOe70KFmmEBe4m.jpg',
            genres: ['Action', 'Fantasy', 'System', 'Hunters'],
            chapterCount: 201,
            latestChapter: 201,
            description: 'Discover thousands of manga and comics from around the world. Simple. Fast. Beautiful.'
        },
        {
            id: 'JD89O',
            source: 'atsu',
            title: 'Jujutsu Kaisen',
            subtitle: 'Sorcery Fight • Shibuya Arc',
            tag: 'CURSES • BATTLE • DESTINY',
            badge: 'Trending Worldwide',
            type: 'Manga',
            year: 2018,
            rating: '9.8',
            cover: 'https://cdn.atsu.moe/static/posters/FkQTMZhaEFqYtMSQ.jpg',
            backdrop: 'https://cdn.atsu.moe/static/posters/FkQTMZhaEFqYtMSQ.jpg',
            genres: ['Action', 'Curses', 'Supernatural', 'Shonen'],
            chapterCount: 271,
            latestChapter: 271,
            description: 'A boy swallowed a cursed talisman - the finger of a demon - and became cursed himself. He enters a shaman school to track down the demon’s remaining limbs.'
        },
        {
            id: '2KM8H',
            source: 'atsu',
            title: 'Demon Slayer: Kimetsu no Yaiba',
            subtitle: 'Dark Fantasy • Historical • Shonen Jump',
            tag: 'BLADE • DEMONS • HONOR',
            badge: 'Masterpiece',
            type: 'Manga',
            year: 2016,
            rating: '9.9',
            cover: 'https://cdn.atsu.moe/static/posters/jVDglw9uBhkrPT73.jpg',
            backdrop: 'https://cdn.atsu.moe/static/posters/jVDglw9uBhkrPT73.jpg',
            genres: ['Action', 'Demons', 'Historical', 'Shonen'],
            chapterCount: 205,
            latestChapter: 205,
            description: 'Tanjiro Kamado, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon. His sister Nezuko is transformed into a demon.'
        }
    ];

    // Trending Now: Matches the exact 8 ranked cards (01 to 08) from reference design
    const trendingNow = [
        {
            rank: '01',
            id: 'oZOG5',
            source: 'atsu',
            title: 'Solo Leveling',
            chapter: 'Chapter 201',
            chapterCount: 201,
            badge: 'Manhwa',
            rating: '9.9',
            cover: 'https://cdn.atsu.moe/static/posters/cGoOe70KFmmEBe4m.jpg',
            genres: ['Action', 'Fantasy']
        },
        {
            rank: '02',
            id: 'JD89O',
            source: 'atsu',
            title: 'Jujutsu Kaisen',
            chapter: 'Chapter 271',
            chapterCount: 271,
            badge: 'Manga',
            rating: '9.8',
            cover: 'https://cdn.atsu.moe/static/posters/FkQTMZhaEFqYtMSQ.jpg',
            genres: ['Action', 'Curses']
        },
        {
            rank: '03',
            id: 'sVC2A',
            source: 'atsu',
            title: 'One Piece',
            chapter: 'Chapter 1105',
            chapterCount: 1125,
            badge: 'Legendary',
            rating: '9.9',
            cover: 'https://cdn.atsu.moe/static/posters/qp33UK6whoY69nrR.jpg',
            genres: ['Adventure', 'Pirates']
        },
        {
            rank: '04',
            id: 'jqSM1',
            source: 'atsu',
            title: 'My Hero Academia',
            chapter: 'Chapter 430',
            chapterCount: 430,
            badge: 'Shonen',
            rating: '9.7',
            cover: 'https://cdn.atsu.moe/static/posters/PsHepXHNcF6cCydu.jpg',
            genres: ['Superhero', 'Action']
        },
        {
            rank: '05',
            id: 'rSmmf',
            source: 'atsu',
            title: 'Naruto',
            chapter: 'Chapter 700',
            chapterCount: 700,
            badge: 'Classic',
            rating: '9.8',
            cover: 'https://cdn.atsu.moe/static/posters/eetjg5vwF5DliKM4.jpg',
            genres: ['Ninja', 'Adventure']
        },
        {
            rank: '06',
            id: 'VRSVH',
            source: 'atsu',
            title: 'Chainsaw Man',
            chapter: 'Chapter 167',
            chapterCount: 175,
            badge: 'Dark Fantasy',
            rating: '9.8',
            cover: 'https://cdn.atsu.moe/static/posters/rGVzeEHgpwXHagMM.png',
            genres: ['Action', 'Horror']
        },
        {
            rank: '07',
            id: 'KgLw8',
            source: 'atsu',
            title: 'Tokyo Ghoul',
            chapter: 'Chapter 143',
            chapterCount: 143,
            badge: 'Psychological',
            rating: '9.7',
            cover: 'https://cdn.atsu.moe/static/posters/97xVJWfmESTUddgP.jpg',
            genres: ['Dark', 'Supernatural']
        },
        {
            rank: '08',
            id: 'JZmEt',
            source: 'atsu',
            title: 'Spy x Family',
            chapter: 'Chapter 104',
            chapterCount: 104,
            badge: 'Comedy',
            rating: '9.8',
            cover: 'https://cdn.atsu.moe/static/posters/fve8l8JxAz9C4nLz.jpg',
            genres: ['Comedy', 'Spy', 'Slice of Life']
        }
    ];

    // Latest Updates: Cards with vibrant orange "NEW" badge (All tested & verified working CDNs)
    const latestUpdates = [
        {
            id: 'deadpool-roleplays-the-marvel-universe-2024',
            source: 'readcomics',
            title: 'Deadpool Roleplays Marvel',
            chapter: 'Chapter 1',
            badge: 'NEW',
            rating: '9.8',
            cover: '/api/comics/proxy-image?url=' + encodeURIComponent('https://cdn.readcomicsonline.ru/uploads/manga/deadpool-roleplays-the-marvel-universe-2024/cover/cover_250x350.jpg'),
            genres: ['Superhero', 'Comedy']
        },
        {
            id: 'o7i8',
            source: 'atsu',
            title: 'Strongest Sword Saint',
            chapter: 'Chapter 96',
            badge: 'NEW',
            rating: '9.6',
            cover: 'https://cdn.atsu.moe/static/posters/h7J2Rqw2wbberhuK.webp',
            genres: ['Isekai', 'Action']
        },
        {
            id: 'z18j',
            source: 'atsu',
            title: 'Reborn as a Hatchling',
            chapter: 'Chapter 166',
            badge: 'NEW',
            rating: '9.5',
            cover: 'https://cdn.atsu.moe/static/posters/SAS2kfee9vnhiUVG.jpg',
            genres: ['Webtoon', 'Fantasy']
        },
        {
            id: '2KM8H',
            source: 'atsu',
            title: 'Demon Slayer',
            chapter: 'Chapter 205',
            badge: 'NEW',
            rating: '9.9',
            cover: 'https://cdn.atsu.moe/static/posters/jVDglw9uBhkrPT73.jpg',
            genres: ['Action', 'Demons']
        },
        {
            id: 'jqSM1',
            source: 'atsu',
            title: 'My Hero Academia',
            chapter: 'Chapter 430',
            badge: 'NEW',
            rating: '9.7',
            cover: 'https://cdn.atsu.moe/static/posters/PsHepXHNcF6cCydu.jpg',
            genres: ['Superhero', 'Action']
        },
        {
            id: 'JD89O',
            source: 'atsu',
            title: 'Jujutsu Kaisen',
            chapter: 'Chapter 271',
            badge: 'NEW',
            rating: '9.8',
            cover: 'https://cdn.atsu.moe/static/posters/FkQTMZhaEFqYtMSQ.jpg',
            genres: ['Action', 'Curses']
        },
        {
            id: 'oZOG5',
            source: 'atsu',
            title: 'Solo Leveling',
            chapter: 'Chapter 201',
            badge: 'NEW',
            rating: '9.9',
            cover: 'https://cdn.atsu.moe/static/posters/cGoOe70KFmmEBe4m.jpg',
            genres: ['Action', 'Fantasy']
        },
        {
            id: 'VRSVH',
            source: 'atsu',
            title: 'Chainsaw Man',
            chapter: 'Chapter 167',
            badge: 'NEW',
            rating: '9.8',
            cover: 'https://cdn.atsu.moe/static/posters/rGVzeEHgpwXHagMM.png',
            genres: ['Dark Fantasy', 'Horror']
        }
    ];

    const westernComics = [
        {
            id: 'deadpool-roleplays-the-marvel-universe-2024',
            source: 'readcomics',
            title: 'Deadpool Roleplays Marvel (2024)',
            badge: 'Marvel 2024',
            rating: '9.8',
            cover: '/api/comics/proxy-image?url=' + encodeURIComponent('https://cdn.readcomicsonline.ru/uploads/manga/deadpool-roleplays-the-marvel-universe-2024/cover/cover_250x350.jpg'),
            chapterCount: 1,
            genres: ['Superhero', 'Comedy', 'Action']
        },
        {
            id: 'batman-2016',
            source: 'readcomics',
            title: 'Batman (2016 Rebirth Series)',
            badge: 'DC Comics',
            rating: '9.7',
            cover: '/api/comics/proxy-image?url=' + encodeURIComponent('https://cdn.readcomicsonline.ru/uploads/manga/batman-2016/cover/cover_250x350.jpg'),
            chapterCount: 40,
            genres: ['DC Universe', 'Detective', 'Superhero']
        },
        {
            id: 'the-amazing-spider-man-2022',
            source: 'readcomics',
            title: 'The Amazing Spider-Man',
            badge: 'Marvel Comics',
            rating: '9.6',
            cover: 'https://cdn.atsu.moe/static/posters/koQsfbXuz5Qcm1KD.jpg',
            chapterCount: 50,
            genres: ['Marvel', 'Spider-Verse', 'Action']
        }
    ];

    res.setHeader('Cache-Control', 'public, max-age=600');
    return res.json({
        success: true,
        spotlight,
        trendingNow,
        latestUpdates,
        westernComics
    });
});

// GET /api/comics/featured - Backward-compatible Curated list
comicsRouter.get('/featured', async (req: Request, res: Response) => {
    const featured = [
        {
            id: 'deadpool-roleplays-the-marvel-universe-2024',
            source: 'readcomics',
            title: 'Deadpool Roleplays The Marvel Universe (2024)',
            badge: 'Marvel Comics',
            type: 'Comic',
            cover: 'https://cdn.readcomicsonline.ru/uploads/manga/deadpool-roleplays-the-marvel-universe-2024/cover/cover_250x350.jpg',
            chapterCount: 1,
            description: 'Deadpool takes on roleplaying through the Marvel Universe in this high-octane 2024 limited series run.'
        },
        {
            id: 'o7i8',
            source: 'atsu',
            title: 'The Strongest Sword Saint Reincarnated Into a Prestigious Magic Family',
            badge: 'Manga / Isekai',
            type: 'Manga',
            cover: 'https://cdn.atsu.moe/static/posters/h7J2Rqw2wbberhuK.webp',
            chapterCount: 96,
            description: 'A master swordsman reincarnates into a world of elite spellcasters, demonstrating blade mastery exceeding magic.'
        },
        {
            id: 'yegj1-i-became-a-hatchling',
            source: 'comix',
            title: 'I Became a Hatchling (Reborn as a Hatchling)',
            badge: 'Manhwa / Fantasy',
            type: 'Manhwa',
            cover: 'https://cdn.atsu.moe/static/posters/b6Z7J.webp',
            chapterCount: 166,
            description: 'Reincarnated as a mythical dragon hatchling, surviving against predatory beasts and growing into a legendary titan.'
        },
        {
            id: '2KM8H',
            source: 'atsu',
            title: 'Demon Slayer: Kimetsu no Yaiba',
            badge: 'Shonen / Action',
            type: 'Manga',
            cover: 'https://cdn.atsu.moe/static/posters/jVDglw9uBhkrPT73.jpg',
            chapterCount: 205,
            description: 'Tanjiro Kamado sets out on a perilous path to slay demons and turn his transformed sister Nezuko back into a human.'
        },
        {
            id: 'peR8',
            source: 'atsu',
            title: 'Solo Leveling',
            badge: 'Action / Fantasy',
            type: 'Manwha',
            cover: 'https://cdn.atsu.moe/static/posters/cGoOe70KFmmEBe4m.jpg',
            chapterCount: 201,
            description: 'In a world of gates and awakenings, Sung Jin-woo receives a mysterious quest system that allows him to level up infinitely.'
        }
    ];

    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.json({
        success: true,
        featured
    });
});

export default comicsRouter;
