# 🕵️ Final Check Auditor 5 Report: Micro-Slices 17–20 (Lines 7,149 to 8,935)
**Target File:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html`  
**Comparison Reference:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_structure.md`  
**Scope:** Lines 7,149 to 8,935 (1,786 lines inspected)  
**Micro-Slices Audited:**
- **Micro-Slice 17 (Lines 7,149 – 7,595):** Player Episode & Recommendations Engine, Pure HLS Scraper, Bingr Fast Launch, Inline Person Drawer, Consumet Player with Resume Seeking.
- **Micro-Slice 18 (Lines 7,596 – 8,042):** Watch Party Creator, Swipe Guard & Anti-Ad Shield, Direct Stream Navigator, Favicon Updater, Player Thumbnails, Fullscreen Theater Multi-Provider Stream Router, 8-Server VOD Embed Cascade.
- **Micro-Slice 19 (Lines 8,043 – 8,488):** Audio Mode Switcher, Theater Controls & Watch Party Sync, TorrServer P2P Launcher, IMDb Direct Stream Resolver, Watchlist Persistence, Social Sharing, Live Now Glacier Sapphire View Engine, IST Clock, Expiry/Future Date Filters, World-Class Sports Allowlist, Start Time Calculator.
- **Micro-Slice 20 (Lines 8,489 – 8,935):** Prime Sports Classifier, 7-Tier Stream Ranking, 16-Endpoint Parallel Live Sports Ingestion (`loadLiveSportsSchedule`), SonyLIV Feed Packaging, Matchup Pair Normalization, Willow Cricket Priority Algorithm, FanCode Stream Cleaning.

---

## 1. Executive Summary & Core Findings

Micro-Slices 17–20 represent the operational playback core, theater player UI controls, inline creator profiles, and the live sports multi-source ingestion engine of `consumet.html`.

A rigorous, line-by-line comparison between `consumet.html` (lines 7,149 to 8,935) and the architectural reference `consumet_structure.md` revealed **28 major functions, 22 DOM IDs, 9 URL query schemas, and multiple critical algorithmic branches** that are completely missing or severely under-specified in `consumet_structure.md`.

### Critical Discrepancy Highlights:
1. **Swipe Guard State Variable Discrepancy:** `consumet_structure.md` claims in §6.26 that `window._isSwiping = true` is set. In reality (Lines 7,647–7,662), the implementation records touch coordinates and sets `window._lastSwipeTimestamp = Date.now()`. `openLiveNowEventDirect` checks `Date.now() - (window._lastSwipeTimestamp || 0) < 350` to suppress accidental triggers during scrolling.
2. **Missing Inline Person Drawer:** `consumet_structure.md` only documents `#personModal` / `#personDetailsModal`. The actual code implements an entirely distinct embedded component `#inlinePersonDrawer` with `#inlinePersonPhoto`, `#inlinePersonRoleInTitle`, `#inlinePersonMeta`, `#inlinePersonBio`, and `#inlinePersonCreditsGrid` with smooth-scrolling back to `#detailCast`.
3. **Missing Stream Routing Branches in `openFullscreenPlayer`:** `consumet_structure.md` documents DASH and VOD servers, but omits:
   - Direct pass-through bypass for existing player URLs (`play_consumet.php`, `play_bingr.php`, `player_mdtv.html`).
   - Mix1TV & Airtel stream router (`overrideItem.source === 'mix1tv' || 'airtel'`).
   - LiveM3U stream router (`overrideItem.source === 'livem3u'`).
   - TimStreams direct routing (`overrideItem.source === 'timstreams'`).
   - FanCode / SonyLIV CDN domain matcher (`in-mc-flive`, `sonydaimenew`, `slivcdn`).
4. **Omission of Future Date Heuristic Engine (`isEventFutureDate`):** `consumet_structure.md` only notes `isSportEventEnded`. It completely misses `isEventFutureDate`, which contains date parsing against current device day/month to ensure tomorrow's matches never steal live status.
5. **Omission of World-Class Sports Allowlist (`isWorldClassSpecialChannel`):** Contains hard blocklists for non-sports entertainment channels (Zee TV, Colors, ABP News, Discovery, etc.) and explicit regex allowlists for 16 premier networks.
6. **Omission of Matchup Pair Normalization (`normalizeMatchVsPairKey`):** Generates normalized tokens (`team1_vs_team2`) to correlate feeds across SonyLIV and Willow.
7. **Willow Cricket Marquee Selection Rules:** Strict priority hierarchy ensuring live India matches always supersede other Willow matches, with on-air badge labeling (`WILLOW • ON AIR`).

---

## 2. Micro-Slice 17 Detailed Audit (Lines 7,149 to 7,595)

### 2.1 Season & Episode Controller Conclusions (Lines 7,149–7,157)
- **Code:**
  ```javascript
  window._seasonEpisodesCache[cacheKey] = data.episodes;
  currentSeasonEpisodes = data.episodes;
  renderFilteredEpisodes();
  ```
- **Blueprint Gap:** `consumet_structure.md` lists `_seasonEpisodesCache` in state schemas, but does not document `currentSeasonEpisodes` global array or `renderFilteredEpisodes()`.

### 2.2 In-Player Season Changer (`changePlayerSeason`) (Lines 7,158–7,167)
- **Signature:** `async function changePlayerSeason(seasonVal)`
- **Behavior:**
  - Parses `seasonVal` or defaults to 1. Resets `selectedEpisode = 1`.
  - Updates `#playerSubtitleLabel` innerHTML with badge:
    `<span class="inline-flex items-center gap-1 bg-red-600/20 text-red-500 px-1.5 py-0.5 rounded border border-red-500/20 font-black tracking-wide text-[8px] sm:text-[9px]">&bull; 1080P HD / S${selectedSeason} E${selectedEpisode}</span>`
  - Re-triggers playback: `startActualFullscreenPlayback()`.
  - Re-populates episode row: `populatePlayerEpisodes()`.
- **Blueprint Gap:** Entire function `changePlayerSeason` and `#playerSubtitleLabel` badge markup are missing from `consumet_structure.md`.

### 2.3 In-Player Episode Carousel (`populatePlayerEpisodes`) (Lines 7,168–7,237)
- **Signature:** `async function populatePlayerEpisodes()`
- **Behavior:**
  - Validates `selectedMedia`, verifies `type === 'tv' && item.id`.
  - Toggles `#playerUpNextContainer` (`hidden` class).
  - Populates `#playerSeasonSelector` dropdown with `Season 1` to `Season N` (`item.number_of_seasons`).
  - Fetches TMDB `tv/${item.id}/season/${s}`.
  - Image fallback: `ep.still_path` $\to$ `item.poster_path` $\to$ `https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300&h=200&fit=crop`.
  - Card active styling: `border-red-500 shadow-lg shadow-red-500/20` vs `border-white/10 hover:border-red-500/40`.
  - **Triple Play Actions on Episode Card Overlay:**
    1. Bingr Play button: `onclick="event.stopPropagation(); openBingrPlayer(null, ${ep.episode_number}, this);"` (Red circular button, Lucide `play` icon, `title="Play Episode with Bing"`).
    2. Direct Stream button: `onclick="event.stopPropagation(); selectedEpisode = ${ep.episode_number}; ... startActualFullscreenPlayback(); populatePlayerEpisodes();"` (White circular button, Lucide `play` icon).
    3. Pure HLS button: `onclick="event.stopPropagation(); openHlsPlayer(${ep.episode_number});"` (Amber circular button, Lucide `tv` icon, `shadow-amber-600/50`).
  - Auto-scrolls active card into center: `activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })`.
