import AdmZip from 'adm-zip';
import express, { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import zlib from 'zlib';
import { XzReadableStream } from 'xz-decompress';
import { resolveMalIdFromTitle, resolveZokoStream } from '../services/animeScraperService';
import { fetchAnivexaWatch, fetchAnivexaBestStream } from '../services/anivexaService';

const router = express.Router();

// Helper to convert SRT string to WebVTT string
function srtToVtt(srtText: string): string {
    if (!srtText) return 'WEBVTT\n\n';
    let vtt = 'WEBVTT\n\n' + srtText
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, '$1.$2');
    return vtt;
}

// Helper to convert ASS/SSA anime subtitles to WebVTT
function assToVtt(assText: string): string {
    if (!assText) return 'WEBVTT\n\n';
    const lines = assText.split(/\r?\n/);
    let vtt = 'WEBVTT\n\n';
    let count = 1;

    for (const line of lines) {
        if (line.startsWith('Dialogue:')) {
            const parts = line.substring(9).split(',');
            if (parts.length >= 10) {
                let start = parts[1].trim();
                let end = parts[2].trim();
                let text = parts.slice(9).join(',').trim();

                const padTime = (t: string) => {
                    const segs = t.split(':');
                    if (segs.length === 3) {
                        const h = segs[0].padStart(2, '0');
                        const m = segs[1].padStart(2, '0');
                        let [s, ms] = segs[2].split('.');
                        s = s.padStart(2, '0');
                        ms = (ms || '0').padEnd(3, '0').substring(0, 3);
                        return `${h}:${m}:${s}.${ms}`;
                    }
                    return t;
                };

                // Remove ASS styling tags like {\pos(..)}, {\an8}, \N (newline)
                text = text.replace(/\{[^}]+\}/g, '').replace(/\\N/g, '\n').replace(/\\n/g, '\n').trim();
                if (text) {
                    vtt += `${count++}\n${padTime(start)} --> ${padTime(end)}\n${text}\n\n`;
                }
            }
        }
    }

    return count > 1 ? vtt : srtToVtt(assText);
}

// Universal Proxy endpoint to convert any SRT/ASS/VTT/GZ subtitle URL to valid WebVTT format for browser <track>

