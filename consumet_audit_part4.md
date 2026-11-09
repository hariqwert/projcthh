# Comprehensive Code Audit Report: `consumet.html`
**Partition 4: Lines 10,801 to 14,400 (and associated subsystem boundaries)**
**Auditor:** Antigravity AI Assistant
**Date:** 2026-11-08

---

## Executive Overview
Partition 4 of `consumet.html` implements the high-performance Sports, Live Events, and Multimedia Engine of the Stalker Pro 2.0 / remix-hl platform. It spans client-side score tracking, multi-server stream health probing, speculative stream pre-warming, modern OTT card presentations, flagship provider spotlight algorithms, showcase studio containers, deep-linking, voice-guided channel navigation, and instant-render channel fallbacks.

---

## 1. Real-Time Cricket Scorecard Engine

### Implementation Location
- **Lines 10,854 – 11,064**: `window.renderSportsModalScorecard(event, scoreData, isFetching = false)`
- **Lines 11,211 – 11,232**: `window.refreshSportModalScorecard(userTriggered = false)`

### Core Architecture & Features
1. **Dynamic Sport Detection & Team Parsing**:
   - Classifies matches into Cricket, Football, or Basketball based on `category`, `sportName`, or `scoreData.sport`.
   - Resolves team names and logos via `scoreData.homeTeam`, `event.homeTeamName`, `parseTeamsFromTitle(event.title)`, or `getKnownTeamLogo(teamName)`.
   - Fallback avatar logos generated via UI-Avatars API or gradient initials badges.

2. **Situation & Match Equation Banner**:
   - Displays real-time match equations (e.g., *"Team A needs 24 runs in 18 balls"*) and current match phase/session badges (`session`, e.g., *"Post-Tea Session / Day 3"*).
   - Styled with ambient amber glow: `bg-amber-500/10 border-amber-500/20 text-amber-300 font-bold`.

3. **Inning Comparison Grid**:
   - Dual-card layout for Home & Away teams.
   - Live scores rendered in large monospace amber typography (`text-xl sm:text-2xl font-mono font-black text-amber-400`).
   - Displays overs bowled (`ov`), Current Run Rate (`CRR: ${crr}`) in emerald-400, and Required Run Rate (`RRR: ${rrr}`) or target chasing equation (`Target: ${target}`) in sky-400/amber-400.

4. **Active Batsmen Live Table**:
   - Tabular breakdown for striker and non-striker.
   - Dynamic striker indicator: Amber asterisk (`*`) attached to active batsman.
   - Columns: Runs (`R`), Balls Faced (`B`), Fours (`4s`), Sixes (`6s`), and Strike Rate (`SR` calculated as `(runs / balls) * 100`).
   - Automatic fallback generator for demo/unconnected matches to maintain UI elegance.

5. **Active Bowler Card**:
   - Displays active bowler name, bowling figures (`wickets-runs`), overs bowled, and calculated economy rate (`Econ = runs / overs`).

6. **Recent Balls Strip (Color Coded Over Telemetry)**:
   - Renders the last 8 deliveries in dynamic rounded pill chips:
     - **Wicket (`W`)**: `bg-red-600 text-white font-black animate-pulse`
     - **Four (`4`)**: `bg-emerald-600 text-white font-bold`
     - **Six (`6`)**: `bg-purple-600 text-white font-extrabold shadow-sm`
     - **Dot Ball (`0`, `•`, `.`)**: `bg-black/50 text-zinc-500 border border-white/5`
     - **Singles / Standard Runs**: `bg-white/10 text-zinc-300 font-mono`

---

## 2. Football & Basketball Scorecards

### Implementation Location
- **Lines 11,065 – 11,193**: Branch within `renderSportsModalScorecard`

### Core Architecture & Features
1. **Stadium Arena Match Scoreboard Card**:
   - Grid layout featuring 7 columns: Home Team (3 cols), Center Score Pillar (1 col), Away Team (3 cols).
   - Radial red atmospheric backdrop: `bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.12),transparent_70%)]`.
   - Team form guide badges (last 5 games: `W` in emerald, `D` in amber, `L` in red).
   - Central glowing scoreboard box: `text-2xl sm:text-3xl font-mono font-black text-amber-400` with status label (`LIVE`, `FT`, or `VS`).

