# 🔍 Deep Architectural Audit Report: `consumet.html` — Micro-Slices 21 to 24 (Lines 8,936 – 10,722)

> **Auditor:** Final Check Auditor 6  
> **Target File:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html`  
> **Audited Range:** Lines 8,936 to 10,722 (1,787 lines total)  
> **Micro-Slices Covered:** Micro-Slice 21, Micro-Slice 22, Micro-Slice 23, Micro-Slice 24  
> **Comparison Benchmark:** `consumet_structure.md` (Consumet Architecture & Logic Blueprint)  
> **Report Output File:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_check_agent6.md`  
> **Safety Compliance:** STRICT ZERO-TOUCH ENFORCED — `anime_bing.php` was untouched.  

---

## Executive Summary

Micro-Slices 21 through 24 (Lines 8,936 to 10,722) constitute the operational nucleus of the **Sports Central & Glacier Sapphire Live Stadium** in `consumet.html`. This region houses the multi-provider event ingestion cascade, multi-source channel conversion, Akamai/ClearKey DRM parameter construction, stream reachability validation, team monogram & color palette synthesis, cross-source deduplication, and the 3-tab `#sportsMatchOvalModal` Match Center controller.

While `consumet_structure.md` outlines the high-level architecture of the live sports system, this granular line-by-line audit identified **numerous undocumented DOM IDs, missing global state properties, unlisted regex sanitizers, omission of multi-layer sessionStorage schemas, and unspecified CSS design patterns**.

---

## 1. Line-by-Line Micro-Slice Audits

### 1.1 Micro-Slice 21: Multi-Provider Event Ingestion & DRM Stream Normalization (Lines 8,936 – 9,382)

#### Code Scope & Logic Breakdown
1. **FanCode Stream Channel Mapping Completion (Lines 8,936–8,955)**:
   - Completes mapping of `fcSources` into `channels` and `myConvertedChannels`.
   - Assigns `matchType: 'DIRECT_MATCH'`, `reason: src.isPrimary ? 'Primary FanCode Broadcast' : 'Backup FanCode Broadcast'`, `quality: src.quality || '1080p FHD'`.
   - Embeds stream objects: `streams: [{ quality: src.quality || '1080p', embedUrl: src.playUrl }]`.

2. **Amazon Prime Video Live Sports Ingestion (Lines 8,957–9,015)**:
   - Iterates over `window.primeLiveMatches`.
   - Constructs ClearKey DRM player URL:
     ```javascript
     const pvPlay = pv.playUrl || (pvStream ? `/play_consumet.php?channel_id=${encodeURIComponent(pv.id || 'prime')}&name=${encodeURIComponent(pvTitle)}&url=${encodeURIComponent(pvStream)}&key_id=${encodeURIComponent(pv.keyId || '')}&key=${encodeURIComponent(pv.key || '')}&clearkey=${encodeURIComponent(pv.clearkey || '')}&source=prime&type=dash` : '#');
     ```
   - Sanitizes league to avoid redundant branding: `(pv.league && !/amazon\s*prime/i.test(pv.league)) ? pv.league : `${pvSport} Live``.
   - Enforces default 4-hour sports broadcast window (`durationMinutes: 240`, `endTime = startTime + 14400`).
   - Flags: `source: 'prime'`, `isPrime: true`, `badge: 'PRIME'`.

3. **SportLink TV / Footlinks Multi-Stream Parser (Lines 9,017–9,107)**:
   - Ingests from `timEventsRes.value?.footlinksEvents` with fallback to `window.footlinksLiveMatches`.
   - De-duplicates via Set key: `${fl.id || ''} ${flTitle}`.
   - Cleans redundant title repeats (e.g., "Arsenal vs Arsenal" -> "Arsenal"):
     ```javascript
     const dupMatch = flTitle.match(/^([a-z0-9\s]+?)\s+(?:vs\.?|v)\s+([a-z0-9\s]+)$/i);
     if (dupMatch && dupMatch[1].trim().toLowerCase() === dupMatch[2].trim().toLowerCase()) {
         flTitle = dupMatch[1].trim();
     }
     ```
   - Resolves category emojis:
     - Motor / F1 / Formula $\rightarrow$ `🏎️`
     - Football / Soccer $\rightarrow$ `⚽`
     - Cricket $\rightarrow$ `🏏`
     - Basketball $\rightarrow$ `🏀`
     - Tennis $\rightarrow$ `🎾`
     - Combat / UFC / Fight / MMA / WWE $\rightarrow$ `🥊`
     - Default $\rightarrow$ `🏆`
   - Handles multi-server stream arrays (`flStreams`) and generates `channels` and `myConvertedChannels` with `reason: 'Footlinks Multi-Stream'`.
   - Flags: `source: 'footlinks'`, `isFootlinks: true`, `badge: 'SPORTLINK'`.

4. **Streamic Sports Merger (Lines 9,109–9,111)**:
   - Ingests `streamicRes.value.events` into `allEvents`.

5. **TimStreams Events Real-Time Schedule Store (Lines 9,113–9,200)**:
   - Initializes `window.timStreamsEvents = []`.
   - Excludes static 24/7 channels or placeholder strings:
     ```javascript
     if (/\(live\s*sports\)/i.test(evTitleCheck) || String(ev.category || '').toLowerCase() === '24/7') return;
     ```
   - Extracts slug: `ev.streams[0].embedSlug || ev.streams[0].url.replace(/^https?:\/\/[^\/]+\//, '')` with fallback to `ev.url` or `event_${idx}`.
   - Live state determination with -15 minute margin:
     ```javascript
     const parsedMs = new Date(ev.time.includes('Z') ? ev.time : ev.time + 'Z').getTime();
     const elapsedHrs = (Date.now() - parsedMs) / (3600 * 1000);
     if (elapsedHrs < -0.25) { evIsLive = false; evStatus = 'UPCOMING'; }
     ```
   - Normalizes HTML entities in `ev.logo` (`&amp;` $\rightarrow$ `&`) and prefixes relative URLs with `https://timstreams.co.rw`.
   - Default thumbnail: `https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80`.