- **Blueprint Gap:** In `consumet_structure.md`, Section 2 View 11 mentions only "Up Next Carousel: Episode thumbnails". It does not specify `#playerUpNextContainer`, `#playerEpisodesList`, `#playerSeasonSelector`, the 3 action overlay buttons, active card styling, or smooth scroll centering.

### 2.4 In-Player Recommendations Shelf (`populatePlayerRecommendations`) (Lines 7,238–7,296)
- **Signature:** `async function populatePlayerRecommendations()`
- **Behavior:**
  - Validates `selectedMedia.id`, unhides `#playerRecommendationsContainer`.
  - Injects header with pulsing indigo beacon: `<span class="w-1.5 h-4 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 animate-pulse"></span><h3 class="text-xs font-black uppercase tracking-widest text-zinc-400">More Like This</h3>`.
  - Fetches `${type}/${item.id}/recommendations`.
  - Mounts up to 15 cards into `#playerRecsShelf`.
  - Unsplash poster fallback: `https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300&h=450&fit=crop`.
  - Click handler: `selectedMedia = rec; selectedSeason = 1; selectedEpisode = 1; openFullscreenPlayer();`.
- **Blueprint Gap:** `consumet_structure.md` omits DOM IDs `#playerRecommendationsContainer`, `#playerRecsShelf`, the 15-item slice limit, and click transition logic.

### 2.5 Pure HLS Player Scraper & Launcher (`openHlsPlayer`, `forceAnimePlay`) (Lines 7,298–7,363)
- **Signatures:**
  - `async function openHlsPlayer(item = null, epNum = null)` (Exported to `window.openHlsPlayer`)
  - `function forceAnimePlay(item = null, epNum = null)` (Exported to `window.forceAnimePlay`)
- **Behavior:**
  - Sets BFCache restore tokens: `sessionStorage.consumet_player_opened = '1'`, `sessionStorage.consumet_last_tab`.
  - Polymorphic argument handling: supports `openHlsPlayer(3)` where `item` is episode number.
  - Title resolution: falls back to `#detailTitle` DOM text if `item.title` is missing.
  - Anime detection: `Boolean(targetItem.media_type === 'anime' || targetItem.type === 'anime' || (targetItem.isAnime && (targetItem.original_language === 'ja' || targetItem.malId)))`.
  - Scrapes M3U8: `GET /api/scrape-m3u8?id=${tmdbId}&type=${type}&s=${s}&e=${e}&q=${encodeURIComponent(queryTitle)}`.
  - **3-Tier Launch Cascade:**
    1. If `data.ok && data.playUrl`: `window.location.href = data.playUrl`.
    2. Else if `data.ok && data.m3u8Url`: `window.location.href = /play.php?url=${encodeURIComponent(data.m3u8Url)}&name=${encodeURIComponent(queryTitle)}${posterParam}&source=consumet.html`.
    3. Else fallback: `window.location.href = /play_consumet.php?id=${tmdbId}&tmdbId=${tmdbId}&name=${encodeURIComponent(queryTitle)}&type=${type}&s=${s}&e=${e}&season=${s}&episode=${e}${posterParam}&source=consumet.html`.
  - `forceAnimePlay`: Delegates directly to `openBingrPlayer(item, epNum)`.
- **Blueprint Gap:** `consumet_structure.md` mentions `openHlsPlayer` in §6.7, but omits the exact 3-tier cascade, polymorphic argument parsing, `/play.php` redirection, and `forceAnimePlay`.

### 2.6 Instant Bingr Player Direct Launch (`openBingrPlayer`) (Lines 7,364–7,428)
- **Signature:** `async function openBingrPlayer(item = null, epNum = null, triggerBtn = null)` (Exported to `window.openBingrPlayer`)
- **Behavior:**
  - Sets `sessionStorage.consumet_player_opened = '1'`, `consumet_last_tab`.
  - Default server selection: `defaultSrv = isAnime ? 'anivexa' : 'vidlink'`.
  - External ID extraction: reads `imdb_id` from `targetItem.imdb_id`, `targetItem.imdbId`, `targetItem.external_ids.imdb_id`, or `window._currentDetailsData.external_ids.imdb_id`.
  - Extracts `malId` and `anilistId` for anime.
  - Button state: Sets `triggerBtn.disabled = true`, replaces content with spinning SVG and `Opening...`. Also updates `#btn-play-bingr-text` to `Opening...`.
  - Direct 0ms redirection target:
    `/play_bingr.php?type=${type}&media_type=${type}&id=${mediaId}&tmdbId=${mediaId}&imdb=${imdbId}&imdbId=${imdbId}&malId=${malId}&mal_id=${malId}&anilistId=${anilistId}&poster=${poster}&srv=${defaultSrv}&title=${rawTitle}&name=${queryTitle}&season=${s}&episode=${e}&s=${s}&e=${e}&source=consumet.html&_v=2.2`.
- **Blueprint Gap:** Complete parameter specification for `/play_bingr.php` (`malId`, `anilistId`, `imdbId`, `srv=anivexa|vidlink`, `_v=2.2`) and trigger button loading state transitions are missing from `consumet_structure.md`.

### 2.7 Inline Person Details Drawer Engine (`openInlinePersonDrawer`, `closeInlinePersonDrawer`) (Lines 7,429–7,546)
- **Signatures:**
  - `async function openInlinePersonDrawer(personId, personName, profilePath, characterName = '')`
  - `function closeInlinePersonDrawer()`
- **Behavior:**
  - Targets `#inlinePersonDrawer` (fallback to `openPersonModal` if missing).
  - DOM Elements: `#inlinePersonPhoto`, `#inlinePersonName`, `#inlinePersonRoleInTitle`, `#inlinePersonMeta`, `#inlinePersonBio`, `#inlinePersonCreditsGrid`, `#inlinePersonBackBtnText`.
  - Sets `#inlinePersonBackBtnText.textContent = Back to ${mediaTitle}`.
  - Injects pink-themed skeleton pulse cards into `#inlinePersonCreditsGrid` (`bg-pink-950/30`, `border-pink-500/20`).
  - Smooth-scrolls down to `#inlinePersonDrawer`.
  - Fetches TMDB `person/${personId}?append_to_response=combined_credits`.
  - Formats metadata: `known_for_department`, `Born ${birthday}`, `place_of_birth` joined by ` • `.
  - Sorts credits by popularity: `(b.popularity || 0) - (a.popularity || 0)`, takes top 20 titles.
  - Title card click: `closeInlinePersonDrawer(); openDetails(item.id, mediaType)`.
  - `closeInlinePersonDrawer`: Hides `#inlinePersonDrawer`, smooth-scrolls `#detailCast` back into viewport.
