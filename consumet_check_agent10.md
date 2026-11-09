# 📋 Final Check Audit Report — Agent 10
## Micro-Slices 37, 38, 39, 40 (Lines 16,084 to 17,868 of `consumet.html`)

**Auditor:** Final Check Auditor 10  
**Scope:** Micro-Slices 37–40 (Lines 16,084 to 17,868 — End of Document)  
**Target Codebase:** `consumet.html`  
**Reference Document:** `consumet_structure.md`  
**Safety Compliance:** Strict zero-modification adherence to `anime_bing.php`.

---

## 1. Executive Summary & Micro-Slice Overview

This audit covers the concluding 1,785 lines of `consumet.html` (Lines 16,084 to 17,868), which govern the final core engines of the client:
- **Micro-Slice 37 (Lines 16,084–16,530):** One Piece Master Universe Matrix completion, Anime Shelf OTT card renderer, and Anime Multi-Provider Scraper & Discovery Engine (`animesalt`, `rareanimes`, `anilist`, `kitsu`, `jikan`).
- **Micro-Slice 38 (Lines 16,530–16,976):** Anime Multi-Provider search resolver, Anime direct playback routes (`openAnimeSpecialPlay`, `openRareAnimesPlay`), Weekly Anime Broadcast Schedule Radar (5-tier failover cascade & JST scheduler), and EPG (Electronic Program Guide) state & timeline fetch engine.
- **Micro-Slice 39 (Lines 16,976–17,422):** EPG channel cards renderer, On-Air live program progress bar math, EPG view mode toggler, EPG Program modal, Actor/Person profile modal engine (`openPersonModal`), Standalone 7-step trailer cascade (`playSelectedTrailer`), Application bootstrap hook (`initApp`), and Watch History initialization (`getWatchHistory`, `downloadCurrentMedia`, `_isSportsOrLiveHistoryItem`, `_resolveHistorySportsThumb`).
- **Micro-Slice 40 (Lines 17,422–17,868):** Watch History persistence engine (`saveToHistory`), Smart playback router (`openDetailsModal`), Continue Watching shelf renderer (`renderWatchHistory`), Asynchronous thumbnail hydrator (`_hydrateMissingHistoryThumbnail`), 120Hz Hardware-Accelerated Lenis scroll shim, Universal Event-Delegated Mouse Drag-to-Scroll engine, Wheel-to-Horizontal scroll interceptor, Floating "Back to Top" button injector, and External maintenance/AI script inclusions.

### Summary of Critical Defects Discovered:
1. **Undeclared Variable Reference in `downloadCurrentMedia()` (Line 17,376):** Throws `Uncaught ReferenceError: currentDetail is not defined`.
2. **Missing Function Definition for `openEpgChannelModal`:** Invoked by 4 separate buttons in the DOM (lines 12983, 15032, 15205, 15467) and closed via `closeEpgChannelModal()` (line 17152), but `openEpgChannelModal()` is never declared anywhere in the codebase.
3. **Cross-Modal DOM Targeting Bug in `openEpgProgramModal` (Line 17,129):** Queries and modifies `#epgChannelModalLogo` belonging to the channel modal rather than an element in `#epgProgramModal`.
4. **Missing DOM Containers in `#view-anime`:** `#onePieceCardsGrid`, `#onePieceSearchInput`, `.op-tab-btn`, `#animeProviderSearchInput`, `#animeProviderStatus`, and `#animeProviderGrid` are completely missing from the HTML markup of `#view-anime`, causing `initOnePieceTrilogy()` and `switchAnimeProvider()` to silently exit on null element guards.
5. **Missing EPG View Toggler Markup in `#view-epg`:** `#epgTimelineViewContainer`, `#epgViewBtnTimeline`, and `#epgViewBtnCards` are missing from the DOM markup of `#view-epg`, rendering `toggleEpgView()` inoperable.
6. **Watch History Capacity Discrepancy:** Code caps `consumet_watch_history` at 25 items (`history.slice(0, 25)`), whereas `consumet_structure.md` specifies up to 100 items.

---

## 2. Granular Micro-Slice Audits

### 🔹 Micro-Slice 37 (Lines 16,084 – 16,530)
**Themes:** One Piece Master Matrix, Anime OTT Card Shelves, Anime Provider Catalog Engine

#### Line-by-Line Breakdown:
- **Lines 16,084–16,107:** Completes `baseOnePieceList` registry items:
  - `id: 148348`: *One Piece Film: Z* (2012, rating 7.7)
  - `id: 30219`: *One Piece: Strong World* (2009, rating 7.6)
- **Lines 16,109–16,140 (`initOnePieceTrilogy`):**
  - Guards against missing `#onePieceCardsGrid`.
  - Asynchronously enriches the 6 flagship titles in parallel using `Promise.all` calling `fetchTMDB('${item.type}/${item.id}')`.
  - Normalizes `title`, `overview`, `rating`, `year`, `backdrop`, and `poster`.
  - Assigns results to `_onePieceMasterItems` and triggers `renderOnePieceCards(_onePieceMasterItems)`.
  - Catch block provides graceful fallback using `item.defaultBackdrop` and `item.defaultPoster`.
