const { chromium, devices } = require('playwright');
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ ...devices['iPad Pro 11'] });
  const page = await ctx.newPage(); const errs=[];
  page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  // Stub speech synthesis (log + fast onend) and a scripted recogniser
  await page.addInitScript(() => {
    window.__spoken=[]; window.__answers=[];
    const voices=[{name:'Karen',lang:'en-AU',voiceURI:'karen',default:true}];
    window.speechSynthesis={ getVoices:()=>voices, cancel(){}, speak(u){ window.__spoken.push(u.text); setTimeout(()=>u.onend&&u.onend(),30); }, onvoiceschanged:null };
    window.SpeechSynthesisUtterance=function(t){ this.text=t; };
    window.webkitSpeechRecognition=function(){ this.start=()=>{ const a=window.__answers.shift(); setTimeout(()=>{ if(a===undefined){ this.onerror&&this.onerror({error:'no-speech'}); this.onend&&this.onend(); return; } this.onresult&&this.onresult({results:[[{transcript:a}]]}); this.onend&&this.onend(); },40); }; this.abort=()=>{}; };
  });
  await page.goto('http://localhost:8765/index.html#c172s');
  // turn on both settings via the Status page
  await page.locator('nav.modes button', { hasText: 'Status' }).click(); await page.locator('aside .list button').click();
  await page.locator('.status .row', { hasText: 'Read aloud' }).locator('.tog').click();
  await page.locator('.status .row', { hasText: 'Voice replies' }).locator('.tog').click();
  console.log('toggles on:', await page.locator('.status .tog.on').count(), '| voice select:', await page.locator('#voice-select').count());
  await page.locator('.status button', { hasText: 'Test the voice' }).click(); await page.waitForTimeout(100);
  console.log('test speech:', JSON.stringify(await page.evaluate(() => window.__spoken.pop())));
  // open a checklist, start reading, answer by voice: checked, repeat, skip, then tap Checked
  await page.evaluate(() => { window.__answers.push('checked','repeat','skip'); });
  await page.locator('nav.modes button', { hasText: 'Normal' }).click(); await page.getByText('Before Start').click();
  console.log('voice bar:', await page.locator('#vbar').count(), '|', await page.locator('#vbar .cur').innerText());
  await page.locator('#vbar button', { hasText: 'Start' }).click();
  await page.waitForTimeout(1500);
  console.log('ticked by voice:', await page.locator('.item.done').count(), '| spoken so far:', (await page.evaluate(() => window.__spoken.length)));
  console.log('bar status:', await page.locator('#vbar .st').innerText(), '| heard:', await page.locator('#vbar .heard').innerText().catch(()=>'-'));
  await page.locator('#vbar button.ok').click(); await page.waitForTimeout(300);
  console.log('after tap Checked, ticked:', await page.locator('.item.done').count());
  console.log('sample spoken:', JSON.stringify((await page.evaluate(() => window.__spoken)).slice(0,3)));
  // branch by voice in the Maule start
  await page.locator('#brand').click(); await page.locator('.card', { hasText: 'M-7-235' }).click();
  await page.evaluate(() => { window.__answers.push('hot'); });
  await page.getByText('Engine Start').click(); await page.locator('#vbar button', { hasText: 'Start' }).click();
  await page.waitForTimeout(1500);
  console.log('maule branch chosen:', await page.locator('.branch .opts button.sel').first().innerText().catch(()=>'none'));
  await page.locator('#vbar button.stop').click();
  // spoken recall
  await page.locator('nav.modes button', { hasText: 'Emergency' }).click();
  await page.evaluate(() => { window.__answers.push('engine fire in flight'); });
  await page.locator('aside .mic').click(); await page.waitForTimeout(600);
  console.log('recall opened:', await page.locator('.proc-head h1').innerText().then(t=>t.split('\n')[0]));
  await page.screenshot({ path: 'voice.png' });
  console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})().catch(e => { console.error('FAILED', e.message); process.exit(1); });
