import { create } from 'zustand';
import { TMDBMediaItem, WatchHistoryItem } from '../types';

const STORAGE_KEYS = {
  WATCHLIST: 'consumet_watchlist_react',
  HISTORY: 'consumet_history_react',
  PINNED_CHANNELS: 'consumet_pinned_channels',
};

function safeGetJson<T>(key: string, defVal: T): T {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return raw ? JSON.parse(raw) : defVal;
  } catch (e) {
    return defVal;
  }
}

function safeSetJson(key: string, val: any) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(val));
    }
  } catch (e) {}
}

interface FavoritesState {
  watchlist: TMDBMediaItem[];
  watchHistory: WatchHistoryItem[];
  pinnedChannels: string[];

  addToWatchlist: (item: TMDBMediaItem) => void;
  removeFromWatchlist: (id: string | number) => void;
  toggleWatchlist: (item: TMDBMediaItem) => boolean;
  isInWatchlist: (id: string | number) => boolean;

  recordHistory: (item: WatchHistoryItem) => void;
  removeHistoryItem: (id: string | number) => void;
  clearHistory: () => void;

  togglePinChannel: (channelId: string) => void;
  isChannelPinned: (channelId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  watchlist: safeGetJson<TMDBMediaItem[]>(STORAGE_KEYS.WATCHLIST, []),
  watchHistory: safeGetJson<WatchHistoryItem[]>(STORAGE_KEYS.HISTORY, []),
  pinnedChannels: safeGetJson<string[]>(STORAGE_KEYS.PINNED_CHANNELS, []),

  addToWatchlist: (item) => {
    set((state) => {
      if (state.watchlist.some((w) => String(w.id) === String(item.id))) return state;
      const updated = [item, ...state.watchlist];
      safeSetJson(STORAGE_KEYS.WATCHLIST, updated);
      return { watchlist: updated };
    });
  },

  removeFromWatchlist: (id) => {
    set((state) => {
      const updated = state.watchlist.filter((w) => String(w.id) !== String(id));
      safeSetJson(STORAGE_KEYS.WATCHLIST, updated);
      return { watchlist: updated };
    });
  },

  toggleWatchlist: (item) => {
    const { watchlist, addToWatchlist, removeFromWatchlist } = get();
    const exists = watchlist.some((w) => String(w.id) === String(item.id));
    if (exists) {
      removeFromWatchlist(item.id);
      return false;
    } else {
      addToWatchlist(item);
      return true;
    }
  },

  isInWatchlist: (id) => {
    return get().watchlist.some((w) => String(w.id) === String(id));
  },

  recordHistory: (item) => {
    set((state) => {
      // 25-item limit from Algorithm 24
      const filtered = state.watchHistory.filter((h) => String(h.id) !== String(item.id));
      const updated = [item, ...filtered].slice(0, 25);
      safeSetJson(STORAGE_KEYS.HISTORY, updated);
      return { watchHistory: updated };
    });
  },

  removeHistoryItem: (id) => {
    set((state) => {
      const updated = state.watchHistory.filter((h) => String(h.id) !== String(id));
      safeSetJson(STORAGE_KEYS.HISTORY, updated);
      return { watchHistory: updated };
    });
  },

  clearHistory: () => {
    safeSetJson(STORAGE_KEYS.HISTORY, []);
    set({ watchHistory: [] });
  },

  togglePinChannel: (channelId) => {
    set((state) => {
      const isPinned = state.pinnedChannels.includes(channelId);
      const updated = isPinned
        ? state.pinnedChannels.filter((id) => id !== channelId)
        : [...state.pinnedChannels, channelId];
      safeSetJson(STORAGE_KEYS.PINNED_CHANNELS, updated);
      return { pinnedChannels: updated };
    });
  },

  isChannelPinned: (channelId) => {
    return get().pinnedChannels.includes(channelId);
  },
}));
