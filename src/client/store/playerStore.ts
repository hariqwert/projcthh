import { create } from 'zustand';
import { TMDBMediaItem, MediaType, SportsStreamSource } from '../types';

export interface PlayerServer {
  id: string;
  name: string;
  badge: string;
  isEmbed: boolean;
  priority: number;
}

export const EMBED_SERVERS: PlayerServer[] = [
  { id: 'vidlink_pro', name: 'VidLink PRO (Fast Multi-Audio)', badge: '4K Multi-Audio', isEmbed: true, priority: 1 },
  { id: 'vidsrc_pm', name: 'VidSrc PM (Ultra HD)', badge: '1080p Ultra', isEmbed: true, priority: 2 },
  { id: 'vidsrc_to', name: 'VidSrc TO (Direct CDN)', badge: 'Fast CDN', isEmbed: true, priority: 3 },
  { id: 'vidrift', name: 'VidRift (Low Latency)', badge: 'Auto Sync', isEmbed: true, priority: 4 },
  { id: 'twoembed', name: '2Embed (Global Mirror)', badge: 'Multi-Lang', isEmbed: true, priority: 5 },
  { id: 'smashystream', name: 'SmashyStream (Alternative)', badge: 'Backup', isEmbed: true, priority: 6 },
  { id: 'cinezo', name: 'Cinezo (Fast Embed)', badge: 'HD', isEmbed: true, priority: 7 },
  { id: 'filmu', name: 'Filmu / Vidly (Dubbed)', badge: 'Hindi/Multi', isEmbed: true, priority: 8 },
];

interface PlayerState {
  isPlayerOpen: boolean;
  isTheaterMode: boolean;
  activeMedia: TMDBMediaItem | null;
  currentDetail: any | null;
  mediaType: MediaType;
  title: string;
  streamUrl: string;
  streamType: 'hls' | 'dash' | 'mp4' | 'embed';
  clearkey: string | null;
  selectedServer: string;
  audioMode: 'sub' | 'dub';
  currentSeason: number;
  currentEpisode: number;
  backupSources: SportsStreamSource[];
  isLive: boolean;
  
  openPlayer: (options: {
    media?: TMDBMediaItem;
    detail?: any;
    mediaType?: MediaType;
    title?: string;
    streamUrl?: string;
    streamType?: 'hls' | 'dash' | 'mp4' | 'embed';
    clearkey?: string | null;
    server?: string;
    audioMode?: 'sub' | 'dub';
    season?: number;
    episode?: number;
    backupSources?: SportsStreamSource[];
    isLive?: boolean;
  }) => void;
  
  closePlayer: () => void;
  setServer: (server: string) => void;
  setAudioMode: (mode: 'sub' | 'dub') => void;
  setEpisode: (season: number, episode: number) => void;
  setStreamUrl: (url: string, type?: 'hls' | 'dash' | 'mp4' | 'embed', clearkey?: string | null) => void;
  toggleTheaterMode: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlayerOpen: false,
  isTheaterMode: false,
  activeMedia: null,
  currentDetail: null,
  mediaType: 'movie',
  title: '',
  streamUrl: '',
  streamType: 'embed',
  clearkey: null,
  selectedServer: 'vidlink_pro',
  audioMode: 'sub',
  currentSeason: 1,
  currentEpisode: 1,
  backupSources: [],
  isLive: false,

