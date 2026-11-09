import { fetchWithTimeout } from './apiClient';
import { AnimeItem } from '../types';

export const ONE_PIECE_ARCS = [
  { name: 'Egghead Island', startEp: 1086, endEp: 1122, thumb: 'https://image.tmdb.org/t/p/w500/d4n83bW8l9wAkyXj92W8hG2r5Y.jpg' },
  { name: 'Wano Country', startEp: 892, endEp: 1085, thumb: 'https://image.tmdb.org/t/p/w500/fTmtBfZG0N7y0lJ3K789O6q6K6e.jpg' },
  { name: 'Whole Cake Island', startEp: 783, endEp: 891, thumb: 'https://image.tmdb.org/t/p/w500/6lW4t6w96eZ4m2nJ0k76O5L3w8.jpg' },
  { name: 'Dressrosa', startEp: 629, endEp: 746, thumb: 'https://image.tmdb.org/t/p/w500/z7w1g8J7k7l8v6m5k4l3w2.jpg' },
  { name: 'Marineford', startEp: 457, endEp: 489, thumb: 'https://image.tmdb.org/t/p/w500/b4k6w8m9j0p2l4n6h8g.jpg' },
  { name: 'Enies Lobby', startEp: 264, endEp: 312, thumb: 'https://image.tmdb.org/t/p/w500/v4b2m6k8h0j4l2n4h.jpg' },
  { name: 'Alabasta', startEp: 92, endEp: 130, thumb: 'https://image.tmdb.org/t/p/w500/n8j6h4l2m0p2k4.jpg' },
];

export const animeClient = {
  async getTrending(): Promise<AnimeItem[]> {
    try {
      const data = await fetchWithTimeout<any>('/api/anime/trending');
      const list = Array.isArray(data) ? data : data?.results || [];
      return list.map((item: any) => ({
        id: item.id,
        malId: item.malId || item.idMal,
        anilistId: item.anilistId || item.id,
        title: item.title?.userPreferred || item.title?.english || item.title?.romaji || item.title || 'Anime Title',
        coverImage: item.image || item.coverImage?.extraLarge || item.coverImage?.large,
        bannerImage: item.bannerImage,
        format: item.type || item.format || 'TV',
        status: item.status,
        episodes: item.totalEpisodes || item.episodes,
        genres: item.genres || [],
        averageScore: item.rating || item.averageScore,
        hindiDubAvailable: Boolean(item.hindiDubAvailable || item.dubAvailable),
        description: item.description,
      }));
    } catch (e) {
      return [];
    }
  },

  async getPopular(): Promise<AnimeItem[]> {
    try {
      const data = await fetchWithTimeout<any>('/api/anime/popular');
      const list = Array.isArray(data) ? data : data?.results || [];
      return list.map((item: any) => ({
        id: item.id,
        malId: item.malId || item.idMal,
        anilistId: item.anilistId || item.id,
        title: item.title?.userPreferred || item.title?.english || item.title?.romaji || item.title || 'Anime Title',
        coverImage: item.image || item.coverImage?.extraLarge || item.coverImage?.large,
        bannerImage: item.bannerImage,
        format: item.type || item.format || 'TV',
        status: item.status,
        episodes: item.totalEpisodes || item.episodes,
        genres: item.genres || [],
        averageScore: item.rating || item.averageScore,
        hindiDubAvailable: Boolean(item.hindiDubAvailable || item.dubAvailable),
        description: item.description,
      }));
    } catch (e) {
      return [];
    }
  },

  async getAiringSchedule(day = 'today'): Promise<AnimeItem[]> {
    try {
      const data = await fetchWithTimeout<any>(`/api/anime/schedule?day=${day}`);
      const list = Array.isArray(data) ? data : data?.results || [];
      return list.map((item: any) => ({
        id: item.id,
        malId: item.malId || item.idMal,
        anilistId: item.anilistId || item.id,
        title: item.title?.userPreferred || item.title?.english || item.title?.romaji || item.title || 'Airing Anime',
        coverImage: item.image || item.coverImage?.large,
        nextAiringEpisode: item.nextAiringEpisode || {
          episode: item.episode || 1,
          airingAt: item.airingAt || 0,
          timeUntilAiring: item.timeUntilAiring || 0,
        },
        genres: item.genres || [],
        averageScore: item.rating || item.averageScore,
      }));
    } catch (e) {
      return [];
    }
  },

  async getEpisodeSources(animeId: string | number, episode: number, provider = 'anivexa', audio: 'sub' | 'dub' = 'sub') {
    try {
      const data = await fetchWithTimeout<any>(`/api/anime/episode-sources?id=${animeId}&episode=${episode}&provider=${provider}&audio=${audio}`);
      return data?.sources || [];
    } catch (e) {
      return [];
    }
  },
};
