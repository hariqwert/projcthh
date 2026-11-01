# 🤖 HL AI & Stalker Pro 2.0 Master Architecture Guide

Authoritative technical documentation, architecture specifications, file boundaries, and operational rules for AI coding assistants (Antigravity, Claude Code, Cursor, Copilot) and senior engineers working inside the **remix-hl** (Stalker Pro 2.0) enterprise codebase.

---

## 1. Executive Summary & Core Philosophy

**remix-hl / Stalker Pro 2.0** is an enterprise-grade IPTV, Live Sports, VOD, and Multimedia streaming platform written in modern **TypeScript (Node.js + Express + tsx)** with an embedded **Go TorrServer** engine.

The platform provides:
- Multi-source live sports and 24/7 TV stream scraping (JioTV, FanCode, SonyLIV, TimStreams, DaddyLive, SuperSport).
- Dynamic token generation, deobfuscation ciphers, and W3C ClearKey DRM manifest rewriting.
- Reverse CORS proxying, MPEG-TS binary buffer cleaning, and low-latency HLS prefetch caching.
- Over 35+ movie and television streaming cluster providers (Movies4U, Bingr, Cinepro, MegaPlay, KissKH, AsiaFlix).
- Built-in BitTorrent streaming engine (TorrServer on port 8090) with real-time video seeking.
- Real-time Watch Party synchronization (WebSockets / WebRTC).
- Multi-tier defense architecture: Outermost L7 Perimeter Defense Shield, Honeypot Traps, Anti-SSRF Validators, Device Fingerprinting, and Maintenance **DEAD KILL** Prohibited Mode.
- Native HTML5 / PWA players (Shaka Player, Dash.js, Plyr, Hls.js) and Kodi/TiviMate/OTT Navigator M3U8/MPD playlist outputs.

---

### 🚨 Cardinal Architectural Tenet: PURE STREAM PLAYLISTS
> [!IMPORTANT]
> **Streams in `.m3u` playlists MUST ALWAYS point to direct video stream endpoints (`/live.php?token=STALKER_PRO&id=...`, `/api/play_stream/:id`, or `.mpd`/`.m3u8` CDN URLs).**
> **NEVER inject HTML embed URLs (e.g. `/player/...`, `aioplayer.html`, etc.) into an M3U file.** External players (VLC, TiviMate, OTT Navigator, Kodi) require binary media manifests and will fail if HTML is returned.

---

## 2. High-Level System Architecture

```
                                  ┌──────────────────────────────────────────────────────────┐
                                  │                 Clients & Video Players                  │
                                  │    • Kodi / TiviMate / OTT Navigator / VLC / Apple TV    │
                                  │    • Web Dashboards: consumet.html, subway.html, hero    │
                                  │    • Native Media Engines: Shaka Player, Plyr, Dash.js   │
                                  └────────────────────────────┬─────────────────────────────┘
                                                               │ HTTP / M3U / WebSocket
                                                               ▼
                     ┌─────────────────────────────────────────────────────────────────────────────────┐
                     │                           server.ts (Port 3000)                                 │
                     │                     Express Gateway & Middleware Pipeline                       │
                     ├─────────────────────────────────────────────────────────────────────────────────┤
                     │ 1. Perimeter Defense Shield (L7 WAF, Bot Blocking, Honeypot 24h IP Bans)        │
                     │ 2. Security Gatekeeper & Device Binding (IP Lock, Token Verification)           │
                     │ 3. Dead Kill Mode Interceptor (Bare White 403 Server Prohibited State)          │
                     │ 4. CORS Stripper & Custom Header Normalizer (Referer/Origin Spoofing)          │
                     │ 5. RAM Segment Cache & MPEG-TS Binary Cleaner (cleanTsBuffer)                   │
                     └──────┬───────────────────────┬───────────────────────┬───────────────────┬──────┘
                            │                       │                       │                   │
                            ▼                       ▼                       ▼                   ▼
                 ┌────────────────────┐  ┌────────────────────┐  ┌──────────────────┐  ┌─────────────────┐
                 │    routes/sports   │  │    routes/anime    │  │   routes/admin   │  │ TorrServer:8090 │
                 │ (/sports.m3u,      │  │   routes/bingr     │  │ (/api/admin/*,   │  │ (Embedded Go    │
                 │  /api/sports/*)    │  │   routes/cinepro   │  │  portal config,  │  │  Torrent Engine │
                 │                    │  │   routes/comics    │  │  status, logs)   │  │  p2p streaming) │
                 └──────────┬─────────┘  └──────────┬─────────┘  └─────────┬────────┘  └─────────────────┘
                            │                       │                      │
                            ▼                       ▼                      ▼
┌───────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       Backend Services Ecosystem                                      │
├───────────────────────────────────┬───────────────────────────────────┬───────────────────────────────┤
│ • MdtvService (JioTV / ClearKey) │ • TimstreamsService (timstreams)  │ • FancodeService (Tokens)     │
│ • JtvService (1400+ Channels)     │ • EmbedScraperService (M3U8 regex)│ • SonylivService (DASH/HLS)   │
│ • BiggBossService (24/7 Feeds)    │ • StreamicSportsService (IST)     │ • SportsScraperService        │
│ • Movies4uService & MegaPlay      │ • BingrScraperService             │ • ComicsService (SSRF Safe)   │
│ • KisskhService & Asiaflix        │ • JiosaavnService & MusicService  │ • EpgService (XMLTV Generator)│
│ • ChannelJsonService (Catalog)    │ • StreamHealthService (Pinger)    │ • FirestoreSyncService        │
│ • AiStreamDoctorService           │ • PartySyncService & WebRTC       │ • SubtitleService (Wyzie/Open)│
└───────────────────────────────────┴───────────────────────────────────┴───────────────────────────────┘
```

