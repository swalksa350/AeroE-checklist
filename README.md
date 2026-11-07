# AeroE Checklist (offline PWA)

Tap-to-tick normal, abnormal and emergency checklists for common general aviation aircraft.
Pick an aircraft, work through the flight, and the app keeps progress per type on the device.
Installable on a phone and works with no network once opened once.
The header switch cycles the display between Auto (follows the phone), Day and Night; the choice is remembered on the device.
Tap the ☆ on an aircraft to add it to Favourites at the top of the picker (tap ★ to remove); the app also offers this after an aircraft has been opened three times.
Voice (Status → Voice, off by default): read aloud with tap or spoken confirmation, and tap-then-speak procedure recall.
The Status page shows the installed version and checks for updates; a bar appears when a new version is ready or has just been applied.

**Prototype content. Verify every item against the operator's approved checklist and the aircraft's POH/AFM before any use.**

## Files

- `guide.html` – user guide (linked from the app, works offline)

- `index.html` – the app (one page, no build step, no dependencies)
- `aircraft/<id>.js` – one checklist data file per aircraft type
- `sw.js` – service worker that precaches everything for offline use
- `manifest.webmanifest`, `icons/` – home-screen install
- `tools/validate.js` – checks every data file against the schema
- `tools/build.js` – regenerates the aircraft script tags and the service-worker precache list / version
- `tools/AUTHORING.md` – how to write a data file

## EFB edition (add-on)

`efb/` holds a self-contained HTML file and a printable PDF for every aircraft, for loading into an
EFB's Documents area (OzRunways, AvPlan). They are generated from the same data files by
`node tools/build-efb.js` and served at `/efb/` with a download page and loading instructions.
The folder is not part of the app's offline cache and the app does not depend on it.

## Adding or editing an aircraft

1. Copy an existing file in `aircraft/` to `aircraft/<new-id>.js` and edit it (see `tools/AUTHORING.md`).
2. `node tools/validate.js`
3. Add an entry at the top of `changes.json` (version, date, title, notes) – it feeds the What's new sheet and the update bars.
4. `node tools/build.js`  (updates `index.html` and bumps the service-worker version so installed phones update)
   then `node tools/build-efb.js` to regenerate the EFB files
5. Commit and push to `main`. GitHub Actions deploys to Pages.

Deep links: `https://<site>/#<id>` opens that aircraft directly, e.g. `#c172s`.

## Hosting

Static files only. Serve the folder over HTTPS (GitHub Pages, Netlify, Cloudflare Pages, any web host),
open the site on the phone and use "Add to Home Screen".
