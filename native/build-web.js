#!/usr/bin/env node
/* Copies the web app from the parent folder into ./www for Capacitor and adjusts it for a native shell:
   - no service worker (the shell bundles everything; updates come through the stores)
   - the offline speech engine and model are bundled, so no download step
   - a flag the app reads to know it is running natively
   Run: npm run build:web   (or npm run sync to also run `cap sync`) */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), out = path.join(__dirname, "www");
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
const copyDir = (from, to) => { fs.mkdirSync(to, { recursive: true }); for (const f of fs.readdirSync(from)) { const s = path.join(from, f), d = path.join(to, f); if (fs.statSync(s).isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d); } };
for (const f of ["changes.json", "guide.html", "manifest.webmanifest"]) fs.copyFileSync(path.join(root, f), path.join(out, f));
for (const d of ["aircraft", "wb", "perf", "icons", "offline", "efb"]) copyDir(path.join(root, d), path.join(out, d));
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
// flag + no service worker registration
html = html.replace("<script>\n/* ---------------- DATA ----------------", "<script>window.AEROE_NATIVE = true;</script>\n<script>\n/* ---------------- DATA ----------------");
html = html.replace(/if \("serviceWorker" in navigator && location\.protocol !== "file:"\) \{/, 'if (false) {');
fs.writeFileSync(path.join(out, "index.html"), html);
const size = dir => fs.readdirSync(dir).reduce((n, f) => { const p = path.join(dir, f); return n + (fs.statSync(p).isDirectory() ? size(p) : fs.statSync(p).size); }, 0);
console.log(`www built: ${(size(out) / 1048576).toFixed(1)} MB`);