router.get('/msone', async (req: Request, res: Response) => {
    const pageUrl = req.query.url as string;
    if (!pageUrl) return res.status(400).send('Missing url');

    try {
        const pageRes = await axios.get(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(pageRes.data);
        const downloadLink = $('a.wpdm-download-link').attr('data-downloadurl') || $('a.wpdm-download-link').attr('href') || $('.wpdm-download-link').attr('href') || $('a[href*="download"]').attr('href');
        
        if (!downloadLink) {
             throw new Error("No download link found on MSone page");
        }

        // Fetch the zip
        const zipRes = await axios.get(downloadLink, { responseType: 'arraybuffer', headers: { 'User-Agent': 'Mozilla/5.0' } });
        const buf = Buffer.from(zipRes.data);
        
        let rawText = '';
        if (buf.length > 4 && buf[0] === 0x50 && buf[1] === 0x4b) {
            const zip = new AdmZip(buf);
            const zipEntries = zip.getEntries();
            let subEntry = zipEntries.find(e => e.entryName.toLowerCase().endsWith('.srt') || e.entryName.toLowerCase().endsWith('.vtt') || e.entryName.toLowerCase().endsWith('.ass'));
            if (subEntry) {
                rawText = zip.readAsText(subEntry, "utf8");
            }
        }
        
        if (!rawText) {
            rawText = buf.toString('utf8');
        }

        
        // Convert to VTT format manually like the main /vtt route does
        let vttContent = rawText;
        if (!vttContent.includes('WEBVTT')) {
            vttContent = 'WEBVTT\n\n' + vttContent
                .replace(/\r\n|\r/g, '\n')
                .replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');
        }

        res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(vttContent);
    } catch (err: any) {
        console.error('MSone proxy error:', err?.message);
        res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('WEBVTT\n\n');
    }
});

// Clean up release and format labels to remove all UI branding, bracket tags, and noise
function cleanReleaseTitle(title: string): string {
    if (!title) return '';
    return title
        .replace(/\[[^\]]*\]/g, '') // remove bracket tags
        .replace(/\b(download|subtitle|subtitles|yts|yify|bluray|brrip|web-?dl|hdrip|1080p|720p|x264|x265|hevc|aac)\b/gi, '')
        .replace(/[\._]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

router.get('/vtt', async (req: Request, res: Response) => {
    const subUrl = req.query.url as string;
    if (!subUrl) {
        res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.send('WEBVTT\n\n');
    }

    try {
        const reqHeaders: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        };
        if (subUrl.includes('dramahot.top') || subUrl.includes('zokoanime')) {
            reqHeaders['Referer'] = 'https://zokoanime.video/';
        }

        const response = await axios.get(subUrl, {
            responseType: 'arraybuffer',
            timeout: 12000,
            headers: reqHeaders
        });

        const buf = Buffer.from(response.data);
        let rawText = '';

        // Check if data is ZIP archive (e.g. from YTS or MSone)
        if (buf.length > 4 && buf[0] === 0x50 && buf[1] === 0x4b) {
            try {
                const zip = new AdmZip(buf);
                const zipEntries = zip.getEntries();
                const subEntry = zipEntries.find(e => {
                    const name = e.entryName.toLowerCase();
                    return name.endsWith('.srt') || name.endsWith('.vtt') || name.endsWith('.ass');
                });
                if (subEntry) {
                    rawText = zip.readAsText(subEntry, 'utf8');
                }
            } catch (zErr) {
                console.warn('Zip decompression failed, trying text decode:', zErr);
            }
        }

        if (!rawText) {
            // Check if data is XZ compressed (e.g. from AnimeTosho: 0xfd 0x37 0x7a 0x58 0x5a)
            if (buf.length > 6 && buf[0] === 0xfd && buf[1] === 0x37 && buf[2] === 0x7a && buf[3] === 0x58 && buf[4] === 0x5a) {
                try {
                    const u8 = new Uint8Array(buf);
                    const stream = new ReadableStream({
                        start(controller) {
                            controller.enqueue(u8);
                            controller.close();
                        }
                    });
                    const decompressedStream = new XzReadableStream(stream);
                    const resp = new Response(decompressedStream);
                    rawText = await resp.text();
                } catch (xzErr) {
                    console.warn('XZ decompression failed, trying gzip/inflate:', xzErr);
                }
            }
        }

        if (!rawText) {
            // Check if data is GZIP compressed
            try {
                rawText = zlib.gunzipSync(buf).toString('utf8');
            } catch (e1) {
                try {
                    rawText = zlib.inflateSync(buf).toString('utf8');
                } catch (e2) {
                    rawText = buf.toString('utf8');
                }
            }
        }

        let vttContent = '';
        if (rawText.includes('WEBVTT')) {
            vttContent = rawText;
        } else if (rawText.includes('[Events]') && rawText.includes('Dialogue:')) {
            vttContent = assToVtt(rawText);
        } else {
            vttContent = srtToVtt(rawText);
        }

        res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(vttContent);
    } catch (e: any) {
        console.error('Subtitle VTT proxy error:', e?.message || e);
        res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('WEBVTT\n\n');
    }
});

// 0. High-Speed Stremio OpenSubtitles v3 Provider (Instant Multi-Language Subtitles)
const ISO_LANG_MAP: Record<string, string> = {
    eng: 'English', en: 'English',
    spa: 'Spanish', es: 'Spanish',
    fre: 'French', fra: 'French', fr: 'French',
    deu: 'German', ger: 'German', de: 'German',
    ita: 'Italian', it: 'Italian',
    por: 'Portuguese', pt: 'Portuguese', pob: 'Portuguese (BR)',
    rus: 'Russian', ru: 'Russian',
    hin: 'Hindi', hi: 'Hindi',
    tam: 'Tamil', ta: 'Tamil',
    tel: 'Telugu', te: 'Telugu',
    mal: 'Malayalam', ml: 'Malayalam',
    kan: 'Kannada', kn: 'Kannada',
    ben: 'Bengali', bn: 'Bengali',
    ara: 'Arabic', ar: 'Arabic',
    zho: 'Chinese', chi: 'Chinese', zh: 'Chinese',
    jpn: 'Japanese', ja: 'Japanese',
    kor: 'Korean', ko: 'Korean',
    tur: 'Turkish', tr: 'Turkish',
    vie: 'Vietnamese', vi: 'Vietnamese',
    tha: 'Thai', th: 'Thai',
    ind: 'Indonesian', id: 'Indonesian',
    pol: 'Polish', pl: 'Polish',
    dut: 'Dutch', nld: 'Dutch', nl: 'Dutch',
    swe: 'Swedish', sv: 'Swedish',
    nor: 'Norwegian', no: 'Norwegian',
    dan: 'Danish', da: 'Danish',
    fin: 'Finnish', fi: 'Finnish',
    gre: 'Greek', ell: 'Greek', el: 'Greek',
    heb: 'Hebrew', he: 'Hebrew',
    ukr: 'Ukrainian', uk: 'Ukrainian'
};

function resolveLanguageName(code: string): string {
    if (!code) return 'English';
    const lower = code.toLowerCase();
    return ISO_LANG_MAP[lower] || ISO_LANG_MAP[lower.substring(0, 2)] || code.toUpperCase();
}

async function fetchStremioOpenSubtitles(imdbId: string, season?: string, episode?: string): Promise<any[]> {
    const subs: any[] = [];
    if (!imdbId) return subs;
    const cleanImdb = imdbId.startsWith('tt') ? imdbId : `tt${imdbId}`;
    try {
        const isTv = !!(season && episode && season !== '0');
        const idPath = isTv ? `series/${cleanImdb}:${season}:${episode}` : `movie/${cleanImdb}`;
        const url = `https://opensubtitles-v3.strem.io/subtitles/${idPath}.json`;
        const res = await axios.get(url, {
            timeout: 6000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            validateStatus: () => true
        });
        if (res.status === 200 && res.data && Array.isArray(res.data.subtitles)) {
            res.data.subtitles.slice(0, 60).forEach((s: any) => {
                if (s.url) {
                    const rawLang = s.lang || 'eng';
                    const langName = resolveLanguageName(rawLang);
                    const langCode = rawLang.substring(0, 2).toLowerCase();
                    const releaseName = cleanReleaseTitle(s.movieReleaseName || s.subtitleFileName || '');
                    subs.push({
                        id: `strem-${s.id || Math.random().toString(36).substring(2, 8)}`,
                        display: releaseName && releaseName.length > 2 ? `${langName} (${releaseName.substring(0, 36)})` : langName,
                        language: langName,
                        langCode: langCode,
                        url: `/api/subtitles/vtt?url=${encodeURIComponent(s.url)}`,
                        rawUrl: s.url,
                        format: 'SRT',
                        source: 'External Subtitles'
                    });
                }
            });
        }
    } catch (e: any) {
        console.warn('Stremio OpenSubtitles v3 fetch notice:', e?.message || e);
    }
    return subs;
}

// External Source: YTS Subtitles Helper (Keyless, fast, direct .zip archives across all languages)
async function fetchYtsSubtitles(imdbId: string, title?: string): Promise<any[]> {
    const subs: any[] = [];
    if (!imdbId) return subs;
    const cleanImdb = imdbId.startsWith('tt') ? imdbId : `tt${imdbId}`;
    try {
        const res = await axios.get(`https://yts-subs.com/movie-imdb/${cleanImdb}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            timeout: 6000,
            validateStatus: () => true
        });
        if (res.status === 200 && res.data) {
            const $ = cheerio.load(res.data);
            $('table.table tbody tr').each((_, tr) => {
                const langRaw = $(tr).find('.sub-lang').text().trim();
                const linkA = $(tr).find('a[href*="/subtitles/"]');
                const href = linkA.attr('href');
                const releaseRaw = linkA.text().replace(/subtitle/i, '').replace(/download/i, '').trim();
                if (href && langRaw) {
                    const slug = href.replace(/\/subtitles\//, '').replace(/\/$/, '');
                    const zipUrl = `https://subtitles.yts-subs.com/subtitles/${slug}.zip`;
                    const langName = resolveLanguageName(langRaw);
                    const langCode = (langRaw.length <= 3 ? langRaw : langName).substring(0, 2).toLowerCase();
                    const cleanRelease = cleanReleaseTitle(releaseRaw);
                    subs.push({
                        id: `yts-${slug}`,
                        display: cleanRelease && cleanRelease.length > 2 ? `${langName} (${cleanRelease.substring(0, 36)})` : langName,
                        language: langName,
                        langCode: langCode,
                        url: `/api/subtitles/vtt?url=${encodeURIComponent(zipUrl)}`,
                        rawUrl: zipUrl,
                        format: 'SRT',
                        source: 'External Subtitles'
                    });
                }
            });
        }
    } catch (e: any) {
        console.warn('YTS subtitles fetch notice:', e?.message || e);
    }
    return subs;
}

