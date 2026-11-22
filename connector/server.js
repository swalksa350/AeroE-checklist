#!/usr/bin/env node
/* AeroE operator connector. Implements docs/INTEGRATION.md: ping, roster, fleet pack, flight record upload, notices,
   plus /briefing (NAIPS weather and NOTAM with rules and fuel plan) and /fpl (file an ICAO flight plan through NAIPS).
   No dependencies beyond Node 18+. Configuration by environment variables – see README.md. */
const http = require("http"), fs = require("fs"), path = require("path"), crypto = require("crypto");
const { Naips } = require("./naips"); const met = require("./met"); const rules = require("./rules"); const { fuelPlan } = require("./fuel"); const { summarise } = require("./summary");
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
/* Build a briefing: NAIPS products for departure, destination and alternates (+ optional areas), decode, evaluate, fuel. */
async function briefing(p) {
  for (const k of ["dep", "dest", "etd"]) if (!p[k]) throw new Error("missing " + k);
  const locs = [p.dep, p.dest, ...(p.altn || [])].map(s => String(s).toUpperCase()).filter((v, i, a) => a.indexOf(v) === i);
  const ref = new Date(); let content = "", source = "naips", charts = [];
  if (p.products) { content = p.products; source = "supplied"; }            // for testing or a pasted briefing
  else {
    const r = await naips.locBrief(locs, { met: true, ntm: true, sigmet: true, charts: !!p.charts });
    if (!r.ok) throw new Error("NAIPS: " + (r.info || r.status)); content = r.content || ""; charts = (r.products || []).filter(x => /^(PNG|GIF|JPEG|PDF)$/.test(x.type)).slice(0, 12);
    if (p.areas && p.areas.length) { const a = await naips.areaBrief(p.areas, { met: true, ntm: true, charts: !!p.charts }); if (a.ok && a.content) content += "\n\n" + a.content; if (a.ok) charts = charts.concat((a.products || []).filter(x => /^(PNG|GIF|JPEG|PDF)$/.test(x.type))).slice(0, 16); }
  }
  const decoded = met.decodeBriefing(content, ref);
  const plan = { dep: p.dep.toUpperCase(), dest: p.dest.toUpperCase(), altn: (p.altn || []).map(s => String(s).toUpperCase()), etd: p.etd, eetMin: +p.eetMin || 60, altEetMin: +p.altEetMin || 30, minima: p.minima || {}, aircraft: p.aircraft || {}, bufferMin: p.bufferMin || 30 };
  const evaluation = rules.evaluateFlight(decoded, plan);
  const fuel = p.fuelFlow ? fuelPlan({ fuelFlow: p.fuelFlow, eetMin: plan.eetMin, altEetMin: plan.altEetMin, alternateRequired: evaluation.summary.alternateRequired || (p.altn && p.altn.length && p.alwaysCarryAlternate), holdingMin: evaluation.summary.holdingMinutes, policy: p.policy, fuelOnBoard: p.fuelOnBoard }) : null;
  const out = { fetched: ref.toISOString(), source, plan, decoded: { taf: decoded.taf, metar: decoded.metar, ttf: decoded.ttf, notam: decoded.notam, sigmet: decoded.sigmet, products: decoded.products }, evaluation, fuel, rawContent: content, charts };
  if (p.summary !== false) { try { out.summary = await summarise(out); } catch (e) { out.summaryError = e.message; log("summary failed", e.message); } }
  return out;
}
const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") { res.writeHead(204, { "Access-Control-Allow-Origin": ORIGIN, "Access-Control-Allow-Headers": "Authorization, Content-Type", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" }); return res.end(); }
  const u = new URL(req.url, "http://x"); const who = auth(req);
  if (!who) return send(res, 401, { error: "missing or invalid token" });
  try {
    if (u.pathname === "/ping") return send(res, 200, { operator: process.env.OPERATOR_NAME || "AeroE connector", naips: naips.configured(), summary: !!process.env.ANTHROPIC_API_KEY, version: require("./package.json").version });
    if (u.pathname === "/roster") { const pilot = u.searchParams.get("pilot") || who.pilot; const date = u.searchParams.get("date") || new Date().toISOString().slice(0, 10); const all = readJSON("roster.json", []); const flights = (Array.isArray(all) ? all : all.flights || []).filter(f => (!f.date || f.date === date) && (!f.pilotId || f.pilotId === pilot || pilot === "*")); return send(res, 200, { date, flights }); }
    if (u.pathname === "/fleet") return send(res, 200, readJSON("fleet.json", { aircraft: {} }));
    if (u.pathname === "/notices") { const n = readJSON("notices.json", { notices: [] }); return send(res, 200, n); }
    if (/^\/notices\/[^/]+\/ack$/.test(u.pathname) && req.method === "POST") { const b = await body(req); const acks = readJSON("acks.json", []); acks.push({ notice: decodeURIComponent(u.pathname.split("/")[2]), pilotId: b.pilotId || who.pilot, at: b.at || new Date().toISOString() }); writeJSON("acks.json", acks); return send(res, 200, { ok: true }); }
    if (u.pathname === "/records" && req.method === "POST") { const b = await body(req); const r = b.record; if (!r || !r.id) return send(res, 400, { error: "no record" }); const f = path.join(DATA, "records", r.id.replace(/[^a-z0-9_-]/gi, "") + ".json"); fs.writeFileSync(f, JSON.stringify({ receivedAt: new Date().toISOString(), pilotId: b.pilotId || who.pilot, record: r }, null, 1)); log("record", r.id, r.rego, r.signoff ? "signed" : "unsigned"); return send(res, 200, { id: r.id, stored: true, fingerprintChecked: !!r.signoff && fingerprint(r) === r.signoff.fingerprint }); }
    if (u.pathname === "/records" && req.method === "GET") { const files = fs.readdirSync(path.join(DATA, "records")).filter(f => f.endsWith(".json")); return send(res, 200, { count: files.length, records: files.map(f => { const j = JSON.parse(fs.readFileSync(path.join(DATA, "records", f), "utf8")); return { id: j.record.id, rego: j.record.rego, date: j.record.flight && j.record.flight.date, pilotId: j.pilotId, signed: !!j.record.signoff, receivedAt: j.receivedAt }; }) }); }
    if (u.pathname === "/naips/status") { if (!naips.configured()) return send(res, 200, { configured: false }); const a = await naips.authenticate(); return send(res, 200, { configured: true, ok: a.ok, status: a.status, name: a.name, info: a.info, motd: a.motd }); }
    if (u.pathname === "/briefing" && req.method === "POST") { const b = await body(req); const out = await briefing(b); log("briefing", out.plan.dep, out.plan.dest, out.evaluation.summary); return send(res, 200, out); }
    if (u.pathname === "/fpl" && req.method === "POST") { const b = await body(req); if (!b.acid || !b.adep || !b.ades || !b.etd || !b.atyp) return send(res, 400, { error: "acid, atyp, adep, ades and etd are required" }); if (b.dryRun || !naips.configured()) { const { Naips: N } = require("./naips"); const n = new N({ user: naips.user || "TEST", pass: naips.pass || "TESTPASS1" }); return send(res, 200, { filed: false, dryRun: true, naipsConfigured: naips.configured(), request: n.submitIcaoFn.toString().length ? "ok" : "", preview: fplPreview(b) }); } const r = await naips.submitIcaoFn(b); log("fpl", b.acid, b.adep, b.ades, r.status); return send(res, 200, { filed: r.ok, status: r.status, info: r.info, fplText: r.fplText, preview: fplPreview(b) }); }
    return send(res, 404, { error: "unknown endpoint" });
  } catch (e) { log("error", u.pathname, e.message); return send(res, 500, { error: e.message }); }
});
/* ICAO FPL as text, for display and for the record. */
function fplPreview(b) { const d = new Date(b.etd); const hhmm = String(d.getUTCHours()).padStart(2, "0") + String(d.getUTCMinutes()).padStart(2, "0"); const eet = String(Math.floor((b.eetMinutes || 60) / 60)).padStart(2, "0") + String((b.eetMinutes || 60) % 60).padStart(2, "0"); const route = (b.route && b.route.segments || []).map(s => s.atsRoute || s.waypoint).filter(Boolean).join(" ") || "DCT"; const other = Object.entries(b.other || {}).filter(([k, v]) => v).map(([k, v]) => k.toUpperCase() + "/" + v).join(" "); return "(FPL-" + b.acid + "-" + (b.rules || "I") + (b.flightType || "N") + "\n-" + b.atyp + "/" + (b.wtc || "L") + "-" + (b.equip || ["S", "G"]).join("") + "/" + (b.surv || ["S"]).join("") + "\n-" + b.adep + hhmm + "\n-" + (b.route && b.route.speed || b.tas || "N0120") + (b.route && b.route.level || b.level || "A050") + " " + route + "\n-" + b.ades + eet + (b.altn || []).map(a => " " + a).join("") + "\n-" + (other ? other + " " : "") + (b.reg ? "REG/" + b.reg : "") + ")"; }
function fingerprint(rec) { const o = {}; Object.keys(rec).filter(k => k !== "signoff" && k !== "preview" && k !== "uploadedAt" && k !== "uploadRef").sort().forEach(k => o[k] = rec[k]); return crypto.createHash("sha256").update(JSON.stringify(o)).digest("hex"); }
if (require.main === module) { if (!TOKENS.length) { console.error("Set AEROE_TOKENS (pilotId:token,...) before starting."); process.exit(1); } server.listen(PORT, () => log("AeroE connector on port " + PORT + (naips.configured() ? " with NAIPS account " + naips.user : " (NAIPS not configured)"))); }
module.exports = { server, briefing, fplPreview, fingerprint };