- **Blueprint Gap:** `consumet_structure.md` only mentions modal IDs `#personModal` / `#personDetailsModal`. The entire `#inlinePersonDrawer` component, its 7 child elements, skeleton loaders, and scroll-restore behaviors are omitted.

### 2.8 Consumet Scrape Player with Resume Seeking (`openConsumetPlayer`) (Lines 7,548–7,593)
- **Signature:** `async function openConsumetPlayer(item = null)` (Exported to `window.openConsumetPlayer`)
- **Behavior:**
  - Calls `/api/scrape-m3u8`. If `data.playUrl` returned, navigates there.
  - Fallback URL: `/play_consumet.php?id=${tmdbId}&tmdbId=${tmdbId}&name=...&type=${type}&s=${s}&e=${e}&season=${s}&episode=${e}&source=consumet.html`.
  - Appends IMDb: `&imdb=${targetItem.external_ids?.imdb_id}`.
  - Appends resume seeking: `if (window._resumeTargetTime > 0) fallbackUrl += '&t=' + Math.floor(_resumeTargetTime) + '&resume=' + Math.floor(_resumeTargetTime)`.
- **Blueprint Gap:** `openConsumetPlayer` and its `&t=` and `&resume=` URL parameters are omitted from `consumet_structure.md`.

---

## 3. Micro-Slice 18 Detailed Audit (Lines 7,596 to 8,042)

### 3.1 Watch Party Session Creator (`startPartyFromCurrentDetails`) (Lines 7,596–7,636)
- **Signature:** `async function startPartyFromCurrentDetails()` (Exported to `window.startPartyFromCurrentDetails`)
- **Behavior:**
  - Fallback: `if (!selectedMedia) { window.togglePartyModal(true); return; }`.
  - Target URL: `/play_consumet.php?id=${tmdbId}&tmdbId=${tmdbId}&name=...&type=${type}&s=${s}&e=${e}&season=${s}&episode=${e}&source=consumet.html`.
  - Appends `&imdb=...` if external ID exists.
  - Host Nickname: `window._safeLocalGet('party_user_name') || 'Host_' + Math.floor(100 + Math.random() * 900)`.
  - HTTP POST to `/api/party/create`: `{ hostName, mediaUrl, mediaName, currentTime: 0 }`.
  - Redirect: On success, appends `&party=${data.roomId}`. On failure, navigates to `targetPlayUrl` without room parameter.
- **Blueprint Gap:** `consumet_structure.md` notes the endpoint in §6.10, but omits the nickname random generation fallback and direct navigation fallback on error.

### 3.2 Anti-Ad, Popup Shield & Mobile Touch Swipe Guard (Lines 7,637–7,663)
- **Code:**
  ```javascript
  window.open = function() { return null; };
  Object.defineProperty(window, 'onbeforeunload', { configurable: false, get: function() { return null; }, set: function() {} });
  
  let _touchStartX = 0, _touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
          _touchStartX = e.touches[0].clientX;
          _touchStartY = e.touches[0].clientY;
      }
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
          const dx = Math.abs(e.touches[0].clientX - _touchStartX);
          const dy = Math.abs(e.touches[0].clientY - _touchStartY);
          if (dx > 8 || dy > 8) {
              window._lastSwipeTimestamp = Date.now();
          }
      }
  }, { passive: true });
  ```
- **Blueprint Discrepancy:** §6.26 in `consumet_structure.md` claims `window._isSwiping = true for 350ms`. In reality, the codebase tracks `window._lastSwipeTimestamp = Date.now()`.

### 3.3 Direct Stream Navigator with BFCache Preservation (`openLiveNowEventDirect`) (Lines 7,665–7,680)
- **Signature:** `function openLiveNowEventDirect(url, defaultTab = null)` (Exported to `window.openLiveNowEventDirect`)
- **Behavior:**
  - Guard: `if (Date.now() - (window._lastSwipeTimestamp || 0) < 350) return;` (prevents accidental card click while swiping horizontally).
  - Drops invalid URLs (`#`, `javascript:void(0)`).
  - Sets `sessionStorage.consumet_player_opened = '1'`, `sessionStorage.consumet_last_tab = tabToSave`.
  - Appends `from_tab=${tabToSave}` query parameter.
  - Redirects via `window.location.href = target`.
- **Blueprint Gap:** Entire function `openLiveNowEventDirect` and its swipe timestamp suppression guard are omitted from `consumet_structure.md`.

### 3.4 Dynamic Browser Favicon Updater (`updateBrowserTabFavicon`) (Lines 7,682–7,695)
- **Signature:** `function updateBrowserTabFavicon(iconUrl)` (Exported to `window.updateBrowserTabFavicon`)
- **Behavior:** Finds or injects `<link rel="shortcut icon">`, sets `type = 'image/x-icon'`, and sets `href = iconUrl`.
- **Blueprint Gap:** Completely missing from `consumet_structure.md`.

### 3.5 Dynamic Player Thumbnail & Placeholder Engine (`updatePlayerThumbnail`, `handlePlayerThumbError`) (Lines 7,697–7,781)
- **Signatures:**
  - `function updatePlayerThumbnail(item, type, sportsName = null)` (Exported to `window.updatePlayerThumbnail`)
  - `window.handlePlayerThumbError = function()`
- **Behavior:**
  - DOM Elements: `#playerThumbImg`, `#playerThumbFallback`, `#playerThumbFallbackIcon`, `#playerThumbLiveBadge`, `#fullscreenPlayerPlaceholder`, `#placeholderThumbPreviewImg`, `#placeholderThumbPreview`, `#fullscreenPlaceholderCategoryBadge`.
  - Sports Detection: `type === 'sports' || itm.isSports || itm.isLive || itm.media_type === 'sports' || Boolean(sportsName && !itm.poster_path)`.
  - Sports Fallback Logo: If `id` starts with `mdtv-`: resolves `https://raw.githubusercontent.com/sportlive18/jio-tv-auto-update-playlist/refs/heads/main/logos/${cleanId}.png`.
  - SVG Fallback Icons:
    - Sports: Trophy SVG (`class="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0"`).
    - Cinema: Film Clapperboard SVG (`class="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 shrink-0"`).
  - Category Badge Text: `LIVE SPORTS ENGINE` vs `TELEVISION SERIES` vs `STALKER CINEMA ENGINE`.
  - Sets `#fullscreenPlayerPlaceholder.style.backgroundImage = url('${thumbUrl}')`.
  - Invokes `updateBrowserTabFavicon(thumbUrl)`.
  - `handlePlayerThumbError`: Hides `#playerThumbImg` and preview, reveals `#playerThumbFallback`.
- **Blueprint Gap:** All 8 DOM IDs, the JioTV GitHub CDN logo pattern, dynamic SVG injection, and category badge text are omitted from `consumet_structure.md`.

