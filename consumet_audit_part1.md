# Aetheris Cinema (`consumet.html`) Architecture & Code Audit — Partition 1 (Lines 1 to 3,600)

**Target File:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html`  
**Scope:** Lines 1 to 3,600  
**Audit Date:** 2026-11-08  
**Auditor:** Antigravity AI Code Inspection Engine  

---

## 1. Executive Summary & Architecture Overview

Partition 1 of `consumet.html` establishes the core foundational infrastructure of the **Aetheris Cinema Pro 2.0 (Stalker Pro 2.0)** client application. This partition encompasses:
1. **Critical System Shims & Sandboxing**: Resilient cross-origin storage shims for sandboxed iframes and web previews.
2. **Client Input Shield & Security**: Shortcut and DevTools interception, right-click context menu suppression, and admin exemption bypasses.
3. **PWA & Standalone Controller**: Progressive Web App lifecycle handlers, `beforeinstallprompt` capture, custom installation modals, and standalone display mode adaptation.
4. **CSS Architecture & Design Systems**: Highly structured multi-theme styling comprising:
   - Apple TV+ & Netflix Modern Cinema Design System
   - Midnight Cinema Obsidian Slate Theme
   - Aurora Velvet & visionOS Theme with specular shimmer physics
   - Black Pinkish Velvet Active Theme
   - 10-Foot UI / TV spatial navigation styling
   - Ultra Mobile Responsive Cinema Landscape mode (`@media (max-height: 520px)`)
5. **DOM Layout & Master View Structure**: Complete semantic markup for the responsive floating capsule navigation bar, mobile dock, slide-up all-sections sheet, and seven primary view sections:
   - View 1: Home (`#view-home`) with 20+ specialized shelves including 10 balanced Indian/Hollywood parity subsections and AI recommendation shelf.
   - View 2: Movies (`#view-movies`) with genre/year filters and 10 paired Indian/Hollywood shelves.
   - View 3: TV Shows (`#view-tv`) with 10 paired Indian/Hollywood shelves.
   - View 4: Sports Hub (`#view-sports`) with live match arena, IPL 2026 replays, TimStreams feeds, and network carousels.
   - View 4.2: Live TV (`#view-livetv`) with 1,324 channels, source switcher, category filter pills, and channel grid.
   - View 4.5: Live Now (`#view-livenow`) featuring the Glacier Sapphire OTT theme and match telemetry console.
   - View 5: Watchlist (`#view-watchlist`).
   - View 8: Electronic Program Guide (`#view-epg`) with Star Sports & Sony Sports timelines.
   - View 6: Anime Otaku Arena (`#view-anime`) with weekly broadcast radar and genre realms.
   - View 7: Search Results (`#view-search`).
6. **Modals & Overlays**: Markup for EPG program/channel modals, Apple TV+ Media Details page, Actor/Creator Studio profiles, Standalone Fullscreen Theater Player with multi-server embed selectors, Sports Match Center oval modal, Fullscreen OTT Search Palette (`#searchPalette`), and Toast notifications.
7. **Core JavaScript Foundation**: Batched Lucide icon rendering engine, HTML sanitization, TMDB API caching layer with memory/session storage fallbacks, speculative media prefetching, TMDB PNG logo resolver, and multi-tier official trailer scoring algorithm.

---

## 2. System Shims & Security Gatekeeping

### 2.1 Safe Storage Shim (Lines 7–40)
Protects against unhandled `DOMException` errors thrown when accessing `localStorage` or `sessionStorage` inside sandboxed iframes, third-party embeds, or private browsing modes without storage permissions.

```javascript
(function() {
    var _memLocal = {};
    var _memSession = {};
    window._safeLocalGet = function(k, defVal) {
        try {
            var v = window.localStorage.getItem(k);
            return v !== null ? v : (k in _memLocal ? _memLocal[k] : (defVal !== undefined ? defVal : null));
        } catch(e) {
            return k in _memLocal ? _memLocal[k] : (defVal !== undefined ? defVal : null);
        }
    };
    window._safeLocalSet = function(k, v) {
        _memLocal[k] = String(v);
        try { window.localStorage.setItem(k, v); } catch(e) {}
    };
    window._safeLocalRemove = function(k) {
        delete _memLocal[k];
        try { window.localStorage.removeItem(k); } catch(e) {}
    };
    window._safeSessionGet = function(k, defVal) {
        try {
            var v = window.sessionStorage.getItem(k);
            return v !== null ? v : (k in _memSession ? _memSession[k] : (defVal !== undefined ? defVal : null));
        } catch(e) {
            return k in _memSession ? _memSession[k] : (defVal !== undefined ? defVal : null);
        }
    };
    window._safeSessionSet = function(k, v) {
        _memSession[k] = String(v);
        try { window.sessionStorage.setItem(k, v); } catch(e) {}
    };
})();
```

**Key Features:**
- Dual-tier storage: writes synchronously to in-memory dictionary `_memLocal` / `_memSession` first, then attempts persistent storage write inside `try/catch`.
- Fallback resolution: if persistent read returns `null` or throws, retrieves in-memory value; if missing, returns provided `defVal`.
- Values coerced to `String(v)` mirroring browser Web Storage standards.

---

### 2.2 Client Input Shield & DevTools Blocker (Lines 45–81)
Suppresses keyboard shortcuts for DevTools inspection and disables context menus on desktop to preserve an immersive kiosk/cinema experience, while gracefully exempting mobile touch devices and authenticated administrators.

