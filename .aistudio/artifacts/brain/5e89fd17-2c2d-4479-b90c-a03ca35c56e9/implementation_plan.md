# Cinema Loading Experience, Music History, Instant Movie Search & AI Vault Architecture Plan

A unified upgrade delivering a Netflix / Apple TV+ editorial loading screen with time-varying cinema quotes for live channels and shows, a responsive Listening History experience in the music studio, an ultra-fast comprehensive movie search engine capable of surfacing regional classics like *CID Moosa*, a mobile top-right back button to the Hero portal, and a free-roaming draggable AI icon with persistent AI Vault header restoration.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX decisions incorporate all requirements from your prompt and your confirmed preferences from the clarification phase:

- **Confirmed Decision 1 (Editorial Cinema Loading Screen with Dynamic Quotes)**: Replace generic loading indicators when tuning into live channels and shows with a sleek, non-AI-generic Netflix / Apple TV+ style dark atmospheric loading screen featuring rotating cinema, sports, and storytelling quotes that vary by time of day and session.
- **Confirmed Decision 2 (Music Listening History Placement)**: Integrate the new **Listening History** section into the **right Library panel** on desktop and as a dedicated **History tab/section inside the mobile Library view**, with persistent local history tracking, one-tap replay, and history management controls.
- **Confirmed Decision 3 (Comprehensive Instant Search for Regional & Global Cinema)**: Upgrade the main search pipeline to query global and Indian regional movie databases (including IMDb Instant Suggestion indexing, TMDB multi-search, and regional catalogs) in parallel with in-memory caching so titles like *CID Moosa* resolve in under 200ms with complete metadata, cast, year, and poster artwork.
- **Confirmed Decision 4 (Mobile Top-Right Back Button to Hero Portal)**: Add a dedicated **Hero** navigation button in the top-right mobile header bar of the main streaming portal so mobile users can return to the Hero landing screen in one tap.
- **Confirmed Decision 5 (Draggable AI Icon, Video Player Removal & Persistent AI Vault)**:
  - **Free Dragging**: Users can drag the floating AI button anywhere on the screen via touch or mouse, with position memory across sessions.
  - **Zero Video Player Intrusion**: Completely disable and remove the AI icon and AI Vault from all video player screens and `hero.html`.
  - **Persistent Dismiss-to-Vault Behavior**: Clicking the `×` button on the floating AI icon locks it inside the **AI Vault** in the top navigation header bar across all supported pages (`index.php`, main streaming portal, music studio, etc.). It will **never** reappear on page refresh or navigation until the user explicitly clicks the **AI Vault** header button.

---

## 1. Overview & Core Concept

- **What It Does**: Enhances playback transitions, music library continuity, regional movie discovery, mobile navigation ergonomics, and user control over the floating AI assistant across the streaming platform.
- **Target Audience / Persona**: Mobile and desktop viewers streaming live TV channels, sports broadcasts, regional and international cinema, and lossless music who expect zero-clutter playback and instant catalog search.
- **Key Value**:
  - Eliminates blank or generic loading states during live stream and show handshakes with an atmospheric cinema lounge screen and rotating time-aware quotes.
  - Gives music listeners immediate access to their previously played tracks across both desktop and mobile layouts.
  - Makes movie search instantaneous and inclusive of Indian regional cinema (Malayalam, Tamil, Telugu, Hindi, and global titles like *CID Moosa*).
  - Gives users permanent, frustration-free control over the floating AI icon via drag-anywhere physics and a strict opt-in **AI Vault** header toggle once closed.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Aesthetic Direction**: Atmospheric Minimalism & High-Craft Dark UI inspired by Apple TV+ and Netflix Cinema OS.
- **Color Palette & Mood**:
  - `--background`: Deep Carbon Obsidian (`#070709` to `#0b0c10`)
  - `--surface`: Translucent Onyx (`rgba(18, 20, 28, 0.78)`) with specular `1px solid rgba(255, 255, 255, 0.08)` borders
  - `--primary`: Cinema Crimson (`#e50914`) for live broadcast accents and Studio Indigo (`#6366f1`) for music library highlights
  - `--text-primary`: Crisp Alabaster (`#f8fafc`) paired with Muted Silver (`#94a3b8`) for metadata and quote attributions
