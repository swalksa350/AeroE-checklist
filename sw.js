const VERSION = "ga-ecl-2f039b7e";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./changes.json",
  "./guide.html",
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
  "./aircraft/m6-235.js",
  "./aircraft/m7-235.js",
  "./aircraft/pa28-161.js",
  "./aircraft/pa28-181.js",
  "./aircraft/pa28r-201.js",
  "./aircraft/pa31-310.js",
  "./aircraft/pa31-350.js",
  "./aircraft/pa44-180.js",
  "./aircraft/pa46-310p.js",
  "./aircraft/pa46r-350t.js",
  "./aircraft/pc12-45.js",
  "./aircraft/sr20.js",
  "./aircraft/sr22.js",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS.map(a => new Request(a, { cache: "no-cache" })))).then(() => self.skipWaiting()));
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
        // "no-cache" = always revalidate with the server (cheap: a 304 when unchanged), never trust the HTTP cache
        // A navigation Request cannot be cloned with new options, so fetch by URL instead
        const res = await fetch(e.request.url, { cache: "no-cache", credentials: "same-origin", signal: ctrl.signal });
        clearTimeout(timer);
        if (res && res.ok) { cache.put(e.request, res.clone()); return res; }
        throw new Error("bad response");
      } catch (err) {
        const hit = await cache.match(e.request.url.split("#")[0], { ignoreSearch: true });
        if (hit) return hit;
        if (url.pathname.includes("/efb/")) {
          return new Response("<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width'><title>Offline</title><body style='font-family:sans-serif;padding:24px;max-width:40em'><h1>No connection</h1><p>EFB files are downloaded from the server when you send them to your EFB, so they need signal the first time. Try again when online.</p><p><a href='../'>Back to the app</a></p>", { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
        }
        return (await cache.match("./index.html")) || Response.error();
      }
    })());
    return;
  }
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(cached => {
      const refresh = fetch(new Request(e.request, { cache: "no-cache" })).then(res => {
        if (res && res.ok) caches.open(VERSION).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => cached);
      return cached || refresh;
    })
  );
});