```javascript
(function() {
    'use strict';
    var isTouchOrTablet = (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet|Mobile|Silk|Kindle/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 1) ||
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
    );
    if (isTouchOrTablet) return;

    function isExempt() {
        try {
            return document.cookie.indexOf('admin_auth=') !== -1 || !!localStorage.getItem('admin_token');
        } catch(e) { return false; }
    }
    window.addEventListener('keydown', function(e) {
        if (isExempt()) return;
        var k = e.key ? e.key.toUpperCase() : '';
        var c = e.keyCode || e.which;
        if (k === 'F12' || c === 123) { e.preventDefault(); return false; }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === 'I' || c === 73 || k === 'J' || c === 74 || k === 'C' || c === 67)) {
            e.preventDefault(); return false;
        }
        if ((e.ctrlKey || e.metaKey) && (k === 'U' || c === 85)) {
            e.preventDefault(); return false;
        }
    }, true);
    document.addEventListener('contextmenu', function(e) {
        if (isExempt()) return;
        var t = e.target ? e.target.tagName : '';
        if (t === 'INPUT' || t === 'TEXTAREA') return;
        e.preventDefault();
        return false;
    }, true);
})();
```

**Blocked Actions:**
- `F12` (Developer Tools)
- `Ctrl+Shift+I` / `Cmd+Opt+I` (Inspect Elements)
- `Ctrl+Shift+J` / `Cmd+Opt+J` (Console)
- `Ctrl+Shift+C` / `Cmd+Opt+C` (Inspect Element Cursor)
- `Ctrl+U` / `Cmd+U` (View Source)
- Right-click context menu (exempts `<input>` and `<textarea>` elements).

**Exemption Matrix:**
- Touch/mobile devices (bypassed at entry).
- Cookie `admin_auth=` present.
- `localStorage.getItem('admin_token')` truthy.

---

## 3. PWA Registration, Lifecycle & Standalone Mode (Lines 116–175)

```javascript
window.deferredPwaPrompt = null;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(reg) {
            console.log('[PWA] Service Worker active:', reg.scope);
        }).catch(function(err) {
            console.debug('[PWA] Notice:', err);
        });
    });
}

// Capture PWA Install Prompt
window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    window.deferredPwaPrompt = e;
    const btn = document.getElementById('pwaInstallHeaderBtn');
    if (btn) btn.classList.remove('hidden');
});

window.addEventListener('appinstalled', function() {
    window.deferredPwaPrompt = null;
    const btn = document.getElementById('pwaInstallHeaderBtn');
    if (btn) btn.classList.add('hidden');
    if (typeof showToast === 'function') {
        showToast('🎉 Aetheris Installed as Native App!', 'info');
    }
});

// Trigger One-Click Install Handler
window.triggerPwaInstall = async function() {
    if (window.deferredPwaPrompt) {
        window.deferredPwaPrompt.prompt();
        const choice = await window.deferredPwaPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
            const btn = document.getElementById('pwaInstallHeaderBtn');
            if (btn) btn.classList.add('hidden');
            if (typeof showToast === 'function') showToast('🚀 Installing Aetheris App...', 'info');
        }
        window.deferredPwaPrompt = null;
    } else {
        const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIos) {
            if (typeof showToast === 'function') {
                showToast('📱 Tap the Share icon (⎋) in Safari and tap "Add to Home Screen" (+)', 'info');
            }
        } else {
            if (typeof showToast === 'function') {
                showToast('📲 To install: Open browser menu (⋮) and tap "Install App" or "Add to Home Screen"', 'info');
            }
        }
    }
};

// Check if running in standalone PWA mode
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    document.documentElement.classList.add('pwa-standalone');
}
```

**PWA Details:**
- Service worker scope registered to `/sw.js`.
- Responsive manifest linked to `/manifest.json`.
- Status bar theme: `theme-color="#030712"`, `apple-mobile-web-app-status-bar-style="black-translucent"`.
- Standalone class `pwa-standalone` applied to `<html>` root for targeted CSS overrides.

---

## 4. CSS Architecture, Tokens, Design Systems & Themes (Lines 180–724)

### 4.1 Typography & Base Resets
- Font Stack: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Plus Jakarta Sans", sans-serif`.
- Tap Highlight: `-webkit-tap-highlight-color: transparent !important`.
- Text Smoothing: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale`.
- Body: `background-color: #060105 !important; color: #fce7f3 !important; overflow-x: hidden`.

### 4.2 Design System Tokens & Color Palettes

| Theme Name | Background | Surface / Cards | Accent Color | Border / Hover Tokens |
|---|---|---|---|---|
| **Apple TV+ & Netflix Modern Cinema** | `#000000` | `#0b0b0f` / `#121217` | `#e50914` (Netflix Red) | Border: `rgba(255,255,255,0.08)`<br>Hover: `rgba(255,255,255,0.24)` |
| **Midnight Cinema Obsidian Slate** | `#06080f` | `#0c101a` / `#111624` | `#e50914` | Border: `rgba(255,255,255,0.085)`<br>Hover: `rgba(255,255,255,0.28)` |
| **Aurora Velvet & visionOS** | `#070510` | `#0e0b1c` / `#130f26` | `#e11d48` (Rose)<br>`#f59e0b` (Gold) | Border: `rgba(255,255,255,0.11)`<br>Hover: `rgba(251,191,36,0.45)` |
| **Black Pinkish Velvet (Active)** | `#080106` | `#12030d` / `#180512` | `#f43f5e` (Rose-Pink) | Border: `rgba(244,63,94,0.18)`<br>Hover: `rgba(244,63,94,0.48)` |