- **Lines 16,142–16,190 (`renderOnePieceCards`):**
  - Targets `#onePieceCardsGrid`.
  - Renders 16:10 aspect ratio cards with gradient overlays, rating badge, year/saga badge, and dual action buttons:
    - *Bing Play*: calls `openBingrPlayer({ title, type, id, year })`.
    - *Info*: calls `openDetails(id, type, title)`.
  - Calls `triggerLucide()`.
- **Lines 16,192–16,205 (`filterOnePieceCategory`):**
  - Manages active classes for `.op-tab-btn` and `id="op-tab-${cat}"`.
  - Filters `_onePieceMasterItems` by `category === cat` or restores all items for `'all'`.
- **Lines 16,207–16,214 (`debounceOnePieceSearch`):**
  - 300ms debounce timer via `_onePieceDebounceTimer`.
  - Reads `#onePieceSearchInput.value` and invokes `searchOnePieceUniverse(query)`.
- **Lines 16,216–16,268 (`searchOnePieceUniverse`):**
  - Local fast-path search: filters `_onePieceMasterItems` by title, overview, or badge.
  - Remote TMDB fallback: queries `search/multi` with query formatted as `One Piece ${query}`.
  - Filters results strictly for animated media (`media_type === 'movie' || media_type === 'tv'`) containing keywords: `one piece`, `luffy`, `straw hat`, `monkey d. luffy`.
- **Lines 16,269–16,318 (`renderAnimeShelf`):**
  - Renders horizontal shelf into `document.getElementById(shelfId)`.
  - Limits output to top 18 titles (`slice(0, 18)`).
  - Populates in-memory lookup cache: `window._animeCache[id] = animeObj;`.
  - Constructs `.anime-ott-card` elements with episode badges, rating stars, hover play icon, and "Simulcast SUB / DUB" indicators.
  - Click handler: `openAnimeInfo(animeObj)`.
- **Lines 16,319–16,346 (Anime Provider Switching):**
  - Sets `let currentAnimeProvider = 'animesalt';`.
  - `initAnimeProviderSection()`: defaults to `'animesalt'`.
  - `switchAnimeProvider(prov)`: toggles `.anime-prov-btn` styles and active badge `provTab-${prov}`. Reads `#animeProviderSearchInput` to either query or load default catalog.
- **Lines 16,348–16,488 (`loadAnimeProviderDefault`):**
  - 0ms memory cache lookup: `window._animeProviderCache[prov]`.
  - Instant UI placeholder: displays `window._masterAnimeList.slice(0, 18)` so the user never views an empty grid.
  - Updates `#animeProviderStatus` with animated loading SVG spinner.
  - AbortController timeout set to 2,500ms.
  - Provider catalog resolution matrix:
    - `'animesalt'`: `/api/anime/search?q=Naruto`
    - `'rareanimes'`: `/api/rareanimes/search?q=Naruto`
    - `'anilist'`: AniList GraphQL query (`sort: POPULARITY_DESC`)
    - `'kitsu'`: `fetchKitsuAnime('trending/anime?page[limit]=18')`
    - `'jikan'`: `fetchJikanAnime('top/anime?limit=18')`
- **Lines 16,490–16,530 (`searchAnimeProvider` start):**
  - Checks query, mounts search status message, and begins provider-specific dispatch.

---

### 🔹 Micro-Slice 38 (Lines 16,530 – 16,976)
**Themes:** Provider Query Dispatch, Anime Playback Routing, Weekly Broadcast Radar, EPG Setup

#### Line-by-Line Breakdown:
- **Lines 16,530–16,594 (`searchAnimeProvider` completion):**
  - Executes search against `anilist` (GraphQL `search: $search`), `kitsu` (`filter[text]=...`), or `jikan` (`anime?q=...&limit=24`).
  - Renders results into `#animeProviderGrid` via `renderAnimeProviderItems`.
  - Displays formatted count badge in `#animeProviderStatus`.
- **Lines 16,596–16,648 (`renderAnimeProviderItems`):**
  - Populates `#animeProviderGrid` with 2:3 aspect cards.
  - Sets badge labels: `SERIES` / `EPISODE` for AnimeSalt, `HINDI DUB` for RareAnimes, `${episodes} EPS` for AniList/Kitsu/Jikan.
  - Routes card clicks based on provider:
    - AnimeSalt $\rightarrow$ `openAnimeSpecialPlay(item)`
    - RareAnimes $\rightarrow$ `openRareAnimesPlay(item)`
    - Standard $\rightarrow$ `openAnimeInfo(item)`
