import axios from 'axios';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { syncM3uToFirestore, saveAndSyncAdminDB } from './firestoreSyncService';

export interface SonyLivSourceOption {
    id: string;
    name: string;
    sourceId: string;
    sourceUrl: string;
    streamUrl: string;
    playUrl: string;
    isPrimary: boolean;
    quality?: string;
    language?: string;
}

export interface SonyLivSourceConfigItem {
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

export interface SonyLivEvent {
    id: string;
    contentId: string | number;
    title: string;
    eventName: string;
    category: string;
    sportName?: string;
    sportEmoji?: string;
    broadcastChannel: string;
    isLive: boolean;
    status: 'LIVE' | 'UPCOMING';
    thumbnail: string;
    streamUrl?: string;
    playUrl?: string;
    m3u8Content?: string;
    token?: string;
    language?: string;
    sources?: SonyLivSourceOption[];
    updatedAt: number;
}

export const DEFAULT_SONYLIV_SOURCES: SonyLivSourceConfigItem[] = [
    {
        id: 'drmlive_m3u',
        name: 'DRMLive SonyLIV (Primary)',
        url: 'https://raw.githubusercontent.com/drmlive/sliv-live-events/main/sonyliv.m3u',
        type: 'm3u',
        isPrimary: true,
        enabled: true
    },
    {
        id: 'sportlive18_m3u',
        name: 'SportLive18 AutoUpdate M3U',
        url: 'https://raw.githubusercontent.com/sportlive18/Sonyliv-Playlist-Autoupdate/refs/heads/main/sonyliv.m3u',
        type: 'm3u',
        isPrimary: false,
        enabled: true
    },
    {
        id: 'zyphora_sony_m3u',
        name: 'Zyphora Sony Backup M3U',
        url: 'https://raw.githubusercontent.com/doctor-8trange/zyphora/main/data/sony.m3u',
        type: 'm3u',
        isPrimary: false,
        enabled: true
    },
    {
        id: 'drmlive_json',
        name: 'DRMLive SonyLIV JSON',
        url: 'https://raw.githubusercontent.com/drmlive/sliv-live-events/main/sonyliv.json',
        type: 'json',
        isPrimary: false,
        enabled: true
    },
    {
        id: 'sportlive18_json',
        name: 'SportLive18 SonyLIV JSON',
        url: 'https://raw.githubusercontent.com/sportlive18/Sonyliv-Playlist-Autoupdate/main/sonyliv.json',
        type: 'json',
        isPrimary: false,
        enabled: true
    }
];

const ADMIN_DB_PATH = path.join(process.cwd(), 'doctor_strange', 'admin_db.json');
const ACTIVE_SONYLIV_M3U_PATH = path.join(process.cwd(), 'assets', 'sonyliv_active.m3u');

let cachedLiveEvents: SonyLivEvent[] = [];
let cachedUpcomingEvents: SonyLivEvent[] = [];
let cachedAllEvents: SonyLivEvent[] = [];
let lastFetchTime = 0;
let lastSourceStats: SonyLivSourceConfigItem[] = [...DEFAULT_SONYLIV_SOURCES];
const CACHE_TTL_MS = 60 * 1000; // 1 minute auto-refresh

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    keepAlive: true,
    timeout: 8000
});

