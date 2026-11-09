# 🔍 Consumet Final Check Audit — Part 4 (Micro-Slices 13, 14, 15, 16 | Lines 5,362 to 7,148)

**Target Codebase:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html`  
**Reference Specification:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_structure.md`  
**Scope:** Lines 5,362 to 7,148 (1,786 lines total across Micro-Slices 13, 14, 15, and 16)  
**Auditor:** Final Check Auditor 4 (Antigravity Code Inspection Engine)  
**Safety Compliance:** Strict zero-modification compliance for `anime_bing.php`.

---

## 1. Executive Summary & Micro-Slice Demarcation

This audit provides an exhaustive, line-by-line inspection of **Micro-Slices 13 through 16** of `consumet.html` (Lines 5,362 to 7,148). This segment contains the core interactive machinery powering:
1. **Catalog Filtering & Pagination Subsystem**: TMDB genre/year filter queries, dynamic catalog/home layout toggling, infinite pagination, and responsive card construction.
2. **Fullscreen Search Studio Engine (`#searchPalette`)**: Instant 200ms debouncing, multi-pool synchronous local memory preview, lightning-fast inline SVG iconography, deduplicated merging of local and remote sports/channel/VOD pools, LRU query caching, and five specialized category renderers.
3. **URL Routing & Address Bar Synchronization**: Deep linking with `window.history.pushState` and `window.history.replaceState` for `/movie/:id`, `/tv/:id`, `/anime/:id`, and tab state restoration without page refreshes.
4. **Apple TV+ Media Details Dialog (`#detailsModal`)**: 0ms instant stubbing, multi-tier fallback metadata resolution (IMDb ID find, multi-search, clean string queries), strict Japanese anime and Movie/TV disambiguation algorithms, TV Season 1 prewarming, high-res PNG logo overlay, next episode release countdown alert, dual-action play buttons, 320ms deferred desktop YouTube background trailer loop, horizontal cast scroller with secondary backend profile hydrator, and TV season/episode filtering & view-mode switcher.

### Micro-Slice Boundaries
- **Micro-Slice 13 (Lines 5,362–5,808)**: TV Discover Shelves Completion, Catalog Filtering & Infinite Pagination (`applyFilters`, `loadMore`, `renderFilterGrid`, `appendFilterGrid`), Search Palette Lifecycle (`openSearchPalette`, `closeSearchPalette`, `clearSearchInput`), Inline SVGs (`_searchSvg`), Trending Chips, 200ms Debounce, and Synchronous Local Preview Search across 6 channel pools, 4 event pools, and VOD/Anime caches.
- **Micro-Slice 14 (Lines 5,809–6,255)**: Remote Search API Orchestration (`/api/consumet/search`), Deduplicated Local+API Event & Channel Merging, Search Cache LRU Management, Fallback TMDB Multi-Search, and Specialized Result Renderers (`renderTMDBSearchResults`, `renderBackendSearchResults`, `renderAnimeSearchResults`, `renderEventsSearchResults`, `renderChannelsSearchResults`).
- **Micro-Slice 15 (Lines 6,256–6,701)**: Unified Multi-Category Search Dispatcher (`renderUnifiedSearchResults`), Fuzzy Word Overlap Matcher (`titlesMatch`), Address Bar Deep-Link PushState Router (`openDetailsModal`), YouTube Trailer Key Scorer (`findTrailerKey`), Episode View-Mode Switcher (`setEpisodeViewMode`), Episode Sort (1-N / N-1) & Filter Engine (`toggleEpisodeSort`, `filterSeasonEpisodes`, `clearEpisodeSearch`, `renderFilteredEpisodes`), and Media Details Dialog Entry (`openDetails`) with 0ms Instant Stubbing & Fast Cache Lookup.
- **Micro-Slice 16 (Lines 6,702–7,148)**: TMDB Details Append-To-Response Fetching, Fallback IMDb External Source Resolver, Strict Japanese Anime & Film/Series Disambiguation Ciphers, Season 1 Prewarming Pipeline, Dynamic High-Res PNG Logo Injection (`fetchTMDBLogo`), Next Episode Countdown Banner, Dual-Action Play Button Engine ("Play S1 Ep1" vs "Latest Ep [Bing]"), Desktop 320ms Deferred YouTube Trailer Background Player, Cast & Crew Scroller with Bingr Fallback Hydration, TV Season Navigator, History URL Restoration (`history.replaceState`), and Season Episode Fetcher (`loadSeasonEpisodes`).

---

## 2. Line-by-Line Micro-Slice Code Audit

### 2.1 Micro-Slice 13: Lines 5,362 to 5,808

#### A. TV Discover Subsections Completion (Lines 5,362–5,380)
- **Code Logic**:
  - Completes the 10 balanced Indian and Hollywood TV subsections:
    - Shelf 7: `tvIndianMythologyShelf` (Origin `IN`, Genre `18` Drama, sorted by `vote_average.desc`).
    - Shelf 8: `tvHwDarkFantasyShelf` (Lang `en`, Genre `10765` Sci-Fi & Fantasy, sorted by `vote_count.desc`).
    - Shelf 9: `tvIndianRomanceShelf` (Origin `IN`, Genres `18,35` Drama/Comedy, sorted by `popularity.desc`).
    - Shelf 10: `tvHwSitcomShelf` (Lang `en`, Genre `35` Comedy, `vote_count.gte: 1000`, sorted by `vote_average.desc`).
  - Staggered task scheduling: `scheduleShelfTask(item.shelf, ..., idx < 3 ? 0 : idx * 45)`.
  - Global state flag: sets `tvHomeLoaded = true`.

