import { useEffect } from 'react';
import { useNavigationStore } from '../store/navigationStore';
import { useUIStore } from '../store/uiStore';
import { usePlayerStore } from '../store/playerStore';
import { useSportsStore } from '../store/sportsStore';
import { useEpgStore } from '../store/epgStore';

export function useKeyboardShortcuts() {
  const { searchPaletteOpen, setSearchPaletteOpen } = useNavigationStore();
  const { isMediaDetailsOpen, closeMediaDetails, isTrailerOpen, closeTrailer, isPersonOpen, closePerson } = useUIStore();
  const { isPlayerOpen, closePlayer } = usePlayerStore();
  const { isMatchCenterOpen, closeMatchCenter } = useSportsStore();
  const { isProgramModalOpen, closeProgramModal, isChannelModalOpen, closeChannelModal } = useEpgStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept shortcuts if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // Cmd+K or Ctrl+K: Toggle Search Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchPaletteOpen(!searchPaletteOpen);
        return;
      }

      // Escape key: Priority-based modal closing
      if (e.key === 'Escape') {
        if (searchPaletteOpen) {
          setSearchPaletteOpen(false);
          return;
        }
        if (isTrailerOpen) {
          closeTrailer();
          return;
        }
        if (isPersonOpen) {
          closePerson();
          return;
        }
        if (isMatchCenterOpen) {
          closeMatchCenter();
          return;
        }
        if (isProgramModalOpen) {
          closeProgramModal();
          return;
        }
        if (isChannelModalOpen) {
          closeChannelModal();
          return;
        }
        if (isMediaDetailsOpen) {
          closeMediaDetails();
          return;
        }
        if (isPlayerOpen) {
          closePlayer();
          return;
        }
      }

      // '/' to search (when not inside an input)
      if (e.key === '/' && !isInput) {
        e.preventDefault();
        setSearchPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    searchPaletteOpen,
    isTrailerOpen,
    isPersonOpen,
    isMatchCenterOpen,
    isProgramModalOpen,
    isChannelModalOpen,
    isMediaDetailsOpen,
    isPlayerOpen,
  ]);
}