export function getSonyLivSources(): SonyLivSourceConfigItem[] {
    try {
        if (fs.existsSync(ADMIN_DB_PATH)) {
            const db = JSON.parse(fs.readFileSync(ADMIN_DB_PATH, 'utf8'));
            const saved = db?.streamSourcesConfig?.sonyliv;
            if (Array.isArray(saved) && saved.length > 0) {
                // Merge runtime stats if available
                return saved.map((s: SonyLivSourceConfigItem) => {
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

export function saveSonyLivSources(sources: SonyLivSourceConfigItem[]): SonyLivSourceConfigItem[] {
    try {
        const db = fs.existsSync(ADMIN_DB_PATH) ? JSON.parse(fs.readFileSync(ADMIN_DB_PATH, 'utf8')) : {};
        if (!db.streamSourcesConfig) db.streamSourcesConfig = {};
        // Ensure at least one primary source exists (default to drmlive_m3u or first enabled)
        let hasPrimary = sources.some(s => s.isPrimary && s.enabled);
        if (!hasPrimary && sources.length > 0) {
            const drmIdx = sources.findIndex(s => s.url.includes('drmlive') && s.enabled);
            if (drmIdx !== -1) sources[drmIdx].isPrimary = true;
            else sources[0].isPrimary = true;
        }
        // Sort so primary is first
        const sorted = [...sources].sort((a, b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1));
        db.streamSourcesConfig.sonyliv = sorted;
        db.streamSourcesConfig.sonylivUpdatedAt = new Date().toISOString();
        lastSourceStats = sorted;
        saveAndSyncAdminDB(db);
        return sorted;
    } catch (e) {
        console.error('[SonyLivService] Failed to save sources:', e);
        return sources;
    }
}

function getSportEmoji(cat: string): string {
    const lower = (cat || '').toLowerCase();
    if (lower.includes('cricket')) return '🏏';
    if (lower.includes('football') || lower.includes('soccer')) return '⚽';
    if (lower.includes('tennis')) return '🎾';
    if (lower.includes('combat') || lower.includes('mma') || lower.includes('ufc') || lower.includes('wwe')) return '🥊';
    if (lower.includes('f1') || lower.includes('motorsport')) return '🏎️';
    if (lower.includes('basketball')) return '🏀';
    return '🏆';
}

/**
 * Normalize Sony CDN stream URLs:
 * Akamai de-authorized sonydaimenew.akamaized.net and moved Sony LIV live sports to sonymtmnew.akamaized.net
 */
export function normalizeSonyLivStreamUrl(url: string): string {
    if (!url) return '';
    let normalized = url.trim();
    if (normalized.includes('sonydaimenew.akamaized.net')) {
        normalized = normalized.replace(/sonydaimenew\.akamaized\.net/g, 'sonymtmnew.akamaized.net');
    }
    return normalized;
}

/**
 * Normalize event title / content ID so identical matches from different SonyLIV sources
 * are grouped into a single Live Now card with multiple selectable sources.
 */
export function normalizeSonyMatchKey(title: string, contentId?: string | number): string {
    const cleanTitle = (title || '')
        .toLowerCase()
        .replace(/\[.*?\]|\(.*?\)/g, ' ')
        .replace(/\b(live|hd|fhd|uhd|4k|1080p|720p|sonyliv|sony\s*liv|sports?|eng|english|hin|hindi|tam|tamil|tel|telugu|mal|kan| stream\s*\d+|feed\s*\d+)\b/gi, ' ')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // Extract "teamA vs teamB" core if present so "Tournament - Team A vs Team B" matches "Team A vs Team B"
    const vsMatch = cleanTitle.match(/([a-z0-9\s]{2,25})\s+(?:vs|v)\s+([a-z0-9\s]{2,25})/i);
    if (vsMatch) {
        const t1 = vsMatch[1].trim().split(/\s+/).slice(-2).join(' ');
        const t2 = vsMatch[2].trim().split(/\s+/).slice(0, 2).join(' ');
        const pair = [t1, t2].sort().join('_vs_');
        if (pair.length >= 5) return `match_${pair}`;
    }

    if (cleanTitle.length >= 4) {
        return `title_${cleanTitle}`;
    }
    return `cid_${contentId || 'unknown'}`;
}

/**
 * Fetch and synchronize ongoing and upcoming SonyLIV sports fixtures across all active sources,
 * deduplicating identical matches and attaching backup sources for user switching.
 */
export async function fetchSonyLivEvents(forceRefresh = false): Promise<{ live: SonyLivEvent[]; upcoming: SonyLivEvent[]; all: SonyLivEvent[] }> {
    const now = Date.now();
    if (!forceRefresh && cachedAllEvents.length > 0 && (now - lastFetchTime < CACHE_TTL_MS)) {
        return { live: cachedLiveEvents, upcoming: cachedUpcomingEvents, all: cachedAllEvents };
    }

    const configuredSources = getSonyLivSources();
    // Ensure primary is evaluated first
    const orderedSources = [...configuredSources].sort((a, b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1));
    const m3uSources = orderedSources.filter(s => s.enabled && s.type === 'm3u');
    const jsonSources = orderedSources.filter(s => s.enabled && s.type === 'json');

    const eventMap = new Map<string, SonyLivEvent>();
    const cidToKeyMap = new Map<string, string>();
    const updatedStats: SonyLivSourceConfigItem[] = configuredSources.map(s => ({ ...s }));

    const addOrMergeEvent = (
        rawEvent: {
            cid: string;
            title: string;
            eventName?: string;
            category: string;
            logo: string;
            streamUrl: string;
            language: string;
            isLive: boolean;
            broadcastChannel?: string;
        },
        sourceItem: SonyLivSourceConfigItem
    ) => {
        const normKey = normalizeSonyMatchKey(rawEvent.title, rawEvent.cid);
        const existingKeyByCid = rawEvent.cid ? cidToKeyMap.get(String(rawEvent.cid)) : undefined;
        const finalKey = existingKeyByCid || normKey;
        if (rawEvent.cid) cidToKeyMap.set(String(rawEvent.cid), finalKey);

        const eventId = `sonyliv_${rawEvent.cid || Math.abs(finalKey.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0))}`;
        const cleanStream = normalizeSonyLivStreamUrl(rawEvent.streamUrl);
        const directProxyUrl = cleanStream ? `/live.php?url=${encodeURIComponent(cleanStream)}` : '';
        const playUrl = cleanStream
            ? `/play_consumet.php?channel_id=${eventId}&name=${encodeURIComponent(rawEvent.title)}&url=${encodeURIComponent(directProxyUrl)}&logo=${encodeURIComponent(rawEvent.logo)}&source=sonyliv&type=hls`
            : '#';

        const existing = eventMap.get(finalKey);
        if (!existing) {
            const sourcesList: SonyLivSourceOption[] = [];
            if (cleanStream) {
                sourcesList.push({
                    id: `${eventId}_${sourceItem.id}_1`,
                    name: `${sourceItem.name}${rawEvent.language && rawEvent.language !== 'ENG' ? ' (' + rawEvent.language + ')' : ''}`,
                    sourceId: sourceItem.id,
                    sourceUrl: sourceItem.url,
                    streamUrl: cleanStream,
                    playUrl,
                    isPrimary: sourceItem.isPrimary,
                    quality: '1080p FHD',
                    language: rawEvent.language || 'ENG'
                });
            }

            const emoji = getSportEmoji(rawEvent.category);
            const ev: SonyLivEvent = {
                id: eventId,
                contentId: rawEvent.cid,
                title: rawEvent.title,
                eventName: rawEvent.eventName || rawEvent.title,
                category: rawEvent.category,
                sportName: rawEvent.category,
                sportEmoji: emoji,
                broadcastChannel: rawEvent.broadcastChannel || 'SonyLIV',
                isLive: rawEvent.isLive,
                status: rawEvent.isLive ? 'LIVE' : 'UPCOMING',
                thumbnail: rawEvent.logo,
                streamUrl: cleanStream,
                playUrl,
                language: rawEvent.language || 'ENG',
                sources: sourcesList,
                updatedAt: now
            };
            eventMap.set(finalKey, ev);
        } else {
            if (!existing.sources) existing.sources = [];
            if (cleanStream) {
                const alreadyHasStream = existing.sources.some(s => s.streamUrl === cleanStream);
                if (!alreadyHasStream) {
                    const srcLabel = `${sourceItem.name}${rawEvent.language && rawEvent.language !== 'ENG' ? ' (' + rawEvent.language + ')' : ''}`;
                    existing.sources.push({
                        id: `${existing.id}_${sourceItem.id}_${existing.sources.length + 1}`,
                        name: srcLabel,
                        sourceId: sourceItem.id,
                        sourceUrl: sourceItem.url,
                        streamUrl: cleanStream,
                        playUrl: `/play_consumet.php?channel_id=${existing.id}&name=${encodeURIComponent(existing.title)}&url=${encodeURIComponent(directProxyUrl)}&logo=${encodeURIComponent(existing.thumbnail)}&source=sonyliv&type=hls`,
                        isPrimary: sourceItem.isPrimary,
                        quality: '1080p FHD',
                        language: rawEvent.language || 'ENG'
                    });
                }
                // If existing didn't have a live stream yet or this new source is Primary, promote it
                if (!existing.streamUrl || (sourceItem.isPrimary && !existing.sources[0]?.isPrimary)) {
                    existing.streamUrl = cleanStream;
                    existing.playUrl = playUrl;
                    existing.isLive = true;
                    existing.status = 'LIVE';
                }
            }
        }
    };

    // 1. Fetch from ALL enabled SonyLIV M3U feeds (Primary: drmlive first, plus backup feeds for source switching)
    for (const sourceItem of m3uSources) {
        const statTarget = updatedStats.find(s => s.id === sourceItem.id);
        try {
            const res = await axios.get(sourceItem.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                httpsAgent,
                timeout: 7000
            });

            let countFromThisSource = 0;
            if (res.data && typeof res.data === 'string' && res.data.includes('#EXTINF')) {
                const lines = res.data.split('\n');
                let currentInfo: any = null;

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;

                    if (line.startsWith('#EXTINF:')) {
                        const titleMatch = line.match(/,(.+)$/);
                        const rawTitle = titleMatch ? titleMatch[1].trim() : 'SonyLIV Event';
                        const idMatch = line.match(/tvg-id="([^"]+)"/);
                        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
                        const groupMatch = line.match(/group-title="([^"]+)"/);
                        const langMatch = line.match(/tvg-language="([^"]+)"/);

                        currentInfo = {
                            id: idMatch ? idMatch[1] : '',
                            title: rawTitle,
                            logo: logoMatch ? logoMatch[1] : 'https://origin-staticv2.sonyliv.com/UI_icons/sonyliv_new_revised_header_logo.png',
                            category: (groupMatch ? groupMatch[1] : 'Sports').replace(/^sonyliv-/i, ''),
                            language: langMatch ? langMatch[1] : 'ENG'
                        };
                    } else if (currentInfo && (line.startsWith('http://') || line.startsWith('https://'))) {
                        const streamUrl = line.split('|')[0].trim();
                        const cid = currentInfo.id || `${Math.abs(currentInfo.title.split('').reduce((a: number, b: string) => ((a << 5) - a) + b.charCodeAt(0), 0))}`;
                        addOrMergeEvent({
                            cid: String(cid),
                            title: currentInfo.title,
                            category: currentInfo.category,
                            logo: currentInfo.logo,
                            streamUrl,
                            language: currentInfo.language,
                            isLive: true
                        }, sourceItem);
                        countFromThisSource++;
                        currentInfo = null;
                    }
                }
            }
            if (statTarget) {
                statTarget.lastCount = countFromThisSource;
                statTarget.lastStatus = countFromThisSource > 0 ? 'online' : 'idle';
                statTarget.lastCheckedAt = new Date().toISOString();
            }
            if (countFromThisSource > 0) {
                console.log(`[SonyLivService] Aggregated ${countFromThisSource} matches from ${sourceItem.name} (${sourceItem.url}).`);
            }
        } catch (e: any) {
            if (statTarget) {
                statTarget.lastStatus = 'error';
                statTarget.lastCheckedAt = new Date().toISOString();
            }
            console.warn(`[SonyLivService] Mirror ${sourceItem.url} failed:`, e?.message || e);
        }
    }

    // 2. Fetch from ALL enabled SonyLIV JSON feeds for supplemental fixtures & backup URLs
    for (const sourceItem of jsonSources) {
        const statTarget = updatedStats.find(s => s.id === sourceItem.id);
        try {
            const res = await axios.get(sourceItem.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                httpsAgent,
                timeout: 6000
            });
            let countFromJson = 0;
            if (res.data && Array.isArray(res.data.matches) && res.data.matches.length > 0) {
                res.data.matches.forEach((m: any, idx: number) => {
                    const isLive = m.isLive === true;
                    const cid = String(m.contentId || idx);
                    const title = m.match_name || m.event_name || `SonyLIV Match ${idx + 1}`;
                    const rawStream = m.video_url || m.pub_url || m.dai_url || '';
                    const thumb = m.src || 'https://origin-staticv2.sonyliv.com/UI_icons/sonyliv_new_revised_header_logo.png';
                    const cat = m.event_category || 'Sports';
                    const ch = m.broadcast_channel || 'SonyLIV';

                    addOrMergeEvent({
                        cid,
                        title,
                        eventName: m.event_name || title,
                        category: cat,
                        logo: thumb,
                        streamUrl: rawStream,
                        language: m.audioLanguageName || 'ENG',
                        isLive,
                        broadcastChannel: ch
                    }, sourceItem);
                    countFromJson++;
                });
            }
            if (statTarget) {
                statTarget.lastCount = countFromJson;
                statTarget.lastStatus = countFromJson > 0 ? 'online' : 'idle';
                statTarget.lastCheckedAt = new Date().toISOString();
            }
        } catch (e) {
            if (statTarget) {
                statTarget.lastStatus = 'error';
                statTarget.lastCheckedAt = new Date().toISOString();
            }
        }
    }

    lastSourceStats = updatedStats;

    const allEvents = Array.from(eventMap.values());
    const liveEvents = allEvents.filter(e => e.isLive && e.streamUrl);
    const upcomingEvents = allEvents.filter(e => !e.isLive);

    if (allEvents.length > 0 || forceRefresh) {
        cachedLiveEvents = liveEvents;
        cachedUpcomingEvents = upcomingEvents;
        cachedAllEvents = allEvents;
        lastFetchTime = now;

        // Globally rewrite active SonyLIV M3U file & sync to Firestore
        writeActiveSonyLivM3u(liveEvents).catch(() => {});

        return { live: liveEvents, upcoming: upcomingEvents, all: allEvents };
    }

    return { live: cachedLiveEvents, upcoming: cachedUpcomingEvents, all: cachedAllEvents };
}