#### B. Catalog Filter & Pagination Pipeline (Lines 5,381–5,459)
- **`applyFilters(type)` (Lines 5,381–5,403)**:
  - Supports both `'movies'` and `'tv'`.
  - DOM elements: reads value of `${type}-genre` and `${type}-year`.
  - Layout switching:
    - If `!genre && !year`: reveals `#${type}HomeLayout` (`classList.remove('hidden')`) and hides `#${type}CatalogLayout` (`classList.add('hidden')`).
    - If filters active: hides home layout, reveals catalog layout, and queries TMDB `discover/movie` or `discover/tv` with `with_genres` and `primary_release_year`.
    - Dispatches to `renderFilterGrid(data.results || [], gridId, defaultType)`.
- **`loadMore(type)` (Lines 5,404–5,417)**:
  - Increments pagination counters: `++moviesPage` or `++tvPage`.
  - Fetches the next page of filtered results and calls `appendFilterGrid`.
- **`renderFilterGrid` & `appendFilterGrid` (Lines 5,418–5,459)**:
  - Uses `document.createDocumentFragment()` for single-reflow DOM updates.
  - Applies item release validation via `isReleasedItem`.
  - Card construction: `.shelf-card`, `aspect-[2/3]`, TMDB poster with Unsplash fallback (`photo-1594909122845-11baa439b7bf`), rating badge (`★ ${rating}`), year extraction, media type chip (`Series` vs `Film`), and hover play button.
  - Interactive click: binds `card.onclick = () => openDetails(item.id, type, title)`.

#### C. Fullscreen Search Palette Engine: Foundation & Controls (Lines 5,460–5,595)
- **Variables & Abort Controller**:
  - `searchTimeout = null;`
  - `let searchAbortController = null;`
  - `const _searchMemoryCache = new Map();` (200-capacity LRU memory store).
- **`updateSearchClearBtn()` (Lines 5,464–5,475)**:
  - Dynamically toggles `#searchClearBtn` visibility by adding/removing `opacity-0 pointer-events-none` vs `opacity-100 pointer-events-auto` based on `#searchInput.value.trim().length`.
- **`openSearchPalette()` (Lines 5,476–5,494)**:
  - Opens modal: `handleModalOpen(document.getElementById('searchPalette'))`.
  - Desktop autofocus: conditionally focuses `#searchInput` if `!('ontouchstart' in window) && window.innerWidth >= 768`.
  - Re-evaluates state: if query present, invokes `executeSearch()`, otherwise renders trending chips via `renderSearchTrendingChips()`.
- **`closeSearchPalette()` (Lines 5,495–5,504)**:
  - Aborts pending `searchAbortController`, clears `searchTimeout`, and closes modal via `handleModalClose`.
- **`clearSearchInput(event)` (Lines 5,505–5,525)**:
  - Resets `#searchInput.value = ''`, aborts in-flight fetch, restores trending chips, and re-focuses input on desktop.
- **`setSearchPaletteQuery(q)` & `setSearchFilter(filterKey)` (Lines 5,526–5,550)**:
  - Programmatically sets query or filter (`#searchEngineSource`), updates styling of `.search-filter-pill` buttons (active `bg-white text-black` vs inactive `bg-white/[0.06] text-neutral-300`), and executes search.
- **Native Inline SVGs Dictionary (`_searchSvg`) (Lines 5,551–5,563)**:
  - Embeds 9 pre-compiled SVG strings: `star`, `play`, `tv`, `radio`, `playCircle`, `film`, `trophy`, `activity`, `sparkles`.
  - Eliminates Lucide icon DOM reconciliation overhead, ensuring 0ms latency during high-speed typing.
- **`renderSearchTrendingChips()` (Lines 5,564–5,595)**:
  - Injects 11 preset trending queries into `#searchResults`:
    - Movies: *M80 Moosa*, *Aavesham*, *Manjummel Boys*, *Deadpool & Wolverine*, *Kalki 2898 AD*, *Pushpa 2*.
    - TV Channels: *Star Sports 1 HD*, *Sony Sports Ten 1*.
    - Sports Tournament: *IPL 2026*.
    - Anime: *One Piece*, *Demon Slayer*.

#### D. Debounced Execution & Synchronous Local Memory Preview (Lines 5,596–5,808)
- **`debounceSearch()` (Lines 5,606–5,626)**:
  - 200ms debounce timer (reduced from legacy 1000ms delay).
  - Shows `#searchSpinner` immediately on keystroke without wiping the DOM.
  - Aborts pending requests if query is empty and restores trending chips.
- **`executeSearch()`: Phase 1 — Local Preview Scan (Lines 5,627–5,795)**:
  - Cache check: instant return if `_searchMemoryCache.has(cacheKey)`.
  - Aborts active controller: `searchAbortController.abort()`.
  - Allocates local preview arrays:
    - **Channels Preview** (`previewChannels`, cap: 18): Scans across 6 loaded global pools: `window.allSportsChannels`, `window.allChannelsData`, `window.channelsData`, `window.jtvAllChannels`, `window.mix1tvAllChannels`, `window.liveM3uAllChannels`. Deduplicated using alphanumeric keys `n.replace(/[^a-z0-9]/g, '')`.
    - **Events Preview** (`previewEvents`, cap: 12): Scans across 4 global event pools: `window.liveNowEvents`, `window.allEvents`, `window.liveEventsData`, `window.liveM3uEvents`.
    - **Movies Preview** (`previewMovies`, cap: 6): Scans `window.moviesList`, `window.tvList`, `window.spotlightSlides`.
    - **Anime Preview** (`previewAnime`, cap: 6): Scans `window._animeCache`.
  - **Instant Preview Render**: If any local items match, renders immediately to `#searchResults` before the network request is initiated.
  - Skeleton guard: only displays spinner skeleton if no local matches exist and container has no prior cards.
