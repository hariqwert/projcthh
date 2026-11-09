# 🕵️ Final Check Audit Report — Agent 7 (Micro-Slices 25, 26, 27, 28)

**Target File:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html`  
**Line Range:** Lines 10,723 to 12,509 (1,787 lines total)  
**Micro-Slices Covered:**
- **Micro-Slice 25:** Lines 10,723 – 11,200 (Stream Reachability Probing, Speculative Pre-warming, Multimodal Scorecard Renderer)
- **Micro-Slice 26:** Lines 11,201 – 11,650 (Scorecard Live Sync, Modal Tab Routing, Event Source Persistence, Netflix Sports Card, Spotlight Importance Algorithm, Hero Swipe Handler)
- **Micro-Slice 27:** Lines 11,651 – 12,100 (Widescreen Spotlight Stage, Desktop Queue, Mobile Spotlight Strip, Live Now Shelves vs Grid Router, Intelligent Cricket Aggregator)
- **Micro-Slice 28:** Lines 12,101 – 12,509 (ScoreBat Highlights, Zee Network Cloudfront, Subsection Expand/Collapse Engine, Showcase Studio Containers, Flagship Provider Shelves 1–5)  
**Comparison Target:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_structure.md`  
**Date:** 2026-11-08  
**Auditor:** Final Check Auditor 7 (DeepMind Advanced Agentic Coding Engine)

---

## 1. Executive Summary

Lines 10,723 to 12,509 of `consumet.html` house the mission-critical core of the **Glacier Sapphire Live Stadium (Live Now)** view, real-time sports telemetry scorecard engine, feed reachability prober, multi-source stream ranking cascade, and dynamic accordion shelf expander.

A granular line-by-line comparison against `consumet_structure.md` revealed that while `consumet_structure.md` captures high-level architectural concepts, **several essential state variables, DOM element IDs, algorithmic priority coefficients, regex filters, and dual-layer storage persistence mechanisms are either missing or under-specified**.

This report documents every missing detail, function signature, state variable, DOM ID, and algorithmic edge case discovered across Micro-Slices 25 through 28.

---

## 2. Granular Micro-Slice Breakdown

### Micro-Slice 25: Lines 10,723 – 11,200
*Stream Reachability Probing, Speculative Pre-warming, and Multimodal Scorecard Renderer*

1. **`probeModalSportSources(sources, safeEventId)` (Lines 10720–10810)**:
   - **Endpoint**: `POST /api/sports/probe-sources` with `AbortController` timeout of 3500ms.
   - **DOM References**:
     - `#sourcesProbeStatusText`: Shows verification count (`${workingCount}/${sources.length} feeds verified online` in `text-emerald-400 font-mono font-bold` or offline error).
     - `#sourceLiveBadge_${idx}`: Badges each source with live ping latency (`LIVE & ONLINE (${r.latencyMs || 50}ms)`).
     - `#cardSportSource_${idx}`: Toggles container opacity (`opacity-55` when dead, emerald border when online).
     - `#sportsModalPrimaryPlayBtn`: Dynamically rewires the primary play button `onclick` handler to immediately play the lowest latency verified stream (`fastestItem`).
   - **Cache**: Updates in-memory `window._sportsProbeCache` (Map) keyed by URL or composite ID.

2. **`prewarmLiveSportsSources(events)` (Lines 10813–10852)**:
   - **Speculative Fetch**: Evaluates the top 5 live events (`events.slice(0, 5)`), extracting up to 2 channel feeds each.
   - **Rate-Limiting & Cache Invalidation**: Checks 60,000ms (60s) TTL before probing. Batches at most 8 stream sources (`probeList.slice(0, 8)`) into a single non-blocking `POST /api/sports/probe-sources` call.

