import { fetchWithTimeout } from './apiClient';
import { SportsEvent, SportsStreamSource, LiveTvChannel } from '../types';

export const SPORTS_CHANNEL_LOGOS: Record<string, string> = {
  'star sports 1 hd': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Star_Sports_1_HD_logo.png',
  'star sports 2 hd': 'https://upload.wikimedia.org/wikipedia/commons/5/52/Star_Sports_2_HD_logo.png',
  'star sports select 1 hd': 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Star_Sports_Select_1_HD.png',
  'star sports select 2 hd': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Star_Sports_Select_2_HD.png',
  'star sports hindi hd': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Star_Sports_1_HD_logo.png',
  'sony ten 1 hd': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sony_TEN_1_HD_logo.svg/512px-Sony_TEN_1_HD_logo.svg.png',
  'sony ten 2 hd': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Sony_TEN_2_HD_logo.svg/512px-Sony_TEN_2_HD_logo.svg.png',
  'sony ten 3 hd': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sony_TEN_3_HD_logo.svg/512px-Sony_TEN_3_HD_logo.svg.png',
  'sony ten 4 hd': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Sony_TEN_4_HD_logo.svg/512px-Sony_TEN_4_HD_logo.svg.png',
  'sony ten 5 hd': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Sony_TEN_5_HD_logo.svg/512px-Sony_TEN_5_HD_logo.svg.png',
  'sony six hd': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Sony_TEN_5_HD_logo.svg/512px-Sony_TEN_5_HD_logo.svg.png',
  'willow hd': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Willow_TV_logo.svg/512px-Willow_TV_logo.svg.png',
  'willow extra': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Willow_TV_logo.svg/512px-Willow_TV_logo.svg.png',
  'sky sports main event': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Sky_Sports_Main_Event_logo.svg/512px-Sky_Sports_Main_Event_logo.svg.png',
  'sky sports cricket': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Sky_Sports_Cricket_logo.svg/512px-Sky_Sports_Cricket_logo.svg.png',
  'sky sports football': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Sky_Sports_Football_logo.svg/512px-Sky_Sports_Football_logo.svg.png',
  'sky sports premier league': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Sky_Sports_Premier_League_logo.svg/512px-Sky_Sports_Premier_League_logo.svg.png',
  'sky sports f1': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Sky_Sports_F1_logo.svg/512px-Sky_Sports_F1_logo.svg.png',
  'tnt sports 1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/TNT_Sports_1.svg/512px-TNT_Sports_1.svg.png',
  'tnt sports 2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/TNT_Sports_2.svg/512px-TNT_Sports_2.svg.png',
  'tnt sports 3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/TNT_Sports_3.svg/512px-TNT_Sports_3.svg.png',
  'tnt sports 4': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/TNT_Sports_4.svg/512px-TNT_Sports_4.svg.png',
  'eurosport 1 hd': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Eurosport_1_logo_2015.svg/512px-Eurosport_1_logo_2015.svg.png',
  'eurosport 2 hd': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Eurosport_2_logo_2015.svg/512px-Eurosport_2_logo_2015.svg.png',
  'dd sports': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/DD_Sports_logo.svg/512px-DD_Sports_logo.svg.png',
  'astro cricket': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Astro_Cricket_logo.svg/512px-Astro_Cricket_logo.svg.png',
  'bein sports 1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/BeIN_Sports_1_logo.svg/512px-BeIN_Sports_1_logo.svg.png',
  'super sport cricket': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/SuperSport_Cricket_logo.svg/512px-SuperSport_Cricket_logo.svg.png',
};

