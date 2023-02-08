if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err))
}

// document.getElementById("downloadProducts").addEventListener("click", function() {
//   //alert("Has hecho clic en el botón");

//   // Verificar conexión a internet
//   if (navigator.onLine) {
//     console.log("Estás conectado a internet");
//   } else {
//     console.log("No estás conectado a internet");

//     // Enviar un mensaje al service worker para que muestre la página index-offline.html
//     navigator.serviceWorker.controller.postMessage("showOfflinePage");
//   }
// });

// // Escuchar por un mensaje del service worker
// navigator.serviceWorker.addEventListener("message", function(event) {
//   if (event.data === "offlinePageShown") {
//     console.log("Se ha mostrado la página index-offline.html");
//   }
// });

//    if (navigator.onLine) {
//       console.log("Estás conectado a internet");
//     } else {
//       console.log("No estás conectado a internet");

//       // Enviar un mensaje al service worker para que muestre la página index-offline.html
//       navigator.serviceWorker.controller.postMessage("showOfflinePage");
//     }
// });
document.getElementById("downloadProducts").addEventListener("click", function() {

    fetch("https://dummyjson.com/products")
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function(products) {
      // aquí puedes hacer algo con los productos que se han descargado
      console.log('products', products)
      return caches.match("index.html");
    })
    .catch(function() {
      // Si la petición falla (por ejemplo, por falta de conexión a Internet),
      // muestra el contenido que se guardó en cache en el Service Worker
      return caches.match("index-offline.html");
    })
    .then(function(response) {
      if (response) {
        return response.text();
      }
    })
    .then(function(html) {
      document.open();
      document.write(html);
      document.close();


    });
  }
);


// // Escuchar por un mensaje del service worker
// navigator.serviceWorker.addEventListener("message", function(event) {
//   if (event.data === "onlinePageShown") {
//     console.log("Ha regresado el wifi");
//   }
// });


// navigator.serviceWorker.ready.then(function(registration) {
//   return registration.sync.register("myFirstSync");
// });


// // Detectar cambios de conexión
// function isOnline() {
//   if ( navigator.onLine ) {
//     console.log('online')

//     if (location.pathname !== '/index.html') {
//       location.replace('./index.html');
//     }

//   } else{
//       // No tenemos conexión
//       console.log('offline')
//       if (location.pathname !== '/index-offline.html') {
//         location.replace('./index-offline.html');
//       }
//   }
// }

// window.addEventListener('online', isOnline );
// window.addEventListener('offline', isOnline );

// isOnline();



