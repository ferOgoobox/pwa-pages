;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_programador_fitness',
  urlsToCache = [
    './index.html',
    './style.css',
    './script.js',
    './img/oventa.png',
    './img/favicon.png',
    './index-offline.html'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

// self.addEventListener("fetch", event => {
//   const request = event.request;
//   if (!navigator.onLine && request.url.indexOf("index.html") === -1) {
//     event.respondWith(
//       caches.match(request).then(response => {
//         if (response) {
//           return response;
//         }
//         return caches.match("index-offline.html");
//       })
//     );
//   }
// });

self.addEventListener("fetch", (event) => {
  console.log()
  const request = event.request;
  if (!navigator.onLine && request.url.indexOf("index.html") === -1) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response;
        }
        return caches.match("index-offline.html");
      })
    );
  }
  // else{
  //   event.respondWith(
  //     caches.match(request).then(response => {
  //       if (response) {
  //         return response;
  //       }
  //     })
  //   );
  // }
});


// self.addEventListener("message", function(event) {
//   if (event.data === "executeAction") {
//     console.log('Fer')
//     // Ejecutar acción aquí
//     // Por ejemplo, enviar un mensaje de nuevo al contexto de la página
//     self.clients.matchAll().then(function(clients) {
//       clients.forEach(function(client) {
//         client.postMessage("actionExecuted");
//       });
//     });
//   }
// });

self.addEventListener("message", e => {
  if (e.data === "showOfflinePage") {
    self.addEventListener("fetch", (event) => {
      console.log()
      const request = event.request;
      if (!navigator.onLine && request.url.indexOf("index.html") === -1) {
        event.respondWith(
          caches.match(request).then(response => {
            if (response) {
              return response;
            }
            return caches.match("index-offline.html");
          })
        );
      }
    });
  }
})

self.addEventListener("sync", function(event) {
  if (event.tag === "myFirstSync") {
    console.log('ahi va lo del internet')
    event.waitUntil(
      // Aquí puedes escribir el código que quieres que se ejecute una vez que se recupere la conexión
    );
  }
});
