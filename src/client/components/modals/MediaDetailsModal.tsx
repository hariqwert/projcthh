import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Star, 
  Clock, 
  Calendar, 
  Bookmark, 
  Youtube, 
  List, 
  Grid, 
  ChevronDown,
  Layers
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { usePlayerStore, EMBED_SERVERS } from '../../store/playerStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { tmdbClient } from '../../services/tmdbClient';

export const MediaDetailsModal: React.FC = () => {
  const { isMediaDetailsOpen, mediaDetailsItem, closeMediaDetails, openTrailer, openPerson } = useUIStore();
  const { openPlayer, selectedServer, setServer, audioMode, setAudioMode } = usePlayerStore();
  const { isInWatchlist, toggleWatchlist } = useFavoritesStore();

  const [details, setDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonEpisodes, setSeasonEpisodes] = useState<any[]>([]);
  const [episodesViewMode, setEpisodesViewMode] = useState<'list' | 'grid'>('grid');

  const mediaType = mediaDetailsItem?.media_type || (mediaDetailsItem?.name ? 'tv' : 'movie');
  const isTv = mediaType === 'tv';

  useEffect(() => {
    if (!mediaDetailsItem?.id || !isMediaDetailsOpen) return;
    setLoading(true);

    tmdbClient.getDetails(mediaDetailsItem.id, mediaType)
      .then((data) => {
        setDetails(data);
        if (data?.number_of_seasons) {
          setSelectedSeason(1);
        }
      })
      .catch((e) => console.warn('Failed to load media details', e))
      .finally(() => setLoading(false));
  }, [mediaDetailsItem?.id, isMediaDetailsOpen, mediaType]);

  // Load episodes when season changes
  useEffect(() => {
    if (!isTv || !mediaDetailsItem?.id) return;
    fetch(`/api/consumet/season?id=${mediaDetailsItem.id}&season=${selectedSeason}`)
      .then((r) => r.json())
      .then((data) => {
        setSeasonEpisodes(data?.episodes || []);
      })
      .catch(() => {
        // Fallback: generate dummy episode list based on season episode count
        const count = details?.seasons?.find((s: any) => s.season_number === selectedSeason)?.episode_count || 12;
        const fallbackList = Array.from({ length: count }, (_, i) => ({
          episode_number: i + 1,
          name: `Episode ${i + 1}`,
          overview: '',
        }));
        setSeasonEpisodes(fallbackList);
      });
  }, [isTv, mediaDetailsItem?.id, selectedSeason, details?.seasons]);

  if (!isMediaDetailsOpen || !mediaDetailsItem) return null;

  const title = details?.title || details?.name || mediaDetailsItem.title || mediaDetailsItem.name || 'Untitled';
  const backdropUrl = details?.backdrop_path || mediaDetailsItem.backdrop_path
    ? `https://image.tmdb.org/t/p/original${details?.backdrop_path || mediaDetailsItem.backdrop_path}`
    : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80';

  const posterUrl = details?.poster_path || mediaDetailsItem.poster_path
    ? `https://image.tmdb.org/t/p/w500${details?.poster_path || mediaDetailsItem.poster_path}`
    : 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=60';

  const inWatchlist = isInWatchlist(mediaDetailsItem.id);
  const rating = (details?.vote_average || mediaDetailsItem.vote_average)?.toFixed(1);
  const year = (details?.release_date || details?.first_air_date || mediaDetailsItem.release_date || mediaDetailsItem.first_air_date || '').substring(0, 4);
  const runtime = details?.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : null;
  const genres = details?.genres || [];
  const cast = (details?.credits?.cast || []).slice(0, 10);

  const handlePlayMedia = (season = 1, episode = 1) => {
    // Legacy Bug Fix #1: Pass currentDetail safely so downloadCurrentMedia or player cascades never throw undefined
    openPlayer({
      media: mediaDetailsItem,
      detail: details,
      mediaType,
      title,
      season,
      episode,
      server: selectedServer,
      audioMode,
    });
    closeMediaDetails();
  };

  const handleTrailer = async () => {
    const key = await tmdbClient.fetchOfficialTrailerKey(mediaDetailsItem.id, mediaType, title);
    if (key) {
      openTrailer(key, `${title} - Official Trailer`);
    }
  };

  return (
    <div
      onClick={closeMediaDetails}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl my-auto bg-[#0a0a12] rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-h-[92vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={closeMediaDetails}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto custom-scrollbar flex-1">
          {/* Hero Banner Section */}
          <div className="relative w-full h-72 sm:h-96">
            <img src={backdropUrl} alt={title} className="w-full h-full object-cover object-top filter brightness-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12] via-transparent to-transparent w-1/2" />

            {/* Poster & Quick Info */}
            <div className="absolute bottom-4 left-6 right-6 flex items-end space-x-6">
              <img
                src={posterUrl}
                alt={title}
                className="hidden sm:block w-36 h-52 rounded-2xl object-cover border-2 border-white/10 shadow-2xl shadow-pink-500/20 flex-shrink-0"
              />
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-4xl font-black text-white drop-shadow-xl">{title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-300">
                  {rating && (
                    <span className="flex items-center space-x-1 px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{rating}</span>
                    </span>
                  )}
                  {year && <span>{year}</span>}
                  {runtime && (
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{runtime}</span>
                    </span>
                  )}
                  <span className="uppercase text-xs font-semibold px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    {isTv ? 'TV Series' : 'Cinema'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handlePlayMedia(1, 1)}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white font-bold text-sm shadow-xl shadow-pink-600/30 hover:scale-105 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isTv ? 'Watch S1 E1' : 'Play Movie'}</span>
              </button>

              <button
                onClick={handleTrailer}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl glass-panel hover:bg-white/15 text-white font-semibold text-sm border border-white/10 transition-all hover:scale-105"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>Trailer</span>
              </button>

              <button
                onClick={() => toggleWatchlist(mediaDetailsItem)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl glass-panel border transition-all hover:scale-105 ${
                  inWatchlist
                    ? 'bg-pink-500/20 text-pink-400 border-pink-500/40'
                    : 'text-gray-300 hover:text-white border-white/10'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${inWatchlist ? 'fill-pink-400' : ''}`} />
                <span>{inWatchlist ? 'In Library' : 'Add to Library'}</span>
              </button>

              {/* Multi-Audio & Server Controls */}
              <div className="flex items-center space-x-2 ml-auto">
                <button
                  onClick={() => setAudioMode(audioMode === 'sub' ? 'dub' : 'sub')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                    audioMode === 'dub'
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-white/5 text-gray-400 border-white/10'
                  }`}
                  title="Switch Audio Mode (Sub vs Dubbed)"
                >
                  Audio: {audioMode.toUpperCase()}
                </button>
              </div>
            </div>

            {/* Genres */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genres.map((g: any) => (
                  <span
                    key={g.id}
                    className="px-3 py-1 rounded-xl bg-white/5 text-gray-300 text-xs font-medium border border-white/5"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Synopsis</h3>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                {details?.overview || mediaDetailsItem.overview || 'No synopsis provided.'}
              </p>
            </div>

            {/* Algorithm 7: Episode Scroller (if TV series) */}
            {isTv && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-base font-bold text-white">Episodes</h3>
                    {details?.number_of_seasons && details.number_of_seasons > 1 && (
                      <div className="relative">
                        <select
                          value={selectedSeason}
                          onChange={(e) => setSelectedSeason(Number(e.target.value))}
                          className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/15 appearance-none pr-8 cursor-pointer outline-none"
                        >
                          {Array.from({ length: details.number_of_seasons }, (_, i) => (
                            <option key={i + 1} value={i + 1} className="bg-[#0f0f17] text-white">
                              Season {i + 1}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Dual Grid vs List Toggle */}
                  <div className="flex items-center space-x-1 p-1 rounded-xl bg-white/5 border border-white/10">
                    <button
                      onClick={() => setEpisodesViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        episodesViewMode === 'grid' ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                      title="Grid View"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEpisodesViewMode('list')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        episodesViewMode === 'list' ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Episodes Render Area */}
                {seasonEpisodes.length > 0 ? (
                  episodesViewMode === 'grid' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto custom-scrollbar p-1">
                      {seasonEpisodes.map((ep: any) => (
                        <div
                          key={ep.episode_number}
                          onClick={() => handlePlayMedia(selectedSeason, ep.episode_number)}
                          className="group/ep cursor-pointer glass-panel p-3 rounded-2xl border border-white/5 hover:border-pink-500/40 hover:bg-white/10 transition-all text-left"
                        >
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                            <span className="font-bold text-pink-400">EP {ep.episode_number}</span>
                            <Play className="w-3.5 h-3.5 text-gray-500 group-hover/ep:text-pink-400 fill-current" />
                          </div>
                          <p className="text-xs font-semibold text-white truncate">{ep.name || `Episode ${ep.episode_number}`}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar p-1">
                      {seasonEpisodes.map((ep: any) => (
                        <div
                          key={ep.episode_number}
                          onClick={() => handlePlayMedia(selectedSeason, ep.episode_number)}
                          className="group/ep cursor-pointer glass-panel p-3 rounded-2xl border border-white/5 hover:border-pink-500/40 hover:bg-white/10 transition-all flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 font-bold text-xs flex items-center justify-center">
                              {ep.episode_number}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-white group-hover/ep:text-pink-400 transition-colors">
                                {ep.name || `Episode ${ep.episode_number}`}
                              </p>
                              {ep.overview && <p className="text-xs text-gray-400 line-clamp-1">{ep.overview}</p>}
                            </div>
                          </div>
                          <Play className="w-4 h-4 text-gray-500 group-hover/ep:text-pink-400 fill-current" />
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <p className="text-xs text-gray-400">Loading episodes...</p>
                )}
              </div>
            )}

            {/* Cast Carousel */}
            {cast.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Top Cast</h3>
                <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar pb-2">
                  {cast.map((actor: any) => {
                    const actorImg = actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=185&auto=format&fit=crop&q=80';
                    return (
                      <div
                        key={actor.id}
                        onClick={() => openPerson(actor.id)}
                        className="flex-shrink-0 cursor-pointer flex flex-col items-center space-y-1.5 w-20 group/actor"
                      >
                        <img
                          src={actorImg}
                          alt={actor.name}
                          className="w-16 h-16 rounded-full object-cover border border-white/10 group-hover/actor:border-pink-500/50 transition-all"
                        />
                        <p className="text-[11px] font-semibold text-gray-200 text-center truncate w-full">
                          {actor.name}
                        </p>
                        <p className="text-[10px] text-gray-400 text-center truncate w-full">
                          {actor.character}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