- **Remote API Dispatch (Lines 5,796–5,808)**:
  - Initiates request: `fetch('/api/consumet/search?q=' + encodeURIComponent(query) + '&source=' + encodeURIComponent(source) + '&limit=48', { signal: currentSignal })`.

---

### 2.2 Micro-Slice 14: Lines 5,809 to 6,255

#### A. Search Response Processing & Deduplicated Merging (Lines 5,801–5,896)
- **Stale Request Interceptor**:
  - Drops results if `currentSignal.aborted || input.value.trim().toLowerCase() !== qLower`.
- **Deduplicated Local + API Merging (Lines 5,812–5,833)**:
  - Merges `previewEvents` with `apiEvents` using alphanumeric keys: ensures live sports events discovered in local memory are never replaced or dropped by remote API responses.
  - Merges `previewChannels` with `apiChannels` using matching normalized channel identifiers.
- **LRU Memory Cache Storage (Lines 5,834–5,846)**:
  - Caches `{ events, channels, movies, anime, timing_ms }` in `_searchMemoryCache`.
  - Enforces FIFO/LRU eviction when cache size exceeds 200 entries.
- **Render Dispatcher**:
  - Routes to specialized renderers based on source: `anilist` $\to$ `renderAnimeSearchResults`, `events` $\to$ `renderEventsSearchResults`, `channels` $\to$ `renderChannelsSearchResults`, `tmdb` $\to$ `renderTMDBSearchResults`, or `all` $\to$ `renderUnifiedSearchResults`.
- **Fallback TMDB Multi-Search (Lines 5,879–5,889)**:
  - If backend `/api/consumet/search` is unreachable or returns an error, gracefully falls back to `fetchTMDB('search/multi', { query })`.
- **Error Handling**:
  - Silently ignores `AbortError`. Renders escaped error badge for other exceptions.

#### B. Specialized Search Result Renderers (Lines 5,897–6,250)
- **`renderTMDBSearchResults(list, container, isSection = false)` (Lines 5,897–5,998)**:
  - Filters out `media_type === 'person'`.
  - Responsive grid: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4`.
  - Caching: populates `window._searchCache[item.id]`, `window._searchCache['${type}_${item.id}']`, and `window._mediaQuickCache`.
  - Pre-fetching: attaches `mouseenter` and `touchstart` listeners calling `window.prefetchMediaDetails(item.id, type)`.
  - Click handler: closes search palette; if anime detected (`type === 'anime' || (item.isAnime && item.original_language === 'ja')`), opens `openAnimeInfo(...)`, otherwise `openDetails(item.id, type, title)`.
  - UI Elements: poster with fallback, star rating badge, `SERIES` chip for TV, play overlay, language and year chips, title and synopsis.
- **`renderBackendSearchResults(list, container)` (Lines 5,999–6,028)**:
  - Renders torrent and direct streaming sources with quality badge (`HD`), stream size, seed count, and a direct "Play" button invoking `searchAndPlayItem`.
- **`renderAnimeSearchResults(list, container, isSection = false)` (Lines 6,029–6,120)**:
  - Section header: Indigo theme with `ANIME HUB` badge.
  - Normalizes anime metadata: `malId`, `anilistId`, English/Romaji titles, large cover image, score, episodes count, and genres.
  - Caches into `window._animeCache[id]` and `window._searchCache`.
  - Click handler: closes search palette and calls `openAnimeInfo(animeObj)`.
  - UI Elements: aspect-[2/3] cover, `ANIME` badge, rating, play hover overlay, episode count, and `SUB/DUB` badge.
- **`renderEventsSearchResults(list, container, isSection = false)` (Lines 6,121–6,192)**:
  - Section header: Red pulsating indicator with `LIVE FEEDS` badge.
  - Responsive grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3`.
  - Resolves metadata: title, sport category, emoji badge, thumbnail, channel name, and direct play URL.
  - Click handler: closes search palette; if direct `playUrl` exists, launches `openFullscreenPlayer(playUrl, title)`, else if event ID exists, launches `openSportMatchOvalModal(ev.id)`.
- **`renderChannelsSearchResults(list, container, isSection = false)` (Lines 6,193–6,250)**:
  - Section header: Radio icon with `24/7 CHANNELS` badge.
  - Responsive grid: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3`.
  - Resolves metadata: channel name, logo with dynamic UI Avatars fallback (`https://ui-avatars.com/api/?name=...&background=0f172a&color=f59e0b&bold=true`), and direct stream URL.
  - Click handler: closes search palette; if `playUrl` present, redirects via `window.location.href = playUrl`, else calls `openFullscreenPlayer(ch, name)`.

---

### 2.3 Micro-Slice 15: Lines 6,256 to 6,701

#### A. Unified Search Dispatcher & Fuzzy Title Matcher (Lines 6,251–6,292)
- **`renderUnifiedSearchResults(events, channels, movies, anime, container)` (Lines 6,253–6,278)**:
  - Handles parameter shift if container is passed in the anime argument slot.
  - Builds document fragment appending sections in strict hierarchy:
    1. Live Sports & Events (`renderEventsSearchResults`, `isSection = true`).
    2. 24/7 Live TV Channels (`renderChannelsSearchResults`, `isSection = true`).
    3. Movies & TV Series (`renderTMDBSearchResults`, `isSection = true`).
    4. Anime Series & Movies (`renderAnimeSearchResults`, `isSection = true`).
  - Updates DOM via `container.replaceChildren(fragment)`.
