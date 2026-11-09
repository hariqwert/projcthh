# 🔍 Deep Architectural Audit Report: `consumet.html` — Partition 5 (Lines 14,401 – 17,868+)

> **Target File:** `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet.html`  
> **Audited Partition:** Lines 14,401 to 17,868 (with extended tracing covering Lines 13,450 to 14,400 for complete subsystem context)  
> **Audited Date:** 2026-11-08  
> **Status:** Full Inspection Complete  

---

## Executive Overview

Partition 5 forms the multimedia powerhouse and advanced interaction surface of `consumet.html`. It encompasses:
1. **Live Sports & Replay Infrastructure:** Full VOD replay system for IPL 2026 (146 matches), 4-tier live TV aggregator architecture (JioTV, SportLink, SM-IPTV, Live.m3u), multi-level sports showcase containers, and high-fidelity vector sports logos (60+ channels).
2. **Virtual Lazy OTT Grid:** Zero-UI-freeze DOM virtual rendering with dual `IntersectionObserver` sentinels for both Live TV and sports channels.
3. **Anime Universe Super-Hub:** Multi-source parallel ingestion (AniList GraphQL, Jikan Moe v4, Kitsu Edge, local `/api/anime/*` cache) with automatic 7-second spotlight carousel, specialized genre shelves, and session storage caching.
4. **One Piece Master Universe Matrix:** Canonical multi-decade TMDB catalog spanning movies, specials, and the TV continuum, backed by dynamic live TMDB search.
5. **Anime Streaming Scrapers:** AnimeSalt (English SUB/DUB selector with direct `.m3u8` resolution) and RareAnimes (Hindi dubbed streams and embed resolving).
6. **Weekly Broadcast Radar:** 7-day airing timeline with JST UTC+9 offset calculations, date picker, and 5-tier failover fallbacks.
7. **Electronic Program Guide (EPG):** Live XMLTV parser, dynamic progress bar calculations, network filtering (Star Sports vs. Sony Sports), and interactive program/channel modals.
8. **Actor & Creator Profile Engine:** TMDB person metadata, dynamic filmography credits sorting, bio clamping, and cyber-pink skeleton loaders.
9. **Universal Media Engines:** Standalone YouTube-nocookie trailer player, cybernetic watch history tracker with live-vs-VOD discrimination, and universal 1.4x inertial mouse drag-to-scroll engine.

---

## 1. IPL 2026 146-Match Full VOD Replay Archive

### 1.1 Architectural Purpose & API Endpoint
- **Endpoint:** `/api/sports/ipl-replays` (supports `?refresh=1` for cache-busting).
- **Global State:**
  - `window.iplReplaysData`: Array storing the parsed 146 replay match objects.
  - `window.activeIplFilter`: Current language filter (`'ALL'` | `'ENGLISH'` | `'HINDI'`).

### 1.2 Data Flow & Core Methods
1. **`loadIplReplays(force = false)`** (Lines 13,450–13,469):
   - Updates badge UI `#iplReplaysCountBadge` to `"Loading IPL replays..."`.
   - Fetches from `/api/sports/ipl-replays`.
   - On success, updates `#iplReplaysCountBadge` to `"${window.iplReplaysData.length} Matches (Full VOD)"`.
   - Invokes `filterIplReplays(window.activeIplFilter || 'ALL')`.
2. **`filterIplReplays(lang = 'ALL')`** (Lines 13,471–13,486):
   - Toggles button styling across `#iplFilterAll`, `#iplFilterEn`, and `#iplFilterHi` (active state receives `bg-blue-600 text-white`).
   - Filters matches by `rep.language.toUpperCase() === lang`.
   - Dispatches array to `renderIplReplays(filtered)`.
3. **`renderIplReplays(replays)`** (Lines 13,488–13,558):
   - Renders horizontal scrollable shelf `#iplReplaysShelf`.
   - Generates portrait 2:3 aspect-ratio cards styled with `aspect-[2/3]`, Hotstar fallback posters (`https://img10.hotstar.com/image/upload/...`), match number badges, and language indicators (`bg-blue-600/30` for English, `bg-emerald-600/30` for Hindi).
   - Generates playback URL: `/play_consumet.php?url=${encodeURIComponent(replayStream)}&name=${encodeURIComponent(rep.title)}&source=consumet.html&type=hls`.
   - Card click routes to `openLiveNowEventDirect(playUrl, 'sports')`.
   - Hooks up the subsection expansion toggle via `_ensureSportsSubsectionExpandButton('iplReplaysShelf', replays, false)`.
