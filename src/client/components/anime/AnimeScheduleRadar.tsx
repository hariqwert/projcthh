import React, { useState, useEffect } from 'react';
import { Radio, Clock, Play } from 'lucide-react';
import { useAnimeStore } from '../../store/animeStore';
import { animeClient } from '../../services/animeClient';
import { AnimeItem } from '../../types';
import { usePlayerStore } from '../../store/playerStore';

const DAYS = [
  { id: 'today', label: 'Today' },
  { id: 'monday', label: 'Mon' },
  { id: 'tuesday', label: 'Tue' },
  { id: 'wednesday', label: 'Wed' },
  { id: 'thursday', label: 'Thu' },
  { id: 'friday', label: 'Fri' },
  { id: 'saturday', label: 'Sat' },
  { id: 'sunday', label: 'Sun' },
];

export const AnimeScheduleRadar: React.FC = () => {
  const { activeScheduleDay, setActiveScheduleDay } = useAnimeStore();
  const { openPlayer } = usePlayerStore();
  const [scheduleList, setScheduleList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    animeClient.getAiringSchedule(activeScheduleDay)
      .then((data) => setScheduleList(data))
      .catch(() => setScheduleList([]))
      .finally(() => setLoading(false));
  }, [activeScheduleDay]);

  const handlePlayAnime = (item: AnimeItem) => {
    const titleStr = typeof item.title === 'string' ? item.title : (item.title?.userPreferred || item.title?.english || 'Anime');
    openPlayer({
      mediaType: 'anime',
      title: `${titleStr} - Ep ${item.nextAiringEpisode?.episode || 1}`,
      server: 'anivexa',
      season: 1,
      episode: item.nextAiringEpisode?.episode || 1,
      media: {
        id: item.id,
        name: titleStr,
        media_type: 'tv',
        poster_path: item.coverImage,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Day Selector Buttons */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
        {DAYS.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveScheduleDay(day.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
              activeScheduleDay === day.id
                ? 'bg-pink-600 text-white border-pink-500 shadow-lg shadow-pink-600/30'
                : 'glass-panel text-gray-400 hover:text-white border-white/5'
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Airing Anime Grid */}
      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : scheduleList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {scheduleList.map((anime) => {
            const titleStr = typeof anime.title === 'string' ? anime.title : (anime.title?.userPreferred || anime.title?.english || 'Anime');
            return (
              <div
                key={anime.id}
                onClick={() => handlePlayAnime(anime)}
                className="group cursor-pointer glass-card p-2.5 rounded-2xl border border-white/5 hover:border-pink-500/40 hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className="relative aspect-poster rounded-xl overflow-hidden mb-2">
                  <img
                    src={anime.coverImage}
                    alt={titleStr}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-pink-400 border border-white/10">
                    Ep {anime.nextAiringEpisode?.episode || 1}
                  </div>
                </div>
                <h4 className="text-xs font-bold text-white truncate group-hover:text-pink-400 transition-colors">
                  {titleStr}
                </h4>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-gray-400 py-6 text-center">No broadcast schedule records found for this day.</p>
      )}
    </div>
  );
};