---

## 3. Directory & Module Boundaries

```text
/
├── server.ts                       # Gateway router, Express entrypoint, TorrServer supervisor (port 3000)
├── package.json                    # Scripts (dev, start, build) & dependencies
├── tsconfig.json                   # Strict TypeScript compiler configuration
├── .env                            # Environment secrets & credentials
│
├── assets/                         # Channel catalogs, SVG logos, M3U playlists, DB cache
│   ├── channels.json               # Master channel database (700+ channels)
│   ├── jtv2.json                   # Synced JioTV catalog (1200+ channels)
│   ├── sports.m3u                  # Master live sports M3U with Kodi ClearKey DRM tags
│   ├── fancode_active.m3u          # Live FanCode events playlist
│   ├── sonyliv_active.m3u          # Live SonyLIV events playlist
│   ├── tim_channels.json           # Cached TimStreams channels
│   ├── tim_live_events.json        # Cached TimStreams live matches
│   ├── admin_db.json               # Admin settings, portal configs, channels overrides
│   └── logos/                      # HD SVG & PNG channel badges
│
├── doctor_strange/                 # Stalker portal authentication tokens & cryptographic state
│   ├── jwt_secret.txt              # Active system JWT secret
│   └── token.stalker               # Cached Stalker MAC auth handshake tokens
│
├── torrserver/                     # Embedded Go BitTorrent daemon binaries & build configs
│   └── (torrserver executable)    # Native Go engine executing on port 8090
│
├── public/                         # Public frontend web assets
│   ├── subway.html                 # Subway Surfers PWA & 3D WebGL Arcade
│   ├── offline.html                # PWA offline cache mode fallback
│   └── sw.js                       # Progressive Web App Service Worker
│
├── src/
│   ├── proxy.ts                    # Core TS/HLS/DASH proxy, CORS stripper, RAM cache, sync-byte cleaner
│   ├── stalkerAPI.ts               # Stalker portal crypto (Scarlet Witch & Wanda ciphers, MAC handshake)
│   │
│   ├── middleware/                 # Route guards and authentication
│   │   ├── auth.ts                 # JWT verification & admin session guard
│   │   └── security.ts             # Request sanity checks & IP rate-limiters
│   │
│   ├── routes/                     # Modular Express route controllers
│   │   ├── admin.ts                # Portal manager, channel editor, perimeter & dead-kill controls
│   │   ├── anime.ts                # Anime streaming endpoints (Consumet, TokyoInsider, RareAnimes)
│   │   ├── asiaflixM3u.ts          # Asian drama M3U generation
│   │   ├── bingr.ts                # Bingr movie & web series multi-server scraper
│   │   ├── cineproM3u.ts           # Cinepro catalog & playlist exporter
│   │   ├── comics.ts               # Manga/comic chapter reader & SSRF-hardened image proxy
│   │   ├── consumetSearch.ts       # Global search, recommendations & movie trends
│   │   ├── customM3uProxy.ts       # Reverse proxy for external IPTV provider playlists
│   │   ├── hybridM3u.ts            # Dynamic multi-source hybrid playlist generator
│   │   ├── kisskhM3u.ts            # KissKH drama playlist exporter
│   │   ├── m3uHub.ts               # Universal M3U aggregator hub
│   │   ├── peakstream.ts           # Bandwidth QoS & high-traffic throttle routes
│   │   ├── sportsM3u.ts            # Live sports M3U, /api/sports/*, /api/play_stream/:id
│   │   ├── streamic.ts             # Streamic IST schedule & live channel mapper
│   │   ├── subtitles.ts            # Subtitle search & WebVTT conversion
│   │   └── torrent.ts              # TorrServer bridge, magnet link streamer & file explorer
│   │
│   └── services/                   # Specialized business logic, scrapers & decoders
│       ├── airtelService.ts        # Airtel Xstream live TV & Catchup extraction
│       ├── aiService.ts            # AI metadata analysis & smart search
│       ├── aiStreamDoctorService.ts# Self-healing stream monitor & fallback resolver
│       ├── animeScraperService.ts  # Multi-provider anime scraper
│       ├── asiaflixService.ts      # AsiaFlix drama scraper & M3U8 resolver
│       ├── biggBossService.ts      # 24/7 reality camera multi-feed aggregator
│       ├── bingrScraperService.ts  # Bingr multi-server embed resolver
│       ├── channelJsonService.ts   # Safe catalog I/O with auto-repair and backups
│       ├── channelValidatorService.ts# Stream health & dead link checker
│       ├── cineproService.ts       # Cinepro VOD & live movie scraper
│       ├── comicsService.ts        # Manga/comic scraper with host allowlist & anti-SSRF
│       ├── consumetSearchService.ts# Consumet ecosystem API scraper
│       ├── deviceBindingService.ts # Device fingerprinting & IP unlock token generator
│       ├── embedScraperService.ts  # Generic web embed analyzer & M3U8 regex extractor
│       ├── epgService.ts           # XMLTV Electronic Program Guide aggregator
│       ├── fancodeService.ts       # FanCode live matches & dynamic token signer
│       ├── firestoreSyncService.ts # Google Cloud Firestore auto-sync & M3U chunker
│       ├── framexService.ts        # Dynamic embed sandboxing
│       ├── geminiChatService.ts    # Google Gemini AI assistant & chat bridge
│       ├── hariEngineService.ts    # High-speed stream routing & server telemetry
│       ├── hybridM3uPickerService.ts# Multi-source channel merger
│       ├── jiosaavnService.ts      # JioSaavn lossless music scraper
│       ├── jtvService.ts           # Master JioTV service (1400+ channels, SonyLIV, Hotstar)
│       ├── kisskhService.ts        # KissKH drama & FragranceCDN resolver
│       ├── liveDataService.ts      # Real-time stream telemetry
│       ├── liveM3uService.ts       # Dynamic M3U builder
│       ├── localAiService.ts       # Local lightweight heuristic AI engine
│       ├── loggerService.ts        # Structured logging & metrics
│       ├── logoScraperService.ts   # Logo scraper
│       ├── logoService.ts          # Logo cache & SVG normalizer
│       ├── m3uReorganizeService.ts # Playlist channel categorizer & deduplicator
│       ├── mdtvService.ts          # MDTV JioTV DASH + ClearKey DRM rewriter (34 channels)
│       ├── megaPlayService.ts      # MegaPlay streaming cluster
│       ├── mix1tvService.ts        # Mix1TV scraper
│       ├── movies4uService.ts      # Movies4U cluster scraper
│       ├── musicService.ts         # Background audio API & music tracks
│       ├── partySyncService.ts     # Watch Party WebSocket synchronization
│       ├── peakStreamService.ts    # Bandwidth limiter & QoS manager
│       ├── perimeterDefense.ts     # L7 WAF, Honeypot traps, bot bans
│       ├── primeService.ts         # Prime video manifest resolver
│       ├── quarantineService.ts    # Broken stream quarantine & auto-rerouting
│       ├── rareAnimesService.ts    # RareAnimes scraper
│       ├── securityGateKeeper.ts   # IP binding & token validation
│       ├── siteMap.ts              # SEO sitemap generator
│       ├── smMovieHubService.ts    # SM Movie Hub scraper
│       ├── sonylivService.ts       # SonyLIV direct DASH/HLS resolver
│       ├── sportsHighlightsService.ts# Sports highlights video aggregator
│       ├── sportsScraperService.ts # SuperSport & sports event schedule aggregator
│       ├── streamHealthService.ts  # Periodic 5-minute background health pinger
│       ├── streamicSportsService.ts# Live sports schedule in IST with TimStreams routing
│       ├── subtitleService.ts      # Multi-source subtitle fetcher (Wyzie/OpenSubtitles)
│       ├── timstreamsService.ts    # TimStreams resolver (timstreams.co.rw) & XOR decoders
│       ├── tokyoInsiderService.ts  # TokyoInsider anime scraper
│       ├── webrtcService.ts        # WebRTC signaling for peer streaming
│       ├── webSearchService.ts     # Web search integration
│       ├── willowService.ts        # Willow Cricket live resolver
│       ├── youtubeService.ts       # YouTube audio fallback resolver
│       └── zeeChannelsService.ts   # Zee5 live channels updater
```

