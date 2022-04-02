// This code executes in its own worker or thread
const urlsToCache = [
   "./index.html",
   "./assets/js/books.js",
   "./assets/js/popup.js",
   "./assets/js/index.js",
   "./assets/js/popout.js",
   "./assets/css/index.css",
   "./assets/css/ui/colors.css",
   "./assets/css/ui/popup.css",
   "./assets/css/ui/checkbox.css",
   "./assets/css/ui/textbox.css",
   "./assets/css/ui/header.css",
   "./assets/css/ui/button.css",
   "./assets/css/ui/ui.css",
   "./assets/css/ui/popout.css",
   "./assets/icons/scalable.svg",
   "./assets/icons/512.png",
   "./assets/icons/1024.png",
   "./assets/icons/384.png",
   "./assets/icons/180.png",
   "./assets/icons/192.png",
   "./assets/images/placeholder.png",
   "./README.md"
 ]

self.addEventListener("install", event => {
   console.log("Service worker installed");
   caches.open("pwa-assets").then(cache => {
      cache.addAll(urlsToCache)
   })
});
self.addEventListener("activate", event => {
   console.log("Service worker activated");
});


self.addEventListener("fetch", e => {
   e.respondWith(
      caches.match(e.request).then(res => {
         const nres = fetch(e.request).then(response => {
            caches.open("pwa-assets").then(cache => {
               cache.put(e.request, response.clone())
            })
         })
         return res || nres
      })
   )
})