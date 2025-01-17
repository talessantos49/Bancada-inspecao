self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('meu-pwa-cache').then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './styles/style.css',
                './scripts/app.js'
            ]);
        })
    );
    console.log('Service Worker instalado!');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
