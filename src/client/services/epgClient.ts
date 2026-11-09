import { fetchWithTimeout } from './apiClient';
import { EpgProgramItem } from '../types';

export const epgClient = {
  calculateProgressPct(start: string, stop: string): number {
    try {
      const startMs = new Date(start).getTime();
      const stopMs = new Date(stop).getTime();
      const now = Date.now();
      if (isNaN(startMs) || isNaN(stopMs) || stopMs <= startMs) return 0;
      const progress = ((now - startMs) / (stopMs - startMs)) * 100;
      return Math.min(100, Math.max(0, Math.round(progress)));
    } catch (e) {
      return 0;
    }
  },

  async fetchEpgForChannel(channelId: string): Promise<EpgProgramItem[]> {
    try {
      const data = await fetchWithTimeout<any>(`/api/epg/channel/${encodeURIComponent(channelId)}`);
      const programs: any[] = Array.isArray(data) ? data : data?.programs || [];
      return programs.map((p: any) => ({
        id: String(p.id || `${channelId}_${p.start}`),
        channelId,
        channelName: p.channelName,
        title: p.title || 'Untitled Program',
        desc: p.desc || p.description || '',
        start: p.start,
        stop: p.stop,
        category: p.category || 'General',
        progressPct: this.calculateProgressPct(p.start, p.stop),
      }));
    } catch (e) {
      return [];
    }
  },

  async fetchAllEpgTimeline(network = 'ALL'): Promise<Record<string, EpgProgramItem[]>> {
    try {
      const data = await fetchWithTimeout<any>(`/api/epg/timeline?network=${encodeURIComponent(network)}`);
      const scheduleMap: Record<string, EpgProgramItem[]> = {};

      if (data && typeof data === 'object') {
        for (const [chId, progs] of Object.entries(data)) {
          if (Array.isArray(progs)) {
            scheduleMap[chId] = progs.map((p: any) => ({
              id: String(p.id || `${chId}_${p.start}`),
              channelId: chId,
              channelName: p.channelName,
              title: p.title || 'Untitled Program',
              desc: p.desc || '',
              start: p.start,
              stop: p.stop,
              category: p.category || 'General',
              progressPct: this.calculateProgressPct(p.start, p.stop),
            }));
          }
        }
      }

      return scheduleMap;
    } catch (e) {
      return {};
    }
  },
};
