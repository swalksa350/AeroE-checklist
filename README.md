# C208B Electronic Checklist (offline PWA)

Tap-to-tick normal, abnormal and emergency checklists for the Cessna 208B Grand Caravan.
Installable on a phone and works with no network once opened once.

Prototype content. Verify against the operator's approved checklist and the POH/AFM before any use.

## Hosting

Static files only. Serve this folder over HTTPS (GitHub Pages, Netlify, Cloudflare Pages, any web host).
Then open the site on the phone and use "Add to Home Screen".

## Updating

After changing `index.html`, bump `VERSION` in `sw.js` so installed phones pick up the new build.
