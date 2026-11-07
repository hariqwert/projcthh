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
        const cleanA = (teamA || '').trim();
        const cleanB = (teamB || '').trim();
        const matchTitle = (cleanA && cleanB && cleanA.toLowerCase() !== cleanB.toLowerCase())
            ? `${cleanA} vs ${cleanB}`
            : (ev.title || info.type || cleanA || 'Live Match');
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

export interface FormattedFootlinksEvent {
    id: string;
    name: string;
    title: string;
    synopsis?: string;
    category: string;
    group: string;
    sportName?: string;
    tournament: string;
    league?: string;
    homeTeamName?: string;
    awayTeamName?: string;
    homeTeamLogo?: string;
    awayTeamLogo?: string;
    tournamentLogo?: string;
    time: string;
    timeIST: string;
    status: string;
    isLive: boolean;
    isEnded?: boolean;
    url: string;
    stream_url: string;
    logo: string;
    thumbnail: string;
    clearkey?: string;
    key_id?: string;
    key?: string;
    source: string;
    badge: string;
    playUrl: string;
    isFootlinks: boolean;
    canWatch: boolean;
    countdown: string;
    streams: Array<{
        id: number | string;
        name: string;
        title: string;
        streamUrl: string;
        url: string;
        playUrl: string;
        type: string;
        manifest_type: string;
        clearkey?: string;
        key_id?: string;
        key?: string;
    }>;
}

export async function getFormattedFootlinksEvents(): Promise<FormattedFootlinksEvent[]> {
    const events = await getFootlinksData();
    const formatted: FormattedFootlinksEvent[] = [];

    for (const ev of events) {
        const info = ev.event || {};
        const cat = info.category || info.name || ev.cat || 'Live Sports';
        const teamA = info.teamA || '';
        const teamB = info.teamB || '';
        const cleanA = (teamA || '').trim();
        const cleanB = (teamB || '').trim();
        const matchTitle = (cleanA && cleanB && cleanA.toLowerCase() !== cleanB.toLowerCase())
            ? `${cleanA} vs ${cleanB}`
            : (ev.title || info.type || cleanA || 'Live Match');
        const logo = info.logo || info.teamAFlag || info.teamBFlag || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6U1hs_95YIb02AiDL1JAgkqMNrA1SkPMUatqqPsO2ZqtNZdmj79TQ71k&s=10';

        const streams = (ev.streams || []).filter(s => {
            const l = String(s.link || '').trim();
            return l.startsWith('http');
        });

        if (streams.length === 0) continue;

        const formattedStreams = streams.map(s => {
            const rawLink = String(s.link || '').split('|')[0].trim();
            const isDash = rawLink.includes('.mpd') || s.type === '7' || String(s.type).toLowerCase() === 'dash';
            const api = String(s.api || '').trim();
            let keyId = '';
            let keyVal = '';
            if (api.includes(':')) {
                const parts = api.split(':');
                keyId = parts[0].trim();
                keyVal = parts.slice(1).join(':').trim();
            }

            const streamTitle = s.title || `Stream ${s.id}`;
            let playUrl = `/play_consumet.php?channel_id=footlinks_${ev.id}_${s.id}&url=${encodeURIComponent(rawLink)}&name=${encodeURIComponent(matchTitle + ' (' + streamTitle + ')')}&source=footlinks&type=${isDash ? 'dash' : 'hls'}`;
            if (keyId && keyVal) {
                playUrl += `&key_id=${encodeURIComponent(keyId)}&key=${encodeURIComponent(keyVal)}&clearkey=${encodeURIComponent(api)}`;
            }

            return {
                id: s.id,
                name: streamTitle,
                title: streamTitle,
                streamUrl: rawLink,
                url: rawLink,
                playUrl,
                type: isDash ? 'mpd' : 'hls',
                manifest_type: isDash ? 'mpd' : 'hls',
                clearkey: api || undefined,
                key_id: keyId || undefined,
                key: keyVal || undefined
            };
        });

        const primary = formattedStreams[0];

        let isLive = true;
        let isEnded = false;
        let statusStr = 'LIVE';
        let countdownStr = 'LIVE NOW';
        const now = Date.now();

        if (info.startTimeIST) {
            try {
                const sStr = info.startTimeIST.replace(/\s*IST/i, ' +05:30');
                const sMs = new Date(sStr).getTime();
                let eMs = 0;
                if (info.endTimeIST) {
                    const eStr = info.endTimeIST.replace(/\s*IST/i, ' +05:30');
                    eMs = new Date(eStr).getTime();
                } else if (!isNaN(sMs)) {
                    eMs = sMs + (3 * 3600 * 1000);
                }

                if (!isNaN(sMs)) {
                    if (now < sMs) {
                        isLive = false;
                        statusStr = 'UPCOMING';
                        countdownStr = info.startTimeIST;
                    } else if (eMs > 0 && now > eMs) {
                        isLive = false;
                        isEnded = true;
                        statusStr = 'ENDED';
                        countdownStr = 'CONCLUDED';
                    } else {
                        isLive = true;
                        statusStr = 'LIVE';
                        countdownStr = 'LIVE NOW';
                    }
                }
            } catch (_) {}
        }

        formatted.push({
            id: `footlinks_${ev.id}`,
            name: matchTitle,
            title: matchTitle,
            synopsis: `${cat} • ${info.type || ev.title || 'Live Broadcast'}`,
            category: cat,
            group: cat,
            sportName: cat,
            tournament: info.type || info.name || 'SPORTLINK TV',
            league: info.type || info.name || 'SPORTLINK TV',
            homeTeamName: cleanA || undefined,
            awayTeamName: cleanB || undefined,
            homeTeamLogo: info.teamAFlag || undefined,
            awayTeamLogo: info.teamBFlag || undefined,
            tournamentLogo: info.logo || undefined,
            time: isLive ? 'LIVE NOW' : (countdownStr || 'UPCOMING'),
            timeIST: info.startTimeIST || (isLive ? 'LIVE NOW' : 'UPCOMING'),
            status: statusStr,
            isLive: isLive,
            isEnded: isEnded,
            url: primary.url,
            stream_url: primary.streamUrl,
            logo: logo,
            thumbnail: logo,
            clearkey: primary.clearkey,
            key_id: primary.key_id,
            key: primary.key,
            source: 'footlinks',
            badge: 'FOOTLINKS',
            playUrl: primary.playUrl,
            isFootlinks: true,
            canWatch: !isEnded,
            countdown: countdownStr,
            streams: formattedStreams
        });
    }

    return formatted;
}
