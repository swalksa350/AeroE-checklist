#!/usr/bin/env node
/* Regenerates the aircraft <script> tags in index.html and the precache list + version in sw.js.
   Run after adding, removing or editing anything: node tools/build.js */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const root = path.join(__dirname, "..");
const files = fs.readdirSync(path.join(root, "aircraft")).filter(f => f.endsWith(".js")).sort();

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const tags = files.map(f => `<script src="aircraft/${f}"></script>`).join("\n");
html = html.replace(/(<!-- aircraft:start[^>]*-->)[\s\S]*?(<!-- aircraft:end -->)/, `$1\n${tags}\n$2`);
fs.writeFileSync(path.join(root, "index.html"), html);

const assets = ["./", "./index.html", "./manifest.webmanifest", ...files.map(f => `./aircraft/${f}`),
  ...fs.readdirSync(path.join(root, "icons")).sort().map(f => `./icons/${f}`)];
const hash = crypto.createHash("sha1");
for (const a of assets.slice(1)) hash.update(fs.readFileSync(path.join(root, a)));
const version = "ga-ecl-" + hash.digest("hex").slice(0, 10);
let sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
sw = sw.replace(/const VERSION = "[^"]*";/, `const VERSION = "${version}";`)
       .replace(/const ASSETS = \[[\s\S]*?\];/, `const ASSETS = [\n${assets.map(a => `  "${a}"`).join(",\n")}\n];`);
fs.writeFileSync(path.join(root, "sw.js"), sw);
console.log(`${files.length} aircraft, ${assets.length} precached files, service worker version ${version}`);
