/* NAIPS SOAP client (Airservices Australia). Document/literal SOAP 1.1; soapAction = operation name; one request
   element per call, carrying the NAIPS account in the requestor/password attributes. Schema from
   https://www.airservicesaustralia.com/naips/flight-notification-service?xsd=1 (shared by all NAIPS services). */
const NS = "http://www.airservicesaustralia.com/naips/xsd";
const SERVICES = { briefing: "/naips/briefing-service", fn: "/naips/flight-notification-service" };
const esc = s => String(s === undefined || s === null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const unesc = s => String(s || "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n)).replace(/&amp;/g, "&");
const isoZ = d => new Date(d).toISOString().replace(/\.\d{3}Z$/, "Z");

class Naips {
  constructor(opts = {}) {
    this.base = (opts.base || process.env.NAIPS_URL || "https://www.airservicesaustralia.com").replace(/\/+$/, "");
    this.user = opts.user || process.env.NAIPS_USER || ""; this.pass = opts.pass || process.env.NAIPS_PASS || "";
    this.source = opts.source || process.env.NAIPS_SOURCE || "aeroe"; this.timeout = opts.timeout || 30000;
  }
  configured() { return !!(this.user && this.pass); }
  attrs() { return `requestor="${esc(this.user.toUpperCase())}" password="${esc(this.pass)}" source="${esc(this.source)}"`; }
  envelope(body) { return `<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ndd="${NS}"><soapenv:Header/><soapenv:Body>${body}</soapenv:Body></soapenv:Envelope>`; }
  async call(service, operation, body) {
    if (!this.configured()) throw new Error("NAIPS account not configured (NAIPS_USER / NAIPS_PASS)");
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), this.timeout);
    try {
      const r = await fetch(this.base + SERVICES[service], { method: "POST", headers: { "Content-Type": 'text/xml;charset="utf-8"', "Accept": "text/xml", "SOAPAction": operation }, body: this.envelope(body), signal: ctl.signal });
      const text = await r.text();
      if (!r.ok && !/Envelope/.test(text)) throw new Error("NAIPS HTTP " + r.status);
      return parseResponse(text, operation);
    } finally { clearTimeout(tm); }
  }
  /* --- briefing service --- */
  authenticate() { return this.call("briefing", "authenticate", `<ndd:authenticate-rqs ${this.attrs()}/>`).catch(e => { throw e; }); }
  locBrief(locs, flags = {}) {
    const f = Object.assign({ met: true, ntm: true, sigmet: true, hon: false, charts: false }, flags);
    const body = `<ndd:loc-brief-rqs ${this.attrs()}>${locs.map(l => `<ndd:loc>${esc(l)}</ndd:loc>`).join("")}<ndd:flags met="${!!f.met}" ntm="${!!f.ntm}" hon="${!!f.hon}" sigmet="${!!f.sigmet}"${f.charts ? ' charts="true"' : ""}/></ndd:loc-brief-rqs>`;
    return this.call("briefing", "loc-brief", body);
  }
  areaBrief(areas, flags = {}) {
    const f = Object.assign({ met: true, ntm: true, hon: false }, flags);
    return this.call("briefing", "area-brief", `<ndd:area-brief-rqs ${this.attrs()}>${areas.map(a => `<ndd:area>${esc(a)}</ndd:area>`).join("")}<ndd:flags met="${!!f.met}" ntm="${!!f.ntm}" hon="${!!f.hon}"${f.charts ? ' charts="true"' : ""}/></ndd:area-brief-rqs>`);
  }
  /* SPFIB: route briefing for one or more stages. spec: {acid, domestic, tas:"N0160", stages:[{adep, etd (Date/ISO), ades, level:"A085", altn:[...], additional:[...], areas:[...]}], fullText} */
  spfib(spec) {
    const point = p => `<ndd:loc>${esc(p)}</ndd:loc>`;
    const stages = spec.stages.map(s => `<ndd:stage><ndd:adep>${point(s.adep)}</ndd:adep><ndd:etd>${esc(isoZ(s.etd))}</ndd:etd><ndd:ades>${point(s.ades)}</ndd:ades>${s.weightCategory ? `<ndd:weight-category>${esc(s.weightCategory)}</ndd:weight-category>` : ""}<ndd:level>${esc(s.level || "A050")}</ndd:level>${(s.additional || []).map(l => `<ndd:additional-loc>${esc(l)}</ndd:additional-loc>`).join("")}${(s.areas || []).map(a => `<ndd:area>${esc(a)}</ndd:area>`).join("")}${(s.altn || []).map(a => `<ndd:alternate><ndd:ades>${point(a)}</ndd:ades><ndd:level>${esc(s.level || "A050")}</ndd:level></ndd:alternate>`).join("")}</ndd:stage>`).join("");
    const body = `<ndd:spfib-rqs ${this.attrs()}><ndd:spfib><ndd:domestic>${spec.domestic !== false}</ndd:domestic>${spec.acid ? `<ndd:acid>${esc(spec.acid)}</ndd:acid>` : ""}${stages}<ndd:tas>${esc(spec.tas || "N0120")}</ndd:tas><ndd:exp-wind>${!!spec.expWind}</ndd:exp-wind><ndd:full-text-notam>${spec.fullText !== false}</ndd:full-text-notam></ndd:spfib></ndd:spfib-rqs>`;
    return this.call("briefing", "spfib", body);
  }
  /* --- flight notification service: ICAO flight plan --- */
  submitIcaoFn(fn) {
    const s = fn; const dur = m => `PT${Math.floor(m / 60)}H${m % 60}M`;
    const other = s.other || {}; const otherXml = ["sts", "pbn", "nav", "com", "dat", "sur", "dep", "dest", "eet", "sel", "typ", "code", "dle", "opr", "orgn", "per", "altn", "ralt", "talt", "rif", "rmk"].filter(k => other[k] !== undefined && other[k] !== "").map(k => `<ndd:${k}>${esc(other[k])}</ndd:${k}>`).join("");
    const sup = s.suppl || {}; const bool = v => v ? "true" : "false";
    const supplXml = `<ndd:suppl-info uhf="${bool(sup.uhf)}" vhf="${bool(sup.vhf !== false)}" elt-406-MHz="${bool(sup.elt)}" polar="${bool(sup.polar)}" desert="${bool(sup.desert)}" maritime="${bool(sup.maritime)}" jungle="${bool(sup.jungle)}" light="${bool(sup.light)}" fluor="${bool(sup.fluor)}">${sup.endurance ? `<ndd:end>${dur(sup.endurance)}</ndd:end>` : ""}${sup.pob ? `<ndd:pob>${esc(sup.pob)}</ndd:pob>` : ""}${sup.radios ? `<ndd:radios>${esc(sup.radios)}</ndd:radios>` : ""}${sup.survival ? `<ndd:survival>${esc(sup.survival)}</ndd:survival>` : ""}${sup.jackets ? `<ndd:jackets>${esc(sup.jackets)}</ndd:jackets>` : ""}${sup.dinghies ? `<ndd:dinghies><ndd:number>${esc(sup.dinghies.number || 0)}</ndd:number><ndd:capacity>${esc(sup.dinghies.capacity || 0)}</ndd:capacity><ndd:covered>${bool(sup.dinghies.covered)}</ndd:covered><ndd:colour>${esc(sup.dinghies.colour || "")}</ndd:colour></ndd:dinghies>` : ""}${sup.colour ? `<ndd:acft-col-mark>${esc(sup.colour)}</ndd:acft-col-mark>` : ""}${sup.rmk ? `<ndd:rmk>${esc(sup.rmk)}</ndd:rmk>` : ""}<ndd:pilot name="${esc(sup.pilotName || "")}" phone="${esc(sup.pilotPhone || "")}"/></ndd:suppl-info>`;
    const segs = (s.route && s.route.segments || []).map(g => `<ndd:segment>${g.atsRoute ? `<ndd:ats-route>${esc(g.atsRoute)}</ndd:ats-route>` : ""}${g.waypoint ? `<ndd:waypoint><ndd:loc>${esc(g.waypoint)}</ndd:loc></ndd:waypoint>` : ""}</ndd:segment>`).join("");
    const sar = s.sartime ? `<ndd:sartimeinfo><ndd:sartime>${esc(isoZ(s.sartime))}</ndd:sartime><ndd:sartimetban>${esc(s.sartimeTban || "")}</ndd:sartimetban>${s.sartimeEndpoint ? `<ndd:endpoint>${esc(s.sartimeEndpoint)}</ndd:endpoint>` : ""}<ndd:location>${esc(s.sartimeLocation || s.ades)}</ndd:location></ndd:sartimeinfo>` : "";
    const stage = `<ndd:stage number="1"><ndd:acid>${esc(s.acid)}</ndd:acid><ndd:frul>${esc(s.rules || "I")}</ndd:frul><ndd:ftyp>${esc(s.flightType || "N")}</ndd:ftyp><ndd:atyp>${esc(s.atyp)}</ndd:atyp><ndd:wtc>${esc(s.wtc || "L")}</ndd:wtc><ndd:nav-com-equip>${esc((s.equip || ["S", "G"]).join(" "))}</ndd:nav-com-equip><ndd:surv-equip>${esc((s.surv || ["S"]).join(" "))}</ndd:surv-equip><ndd:adep>${esc(s.adep)}</ndd:adep><ndd:etd>${esc(isoZ(s.etd))}</ndd:etd><ndd:ades>${esc(s.ades)}</ndd:ades><ndd:teet>${dur(s.eetMinutes || 60)}</ndd:teet>${(s.altn || []).slice(0, 2).map(a => `<ndd:altn>${esc(a)}</ndd:altn>`).join("")}<ndd:route><ndd:speed>${esc(s.route && s.route.speed || s.tas || "N0120")}</ndd:speed><ndd:level>${esc(s.route && s.route.level || s.level || "A050")}</ndd:level>${segs}</ndd:route>${s.reg ? `<ndd:reg>${esc(s.reg)}</ndd:reg>` : ""}<ndd:other-info>${otherXml}</ndd:other-info>${sar}${supplXml}</ndd:stage>`;
    const body = `<ndd:submit-icao-fn-rqs ${this.attrs()}${s.ignoreAtypReg ? ' ignore-atyp-reg="true"' : ""}><ndd:flight-notif><ndd:domestic>${s.domestic !== false}</ndd:domestic>${stage}</ndd:flight-notif></ndd:submit-icao-fn-rqs>`;
    return this.call("fn", "submit-icao-fn", body);
  }
}
/* Minimal response reader: status attribute, info, text content, fpl-text lines, NOTAM summaries, SOAP faults. */
function parseResponse(xml, operation) {
  const fault = /<(?:\w+:)?Fault>[\s\S]*?<faultstring>([\s\S]*?)<\/faultstring>/.exec(xml);
  if (fault) throw new Error("NAIPS fault: " + unesc(fault[1]).trim());
  const rsp = /<(?:\w+:)?([a-z-]+-rsp)\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?\1>/.exec(xml);
  if (!rsp) throw new Error("NAIPS: no response element for " + operation);
  const attrs = rsp[2]; const inner = rsp[3];
  const status = (/status="([^"]*)"/.exec(attrs) || [])[1] || "UNKNOWN";
  const grab = name => { const m = new RegExp("<(?:\\w+:)?" + name + "\\b[^>]*>([\\s\\S]*?)<\\/(?:\\w+:)?" + name + ">").exec(inner); return m ? unesc(m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")) : null; };
  const all = name => { const re = new RegExp("<(?:\\w+:)?" + name + "\\b[^>]*>([\\s\\S]*?)<\\/(?:\\w+:)?" + name + ">", "g"); const out = []; let m; while ((m = re.exec(inner))) out.push(unesc(m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1"))); return out; };
  const products = []; const pre = /<(?:\w+:)?product\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?product>/g; let pm; while ((pm = pre.exec(inner))) { const type = (/type="([^"]*)"/.exec(pm[1]) || [])[1]; const variant = (/variant="([^"]*)"/.exec(pm[1]) || [])[1]; const c = /<(?:\w+:)?content>([\s\S]*?)<\/(?:\w+:)?content>/.exec(pm[2]); if (type && c) products.push({ type, variant: variant || null, data: c[1].replace(/\s+/g, "") }); }
  const res = { operation, status, ok: status === "SUCCESS", info: grab("info"), content: grab("content"), fplText: all("fpl-text"), name: grab("name"), motd: grab("motd"), number: grab("number"), products };
  if (!res.ok && !res.info) res.info = "NAIPS returned " + status;
  return res;
}
module.exports = { Naips, parseResponse, NS, esc };
