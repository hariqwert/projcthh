import axios from 'axios';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { syncM3uToFirestore, saveAndSyncAdminDB } from './firestoreSyncService';

export interface FanCodeSourceOption {
    id: string;
    name: string;
    sourceName: string;
    sourceId: string;
    sourceUrl: string;
    streamUrl: string;
    playUrl: string;
    isPrimary: boolean;
    quality?: string;
    language?: string;
}

export interface FanCodeSourceConfigItem {
    id: string;
    name: string;
    url: string;
    type: 'm3u' | 'json';
    isPrimary: boolean;
    enabled: boolean;
    lastCount?: number;
    lastStatus?: 'online' | 'error' | 'idle';
    lastCheckedAt?: string;
}

export interface FanCodeEvent {
    id: string;
    matchId: number | string;
    title: string;
    eventName: string;
    sportCategory: string;
    team1?: string;
    team2?: string;
    status: 'LIVE' | 'UPCOMING' | 'FINISHED';
    startTime?: string;
    thumbnail: string;
    streamUrl?: string;
    playUrl?: string;
    m3u8Content?: string;
    token?: string;
    isLive: boolean;
    sources?: FanCodeSourceOption[];
    updatedAt: number;
}

export const DEFAULT_FANCODE_SOURCES: FanCodeSourceConfigItem[] = [
    {
        id: 'zyphx8_data_m3u',
        name: 'Zyphx8 FanCode M3U (Primary)',
        url: 'https://raw.githubusercontent.com/doctor-8trange/zyphx8/refs/heads/main/data/fancode.m3u',
        type: 'm3u',
        isPrimary: true,
        enabled: true
    },
    {
        id: 'zyphx8_data_json',
        name: 'Zyphx8 Multi-CDN JSON',
        url: 'https://raw.githubusercontent.com/doctor-8trange/zyphx8/refs/heads/main/data/fancode.json',
        type: 'json',
        isPrimary: false,
        enabled: true
    },
    {
        id: 'sportlive18_fc_json',
        name: 'SportLive18 FanCode JSON',
        url: 'https://raw.githubusercontent.com/sportlive18/Fancode-New-Auto-Update/main/fancode.json',
        type: 'json',
        isPrimary: false,
        enabled: true
    },
    {
        id: 'zyphx8_root_m3u',
        name: 'Zyphx8 Root Backup M3U',
        url: 'https://raw.githubusercontent.com/doctor-8trange/zyphx8/main/fancode.m3u',
        type: 'm3u',
        isPrimary: false,
        enabled: true
    }
];

const ADMIN_DB_PATH = path.join(process.cwd(), 'doctor_strange', 'admin_db.json');
const ACTIVE_FANCODE_M3U_PATH = path.join(process.cwd(), 'assets', 'fancode_active.m3u');

let cachedLiveEvents: FanCodeEvent[] = [];
let cachedAllEvents: FanCodeEvent[] = [];
let lastFetchTime = 0;
let lastSourceStats: FanCodeSourceConfigItem[] = [...DEFAULT_FANCODE_SOURCES];
const CACHE_TTL_MS = 60 * 1000; // 1 minute auto-refresh

export function getFanCodeSources(): FanCodeSourceConfigItem[] {
    try {
        if (fs.existsSync(ADMIN_DB_PATH)) {
            const db = JSON.parse(fs.readFileSync(ADMIN_DB_PATH, 'utf8'));
            const saved = db?.streamSourcesConfig?.fancode;
            if (Array.isArray(saved) && saved.length > 0) {
                return saved.map((s: FanCodeSourceConfigItem) => {
                    const stat = lastSourceStats.find(st => st.id === s.id || st.url === s.url);
                    return {
                        ...s,
                        lastCount: stat?.lastCount ?? s.lastCount ?? 0,
                        lastStatus: stat?.lastStatus ?? s.lastStatus ?? 'idle',
                        lastCheckedAt: stat?.lastCheckedAt ?? s.lastCheckedAt
                    };
                });
            }
        }
    } catch (e) {}
    return lastSourceStats;
}

export function saveFanCodeSources(sources: FanCodeSourceConfigItem[]): FanCodeSourceConfigItem[] {
    try {
        const db = fs.existsSync(ADMIN_DB_PATH) ? JSON.parse(fs.readFileSync(ADMIN_DB_PATH, 'utf8')) : {};
        if (!db.streamSourcesConfig) db.streamSourcesConfig = {};
        const hasPrimary = sources.some(s => s.isPrimary && s.enabled);
        if (!hasPrimary && sources.length > 0) {
            sources[0].isPrimary = true;
        }
        const sorted = [...sources].sort((a, b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1));
        db.streamSourcesConfig.fancode = sorted;
        db.streamSourcesConfig.fancodeUpdatedAt = new Date().toISOString();
        lastSourceStats = sorted;
        saveAndSyncAdminDB(db);
        return sorted;
    } catch (e) {
        console.error('[FanCode] Failed to save sources:', e);
        return sources;
    }
}