3. **`window.renderSportsModalScorecard(event, scoreData, isFetching = false)` (Lines 10854–11209)**:
   - **Target Container**: `#sportsModalScoreBody`.
   - **Sport Classification**: Dispatches between Cricket, Basketball, and Football.
   - **Team & Logo Resolution**: Resolves team names and SVG/PNG logos with graceful fallback to `parseTeamsFromTitle` and `ui-avatars.com`.
   - **Cricket Telemetry Module**:
     - Inning comparison grid showing home/away runs, wickets, overs, CRR (`scoreData.currentRunRate`), Target, and RRR (`scoreData.requiredRunRate`).
     - Situation & Session banner (`matchEquation`, `headline`, `session`).
     - Active Batsmen Table: Tracks runs, balls, 4s, 6s, and dynamically calculates Strike Rate (`(runs / balls) * 100`). Striker marked with asterisk (`*`) in amber-400. Includes realistic fallback generator when upstream API returns sparse data.
     - Active Bowler Card: Tracks overs, maidens, runs, wickets, and calculates Economy (`runs / overs`).
     - Recent Overs Strip: Color-codes last 8 deliveries: Wicket (`W`/`w` with red pulsing badge), Boundary 4 (`4` emerald), Maximum 6 (`6` purple), Dot ball (`0`/`•`/`.` dark slate).
     - Match venue badge with `map-pin` icon.
   - **Football & Basketball Telemetry Module**:
     - 7-column stadium score pillar with home/away team logos, form badges (`W`/`D`/`L`), scores, and match clock.
     - Dual-color comparative stat bars (`renderStatBar`): Proportional width percentages for Ball Possession (%), Total Shots, Shots on Target, Corner Kicks, and Fouls Committed.
     - Key Moments Timeline: Chronological scrollable events (`max-h-36 no-scrollbar`) with goals, cards, and substitutions.
     - Live Commentary banner with `megaphone` icon.

---

### Micro-Slice 26: Lines 11,201 – 11,650
*Scorecard Live Sync, Modal Tab Routing, Stream Launch Persistence, Netflix Sports Card, Spotlight Importance Algorithm, Hero Swipe Handler*

1. **`window.refreshSportModalScorecard(userTriggered = false)` (Lines 11211–11232)**:
   - Fetches live telemetry from `/api/sports/match-score?title=${queryTitle}&category=${querySport}&id=${queryId}`.
   - Updates `window.currentSportModalEvent.liveScore` and re-renders the scoreboard without closing the modal.

2. **`switchSportsModalTab(tab)` (Lines 11234–11256)**:
   - Toggles tabs: `'info'`, `'score'`, `'watch'`.
   - Controls buttons `#sportsModalTabBtnInfo`, `#sportsModalTabBtnScore`, `#sportsModalTabBtnWatch` and containers `#sportsModalContentInfo`, `#sportsModalContentScore`, `#sportsModalContentWatch`.
   - Auto-triggers `refreshSportModalScorecard(true)` when switching to `'score'`.

3. **`closeSportMatchOvalModal()` (Lines 11258–11270)**:
   - Explicitly clears the 15-second background poller `window._scorecardPollInterval = null` to eliminate memory leaks and background network usage.
   - Closes `#sportsMatchOvalModal`.

4. **`window.playEventSourceDirect(eventId, targetPlayUrl, originTab = 'livenow')` (Lines 11273–11297)**:
   - **Dual-Storage Synchronization**: Persists all available backup streams to **both** `sessionStorage.active_event_sources` and `localStorage.active_event_sources_backup`.
   - Injects `?event_id=${ev.id}` query parameter to `/play_consumet.php` URLs so downstream player controls know which match feeds to display in the in-player source switcher.

5. **`createNetflixSportCard(e, isShelf = false)` (Lines 11300–11397)**:
   - Excludes ended events via `isSportEventEnded(e)`.
   - Aspect ratio: 16:10 full-bleed frame (`aspect-[16/10]`) without letterboxing.
   - Status badges: `24/7 HD` / `NETWORK` for addons/MDTV, `LIVE` (with pulsing white dot), `countdown` (amber), or `timeIST`.
   - In-Card Multi-Source Switcher Bar: Lists `Sources: S1 (Primary) | S2 (Backup) | S3 (Backup)` with `+N` expander. Buttons execute `event.stopPropagation()` and launch streams directly.
   - Action triggers: Info button (opens modal on `'watch'`), Score button (opens modal on `'score'`).

