# 🔍 Consumet Final Check Audit — Agent 3: Micro-Slices 9, 10, 11, 12 (Lines 3,575 to 5,361)

**Target Codebase:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html`  
**Lines Audited:** 3,575 to 5,361 (1,787 lines total)  
**Reference Document:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_structure.md`  
**Auditor ID:** Final Check Auditor 3  
**Audit Date:** 2026-11-08  

---

## 1. Executive Summary & Scope

Micro-slices 9 through 12 form the central nervous system of `consumet.html`. This block of 1,787 lines contains the core application state, modal lifecycle orchestration, 0ms fast-boot cache hydration from session storage, deep-link URL parsing, mobile drawer interactions, viewport-aware lazy shelf scheduling (`IntersectionObserver`), hero spotlight carousels (both main cinematic and anime otaku), and the complete catalog of regional Indian and Hollywood shelves.

Comparing every line against [`consumet_structure.md`](file:///c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_structure.md) reveals that while the blueprint covers broad architectural concepts, **critical state variables, 0ms session caches, DOM element IDs, helper functions, and edge cases are completely omitted or under-specified**.

---

## 2. Granular Micro-Slice Breakdown

### 🎯 Micro-Slice 9: Lines 3,575 – 4,028
*Core Functions & State: Trailer Resolvers, AniList GraphQL, Modal Open/Close, Anime Detail Routing, Global App State, Linear Channel Classifier.*

1. **Trailer Resolution Fallbacks (`fetchOfficialTrailerKey` continuation, Lines 3575–3626):**
   - Direct TMDB video query with `{ include_video_language: 'en,null' }`, followed by query without language filter.
   - Title search fallback (`search/tv` or `search/multi`), retrieving videos for top result.
   - Third-tier YouTube proxy search fallback: `/api/music/yt-search?q=${encodeURIComponent(title + ' official trailer')}` extracting `videoId || id`.
   - Result cached in `_trailerKeyCache[cacheKey]` to avoid redundant external network hits.

2. **Hero Spotlight Video Trailer Overlay (`updateSpotlightBackgroundTrailer`, Lines 3627–3661):**
   - Stores active trailer in `currentSpotlightTrailerKey`.
   - **Critical Edge Case:** Disables ID search (`searchId = null`) if `item.isAnime` or `containerId.includes('anime')` to prevent AniList IDs from querying TMDB IDs and fetching wrong trailers!
   - Creates an `<iframe>` with `https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&enablejsapi=1&playsinline=1`.
   - Fades out static backdrop image (`.spotlight-bg-image`) with a 1000ms transition and sets `display: none`.
   - If no trailer exists, removes iframe and restores backdrop image.

3. **AniList GraphQL Client (`fetchAniListGraphQL`, Lines 3662–3684):**
   - Direct `POST` to `https://graphql.anilist.co` wrapped in an `AbortController` with an 8,000ms timeout.
   - Completely suppresses network errors and GraphQL payload errors, returning `null`.

4. **Global Modal Lifecycle & Lenis Scroll Lock (`handleModalOpen`, `handleModalClose`, Lines 3685–3712):**
   - Tracks modal count in `openModalsCount`.
   - Sets `document.body.style.overflow = 'hidden'` on open and resets on count == 0.
   - Pauses and resumes Lenis smooth scrolling (`window.lenis.stop()` / `window.lenis.start()`).
   - Automatically injects `flex` CSS class for specific modal IDs: `#searchPalette`, `#epgChannelModal`, `#epgProgramModal`, `#sportsMatchOvalModal`.

5. **Anime TMDB Resolver & Routing (`openAnimeInfo`, Lines 3713–3806):**
   - Cleans anime title string of suffixes: `- Episode \d+`, `Season \d+`, `(TV)`, `(Dub)`, `(Sub)`.
   - 4-Tier TMDB Lookup:
     1. Direct `animeItem.tmdbId`.
     2. `search/tv` with `titlesMatch` verification.
     3. `search/movie` with `titlesMatch` verification.
     4. Romaji title search via `search/tv`.
     5. Generic `search/multi` fallback.
   - Caches match into `window._searchCache[match.id]` preserving `anilistId` and `malId`.
   - Invokes `openDetails(match.id, type, title)`.

6. **Custom Anime Details Modal Fallback (`openCustomAnimeDetails`, Lines 3808–3996):**
   - Fallback UI when TMDB match cannot be resolved.
   - Renders `#detailsModal` using AniList / MyAnimeList metadata.
   - Injects clickable links: `https://myanimelist.net/anime/${malId}` and `https://anilist.co/anime/${anilistId}`.
   - Populates `#detailTitle`, `#detailOverview`, `#detailPoster`, `#detailBackdrop`, `#detailYear`, `#detailRating`, `#detailRuntime`, `#detailType`, `#detailNextEpisodeAlert`, `#detailGenres`, `#episodesGrid`.
   - Generates interactive episode cards with 3 action buttons per card:
     - `openBingrPlayer(null, ep, this)`: Stream via Bingr embed.
     - `openFullscreenPlayer()`: Stream via default media engine.
     - `openHlsPlayer(ep)`: Stream direct HLS feed.
   - Executes `triggerLucide()`.

7. **Global State Declarations (Lines 3997–4012):**
   - `activeTab = 'home'`
   - `currentSearchQuery = ''`
   - `searchTimeout = null`
   - `selectedMedia = null`, `selectedSeason = 1`, `selectedEpisode = 1`
   - `moviesPage = 1`, `tvPage = 1`
   - `moviesList = []`, `tvList = []`
   - `window.allSportsChannels = []`
   - `window.watchlist = JSON.parse(window._safeLocalGet('stalker_watchlist') || '[]')`
   - `spotlightSlides = []`, `currentSlideIndex = 0`, `spotlightInterval = null`

8. **Linear Sports Channel vs Match Fixture Classifier (`isLinearChannel`, Lines 4013–4028):**
   - Uses regex to distinguish 24/7 linear TV channels from live match fixtures.
   - `eventMarkers`: `vs`, `v`, `@`, `match`, `final`, `semi-final`, `quarter-final`, `round \d+`, `day \d+`, `innings`, `test \d+`, `odi \d+`, `grand prix`, `gp`, `fight night`, `ufc \d+`, `wrestlemania`, `summerslam`, `royal rumble`, `championship`, `tournament`, `league \d+`, `game \d+`.
   - `channelPatterns`: Star Sports, Sony Ten/Six/Yay/Max, Sky Sports, SuperSport, beIN Sports, Willow, Eurosport, DD Sports, Fox Sports, TNT Sports, DAZN, TSN, Optus, Astro SuperSport, PTV Sports, Geo Super, Ten Sports, Arena Sport, BT Sport, ESPN, Polsat Sport, Ziggo Sport, Canal+ Sport, LaLigaTV, MUTV, Chelsea TV, Real Madrid TV, LFCTV.

---

### 🎯 Micro-Slice 10: Lines 4,029 – 4,467
*Core Functions & State: Safe Fetch, Home Hero Spotlight, Anime Spotlight, TorrServer Bridge, App Init & IMDb Sniffer.*

1. **Safe Fetch Utility (`window.safeFetchJson`, Lines 4030–4043):**
   - Generic JSON fetch wrapper with AbortController and default 3,000ms timeout.

2. **Home Hero Spotlight Carousel (`loadHomeSpotlight`, Lines 4044–4181):**
   - 0ms boot from `sessionStorage.getItem('consumet_spotlight_cache')`.
   - **Sanitization Rule:** Purges cache if it contains `tim_` or `timstreams`.
   - Parallel fetch (`Promise.all`): TMDB `trending/all/week`, `/api/live_events`, `/api/sports`, `/api/spotlight-studio/public`.
   - Ingests Spotlight Studio containers: `window._spotlightStudioPublic`, `window.liveNowShowcaseContainers`, `window.liveEventsShowcaseContainers`, `window.sportsContainersList`.
   - Filters TMDB movies using `isReleasedItem` (top 10).
   - Ingests admin live events and ticked sports channels (`inHomeSpotlight`, `isMainHomeSpotlight`).
   - **Strict Exclusion Rule:** Filters out any items starting with `tim_` or `footlinks_`, or sourced from `timstreams` / `footlinks`.
   - Sorts priority live events (`isMainHomeSpotlight || inHomeSpotlight`) to the very beginning of the slides array.
   - Generates `playUrl`: `/play_consumet.php?url=${encodeURIComponent(ev.url)}&name=${encodeURIComponent(title)}&source=consumet.html&type=hls`.
   - Fallback slides: Dune Part Two (693134), Oppenheimer (872585), Deadpool & Wolverine (533535).
   - 7,000ms auto-rotation timer (`spotlightInterval`), active only when `activeTab === 'home'`, `window.scrollY < 650`, and `!document.hidden`.

3. **Hero Spotlight Carousel Renderer (`renderSpotlightSlider`, Lines 4182–4343):**
   - Binds touch swipe listeners (`touchstart` / `touchend`) with a 40px delta threshold and `container._swipeBound` guard.
   - Caches slide metadata into `window._mediaQuickCache[item.id]`.
   - Triggers `window.prefetchMediaDetails(item.id, type)`.
   - **Admin Live Event Layout:** Player cutout image (`playerPng`), red blinking live badge (`animate-ping`), category badge, 4K ULTRA HD tag, "Watch Live Broadcast" (`openFullscreenPlayer`), and "Sports Hub" (`switchTab('sports')`).
   - **Movie/Series Layout:** `#Featured` rank tag, Apple TV+ / Series vs Feature Film tag, year, 4K HDR tag, star rating, "Play" (`openBingrPlayer`), "Trailer" (`playSelectedTrailer`), and "More Info" (`openDetails`).
   - Calls `updateSpotlightBackgroundTrailer('heroSliderContainer', item, type)`.
   - Resolves and overlays transparent PNG title logo via `fetchTMDBLogo(item.id, type, title)`.

4. **Anime Spotlight Carousel Renderer (`renderAnimeSpotlightSlider`, Lines 4344–4413):**
   - Targets `#animeHeroSliderContainer`.
   - Renders anime hero with cover/banner, clean synopsis (HTML tags stripped), score, episode count, year.
   - Two-button console: "Play" (`searchAndPlayItem(safeTitle, 'player1', 1)`) and "Info" (`openAnimeInfo`).
   - Resolves and overlays transparent anime title logo via `fetchTMDBLogo(null, 'tv', title)`.

5. **BitTorrent Swarm Bridge (`openTorrentPlayerForItem`, Lines 4414–4424):**
   - Constructs redirect URL to TorrServer frontend: `/torrent.html?play=${encodeURIComponent(query)}&tmdb=${tmdbId}&type=${type}`.
   - Appends year for movies. Shows toast and navigates via `window.location.href`.

6. **Application Initialization & Keyboard Shortcuts (`initApp`, Lines 4425–4467):**
   - Keyboard listener: `Ctrl/Cmd + K` opens `#searchPalette` (`openSearchPalette()`), `Escape` closes all open modals.
   - `#searchInput` Enter listener: checks if query contains `imdb.com` or regex `/tt\d{7,10}/`; if so, executes direct playback via `resolveAndPlayIMDb(query)`, otherwise runs `executeSearch()`.
   - Hides `#mainLoader`.
   - Evaluates `sessionStorage.getItem('consumet_player_opened') === '1'`. If returning from player, clears flag immediately and resets `_lastSportsChannelsFetch` and `_lastSportsScheduleFetch` to `Date.now()`.

---

### 🎯 Micro-Slice 11: Lines 4,468 – 4,914
*Core Functions & State: 0ms Session Cache Hydration, Deep Linking, BFCache Restoration, Mobile Navigation, Shelf Scheduler, Home Shelves Orchestra.*

1. **0ms Session Storage Cache Boot & Sanitization (Lines 4474–4565):**
   - `consumet_sports_cache` $\to$ `window.allSportsChannels` (Filters out dummy test IDs: `star1`, `sony1`, `sky1`, `f1`, `espn`, `hbo`, `star_1_hd`, `sony_ten_1`).
   - `consumet_livenow_cache` $\to$ `window.liveNowEvents` & `window.allEvents` (Sanitizes dummy entries matching `/(cricbuzz\s*-\s*aq|stream\.kliv\.in|placeholder|testtapmad|crichd|demo|dummy|sample|offline|expired)/i`).
   - `consumet_sports_spotlight_cache` $\to$ `sportsSpotlightSlides`.
   - `consumet_fancode_cache` $\to$ `window.fancodeLiveMatches`.
   - `consumet_sonyliv_cache` $\to$ `window.sonylivLiveMatches` & `window.sonylivUpcomingMatches`.
   - `consumet_willow_cache` $\to$ `window.willowLiveMatches`.
   - `consumet_prime_cache` $\to$ `window.primeLiveMatches`.
   - `consumet_tim_events_cache` $\to$ `window.timStreamsEvents`.
   - `consumet_tim_channels_cache` $\to$ `window.timStreamsList`.
   - `consumet_highlights_cache` $\to$ `window.sportsHighlights`.
   - `consumet_zee_cache` $\to$ `window.zeeChannels`.
   - `consumet_livetv_cache` $\to$ `window.jtvAllChannels` & `window.jtvCategoriesList`.

2. **Deep Linking & Initial Routing Resolution (Lines 4566–4613):**
   - Calls `resolveInitialRouting()`.
   - Checks `sessionStorage.getItem('consumet_last_tab')`.
   - Activates target tab via `switchTab(routing.targetTab, false)`.
   - If tab is home, executes `loadAllHomeShelves()`; otherwise delays home load by 2,000ms.
   - If `routing.targetMedia` exists, opens details modal after 350ms (`openDetailsModal`).
   - If `routing.searchQuery` exists, populates sports search or main search palette and triggers search.
   - Sets background polling: 15-minute interval for `refreshAllData(true)` and `loadLiveSportsSchedule(true)`.

3. **BFCache Restoration Protocol (`window.pageshow`, Lines 4615–4654):**
   - Intercepts `event.persisted` or `sessionStorage.getItem('consumet_player_opened') === '1'`.
   - If active tab is `livenow`: re-renders grid and shelf; checks 120s TTL for schedule re-fetch.
   - If active tab is `sports`: restores home vs catalog layout, renders sports home and custom chips; checks 180s channel TTL and 120s schedule TTL.

4. **URL & Path Deep-Link Resolver (`resolveInitialRouting`, Lines 4656–4733):**
   - Supports 10 tabs: `home`, `movies`, `tv`, `anime`, `sports`, `livetv`, `livenow`, `watchlist`, `epg`, `player`.
   - Parses query parameters: `q`, `search`, `movie`, `tv`, `anime`, `id`, `type`, `tab`.
   - Parses hash: `#sports`, `#tv`, etc.
   - Parses pathnames: `/movie/:id`, `/tv/:id`, `/anime/:id`, `/watch/:type/:id`, `/consumet/:tab`, `/tvshows`, `/series`, `/live`, `/channels`, `/schedule`.

5. **Mobile Navigation & Drawer Handlers (Lines 4735–4765):**
   - `window.handleMobileGoBack()`: Executes `window.history.back()` if history length > 1, else navigates to `/hero.html`.
   - `window.toggleMobileSectionsDrawer(open)`: Toggles `#mobSectionsDrawer` and `#mobSectionsDrawerContent` with CSS transforms (`translate-y-full` vs `translate-y-0`) and opacity, manages `document.body.style.overflow`, and triggers `lucide.createIcons`.

6. **Viewport-Aware Shelf Scheduler (`scheduleShelfTask`, Lines 4767–4810):**
   - Employs an `IntersectionObserver` with `rootMargin: '750px 0px'`.
   - Stores unexecuted loader tasks in `_shelfTasksMap` (Map) and executed IDs in `_shelfLoadedSet` (Set).
   - Defers DOM queries and network hits until a shelf approaches the viewport, with a fallback timeout for guaranteed loading.

7. **Master Home Shelves Orchestrator (`loadAllHomeShelves`, Lines 4811–4850):**
   - Marks `window._homeLoadedOnce = true`.
   - Concurrently triggers `loadHomeSpotlight()`, `loadTop10Today()`, `loadTop10India()`, `loadTrendingMovies()`, and `loadPopularSeries()` via `Promise.allSettled`.
   - Invokes `window.AetherisAiRecommender.loadAndRender()`.
   - Schedules staggered shelf loaders (60ms to 390ms): `newReleaseIndiaShelf`, `bollywoodShelf`, `malayalamShelf`, `tamilShelf`, `teluguShelf`, `kannadaShelf`, `hindiShelf`, `hwActionShelf`, `hwScifiShelf`, `topRatedShelf`, `animeShelf`, `hollywoodShelf`.
   - Calls `loadExtraHomeShelves()` and `loadNewSubsectionsHome()`.
   - Idly pre-warms the anime catalog after 1,000ms (`loadAnimeCatalog`).

8. **10 Balanced Indian & Hollywood Home Subsections (`loadNewSubsectionsHome`, Lines 4851–4875):**
   - Dispatches 10 discover requests staggered by 60ms:
     1. `homeIndianBlockbustersShelf` (IN, popularity)
     2. `homeHollywoodBlockbustersShelf` (en, popularity)
     3. `homeIndianCrimeSeriesShelf` (IN, genre 80)
     4. `homeGlobalPrestigeSeriesShelf` (en, genre 18)
     5. `homeSouthActionVaultShelf` (te, genre 28)
     6. `marvelDcShelf` (genres 28, 878)
     7. `homeBollywoodClassicsShelf` (hi, vote_count >= 80)
     8. `homeHollywoodScifiShelf` (en, genre 878)
     9. `homeIndianAcclaimedShelf` (IN, vote_count >= 40)
     10. `homeOscarLegendsShelf` (vote_count >= 3000)

9. **Thematic Genre Shelves (`loadExtraHomeShelves`, Lines 4876–4901):**
   - Shelves: `scifiShelf` (878), `koreanShelf` (tv, ko, 18), `comedyShelf` (35), `horrorShelf` (27), `documentaryShelf` (99), `classicShelf` (36), `kidsShelf` (10751), `awardShelf` (18, vote_average.desc).

10. **Hollywood Premieres Banner Showcase (`loadHollywoodPremieres`, Lines 4902–4959):**
    - Queries English movies released in the last 120 days.
    - Renders widescreen 16:9 banner cards (`w-60 sm:w-80 md:w-[450px] aspect-[16/9]`) into `#hollywoodShelf`.
    - Features prefetch on hover/touch, "New Release" badge, star rating, and circular play button.

---

### 🎯 Micro-Slice 12: Lines 4,915 – 5,361
*Core Functions & State: Tab Switcher & Router, Released Item Validator, Universal Shelf Renderer, Shelf Scroller, Top 10 Ranked Shelves, Regional Indian Loaders, Movies/TV Catalog Loaders.*

1. **Tab Switcher & URL Synchronizer (`switchTab`, Lines 4964–5086):**
   - Closes open modals (`closeDetailsModal`, `closeSearchPalette`, `closePersonDetailsModal`, `closeTrailerPopup`).
   - Resets `openModalsCount = 0`, resets body overflow, restarts Lenis.
   - Synchronizes browser history without reload via `window.history.pushState` (`/consumet` or `/consumet/${tab}`).
   - Toggles views: `#view-home`, `#view-movies`, `#view-tv`, `#view-anime`, `#view-sports`, `#view-livetv`, `#view-livenow`, `#view-watchlist`, `#view-epg`, `#view-player`.
   - Updates navigation styles:
     - Desktop tabs: `#tab-${v}` $\to$ `.atv-nav-pill` active (`bg-white text-black`) vs inactive (`text-neutral-400 hover:text-white`).
     - Mobile dock: `#mob-tab-${v}` active (`bg-white text-slate-950`) vs inactive (`text-slate-300 hover:text-white`).
     - Mobile "More" drawer button: `#mob-tab-more` active tint (`bg-amber-500/20 text-amber-300` when on movies/sports/epg/watchlist) vs inactive (`bg-sky-500/15 text-sky-200`).
     - Mobile sub-pills: `#mob-sub-${v}` active with smooth auto-scroll into view (`scrollIntoView({ inline: 'center' })`).
   - Invokes target tab loaders:
     - `home`: `loadAllHomeShelves()`
     - `sports`: checks `sportsHomeLayout` vs `sportsCatalogLayout`, `loadSportsChannels()`, `loadLiveSportsSchedule()`, `loadLiveMatchEvents()`, `loadIplReplays()`
     - `livetv`: `loadLiveTvCatalog()`
     - `livenow`: `loadLiveSportsSchedule()`
     - `epg`: `fetchAndParseEpg()` (once)
     - `watchlist`: `renderWatchlist()`
     - `movies`: `loadMoviesHomeData()`
     - `tv`: `loadTvHomeData()`
     - `anime`: `loadAnimeCatalog()`
   - Scrolls window to top instantly (`window.scrollTo({ top: 0, behavior: 'instant' })`).
   - Hydrates Lucide icons.

2. **Browser History Navigation (`popstate`, Lines 5088–5098):**
   - If `e.state.mediaId` exists, re-opens `openDetailsModal(e.state.mediaId, e.state.mediaType)`.
   - Otherwise resolves destination tab and calls `switchTab(routing.targetTab, false)`.

3. **Release Date & Status Validator (`isReleasedItem`, Lines 5099–5112):**
   - Verifies that `release_date` or `first_air_date` is not in the future (`releaseTime <= Date.now()`).
   - Filters out unreleased production statuses: `In Production`, `Planned`, `Post Production`, `Upcoming`, `Not Yet Released`.

4. **Universal Media Shelf Renderer (`renderShelfGrid`, Lines 5113–5175):**
   - Renders vertical 2:3 media cards (`w-32 sm:w-40 md:w-44 lg:w-52 aspect-[2/3]`).
   - Caches items into `window._mediaQuickCache` under both `${type}_${item.id}` and `${item.id}`.
   - Binds `mouseenter` and `touchstart` prefetching (`window.prefetchMediaDetails`).
   - Click opens `openDetails(item.id, type, title)`.
   - Hover shows circular play button overlay, rating badge, title, year, and Series/Film tag.
   - Efficient single-pass DOM insertion via `shelf.replaceChildren(fragment)`.

5. **Smooth Shelf Scroller (`scrollShelf`, Lines 5176–5182):**
   - Scrolls target shelf horizontally by 82% of its client width (minimum 400px).

6. **Top 10 OTT Ranked Shelves Renderer (`renderTop10Shelf`, Lines 5183–5260):**
   - Renders 10 ranked cards with massive typographic rank numbers (1 to 10) positioned behind each poster (`text-[5.5rem] sm:text-[7.2rem] lg:text-[8.5rem] font-black`).
   - Rank numbers use CSS gradient text: `linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(148,163,184,0.28) 65%, rgba(15,23,42,0.05) 100%)` with `-webkit-background-clip: text` and `-webkit-text-fill-color: transparent`.
   - Card features: `top10-ott-card`, rating badge, `TOP ${rank}` badge, play button hover overlay, title, year, and Series/Film tag.
   - **Anime Routing:** If `badgePrefix === 'ANIME'` or `item.isAnime`, click invokes `openAnimeInfo(...)`, else `openDetails(...)`.

7. **Regional Indian Cinema & Hollywood Shelves (Lines 5261–5307):**
   - `loadTop10India`: `discover/movie`, origin country `IN`, popular $\to$ `#top10IndiaShelf`.
   - `loadNewReleaseIndia`: `discover/movie`, origin country `IN`, release $\le$ 2026-08-20, recent $\to$ `#newReleaseIndiaShelf`.
   - `loadBollywoodMovies`: `discover/movie`, language `hi`, popular $\to$ `#bollywoodShelf`.
   - `loadMalayalamMovies`: `discover/movie`, language `ml`, popular $\to$ `#malayalamShelf`.
   - `loadTamilMovies`: `discover/movie`, language `ta`, popular $\to$ `#tamilShelf`.
   - `loadTeluguMovies`: `discover/movie`, language `te`, popular $\to$ `#teluguShelf`.
   - `loadKannadaMovies`: `discover/movie`, language `kn`, popular $\to$ `#kannadaShelf`.
   - `loadHindiMovies`: `discover/movie`, language `hi`, release $\le$ 2026-08-20, recent $\to$ `#hindiShelf`.
   - `loadHwAction`: `discover/movie`, language `en`, genre 28 $\to$ `#hwActionShelf`.
   - `loadHwScifi`: `discover/movie`, language `en`, genre 878 $\to$ `#hwScifiShelf`.
   - `loadTop10Today`: `trending/all/day` $\to$ `#top10Shelf`.
   - `loadTrendingMovies`: `movie/popular` $\to$ `moviesList`, `#trendingMoviesShelf`, `#moviesGrid`.
   - `loadPopularSeries`: `tv/popular` $\to$ `tvList`, `#trendingSeriesShelf`, `#tvGrid`.
   - `loadTopRatedMasterpieces`: `movie/top_rated` $\to$ `#topRatedShelf`.
   - `loadAsianDramaAndAnime`: `discover/tv`, genre 16, language `ja` $\to$ `#animeShelf`.

8. **Movies View Subsections (`loadMoviesHomeData`, Lines 5308–5343):**
   - Guarded by `moviesHomeLoaded` flag.
   - Schedules 10 paired Indian / Hollywood movie shelves:
     1. `moviePanIndiaShelf` (IN, popular)
     2. `movieHwActionShelf` (en, genre 28)
     3. `movieSouthCinemaShelf` (ta, popular)
     4. `movieHwScifiShelf` (en, genre 878)
     5. `movieIndianCrimeShelf` (IN, genre 80)
     6. `movieHwCrimeShelf` (en, genre 80)
     7. `movieIndianComedyShelf` (IN, genre 35)
     8. `movieHwHorrorShelf` (en, genres 27, 53)
     9. `movieIndianHistoricalShelf` (IN, genres 36, 18)
     10. `movieHwAcclaimedShelf` (en, vote_count $\ge$ 2500)

9. **TV Series View Subsections (`loadTvHomeData`, Lines 5345–5361+):**
   - Guarded by `tvHomeLoaded` flag.
   - Schedules 10 paired Indian / Hollywood TV series shelves:
     1. `tvIndianTopSeriesShelf` (IN, popular)
     2. `tvHwPrestigeDramaShelf` (en, genre 18)
     3. `tvIndianCrimeShelf` (IN, genre 80)
     4. `tvHwScifiShelf` (en, genre 10765)
     5. `tvIndianComedyShelf` (IN, genre 35)
     6. `tvHwEspionageShelf` (en, genre 10759)
     7. *(Continues with Mythological, Anime, UK Drama, etc.)*

---

## 3. Comprehensive Discrepancy Matrix (`consumet.html` vs `consumet_structure.md`)

### A. Missing or Under-Specified Global & Window State Variables
| Variable in `consumet.html` | Scope | Purpose | Status in `consumet_structure.md` |
|---|---|---|---|
| `_trailerKeyCache` | Local / Module | Hash map caching YouTube trailer keys | ❌ Missing |
| `currentSpotlightTrailerKey`| Local / Module | Active video key for home hero background trailer | ❌ Missing |
| `openModalsCount` | Local / Module | Counter tracking open modals for Lenis scroll lock | ❌ Missing |
| `window._animeCache` | Global (`window`) | Lookup cache for anime items by ID | ❌ Missing |
| `window._searchCache` | Global (`window`) | Resolved search and TMDB-mapped anime cache | ❌ Missing |
| `currentSearchQuery` | Local / Module | Current active text in search bar | ❌ Missing |
| `searchTimeout` | Local / Module | Debounce timer ID for live search | ❌ Missing |
| `moviesPage` / `tvPage` | Local / Module | Active pagination counters for movie and TV grids | ❌ Missing |
| `moviesList` / `tvList` | Local / Module | Cached results from popular TMDB movie/TV endpoints | ❌ Missing |
| `spotlightSlides` | Local / Module | Processed slides array for hero spotlight carousel | ❌ Missing |
| `currentSlideIndex` | Local / Module | Current zero-based index of hero spotlight slide | ❌ Missing |
| `spotlightInterval` | Local / Module | 7-second interval timer ID for spotlight auto-rotation | ❌ Missing |
| `window._spotlightStudioPublic` | Global (`window`) | Raw config payload from `/api/spotlight-studio/public` | ❌ Missing |
| `window.liveNowShowcaseContainers` | Global (`window`) | Custom showcase containers array for Live Now | ❌ Missing |
| `window.liveEventsShowcaseContainers` | Global (`window`) | Custom showcase containers array for Live Events | ❌ Missing |
| `window.sportsContainersList` | Global (`window`) | Custom sports containers list | ❌ Missing |
| `window.adminLiveEvents` | Global (`window`) | Verified admin sports events filtered for hero billboard | ❌ Missing |
| `container._swipeBound` | DOM Property | Flag preventing duplicate touch swipe event listeners | ❌ Missing |
| `window._animeCatalogWarmed` | Global (`window`) | Flag preventing duplicate idle anime pre-warming | ❌ Missing |
| `window._homeLoadedOnce` | Global (`window`) | Flag marking initial home shelves load completion | ❌ Missing |
| `_shelfTasksMap` | Local / Module | `Map<string, Function>` mapping shelf ID to loader task | ❌ Missing |
| `_shelfLoadedSet` | Local / Module | `Set<string>` tracking loaded shelves | ❌ Missing |
| `_shelfIntersectionObserver` | Local / Module | IntersectionObserver instance with 750px rootMargin | ⚠️ Under-specified |
| `moviesHomeLoaded` | Local / Module | Boolean guard preventing duplicate `loadMoviesHomeData` | ❌ Missing |
| `tvHomeLoaded` | Local / Module | Boolean guard preventing duplicate `loadTvHomeData` | ❌ Missing |
| `animeSpotlightSlides` | Local / Module | Slides array for anime otaku hero spotlight | ❌ Missing |
| `currentAnimeSlideIndex` | Local / Module | Current index of anime hero spotlight | ❌ Missing |

---

### B. Missing or Under-Specified SessionStorage Keys & Sanitization Rules
| SessionStorage Key | Documented in Blueprint? | Missing Logic in Blueprint |
|---|---|---|
| `consumet_spotlight_cache` | ⚠️ Listed | Missing purge rule: if payload contains `'tim_'` or `'timstreams'`, it must be discarded immediately. |
| `consumet_player_opened` | ⚠️ Listed as `'true'/'false'` | In code it is checked as `=== '1'`. When true, resets `_lastSportsChannelsFetch` and `_lastSportsScheduleFetch` to `Date.now()`. |
| `consumet_sports_cache` | ⚠️ Listed | Missing test ID sanitizer: must purge dummy IDs `['star1', 'sony1', 'sky1', 'f1', 'espn', 'hbo', 'star_1_hd', 'sony_ten_1']`. |
| `consumet_livenow_cache` | ⚠️ Listed | Missing dummy marker regex: must purge entries matching `/(cricbuzz\s*-\s*aq\|stream\.kliv\.in\|placeholder\|testtapmad\|crichd\|demo\|dummy\|sample\|offline\|expired)/i`. |
| `consumet_sports_spotlight_cache` | ❌ Omitted | 0ms cache for `sportsSpotlightSlides`. |
| `consumet_fancode_cache` | ❌ Omitted | 0ms cache for `window.fancodeLiveMatches`. |
| `consumet_sonyliv_cache` | ❌ Omitted | 0ms cache for `window.sonylivLiveMatches` and `window.sonylivUpcomingMatches`. |
| `consumet_willow_cache` | ❌ Omitted | 0ms cache for `window.willowLiveMatches`. |
| `consumet_prime_cache` | ❌ Omitted | 0ms cache for `window.primeLiveMatches`. |
| `consumet_tim_events_cache` | ❌ Omitted | 0ms cache for `window.timStreamsEvents`. |
| `consumet_tim_channels_cache` | ❌ Omitted | 0ms cache for `window.timStreamsList`. |
| `consumet_highlights_cache` | ❌ Omitted | 0ms cache for `window.sportsHighlights`. |
| `consumet_zee_cache` | ❌ Omitted | 0ms cache for `window.zeeChannels`. |
| `consumet_livetv_cache` | ⚠️ Listed | Missing structure: stores `{ channels: [...], categories: [...] }`. |

---

### C. Missing DOM Elements & Shelf Targets
The following DOM elements are manipulated directly in lines 3,575–5,361 but lack explicit specification in `consumet_structure.md`:

1. **Spotlight & Player Overlays:**
   - `#heroSliderContainer`: Spotlight container with dynamic `.spotlight-bg-trailer` iframe injection and `.spotlight-bg-image`.
   - `#animeHeroSliderContainer`: Anime otaku hero carousel container.
   - `.spotlight-nav-arrow`: Stylized chevron navigation buttons.
   - `.spotlight-title-container`: Dynamic container toggling between transparent PNG logo and text fallback.
   - `.anime-spotlight-title-container`: Transparent logo container for anime hero.

2. **Custom Anime Modal Elements:**
   - `#detailsModal`: The container modal.
   - `#detailTitle`, `#detailOverview`, `#detailPoster`, `#detailBackdrop`, `#detailYear`, `#detailRating`, `#detailRuntime`, `#detailType`, `#imdbBadge`.
   - `#detailNextEpisodeAlert`: Banner displaying next airing episode number and date.
   - `#detailCast`, `#detailGenres`, `#tvNavigator`, `#seasonSelector`, `#episodesGrid`.
   - `#trailerBgContainer`, `#detailsTrailerControls`, `#trailerBgIframe`.

3. **Navigation & Drawer Elements:**
   - `#mainLoader`: Main app splash loader.
   - `#mobSectionsDrawer`: Off-canvas full-drawer container.
   - `#mobSectionsDrawerContent`: Slide-up content container.
   - `#mob-tab-more`: Drawer toggle button with dynamic amber vs sky active states.
   - `#mob-sub-${v}`: Mobile category sub-pills with auto-centering `scrollIntoView`.

4. **Home Shelves:**
   - `#top10Shelf`, `#top10IndiaShelf`, `#newReleaseIndiaShelf`, `#bollywoodShelf`, `#malayalamShelf`, `#tamilShelf`, `#teluguShelf`, `#kannadaShelf`, `#hindiShelf`.
   - `#hwActionShelf`, `#hwScifiShelf`, `#topRatedShelf`, `#animeShelf`, `#hollywoodShelf`.
   - 10 Subsections: `#homeIndianBlockbustersShelf`, `#homeHollywoodBlockbustersShelf`, `#homeIndianCrimeSeriesShelf`, `#homeGlobalPrestigeSeriesShelf`, `#homeSouthActionVaultShelf`, `#marvelDcShelf`, `#homeBollywoodClassicsShelf`, `#homeHollywoodScifiShelf`, `#homeIndianAcclaimedShelf`, `#homeOscarLegendsShelf`.
   - 8 Thematic Shelves: `#scifiShelf`, `#koreanShelf`, `#comedyShelf`, `#horrorShelf`, `#documentaryShelf`, `#classicShelf`, `#kidsShelf`, `#awardShelf`.

5. **Movies & TV View Shelves:**
   - Movies View (10 shelves): `#moviePanIndiaShelf`, `#movieHwActionShelf`, `#movieSouthCinemaShelf`, `#movieHwScifiShelf`, `#movieIndianCrimeShelf`, `#movieHwCrimeShelf`, `#movieIndianComedyShelf`, `#movieHwHorrorShelf`, `#movieIndianHistoricalShelf`, `#movieHwAcclaimedShelf`.
   - TV View (6+ shelves): `#tvIndianTopSeriesShelf`, `#tvHwPrestigeDramaShelf`, `#tvIndianCrimeShelf`, `#tvHwScifiShelf`, `#tvIndianComedyShelf`, `#tvHwEspionageShelf`.

---

### D. Missing Core Functions & Algorithmic Specifications
The following functions exist in lines 3,575–5,361 but are completely missing from `consumet_structure.md`:
1. `updateSpotlightBackgroundTrailer(containerId, item, type)`: Embeds YouTube nocookie iframe for hero spotlight with 1s fade-in/fade-out cross-fade.
2. `fetchAniListGraphQL(query, variables)`: AniList GraphQL fetcher with 8,000ms AbortController.
3. `handleModalOpen(modalEl)` / `handleModalClose(modalEl)`: Modal manager handling body overflow lock, flex classes, and Lenis smooth scrolling stop/start.
4. `openAnimeInfo(animeItem)`: Multi-tier TMDB title resolver for anime with suffix cleanup and AniList/MAL metadata preservation.
5. `openCustomAnimeDetails(animeItem)`: Rich details modal fallback for anime series without TMDB metadata.
6. `isLinearChannel(titleOrItem)`: Dual-regex classifier distinguishing 24/7 channels from match fixtures.
7. `window.safeFetchJson(url, ms)`: Fetch wrapper with AbortController timeout.
8. `renderAnimeSpotlightSlider(index)`: Dedicated anime hero billboard renderer.
9. `openTorrentPlayerForItem(title, tmdbId, type, year)`: Direct bridge to TorrServer p2p streaming frontend.
10. `resolveInitialRouting()`: Comprehensive multi-parameter URL router supporting tabs, query params, hashes, and clean paths.
11. `window.handleMobileGoBack()`: Contextual mobile back button handler.
12. `window.toggleMobileSectionsDrawer(open)`: Mobile drawer animation and scroll lock controller.
13. `scheduleShelfTask(shelfId, taskFn, delayMs)`: IntersectionObserver-based lazy shelf executor with 750px rootMargin.
14. `loadAllHomeShelves()`: Home shelves master conductor with staggered scheduling.
15. `loadNewSubsectionsHome()`: 10 balanced Indian/Hollywood home subsections loader.
16. `loadExtraHomeShelves()`: 8 thematic genre shelves loader.
17. `loadHollywoodPremieres()`: 120-day Hollywood new releases 16:9 banner showcase loader.
18. `refreshAllData(silent)`: Periodic 15-minute data synchronizer.
19. `isReleasedItem(item)`: Release date and status validation engine.
20. `renderShelfGrid(items, elementId, defaultType)`: Reusable 2:3 poster card shelf renderer.
21. `scrollShelf(shelfId, direction)`: Smooth horizontal shelf scroller (82% width jump).
22. `renderTop10Shelf(items, elementId, badgePrefix, defaultType)`: Specialized Top 10 renderer with giant background typographic ranking numbers.
23. Regional Indian loaders: `loadTop10India`, `loadNewReleaseIndia`, `loadBollywoodMovies`, `loadMalayalamMovies`, `loadTamilMovies`, `loadTeluguMovies`, `loadKannadaMovies`, `loadHindiMovies`, `loadHwAction`, `loadHwScifi`.
24. Catalog loaders: `loadMoviesHomeData`, `loadTvHomeData`, `loadTop10Today`, `loadTrendingMovies`, `loadPopularSeries`, `loadTopRatedMasterpieces`, `loadAsianDramaAndAnime`.

---

### E. Critical Edge Cases & Platform Protection Rules
1. **AniList ID Collision Protection:** AniList IDs are arbitrary integers that can match unintended TMDB movie/show IDs. Lines 3632–3633 strictly suppress the ID parameter (`searchId = null`) when fetching trailers for anime items.
2. **Title Suffix Sanitation for Anime:** Anime search queries often fail in TMDB due to scraper suffixes like `- Episode 1`, `Season 2`, `(TV)`, `(Dub)`, or `(Sub)`. Lines 3717–3723 execute explicit regex removal before querying TMDB.
3. **IMDb Sniffer in Main Search Bar:** Entering an IMDb URL (`imdb.com/title/tt...`) or IMDb ID (`tt\d{7,10}`) into the main search box bypasses TMDB search entirely and triggers direct playback resolution via `resolveAndPlayIMDb(query)`.
4. **Hero Billboard Stream Disinfection:** Lines 4113–4118 strictly forbid TimStreams (`tim_`) or Footlinks (`footlinks_`) streams from appearing in the Home hero spotlight, ensuring only authentic high-bitrate admin feeds or cinematic movies are featured.
5. **Touch Swipe Guard:** Carousel touch listeners are bound idempotently via `container._swipeBound` with a 40px minimum movement threshold to prevent false-triggering during vertical scrolling.
6. **BFCache Restoration & Anti-Thrashing Guard:** When a user navigates back from a video player, `sessionStorage.getItem('consumet_player_opened') === '1'` is detected. The application immediately resets `_lastSportsChannelsFetch` and `_lastSportsScheduleFetch` to `Date.now()`, preventing destructive and disruptive re-fetching of all network streams.
7. **Dummy Stream Sanitization:** 0ms boot caches are strictly sanitized against developer placeholder channels (`star1`, `sony1`, etc.) and test match markers (`placeholder`, `demo`, `dummy`, `sample`, `offline`, `expired`).

---

## 4. Recommendations for React + TypeScript Migration (ARVIO Blueprint)

1. **State Management (`Zustand` / `React Context`):**
   - Replace fragmented global variables (`activeTab`, `spotlightSlides`, `currentSlideIndex`, `openModalsCount`) with a dedicated `useNavigationStore` and `useSpotlightStore`.
   - Model `openModalsCount` in a `useModalStore` with an effect that automatically applies `document.body.style.overflow = 'hidden'` and pauses Lenis.

2. **0ms Fast-Boot Cache Hooks:**
   - Create a typed custom hook `useFastBootCache<T>(key: string, sanitizer?: (data: T) => T)` that performs synchronous hydration from `sessionStorage` during initial state creation to eliminate loading spinners entirely.

3. **Lazy Shelf Scheduling:**
   - In React, replace `scheduleShelfTask` and manual `IntersectionObserver` with component-level lazy rendering using `react-intersection-observer` or native `content-visibility: auto`.
   - Maintain the staggered delay logic (60ms–390ms) to ensure smooth 60fps rendering without UI thread blocking.

4. **URL & Routing:**
   - Consolidate `resolveInitialRouting` and `switchTab` into standard React Router v6 or TanStack Router routes: `/`, `/movies`, `/tv`, `/anime`, `/sports`, `/livetv`, `/livenow`, `/watchlist`, `/epg`, with nested routes `/movie/:id` and `/tv/:id`.

---

## 5. Audit Completion & Status

- **Lines Audited:** 3,575 to 5,361 (`consumet.html`)
- **Micro-Slices:** 9, 10, 11, 12
- **File Integrity Check:** `anime_bing.php` was **NEVER touched or modified** (verified 100% untouched).
- **Report Saved To:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_check_agent3.md`
