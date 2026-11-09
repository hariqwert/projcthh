import { fetchWithTimeout } from './apiClient';
import { LiveTvChannel } from '../types';

export const JTV_GENRES = [
  'ALL',
  'Sports',
  'Entertainment',
  'Movies',
  'News',
  'Music',
  'Kids',
  'Infotainment',
  'Devotional',
  'Lifestyle',
];

export const JTV_LANGUAGES = [
  'ALL',
  'Hindi',
  'English',
  'Tamil',
  'Telugu',
  'Malayalam',
  'Kannada',
  'Bengali',
  'Marathi',
  'Punjabi',
  'Gujarati',
];

export const liveTvClient = {
  async fetchChannels(provider: 'jtv' | 'airtel' | 'tatasky' | 'timstreams' = 'jtv'): Promise<LiveTvChannel[]> {
    try {
      let endpoint = '/assets/jtv2.json';
      if (provider === 'airtel') endpoint = '/api/airtel/channels';
      else if (provider === 'timstreams') endpoint = '/api/sports/channels';

      const data = await fetchWithTimeout<any>(endpoint);
      const rawChannels: any[] = Array.isArray(data) ? data : data?.result || data?.channels || [];

      return rawChannels.map((c: any) => {
        const id = String(c.channel_id || c.id || c.channelId);
        const name = c.channel_name || c.name || 'Live Channel';
        const logo = c.logoUrl || c.logo || c.logo_url || `/assets/logos/${id}.png`;
        const category = c.channel_category || c.category || c.genre || 'Entertainment';
        const language = c.channel_language || c.language || 'Hindi';
        
        let streamUrl = c.streamUrl || c.url || '';
        let type: 'hls' | 'dash' = c.manifest_type === 'mpd' || streamUrl.includes('.mpd') ? 'dash' : 'hls';
        let clearkey = c.clearkey || null;

        if (id.startsWith('mdtv-') || (c.group && c.group.toLowerCase().includes('mdtv'))) {
          streamUrl = `/api/mdtv/manifest/${id.replace('mdtv-', '')}.mpd`;
          type = 'dash';
        } else if (!streamUrl) {
          streamUrl = `/live.php?token=STALKER_PRO&id=${encodeURIComponent(id)}`;
        }

        return {
          id,
          name,
          logo,
          category,
          language,
          streamUrl,
          type,
          clearkey,
          hasEpg: Boolean(c.hasEpg || c.epg),
          sourceProvider: provider,
        };
      });
    } catch (e) {
      return [];
    }
  },

  buildPlayUrl(channel: LiveTvChannel): string {
    if (channel.clearkey) {
      return `/play_consumet.php?channel_id=${encodeURIComponent(channel.id)}&name=${encodeURIComponent(channel.name)}&url=${encodeURIComponent(channel.streamUrl)}&clearkey=${encodeURIComponent(channel.clearkey)}&type=${channel.type}&source=consumet.html`;
    }
    return `/play_consumet.php?channel_id=${encodeURIComponent(channel.id)}&name=${encodeURIComponent(channel.name)}&url=${encodeURIComponent(channel.streamUrl)}&type=${channel.type}&source=consumet.html`;
  },
};