  openPlayer: (options) => {
    const srv = options.server || get().selectedServer || 'vidlink_pro';
    const audio = options.audioMode || get().audioMode || 'sub';
    const season = options.season || 1;
    const episode = options.episode || 1;
    const mType = options.mediaType || (options.media?.media_type as MediaType) || 'movie';
    const title = options.title || options.media?.title || options.media?.name || 'Streaming Media';

    let resolvedUrl = options.streamUrl || '';
    let resolvedType: 'hls' | 'dash' | 'mp4' | 'embed' = options.streamType || (resolvedUrl ? 'hls' : 'embed');

    // If no direct streamUrl is provided for movies/series, build server embed URL
    if (!resolvedUrl && options.media?.id) {
      const tmdbId = options.media.id;
      const isTv = mType === 'tv';
      
      switch (srv) {
        case 'vidlink_pro':
          resolvedUrl = isTv 
            ? `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}?primaryColor=ff2e93&secondaryColor=00f0ff&iconColor=ffffff&icons=default&player=default&title=true&poster=true&autoplay=false${audio === 'dub' ? '&dub=true' : ''}`
            : `https://vidlink.pro/movie/${tmdbId}?primaryColor=ff2e93&secondaryColor=00f0ff&iconColor=ffffff&icons=default&player=default&title=true&poster=true&autoplay=false${audio === 'dub' ? '&dub=true' : ''}`;
          break;
        case 'vidsrc_pm':
          resolvedUrl = isTv
            ? `https://vidsrc.pm/embed/tv/${tmdbId}/${season}/${episode}`
            : `https://vidsrc.pm/embed/movie/${tmdbId}`;
          break;
        case 'vidsrc_to':
          resolvedUrl = isTv
            ? `https://vidsrc.to/embed/tv/${tmdbId}/${season}/${episode}`
            : `https://vidsrc.to/embed/movie/${tmdbId}`;
          break;
        case 'twoembed':
          resolvedUrl = isTv
            ? `https://www.2embed.cc/embedtv/${tmdbId}&s=${season}&e=${episode}`
            : `https://www.2embed.cc/embed/${tmdbId}`;
          break;
        case 'filmu':
          resolvedUrl = isTv
            ? `https://filmu.stream/embed/tv/${tmdbId}/${season}/${episode}`
            : `https://filmu.stream/embed/movie/${tmdbId}`;
          break;
        default:
          resolvedUrl = isTv
            ? `https://vidsrc.xyz/embed/tv/${tmdbId}/${season}-${episode}`
            : `https://vidsrc.xyz/embed/movie/${tmdbId}`;
      }
      resolvedType = 'embed';
    }

    set({
      isPlayerOpen: true,
      activeMedia: options.media || null,
      currentDetail: options.detail || null,
      mediaType: mType,
      title,
      streamUrl: resolvedUrl,
      streamType: resolvedType,
      clearkey: options.clearkey || null,
      selectedServer: srv,
      audioMode: audio,
      currentSeason: season,
      currentEpisode: episode,
      backupSources: options.backupSources || [],
      isLive: Boolean(options.isLive),
    });
  },

  closePlayer: () => {
    set({
      isPlayerOpen: false,
      streamUrl: '',
      activeMedia: null,
      currentDetail: null,
      backupSources: [],
      isLive: false,
    });
  },

  setServer: (server: string) => {
    set({ selectedServer: server });
    const { activeMedia, mediaType, currentSeason, currentEpisode, audioMode } = get();
    if (activeMedia?.id) {
      get().openPlayer({
        media: activeMedia,
        detail: get().currentDetail,
        mediaType,
        season: currentSeason,
        episode: currentEpisode,
        server,
        audioMode,
      });
    }
  },

  setAudioMode: (mode: 'sub' | 'dub') => {
    set({ audioMode: mode });
    const { activeMedia, mediaType, currentSeason, currentEpisode, selectedServer } = get();
    if (activeMedia?.id) {
      get().openPlayer({
        media: activeMedia,
        detail: get().currentDetail,
        mediaType,
        season: currentSeason,
        episode: currentEpisode,
        server: selectedServer,
        audioMode: mode,
      });
    }
  },

  setEpisode: (season: number, episode: number) => {
    set({ currentSeason: season, currentEpisode: episode });
    const { activeMedia, mediaType, selectedServer, audioMode } = get();
    if (activeMedia?.id) {
      get().openPlayer({
        media: activeMedia,
        detail: get().currentDetail,
        mediaType,
        season,
        episode,
        server: selectedServer,
        audioMode,
      });
    }
  },

  setStreamUrl: (url: string, type: 'hls' | 'dash' | 'mp4' | 'embed' = 'hls', clearkey = null) => {
    set({
      streamUrl: url,
      streamType: type,
      clearkey,
      isPlayerOpen: true,
    });
  },

  toggleTheaterMode: () => {
    set((state) => ({ isTheaterMode: !state.isTheaterMode }));
  },
}));
