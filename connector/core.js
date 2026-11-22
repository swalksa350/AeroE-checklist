/* Shared NAIPS orchestration: used by server.js (operator connector) and, bundled by tools/build-naips.js into
   data/naips-lib.js, by the app itself when it talks to NAIPS directly from the installed iOS/Android build.
   Pure JavaScript: no Node modules, so it runs unchanged in a browser. */
const met = require("./met"); const rules = require("./rules"); const { fuelPlan } = require("./fuel");
/* Build a briefing: NAIPS products for departure, destination and alternates (+ optional areas), decode, evaluate, fuel. */
async function briefing(naips, p, opts) {
  opts = opts || {}; const log = opts.log || (() => {});
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
  if (p.summary !== false && opts.summarise) { try { out.summary = await opts.summarise(out); } catch (e) { out.summaryError = e.message; log("summary failed", e.message); } }
  return out;
}
/* Best-effort reader for NAIPS wind/temperature profile text: collects (level, direction/speed, temperature) triples
   wherever a level marker (FL120, 5000, A050) is followed by a ddd/ss wind group on the same line. */
function parseWinds(text) { const out = []; for (const line of String(text).split(/\r?\n/)) { const lv = /\b(?:FL\s?(\d{3})|A(\d{3})|(\d{4,5})\s*FT|(\d{4,5}))\b/.exec(line); const ws = [...line.matchAll(/\b(\d{3})\/(\d{2,3})\b/g)]; if (!lv || !ws.length) continue; const alt = lv[1] ? +lv[1] * 100 : lv[2] ? +lv[2] * 100 : +(lv[3] || lv[4]); const t = /(?:^|\s)([+-]\d{1,2}|M\d{2}|PS\d{2})(?=\s|$)/.exec(line.slice(ws[0].index + ws[0][0].length)); out.push({ alt, dir: +ws[0][1], spd: +ws[0][2], temp: t ? +t[1].replace(/\s/g, "").replace("M", "-").replace("PS", "+") : null, line: line.trim() }); } return out; }
/* ICAO FPL as text, for display and for the record. */
function fplPreview(b) { const d = new Date(b.etd); const hhmm = String(d.getUTCHours()).padStart(2, "0") + String(d.getUTCMinutes()).padStart(2, "0"); const eet = String(Math.floor((b.eetMinutes || 60) / 60)).padStart(2, "0") + String((b.eetMinutes || 60) % 60).padStart(2, "0"); const route = (b.route && b.route.segments || []).map(s => s.atsRoute || s.waypoint).filter(Boolean).join(" ") || "DCT"; const other = Object.entries(b.other || {}).filter(([k, v]) => v).map(([k, v]) => k.toUpperCase() + "/" + v).join(" "); return "(FPL-" + b.acid + "-" + (b.rules || "I") + (b.flightType || "N") + "\n-" + b.atyp + "/" + (b.wtc || "L") + "-" + (b.equip || ["S", "G"]).join("") + "/" + (b.surv || ["S"]).join("") + "\n-" + b.adep + hhmm + "\n-" + (b.route && b.route.speed || b.tas || "N0120") + (b.route && b.route.level || b.level || "A050") + " " + route + "\n-" + b.ades + eet + (b.altn || []).map(a => " " + a).join("") + "\n-" + (other ? other + " " : "") + (b.reg ? "REG/" + b.reg : "") + ")"; }
/* Wind and temperature profile for one stage. */
/* NAIPS's wind-temp-profile operation computes along a stored route code on the account and answers "null input" without
   one, so unless a routeCode is given the winds come from an SPFIB with exp-wind (the stage's actual waypoints, lat/long
   allowed), whose content carries the wind/temperature profile. */
async function winds(naips, b) { if (!b.dep || !b.dest || !b.etd) throw new Error("dep, dest and etd are required"); const tas = "N" + String(Math.round(+b.tas || 120)).padStart(4, "0"); let r, via; if (b.routeCode) { via = "wind-temp-profile"; r = await naips.windTempProfile({ stages: [{ adep: b.dep, ades: b.dest, etd: b.etd, route: b.routeCode }], tas }); } else { via = "spfib"; r = await naips.spfib({ domestic: true, acid: b.acid, tas, expWind: true, fullText: false, stages: [{ adep: b.dep, etd: b.etd, ades: b.dest, level: b.level || "A050", altn: b.altn || [], route: b.waypoints && b.waypoints.length ? { waypoints: b.waypoints } : undefined }] }); } return { ok: r.ok, status: r.status, info: r.info, via, number: r.number || null, content: r.content || "", winds: parseWinds(r.content || "") }; }
/* File (or preview) an ICAO flight plan. */
async function fileFpl(naips, b) { if (!b.acid || !b.adep || !b.ades || !b.etd || !b.atyp) throw new Error("acid, atyp, adep, ades and etd are required"); if (b.dryRun || !naips.configured()) return { filed: false, dryRun: true, naipsConfigured: naips.configured(), preview: fplPreview(b) }; const r = await naips.submitIcaoFn(b); return { filed: r.ok, status: r.status, info: r.info, fplText: r.fplText, preview: fplPreview(b) }; }
/* NAIPS login check. */
async function status(naips, personal) { if (!naips.configured()) return { configured: false }; const a = await naips.authenticate(); return { configured: true, personal: !!personal, ok: a.ok, status: a.status, name: a.name, info: a.info, motd: a.motd }; }
module.exports = { briefing, winds, fileFpl, status, parseWinds, fplPreview };
