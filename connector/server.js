#!/usr/bin/env node
/* AeroE operator connector. Implements docs/INTEGRATION.md: ping, roster, fleet pack, flight record upload, notices,
   plus /briefing (NAIPS weather and NOTAM with rules and fuel plan) and /fpl (file an ICAO flight plan through NAIPS).
   No dependencies beyond Node 18+. Configuration by environment variables – see README.md. */
const http = require("http"), fs = require("fs"), path = require("path"), crypto = require("crypto");
const { Naips } = require("./naips"); const { summarise } = require("./summary");
const PORT = +process.env.PORT || 8790; const DATA = process.env.DATA_DIR || path.join(__dirname, "data"); const ORIGIN = process.env.ALLOWED_ORIGIN || "*";
const TOKENS = (process.env.AEROE_TOKENS || "").split(",").map(s => s.trim()).filter(Boolean).map(s => { const i = s.indexOf(":"); return i < 0 ? { pilot: "*", token: s } : { pilot: s.slice(0, i), token: s.slice(i + 1) }; });
const naips = new Naips();
fs.mkdirSync(path.join(DATA, "records"), { recursive: true });
const readJSON = (f, d) => { try { return JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8")); } catch (e) { return d; } };
const writeJSON = (f, o) => fs.writeFileSync(path.join(DATA, f), JSON.stringify(o, null, 1));
const log = (...a) => console.log(new Date().toISOString(), ...a);
function auth(req) { const h = req.headers.authorization || ""; const t = h.replace(/^Bearer\s+/i, "").trim(); if (!t) return null; const hit = TOKENS.find(x => x.token === t); return hit ? hit : null; }
function send(res, code, obj) { res.writeHead(code, { "Content-Type": "application/json", "Access-Control-Allow-Origin": ORIGIN, "Access-Control-Allow-Headers": "Authorization, Content-Type", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Cache-Control": "no-store" }); res.end(JSON.stringify(obj)); }
function body(req) { return new Promise((resolve, reject) => { let b = ""; req.on("data", c => { b += c; if (b.length > 4e6) req.destroy(); }); req.on("end", () => { try { resolve(b ? JSON.parse(b) : {}); } catch (e) { reject(new Error("bad JSON")); } }); req.on("error", reject); }); }
const core = require("./core");
const naipsFor = p => (p && p.naips && p.naips.user && p.naips.pass) ? naips.withCredentials(p.naips) : naips;   // a pilot's own NAIPS account, sent with the request, overrides the operator's
const briefing = p => core.briefing(naipsFor(p), p, { summarise, log });
const { parseWinds, fplPreview } = core;
const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") { res.writeHead(204, { "Access-Control-Allow-Origin": ORIGIN, "Access-Control-Allow-Headers": "Authorization, Content-Type", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" }); return res.end(); }
  const u = new URL(req.url, "http://x"); const who = auth(req);
  if (!who) return send(res, 401, { error: "missing or invalid token" });
  try {
    if (u.pathname === "/ping") { const roster = readJSON("roster.json", null); const fleet = readJSON("fleet.json", null); return send(res, 200, { operator: process.env.OPERATOR_NAME || "AeroE connector", naips: naips.configured(), personalNaips: true, summary: !!process.env.ANTHROPIC_API_KEY, version: require("./package.json").version, caps: { roster: !!(roster && (Array.isArray(roster) ? roster.length : (roster.flights || []).length)), fleet: !!(fleet && fleet.aircraft && Object.keys(fleet.aircraft).length), notices: true, records: true, briefing: true, fpl: true, winds: true } }); }
    if (u.pathname === "/roster") { const pilot = u.searchParams.get("pilot") || who.pilot; const date = u.searchParams.get("date") || new Date().toISOString().slice(0, 10); const all = readJSON("roster.json", []); const flights = (Array.isArray(all) ? all : all.flights || []).filter(f => (!f.date || f.date === date) && (!f.pilotId || f.pilotId === pilot || pilot === "*")); return send(res, 200, { date, flights }); }
    if (u.pathname === "/fleet") return send(res, 200, readJSON("fleet.json", { aircraft: {} }));
    if (u.pathname === "/routes") { const dep = (u.searchParams.get("dep") || "").toUpperCase(), dest = (u.searchParams.get("dest") || "").toUpperCase(); const all = readJSON("routes.json", []); return send(res, 200, { routes: (Array.isArray(all) ? all : all.routes || []).filter(r => (r.dep || "").toUpperCase() === dep && (r.dest || "").toUpperCase() === dest).map(r => ({ route: r.route, note: r.note || "" })) }); }
    if (u.pathname === "/notices") { const n = readJSON("notices.json", { notices: [] }); return send(res, 200, n); }
    if (/^\/notices\/[^/]+\/ack$/.test(u.pathname) && req.method === "POST") { const b = await body(req); const acks = readJSON("acks.json", []); acks.push({ notice: decodeURIComponent(u.pathname.split("/")[2]), pilotId: b.pilotId || who.pilot, at: b.at || new Date().toISOString() }); writeJSON("acks.json", acks); return send(res, 200, { ok: true }); }
    if (u.pathname === "/records" && req.method === "POST") { const b = await body(req); const r = b.record; if (!r || !r.id) return send(res, 400, { error: "no record" }); const f = path.join(DATA, "records", r.id.replace(/[^a-z0-9_-]/gi, "") + ".json"); fs.writeFileSync(f, JSON.stringify({ receivedAt: new Date().toISOString(), pilotId: b.pilotId || who.pilot, record: r }, null, 1)); log("record", r.id, r.rego, r.signoff ? "signed" : "unsigned"); return send(res, 200, { id: r.id, stored: true, fingerprintChecked: !!r.signoff && fingerprint(r) === r.signoff.fingerprint }); }
    if (u.pathname === "/records" && req.method === "GET") { const files = fs.readdirSync(path.join(DATA, "records")).filter(f => f.endsWith(".json")); return send(res, 200, { count: files.length, records: files.map(f => { const j = JSON.parse(fs.readFileSync(path.join(DATA, "records", f), "utf8")); return { id: j.record.id, rego: j.record.rego, date: j.record.flight && j.record.flight.date, pilotId: j.pilotId, signed: !!j.record.signoff, receivedAt: j.receivedAt }; }) }); }
    if (u.pathname === "/naips/status") { const b = req.method === "POST" ? await body(req) : {}; const n = naipsFor(b); return send(res, 200, await core.status(n, n !== naips)); }
    if (u.pathname === "/winds" && req.method === "POST") { const b = await body(req); return send(res, 200, await core.winds(naipsFor(b), b)); }
    if (u.pathname === "/briefing" && req.method === "POST") { const b = await body(req); const out = await briefing(b); log("briefing", out.plan.dep, out.plan.dest, out.evaluation.summary); return send(res, 200, out); }
    if (u.pathname === "/fpl" && req.method === "POST") { const b = await body(req); const r = await core.fileFpl(naipsFor(b), b); if (!r.dryRun) log("fpl", b.acid, b.adep, b.ades, r.status); return send(res, 200, r); }
    return send(res, 404, { error: "unknown endpoint" });
  } catch (e) { log("error", u.pathname, e.message); return send(res, 500, { error: e.message }); }
});
function fingerprint(rec) { const o = {}; Object.keys(rec).filter(k => k !== "signoff" && k !== "preview" && k !== "uploadedAt" && k !== "uploadRef").sort().forEach(k => o[k] = rec[k]); return crypto.createHash("sha256").update(JSON.stringify(o)).digest("hex"); }
if (require.main === module) { if (!TOKENS.length) { console.error("Set AEROE_TOKENS (pilotId:token,...) before starting."); process.exit(1); } server.listen(PORT, () => log("AeroE connector on port " + PORT + (naips.configured() ? " with NAIPS account " + naips.user : " (NAIPS not configured)"))); }
module.exports = { server, briefing, fplPreview, fingerprint, parseWinds };
