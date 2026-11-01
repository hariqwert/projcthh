(async function() {
    function whenBodyReady(fn) {
        if (document.body) {
            fn(document.body);
        } else {
            document.addEventListener('DOMContentLoaded', () => fn(document.body));
        }
    }

    try {
        const res = await fetch('/api/config/backgrounds');
        const config = await res.json();
        
        let targetBgObj = null;
        let useSongVideo = config.musicUseSongVideo !== false;
        window.__bgMusicUseSongVideo = useSongVideo;
        window.__bgMusicDefault = (config.music && typeof config.music === 'object') ? (config.music.url || '') : (typeof config.music === 'string' ? config.music : ''); 
        window.__bgMusicType = (config.music && typeof config.music === 'object') ? (config.music.type || 'auto') : 'auto';
        window.__pageBackgrounds = config;

        const p = window.location.pathname.toLowerCase();
        const isHeroPage = p.includes('hero.html') || p === '/hero' || p === '/' || p === '/index.html' || (document.title && document.title.includes('AETHERIS'));
        const isYoutubePage = p.includes('youtube') || p.includes('youtub');
        const isMusicPage = p.includes('music.html') || p.includes('music');
        const isConsumetPage = p.includes('consumet') || p.includes('cinema');
        const isIndexPage = (p.includes('index.php') || p === '/tv') && !isHeroPage;

        if (isHeroPage) {
            targetBgObj = config.hero;
        } else if (isYoutubePage) {
            targetBgObj = config.youtube || config.index;
        } else if (isConsumetPage) {
            targetBgObj = config.consumet;
        } else if (isMusicPage) {
            targetBgObj = null; // Handled by music.html explicitly for dynamic sync
        } else if (isIndexPage) {
            targetBgObj = config.index;
        } else {
            targetBgObj = config.index;
        }

        function isYouTube(url) {
            if (!url) return false;
            return (url.length === 11 && !url.includes('.')) || url.includes('youtube.com') || url.includes('youtu.be');
        }

        function extractYTId(url) {
            if (!url) return null;
            if (url.length === 11 && !url.includes('.')) return url;
            const match = url.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
            return (match && match[1].length === 11) ? match[1] : null;
        }

        window.injectBackground = function(type, rawUrl) {
            if (!rawUrl || typeof rawUrl !== 'string' || rawUrl.trim() === '') return;
            const url = rawUrl.trim();

            whenBodyReady((body) => {
                // Check if on Hero page with native hero elements
                const heroCharVid = document.getElementById('charVideo');
                const heroVideoWrap = document.getElementById('videoWrapper');
                if (isHeroPage && heroCharVid && heroVideoWrap) {
                    const isImgUrl = type === 'image' || !!(url.match(/\.(jpeg|jpg|gif|png|webp|avif)(\?.*)?$/i) || url.includes('format_webp') || url.includes('format=webp'));
                    if (isYouTube(url)) {
                        const ytId = extractYTId(url) || url;
                        let ytFrame = document.getElementById('heroYtBackgroundFrame');
                        if (!ytFrame) {
                            ytFrame = document.createElement('iframe');
                            ytFrame.id = 'heroYtBackgroundFrame';
                            ytFrame.frameBorder = '0';
                            ytFrame.allow = 'autoplay; encrypted-media';
                            ytFrame.style.width = '100vw';
                            ytFrame.style.height = '56.25vw';
                            ytFrame.style.minHeight = '100vh';
                            ytFrame.style.minWidth = '177.77vh';
                            ytFrame.style.position = 'absolute';
                            ytFrame.style.top = '50%';
                            ytFrame.style.left = '50%';
                            ytFrame.style.transform = 'translate(-50%, -50%)';
                            ytFrame.style.zIndex = '1';
                            ytFrame.style.pointerEvents = 'none';
                            heroVideoWrap.prepend(ytFrame);
                        }
                        ytFrame.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${ytId}&modestbranding=1&playsinline=1&enablejsapi=1`;
                        heroCharVid.removeAttribute('poster');
                        heroCharVid.style.display = 'none';
                        heroVideoWrap.style.backgroundImage = 'none';
                    } else if (isImgUrl) {
                        // Only show photo if there is no active video source on heroCharVid
                        const hasVidSrc = heroCharVid.getAttribute('src') || (heroCharVid.querySelector('source') && heroCharVid.querySelector('source').getAttribute('src'));
                        if (!hasVidSrc) {
                            heroCharVid.removeAttribute('poster');
                            heroCharVid.style.display = 'none';
                            heroVideoWrap.style.backgroundImage = `url('${url}')`;
                        } else {
                            heroVideoWrap.dataset.fallbackPhoto = url;
                            heroVideoWrap.style.backgroundImage = 'none';
                            heroCharVid.removeAttribute('poster');
                        }
                    } else if (typeof window.bindExclusiveVideoOrPhoto === 'function') {
                        window.bindExclusiveVideoOrPhoto(heroCharVid, heroVideoWrap, url, heroVideoWrap.dataset.fallbackPhoto || '');
                    } else if (typeof window.setupHeroStreamVideo === 'function') {
                        heroVideoWrap.style.backgroundImage = 'none';
                        heroCharVid.removeAttribute('poster');
                        heroCharVid.style.display = 'block';
                        window.setupHeroStreamVideo(heroCharVid, url);
                    }
                    return;
                }

                // General page background injection
                const existingBgs = document.querySelectorAll('#quantum-bg-canvas, #canvas-container');
                const oldGlob = document.getElementById('global-admin-bg-container');
                if (oldGlob) oldGlob.remove();
                existingBgs.forEach(el => el.style.display = 'none');
                
                const container = document.createElement('div');
                container.id = 'global-admin-bg-container';
                container.style.position = 'fixed';
                container.style.top = '0';
                container.style.left = '0';
                container.style.width = '100vw';
                container.style.height = '100vh';
                container.style.zIndex = '-9999';
                container.style.overflow = 'hidden';
                container.style.pointerEvents = 'none';
                container.style.backgroundColor = '#000';

                const overlay = document.createElement('div');
                overlay.style.position = 'absolute';
                overlay.style.inset = '0';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; 
                overlay.style.zIndex = '1';
                
                let finalType = type;
                if (type === 'auto') {
                    if (isYouTube(url)) finalType = 'youtube';
                    else if (url.includes('.m3u') || url.includes('.m3u8')) finalType = 'm3u';
                    else if (url.match(/\.(jpeg|jpg|gif|png|webp|avif)(\?.*)?$/i) || url.includes('format_webp') || url.includes('format=webp')) finalType = 'image';
                    else finalType = 'direct';
                }

                if (finalType === 'image') {
                    const img = document.createElement('img');
                    img.src = url;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.position = 'absolute';
                    img.style.zIndex = '0';
                    container.appendChild(img);
                } else if (finalType === 'youtube') {
                    const ytId = extractYTId(url) || url;
                    const iframe = document.createElement('iframe');
                    iframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${ytId}&modestbranding=1&playsinline=1&enablejsapi=1`;
                    iframe.frameBorder = '0';
                    iframe.allow = 'autoplay; encrypted-media';
                    iframe.style.width = '100vw';
                    iframe.style.height = '56.25vw';
                    iframe.style.minHeight = '100vh';
                    iframe.style.minWidth = '177.77vh';
                    iframe.style.position = 'absolute';
                    iframe.style.top = '50%';
                    iframe.style.left = '50%';
                    iframe.style.transform = 'translate(-50%, -50%)';
                    iframe.style.zIndex = '0';
                    iframe.style.pointerEvents = 'none';
                    container.appendChild(iframe);
                } else {
                    // Direct MP4 or M3U8
                    const video = document.createElement('video');
                    video.autoplay = true;
                    video.loop = true;
                    video.muted = true;
                    video.playsInline = true;
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.objectFit = 'cover';
                    video.style.position = 'absolute';
                    video.style.zIndex = '0';
                    
                    let playableUrl = url;
                    if (playableUrl.startsWith('http://') || (playableUrl.startsWith('https://') && !playableUrl.startsWith(window.location.origin))) {
                        if (!playableUrl.includes('/stream_proxy.php') && !playableUrl.includes('/api/proxy/')) {
                            playableUrl = `/stream_proxy.php?url=${encodeURIComponent(playableUrl)}`;
                        }
                    }

                    if (finalType === 'm3u' || playableUrl.includes('.m3u')) {
                        const startHls = () => {
                            if (window.Hls && window.Hls.isSupported()) {
                                const hls = new window.Hls({ enableWorker: true, lowLatencyMode: true });
                                hls.loadSource(playableUrl);
                                hls.attachMedia(video);
                                hls.on(window.Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
                            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                                video.src = playableUrl;
                                video.play().catch(() => {});
                            }
                        };

                        if (window.Hls && window.Hls.isSupported()) {
                            startHls();
                        } else {
                            const script = document.createElement('script');
                            script.src = '/hls.min.js';
                            script.onload = startHls;
                            script.onerror = () => {
                                const cdn = document.createElement('script');
                                cdn.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
                                cdn.onload = startHls;
                                document.head.appendChild(cdn);
                            };
                            document.head.appendChild(script);
                        }
                    } else {
                        video.src = playableUrl;
                        video.play().catch(() => {});
                    }
                    container.appendChild(video);
                }

                container.appendChild(overlay);
                body.prepend(container);
            });
        };

        // --- PAGE-SPECIFIC AND GLOBAL AMBIENT AUDIO RESOLUTION ---
        const hasGlobalAudio = config.globalAudio && (
            (typeof config.globalAudio.url === 'string' && config.globalAudio.url.trim() !== '') ||
            (Array.isArray(config.globalAudio.playlist) && config.globalAudio.playlist.length > 0)
        );
        if (hasGlobalAudio) {
            const target = config.globalAudio.target || 'global';
            let shouldPlay = false;

            if (target === 'global') {
                shouldPlay = true;
            } else if (target === 'hero' && isHeroPage) {
                shouldPlay = true;
            } else if (target === 'youtube' && isYoutubePage) {
                shouldPlay = true;
            } else if (target === 'music' && isMusicPage) {
                shouldPlay = true;
            } else if (target === 'consumet' && isConsumetPage) {
                shouldPlay = true;
            } else if (target === 'index' && isIndexPage) {
                shouldPlay = true;
            }

            if (shouldPlay) {
                window.injectGlobalAudio(config.globalAudio);
            }
        }

        if (targetBgObj && targetBgObj.url && targetBgObj.url.trim() !== '') {
            window.injectBackground(targetBgObj.type || 'auto', targetBgObj.url.trim());
        }

    } catch (e) {
        console.error('Failed to load global background configuration:', e);
    }
})();

window.injectGlobalAudio = function(input) {
    if (!input) return;

    function extractYTId(u) {
        if (!u || typeof u !== 'string') return null;
        const s = u.trim();
        if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
        if (s.includes('/api/v1/youtube/stream')) {
            try {
                const parsed = new URL(s, window.location.origin);
                const v = parsed.searchParams.get('v');
                if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
            } catch (e) {}
        }
        const match = s.match(/(?:youtu\.be\/|youtube\.com\/(?:shorts\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=))([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    }

    function normalizeTrack(item, idx) {
        if (!item) return null;
        if (typeof item === 'string') {
            const raw = item.trim();
            if (!raw) return null;
            const ytId = extractYTId(raw);
            return {
                url: ytId ? `/api/v1/youtube/stream?v=${encodeURIComponent(ytId)}&type=audio` : raw,
                ytId: ytId,
                title: ytId ? `YouTube Audio (${ytId})` : (decodeURIComponent(raw.split('/').pop().split('?')[0]) || `Track ${idx + 1}`),
                artist: ytId ? 'YouTube' : 'Ambient Audio',
                type: ytId ? 'youtube' : 'audio'
            };
        }
        const rawUrl = (item.url || '').trim();
        if (!rawUrl) return null;
        const ytId = extractYTId(rawUrl);
        return {
            url: ytId && !rawUrl.startsWith('/api/v1/youtube/stream')
                ? `/api/v1/youtube/stream?v=${encodeURIComponent(ytId)}&type=audio`
                : rawUrl,
            ytId: ytId,
            title: item.title || (ytId ? `YouTube Audio (${ytId})` : `Track ${idx + 1}`),
            artist: item.artist || (ytId ? 'YouTube' : 'Ambient Audio'),
            thumbnail: item.thumbnail || (ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : ''),
            type: ytId || item.type === 'youtube' ? 'youtube' : (item.type || 'audio')
        };
    }

    let playlist = [];
    if (typeof input === 'string') {
        const t = normalizeTrack(input, 0);
        if (t) playlist.push(t);
    } else if (Array.isArray(input)) {
        playlist = input.map((it, idx) => normalizeTrack(it, idx)).filter(Boolean);
    } else if (typeof input === 'object') {
        if (Array.isArray(input.playlist) && input.playlist.length > 0) {
            playlist = input.playlist.map((it, idx) => normalizeTrack(it, idx)).filter(Boolean);
        }
        if (playlist.length === 0 && input.url) {
            const t = normalizeTrack(input, 0);
            if (t) playlist.push(t);
        }
    }

    // Merge any user-added local playlist tracks from localStorage
    try {
        const userSaved = JSON.parse(localStorage.getItem('user_custom_bg_playlist') || '[]');
        if (Array.isArray(userSaved)) {
            userSaved.forEach((uItem, idx) => {
                const nt = normalizeTrack(uItem, playlist.length + idx);
                if (nt && !playlist.some(p => p.url === nt.url)) {
                    playlist.push(nt);
                }
            });
        }
    } catch (e) {}

    if (playlist.length === 0) return;

    const existingAudio = document.getElementById('global-admin-audio-bg');
    if (existingAudio) existingAudio.remove();
    const existingYt = document.getElementById('global-admin-yt-bg');
    if (existingYt) existingYt.remove();
    const existingDock = document.getElementById('global-ambient-audio-dock');
    if (existingDock) existingDock.remove();

    let currentIdx = 0;
    let isMuted = false;

    const mountAudio = (body) => {
        const audio = document.createElement('audio');
        audio.id = 'global-admin-audio-bg';
        audio.preload = 'auto';
        audio.volume = 0.85;
        audio.style.display = 'none';
        body.appendChild(audio);

        let ytIframe = null;
        function destroyYtFallback() {
            if (ytIframe) {
                ytIframe.remove();
                ytIframe = null;
            }
        }

        function mountYtFallback(ytId) {
            destroyYtFallback();
            if (!ytId || isMuted) return;
            ytIframe = document.createElement('iframe');
            ytIframe.id = 'global-admin-yt-bg';
            ytIframe.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0.001;pointer-events:none;bottom:0;right:0;z-index:-1;';
            const allYtIds = playlist.map(t => t.ytId).filter(Boolean);
            const playlistParam = allYtIds.length > 1 ? allYtIds.join(',') : ytId;
            ytIframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&controls=0&loop=1&playlist=${encodeURIComponent(playlistParam)}&enablejsapi=1`;
            ytIframe.allow = 'autoplay; encrypted-media';
            body.appendChild(ytIframe);
        }

        let shortcutToastTimer = null;
        function showShortcutToast(text) {
            let toast = document.getElementById('global-audio-shortcut-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'global-audio-shortcut-toast';
                toast.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:99999;padding:7px 14px;border-radius:10px;background:rgba(8,10,16,0.9);border:1px solid rgba(255,255,255,0.18);backdrop-filter:blur(12px);color:#f8fafc;font-family:monospace;font-size:11px;font-weight:700;letter-spacing:0.06em;pointer-events:none;opacity:0;transform:translateY(8px);transition:all 0.25s ease;box-shadow:0 10px 25px rgba(0,0,0,0.7);';
                body.appendChild(toast);
            }
            toast.textContent = text;
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
            if (shortcutToastTimer) clearTimeout(shortcutToastTimer);
            shortcutToastTimer = setTimeout(() => {
                if (toast) {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(8px)';
                }
            }, 1600);
        }

        function loadAndPlayTrack(idx, notifyShortcut = false) {
            if (playlist.length === 0) return;
            currentIdx = ((idx % playlist.length) + playlist.length) % playlist.length;
            const track = playlist[currentIdx];
            destroyYtFallback();

            audio.loop = (playlist.length === 1);
            audio.src = track.url;
            audio.muted = isMuted;

            if (notifyShortcut) {
                showShortcutToast(`♪ [${currentIdx + 1}/${playlist.length}] ${track.title || 'Track'}`);
            }

            const playPromise = audio.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {
                    if (audio.error && track.ytId) {
                        mountYtFallback(track.ytId);
                    } else {
                        showUnmutePrompt();
                    }
                });
            }
        }

        audio.addEventListener('ended', () => {
            if (playlist.length > 1) {
                loadAndPlayTrack(currentIdx + 1);
            } else {
                audio.currentTime = 0;
                audio.play().catch(() => {});
            }
        });

        audio.addEventListener('error', () => {
            const track = playlist[currentIdx];
            if (track && track.ytId) {
                mountYtFallback(track.ytId);
            } else if (playlist.length > 1) {
                setTimeout(() => loadAndPlayTrack(currentIdx + 1), 1200);
            }
        });

        // Keyboard shortcuts only (No visual controller dock):
        // [M] = Mute / Unmute, [ = Previous Song, ] = Next Song
        document.addEventListener('keydown', (e) => {
            const tag = (e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : '';
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (e.target && e.target.isContentEditable)) return;
            if (e.ctrlKey || e.altKey || e.metaKey) return;

            if (e.key === 'm' || e.key === 'M') {
                isMuted = !isMuted;
                audio.muted = isMuted;
                if (isMuted) {
                    destroyYtFallback();
                    showShortcutToast('🔇 AUDIO MUTED [M]');
                } else {
                    if (audio.paused) audio.play().catch(() => {});
                    const cur = playlist[currentIdx] || playlist[0];
                    showShortcutToast(`🔊 PLAYING: ${(cur && cur.title) ? cur.title : 'Ambient Audio'} [M]`);
                }
            } else if (e.key === '[') {
                loadAndPlayTrack(currentIdx - 1, true);
            } else if (e.key === ']') {
                loadAndPlayTrack(currentIdx + 1, true);
            }
        });

        // Universal interaction unlocker
        const unlockInteraction = () => {
            if (!isMuted && audio.paused) {
                audio.play().then(() => {
                    const prompt = document.getElementById('bgAmbientUnmutePrompt');
                    if (prompt) prompt.remove();
                }).catch(() => {});
            }
            document.removeEventListener('click', unlockInteraction);
            document.removeEventListener('touchstart', unlockInteraction);
            document.removeEventListener('keydown', unlockInteraction);
        };

        document.addEventListener('click', unlockInteraction, { once: true });
        document.addEventListener('touchstart', unlockInteraction, { once: true });
        document.addEventListener('keydown', unlockInteraction, { once: true });

        loadAndPlayTrack(0);
    };

    function showUnmutePrompt() {
        if (document.getElementById('bgAmbientUnmutePrompt')) return;
        const prompt = document.createElement('div');
        prompt.id = 'bgAmbientUnmutePrompt';
        prompt.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;margin-right:8px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
            <span>Tap to enable ambient playlist (${playlist.length} ${playlist.length === 1 ? 'song' : 'songs'})</span>
        `;
        prompt.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:999999;padding:8px 18px;border-radius:9999px;background:rgba(8,8,12,0.9);border:1px solid rgba(255,255,255,0.25);color:#fff;font-size:11px;font-family:monospace;font-weight:700;cursor:pointer;backdrop-filter:blur(16px);box-shadow:0 10px 30px rgba(0,0,0,0.8),0 0 20px rgba(255,255,255,0.15);display:flex;align-items:center;transition:all 0.3s ease;';

        prompt.onclick = () => {
            const audioEl = document.getElementById('global-admin-audio-bg');
            if (audioEl) audioEl.play().catch(() => {});
            prompt.remove();
        };

        document.body.appendChild(prompt);
    }

    if (document.body) {
        mountAudio(document.body);
    } else {
        document.addEventListener('DOMContentLoaded', () => mountAudio(document.body));
    }
};

