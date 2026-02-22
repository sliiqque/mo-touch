const CACHE_NAME = 'mo-touch-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg',
  'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
  'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js',
  'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js',
  'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js',
  'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js',
  'https://public.codepenassets.com/css/normalize-5.0.0.min.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (except CDN assets)
  if (url.origin !== location.origin && !url.hostname.includes('jsdelivr.net') && !url.hostname.includes('codepenassets.com')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(request)
          .then((fetchResponse) => {
            // Cache successful responses
            if (fetchResponse.ok) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, fetchResponse.clone());
                });
            }
            return fetchResponse;
          })
          .catch(() => {
            // Return offline page for HTML requests
            if (request.destination === 'document') {
              return new Response('Offline - Please check your connection', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            }
          });
      })
  );
});