- **Lines 16,650–16,677 (`openAnimeSpecialPlay`):**
  - Evaluates audio mode: `const isDub = (window._playerAudioMode === 'dub');`.
  - Cleans title strings removing `Season X` and `Episode Y` suffixes.
  - Requests stream manifest: `GET /api/anime/stream?title={cleanName}&season=1&episode=1`.
  - If DUB preferred, searches `data.sources` for label/language containing `'dub'`.
  - Launches full player:
    `window.location.href = /play_bingr.php?url=${encodeURIComponent(targetUrl)}&name=${encodeURIComponent(rawTitle)}&title=${encodeURIComponent(cleanName)}&type=tv&s=1&e=1&season=1&episode=1&srv=animesalt&audio=${isDub ? 'dub' : 'sub'}&source=consumet.html`
  - Fallback on network error or missing stream: `openAnimeInfo(item)`.
- **Lines 16,679–16,696 (`openRareAnimesPlay`):**
  - Strips `Hindi Dubbed` and `Download HD` tags from title.
  - Requests stream embed: `GET /api/rareanimes/stream?title={cleanName}&season=1&episode=1`.
  - Extracts `iframeUrl` / `embedUrl` from `data.sources[0]`.
  - Launches player via `/play_bingr.php?url={embedUrl}&...&srv=ranime&source=consumet.html`.
- **Lines 16,698–16,888 (`switchAnimeScheduleDay`):**
  - Active button switcher for `.sched-tab-btn` and `id="schedTab-${day}"`.
  - Reads `#animeScheduleDatePicker` and populates `#animeScheduleGrid`.
  - Date calculation logic:
    - `day === 'date'`: parses picked date `YYYY-MM-DD`, determines day of week, sets `dayStart` / `dayEnd` UNIX epoch timestamps.
    - `day === 'today'`: calculates today's midnight epoch and auto-sets date picker input value.
    - Day name (`monday`, etc.): offsets current weekday to compute targeted 24-hour range.
  - 5-Tier Fallback Cascade:
    1. *Tier 1 (Jikan API v4):* `fetchJikanAnime('schedules?filter={day}&limit=12')`.
    2. *Tier 2 (AniList GraphQL):* `airingSchedules(airingAt_greater: $dayStart, airingAt_lesser: $dayEnd, sort: TIME_DESC)`.
    3. *Tier 3 (Kitsu Anime):* `fetchKitsuAnime('anime?filter[status]=current&sort=-userCount&page[limit]=12')`.
    4. *Tier 4 (TMDB Discover):* `fetchTMDB('discover/tv', { with_genres: '16', with_original_language: 'ja', sort_by: 'popularity.desc' })`.
    5. *Tier 5 (Master Anime Pool Fail-Safe):* Generates simulated schedule from `window._masterAnimeList` using indexed rotation across 12 scheduled broadcast slots (`17:00 JST`, `18:30 JST`, etc.).
  - Card output: horizontal card layout with thumbnail, episode badge, live broadcast time pill, rating, and quick-watch button `searchAndPlayItem('${safeTitle}', 'player1', ${epNum})`.
- **Lines 16,890–16,902 (`initAnimeDatePicker` IIFE):**
  - Initializes `#animeScheduleDatePicker` value with today's date formatted as `YYYY-MM-DD`.
- **Lines 16,903–16,944 (EPG Setup & Timeline Fetch):**
  - State initialization:
    - `window.epgActiveNetwork = 'star';`
    - `window.allEpgChannelsList = [];`
  - `fetchAndParseEpg(force = false)`:
    - Displays `#epgLoadingState`, hides `#epgEmptyState` and `#epgGuideContainer`.
    - Fetches `/api/epg/timeline`.
    - Deduplicates channel objects using lowercase trimmed channel names in a `Set()`.
    - Stores deduplicated array in `window.allEpgChannelsList`.
    - Calls `renderEpgChannels()`.
- **Lines 16,946–16,959 (`filterEpgNetwork`):**
  - Sets active network filter (`star`, `sony`, `sports`, `all`).
  - Toggles active styling on tab buttons: `#epgTab-star`, `#epgTab-sony`, `#epgTab-sports`, `#epgTab-all`.
  - Re-invokes `renderEpgChannels()`.
- **Lines 16,961–16,964 (`handleEpgSearch`):**
  - Sets `window.epgSearchQuery = (query || '').trim().toLowerCase();`.
  - Re-invokes `renderEpgChannels()`.

---

### 🔹 Micro-Slice 39 (Lines 16,976 – 17,422)
**Themes:** EPG Rendering & Modals, Actor Modal, Trailer Viewer, App Bootstrap, Watch History Init

#### Line-by-Line Breakdown:
- **Lines 16,976–17,101 (`renderEpgChannels`):**
  - Network regex filters:
    - `star`: `/star sports/i.test(c.name)`
    - `sony`: `/sony/i.test(c.name)`
    - `sports`: `/star|sony|sport|cricket|espn|ten|tnt|dd sports|eurosport/i.test(c.name || c.genre)`
  - Query filter: checks channel name, program title, category, and genre.
  - Updates `#epgChannelCountText` with formatted channel tally.
  - Dynamic on-air progress calculation:
    ```javascript
    let progressPct = 45;
    if (cur.startTime && cur.endTime && cur.endTime > cur.startTime) {
        progressPct = Math.min(100, Math.max(5, Math.round(((now - cur.startTime) / (cur.endTime - cur.startTime)) * 100)));
    }
    ```
  - Formats cards with network badge (`⭐ STAR SPORTS`, `📺 SONY SPORTS`, `🏆 SPORTS`), program timing in IST, gradient progress bar, UP NEXT teaser, direct channel link `<a href="${ch.playUrl}">`, and info modal button `openEpgProgramModal(...)`.