4. **`renderIplReplaysGrid(replays, gridEl)`** (Lines 13,560–13,614):
   - Used when the shelf is toggled into expanded 6-column grid view (`#iplReplaysShelf_gridWrap`).
5. **Deep Search Integration in `filterSports()`** (Lines 15,595–15,631):
   - Real-time search across `window.iplReplaysData` filtering by `title`, `teams`, or `matchNo`.
   - Populates `#sportsSearchIplShelf` with dedicated 1080p 50FPS badge tags and live count updates.

---

## 2. Master Live TV Engine & 4-Provider Catalog Architecture

```
                                 switchLiveTvCatalog(source)
                                              │
        ┌───────────────────┬─────────────────┴─────────────────┬───────────────────┐
        ▼                   ▼                                   ▼                   ▼
  'jiotv' (Default)    'sportlink'                        'allchannels'         'livem3u'
/api/jtv/channels    /api/sportlink/channels           /api/allchannels/channels /api/livem3u/channels
/api/jtv/categories  /api/sportlink/categories                                  GitHub Feed (25m auto)
        │                   │                                   │                   │
  ClearKey DASH/HLS   Multi-Stream Live Match Events       Combined IPTV Master    ClearKey DRM & HLS
  (1400+ Channels)    (Overlay Modal Source Selector)     (15m Auto-Update)       Direct OTT Streams
```

### 2.1 Provider State Architecture
- `window.liveTvCurrentSource` (`'jiotv'` | `'sportlink'` | `'allchannels'` | `'livem3u'`).
- Backward-compatibility aliases: `'mix1tv'` and `'airtel'` are transparently normalized to `'jiotv'`.
- Isolated catalog state arrays:
  - **JioTV:** `window.jtvAllChannels`, `window.jtvCategoriesList`, `window.jtvActiveCategory`
  - **SportLink:** `window.sportlinkAllChannels`, `window.sportlinkCategoriesList`, `window.sportlinkActiveCategory`
  - **SM-IPTV (All Channels):** `window.allChannelsList`, `window.allChannelsCategoriesList`, `window.allChannelsActiveCategory`
  - **Live.m3u:** `window.liveM3uAllChannels`, `window.liveM3uCategoriesList`, `window.liveM3uActiveCategory`

### 2.2 Provider Controllers & Loaders
1. **`switchLiveTvCatalog(source)`** (Lines 13,643–13,704):
   - Resets pagination limit: `window.jtvDisplayLimit = 120`.
   - Clears search input `#jtvSearchInput`.
   - Toggles button styling (`#btn-livetv-src-jiotv`, `#btn-livetv-src-sportlink`, `#btn-livetv-src-livem3u`, `#btn-livetv-src-allchannels`).
   - Dynamically updates header subtitle (`#jtvHeaderSubtitle`) and animated color indicator (`#jtvHeaderIndicator`):
     - SportLink: `bg-rose-500 animate-pulse`
     - All Channels: `bg-amber-400`
     - Live.m3u: `bg-indigo-500` (unhides `#livem3uM3uBadge`)
     - JioTV: `bg-emerald-500`
2. **`loadSportlinkCatalog()`** (Lines 13,706–13,738):
   - Fetches `/api/sportlink/channels`.
   - Sets count badge to `${count.toLocaleString()} MATCHES (SPORTLINK)`.
3. **`loadAllChannelsCatalog()`** (Lines 13,740–13,772):
   - Fetches `/api/allchannels/channels`.
   - Sets count badge to `${count.toLocaleString()} CHANNELS (ALL CHANNELS)`.
4. **`loadLiveM3uCatalog()`** (Lines 13,774–13,806):
   - Fetches `/api/livem3u/channels`.
   - Sets count badge to `${count.toLocaleString()} CHANNELS (LIVE.M3U)`.
5. **`loadLiveTvCatalog()`** (Lines 13,815–13,863):
   - Concurrently fetches `/api/jtv/channels` and `/api/jtv/categories` via `Promise.all`.
   - Caches initial 800 channels to `sessionStorage.getItem('consumet_livetv_cache')`.
   - Fallback hardcoded channels for emergency resilience (Star Sports 1 HD, Sony Sports Ten 1 HD, HBO HD, Sony PIX HD, Colors HD, Star Plus HD).