// 1. OpenSubtitles Search Helper (With Title Cleaning & Query Fallback)
async function fetchOpenSubtitles(query: string, imdbId?: string, season?: string, episode?: string): Promise<any[]> {
    const subs: any[] = [];
    if (!query && !imdbId) return subs;

    const urlsToTry: string[] = [];
    const cleanImdb = (imdbId || '').replace(/^tt/i, '').trim();

    if (cleanImdb) {
        let u = `https://rest.opensubtitles.org/search/imdbid-${cleanImdb}`;
        if (season && episode && season !== '0') {
            u += `/season-${season}/episode-${episode}`;
        }
        urlsToTry.push(u);
    }

    if (query && query.trim()) {
        urlsToTry.push(`https://rest.opensubtitles.org/search/query-${encodeURIComponent(query.trim())}`);
        const cleanQ = query
            .replace(/\.(mp4|mkv|avi|webm|ts|mov)$/i, '')
            .replace(/(1080p|720p|2160p|4k|hdr|web-?dl|bluray|hdrip|x264|x265|hevc|aac|dts)/gi, ' ')
            .replace(/[\.\[\]\(\)\-_]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        if (cleanQ && cleanQ.toLowerCase() !== query.trim().toLowerCase()) {
            urlsToTry.push(`https://rest.opensubtitles.org/search/query-${encodeURIComponent(cleanQ)}`);
        }
    }

    for (const url of urlsToTry) {
        try {
            const res = await axios.get(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                timeout: 5000,
                validateStatus: () => true
            });

            if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
                res.data.slice(0, 35).forEach((item: any) => {
                    if (item.SubDownloadLink) {
                        const langName = item.LanguageName || 'English';
                        const cleanRel = cleanReleaseTitle(item.MovieReleaseName || item.SubFileName || '');
                        subs.push({
                            id: `os-${item.IDSubtitleFile || item.IDSubtitle || Math.random()}`,
                            display: cleanRel && cleanRel.length > 2 ? `${langName} (${cleanRel.substring(0, 36)})` : langName,
                            language: langName,
                            langCode: (item.ISO639 || item.SubLanguageID || 'en').substring(0, 2).toLowerCase(),
                            url: `/api/subtitles/vtt?url=${encodeURIComponent(item.SubDownloadLink)}`,
                            rawUrl: item.SubDownloadLink,
                            format: item.SubFormat || 'SRT',
                            downloads: item.SubDownloadsCnt || 0,
                            rating: item.SubRating || '0.0',
                            source: 'External Subtitles'
                        });
                    }
                });
                if (subs.length > 0) break; // Found matches
            }
        } catch (e: any) {
            if (e?.code !== 'ENOTFOUND' && e?.code !== 'EAI_AGAIN') {
                console.warn('OpenSubtitles query warning:', e?.message || e);
            }
        }
    }
    return subs;
}

// ==========================================
// 🌸 SPECIALIZED ANIME SUBTITLE PROVIDERS
// ==========================================