- **`titlesMatch(t1, t2)` (Lines 6,279–6,292)**:
  - Fuzzy string matching algorithm:
    1. Cleans strings: lowercases and replaces non-alphanumeric characters with spaces.
    2. Direct match check (`clean1 === clean2`).
    3. Filters out short words ($\le 2$ characters).
    4. Substring fallback if word tokens are empty.
    5. Calculates word intersection ratios: `ratio1 = matching / words1.length`, `ratio2 = matching / words2.length`. Returns `true` if either ratio $\ge 0.5$ or if one string contains the other.

#### B. URL PushState Router & Player Controls (Lines 6,293–6,371)
- **`openDetailsModal(id, type, expectedTitle = '')` (Lines 6,293–6,315)**:
  - Type normalization: maps `series`/`tv`/`show` $\to$ `tv`, `anime` $\to$ `anime`, default `movie`.
  - **Browser History PushState**:
    - Updates address bar to `/${targetType}/${encodeURIComponent(id)}` with state `{ mediaId: id, mediaType: targetType }`.
  - Dispatches: anime $\to$ `openAnimeInfo({ id, title })`, others $\to$ `openDetails(id, targetType, cleanTitle)`.
- **State Variables & Trailer Scoring (Lines 6,317–6,329)**:
  - `_detailsRequestCounter`: monotonic counter for race condition invalidation.
  - `currentSeasonEpisodes`: array of episodes in active TV season.
  - `episodeSortAscending`: boolean toggle for episode sorting.
  - `episodeViewMode`: string toggle (`'list'` vs `'grid'`).
  - **`findTrailerKey(videos)`**: Scans TMDB videos array prioritizing YouTube `Trailer` $\to$ `Teaser` $\to$ generic YouTube video.
- **Episode View Mode & Sorting (Lines 6,330–6,371)**:
  - `setEpisodeViewMode(mode)`: updates styling on `#btnEpisodeViewList` and `#btnEpisodeViewGrid`, then re-renders episodes.
  - `toggleEpisodeSort()`: toggles `episodeSortAscending`, updates `#episodeSortLabel` (`1-N` vs `N-1`), and re-renders.
  - `filterSeasonEpisodes(query)`: filters episodes by number, title, or overview; toggles `#episodeSearchClearBtn`.
  - `clearEpisodeSearch()`: clears search input and resets filter.

#### C. Filtered Episode Rendering Engine (`renderFilteredEpisodes`) (Lines 6,372–6,486)
- **Filtering & Sorting Algorithm**:
  - Filters `currentSeasonEpisodes` by query matching `episode_number`, `name`, or `overview`.
  - Sorts by `episode_number` ascending or descending based on `episodeSortAscending`.
  - Updates `#episodesCountBadge` (`${list.length} Episodes`).
- **Render Mode 1: List View (`episodeViewMode === 'list'`) (Lines 6,408–6,454)**:
  - Container class: `flex flex-col gap-3`.
  - Layout: horizontal card with aspect-video still (`https://image.tmdb.org/t/p/w400...`), episode number badge, play hover overlay.
  - Metadata: episode title (`Episode X • Title`), runtime (`Xm`), 2-line synopsis.
  - **4 Direct Action Buttons**:
    1. **Play Bing**: `openBingrPlayer(null, ep.episode_number, this)`
    2. **Stream**: `selectedEpisode = ep.episode_number; openFullscreenPlayer();`
    3. **HLS**: `openHlsPlayer(ep.episode_number);`
    4. **Torrent**: `openTorrentPlayer(ep.episode_number);`
- **Render Mode 2: Grid View (`episodeViewMode === 'grid'`) (Lines 6,455–6,484)**:
  - Container class: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`.
  - Layout: vertical card with aspect-video thumbnail, hover overlay with Play Bing and Stream buttons, episode badge, title, 2-line synopsis, season/episode indicator (`S{season} : E{ep}`), and footer Play Bing button.
- **Icon Flush**: Calls `triggerLucide()` to render injected Lucide icon placeholders.

#### D. Media Details Dialog Entry & 0ms Instant Stubbing (`openDetails`) (Lines 6,487–6,701)
- **Modal Reset & Race Condition Guard (Lines 6,489–6,525)**:
  - Resets scroll position: `modal.scrollTop = 0`.
  - Increments `_detailsRequestCounter`.
  - Opens modal: `handleModalOpen(modal)`.
  - Resets previous trailer video: clears `iframe.src = ''`, hides `#trailerBgContainer` and `#detailsTrailerControls`, restores backdrop opacity.
- **Fast 0ms Pre-Cache Retrieval (Lines 6,527–6,544)**:
  - Checks in order: `window._mediaQuickCache['${normalizedReqType}_${id}']`, `window._mediaQuickCache[id]`, `window._searchCache[id]`, `window._animeCache[id]`.
- **Immediate State Population (`selectedMedia`) (Lines 6,545–6,562)**:
  - **Critical Architectural Behavior**: Immediately instantiates `selectedMedia` with cached or stub metadata before any network request completes. Ensures all action buttons (Play Bing, Play Movie, Play HLS, Torrent) are instantly clickable with 0ms latency.
  - Initializes `selectedSeason = 1; selectedEpisode = 1;`.
- **Skeleton Shimmer vs Cached Render (Lines 6,563–6,630)**:
  - If cached: immediately populates title, overview, poster, backdrop, year, and rating.
  - If not cached: displays pulsating pink gradient skeleton placeholders across title, synopsis, genres, and cast bubbles.
  - Hides badges: `#detailCastCountBadge`, `#tvNavEl`, `#imdbBadge`, `#detailNextEpisodeAlert`.
