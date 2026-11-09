# Comprehensive Audit Report: consumet.html (Partition 3: Lines 7,201 – 10,800)

**Target File:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html`  
**Partition Range:** Lines 7,201 to 10,800 (3,600 lines total)  
**Audit Scope:** 8-server Theater Player cascade, IMDb external resolution, anti-ad & popup restrictions guard, BitTorrent P2P bridge, Watch Party WebRTC/WebSocket flow, stream navigation preservation, real-time sports event expiry pruner, sports aggregator multi-source pipeline, team parsing/theming/logos, and Match Center Showcase oval modal.

---

## 1. Executive Architecture Summary

Partition 3 contains the core execution engine of `consumet.html`, bridging TMDB catalog browsing with multimedia streaming playback, BitTorrent P2P distribution, live multi-source sports synchronization, and interactive match analytics.

The inspected partition breaks down into distinct functional subsystems:
1. **Player Launchers & Episode Browsers (Lines 7,201 – 7,636):** Episode cards, season selectors, TMDB recommendations carousel, pure HLS launcher (`openHlsPlayer`), Bingr launcher (`openBingrPlayer`), Consumet launcher (`openConsumetPlayer`), actor profile drawer (`openInlinePersonDrawer`), and Watch Party room generator (`startPartyFromCurrentDetails`).
2. **Anti-Ad Guard & PWA Sandbox Hardening (Lines 7,637 – 7,663):** `window.open` nullification, `onbeforeunload` lockdown, and mobile touch swipe distance tracking to prevent synthetic/ad redirect triggers.
3. **Stream Navigation Preservation & Player Viewport (Lines 7,664 – 7,975):** `from_tab` state propagation, `sessionStorage` tracking, dynamic favicon updates, stream type detection (DASH ClearKey, FanCode/SonyLIV HLS/DASH, MPEG-TS, explicit M3U8), and thumbnail management.
4. **8-Server Theater Player Cascade (Lines 7,976 – 8,094):** Multi-server embed routing (`vidlink_pro`, `vidsrc_pm`, `vidsrc_to`, `vidrift`, `twoembed`, `smashystream`, `cinezo`, `filmu`), audio dub/sub toggling, and IMDb ID on-demand fetching.
5. **TorrServer P2P BitTorrent Bridge & IMDb Direct Fetcher (Lines 8,095 – 8,275):** BitTorrent swarm query generator (`openTorrentPlayer`), TMDB find-by-IMDb resolver (`resolveAndPlayIMDb`), and Watchlist system.
6. **Live Sports Streaming Engine & Master Multi-Source Pipeline (Lines 8,276 – 10,028):** Real-time IST clock ticker, event expiry pruner (`isSportEventEnded`), chronological start-time comparator, source ranker (Sony -> Willow -> FanCode -> Prime -> Footlinks -> TimStreams -> Live.m3u), 16-source parallel aggregator (`loadLiveSportsSchedule`), and sports category filtering.
7. **Team Parser, Dynamic Theming & SVG Logo Database (Lines 10,029 – 10,155):** `parseTeamsFromTitle`, `getTeamInitials`, `KNOWN_TEAM_THEMES`, `KNOWN_TEAM_LOGOS` (IPL, Premier League, La Liga, Serie A, ICC), and `getTeamTheme`.
8. **Match Center Showcase Oval Modal (Lines 10,156 – 10,800):** Horizontal broadcast stadium banner generator (`buildSportsModalBannerHtml`), VS match thumbnail renderer (`buildVsMatchThumbnailHtml`), 3-tab modal controller (`openSportMatchOvalModal`), multi-source probe engine (`probeModalSportSources`), and 15-second scorecard poller.

---

## 2. 8-Server Theater Player Cascade & Embed Matrix

The Theater Player operates inside `#view-player`, driven by `openFullscreenPlayer` (line 7,783) and `startActualFullscreenPlayback` (line 7,976).

### 2.1 Server Cascade Specifications
The active server is selected via `#playerServerSelector`. If unspecified, it defaults to `vidlink_pro`.

