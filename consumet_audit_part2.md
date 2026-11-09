# Exhaustive Technical Audit of consumet.html (Partition 2: Lines 3,601 – 7,200)

---

## 1. Executive Summary & Scope

This document provides a line-by-line architectural and functional audit of **Partition 2 (Lines 3,601 to 7,200)** of `consumet.html`. Partition 2 forms the **core presentation, data fetching, caching, deep-linking, search, and modal playback orchestration layer** of the application.

It encompasses:
1. **Client-Side Data & TMDB Caching**: Dual-layer LRU memory map and `sessionStorage` caching mechanism.
2. **Speculative Prefetching**: Viewport and hover/touch-driven prefetching pipelines.
3. **TMDB Transparent Logo Resolver**: High-resolution graphic asset resolution with cascading fallbacks.
4. **Weighted Trailer Resolution Engine**: Multi-tier heuristic scoring algorithm for official YouTube trailers.
5. **Browser Lifecycle & BFCache Engine**: Instant restoration from Back-Forward cache (`pageshow`), deep linking, and history synchronization (`popstate`, `pushState`, `replaceState`).
6. **Viewport-Aware Shelf Scheduler**: IntersectionObserver-driven lazy loading of 30+ regional and genre shelves.
7. **Fullscreen Search Palette Engine**: 200ms debounced multi-pool in-memory preview combined with backend search proxy.
8. **Media Details Modal (`#detailsModal`)**: Full modal lifecycle, background YouTube trailer looping with `postMessage` audio control, technical badges, 8 action buttons, cast scroller, and dynamic season/episode switcher.
9. **Complete Catalog**: All helper functions, regular expressions, storage keys, and DOM IDs.

---

## 2. TMDB Client Cache & Data Fetcher

### 2.1 Architecture & Storage Structure
The caching mechanism spans across lines 3,374–3,410 and is actively invoked throughout lines 3,601–7,200:
- **Primary In-Memory Cache**: `const _tmdbClientCache = new Map();`
- **Secondary Session Storage**: `window._safeSessionSet('tmdb_' + cacheKey, JSON.stringify(data));`
- **Full Details Cache**: `window._detailsDataCache = window._detailsDataCache || {};`
- **Quick Cache**: `window._mediaQuickCache = window._mediaQuickCache || {};`
- **Season/Episode Cache**: `window._seasonEpisodesCache = window._seasonEpisodesCache || {};`

### 2.2 Cache Capacity & Eviction Policy
- **Map Capacity**: Capped at **200 entries**.
- **Eviction Strategy**: First-In, First-Out (FIFO) / Least Recently Added eviction via standard JavaScript `Map` iterator:
  ```javascript
  if (_tmdbClientCache.size > 200) {
      const first = _tmdbClientCache.keys().next().value;
      if (first) _tmdbClientCache.delete(first);
  }
  ```
- **Session Cache Fallback**: When in-memory cache misses, `window._safeSessionGet('tmdb_' + cacheKey)` checks browser `sessionStorage`. On a hit, it reconstitutes the data into `_tmdbClientCache` immediately for sub-millisecond retrieval.

### 2.3 Standalone Offline Fallback Pool
If the backend TMDB proxy (`/api/bingr/tmdb-proxy`) is unreachable or encounters network failure (lines 3,411–3,460), the client falls back to an embedded offline pool (`_fallbackPool`) containing hardcoded high-quality payloads for:
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

---

## 3. Speculative Prefetching Mechanisms

### 3.1 `prefetchMediaDetails(id, type)` (Lines 3,466–3,492)
Designed to eliminate navigation latency before the user clicks a card:
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
        .catch(() => {})
        .finally(() => {
            _detailsPrefetchInFlight.delete(cacheKey);
        });
}
```

### 3.2 Hover & Touch Prefetching Integration
Every rendered media card across home shelves, search grids, and spotlights binds speculative prefetching:
- `card.addEventListener('mouseenter', () => window.prefetchMediaDetails(item.id, type));`
- `card.addEventListener('touchstart', () => window.prefetchMediaDetails(item.id, type), { passive: true });`
- **Recursive TV Season 1 Prewarming**: If the item is a TV series, Season 1 episodes (`tv/${id}/season/1`) are asynchronously fetched and stored in `_seasonEpisodesCache[`${id}_s1`]` before the user even opens the modal.

---

## 4. TMDB Logo Resolver (`fetchTMDBLogo`)

### 4.1 Resolution Pipeline (Lines 3,495–3,537 & 6,832–6,850)
The application resolves transparent PNG title logos instead of plain text headings:
1. **Direct Extract from Response Payload**:
   In `openDetails` (line 6,834), it first checks if `data.images.logos` is already present:
   ```javascript
   const enLogo = data.images.logos.find(l => l.iso_639_1 === 'en') || data.images.logos[0];
   ```
2. **Numeric ID Lookup via Images API**:
   `fetchTMDBLogo(id, type, searchTitle)` queries `${type}/${id}/images?include_image_language=en,null`.
3. **Title Search Fallback**:
   If `id` is non-numeric or images return empty, it executes `search/tv` or `search/multi` by title, picks the best match, and queries its images endpoint.
4. **Caching**: Results are stored in memory in `_logoCache[cacheKey]`.
5. **CDN Sizing & Formatting**:
   URL template: `https://image.tmdb.org/t/p/w500${file_path}`.
