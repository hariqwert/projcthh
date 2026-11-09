# 🔍 Consumet Audit Report: Micro-Slices 5, 6, 7, 8 (Lines 1,788 – 3,574)

**Auditor:** Final Check Auditor 2  
**Target File:** [`consumet.html`](file:///c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html)  
**Reference Specification:** [`consumet_structure.md`](file:///c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_structure.md)  
**Coverage Scope:** Lines 1,788 to 3,574 (Total 1,787 lines inspected line-by-line)  
**Integrity Constraint:** Zero modifications made to `anime_bing.php`.

---

## 1. Executive Summary

This audit meticulously validates lines 1,788 to 3,574 of `consumet.html` against `consumet_structure.md`. This range encompasses major critical views, multiple complex modals, and foundational runtime JavaScript engines:
1. **Micro-Slice 5 (Lines 1,788 – 2,211):** End of `#view-tv`, complete `#view-sports` (Sports Central Hub, 14+ shelves, dedicated search layout, category filters, and sports grids).
2. **Micro-Slice 6 (Lines 2,212 – 2,685):** Master Linear TV Directory (`#view-livetv`), Live Now & Match Schedule (`#view-livenow`), My Watchlist (`#view-watchlist`), Program Guide (`#view-epg`), Anime Otaku Arena (`#view-anime`), Search Results (`#view-search`), and EPG Dialog Modals (`#epgProgramModal`, `#epgChannelModal`).
3. **Micro-Slice 7 (Lines 2,686 – 3,116):** Cinema Details Page (`#detailsModal`), TV Season/Episode Selector (`#tvNavigator`), Cast & Crew Studio, Person Details Modal (`#personDetailsModal`), Fullscreen Theater Player (`#view-player`), Trailer Modal (`#trailerModal`), and Glassmorphic Actor Profile Modal (`#personModal`).
4. **Micro-Slice 8 (Lines 3,117 – 3,574):** Match Center Showcase (`#sportsMatchOvalModal`), Fullscreen Search Studio (`#searchPalette`), Toast System (`#toast`), and Primary Script Runtime Boot (`triggerLucide`, `safeEscapeHtml`, `showToast`, trailer background controller, `fetchTMDB` with 3-tier LRU cache & fallback pool, speculative prefetcher, `fetchTMDBLogo`, and `fetchOfficialTrailerKey`).

---

## 2. Micro-Slice 5: Lines 1,788 – 2,211 (TV Completion & Sports Hub)

### Structure & Components Audited
- **Lines 1790–1804 (TV US Sitcoms Shelf):**
  - Header badge: `US • EMMY SITCOMS` (gradient emerald-500 to teal-700)
  - Shelf scroller ID: `#tvHwSitcomShelf` with `scrollShelf('tvHwSitcomShelf', 'left'/'right')`
- **Lines 1805–1809 (TV Catalog & Search Layout):**
  - `#tvCatalogLayout` (class `hidden space-y-6`)
  - `#tvGrid` (class `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6`)
- **Lines 1813–1845 (Sports Main Header & Control Bar):**
  - Section `#view-sports` (class `hidden space-y-10 animate-fade-in relative`)
  - Floating badge: `LIVE BROADCAST` with `animate-pulse`
  - Expand/Collapse All button: `#sportsExpandAllBtn` with `onclick="toggleAllSportsSubsections()"`, icon `layout-grid`, label `#sportsExpandAllText`
  - Dedicated search input: `#sportsSearch` with `oninput="debounceSportsSearch()"`
  - Voice search button: `#sportsVoiceSearchBtn` with `onclick="toggleSportsVoiceSearch()"`
- **Lines 1846–2022 (Sports Shelves & Containers):**
  - Layout root: `#sportsHomeLayout`
  - Hero Spotlight Container: `#sportsHeroSliderContainer` (height `h-[500px] sm:h-[620px] lg:h-[680px]`)
  - Shelf: Live Match Arena: `#liveEventsShelfContainer`, badge `#liveEventsCountBadge`, shelf `#liveEventsShelf`
  - Shelf: IPL 2026 Full Match Replays: `#iplReplaysShelfContainer`, badge `#iplReplaysCountBadge` ("146 Matches"), filters `#iplFilterAll`, `#iplFilterEn`, `#iplFilterHi` (`filterIplReplays('ALL'|'ENGLISH'|'HINDI')`), shelf `#iplReplaysShelf`
  - Showcase Root: `#sportsShowcaseContainersRoot`
  - Legacy Fallback Anchor: `#sportsCustomShelfContainer` (`display: none;`)
  - Saved Sports Shelf: `#sportsSavedShelfContainer` (`display: none;`), shelf `#sportsSavedShelf`
  - Streamic Live Fixtures: `#sportsStreamicLiveShelfContainer`, badge `#sportsLiveNowActiveBadge` (`STREAMIC • SONY EPG`), button calling `switchTab('livenow')`, shelf `#sportsStreamicLiveShelf`
  - TimStreams Live Events: `#sportsTimStreamsEventsShelfContainer`, badge `#timStreamsEventsCountBadge`, shelf `#sportsTimStreamsEventsShelf`
  - TimStreams 24/7 Channels: `#sportsProxyStreamsShelfContainer`, badge `#proxyStreamsCountBadge` ("174+ 24/7 Channels"), shelf `#sportsProxyStreamsShelf`
  - Admin Live Events: `#sportsLiveEventsShelfContainer` (`display: none;`), shelf `#sportsLiveEventsShelf`
  - All Live Sports Channels: `#sportsAllChannelsShelf`
  - Asian Games Container: `#sportsAsianGamesContainer`, title `#asianGamesContainerTitle`, count badge `#asianGamesFeedsCount`, shelf `#sportsAsianGamesShelf`
  - Sky Sports Network: `#sportsSkyShelf`
  - Dynamic Timelines Root: `#sportsTimelinesContainer`
- **Lines 2024–2145 (Categorized Sports Shelves):**
  - Football & Soccer Arenas: `#sportsFootballShelf`
  - Cricket Network: `#sportsCricketShelf`
  - Formula 1 & Motorsports: `#sportsF1Shelf`
  - US Sports & ESPN: `#sportsUSShelf`
  - Sony Network: `#sportsSonyShelf`
  - HBO Network: `#sportsHBOShelf`
  - 4K Ultra HD Channels: `#sports4kShelf`
  - Malayalam News 24x7: `#sportsMalayalamNewsShelf`
  - Malayalam Entertainment: `#sportsMalayalamEntShelf`
  - Malayalam Movies, Music & Education: `#sportsMalayalamMoviesShelf`
  - Kids & Cartoons: `#sportsKidsShelf`
- **Lines 2146–2210 (Sports Search, Filters & Catalog Grid):**
  - `#sportsCatalogLayout` (class `hidden space-y-6`)
  - 13 Category Filter Buttons: `#btn-sport-all`, `#btn-sport-added`, `#btn-sport-asian_games`, `#btn-sport-proxy`, `#btn-sport-saved`, `#btn-sport-cricket`, `#btn-sport-football`, `#btn-sport-sky`, `#btn-sport-f1`, `#btn-sport-us`, `#btn-sport-sony`, `#btn-sport-hbo`, `#btn-sport-kids` (calling `filterSportsCategory(...)`)
  - Search Results Section `#sportsSearchResultsSection` (class `hidden space-y-6`):
    - Live Match Events search sub-shelf: `#sportsSearchEventsContainer`, badge `#sportsSearchEventsBadge`, shelf `#sportsSearchEventsShelf`
    - IPL Replays search sub-shelf: `#sportsSearchIplContainer`, badge `#sportsSearchIplBadge`, shelf `#sportsSearchIplShelf`
    - Empty Search Notice: `#sportsSearchEmptyNotice` with `onclick="clearSportsSearch()"`
    - Channels Header in search mode: `#sportsSearchChannelsHeader`, badge `#sportsSearchChannelsBadge`
  - Channels Grid: `#sportsGrid` (class `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4`)

### Discrepancies & Details Missing from `consumet_structure.md`
1. **Critical DOM ID Error in Spec:** Line 81 of `consumet_structure.md` claims hardware acceleration targets `#sportsCatalogGrid > div`. In `consumet.html` line 2207, the actual grid ID is `#sportsGrid`, NOT `#sportsCatalogGrid`.
2. **Missing Sitcom Shelf ID:** `#tvHwSitcomShelf` is not explicitly documented in the TV series breakdown.
3. **Missing Sports Expand Button & Text IDs:** `#sportsExpandAllBtn`, `#sportsExpandAllText`, and handler `toggleAllSportsSubsections()` are missing from the state/DOM catalog.
4. **Missing Dedicated Sports Search Results Sub-DOM:** `#sportsSearchResultsSection`, `#sportsSearchEventsContainer`, `#sportsSearchEventsBadge`, `#sportsSearchEventsShelf`, `#sportsSearchIplContainer`, `#sportsSearchIplBadge`, `#sportsSearchIplShelf`, `#sportsSearchEmptyNotice`, `#sportsSearchChannelsHeader`, and `#sportsSearchChannelsBadge` are completely omitted from the document.
5. **Missing Clear Search Handler:** `clearSportsSearch()` is not listed in the functions catalog.
6. **Missing Exact Sports Filter Button IDs:** All 13 `#btn-sport-*` button IDs (`#btn-sport-all`, `#btn-sport-added`, `#btn-sport-asian_games`, `#btn-sport-proxy`, `#btn-sport-saved`, `#btn-sport-cricket`, `#btn-sport-football`, `#btn-sport-sky`, `#btn-sport-f1`, `#btn-sport-us`, `#btn-sport-sony`, `#btn-sport-hbo`, `#btn-sport-kids`) are omitted.
7. **Missing Specific Sports Shelves IDs:** `#sportsTimelinesContainer`, `#sportsSkyShelf`, `#sportsFootballShelf`, `#sportsCricketShelf`, `#sportsF1Shelf`, `#sportsUSShelf`, `#sportsSonyShelf`, `#sportsHBOShelf`, `#sports4kShelf`, `#sportsMalayalamNewsShelf`, `#sportsMalayalamEntShelf`, `#sportsMalayalamMoviesShelf`, and `#sportsKidsShelf` are summarized generically without exact IDs.
8. **Missing Asian Games Sub-DOM IDs:** `#asianGamesContainerTitle` and `#asianGamesFeedsCount` are missing.

---

## 3. Micro-Slice 6: Lines 2,212 – 2,685 (Live TV, Live Now, EPG, Anime, Search & EPG Modals)

### Structure & Components Audited
- **Lines 2212–2280 (Live TV Network `#view-livetv`):**
  - Section `#view-livetv` (class `hidden space-y-6 animate-fade-in relative pb-16`)
  - Header indicator: `#jtvHeaderIndicator` (`animate-pulse`)
  - Badges: `#jtvTotalCountBadge` ("1,324 CHANNELS"), `#jtvHeaderSubtitle`
  - Search input: `#jtvSearchInput` with `oninput="debounceLiveTvChannels()"`
  - Source switchers: `#btn-livetv-src-jiotv` (JioTV Network), `#btn-livetv-src-sportlink` (SportLink Live), `#btn-livetv-src-livem3u` (GitHub Live Events), `#btn-livetv-src-allchannels` (All Channels), invoking `switchLiveTvCatalog(...)`
  - Sticky Category Filter Bar: container `sticky top-16 z-30 bg-black/90 backdrop-blur-xl`, scroller buttons `scrollShelf('jtvCategoryPills', 'left'/'right')`, pills container `#jtvCategoryPills`
  - Master Grid: `#jtvChannelGrid`
  - Empty search state: `#jtvNoResults`
- **Lines 2282–2366 (Live Now & Sports Schedule `#view-livenow`):**
  - Theme: Glacier Sapphire (no black background), inline style `touch-action: pan-x pan-y; -webkit-overflow-scrolling: touch; min-height: 100vh;`
  - Header console: `bg-slate-900/70 border border-slate-400/15 backdrop-blur-2xl`
  - Badges: `#liveNowTotalBadge`, `#liveNowLiveCountText`, real-time clock `#liveNowClockTicker`
  - Search & Controls: `#liveNowSearch` (`onkeyup="filterLiveNowGrid()"`), clear button `#liveNowSearchClear`, expand button `#liveNowExpandAllBtn` with label `#liveNowExpandAllText` (`onclick="toggleAllLiveNowSubsections()"`), refresh button with icon `#liveNowRefreshIcon` (`onclick="loadLiveSportsSchedule(true)"`)
  - 12 Source Filter Buttons: `#livenow-source-all`, `#livenow-source-sportlink` (with `#liveNowSportlinkCountBadge`), `#livenow-source-sony`, `#livenow-source-willow` (with `#liveNowWillowCountBadge`), `#livenow-source-fancode`, `#livenow-source-prime` (with `#liveNowPrimeCountBadge`), `#livenow-source-tim`, `#livenow-source-livem3u`, `#livenow-source-added` (with `#liveNowAddedCountBadge`), `#livenow-source-mdtv`, `#livenow-source-fixtures`, `#livenow-source-containers` (`setLiveNowSourceFilter(...)`)
  - 11 Status & Sport Category Filters: `#livenow-sport-all`, `#livenow-status-live`, `#livenow-status-starting`, `#livenow-sport-cricket`, `#livenow-sport-football`, `#livenow-sport-f1`, `#livenow-sport-tennis`, `#livenow-sport-combat`, `#livenow-sport-basketball`, `#livenow-sport-added`, `#livenow-sport-nfl`, `#livenow-sport-baseball` (`setLiveNowStatusFilter(...)` & `setLiveNowSportCategory(...)`)
  - Spotlight container: `#liveNowHeroSpotlight`
  - Content container: `#liveNowEventsContainer`, grid `#liveNowEventsGrid`
- **Lines 2370–2379 (Watchlist `#view-watchlist`):**
  - Clear all button: `onclick="clearWatchHistory()"`
  - Grid: `#watchlistGrid`
- **Lines 2381–2441 (EPG Program Guide `#view-epg`):**
  - Network tabs: `#epgTab-star`, `#epgTab-sony`, `#epgTab-sports`, `#epgTab-all` (class `epg-net-btn`, `filterEpgNetwork(...)`)
  - Search input: `#epgSearchInput` (`oninput="handleEpgSearch(this.value)"`)
  - Channel count display: `#epgChannelCountText`
  - Loading State: `#epgLoadingState`
  - Empty State: `#epgEmptyState`
  - Guide Container: `#epgGuideContainer`, cards grid `#epgCardsGrid`
- **Lines 2443–2606 (Anime View `#view-anime`):**
  - Spotlight slider: `#animeHeroSliderContainer`
  - Top 10 Shelf: `#animeTop10Shelf`
  - Weekly Broadcast Radar: `#animeScheduleSection`
  - Segmented day tabs: `#animeScheduleTabs`
  - Interactive Date Picker: `<input type="date" id="animeScheduleDatePicker" onchange="switchAnimeScheduleDay('date', this.value)">` with inline dark styling
  - 8 Day Buttons: `#schedTab-today`, `#schedTab-monday`, `#schedTab-tuesday`, `#schedTab-wednesday`, `#schedTab-thursday`, `#schedTab-friday`, `#schedTab-saturday`, `#schedTab-sunday` (class `sched-tab-btn`)
  - Schedule grid: `#animeScheduleGrid`
  - 7 Curated Anime Shelves: `#animeTopRatedShelf`, `#animeIsekaiShelf`, `#animeFightingShelf`, `#animeCozySliceShelf`, `#animeMechaShelf`, `#animeSportsShelf`, `#animeClassicsVaultShelf`
- **Lines 2607–2617 (Search Results View `#view-search`):**
  - Query label: `#searchQueryLabel`
  - Search grid: `#searchGrid`
- **Lines 2621–2649 (EPG Program Info Modal `#epgProgramModal`):**
  - Close button: `onclick="closeEpgProgramModal()"`
  - Modal fields: `#epgModalCategory`, `#epgModalTime`, `#epgModalDuration`, `#epgModalTitle`, `#epgModalChannel`, `#epgModalDesc`, `#epgModalPlayBtnContainer`
- **Lines 2650–2685 (EPG Channel Modal `#epgChannelModal`):**
  - Close button: `onclick="closeEpgChannelModal()"`
  - Header: `#epgChannelModalLogo`, `#epgChannelModalTitle`
  - Content container: `#epgChannelModalContent`
  - Subsections: `#epgChannelModalLive`, `#epgChannelModalUpcoming`

### Discrepancies & Details Missing from `consumet_structure.md`
1. **Inaccuracy in Watchlist Description:** `consumet_structure.md` line 256 claims `#view-watchlist` has "Quick filter tabs: All, Movies, TV Shows, Anime, Sports Channels." In `consumet.html` lines 2370–2379, the watchlist view contains NO filter tabs—only the title, Clear All button (`clearWatchHistory()`), and `#watchlistGrid`.
2. **Missing Live TV Source Button IDs:** `#btn-livetv-src-jiotv`, `#btn-livetv-src-sportlink`, `#btn-livetv-src-livem3u`, and `#btn-livetv-src-allchannels` are not documented.
3. **Missing Live TV Header Sub-Elements:** `#jtvHeaderIndicator`, `#jtvHeaderSubtitle`, and `#jtvNoResults` are missing.
4. **Missing Live Now Controls & Sub-IDs:** `#liveNowSearchClear`, `#liveNowExpandAllBtn`, `#liveNowExpandAllText`, `toggleAllLiveNowSubsections()`, `#liveNowRefreshIcon`, and `loadLiveSportsSchedule(true)` are missing.
5. **Missing Live Now Source Filter Buttons & Dynamic Count Badges:**
   - Buttons: `#livenow-source-all`, `#livenow-source-sportlink`, `#livenow-source-sony`, `#livenow-source-willow`, `#livenow-source-fancode`, `#livenow-source-prime`, `#livenow-source-tim`, `#livenow-source-livem3u`, `#livenow-source-added`, `#livenow-source-mdtv`, `#livenow-source-fixtures`, `#livenow-source-containers`.
   - Badges: `#liveNowSportlinkCountBadge`, `#liveNowWillowCountBadge`, `#liveNowPrimeCountBadge`, `#liveNowAddedCountBadge`.
6. **Missing Live Now Category Filter Button IDs:** `#livenow-sport-all`, `#livenow-status-live`, `#livenow-status-starting`, `#livenow-sport-cricket`, `#livenow-sport-football`, `#livenow-sport-f1`, `#livenow-sport-tennis`, `#livenow-sport-combat`, `#livenow-sport-basketball`, `#livenow-sport-added`, `#livenow-sport-nfl`, `#livenow-sport-baseball`.
7. **Missing Hero Spotlight ID:** Exact DOM ID `#liveNowHeroSpotlight` is not specified.
8. **Missing EPG Network Tab IDs & Input Handlers:** `#epgTab-star`, `#epgTab-sony`, `#epgTab-sports`, `#epgTab-all`, `#epgSearchInput`, `handleEpgSearch(...)`, `#epgChannelCountText`, `#epgLoadingState`, `#epgEmptyState`, `#epgGuideContainer`, and `#epgCardsGrid` are omitted.
9. **Missing Anime Date Picker & Day Tab IDs:** `#animeScheduleDatePicker` (`switchAnimeScheduleDay('date', value)`), `#animeScheduleTabs`, `#schedTab-today`, `#schedTab-monday`, `#schedTab-tuesday`, `#schedTab-wednesday`, `#schedTab-thursday`, `#schedTab-friday`, `#schedTab-saturday`, `#schedTab-sunday` are omitted.
10. **Missing Specific Anime Shelf IDs:** `#animeTopRatedShelf`, `#animeIsekaiShelf`, `#animeFightingShelf`, `#animeCozySliceShelf`, `#animeMechaShelf`, `#animeSportsShelf`, and `#animeClassicsVaultShelf` are not detailed.
11. **Missing EPG Modal Child IDs:**
    - `#epgProgramModal`: `#epgModalCategory`, `#epgModalTime`, `#epgModalDuration`, `#epgModalTitle`, `#epgModalChannel`, `#epgModalDesc`, `#epgModalPlayBtnContainer`, and `closeEpgProgramModal()`.
    - `#epgChannelModal`: `#epgChannelModalLogo`, `#epgChannelModalTitle`, `#epgChannelModalContent`, `#epgChannelModalLive`, `#epgChannelModalUpcoming`, and `closeEpgChannelModal()`.

---

## 4. Micro-Slice 7: Lines 2,686 – 3,116 (Details Modal, TV Navigator, Player, Modals)

### Structure & Components Audited
- **Lines 2686–2907 (Cinema Details Dialog `#detailsModal`):**
  - Modal wrapper: `data-lenis-prevent="true"`, background `bg-gradient-to-b from-[#180414] via-[#090207] to-[#050104]`
  - Top Bar: `closeDetailsModal()`, `openSearchPalette()`, `toggleWatchlist()`, `shareCurrentDetailsMedia()`
  - Widescreen Cinema Stage:
    - Backdrop: `#detailBackdrop`
    - Background trailer container: `#trailerBgContainer`
    - Background trailer iframe: `<iframe id="trailerBgIframe" class="w-full h-[150%] -translate-y-[15%] scale-110" src="" frameborder="0" allow="autoplay; encrypted-media" mute="1">`
    - Floating trailer controls: `#detailsTrailerControls` (class `hidden` initially)
      - Play/Pause toggle: `onclick="toggleDetailsTrailerPlay()"` with `<i id="detailsTrailerPlayIcon" data-lucide="pause">`
      - Mute toggle: `onclick="toggleDetailsTrailerMute()"` with `<i id="detailsTrailerMuteIcon" data-lucide="volume-x">`
  - Poster & Editorial Info:
    - Poster: `<img id="detailPoster">`
    - Metadata badges: `#detailType`, `#detailYear`, `#detailRating`, `#imdbBadge` (with `#imdbRatingVal`), `#detailRuntime`, static spec badges (`1080P FULL HD`, `HD AUDIO`, `ATMOS`, `CC`)
    - Title: `#detailTitle`
    - Tagline: `#detailTagline`
    - Genres container: `#detailGenres`
    - Overview: `#detailOverview`
    - Extra info: `#detailExtraInfo`
    - Next episode alert: `#detailNextEpisodeAlert`
  - Full Action Console (`#detailActionContainer`, `#detailActionButtons`):
    - 1. `#btn-play-bingr` with `#btn-play-bingr-text` (`openBingrPlayer()`)
    - 2. `#detailsPlayBtn` (`openFullscreenPlayer()`)
    - 3. `#btn-play-hls` (`openHlsPlayer()`)
    - 4. `#btn-party-modal-media` (`startPartyFromCurrentDetails()`)
    - 5. `#btn-play-torrent` (`openTorrentPlayer()`)
    - 6. `#btn-play-trailer` (`playSelectedTrailer()`)
    - 7. `#btn-watchlist-toggle` (`toggleWatchlist()`)
    - 8. `#btn-share-details` (`shareCurrentDetailsMedia()`)
  - Dedicated TV Season & Episode Selector (`#tvNavigator`):
    - Season dropdown: `<select id="seasonSelector" onchange="loadSeasonEpisodes()">`
    - Episode count badge: `#episodesCountBadge`
    - Episode search: `<input id="episodeSearchInput" type="text" oninput="filterSeasonEpisodes(this.value)">`
    - Clear search button: `<button id="episodeSearchClearBtn" type="button" onclick="clearEpisodeSearch()">`
    - Sort button: `<button id="episodeSortBtn" type="button" onclick="toggleEpisodeSort()">` with label `#episodeSortLabel` ("1-N")
    - View mode toggles: `#btnEpisodeViewList` (`setEpisodeViewMode('list')`), `#btnEpisodeViewGrid` (`setEpisodeViewMode('grid')`)
    - Grid: `#episodesGrid`
  - Dedicated Cast Studio:
    - Badge: `#detailCastCountBadge`
    - Carousel sliders: `slideCastList(-360)` and `slideCastList(360)`
    - Scroller container: `#detailCast`
- **Lines 2909–2938 (Legacy Person Details Modal `#personDetailsModal`):**
  - Wrapper: `data-lenis-prevent="true"`, z-index `z-[60]`
  - Close button: `onclick="closePersonDetailsModal()"`
  - Image: `<img id="personProfileImage">`
  - Name: `<h2 id="personName">` *(Note: DOM ID collision with line 3095)*
  - Tags: `#personTags`
  - Bio: `#personBiography`
  - Known For Grid: `#personKnownForGrid`
- **Lines 2940–3053 (Fullscreen Theater Player `#view-player`):**
  - Wrapper: `data-lenis-prevent="true"`, z-index `z-[70]`
  - Header Controls:
    - Back button: `onclick="closeFullscreenPlayer()"`
    - Search button: `onclick="closeFullscreenPlayer(); openSearchModal();"`
    - Thumbnail preview: `#playerThumbWrapper`, image `#playerThumbImg` (with `onerror="window.handlePlayerThumbError && window.handlePlayerThumbError()"`), fallback `#playerThumbFallback` with SVG `#playerThumbFallbackIcon`, live indicator `#playerThumbLiveBadge`
    - Text: `#playerTitleLabel`, `#playerSubtitleLabel`
    - Watch Party button: `onclick="window.togglePartyModal ? window.togglePartyModal(true) : null"`
    - TV Episode quick navigation: `#tvEpisodeControls` with `onclick="playPreviousEpisode()"` and `onclick="playNextEpisode()"`
    - Fullscreen toggle: `onclick="toggleFullscreenTheater()"`
    - Audio Mode toggles: `#btnPlayerSub` (`setPlayerAudioMode('sub')`), `#btnPlayerDub` (`setPlayerAudioMode('dub')`)
    - Server Selector: `<select id="playerServerSelector" onchange="changeServerFromFullscreen()">`
      - 8 Explicit server options: `vidlink_pro` (Selected), `vidsrc_pm`, `vidsrc_to`, `vidrift`, `twoembed`, `smashystream`, `cinezo`, `filmu`.
  - Player Canvas:
    - Container: `#cinemaPlayerWrapper`
    - Embed iframe: `<iframe id="fullscreenVideoIframe">`
    - Native video element: `<div id="fullscreenNativePlayerContainer"><video id="fullscreenNativePlayer" controls playsinline></video></div>`
    - Play overlay placeholder: `#fullscreenPlayerPlaceholder` with `#placeholderThumbPreview`, `#placeholderThumbPreviewImg`, big red play button calling `startActualFullscreenPlayback()`, badge `#fullscreenPlaceholderCategoryBadge` ("STALKER CINEMA ENGINE"), title `#fullscreenPlaceholderMediaTitle`
  - TV Up Next Drawer: `#playerUpNextContainer`, `<select id="playerSeasonSelector" onchange="changePlayerSeason(this.value)">`, `#playerEpisodesList`
  - Recommendations Shelf: `#playerRecommendationsContainer`, grid `#playerRecommendationsGrid`
- **Lines 3055–3062 (Standalone Trailer Modal `#trailerModal`):**
  - Wrapper: z-index `z-[60]`
  - Close button: `onclick="closeTrailerPopup()"`
  - Iframe: `<iframe id="trailerIframe">`
- **Lines 3064–3116 (Glassmorphic Actor Profile Modal `#personModal`):**
  - Wrapper: `data-lenis-prevent="true"`, z-index `z-[70]`
  - Ambient backlight auras
  - Close button: `onclick="closePersonModal()"`
  - Profile Photo: `<img id="personProfilePhoto">`
  - Name: `<h2 id="personName">` *(Duplicate DOM ID)*
  - Role: `#personCharacter`
  - Department: `#personDepartment`
  - Bio: `#personBio` (line-clamp-4 with hover/click expand)
  - Credits count badge: `#personCreditsCountBadge`
  - Credits Grid: `#personCreditsGrid`

### Discrepancies & Details Missing from `consumet_structure.md`
1. **Critical Architecture Confusion: Two Distinct Person Modals & Duplicate ID:**
   - `consumet.html` contains TWO separate person modals:
     - `#personDetailsModal` (Lines 2909–2938): uses `#personProfileImage`, `#personTags`, `#personBiography`, `#personKnownForGrid`, closed by `closePersonDetailsModal()`.
     - `#personModal` (Lines 3064–3116): uses `#personProfilePhoto`, `#personCharacter`, `#personDepartment`, `#personBio`, `#personCreditsCountBadge`, `#personCreditsGrid`, closed by `closePersonModal()`.
   - Both declare an element with `id="personName"`, introducing an HTML ID collision.
   - `consumet_structure.md` merged them into a single table row without identifying their differing schemas, different close functions, or the ID clash.
2. **Missing Floating Trailer Controls IDs:** In `#detailsModal`, `#detailsTrailerControls`, `#detailsTrailerPlayIcon`, and `#detailsTrailerMuteIcon` are not listed.
3. **Missing Detail Badges & Dynamic IDs:** `#imdbBadge`, `#imdbRatingVal`, `#btn-play-bingr-text`, and `#detailNextEpisodeAlert` are omitted.
4. **Missing TV Navigator Sub-Elements:** `#episodeSearchClearBtn`, `clearEpisodeSearch()`, `#episodeSortLabel`, `#btnEpisodeViewList`, `#btnEpisodeViewGrid`, and `#detailCastCountBadge` are missing.
5. **Missing Player Header Thumbnail Elements:** In `#view-player`, `#playerThumbWrapper`, `#playerThumbImg`, `window.handlePlayerThumbError`, `#playerThumbFallback`, `#playerThumbFallbackIcon`, and `#playerThumbLiveBadge` are omitted.
6. **Missing TV Episode Skip Controls:** `#tvEpisodeControls`, `playPreviousEpisode()`, and `playNextEpisode()` are missing.
7. **Missing Player Placeholder Sub-DOM:** `#fullscreenPlayerPlaceholder`, `#placeholderThumbPreview`, `#placeholderThumbPreviewImg`, `#fullscreenPlaceholderCategoryBadge`, `#fullscreenPlaceholderMediaTitle`, and handler `startActualFullscreenPlayback()` are omitted.
8. **Missing In-Player Up Next & Recommendation IDs:** `#playerUpNextContainer`, `#playerSeasonSelector`, `#playerEpisodesList`, `#playerRecommendationsContainer`, and `#playerRecommendationsGrid` are missing from the player specification.
9. **Missing Trailer Modal Close Function:** `closeTrailerPopup()` for `#trailerModal` is not documented.

---

## 5. Micro-Slice 8: Lines 3,117 – 3,574 (Match Center, Search Studio, Toast & Script Boot)

### Structure & Components Audited
- **Lines 3117–3214 (Sports Match Oval Modal `#sportsMatchOvalModal`):**
  - Outer dismiss: `onclick="closeSportMatchOvalModal()"`
  - Inner card: `#sportsMatchOvalModalContainer` with `onclick="event.stopPropagation()"`
  - Header: `#sportsModalSportBadge`, icon `trophy`, `#sportsModalSportName`, `#sportsModalStatusBadge`, `#sportsModalLeagueBadge`, close button
  - Widescreen Arena Banner: `#sportsModalVsBanner` (populated via `buildSportsModalBannerHtml`)
  - 3 Tabs: `#sportsModalTabBtnInfo` (`switchSportsModalTab('info')`), `#sportsModalTabBtnScore` (`switchSportsModalTab('score')`), `#sportsModalTabBtnWatch` (`switchSportsModalTab('watch')`, label `#sportsModalTabWatchText`)
  - Tab 1 (Match Info): `#sportsModalContentInfo`, tournament `#sportsModalInfoTournament`, time `#sportsModalInfoTimeIST`, status `#sportsModalInfoStatus`, duration `#sportsModalInfoDuration`, broadcaster `#sportsModalInfoBroadcaster`, summary container `#sportsModalInfoSummaryContainer` with `#sportsModalInfoSummary`
  - Tab 2 (Scorecard): `#sportsModalContentScore`, body `#sportsModalScoreBody`
  - Tab 3 (Watch Feeds): `#sportsModalContentWatch`, channels list `#sportsModalChannelsList`
  - Footer: close button, primary stream button `<a id="sportsModalPrimaryPlayBtn" href="#">` ("Stream Live Now")
- **Lines 3216–3258 (Fullscreen OTT Search Studio `#searchPalette`):**
  - Wrapper: `data-lenis-prevent="true"`, z-index `z-[80]`
  - Header: `<input type="text" id="searchInput" oninput="debounceSearch()">`, spinner `#searchSpinner`, clear button `#searchClearBtn` (`onclick="clearSearchInput(event)"`), close button with `<kbd>ESC</kbd>`
  - Filter Pills (`#searchFilterPills`): `data-filter="all"`, `data-filter="tmdb"`, `data-filter="anilist"`, `data-filter="events"`, `data-filter="channels"` (`setSearchFilter(...)`)
  - Hidden select: `<select id="searchEngineSource" onchange="executeSearch()" class="hidden">`
  - Results canvas: `#searchResults` (`data-lenis-prevent="true"`)
- **Lines 3259–3262 (Toast System `#toast`):**
  - Container `#toast` with `#toastText` and `info` icon
- **Lines 3263–3373 (Global Utilities & Trailer Controller):**
  - `_lucidePendingRoots`: Set of pending DOM roots
  - `_lucideFlushScheduled`: boolean flag
  - `triggerLucide(rootEl)`: Deduplicates contained roots; runs `lucide.createIcons({ root: r })`; schedules via `requestAnimationFrame` with `setTimeout(flushIcons, 16)` fallback.
  - `safeEscapeHtml(str)`: Escapes `&`, `<`, `>`, `"`, `'`.
  - `showToast(msg)`: Displays `#toast` for 3000ms with transform/opacity transitions.
  - `isTrailerPlaying = true`, `isTrailerMuted = true`
  - `toggleDetailsTrailerPlay()`: Sends YouTube iframe postMessage commands (`pauseVideo` / `playVideo`); synchronizes backdrop opacity (`detailBackdrop` opacity 1 vs 0) and `trailerBgContainer` class (`opacity-0` vs `opacity-100`); updates `detailsTrailerPlayIcon` attribute to `play` / `pause`.
  - `toggleDetailsTrailerMute()`: Sends YouTube iframe postMessage commands (`unMute` / `mute`); updates `detailsTrailerMuteIcon` to `volume-2` / `volume-x`.
- **Lines 3374–3460 (TMDB Client Cache, 3-Tier Fetcher & Fallback Pool):**
  - `_tmdbClientCache`: in-memory `Map`
  - `fetchTMDB(endpoint, params = {}, options = {})`:
    - Cache Key: `${endpoint}?${query}`
    - Level 1: `_tmdbClientCache.get(cacheKey)`
    - Level 2: `window._safeSessionGet('tmdb_' + cacheKey)`
    - Level 3: Network fetch `/api/bingr/tmdb-proxy?endpoint=...` (supports `options.signal`)
    - Eviction: If `_tmdbClientCache.size > 200`, deletes oldest key (FIFO)
    - Level 4 (Offline Fallback Pool `_fallbackPool`): 10 flagship titles (Dune: Part Two, Oppenheimer, Deadpool & Wolverine, Inside Out 2, Alien: Romulus, Game of Thrones, House of the Dragon, The Bear, Severance, Stranger Things).
    - Sub-endpoint handling: returns `{ logos: [], results: [] }` for `/images`, `/videos`, `/external_ids`.
    - TV fallback injection: Generates mock Season 1 with 3 episodes (Premiere, The Reckoning, Horizon) and `number_of_seasons: 2`.
- **Lines 3461–3493 (Speculative Media Prefetching):**
  - Globals: `window._mediaQuickCache`, `window._detailsDataCache`, `_detailsPrefetchInFlight` (Set)
  - `prefetchMediaDetails(id, type = 'movie')`:
    - Queries `${cleanType}/${id}` with `append_to_response: 'credits,videos,external_ids,images'`
    - Caches into `window._detailsDataCache`
    - Speculative TV Season 1 fetch: If type is TV, automatically fetches `tv/${id}/season/1` and populates `window._seasonEpisodesCache[`${id}_s1`]`.
- **Lines 3494–3537 (TMDB PNG Logo Fetcher):**
  - Cache: `_logoCache = {}`
  - `fetchTMDBLogo(id, type = 'movie', searchTitle = null)`:
    - Queries `${type}/${id}/images` with `include_image_language: 'en,null'`
    - Prioritizes English logo (`iso_639_1 === 'en'`)
    - Fallback: Performs title search `search/${type}` if numeric lookup fails.
- **Lines 3538–3574 (Official Video Trailer Engine):**
  - Cache: `_trailerKeyCache = {}`
  - `fetchOfficialTrailerKey(id, type = 'movie', title = '')`
  - Scoring algorithm `pickBestVideo(results)`:
    - Filters YouTube videos with valid `v.key`
    - Official video: $+100$
    - English (`iso_639_1 === 'en'`): $+50$
    - Type 'trailer': $+80$
    - Name includes 'official trailer': $+50$
    - Name includes 'main trailer': $+30$
    - Name includes 'final trailer': $+30$
    - Type 'teaser': $+30$
    - Type 'clip': $+10$
    - Sorts descending by score, returning top video key.

### Discrepancies & Details Missing from `consumet_structure.md`
1. **Missing Match Center Child IDs:**
   - Header: `#sportsModalSportBadge`, `#sportsModalSportName`, `#sportsModalStatusBadge`, `#sportsModalLeagueBadge`.
   - Tabs: `#sportsModalTabBtnInfo`, `#sportsModalTabBtnScore`, `#sportsModalTabBtnWatch`, `#sportsModalTabWatchText`.
   - Content: `#sportsModalContentInfo`, `#sportsModalInfoTournament`, `#sportsModalInfoTimeIST`, `#sportsModalInfoStatus`, `#sportsModalInfoDuration`, `#sportsModalInfoBroadcaster`, `#sportsModalInfoSummaryContainer`, `#sportsModalInfoSummary`, `#sportsModalContentScore`, `#sportsModalScoreBody`, `#sportsModalContentWatch`, `#sportsModalChannelsList`.
   - Footer: `#sportsModalPrimaryPlayBtn`.
2. **Missing Search Studio Elements:** `#searchInput`, `#searchSpinner`, `#searchClearBtn`, `clearSearchInput(event)`, `<kbd>ESC</kbd>`, `#searchFilterPills`, and hidden select `#searchEngineSource`.
3. **Missing Toast IDs & Parameters:** `#toast`, `#toastText`, and exact display duration (3000ms).
4. **Missing Lucide Optimization Nuances:** `consumet_structure.md` mentions `_lucidePendingRoots`, but omits the root containment filter (`roots.some(other => other !== r && other.contains(r))`) and the query selector guard (`r.querySelector('[data-lucide]')`).
5. **Missing HTML Sanitizer Specification:** `safeEscapeHtml(str)` and its exact entity replacements are omitted.
6. **Missing Background Trailer Sync Details:** Oromits the exact postMessage payload contract (`pauseVideo`/`playVideo`/`unMute`/`mute`) and the dynamic backdrop opacity toggling (restoring `#detailBackdrop` to opacity 1 when paused).
7. **Inaccurate Scope/Type for `_fallbackPool`:** `consumet_structure.md` line 368 defines `window._fallbackPool: Record<string, any>;`. In `consumet.html` line 3412, `_fallbackPool` is a scoped `const` Array of 10 objects inside `fetchTMDB`.
8. **Missing Speculative Season 1 Prefetching:** `consumet_structure.md` does not document that `prefetchMediaDetails` automatically pre-buffers Season 1 (`tv/${id}/season/1`) into `window._seasonEpisodesCache[`${id}_s1`]`.
9. **Missing TMDB Logo Title Fallback:** `consumet_structure.md` states logos are fetched by ID, omitting the secondary title search fallback (`search/tv` or `search/multi`).
10. **Missing Exact Trailer Scoring Weights:** The exact point values for `pickBestVideo` (official +100, en +50, trailer +80, 'official trailer' +50, 'main trailer' +30, 'final trailer' +30, teaser +30, clip +10) are completely missing from `consumet_structure.md`.

---

## 6. Comprehensive Discrepancy & Missing Details Matrix

| Category | Item in `consumet.html` | Status in `consumet_structure.md` | Impact on React Migration |
|---|---|---|---|
| **DOM ID** | `#sportsGrid` (Line 2207) | ❌ Misnamed as `#sportsCatalogGrid` (Line 81) | High. Hardware acceleration & selectors target wrong ID. |
| **DOM Architecture** | Dual Person Modals (`#personDetailsModal` vs `#personModal`) | ❌ Merged into one row, ignoring duplicate ID `#personName` | High. Needs consolidation into a single React `PersonModal`. |
| **UI State** | Watchlist filter tabs (All, Movies, Series, etc.) | ❌ Claimed to exist (Line 256), but absent in code | Medium. Avoid building non-existent tabs. |
| **DOM IDs** | 13 Sports Filter Buttons (`#btn-sport-*`) | ❌ Completely omitted | Medium. Required for category filtering logic. |
| **DOM IDs** | Sports Search Results Layout (`#sportsSearchResultsSection`, `#sportsSearchEventsContainer`, etc.) | ❌ Completely omitted | High. Separate live match & replay search shelves break. |
| **DOM IDs** | Live Now Filter Buttons & Count Badges (`#livenow-source-*`, `#liveNow*CountBadge`) | ❌ Generic description without IDs | High. Source filtering and telemetry badges fail. |
| **DOM IDs** | EPG Network Tabs & Controls (`#epgTab-*`, `#epgSearchInput`, etc.) | ❌ Generic description without IDs | Medium. EPG network switching breaks. |
| **DOM IDs** | Anime Date Picker (`#animeScheduleDatePicker`) & Day Buttons (`#schedTab-*`) | ❌ Omitted | High. Anime broadcast calendar navigation fails. |
| **DOM IDs** | Match Center Modal Elements (`#sportsModalSportBadge`, `#sportsModalContentInfo`, etc.) | ❌ Omitted; only described conceptually | Critical. Match center tabs & scorecard injection break. |
| **DOM IDs** | Fullscreen Search Studio (`#searchInput`, `#searchFilterPills`, `#searchEngineSource`) | ❌ Generic summary without IDs | High. Search studio cannot bind events. |
| **Function/Logic** | `prefetchMediaDetails` auto Season 1 prefetch | ❌ Omitted | Medium. TV episode drawer suffers loading delay. |
| **Algorithm** | `pickBestVideo` Trailer Scoring (+100, +80, +50, +30, +10) | ❌ Omitted | Medium. Sub-optimal trailer video selection. |
| **State Scope** | `_fallbackPool` (Local `const []` vs `window._fallbackPool`) | ❌ Type/Scope mismatched | Low. Offline fallback typing discrepancy. |

---

## 7. Conclusion & Next Steps

All 1,787 lines (1,788 – 3,574) of `consumet.html` have been thoroughly audited. Critical bugs in the reference specification—including DOM ID misnaming, duplicate modal IDs, non-existent watchlist tabs, and omitted DOM structures—have been identified and fully detailed in this report for the React + TypeScript migration team.