6. **Dedicated Live.m3u Events Store (Lines 9,202–9,266)**:
   - Ingests `liveM3uEventsRes.value.events`.
   - Architectural Guarantee: Live.m3u feeds are treated as independent 24-hour linear channels (`durationMinutes: 1440`, `badge: 'LIVE.M3U'`, `isLiveM3u: true`), **NOT** collapsed as backup streams.
   - Fallback thumbnail: `https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80`.

7. **Multi-Repo Live Sports Events Merger (`jtvEventsRes`) (Lines 9,268–9,382)**:
   - Drops non-http/https streams.
   - Drops Widevine MPD streams that lack ClearKey credentials:
     ```javascript
     if (ev.stream_url.includes('.mpd') && !ev.clearkey && (!ev.key_id || ev.key_id === 'null' || (ev.key_id + '').length < 16)) return;
     ```
   - Drops dummy/placeholder matches using a 20+ keyword regex:
     ```javascript
     /(namibia\s*v(?:s\.?)?\s*zimbabwe|zimbabwe\s*v(?:s\.?)?\s*namibia|4248459|cricbuzz\s*-\s*aq|stream\.kliv\.in|asian\s*games|pak\s*vs\s*ind|tnpl|crichd\s*channel|placeholder|testtapmad|crichd|1st\s*test\s*australia|caribbean\s*premier\s*league|the\s*hundred\s*2026|5th\s*odi\s*afghanistan|sports\s*live\s*vs\s*sports\s*live|playerado|crichdsee|player0003|cricgo|demo|dummy|sample|offline|expired)/i
     ```
   - Skips FanCode streams if official FanCode matches are already loaded.
   - Enforces upcoming schedule status via `normalizeMatchVsPairKey`.
   - Routes player stream URLs:
     - ClearKey: `/play_consumet.php?event_id=...&clearkey=...&type=${evType}`.
     - FanCode reverse proxy: `https://proxy-web-sage.vercel.app/api/live-proxy?url=...`.
     - Sony reverse proxy: Replaces `sonydaimenew.akamaized.net` with `sonymtmnew.akamaized.net`, routes through `/stream_proxy.php?url=...`.
     - Stream types: `.mpd` $\rightarrow$ `dash`, `.ts`/`custom_ts=1`/`.mkv` $\rightarrow$ `mpegts`, else $\rightarrow$ `hls`.

---

### 1.2 Micro-Slice 22: Added Channels, Deduplication & Priority Sorting (Lines 9,383 – 9,829)

#### Code Scope & Logic Breakdown
1. **Added Channels Merger (Lines 9,396–9,506)**:
   - Ingests from `addedChannelsRes.value` (`assets/channels.json` + MDTV ClearKey + Custom M3U).
   - Strict filter: `isWorldClassSpecialChannel(ch)` or genre containing `sport`, `cricket`, `football`, `racing`.
   - Detects MDTV ClearKey: `isMdtv = ch.source === 'mdtv' || ch.channel_id.startsWith('mdtv-') || !!ch.drm`.
   - Constructs ClearKey DRM player URL with `key_id` and `key` for MDTV feeds.
   - Maps category to `cricket`, `football`, `f1`, `combat`, `tennis`, `basketball`, or `'added'`.
   - Sets flags: `isAddedChannel: true`, `isAddon: true`, `isMdtv: isMdtv`, `addonType: isMdtv ? 'mdtv' : (ch.source === 'm3u_converter' ? 'm3u' : 'custom')`, `source: isMdtv ? 'MDTV_CLEARKEY' : (ch.source || 'ADDED_ON')`.

2. **World-Class TimStreams 24/7 Channels Merger (Lines 9,508–9,578)**:
   - Filters via `isWorldClassSpecialChannel(tc)`.
   - ID: `evKey = addon_tim_${cleanId}`.
   - Stream: `tc.stream_url || tc.url || /api/play_stream/tim_${tc.url || cleanId}`.
   - Fallback thumbnail: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/tv.svg`.
   - Flags: `isSpecialChannel: true`, `isMdtv: true`, `source: 'TIMSTREAMS_SPECIAL'`.

3. **Admin Sports Showcase Streams (Lines 9,582–9,660)**:
   - Ingests `/api/sports` (`adminSportsRes.value`).
   - Filters out placeholder and dummy test matches.
   - ID: `evKey = addon_admin_${spKey}`.
   - Flags: `addonType: 'showcase'`, `source: 'ADMIN_SHOWCASE'`.

4. **Live Now Added Channels Count Badge (Lines 9,662–9,665)**:
   - Updates DOM element `#liveNowAddedCountBadge` with `addedChannelsCount`.