### 4.3 Keyframe Animations
- `@keyframes atvFadeUp`: Opacity $0 \to 1$, $Y$-translation $14\text{px} \to 0$, scale $0.99 \to 1$.
- `@keyframes atvHeroReveal`: Opacity $0 \to 1$, scale $1.03 \to 1$.
- `@keyframes atvGridExpand`: Opacity $0 \to 1$, $Y$-translation $-6\text{px} \to 0$.
- `@keyframes fluidSectionEnter`: Section entry animation ($18\text{px} \to 0$, $0.48\text{s}$).
- `@keyframes fluidPulseGlow`: Glow cycle between scale 1.0 and 1.06.
- `@keyframes atvSpecularSweep`: Shimmer sweep $X$-translation from $-130\%$ to $220\%$ skewed $-22^\circ$.
- `@keyframes atvCardFloatIn`: Card float-in ($22\text{px} \to 0$, scale $0.96 \to 1$).
- `@keyframes atvGlowPulse`: Dual-glow pulse switching between Rose (`#e11d48`) and Amber (`#f59e0b`).

### 4.4 Hardware Acceleration & Render Performance
```css
#jtvChannelGrid > div,
#sportsCatalogGrid > div,
#liveNowEventsGrid > div {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    content-visibility: auto;
    contain-intrinsic-size: auto 240px;
}
```
Enables modern Chromium `content-visibility: auto` to skip offscreen layout calculation for long virtualized channel lists (1,324+ items).

### 4.5 Responsive Breakpoints & Mode Rules
1. **Mobile Touch Scrolling (`@media (max-width: 768px)`)**:
   - Scroller paddles (`.scroller-btn`) hidden.
   - Main content padded with `env(safe-area-inset-bottom)`.
   - Shelves use `scroll-snap-type: x proximity` and `overscroll-behavior-x: contain`.
   - Hero slider container constrained to `380px` height.
2. **Mobile Screen Width (`@media (max-width: 640px)`)**:
   - Hero sliders (`#heroSliderContainer`, `#animeHeroSliderContainer`, `#sportsHeroSliderContainer`) set to `390px`.
   - Top desktop header set to `display: none !important`.
   - Category headers scaled to `1.125rem`.
3. **Ultra Mobile Cinema Landscape Mode (`@media (max-height: 520px) and (orientation: landscape)`)**:
   - Overrides `#view-player` to `overflow: hidden !important; background-color: #000000 !important`.
   - Hides top toolbar and episode drawers.
   - Expands `#cinemaPlayerWrapper` to `100vw` $\times$ `100vh` edge-to-edge.

---

## 5. Comprehensive DOM Layout & View Hierarchies (Lines 726–3262)

### 5.1 Global Top & Mobile Navigation
- **Ambient Ambient Vignette**: Fixed gradient mesh backdrop (`rgba(244,63,94,0.14)`).
- **Mobile Floating Controls (z-50)**:
  - Top-Left: Mobile Back button (`handleMobileGoBack()`).
  - Top-Right: Mobile Search button (`openSearchPalette()`).
- **Desktop Floating Header (`<header class="hidden md:block ...">`)**:
  - Brand Mark: AETHERIS PRO 2.0 with icon linking to `/hero.html`.
  - Navigation Capsule:
    - Home (`switchTab('home')`)
    - Movies (`switchTab('movies')`)
    - Series (`switchTab('tv')`)
    - Anime (`switchTab('anime')`)
    - Live Now (`switchTab('livenow')`) with pulsing indicator
    - Sports (`switchTab('sports')`)
    - Live TV (`switchTab('livetv')`)
    - Watchlist (`switchTab('watchlist')`)
    - Guide / EPG (`switchTab('epg')`)
    - Music (`/music.html`)
  - Utility Controls:
    - AI Vault (`restoreAetherisAI(true)`)
    - Search (`openSearchPalette()`)
    - Watch Party (`togglePartyModal(true)`)
    - PWA Install Button (`pwaInstallHeaderBtn`)
    - Browse All Drawer (`toggleMobileSectionsDrawer(true)`)
    - Hero Portal Link (`#btn-header-hero-back` to `/hero.html`)
- **Mobile Bottom Navigation Dock (`#mobileBottomDock`)**:
  - `mob-tab-back`: Back button (`handleMobileGoBack()`)
  - `mob-tab-home`: Home (`switchTab('home')`)
  - `mob-tab-anime`: Anime (`switchTab('anime')`)
  - `mob-tab-livetv`: Live TV (`switchTab('livetv')`)
  - `mob-tab-livenow`: Live Now (`switchTab('livenow')`) with flame badge
  - `mob-tab-more`: All Sections drawer (`toggleMobileSectionsDrawer(true)`) with AI pill tag.
- **Mobile Sections Sheet (`#mobSectionsDrawer`)**:
  - Slide-up bottom sheet housing grid of section cards plus prominent full-width **Aetheris AI Vault** card.

---

### 5.2 View 1: Home View (`#view-home`)
1. **Spotlight Billboard Slider**: `#heroSliderContainer` (Height: 500px–680px).
2. **Watch History / Resume Queue**: `#watchHistoryContainer` & `#watchHistoryShelf` with `clearWatchHistory()`.
3. **Top 10 Today**: `#top10Shelf`.
4. **Top 10 in India**: `#top10IndiaShelf`.
5. **Continue Watching**: `#continueWatchShelf` & `#continueWatchGrid`.
6. **AI Personalized Shelf**: `#aiRecommendedContainer` & `#aiRecommendedGrid`:
   - Match rate indicator: `#aiTasteMatchBadge` (e.g., 98% Match Rate).
   - Taste profile chip: `#aiTasteProfileChip`.
   - Filter pills: All, Movies, Series, Anime, Live Sports (`window.filterAiRecommendations(type)`).
   - Re-tune button: `window.refreshAiRecommendations(true)`.