2. **Possession & Match Statistics Comparison Bars**:
   - Helper `renderStatBar(label, hVal, aVal, isPct)` calculates real-time percentage widths.
   - Visual comparison dual-color bar:
     - Home side: `bg-emerald-500 rounded-l-full`
     - Away side: `bg-sky-500 rounded-r-full`
   - Tracks:
     - **Ball Possession %**
     - **Total Shots**
     - **Shots on Target**
     - **Corner Kicks**
     - **Fouls Committed**

3. **Key Moments & Match Timeline**:
   - Scrollable timeline displaying goals, yellow/red cards, and substitutions with match minutes (e.g. `34'`, `58'`, `67'`).

4. **Live Commentary & Telemetry Banner**:
   - Renders real-time text commentary (`headline`) in an amber accent panel with megaphone icon.

---

## 3. 15-Second Background Scorecard Poller

### Implementation Location
- **Lines 10,583 – 10,595**: Initialization in `openSportMatchOvalModal`
- **Lines 11,211 – 11,232**: `refreshSportModalScorecard`
- **Lines 11,258 – 11,270**: Cleanup in `closeSportMatchOvalModal`

### Operational Flow
1. **Polling Cycle**:
   - Configured via `window._scorecardPollInterval = setInterval(..., 15000)`.
   - Executes every 15 seconds while the match modal is open.
2. **Endpoint Contract**:
   - Calls `/api/sports/match-score?title=${queryTitle}&category=${querySport}&id=${queryId}`.
   - On response `{ status: 'success', score: { ... } }`, updates `event.liveScore` and invokes `renderSportsModalScorecard(event, data.score, false)`.
3. **Termination & Resource Protection**:
   - Inside the interval handler, checks if `document.getElementById('sportsMatchOvalModal')` has class `hidden`. If hidden, it immediately cancels itself via `clearInterval` and nulls the pointer.
   - `closeSportMatchOvalModal()` explicitly executes `clearInterval(window._scorecardPollInterval); window._scorecardPollInterval = null;` to eliminate background network and CPU drain.

---

## 4. Speculative Feed Pre-Warming

### Implementation Location
- **Lines 10,812 – 10,852**: `prewarmLiveSportsSources(events)`

### Operational Flow
1. **Target Selection**:
   - Takes the top 5 live events (`events.slice(0, 5)`).
   - Takes the first 2 streaming channels for each event (`channels.slice(0, 2)`).
   - Generates up to 8 speculative targets.
2. **In-Memory Cache (60-second TTL)**:
   - Uses `window._sportsProbeCache` (`Map`).
   - If a cached record exists and `Date.now() - cached.time < 60000`, the pre-warm skip occurs.
3. **Async Batch Probe**:
   - Dispatches a single `POST /api/sports/probe-sources` with `sources: probeList.slice(0, 8)`.
   - On success, updates cache entries with `{ alive: r.alive, latencyMs: r.latencyMs, time: Date.now() }`.
   - Delivers instantaneous 0ms perceived modal load latency when users tap any top match card.

---

## 5. Parallel Stream Reachability Prober

### Implementation Location
- **Lines 10,720 – 10,810**: `probeModalSportSources(sources, safeEventId)`

### Operational Flow
1. **Parallel Execution**:
   - Maps modal stream sources into an index-addressed payload.
   - Wraps fetch in an `AbortController` with a strict 3500ms timeout.
2. **Visual Health & Latency Badges**:
   - Target DOM element: `#sourceLiveBadge_${idx}`.
   - **Online Streams**:
     - Badge class: `bg-emerald-500/15 text-emerald-300 border-emerald-500/40`.
     - Inner HTML: Pulsing emerald dot + `LIVE & ONLINE (${r.latencyMs || 50}ms)`.
     - Container card: Highlights with `border-emerald-500/30`.
   - **Offline / Geoblocked Streams**:
     - Badge class: `bg-red-500/15 text-red-400 border-red-500/30`.
     - Inner HTML: Solid red dot + `OFFLINE`.
     - Container card: Dimmed with `opacity-55`.
3. **Auto-Selecting Lowest-Latency Stream**:
   - Identifies the stream with minimum `latencyMs`.
   - Automatically remaps the modal's primary Play button (`#sportsModalPrimaryPlayBtn`) to immediately play the lowest-latency working source.

---

## 6. Netflix Sports Cards Component

### Implementation Location
- **Lines 11,299 – 11,397**: `createNetflixSportCard(e, isShelf = false)`

### Core Architecture & Features
1. **Aspect Ratio & Responsive Framing**:
   - Full-bleed 16:10 poster frame: `aspect-[16/10] w-full bg-slate-900`.
   - Shelf mode adapts to `w-64 sm:w-72 md:w-80 shrink-0`; grid mode adapts to `w-full`.