5. **Universal Live Event Validation & Pruning Filter (Lines 9,667–9,694)**:
   - Re-filters `window.liveNowEvents = allEvents.filter(...)`.
   - Checks:
     - `!e || isSportEventEnded(e)`.
     - Full dummy string exclusion regex across title, rawTitle, primaryM3u8Url, primaryPlayUrl, and id.
     - Four-tier stream existence check:
       1. `hasDirectPlayUrl`: `e.primaryPlayUrl && e.primaryPlayUrl !== '#' && !e.primaryPlayUrl.includes('undefined')`.
       2. `hasM3u8Url`: `e.primaryM3u8Url && (startsWith('http') || startsWith('/'))`.
       3. `hasChannelStream`: `channels.some(c => (playUrl || m3u8Url || userChannelUrl) && userHasChannel !== false)`.
       4. `hasConvertedStream`: `myConvertedChannels.some(c => playUrl || m3u8Url || url)`.
     - Drops events where `canWatch === false` or `primaryChannelName === 'No Broadcast Available'` unless an alternate stream exists.

6. **Cross-Source Match Deduplication Engine (`normalizeLiveMatchDedupKey`) (Lines 9,696–9,727)**:
   - Generates unique grouping key:
     - Live.m3u: `livem3u_standalone_${ev.id || ev.title}_${ev.primaryM3u8Url || ''}` (guarantees standalone placement).
     - Linear TV / Addons / MDTV: `linear_${(ev.id || ev.title || '').toLowerCase()}`.
     - Non-Sony / Non-FanCode: `standalone_${ev.source || 'ev'}_${ev.id || ev.title}`.
     - SonyLIV & FanCode: Strips brackets and noise keywords (`live`, `hd`, `fhd`, `uhd`, `4k`, `1080p`, `720p`, `stream`, `match`, `sonyliv`, `fancode`, `willow`, `cricbuzz`, `crichd`, `english`, `hindi`, `tamil`, `telugu`, `ad-free`, `feed`), extracts team names via regex `/([a-z0-9\s]+?)\s+(?:vs|v)\s+([a-z0-9\s]+)/i`, sorts alphabetically, and formats as `${providerPrefix}_vs_${pair[0]}_${pair[1]}`.

7. **Upcoming Schedule Normalization (Lines 9,729–9,746)**:
   - Any match in `upcomingSchedulePairs` but not in `liveSchedulePairs`, or where `isEventFutureDate(ev)` is true, has its `isLive`, `isLatestWillow`, and `isLatestLiveEvent` set to `false`, `status` set to `'UPCOMING'`, and converts any `'LIVE'` string in `timeIST` and `countdown` to the official start time.

8. **Strict Source Hierarchy Ordering (Lines 9,748–9,755)**:
   - Priority sort order:
     $$\text{SONY (1)} \rightarrow \text{WILLOW (2)} \rightarrow \text{FANCODE (3)} \rightarrow \text{PRIME (4)} \rightarrow \text{TIMSTREAMS (5)} \rightarrow \text{LIVE.M3U (6)}$$
   - Secondary sort: `isLive` first (`a.isLive ? -1 : 1`).
   - Tertiary sort: `startTime` ascending.

9. **Deduplication Map Merger (Lines 9,757–9,816)**:
   - Iterates `window.liveNowEvents` through `dedupedEventsMap`.
   - Merges backup feeds from duplicate matches into `existing.sources`, `existing.myConvertedChannels`, and `existing.channels`.
   - Renames backup feeds: `${src.sourceName || 'Backup Stream'} (Source ${existing.sources.length})` with `isPrimary: false`.

10. **Live Status Indicators & Fetch Timestamp (Lines 9,818–9,829)**:
    - DOM element `#liveNowLiveCountText`: `${liveCount} LIVE` or `'LIVE SPORTS'`.
    - DOM element `#sportsLiveNowActiveBadge`: `${liveCount} LIVE`.
    - Sets `_lastSportsScheduleFetch = Date.now()` and mirrors to `window._lastSportsScheduleFetch`.

---

### 1.3 Micro-Slice 23: Fast-Boot Caching, Filters, Team Monograms & Banners (Lines 9,830 – 10,276)

#### Code Scope & Logic Breakdown
1. **Multi-Source Fast-Boot SessionStorage Caching (Lines 9,830–9,857)**:
   - `consumet_livenow_cache`: Caches top 600 events (`window.liveNowEvents.slice(0, 600)`).
   - `consumet_fancode_cache`: Caches `window.fancodeLiveMatches`.
   - `consumet_sonyliv_cache`: Caches `{ live: window.sonylivLiveMatches, upcoming: window.sonylivUpcomingMatches || [] }`.
   - `consumet_willow_cache`: Caches `window.willowLiveMatches`.
   - `consumet_prime_cache`: Caches `window.primeLiveMatches`.
   - `consumet_tim_events_cache`: Caches `window.timStreamsEvents`.
   - `consumet_tim_channels_cache`: Caches `window.timStreamsList`.
   - `consumet_highlights_cache`: Caches `window.sportsHighlights`.
   - `consumet_zee_cache`: Caches `window.zeeChannels`.

2. **Render Scheduling & Pre-Warming (Lines 9,858–9,878)**:
   - Triggers `requestAnimationFrame(() => { renderLiveNowGrid(); renderLiveNowShelf(); })`.
   - In `finally`: clears spinning icon (`icon.classList.remove('animate-spin')`), sets `window.liveNowLoading = false`, and fires `prewarmLiveSportsSources(window.liveNowEvents)` after a 600ms delay.

3. **Status Filter Buttons (`setLiveNowStatusFilter`) (Lines 9,880–9,899)**:
   - Manages state `window.liveNowActiveStatus` (`'live'` | `'starting'` | `'all'`).
   - Toggles CSS classes on:
     - `#livenow-status-live`: Active `bg-white text-black font-bold`; Inactive `bg-zinc-900 text-zinc-400 border border-white/10`.
     - `#livenow-status-starting`: Active `bg-white text-black font-bold`; Inactive `bg-zinc-900 text-zinc-400 border border-white/10`.
     - `#livenow-sport-all`: Cleared when a status button is activated.