| Server Key | Label / Provider | Type | TV Show Embed URL Pattern | Movie Embed URL Pattern | Special Parameters / Query Flags |
|---|---|---|---|---|---|
| `vidlink_pro` | VidLink Pro (Default) | Web Embed | `https://vidlink.pro/tv/${tmdbId}/${s}/${e}?multiLang=true&sub=true` | `https://vidlink.pro/movie/${tmdbId}?multiLang=true&sub=true` | Supports `&dub=true&defaultLang=en` when `_playerAudioMode === 'dub'` |
| `vidsrc_pm` | VidSrc PM | Web Embed | `https://vidsrc.pm/embed/tv/${tmdbId}/${s}/${e}` | `https://vidsrc.pm/embed/movie/${tmdbId}` | Pure TMDB ID routing |
| `vidsrc_to` | VidSrc TO | Web Embed | `https://vidsrc.to/embed/tv/${idToUse}/${s}/${e}` | `https://vidsrc.to/embed/movie/${idToUse}` | Uses IMDb ID (`tt...`) if available, falls back to `tmdbId` |
| `vidrift` | VidRift | Web Embed | `https://embed.vidrift.in/embed/tv/${tmdbId}/${s}/${e}` | `https://embed.vidrift.in/embed/movie/${tmdbId}` | Appends `?dub=true&audio=hindi` when `_playerAudioMode === 'dub'` |
| `twoembed` | 2Embed | Web Embed | `https://www.2embed.cc/embedtv/${tmdbId}?s=${s}&e=${e}` | `https://www.2embed.cc/embed/${tmdbId}` | Query parameters `?s=${s}&e=${e}` for series |
| `smashystream` | SmashyStream | Web Embed | `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}&season=${s}&episode=${e}` | `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}` | Parameterized via `tmdb`, `season`, `episode` |
| `cinezo` | Cinezo Live | Web Embed | `https://player.cinezo.live/embed/tv/${tmdbId}/${s}/${e}` | `https://player.cinezo.live/embed/movie/${tmdbId}` | Path-based routing `/embed/tv/...` |
| `filmu` / `vidly` | Vidly Pro | Web Embed | `https://vidly.pro/embed/tv/${tmdbId}/${s}/${e}` | `https://vidly.pro/embed/movie/${tmdbId}` | Appends `?dub=1&multiLang=true` when `_playerAudioMode === 'dub'` |

### 2.2 Fallback & Audio Switching Logic
- **Audio Modes (`setPlayerAudioMode`, lines 8,044 – 8,058):** Supports `'sub'` (default original language) and `'dub'`. When toggled, updates `window._playerAudioMode`, restyles `#btnPlayerSub` and `#btnPlayerDub`, and invokes `startActualFullscreenPlayback()`.
- **Failover / Manual Switching (`changeServerFromFullscreen`, lines 8,059 – 8,066):** Re-invokes `startActualFullscreenPlayback()`. If `window.onHostEmbedServerChange` exists, dispatches the selected server name and iframe source.
- **Theater Controls (lines 8,076 – 8,094):** 
  - `toggleFullscreenTheater()`: triggers `container.requestFullscreen()` or `document.exitFullscreen()`.
  - `playPreviousEpisode()` / `playNextEpisode()`: decrements/increments `selectedEpisode` and restarts playback.

---

## 3. IMDb ID External Resolution Hook

Certain embed servers (notably `vidsrc_to` and `vidsrc_pm`) require a valid IMDb title ID (e.g. `tt1375666`) to resolve streams without failing.

### 3.1 Inline Resolution in `startActualFullscreenPlayback` (Lines 7,996 – 8,006)
```javascript
if (['vidsrc_to', 'vidsrc_pm'].includes(server) && (!selectedMedia.external_ids?.imdb_id && (!selectedMedia.imdb_id || typeof selectedMedia.imdb_id !== 'string' || !selectedMedia.imdb_id.startsWith('tt')))) {
    try {
        const extData = await fetchTMDB(`${type}/${tmdbId}/external_ids`);
        if (extData && extData.imdb_id) {
            if (!selectedMedia.external_ids) selectedMedia.external_ids = {};
            selectedMedia.external_ids.imdb_id = extData.imdb_id;
            selectedMedia.imdb_id = extData.imdb_id;
        }
    } catch (err) {}
}
const rawImdb = selectedMedia.external_ids?.imdb_id || selectedMedia.imdb_id;
const imdbId = (rawImdb && String(rawImdb).startsWith('tt')) ? rawImdb : tmdbId;
```

