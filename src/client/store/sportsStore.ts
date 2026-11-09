import { create } from 'zustand';
import { SportsEvent, SportsStreamSource } from '../types';

interface SportsState {
  liveEvents: SportsEvent[];
  upcomingEvents: SportsEvent[];
  endedEvents: SportsEvent[];
  activeSportCategory: string;
  selectedMatch: SportsEvent | null;
  isMatchCenterOpen: boolean;
  probeLatencies: Record<string, number>;
  filterIplLanguage: 'ALL' | 'ENGLISH' | 'HINDI';
  iplReplays: any[];
  isLoading: boolean;

  setEvents: (events: { live: SportsEvent[]; upcoming: SportsEvent[]; ended?: SportsEvent[] }) => void;
  setActiveSportCategory: (cat: string) => void;
  openMatchCenter: (event: SportsEvent) => void;
  closeMatchCenter: () => void;
  setProbeLatency: (sourceId: string, latency: number) => void;
  setFilterIplLanguage: (lang: 'ALL' | 'ENGLISH' | 'HINDI') => void;
  setIplReplays: (replays: any[]) => void;
  updateEventScorecard: (eventId: string, scorecard: any) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useSportsStore = create<SportsState>((set, get) => ({
  liveEvents: [],
  upcomingEvents: [],
  endedEvents: [],
  activeSportCategory: 'ALL',
  selectedMatch: null,
  isMatchCenterOpen: false,
  probeLatencies: {},
  filterIplLanguage: 'ALL',
  iplReplays: [],
  isLoading: false,

  setEvents: ({ live, upcoming, ended = [] }) => {
    set({
      liveEvents: live,
      upcomingEvents: upcoming,
      endedEvents: ended,
    });
  },

  setActiveSportCategory: (cat: string) => {
    set({ activeSportCategory: cat });
  },

  openMatchCenter: (event: SportsEvent) => {
    set({
      selectedMatch: event,
      isMatchCenterOpen: true,
    });
  },

  closeMatchCenter: () => {
    set({
      isMatchCenterOpen: false,
      selectedMatch: null,
    });
  },

  setProbeLatency: (sourceId: string, latency: number) => {
    set((state) => ({
      probeLatencies: {
        ...state.probeLatencies,
        [sourceId]: latency,
      },
    }));
  },

  setFilterIplLanguage: (lang) => {
    set({ filterIplLanguage: lang });
  },

  setIplReplays: (replays) => {
    set({ iplReplays: replays });
  },

  updateEventScorecard: (eventId: string, scorecard: any) => {
    set((state) => {
      const updateList = (list: SportsEvent[]) =>
        list.map((item) =>
          item.id === eventId
            ? { ...item, scorecard: { ...item.scorecard, ...scorecard } }
            : item
        );

      return {
        liveEvents: updateList(state.liveEvents),
        selectedMatch:
          state.selectedMatch?.id === eventId
            ? { ...state.selectedMatch, scorecard: { ...state.selectedMatch.scorecard, ...scorecard } }
            : state.selectedMatch,
      };
    });
  },

  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
