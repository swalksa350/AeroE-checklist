const test = require("node:test"); const assert = require("node:assert");
const met = require("../met"); const rules = require("../rules"); const { fuelPlan } = require("../fuel"); const { CONTENT } = require("./sample");
const ref = new Date("2026-11-22T05:00:00Z");
test("splits and decodes products", () => {
  const d = met.decodeBriefing(CONTENT, ref);
  assert.equal(d.taf.length, 3); assert.equal(d.metar.length, 3); assert.equal(d.notam.length, 3);
  const t = d.taf.find(t => t.icao === "YSCN"); assert.equal(t.segments[0].kind, "BASE"); assert.equal(t.segments[0].wind.spd, 12); assert.equal(t.segments[0].sct, 4500);
  assert.equal(t.segments.find(s => s.kind === "FM").ceiling, 1200); const tempo = t.segments.find(s => s.kind === "TEMPO"); assert.equal(tempo.vis, 4000); assert.equal(tempo.ceiling, 800);
  const inter = t.segments.find(s => s.kind === "INTER"); assert.equal(inter.prob, 30); assert.ok(inter.ts);
  assert.equal(t.validity.from.toISOString(), "2026-11-22T06:00:00.000Z"); assert.equal(t.validity.till.toISOString(), "2026-11-23T06:00:00.000Z");
  assert.deepEqual(d.notam.map(n => n.icao), ["YSCN", "YSCN", "YBTH"]); assert.equal(d.notam[0].validity.till, "11 230600");
  const m = d.metar.find(m => m.icao === "YBTH"); assert.equal(m.type, "SPECI"); assert.equal(m.wind.gust, 30); assert.equal(m.qnh, 1010);
});
test("rules: destination needs alternate and holding at a bad ETA, not at a good one", () => {
  const d = met.decodeBriefing(CONTENT, ref);
  const bad = rules.evaluateFlight(d, { dep: "YSBK", dest: "YSCN", altn: ["YBTH"], etd: "2026-11-22T18:00:00Z", eetMin: 30, altEetMin: 40 });
  assert.equal(bad.summary.alternateRequired, true); assert.equal(bad.summary.holdingMinutes, 60);
  assert.ok(bad.destination.findings.some(f => f.rule === "Forecast below alternate minima" && /BKN012|1200 ft/.test(f.text + f.quote)));
  assert.ok(bad.destination.findings.some(f => f.rule === "TEMPO" && f.holdMin === 60)); assert.ok(bad.destination.findings.some(f => /INTER PROB30/.test(f.rule) && f.holdMin === 30));
  assert.ok(bad.destination.findings.some(f => f.rule === "NOTAM runway")); assert.ok(bad.destination.findings.some(f => f.rule === "NOTAM lighting" && f.level === "alternate"));
  assert.deepEqual(bad.summary.alternatesSuitable, ["YBTH"]); assert.ok(bad.alternates[0].findings.some(f => f.rule === "NOTAM navaid / approach"));
  const good = rules.evaluateFlight(d, { dep: "YSBK", dest: "YSCN", altn: ["YBTH"], etd: "2026-11-22T09:30:00Z", eetMin: 30 });
  assert.equal(good.summary.holdingMinutes, 0); assert.equal(good.destination.findings.filter(f => f.level === "alternate" && !/NOTAM/.test(f.rule)).length, 0);
  assert.ok(good.destination.findings.some(f => f.rule === "NOTAM lighting"));   // the PAL NOTAM still flags a night arrival consideration
  const xw = rules.evaluateFlight(d, { dep: "YSCN", dest: "YBTH", etd: "2026-11-22T07:00:00Z", eetMin: 45, aircraft: { maxCrosswind: 15, runwayHdg: { YBTH: 170 } } });
  assert.ok(xw.destination.findings.some(f => /crosswind/.test(f.text)), "crosswind finding");
  const none = rules.evaluateFlight(d, { dep: "YSBK", dest: "YWLM", etd: "2026-11-22T07:00:00Z", eetMin: 45 });
  assert.equal(none.summary.alternateRequired, true); assert.equal(none.destination.findings[0].rule, "No TAF");
});
test("fuel plan", () => {
  const f = fuelPlan({ fuelFlow: 60, eetMin: 90, altEetMin: 30, alternateRequired: true, holdingMin: 60, policy: { fixedReserveMin: 45, variableReservePct: 10, taxi: 5 }, fuelOnBoard: 300 });
  assert.equal(f.required, Math.ceil(5 + 90 + 30 + 60 + 9 + 45)); assert.equal(f.sufficient, true); assert.equal(f.enduranceMin, 300);
});
test("wind profile parsing", () => { const { parseWinds } = require("../server"); const w = parseWinds("FL050 240/25 +05\n 7000FT 250/30 -01\nA100 260/35 M05\nno wind here"); assert.deepEqual(w.map(x => [x.alt, x.dir, x.spd, x.temp]), [[5000, 240, 25, 5], [7000, 250, 30, -1], [10000, 260, 35, -5]]); });

