const filesToCache = [
  './',
  'index.html',
  'web.html',
  'mobile.html',
  'ML.html',
  'PL.html',
  'images/test8.jpeg',
  'images/steven.png',
  'images/bill.jpg',
  'images/lg.png',
  'images/logo2.png',
  'images/stephen.png',
  'images/blog.jpg',
  'images/code.jpeg',
  'images/prgm.jpg',
  'images/ml2.jpg',
  'images/mob2.jpg',
  'images/mob_dev4.jpg',
  'images/ML.jpeg',
  'images/mlc7.jpg',
  'images/javaframe.jpg',
  'htmlc.html',
  'htmlb.html',
  'htmli.html',
  'cssi.html',
  'cssac.html',
  'cssb.html',
  'css/style.css',
  'js/app.js',
  './manifest.json'
  './js/main.js'

];
cacheName='staticM'
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

// remove previous cached data from disk
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
//fetch event: The service worker will first try to fetch the resource from the network, if that fails, it will return the offline page from the cache.
  self.addEventListener('fetch', function(event) { //L'événement fetch permet au prestataire de services d'intercepter toute requête réseau et de gérer les requêtes.
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }

          return fetch(event.request)
          .then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();

              caches.open(cacheName)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          );
        })
  )});