7. **Editorial Shelves**:
   - `#trendingMoviesShelf` (Trending Movies)
   - `#trendingSeriesShelf` (Popular TV Shows)
   - `#newReleaseIndiaShelf` (New Releases in India)
   - `#bollywoodShelf` (Bollywood Blockbusters)
   - `#malayalamShelf` (Mollywood Masterpieces)
   - `#tamilShelf` (Kollywood Hits)
   - `#teluguShelf` (Tollywood Blockbusters)
   - `#kannadaShelf` (Sandalwood Cinema)
   - `#hindiShelf` (Latest Hindi Cinema)
   - `#hwActionShelf` (Hollywood Action)
   - `#hwScifiShelf` (Hollywood Sci-Fi)
   - `#topRatedShelf` (Top Rated Masterpieces)
   - `#animeShelf` (Trending Anime & Asian Drama)
   - `#hollywoodShelf` (Hollywood Premieres)
   - Genre vaults: `#scifiShelf`, `#koreanShelf` (K-Drama), `#comedyShelf`, `#horrorShelf`, `#documentaryShelf`, `#classicShelf`, `#kidsShelf`, `#awardShelf`.
8. **IMDb Direct Fetcher Banner**:
   - Input: `#imdbFetcherInput`
   - Play trigger: `fetchIMDbItem()`.
9. **10 Master Balanced Indian & Hollywood Equality Subsections**:
   - Subsection 1 (IN): `#homeIndianBlockbustersShelf` (Pan-India 4K: RRR, KGF, Kalki, Salaar, Jawan).
   - Subsection 2 (US): `#homeHollywoodBlockbustersShelf` (Hollywood Premieres: Oppenheimer, Dune, Avatar, Top Gun).
   - Subsection 3 (IN): `#homeIndianCrimeSeriesShelf` (Desi Crime: Mirzapur, Sacred Games, Paatal Lok, Farzi).
   - Subsection 4 (US): `#homeGlobalPrestigeSeriesShelf` (Prestige HBO: House of the Dragon, The Last of Us, Succession).
   - Subsection 5 (IN): `#homeSouthActionVaultShelf` (South Cinema High-Octane Action).
   - Subsection 6 (US): `#marvelDcShelf` (Marvel & DC Superhero Multiverse Showcase with MCU Phase 5, Gotham City, and Spider-Verse quick triggers).
   - Subsection 7 (IN): `#homeBollywoodClassicsShelf` (Bollywood Gold: 3 Idiots, DDLJ, Veer-Zaara, ZNMD, Sholay).
   - Subsection 8 (US): `#homeHollywoodScifiShelf` (Mind-Bending Sci-Fi: Interstellar, Blade Runner 2049, Tenet, Inception).
   - Subsection 9 (IN): `#homeIndianAcclaimedShelf` (National Award Gems: 12th Fail, Sardar Udham, Tumbbad, Andhadhun).
   - Subsection 10 (US): `#homeOscarLegendsShelf` (Academy Awards: The Godfather, Titanic, Parasite, Shawshank).

---

### 5.3 View 2: Movies View (`#view-movies`)
- Filters: `#movies-genre` (Action: 28, Comedy: 35, Drama: 18, Sci-Fi: 878, Thriller: 53) and `#movies-year` (2024, 2023, 2022) with `applyFilters('movies')`.
- Home Layout (`#moviesHomeLayout`) containing 10 paired Indian/Hollywood shelves:
  1. `#moviePanIndiaShelf` (IN • Pan-India Theatrical Titans)
  2. `#movieHwActionShelf` (US • Action & Adrenaline Thrillers)
  3. `#movieSouthCinemaShelf` (IN • South Indian Superstars)
  4. `#movieHwScifiShelf` (US • Sci-Fi, Cyberpunk & Futuristic Epics)
  5. `#movieIndianCrimeShelf` (IN • Murder Mystery, Crime & Noir)
  6. `#movieHwCrimeShelf` (US • Heist, Mobster & Espionage)
  7. `#movieIndianComedyShelf` (IN • Desi Comedy & Family Masala)
  8. `#movieHwHorrorShelf` (US • Supernatural & Psychological Suspense)
  9. `#movieIndianHistoricalShelf` (IN • Historical Epics & Patriotic Legends)
  10. `#movieHwAcclaimedShelf` (US • Oscar Winners & Cannes Masterpieces)
- Filtered Grid Layout: `#moviesCatalogLayout` & `#moviesGrid`.

---

### 5.4 View 3: TV Shows View (`#view-tv`)
- Filters: `#tv-genre` (Action & Adventure: 10759, Drama: 18, Comedy: 35, Crime: 80, Sci-Fi & Fantasy: 10765) and `#tv-year` with `applyFilters('tv')`.
- Home Layout (`#tvHomeLayout`) containing 10 paired Indian/Hollywood shelves:
  1. `#tvIndianTopSeriesShelf` (IN • Top Indian Web Series & OTT Originals)
  2. `#tvHwPrestigeDramaShelf` (US • HBO & American Drama Heavyweights)
  3. `#tvIndianCrimeShelf` (IN • Desi Crime Underworld & Police Procedurals)
  4. `#tvHwScifiShelf` (US • Sci-Fi, Dystopian & Mystery Series)
  5. `#tvIndianComedyShelf` (IN • TVF & Desi Satire: Panchayat, Gullak)
  6. `#tvHwEspionageShelf` (US • Global Espionage & Cartel Thrillers)
  7. `#tvIndianMythologyShelf` (IN • Mythological & Historical Drama)
  8. `#tvHwDarkFantasyShelf` (US • Dark Fantasy & Post-Apocalyptic)
  9. `#tvIndianRomanceShelf` (IN • Youth, Campus & Romantic Dramas)
  10. `#tvHwSitcomShelf` (US • Emmy-Winning Sitcoms & Cult Comedy)
- Filtered Grid Layout: `#tvCatalogLayout` & `#tvGrid`.

---

### 5.5 View 4: Sports Hub (`#view-sports`)
- Header Controls:
  - Expand/Collapse All Subsections button: `#sportsExpandAllBtn` (`toggleAllSportsSubsections()`).
  - Search Input: `#sportsSearch` (`debounceSportsSearch()`).
  - Voice Search Button: `#sportsVoiceSearchBtn` (`toggleSportsVoiceSearch()`).