6. **Graceful Error Fallback**:
   If image fails to load (`onerror`), the DOM replaces itself with uppercase styled typography:
   ```html
   onerror="this.outerHTML='<span class=\'text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase\'>${title}</span>'"
   ```

---

## 5. Weighted Trailer Resolution Engine (`fetchOfficialTrailerKey`)

### 5.1 Heuristic Scoring Points Table (Lines 3,540–3,626)
Trailer selection scores YouTube videos returned by TMDB according to a strict priority hierarchy:

| Condition | Match Parameter | Score Addition |
|---|---|---|
| **Official Flag** | `v.official === true` | **+100** |
| **Language** | `v.iso_639_1 === 'en'` | **+50** |
| **Type: Trailer** | `typeLower === 'trailer'` | **+80** |
| **Name Keyword** | `nameLower.includes('official trailer')` | **+50** |
| **Name Keyword** | `nameLower.includes('main trailer')` | **+30** |
| **Name Keyword** | `nameLower.includes('final trailer')` | **+30** |
| **Type: Teaser** | `typeLower === 'teaser'` | **+30** |
| **Type: Clip** | `typeLower === 'clip'` | **+10** |

### 5.2 Multi-Tier Fallback Cascade
1. **Tier 1**: TMDB videos endpoint by ID with English filter: `${type}/${id}/videos?include_video_language=en,null`.
2. **Tier 2**: TMDB videos endpoint by ID without language filter: `${type}/${id}/videos`.
3. **Tier 3**: TMDB search by title (`search/tv` or `search/multi`), then query videos on top match.
4. **Tier 4 (Internal YouTube Proxy)**:
   ```javascript
   const queryStr = `${title} official trailer`;
   const ytRes = await fetch(`/api/music/yt-search?q=${encodeURIComponent(queryStr)}`);
   const ytData = await ytRes.json();
   const key = ytData.videoId || ytData.id;
   ```
5. **Cache**: Key stored in `_trailerKeyCache[`${type}_${id}_${title}`]`.

---

## 6. BFCache Hydration, Lifecycle & Browser History Sync

### 6.1 BFCache & `pageshow` Restoration (Lines 4,615–4,654)
When a user navigates back from external players or subpages:
- Checks `event.persisted || sessionStorage.getItem('consumet_player_opened') === '1'`.
- Immediately purges `consumet_player_opened`.
- Checks staleness thresholds to prevent redundant network fetches:
  - `_lastSportsChannelsFetch` (threshold: **180,000ms / 3 minutes**)
  - `_lastSportsScheduleFetch` (threshold: **120,000ms / 2 minutes**)
- Re-renders cached live events and channels without UI flashes:
  - For `livenow`: executes `renderLiveNowGrid()` and `renderLiveNowShelf()`.
  - For `sports`: restores `sportsHomeLayout` and `renderUserCustomSportsChips()`.

### 6.2 Browser History Management
- **`switchTab(tab, updateHistory = true)` (Lines 4,965–5,086)**:
  Synchronizes browser URL bar without page reload:
  ```javascript
  const targetPath = (tab === 'home') ? '/consumet' : `/consumet/${tab}`;
  window.history.pushState({ tab: tab }, '', targetPath);
  ```
- **`openDetailsModal(id, type, expectedTitle)` (Lines 6,294–6,315)**:
  Updates address bar to deep-linkable path:
  ```javascript
  const mediaPath = `/${targetType}/${encodeURIComponent(id)}`;
  window.history.pushState({ mediaId: id, mediaType: targetType }, '', mediaPath);
  ```
- **`closeDetailsModal()` (Lines 7,086–7,113)**:
  Restores URL to current active tab:
  ```javascript
  const tabPath = (activeTab === 'home') ? '/consumet' : `/consumet/${activeTab}`;
  window.history.replaceState({ tab: activeTab }, '', tabPath);
  ```
- **`popstate` Listener (Lines 5,088–5,097)**:
  Handles user clicking browser forward/back buttons:
  - If `e.state?.mediaId` is present, invokes `openDetailsModal(e.state.mediaId, e.state.mediaType)`.
  - Otherwise, parses `resolveInitialRouting()` and switches tab with `switchTab(routing.targetTab, false)`.

### 6.3 Deep Linking Resolver (`resolveInitialRouting`) (Lines 4,657–4,733)
Extracts target tab, target media, and queries from 5 distinct URL formats:
1. Query Parameters: `?q=`, `?search=`, `?movie=550`, `?tv=1399`, `?anime=...`, `?id=...&type=...`, `?tab=sports`.
2. URL Hash: `#sports`, `#livetv`, `#livenow`, etc.
3. RESTful Pathnames:
   - `/movie/:id` $\rightarrow$ `{ targetMedia: { id, type: 'movie' }, targetTab: 'movies' }`
   - `/tv/:id` $\rightarrow$ `{ targetMedia: { id, type: 'tv' }, targetTab: 'tv' }`
   - `/anime/:id` $\rightarrow$ `{ targetMedia: { id, type: 'anime' }, targetTab: 'anime' }`
   - `/watch/:type/:id` $\rightarrow$ mapped to player / media view
   - `/consumet/:tab` $\rightarrow$ mapped to `targetTab`
   - Aliases: `tvshows` & `series` $\rightarrow$ `tv`; `live` & `channels` $\rightarrow$ `livetv`; `schedule` $\rightarrow$ `livenow`.

