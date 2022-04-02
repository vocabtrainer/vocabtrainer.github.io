// This code executes in its own worker or thread
self.addEventListener("install", event => {
   console.log("Service worker installed");
});
self.addEventListener("activate", event => {
   console.log("Service worker activated");
});


self.addEventListener("fetch", e => {
   e.respondWith(
      caches.open("pwa-assets").then(cache => {
         cache.match(e.request).then(res => {
            const nres = fetch(e.request).then(response => {
               cache.put(e.request, response.clone())
            })
            return res || nres
         })
      })
   )
})