2. **Pulsing LIVE Dot & Network Tags**:
   - Live badge: `<span class="bg-rose-600 text-white ..."><span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>LIVE</span>`.
   - Provider tags: SonyLIV, Willow, FanCode, Prime, TimStreams, or Network badges.
3. **On-Card Multi-Source Switcher**:
   - Lines 11,329 – 11,340.
   - When an event contains multiple streams, an inline source switcher strip is rendered at the bottom:
     - `S1 (Primary)` in emerald accent.
     - `S2 (Backup)`, `S3 (Backup)` in white translucent pills.
     - `+N` badge opening modal for remaining sources.
     - Direct tap triggers `playEventSourceDirect` without triggering parent card open.
4. **Interactive Action Targets**:
   - Info Button (top-right SVG circle): Opens stream switcher & details modal (`openSportMatchOvalModal(id, 'watch')`).
   - Score Button: For cricket or football events, directly opens scorecard modal (`openSportMatchOvalModal(id, 'score')`).
   - Hover Overlay: Reveals white circular play action button.

---

## 7. Glacier Sapphire Live Now Billboard & Big 4 Balancing

### Implementation Location
- **Lines 11,400 – 11,496**: `getSpotlightEventImportance(e)`
- **Lines 11,507 – 11,890**: `renderLiveNowHeroSpotlight(events)`

### Importance Scoring Engine
| Factor | Score Weight | Description |
|---|---|---|
| **Blacklisted / Dummy Strings** | `-999999` | Rejects placeholders, tapmad, placeholder test tap, cricbuzz-aq, etc. |
| **Ended / Concluded Match** | `-999999` | Never showcases ended events |
| **Active Live Status** | `+25000` | Supreme gap: Live events outrank all scheduled events |
| **Starting Soon** | `+6000` | Next upcoming priority |
| **Future / Tomorrow Match** | `-30000` | Penalty ensuring future matches never displace today's live sports |
| **Stream Readiness** | `+1500 / +800` | Rewarded if playable URL and M3U8 exist |
| **Test Match Cricket** | `+4500` (live) / `+1500` | Highest prestige format boost (Ashes, BGT, WTC, Test Series) |
| **India Cricket Match** | `+5000` (live) / `+1200` | Peak international cricket audience boost |
| **Tier-1 Cricket Teams** | `+3500` (live) / `+1000` | Australia, England, South Africa, Pakistan, New Zealand, West Indies |
| **Tier-1 Football Clubs** | `+3000` (live) / `+800` | Real Madrid, Barcelona, Man City, Liverpool, Bayern, PSG, Arsenal |
| **Marquee Tournaments** | `+3000 / +2500` | IPL, ICC World Cup, Champions Trophy, EPL, UEFA Champions League, F1, NBA |
| **Flagship Providers** | `+2500` to `+1600` | SonyLIV (`+2500`), Willow (`+2200`), FanCode (`+1800`), Prime (`+1600`) |
| **Scraped Footlinks** | `-1500` | Deprioritized beneath official broadcasts |

### Big 4 Sports Balancing Algorithm
- Gathers top champion candidate from each of the Big 4 providers:
  1. **SONY** (SonyLIV)
  2. **WILLOW** (Willow TV – with strict live India & test match priority)
  3. **FANCODE** (FanCode 1080p)
  4. **PRIME** (Amazon Prime Video Sports)
- Balances them in a flagship champion queue.
- Fills remaining spots up to 6 items from highest-importance non-Willow items.
- Supports Admin Spotlight override (`window._spotlightStudioPublic?.spotlightStudio?.liveNowSpotlight`).
- Touch-swipe listener with clientX/clientY delta analysis for mobile spotlight swiping.

---

## 8. Showcase Studio Containers & Layout Modes

### Implementation Location
- **Lines 12,251 – 12,284**: Live Now showcase rendering
- **Lines 14,703 – 14,896**: `renderShowcaseContainers(containers, fallbackChannels)`