test("NAIPS location briefing layout (section titles, NAME (ICAO) headers, wrapped products, short NOTAM numbers)", () => {
  const C = ["2246 UTC 22/11/26          AIRSERVICES AUSTRALIA", "                     LOCATION BRIEFING", "", "PREPARED FOR: TESTUSER", "VALID FROM 2246 UTC NOV 22, 2026 TO 2246 UTC NOV 23, 2026", "", "                     WEATHER INFORMATION", "                     -------------------", "", "GERALDTON (YGEL)", "   TAF YGEL 221705Z 2218/2312", "   09005KT 9999 FEW030", "   FM230300 19015G25KT CAVOK", "   RMK", "   T 14 14 20 23 Q 1020 1020 1021 1020", "", "   METAR YGEL 222230Z AUTO 05005KT 9999 // NCD 16/10 Q1021 RMK", "   RF00.0/000.0", "", "                     NOTAM INFORMATION", "                     -----------------", "", "GERALDTON (YGEL)", "                              C67/26", "   METAR/SPECI AND AD WX INFO SERVICE (AWIS) NOT AVBL", "   FROM 11 230400 TO 11 230900", "", "                         C65/26 REPLACE C62/26", "   NDB 'GEL' 359 U/S", "   FROM 11 182057 TO 01 180800 EST", "", "JANDAKOT (YPJT)", "   C300/26", "   TWY K CLSD", "   FROM 11 232300 TO 11 240930", ""].join("\n");
  const d = met.decodeBriefing(C, new Date("2026-11-22T22:50:00Z"));
  assert.equal(d.taf.length, 1); assert.equal(d.taf[0].icao, "YGEL"); assert.equal(d.taf[0].validity.from.toISOString(), "2026-11-22T18:00:00.000Z"); assert.equal(d.taf[0].segments.length, 2);
  assert.equal(d.metar.length, 1); assert.equal(d.metar[0].icao, "YGEL"); assert.match(d.metar[0].raw, /^METAR YGEL 222230Z/); assert.equal(d.metar[0].qnh, 1021);
  assert.deepEqual(d.notam.map(n => n.icao + " " + n.id), ["YGEL C67/26", "YGEL C65/26", "YPJT C300/26"]);
  assert.equal(d.products.filter(p => p.kind === "TEXT").length, 0);
});

