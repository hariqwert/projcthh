import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Layers, Radio } from 'lucide-react';
import { animeClient } from '../services/animeClient';
import { AnimeScheduleRadar } from '../components/anime/AnimeScheduleRadar';
import { OnePieceMatrix } from '../components/anime/OnePieceMatrix';
import { MediaCard } from '../components/cards/MediaCard';
import { AnimeItem, TMDBMediaItem } from '../types';

export const AnimePage: React.FC = () => {
  const [popularAnime, setPopularAnime] = useState<AnimeItem[]>([]);
  const [activeSection, setActiveSection] = useState<'radar' | 'onepiece' | 'popular'>('radar');

  useEffect(() => {
    animeClient.getPopular().then(setPopularAnime);
  }, []);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Anime Radar & Universe</h1>
            <p className="text-xs sm:text-sm text-gray-400">JST Simulcasts, One Piece Matrix & Hindi Dubs</p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center space-x-1 p-1 rounded-2xl bg-white/5 border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveSection('radar')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'radar' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25' : 'text-gray-400 hover:text-white'
            }`}
          >
            Broadcast Radar
          </button>
          <button
            onClick={() => setActiveSection('onepiece')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'onepiece' ? 'bg-amber-500 text-black font-black shadow-lg shadow-amber-500/25' : 'text-gray-400 hover:text-white'
            }`}
          >
            One Piece Matrix
          </button>
          <button
            onClick={() => setActiveSection('popular')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'popular' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25' : 'text-gray-400 hover:text-white'
            }`}
          >
            Popular Anime
          </button>
        </div>
      </div>

      {/* Section 1: Weekly Broadcast Radar (Algorithm 21) */}
      {activeSection === 'radar' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Radio className="w-5 h-5 text-pink-500" />
              <span>Weekly Broadcast Schedule (JST UTC+9)</span>
            </h3>
            <AnimeScheduleRadar />
          </div>
        </div>
      )}

      {/* Section 2: One Piece Universe Matrix (Algorithm 22) */}
      {activeSection === 'onepiece' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5">
          <OnePieceMatrix />
        </div>
      )}

      {/* Section 3: Popular Anime Catalog */}
      {activeSection === 'popular' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">All-Time Top Anime</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {popularAnime.map((anime) => {
              const titleStr = typeof anime.title === 'string' ? anime.title : (anime.title?.userPreferred || 'Anime');
              const mediaItem: TMDBMediaItem = {
                id: anime.id,
                name: titleStr,
                media_type: 'tv',
                poster_path: anime.coverImage,
                overview: anime.description,
                vote_average: anime.averageScore ? anime.averageScore / 10 : undefined,
              };
              return <MediaCard key={anime.id} item={mediaItem} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
