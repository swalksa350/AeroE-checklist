/* AeroE Checklist – EFB edition engine.
   A trimmed copy of the main app's checklist logic for a single aircraft in one self-contained file:
   no aircraft picker, no service worker, no update checks, no favourites. Saved ticks use browser
   storage when the host viewer allows it and the page works normally when it does not. */
const a = window.AIRCRAFT[0];
const MODES = [["normal","Normal"],["abnormal","Abnormal"],["emergency","Emergency"],["status","Status"]];
const STORE_KEY = "aeroe-efb-" + a.id;
const state = {mode:"normal", sel:null, showing:false, ticks:{}, branches:{}, confirmReset:false};
try{ const s=JSON.parse(localStorage.getItem(STORE_KEY)||"null"); if(s&&typeof s==="object"){ if(s.ticks)state.ticks=s.ticks; if(s.branches)state.branches=s.branches; if(MODES.some(m=>m[0]===s.mode))state.mode=s.mode; if(typeof s.sel==="string"||s.sel===null)state.sel=s.sel; state.showing=!!s.showing; } }catch(e){}
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify({ticks:state.ticks,branches:state.branches,mode:state.mode,sel:state.sel,showing:state.showing})); }catch(e){} }

/* day / night */
const THEME_KEY="aeroe-efb-theme", THEMES=[["auto","Auto","◐"],["day","Day","☀"],["night","Night","☾"]];
let theme="auto"; try{ const t=localStorage.getItem(THEME_KEY); if(THEMES.some(x=>x[0]===t)) theme=t; }catch(e){}
function applyTheme(){ const r=document.documentElement; if(theme==="night")r.setAttribute("data-theme","dark"); else if(theme==="day")r.setAttribute("data-theme","light"); else r.removeAttribute("data-theme"); try{localStorage.setItem(THEME_KEY,theme);}catch(e){} }

function proc(mode,id){return (a[mode]||[]).find(p=>p.id===id)}
function key(pid,path){return pid+"/"+path}
function rows(p){
  const out=[];
  const walk=(items,prefix)=>items.forEach((it,i)=>{
    const path=prefix+i;
    if(it.branch){const chosen=state.branches[key(p.id,path)];out.push({type:"branch",it,path,chosen});if(chosen&&it.opts[chosen])walk(it.opts[chosen],path+"."+chosen+".");}
    else if(it.note)out.push({type:"note",it,path});
    else if(it.defer)out.push({type:"defer",it,path});
    else out.push({type:"item",it,path});
  });
  walk(p.items,"");return out;
}
const actionable=r=>r.type==="item"||r.type==="defer";
const isDone=(p,r)=>!!state.ticks[key(p.id,r.path)];
function progress(p){const all=rows(p),rs=all.filter(actionable),d=rs.filter(r=>isDone(p,r)).length,open=all.some(r=>r.type==="branch"&&!r.chosen);return{done:d,total:rs.length,complete:rs.length>0&&d===rs.length&&!open}}
function resetProc(p){Object.keys(state.ticks).forEach(k=>{if(k.startsWith(p.id+"/"))delete state.ticks[k]});Object.keys(state.branches).forEach(k=>{if(k.startsWith(p.id+"/"))delete state.branches[k]})}
const activeNonNormal=()=>["emergency","abnormal"].flatMap(m=>a[m].map(p=>({m,p}))).filter(x=>{const pr=progress(x.p);return pr.done>0&&!pr.complete});
function deferredItems(){const out=[];["emergency","abnormal"].forEach(m=>a[m].forEach(p=>rows(p).forEach(r=>{if(r.type==="defer"&&isDone(p,r))out.push(r.it.defer)})));return out}

const $=s=>document.querySelector(s);
function h(tag,attrs,...kids){const e=document.createElement(tag);for(const k in attrs||{}){if(k==="class")e.className=attrs[k];else if(k.startsWith("on"))e.addEventListener(k.slice(2),attrs[k]);else e.setAttribute(k,attrs[k])}kids.flat().forEach(c=>e.append(c instanceof Node?c:document.createTextNode(c)));return e}
function go(fn){fn();save();render()}

