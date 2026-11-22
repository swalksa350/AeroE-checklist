process.env.NAIPS_URL = "http://localhost:8787"; process.env.NAIPS_USER = "testuser"; process.env.NAIPS_PASS = "Secret123"; process.env.AEROE_TOKENS = "P42:tok"; process.env.DATA_DIR = require("path").join(__dirname, "tmpdata"); process.env.ANTHROPIC_API_KEY = "";
const test = require("node:test"); const assert = require("node:assert"); const http = require("http"); const fs = require("fs");
const { Naips, parseResponse } = require("../naips"); const { server } = require("../server"); const { CONTENT } = require("./sample");
const seen = [];
const mock = http.createServer((req, res) => { let b = ""; req.on("data", c => b += c); req.on("end", () => { seen.push({ path: req.url, action: req.headers.soapaction, body: b });
  const rsp = (name, inner, status = "SUCCESS") => { res.writeHead(200, { "Content-Type": "text/xml" }); res.end(`<?xml version="1.0"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body><ndd:${name} xmlns:ndd="http://www.airservicesaustralia.com/naips/xsd" status="${status}">${inner}</ndd:${name}></soapenv:Body></soapenv:Envelope>`); };
  if (req.headers.soapaction === "active-spfib-dir") return rsp("active-spfib-dir-rsp", "<ndd:info>hello</ndd:info>");
  if (req.headers.soapaction === "loc-brief") return rsp("loc-brief-rsp", "<ndd:content>" + CONTENT.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</ndd:content>");
  if (req.headers.soapaction === "submit-icao-fn") { if (!/<ndd:acid>VHWSM<\/ndd:acid>/.test(b)) return rsp("submit-icao-fn-rsp", "<ndd:info>bad acid</ndd:info>", "INVALID"); return rsp("submit-icao-fn-rsp", "<ndd:fpl-text>(FPL-VHWSM-IN -GA8/L-SG/S -YSBK2230 -N0120A050 DCT -YSCN0030 YBTH -REG/VHWSM)</ndd:fpl-text>"); }
  res.writeHead(500); res.end("<faultstring>no</faultstring>"); }); });
test.before(() => new Promise(r => mock.listen(8787, r))); test.after(() => { mock.close(); server.close(); fs.rmSync(process.env.DATA_DIR, { recursive: true, force: true }); });
test("authenticate and loc-brief envelopes", async () => {
  const n = new Naips(); const a = await n.authenticate(); assert.equal(a.ok, true); assert.equal(a.info, "hello");
  assert.match(seen[0].body, /<ndd:active-spfib-dir-rqs requestor="TESTUSER" password="Secret123" source="aeroe"\/>/);
  const r = await n.locBrief(["YSBK", "YSCN"]); assert.equal(r.ok, true); assert.ok(r.content.includes("TAF YSCN"));
  assert.match(seen[1].body, /<ndd:loc-brief-rqs [^>]*><ndd:loc>YSBK<\/ndd:loc><ndd:loc>YSCN<\/ndd:loc><ndd:flags met="true" ntm="true" hon="false" sigmet="true"\/><\/ndd:loc-brief-rqs>/); assert.equal(seen[1].path, "/naips/briefing-service");
});
test("submit ICAO flight notification", async () => {
  const n = new Naips(); const r = await n.submitIcaoFn({ acid: "VHWSM", atyp: "GA8", reg: "VHWSM", adep: "YSBK", ades: "YSCN", etd: "2026-11-22T22:30:00Z", eetMinutes: 30, altn: ["YBTH"], tas: "N0120", level: "A050", equip: ["S", "G"], surv: ["S"], other: { pbn: "B2C2", rmk: "AEROE TEST" }, suppl: { endurance: 240, pob: 3, pilotName: "T PILOT", pilotPhone: "0400000000", colour: "WHITE BLUE" }, sartime: "2026-11-22T23:30:00Z", sartimeLocation: "YSCN" });
  assert.equal(r.ok, true); assert.match(r.fplText[0], /^\(FPL-VHWSM/); const b = seen[2].body; assert.equal(seen[2].path, "/naips/flight-notification-service");
  for (const re of [/<ndd:frul>I<\/ndd:frul>/, /<ndd:ftyp>N<\/ndd:ftyp>/, /<ndd:teet>PT0H30M<\/ndd:teet>/, /<ndd:altn>YBTH<\/ndd:altn>/, /<ndd:pbn>B2 C2<\/ndd:pbn>/, /<ndd:radios uhf="false" vhf="true" elt-406-MHz="false"\/>/, /<ndd:end>PT4H0M<\/ndd:end>/, /<ndd:pilot name="T PILOT" phone="0400000000"\/>/, /<ndd:sartime>2026-11-22T23:30:00Z<\/ndd:sartime>/, /<ndd:etd>2026-11-22T22:30:00Z<\/ndd:etd>/]) assert.match(b, re);
  assert.throws(() => parseResponse("<soap:Fault><faultstring>Bad</faultstring></soap:Fault>", "x"), /NAIPS fault: Bad/); const sc = parseResponse('<S:Envelope><S:Body><active-spfib-dir-rsp xmlns="x" status="SUCCESS"/></S:Body></S:Envelope>', "active-spfib-dir"); assert.equal(sc.ok, true); assert.equal(sc.status, "SUCCESS");
});
test("HTTP: /briefing and /fpl through the connector", async () => {
  await new Promise(r => server.listen(8798, r)); const H = { Authorization: "Bearer tok", "Content-Type": "application/json" };
  const post = (p, body) => fetch("http://localhost:8798" + p, { method: "POST", headers: H, body: JSON.stringify(body) }).then(r => r.json());
  const b = await post("/briefing", { dep: "YSBK", dest: "YSCN", altn: ["YBTH"], etd: "2026-11-22T15:00:00Z", eetMin: 30, altEetMin: 40, fuelFlow: 60, fuelOnBoard: 320, policy: { fixedReserveMin: 45, variableReservePct: 10, taxi: 5 }, summary: false });
  assert.equal(b.source, "naips"); assert.equal(b.evaluation.summary.alternateRequired, true); assert.equal(b.evaluation.summary.holdingMinutes, 60); assert.equal(b.fuel.required, Math.ceil(5 + 30 + 40 + 60 + 3 + 45)); assert.equal(b.fuel.sufficient, true); assert.equal(b.decoded.taf.length, 3);
  const dry = await post("/fpl", { acid: "VHWSM", atyp: "GA8", adep: "YSBK", ades: "YSCN", etd: "2026-11-22T22:30:00Z", eetMinutes: 30, dryRun: true, altn: ["YBTH"] }); assert.equal(dry.filed, false); assert.match(dry.preview, /^\(FPL-VHWSM-IN/);
  const f = await post("/fpl", { acid: "VHWSM", atyp: "GA8", reg: "VHWSM", adep: "YSBK", ades: "YSCN", etd: "2026-11-22T22:30:00Z", eetMinutes: 30, altn: ["YBTH"], suppl: { pilotName: "T", pilotPhone: "0", pob: 2 } }); assert.equal(f.filed, true); assert.match(f.fplText[0], /FPL-VHWSM/);
  const bad = await fetch("http://localhost:8798/ping").then(r => r.status); assert.equal(bad, 401);
  const ping = await fetch("http://localhost:8798/ping", { headers: H }).then(r => r.json()); assert.equal(ping.naips, true);
  const ns = await fetch("http://localhost:8798/naips/status", { headers: H }).then(r => r.json()); assert.equal(ns.ok, true);
  const rec = await post("/records", { aeroe: "flight-record", pilotId: "P42", record: { id: "r1", rego: "VH-WSM", flight: { date: "2026-11-22" } } }); assert.equal(rec.stored, true);
  const list = await fetch("http://localhost:8798/records", { headers: H }).then(r => r.json()); assert.equal(list.count, 1);
});