### 2.3 Playback URL Construction Across Providers
- **JioTV Streams:** Detects HLS vs DASH. SonyLIV/Hotstar channels route to HLS; others route to `/api/jtv/manifest/${c.id}.mpd` with ClearKey params:  
  `/play_consumet.php?channel_id=jtv-${c.id}&url=${encodeURIComponent(manifestTarget)}&key_id=${c.key_id}&key=${c.key}&name=${c.name}&type=dash`
- **SportLink Streams:** If multi-stream (`streamCount > 1`), clicking opens `openSportMatchOvalModal(id, 'watch')` allowing user to select between CDN mirrors.
- **AllChannels & Live.m3u:** Direct proxy routing through `/play_consumet.php?channel_id=...&url=...&source=...`.

---

## 3. Virtual Lazy Grid & High-Density OTT Channel Guide

### 3.1 Density & Layout Design
- Grid Container (`#jtvChannelGrid`): Uses dense responsive grid classes:  
  `grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 sm:gap-2.5`.
- Card Architecture: Tight 4:3 frame with channel logo, status dot, share button (`window.shareCardLink`), multi-server badge (`X SVR`), and hover overlay play button.

### 3.2 Dual IntersectionObserver Infinite Scrolling
1. **Live TV Sentinel (`#jtvLoadMoreSentinel`):**
   - Managed via `jtvScrollObserver` with `{ rootMargin: '300px' }`.
   - Appends sentinel whenever `channels.length > window.jtvDisplayLimit` (initial limit: 120).
   - Intersection callback triggers `window.loadMoreLiveTvChannels()` which increments limit by 120 and performs non-scrolling DOM updates.
   - Also provides manual trigger: `loadAllLiveTvChannels()` (sets limit to 999,999).
2. **Sports Grid Sentinel (`#sportsGridLoadMoreContainer`):**
   - Managed via `_sportsGridObserver` with `{ rootMargin: '300px' }`.
   - Paginated by `_sportsGridPage` with 80 channels per page.
   - Triggers `renderSportsGrid(null, true)` upon intersecting bottom margin.

---

## 4. 60+ Sports Channel Vector Logo Resolver (`getSportsLogo`)

Lines 14,630 to 14,702 contain the comprehensive vector logo routing matrix.

