import React, { useState, useEffect } from 'react';
import { Tv, Star } from 'lucide-react';
import { tmdbClient } from '../services/tmdbClient';
import { MediaCard } from '../components/cards/MediaCard';
import { TMDBMediaItem } from '../types';

export const SeriesPage: React.FC = () => {
  const [series, setSeries] = useState<TMDBMediaItem[]>([]);
  const [filterType, setFilterType] = useState<'popular' | 'top_rated'>('popular');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetcher = filterType === 'popular' ? tmdbClient.getPopular('tv') : tmdbClient.getTopRated('tv');
    fetcher
      .then(setSeries)
      .catch(() => setSeries([]))
      .finally(() => setLoading(false));
  }, [filterType]);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <Tv className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Television Series</h1>
            <p className="text-xs sm:text-sm text-gray-400">Complete Seasons, Dual Audio & Episode Selectors</p>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center space-x-1 p-1 rounded-2xl bg-white/5 border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setFilterType('popular')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'popular' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'text-gray-400 hover:text-white'
            }`}
          >
            Popular Series
          </button>
          <button
            onClick={() => setFilterType('top_rated')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'top_rated' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'text-gray-400 hover:text-white'
            }`}
          >
            Top Rated
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-24 flex justify-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {series.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
