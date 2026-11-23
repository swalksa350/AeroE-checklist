/* NAIPS SOAP client (Airservices Australia). Document/literal SOAP 1.1; soapAction = operation name; one request
   element per call, carrying the NAIPS account in the requestor/password attributes. Schema from
   https://www.airservicesaustralia.com/naips/flight-notification-service?xsd=1 (shared by all NAIPS services). */
const NS = "http://www.airservicesaustralia.com/naips/xsd";
const ENV = (typeof process !== "undefined" && process.env) || {};   // the same file runs in the connector and, bundled, in the app
const SERVICES = { briefing: "/naips/briefing-service", fn: "/naips/flight-notification-service", met: "/naips/met-service" };
const esc = s => String(s === undefined || s === null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const unesc = s => String(s || "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (m, n) => String.fromCharCode(+n)).replace(/&amp;/g, "&");
const isoZ = d => new Date(d).toISOString().replace(/\.\d{3}Z$/, "Z");

class Naips {
  constructor(opts = {}) {
    this.base = (opts.base || ENV.NAIPS_URL || "https://www.airservicesaustralia.com").replace(/\/+$/, "");
    this.user = opts.user || ENV.NAIPS_USER || ""; this.pass = opts.pass || ENV.NAIPS_PASS || "";
    this.source = opts.source || ENV.NAIPS_SOURCE || "aeroe"; this.timeout = opts.timeout || 30000;
  }
  configured() { return !!(this.user && this.pass); }
  attrs() { return `requestor="${esc(this.user.toUpperCase())}" password="${esc(this.pass)}" source="${esc(this.source)}"`; }
  envelope(body) { return `<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ndd="${NS}"><soapenv:Header/><soapenv:Body>${body}</soapenv:Body></soapenv:Envelope>`; }
  async call(service, operation, body) {
    if (!this.configured()) throw new Error("NAIPS account not configured (NAIPS_USER / NAIPS_PASS)");
    Naips.lastRequest = { operation, at: new Date().toISOString(), body: body.replace(/password="[^"]*"/, 'password="***"') };   // for the app's debug view
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), this.timeout);
    try {
      const r = await fetch(this.base + SERVICES[service], { method: "POST", headers: { "Content-Type": 'text/xml;charset="utf-8"', "Accept": "text/xml", "SOAPAction": operation }, body: this.envelope(body), signal: ctl.signal });
      const text = await r.text(); Naips.lastReply = { operation, status: r.status, text: text.slice(0, 20000), at: new Date().toISOString() };   // kept for the app's "Show last NAIPS reply" debug view
      if (!/Envelope/.test(text)) { const t = /<title>([^<]*)<\/title>/i.exec(text); throw new Error("NAIPS answered HTTP " + r.status + " without a SOAP reply" + (t ? " (" + t[1].trim().slice(0, 60) + ")" : "")); }
      return parseResponse(text, operation);
    } finally { clearTimeout(tm); }
  }
  withCredentials(c){ if(!c||!c.user||!c.pass) return this; const n=new Naips({base:this.base,user:c.user,pass:c.pass,source:this.source,timeout:this.timeout}); return n; }
  windTempProfile(spec){ const stages=spec.stages.map(s=>`<ndd:stage><ndd:adep>${esc(s.adep)}</ndd:adep><ndd:ades>${esc(s.ades)}</ndd:ades><ndd:etd>${esc(isoZ(s.etd))}</ndd:etd>${s.route?`<ndd:route>${esc(s.route)}</ndd:route>`:""}</ndd:stage>`).join(""); return this.call("briefing","wind-temp-profile",`<ndd:wind-temp-profile-rqs ${this.attrs()}>${stages}<ndd:tas>${esc(spec.tas||"N0120")}</ndd:tas></ndd:wind-temp-profile-rqs>`); }
  /* --- briefing service --- */
  /* Login check. NAIPS publishes no authenticate operation (the type exists in the schema but no service dispatches it), so the
     cheapest credential-only request is used: the directory of active SPFIBs. Wrong login -> status ACCESS_VIOLATION. */
  authenticate() { return this.call("briefing", "active-spfib-dir", `<ndd:active-spfib-dir-rqs ${this.attrs()}/>`); }
  locBrief(locs, flags = {}) {
    const f = Object.assign({ met: true, ntm: true, sigmet: true, hon: false, charts: false }, flags);
    const dur = f.durationHours ? `<ndd:duration>PT${Math.max(1, Math.min(72, Math.round(f.durationHours)))}H</ndd:duration>` : "";   // briefing validity; NAIPS leaves out NOTAMs that start after it
    const body = `<ndd:loc-brief-rqs ${this.attrs()}>${dur}${locs.map(l => `<ndd:loc>${esc(l)}</ndd:loc>`).join("")}<ndd:flags met="${!!f.met}" ntm="${!!f.ntm}" hon="${!!f.hon}" sigmet="${!!f.sigmet}"${f.charts ? ' charts="true"' : ""}/></ndd:loc-brief-rqs>`;
    return this.call("briefing", "loc-brief", body);
  }
  areaBrief(areas, flags = {}) {
    const f = Object.assign({ met: true, ntm: true, hon: false }, flags);
    const dur = f.durationHours ? `<ndd:duration>PT${Math.max(1, Math.min(72, Math.round(f.durationHours)))}H</ndd:duration>` : "";
    return this.call("briefing", "area-brief", `<ndd:area-brief-rqs ${this.attrs()}>${dur}${areas.map(a => `<ndd:area>${esc(a)}</ndd:area>`).join("")}<ndd:flags met="${!!f.met}" ntm="${!!f.ntm}" hon="${!!f.hon}"${f.charts ? ' charts="true"' : ""}/></ndd:area-brief-rqs>`);
  }
  /* SPFIB: route briefing for one or more stages. spec: {acid, domestic, tas:"N0160", stages:[{adep, etd (Date/ISO), ades, level:"A085", altn:[...], additional:[...], areas:[...]}], fullText} */
  spfib(spec) {
    const point = p => `<ndd:loc>${esc(p)}</ndd:loc>`;
    const spfibPoint = w => { if (w && typeof w === "object" && isFinite(+w.lat) && isFinite(+w.lon)) return `<ndd:coord><ndd:lat>${(+w.lat).toFixed(4)}</ndd:lat><ndd:long>${(+w.lon).toFixed(4)}</ndd:long></ndd:coord>`; if (w && typeof w === "object") w = w.name; const m = /^(\d{2})(\d{2})?([NS])(\d{3})(\d{2})?([EW])$/.exec(String(w || "").toUpperCase()); if (!m) return point(String(w).toUpperCase()); const lat = (+m[1] + (m[2] ? +m[2] / 60 : 0)) * (m[3] === "S" ? -1 : 1), lon = (+m[4] + (m[5] ? +m[5] / 60 : 0)) * (m[6] === "W" ? -1 : 1); return `<ndd:coord><ndd:lat>${lat.toFixed(4)}</ndd:lat><ndd:long>${lon.toFixed(4)}</ndd:long></ndd:coord>`; };
    const stages = spec.stages.map(s => { const altn = (s.altn || []).filter(Boolean); const extra = (s.additional || []).concat(altn.slice(1)).slice(0, 9); return `<ndd:stage><ndd:adep>${point(s.adep)}</ndd:adep><ndd:etd>${esc(isoZ(s.etd))}</ndd:etd><ndd:ades>${point(s.ades)}</ndd:ades>${s.weightCategory ? `<ndd:weight-category>${esc(s.weightCategory)}</ndd:weight-category>` : ""}<ndd:level>${esc(s.level || "A050")}</ndd:level>${s.route && s.route.routeId ? `<ndd:route><ndd:route-id>${esc(s.route.routeId)}</ndd:route-id></ndd:route>` : s.route && s.route.waypoints && s.route.waypoints.length ? `<ndd:route>${s.route.waypoints.slice(0, 30).map(w => `<ndd:waypoints>${spfibPoint(w)}</ndd:waypoints>`).join("")}</ndd:route>` : ""}${extra.map(l => `<ndd:additional-loc>${esc(l)}</ndd:additional-loc>`).join("")}${(s.areas || []).slice(0, 5).map(a => `<ndd:area>${esc(a)}</ndd:area>`).join("")}${altn.length ? `<ndd:alternate><ndd:ades>${point(altn[0])}</ndd:ades><ndd:level>${esc(s.level || "A050")}</ndd:level></ndd:alternate>` : ""}</ndd:stage>`; }).join("");
    const body = `<ndd:spfib-rqs ${this.attrs()}><ndd:spfib><ndd:domestic>${spec.domestic !== false}</ndd:domestic>${spec.acid ? `<ndd:acid>${esc(spec.acid)}</ndd:acid>` : ""}${stages}<ndd:tas>${esc(spec.tas || "N0120")}</ndd:tas><ndd:exp-wind>${!!spec.expWind}</ndd:exp-wind><ndd:full-text-notam>${spec.fullText !== false}</ndd:full-text-notam></ndd:spfib></ndd:spfib-rqs>`;
    return this.call("briefing", "spfib", body);
  }
  /* --- met service: charts (GAF, GPWT, SIGWX, planning charts) --- */
  chartDir(opts = {}) { return this.call("met", "chart-dir", `<ndd:chart-dir-rqs ${this.attrs()}>${opts.search ? `<ndd:search>${esc(String(opts.search).slice(0, 64))}</ndd:search>` : ""}${opts.category ? `<ndd:category>${esc(opts.category)}</ndd:category>` : ""}</ndd:chart-dir-rqs>`).then(r => { r.charts = r.charts || []; return r; }); }
  resourceDir(type) { return this.call("met", "resource-dir", `<ndd:resource-dir-rqs ${this.attrs()}>${type ? `<ndd:type>${esc(type)}</ndd:type>` : ""}</ndd:resource-dir-rqs>`); }
  getResource(key) { return this.call("met", "get-resource", `<ndd:get-resource-rqs ${this.attrs()}><ndd:key>${esc(key)}</ndd:key></ndd:get-resource-rqs>`); }
  getChart(key, variant) { return this.call("met", "get-chart", `<ndd:get-chart-rqs ${this.attrs()}><ndd:key>${esc(key)}</ndd:key>${variant ? `<ndd:variant>${esc(variant)}</ndd:variant>` : ""}</ndd:get-chart-rqs>`); }
  /* --- flight notification service: ICAO flight plan --- */
  submitIcaoFn(fn) {
    const s = fn; const dur = m => `PT${Math.floor(m / 60)}H${m % 60}M`;
    const txt = (v, extra, max) => String(v === undefined || v === null ? "" : v).toUpperCase().replace(new RegExp("[^A-Z0-9 " + (extra || "") + "]", "g"), " ").replace(/\s+/g, " ").trim().slice(0, max || 17);
    const codes = v => (Array.isArray(v) ? v.join(" ") : String(v || "")).toUpperCase().match(/[A-Z]\d?/g) || [];
    const other = s.other || {}; const otherXml = ["sts", "pbn", "nav", "com", "dat", "sur", "dep", "dest", "eet", "sel", "typ", "code", "dle", "opr", "orgn", "per", "altn", "ralt", "talt", "rif", "rmk"].filter(k => other[k] !== undefined && other[k] !== "" && other[k] !== null).map(k => { let v = other[k]; if (k === "pbn") v = codes(v).slice(0, 8).join(" "); else if (k === "sts") v = txt(v, "", 100); else if (k === "rmk") v = txt(v, "*+", 335); else if (k === "eet") v = txt(v, "*", 500); else if (k === "dle") v = txt(v, "*", 286); else if (k === "rif") v = txt(v, "*", 142); else if (k === "per" || k === "sel" || k === "code") v = String(v).toUpperCase().trim(); else v = txt(v, "*", k === "orgn" ? 25 : k === "opr" ? 20 : k === "ralt" ? 24 : k === "altn" || k === "typ" ? 11 : 17); return v ? `<ndd:${k}>${esc(v)}</ndd:${k}>` : ""; }).join("");
    const sup = s.suppl || {}; const bool = v => v ? "true" : "false";
    /* ICAOSupplInfo: end?, pob?, radios{uhf,vhf,elt-406-MHz}, survival{polar,desert,maritime,jungle}, jackets{light,fluor,uhf,vhf}, dinghies?, acft-col-mark?, rmk?, pilot{name,phone} */
    const pob = String(sup.pob === undefined || sup.pob === null || sup.pob === "" ? "" : sup.pob).toUpperCase().replace(/[^TBAN0-9]/g, "").slice(0, 3);
    const supplXml = `<ndd:suppl-info>${sup.endurance ? `<ndd:end>${dur(Math.round(sup.endurance))}</ndd:end>` : ""}${pob ? `<ndd:pob>${pob}</ndd:pob>` : ""}<ndd:radios uhf="${bool(sup.uhf)}" vhf="${bool(sup.vhf !== false)}" elt-406-MHz="${bool(sup.elt)}"/><ndd:survival polar="${bool(sup.polar)}" desert="${bool(sup.desert)}" maritime="${bool(sup.maritime)}" jungle="${bool(sup.jungle)}"/><ndd:jackets light="${bool(sup.light)}" fluor="${bool(sup.fluor)}" uhf="${bool(sup.jacketUhf)}" vhf="${bool(sup.jacketVhf)}"/>${sup.dinghies && +sup.dinghies.number ? `<ndd:dinghies><ndd:number>${+sup.dinghies.number}</ndd:number><ndd:capacity>${+sup.dinghies.capacity || 0}</ndd:capacity><ndd:covered>${bool(sup.dinghies.covered)}</ndd:covered><ndd:colour>${esc(txt(sup.dinghies.colour || "UNKNOWN", "/", 10) || "UNKNOWN")}</ndd:colour></ndd:dinghies>` : ""}${txt(sup.colour, "/", 46) ? `<ndd:acft-col-mark>${esc(txt(sup.colour, "/", 46))}</ndd:acft-col-mark>` : ""}${txt(sup.rmk, "/", 134) ? `<ndd:rmk>${esc(txt(sup.rmk, "/", 134))}</ndd:rmk>` : ""}<ndd:pilot name="${esc(String(sup.pilotName || "PIC").trim().slice(0, 20) || "PIC")}" phone="${esc(String(sup.pilotPhone || "TBA").trim().slice(0, 19) || "TBA")}"/></ndd:suppl-info>`;
    const coord = tok => { const m = /^(\d{2})(\d{2})?([NS])(\d{3})(\d{2})?([EW])$/.exec(String(tok || "").toUpperCase()); if (!m) return null; const lat = (+m[1] + (m[2] ? +m[2] / 60 : 0)) * (m[3] === "S" ? -1 : 1), lon = (+m[4] + (m[5] ? +m[5] / 60 : 0)) * (m[6] === "W" ? -1 : 1); return `<ndd:coord><ndd:lat>${lat.toFixed(4)}</ndd:lat><ndd:long>${lon.toFixed(4)}</ndd:long></ndd:coord>`; };
    const segs = (s.route && s.route.segments || []).slice(0, 50).map(g => `<ndd:segment>${g.atsRoute ? `<ndd:ats-route>${esc(String(g.atsRoute).toUpperCase())}</ndd:ats-route>` : ""}${g.waypoint ? `<ndd:waypoint>${coord(g.waypoint) || `<ndd:loc>${esc(String(g.waypoint).toUpperCase())}</ndd:loc>`}</ndd:waypoint>` : ""}</ndd:segment>`).join("");
    /* SartimeInfo: (sartime | sartimetban), ats-unit?, endpoint?, location */
    const sar = (s.sartime || s.sartimeTban) ? `<ndd:sartimeinfo>${s.sartime ? `<ndd:sartime>${esc(isoZ(s.sartime))}</ndd:sartime>` : `<ndd:sartimetban>${/^TBN$/i.test(s.sartimeTban) ? "TBN" : "TBA"}</ndd:sartimetban>`}${s.sartimeEndpoint ? `<ndd:endpoint>${esc(s.sartimeEndpoint)}</ndd:endpoint>` : ""}<ndd:location>${esc(String(s.sartimeLocation || s.ades).toUpperCase().slice(0, 20))}</ndd:location></ndd:sartimeinfo>` : "";
    const stage = `<ndd:stage number="1"><ndd:acid>${esc(String(s.acid).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7))}</ndd:acid><ndd:frul>${esc(s.rules || "I")}</ndd:frul><ndd:ftyp>${esc(s.flightType || "N")}</ndd:ftyp><ndd:atyp>${esc(s.atyp)}</ndd:atyp><ndd:wtc>${esc(s.wtc || "L")}</ndd:wtc><ndd:nav-com-equip>${esc((codes(s.equip).length ? codes(s.equip) : ["S", "G"]).join(" "))}</ndd:nav-com-equip><ndd:surv-equip>${esc((codes(s.surv).length ? codes(s.surv) : ["S"]).join(" "))}</ndd:surv-equip><ndd:adep>${esc(s.adep)}</ndd:adep><ndd:etd>${esc(isoZ(s.etd))}</ndd:etd><ndd:ades>${esc(s.ades)}</ndd:ades><ndd:teet>${dur(s.eetMinutes || 60)}</ndd:teet>${(s.altn || []).slice(0, 2).map(a => `<ndd:altn>${esc(a)}</ndd:altn>`).join("")}<ndd:route><ndd:speed>${esc(s.route && s.route.speed || s.tas || "N0120")}</ndd:speed><ndd:level>${esc(s.route && s.route.level || s.level || "A050")}</ndd:level>${segs}</ndd:route>${s.reg ? `<ndd:reg>${esc(String(s.reg).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11))}</ndd:reg>` : ""}<ndd:other-info>${otherXml}</ndd:other-info>${sar}${supplXml}</ndd:stage>`;
    const body = `<ndd:submit-icao-fn-rqs ${this.attrs()}${s.ignoreAtypReg ? ' ignore-atyp-reg="true"' : ""}><ndd:flight-notif><ndd:domestic>${s.domestic !== false}</ndd:domestic>${stage}</ndd:flight-notif></ndd:submit-icao-fn-rqs>`;
    return this.call("fn", "submit-icao-fn", body);
  }
}
/* Minimal response reader: status attribute, info, text content, fpl-text lines, NOTAM summaries, SOAP faults. */
function parseResponse(xml, operation) {
  const fault = /<(?:\w+:)?Fault>[\s\S]*?<faultstring>([\s\S]*?)<\/faultstring>/.exec(xml);
  if (fault) throw new Error("NAIPS fault: " + unesc(fault[1]).trim());
  /* <x-rsp ...>...</x-rsp>, or the self-closing <x-rsp .../> NAIPS sends when a successful reply carries no content. */
  const rsp = /<(?:\w+:)?([a-z-]+-rsp)\b([^>]*?)(?:\/>|>([\s\S]*?)<\/(?:\w+:)?\1>)/.exec(xml);
  if (!rsp) throw new Error("NAIPS: no response element for " + operation + " in: " + xml.replace(/\s+/g, " ").slice(0, 160));
  const attrs = rsp[2]; const inner = rsp[3] || "";
  const status = (/status="([^"]*)"/.exec(attrs) || [])[1] || "UNKNOWN";
  const grab = name => { const m = new RegExp("<(?:\\w+:)?" + name + "\\b[^>]*>([\\s\\S]*?)<\\/(?:\\w+:)?" + name + ">").exec(inner); return m ? unesc(m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")) : null; };
  const all = name => { const re = new RegExp("<(?:\\w+:)?" + name + "\\b[^>]*>([\\s\\S]*?)<\\/(?:\\w+:)?" + name + ">", "g"); const out = []; let m; while ((m = re.exec(inner))) out.push(unesc(m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1"))); return out; };
  const products = []; const pre = /<(?:\w+:)?product\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?product>/g; let pm; while ((pm = pre.exec(inner))) { const type = (/type="([^"]*)"/.exec(pm[1]) || [])[1]; const variant = (/variant="([^"]*)"/.exec(pm[1]) || [])[1]; const c = /<(?:\w+:)?content>([\s\S]*?)<\/(?:\w+:)?content>/.exec(pm[2]); if (type && c) products.push({ type, variant: variant || null, data: c[1].replace(/\s+/g, "") }); }
  /* get-chart-rsp carries each picture as <content type="PNG" variant="LO"><content>base64</content></content> */
  const cre2 = /<(?:\w+:)?content\b([^>]*\btype="[^"]*"[^>]*)>\s*<(?:\w+:)?content>([^<]*)</g; let c2; while ((c2 = cre2.exec(inner))) { const type = (/type="([^"]*)"/.exec(c2[1]) || [])[1]; const variant = (/variant="([^"]*)"/.exec(c2[1]) || [])[1]; if (type) products.push({ type, variant: variant || null, data: c2[2].replace(/\s+/g, "") }); }
  /* chart-dir-rsp: <chart key="..."> descriptors; resource-dir-rsp: <resource key="..."> descriptors (GAF and GPWT). The key attribute is what get-chart / get-resource take. */
  const charts = []; const cre = /<(?:\w+:)?chart\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?chart>/g; let cm; while ((cm = cre.exec(inner))) { const g2 = name => { const m2 = new RegExp("<(?:\\w+:)?" + name + "\\b[^>]*>([\\s\\S]*?)<\\/(?:\\w+:)?" + name + ">").exec(cm[2]); return m2 ? unesc(m2[1]).trim() : null; }; const vm = /<(?:\w+:)?valid>[\s\S]*?<(?:\w+:)?from>([^<]*)<[\s\S]*?<(?:\w+:)?till>([^<]*)</.exec(cm[2]); charts.push({ kind: "chart", key: (/\bkey="([^"]*)"/.exec(cm[1]) || [])[1] || null, code: g2("code"), name: g2("name"), stored: g2("store-time"), from: vm ? vm[1] : null, till: vm ? vm[2] : null, source: g2("source"), bom: g2("bom"), format: g2("format"), category: g2("category"), variants: [...cm[2].matchAll(/<(?:\w+:)?variant>([^<]*)</g)].map(x => x[1]) }); }
  const resources = []; const rre = /<(?:\w+:)?resource\b([^>]*)>([\s\S]*?)<\/(?:\w+:)?resource>/g; let rm; while ((rm = rre.exec(inner))) { const g2 = name => { const m2 = new RegExp("<(?:\\w+:)?" + name + "\\b[^>]*>([\\s\\S]*?)<\\/(?:\\w+:)?" + name + ">").exec(rm[2]); return m2 ? unesc(m2[1]).trim() : null; }; const vm = /<(?:\w+:)?valid>[\s\S]*?<(?:\w+:)?from>([^<]*)<[\s\S]*?<(?:\w+:)?till>([^<]*)</.exec(rm[2]); resources.push({ kind: "resource", key: (/\bkey="([^"]*)"/.exec(rm[1]) || [])[1] || null, category: g2("type"), bom: g2("bom"), stored: g2("timestamp"), from: vm ? vm[1] : null, till: vm ? vm[2] : null }); }
  const res = { operation, status, ok: status === "SUCCESS", info: grab("info"), content: grab("content"), fplText: all("fpl-text"), name: grab("name"), motd: grab("motd"), number: grab("number"), products, charts, resources };
  if (!res.ok && !res.info) res.info = "NAIPS returned " + status;
  return res;
}
module.exports = { Naips, parseResponse, NS, esc };
