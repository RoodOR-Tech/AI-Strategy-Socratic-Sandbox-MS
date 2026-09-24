'use strict';
var STORAGE_KEY='ai-strategy-socratic-sandbox-v1-refresh:'+location.pathname;
var APP_NAME='AI Strategy Socratic Sandbox';
var current=1,timerSeconds=480,timerHandle=null,storageOk=true;

function $(id){return document.getElementById(id)}
var els={};
['phaseTabs','phasePanel','phaseKicker','phaseTitle','phaseCopy','phasePill','phaseProgressLabel','saveStatus','progressBar','sideProgressBar','timerBtn','timerReadout','huddleHint','discussionQuestion','contextLabelText','contextInput','contextHint','mediaGrid','promptText','notesInput','consensusInput','starterChips','progressText','draftScroll','toast','resetDialog','copyPromptBtn','copyDraftBtn','exportWordBtn','exportTopBtn','nextBtn','nextTopBtn','prevBtn','prevTopBtn','focusBtn','resetBtn'].forEach(function(id){els[id]=$(id)});

var reducedMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');

function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function setText(el,txt){if(el.textContent!==txt)el.textContent=txt}
function phase(){return phases.find(function(p){return p.id===current})}

function defaults(){return WorkshopState.defaults().phases}
var loaded=WorkshopState.load({getItem:function(key){return localStorage.getItem(key)}},STORAGE_KEY,'ai-strategy-socratic-sandbox-v1:'+location.pathname);
var state=loaded.state.phases,reportMetadata=loaded.state.metadata,storageBlocked=!!loaded.error;
if(storageBlocked){storageOk=false;setText(els.saveStatus,'Saved notes could not be loaded. Existing data is preserved; Reset starts a fresh workspace.')}
function workspaceState(){return {schemaVersion:'1.1',appVersion:'1.1.0',phases:state,metadata:reportMetadata}}
function save(){
  if(storageBlocked){renderDraft();return}
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(workspaceState()));
    storageOk=true;flashSave();
  }catch(e){
    if(storageOk){storageOk=false;setText(els.saveStatus,'Autosave unavailable — keep this tab open and copy unsaved notes before closing')}
  }
  renderDraft();
}
function flashSave(){
  if(!storageOk)return;
  setText(els.saveStatus,'Saving…');
  clearTimeout(flashSave.t);
  flashSave.t=setTimeout(function(){setText(els.saveStatus,'Autosaved')},1200);
}

/* --- Tabs (APG tabs pattern: roving tabindex, arrow keys, selection follows focus) --- */
function buildTabs(){
  els.phaseTabs.innerHTML=phases.map(function(p){
    return '<button class="phase-tab" type="button" role="tab" id="tab-'+p.id+'" data-phase="'+p.id+'" aria-controls="phasePanel" aria-selected="false" tabindex="-1"><strong aria-hidden="true">'+p.id+'</strong><span aria-hidden="true">'+esc(p.short)+'</span></button>';
  }).join('');
  els.phaseTabs.querySelectorAll('[role=tab]').forEach(function(b){
    b.addEventListener('click',function(){setPhase(+b.dataset.phase)});
  });
  els.phaseTabs.addEventListener('keydown',function(e){
    var idx=current-1,n=phases.length;
    if(e.key==='ArrowRight')idx=(idx+1)%n;
    else if(e.key==='ArrowLeft')idx=(idx-1+n)%n;
    else if(e.key==='Home')idx=0;
    else if(e.key==='End')idx=n-1;
    else return;
    e.preventDefault();
    setPhase(idx+1,{focusTab:true});
  });
}
function updateTabs(){
  els.phaseTabs.querySelectorAll('[role=tab]').forEach(function(t){
    var id=+t.dataset.phase,selected=id===current,captured=!!state[id].consensus.trim();
    t.setAttribute('aria-selected',selected?'true':'false');
    t.tabIndex=selected?0:-1;
    t.dataset.captured=captured;
    var p=phases[id-1];
    t.setAttribute('aria-label','Phase '+p.id+': '+p.short+(captured?', captured':', not captured'));
  });
}