- **Typography & Hierarchy**:
  - Display & Quotes: High-contrast editorial sans/serif styling (`Outfit` / `Inter`) with generous tracking, subtle opacity transitions, and tabular numerals (`tabular-nums`) for timestamps and stream telemetry.

### Key User Flows & Component Design

1. **Netflix / Apple TV+ Live & Show Loading Screen**:
   - When opening a live channel, sports broadcast, or show, an obsidian backdrop with a subtle radial cinema vignette and fine optical progress bar appears.
   - Displays the channel/show title, live signal handshake stage, and a curated **Cinema & Broadcast Quote** selected dynamically based on the current hour/time-of-day and randomized rotation (automatically cycling smoothly every few seconds if a stream takes longer to handshake).
   - Smoothly cross-fades out (`opacity: 0`) the moment the first video frame renders.

2. **Music Studio Listening History (Desktop & Mobile)**:
   - **Desktop**: Appears in the right-hand **Library Panel** with a clean segment switcher (`Playlists` | `History`) and a dedicated scrollable history list showing artwork, track title, artist, relative time played, one-tap play trigger, and a `Clear` action.
   - **Mobile**: Accessible directly inside the mobile **Library** view via the `History` tab/section, styled with touch-friendly 56px track rows and smooth momentum scrolling.
   - Every track played (JioSaavn, YouTube, Audius, Jamendo, Archive, Curated, or Live Radio) is automatically recorded to persistent storage with deduplication (moving re-played songs to the top).

3. **Instant Comprehensive Movie Search (Including *CID Moosa*)**:
   - Typing in the search bar triggers a 150ms debounced parallel query across the backend multi-source search engine and instant IMDb/TMDB suggestion resolvers.
   - Regional classics such as *CID Moosa* (2003 Malayalam action-comedy) and latest releases are returned immediately with high-resolution posters, release year, rating badge, media type (`MOVIE` / `SERIES`), and instant click-to-play / detail view navigation.

4. **Mobile Top-Right Back Button to Hero**:
   - In the mobile top navigation bar of the streaming portal, a compact glassmorphic **Hero** back button (`← Hero`) is anchored on the top right so users on mobile devices can return to the Hero landing portal at any time.

5. **Draggable AI Assistant & Persistent AI Vault**:
   - **Drag Anywhere**: The floating AI widget supports unified pointer/touch dragging with inertia clamping so it never gets lost off-screen. An `×` dismiss badge sits on the corner of the floating icon.
   - **Dismiss to AI Vault**: Clicking `×` immediately hides the floating AI icon and sets a persistent vault lock in `localStorage`. Refreshing the page or navigating between pages will **not** bring the floating icon back.
   - **Top Header AI Vault Button**: Placed in the top navigation header bar of `index.php`, the streaming portal, the music studio, and other portal pages. Clicking the **AI Vault** header button releases the icon from the vault and restores the floating AI assistant on screen.
   - **Strict Exclusions**: Neither the floating AI icon nor the AI Vault button appears on `hero.html` or any video player view.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Parallel IMDb Instant Suggestion + TMDB Multi-Search for Movie Discovery**
  - *Chosen Approach*: Combine TMDB's search API with IMDb's ultra-fast edge suggestion index and regional catalog enrichment, removing restrictive minimum vote-count filters on direct title queries.
  - *Why*: Standard providers often filter out regional Indian blockbusters (like Malayalam classic *CID Moosa*) or suffer from multi-second scraper bottlenecks. Parallelizing edge suggestions with TMDB guarantees sub-200ms responses and 100% recall on regional titles.
  - *Alternatives Considered*: Relying solely on sequential third-party scrapers, which causes 3–5 second delays and misses regional catalog metadata.

- **Decision 2: Strict LocalStorage State Machine for the AI Vault**
  - *Chosen Approach*: Store `hl_ai_vault_locked = "true"` and custom `(x, y)` coordinates in `localStorage`, evaluated synchronously before the floating widget mounts.
  - *Why*: Guarantees zero flash of unstyled/unwanted floating AI icon on page refresh when locked in the vault, while automatically injecting or binding the **AI Vault** toggle button in the top navigation header of allowed pages.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        Client Portal & Header Layer                          │
