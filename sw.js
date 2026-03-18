const cacheName = 'basecamp-v2'; // Incremented version
const assets = [
  './',
  './index.html',
  './manifest.json',
  // Add your image paths here so they work offline
  './images/header.png',
  './images/icon-192.png',
  './images/icon-512.png',
  // Google Fonts CSS and Styles
  'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Alfa+Slab+One&family=Montserrat:wght@400;700&display=swap'
];

// Install Event: Caches the "Trail Map" (assets)
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Basecamp: Caching trail assets');
      return cache.addAll(assets);
    })
  );
});

// Activate Event: Cleans up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Event: Serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