test("approach minima, take-off alternate and en route alternates", () => {
  const C = ["TAF YSCN 220430Z 2206/2306", "24012KT 9999 FEW030 SCT045", "TEMPO 2214/2220 4000 SHRA BKN008", "RMK T 24 20 18 17 Q 1012 1013 1015 1014", "", "TAF YBTH 220430Z 2206/2306", "27015G25KT 3000 BR OVC004", "RMK T 20 18 15 12 Q 1010 1011 1013 1012", "", "TAF YSBK 220430Z 2206/2306", "24010KT CAVOK", "", "METAR YSBK 220430Z 25009KT 0800 FG OVC002 15/14 Q1012 RMK RF00.0/000.0", "", "TAF YCNM 220430Z 2206/2306", "24010KT CAVOK", ""].join("\n");
  const d = met.decodeBriefing(C, new Date("2026-11-22T04:30:00Z"));
  const plan = { dep: "YSBK", dest: "YSCN", altn: ["YBTH"], enroute: ["YCNM"], etd: "2026-11-22T14:00:00Z", eetMin: 60, altEetMin: 30, bufferMin: 30,
    minima: { YSCN: { ceiling: 1500, vis: 8000, elev: 230, approaches: [{ type: "RNP 06", da: 730, vis: 2400 }, { type: "NDB", da: 1030, vis: 3000 }] }, YBTH: { ceiling: 1500, vis: 8000, elev: 2435, approaches: [{ type: "RNP 17", da: 2900, vis: 3000 }] }, YSBK: { toCeiling: 300, toVis: 800 }, YCNM: { ceiling: 1500, vis: 8000 } } };
  const e = rules.evaluateFlight(d, plan);
  const destAp = e.destination.findings.filter(f => f.rule === "Approach minima"); assert.equal(destAp.length, 1); assert.equal(destAp[0].level, "info"); assert.match(destAp[0].text, /above the minima of RNP 06 \(500 ft\/2400 m\), NDB \(800 ft\/3000 m\)/);
  assert.ok(e.destination.findings.some(f => f.rule === "TEMPO" && f.holdMin === 60), "TEMPO below alternate minima still gives 60 min holding");
  const alt = e.alternates[0]; assert.equal(alt.alternateRequired, true); assert.ok(alt.findings.some(f => f.rule === "Approach minima" && /below the minima of every approach/.test(f.text)));
  assert.deepEqual(e.summary.alternatesUnsuitable, ["YBTH"]); assert.deepEqual(e.summary.enrouteSuitable, ["YCNM"]); assert.equal(e.enroute.length, 1);
  const to = e.departure.findings.find(f => f.rule === "Take-off alternate"); assert.ok(to, "take-off alternate finding"); assert.equal(to.level, "alternate"); assert.match(to.text, /cloud at 200 ft below 300 ft/); assert.equal(e.summary.takeoffAlternateRequired, true);
});
test("chart directory parsing", () => { const { parseResponse } = require("../naips"); const r = parseResponse('<S:Envelope><S:Body><chart-dir-rsp xmlns="x" status="SUCCESS"><chart><code>PCA00001</code><name>Planning Chart Australia</name><store-time>2026-11-22T00:00:00Z</store-time><valid><from>2026-11-22T00:00:00Z</from><till>2026-11-23T00:00:00Z</till></valid><source>AsA</source><format>PNG</format><variant>LO</variant><variant>HI</variant><category>OTHER</category></chart></chart-dir-rsp></S:Body></S:Envelope>', "chart-dir"); assert.equal(r.charts.length, 1); assert.equal(r.charts[0].code, "PCA00001"); assert.deepEqual(r.charts[0].variants, ["LO", "HI"]); assert.equal(r.charts[0].till, "2026-11-23T00:00:00Z"); });
test("get-chart content parsing", () => { const { parseResponse } = require("../naips"); const r = parseResponse('<S:Envelope><S:Body><get-chart-rsp xmlns="x" status="SUCCESS"><desc><code>PCA00001</code></desc><content type="PNG" variant="LO"><content>AAAA\nBBBB</content></content></get-chart-rsp></S:Body></S:Envelope>', "get-chart"); assert.equal(r.products.length, 1); assert.equal(r.products[0].type, "PNG"); assert.equal(r.products[0].variant, "LO"); assert.equal(r.products[0].data, "AAAABBBB"); });
