import React from 'react';
import { 
  Film, 
  Tv, 
  Trophy, 
  Radio, 
  Sparkles, 
  Calendar, 
  Bookmark, 
  Search, 
  Menu, 
  X,
  Flame,
  Clapperboard
} from 'lucide-react';
import { useNavigationStore } from '../../store/navigationStore';
import { NavigationTab } from '../../types';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isLive?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Cinema Hub', icon: Film },
  { id: 'live-now', label: 'Live Now', icon: Flame, isLive: true },
  { id: 'sports', label: 'Sports Central', icon: Trophy },
  { id: 'livetv', label: 'Live TV', icon: Radio },
  { id: 'movies', label: 'Movies', icon: Clapperboard },
  { id: 'series', label: 'Series', icon: Tv },
  { id: 'anime', label: 'Anime Radar', icon: Sparkles },
  { id: 'epg', label: 'EPG Guide', icon: Calendar },
  { id: 'watchlist', label: 'My Library', icon: Bookmark },
];

export const Navbar: React.FC = () => {
  const { activeTab, setTab, setSearchPaletteOpen, mobileDrawerOpen, toggleMobileDrawer } = useNavigationStore();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-pink-400 bg-clip-text text-transparent">
              Aetheris
            </span>
            <span className="ml-1 text-xs uppercase tracking-widest text-pink-500 font-bold px-1.5 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
              ARVIO
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActive
                    ? 'text-white bg-white/10 shadow-inner'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-pink-500' : 'text-gray-400'}`} />
                <span>{item.label}</span>
                {item.isLive && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Quick Search trigger */}
          <button
            onClick={() => setSearchPaletteOpen(true)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors text-sm"
          >
            <Search className="w-4 h-4 text-gray-400" />
            <span className="hidden sm:inline text-xs text-gray-400">Search...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white/10 text-gray-300 rounded border border-white/10 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Drawer Toggle */}
          <button
            onClick={() => toggleMobileDrawer()}
            className="xl:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileDrawerOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#0b0b12]/95 backdrop-blur-2xl px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'text-white bg-pink-500/20 border border-pink-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-pink-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.isLive && (
                  <span className="px-2 py-0.5 text-xs font-bold uppercase rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
