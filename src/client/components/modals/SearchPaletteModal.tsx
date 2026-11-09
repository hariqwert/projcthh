import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Film, Trophy, Radio, ArrowRight, Play, Star } from 'lucide-react';
import { useNavigationStore } from '../../store/navigationStore';
import { useUIStore } from '../../store/uiStore';
import { useSportsStore } from '../../store/sportsStore';
import { usePlayerStore } from '../../store/playerStore';
import { tmdbClient } from '../../services/tmdbClient';
import { TMDBMediaItem, SportsEvent, LiveTvChannel } from '../../types';

export const SearchPaletteModal: React.FC = () => {
  const { searchPaletteOpen, setSearchPaletteOpen, searchQuery, setSearchQuery } = useNavigationStore();
  const { openMediaDetails } = useUIStore();
  const { liveEvents, openMatchCenter } = useSportsStore();
  const { openPlayer } = usePlayerStore();

  const [tmdbResults, setTmdbResults] = useState<TMDBMediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
      setTmdbResults([]);
    }
  }, [searchPaletteOpen]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setTmdbResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      tmdbClient.searchMulti(searchQuery)
        .then((res) => setTmdbResults(res.slice(0, 8)))
        .catch(() => setTmdbResults([]))
        .finally(() => setLoading(false));
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!searchPaletteOpen) return null;

  // Sports matches filtered by query
  const matchedSports = liveEvents.filter((e) =>
    (e.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 4);

  return (
    <div
      onClick={() => setSearchPaletteOpen(false)}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0e0e18] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-pink-500/10 flex flex-col"
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-5 py-4 border-b border-white/10 space-x-3 bg-white/5">
          <Search className="w-5 h-5 text-pink-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, TV series, cricket, football, or channels..."
            className="w-full bg-transparent text-white placeholder-gray-500 text-base font-medium outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-lg text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs bg-white/10 text-gray-400 rounded-md font-mono">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-4 space-y-4">
          {loading && (
            <div className="py-8 flex justify-center">
              <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Sports Results */}
          {matchedSports.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center space-x-1.5 px-2">
                <Trophy className="w-3.5 h-3.5" />
                <span>Live Sports ({matchedSports.length})</span>
              </h4>
              <div className="space-y-1.5">
                {matchedSports.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      setSearchPaletteOpen(false);
                      openMatchCenter(event);
                    }}
                    className="cursor-pointer glass-panel p-3 rounded-2xl border border-white/5 hover:border-pink-500/40 hover:bg-white/10 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 rounded-full bg-red-500 live-indicator" />
                      <span className="text-sm font-semibold text-white">{event.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300">
                        {event.category}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Movies & Series Results */}
          {tmdbResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5 px-2">
                <Film className="w-3.5 h-3.5" />
                <span>Cinema & Series ({tmdbResults.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tmdbResults.map((item) => {
                  const title = item.title || item.name || 'Untitled';
                  const poster = item.poster_path
                    ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
                    : 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=185&auto=format&fit=crop&q=60';
                  const rating = item.vote_average ? item.vote_average.toFixed(1) : null;
                  const year = (item.release_date || item.first_air_date || '').substring(0, 4);

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSearchPaletteOpen(false);
                        openMediaDetails(item);
                      }}
                      className="cursor-pointer glass-panel p-2.5 rounded-2xl border border-white/5 hover:border-pink-500/40 hover:bg-white/10 transition-all flex items-center space-x-3"
                    >
                      <img src={poster} alt={title} className="w-10 h-14 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white truncate">{title}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                          {rating && (
                            <span className="flex items-center space-x-0.5 text-amber-400 font-bold">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span>{rating}</span>
                            </span>
                          )}
                          <span>{year}</span>
                          <span className="uppercase text-[10px] px-1 py-0.2 rounded bg-white/10">
                            {item.media_type === 'tv' ? 'TV' : 'HD'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!loading && searchQuery && tmdbResults.length === 0 && matchedSports.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-sm">
              No results found for "{searchQuery}". Try searching another title.
            </div>
          )}

          {!searchQuery && (
            <div className="py-8 text-center text-xs text-gray-500">
              Type to search movies, series, live cricket, football, or TV channels...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