```typescript
function getSportsLogo(ch) {
    if (!ch) return 'https://ui-avatars.com/api/?name=Sports&background=05070a&color=10b981&size=256&bold=true';
    const title = (ch.name || ch.Name || '').replace(/⭐️/g, '').trim() || "Live Sports";
    let logo = (ch.logo || ch.Logo || '').replace(/&amp;/g, '&').trim();
    if (logo.startsWith('/img/')) {
        logo = `https://timstreams.co.rw${logo}`;
    }
    if (logo && (logo.startsWith('http://') || logo.startsWith('https://') || logo.startsWith('/assets/')) && !logo.includes('generic.png')) {
        return logo;
    }
    // Keyword Matching Matrix...
}
```

### Complete Resolver Resolution Table
| Channel Keyword Match | Resolved SVG / PNG Asset Target |
|---|---|
| `sony sab` | Wikimedia `Sony_SAB_logo.png` |
| `sony yay` | Wikimedia `Sony_Yay!_logo.png` |
| `sony max` | Wikimedia `Sony_Max_logo.png` |
| `sony ten` / `sony six` / `sony sports` | Wikimedia `Sony_Sports_Network_logo.png` |
| `mazhavil` | Wikimedia `Mazhavil_Manorama_logo.svg.png` |
| `asianet` | Wikimedia `Asianet_logo.png` |
| `star sports` | Wikimedia `Star_Sports_logo.png` |
| `flowers` | Wikimedia `Flowers_TV_logo.png` |
| `zee tv` | Wikimedia `Zee_TV_logo.png` |
| `abc ny` / `abc usa` / `abc` | `/assets/logos/abc_usa.svg` |
| `a&e` / `a & e` | `/assets/logos/a_and_e_usa.svg` |
| `bein sports 1 fr` | `/assets/logos/bein_sports_1_france.svg` |
| `bein sports 2 fr` | `/assets/logos/bein_sports_2_france.svg` |
| `bein sports 3 fr` | `/assets/logos/bein_sports_3_france.svg` |
| `bein sports 1 tr` / `turkey` | `/assets/logos/bein_sports_1_turkey.svg` |
| `bein sports 2 tr` / `turkey` | `/assets/logos/bein_sports_2_turkey.svg` |
| `bein sports 3 tr` / `turkey` | `/assets/logos/bein_sports_3_turkey.svg` |
| `bein sports 4 tr` / `turkey` | `/assets/logos/bein_sports_4_turkey.svg` |
| `bein` (generic) | `/assets/logos/bein_sports_mena_english_2.svg` |
| `astro supersport 3` | `/assets/logos/astro_supersport_3.svg` |
| `astro supersport 4` | `/assets/logos/astro_supersport_4.svg` |
| `astro cricket` | `/assets/logos/astro_cricket.svg` |
| `dazn` | `/assets/logos/dazn_2_spain.svg` |
| `arena sport 2 cro` | `/assets/logos/arena_sport_2_croatia.svg` |
| `arena sport` (generic) | `/assets/logos/arena_sport_2_serbia.svg` |
| `espn brasil` | `/assets/logos/espn_brasil.svg` |
| `fox sports 2` | `/assets/logos/fox_sports_2_usa.svg` |
| `fox sports 503` | `/assets/logos/fox_sports_503_au.svg` |
| `fanduel` | `/assets/logos/fanduel_sports_network_midwest.svg` |
| `sportsnet one` | `/assets/logos/sportsnet_one.svg` |
| `sportsnet 360` | `/assets/logos/sportsnet_360.svg` |
| `supersport variety` | `/assets/logos/supersport_variety_1.svg` |
| `tsn5` / `tsn 5` | `/assets/logos/tsn5.svg` |
| `tnt usa` / `tnt` | `/assets/logos/tnt_usa.svg` |
| `starz` | `/assets/logos/starz.svg` |
| `cinemax` | `/assets/logos/cinemax_usa.svg` |
| `mgm+` / `epix` | `/assets/logos/mgm_plus_usa_epix.svg` |
| `showtime` | `/assets/logos/showtime_showcase_usa.svg` |
| `bbc america` / `bbca` | `/assets/logos/bbc_america_bbca.svg` |
| `bet usa` / `bet` | `/assets/logos/bet_usa.svg` |
| `cnbc` | `/assets/logos/cnbc_usa.svg` |
| `ctv canada` / `ctv` | `/assets/logos/ctv_canada.svg` |
| `cbsny` / `cbs ny` / `cbs` | `/assets/logos/cbsny_usa.svg` |
| `canal 5` / `canal5` | `/assets/logos/canal5_mx.svg` |
| `sport 1 cz` / `sport 1` | `/assets/logos/sport_1_cz.svg` |
| `joj` | `/assets/logos/joj_sport_sk.svg` |
| `discovery life` | `/assets/logos/discovery_life_channel.svg` |
| `disney xd` | `/assets/logos/disney_xd.svg` |
| `racer tv` | `/assets/logos/racer_tv_usa.svg` |
| `nbc sports` | `/assets/logos/nbc_sports_philadelphia.svg` |
| `nat geo wild` | `/assets/logos/nat_geo_wild_usa.svg` |
| `reelz` | `/assets/logos/reelz_channel.svg` |
| `sport 5 plus` | `/assets/logos/sport_5_plus_israel.svg` |
| `sport 5 live` | `/assets/logos/sport_5_live_israel.svg` |
| `sport 5 star` / `sport 5` | `/assets/logos/sport_5_star_israel.svg` |
| `tv4 sport` | `/assets/logos/tv4_sport_live_3.svg` |
| `v sport motor` / `v sport` | `/assets/logos/v_sport_motor_sweden.svg` |
| `fox weather` | `/assets/logos/fox_weather_channel.svg` |
| `eurosport 1` / `eurosport` | `/assets/logos/eurosport_1_spain.svg` |
| **Default Fallback** | `ui-avatars.com/api/?name=${title}&background=0f172a&color=10b981&size=512&bold=true` |

---

## 5. Anime Universe Hub (`loadAnimeCatalog`)

Lines 15,780 to 16,005 configure the comprehensive Anime Universe Hub.

### 5.1 Multi-Tier Zero-Latency Initialization Pipeline
1. **In-Memory Cache Check:** Reads `window._masterAnimeList`. If populated, renders instantaneously (0ms).
2. **Session Storage Check:** Reads `sessionStorage.getItem('consumet_master_anime_list')`.
3. **Hardcoded Zero-State Curated Fallback:** If cache empty, immediately mounts 4 premier anime (*Attack on Titan*, *Jujutsu Kaisen*, *Demon Slayer*, *Solo Leveling*) so the viewport is never blank.
4. **Parallel Multi-API Race Fetching:** Concurrently triggers 6 asynchronous queries bounded by 1,500ms race timeouts (`Promise.race`):
   - Local Express API endpoints: `/api/anime/trending` & `/api/anime/popular`
   - Jikan Moe v4: `top/anime?limit=25` & `seasons/now?limit=25` via `fetchJikanAnime()`
   - Kitsu Edge API: `trending/anime?page[limit]=25` & `anime?filter[status]=current&sort=-userCount&page[limit]=25` via `fetchKitsuAnime()`
   - AniList GraphQL Endpoint: High-density query requesting `POPULARITY_DESC` top 30 and `RELEASING` top 25.

### 5.2 Shelves & Rotation Lifecycle
- **Spotlight Hero Slider:** Takes top 10 items; automatically rotates every 7,000ms when tab is active and scroll position is within view (`window.scrollY < 650 && !document.hidden`).
- **Ranked Top 10 Shelf:** Formatted via `renderTop10Shelf(..., 'animeTop10Shelf', 'ANIME')`.
- **New Releases / Trending Shelf:** Rendered into `animeTrendingShelf`.
- **Specialized Genre Shelves:** Formatted using modular offset slices `getShelfItems(startIdx, count)`:
  - `animeShonenShelf` (start 0)
  - `animeSupernaturalShelf` (start 40)
  - `animeRomanceShelf` (start 45)
  - `animeTopRatedShelf` (start 5)
  - `animeIsekaiShelf` (start 10)
  - `animeFightingShelf` (start 15)
  - `animeCozySliceShelf` (start 20)
  - `animeMechaShelf` (start 25)
  - `animeSportsShelf` (start 30)
  - `animeClassicsVaultShelf` (start 35)

---

## 6. One Piece Master Universe Matrix

Lines 16,006 to 16,268 contain the dedicated One Piece Master Trilogy & Universe Matrix Engine.

### 6.1 Canonical TMDB IDs & Sagas
| Canonical TMDB ID | Type | Title | Category | Badge | Year | Default Backdrop & Poster |
|---|---|---|---|---|---|---|
| `900667` | Movie | **One Piece Film: RED** | `trilogy` | Trilogy I | 2022 | `/fOy2JurzKANuvQwExucLhz5vsW1.jpg` / `/m80ALVV2eaN50979PVHQQ9Ev8qd.jpg` |
| `531309` | Movie | **One Piece: Stampede** | `trilogy` | Trilogy II | 2019 | `/4ssDSpEjYsc8Q1357Q1NnQxW97g.jpg` / `/iWrPfG2bQ7pQ49vE8lP4k0s7t5c.jpg` |
| `360814` | Movie | **One Piece Film: Gold** | `trilogy` | Trilogy III | 2016 | `/r1g6kO111lX2F1j7xO9K3e6V7R0.jpg` / `/gWvV0D048Q8k3N1lY0b4sR9p4cE.jpg` |
| `37854` | TV | **One Piece (TV Series)** | `tv` | TV Continuum (1100+ Eps) | 1999–Pres | `/2rmK7mnchw9Xr3XdiTFSxTTFqqU.jpg` / `/cMD9Ygz11yjbyVPv5L6g9tH7Y.jpg` |
| `148348` | Movie | **One Piece Film: Z** | `classics` | Classics | 2012 | `/gW9wHl4TjZ4k4k8f7x8i0qJ1q2R.jpg` / `/u3PZz23M3U7iHqg7r7Y2r0x6z8t.jpg` |
| `30219` | Movie | **One Piece: Strong World** | `classics` | Classics | 2009 | `/8Z8GzT0x9b3sK2g4x1Y7m9q0w3e.jpg` / `/zF3E4t5u7f9v0g1j2k3l4m5n6o7.jpg` |

### 6.2 Parallel Enrichment & Live Universe Search
- **Live Metadata Hydration:** `initOnePieceTrilogy()` queries `fetchTMDB('${item.type}/${item.id}')` in parallel to synchronize live community ratings, updated descriptions, and high-res backdrops.
- **Category Filter Tabs:** Handled by `filterOnePieceCategory(cat)` toggling between `'all'`, `'trilogy'`, `'tv'`, and `'classics'`.
- **Search Pipeline (`searchOnePieceUniverse`):**
  1. Searches local cache `_onePieceMasterItems` against title, overview, or badge.
  2. If no local match, executes TMDB multi-search query: `search/multi?query=One Piece ${query}`.
  3. Applies strict regex filter validating that result titles or overviews explicitly contain `"one piece"`, `"luffy"`, or `"straw hat"`.
  4. Dynamically normalizes results into matrix cards with live play action `openBingrPlayer(...)` and metadata inspection `openDetails(...)`.

---

## 7. Anime Provider Scraper Engine (AnimeSalt & RareAnimes)

Lines 16,320 to 16,696 house the multi-provider catalog and stream resolution architecture.

### 7.1 Provider Tabs & Navigation
- Active providers: `animesalt`, `rareanimes`, `anilist`, `kitsu`, `jikan`.
- Handled via `switchAnimeProvider(prov)` and `loadAnimeProviderDefault(prov)` with session/memory caching in `window._animeProviderCache[prov]`.

### 7.2 Stream Resolvers
1. **AnimeSalt Engine (`openAnimeSpecialPlay`):**
   - Strips episode/season suffix strings: `rawTitle.replace(/\s*-\s*Episode\s*\d+/i, '').replace(/\s*Season\s*\d+/i, '').trim()`.
   - Calls backend resolver: `/api/anime/stream?title=${encodeURIComponent(cleanName)}&season=1&episode=1`.
   - Checks global audio preference: `window._playerAudioMode === 'dub'`.
   - If dub mode is active, inspects `data.sources` for objects where `language` or `label` matches `/dub/i`.
   - Redirects to Bingr player:  
     `/play_bingr.php?url=${encodeURIComponent(targetUrl)}&name=${encodeURIComponent(rawTitle)}&title=${encodeURIComponent(cleanName)}&type=tv&s=1&e=1&srv=animesalt&audio=${isDub ? 'dub' : 'sub'}&source=consumet.html`.
2. **RareAnimes Engine (`openRareAnimesPlay`):**
   - Targets Hindi-dubbed anime catalog.
   - Cleans search query removing `"Hindi Dubbed"` and `"Download HD"`.
   - Calls backend resolver: `/api/rareanimes/stream?title=${encodeURIComponent(cleanName)}&season=1&episode=1`.
   - Resolves iframe/embed target (`data.sources[0].iframeUrl || data.sources[0].embedUrl`).
   - Redirects to player with `srv=ranime`.

---

## 8. Weekly Broadcast Radar & 5-Tier Airing Failovers

Lines 16,698 to 16,902 implement the 7-day anime scheduling timeline.

### 8.1 Time Calculation & JST Conversion
- Function: `switchAnimeScheduleDay(day = 'today', specificDate = null)`.
- Calculates Unix timestamp boundaries (`dayStart`, `dayEnd`) matching selected day or calendar date.
- Maps day offsets relative to local client time and converts broadcast scheduling strings into standard JST format (`"17:00 JST"`, `"23:30 JST"`, etc.).

### 8.2 5-Tier Redundant Failover Pipeline
```
               switchAnimeScheduleDay(day)
                           │
       ┌───────────────────┼───────────────────┐
       ▼                   ▼                   ▼
    Tier 1              Tier 2              Tier 3
   Jikan Moe           AniList              Kitsu