### 3.6 Fullscreen Theater Player Multi-Provider Stream Router (`openFullscreenPlayer`) (Lines 7,783–7,975)
- **Signature:** `function openFullscreenPlayer(overrideItem = null, sportsName = null)`
- **Behavior:**
  - Closes details modal: `closeDetailsModal()`.
  - Resolves `thumbUrl` and builds `posterParam`.
  - **Branch A: Direct Player Passthrough:** If URL starts with `/play_consumet.php`, `/play_bingr.php`, or `/player_mdtv.html`, appends `poster` and `from_tab` and navigates directly.
  - **Branch B: Mix1TV / Airtel Streams:**
    `if (overrideItem.source === 'mix1tv' || overrideItem.source === 'airtel' || (channelIdParam && (channelIdParam.startsWith('mix1tv') || channelIdParam.startsWith('airtel'))))`
    Navigates to: `/play_consumet.php?channel_id=...&url=...&key_id=...&key=...&token=...&poster=...&name=...&source=mix1tv&type=${isMpd ? 'dash' : 'hls'}`.
  - **Branch C: LiveM3U Streams:**
    `if (overrideItem.source === 'livem3u' || channelIdParam.startsWith('livem3u') || channelIdParam.startsWith('live-'))`
    Navigates to: `/play_consumet.php?channel_id=...&url=...&poster=...&name=...&source=livem3u&type=hls`.
  - **Branch D: TimStreams:**
    `if (overrideItem.source === 'timstreams' || channelIdParam.startsWith('tim') || rawUrl.includes('tim_'))`
    Navigates to: `/play_consumet.php?channel_id=...&url=...&poster=...&name=...&source=timstreams&type=hls`.
  - **Branch E: DASH ClearKey Streams (JioTV / MDTV):**
    Matches ID via 4 regex patterns:
    1. `/(?:jtv|mdtv)[-_]([a-zA-Z0-9_-]+)/i`
    2. `channelIdParam.match(...)`
    3. `/[?&]id=(?:jtv-|mdtv-)?([a-zA-Z0-9_-]+)/i`
    4. `/manifest\/([a-zA-Z0-9_-]+)\.mpd/i`
    Routes to: `/play_consumet.php?url=...&name=...&poster=...&source=consumet.html&type=dash&key_id=...&key=...&channel_id=...`.
  - **Branch F: FanCode & SonyLIV Live Sports:**
    Checks domain strings: `fancode`, `sonyliv`, `in-mc-flive`, `in-ak-flive`, `sonydaimenew`, `slivcdn`.
    Checks ID prefixes: `fancode`, `sonyliv`, `fc-`, `sliv-`.
    Routes to: `/play_consumet.php?url=...&name=...&poster=...&source=consumet.html&type=${streamType}&channel_id=...`.
  - **Branch G: Explicit HLS / M3U8 / TS Streams:**
    Routes to: `/play_consumet.php?url=...&name=...&poster=...&source=consumet.html&type=hls`.
  - **Branch H: In-Page VOD Theater Player View (`#view-player`):**
    Un-hides `#view-player` (`flex`, `flex-col`), updates `#playerTitleLabel`, `#playerSubtitleLabel`, `#tvEpisodeControls`, `#fullscreenPlaceholderMediaTitle`.
    Resets `#fullscreenVideoIframe` (src = ''), reveals `#fullscreenPlayerPlaceholder`.
    Calls `startActualFullscreenPlayback()`, `populatePlayerEpisodes()`, `populatePlayerRecommendations()`.
- **Blueprint Gap:** `consumet_structure.md` omits Branches A, B, C, D, the regex ID extractions, and the specific CDN domain indicators.

### 3.7 8-Server VOD Embed Cascade & Audio Mode Resolver (`startActualFullscreenPlayback`) (Lines 7,976–8,042)
- **Signature:** `async function startActualFullscreenPlayback()`
- **Behavior:**
  - Hides `#fullscreenPlayerPlaceholder`, unhides `#fullscreenVideoIframe`.
  - Server selection: Reads `#playerServerSelector` value (default: `vidlink_pro`).
  - IMDB ID Resolution: For `vidsrc_to` and `vidsrc_pm`, if `imdb_id` is missing, executes `GET https://api.themoviedb.org/3/{type}/{tmdbId}/external_ids`.
  - Checks `isDub = (window._playerAudioMode === 'dub')`.
  - **URL Templates for 8 Servers:**
    1. `vidlink_pro`: `https://vidlink.pro/movie/${tmdbId}?multiLang=true&sub=true${isDub ? '&dub=true&defaultLang=en' : ''}` or `/tv/${tmdbId}/${s}/${e}?multiLang=true&sub=true${isDub ? '&dub=true&defaultLang=en' : ''}`.
    2. `vidsrc_pm`: `https://vidsrc.pm/embed/movie/${tmdbId}` or `/tv/${tmdbId}/${s}/${e}`.
    3. `vidsrc_to`: `https://vidsrc.to/embed/movie/${idToUse}` or `/tv/${idToUse}/${s}/${e}` (strictly uses `imdb_id` if present).
    4. `vidrift`: `https://embed.vidrift.in/embed/movie/${tmdbId}${isDub ? '?dub=true&audio=hindi' : ''}` or `/tv/${tmdbId}/${s}/${e}${isDub ? '?dub=true&audio=hindi' : ''}`.
    5. `twoembed`: `https://www.2embed.cc/embed/${tmdbId}` or `/embedtv/${tmdbId}?s=${s}&e=${e}`.
    6. `smashystream`: `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}` or `?tmdb=${tmdbId}&season=${s}&episode=${e}`.
    7. `cinezo`: `https://player.cinezo.live/embed/movie/${tmdbId}` or `/tv/${tmdbId}/${s}/${e}`.
    8. `filmu` / `vidly`: `https://vidly.pro/embed/movie/${tmdbId}${isDub ? '?dub=1&multiLang=true' : ''}` or `/tv/${tmdbId}/${s}/${e}${isDub ? '?dub=1&multiLang=true' : ''}`.
- **Blueprint Gap:** `consumet_structure.md` lists server names, but omits the exact audio query parameter schemas (`?dub=true&audio=hindi`, `?dub=1&multiLang=true`, `&dub=true&defaultLang=en`) and external ID lookup hook.

---

## 4. Micro-Slice 19 Detailed Audit (Lines 8,043 to 8,488)

### 4.1 Audio Mode Toggle Engine (`setPlayerAudioMode`) (Lines 8,044–8,058)
- **Signature:** `function setPlayerAudioMode(mode)`
- **Behavior:**
  - Updates `window._playerAudioMode = mode`.
  - Toggles CSS classes on buttons `#btnPlayerSub` and `#btnPlayerDub`:
    - Active DUB: `#btnPlayerDub` receives `bg-red-600 text-white shadow-sm`; `#btnPlayerSub` receives `text-zinc-400 hover:text-white`.
    - Active SUB: `#btnPlayerSub` receives `bg-white/20 text-white shadow-sm`; `#btnPlayerDub` receives `text-zinc-400 hover:text-white`.
  - Calls `startActualFullscreenPlayback()`.
- **Blueprint Gap:** DOM IDs `#btnPlayerSub` and `#btnPlayerDub` and class switching are missing from `consumet_structure.md`.