- **Lines 17,104–17,120 (`toggleEpgView`):**
  - Toggles visibility between `#epgTimelineViewContainer` and `#epgCardsGrid`.
  - Updates button state classes for `#epgViewBtnTimeline` and `#epgViewBtnCards`.
- **Lines 17,121–17,147 (`openEpgProgramModal`):**
  - Opens `#epgProgramModal` via `handleModalOpen(modal)`.
  - Sets text for `#epgModalTitle`, `#epgModalChannel`, `#epgModalTime`, `#epgModalCategory`, `#epgModalDesc`.
  - Injects channel watch button into `#epgModalPlayBtnContainer`.
  - Bug: Line 17129 targets `#epgChannelModalLogo` instead of an element in `#epgProgramModal`.
- **Lines 17,148–17,155 (`closeEpgProgramModal`, `closeEpgChannelModal`):**
  - Dispatches `handleModalClose` on `#epgProgramModal` and `#epgChannelModal`.
- **Lines 17,156–17,297 (`openPersonModal`):**
  - Opens `#personModal`.
  - Populates `#personProfilePhoto`, `#personName`, `#personCharacter`, `#personDepartment`, `#personBio`, `#personCreditsCountBadge`.
  - Displays 10 animated skeleton placeholder cards in `#personCreditsGrid`.
  - Fetches TMDB `person/${personId}?append_to_response=combined_credits`.
  - Fallback: queries `search/person` if `personId` is omitted.
  - Sorts cast credits by popularity descending, renders up to 30 responsive cards with poster, rating badge, year, and click handler `closePersonModal(); openDetails(item.id, mediaType)`.
- **Lines 17,298–17,301 (`closePersonModal`):**
  - Closes `#personModal` via `handleModalClose`.
- **Lines 17,302–17,307 (`closeTrailerPopup`):**
  - Closes `#trailerModal`, resets `#trailerIframe.src = ''`.
- **Lines 17,308–17,359 (`playSelectedTrailer`):**
  - Standalone trailer player opening `#trailerModal`.
  - Sends YouTube `pauseVideo` command via `postMessage` to `#trailerBgIframe` if running.
  - 6-step cascade for video resolution:
    1. Direct item trailer key (`item.trailerKey` / `item.trailer.id` / `item.trailer.key`)
    2. Spotlight trailer key (`currentSpotlightTrailerKey`)
    3. TMDB `item.videos.results` (filtering for YouTube Trailer / Teaser)
    4. Heuristic engine: `fetchOfficialTrailerKey(searchId, type, title)`
    5. Backend YouTube search proxy: `GET /api/music/yt-search?q=${title + ' official trailer'}`
    6. Direct YouTube nocookie search embed list: `https://www.youtube-nocookie.com/embed?listType=search&list=...`
- **Lines 17,360–17,365:**
  - Standard DOM load listener invoking `initApp()`.
  - Line 17365: `</script>` closes primary script block.
- **Lines 17,366–17,373 (`getWatchHistory`):**
  - Second `<script>` block begins.
  - Reads `consumet_watch_history` via `window._safeLocalGet`, returning parsed array or `[]`.
- **Lines 17,375–17,387 (`downloadCurrentMedia`):**
  - **CRITICAL BUG**: Line 17376 checks `if (!currentDetail)`. `currentDetail` is never declared.
  - Resolves torrent download link or proxy live stream download link.
- **Lines 17,389–17,404 (`_isSportsOrLiveHistoryItem`):**
  - Evaluates whether an item is a live stream or sports event based on:
    - `media_type` in `['sports', 'livetv', 'livenow', 'live', 'channel', 'hls', 'dash']`
    - `item.isLive`, `item.isAdminLiveEvent`, `item.channel_id`, `item.drm`
    - ID matching `'99999'` or prefixes: `mdtv`, `jtv`, `live`, `sport`, `fancode`, `fc-`, `sonyliv`, `sliv-`, `willow`, `tim`, `dlhd`, `mix1tv`, `airtel`, `zee`, `star`, `sony`, `footlinks`
    - Duration $\ge 36,000$ (10 hours, linear stream indicator) or infinite
    - Custom heuristic regex matching sport leagues and TV networks.
- **Lines 17,406–17,429 (`_resolveHistorySportsThumb`):**
  - Validates thumbnail against generic unsplash placeholders.
  - Cross-references loaded event arrays (`liveNowEvents`, `fancodeLiveMatches`, `sonylivLiveMatches`, etc.).
  - Cross-references sports channel catalogs (`allSportsChannels`, `jtvAllChannels`).
  - Calls vector logo resolver `getSportsLogo({ name, category })`.
  - Default fallback: `'/assets/logos/star-sports-1.svg'`.

---

