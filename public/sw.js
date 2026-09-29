/* CNSS-edu PWA service worker — offline-first, whole-site caching.
 *
 * Strategy:
 *  - Navigations (the SPA shell): network-first → cached shell → inline offline page.
 *    The app is a hash-routed client SPA, so the single cached "/" shell serves every page.
 *  - Static assets & chunks: cache-first (hashed /_next/static stays immutable;
 *    non-hashed get a background refresh = stale-while-revalidate).
 *  - /api/* : network-only (the app degrades gracefully offline).
 *  - Everything is captured on first visit; PwaRegister additionally prefetches
 *    all view chunks so every page works offline after the FIRST load.
 */
const VERSION = "cnss-v2";
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const MAX_RUNTIME_ENTRIES = 600;

const OFFLINE_HTML = `<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CNSS-edu — دون اتصال</title>
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0a0f0d;color:#e6f4ee;font-family:system-ui,"Segoe UI",Tahoma,sans-serif;text-align:center;padding:2rem}
.c{max-width:26rem}
svg{width:72px;height:72px;margin-bottom:1rem}
h1{font-size:1.3rem;margin:.2rem 0 .8rem}
p{color:#9fb8ad;line-height:1.8;font-size:.95rem}
b{color:#34d399}
</style></head><body><div class="c">
<svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
<h1>لا يوجد اتصال بالإنترنت — No internet</h1>
<p>افتح التطبيق المثبّت <b>CNSS-edu</b> ليعمل كاملاً دون اتصال.<br>
Open the installed <b>CNSS-edu</b> app — it works fully offline.</p>
</div></body></html>`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(SHELL_CACHE);
        await cache.addAll([
          "/manifest.webmanifest",
          "/offline.html",
          "/icons/icon-96.png",
          "/icons/icon-192.png",
          "/icons/icon-512.png",
          "/icons/maskable-192.png",
          "/icons/maskable-512.png",
          "/icons/apple-touch-icon.png",
        ]);
      } catch { /* best effort */ }
      // Warm the app shell document so the SPA is servable offline immediately.
      try {
        const fresh = await fetch(new Request("/", { credentials: "same-origin" }));
        if (fresh && fresh.ok) {
          const cache = await caches.open(SHELL_CACHE);
          await cache.put("/", fresh.clone());
        }
      } catch { /* offline during install — fine */ }
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)));
      await self.clients.claim();
      const clients = await self.clients.matchAll({ includeUncontrolled: true, type: "window" });
      for (const cl of clients) cl.postMessage({ type: "SW_ACTIVATED", version: VERSION });
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
  if (event.data && event.data.type === "CACHE_URLS" && Array.isArray(event.data.urls)) {
    event.waitUntil(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        for (const u of event.data.urls) {
          try {
            const r = await fetch(new Request(u, { credentials: "same-origin" }));
            if (r && r.ok) await cache.put(u, r.clone());
          } catch { /* skip */ }
        }
        await trimRuntime();
      })()
    );
  }
});

async function trimRuntime() {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    const keys = await cache.keys();
    if (keys.length > MAX_RUNTIME_ENTRIES) {
      for (const req of keys.slice(0, keys.length - MAX_RUNTIME_ENTRIES)) {
        await cache.delete(req);
      }
    }
  } catch { /* ignore */ }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return; // network-only; app degrades offline
  if (url.pathname === "/sw.js") return;

  // Document navigations → network-first, shell fallback (SPA: "/" serves all hash pages)
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          if (fresh && fresh.ok) {
            const cache = await caches.open(SHELL_CACHE);
            await cache.put("/", fresh.clone());
          }
          return fresh;
        } catch {
          const cached = (await caches.match(req, { ignoreSearch: true })) || (await caches.match("/", { ignoreSearch: true }));
          return cached || new Response(OFFLINE_HTML, { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 200 });
        }
      })()
    );
    return;
  }

  // Static assets & build chunks → cache-first (+ background SWR refresh for non-hashed)
  event.respondWith(
    (async () => {
      const cached = await caches.match(req, { ignoreVary: true, ignoreSearch: true });
      if (cached) {
        if (!url.pathname.startsWith("/_next/static/")) {
          fetch(req)
            .then((r) => (r && r.ok ? caches.open(RUNTIME_CACHE).then((c) => c.put(req, r.clone())) : null))
            .catch(() => {});
        }
        return cached;
      }
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok && (fresh.type === "basic" || fresh.type === "default")) {
          const cache = await caches.open(RUNTIME_CACHE);
          await cache.put(req, fresh.clone());
          trimRuntime();
        }
        return fresh;
      } catch {
        return new Response("", { status: 504, statusText: "Offline" });
      }
    })()
  );
});