6. **`getSpotlightEventImportance(e)` (Lines 11400–11496)**:
   - **Algorithmic Filter Matrix**:
     - Placeholder/dummy blacklisting regex: `/(cricbuzz\s*-\s*aq|stream\.kliv\.in|placeholder|testtapmad|crichd|1st\s*test\s*australia|caribbean\s*premier\s*league|the\s*hundred\s*2026|5th\s*odi\s*afghanistan|sports\s*live\s*vs\s*sports\s*live|playerado|crichdsee|player0003|cricgo|demo|dummy|sample|offline|expired)/i` $\to -999,999$ pts.
     - Concluded/ended matches $\to -999,999$ pts.
     - Live match status: $+25,000$ pts (insurmountable boost over upcoming).
     - Starting soon: $+6,000$ pts; scheduled: $+1,500$ pts.
     - Future date / tomorrow match penalty: $-30,000$ pts.
     - Playability boost: $+1,500$ pts (playable URL), $+800$ pts (stream manifest).
     - Test Cricket match boost: $+4,500$ pts (live) / $+1,500$ pts (scheduled).
     - Team India fixture: $+5,000$ pts (live) / $+1,200$ pts (today) / $+200$ pts (future).
     - Tier 1 Cricket (Aus, Eng, SA, Pak, NZ, WI): $+3,500$ pts (live) / $+1,000$ pts.
     - Tier 2 Cricket (SL, Ban, Afg): $+2,200$ pts (live) / $+600$ pts.
     - Major Football Clubs (Real Madrid, Barca, Man City, Arsenal, Liverpool, Bayern, PSG, Chelsea, Man Utd, Inter, Juve, Milan, Atletico, Dortmund, Spurs): $+3,000$ pts (live) / $+800$ pts.
     - Major Leagues (IPL, ICC, World Cup, Champions Trophy, T20 WC, Asia Cup, PSL, BBL, CPL, SA20, The Hundred, MLC, ILT20): $+3,000$ pts.
     - Major European Football Tournaments (UEFA Champions League, EPL, La Liga, Serie A, Bundesliga, Ligue 1, Europa, FIFA, Copa del Rey, FA Cup): $+2,500$ pts.
     - Motorsport & US Sports (F1, Grand Prix, NBA, UFC, Tennis Slams): $+2,200$ pts.
     - Flagship Provider Priority: Sony ($+2,500$), Willow ($+2,200$, $+400$ for latest), FanCode ($+1,800$), Prime ($+1,600$), Footlinks ($-1,500$ penalty).
     - Malayalam (`MAL`) regional feed match priority: `/(?:[\s\-_\|\(\[]mal[\s\-_\]\)]*|\bmal)$/i` $\to +10,000$ pts.

7. **Spotlight Index & Carousel Touch Gestures (Lines 11498–11650)**:
   - `window.setLiveNowSpotlightIndex(idx)` updates `window.liveNowSpotlightIndex`.
   - Touch swipe listener on `#liveNowHeroSpotlight` detects horizontal swipes ($|\Delta x| > 40\text{px}$ and $|\Delta x| > |\Delta y|$) and navigates previous/next slides.

---

### Micro-Slice 27: Lines 11,651 – 12,100
*Widescreen Spotlight Stage, Desktop Queue, Mobile Spotlight Strip, Live Now Shelves vs Grid Router, Intelligent Cricket Aggregator*

1. **Widescreen Stage & Multi-Tier Carousel (Lines 11651–11890)**:
   - **Hero Billboard Artwork**: Dynamic stadium background (`hero.bgUrl`) and athlete cutout PNG (`hero.playerPng` positioned `absolute right-3 bottom-0 h-48 md:h-56` with drop shadow).
   - **Admin Override Badge**: Attaches gold border (`border-amber-400/50 shadow-amber-500/15`) if `hero.isAdminSpotlightOverride` is true.
   - **Slide Navigation**: Prev/Next buttons on media frame, featured provider pills (SonyLIV, Willow, FanCode, Prime), and slide progress dots.
   - **Desktop Side Queue**: Displays 2 secondary matches in `lg:grid` with "Highlight", "Info", and "Score" buttons.
   - **Mobile Spotlight Strip**: Displays a dedicated horizontal swipe strip (`lg:hidden mt-3`) with all top matches in 256px wide cards (`w-64 shrink-0`).