### 3.2 Global IMDb Search Resolver (`resolveAndPlayIMDb`, Lines 8,169 – 8,189)
When a user pastes or searches an IMDb ID via `#imdbFetcherInput`:
1. Matches standard IMDb format with regex `/tt\d{7,10}/`.
2. Calls TMDB Find API: `fetchTMDB("find/" + imdbId, { external_source: "imdb_id" })`.
3. Inspects `data.movie_results[0]` or `data.tv_results[0]`.
4. If found, triggers `openDetails(item.id, item.title ? 'movie' : 'tv')`.
5. Fallback: If not found or API fails, opens the search palette (`openSearchPalette()`) and executes a full text search for the raw query.

---

## 4. Anti-Ad Sandbox, Popup Shield & Gesture Guard

To prevent rogue advertisement iframes from hijacking the PWA, opening popup windows, or trapping the navigation stack, lines 7,637 – 7,663 enforce strict sandbox guards:

### 4.1 Window API Lockdown (Lines 7,637 – 7,645)
```javascript
// Anti-Ad / Popup & Redirection Restrictions Guard for PWA
try {
    window.open = function() { return null; };
    Object.defineProperty(window, 'onbeforeunload', {
        configurable: false,
        get: function() { return null; },
        set: function() {}
    });
} catch(e) {}
```
- Overwrites `window.open` to a no-op returning `null`.
- Freezes `window.onbeforeunload` using `Object.defineProperty` with `configurable: false` so third-party scripts cannot block navigation or display alert prompts.

### 4.2 Mobile Touch Swipe Gesture Guard (Lines 7,647 – 7,663)
```javascript
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
- Detects horizontal or vertical gestures (`dx > 8 || dy > 8`) and records `window._lastSwipeTimestamp`.
- In `openLiveNowEventDirect` (line 7,666) and `openSportMatchOvalModal` (line 10,497), execution aborts if a swipe occurred within 350ms (`Date.now() - window._lastSwipeTimestamp < 350`), preventing accidental launches during scroll/swipe gestures.

---

## 5. TorrServer P2P BitTorrent Stream Bridge

Lines 8,095 – 8,133 implement `openTorrentPlayer`, integrating the local BitTorrent daemon (Go TorrServer running on port 8090):

### 5.1 Query Normalization & Season/Episode Formatting
```javascript
let queryStr = selectedMedia.name || selectedMedia.title || "";
const sNum = selectedSeason || 1;
const eNum = selectedEpisode || 1;
if (type === 'tv' || type === 'series') {
    const sStr = String(sNum).padStart(2, '0');
    const eStr = String(eNum).padStart(2, '0');
    queryStr += ` S${sStr}E${eStr}`;
} else if (selectedMedia.release_date) {
    queryStr += ` ${selectedMedia.release_date.substring(0,4)}`;
}
```
- TV series queries format to strict release scene conventions: `Show Name S01E01`.
- Movies append the 4-digit release year: `Movie Title 2024`.

### 5.2 Torrent Player Route Generation
```javascript
let url = `/torrent.html?play=${encodeURIComponent(queryStr)}&type=${type}&s=${sNum}&e=${eNum}`;
if (selectedMedia.external_ids?.imdb_id) url += `&imdb=${selectedMedia.external_ids.imdb_id}`;
if (selectedMedia.id && !isNaN(Number(selectedMedia.id)) && Number(selectedMedia.id) > 1000) {
    url += `&tmdb=${selectedMedia.id}`;
}
window.location.href = url;
```
Redirects client to `torrent.html`, which communicates with `TorrServer:8090` to scrape DHT, parse magnets, and pre-buffer video chunks.

---

## 6. Watch Party WebRTC/WebSocket Flow

Lines 7,594 – 7,636 implement `startPartyFromCurrentDetails`, allowing synchronized co-watching across multiple users:

### 6.1 Party Setup & Target URL Assembly
- Target stream URL is assembled pointing to `/play_consumet.php` with all required parameters (`tmdbId`, `name`, `type`, `s`, `e`, `imdb`).
- Host username is read from `sessionStorage`/`localStorage` key `'party_user_name'` (with random fallback `Host_XXX`).

### 6.2 Room Creation API Call
```javascript
const res = await fetch('/api/party/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        hostName,
        mediaUrl: `${window.location.origin}${targetPlayUrl}`,
        mediaName: title,
        currentTime: 0
    })
});
const data = await res.json();
if (data.status === 'success' && data.roomId) {
    window.location.href = `${targetPlayUrl}&party=${data.roomId}`;
} else {
    window.location.href = targetPlayUrl;
}
```
When room is created, the user is navigated to the player with `&party=${data.roomId}`, which connects to `/ws/party` for peer sync.

---

## 7. Stream Navigation Preservation & Routing Pipeline

### 7.1 Direct Stream Navigator (`openLiveNowEventDirect`, Lines 7,665 – 7,679)
Ensures 0ms back-navigation without losing user context:
- Caches navigation state:
  ```javascript
  sessionStorage.setItem('consumet_player_opened', '1');
  sessionStorage.setItem('consumet_last_tab', tabToSave);
  ```
- Appends `from_tab=${tabToSave}` query parameter to the destination URL.

### 7.2 Dynamic Favicon & Thumbnail Engine (Lines 7,682 – 7,780)
- `updateBrowserTabFavicon(iconUrl)`: Dynamically swaps the document `<link rel="shortcut icon">` to the active sports team logo or movie poster.
- `updatePlayerThumbnail(item, type, sportsName)`: Configures `#playerThumbImg`, `#playerThumbFallbackIcon` (trophy for sports, filmstrip for movies), `#playerThumbLiveBadge`, `#fullscreenPlaceholderCategoryBadge`, and `#placeholderThumbPreviewImg`.

