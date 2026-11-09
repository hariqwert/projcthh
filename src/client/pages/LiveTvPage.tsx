import React, { useState, useEffect, useRef } from 'react';
import { Radio, Search, Filter, Layers, Globe } from 'lucide-react';
import { liveTvClient, JTV_GENRES, JTV_LANGUAGES } from '../services/liveTvClient';
import { LiveTvCard } from '../components/cards/LiveTvCard';
import { LiveTvChannel } from '../types';

export const LiveTvPage: React.FC = () => {
  const [allChannels, setAllChannels] = useState<LiveTvChannel[]>([]);
  const [provider, setProvider] = useState<'jtv' | 'airtel' | 'tatasky' | 'timstreams'>('jtv');
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayLimit, setDisplayLimit] = useState(120);
  const [loading, setLoading] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Load channels on provider change
  useEffect(() => {
    setLoading(true);
    liveTvClient.fetchChannels(provider)
      .then((channels) => {
        setAllChannels(channels);
        setDisplayLimit(120);
      })
      .catch(() => setAllChannels([]))
      .finally(() => setLoading(false));
  }, [provider]);

  // Filter channels
  const filteredChannels = allChannels.filter((c) => {
    if (selectedGenre !== 'ALL' && c.category.toLowerCase() !== selectedGenre.toLowerCase()) {
      return false;
    }
    if (selectedLanguage !== 'ALL' && c.language.toLowerCase() !== selectedLanguage.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim() && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Algorithm 27: Dual IntersectionObserver Pagination (120 per batch)
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayLimit((prev) => prev + 120);
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [filteredChannels.length]);

  const displayedChannels = filteredChannels.slice(0, displayLimit);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <Radio className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Live Television Hub</h1>
            <p className="text-xs sm:text-sm text-gray-400">1,324+ High-Bitrate JioTV & Airtel ClearKey DRM Streams</p>
          </div>
        </div>

        {/* Provider Switcher */}
        <div className="flex items-center space-x-1 p-1 rounded-2xl bg-white/5 border border-white/10 self-start sm:self-auto">
          {(['jtv', 'airtel', 'tatasky', 'timstreams'] as const).map((prov) => (
            <button
              key={prov}
              onClick={() => setProvider(prov)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                provider === prov
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {prov === 'jtv' ? 'JioTV 4K' : prov}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80 flex-shrink-0">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search channels..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl glass-panel text-sm text-white placeholder-gray-500 border border-white/10 focus:border-pink-500/50 outline-none transition-colors"
          />
        </div>

        {/* Language Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Globe className="w-4 h-4 text-gray-400" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-[#0f0f17] text-white text-xs font-semibold px-3 py-2 rounded-2xl border border-white/10 outline-none cursor-pointer"
          >
            {JTV_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                Lang: {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Genres Pill Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full pb-1">
          {JTV_GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedGenre === genre
                  ? 'bg-pink-600 text-white border-pink-500 shadow-md shadow-pink-600/25'
                  : 'glass-panel text-gray-400 hover:text-white border-white/5'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Channel Grid */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading catalog channels...</p>
        </div>
      ) : displayedChannels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {displayedChannels.map((channel) => (
            <LiveTvCard key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center glass-panel rounded-3xl border border-white/5">
          <p className="text-base font-bold text-white">No channels matched your filters</p>
          <p className="text-xs text-gray-400 mt-1">Try resetting the language or genre filters.</p>
        </div>
      )}

      {/* Infinite Scroll Sentinel */}
      {displayLimit < filteredChannels.length && (
        <div ref={sentinelRef} className="py-8 flex justify-center">
          <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
