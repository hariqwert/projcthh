import { create } from 'zustand';
import { NavigationTab } from '../types';

interface NavigationState {
  activeTab: NavigationTab;
  mobileDrawerOpen: boolean;
  searchPaletteOpen: boolean;
  searchQuery: string;
  selectedGenre: string | null;
  setTab: (tab: NavigationTab, updateUrl?: boolean) => void;
  toggleMobileDrawer: (open?: boolean) => void;
  setSearchPaletteOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string | null) => void;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  activeTab: (function() {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as NavigationTab;
    const validTabs: NavigationTab[] = ['home', 'live-now', 'sports', 'livetv', 'movies', 'series', 'anime', 'epg', 'watchlist'];
    return validTabs.includes(tabParam) ? tabParam : 'home';
  })(),
  mobileDrawerOpen: false,
  searchPaletteOpen: false,
  searchQuery: '',
  selectedGenre: null,

  setTab: (tab: NavigationTab, updateUrl = true) => {
    set({ activeTab: tab, mobileDrawerOpen: false });
    if (updateUrl && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (tab === 'home') {
        url.searchParams.delete('tab');
      } else {
        url.searchParams.set('tab', tab);
      }
      window.history.pushState({ tab }, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  toggleMobileDrawer: (open?: boolean) => {
    set((state) => ({ mobileDrawerOpen: open !== undefined ? open : !state.mobileDrawerOpen }));
  },

  setSearchPaletteOpen: (open: boolean) => {
    set({ searchPaletteOpen: open });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSelectedGenre: (genre: string | null) => {
    set({ selectedGenre: genre });
  },
}));
