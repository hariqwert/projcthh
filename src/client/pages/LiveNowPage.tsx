import React from 'react';
import { Radio, Trophy, Shield, Play, Zap, Activity } from 'lucide-react';
import { useSportsSchedule } from '../hooks/useSportsSchedule';
import { useSportsStore } from '../store/sportsStore';
import { usePlayerStore } from '../store/playerStore';

export const LiveNowPage: React.FC = () => {
  useSportsSchedule();
  const { liveEvents, openMatchCenter } = useSportsStore();
  const { openPlayer } = usePlayerStore();

  const featuredMatch = liveEvents[0];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
            <Radio className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Live Now Arena</h1>
            <p className="text-xs sm:text-sm text-gray-400">Glacier Sapphire Big Screen & Stadium Feeds</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase">
          <span className="w-2 h-2 rounded-full bg-red-500 live-indicator" />
          <span>{liveEvents.length} Active Matches</span>
        </div>
      </div>

      {/* Featured Big Screen Banner */}
      {featuredMatch ? (
        <div className="relative w-full rounded-3xl overflow-hidden glass-panel border border-white/10 p-6 sm:p-10 bg-gradient-to-br from-[#121026] via-[#0c0c16] to-[#07070b]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-lg text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-red-600/30">
                <span className="w-2 h-2 rounded-full bg-white live-indicator" />
                <span>Spotlight Stadium</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {featuredMatch.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                {featuredMatch.tournament || featuredMatch.category} • Multi-server DRM Relay
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <button
                  onClick={() => openMatchCenter(featuredMatch)}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm shadow-xl shadow-pink-600/30 hover:scale-105 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Launch Live Stream</span>
                </button>
              </div>
            </div>

            {/* Teams Visual Showcase */}
            <div className="flex items-center space-x-6 sm:space-x-10">
              <div className="flex flex-col items-center space-y-2">
                {featuredMatch.logos?.home ? (
                  <img src={featuredMatch.logos.home} alt="Home" className="w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-2xl" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-pink-400" />
                  </div>
                )}
                <span className="text-sm font-bold text-white text-center">{featuredMatch.teams?.home}</span>
              </div>

              <div className="px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-sm tracking-widest">
                VS
              </div>

              <div className="flex flex-col items-center space-y-2">
                {featuredMatch.logos?.away ? (
                  <img src={featuredMatch.logos.away} alt="Away" className="w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-2xl" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-pink-400" />
                  </div>
                )}
                <span className="text-sm font-bold text-white text-center">{featuredMatch.teams?.away}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center glass-panel rounded-3xl border border-white/5 space-y-3">
          <Trophy className="w-12 h-12 text-gray-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Live Stadium Matches Currently Active</h3>
          <p className="text-xs text-gray-400">Upcoming matches will automatically appear here when kickoff approaches.</p>
        </div>
      )}

      {/* Grid of all Live Events */}
      {liveEvents.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">All Live Matches</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => openMatchCenter(event)}
                className="group cursor-pointer glass-card p-4 rounded-2xl border border-white/5 hover:border-pink-500/40 hover:bg-white/10 transition-all flex flex-col justify-between space-y-4 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 live-indicator" />
                    <span>LIVE</span>
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-gray-300 font-semibold">
                    {event.category}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{event.tournament || 'Live Match'}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-gray-400">
                  <span className="text-pink-400 font-semibold">{event.sources?.length || 1} Streaming Feeds</span>
                  <div className="p-1.5 rounded-xl bg-pink-600 text-white group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
