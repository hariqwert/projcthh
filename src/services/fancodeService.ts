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
    clearkey?: string;
    streamType?: 'hls' | 'dash';
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
    clearkey?: string;
    streamType?: 'hls' | 'dash';
    updatedAt: number;
}

export const DEFAULT_FANCODE_SOURCES: FanCodeSourceConfigItem[] = [
    {
        id: 'sportlink_fc_json',
        name: 'SportLink FanCode JSON (kajju027)',
        url: 'https://raw.githubusercontent.com/kajju027/Fancode-Events-Json/refs/heads/main/fancode.json',
        type: 'json',
        isPrimary: true,
        enabled: true
    },
    {
        id: 'allinone_sports_data_m3u',
        name: 'AllInOne Sports Data M3U (sm-monirulislam)',
        url: 'https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/main/Sports_data.m3u',
        type: 'm3u',
        isPrimary: true,
        enabled: true
    },
    {
        id: 'allinone_sports_data_json',
        name: 'AllInOne Sports Data JSON (104 Matches with ClearKey)',
        url: 'https://raw.githubusercontent.com/sm-monirulislam/Upcoming-and-Live-Sports-Data/main/Sports_data.json',
        type: 'json',
        isPrimary: false,
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
        id: 'zyphx8_data_m3u',
        name: 'Zyphx8 FanCode M3U (Backup)',
        url: 'https://raw.githubusercontent.com/doctor-8trange/zyphx8/refs/heads/main/data/fancode.m3u',
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
                // Ensure any newly added default sources are included in the source list
                const missingDefaults = DEFAULT_FANCODE_SOURCES.filter(
                    d => !saved.some((s: FanCodeSourceConfigItem) => s.id === d.id || s.url === d.url)
                );
                const combined = [...saved, ...missingDefaults];
                return combined.map((s: FanCodeSourceConfigItem) => {
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
    // DASH manifests (.mpd), Open CORS CDNs (aiv-cdn.net, nettv.com.np), or local handlers should remain direct
    if (cleanUrl.includes('.mpd') || cleanUrl.includes('aiv-cdn.net') || cleanUrl.includes('nettv.com.np') || cleanUrl.includes('/live.php') || cleanUrl.includes('/stream_proxy.php')) {
        return cleanUrl;
    }
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
 * Parse standard M3U playlist format from FanCode / Sports_data upstream (supporting ClearKey DRM)
 */
function parseFanCodeM3uList(m3uContent: string): Array<{ matchId: string; streamUrl: string; logo: string; group: string; title: string; clearkey?: string; streamType?: 'hls' | 'dash' }> {
    const items: Array<{ matchId: string; streamUrl: string; logo: string; group: string; title: string; clearkey?: string; streamType?: 'hls' | 'dash' }> = [];
    if (!m3uContent) return items;

    const lines = m3uContent.split(/\r?\n/);
    let currentLogo = '';
    let currentGroup = '';
    let currentTitle = '';
    let currentClearKey = '';
    let currentManifestType = '';

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
            currentClearKey = '';
            currentManifestType = '';
        } else if (line.startsWith('#KODIPROP:inputstream.adaptive.license_key=')) {
            currentClearKey = line.split('=')[1]?.trim() || '';
        } else if (line.startsWith('#KODIPROP:inputstream.adaptive.manifest_type=')) {
            currentManifestType = line.split('=')[1]?.trim() || '';
        } else if (line.startsWith('http://') || line.startsWith('https://')) {
            const streamUrl = line.split('|')[0].trim();
            const matchIdMatch = streamUrl.match(/\/(\d{5,10})_/);
            const matchId = matchIdMatch ? matchIdMatch[1] : `${Math.abs(currentTitle.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0))}`;
            const isDash = currentManifestType.toLowerCase() === 'mpd' || streamUrl.includes('.mpd');

            items.push({
                matchId,
                streamUrl,
                logo: currentLogo,
                group: currentGroup,
                title: currentTitle,
                clearkey: currentClearKey || undefined,
                streamType: isDash ? 'dash' : 'hls'
            });
            currentTitle = '';
            currentClearKey = '';
            currentManifestType = '';
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
                streamUrls: Array<{ label: string; url: string; quality?: string; clearkey?: string; streamType?: 'hls' | 'dash' }>;
                clearkey?: string;
                streamType?: 'hls' | 'dash';
            },
            sourceItem: FanCodeSourceConfigItem
        ) => {
            const checkBlob = `${raw.title || ''} ${raw.eventName || ''} ${raw.matchId || ''}`;
            if (/namibia\s*v(?:s\.?)?\s*zimbabwe|zimbabwe\s*v(?:s\.?)?\s*namibia|4248459|4248350|lucknow\s*falcons\s*v(?:s\.?)?\s*meerut|meerut\s*mavericks\s*v(?:s\.?)?\s*lucknow/i.test(checkBlob)) {
                return;
            }
            if (/completed|finished|ended|abandoned/i.test(String(raw.status || ''))) {
                return;
            }
            const normKey = normalizeFanCodeMatchKey(raw.title, raw.matchId);
            const existingKeyById = raw.matchId ? matchIdToKeyMap.get(String(raw.matchId)) : undefined;
            const finalKey = existingKeyById || normKey;
            if (raw.matchId) matchIdToKeyMap.set(String(raw.matchId), finalKey);

            const eventId = `fancode-${raw.matchId}`;
            const validStreams = raw.streamUrls
                .map(s => {
                    const rawClean = (s.url || '').split('|')[0].trim();
                    const isMpd = rawClean.includes('.mpd') || s.streamType === 'dash';
                    const proxiedUrl = wrapFanCodeProxyUrl(rawClean);
                    return {
                        ...s,
                        rawUrl: rawClean,
                        proxiedUrl,
                        streamType: (isMpd ? 'dash' : 'hls') as ('dash' | 'hls'),
                        clearkey: s.clearkey || raw.clearkey
                    };
                })
                .filter(s => Boolean(s.proxiedUrl) && s.proxiedUrl.startsWith('http'));

            const isLive = validStreams.length > 0 || raw.status === 'LIVE';
            const primaryStream = validStreams[0];
            const primaryProxied = primaryStream?.proxiedUrl || '';
            const primaryStreamType = primaryStream?.streamType || (primaryProxied.includes('.mpd') ? 'dash' : 'hls');
            const primaryClearKey = primaryStream?.clearkey || raw.clearkey;
            const ckParam = primaryClearKey ? `&clearkey=${encodeURIComponent(primaryClearKey)}` : '';
            const primaryPlayUrl = primaryProxied
                ? `/play_consumet.php?channel_id=${eventId}&name=${encodeURIComponent(raw.title)}&url=${encodeURIComponent(primaryProxied)}&logo=${encodeURIComponent(raw.thumbnail)}&source=fancode&type=${primaryStreamType}${ckParam}`
                : undefined;

            const existing = eventMap.get(finalKey);
            if (!existing) {
                const sourcesList: FanCodeSourceOption[] = validStreams.map((vs, idx) => {
                    const vsType = vs.streamType || (vs.proxiedUrl.includes('.mpd') ? 'dash' : 'hls');
                    const vsCkParam = vs.clearkey ? `&clearkey=${encodeURIComponent(vs.clearkey)}` : '';
                    return {
                        id: `${eventId}_${sourceItem.id}_${idx + 1}`,
                        name: vs.label || sourceItem.name,
                        sourceName: vs.label || sourceItem.name,
                        sourceId: sourceItem.id,
                        sourceUrl: sourceItem.url,
                        streamUrl: vs.proxiedUrl,
                        playUrl: `/play_consumet.php?channel_id=${eventId}&name=${encodeURIComponent(raw.title)}&url=${encodeURIComponent(vs.proxiedUrl)}&logo=${encodeURIComponent(raw.thumbnail)}&source=fancode&type=${vsType}${vsCkParam}`,
                        isPrimary: sourceItem.isPrimary && idx === 0,
                        quality: vs.quality || (vsType === 'dash' ? 'DASH ClearKey' : '1080p FHD'),
                        clearkey: vs.clearkey,
                        streamType: vsType
                    };
                });

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
                    clearkey: primaryClearKey,
                    streamType: primaryStreamType,
                    updatedAt: now
                };
                eventMap.set(finalKey, event);
            } else {
                if (!existing.sources) existing.sources = [];
                for (const vs of validStreams) {
                    const alreadyExists = existing.sources.some(s => s.streamUrl === vs.proxiedUrl);
                    if (!alreadyExists) {
                        const vsType = vs.streamType || (vs.proxiedUrl.includes('.mpd') ? 'dash' : 'hls');
                        const vsCkParam = vs.clearkey ? `&clearkey=${encodeURIComponent(vs.clearkey)}` : '';
                        existing.sources.push({
                            id: `${existing.id}_${sourceItem.id}_${existing.sources.length + 1}`,
                            name: vs.label || sourceItem.name,
                            sourceName: vs.label || sourceItem.name,
                            sourceId: sourceItem.id,
                            sourceUrl: sourceItem.url,
                            streamUrl: vs.proxiedUrl,
                            playUrl: `/play_consumet.php?channel_id=${existing.id}&name=${encodeURIComponent(existing.title)}&url=${encodeURIComponent(vs.proxiedUrl)}&logo=${encodeURIComponent(existing.thumbnail)}&source=fancode&type=${vsType}${vsCkParam}`,
                            isPrimary: sourceItem.isPrimary && existing.sources.length === 0,
                            quality: vs.quality || (vsType === 'dash' ? 'DASH ClearKey' : '1080p FHD'),
                            clearkey: vs.clearkey,
                            streamType: vsType
                        });
                    }
                }
                if (!existing.streamUrl && primaryProxied) {
                    existing.streamUrl = primaryProxied;
                    existing.playUrl = primaryPlayUrl;
                    existing.isLive = true;
                    existing.status = 'LIVE';
                    existing.clearkey = primaryClearKey || existing.clearkey;
                    existing.streamType = primaryStreamType;
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
                const res = await axios.get(sourceItem.url, { timeout: 8000 });
                if (sourceItem.type === 'm3u' && typeof res.data === 'string' && res.data.includes('#EXTINF')) {
                    const parsedItems = parseFanCodeM3uList(res.data);
                    for (const item of parsedItems) {
                        addOrMergeFanCodeEvent({
                            matchId: item.matchId,
                            title: item.title,
                            eventName: item.group || 'FanCode Live',
                            sportCategory: (item.group || '').toLowerCase().includes('football') ? 'Football' : ((item.group || '').toLowerCase().includes('tennis') ? 'Tennis' : ((item.group || '').toLowerCase().includes('golf') ? 'Golf' : 'Cricket')),
                            status: 'LIVE',
                            thumbnail: item.logo || 'https://www.fancode.com/skillup-uploads/cms-media/web-1.png',
                            clearkey: item.clearkey,
                            streamType: item.streamType,
                            streamUrls: [{
                                label: sourceItem.name,
                                url: item.streamUrl,
                                quality: item.streamType === 'dash' ? 'DASH ClearKey' : '1080p FHD',
                                clearkey: item.clearkey,
                                streamType: item.streamType
                            }]
                        }, sourceItem);
                        sourceCount++;
                    }
                } else if (sourceItem.type === 'json' && res.data) {
                    const matches = res.data?.matches || (Array.isArray(res.data) ? res.data : []);
                    if (Array.isArray(matches)) {
                        for (const m of matches) {
                            const matchIdStr = String(m.match_id || m.id || '');
                            const matchTitle = m.title || m.match_name || m.event_name || (m.team?.[0]?.name && m.team?.[1]?.name ? `${m.team[0].name} vs ${m.team[1].name}` : (m.eventInfo?.eventName || 'FanCode Match'));
                            const eventName = m.event_name || m.tournament || m.eventInfo?.eventName || 'FanCode Live';
                            const thumb = m.src || m.image || m.eventInfo?.event_logo || m.eventInfo?.teamAFlag || m.image_cdn?.APP || m.image_cdn?.TATAPLAY || 'https://www.fancode.com/skillup-uploads/cms-media/web-1.png';

                            const candidateStreams: Array<{ label: string; url: string; quality?: string; clearkey?: string; streamType?: 'hls' | 'dash' }> = [];

                            // 1. Array-based streams (AllInOne / Sports_data.json)
                            if (Array.isArray(m.streams)) {
                                for (const s of m.streams) {
                                    if (s && s.stream_url && typeof s.stream_url === 'string' && s.stream_url.startsWith('http')) {
                                        const isMpd = s.stream_url.includes('.mpd');
                                        const ck = (s.kid && s.key) ? `${s.kid}:${s.key}` : (s.clearkey || undefined);
                                        candidateStreams.push({
                                            label: `${sourceItem.name} (${s.channel_name || 'Live'})`,
                                            url: s.stream_url,
                                            quality: isMpd ? 'DASH ClearKey' : '1080p FHD',
                                            clearkey: ck,
                                            streamType: isMpd ? 'dash' : 'hls'
                                        });
                                    }
                                }
                            } else if (m.streams && typeof m.streams === 'object') {
                                // 2. Object-based streams (kajju027 / fancode.json)
                                if (m.streams.primary && typeof m.streams.primary === 'string' && m.streams.primary.startsWith('http')) {
                                    candidateStreams.push({ label: `${sourceItem.name} (Primary)`, url: m.streams.primary, quality: '1080p FHD' });
                                }
                                if (m.streams.fancode_cdn && typeof m.streams.fancode_cdn === 'string' && m.streams.fancode_cdn.startsWith('http')) {
                                    candidateStreams.push({ label: `${sourceItem.name} (FanCode CDN)`, url: m.streams.fancode_cdn, quality: '1080p' });
                                }
                                if (m.streams.fancode_bd_cdn && typeof m.streams.fancode_bd_cdn === 'string' && m.streams.fancode_bd_cdn.startsWith('http')) {
                                    candidateStreams.push({ label: `${sourceItem.name} (BD CDN)`, url: m.streams.fancode_bd_cdn, quality: '1080p' });
                                }
                                if (m.streams.fancode_np_cdn && typeof m.streams.fancode_np_cdn === 'string' && m.streams.fancode_np_cdn.startsWith('http')) {
                                    candidateStreams.push({ label: `${sourceItem.name} (NP CDN)`, url: m.streams.fancode_np_cdn, quality: '1080p' });
                                }
                                if (m.streams.fancode_lk_cdn && typeof m.streams.fancode_lk_cdn === 'string' && m.streams.fancode_lk_cdn.startsWith('http')) {
                                    candidateStreams.push({ label: `${sourceItem.name} (LK CDN)`, url: m.streams.fancode_lk_cdn, quality: '1080p' });
                                }
                                if (m.streams.backup && typeof m.streams.backup === 'object') {
                                    Object.entries(m.streams.backup).forEach(([bkName, bkUrl]) => {
                                        if (typeof bkUrl === 'string' && bkUrl.startsWith('http')) {
                                            candidateStreams.push({ label: `${sourceItem.name} (${bkName})`, url: bkUrl, quality: '1080p Backup' });
                                        }
                                    });
                                }
                            }

                            // 3. STREAMING_CDN object
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
                                if (typeof direct === 'string' && direct.startsWith('http')) {
                                    const isMpd = direct.includes('.mpd');
                                    candidateStreams.push({ label: `${sourceItem.name} (Direct)`, url: direct, quality: isMpd ? 'DASH' : '1080p', streamType: isMpd ? 'dash' : 'hls' });
                                }
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

                            const rawStatus = String(m.status || m.streamingStatus || '').toUpperCase();
                            if (/COMPLETED|FINISHED|ENDED|ABANDONED/i.test(rawStatus)) continue;
                            const isStarted = (rawStatus === 'LIVE' || rawStatus === 'STARTED' || candidateStreams.length > 0) && rawStatus !== 'UPCOMING';
                            addOrMergeFanCodeEvent({
                                matchId: matchIdStr || `${Math.abs(matchTitle.split('').reduce((a: number, b: string) => ((a << 5) - a) + b.charCodeAt(0), 0))}`,
                                title: matchTitle,
                                eventName,
                                sportCategory: m.event_category || m.category || m.Category || 'Cricket',
                                team1: m.team_1 || m.team?.[0]?.name || m.eventInfo?.teamA,
                                team2: m.team_2 || m.team?.[1]?.name || m.eventInfo?.teamB,
                                status: isStarted ? 'LIVE' : 'UPCOMING',
                                startTime: m.startTime || m.eventInfo?.startTime,
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
        if (ev.clearkey || (ev.streamType === 'dash' || streamTarget.includes('.mpd'))) {
            m3u += `#KODIPROP:inputstream.adaptive.manifest_type=mpd\n`;
            if (ev.clearkey) {
                m3u += `#KODIPROP:inputstream.adaptive.license_type=clearkey\n`;
                m3u += `#KODIPROP:inputstream.adaptive.license_key=${ev.clearkey}\n`;
            }
        }
        m3u += `${streamTarget}\n\n`;

        // Also include backup sources if multiple sources exist
        if (Array.isArray(ev.sources) && ev.sources.length > 1) {
            ev.sources.slice(1).forEach((src, idx) => {
                if (src.streamUrl && src.streamUrl !== streamTarget) {
                    m3u += `#EXTINF:-1 tvg-id="${ev.id}_bk${idx + 1}" tvg-name="${ev.title} [${src.name}]" tvg-logo="${ev.thumbnail}" group-title="${category} Backup",${ev.title} (${src.name})\n`;
                    if (src.clearkey || (src.streamType === 'dash' || src.streamUrl.includes('.mpd'))) {
                        m3u += `#KODIPROP:inputstream.adaptive.manifest_type=mpd\n`;
                        if (src.clearkey) {
                            m3u += `#KODIPROP:inputstream.adaptive.license_type=clearkey\n`;
                            m3u += `#KODIPROP:inputstream.adaptive.license_key=${src.clearkey}\n`;
                        }
                    }
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
