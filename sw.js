<<<<<<< HEAD
var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';


self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function (cache) {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll([

                    '/',
                    '/index.html',
                    '/restaurant.html',
                    '/js/main.js',
                    '/js/restaurant_info.js',
                    '/js/dbhelper.js',
                    '/js/app/js',
                    '/css/over550.css',
                    '/css/over850.css',
                    '/css/styles.css',
                    '/data/restaurants.json'


                ]);

            })
    )
});


self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    //we do cleanup here
    event.waitUntil(
        caches.keys()
            .then(function (KeyList) {
                return Promise.all(KeyList.map(function (key) {
                    if(key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME)
                    {
                        console.log('[Service Worker] Removing old Cache' , key);
                        return caches.delete(key);
                    }
                }));
            })
    );

    return self.clients.claim();
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if(response){
                    return response;
                }else{
                    return fetch(event.request)
                        .then(function (res) {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then(function (cache) {
                                    cache.put(event.request.url,res.clone());
                                    return res;
                                })
                        })
                        .catch(function (err) {
                            return caches.open(CACHE_STATIC_NAME)
                                .then(function (cache) {
                                    return cache.match('/offline.html');
                                });
                        });
                }
            })
    );
=======
var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';


self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function (cache) {
                console.log('[Service Worker] Precaching App Shell');
                cache.addAll([

                    '/',
                    '/index.html',
                    '/restaurant.html',
                    '/js/main.js',
                    '/js/restaurant_info.js',
                    '/js/dbhelper.js',
                    '/js/app/js',
                    '/css/over550.css',
                    '/css/over850.css',
                    '/css/styles.css',
                    '/data/restaurants.json'


                ]);

            })
    )
});


self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    //we do cleanup here
    event.waitUntil(
        caches.keys()
            .then(function (KeyList) {
                return Promise.all(KeyList.map(function (key) {
                    if(key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME)
                    {
                        console.log('[Service Worker] Removing old Cache' , key);
                        return caches.delete(key);
                    }
                }));
            })
    );

    return self.clients.claim();
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if(response){
                    return response;
                }else{
                    return fetch(event.request)
                        .then(function (res) {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then(function (cache) {
                                    cache.put(event.request.url,res.clone());
                                    return res;
                                })
                        })
                        .catch(function (err) {
                            return caches.open(CACHE_STATIC_NAME)
                                .then(function (cache) {
                                    return cache.match('/offline.html');
                                });
                        });
                }
            })
    );
>>>>>>> ff87d5a5f525850b5b52be3fdfa90790ad8f2d21
});