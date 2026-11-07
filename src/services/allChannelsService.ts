import axios from 'axios';
import fs from 'fs';
import path from 'path';

export interface AllChannelItem {
    id: string;
    name: string;
    title: string;
    logo: string;
    group: string;
    category: string;
    stream_url: string;
    url: string;
    play_url: string;
    type: string;
    source: string;
}

export interface AllChannelCategory {
    name: string;
    icon: string;
    count: number;
}

export interface AllChannelsCache {
    channels: AllChannelItem[];
    categories: AllChannelCategory[];
    totalCount: number;
    timestamp: number;
}

const COMBINED_M3U_URL = 'https://raw.githubusercontent.com/sm-monirulislam/SM-IPTV/main/Combined_Live_TV.m3u';
const CACHE_FILE = path.join(process.cwd(), 'assets', 'combined_live_tv.json');
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes auto-update interval

let memoryCache: AllChannelsCache | null = null;
let isUpdating = false;
let autoUpdateTimer: NodeJS.Timeout | null = null;

function normalizeCategoryName(raw: string): { name: string; icon: string } {
    const l = (raw || '').trim().toLowerCase();
    if (l === 'bnagla' || l === 'bangla') return { name: 'Bangla', icon: '🇧🇩' };
    if (l === 'news') return { name: 'News', icon: '📰' };
    if (l === 'sports') return { name: 'Sports', icon: '🏆' };
    if (l === 'indian entertainment') return { name: 'Indian Entertainment', icon: '🎭' };
    if (l === 'indian music') return { name: 'Indian Music', icon: '🎵' };
    if (l === 'indian bangla') return { name: 'Indian Bangla', icon: '📺' };
    if (l === 'english') return { name: 'English', icon: '🌐' };
    if (l === 'kids') return { name: 'Kids', icon: '🧸' };
    if (l === 'documentary') return { name: 'Documentary', icon: '🌍' };
    if (l === 'islami' || l === 'islamic') return { name: 'Islamic', icon: '🕌' };
    if (l === 'movies hindi' || l.includes('movie')) return { name: 'Hindi Movies', icon: '🎬' };
    if (l === 'back channel' || l.includes('back')) return { name: 'Backup Channels', icon: '📡' };
    return { name: raw.trim() || 'General', icon: '⚡' };
}

export function parseCombinedM3u(m3uText: string): { channels: AllChannelItem[]; categories: AllChannelCategory[] } {
    const lines = m3uText.split(/\r?\n/);
    const channels: AllChannelItem[] = [];
    const catCounts = new Map<string, { icon: string; count: number }>();

    let currentExtinf: string | null = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('#EXTINF')) {
            currentExtinf = line;
        } else if (currentExtinf && line.startsWith('http')) {
            const extinf = currentExtinf;
            currentExtinf = null;

            const nameMatch = extinf.match(/,(.+)$/);
            const channelName = nameMatch ? nameMatch[1].trim() : 'Live Channel';

            const idMatch = extinf.match(/tvg-id=["']([^"']+)["']/i);
            const logoMatch = extinf.match(/tvg-logo=["']([^"']+)["']/i);
            const groupMatch = extinf.match(/group-title=["']([^"']+)["']/i);

            const rawGroup = groupMatch ? groupMatch[1].trim() : 'General';
            const { name: catName, icon: catIcon } = normalizeCategoryName(rawGroup);

            const prev = catCounts.get(catName);
            catCounts.set(catName, { icon: catIcon, count: (prev?.count || 0) + 1 });

            const chId = idMatch ? idMatch[1] : `ch_${channels.length + 1}`;
            const streamUrl = line.split('|')[0].trim();
            const playUrl = `/play_consumet.php?channel_id=allch_${encodeURIComponent(chId)}&url=${encodeURIComponent(streamUrl)}&name=${encodeURIComponent(channelName)}&source=allchannels&type=hls`;

            channels.push({
                id: `allch_${chId}`,
                name: channelName,
                title: channelName,
                logo: logoMatch ? logoMatch[1] : '',
                group: catName,
                category: catName,
                stream_url: streamUrl,
                url: playUrl,
                play_url: playUrl,
                type: 'hls',
                source: 'allchannels'
            });
        }
    }

    const categories: AllChannelCategory[] = [];
    for (const [name, val] of catCounts.entries()) {
        categories.push({ name, icon: val.icon, count: val.count });
    }
    // Sort categories by channel count descending
    categories.sort((a, b) => b.count - a.count);

    return { channels, categories };
}

/**
 * Fetch and parse Combined Live TV playlist with automatic frequent caching
 */
export async function getAllChannelsData(forceRefresh = false): Promise<AllChannelsCache> {
    const now = Date.now();
    if (!forceRefresh && memoryCache && (now - memoryCache.timestamp < CACHE_TTL_MS)) {
        return memoryCache;
    }

    if (isUpdating && memoryCache) {
        return memoryCache;
    }

    isUpdating = true;
    try {
        console.log('[AllChannelsService] Refreshing Combined_Live_TV.m3u from GitHub...');
        const res = await axios.get(COMBINED_M3U_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
                'Accept': 'text/plain, application/octet-stream, */*'
            },
            timeout: 12000
        });

        const m3uText = res.data;
        if (typeof m3uText === 'string' && m3uText.includes('#EXTM3U')) {
            const { channels, categories } = parseCombinedM3u(m3uText);
            memoryCache = {
                channels,
                categories,
                totalCount: channels.length,
                timestamp: Date.now()
            };

            // Persist local backup
            try {
                fs.writeFileSync(CACHE_FILE, JSON.stringify(memoryCache), 'utf-8');
            } catch (_) {}

            console.log(`[AllChannelsService] ⭐ Indexed ${channels.length} channels across ${categories.length} categories.`);
            return memoryCache;
        }
    } catch (err: any) {
        console.warn('[AllChannelsService] GitHub fetch failed, attempting local fallback:', err?.message || err);
    } finally {
        isUpdating = false;
    }

    // Fallback to local cached file
    if (!memoryCache && fs.existsSync(CACHE_FILE)) {
        try {
            const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
            if (data && Array.isArray(data.channels)) {
                memoryCache = data;
                return memoryCache!;
            }
        } catch (_) {}
    }

    return memoryCache || { channels: [], categories: [], totalCount: 0, timestamp: Date.now() };
}

/**
 * Generate M3U playlist format for external IPTV players
 */
export async function generateAllChannelsM3u(baseUrl = 'http://localhost:3000'): Promise<string> {
    const cache = await getAllChannelsData();
    let m3u = `#EXTM3U x-tvg-url="${baseUrl}/epg.xml"\n`;

    for (const ch of cache.channels) {
        m3u += `\n#EXTINF:-1 tvg-id="${ch.id}" tvg-name="${ch.name.replace(/"/g, '')}" tvg-logo="${ch.logo}" group-title="${ch.group}",${ch.name}\n`;
        m3u += `${ch.stream_url}\n`;
    }

    return m3u;
}

/**
 * Initialize frequent background update timer (every 15 minutes)
 */
export function initAllChannelsAutoUpdate() {
    if (autoUpdateTimer) clearInterval(autoUpdateTimer);
    getAllChannelsData(false).catch(() => {});
    autoUpdateTimer = setInterval(() => {
        getAllChannelsData(true).catch(e => console.warn('[AllChannelsService] Auto-update tick failed:', e?.message || e));
    }, CACHE_TTL_MS);
}
