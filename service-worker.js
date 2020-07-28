const CACHE_NAME = "premier-league-soccer";
var urlsToCache = [
  "/",

  // HTML
  "/nav.html",
  "/team.html",
  "/index.html",
  "/pages/home.html",
  "/pages/saved.html",
  "/pages/leaderboard.html",
  "/pages/participants.html",

  // Javascripts
  "/push.js",
  "/js/db.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/idb.js",
  "js/main.js",
  "/js/materialize.min.js",

  // CSS
  "/css/style.css",
  "/css/materialize.min.css",

  // AOS
  "https://unpkg.com/aos@next/dist/aos.js",
  "https://unpkg.com/aos@next/dist/aos.css",

  //Manifest
  "/manifest.json",

  // Assets
  "assets/offline.png",
  "/iconsplash_512.png",
  "/iconsplash_256.png",
  "../assets/AFC Bournemouth-stadium.jpg",
  "../assets/Arsenal FC-stadium.jpg",
  "../assets/Aston Villa FC-stadium.jpg",
  "../assets/Brighton & Hove Albion FC-stadium.jpg",
  "../assets/Burnley FC-stadium.jpg",
  "../assets/Chelsea FC-stadium.jpg",
  "../assets/Crystal Palace FC-stadium.jpg",
  "../assets/Everton FC-stadium.jpg",
  "../assets/Leicester City FC-stadium.jpg",
  "../assets/Liverpool FC-stadium.jpg",
  "../assets/Manchester City FC-stadium.jpg",
  "../assets/Manchester United FC-stadium.jpg",
  "../assets/Newcastle United FC-stadium.jpg",
  "../assets/Norwich City FC-stadium.jpg",
  "../assets/Sheffield United FC-stadium.jpg",
  "../assets/Southampton FC-stadium.jpg",
  "../assets/Tottenham Hotspur FC-stadium.jpg",
  "../assets/Watford FC-stadium.jpg",
  "../assets/West Ham United FC-stadium.jpg",
  "../assets/Wolverhampton Wanderers FC-stadium.jpg",
  "../assets/offline.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(

      caches.match(event.request, { ignoreSearch: true }).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});