import { create } from 'zustand';
import { TMDBMediaItem, ToastNotification } from '../types';

export type AppTheme = 'velvet' | 'appletv' | 'obsidian' | 'aurora';

interface UIState {
  theme: AppTheme;
  toasts: ToastNotification[];
  mediaDetailsItem: TMDBMediaItem | null;
  isMediaDetailsOpen: boolean;
  trailerKey: string | null;
  trailerTitle: string | null;
  isTrailerOpen: boolean;
  personId: number | null;
  isPersonOpen: boolean;

  setTheme: (theme: AppTheme) => void;
  openMediaDetails: (item: TMDBMediaItem) => void;
  closeMediaDetails: () => void;
  openTrailer: (key: string, title?: string) => void;
  closeTrailer: () => void;
  openPerson: (id: number) => void;
  closePerson: () => void;
  addToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'velvet',
  toasts: [],
  mediaDetailsItem: null,
  isMediaDetailsOpen: false,
  trailerKey: null,
  trailerTitle: null,
  isTrailerOpen: false,
  personId: null,
  isPersonOpen: false,

  setTheme: (theme) => set({ theme }),

  openMediaDetails: (item) => set({ mediaDetailsItem: item, isMediaDetailsOpen: true }),
  closeMediaDetails: () => set({ mediaDetailsItem: null, isMediaDetailsOpen: false }),

  openTrailer: (key, title = 'Official Trailer') =>
    set({ trailerKey: key, trailerTitle: title, isTrailerOpen: true }),
  closeTrailer: () => set({ trailerKey: null, trailerTitle: null, isTrailerOpen: false }),

  // Resolves legacy bug: conflicting person modals
  openPerson: (id) => set({ personId: id, isPersonOpen: true }),
  closePerson: () => set({ personId: null, isPersonOpen: false }),

  addToast: (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3500);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