schedules?filter=   airingSchedules        anime?status=current
       │                   │                   │
       └───────────────────┴───────────────────┤ (If all 3 fail)
                                               ▼
                                            Tier 4
                                         TMDB Discover
                                      discover/tv?genres=16&lang=ja
                                               │
                                               ▼ (If offline/throttled)
                                            Tier 5
                                   Master Anime Pool Fallback
                                  (Synthetic JST Schedule Slots)
```

1. **Tier 1 (Jikan Moe v4):** `https://api.jikan.moe/v4/schedules?filter=${jikanDay}&limit=12`.
2. **Tier 2 (AniList GraphQL):** `airingSchedules(airingAt_greater: $dayStart, airingAt_lesser: $dayEnd, sort: TIME_DESC)`.
3. **Tier 3 (Kitsu Edge API):** `anime?filter[status]=current&sort=-userCount&page[limit]=12`.
4. **Tier 4 (TMDB Discover):** `discover/tv?with_genres=16&with_original_language=ja&sort_by=popularity.desc`.
5. **Tier 5 (Master Anime Fail-Safe Pool):** Distributes `window._masterAnimeList` entries across standardized Japanese broadcast slots (`17:00 JST`, `18:30 JST`, `19:00 JST`, `20:30 JST`, `21:00 JST`, `22:00 JST`, `22:30 JST`, `23:00 JST`, `23:30 JST`, `24:00 JST`, `24:30 JST`, `25:00 JST`), ensuring the schedule view is never blank even under total external API failure.