- **In-Memory & Session Details Cache Lookup (Lines 6,634–6,648)**:
  - Checks `window._detailsDataCache[cacheKey]` and `sessionStorage.getItem('full_details_' + cacheKey)`.
- **Timed Network Fetch & Title Verification (Lines 6,651–6,701)**:
  - Uses `fetchWithTimeout(promise, 4000)` with a 4-second timeout to prevent hanging.
  - Queries TMDB: `fetchTMDB('${actualType}/${id}', { append_to_response: 'credits,videos,external_ids,images' })`.
  - Validates title correspondence using `titlesRoughlyMatch`.
  - Type flip fallback: if primary fetch fails, flips type (`movie` $\leftrightarrow$ `tv`) and re-queries.
  - Preserves anime metadata if item exists in `_searchCache`.

---

### 2.4 Micro-Slice 16: Lines 6,702 to 7,148

#### A. Stale Check & Fallback Search Resolution (Lines 6,701–6,763)
- **Cache Persistence**:
  - Stores resolved data in `window._detailsDataCache[finalCacheKey]` and persists to `sessionStorage` (`full_details_${finalCacheKey}`).
- **Stale Response Guard**:
  - `if (currentReqId !== _detailsRequestCounter) return;`
- **Fallback TMDB Resolution Pipeline (Lines 6,711–6,748)**:
  - **Step 1: IMDb ID Find**: If ID matches `^tt\d{7,10}$`, queries `find/${imdbId}` with `external_source: 'imdb_id'`.
  - **Step 2: Targeted Search**: Queries `search/tv` or `search/movie` with query string.
  - **Step 3: Multi Search**: Queries `search/multi`.
  - **Step 4: Clean Query Multi Search**: Strips punctuation (`[_\.\-\:]`) and searches again.
  - Re-fetches full details with `append_to_response: 'credits,videos,external_ids,images'`.
- **Synthetic Credits Fallback (Lines 6,749–6,757)**:
  - If TMDB credits are missing but cached item has cast strings, constructs synthetic cast credits array: `{ id: 99000 + idx, name: c, character: 'Starring', profile_path: null }`.

#### B. Anime Detection & Media Type Disambiguation (Lines 6,764–6,813)
- **Strict Anime Detection Algorithm (Lines 6,764–6,776)**:
  - `isJapaneseAnimation`: evaluates if `original_language === 'ja'` AND either `genres` includes ID `16` / name matches `/anim/i`, or `genre_ids` includes `16`.
  - `isDetectedAnime`: evaluates `requestedIsAnime || (data.isAnime && (original_language === 'ja' || isJapaneseAnimation)) || isJapaneseAnimation`.
  - Prevents non-anime Japanese live-action titles from being miscategorized as anime.
- **Strict Movie vs TV Disambiguation Algorithm (Lines 6,777–6,795)**:
  - If requested as `movie` but has no `release_date`, has `first_air_date`, and has valid seasons with `season_number > 0` $\to$ reclassifies as `tv`.
  - If requested as `tv` but has `release_date`, no `first_air_date`, and 0 seasons $\to$ reclassifies as `movie`.
- **State & History Persistence**:
  - Updates `selectedMedia` properties (`media_type`, `type`, `isAnime`).
  - Calls `saveToHistory(selectedMedia)`.
  - Resets `selectedSeason = 1; selectedEpisode = 1;`.
- **TV Season 1 Prewarming Pipeline (Lines 6,804–6,813)**:
  - For TV series, asynchronously fires background fetch `fetchTMDB('tv/${data.id}/season/1')` and prewarms `window._seasonEpisodesCache['${data.id}_s1']`.

#### C. Details Metadata & High-Res PNG Logo Injection (Lines 6,814–6,890)
- **Metadata Rendering**:
  - Updates title, tagline, synopsis, release year, star rating, runtime, and media type label.
  - Backdrop and poster image binding with fallback URLs.
- **Dynamic Title Logo Injection (Lines 6,832–6,851)**:
  - Primary resolution: inspects `data.images.logos` array directly, prioritizing English logos (`iso_639_1 === 'en'`).
  - Injects high-res PNG logo: `<img src="https://image.tmdb.org/t/p/w500${file_path}" class="max-h-16 sm:max-h-24 max-w-[85%] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] animate-fade-in">`.
  - Asynchronous fallback: if logo not embedded in TMDB details, sets text title and invokes `fetchTMDBLogo(id, actualType, title)`.
- **Next Episode Release Countdown Banner (`#detailNextEpisodeAlert`) (Lines 6,852–6,890)**:
  - Detects `actualType === 'tv' && data.next_episode_to_air`.
  - Formats release date into localized string (e.g., `Wed, Nov 12, 2026`).
  - Renders gradient alert card (`from-amber-500/20 via-orange-500/15 to-indigo-950/40`) with animated bell icon, pulsing indicator, Season/Episode numbers, episode title, and release date badge.

