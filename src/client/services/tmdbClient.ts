import { fetchWithTimeout } from './apiClient';
import { TMDBMediaItem } from '../types';

// Algorithm 25: 10-Title Offline TMDB Fallback Pool
export const TMDB_FALLBACK_POOL: TMDBMediaItem[] = [
  {
    id: 157336,
    title: 'Interstellar',
    media_type: 'movie',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/rAiYTsqL070vl52v4B99RpmQd1S.jpg',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.',
    vote_average: 8.4,
    release_date: '2014-11-05',
    trailerKey: 'zSWdZVtXT7E',
  },
  {
    id: 27205,
    title: 'Inception',
    media_type: 'movie',
    poster_path: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    overview: 'Cobb, a skilled thief who steals corporate secrets through dream-sharing technology, is given the inverse task of planting an idea.',
    vote_average: 8.4,
    release_date: '2010-07-15',
    trailerKey: 'YoHD9XEInc0',
  },
  {
    id: 155,
    title: 'The Dark Knight',
    media_type: 'movie',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: '/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
    overview: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.',
    vote_average: 8.5,
    release_date: '2008-07-16',
    trailerKey: 'EXeTwQWrcwY',
  },
  {
    id: 693134,
    title: 'Dune: Part Two',
    media_type: 'movie',
    poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s520Wio.jpg',
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge.',
    vote_average: 8.2,
    release_date: '2024-02-27',
    trailerKey: 'Way9Dexny3w',
  },
  {
    id: 1399,
    name: 'Game of Thrones',
    media_type: 'tv',
    poster_path: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    backdrop_path: '/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg',
    overview: 'Seven noble families fight for control of the mythical land of Westeros.',
    vote_average: 8.4,
    first_air_date: '2011-04-17',
    trailerKey: 'KPLWWIOCOOQ',
  },
  {
    id: 94605,
    name: 'Arcane',
    media_type: 'tv',
    poster_path: '/fqldf2t8ztc9aiwn397FvFeNz9H.jpg',
    backdrop_path: '/rkB4LyZHo1NHXSTXYZaCRvMFrZz.jpg',
    overview: 'Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and convictions.',
    vote_average: 8.7,
    first_air_date: '2021-11-06',
    trailerKey: 'fXmAurh012s',
  },
  {
    id: 119051,
    name: 'Wednesday',
    media_type: 'tv',
    poster_path: '/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
    backdrop_path: '/iHSwvFe7FdFFRmEN09y979W08Sp.jpg',
    overview: 'Wednesday Addams misadventures as a student at Nevermore Academy.',
    vote_average: 8.5,
    first_air_date: '2022-11-23',
    trailerKey: 'Di310BC8BpY',
  },
  {
    id: 66732,
    name: 'Stranger Things',
    media_type: 'tv',
    poster_path: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdrop_path: '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    vote_average: 8.6,
    first_air_date: '2016-07-15',
    trailerKey: 'b9EkMc79ZSU',
  },
  {
    id: 872585,
    title: 'Oppenheimer',
    media_type: 'movie',
    poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop_path: '/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
    overview: 'The story of J. Robert Oppenheimer role in the development of the atomic bomb during World War II.',
    vote_average: 8.1,
    release_date: '2023-07-19',
    trailerKey: 'uYPbbksJxIg',
  },
  {
    id: 385687,
    title: 'Fast X',
    media_type: 'movie',
    poster_path: '/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    backdrop_path: '/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg',
    overview: 'Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path.',
    vote_average: 7.1,
    release_date: '2023-05-17',
    trailerKey: '32RAq6JzY-w',
  },
];

const _lruCache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000;

function getCached<T>(key: string): T | null {
  const item = _lruCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    _lruCache.delete(key);
    return null;
  }
  return item.data as T;
}

function setCached(key: string, data: any) {
  if (_lruCache.size > 200) {
    const oldestKey = _lruCache.keys().next().value;
    if (oldestKey) _lruCache.delete(oldestKey);
  }
  _lruCache.set(key, { data, expiry: Date.now() + CACHE_TTL_MS });
}