function render(){
  var p=phase(),s=state[current];
  updateTabs();
  els.phasePanel.setAttribute('aria-labelledby','tab-'+p.id);
  document.title='Phase '+p.id+': '+p.title+' — '+APP_NAME;
  setText(els.phaseKicker,'Phase '+p.id+' / '+p.exercise);
  setText(els.phaseTitle,p.title);
  setText(els.phaseCopy,p.copy);
  setText(els.phasePill,s.consensus.trim()?'Captured':'Not captured');
  setText(els.huddleHint,'Exercise: '+p.exercise);
  setText(els.discussionQuestion,p.discussion);
  setText(els.contextLabelText,p.label);
  setText(els.contextHint,p.placeholder);
  els.contextInput.value=s.context;
  els.promptText.textContent=p.prompt(s.context.trim()||'[Insert '+p.label+']');
  els.consensusInput.value=s.consensus;
  els.notesInput.value=s.notes||'';
  els.mediaGrid.innerHTML=p.media.map(function(x){
    return '<li class="media"><b><span class="icon" aria-hidden="true">'+esc(x[0])+'</span>'+esc(x[1])+'</b><span>'+esc(x[2])+'</span></li>';
  }).join('');
  els.starterChips.innerHTML=p.chips.map(function(c){
    return '<button class="chip" type="button" data-chip="'+esc(c)+'">'+esc(c)+'</button>';
  }).join('');
  els.starterChips.querySelectorAll('[data-chip]').forEach(function(b){
    b.addEventListener('click',function(){addChip(b.dataset.chip)});
  });
  renderDraft();
}

function renderDraft(){
  var captured=phases.filter(function(p){return state[p.id].consensus.trim()}).length;
  var pct=Math.round(captured/phases.length*100);
  setText(els.progressText,captured+' of '+phases.length+' sections captured.');
  setText(els.phaseProgressLabel,'Workshop progress: '+captured+' of '+phases.length+' captured');
  els.progressBar.style.width=pct+'%';
  els.sideProgressBar.style.width=pct+'%';
  els.draftScroll.innerHTML=ReportContent.html(reportModel(),true,current);
  updateTabs();
}

function addChip(c){
  var b=els.consensusInput,pfx=b.value.trim()?b.value.trim()+'\n':'';
  b.value=pfx+c+': ';
  state[current].consensus=b.value;
  setText(els.phasePill,'Captured');
  b.focus();
  save();
}

function setPhase(id,opts){
  opts=opts||{};
  current=Math.min(phases.length,Math.max(1,id));
  stopTimer(false);
  timerSeconds=480;
  updateTimerReadout();
  render();
  window.scrollTo({top:0,behavior:reducedMotion&&reducedMotion.matches?'auto':'smooth'});
  if(opts.focusTab){$('tab-'+current).focus()}
  else{els.phaseTitle.focus()}
}
function nextPhase(){setPhase(current===phases.length?1:current+1,{focusHeading:true})}
function prevPhase(){setPhase(current===1?phases.length:current-1,{focusHeading:true})}

/* --- Timer --- */
function fmt(s){return ('0'+Math.floor(s/60)).slice(-2)+':'+('0'+s%60).slice(-2)}
function updateTimerReadout(){
  setText(els.timerReadout,fmt(timerSeconds));
  els.timerReadout.setAttribute('aria-label','Time remaining '+fmt(timerSeconds));
  setText(els.timerBtn,timerHandle?'Pause timer':'Start '+fmt(timerSeconds)+' timer');
}
function toggleTimer(){
  if(timerHandle){stopTimer(true);return}
  if(!timerSeconds)timerSeconds=480;
  timerHandle=setInterval(function(){
    timerSeconds=Math.max(0,timerSeconds-1);
    updateTimerReadout();
    if(!timerSeconds){stopTimer(false);showToast('Time is up — capture the group consensus')}
  },1000);
  updateTimerReadout();
  showToast('Timer started: '+fmt(timerSeconds)+' remaining');
}
function stopTimer(announce){
  if(timerHandle){clearInterval(timerHandle);timerHandle=null}
  updateTimerReadout();
  if(announce)showToast('Timer paused at '+fmt(timerSeconds));
}

