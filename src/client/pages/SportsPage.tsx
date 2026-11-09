import React, { useState, useEffect } from 'react';
import { Trophy, Radio, Play, Shield, Filter, Video, Zap } from 'lucide-react';
import { useSportsSchedule } from '../hooks/useSportsSchedule';
import { useSportsStore } from '../store/sportsStore';
import { usePlayerStore } from '../store/playerStore';
import { sportsClient } from '../services/sportsClient';
import { NetflixSportCard } from '../components/cards/NetflixSportCard';
import { LiveTvCard } from '../components/cards/LiveTvCard';
import { LiveTvChannel } from '../types';

const SPORT_CATEGORIES = ['ALL', 'CRICKET', 'FOOTBALL', 'F1', 'TENNIS', 'WWE', 'COMBAT'];

export const SportsPage: React.FC = () => {
  useSportsSchedule();
  const { 
    liveEvents, 
    upcomingEvents, 
    activeSportCategory, 
    setActiveSportCategory,
    filterIplLanguage,
    setFilterIplLanguage,
    iplReplays,
    setIplReplays,
    openMatchCenter
  } = useSportsStore();

  const { openPlayer } = usePlayerStore();
  const [sportsChannels, setSportsChannels] = useState<LiveTvChannel[]>([]);
  const [activeTabSection, setActiveTabSection] = useState<'live' | 'channels' | 'replays'>('live');

  useEffect(() => {
    sportsClient.fetchSportsChannels().then(setSportsChannels);
    sportsClient.fetchIplReplays().then(setIplReplays);
  }, []);

  // Filter events by category
  const filteredLive = liveEvents.filter((e) => {
    if (activeSportCategory === 'ALL') return true;
    return (e.category || '').toUpperCase().includes(activeSportCategory);
  });

  const filteredUpcoming = upcomingEvents.filter((e) => {
    if (activeSportCategory === 'ALL') return true;
    return (e.category || '').toUpperCase().includes(activeSportCategory);
  });

  // Algorithm 29: IPL 2026 146-Match Replay Filter
  const filteredReplays = iplReplays.filter((r) => {
    if (filterIplLanguage === 'ALL') return true;
    return (r.language || r.lang || '').toUpperCase() === filterIplLanguage;
  });

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Sports Central</h1>
            <p className="text-xs sm:text-sm text-gray-400">Live Arenas, 24/7 Channels & IPL VOD Replays</p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center space-x-1 p-1 rounded-2xl bg-white/5 border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveTabSection('live')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTabSection === 'live' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25' : 'text-gray-400 hover:text-white'
            }`}
          >
            Live Matches ({filteredLive.length})
          </button>
          <button
            onClick={() => setActiveTabSection('channels')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTabSection === 'channels' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25' : 'text-gray-400 hover:text-white'
            }`}
          >
            24/7 Channels ({sportsChannels.length})
          </button>
          <button
            onClick={() => setActiveTabSection('replays')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTabSection === 'replays' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25' : 'text-gray-400 hover:text-white'
            }`}
          >
            IPL Replays ({iplReplays.length})
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {SPORT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveSportCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
              activeSportCategory === cat
                ? 'bg-pink-600 text-white border-pink-500 shadow-md shadow-pink-600/25'
                : 'glass-panel text-gray-400 hover:text-white border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Section 1: Live Matches */}
      {activeTabSection === 'live' && (
        <div className="space-y-6">
          {filteredLive.length > 0 ? (
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500 live-indicator" />
                <span>Live Matches In Progress</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLive.map((event) => (
                  <NetflixSportCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center glass-panel rounded-3xl border border-white/5 space-y-2">
              <p className="text-base font-bold text-white">No matches currently live in this category</p>
              <p className="text-xs text-gray-400">Check upcoming matches below or tune into a 24/7 Sports channel.</p>
            </div>
          )}

          {/* Upcoming Matches */}
          {filteredUpcoming.length > 0 && (
            <div className="pt-6">
              <h3 className="text-lg font-bold text-white mb-4">Upcoming Matches Today</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUpcoming.map((event) => (
                  <NetflixSportCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section 2: 24/7 Sports Channels Catalog */}
      {activeTabSection === 'channels' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Verified Sports TV Networks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {sportsChannels.map((channel) => (
              <LiveTvCard key={channel.id} channel={channel} />
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Algorithm 29 - IPL 2026 146-Match VOD Replays */}
      {activeTabSection === 'replays' && (
        <div className="space-y-6">
          {/* Audio Language Filter */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">IPL 2026 Full Match Replays Archive</h3>
              <p className="text-xs text-gray-400">146 Complete High-Bitrate VOD Recordings</p>
            </div>

            <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
              {(['ALL', 'ENGLISH', 'HINDI'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilterIplLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterIplLanguage === lang
                      ? 'bg-amber-500 text-black font-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {filteredReplays.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredReplays.map((match: any, idx: number) => {
                const streamUrl = match.stream || match.url || '';
                const title = match.title || `Match ${match.match_no || idx + 1}`;
                return (
                  <div
                    key={match.id || idx}
                    onClick={() => {
                      if (streamUrl) {
                        openPlayer({
                          mediaType: 'sports',
                          title: `IPL Replay: ${title}`,
                          streamUrl,
                          streamType: 'hls',
                        });
                      }
                    }}
                    className="group cursor-pointer glass-card p-3 rounded-2xl border border-white/5 hover:border-amber-400/50 hover:bg-white/10 transition-all hover:scale-[1.02]"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-2.5">
                      <img
                        src={match.thumb || 'https://img10.hotstar.com/image/upload/f_auto/sources/r1/cms/prod/4919/1711200384919-h'}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-black uppercase">
                        {match.language || 'HINDI'}
                      </div>
                      <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-pink-600 text-white shadow-lg">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                      {title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{match.date || 'IPL Archive'}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center glass-panel rounded-3xl border border-white/5">
              <p className="text-sm text-gray-400">Loading IPL replay repository...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
