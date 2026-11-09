import React from 'react';
import { Play, Radio, Shield, Zap } from 'lucide-react';
import { SportsEvent } from '../../types';
import { useSportsStore } from '../../store/sportsStore';

interface NetflixSportCardProps {
  event: SportsEvent;
}

export const NetflixSportCard: React.FC<NetflixSportCardProps> = ({ event }) => {
  const { openMatchCenter, probeLatencies } = useSportsStore();

  const isLive = event.isLive || event.status === 'LIVE';
  const homeTeam = event.teams?.home || 'Team A';
  const awayTeam = event.teams?.away || 'Team B';
  const homeLogo = event.logos?.home;
  const awayLogo = event.logos?.away;

  // Primary probe latency
  const primarySourceId = event.sources?.[0]?.id;
  const latency = primarySourceId ? probeLatencies[primarySourceId] : undefined;

  return (
    <div
      onClick={() => openMatchCenter(event)}
      className="group relative flex-shrink-0 cursor-pointer transition-all duration-300 w-72 sm:w-80"
    >
      <div className="relative aspect-match-card rounded-2xl overflow-hidden glass-card transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-pink-500/20 group-hover:border-pink-500/40 border border-white/5">
        {/* Background Image or Stadium Gradient */}
        {event.thumbnailUrl ? (
          <img
            src={event.thumbnailUrl}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-[#0d0d17] to-[#120a1c] p-4 flex flex-col justify-between" />
        )}

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

        {/* Top Badges Row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {/* Live Indicator or Start Time */}
          {isLive ? (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/40">
              <span className="w-2 h-2 rounded-full bg-white live-indicator" />
              <span>LIVE</span>
            </div>
          ) : (
            <div className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-gray-300 text-xs font-medium border border-white/10">
              {event.startTime || 'Upcoming'}
            </div>
          )}

          {/* Tournament & Category Tag */}
          <div className="flex items-center space-x-1.5">
            {latency !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold backdrop-blur-md border ${
                latency < 600 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}>
                {latency}ms
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
              {event.category}
            </span>
          </div>
        </div>

        {/* Center VS Display if no custom thumbnail */}
        {!event.thumbnailUrl && (
          <div className="absolute inset-0 flex items-center justify-center space-x-6 px-4">
            {/* Home Team */}
            <div className="flex flex-col items-center space-y-1.5 w-24">
              {homeLogo ? (
                <img src={homeLogo} alt={homeTeam} className="w-12 h-12 object-contain drop-shadow-lg" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Shield className="w-6 h-6 text-gray-300" />
                </div>
              )}
              <span className="text-xs font-semibold text-center text-gray-200 line-clamp-1">{homeTeam}</span>
            </div>

            {/* Glowing VS Pill */}
            <div className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-xs tracking-wider shadow-lg shadow-amber-500/20">
              VS
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center space-y-1.5 w-24">
              {awayLogo ? (
                <img src={awayLogo} alt={awayTeam} className="w-12 h-12 object-contain drop-shadow-lg" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Shield className="w-6 h-6 text-gray-300" />
                </div>
              )}
              <span className="text-xs font-semibold text-center text-gray-200 line-clamp-1">{awayTeam}</span>
            </div>
          </div>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px]">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-pink-600 text-white font-semibold text-sm shadow-xl shadow-pink-600/40">
            <Play className="w-4 h-4 fill-white" />
            <span>Open Match Center</span>
          </div>
        </div>

        {/* Bottom Details Bar */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-sm font-bold text-white truncate drop-shadow-md">{event.title}</p>
          <div className="flex items-center justify-between mt-1 text-xs text-gray-300">
            <span className="truncate max-w-[180px] text-gray-400">{event.tournament || event.category}</span>
            <span className="text-[11px] font-medium text-pink-400 flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>{event.sources?.length || 1} Feeds</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
