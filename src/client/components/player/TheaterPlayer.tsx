import React, { useEffect, useRef, useState } from 'react';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  Layers, 
  Radio, 
  Shield, 
  Zap,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { usePlayerStore, EMBED_SERVERS } from '../../store/playerStore';
import { useFavoritesStore } from '../../store/favoritesStore';

export const TheaterPlayer: React.FC = () => {
  const { 
    isPlayerOpen, 
    closePlayer, 
    streamUrl, 
    streamType, 
    title, 
    selectedServer, 
    setServer, 
    audioMode, 
    setAudioMode,
    backupSources,
    isTheaterMode,
    toggleTheaterMode,
    mediaType,
    activeMedia,
    currentSeason,
    currentEpisode
  } = usePlayerStore();

  const { recordHistory } = useFavoritesStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Record into watch history
  useEffect(() => {
    if (isPlayerOpen && activeMedia?.id) {
      recordHistory({
        id: activeMedia.id,
        mediaType,
        title,
        poster: activeMedia.poster_path ? `https://image.tmdb.org/t/p/w500${activeMedia.poster_path}` : '',
        backdrop: activeMedia.backdrop_path ? `https://image.tmdb.org/t/p/original${activeMedia.backdrop_path}` : undefined,
        currentTime: 0,
        duration: 0,
        progressPct: 0,
        season: currentSeason,
        episode: currentEpisode,
        lastWatched: Date.now(),
        streamUrl,
      });
    }
  }, [isPlayerOpen, activeMedia?.id, currentSeason, currentEpisode]);

  if (!isPlayerOpen || !streamUrl) return null;

  const isEmbed = streamType === 'embed' || streamUrl.startsWith('http') && !streamUrl.includes('.m3u8') && !streamUrl.includes('.mpd') && !streamUrl.includes('/live.php');

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col transition-all duration-300 ${
        isTheaterMode ? 'p-0' : 'p-2 sm:p-6'
      }`}
    >
      {/* Player Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d17] border-b border-white/10 rounded-t-2xl">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
            <Radio className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-white truncate">{title}</h3>
            <p className="text-[11px] text-gray-400">
              {mediaType === 'tv' ? `Season ${currentSeason} Episode ${currentEpisode}` : mediaType.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center space-x-2">
          {/* Audio mode button if available */}
          <button
            onClick={() => setAudioMode(audioMode === 'sub' ? 'dub' : 'sub')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
              audioMode === 'dub'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-white/5 text-gray-400 border-white/10'
            }`}
          >
            {audioMode.toUpperCase()}
          </button>

          {/* Fullscreen / Theater Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg glass-panel hover:bg-white/15 text-gray-400 hover:text-white"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Player */}
          <button
            onClick={closePlayer}
            className="p-2 rounded-lg bg-pink-600/90 hover:bg-pink-500 text-white shadow-lg shadow-pink-600/25 transition-colors"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video / Embed Frame Container */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
        {isEmbed ? (
          <iframe
            src={streamUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <video
            ref={videoRef}
            src={streamUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Bottom Footer Controls (Server Selector & Backups) */}
      <div className="px-4 py-3 bg-[#0d0d17] border-t border-white/10 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
        {/* 8-Server Cascade Dropdown (Algorithm 8) */}
        {isEmbed && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 font-medium hidden sm:inline">Stream Server:</span>
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar max-w-full">
              {EMBED_SERVERS.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => setServer(srv.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedServer === srv.id
                      ? 'bg-pink-500 text-white border-pink-400 shadow-md shadow-pink-500/25'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {srv.name.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Sports Backup Feeds */}
        {backupSources.length > 1 && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 font-medium">Backup Feeds:</span>
            <div className="flex items-center space-x-1">
              {backupSources.map((src, i) => (
                <button
                  key={src.id}
                  onClick={() => usePlayerStore.getState().setStreamUrl(src.url, src.type, src.clearkey)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border ${
                    streamUrl === src.url
                      ? 'bg-indigo-600 text-white border-indigo-400'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                  }`}
                >
                  Feed {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-[11px] text-gray-500 ml-auto">
          Hardware Accelerated • Ultra Low Latency
        </div>
      </div>
    </div>
  );
};
