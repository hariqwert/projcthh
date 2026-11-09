import React from 'react';
import { Play, Star, Bookmark } from 'lucide-react';
import { TMDBMediaItem } from '../../types';
import { useUIStore } from '../../store/uiStore';
import { useFavoritesStore } from '../../store/favoritesStore';

interface MediaCardProps {
  item: TMDBMediaItem;
  size?: 'normal' | 'compact' | 'large';
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, size = 'normal' }) => {
  const { openMediaDetails } = useUIStore();
  const { isInWatchlist, toggleWatchlist } = useFavoritesStore();

  const title = item.title || item.name || 'Untitled';
  const posterUrl = item.poster_path
    ? (item.poster_path.startsWith('http') ? item.poster_path : `https://image.tmdb.org/t/p/w500${item.poster_path}`)
    : 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=60';

  const year = (item.release_date || item.first_air_date || '').substring(0, 4);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null;
  const inWatchlist = isInWatchlist(item.id);

  return (
    <div
      onClick={() => openMediaDetails(item)}
      className="group relative flex-shrink-0 cursor-pointer transition-all duration-300 w-36 sm:w-44 md:w-48"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-poster rounded-2xl overflow-hidden glass-card transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-pink-500/20 group-hover:border-pink-500/40">
        <img
          src={posterUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-2.5 left-2.5 flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-400">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
          </div>
        )}

        {/* Watchlist Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWatchlist(item);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md border transition-all ${
            inWatchlist
              ? 'bg-pink-500 text-white border-pink-400 shadow-lg shadow-pink-500/30'
              : 'bg-black/60 text-gray-300 border-white/10 hover:text-white hover:bg-black/80'
          }`}
          title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${inWatchlist ? 'fill-white' : ''}`} />
        </button>

        {/* Center Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
          <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/50">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Details on Poster */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5">
          <p className="text-sm font-semibold text-white truncate drop-shadow-md">{title}</p>
          <div className="flex items-center justify-between text-[11px] text-gray-300 mt-0.5">
            <span>{year || (item.media_type === 'tv' ? 'Series' : 'Movie')}</span>
            <span className="uppercase text-[10px] tracking-wide px-1.5 py-0.2 rounded bg-white/10 border border-white/10">
              {item.media_type === 'tv' ? 'TV' : 'HD'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