### 🔹 Micro-Slice 40 (Lines 17,422 – 17,868)
**Themes:** Watch History Persistence, Smart Router, Shelf UI, Lenis & Drag Scroll Engine, External Scripts

#### Line-by-Line Breakdown:
- **Lines 17,431–17,515 (`saveToHistory`):**
  - Validates title; discards placeholder titles (`Loading...`, `Untitled`).
  - Type resolution logic: `isSportsLive ? 'sports' : (isAnimeItem ? 'anime' : (isTvItem ? 'tv' : 'movie'))`.
  - ID resolution: auto-prefixes sports items with `live-{slug}` if missing or `99999`.
  - Poster hydration: resolves relative TMDB poster paths; calls `_resolveHistorySportsThumb` for sports items.
  - Progress calculation:
    - 100% for live/sports items.
    - Capped between 2% and 98% for VOD titles with valid duration $< 36,000$ seconds.
  - Normalizes history entry:
    ```javascript
    {
        id, title, name, type, media_type, isAnime, isLive, playUrl,
        season, episode, poster, poster_path, backdrop_path,
        currentTime, duration, progressPercent, timestamp: Date.now()
    }
    ```
  - Deduplicates by ID or title; caps history at 25 entries (`history.slice(0, 25)`).
  - Persists to localStorage key `consumet_watch_history` via `window._safeLocalSet`.
  - Calls `renderWatchHistory()`.
- **Lines 17,517–17,570 (`openDetailsModal`):**
  - Sets `window._resumeTargetTime = resumeTime` if $> 0$.
  - Evaluates media type:
    1. *Sports / Live:* Bypasses details modal; calls `openFullscreenPlayer(effectiveItem, cleanTitle)`. Matches against live arrays, channel lists, or MDTV/JTV proxy streams.
    2. *Anime:* Calls `openAnimeInfo` if found in `window._animeCache[id]`, else `openDetails(id, 'anime', expectedTitle)`.
    3. *Movies / Series:* Calls `openDetails(id, targetType, expectedTitle)`.
  - Bound to `window.openDetailsModal = openDetailsModal;`.
- **Lines 17,571–17,583 (`clearWatchHistory`, `removeWatchHistoryItem`):**
  - Updates `consumet_watch_history` in localStorage.
  - Sets `window._watchHistoryClearedByUser` flag.
  - Re-renders continue watching row.
- **Lines 17,585–17,645 (`_hydrateMissingHistoryThumbnail`):**
  - Debounced via `_historyThumbResolvePending` Set.
  - Asynchronously requests TMDB `/movie/{id}` or `/tv/{id}` or `search/multi` to locate poster.
  - Directly updates DOM elements matching `img[data-hist-id]`.
  - Updates saved history object in localStorage.
- **Lines 17,647–17,748 (`renderWatchHistory`):**
  - Targets `#watchHistoryShelf` inside `#watchHistoryContainer`.
  - Hides container if history is empty.
  - Calculates remaining runtime ("35m left", "1h 15m left", "LIVE").
  - Formats duration using `formatMinSec(curTime) / formatMinSec(durTime)`.
  - Renders `.oval-cw-card` with gradient progress bar, poster, remove button, and play trigger.
  - Calls `triggerLucide(shelf)`.
- **Lines 17,749–17,853 (`_initScrollAndHistoryEngine`):**
  - Initiates `requestAnimationFrame(renderWatchHistory)`.
  - Sets `document.body.style.overflow = ''`.
  - Instantiates `window.lenis` shim mimicking smooth scrolling for 120Hz native displays.
  - **Universal Event-Delegated Mouse Drag-to-Scroll:**
    - Listens on `document` for `mousedown`, `mousemove`, `mouseup`, `click`.
    - Targets `.scroller-container > div`, `div[id$="Shelf"]`, `.overflow-x-auto`.
    - Drag threshold: $> 6\text{px}$.
    - Drag speed multiplier: $1.4\times$ (`scrollLeft = _dragStartScrollLeft - dx * 1.4`).
    - Capture-phase click interceptor prevents accidental card clicks following a mouse drag.
  - **Wheel-to-Horizontal Scroll:**
    - Listens on `wheel` event for `#jtvCategoryPills`, `#animeScheduleTabs`, `#searchFilterChips`.
    - Translates `deltaY` into `scrollLeft += e.deltaY`.
  - **Floating "Back to Top" Button:**
    - Injects `#backToTopBtn` if not already present in DOM.
    - Attached to bottom-right (`bottom-20 md:bottom-7 right-4 sm:right-7 z-40`).
    - Displays with smooth fade-in when `window.scrollY > 450`.
  - Backward-compatibility stub: `window.enableShelfDragToScroll = function() {};`.
- **Lines 17,854–17,858:**
  - Bootstrap execution: attaches to `DOMContentLoaded` or executes immediately.
- **Lines 17,860–17,868 (External Scripts & Document Close):**
  - Line 17861: `<script src="/watchdog.js" id="maintenance-watchdog"></script>`
  - Line 17862: `<script src="/party-mode.js?v=7.0"></script>`
  - Line 17863: `<script src="/local-ai.js"></script>`
  - Line 17866: `<script src="/consumet_ai_recommendations.js"></script>`
  - All four external files verified existing on disk in `/public`.
  - Terminating tags: `</body></html>`.

