import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Play } from 'lucide-react';
import { useEpgStore } from '../../store/epgStore';
import { usePlayerStore } from '../../store/playerStore';
import { epgClient } from '../../services/epgClient';
import { EpgProgramItem } from '../../types';

export const EpgChannelModal: React.FC = () => {
  const { isChannelModalOpen, selectedChannelId, closeChannelModal, channelList, openProgramModal } = useEpgStore();
  const { openPlayer } = usePlayerStore();
  const [schedule, setSchedule] = useState<EpgProgramItem[]>([]);
  const [loading, setLoading] = useState(false);

  const currentChannel = channelList.find((c) => c.id === selectedChannelId);

  useEffect(() => {
    if (!selectedChannelId || !isChannelModalOpen) return;
    setLoading(true);

    epgClient.fetchEpgForChannel(selectedChannelId)
      .then((progs) => setSchedule(progs))
      .catch((e) => console.warn('Failed to fetch channel EPG', e))
      .finally(() => setLoading(false));
  }, [selectedChannelId, isChannelModalOpen]);

  if (!isChannelModalOpen) return null;

  const handlePlayChannel = () => {
    if (!currentChannel) return;
    openPlayer({
      mediaType: 'livetv',
      title: currentChannel.name,
      streamUrl: currentChannel.streamUrl,
      streamType: currentChannel.type,
      clearkey: currentChannel.clearkey,
      isLive: true,
    });
    closeChannelModal();
  };

  return (
    <div
      onClick={closeChannelModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl my-8 bg-[#0c0c16] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-4">
            {currentChannel?.logo && (
              <img src={currentChannel.logo} alt={currentChannel.name} className="w-12 h-12 object-contain" />
            )}
            <div>
              <h3 className="text-lg font-bold text-white">{currentChannel?.name || 'Channel Schedule'}</h3>
              <p className="text-xs text-gray-400">24-Hour Electronic Program Guide</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePlayChannel}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold text-xs transition-all shadow-lg shadow-pink-600/30"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Watch Live</span>
            </button>
            <button
              onClick={closeChannelModal}
              className="p-2 rounded-xl glass-panel hover:bg-white/15 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Schedule List */}
        <div className="overflow-y-auto custom-scrollbar p-6 space-y-3 flex-1">
          {loading ? (
            <div className="py-12 flex justify-center">
              <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : schedule.length > 0 ? (
            schedule.map((prog) => {
              const isCurrent = (prog.progressPct || 0) > 0 && (prog.progressPct || 0) < 100;
              return (
                <div
                  key={prog.id}
                  onClick={() => openProgramModal(prog)}
                  className={`cursor-pointer glass-panel p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'border-pink-500/50 bg-pink-500/10'
                      : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs font-mono text-gray-300">
                        {prog.start ? new Date(prog.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''} - {prog.stop ? new Date(prog.stop).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                        Now Airing
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{prog.title}</h4>
                  {prog.desc && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{prog.desc}</p>}

                  {isCurrent && (
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                      <div
                        className="bg-pink-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${prog.progressPct}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-400 text-center py-12">No EPG schedule data available for this channel.</p>
          )}
        </div>
      </div>
    </div>
  );
};
