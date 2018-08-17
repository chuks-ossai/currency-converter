const cacheName = 'v3';

// Call install Event
self.addEventListener('install', e => {
    console.log(`Service Worker Installed!`);
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log(`Service Worker Activated!`);
    // Remove previous caches that are no longer useful
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log(`Service Worker is clearing Old cache`);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log(`Service Worker is fetching`);
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // Make copy of response
            const cloneResponse = res.clone();
            // Open cache
            caches
            .open(cacheName)
            .then(cache => {
                // Add response to cache
                cache.put(e.request, cloneResponse);
            });
            return res
        }).catch(err => caches.match(e.request).then(res => res))
    );
});