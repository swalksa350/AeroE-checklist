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
