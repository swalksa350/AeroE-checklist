#!/usr/bin/env node
/* Regenerates the aircraft <script> tags in index.html and the precache list + version in sw.js.
   Run after adding, removing or editing anything: node tools/build.js */
require("./build-naips");
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const root = path.join(__dirname, "..");
const files = fs.readdirSync(path.join(root, "aircraft")).filter(f => f.endsWith(".js")).sort();

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const wbFiles = fs.existsSync(path.join(root, "wb")) ? fs.readdirSync(path.join(root, "wb")).filter(f => f.endsWith(".js")).sort() : [];
const perfFiles = fs.existsSync(path.join(root, "perf")) ? fs.readdirSync(path.join(root, "perf")).filter(f => f.endsWith(".js")).sort() : [];
const dataFiles = fs.existsSync(path.join(root, "data")) ? fs.readdirSync(path.join(root, "data")).filter(f => f.endsWith(".js")).sort() : [];
const tags = files.map(f => `<script src="aircraft/${f}"></script>`).concat(wbFiles.map(f => `<script src="wb/${f}"></script>`), perfFiles.map(f => `<script src="perf/${f}"></script>`), dataFiles.map(f => `<script src="data/${f}"></script>`)).join("\n");
html = html.replace(/(<!-- aircraft:start[^>]*-->)[\s\S]*?(<!-- aircraft:end -->)/, `$1\n${tags}\n$2`);
fs.writeFileSync(path.join(root, "index.html"), html);

const assets = ["./", "./index.html", "./manifest.webmanifest", "./changes.json", "./guide.html", "./terms.html", "./privacy.html", ...files.map(f => `./aircraft/${f}`), ...wbFiles.map(f => `./wb/${f}`), ...perfFiles.map(f => `./perf/${f}`), ...dataFiles.map(f => `./data/${f}`),
  ...fs.readdirSync(path.join(root, "icons")).sort().map(f => `./icons/${f}`)];
const hash = crypto.createHash("sha1");
hash.update(html.replace(/const BUILD = "[^"]*";/, 'const BUILD = "";'));
for (const a of assets.slice(2)) hash.update(fs.readFileSync(path.join(root, a)));
const version = hash.digest("hex").slice(0, 8);
html = html.replace(/const BUILD = "[^"]*";/, `const BUILD = "${version}";`);
fs.writeFileSync(path.join(root, "index.html"), html);
let sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
sw = sw.replace(/const VERSION = "[^"]*";/, `const VERSION = "ga-ecl-${version}";`)
       .replace(/const ASSETS = \[[\s\S]*?\];/, `const ASSETS = [\n${assets.map(a => `  "${a}"`).join(",\n")}\n];`);
fs.writeFileSync(path.join(root, "sw.js"), sw);
console.log(`${files.length} aircraft, ${wbFiles.length} W&B templates, ${perfFiles.length} performance sets, ${assets.length} precached files, build ${version}`);
/* syntax check: every inline script in index.html must parse, or the build fails (a broken app must never ship) */
{ const vm = require("vm"); const html = fs.readFileSync(path.join(root, "index.html"), "utf8"); const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]; scripts.forEach((m, i) => { try { new vm.Script(m[1], { filename: "index.html inline script " + i }); } catch (e) { console.error("SYNTAX ERROR in index.html inline script " + i + ": " + e.message); process.exit(1); } }); }
/* line comment that swallows code: a "//" comment followed by a declaration on the same line hides that code (the file still parses) */
{ const html = fs.readFileSync(path.join(root, "index.html"), "utf8"); const bad = html.split("\n").map((l, i) => [i + 1, l]).filter(([i, l]) => /\/\/[^\n]*\b(const|let|var|function)\s+\w+\s*[=(]/.test(l) && !/https?:\/\//.test(l) && !/^\s*\/\//.test(l)); if (bad.length) { bad.forEach(([i, l]) => console.error("LINE COMMENT SWALLOWS CODE at index.html:" + i + ": " + l.trim().slice(0, 120))); process.exit(1); } }
