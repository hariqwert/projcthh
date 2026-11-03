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
    const proxyCover = (u: string) => '/api/comics/proxy-image?url=' + encodeURIComponent(u);

    const spotlight = [
        {
            id: 'oZOG5',
            source: 'atsu',
            title: 'Solo Leveling',
            subtitle: 'Stories Without Limits • Shadow Monarch',
            tag: 'READ • EXPLORE • GET LOST',
            badge: 'Global Hit #1',
            type: 'Manhwa',
            year: 2018,
            rating: '9.9',
            cover: proxyCover('https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg'),
            backdrop: proxyCover('https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg'),
            genres: ['Action', 'Fantasy', 'System', 'Hunters'],
            chapterCount: 201,
            latestChapter: 201,
            description: 'In a world where hunters must battle deadly monsters to protect humanity, Sung Jinwoo, the weakest hunter of all mankind, receives an unprecedented second chance through a mysterious quest system.'
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
            cover: proxyCover('https://uploads.mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/6d9134b2-21ea-4d02-ac2b-7c0d1c6a2aaa.jpg.512.jpg'),
            backdrop: proxyCover('https://uploads.mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/6d9134b2-21ea-4d02-ac2b-7c0d1c6a2aaa.jpg.512.jpg'),
            genres: ['Action', 'Curses', 'Supernatural', 'Shonen'],
            chapterCount: 271,
            latestChapter: 271,
            description: 'A high schooler swallowed a cursed talisman - the finger of a demon - and became cursed himself. He enters a shaman school to track down the demon remaining limbs.'
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
            cover: proxyCover('https://uploads.mangadex.org/covers/789642f8-ca89-4e4e-8f7b-eee4d17ea08b/60530e72-f76f-45d5-b6f9-f95e05058fc3.png.512.jpg'),
            backdrop: proxyCover('https://uploads.mangadex.org/covers/789642f8-ca89-4e4e-8f7b-eee4d17ea08b/60530e72-f76f-45d5-b6f9-f95e05058fc3.png.512.jpg'),
            genres: ['Action', 'Demons', 'Historical', 'Shonen'],
            chapterCount: 205,
            latestChapter: 205,
            description: 'Tanjiro Kamado, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon. His sister Nezuko is transformed into a demon.'
        },
        {
            id: 'sVC2A',
            source: 'atsu',
            title: 'One Piece',
            subtitle: 'Egghead Island • Final Saga',
            tag: 'PIRATES • FREEDOM • TREASURE',
            badge: 'Legendary Masterwork',
            type: 'Manga',
            year: 1997,
            rating: '9.9',
            cover: proxyCover('https://uploads.mangadex.org/covers/a1c7c817-4e59-43b7-9365-09675a149a6f/2f4aca53-64c7-46ac-ae85-3bc9b3169890.png.512.jpg'),
            backdrop: proxyCover('https://uploads.mangadex.org/covers/a1c7c817-4e59-43b7-9365-09675a149a6f/2f4aca53-64c7-46ac-ae85-3bc9b3169890.png.512.jpg'),
            genres: ['Adventure', 'Pirates', 'Action', 'Comedy'],
            chapterCount: 1125,
            latestChapter: 1125,
            description: 'Monkey D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates.'
        },
        {
            id: 'VRSVH',
            source: 'atsu',
            title: 'Chainsaw Man',
            subtitle: 'Public Safety & Academy Arcs',
            tag: 'DEVILS • CHAOS • REINCARNATION',
            badge: 'Cult Classic',
            type: 'Manga',
            year: 2018,
            rating: '9.8',
            cover: proxyCover('https://uploads.mangadex.org/covers/a77742b1-befd-49a4-bff5-1ad4e6b0ef7b/6e518bd1-5f60-446b-8832-bfe6bf74834b.jpg.512.jpg'),
            backdrop: proxyCover('https://uploads.mangadex.org/covers/a77742b1-befd-49a4-bff5-1ad4e6b0ef7b/6e518bd1-5f60-446b-8832-bfe6bf74834b.jpg.512.jpg'),
            genres: ['Dark Fantasy', 'Action', 'Gore', 'Supernatural'],
            chapterCount: 175,
            latestChapter: 175,
            description: 'Denji is a young boy who was living a tragic life as a Devil Hunter. After a betrayal, he merges with his devil pet Pochita to become Chainsaw Man.'
        }
    ];

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
            cover: proxyCover('https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg'),
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
            cover: proxyCover('https://uploads.mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/6d9134b2-21ea-4d02-ac2b-7c0d1c6a2aaa.jpg.512.jpg'),
            genres: ['Action', 'Curses']
        },
        {
            rank: '03',
            id: 'sVC2A',
            source: 'atsu',
            title: 'One Piece',
            chapter: 'Chapter 1125',
            chapterCount: 1125,
            badge: 'Legendary',
            rating: '9.9',
            cover: proxyCover('https://uploads.mangadex.org/covers/a1c7c817-4e59-43b7-9365-09675a149a6f/2f4aca53-64c7-46ac-ae85-3bc9b3169890.png.512.jpg'),
            genres: ['Adventure', 'Pirates']
        },
        {
            rank: '04',
            id: '2KM8H',
            source: 'atsu',
            title: 'Demon Slayer',
            chapter: 'Chapter 205',
            chapterCount: 205,
            badge: 'Top Rated',
            rating: '9.9',
            cover: proxyCover('https://uploads.mangadex.org/covers/789642f8-ca89-4e4e-8f7b-eee4d17ea08b/60530e72-f76f-45d5-b6f9-f95e05058fc3.png.512.jpg'),
            genres: ['Action', 'Demons']
        },
        {
            rank: '05',
            id: 'VRSVH',
            source: 'atsu',
            title: 'Chainsaw Man',
            chapter: 'Chapter 175',
            chapterCount: 175,
            badge: 'Dark Fantasy',
            rating: '9.8',
            cover: proxyCover('https://uploads.mangadex.org/covers/a77742b1-befd-49a4-bff5-1ad4e6b0ef7b/6e518bd1-5f60-446b-8832-bfe6bf74834b.jpg.512.jpg'),
            genres: ['Action', 'Horror']
        },
        {
            rank: '06',
            id: 'jqSM1',
            source: 'atsu',
            title: 'My Hero Academia',
            chapter: 'Chapter 430',
            chapterCount: 430,
            badge: 'Shonen',
            rating: '9.7',
            cover: proxyCover('https://uploads.mangadex.org/covers/4f3bcae4-2d96-4c9d-932c-90181d9c873e/c7a7101a-8e22-442b-a1db-55ba9ef5b1ab.jpg.512.jpg'),
            genres: ['Superhero', 'Action']
        },
        {
            rank: '07',
            id: 'rSmmf',
            source: 'atsu',
            title: 'Naruto',
            chapter: 'Chapter 700',
            chapterCount: 700,
            badge: 'Classic',
            rating: '9.8',
            cover: proxyCover('https://uploads.mangadex.org/covers/a787b10a-02d0-46c0-8236-0d01d69ad4a3/a2b399c6-a938-4971-89f3-870b30038e5a.jpg.512.jpg'),
            genres: ['Ninja', 'Adventure']
        },
        {
            rank: '08',
            id: 'KgLw8',
            source: 'atsu',
            title: 'Tokyo Ghoul',
            chapter: 'Chapter 143',
            chapterCount: 143,
            badge: 'Psychological',
            rating: '9.7',
            cover: proxyCover('https://uploads.mangadex.org/covers/6a1d1cb1-ecd5-40d9-89ff-9d88e40b136b/040e8ae9-4ddd-49d2-8986-56782b391714.jpg.512.jpg'),
            genres: ['Dark', 'Supernatural']
        },
        {
            rank: '09',
            id: 'JZmEt',
            source: 'atsu',
            title: 'Spy x Family',
            chapter: 'Chapter 104',
            chapterCount: 104,
            badge: 'Comedy',
            rating: '9.8',
            cover: proxyCover('https://uploads.mangadex.org/covers/6b958848-c885-4735-9201-12ee77abcb3c/91a35e78-62b2-41fe-9869-ce051f2d1070.jpg.512.jpg'),
            genres: ['Comedy', 'Spy', 'Family']
        },
        {
            rank: '10',
            id: 'deadpool-roleplays-the-marvel-universe-2024',
            source: 'readcomics',
            title: 'Deadpool: Marvel Roleplay',
            chapter: 'Chapter 1',
            chapterCount: 5,
            badge: 'Marvel Comic',
            rating: '9.7',
            cover: proxyCover('https://cdn.readcomicsonline.ru/uploads/manga/deadpool-roleplays-the-marvel-universe-2024/cover/cover_250x350.jpg'),
            genres: ['Superhero', 'Comedy']
        },
        {
            rank: '11',
            id: 'batman-2016',
            source: 'readcomics',
            title: 'Batman: Rebirth',
            chapter: 'Chapter 85',
            chapterCount: 85,
            badge: 'DC Comics',
            rating: '9.8',
            cover: proxyCover('https://cdn.readcomicsonline.ru/uploads/manga/batman-2016/cover/cover_250x350.jpg'),
            genres: ['Detective', 'Action']
        },
        {
            rank: '12',
            id: 'the-amazing-spider-man-2022',
            source: 'readcomics',
            title: 'The Amazing Spider-Man',
            chapter: 'Chapter 55',
            chapterCount: 55,
            badge: 'Spider-Verse',
            rating: '9.7',
            cover: proxyCover('https://cdn.readcomicsonline.ru/uploads/manga/the-amazing-spider-man-2022/cover/cover_250x350.jpg'),
            genres: ['Superhero', 'Action']
        }
    ];

    const latestUpdates = [
        {
            id: 'oZOG5',
            source: 'atsu',
            title: 'Solo Leveling',
            chapter: 'Chapter 201',
            badge: 'COMPLETE',
            rating: '9.9',
            cover: proxyCover('https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg'),
            genres: ['Action', 'Fantasy']
        },
        {
            id: 'JD89O',
            source: 'atsu',
            title: 'Jujutsu Kaisen',
            chapter: 'Chapter 271',
            badge: 'FINALE',
            rating: '9.8',
            cover: proxyCover('https://uploads.mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/6d9134b2-21ea-4d02-ac2b-7c0d1c6a2aaa.jpg.512.jpg'),
            genres: ['Action', 'Curses']
        },
        {
            id: 'sVC2A',
            source: 'atsu',
            title: 'One Piece',
            chapter: 'Chapter 1125',
            badge: 'NEW',
            rating: '9.9',
            cover: proxyCover('https://uploads.mangadex.org/covers/a1c7c817-4e59-43b7-9365-09675a149a6f/2f4aca53-64c7-46ac-ae85-3bc9b3169890.png.512.jpg'),
            genres: ['Adventure', 'Pirates']
        },
        {
            id: '2KM8H',
            source: 'atsu',
            title: 'Demon Slayer',
            chapter: 'Chapter 205',
            badge: 'COMPLETE',
            rating: '9.9',
            cover: proxyCover('https://uploads.mangadex.org/covers/789642f8-ca89-4e4e-8f7b-eee4d17ea08b/60530e72-f76f-45d5-b6f9-f95e05058fc3.png.512.jpg'),
            genres: ['Action', 'Demons']
        },
        {
            id: 'VRSVH',
            source: 'atsu',
            title: 'Chainsaw Man',
            chapter: 'Chapter 175',
            badge: 'SIMULCAST',
            rating: '9.8',
            cover: proxyCover('https://uploads.mangadex.org/covers/a77742b1-befd-49a4-bff5-1ad4e6b0ef7b/6e518bd1-5f60-446b-8832-bfe6bf74834b.jpg.512.jpg'),
            genres: ['Dark Fantasy', 'Horror']
        },
        {
            id: 'jqSM1',
            source: 'atsu',
            title: 'My Hero Academia',
            chapter: 'Chapter 430',
            badge: 'COMPLETE',
            rating: '9.7',
            cover: proxyCover('https://uploads.mangadex.org/covers/4f3bcae4-2d96-4c9d-932c-90181d9c873e/c7a7101a-8e22-442b-a1db-55ba9ef5b1ab.jpg.512.jpg'),
            genres: ['Superhero', 'Action']
        },
        {
            id: 'deadpool-roleplays-the-marvel-universe-2024',
            source: 'readcomics',
            title: 'Deadpool Roleplays Marvel',
            chapter: 'Chapter 1',
            badge: 'NEW',
            rating: '9.8',
            cover: proxyCover('https://cdn.readcomicsonline.ru/uploads/manga/deadpool-roleplays-the-marvel-universe-2024/cover/cover_250x350.jpg'),
            genres: ['Superhero', 'Comedy']
        },
        {
            id: 'batman-2016',
            source: 'readcomics',
            title: 'Batman: Rebirth (DC)',
            chapter: 'Issue 85',
            badge: 'DC COMICS',
            rating: '9.8',
            cover: proxyCover('https://cdn.readcomicsonline.ru/uploads/manga/batman-2016/cover/cover_250x350.jpg'),
            genres: ['Detective', 'Action']
        }
    ];

    const westernComics = [
        {
            id: 'deadpool-roleplays-the-marvel-universe-2024',
            source: 'readcomics',
            title: 'Deadpool Roleplays Marvel (2024)',
            badge: 'Marvel 2024',
            rating: '9.8',
            cover: proxyCover('https://cdn.readcomicsonline.ru/uploads/manga/deadpool-roleplays-the-marvel-universe-2024/cover/cover_250x350.jpg'),
            chapterCount: 5,
            genres: ['Superhero', 'Comedy', 'Action']
        },
        {
            id: 'batman-2016',
            source: 'readcomics',
            title: 'Batman (2016 Rebirth Series)',
            badge: 'DC Comics',
            rating: '9.8',
            cover: proxyCover('https://cdn.readcomicsonline.ru/uploads/manga/batman-2016/cover/cover_250x350.jpg'),
            chapterCount: 85,
            genres: ['DC Universe', 'Detective', 'Superhero']
        },
        {
            id: 'the-amazing-spider-man-2022',
            source: 'readcomics',
            title: 'The Amazing Spider-Man',
            badge: 'Marvel Comics',
            rating: '9.7',
            cover: proxyCover('https://cdn.readcomicsonline.ru/uploads/manga/the-amazing-spider-man-2022/cover/cover_250x350.jpg'),
            chapterCount: 55,
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
    const proxyCover = (u: string) => '/api/comics/proxy-image?url=' + encodeURIComponent(u);
    const featured = [
        {
            id: 'deadpool-roleplays-the-marvel-universe-2024',
            source: 'readcomics',
            title: 'Deadpool Roleplays The Marvel Universe (2024)',
            badge: 'Marvel Comics',
            type: 'Comic',
            cover: proxyCover('https://cdn.readcomicsonline.ru/uploads/manga/deadpool-roleplays-the-marvel-universe-2024/cover/cover_250x350.jpg'),
            chapterCount: 1,
            description: 'Deadpool takes on roleplaying through the Marvel Universe in this high-octane 2024 limited series run.'
        },
        {
            id: 'o7i8',
            source: 'atsu',
            title: 'The Strongest Sword Saint Reincarnated Into a Prestigious Magic Family',
            badge: 'Manga / Isekai',
            type: 'Manga',
            cover: proxyCover('https://uploads.mangadex.org/covers/4c28fa92-d88a-4686-b068-348c4e72f3e1/5fcec5e3-ef6a-4f13-8f0e-8b5e7e27d215.jpg.512.jpg'),
            chapterCount: 96,
            description: 'A master swordsman reincarnates into a world of elite spellcasters, demonstrating blade mastery exceeding magic.'
        },
        {
            id: 'yegj1-i-became-a-hatchling',
            source: 'comix',
            title: 'I Became a Hatchling (Reborn as a Hatchling)',
            badge: 'Manhwa / Fantasy',
            type: 'Manhwa',
            cover: proxyCover('https://uploads.mangadex.org/covers/37838287-3fe9-443d-9d22-eafc1089140e/0f18c90b-fda6-4534-a1d2-028526b0a866.jpg.512.jpg'),
            chapterCount: 166,
            description: 'Reincarnated as a mythical dragon hatchling, surviving against predatory beasts and growing into a legendary titan.'
        },
        {
            id: '2KM8H',
            source: 'atsu',
            title: 'Demon Slayer: Kimetsu no Yaiba',
            badge: 'Shonen / Action',
            type: 'Manga',
            cover: proxyCover('https://uploads.mangadex.org/covers/789642f8-ca89-4e4e-8f7b-eee4d17ea08b/60530e72-f76f-45d5-b6f9-f95e05058fc3.png.512.jpg'),
            chapterCount: 205,
            description: 'Tanjiro Kamado sets out on a perilous path to slay demons and turn his transformed sister Nezuko back into a human.'
        },
        {
            id: 'oZOG5',
            source: 'atsu',
            title: 'Solo Leveling',
            badge: 'Action / Fantasy',
            type: 'Manhwa',
            cover: proxyCover('https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg'),
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