### 4.2 Theater Player Controls & Watch Party Sync Hook (Lines 8,059–8,094)
- **Functions:**
  - `changeServerFromFullscreen()`: Re-triggers playback and calls `window.onHostEmbedServerChange(srv, iframe.src, 0)` to sync connected watch party guests.
  - `closeFullscreenPlayer()`: Sets `iframe.src = ''`, hides `#view-player`.
  - `toggleFullscreenTheater()`: Invokes HTML5 Fullscreen API (`container.requestFullscreen()` / `document.exitFullscreen()`) on `#cinemaPlayerWrapper`.
  - `playPreviousEpisode()`: Decrements `selectedEpisode` (if $> 1$), calls `openFullscreenPlayer()`.
  - `playNextEpisode()`: Increments `selectedEpisode`, calls `openFullscreenPlayer()`.
- **Blueprint Gap:** `changeServerFromFullscreen`'s watch party sync hook `window.onHostEmbedServerChange` and `toggleFullscreenTheater` are missing from `consumet_structure.md`.

### 4.3 TorrServer P2P BitTorrent Streamer Bridge (`openTorrentPlayer`) (Lines 8,095–8,133)
- **Signature:** `function openTorrentPlayer(epNum)`
- **Behavior:**
  - Polymorphic argument parsing: accepts episode number or media object.
  - Formats query string:
    - TV shows: Pads season/episode to 2 digits: `Title S01E01`.
    - Movies: Appends release year: `Title 2024`.
  - Redirect URL: `/torrent.html?play=${encodeURIComponent(queryStr)}&type=${type}&s=${sNum}&e=${eNum}`.
  - Appends `&imdb=${external_ids.imdb_id}` and `&tmdb=${id}` (if `id > 1000`).
- **Blueprint Gap:** `consumet_structure.md` claims `/api/bingr/sources` is called. The actual client redirects directly to `/torrent.html` with padded `SxxExx` tokens.

### 4.4 Quick Title Search & Play Resolver (`searchAndPlayItem`) (Lines 8,134–8,163)
- **Signature:** `async function searchAndPlayItem(queryTitle, mode = 'player1', ep = 1, forceType = 'tv')`
- **Behavior:** Saves history, sets `sessionStorage`, searches TMDB `search/${forceType}?query=...`, and routes to `openTorrentPlayer()` or `openFullscreenPlayer()`.
- **Blueprint Gap:** Entire function `searchAndPlayItem` is omitted from `consumet_structure.md`.

### 4.5 IMDb Direct Fetcher & Search Palette Fallback (`fetchIMDbItem`, `resolveAndPlayIMDb`) (Lines 8,164–8,189)
- **Signatures:**
  - `function fetchIMDbItem()`
  - `async function resolveAndPlayIMDb(query)`
- **Behavior:**
  - Reads `#imdbFetcherInput`.
  - Extracts `tt\d{7,10}` regex.
  - Queries TMDB `find/${imdbId}?external_source=imdb_id`.
  - If match found, opens details: `openDetails(item.id, ...)`.
  - **Fallback:** If not found or invalid IMDb format, opens search palette: `openSearchPalette()`, populates `#searchInput.value = query;`, and runs `executeSearch()`.
- **Blueprint Gap:** Fallback to `#searchPalette` and `executeSearch()` is omitted from `consumet_structure.md`.

### 4.6 Watchlist Storage & UI State (`toggleWatchlist`, `updateWatchlistBtnState`, `renderWatchlist`) (Lines 8,190–8,217, 8,267–8,275)
- **Behavior:**
  - Persists to `localStorage.stalker_watchlist`.
  - Item schema: `{ id, title, poster_path, vote_average, media_type }`.
  - Updates `#btn-watchlist-toggle`:
    - Saved: `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Saved to List`.
    - Unsaved: `<i data-lucide="bookmark" class="w-4 h-4"></i> Add to List`.
  - `renderWatchlist()`: Populates `#watchlistGrid`. Shows empty placeholder `<div class="col-span-full py-16 text-center text-zinc-500 text-xs font-bold uppercase tracking-widest">Your watchlist is currently empty</div>` or calls `renderFilterGrid(window.watchlist, 'watchlistGrid', 'movie')`.
- **Blueprint Gap:** Button state innerHTML transitions and empty placeholder text are missing from `consumet_structure.md`.

### 4.7 Permalinks & Social Sharing (`shareCurrentDetailsMedia`, `window.shareCardLink`) (Lines 8,219–8,266)
- **Signatures:**
  - `function shareCurrentDetailsMedia()`
  - `window.shareCardLink = function(url, title, type, e)`
- **Behavior:**
  - Generates permalink: `${window.location.origin}/${type}/${encodeURIComponent(id)}`.
  - Uses `navigator.share` $\to$ `navigator.clipboard.writeText` $\to$ `prompt('Copy link:', ...)`.
  - `shareCardLink`: Prevents event bubbling (`e.stopPropagation()`, `e.preventDefault()`).
- **Blueprint Gap:** Omitted from `consumet_structure.md`.

### 4.8 Live Now Architecture & IST Clock (Lines 8,278–8,335)
- **State Schema:**
  - `window.liveNowEvents = []`
  - `window.liveNowActiveStatus = 'all'`
  - `window.liveNowActiveSport = 'all'`
  - `window.liveNowActiveSource = 'all'`
  - `window.liveNowViewMode = window._safeLocalGet('stalker_livenow_view') || 'grid'`
  - `window.liveNowSpotlightIndex = 0`
  - `window.liveNowLoading = false`
  - `window.liveNowClockTimer = null`
- **Source Filtering (`setLiveNowSourceFilter`)**:
  - Manages 12 source pills: `all`, `sportlink`, `sony`, `willow`, `fancode`, `prime`, `tim`, `livem3u`, `added`, `mdtv`, `fixtures`, `containers`.
  - Updates element `#livenow-source-${s}` styling: Active gets `bg-white text-black`; Inactive gets `bg-[#14141b] text-neutral-300 border border-white/[0.08]`.
- **IST Clock (`startLiveNowClock`)**:
  - Updates `#liveNowClockTicker` every 1,000ms:
    `now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST'`.
- **View Mode Switcher (`setLiveNowViewMode`)**:
  - Persists `mode` to `localStorage.stalker_livenow_view`.
  - Toggles `#liveNowViewGridBtn` and `#liveNowViewListBtn` classes (`bg-zinc-800 text-white` vs `text-zinc-400`).
- **Blueprint Gap:** 12 source filter IDs (`#livenow-source-${s}`), `#liveNowClockTicker`, `#liveNowViewGridBtn`, and `#liveNowViewListBtn` are missing from `consumet_structure.md`.