---

## 9. Electronic Program Guide (EPG) Engine

Lines 16,903 to 17,155 house the Star Sports & Sony Sports EPG Engine.

### 9.1 Data Parsing & Ingestion
- Endpoint: `/api/epg/timeline`.
- Function: `fetchAndParseEpg(force = false)`.
- Deduplication: Normalizes channel names using `(ch.name || '').trim().toLowerCase()`.
- Network Filters (`filterEpgNetwork`):
  - `'star'`: `/star sports/i`
  - `'sony'`: `/sony/i`
  - `'sports'`: `/star|sony|sport|cricket|espn|ten|tnt|dd sports|eurosport/i`
  - `'all'`: All decoded channels.

### 9.2 Real-Time Progress Bar Calculation
The live airing progress percentage is computed dynamically using current epoch time:
$$\text{progressPct} = \min\left(100, \max\left(5, \text{round}\left(\frac{\text{Date.now()} - \text{startTime}}{\text{endTime} - \text{startTime}} \times 100\right)\right)\right)$$
- If timing boundaries are missing or channel is off-air, falls back to a neutral 45%.
- Progress bar renders with an amber-to-red gradient: `bg-gradient-to-r from-amber-500 to-red-500`.

### 9.3 EPG Program & Channel Modals
- `#epgProgramModal`: Triggered via `openEpgProgramModal(title, chName, time, cat)`. Injects channel vector badge, timing details, description, and "Tune to Channel" direct action button.
- `#epgChannelModal`: Displays upcoming 24-hour itinerary for selected channel.
- View Switching: `toggleEpgView('timeline' | 'cards')` alternates between timeline view and multi-column bento card grid.