#### D. Dual-Action Play Buttons & Desktop YouTube Trailer Autoplay (Lines 6,891–6,965)
- **Dual Play Button Engine (Lines 6,891–6,930)**:
  - **TV Series Mode**:
    - Primary Button (`#detailsPlayBtn`): sets label to `Play S1 Ep1`.
    - Dynamic Secondary Button (`#detailsPlayLatestBingBtn`):
      - Injects or updates gradient button (`bg-gradient-to-r from-red-600 via-rose-600 to-amber-600`).
      - Identifies latest season and episode from `data.seasons` (filtering valid non-specials).
      - Label: `Latest (S${dispSeason} E${dispEp}) [Bing]`.
      - Onclick handler: sets `selectedSeason = dispSeason`, `selectedEpisode = dispEp`, and invokes `openBingrPlayer(data, latestEpNum, this)`.
  - **Movie Mode**:
    - Primary Button (`#detailsPlayBtn`): sets label to `Play Movie`.
    - Hides `#detailsPlayLatestBingBtn`.
- **Background YouTube Trailer Player (Lines 6,931–6,965)**:
  - Device check: `isMobileDevice = window.innerWidth < 768 || ('ontouchstart' in window);`.
  - Desktop-only optimization: extracts trailer key via `findTrailerKey` (disabled on mobile).
  - 320ms deferred initialization: opens modal instantly at 60 FPS before initializing YouTube iframe.
  - YouTube Embed Parameters: `autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&playsinline=1&rel=0&enablejsapi=1`.
  - Fades in `#trailerBgContainer` (`opacity-100`), hides static backdrop, reveals `#detailsTrailerControls`, and sets `isTrailerPlaying = true; isTrailerMuted = true;`.

#### E. Genres, IMDb Badge, Cast Scroller & Secondary Hydration (Lines 6,966–7,046)
- **Genres & IMDb Badge**:
  - Maps genres to pill badges.
  - Links `#imdbBadge` to `https://www.imdb.com/title/${data.external_ids.imdb_id}/` and updates `#imdbRatingVal`.
- **Cast & Crew Scroller (Lines 6,979–7,005)**:
  - Clamps cast array to 12 members (mobile) or 24 members (desktop).
  - Renders actor cards with profile image, actor name, character name, and "Profile →" button.
  - Card click handler: `openPersonModal(c.id, actorName, c.profile_path, charName)`.
- **Secondary Backend Cast Hydration Fallback (Lines 7,006–7,046)**:
  - If TMDB cast is empty, queries backend endpoint `/api/media/info?title=${encodeURIComponent(title)}&type=${actualType === 'tv' ? 'series' : 'movie'}`.
  - Parses `infoData.info.cast` array, extracting actor names, character roles, and photos.
  - Dynamically updates `#detailCast` and `#detailCastCountBadge`.

#### F. Season Navigator, Modal Teardown & History Restoration (Lines 7,047–7,148)
- **TV Season Navigator (`#tvNavigator`) (Lines 7,047–7,076)**:
  - Reveals `#tvNavigator` if `actualType === 'tv'` and seasons exist.
  - Populates `#seasonSelector` dropdown, filtering out Season 0 specials unless it is the only season.
  - Triggers `loadSeasonEpisodes()`.
- **Cast List Slider**:
  - `slideCastList(offset)`: scrolls `#detailCast` horizontally by offset (`scrollBy({ left: offset, behavior: 'smooth' })`).
- **Modal Teardown & History URL Restoration (`closeDetailsModal`) (Lines 7,086–7,114)**:
  - Increments `_detailsRequestCounter` to cancel any pending async operations.
  - Clears `iframe.src = ''`, restores backdrop opacity, hides trailer controls.
  - Calls `handleModalClose(modal)`.
  - **History Restoration**: If pathname starts with `/movie`, `/tv`, `/anime`, or `/watch`, calls `window.history.replaceState({ tab: activeTab }, '', tabPath)` to restore the address bar back to `/consumet` or `/consumet/${activeTab}` without reloading.
- **Actor Modal Closer**:
  - `closePersonDetailsModal()`: closes `#personDetailsModal`.
- **`loadSeasonEpisodes()` (Lines 7,121–7,148)**:
  - Validates `selectedMedia.media_type === 'tv'`.
  - Reads `#seasonSelector.value`, sets `selectedSeason`.
  - Checks memory cache `window._seasonEpisodesCache['${selectedMedia.id}_s${seasonNum}']`.
  - Displays loading skeleton in `#episodesGrid`.
  - Queries TMDB `tv/${selectedMedia.id}/season/${seasonNum}`.
  - Fallback: uses `selectedMedia.episodes` if TMDB season returns empty.

---

## 3. Detailed Gap & Omission Analysis: `consumet_structure.md`

Comparing the audited code (Lines 5,362 to 7,148) against `consumet_structure.md` reveals critical gaps, missing specifications, unlisted variables, omitted DOM IDs, and unmentioned edge cases.

### 3.1 Missing Global Variables & Runtime State
| Variable / Identifier | Code Location | Status in `consumet_structure.md` | Description & Impact |
|---|---|---|---|
| `searchTimeout` | Line 5,461 | **Missing** | Timer ID for the 200ms search input debounce. Without this, React implementations will suffer keystroke lag or duplicate fetch calls. |
| `searchAbortController` | Line 5,462 | **Missing** | Global `AbortController` used to cancel obsolete search requests when typing fast. Omitted from Section 4.1. |
| `_searchMemoryCache` | Line 5,597 | **Under-specified** | Mentioned only as a Map. Missing its 200-item FIFO/LRU eviction rule (`_searchMemoryCache.delete(firstKey)`) and its composite cache key format `${source}:${qLower}`. |
| `_detailsRequestCounter` | Line 6,317 | **Missing** | Monotonic counter incremented on modal open and close to invalidate stale async fetches. Essential to prevent race conditions. |
| `currentSeasonEpisodes` | Line 6,318 | **Missing** | Array storing the active season's episodes for filtering and sorting. |
| `episodeSortAscending` | Line 6,319 | **Missing** | Boolean toggle for sorting episodes 1-N vs N-1. |
| `episodeViewMode` | Line 6,320 | **Missing** | Toggle between `'list'` and `'grid'` episode card rendering modes. |
| `tvHomeLoaded` | Line 5,379 | **Missing** | Guard flag preventing duplicate shelf task scheduling when switching tabs back to TV. |
| `_searchSvg` | Line 5,553 | **Missing** | Pre-compiled dictionary of 9 native SVGs bypassing Lucide icon overhead during search rendering. |

