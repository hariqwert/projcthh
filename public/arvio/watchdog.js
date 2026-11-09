(function() {
    if (window.__maintenanceWatchdogActive) return;
    window.__maintenanceWatchdogActive = true;

    // 1. Clean any sensitive URL parameters to prevent history / referrer leakage
    try {
        if (window.history && window.history.replaceState && window.location.search) {
            var urlObj = new URL(window.location.href);
            if (urlObj.searchParams.has('unlock_token')) {
                var tokenFromUrl = urlObj.searchParams.get('unlock_token');
                if (tokenFromUrl) {
                    try {
                        localStorage.setItem('site_unlock_token', tokenFromUrl);
                    } catch(e) {}
                    var isHttps = window.location.protocol === 'https:';
                    document.cookie = "site_unlock_token=" + encodeURIComponent(tokenFromUrl) + "; path=/; max-age=604800; " + (isHttps ? "SameSite=None; Secure" : "SameSite=Lax");
                }
                urlObj.searchParams.delete('unlock_token');
                window.history.replaceState({}, document.title, urlObj.pathname + (urlObj.search || '') + urlObj.hash);
            }
        }
    } catch (e) {}

    // Detect if current page is explicitly the server-rendered 503 Maintenance / Offline page
    function checkIs503Page() {
        if (window.__IS_503_MAINTENANCE_PAGE__ === true) return true;
        if (document.getElementById('stalker-maintenance-portal') || document.querySelector('[data-page="maintenance-503"]')) {
            return true;
        }
        if (document.getElementById('broadcastOverlay') || document.getElementById('maintenanceAudioToggleBtn') || document.getElementById('musicControlBar')) {
            return true;
        }
        var title = (document.title || '').toLowerCase();
        return (title.includes('maintenance') || title.includes('downtime') || title.includes('offline') || title.includes('503'));
    }

    // Detect if current page is the Quantum Lock Screen
    function checkIsLockPage() {
        if (window.__IS_SITE_LOCKED_PAGE__ === true) return true;
        if (document.getElementById('stalker-lock-portal') || document.querySelector('[data-page="site-lock-screen"]')) {
            return true;
        }
        if (document.getElementById('lockCard') || document.getElementById('lockForm')) {
            return true;
        }
        var title = (document.title || '').toLowerCase();
        return (title.includes('restricted access') || title.includes('site locked') || title.includes('quantum lock') || title.includes('locked'));
    }

    var lastReloadTime = 0;
    function safeReload(reason) {
        var now = Date.now();
        // Prevent rapid reload loops (minimum 3s cooldown)
        if (now - lastReloadTime < 3000) return;
        lastReloadTime = now;
        window.location.reload();
    }

    function clearUnlockCredentials() {
        try {
            localStorage.removeItem('site_unlock_token');
            sessionStorage.removeItem('site_unlock_token');
        } catch(e) {}
        try {
            document.cookie = "site_unlock_token=; path=/; max-age=0; SameSite=Lax";
            document.cookie = "site_unlock_token=; path=/; max-age=0; SameSite=None; Secure";
        } catch(e) {}
    }

    function haltAllPageMedia() {
        try {
            var videos = document.querySelectorAll('video, audio');
            for (var i = 0; i < videos.length; i++) {
                try {
                    videos[i].pause();
                    videos[i].removeAttribute('src');
                    videos[i].load();
                } catch(e) {}
            }
            var iframes = document.querySelectorAll('iframe');
            for (var j = 0; j < iframes.length; j++) {
                try {
                    iframes[j].src = 'about:blank';
                } catch(e) {}
            }
        } catch(e) {}
    }

    function renderInstantEnforcementScreen(mode, reasonText) {
        haltAllPageMedia();
        clearUnlockCredentials();
        var existing = document.getElementById('stalker-enforcement-overlay');
        if (existing) return;

        var isBan = mode === 'ban';
        var accent = isBan ? '#f43f5e' : '#f59e0b';
        var badge = isBan ? 'FIREWALL BLACKLIST ENFORCEMENT' : 'SESSION TERMINATED BY ADMINISTRATOR';
        var headline = isBan ? 'ACCESS PERMANENTLY BANNED' : 'YOU HAVE BEEN KICKED';
        var subtext = reasonText || (isBan
            ? 'Your IP address and hardware device signature have been blacklisted by the Citadel Administrator. All active streams and portal sessions have been terminated.'
            : 'Your active streaming session and portal authorization were immediately revoked by the Citadel Administrator.');

        var overlay = document.createElement('div');
        overlay.id = 'stalker-enforcement-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#04060c;color:#ffffff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;font-family:"Space Grotesk",system-ui,sans-serif;user-select:none;';
        overlay.innerHTML =
            '<div style="max-width:480px;width:100%;background:rgba(12,16,28,0.92);border:1px solid ' + accent + '55;border-radius:24px;padding:36px 28px;box-shadow:0 25px 70px rgba(0,0,0,0.9),0 0 40px ' + accent + '25;">' +
                '<div style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:' + accent + '18;border:1px solid ' + accent + '45;color:' + accent + ';font-size:10px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:20px;">' +
                    '<span style="width:8px;height:8px;border-radius:50%;background:' + accent + ';box-shadow:0 0 10px ' + accent + ';"></span>' +
                    badge +
                '</div>' +
                '<h1 style="font-size:28px;font-weight:900;letter-spacing:-0.02em;margin:0 0 12px 0;color:#ffffff;">' + headline + '</h1>' +
                '<p style="font-size:13px;line-height:1.6;color:#94a3b8;margin:0 0 24px 0;">' + subtext + '</p>' +
                (isBan
                    ? '<div style="padding:12px 16px;border-radius:12px;background:rgba(244,63,94,0.1);border:1px solid rgba(244,63,94,0.25);color:#fda4af;font-size:11px;font-family:monospace;">HTTP 403 // CITADEL QUANTUM FIREWALL BLOCK</div>'
                    : '<button onclick="window.location.reload()" style="padding:12px 24px;border-radius:12px;background:' + accent + ';color:#000;font-weight:800;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;border:none;cursor:pointer;">Reconnect / Authenticate</button>'
                ) +
            '</div>';
        document.body.innerHTML = '';
        document.body.appendChild(overlay);
    }

    function detectVisitorTelemetry() {
        var pathname = window.location.pathname || '/';
        var search = window.location.search || '';
        var activeTab = '';
        var streamTitle = '';
        var streamUrl = '';

        try {
            if (typeof window.activeTab === 'string' && window.activeTab) {
                activeTab = window.activeTab;
            } else {
                var activeNav = document.querySelector('.nav-link.active, [data-tab].active, .sidebar-item.active');
                if (activeNav && activeNav.textContent) {
                    activeTab = activeNav.textContent.trim().slice(0, 40);
                }
            }
        } catch(e) {}

        try {
            var params = new URLSearchParams(search);
            if (window.__CURRENT_PLAYING_STREAM__) {
                streamTitle = String(window.__CURRENT_PLAYING_STREAM__);
            } else if (params.get('name') || params.get('title') || params.get('channel')) {
                streamTitle = params.get('name') || params.get('title') || params.get('channel') || '';
            } else if (pathname.includes('play_consumet') || pathname.includes('play.php')) {
                var headerTitle = document.getElementById('channelTitle') || document.getElementById('streamTitle') || document.querySelector('h1, .channel-title, .video-title');
                if (headerTitle && headerTitle.textContent && headerTitle.textContent.trim().length > 1) {
                    streamTitle = headerTitle.textContent.trim();
                } else if (params.get('channel_id') || params.get('id')) {
                    streamTitle = 'Channel #' + (params.get('channel_id') || params.get('id'));
                }
            } else {
                // Check if a video or audio player is actively playing on the page
                var playingTitleEl = document.getElementById('nowPlayingTitleIndex') || document.getElementById('broadcastTitleDisplay') || document.getElementById('miniPlayerTitle');
                var mediaEls = document.querySelectorAll('video, audio');
                var isMediaPlaying = false;
                for (var m = 0; m < mediaEls.length; m++) {
                    if (!mediaEls[m].paused && mediaEls[m].currentTime > 0) {
                        isMediaPlaying = true;
                        if (!streamUrl && mediaEls[m].currentSrc) streamUrl = mediaEls[m].currentSrc;
                        break;
                    }
                }
                if (isMediaPlaying && playingTitleEl && playingTitleEl.textContent) {
                    var t = playingTitleEl.textContent.trim();
                    if (t && t !== 'Quantum Stream Idle') streamTitle = t;
                }
            }

            if (window.__CURRENT_PLAYING_URL__) {
                streamUrl = String(window.__CURRENT_PLAYING_URL__);
            } else if (!streamUrl && (params.get('url') || params.get('id') || params.get('channel_id'))) {
                streamUrl = params.get('url') || params.get('channel_id') || params.get('id') || '';
            }
        } catch(e) {}

        var deviceId = '';
        var deviceLabel = '';
        try {
            deviceId = localStorage.getItem('aetheris_hw_device_id') || '';
            deviceLabel = localStorage.getItem('aetheris_hw_device_label') || '';
        } catch(e) {}

        return {
            page: pathname + search,
            title: (document.title || '').slice(0, 80),
            tab: activeTab.slice(0, 40),
            stream: streamTitle.slice(0, 100),
            streamUrl: streamUrl.slice(0, 160),
            deviceId: deviceId.slice(0, 64),
            deviceLabel: deviceLabel.slice(0, 80)
        };
    }

    var isChecking = false;
    async function checkStatus() {
        if (isChecking) return;
        if (!navigator.onLine) return;
        // Skip background checks if the browser tab is hidden to conserve system resources
        if (document.hidden) return;

        isChecking = true;
        try {
            var is503Page = checkIs503Page();
            var isLockPage = checkIsLockPage();
            var telemetry = detectVisitorTelemetry();
            
            // Exclude ONLY /hari and /hari.html from automatic Maintenance and Site Lock enforcement
            var isHariConsole = window.location.pathname === '/hari' || window.location.pathname === '/hari.html';

            var storedToken = '';
            try {
                storedToken = localStorage.getItem('site_unlock_token') || sessionStorage.getItem('site_unlock_token') || '';
            } catch(e) {}

            var reqHeaders = { 'X-Requested-With': 'XMLHttpRequest' };
            if (storedToken) {
                reqHeaders['X-Site-Unlock-Token'] = storedToken;
            }
            if (telemetry.deviceId) {
                reqHeaders['X-Device-Id'] = telemetry.deviceId;
            }

            var qs = 'page=' + encodeURIComponent(telemetry.page) +
                     '&title=' + encodeURIComponent(telemetry.title) +
                     '&tab=' + encodeURIComponent(telemetry.tab) +
                     '&stream=' + encodeURIComponent(telemetry.stream) +
                     '&streamUrl=' + encodeURIComponent(telemetry.streamUrl) +
                     '&deviceId=' + encodeURIComponent(telemetry.deviceId) +
                     '&deviceLabel=' + encodeURIComponent(telemetry.deviceLabel) +
                     '&t=' + Date.now();

            var res = await fetch('/api/system/public-status?' + qs, {
                cache: 'no-store',
                credentials: 'same-origin',
                headers: reqHeaders
            });
            if (!res.ok) return;
            var data = await res.json();
            if (!data) return;

            // 0. Instant Admin Ban / Kick / Password Revoke Enforcement
            if (!isHariConsole) {
                if (data.banned === true) {
                    renderInstantEnforcementScreen('ban', data.kickReason);
                    return;
                }
                if (data.kicked === true) {
                    renderInstantEnforcementScreen('kick', data.kickReason);
                    return;
                }
                if (data.relocked === true) {
                    haltAllPageMedia();
                    clearUnlockCredentials();
                    if (!isLockPage && !data.maintenance) {
                        safeReload('Password authorization revoked by Admin');
                        return;
                    }
                }
            }

            // 1. Check Maintenance Mode State FIRST (Global Maintenance takes visual priority across ALL pages except /hari.html)
            if (typeof data.maintenance === 'boolean' && !isHariConsole) {
                if (!is503Page && data.maintenance === true) {
                    safeReload('Maintenance Mode activated');
                    return;
                } else if (is503Page && data.maintenance === false) {
                    safeReload('Maintenance Mode deactivated');
                    return;
                }
            }

            // 2. Check Site Lock Mode State (When not in Maintenance Mode, enforce Quantum Lock Screen)
            if (typeof data.locked === 'boolean' && !data.maintenance && !isHariConsole) {
                if (!isLockPage && data.locked === true) {
                    clearUnlockCredentials();
                    safeReload('Lock Mode activated');
                    return;
                } else if (isLockPage && data.locked === false) {
                    safeReload('Lock Mode deactivated or unlocked');
                    return;
                }
            }

            // 3. Live Broadcast Video Dynamic Update (No Reload Required)
            if (data.videoBroadcast && typeof window.applyLiveVideoBroadcastUpdate === 'function') {
                window.applyLiveVideoBroadcastUpdate(data.videoBroadcast);
            }

            // 4. Maintenance Schedule Banner & Countdown Update
            if (data.maintenanceSchedule && typeof window.updateMaintenanceScheduleBanner === 'function') {
                window.updateMaintenanceScheduleBanner(data.maintenanceSchedule);
            }
        } catch(e) {
        } finally {
            isChecking = false;
        }
    }

    // Adaptive, lightweight status polling: 2 seconds when tab is active for instant global state reflection
    var pollTimer = setInterval(checkStatus, 2000);
    setTimeout(checkStatus, 400);

    // Instant status check on tab visibility change or window focus
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            checkStatus();
        }
    });
    window.addEventListener('focus', checkStatus);
})();
