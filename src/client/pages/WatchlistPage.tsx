import React, { useState } from 'react';
import { Bookmark, Clock, Star, Play, Trash2, Film, Radio } from 'lucide-react';
import { useFavoritesStore } from '../store/favoritesStore';
import { usePlayerStore } from '../store/playerStore';
import { MediaCard } from '../components/cards/MediaCard';

export const WatchlistPage: React.FC = () => {
  const { watchlist, watchHistory, removeHistoryItem, clearHistory, pinnedChannels } = useFavoritesStore();
  const { openPlayer } = usePlayerStore();
  const [activeTab, setActiveTab] = useState<'watchlist' | 'history'>('watchlist');

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">My Library & History</h1>
            <p className="text-xs sm:text-sm text-gray-400">Saved Cinema, Resume Targets & Pinned Channels</p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center space-x-1 p-1 rounded-2xl bg-white/5 border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'watchlist'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved Cinema ({watchlist.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Watch History ({watchHistory.length})
          </button>
        </div>
      </div>

      {/* Watchlist Tab */}
      {activeTab === 'watchlist' && (
        <div className="space-y-4">
          {watchlist.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {watchlist.map((item) => (
                <MediaCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center glass-panel rounded-3xl border border-white/5 space-y-3">
              <Bookmark className="w-12 h-12 text-gray-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">Your Saved Library is Empty</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Click the bookmark button on any movie, TV series, or billboard to save it here for later.
              </p>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {watchHistory.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={clearHistory}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 text-xs font-semibold border border-red-500/30 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All History</span>
              </button>
            </div>
          )}

          {watchHistory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {watchHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.streamUrl) {
                      openPlayer({
                        title: item.title,
                        streamUrl: item.streamUrl,
                        mediaType: item.mediaType,
                        season: item.season,
                        episode: item.episode,
                      });
                    }
                  }}
                  className="group cursor-pointer glass-card p-3 rounded-2xl border border-white/5 hover:border-pink-500/40 hover:bg-white/10 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <img
                      src={item.backdrop || item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover filter brightness-75 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeHistoryItem(item.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-gray-400 hover:text-red-400 backdrop-blur-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.season ? `Season ${item.season} Episode ${item.episode}` : 'Movie'} • {new Date(item.lastWatched).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center glass-panel rounded-3xl border border-white/5 space-y-3">
              <Clock className="w-12 h-12 text-gray-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Watch History Recorded</h3>
              <p className="text-xs text-gray-400">
                Titles you stream will automatically appear here with their resume timestamps.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