/**
 * Generate pure-stream M3U for active SonyLIV live sports (including backup sources)
 */
export async function getSonyLivM3u(): Promise<string> {
    const { live } = await fetchSonyLivEvents(false);
    return buildSonyLivM3uString(live);
}

function buildSonyLivM3uString(live: SonyLivEvent[]): string {
    let m3u = `#EXTM3U\n`;
    for (const ev of live) {
        if (!ev.streamUrl) continue;
        const category = ev.category ? `SonyLIV-${ev.category}` : 'SonyLIV Live';
        m3u += `#EXTINF:-1 tvg-id="${ev.id}" tvg-name="${ev.title}" tvg-logo="${ev.thumbnail}" group-title="${category}",${ev.title}\n`;
        m3u += `${ev.streamUrl}\n\n`;

        // Also include backup sources if multiple sources exist
        if (Array.isArray(ev.sources) && ev.sources.length > 1) {
            ev.sources.slice(1).forEach((src, idx) => {
                if (src.streamUrl && src.streamUrl !== ev.streamUrl) {
                    m3u += `#EXTINF:-1 tvg-id="${ev.id}_bk${idx + 1}" tvg-name="${ev.title} [${src.name}]" tvg-logo="${ev.thumbnail}" group-title="${category} Backup",${ev.title} (${src.name})\n`;
                    m3u += `${src.streamUrl}\n\n`;
                }
            });
        }
    }
    return m3u;
}

export async function writeActiveSonyLivM3u(liveEvents?: SonyLivEvent[]): Promise<string> {
    const eventsToUse = liveEvents || cachedLiveEvents;
    const m3uContent = buildSonyLivM3uString(eventsToUse);
    try {
        const dir = path.dirname(ACTIVE_SONYLIV_M3U_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(ACTIVE_SONYLIV_M3U_PATH, m3uContent, 'utf8');
        syncM3uToFirestore('sonyliv_active.m3u', m3uContent).catch(() => {});
    } catch (e) {
        console.warn('[SonyLivService] Failed to write active M3U:', e);
    }
    return m3uContent;
}

