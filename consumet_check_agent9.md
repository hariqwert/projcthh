# 🔍 Consumet Audit Report: Final Check Auditor 9
**Target**: `consumet.html`  
**Micro-Slices Audited**: Micro-Slices 33, 34, 35, 36 (Lines 14,297 to 16,083)  
**Auditor**: Final Check Auditor 9  
**Comparison Source**: `consumet_structure.md`  

---

## 1. Executive Summary

Lines 14,297 through 16,083 of `consumet.html` represent four vital subsystem intersections within the application:
1. **Micro-Slice 33 (Lines 14,297 – 14,743)**: Live Sports Hub Shelf Assembly (`renderSportsHome`), Priority Spotlight Waterfall (Admin Overrides, FanCode, SonyLIV, Willow, Prime, Flagship Marquee 8-slide backfill), Frame-by-Frame Non-blocking Shelf Rendering via nested `requestAnimationFrame`, Master Network Logo Resolution (`getSportsLogo`), and Showcase Containers Studio Initialization.
2. **Micro-Slice 34 (Lines 14,744 – 15,190)**: Showcase Studio Dynamic Layout Generator (`renderShowcaseContainers` across 5 distinct visual styles: `shelf`, `grid`, `glass_cards`, `compact_chips`, `spotlight`), Custom Sub-Renderers (`renderBentoChannelGrid`, `renderGlassCardsGrid`, `renderCompactChipsGrid`, `renderContainerSpotlight`), Deep-Linking URI Connector (`handleSportsUriConnection`, `activateAsianGamesContainer`), Web Speech API Voice Search (`toggleSportsVoiceSearch`), Toast Notification Engine (`showSportsToast`), and Base Sports Shelf Renderer (`_doRenderSportsShelf`).
3. **Micro-Slice 35 (Lines 15,191 – 15,636)**: Sports Subsection Expand/Collapse Architecture (`window.toggleSportsSubsection`, `window.toggleAllSportsSubsections`, `window.updateSportsExpandAllBtn`, `_ensureSportsSubsectionExpandButton`), Shelf Wrappers (`renderSportsShelf`, `renderLiveEventsShelf`), Infinite Responsive Grid Pagination (`renderSportsGrid`, IntersectionObserver auto-loading), and Multi-Tier Sports Search Studio (`filterSports`, `clearSportsSearch`, `debounceSportsSearch` covering Live Match Events, IPL 2026 Replays, and Channel Feeds).
4. **Micro-Slice 36 (Lines 15,637 – 16,083)**: Sports Category Directory Engine (`filterSportsCategory` managing 13 discrete categories), Direct Native Video Playback Bridge (`playStreamDirect`), Anime Catalog Ingestion & Multi-Source Resilience Engine (`fetchJikanAnime`, `fetchKitsuAnime`, `loadAnimeCatalog`, AniList GraphQL, 10 genre shelves, 7.0s auto-rotation, 0ms fast-boot cache), and One Piece Master Trilogy Engine Initialization (`initOnePieceTrilogy`).

Comparison against `consumet_structure.md` revealed **3 direct numerical/architectural discrepancies**, **16 missing core functions**, **20 missing state variables**, and **50+ undocumented DOM elements, CSS design tokens, and runtime edge cases**.

---

## 2. Micro-Slice Detailed Line Audits

### 🔹 Micro-Slice 33: Lines 14,297 – 14,743
* **Lines 14,297 – 14,307**: Lazy asynchronous retrieval of TimStreams scheduled live matches from `/api/tim/events` with mapping to normalized sports objects (`playUrl`, `stream_url`, `logo`, `genre`, `isTimStreamsEvent`).
* **Lines 14,309 – 14,340**:
  - Filter for TimStreams 24/7 channels (`window.timStreamsList` or name/ID/source heuristics).
  - Toggles `#sportsProxyStreamsShelfContainer` visibility and updates `#proxyStreamsCountBadge` (`${timStreamsChannels.length} 24/7 Channels`).
  - Renders saved favorites shelf via `getSavedSports()` into `#sportsSavedShelfContainer` / `#sportsSavedShelf`.
  - Filters and renders active live events (`ch.isLiveEvent === true`) into `#sportsLiveEventsShelfContainer` / `#sportsLiveEventsShelf`.