// 1. Zoko & MAL/AniList Timed WebVTT Anime Subtitles Provider
async function fetchZokoAnimeSubtitles(title: string, season?: string, episode?: string, malIdParam?: string): Promise<any[]> {
    const subs: any[] = [];
    if (!title && !malIdParam) return subs;

    try {
        let malId: number | null = malIdParam ? parseInt(malIdParam, 10) : null;
        if (!malId && title) {
            malId = await resolveMalIdFromTitle(title);
        }
        if (!malId) return subs;

        const epNum = episode ? parseInt(episode, 10) || 1 : 1;
        const zokoRes = await resolveZokoStream(malId, epNum, 'sub');

        if (zokoRes && zokoRes.success && Array.isArray(zokoRes.subtitles)) {
            zokoRes.subtitles.forEach((s, idx) => {
                if (s.src) {
                    const rawLang = s.lang || 'en';
                    const langName = resolveLanguageName(rawLang);
                    const langCode = rawLang.substring(0, 2).toLowerCase();
                    const cleanLabel = cleanReleaseTitle(s.label || '');

                    subs.push({
                        id: `zoko-${malId}-${epNum}-${idx}`,
                        display: cleanLabel && !cleanLabel.toLowerCase().includes(langName.toLowerCase())
                            ? `${langName} (${cleanLabel})`
                            : langName,
                        language: langName,
                        langCode,
                        url: `/api/subtitles/vtt?url=${encodeURIComponent(s.src)}`,
                        rawUrl: s.src,
                        format: 'VTT',
                        isDefault: s.default || idx === 0,
                        source: 'External Subtitles'
                    });
                }
            });
        }
    } catch (e: any) {
        console.warn('[Anime Subtitles] Zoko fetch notice:', e?.message || e);
    }
    return subs;
}

// 2. Kitsunekko Mirror (Ajatt-Tools/kitsunekko-mirror - 5,100+ Anime Subtitles)
interface KitsunekkoCatalogEntry {
    title: string;
    href: string;
}

let kitsunekkoCatalogCache: KitsunekkoCatalogEntry[] = [];
let kitsunekkoCatalogLastFetch = 0;
let isFetchingKitsunekkoCatalog = false;

async function getKitsunekkoCatalog(): Promise<KitsunekkoCatalogEntry[]> {
    const now = Date.now();
    if (kitsunekkoCatalogCache.length > 0 && (now - kitsunekkoCatalogLastFetch < 12 * 60 * 60 * 1000)) {
        return kitsunekkoCatalogCache;
    }
    if (isFetchingKitsunekkoCatalog) {
        return kitsunekkoCatalogCache;
    }
    isFetchingKitsunekkoCatalog = true;
    try {
        const res = await axios.get('https://subtitles.ajatt.top', {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            timeout: 8000
        });
        const $ = cheerio.load(res.data);
        const entries: KitsunekkoCatalogEntry[] = [];
        $('a[href*=".html"]').each((_, a) => {
            const href = $(a).attr('href');
            const title = $(a).text().trim();
            if (href && href.includes('/') && !href.startsWith('http') && title) {
                entries.push({ title, href });
            }
        });
        if (entries.length > 0) {
            kitsunekkoCatalogCache = entries;
            kitsunekkoCatalogLastFetch = now;
            console.log(`[Kitsunekko Mirror] Loaded ${entries.length} anime catalog titles from Ajatt-Tools mirror`);
        }
    } catch (e: any) {
        console.warn('[Kitsunekko Mirror] Catalog index fetch notice:', e?.message || e);
    } finally {
        isFetchingKitsunekkoCatalog = false;
    }
    return kitsunekkoCatalogCache;
}

// Initial background catalog prefetch
setTimeout(() => {
    getKitsunekkoCatalog().catch(() => {});
}, 3000);

async function fetchKitsunekkoMirror(query: string, season?: string, episode?: string): Promise<any[]> {
    const subs: any[] = [];
    if (!query || !query.trim()) return subs;

    try {
        const catalog = await getKitsunekkoCatalog();
        if (!catalog || catalog.length === 0) return subs;

        const cleanQ = query
            .toLowerCase()
            .replace(/\s*season\s*\d+/i, '')
            .replace(/\s*s\d+/i, '')
            .replace(/[\._\-]/g, ' ')
            .trim();

        // Search catalog for matching anime titles
        const matches = catalog.filter(c => {
            const low = c.title.toLowerCase();
            return low.includes(cleanQ) || cleanQ.includes(low);
        });

        if (matches.length === 0) return subs;

        // Sort by season if provided
        let targetMatches = matches;
        if (season && season !== '1') {
            const seasonMatches = matches.filter(m => 
                m.title.toLowerCase().includes(`${season}nd`) || 
                m.title.toLowerCase().includes(`${season}rd`) || 
                m.title.toLowerCase().includes(`${season}th`) || 
                m.title.toLowerCase().includes(`season ${season}`) || 
                m.title.toLowerCase().includes(`s${season}`)
            );
            if (seasonMatches.length > 0) targetMatches = seasonMatches;
        }

        const topMatches = targetMatches.slice(0, 2);
        const epNum = episode ? parseInt(episode, 10) : undefined;
        const epPadded = epNum !== undefined ? String(epNum).padStart(2, '0') : undefined;

        for (const match of topMatches) {
            try {
                const pageUrl = `https://subtitles.ajatt.top/${match.href}`;
                const pageRes = await axios.get(pageUrl, {
                    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                    timeout: 6000
                });
                const $ = cheerio.load(pageRes.data);

                $('a').each((_, a) => {
                    const href = $(a).attr('href');
                    const text = $(a).text().trim();
                    if (!href) return;
                    const isSub = href.endsWith('.srt') || href.endsWith('.ass') || href.endsWith('.vtt') || href.endsWith('.zip');
                    if (!isSub) return;

                    // Filter by episode if requested
                    if (epNum !== undefined && epPadded) {
                        const regex = new RegExp(`(?:^|[\\s._\\-\\[])${epPadded}(?:[\\s._\\-\\]]|$)`);
                        const regexAlt = new RegExp(`(?:ep|episode|e)[\\s._\\-]*0*${epNum}(?:[\\s._\\-\\]]|$)`, 'i');
                        if (!regex.test(text) && !regexAlt.test(text)) {
                            return;
                        }
                    }

                    const cleanTitle = cleanReleaseTitle(text);
                    const isJa = text.toLowerCase().includes('ja') || text.toLowerCase().includes('jp') || text.toLowerCase().includes('japanese') || href.toLowerCase().includes('ja.');
                    const lang = isJa ? 'Japanese' : 'English';
                    const langCode = isJa ? 'ja' : 'en';

                    subs.push({
                        id: `kit-${Math.random().toString(36).substring(2, 8)}`,
                        display: cleanTitle && cleanTitle.length > 2 ? `${lang} (${cleanTitle.substring(0, 36)})` : `${lang} (${match.title})`,
                        language: lang,
                        langCode,
                        url: `/api/subtitles/vtt?url=${encodeURIComponent(href)}`,
                        rawUrl: href,
                        format: href.endsWith('.ass') ? 'ASS' : (href.endsWith('.zip') ? 'ZIP' : 'SRT'),
                        source: 'External Subtitles'
                    });
                });
            } catch (_) {}
        }
    } catch (e: any) {
        console.warn('[Kitsunekko Mirror] Fetch notice:', e?.message || e);
    }

    return subs.slice(0, 35);
}