export const KNOWN_TEAM_LOGOS: Record<string, string> = {
  'india': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Cricket_India_Crest.svg/200px-Cricket_India_Crest.svg.png',
  'australia': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Cricket_Australia_logo.svg/200px-Cricket_Australia_logo.svg.png',
  'england': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/England_and_Wales_Cricket_Board_logo.svg/200px-England_and_Wales_Cricket_Board_logo.svg.png',
  'south africa': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Cricket_South_Africa_logo.svg/200px-Cricket_South_Africa_logo.svg.png',
  'pakistan': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Pakistan_Cricket_Board_logo.svg/200px-Pakistan_Cricket_Board_logo.svg.png',
  'csk': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/200px-Chennai_Super_Kings_Logo.svg.png',
  'rcb': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Royal_Challengers_Bengaluru_Logo.png/200px-Royal_Challengers_Bengaluru_Logo.png',
  'mi': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/200px-Mumbai_Indians_Logo.svg.png',
  'kkr': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Kolkata_Knight_Riders_Logo.svg/200px-Kolkata_Knight_Riders_Logo.svg.png',
  'real madrid': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/200px-Real_Madrid_CF.svg.png',
  'barcelona': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/200px-FC_Barcelona_%28crest%29.svg.png',
  'manchester united': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/200px-Manchester_United_FC_crest.svg.png',
  'arsenal': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/200px-Arsenal_FC.svg.png',
};

export function getSportsLogo(channelName: string): string {
  const clean = channelName.trim().toLowerCase();
  for (const [key, url] of Object.entries(SPORTS_CHANNEL_LOGOS)) {
    if (clean.includes(key)) return url;
  }
  return '/assets/logos/sports_default.png';
}

export function getTeamLogo(teamName: string): string | null {
  const clean = teamName.trim().toLowerCase();
  for (const [key, url] of Object.entries(KNOWN_TEAM_LOGOS)) {
    if (clean.includes(key) || key.includes(clean)) return url;
  }
  return null;
}

export function isValidThumbnail(url?: string | null): boolean {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return false;
  const badPatterns = [
    'unique-tournament',
    'FC_Sports_Default',
    'ui-avatars.com',
    'placeholder',
    'default_thumb'
  ];
  const lower = url.toLowerCase();
  return !badPatterns.some((pattern) => lower.includes(pattern.toLowerCase()));
}

export function rankStreamSources(sources: SportsStreamSource[]): SportsStreamSource[] {
  const getWeight = (source: SportsStreamSource): number => {
    const name = (source.name || '').toLowerCase();
    const url = (source.url || '').toLowerCase();
    const provider = (source.provider || '').toLowerCase();

    if (provider.includes('sony') || name.includes('sony') || url.includes('sonyliv')) return 100;
    if (provider.includes('willow') || name.includes('willow')) return 95;
    if (provider.includes('fancode') || name.includes('fancode')) return 90;
    if (provider.includes('prime') || name.includes('prime')) return 85;
    if (name.includes('star sports') || name.includes('tnt') || name.includes('sky')) return 80;
    if (provider.includes('timstreams') || url.includes('timst')) return 70;
    if (url.includes('live.php')) return 60;
    return 50;
  };

  return [...sources].sort((a, b) => getWeight(b) - getWeight(a));
}

export function computeEventHotness(event: SportsEvent): number {
  let score = 0;
  const title = (event.title || '').toLowerCase();
  const category = (event.category || '').toLowerCase();

  if (event.status === 'LIVE' || event.isLive) {
    score += 25000;
  } else if (event.status === 'ENDED') {
    return -999999;
  }

  if (category.includes('cricket') || title.includes('ipl') || title.includes('test')) score += 6000;
  if (title.includes('india') || title.includes('final')) score += 8000;
  if (category.includes('football') || title.includes('premier league')) score += 5000;
  score += (event.sources?.length || 0) * 500;

  return score;
}