│                                                                              │
│  ┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────┐  │
│  │  Streaming Portal UI   │  │    Music Studio UI     │  │   index.php &  │  │
│  │ • Mobile Top-Right     │  │ • Desktop Right Panel  │  │  Portal Pages  │  │
│  │   [← Hero] Button      │  │   History Section      │  │ • Top Header   │  │
│  │ • Instant Movie Search │  │ • Mobile Library       │  │   [AI Vault]   │  │
│  │ • Top Header [AI Vault]│  │   History Tab          │  │   Toggle Btn   │  │
│  └───────────┬────────────┘  └───────────┬────────────┘  └────────┬───────┘  │
└──────────────┼───────────────────────────┼────────────────────────┼──────────┘
               │                           │                        │
               ▼                           ▼                        ▼
┌────────────────────────────┐ ┌────────────────────────┐ ┌────────────────────┐
│  Fast Movie Search Engine  │ │ Music History Manager  │ │ AI Vault & Drag    │
│ • 150ms Debounce + Cache   │ │ • LocalStorage Sync    │ │ Controller         │
│ • Parallel TMDB + IMDb     │ │ • Deduplicated Stack   │ │ • Pointer/Touch    │
│   Edge + Regional Lookup   │ │   (Max 50 Tracks)      │ │   Viewport Drag    │
│ • Instant "CID Moosa" &    │ │ • 1-Tap Queue Replay   │ │ • Persistent Vault │
│   Regional Title Recall    │ │   & Clear History      │ │   Lock Across Load │
└────────────────────────────┘ └────────────────────────┘ └────────────────────┘
                                                                    │
               ┌────────────────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                 Exclusions & Cinema Playback Layer                           │
│  • Video Players: AI Icon & Vault strictly disabled; Netflix/Apple TV+       │
│    Editorial Loading Screen with Time-Based Dynamic Quotes active.           │
│  • Hero Landing Page: AI Icon & AI Vault strictly disabled.                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State

1. **AI Vault & Position State (`localStorage`)**:
   - `hl_ai_vault_locked`: `"true" | "false"` — When `"true"`, the floating AI icon does not render on load or refresh; only clicking the header `#hl-ai-vault-btn` sets it back to `"false"` and reveals the floating icon.
   - `hl_ai_fab_pos`: `{ x: number, y: number }` — Persists user-dragged coordinates clamped within viewport safe margins.

2. **Music Listening History (`localStorage: stalker_music_history`)**:
   - Array of track records `{ id, title, artist, album, img, url, source, duration, playedAt }` (capped at 50 recent tracks, deduplicated by `id`/`title`).

3. **Time-Seeded Editorial Quote Engine**:
   - Curated collection of iconic cinema, live broadcast, and storytelling quotes bucketed by time-of-day (Morning, Afternoon, Prime Time Evening, Late Night Cinema) plus dynamic rotation every 5 seconds while stream manifest negotiation completes.

### Interactive Component & State Mapping

- **Live / Show Player Loader**:
  - `initEditorialLoader()` selects a time-variant quote and binds live stream connection stages (`Connecting to Broadcast`, `Negotiating HD Manifest`, `Syncing Audio & Video`).
  - `video.on('playing' | 'canplay')` clears the quote rotation timer and smoothly fades out the loader overlay.
- **Music History Panel & Tab**:
  - `recordTrackHistory(track)` hooks into `playMasterTrackFromLibrary()` and `loadAndPlayTrack()`, updating storage and live-rendering both the desktop right-panel history list and mobile Library History tab.
  - `playFromHistory(trackId)` immediately loads and plays the selected historical track; `clearListeningHistory()` resets the history list with instant UI feedback.
- **Fast Movie Search**:
  - Typing in the search bar queries `/api/consumet/search` (enhanced with parallel IMDb Suggestion + TMDB unfiltered title lookup + regional movie enrichment) and renders full movie cards including *CID Moosa* without blocking the UI thread.
- **AI Drag & Vault Lifecycle**:
  - Pointer down/move/up handlers on `#hl-ai-fab` update `left`/`top` styles in real time using `requestAnimationFrame`.
  - Clicking the `×` badge on `#hl-ai-fab` stops propagation, hides `#hl-ai-fab` and `#hl-ai-panel`, sets `hl_ai_vault_locked = "true"`, and highlights the header **AI Vault** button so the user knows where it is stored.