function render(){
  const brand=$("#brand");brand.innerHTML="";brand.append(h("span",{class:"ac"},h("span",{},a.short)),h("small",{},a.maker+" "+a.model));
  const nav=$("#modes");nav.innerHTML="";const act=activeNonNormal().length;
  MODES.forEach(([m,label])=>{const b=h("button",{class:(state.mode===m?"on ":"")+(m==="emergency"?"emerg":m==="abnormal"?"abn":m==="normal"?"norm":""),onclick:()=>go(()=>{state.mode=m;state.sel=null;state.showing=false;state.confirmReset=false})},label);if(m==="status"&&act)b.append(h("span",{class:"badge"},act));nav.append(b)});
  const tb=$("#theme");tb.innerHTML="";const t=THEMES.find(x=>x[0]===theme);tb.className="theme"+(theme!=="auto"?" on":"");tb.append(h("span",{class:"g"},t[2]),h("span",{},t[1]));tb.onclick=()=>{const i=THEMES.findIndex(x=>x[0]===theme);theme=THEMES[(i+1)%THEMES.length][0];applyTheme();render()};
  $("#main").classList.toggle("showing-proc",state.showing);
  const view=$("#view");view.classList.remove("norm","abn","emerg");if(state.mode!=="status")view.classList.add(state.mode==="normal"?"norm":state.mode==="abnormal"?"abn":"emerg");
  renderSide();renderView();
}
function renderSide(){
  const s=$("#side");s.innerHTML="";
  if(state.mode==="status"){s.append(h("div",{class:"group-title"},"Status"));s.append(h("div",{class:"list"},h("button",{class:"sel",onclick:()=>go(()=>{state.showing=true})},h("span",{class:"name"},"Flight status overview"))));return}
  const list=h("div",{class:"list"});
  s.append(h("div",{class:"group-title"},state.mode==="normal"?"Normal checklists":state.mode==="emergency"?"Emergency procedures":"Abnormal procedures"));
  if(state.mode==="normal")list.append(h("button",{class:"ref "+(state.sel==="__vs"?"sel":""),onclick:()=>go(()=>{state.sel="__vs";state.showing=true})},h("span",{class:"dot"}),h("span",{class:"name"},"V-speeds & limits"),h("span",{class:"n"},"ref")));
  a[state.mode].forEach(p=>{const pr=progress(p);const dot=pr.complete?"done":pr.done>0?(state.mode==="normal"?"partial":"active"):"";list.append(h("button",{class:state.sel===p.id?"sel":"",onclick:()=>go(()=>{state.sel=p.id;state.showing=true})},h("span",{class:"dot "+dot}),h("span",{class:"name"},p.name),h("span",{class:"n"},pr.total?pr.done+"/"+pr.total:"")))});
  s.append(list);
}
function renderView(){
  const v=$("#view");v.innerHTML="";
  const back=()=>h("button",{class:"back",onclick:()=>go(()=>{state.showing=false})},"‹ Back");
  if(state.mode==="status"){
    const w=h("div",{class:"status"});
    w.append(h("div",{class:"proc-head"},back(),h("h1",{},"Flight status",h("span",{class:"cond"},a.maker+" "+a.model))));
    const act=activeNonNormal();w.append(h("h2",{},"Active procedures"));if(!act.length)w.append(h("div",{class:"empty"},"None."));
    act.forEach(({m,p})=>{const pr=progress(p);w.append(h("div",{class:"row "+(m==="emergency"?"red":"amb")},h("button",{onclick:()=>go(()=>{state.mode=m;state.sel=p.id;state.showing=true})},p.name),h("span",{class:"num"},pr.done+"/"+pr.total+(p.land?"  ·  "+p.land:""))))});
    const defs=deferredItems();w.append(h("h2",{},"Deferred items / landing considerations"));if(!defs.length)w.append(h("div",{class:"empty"},"None."));else{const ul=h("ul",{});defs.forEach(d=>ul.append(h("li",{},d)));w.append(h("div",{class:"deferred"},ul))}
    w.append(h("h2",{},"Normal checklists"));a.normal.forEach(p=>{const pr=progress(p);w.append(h("div",{class:"row"},h("span",{},p.name),h("span",{class:"num "+(pr.complete?"ok":pr.done?"pend":"")},pr.complete?"Complete":pr.done?pr.done+"/"+pr.total:"—")))});
    w.append(h("h2",{},"Flight"));
    if(!state.confirmReset)w.append(h("div",{class:"row"},h("button",{class:"link",onclick:()=>{state.confirmReset=true;render()}},"Reset all checklists for a new flight")));
    else w.append(h("div",{class:"confirm"},h("span",{},"Clear every checklist and procedure for a new flight?"),h("button",{onclick:()=>{state.confirmReset=false;render()}},"Keep"),h("button",{class:"danger",onclick:()=>go(()=>{state.ticks={};state.branches={};state.confirmReset=false})},"Reset all")));
    w.append(h("h2",{},"About"));
    w.append(h("div",{class:"row"},h("span",{},"Version"),h("span",{class:"num"},window.AEROE_VERSION||window.AEROE_BUILD||"")));
    w.append(h("div",{class:"row"},h("span",{},"Edition"),h("span",{class:"num"},"EFB single file")));
    w.append(h("div",{class:"saved"},"Ticks are kept between sessions only where the viewer app allows it. Basis: "+(a.basis||"")));
    v.append(w);return;
  }
  if(state.mode==="normal"&&state.sel==="__vs"){
    v.append(h("div",{class:"proc-head"},back(),h("h1",{},"V-speeds & limits",h("span",{class:"cond"},a.maker+" "+a.model))));
    const w=h("div",{class:"vs"});w.append(h("div",{class:"meta"},a.engine+(a.seats?" · "+a.seats+" seats":"")));const t=h("table",{});(a.vspeeds||[]).forEach(s=>t.append(h("tr",{},h("td",{},s.k),h("td",{},s.v))));w.append(t);if(a.basis)w.append(h("div",{class:"meta"},"Basis: "+a.basis));v.append(w);return;
  }
  const p=proc(state.mode,state.sel);
  if(!p){v.append(h("div",{class:"status"},h("div",{class:"empty"},"Select a checklist.")));return}
  const cls=state.mode==="emergency"?"emerg":state.mode==="abnormal"?"abn":"norm";
  v.append(h("div",{class:"proc-head"},back(),h("h1",{class:cls},p.name,p.cond?h("span",{class:"cond"},p.cond):""),h("div",{class:"tools"},h("button",{onclick:()=>go(()=>resetProc(p))},"Reset"))));
  if(p.land)v.append(h("div",{class:"land"+(p.land.includes("PRACTICAL")?" amber":"")},p.land));
  const rs=rows(p),next=rs.find(r=>actionable(r)&&!isDone(p,r)),items=h("div",{class:"items"});
  rs.forEach(r=>{
    if(r.type==="note"){items.append(h("div",{class:"item note "+(r.it.kind||"")},r.it.note));return}
    if(r.type==="branch"){const opts=h("div",{class:"opts"});Object.keys(r.it.opts).forEach(o=>opts.append(h("button",{class:r.chosen===o?"sel":r.chosen?"off":"",onclick:()=>go(()=>{Object.keys(state.ticks).forEach(k=>{if(k.startsWith(key(p.id,r.path+".")))delete state.ticks[k]});Object.keys(state.branches).forEach(k=>{if(k!==key(p.id,r.path)&&k.startsWith(key(p.id,r.path+".")))delete state.branches[k]});state.branches[key(p.id,r.path)]=o})},o)));items.append(h("div",{class:"branch"},h("div",{class:"q"},r.it.branch),opts));return}
    const done=isDone(p,r),it=r.it;
    const cl=["item",done?"done":"",r===next?"next":"",it.mem?"mem":"",it.sub?"sub":"",r.type==="defer"?"defer":""].join(" ");
    items.append(h("button",{class:cl,onclick:()=>go(()=>{const k=key(p.id,r.path);if(state.ticks[k])delete state.ticks[k];else state.ticks[k]=1})},h("span",{class:"chal"},r.type==="defer"?"Deferred: "+it.defer:it.c),h("span",{class:"lead"}),h("span",{class:"resp"},r.type==="defer"?"NOTED":it.r)));
  });
  v.append(items);
  const pr=progress(p);
  if(pr.complete){const nextProc=a[state.mode][a[state.mode].indexOf(p)+1];const bar=h("div",{class:"complete"},p.name.toUpperCase()+" COMPLETE");if(state.mode==="normal"&&nextProc)bar.append(h("button",{onclick:()=>go(()=>{state.sel=nextProc.id})},"Next: "+nextProc.name));else if(state.mode!=="normal")bar.append(h("button",{onclick:()=>go(()=>{state.mode="status";state.sel=null;state.showing=true})},"View status"));v.append(bar)}
}
applyTheme();render();