export const tmdbClient = {
  async getTrending(mediaType: 'all' | 'movie' | 'tv' = 'all', timeWindow: 'day' | 'week' = 'day'): Promise<TMDBMediaItem[]> {
    const cacheKey = `trending_${mediaType}_${timeWindow}`;
    const cached = getCached<TMDBMediaItem[]>(cacheKey);
    if (cached) return cached;

    try {
      const data = await fetchWithTimeout<any>(`/api/consumet/trending?type=${mediaType}&time=${timeWindow}`);
      const results = (data?.results || data || []).map((item: any) => ({
        ...item,
        media_type: item.media_type || (item.name ? 'tv' : 'movie'),
      }));
      if (results.length > 0) {
        setCached(cacheKey, results);
        return results;
      }
      return TMDB_FALLBACK_POOL;
    } catch (e) {
      return TMDB_FALLBACK_POOL;
    }
  },

  async getPopular(mediaType: 'movie' | 'tv' = 'movie', page = 1): Promise<TMDBMediaItem[]> {
    const cacheKey = `popular_${mediaType}_p${page}`;
    const cached = getCached<TMDBMediaItem[]>(cacheKey);
    if (cached) return cached;

    try {
      const data = await fetchWithTimeout<any>(`/api/consumet/popular?type=${mediaType}&page=${page}`);
      const results = (data?.results || []).map((item: any) => ({
        ...item,
        media_type: mediaType,
      }));
      setCached(cacheKey, results);
      return results;
    } catch (e) {
      return TMDB_FALLBACK_POOL.filter((m) => m.media_type === mediaType);
    }
  },

  async getTopRated(mediaType: 'movie' | 'tv' = 'movie', page = 1): Promise<TMDBMediaItem[]> {
    const cacheKey = `top_rated_${mediaType}_p${page}`;
    const cached = getCached<TMDBMediaItem[]>(cacheKey);
    if (cached) return cached;

    try {
      const data = await fetchWithTimeout<any>(`/api/consumet/top_rated?type=${mediaType}&page=${page}`);
      const results = (data?.results || []).map((item: any) => ({
        ...item,
        media_type: mediaType,
      }));
      setCached(cacheKey, results);
      return results;
    } catch (e) {
      return TMDB_FALLBACK_POOL.filter((m) => m.media_type === mediaType);
    }
  },

  async getDetails(id: number | string, mediaType: 'movie' | 'tv'): Promise<any> {
    const cacheKey = `details_${mediaType}_${id}`;
    const cached = getCached<any>(cacheKey);
    if (cached) return cached;

    try {
      const data = await fetchWithTimeout<any>(`/api/consumet/details?id=${id}&type=${mediaType}`);
      setCached(cacheKey, data);
      return data;
    } catch (e) {
      const match = TMDB_FALLBACK_POOL.find((m) => String(m.id) === String(id));
      return match || null;
    }
  },

  async searchMulti(query: string): Promise<TMDBMediaItem[]> {
    if (!query.trim()) return [];
    try {
      const data = await fetchWithTimeout<any>(`/api/consumet/search?query=${encodeURIComponent(query)}`);
      return (data?.results || []).map((item: any) => ({
        ...item,
        media_type: item.media_type || (item.name ? 'tv' : 'movie'),
      }));
    } catch (e) {
      return [];
    }
  },

  // Algorithm 0: Weighted Trailer Resolution
  async fetchOfficialTrailerKey(id: number | string, mediaType: 'movie' | 'tv', title?: string): Promise<string | null> {
    const cacheKey = `trailer_${mediaType}_${id}`;
    const cached = getCached<string>(cacheKey);
    if (cached) return cached;

    try {
      const details = await this.getDetails(id, mediaType);
      const videos: any[] = details?.videos?.results || [];

      if (videos.length > 0) {
        let bestKey: string | null = null;
        let highestScore = -1;

        for (const v of videos) {
          if (v.site !== 'YouTube' || !v.key) continue;
          let score = 0;
          const vName = (v.name || '').toLowerCase();
          const vType = (v.type || '').toLowerCase();

          if (v.official) score += 100;
          if (v.iso_639_1 === 'en') score += 50;
          if (vType === 'trailer' || vName.includes('trailer')) score += 80;
          if (vType === 'teaser' || vName.includes('teaser')) score += 40;
          if (vName.includes('official')) score += 30;

          if (score > highestScore) {
            highestScore = score;
            bestKey = v.key;
          }
        }

        if (bestKey) {
          setCached(cacheKey, bestKey);
          return bestKey;
        }
      }
    } catch (e) {}

    const fallback = TMDB_FALLBACK_POOL.find((m) => String(m.id) === String(id));
    if (fallback?.trailerKey) return fallback.trailerKey;

    return null;
  },

  // Resolve transparent SVG/PNG title logo
  async resolveTitleLogo(id: number | string, mediaType: 'movie' | 'tv'): Promise<string | null> {
    const cacheKey = `logo_${mediaType}_${id}`;
    const cached = getCached<string>(cacheKey);
    if (cached) return cached;

    try {
      const details = await this.getDetails(id, mediaType);
      const logos = details?.images?.logos || [];
      if (logos.length > 0) {
        const enLogos = logos.filter((l: any) => l.iso_639_1 === 'en');
        const best = enLogos.length > 0 ? enLogos[0] : logos[0];
        if (best?.file_path) {
          const logoUrl = `https://image.tmdb.org/t/p/w500${best.file_path}`;
          setCached(cacheKey, logoUrl);
          return logoUrl;
        }
      }
    } catch (e) {}

    return null;
  },
};