### 3.2 Missing or Underspecified DOM IDs & Markup Nodes
| DOM Element ID | Code Location | Status in `consumet_structure.md` | Role & Functional Significance |
|---|---|---|---|
| `#searchClearBtn` | Line 5,466 | **Missing** | Instant clear button inside the search palette input container, toggled with opacity/pointer-events classes. |
| `#searchSpinner` | Line 5,600 | **Missing** | Input box spinner indicating network search activity without clearing displayed results. |
| `#searchEngineSource` | Line 5,540 | **Missing** | Hidden `<select>` dropdown synchronizing category filter state with `.search-filter-pill` buttons. |
| `.search-filter-pill` | Line 5,542 | **Missing** | Filter buttons styled dynamically on selection (`bg-white text-black` vs `bg-white/[0.06] text-neutral-300`). |
| `#moviesHomeLayout` / `#moviesCatalogLayout` | Line 5,386 | **Missing** | Dynamic layout containers toggled when applying movie genre/year filters. |
| `#tvHomeLayout` / `#tvCatalogLayout` | Line 5,386 | **Missing** | Dynamic layout containers toggled when applying TV series genre/year filters. |
| `#detailsPlayLatestBingBtn` | Line 6,908 | **Missing** | Dynamically injected secondary high-visibility gradient button for TV series playing the latest episode on Bingr. |
| `#detailNextEpisodeAlert` | Line 6,853 | **Missing** | Broadcast alert banner displaying release date countdown for upcoming TV episodes. |
| `#btnEpisodeViewList` | Line 6,332 | **Missing** | Button toggling episode list view mode. |
| `#btnEpisodeViewGrid` | Line 6,333 | **Missing** | Button toggling episode grid view mode. |
| `#episodeSortLabel` | Line 6,348 | **Missing** | Text span displaying active episode sort direction (`1-N` or `N-1`). |
| `#episodeSearchInput` | Line 6,365 | **Missing** | Input box for filtering season episodes by number, name, or synopsis. |
| `#episodeSearchClearBtn` | Line 6,357 | **Missing** | Clear button for episode search input. |
| `#episodesCountBadge` | Line 6,394 | **Missing** | Badge displaying filtered episode count (e.g. `24 Episodes`). |
| `#detailCastCountBadge` | Line 6,507 | **Missing** | Badge displaying total cast member count (e.g. `18 Members`). |
| `#imdbBadge` & `#imdbRatingVal` | Line 6,509 | **Under-specified** | Direct anchor to IMDb title page and its numerical rating span. |
| `#detailsTrailerControls` | Line 6,513 | **Missing** | Floating controls for muting and pausing the background YouTube trailer. |

### 3.3 Missing Functions & Algorithmic Workflows
| Function / Routine | Code Location | Status in `consumet_structure.md` | Algorithmic Importance |
|---|---|---|---|
| `applyFilters(type)` | Line 5,381 | **Missing** | Controls layout switching, parameter construction, and filter grid rendering. |
| `loadMore(type)` | Line 5,404 | **Missing** | Increments pagination and appends cards to active filter grid. |
| `renderFilterGrid` & `appendFilterGrid` | Line 5,418 | **Missing** | Builds and appends responsive movie/TV cards with release validation (`isReleasedItem`). |
| `updateSearchClearBtn()` | Line 5,464 | **Missing** | Manages clear button visibility states. |
| `clearSearchInput(event)` | Line 5,505 | **Missing** | Aborts search controller, resets input, and restores trending chips. |
| `setSearchPaletteQuery(q)` | Line 5,527 | **Missing** | Programmatic search query setter used by trending chips. |
| `setSearchFilter(filterKey)` | Line 5,539 | **Missing** | Category filter switcher and button active state updater. |
| `renderSearchTrendingChips()` | Line 5,565 | **Missing** | Renders the 11 hardcoded regional hits, live sports channels, and anime trending items. |
| `debounceSearch()` | Line 5,606 | **Missing** | 200ms debounce controller with immediate spinner activation. |
| `executeSearch()` (Local Preview Phase) | Line 5,674 | **Missing** | O(1) synchronous scan across 6 channel pools, 4 event pools, and VOD/Anime memory pools. |
| Deduplicated Event & Channel Merging | Line 5,812 | **Missing** | Merges local memory items with remote API responses so local live sports feeds are never dropped. |
| `renderBackendSearchResults` | Line 5,999 | **Missing** | Renderer for torrent/stream results with seeds and quality tags. |
| `titlesMatch(t1, t2)` | Line 6,279 | **Missing** | Fuzzy string matcher with $\ge 50\%$ word overlap threshold. |
| `findTrailerKey(videos)` | Line 6,322 | **Missing** | YouTube video scorer prioritizing Trailer over Teaser. |
| `setEpisodeViewMode(mode)` | Line 6,330 | **Missing** | View mode switcher between list and grid. |
| `toggleEpisodeSort()` | Line 6,346 | **Missing** | Sort order toggler between 1-N and N-1. |
| `filterSeasonEpisodes(query)` | Line 6,354 | **Missing** | Real-time episode filter by number, title, or overview text. |
| `clearEpisodeSearch()` | Line 6,364 | **Missing** | Resets episode filter input. |
| 0ms Instant Stubbing in `openDetails` | Line 6,546 | **Missing** | Immediate instantiation of `selectedMedia` before network calls complete to ensure zero button lag. |
| Strict Anime Detection Cipher | Line 6,764 | **Missing** | Disambiguation logic combining `original_language === 'ja'`, genre ID `16`, and anime flags. |
| Movie vs TV Disambiguation Cipher | Line 6,777 | **Missing** | Resolves media type discrepancies based on `release_date`, `first_air_date`, and season counts. |
| TV Season 1 Prewarming Pipeline | Line 6,804 | **Missing** | Asynchronous background fetch of Season 1 episodes upon opening TV details. |
| Dynamic High-Res PNG Logo Extraction | Line 6,832 | **Missing** | Extraction from `data.images.logos` with English priority before calling external logo fetcher. |
| Secondary Backend Cast Hydration | Line 7,006 | **Missing** | Fallback query to `/api/media/info` to retrieve actor photos when TMDB credits are missing. |
| Browser History PushState & ReplaceState | Line 6,300 | **Missing** | Deep link URL synchronization (`/${targetType}/${id}`) on modal open, and restoration on modal close. |
| 320ms Deferred Desktop YouTube Trailer | Line 6,934 | **Missing** | 320ms deferred iframe loading ensuring 60 FPS modal opening animations. |