// 3. Anime Tosho Helper (Automated Anime Subtitles & Attachments via Official JSON Feed + Attachment Demux)
async function fetchAnimeTosho(query: string, season?: string, episode?: string): Promise<any[]> {
    const subs: any[] = [];
    if (!query || !query.trim()) return subs;

    try {
        const cleanQuery = query.replace(/[\[\]\(\)\-\.]/g, ' ').replace(/\s+/g, ' ').trim();
        const epNum = episode ? parseInt(episode, 10) : undefined;
        const epStr = epNum !== undefined ? String(epNum).padStart(2, '0') : '';
        const searchQuery = (season && episode) ? `${cleanQuery} S${season.padStart(2, '0')}E${epStr}` : (epNum !== undefined ? `${cleanQuery} ${epStr}` : cleanQuery);

        const url = `https://feed.animetosho.net/json?q=${encodeURIComponent(searchQuery)}`;
        const res = await axios.get(url, {
            timeout: 6000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            validateStatus: () => true
        });

        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
            const topEntries = res.data.slice(0, 3);
            for (const item of topEntries) {
                if (!item.link) continue;
                try {
                    const viewRes = await axios.get(item.link, {
                        timeout: 5000,
                        headers: { 'User-Agent': 'Mozilla/5.0' },
                        validateStatus: () => true
                    });
                    if (viewRes.status === 200 && typeof viewRes.data === 'string') {
                        const $ = cheerio.load(viewRes.data);
                        $('a[href*="/subs/file/"]').each((_, a) => {
                            const rawLabel = $(a).text().trim();
                            const href = $(a).attr('href');
                            if (!href) return;
                            const fullUrl = href.startsWith('http') ? href : `https://animetosho.net${href}`;

                            const lowLabel = rawLabel.toLowerCase();
                            let langName = 'English';
                            let langCode = 'en';

                            if (lowLabel.includes('spa') || lowLabel.includes('latin') || lowLabel.includes('spanish')) {
                                langName = 'Spanish'; langCode = 'es';
                            } else if (lowLabel.includes('fre') || lowLabel.includes('french')) {
                                langName = 'French'; langCode = 'fr';
                            } else if (lowLabel.includes('ger') || lowLabel.includes('german') || lowLabel.includes('deu')) {
                                langName = 'German'; langCode = 'de';
                            } else if (lowLabel.includes('ita') || lowLabel.includes('italian')) {
                                langName = 'Italian'; langCode = 'it';
                            } else if (lowLabel.includes('por') || lowLabel.includes('brazilian') || lowLabel.includes('portuguese')) {
                                langName = 'Portuguese'; langCode = 'pt';
                            } else if (lowLabel.includes('ara') || lowLabel.includes('arabic')) {
                                langName = 'Arabic'; langCode = 'ar';
                            } else if (lowLabel.includes('ind') || lowLabel.includes('indonesian')) {
                                langName = 'Indonesian'; langCode = 'id';
                            } else if (lowLabel.includes('tha') || lowLabel.includes('thai')) {
                                langName = 'Thai'; langCode = 'th';
                            } else if (lowLabel.includes('vie') || lowLabel.includes('vietnamese')) {
                                langName = 'Vietnamese'; langCode = 'vi';
                            } else if (lowLabel.includes('rus') || lowLabel.includes('russian')) {
                                langName = 'Russian'; langCode = 'ru';
                            } else if (lowLabel.includes('jpn') || lowLabel.includes('japanese') || lowLabel.includes('ja')) {
                                langName = 'Japanese'; langCode = 'ja';
                            }

                            const format = lowLabel.includes('srt') ? 'SRT' : 'ASS';
                            const display = `${langName} (${rawLabel.replace(/\[.*?\]/g, '').trim() || 'AnimeTosho Full Sub'})`;

                            subs.push({
                                id: `at-${Math.random().toString(36).substring(2, 8)}`,
                                display,
                                language: langName,
                                langCode,
                                url: `/api/subtitles/vtt?url=${encodeURIComponent(fullUrl)}`,
                                rawUrl: fullUrl,
                                format,
                                source: 'External Subtitles'
                            });
                        });
                    }
                } catch (_) {}
            }
        }
    } catch (e: any) {
        console.warn('Anime Tosho fetch notice:', e?.message || e);
    }
    return subs;
}