/**
 * Wrap FanCode stream URLs through proxy-web-sage.vercel.app edge proxy (bom1 Mumbai)
 */
export function wrapFanCodeProxyUrl(rawUrl: string): string {
    if (!rawUrl || typeof rawUrl !== 'string') return '';
    const trimmed = rawUrl.trim();
    if (!trimmed || /^(unavailable|null|undefined|none|n\/a|offline|#)$/i.test(trimmed)) return '';
    if (trimmed.includes('proxy-web-sage.vercel.app')) return trimmed;
    let cleanUrl = trimmed;
    if (cleanUrl.includes('url=')) {
        const urlMatch = cleanUrl.match(/[?&]url=([^&]+)/);
        if (urlMatch) {
            try {
                cleanUrl = decodeURIComponent(urlMatch[1]);
            } catch (e) {}
        }
    }
    cleanUrl = cleanUrl.split('|')[0].trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) return '';
    return `https://proxy-web-sage.vercel.app/api/live-proxy?url=${encodeURIComponent(cleanUrl)}`;
}

/**
 * Normalize FanCode match key so identical matches from different M3U/JSON feeds
 * merge into a single Live Now event with multiple source options.
 */
export function normalizeFanCodeMatchKey(title: string, matchId?: string | number): string {
    const cleanTitle = (title || '')
        .toLowerCase()
        .replace(/\[.*?\]|\(.*?\)/g, ' ')
        .replace(/\b(live|hd|fhd|uhd|4k|1080p|720p|fancode|fan\s*code|sports?|cricket|football|eng|english|hin|hindi|stream\s*\d+|feed\s*\d+)\b/gi, ' ')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const vsMatch = cleanTitle.match(/([a-z0-9\s]{2,25})\s+(?:vs|v)\s+([a-z0-9\s]{2,25})/i);
    if (vsMatch) {
        const t1 = vsMatch[1].trim().split(/\s+/).slice(-2).join(' ');
        const t2 = vsMatch[2].trim().split(/\s+/).slice(0, 2).join(' ');
        const pair = [t1, t2].sort().join('_vs_');
        if (pair.length >= 5) return `fc_match_${pair}`;
    }

    if (cleanTitle.length >= 4) {
        return `fc_title_${cleanTitle}`;
    }
    return `fc_id_${matchId || 'unknown'}`;
}

/**
 * Parse standard M3U playlist format from FanCode upstream
 */
function parseFanCodeM3uList(m3uContent: string): Array<{ matchId: string; streamUrl: string; logo: string; group: string; title: string }> {
    const items: Array<{ matchId: string; streamUrl: string; logo: string; group: string; title: string }> = [];
    if (!m3uContent) return items;

    const lines = m3uContent.split(/\r?\n/);
    let currentLogo = '';
    let currentGroup = '';
    let currentTitle = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('#EXTINF:')) {
            const logoMatch = line.match(/tvg-logo="([^"]+)"/i);
            const groupMatch = line.match(/group-title="([^"]+)"/i);
            const commaIdx = line.lastIndexOf(',');
            let rawTitle = commaIdx !== -1 ? line.slice(commaIdx + 1).trim() : '';
            rawTitle = rawTitle.replace(/^(?:tvg-[^,]+|group-title="[^"]+"),\s*/gi, '').trim();
            currentTitle = rawTitle || 'FanCode Live Match';
            currentLogo = logoMatch ? logoMatch[1] : '';
            currentGroup = groupMatch ? groupMatch[1] : 'FanCode';
        } else if (line.startsWith('http://') || line.startsWith('https://')) {
            const streamUrl = line.split('|')[0].trim();
            const matchIdMatch = streamUrl.match(/\/(\d{5,10})_/);
            const matchId = matchIdMatch ? matchIdMatch[1] : `${Math.abs(currentTitle.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0))}`;

            items.push({
                matchId,
                streamUrl,
                logo: currentLogo,
                group: currentGroup,
                title: currentTitle
            });
            currentTitle = '';
        }
    }

    return items;
}

/**
 * Fetch and synchronize ongoing FanCode live sports events across all configured sources,
 * deduplicating identical matches and attaching backup sources for user switching.
 */
