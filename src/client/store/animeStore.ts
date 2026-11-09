import { create } from 'zustand';
import { AnimeItem } from '../types';

interface AnimeState {
  activeProvider: 'anivexa' | 'consumet' | 'rareanimes' | 'animesalt' | 'tokyoinsider';
  activeScheduleDay: string;
  selectedAnime: AnimeItem | null;
  onePieceCurrentArc: string;
  animeSchedule: Record<string, AnimeItem[]>;
  popularAnime: AnimeItem[];
  trendingAnime: AnimeItem[];
  isLoading: boolean;

  setActiveProvider: (provider: 'anivexa' | 'consumet' | 'rareanimes' | 'animesalt' | 'tokyoinsider') => void;
  setActiveScheduleDay: (day: string) => void;
  setSelectedAnime: (anime: AnimeItem | null) => void;
  setOnePieceCurrentArc: (arc: string) => void;
  setAnimeSchedule: (schedule: Record<string, AnimeItem[]>) => void;
  setPopularAnime: (list: AnimeItem[]) => void;
  setTrendingAnime: (list: AnimeItem[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useAnimeStore = create<AnimeState>((set) => ({
  activeProvider: 'anivexa',
  activeScheduleDay: 'today',
  selectedAnime: null,
  onePieceCurrentArc: 'Egghead Island',
  animeSchedule: {},
  popularAnime: [],
  trendingAnime: [],
  isLoading: false,

  setActiveProvider: (provider) => set({ activeProvider: provider }),
  setActiveScheduleDay: (day) => set({ activeScheduleDay: day }),
  setSelectedAnime: (anime) => set({ selectedAnime: anime }),
  setOnePieceCurrentArc: (arc) => set({ onePieceCurrentArc: arc }),
  setAnimeSchedule: (schedule) => set({ animeSchedule: schedule }),
  setPopularAnime: (list) => set({ popularAnime: list }),
  setTrendingAnime: (list) => set({ trendingAnime: list }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