---

## 3. Discrepancy & Specification Gap Analysis (`consumet.html` vs `consumet_structure.md`)

| Topic / Feature | `consumet_structure.md` Specification | `consumet.html` Implementation (Lines 16,084–17,868) | Severity / Impact |
|---|---|---|---|
| **Watch History Max Capacity** | Stores up to **100** media items (Sections 2.10, 4.2, 6.24) | Caps history at **25** items: `if (history.length > 25) history = history.slice(0, 25);` (Line 17,512) | **Medium** — Discrepancy in retention limit |
| **Watch History Schema Keys** | Schema specifies `{ percentage, lastUpdated, streamUrl, channelId, episodeTitle }` | Code uses `{ progressPercent, timestamp, playUrl }`; `channelId` and `episodeTitle` are omitted | **Low** — Property naming divergence |
| **`currentAnimeProvider` Global Scope** | Documented as global `window.currentAnimeProvider` (Section 4.1) | Declared as script-scoped `let currentAnimeProvider = 'animesalt';` (Line 16,322), not attached to `window` | **Medium** — External scripts cannot read active anime provider |
| **Anime JST Countdown Badges** | Section 6.21: JST math with humanized relative countdown badges ("Airing in 3 hours", "Aired 45m ago") | Code outputs raw string or `toLocaleTimeString()` without countdown calculations (Lines 16,764, 16,795) | **Low** — Missing relative countdown UI badge |
| **Anime Play URL Parameter** | Section 6.20: `/play_bingr.php?srv=animesalt&audio={dub|sub}&stream={encodedM3u8}` | Code passes `url={encoded}` along with `name`, `title`, `type`, `s`, `e`, `srv`, `audio`, `source` (Line 16,667) | **Low** — Documentation syntax variant |
| **Trailer Cascade Step 7** | Section 6.28: Graceful fallback toast `showToast('Trailer not available for this title', 'info')` | Code directly injects YouTube search query embed URL without showing any fallback toast (Lines 17,356–17,358) | **Low** — Minor UX deviation |
| **Actor Modal Persona Routing** | Section 3: Actor profile triggered via `openInlinePersonDrawer(personId, personName)` | Two separate modal systems exist: `openInlinePersonDrawer` (Line 7429) for drawer, and `openPersonModal` (Line 17156) for modal | **Informational** — Architectural duality |

---

## 4. Critical Bugs & Runtime Failure Risks

### 🚨 1. Undeclared Identifier `currentDetail` in `downloadCurrentMedia()`
- **Location:** Line 17,376
- **Code:**
  ```javascript
  function downloadCurrentMedia() {
      if (!currentDetail) {
          showToast('Download Manager', 'Select a movie or show to download', 'info');
          return;
      }
      const title = currentDetail.title || currentDetail.name || 'video_stream';
  ```
- **Analysis:** `currentDetail` is never declared via `let`, `var`, `const`, or attached to `window`. When `downloadCurrentMedia()` is called, JavaScript throws:
  `Uncaught ReferenceError: currentDetail is not defined`.
- **Resolution:** Change check to:
  ```javascript
  const currentDetail = window.currentDetail || window._currentDetailsData || selectedMedia;
  if (!currentDetail) { ... }
  ```

### 🚨 2. Missing Function: `openEpgChannelModal()`
- **Location:** Called at Lines 12,983, 15,032, 15,205, 15,467
- **Code:**
  ```html
  <button onclick="event.stopPropagation(); openEpgChannelModal('${ch.id || ""}', ...)">
  ```
- **Analysis:** `openEpgChannelModal` is invoked by channel rows across the application. The modal markup `#epgChannelModal` exists, and `closeEpgChannelModal()` exists at Line 17,152, but the opening function `openEpgChannelModal()` was never implemented in the JavaScript! Clicking any "View Channel EPG" button results in `Uncaught ReferenceError: openEpgChannelModal is not defined`.
- **Resolution:** Implement `openEpgChannelModal(channelId, channelName, logo, streamUrl)` to populate `#epgChannelModalLogo`, `#epgChannelModalTitle`, and query channel program schedules from `window.allEpgChannelsList`.

### 🚨 3. Cross-Modal DOM ID Pollution in `openEpgProgramModal()`
- **Location:** Line 17,129
- **Code:**
  ```javascript
  const modalLogo = document.getElementById('epgChannelModalLogo');
  if (modalLogo) {
      modalLogo.src = getSportsLogo({ name: chName });
  ```
- **Analysis:** When opening `#epgProgramModal`, the function sets the `src` of `#epgChannelModalLogo`, which belongs to `#epgChannelModal`. `#epgProgramModal` has no image tag for the channel logo.
- **Resolution:** Either add an `<img id="epgProgramModalLogo">` inside `#epgProgramModal` and target that element, or remove the rogue mutation of the other modal's logo.