- Hero Slider: `#sportsHeroSliderContainer`.
- Primary Feeds & Event Shelves:
  - Live Match Arena: `#liveEventsShelfContainer` & `#liveEventsShelf`.
  - IPL 2026 Match Replays: `#iplReplaysShelfContainer` & `#iplReplaysShelf` (Filters: `ALL`, `ENGLISH`, `HINDI` via `filterIplReplays`).
  - Multi-Container Showcase Studio: `#sportsShowcaseContainersRoot`.
  - Saved Channels: `#sportsSavedShelfContainer` & `#sportsSavedShelf`.
  - Live Now & Upcoming Fixtures: `#sportsStreamicLiveShelfContainer` & `#sportsStreamicLiveShelf` (Streamic + Sony Sports EPG).
  - TimStreams Live Match Events: `#sportsTimStreamsEventsShelfContainer` & `#sportsTimStreamsEventsShelf`.
  - TimStreams 24/7 Live Channels: `#sportsProxyStreamsShelfContainer` & `#sportsProxyStreamsShelf` (174+ continuous feeds).
  - Admin Live Events: `#sportsLiveEventsShelfContainer` & `#sportsLiveEventsShelf`.
  - All Live Sports Channels: `#sportsAllChannelsShelf`.
  - Asian Games Container: `#sportsAsianGamesContainer` & `#sportsAsianGamesShelf`.
  - Dedicated Network Shelves: Sky Sports (`#sportsSkyShelf`), Football (`#sportsFootballShelf`), Cricket (`#sportsCricketShelf`), F1 & Motorsports (`#sportsF1Shelf`), US Sports / ESPN (`#sportsUSShelf`), Sony Network (`#sportsSonyShelf`), HBO (`#sportsHBOShelf`), 4K Ultra HD (`#sports4kShelf`), Malayalam News (`#sportsMalayalamNewsShelf`), Malayalam Entertainment (`#sportsMalayalamEntShelf`), Malayalam Movies (`#sportsMalayalamMoviesShelf`), Kids & Cartoons (`#sportsKidsShelf`).
- Search & Filter Catalog Layout:
  - Filter pills: All, Added Channels, Asian Games, Proxy Streams, Saved, Cricket, Football, Sky Sports, F1, US Sports, Sony, HBO, Kids (`filterSportsCategory()`).
  - Match search results: `#sportsSearchEventsContainer` & `#sportsSearchEventsShelf`.
  - IPL search results: `#sportsSearchIplContainer` & `#sportsSearchIplShelf`.
  - Empty search notice: `#sportsSearchEmptyNotice`.
  - Grid: `#sportsGrid`.

---

### 5.6 View 4.2: Live TV (1,324 Channels) (`#view-livetv`)
- Header indicator `#jtvHeaderIndicator` (emerald pulsing dot) and `#jtvTotalCountBadge`.
- Search Input: `#jtvSearchInput` (`debounceLiveTvChannels()`).
- Multi-Catalog Source Switcher (`switchLiveTvCatalog`):
  - `jiotv`: JioTV Network (ClearKey DRM / HLS / MPD)
  - `sportlink`: SportLink Live
  - `livem3u`: Live Events (GitHub stream sync)
  - `allchannels`: Master Unified Database
- Sticky Filter Bar: `#jtvCategoryPills` with Left/Right scroll buttons.
- Channels Grid: `#jtvChannelGrid` (virtualized with `contain-intrinsic-size: auto 240px`).
- No Results State: `#jtvNoResults`.

---

### 5.7 View 4.5: Live Now & Sports Schedule (`#view-livenow`)
- Styled in Glacier Sapphire OTT Theme (transparent backdrop).
- Real-time Clock Ticker: `#liveNowClockTicker`.
- Live Match Search: `#liveNowSearch` (`filterLiveNowGrid()`).
- Action Controls: `#liveNowExpandAllBtn` (`toggleAllLiveNowSubsections()`), Refresh Schedule (`loadLiveSportsSchedule(true)`).
- Upstream Network Filter Bar:
  - All Networks, SportLink, SonyLIV, Willow Cricket, FanCode, Prime Video, TimStreams, Live.m3u Events, Special Channels, ClearKey HD, Fixtures, Showcase (`setLiveNowSourceFilter`).
- Sport Discipline Filter Bar:
  - All Sports, Live Now (`#livenow-status-live`), Upcoming (`#livenow-status-starting`), Cricket, Football, F1 & Racing, Tennis, Combat, Basketball, 24/7 Networks, NFL, MLB (`setLiveNowSportCategory`).
- Spotlight Billboard: `#liveNowHeroSpotlight`.
- Live Events Grid: `#liveNowEventsContainer` & `#liveNowEventsGrid`.

---

### 5.8 View 5: Watchlist (`#view-watchlist`)
- Header with "Clear All" action (`clearWatchHistory()`).
- Responsive Grid: `#watchlistGrid`.

---

### 5.9 View 8: Electronic Program Guide (`#view-epg`)
- Network Selector Tabs (`filterEpgNetwork`): Star Sports (`epgTab-star`), Sony Sports (`epgTab-sony`), All Sports (`epgTab-sports`), All Channels (`epgTab-all`).
- Guide Search: `#epgSearchInput` (`handleEpgSearch(val)`).
- Channel count badge: `#epgChannelCountText`.
- States: `#epgLoadingState`, `#epgEmptyState`, `#epgGuideContainer` with card grid `#epgCardsGrid`.

---