export const sportsClient = {
  async fetchLiveEvents(): Promise<{ live: SportsEvent[]; upcoming: SportsEvent[]; ended: SportsEvent[] }> {
    try {
      const data = await fetchWithTimeout<any>('/api/sports/live-events');
      const rawEvents: any[] = Array.isArray(data) ? data : data?.events || [];

      const parsed: SportsEvent[] = rawEvents.map((item: any) => {
        const title = item.title || item.name || `${item.team1 || ''} vs ${item.team2 || ''}`.trim() || 'Sports Event';
        const teams = {
          home: item.teams?.home || item.team1 || title.split(/\s+(?:vs\.?|v)\s+/i)[0]?.trim() || '',
          away: item.teams?.away || item.team2 || title.split(/\s+(?:vs\.?|v)\s+/i)[1]?.trim() || '',
        };

        const homeLogo = item.logos?.home || getTeamLogo(teams.home) || undefined;
        const awayLogo = item.logos?.away || getTeamLogo(teams.away) || undefined;

        const isLive = Boolean(item.isLive || item.status === 'LIVE' || item.live);
        const status: 'LIVE' | 'UPCOMING' | 'ENDED' = isLive ? 'LIVE' : (item.status === 'ENDED' ? 'ENDED' : 'UPCOMING');

        const sources: SportsStreamSource[] = (item.sources || item.streams || []).map((s: any, idx: number) => ({
          id: s.id || `src_${item.id || idx}_${idx}`,
          name: s.name || s.channel || `Feed ${idx + 1}`,
          url: s.url || s.stream_url || '',
          type: s.type || (s.url?.includes('.mpd') ? 'dash' : 'hls'),
          clearkey: s.clearkey || null,
          priority: s.priority || idx + 1,
          provider: s.provider || 'timstreams',
        }));

        const rankedSources = rankStreamSources(sources);

        const eventObj: SportsEvent = {
          id: String(item.id || item.event_id || Math.random().toString(36).substring(2, 9)),
          title,
          category: item.category || item.sport || 'Sports',
          tournament: item.tournament || item.league || '',
          status,
          startTime: item.startTime || item.time || '',
          teams,
          logos: { home: homeLogo, away: awayLogo },
          scorecard: item.scorecard || undefined,
          sources: rankedSources,
          thumbnailUrl: isValidThumbnail(item.thumbnailUrl || item.poster) ? (item.thumbnailUrl || item.poster) : undefined,
          isLive,
        };

        eventObj.hotnessScore = computeEventHotness(eventObj);
        return eventObj;
      });

      const live = parsed.filter((e) => e.status === 'LIVE').sort((a, b) => (b.hotnessScore || 0) - (a.hotnessScore || 0));
      const upcoming = parsed.filter((e) => e.status === 'UPCOMING').sort((a, b) => (b.hotnessScore || 0) - (a.hotnessScore || 0));
      const ended = parsed.filter((e) => e.status === 'ENDED');

      return { live, upcoming, ended };
    } catch (e) {
      return { live: [], upcoming: [], ended: [] };
    }
  },

  async fetchSportsChannels(): Promise<LiveTvChannel[]> {
    try {
      const data = await fetchWithTimeout<any>('/api/sports/channels');
      const list = Array.isArray(data) ? data : data?.channels || [];
      return list.map((c: any) => ({
        id: String(c.id || c.channel_id),
        name: c.name || c.title || 'Sports Channel',
        logo: c.logo || getSportsLogo(c.name || ''),
        category: 'Sports',
        language: c.language || 'English',
        streamUrl: c.streamUrl || c.url || '',
        type: c.type || (c.url?.includes('.mpd') ? 'dash' : 'hls'),
        clearkey: c.clearkey || null,
        sourceProvider: c.sourceProvider || 'timstreams',
        streamCount: c.streamCount || 1,
      }));
    } catch (e) {
      return [];
    }
  },

  async fetchIplReplays(): Promise<any[]> {
    try {
      const data = await fetchWithTimeout<any>('/api/sports/ipl-replays');
      return Array.isArray(data) ? data : data?.replays || [];
    } catch (e) {
      return [];
    }
  },

  async probeSourceReachability(source: SportsStreamSource): Promise<{ isOnline: boolean; latencyMs: number }> {
    const start = performance.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      await fetch(source.url, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'no-cors',
      });
      clearTimeout(timeoutId);

      const latencyMs = Math.round(performance.now() - start);
      return { isOnline: true, latencyMs };
    } catch (e) {
      const latencyMs = Math.round(performance.now() - start);
      return { isOnline: false, latencyMs: latencyMs >= 3500 ? 3500 : latencyMs };
    }
  },
};
