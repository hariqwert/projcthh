import { create } from 'zustand';
import { EpgProgramItem, LiveTvChannel } from '../types';

interface EpgState {
  activeNetwork: 'STAR' | 'SONY' | 'ZEE' | 'SPORTS' | 'ALL';
  timelineViewMode: 'grid' | 'timeline';
  selectedProgram: EpgProgramItem | null;
  selectedChannelId: string | null;
  isProgramModalOpen: boolean;
  isChannelModalOpen: boolean;
  programs: Record<string, EpgProgramItem[]>;
  channelList: LiveTvChannel[];
  isLoading: boolean;

  setActiveNetwork: (net: 'STAR' | 'SONY' | 'ZEE' | 'SPORTS' | 'ALL') => void;
  setTimelineViewMode: (mode: 'grid' | 'timeline') => void;
  openProgramModal: (prog: EpgProgramItem) => void;
  closeProgramModal: () => void;
  openChannelSchedule: (channelId: string) => void;
  closeChannelModal: () => void;
  setProgramsForChannel: (channelId: string, progs: EpgProgramItem[]) => void;
  setChannelList: (channels: LiveTvChannel[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useEpgStore = create<EpgState>((set) => ({
  activeNetwork: 'ALL',
  timelineViewMode: 'grid',
  selectedProgram: null,
  selectedChannelId: null,
  isProgramModalOpen: false,
  isChannelModalOpen: false,
  programs: {},
  channelList: [],
  isLoading: false,

  setActiveNetwork: (net) => set({ activeNetwork: net }),
  setTimelineViewMode: (mode) => set({ timelineViewMode: mode }),
  
  openProgramModal: (prog) => set({ selectedProgram: prog, isProgramModalOpen: true }),
  closeProgramModal: () => set({ selectedProgram: null, isProgramModalOpen: false }),

  // Resolves legacy bug: missing openEpgChannelModal
  openChannelSchedule: (channelId) => set({ selectedChannelId: channelId, isChannelModalOpen: true }),
  closeChannelModal: () => set({ selectedChannelId: null, isChannelModalOpen: false }),

  setProgramsForChannel: (channelId, progs) =>
    set((state) => ({
      programs: {
        ...state.programs,
        [channelId]: progs,
      },
    })),

  setChannelList: (channels) => set({ channelList: channels }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