### 7.3 Stream Type Auto-Detection & Player Redirects (`openFullscreenPlayer`, Lines 7,814 – 7,935)
1. **Existing Players:** If `rawUrl` begins with `play_consumet.php`, `play_bingr.php`, or `player_mdtv.html`, navigates immediately without nesting.
2. **Channel-specific Sources:**
   - `mix1tv` / `airtel`: Routes to `/play_consumet.php?channel_id=...&key_id=...&key=...&token=...&source=mix1tv&type=dash/hls`.
   - `livem3u`: Routes to `/play_consumet.php?channel_id=...&source=livem3u&type=hls`.
   - `timstreams`: Routes to `/play_consumet.php?channel_id=tim...&source=timstreams&type=hls`.
3. **DASH ClearKey Streams (JioTV / MDTV / Hotstar):** Detects `.mpd`, `clearkey`, `mdtv`, or `jtv`. Extracts channel ID and routes with `&type=dash&key_id=...&key=...`.
4. **FanCode & SonyLIV Live Sports:** Detects `fancode`, `sonyliv`, `in-mc-flive`, `sonydaimenew`, `slivcdn`. Determines DASH vs HLS and routes to `/play_consumet.php`.
5. **Generic HLS / M3U8:** Routes to `/play_consumet.php?...&type=hls`.

---

## 8. Real-Time Sports Aggregation & Expiry Pruning Engine

### 8.1 Event Expiry Check (`isSportEventEnded`, Lines 8,336 – 8,350)
A match is considered ended and filtered out if:
1. `e.isEnded === true` or `e.status === 'ENDED'`.
2. `e.countdown` or `e.timeIST` matches `\b(concluded|ended|finished)\b` (case-insensitive).
3. `e.endTime` epoch is $\le$ current epoch (`nowEpoch`).
4. `e.liveScore` has `isFinal: true` or `detail` matching `'Final'`, `'FT'`, or `'Full Time'`.
5. For non-live non-Sony feeds: Title contains replay keywords `\b(highlights?|replay|repeat|rewind|classic|vault|magazine|recap|review|encore|delayed|tape)\b`.
*Exception:* TimStreams feeds (`e.isTimStreams || e.source === 'timstreams' || String(e.id).startsWith('tim_')`) are exempt from automatic time expiry.

