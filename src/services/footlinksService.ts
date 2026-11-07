import axios from 'axios';

export interface FootlinksStream {
    id: number | string;
    title: string;
    type: string;
    link: string;
    api?: string;
}

export interface FootlinksEvent {
    id: string;
    title: string;
    slug?: string;
    cat?: string;
    status?: string;
    event?: {
        name?: string;
        category?: string;
        type?: string;
        logo?: string;
        teamA?: string;
        teamAFlag?: string;
        teamB?: string;
        teamBFlag?: string;
        startTimeIST?: string;
        endTimeIST?: string;
    };
    streams: FootlinksStream[];
}

let cachedEvents: FootlinksEvent[] = [];
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache

/**
 * Fetch live events and streams from Footlinks (SPORTLINK TV) backend data source
 */
export async function getFootlinksData(forceRefresh = false): Promise<FootlinksEvent[]> {
    const now = Date.now();
    if (!forceRefresh && cachedEvents.length > 0 && (now - cacheTimestamp) < CACHE_TTL_MS) {
        return cachedEvents;
    }

    try {
        const response = await axios.get('https://sonujson-v6.pages.dev/Data/events/allinone.json', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            },
            timeout: 8000
        });

        const data = response.data;
        if (data && Array.isArray(data.events)) {
            cachedEvents = data.events;
            cacheTimestamp = now;
            return cachedEvents;
        }
        return cachedEvents;
    } catch (err: any) {
        console.error('[FootlinksService] Failed to fetch events:', err?.message || err);
        return cachedEvents;
    }
}

/**
 * Generate standard IPTV M3U playlist with Kodi ClearKey DRM metadata
 */
export async function generateFootlinksM3u(baseUrl = 'http://localhost:3000'): Promise<string> {
    const events = await getFootlinksData();
    let m3u = `#EXTM3U x-tvg-url="${baseUrl}/epg.xml"\n`;

    for (const ev of events) {
        const info = ev.event || {};
        const cat = info.category || info.name || ev.cat || 'Live Sports';
        const teamA = info.teamA || '';
        const teamB = info.teamB || '';
        const matchTitle = (teamA && teamB) ? `${teamA} vs ${teamB}` : (ev.title || info.type || 'Live Match');
        const logo = info.logo || info.teamAFlag || '';

        const streams = ev.streams || [];
        for (const s of streams) {
            const rawLink = String(s.link || '').split('|')[0].trim();
            if (!rawLink || !rawLink.startsWith('http')) continue;

            const streamTitle = `${matchTitle} (${s.title || 'Stream ' + s.id})`;
            const key = String(s.api || '').trim();
            const isDash = rawLink.includes('.mpd') || s.type === '7' || String(s.type).toLowerCase() === 'dash';

            m3u += `\n#EXTINF:-1 tvg-id="${ev.id || ''}" tvg-name="${streamTitle.replace(/"/g, '')}" tvg-logo="${logo}" group-title="${cat}",${streamTitle}\n`;
            if (isDash && key && key.includes(':')) {
                m3u += `#KODIPROP:inputstream.adaptive.manifest_type=mpd\n`;
                m3u += `#KODIPROP:inputstream.adaptive.license_type=clearkey\n`;
                m3u += `#KODIPROP:inputstream.adaptive.license_key=${key}\n`;
            } else if (isDash) {
                m3u += `#KODIPROP:inputstream.adaptive.manifest_type=mpd\n`;
            }
            m3u += `${rawLink}\n`;
        }
    }

    return m3u;
}
