/* Shared NAIPS orchestration: used by server.js (operator connector) and, bundled by tools/build-naips.js into
   data/naips-lib.js, by the app itself when it talks to NAIPS directly from the installed iOS/Android build.
   Pure JavaScript: no Node modules, so it runs unchanged in a browser. */
const met = require("./met"); const rules = require("./rules"); const { fuelPlan } = require("./fuel");
/* Build a briefing: NAIPS products for departure, destination and alternates (+ optional areas), decode, evaluate, fuel. */
async function briefing(naips, p, opts) {
  opts = opts || {}; const log = opts.log || (() => {});
  for (const k of ["dep", "dest", "etd"]) if (!p[k]) throw new Error("missing " + k);
  const locs = [p.dep, p.dest, ...(p.altn || []), ...(p.enroute || [])].map(s => String(s).toUpperCase()).filter((v, i, a) => a.indexOf(v) === i).slice(0, 12);
  const ref = new Date(); let content = "", source = "naips", charts = [];
  if (p.products) { content = p.products; source = "supplied"; }            // for testing or a pasted briefing
  else {
    /* validity: from now until a day after the planned arrival (24 h minimum, 72 h maximum), so NOTAMs starting before the arrival are included */
    const eta = new Date(new Date(p.etd).getTime() + ((+p.eetMin || 60) + (+p.altEetMin || 30)) * 60000); const durationHours = Math.max(24, Math.min(72, Math.ceil((eta.getTime() - Date.now()) / 3600000) + 24));
    const r = await naips.locBrief(locs, { met: true, ntm: true, sigmet: true, charts: !!p.charts, durationHours });
    if (!r.ok) throw new Error("NAIPS: " + (r.info || r.status)); content = r.content || ""; charts = (r.products || []).filter(x => /^(PNG|GIF|JPEG|PDF)$/.test(x.type)).slice(0, 12);
    if (p.areas && p.areas.length) { const a = await naips.areaBrief(p.areas, { met: true, ntm: true, charts: !!p.charts, durationHours }); if (a.ok && a.content) content += "\n\n" + a.content; if (a.ok) charts = charts.concat((a.products || []).filter(x => /^(PNG|GIF|JPEG|PDF)$/.test(x.type))).slice(0, 16); }
  }
  const decoded = met.decodeBriefing(content, ref);
  const plan = { dep: p.dep.toUpperCase(), dest: p.dest.toUpperCase(), altn: (p.altn || []).map(s => String(s).toUpperCase()), enroute: (p.enroute || []).map(s => String(s).toUpperCase()), etd: p.etd, eetMin: +p.eetMin || 60, altEetMin: +p.altEetMin || 30, minima: p.minima || {}, aircraft: p.aircraft || {}, bufferMin: p.bufferMin || 30 };
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
async function winds(naips, b) { if (!b.dep || !b.dest || !b.etd) throw new Error("dep, dest and etd are required"); const tas = "N" + String(Math.round(+b.tas || 120)).padStart(4, "0"); let r, via; if (b.routeCode) { via = "wind-temp-profile"; r = await naips.windTempProfile({ stages: [{ adep: b.dep, ades: b.dest, etd: b.etd, route: String(b.routeCode).toUpperCase() }], tas }); } else { via = "spfib"; r = await naips.spfib({ domestic: true, acid: b.acid, tas, expWind: true, fullText: false, stages: [{ adep: b.dep, etd: b.etd, ades: b.dest, level: b.level || "A050", altn: b.altn || [], route: b.waypoints && b.waypoints.length ? { waypoints: b.waypoints } : undefined }] }); } return { ok: r.ok, status: r.status, info: r.info, via, number: r.number || null, content: r.content || "", winds: parseWinds(r.content || "") }; }
/* File (or preview) an ICAO flight plan. */
async function fileFpl(naips, b) { if (!b.acid || !b.adep || !b.ades || !b.etd || !b.atyp) throw new Error("acid, atyp, adep, ades and etd are required"); if (b.dryRun || !naips.configured()) return { filed: false, dryRun: true, naipsConfigured: naips.configured(), preview: fplPreview(b) }; const r = await naips.submitIcaoFn(b); return { filed: r.ok, status: r.status, info: r.info, fplText: r.fplText, preview: fplPreview(b) }; }
/* NAIPS login check. */
async function status(naips, personal) { if (!naips.configured()) return { configured: false }; const a = await naips.authenticate(); return { configured: true, personal: !!personal, ok: a.ok, status: a.status, name: a.name, info: a.info, motd: a.motd }; }
/* Chart directory: NAIPS keeps GAF and GPWT as "resources" and everything else (MSL analysis, SIGWX, planning charts, the PCA)
   as "charts"; the app sees one list. Each entry's key is what fetches it. */
const BOM_NAMES = { GAF: "Graphical Area Forecast", GPWT: "Grid point wind and temperature" };
async function chartDir(naips, b) { const cat = b && b.category; const out = []; const errs = [];
  if (!cat || !/^(GAF|GPWT)$/.test(cat)) { try { const r = await naips.chartDir({ category: cat, search: b && b.search }); if (!r.ok) errs.push(r.info || r.status); (r.charts || []).forEach(c => out.push(c)); } catch (e) { errs.push(e.message); } }
  for (const t of ["GAF", "GPWT"]) { if (cat && cat !== t) continue; try { const r = await naips.resourceDir(t); if (!r.ok) errs.push(r.info || r.status); (r.resources || []).forEach(x => out.push(Object.assign(x, { name: BOM_NAMES[t] + " " + (x.bom || ""), code: x.bom, format: null, variants: [] }))); } catch (e) { errs.push(e.message); } }
  return { ok: out.length > 0 || !errs.length, status: errs.length ? "PARTIAL" : "SUCCESS", info: errs.join("; ") || null, charts: out }; }
function guessType(b64) { if (/^iVBOR/.test(b64)) return "PNG"; if (/^R0lGOD/.test(b64)) return "GIF"; if (/^JVBER/.test(b64)) return "PDF"; if (/^\/9j\//.test(b64)) return "JPEG"; return "PNG"; }
async function getChart(naips, b) { if (!b || !b.key) throw new Error("key is required"); if (b.kind === "resource") { const r = await naips.getResource(b.key); const data = (r.content || "").replace(/\s+/g, ""); return { ok: r.ok, status: r.status, info: r.info, products: data ? [{ type: guessType(data), variant: null, data }] : [] }; } const r = await naips.getChart(b.key, b.variant); return { ok: r.ok, status: r.status, info: r.info, products: r.products || [] }; }
module.exports = { briefing, winds, fileFpl, status, parseWinds, fplPreview, chartDir, getChart };
