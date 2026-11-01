import { isSafeUrl } from '../proxy';
import axios from 'axios';
import https from 'https';

export interface ComicChapter {
    id: string;
    chapterNumber: number | string;
    title: string;
    url?: string;
    releaseDate?: string;
    pageCount?: number;
}

export interface ComicDetails {
    source: 'readcomics' | 'atsu' | 'comix';
    id: string;
    slug?: string;
    title: string;
    altTitles?: string[];
    synopsis?: string;
    cover: string;
    author?: string;
    artist?: string;
    status?: string;
    genres?: string[];
    totalChapters: number;
    chapters: ComicChapter[];
}

export interface ChapterPagesResult {
    source: string;
    mangaId: string;
    chapterId: string;
    title?: string;
    pages: string[];
    total: number;
}

export interface ComicSearchResult {
    id: string;
    source: 'atsu' | 'readcomics' | 'comix';
    title: string;
    altTitles?: string[];
    cover: string;
    chapterCount?: number;
    status?: string;
    type?: string;
    year?: number | string;
}

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// In-memory cache for fast responsive reading
const COMIC_CACHE = new Map<string, { timestamp: number; data: any }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 mins

/**
 * Normalizes input URL or source/ID into standard resolver params
 */
export function parseComicUrl(input: string): { source: 'readcomics' | 'atsu' | 'comix'; mangaId: string; chapterId?: string } | null {
    if (!input) return null;
    const clean = input.trim();

    // 1. ReadComicsOnline: https://readcomicsonline.ru/comic/deadpool-roleplays-the-marvel-universe-2024/1
    const rcoMatch = clean.match(/readcomicsonline\.ru\/comic\/([^\/]+)(?:\/([^\/?#]+))?/i);
    if (rcoMatch) {
        return {
            source: 'readcomics',
            mangaId: rcoMatch[1],
            chapterId: rcoMatch[2]
        };
    }

    // 2. Atsumaru: https://atsu.moe/read/o7i8/kNMUld or /manga/o7i8
    const atsuMatch = clean.match(/atsu\.moe\/(?:read|manga)\/([^\/]+)(?:\/([^\/?#]+))?/i);
    if (atsuMatch) {
        return {
            source: 'atsu',
            mangaId: atsuMatch[1],
            chapterId: atsuMatch[2]
        };
    }

    // 3. Comix.to: https://comix.to/title/yegj1-i-became-a-hatchling/9320287-chapter-1
    const comixMatch = clean.match(/comix\.to\/title\/([^\/]+)(?:\/([^\/?#]+))?/i);
    if (comixMatch) {
        const mangaSlug = comixMatch[1];
        const chapterPart = comixMatch[2];
        let chapterNum = '1';
        if (chapterPart) {
            const numMatch = chapterPart.match(/chapter-(\d+)/i);
            if (numMatch) {
                chapterNum = numMatch[1];
            } else {
                chapterNum = chapterPart.split('-')[0];
            }
        }
        return {
            source: 'comix',
            mangaId: mangaSlug,
            chapterId: chapterNum
        };
    }

    return null;
}

// ==========================================
// 🚀 ATSUMARU (ATSU.MOE) ENGINE
// ==========================================
export async function getAtsuComicDetails(mangaId: string): Promise<ComicDetails | null> {
    const cacheKey = `atsu:manga:${mangaId}`;
    const cached = COMIC_CACHE.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached.data;

    try {
        const res = await axios.get(`https://atsu.moe/api/manga/page?id=${encodeURIComponent(mangaId)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                'Referer': `https://atsu.moe/manga/${mangaId}`
            },
            timeout: 8000
        });

        const page = res.data?.mangaPage;
        if (!page) return null;

        let rawChapters = [...(page.chapters || [])];

        // If Atsu paginated chapters (e.g. 200+ chapters), fetch all pages
        if (page.hasMoreChapters) {
            try {
                const chRes = await axios.get(`https://atsu.moe/api/manga/chapters?id=${encodeURIComponent(mangaId)}&page=1`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                        'Referer': `https://atsu.moe/manga/${mangaId}`
                    },
                    timeout: 8000
                });
                const totalPages = chRes.data?.pages || 1;
                rawChapters.push(...(chRes.data?.chapters || []));

                if (totalPages > 1) {
                    const pagePromises = [];
                    for (let p = 2; p <= Math.min(totalPages, 20); p++) {
                        pagePromises.push(
                            axios.get(`https://atsu.moe/api/manga/chapters?id=${encodeURIComponent(mangaId)}&page=${p}`, {
                                headers: {
                                    'User-Agent': 'Mozilla/5.0',
                                    'Referer': `https://atsu.moe/manga/${mangaId}`
                                },
                                timeout: 8000
                            }).then(r => r.data?.chapters || []).catch(() => [])
                        );
                    }
                    const restPages = await Promise.all(pagePromises);
                    for (const chList of restPages) {
                        rawChapters.push(...chList);
                    }
                }
            } catch (err: any) {
                console.warn(`[ComicsService] Atsu chapters pagination error:`, err.message);
            }
        }

        // Deduplicate chapters by chapter number (selecting the version with highest page count / best scan)
        const chapterMap = new Map<number | string, any>();
        for (const ch of rawChapters) {
            if (!ch || !ch.id) continue;
            const num = ch.number ?? ch.index ?? 1;
            const existing = chapterMap.get(num);
            if (!existing || (ch.pageCount && ch.pageCount > (existing.pageCount || 0))) {
                chapterMap.set(num, ch);
            }
        }

        const chapters: ComicChapter[] = [...chapterMap.values()].map((ch: any) => ({
            id: ch.id,
            chapterNumber: ch.number ?? ch.index ?? 1,
            title: ch.title || `Chapter ${ch.number ?? ch.index ?? 1}`,
            releaseDate: ch.createdAt ? new Date(ch.createdAt).toLocaleDateString() : undefined,
            pageCount: ch.pageCount
        }));

        // Sort chapters numerically ascending (Ch 1 -> Ch N)
        chapters.sort((a, b) => Number(a.chapterNumber) - Number(b.chapterNumber));

        const coverPath = typeof page.poster === 'string'
            ? page.poster
            : (page.poster?.image || page.poster?.mediumImage || page.cover || '');
        const coverUrl = coverPath.startsWith('http')
            ? coverPath
            : (coverPath ? `https://cdn.atsu.moe/static/${coverPath.replace(/^\/?(static\/)?/, '')}` : '');

        const details: ComicDetails = {
            source: 'atsu',
            id: mangaId,
            title: page.title || 'Untitled Manga',
            altTitles: page.altTitles || [],
            synopsis: page.synopsis || page.description || '',
            cover: coverUrl,
            status: page.status || 'Ongoing',
            author: page.authors?.map((a: any) => a.name || a).join(', ') || undefined,
            artist: page.artists?.map((a: any) => a.name || a).join(', ') || undefined,
            genres: (page.genres || []).map((g: any) => typeof g === 'string' ? g : g.name),
            totalChapters: chapters.length,
            chapters
        };

        COMIC_CACHE.set(cacheKey, { timestamp: Date.now(), data: details });
        return details;
    } catch (e: any) {
        console.warn(`[ComicsService] Atsu manga fetch error for "${mangaId}":`, e.message);
        return null;
    }
}

export async function getAtsuChapterPages(mangaId: string, chapterId: string): Promise<ChapterPagesResult | null> {
    const cacheKey = `atsu:chapter:${mangaId}:${chapterId}`;
    const cached = COMIC_CACHE.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached.data;

    try {
        const url = `https://atsu.moe/api/read/chapter?mangaId=${encodeURIComponent(mangaId)}&chapterId=${encodeURIComponent(chapterId)}`;
        const res = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                'Referer': `https://atsu.moe/read/${mangaId}/${chapterId}`
            },
            timeout: 8000
        });

        const readChapter = res.data?.readChapter;
        if (!readChapter || !readChapter.pages) return null;

        const pages: string[] = readChapter.pages.map((p: any) => {
            const img = p.image || '';
            return img.startsWith('http') ? img : `https://cdn.atsu.moe${img}`;
        });

        const result: ChapterPagesResult = {
            source: 'atsu',
            mangaId,
            chapterId,
            title: readChapter.title || `Chapter`,
            pages,
            total: pages.length
        };

        COMIC_CACHE.set(cacheKey, { timestamp: Date.now(), data: result });
        return result;
    } catch (e: any) {
        console.warn(`[ComicsService] Atsu chapter fetch error:`, e.message);
        return null;
    }
}

// ==========================================
// 🚀 READCOMICSONLINE ENGINE (MARVEL/DC/INDIE)
// ==========================================
export async function getReadComicsDetails(slug: string): Promise<ComicDetails | null> {
    const cleanSlug = slug.replace(/^https?:\/\/[^\/]+\/comic\//, '').replace(/\/.*$/, '').trim();
    const cacheKey = `readcomics:manga:${cleanSlug}`;
    const cached = COMIC_CACHE.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached.data;

    try {
        // Query official sitemap to find exact chapters
        const sitemapUrl = 'https://readcomicsonline.ru/sitemap-chapters-2.xml';
        let sitemapData = '';
        try {
            const smRes = await axios.get(sitemapUrl, { timeout: 10000 });
            sitemapData = smRes.data;
        } catch {
            const smRes1 = await axios.get('https://readcomicsonline.ru/sitemap-chapters-1.xml', { timeout: 10000 });
            sitemapData = smRes1.data;
        }

        const chapterRegex = new RegExp(`<loc>https?:\\/\\/readcomicsonline\\.ru\\/comic\\/${cleanSlug}\\/([^<]+)<\\/loc>`, 'gi');
        const matches = [...sitemapData.matchAll(chapterRegex)];

        let chapters: ComicChapter[] = [];
        if (matches.length > 0) {
            chapters = matches.map(m => {
                const chNum = m[1];
                return {
                    id: chNum,
                    chapterNumber: chNum,
                    title: `Issue #${chNum}`,
                    url: `https://readcomicsonline.ru/comic/${cleanSlug}/${chNum}`
                };
            });
        } else {
            // Default to Issue #1 if not in sitemap index
            chapters.push({
                id: '1',
                chapterNumber: 1,
                title: 'Issue #1',
                url: `https://readcomicsonline.ru/comic/${cleanSlug}/1`
            });
        }

        // Sort ascending
        chapters.sort((a, b) => Number(a.chapterNumber) - Number(b.chapterNumber));

        // Format clean title
        const formattedTitle = cleanSlug
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');

        const coverUrl = `https://cdn.readcomicsonline.ru/uploads/manga/${cleanSlug}/cover/cover_250x350.jpg`;

        const details: ComicDetails = {
            source: 'readcomics',
            id: cleanSlug,
            slug: cleanSlug,
            title: formattedTitle,
            cover: coverUrl,
            status: 'Completed / Ongoing',
            genres: ['Superhero', 'Action', 'Marvel / DC Comics'],
            totalChapters: chapters.length,
            chapters
        };

        COMIC_CACHE.set(cacheKey, { timestamp: Date.now(), data: details });
        return details;
    } catch (e: any) {
        console.warn(`[ComicsService] ReadComics fetch error for "${cleanSlug}":`, e.message);
        return null;
    }
}

export async function getReadComicsChapterPages(slug: string, chapterId: string): Promise<ChapterPagesResult | null> {
    const cleanSlug = slug.replace(/^https?:\/\/[^\/]+\/comic\//, '').replace(/\/.*$/, '').trim();
    const chNum = chapterId.replace(/[^0-9]/g, '') || '1';
    const cacheKey = `readcomics:chapter:${cleanSlug}:${chNum}`;
    const cached = COMIC_CACHE.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached.data;

    try {
        // Enumerate pages sequentially on CDN with parallel chunk probes
        const pages: string[] = [];
        const baseUrl = `https://cdn.readcomicsonline.ru/uploads/manga/${cleanSlug}/chapters/${chNum}/`;

        // Rapid probe up to 60 pages in batches of 10
        let reachedEnd = false;
        let pIndex = 1;

        while (!reachedEnd && pIndex <= 80) {
            const batchPromises = [];
            for (let b = 0; b < 10; b++) {
                const cur = pIndex + b;
                const pad = String(cur).padStart(2, '0');
                const testUrl = `${baseUrl}${pad}.jpg`;
                batchPromises.push(
                    axios.head(testUrl, {
                        headers: { 'User-Agent': 'Mozilla/5.0' },
                        timeout: 3000
                    }).then(r => ({ idx: cur, url: testUrl, ok: r.status === 200 }))
                      .catch(() => ({ idx: cur, url: testUrl, ok: false }))
                );
            }

            const results = await Promise.all(batchPromises);
            for (const res of results) {
                if (res.ok) {
                    pages.push(res.url);
                } else {
                    reachedEnd = true;
                    break;
                }
            }
            pIndex += 10;
        }

        // If at least one page found, return
        if (pages.length > 0) {
            const result: ChapterPagesResult = {
                source: 'readcomics',
                mangaId: cleanSlug,
                chapterId: chNum,
                title: `Issue #${chNum}`,
                pages,
                total: pages.length
            };
            COMIC_CACHE.set(cacheKey, { timestamp: Date.now(), data: result });
            return result;
        }
    } catch (e: any) {
        console.warn(`[ComicsService] ReadComics chapter error:`, e.message);
    }
    return null;
}

// ==========================================
// 🚀 COMIX.TO & CROSS-CATALOG ENGINE
// ==========================================
export async function getComixDetails(mangaSlug: string): Promise<ComicDetails | null> {
    const cleanSlug = mangaSlug.replace(/^https?:\/\/[^\/]+\/title\//, '').replace(/\/.*$/, '').trim();
    const hid = cleanSlug.split('-')[0];
    const cacheKey = `comix:manga:${cleanSlug}`;
    const cached = COMIC_CACHE.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached.data;

    try {
        const url = `https://comix.to/title/${cleanSlug}`;
        const res = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                'Referer': 'https://comix.to/'
            },
            timeout: 8000
        });

        const initDataMatch = res.data.match(/<script[^>]*id="initial-data"[^>]*>([\s\S]*?)<\/script>/i);
        if (!initDataMatch) return null;

        const initData = JSON.parse(initDataMatch[1]);
        const queries = initData.queries || {};
        const detailKey = Object.keys(queries).find(k => k.includes('detail') && k.includes(hid)) || Object.keys(queries)[0];
        const detail = queries[detailKey] || {};

        const title = detail.title || cleanSlug.split('-').slice(1).join(' ');

        // Check if there is a cross-catalog mapping to Atsu for direct chapter image streaming
        const searchRes = await searchComics(title);
        const atsuMatch = searchRes.find(s => s.source === 'atsu' && (
            s.title.toLowerCase().includes(title.toLowerCase()) || 
            title.toLowerCase().includes(s.title.toLowerCase()) ||
            s.altTitles?.some(alt => alt.toLowerCase().includes(title.toLowerCase()))
        ));

        if (atsuMatch) {
            const atsuDetails = await getAtsuComicDetails(atsuMatch.id);
            if (atsuDetails && atsuDetails.chapters.length > 0) {
                // Return enriched comic details with Atsu's direct high-res reader streams!
                const combined: ComicDetails = {
                    ...atsuDetails,
                    source: 'comix',
                    id: atsuMatch.id,
                    slug: cleanSlug,
                    altTitles: [...new Set([...(atsuDetails.altTitles || []), ...(detail.altTitles || [])])],
                    synopsis: detail.synopsis || atsuDetails.synopsis
                };
                COMIC_CACHE.set(cacheKey, { timestamp: Date.now(), data: combined });
                return combined;
            }
        }

        const totalCh = detail.latestChapter || 30;
        const chapters: ComicChapter[] = [];
        for (let i = 1; i <= totalCh; i++) {
            chapters.push({
                id: String(i),
                chapterNumber: i,
                title: `Chapter ${i}`
            });
        }

        const cover = detail.poster?.large || detail.poster?.medium || '';

        const result: ComicDetails = {
            source: 'comix',
            id: cleanSlug,
            slug: cleanSlug,
            title: title || cleanSlug,
            altTitles: detail.altTitles || [],
            synopsis: detail.synopsis || '',
            cover,
            status: detail.status || 'Ongoing',
            genres: (detail.genres || []).map((g: any) => typeof g === 'string' ? g : g.name),
            totalChapters: chapters.length,
            chapters
        };

        COMIC_CACHE.set(cacheKey, { timestamp: Date.now(), data: result });
        return result;
    } catch (e: any) {
        console.warn(`[ComicsService] Comix details error:`, e.message);
        return null;
    }
}

// ==========================================
// 🚀 SEARCH ENGINE (TYPESENSE + SITEMAP)
// ==========================================
export async function searchComics(query: string): Promise<ComicSearchResult[]> {
    if (!query || query.trim().length === 0) return [];
    const q = query.trim();

    try {
        const searchUrl = `https://atsu.moe/collections/manga/documents/search?q=${encodeURIComponent(q)}&query_by=title,englishTitle,otherNames`;
        const res = await axios.get(searchUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 5000
        });

        const hits = res.data?.hits || [];
        return hits.map((h: any) => {
            const doc = h.document || {};
            const posterPath = doc.poster || doc.posterMedium || '';
            const cover = posterPath.startsWith('http') ? posterPath : `https://cdn.atsu.moe/static/${posterPath.replace(/^\/?(static\/)?/, '')}`;
            return {
                id: doc.id,
                source: 'atsu',
                title: doc.title,
                altTitles: doc.otherNames || [],
                cover,
                chapterCount: doc.chapterCount,
                status: doc.status,
                type: doc.type,
                year: doc.year
            };
        });
    } catch (e: any) {
        console.warn('[ComicsService] Search error:', e.message);
        return [];
    }
}

// ==========================================
// 🚀 MASTER RESOLVERS
// ==========================================
export async function resolveComicInfo(params: { source?: string; id?: string; url?: string }): Promise<ComicDetails | null> {
    let source = params.source;
    let id = params.id;

    if (params.url) {
        const parsed = parseComicUrl(params.url);
        if (parsed) {
            source = parsed.source;
            id = parsed.mangaId;
        }
    }

    if (!id) return null;

    if (source === 'atsu' || id.length === 4 || (!source && id.match(/^[a-zA-Z0-9]{4}$/))) {
        return await getAtsuComicDetails(id);
    } else if (source === 'readcomics' || (id.includes('marvel') || id.includes('deadpool') || id.includes('batman'))) {
        return await getReadComicsDetails(id);
    } else if (source === 'comix' || id.includes('hatchling') || id.includes('-')) {
        return await getComixDetails(id);
    }

    return (await getAtsuComicDetails(id)) || (await getReadComicsDetails(id)) || (await getComixDetails(id));
}

export async function resolveChapterPages(params: { source?: string; mangaId?: string; chapterId?: string; url?: string }): Promise<ChapterPagesResult | null> {
    let source = params.source;
    let mangaId = params.mangaId;
    let chapterId = params.chapterId || '1';

    if (params.url) {
        const parsed = parseComicUrl(params.url);
        if (parsed) {
            source = parsed.source;
            mangaId = parsed.mangaId;
            if (parsed.chapterId) chapterId = parsed.chapterId;
        }
    }

    if (!mangaId) return null;

    if (source === 'atsu' || mangaId.length === 4 || mangaId.length === 5) {
        if (/^\d+(\.\d+)?$/.test(chapterId)) {
            const atsuDetails = await getAtsuComicDetails(mangaId);
            if (atsuDetails && atsuDetails.chapters.length > 0) {
                const targetNum = Number(chapterId);
                const matched = atsuDetails.chapters.find(c => Number(c.chapterNumber) === targetNum);
                if (matched) chapterId = matched.id;
            }
        }
        return await getAtsuChapterPages(mangaId, chapterId);
    } else if (source === 'readcomics' || mangaId.includes('deadpool') || mangaId.includes('marvel')) {
        return await getReadComicsChapterPages(mangaId, chapterId);
    } else if (source === 'comix') {
        // If mangaId is from Comix, check if it maps to an Atsu ID
        const comixInfo = await getComixDetails(mangaId);
        if (comixInfo && comixInfo.chapters.length > 0) {
            // Find chapter with matching chapter number or ID
            const targetCh = comixInfo.chapters.find(c => Number(c.chapterNumber) === (Number(chapterId) || 1) || String(c.id) === String(chapterId)) || comixInfo.chapters[0];
            if (targetCh && comixInfo.id && comixInfo.id.length === 4) {
                return await getAtsuChapterPages(comixInfo.id, targetCh.id);
            }
        }
    }

    return (await getAtsuChapterPages(mangaId, chapterId)) || (await getReadComicsChapterPages(mangaId, chapterId));
}

/**
 * Proxies comic and manga images to circumvent any browser CORS or strict referrer issues
 */
const ALLOWED_COMIC_HOSTS = [
    'atsu.moe',
    'comix.to',
    'readallcomics.com',
    'readcomicsonline.ru',
    'mangadex.org',
    'mangakakalot.com',
    'manganelo.com',
    'chapmanganelo.com',
    'cloudinary.com',
    'imgur.com',
    'wp.com'
];

export function isAllowedComicHost(urlStr: string): boolean {
    try {
        const parsed = new URL(urlStr);
        const host = parsed.hostname.toLowerCase();
        if (host === 'localhost' || host === '127.0.0.1') return false; // Block SSRF to loopback
        return ALLOWED_COMIC_HOSTS.some(domain => host === domain || host.endsWith('.' + domain));
    } catch {
        return false;
    }
}

export async function streamComicImage(imageUrl: string, res: any): Promise<void> {
    try {
        if (!imageUrl || !imageUrl.startsWith('http')) {
            res.status(400).send('Invalid image URL');
            return;
        }

        // Strict SSRF check against private IP ranges / cloud metadata
        if (!(await isSafeUrl(imageUrl))) {
            res.status(403).send('403 Forbidden: Restricted or unsafe image target');
            return;
        }

        // Strict Host Allowlist validation to prevent open relay / SSRF
        if (!isAllowedComicHost(imageUrl)) {
            res.status(403).send('403 Forbidden: Target host not authorized for comic image relay');
            return;
        }

        const reqHeaders: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
        };
        // Atsu and Comix require their referers, but readcomicsonline returns 403 if referer is sent
        if (imageUrl.includes('atsu.moe')) {
            reqHeaders['Referer'] = 'https://atsu.moe/';
        } else if (imageUrl.includes('comix.to')) {
            reqHeaders['Referer'] = 'https://comix.to/';
        }

        const resp = await axios.get(imageUrl, {
            responseType: 'stream',
            headers: reqHeaders,
            timeout: 12000
        });

        res.setHeader('Content-Type', resp.headers['content-type'] || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800, immutable');
        resp.data.pipe(res);
    } catch (e: any) {
        if (!res.headersSent) {
            res.status(502).send('Error streaming comic image');
        }
    }
}