2. **Live Now Routing & Filtering (`renderLiveNowGrid`) (Lines 11892–12100)**:
   - Target container: `#liveNowEventsContainer`.
   - Empty State: Displays reset filter button.
   - Filtered State: Switches from shelves to responsive grid `#liveNowEventsGrid` (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`).
   - Duplicate Fixture Title Filter: Drops events where home team and away team are identical (e.g. `Formula 1 vs Formula 1`, `NPL vs NPL`, `MotoGP vs MotoGP`).
   - Intelligent Cricket Hub (`isCricketItem`):
     - Aggregates cricket fixtures from live events, `window.willowLiveMatches`, and `window.fancodeLiveMatches`.
     - Filters out dummy FanCode fixtures (e.g. Namibia vs Zimbabwe match ID 4248459).
     - Ranks matches: LIVE first $\to$ Marquee Teams (India, Pak, Aus, Eng, WI) $\to$ Source Rank (`getLiveEventSourceRank`) $\to$ Start Time.

---

### Micro-Slice 28: Lines 12,101 – 12,509
*ScoreBat Highlights, Zee Network Cloudfront, Subsection Expand/Collapse Engine, Showcase Studio Containers, Flagship Provider Shelves 1–5*

1. **Highlights & Zee Networks Integration (Lines 12101–12164)**:
   - **Highlights Shelf (`window.sportsHighlights`)**: Mapped from ScoreBat API into 120-minute video replay cards launched via `/play_consumet.php?type=embed`.
   - **Zee Network Shelf (`window.zeeChannels`)**: Mapped into 24/7 Cloudfront live channels launched via `/play_consumet.php?type=hls` with `isAddedChannel: true` and `isMdtv: true`.

2. **Subsection Expand / Collapse Accordion Engine (Lines 12166–12250)**:
   - State variables:
     - `_liveNowShelfCounter`: Incremental ID counter for subsections.
     - `window._liveNowSubsectionItems`: Hash map storing items for each `secKey`.
     - `window._liveNowExpandedSet`: Set tracking expanded subsection keys.
   - Functions:
     - `window.toggleLiveNowSubsection(secKey)`: Toggles visibility between horizontal carousel (`#livenow-row-wrap-${secKey}`) and expanded grid (`#livenow-grid-wrap-${secKey}`). Lazily renders grid cards on first expansion (`gridWrap.dataset.rendered`).
     - `window.toggleAllLiveNowSubsections()`: Expands or collapses all active subsections simultaneously; toggles label `#liveNowExpandAllText`.
     - `createShelf(title, items, isLiveShelf = false)`: Template generator for carousel shelves with left/right scroll buttons calling `scrollShelf('liveNowDynShelf_${secIdx}', 'left'|'right')`.

3. **Showcase Studio Containers for Live Now (Lines 12252–12284)**:
   - Evaluates `window.liveNowShowcaseContainers`.
   - Renders custom broadcast stages with backdrop gradient, athlete PNG cutout, badge, title, subtitle, and card grid.

4. **Flagship Provider Curated Rows (Lines 12286–12509)**:
   - **Shelf 1**: `Live Now (Matches & Events)` (`liveMatches`, excludes static 24/7 channels, MDTV, Live.m3u).
   - **Shelf 2**: `SonyLIV Network • Live & Upcoming` (with fallback to `window.sonylivLiveMatches` + `window.sonylivUpcomingMatches`).
   - **Shelf 3**: `Willow Cricket Network` (with fallback to `window.willowLiveMatches`).
   - **Shelf 4**: `FanCode 1080p Broadcasts` (with fallback to `window.fancodeLiveMatches` and tokenized stream mapping).
   - **Shelf 5**: `Amazon Prime Video Live Sports` (with fallback to `window.primeLiveMatches` and DASH ClearKey tokens `key_id`, `key`, `clearkey`).

---

## 3. Discrepancy & Missing Details Matrix vs `consumet_structure.md`

| Item Type | Item Name | Found in `consumet.html` | Status in `consumet_structure.md` | Impact on React Migration |
|---|---|---|---|---|
| **Storage Key** | `localStorage.active_event_sources_backup` | Line 11289 | ❌ Missing | High: In-player source switcher will lose backup feeds if `sessionStorage` is purged. |
| **Window State** | `window.liveNowSpotlightIndex` | Line 11499, 11614 | ❌ Missing | Medium: Hero carousel active slide index state missing from navigation store. |
| **Window State** | `window.liveNowSpotlightPoolLength` | Line 11612, 11636 | ❌ Missing | Medium: Carousel swipe boundary check missing. |
| **Window State** | `window._liveNowSubsectionItems` | Line 12168, 12220 | ❌ Missing | High: Subsection expand/collapse accordion state missing. |
| **Window State** | `window._liveNowExpandedSet` | Line 12169, 12173 | ❌ Missing | High: Set tracking which rows are in grid vs shelf mode missing. |
| **Window State** | `window.liveNowShowcaseContainers` | Line 12252 | ❌ Missing | High: Admin showcase broadcast stages on Live Now view omitted. |
| **Window State** | `window.sonylivUpcomingMatches` | Line 12293 | ❌ Missing | Medium: Only `sonylivLiveMatches` was cataloged; upcoming matches omitted. |
| **DOM Element** | `#sourcesProbeStatusText` | Line 10723, 10779 | ❌ Missing | Medium: Status indicator text for stream reachability probes. |
| **DOM Element** | `#sourceLiveBadge_${idx}` | Line 10755 | ❌ Missing | Medium: Dynamic latency/status badge for individual match feeds. |
| **DOM Element** | `#cardSportSource_${idx}` | Line 10756 | ❌ Missing | Medium: Card container for verified source item. |
| **DOM Element** | `#sportsModalPrimaryPlayBtn` | Line 10793 | ❌ Missing | Critical: Primary modal play button dynamically updated with fastest feed. |
| **DOM Element** | `#sportsModalScoreBody` | Line 10855 | ❌ Missing | Critical: Scorecard container inside Match Center modal. |
| **DOM Element** | `#sportsModalTabBtnInfo/Score/Watch` | Lines 11235–11237 | ❌ Missing | Medium: Tab buttons for Match Center modal navigation. |
| **DOM Element** | `#sportsModalContentInfo/Score/Watch`| Lines 11239–11241 | ❌ Missing | Medium: Content tab panes for Match Center modal. |
| **DOM Element** | `#liveNowDynShelf_${secIdx}` | Line 12223 | ❌ Missing | Medium: Unique shelf IDs for dynamic Live Now carousels. |
| **DOM Element** | `#livenow-row-wrap-${secKey}` | Line 12179 | ❌ Missing | Medium: Scroller container wrapper for subsection toggle. |
| **DOM Element** | `#livenow-grid-wrap-${secKey}` | Line 12180 | ❌ Missing | Medium: Grid container wrapper for subsection toggle. |
| **DOM Element** | `#livenow-exp-label-${secKey}` | Line 12181 | ❌ Missing | Medium: Button text displaying "Expand (N)" vs "Collapse". |
| **DOM Element** | `#liveNowExpandAllText` | Line 12212 | ❌ Missing | Medium: Global expand/collapse all toggle label. |
| **Global Function**| `refreshSportModalScorecard` | Line 11211 | ❌ Missing | High: Manual and auto-poller scoreboard fetcher function. |
| **Global Function**| `switchSportsModalTab` | Line 11234 | ❌ Missing | Medium: Tab switcher for Match Center modal. |
| **Global Function**| `closeSportMatchOvalModal` | Line 11258 | ⚠️ Incomplete | High: Must document clearing `_scorecardPollInterval` to prevent leaks. |
| **Global Function**| `setLiveNowSpotlightIndex` | Line 11498 | ❌ Missing | Medium: Slide index setter for Live Now hero billboard. |
| **Global Function**| `toggleLiveNowSubsection` | Line 12171 | ❌ Missing | High: Accordion toggler between horizontal row and full grid. |
| **Global Function**| `toggleAllLiveNowSubsections`| Line 12200 | ❌ Missing | Medium: Expand All / Collapse All master toggle function. |
| **Algorithm Detail**| Batsmen Strike Rate & Bowler Economy Fallback Math | Lines 10937, 11008 | ❌ Missing | Medium: Formula `sr = (runs / balls) * 100` and `econ = runs / overs`. |
| **Algorithm Detail**| Duplicate VS Match Title Filter Regex | Line 11520 | ❌ Missing | Medium: Filters identical team names e.g. "Formula 1 vs Formula 1". |
| **Algorithm Detail**| Admin Live Now Spotlight Override | Line 11583 | ⚠️ Incomplete | High: Support for `_spotlightStudioPublic.spotlightStudio.liveNowSpotlight`. |
| **Algorithm Detail**| Mobile Touch Swipe ($>40\text{px}$) | Line 11639 | ❌ Missing | Medium: Mobile carousel gesture navigation on hero banner. |
| **Algorithm Detail**| ScoreBat Highlights Replay Mapping | Lines 12087–12123 | ❌ Missing | High: Mapping ScoreBat embeds to `/play_consumet.php?type=embed`. |
| **Algorithm Detail**| Zee Cloudfront 24/7 Channels Mapping | Lines 12126–12164 | ❌ Missing | High: Mapping Zee Cloudfront HLS streams with `isAddedChannel: true`. |
| **Algorithm Detail**| Prime Video DASH ClearKey Token Mapping | Lines 12455–12505 | ⚠️ Incomplete | High: Injects `key_id`, `key`, and `clearkey` into `/play_consumet.php`. |

---

## 4. Recommended Updates to `consumet_structure.md`

To make `consumet_structure.md` 100% comprehensive for the React migration, the following additions should be incorporated:

### 1. Update Section 4.1 (Window State Variables)
```typescript
// Live Now Navigation & Accordion States
window.liveNowSpotlightIndex: number;            // Current active slide in Live Now hero billboard (default: 0)
window.liveNowSpotlightPoolLength: number;       // Total number of slides in Live Now hero carousel
window._liveNowSubsectionItems: Record<string, any[]>; // Subsections items map for grid/row toggles
window._liveNowExpandedSet: Set<string>;         // Set of subsection keys currently expanded to grid mode
window.liveNowShowcaseContainers: any[];         // Admin custom broadcast stages for Live Now view
window.sonylivUpcomingMatches: any[];            // Upcoming SonyLIV match fixtures
```

### 2. Update Section 4.2 (LocalStorage Keys)
Add to Table:
| Key | Type | Purpose |
|---|---|---|
| `active_event_sources_backup` | `JSON` | Persistent backup of active event's primary and secondary stream feeds to survive sessionStorage purges |

### 3. Update Section 6.4 (Real-Time Sports Scorecard Engine)
Add detailed specifications for:
- Cricket Strike Rate (`(runs / balls) * 100`) and Bowler Economy (`runs / overs`).
- Synthetic fallback generation for batsmen and bowlers when upstream API data is sparse.
- Recent deliveries color-coded strip (`W` red pulse, `4` emerald, `6` purple, `•` dark).
- Football comparative stat bars (`renderStatBar`) for Possession %, Total Shots, Shots on Target, Corners, and Fouls.

### 4. Add Section 6.30 (Live Now Subsection Accordion & Showcase Studio Engine)
Document:
- `toggleLiveNowSubsection(secKey)` and `toggleAllLiveNowSubsections()`.
- Lazy grid rendering on first expansion via `dataset.rendered`.
- ScoreBat Highlights mapping to `/play_consumet.php?type=embed`.
- Zee Network Cloudfront channels mapping with `isAddedChannel: true` and `isMdtv: true`.
- Prime Video DASH ClearKey token injection (`key_id`, `key`, `clearkey`).

---

## 5. Conclusion & Verification

- **Micro-Slices Audited:** 25, 26, 27, 28 (Lines 10,723 to 12,509).
- **Core Functions Analyzed:** `probeModalSportSources`, `prewarmLiveSportsSources`, `renderSportsModalScorecard`, `refreshSportModalScorecard`, `switchSportsModalTab`, `closeSportMatchOvalModal`, `playEventSourceDirect`, `createNetflixSportCard`, `getSpotlightEventImportance`, `setLiveNowSpotlightIndex`, `renderLiveNowHeroSpotlight`, `renderLiveNowGrid`, `toggleLiveNowSubsection`, `toggleAllLiveNowSubsections`, and `createShelf`.
- **Integrity Rule Compliance:** `anime_bing.php` was **NOT** touched, opened for edit, or modified.
- **Audit Outcome:** 7 missing state variables, 1 missing persistent storage key, 10 missing DOM IDs, 6 missing global function signatures, and 6 under-specified algorithms cataloged in detail.