---

## 7. Viewport-Aware Shelf Scheduler

### 7.1 Architecture (Lines 4,767–4,810)
Rather than firing 30+ network requests simultaneously on initial render, shelves are loaded via an IntersectionObserver with progressive fallback timers:
- **Root Margin**: `750px 0px` (pre-loads shelves half a viewport before they scroll into view).
- **Execution Tracking**: `_shelfTasksMap` (Map) and `_shelfLoadedSet` (Set).
- **Staggered Fallback Timer**: If user does not scroll, `setTimeout` guarantees execution after designated delay:
  ```javascript
  function scheduleShelfTask(shelfId, taskFn, delayMs = 0) {
      if (_shelfLoadedSet.has(shelfId)) return;
      if (delayMs <= 0) {
          _shelfLoadedSet.add(shelfId);
          Promise.resolve().then(taskFn).catch(() => {});
          return;
      }
      _shelfTasksMap.set(shelfId, taskFn);
      const obs = _getShelfObserver();
      if (obs && el) obs.observe(el);
      setTimeout(() => {
          if (!_shelfLoadedSet.has(shelfId) && _shelfTasksMap.has(shelfId)) {
              _shelfLoadedSet.add(shelfId);
              _shelfTasksMap.delete(shelfId);
              if (obs && el) obs.unobserve(el);
              Promise.resolve().then(taskFn).catch(() => {});
          }
      }, delayMs);
  }
  ```

### 7.2 Home Shelves Scheduling Table
| Shelf ID | Function Name | Delay (ms) | Target TMDB Endpoint / Content |
|---|---|---|---|
| `top10Shelf` | `loadTop10Today` | 0 (Immediate) | `trending/all/day` |
| `top10IndiaShelf` | `loadTop10India` | 0 (Immediate) | `discover/movie?with_origin_country=IN` |
| `trendingMoviesShelf` | `loadTrendingMovies` | 0 (Immediate) | `movie/popular` |
| `trendingSeriesShelf` | `loadPopularSeries` | 0 (Immediate) | `tv/popular` |
| `newReleaseIndiaShelf` | `loadNewReleaseIndia` | 60ms | `discover/movie?with_origin_country=IN` |
| `bollywoodShelf` | `loadBollywoodMovies` | 90ms | `discover/movie?with_original_language=hi` |
| `malayalamShelf` | `loadMalayalamMovies` | 120ms | `discover/movie?with_original_language=ml` |
| `tamilShelf` | `loadTamilMovies` | 150ms | `discover/movie?with_original_language=ta` |
| `teluguShelf` | `loadTeluguMovies` | 180ms | `discover/movie?with_original_language=te` |
| `kannadaShelf` | `loadKannadaMovies` | 210ms | `discover/movie?with_original_language=kn` |
| `hindiShelf` | `loadHindiMovies` | 240ms | `discover/movie?with_original_language=hi` |
| `hwActionShelf` | `loadHwAction` | 270ms | `discover/movie?with_original_language=en&with_genres=28` |
| `hwScifiShelf` | `loadHwScifi` | 300ms | `discover/movie?with_original_language=en&with_genres=878` |
| `topRatedShelf` | `loadTopRatedMasterpieces` | 330ms | `movie/top_rated` |
| `animeShelf` | `loadAsianDramaAndAnime` | 360ms | `discover/tv?with_genres=16&with_original_language=ja` |
| `hollywoodShelf` | `loadHollywoodPremieres` | 390ms | `discover/movie?with_original_language=en` |

### 7.3 Movies Hub & TV Hub Subsection Matrix
- **Movies Hub (10 Subsections - Lines 5,311–5,342)**:
  1. `moviePanIndiaShelf` (Indian Titans)
  2. `movieHwActionShelf` (Hollywood Action)
  3. `movieSouthCinemaShelf` (Tamil/Telugu Cinema)
  4. `movieHwScifiShelf` (Sci-Fi/Cyberpunk)
  5. `movieIndianCrimeShelf` (Indian Mystery/Noir)
  6. `movieHwCrimeShelf` (Hollywood Heist/Mob)
  7. `movieIndianComedyShelf` (Desi Comedy)
  8. `movieHwHorrorShelf` (Supernatural/Psychological)
  9. `movieIndianHistoricalShelf` (Historical Epics/Biopics)
  10. `movieHwAcclaimedShelf` (Oscar/Cannes Masterpieces)
- **TV Hub (10 Subsections - Lines 5,348–5,380)**:
  1. `tvIndianTopSeriesShelf` (Top Indian OTT)
  2. `tvHwPrestigeDramaShelf` (HBO/Prestige Dramas)
  3. `tvIndianCrimeShelf` (Police/Underworld)
  4. `tvHwScifiShelf` (Sci-Fi/Mind-Bending)
  5. `tvIndianComedyShelf` (Slice-of-Life Comedy)
  6. `tvHwEspionageShelf` (Cartel/Spy Thrillers)
  7. `tvIndianMythologyShelf` (Mythological & Historical)
  8. `tvHwDarkFantasyShelf` (Post-Apocalyptic Sagas)
  9. `tvIndianRomanceShelf` (Youth & Romance)
  10. `tvHwSitcomShelf` (Emmy-Winning Sitcoms)

