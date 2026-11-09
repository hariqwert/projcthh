import React from 'react';
import { X, Clock, Calendar, Tv } from 'lucide-react';
import { useEpgStore } from '../../store/epgStore';

export const EpgProgramModal: React.FC = () => {
  const { isProgramModalOpen, selectedProgram, closeProgramModal } = useEpgStore();

  if (!isProgramModalOpen || !selectedProgram) return null;

  return (
    <div
      onClick={closeProgramModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#0e0e18] rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-6 sm:p-8 space-y-4"
      >
        <button
          onClick={closeProgramModal}
          className="absolute top-5 right-5 p-1.5 rounded-xl glass-panel hover:bg-white/15 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-xs text-pink-400 font-bold uppercase tracking-wider">
          <Tv className="w-4 h-4" />
          <span>{selectedProgram.channelName || 'Television Program'}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white">{selectedProgram.title}</h3>

        <div className="flex items-center space-x-3 text-xs text-gray-400 font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {selectedProgram.start ? new Date(selectedProgram.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''} - {selectedProgram.stop ? new Date(selectedProgram.stop).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span className="text-gray-300 font-sans">{selectedProgram.category || 'General'}</span>
        </div>

        {selectedProgram.desc ? (
          <p className="text-sm text-gray-300 leading-relaxed pt-2 border-t border-white/10">
            {selectedProgram.desc}
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic pt-2 border-t border-white/10">
            No program description available.
          </p>
        )}
      </div>
    </div>
  );
};
