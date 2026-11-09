import React, { useState, useEffect } from 'react';
import { HeroBillboardSlider } from '../components/sliders/HeroBillboardSlider';
import { HorizontalShelf } from '../components/sliders/HorizontalShelf';
import { MediaCard } from '../components/cards/MediaCard';
import { NetflixSportCard } from '../components/cards/NetflixSportCard';
import { tmdbClient } from '../services/tmdbClient';
import { animeClient } from '../services/animeClient';
import { useSportsSchedule } from '../hooks/useSportsSchedule';
import { useSportsStore } from '../store/sportsStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { useNavigationStore } from '../store/navigationStore';
import { usePlayerStore } from '../store/playerStore';
import { TMDBMediaItem, AnimeItem } from '../types';
import { Play, Trash2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [trending, setTrending] = useState<TMDBMediaItem[]>([]);
  const [popularMovies, setPopularMovies] = useState<TMDBMediaItem[]>([]);
  const [popularSeries, setPopularSeries] = useState<TMDBMediaItem[]>([]);
  const [trendingAnime, setTrendingAnime] = useState<AnimeItem[]>([]);

  useSportsSchedule();
  const { liveEvents } = useSportsStore();
  const { watchHistory, removeHistoryItem } = useFavoritesStore();
  const { setTab } = useNavigationStore();
  const { openPlayer } = usePlayerStore();

  useEffect(() => {
    tmdbClient.getTrending('all', 'day').then(setTrending);
    tmdbClient.getPopular('movie').then(setPopularMovies);
    tmdbClient.getPopular('tv').then(setPopularSeries);
    animeClient.getTrending().then(setTrendingAnime);
  }, []);

  return (
    <div className="min-h-screen pb-24">
      {/* Cinematic Hero Billboard Slider (Algorithm 17) */}
      <HeroBillboardSlider items={trending} />

      {/* Continue Watching Shelf (Algorithm 24) */}
      {watchHistory.length > 0 && (
        <HorizontalShelf title="Continue Watching" subtitle="Resume where you left off">
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
              className="group relative flex-shrink-0 cursor-pointer w-60 sm:w-72 glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-pink-500/40 transition-all hover:scale-[1.02]"
            >
              <div className="relative aspect-video">
                <img
                  src={item.backdrop || item.poster}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-pink-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeHistoryItem(item.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-gray-400 hover:text-red-400 backdrop-blur-md transition-colors"
                  title="Remove from history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-bold text-white truncate">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.season ? `S${item.season} E${item.episode}` : 'Movie'}
                </p>
              </div>
            </div>
          ))}
        </HorizontalShelf>
      )}

      {/* Live Sports Spotlight Shelf */}
      {liveEvents.length > 0 && (
        <HorizontalShelf
          title="Live Sports Spotlight"
          subtitle="Real-time high bitrate stadium streams"
          actionText="View All Sports"
          onActionClick={() => setTab('sports')}
        >
          {liveEvents.map((event) => (
            <NetflixSportCard key={event.id} event={event} />
          ))}
        </HorizontalShelf>
      )}

      {/* Trending Movies Shelf */}
      <HorizontalShelf
        title="Trending Cinema"
        subtitle="Most watched movies today"
        actionText="Explore Movies"
        onActionClick={() => setTab('movies')}
      >
        {popularMovies.map((movie) => (
          <MediaCard key={movie.id} item={movie} />
        ))}
      </HorizontalShelf>

      {/* Trending TV Series Shelf */}
      <HorizontalShelf
        title="Binge-Worthy TV Series"
        subtitle="Complete seasons & multi-audio series"
        actionText="Explore Series"
        onActionClick={() => setTab('series')}
      >
        {popularSeries.map((tv) => (
          <MediaCard key={tv.id} item={tv} />
        ))}
      </HorizontalShelf>

      {/* Popular Anime Shelf */}
      {trendingAnime.length > 0 && (
        <HorizontalShelf
          title="Trending Anime"
          subtitle="Simulcast releases with English & Hindi dubs"
          actionText="Anime Radar"
          onActionClick={() => setTab('anime')}
        >
          {trendingAnime.map((anime) => {
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
        </HorizontalShelf>
      )}
    </div>
  );
};
