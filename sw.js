const CACHE_NAME = 'aetheris-pwa-v12';
const OFFLINE_URL = '/offline.html';
const SUBWAY_URL = '/subway.html';

const STATIC_ASSETS = [
  '/',
  '/hero.html',
  '/offline.html',
  '/offline',
  '/subway.html',
  '/subway',
  '/manifest.json',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
  // Subway Surfers: Mumbai 3D (100% Offline PWA Play)
  '/assets/games/subway/subway-bundle.js?v=2.8.0',
  '/assets/games/subway/subway-bundle.js?v=2.7.0',
  '/assets/games/subway/subway-bundle.js',
  '/assets/games/subway/core.glb',
  '/assets/games/subway/scenery.glb',
  '/assets/games/subway/promo_mumbai_sunset.jpg',
  '/assets/games/subway/promo_mumbai_night.jpg',
  '/assets/games/subway/GLTFLoader.js',
  '/assets/games/subway/three.min.js',
  '/assets/games/subway/open-world-dev.js?v=3.0.0',
  '/assets/games/subway/open-world-dev.js'
];

async function cacheCleanResponse(cache, url, res) {
  if (!res || res.status !== 200) return;
  const headers = new Headers(res.headers);
  headers.delete('Cache-Control');
  headers.delete('Pragma');
  headers.delete('Expires');
  const body = await res.clone().arrayBuffer();
  const cleanRes = new Response(body, {
    status: res.status,
    statusText: res.statusText,
    headers
  });
  await cache.put(url, cleanRes.clone());

  // Also alias clean paths for subway & offline & bundle
  if (url === '/subway.html') {
    await cache.put('/subway', cleanRes.clone());
  } else if (url === '/offline.html') {
    await cache.put('/offline', cleanRes.clone());
  } else if (url.includes('subway-bundle.js')) {
    await cache.put('/assets/games/subway/subway-bundle.js', cleanRes.clone());
    await cache.put('/assets/games/subway/subway-bundle.js?v=2.8.0', cleanRes.clone());
  } else if (url.includes('open-world-dev.js')) {
    await cache.put('/assets/games/subway/open-world-dev.js', cleanRes.clone());
    await cache.put('/assets/games/subway/open-world-dev.js?v=3.0.0', cleanRes.clone());
  }
}

async function precacheAllAssets() {
  const cache = await caches.open(CACHE_NAME);
  const primaryUrls = [
    '/subway.html',
    '/offline.html',
    '/assets/games/subway/three.min.js',
    '/assets/games/subway/subway-bundle.js?v=2.8.0',
    '/assets/games/subway/open-world-dev.js?v=3.0.0',
    '/assets/games/subway/core.glb',
    '/assets/games/subway/scenery.glb',
    '/assets/games/subway/promo_mumbai_sunset.jpg',
    '/assets/games/subway/promo_mumbai_night.jpg',
    '/assets/games/subway/GLTFLoader.js',
    '/assets/games/subway/three.min.js',
    '/manifest.json',
    '/pwa-192x192.png',
    '/pwa-512x512.png',
    '/pwa-maskable-512x512.png',
    '/apple-touch-icon.png',
    '/'
  ];

  await Promise.allSettled(
    primaryUrls.map(async (url) => {
      try {
        const res = await fetch(url, { cache: 'no-cache', credentials: 'same-origin' });
        if (res && res.status === 200) {
          await cacheCleanResponse(cache, url, res);
        }
      } catch (err) {
        console.warn('[SW Precache] Skip:', url, err?.message || err);
      }
    })
  );
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(precacheAllAssets());
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

self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data.type === 'WARM_SUBWAY_CACHE') {
    event.waitUntil(precacheAllAssets());
  }
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

