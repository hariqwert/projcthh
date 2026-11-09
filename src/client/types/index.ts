export type NavigationTab = 
  | 'home' 
  | 'live-now' 
  | 'sports' 
  | 'livetv' 
  | 'movies' 
  | 'series' 
  | 'anime' 
  | 'epg' 
  | 'watchlist';

export type MediaType = 'movie' | 'tv' | 'sports' | 'livetv' | 'anime';

export interface TMDBMediaItem {
  id: number | string;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: 'movie' | 'tv';
  genre_ids?: number[];
  genres?: Array<{ id: number; name: string }>;
  runtime?: number;
  trailerKey?: string;
  logoUrl?: string | null;
  cast?: Array<{ id: number; name: string; character: string; profile_path: string | null }>;
  number_of_seasons?: number;
  number_of_episodes?: number;
  seasons?: Array<{
    id: number;
    season_number: number;
    name: string;
    episode_count: number;
    poster_path: string | null;
  }>;
}

export interface SportsStreamSource {
  id: string;
  name: string;
  url: string;
  type: 'hls' | 'dash' | 'mp4';
  clearkey?: string | null;
  priority: number;
  latency?: number;
  isOnline?: boolean;
  provider?: string;
}

export interface CricketScorecard {
  summary?: string;
  crr?: string;
  rrr?: string;
  target?: string;
  score?: string;
  overs?: string;
  balls?: Array<{ ball: string; score: string; type: 'dot' | 'run' | 'boundary' | 'wicket' | 'extra' }>;
  batsman?: { name: string; runs: number; balls: number; strikeRate?: string };
  bowler?: { name: string; overs: string; runs: number; wickets: number; economy?: string };
}

export interface FootballScorecard {
  score?: string;
  time?: string;
  possession?: { home: number; away: number };
  shots?: { home: number; away: number };
}

export interface SportsEvent {
  id: string;
  title: string;
  category: string;
  tournament?: string;
  status: 'LIVE' | 'UPCOMING' | 'ENDED';
  startTime?: string;
  teams?: {
    home: string;
    away: string;
  };
  logos?: {
    home?: string;
    away?: string;
  };
  scorecard?: {
    cricket?: CricketScorecard;
    football?: FootballScorecard;
    raw?: any;
  };
  sources: SportsStreamSource[];
  thumbnailUrl?: string;
  isLive: boolean;
  isHot?: boolean;
  hotnessScore?: number;
}

export interface LiveTvChannel {
  id: string;
  channel_id?: string;
  name: string;
  logo: string;
  group?: string;
  category: string;
  language: string;
  streamUrl: string;
  type: 'hls' | 'dash';
  clearkey?: string | null;
  hasEpg?: boolean;
  sourceProvider: 'jtv' | 'tatasky' | 'airtel' | 'timstreams' | 'custom';
  streamCount?: number;
  currentProgram?: {
    title: string;
    start: string;
    end: string;
    progress: number;
  };
}

export interface AnimeItem {
  id: string | number;
  malId?: number;
  anilistId?: number;
  title: {
    romaji?: string;
    english?: string;
    native?: string;
    userPreferred?: string;
  } | string;
  coverImage?: string;
  bannerImage?: string;
  format?: string;
  status?: string;
  episodes?: number;
  genres?: string[];
  averageScore?: number;
  nextAiringEpisode?: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  };
  hindiDubAvailable?: boolean;
  description?: string;
}

export interface EpgProgramItem {
  id: string;
  channelId: string;
  channelName?: string;
  title: string;
  desc?: string;
  start: string;
  stop: string;
  category?: string;
  progressPct?: number;
}

export interface WatchHistoryItem {
  id: string | number;
  mediaType: MediaType;
  title: string;
  poster: string;
  backdrop?: string;
  currentTime: number;
  duration: number;
  progressPct: number;
  season?: number;
  episode?: number;
  lastWatched: number;
  streamUrl?: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}
