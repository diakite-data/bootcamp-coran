// Service Worker pour Bootcamp Coran
// Version du cache - à incrémenter à chaque mise à jour
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `bootcamp-coran-${CACHE_VERSION}`;

// Fichiers à mettre en cache pour le mode offline
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/manifest.json',
  '/pwa.js',
  // Notebooks (1 à 7)
  '/notebooks/notebook-1.html',
  '/notebooks/notebook-2.html',
  '/notebooks/notebook-3.html',
  '/notebooks/notebook-4.html',
  '/notebooks/notebook-5.html',
  '/notebooks/notebook-6.html',
  '/notebooks/notebook-7.html',
  // Icônes
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png',
  // Polices Google Fonts
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installation en cours...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Installation terminée');
        // Force l'activation immédiate
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Erreur lors de l\'installation:', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation en cours...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('bootcamp-coran-') && name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Suppression de l\'ancien cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activation terminée');
        // Prend le contrôle de toutes les pages immédiatement
        return self.clients.claim();
      })
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorer les requêtes vers d'autres domaines (sauf Google Fonts)
  if (url.origin !== location.origin && !url.hostname.includes('googleapis.com') && !url.hostname.includes('gstatic.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Stratégie "Cache First, Network Fallback"
        if (cachedResponse) {
          console.log('[SW] Réponse depuis le cache:', request.url);
          
          // Mise à jour en arrière-plan (stale-while-revalidate)
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME)
                  .then((cache) => cache.put(request, networkResponse));
              }
            })
            .catch(() => {
              // Ignorer les erreurs réseau lors de la mise à jour en arrière-plan
            });
          
          return cachedResponse;
        }
        
        // Pas en cache, essayer le réseau
        console.log('[SW] Requête réseau:', request.url);
        return fetch(request)
          .then((networkResponse) => {
            // Mettre en cache la nouvelle ressource
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch((error) => {
            console.error('[SW] Erreur réseau:', error);
            
            // Page offline de secours pour les pages HTML
            if (request.headers.get('Accept').includes('text/html')) {
              return caches.match('/index.html');
            }
            
            // Retourner une erreur pour les autres ressources
            return new Response('Contenu non disponible hors-ligne', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Écouter les messages depuis la page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});

// Notification de mise à jour disponible
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_UPDATE') {
    // Vérifier s'il y a une nouvelle version
    fetch('./manifest.json', { cache: 'no-store' })
      .then((response) => response.json())
      .then((manifest) => {
        event.ports[0].postMessage({ 
          updateAvailable: false,
          currentVersion: CACHE_VERSION
        });
      })
      .catch(() => {
        event.ports[0].postMessage({ 
          updateAvailable: false,
          currentVersion: CACHE_VERSION
        });
      });
  }
});