4. **Sport Category Filter Pills (`setLiveNowSportCategory`) (Lines 9,901–9,921)**:
   - Manages state `window.liveNowActiveSport`.
   - Resets status filter to `'all'` when sport `'all'` is selected.
   - Sports array: `['all', 'added', 'football', 'cricket', 'f1', 'tennis', 'combat', 'basketball', 'nfl', 'baseball']`.
   - DOM element format: `#livenow-sport-${s}`.
   - Active: `bg-white text-black font-semibold`.
   - Inactive: `bg-[#14141b] text-neutral-300 border border-white/[0.08] hover:border-white/25 hover:text-white`.

5. **Debounced Grid Filter (`filterLiveNowGrid`) (Lines 9,923–9,929)**:
   - 150ms timeout debounce (`_liveNowFilterTimeout`) before invoking `renderLiveNowGrid()`.

6. **Unified Sports Event Filter Engine (`getFilteredLiveNowEvents`) (Lines 9,931–10,027)**:
   - Re-filters out ended matches via `isSportEventEnded(e)`.
   - Query input `#liveNowSearch`: toggles clear button `#liveNowSearchClear` (`hidden` class).
   - Source filters (`window.liveNowActiveSource`):
     - `'sony'`, `'willow'`, `'fancode'`, `'sportlink'`, `'prime'`, `'tim'`/`'timstreams'`, `'livem3u'`, `'added'`, `'mdtv'`, `'fixtures'`, `'containers'`.
   - Multi-lingual `SPORT_KEYWORD_MAP`:
     - `cricket`: includes 'krykiet', 'ipl', 't20', 'odi', 'test match', 'willow', 'bcci', 'icc', 'astro cricket', 'star sports', 'starsports', 'sony ten 3', 'sony ten 4', 'sony six', 'ind vs', 'india vs', 'pak vs', 'aus vs', 'eng vs', 'sa vs', 'nz vs', 'wi vs', 'cpl', 'psl', 'bbl', 'ranji', 'smat', 'champions trophy', 'world championship of legends', 'abu dhabi', 'emirates blues', 'australia champions', 'pakistan champions', 'bangladesh champions', 'england champions'.
     - `football`: includes 'football', 'soccer', 'pilkanozna', 'laliga', 'premier league', 'serie a', 'bundesliga', 'uefa', 'champions league', 'chelsea', 'arsenal', 'liverpool', 'madrid', 'barca', 'epl', 'sportdigital', 'fa cup'.
     - `f1`: includes 'f1', 'formula', 'motorsport', 'motogp', 'nascar', 'racing', 'indycar', 'rally', 'dazn f1'.
     - `tennis`: includes 'tennis', 'tenis', 'wta', 'atp', 'wimbledon', 'us open', 'roland garros', 'french open', 'australian open', 'tennis channel'.
     - `combat`: includes 'combat', 'mma', 'ufc', 'boxing', 'wwe', 'smackdown', 'raw', 'nxt', 'fight', 'boxe'.
     - `basketball`: includes 'basketball', 'koszykowka', 'nba', 'euroleague'.
     - `nfl`: includes 'nfl', 'american football', 'futbolamerykanski', 'super bowl', 'redzone'.
     - `baseball`: includes 'baseball', 'mlb'.
   - Free text search matches against: `title`, `league`, `sportName`, `channels[].channelName`, and `myConvertedChannels[].channelName`.
   - Re-sorts output by source rank, live status, and start time.

7. **Universal Team Parsing & Monograms (Lines 10,029–10,050)**:
   - `parseTeamsFromTitle(title)`:
     - Strips `live`, `highlights`, `replay`.
     - Splits on: `/\s+(?:vs\.?|v|[-–—]|at|@)\s+/i`.
     - Returns `{ team1, team2 }` if both parts exist.
   - `getTeamInitials(name)`:
     - Filters stop words: `fc`, `sc`, `united`, `club`, `women`, `men`, `the`, `a`.
     - Returns 3-letter capital monogram (e.g. "ARS", "MCI", "CSK", "RCB").

8. **Curated Color Palettes (`KNOWN_TEAM_THEMES`) & SVG Logos (`KNOWN_TEAM_LOGOS`) (Lines 10,052–10,153)**:
   - `KNOWN_TEAM_THEMES`: Hex tokens (`from`, `to`, `text`, `border`) for 20 world teams (Australia, Zimbabwe, India, England, Pakistan, South Africa, New Zealand, Sri Lanka, Bangladesh, Afghanistan, West Indies, Ireland, Scotland, Arsenal, Chelsea, Liverpool, Manchester City, Manchester United, Real Madrid, Barcelona).
   - `KNOWN_TEAM_LOGOS`: Direct Wikimedia SVG paths for 24 football/cricket clubs/boards + 10 IPL franchises.
   - `getKnownTeamLogo(name)`: Substring match lookup.
   - `getTeamTheme(name)`: Known theme lookup with string-hash fallback to 6 stadium gradients:
     - `#1E3A8A` / `#0F172A` / `#60A5FA` (Blue)
     - `#991B1B` / `#450A0A` / `#F87171` (Red)
     - `#065F46` / `#022C22` / `#34D399` (Emerald)
     - `#854D0E` / `#451A03` / `#FBBF24` (Amber)
     - `#581C87` / `#2E1065` / `#C084FC` (Purple)
     - `#0F766E` / `#134E4A` / `#2DD4BF` (Teal)