### 8.2 Real-Time Pruner Intervals (Lines 8,382 – 8,400)
- **30-Second Pruner (`setInterval`):** Continuously filters `window.liveNowEvents = window.liveNowEvents.filter(e => !isSportEventEnded(e))`. If count changes, re-renders grid and shelf.
- **90-Second Poller (`setInterval`):** Non-blocking background call to `loadLiveSportsSchedule(false)` if `document.visibilityState !== 'hidden'`.

### 8.3 Future-Dated Match Filter (`isEventFutureDate`, Lines 8,352 – 8,380)
Checks if an event belongs to a future date:
- Contains `'tomorrow'` or `in X day`.
- Month/day regex `\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(\d{1,2})\b` compared against current date.
- Day of week names (`sun`, `mon`, etc.) compared against today's day.
- Status `UPCOMING` where `!e.isStartingSoon`.

### 8.4 World-Class Sports Channels Filter (`isWorldClassSpecialChannel`, Lines 8,401 – 8,450)
- **Hard Blocklist:** Excludes dummy/placeholder strings (`demo`, `sample`, `offline`, `expired`, `ind vs wi test match dummy`) and general entertainment/news/kids channels (`zee tv`, `colors`, `sab tv`, `abp news`, `cartoon`, `pogo`, `discovery`, `mtv`, etc.).
- **Allowlist:** Star Sports, Sony Sports / Ten [1-5], Fox Sports, Willow Cricket, Sky Sports, ESPN, DAZN, Unite 8 Sports, TNT Sports / BT Sport, SuperSport, Astro Cricket, beIN Sports, Eurosport, DD Sports, Jio Sports, TSN.

### 8.5 Strict Source Hierarchy & Ranking (`getLiveEventSourceRank`, Lines 8,510 – 8,540)
Sorting precedence for live sports events:
1. **Rank 1: SONY** (`isSonyLiv`, `sonyliv_live`, `badge === 'SONY'`)
2. **Rank 2: WILLOW** (`isWillow`, `source === 'willow'`)
3. **Rank 3: FANCODE** (`isFanCode`, `source === 'fancode_live'`)
4. **Rank 4: PRIME** (`isPrimeSportsEvent`, Amazon Prime Video)
5. **Rank 5: SPORTLINK / FOOTLINKS** (`isFootlinks`, `badge === 'SPORTLINK'`)
6. **Rank 6: TIMSTREAMS** (`isTimStreams`, `tim_...`)
7. **Rank 7: LIVE M3U** (`isLiveM3u`, `livem3u_...`)
8. **Rank 8: Other Add-ons**

### 8.6 16-Source Parallel Aggregator (`loadLiveSportsSchedule`, Lines 8,543 – 9,878)
Dispatches `Promise.allSettled` across 16 streaming sources:
1. `/api/streamic/schedule`
2. `/api/sports/live-events`
3. `/api/tim/events`
4. `/api/livem3u/events`
5. `/api/live/events` (Multi-repo JTV)
6. `/api/sports/channels`
7. `/api/sports` (Admin showcase)
8. `/api/sports/highlights`
9. `/api/zee/channels`
10. `/api/fancode/live`
11. `/api/sonyliv/live`
12. `/api/sports/timstreams/channels`
13. `/api/willow/events`
14. `/api/prime/events`
15. `/api/sportlink/channels`
16. Google Sports Results

Caches populated in `sessionStorage`:
- `consumet_livenow_cache`, `consumet_fancode_cache`, `consumet_sonyliv_cache`, `consumet_willow_cache`, `consumet_prime_cache`, `consumet_tim_events_cache`, `consumet_tim_channels_cache`, `consumet_highlights_cache`, `consumet_zee_cache`.

---

## 9. Team Parsing, Dynamic Theming & SVG Logo Database

### 9.1 Team Name Parsing (`parseTeamsFromTitle`, Lines 10,030 – 10,038)
```javascript
function parseTeamsFromTitle(title) {
    if (!title || typeof title !== 'string') return null;
    const clean = title.replace(/\b(live|highlights|replay)\b/gi, '').trim();
    const parts = clean.split(/\s+(?:vs\.?|v|[-–—]|at|@)\s+/i);
    if (parts.length >= 2 && parts[0].trim() && parts[1].trim()) {
        return { team1: parts[0].trim(), team2: parts[1].trim() };
    }
    return null;
}
```