* **Lines 14,342 – 14,347**: Dynamic Showcase Studio container assembly merging `window.liveEventsShowcaseContainers` and `window.sportsContainersList`, invoking `renderShowcaseContainers(combinedShowcaseContainers, customChannels)`.
* **Lines 14,349 – 14,582**: Priority Spotlight Waterfall:
  - **Tier 0**: Admin Spotlight Studio Overrides (`window._spotlightStudioPublic?.spotlightStudio?.sportsSpotlight` & `liveEventsSpotlight`).
  - **Tier 1**: Admin Live Events (`window.adminLiveEvents`).
  - **Tier 2**: FanCode Live Matches (`window.fancodeLiveMatches`).
  - **Tier 3**: SonyLIV Live Matches (`window.sonylivLiveMatches`).
  - **Tier 4**: Willow Cricket Live Matches (`window.willowLiveMatches`).
  - **Tier 5**: Prime Video Sports (`window.primeLiveMatches`).
  - **Tier 6**: Marquee Flagship Broadcasts Backfill (Star Sports 1 HD MDTV-1106, Star Sports 1 Hindi HD MDTV-1108, Sony Sports Ten 1 HD MDTV-162, Sony Sports Ten 2 HD MDTV-891, Willow Cricket HD willow-1, DD Sports 1.0 HD MDTV-204) ensuring spotlight always has up to 8 high-definition feeds.
  - Fallback hero layout `#sportsHeroSliderContainer` with Lucide radio icon if slides array is empty.
* **Lines 14,599 – 14,605**: Asian Games badge count synchronization (`#sportsAsianGamesContainer`, `#asianGamesFeedsCount`).
* **Lines 14,606 – 14,628**: 3-Frame Progressive Rendering:
  - **Frame 1 (Sync)**: Core channels (`sportsAllChannelsShelf`, `sportsAsianGamesShelf`).
  - **Frame 2 (`requestAnimationFrame`)**: High-priority sports (`sportsSkyShelf`, `sportsFootballShelf`, `sportsCricketShelf`, `sportsF1Shelf`).
  - **Frame 3 (Nested `requestAnimationFrame`)**: Auxiliary & Regional feeds (`sportsUSShelf`, `sportsSonyShelf`, `sportsHBOShelf`, `sports4kShelf`, `sportsMalayalamNewsShelf`, `sportsMalayalamEntShelf`, `sportsMalayalamMoviesShelf`, `sportsKidsShelf`).
* **Lines 14,630 – 14,702**: `getSportsLogo(ch)`:
  - Upstream `/img/...` path prefixing to `https://timstreams.co.rw/img/...`.
  - `generic.png` bypass.
  - Fallback generation via `ui-avatars.com` (`0f172a` background, emerald `10b981` text, 512px bold).
  - 45+ precise network SVG/PNG mappings: Sony SAB, Sony Yay, Sony Max, Sony Sports Network, Mazhavil Manorama, Asianet, Star Sports, Flowers TV, Zee TV, ABC USA, A&E, beIN Sports (France 1-3, Turkey 1-4, MENA), Astro (SuperSport 3-4, Cricket), DAZN Spain, Arena Sport (Croatia, Serbia), ESPN Brasil, Fox Sports (USA 2, AU 503), FanDuel Midwest, Sportsnet (One, 360), SuperSport Variety 1, TSN5, TNT USA, Starz, Cinemax, MGM+, Showtime Showcase, BBC America, BET USA, CNBC, CTV Canada, CBS NY, Canal 5 MX, Sport 1 CZ, JOJ Sport SK, Discovery Life, Disney XD, Racer TV, NBC Sports Philadelphia, Nat Geo Wild, Reelz Channel, Sport 5 (Plus, Live, Star Israel), TV4 Sport Live 3, V Sport Motor Sweden, Fox Weather, Eurosport 1 Spain.
* **Lines 14,703 – 14,748**: `renderShowcaseContainers(containers, fallbackChannels)` initialization:
  - Target root: `#sportsShowcaseContainersRoot`.
  - Normalizes Asian Games containers (`c.id = 'asian_games'`, `c.title = 'Asian Games Container'`, `c.badge = 'ASIAN GAMES'`).
  - Intercepts URI parameter `?container=asian_games` to sort requested container to top of display list.

---

### 🔹 Micro-Slice 34: Lines 14,744 – 15,190
* **Lines 14,749 – 14,896**: Showcase Studio Container Assembly & Multi-Layout Engine:
  - Fallback channel exclusion: explicitly filters out TimStreams, proxy streams, and `tim_` prefixed IDs from showcase containers.
  - Background styling: dynamic neutral dark gradient (`rgba(9,9,11,0.95)` to `rgba(9,9,11,0.35)`) over container `bgUrl`. Strictly enforces NO blue tint.
  - Header: `SHOWCASE` pill, dynamic badge with sparkles icon, title, subtitle, animated pulsing live feeds counter badge, and subsection expand button (`#sports-exp-btn-customShelf_${containerId}`).
  - Cutout Art: renders athlete PNG (`playerPng`) on bottom right with drop shadow `drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]`.
  - Visual Layout Switcher:
    - `'shelf'`: Scroller buttons + flex container `#customShelf_${containerId}` -> calls `_doRenderSportsShelf`.
    - `'grid'`: Responsive 2-6 col bento grid `#customGrid_${containerId}` -> calls `renderBentoChannelGrid`.
    - `'glass_cards'`: Red glassmorphism cards `#customGlass_${containerId}` -> calls `renderGlassCardsGrid`.
    - `'compact_chips'`: Horizontal compact pills `#customChips_${containerId}` -> calls `renderCompactChipsGrid`.
    - `'spotlight'`: 3-col featured hero + sub-streams list `#customSpotlight_${containerId}` -> calls `renderContainerSpotlight`.