### 4.9 Real-Time Event Expiry & Future-Date Evaluators (`isSportEventEnded`, `isEventFutureDate`) (Lines 8,336–8,392)
- **`isSportEventEnded(e)`:**
  - Evaluates: `isEnded`, `status === 'ENDED'`, countdown/timeIST containing `concluded|ended|finished`.
  - **TimStreams Exemption:** `if (e.isTimStreams || e.source === 'timstreams' || (e.id && String(e.id).startsWith('tim_'))) return false;` (24/7 channels never expire).
  - Checks `endTime <= Math.floor(Date.now() / 1000)`.
  - Checks `liveScore.isFinal`, `liveScore.detail === 'Final'|'FT'|'Full Time'`.
  - Regex title check for non-live content: `highlights?|replay|repeat|rewind|classic|vault|magazine|recap|review|encore|delayed|tape`.
- **`isEventFutureDate(e)`:**
  - Evaluates date string across 7 fields (`time`, `timeIST`, `rawTime`, `countdown`, `dateIST`, `day`, `fullIST`).
  - Matches `tomorrow` or `in \d+ days`.
  - Matches month/day regex `\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(\d{1,2})\b` and compares against current device month and date.
  - Matches day-of-week regex `\b(sun|mon|tue|wed|thu|fri|sat)...\b` and compares against `todayDay`.
  - Returns `true` if `status === 'UPCOMING' && !e.isStartingSoon`.
  - Returns `false` if `e.isLive || e.status === 'LIVE'`.
- **Auto-Pruner Interval (30 Seconds):**
  - Sweeps `window.liveNowEvents` with `!isSportEventEnded(e)`. Re-renders `renderLiveNowGrid()` and `renderLiveNowShelf()`.
- **Auto-Refresh Interval (90 Seconds):**
  - Calls `loadLiveSportsSchedule(false)` if `document.visibilityState !== 'hidden'`.
- **Blueprint Gap:** `isEventFutureDate`, the TimStreams exemption, and the 30s auto-prune interval are omitted from `consumet_structure.md`.

### 4.10 World-Class Sports Special Channels Filter (`isWorldClassSpecialChannel`) (Lines 8,401–8,449)
- **Signature:** `function isWorldClassSpecialChannel(item)`
- **Behavior:**
  - **Tier 1: Hard Blocklist:**
    - Rejects test/dummy names: `ind vs`, `wi vs`, `test match dummy`, `demo`, `placeholder`, `sample`, `offline`, `expired`, `w_450`, `clip`.
    - Rejects entertainment/news channels: `zee tv`, `zee cinema`, `colors`, `star plus`, `sab tv`, `sony pal`, `sony max`, `dangal`, `abp news`, `aaj tak`, `ndtv`, `cnn`, `bbc news`, `cartoon`, `pogo`, `nick`, `discovery`, `animal planet`, `history tv`, `mtv`, `music`, `bindass`, `zoom`, `times now`, `republic`, `wion`.
    - Rejects genres: `entertainment`, `movie`, `cinema`, `news`, `kids`, `music`, `infotainment`, `lifestyle`.
  - **Tier 2: Network Inclusions:**
    - Star Sports: `1|2|3|select|hindi|tamil|telugu|kannada|khel`.
    - Sony Sports: `ten [1-5]|six|sports`.
    - Fox Sports / Cricket / League / Footy / 50.
    - Willow Cricket.
    - Sky Sports: Main Event, Premier League, Football, Cricket, F1, Action, Arena, Golf, Tennis, News, 1–5.
    - ESPN, ESPN2, ESPN Deportes, ESPN U.
    - DAZN, Unite 8 Sports, TNT Sports, SuperSport, Astro Cricket, beIN Sports, Eurosport, DD Sports, Jio Sports, TSN 1–5.
- **Blueprint Gap:** This entire filtering algorithm and its regex patterns are omitted from `consumet_structure.md`.

### 4.11 Chronological Event Start Time Value Calculator (`getEventStartTimeValue`) (Lines 8,451–8,498)
- **Signature:** `function getEventStartTimeValue(timeVal)` (Exported to `window.getEventStartTimeValue`)
- **Behavior:**
  - Converts epoch timestamp (> 1,000,000,000) to minutes (`Math.floor(timeVal / 60)`).
  - Regex `(\d{1,2}):(\d{2})\s*(am|pm)?` for hours and minutes.
  - Regex `(\d{1,2})\s*(am|pm)` for hour-only strings.
  - Adds 1,440 minutes for `tomorrow`.
  - Adds `(mIdx * 31 + day) * 1440` for specific calendar months.
- **Blueprint Gap:** Omitted from `consumet_structure.md`.

---

## 5. Micro-Slice 20 Detailed Audit (Lines 8,489 to 8,935)

### 5.1 Prime Sports Event Classifier (`isPrimeSportsEvent`) (Lines 8,501–8,508)
- **Signature:** `function isPrimeSportsEvent(e)`
- **Behavior:**
  - Excludes MDTV, added channels, and special channels (`e.isMdtv || e.isAddedChannel || e.isSpecialChannel`).
  - Matches: `e.isPrime`, `source === 'prime'|'primesport'`, `badge === 'prime'`, `id.startsWith('prime_')|'prime-live-'`.
- **Blueprint Gap:** Omitted from `consumet_structure.md`.

### 5.2 Multi-Source Stream Ranking Hierarchy (`getLiveEventSourceRank`) (Lines 8,510–8,540)
- **Signature:** `function getLiveEventSourceRank(e)`
- **Ranking Order:**
  1. Rank 1: SONY (`e.isSonyLiv`, `sonyliv_live`, `badge === 'sony'`, `id.startsWith('sonyliv_')`, or title containing `sony`).
  2. Rank 2: WILLOW (`e.isWillow`, `source === 'willow'`, `badge === 'willow'`, `id.startsWith('willow_')`, or title containing `willow`).
  3. Rank 3: FANCODE (`e.isFanCode`, `source === 'fancode_live'`, `badge === 'fancode'`, `id.startsWith('fancode_')`, or title containing `fancode`).
  4. Rank 4: PRIME (`isPrimeSportsEvent(e)`).
  5. Rank 5: FOOTLINKS / SPORTLINK (`e.isFootlinks`, `source === 'footlinks'`, `badge === 'sportlink'|'footlinks'`, `id.startsWith('footlinks_')`).
  6. Rank 6: TIMSTREAMS (`e.isTimStreams`, `source === 'timstreams'|'tim'`, `id.startsWith('tim_')|'timstreams_'`, or `league` matches `/timstreams/i`).
  7. Rank 7: LIVE M3U (`e.isLiveM3u`, `source === 'livem3u'`, `id.startsWith('livem3u_')`, or `league` matches `/live\.?m3u/i`).
  8. Rank 8: Others.
- **Blueprint Gap:** `consumet_structure.md` mentions the ranking order in §6.1, but omits the exact multi-field detection flags for each tier.

### 5.3 Master Parallel Live Sports Ingestion Pipeline (`loadLiveSportsSchedule`) (Lines 8,542–8,935)
- **Signature:** `async function loadLiveSportsSchedule(force = false)`
- **Loading & Cache Management:**
  - 10-second watchdog reset: `if (window.liveNowLoading && Date.now() - window._liveNowLoadingStart > 10000) window.liveNowLoading = false`.
  - Zero-blank hydration: Reads `sessionStorage.getItem('consumet_livenow_cache')` into `window.liveNowEvents` if in-memory list is empty, rendering immediately.
  - 90-second cache TTL unless `force === true`.
  - Rotates `#liveNowRefreshIcon` with `.animate-spin`.
