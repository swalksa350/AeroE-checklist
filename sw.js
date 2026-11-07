const VERSION = "ga-ecl-1a7c4b2d";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./aircraft/a36.js",
  "./aircraft/b200.js",
  "./aircraft/be58.js",
  "./aircraft/c152.js",
  "./aircraft/c172s.js",
  "./aircraft/c182t.js",
  "./aircraft/c206h.js",
  "./aircraft/c208b.js",
  "./aircraft/c210m.js",
  "./aircraft/c210r.js",
  "./aircraft/c310r.js",
  "./aircraft/c402c.js",
  "./aircraft/c441.js",
  "./aircraft/da40.js",
  "./aircraft/da42.js",
  "./aircraft/ga8.js",
  "./aircraft/m20j.js",
  "./aircraft/m7-235.js",
  "./aircraft/pa28-161.js",
  "./aircraft/pa28-181.js",
  "./aircraft/pa28r-201.js",
  "./aircraft/pa31-310.js",
  "./aircraft/pa31-350.js",
  "./aircraft/pa44-180.js",
  "./aircraft/pa46-310p.js",
  "./aircraft/sr20.js",
  "./aircraft/sr22.js",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  const isPage = e.request.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html");
  if (isPage) {
    // Page: try the network briefly so a launch with signal shows the newest build; fall back to the cache offline.
    e.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 3000);
        const res = await fetch(e.request, { signal: ctrl.signal });
        clearTimeout(timer);
        if (res && res.ok) { cache.put(e.request, res.clone()); return res; }
        throw new Error("bad response");
      } catch (err) {
        return (await cache.match(e.request, { ignoreSearch: true })) || (await cache.match("./index.html"));
      }
    })());
    return;
  }
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(cached => {
      const refresh = fetch(e.request).then(res => {
        if (res && res.ok) caches.open(VERSION).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => cached);
      return cached || refresh;
    })
  );
});
