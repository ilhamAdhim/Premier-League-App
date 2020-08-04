importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

const CACHE_NAME = "premier-league-soccer";
const base_url = "https://api.football-data.org/v2/";

workbox.precaching.precacheAndRoute([
  '/',

  // HTML
  '/nav.html',
  '/team.html',
  '/index.html',
  '/pages/home.html',
  '/pages/saved.html',
  '/pages/participants.html',

  // Javascripts
  '/push.js',
  '/js/db.js',
  '/js/nav.js',
  '/js/api.js',
  '/js/idb.js',
  'js/main.js',
  '/js/materialize.min.js',

  // CSS
  '/css/style.css',
  '/css/materialize.min.css',

  // AOS
  'https://unpkg.com/aos@next/dist/aos.js',
  'https://unpkg.com/aos@next/dist/aos.css',

  //Manifest
  '/manifest.json',

  // Assets
  './iconsplash_512.png',
  './iconsplash_256.png',
  './assets/soccer-standing.png',
  './assets/AFC Bournemouth-stadium.jpg',
  './assets/Arsenal FC-stadium.jpg',
  './assets/Aston Villa FC-stadium.jpg',
  './assets/Brighton & Hove Albion FC-stadium.jpg',
  './assets/Burnley FC-stadium.jpg',
  './assets/Chelsea FC-stadium.jpg',
  './assets/Crystal Palace FC-stadium.jpg',
  './assets/Everton FC-stadium.jpg',
  './assets/Leicester City FC-stadium.jpg',
  './assets/Liverpool FC-stadium.jpg',
  './assets/Manchester City FC-stadium.jpg',
  './assets/Manchester United FC-stadium.jpg',
  './assets/Newcastle United FC-stadium.jpg',
  './assets/Norwich City FC-stadium.jpg',
  './assets/Sheffield United FC-stadium.jpg',
  './assets/Southampton FC-stadium.jpg',
  './assets/Tottenham Hotspur FC-stadium.jpg',
  './assets/Watford FC-stadium.jpg',
  './assets/West Ham United FC-stadium.jpg',
  './assets/Wolverhampton Wanderers FC-stadium.jpg',
  './assets/first-top-scorer.png',
  './assets/second-top-scorer.png',
  './assets/third-top-scorer.png'
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('/team.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'team-page'
  })
);

workbox.routing.registerRoute(
  new RegExp(base_url),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'apiCache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 60 // 30 Minutes
      })
    ]
  })
);


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