// 8. Kitsune / Anivexa Native Anime Subtitle Provider (Direct Multi-Language WebVTT/ASS Subtitles)
async function fetchAnivexaSubtitles(query: string, episode?: string, malId?: string): Promise<any[]> {
    const subs: any[] = [];
    if (!query) return subs;

    try {
        const ep = episode ? parseInt(episode, 10) : 1;
        let aniId: number | undefined;

        if (malId && /^\d+$/.test(malId.trim())) {
            aniId = parseInt(malId.trim(), 10);
        }

        if (!aniId) {
            const resolved = await resolveMalIdFromTitle(query).catch(() => null);
            if (resolved) aniId = Number(resolved);
        }

        if (aniId) {
            const aniRes = await fetchAnivexaWatch('reanime', aniId, 'sub', ep).catch(() => null);
            if (aniRes && aniRes.success && Array.isArray(aniRes.subtitles) && aniRes.subtitles.length > 0) {
                aniRes.subtitles.forEach((s: any) => {
                    const label = s.label || s.lang || 'English';
                    const rawUrl = s.file || s.url;
                    if (!rawUrl) return;

                    const lowLabel = label.toLowerCase();
                    let langCode = s.srclang || 'en';
                    let langName = label;

                    if (lowLabel.includes('english') || lowLabel.includes('eng')) { langName = 'English'; langCode = 'en'; }
                    else if (lowLabel.includes('spanish') || lowLabel.includes('spa')) { langName = 'Spanish'; langCode = 'es'; }
                    else if (lowLabel.includes('french') || lowLabel.includes('fre') || lowLabel.includes('fra')) { langName = 'French'; langCode = 'fr'; }
                    else if (lowLabel.includes('german') || lowLabel.includes('ger') || lowLabel.includes('deu')) { langName = 'German'; langCode = 'de'; }
                    else if (lowLabel.includes('portuguese') || lowLabel.includes('por')) { langName = 'Portuguese'; langCode = 'pt'; }
                    else if (lowLabel.includes('italian') || lowLabel.includes('ita')) { langName = 'Italian'; langCode = 'it'; }
                    else if (lowLabel.includes('arabic') || lowLabel.includes('ara')) { langName = 'Arabic'; langCode = 'ar'; }

                    subs.push({
                        id: `ani-${Math.random().toString(36).substring(2, 8)}`,
                        display: `${langName} (${label})`,
                        language: langName,
                        langCode,
                        url: s.url || `/api/subtitles/vtt?url=${encodeURIComponent(rawUrl)}`,
                        rawUrl,
                        format: rawUrl.endsWith('.ass') ? 'ASS' : 'VTT',
                        source: 'External Subtitles'
                    });
                });
            }
        }
    } catch (e: any) {
        console.warn('[AnivexaSubtitles] Fetch notice:', e?.message || e);
    }

    return subs;
}

// 4. SubDL Helper
async function fetchSubDL(query: string, imdbId?: string): Promise<any[]> {
    const subs: any[] = [];
    if (!query && !imdbId) return subs;

    try {
        const url = `https://api.subdl.com/api/v1/subtitles?film_name=${encodeURIComponent(query)}&type=movie`;
        const res = await axios.get(url, {
            timeout: 5000,
            headers: { 'User-Agent': 'Mozilla/5.0' },
            validateStatus: () => true
        });

        if (res.status === 200 && res.data && Array.isArray(res.data.subtitles)) {
            res.data.subtitles.slice(0, 20).forEach((s: any) => {
                const subUrl = s.url || s.link;
                if (subUrl) {
                    const lang = s.lang || 'English';
                    const cleanRel = cleanReleaseTitle(s.release_name || s.name || '');
                    subs.push({
                        id: `subdl-${s.id || Math.random()}`,
                        display: cleanRel ? `${lang} (${cleanRel.substring(0, 36)})` : lang,
                        language: lang,
                        langCode: (s.lang || 'en').substring(0, 2).toLowerCase(),
                        url: `/api/subtitles/vtt?url=${encodeURIComponent(subUrl)}`,
                        rawUrl: subUrl,
                        format: s.format || 'SRT',
                        source: 'External Subtitles'
                    });
                }
            });
        }
    } catch (e: any) {
        console.warn('SubDL fetch warning:', e?.message || e);
    }
    return subs;
}

// 5. MSone Helper (Malayalam Subtitles)
async function fetchMSone(query: string): Promise<any[]> {
    const subs: any[] = [];
    if (!query || !query.trim()) return subs;

    try {
        const searchUrl = `https://malayalamsubtitles.org/?s=${encodeURIComponent(query)}`;
        const response = await axios.get(searchUrl, {
            timeout: 6000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
                'Accept-Language': 'en-US,en;q=0.5'
            },
            validateStatus: () => true
        });

        if (response.status === 403 || response.data.includes('Just a moment...')) {
            console.warn('MSone search blocked by Cloudflare.');
            return subs;
        }

        const $ = cheerio.load(response.data);
        $('article').each((_, el) => {
            const titleElement = $(el).find('.entry-title a');
            const title = titleElement.text().trim();
            const link = titleElement.attr('href');

            if (title && link) {
                const cleanT = cleanReleaseTitle(title);
                subs.push({
                    id: `msone-${Math.random().toString(36).substring(2, 8)}`,
                    display: cleanT ? `Malayalam (${cleanT.substring(0, 36)})` : 'Malayalam',
                    language: 'Malayalam',
                    langCode: 'ml',
                    url: `/api/subtitles/msone?url=${encodeURIComponent(link)}`,
                    rawUrl: link,
                    format: 'ZIP/SRT',
                    source: 'External Subtitles'
                });
            }
        });
    } catch (e: any) {
        console.warn('MSone fetch warning:', e?.message || e);
    }
    return subs;
}