---

## 8. Fullscreen Search Palette Engine

### 8.1 Architecture & DOM Elements (Lines 5,460–6,278)
- **Modal ID**: `#searchPalette`
- **Input ID**: `#searchInput`
- **Clear Button**: `#searchClearBtn` (auto-toggles opacity based on character count)
- **Spinner**: `#searchSpinner`
- **Source Dropdown**: `#searchEngineSource` (supports `all`, `tmdb`, `channels`, `events`, `anilist`)
- **Filter Pills**: `.search-filter-pill` with `data-filter` bindings
- **Results Container**: `#searchResults`

### 8.2 Keyboard Shortcuts & Interaction
- `Ctrl+K` / `Cmd+K`: Prevent default, invoke `openSearchPalette()`.
- `Escape`: Closes search palette and all active modals.
- `Enter` on `#searchInput`:
  - If query matches IMDb pattern `tt\d{7,10}` or includes `imdb.com`, executes `resolveAndPlayIMDb(query)`.
  - Otherwise, triggers `executeSearch()`.

### 8.3 Debounce Timing & AbortController
- **Debounce Threshold**: **200ms** (optimized with `requestAnimationFrame` on line 5,624).
- **Network Invalidation**: Employs `AbortController`. Previous in-flight fetch requests are aborted before a new query begins:
  ```javascript
  if (searchAbortController) searchAbortController.abort();
  searchAbortController = new AbortController();
  ```

### 8.4 Zero-Latency O(1) In-Memory Local Preview
Before the remote network request completes, `executeSearch()` scans loaded global JavaScript arrays in memory:
1. **Live TV Channels Pools**: `window.allSportsChannels`, `window.allChannelsData`, `window.channelsData`, `window.jtvAllChannels`, `window.mix1tvAllChannels`, `window.liveM3uAllChannels`. Deduplicated via alphanumeric key; capped at 18 items.
2. **Sports Events Pools**: `window.liveNowEvents`, `window.allEvents`, `window.liveEventsData`, `window.liveM3uEvents`. Capped at 12 items.
3. **Movies / TV Pools**: `window.moviesList`, `window.tvList`, `window.spotlightSlides`. Capped at 6 items.
4. **Anime Pool**: `window._animeCache`. Capped at 6 items.
- If matches exist, `renderUnifiedSearchResults()` populates `#searchResults` in **0ms**.

### 8.5 Remote Backend Search API & Cache
- Endpoint: `/api/consumet/search?q=${query}&source=${source}&limit=48`
- **Memory Cache**: `const _searchMemoryCache = new Map();` (Capacity: 200 queries, FIFO eviction).
- **Result Merging**: Merges local preview items with remote API results to ensure user-surfed items never disappear.
- **Zero-Overhead Inline SVGs**: Uses `_searchSvg` dictionary (star, play, tv, radio, playCircle, film, trophy, activity, sparkles) to prevent Lucide icon rendering lag.

---

## 9. Media Details Modal (`#detailsModal`) Full Lifecycle

### 9.1 DOM Element Catalog
| DOM Element ID | Type | Role in Modal Lifecycle |
|---|---|---|
| `#detailsModal` | `div` (Modal Root) | Fullscreen backdrop container, locked with body overflow hidden |
| `#detailTitle` | `div` / `h1` | Media title or transparent TMDB title PNG logo |
| `#detailTagline` | `p` | Tagline text |
| `#detailOverview` | `p` | Synopsis / description |
| `#detailPoster` | `img` | Portrait 2:3 poster |
| `#detailBackdrop` | `div` | High-res 16:9 backdrop with gradient overlays |
| `#detailYear` | `span` | Release / First air year |
| `#detailRating` | `span` | TMDB Star rating |
| `#detailRuntime` | `span` | Duration in minutes |
| `#detailType` | `span` | Badge: 'Movie', 'TV Series', or 'Anime Series' |
| `#detailGenres` | `div` | Horizontal badge list of genres |
| `#detailCast` | `div` | Horizontal scroller of actor/character cards |
| `#detailCastCountBadge` | `span` | Total count badge for cast members |
| `#tvNavigator` | `div` | TV Series controls container (hidden for movies) |
| `#seasonSelector` | `select` | Dropdown selector for seasons |
| `#episodesGrid` | `div` | Season episodes container (list or grid format) |
| `#episodesCountBadge` | `span` | Total episode count badge |
| `#imdbBadge` | `a` | External IMDb link badge |
| `#imdbRatingVal` | `span` | IMDb rating number |
| `#detailNextEpisodeAlert` | `div` | Pulsing alert for upcoming TV broadcast dates |
| `#trailerBgContainer` | `div` | YouTube trailer container |
| `#trailerBgIframe` | `iframe` | Embed iframe for background video loop |
| `#detailsTrailerControls` | `div` | Container for trailer mute/unmute buttons |
| `#detailsTrailerMuteIcon` | `svg` / `i` | Audio status icon (volume-2 vs volume-x) |
| `#detailsPlayBtn` | `button` | Primary action button ("Play Movie" or "Play S1 Ep1") |
| `#detailsPlayLatestBingBtn` | `button` | Secondary action button ("Latest (S.. E..) [Bing]") |
| `#btnEpisodeViewList` | `button` | Toggle button for Episode List layout |
| `#btnEpisodeViewGrid` | `button` | Toggle button for Episode Grid layout |
| `#episodeSortLabel` | `span` | Sort order badge: '1-N' vs 'N-1' |
| `#episodeSearchInput` | `input` | Live episode search box |
| `#episodeSearchClearBtn` | `button` | Clear button for episode search input |