---

## 10. Actor & Creator Profile Engine (`openPersonModal`)

Lines 17,156 to 17,301 contain the Actor & Creator Profile modal system.

### 10.1 Initialization & Dynamic Search
- Signature: `openPersonModal(personId, personName, profilePath, characterName = '')`.
- ID Resolution Fallback: If `personId` is missing, queries TMDB search `/search/person?query=${encodeURIComponent(personName)}` to dynamically discover the TMDB Person ID.
- Loading State: Renders a 10-card cyber-pink skeleton grid with animated pulsing gradients (`from-pink-950/60 via-pink-900/40 to-pink-950/60`).

### 10.2 Combined Credits & Filmography Grid
- Endpoint: `person/${personId}?append_to_response=combined_credits`.
- Fields extracted:
  - Known For Department (`known_for_department`)
  - Birthday & Birthplace (`birthday`, `place_of_birth`)
  - Biography (`biography`)
  - Full-resolution profile headshot (`/t/p/w342${data.profile_path}`)
- Filmography Sorting: Extracts `data.combined_credits.cast`, filtering out items without poster/backdrop art, and sorts by TMDB popularity score descending:  
  `castCredits.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))`.
- Renders up to 30 top credits with release year, community star rating, character name (`as Character`), and media type pill (`Movie` vs `TV`), with click routing into `openDetails(item.id, mediaType)`.

---

## 11. Standalone Trailer Viewer Engine (`playSelectedTrailer`)

Lines 17,308 to 17,359 configure the standalone YouTube-nocookie trailer player.

### 11.1 Key Resolution Pipeline
```
               playSelectedTrailer(passedItem)
                             │
     1. Pause background iframe: trailerBgIframe.postMessage(pauseVideo)
                             │
     2. Check item.trailerKey or item.trailer.{id|youtube_id|key}
                             │
     3. Check active hero spotlight key: currentSpotlightTrailerKey
                             │
     4. Scan item.videos.results: type == 'Trailer'/'Teaser' & site == 'YouTube'
                             │
     5. Query TMDB: fetchOfficialTrailerKey(id, type, title)
                             │
     6. Query internal search proxy: /api/music/yt-search?q=${title} official trailer
                             │
     7. Final Fallback: youtube-nocookie.com/embed?listType=search&list=${title}...
```

### 11.2 Privacy & Clean Sandbox Embedding
- Embed endpoint: `https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1`.
- Clean Teardown (`closeTrailerPopup`): Stops video playback immediately by setting `iframe.src = ''` before dismissing modal `#trailerModal`.

---

## 12. Watch History & "Continue Watching" Engine