### 5.10 View 6: Anime Otaku Arena (`#view-anime`)
- Hero Spotlight: `#animeHeroSliderContainer`.
- Top 10 Anime Today: `#animeTop10Shelf`.
- Weekly Anime Radar: `#animeScheduleSection`:
  - Date Picker: `#animeScheduleDatePicker` (`switchAnimeScheduleDay('date', value)`).
  - Day Tabs: Today, Monday through Sunday (`switchAnimeScheduleDay(day)`).
  - Simulcast Schedule Grid: `#animeScheduleGrid`.
- Genre & Theme Shelves:
  - `#animeTopRatedShelf` (Top Rated Anime Masterpieces)
  - `#animeIsekaiShelf` (Isekai & Reincarnation Realm)
  - `#animeFightingShelf` (Fighting Masters & Combat Arena)
  - `#animeCozySliceShelf` (Cozy Slice of Life & Comedy)
  - `#animeMechaShelf` (Cyberpunk & Futuristic Mecha War)
  - `#animeSportsShelf` (High School & Sports Champions)
  - `#animeClassicsVaultShelf` (Legendary Classic Anime Vault)

---

### 5.11 View 7: Search Results (`#view-search`)
- Query Echo Label: `#searchQueryLabel`.
- Multi-Column Grid: `#searchGrid` (3 to 7 responsive columns).

---

## 6. Modals, Theater Player & Overlay Architecture (Lines 2621–3262)

### 6.1 EPG Program & Channel Modals
- `#epgProgramModal`: Detailed broadcast program popup containing category tag, air times, duration, program title, channel, description, and `#epgModalPlayBtnContainer`.
- `#epgChannelModal`: Channel-specific schedule modal displaying `#epgChannelModalLive` (Live Now) and `#epgChannelModalUpcoming` (Upcoming chronological schedule).

---

### 6.2 Apple TV+ Media Details Page (`#detailsModal`)
Full-screen modal presenting high-resolution media information:
- **Top Controls**: Back to Browse (`closeDetailsModal()`), Search (`openSearchPalette()`), Watchlist toggle (`toggleWatchlist()`), Permalink share (`shareCurrentDetailsMedia()`).
- **Widescreen Stage**:
  - Image backdrop: `#detailBackdrop`.
  - Dynamic looping YouTube trailer: `#trailerBgIframe` inside `#trailerBgContainer`.
  - Floating trailer controls: `#detailsTrailerControls` with play/pause (`toggleDetailsTrailerPlay()`) and mute/unmute (`toggleDetailsTrailerMute()`).
- **Hero Metadata & Poster**:
  - Poster card: `#detailPoster`.
  - Spec badges: Type, Year, Star Rating, IMDb Rating Badge (`#imdbBadge` & `#imdbRatingVal`), Runtime, 1080P Full HD, HD Audio, Atmos, Closed Captions (CC).
  - Typography: Title (`#detailTitle`), Tagline (`#detailTagline`), Genres (`#detailGenres`), Synopsis (`#detailOverview`), Technical details (`#detailExtraInfo`), Next Episode Alert (`#detailNextEpisodeAlert`).
- **Action Console (8 Primary Buttons)**:
  1. Play Bing (`#btn-play-bingr`, `openBingrPlayer()`): Primary white CTA with 4K badge.
  2. Play Movie (`#detailsPlayBtn`, `openFullscreenPlayer()`): Netflix red button.
  3. Play HLS (`#btn-play-hls`, `openHlsPlayer()`).
  4. Watch Party (`#btn-party-modal-media`, `startPartyFromCurrentDetails()`).
  5. Torrent (4K) (`#btn-play-torrent`, `openTorrentPlayer()`).
  6. Trailer (`#btn-play-trailer`, `playSelectedTrailer()`).
  7. Add to List (`#btn-watchlist-toggle`, `toggleWatchlist()`).
  8. Share (`#btn-share-details`, `shareCurrentDetailsMedia()`).
- **TV Season & Episode Selector (`#tvNavigator`)**:
  - Season dropdown: `#seasonSelector` (`loadSeasonEpisodes()`).
  - Episode search: `#episodeSearchInput` (`filterSeasonEpisodes(val)`).
  - Sort order toggle: `#episodeSortBtn` (`toggleEpisodeSort()`).
  - View layout mode toggles: List vs Grid (`setEpisodeViewMode('list'|'grid')`).
  - Container: `#episodesGrid`.
- **Cast & Crew Studio Carousel (`#detailCast`)**:
  - Sliding controllers: `slideCastList(-360)` / `slideCastList(360)`.
- **Information & Technical Playback Specifications Footer**:
  - Outlines Streaming Engines, Video/HDR Formats (4K UHD, Dolby Vision, HDR10+), Audio (Dolby Atmos, 5.1 Surround), and Interactive Features.

---

### 6.3 Standalone Fullscreen Theater Player Page (`#view-player`)
A dedicated high-performance fullscreen video playback interface:
- **Top Control Rail**:
  - Back button (`closeFullscreenPlayer()`).
  - Search shortcut (`openSearchModal()`).
  - Live media thumbnail icon: `#playerThumbImg` with `#playerThumbFallback` and live pulsing badge `#playerThumbLiveBadge`.
  - Title and Subtitle labels: `#playerTitleLabel` and `#playerSubtitleLabel`.
  - Party Sync button (`togglePartyModal(true)`).
  - TV Episode navigation buttons: Previous / Next episode (`playPreviousEpisode()`, `playNextEpisode()`).
  - Native browser fullscreen toggle: `toggleFullscreenTheater()`.
  - Sub / Dub audio switch buttons: `setPlayerAudioMode('sub'|'dub')`.
  - Server Embed Selector: `#playerServerSelector` (`changeServerFromFullscreen()`). Supported servers:
    1. `vidlink_pro`: VidLink Pro (1080p Multi-Lang / Main)
    2. `vidsrc_pm`: VidSrc PM
    3. `vidsrc_to`: VidSrc TO
    4. `vidrift`: Vidrift (Direct Embed)
    5. `twoembed`: 2Embed Multi
    6. `smashystream`: SmashyStream
    7. `cinezo`: Cinezo Official
    8. `filmu`: Vidly Pro (1080p Multi-Lang)
