/* Decoding of the plain-text products NAIPS returns: splits a briefing into products and decodes TAF / METAR / SPECI
   / TTF groups well enough for the rules engine. Everything keeps the raw text so findings can quote it. */
const CLOUD = /^(FEW|SCT|BKN|OVC|VV)(\d{3}|\/\/\/)(CB|TCU)?$/;
const WIND = /^(\d{3}|VRB)(\d{2,3})(G(\d{2,3}))?(KT|MPS)$/;
const VIS = /^(\d{4})(NDV)?$/;
const WX = /^(\+|-|VC)?(MI|BC|PR|DR|BL|SH|TS|FZ)?(DZ|RA|SN|SG|IC|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS)+$/;
function decodeGroups(tokens) {
  const g = { wind: null, vis: null, wx: [], cloud: [], cavok: false, raw: tokens.join(" ") };
  for (const t of tokens) {
    let m;
    if (t === "CAVOK") { g.cavok = true; g.vis = 10000; continue; }
    if ((m = WIND.exec(t))) { g.wind = { dir: m[1] === "VRB" ? null : +m[1], spd: m[5] === "MPS" ? Math.round(+m[2] * 1.944) : +m[2], gust: m[4] ? (m[5] === "MPS" ? Math.round(+m[4] * 1.944) : +m[4]) : null }; continue; }
    if ((m = VIS.exec(t))) { g.vis = +m[1] === 9999 ? 10000 : +m[1]; continue; }
    if (/^\d+SM$/.test(t)) { g.vis = Math.round(parseFloat(t) * 1609); continue; }
    if ((m = CLOUD.exec(t))) { g.cloud.push({ amt: m[1], base: m[2] === "///" ? null : +m[2] * 100, cb: m[3] || null }); continue; }
    if (WX.test(t) && t !== "NSW") g.wx.push(t);
  }
  g.ts = g.wx.some(w => /TS/.test(w)) || g.cloud.some(c => c.cb === "CB");
  g.ceiling = (() => { const c = g.cloud.filter(c => (c.amt === "BKN" || c.amt === "OVC" || c.amt === "VV") && c.base !== null); return c.length ? Math.min(...c.map(c => c.base)) : null; })();
  g.sct = (() => { const c = g.cloud.filter(c => c.amt === "SCT" && c.base !== null); return c.length ? Math.min(...c.map(c => c.base)) : null; })();
  return g;
}
/* TAF period DDHH/DDHH relative to an issue month: returns UTC Date pair (month/year from the reference date). */
function period(ddhh, ref) {
  const m = /^(\d{2})(\d{2})\/(\d{2})(\d{2})$/.exec(ddhh); if (!m) return null;
  const mk = (d, h) => { const t = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), +d, h === 24 ? 0 : +h)); if (h === 24) t.setUTCDate(t.getUTCDate() + 1); if (t < ref && ref - t > 20 * 86400000) t.setUTCMonth(t.getUTCMonth() + 1); return t; };
  return { from: mk(m[1], +m[2]), till: mk(m[3], +m[4]) };
}
function parseTaf(text, ref = new Date()) {
  const toks = text.replace(/\s+/g, " ").trim().split(" "); let i = 0;
  if (toks[i] === "TAF") i++; if (toks[i] === "AMD" || toks[i] === "COR") i++;
  const icao = toks[i++]; let issued = null; if (/^\d{6}Z$/.test(toks[i])) { const m = toks[i++]; issued = { day: +m.slice(0, 2), hh: +m.slice(2, 4), mm: +m.slice(4, 6) }; }
  if (toks[i] === "NIL") return { type: "TAF", icao, nil: true, raw: text };
  let validity = null; if (/^\d{4}\/\d{4}$/.test(toks[i])) validity = period(toks[i++], ref);
  if (toks[i] === "CNL") return { type: "TAF", icao, cancelled: true, raw: text, validity };
  const segs = []; let cur = { kind: "BASE", prob: null, tokens: [], period: validity };
  const push = () => { if (cur.tokens.length || cur.kind !== "BASE") segs.push(cur); };
  while (i < toks.length) {
    const t = toks[i];
    if (t === "TEMPO" || t === "INTER" || t === "BECMG") { push(); cur = { kind: t, prob: (cur.kind === "PROB" ? cur.prob : null), tokens: [], period: /^\d{4}\/\d{4}$/.test(toks[i + 1]) ? period(toks[i + 1], ref) : null }; if (cur.period) i++; i++; continue; }
    if (/^PROB(30|40)$/.test(t)) { push(); const p = +t.slice(4); if (toks[i + 1] === "TEMPO" || toks[i + 1] === "INTER") { cur = { kind: toks[i + 1], prob: p, tokens: [], period: /^\d{4}\/\d{4}$/.test(toks[i + 2]) ? period(toks[i + 2], ref) : null }; i += cur.period ? 3 : 2; } else { cur = { kind: "PROB", prob: p, tokens: [], period: /^\d{4}\/\d{4}$/.test(toks[i + 1]) ? period(toks[i + 1], ref) : null }; i += cur.period ? 2 : 1; } continue; }
    if (/^FM\d{6}$/.test(t)) { push(); const d = +t.slice(2, 4), h = +t.slice(4, 6), mi = +t.slice(6, 8); const from = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), d, h, mi)); cur = { kind: "FM", prob: null, tokens: [], period: { from, till: validity ? validity.till : null } }; i++; continue; }
    if (t === "RMK") break;
    cur.tokens.push(t); i++;
  }
  push();
  const rmk = text.includes("RMK") ? text.slice(text.indexOf("RMK")) : "";
  const tInfo = /T\s+(-?\d{2})\s+(-?\d{2})\s+(-?\d{2})\s+(-?\d{2})/.exec(rmk); const qInfo = /Q\s+(\d{4})\s+(\d{4})\s+(\d{4})\s+(\d{4})/.exec(rmk);
  return { type: "TAF", icao, issued, validity, raw: text, segments: segs.map(s => Object.assign({ kind: s.kind, prob: s.prob, period: s.period, text: (s.kind === "BASE" ? "" : s.kind + (s.prob ? " (PROB" + s.prob + ")" : "") + " ") + s.tokens.join(" ") }, decodeGroups(s.tokens))), temps: tInfo ? tInfo.slice(1, 5).map(Number) : null, qnh: qInfo ? qInfo.slice(1, 5).map(Number) : null };
}
function parseMetar(text) {
  const toks = text.replace(/\s+/g, " ").trim().split(" "); let i = 0; const type = toks[i] === "SPECI" ? "SPECI" : toks[i] === "METAR" ? "METAR" : "METAR"; if (toks[i] === "METAR" || toks[i] === "SPECI") i++;
  if (toks[i] === "COR") i++; const icao = toks[i++]; let time = null; if (/^\d{6}Z$/.test(toks[i])) { time = toks[i++]; }
  const auto = toks[i] === "AUTO"; if (auto) i++;
  const rmkAt = toks.indexOf("RMK"); const body = toks.slice(i, rmkAt < 0 ? undefined : rmkAt);
  const g = decodeGroups(body); const temp = /^(M?\d{2})\/(M?\d{2})$/.exec(body.find(t => /^M?\d{2}\/M?\d{2}$/.test(t)) || ""); const qnh = /^Q(\d{4})$/.exec(body.find(t => /^Q\d{4}$/.test(t)) || "");
  return Object.assign({ type, icao, time, auto, raw: text, temp: temp ? +temp[1].replace("M", "-") : null, dew: temp ? +temp[2].replace("M", "-") : null, qnh: qnh ? +qnh[1] : null }, g);
}
/* Split NAIPS briefing text into products. Products start at a line beginning with a known keyword. NOTAMs are the
   lines from an identifier like "C1234/26" (or the location header in loc briefings) to the next blank line. */
