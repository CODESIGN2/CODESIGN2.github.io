const CACHEVERSION = 'v9.16';
const CACHEDSTATICASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/jquery-1.11.3.min.js',
  '/js/jquery.smooth-scrolling.js',
  '/js/jquery.nicescroll.min.js',
  '/img/digital-world-opt.jpg',
  '/img/digital-world-opt-med.jpg',
  '/img/digital-world-opt-sml.jpg',
  '/img/pe-website-opt.jpg',
  '/img/business-systems.png',
  '/img/netbeans-coding.png',
  '/img/ariba_badge_245x100.jpg',
  '/css/google-fonts.css',
  '/fonts/russo-one-a.woff2',
  '/fonts/russo-one-b.woff2',
  '/fonts/russo-one-c.woff2',
  '/img/approvedbusiness.gif',
  '/img/ukwda_registered_rgb_web_blue_bg.png',
  '/thanks.html',
  '/error.html'
];

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHEVERSION).then(function(cache) {
            cache.addAll(CACHEDSTATICASSETS)
        }).then(this.skipWaiting())
    );
});

this.addEventListener('activate', function(event) {
    const currentCaches = [CACHEDSTATICASSETS];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return cacheNames.filter(function(cacheName) {
              !currentCaches.includes(cacheName)
            });
        }).then(function(cachesToDelete) {
            return Promise.all(cachesToDelete.map(
                function(cacheToDelete) {
                    return caches.delete(cacheToDelete);
                }
            ));
        }).then(function() {
            this.clients.claim()
        })
    );
});

this.addEventListener('fetch', function(event) {
    if(event.request.url.startsWith("https://www.codesign2.co.uk") && (event.request.method != "POST")) {
        event.respondWith( caches.match(event.request).catch( function() {
            return fetch(event.request);
        }).then(function(response) {
            //console.log(response, response instanceof Response);
            if(response instanceof Response) {
                caches.open(CACHEVERSION).then(function(cache) {
                    cache.put(event.request, response);
                });
                return response.clone();
            }
        }));
    }
});
