import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Film } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { fetchWithTimeout } from '../../services/apiClient';
import { TMDBMediaItem } from '../../types';

export const PersonModal: React.FC = () => {
  const { isPersonOpen, personId, closePerson, openMediaDetails } = useUIStore();
  const [person, setPerson] = useState<any | null>(null);
  const [credits, setCredits] = useState<TMDBMediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!personId || !isPersonOpen) return;
    setLoading(true);

    fetchWithTimeout<any>(`/api/consumet/person?id=${personId}`)
      .then((data) => {
        setPerson(data);
        const castCredits = (data?.combined_credits?.cast || []).sort(
          (a: any, b: any) => (b.popularity || 0) - (a.popularity || 0)
        );
        setCredits(castCredits.slice(0, 16));
      })
      .catch((e) => console.warn('Failed to load person details', e))
      .finally(() => setLoading(false));
  }, [personId, isPersonOpen]);

  if (!isPersonOpen) return null;

  const profileImg = person?.profile_path
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80';

  return (
    <div
      onClick={closePerson}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl my-8 bg-[#0e0e18] rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6"
      >
        <button
          onClick={closePerson}
          className="absolute top-5 right-5 p-2 rounded-xl glass-panel hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading artist profile...</p>
          </div>
        ) : person ? (
          <>
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <img
                src={profileImg}
                alt={person.name}
                className="w-32 h-44 sm:w-36 sm:h-52 rounded-2xl object-cover border border-white/10 shadow-xl shadow-pink-500/10 flex-shrink-0"
              />
              <div className="flex-1 text-center sm:text-left space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white">{person.name}</h2>
                <p className="text-sm font-semibold text-pink-400">{person.known_for_department || 'Acting'}</p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-gray-400 pt-1">
                  {person.birthday && (
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{person.birthday}</span>
                    </span>
                  )}
                  {person.place_of_birth && (
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{person.place_of_birth}</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-300 line-clamp-4 leading-relaxed pt-2">
                  {person.biography || 'No biography available for this artist.'}
                </p>
              </div>
            </div>

            {/* Known For Filmography */}
            {credits.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center space-x-2">
                  <Film className="w-4 h-4 text-pink-500" />
                  <span>Top Filmography</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {credits.map((c) => {
                    const cTitle = c.title || c.name || 'Untitled';
                    const cPoster = c.poster_path
                      ? `https://image.tmdb.org/t/p/w300${c.poster_path}`
                      : 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&auto=format&fit=crop&q=60';
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          closePerson();
                          openMediaDetails(c);
                        }}
                        className="group cursor-pointer glass-panel p-2 rounded-xl border border-white/5 hover:border-pink-500/40 transition-all hover:scale-105"
                      >
                        <img src={cPoster} alt={cTitle} className="w-full aspect-poster rounded-lg object-cover" />
                        <p className="text-xs font-semibold text-white truncate mt-1.5">{cTitle}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};