- **16 Parallel Endpoints via `Promise.allSettled`:**
  1. `/api/streamic/schedule`
  2. `/api/sports/live-events`
  3. `/api/tim/events`
  4. `/api/livem3u/events`
  5. `/api/live/events`
  6. `/api/sports/channels`
  7. `/api/sports`
  8. `/api/sports/highlights`
  9. `/api/zee/channels`
  10. `/api/fancode/live`
  11. `/api/sonyliv/live`
  12. `/api/sports/timstreams/channels`
  13. `/api/willow/events`
  14. `/api/prime/events`
  15. `/api/sportlink/channels`
  16. Google results placeholder
- **Catalog State Population & DOM Badges:**
  - `window.sportsHighlights = highlightsRes.value.highlights`
  - `window.zeeChannels = zeeRes.value.channels`
  - `window.fancodeLiveMatches = fancodeLiveRes.value.events`
  - `window.sonylivLiveMatches = sonylivLiveRes.value.events`
  - `window.sonylivUpcomingMatches = sonylivLiveRes.value.upcoming`
  - `window.willowLiveMatches = willowLiveRes.value.events || timEventsRes.value.willowEvents` $\to$ Updates `#liveNowWillowCountBadge.textContent`.
  - `window.primeLiveMatches = primeLiveRes.value.events || timEventsRes.value.primeEvents` $\to$ Updates `#liveNowPrimeCountBadge.textContent`.
  - `window.footlinksLiveMatches = sportlinkRes.value.channels || ...` $\to$ Updates `#liveNowSportlinkCountBadge.textContent`.
- **SonyLIV Live Streams Packaging (Lines 8,664–8,732):**
  - Generates event ID `sonyliv_${sl.contentId || sl.id}`.
  - Injects primary DRMLive source: `{ sourceId: 'sonyliv_primary', sourceName: 'SonyLIV Primary (DRMLive)', streamUrl, playUrl, isPrimary: true, quality: '1080p FHD' }`.
  - Maps `channels` and `myConvertedChannels` with `DIRECT_MATCH`.
- **Matchup Normalization & Willow Scheduling Engine (Lines 8,734–8,868):**
  - Helper `normalizeMatchVsPairKey(str)`:
    - Strips bracketed metadata `[.*?]|(.*?)`.
    - Strips tournament noise words: `women|w|men|m|u19|a|xi|champions|live|hd|fhd|willow|alt|cricket|odi|t20|t20i|test|match|series|\d+(?:st|nd|rd|th)`.
    - Splits on `vs` / `v`, sorts teams alphabetically: `[t1, t2].sort().join('_vs_')`.
  - Correlates `upcomingSchedulePairs` Map and `liveSchedulePairs` Set across Willow and SonyLIV upcoming rosters.
  - **Willow Marquee Priority Rules:**
    1. If ANY Team India match is genuinely LIVE today (`!isEventFutureDate(w)` and matches `india|ind (vs|/|-)|india champions`), it receives top priority.
    2. Otherwise, selects the latest started live event (`latestWillowId`).
    3. Upstream stream fallback if empty: `/live.php?token=STALKER_PRO&id=dlhd-willow-hd&m3u=1`.
    4. Tags event with `isLatestWillow = true`, `isLatestLiveEvent = true`.
    5. Injects badge: `WILLOW • ON AIR` vs `WILLOW` vs `WILLOW • UPCOMING`.
- **FanCode Live Stream Ingestion & Cleaning (Lines 8,870–8,935):**
  - Filters out dummy/test fixtures: matches `/namibia\s*v(?:s\.?)?\s*zimbabwe|zimbabwe\s*v(?:s\.?)?\s*namibia|4248459/i`.
  - Strips dead sources containing `unavailable`.
  - Builds labeled sources: `FanCode 1080p Primary`, `FanCode 1080p Backup 1`, `Backup 2`, etc.
  - Maps `channels` and `myConvertedChannels`.
- **Blueprint Gap:** `consumet_structure.md` omits `normalizeMatchVsPairKey`, the India marquee priority filter, the Namibia dummy fixture filter, the `#liveNow*CountBadge` elements, and the 10-second watchdog reset.

---

## 6. Comprehensive Discrepancy Matrix