- **Cinema Video Stage**:
  - Embed iframe: `#fullscreenVideoIframe`.
  - Native video element: `<video id="fullscreenNativePlayer">` inside `#fullscreenNativePlayerContainer`.
  - Play Overlay / Placeholder: `#fullscreenPlayerPlaceholder` with media backdrop, preview poster badge (`#placeholderThumbPreview`), and large red Play trigger (`startActualFullscreenPlayback()`).
- **TV Series Up Next Shelf**: `#playerUpNextContainer`, season selector `#playerSeasonSelector` (`changePlayerSeason()`), and `#playerEpisodesList`.
- **Recommendations Carousel**: `#playerRecommendationsContainer` & `#playerRecommendationsGrid`.
- **Connection Diagnostics Banner**: Embedded tip advising users to switch embed servers if streams stall and recommending uBlock Origin / Brave.

---

### 6.4 Additional Specialized Modals
1. **Person Details / Actor Modals (`#personDetailsModal` & `#personModal`)**:
   - High-contrast profile photo, star badge, biography text, and "Known For" filmography grid (`#personCreditsGrid`).
2. **Sports Match Center Oval Modal (`#sportsMatchOvalModal`)**:
   - Header with sport name, live indicator, and league badge.
   - VS Match Banner: `#sportsModalVsBanner` (horizontal stadium card).
   - Tab switcher:
     - Tab 1: Match Info (`#sportsModalContentInfo`) with tournament, IST time, status, duration, broadcaster, and live match situation summary.
     - Tab 2: Live Scorecard (`#sportsModalContentScore` & `#sportsModalScoreBody`).
     - Tab 3: Watch Feeds (`#sportsModalContentWatch` & `#sportsModalChannelsList`).
   - Primary Play CTA: `#sportsModalPrimaryPlayBtn`.
3. **Fullscreen OTT Search Studio (`#searchPalette`)**:
   - Search input: `#searchInput` (`debounceSearch()`).
   - Category filter pills: All Catalog, Movies & Series (`tmdb`), Anime (`anilist`), Live Sports (`events`), Live TV Channels (`channels`) via `setSearchFilter()`.
   - Results container: `#searchResults`.
   - Dismissible via `ESC` key or Close button.
4. **Toast Notification System (`#toast`)**:
   - Floating glass pill at bottom-right with Lucide info badge and text container `#toastText`.

---

## 7. JavaScript Functions, APIs & Utilities (Lines 3263–3650)

### 7.1 Batched Lucide Icon Rendering (`triggerLucide`)
Avoids UI freezing caused by repeatedly scanning the entire DOM by batching root nodes and scheduling execution on the next browser animation frame:

```javascript
const _lucidePendingRoots = new Set();
let _lucideFlushScheduled = false;
function triggerLucide(rootEl) {
    if (!window.lucide || typeof lucide.createIcons !== 'function') return;
    const target = (rootEl && rootEl.nodeType)
        ? rootEl
        : (typeof activeTab !== 'undefined' && document.getElementById('view-' + activeTab)) || document.body;
    _lucidePendingRoots.add(target);
    if (_lucideFlushScheduled) return;
    _lucideFlushScheduled = true;
    const flushIcons = () => {
        _lucideFlushScheduled = false;
        if (!window.lucide || typeof lucide.createIcons !== 'function') return;
        const roots = Array.from(_lucidePendingRoots);
        _lucidePendingRoots.clear();
        for (let i = 0; i < roots.length; i++) {
            const r = roots[i];
            if (!r || !r.isConnected) continue;
            if (roots.some(other => other !== r && other.contains && other.contains(r))) continue;
            try {
                if (r.querySelector && r.querySelector('[data-lucide]')) {
                    lucide.createIcons({ root: r });
                }
            } catch(e) {}
        }
    };
    if (window.requestAnimationFrame) {
        window.requestAnimationFrame(flushIcons);
    } else {
        setTimeout(flushIcons, 16);
    }
}
```

---

### 7.2 HTML Sanitization & Toast Notifications
- `safeEscapeHtml(str)`: Replaces `&`, `<`, `>`, `"`, and `'` with HTML entities.
- `showToast(msg)`: Displays `#toast` for 3,000ms with smooth CSS translate and opacity transitions.

---

### 7.3 Details YouTube Background Trailer Controllers
- `toggleDetailsTrailerPlay()`: Sends `pauseVideo` or `playVideo` via `iframe.contentWindow.postMessage`. Automatically restores `#detailBackdrop` photo when paused and hides photo when video is actively streaming.
- `toggleDetailsTrailerMute()`: Sends `unMute` or `mute` commands via `postMessage`.

---

### 7.4 TMDB Proxy Client & Resilient Offline Fallback Pool (`fetchTMDB`)
- **Three-Tier Caching Pipeline**:
  1. Level 1: In-memory LRU Map `_tmdbClientCache` (max 200 entries).
  2. Level 2: `window._safeSessionGet('tmdb_' + cacheKey)`.
  3. Level 3: Upstream proxy fetch `/api/bingr/tmdb-proxy?endpoint=...`.
- **Integrated Fallback Pool**:
  If the network or server backend is offline, `fetchTMDB` returns structured metadata from a built-in pool of 10 flagship titles:
  - `Dune: Part Two` (ID: 693134)
  - `Oppenheimer` (ID: 872585)
  - `Deadpool & Wolverine` (ID: 533535)
  - `Inside Out 2` (ID: 1022789)
  - `Alien: Romulus` (ID: 945961)
  - `Game of Thrones` (ID: 1399)
  - `House of the Dragon` (ID: 94997)
  - `The Bear` (ID: 136315)
  - `Severance` (ID: 95396)
  - `Stranger Things` (ID: 66732)
  Synthesizes mock episodes for TV requests (`Chapter One: Premiere`, `Chapter Two: The Reckoning`, etc.) ensuring zero crash UI render.

