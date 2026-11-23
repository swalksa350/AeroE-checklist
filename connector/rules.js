/* Alternate, holding and NOTAM relevance rules for an Australian aeroplane flight (AIP ENR 1.1 and the operator's
   exposition). Every finding quotes the product it is based on. These are planning aids, not a legal determination:
   the operator sets the minima per aerodrome and must confirm the rule set matches its exposition and the current AIP. */
const DEFAULT_MINIMA = { ceiling: 1500, vis: 8000 };   // alternate minima for an aerodrome without an instrument approach (AIP ENR 1.1)
const HOLD = { TEMPO: 60, INTER: 30, PROB: 60 };        // minutes of holding fuel per AIP for TEMPO / INTER / bare PROB below minima
function within(seg, from, till) { if (!seg.period || !seg.period.from) return true; const a = seg.period.from, b = seg.period.till || till; return a <= till && b >= from; }
function belowMinima(g, minima, ac) {
  const why = [];
  if (g.vis !== null && g.vis !== undefined && g.vis < minima.vis) why.push("visibility " + g.vis + " m below " + minima.vis + " m");
  if (g.ceiling !== null && g.ceiling < minima.ceiling) why.push("cloud " + (g.cloud.find(c => c.base === g.ceiling) || {}).amt + " at " + g.ceiling + " ft below " + minima.ceiling + " ft");
  if (minima.sctCounts && g.sct !== null && g.sct < minima.ceiling) why.push("SCT cloud at " + g.sct + " ft below " + minima.ceiling + " ft (operator counts SCT)");
  if (g.ts) why.push("thunderstorms");
  if (g.wind && ac) { const x = crosswind(g.wind, ac.runwayHdg); if (ac.maxCrosswind && x !== null && x.cross > ac.maxCrosswind) why.push("crosswind " + x.cross + " kt above the aircraft limit of " + ac.maxCrosswind + " kt"); if (ac.maxTailwind !== undefined && x !== null && x.tail > ac.maxTailwind) why.push("tailwind " + x.tail + " kt above " + ac.maxTailwind + " kt"); }
  return why;
}
/* Approach minima: minima.approaches = [{type, da (DA or MDA, ft AMSL), vis (m)}] with minima.elev (aerodrome elevation ft).
   Returns the approaches the forecast/report supports and the reasons the others fail; null when none are entered. */