function fetchWithTimeout(request, timeoutMs = 3500) {
  return new Promise((resolve, reject) => {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = setTimeout(() => {
      if (controller) controller.abort();
      reject(new Error('Network timeout'));
    }, timeoutMs);

    fetch(request, controller ? { cache: 'no-cache', signal: controller.signal } : { cache: 'no-cache' })
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

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

  const isSubwayPage = url.pathname === '/subway.html' || url.pathname === '/subway';
  const isOfflinePage = url.pathname === '/offline.html' || url.pathname === '/offline';

  // 1. Instant Cache-First + Background Revalidate for /subway.html and /offline.html
  if (isSubwayPage || isOfflinePage) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const canonicalPath = isSubwayPage ? SUBWAY_URL : OFFLINE_URL;
        const cached =
          (await cache.match(canonicalPath, { ignoreSearch: true })) ||
          (await cache.match(url.pathname, { ignoreSearch: true })) ||
          (await cache.match(req, { ignoreSearch: true }));

        const networkUpdate = fetchWithTimeout(canonicalPath, 3000)
          .then(async (res) => {
            if (res && res.status === 200) {
              await cacheCleanResponse(cache, canonicalPath, res.clone());
              return res;
            }
            return null;
          })
          .catch(() => null);

        if (cached) {
          event.waitUntil(networkUpdate);
          return cached;
        }

        const fresh = await networkUpdate;
        if (fresh) return fresh;

        const fallback =
          (await cache.match(SUBWAY_URL, { ignoreSearch: true })) ||
          (await cache.match(OFFLINE_URL, { ignoreSearch: true }));
        if (fallback) return fallback;

        return new Response(getEmergencyOfflineHtml(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      })()
    );
    return;
  }

  // 2. Cache-First for all Subway Surfers 3D models, bundles, textures, and PWA static assets
  const isStaticOrSubwayAsset =
    url.pathname.startsWith('/assets/games/subway/') ||
    STATIC_ASSETS.some((asset) => url.pathname === asset || url.pathname === asset.split('?')[0]);

  if (isStaticOrSubwayAsset && !url.pathname.endsWith('.html') && url.pathname !== '/') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        // Match exact versioned URL first so version bumps (?v=2.8.0) fetch fresh code when online
        const exactCached = await cache.match(req, { ignoreSearch: false });
        if (exactCached) return exactCached;

        if (self.navigator && self.navigator.onLine === false) {
          const anyCached =
            (await cache.match(req, { ignoreSearch: true })) ||
            (await cache.match(url.pathname, { ignoreSearch: true }));
          if (anyCached) return anyCached;
        }

        try {
          const networkRes = await fetch(req);
          if (networkRes && networkRes.status === 200) {
            await cacheCleanResponse(cache, url.pathname + url.search, networkRes.clone());
          }
          return networkRes;
        } catch (err) {
          const retryCached =
            (await cache.match(req, { ignoreSearch: true })) ||
            (await cache.match(url.pathname, { ignoreSearch: true }));
          if (retryCached) return retryCached;
          throw err;
        }
      })()
    );
    return;
  }

  const acceptHeader = req.headers.get('accept') || '';
  const isNavigation =
    req.mode === 'navigate' ||
    acceptHeader.includes('text/html') ||
    url.pathname === '/' ||
    url.pathname.endsWith('.html');

  // 3. For HTML navigation: Fast Network-First with timeout falling back to cached page or /offline.html
  if (isNavigation) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);

        if (self.navigator && self.navigator.onLine === false) {
          const exactOfflineMatch =
            (await cache.match(req, { ignoreSearch: true })) ||
            (await cache.match(url.pathname, { ignoreSearch: true }));
          if (exactOfflineMatch) return exactOfflineMatch;

          const offlinePage = await cache.match(OFFLINE_URL, { ignoreSearch: true });
          if (offlinePage) return offlinePage;

          const subwayPage = await cache.match(SUBWAY_URL, { ignoreSearch: true });
          if (subwayPage) return subwayPage;

          return new Response(getEmergencyOfflineHtml(), {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }

        try {
          const res = await fetchWithTimeout(req, 3500);
          if (res && res.status === 200 && (res.type === 'basic' || res.type === 'default')) {
            const copy = res.clone();
            cache.put(req, copy).catch(() => {});
            return res;
          }
          throw new Error('Non-200 navigation response: ' + (res ? res.status : 'null'));
        } catch (err) {
          const exactMatch =
            (await cache.match(req, { ignoreSearch: true })) ||
            (await cache.match(url.pathname, { ignoreSearch: true }));
          if (exactMatch) return exactMatch;

          const offlineFallback = await cache.match(OFFLINE_URL, { ignoreSearch: true });
          if (offlineFallback) return offlineFallback;

          const subwayFallback = await cache.match(SUBWAY_URL, { ignoreSearch: true });
          if (subwayFallback) return subwayFallback;

          return new Response(getEmergencyOfflineHtml(), {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }
      })()
    );
    return;
  }

  // 4. General same-origin static assets fallback (JS, CSS, images, fonts, GLB)
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const res = await fetch(req);
        if (res && res.status === 200 && (res.type === 'basic' || res.type === 'default')) {
          cache.put(req, res.clone()).catch(() => {});
        }
        return res;
      } catch (err) {
        const cached =
          (await cache.match(req, { ignoreSearch: true })) ||
          (await cache.match(url.pathname, { ignoreSearch: true }));
        if (cached) return cached;
        throw err;
      }
    })()
  );
});
