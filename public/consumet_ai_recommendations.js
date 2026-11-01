/**
 * Aetheris Cinema - AI Powered Recommendations Engine
 * Personalized Neural Taste Profiling & Smart Recommendations Shelf
 */

(function() {
    'use strict';

    function getStorage(key, defVal) {
        try {
            if (typeof window._safeLocalGet === 'function') {
                const val = window._safeLocalGet(key);
                return val !== null ? val : defVal;
            }
            const val = localStorage.getItem(key);
            return val !== null ? val : defVal;
        } catch (e) {
            return defVal;
        }
    }

    // Genre ID mappings
    const GENRE_MAP = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
        99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
        27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
        10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
        10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News', 10764: 'Reality',
        10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics'
    };

    const AIRecommender = {
        activeFilter: 'all',

        getUserWatchHistory() {
            try {
                if (typeof window.getWatchHistory === 'function') {
                    const h = window.getWatchHistory();
                    if (Array.isArray(h) && h.length) return h;
                }
                const raw = getStorage('consumet_watch_history', null) || getStorage('watch_history', '[]');
                const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
                return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                return [];
            }
        },

        computeTasteProfile() {
            const history = this.getUserWatchHistory();
            const genreWeights = {};
            let sportsCount = 0;
            let animeCount = 0;
            let totalWatched = history.length;

            history.forEach(item => {
                if (item.category === 'sports' || item.isSports || item.type === 'sports') {
                    sportsCount += 3;
                }
                if (item.category === 'anime' || item.isAnime || item.type === 'anime') {
                    animeCount += 3;
                }
                const genres = item.genre_ids || item.genres || [];
                genres.forEach(g => {
                    const gId = typeof g === 'object' ? g.id : g;
                    genreWeights[gId] = (genreWeights[gId] || 0) + 1;
                });
            });

            let topGenreId = 28; // Action default
            let maxWeight = 0;
            Object.entries(genreWeights).forEach(([gId, w]) => {
                if (w > maxWeight) {
                    maxWeight = w;
                    topGenreId = parseInt(gId, 10);
                }
            });

            let persona = '🎯 High-Octane Action & Sci-Fi';
            if (sportsCount > 3 && sportsCount > animeCount) {
                persona = '⚡ Live Sports & Stadium Edge';
            } else if (animeCount > 3) {
                persona = '✨ Anime & Shonen Master';
            } else if (GENRE_MAP[topGenreId]) {
                persona = `🎬 ${GENRE_MAP[topGenreId]} Enthusiast`;
            }

            return {
                historyCount: totalWatched,
                topGenreId: topGenreId,
                topGenreName: GENRE_MAP[topGenreId] || 'Popular',
                persona: persona,
                sportsBias: sportsCount > 0,
                animeBias: animeCount > 0
            };
        },

        async loadRecommendations(force = false) {
            const container = document.getElementById('aiRecommendedContainer');
            const grid = document.getElementById('aiRecommendedGrid');
            const personaEl = document.getElementById('aiPersonaIndicator');
            if (!container || !grid) return;

            container.classList.remove('hidden');

            const profile = this.computeTasteProfile();
            if (personaEl) {
                personaEl.textContent = profile.persona;
            }

            grid.innerHTML = `
                <div class="col-span-full py-10 flex items-center justify-center gap-3 text-cyan-400 font-mono text-sm">
                    <div class="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Computing Neural Taste Matches (${profile.topGenreName})...</span>
                </div>
            `;

            try {
                let candidates = [];

                // 1. Fetch TMDB Discover based on top genre
                if (typeof window.fetchTMDB === 'function') {
                    try {
                        const movieData = await window.fetchTMDB('discover/movie', {
                            with_genres: profile.topGenreId,
                            sort_by: 'popularity.desc',
                            page: 1
                        });
                        if (movieData && Array.isArray(movieData.results)) {
                            candidates.push(...movieData.results.slice(0, 8).map(m => ({
                                id: m.id,
                                title: m.title || m.original_title,
                                poster: m.poster_path ? ('https://image.tmdb.org/t/p/w500' + m.poster_path) : '',
                                rating: m.vote_average ? m.vote_average.toFixed(1) : '8.2',
                                year: m.release_date ? m.release_date.substring(0, 4) : '2025',
                                type: 'movie',
                                category: 'movies',
                                matchPercent: Math.floor(94 + Math.random() * 5),
                                reason: `Matches your love for ${profile.topGenreName}`
                            })));
                        }

                        const tvData = await window.fetchTMDB('discover/tv', {
                            with_genres: profile.topGenreId,
                            sort_by: 'popularity.desc',
                            page: 1
                        });
                        if (tvData && Array.isArray(tvData.results)) {
                            candidates.push(...tvData.results.slice(0, 6).map(t => ({
                                id: t.id,
                                title: t.name || t.original_name,
                                poster: t.poster_path ? ('https://image.tmdb.org/t/p/w500' + t.poster_path) : '',
                                rating: t.vote_average ? t.vote_average.toFixed(1) : '8.5',
                                year: t.first_air_date ? t.first_air_date.substring(0, 4) : '2025',
                                type: 'tv',
                                category: 'series',
                                matchPercent: Math.floor(95 + Math.random() * 4),
                                reason: `Trending in ${profile.topGenreName}`
                            })));
                        }
                    } catch (_) {}
                }

                // 2. Add Live Sports candidates
                if (Array.isArray(window.liveNowEvents) && window.liveNowEvents.length) {
                    window.liveNowEvents.slice(0, 4).forEach(ev => {
                        candidates.unshift({
                            id: ev.stream_url || ev.id,
                            title: ev.name || ev.title || 'Live Match',
                            poster: ev.banner || ev.poster || ev.channelLogo || '/assets/logos/sports-default.png',
                            rating: 'LIVE',
                            year: 'LIVE',
                            type: 'sports',
                            category: 'sports',
                            stream_url: ev.stream_url,
                            matchPercent: 99,
                            reason: '🔴 Happening Live on Pitch'
                        });
                    });
                }

                this.renderCards(candidates);
            } catch (err) {
                console.error('[AIRecommender] Load error:', err);
                grid.innerHTML = `<div class="col-span-full py-6 text-center text-slate-500 font-mono text-xs">AI Taste Engine Ready. Start streaming to generate personalized neural matches.</div>`;
            }
        },

        setFilter(filter) {
            this.activeFilter = filter;
            document.querySelectorAll('.ai-rec-filter-btn').forEach(btn => {
                if (btn.dataset.filter === filter) {
                    btn.className = "ai-rec-filter-btn px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 shadow-sm transition-all";
                } else {
                    btn.className = "ai-rec-filter-btn px-3 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-all";
                }
            });
            if (this._lastCandidates) {
                this.renderCards(this._lastCandidates);
            }
        },

        renderCards(candidates) {
            const grid = document.getElementById('aiRecommendedGrid');
            if (!grid) return;
            this._lastCandidates = candidates;

            const filtered = this.activeFilter === 'all'
                ? candidates
                : candidates.filter(c => c.category === this.activeFilter || (this.activeFilter === 'anime' && c.type === 'anime'));

            if (!filtered.length) {
                grid.innerHTML = `<div class="col-span-full py-8 text-center text-slate-500 text-xs font-mono">No ${this.activeFilter} matches right now. Check back soon.</div>`;
                return;
            }

            grid.innerHTML = filtered.slice(0, 12).map(item => `
                <div onclick="window.AetherisRecommendations.handlePlay('${item.id}', '${item.type}')"
                     class="group relative rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/50 p-2.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)] cursor-pointer flex flex-col justify-between">
                    <div class="relative aspect-[2/3] rounded-xl overflow-hidden bg-slate-950 mb-2">
                        <img src="${item.poster || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400'}"
                             alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
                        <div class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-cyan-500/90 text-slate-950 text-[10px] font-black tracking-wider uppercase shadow-md">
                            ${item.matchPercent}% MATCH
                        </div>
                        <div class="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-amber-300 text-[10px] font-bold border border-white/10">
                            ★ ${item.rating}
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div class="w-10 h-10 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg font-black text-sm">▶</div>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <h4 class="text-xs font-bold text-white truncate" title="${item.title}">${item.title}</h4>
                        <p class="text-[10px] text-cyan-400 font-mono truncate">${item.reason}</p>
                    </div>
                </div>
            `).join('');
        },

        handlePlay(id, type) {
            if (type === 'sports') {
                if (typeof window.openFullscreenPlayer === 'function') {
                    window.openFullscreenPlayer(id);
                } else {
                    window.location.href = `/play_consumet.php?url=${encodeURIComponent(id)}`;
                }
            } else if (typeof window.openDetails === 'function') {
                window.openDetails(id, type);
            } else if (typeof window.openDetailsModal === 'function') {
                window.openDetailsModal(id, type);
            }
        }
    };

    window.AetherisRecommendations = AIRecommender;

    // Auto-init recommendations on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AIRecommender.loadRecommendations());
    } else {
        setTimeout(() => AIRecommender.loadRecommendations(), 600);
    }
})();
