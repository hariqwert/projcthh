/**
 * Stalker Pro 2.0 - 10-Foot Spatial TV Remote & D-Pad Navigation Engine
 * Full support for Fire TV, Android TV, Google TV, Samsung Tizen, LG webOS, Apple TV, & PC Gamepads
 */
(function() {
    'use strict';

    // 1. Automatic Smart TV & Leanback User-Agent Detection
    function detectSmartTv() {
        const ua = navigator.userAgent || '';
        // Only activate TV mode if genuine TV user-agent or explicitly requested in URL query
        return /Android.*TV|SmartTV|Tizen|Web0S|webOS|AppleTV|Apple TV|FireTV|AFT[BMS]|Roku|CrKey|HbbTV|POV_TV|GoogleTV|Large Screen/i.test(ua) ||
               window.location.search.includes('mode=tv') ||
               window.location.search.includes('tv=1');
    }

    const isInitialTvMode = detectSmartTv();

    // 2. Clean, Elegant TV Focus Styles (Zero Harsh Red Boxes)
    const styleEl = document.createElement('style');
    styleEl.id = 'tv-navigation-styles';
    styleEl.innerHTML = `
        /* 10-Foot TV Mode Global Enhancements */
        body.tv-mode {
            cursor: default;
            user-select: none;
            -webkit-user-select: none;
        }

        body.tv-mode .tv-cursor-hide {
            cursor: none !important;
        }

        /* TV Mode Subtle Focus Ring - Clean frosted glow, NO harsh red boxes */
        body.tv-mode .tv-focus-active,
        body.tv-mode .movie-card:focus-visible,
        body.tv-mode .channel-card:focus-visible,
        body.tv-mode .event-card:focus-visible {
            outline: none !important;
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.45), 0 8px 24px rgba(0, 0, 0, 0.8) !important;
            transform: scale(1.03) !important;
            z-index: 9999 !important;
            transition: transform 0.16s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.16s ease !important;
        }

        /* Prevent brand logos, header buttons, and regular links from getting red/harsh focus boxes */
        header a, header button, .brand-logo, [href="/"], [href="/hero.html"], [href*="index"] {
            outline: none !important;
            box-shadow: none !important;
        }

        /* Universal Clean Outlines: Eliminate red/blue focus rings across all platforms */
        *, *:focus, *:focus-visible, a:focus, a:focus-visible, button:focus, button:focus-visible, input:focus, input:focus-visible {
            outline: none !important;
            -webkit-tap-highlight-color: transparent !important;
        }
    `;
    document.head.appendChild(styleEl);

    // 3. Focusable Elements Query
    const FOCUSABLE_SELECTOR = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex="0"]:not([disabled])',
        '[onclick]',
        '.ott-btn',
        '.movie-card',
        '.channel-card',
        '.event-card',
        '.tab-btn',
        '.server-btn'
    ].join(', ');

    function getFocusableElements() {
        const all = Array.from(document.querySelectorAll(FOCUSABLE_SELECTOR));
        return all.filter(el => {
            if (el.disabled || el.getAttribute('aria-hidden') === 'true') return false;
            // Exclude elements inside hidden parents or modals
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
            const rect = el.getBoundingClientRect();
            return rect.width > 2 && rect.height > 2 && (rect.bottom >= 0 && rect.top <= window.innerHeight);
        });
    }

    // 4. Spatial Angle & Distance Calculation (Euclidean + Directional Cone)
    function calculateSpatialDistance(currentRect, targetRect, direction) {
        const cCenter = {
            x: currentRect.left + currentRect.width / 2,
            y: currentRect.top + currentRect.height / 2
        };
        const tCenter = {
            x: targetRect.left + targetRect.width / 2,
            y: targetRect.top + targetRect.height / 2
        };

        const dx = tCenter.x - cCenter.x;
        const dy = tCenter.y - cCenter.y;

        let primaryDist = 0;
        let secondaryDist = 0;

        switch (direction) {
            case 'left':
                if (dx >= -4) return Infinity; // Target must be to the left
                primaryDist = Math.abs(dx);
                secondaryDist = Math.abs(dy);
                break;
            case 'right':
                if (dx <= 4) return Infinity; // Target must be to the right
                primaryDist = Math.abs(dx);
                secondaryDist = Math.abs(dy);
                break;
            case 'up':
                if (dy >= -4) return Infinity; // Target must be above
                primaryDist = Math.abs(dy);
                secondaryDist = Math.abs(dx);
                break;
            case 'down':
                if (dy <= 4) return Infinity; // Target must be below
                primaryDist = Math.abs(dy);
                secondaryDist = Math.abs(dx);
                break;
            default:
                return Infinity;
        }

        // Weight orthogonal axis with 3.5x penalty to maintain strict row/column alignment
        return primaryDist + (secondaryDist * 3.5);
    }

    function navigateSpatial(direction) {
        const focusable = getFocusableElements();
        if (!focusable.length) return;

        let activeEl = document.activeElement;

        // If no element or body is focused, focus the best starting item (first visible poster or button)
        if (!activeEl || activeEl === document.body || !document.body.contains(activeEl)) {
            const initialTarget = focusable.find(el => el.classList.contains('movie-card') || el.classList.contains('channel-card')) || focusable[0];
            if (initialTarget) {
                focusElement(initialTarget);
            }
            return;
        }

        const currentRect = activeEl.getBoundingClientRect();
        let closest = null;
        let minScore = Infinity;

        for (let i = 0; i < focusable.length; i++) {
            const target = focusable[i];
            if (target === activeEl || target.contains(activeEl) || activeEl.contains(target)) continue;

            const targetRect = target.getBoundingClientRect();
            const score = calculateSpatialDistance(currentRect, targetRect, direction);

            if (score < minScore) {
                minScore = score;
                closest = target;
            }
        }

        if (closest) {
            focusElement(closest);
        } else {
            // Edge fallback: if moving down/up and no item in immediate cone, scroll window slightly
            if (direction === 'down') window.scrollBy({ top: 280, behavior: 'smooth' });
            else if (direction === 'up') window.scrollBy({ top: -280, behavior: 'smooth' });
        }
    }

    function focusElement(el) {
        if (!el) return;
        el.focus({ preventScroll: true });
        el.classList.add('tv-focus-active');

        // Clean up previous active styles
        document.querySelectorAll('.tv-focus-active').forEach(item => {
            if (item !== el) item.classList.remove('tv-focus-active');
        });

        // Ensure element is smoothly centered in viewport (both vertically and in horizontal shelves)
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    // 5. Remote Control & Keyboard Event Listener
    window.addEventListener('keydown', function(e) {
        const key = e.key;
        const code = e.keyCode;
        const activeTag = (document.activeElement?.tagName || '').toLowerCase();
        const isTyping = activeTag === 'input' || activeTag === 'textarea';

        // 1. Android TV / Fire TV Remote DPAD Keycodes:
        // DPAD_UP: 19, DPAD_DOWN: 20, DPAD_LEFT: 21, DPAD_RIGHT: 22, DPAD_CENTER: 23, ENTER: 13, 66
        // BACK: 4, 8, 27 (Escape)
        // MEDIA KEYS: PLAY_PAUSE: 179, PLAY: 250, PAUSE: 19, FAST_FWD: 228, REWIND: 227

        // Special handling for search input: Down arrow moves into search results
        if (isTyping && document.activeElement?.id === 'searchInput') {
            if (key === 'ArrowDown' || code === 20) {
                e.preventDefault();
                document.activeElement.blur();
                const firstResult = document.querySelector('#searchResults button, #searchResults .movie-card, #searchResults .channel-card, #searchResults [tabindex="0"]');
                if (firstResult) {
                    focusElement(firstResult);
                    return;
                }
            }
        }

        if (key === 'ArrowUp' || code === 19) {
            if (isTyping) {
                document.activeElement.blur();
            }
            e.preventDefault();
            navigateSpatial('up');
            return;
        }

        if (key === 'ArrowDown' || code === 20) {
            if (isTyping) {
                document.activeElement.blur();
            }
            e.preventDefault();
            navigateSpatial('down');
            return;
        }

        if (key === 'ArrowLeft' || code === 21) {
            if (isTyping) return; // Allow text editing inside input
            e.preventDefault();
            navigateSpatial('left');
            return;
        }

        if (key === 'ArrowRight' || code === 22) {
            if (isTyping) return; // Allow text editing inside input
            e.preventDefault();
            navigateSpatial('right');
            return;
        }

        // Center / OK / Select Key
        if (key === 'Enter' || code === 13 || code === 23 || code === 66) {
            if (!isTyping && document.activeElement && document.activeElement !== document.body) {
                document.activeElement.click();
            }
            return;
        }

        // Dedicated Media Play/Pause Remote Controls
        if (code === 179 || code === 85 || code === 250) {
            const vid = document.querySelector('video');
            if (vid) {
                e.preventDefault();
                if (vid.paused) vid.play();
                else vid.pause();
                return;
            }
        }

        if (code === 228) { // Fast Forward
            const vid = document.querySelector('video');
            if (vid) {
                e.preventDefault();
                vid.currentTime += 15;
                return;
            }
        }

        if (code === 227) { // Rewind
            const vid = document.querySelector('video');
            if (vid) {
                e.preventDefault();
                vid.currentTime -= 15;
                return;
            }
        }

        // Back Key (Escape / Backspace outside input / Android Back 4)
        if (key === 'Escape' || code === 27 || code === 4 || (key === 'Backspace' && !isTyping)) {
            // Close active modal or search palette
            const closeBtn = document.querySelector('.close-modal-btn, [onclick*="closeModal"], [onclick*="closeSearchPalette"], [onclick*="closeDetails"]');
            if (closeBtn && window.getComputedStyle(closeBtn.closest('#searchPalette, .modal, [id*="Modal"]') || closeBtn).display !== 'none') {
                e.preventDefault();
                closeBtn.click();
                return;
            }
            // If in player, exit fullscreen or go back
            if (window.location.pathname.includes('play')) {
                if (document.fullscreenElement) {
                    e.preventDefault();
                    document.exitFullscreen().catch(() => {});
                    return;
                }
                if (window.handleGoBack) {
                    e.preventDefault();
                    window.handleGoBack();
                    return;
                }
            }
        }
    }, { capture: false, passive: false });

    // 6. TV Mode State & Global Toggle Function (Zero UI Clutter)
    window.toggleTvMode = function(forceState) {
        const isTv = (typeof forceState === 'boolean') ? forceState : !document.body.classList.contains('tv-mode');
        if (isTv) {
            document.body.classList.add('tv-mode');
            if (typeof showToast === 'function') {
                showToast('📺 10-Foot TV Mode Active — Remote D-Pad Ready', 'info');
            }
        } else {
            document.body.classList.remove('tv-mode');
            document.querySelectorAll('.tv-focus-active').forEach(item => item.classList.remove('tv-focus-active'));
            if (typeof showToast === 'function') {
                showToast('💻 Desktop Mode Restored', 'info');
            }
        }
    };

    // 7. Mouse & Pointer Cleaners - Clear active focus rings on mouse/touch interaction
    function clearTvFocus() {
        document.querySelectorAll('.tv-focus-active').forEach(item => {
            item.classList.remove('tv-focus-active');
        });
    }
    window.addEventListener('mousemove', clearTvFocus, { passive: true });
    window.addEventListener('pointerdown', clearTvFocus, { passive: true });
    window.addEventListener('touchstart', clearTvFocus, { passive: true });

    // 8. Auto-initialize on DOM Ready (Zero auto-focus on page load)
    function init() {
        if (isInitialTvMode) {
            document.body.classList.add('tv-mode');
        } else {
            document.body.classList.remove('tv-mode');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
