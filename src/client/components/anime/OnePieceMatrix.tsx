import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { ONE_PIECE_ARCS } from '../../services/animeClient';
import { usePlayerStore } from '../../store/playerStore';

export const OnePieceMatrix: React.FC = () => {
  const { openPlayer } = usePlayerStore();

  const handlePlayArc = (arc: typeof ONE_PIECE_ARCS[0]) => {
    openPlayer({
      mediaType: 'anime',
      title: `One Piece — ${arc.name} (Ep ${arc.startEp})`,
      server: 'anivexa',
      season: 1,
      episode: arc.startEp,
      media: {
        id: 37854,
        name: 'One Piece',
        media_type: 'tv',
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <h3 className="text-xl sm:text-2xl font-black text-white">One Piece Universe Matrix</h3>
      </div>
      <p className="text-xs sm:text-sm text-gray-400">
        Jump directly into any saga from Egghead Island back to East Blue with synchronised multi-audio streams.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {ONE_PIECE_ARCS.map((arc) => (
          <div
            key={arc.name}
            onClick={() => handlePlayArc(arc)}
            className="group cursor-pointer glass-card p-3 rounded-2xl border border-white/5 hover:border-amber-400/50 hover:bg-white/10 transition-all hover:scale-[1.02]"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden mb-2.5">
              <img
                src={arc.thumb}
                alt={arc.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-amber-300 font-mono font-bold">
                <span>Ep {arc.startEp}–{arc.endEp}</span>
                <div className="p-1 rounded-full bg-amber-500 text-black">
                  <Play className="w-3 h-3 fill-current" />
                </div>
              </div>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
              {arc.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
