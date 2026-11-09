# 🔍 Consumet Audit Report 1: Micro-Slices 1–4 (Lines 1 to 1,787)

**Auditor:** Final Check Auditor 1  
**Target File:** [`consumet.html`](file:///c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html) (Lines 1 to 1,787)  
**Reference Document:** [`consumet_structure.md`](file:///c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_structure.md)  
**Safety Verification:** `anime_bing.php` untouched.

---

## 1. Executive Summary of Audit

Lines 1 to 1,787 of `consumet.html` represent the **Application Foundation, Chrome Architecture, Global Navigation, View 1 (`#view-home`), View 2 (`#view-movies`), and View 3 (`#view-tv`) Structural Skeletons**.

While `consumet_structure.md` provides a strong high-level architectural overview, this deep audit identified **42 specific DOM IDs, 14 JavaScript functions/handlers, 8 CSS animation/media-query rules, and 5 external resource imports** that are either completely omitted or insufficiently specified in `consumet_structure.md`.

---

## 2. Micro-Slice Breakdown & Verification

### 🔹 Micro-Slice 1: Lines 1–450
**Scope:** HTML5 `<head>`, Meta Tags, Preconnect/Prefetch, Storage Shims, Client Input Shield, PWA Controller, Core CSS Resets, and Apple TV+ Modern Cinema Design System.

#### Exact Features & Code Verified:
1. **HTML Head & Meta Configuration (Lines 1–45, 82–100):**
   - Favicons: `/apple-touch-icon.png` (PNG icon & apple-touch-icon).
   - Meta tags: `robots="noindex"`, `charset="UTF-8"`, `viewport="width=device-width, initial-scale=1.0"`.
   - Title: `Aetheris Cinema | HD & OTT Hub`.
   - PWA Meta: `/manifest.json`, `theme-color="#030712"`, `mobile-web-app-capable="yes"`, `apple-mobile-web-app-capable="yes"`, `apple-mobile-web-app-status-bar-style="black-translucent"`, `apple-mobile-web-app-title="Aetheris"`.
   - Resource Hints:
     - `preconnect`: `https://image.tmdb.org`, `https://images.unsplash.com`, `https://fonts.googleapis.com`, `https://fonts.gstatic.com`.
     - `dns-prefetch`: `https://image.tmdb.org`, `https://images.unsplash.com`, `https://cdn.jsdelivr.net`, `https://unpkg.com`.
2. **External Scripts & Warnings Suppressor (Lines 100–115):**
   - Console Warning Suppressor: Overrides `console.warn` to silence Tailwind CDN warning (`cdn.tailwindcss.com should not be used in production`).
   - CDN Scripts: Tailwind Play CDN, Lucide Icons (`unpkg.com/lucide@latest`), Hls.js (`cdn.jsdelivr.net/npm/hls.js@latest`).
   - Spatial TV Navigation: `<script src="/assets/tv-navigation.js" defer></script>`.
3. **Safe Storage Shim (Lines 6–40):**
   - In-memory fallback dictionaries: `_memLocal = {}` and `_memSession = {}`.
   - Implemented functions: `_safeLocalGet(k, defVal)`, `_safeLocalSet(k, v)`, `_safeLocalRemove(k)`, `_safeSessionGet(k, defVal)`, `_safeSessionSet(k, v)`.
   - Edge case detail: Value conversion uses `String(v)`. Notice `_safeSessionRemove` is **not** implemented in the shim.
4. **Client Input Shield & DevTools Anti-Inspect (Lines 45–81):**
   - Device detection: Evaluates regex `/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet|Mobile|Silk|Kindle/i`, `navigator.maxTouchPoints > 1`, and media query `(pointer: coarse)`. Returns immediately for touch devices.
   - Admin exemption: Checks `document.cookie.indexOf('admin_auth=') !== -1 || !!localStorage.getItem('admin_token')`.
   - Blocked Keystrokes (capture phase `true`): `F12` (123), `Ctrl/Cmd+Shift+I` (73), `Ctrl/Cmd+Shift+J` (74), `Ctrl/Cmd+Shift+C` (67), `Ctrl/Cmd+U` (85).
   - Context Menu Lock: Prevents default right-click except when target tag is `INPUT` or `TEXTAREA`.
5. **PWA Controller & Standalone Launcher (Lines 116–175):**
   - Service worker registration at `/sw.js` with registration scope logging.
   - Event `beforeinstallprompt`: captures event in `window.deferredPwaPrompt`, reveals `#pwaInstallHeaderBtn` (`classList.remove('hidden')`).
   - Event `appinstalled`: clears prompt, hides button, triggers `showToast('🎉 Aetheris Installed as Native App!', 'info')`.
   - `window.triggerPwaInstall()`: triggers native prompt if available; otherwise detects iOS (`/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream`) and shows Safari Share menu instructions (`📱 Tap the Share icon (⎋)...`), or browser menu instructions for Android/Chrome.
   - Standalone class: attaches `pwa-standalone` to `document.documentElement` if running under `display-mode: standalone` or `navigator.standalone === true`.
6. **Core CSS Resets & Performance Rules (Lines 180–336):**
   - Tap highlight reset: `* { -webkit-tap-highlight-color: transparent !important; }`.
   - Font family: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Plus Jakarta Sans", sans-serif`.
   - GPU / Virtual scrolling containment: `#jtvChannelGrid > div, #sportsCatalogGrid > div, #liveNowEventsGrid > div` use `content-visibility: auto; contain-intrinsic-size: auto 240px; transform: translateZ(0);`.
   - Apple TV Scroller paddles: `.scroller-btn` (absolute, top 50%, 44px circle, opacity 0, hover opacity 0.85/1.0, scale 1.1).
   - Mobile Media Query (`@media (max-width: 768px)`): Hides `.scroller-btn`, adds `main` padding bottom `calc(5.5rem + env(safe-area-inset-bottom))`, enables `scroll-snap-type: x proximity; scroll-padding: 12px` on shelves.
   - Landscape Cinema Mode (`@media (max-height: 520px) and (orientation: landscape)`): Completely hides `#view-player > div:first-child`, episode drawers, and expands `#cinemaPlayerWrapper` to `100vw` × `100vh`.
7. **Apple TV+ Design System (Lines 337–450):**
   - CSS tokens: `--atv-bg: #000000`, `--atv-surface: #0b0b0f`, `--atv-card: #121217`, `--atv-border: rgba(255, 255, 255, 0.08)`, `--atv-accent: #e50914`.
   - Keyframe animations: `@keyframes atvFadeUp`, `@keyframes atvHeroReveal`, `@keyframes atvGridExpand`.
   - Classes: `.animate-fade-in`, `.animate-grid-expand`.
   - Modern scrollbar: 8px width/height, thumb `rgba(255,255,255,0.22)`.

---

### 🔹 Micro-Slice 2: Lines 451–902
**Scope:** Midnight Obsidian, Aurora Velvet & Black-Pinkish Cinema Themes, Ambient Vignette, Floating Controls, Desktop Header, Mobile Dock, and Mobile All-Sections Drawer.

#### Exact Features & Code Verified:
1. **Midnight Cinema Obsidian Slate Theme (Lines 451–534):**
   - CSS variables: `--atv-bg: #06080f`, `--atv-surface: #0c101a`, `--atv-card: #111624`, `--atv-accent: #e50914`.
   - Body multi-radial background: Blue (15% 0%), Red (85% 5%), Slate (50% 100%).
   - Animations: `@keyframes fluidSectionEnter`, `@keyframes fluidPulseGlow`.
   - Spotlight navigation buttons: `.spotlight-nav-arrow` (42px circle with backdrop blur).
   - Mobile breakpoint (`@media (max-width: 640px)`): Hero containers set to `390px` height and `22px` border-radius; `header` hidden.
2. **Aurora Velvet & VisionOS Cinema Theme (Lines 536–620):**
   - CSS variables: `--atv-bg: #070510`, `--atv-surface: #0e0b1c`, `--atv-card: #130f26`, `--atv-gold: #f59e0b`, `--atv-accent: #e11d48`.
   - Animations: `@keyframes atvSpecularSweep`, `@keyframes atvCardFloatIn`, `@keyframes atvGlowPulse`.
   - Shimmer pseudo-element: `.shelf-card::after, .netflix-card::after, .oval-cw-card::after, .top10-ott-card::after` with `skewX(-22deg)`.
   - `.atv-mob-dock-shell` glassmorphism tokens.
3. **Black Pinkish Velvet Cinema Theme (Lines 622–722):**
   - CSS variables: `--atv-bg: #080106`, `--atv-surface: #12030d`, `--atv-card: #180512`, `--atv-accent: #f43f5e`.
   - Active Theme Pills: `.ott-pill-active` (`#fce7f3` bg, `#11020a` text, `#f43f5e` border), `.ott-pill-inactive`.
   - `#view-livenow` overrides: Transparent backgrounds, `-webkit-user-drag: none;` on all cards and children.
4. **Header and Ambient Atmosphere (Lines 724–810):**
   - Additional script inclusions: `/bg-inject.js` and `/background_injector.js`.
   - Fixed ambient vignette: `fixed inset-0 pointer-events-none z-0` with 3 radial gradients.
   - **Mobile Floating Top Action Buttons (`md:hidden fixed top-3`):**
     - Left: `button onclick="handleMobileGoBack()"` (Go Back to Hero Portal).
     - Right: `button onclick="openSearchPalette()"` (Search Trigger).
   - **Desktop Floating Header (`header class="hidden md:block sticky top-0 z-50 ..."`):**
     - Brand logo link: `a href="/hero.html"` with `AETHERIS` and `PRO 2.0` badge.
     - Nav buttons: `switchTab('home')`, `switchTab('movies')`, `switchTab('tv')`, `switchTab('anime')`, `switchTab('livenow')` (pulsing sky-400 dot), `switchTab('sports')`, `switchTab('livetv')`, `switchTab('watchlist')`, `switchTab('epg')`.
     - Direct anchor link: `<a href="/music.html" class="atv-nav-pill ...">Music</a>`.
     - Right Utility Actions:
       - `#btn-header-ai-vault`: `onclick="window.restoreAetherisAI ? window.restoreAetherisAI(true) : null"`.
       - Search button: `onclick="openSearchPalette()"`.
       - `#btn-header-party`: `onclick="window.togglePartyModal ? window.togglePartyModal(true) : null"`.
       - `#pwaInstallHeaderBtn` (class `hidden`): `onclick="window.triggerPwaInstall ? window.triggerPwaInstall() : null"`.
       - `#btn-header-mob-menu`: `onclick="window.toggleMobileSectionsDrawer ? window.toggleMobileSectionsDrawer(true) : null"`.
       - `#btn-header-hero-back`: `a href="/hero.html"`.
5. **Mobile Bottom Dock (`#mobileBottomDock`, Lines 811–846):**
   - Pinned with `bottom-[max(0.65rem,calc(env(safe-area-inset-bottom,0px)+0.35rem))]`.
   - Buttons:
     - `#mob-tab-back`: `onclick="handleMobileGoBack()"`.
     - `#mob-tab-home`: `onclick="switchTab('home')"`.
     - `#mob-tab-anime`: `onclick="switchTab('anime')"`.
     - `#mob-tab-livetv`: `onclick="switchTab('livetv')"`.
     - `#mob-tab-livenow`: `onclick="switchTab('livenow')"` (pulsing flame dot).
     - `#mob-tab-more`: `onclick="window.toggleMobileSectionsDrawer(true)"` (AI badges).
6. **Mobile All-Sections Drawer Sheet (`#mobSectionsDrawer`, Lines 848–902):**
   - Modal container: `#mobSectionsDrawerContent` with `translate-y-full` transition.
   - Interactive close triggers: backdrop overlay, drag bar, close button `onclick="window.toggleMobileSectionsDrawer(false)"`.
   - AI Vault card: `onclick="window.restoreAetherisAI(true); window.toggleMobileSectionsDrawer(false);"`.
   - Grid links for Home, Movies, TV Shows, Anime, Live Now, Sports Hub, Live TV, EPG Guide, Watchlist.
   - Standalone PWA install button: `onclick="window.triggerPwaInstall(); window.toggleMobileSectionsDrawer(false);"`.

---

### 🔹 Micro-Slice 3: Lines 903–1356
**Scope:** Main Container, Main Catalog Loader, View 1 (`#view-home`) Shell, Hero Spotlight Billboard, Watch History Shelves, Top 10 Shelves, AI Recommendation Grid, 12 Genre/Regional Shelves, IMDb Direct Fetcher Banner, and Indian & Hollywood Equality Subsections 1–6.

#### Exact Features & Code Verified:
1. **Main Container & Top-Level Loader (Lines 903–915):**
   - Main wrapper: `<main class="flex-grow pt-6 pb-24 md:pb-16 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 z-10 relative">`.
   - Loader: `#mainLoader` (class `hidden flex-col items-center justify-center py-16`) with spinner and text "Preloading Cinema Catalog...".
   - View 1 Shell: `<section id="view-home" class="space-y-10 animate-fade-in">`.
   - Hero Slider: `<div id="heroSliderContainer" class="relative rounded-3xl sm:rounded-[36px] overflow-hidden h-[500px] sm:h-[620px] lg:h-[680px] bg-zinc-950 border border-white/10 shadow-2xl">`.
2. **Dual Continue Watching Rows (Lines 916–960):**
   - **Row A (Active OTT Row):** `#watchHistoryContainer` (class `space-y-3.5 hidden mb-10`):
     - Clear trigger: `<button onclick="clearWatchHistory()" ...>Clear Queue</button>`.
     - Scroller buttons: `scrollShelf('watchHistoryShelf', 'left')` and `right`.
     - Carousel: `<div id="watchHistoryShelf" class="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"></div>`.
   - **Row B (Legacy Secondary Shelf):** `<div id="continueWatchShelf" class="hidden space-y-4">`:
     - Title element: `<h2 id="continueWatchShelfTitle">Continue Watching</h2>`.
     - Carousel: `<div id="continueWatchGrid" class="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2"></div>`.
     - Scroller: `scrollShelf('continueWatchGrid', 'left')` and `right`.
3. **Top 10 Shelves (Lines 932–949):**
   - Top 10 Today: `#top10Shelf` with `scrollShelf('top10Shelf', 'left'/'right')`.
   - Top 10 in India: `#top10IndiaShelf` with `scrollShelf('top10IndiaShelf', 'left'/'right')`.
4. **AI Personalized Recommendation Engine Row (Lines 961–1002):**
   - Container: `#aiRecommendedContainer` (class `space-y-4 mb-10`).
   - Match Badge: `<span id="aiTasteMatchBadge">98% Match Rate</span>`.
   - Taste Chip: `<span id="aiTasteProfileChip">🎯 Profiling Taste...</span>`.
   - Category Filter Buttons:
     - `window.filterAiRecommendations('all')` (`data-filter="all"`).
     - `window.filterAiRecommendations('movie')` (`data-filter="movie"`).
     - `window.filterAiRecommendations('tv')` (`data-filter="tv"`).
     - `window.filterAiRecommendations('anime')` (`data-filter="anime"`).
     - `window.filterAiRecommendations('sports')` (`data-filter="sports"`).
   - Re-tune Button: `<button onclick="window.refreshAiRecommendations(true)">Re-tune</button>`.
   - Grid Shelf: `<div id="aiRecommendedGrid" class="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-3 px-1"></div>`.
5. **12 Regional & Genre Shelves (Lines 1004–1215):**
   - `#trendingMoviesShelf` (with "See All" trigger `switchTab('movies')`).
   - `#trendingSeriesShelf` (with "See All" trigger `switchTab('tv')`).
   - `#newReleaseIndiaShelf` (badge `IN • HOT IN INDIA`).
   - `#bollywoodShelf` (badge `BOLLYWOOD`).
   - `#malayalamShelf` (badge `MOLLYWOOD`).
   - `#tamilShelf` (badge `KOLLYWOOD`).
   - `#teluguShelf` (badge `TOLLYWOOD`).
   - `#kannadaShelf` (badge `SANDALWOOD`).
   - `#hindiShelf` (badge `HINDI CINEMA`).
   - `#hwActionShelf` (badge `ACTION`).
   - `#hwScifiShelf` (badge `SCI-FI`).
   - `#topRatedShelf` (Top Rated Masterpieces).
   - `#animeShelf` (Trending Anime & Asian Drama).
   - `#hollywoodShelf` (Hollywood Premieres with big gradient indicator).
   - Extra genre shelves: `#scifiShelf`, `#koreanShelf`, `#comedyShelf`, `#horrorShelf`, `#documentaryShelf`, `#classicShelf`, `#kidsShelf`, `#awardShelf`.
6. **IMDb Instant Fetcher Banner (Lines 1216–1236):**
   - Layout: Glass card with film icon and description.
   - Text Input: `<input type="text" id="imdbFetcherInput" placeholder="Paste IMDb link or ID...">`.
   - Action Button: `<button onclick="fetchIMDbItem()">Play</button>`.
7. **Master Balanced Indian & Hollywood Subsections 1–6 (Lines 1238–1356):**
   - Subsection 1 (IN): `#homeIndianBlockbustersShelf` ("Pan-India Mega Blockbusters & Box Office Titans").
   - Subsection 2 (US): `#homeHollywoodBlockbustersShelf` ("Hollywood Premieres & Global Masterpieces").
   - Subsection 3 (IN): `#homeIndianCrimeSeriesShelf` ("Desi Crime Underworld & Gritty Indian Web Series").
   - Subsection 4 (US): `#homeGlobalPrestigeSeriesShelf` ("Prestige HBO & Global Flagship Drama Series").
   - Subsection 5 (IN): `#homeSouthActionVaultShelf` ("South Indian High-Octane Action Vault").
   - Subsection 6 (US): `#marvelDcShelf` ("Marvel & DC Superhero Multiverse"):
     - Preset buttons with target player parameter:
       - `onclick="searchAndPlayItem('Avengers', 'player1')"` (MCU Phase 5).
       - `onclick="searchAndPlayItem('Batman', 'player1')"` (Gotham City).
       - `onclick="searchAndPlayItem('Spider-Man', 'player1')"` (Spider-Verse).

---

### 🔹 Micro-Slice 4: Lines 1357–1787
**Scope:** Home Subsections 7–10, Embedded EPG States, View 2 (`#view-movies`) Filters & 10 Movie Shelves, View 3 (`#view-tv`) Filters & 9 TV Shelves (up to line 1787).

#### Exact Features & Code Verified:
1. **Master Balanced Subsections 7–10 (Lines 1357–1429):**
   - Subsection 7 (IN): `#homeBollywoodClassicsShelf` ("Bollywood Romantic Epics & Timeless Family Classics").
   - Subsection 8 (US): `#homeHollywoodScifiShelf` ("Mind-Bending Sci-Fi & Deep Space Odyssey").
   - Subsection 9 (IN): `#homeIndianAcclaimedShelf` ("Critically Acclaimed Indian Cinema & National Award Gems").
   - Subsection 10 (US): `#homeOscarLegendsShelf` ("Oscar-Winning Masterpieces & All-Time Cinematic Legends").
2. **Embedded EPG States inside `#view-home` (Lines 1430–1451):**
   - EPG Timelines Container: `<div id="homeTimelinesContainer" class="space-y-10 pt-6"></div>`.
   - EPG Loading State: `<div id="epgLoadingState" class="hidden py-24 flex flex-col items-center justify-center space-y-4">` (with spinner and download text).
   - EPG Empty State: `<div id="epgEmptyState" class="py-24 border border-white/5 bg-zinc-950/30 rounded-3xl ...">` (with calendar icon and "Load Program Guide" message).
3. **View 2: `#view-movies` (Lines 1453–1630):**
   - Section wrapper: `<section id="view-movies" class="hidden space-y-8 animate-fade-in">`.
   - Filter Dropdowns:
     - Genre Select: `<select id="movies-genre" onchange="applyFilters('movies')">`:
       - `""` (All Genres)
       - `"28"` (Action)
       - `"35"` (Comedy)
       - `"18"` (Drama)
       - `"878"` (Sci-Fi)
       - `"53"` (Thriller)
     - Year Select: `<select id="movies-year" onchange="applyFilters('movies')">`:
       - `""` (All Years)
       - `"2024"`, `"2023"`, `"2022"`
   - Default Layout Container: `<div id="moviesHomeLayout" class="space-y-10">`.
   - 10 Themed Movie Shelves in `#moviesHomeLayout`:
     1. `#moviePanIndiaShelf` (IN • PAN-INDIA)
     2. `#movieHwActionShelf` (US • ACTION)
     3. `#movieSouthCinemaShelf` (IN • SOUTH GEMS)
     4. `#movieHwScifiShelf` (US • SCI-FI)
     5. `#movieIndianCrimeShelf` (IN • CRIME & NOIR)
     6. `#movieHwCrimeShelf` (US • ESPIONAGE)
     7. `#movieIndianComedyShelf` (IN • COMEDY)
     8. `#movieHwHorrorShelf` (US • SUSPENSE)
     9. `#movieIndianHistoricalShelf` (IN • HISTORICAL)
     10. `#movieHwAcclaimedShelf` (US • MASTERPIECES)
   - Filtered/Search Layout: `<div id="moviesCatalogLayout" class="hidden space-y-6">` containing `<div id="moviesGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"></div>`.
4. **View 3: `#view-tv` (Lines 1632–1787):**
   - Section wrapper: `<section id="view-tv" class="hidden space-y-8 animate-fade-in">`.
   - Filter Dropdowns:
     - Genre Select: `<select id="tv-genre" onchange="applyFilters('tv')">`:
       - `""` (All Genres)
       - `"10759"` (Action & Adventure)
       - `"18"` (Drama)
       - `"35"` (Comedy)
       - `"80"` (Crime)
       - `"10765"` (Sci-Fi & Fantasy)
     - Year Select: `<select id="tv-year" onchange="applyFilters('tv')">`:
       - `""` (All Years)
       - `"2024"`, `"2023"`, `"2022"`
   - Default Layout Container: `<div id="tvHomeLayout" class="space-y-10">`.
   - 9 Themed TV Shelves within lines 1654–1787:
     1. `#tvIndianTopSeriesShelf` (IN • INDIAN OTT)
     2. `#tvHwPrestigeDramaShelf` (US • HBO & PRESTIGE)
     3. `#tvIndianCrimeShelf` (IN • DESI CRIME)
     4. `#tvHwScifiShelf` (US • SCI-FI & MYSTERY)
     5. `#tvIndianComedyShelf` (IN • TVF & COMEDY)
     6. `#tvHwEspionageShelf` (US • ESPIONAGE & HEIST)
     7. `#tvIndianMythologyShelf` (IN • MYTHOLOGY & HISTORY)
     8. `#tvHwDarkFantasyShelf` (US • DARK FANTASY)
     9. `#tvIndianRomanceShelf` (IN • YOUTH & ROMANCE)
   *(Note: Line 1787 ends exactly after `#tvIndianRomanceShelf`. Shelf 10 `#tvHwSitcomShelf`, `#tvCatalogLayout`, and `#tvGrid` begin immediately at line 1788)*.

---

## 3. Discrepancies & Gaps Discovered Against `consumet_structure.md`

| # | Item / Code Element | Location in `consumet.html` | Status in `consumet_structure.md` | Impact & Required Fix for React Migration |
|---|---|---|---|---|
| 1 | **Mobile Floating Header Buttons** (`handleMobileGoBack()` & `openSearchPalette()`) | Lines 732–744 | **Missing** | Mobile view lacks primary top floating action buttons if omitted. Must be rendered in `MobileHeader.tsx`. |
| 2 | **Tailwind Warning Suppressor** | Lines 100–108 | **Missing** | Non-critical for React/Vite, but essential if using Tailwind CDN in standalone previews. |
| 3 | **Spatial TV Navigation Script** (`/assets/tv-navigation.js`) | Line 114 | **Missing** | 10-foot TV directional d-pad navigation breaks on Android TV / Apple TV without this hook. |
| 4 | **120Hz GPU Scroll Script** (`/search_launcher.js`) | Line 177 | **Missing** | Search launcher script triggers palette acceleration. |
| 5 | **Local AI CSS** (`/local-ai.css`) | Line 178 | **Missing** | Custom styling rules for the AI Vault Copilot drawer. |
| 6 | **Background Injectors** (`/bg-inject.js`, `/background_injector.js`) | Line 725 | **Missing** | Dynamic background gradient/mesh injectors. |
| 7 | **Safe Session Remove Absence** | Lines 7–40 | **Underspecified** | `_safeSessionRemove` is not in the shim; code only provides `_safeLocalRemove`. |
| 8 | **Secondary Continue Watching Shelf** (`#continueWatchShelf`, `#continueWatchGrid`, `#continueWatchShelfTitle`) | Lines 950–960 | **Missing** | Legacy/secondary continue watching shelf exists alongside `#watchHistoryContainer`. |
| 9 | **IMDb Button Function Name** (`fetchIMDbItem()`) | Line 1232 | **Discrepancy** | `consumet_structure.md` refers to `resolveAndPlayIMDb(query)`, but HTML button specifically invokes `fetchIMDbItem()`. |
| 10 | **Superhero Hub Target Player Parameter** (`searchAndPlayItem(query, 'player1')`) | Lines 1346–1348 | **Underspecified** | Second argument `'player1'` passed to `searchAndPlayItem` controls player target instance. |
| 11 | **Embedded EPG States inside `#view-home`** (`#homeTimelinesContainer`, `#epgLoadingState`, `#epgEmptyState`) | Lines 1430–1451 | **Misplaced/Missing** | `consumet_structure.md` only documents EPG states under `#view-epg`, missing that they also reside directly inside `#view-home`. |
| 12 | **10 Themed Movie Shelf IDs** (`#moviePanIndiaShelf`, `#movieHwActionShelf`, `#movieSouthCinemaShelf`, `#movieHwScifiShelf`, `#movieIndianCrimeShelf`, `#movieHwCrimeShelf`, `#movieIndianComedyShelf`, `#movieHwHorrorShelf`, `#movieIndianHistoricalShelf`, `#movieHwAcclaimedShelf`) | Lines 1476–1624 | **Missing** | Structure only states "10 horizontal carousels" without specifying shelf IDs or badge tags. |
| 13 | **Movie Layout Containers** (`#moviesHomeLayout`, `#moviesCatalogLayout`, `#moviesGrid`) | Lines 1475, 1626, 1628 | **Missing** | Switching between 10 shelves and search/filter grid relies on toggling `hidden` on `#moviesHomeLayout` vs `#moviesCatalogLayout`. |
| 14 | **Movie Filter TMDB Genre IDs** (`28, 35, 18, 878, 53`) | Lines 1458–1465 | **Missing** | The numeric TMDB genre IDs for Action, Comedy, Drama, Sci-Fi, Thriller were unlisted. |
| 15 | **9 Themed TV Shelf IDs** (`#tvIndianTopSeriesShelf`, `#tvHwPrestigeDramaShelf`, `#tvIndianCrimeShelf`, `#tvHwScifiShelf`, `#tvIndianComedyShelf`, `#tvHwEspionageShelf`, `#tvIndianMythologyShelf`, `#tvHwDarkFantasyShelf`, `#tvIndianRomanceShelf`) | Lines 1654–1787 | **Missing** | Structure only states "10 horizontal carousels" without specifying shelf IDs. |
| 16 | **TV Filter TMDB Genre IDs** (`10759, 18, 35, 80, 10765`) | Lines 1638–1645 | **Missing** | The numeric TV TMDB genre IDs for Action & Adventure, Drama, Comedy, Crime, Sci-Fi & Fantasy were unlisted. |
| 17 | **TV Layout Container** (`#tvHomeLayout`) | Line 1654 | **Missing** | TV home shelves container ID was unlisted. |
| 18 | **Direct Music Nav Link** (`<a href="/music.html">Music</a>`) | Line 771 | **Underspecified** | Music is an external navigation anchor rather than a `switchTab` button. |

---

## 4. Complete Master Registry for Micro-Slices 1–4

### 🏷️ Master DOM ID Registry (Lines 1–1,787)
```text
1.  #pwaInstallHeaderBtn
2.  #btn-header-ai-vault
3.  #btn-header-party
4.  #btn-header-mob-menu
5.  #btn-header-hero-back
6.  #tab-home
7.  #tab-movies
8.  #tab-tv
9.  #tab-anime
10. #tab-livenow
11. #tab-sports
12. #tab-livetv
13. #tab-watchlist
14. #tab-epg
15. #mobileBottomDock
16. #mob-tab-back
17. #mob-tab-home
18. #mob-tab-anime
19. #mob-tab-livetv
20. #mob-tab-livenow
21. #mob-tab-more
22. #mobSectionsDrawer
23. #mobSectionsDrawerContent
24. #mainLoader
25. #view-home
26. #heroSliderContainer
27. #watchHistoryContainer
28. #watchHistoryShelf
29. #top10Shelf
30. #top10IndiaShelf
31. #continueWatchShelf
32. #continueWatchShelfTitle
33. #continueWatchGrid
34. #aiRecommendedContainer
35. #aiTasteMatchBadge
36. #aiTasteProfileChip
37. #aiRecommendedGrid
38. #trendingMoviesShelf
39. #trendingSeriesShelf
40. #newReleaseIndiaShelf
41. #bollywoodShelf
42. #malayalamShelf
43. #tamilShelf
44. #teluguShelf
45. #kannadaShelf
46. #hindiShelf
47. #hwActionShelf
48. #hwScifiShelf
49. #topRatedShelf
50. #animeShelf
51. #hollywoodShelf
52. #scifiShelf
53. #koreanShelf
54. #comedyShelf
55. #horrorShelf
56. #documentaryShelf
57. #classicShelf
58. #kidsShelf
59. #awardShelf
60. #imdbFetcherInput
61. #homeIndianBlockbustersShelf
62. #homeHollywoodBlockbustersShelf
63. #homeIndianCrimeSeriesShelf
64. #homeGlobalPrestigeSeriesShelf
65. #homeSouthActionVaultShelf
66. #marvelDcShelf
67. #homeBollywoodClassicsShelf
68. #homeHollywoodScifiShelf
69. #homeIndianAcclaimedShelf
70. #homeOscarLegendsShelf
71. #homeTimelinesContainer
72. #epgLoadingState
73. #epgEmptyState
74. #view-movies
75. #movies-genre
76. #movies-year
77. #moviesHomeLayout
78. #moviePanIndiaShelf
79. #movieHwActionShelf
80. #movieSouthCinemaShelf
81. #movieHwScifiShelf
82. #movieIndianCrimeShelf
83. #movieHwCrimeShelf
84. #movieIndianComedyShelf
85. #movieHwHorrorShelf
86. #movieIndianHistoricalShelf
87. #movieHwAcclaimedShelf
88. #moviesCatalogLayout
89. #moviesGrid
90. #view-tv
91. #tv-genre
92. #tv-year
93. #tvHomeLayout
94. #tvIndianTopSeriesShelf
95. #tvHwPrestigeDramaShelf
96. #tvIndianCrimeShelf
97. #tvHwScifiShelf
98. #tvIndianComedyShelf
99. #tvHwEspionageShelf
100. #tvIndianMythologyShelf
101. #tvHwDarkFantasyShelf
102. #tvIndianRomanceShelf
```

### ⚡ JavaScript Function & Handler Registry (Lines 1–1,787)
```typescript
// Safe Storage
window._safeLocalGet(k: string, defVal?: any): any;
window._safeLocalSet(k: string, v: any): void;
window._safeLocalRemove(k: string): void;
window._safeSessionGet(k: string, defVal?: any): any;
window._safeSessionSet(k: string, v: any): void;

// PWA & Standalone
window.deferredPwaPrompt: Event | null;
window.triggerPwaInstall(): Promise<void>;

// Navigation & Routing
handleMobileGoBack(): void;
openSearchPalette(): void;
switchTab(tab: string): void;
window.restoreAetherisAI(forceOpen?: boolean): void;
window.togglePartyModal(show: boolean): void;
window.toggleMobileSectionsDrawer(open: boolean): void;

// History & Shelves
clearWatchHistory(): void;
scrollShelf(shelfId: string, direction: 'left' | 'right'): void;

// AI Recommendations
window.filterAiRecommendations(filter: 'all' | 'movie' | 'tv' | 'anime' | 'sports'): void;
window.refreshAiRecommendations(force?: boolean): void;

// VOD & Multiverse Actions
fetchIMDbItem(): void;
searchAndPlayItem(query: string, targetPlayer: string): void;
applyFilters(view: 'movies' | 'tv'): void;
```

---

## 5. React Migration Guardrails (ARVIO Implementation Guidelines)

When implementing the React components corresponding to Lines 1–1,787:

1. **State Store vs DOM Toggles:**
   - In `consumet.html`, toggling between category shelves and filter search results is achieved by toggling `.hidden` on `#moviesHomeLayout` vs `#moviesCatalogLayout` (and similarly for TV).
   - In React, manage this via `useMovieStore` / `useTvStore` state: `isFiltered ? <CatalogGrid /> : <ThemedShelves />`.
2. **Carousel Component Reusability:**
   - The 34 horizontal carousels defined in this section all share identical scrolling behavior, padding, and paddle controls. Create a single parameterized `<HorizontalShelf title={...} badge={...} shelfId={...} onSeeAll={...}>` component.
3. **PWA & Mobile Navigation:**
   - Retain the exact safe-area inset calculation for the mobile bottom dock (`bottom-[max(0.65rem,calc(env(safe-area-inset-bottom,0px)+0.35rem))]`).
   - Implement the iOS Safari Share sheet instructions modal if PWA install prompt is unsupported.
4. **DevTools & Anti-Inspect Shielding:**
   - Move the keydown/contextmenu event listener to an optional hook (`useClientShield()`) that automatically disables itself in development mode (`process.env.NODE_ENV === 'development'`).

---

**End of Audit Report 1 (Lines 1 to 1,787).**
