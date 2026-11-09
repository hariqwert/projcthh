# 🕵️ Final Check Audit Report — Agent 8
**Micro-Slices Audited:** 29, 30, 31, 32 (Lines 12,510 to 14,296)  
**Target Codebase:** [`consumet.html`](file:///c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html)  
**Comparison Target:** [`consumet_structure.md`](file:///c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_structure.md)  
**Auditor:** Final Check Auditor 8 (Antigravity Code Inspection Suite)  
**Status:** Complete & Fully Verified  

---

## 1. Executive Summary

This audit performs an exhaustive line-by-line verification of **Micro-Slices 29, 30, 31, and 32 (Lines 12,510 to 14,296)** of `consumet.html`. This section implements the mission-critical core of the **Sports Hub, Channel Directory, Custom M3U Engine, Live Sports Event Feed Aggregators (FanCode, Willow, Prime, IPL Replays), and the 4-Source Live TV Master Catalog Architecture**.

When cross-referenced against `consumet_structure.md`, several critical algorithmic routines, fallback datasets, DOM IDs, endpoint queries, state variables, and multi-server routing heuristics were found to be either entirely omitted or underspecified in the blueprint.

---

## 2. Line-by-Line Micro-Slice Audits

### 🔹 Micro-Slice 29: Lines 12,510 – 12,956
*Live Now Shelves Finalization, Sports Fast Boot, Ingestion Pipeline & Channel Directory Filters*

1. **Live Now Shelf Subsections (Lines 12,512 – 12,647)**:
   - **6A. TimStreams Live Match Events**: Evaluates `window.timStreamsEvents` or filters `events` by `source === 'timstreams' || isTimStreams` and ID containing `_ev_`, `isTimStreamsEvent`, or `isevent`. Renders shelf `'TimStreams Live Match Events'`.
   - **6B. TimStreams 24/7 Live Sports Channels**: Maps `window.timStreamsList` to standard sports objects with `sportEmoji: '📺'`, `durationMinutes: 1440`, `timeIST: 'LIVE NOW'`, `dateIST: 'Today'`, fallback icon `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/tv.svg`, and wraps URL in `/play_consumet.php?channel_id=...&url=...&name=...&source=timstreams&type=hls`. Renders shelf `'TimStreams 24/7 Sports Channels'`.
   - **6C. SportLink Multi-Stream Sports**: Resolves `window.footlinksLiveMatches` filtered by `liveNowActiveSource === 'all' || liveNowActiveSource === 'sportlink'`. Renders shelf `'SportLink Multi-Stream Sports'`.
   - **7. Live.m3u Direct Broadcast Feeds**: Resolves `window.liveM3uEvents` filtered by `liveNowActiveSource === 'all' || liveNowActiveSource === 'livem3u'`. Renders shelf `'Live.m3u Direct Broadcast Feeds'`.
   - **6. Special Channels (World-Class Sports)**: Filters via `isWorldClassSpecialChannel(e)` and renders shelf `'World-Class Sports Networks'`.
   - **Dedicated Star Sports Network Shelf**: Filters out mock matches (`!isMockMatch`, where mock match checks ` vs `, `pak vs`, `ind vs`) and requires 24/7 flag (`isAddedChannel || isMdtv || source === 'MDTV_CLEARKEY' || source === 'channels_json' || isSpecialChannel`).
   - **Dedicated Sony Sports Network Shelf**: Filters out mock matches and excludes `sonyliv live`.
   - **Remaining Categorized Shelves**: `Showcase Streams`, `Live Cricket Arena • Multi-Network`, `Football • Matches & Dedicated Feeds`, `Formula 1 & Motorsport`, `Combat Sports • UFC & Boxing`, `Basketball & NBA`, `Upcoming Broadcast Schedule`.
   - **Zero-Catch Grid Fallback**: If no shelves matched, injects `#liveNowEventsGrid` (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`).
2. **`renderLiveNowShelf()` (Lines 12,649 – 12,661)**:
   - Targets `#sportsStreamicLiveShelf`.
   - Strictly removes ended matches using `!isSportEventEnded(e)` and slices first 15 events.
   - Renders `createNetflixSportCard(e, true)` or fallback empty state: `<div class="text-xs text-zinc-500 py-3 px-1">No live sports currently scheduled.</div>`.
3. **Sports Channels Engine & Parallel Ingestion (Lines 12,663 – 12,860)**:
   - State variables:
     - `window._m3uParsedChannels = window._m3uParsedChannels || []`
     - `window._m3uParsedTime = window._m3uParsedTime || 0`
     - `let _lastSportsChannelsFetch = 0`
     - `const _defaultInstantSportsChannels`: 6 instant 0ms pre-cached channels (`mdtv-1106` Star Sports 1 HD, `mdtv-162` Sony Sports Ten 1 HD, `tim_sky-sports-main-event` Sky Sports Main Event 4K, `tim_sky-sports-f1` Sky Sports F1 UHD, `tim_willow-cricket` Willow Cricket HD, `mdtv-204` DD Sports HD).
   - `loadSportsChannels(force = false)`:
     - Caching check: Skips fetch if `ts - _lastSportsChannelsFetch < 180000` (3 minutes).
     - Instant 0ms boot: assigns `_defaultInstantSportsChannels` immediately if `allSportsChannels` is empty.
     - `fastFetch` with `Promise.race` timeout (4500ms default; 2000ms for `/sports.m3u`).
     - Ingestion sources executed in `Promise.all`:
       1. `/api/sports/proxy-streams`
       2. `/api/sports/timstreams/channels?_t=`
       3. `/api/sports/containers?_t=`
       4. `/api/sports/hub-config?_t=`
       5. `/api/sports?_t=`
       6. `/sports.m3u` (skipped if `_m3uParsedChannels` is fresher than 300,000ms / 5 mins)
       7. `/api/sports/channels?_t=`
       8. `/api/live_events?_t=`
     - Parses `/sports.m3u` line-by-line regexing `#EXTINF` for `tvg-logo` and channel name after comma.
     - Hub config fallback default: `{ title: "CUSTOM SPORTS STREAMS", subtitle: "High-speed live sports broadcasts.", badge: "EXCLUSIVE FEEDS", bgUrl: "", playerPng: "", gridBgUrl: "", displayMode: "shelf" }`.
     - Prioritized channel list merge order: TimStreams + addedFeeds + proxyStreams + userCustomFeeds + liveEvents + customSports + tempChannels.
     - Persists to `sessionStorage.setItem('consumet_sports_cache', JSON.stringify(merged.slice(0, 600)))`.
     - Calls `loadIplReplays()` if defined.
4. **Channels Directory Engine (Lines 12,862 – 12,956)**:
   - State variables: `window.allChannelsData = []`, `window.activeChannelsGenre = 'all'`.
   - `loadAllChannelsDirectory()`: Fetches `/api/sports/channels` with fallback to `window.allSportsChannels`. Updates `#channelsCountBadge` with spinner `loader-2`.
   - `setChannelsGenre(genre)`: Updates button styling for genres `['all', 'sky', 'football', 'bein', 'f1', 'cricket', 'us', 'entertainment', 'regional', '4k']`.
   - `renderChannelsDirectoryGrid()` filter passes:
     - Search filter: `#channelsSearchInput` checking name, genre, source, id.
     - Source filter: `#channelsSourceSelect`.
     - Genre filter rules (Lines 12,934–12,948):
       - `sky`: includes 'sky'
       - `football`: 'football', 'soccer', 'premier', 'laliga', 'serie', 'tnt', 'mutv', 'barca', 'real madrid', 'joj'
       - `bein`: 'bein'
       - `f1`: 'f1', 'racing', 'grand prix', 'moto', 'nascar', 'speed', 'v sport'
       - `cricket`: 'cricket', 'willow', 'ipl', 'icc', 'star sports', 'astro cricket'
       - `us`: 'espn', 'fox', 'cbs', 'nbc', 'abc', 'usa', 'fanduel', 'tsn'
       - `entertainment`: 'entertainment', 'movies', 'hbo', 'starz', 'cinemax', 'mgm', 'showtime', 'bet', 'ctv', 'a&e', 'reelz'
       - `regional`: 'malayalam', 'asianet', 'manorama', 'mathrubhumi', '24', 'kairali', 'reporter'
       - `4k`: '4k', 'uhd'

---

### 🔹 Micro-Slice 30: Lines 12,957 – 13,402
*Channel Directory Rendering, Custom M3U / Saved Sports System, FanCode/Sony Rewriting Engine & Willow Live Engine*

1. **Channel Directory Grid Rendering (Lines 12,957 – 13,013)**:
   - Empty state markup: `#channelsDirectoryGrid` with reset filters button clearing search and setting genre to `'all'`.
   - Channel card structure:
     - Onclick: `openFullscreenPlayer(window.currentRenderedChannels[${idx}], '${title}')`.
     - Group hover overlay with play icon.
     - Top badges: genre/source, EPG button (`openEpgChannelModal`), favorite button (`toggleSavedSport`).
     - Image fallback: `https://ui-avatars.com/api/?name=...&background=05070a&color=10b981&size=256&bold=true`.
     - Bottom strip: `LIVE HD` with pulsating green dot, source tag in mono font.
2. **User Custom Sports M3U Subsystem (Lines 13,014 – 13,092)**:
   - LocalStorage key: `user_custom_sports_m3u_list`.
   - `getUserCustomSportsM3u()`: Safe JSON parse from `_safeLocalGet`.
   - `saveUserCustomSportsM3u(name, url, logo)`: Deduplicates by URL, unshifts to start, persists to local storage, and renders chips. Default logo: `https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=300`.
   - `deleteUserCustomSportsM3u(url)`: Filters out matching URL, saves, updates chips, and calls `loadSportsChannels()`.
   - `renderUserCustomSportsChips()`: Injects saved link pills into `#userCustomM3uChips` or hides it if list is empty.
   - `playCustomM3uDirect(encUrl, encName)`: Triggers `openLiveNowEventDirect('/play_consumet.php?url=...&name=...&source=consumet.html&type=hls', 'sports')`.
   - `playCustomM3uStream()`: Reads `#customM3uUrlInput` and `#customM3uNameInput`, validates URL, saves item, and launches playback.
3. **Saved Sports Favorites (Lines 13,093 – 13,125)**:
   - State: `let _savedSportsCache = null`.
   - `getSavedSports()`: Caches from `_safeLocalGet('stalker_saved_sports')`.
   - `toggleSavedSport(event, encName, encUrl, encLogo)`: Toggles existence, shows toast ("Added to Saved Sports" / "Removed from Saved Sports"), and re-renders active sports view (`renderSportsGrid(getSavedSports())`, `renderSportsHome()`, or `filterSports()`).
4. **Live Sports Events Engine (FanCode & Willow) (Lines 13,127 – 13,289)**:
   - State: `window.liveEventsData = []`.
   - `loadLiveMatchEvents()`: Queries `/api/live/events` and `/api/live-events` concurrently via `Promise.allSettled`. Deduplicates by `id || url || title`. Updates `#liveEventsCountBadge`.
   - `window.generateSportsEventCardHtml(ev)`:
     - 9 Badge color mappings: `FANCODE` (orange), `WILLOW` (emerald), `CRICBUZZ` (blue), `CRICGO` (teal), `SONY` (red), `STAR` (sky), `IPL` (purple), `LIVE` (rose), `PRIME` (sky).
     - FanCode URL Rewriter: Automatically wraps CDN URLs in `/live.php?url=`.
     - Sony LIV Rewriter: Replaces `sonydaimenew.akamaized.net` with `sonymtmnew.akamaized.net` and wraps in `/stream_proxy.php?url=`.
     - Manifest detection: Evaluates `manifest_type === 'mpd'` or URL `.mpd`/`mdtv` to set `type=dash` vs `type=hls`.
     - Social sharing: Button calling `window.shareCardLink(targetUrl, name, 'sports', event)`.
     - Stream indicator: `DIRECT STREAM` with animated radio icon vs `FIXTURE`.
   - `renderLiveMatchEvents(events)`: Populates `#liveEventsShelf`.
5. **Willow Cricket Live Events Engine (Lines 13,290 – 13,368)**:
   - State: `window.willowEventsData = []`.
   - `loadWillowMatchEvents(force = false)`: Fetches `/api/willow/events` (with `?refresh=1` on force). Updates `#willowEventsCountBadge`.
   - `renderWillowMatchEvents(events)`:
     - Strict sorting algorithm:
       1. Matches with India regex `/india|ind\s*(vs|\/|-)|india\s*champions/i` sorted first.
       2. Active live matches (`isLive || status === 'LIVE'`) sorted next.
       3. Remaining matches sorted descending by start time value (`getEventStartTimeValue(...)`).
     - Badge label: `WILLOW • ON AIR` if `isLatestLiveEvent || isWillowActiveBroadcast`, else `WILLOW`.
     - Passes normalized card object to `window.generateSportsEventCardHtml`.
6. **Amazon Prime Video Live Sports Engine (Lines 13,370 – 13,441)**:
   - State: `window.primeEventsData = []`.
   - `loadPrimeSportsEvents(force = false)`: Fetches `/api/prime/events`. Updates `#primeEventsCountBadge`.
   - `renderPrimeSportsEvents(events)`:
     - League fallback: If league is missing or contains 'amazon prime', defaults to `${evSport} Tour`.
     - Card object: Badge `'PRIME'`, quality `'1080P FHD'`, manifest `'mpd'`, DRM parameters (`clearkey`, `key_id`, `key`).

---

### 🔹 Micro-Slice 31: Lines 13,403 – 13,848
*Prime Video Sports, IPL 2026 146-Match Replay Engine & Mega Live TV Multi-Source Catalog Ingestion*

1. **IPL 2026 Full Match Replays Engine (Lines 13,442 – 13,615)**:
   - State: `window.iplReplaysData = []`, `window.activeIplFilter = 'ALL'`.
   - `loadIplReplays(force = false)`: Fetches `/api/sports/ipl-replays`. Updates `#iplReplaysCountBadge` (`${count} Matches (Full VOD)`).
   - `filterIplReplays(lang = 'ALL')`:
     - Updates active button classes for `#iplFilterAll`, `#iplFilterEn`, `#iplFilterHi`.
     - Filters replays array by `language.toUpperCase() === lang`.
   - `renderIplReplays(replays)`:
     - Populates `#iplReplaysShelf`.
     - 2:3 vertical portrait cards (`w-28 sm:w-36 md:w-44 lg:w-52 aspect-[2/3]`).
     - Language badge: Blue for English, emerald for Hindi.
     - Match number badge (`#matchLabel`), replay pill (`REPLAY` with video icon), title, and teams.
     - Calls `_ensureSportsSubsectionExpandButton('iplReplaysShelf', replays, false)`.
   - `renderIplReplaysGrid(replays, gridEl)`: Grid-based rendering method for expanded viewing mode.
2. **Mega Live TV Multi-Source Catalog Architecture (Lines 13,616 – 13,848)**:
   - **4 Master Providers State Schema**:
     - Current source: `window.liveTvCurrentSource = 'jiotv'` (`'jiotv' | 'sportlink' | 'mix1tv' | 'livem3u' | 'allchannels'`).
     - JioTV: `window.jtvAllChannels = []`, `window.jtvCategoriesList = []`, `window.jtvActiveCategory = 'all'`, `window.jtvDisplayLimit = 120`, `jtvScrollObserver = null`.
     - SportLink: `window.sportlinkAllChannels = []`, `window.sportlinkCategoriesList = []`, `window.sportlinkActiveCategory = 'all'`.
     - Mix1TV / Airtel: `window.mix1tvAllChannels = []`, `window.mix1tvCategoriesList = []`, `window.mix1tvActiveCategory = 'all'`, `window.airtelAllChannels = window.mix1tvAllChannels`.
     - Live.m3u: `window.liveM3uAllChannels = []`, `window.liveM3uCategoriesList = []`, `window.liveM3uActiveCategory = 'all'`.
     - All Channels (SM-IPTV): `window.allChannelsList = []`, `window.allChannelsCategoriesList = []`, `window.allChannelsActiveCategory = 'all'`.
   - `switchLiveTvCatalog(source)`:
     - Normalizes `mix1tv` and `airtel` to `jiotv`.
     - Prevents redundant refetching if provider data is already in memory.
     - Resets `window.jtvDisplayLimit = 120` and clears `#jtvSearchInput`.
     - Toggles active styling on `#btn-livetv-src-jiotv`, `#btn-livetv-src-sportlink`, `#btn-livetv-src-livem3u`, `#btn-livetv-src-allchannels`.
     - Toggles visibility of `#livem3uM3uBadge` (shown only for `livem3u`).
     - Updates `#jtvHeaderSubtitle` and `#jtvHeaderIndicator` (color & animation per source: rose-500 pulsing for sportlink, amber-400 for allchannels, indigo-500 for livem3u, emerald-500 for jiotv).
   - Dedicated Loaders:
     - `loadSportlinkCatalog()`: Fetches `/api/sportlink/channels`. Badge: `${count} MATCHES (SPORTLINK)`.
     - `loadAllChannelsCatalog()`: Fetches `/api/allchannels/channels`. Badge: `${count} CHANNELS (ALL CHANNELS)`.
     - `loadLiveM3uCatalog()`: Fetches `/api/livem3u/channels`. Badge: `${count} CHANNELS (LIVE.M3U)`.
     - `loadLiveTvCatalog()`: Fetches `/api/jtv/channels` and `/api/jtv/categories` concurrently. Caches first 800 channels to `sessionStorage.consumet_livetv_cache`. Badge: `${count} CHANNELS`.
     - Offline Resilience / Hardcoded Fallback: If JioTV API fails, injects 6 fallback channels (Star Sports 1 HD, Sony Sports Ten 1 HD, HBO Movies HD, Sony PIX HD, Colors HD, Star Plus HD) and 3 categories (Sports, Movies, Entertainment).

---

### 🔹 Micro-Slice 32: Lines 13,849 – 14,296
*Live TV Category Pills, Dense Virtual Grid Rendering, Sports Hero Spotlight Billboard, Stream Analyzer & Sports Home Classifier*

1. **Live TV Category Pills Navigation (Lines 13,865 – 13,914)**:
   - `renderLiveTvCategoryPills()`:
     - Populates `#jtvCategoryPills`.
     - Dynamically determines categories and channels according to `window.liveTvCurrentSource`.
     - Renders 3 cross-source quick switch pills at the front of the category list (e.g. when on JioTV, shows quick pills for SportLink, All Channels, Live Events).
     - Renders `#jtv-pill-all` with total channel count.
     - Renders per-category buttons with ID `#jtv-pill-${cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`.
2. **Category Filtering, Search & Infinite Scroll (Lines 13,916 – 13,956)**:
   - `filterLiveTvCategory(catName)`: Sets active category on the currently active source object, resets `jtvDisplayLimit = 120`, re-renders pills and grid.
   - `debounceLiveTvChannels()`: 1000ms debounce timer (`_jtvSearchTimeout`) before calling `filterLiveTvChannels()`.
   - `loadMoreLiveTvChannels()`: Increments `window.jtvDisplayLimit` by 120 and appends to grid.
   - `loadAllLiveTvChannels()`: Sets limit to 999,999 for instant full catalog view.
3. **Dense OTT Channel Grid Rendering (Lines 13,957 – 14,112)**:
   - Target: `#jtvChannelGrid`, empty message: `#jtvNoResults`.
   - Layout: Dense square tiles (`grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 sm:gap-2.5`).
   - Filters by active category and search query (name, title, category, group, id).
   - Play URL routing by source:
     - `sportlink`: `c.playUrl || c.streams[0]?.playUrl || '#'`.
     - `allchannels`: `/play_consumet.php?channel_id=${c.id}&url=${c.stream_url}&name=${c.name}&source=allchannels&type=hls`.
     - `livem3u`: `/play_consumet.php?channel_id=${c.id}&url=${c.stream_url}&name=${c.name}&source=livem3u&type=${c.type || 'hls'}`.
     - `jiotv`: Evaluates HLS vs DASH (`c.manifest_url || /api/jtv/manifest/${c.id}.mpd`), appending ClearKey credentials (`key_id`, `key`).
   - **Multi-Server Smart Routing Action (Lines 14,034 – 14,038)**:
     - If `isSportlink || streamCount > 1`, clicking card invokes `openSportMatchOvalModal(safeId, 'watch')` so user can pick server.
     - Otherwise, invokes `openLiveNowEventDirect(safePlayUrl, 'livetv')`.
   - Card UI components:
     - Aspect ratio 4:3 (`aspect-[4/3]`).
     - LIVE badge (pulsing red for sportlink, sky for standard).
     - Share button calling `window.shareCardLink`.
     - Multi-server indicator badge: `${streamCount} SVR`.
     - Hover overlay buttons: Layer icon for source modal, play icon for direct stream.
   - Infinite scroll sentinel: Injects `#jtvLoadMoreSentinel` observed via `IntersectionObserver` with `rootMargin: '300px'`.
4. **Sports Hero Spotlight Billboard (Lines 14,114 – 14,207)**:
   - State: `sportsSpotlightSlides = []`, `currentSportsSlideIndex = 0`, `sportsSpotlightInterval = null`.
   - `renderSportsSpotlight(slides)`: Caches first 8 slides to `sessionStorage.consumet_sports_spotlight_cache`. Starts 6.5s interval pausing if tab is hidden, view is not 'sports', or scrolled past 650px.
   - `renderSportsSpotlightSlide(index)`:
     - Populates `#sportsHeroSliderContainer`.
     - Backdrop fallback: `item.bgUrl` -> `item.logo` -> default Unsplash.
     - Athlete cutout PNG: `item.playerPng` in `absolute right-4 ...` with drop shadow.
     - Navigation controls: arrows with class `spotlight-nav-arrow`, pill indicators with active width transition (`w-7` vs `w-1.5`).
     - Badges: `LIVE NOW` with ping animation, trophy league/sport badge, `4K ULTRA HD`.
     - Watch button: invokes `openFullscreenPlayer(item.playUrl || item.streamUrl || item.url, cleanTitle)`.
5. **Stream Health & Format Telemetry `analyzeStream(url)` (Lines 14,208 – 14,223)**:
   - Evaluates stream URL to determine transport container and resolution:
     - Contains `/play/`, `.ts`, or `transcode=1` -> `'MPEG-TS'`.
     - Contains `.ism` or `fmp4` -> `'fMP4 HLS'`.
     - Default -> `'Native HLS'`.
     - Contains `4k`, `uhd`, `3840` -> `'4K UHD'`.
     - Contains `720` -> `'720p HD'`.
     - Default -> `'1080p HD'`.
6. **High-Performance Sports Home Classifier `renderSportsHome()` (Lines 14,224 – 14,296)**:
   - Single-pass bucket classifier partitioning `window.allSportsChannels` into 13 distinct category arrays:
     - `skyChannels`
     - `footballChannels`
     - `f1Channels`
     - `cricketChannels`
     - `usChannels`
     - `sonyChannels`
     - `hboChannels`
     - `fourKChannels`
     - `malayalamNewsChannels`
     - `malayalamEntChannels`
     - `malayalamMoviesChannels`
     - `kidsChannels`
     - `asianGamesChannels`
   - TimStreams Live Match Events shelf (Lines 14,262 – 14,296):
     - Container: `#sportsTimStreamsEventsShelfContainer`, badge: `#timStreamsEventsCountBadge`.
     - Normalizes `/img/` logos to `https://timstreams.co.rw/img/...`.
     - Lazy fetch to `/api/tim/events` if not already present in memory.

---

## 3. Discrepancies & Missing Elements in `consumet_structure.md`

### ❌ 1. Missing Global & Window State Variables
The blueprint (`consumet_structure.md` Section 4) omits the following runtime state variables:
1. `_lastSportsChannelsFetch`: Timestamp tracking sports channel cache expiry (3-minute TTL).
2. `_m3uParsedChannels` & `_m3uParsedTime`: In-memory cache and timestamp for `/sports.m3u` parser (5-minute TTL).
3. `_defaultInstantSportsChannels`: Static 6-channel array for 0ms fast-boot rendering.
4. `window.allChannelsData` & `window.activeChannelsGenre`: State for Channels Directory view.
5. `_savedSportsCache`: In-memory reference cache for favorited sports channels.
6. `window.liveEventsData`: Ingested live match feeds from FanCode and Admin.
7. `window.willowEventsData`: Ingested Willow Cricket feeds.
8. `window.primeEventsData`: Ingested Amazon Prime live events.
9. `window.iplReplaysData` & `window.activeIplFilter`: Full match replay catalog and active filter state.
10. `window.liveTvCurrentSource`: Active Live TV provider tab (`'jiotv' | 'sportlink' | 'mix1tv' | 'livem3u' | 'allchannels'`).
11. `window.sportlinkAllChannels`, `window.sportlinkCategoriesList`, `window.sportlinkActiveCategory`: Independent state tree for SportLink.
12. `window.mix1tvAllChannels`, `window.mix1tvCategoriesList`, `window.mix1tvActiveCategory`, `window.airtelAllChannels`: Backward-compatibility state tree for Mix1TV/Airtel.
13. `window.liveM3uAllChannels`, `window.liveM3uCategoriesList`, `window.liveM3uActiveCategory`: Independent state tree for GitHub Live.m3u feeds.
14. `window.allChannelsList`, `window.allChannelsCategoriesList`, `window.allChannelsActiveCategory`: Independent state tree for SM-IPTV catalog.
15. `jtvScrollObserver`: `IntersectionObserver` instance for Live TV infinite scrolling.
16. `_jtvSearchTimeout`: 1000ms debounce timer for channel searching.
17. `sportsSpotlightSlides`, `currentSportsSlideIndex`, `sportsSpotlightInterval`: Rotating billboard state.
18. `window.timStreamsList`: Cached channel directory from TimStreams.

---

### ❌ 2. Missing Backend & External API Endpoints
The blueprint (`consumet_structure.md` Section 5) omits or inaccurately documents the following endpoints:
1. `GET /api/sports/proxy-streams`: Ingests DLHD proxy feeds during `loadSportsChannels`.
2. `GET /api/sports/hub-config`: Fetches custom hub layout configurations and branding.
3. `GET /api/sports`: Returns admin-configured custom sports links.
4. `GET /sports.m3u`: Client-side fallback M3U parser with 2000ms race timeout.
5. `GET /api/live-events` vs `GET /api/live_events`: Both endpoint variants are consumed across `loadSportsChannels` and `loadLiveMatchEvents`.
6. `GET /api/live/events`: Consumed in `loadLiveMatchEvents` (distinct from `/api/live_events`).

---

### ❌ 3. Missing DOM Element IDs & Controls
The blueprint omits the following DOM identifiers essential for template scaffolding:
- **Live Now & Directory**:
  - `#sportsStreamicLiveShelf`
  - `#channelsCountBadge`
  - `#channelsSearchInput`
  - `#channelsSourceSelect`
  - `#channelsDirectoryGrid`
  - `#btn-chan-all`, `#btn-chan-sky`, `#btn-chan-football`, `#btn-chan-bein`, `#btn-chan-f1`, `#btn-chan-cricket`, `#btn-chan-us`, `#btn-chan-entertainment`, `#btn-chan-regional`, `#btn-chan-4k`
- **Custom M3U & Events**:
  - `#userCustomM3uChips`
  - `#customM3uUrlInput`, `#customM3uNameInput`
  - `#liveEventsShelf`, `#liveEventsCountBadge`
  - `#willowEventsShelf`, `#willowEventsCountBadge`
  - `#primeEventsShelf`, `#primeEventsCountBadge`
  - `#iplReplaysShelf`, `#iplReplaysCountBadge`
  - `#iplFilterAll`, `#iplFilterEn`, `#iplFilterHi`
- **Live TV Directory**:
  - `#btn-livetv-src-jiotv`, `#btn-livetv-src-sportlink`, `#btn-livetv-src-livem3u`, `#btn-livetv-src-allchannels`
  - `#livem3uM3uBadge`
  - `#jtvHeaderSubtitle`, `#jtvHeaderIndicator`
  - `#jtvTotalCountBadge`
  - `#jtvCategoryPills`
  - `#jtv-pill-jiotv-quick`, `#jtv-pill-sportlink-quick`, `#jtv-pill-allchan-quick`, `#jtv-pill-livem3u-quick`
  - `#jtv-pill-all`, `#jtv-pill-${slug}`
  - `#jtvChannelGrid`, `#jtvNoResults`, `#jtvSearchInput`
  - `#jtvLoadMoreSentinel`
- **Spotlight & Home Shelves**:
  - `#sportsHeroSliderContainer`
  - `#sportsTimStreamsEventsShelfContainer`, `#timStreamsEventsCountBadge`, `#sportsTimStreamsEventsShelf`

---

### ❌ 4. Missing Algorithms & Business Logic Engines
The blueprint lacks detailed specification for the following core routines:
1. **`analyzeStream(url)`**: Transport protocol and resolution classifier (MPEG-TS vs fMP4 vs Native HLS, 4K vs 720p vs 1080p).
2. **Single-Pass Sports Home Bucket Classifier**: 13 regex/keyword partition arrays inside `renderSportsHome()`.
3. **Willow Priority Sorting Heuristic**: Strict three-phase sorting (India matches regex `/india|ind\s*(vs|\/|-)|india\s*champions/i` $\rightarrow$ Live status $\rightarrow$ Start time value).
4. **Stream Rewriting Cascade in `generateSportsEventCardHtml`**:
   - FanCode streams automatically wrapped in `/live.php?url=`.
   - Sony LIV streams normalized from `sonydaimenew.akamaized.net` to `sonymtmnew.akamaized.net` and wrapped in `/stream_proxy.php?url=`.
   - 9-badge color palette mapping.
5. **Multi-Server Smart Card Router in Live TV Grid**:
   - Single-server items trigger direct playback (`openLiveNowEventDirect`).
   - Multi-server items (`isSportlink || streamCount > 1`) intercept the click and open the source selector modal (`openSportMatchOvalModal`).
6. **Live TV Quick Cross-Source Switching Pills**: Dynamic injection of other provider shortcuts at the head of `#jtvCategoryPills`.
7. **Offline Fallback Dataset**: 6 hardcoded channels and 3 categories in `loadLiveTvCatalog` ensuring resilience during network outages.
8. **M3U String Splitter**: Client-side line-by-line parsing of `#EXTINF` tags extracting `tvg-logo` and channel title.

---

## 4. Verification Check

- [x] Read lines 12,510 to 14,296 sequentially in chunks.
- [x] Compared every function, state variable, endpoint, and DOM ID against `consumet_structure.md`.
- [x] Identified all missing components and undocumented business logic.
- [x] Fully respected critical rule: **NEVER touched or modified `anime_bing.php`**.
- [x] Generated detailed audit report at `consumet_check_agent8.md`.

---
*Report compiled and certified by Final Check Auditor 8.*
