// Stalker Pro 2.0 PWA Service Worker
const CACHE_NAME = 'stalker-pro-v2.1';
const STATIC_ASSETS = [
    '/consumet.html',
    '/manifest.json',
    '/assets/pwa-192x192.png',
    '/assets/pwa-512x512.png',
    '/assets/pwa-maskable-512x512.png',
    '/assets/logo.png',
    '/assets/aetheris_logo.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS).catch((err) => {
                console.warn('[PWA SW] Pre-caching non-fatal warning:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // Bypass video streams, HLS segments, and dynamic player APIs from caching
    if (
        req.method !== 'GET' ||
        url.pathname.includes('/live.php') ||
        url.pathname.includes('/api/play_stream') ||
        url.pathname.includes('/api/resolve_stream') ||
        url.pathname.includes('/stream_proxy.php') ||
        url.pathname.includes('/api/transcode') ||
        url.pathname.endsWith('.m3u8') ||
        url.pathname.endsWith('.ts') ||
        url.pathname.endsWith('.mpd') ||
        url.pathname.endsWith('.mp4') ||
        url.pathname.endsWith('.mkv')
    ) {
        return;
    }

    // Static assets: Stale-While-Revalidate strategy
    if (
        url.pathname.startsWith('/assets/') ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.svg') ||
        url.pathname.endsWith('.woff2')
    ) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(req).then((cached) => {
                    const fetched = fetch(req).then((networkRes) => {
                        if (networkRes && networkRes.status === 200) {
                            cache.put(req, networkRes.clone());
                        }
                        return networkRes;
                    }).catch(() => cached);
                    return cached || fetched;
                });
            })
        );
        return;
    }

    // HTML Pages: Network-first with offline fallback
    if (req.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(req).catch(() => {
                return caches.match('/consumet.html');
            })
        );
    }
});