### 🚨 4. Missing DOM Containers for One Piece Universe in `#view-anime`
- **Location:** Lines 16,013, 16,143, 16,196, 16,210
- **Analysis:** The JavaScript functions `initOnePieceTrilogy()`, `renderOnePieceCards()`, `filterOnePieceCategory()`, and `debounceOnePieceSearch()` reference:
  - `#onePieceCardsGrid`
  - `#onePieceSearchInput`
  - `.op-tab-btn` (with `id="op-tab-all"`, `id="op-tab-trilogy"`, `id="op-tab-tv"`, `id="op-tab-classics"`)
  None of these elements exist in `#view-anime`! Because Line 16,013 starts with `const grid = document.getElementById('onePieceCardsGrid'); if (!grid) return;`, the One Piece Universe matrix never renders.

### 🚨 5. Missing DOM Containers for Anime Provider Engine in `#view-anime`
- **Location:** Lines 16,333, 16,338, 16,351, 16,352, 16,491, 16,499, 16,597
- **Analysis:** The Anime Provider section references:
  - `#animeProviderGrid`
  - `#animeProviderSearchInput`
  - `#animeProviderStatus`
  - `.anime-prov-btn` (with `id="provTab-animesalt"`, `id="provTab-rareanimes"`, `id="provTab-anilist"`, `id="provTab-kitsu"`, `id="provTab-jikan"`)
  None of these elements exist in `#view-anime`. Because Line 16,353 checks `if (!grid) return;`, provider loading immediately halts.

### 🚨 6. Missing DOM Containers for EPG View Mode in `#view-epg`
- **Location:** Lines 17,105, 17,107, 17,108
- **Analysis:** `toggleEpgView(view)` targets:
  - `#epgTimelineViewContainer`
  - `#epgViewBtnTimeline`
  - `#epgViewBtnCards`
  None of these elements exist in `#view-epg`. View switching cannot occur and no buttons exist in the UI for users to toggle views.

---

## 5. Comprehensive Inventory

### Functions Defined in Lines 16,084–17,868:
| Function Name | Line | Scope / Export | Purpose |
|---|---|---|---|
| `renderOnePieceCards(items)` | 16,142 | Script | Renders One Piece matrix cards into `#onePieceCardsGrid` |
| `filterOnePieceCategory(cat)` | 16,192 | Global (onclick) | Filters One Piece catalog by saga category |
| `debounceOnePieceSearch()` | 16,207 | Global (oninput) | 300ms debouncer for One Piece universe search |
| `searchOnePieceUniverse(query)` | 16,216 | Script | Dual-tier search (local matrix + TMDB live multi-search) |
| `renderAnimeShelf(list, shelfId)` | 16,269 | Script | Renders horizontal 18-title anime carousel |
| `initAnimeProviderSection()` | 16,324 | Script | Bootstraps anime provider to AnimeSalt |
| `switchAnimeProvider(prov)` | 16,328 | Global (onclick) | Toggles active provider catalog and search |
| `loadAnimeProviderDefault(prov)` | 16,350 | Script | Fetches default catalog for specified provider |
| `searchAnimeProvider(passedQuery)` | 16,490 | Script | Queries provider search API with AbortController |
| `renderAnimeProviderItems(items, provider)` | 16,596 | Script | Renders provider search results into `#animeProviderGrid` |
| `openAnimeSpecialPlay(item)` | 16,650 | Script | Resolves AnimeSalt M3U8 stream with SUB/DUB support |
| `openRareAnimesPlay(item)` | 16,679 | Script | Resolves RareAnimes Hindi Dubbed embed stream |
| `switchAnimeScheduleDay(day, specificDate)` | 16,701 | Global (onclick/change) | 5-tier failover anime broadcast radar |
| `initAnimeDatePicker()` | 16,891 | IIFE | Sets `#animeScheduleDatePicker` to today's date |
| `fetchAndParseEpg(force)` | 16,907 | Script | Fetches and deduplicates `/api/epg/timeline` |
| `filterEpgNetwork(network)` | 16,946 | Global (onclick) | Filters EPG by Star, Sony, Sports, or All |
| `handleEpgSearch(query)` | 16,961 | Global (oninput) | Live search filtering for EPG channels & programs |
| `renderEpgChannels()` | 16,966 | Script | Renders live EPG channel cards with progress percentage |
| `toggleEpgView(view)` | 17,104 | Global (onclick) | Toggles EPG layout between timeline and cards |
| `openEpgProgramModal(title, chName, time, cat)` | 17,121 | Global (onclick) | Displays program synopsis and channel tune action |
| `closeEpgProgramModal()` | 17,148 | Global (onclick) | Closes `#epgProgramModal` |
| `closeEpgChannelModal()` | 17,152 | Global (onclick) | Closes `#epgChannelModal` |
| `openPersonModal(personId, personName, ...)` | 17,156 | Global (onclick) | Standalone actor modal with TMDB filmography |
| `closePersonModal()` | 17,298 | Global (onclick) | Closes `#personModal` |
| `closeTrailerPopup()` | 17,302 | Global (onclick) | Closes `#trailerModal` and clears iframe |
| `playSelectedTrailer(passedItem)` | 17,308 | Global (onclick) | Standalone 6-step YouTube trailer resolver |
| `getWatchHistory()` | 17,368 | Script | Reads `consumet_watch_history` from localStorage |
| `downloadCurrentMedia()` | 17,375 | Global (onclick) | Downloads active media via BitTorrent or proxy |
| `_isSportsOrLiveHistoryItem(item)` | 17,389 | Script | Discriminator for live channels vs VOD titles |
| `_resolveHistorySportsThumb(item, title)` | 17,406 | Script | Resolves sports event thumbnail or SVG logo |
| `saveToHistory(item, currentTime, duration)` | 17,431 | Script | Persists media progress to `consumet_watch_history` |
| `openDetailsModal(id, type, expectedTitle, ...)`| 17,517 | `window.openDetailsModal` | Smart playback router |
| `clearWatchHistory()` | 17,571 | Global (onclick) | Clears watch history from localStorage |
| `removeWatchHistoryItem(id, event)` | 17,577 | Global (onclick) | Removes single title from watch history |
| `_hydrateMissingHistoryThumbnail(item)` | 17,586 | Script | Background TMDB/Logo hydrator for continue watching |
| `renderWatchHistory()` | 17,647 | Script | Populates `#watchHistoryShelf` |
| `formatMinSec(s)` | 17,692 | Script-local | Formats seconds into `M:SS` |
| `_initScrollAndHistoryEngine()` | 17,749 | Script / DOMReady | Initializes Lenis, Drag Scroll, Wheel Scroll & Top btn |
| `_stopShelfDrag()` | 17,796 | Event-local | Mouse drag cleanup handler |

