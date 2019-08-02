const CACHEVERSION = 'v20';
const CACHEDSTATICASSETS = [
  '/',
  '/index.html',
  '/favicon.ico'
];

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    //returns installed service workers
    if (registrations.length) {
      for(let registration of registrations) {
        console.log(registration);
        registration.unregister();
      }
    }
  });
}
self.addEventListener('install', function(event) {
  caches.open(CACHEVERSION).then(function(cache) {
      cache.addAll(CACHEDSTATICASSETS)
  }).then(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
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
            self.clients.claim()
        })
    );
});

self.addEventListener('fetch', function(event) {
  if( (event.request.url.startsWith("https://www.codesign2.co.uk")) &&
      (event.request.method == "GET") ) { // Not X-domain
    // Try network and if it fails, go for the cached copy.
    event.respondWith(
      fromNetwork(event.request, 500)
        .catch(function () {
          return fromCache(event.request);
        })
    );
  }
});

function redirect(res, url) {
    res.header('X-Redirect-To', url);
    res.end();
}

// Time limited network request. If the network fails or the response is not
// served before timeout, the promise is rejected.
function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    // Reject in case of timeout.
    var timeoutId = setTimeout(reject, timeout);
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);

      if (response.ok) {
        // update stored in cache
        caches.open(CACHEVERSION).then(function(cache) {
          cache.put(request, response);
        });

        // Fulfill in case of success.
        fulfill(response.clone());
      }
    })
    // Reject also if network fetch rejects.
    .catch(reject);
  });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHEVERSION).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}