---

## 4. In-Depth Subsystem Mechanisms

### 📡 A. MDTV JioTV Sports & W3C ClearKey Engine (`src/services/mdtvService.ts`)
- **Managed Channels**: 34 premium sports channels (Star Sports 1/2/3/Select/Regional, Sony Ten 1/2/3/4/5, Eurosport, DD Sports).
- **Stream Format**: Dynamic DASH (`application/dash+xml` `.mpd` manifests) with Akamai HMAC SHA-256 tokens (`__hdnea__`).
- **DRM Standard**: W3C ClearKey (`urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b`).
- **Manifest Rewriter (`MdtvService.getRewrittenManifest`)**:
  1. Downloads upstream `.mpd` using authentic Akamai headers.
  2. Substitutes relative `<BaseURL>` tags with absolute JioTV CDN base URLs so downstream players don't request chunks from localhost.
  3. Injects W3C ClearKey `ContentProtection` descriptors alongside Widevine so browser players negotiate ClearKey without CDM errors.
- **Kodi Integration in `sports.m3u`**:
  ```m3u
  #EXTINF:-1 tvg-id="1106" tvg-name="Star Sports 1 HD" group-title="Cricket",Star Sports 1 HD
  #KODIPROP:inputstream.adaptive.manifest_type=mpd
  #KODIPROP:inputstream.adaptive.license_type=clearkey
  #KODIPROP:inputstream.adaptive.license_key=965dc2ddb1d85138ad787999a7f30ca5:859695076e67fe961836b564db6d689c
  http://localhost:3000/live.php?token=STALKER_PRO&id=mdtv-1106&m3u=1
  ```

