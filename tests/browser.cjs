/* Development-only localhost test harness. No server is part of the shipped app. */
const {chromium}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),out=path.join(root,'test-results');fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);return res.end()}
    const mime={'.html':'text/html','.aspx':'text/html','.js':'text/javascript','.css':'text/css','.ttf':'font/ttf','.png':'image/png'};
    res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(data);
  });
});
function fixture(kind){
  const S=require('../assets/state.js'),phases=require('../assets/phases.js');const s=S.defaults();if(kind==='empty')return s;
  Object.assign(s.metadata,{agency:'Oregon Example Agency',title:'AI Adoption Strategy',version:'2.1',date:'2026-09-24',facilitator:'Workshop facilitator',participants:'Business leadership, IT, security, data and privacy',agencyPlan:'Agency Strategic Plan 2026–2028',itPlan:'IT Strategic Plan 2026–2028'});
  phases.forEach((p,i)=>{const q=s.phases[p.id];q.notes='SECRET_SCRATCHPAD';q.context='SECRET_CONTEXT';q.discussion='SECRET_DISCUSSION';q.approved=kind!=='partial'||i===0;p.fields.forEach((f,n)=>q.capture[f.key]=n===0?'The agency will use AI to support public value while preserving human judgment, clear accountability, and reliable services.':n===1?'Business leadership will document decisions and involve IT, security, privacy, and data stewards before implementation.':n===2?'- Review sensitive information before use.\n- Verify outputs against authoritative sources.\n- Escalate consequential decisions.':'The accountable business owner will review implementation with the governance group each quarter.')});
  s.synthesis.priorities.forEach((p,i)=>Object.assign(p,{priority:['Establish the intake process','Prepare the workforce','Measure value and risk'][i],action:'Agree the first action with program leaders and record the decision.',owner:'Business owner and governance group',dependency:'Staff capacity and approved guidance',timeframe:'Within 90 days',risks:'Confirm the resources required before committing to delivery.'}));s.synthesis.approved=kind!=='partial';
  if(kind==='edge'){s.metadata.agency='Very long agency & 公共 <special> : / \\ '.repeat(15)+'\u0000';s.metadata.version='v2/3';s.phases[1].capture.field0='Unicode café 公共 😀 & < > "\nLine break\n- Bullet A\n- Bullet B\n'+('Long strategy text that must wrap across pages safely. '.repeat(180))+'\u0000\ud800';}
  return s;
}
async function suite(channel,base){
  const browser=await chromium.launch({...(channel==='chromium'?{}:{channel}),headless:true});
  try{
    const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write'],reducedMotion:'reduce'});
    const page=await context.newPage(),errors=[],external=[],writes=[],scans=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('blob:'))external.push(r.url());if(r.method()!=='GET')writes.push(r.url())});
    async function scan(name){if(!await page.evaluate(()=>!!window.axe))await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const violations=await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));scans.push(name);assert.deepEqual(violations,[],name+' axe');}
    async function noOverflow(){assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal overflow')}
    async function download(name){const pending=page.waitForEvent('download');await page.locator('#exportTopBtn').click();const d=await pending;assert.ok(d.suggestedFilename().endsWith('.docx'));assert.ok(!/[<>:"/\\|?*]/.test(d.suggestedFilename()));await d.saveAs(path.join(out,channel+'-'+name+'.docx'))}
    await page.goto(base+'/index.html');await scan('setup');await noOverflow();
    await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.className),'skip-link');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'main');
    await page.locator('#meta-agency').fill('Oregon & Agency <test>');await page.locator('#meta-facilitator').fill('Facilitator');
    await page.locator('#beginBtn').focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'phaseTitle');
    await page.locator('#tab-1').focus();for(const [key,id] of [['ArrowRight','tab-2'],['End','tab-10'],['ArrowRight','tab-1'],['ArrowLeft','tab-10'],['Home','tab-1']]){await page.keyboard.press(key);assert.equal(await page.evaluate(()=>document.activeElement.id),id);assert.equal(await page.locator('#'+id).getAttribute('aria-selected'),'true')}
    assert.equal(await page.locator('[role=tab][tabindex="0"]').count(),1);
    await page.locator('#approveSection').click();assert.equal(await page.locator('#approveSection').isChecked(),false);
    await page.locator('#contextInput').fill('SECRET_CONTEXT');await page.locator('#notesInput').fill('SECRET_AI');
    await page.locator('summary').first().click();await page.locator('#discussionInput').fill('SECRET_DISCUSSION');
    await page.locator('#capture-field0').fill('Human decision & <safe>');await page.locator('#approveSection').check();
    assert.ok((await page.locator('#draftScroll').innerText()).includes('Human decision & <safe>'));assert.ok(!(await page.locator('#draftScroll').innerText()).includes('SECRET_'));
    await page.locator('#copyPromptBtn').click();await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('Copied'));assert.ok((await page.evaluate(()=>navigator.clipboard.readText())).includes('SECRET_CONTEXT'));
    await page.locator('#copyDraftBtn').click();await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('Copied formatted'));assert.ok(!(await page.evaluate(()=>navigator.clipboard.readText())).includes('SECRET_'));
    await page.locator('#timerBtn').click();await page.waitForFunction(()=>timerSeconds<480);await page.locator('#timerBtn').click();const paused=await page.evaluate(()=>timerSeconds);await page.waitForTimeout(1100);assert.equal(await page.evaluate(()=>timerSeconds),paused);
    await page.evaluate(()=>{timerSeconds=1;updateTimerReadout()});await page.locator('#timerBtn').click();await page.waitForFunction(()=>timerSeconds===0&&timerHandle===null);await page.locator('#timerBtn').click();assert.ok(await page.evaluate(()=>timerSeconds>0));await page.locator('#timerBtn').click();
    await page.locator('#focusBtn').click();assert.ok(await page.locator('.draft').isHidden());assert.equal(await page.locator('#focusBtn').getAttribute('aria-pressed'),'true');await page.locator('#focusBtn').click();
    await scan('approved phase');await page.reload();await page.locator('#beginBtn').click();assert.equal(await page.locator('#capture-field0').inputValue(),'Human decision & <safe>');assert.ok(await page.locator('#approveSection').isChecked());
    await page.locator('#capture-field0').fill('Changed human decision');assert.ok(!await page.locator('#approveSection').isChecked());assert.ok(!(await page.locator('#draftScroll').innerText()).includes('Changed human decision'));
    for(let i=1;i<=10;i++){await page.locator('#tab-'+i).click();await page.locator('#capture-field0').fill('Section '+i+' decision. <img src="https://invalid.example/never" onerror="alert(1)">');await page.locator('#approveSection').check()}
    assert.ok((await page.locator('#progressText').innerText()).includes('10 of 10'));await page.locator('#nextCaptureBtn').click();assert.equal(await page.evaluate(()=>document.activeElement.id),'synthesisTitle');
    await page.locator('#priority-0-priority').fill('Establish intake');await page.locator('#priority-0-owner').fill('Business leader');await page.locator('#approveSynthesis').check();assert.ok((await page.locator('#draftScroll').innerText()).includes('Establish intake'));
    await page.locator('#addPriorityBtn').click();await page.locator('#addPriorityBtn').click();assert.ok(await page.locator('#addPriorityBtn').isDisabled());assert.ok(!await page.locator('#approveSynthesis').isChecked());
    await page.locator('#priority-4-priority').fill('Optional fifth priority');page.once('dialog',d=>d.dismiss());await page.locator('[data-remove="4"]').click();assert.equal(await page.locator('.priority-card').count(),5);
    page.once('dialog',d=>d.accept());await page.locator('[data-remove="4"]').click();assert.equal(await page.locator('.priority-card').count(),4);await scan('synthesis');
    await page.reload();await page.locator('#synthesisBtn').click();assert.equal(await page.locator('#priority-0-owner').inputValue(),'Business leader');
    for(const width of [768,320]){await page.setViewportSize({width,height:900});await noOverflow();await scan('synthesis '+width);await page.locator('#setupBtn').click();await noOverflow();await scan('setup '+width);await page.locator('#beginBtn').click();await noOverflow();await scan('phase '+width)}
    await page.setViewportSize({width:1440,height:1000});await page.locator('#resetBtn').click();await scan('reset dialog');await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'resetBtn');
    await page.evaluate(()=>localStorage.setItem('ai-strategy-socratic-sandbox-v1:'+location.pathname,'V1_UNCHANGED'));await page.locator('#resetBtn').click();await page.locator('[value=confirm]').click();await page.waitForFunction(()=>localStorage.getItem(STORAGE_KEY)===null);assert.equal(await page.evaluate(()=>localStorage.getItem(STORAGE_KEY)),null);assert.equal(await page.evaluate(()=>localStorage.getItem('ai-strategy-socratic-sandbox-v1:'+location.pathname)),'V1_UNCHANGED');assert.equal(await page.locator('#meta-agency').inputValue(),'');assert.ok(!(await page.locator('#priorityFields').textContent()).includes('Establish intake'));
    // Recoverable storage failure: do not overwrite corrupt data with defaults.
    await page.evaluate(()=>localStorage.setItem(STORAGE_KEY,'{broken'));await page.reload();assert.ok((await page.locator('#saveStatus').innerText()).includes('could not be loaded'));await page.locator('#meta-agency').fill('New notes');assert.equal(await page.evaluate(()=>localStorage.getItem(STORAGE_KEY)),'{broken');await page.locator('#resetBtn').click();await page.locator('[value=confirm]').click();await page.waitForFunction(()=>localStorage.getItem(STORAGE_KEY)===null);
    // Explicit clipboard fallback preserves keyboard focus; blocked copy reports failure.
    await page.locator('#beginBtn').click();await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{value:undefined,configurable:true});document.execCommand=()=>true});await page.locator('#copyPromptBtn').click();assert.equal(await page.evaluate(()=>document.activeElement.id),'copyPromptBtn');
    await page.evaluate(()=>document.execCommand=()=>false);await page.locator('#copyPromptBtn').click();assert.ok((await page.locator('#toast').innerText()).includes('Copy blocked'));
    await page.reload();for(const kind of ['empty','partial','complete','edge']){await page.evaluate(value=>{state=SandboxState.normalize(value);renderDraft()},fixture(kind));await download(kind)}
    await page.evaluate(()=>{state=SandboxState.defaults();renderMetadata();renderDraft()});await page.screenshot({path:path.join(out,channel+'-setup.png'),fullPage:true});
    await page.goto(base+'/ai-strategy-socratic-sandbox.aspx');assert.ok(await page.locator('#setupPanel').isVisible());await download('aspx-empty');
    // File:// distribution loads local assets and exports without an HTTP server.
    const local=await context.newPage();await local.goto('file:///'+path.join(root,'index.html').replace(/\\/g,'/'));assert.ok(await local.locator('#setupPanel').isVisible());const localDownload=local.waitForEvent('download');await local.locator('#exportTopBtn').click();await (await localDownload).saveAs(path.join(out,channel+'-file-empty.docx'));await local.close();
    // Storage denial and quota are visible, while the workshop remains usable.
    const denied=await context.newPage();await denied.addInitScript(()=>{Storage.prototype.getItem=function(){throw Error('denied')}});await denied.goto(base+'/index.html');assert.ok((await denied.locator('#saveStatus').innerText()).includes('could not be loaded'));await denied.locator('#beginBtn').click();await denied.locator('#capture-field0').fill('Session decision');await denied.locator('#approveSection').check();assert.ok((await denied.locator('#draftScroll').innerText()).includes('Session decision'));await denied.close();
    const quota=await context.newPage();await quota.addInitScript(()=>{Storage.prototype.setItem=function(){throw Error('quota')}});await quota.goto(base+'/index.html');await quota.locator('#meta-agency').fill('Unsaved agency');assert.ok((await quota.locator('#saveStatus').innerText()).includes('Autosave unavailable'));await quota.close();
    assert.deepEqual(errors,[]);assert.deepEqual(external,[]);assert.deepEqual(writes,[]);
    console.log(channel+': workflow, keyboard, timer, clipboard/fallback, storage/recovery/reset, privacy, six DOCX downloads and '+scans.length+' axe scans passed');
    fs.writeFileSync(path.join(out,channel+'-results.json'),JSON.stringify({channel,scans,errors,external,writes},null,2));
  }finally{await browser.close()}
}
(async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port;try{for(const channel of (process.env.BROWSER_CHANNELS||'chromium').split(','))await suite(channel,base)}finally{server.close()}})().catch(e=>{console.error(e);process.exitCode=1});
