import React from 'react';
import { useNavigationStore } from './store/navigationStore';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

import { Navbar } from './components/common/Navbar';
import { MobileDock } from './components/common/MobileDock';
import { ToastContainer } from './components/common/ToastContainer';

import { MediaDetailsModal } from './components/modals/MediaDetailsModal';
import { MatchCenterModal } from './components/modals/MatchCenterModal';
import { TrailerModal } from './components/modals/TrailerModal';
import { PersonModal } from './components/modals/PersonModal';
import { SearchPaletteModal } from './components/modals/SearchPaletteModal';
import { EpgChannelModal } from './components/modals/EpgChannelModal';
import { EpgProgramModal } from './components/modals/EpgProgramModal';
import { TheaterPlayer } from './components/player/TheaterPlayer';

import { HomePage } from './pages/HomePage';
import { LiveNowPage } from './pages/LiveNowPage';
import { SportsPage } from './pages/SportsPage';
import { LiveTvPage } from './pages/LiveTvPage';
import { MoviesPage } from './pages/MoviesPage';
import { SeriesPage } from './pages/SeriesPage';
import { AnimePage } from './pages/AnimePage';
import { EpgPage } from './pages/EpgPage';
import { WatchlistPage } from './pages/WatchlistPage';

export const App: React.FC = () => {
  const { activeTab } = useNavigationStore();

  // Attach global keyboard shortcuts (Cmd+K, Escape, etc.)
  useKeyboardShortcuts();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'live-now':
        return <LiveNowPage />;
      case 'sports':
        return <SportsPage />;
      case 'livetv':
        return <LiveTvPage />;
      case 'movies':
        return <MoviesPage />;
      case 'series':
        return <SeriesPage />;
      case 'anime':
        return <AnimePage />;
      case 'epg':
        return <EpgPage />;
      case 'watchlist':
        return <WatchlistPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-gray-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      {/* Top Universal Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {renderActiveView()}
      </main>

      {/* Floating Bottom iOS / ARVIO Mobile Dock */}
      <MobileDock />

      {/* Toast Notification Stack */}
      <ToastContainer />

      {/* Global Modals & Player */}
      <MediaDetailsModal />
      <MatchCenterModal />
      <TrailerModal />
      <PersonModal />
      <SearchPaletteModal />
      <EpgChannelModal />
      <EpgProgramModal />
      <TheaterPlayer />
    </div>
  );
};

export default App;
