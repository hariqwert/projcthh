<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>MANGANEX — Stories Without Limits</title>
    <meta name="description" content="Discover thousands of manga and comics from around the world. Simple. Fast. Beautiful.">
    <meta name="referrer" content="no-referrer">

    <!-- Suppress Tailwind CDN dev warning and configure palette -->
    <script>
        const _origWarn = console.warn;
        console.warn = function(...args) {
            if (args[0] && typeof args[0] === 'string' && args[0].includes('cdn.tailwindcss.com')) return;
            _origWarn.apply(console, args);
        };
        window.tailwind = {
            config: {
                darkMode: 'class',
                theme: {
                    extend: {
                        colors: {
                            brand: {
                                500: '#ff6a00',
                                600: '#e55f00',
                                700: '#cc5400',
                            },
                            dark: {
                                950: '#07080b',
                                900: '#0a0b0f',
                                850: '#101217',
                                800: '#141720',
                                750: '#1a1d28',
                                700: '#222634',
                            }
                        }
                    }
                }
            }
        };
    </script>
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Permanent+Marker&family=Yuji+Syuku&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        * {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #07080b;
            color: #f3f4f6;
            user-select: none;
            overflow-x: hidden;
        }
        .font-mono {
            font-family: 'JetBrains Mono', monospace;
        }
        /* Custom scrollbars */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #0a0b0f;
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(255, 106, 0, 0.35);
            border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 106, 0, 0.7);
        }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        /* Glass and Card Effects */
        .glass-header {
            background: rgba(7, 8, 11, 0.90);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .manga-card {
            transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.28s ease;
        }
        .manga-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.9), 0 0 28px -6px rgba(255, 106, 0, 0.25);
        }
        .manga-card:hover .manga-title {
            color: #ff6a00;
        }

        /* Hero Celestial Visual */
        .hero-glow-moon {
            background: radial-gradient(circle at 40% 40%, #ff8c2e 0%, #ff5500 50%, #b82b00 85%, transparent 100%);
            box-shadow: 0 0 120px 30px rgba(255, 95, 0, 0.45);
        }

        /* Reader Themes */
        .reader-theme-oled { background-color: #000000 !important; }
        .reader-theme-slate { background-color: #07080b !important; }
        .reader-theme-charcoal { background-color: #12141a !important; }

        /* Reader Width Classes */
        .reader-width-comfortable { max-width: 760px; }
        .reader-width-standard { max-width: 960px; }
        .reader-width-full { max-width: 100%; width: 100%; padding: 0 !important; }

        /* Reader Gap Classes */
        .reader-gap-none { gap: 0 !important; }
        .reader-gap-none > * { margin-top: 0 !important; margin-bottom: 0 !important; }
        .reader-gap-compact { gap: 0.5rem !important; }
        .reader-gap-compact > * { margin-top: 0.5rem !important; margin-bottom: 0 !important; }
        .reader-gap-relaxed { gap: 1.5rem !important; }
        .reader-gap-relaxed > * { margin-top: 1.5rem !important; margin-bottom: 0 !important; }

        /* Shimmer placeholder & Page wrapper */
        .reader-page-wrapper {
            position: relative;
            width: 100%;
            min-height: 480px;
            background: #0d0f15;
            border-radius: 0.75rem;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.25s ease;
        }
        .reader-page-wrapper.loaded {
            min-height: auto;
            background: transparent;
        }
        .reader-gap-none .reader-page-wrapper {
            border-radius: 0 !important;
        }
        .reader-shimmer {
            background: linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 75%);
            background-size: 200% 100%;
            animation: readerShimmerAnim 1.8s infinite;
        }
        @keyframes readerShimmerAnim {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }

        .reader-page-img {
            transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease;
            will-change: transform, opacity;
        }

        /* Inside-Out Scroll Kinetic Text Reveal */
        .inside-out-word {
            display: inline-block;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, filter 0.5s ease;
            will-change: transform, opacity, filter;
        }
        .inside-out-word.word-hidden {
            opacity: 0.2;
            transform: translateY(14px) scale(0.95);
            filter: blur(4px);
        }
        .inside-out-word.word-visible {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
            filter: blur(0) !important;
        }
        @keyframes textActiveShimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        .kinetic-shimmer-orange {
            background: linear-gradient(110deg, #ff6a00 0%, #ffaa00 35%, #ffffff 55%, #ff5500 80%, #ffaa00 100%);
            background-size: 240% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: textActiveShimmer 5s linear infinite;
        }
    </style>
</head>
<body class="min-h-screen bg-[#07080b] text-gray-100 flex flex-col selection:bg-[#ff6a00]/30 selection:text-white">

    <!-- ========================================================================= -->
    <!-- 🧭 TOP NAVIGATION BAR                                                     -->
    <!-- ========================================================================= -->
    <header class="sticky top-0 z-40 w-full glass-header transition-all duration-300">
        <div class="max-w-[1520px] mx-auto px-4 sm:px-8 h-[64px] sm:h-[72px] flex items-center justify-between gap-3 sm:gap-4">
            
            <!-- Left: Back to Hero Portal Button + Brand Logo -->
            <div class="flex items-center gap-2.5 sm:gap-4 shrink-0">
                <!-- Back Button to Hero Hub -->
                <a
                    href="/hero.html"
                    class="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-[#ff6a00] hover:text-black text-gray-300 border border-white/10 hover:border-[#ff6a00] text-xs font-bold transition-all active:scale-95 shadow-sm group"
                    title="Back to Hero Platform"
                >
                    <i data-lucide="arrow-left" class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"></i>
                    <span class="font-semibold">Hero</span>
                </a>

                <div class="h-4 w-px bg-white/10"></div>

                <!-- Brand Logo: MANGANEX -->
                <a href="/comics.html" class="flex items-center gap-2.5 group">
                    <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(255,106,0,0.25)] group-hover:scale-105 transition-transform">
                        <img src="/apple-touch-icon.png" alt="Manganex" class="w-full h-full object-contain">
                    </div>
                    <span class="text-lg sm:text-2xl font-black tracking-tight text-white uppercase select-none">
                        MANGA<span class="text-[#ff6a00]">NEX</span>
                    </span>
                </a>
            </div>

            <!-- Pill Search Bar with shortcut chip '/' (Desktop) -->
            <div class="flex-1 max-w-xl mx-2 sm:mx-4 relative hidden md:block">
                <div class="relative flex items-center">
                    <i data-lucide="search" class="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none"></i>
                    <input
                        type="text"
                        id="globalSearchInput"
                        oninput="handleSearchDebounced(this.value)"
                        onkeydown="handleSearchKeyDown(event)"
                        placeholder="Search manga or comics..."
                        class="w-full h-10 pl-11 pr-12 rounded-full bg-white/[0.05] border border-white/10 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00]/50 transition-all"
                    />
                    <!-- Shortcut pill '/' -->
                    <div class="absolute right-3.5 px-2 py-0.5 rounded bg-white/10 text-gray-400 text-xs font-mono font-medium pointer-events-none">
                        /
                    </div>
                </div>

                <!-- Instant Autocomplete Floating Dropdown (Desktop) -->
                <div
                    id="searchDropdown"
                    class="absolute left-0 right-0 top-13 bg-[#0e1017]/95 backdrop-blur-xl rounded-2xl p-2 hidden z-50 border border-white/10 shadow-2xl text-left max-h-96 overflow-y-auto hide-scroll"
                >
                    <div id="searchDropdownContent" class="space-y-1"></div>
                </div>
            </div>

            <!-- Right Nav: Desktop Tabs + Avatar -->
            <div class="flex items-center gap-3 sm:gap-6 shrink-0">
                <!-- Desktop Navigation Tabs (Hidden on mobile to avoid overcrowding) -->
                <div class="hidden lg:flex items-center gap-6">
                    <button
                        onclick="switchSection('all')"
                        id="tab-all"
                        class="nav-tab relative py-1 text-xs sm:text-sm font-bold text-white transition-colors"
                    >
                        Home
                        <span id="tab-indicator-all" class="absolute bottom-[-12px] left-0 right-0 h-[2.5px] bg-[#ff6a00] rounded-full"></span>
                    </button>

                    <button
                        onclick="switchSection('manga')"
                        id="tab-manga"
                        class="nav-tab relative py-1 text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                    >
                        Manga
                        <span id="tab-indicator-manga" class="absolute bottom-[-12px] left-0 right-0 h-[2.5px] bg-[#ff6a00] rounded-full hidden"></span>
                    </button>

                    <button
                        onclick="switchSection('comics')"
                        id="tab-comics"
                        class="nav-tab relative py-1 text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                    >
                        Comics
                        <span id="tab-indicator-comics" class="absolute bottom-[-12px] left-0 right-0 h-[2.5px] bg-[#ff6a00] rounded-full hidden"></span>
                    </button>
                </div>

                <!-- User Profile Avatar -->
                <div class="flex items-center cursor-pointer group">
                    <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-[#ff6a00]/30 group-hover:ring-[#ff6a00] transition-all bg-gradient-to-tr from-[#ff6a00] to-amber-500 p-[1.5px]">
                        <img
                            src="/api/comics/proxy-image?url=https%3A%2F%2Fcdn.atsu.moe%2Fstatic%2Fposters%2FcGoOe70KFmmEBe4m.jpg"
                            alt="Avatar"
                            class="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Dedicated Mobile Segmented Tab Strip (Thumb-friendly & High-contrast) -->
        <div class="lg:hidden px-3.5 pb-2.5 pt-0.5 border-t border-white/[0.04]">
            <div class="grid grid-cols-3 gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl text-center">
                <button
                    onclick="switchSection('all')"
                    id="mob-tab-all"
                    class="py-1.5 text-xs font-bold rounded-lg transition-all bg-[#ff6a00] text-black shadow-sm"
                >
                    Home
                </button>
                <button
                    onclick="switchSection('manga')"
                    id="mob-tab-manga"
                    class="py-1.5 text-xs font-semibold rounded-lg transition-all text-zinc-400 hover:text-white"
                >
                    Manga
                </button>
                <button
                    onclick="switchSection('comics')"
                    id="mob-tab-comics"
                    class="py-1.5 text-xs font-semibold rounded-lg transition-all text-zinc-400 hover:text-white"
                >
                    Comics
                </button>
            </div>
        </div>
    </header>

    <!-- Mobile Search Bar + Mobile Autocomplete Dropdown -->
    <div class="md:hidden px-4 pt-2.5 pb-1 relative z-30">
        <div class="relative flex items-center">
            <i data-lucide="search" class="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none"></i>
            <input
                type="text"
                id="mobileSearchInput"
                oninput="handleSearchDebounced(this.value)"
                onkeydown="handleSearchKeyDown(event)"
                placeholder="Search manga or comics..."
                class="w-full h-10 pl-11 pr-4 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#ff6a00]"
            />
        </div>
        <!-- Mobile Dropdown -->
        <div
            id="mobileSearchDropdown"
            class="absolute left-4 right-4 top-13 bg-[#0e1017]/98 backdrop-blur-2xl rounded-2xl p-2 hidden z-50 border border-white/10 shadow-2xl text-left max-h-80 overflow-y-auto hide-scroll"
        >
            <div id="mobileSearchDropdownContent" class="space-y-1"></div>
        </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 🏪 STOREFRONT VIEW                                                        -->
    <!-- ========================================================================= -->
    <main id="storefrontView" class="flex-1 max-w-[1520px] mx-auto w-full px-3.5 sm:px-8 py-4 sm:py-6 transition-opacity duration-300">

        <!-- ===================================================================== -->
        <!-- 📱 1. MOBILE SPOTLIGHT HERO (Under 1024px)                            -->
        <!-- Zero Text-on-Art Collision · Dedicated Picture Frame · Crisp & Clean  -->
        <!-- ===================================================================== -->
        <section id="heroSectionMobile" class="lg:hidden relative w-full rounded-2xl overflow-hidden mb-6 bg-[#0c0e15] border border-white/10 p-5 shadow-2xl">
            <!-- Ambient Backdrop (Blurred atmospheric glow from manga cover) -->
            <div id="heroMobileBackdrop" class="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-25 scale-125 pointer-events-none transition-all duration-700"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-[#0c0e15]/85 to-[#0c0e15]/70 pointer-events-none"></div>

            <div class="relative z-10 flex flex-col space-y-4">
                <!-- Top Row: Badge + Slide Counter -->
                <div class="flex items-center justify-between pb-2 border-b border-white/10">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-[#ff6a00] animate-ping"></span>
                        <span class="text-[10px] font-mono font-black text-[#ff6a00] tracking-wider uppercase">SPOTLIGHT CONTINUUM</span>
                    </div>
                    <span id="heroMobileCounter" class="text-[10px] font-mono text-zinc-400 font-bold">01 / 03</span>
                </div>

                <!-- Animated Title & Intro Block -->
                <div>
                    <h1 class="inside-out-headline text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-2">
                        <span class="inside-out-word word-hidden">Stories</span> 
                        <span class="inside-out-word word-hidden kinetic-shimmer-orange">Without</span> 
                        <span class="inside-out-word word-hidden">Limits</span>
                    </h1>
                    <p id="heroMobileDesc" class="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                        Discover thousands of manga and comics from around the world. Simple. Fast. Beautiful.
                    </p>
                </div>

                <!-- Split Showcase Card (Poster Frame + Chapter Info) -->
                <div class="flex gap-3.5 items-center p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <!-- Dedicated Poster Frame (Zero text on top) -->
                    <div onclick="openCurrentHeroDetails()" class="w-20 sm:w-24 aspect-[3/4] rounded-lg overflow-hidden shadow-lg border border-white/15 shrink-0 bg-[#141720] relative cursor-pointer group active:scale-95 transition-transform">
                        <img
                            id="heroMobilePoster"
                            src="/api/comics/proxy-image?url=https%3A%2F%2Fcdn.atsu.moe%2Fstatic%2Fposters%2FcGoOe70KFmmEBe4m.jpg"
                            alt=""
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onerror="handleHeroImageError(this)"
                        />
                        <span class="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/85 text-[9px] font-mono font-black text-[#ff6a00] border border-white/10">
                            #1
                        </span>
                    </div>

                    <!-- Details -->
                    <div class="flex-1 min-w-0 flex flex-col justify-center">
                        <span id="heroMobileTag" class="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block mb-0.5 truncate">
                            SHONEN • SUPERNATURAL
                        </span>
                        <h2 id="heroMobileTitle" class="text-sm sm:text-base font-black text-white leading-snug truncate mb-1">
                            Jujutsu Kaisen
                        </h2>
                        <p id="heroMobileChapter" class="text-[11px] font-mono font-bold text-[#ff6a00]">
                            Chapter 271 · Latest
                        </p>
                    </div>
                </div>

                <!-- Clean Non-Overlapping Action Buttons -->
                <div class="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                        onclick="readCurrentHero()"
                        class="h-10 px-4 rounded-xl bg-[#ff6a00] hover:bg-[#e65f00] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 active:scale-95 transition-all"
                    >
                        <span>Start Reading</span>
                        <span class="text-sm">→</span>
                    </button>
                    <button
                        onclick="scrollToShelf('trendingNowShelf')"
                        class="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-all active:scale-95 flex items-center justify-center"
                    >
                        Explore Now
                    </button>
                </div>

                <!-- Bottom Row: Navigation Dots & Prev/Next Arrows -->
                <div class="flex items-center justify-between pt-2 border-t border-white/5">
                    <div id="heroMobileIndicators" class="flex items-center gap-1.5">
                        <!-- Dynamically populated dots -->
                    </div>
                    <div class="flex items-center gap-2">
                        <button
                            onclick="prevHeroSlide()"
                            class="w-8 h-8 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center text-zinc-300 text-sm active:scale-90"
                            title="Previous"
                        >
                            ‹
                        </button>
                        <button
                            onclick="nextHeroSlide()"
                            class="w-8 h-8 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center text-zinc-300 text-sm active:scale-90"
                            title="Next"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===================================================================== -->
        <!-- 💻 2. DESKTOP CINEMATIC HERO (Visible on screens >= 1024px)           -->
        <!-- Celestial Moon Glow Composition · Spacious Editorial Typography        -->
        <!-- ===================================================================== -->
        <section id="heroSection" class="hidden lg:flex relative w-full rounded-3xl overflow-hidden mb-12 bg-[#0a0b0f] border border-white/[0.08] min-h-[520px] p-8 lg:p-12 items-center">
            <!-- Ambient Celestial Backdrop Glow -->
            <div class="absolute right-12 top-10 w-80 h-80 rounded-full hero-glow-moon opacity-80 pointer-events-none transition-all duration-700"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-[#0a0b0f] via-[#0a0b0f]/80 to-transparent pointer-events-none z-10"></div>

            <div class="relative z-20 w-full grid grid-cols-12 gap-8 items-center">
                <!-- Left Column: Headline, Subtitle, CTAs & Indicators (7 Cols) -->
                <div class="col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                        <!-- Tag: — READ • EXPLORE • GET LOST -->
                        <div class="flex items-center gap-2.5 mb-3 text-gray-400 font-bold tracking-[0.2em] text-xs uppercase select-none">
                            <span class="w-5 h-[2px] bg-[#ff6a00]"></span>
                            <span id="heroTag">READ • EXPLORE • GET LOST</span>
                        </div>

                        <!-- Responsive Animated Headline: Stories Without Limits -->
                        <h1 class="inside-out-headline text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-4 pt-1">
                            <span class="inside-out-word word-hidden">Stories</span> <br />
                            <span class="inside-out-word word-hidden kinetic-shimmer-orange">Without</span> 
                            <span class="inside-out-word word-hidden">Limits</span>
                        </h1>

                        <!-- Subtitle -->
                        <p id="heroSubtitle" class="text-base text-gray-300 max-w-lg font-normal leading-relaxed mb-6">
                            Discover thousands of manga and comics from around the world. Simple. Fast. Beautiful.
                        </p>

                        <!-- Clean CTAs: Start Reading → & Explore Now -->
                        <div class="flex items-center gap-4 flex-wrap mb-6">
                            <button
                                id="btnHeroStartReading"
                                onclick="readCurrentHero()"
                                class="px-8 py-3.5 rounded-full bg-[#ff6a00] hover:bg-[#e65f00] text-black font-extrabold text-base flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.03] active:scale-95"
                            >
                                <span>Start Reading</span>
                                <span class="text-lg leading-none">→</span>
                            </button>

                            <button
                                onclick="scrollToShelf('trendingNowShelf')"
                                class="px-7 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium text-base border border-white/10 transition-all hover:border-white/20"
                            >
                                Explore Now
                            </button>
                        </div>
                    </div>

                    <!-- Bottom Carousel Navigation Arrows & Indicators -->
                    <div class="flex items-center gap-3 pt-2">
                        <button
                            onclick="prevHeroSlide()"
                            class="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white transition-all text-sm"
                            title="Previous Slide"
                        >
                            ‹
                        </button>

                        <div id="heroIndicators" class="flex items-center gap-2">
                            <button onclick="setHeroSlide(0)" class="w-8 h-1 rounded-full bg-[#ff6a00] transition-all"></button>
                            <button onclick="setHeroSlide(1)" class="w-8 h-1 rounded-full bg-white/20 hover:bg-white/40 transition-all"></button>
                            <button onclick="setHeroSlide(2)" class="w-8 h-1 rounded-full bg-white/20 hover:bg-white/40 transition-all"></button>
                        </div>

                        <button
                            onclick="nextHeroSlide()"
                            class="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white transition-all text-sm"
                            title="Next Slide"
                        >
                            ›
                        </button>
                    </div>
                </div>

                <!-- Right Column: Artwork Showcase & Constrained Index (5 Cols) -->
                <div class="col-span-5 relative flex items-center justify-end gap-6">
                    <!-- Manga Character Artwork Frame -->
                    <div class="relative w-64 lg:w-72 aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#12141c]">
                        <img
                            id="heroCharacterImg"
                            src="/api/comics/proxy-image?url=https%3A%2F%2Fcdn.atsu.moe%2Fstatic%2Fposters%2FcGoOe70KFmmEBe4m.jpg"
                            alt=""
                            onerror="handleHeroImageError(this)"
                            class="w-full h-full object-cover filter contrast-110 brightness-100 transition-all duration-700"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                        <div
                            id="heroBottomCallout"
                            onclick="readCurrentHero()"
                            class="absolute bottom-4 left-4 right-4 cursor-pointer group flex flex-col items-start"
                        >
                            <div class="flex items-center gap-1.5 text-sm font-extrabold text-white group-hover:text-[#ff6a00] transition-colors">
                                <span id="heroCalloutTitle">Solo Leveling</span>
                                <span class="text-[#ff6a00]">→</span>
                            </div>
                            <div id="heroCalloutChapter" class="text-xs text-gray-300 font-medium">
                                Chapter 201
                            </div>
                        </div>
                    </div>

                    <!-- Right Vertical Slide Index (01 —, 02, 03) Constrained inside Right Column -->
                    <div class="flex flex-col gap-5 text-xs font-mono font-bold shrink-0">
                        <button onclick="setHeroSlide(0)" id="vertIndex-0" class="text-[#ff6a00] flex items-center gap-1.5 transition-colors cursor-pointer">
                            <span>01</span>
                            <span class="w-3 h-[2px] bg-[#ff6a00]"></span>
                        </button>
                        <button onclick="setHeroSlide(1)" id="vertIndex-1" class="text-gray-500 hover:text-gray-300 flex items-center gap-1.5 transition-colors cursor-pointer">
                            <span>02</span>
                        </button>
                        <button onclick="setHeroSlide(2)" id="vertIndex-2" class="text-gray-500 hover:text-gray-300 flex items-center gap-1.5 transition-colors cursor-pointer">
                            <span>03</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===================================================================== -->
        <!-- 🇯🇵 MANGA & MANHWA SECTIONS                                           -->
        <!-- ===================================================================== -->
        <div id="mangaGroupSection">
            <!-- 📚 SUBSECTION 1: "TRENDING NOW" (01 to 08 EXACT REFERENCE) -->
            <section id="trendingNowShelf" class="mb-14 relative">
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-[#ff6a00]"></span>
                        <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            Trending Now
                        </h2>
                    </div>
                    <button onclick="switchSection('manga')" class="text-sm font-semibold text-[#ff6a00] hover:text-[#ff8533] flex items-center gap-1 transition-colors">
                        <span>View All</span>
                        <span class="text-base leading-none">→</span>
                    </button>
                </div>

                <div class="relative group">
                    <div
                        id="trendingScrollContainer"
                        class="flex items-stretch gap-4 sm:gap-5 overflow-x-auto hide-scroll pb-2 scroll-smooth"
                    >
                        <!-- 8 Ranked Cards (01 to 08) Populated Dynamically -->
                    </div>

                    <button
                        onclick="scrollShelfRight('trendingScrollContainer')"
                        class="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#12141c]/90 border border-white/10 hover:border-white/30 text-white flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all z-20 hover:scale-105 active:scale-95"
                        title="Scroll Next"
                    >
                        <i data-lucide="chevron-right" class="w-5 h-5 text-gray-200"></i>
                    </button>
                </div>
            </section>

            <!-- 📚 SUBSECTION 2: "LATEST UPDATES" (WITH ORANGE "NEW" BADGES) -->
            <section id="latestUpdatesShelf" class="mb-14 relative">
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-[#ff6a00]"></span>
                        <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            Latest Manga Updates
                        </h2>
                    </div>
                    <button onclick="switchSection('manga')" class="text-sm font-semibold text-[#ff6a00] hover:text-[#ff8533] flex items-center gap-1 transition-colors">
                        <span>View All</span>
                        <span class="text-base leading-none">→</span>
                    </button>
                </div>

                <div class="relative group">
                    <div
                        id="latestUpdatesScrollContainer"
                        class="flex items-stretch gap-4 sm:gap-5 overflow-x-auto hide-scroll pb-2 scroll-smooth"
                    >
                        <!-- Latest update cards with "NEW" badges populated dynamically -->
                    </div>

                    <button
                        onclick="scrollShelfRight('latestUpdatesScrollContainer')"
                        class="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#12141c]/90 border border-white/10 hover:border-white/30 text-white flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all z-20 hover:scale-105 active:scale-95"
                        title="Scroll Next"
                    >
                        <i data-lucide="chevron-right" class="w-5 h-5 text-gray-200"></i>
                    </button>
                </div>
            </section>
        </div>

        <!-- ===================================================================== -->
        <!-- 🦸 WESTERN COMICS & GRAPHIC NOVELS VAULT SECTION                     -->
        <!-- ===================================================================== -->
        <div id="comicsGroupSection" class="mb-16">
            <section id="westernShelf" class="relative">
                <div class="flex items-center justify-between mb-5">
                    <div class="flex items-center gap-2.5">
                        <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            Western Comics & Graphic Novel Vault
                        </h2>
                        <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                            ILLUSTRATED CLASSICS
                        </span>
                    </div>
                </div>

                <div id="westernComicsGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
                    <!-- Western cards populated dynamically -->
                </div>
            </section>
        </div>
    </main>

    <!-- ========================================================================= -->
    <!-- 📖 2. NEXT-GEN IMMERSIVE COMIC & MANGA READER                             -->
    <!-- ========================================================================= -->
    <div id="readerView" class="fixed inset-0 z-50 bg-[#07080b] flex flex-col hidden select-none">

        <!-- Top Precision Orange Progress Bar -->
        <div class="w-full h-1 bg-[#12141c] z-40">
            <div id="readerProgressBar" class="h-full bg-[#ff6a00] w-0 transition-all duration-150"></div>
        </div>

        <!-- Floating Glass Top HUD Bar -->
        <header id="readerTopHud" class="h-16 px-2.5 sm:px-6 bg-[#0c0d14]/90 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between z-30 transition-all duration-300 gap-2 sm:gap-4 overflow-hidden shadow-xl">
            <div class="flex items-center gap-2 sm:gap-4 min-w-0 shrink-0 max-w-[32%] sm:max-w-none">
                <button
                    onclick="closeReader()"
                    class="p-2 sm:px-3 sm:py-2 rounded-xl text-gray-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors flex items-center gap-2 text-xs font-semibold shrink-0"
                >
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                    <span class="hidden sm:inline">Store</span>
                </button>

                <div class="h-5 w-px bg-white/10 hidden sm:block"></div>

                <div class="min-w-0">
                    <h3 id="readerTitle" class="text-xs sm:text-sm font-bold text-white truncate leading-tight"></h3>
                    <p id="readerChapterLabel" class="text-[10px] sm:text-[11px] text-[#ff6a00] font-mono truncate"></p>
                </div>
            </div>

            <!-- Scrollable Controls Wrapper on Mobile so no buttons (including Fullscreen) get cut off -->
            <div class="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto hide-scroll shrink min-w-0 py-1 pl-1 pr-0.5">
                <select
                    id="readerChapterSelect"
                    onchange="changeChapter(this.value)"
                    class="h-8 sm:h-9 px-2 sm:px-3 rounded-xl bg-[#141720] border border-white/10 text-[11px] sm:text-xs text-gray-200 focus:outline-none focus:border-[#ff6a00] font-mono max-w-[95px] sm:max-w-[200px] shrink-0 truncate"
                >
                </select>

                <button
                    id="btnToggleMode"
                    onclick="toggleReadingMode()"
                    class="h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-gray-200 flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    title="Toggle between Webtoon Scroll & Paged Flip"
                >
                    <i id="modeIcon" data-lucide="scroll" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff6a00]"></i>
                    <span id="modeLabel" class="hidden md:inline">Webtoon</span>
                </button>

                <div class="h-8 sm:h-9 flex items-center gap-0.5 sm:gap-1 bg-white/[0.05] border border-white/10 rounded-xl px-1 sm:px-1.5 py-0.5 shrink-0">
                    <button onclick="zoomOut()" class="w-6 h-6 sm:w-7 sm:h-7 text-gray-300 hover:text-white flex items-center justify-center font-bold active:scale-90 cursor-pointer" title="Zoom Out (-)">
                        <i data-lucide="zoom-out" class="w-3.5 h-3.5"></i>
                    </button>
                    <span id="zoomLevelLabel" onclick="resetZoom()" class="text-[9px] sm:text-[10px] font-mono font-bold text-[#ff6a00] px-0.5 cursor-pointer" title="Tap to Reset Zoom">100%</span>
                    <button onclick="zoomIn()" class="w-6 h-6 sm:w-7 sm:h-7 text-gray-300 hover:text-white flex items-center justify-center font-bold active:scale-90 cursor-pointer" title="Zoom In (+)">
                        <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i>
                    </button>
                </div>

                <!-- Quick Page Jump Button -->
                <button
                    onclick="togglePageGridModal()"
                    class="h-8 sm:h-9 px-2.5 rounded-xl text-gray-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    title="Quick Page Jump Grid"
                >
                    <i data-lucide="layout-grid" class="w-3.5 h-3.5 text-zinc-400"></i>
                    <span class="text-[10px] font-mono hidden lg:inline">Pages</span>
                </button>

                <!-- Zen Full Immersion Button -->
                <button
                    id="btnZenMode"
                    onclick="toggleZenMode()"
                    class="h-8 sm:h-9 px-2.5 rounded-xl text-gray-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    title="Zen Mode (Immersive View)"
                >
                    <i data-lucide="eye" class="w-3.5 h-3.5 text-emerald-400"></i>
                    <span class="text-[10px] font-semibold hidden lg:inline">Zen</span>
                </button>

                <button
                    onclick="toggleReaderSettings()"
                    class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-gray-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center transition-colors shrink-0"
                    title="Reading Settings (Width, Theme, Gaps)"
                >
                    <i data-lucide="sliders" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
                </button>

                <button
                    onclick="toggleFullscreen()"
                    class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-gray-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center transition-colors shrink-0"
                    title="Fullscreen"
                >
                    <i data-lucide="maximize" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
                </button>
            </div>
        </header>

        <!-- Reader Display Viewport Container -->
        <div id="readerViewport" class="flex-1 relative overflow-y-auto overflow-x-hidden hide-scroll bg-[#07080b] reader-theme-slate">

            <!-- Loading Spinner State -->
            <div id="readerLoader" class="absolute inset-0 flex flex-col items-center justify-center bg-[#07080b]/90 z-20">
                <div class="w-12 h-12 border-3 border-[#ff6a00]/20 border-t-[#ff6a00] rounded-full animate-spin mb-4"></div>
                <div class="text-sm font-bold text-white tracking-wide">Resolving High-Definition Scans...</div>
                <div id="readerLoaderSub" class="text-xs text-gray-400 font-mono mt-1">Connecting to CDN Scraper</div>
            </div>

            <!-- Error State -->
            <div id="readerError" class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 hidden">
                <div class="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-3">
                    <i data-lucide="alert-triangle" class="w-6 h-6"></i>
                </div>
                <h4 class="text-base font-bold text-white mb-1">Failed to Load Chapter</h4>
                <p id="readerErrorMsg" class="text-xs text-gray-400 max-w-md mb-4"></p>
                <button onclick="retryCurrentChapter()" class="px-5 py-2.5 rounded-xl bg-[#ff6a00] text-black text-xs font-bold hover:bg-[#e65f00] transition-colors">
                    Retry Chapter
                </button>
            </div>

            <!-- 1. Webtoon Mode Container (Continuous Vertical Scroll) -->
            <div id="webtoonContainer" class="reader-width-standard mx-auto py-4 px-2 sm:px-4 space-y-2">
            </div>

            <!-- 2. Paged Flip Mode Container -->
            <div id="pagedContainer" class="absolute inset-0 flex items-center justify-center p-2 hidden">
                <div class="relative max-h-full max-w-full flex items-center justify-center">
                    <img
                        id="pagedImage"
                        src=""
                        alt="Comic Page"
                        referrerpolicy="no-referrer"
                        class="max-h-[88vh] max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-150"
                        onclick="handlePagedClick(event)"
                    />
                </div>

                <div onclick="prevPage()" class="absolute left-0 top-0 bottom-0 w-1/4 cursor-w-resize z-10 flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity">
                    <div class="w-11 h-11 rounded-full bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/10">
                        <i data-lucide="chevron-left" class="w-6 h-6"></i>
                    </div>
                </div>
                <div onclick="nextPage()" class="absolute right-0 top-0 bottom-0 w-1/4 cursor-e-resize z-10 flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity">
                    <div class="w-11 h-11 rounded-full bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/10">
                        <i data-lucide="chevron-right" class="w-6 h-6"></i>
                    </div>
                </div>
            </div>

            <!-- Bottom Chapter Advance Divider (For Webtoon Mode) -->
            <div id="webtoonBottomBar" class="max-w-xl mx-auto px-4 py-16 text-center hidden">
                <div class="bg-[#12141c] rounded-3xl p-8 border border-white/10">
                    <div class="text-[11px] font-mono text-[#ff6a00] font-bold mb-1 uppercase tracking-wider">CHAPTER COMPLETED</div>
                    <h4 id="endChapterTitle" class="text-lg font-bold text-white mb-5"></h4>
                    <div class="flex items-center justify-center gap-4">
                        <button onclick="prevChapter()" class="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-gray-300">
                            Previous Chapter
                        </button>
                        <button onclick="nextChapter()" class="px-6 py-2.5 rounded-full bg-[#ff6a00] hover:bg-[#e65f00] text-xs font-extrabold text-black flex items-center gap-1.5 shadow-lg shadow-orange-500/25">
                            <span>Next Chapter</span>
                            <span class="text-sm">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Floating Bottom Reader HUD Controls -->
        <footer id="readerBottomHud" class="h-16 px-4 sm:px-6 bg-[#0c0d14]/90 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between z-30 transition-all duration-300 gap-4 shadow-2xl">
            <button
                id="btnPrevChapter"
                onclick="prevChapter()"
                class="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
                <span class="hidden sm:inline">Prev Chapter</span>
            </button>

            <!-- Page Scrubber Slider & Quick Jump -->
            <div class="flex-1 max-w-md flex items-center gap-3">
                <input
                    type="range"
                    id="pageScrubber"
                    min="1"
                    max="1"
                    value="1"
                    oninput="handleScrubberInput(this.value)"
                    class="w-full accent-[#ff6a00] cursor-pointer h-1.5 bg-[#1a1d28] rounded-lg"
                />
                <button type="button" onclick="togglePageGridModal()" id="pageIndicator" class="bg-[#12141c] hover:bg-[#1c202d] px-3 py-1.5 rounded-xl border border-white/10 font-mono text-xs text-gray-300 shrink-0 cursor-pointer flex items-center gap-1.5 transition-colors shadow-sm" title="Click to view all pages">
                    <strong class="text-[#ff6a00]" id="curPageNum">1</strong> / <span id="totalPageNum">1</span>
                    <i data-lucide="chevron-up" class="w-3 h-3 text-zinc-500"></i>
                </button>
            </div>

            <!-- Next Chapter -->
            <button
                id="btnNextChapter"
                onclick="nextChapter()"
                class="px-4 py-2 rounded-xl bg-[#ff6a00] hover:bg-[#e65f00] text-xs font-bold text-black flex items-center gap-1.5 transition-colors shadow-md disabled:opacity-30 disabled:pointer-events-none"
            >
                <span class="hidden sm:inline">Next Chapter</span>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
        </footer>

        <!-- Settings Drawer -->
        <div id="readerSettingsDrawer" class="absolute right-4 bottom-20 z-40 w-80 bg-[#0e1017]/95 backdrop-blur-2xl rounded-3xl p-5 border border-white/15 hidden space-y-4 shadow-2xl">
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
                <div class="flex items-center gap-2">
                    <i data-lucide="sliders" class="w-4 h-4 text-[#ff6a00]"></i>
                    <span class="text-xs font-bold text-white uppercase tracking-wider">Reader Preferences</span>
                </div>
                <button onclick="toggleReaderSettings()" class="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <i data-lucide="x" class="w-3.5 h-3.5"></i>
                </button>
            </div>

            <div>
                <label class="text-[11px] font-mono text-gray-400 mb-1.5 block">Background Atmosphere</label>
                <div class="grid grid-cols-3 gap-1.5">
                    <button id="themeBtn_oled" onclick="setReaderTheme('oled')" class="h-8 rounded-xl bg-black border border-white/20 text-[10px] text-white font-bold transition-all">AMOLED</button>
                    <button id="themeBtn_slate" onclick="setReaderTheme('slate')" class="h-8 rounded-xl bg-[#07080b] border border-[#ff6a00]/40 text-[10px] text-[#ff6a00] font-bold transition-all">Obsidian</button>
                    <button id="themeBtn_charcoal" onclick="setReaderTheme('charcoal')" class="h-8 rounded-xl bg-[#141720] border border-white/20 text-[10px] text-gray-300 font-bold transition-all">Charcoal</button>
                </div>
            </div>

            <div>
                <label class="text-[11px] font-mono text-gray-400 mb-1.5 block">Viewport Width</label>
                <div class="grid grid-cols-3 gap-1.5 text-[11px]">
                    <button id="widthBtn_comfortable" onclick="setReaderWidth('comfortable')" class="py-1.5 rounded-xl bg-[#141720] border border-white/10 text-gray-300 hover:text-white font-medium transition-all">760px</button>
                    <button id="widthBtn_standard" onclick="setReaderWidth('standard')" class="py-1.5 rounded-xl bg-[#ff6a00]/20 border border-[#ff6a00]/50 text-[#ff6a00] font-bold transition-all">960px</button>
                    <button id="widthBtn_full" onclick="setReaderWidth('full')" class="py-1.5 rounded-xl bg-[#141720] border border-white/10 text-gray-300 hover:text-white font-medium transition-all">Full Edge</button>
                </div>
            </div>

            <div>
                <label class="text-[11px] font-mono text-gray-400 mb-1.5 block">Strip Spacing (Webtoon)</label>
                <div class="grid grid-cols-3 gap-1.5 text-[11px]">
                    <button id="gapBtn_none" onclick="setReaderGap('none')" class="py-1.5 rounded-xl bg-[#141720] border border-white/10 text-gray-300 hover:text-white font-medium transition-all">Seamless (0)</button>
                    <button id="gapBtn_compact" onclick="setReaderGap('compact')" class="py-1.5 rounded-xl bg-[#ff6a00]/20 border border-[#ff6a00]/50 text-[#ff6a00] font-bold transition-all">Compact</button>
                    <button id="gapBtn_relaxed" onclick="setReaderGap('relaxed')" class="py-1.5 rounded-xl bg-[#141720] border border-white/10 text-gray-300 hover:text-white font-medium transition-all">Relaxed</button>
                </div>
            </div>

            <div class="pt-2 border-t border-white/10 space-y-2.5">
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-xs text-gray-200 font-medium block">Auto-Hide HUD on Scroll</span>
                        <span class="text-[10px] text-zinc-400">Glides controls away while reading</span>
                    </div>
                    <input type="checkbox" id="autoHideToggle" checked onchange="toggleAutoHideSetting(this.checked)" class="w-4 h-4 accent-[#ff6a00] cursor-pointer" />
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-200 font-medium">Invert Colors (Night Scan)</span>
                    <input type="checkbox" id="invertToggle" onchange="toggleInvertColors(this.checked)" class="w-4 h-4 accent-[#ff6a00] cursor-pointer" />
                </div>
            </div>
        </div>

        <!-- Quick Page Jump Grid Modal -->
        <div id="pageGridModal" class="absolute inset-x-4 top-20 bottom-24 z-40 max-w-2xl mx-auto bg-[#0e1017]/95 backdrop-blur-2xl rounded-3xl p-5 border border-white/15 hidden flex-col shadow-2xl animate-fade-in">
            <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div class="flex items-center gap-2">
                    <i data-lucide="layout-grid" class="w-4 h-4 text-[#ff6a00]"></i>
                    <span class="text-xs font-bold text-white uppercase tracking-wider">Quick Page Jump</span>
                    <span id="pageGridCount" class="text-[10px] font-mono text-zinc-400"></span>
                </div>
                <button onclick="togglePageGridModal()" class="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                    <i data-lucide="x" class="w-3.5 h-3.5"></i>
                </button>
            </div>
            <div id="pageGridList" class="flex-1 overflow-y-auto grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 p-1 hide-scroll">
                <!-- Dynamically generated page pills -->
            </div>
        </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 📄 3. MANGA & COMIC DETAILS MODAL                                         -->
    <!-- ========================================================================= -->
    <div id="detailsModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 hidden">
        <div class="bg-[#0e1017] border border-white/10 w-full sm:max-w-2xl max-h-[85vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl">
            <!-- Header -->
            <div class="p-5 border-b border-white/10 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <span id="modalSourceBadge" class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#ff6a00]/20 text-[#ff6a00] uppercase"></span>
                    <h3 id="modalTitle" class="text-base font-bold text-white truncate max-w-md"></h3>
                </div>
                <button onclick="closeDetailsModal()" class="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <!-- Body -->
            <div class="flex-1 overflow-y-auto p-5 space-y-6">
                <!-- Cover + Synopsis -->
                <div class="flex gap-4">
                    <div class="w-24 sm:w-32 h-36 sm:h-48 rounded-xl overflow-hidden bg-[#141720] border border-white/10 flex-shrink-0 relative">
                        <img
                            id="modalCover"
                            src=""
                            alt=""
                            referrerpolicy="no-referrer"
                            onerror="handleModalCoverError(this)"
                            class="w-full h-full object-cover"
                        />
                    </div>
                    <div class="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                            <div id="modalGenres" class="flex flex-wrap gap-1.5 mb-2"></div>
                            <p id="modalSynopsis" class="text-xs text-gray-300 leading-relaxed line-clamp-4"></p>
                        </div>
                        <div class="pt-3">
                            <button id="modalReadFirstBtn" onclick="readFirstChapter()" class="px-6 py-2.5 rounded-full bg-[#ff6a00] hover:bg-[#e65f00] text-xs font-extrabold text-black flex items-center gap-1.5 shadow-lg shadow-orange-500/25">
                                <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
                                <span>Read Chapter 1</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Chapters List Header & Filter -->
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-2">
                            <i data-lucide="list" class="w-4 h-4 text-[#ff6a00]"></i>
                            <h4 class="text-sm font-bold text-white">All Chapters (<span id="modalChapterCount">...</span>)</h4>
                        </div>
                        <input
                            type="text"
                            id="chapterSearchFilter"
                            oninput="filterModalChapters(this.value)"
                            placeholder="Filter chapter #..."
                            class="h-8 px-2.5 rounded-lg bg-[#141720] border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-[#ff6a00] w-36"
                        />
                    </div>

                    <!-- Chapters Grid -->
                    <div id="modalChaptersList" class="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1 hide-scroll">
                        <div class="col-span-full py-8 text-center text-xs text-gray-400 font-mono flex items-center justify-center gap-2">
                            <div class="w-4 h-4 border-2 border-[#ff6a00] border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading chapters...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ========================================================================= -->
    <!-- ⚡ JAVASCRIPT CONTROLLER ENGINE                                            -->
    <!-- ========================================================================= -->
    <script>
        // Store & Reader State
        let state = {
            storeData: null,
            currentManga: null,
            currentChapter: null,
            currentPages: [],
            currentChapterIndex: 0,
            readingMode: 'webtoon',
            currentPageIndex: 0,
            heroIndex: 0,
            heroTimer: null,
            activeTab: 'all',
            readerGap: 'compact',
            readerWidth: 'standard',
            readerTheme: 'slate',
            zenMode: false,
            hudVisible: true,
            autoHideHud: true
        };

        let searchDebounceTimer = null;

        function getSafeImgUrl(url) {
            if (!url) return '';
            if (url.startsWith('/api/comics/proxy-image')) return url;
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return `/api/comics/proxy-image?url=${encodeURIComponent(url)}`;
            }
            return url;
        }

        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            initTouchPinchZoom();
            loadStoreCatalog().then(() => {
                const autoTab = localStorage.getItem('manganex_tab');
                if (autoTab) {
                    localStorage.removeItem('manganex_tab');
                    switchSection(autoTab);
                }
                const autoId = localStorage.getItem('manganex_autoload');
                if (autoId) {
                    localStorage.removeItem('manganex_autoload');
                    openComicById('atsu', autoId, '/api/comics/proxy-image?url=https%3A%2F%2Fcdn.atsu.moe%2Fstatic%2Fposters%2FcGoOe70KFmmEBe4m.jpg', 'Solo Leveling', true);
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
                    e.preventDefault();
                    document.getElementById('globalSearchInput').focus();
                }

                if (document.getElementById('readerView').classList.contains('hidden')) return;
                const vp = document.getElementById('readerViewport');

                if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                    if (state.readingMode === 'paged') {
                        nextPage();
                    } else if (vp) {
                        vp.scrollBy({ top: window.innerHeight * 0.65, behavior: 'smooth' });
                    }
                } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                    if (state.readingMode === 'paged') {
                        prevPage();
                    } else if (vp) {
                        vp.scrollBy({ top: -window.innerHeight * 0.65, behavior: 'smooth' });
                    }
                } else if (e.key === 'ArrowDown') {
                    if (vp) vp.scrollBy({ top: 200, behavior: 'smooth' });
                } else if (e.key === 'ArrowUp') {
                    if (vp) vp.scrollBy({ top: -200, behavior: 'smooth' });
                } else if (e.key === ' ' && document.activeElement.tagName !== 'INPUT') {
                    e.preventDefault();
                    if (state.readingMode === 'paged') {
                        nextPage();
                    } else if (vp) {
                        vp.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
                    }
                } else if (e.key === 'z' || e.key === 'Z') {
                    toggleZenMode();
                } else if (e.key === 'Escape') {
                    const grid = document.getElementById('pageGridModal');
                    const drawer = document.getElementById('readerSettingsDrawer');
                    if (grid && !grid.classList.contains('hidden')) {
                        togglePageGridModal();
                    } else if (drawer && !drawer.classList.contains('hidden')) {
                        toggleReaderSettings();
                    } else {
                        closeReader();
                    }
                } else if (e.key === 'f' || e.key === 'F') {
                    toggleFullscreen();
                } else if (e.key === 'm' || e.key === 'M') {
                    toggleReadingMode();
                }
            });

            const viewport = document.getElementById('readerViewport');
            let lastScrollY = 0;
            viewport.addEventListener('scroll', () => {
                if (state.readingMode === 'webtoon') {
                    updateWebtoonPageCounter();
                }
                if (state.autoHideHud && !state.zenMode) {
                    const curY = viewport.scrollTop;
                    if (curY > lastScrollY + 45 && curY > 80) {
                        setHudVisibility(false);
                    } else if (curY < lastScrollY - 25 || curY <= 50) {
                        setHudVisibility(true);
                    }
                    lastScrollY = curY;
                }
            });

            viewport.addEventListener('mousemove', (e) => {
                if (!state.hudVisible && (e.clientY < 75 || e.clientY > window.innerHeight - 75)) {
                    setHudVisibility(true);
                }
            });

            viewport.addEventListener('click', (e) => {
                if (state.readingMode === 'webtoon' && !e.target.closest('button') && !e.target.closest('input')) {
                    if (!state.hudVisible) {
                        setHudVisibility(true);
                    }
                }
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('#globalSearchInput') && !e.target.closest('#searchDropdown') &&
                    !e.target.closest('#mobileSearchInput') && !e.target.closest('#mobileSearchDropdown')) {
                    closeAllSearchDropdowns();
                }
            });
        });

        function switchSection(type) {
            state.activeTab = type;

            const tabAll = document.getElementById('tab-all');
            const tabManga = document.getElementById('tab-manga');
            const tabComics = document.getElementById('tab-comics');

            const mobAll = document.getElementById('mob-tab-all');
            const mobManga = document.getElementById('mob-tab-manga');
            const mobComics = document.getElementById('mob-tab-comics');

            const indAll = document.getElementById('tab-indicator-all');
            const indManga = document.getElementById('tab-indicator-manga');
            const indComics = document.getElementById('tab-indicator-comics');

            const heroSec = document.getElementById('heroSection');
            const heroMob = document.getElementById('heroSectionMobile');
            const mangaSec = document.getElementById('mangaGroupSection');
            const comicsSec = document.getElementById('comicsGroupSection');

            // Reset desktop tab styles
            [tabAll, tabManga, tabComics].forEach(t => {
                if (t) {
                    t.classList.remove('text-white', 'font-bold');
                    t.classList.add('text-gray-400', 'font-semibold');
                }
            });
            [indAll, indManga, indComics].forEach(i => { if (i) i.classList.add('hidden'); });

            // Reset mobile tab styles
            [mobAll, mobManga, mobComics].forEach(m => {
                if (m) {
                    m.classList.remove('bg-[#ff6a00]', 'text-black', 'font-bold', 'shadow-sm');
                    m.classList.add('text-zinc-400', 'font-semibold');
                }
            });

            if (type === 'all') {
                if (tabAll) { tabAll.classList.add('text-white', 'font-bold'); tabAll.classList.remove('text-gray-400', 'font-semibold'); }
                if (indAll) indAll.classList.remove('hidden');
                if (mobAll) { mobAll.classList.add('bg-[#ff6a00]', 'text-black', 'font-bold', 'shadow-sm'); mobAll.classList.remove('text-zinc-400', 'font-semibold'); }

                if (heroSec) heroSec.classList.remove('hidden');
                if (heroMob) heroMob.classList.remove('hidden');
                if (mangaSec) mangaSec.classList.remove('hidden');
                if (comicsSec) comicsSec.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (type === 'manga') {
                if (tabManga) { tabManga.classList.add('text-white', 'font-bold'); tabManga.classList.remove('text-gray-400', 'font-semibold'); }
                if (indManga) indManga.classList.remove('hidden');
                if (mobManga) { mobManga.classList.add('bg-[#ff6a00]', 'text-black', 'font-bold', 'shadow-sm'); mobManga.classList.remove('text-zinc-400', 'font-semibold'); }

                if (heroSec) heroSec.classList.remove('hidden');
                if (heroMob) heroMob.classList.remove('hidden');
                if (mangaSec) mangaSec.classList.remove('hidden');
                if (comicsSec) comicsSec.classList.add('hidden');
                mangaSec.scrollIntoView({ behavior: 'smooth' });
            } else if (type === 'comics') {
                if (tabComics) { tabComics.classList.add('text-white', 'font-bold'); tabComics.classList.remove('text-gray-400', 'font-semibold'); }
                if (indComics) indComics.classList.remove('hidden');
                if (mobComics) { mobComics.classList.add('bg-[#ff6a00]', 'text-black', 'font-bold', 'shadow-sm'); mobComics.classList.remove('text-zinc-400', 'font-semibold'); }

                if (heroSec) heroSec.classList.add('hidden');
                if (heroMob) heroMob.classList.add('hidden');
                if (mangaSec) mangaSec.classList.add('hidden');
                if (comicsSec) comicsSec.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        async function loadStoreCatalog() {
            try {
                const res = await fetch('/api/comics/store');
                const data = await res.json();
                if (data.success) {
                    state.storeData = data;
                    renderHero(data.spotlight || []);
                    renderTrending(data.trendingNow || []);
                    renderLatestUpdates(data.latestUpdates || []);
                    renderWesternComics(data.westernComics || []);
                    startHeroRotation();
                }
            } catch (err) {
                console.warn('[StoreUI] Failed to load store data:', err);
            }
        }

        function renderHero(items) {
            if (!items || items.length === 0) return;
            const cur = items[state.heroIndex];

            // 1. Desktop Hero Elements
            const sub = document.getElementById('heroSubtitle');
            if (sub) sub.textContent = cur.description || 'Discover thousands of manga and comics from around the world. Simple. Fast. Beautiful.';
            const tag = document.getElementById('heroTag');
            if (tag) tag.textContent = cur.tag || 'READ • EXPLORE • GET LOST';

            const charImg = document.getElementById('heroCharacterImg');
            if (charImg) {
                charImg.style.display = 'block';
                charImg.src = getSafeImgUrl(cur.cover);
            }

            const cTitle = document.getElementById('heroCalloutTitle');
            if (cTitle) cTitle.textContent = cur.title;
            const cCh = document.getElementById('heroCalloutChapter');
            if (cCh) cCh.textContent = `Chapter ${cur.latestChapter || cur.chapterCount || 201}`;

            // 2. Mobile Spotlight Card Elements (Zero text collision, crisp artwork frame)
            const mobPoster = document.getElementById('heroMobilePoster');
            if (mobPoster) mobPoster.src = getSafeImgUrl(cur.cover);

            const mobTitle = document.getElementById('heroMobileTitle');
            if (mobTitle) mobTitle.textContent = cur.title;

            const mobChapter = document.getElementById('heroMobileChapter');
            if (mobChapter) mobChapter.textContent = `Chapter ${cur.latestChapter || cur.chapterCount || 201} · Latest`;

            const mobDesc = document.getElementById('heroMobileDesc');
            if (mobDesc) mobDesc.textContent = cur.description || 'Discover thousands of manga and comics from around the world.';

            const mobTag = document.getElementById('heroMobileTag');
            if (mobTag) mobTag.textContent = cur.tag || 'SHONEN • SUPERNATURAL';

            const mobCounter = document.getElementById('heroMobileCounter');
            if (mobCounter) mobCounter.textContent = `0${state.heroIndex + 1} / 0${items.length}`;

            const mobBackdrop = document.getElementById('heroMobileBackdrop');
            if (mobBackdrop) {
                mobBackdrop.style.backgroundImage = `url("${getSafeImgUrl(cur.cover)}")`;
            }

            // 3. Desktop Slide Indicators
            const indicatorsContainer = document.getElementById('heroIndicators');
            if (indicatorsContainer) {
                indicatorsContainer.innerHTML = items.map((_, i) => `
                    <button onclick="setHeroSlide(${i})" class="h-1 rounded-full transition-all ${i === state.heroIndex ? 'w-8 bg-[#ff6a00]' : 'w-8 bg-white/20 hover:bg-white/40'}"></button>
                `).join('');
            }

            // 4. Mobile Slide Indicators
            const mobIndicators = document.getElementById('heroMobileIndicators');
            if (mobIndicators) {
                mobIndicators.innerHTML = items.map((_, i) => `
                    <button onclick="setHeroSlide(${i})" class="h-1.5 rounded-full transition-all ${i === state.heroIndex ? 'w-6 bg-[#ff6a00]' : 'w-2 bg-white/20 hover:bg-white/40'}"></button>
                `).join('');
            }

            // 5. Desktop Vertical Numbers (01, 02, 03)
            for (let i = 0; i < 3; i++) {
                const vertBtn = document.getElementById(`vertIndex-${i}`);
                if (vertBtn) {
                    if (i === state.heroIndex) {
                        vertBtn.className = 'text-[#ff6a00] flex items-center gap-1.5 transition-colors cursor-pointer pointer-events-auto';
                        vertBtn.innerHTML = `<span>0${i+1}</span><span class="w-3 h-[2px] bg-[#ff6a00]"></span>`;
                    } else {
                        vertBtn.className = 'text-gray-500 hover:text-gray-300 flex items-center gap-1.5 transition-colors cursor-pointer pointer-events-auto';
                        vertBtn.innerHTML = `<span>0${i+1}</span>`;
                    }
                }
            }
        }

        function handleHeroImageError(img) {
            if (!img.dataset.retried) {
                img.dataset.retried = 'true';
                img.src = '/api/comics/proxy-image?url=' + encodeURIComponent(img.src);
            } else {
                img.style.display = 'none';
            }
        }

        function startHeroRotation() {
            clearInterval(state.heroTimer);
            state.heroTimer = setInterval(() => {
                nextHeroSlide();
            }, 7000);
        }

        function nextHeroSlide() {
            if (!state.storeData?.spotlight) return;
            state.heroIndex = (state.heroIndex + 1) % state.storeData.spotlight.length;
            renderHero(state.storeData.spotlight);
        }

        function prevHeroSlide() {
            if (!state.storeData?.spotlight) return;
            state.heroIndex = (state.heroIndex - 1 + state.storeData.spotlight.length) % state.storeData.spotlight.length;
            renderHero(state.storeData.spotlight);
        }

        function setHeroSlide(idx) {
            state.heroIndex = idx;
            renderHero(state.storeData.spotlight);
            startHeroRotation();
        }

        function readCurrentHero() {
            if (!state.storeData?.spotlight) return;
            const cur = state.storeData.spotlight[state.heroIndex];
            openComicById(cur.source, cur.id, cur.cover, cur.title, true);
        }

        function openCurrentHeroDetails() {
            if (!state.storeData?.spotlight) return;
            const cur = state.storeData.spotlight[state.heroIndex];
            openComicById(cur.source, cur.id, cur.cover, cur.title, false);
        }

        function renderTrending(items) {
            const container = document.getElementById('trendingScrollContainer');
            if (!container) return;

            container.innerHTML = items.map((item, idx) => {
                const rank = String(idx + 1).padStart(2, '0');
                const safeCover = getSafeImgUrl(item.cover);
                return `
                    <div
                        onclick="openComicById('${item.source}', '${item.id}', '${safeCover}', '${item.title.replace(/'/g, "\\'")}')"
                        class="manga-card w-28 sm:w-44 lg:w-52 shrink-0 snap-start rounded-2xl bg-[#0f1118] border border-white/[0.06] p-2 sm:p-2.5 cursor-pointer flex flex-col group relative select-none"
                    >
                        <div class="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-[#141720]">
                            <img
                                src="${safeCover}"
                                alt=""
                                referrerpolicy="no-referrer"
                                loading="lazy"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onerror="handleCardImageError(this, '${item.title.replace(/'/g, "\\'")}')"
                            />
                            <div class="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[9px] sm:text-[10px] font-mono font-bold text-white/90 drop-shadow-md">
                                ${rank}
                            </div>
                        </div>

                        <h3 class="manga-title text-xs sm:text-sm font-bold text-white truncate leading-snug mb-0.5 transition-colors">
                            ${item.title}
                        </h3>
                        <p class="text-[10px] sm:text-[11px] text-gray-400 font-medium">
                            ${item.chapter || ('Chapter ' + (item.chapterCount || '1'))}
                        </p>
                    </div>
                `;
            }).join('');
        }

        function renderLatestUpdates(items) {
            const container = document.getElementById('latestUpdatesScrollContainer');
            if (!container) return;

            container.innerHTML = items.map(item => {
                const safeCover = getSafeImgUrl(item.cover);
                return `
                    <div
                        onclick="openComicById('${item.source}', '${item.id}', '${safeCover}', '${item.title.replace(/'/g, "\\'")}')"
                        class="manga-card w-28 sm:w-44 lg:w-52 shrink-0 snap-start rounded-2xl bg-[#0f1118] border border-white/[0.06] p-2 sm:p-2.5 cursor-pointer flex flex-col group relative select-none"
                    >
                        <div class="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-2 bg-[#141720]">
                            <img
                                src="${safeCover}"
                                alt=""
                                referrerpolicy="no-referrer"
                                loading="lazy"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onerror="handleCardImageError(this, '${item.title.replace(/'/g, "\\'")}')"
                            />
                            <div class="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 py-0.5 rounded bg-[#ff6a00] text-black font-black text-[8px] sm:text-[9px] uppercase tracking-wider shadow-md">
                                NEW
                            </div>
                        </div>

                        <h3 class="manga-title text-xs sm:text-sm font-bold text-white truncate leading-snug mb-0.5 transition-colors">
                            ${item.title}
                        </h3>
                        <p class="text-[10px] sm:text-[11px] text-gray-400 font-medium">
                            ${item.chapter || 'Latest Chapter'}
                        </p>
                    </div>
                `;
            }).join('');
        }

        function renderWesternComics(items) {
            const container = document.getElementById('westernComicsGrid');
            if (!container) return;

            container.innerHTML = items.map(item => {
                const safeCover = getSafeImgUrl(item.cover);
                return `
                    <div
                        onclick="openComicById('${item.source}', '${item.id}', '${safeCover}', '${item.title.replace(/'/g, "\\'")}')"
                        class="manga-card rounded-2xl bg-[#0f1118] border border-white/[0.06] p-2.5 sm:p-3 cursor-pointer flex flex-col group relative select-none"
                    >
                        <div class="relative w-full aspect-[2/3] rounded-xl overflow-hidden mb-2.5 bg-[#141720]">
                            <img
                                src="${safeCover}"
                                alt=""
                                referrerpolicy="no-referrer"
                                loading="lazy"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onerror="handleCardImageError(this, '${item.title.replace(/'/g, "\\'")}')"
                            />
                            <div class="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] sm:text-[10px] font-mono font-bold text-white border border-white/10">
                                ${item.badge}
                            </div>
                        </div>
                        <h3 class="manga-title text-xs sm:text-sm font-bold text-white truncate leading-snug mb-1 transition-colors">
                            ${item.title}
                        </h3>
                        <div class="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400 font-mono mt-auto">
                            <span>${item.chapterCount || 1} Issue</span>
                            <span class="text-[#ff6a00] font-sans font-bold flex items-center gap-0.5">
                                Read →
                            </span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function handleCardImageError(img, title) {
            if (!img.dataset.retried && img.src && !img.src.includes('/api/comics/proxy-image')) {
                img.dataset.retried = 'true';
                img.src = '/api/comics/proxy-image?url=' + encodeURIComponent(img.src);
            } else {
                img.onerror = null;
                img.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%2312141c'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ff6a00' font-family='sans-serif' font-weight='bold' font-size='18'%3E" + encodeURIComponent(title || 'Comic') + "%3C/text%3E%3C/svg%3E";
            }
        }

        function handleModalCoverError(img) {
            img.onerror = null;
            img.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%2312141c'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ff6a00' font-family='sans-serif' font-weight='bold' font-size='14'%3EManga Cover%3C/text%3E%3C/svg%3E";
        }

        function scrollShelfRight(containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                container.scrollBy({ left: 350, behavior: 'smooth' });
            }
        }

        function scrollToShelf(shelfId) {
            const el = document.getElementById(shelfId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }

        function handleSearchDebounced(val) {
            clearTimeout(searchDebounceTimer);
            const query = val.trim();
            const deskDropdown = document.getElementById('searchDropdown');
            const mobDropdown = document.getElementById('mobileSearchDropdown');

            if (!query) {
                if (deskDropdown) deskDropdown.classList.add('hidden');
                if (mobDropdown) mobDropdown.classList.add('hidden');
                return;
            }

            searchDebounceTimer = setTimeout(async () => {
                if (query.startsWith('http://') || query.startsWith('https://')) {
                    await loadDirectUrl(query);
                    return;
                }

                try {
                    const res = await fetch(`/api/comics/search?q=${encodeURIComponent(query)}`);
                    const data = await res.json();
                    if (data.success && data.results && data.results.length > 0) {
                        renderSearchDropdown(data.results);
                        if (deskDropdown) deskDropdown.classList.remove('hidden');
                        if (mobDropdown) mobDropdown.classList.remove('hidden');
                    } else {
                        const noFoundHtml = `<div class="p-4 text-center text-xs text-gray-400">No titles found for "${query}"</div>`;
                        if (deskDropdown) { deskDropdown.innerHTML = noFoundHtml; deskDropdown.classList.remove('hidden'); }
                        if (mobDropdown) { mobDropdown.innerHTML = noFoundHtml; mobDropdown.classList.remove('hidden'); }
                    }
                } catch (e) {
                    console.warn('[Search] Error:', e);
                }
            }, 300);
        }

        function renderSearchDropdown(results) {
            const deskContent = document.getElementById('searchDropdownContent');
            const mobContent = document.getElementById('mobileSearchDropdownContent');
            
            const html = results.slice(0, 8).map(r => {
                const safeCover = getSafeImgUrl(r.cover);
                return `
                    <div
                        onclick="openComicById('${r.source}', '${r.id}', '${safeCover}', '${r.title.replace(/'/g, "\\'")}'); closeAllSearchDropdowns();"
                        class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] cursor-pointer transition-colors"
                    >
                        <img src="${safeCover}" alt="" referrerpolicy="no-referrer" class="w-10 h-14 object-cover rounded-lg flex-shrink-0" onerror="handleCardImageError(this, '${r.title.replace(/'/g, "\\'")}')" />
                        <div class="min-w-0 flex-1">
                            <div class="text-xs font-bold text-white truncate">${r.title}</div>
                            <div class="text-[11px] text-gray-400 font-mono">${r.type || 'Manga'} • ${r.chapterCount ? r.chapterCount + ' Chapters' : r.status || ''}</div>
                        </div>
                        <span class="text-[#ff6a00] text-xs font-bold">Open →</span>
                    </div>
                `;
            }).join('');

            if (deskContent) deskContent.innerHTML = html;
            if (mobContent) mobContent.innerHTML = html;
            lucide.createIcons();
        }

        function closeAllSearchDropdowns() {
            const deskDropdown = document.getElementById('searchDropdown');
            const mobDropdown = document.getElementById('mobileSearchDropdown');
            if (deskDropdown) deskDropdown.classList.add('hidden');
            if (mobDropdown) mobDropdown.classList.add('hidden');
        }

        function handleSearchKeyDown(e) {
            if (e.key === 'Enter') {
                const val = e.target.value.trim();
                if (val.startsWith('http://') || val.startsWith('https://')) {
                    loadDirectUrl(val);
                }
            } else if (e.key === 'Escape') {
                document.getElementById('searchDropdown').classList.add('hidden');
                e.target.blur();
            }
        }

        async function loadDirectUrl(url) {
            showReaderLoader();
            try {
                const res = await fetch(`/api/comics/chapter?url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (data.success && data.pages && data.pages.length > 0) {
                    const infoRes = await fetch(`/api/comics/info?url=${encodeURIComponent(url)}`);
                    const infoData = await infoRes.json();

                    if (infoData.success && infoData.manga) {
                        state.currentManga = infoData.manga;
                    } else {
                        state.currentManga = {
                            id: data.mangaId,
                            source: data.source,
                            title: data.title || 'Comic',
                            chapters: [{ id: data.chapterId, chapterNumber: data.chapterId, title: data.title || 'Chapter' }]
                        };
                    }

                    launchReaderWithPages(data, data.chapterId);
                    return;
                }

                const infoRes = await fetch(`/api/comics/info?url=${encodeURIComponent(url)}`);
                const infoData = await infoRes.json();
                if (infoData.success && infoData.manga) {
                    hideReaderLoader();
                    openComicModal(infoData.manga);
                } else {
                    alert('Could not resolve comic or chapter from URL.');
                    hideReaderLoader();
                }
            } catch (err) {
                console.error('[DirectUrl] Error:', err);
                alert('Network error connecting to resolver.');
                hideReaderLoader();
            }
        }

        async function openComicById(source, id, previewCover = '', previewTitle = '', autoPlayFirst = false) {
            if (!autoPlayFirst) {
                document.getElementById('modalTitle').textContent = previewTitle || 'Loading Title...';
                document.getElementById('modalCover').src = previewCover || '';
                document.getElementById('modalSourceBadge').textContent = source || 'MANGA';
                document.getElementById('modalChapterCount').textContent = '...';
                document.getElementById('modalChaptersList').innerHTML = `
                    <div class="col-span-full py-8 text-center text-xs text-gray-400 font-mono flex items-center justify-center gap-2">
                        <div class="w-4 h-4 border-2 border-[#ff6a00] border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading chapters...</span>
                    </div>
                `;
                document.getElementById('detailsModal').classList.remove('hidden');
                lucide.createIcons();
            } else {
                showReaderLoader();
            }

            try {
                const res = await fetch(`/api/comics/info?source=${source}&id=${encodeURIComponent(id)}`);
                const data = await res.json();
                hideReaderLoader();

                if (data.success && data.manga) {
                    state.currentManga = data.manga;
                    if (autoPlayFirst && data.manga.chapters.length > 0) {
                        loadChapterByIndex(0);
                    } else {
                        openComicModal(data.manga);
                    }
                } else {
                    if (autoPlayFirst) alert('Comic details could not be loaded.');
                }
            } catch (e) {
                hideReaderLoader();
                console.error(e);
            }
        }

        function openComicModal(manga) {
            document.getElementById('modalSourceBadge').textContent = manga.source;
            document.getElementById('modalTitle').textContent = manga.title;
            document.getElementById('modalCover').src = getSafeImgUrl(manga.cover);
            document.getElementById('modalSynopsis').textContent = manga.synopsis || 'No synopsis provided for this title.';
            document.getElementById('modalChapterCount').textContent = manga.chapters.length;

            const genresDiv = document.getElementById('modalGenres');
            genresDiv.innerHTML = (manga.genres || []).slice(0, 4).map(g => `
                <span class="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] text-gray-300 font-mono">${g}</span>
            `).join('');

            renderModalChapters(manga.chapters);
            document.getElementById('detailsModal').classList.remove('hidden');
            lucide.createIcons();
        }

        function closeDetailsModal() {
            document.getElementById('detailsModal').classList.add('hidden');
        }

        function renderModalChapters(chapters) {
            const list = document.getElementById('modalChaptersList');
            if (!chapters || chapters.length === 0) {
                list.innerHTML = `<div class="col-span-full py-4 text-center text-xs text-gray-400 font-mono">No chapters available</div>`;
                return;
            }
            list.innerHTML = chapters.map((ch, idx) => `
                <button
                    onclick="loadChapterByIndex(${idx})"
                    class="p-2.5 rounded-xl bg-[#141720] hover:bg-[#ff6a00]/15 border border-white/10 hover:border-[#ff6a00]/40 text-left transition-all"
                >
                    <div class="text-xs font-semibold text-white truncate">${ch.title}</div>
                    <div class="text-[10px] text-gray-400 font-mono">${ch.releaseDate || 'Read'}</div>
                </button>
            `).join('');
        }

        function filterModalChapters(query) {
            if (!state.currentManga) return;
            const q = query.toLowerCase().trim();
            const filtered = state.currentManga.chapters.filter(c =>
                String(c.chapterNumber).includes(q) || c.title.toLowerCase().includes(q)
            );
            renderModalChapters(filtered);
        }

        function readFirstChapter() {
            if (state.currentManga && state.currentManga.chapters.length > 0) {
                closeDetailsModal();
                loadChapterByIndex(0);
            }
        }

        async function loadChapterByIndex(idx) {
            if (!state.currentManga || !state.currentManga.chapters[idx]) return;
            state.currentChapterIndex = idx;
            const targetCh = state.currentManga.chapters[idx];

            closeDetailsModal();
            openReaderView();
            showReaderLoader();

            try {
                const res = await fetch(`/api/comics/chapter?source=${state.currentManga.source}&mangaId=${encodeURIComponent(state.currentManga.id)}&chapterId=${encodeURIComponent(targetCh.id)}`);
                const data = await res.json();

                if (data.success && data.pages && data.pages.length > 0) {
                    launchReaderWithPages(data, targetCh.id);
                } else {
                    showReaderError('Could not fetch pages for this chapter.');
                }
            } catch (err) {
                console.error('[Reader] Chapter error:', err);
                showReaderError(err.message || 'Error fetching chapter pages');
            }
        }

        function launchReaderWithPages(pagesResult, chapterId) {
            state.currentChapter = pagesResult;
            state.currentPages = pagesResult.pages || [];
            state.currentPageIndex = 0;

            hideReaderLoader();
            hideReaderError();

            document.getElementById('readerTitle').textContent = state.currentManga?.title || pagesResult.title || 'Comic';
            document.getElementById('readerChapterLabel').textContent = pagesResult.title || `Chapter ${chapterId}`;
            document.getElementById('endChapterTitle').textContent = `You finished ${pagesResult.title || 'Chapter ' + chapterId}!`;

            document.getElementById('totalPageNum').textContent = state.currentPages.length;
            document.getElementById('curPageNum').textContent = '1';

            const scrubber = document.getElementById('pageScrubber');
            scrubber.max = state.currentPages.length;
            scrubber.value = 1;

            populateReaderChapterSelect(chapterId);

            if (state.readingMode === 'webtoon') {
                renderWebtoonPages();
            } else {
                renderPagedFlip();
            }

            document.getElementById('readerViewport').scrollTop = 0;
        }

        function populateReaderChapterSelect(activeChId) {
            const select = document.getElementById('readerChapterSelect');
            if (!state.currentManga || !state.currentManga.chapters) {
                select.innerHTML = `<option value="${activeChId}">Chapter ${activeChId}</option>`;
                return;
            }

            select.innerHTML = state.currentManga.chapters.map((ch, idx) => `
                <option value="${idx}" ${String(ch.id) === String(activeChId) ? 'selected' : ''}>
                    ${ch.title}
                </option>
            `).join('');

            document.getElementById('btnPrevChapter').disabled = (state.currentChapterIndex <= 0);
            document.getElementById('btnNextChapter').disabled = (state.currentChapterIndex >= state.currentManga.chapters.length - 1);
        }

        function changeChapter(selectVal) {
            const idx = parseInt(selectVal, 10);
            if (!isNaN(idx)) {
                loadChapterByIndex(idx);
            }
        }

        function prevChapter() {
            if (state.currentChapterIndex > 0) {
                loadChapterByIndex(state.currentChapterIndex - 1);
            }
        }

        function nextChapter() {
            if (state.currentManga && state.currentChapterIndex < state.currentManga.chapters.length - 1) {
                loadChapterByIndex(state.currentChapterIndex + 1);
            }
        }

        function renderWebtoonPages() {
            const container = document.getElementById('webtoonContainer');
            const pagedContainer = document.getElementById('pagedContainer');
            const bottomBar = document.getElementById('webtoonBottomBar');

            pagedContainer.classList.add('hidden');
            container.classList.remove('hidden');
            bottomBar.classList.remove('hidden');

            container.innerHTML = state.currentPages.map((pageUrl, idx) => `
                <div class="reader-page-wrapper reader-shimmer relative w-full overflow-hidden transition-all duration-300">
                    <img
                        src="${pageUrl}"
                        data-index="${idx + 1}"
                        alt="Page ${idx + 1}"
                        referrerpolicy="no-referrer"
                        loading="${idx < 3 ? 'eager' : 'lazy'}"
                        class="reader-page-img w-full h-auto object-contain block mx-auto opacity-0 transition-opacity duration-300"
                        onload="this.classList.remove('opacity-0'); this.parentElement.classList.remove('reader-shimmer'); this.parentElement.classList.add('loaded');"
                        onerror="handleReaderImageError(this, '${pageUrl}')"
                    />
                </div>
            `).join('');

            document.getElementById('readerViewport').scrollTop = 0;
            updateWebtoonPageCounter();
            lucide.createIcons();
        }

        function updateWebtoonPageCounter() {
            const viewport = document.getElementById('readerViewport');
            const images = document.querySelectorAll('#webtoonContainer img');
            const viewMid = viewport.scrollTop + (viewport.clientHeight / 2);

            let curIndex = 1;
            for (const img of images) {
                const top = img.offsetTop;
                const bottom = top + img.clientHeight;
                if (viewMid >= top && viewMid <= bottom) {
                    curIndex = parseInt(img.getAttribute('data-index') || '1', 10);
                    break;
                }
            }

            document.getElementById('curPageNum').textContent = curIndex;
            document.getElementById('pageScrubber').value = curIndex;

            const total = state.currentPages.length || 1;
            const pct = Math.min(100, (curIndex / total) * 100);
            document.getElementById('readerProgressBar').style.width = `${pct}%`;
        }

        function renderPagedFlip() {
            const container = document.getElementById('webtoonContainer');
            const pagedContainer = document.getElementById('pagedContainer');
            const bottomBar = document.getElementById('webtoonBottomBar');

            container.classList.add('hidden');
            bottomBar.classList.add('hidden');
            pagedContainer.classList.remove('hidden');

            showCurrentPagedImage();
        }

        function showCurrentPagedImage() {
            const img = document.getElementById('pagedImage');
            const curUrl = state.currentPages[state.currentPageIndex];
            if (!curUrl) return;

            img.style.opacity = '0.3';
            img.src = curUrl;
            img.onload = () => { img.style.opacity = '1'; };
            img.onerror = () => { handleReaderImageError(img, curUrl); img.style.opacity = '1'; };

            const curPage = state.currentPageIndex + 1;
            document.getElementById('curPageNum').textContent = curPage;
            document.getElementById('pageScrubber').value = curPage;

            const total = state.currentPages.length || 1;
            const pct = Math.min(100, (curPage / total) * 100);
            document.getElementById('readerProgressBar').style.width = `${pct}%`;
        }

        function nextPage() {
            if (state.readingMode !== 'paged') return;
            if (state.currentPageIndex < state.currentPages.length - 1) {
                state.currentPageIndex++;
                showCurrentPagedImage();
            } else {
                nextChapter();
            }
        }

        function prevPage() {
            if (state.readingMode !== 'paged') return;
            if (state.currentPageIndex > 0) {
                state.currentPageIndex--;
                showCurrentPagedImage();
            } else {
                prevChapter();
            }
        }

        function handlePagedClick(e) {
            const rect = e.target.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX > rect.width / 2) {
                nextPage();
            } else {
                prevPage();
            }
        }

        function handleScrubberInput(val) {
            const pageNum = parseInt(val, 10);
            if (isNaN(pageNum)) return;

            if (state.readingMode === 'paged') {
                state.currentPageIndex = Math.max(0, pageNum - 1);
                showCurrentPagedImage();
            } else {
                const targetImg = document.querySelector(`#webtoonContainer img[data-index="${pageNum}"]`);
                if (targetImg) {
                    targetImg.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }

        function toggleReadingMode() {
            if (state.readingMode === 'webtoon') {
                state.readingMode = 'paged';
                document.getElementById('modeLabel').textContent = 'Paged';
                document.getElementById('modeIcon').setAttribute('data-lucide', 'book-open');
                renderPagedFlip();
            } else {
                state.readingMode = 'webtoon';
                document.getElementById('modeLabel').textContent = 'Webtoon';
                document.getElementById('modeIcon').setAttribute('data-lucide', 'scroll');
                renderWebtoonPages();
            }
            lucide.createIcons();
        }

        function toggleReaderSettings() {
            document.getElementById('readerSettingsDrawer').classList.toggle('hidden');
        }

        // Enhanced Reader Preferences & HUD Controls
        function setHudVisibility(visible) {
            const topHud = document.getElementById('readerTopHud');
            const bottomHud = document.getElementById('readerBottomHud');
            if (!topHud || !bottomHud) return;

            if (visible) {
                topHud.classList.remove('-translate-y-full');
                bottomHud.classList.remove('translate-y-full');
                state.hudVisible = true;
            } else {
                const drawer = document.getElementById('readerSettingsDrawer');
                const grid = document.getElementById('pageGridModal');
                if (drawer && !drawer.classList.contains('hidden')) return;
                if (grid && !grid.classList.contains('hidden')) return;

                topHud.classList.add('-translate-y-full');
                bottomHud.classList.add('translate-y-full');
                state.hudVisible = false;
            }
        }

        function toggleZenMode() {
            state.zenMode = !state.zenMode;
            const zenBtn = document.getElementById('btnZenMode');
            if (state.zenMode) {
                setHudVisibility(false);
                if (zenBtn) {
                    zenBtn.classList.add('bg-emerald-500/25', 'border-emerald-500/50', 'text-emerald-300');
                }
            } else {
                setHudVisibility(true);
                if (zenBtn) {
                    zenBtn.classList.remove('bg-emerald-500/25', 'border-emerald-500/50', 'text-emerald-300');
                }
            }
        }

        function toggleAutoHideSetting(enabled) {
            state.autoHideHud = !!enabled;
            if (!state.autoHideHud) {
                setHudVisibility(true);
            }
        }

        function togglePageGridModal() {
            const modal = document.getElementById('pageGridModal');
            if (!modal) return;
            const isHidden = modal.classList.contains('hidden');
            if (isHidden) {
                populatePageGrid();
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            } else {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
            try { lucide.createIcons({ root: modal }); } catch(_) {}
        }

        function populatePageGrid() {
            const gridList = document.getElementById('pageGridList');
            const countEl = document.getElementById('pageGridCount');
            if (!gridList) return;
            const total = state.currentPages.length;
            if (countEl) countEl.textContent = `${total} total pages`;

            const curPage = (state.readingMode === 'paged') 
                ? (state.currentPageIndex + 1) 
                : parseInt(document.getElementById('curPageNum')?.textContent || '1', 10);

            gridList.innerHTML = state.currentPages.map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = pageNum === curPage;
                return `
                    <button
                        type="button"
                        onclick="jumpToPage(${pageNum})"
                        class="py-2.5 px-1 rounded-xl text-center font-mono text-xs font-bold transition-all cursor-pointer ${
                            isCurrent 
                                ? 'bg-[#ff6a00] text-black shadow-lg shadow-orange-500/30 scale-105' 
                                : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20'
                        }"
                    >
                        ${pageNum}
                    </button>
                `;
            }).join('');
        }

        function jumpToPage(pageNum) {
            handleScrubberInput(pageNum);
            togglePageGridModal();
        }

        function setReaderGap(gap) {
            state.readerGap = gap;
            const c = document.getElementById('webtoonContainer');
            if (!c) return;
            c.classList.remove('reader-gap-none', 'reader-gap-compact', 'reader-gap-relaxed', 'space-y-2');
            if (gap === 'none') {
                c.classList.add('reader-gap-none');
            } else if (gap === 'relaxed') {
                c.classList.add('reader-gap-relaxed');
            } else {
                c.classList.add('reader-gap-compact');
            }

            ['none', 'compact', 'relaxed'].forEach(g => {
                const btn = document.getElementById(`gapBtn_${g}`);
                if (btn) {
                    if (g === gap) {
                        btn.className = "py-1.5 rounded-xl bg-[#ff6a00]/20 border border-[#ff6a00]/50 text-[#ff6a00] font-bold transition-all";
                    } else {
                        btn.className = "py-1.5 rounded-xl bg-[#141720] border border-white/10 text-gray-300 hover:text-white font-medium transition-all";
                    }
                }
            });
        }

        function setReaderTheme(theme) {
            state.readerTheme = theme;
            const viewport = document.getElementById('readerViewport');
            if (!viewport) return;
            viewport.classList.remove('reader-theme-oled', 'reader-theme-slate', 'reader-theme-charcoal');
            viewport.classList.add(`reader-theme-${theme}`);

            ['oled', 'slate', 'charcoal'].forEach(t => {
                const btn = document.getElementById(`themeBtn_${t}`);
                if (btn) {
                    if (t === theme) {
                        btn.classList.add('border-[#ff6a00]/60', 'text-[#ff6a00]');
                        btn.classList.remove('border-white/20', 'text-gray-300', 'text-white');
                    } else {
                        btn.classList.remove('border-[#ff6a00]/60', 'text-[#ff6a00]');
                        btn.classList.add('border-white/20', t === 'oled' ? 'text-white' : 'text-gray-300');
                    }
                }
            });
        }

        function setReaderWidth(w) {
            state.readerWidth = w;
            const c = document.getElementById('webtoonContainer');
            if (!c) return;
            c.classList.remove('reader-width-comfortable', 'reader-width-standard', 'reader-width-full');
            c.classList.add(`reader-width-${w}`);

            ['comfortable', 'standard', 'full'].forEach(widthKey => {
                const btn = document.getElementById(`widthBtn_${widthKey}`);
                if (btn) {
                    if (widthKey === w) {
                        btn.className = "py-1.5 rounded-xl bg-[#ff6a00]/20 border border-[#ff6a00]/50 text-[#ff6a00] font-bold transition-all";
                    } else {
                        btn.className = "py-1.5 rounded-xl bg-[#141720] border border-white/10 text-gray-300 hover:text-white font-medium transition-all";
                    }
                }
            });
        }

        function toggleInvertColors(inverted) {
            const imgs = document.querySelectorAll('.reader-page-img, #pagedImage');
            imgs.forEach(img => {
                img.style.filter = inverted ? 'invert(0.9) hue-rotate(180deg)' : 'none';
            });
        }

        function handleReaderImageError(imgElem, originalUrl) {
            if (imgElem.dataset.retried) return;
            imgElem.dataset.retried = 'true';
            imgElem.src = `/api/comics/proxy-image?url=${encodeURIComponent(originalUrl)}`;
        }

        function showStorefront() {
            document.getElementById('readerView').classList.add('hidden');
            document.getElementById('storefrontView').classList.remove('hidden');
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            }
        }

        function openReaderView() {
            document.getElementById('storefrontView').classList.add('hidden');
            document.getElementById('readerView').classList.remove('hidden');
        }

        function closeReader() {
            showStorefront();
        }

        function showReaderLoader() {
            document.getElementById('readerLoader').classList.remove('hidden');
        }

        function hideReaderLoader() {
            document.getElementById('readerLoader').classList.add('hidden');
        }

        function showReaderError(msg) {
            hideReaderLoader();
            document.getElementById('readerErrorMsg').textContent = msg;
            document.getElementById('readerError').classList.remove('hidden');
        }

        function hideReaderError() {
            document.getElementById('readerError').classList.add('hidden');
        }

        function retryCurrentChapter() {
            loadChapterByIndex(state.currentChapterIndex);
        }

        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                document.exitFullscreen().catch(() => {});
            }
        }

        /* 🔍 2-FINGER PINCH ZOOM & UI ZOOM CONTROLLER */
        let currentZoomScale = 1.0;
        let touchStartDist = 0;
        let touchStartScale = 1.0;

        function applyZoom(scale) {
            currentZoomScale = Math.min(4.0, Math.max(0.7, scale));
            const targetContainer = state.readingMode === 'paged' ? document.getElementById('pagedImage') : document.getElementById('webtoonContainer');
            if (targetContainer) {
                targetContainer.style.transform = `scale(${currentZoomScale})`;
                targetContainer.style.transformOrigin = 'center top';
                targetContainer.style.transition = 'transform 0.12s ease-out';
            }
            const lbl = document.getElementById('zoomLevelLabel');
            if (lbl) lbl.textContent = Math.round(currentZoomScale * 100) + '%';
        }

        function zoomIn() { applyZoom(currentZoomScale + 0.25); }
        function zoomOut() { applyZoom(currentZoomScale - 0.25); }
        function resetZoom() { applyZoom(1.0); }

        /* ⚡ INSIDE-OUT KINETIC TEXT SCROLL REVEAL OBSERVER */
        function initInsideOutScrollObserver() {
            const headlines = document.querySelectorAll('.inside-out-headline');
            const revealWords = (headline) => {
                const words = headline.querySelectorAll('.inside-out-word');
                words.forEach((w, idx) => {
                    setTimeout(() => {
                        w.classList.remove('word-hidden');
                        w.classList.add('word-visible');
                    }, idx * 80);
                });
            };

            if (!('IntersectionObserver' in window)) {
                document.querySelectorAll('.inside-out-word').forEach(w => {
                    w.classList.remove('word-hidden');
                    w.classList.add('word-visible');
                });
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        revealWords(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                threshold: 0.02
            });

            headlines.forEach(h => {
                const rect = h.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    revealWords(h);
                } else {
                    observer.observe(h);
                }
            });
        }

        function initTouchPinchZoom() {
            const vp = document.getElementById('readerViewport');
            if (!vp) return;

            vp.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    touchStartDist = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                    touchStartScale = currentZoomScale;
                }
            }, { passive: true });

            vp.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2 && touchStartDist > 0) {
                    const currentDist = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                    const factor = currentDist / touchStartDist;
                    applyZoom(touchStartScale * factor);
                }
            }, { passive: true });

            vp.addEventListener('touchend', (e) => {
                if (e.touches.length < 2) {
                    touchStartDist = 0;
                }
            }, { passive: true });
        }

        document.addEventListener('DOMContentLoaded', () => {
            initInsideOutScrollObserver();
            initTouchPinchZoom();
        });
    </script>
<script src="/watchdog.js"></script>
</body>
</html>

