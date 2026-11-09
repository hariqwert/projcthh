import React from 'react';
import { Film, Trophy, Radio, Sparkles, Bookmark } from 'lucide-react';
import { useNavigationStore } from '../../store/navigationStore';
import { NavigationTab } from '../../types';

export const MobileDock: React.FC = () => {
  const { activeTab, setTab } = useNavigationStore();

  const dockItems: Array<{ id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'home', label: 'Cinema', icon: Film },
    { id: 'sports', label: 'Sports', icon: Trophy },
    { id: 'livetv', label: 'Live TV', icon: Radio },
    { id: 'anime', label: 'Anime', icon: Sparkles },
    { id: 'watchlist', label: 'Saved', icon: Bookmark },
  ];

  return (
    <div className="xl:hidden fixed bottom-4 left-4 right-4 z-40 max-w-md mx-auto">
      <div className="glass-panel px-3 py-2 rounded-2xl shadow-2xl shadow-black/80 flex items-center justify-around border border-white/10">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-pink-400 bg-pink-500/15 scale-105'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-pink-400' : 'text-gray-400'}`} />
              <span className="text-[10px] font-medium tracking-tight mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
