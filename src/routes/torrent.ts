import { Router } from 'express';
import { spawn, exec, execSync, execFile } from 'child_process';
import path from 'path';
import fs from 'fs';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import axios from 'axios';

const router = Router();

export const getTorrServerBaseUrl = (): string => {
    return (process.env.TORRSERVER_URL || 'http://127.0.0.1:8090').replace(/\/+$/, '');
};

const TMDB_API_KEY = '9d83476d2e27f56748167514c69cd2b4';
const DEFAULT_TRACKERS = [
  'https://tracker.tamersunion.org:443/announce',
  'https://tracker.gbitt.info:443/announce',
  'https://tracker.foreverpirates.co:443/announce',
  'http://nyaa.tracker.wf:7777/announce',
  'wss://tracker.openwebtorrent.com',
  'wss://tracker.btorrent.xyz',
  'wss://tracker.files.fm:7072/announce',
  'http://open.acgnxtracker.com:80/announce',
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://open.stealth.si:80/announce',
  'udp://tracker.torrent.eu.org:451/announce',
  'udp://exodus.desync.com:6969/announce',
  'udp://tracker.dler.org:6969/announce',
  'udp://open.demonii.com:1337/announce',
  'udp://tracker.openbittorrent.com:6969/announce',
  'udp://opentracker.i2p.rocks:6969/announce'
];

async function fetchJsonUrl(url: string) {
    try {
        const res = await axios.get(url, { 
            timeout: 3500,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });
        return res.data;
    } catch (e) {
        return null;
    }
}

function formatBytes(bytes: number, decimals = 2) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function parseSizeBytes(input: any): number {
    if (typeof input === 'number' && !isNaN(input)) return input;
    if (!input || typeof input !== 'string') return 0;
    const str = input.trim();
    const match = str.match(/([\d\.]+)\s*([GMKT]?i?B)/i);
    if (match) {
        const val = parseFloat(match[1]);
        const unit = match[2].toUpperCase().replace('I', '');
        if (unit === 'TB') return val * 1024 * 1024 * 1024 * 1024;
        if (unit === 'GB') return val * 1024 * 1024 * 1024;
        if (unit === 'MB') return val * 1024 * 1024;
        if (unit === 'KB') return val * 1024;
        if (unit === 'B') return val;
    }
    return 0;
}

function getStreamPriorityScore(item: any, isMovie: boolean): number {
    let bytes = item.sizeBytes || 0;
    if (!bytes && item.size) {
        bytes = parseSizeBytes(item.size);
    }
    if (!bytes && item.raw_title) {
        bytes = parseSizeBytes(item.raw_title);
    }

    const sizeInGB = bytes / (1024 * 1024 * 1024);
    const seeders = item.seeders || item.seeds || 0;

    let tierScore = 0;
    if (isMovie) {
        if (sizeInGB >= 1.45 && sizeInGB <= 2.55) {
            tierScore = 300000;
        } else if (sizeInGB > 0 && sizeInGB < 1.45) {
            tierScore = 200000;
        } else if (sizeInGB > 2.55) {
            tierScore = 100000;
        } else {
            tierScore = 50000;
        }
    } else {
        tierScore = 100000;
    }

    return tierScore + Math.min(seeders, 9999);
}

function isTitleMatching(t1: string, t2: string): boolean {
    if (!t1 || !t2) return false;
    const clean1 = String(t1).toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
    const clean2 = String(t2).toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
    if (!clean1 || !clean2) return false;
    if (clean1 === clean2) return true;
    const words1 = clean1.split(/\s+/).filter(w => w.length > 2);
    const words2 = clean2.split(/\s+/).filter(w => w.length > 2);
    if (!words1.length || !words2.length) return clean1.includes(clean2) || clean2.includes(clean1);
    const matchingWords = words1.filter(w => words2.includes(w));
    return (matchingWords.length / words1.length >= 0.5) || (matchingWords.length / words2.length >= 0.5);
}

export function isJunkMedia(name: string, sizeBytes?: number, maxVideoBytes?: number): boolean {
    if (!name) return true;
    const lower = name.toLowerCase();
    const fileName = lower.split(/[\/\\]/).pop() || lower;

    // Filter out image/nfo/text/sample non-video files
    if (/\.(jpg|jpeg|png|gif|webp|nfo|txt|exe|url|sfv|srr|torrent)$/i.test(fileName)) {
        return true;
    }

    // Explicit junk keywords
    if (/(?:^|[\._\- \[\(])(sample|trailer|promo|preview|featurette|backcover|frontcover|cover|bonus|extras?|proof|screen|screener)(?:$|[\._\- \] \)])/i.test(fileName)) {
        return true;
    }
    if (/(?:backcover|frontcover|sample|trailer)\.(?:mp4|mkv|avi|webm|ts|mov)$/i.test(fileName)) {
        return true;
    }

    // Small clips (< 35 MB) when full files are > 120 MB
    if (sizeBytes && maxVideoBytes && maxVideoBytes > 120 * 1024 * 1024 && sizeBytes < 35 * 1024 * 1024) {
        return true;
    }

    return false;
}

export function isVideoFilePath(pathStr: string): boolean {
    if (!pathStr) return false;
    const ext = pathStr.split('.').pop()?.toLowerCase() || '';
    return ['mp4', 'mkv', 'webm', 'avi', 'mov', 'm4v', 'ts', 'flv', 'wmv'].includes(ext);
}

export function findBestTorrentFile(fileStats: any[], targetSeason?: number, targetEpisode?: number, titleHint?: string): any {
    if (!fileStats || !Array.isArray(fileStats) || fileStats.length === 0) return null;

    let maxBytes = 0;
    fileStats.forEach(f => {
        const len = f.length || f.size || 0;
        if (isVideoFilePath(f.path || f.name) && len > maxBytes) {
            maxBytes = len;
        }
    });

    const cleanVideos = fileStats.filter(f => {
        const p = f.path || f.name || '';
        const len = f.length || f.size || 0;
        return isVideoFilePath(p) && !isJunkMedia(p, len, maxBytes);
    });

    const candidatePool = cleanVideos.length > 0 ? cleanVideos : fileStats.filter(f => isVideoFilePath(f.path || f.name));
    if (candidatePool.length === 0) return fileStats[0] || null;

    const s = targetSeason ? parseInt(String(targetSeason), 10) : 0;
    const e = targetEpisode ? parseInt(String(targetEpisode), 10) : 0;

    if (!isNaN(e) && e > 0) {
        // 1. Exact Season + Episode match: S02E03, 2x03, Season 2 Episode 3, S2 - 03
        if (!isNaN(s) && s > 0) {
            const exactMatch = candidatePool.find(f => {
                const name = (f.path || f.name || '').toLowerCase();
                return new RegExp(`s0*${s}e0*${e}\\b`, 'i').test(name) ||
                       new RegExp(`\\b0*${s}x0*${e}\\b`, 'i').test(name) ||
                       new RegExp(`season\\s*0*${s}.*?(?:ep|episode)\\s*0*${e}\\b`, 'i') ||
                       new RegExp(`s0*${s}\\s*-\\s*0*${e}\\b`, 'i');
            });
            if (exactMatch) return exactMatch;
        }

        // 2. Anime Continuous Episode Handling (e.g. Black Clover S2 E3 = Ep 54, S1=51 eps)
        const isBlackClover = (titleHint && /black\s*(?:clover|cover)/i.test(titleHint)) ||
                              candidatePool.some(f => /black\s*clover/i.test(f.path || f.name));
        if (isBlackClover && s === 2) {
            const bcAbsEp = 51 + e; // S2 Ep 3 = 54
            const absMatch = candidatePool.find(f => {
                const name = (f.path || f.name || '').toLowerCase();
                return new RegExp(`(?:-|ep|episode|#|\\s)\\s*0*${bcAbsEp}\\b`, 'i').test(name) ||
                       new RegExp(`\\[0*${bcAbsEp}\\]`, 'i').test(name);
            });
            if (absMatch) return absMatch;
        }

        // 3. Episode number in filename: EP03, Episode 03, - 03, [03]
        const epMatch = candidatePool.find(f => {
            const name = (f.path || f.name || '').toLowerCase();
            if (!isNaN(s) && s > 0) {
                const otherSeason = new RegExp(`s0*(?!${s}\\b)\\d+e`, 'i');
                if (otherSeason.test(name)) return false;
            }
            return new RegExp(`(?:ep|episode|\\s-\\s|#)\\s*0*${e}\\b`, 'i').test(name) ||
                   new RegExp(`\\[0*${e}\\]`, 'i').test(name) ||
                   new RegExp(`\\b0*${e}\\.(?:mp4|mkv|webm|avi)`, 'i').test(name);
        });
        if (epMatch) return epMatch;
    }

    // 4. Default: Prefer MKV/MP4 over AVI, select largest clean video file
    const mkvMp4 = candidatePool.filter(f => !String(f.path || f.name).toLowerCase().endsWith('.avi'));
    if (mkvMp4.length > 0) {
        return mkvMp4.reduce((prev, curr) => ((prev.length || 0) > (curr.length || 0)) ? prev : curr);
    }
    return candidatePool.reduce((prev, curr) => ((prev.length || 0) > (curr.length || 0)) ? prev : curr);
}