### 9.2 Request Race-Condition Guard (`_detailsRequestCounter`)
Because TMDB metadata is fetched asynchronously, rapidly opening different cards could cause a slow older request to overwrite a newer modal. `openDetails` increments `_detailsRequestCounter`:
```javascript
const currentReqId = ++_detailsRequestCounter;
...
if (currentReqId !== _detailsRequestCounter) return; // Discard stale response
```

### 9.3 YouTube Background Trailer Looping & `postMessage` Audio Controls
1. **Autoplay Embed**:
   ```html
   iframe.src = `https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&playsinline=1&rel=0&enablejsapi=1`;
   ```
2. **Deferred Initialization**:
   Deferred by **320ms** via `setTimeout` to allow modal entrance animations to run at 60 FPS without DOM reflow contention.
3. **Mute / Unmute Toggles (`toggleDetailsTrailerMute`)**:
   Controls YouTube iframe state using HTML5 `postMessage`:
   - Mute: `iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*');`
   - Unmute: `iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');`

### 9.4 Technical Badges
- `4K ULTRA HD` / `4K HDR`: Injected into spotlight and modal headers.
- `TOP ${rank}`: Gradients with KaTeX-like custom typography numbers.
- `Next Episode Release Alert`: Formats upcoming broadcast date with Day, Month, Date, and Year, coupled with a pulsing ping ring (`animate-ping`).

### 9.5 The 8 Action Buttons
1. **Play Primary Stream**: `openFullscreenPlayer()`
2. **Play with Bing**: `openBingrPlayer(item, episode, button)`
3. **Play Latest Episode (Bing)**: `detailsPlayLatestBingBtn.onclick`
4. **Play HLS Stream**: `openHlsPlayer(epNum)`
5. **Play BitTorrent Swarm Stream**: `openTorrentPlayer(epNum)` or `openTorrentPlayerForItem()`
6. **Watch Trailer**: `playSelectedTrailer(item)`
7. **More Info / Open Modal**: `openDetails(id, type, title)`
8. **Watchlist Toggle**: `toggleWatchlist()` with state syncing to `stalker_watchlist`

### 9.6 Cast Horizontal Scroller & Bingr Fallback
- Cast members are displayed with actor name, character name, profile photo, and "Profile $\rightarrow$" link.
- **Desktop limit**: 24 members; **Mobile limit**: 12 members.
- Smooth scrolling via `slideCastList(offset)`.
- Clicking a cast card invokes `openPersonModal()`.
- **Fallback**: If TMDB returns empty credits, it fetches `/api/media/info?title=${title}&type=${type}` from the Bingr backend service to populate character profiles.

### 9.7 Season & Episode Scroller Engine
- **View Modes**: Switched via `setEpisodeViewMode('list' | 'grid')`.
- **Sort Direction**: `toggleEpisodeSort()` toggles `episodeSortAscending` between `1-N` and `N-1`.
- **Live Regex Filter**: `filterSeasonEpisodes(query)` dynamically filters episodes across:
  - Episode number (`ep.episode_number`)
  - Episode title (`ep.name`)
  - Episode synopsis (`ep.overview`)
- **Card Action Bar**: Each episode card exposes direct action buttons for Play Bing, Stream, HLS, and Torrent.

---

## 10. Comprehensive Inventory