function approachCheck(g, minima) {
  const list = (minima.approaches || []).filter(a => a && (a.da !== null && a.da !== undefined));
  if (!list.length) return null; const elev = minima.elev || 0;
  const res = list.map(a => { const hat = Math.max(0, Math.round(a.da - elev)); const why = []; if (g.ceiling !== null && g.ceiling !== undefined && g.ceiling < hat) why.push("cloud at " + g.ceiling + " ft below the " + (a.type || "approach") + " minima height of " + hat + " ft (" + a.da + " ft AMSL)"); if (a.vis && g.vis !== null && g.vis !== undefined && g.vis < a.vis) why.push("visibility " + g.vis + " m below the " + (a.type || "approach") + " minimum of " + a.vis + " m"); return { type: a.type || "approach", da: a.da, hat, vis: a.vis || null, ok: !why.length, why }; });
  return { ok: res.filter(r => r.ok), fail: res.filter(r => !r.ok), lowest: res.slice().sort((x, y) => x.hat - y.hat)[0] };
}
function crosswind(wind, rwyHdg) { if (!wind || wind.dir === null || rwyHdg === null || rwyHdg === undefined) return null; const spd = wind.gust || wind.spd; const d = (wind.dir - rwyHdg) * Math.PI / 180; return { cross: Math.round(Math.abs(spd * Math.sin(d))), tail: Math.round(-spd * Math.cos(d)) }; }
/* Evaluate one aerodrome for an arrival at eta (Date). Returns findings and the holding/alternate requirement. */
function evaluateAerodrome(icao, decoded, eta, opts = {}) {
  const minima = Object.assign({}, DEFAULT_MINIMA, opts.minima || {}); const ac = opts.aircraft || {}; const F = [];
  const buffer = (opts.bufferMin || 30) * 60000; const from = new Date(eta.getTime() - buffer), till = new Date(eta.getTime() + buffer);
  const taf = decoded.taf.find(t => t.icao === icao);
  const add = (level, rule, text, quote, holdMin) => F.push({ level, aerodrome: icao, rule, text, quote: (quote || "").trim(), holdMin: holdMin || 0 });
  if (!taf || taf.nil || taf.cancelled) { add("alternate", "No TAF", "No TAF is available for " + icao + " – an alternate is required unless the operator's rules allow planning on another forecast.", taf ? taf.raw : ""); return finish(); }
  if (taf.validity && (taf.validity.from > from || taf.validity.till < till)) { const z = d => d.toISOString().slice(8, 10) + "/" + d.toISOString().slice(11, 16) + "Z"; add("alternate", "TAF validity", "A TAF exists for " + icao + " but it is valid " + z(taf.validity.from) + " to " + z(taf.validity.till) + ", and the planned ETA " + z(eta) + " (± " + (opts.bufferMin || 30) + " min) is " + (taf.validity.from > from ? "before it starts" : "after it ends") + ". Check the ETD date and time first; if they are right, a later TAF issue is needed before planning on it.", taf.raw); }
  const base = taf.segments.find(s => s.kind === "BASE"); let current = base;
  const fms = taf.segments.filter(s => (s.kind === "FM" || s.kind === "BECMG") && s.period && s.period.from <= till); if (fms.length) current = fms[fms.length - 1];
  const merged = current && current !== base ? Object.assign({}, base, Object.fromEntries(Object.entries(current).filter(([k, v]) => v !== null && !(Array.isArray(v) && !v.length) && k !== "kind" && k !== "text"))) : base;
  if (merged) { const why = belowMinima(merged, minima, ac); if (why.length) add("alternate", "Forecast below alternate minima", icao + ": " + why.join("; ") + " in the operative forecast at ETA – an alternate is required.", current.text || base.raw || taf.raw);
    const ap = approachCheck(merged, minima); if (ap) { if (!ap.ok.length) add(opts.role === "destination" ? "alternate" : "warning", "Approach minima", icao + ": the operative forecast at ETA is below the minima of every approach entered (" + ap.fail.map(r => r.type + " " + r.hat + " ft" + (r.vis ? "/" + r.vis + " m" : "")).join(", ") + "): " + ap.fail[0].why.join("; ") + ". A landing is not assured" + (opts.role === "destination" ? " – an alternate is required" : "") + ".", current.text || base.raw || taf.raw); else if (ap.fail.length) add("info", "Approach minima", icao + ": forecast supports " + ap.ok.map(r => r.type + " (" + r.hat + " ft)").join(", ") + "; below minima for " + ap.fail.map(r => r.type).join(", ") + ".", current.text || base.raw || taf.raw); else add("info", "Approach minima", icao + ": forecast at ETA is above the minima of " + ap.ok.map(r => r.type + " (" + r.hat + " ft" + (r.vis ? "/" + r.vis + " m" : "") + ")").join(", ") + ".", ""); } }
  for (const s of taf.segments) {
    if (!["TEMPO", "INTER", "PROB"].includes(s.kind) || !within(s, from, till)) continue;
    const why = belowMinima(s, minima, ac); const ap = approachCheck(s, minima); if (!why.length) { if (ap && !ap.ok.length) add("warning", "Approach minima in " + s.kind, icao + ": " + s.kind + (s.prob ? " (PROB" + s.prob + ")" : "") + " conditions are below every approach minima entered (" + ap.fail[0].why.join("; ") + ") although above the alternate minima – expect holding or a diversion if it occurs.", s.text); continue; }
    const hold = s.kind === "PROB" ? HOLD.PROB : HOLD[s.kind];
    add("holding", s.kind + (s.prob ? " PROB" + s.prob : ""), icao + ": " + s.kind + (s.prob ? " (PROB" + s.prob + ")" : "") + " " + why.join("; ") + " within ETA ± " + (opts.bufferMin || 30) + " min – carry " + hold + " min holding fuel, or plan an alternate.", s.text, hold);
  }
  const metar = decoded.metar.filter(m => m.icao === icao).slice(-1)[0];
  if (metar) { const why = belowMinima(metar, minima, ac); if (why.length) add("warning", "Current conditions", icao + " latest " + metar.type + ": " + why.join("; ") + ".", metar.raw); }
  for (const n of decoded.notam.filter(n => n.icao === icao)) { const r = classifyNotam(n.text); if (r) add(r.level, "NOTAM " + r.topic, icao + " " + n.id + ": " + r.text, n.text.split("\n").slice(0, 6).join("\n")); }
  return finish();
  function finish() {
    const alternate = F.some(f => f.level === "alternate"); const holdMin = Math.max(0, ...F.map(f => f.holdMin || 0));
    return { icao, eta: eta.toISOString(), findings: F, alternateRequired: alternate, holdingMinutes: holdMin, minima };
  }
}
const NOTAM_RULES = [
  [/\b(AD|AERODROME)\b.*\b(CLSD|CLOSED|NOT AVBL)/s, "alternate", "aerodrome closed", "The aerodrome is notified closed or not available – check the times against your ETA."],
  [/\bRWY\s*[0-9/LRC ]*\b.*\b(CLSD|CLOSED|NOT AVBL|U\/S)/s, "warning", "runway", "A runway is closed or unserviceable – check which runway and when."],
  [/\b(RWY|TWY)\b.*\b(SHORTENED|REDUCED|DISPLACED)/s, "warning", "runway length", "Runway length or threshold is reduced – re-check take-off and landing distance."],
  [/\b(PAL|PILOT ACTIVATED LIGHTING|RWY LGT|RUNWAY LIGHTING|AD LGT)\b.*\b(U\/S|UNSERVICEABLE|NOT AVBL|CLSD)/s, "alternate", "lighting", "Aerodrome lighting is unserviceable – for a night arrival this requires an alternate or a standby lighting arrangement."],
  [/\b(ILS|LOC|VOR|NDB|DME|RNAV|RNP|GNSS|GPS|RAIM)\b.*\b(U\/S|UNSERVICEABLE|NOT AVBL|WITHDRAWN|NOT TO BE USED)/s, "warning", "navaid / approach", "An approach aid or procedure is unavailable – check the approach you plan to fly and the alternate minima that depend on it."],
  [/\bFUEL\b.*\b(NOT AVBL|U\/S|UNAVAILABLE)/s, "warning", "fuel", "Fuel is not available – plan fuel accordingly."],
  [/\b(OBST|OBSTACLE|CRANE)\b/s, "info", "obstacle", "An obstacle is notified near the aerodrome."],
  [/\b(ATIS|AWIS|AWS)\b.*\b(U\/S|NOT AVBL)/s, "info", "weather reporting", "The automatic weather service is unserviceable – the TAF and METAR may be the only weather."],
  [/\b(CTAF|FREQ|FREQUENCY)\b.*\b(CHANGED|CHG|NEW)/s, "info", "frequency", "A frequency has changed."],
  [/\b(DAP|CHART|PROCEDURE)\b.*\b(AMEND|CHG|CHANGED|CORRECT)/s, "info", "procedure", "A chart or procedure is amended."],
];
function classifyNotam(text) { const t = text.toUpperCase(); for (const [re, level, topic, msg] of NOTAM_RULES) if (re.test(t)) return { level, topic, text: msg }; return null; }
/* Whole-flight evaluation. plan: {dep, dest, altn:[...], etd (Date), eetMin, altEetMin, minima:{ICAO:{ceiling,vis}}, aircraft:{maxCrosswind,maxTailwind,runwayHdg:{ICAO:hdg}}} */
function evaluateFlight(decoded, plan) {
  const etd = new Date(plan.etd); const eta = new Date(etd.getTime() + (plan.eetMin || 60) * 60000);
  const per = (icao, role) => ({ role, minima: (plan.minima || {})[icao], aircraft: Object.assign({}, plan.aircraft || {}, { runwayHdg: plan.aircraft && plan.aircraft.runwayHdg ? plan.aircraft.runwayHdg[icao] : undefined }), bufferMin: plan.bufferMin });
  const dest = evaluateAerodrome(plan.dest, decoded, eta, per(plan.dest, "destination"));
  const altns = (plan.altn || []).map(a => evaluateAerodrome(a, decoded, new Date(eta.getTime() + (plan.altEetMin || 30) * 60000), per(a, "alternate")));
  /* en route alternates: assessed for an arrival around the middle of the flight (a diversion can come at any point) */
  const enroute = (plan.enroute || []).map(a => evaluateAerodrome(a, decoded, new Date(etd.getTime() + ((plan.eetMin || 60) / 2) * 60000), Object.assign(per(a, "enroute"), { bufferMin: Math.max(plan.bufferMin || 30, Math.round((plan.eetMin || 60) / 2)) })));
  const depF = []; const depTaf = decoded.taf.find(t => t.icao === plan.dep); const depMetar = decoded.metar.filter(m => m.icao === plan.dep).slice(-1)[0];
  if (depMetar) { const g = depMetar; if (g.ts) depF.push({ level: "warning", aerodrome: plan.dep, rule: "Departure weather", text: plan.dep + ": thunderstorms reported.", quote: g.raw }); if (g.vis !== null && g.vis < 5000) depF.push({ level: "warning", aerodrome: plan.dep, rule: "Departure weather", text: plan.dep + ": visibility " + g.vis + " m.", quote: g.raw }); }
  /* take-off alternate: departure weather against the take-off alternate minima (minima[dep].toCeiling/toVis), or failing those, the lowest approach minima for a return */
  { const dm = (plan.minima || {})[plan.dep] || {}; const g = depMetar || (depTaf && depTaf.segments && depTaf.segments.find(x => x.kind === "BASE")); if (g) { const to = (dm.toCeiling || dm.toVis) ? { ceiling: dm.toCeiling || 0, vis: dm.toVis || 0 } : null; if (to) { const why = []; if (g.ceiling !== null && g.ceiling !== undefined && g.ceiling < to.ceiling) why.push("cloud at " + g.ceiling + " ft below " + to.ceiling + " ft"); if (g.vis !== null && g.vis !== undefined && g.vis < to.vis) why.push("visibility " + g.vis + " m below " + to.vis + " m"); if (why.length) depF.push({ level: "alternate", aerodrome: plan.dep, rule: "Take-off alternate", text: plan.dep + ": " + (depMetar ? "current conditions" : "forecast") + " below the take-off alternate minima (" + why.join("; ") + ") – a take-off alternate is required, within the distance or time your exposition allows.", quote: g.raw || g.text || "" }); else depF.push({ level: "info", aerodrome: plan.dep, rule: "Take-off alternate", text: plan.dep + ": " + (depMetar ? "current conditions" : "forecast") + " above the take-off alternate minima (" + to.ceiling + " ft / " + to.vis + " m).", quote: "" }); }
      else { const ap = approachCheck(g, dm); if (ap && !ap.ok.length) depF.push({ level: "warning", aerodrome: plan.dep, rule: "Take-off alternate", text: plan.dep + ": " + (depMetar ? "current conditions" : "forecast") + " are below every approach minima entered for a return (" + ap.fail[0].why.join("; ") + ") – consider a take-off alternate; enter the take-off alternate minima to have this assessed.", quote: g.raw || g.text || "" }); } } }
  for (const n of decoded.notam.filter(n => n.icao === plan.dep)) { const r = classifyNotam(n.text); if (r) depF.push({ level: r.level === "alternate" ? "warning" : r.level, aerodrome: plan.dep, rule: "NOTAM " + r.topic, text: plan.dep + " " + n.id + ": " + r.text, quote: n.text.split("\n").slice(0, 6).join("\n") }); }
  const sig = decoded.sigmet.map(s => ({ level: "warning", aerodrome: "route", rule: "SIGMET/AIRMET", text: "A SIGMET or AIRMET is current – check whether it affects the route and levels.", quote: s.text.split("\n").slice(0, 8).join("\n") }));
  const altnOk = altns.filter(a => !a.alternateRequired && !a.findings.some(f => f.level === "alternate"));
  const enrOk = enroute.filter(a => !a.alternateRequired && !a.findings.some(f => f.level === "alternate"));
  const summary = { alternateRequired: dest.alternateRequired, holdingMinutes: dest.holdingMinutes, alternatesSuitable: altnOk.map(a => a.icao), alternatesUnsuitable: altns.filter(a => !altnOk.includes(a)).map(a => a.icao), enrouteSuitable: enrOk.map(a => a.icao), enrouteUnsuitable: enroute.filter(a => !enrOk.includes(a)).map(a => a.icao), takeoffAlternateRequired: depF.some(f => f.rule === "Take-off alternate" && f.level === "alternate"), eta: eta.toISOString(), depTafPresent: !!depTaf };
  if (dest.alternateRequired && !altnOk.length) summary.problem = "The destination requires an alternate and no suitable alternate was briefed.";
  return { summary, departure: { icao: plan.dep, findings: depF }, destination: dest, alternates: altns, enroute, route: sig };
}
module.exports = { evaluateAerodrome, evaluateFlight, classifyNotam, crosswind, approachCheck, DEFAULT_MINIMA, HOLD };
