# 🏛️ Consumet Architecture & Logic Blueprint (Master Reference)

Authoritative, line-by-line architectural breakdown, API matrix, state schema, and UI component specification for [`consumet.html`](file:///c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html) (17,868 lines total).

This blueprint serves as the **Single Source of Truth** for migrating `consumet.html` into a modern **React + TypeScript + Tailwind (ARVIO-inspired)** architecture without omitting any APIs, edge cases, DRM workflows, sports scorecards, or player engines.

---

## 1. Executive Summary & Migration Vision

`consumet.html` is an enterprise-grade, single-file frontend orchestrating movies, television, anime, 1,324+ live TV channels, and multi-source live sports with real-time telemetry.

### The ARVIO Migration Strategy
Previous attempts to convert `consumet.html` into React failed because developers implemented a shallow visual replica ("cement without blocks") while dropping:
1. Dynamic deobfuscation and multi-source ranking cascades.
2. Real-time sports match telemetry and live scorecards (cricket run rates, bowler stats, football possession).
3. ClearKey DRM DASH and HLS stream routing with token injection.
4. Fast 0ms memory caches (`sessionStorage`, `localStorage`, client-side Map indices).
5. Multi-server playback failovers (VidLink, VidSrc, SmashyStream, Cinezo, Filmu, TorrServer, Pure HLS, Bingr).

This document captures **100% of the blocks, states, endpoints, and algorithms** necessary for the React conversion.

---

## 2. Global Views & Screen Hierarchy

The application consists of **10 primary views** dynamically toggled via the `activeTab` router:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   consumet.html Master Views                                │
├───────────────┬───────────────┬───────────────┬───────────────┬──────────────┬──────────────┤
│ #view-home    │ #view-movies  │ #view-tv      │ #view-sports  │ #view-livetv │ #view-livenow│
├───────────────┼───────────────┼───────────────┼───────────────┼──────────────┼──────────────┤
│ #view-anime   │ #view-epg     │ #view-watchlist│ #view-search │ #view-player │ Modals/Studio│
└───────────────┴───────────────┴───────────────┴───────────────┴──────────────┴──────────────┘
```

### 1. Master System Shims & Runtime Protections (Lines 1–180)
- **Safe Storage Shim (`_memLocal`, `_memSession`)**:
  - Sandboxed iframes and web previews frequently throw SecurityError or QuotaExceededError when accessing `localStorage` or `sessionStorage`.
  - Global methods `window._safeLocalGet(k, defVal)`, `window._safeLocalSet(k, v)`, `window._safeLocalRemove(k)`, `window._safeSessionGet(k, defVal)`, and `window._safeSessionSet(k, v)` wrap all Web Storage access in try-catch with in-memory JavaScript hash map fallbacks.
- **Client Input Shield & DevTools Blocker**:
  - Automatically identifies touch devices (`Android|iPhone|iPad|...`, `navigator.maxTouchPoints > 1`, `pointer: coarse`).
  - Desktop browsers are shielded against accidental inspection keys: blocks `F12`, `Ctrl/Cmd + Shift + I/J/C`, and `Ctrl/Cmd + U`.
  - Context menu (`contextmenu`) is disabled across the document except on `<input>` and `<textarea>`.
  - Admin users with `admin_auth=` cookie or `localStorage.admin_token` are automatically exempt.
- **PWA Controller & Standalone Launcher**:
  - Service worker registration at `/sw.js`.
  - Intercepts `beforeinstallprompt` event and assigns it to `window.deferredPwaPrompt`, dynamically revealing `#pwaInstallHeaderBtn`.
  - Custom installer function `window.triggerPwaInstall()` executes `.prompt()` or guides iOS Safari users to "Add to Home Screen".
  - Detects `display-mode: standalone` and attaches `pwa-standalone` CSS class to `<html>`.

### 2. Multi-Theme Glassmorphism Engine & Visual Design Tokens (Lines 180–730)
- **Theme 1: Black Pinkish Velvet Cinema (Default Active Theme)**:
  - `--atv-bg: #080106`, `--atv-surface: #12030d`, `--atv-card: #180512`
  - Accent: `--atv-accent: #f43f5e` (Rose-500)
  - Card Gradients: `linear-gradient(165deg, rgba(28, 8, 20, 0.82) 0%, rgba(14, 3, 10, 0.92) 100%)` with `-webkit-backdrop-filter: blur(16px)`
  - Active Pills: `.ott-pill-active` (`#fce7f3` background, `#11020a` dark text, `#f43f5e` border)
- **Theme 2: Apple TV+ & Netflix Modern Cinema**:
  - Background: `#000000`, Surface: `#0b0b0f` / `#121217`, Accent: `#e50914` (Netflix Red).
  - Border: `rgba(255,255,255,0.08)`, Card Hover Border: `rgba(255,255,255,0.24)`.
- **Theme 3: Aurora Velvet & VisionOS 3D**:
  - Background: `#070510`, Surface: `#0e0b1c` / `#130f26`, Accents: `#e11d48` (Rose) and `#f59e0b` (Gold).
  - Specular shimmer animation (`@keyframes atvSpecularSweep` from `-130%` to `220%` skewX `-22deg`).
  - Card float in animation (`@keyframes atvCardFloatIn` from `translate3d(0, 22px, 0)`).
  - Amber/Gold specular border highlights (`rgba(251, 191, 36, 0.45)`).
- **Theme 4: Midnight Cinema Obsidian Slate**:
  - Background: `#06080f`, Surface: `#0c101a` / `#111624`, Accent: `#e50914`.
  - Multi-radial gradients (Blue at top left, Red at top right, Deep Slate at bottom).
- **Keyframe Animations Suite**:
  - `@keyframes atvFadeUp`: Opacity $0 \to 1$, $Y$-translation $14\text{px} \to 0$, scale $0.99 \to 1$.
  - `@keyframes atvHeroReveal`: Opacity $0 \to 1$, scale $1.03 \to 1$.
  - `@keyframes atvGridExpand`: Opacity $0 \to 1$, $Y$-translation $-6\text{px} \to 0$.
  - `@keyframes fluidSectionEnter`: Section entry animation ($18\text{px} \to 0$, $0.48\text{s}$).
  - `@keyframes fluidPulseGlow`: Glow cycle between scale 1.0 and 1.06.
  - `@keyframes atvSpecularSweep`: Shimmer sweep $X$-translation from $-130\%$ to $220\%$ skewed $-22^\circ$.
  - `@keyframes atvCardFloatIn`: Card float-in ($22\text{px} \to 0$, scale $0.96 \to 1$).
  - `@keyframes atvGlowPulse`: Dual-glow pulse switching between Rose (`#e11d48`) and Amber (`#f59e0b`).
- **Hardware Acceleration & Virtualized Render Performance**:
  - Targets `#jtvChannelGrid > div`, `#sportsGrid > div` (Note: Verified ID is `#sportsGrid`, not `#sportsCatalogGrid`), `#liveNowEventsGrid > div`.
  - Applied properties: `backface-visibility: hidden; -webkit-backface-visibility: hidden; transform: translateZ(0); content-visibility: auto; contain-intrinsic-size: auto 240px;`.
- **Ultra-Mobile Cinema Mode (Landscape Optimization)**:
  - `@media (max-height: 520px) and (orientation: landscape)` removes header, navigation pills, and episode drawers to make `#cinemaPlayerWrapper` 100vw × 100vh with 0 margin/padding.
- **Scroll Physics, Scripts & External Asset Inclusions**:
  - `_lucidePendingRoots` Set flushes icons once per frame via `requestAnimationFrame` to eliminate UI stuttering during infinite shelf rendering.
  - Spatial TV D-Pad Navigation: `<script src="/assets/tv-navigation.js" defer></script>`.
  - Search acceleration: `<script src="/search_launcher.js"></script>`.
  - Local AI styling & drawer: `<link rel="stylesheet" href="/local-ai.css">` and `<script src="/local-ai.js"></script>`.
  - Background Mesh Injectors: `/bg-inject.js` and `/background_injector.js`.
  - Console warning suppressor overrides `console.warn` to silence Tailwind CDN notices.
  - End-of-file scripts: `/watchdog.js` (Maintenance watchdog), `/party-mode.js?v=7.0` (Watch Party), `/consumet_ai_recommendations.js` (Personalized AI recommendations).

### 3. Persistent Chrome & Navigation Components
- **Mobile Floating Top Header Actions (`md:hidden fixed top-3 ...`)**:
  - Left floating button: `handleMobileGoBack()` returning to Hero Portal (`/hero.html`).
  - Right floating button: `openSearchPalette()` launching fullscreen Search Studio.
- **Desktop Floating Navbar (`#mainNavBar` / `header`)**:
  - Wordmark linking to `/hero.html` with pulse indicator and `PRO 2.0` badge.
  - Category buttons: `Home`, `Movies`, `Series`, `Anime`, `Live Now` (with pulsing sky dot), `Sports`, `Live TV`, `Watchlist`, `Guide`.
  - External Anchor: `<a href="/music.html" class="atv-nav-pill ...">Music</a>` (Direct link, not a tab switcher).
  - Utility buttons: `AI Vault` (`#btn-header-ai-vault`), `Search` (`Ctrl+K`), `Watch Party` (`#btn-header-party`), `Install App` (`#pwaInstallHeaderBtn`), `Browse All` drawer toggle (`#btn-header-mob-menu`), and `Hero Portal Back` (`#btn-header-hero-back`).
- **Mobile Bottom Dock (`#mobileBottomDock`)**:
  - Fixed dock pinned to bottom with `env(safe-area-inset-bottom)`.
  - Pointers: Back (`handleMobileGoBack`), Home, Anime (`#mob-tab-anime`), Live TV (`#mob-tab-livetv`), Live Now (`#mob-tab-livenow` with pinging flame), and All Sections AI Drawer (`#mob-tab-more`).
- **All-Sections Drawer Sheet (`#mobSectionsDrawer`)**:
  - Off-canvas modal containing full-width AI Vault Copilot card, followed by quick links to all categories, genres, and PWA install trigger.

### 4. View 1: `#view-home` (Cinema Hub - Master Shelves Catalog)
- **Hero Spotlight Slider (`#heroSliderContainer`)**: 7.0s auto-rotating billboard (`spotlightInterval`) with high-res PNG title logos, YouTube background video loop, synopsis, ratings, and instant actions. Auto-pauses when scrolled past 650px or when page is hidden.
- **Dual Continue Watching Shelves**:
  - **Row A (Active OTT Carousel)**: `#watchHistoryContainer` and `#watchHistoryShelf` with remaining time, progress bar, `clearWatchHistory()`, and item remove buttons.
  - **Row B (Secondary / Fallback Shelf)**: `#continueWatchShelf`, `#continueWatchShelfTitle`, and `#continueWatchGrid`.
- **Top 10 Shelves**: Top 10 Today (`#top10Shelf`) and Top 10 in India (`#top10IndiaShelf`) with giant gradient rank numerals.
- **AI Personalized Recommendations (`#aiRecommendedContainer` & `#aiRecommendedGrid`)**: Shows match percentage (`#aiTasteMatchBadge`, e.g. 98% Match Rate), dynamic taste profiling chip, filter pills (`All`, `Movies`, `Series`, `Anime`, `Live Sports`), and re-tune trigger button.
- **Embedded EPG States within View 1**:
  - Timelines container: `#homeTimelinesContainer` (rendered at bottom of home).
  - Loading & empty states: `#epgLoadingState` and `#epgEmptyState`.
- **10 Master Balanced Indian & Hollywood Subsections**:
  1. Pan-India 4K Mega Blockbusters (`#homeIndianBlockbustersShelf`)
  2. Hollywood Premieres & Global Masterpieces (`#homeHollywoodBlockbustersShelf`)
  3. Desi Crime Underworld & Gritty Web Series (`#homeIndianCrimeSeriesShelf`)
  4. Prestige HBO & Global Flagship Drama Series (`#homeGlobalPrestigeSeriesShelf`)
  5. South Indian High-Octane Action Vault (`#homeSouthActionVaultShelf`)
  6. Marvel & DC Superhero Multiverse Showcase (`#marvelDcShelf`) with 3 quick search presets targeting `'player1'`: MCU Phase 5 (`searchAndPlayItem('Avengers', 'player1')`), Gotham City (`searchAndPlayItem('Batman', 'player1')`), Spider-Verse (`searchAndPlayItem('Spider-Man', 'player1')`)
  7. Bollywood Romantic Epics & Timeless Family Classics (`#homeBollywoodClassicsShelf`)
  8. Mind-Bending Sci-Fi & Deep Space Odyssey (`#homeHollywoodScifiShelf`)
  9. Critically Acclaimed Indian Cinema & National Award Gems (`#homeIndianAcclaimedShelf`)
  10. Oscar-Winning Masterpieces & All-Time Cinematic Legends (`#homeOscarLegendsShelf`)
- **Regional & Genre Shelves**:
  - Trending Movies (`#trendingMoviesShelf`), Popular TV Shows (`#trendingSeriesShelf`), New Releases in India (`#newReleaseIndiaShelf`), Bollywood Blockbusters (`#bollywoodShelf`), Malayalam Cinema Masterpieces (`#malayalamShelf`), Tamil Cinema Hits (`#tamilShelf`), Telugu Cinema Blockbusters (`#teluguShelf`), Kannada Cinema (`#kannadaShelf`), Latest Hindi Cinema (`#hindiShelf`), Hollywood Action Blockbusters (`#hwActionShelf`), Hollywood Sci-Fi & Adventure (`#hwScifiShelf`), Top Rated Masterpieces (`#topRatedShelf`), Trending Anime & Asian Drama (`#animeShelf`), Hollywood Premieres (`#hollywoodShelf`), Sci-Fi & Cyberpunk (`#scifiShelf`), Korean Drama & K-Series (`#koreanShelf`), Comedy & Feel-Good (`#comedyShelf`), Horror & Thriller Vault (`#horrorShelf`), Documentaries & Docuseries (`#documentaryShelf`), Timeless Cinema Classics (`#classicShelf`), Kids & Family Animation (`#kidsShelf`), Award Winners & Festival Gems (`#awardShelf`).
- **IMDb Direct Fetcher Banner**: Direct input `#imdbFetcherInput` allowing users to paste any IMDb URL or ID (`tt1234567`) invoking `fetchIMDbItem()` to resolve and play immediately.

### 3. View 2: `#view-movies` (Movies Catalog)
- **Filter Toolbar**:
  - Genre Select (`#movies-genre` onchange `applyFilters('movies')`): All, Action (`28`), Comedy (`35`), Drama (`18`), Sci-Fi (`878`), Thriller (`53`).
  - Year Select (`#movies-year`): All, `2024`, `2023`, `2022`.
- **Default Themed Home Shelves Layout (`#moviesHomeLayout`)**:
  - 10 Themed Movie Shelves: `#moviePanIndiaShelf`, `#movieHwActionShelf`, `#movieSouthCinemaShelf`, `#movieHwScifiShelf`, `#movieIndianCrimeShelf`, `#movieHwCrimeShelf`, `#movieIndianComedyShelf`, `#movieHwHorrorShelf`, `#movieIndianHistoricalShelf`, `#movieHwAcclaimedShelf`.
- **Catalog & Search Filter Grid (`#moviesCatalogLayout` & `#moviesGrid`)**:
  - Toggled visible when filters or search queries are applied, hiding `#moviesHomeLayout`.

### 4. View 3: `#view-tv` (Television Series Catalog)
- **Filter Toolbar**:
  - Genre Select (`#tv-genre` onchange `applyFilters('tv')`): All, Action & Adventure (`10759`), Drama (`18`), Comedy (`35`), Crime (`80`), Sci-Fi & Fantasy (`10765`).
  - Year Select (`#tv-year`): All, `2024`, `2023`, `2022`.
- **Default Themed TV Shelves Layout (`#tvHomeLayout`)**:
  - 10 Themed TV Shelves: `#tvIndianTopSeriesShelf`, `#tvHwPrestigeDramaShelf`, `#tvIndianCrimeShelf`, `#tvHwScifiShelf`, `#tvIndianComedyShelf`, `#tvHwEspionageShelf`, `#tvIndianMythologyShelf`, `#tvHwDarkFantasyShelf`, `#tvIndianRomanceShelf`, `#tvHwSitcomShelf`.
- **Catalog & Search Filter Grid (`#tvCatalogLayout` & `#tvGrid`)**:
  - Toggled visible when TV filters are active, hiding `#tvHomeLayout`.

### 5. View 4: `#view-sports` (Sports Central)
- **Instant 0ms Fast Boot (`_defaultInstantSportsChannels`)**: Loads Star Sports 1 HD MDTV, Sony Sports Ten 1 HD MDTV, Sky Sports Main Event 4K, Sky Sports F1 UHD, Willow Cricket HD, and DD Sports HD immediately to eliminate blank screen lag on mobile.
- **Parallel Multi-Source Ingestion Pipeline (`loadSportsChannels`)**: Executes non-blocking `Promise.all` with 4.5s timeouts across TimStreams (`/api/sports/timstreams/channels`), Proxy Streams, Showcase Containers (`/api/sports/containers`), Hub Config, Admin Sports, `/sports.m3u` parser, and Live Events.
- **Sports Hero Spotlight Billboard (`renderSportsSpotlight`)**:
  - 6.5s auto-rotating billboard (`sportsSpotlightInterval`) paused on background tab or scroll offset $>650\text{px}$.
  - Multi-tier priority waterfall: Admin Studio Overrides $\rightarrow$ Admin Live Events $\rightarrow$ FanCode real matches $\rightarrow$ SonyLIV real matches $\rightarrow$ Willow live matches $\rightarrow$ Prime Video $\rightarrow$ Flagship marquee channels backfill.
  - Athlete player PNG cutouts (`playerPng`) on the right margin with drop shadow.
- **IPL 2026 Full Match Replays VOD Archive (`loadIplReplays`)**:
  - 146 full match replays in 2:3 vertical portrait cards with match number badge, teams, and replay indicator.
  - Language filters: All, English (`#iplFilterEn`), Hindi (`#iplFilterHi`).
- **Showcase Studio Containers Engine (`renderShowcaseContainers`)**:
  - Admin-configured custom broadcast clusters with 5 dynamic layout styles: `shelf` (horizontal carousel), `grid` (bento grid), `glass_cards`, `compact_chips`, and `spotlight` (3-column layout).
  - Deep-link URI support: `?container=asian_games` triggers auto-scroll and 3s glowing gold focus ring (`activateAsianGamesContainer`).
  - Web Speech API voice search (`toggleSportsVoiceSearch`): speech-to-text recognizing "Asian Games" and focusing container.
- **User Custom M3U & Stream Manager**:
  - `saveUserCustomSportsM3u`, `deleteUserCustomSportsM3u`, and `renderUserCustomSportsChips` persisted to `localStorage.user_custom_sports_m3u_list`.
- **249+ Channels Directory Grid (`renderChannelsDirectoryGrid`)**:
  - Filter by Genre: All, Sky, Football, BeIN, F1, Cricket, US, Entertainment, Regional, 4K.
  - Heart toggle (`toggleSavedSport`) syncing to `localStorage.stalker_saved_sports`.
  - Channel XMLTV EPG dialog launcher (`openEpgChannelModal`).
- **12 Categorized Shelves**: Star Sports HD, Sony Sports HD, Football/Soccer, Cricket Arena, Formula 1 & Motorsport, US Major Leagues (NBA/NFL/MLB), Combat Sports (UFC/WWE), HBO Sports, 4K Ultra HD Sports, Regional Feeds (Malayalam News, Entertainment, Movies), Kids Sports.

### 6. View 5: `#view-livetv` (Master Linear TV Directory)
- **4 Master Source Providers Switcher (`switchLiveTvCatalog`)**:
  1. **JioTV (`/api/jtv/channels`)**: 1,324+ live television channels with dynamic W3C ClearKey DASH manifests (`/api/jtv/manifest/:id.mpd`) and direct HLS failovers for SonyLIV and Hotstar feeds.
  2. **SportLink (`/api/sportlink/channels`)**: Multi-server live match broadcasts with DASH ClearKey and HLS server failovers (Servers 1–4).
  3. **All Channels (SM-IPTV) (`/api/allchannels/channels`)**: Aggregated 24/7 master television network catalog (15-min auto-refresh).
  4. **Live.m3u (`/api/livem3u/channels`)**: Auto-updating GitHub M3U event playlist (refreshed every 25 minutes) with DASH (ClearKey DRM) & HLS.
- **Sticky Category Pills Navigation (`renderLiveTvCategoryPills`)**:
  - Dynamic channel count per category badge.
  - Entertainment, Movies, Sports, News, Music, Kids, Infotainment, Devotional, Regional (Hindi, Malayalam, Tamil, Telugu, Kannada, Bengali, Marathi, Punjabi).
- **Dense OTT Channel Grid (`renderLiveTvChannelsGrid`)**:
  - Small, tight, responsive 4:3 aspect ratio channel tiles (3 to 8 columns).
  - Lazy rendering with `jtvDisplayLimit` (default 120 items).
  - Auto-scrolling infinite pagination via `IntersectionObserver` on `#jtvLoadMoreSentinel` (rootMargin 300px).
  - Multi-server smart router: Single-feed channels launch direct full-screen player; multi-server or SportLink items open `#sportsMatchOvalModal` for explicit source selection.

### 7. View 6: `#view-livenow` (Glacier Sapphire Live Stadium)
- **Live Clock & Status Indicator**: Real-time IST clock ticker, dynamic live count badges (`#liveNowLiveCountText` and `#sportsLiveNowActiveBadge`).
- **Live Search & Network Filters**:
  - Provider Pills: All, SonyLIV, Willow TV, FanCode, Prime Video, TimStreams, SportLink, Live.m3u, ClearKey HD, Added Channels, MDTV, Fixtures, Containers.
  - Sport Pills: All, Cricket, Football, Formula 1, Tennis, Combat, Basketball, NFL, Baseball, Added.
  - Status Filters: All, LIVE (pulsing dot), Starting Soon.
- **Flagship Hero Spotlight Billboard** (`#liveNowHeroSpotlight`):
  - Intelligent multi-pool algorithm (`getSpotlightEventImportance`) that selects the top marquee matchup from each of the Big 4 providers (Sony, Willow, FanCode, Prime).
  - Special Willow priority logic: live Team India matches always get absolute precedence; future-dated matches never preempt live active events.
  - Widescreen stage with dynamic team/tournament backdrop, stadium lighting blur, player cutout PNG, and mobile swipe carousel (`touchstart`/`touchend` with horizontal delta $>40\text{px}$).
  - Admin Spotlight Override support via `_spotlightStudioPublic.spotlightStudio.liveNowSpotlight`.
- **Netflix Sports Cards (`createNetflixSportCard`)**:
  - Full-bleed 16:10 poster frame with zero letterbox black bars.
  - Direct multi-source switcher bar on card thumbnail (`[Sources: S1 (Primary) | S2 (Backup) | +X]`).
  - Pulsing red LIVE indicator, network provider pill, league tag, and instant "Score" button.
- **Curated Multi-Network Rows** (`#liveNowEventsContainer`):
  - Live Now (Matches & Events) — strictly filters out ended fixtures, dummy test feeds, and static 24/7 channels.
  - SonyLIV Live & Upcoming (auto-merges backup streams onto parent match cards).
  - Willow Cricket Network (dedicated cricket feed aggregator with marquee India/Pak/Aus sorting).
  - FanCode 1080p Broadcasts (with signed Akamai tokens and direct backup switcher).
  - Amazon Prime Video Live Sports.
  - TimStreams Live Matches & 24/7 Channels (XOR cipher deobfuscated feeds).
  - SportLink Multi-Stream Servers (Servers 1–4 with DASH/HLS failovers).
  - Live.m3u Direct Feeds (kept standalone, never mixed as backups into other providers).
  - World-Class Sports Networks (Star Sports 1–3 HD, Sony Ten 1–5 HD, Fox Sports, Sky Sports Main Event, ESPN, Willow, DAZN).

### 8. View 7: `#view-anime` (Anime Universe Hub)
- **Anime Spotlight Slider** (`#animeHeroSliderContainer`): Popular anime billboard combining AniList GraphQL, Jikan v4, and Kitsu with auto-rotation (7.0s interval / `7000ms`) and smooth cross-fade.
- **Top 10 Anime Today** (`#animeTop10Shelf`): Ranked 1–10 carousel with large gradient numeral overlays and popularity badges.
- **Weekly Anime Broadcast Schedule Radar** (`#animeScheduleSection`):
  - Day-by-day tabs: Today (`#schedTab-today`), Mon–Sun (`#schedTab-monday`, etc.), and custom HTML5 date picker (`#animeScheduleDatePicker`).
  - Converts JST (Japan Standard Time, UTC+9) broadcast schedules to local device time with live countdown clocks ("Airings in 2h 15m").
  - 5-tier resilience fallback: Jikan v4 $\rightarrow$ AniList GraphQL $\rightarrow$ Kitsu Edge $\rightarrow$ TMDB Discover $\rightarrow$ `consumet_master_anime_list` local cache.
- **One Piece Master Universe & Trilogy Matrix** (`#onePieceCardsGrid`):
  - Curated canonical saga cards: Film RED (TMDB 900667), Stampede (531309), Film Gold (360814), TV Series Continuum (37854, 1100+ episodes), Film Z (148348), and Strong World (30219).
  - Dynamic live arc & character search (`#onePieceSearchInput`, `searchOnePieceUniverse`): instant TMDB `search/multi` lookup with anime filter for any query ("Egghead", "Wano", "Luffy", "Gear 5", "Zoro").
- **Anime Multi-Provider Catalog Engine** (`#animeProviderGrid`, `switchAnimeProvider`):
  - Provider buttons (`.anime-prov-btn`), status label (`#animeProviderStatus`), and search input (`#animeProviderSearchInput`).
  - **AnimeSalt** (`/api/anime/stream?title=...&season=...&episode=...`): Direct M3U8 extraction with audio preference toggle (`window._playerAudioMode` for SUB vs English DUB) redirecting to `/play_bingr.php?srv=animesalt`.
  - **RareAnimes** (`/api/rareanimes/stream?title=...`): Scrapes direct Hindi Dubbed embeds and M3U8 links redirecting to `/play_bingr.php?srv=ranime`.
  - **AniList**: High-speed GraphQL queries for trending and airing anime.
  - **Kitsu Edge**: Trending anime and genre lists.
  - **Jikan v4**: Seasonal anime directory.
- **10 Curated Anime Genre Shelves**: Top Rated Anime, Trending Shonen, Supernatural & Dark Fantasy, Romance & Shoujo, Isekai & Reincarnation, High-Octane Fighting, Cozy Slice of Life, Sci-Fi & Mecha, Sports Anime, Classics Vault.

### 9. View 8: `#view-epg` (Electronic Program Guide)
- **Network Switcher Tabs**: Star Sports (`#epgTab-star`), Sony Sports (`#epgTab-sony`), All Sports (`#epgTab-sports`), All Channels (`#epgTab-all`).
- **Dual Display Modes** (`toggleEpgView`):
  - **Timeline Grid Mode** (`#epgTimelineViewContainer`, `#epgViewBtnTimeline`): Horizontal multi-channel timeline showing current and upcoming shows aligned to the time axis.
  - **Cards Grid Mode** (`#epgGuideContainer`, `#epgCardsGrid`, `#epgViewBtnCards`): Responsive channel cards displaying current program with progress bar and up-next previews.
- **Live Program Progress Engine**:
  - Dynamically calculates on-air percentage:
    $$\text{progressPct} = \min\left(100, \max\left(5, \text{round}\left(\frac{\text{now} - \text{startTime}}{\text{endTime} - \text{startTime}} \times 100\right)\right)\right)$$
  - Renders animated progress bar, human-readable start/end timestamps, and remaining minutes ticker ("35m remaining").
- **EPG Program & Channel Modals**:
  - `#epgProgramModal`: Detailed program synopsis, category badge, start/stop times, and direct "Tune In Now" button launching the live channel.
  - `#epgChannelModal`: Comprehensive 24-hour program schedule for the specific TV channel.

### 10. View 9: `#view-watchlist` & Continue Watching Engine (`#view-watchlist`, `renderWatchHistory`)
- **Continue Watching / Watch History Row**:
  - Stored in `localStorage.consumet_watch_history` (capped at 25 items via `history.slice(0, 25)`).
  - Tracks `currentTime`, `duration`, `percentage`, `season`, `episode`, and `lastUpdated`.
  - Displays remaining runtime ("28m left") and gradient progress bar.
  - **Smart Router (`openDetailsModal`)**:
    - Live Sports / Channel items (`_isSportsOrLiveHistoryItem`): directly bypasses modal and opens `openFullscreenPlayer` or switches to `livenow` tab with instant playback.
    - Anime items: opens anime card stream modal.
    - VOD Movies & TV: sets `window._resumeTargetTime = item.currentTime`, auto-seeking player to exact second on playback start.
  - **Sports Thumbnail Hydrator (`_resolveHistorySportsThumb`)**: Automatically resolves team/network logo if poster is missing.
- **Personal Watchlist Library**:
  - Stored in `localStorage.stalker_watchlist`.
  - Layout consists of title, "Clear All" button (`clearWatchlist()`), and `#watchlistGrid` (Note: Verified that code contains direct grid without sub-tabs).
- **Universal Desktop Drag-to-Scroll Engine (`_initScrollAndHistoryEngine`)**:
  - Event-delegated `mousedown`, `mousemove`, `mouseup`, and `mouseleave` listeners attached to all horizontal carousels (`.scroller-container`, `div[id$="Shelf"]`).
  - Applies $1.4\times$ drag multiplier with mouse inertia for smooth desktop horizontal dragging.
  - Dynamically appends Back-to-Top button (`#backToTopBtn`) when page scroll offset $> 450\text{px}$.

### 11. View 10: `#view-search` & Fullscreen Search Studio (`#searchPalette`)
- Triggered by `Cmd/Ctrl + K` or search icons.
- Input elements: `#searchInput`, loading spinner `#searchSpinner`, clear button `#searchClearBtn` (`clearSearchInput()`), hidden source selector `#searchEngineSource`, and segmented filter pills (`.search-filter-pill` for All, Movies, TV, Anime, Sports, Channels).
- Instant 200ms debounced multi-pool searching across TMDB, Anime APIs, Live Events, Sports Channels, and JioTV with instant O(1) in-memory local preview.
- **Dedicated Sports Hub Search Studio (`#sportsSearchResultsSection`)**:
  - When user searches within Sports Hub, renders dedicated live search layout: `#sportsSearchEventsContainer`, `#sportsSearchEventsBadge`, `#sportsSearchEventsShelf`, `#sportsSearchIplContainer`, `#sportsSearchIplBadge`, `#sportsSearchIplShelf`, `#sportsSearchChannelsHeader`, `#sportsSearchChannelsBadge`, and `#sportsSearchEmptyNotice`. Cleared via `clearSportsSearch()`.

### 12. View 11: `#view-player` (Theater Video Player)
- **Top Header**: Title label, subtitle badge (SUB/DUB, Season/Episode, Live indicator), Close button.
- **Player Thumbnail Preview & Loading State**:
  - `#fullscreenPlayerPlaceholder` with `#placeholderThumbPreview` and category badge `#fullscreenPlaceholderCategoryBadge`.
  - Dynamic thumbnail wrapper `#playerThumbWrapper` and image `#playerThumbImg` with error fallback handler `handlePlayerThumbError()`.
- **Player Container**: Dynamic switching between native video element (`#fullscreenNativePlayer` via Hls.js / Dash.js / ClearKey) and sandboxed responsive iframe (`#fullscreenIframe`).
- **Audio Switcher**: Toggle between SUB (Japanese/Original) and DUB (English/Hindi) via `setPlayerAudioMode(mode)` restyling `#btnPlayerSub` and `#btnPlayerDub`.
- **Server Selector**: Dropdown supporting 8+ server clusters:
  1. `vidlink_pro` (Fastest, zero ads)
  2. `vidsrc_pm`
  3. `vidsrc_to`
  4. `vidrift`
  5. `twoembed`
  6. `smashystream`
  7. `cinezo`
  8. `filmu` / `vidly`
- **In-Player Episode Navigator & Recommendations**:
  - Season dropdown `#playerSeasonSelector` triggering `changePlayerSeason()`.
  - Episode container `#playerUpNextContainer` and list `#playerEpisodesList` populated via `populatePlayerEpisodes()`.
  - TV controls `#tvEpisodeControls` with previous episode (`playPreviousEpisode()`) and next episode (`playNextEpisode()`).
  - Recommendations shelf `#playerRecommendationsContainer` and `#playerRecsShelf` populated via `populatePlayerRecommendations()`.

---

## 3. Modals and Drawers Hierarchy

| Modal ID | Component Name | Purpose & Features |
|---|---|---|
| `#detailsModal` | Media Details Dialog | Apple TV+ style modal. YouTube trailer background loop (`#trailerBgIframe`), interactive YouTube volume/mute controls (`#detailsTrailerControls`, `#detailsTrailerPlayIcon`, `#detailsTrailerMuteIcon`), title PNG logo image (`fetchTMDBLogo`), technical badges (4K UHD, Dolby Atmos, HDR10, IMAX Enhanced, Original Audio, Upcoming Episode countdown alert `#detailNextEpisodeAlert`, IMDb rating badge `#imdbBadge`), 8 action buttons (`detailsPlayBtn`, `#detailsPlayLatestBingBtn`, `btn-play-hls`, `btn-party-modal-media`, `btn-play-torrent`, `btn-play-trailer`, `btn-watchlist-toggle`, `btn-share-details`), Season/Episode navigator (`#tvNavigator` with season dropdown, episode search `#episodeSearchInput` with clear `#episodeSearchClearBtn`, sort toggle `#episodeSortLabel`, and List vs Grid view toggles `#btnEpisodeViewList` / `#btnEpisodeViewGrid`), Cast & Crew horizontal scroller (`#detailCast` with count badge `#detailCastCountBadge`), and technical specifications grid. |
| `#inlinePersonDrawer` | Inline Actor Detail Drawer | Fast slide-out actor profile drawer. Renders actor profile photo `#inlinePersonPhoto`, actor name `#inlinePersonName`, character role in title `#inlinePersonRoleInTitle`, metadata pill `#inlinePersonMeta`, biography `#inlinePersonBio`, top 20 cast credits grid `#inlinePersonCreditsGrid`, and back trigger `#inlinePersonBackBtnText` with `closeInlinePersonDrawer()` restoring scroll to `#detailCast`. |
| `#personDetailsModal` / `#personModal` | Global Actor Profile Modals | Dual persona modal architecture. `#personDetailsModal` (lines 2909–2938) and `#personModal` (lines 3064–3116) share conflicting `id="personName"`. Contains actor photo (`#personProfilePhoto`), biography clamp (`#personBio`), department (`#personDepartment`), credit count badge (`#personCreditsCountBadge`), and filmography grid (`#personCreditsGrid`) sorted by popularity. |
| `#sportsMatchOvalModal` | Match Center Showcase | 3-tab broadcast arena modal (`openSportMatchOvalModal(eventId, initialTab)`): **Header Stadium Banner** (`buildSportsModalBannerHtml`, `#sportsModalVsBanner`) with sport emoji `#sportsModalSportEmoji`, sport name `#sportsModalSportName`, status `#sportsModalStatusBadge`, league `#sportsModalLeagueBadge`, and team logos (`KNOWN_TEAM_LOGOS`). **Tab 1: Match Info** (`#sportsModalTabBtnInfo`, `#sportsModalContentInfo`) with tournament `#sportsModalInfoTournament`, IST time `#sportsModalInfoTimeIST`, status `#sportsModalInfoStatus`, duration `#sportsModalInfoDuration`, broadcaster `#sportsModalInfoBroadcaster`, and live commentary `#sportsModalInfoSummary`. **Tab 2: Scorecard** (`#sportsModalTabBtnScore`, `#sportsModalContentScore`, `#sportsModalScoreBody`): Cricket (inning breakdown, CRR, RRR, active batsmen with runs/balls/4s/6s/SR, active bowler with overs/maidens/runs/wickets/econ, recent balls strip with colored dot/boundary/wicket badges); Football (scores, team form badges W/D/L, ball possession % bar, shots, shots on target, corners, fouls, and match moments timeline). Supported by background 15s poller (`_scorecardPollInterval`) calling `/api/sports/match-score`. **Tab 3: Watch Feeds** (`#sportsModalTabBtnWatch`, `#sportsModalContentWatch`, `#sportsModalChannelsList`, `#sourcesProbeStatusText`, `#sourceLiveBadge_${idx}`, `#cardSportSource_${idx}`, `#btnPlaySource_${idx}`) with reachability latency probe `probeModalSportSources` via `POST /api/sports/probe-sources`, and primary auto-wired play button `#sportsModalPrimaryPlayBtn`. Closed via `closeSportMatchOvalModal()` which safely halts `_scorecardPollInterval`. |
| `#searchPalette` | Fullscreen Search Studio | Triggered by `Cmd/Ctrl + K` or search icons. 200ms debounced multi-pool searching across TMDB, Anime APIs, Live Events, Sports Channels, and JioTV with instant O(1) in-memory local preview. Segmented filters: All, Movies & Series, Anime, Live Sports, TV Channels. |
| `#epgProgramModal` | EPG Program Details | Show timing (`#epgModalTime`), category (`#epgModalCategory`), description (`#epgModalDesc`), title (`#epgModalTitle`), channel (`#epgModalChannel`), and direct tune container `#epgModalPlayBtnContainer`. |
| `#epgChannelModal` | EPG Channel Schedule | 24-hour XMLTV timeline for the selected channel with channel logo `#epgChannelModalLogo`. |
| `#trailerModal` | Standalone Trailer Viewer | Clean YouTube trailer modal with nocookie player (`#trailerIframe`) closed via `closeTrailerPopup()`. |
| `#mobSectionsDrawer` | Mobile Navigation Drawer | Quick drawer on mobile devices with links to all categories and AI Vault (`#mobSectionsDrawerContent`). |

---

## 4. Complete Global State & Storage Schema

### 1. Window State Variables (`window.*`)
```typescript
// Active Navigation & Routing
window.activeTab: 'home' | 'movies' | 'tv' | 'sports' | 'livetv' | 'livenow' | 'anime' | 'epg' | 'watchlist' | 'player';

// Media Selection
window.selectedMedia: any;            // Active item in details modal or player
window.selectedSeason: number;         // Active TV series season (default: 1)
window.selectedEpisode: number;        // Active TV series episode (default: 1)
window.currentDetail: any;             // Full TMDB response object with credits and videos

// Live Sports Catalogs
window.allSportsChannels: any[];       // Master pool of sports channels & feeds
window.liveNowEvents: any[];           // Streamic & multi-source sports matches
window.lastFilteredLiveEvents: any[];  // Current active filtered sports list
window.liveNowActiveSource: string;    // 'all' | 'sonyliv' | 'willow' | 'fancode' | 'prime' | 'timstreams' | 'sportlink' | 'livem3u'
window.liveNowActiveSport: string;     // 'all' | 'cricket' | 'football' | 'f1' | 'combat' | 'basketball'
window.liveNowActiveStatus: string;    // 'all' | 'live' | 'upcoming'
window.currentSportModalEvent: any;    // Event currently open in #sportsMatchOvalModal
window.sportsHighlights: any[];        // Video highlights from /api/sports/highlights
window.zeeChannels: any[];             // Zee Cloudfront streams

// Provider Matches Pools
window.fancodeLiveMatches: any[];      // Matches from /api/fancode/live
window.sonylivLiveMatches: any[];      // Matches from /api/sonyliv/live
window.willowLiveMatches: any[];       // Matches from /api/willow/events
window.primeLiveMatches: any[];        // Matches from /api/prime/events
window.timStreamsEvents: any[];        // Events from /api/tim/events
window.timStreamsList: any[];          // 24/7 channels from /api/sports/timstreams/channels
window.footlinksLiveMatches: any[];    // Matches from /api/sportlink/channels
window.liveM3uEvents: any[];           // Feeds from /api/livem3u/events
window.iplReplaysData: any[];          // 146 IPL matches from /api/sports/ipl-replays

// Live TV Catalogs
window.liveTvCurrentSource: 'jiotv' | 'sportlink' | 'allchannels' | 'livem3u';
window.jtvAllChannels: any[];          // 1,324+ JioTV channels from /api/jtv/channels
window.jtvCategoriesList: any[];       // JioTV genre categories
window.jtvActiveCategory: string;      // Selected JioTV genre
window.jtvDisplayLimit: number;        // Lazy rendering threshold (default: 120)
window.sportlinkAllChannels: any[];    // SportLink channels catalog
window.allChannelsList: any[];         // SM-IPTV combined catalog
window.liveM3uAllChannels: any[];      // GitHub Live.m3u catalog

// Anime Catalogs
window._masterAnimeList: any[];        // Pooled anime from AniList, Jikan, Kitsu
window.currentAnimeProvider: string;   // 'animesalt' | 'rareanimes' | 'anilist' | 'kitsu' | 'jikan'
window._animeProviderCache: Record<string, any[]>; // 0ms cache for anime providers

// EPG Catalogs
window.allEpgChannelsList: any[];      // EPG timeline channels from /api/epg/timeline
window.epgActiveNetwork: 'star' | 'sony' | 'sports' | 'all';
window.epgSearchQuery: string;

// Player & Streaming
window._playerAudioMode: 'sub' | 'dub';// Subbed vs Dubbed audio preference
window.activeStreamUrl: string;        // Currently playing direct video stream URL
window._sportsProbeCache: Map<string, { alive: boolean; latencyMs: number; time: number }>;

// Client Caches, LRU & Performance Maps
window._tmdbClientCache: Map<string, any>; // 200-item LRU/FIFO memory cache for TMDB responses
window._detailsDataCache: Record<string, any>; // Memory cache for full media details with append_to_response
window._seasonEpisodesCache: Record<string, any[]>; // Memory cache for TV seasons/episodes (${id}_s${season})
window._detailsPrefetchInFlight: Set<string>; // Set of in-flight prefetch requests to prevent duplicate network calls
window._searchMemoryCache: Map<string, any>; // 200-capacity LRU cache for search queries
window._mediaQuickCache: Record<string, any>; // Lightweight fast-lookup media metadata
window._logoCache: Record<string, string>; // Cached transparent PNG logo URLs
window._fallbackPool: Record<string, any>; // 10 hardcoded offline fallback payloads (Dune 2, Oppenheimer, Deadpool & Wolverine, Inside Out 2, Alien: Romulus, GoT, HotD, The Bear, Severance, Stranger Things)

// Interaction, Touch & Timer Flags
window._touchStartX: number;           // Touch start X-coordinate for gesture guard
window._touchStartY: number;           // Touch start Y-coordinate for gesture guard
window._lastSwipeTimestamp: number;    // Epoch timestamp of last touch swipe (350ms anti-redirect guard)
window._scorecardPollInterval: number | null; // 15-second background poller timer ID
window._lastSportsChannelsFetch: number;// Timestamp of last sports catalog fetch (180s staleness check)
window._lastSportsScheduleFetch: number;// Timestamp of last sports schedule fetch (120s staleness check)
window.deferredPwaPrompt: any;         // Captured beforeinstallprompt event for PWA installation
window._lucidePendingRoots: Set<Element>; // Batched set of DOM roots awaiting requestAnimationFrame icon render
window.openModalsCount: number;        // Global modal counter controlling body scroll lock and Lenis animation
window._trailerKeyCache: Record<string, string>; // YouTube trailer key memory lookup cache
window.currentSpotlightTrailerKey: string; // Active trailer key for home hero background video loop
window.liveNowSpotlightIndex: number;  // Current index in Glacier Sapphire hero billboard
window.liveNowSpotlightPoolLength: number; // Length of Live Now spotlight pool for swipe physics
window._liveNowSubsectionItems: Record<string, any[]>; // Accordion items hash map for Live Now categories
window._liveNowExpandedSet: Set<string>; // Set of expanded category rows in Live Now
window.liveNowShowcaseContainers: any[]; // Custom admin broadcast showcase stages for Live Now
window.sonylivUpcomingMatches: any[];  // Upcoming SonyLIV match fixtures array
window._sportsSubsectionItems: Record<string, any[]>; // Sports subsection items cache
window._sportsExpandedSet: Set<string>; // Set of expanded category rows in Sports Hub
window._sportsRecognizer: any;         // Web Speech API recognition instance for voice search
window.searchTimeout: any;             // 200ms debounce timer identifier for Search Studio
window.searchAbortController: AbortController | null; // Abort controller to cancel in-flight search fetches
window._detailsRequestCounter: number; // Monotonic request counter preventing modal opening race conditions
window.currentSeasonEpisodes: any[];   // Active season's episode list array for dynamic filtering and sorting
window.episodeSortAscending: boolean;  // Sort direction toggle (true = 1-N, false = N-1)
window.episodeViewMode: 'list' | 'grid'; // Episode layout mode toggle
window.tvHomeLoaded: boolean;          // Guard flag preventing duplicate shelf task scheduling on TV tab return
window._searchSvg: Record<string, string>; // 9 pre-compiled native SVGs bypassing Lucide reconciliation overhead
window.spotlightSlides: any[];         // Home hero spotlight slide objects
window.currentSlideIndex: number;      // Current slide index in Home hero
window.spotlightInterval: any;         // 7.0s auto-rotation interval timer
window.animeSpotlightSlides: any[];    // Anime hero spotlight slide objects
window.currentAnimeSlideIndex: number; // Current slide index in Anime hero
window.animeSpotlightInterval: any;    // 7.0s auto-rotation interval timer for Anime hero
window._shelfTasksMap: Map<string, Function>; // Map of pending shelf task loaders
window._shelfLoadedSet: Set<string>;   // Set of already-loaded shelf containers
window._shelfIntersectionObserver: IntersectionObserver; // Viewport-aware scheduler observer (750px rootMargin)
```

### 2. LocalStorage Keys
| Key | Type | Purpose |
|---|---|---|
| `stalker_watchlist` | `Array<MediaItem>` | Saved titles for Watchlist view |
| `consumet_watch_history` | `Array<HistoryItem>` | Continue Watching items (capped at 25 items) with resume times and progress % |
| `stalker_saved_sports` | `Array<SportsChannel>` | Favorited sports channels |
| `user_custom_sports_m3u_list` | `Array<CustomM3u>` | User-added personal M3U and stream URLs |
| `stalker_livenow_view` | `string` | User's preferred layout view ('grid' vs 'shelf') |
| `party_user_name` | `string` | Nickname for Watch Party chat and presence |
| `stalker_theme` | `string` | Active visual palette ('aurora', 'obsidian', 'cinema') |
| `active_event_sources_backup` | `JSON` | Persistent backup of active event stream feeds surviving sessionStorage clearance |

### 3. SessionStorage Keys (0ms Fast-Boot Cache)
| Key | Type | Purpose |
|---|---|---|
| `consumet_last_tab` | `string` | Restores last active view on page reload |
| `consumet_player_opened` | `'true'` / `'false'` | Prevents player modal disruption on browser back |
| `consumet_spotlight_cache` | `JSON` | Cached home hero slides (purged if containing `tim_` or `timstreams`) |
| `consumet_sports_cache` | `JSON` | Cached sports channels catalog (strips dummy IDs `star1`, `sony1`) |
| `consumet_livenow_cache` | `JSON` | Cached live sports schedule (strips test matches) |
| `consumet_livetv_cache` | `JSON` | Cached JioTV channels and categories |
| `consumet_master_anime_list`| `JSON` | Cached master anime catalog |
| `active_event_sources` | `JSON` | Active event's primary & backup streams for in-player source switcher |
| `tmdb_*` / `full_details_*` | `JSON` | Cached TMDB details to prevent API rate-limiting |
| `consumet_sports_spotlight_cache` | `JSON` | Cached sports hero spotlight slides |
| `consumet_fancode_cache` | `JSON` | Cached FanCode live match broadcasts |
| `consumet_sonyliv_cache` | `JSON` | Cached SonyLIV feeds schema `{ live: [], upcoming: [] }` |
| `consumet_willow_cache` | `JSON` | Cached Willow Cricket live fixtures |
| `consumet_prime_cache` | `JSON` | Cached Amazon Prime Video live sports feeds |
| `consumet_tim_events_cache` | `JSON` | Cached TimStreams live events |
| `consumet_tim_channels_cache`| `JSON` | Cached TimStreams 24/7 sports channels |
| `consumet_highlights_cache` | `JSON` | Cached ScoreBat video highlights |
| `consumet_zee_cache` | `JSON` | Cached Zee Cloudfront live feeds |

---

## 5. Backend & External API Endpoint Matrix

### A. Live Sports & Schedule APIs
| Method | Endpoint | Params / Body | Description |
|---|---|---|---|
| `GET` | `/api/streamic/schedule` | None | Scrapes live sports match fixtures in Indian Standard Time (IST) |
| `GET` | `/api/sports/live-events` | `?_t=timestamp` | Cached live events from TimStreams |
| `GET` | `/api/sports/channels` | None | JSON catalog of verified sports channels |
| `GET` | `/api/sports/proxy-streams` | None | DLHD reverse proxy sports streams |
| `GET` | `/api/sports/hub-config` | None | Admin Sports Hub layout and branding settings |
| `GET` | `/api/sports` | None | Admin custom sports definitions |
| `GET` | `/sports.m3u` | None | Fallback master sports M3U playlist (client parses with 2000ms timeout) |
| `GET` | `/api/live/events` / `/api/live-events` / `/api/live_events` | None | Admin live sports fixtures endpoints |
| `POST` | `/api/sports/probe-sources` | `{ sources: [{ id, playUrl, streamUrl }] }` | Probes live reachability and measures ping latency (ms) for backup feeds |
| `GET` | `/api/sports/match-score` | `?title=...&category=...&id=...` | Fetches real-time score, run rates, bowler stats, and football possession |
| `GET` | `/api/sports/timstreams/channels` | `?_t=timestamp` | 219+ live channels from `timstreams.co.rw` |
| `GET` | `/api/tim/events` | None | Scheduled live events from TimStreams |
| `GET` | `/api/fancode/live` | None | FanCode live matches with signed Akamai tokens |
| `GET` | `/api/sonyliv/live` | None | SonyLIV live matches with DASH/HLS manifests |
| `GET` | `/api/willow/events` | `?refresh=1` | Willow Cricket live matches with priority ordering |
| `GET` | `/api/prime/events` | `?refresh=1` | Amazon Prime Video live sports DASH streams |
| `GET` | `/api/sportlink/channels` | None | Footlinks / SportLink multi-stream server events |
| `GET` | `/api/livem3u/events` | None | Auto-updating live match events parsed from GitHub Live.m3u |
| `GET` | `/api/sports/ipl-replays` | `?refresh=1` | 146 full match VOD replays of IPL |
| `GET` | `/api/sports/highlights` | None | Recent video highlights from ScoreBat |
| `GET` | `/api/zee/channels` | None | Zee Network 24/7 Cloudfront feeds |
| `GET` | `/api/sports/containers` | None | Custom Showcase Studio containers configured by admin |
| `GET` | `/api/spotlight-studio/public` | None | Admin overrides for Home, Live Now, and Sports hero billboards |

### B. Live TV & ClearKey DRM APIs
| Method | Endpoint | Params / Body | Description |
|---|---|---|---|
| `GET` | `/api/jtv/channels` | None | 1,324+ JioTV channels categorized by language & genre |
| `GET` | `/api/jtv/categories` | None | Categories list with channel counts |
| `GET` | `/api/jtv/manifest/:id.mpd`| `:id` | Dynamically rewritten DASH MPD manifest with ClearKey DRM tags |
| `GET` | `/api/mdtv/manifest/:id.mpd`| `:id` | MDTV sports DASH manifest with absolute JioTV CDN chunk URLs |
| `GET` | `/api/allchannels/channels`| None | Combined SM-IPTV live channels catalog |
| `GET` | `/api/livem3u/channels` | None | GitHub Live.m3u channel list |
| `GET` | `/live.php` | `?id=...&token=STALKER_PRO&m3u=1` | Universal reverse proxy handler for binary MPEG-TS and HLS streams |
| `GET` | `/stream_proxy.php` | `?url=...` | Anti-SSRF reverse proxy with origin and referer spoofing |

### C. VOD, Movies & TV APIs
| Method | Endpoint | Params / Body | Description |
|---|---|---|---|
| `GET` | `/api/consumet/trending` | None | Trending entertainment from Consumet API |
| `GET` | `/api/consumet/search` | `?q=...` | Global VOD title search |
| `GET` | `/api/bingr/search` | `?query=...` | Searches across 35+ movie and web series server clusters |
| `GET` | `/api/bingr/sources` | `?title=...&type=movie|tv&s=...&e=...` | Resolves direct video embeds and stream URLs |
| `GET` | `/api/scrape-m3u8` | `?url=...` | Extracts direct `.m3u8` stream from HTML embed pages |
| `GET` | External TMDB API | `https://api.themoviedb.org/3/*` | Fetches metadata, posters, backdrops, logos, and cast credits |

### D. Anime APIs
| Method | Endpoint | Params / Body | Description |
|---|---|---|---|
| `GET` | `/api/anime/trending` | None | Local server anime trending feeds |
| `GET` | `/api/anime/popular` | None | Local server popular anime feeds |
| `GET` | `/api/anime/search` | `?q=...` | AnimeSalt scraper search |
| `GET` | `/api/anime/stream` | `?title=...&season=...&episode=...` | AnimeSalt direct M3U8 stream extractor |
| `GET` | `/api/rareanimes/search` | `?q=...` | RareAnimes Hindi Dubbed search |
| `GET` | `/api/rareanimes/stream` | `?title=...&season=...&episode=...` | RareAnimes Hindi Dubbed stream extractor |
| `POST`| AniList GraphQL | `https://graphql.anilist.co` | Airing schedules, top popular, and airing media |
| `GET` | Jikan API v4 | `https://api.jikan.moe/v4/*` | Top anime, seasonal anime, and weekly schedules |
| `GET` | Kitsu Edge API | `https://kitsu.io/api/edge/*` | Trending and genre anime lists |

### E. EPG & Utilities APIs
| Method | Endpoint | Params / Body | Description |
|---|---|---|---|
| `GET` | `/api/epg/timeline` | None | XMLTV parsed timeline for Star Sports and Sony Sports channels |
| `GET` | `/api/music/yt-search` | `?q=...` | Resolves official YouTube trailer video ID |
| `POST`| `/api/party/create` | `{ roomId, media }` | Creates a synchronized watch party session |
| `GET` | `/api/party/join` | `?room=...` | Connects to watch party WebSocket/WebRTC room |

---

## 6. Core Algorithms & Business Logic Engines

### 0. Weighted Video Trailer Resolution Engine (`fetchOfficialTrailerKey`)
The client scores trailer candidates from TMDB and YouTube using a weighted scoring model to ensure the highest-fidelity, official English preview is played:
- Official video tag: $+100$ pts
- English language (`iso_639_1 === 'en'`): $+50$ pts
- Type is `Trailer`: $+80$ pts
- Title includes `official trailer`: $+50$ pts
- Title includes `main trailer` or `final trailer`: $+30$ pts
- Type is `Teaser`: $+30$ pts
- Type is `Clip`: $+10$ pts
- **Resolution Cascade**: 1. Direct TMDB ID `/videos` $\rightarrow$ 2. TMDB Multi-search by title $\rightarrow$ 3. YouTube proxy `/api/music/yt-search?q={title} official trailer`.

### 1. Multi-Source Stream Ranking Hierarchy (`getLiveEventSourceRank`)
When multiple providers broadcast the same sports match, `consumet.html` applies a strict priority ranking to select the primary stream:

$$\text{Rank 1: SONY} \longrightarrow \text{Rank 2: WILLOW} \longrightarrow \text{Rank 3: FANCODE} \longrightarrow \text{Rank 4: PRIME} \longrightarrow \text{Rank 5: SPORTLINK} \longrightarrow \text{Rank 6: TIMSTREAMS} \longrightarrow \text{Rank 7: LIVE.M3U}$$

- **Preservation Rule (`collectAllEventSources`)**: The primary stream is chosen based on rank, but all backup streams are collected into a unified `sources` array. These are persisted to `sessionStorage.active_event_sources` so the video player can switch between them on buffering or stream death.

### 2. W3C ClearKey DRM Manifest Rewriter (`src/services/mdtvService.ts`)
- Downstream OTT players (Shaka Player, Kodi, TiviMate) require W3C ClearKey descriptor elements alongside Widevine in the DASH `.mpd` manifest:
  ```xml
  <ContentProtection schemeIdUri="urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b">
    <cenc:pssh>...</cenc:pssh>
  </ContentProtection>
  ```
- Relative `<BaseURL>` tags are replaced with absolute JioTV CDN base URLs so chunks are fetched directly from Akamai/Edge CDN rather than localhost.

### 3. Sports Spotlight Importance Scoring (`getSpotlightEventImportance`)
Matches are scored using an additive algorithm to ensure that high-prestige events dominate the hero banner:
- Live match: $+25,000$ points.
- Starting soon ($<30$ min): $+6,000$ points.
- Tomorrow / Future match: $-30,000$ penalty (never steals spotlight from active live events).
- Test Cricket match (BGT, Ashes, WTC): $+4,500$ points.
- Team India live fixture: $+5,000$ points.
- Major European Football club (Real Madrid, Barca, Man City, Arsenal): $+3,000$ points.
- Flagship provider boost: Sony ($+2,500$), Willow ($+2,200$), FanCode ($+1,800$), Prime ($+1,600$).
- Ended / Concluded match: $-999,999$ points (immediately excluded).

### 4. Real-Time Sports Scorecard Engine (`renderSportsModalScorecard`)
- **Cricket Scoreboard**:
  - Displays Inning Comparison (Team 1 vs Team 2 scores, overs, run rates).
  - Calculates Current Run Rate (CRR) and Required Run Rate (RRR).
  - Active Batsmen Table: Runs, Balls, 4s, 6s, and Strike Rate (SR).
  - Active Bowler Card: Overs, Maidens, Runs, Wickets, and Economy.
  - Recent Overs Strip: Color-coded balls (Wicket = red pulse, 4s = green, 6s = purple, dot = dark).
  - Background polling interval: 15 seconds while modal is open.
- **Football Scoreboard**:
  - Full-time / live match clock.
  - Form badges (W/D/L).
  - Statistical Comparison Bars: Ball Possession (%), Total Shots, Shots on Target, Corners, Fouls.
  - Key Moments Timeline: Goals, Yellow/Red cards, Substitutions.

### 5. Asynchronous Feed Reachability Probes (`probeModalSportSources`)
- Whenever a match card modal opens, the client issues a `POST /api/sports/probe-sources` request.
- The server performs parallel `HEAD` / `GET` requests against all stream URLs with a 3.5-second timeout.
- Feeds are dynamically tagged in the UI with live status pills:
  - `LIVE & ONLINE (45ms)` (green badge)
  - `OFFLINE` (red badge, dimmed card)
- The primary play button dynamically auto-selects the fastest verified working feed.

### 6. Viewport-Aware Shelf Scheduler (`scheduleShelfTask`)
- High-resolution posters and heavy media catalogs are not loaded all at once.
- An `IntersectionObserver` schedules shelf data fetching only when the user scrolls within 300px of the container, keeping initial page load under 150ms.

### 7. Episode Scroller & Multi-Action Engine (`renderEpisodes`)
- **Dual Display Modes**:
  - `list` mode: Rich layout with 16:9 still image, episode runtime, air date, overview synopsis, and 4 distinct play action triggers:
    1. **Bingr** (`openBingrPlayer`): Scrapes and resolves streams from 35+ provider clusters.
    2. **Stream** (`openFullscreenPlayer`): Direct theater video player with server selection.
    3. **HLS** (`openHlsPlayer`): Native HLS.js video playback in modal.
    4. **Torrent** (`openTorrentPlayer`): P2P magnet link streaming via TorrServer.
  - `grid` mode: Compact aspect-video thumbnail cards with episode number badges for rapid surfing.
- **Season Filtering & Dynamic Sort**:
  - `episodeSortAscending` boolean state toggles episode ordering between ascending (`1-N`) and descending (`N-1`).
  - `filterSeasonEpisodes(query)` performs zero-latency client-side regex matching across episode title and overview.

### 8. Theater Player 8-Server Cascade & IMDb Resolution (`openFullscreenPlayer`)
- **Direct Stream vs Embed Detection**:
  - DASH ClearKey streams (JioTV, MDTV, Hotstar MPD) $\rightarrow$ routes to `/play_consumet.php?type=dash&key_id={keyId}&key={key}`.
  - Live sports (FanCode, SonyLIV) $\rightarrow$ routes to `/play_consumet.php?type={dash|hls}&channel_id={id}`.
  - Direct HLS / M3U8 $\rightarrow$ routes to `/play_consumet.php?type=hls&url={encodedUrl}`.
- **8-Server VOD Failover Order & URL Patterns**:
  1. `vidlink_pro` (Default): `https://vidlink.pro/movie/${tmdbId}?multiLang=true&sub=true` or `/tv/${tmdbId}/${s}/${e}?multiLang=true&sub=true` (appends `&dub=true&defaultLang=en` when `_playerAudioMode === 'dub'`).
  2. `vidsrc_pm`: `https://vidsrc.pm/embed/movie/${tmdbId}` or `/tv/${tmdbId}/${s}/${e}`.
  3. `vidsrc_to`: `https://vidsrc.to/embed/movie/${idToUse}` or `/tv/${idToUse}/${s}/${e}` (strictly prioritizes `imdb_id`).
  4. `vidrift`: `https://embed.vidrift.in/embed/movie/${tmdbId}` or `/tv/${tmdbId}/${s}/${e}` (appends `?dub=true&audio=hindi` when `_playerAudioMode === 'dub'`).
  5. `twoembed`: `https://www.2embed.cc/embed/${tmdbId}` or `/embedtv/${tmdbId}?s=${s}&e=${e}`.
  6. `smashystream`: `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}` or `?tmdb=${tmdbId}&season=${s}&episode=${e}`.
  7. `cinezo`: `https://player.cinezo.live/embed/movie/${tmdbId}` or `/tv/${tmdbId}/${s}/${e}`.
  8. `filmu` / `vidly`: `https://vidly.pro/embed/movie/${tmdbId}` or `/tv/${tmdbId}/${s}/${e}` (appends `?dub=1&multiLang=true` when `_playerAudioMode === 'dub'`).
- **IMDb ID External Resolution Hook**:
  - VidSrc servers fail if provided a numeric TMDB ID for certain titles. The client intercepts VidSrc selections and executes `GET https://api.themoviedb.org/3/{movie|tv}/{id}/external_ids` to fetch the authoritative `imdb_id` (`tt1234567`) before building the iframe `src`.
  - Global resolver `resolveAndPlayIMDb(query)` handles `tt\d{7,10}` directly via TMDB `/find/${imdbId}?external_source=imdb_id`.
- **Anti-Ad Sandbox, Popup Shield & Gesture Guard**:
  - Sandboxed iframe with `allow="autoplay; fullscreen; encrypted-media; picture-in-picture"`.
  - Nullifies `window.open`: `window.open = function() { return null; };` to block intrusive new-tab ad redirects.
  - Locks `onbeforeunload`: `Object.defineProperty(window, 'onbeforeunload', { configurable: false, writable: false, value: null });` preventing scam exit confirmation dialogs.
  - Mobile touch swipe distance tracker: Records `_touchStartX` and `_touchStartY` on `touchstart`. If delta $\sqrt{\Delta x^2 + \Delta y^2} > 8\text{px}$, sets `window._isSwiping = true` for 350ms, suppressing rogue ad click triggers during natural scrolling.

### 9. TorrServer P2P BitTorrent Streamer Bridge (`openTorrentPlayer`)
- Invokes `/api/bingr/sources` with `type=torrent` to extract top-seeded torrent magnet links for the current title.
- Dispatches magnet URI to the embedded Go TorrServer daemon (running on port `8090`) via `/api/torrent/play?link={encodeURIComponent(magnet)}`.
- TorrServer pre-allocates RAM buffers for head and tail metadata packets, allowing the native video element or VLC player to begin streaming immediately without downloading the full archive.

### 10. Watch Party WebRTC / WebSocket Signaling Lifecycle (`startPartyFromCurrentDetails`)
- Generates cryptographically secure room ID: `room_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`.
- Sends `POST /api/party/create` payload: `{ hostName: party_user_name, mediaUrl: playUrl, mediaName: title, currentTime: 0 }`.
- Navigates player with appended URL parameter `&party=${roomId}`.
- Connects to `/ws/party` WebSocket endpoint for real-time play/pause/seek synchronization across all connected participants with integrated live chat.

### 11. Stream Navigation & BFCache Back-Restoration Protocol (`from_tab`)
- Before navigating to any full-page stream or player, the client sets:
  - `sessionStorage.consumet_player_opened = '1'`
  - `sessionStorage.consumet_last_tab = window.activeTab`
  - Appends `from_tab=${window.activeTab}` to the destination URL.
- On return via browser back button, the window `pageshow` listener detects `e.persisted` or `consumet_player_opened`, immediately restoring the exact tab, scroll position, and open modal state with 0ms network latency.

### 12. Real-Time Sports Event Expiry Pruner (`isSportEventEnded`)
- Sweeps active match rosters every 30 seconds.
- Evaluates `endTime`, `countdown`, `liveScore.isFinal`, and status keywords ("Concluded", "Full Time", "Ended", "Finished", "Result").
- Instantly removes finished matches from `#liveNowEventsContainer` and hero carousels to prevent dead stream clicks.

### 13. Team Monogram, Dynamic Color Theming & SVG Logo Resolver
- **Automatic Team Parser (`parseTeamsFromTitle`)**: Extracts Home and Away team names by stripping generic tags (`Live`, `Highlights`, `Replay`) and splitting on `vs`, `v`, `at`, `-`, or `@`.
- **Initials & Monogram Generator (`getTeamInitials`)**: Filters out common stop words (`FC`, `SC`, `United`, `Club`, `Women`, `Men`, `The`) and generates crisp 3-letter capital monograms (`ARS`, `MCI`, `IND`, `CSK`).
- **Dynamic Color Hue Generator (`getTeamTheme`)**: Contains exact hex tokens for international cricket teams and top football clubs, with an automatic string-hash fallback mapping unknown teams to 6 curated dark stadium hues.
- **Official SVG Logo Catalog (`KNOWN_TEAM_LOGOS`)**: Direct Wikimedia SVG links for all 10 IPL franchises (`CSK`, `MI`, `RCB`, `KKR`, `RR`, `DC`, `SRH`, `PBKS`, `GT`, `LSG`), Premier League, La Liga, Serie A, and ICC International Cricket Boards.

### 14. Asynchronous Stream Pre-Warming & Reachability Prober
- **Speculative Feed Pre-Warming (`prewarmLiveSportsSources`)**: Preemptively probes the top 5 live events upon initial catalog load via `POST /api/sports/probe-sources`, caching results in `window._sportsProbeCache` (60s TTL) so opening a match modal displays reachability and ping latency immediately with 0ms delay.
- **Parallel Stream Probing (`probeModalSportSources`)**: Sends parallel HTTP requests across all primary and backup stream URLs with a 3.5s timeout. Real-time DOM badges update dynamically:
  - `LIVE & ONLINE (45ms)` (green badge)
  - `OFFLINE` (red badge, dimmed container)

### 15. Real-Time Sports Scorecard & Match Telemetry Engine
- **Cricket Scorecard Architecture**:
  - Compares Team 1 vs Team 2 runs, wickets, and overs.
  - Dynamically calculates Current Run Rate (CRR) and Required Run Rate (RRR).
  - Active Batsmen Table: tracks Runs, Balls, 4s, 6s, and Strike Rate with striker indicator (`*`).
  - Active Bowler Card: tracks Overs, Maidens, Runs, Wickets, and Economy.
  - Recent Overs Strip: 8-ball scroller with color-coded badges (`W` red pulse, `4` emerald, `6` purple, `•` dark).
- **Football & Basketball Statistics**:
  - Proportional ball possession percentage bar (`calcPossession`).
  - Comparative bar graphs for Total Shots, Shots on Target, Corner Kicks, and Fouls Committed.
  - Key Moments Timeline with chronological events (Goals, Cards, Substitutions).
- **15-Second Background Poller (`_scorecardPollInterval`)**:
  - Automatically queries `/api/sports/match-score?title=...&category=...&id=...` every 15s while the modal is visible, self-terminating when the modal is closed to preserve bandwidth.

### 16. Multi-Provider Live TV Catalog Switching Architecture (`switchLiveTvCatalog`)
- **Independent State Trees**: Maintains separate channel and category caches for all 4 providers (`jtvAllChannels`, `sportlinkAllChannels`, `allChannelsList`, `liveM3uAllChannels`) preventing cross-contamination.
- **DASH ClearKey Manifest Packaging**:
  - Channels from JioTV route through `/api/jtv/manifest/:id.mpd` with Akamai HMAC token headers and Widevine-to-ClearKey translation.
  - Streams with `.m3u8` or from SonyLIV/Hotstar automatically switch player manifest type from `dash` to `hls`.
- **Infinite Virtual Grid Pagination**:
  - Initial load is restricted to 120 items (`jtvDisplayLimit`).
  - An `IntersectionObserver` attached to `#jtvLoadMoreSentinel` triggers `loadMoreLiveTvChannels()` on 300px approach, appending 120 more items per batch to keep DOM node count lean.

### 17. Sports Hero Spotlight Waterfall Cascade (`renderSportsSpotlight`)
- **Priority Stack Order**:
  1. Admin Spotlight Studio overrides (`_spotlightStudioPublic.spotlightStudio.sportsSpotlight`).
  2. Admin Live Events (`/api/live_events`).
  3. FanCode live match broadcasts (`/api/fancode/live`).
  4. SonyLIV live matches (`/api/sonyliv/live`).
  5. Willow Cricket live matches (`/api/willow/events`).
  6. Amazon Prime Video live sports (`/api/prime/events`).
  7. Flagship Broadcasts Backfill (Star Sports 1 HD, Star Sports 1 Hindi HD, Sony Ten 1 HD, Sony Ten 2 HD, Willow Cricket HD, DD Sports HD).
- **Auto-Rotation Physics**: Slides advance every 6.5s via `setInterval`. Automatically pauses when the Sports view is scrolled past 650px or when the browser tab is hidden to conserve GPU/CPU cycles.

### 18. Authentic SVG Television & Sports Network Logo Catalog (`getSportsLogo`)
- Resolves high-resolution vector logos for 60+ global sports channels (BeIN Sports France/Turkey/MENA, Sky Sports, Astro SuperSport/Cricket, DAZN Spain, Arena Sport Croatia/Serbia, ESPN Brasil, Fox Sports USA/AU, FanDuel, TNT USA, Eurosport, JOJ Sport, Starz, Cinemax, MGM+, Showtime, BBC America, etc.).
- Normalizes upstream `/img/...` paths to `https://timstreams.co.rw/img/...` for TimStreams assets.
- Provides dynamic SVG monogram avatar generation as fallback (`ui-avatars.com`) with emerald branding.

### 19. Showcase Studio Containers & Deep-Link URI Engine (`renderShowcaseContainers`)
- **Custom Broadcast Stages**: Renders admin-curated event showcases with dynamic layout modes (`shelf`, `grid`, `glass_cards`, `compact_chips`, `spotlight`).
- **Athlete Cutout Art (`playerPng`)**: Positions high-res athlete cutouts on container right margin with drop shadow effects.
- **URI Deep-Linking (`handleSportsUriConnection`)**: Intercepts `?container=asian_games` query parameters, automatically scrolling to the target container and applying a temporary 3s animated amber focus ring.
- **Web Speech API Voice Recognition (`toggleSportsVoiceSearch`)**: Listens for voice commands and matches speech to special containers (e.g. "Asian Games").

### 20. Anime Multi-Provider Scraper & Audio Mode Resolver (`openAnimeSpecialPlay`, `openRareAnimesPlay`, `switchAnimeProvider`)
- **AnimeSalt Engine**:
  - Scrapes direct `.m3u8` streams from `/api/anime/stream?title={cleanTitle}&season={s}&episode={e}&audio={dub|sub}`.
  - Audio preference is governed by `window._playerAudioMode` ('sub' vs 'dub').
  - Launches full-screen playback via `/play_bingr.php?srv=animesalt&audio={dub|sub}&stream={encodedM3u8}`.
- **RareAnimes Hindi Dub Engine**:
  - Queries `/api/rareanimes/stream?title={cleanTitle}&season={s}&episode={e}`.
  - Extracts Hindi Dubbed video embeds and direct CDN manifests.
  - Routes playback via `/play_bingr.php?srv=ranime`.
- **Provider Switching Matrix**:
  - `switchAnimeProvider(provider)` dynamically mounts specialized catalog grids: AnimeSalt, RareAnimes, AniList Trending, Kitsu Top Rated, and Jikan Seasonal.

### 21. Weekly Anime Broadcast Radar & JST Time Zone Scheduler (`switchAnimeScheduleDay`)
- **JST Conversion Algorithm**:
  - Simulcast air times are provided in Japan Standard Time (JST, UTC+9).
  - Client parses JST hour and minute strings, applies device timezone offset:
    $$\Delta t = \text{DeviceOffsetMinutes} - (-540)$$
  - Renders humanized relative countdown badges ("Airing in 3 hours", "Aired 45m ago").
- **5-Tier Resilience Failover Cascade**:
  1. Primary: Jikan API v4 (`https://api.jikan.moe/v4/schedules?filter={day}`).
  2. Secondary: AniList GraphQL (`AiringSchedule` query with date range filters).
  3. Tertiary: Kitsu Edge (`https://kitsu.io/api/edge/anime?filter[status]=current`).
  4. Quaternary: TMDB Discover Anime with weekly release date range.
  5. Quinary: Local `sessionStorage.consumet_master_anime_list` static fallback.

### 22. One Piece Master Universe Matrix & Universal Sub-Query Engine (`initOnePieceTrilogy`, `searchOnePieceUniverse`)
- **Canonical TMDB Matrix Registry**:
  - Film RED: TMDB `900667`
  - Stampede: TMDB `531309`
  - Film Gold: TMDB `360814`
  - TV Continuum (1,100+ episodes): TMDB `37854`
  - Film Z: TMDB `148348`
  - Strong World: TMDB `30219`
- **Dynamic Arc & Character Sub-Query Engine**:
  - User can type any character or saga query into `#onePieceSearchInput` ("Egghead", "Wano", "Gear 5", "Luffy", "Zoro", "Kaido").
  - Client queries TMDB `search/multi` filtering for animated titles associated with Eiichiro Oda or One Piece keywords.
  - Renders instant custom card grid with poster, overview, release year, and direct player launch buttons.

### 23. Electronic Program Guide (XMLTV) Parsing & On-Air Progress Calculation (`fetchAndParseEpg`, `renderEpgChannels`)
- **XMLTV Ingestion & Cache**:
  - Fetches `/api/epg/timeline` containing parsed channel programs.
  - Normalizes channel IDs for Star Sports Network, Sony Sports Network, and General Sports feeds.
- **Dynamic Progress Percentage Math**:
  $$\text{progressPct} = \min\left(100, \max\left(5, \text{round}\left(\frac{\text{now} - \text{startTime}}{\text{endTime} - \text{startTime}} \times 100\right)\right)\right)$$
- **View Toggle & Modals**:
  - `toggleEpgView('timeline' | 'cards')`: Switches layout between time-aligned channel rows and compact channel cards.
  - `#epgProgramModal`: Shows synopsis, category badge, start/stop times, and direct "Tune In Now" button.
  - `#epgChannelModal`: Opens complete 24-hour program schedule for selected channel.

### 24. Watch History Smart Router, Sports Thumbnail Hydration & Desktop Inertial Drag-to-Scroll
- **Watch History Data Schema (`localStorage.consumet_watch_history`)**:
  - Stores up to 100 media items with schema: `{ id, title, type, poster, backdrop, currentTime, duration, percentage, season, episode, episodeTitle, isLive, streamUrl, channelId, lastUpdated }`.
- **Smart Play Router (`openDetailsModal`)**:
  - Evaluates `_isSportsOrLiveHistoryItem(item)`:
    - If true (sports match or live TV channel): completely bypasses media details dialog and instantly invokes `openFullscreenPlayer` or switches to `livenow` tab.
    - If anime: launches anime stream modal.
    - If standard VOD (movie/tv): sets `window._resumeTargetTime = item.currentTime`, auto-seeking video element to exact playback second upon load.
- **Sports Thumbnail Hydrator (`_resolveHistorySportsThumb`)**:
  - For live items lacking a poster, queries team logo map (`KNOWN_TEAM_LOGOS`) or sports channel vector logo catalog (`getSportsLogo`) to generate a crisp 16:9 thumbnail frame.
- **Universal Desktop Inertial Drag-to-Scroll Engine (`_initScrollAndHistoryEngine`)**:
  - Attaches delegated event listeners to all `.scroller-container` and `div[id$="Shelf"]` containers.
  - Implements smooth mouse dragging with $1.4\times$ velocity multiplier and momentum deceleration, replicating native touch scroll physics on desktop mice and trackpads.

### 25. Offline TMDB Fallback Pool & Multi-Tier Recovery (`_fallbackPool`)
- **Tri-Level Architecture**:
  1. Level 1: In-memory `_tmdbClientCache` (FIFO Map cap 200).
  2. Level 2: `sessionStorage.getItem('tmdb_' + cacheKey)` fast-boot cache.
  3. Level 3: Backend proxy `/api/bingr/tmdb-proxy`.
- **Embedded Offline Pool (`_fallbackPool`)**:
  - If backend is offline or network fails, instantly serves full JSON payloads for 10 flagship titles:
    - Dune: Part Two (`id: 693134`)
    - Oppenheimer (`id: 872585`)
    - Deadpool & Wolverine (`id: 533535`)
    - Inside Out 2 (`id: 1022789`)
    - Alien: Romulus (`id: 945961`)
    - Game of Thrones (`id: 1399`)
    - House of the Dragon (`id: 94997`)
    - The Bear (`id: 136315`)
    - Severance (`id: 95396`)
    - Stranger Things (`id: 66732`)

### 26. Touch Swipe Guard & Anti-Synthetic Redirect Lock
- **Touch Gesture Protection**:
  - On `touchstart`, records `_touchStartX = e.touches[0].clientX` and `_touchStartY = e.touches[0].clientY`.
  - On `touchmove`, calculates delta distance $\sqrt{(\Delta x)^2 + (\Delta y)^2}$.
  - If delta $> 8\text{px}$, flags `window._isSwiping = true` for 350ms.
  - All media card click triggers verify `!window._isSwiping` before firing navigation, preventing accidental playback launches or rogue ad clicks while scrolling on mobile devices.

### 27. Dual IntersectionObserver Pagination Engine
- **Live TV Virtual Grid Sentinel (`jtvScrollObserver`)**:
  - Attached to `#jtvLoadMoreSentinel` with `rootMargin: '300px'`.
  - Appends channels in batches of 120 (`jtvDisplayLimit += 120`) to maintain 60 FPS scrolling without freezing DOM nodes.
- **Sports Catalog Sentinel (`_sportsGridObserver`)**:
  - Attached to `#sportsGridLoadMoreContainer` with `rootMargin: '300px'`.
  - Appends verified sports channels in batches of 80 channels per page (`_sportsGridPage++`).

### 28. Standalone 7-Step Trailer Resolution Cascade (`playSelectedTrailer`)
- When user clicks trailer action button on any card or billboard, the client executes a strict 7-step priority resolution cascade:
  1. Primary item direct video key (`item.trailerKey` / `item.video_key`).
  2. Spotlight cache video key (`_spotlightStudioPublic` trailer mapping).
  3. Direct TMDB video objects extraction (`data.videos.results` scoring).
  4. Heuristic trailer engine (`fetchOfficialTrailerKey(id, type, title)`).
  5. Backend YouTube search proxy (`GET /api/music/yt-search?q=${encodeURIComponent(title + ' official trailer')}`).
  6. YouTube nocookie direct search query embed (`https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(title + ' trailer')}`).
  7. Graceful fallback toast notification (`showToast('Trailer not available for this title', 'info')`).

### 29. IPL 2026 146-Match Full VOD Replay Archive (`loadIplReplays`, `filterIplReplays`)
- **VOD Replay Repository (`/api/sports/ipl-replays`)**:
  - 146 full match recordings with team names, match numbers, dates, and direct high-bandwidth CDN URLs.
- **Language Switching & Filtering**:
  - Supports `'ALL'`, `'ENGLISH'`, and `'HINDI'` audio feeds with instant button state toggling.
- **Rendering & Playback**:
  - Horizontal shelf `#iplReplaysShelf` and expanded 6-column grid view `#iplReplaysShelf_gridWrap`.
  - Portrait 2:3 cards with Hotstar fallback thumbnails (`https://img10.hotstar.com/image/upload/...`).
  - Launches playback via `/play_consumet.php?url=${encodeURIComponent(stream)}&name=${encodeURIComponent(title)}&source=consumet.html&type=hls`.

### 30. Stream Protocol & Resolution Classifier (`analyzeStream(url)`)
- Inspects streaming URLs to determine optimal playback engine and technical badges:
  - Protocol detection: MPEG-TS (`.ts` or `/live.php?`), fMP4 DASH (`.mpd`), or Native HLS (`.m3u8`).
  - Resolution inference: Evaluates keywords in stream URL (`4k`, `uhd`, `1080p`, `720p`, `hd`, `50fps`, `fhd`).
  - Automatically routes high-frame-rate feeds to hardware-accelerated `<video>` containers.

### 31. 4-Tier Match Thumbnail Cascade & Anti-Placeholder Guard (`buildVsMatchThumbnailHtml`)
- Implements a resilient visual hierarchy:
  1. Tier 1: Official tournament/match poster.
  2. Tier 2: Two-team circular logo shields with glowing amber `'VS'` central pill.
  3. Tier 3: 24/7 channel network logo from `KNOWN_TEAM_LOGOS` or `getSportsLogo`.
  4. Tier 4: Curated stadium arena atmospheric backdrop.
- **Placeholder Blacklist Filter**: Automatically discards low-quality generic placeholders containing strings: `unique-tournament`, `FC_Sports_Default`, `ui-avatars.com`, `placeholder`, `default_thumb`.

### 32. Widevine Rejection Guard & Amazon Prime ClearKey Formulation
- **Widevine Rejection Guard**: Drops unplayable Widevine MPD streams missing standard 16-character ClearKey hex keys to prevent unhandled CDM decrypt errors in browser video players.
- **Prime ClearKey Formulation**: Parses dynamic keys and formulates direct DASH playback URL: `/play_consumet.php?type=dash&key_id=${keyId}&key=${key}&clearkey=1&url=${encodeURIComponent(streamUrl)}`.

### 33. Multi-Server Live TV Click Interception (`switchLiveTvCatalog`)
- **Single-Feed Channels**: Launches direct playback immediately via `openFullscreenPlayer(channelId)`.
- **Multi-Stream & SportLink Channels**: Intercepts the click if `isSportlink || streamCount > 1`, opening `#sportsMatchOvalModal` to let the user select between Server 1, Server 2, Server 3, or Server 4 with reachability latency telemetry.

---

## 7. React Migration Architecture (ARVIO Blueprint)

To migrate `consumet.html` into a clean, maintainable, modular React application:

### Recommended Project Structure
```text
src/
├── assets/                  # SVG channel logos, badges, and icons
├── components/
│   ├── common/              # Navbar, MobileDock, BackToTop, ModalContainer
│   ├── cards/               # MovieCard, TvCard, NetflixSportCard, LiveTvOttCard, AnimeCard, HistoryCard
│   ├── sliders/             # HeroBillboardSlider, HorizontalShelfScroller
│   ├── anime/               # AnimeScheduleRadar, OnePieceMatrix, AnimeProviderSelector
│   ├── epg/                 # EpgTimelineGrid, EpgCardsGrid, EpgProgressMeter
│   ├── home/                # ContinueWatchingShelf, RegionalIndianShelves
│   ├── modals/
│   │   ├── MediaDetailsModal.tsx    # Cinema details, YouTube trailer loop, cast
│   │   ├── PersonModal.tsx          # Actor profile & filmography
│   │   ├── MatchCenterModal.tsx     # Oval match showcase, scorecard, watch feeds
│   │   ├── EpgProgramModal.tsx      # XMLTV program guide dialog
│   │   ├── EpgChannelModal.tsx      # 24-hour channel schedule dialog
│   │   ├── TrailerModal.tsx         # Standalone YouTube nocookie trailer viewer
│   │   └── SearchPaletteModal.tsx   # Cmd+K Fullscreen search studio
│   └── player/
│       ├── TheaterPlayer.tsx        # Responsive theater player view
│       ├── ServerSelector.tsx       # 8+ server clusters dropdown
│       ├── AudioModeToggle.tsx      # SUB vs DUB switcher
│       ├── SourceSwitcher.tsx       # Primary vs backup live stream feeds
│       └── EpisodeCarousel.tsx      # Season & episode navigation
│
├── pages/
│   ├── HomePage.tsx         # Cinema hub, continue watching, regional shelves
│   ├── LiveNowPage.tsx      # Glacier Sapphire stadium, Big 4 sports spotlight
│   ├── SportsPage.tsx       # Sports central, live events, IPL replays, 12 shelves
│   ├── LiveTvPage.tsx       # 1,324+ JioTV channels, source switcher, OTT tiles
│   ├── MoviesPage.tsx       # Movies catalog with genre/year filters
│   ├── SeriesPage.tsx       # TV series catalog with network filters
│   ├── AnimePage.tsx        # Anime radar, One Piece matrix, multi-provider grid
│   ├── EpgPage.tsx          # XMLTV Star/Sony program guide timeline
│   └── WatchlistPage.tsx    # Saved library & history
│
├── hooks/
│   ├── useSportsSchedule.ts # Live sports polling and source deduplication
│   ├── useLiveScorecard.ts  # 15s interval scorecard poller
│   ├── useWatchHistory.ts   # LocalStorage history tracker with resume timestamps
│   ├── useEpgSchedule.ts    # XMLTV timeline fetcher and on-air progress math
│   ├── useAnimeSchedule.ts  # JST weekly simulcast schedule with 5-tier failovers
│   ├── useDragToScroll.ts   # Universal mouse drag-to-scroll with inertia
│   └── useKeyboardShortcuts.ts # Cmd+K, Escape, Spacebar handlers
│
├── services/
│   ├── api.ts               # Axios / Fetch HTTP client with retry logic
│   ├── tmdbService.ts       # TMDB endpoints with sessionStorage caching & logo resolvers
│   ├── sportsService.ts     # Streamic, SonyLIV, FanCode, Willow, Prime, TimStreams sync
│   ├── jtvService.ts        # JioTV ClearKey DASH manifest builder
│   ├── animeService.ts      # AniList GraphQL, Jikan, Kitsu, AnimeSalt, RareAnimes
│   ├── epgService.ts        # XMLTV timeline parser
│   └── historyService.ts    # Resume target tracker & sports thumbnail hydrator
│
└── store/
    ├── navigationStore.ts   # activeTab, mobile drawer state
    ├── playerStore.ts       # active media, active server, audio mode (SUB/DUB), backup feeds
    ├── sportsStore.ts       # live events, probe latencies, live scorecards
    ├── animeStore.ts        # active anime provider, active schedule day
    ├── epgStore.ts          # active EPG network, timeline view mode
    └── favoritesStore.ts    # Watchlist, watch history, and favorited sports channels
```

---

## 8. Known Legacy Quirks, Undeclared Identifiers & Remediation Blueprint for React

During the line-by-line 40-micro-slice deep audit across all 17,868 lines of `consumet.html`, several legacy runtime quirks, undeclared variables, and DOM discrepancies were identified. The React + TypeScript migration fixes all of them:

1. **Undeclared Identifier `currentDetail` (Line 17,376)**:
   - *Legacy Quirk*: `downloadCurrentMedia()` checked `if (!currentDetail)`, throwing `Uncaught ReferenceError: currentDetail is not defined`.
   - *React Remediation*: Typed state `currentDetail: TMDBDetailPayload | null` inside `playerStore.ts` with explicit selector hooks.
2. **Missing Function `openEpgChannelModal()` (Lines 12,983, 15,032, 15,205, 15,467)**:
   - *Legacy Quirk*: Buttons invoked `openEpgChannelModal(channelId)`, but the function was never defined, leaving channel schedule views unreachable.
   - *React Remediation*: Implemented in `epgStore.openChannelSchedule(channelId)` and rendered via `EpgChannelModal.tsx`.
3. **Colliding DOM IDs across Dual Person Modals (Lines 2,909 vs 3,064)**:
   - *Legacy Quirk*: Both `#personDetailsModal` and `#personModal` existed simultaneously and shared conflicting `id="personName"`.
   - *React Remediation*: Unified into a single, clean component `PersonModal.tsx` with encapsulated scoped props.
4. **Missing HTML Containers Referenced in Script**:
   - *Legacy Quirk*: `#onePieceCardsGrid`, `#animeProviderGrid`, `#animeProviderStatus`, `#epgTimelineViewContainer`, `#epgViewBtnTimeline` were queried in script but absent in HTML, causing early null exits.
   - *React Remediation*: Scaffolds explicit sub-components `OnePieceMatrix.tsx`, `AnimeProviderSelector.tsx`, and `EpgTimelineGrid.tsx`.
5. **Touch Gesture & Ad-Redirect Guard**:
   - *Legacy Quirk*: Guarded via `_lastSwipeTimestamp = Date.now()` and $\Delta > 8\text{px}$ checks.
   - *React Remediation*: Standardized into a clean `useDragToScroll` hook with velocity clamping and pointer event abstraction.

---

## 9. Verification & Migration Roadmap

This document guarantees that no features, endpoints, or UI behaviors from [`consumet.html`](file:///c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html) are lost during the ARVIO React migration.

### Migration Roadmap:
1. **Phase 1: Component Scaffolding**: Create the React folder structure, design tokens, and shared UI primitives (Navbar, MobileDock, Cards, Scrollers).
2. **Phase 2: State & Storage Layer**: Implement Zustand/Redux stores mirroring `window.*`, `localStorage`, and `sessionStorage` schemas.
3. **Phase 3: Core API Services**: Port API clients for TMDB, JioTV, Streamic, FanCode, SonyLIV, Willow, and Anime scrapers.
4. **Phase 4: Modals & Detail Dialogs**: Build `MediaDetailsModal`, `MatchCenterModal` with live scorecards, and `SearchPaletteModal`.
5. **Phase 5: Media Player & DRM Engine**: Connect Shaka Player / Dash.js / Hls.js with ClearKey manifest decoders and server failovers.
6. **Phase 6: Verification & Polish**: Test live sports streams, 24/7 channels, and keyboard shortcuts across desktop and mobile.
