/**
 * CalcVerse Service Worker
 * Cache-first for static assets, network-first for API calls.
 */
const CACHE_NAME = 'calcverse-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app/dashboard.html',
  '/assets/css/main.css',
  '/assets/css/calculator.css',
  '/assets/css/keypad.css',
  '/assets/css/themes.css',
  '/assets/css/output.css',
  '/assets/css/accessibility.css',
  '/assets/js/core/storage.js',
  '/assets/js/core/theme.js',
  '/assets/js/core/search.js',
  '/assets/js/core/router.js',
  '/assets/js/components/sidebar.js',
  '/assets/js/components/toast.js',
  '/assets/js/components/modal.js',
  '/assets/js/engines/math-engine.js',
  '/assets/js/engines/finance-engine.js',
  '/assets/js/engines/health-engine.js',
  '/assets/js/engines/unit-engine.js',
  '/assets/js/engines/date-engine.js',
  '/assets/js/engines/api-client.js',
  '/assets/icons/calcverse.svg',
  '/assets/icons/calcverse-192.svg',
  '/manifest.json',
];

// ===== Install: Cache static assets =====
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('SW: Failed to cache some assets', err);
      });
    })
  );
  self.skipWaiting();
});

// ===== Activate: Clean old caches =====
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// ===== Fetch: Network-first for API, cache-first for static =====
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API calls: network-first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || new Response(
              JSON.stringify({ error: 'Offline', detail: 'API unavailable offline' }),
              { status: 503, headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // HTML pages: network-first (always show latest)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  // Static assets: cache-first, network update
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => {});

      return cached || fetchPromise;
    })
  );
});