* **Lines 14,898 – 14,933**: URI Connection & Asian Games Highlighting:
  - `handleSportsUriConnection()`: reads `window.location.search` for `container` matching `asian_games`, `asian-games`, `asian games`, `aisn_gams`, or `asian`.
  - `activateAsianGamesContainer(updateUrl)`: scrolls to target element (`block: 'center'`), applies temporary glowing ring (`ring-4 ring-amber-400 ring-offset-4 ring-offset-black` for 3 seconds), and triggers toast.
* **Lines 14,935 – 14,993**: `toggleSportsVoiceSearch()`:
  - Web Speech API integration (`window.SpeechRecognition || window.webkitSpeechRecognition`).
  - Caches instance on `window._sportsRecognizer`.
  - Updates microphone button `#sportsVoiceSearchBtn` animation (`text-amber-400 animate-pulse`).
  - Parses speech transcript for "asian", "aisn", "asia", "game" and triggers Asian Games container focus; otherwise calls `filterSports()`.
* **Lines 14,995 – 15,012**: `showSportsToast(msg, icon)`:
  - Floating toast notification `#sportsLiveToast` with amber border and 3500ms dismiss timer (`window._sportsToastTimer`).
* **Lines 15,014 – 15,059**: `renderBentoChannelGrid(channels, grid)`:
  - Renders up to 36 cards with EPG trigger (`openEpgChannelModal`), favorites toggle (`toggleSavedSport`), stream resolution analysis badges (`analyzeStream`), and play overlay.
* **Lines 15,061 – 15,098**: `renderGlassCardsGrid(channels, grid)`:
  - Renders up to 30 glass cards with subtle red backlight orb and LIVE pulse badge.
* **Lines 15,100 – 15,123**: `renderCompactChipsGrid(channels, grid)`:
  - Renders up to 48 compact pills with emerald status beacon.
* **Lines 15,125 – 15,174**: `renderContainerSpotlight(channels, grid)`:
  - Hero 2-column featured card + 8 secondary sub-streams list.
  - Caches active references in `window.currentSpotlightFeatured` and `window.currentSpotlightRest`.
* **Lines 15,176 – 15,190**: `_doRenderSportsShelf(channels, grid, isGrid)`:
  - Core card rendering logic for standard shelves with EPG and bookmarking controls.

---

