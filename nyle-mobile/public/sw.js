self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("nyle-cache-v1").then((cache) => {
      return cache.addAll(["/", "/manifest.json"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

