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

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/valores')) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch (event.request).then((fetchResponse) => {
                    return caches.open('dados-dinamicos').then((cache) => {
                        cache.put(event.request.url, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    }
});

app.get('/exportar', (req,res) => {
    db.all('SELECT * FROM valores', [], (err,rows) => {
        if(err) {
            return res.status(500).send('Erro ao exportar dados.');
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(rows));
    });
});