/* --- Export / clipboard --- */
function reportModel(){return ReportContent.model(workspaceState(),phases)}
function plainText(){return ReportContent.text(reportModel())}
function draftHtml(){return ReportContent.html(reportModel(),false,current)}
var exportInProgress=false;
async function exportWord(){
  if(exportInProgress)return;exportInProgress=true;
  els.exportWordBtn.disabled=els.exportTopBtn.disabled=true;
  showToast('Preparing your report on this device…');
  try{
    var model=reportModel(),blob=await docx.Packer.toBlob(StrategyDocx.document(model,docx,OregonStrategyTemplate));
    var url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=StrategyDocx.filename(model.metadata);document.body.appendChild(a);a.click();a.remove();
    setTimeout(function(){URL.revokeObjectURL(url)},60000);showToast('DOCX download requested — group consensus only.');
  }catch(e){showToast('DOCX export failed or is blocked here. Use Copy Draft to preserve consensus.');}
  finally{exportInProgress=false;els.exportWordBtn.disabled=els.exportTopBtn.disabled=false}
}
function legacyCopy(text){
  var previousFocus=document.activeElement;
  var ta=document.createElement('textarea');
  ta.value=text;
  ta.setAttribute('readonly','');
  ta.style.position='fixed';
  ta.style.opacity='0';
  document.body.appendChild(ta);
  ta.select();
  var ok=false;
  try{ok=document.execCommand('copy')}catch(e){}
  ta.remove();
  if(previousFocus&&previousFocus.isConnected)previousFocus.focus();
  return ok;
}
function copyText(text,btn,label){
  function done(ok){
    if(ok){
      setText(btn,'Copied');
      showToast('Copied to clipboard');
      setTimeout(function(){setText(btn,label)},1100);
    }else{
      showToast('Copy blocked — select the text and copy manually');
    }
  }
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){done(true)},function(){done(legacyCopy(text))});
  }else{
    done(legacyCopy(text));
  }
}
function copyRichText(html,text,btn,label){
  function fallback(){copyText(text,btn,label)}
  if(window.ClipboardItem&&navigator.clipboard&&navigator.clipboard.write){
    var item;
    try{
      item=new ClipboardItem({
        'text/html':new Blob([html],{type:'text/html'}),
        'text/plain':new Blob([text],{type:'text/plain'})
      });
    }catch(e){fallback();return}
    navigator.clipboard.write([item]).then(function(){
      setText(btn,'Copied');
      showToast('Copied formatted draft to clipboard');
      setTimeout(function(){setText(btn,label)},1100);
    },fallback);
  }else{
    fallback();
  }
}

function showToast(m){
  setText(els.toast,m);
  els.toast.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t=setTimeout(function(){els.toast.classList.remove('show')},2400);
}

/* --- Reset --- */
function doReset(){
  var fresh=WorkshopState.defaults();
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(fresh));storageBlocked=false;storageOk=true;setText(els.saveStatus,'Workspace cleared')}
  catch(e){showToast('Browser storage could not be cleared. Reset was not completed.');return}
  clearTimeout(flashSave.t);state=fresh.phases;reportMetadata=fresh.metadata;current=1;timerSeconds=480;stopTimer(false);
  render();renderReportDetails();els.phaseTitle.focus();showToast('Refresh workspace cleared. Original V1 and V2 data preserved.');
}
els.resetBtn.addEventListener('click',function(){
  if(typeof els.resetDialog.showModal==='function'){
    els.resetDialog.returnValue='';
    els.resetDialog.showModal();
  }else if(window.confirm('Reset all workshop notes?')){
    doReset();
  }
});
els.resetDialog.addEventListener('close',function(){
  if(els.resetDialog.returnValue==='confirm')doReset();
});

/* --- Wiring --- */
els.contextInput.addEventListener('input',function(e){
  state[current].context=e.target.value;
  els.promptText.textContent=phase().prompt(e.target.value.trim()||'[Insert '+phase().label+']');
  save();
});
els.notesInput.addEventListener('input',function(e){state[current].notes=e.target.value;save()});
els.consensusInput.addEventListener('input',function(e){
  state[current].consensus=e.target.value;
  setText(els.phasePill,e.target.value.trim()?'Captured':'Not captured');
  save();
});
els.copyPromptBtn.addEventListener('click',function(e){copyText(els.promptText.textContent,e.currentTarget,'Copy Prompt')});
els.copyDraftBtn.addEventListener('click',function(e){copyRichText(draftHtml(),plainText(),e.currentTarget,'Copy Draft')});
els.exportWordBtn.addEventListener('click',exportWord);
els.exportTopBtn.addEventListener('click',exportWord);
els.nextBtn.addEventListener('click',nextPhase);
els.nextTopBtn.addEventListener('click',nextPhase);
els.prevBtn.addEventListener('click',prevPhase);
els.prevTopBtn.addEventListener('click',prevPhase);
els.timerBtn.addEventListener('click',toggleTimer);
els.focusBtn.addEventListener('click',function(e){
  var on=document.body.classList.toggle('focus-mode');
  e.currentTarget.setAttribute('aria-pressed',String(on));
  setText(e.currentTarget,on?'Show Draft':'Focus Mode');
  showToast(on?'Draft panel hidden':'Draft panel shown');
});

function renderReportDetails(){
  var labels={agency:'Agency name',title:'Report title',version:'Strategy version',date:'Workshop date'};
  $('reportFields').innerHTML=Object.keys(labels).map(function(k){return '<label for="report-'+k+'">'+labels[k]+'<input id="report-'+k+'" type="'+(k==='date'?'date':'text')+'" data-report="'+k+'" value="'+esc(reportMetadata[k])+'"></label>'}).join('');
}
$('reportFields').addEventListener('input',function(e){if(e.target.dataset.report){reportMetadata[e.target.dataset.report]=e.target.value;save()}});
buildTabs();updateTimerReadout();renderReportDetails();render();
if(loaded.migrated){save();showToast('Your V1 workshop has been copied here. The original remains unchanged.');}
