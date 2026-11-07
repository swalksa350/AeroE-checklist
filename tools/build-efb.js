#!/usr/bin/env node
/* Builds the EFB edition: one self-contained HTML file per aircraft (and a printable PDF when
   Playwright is available) into efb/, plus efb/index.html as a download page.
   This is an add-on: nothing here touches index.html, sw.js or the app's offline cache.
   Usage: node tools/build-efb.js [--no-pdf] */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const root = path.join(__dirname, "..");
const out = path.join(root, "efb");
fs.mkdirSync(out, { recursive: true });
const appHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const style = appHtml.split("<style>")[1].split("</style>")[0];
const engine = fs.readFileSync(path.join(__dirname, "efb-engine.js"), "utf8");
const build = (appHtml.match(/const BUILD = "([^"]*)"/) || [, "dev"])[1];
const files = fs.readdirSync(path.join(root, "aircraft")).filter(f => f.endsWith(".js")).sort();
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const page = (a, data) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(a.short)} Checklist – AeroE</title>
<meta name="description" content="AeroE Checklist EFB edition: ${esc(a.maker)} ${esc(a.model)} normal, abnormal and emergency checklists in one offline file.">
<style>
${style}
/* EFB edition: single aircraft, header brand is not a button */
header .brand{cursor:default}
</style>
</head>
<body>
<div id="app">
  <header id="hdr">
    <div class="brand" id="brand"></div>
    <nav class="modes" id="modes" aria-label="Checklist sections"></nav>
    <button class="theme" id="theme" aria-label="Day or night display"></button>
  </header>
  <main id="main">
    <aside id="side"></aside>
    <section class="view" id="view"></section>
  </main>
  <footer>Prototype content. Verify against the operator's approved checklist and the POH/AFM before any use. · AeroE Checklist EFB edition ${build}</footer>
