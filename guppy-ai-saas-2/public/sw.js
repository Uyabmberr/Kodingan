// Service Worker for caching and scalability
const CACHE_NAME = 'guppy-ai-saas-v1';
const STATIC_CACHE = 'guppy-ai-static-v1';
const DYNAMIC_CACHE = 'guppy-ai-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/member-dashboard',
    '/pricing',
    '/globals.css',
    '/guppy-logo.svg',
    '/next.svg',
    '/vercel.svg',
    '/window.svg',
    '/file.svg',
    '/globe.svg'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[Service Worker] Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .catch((error) => {
                console.log('[Service Worker] Error caching static files:', error);
            })
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests and external requests
    if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) {
        return;
    }

    // Cache strategy: Cache First for static assets, Network First for API calls
    if (url.pathname.startsWith('/api/')) {
        // Network First for API calls
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache successful responses
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then((cache) => cache.put(request, responseClone));
                    }
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if network fails
                    return caches.match(request);
                })
        );
    } else {
        // Cache First for static assets
        event.respondWith(
            caches.match(request)
                .then((response) => {
                    if (response) {
                        return response;
                    }

                    return fetch(request)
                        .then((response) => {
                            // Don't cache if not successful
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }

                            const responseClone = response.clone();
                            caches.open(DYNAMIC_CACHE)
                                .then((cache) => cache.put(request, responseClone));

                            return response;
                        });
                })
        );
    }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);

    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Implement background sync logic here
    console.log('[Service Worker] Performing background sync');
}

// Push notifications (for future scalability)
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push received:', event);

    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/guppy-logo.svg',
            badge: '/guppy-logo.svg',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification click:', event);
    event.notification.close();

    event.waitUntil(
        clients.openWindow('/member-dashboard')
    );
});