---

### 7.5 Speculative Media Prefetching (`prefetchMediaDetails`)
```javascript
function prefetchMediaDetails(id, type = 'movie') {
    if (!id || isNaN(Number(id))) return;
    const cleanType = (type === 'tv' || type === 'series') ? 'tv' : 'movie';
    const cacheKey = `${cleanType}_${id}`;
    if (window._detailsDataCache[cacheKey] || _detailsPrefetchInFlight.has(cacheKey)) return;
    _detailsPrefetchInFlight.add(cacheKey);

    fetchTMDB(`${cleanType}/${id}`, { append_to_response: 'credits,videos,external_ids,images' })
        .then(data => {
            if (data) {
                window._detailsDataCache[cacheKey] = data;
                if (cleanType === 'tv' && (!window._seasonEpisodesCache || !window._seasonEpisodesCache[`${id}_s1`])) {
                    fetchTMDB(`tv/${id}/season/1`).then(sData => {
                        if (sData?.episodes) {
                            window._seasonEpisodesCache = window._seasonEpisodesCache || {};
                            window._seasonEpisodesCache[`${id}_s1`] = sData.episodes;
                        }
                    }).catch(() => {});
                }
            }
        })
        .finally(() => {
            _detailsPrefetchInFlight.delete(cacheKey);
        });
}
window.prefetchMediaDetails = prefetchMediaDetails;
```
Triggered on card hover or touch start to preload credits, trailers, and Season 1 episodes before the user clicks, enabling instant sub-10ms modal presentation.

---

### 7.6 TMDB Clear PNG Logo Fetcher (`fetchTMDBLogo`)
Fetches high-resolution transparent movie/series logo graphics:
1. Queries TMDB `${type}/${id}/images?include_image_language=en,null`.
2. Searches for English language logos (`iso_639_1 === 'en'`).
3. If numeric ID fails, searches TMDB by title.
4. Caches URL in `_logoCache`.

---

### 7.7 Multi-Tier Official Trailer Scoring Algorithm (`fetchOfficialTrailerKey`)
Intelligently selects the best YouTube trailer key from TMDB video arrays:
- **Scoring Weights**:
  - `v.official`: $+100$
  - `v.iso_639_1 === 'en'`: $+50$
  - `type === 'trailer'`: $+80$
  - Title includes `official trailer`: $+50$
  - Title includes `main trailer` or `final trailer`: $+30$
  - `type === 'teaser'`: $+30$
  - `type === 'clip'`: $+10$
- **Tier 1**: TMDB ID `/videos` with `include_video_language=en,null`.
- **Tier 2**: TMDB ID `/videos` across all languages.
- **Tier 3**: TMDB multi-search by title.
- **Tier 4 (Fallback)**: Backend proxy search `/api/music/yt-search?q=${title} official trailer`.
- Results cached in `_trailerKeyCache`.

---

### 7.8 Spotlight Billboard Background Video Trailer (`updateSpotlightBackgroundTrailer`)
Dynamically embeds a seamless video loop into the hero spotlight carousel:
- Differentiates anime items (`isAnime`) to avoid colliding AniList numerical IDs with TMDB IDs.
- Creates or updates an `<iframe>` targeting `https://www.youtube-nocookie.com/embed/${trailerKey}` with:
  `autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&enablejsapi=1&playsinline=1`.
- Automatically fades out the static backdrop image when the video initiates.

---

## 8. Index of Registered Window Variables, Methods & Elements

### Global Window Variables & Functions
- `window._safeLocalGet(key, defVal)`
- `window._safeLocalSet(key, value)`
- `window._safeLocalRemove(key)`
- `window._safeSessionGet(key, defVal)`
- `window._safeSessionSet(key, value)`
- `window.deferredPwaPrompt`
- `window.triggerPwaInstall()`
- `window._mediaQuickCache`
- `window._detailsDataCache`
- `window._seasonEpisodesCache`
- `window.prefetchMediaDetails(id, type)`
- `triggerLucide(rootEl)`
- `safeEscapeHtml(str)`
- `showToast(msg)`
- `toggleDetailsTrailerPlay()`
- `toggleDetailsTrailerMute()`
- `fetchTMDB(endpoint, params, options)`
- `fetchTMDBLogo(id, type, searchTitle)`
- `fetchOfficialTrailerKey(id, type, title)`
- `updateSpotlightBackgroundTrailer(containerId, item, type)`

### Key DOM Element IDs Audited
- Navigation & Header: `pwaInstallHeaderBtn`, `btn-header-ai-vault`, `btn-header-party`, `btn-header-mob-menu`, `btn-header-hero-back`, `mobileBottomDock`, `mobSectionsDrawer`, `mobSectionsDrawerContent`.
- Views: `mainLoader`, `view-home`, `view-movies`, `view-tv`, `view-sports`, `view-livetv`, `view-livenow`, `view-watchlist`, `view-epg`, `view-anime`, `view-search`.
- Modals & Playback: `detailsModal`, `tvNavigator`, `detailCast`, `personModal`, `view-player`, `cinemaPlayerWrapper`, `fullscreenVideoIframe`, `fullscreenNativePlayer`, `fullscreenPlayerPlaceholder`, `trailerModal`, `sportsMatchOvalModal`, `searchPalette`, `toast`.

---

## 9. Verification & Safety Notice
- **Security Rule Adherence**: The file `anime_bing.php` was neither read, referenced, nor modified during this inspection.
- **Partition 1 Status**: Complete and exhaustive audit spanning Lines 1 through 3,600 of `consumet.html`.