</div>
<script>
window.AEROE_BUILD = "${build}";
${data}
</script>
<script>
${engine}
</script>
</body>
</html>
`;

/* Printable layout for the PDF: every procedure in full, branches shown with all options. */
const printPage = a => {
  const items = (list, depth) => list.map(it => {
    const pad = `padding-left:${depth * 14}px`;
    if (it.branch) return `<div class="q" style="${pad}">▶ ${esc(it.branch)}</div>` +
      Object.keys(it.opts).map(o => `<div class="opt" style="${pad}">${esc(o)}:</div>${items(it.opts[o], depth + 1)}`).join("");
    if (it.note) return `<div class="note ${it.kind || ""}" style="${pad}">${esc(it.note)}</div>`;
    if (it.defer) return `<div class="li defer" style="${pad}"><span class="c">Deferred: ${esc(it.defer)}</span><span class="dots"></span><span class="r">NOTED</span></div>`;
    return `<div class="li ${it.mem ? "mem" : ""} ${it.sub ? "sub" : ""}" style="${pad}"><span class="c">${esc(it.c)}${it.mem ? ' <em>(memory)</em>' : ""}</span><span class="dots"></span><span class="r">${esc(it.r)}</span></div>`;
  }).join("");
  const section = (title, cls, procs) => `<h2 class="${cls}">${title}</h2>` + procs.map(p => `
    <section class="proc"><h3 class="${cls}">${esc(p.name)}${p.cond ? `<small>${esc(p.cond)}</small>` : ""}</h3>
    ${p.land ? `<div class="land ${p.land.includes("PRACTICAL") ? "amber" : ""}">${esc(p.land)}</div>` : ""}
    ${items(p.items, 0)}</section>`).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>${esc(a.short)} Checklist</title>
<style>
@page{size:A4;margin:14mm 12mm}
body{font:10.5pt/1.3 "Helvetica Neue",Helvetica,Arial,sans-serif;color:#111;margin:0}
h1{font-size:20pt;margin:0 0 2pt}
.sub{color:#555;font-size:9.5pt;margin-bottom:8pt}
h2{font-size:14pt;margin:16pt 0 6pt;padding-bottom:3pt;border-bottom:2px solid #999;page-break-after:avoid}
h2.norm{color:#1f8f55;border-color:#1f8f55} h2.abn{color:#b7780a;border-color:#b7780a} h2.emerg{color:#c2322a;border-color:#c2322a}
h3{font-size:11.5pt;margin:10pt 0 3pt;page-break-after:avoid} h3 small{display:block;font-weight:400;color:#555;font-size:9pt}
h3.emerg{color:#c2322a} h3.abn{color:#b7780a}
.proc{page-break-inside:avoid}
.li{display:flex;align-items:baseline;gap:6pt;padding:2pt 0;border-bottom:1px dotted #ddd}
.li .c{white-space:nowrap} .li .dots{flex:1;border-bottom:1px dotted #999;min-width:10pt;transform:translateY(-3pt)} .li .r{font-weight:700;text-align:right}
.li.mem{border-left:3px solid #c2322a;padding-left:4pt} .li em{color:#c2322a;font-style:normal;font-size:8.5pt}
.li.defer .c,.li.defer .r{color:#b7780a}
.note{color:#444;font-size:9.5pt;padding:2pt 0 2pt 10pt} .note.warn{color:#c2322a} .note.caution{color:#b7780a}
.q{color:#b7780a;font-weight:700;padding:4pt 0 1pt} .opt{font-weight:600;padding:2pt 0 0 6pt;color:#333}
.land{display:inline-block;padding:2pt 8pt;border-radius:3pt;background:#c2322a;color:#fff;font-weight:700;font-size:9.5pt;margin:2pt 0 4pt} .land.amber{background:#b7780a}
table{border-collapse:collapse;width:60%;margin:4pt 0 8pt} td{padding:2pt 6pt 2pt 0;border-bottom:1px solid #eee;font-size:9.5pt} td:last-child{font-weight:600}
.foot{margin-top:14pt;padding-top:6pt;border-top:1px solid #999;color:#555;font-size:8.5pt}
</style></head><body>
<h1>${esc(a.maker)} ${esc(a.model)} <span style="color:#555;font-weight:400">(${esc(a.short)})</span></h1>
<div class="sub">${esc(a.engine)}${a.seats ? " · " + esc(a.seats) + " seats" : ""} · ${esc(a.basis || "")}</div>
<h2 class="norm">V-speeds & limits</h2>
<table>${(a.vspeeds || []).map(s => `<tr><td>${esc(s.k)}</td><td>${esc(s.v)}</td></tr>`).join("")}</table>
${section("Normal procedures", "norm", a.normal)}
${section("Abnormal procedures", "abn", a.abnormal)}
${section("Emergency procedures", "emerg", a.emergency)}
<div class="foot">Prototype content. Verify against the operator's approved checklist and the POH/AFM before any use. AeroE Checklist ${build} · ${new Date().toISOString().slice(0, 10)}</div>
</body></html>`;
};

const list = [];
for (const f of files) {
  const data = fs.readFileSync(path.join(root, "aircraft", f), "utf8");
  global.window = {}; require(path.join(root, "aircraft", f)); const a = window.AIRCRAFT[0];
  fs.writeFileSync(path.join(out, `${a.id}.html`), page(a, data));
  fs.writeFileSync(path.join(out, `${a.id}.print.html`), printPage(a));
  list.push(a);
}