### Supported Layout Modes
1. `shelf`: Horizontal scrollable container with left/right scroller buttons (`customShelf_${containerId}`).
2. `grid`: Responsive Bento Grid (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`).
3. `glass_cards`: Translucent glass-card layout (`customGlass_${containerId}`).
4. `compact_chips`: Streamlined chip pills (`customChips_${containerId}`).
5. `spotlight`: 3-column hero broadcast layout (`customSpotlight_${containerId}`).

### Visual Styling & Cutout Art
- **Athlete Cutout (`playerPng`)**: Rendered in the bottom-right corner (`h-48 sm:h-64 md:h-80 pointer-events-none select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]`) with hover transform scaling.
- **Backgrounds**: Linear gradient top overlay on user image: `linear-gradient(to top, rgba(9, 9, 11, 0.95) 0%, rgba(9, 9, 11, 0.35) 50%, rgba(9, 9, 11, 0.7) 100%)`. Strictly avoids harsh tints to ensure legible typography.
- **Custom Texture (`gridBgUrl`)**: Optional internal grid backdrop texture.

---

## 9. URI Deep Linking, Focus Ring & Web Speech Voice Search

### Implementation Location
- **Lines 14,898 – 14,994**: `handleSportsUriConnection()`, `activateAsianGamesContainer()`, `toggleSportsVoiceSearch()`

### Mechanics
1. **URI Deep Linking**:
   - Reads `window.location.search` parameter `?container=...`.
   - Recognizes aliases: `asian_games`, `asian-games`, `asian games`, `aisn_gams`, `asian`.
   - Automatically prioritizes the requested container to index 0.
2. **Animated Focus Ring**:
   - `activateAsianGamesContainer()` scrolls target element smoothly to center: `targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' })`.
   - Applies high-visibility amber pulse ring: `targetEl.classList.add('ring-4', 'ring-amber-400', 'ring-offset-4', 'ring-offset-black', 'transition-all', 'duration-500')`.
   - Automatically cleans up ring after 3000ms.
   - Pushes state to URL via `window.history.replaceState`.
3. **Web Speech API Voice Search**:
   - `toggleSportsVoiceSearch()` utilizes `window.SpeechRecognition || window.webkitSpeechRecognition`.
   - Voice feedback with microphone icon pulsing amber (`#sportsVoiceSearchBtn.text-amber-400.animate-pulse`).
   - If recognized speech includes *"asian"*, *"aisn"*, *"asia"*, or *"game"*, it automatically directs the viewport to the Asian Games Container with toast notification (`showSportsToast`).
   - Falls back to general text search `filterSports()` for other keywords.

---

## 10. Instant Channels Fallback & 249+ Sports Channels Directory

### Implementation Location
- **Lines 12,668 – 12,860**: `_defaultInstantSportsChannels` & `loadSportsChannels`
- **Lines 12,863 – 13,013**: `loadAllChannelsDirectory`, `setChannelsGenre`, `renderChannelsDirectoryGrid`
- **Lines 13,014 – 13,071**: User custom M3U link storage & chips
- **Lines 13,443 – 13,615**: IPL 2026 match replays (146 Matches VOD in Hindi/English)
- **Lines 13,616 – 14,112**: Mega Live TV Catalog (JioTV, SportLink, Live.m3u, All Channels)

### Default 0ms Fallback Channels
Prevents blank screens or loading spinners during slow mobile network connections by loading immediately from memory:
1. `mdtv-1106`: Star Sports 1 HD (Cricket / Sports)
2. `mdtv-162`: Sony Sports Ten 1 HD (Football / UEFA)
3. `tim_sky-sports-main-event`: Sky Sports Main Event 4K (4K Ultra HD)
4. `tim_sky-sports-f1`: Sky Sports F1 UHD (F1 & Racing)
5. `tim_willow-cricket`: Willow Cricket HD (Cricket / Sports)
6. `mdtv-204`: DD Sports HD (Live Sports)

### 249+ Channels Directory & Genre Filtering
- Supports genre pills: `all`, `sky`, `football`, `bein`, `f1`, `cricket`, `us`, `entertainment`, `regional`, `4k`.
- Live search query parsing across `name`, `genre`, `source`, and `id`.
- Channel cards provide:
  - 16:10 aspect ratio thumbnail with fallback UI-Avatars.
  - Quick EPG channel modal trigger (`openEpgChannelModal`).
  - Favorite toggle (`toggleSavedSport`, saved to `stalker_saved_sports`).
  - Fullscreen player launch (`openFullscreenPlayer`).

---

## Verification & Integrity Check
- **Integrity Rule**: `anime_bing.php` was **NOT** touched or altered in any way.
- **Coverage**: Lines 10,801 to 14,400 inspected systematically in continuous chunks. All requested functions, parameters, caching mechanics, and design elements have been documented in detail.