// Comprehensive Subtitle Fetcher (Aggregates OpenSubtitles v3, YTS, Kitsunekko Mirror, Zoko Anime, AnimeTosho, SubDL, MSone)
router.get('/fetch', async (req: Request, res: Response) => {
    const rawTitle = (req.query.title || req.query.q || '') as string;
    let imdbId = (req.query.imdb || req.query.imdb_id || '') as string;
    let tmdbId = (req.query.tmdb || req.query.tmdbId || req.query.tmdb_id || req.query.id || '') as string;
    let malId = (req.query.mal || req.query.malId || '') as string;
    let season = (req.query.season || req.query.s || '') as string;
    let episode = (req.query.episode || req.query.e || '') as string;
    const lang = (req.query.lang || '') as string;
    const provider = (req.query.provider || 'all') as string;

    if (tmdbId && tmdbId.startsWith('tt')) {
        imdbId = tmdbId;
        tmdbId = '';
    }

    // Auto-extract Season and Episode if present in query string (e.g. S01E01)
    if (!season || !episode) {
        const seMatch = rawTitle.match(/s(\d{1,2})[\s._-]*e(\d{1,2})/i) || rawTitle.match(/(\d{1,2})x(\d{1,2})/i);
        if (seMatch) {
            season = String(parseInt(seMatch[1], 10));
            episode = String(parseInt(seMatch[2], 10));
        }
    }

    // Clean title from release tags, hashes, and codec labels
    let title = rawTitle
        .replace(/\.(mp4|mkv|avi|webm|ts|mov)$/i, '')
        .replace(/s\d{1,2}[\s._-]*e\d{1,2}.*$/i, '')
        .replace(/\b(19\d\d|20\d\d)\b.*$/i, '')
        .replace(/(1080p|720p|2160p|4k|hdr|web-?dl|bluray|hdrip|x264|x265|hevc|aac|dts|cakes|eztv|yts|yify|rarbg|ettv|galaxyrg|tgx|vostfr|multi).*$/gi, '')
        .replace(/[\.\[\]\(\)\-_]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    if (!title) title = rawTitle;

    // TMDB metadata resolution for accurate IMDb ID / TMDB ID lookup
    const port = process.env.PORT || 3000;
    if (!imdbId && tmdbId && /^\d+$/.test(tmdbId.trim())) {
        try {
            const cleanId = tmdbId.trim();
            const mediaType = season && episode && season !== '0' ? 'tv' : 'movie';
            const extRes = await axios.get(`http://127.0.0.1:${port}/api/bingr/tmdb-proxy?endpoint=${mediaType}/${cleanId}/external_ids`, {
                timeout: 3500,
                validateStatus: () => true
            });
            if (extRes.status === 200 && extRes.data?.imdb_id) {
                imdbId = extRes.data.imdb_id;
            }
            if (!title) {
                const detRes = await axios.get(`http://127.0.0.1:${port}/api/bingr/tmdb-proxy?endpoint=${mediaType}/${cleanId}`, {
                    timeout: 3500,
                    validateStatus: () => true
                });
                if (detRes.status === 200 && detRes.data) {
                    title = detRes.data.title || detRes.data.name || '';
                }
            }
        } catch (e) {}
    }

    if (!imdbId && title) {
        try {
            const endpoint = season && episode && season !== '0' ? 'search/tv' : 'search/multi';
            const searchRes = await axios.get(`http://127.0.0.1:${port}/api/bingr/tmdb-proxy?endpoint=${endpoint}&query=${encodeURIComponent(title)}`, {
                timeout: 3500,
                validateStatus: () => true
            });
            if (searchRes.status === 200 && searchRes.data?.results?.[0]) {
                const match = searchRes.data.results[0];
                if (!tmdbId) tmdbId = String(match.id);
                const mediaType = match.media_type || (season && episode ? 'tv' : 'movie');
                const extRes = await axios.get(`http://127.0.0.1:${port}/api/bingr/tmdb-proxy?endpoint=${mediaType}/${match.id}/external_ids`, {
                    timeout: 3500,
                    validateStatus: () => true
                });
                if (extRes.status === 200 && extRes.data?.imdb_id) {
                    imdbId = extRes.data.imdb_id;
                }
            }
        } catch (e) {}
    }

    let subtitles: any[] = [];

    // Parallel Subtitle Retrieval
    const tasks: Promise<any[]>[] = [];

    // 0. High-Speed Stremio OpenSubtitles v3 (Multi-Language Subtitles)
    if ((provider === 'all' || provider === 'opensubtitles' || provider === 'external') && imdbId) {
        tasks.push(fetchStremioOpenSubtitles(imdbId, season, episode));
    }

    // 1. External YTS Subtitles (Keyless, fast, multi-language .zip archives)
    if ((provider === 'all' || provider === 'yts' || provider === 'external') && imdbId) {
        tasks.push(fetchYtsSubtitles(imdbId, title));
    }

    // 2. OpenSubtitles Org (Standard & VIP Movies/Shows)
    if (provider === 'all' || provider === 'opensubtitles') {
        tasks.push(fetchOpenSubtitles(title, imdbId, season, episode));
        if (rawTitle !== title) {
            tasks.push(fetchOpenSubtitles(rawTitle, imdbId, season, episode));
        }
    }

    // 3. Specialized Anime Subtitle Provider: Kitsunekko Mirror (Ajatt-Tools/kitsunekko-mirror - 5,100+ Anime Titles)
    if (provider === 'all' || provider === 'anime' || provider === 'kitsunekko') {
        tasks.push(fetchKitsunekkoMirror(title, season, episode));
    }

    // 4. Specialized Anime Subtitle Provider: Zoko & MAL/AniList Timed WebVTT Tracks
    if (provider === 'all' || provider === 'anime' || provider === 'zoko') {
        tasks.push(fetchZokoAnimeSubtitles(title, season, episode, malId));
    }

    // 5. Anime Tosho (Encode-Synced Anime Subtitle Releases & Demuxed ASS/SRT Attachments)
    if (provider === 'all' || provider === 'animetosho' || provider === 'anime') {
        tasks.push(fetchAnimeTosho(title, season, episode));
    }

    // 6. Kitsune / Anivexa Native Anime Subtitles (FlixCloud / MegaCloud Soft Subs in 10+ Languages)
    if (provider === 'all' || provider === 'anivexa' || provider === 'anime') {
        tasks.push(fetchAnivexaSubtitles(title, episode, malId));
    }

    // 7. SubDL
    if (provider === 'all' || provider === 'subdl') {
        tasks.push(fetchSubDL(title, imdbId));
    }

    // 8. MSone (Only when explicitly queried)
    if (provider === 'msone') {
        tasks.push(fetchMSone(title));
    }

    const results = await Promise.allSettled(tasks);
    results.forEach(r => {
        if (r.status === 'fulfilled' && Array.isArray(r.value)) {
            subtitles.push(...r.value);
        }
    });

    // Sanitize any remaining bracket tags or provider tags for zero UI branding
    subtitles = subtitles.map(s => {
        let cleanDisp = (s.display || '')
            .replace(/\[[^\]]*\]\s*/g, '')
            .replace(/\((OpenSubs|OpenSubtitles|AnimeTosho|Kitsunekko|Kitsunekko Mirror|SubDL|MSone|Wyzie|YTS|YIFY|Anivexa)\)/gi, '')
            .trim();
        return {
            ...s,
            display: cleanDisp || s.language || 'English',
            source: 'External Subtitles'
        };
    });

    // Remove duplicates based on rawUrl or display
    const seen = new Set<string>();
    subtitles = subtitles.filter(s => {
        const key = s.rawUrl || s.display;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    // Filter by language if specified
    let filtered = subtitles;
    if (lang && lang !== 'all') {
        const targetLang = lang.toLowerCase();
        filtered = subtitles.filter(s =>
            s.language.toLowerCase().includes(targetLang) ||
            s.langCode.toLowerCase().includes(targetLang)
        );
        if (filtered.length === 0) filtered = subtitles; // Fallback to all if specific language not found
    }

    res.json({
        title,
        imdbId,
        provider,
        count: filtered.length,
        subtitles: filtered
    });
});

// Malayalam Subtitles Portal Scraper
router.get('/search', async (req: Request, res: Response) => {
    const query = req.query.q as string;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const searchUrl = `https://malayalamsubtitles.org/?s=${encodeURIComponent(query)}`;
        const response = await axios.get(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
                'Accept-Language': 'en-US,en;q=0.5'
            },
            validateStatus: () => true
        });

        if (response.status === 403 || response.data.includes('Just a moment...')) {
            return res.json({ error: 'Search blocked by Cloudflare. Please try again later or use OpenSubtitles / SubDL.' });
        }

        const $ = cheerio.load(response.data);
        const results: any[] = [];

        $('article').each((_, el) => {
            const titleElement = $(el).find('.entry-title a');
            const title = titleElement.text().trim();
            const link = titleElement.attr('href');
            const image = $(el).find('img').attr('src');

            if (title && link) {
                results.push({ title, link, image });
            }
        });

        res.json({ results });
    } catch (error: any) {
        console.error('Subtitle search error:', error.message);
        res.status(500).json({ error: 'Failed to fetch subtitles' });
    }
});

// Proxy route for raw subtitle downloads (like MSone zip files) to bypass CORS and Cloudflare blocks
router.get('/download', async (req: Request, res: Response) => {
    const url = req.query.url as string;
    
    if (!url) {
        return res.status(400).json({ error: 'Missing subtitle URL' });
    }

    try {
        const response = await axios.get(url, {
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            validateStatus: () => true
        });

        // MSone passes the file directly through Cloudflare or redirects to it
        if (response.status === 403 || response.status === 404) {
            return res.status(404).json({ error: 'Subtitle file not found or blocked' });
        }

        const contentType = response.headers['content-type'];
        const contentDisposition = response.headers['content-disposition'];
        
        if (contentType && typeof contentType === 'string') res.setHeader('Content-Type', contentType);
        if (contentDisposition && typeof contentDisposition === 'string') {
            res.setHeader('Content-Disposition', contentDisposition);
        } else {
            res.setHeader('Content-Disposition', 'attachment; filename="subtitle.zip"');
        }

        response.data.pipe(res);
    } catch (error: any) {
        console.error('Subtitle download error:', error.message);
        res.status(500).json({ error: 'Failed to download subtitle file' });
    }
});

export default router;