export async function fetchFanCodeEvents(forceRefresh = false): Promise<{ live: FanCodeEvent[]; all: FanCodeEvent[] }> {
    const now = Date.now();
    if (!forceRefresh && cachedLiveEvents.length > 0 && (now - lastFetchTime < CACHE_TTL_MS)) {
        return { live: cachedLiveEvents, all: cachedAllEvents };
    }

    try {
        const configuredSources = getFanCodeSources();
        const orderedSources = [...configuredSources].sort((a, b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1));
        const updatedStats: FanCodeSourceConfigItem[] = configuredSources.map(s => ({ ...s }));

        const eventMap = new Map<string, FanCodeEvent>();
        const matchIdToKeyMap = new Map<string, string>();

        const addOrMergeFanCodeEvent = (
            raw: {
                matchId: string;
                title: string;
                eventName: string;
                sportCategory: string;
                team1?: string;
                team2?: string;
                status: 'LIVE' | 'UPCOMING' | 'FINISHED';
                startTime?: string;
                thumbnail: string;
                streamUrls: Array<{ label: string; url: string; quality?: string }>;
            },
            sourceItem: FanCodeSourceConfigItem
        ) => {
            const checkBlob = `${raw.title || ''} ${raw.eventName || ''} ${raw.matchId || ''}`;
            if (/namibia\s*v(?:s\.?)?\s*zimbabwe|zimbabwe\s*v(?:s\.?)?\s*namibia|4248459/i.test(checkBlob)) {
                return;
            }
            const normKey = normalizeFanCodeMatchKey(raw.title, raw.matchId);
            const existingKeyById = raw.matchId ? matchIdToKeyMap.get(String(raw.matchId)) : undefined;
            const finalKey = existingKeyById || normKey;
            if (raw.matchId) matchIdToKeyMap.set(String(raw.matchId), finalKey);

            const eventId = `fancode-${raw.matchId}`;
            const validStreams = raw.streamUrls
                .map(s => ({ ...s, proxiedUrl: wrapFanCodeProxyUrl(s.url), rawUrl: (s.url || '').split('|')[0].trim() }))
                .filter(s => Boolean(s.proxiedUrl) && s.proxiedUrl.startsWith('http'));

            const isLive = validStreams.length > 0 || raw.status === 'LIVE';
            const primaryProxied = validStreams[0]?.proxiedUrl || '';
            const primaryPlayUrl = primaryProxied
                ? `/play_consumet.php?channel_id=${eventId}&name=${encodeURIComponent(raw.title)}&url=${encodeURIComponent(primaryProxied)}&logo=${encodeURIComponent(raw.thumbnail)}&source=fancode&type=hls`
                : undefined;

            const existing = eventMap.get(finalKey);
            if (!existing) {
                const sourcesList: FanCodeSourceOption[] = validStreams.map((vs, idx) => ({
                    id: `${eventId}_${sourceItem.id}_${idx + 1}`,
                    name: vs.label || sourceItem.name,
                    sourceName: vs.label || sourceItem.name,
                    sourceId: sourceItem.id,
                    sourceUrl: sourceItem.url,
                    streamUrl: vs.proxiedUrl,
                    playUrl: `/play_consumet.php?channel_id=${eventId}&name=${encodeURIComponent(raw.title)}&url=${encodeURIComponent(vs.proxiedUrl)}&logo=${encodeURIComponent(raw.thumbnail)}&source=fancode&type=hls`,
                    isPrimary: sourceItem.isPrimary && idx === 0,
                    quality: vs.quality || '1080p FHD'
                }));

                const event: FanCodeEvent = {
                    id: eventId,
                    matchId: raw.matchId,
                    title: raw.title,
                    eventName: raw.eventName,
                    sportCategory: raw.sportCategory,
                    team1: raw.team1,
                    team2: raw.team2,
                    status: isLive ? 'LIVE' : raw.status,
                    startTime: raw.startTime,
                    thumbnail: raw.thumbnail || 'https://www.fancode.com/skillup-uploads/cms-media/web-1.png',
                    streamUrl: primaryProxied,
                    playUrl: primaryPlayUrl,
                    isLive,
                    sources: sourcesList,
                    updatedAt: now
                };
                eventMap.set(finalKey, event);
            } else {
                if (!existing.sources) existing.sources = [];
                for (const vs of validStreams) {
                    const alreadyExists = existing.sources.some(s => s.streamUrl === vs.proxiedUrl);
                    if (!alreadyExists) {
                        existing.sources.push({
                            id: `${existing.id}_${sourceItem.id}_${existing.sources.length + 1}`,
                            name: vs.label || sourceItem.name,
                            sourceName: vs.label || sourceItem.name,
                            sourceId: sourceItem.id,
                            sourceUrl: sourceItem.url,
                            streamUrl: vs.proxiedUrl,
                            playUrl: `/play_consumet.php?channel_id=${existing.id}&name=${encodeURIComponent(existing.title)}&url=${encodeURIComponent(vs.proxiedUrl)}&logo=${encodeURIComponent(existing.thumbnail)}&source=fancode&type=hls`,
                            isPrimary: sourceItem.isPrimary && existing.sources.length === 0,
                            quality: vs.quality || '1080p FHD'
                        });
                    }
                }
                if (!existing.streamUrl && primaryProxied) {
                    existing.streamUrl = primaryProxied;
                    existing.playUrl = primaryPlayUrl;
                    existing.isLive = true;
                    existing.status = 'LIVE';
                }
                if ((!existing.thumbnail || existing.thumbnail.includes('web-1.png')) && raw.thumbnail) {
                    existing.thumbnail = raw.thumbnail;
                }
            }
        };

        // Iterate through all enabled sources in priority order
        for (const sourceItem of orderedSources) {
            if (!sourceItem.enabled) continue;
            const statTarget = updatedStats.find(s => s.id === sourceItem.id);
            let sourceCount = 0;

            try {
                const res = await axios.get(sourceItem.url, { timeout: 6000 });
                if (sourceItem.type === 'm3u' && typeof res.data === 'string' && res.data.includes('#EXTINF')) {
                    const parsedItems = parseFanCodeM3uList(res.data);
                    for (const item of parsedItems) {
                        addOrMergeFanCodeEvent({
                            matchId: item.matchId,
                            title: item.title,
                            eventName: item.group || 'FanCode Live',
                            sportCategory: (item.group || '').toLowerCase().includes('football') ? 'Football' : 'Cricket',
                            status: 'LIVE',
                            thumbnail: item.logo || 'https://www.fancode.com/skillup-uploads/cms-media/web-1.png',
                            streamUrls: [{ label: sourceItem.name, url: item.streamUrl, quality: '1080p FHD' }]
                        }, sourceItem);
                        sourceCount++;
                    }
                } else if (sourceItem.type === 'json' && res.data) {
                    const matches = res.data?.matches || (Array.isArray(res.data) ? res.data : []);
                    if (Array.isArray(matches)) {
                        for (const m of matches) {
                            const matchIdStr = String(m.match_id || m.id || '');
                            const matchTitle = m.title || m.match_name || (m.team?.[0]?.name && m.team?.[1]?.name ? `${m.team[0].name} vs ${m.team[1].name}` : 'FanCode Match');
                            const eventName = m.event_name || m.tournament || 'FanCode Live';
                            const thumb = m.src || m.image || m.image_cdn?.APP || m.image_cdn?.TATAPLAY || 'https://www.fancode.com/skillup-uploads/cms-media/web-1.png';

                            const candidateStreams: Array<{ label: string; url: string; quality?: string }> = [];
                            if (m.STREAMING_CDN?.Primary_Playback_URL) {
                                candidateStreams.push({ label: `${sourceItem.name} (Primary CDN)`, url: m.STREAMING_CDN.Primary_Playback_URL, quality: '1080p FHD' });
                            }
                            if (m.STREAMING_CDN?.fancode_cdn && m.STREAMING_CDN.fancode_cdn !== m.STREAMING_CDN?.Primary_Playback_URL) {
                                candidateStreams.push({ label: `${sourceItem.name} (FanCode CDN)`, url: m.STREAMING_CDN.fancode_cdn, quality: '1080p' });
                            }
                            if (m.STREAMING_CDN?.dai_google_cdn) {
                                candidateStreams.push({ label: `${sourceItem.name} (Google DAI)`, url: m.STREAMING_CDN.dai_google_cdn, quality: '1080p' });
                            }
                            if (m.video_url || m.pub_url || m.dai_url || m.stream_url || m.adfree_url) {
                                const direct = m.adfree_url || m.video_url || m.pub_url || m.dai_url || m.stream_url;
                                candidateStreams.push({ label: `${sourceItem.name} (Direct HLS)`, url: direct, quality: '1080p' });
                            }
                            if (m.akamai_m3u8_hex) {
                                try {
                                    const decoded = Buffer.from(m.akamai_m3u8_hex, 'hex').toString('utf8');
                                    const urls = decoded.match(/https?:\/\/[^\s]+/g);
                                    if (urls && urls.length > 0) {
                                        candidateStreams.push({ label: `${sourceItem.name} (Akamai 1080p)`, url: urls[urls.length - 1], quality: '1080p FHD' });
                                        if (urls.length > 1) {
                                            candidateStreams.push({ label: `${sourceItem.name} (Akamai 720p Backup)`, url: urls[0], quality: '720p HD' });
                                        }
                                    }
                                } catch (e) {}
                            }

                            const isStarted = m.status === 'LIVE' || m.streamingStatus === 'STARTED' || candidateStreams.length > 0;
                            addOrMergeFanCodeEvent({
                                matchId: matchIdStr || `${Math.abs(matchTitle.split('').reduce((a: number, b: string) => ((a << 5) - a) + b.charCodeAt(0), 0))}`,
                                title: matchTitle,
                                eventName,
                                sportCategory: m.event_category || m.category || 'Cricket',
                                team1: m.team_1 || m.team?.[0]?.name,
                                team2: m.team_2 || m.team?.[1]?.name,
                                status: isStarted ? 'LIVE' : 'UPCOMING',
                                startTime: m.startTime,
                                thumbnail: thumb,
                                streamUrls: candidateStreams
                            }, sourceItem);
                            if (candidateStreams.length > 0) sourceCount++;
                        }
                    }
                }

                if (statTarget) {
                    statTarget.lastCount = sourceCount;
                    statTarget.lastStatus = sourceCount > 0 ? 'online' : 'idle';
                    statTarget.lastCheckedAt = new Date().toISOString();
                }
            } catch (e: any) {
                if (statTarget) {
                    statTarget.lastStatus = 'error';
                    statTarget.lastCheckedAt = new Date().toISOString();
                }
            }
        }

        lastSourceStats = updatedStats;

        const allList = Array.from(eventMap.values());
        const liveList = allList.filter(e => e.isLive && e.streamUrl);

        cachedLiveEvents = liveList;
        cachedAllEvents = allList;
        lastFetchTime = now;

        // Globally rewrite active FanCode M3U file & sync to Firestore
        writeActiveFanCodeM3u(liveList).catch(() => {});

        console.log(`[FanCode] Refreshed: ${liveList.length} deduplicated live matches (${allList.length} total) across ${orderedSources.length} sources.`);
        return { live: liveList, all: allList };
    } catch (err: any) {
        console.warn('[FanCode] Refresh warning:', err?.message);
        return { live: cachedLiveEvents, all: cachedAllEvents };
    }
}