### 🔹 Micro-Slice 35: Lines 15,191 – 15,636
* **Lines 15,191 – 15,230**: Completion of `_doRenderSportsShelf` generating `aspect-[16/10]` channel cards with lazy loading, stream type badges, and hover play triggers.
* **Lines 15,232 – 15,275**: Subsection Expand/Collapse Registration:
  - Global registries: `window._sportsSubsectionItems` (mapping containerId to items array) and `window._sportsExpandedSet` (tracking expanded state).
  - `_ensureSportsSubsectionExpandButton(containerId, channels, isLiveEvent)`:
    - Injects expand button `#sports-exp-btn-${containerId}` into shelf header.
    - Creates responsive grid wrapper `#${containerId}_gridWrap` (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`) with `animate-grid-expand`.
* **Lines 15,277 – 15,355**: Subsection Expansion Management:
  - `window.toggleSportsSubsection(containerId)`: toggles `.scroller-container` visibility and reveals `${containerId}_gridWrap`. Supports lazy rendering on first expand (`renderLiveEventsShelf`, `renderIplReplaysGrid`, or `_doRenderSportsShelf`).
  - `window.toggleAllSportsSubsections()`: synchronizes expansion/collapse across all active subsections simultaneously.
  - `window.updateSportsExpandAllBtn()`: toggles `#sportsExpandAllText` label between "Expand All" and "Collapse All".
* **Lines 15,357 – 15,418**: Shelf Renderers:
  - `renderSportsShelf(channels, containerId)`: shelf wrapper invoking `_doRenderSportsShelf` and `_ensureSportsSubsectionExpandButton`.
  - `renderLiveEventsShelf(channels, containerId, isGrid)`: specialized live match event cards with backdrop image, LIVE ping pill, logo, and Watch trigger.
* **Lines 15,420 – 15,521**: Infinite Sports Catalog Grid & Pagination:
  - State: `_sportsGridPage = 1`, `_currentGridChannels = []`, `_sportsGridObserver = null`.
  - `renderSportsGrid(channels, append)`:
    - Target: `#sportsGrid`.
    - Page size: 80 items (`pageSize = 80`).
    - Appends `#sportsGridLoadMoreContainer` with remaining count indicator.
    - Attaches `IntersectionObserver` sentinel with `rootMargin: '300px'` for seamless zero-click infinite scrolling.
* **Lines 15,522 – 15,537**: Search Input Controls:
  - `clearSportsSearch()`: clears `#sportsSearch` and triggers `filterSports()`.
  - `debounceSportsSearch()`: 1000ms debounce timer via `_sportsSearchTimeout`, exposed on `window.debounceSportsSearch`.
* **Lines 15,539 – 15,650**: Multi-Section Sports Search Studio (`filterSports()`):
  - Query normalization and Asian Games redirection.
  - Blank query reset: restores `#sportsHomeLayout` or category view `#sportsCatalogLayout`.
  - Active search view `#sportsSearchResultsSection` with 3 discrete sections:
    1. **Live Match Events**: searches `window.liveEventsData`, updates `#sportsSearchEventsBadge`, renders into `#sportsSearchEventsShelf` using `window.generateSportsEventCardHtml(ev)`.
    2. **IPL 2026 Replays**: searches `window.iplReplaysData`, updates `#sportsSearchIplBadge`, renders purple cards into `#sportsSearchIplShelf`.
    3. **Channel Catalog**: filters `window.allSportsChannels`, updates `#sportsSearchChannelsBadge`, paginates via `renderSportsGrid(filtered)`.
  - Empty state handling: `#sportsSearchEmptyNotice` vs `#sportsSearchChannelsHeader`.
  - Refreshes Lucide icons via `triggerLucide(...)`.

---

### 🔹 Micro-Slice 36: Lines 15,637 – 16,083
* **Lines 15,652 – 15,730**: Sports Category Engine:
  - State: `window.activeSportsCategory = 'all'`.
  - `filterSportsCategory(cat)` managing 13 discrete categories:
    - `all`: restores home layout `#sportsHomeLayout`, calls `renderSportsHome()` and `renderUserCustomSportsChips()`.
    - `added`: custom/MDTV channels (`isAddedChannel`, `isAddon`, `source === 'mdtv'`, `source === 'm3u_converter'`, `channel_id.startsWith('mdtv-')`, `drm`).
    - `asian_games`: matches containerId, name, or genre for Asian Games feeds, updates URL query parameter `?container=asian_games`.
    - `proxy`: DLHD, TimStreams, `/api/play_stream/`, `tim_`, `dlhd-`.
    - `saved`: loads saved sports via `getSavedSports()`.
    - `cricket`, `football`, `sky`, `f1`, `us`, `sony`, `hbo`, `kids`: keyword heuristics.
  - Active tab button styling: updates `#btn-sport-${c}` with active class (`bg-amber-600 text-white`) vs inactive (`bg-zinc-900 text-slate-400`).
* **Lines 15,731 – 15,779**: Direct Video Stream Player Bridge (`playStreamDirect`):
  - Bypasses embed iframe cascade.
  - Normalizes slug and sets `selectedMedia` object (`id: 'live-' + cleanSlug`, `type: 'sports'`, `isLive: true`, `url: streamUrl`).
  - Closes details modal (`closeDetailsModal()`).
  - Activates `#view-player` (`display: flex`).
  - Sets `#playerTitleLabel` and `#playerSubtitleLabel` (`• LIVE BROADCAST`).
  - Updates thumbnail via `updatePlayerThumbnail(...)`.
  - Hides `#fullscreenPlayerPlaceholder` and `#fullscreenVideoIframe`.
  - Reveals `#fullscreenNativePlayerContainer` and `#fullscreenNativePlayer`.
  - Integrates Hls.js (`new Hls()`) for `.m3u8` manifests or falls back to native HTML5 video `.src`.
* **Lines 15,780 – 15,831**: Anime External API Fetchers:
  - `fetchJikanAnime(endpoint)`: fetches `https://api.jikan.moe/v4/*` with AbortController 8000ms timeout, maps MAL fields (`mal_id`, titles, large cover, score * 10, episodes, synopsis).
  - `fetchKitsuAnime(endpoint)`: fetches `https://kitsu.io/api/edge/*` with AbortController 8000ms timeout, maps Kitsu attributes (`canonicalTitle`, poster, cover, score, episodes).
* **Lines 15,832 – 16,005**: Master Anime Catalog Ingestion (`loadAnimeCatalog()`):
  - `renderAnimeViews(animeList, newReleaseList)`:
    - Populates `animeSpotlightSlides` (top 10).
    - Starts 7000ms auto-rotation interval (`animeSpotlightInterval`) paused when tab is inactive, scrolled past 650px, or document is hidden.
    - Renders `#animeTop10Shelf` via `renderTop10Shelf`.
    - Renders `#animeTrendingShelf` via `renderAnimeShelf`.
    - Renders **10 distinct genre shelves** via cyclic modulo selector `getShelfItems(startIdx, count)`:
      1. Shonen (start 0, count 12, `#animeShonenShelf`)
      2. Supernatural (start 40, count 12, `#animeSupernaturalShelf`)
      3. Romance (start 45, count 12, `#animeRomanceShelf`)
      4. Top Rated (start 5, count 12, `#animeTopRatedShelf`)
      5. Isekai (start 10, count 12, `#animeIsekaiShelf`)
      6. Fighting (start 15, count 12, `#animeFightingShelf`)
      7. Cozy Slice of Life (start 20, count 12, `#animeCozySliceShelf`)
      8. Mecha (start 25, count 12, `#animeMechaShelf`)
      9. Sports (start 30, count 12, `#animeSportsShelf`)
      10. Classics Vault (start 35, count 15, `#animeClassicsVaultShelf`)
    - Invokes `initAnimeProviderSection()`, `switchAnimeScheduleDay('today')`, and `initOnePieceTrilogy()`.
  - 0ms Fast Boot Cache:
    1. In-memory `window._masterAnimeList`.
    2. `sessionStorage.getItem('consumet_master_anime_list')`.
    3. Instant 4-title hardcoded fallback pool (Attack on Titan 16498, Jujutsu Kaisen 113415, Demon Slayer 101922, Solo Leveling 151807) to guarantee zero blank screen.
  - Multi-source Ingestion:
    - Local server APIs: `/api/anime/trending`, `/api/anime/popular`.
    - AniList GraphQL query (`gql`) requesting top 30 and releasing 25.
    - Jikan v4 (`top/anime`, `seasons/now`).
    - Kitsu Edge (`trending/anime`, `anime?filter[status]=current`).
    - Concurrent ingestion with 1500ms `Promise.race` timeout limit.
    - Deduplicates via `seenTitles` Set on normalized lowercase titles.
    - Caches top 60 items into `sessionStorage.consumet_master_anime_list`.
* **Lines 16,007 – 16,083**: One Piece Master Trilogy Engine Initialization:
  - Variables: `_onePieceMasterItems`, `_onePieceDebounceTimer`.
  - `initOnePieceTrilogy()`:
    - Target: `#onePieceCardsGrid`.
    - Curated base array:
      1. Film RED (TMDB 900667, badge 'Trilogy I (2022)', 'bg-red-600')
      2. Stampede (TMDB 531309, badge 'Trilogy II (2019)', 'bg-amber-600')
      3. Film Gold (TMDB 360814, badge 'Trilogy III (2016)', 'bg-yellow-500 text-black')
      4. TV Series Continuum (TMDB 37854, badge 'TV Continuum (1100+ Eps)', 'bg-indigo-600')
      5. Film: Z (TMDB 148348, badge 'Classics (2012)', 'bg-purple-600')
      6. Strong World (TMDB 30219, badge 'Classics (2009)', 'bg-emerald-600').

---

## 3. Discrepancy & Gap Analysis vs `consumet_structure.md`

### ⚠️ Direct Numerical & Architectural Discrepancies
1. **Sports Catalog Sentinel Root Margin**:
   - `consumet_structure.md` (Section 6.27, Line 749): Claims `_sportsGridObserver` uses `rootMargin: '350px'`.
   - `consumet.html` (Line 15515): Actually initializes with `rootMargin: '300px'`:
     ```javascript
     _sportsGridObserver = new IntersectionObserver((entries) => { ... }, { rootMargin: '300px' });
     ```
2. **Anime Hero Billboard Rotation Interval**:
   - `consumet_structure.md` (Section 2.8, Line 214): Claims auto-rotation is a `6.5s interval`.
   - `consumet.html` (Line 15844): Actually runs at **7000ms (7.0s)**:
     ```javascript
     animeSpotlightInterval = setInterval(() => { ... }, 7000);
     ```
3. **Anime Curated Genre Shelves Count**:
   - `consumet_structure.md` (Section 2.8, Line 229): Claims `"7 Curated Genre Shelves: Shonen, Supernatural, Romance, Isekai, Fighting, Cozy Slice of Life, Mecha"`.
   - `consumet.html` (Lines 15868 – 15877): Actually renders **10 distinct genre shelves**:
     1. Shonen (`#animeShonenShelf`)
     2. Supernatural (`#animeSupernaturalShelf`)
     3. Romance (`#animeRomanceShelf`)
     4. **Top Rated (`#animeTopRatedShelf`)** ⚠️ *Missing from documentation*
     5. Isekai (`#animeIsekaiShelf`)
     6. Fighting (`#animeFightingShelf`)
     7. Cozy Slice of Life (`#animeCozySliceShelf`)
     8. Mecha (`#animeMechaShelf`)
     9. **Sports (`#animeSportsShelf`)** ⚠️ *Missing from documentation*
     10. **Classics Vault (`#animeClassicsVaultShelf`)** ⚠️ *Missing from documentation*

---

### 🧩 Functions Implemented in Code but Missing from `consumet_structure.md`

| Function Name | Location in `consumet.html` | Purpose & Architecture Role |
|---|---|---|
| `renderBentoChannelGrid(channels, grid)` | Line 15014 | Renders up to 36 sports channels in a 2-6 column bento grid with EPG and bookmarking controls |
| `renderGlassCardsGrid(channels, grid)` | Line 15061 | Renders up to 30 channels with red-glow glassmorphic styling and live beacons |
| `renderCompactChipsGrid(channels, grid)` | Line 15100 | Renders up to 48 compact channel pills with status indicators |
| `renderContainerSpotlight(channels, grid)` | Line 15125 | Renders 2-col hero spotlight card + 8 sub-stream list for showcase containers |
| `_doRenderSportsShelf(channels, grid, isGrid)` | Line 15176 | Core card generation engine for sports shelves with resolution tags and EPG launcher |
| `_ensureSportsSubsectionExpandButton(containerId, channels, isLive)` | Line 15235 | Injects responsive expand button and grid wrapper (`${containerId}_gridWrap`) into shelf header |
| `window.toggleSportsSubsection(containerId)` | Line 15277 | Toggles between horizontal carousel and expanded responsive grid with lazy-rendering check |
| `window.toggleAllSportsSubsections()` | Line 15334 | Master expand-all/collapse-all handler across all active sports subsections |
| `window.updateSportsExpandAllBtn()` | Line 15349 | Synchronizes header button text (`sportsExpandAllText`) to "Expand All" or "Collapse All" |
| `renderSportsShelf(channels, containerId)` | Line 15357 | Public shelf wrapper coordinating `_doRenderSportsShelf` and subsection expand injection |
| `renderLiveEventsShelf(channels, containerId, isGrid)` | Line 15364 | Renders live match event cards with background art, LIVE badge, and Watch action |
| `renderSportsGrid(channels, append)` | Line 15424 | Paginates sports channels (80 items per page) with infinite scroll via `IntersectionObserver` |
| `clearSportsSearch()` | Line 15522 | Resets `#sportsSearch` input and restores default catalog layout |
| `debounceSportsSearch()` / `window.debounceSportsSearch` | Line 15531 | 1000ms debounce handler for sports search input |
| `filterSports()` | Line 15539 | Multi-target search studio searching live events, IPL replays, and channels simultaneously |
| `filterSportsCategory(cat)` | Line 15653 | Switches sports catalog between 13 discrete categories with button active styles |
| `playStreamDirect(streamUrl, channelName, thumbOverride)` | Line 15731 | Direct video launcher activating `#view-player` and `#fullscreenNativePlayer` with Hls.js |
| `fetchJikanAnime(endpoint)` | Line 15785 | Fetches Jikan API v4 with 8000ms timeout and normalizes MAL metadata |
| `fetchKitsuAnime(endpoint)` | Line 15809 | Fetches Kitsu Edge API with 8000ms timeout and normalizes Kitsu metadata |
| `loadAnimeCatalog()` | Line 15832 | Master anime catalog loader with 0ms fast-boot cache, AniList GraphQL, and 10 genre shelves |

---

### 📦 Missing Global & Window State Variables from Section 4.1

The following state variables are actively manipulated in lines 14,297–16,083 but are completely omitted from `consumet_structure.md` Section 4 (`Complete Global State & Storage Schema`):

```typescript
// Active Sports Filtering & Category State
window.activeSportsCategory: 'all' | 'added' | 'asian_games' | 'proxy' | 'saved' | 'cricket' | 'football' | 'sky' | 'f1' | 'us' | 'sony' | 'hbo' | 'kids';

// Showcase Containers & Spotlight Studio State
window.liveEventsShowcaseContainers: any[];       // Showcase containers from admin/backend
window.sportsContainersList: any[];               // Dynamic sports containers list
window.sportsHubConfig: {                         // Fallback showcase configuration
    title?: string;
    subtitle?: string;
    badge?: string;
    bgUrl?: string;
    playerPng?: string;
    gridBgUrl?: string;
    displayMode?: 'shelf' | 'grid' | 'glass_cards' | 'compact_chips' | 'spotlight';
};
window._spotlightStudioPublic: {                   // Public admin spotlight studio overrides
    spotlightStudio?: {
        sportsSpotlight?: any;
        liveEventsSpotlight?: any;
    };
};
window.adminLiveEvents: any[];                     // Admin-configured live events
window.currentSpotlightFeatured: any;              // Featured stream object in showcase spotlight
window.currentSpotlightRest: any[];                // Sub-stream items in showcase spotlight

// Sports Subsection Expand/Collapse Architecture
window._sportsSubsectionItems: Record<string, any[]>;// Maps shelf/container ID to items array
window._sportsExpandedSet: Set<string>;            // Tracks which subsections are currently expanded
window.toggleSportsSubsection: (id: string) => void;// Global shelf expand toggle
window.toggleAllSportsSubsections: () => void;     // Global expand/collapse all
window.updateSportsExpandAllBtn: () => void;       // Header expand label synchronizer

// Sports Voice Search & Toast State
window._sportsRecognizer: SpeechRecognition;       // Cached SpeechRecognition instance
window._sportsToastTimer: number;                  // Toast dismiss timeout handle

// Sports Search & Infinite Pagination State
window.debounceSportsSearch: () => void;           // Debounced search input trigger
_sportsSearchTimeout: number | null;               // 1000ms search debounce timer handle
_sportsGridPage: number;                           // Current active page in sports catalog grid
_currentGridChannels: any[];                       // Active channels array being paginated
_sportsGridObserver: IntersectionObserver | null;  // Infinite scroll observer (300px rootMargin)

// Anime Hub Carousel & Spotlight State
animeSpotlightSlides: any[];                       // Top 10 anime array for hero billboard
currentAnimeSlideIndex: number;                    // Active slide index in anime billboard
animeSpotlightInterval: number | null;             // 7000ms timer handle for anime carousel
window._masterAnimeList: any[];                    // Master pooled anime catalog (documented in 4.1, but needs fast-boot fallback spec)

// One Piece Matrix State
_onePieceMasterItems: any[];                       // Enriched One Piece sagas array
_onePieceDebounceTimer: number | null;             // Search debounce timer for One Piece universe
```

---

### 🌐 Missing DOM IDs from `consumet_structure.md`

The following DOM elements are required by lines 14,297–16,083 but are not specified in the master blueprint:

#### Sports Hub Shelves & Count Badges
- `#sportsTimStreamsEventsShelf`
- `#timStreamsEventsCountBadge`
- `#sportsProxyStreamsShelfContainer`
- `#proxyStreamsCountBadge`
- `#sportsProxyStreamsShelf`
- `#sportsSavedShelfContainer`
- `#sportsSavedShelf`
- `#sportsLiveEventsShelfContainer`
- `#sportsLiveEventsShelf`
- `#sportsAsianGamesContainer`
- `#asianGamesFeedsCount`
- `#sportsAllChannelsShelf`
- `#sportsAsianGamesShelf`
- `#sportsSkyShelf`
- `#sportsFootballShelf`
- `#sportsCricketShelf`
- `#sportsF1Shelf`
- `#sportsUSShelf`
- `#sportsSonyShelf`
- `#sportsHBOShelf`
- `#sports4kShelf`
- `#sportsMalayalamNewsShelf`
- `#sportsMalayalamEntShelf`
- `#sportsMalayalamMoviesShelf`
- `#sportsKidsShelf`

#### Showcase Containers & Dynamic Grid Wrappers
- `#sportsShowcaseContainersRoot`
- `#showcaseContainer_${containerId}` / `#showcaseContainer_asian_games`
- `#sports-exp-btn-customShelf_${containerId}` / `#sports-exp-btn-${containerId}`
- `#sports-exp-label-customShelf_${containerId}` / `#sports-exp-label-${containerId}`
- `#customShelf_${containerId}`
- `#customGrid_${containerId}`
- `#customGlass_${containerId}`
- `#customChips_${containerId}`
- `#customSpotlight_${containerId}`
- `#${containerId}_gridWrap`
- `#sportsExpandAllText`

#### Sports Search & Category Navigation
- `#sportsSearch`
- `#sportsVoiceSearchBtn`
- `#sportsLiveToast`
- `#sportsHomeLayout`
- `#sportsCatalogLayout`
- `#sportsGrid`
- `#sportsGridLoadMoreContainer`
- `#sportsSearchResultsSection`
- `#sportsSearchEventsContainer`
- `#sportsSearchEventsShelf`
- `#sportsSearchEventsBadge`
- `#sportsSearchIplContainer`
- `#sportsSearchIplShelf`
- `#sportsSearchIplBadge`
- `#sportsSearchChannelsHeader`
- `#sportsSearchChannelsBadge`
- `#sportsSearchEmptyNotice`
- Category Buttons: `#btn-sport-all`, `#btn-sport-added`, `#btn-sport-asian_games`, `#btn-sport-proxy`, `#btn-sport-saved`, `#btn-sport-cricket`, `#btn-sport-football`, `#btn-sport-sky`, `#btn-sport-f1`, `#btn-sport-us`, `#btn-sport-sony`, `#btn-sport-hbo`, `#btn-sport-kids`

#### Direct Player Elements
- `#playerTitleLabel`
- `#playerSubtitleLabel`
- `#fullscreenPlayerPlaceholder`
- `#fullscreenVideoIframe`
- `#fullscreenNativePlayerContainer`
- `#fullscreenNativePlayer`

#### Anime Shelves
- `#animeTrendingShelf`
- `#animeTop10Shelf`
- `#animeShonenShelf`
- `#animeSupernaturalShelf`
- `#animeRomanceShelf`
- `#animeTopRatedShelf`
- `#animeIsekaiShelf`
- `#animeFightingShelf`
- `#animeCozySliceShelf`
- `#animeMechaShelf`
- `#animeSportsShelf`
- `#animeClassicsVaultShelf`
- `#onePieceCardsGrid`

---

### 🎨 CSS Properties & Visual Design Nuances
1. **Showcase Container Color Guard**:
   - Background gradient must strictly use neutral dark zinc tones (`linear-gradient(to top, rgba(9, 9, 11, 0.95) 0%, rgba(9, 9, 11, 0.35) 50%, rgba(9, 9, 11, 0.7) 100%)`). The code explicitly enforces **NO blue tint** in showcase containers.
2. **Deep-Link Focus Ring**:
   - Deep-linked containers receive an animated gold focus ring:
     `ring-4 ring-amber-400 ring-offset-4 ring-offset-black transition-all duration-500`
     which automatically clears after 3,000ms.
3. **Expand/Collapse Transitions**:
   - Expanded grid containers use the specialized animation class `animate-grid-expand` to smoothly transition from a 1-row scroller into a responsive multi-column layout.
4. **Sports Category Button State Classes**:
   - Active: `px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all bg-amber-600 text-white border border-amber-500/30`
   - Inactive: `px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all bg-zinc-900 text-slate-400 hover:text-white border border-white/5`

---

### 🛡️ Runtime Edge Cases & Architectural Guardrails
1. **Zero-Freeze Progressive Shelf Rendering**:
   - `renderSportsHome()` splits the rendering of 16 shelves into 3 distinct browser rendering frames using nested `requestAnimationFrame()`. This prevents long tasks (>50ms) and UI stutters when switching into Sports Central.
2. **Infinite Pagination Sentinel Cleanup**:
   - `renderSportsGrid()` always removes the previous `#sportsGridLoadMoreContainer` before rendering new items and calls `_sportsGridObserver.disconnect()` before instantiating a new observer. This prevents memory leaks and duplicate IntersectionObserver triggers.
3. **Single-Quote Sanitization in Inline Event Handlers**:
   - Inline `onclick` handlers for EPG modals and favorites replace single quotes with `%27`:
     `'${encodeURIComponent(rawName).replace(/'/g, "%27")}'`
   - In `renderContainerSpotlight()`, titles are escaped via `.replace(/'/g, "\\'")`.
4. **0ms Anime Fast-Boot Multi-Tier Fallback Pool**:
   - `loadAnimeCatalog()` includes an un-bypassable hardcoded 4-item fallback list (Attack on Titan, Jujutsu Kaisen, Demon Slayer, Solo Leveling) that renders immediately if memory cache and sessionStorage are empty, ensuring the anime view is never blank while external APIs resolve.
5. **Cyclic Modulo Selector for Anime Shelves**:
   - `getShelfItems(startIdx, count)` uses modulo indexing `(startIdx + i) % animeList.length` so genre shelves render successfully even when the ingested pool has fewer items than expected.

---

## 4. Conclusion & Recommendations

The examined lines (14,297 to 16,083) feature exceptionally resilient, enterprise-grade engineering. However, `consumet_structure.md` requires updates to accurately reflect the actual implementation:
- Update the **Sports Grid sentinel rootMargin** from `350px` to `300px`.
- Correct the **Anime Spotlight billboard interval** from `6.5s` to `7.0s` (`7000ms`).
- Expand the documented **Anime Genre Shelves** from 7 to all 10 verified shelves.
- Add the missing **Showcase Layout sub-renderers**, **Subsection Expand/Collapse architecture**, **Multi-section Sports Search Studio**, and **Direct Native Video Player Bridge** (`playStreamDirect`).
- Document all 20 missing global state variables in Section 4.1.
