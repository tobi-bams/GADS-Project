const CACHE_NAME = 'static-cache-v3';

const FILES_TO_CACHE = [
    '/index.html',
    '/manifest.json',
    '/index.js',
    './images/bg.jpg',
    '/images/icons/icon-32x32.png',
    '/css/main.css'
  ];

  self.addEventListener('install', (evt) => {
    //console.log('[ServiceWorker] Install');
    // CODELAB: Precache static resources here.
    
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
          //console.log('[ServiceWorker] Pre-caching offline page');
          return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
  });


  self.addEventListener('activate', (evt) => {
    //console.log('[ServiceWorker] Activate');
    // CODELAB: Remove previous cached data from disk.
        evt.waitUntil(
            caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                //console.log('[ServiceWorker] Removing old cache', key);
                return caches.delete(key);
                }
            }));
            })
        );
    self.clients.claim();
  });

  
  // self.addEventListener('fetch', (evt) => {
  //   console.log('[ServiceWorker] Fetch', evt.request.url);
  //   // CODELAB: Add fetch event handler here.
  //   if (evt.request.mode !== 'navigate') {
  //       // Not a page navigation, bail.
  //       return;
  //     }
  //     evt.respondWith(
  //       fetch(evt.request)
  //       .catch(() => {
  //         return caches.open(CACHE_NAME)
  //             .then((cache) => {
  //               return cache.match('/index.html');
  //             });
  //       })
  //     );
  // });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if(response){
          //console.log(response);
          return response;
        }
        return fetch(event.request);
      }
      )
    );
  });

  

  