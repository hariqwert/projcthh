import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Tv, Play, Grid, List } from 'lucide-react';
import { epgClient } from '../services/epgClient';
import { liveTvClient } from '../services/liveTvClient';
import { useEpgStore } from '../store/epgStore';
import { usePlayerStore } from '../store/playerStore';
import { EpgProgramItem, LiveTvChannel } from '../types';

const NETWORKS = ['ALL', 'STAR', 'SONY', 'ZEE', 'SPORTS'];

export const EpgPage: React.FC = () => {
  const { 
    activeNetwork, 
    setActiveNetwork, 
    openChannelSchedule, 
    openProgramModal,
    setChannelList
  } = useEpgStore();

  const { openPlayer } = usePlayerStore();
  const [channels, setChannels] = useState<LiveTvChannel[]>([]);
  const [timelineData, setTimelineData] = useState<Record<string, EpgProgramItem[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      liveTvClient.fetchChannels('jtv'),
      epgClient.fetchAllEpgTimeline(activeNetwork)
    ])
      .then(([chanList, timeline]) => {
        setChannels(chanList);
        setChannelList(chanList);
        setTimelineData(timeline);
      })
      .catch((e) => console.warn('Failed to load EPG timeline', e))
      .finally(() => setLoading(false));
  }, [activeNetwork]);

  const filteredChannels = channels.filter((c) => {
    if (activeNetwork === 'ALL') return true;
    if (activeNetwork === 'STAR') return c.name.toLowerCase().includes('star');
    if (activeNetwork === 'SONY') return c.name.toLowerCase().includes('sony');
    if (activeNetwork === 'ZEE') return c.name.toLowerCase().includes('zee');
    if (activeNetwork === 'SPORTS') return c.category.toLowerCase().includes('sports');
    return true;
  }).slice(0, 36);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">EPG Program Guide</h1>
            <p className="text-xs sm:text-sm text-gray-400">XMLTV 24-Hour Electronic Program Schedules & On-Air Meters</p>
          </div>
        </div>

        {/* Network Filter */}
        <div className="flex items-center space-x-1 p-1 rounded-2xl bg-white/5 border border-white/10 self-start sm:self-auto">
          {NETWORKS.map((net) => (
            <button
              key={net}
              onClick={() => setActiveNetwork(net as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeNetwork === net
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {net}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Channels with Active Schedules */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading XMLTV schedules...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChannels.map((channel) => {
            const channelSchedule = timelineData[channel.id] || [];
            const currentProgram = channelSchedule.find(
              (p) => (p.progressPct || 0) > 0 && (p.progressPct || 0) < 100
            ) || channelSchedule[0];

            return (
              <div
                key={channel.id}
                className="glass-panel p-4 rounded-2xl border border-white/5 space-y-3 hover:border-pink-500/30 transition-all flex flex-col justify-between"
              >
                {/* Channel Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={channel.logo}
                      alt={channel.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/logos/sports_default.png';
                      }}
                      className="w-10 h-10 object-contain p-1 rounded-xl bg-white/5"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white truncate max-w-[160px]">{channel.name}</h4>
                      <span className="text-[10px] text-gray-400">{channel.language} • {channel.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {/* Channel 24h schedule button (resolves bug #2) */}
                    <button
                      onClick={() => openChannelSchedule(channel.id)}
                      className="px-2.5 py-1 rounded-xl glass-panel text-[11px] font-semibold text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      Guide
                    </button>

                    <button
                      onClick={() => {
                        const playUrl = liveTvClient.buildPlayUrl(channel);
                        openPlayer({
                          mediaType: 'livetv',
                          title: channel.name,
                          streamUrl: playUrl,
                          streamType: channel.type,
                          clearkey: channel.clearkey,
                          isLive: true,
                        });
                      }}
                      className="p-2 rounded-xl bg-pink-600 text-white hover:scale-105 transition-transform"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </button>
                  </div>
                </div>

                {/* Current Airing Program */}
                {currentProgram ? (
                  <div
                    onClick={() => openProgramModal(currentProgram)}
                    className="cursor-pointer p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-pink-500/30 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span className="flex items-center space-x-1 font-mono">
                        <Clock className="w-3 h-3 text-pink-500" />
                        <span>
                          {currentProgram.start ? new Date(currentProgram.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-400 font-bold text-[9px] uppercase">
                        On Air
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white truncate">{currentProgram.title}</p>
                    
                    {/* Algorithm 23: On-Air Progress Meter */}
                    <div className="w-full bg-white/10 rounded-full h-1 mt-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-indigo-500 h-full rounded-full transition-all"
                        style={{ width: `${currentProgram.progressPct || 45}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic py-2">Live broadcast schedule available via Guide</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
