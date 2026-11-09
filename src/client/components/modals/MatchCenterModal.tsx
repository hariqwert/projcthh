import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Shield, 
  Radio, 
  Zap, 
  Activity, 
  Clock, 
  Award,
  BarChart2
} from 'lucide-react';
import { useSportsStore } from '../../store/sportsStore';
import { usePlayerStore } from '../../store/playerStore';
import { useLiveScorecard } from '../../hooks/useLiveScorecard';
import { sportsClient } from '../../services/sportsClient';
import { SportsStreamSource } from '../../types';

export const MatchCenterModal: React.FC = () => {
  const { selectedMatch, isMatchCenterOpen, closeMatchCenter, probeLatencies, setProbeLatency } = useSportsStore();
  const { openPlayer } = usePlayerStore();
  const [selectedSource, setSelectedSource] = useState<SportsStreamSource | null>(null);

  // Algorithm 15 & 4: 15-second background scorecard telemetry poller
  useLiveScorecard(selectedMatch?.id);

  useEffect(() => {
    if (selectedMatch?.sources && selectedMatch.sources.length > 0) {
      setSelectedSource(selectedMatch.sources[0]);

      // Algorithm 5: Parallel Stream Reachability Probes (3.5s timeout)
      selectedMatch.sources.forEach((src) => {
        sportsClient.probeSourceReachability(src).then(({ isOnline, latencyMs }) => {
          setProbeLatency(src.id, latencyMs);
        });
      });
    }
  }, [selectedMatch?.id]);

  if (!isMatchCenterOpen || !selectedMatch) return null;

  const isLive = selectedMatch.isLive || selectedMatch.status === 'LIVE';
  const homeTeam = selectedMatch.teams?.home || 'Team A';
  const awayTeam = selectedMatch.teams?.away || 'Team B';
  const homeLogo = selectedMatch.logos?.home;
  const awayLogo = selectedMatch.logos?.away;

  const cricket = selectedMatch.scorecard?.cricket;
  const football = selectedMatch.scorecard?.football;

  const handleLaunchStream = (source: SportsStreamSource) => {
    // Launch playback directly
    openPlayer({
      mediaType: 'sports',
      title: `${selectedMatch.title} — ${source.name}`,
      streamUrl: source.url,
      streamType: source.type,
      clearkey: source.clearkey,
      backupSources: selectedMatch.sources,
      isLive: true,
    });
    closeMatchCenter();
  };

  return (
    <div
      onClick={closeMatchCenter}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl my-auto bg-[#0c0c16] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={closeMatchCenter}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Stadium Arena Header */}
        <div className="relative w-full py-8 sm:py-12 px-6 bg-gradient-to-b from-[#141226] via-[#0f0e1d] to-[#0c0c16] border-b border-white/5">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Live Indicator / Tournament Label */}
            <div className="flex items-center space-x-2">
              {isLive ? (
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-red-600/40">
                  <span className="w-2 h-2 rounded-full bg-white live-indicator" />
                  <span>LIVE MATCH</span>
                </div>
              ) : (
                <div className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-semibold border border-white/10">
                  {selectedMatch.startTime || 'UPCOMING MATCH'}
                </div>
              )}
              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">
                {selectedMatch.tournament || selectedMatch.category}
              </span>
            </div>

            {/* Teams Oval Showcase */}
            <div className="flex items-center justify-around w-full max-w-xl pt-2">
              {/* Home Team */}
              <div className="flex flex-col items-center space-y-2 w-32 sm:w-40 text-center">
                {homeLogo ? (
                  <img src={homeLogo} alt={homeTeam} className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-2xl" />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-pink-400" />
                  </div>
                )}
                <h3 className="text-sm sm:text-base font-black text-white">{homeTeam}</h3>
              </div>

              {/* Central Glowing VS Pill */}
              <div className="flex flex-col items-center space-y-1">
                <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-500/40 text-amber-300 font-black text-sm tracking-widest shadow-lg shadow-amber-500/20">
                  VS
                </div>
                {cricket?.score && (
                  <span className="text-lg font-mono font-bold text-white pt-1">{cricket.score}</span>
                )}
                {football?.score && (
                  <span className="text-2xl font-mono font-bold text-white pt-1">{football.score}</span>
                )}
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center space-y-2 w-32 sm:w-40 text-center">
                {awayLogo ? (
                  <img src={awayLogo} alt={awayTeam} className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-2xl" />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-pink-400" />
                  </div>
                )}
                <h3 className="text-sm sm:text-base font-black text-white">{awayTeam}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm 4: Real-Time Scorecard Telemetry Section */}
        {cricket && (
          <div className="p-4 sm:p-6 bg-white/[0.02] border-b border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center space-x-1 font-semibold text-gray-300">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>CRR: {cricket.crr || '8.2'}</span>
                {cricket.rrr && <span className="ml-2">RRR: {cricket.rrr}</span>}
              </span>
              <span>Overs: {cricket.overs || '14.2'}</span>
            </div>

            {/* 8-Ball colored strip */}
            {cricket.balls && cricket.balls.length > 0 && (
              <div className="flex items-center space-x-1.5 pt-1">
                <span className="text-xs text-gray-400 mr-2 font-medium">Recent:</span>
                {cricket.balls.map((b, idx) => {
                  let badgeBg = 'bg-white/10 text-gray-200';
                  if (b.type === 'boundary' || b.score === '4' || b.score === '6') badgeBg = 'bg-amber-500 text-black font-black';
                  else if (b.type === 'wicket' || b.score.toLowerCase() === 'w') badgeBg = 'bg-red-600 text-white font-black';
                  else if (b.score === '0') badgeBg = 'bg-white/5 text-gray-400';

                  return (
                    <span
                      key={idx}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-semibold ${badgeBg}`}
                    >
                      {b.score}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Available Streaming Feeds */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-pink-500" />
              <span>Broadcast Feeds ({selectedMatch.sources?.length || 0})</span>
            </h4>
            <span className="text-xs text-gray-400">Low-latency DRM edge relays</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedMatch.sources?.map((source, idx) => {
              const latency = probeLatencies[source.id];
              return (
                <div
                  key={source.id}
                  onClick={() => handleLaunchStream(source)}
                  className="group cursor-pointer glass-panel p-4 rounded-2xl border border-white/5 hover:border-pink-500/40 hover:bg-white/10 transition-all flex items-center justify-between hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      #{idx + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors truncate">
                        {source.name}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-400 mt-0.5">
                        <span className="uppercase text-[10px] px-1.5 py-0.2 rounded bg-white/10">
                          {source.type}
                        </span>
                        {source.clearkey && (
                          <span className="text-[10px] text-emerald-400 font-mono">ClearKey DRM</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {latency !== undefined && (
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-mono font-semibold ${
                        latency < 600 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {latency}ms
                      </span>
                    )}
                    <div className="p-2 rounded-xl bg-pink-600 text-white group-hover:scale-110 transition-transform shadow-lg shadow-pink-600/30">
                      <Play className="w-4 h-4 fill-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
