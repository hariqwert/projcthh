const CACHE_NAME = 'aetheris-pwa-v10';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/subway.html',
  '/manifest.json',
  '/aetheris_infinity.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
  // Subway Surfers: Mumbai 3D (100% Offline PWA Play)
  '/assets/games/subway/subway-bundle.js?v=2.7.0',
  '/assets/games/subway/subway-bundle.js',
  '/assets/games/subway/core.glb',
  '/assets/games/subway/scenery.glb',
  '/assets/games/subway/promo_mumbai_sunset.jpg',
  '/assets/games/subway/promo_mumbai_night.jpg',
  '/assets/games/subway/GLTFLoader.js',
  '/assets/games/subway/three.min.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of STATIC_ASSETS) {
        try {
          await cache.add(url);
        } catch (err) {
          console.warn('[SW Install] Pre-cache skip:', url, err?.message || err);
        }
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

function getEmergencyOfflineHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Aetheris Offline Arcade</title>
<style>
  body { background: #05050a; color: #fff; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; text-align: center; }
  .card { background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 32px 24px; max-width: 480px; width: 100%; box-shadow: 0 16px 48px rgba(0,0,0,0.85); backdrop-filter: blur(12px); }
  h1 { font-size: 24px; font-weight: 900; margin: 12px 0 8px; color: #f8fafc; }
  p { color: #94a3b8; font-size: 14px; margin-bottom: 24px; line-height: 1.5; }
  .btn { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 15px 20px; border-radius: 14px; font-weight: 800; font-size: 15px; text-decoration: none; margin-bottom: 12px; transition: transform 0.15s, opacity 0.15s; cursor: pointer; }
  .btn-subway { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #1e1302; box-shadow: 0 4px 18px rgba(245, 158, 11, 0.4); border: 1px solid #fbbf24; }
  .btn-dino { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); color: #fff; }
  .btn:active { transform: scale(0.97); }
</style>
</head>
<body>
<div class="card">
  <div style="font-size: 44px; margin-bottom: 6px;">🛹</div>
  <h1>Offline Arcade Ready</h1>
  <p>Network is currently disconnected. Both 3D Subway Surfers and Cyber-Rex Arcade are fully available offline.</p>
  <a href="/subway.html" class="btn btn-subway">🛹 Play Subway Surfers: Mumbai 3D</a>
  <a href="/offline.html" class="btn btn-dino">🦖 Play Aetheris Cyber-Rex Arcade</a>
</div>
</body>
</html>`;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never cache live video streams, HLS/DASH manifests, or dynamic API calls
  if (
    url.pathname.includes('/api/') ||
    url.pathname.includes('/live.php') ||
    url.pathname.includes('/stream_proxy') ||
    url.pathname.endsWith('.m3u8') ||
    url.pathname.endsWith('.mpd') ||
    url.pathname.endsWith('.ts') ||
    url.pathname.endsWith('.m4s')
  ) {
    return;
  }

  const acceptHeader = req.headers.get('accept') || '';
  const isNavigation = req.mode === 'navigate' || acceptHeader.includes('text/html') || url.pathname === '/' || url.pathname.endsWith('.html');

  // For HTML navigation: Network-First falling back to specific cached page or /subway.html or /offline.html
  if (isNavigation) {
    event.respondWith(
      fetch(req, { cache: 'no-store' })
        .then((res) => {
          if (res && res.status === 200 && (res.type === 'basic' || res.type === 'default')) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);

          // 1. If user requested Subway Surfers (/subway or /subway.html)
          if (url.pathname === '/subway' || url.pathname === '/subway.html' || url.pathname.includes('subway')) {
            const subwayMatch = (await cache.match('/subway.html', { ignoreSearch: true })) || (await cache.match(req, { ignoreSearch: true }));
            if (subwayMatch) return subwayMatch;
          }

          // 2. Check if the exact requested URL was previously cached
          const exactMatch = (await cache.match(req, { ignoreSearch: true })) || (await cache.match(url.pathname, { ignoreSearch: true }));
          if (exactMatch) return exactMatch;

          // 3. Check /offline.html
          const offlineFallback = (await cache.match(OFFLINE_URL, { ignoreSearch: true })) || (await cache.match('/offline.html', { ignoreSearch: true }));
          if (offlineFallback) return offlineFallback;

          // 4. Emergency rich offline fallback HTML
          return new Response(getEmergencyOfflineHtml(), {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        })
    );
    return;
  }

  // Static assets and 3D Game models/bundles: Cache-First for instant offline play
  const isStaticOrSubway = STATIC_ASSETS.some(asset => url.pathname === asset || url.pathname === asset.split('?')[0]) || url.pathname.startsWith('/assets/games/subway/');
  if (isStaticOrSubway) {
    event.respondWith(
      caches.match(req, { ignoreSearch: true }).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((networkRes) => {
            if (networkRes && networkRes.status === 200) {
              const copy = networkRes.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
            }
            return networkRes;
          })
          .catch(() => cached);
      })
    );
    return;
  }
});