function splitProducts(content) {
  const lines = String(content || "").replace(/\r/g, "").split("\n"); const out = []; let cur = null; let loc = null;
  const start = l => /^(TAF( AMD| COR)?|METAR|SPECI|TTF|SIGMET|AIRMET|GAF|GPWT|ATIS)\b/.test(l.trim());
  const notamStart = l => /^[A-Z]\d{3,4}\/\d{2}\b/.test(l.trim()) || /^\s*([A-Z]{4})\s+\(.*\)\s*$/.test(l);
  for (const raw of lines) {
    const l = raw.trimEnd();
    const hdr = /^([A-Z]{4})(?:\s*\(.*\)|\s+[A-Z][A-Z \-\/']{2,40})?\s*$/.exec(l.trim());
    if (hdr && !cur && !start(l)) { loc = hdr[1]; continue; }       // location header above its NOTAMs ("YSCN (CAMDEN)")
    if (start(l)) { if (cur) out.push(cur); cur = { kind: l.trim().split(/\s+/)[0].replace(/^SPECI$/, "SPECI"), text: l.trim() }; continue; }
    if (notamStart(l) && /^[A-Z]\d{3,4}\/\d{2}\b/.test(l.trim())) { if (cur) out.push(cur); cur = { kind: "NOTAM", id: l.trim().split(/\s+/)[0], text: l.trim(), loc }; continue; }
    if (!l.trim()) { if (cur && cur.kind !== "GAF" && cur.kind !== "GPWT") { out.push(cur); cur = null; } else if (cur) cur.text += "\n"; continue; }
    if (cur) cur.text += "\n" + l.trim(); else if (/^[A-Z]{4}\b/.test(l.trim())) { cur = { kind: "TEXT", text: l.trim() }; }
  }
  if (cur) out.push(cur);
  return out.map(p => { const first = p.text.split("\n")[0]; const icao = (/^(?:TAF(?: AMD| COR)?|METAR|SPECI|TTF)\s+(?:COR\s+)?([A-Z]{4})/.exec(first) || /^[A-Z]\d{3,4}\/\d{2}\s+(?:[A-Z\s]*?)\b([A-Z]{4})\b/.exec(first) || [])[1] || null; return Object.assign(p, { icao: icao || p.loc || null }); });
}
/* Decode everything decodable in a briefing content string. */
function decodeBriefing(content, ref = new Date()) {
  const products = splitProducts(content); const out = { taf: [], metar: [], ttf: [], notam: [], sigmet: [], other: [], products };
  for (const p of products) {
    try {
      if (p.kind === "TAF") out.taf.push(parseTaf(p.text.replace(/\n/g, " "), ref));
      else if (p.kind === "METAR" || p.kind === "SPECI") out.metar.push(parseMetar(p.text.replace(/\n/g, " ")));
      else if (p.kind === "TTF") out.ttf.push(Object.assign(parseMetar(p.text.replace(/^TTF\s+/, "").replace(/\n/g, " ")), { type: "TTF" }));
      else if (p.kind === "NOTAM") out.notam.push({ id: p.id, icao: p.icao || notamLocation(p.text), text: p.text, validity: notamValidity(p.text) });
      else if (p.kind === "SIGMET" || p.kind === "AIRMET") out.sigmet.push({ text: p.text });
      else out.other.push(p);
    } catch (e) { out.other.push(Object.assign(p, { error: e.message })); }
  }
  return out;
}
function notamLocation(text) { const m = /\b(Y[A-Z]{3})\b/.exec(text); return m ? m[1] : null; }
function notamValidity(text) { const m = /FROM\s+(\d{2})\s+(\d{6})\s+TO\s+(\d{2})\s+(\d{6})|FROM\s+(\d{2})\s+(\d{6})\s+TO\s+(PERM|EST)/.exec(text); if (!m) return null; return { from: m[1] ? m[1] + " " + m[2] : m[5] + " " + m[6], till: m[3] ? m[3] + " " + m[4] : m[7] }; }
module.exports = { decodeGroups, parseTaf, parseMetar, splitProducts, decodeBriefing };