### 10.1 Helper Functions
| Function Name | Lines | Purpose |
|---|---|---|
| `pickBestVideo(results)` | 3,544–3,573 | Evaluates and scores YouTube trailers |
| `updateSpotlightBackgroundTrailer(containerId, item, type)` | 3,628–3,661 | Injects background YouTube trailer loop into hero containers |
| `fetchAniListGraphQL(query, variables)` | 3,663–3,684 | AniList GraphQL fetcher with 8-second AbortController timeout |
| `handleModalOpen(modalEl)` | 3,689–3,700 | Opens modal, disables body scrolling, halts Lenis smooth scroll |
| `handleModalClose(modalEl)` | 3,701–3,712 | Closes modal, enables body scrolling, restarts Lenis smooth scroll |
| `openAnimeInfo(animeItem)` | 3,714–3,806 | Resolves AniList/MAL anime titles to TMDB TV/Movie metadata |
| `openCustomAnimeDetails(animeItem)` | 3,808–3,996 | Custom renderer for anime series with direct episode cards |
| `isLinearChannel(titleOrItem)` | 4,013–4,028 | Regex classifier distinguishing 24/7 TV channels from live match fixtures |
| `safeFetchJson(url, ms)` | 4,030–4,042 | Fetch wrapper with timeout signal |
| `loadHomeSpotlight()` | 4,044–4,181 | Fetches and aggregates hero spotlight items from TMDB and live events |
| `renderSpotlightSlider(index)` | 4,182–4,343 | Renders hero slider slide, touch gestures, and triggers logo fetch |
| `renderAnimeSpotlightSlider(index)` | 4,344–4,413 | Renders anime tab hero slider slide |
| `openTorrentPlayerForItem(title, tmdbId, type, year)` | 4,414–4,424 | Launches `/torrent.html` Swarm player |
| `initApp()` | 4,426–4,613 | Global initializer, restores all 12 session caches, sets up deep routing |
| `resolveInitialRouting()` | 4,657–4,733 | Deep link parser for tabs, media IDs, and query params |
| `handleMobileGoBack()` | 4,736–4,742 | Mobile back button handler |
| `toggleMobileSectionsDrawer(open)` | 4,745–4,765 | Mobile bottom drawer menu toggle |
| `_getShelfObserver()` | 4,772–4,788 | Singleton getter for IntersectionObserver (750px margin) |
| `scheduleShelfTask(shelfId, taskFn, delayMs)` | 4,790–4,809 | Enqueues shelf loading tasks with lazy intersection and timeout fallback |
| `loadAllHomeShelves()` | 4,812–4,850 | Home tab shelf master orchestrator |
| `loadNewSubsectionsHome()` | 4,851–4,875 | Loads 10 curated Indian and Hollywood sub-shelves |
| `loadExtraHomeShelves()` | 4,876–4,901 | Loads 8 genre-specific home shelves |
| `loadHollywoodPremieres()` | 4,902–4,959 | Loads latest Hollywood theatrical releases |
| `refreshAllData(silent)` | 4,960–4,963 | Re-executes shelf loads and re-triggers Lucide icons |
| `switchTab(tab, updateHistory)` | 4,965–5,086 | Primary view/tab router, handles desktop and mobile pill states |
| `isReleasedItem(item)` | 5,099–5,112 | Sanitizer filtering out unreleased or in-production media |
| `renderShelfGrid(items, elementId, defaultType)` | 5,113–5,175 | Standard horizontal scroller shelf card renderer |
| `scrollShelf(shelfId, direction)` | 5,176–5,182 | Smooth scrolling controller for shelf navigation buttons |
| `renderTop10Shelf(items, elementId, badgePrefix, defaultType)` | 5,183–5,260 | Renders Top 10 shelves with giant typography rank numbers |
| `loadTop10India()`, `loadNewReleaseIndia()`, etc. | 5,261–5,307 | Specialized regional TMDB loaders |
| `loadMoviesHomeData()` | 5,309–5,343 | Orchestrates 10 shelves for Movies tab |
| `loadTvHomeData()` | 5,345–5,380 | Orchestrates 10 shelves for TV Shows tab |
| `applyFilters(type)` | 5,381–5,403 | Filters movies/TV catalog by genre and release year |
| `loadMore(type)` | 5,404–5,417 | Infinite scroll / pagination handler for catalog grids |
| `renderFilterGrid(items, gridId, defaultType)` | 5,418–5,423 | Replaces catalog grid with filtered items |
| `appendFilterGrid(items, gridId, defaultType)` | 5,424–5,459 | Appends paginated items to catalog grid |
| `updateSearchClearBtn()` | 5,464–5,475 | Toggles search input clear button visibility |
| `openSearchPalette()` | 5,477–5,494 | Opens search palette modal |
| `closeSearchPalette()` | 5,496–5,504 | Closes search palette and aborts active controller |
| `clearSearchInput(event)` | 5,506–5,525 | Resets search input and renders trending chips |
| `setSearchPaletteQuery(q)` | 5,527–5,537 | Injects query string into search box and executes search |
| `setSearchFilter(filterKey)` | 5,539–5,550 | Sets search source category pill and triggers search |
| `renderSearchTrendingChips()` | 5,565–5,595 | Populates search palette with trending chips when input is empty |
| `toggleSearchSpinner(show)` | 5,599–5,604 | Toggles search input spinner |
| `debounceSearch()` | 5,606–5,626 | 200ms debouncer for search input keystrokes |
| `executeSearch()` | 5,628–5,896 | Search palette core engine: local preview, remote proxy, deduplication |
| `renderTMDBSearchResults(list, container, isSection)` | 5,898–5,998 | Renders movies & series in search results |
| `renderBackendSearchResults(list, container)` | 6,000–6,028 | Renders BitTorrent / direct stream search results |
| `renderAnimeSearchResults(list, container, isSection)` | 6,030–6,120 | Renders anime cards in search results |
| `renderEventsSearchResults(list, container, isSection)` | 6,122–6,192 | Renders live sports matches in search results |
| `renderChannelsSearchResults(list, container, isSection)` | 6,194–6,251 | Renders 24/7 TV channels in search results |
| `renderUnifiedSearchResults(events, channels, movies, anime, container)` | 6,253–6,278 | Unified multi-category search results renderer |
| `titlesMatch(t1, t2)` | 6,279–6,292 | Fuzzy title matching heuristic using word overlap ratios |
| `openDetailsModal(id, type, expectedTitle)` | 6,294–6,315 | URL sync and router for media details |
| `findTrailerKey(videos)` | 6,322–6,328 | Searches video array for YouTube Trailer/Teaser |
| `setEpisodeViewMode(mode)` | 6,330–6,344 | Toggles episode scroller layout between 'list' and 'grid' |
| `toggleEpisodeSort()` | 6,346–6,353 | Toggles episode sort order between 1-N and N-1 |
| `filterSeasonEpisodes(query)` | 6,355–6,362 | Filters current season episodes by title or synopsis |
| `clearEpisodeSearch()` | 6,364–6,370 | Clears episode search input box |
| `renderFilteredEpisodes()` | 6,372–6,486 | Renders filtered and sorted episodes in list or grid layout |
| `openDetails(id, type, expectedTitle)` | 6,489–7,079 | Master media details modal loader and lifecycle orchestrator |
| `slideCastList(offset)` | 7,081–7,084 | Scrolls cast member horizontal track |
| `closeDetailsModal()` | 7,086–7,113 | Closes media details modal and stops trailer iframe |
| `closePersonDetailsModal()` | 7,116–7,119 | Closes person profile modal |
| `loadSeasonEpisodes()` | 7,121–7,157 | Fetches and renders episodes for selected TV season |
| `changePlayerSeason(seasonVal)` | 7,158–7,167 | Changes season from fullscreen player overlay |
| `populatePlayerEpisodes()` | 7,168–7,200 | Populates "Up Next" episode drawer in fullscreen video player |