9. **Horizontal Stadium Header Builder (`buildSportsModalBannerHtml`) (Lines 10,156–10,272)**:
   - Sleek horizontal stadium header: `h-28 sm:h-32 rounded-2xl` (avoids oversized square viewports).
   - Team 1 & Team 2 columns with `w-12 h-12 sm:w-14 sm:h-14 rounded-2xl` logo badge or monogram fallback.
   - Center Pillar: League badge, live score readout (`homeScore : awayScore`) with font-mono amber drop shadow, or `VS` badge with scheduled IST time.
   - Single-event / channel fallback layout with blurred backdrop, 14x14/16x16 icon, league badge, and title.

---

### 1.4 Micro-Slice 24: Thumbnails, Modal Controller & Probe Initiation (Lines 10,277 – 10,722)

#### Code Scope & Logic Breakdown
1. **Universal 4-Tier Match Thumbnail Builder (`buildVsMatchThumbnailHtml`) (Lines 10,275–10,367)**:
   - Priority 1: Official Broadcast Match Poster:
     - Checks `e.thumbnail || e.poster || e.image || e.bgUrl || e.backdrop`.
     - Excludes 6 generic placeholder patterns:
       `unique-tournament`, `FC_Sports_Default`, `ui-avatars.com`, `default_sports`, `stalker_pro_infinity`, `/assets/logos/`.
     - Renders blurred backdrop (`blur-xl opacity-35 scale-125`) + foreground cover.
   - Priority 2: 2-Team Matchup (When no official broadcast poster is available):
     - Side-by-side circular shields (`rounded-full`) with central `VS` badge (`text-sky-300`).
     - Responsive sizes: Hero uses `w-14 h-14 sm:w-16 sm:h-16`; Cards use `w-11 h-11 sm:w-12 sm:h-12`.
   - Priority 3: Live TV Channel / Addon / 24x7 Broadcast:
     - `w-16 h-16 sm:w-20 sm:h-20 rounded-2xl` with channel logo or `ui-avatars.com` fallback.
     - Badge: `bg-rose-500/10 border-rose-500/20 text-rose-300`.
   - Priority 4: Default Stadium Poster:
     - Unsplash stadium photo `photo-1508098682722-e99c43a406b2`.

2. **Global State & Clipboard Utility (Lines 10,370–10,384)**:
   - `window.currentSportModalEvent = null`.
   - `window.copyM3uStreamUrl = function(url)`:
     - Normalizes relative URLs: `window.location.origin + finalUrl`.
     - Invokes `navigator.clipboard.writeText(finalUrl)`.
     - Fires `showToast('Stream / M3U URL copied to clipboard!')`.

3. **Unified Multi-Layer Source Aggregator (`collectAllEventSources`) (Lines 10,387–10,494)**:
   - Aggregates and deduplicates all stream sources for an event into `allSources`:
     - Layer 0: `event.streams` (SportLink / Footlinks server feeds) $\rightarrow$ constructs `play_consumet.php` with ClearKey `key_id`, `key`, and DASH/HLS type.
     - Layer 1: `event.sources` (Explicit multi-source array from SonyLIV, FanCode, JTV).
     - Layer 2: `event.myConvertedChannels` (Converted M3U channels).
     - Layer 3: `event.channels` (Direct broadcast channels, rewrites generic "Prime" names to `${event.title} (Live Feed)`).
     - Layer 4: `event.primaryPlayUrl` (Fallback if no array entries existed).
   - Deduplication key: `${playUrl}||${streamUrl}||${sourceName.toLowerCase()}`.
   - Drops null/unavailable strings: `/^(unavailable|null|undefined)$/i`.
   - Output schema:
     ```typescript
     interface PreservedEventSource {
         sourceId: string;
         sourceName: string;
         language: string;
         isEnglish: boolean;
         streamUrl: string;
         m3uUrl: string;
         playUrl: string;
         isPrimary: boolean;
         quality: string;
         badge: string;
         streams: any[];
     }
     ```

4. **Oval Match Showcase Modal Controller (`openSportMatchOvalModal`) (Lines 10,496–10,718)**:
   - Swipe guard: `if (Date.now() - (window._lastSwipeTimestamp || 0) < 350) return`.
   - Combined event pool search across: `window.liveNowEvents`, `window.lastFilteredLiveEvents`, `window.sportlinkAllChannels`, and `window.footlinksLiveMatches`.
   - Sets `window.currentSportModalEvent = event`.
   - Populates DOM elements:
     - `#sportsMatchOvalModal`: root modal container.
     - `#sportsModalSportName`: sport title.
     - `#sportsModalSportEmoji`: cleaned for broadcast aesthetic.
     - `#sportsModalStatusBadge`: LIVE (red pulsing dot) / SOON (amber) / UPCOMING (zinc).
     - `#sportsModalLeagueBadge`: tournament / championship title.
     - `#sportsModalVsBanner`: rendered via `buildSportsModalBannerHtml(event)`.
     - Stores `event._allPreservedSources = displayChannels`.
   - Tab 1: Match Info:
     - `#sportsModalInfoTournament`
     - `#sportsModalInfoTimeIST`
     - `#sportsModalInfoStatus`
     - `#sportsModalInfoDuration`
     - `#sportsModalInfoBroadcaster`
     - `#sportsModalInfoSummary`
     - `#sportsModalInfoSummaryContainer`
   - Tab 2: Scorecard:
     - Invokes `window.renderSportsModalScorecard(event, event.liveScore)`.
     - Invokes `window.refreshSportModalScorecard()`.
     - Initiates 15-second background poller `window._scorecardPollInterval` (cleared when modal closes).
   - Tab 3: Watch Feeds:
     - `#sportsModalChannelsList`
     - `#sportsModalTabWatchText`: updates with count `Watch Sources (${displayChannels.length})`.
     - Probing indicators: checks `window._sportsProbeCache` (90s TTL) for each source.
     - Dynamic badges:
       - Online: `LIVE & ONLINE (${cached.latencyMs || 45}ms)`.
       - Pending: `Checking live...`.
     - Card container: `#cardSportSource_${idx}`.
     - Play button: `#btnPlaySource_${idx}` calling `playEventSourceDirect(...)`.
     - Multi-mirror sub-buttons: renders individual quality buttons.
     - Fallback UI: Renders satellite dish icon with direct link to Scorecard tab if no feeds exist.
   - Primary Stream Button:
     - `#sportsModalPrimaryPlayBtn`: wired to `playEventSourceDirect(event.id, event.primaryPlayUrl, 'livenow')`.
   - Tab switching: `switchSportsModalTab(initialTab)`.
   - Modal lifecycle: `handleModalOpen(modal)` or `modal.classList.remove('hidden')`, followed by `triggerLucide()`.

