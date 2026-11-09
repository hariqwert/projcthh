import React from 'react';
import { X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export const TrailerModal: React.FC = () => {
  const { isTrailerOpen, trailerKey, trailerTitle, closeTrailer } = useUIStore();

  if (!isTrailerOpen || !trailerKey) return null;

  return (
    <div
      onClick={closeTrailer}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0d0d17] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-pink-500/10"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-bold text-white truncate max-w-md">
            {trailerTitle || 'Official Trailer'}
          </h3>
          <button
            onClick={closeTrailer}
            className="p-1.5 rounded-xl glass-panel hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Embed */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
            title={trailerTitle || 'Trailer'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