function buildFanCodeM3uString(live: FanCodeEvent[]): string {
    let m3u = `#EXTM3U\n`;
    for (const ev of live) {
        if (!ev.streamUrl) continue;
        const category = ev.sportCategory ? `Fancode-${ev.sportCategory}` : 'FanCode Live';
        const streamTarget = wrapFanCodeProxyUrl(ev.streamUrl);
        m3u += `#EXTINF:-1 tvg-id="${ev.id}" tvg-name="${ev.title}" tvg-logo="${ev.thumbnail}" group-title="${category}",${ev.title}\n`;
        m3u += `${streamTarget}\n\n`;

        // Also include backup sources if multiple sources exist
        if (Array.isArray(ev.sources) && ev.sources.length > 1) {
            ev.sources.slice(1).forEach((src, idx) => {
                if (src.streamUrl && src.streamUrl !== streamTarget) {
                    m3u += `#EXTINF:-1 tvg-id="${ev.id}_bk${idx + 1}" tvg-name="${ev.title} [${src.name}]" tvg-logo="${ev.thumbnail}" group-title="${category} Backup",${ev.title} (${src.name})\n`;
                    m3u += `${src.streamUrl}\n\n`;
                }
            });
        }
    }
    return m3u;
}

/**
 * Generate standard IPTV M3U for FanCode live sports
 */
export async function getFanCodeM3u(baseUrl?: string): Promise<string> {
    const { live } = await fetchFanCodeEvents();
    return buildFanCodeM3uString(live);
}

export async function writeActiveFanCodeM3u(liveEvents?: FanCodeEvent[]): Promise<string> {
    const eventsToUse = liveEvents || cachedLiveEvents;
    const m3uContent = buildFanCodeM3uString(eventsToUse);
    try {
        const dir = path.dirname(ACTIVE_FANCODE_M3U_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(ACTIVE_FANCODE_M3U_PATH, m3uContent, 'utf8');
        syncM3uToFirestore('fancode_active.m3u', m3uContent).catch(() => {});
    } catch (e) {
        console.warn('[FanCode] Failed to write active M3U:', e);
    }
    return m3uContent;
}

// Background auto-updater every 2 minutes
setInterval(() => {
    fetchFanCodeEvents(true).catch(() => {});
}, 2 * 60 * 1000);