### 10.2 Regular Expressions
| Regex Pattern | Flags | Lines | Purpose |
|---|---|---|---|
| `/\s*-\s*Episode\s*\d+/i` | `i` | 3,718 | Strips episode suffixes from anime titles |
| `/\s*Season\s*\d+/i` | `i` | 3,719 | Strips season suffixes from anime titles |
| `/\s*\(\s*TV\s*\)/i` | `i` | 3,720 | Strips "(TV)" tags from anime titles |
| `/\s*\(Dub\)/i` | `i` | 3,721 | Strips "(Dub)" tags |
| `/\s*\(Sub\)/i` | `i` | 3,722 | Strips "(Sub)" tags |
| `/^[⭐️\s]+/` | None | 4,015, 4,129 | Strips leading star emojis and whitespace from channel names |
| `/\b(vs\.?\|v\b\|@\|match\|final\|semi-?final\|quarter-?final\|round\s*\d+\|day\s*\d+\|innings\|test\s*\d+\|odi\s*\d+\|grand\s*prix\|\bgp\b\|fight\s*night\|ufc\s*\d+\|wrestlemania\|summerslam\|royal\s*rumble\|championship\|tournament\|league\s*\d+\|game\s*\d+)\b/i` | `i` | 4,019 | Identifies sports match fixtures vs static channels |
| `/\b(sports?\s*(?:1\|2\|3\|4\|5\|hd\|uhd\|4k\|select\|ten\|six\|extra\|plus\|max\|news\|premier\|action\|variety\|cricket\|football)\|star\s*sports\|sony\s*(?:ten\|six\|sports\|yay\|max\|sab)\|sky\s*sports\|supersport\|bein\s*sports\|willow\s*(?:tv\|hd\|extra)\|eurosport\|dd\s*sports\|fox\s*(?:sports\|cricket\|footy)\|tnt\s*sports\|dazn\|tsn\s*\d*\|optus\|astro\s*supersport\|ptv\s*sports\|geo\s*super\|ten\s*sports\|arena\s*sport\|bt\s*sport\|espn\s*(?:1\|2\|hd\|extra\|news\|plus)?\|polsat\s*sport\|ziggo\s*sport\|canal\+\s*sport\|laligatv\|mutv\|chelsea\s*tv\|real\s*madrid\s*tv\|lfctv)\b/i` | `i` | 4,025 | Identifies linear 24/7 TV network names |
| `/tt\d{7,10}/` | None | 4,448, 6,716 | Matches IMDb ID strings (`tt1234567`) |
| `/(cricbuzz\s*-\s*aq\|stream\.kliv\.in\|placeholder\|testtapmad\|crichd\|demo\|dummy\|sample\|offline\|expired)/i` | `i` | 4,494 | Filters out dummy and dead live event streams |
| `/<[^>]*>/g` | `g` | 4,354 | Strips HTML tags from anime descriptions |
| `/[^a-z0-9]/g` | `g` | 5,696, 5,725, 5,817, 5,828, 6,281, 6,282 | Normalizes titles for exact deduplication and comparison |
| `/[_\.\-\:]/g` | `g` | 6,732 | Replaces separators with spaces for fallback TMDB search |

### 10.3 Storage Keys (SessionStorage & LocalStorage)
| Key Name | Storage Type | Purpose |
|---|---|---|
| `stalker_watchlist` | `localStorage` | Stored user watchlist array (JSON string) |
| `consumet_player_opened` | `sessionStorage` | Flag indicating return from fullscreen video player |
| `consumet_spotlight_cache` | `sessionStorage` | Cached hero spotlight items (0ms initial frame render) |
| `consumet_sports_cache` | `sessionStorage` | Cached sports channels catalog |
| `consumet_livenow_cache` | `sessionStorage` | Cached Live Now events |
| `consumet_sports_spotlight_cache` | `sessionStorage` | Cached sports hub spotlight items |
| `consumet_fancode_cache` | `sessionStorage` | Cached FanCode live events |
| `consumet_sonyliv_cache` | `sessionStorage` | Cached SonyLIV live/upcoming matches |
| `consumet_willow_cache` | `sessionStorage` | Cached Willow cricket events |
| `consumet_prime_cache` | `sessionStorage` | Cached Prime Video events |
| `consumet_tim_events_cache` | `sessionStorage` | Cached TimStreams live matches |
| `consumet_tim_channels_cache` | `sessionStorage` | Cached TimStreams 24/7 channels |
| `consumet_highlights_cache` | `sessionStorage` | Cached sports highlights array |
| `consumet_zee_cache` | `sessionStorage` | Cached Zee live TV channels |
| `consumet_livetv_cache` | `sessionStorage` | Cached Master JioTV channels |
| `consumet_last_tab` | `sessionStorage` | Active tab persistence across reloads |
| `tmdb_${cacheKey}` | `sessionStorage` | TMDB response cache |
| `full_details_${cacheKey}` | `sessionStorage` | Complete TMDB media details payload cache |