Lines 17,367 to 17,748 implement the normalized cybernetic watch history tracker.

### 12.1 Persistence & Safe Storage
- Key: `consumet_watch_history`.
- Handled through `window._safeLocalGet` and `window._safeLocalSet` (gracefully catches localStorage quota exceptions).
- Stores up to 25 items, sorted with newest items at index 0 (`history.unshift(normalizedItem)`).

### 12.2 Strict Stream Categorization (`_isSportsOrLiveHistoryItem`)
Discriminates live linear sports and OTT feeds from standard VOD content:
1. Media type matches: `'sports'`, `'livetv'`, `'livenow'`, `'live'`, `'channel'`, `'hls'`, `'dash'`.
2. Property flags: `isLive === true`, `isAdminLiveEvent === true`, or presence of `channel_id` or `drm`.
3. ID regex match: `/^(mdtv|jtv|live|sport|fancode|fc-|sonyliv|sliv-|willow|tim|dlhd|mix1tv|airtel|zee|star|sony|footlinks)/`.
4. Duration threshold: `duration >= 36000` (10+ hours indicates 24/7 linear stream).
5. Title keywords: `vs.`, `v/s`, `live stream`, `star sports`, `sony ten`, `premier league`, `champions league`, `formula 1`, `ufc`, `wwe`.

### 12.3 Thumbnail Auto-Hydration (`_hydrateMissingHistoryThumbnail`)
If a watch history entry has a missing or generic Unsplash fallback poster, an asynchronous task queries TMDB (`/movie/{id}` or `/tv/{id}`) or searches `/search/multi`, hydrates the high-resolution artwork, updates `#watchHistoryShelf` DOM images in-place, and persists the resolved poster back to `localStorage`.

### 12.4 Smart Detail & Resume Router (`openDetailsModal`)
- Sets global resume target: `window._resumeTargetTime = resumeTime`.
- Routing branches:
  - **Live Sports / Linear TV:** Bypasses TMDB details modal completely; routes directly to `openFullscreenPlayer(effectiveItem, title)`.
  - **Anime:** Inspects `_animeCache`; routes to `openAnimeInfo(cacheItem)`.
  - **VOD Movies & TV:** Directs to `openDetails(id, 'tv' | 'movie', expectedTitle)` allowing the video engine to resume playback at `_resumeTargetTime`.

---

## 13. Universal Desktop Inertial Drag-to-Scroll Engine

Lines 17,749 to 17,858 house `_initScrollAndHistoryEngine()`.

### 13.1 Hardware-Accelerated Lenis Mock
Provides a 120Hz native scrolling API compatibility layer (`window.lenis = { start, stop, raf, resize, on, scrollTo }`) ensuring no third-party scroll library hijacks or degrades browser GPU compositor frames.

### 13.2 Event-Delegated Mouse Drag Mechanics
- **Event Delegation:** A single `mousedown` listener attached to `document` inspects `e.target.closest('.scroller-container > div, div[id$="Shelf"], .overflow-x-auto')`.
- **Drag Threshold:** Drag initiates only when displacement exceeds 6 pixels: `Math.abs(dx) > 6`.
- **1.4x Acceleration Multiplier:** Translates horizontal mouse movement using high-speed desktop momentum:  
  `shelf.scrollLeft = _dragStartScrollLeft - dx * 1.4`.
- **False-Click Suppression:** Attaches a capture-phase `click` listener on `document` that calls `e.stopPropagation()` and `e.preventDefault()` if `_hasDragged` is true, ensuring users never accidentally launch videos or open modals when releasing a drag gesture.
- **Wheel-to-Horizontal Delegation:** Translates mouse wheel `deltaY` into horizontal `scrollLeft` on horizontal category pill bars (`#jtvCategoryPills`, `#animeScheduleTabs`, `#searchFilterChips`).
- **Floating Back-to-Top Pill:** Dynamically creates `#backToTopBtn` with `requestAnimationFrame` scroll ticking, appearing when `window.scrollY > 450`.

---

## Conclusion & Code Integrity Verification
- **Partition Verified:** All lines from 14,401 to 17,868 (and context from 13,450 to 14,400) have been audited line-by-line without any omission.
- **Critical Policy Adherence:** `anime_bing.php` was **NOT** modified or touched in any way.
- **Deliverable:** Audit complete and recorded in `c:/Users/HP/Documents/antigravity/brave-maxwell/consumet_audit_part5.md`.