### 9.2 Initials Generator (`getTeamInitials`, Lines 10,040 – 10,050)
Strips common stop-words (`fc`, `sc`, `united`, `club`, `women`, `men`, `the`, `a`) and returns a 2–3 character uppercase monogram.

### 9.3 Dynamic Color Themes (`KNOWN_TEAM_THEMES`, Lines 10,052 – 10,073)
Defines primary/secondary gradients and text/border colors for:
- **Cricket Nations:** Australia (`#00843D`), Zimbabwe (`#D40000`), India (`#06038D`), England (`#0B1736`), Pakistan (`#01411C`), South Africa (`#007749`), New Zealand (`#1C1C1C`), Sri Lanka (`#0C2340`), Bangladesh (`#006A4E`), Afghanistan (`#1E1E1E`), West Indies (`#7B1113`), Ireland (`#009A44`), Scotland (`#005EB8`).
- **Football Clubs:** Arsenal (`#EF0107`), Chelsea (`#034694`), Liverpool (`#C8102E`), Manchester City (`#6CABDD`), Manchester United (`#DA291C`), Real Madrid (`#1E1E1E`), Barcelona (`#004D98`).
- **Fallback (`getTeamTheme`, Lines 10,135 – 10,153):** Hashes team name characters to select from 6 pre-configured gradient palettes.

### 9.4 Official Team SVG Logo Map (`KNOWN_TEAM_LOGOS`, Lines 10,075 – 10,124)
Direct Wikimedia Commons SVG logos mapped for:
- **Premier League:** Arsenal, Chelsea, Liverpool, Manchester City / Man City, Manchester United / Man Utd, Tottenham, Newcastle, Aston Villa, Nottingham Forest / Nottingham.
- **Serie A:** Bologna, Parma, Juventus, Inter, Milan.
- **La Liga:** Real Madrid, Barcelona, Atletico Madrid.
- **Bundesliga & Ligue 1:** Bayern Munich, Borussia Dortmund, PSG.
- **ICC Cricket Nations:** India, Australia, England, Pakistan, South Africa, New Zealand, Sri Lanka, Bangladesh, Afghanistan, West Indies.
- **All IPL Franchises:** CSK / Chennai, Mumbai Indians, RCB / Bangalore, KKR / Kolkata, Rajasthan, Delhi, Hyderabad, Punjab, Gujarat, Lucknow.

---

## 10. Match Center Showcase Oval Modal (`#sportsMatchOvalModal`)

Lines 10,157 – 10,800 drive the detailed match center interface:

### 10.1 Modal DOM Architecture & Header
- **Container:** `#sportsMatchOvalModal` (toggled via `handleModalOpen`).
- **Header Elements:**
  - Sport Name: `#sportsModalSportName`
  - League Badge: `#sportsModalLeagueBadge`
  - Status Badge: `#sportsModalStatusBadge` (`LIVE` in red pulse, `SOON` in amber, `UPCOMING` in zinc).
- **Stadium Oval Banner (`buildSportsModalBannerHtml`, Lines 10,157 – 10,272):**
  - Renders a horizontal $h\text{-}28 / h\text{-}32$ stadium banner (never an oversized square).
  - Ambient backdrop blur using tournament poster/thumbnail.
  - Team 1 Column: 14x14 rounded box with SVG logo or gradient monogram initials + team name.
  - Center Pillar: League badge pill, live scorecard score (`homeScore : awayScore`) with clock/status, or neon `VS` badge.
  - Team 2 Column: SVG logo or gradient monogram initials + team name.

### 10.2 Three Modal Tabs
The modal features 3 distinct views switched via `switchSportsModalTab(tabId)`:

#### Tab 1: Match Info (`#sportsModalTabInfo`)
- Displays tournament name (`#sportsModalInfoTournament`).
- Scheduled start time IST with date (`#sportsModalInfoTimeIST`).
- Current countdown/state (`#sportsModalInfoStatus`).
- Estimated match duration (`#sportsModalInfoDuration`).
- Broadcaster information (`#sportsModalInfoBroadcaster`).
- Narrative match summary box (`#sportsModalInfoSummaryContainer` & `#sportsModalInfoSummary`).

#### Tab 2: Scorecard (`#sportsModalTabScore`)
- Renders detailed telemetry via `renderSportsModalScorecard(event, event.liveScore)`.
- Invokes `refreshSportModalScorecard()` for immediate real-time score fetch.
- Maintains an active **15-second background poller** (`window._scorecardPollInterval`) while the modal is open.

#### Tab 3: Watch Feeds (`#sportsModalTabWatch`)
- Populated via `collectAllEventSources(event)` (Lines 10,387 – 10,494), gathering SportLink streams, multi-source arrays, converted channels, and broadcast channels.
- Lists all active stream sources (labeled `Primary` and `Backup #1, #2...`).
- Each card (`#cardSportSource_${idx}`) displays:
  - Source badge ($S_1, S_2...$)
  - Channel name, language, and quality resolution (`1080p FHD`).
  - Play button (`#btnPlaySource_${idx}`) invoking `playEventSourceDirect(...)`.
  - Secondary quality mirrors if multi-stream.

### 10.3 Asynchronous Stream Health Probing (`probeModalSportSources`, Lines 10,720 – 10,800)
- Sends source endpoints to `POST /api/sports/probe-sources` with a 3.5s timeout (`AbortController`).
- Evaluates HTTP reachability and ping latency.
- Updates probe badges:
  - **Online:** `<span class="bg-emerald-500/15 text-emerald-300">LIVE & ONLINE (${latencyMs}ms)</span>`
  - **Offline:** `<span class="bg-red-500/15 text-red-400">OFFLINE</span>` (card opacity reduced to 55%).
- Automatically binds `#sportsModalPrimaryPlayBtn` to the fastest verified live stream.

---

## 11. Verification Checklist & Compliance

| Requirement | Verified Lines | Audit Finding / Implementation Status |
|---|---|---|
| 8-server Theater Player cascade | Lines 7,976 – 8,042 | Implemented with `vidlink_pro`, `vidsrc_pm`, `vidsrc_to`, `vidrift`, `twoembed`, `smashystream`, `cinezo`, `filmu` with audio dubbing and auto-fallback. |
| IMDb ID external resolution | Lines 7,996 – 8,006; 8,169 – 8,189 | Implemented inline for `vidsrc_to`/`vidsrc_pm` via TMDB external IDs, plus global resolver. |
| Anti-ad sandbox & popup guard | Lines 7,637 – 7,663 | `window.open` nullified, `onbeforeunload` locked, touch swipe distance tracking active. |
| TorrServer P2P BitTorrent bridge | Lines 8,095 – 8,133 | Implemented via `openTorrentPlayer` routing to `torrent.html` and TorrServer port 8090. |
| Watch Party WebRTC/WebSocket flow | Lines 7,594 – 7,636 | `startPartyFromCurrentDetails` calls `/api/party/create` and connects via `&party=roomId`. |
| Stream navigation preservation | Lines 7,665 – 7,679; 7,784 – 7,798 | `from_tab` param and `sessionStorage.consumet_player_opened` preserved across navigation. |
| Real-time sports event expiry pruner | Lines 8,336 – 8,392 | `isSportEventEnded` checks timestamps, statuses, liveScore; runs on 30s interval. |
| Team parser & color/logo database | Lines 10,030 – 10,155 | `parseTeamsFromTitle`, `getTeamInitials`, `KNOWN_TEAM_THEMES`, `KNOWN_TEAM_LOGOS` (all IPL, soccer, ICC). |
| Match Center Showcase oval modal | Lines 10,156 – 10,800 | 3 tabs (Info, Scorecard, Watch Feeds), stadium oval banner, 15s poller, live reachability probe. |
| Preservation rule (`anime_bing.php`) | N/A | Strictly adhered to: `anime_bing.php` was NOT touched or modified. |

---
*Audit completed by Antigravity Senior Engineering Subagent.*
