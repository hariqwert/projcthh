import React from 'react';
import { Play, Star, Radio, Layers } from 'lucide-react';
import { LiveTvChannel } from '../../types';
import { usePlayerStore } from '../../store/playerStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { liveTvClient } from '../../services/liveTvClient';

interface LiveTvCardProps {
  channel: LiveTvChannel;
}

export const LiveTvCard: React.FC<LiveTvCardProps> = ({ channel }) => {
  const { openPlayer } = usePlayerStore();
  const { isChannelPinned, togglePinChannel } = useFavoritesStore();

  const isPinned = isChannelPinned(channel.id);
  const streamCount = channel.streamCount || 1;

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const playUrl = liveTvClient.buildPlayUrl(channel);
    openPlayer({
      mediaType: 'livetv',
      title: channel.name,
      streamUrl: playUrl,
      streamType: channel.type,
      clearkey: channel.clearkey,
      isLive: true,
    });
  };

  return (
    <div
      onClick={handlePlay}
      className="group relative cursor-pointer glass-panel p-3.5 rounded-2xl border border-white/5 hover:border-pink-500/40 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-500/10"
    >
      <div className="flex items-center space-x-3.5">
        {/* Channel Logo Container */}
        <div className="relative w-14 h-14 rounded-xl bg-white/5 border border-white/10 p-2 flex items-center justify-center flex-shrink-0 group-hover:border-pink-500/30 transition-colors">
          <img
            src={channel.logo}
            alt={channel.name}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/logos/sports_default.png';
            }}
            className="max-h-full max-w-full object-contain filter drop-shadow"
          />
          {streamCount > 1 && (
            <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded bg-indigo-600 text-white text-[9px] font-bold border border-indigo-400">
              {streamCount}x
            </span>
          )}
        </div>

        {/* Channel Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white truncate group-hover:text-pink-400 transition-colors">
              {channel.name}
            </h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePinChannel(channel.id);
              }}
              className={`p-1 rounded-lg transition-colors ${
                isPinned ? 'text-amber-400' : 'text-gray-500 hover:text-white'
              }`}
              title={isPinned ? 'Unpin Channel' : 'Pin Channel'}
            >
              <Star className={`w-3.5 h-3.5 ${isPinned ? 'fill-amber-400' : ''}`} />
            </button>
          </div>

          <div className="flex items-center space-x-2 mt-1.5">
            <span className="px-2 py-0.5 rounded-md bg-white/10 text-gray-300 text-[10px] font-medium border border-white/10">
              {channel.language}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-pink-500/15 text-pink-300 text-[10px] font-semibold border border-pink-500/20">
              {channel.category}
            </span>
          </div>
        </div>

        {/* Hover Play Icon */}
        <div className="w-9 h-9 rounded-xl bg-pink-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg shadow-pink-600/30 flex-shrink-0">
          <Play className="w-4 h-4 fill-white ml-0.5" />
        </div>
      </div>
    </div>
  );
};