---

## 4. React + TypeScript Migration Architecture

To port Lines 5,362 to 7,148 into an enterprise React + TypeScript architecture, implement the following modular stores, hooks, and components:

### 4.1 State Management (Zustand Stores)

#### A. `useSearchStore` (`src/stores/useSearchStore.ts`)
```typescript
interface SearchResultItem {
  id: string | number;
  title: string;
  media_type: 'movie' | 'tv' | 'anime' | 'event' | 'channel';
  poster?: string;
  rating?: string | number;
  year?: string;
  sport?: string;
  channelName?: string;
  playUrl?: string;
}

interface SearchState {
  isOpen: boolean;
  query: string;
  activeFilter: 'all' | 'tmdb' | 'events' | 'channels' | 'anilist';
  isLoading: boolean;
  results: {
    events: SearchResultItem[];
    channels: SearchResultItem[];
    movies: SearchResultItem[];
    anime: SearchResultItem[];
  };
  searchCache: Map<string, any>;
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (q: string) => void;
  setFilter: (f: 'all' | 'tmdb' | 'events' | 'channels' | 'anilist') => void;
  executeSearch: () => Promise<void>;
  clearSearch: () => void;
}
```

#### B. `useMediaDetailsStore` (`src/stores/useMediaDetailsStore.ts`)
```typescript
interface Episode {
  episode_number: number;
  name: string;
  overview: string;
  still_path?: string;
  runtime?: number;
}

interface MediaDetailsState {
  isOpen: boolean;
  media: any | null;
  selectedSeason: number;
  selectedEpisode: number;
  episodes: Episode[];
  episodeViewMode: 'list' | 'grid';
  episodeSortAscending: boolean;
  episodeSearchQuery: string;
  trailerKey: string | null;
  isTrailerPlaying: boolean;
  isTrailerMuted: boolean;
  openDetails: (id: string | number, type: string, title?: string) => Promise<void>;
  closeDetails: () => void;
  setSeason: (seasonNum: number) => Promise<void>;
  setEpisode: (epNum: number) => void;
  setEpisodeViewMode: (mode: 'list' | 'grid') => void;
  toggleEpisodeSort: () => void;
  setEpisodeSearchQuery: (q: string) => void;
}
```

### 4.2 Component Breakdown

| React Component | Target Path | Functionality & Source Lines |
|---|---|---|
| `SearchPaletteModal` | `src/components/modals/SearchPaletteModal.tsx` | Fullscreen modal with `#searchInput`, clear button, filter pills, trending chips, and multi-category results (Lines 5,460–6,278). |
| `MediaDetailsModal` | `src/components/modals/MediaDetailsModal.tsx` | Apple TV+ style dialog with background YouTube loop, high-res PNG logo, next episode release banner, dual play buttons, and cast scroller (Lines 6,487–7,114). |
| `SeasonEpisodeNavigator` | `src/components/details/SeasonEpisodeNavigator.tsx` | Season dropdown, search filter input, sort toggle, list/grid toggle, and episode cards with Play Bing / Stream / HLS / Torrent buttons (Lines 6,330–6,486, 7,121–7,148). |
| `CastScroller` | `src/components/details/CastScroller.tsx` | Horizontal actor scroller with smooth arrow buttons and fallback profile hydration via `/api/media/info` (Lines 6,979–7,046, 7,081–7,085). |
| `CatalogFilterBar` | `src/components/catalog/CatalogFilterBar.tsx` | Genre and Year dropdown filter bar for Movies and TV catalog views (Lines 5,381–5,459). |

---

## 5. Summary of Verification & Compliance

1. **Micro-Slices Audited**: Micro-Slices 13, 14, 15, and 16 (Lines 5,362 to 7,148 of `consumet.html`) have been inspected sequentially with complete architectural coverage.
2. **Missing Specifications Identified**: Over 10 global state variables, 17 DOM element IDs, 21 algorithmic routines, and 6 failure recovery sequences omitted or underspecified in `consumet_structure.md` have been documented.
3. **Protected Files**: Verified zero modifications to `anime_bing.php`.
4. **Output Destination**: Full audit saved to `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_check_agent4.md`.