---

### 📡 B. TimStreams & EpiEmbeds Engine (`src/services/timstreamsService.ts`)
- **Primary Upstream Mirror**: `https://timstreams.co.rw/` (with fallback to `timst.top`, `timst.cfd`).
- **Endpoints**:
  - `/api/streams`: 3 categories (Events, Replays, 24/7 Channels).
  - `/api/channels`: 219+ live channels with embed URLs (`https://ehgembxe.cfd/nhmzkzez-...`).
- **Deobfuscation Cipher**:
  The embed HTML contains an encrypted array of integers. The service executes an XOR and subtraction cipher to extract the dynamic CDN URL:
  ```typescript
  decoded += String.fromCharCode(((arr[i] ^ k1) - k2 + 256) & 255);
  ```
- **Stream Resolution (`resolveTimChannel`)**:
  Resolves channel slugs (e.g. `abc`, `sky-sports-cricket`, `willow`) into live `.m3u8` manifests (e.g. `https://tims-001.sytes.net/main/secure/<hash>/<timestamp>/abc-usa.m3u8`).
- **Caching**: 60-second in-memory TTL prevents upstream rate-limiting during channel surfing.

---

### 📡 C. Master JioTV & SonyLIV Engine (`src/services/jtvService.ts`)
- **Channel Inventory**: 1400+ channels categorized by Language, Genre, and Quality (HD/FHD).
- **Multi-Source SonyLIV & Hotstar Sync**:
  Automatically merges SonyLIV live matches and Hotstar channels into unified M3U manifests.