### 10.4 Master DOM ID Catalog
- **Navigation & Views**: `#view-home`, `#view-movies`, `#view-tv`, `#view-anime`, `#view-sports`, `#view-livetv`, `#view-livenow`, `#view-watchlist`, `#view-epg`, `#view-player`, `#tab-home`, `#tab-movies`, `#tab-tv`, `#tab-anime`, `#tab-sports`, `#tab-livetv`, `#tab-livenow`, `#tab-watchlist`, `#tab-epg`, `#tab-player`, `#mob-tab-more`, `#mobSectionsDrawer`, `#mobSectionsDrawerContent`, `#mainLoader`.
- **Spotlight & Hero Sliders**: `#heroSliderContainer`, `#animeHeroSliderContainer`.
- **Shelves (Home)**: `#top10Shelf`, `#top10IndiaShelf`, `#trendingMoviesShelf`, `#trendingSeriesShelf`, `#newReleaseIndiaShelf`, `#bollywoodShelf`, `#malayalamShelf`, `#tamilShelf`, `#teluguShelf`, `#kannadaShelf`, `#hindiShelf`, `#hwActionShelf`, `#hwScifiShelf`, `#topRatedShelf`, `#animeShelf`, `#hollywoodShelf`, `#scifiShelf`, `#koreanShelf`, `#comedyShelf`, `#horrorShelf`, `#documentaryShelf`, `#classicShelf`, `#kidsShelf`, `#awardShelf`, `#homeIndianBlockbustersShelf`, `#homeHollywoodBlockbustersShelf`, `#homeIndianCrimeSeriesShelf`, `#homeGlobalPrestigeSeriesShelf`, `#homeSouthActionVaultShelf`, `#marvelDcShelf`, `#homeBollywoodClassicsShelf`, `#homeHollywoodScifiShelf`, `#homeIndianAcclaimedShelf`, `#homeOscarLegendsShelf`.
- **Shelves (Movies Hub)**: `#moviesHomeLayout`, `#moviesCatalogLayout`, `#moviesGrid`, `#movies-genre`, `#movies-year`, `#moviePanIndiaShelf`, `#movieHwActionShelf`, `#movieSouthCinemaShelf`, `#movieHwScifiShelf`, `#movieIndianCrimeShelf`, `#movieHwCrimeShelf`, `#movieIndianComedyShelf`, `#movieHwHorrorShelf`, `#movieIndianHistoricalShelf`, `#movieHwAcclaimedShelf`.
- **Shelves (TV Hub)**: `#tvHomeLayout`, `#tvCatalogLayout`, `#tvGrid`, `#tv-genre`, `#tv-year`, `#tvIndianTopSeriesShelf`, `#tvHwPrestigeDramaShelf`, `#tvIndianCrimeShelf`, `#tvHwScifiShelf`, `#tvIndianComedyShelf`, `#tvHwEspionageShelf`, `#tvIndianMythologyShelf`, `#tvHwDarkFantasyShelf`, `#tvIndianRomanceShelf`, `#tvHwSitcomShelf`.
- **Sports Hub**: `#sportsHomeLayout`, `#sportsCatalogLayout`, `#sportsSearchResultsSection`, `#sportsSearch`.
- **Search Palette**: `#searchPalette`, `#searchInput`, `#searchClearBtn`, `#searchSpinner`, `#searchEngineSource`, `#searchResults`.
- **Details Modal**: `#detailsModal`, `#detailTitle`, `#detailTagline`, `#detailOverview`, `#detailPoster`, `#detailBackdrop`, `#detailYear`, `#detailRating`, `#detailRuntime`, `#detailType`, `#detailGenres`, `#detailCast`, `#detailCastCountBadge`, `#tvNavigator`, `#seasonSelector`, `#episodesGrid`, `#episodesCountBadge`, `#imdbBadge`, `#imdbRatingVal`, `#detailNextEpisodeAlert`, `#trailerBgContainer`, `#trailerBgIframe`, `#detailsTrailerControls`, `#detailsTrailerMuteIcon`, `#detailsPlayBtn`, `#detailsPlayLatestBingBtn`, `#btnEpisodeViewList`, `#btnEpisodeViewGrid`, `#episodeSortLabel`, `#episodeSearchInput`, `#episodeSearchClearBtn`.
- **Person Details Modal**: `#personDetailsModal`.
- **Player Episode Drawer**: `#playerUpNextContainer`, `#playerEpisodesList`, `#playerSeasonSelector`, `#playerSubtitleLabel`.