5. **Stream Reachability Prober Declaration (`probeModalSportSources`) (Lines 10,720–10,722)**:
   - Boundary ends at initialization of `window._sportsProbeCache = window._sportsProbeCache || new Map()`.

---

## 2. Master Gap Analysis: `consumet.html` vs. `consumet_structure.md`

The following tables document all variables, functions, DOM IDs, CSS classes, algorithms, and storage keys discovered in Lines 8,936 to 10,722 that are **missing, incomplete, or underspecified** in `consumet_structure.md`.

### 2.1 Missing Variables & Global State Properties

| Variable / State Property | Type | Discovered In Lines | Architectural Role | Status in `consumet_structure.md` |
|---|---|---|---|---|
| `window.footlinksLiveMatches` | `any[]` | 9,020, 10,498 | Fallback array of SportLink multi-stream matches | Mentioned in schema, but usage in `collectAllEventSources` & `openSportMatchOvalModal` omitted |
| `window.timStreamsEvents` | `any[]` | 9,114, 9,845 | Dedicated array of real-time TimStreams events | Listed in window state, but -15m threshold and exclusion filter omitted |
| `window.liveM3uEvents` | `any[]` | 9,203, 9,260 | Dedicated array of 24/7 Live.m3u feeds | **Missing** from global state schema in Section 4.1 |
| `window.liveNowActiveStatus` | `string` | 9,881, 9,970 | Status filter state (`'all'`, `'live'`, `'starting'`) | **Missing** from Section 4.1 |
| `window.liveNowActiveSport` | `string` | 9,902, 9,976 | Active sport category filter (`'cricket'`, `'f1'`, etc.) | **Missing** from Section 4.1 |
| `window.liveNowActiveSource` | `string` | 9,944–9,968 | Source selector filter (`'sony'`, `'fancode'`, `'sportlink'`, `'prime'`, `'tim'`, `'livem3u'`, `'added'`, `'mdtv'`, `'fixtures'`, `'containers'`) | **Missing** from Section 4.1 |
| `_liveNowFilterTimeout` | `Timeout` | 9,923–9,926 | 150ms debounce timer for live grid re-filtering | **Missing** from Section 4.1 |
| `window._lastSportsScheduleFetch` | `number` | 9,827–9,828 | Epoch timestamp of last live sports API fetch | **Missing** from Section 4.1 |
| `window._scorecardPollInterval` | `Interval` | 10,584–10,595 | 15-second timer interval for live scorecard polling | Mentioned in text, but missing in Section 4.1 window state table |
| `window._sportsProbeCache` | `Map` | 10,606, 10,722 | In-memory cache for live feed ping latencies (90s TTL) | Mentioned in 6.14, but missing in Section 4.1 window state table |
| `event._allPreservedSources` | `PreservedEventSource[]` | 10,536–10,537 | Preserved array of all primary + backup streams on active event | **Missing** from event model specification |

---

### 2.2 Missing Functions & Helper Utilities