- **Auto-Sync to Firestore**:
  Periodically updates `assets/jtv2.json` and syncs chunked playlists to Cloud Firestore.

---

### 📡 D. BitTorrent Streaming Subsystem (`torrserver/` & `src/routes/torrent.ts`)
- **Embedded Engine**: Native Go binary running as a managed background child process on port `8090`.
- **Functionality**:
  - Accepts magnet links or `.torrent` files.
  - Pre-buffers head/tail metadata pieces in RAM to allow instant playback seeking without downloading the whole file.
  - Exposes HTTP sequential streams playable in browser video elements and VLC/Kodi.

---

### 🛡️ E. Multi-Layer Security & Dead Kill Engine
1. **L7 Perimeter Defense Shield (`src/services/perimeterDefense.ts`)**:
   - Outermost middleware executing before all routes.
   - Detects and drops automated scanners and exploit tools (`sqlmap`, `nikto`, `masscan`, `nuclei`, `puppeteer`, `playwright`, `selenium`, `python-requests`, `aiohttp`, `scrapy`, `urllib`).
   - Active Honeypot traps (`/.env`, `/.git`, `/wp-login.php`, `/xmlrpc.php`, `/phpmyadmin`, `/actuator`, etc.) ban offending IPs for 24 hours.
   - High-frequency burst rate limiter (>40 req/s).
2. **Anti-SSRF Proxy Guards (`src/proxy.ts` & `src/services/comicsService.ts`)**:
   - `isStreamingTargetAllowed`: Validates that incoming proxy URLs belong to authorized streaming CDNs (blocks private IP ranges `10.0.0.0/8`, `192.168.0.0/16`, `127.0.0.1`, `localhost`, AWS metadata `169.254.169.254`).
   - `isAllowedComicHost`: Enforces strict allowlist on image relays to prevent server relay abuse.
3. **Dead Kill Lockdown Mode (`server.ts` & `src/routes/admin.ts`)**:
   - Activated via the Maintenance UI or `POST /api/admin/maintenance/dead-kill`.
   - When engaged, `systemState.deadKill` instantly terminates all active stream connections.
   - All non-admin requests receive a bare white HTTP 403 Forbidden page:
     ```html
     <!DOCTYPE html><html><head><title>403 Forbidden</title></head>
     <body style="background:#fff;color:#000;font-family:sans-serif;padding:40px;">
     <h1>403 Forbidden</h1><p>Server Died / Prohibited State.</p>
     </body></html>
     ```

---

### 📡 F. Reverse Proxy Pipeline (`src/proxy.ts`)
- **MPEG-TS Sync Byte Cleaner (`cleanTsBuffer`)**:
  Strips prepended fake RIFF/WebP bytes inserted by CDNs to fool browser media engines.
- **HLS Segment RAM Prefetch Cache**:
  Asynchronously fetches live edge chunks into memory, delivering sub-second response times for players.
- **Header Masking & Origin Spoofing**:
  Dynamically applies matching `Referer` and `Origin` headers based on destination CDN domain (e.g., `timstreams.co.rw`, `sonyliv.com`, `hamis.romponalis.st`).

---

## 5. API Endpoints Reference

