#!/usr/bin/env node
/* Validates aircraft/*.js data files against the checklist schema.
   Usage: node tools/validate.js [file...]   (defaults to all files in aircraft/) */
const fs = require("fs"), path = require("path");
const dir = path.join(__dirname, "..", "aircraft");
const files = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(dir).filter(f => f.endsWith(".js")).map(f => path.join(dir, f));
let problems = 0;
const bad = (f, msg) => { problems++; console.log(`  ✗ ${path.basename(f)}: ${msg}`); };
const ids = new Set();
for (const f of files) {
  global.window = {};
  try { require(path.resolve(f)); } catch (e) { bad(f, "does not load: " + e.message); continue; }
  const list = window.AIRCRAFT || [];
  if (list.length !== 1) { bad(f, `must push exactly one aircraft (found ${list.length})`); continue; }
  const a = list[0];
  for (const k of ["id","maker","model","short","category","engine","basis"]) if (typeof a[k] !== "string" || !a[k].trim()) bad(f, `missing string field "${k}"`);
  if (a.id && !/^[a-z0-9-]+$/.test(a.id)) bad(f, `id "${a.id}" must be lowercase letters, digits, hyphens`);
  if (a.id && path.basename(f, ".js") !== a.id) bad(f, `file name must equal id "${a.id}"`);
  if (ids.has(a.id)) bad(f, `duplicate id "${a.id}"`); ids.add(a.id);
  if (!["Single-engine piston","High-performance single","Multi-engine piston","Turboprop"].includes(a.category)) bad(f, `category "${a.category}" not one of the four allowed values`);
  if (!Array.isArray(a.vspeeds) || a.vspeeds.length < 4) bad(f, "vspeeds must list at least 4 {k,v} entries");
  else a.vspeeds.forEach((s,i) => { if (typeof s.k !== "string" || typeof s.v !== "string") bad(f, `vspeeds[${i}] needs string k and v`); });
  const pids = new Set();
  const walk = (items, where, depth) => {
    if (!Array.isArray(items)) return bad(f, `${where}: items must be an array`);
    items.forEach((it, i) => {
      const w = `${where}[${i}]`;
      if (!it || typeof it !== "object") return bad(f, `${w}: not an object`);
      if (it.branch !== undefined) {
        if (typeof it.branch !== "string") bad(f, `${w}: branch must be a string question`);
        if (!it.opts || typeof it.opts !== "object" || Object.keys(it.opts).length < 2) bad(f, `${w}: branch needs an opts object with 2+ options`);
        else { if (depth > 2) bad(f, `${w}: branches nested too deep`); for (const o of Object.keys(it.opts)) walk(it.opts[o], `${w}.opts["${o}"]`, depth + 1); }
        return;
      }
      if (it.note !== undefined) { if (typeof it.note !== "string") bad(f, `${w}: note must be a string`); if (it.kind && !["warn","caution"].includes(it.kind)) bad(f, `${w}: kind must be warn or caution`); return; }
      if (it.defer !== undefined) { if (typeof it.defer !== "string") bad(f, `${w}: defer must be a string`); return; }
      if (typeof it.c !== "string" || !it.c.trim()) bad(f, `${w}: needs challenge "c"`);
      if (typeof it.r !== "string" || !it.r.trim()) bad(f, `${w}: needs response "r"`);
      for (const k of Object.keys(it)) if (!["c","r","mem","sub"].includes(k)) bad(f, `${w}: unknown key "${k}"`);
    });
  };
  for (const mode of ["normal","emergency","abnormal"]) {
    if (!Array.isArray(a[mode]) || !a[mode].length) { bad(f, `${mode}: must be a non-empty array of procedures`); continue; }
    a[mode].forEach((p, i) => {
      const w = `${mode}[${i}]`;
      if (typeof p.id !== "string" || !/^[a-z0-9-]+$/.test(p.id)) bad(f, `${w}: id must be lowercase letters, digits, hyphens`);
      if (pids.has(p.id)) bad(f, `${w}: duplicate procedure id "${p.id}" (ids must be unique across all modes)`); pids.add(p.id);
      if (typeof p.name !== "string" || !p.name.trim()) bad(f, `${w}: needs name`);
      if (p.cond !== undefined && typeof p.cond !== "string") bad(f, `${w}: cond must be a string`);
      if (p.land !== undefined && !["", "LAND IMMEDIATELY", "LAND AS SOON AS POSSIBLE", "LAND AS SOON AS PRACTICAL"].includes(p.land)) bad(f, `${w}: land must be one of the three LAND phrases or empty`);
      for (const k of Object.keys(p)) if (!["id","name","cond","land","items"].includes(k)) bad(f, `${w}: unknown key "${k}"`);
      walk(p.items, w + ".items", 0);
      if (mode === "emergency" && !JSON.stringify(p.items).includes('"mem":true')) console.log(`  · ${path.basename(f)}: ${w} "${p.name}" has no memory items (fine if none exist)`);
    });
  }
  const n = m => a[m].reduce((s, p) => s + JSON.stringify(p.items).split('"c":').length - 1, 0);
  if (n("normal") < 40) bad(f, `normal checklists look thin (${n("normal")} lines; expect 60+)`);
  if (n("emergency") < 20) bad(f, `emergency procedures look thin (${n("emergency")} lines)`);
  console.log(`${problems ? "" : "  ✓ "}${path.basename(f)}: ${a.short || "?"} normal ${a.normal?.length}/${n("normal")}  emergency ${a.emergency?.length}/${n("emergency")}  abnormal ${a.abnormal?.length}/${n("abnormal")}`);
}
console.log(problems ? `\n${problems} problem(s)` : "\nAll files valid.");
process.exit(problems ? 1 : 0);