| Function Signature | Location | Purpose & Logic | Status in `consumet_structure.md` |
|---|---|---|---|
| `setLiveNowStatusFilter(status)` | Lines 9,880–9,899 | Toggles `'live'` vs `'starting'` filter buttons and re-renders grid | **Missing** from Section 6 and Screen Hierarchy |
| `setLiveNowSportCategory(sport)` | Lines 9,901–9,921 | Toggles active sport pill and filters catalog | **Missing** from Section 6 |
| `filterLiveNowGrid()` | Lines 9,923–9,929 | 150ms debounced runner for `renderLiveNowGrid()` | **Missing** from Section 6 |
| `getFilteredLiveNowEvents()` | Lines 9,931–10,027 | Multi-criteria filter engine applying source, status, sport keywords, and search string | **Missing** from Section 6 |
| `parseTeamsFromTitle(title)` | Lines 10,030–10,038 | Extracts home and away teams using regex `/\s+(?:vs\.?|v|[-–—]|at|@)\s+/i` | Summarized in 6.13, but regex and dash variants omitted |
| `getTeamInitials(name)` | Lines 10,040–10,050 | Generates 3-letter uppercase initials filtering out 8 stopwords | Summarized in 6.13, stopwords omitted |
| `getKnownTeamLogo(name)` | Lines 10,126–10,133 | Substring match against `KNOWN_TEAM_LOGOS` | Summarized in 6.13, bidirectional match omitted |
| `getTeamTheme(name)` | Lines 10,135–10,153 | Resolves colors from `KNOWN_TEAM_THEMES` or string hash to 6 stadium hues | Mentioned in 6.13, 6-hue palette definitions omitted |
| `buildSportsModalBannerHtml(event)` | Lines 10,157–10,272 | Renders horizontal stadium showcase header with scores and logos | Mentioned in 3.1, complete DOM/CSS layout omitted |
| `buildVsMatchThumbnailHtml(e, isHero)` | Lines 10,275–10,367 | 4-tier match thumbnail builder (Official Poster $\rightarrow$ 2-Team Monogram $\rightarrow$ Addon Channel $\rightarrow$ Stadium Fallback) | Mentioned in 6.24, 4-tier hierarchy omitted |
| `window.copyM3uStreamUrl(url)` | Lines 10,373–10,384 | Copies stream URL with absolute origin normalization and toast alert | **Missing** from Section 4.1 & Section 6 |
| `collectAllEventSources(event)` | Lines 10,387–10,494 | Aggregates 5 distinct source layers into unified deduplicated source array | Summarized in 6.1, 5-layer ingestion logic omitted |
| `openSportMatchOvalModal(eventId, initialTab)` | Lines 10,496–10,718 | Opens 3-tab Match Center modal with swipe guard and poller initiation | Summarized in 3.1, swipe guard & sub-mirrors omitted |

---

### 2.3 Missing DOM Elements & IDs

| DOM Element ID | HTML Tag | Role / Context | Status in `consumet_structure.md` |
|---|---|---|---|
| `liveNowAddedCountBadge` | `<span>` | Displays count of added / custom channels (`addedChannelsCount`) | **Missing** from Section 2.7 |
| `liveNowLiveCountText` | `<span>` | Displays active live event count in live stadium header | **Missing** from Section 2.7 |
| `sportsLiveNowActiveBadge` | `<span>` | Displays active live count badge on sports page | **Missing** from Section 2.5 |
| `livenow-status-live` | `<button>` | Toggles live filter pill | **Missing** from Section 2.7 |
| `livenow-status-starting` | `<button>` | Toggles starting soon filter pill | **Missing** from Section 2.7 |
| `livenow-sport-all` | `<button>` | Toggles all sports filter pill | **Missing** from Section 2.7 |
| `livenow-sport-${s}` | `<button>` | Sport category filter pills (`added`, `football`, `cricket`, `f1`, `tennis`, `combat`, `basketball`, `nfl`, `baseball`) | **Missing** from Section 2.7 |
| `liveNowSearch` | `<input>` | Search input inside live stadium | **Missing** from Section 2.7 |
| `liveNowSearchClear` | `<button>` | Clear button for live stadium search input | **Missing** from Section 2.7 |
| `sportsMatchOvalModal` | `<div>` | Root modal for Match Center showcase | Listed in Section 3, but child elements incomplete |
| `sportsModalSportName` | `<span>` | Displays sport name in modal header | **Missing** from Section 3 |
| `sportsModalSportEmoji` | `<span>` | Displays sport emoji in modal header | **Missing** from Section 3 |
| `sportsModalStatusBadge` | `<div>` | Dynamic status badge (LIVE pulse, SOON, UPCOMING) | **Missing** from Section 3 |
| `sportsModalLeagueBadge` | `<span>` | Displays tournament / league badge in modal header | **Missing** from Section 3 |
| `sportsModalVsBanner` | `<div>` | Container for horizontal stadium showcase banner | **Missing** from Section 3 |
| `sportsModalInfoTournament` | `<span>` | Tab 1: Tournament name field | **Missing** from Section 3 |
| `sportsModalInfoTimeIST` | `<span>` | Tab 1: IST match timing and date field | **Missing** from Section 3 |
| `sportsModalInfoStatus` | `<span>` | Tab 1: Match countdown / situation field | **Missing** from Section 3 |
| `sportsModalInfoDuration` | `<span>` | Tab 1: Event duration field | **Missing** from Section 3 |
| `sportsModalInfoBroadcaster` | `<span>` | Tab 1: Broadcaster / stream source count field | **Missing** from Section 3 |
| `sportsModalInfoSummary` | `<div>` | Tab 1: Situation summary / commentary text | **Missing** from Section 3 |
| `sportsModalInfoSummaryContainer` | `<div>` | Tab 1: Container box for situation summary | **Missing** from Section 3 |
| `sportsModalTabScoreIcon` | `<i>` | Tab 2: Scorecard tab icon element | **Missing** from Section 3 |
| `sportsModalChannelsList` | `<div>` | Tab 3: Container for stream sources and reachability cards | **Missing** from Section 3 |
| `sportsModalTabWatchText` | `<span>` | Tab 3: Tab title displaying source count badge | **Missing** from Section 3 |
| `sourcesProbeStatusText` | `<span>` | Tab 3: Real-time reachability status header (`X/Y feeds verified online`) | **Missing** from Section 3 |
| `sourceLiveBadge_${idx}` | `<span>` | Tab 3: Live ping badge per stream source card | **Missing** from Section 3 |
| `cardSportSource_${idx}` | `<div>` | Tab 3: Individual stream feed card container | **Missing** from Section 3 |
| `btnPlaySource_${idx}` | `<button>` | Tab 3: Play button per stream source card | **Missing** from Section 3 |
| `sportsModalPrimaryPlayBtn` | `<button>` | Modal footer: Quick primary feed launch button | **Missing** from Section 3 |