### Live Sports & Playlists
| Endpoint | Method | Purpose | Response Format |
|---|---|---|---|
| `/sports.m3u` | `GET` | Master live sports playlist with ClearKey DRM tags | `application/vnd.apple.mpegurl` |
| `/api/sports/channels` | `GET` | JSON sports channel catalog | `application/json` |
| `/api/sports/live-events` | `GET` | Live sports schedule synced from TimStreams | `application/json` |
| `/api/mdtv/manifest/:id.mpd` | `GET` | Rewritten DASH MPD manifest with ClearKey UUID | `application/dash+xml` |
| `/api/play_stream/:id` | `GET` | Direct 302 redirect to active video stream | HTTP 302 $\rightarrow$ Stream |
| `/live.php?id=:id` | `GET` | Universal stream reverse proxy handler | Video Stream / HTTP 302 |
| `/stream_proxy.php?url=...` | `GET` | SSRF-checked generic stream relay | Video Stream |

### Movies, TV Series & VOD
| Endpoint | Method | Purpose | Response Format |
|---|---|---|---|
| `/api/bingr/search` | `GET` | Search movies and TV series across 35+ clusters | `application/json` |
| `/api/bingr/sources` | `GET` | Resolve video embed sources and direct streams | `application/json` |
| `/api/consumet/trending` | `GET` | Global trending movies and entertainment | `application/json` |
| `/api/comics/read` | `GET` | Fetch comic/manga chapters | `application/json` |
| `/api/comics/proxy-image` | `GET` | SSRF-allowlisted comic image relay | Image binary |

### BitTorrent & Background Audio
| Endpoint | Method | Purpose | Response Format |
|---|---|---|---|
| `/api/torrent/play` | `GET` | Stream active torrent sequential stream from TorrServer | Video Stream |
| `/api/music/background-tracks` | `GET` | Background music playlist for arcade/games | `application/json` |

### Administration & Security
| Endpoint | Method | Purpose | Response Format |
|---|---|---|---|
| `/api/admin/maintenance/dead-kill` | `POST` | Engage or disengage Dead Kill 403 lockdown | `application/json` |
| `/api/admin/perimeter/status` | `GET` | Telemetry of banned IPs, attacks, and honeypot hits | `application/json` |
| `/api/admin/perimeter/unban` | `POST` | Remove an IP from the 24-hour ban list | `application/json` |

---

## 6. Developer & AI Agent Operating Rules

### Mandatory Practices:
1. **Never Output Embed HTML in M3U**: M3U lines must always be direct binary stream URLs (`.m3u8`, `.mpd`, `/live.php?token=STALKER_PRO&id=...`).
2. **Preserve `assets/channels.json`**: Always use `ChannelJsonService` or merge existing custom streams when syncing new scrapers.
3. **Use Native HTTP/Axios**: Do not introduce Puppeteer or Chromium processes; all scrapers must remain headless-free and lightweight.
4. **Clean TS Buffers**: When proxying raw MPEG-TS, always pass buffers through `cleanTsBuffer()` to strip non-standard sync bytes.
5. **Anti-SSRF Compliance**: Any endpoint taking a user-supplied URL (`/stream_proxy.php`, `/api/comics/proxy-image`) must validate against `isStreamingTargetAllowed` or `isAllowedComicHost`.
6. **Primary Tab Icon**: All frontend HTML/PHP pages must feature `/apple-touch-icon.png` as their primary `<link rel="icon">`.
7. **Maintenance & Dead Kill Integrity**: Never remove the Dead Kill button or its backend functionality.

---

## 7. Common Troubleshooting & Runbook

| Issue | Root Cause | Remediation |
|---|---|---|
| **EADDRINUSE: 3000** | Lingering Node process holding port | Run `Get-Process -Name node \| Stop-Process -Force` in PowerShell. |
| **Stream returns 403 Forbidden** | Upstream CDN requires referer or `__hdnea__` token | Check referer routing in `src/proxy.ts` and verify token in `mdtvService.ts`. |
| **Kodi / VLC black screen on DASH** | Missing Kodi ClearKey properties in M3U | Ensure `#KODIPROP:inputstream.adaptive.license_type=clearkey` and `#KODIPROP:inputstream.adaptive.license_key` are present. |
| **Dead Kill Engaged** | Server in prohibited mode | Send `POST /api/admin/maintenance/dead-kill` with `{ "enabled": false }` using admin credentials. |
| **TimStreams Streams Failing** | Upstream domain rotated | Verify primary mirror in `src/services/timstreamsService.ts` (`https://timstreams.co.rw/`). |
