#!/usr/bin/env node
/* Regenerates the aircraft <script> tags in index.html and the precache list + version in sw.js.
   Run after adding, removing or editing anything: node tools/build.js */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const root = path.join(__dirname, "..");
const files = fs.readdirSync(path.join(root, "aircraft")).filter(f => f.endsWith(".js")).sort();

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const wbFiles = fs.existsSync(path.join(root, "wb")) ? fs.readdirSync(path.join(root, "wb")).filter(f => f.endsWith(".js")).sort() : [];
const perfFiles = fs.existsSync(path.join(root, "perf")) ? fs.readdirSync(path.join(root, "perf")).filter(f => f.endsWith(".js")).sort() : [];
const tags = files.map(f => `<script src="aircraft/${f}"></script>`).concat(wbFiles.map(f => `<script src="wb/${f}"></script>`), perfFiles.map(f => `<script src="perf/${f}"></script>`)).join("\n");
html = html.replace(/(<!-- aircraft:start[^>]*-->)[\s\S]*?(<!-- aircraft:end -->)/, `$1\n${tags}\n$2`);
fs.writeFileSync(path.join(root, "index.html"), html);

const assets = ["./", "./index.html", "./manifest.webmanifest", "./changes.json", "./guide.html", ...files.map(f => `./aircraft/${f}`), ...wbFiles.map(f => `./wb/${f}`), ...perfFiles.map(f => `./perf/${f}`),
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
