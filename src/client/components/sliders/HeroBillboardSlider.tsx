import React, { useState, useEffect } from 'react';
import { Play, Info, Bookmark, Youtube, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TMDBMediaItem } from '../../types';
import { useUIStore } from '../../store/uiStore';
import { usePlayerStore } from '../../store/playerStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { tmdbClient } from '../../services/tmdbClient';

interface HeroBillboardSliderProps {
  items: TMDBMediaItem[];
}

export const HeroBillboardSlider: React.FC<HeroBillboardSliderProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const { openMediaDetails, openTrailer } = useUIStore();
  const { openPlayer } = usePlayerStore();
  const { isInWatchlist, toggleWatchlist } = useFavoritesStore();

  const currentItem = items[currentIndex];

  // Algorithm 17: Spotlight Waterfall Cascade (6.5s interval)
  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [items.length]);

  // Resolve logo for active billboard item
  useEffect(() => {
    if (!currentItem?.id) return;
    let isMounted = true;
    const mediaType = currentItem.media_type || (currentItem.name ? 'tv' : 'movie');

    tmdbClient.resolveTitleLogo(currentItem.id, mediaType).then((url) => {
      if (isMounted) setLogoUrl(url);
    });

    return () => {
      isMounted = false;
    };
  }, [currentItem?.id]);

  if (!currentItem) return null;

  const title = currentItem.title || currentItem.name || 'Featured Title';
  const backdropUrl = currentItem.backdrop_path
    ? (currentItem.backdrop_path.startsWith('http') ? currentItem.backdrop_path : `https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`)
    : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80';

  const inWatchlist = isInWatchlist(currentItem.id);
  const mediaType = currentItem.media_type || (currentItem.name ? 'tv' : 'movie');
  const rating = currentItem.vote_average ? currentItem.vote_average.toFixed(1) : null;
  const year = (currentItem.release_date || currentItem.first_air_date || '').substring(0, 4);

  const handlePlayNow = () => {
    openPlayer({
      media: currentItem,
      mediaType,
      title,
    });
  };

  const handleWatchTrailer = async () => {
    const trailerKey = currentItem.trailerKey || (await tmdbClient.fetchOfficialTrailerKey(currentItem.id, mediaType, title));
    if (trailerKey) {
      openTrailer(trailerKey, `${title} - Official Trailer`);
    } else {
      openMediaDetails(currentItem);
    }
  };

  return (
    <div className="relative w-full h-[65vh] min-h-[480px] max-h-[720px] overflow-hidden select-none">
      {/* Background Backdrop Image */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={title}
          className="w-full h-full object-cover object-top transition-all duration-700 filter brightness-90"
        />
        {/* Gradient Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-[#07070b]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070b] via-[#07070b]/60 to-transparent w-full md:w-3/4" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#07070b]/70 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16">
        <div className="max-w-2xl space-y-4">
          {/* Logo or Text Title */}
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={title}
              className="max-h-24 sm:max-h-32 max-w-md object-contain drop-shadow-2xl mb-2"
            />
          ) : (
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-2xl">
              {title}
            </h1>
          )}

          {/* Metadata Row */}
          <div className="flex items-center space-x-3 text-sm font-medium text-gray-300">
            {rating && (
              <span className="flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{rating}</span>
              </span>
            )}
            {year && <span>{year}</span>}
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            <span className="uppercase text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-gray-200 border border-white/10">
              {mediaType === 'tv' ? 'Series' : 'Cinema 4K'}
            </span>
          </div>

          {/* Overview Synopsis */}
          <p className="text-sm sm:text-base text-gray-300 line-clamp-3 leading-relaxed drop-shadow">
            {currentItem.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handlePlayNow}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white font-bold text-sm shadow-xl shadow-pink-600/30 hover:scale-105 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Now</span>
            </button>

            <button
              onClick={handleWatchTrailer}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl glass-panel hover:bg-white/15 text-white font-semibold text-sm border border-white/15 hover:scale-105 transition-all"
            >
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Trailer</span>
            </button>

            <button
              onClick={() => openMediaDetails(currentItem)}
              className="flex items-center space-x-2 px-4 py-3 rounded-xl glass-panel hover:bg-white/15 text-gray-300 hover:text-white font-medium text-sm border border-white/10 hover:scale-105 transition-all"
              title="More Info"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">Details</span>
            </button>

            <button
              onClick={() => toggleWatchlist(currentItem)}
              className={`p-3 rounded-xl glass-panel border transition-all hover:scale-105 ${
                inWatchlist
                  ? 'bg-pink-500/20 text-pink-400 border-pink-500/40'
                  : 'text-gray-300 hover:text-white border-white/10'
              }`}
              title={inWatchlist ? 'In Library' : 'Add to Library'}
            >
              <Bookmark className={`w-4 h-4 ${inWatchlist ? 'fill-pink-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Nav Indicators & Arrows */}
      <div className="absolute bottom-4 right-4 sm:right-8 flex items-center space-x-2">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
          className="p-2 rounded-full glass-panel hover:bg-white/20 text-white border border-white/10 transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-1.5 px-2">
          {items.slice(0, 7).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-pink-500' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
          className="p-2 rounded-full glass-panel hover:bg-white/20 text-white border border-white/10 transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