function streamTitleMatches(rawTitle: string, targetTitle: string, targetQuery: string): boolean {
    if (!rawTitle) return false;
    if (isJunkMedia(rawTitle)) return false;
    const lowerRaw = rawTitle.toLowerCase();
    
    const cleanTarget = (targetTitle || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
    const cleanQuery = (targetQuery || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
    
    if (cleanTarget && lowerRaw.includes(cleanTarget)) return true;
    if (cleanQuery && lowerRaw.includes(cleanQuery)) return true;

    const wordsTarget = cleanTarget.split(/\s+/).filter(w => w.length > 2);
    const wordsQuery = cleanQuery.split(/\s+/).filter(w => w.length > 2);
    const allWords = Array.from(new Set([...wordsTarget, ...wordsQuery]));
    
    if (allWords.length === 0) return true;
    
    const matchingWords = allWords.filter(w => lowerRaw.includes(w));
    if (allWords.length === 1) {
        return matchingWords.length === 1;
    }
    return (matchingWords.length / allWords.length) >= 0.4;
}

export function streamMatchesEpisode(rawTitle: string, targetSeason: number, targetEpisode: number): boolean {
    if (!targetEpisode || isNaN(targetEpisode)) return true;
    if (isJunkMedia(rawTitle)) return false;
    const lower = rawTitle.toLowerCase();
    
    // Multi-season pack or complete series
    if (/(s\d+[\s\.\-]s\d+|seasons?\s*\d+\s*-\s*\d+|complete\s*(?:series|collection)|full\s*series)/i.test(lower)) {
        return true;
    }

    // Check season constraint
    if (targetSeason && !isNaN(targetSeason) && targetSeason > 0) {
        const seasonMatches = Array.from(lower.matchAll(/\b(?:s|season)\s*0*(\d{1,2})\b/gi));
        if (seasonMatches.length > 0) {
            let hasTargetSeason = false;
            for (const sm of seasonMatches) {
                const foundSeason = parseInt(sm[1], 10);
                if (foundSeason === targetSeason) {
                    hasTargetSeason = true;
                }
            }
            if (!hasTargetSeason) {
                // If title specifies S01 when looking for S02, reject!
                const wrongSeasonRegex = new RegExp(`\\b(?:s|season)\\s*0*(?!${targetSeason}\\b)(\\d{1,2})\\b`, 'i');
                if (wrongSeasonRegex.test(lower)) {
                    return false;
                }
            }
        }
    }

    // Season batch (e.g., "Black Clover Season 2 [1080p]")
    const isSeasonBatch = /(batch|complete|season\s*\d+|s\d+\s*(?:1080p|720p|complete|web-dl))/i.test(lower) && 
                         !new RegExp(`s\\d+e\\d+`, 'i').test(lower);
    if (isSeasonBatch) {
        if (targetSeason && targetSeason > 0) {
            const sRegex = new RegExp(`(?:s|season)\\s*0*${targetSeason}\\b`, 'i');
            return sRegex.test(lower);
        }
        return true;
    }

    // Exact Season + Episode
    if (targetSeason && targetSeason > 0) {
        const exactSeasonEpRegexes = [
            new RegExp(`s0*${targetSeason}e0*${targetEpisode}\\b`, 'i'),
            new RegExp(`\\b0*${targetSeason}x0*${targetEpisode}\\b`, 'i'),
            new RegExp(`season\\s*0*${targetSeason}.*?ep(?:isode)?\\s*0*${targetEpisode}\\b`, 'i'),
            new RegExp(`s0*${targetSeason}\\s*-\\s*0*${targetEpisode}\\b`, 'i')
        ];
        if (exactSeasonEpRegexes.some(r => r.test(lower))) {
            return true;
        }
    }

    // Anime continuous episode check (Black Clover S2 Ep 3 = Ep 54)
    if (lower.includes('black clover') && targetSeason === 2) {
        const bcAbsEp = 51 + targetEpisode;
        if (new RegExp(`(?:-|ep|episode|#|\\s)\\s*0*${bcAbsEp}\\b`, 'i').test(lower) || 
            new RegExp(`\\[0*${bcAbsEp}\\]`, 'i').test(lower)) {
            return true;
        }
    }

    // Explicit episode tags
    const epMatches = Array.from(lower.matchAll(/(?:\bs\d+e|\bep|\bepisode|\s-\s)\s*0*(\d{1,3})\b/gi));
    if (epMatches.length > 0) {
        for (const m of epMatches) {
            const foundEp = parseInt(m[1], 10);
            if (foundEp === targetEpisode) {
                return true;
            }
        }
        return false;
    }

    const epNumStr = String(targetEpisode).padStart(2, '0');
    const epRegs = [
        new RegExp(`s\\d+e${epNumStr}\\b`, 'i'),
        new RegExp(`s\\d+e${targetEpisode}\\b`, 'i'),
        new RegExp(`\\bep\\s*0*${targetEpisode}\\b`, 'i'),
        new RegExp(`-\\s*0*${targetEpisode}\\b`, 'i'),
        new RegExp(`\\[0*${targetEpisode}\\]`, 'i')
    ];
    return epRegs.some(r => r.test(lower));
}

async function fetchNyaaTorrents(queryStr: string): Promise<any[]> {
    if (!queryStr || !queryStr.trim()) return [];
    const mirrors = [
        `https://nyaa.si/?page=rss&f=0&c=0_0&q=${encodeURIComponent(queryStr.trim())}`,
        `https://nyaa.land/?page=rss&f=0&c=0_0&q=${encodeURIComponent(queryStr.trim())}`
    ];
    for (const url of mirrors) {
        try {
            const res = await axios.get(url, {
                timeout: 5000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                    'Accept': 'application/rss+xml, application/xml, text/xml, */*'
                }
            });
            const xmlText = typeof res.data === 'string' ? res.data : String(res.data || '');
            if (!xmlText || !xmlText.includes('<item>')) continue;

            const items: any[] = [];
            const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
            let match;
            while ((match = itemRegex.exec(xmlText)) !== null) {
                const itemBlock = match[1];
                const titleMatch = itemBlock.match(/<title>([\s\S]*?)<\/title>/i);
                const hashMatch = itemBlock.match(/<nyaa:infoHash>([a-f0-9]{40})<\/nyaa:infoHash>/i);
                const seedersMatch = itemBlock.match(/<nyaa:seeders>(\d+)<\/nyaa:seeders>/i);
                const sizeMatch = itemBlock.match(/<nyaa:size>([\s\S]*?)<\/nyaa:size>/i);

                const rawTitle = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
                const hash = hashMatch ? hashMatch[1].toLowerCase() : '';
                const seeders = seedersMatch ? parseInt(seedersMatch[1], 10) : 0;
                const sizeStr = sizeMatch ? sizeMatch[1].trim() : 'Unknown';

                if (hash && rawTitle) {
                    const qualityMatch = rawTitle.match(/(2160p|4K|1080p|720p|HDR|Remux)/i);
                    items.push({
                        name: 'Nyaa',
                        title: rawTitle,
                        raw_title: rawTitle,
                        infoHash: hash,
                        seeders: seeders,
                        size: sizeStr,
                        sizeBytes: parseSizeBytes(sizeStr),
                        quality: qualityMatch ? qualityMatch[1] : '1080p'
                    });
                }
            }
            if (items.length > 0) return items;
        } catch(e) {
            // Silently fallback without logging unhandled network ECONNRESET errors
        }
    }
    return [];
}

async function fetchSolidTorrents(queryStr: string): Promise<any[]> {
    if (!queryStr || !queryStr.trim()) return [];
    try {
        const url = `https://solidtorrents.net/api/v1/search?q=${encodeURIComponent(queryStr.trim())}&category=all`;
        const data = await fetchJsonUrl(url);
        if (data && data.results && Array.isArray(data.results)) {
            return data.results.map((item: any) => {
                const hash = (item.infohash || '').toLowerCase();
                const rawTitle = item.title || '';
                const seeders = item.swarm ? (item.swarm.seeders || 0) : 0;
                const sizeBytes = item.size || 0;
                const qualityMatch = rawTitle.match(/(2160p|4K|1080p|720p|HDR|Remux|CAM|TS)/i);
                return {
                    name: 'SolidTorrents',
                    title: rawTitle,
                    raw_title: rawTitle,
                    infoHash: hash,
                    seeders: seeders,
                    sizeBytes: sizeBytes,
                    size: sizeBytes ? formatBytes(sizeBytes) : 'Unknown',
                    quality: qualityMatch ? qualityMatch[1] : '1080p'
                };
            }).filter((i: any) => i.infoHash && i.title);
        }
    } catch(e) {
        // Silent catch for SolidTorrents
    }
    return [];
}

async function fetchEzTvTorrents(imdbId: string): Promise<any[]> {
    if (!imdbId) return [];
    try {
        const cleanImdb = imdbId.replace(/^tt/i, '');
        const url = `https://eztv.re/api/get-torrents?imdb_id=${cleanImdb}&limit=100`;
        const data = await fetchJsonUrl(url);
        if (data && data.torrents && Array.isArray(data.torrents)) {
            return data.torrents.map((item: any) => {
                const hash = (item.hash || '').toLowerCase();
                const rawTitle = item.title || item.filename || 'EzTV Release';
                const seeders = parseInt(item.seeds, 10) || 0;
                const sizeBytes = parseInt(item.size_bytes, 10) || 0;
                const qualityMatch = rawTitle.match(/(2160p|4K|1080p|720p|HDR|Remux)/i);
                return {
                    name: 'EzTV',
                    title: rawTitle,
                    raw_title: rawTitle,
                    infoHash: hash,
                    seeders: seeders,
                    sizeBytes: sizeBytes,
                    size: sizeBytes ? formatBytes(sizeBytes) : 'Unknown',
                    quality: qualityMatch ? qualityMatch[1] : '720p'
                };
            }).filter((i: any) => i.infoHash);
        }
    } catch(e) {
        // Silent catch for EzTV
    }
    return [];
}

router.get('/api/v1/search', async (req, res) => {
    let query = String(req.query.query || req.query.q || '');
    let tmdbId = String(req.query.tmdb || req.query.tmdb_id || '');
    let imdbId = String(req.query.imdb || req.query.imdb_id || '');
    let mediaType = String(req.query.type || req.query.media_type || 'movie').toLowerCase();
    if (mediaType === 'tv') mediaType = 'series';

    let season = parseInt(String(req.query.season || req.query.s || '1'), 10);
    let episode = parseInt(String(req.query.episode || req.query.e || '1'), 10);

    if (query) {
        // Normalize query string
        let cleanQ = query.trim();

        // 1. Check for reversed Ep X Season Y format: "ep3 s2", "episode 3 season 2", "e3 s2", "ep 03 season 02"
        const epSeMatch = cleanQ.match(/(?:ep|episode|e)\s*0*(\d+)\s*(?:season|s)\s*0*(\d+)/i);
        // 2. Check for standard Season X Ep Y format: "s2e3", "s02e03", "season 2 episode 3", "2x03"
        const seMatch = cleanQ.match(/s0*(\d+)\s*e0*(\d+)/i) || 
                        cleanQ.match(/(\d+)x0*(\d+)/i) || 
                        cleanQ.match(/season\s*0*(\d+)\s*(?:ep|episode)?\s*0*(\d+)/i);
        // 3. Standalone season or episode matches
        const seasonOnlyMatch = cleanQ.match(/(?:season|s)\s*0*(\d+)/i);
        const epOnlyMatch = cleanQ.match(/(?:ep|episode|e)\s*0*(\d+)/i);

        if (epSeMatch) {
            episode = parseInt(epSeMatch[1], 10);
            season = parseInt(epSeMatch[2], 10);
            mediaType = 'series';
            cleanQ = cleanQ.replace(/(?:ep|episode|e)\s*0*\d+\s*(?:season|s)\s*0*\d+/i, '').trim();
        } else if (seMatch) {
            season = parseInt(seMatch[1], 10);
            episode = parseInt(seMatch[2], 10);
            mediaType = 'series';
            cleanQ = cleanQ.replace(/s0*\d+\s*e0*\d+/i, '').replace(/\d+x0*\d+/i, '').replace(/season\s*0*\d+\s*(?:ep|episode)?\s*0*\d+/i, '').trim();
        } else if (seasonOnlyMatch && epOnlyMatch) {
            season = parseInt(seasonOnlyMatch[1], 10);
            episode = parseInt(epOnlyMatch[1], 10);
            mediaType = 'series';
            cleanQ = cleanQ.replace(/(?:season|s)\s*0*\d+/i, '').replace(/(?:ep|episode|e)\s*0*\d+/i, '').trim();
        } else if (epOnlyMatch) {
            episode = parseInt(epOnlyMatch[1], 10);
            mediaType = 'series';
            cleanQ = cleanQ.replace(/(?:ep|episode|e)\s*0*\d+/i, '').trim();
        } else if (seasonOnlyMatch) {
            season = parseInt(seasonOnlyMatch[1], 10);
            mediaType = 'series';
            cleanQ = cleanQ.replace(/(?:season|s)\s*0*\d+/i, '').trim();
        }

        // Clean out leftover noise tokens (e.g. trailing "s2", "e3")
        cleanQ = cleanQ.replace(/\b(?:s\d+|e\d+|season|episode)\b/gi, '').trim();

        // Automatic title typo correction (e.g. "black cover" -> "Black Clover")
        if (/^black\s+cover$/i.test(cleanQ)) {
            cleanQ = 'Black Clover';
        }

        query = cleanQ;
    }

    let title = query || 'Media Stream';
    let year = '2024';

    if (tmdbId && !imdbId) {
        const endpoint = mediaType === 'series' ? 'tv' : 'movie';
        const extUrl = endpoint === 'tv'
            ? `https://api.themoviedb.org/3/tv/${tmdbId}/external_ids?api_key=${TMDB_API_KEY}`
            : `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}`;
        const extData = await fetchJsonUrl(extUrl);
        if (extData) {
            const fetchedTitle = extData.title || extData.name;
            if (!query || (fetchedTitle && isTitleMatching(fetchedTitle, query))) {
                imdbId = extData.imdb_id || (extData.external_ids && extData.external_ids.imdb_id);
                title = fetchedTitle || title;
                if (extData.release_date || extData.first_air_date) {
                    year = (extData.release_date || extData.first_air_date).substring(0, 4);
                }
            } else {
                // TMDB ID mismatch with query string - discard tmdbId to prevent searching wrong title
                tmdbId = '';
            }
        }
    }

    if (!imdbId && !tmdbId && query) {
        const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
        const searchData = await fetchJsonUrl(searchUrl);
        if (searchData && searchData.results && searchData.results.length > 0) {
            const match = searchData.results.find((item: any) => {
                const itemTitle = item.title || item.name;
                return itemTitle && isTitleMatching(itemTitle, query);
            });
            if (match) {
                tmdbId = match.id;
                title = match.title || match.name || query;
                year = (match.release_date || match.first_air_date || '2024').substring(0, 4);
                if (match.media_type === 'tv') mediaType = 'series';
                else if (match.media_type === 'movie') mediaType = 'movie';

                const endpoint = mediaType === 'series' ? 'tv' : 'movie';
                const extUrl = endpoint === 'tv'
                    ? `https://api.themoviedb.org/3/tv/${match.id}/external_ids?api_key=${TMDB_API_KEY}`
                    : `https://api.themoviedb.org/3/movie/${match.id}?api_key=${TMDB_API_KEY}`;
                const extData = await fetchJsonUrl(extUrl);
                if (extData) {
                    imdbId = extData.imdb_id || (extData.external_ids && extData.external_ids.imdb_id);
                }
            }
        }
    }

    const streamsMap = new Map();
    const createMagnet = (hash: string, displayTitle: string) => {
        let mag = `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(displayTitle)}`;
        DEFAULT_TRACKERS.forEach(tr => { mag += `&tr=${encodeURIComponent(tr)}`; });
        return mag;
    };

    const promises: Promise<void>[] = [];
    // Add Torrentio backend fetch
    if (imdbId) {
        promises.push((async () => {
            const torType = mediaType === 'series' ? 'series' : 'movie';
            const streamPath = torType === 'series' ? `${imdbId}:${season}:${episode}` : imdbId;
            const torUrl = `https://torrentio.strem.fun/stream/${torType}/${streamPath}.json`;
            const torData = await fetchJsonUrl(torUrl);
            if (torData && torData.streams) {
                torData.streams.forEach((s: any) => {
                    const hash = s.infoHash;
                    if (hash && !streamsMap.has(hash.toLowerCase())) {
                        const rawTitle = s.title || s.name || title;
                        const qualityMatch = rawTitle.match(/(2160p|4K|1080p|720p|HDR|Remux|CAM|TS)/i);
                        streamsMap.set(hash.toLowerCase(), {
                            name: s.name || 'Torrentio',
                            title: rawTitle,
                            raw_title: rawTitle,
                            magnet: s.magnet || createMagnet(hash, rawTitle),
                            infoHash: hash,
                            seeders: 100, // Torrentio doesn't always give seeders
                            sizeBytes: 0,
                            size: 'Unknown',
                            quality: qualityMatch ? qualityMatch[1] : 'HD'
                        });
                    }
                });
            }
        })());
    }

    // Construct text search terms for PirateBay/APIBay
    const apibayQueries: string[] = [];
    if (query) apibayQueries.push(query);
    if (title && title !== 'Media Stream') {
        if (mediaType === 'series') {
            const sPad = String(season).padStart(2, '0');
            const epPad = String(episode).padStart(2, '0');
            apibayQueries.push(`${title} S${sPad}E${epPad}`);
            apibayQueries.push(`${title} Season ${season}`);
            apibayQueries.push(`${title} S${season}`);
            if (/black\s*clover/i.test(title) && season === 2) {
                const bcEp = 51 + episode;
                apibayQueries.push(`Black Clover 0${bcEp}`);
                apibayQueries.push(`Black Clover ${bcEp}`);
            }
        } else {
            if (year) apibayQueries.push(`${title} ${year}`);
            apibayQueries.push(title);
        }
    }
    const uniqueApibayQueries = Array.from(new Set(apibayQueries.filter(q => q && q.trim().length > 1)));

    uniqueApibayQueries.forEach(searchTerm => {
        promises.push((async () => {
            const data = await fetchJsonUrl(`https://apibay.org/q.php?q=${encodeURIComponent(searchTerm)}`);
            if (Array.isArray(data)) {
                data.forEach((item: any) => {
                    const cat = parseInt(item.category) || 0;
                    const rawTitleLower = (item.name || '').toLowerCase();
                    if (cat >= 500 && cat < 600) return;
                    if (/(xxx|porn|adult|brazzers|naughty|onlyfans)/i.test(rawTitleLower)) return;
                    if (isJunkMedia(item.name)) return;

                    if (item.info_hash && item.info_hash !== '0000000000000000000000000000000000000000') {
                        const hash = item.info_hash.toLowerCase();
                        if (!streamsMap.has(hash)) {
                            const rawTitle = item.name || title;
                            const seeders = parseInt(item.seeders) || 0;
                            const sizeBytes = parseInt(item.size) || 0;
                            const qualityMatch = rawTitle.match(/(2160p|4K|1080p|720p|HDR|Remux|CAM|TS)/i);
                            streamsMap.set(hash, {
                                name: 'ThePirateBay',
                                title: rawTitle,
                                raw_title: rawTitle,
                                magnet: createMagnet(hash, rawTitle),
                                infoHash: hash,
                                seeders: seeders,
                                sizeBytes: sizeBytes,
                                size: sizeBytes ? formatBytes(sizeBytes) : 'Unknown',
                                quality: qualityMatch ? qualityMatch[1] : 'HD'
                            });
                        }
                    }
                });
            }
        })());
    });

    // Query SolidTorrents engine for multi-category movie & series search
    uniqueApibayQueries.slice(0, 2).forEach(searchTerm => {
        promises.push((async () => {
            const solidItems = await fetchSolidTorrents(searchTerm);
            solidItems.forEach(item => {
                if (item.infoHash && !streamsMap.has(item.infoHash) && !isJunkMedia(item.title)) {
                    streamsMap.set(item.infoHash, {
                        ...item,
                        magnet: createMagnet(item.infoHash, item.title)
                    });
                }
            });
        })());
    });

    // Construct Nyaa Anime search queries
    const nyaaQueries: string[] = [];
    if (query) nyaaQueries.push(query);
    if (title && title !== 'Media Stream') {
        if (mediaType === 'series') {
            const sPad = String(season).padStart(2, '0');
            const epNum = String(episode).padStart(2, '0');
            nyaaQueries.push(`${title} S${sPad}E${epNum}`);
            nyaaQueries.push(`${title} - ${epNum}`);
            nyaaQueries.push(`${title} Season ${season}`);
            if (/black\s*clover/i.test(title) && season === 2) {
                const bcEp = 51 + episode;
                nyaaQueries.push(`Black Clover - 0${bcEp}`);
                nyaaQueries.push(`Black Clover ${bcEp}`);
            }
            nyaaQueries.push(`${title} S${season}`);
        } else {
            nyaaQueries.push(title);
        }
    }
    const uniqueNyaaQueries = Array.from(new Set(nyaaQueries.filter(q => q && q.trim().length > 1))).slice(0, 4);

    uniqueNyaaQueries.forEach(searchTerm => {
        promises.push((async () => {
            const nyaaItems = await fetchNyaaTorrents(searchTerm);
            nyaaItems.forEach(item => {
                if (item.infoHash && !streamsMap.has(item.infoHash) && !isJunkMedia(item.title)) {
                    streamsMap.set(item.infoHash, {
                        ...item,
                        magnet: createMagnet(item.infoHash, item.title)
                    });
                }
            });
        })());
    });

    if (mediaType === 'movie') {
        const ytsTerm = title || query;
        if (ytsTerm) {
            promises.push((async () => {
                const data = await fetchJsonUrl(`https://yts.mx/api/v2/list_movies.json?query_term=${encodeURIComponent(ytsTerm)}`);
                if (data && data.data && data.data.movies) {
                    data.data.movies.forEach((m: any) => {
                        if (m.torrents && Array.isArray(m.torrents)) {
                            m.torrents.forEach((t: any) => {
                                if (t.hash) {
                                    const hash = t.hash.toLowerCase();
                                    if (!streamsMap.has(hash)) {
                                        const rawTitle = `${m.title_long || m.title} [${t.quality}] [YTS]`;
                                        const sizeBytes = t.size_bytes || parseSizeBytes(t.size);
                                        streamsMap.set(hash, {
                                            name: 'YTS',
                                            title: rawTitle,
                                            raw_title: rawTitle,
                                            magnet: createMagnet(hash, rawTitle),
                                            infoHash: hash,
                                            seeders: t.seeds || 0,
                                            sizeBytes: sizeBytes,
                                            size: t.size || (sizeBytes ? formatBytes(sizeBytes) : 'Unknown'),
                                            quality: t.quality || '1080p'
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            })());
        }
    }

    if (mediaType === 'series' && imdbId) {
        promises.push((async () => {
            const ezTvItems = await fetchEzTvTorrents(imdbId);
            ezTvItems.forEach(item => {
                if (item.infoHash && !streamsMap.has(item.infoHash)) {
                    streamsMap.set(item.infoHash, {
                        ...item,
                        magnet: createMagnet(item.infoHash, item.title)
                    });
                }
            });
        })());
    }

    if (imdbId) {
        const torrentioType = mediaType === 'series' ? 'series' : 'movie';
        const streamPath = torrentioType === 'series' ? `${imdbId}:${season}:${episode}` : imdbId;
        ['https://torrentio.strem.fun', 'https://annatar.elfhosted.com', 'https://knightcrawler.elfhosted.com', 'https://mediafusion.elfhosted.com', 'https://torrentio.qa.strem.fun', 'https://stremio-yts.strem.fun', 'https://stremio-jackett.strem.fun'].forEach(baseUrl => {
            promises.push((async () => {
                const torData = await fetchJsonUrl(`${baseUrl}/stream/${torrentioType}/${streamPath}.json`);
                if (torData && torData.streams && Array.isArray(torData.streams)) {
                    torData.streams.forEach((s: any) => {
                        const hash = (s.infoHash || '').toLowerCase();
                        if (hash && !streamsMap.has(hash)) {
                            const rawTitle = s.title || s.name || title;
                            const seedMatch = rawTitle.match(/👤\s*(\d+)/);
                            const sizeMatch = rawTitle.match(/💾\s*([\d\.]+\s*[GMK]B)/i);
                            const qualityMatch = rawTitle.match(/(2160p|4K|1080p|720p|HDR|Remux|CAM|TS)/i);
                            const sizeBytes = sizeMatch ? parseSizeBytes(sizeMatch[1]) : parseSizeBytes(rawTitle);
                            streamsMap.set(hash, {
                                name: s.name || 'Stremio',
                                title: `${title} ${mediaType === 'series' ? `S${season}E${episode}` : ''} (${qualityMatch ? qualityMatch[1] : '1080p'})`,
                                raw_title: rawTitle,
                                magnet: s.magnet || createMagnet(hash, title),
                                infoHash: hash,
                                seeders: seedMatch ? parseInt(seedMatch[1]) : 10,
                                sizeBytes: sizeBytes,
                                size: sizeMatch ? sizeMatch[1] : (sizeBytes ? formatBytes(sizeBytes) : 'Unknown'),
                                quality: qualityMatch ? qualityMatch[1] : 'HD'
                            });
                        }
                    });
                }
            })());
        });
    }

    await Promise.allSettled(promises);

    const isMovie = mediaType === 'movie';
    let streams = Array.from(streamsMap.values());

    // Filter streams for title, episode accuracy, and discard junk/backcover/sample files
    streams = streams.filter(s => {
        const rawTitle = s.raw_title || s.title || '';
        if (isJunkMedia(rawTitle)) {
            return false;
        }
        if (!streamTitleMatches(rawTitle, title, query)) {
            return false;
        }
        if (!isMovie && episode) {
            if (!streamMatchesEpisode(rawTitle, season, episode)) {
                return false;
            }
        }
        return true;
    });

    streams.sort((a, b) => {
        const scoreA = getStreamPriorityScore(a, isMovie);
        const scoreB = getStreamPriorityScore(b, isMovie);
        if (scoreB !== scoreA) {
            return scoreB - scoreA;
        }
        return (b.seeders || 0) - (a.seeders || 0);
    });

    res.json({
        query,
        tmdbId,
        imdbId,
        mediaType,
        season,
        episode,
        title,
        year,
        results: streams
    });
});

// Targeted File & Episode Resolver: Automatically finds exact file index inside multi-file torrent
router.get('/api/torrent/resolve-file', async (req, res) => {
    const link = (req.query.link || req.query.hash || '').toString().trim();
    const season = parseInt(String(req.query.season || req.query.s || '0'), 10);
    const episode = parseInt(String(req.query.episode || req.query.e || '0'), 10);
    const titleHint = (req.query.title || '').toString().trim();

    if (!link) {
        return res.status(400).json({ error: 'Missing torrent link or hash' });
    }

    try {
        let hash = link;
        if (link.startsWith('magnet:')) {
            const mMatch = link.match(/xt=urn:btih:([a-zA-Z0-9]+)/i);
            if (mMatch) hash = mMatch[1].toLowerCase();
        }

        // Check if TorrServer already has metadata
        let tsRes: any = await axios.post(`${getTorrServerBaseUrl()}/torrents`, {
            action: 'get',
            hash: hash
        }, { timeout: 3000 }).catch(() => null);

        if (!tsRes || !tsRes.data || !tsRes.data.file_stats) {
            tsRes = await axios.post(`${getTorrServerBaseUrl()}/torrents`, {
                action: 'add',
                link: link,
                save_to_db: false
            }, { timeout: 4000 }).catch(() => null);
        }

        const fileStats = tsRes?.data?.file_stats || tsRes?.data?.files || [];
        if (fileStats.length === 0) {
            return res.json({
                status: 'pending',
                message: 'Metadata still resolving',
                index: 1,
                streamUrl: `/stream?link=${encodeURIComponent(link)}&index=1&play=1`
            });
        }

        const bestFile = findBestTorrentFile(fileStats, season, episode, titleHint || tsRes?.data?.title);
        const selectedId = bestFile ? (bestFile.id || 1) : 1;

        res.json({
            status: 'resolved',
            selectedFile: bestFile ? {
                id: bestFile.id,
                path: bestFile.path || bestFile.name,
                length: bestFile.length || bestFile.size,
                sizeFormatted: formatBytes(bestFile.length || bestFile.size || 0)
            } : null,
            index: selectedId,
            season,
            episode,
            streamUrl: `/stream?link=${encodeURIComponent(link)}&index=${selectedId}&play=1`
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message, index: 1 });
    }
});

function parseDurationString(str: string): number {
    if (!str) return 0;
    const s = str.trim();
    if (!isNaN(parseFloat(s)) && !s.includes(':')) {
        return parseFloat(s);
    }
    const match = s.match(/(?:(\d+):)?(\d+):(\d+)(?:\.(\d+))?/);
    if (match) {
        const hours = parseInt(match[1] || '0', 10);
        const mins = parseInt(match[2] || '0', 10);
        const secs = parseInt(match[3] || '0', 10);
        const ms = match[4] ? parseFloat('0.' + match[4]) : 0;
        return hours * 3600 + mins * 60 + secs + ms;
    }
    return 0;
}

const durationCache = new Map<string, number>();

function getVideoDuration(streamUrl: string): Promise<number> {
    if (durationCache.has(streamUrl)) {
        return Promise.resolve(durationCache.get(streamUrl) || 0);
    }
    return new Promise((resolve) => {
        const args = [
            '-v', 'quiet',
            '-print_format', 'json',
            '-show_format',
            '-show_streams',
            '-analyzeduration', '3000000',
            '-probesize', '3000000',
            '-i', streamUrl
        ];
        execFile('ffprobe', args, { timeout: 4000 }, async (error, stdout) => {
            if (!error && stdout) {
                try {
                    const data = JSON.parse(stdout);
                    let foundDuration = 0;
                    
                    if (data.format && data.format.duration) {
                        const dur = parseFloat(data.format.duration);
                        if (!isNaN(dur) && dur > 0) foundDuration = dur;
                    }
                    
                    if (!foundDuration && data.streams && Array.isArray(data.streams)) {
                        for (const stream of data.streams) {
                            if (stream.duration) {
                                const dur = parseFloat(stream.duration);
                                if (!isNaN(dur) && dur > 0) {
                                    foundDuration = dur;
                                    break;
                                }
                            }
                            if (stream.tags) {
                                for (const [k, v] of Object.entries(stream.tags)) {
                                    if (k.toUpperCase().includes('DURATION') && typeof v === 'string') {
                                        const dur = parseDurationString(v);
                                        if (dur > 0) {
                                            foundDuration = dur;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (foundDuration) break;
                        }
                    }
                    
                    if (!foundDuration && data.format && data.format.tags) {
                        for (const [k, v] of Object.entries(data.format.tags)) {
                            if (k.toUpperCase().includes('DURATION') && typeof v === 'string') {
                                const dur = parseDurationString(v);
                                if (dur > 0) {
                                    foundDuration = dur;
                                    break;
                                }
                            }
                        }
                    }
                    
                    if (foundDuration > 0) {
                        durationCache.set(streamUrl, foundDuration);
                        return resolve(foundDuration);
                    }
                } catch(e) {}
            }

            // Fallback: Query TorrServer directly for torrent file stats
            try {
                const urlObj = new URL(streamUrl);
                const link = urlObj.searchParams.get('link');
                const indexStr = urlObj.searchParams.get('index') || '1';
                if (link) {
                    const tsRes = await axios.post(`${getTorrServerBaseUrl()}/torrents`, {
                        action: 'get',
                        hash: link
                    }, { timeout: 2000 }).catch(() => null);
                    if (tsRes?.data?.file_stats) {
                        const idx = parseInt(indexStr, 10);
                        const file = tsRes.data.file_stats.find((f: any) => f.id === idx) || tsRes.data.file_stats[0];
                        if (file && file.length && file.length > 0) {
                            // Estimate duration based on standard bitrate (~2.2 Mbps) if metadata isn't probed yet
                            const estimatedSecs = Math.round(file.length / 280000);
                            if (estimatedSecs > 60) {
                                durationCache.set(streamUrl, estimatedSecs);
                                return resolve(estimatedSecs);
                            }
                        }
                    }
                }
            } catch (e2) {}

            resolve(0);
        });
    });
}

router.get('/api/torrent/duration', async (req, res) => {
    let urlStr = (req.query.url || req.query.link || '').toString().trim();
    if (!urlStr) return res.status(400).json({ error: 'Missing stream URL' });
    if (urlStr.startsWith('/')) {
        const port = process.env.PORT || 3000;
        urlStr = `http://127.0.0.1:${port}${urlStr}`;
    }
    const duration = await getVideoDuration(urlStr);
    res.json({ duration });
});

function convertSrtToVtt(srtText: string): string {
    if (!srtText) return 'WEBVTT\n\n';
    let text = srtText.trim();
    if (text.startsWith('WEBVTT')) return text;

    // Check for ASS/SSA format
    if (text.includes('[Events]') && text.includes('Dialogue:')) {
        const lines = text.split(/\r?\n/);
        let vtt = 'WEBVTT\n\n';
        let count = 1;
        for (const line of lines) {
            if (line.startsWith('Dialogue:')) {
                const parts = line.substring(9).split(',');
                if (parts.length >= 10) {
                    const start = parts[1].trim();
                    const end = parts[2].trim();
                    let dialogText = parts.slice(9).join(',').trim();
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
                    dialogText = dialogText.replace(/\{[^}]+\}/g, '').replace(/\\N/g, '\n').replace(/\\n/g, '\n').trim();
                    if (dialogText) {
                        vtt += `${count++}\n${padTime(start)} --> ${padTime(end)}\n${dialogText}\n\n`;
                    }
                }
            }
        }
        if (count > 1) return vtt;
    }

    let vtt = srtText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    vtt = vtt.replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, '$1.$2');
    if (!vtt.trim().startsWith('WEBVTT')) {
        vtt = 'WEBVTT\n\n' + vtt;
    }
    return vtt;
}

router.get('/api/torrent/check-subtitles', async (req, res) => {
    const link = (req.query.link || req.query.hash || '').toString().trim();
    if (!link) return res.json({ subtitles: [] });
    try {
        let hash = link;
        if (link.startsWith('magnet:')) {
            const mMatch = link.match(/xt=urn:btih:([a-zA-Z0-9]+)/i);
            if (mMatch) hash = mMatch[1].toLowerCase();
        }
        let response: any = await axios.post(`${getTorrServerBaseUrl()}/torrents`, {
            action: 'add',
            link: link,
            save_to_db: false
        }, { timeout: 3000 }).catch(() => null);

        if (!response || !response.data) {
            response = await axios.post(`${getTorrServerBaseUrl()}/torrents`, {
                action: 'get',
                hash: hash
            }, { timeout: 3000 }).catch(() => null);
        }

        const torrentData = response?.data;
        const fileStats = torrentData?.file_stats || torrentData?.files || [];
        const subtitles: any[] = [];

        fileStats.forEach((f: any) => {
            const filePath = f.path || f.name || '';
            const lower = filePath.toLowerCase();
            if (lower.endsWith('.srt') || lower.endsWith('.vtt') || lower.endsWith('.sub') || lower.endsWith('.ass')) {
                const parts = filePath.split('/');
                const fileName = parts[parts.length - 1];
                subtitles.push({
                    id: f.id,
                    name: fileName,
                    path: filePath,
                    url: `/api/torrent/srt-proxy?link=${encodeURIComponent(link)}&index=${f.id}`
                });
            }
        });
        res.json({ subtitles });
    } catch (e: any) {
        res.json({ subtitles: [] });
    }
});

router.get('/api/torrent/srt-proxy', async (req, res) => {
    const link = (req.query.link || '').toString().trim();
    const index = (req.query.index || '1').toString().trim();
    if (!link) return res.status(400).send('Missing link');
    const streamUrl = `${getTorrServerBaseUrl()}/stream?link=${encodeURIComponent(link)}&index=${encodeURIComponent(index)}&play=1`;
    try {
        const response = await axios.get(streamUrl, {
            responseType: 'text',
            timeout: 5000
        });
        const vttContent = convertSrtToVtt(response.data);
        res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.send(vttContent);
    } catch (e: any) {
        // Return valid empty WebVTT with 200 OK so video players don't crash or trigger broken track alerts
        res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('WEBVTT\n\n');
    }
});

router.get('/api/torrent/audio-tracks', async (req, res) => {
    let urlStr = (req.query.url || '').toString().trim();
    const link = (req.query.link || '').toString().trim();
    const index = (req.query.index || '1').toString().trim();
    if (!urlStr && link) {
        urlStr = `${getTorrServerBaseUrl()}/stream?link=${encodeURIComponent(link)}&index=${encodeURIComponent(index)}&play=1`;
    }
    if (urlStr && urlStr.startsWith('/')) {
        const port = process.env.PORT || 3000;
        urlStr = `http://127.0.0.1:${port}${urlStr}`;
    }
    if (!urlStr) return res.status(400).json({ tracks: [] });

    const cmd = `ffprobe -v error -select_streams a -show_entries stream=index,codec_name:stream_tags=language,title -of json "${urlStr}"`;
    exec(cmd, { timeout: 6000 }, (error, stdout) => {
        if (error || !stdout) {
            return res.json({ tracks: [{ index: 0, streamIndex: 0, label: 'Default Audio Track (AAC)', lang: 'default' }] });
        }
        try {
            const data = JSON.parse(stdout);
            const streams = data.streams || [];
            if (streams.length === 0) {
                return res.json({ tracks: [{ index: 0, streamIndex: 0, label: 'Default Audio Track', lang: 'default' }] });
            }
            const tracks = streams.map((st: any, i: number) => {
                const lang = st.tags?.language || st.tags?.LANGUAGE || 'und';
                const title = st.tags?.title || st.tags?.TITLE || `Track ${i + 1}`;
                const codec = st.codec_name || 'aac';
                return {
                    index: i,
                    streamIndex: st.index,
                    label: `${title} [${lang.toUpperCase()}] (${codec.toUpperCase()})`,
                    lang: lang,
                    codec: codec
                };
            });
            res.json({ tracks });
        } catch (e) {
            res.json({ tracks: [{ index: 0, streamIndex: 0, label: 'Default Audio Track', lang: 'default' }] });
        }
    });
});

router.get('/api/torrent/download', async (req: any, res: any) => {
    const hash = String(req.query.hash || '');
    const index = String(req.query.index || '1');
    let filename = String(req.query.filename || 'torrent_video.mp4').replace(/["\r\n]/g, '_');

    if (!hash) {
        return res.status(400).send('Missing torrent hash parameter');
    }

    if (!/\.(mp4|mkv|avi|mov|webm|flv|ts)$/i.test(filename)) {
        filename += '.mp4';
    }

    const targetUrl = `${getTorrServerBaseUrl()}/stream?link=${encodeURIComponent(hash)}&index=${encodeURIComponent(index)}&play=1`;

    try {
        const parsedUrl = new URL(targetUrl);
        const isHttps = parsedUrl.protocol === 'https:';
        const client = isHttps ? require('https') : require('http');
        const defaultPort = isHttps ? 443 : 80;
        const proxyReq = client.request({
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || defaultPort,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET',
            headers: {
                ...req.headers,
                host: parsedUrl.port ? `${parsedUrl.hostname}:${parsedUrl.port}` : parsedUrl.hostname
            }
        }, (proxyRes: any) => {
            const ext = filename.split('.').pop()?.toLowerCase() || 'mp4';
            let contentType = 'video/mp4';
            if (ext === 'mkv') contentType = 'video/x-matroska';
            else if (ext === 'avi') contentType = 'video/x-msvideo';

            res.setHeader('Content-Type', proxyRes.headers['content-type'] || contentType);
            if (proxyRes.headers['content-length']) {
                res.setHeader('Content-Length', proxyRes.headers['content-length']);
            }
            res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"; filename*=UTF-8''${encodeURIComponent(filename)}`);

            res.writeHead(proxyRes.statusCode || 200);
            proxyRes.pipe(res);
        });

        proxyReq.on('error', (err: any) => {
            if (!res.headersSent) {
                res.status(502).send('Error streaming download from TorrServer');
            }
        });

        proxyReq.end();
    } catch (e: any) {
        if (!res.headersSent) {
            res.status(500).send('Download request failed');
        }
    }
});

router.all('/api/torrent/stream-ffmpeg', async (req: any, res: any) => {
    let urlStr = (req.query.url || '').toString().trim();
    const link = (req.query.link || '').toString().trim();
    const index = (req.query.index || '1').toString().trim();
    const mode = (req.query.mode || 'remux').toString().trim();
    const startTime = (req.query.startTime || req.query.ss || req.query.start || '0').toString();
    const audioTrack = (req.query.audioTrack || req.query.a || '').toString().trim();

    if (!urlStr && link) {
        urlStr = `${getTorrServerBaseUrl()}/stream?link=${encodeURIComponent(link)}&index=${encodeURIComponent(index)}&play=1&preload=1`;
    }
    if (!urlStr) return res.status(400).send('Missing stream URL or torrent link');
    if (urlStr.startsWith('/')) {
        const port = process.env.PORT || 3000;
        urlStr = `http://127.0.0.1:${port}${urlStr}`;
    }

    let exactDuration = durationCache.get(urlStr) || 0;
    if (exactDuration === 0 && (req.method === 'HEAD' || req.query.probe === '1')) {
        exactDuration = await getVideoDuration(urlStr);
    } else if (exactDuration === 0) {
        // Trigger background duration probe for subsequent queries
        getVideoDuration(urlStr).catch(() => {});
    }

    res.setHeader('Content-Type', 'video/x-matroska');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Expose-Headers', 'X-Video-Duration');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Connection', 'keep-alive');

    if (exactDuration > 0) {
        res.setHeader('X-Video-Duration', exactDuration.toString());
    }

    if (req.method === 'HEAD') return res.status(200).end();
    if (req.method === 'OPTIONS') return res.status(204).end();

    res.status(200);

    let videoArgs: string[] = [];
    if (mode === 'transcode') {
        videoArgs = ['-c:v', 'libx264', '-preset', 'ultrafast', '-tune', 'zerolatency', '-crf', '24', '-threads', '0', '-pix_fmt', 'yuv420p'];
    } else {
        videoArgs = ['-c:v', 'copy'];
    }

    let audioArgs: string[] = ['-c:a', 'aac', '-ac', '2', '-b:a', '128k', '-ar', '44100'];
    if (audioTrack !== '') {
        const aIdx = parseInt(audioTrack, 10);
        if (!isNaN(aIdx)) {
            audioArgs = ['-map', '0:v:0', '-map', `0:a:${aIdx}`, '-c:a', 'aac', '-ac', '2', '-b:a', '128k', '-ar', '44100'];
        }
    }

    const ffmpegArgs = [
        '-loglevel', 'warning',
        ...(startTime && startTime !== '0' ? ['-ss', startTime] : []),
        '-analyzeduration', '3000000',
        '-probesize', '3000000',
        '-fflags', '+nobuffer+genpts+discardcorrupt+igndts',
        '-reconnect', '1',
        '-reconnect_streamed', '1',
        '-reconnect_delay_max', '5',
        '-i', urlStr,
        ...videoArgs,
        ...audioArgs,
        '-sn', '-dn',
        '-avoid_negative_ts', 'make_zero',
        '-f', 'matroska',
        'pipe:1'
    ];

    const ffmpegProcess = spawn('ffmpeg', ffmpegArgs);
    ffmpegProcess.stdout.pipe(res);
    ffmpegProcess.on('error', (err) => { console.error('[FFmpeg] Spawn error:', err); });
    let errLog = '';
    ffmpegProcess.stderr.on('data', (d) => { errLog += d.toString(); });
    ffmpegProcess.on('close', (code) => { if (code !== 0) console.error('[FFmpeg] Process closed with code', code, 'Error log:', errLog); });
    ffmpegProcess.stdin.on('error', () => {});
    ffmpegProcess.stdout.on('error', () => {});
    res.on('error', () => { try { ffmpegProcess.kill('SIGKILL'); } catch (e) {} });

    req.on('close', () => {
        try { ffmpegProcess.kill('SIGKILL'); } catch (e) {}
    });
});

export function setupTorrentProxies(app: any) {
    let torrProcess: any = null;
    let isStarting = false;
    const isWin = process.platform === 'win32';
    const binPath = path.join(process.cwd(), 'bin');
    if (!fs.existsSync(binPath)) {
        fs.mkdirSync(binPath, { recursive: true });
    }
    const torrServerName = isWin ? 'TorrServer.exe' : 'TorrServer';
    const torrServerPath = path.join(binPath, torrServerName);
    const dbPath = path.join('/tmp', 'torr_db');
    if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath, { recursive: true });

    const configDbPath = path.join(dbPath, 'config.db');
    const lockDbPath = path.join(dbPath, 'config.db.lock');

    async function ensureTorrServerBinary(): Promise<boolean> {
        if (fs.existsSync(torrServerPath) && fs.statSync(torrServerPath).size > 1000000) {
            return true;
        }
        console.log("[TorrServer] Binary missing or invalid (<1MB). Downloading TorrServer...");
        try {
            const platform = process.platform;
            const arch = process.arch;
            let url = 'https://github.com/YouROK/TorrServer/releases/download/MatriX.134/TorrServer-linux-amd64';
            if (platform === 'linux' && (arch === 'arm64' || (arch as string) === 'aarch64')) {
                url = 'https://github.com/YouROK/TorrServer/releases/download/MatriX.134/TorrServer-linux-arm64';
            } else if (platform === 'win32') {
                url = 'https://github.com/YouROK/TorrServer/releases/download/MatriX.134/TorrServer-windows-amd64.exe';
            } else if (platform === 'darwin') {
                url = arch === 'arm64' 
                    ? 'https://github.com/YouROK/TorrServer/releases/download/MatriX.134/TorrServer-darwin-arm64'
                    : 'https://github.com/YouROK/TorrServer/releases/download/MatriX.134/TorrServer-darwin-amd64';
            }
            
            const response = await axios({
                method: 'get',
                url: url,
                responseType: 'stream',
                timeout: 30000,
                maxRedirects: 5
            });
            
            const writer = fs.createWriteStream(torrServerPath);
            response.data.pipe(writer);
            
            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
            
            if (!isWin) {
                fs.chmodSync(torrServerPath, 0o755);
            }
            console.log("[TorrServer] Successfully downloaded TorrServer binary.");
            return true;
        } catch (e: any) {
            console.error("[TorrServer] Failed to download TorrServer binary:", e.message);
            return false;
        }
    }

    startTorrServer();

    function cleanupDbFiles() {
        try {
            if (fs.existsSync(lockDbPath)) fs.unlinkSync(lockDbPath);
            if (fs.existsSync(configDbPath)) fs.unlinkSync(configDbPath);
        } catch (e: any) {}
    }

    async function isTorrServerHealthy(): Promise<boolean> {
        try {
            const res = await axios.get(`${getTorrServerBaseUrl()}/echo`, { timeout: 2000 });
            return res.status === 200;
        } catch (e) {
            return false;
        }
    }

    async function startTorrServer() {
        if (isStarting) return;
        isStarting = true;

        const healthy = await isTorrServerHealthy();
        if (healthy) {
            console.log(`[TorrServer] Service is already running and healthy at ${getTorrServerBaseUrl()}`);
            isStarting = false;
            return;
        }

        // If user configured an external TorrServer URL, do not try to spawn local binary
        if (process.env.TORRSERVER_URL && process.env.TORRSERVER_URL !== 'http://127.0.0.1:8090') {
            console.warn(`[TorrServer] External URL ${process.env.TORRSERVER_URL} is currently unreachable. Waiting for remote service...`);
            isStarting = false;
            return;
        }

        const binaryOk = await ensureTorrServerBinary();
        if (!binaryOk) {
            console.error("[TorrServer] Failed to prepare binary.");
            isStarting = false;
            return;
        }

        console.log("Starting TorrServer on port 8090...");
        try { if (!isWin) execSync('pkill -9 TorrServer || true'); } catch(e) {}
        if (torrProcess) {
            try { torrProcess.kill('SIGKILL'); } catch (e) {}
        }
        await new Promise(r => setTimeout(r, 500));

        if (fs.existsSync(lockDbPath)) {
            try { fs.unlinkSync(lockDbPath); } catch (e) {}
        }

        if (!isWin && fs.existsSync(torrServerPath)) {
            try { fs.chmodSync(torrServerPath, 0o755); } catch (e) {}
        }

        try {
            torrProcess = spawn(torrServerPath, ['-p', '8090', '-d', dbPath], { 
                cwd: binPath,
                env: { ...process.env, GOGC: '50', GOMEMLIMIT: '512MiB' } 
            });

            torrProcess.on('error', (err: any) => {
                console.error('[TorrServer] Spawn error:', err.message);
                isStarting = false;
            });

            torrProcess.stdout.on('data', (d: any) => console.log(`[TorrServer] ${d.toString().trim()}`));
            torrProcess.stderr.on('data', (d: any) => console.error(`[TorrServer] ${d.toString().trim()}`));
            torrProcess.on('close', (code: number) => {
                isStarting = false;
                console.log(`TorrServer exited with code ${code}.`);
                cleanupDbFiles();
                if (code !== 0 && code !== null) {
                    setTimeout(startTorrServer, 5000);
                }
            });
        } catch (spawnErr: any) {
            console.error('[TorrServer] Spawn exception:', spawnErr?.message || spawnErr);
            isStarting = false;
            return;
        }

        let retries = 10;
        while (retries > 0) {
            await new Promise(r => setTimeout(r, 300));
            if (await isTorrServerHealthy()) {
                break;
            }
            retries--;
        }

        isStarting = false;

        try {
            await axios.post(`${getTorrServerBaseUrl()}/settings`, {
                action: 'set',
                sets: {
                    CacheSize: 104857600,
                    ConnectionsLimit: 45,
                    PreloadCache: 1,
                    ReaderReadAHead: 15,
                    ResponsiveMode: true,
                    RemoveCacheOnDrop: true,
                    TorrentDisconnectTimeout: 20,
                    EnableDHT: true,
                    EnablePEX: true,
                    EnableIPv4: true,
                    EnableIPv6: false,
                    BTHandshakeTimeout: 5
                }
            }, { timeout: 3000 });
            console.log("[TorrServer] Initialized default fast-seeking memory settings with cloud P2P optimizations");
        } catch(e) {}
    }

    app.use(router);

    const handleTorrApiProxy = async (req: any, res: any, retryCount = 0) => {
        const maxRetries = 25;
        const targetUrl = `${getTorrServerBaseUrl()}${req.originalUrl}`;

        try {
            const payload = (req.method !== 'GET' && req.method !== 'HEAD' && req.body) 
                ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body))
                : undefined;

            const response = await axios({
                method: req.method,
                url: targetUrl,
                data: payload,
                headers: {
                    'Content-Type': req.headers['content-type'] || 'application/json',
                    'User-Agent': req.headers['user-agent'] || 'StalkerPro'
                },
                timeout: 30000,
                validateStatus: () => true
            });

            res.status(response.status);
            res.setHeader('Access-Control-Allow-Origin', '*');
            if (typeof response.data === 'object') {
                res.setHeader('Content-Type', 'application/json');
                res.json(response.data);
            } else {
                res.send(response.data);
            }
        } catch (err: any) {
            if (retryCount < maxRetries) {
                if (!isStarting) startTorrServer();
                await new Promise(r => setTimeout(r, 500));
                return handleTorrApiProxy(req, res, retryCount + 1);
            }
            if (!res.headersSent) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(502).json({ status: "error", message: "TorrServer service starting up." });
            }
        }
    };

    // Active stream connection counter & auto-cleanup tracker
    const activeStreamConnections = new Map<string, number>();
    const streamCleanupTimers = new Map<string, NodeJS.Timeout>();

    function extractHashFromReq(req: any): string | null {
        const link = (req.query?.link || req.query?.hash || '').toString().trim();
        if (link) {
            if (link.startsWith('magnet:')) {
                const m = link.match(/xt=urn:btih:([a-zA-Z0-9]+)/i);
                if (m) return m[1].toLowerCase();
            }
            if (/^[a-fA-F0-9]{40}$/.test(link) || /^[a-zA-Z2-7]{32}$/.test(link)) {
                return link.toLowerCase();
            }
        }
        const urlStr = req.originalUrl || req.url || '';
        const mMatch = urlStr.match(/xt=urn:btih:([a-zA-Z0-9]+)/i) || 
                       urlStr.match(/link=([a-fA-F0-9]{40})/i) || 
                       urlStr.match(/link=([a-zA-Z2-7]{32})/i) ||
                       urlStr.match(/hash=([a-fA-F0-9]{40})/i);
        if (mMatch) return mMatch[1].toLowerCase();
        return null;
    }

    function markStreamStarted(hash: string) {
        if (!hash) return;
        if (streamCleanupTimers.has(hash)) {
            clearTimeout(streamCleanupTimers.get(hash)!);
            streamCleanupTimers.delete(hash);
        }
        const current = activeStreamConnections.get(hash) || 0;
        activeStreamConnections.set(hash, current + 1);
    }

    function markStreamEnded(hash: string) {
        if (!hash) return;
        const current = (activeStreamConnections.get(hash) || 1) - 1;
        if (current <= 0) {
            activeStreamConnections.delete(hash);
            if (streamCleanupTimers.has(hash)) {
                clearTimeout(streamCleanupTimers.get(hash)!);
            }
            const timer = setTimeout(async () => {
                streamCleanupTimers.delete(hash);
                if (!activeStreamConnections.has(hash)) {
                    try {
                        console.log(`[TorrServer Auto-Cleanup] User closed connection. Dropping & removing torrent: ${hash}`);
                        await axios.post(`${getTorrServerBaseUrl()}/torrents`, { action: 'drop', hash }, { timeout: 3000 }).catch(() => null);
                        await axios.post(`${getTorrServerBaseUrl()}/torrents`, { action: 'rem', hash }, { timeout: 3000 }).catch(() => null);
                    } catch (e: any) {}
                }
            }, 15000); // 15 seconds grace period for pause/scrubbing
            streamCleanupTimers.set(hash, timer);
        } else {
            activeStreamConnections.set(hash, current);
        }
    }

    // Periodic orphan torrent reaper (cleans up any abandoned torrents every 45s)
    setInterval(async () => {
        try {
            const res = await axios.post(`${getTorrServerBaseUrl()}/torrents`, { action: 'list' }, { timeout: 4000 }).catch(() => null);
            if (res && Array.isArray(res.data) && res.data.length > 0) {
                for (const t of res.data) {
                    const tHash = (t.hash || '').toLowerCase();
                    if (tHash && !activeStreamConnections.has(tHash) && !streamCleanupTimers.has(tHash)) {
                        const activePeers = t.active_peers || 0;
                        if (activePeers === 0) {
                            console.log(`[TorrServer Reaper] Purging inactive orphan torrent: ${t.title || tHash}`);
                            await axios.post(`${getTorrServerBaseUrl()}/torrents`, { action: 'drop', hash: tHash }, { timeout: 3000 }).catch(() => null);
                            await axios.post(`${getTorrServerBaseUrl()}/torrents`, { action: 'rem', hash: tHash }, { timeout: 3000 }).catch(() => null);
                        }
                    }
                }
            }
        } catch (e) {}
    }, 45000);

    const handleTorrStreamProxy = (req: any, res: any, retryCount = 0) => {
        const maxRetries = 15;
        const targetUrl = `${getTorrServerBaseUrl()}${req.originalUrl}`;
        const torrentHash = extractHashFromReq(req);
        if (torrentHash) {
            markStreamStarted(torrentHash);
        }
        
        try {
            const parsedUrl = new URL(targetUrl);
            const isHttps = parsedUrl.protocol === 'https:';
            const client = isHttps ? require('https') : require('http');
            const defaultPort = isHttps ? 443 : 80;

            const cleanHeaders = { ...req.headers };
            delete cleanHeaders.host;
            delete cleanHeaders.origin;
            delete cleanHeaders.referer;
            cleanHeaders.host = parsedUrl.port ? `${parsedUrl.hostname}:${parsedUrl.port}` : parsedUrl.hostname;

            const proxyReq = client.request({
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || defaultPort,
                path: parsedUrl.pathname + parsedUrl.search,
                method: req.method,
                headers: cleanHeaders
            }, (proxyRes: any) => {
                const proxyHeaders = { ...proxyRes.headers, 'Access-Control-Allow-Origin': '*' };
                if (req.query.download === '1') {
                    proxyHeaders['Content-Disposition'] = `attachment; filename="torrent_video.mp4"`;
                }
                res.writeHead(proxyRes.statusCode || 200, proxyHeaders);
                proxyRes.pipe(res);
            });

            proxyReq.setTimeout(0);

            let cleanedUp = false;
            const cleanupConnection = () => {
                if (cleanedUp) return;
                cleanedUp = true;
                if (torrentHash) {
                    markStreamEnded(torrentHash);
                }
                try { proxyReq.destroy(); } catch (e) {}
            };

            req.on('close', cleanupConnection);
            req.on('aborted', cleanupConnection);
            res.on('finish', cleanupConnection);

            proxyReq.on('error', async (err: any) => {
                cleanupConnection();
                if (req.destroyed || res.writableEnded) return;
                if (retryCount < maxRetries) {
                    if (!isStarting) startTorrServer();
                    await new Promise(r => setTimeout(r, 500));
                    return handleTorrStreamProxy(req, res, retryCount + 1);
                }
                if (!res.headersSent) {
                    res.status(502).send('Stream unavailable.');
                }
            });

            if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
                proxyReq.end();
            } else {
                req.pipe(proxyReq, { end: true });
            }
        } catch (e: any) {
            if (torrentHash) {
                markStreamEnded(torrentHash);
            }
            if (!res.headersSent) {
                res.status(502).send('Stream proxy error.');
            }
        }
    };

    app.all('/torrents', handleTorrApiProxy);
    app.all('/settings', handleTorrApiProxy);
    app.all('/echo', handleTorrApiProxy);
    app.all(/^\/(?:stream|play)(?:\/.*)?$/, handleTorrStreamProxy);

    process.on('exit', () => { if (torrProcess) torrProcess.kill(); });
    process.on('SIGINT', () => { if (torrProcess) torrProcess.kill(); process.exit(); });
    process.on('SIGTERM', () => { if (torrProcess) torrProcess.kill(); process.exit(); });
}