const noPdf = process.argv.includes("--no-pdf");
(async () => {
  let pdfs = 0;
  if (!noPdf) {
    let chromium = null; try { ({ chromium } = require("playwright")); } catch (e) {}
    if (chromium) {
      const browser = await chromium.launch();
      const pg = await browser.newPage();
      for (const a of list) {
        await pg.goto("file://" + path.join(out, `${a.id}.print.html`));
        await pg.pdf({ path: path.join(out, `${a.id}.pdf`), format: "A4", printBackground: true, margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" } });
        pdfs++;
      }
      await browser.close();
    } else console.log("Playwright not available: HTML written, PDFs skipped (existing PDFs kept).");
  }
  for (const a of list) fs.unlinkSync(path.join(out, `${a.id}.print.html`));

  const cats = ["Single-engine piston", "High-performance single", "Multi-engine piston", "Turboprop"];
  const rowsHtml = cats.map(c => {
    const l = list.filter(a => a.category === c).sort((x, y) => (x.maker + x.model).localeCompare(y.maker + y.model));
    if (!l.length) return "";
    return `<h2>${c}</h2><table>${l.map(a => `<tr><td><strong>${esc(a.maker)} ${esc(a.model)}</strong><br><small>${esc(a.engine)}</small></td><td><a href="${a.id}.html">Interactive (HTML)</a></td><td>${fs.existsSync(path.join(out, a.id + ".pdf")) ? `<a href="${a.id}.pdf">Printable (PDF)</a>` : ""}</td></tr>`).join("")}</table>`;
  }).join("");
  fs.writeFileSync(path.join(out, "index.html"), `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>AeroE Checklist – EFB files</title>
<style>
:root{color-scheme:light dark;--bg:#eef1f3;--panel:#fff;--ink:#131a1f;--dim:#5a6873;--line:#d3dade;--cyan:#1a7f9c}
@media (prefers-color-scheme:dark){:root{--bg:#12181d;--panel:#1b2329;--ink:#dfe5e9;--dim:#8b9aa6;--line:#2f3c46;--cyan:#5bb7d2}}
body{margin:0;padding:16px max(16px,env(safe-area-inset-right)) 40px max(16px,env(safe-area-inset-left));background:var(--bg);color:var(--ink);font:16px/1.4 "Helvetica Neue",Helvetica,Arial,sans-serif;max-width:860px;margin-inline:auto}
h1{font-size:22px;margin:8px 0 4px} h2{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--dim);margin:22px 0 8px}
p,li{max-width:65ch} a{color:var(--cyan)} .box{background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:12px 14px;margin:12px 0}
table{width:100%;border-collapse:collapse;background:var(--panel);border:1px solid var(--line);border-radius:6px} td{padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top} tr:last-child td{border-bottom:0} small{color:var(--dim)}
ol li{margin:6px 0}
</style></head><body>
<h1>AeroE Checklist – EFB files</h1>
<p>Single-file versions of each aircraft checklist for loading into an EFB's Documents area (OzRunways, AvPlan and similar). The interactive HTML file works offline inside the EFB once loaded; the PDF is a printable fallback. The <a href="../">main app</a> is the master copy and is updated first.</p>
<div class="box"><strong>Loading into OzRunways (iPad / iPhone):</strong>
<ol><li>Tap an "Interactive (HTML)" link below, then use Share → <em>Copy to OzRWY</em>. It appears on the Documents page, where you can move it into a folder.</li>
<li>Or save the file to a Dropbox folder linked in OzRunways Settings; it syncs to the Documents page.</li>
<li>Companies can push files to every pilot through the OzRunways Dashboard.</li></ol>
<strong>Loading into AvPlan EFB:</strong>
<ol><li>Save the file into the <em>Apps/AvPlan EFB</em> folder of a linked Dropbox account; it appears under Text → Dropbox. AvPlan's Dropbox import is documented for PDF, so test the HTML file on your device first and use the PDF if it does not open.</li>
<li>Cloud Group administrators can distribute files to members.</li></ol>
<p><small>Ticks and day/night choice are remembered only where the EFB's viewer allows browser storage. Files carry the build id ${build}; replace them when the main app updates. Prototype content – verify against the POH/AFM before any use.</small></p></div>
${rowsHtml}
</body></html>`);
  console.log(`${list.length} EFB html files, ${pdfs} PDFs, build ${build}`);
})();