| Category | Item in `consumet.html` (Lines 7,149–8,935) | Present in `consumet_structure.md`? | Impact / Action Required for React Migration |
|---|---|---|---|
| **Function** | `changePlayerSeason(seasonVal)` | ❌ Missing | Required for switching TV series seasons inside `#view-player`. |
| **Function** | `populatePlayerEpisodes()` | ❌ Missing (Only mentioned as concept) | Must build TV series episode drawer with Bingr, Direct Stream, and Pure HLS buttons. |
| **Function** | `populatePlayerRecommendations()` | ❌ Missing | Must fetch TMDB recommendations and render 15-item horizontal shelf. |
| **Function** | `openHlsPlayer(item, epNum)` | ⚠️ Partial (Missing `/play.php` cascade) | Must support 3-tier cascade (`playUrl` $\to$ `/play.php` $\to$ `/play_consumet.php`). |
| **Function** | `forceAnimePlay(item, epNum)` | ❌ Missing | Aliased to `openBingrPlayer(item, epNum)`. |
| **Function** | `openBingrPlayer(item, epNum, triggerBtn)` | ⚠️ Partial (Missing query params) | Must construct complete `/play_bingr.php` URI with `malId`, `anilistId`, `imdbId`, and `srv`. |
| **Function** | `openInlinePersonDrawer(personId, ...)` | ❌ Missing | Must implement inline sliding drawer with 20 cast credits and biography. |
| **Function** | `closeInlinePersonDrawer()` | ❌ Missing | Must restore scroll position back to `#detailCast`. |
| **Function** | `openConsumetPlayer(item)` | ❌ Missing | Must append `&t=` and `&resume=` timestamps when `_resumeTargetTime > 0`. |
| **Function** | `openLiveNowEventDirect(url, defaultTab)` | ❌ Missing | Must implement swipe timestamp guard and `from_tab` URL parameter. |
| **Function** | `updateBrowserTabFavicon(iconUrl)` | ❌ Missing | Must dynamically update `<link rel="shortcut icon">` on stream load. |
| **Function** | `updatePlayerThumbnail(item, type, sportsName)` | ❌ Missing | Must resolve channel logos, MDTV GitHub logos, and Trophy/Clapperboard SVGs. |
| **Function** | `handlePlayerThumbError()` | ❌ Missing | Must attach `onError` handler to fallback SVG on broken thumbnail URLs. |
| **Function** | `setPlayerAudioMode(mode)` | ❌ Missing | Must update `_playerAudioMode` and toggle styling on `#btnPlayerSub` / `#btnPlayerDub`. |
| **Function** | `changeServerFromFullscreen()` | ❌ Missing | Must invoke `window.onHostEmbedServerChange` for watch party host synchronization. |
| **Function** | `closeFullscreenPlayer()` | ❌ Missing | Must terminate iframe playback and restore UI. |
| **Function** | `toggleFullscreenTheater()` | ❌ Missing | Must execute Fullscreen API on `#cinemaPlayerWrapper`. |
| **Function** | `playPreviousEpisode()` / `playNextEpisode()` | ❌ Missing | Must increment/decrement `selectedEpisode` and reload player. |
| **Function** | `openTorrentPlayer(epNum)` | ⚠️ Discrepancy (Claims API call, actually redirects) | Must format padded `SxxExx` or `YYYY` query strings for `/torrent.html`. |
| **Function** | `searchAndPlayItem(queryTitle, ...)` | ❌ Missing | Must search TMDB and dispatch to player or torrent engine. |
| **Function** | `fetchIMDbItem()` | ❌ Missing | Must read `#imdbFetcherInput` and trigger IMDb resolver. |
| **Function** | `resolveAndPlayIMDb(query)` | ⚠️ Partial (Missing search fallback) | Must fallback to `#searchPalette` and `executeSearch()` when title not found. |
| **Function** | `shareCurrentDetailsMedia()` / `shareCardLink()` | ❌ Missing | Must implement Web Share API with clipboard and prompt fallbacks. |
| **Function** | `startLiveNowClock()` | ❌ Missing | Must implement 1-second ticking clock in Indian Standard Time (`Asia/Kolkata`). |
| **Function** | `setLiveNowViewMode(mode)` | ❌ Missing | Must toggle between grid and list modes and persist to `stalker_livenow_view`. |
| **Function** | `isEventFutureDate(e)` | ❌ Missing | Critical: Evaluates month, date, and day of week to filter out future fixtures from live views. |
| **Function** | `isWorldClassSpecialChannel(item)` | ❌ Missing | Critical: Hard blocks dummy feeds and non-sports entertainment channels. |
| **Function** | `getEventStartTimeValue(timeVal)` | ❌ Missing | Normalizes time strings into minutes from midnight for chronological sorting. |
| **Function** | `isPrimeSportsEvent(e)` | ❌ Missing | Validates whether an event qualifies as an Amazon Prime Video sports broadcast. |
| **Function** | `normalizeMatchVsPairKey(str)` | ❌ Missing | Generates normalized `team1_vs_team2` tokens to cross-correlate provider feeds. |
| **DOM ID** | `#playerUpNextContainer` | ❌ Missing | Container for TV series episodes carousel inside `#view-player`. |
| **DOM ID** | `#playerEpisodesList` | ❌ Missing | Scrollable list of episode cards inside `#view-player`. |
| **DOM ID** | `#playerSeasonSelector` | ❌ Missing | Season `<select>` dropdown inside `#view-player`. |
| **DOM ID** | `#playerRecommendationsContainer` | ❌ Missing | Container for "More Like This" recommendations inside `#view-player`. |
| **DOM ID** | `#playerRecsShelf` | ❌ Missing | Horizontal scroller for recommendations cards inside `#view-player`. |
| **DOM ID** | `#inlinePersonDrawer` | ❌ Missing | Slide-in drawer for actor profile and filmography. |
| **DOM ID** | `#inlinePersonPhoto` | ❌ Missing | Actor profile photo element. |
| **DOM ID** | `#inlinePersonName` | ❌ Missing | Actor full name heading. |
| **DOM ID** | `#inlinePersonRoleInTitle` | ❌ Missing | Character role label (`as Character Name`). |
| **DOM ID** | `#inlinePersonMeta` | ❌ Missing | Department, birth date, and birthplace metadata. |
| **DOM ID** | `#inlinePersonBio` | ❌ Missing | Biography text block. |
| **DOM ID** | `#inlinePersonCreditsGrid` | ❌ Missing | Filmography scroller showing 20 top titles. |
| **DOM ID** | `#inlinePersonBackBtnText` | ❌ Missing | Return button text (`Back to {Title}`). |
| **DOM ID** | `#playerThumbImg` | ❌ Missing | High-resolution thumbnail image in player header. |
| **DOM ID** | `#playerThumbFallback` | ❌ Missing | Fallback SVG icon container in player header. |
| **DOM ID** | `#playerThumbFallbackIcon` | ❌ Missing | Dynamic Trophy / Clapperboard SVG icon. |
| **DOM ID** | `#playerThumbLiveBadge` | ❌ Missing | Live indicator badge on player header thumbnail. |
| **DOM ID** | `#placeholderThumbPreview` | ❌ Missing | Thumbnail preview container on fullscreen player placeholder. |
| **DOM ID** | `#placeholderThumbPreviewImg` | ❌ Missing | Thumbnail preview image on fullscreen player placeholder. |
| **DOM ID** | `#fullscreenPlaceholderCategoryBadge` | ❌ Missing | Category badge (`LIVE SPORTS ENGINE` vs `STALKER CINEMA ENGINE`). |
| **DOM ID** | `#btnPlayerSub` / `#btnPlayerDub` | ❌ Missing | Audio mode switcher buttons in theater player. |
| **DOM ID** | `#liveNowClockTicker` | ❌ Missing | IST real-time clock ticker element. |
| **DOM ID** | `#liveNowWillowCountBadge` | ❌ Missing | Counter badge for active Willow Cricket events. |
| **DOM ID** | `#liveNowPrimeCountBadge` | ❌ Missing | Counter badge for active Amazon Prime Video events. |
| **DOM ID** | `#liveNowSportlinkCountBadge` | ❌ Missing | Counter badge for active SportLink multi-stream events. |
| **DOM ID** | `#livenow-source-${source}` | ❌ Missing | 12 source filter buttons (`all`, `sportlink`, `sony`, `willow`, `fancode`, `prime`, `tim`, `livem3u`, `added`, `mdtv`, `fixtures`, `containers`). |
| **DOM ID** | `#liveNowViewGridBtn` / `#liveNowViewListBtn` | ❌ Missing | Grid and list layout toggle buttons. |
| **Variable** | `window._lastSwipeTimestamp` | ⚠️ Discrepancy (Blueprint says `_isSwiping`) | Timestamp tracking touch gestures to prevent rogue clicks during scroll. |
| **Variable** | `window.liveNowClockTimer` | ❌ Missing | Timer reference for IST clock interval. |
| **Variable** | `window.liveNowSpotlightIndex` | ❌ Missing | Carousel slide index for Live Now hero banner. |
| **Variable** | `window._liveNowLoadingStart` | ❌ Missing | Watchdog timestamp to auto-recover hung loading states after 10s. |

---

## 7. Conclusion & Sign-Off

Micro-Slices 17 to 20 contain critical runtime logic for playback controls, episode/recommendation navigation, torrent querying, gesture protection, and sports match telemetry ingestion. 

All identified missing variables, DOM IDs, functions, and algorithmic rules documented above **MUST** be integrated into `consumet_structure.md` and ported into the React migration codebase.

**Audit Status:** COMPLETE ✅  
**File Generated:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_check_agent5.md`  
**Safety Protocol:** `anime_bing.php` was untouched and preserved.