### Global State Variables:
- `_onePieceMasterItems` (Array)
- `_onePieceDebounceTimer` (Timer ID)
- `currentAnimeProvider` (String)
- `window._animeProviderCache` (Record<string, Array>)
- `window._animeCache` (Record<string, Object>)
- `window.epgActiveNetwork` (String: `'star' | 'sony' | 'sports' | 'all'`)
- `window.allEpgChannelsList` (Array)
- `window.epgSearchQuery` (String)
- `window._watchHistoryClearedByUser` (Boolean)
- `_historyThumbResolvePending` (Set)
- `window.lenis` (Object shim)
- `window.enableShelfDragToScroll` (Function stub)

### LocalStorage Keys:
- `consumet_watch_history`: JSON serialized array (max 25 items).

### External Network & Backend Endpoints:
- `GET /api/anime/search?q={query}`
- `GET /api/rareanimes/search?q={query}`
- `GET /api/anime/stream?title={title}&season={s}&episode={e}`
- `GET /api/rareanimes/stream?title={title}&season={s}&episode={e}`
- `GET /play_bingr.php?url={url}&...`
- `GET /api/epg/timeline`
- `GET /api/music/yt-search?q={query}`
- `POST https://graphql.anilist.co` (via `fetchAniListGraphQL`)
- `GET https://kitsu.io/api/edge/...` (via `fetchKitsuAnime`)
- `GET https://api.jikan.moe/v4/...` (via `fetchJikanAnime`)
- `GET https://api.themoviedb.org/3/...` (via `fetchTMDB`)
- `GET https://www.youtube-nocookie.com/embed/{videoKey}`

### External Script Dependencies:
- `/watchdog.js` (`#maintenance-watchdog`)
- `/party-mode.js?v=7.0`
- `/local-ai.js`
- `/consumet_ai_recommendations.js`

---

## 6. Recommendations & Remediation

1. **Fix `currentDetail` Reference (Line 17,376):**
   Replace `if (!currentDetail)` with safe fallback `const targetDetail = (typeof currentDetail !== 'undefined' && currentDetail) || window.currentDetail || selectedMedia;`.
2. **Implement Missing `openEpgChannelModal`:**
   Add definition in the EPG script block to populate `#epgChannelModalLogo`, `#epgChannelModalTitle`, `#epgChannelModalLive`, and `#epgChannelModalUpcoming` from `window.allEpgChannelsList`.
3. **Correct Cross-Modal Element ID in `openEpgProgramModal` (Line 17,129):**
   Remove or redirect `#epgChannelModalLogo` reference.
4. **Synchronize Watch History Retention Limit:**
   Update `history.slice(0, 25)` to `history.slice(0, 100)` or update `consumet_structure.md` to reflect the 25-item limit.
5. **Attach `currentAnimeProvider` to `window`:**
   Add `window.currentAnimeProvider = currentAnimeProvider;` inside `switchAnimeProvider`.
6. **Inject Missing DOM Containers in `#view-anime` and `#view-epg`:**
   Add markup containers for One Piece Universe (`#onePieceCardsGrid`, `#onePieceSearchInput`, `.op-tab-btn`), Anime Provider Grid (`#animeProviderGrid`, `#animeProviderSearchInput`, `#animeProviderStatus`, `.anime-prov-btn`), and EPG View Toggle (`#epgTimelineViewContainer`, `#epgViewBtnTimeline`, `#epgViewBtnCards`).