---

### 2.4 Missing SessionStorage Keys & Schemas

Section 4.3 of `consumet_structure.md` only documents a fraction of the fast-boot session storage keys used in these micro-slices:

| SessionStorage Key | Data Type | Payload Schema | Omission in `consumet_structure.md` |
|---|---|---|---|
| `consumet_livenow_cache` | `JSON Array` | First 600 events from `window.liveNowEvents` | Documented, but slice limit (600) omitted |
| `consumet_sonyliv_cache` | `JSON Object` | `{ live: window.sonylivLiveMatches, upcoming: window.sonylivUpcomingMatches }` | Underspecified (schema `{ live, upcoming }` not documented) |
| `consumet_willow_cache` | `JSON Array` | `window.willowLiveMatches` | **Missing** from Section 4.3 |
| `consumet_prime_cache` | `JSON Array` | `window.primeLiveMatches` | **Missing** from Section 4.3 |
| `consumet_tim_events_cache` | `JSON Array` | `window.timStreamsEvents` | **Missing** from Section 4.3 |
| `consumet_tim_channels_cache` | `JSON Array` | `window.timStreamsList` | **Missing** from Section 4.3 |
| `consumet_highlights_cache` | `JSON Array` | `window.sportsHighlights` | **Missing** from Section 4.3 |
| `consumet_zee_cache` | `JSON Array` | `window.zeeChannels` | **Missing** from Section 4.3 |

---

### 2.5 Undocumented Algorithms, Edge Cases & Regexes

1. **Self-Duplicate Title Regex Sanitizer (Line 9,025)**:
   - Regex: `/^([a-z0-9\s]+?)\s+(?:vs\.?|v)\s+([a-z0-9\s]+)$/i`
   - Purpose: If team 1 and team 2 strings match exactly, strips the "vs" and collapses to single team name. Completely missing from documentation.

2. **TimStreams Real-Time Airing Threshold (Line 9,141)**:
   - Formula:
     $$\Delta t_{\text{hours}} = \frac{\text{Date.now()} - \text{parsedMs}}{3600 \times 1000}$$
   - Condition: If $\Delta t_{\text{hours}} < -0.25$ (-15 minutes), event is demoted to `isLive = false`, `status = 'UPCOMING'`. Omitted from documentation.

3. **Widevine-without-ClearKey DRM Rejection Filter (Line 9,274)**:
   - Condition: `ev.stream_url.includes('.mpd') && !ev.clearkey && (!ev.key_id || ev.key_id === 'null' || (ev.key_id + '').length < 16)`.
   - Protects downstream video player from unplayable Widevine DRM streams in the browser. Omitted from documentation.

4. **Multi-Source Match Deduplication Key Generator (Lines 9,710–9,726)**:
   - Strips 18 specific sports noise words before alphabetic team sorting.
   - Restricts cross-source backup merging strictly to within SonyLIV or within FanCode feeds.
   - Enforces standalone isolated status for Live.m3u feeds. Omitted from documentation.

5. **Official Broadcast Poster Whitelist / Placeholder Blacklist (Lines 10,281–10,288)**:
   - Evaluates candidate thumbnails and rejects any containing: `unique-tournament`, `FC_Sports_Default`, `ui-avatars.com`, `default_sports`, `stalker_pro_infinity`, or `/assets/logos/`. Omitted from documentation.

6. **Touch Gesture Swipe Guard (Line 10,497)**:
   - `if (Date.now() - (window._lastSwipeTimestamp || 0) < 350) return`.
   - Prevents accidental match modal opening during fast mobile scrolling. Omitted from documentation.

7. **Multi-Mirror Sub-Buttons In Feeds Card (Lines 10,626–10,635)**:
   - When a source item contains multiple quality streams (`c.streams.length > 1`), renders interactive mirror buttons for `'HD'`, `'720p'`, `'1080p'`, etc., directly calling `playEventSourceDirect(...)`. Omitted from documentation.

---

## 3. Recommendations for ARVIO React Migration

To ensure 100% feature parity during the ARVIO React migration:

1. **`MatchCenterModal.tsx` Component State**:
   - Must implement all 3 tabs: `Match Info`, `Scorecard`, and `Watch Feeds`.
   - Wire the 15-second `_scorecardPollInterval` cleanup in the `useEffect` return hook.
   - Wire the 90-second `_sportsProbeCache` into a custom hook `useSportsProbe()`.
   - Implement the multi-mirror quality buttons per source card.

2. **Live Sports Store (`sportsStore.ts`)**:
   - Must include `liveNowActiveStatus`, `liveNowActiveSport`, and `liveNowActiveSource` filter states.
   - Must persist fast-boot snapshots to `sessionStorage` for all 8 detected cache keys.
   - Must replicate the strict 6-tier user ordering hierarchy and the Widevine-without-ClearKey stream guard.

3. **Team Monogram & SVG Resolver (`useTeamTheme.ts`)**:
   - Port `KNOWN_TEAM_THEMES` and `KNOWN_TEAM_LOGOS` into static TypeScript constants.
   - Implement the string-hash fallback algorithm to the 6 dark stadium palettes.

---

## 4. Conclusion & Audit Sign-Off

Micro-Slices 21 through 24 have been thoroughly audited down to the exact line number, function signature, and DOM token. Every missing variable, function, DOM ID, CSS token, and edge case has been cataloged above.

**Auditor 6 Sign-Off:** Complete  
**Next Action:** Report findings back to parent agent.
