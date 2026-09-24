'use strict';


var STORAGE_KEY='ai-strategy-socratic-sandbox-v2:'+location.pathname;
var APP_NAME='AI Strategy Socratic Sandbox';
var current=1,timerSeconds=480,timerHandle=null,storageOk=true;

function $(id){return document.getElementById(id)}
var els={};
['phaseTabs','phasePanel','phaseKicker','phaseTitle','phaseCopy','phasePill','phaseProgressLabel','saveStatus','progressBar','sideProgressBar','timerBtn','timerReadout','huddleHint','discussionQuestion','contextLabelText','contextInput','contextHint','mediaGrid','promptText','notesInput','captureFields','approveSection','discussionInput','progressText','draftScroll','toast','resetDialog','copyPromptBtn','copyDraftBtn','exportWordBtn','exportTopBtn','nextBtn','nextTopBtn','prevBtn','prevTopBtn','focusBtn','resetBtn'].forEach(function(id){els[id]=$(id)});

var reducedMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');

function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function setText(el,txt){if(el.textContent!==txt)el.textContent=txt}
function phase(){return phases.find(function(p){return p.id===current})}

function defaults(){return SandboxState.defaults()}
var loaded=SandboxState.load({getItem:function(key){return localStorage.getItem(key)}},STORAGE_KEY);
var state=loaded.state;
var storageBlocked=!!loaded.error;
if(storageBlocked){storageOk=false;setText(els.saveStatus,'Saved workspace could not be loaded. Reset to start fresh; existing storage has not been overwritten.')}
function save(){
  if(storageBlocked){renderDraft();return}
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    flashSave();
  }catch(e){
    if(storageOk){storageOk=false;setText(els.saveStatus,'Autosave unavailable — copy or export your draft before closing')}
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
    var id=+t.dataset.phase,selected=id===current,captured=state.phases[id].approved;
    t.setAttribute('aria-selected',selected?'true':'false');
    t.tabIndex=selected?0:-1;
    t.dataset.captured=captured;
    var p=phases[id-1];
    t.setAttribute('aria-label','Phase '+p.id+': '+p.short+(captured?', captured':', not captured'));
  });
}

function render(){
  var p=phase(),s=state.phases[current];
  updateTabs();
  els.phasePanel.setAttribute('aria-labelledby','tab-'+p.id);
  document.title='Phase '+p.id+': '+p.title+' — '+APP_NAME;
  setText(els.phaseKicker,'Phase '+p.id+' / '+p.exercise);
  setText(els.phaseTitle,p.title);
  setText(els.phaseCopy,p.copy);
  setText(els.phasePill,s.approved?'Approved for strategy':SandboxState.hasCapture(s)?'Needs review':'Not started');
  setText(els.huddleHint,'Exercise: '+p.exercise);
  setText(els.discussionQuestion,p.discussion);
  setText(els.contextLabelText,p.label);
  setText(els.contextHint,p.placeholder);
  els.contextInput.value=s.context;
  els.promptText.textContent=p.prompt(s.context.trim()||'[Insert '+p.label+']');
  els.discussionInput.value=s.discussion;
  els.approveSection.checked=s.approved;
  els.captureFields.innerHTML=p.fields.map(function(f){return '<label for="capture-'+f.key+'">'+esc(f.label)+'</label><textarea id="capture-'+f.key+'" data-capture="'+f.key+'" aria-describedby="captureHint">'+esc(s.capture[f.key]||'')+'</textarea>'}).join('');
  els.notesInput.value=s.notes||'';
  els.mediaGrid.innerHTML=p.media.map(function(x){
    return '<li class="media"><b><span class="icon" aria-hidden="true">'+esc(x[0])+'</span>'+esc(x[1])+'</b><span>'+esc(x[2])+'</span></li>';
  }).join('');
  renderDraft();
}

function renderDraft(){
  var captured=phases.filter(function(p){return state.phases[p.id].approved}).length;
  var pct=Math.round(captured/phases.length*100);
  setText(els.progressText,captured+' of '+phases.length+' sections approved.');
  setText(els.phaseProgressLabel,'Workshop progress: '+captured+' of '+phases.length+' approved');
  els.progressBar.style.width=pct+'%';
  els.sideProgressBar.style.width=pct+'%';
  els.draftScroll.innerHTML=draftHtml(true);
  updateTabs();
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
  else if(opts.focusHeading){els.phaseTitle.focus()}
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
function strategyModel(){return StrategyContent.model(state,phases)}
function plainText(){return StrategyContent.text(strategyModel())}
function draftHtml(preview){return StrategyContent.html(strategyModel(),!!preview)}
function wordDocument(){
  return '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">'
    +'<head><meta charset="utf-8"><title>Agency AI Adoption Strategy Workshop Capture</title>'
    +'<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->'
    +'<style>'
    +'body{font-family:Calibri,Arial,sans-serif;font-size:11pt;color:#182330}'
    +'h1{font-size:20pt;color:#102b48}'
    +'h2{font-size:14pt;color:#17375f;margin-top:18pt}'
    +'p{line-height:1.4}'
    +'</style></head><body>'+draftHtml()+'</body></html>';
}
function exportWord(){
  try{
    var blob=new Blob([wordDocument()],{type:'application/msword'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url;
    a.download='agency-ai-strategy-workshop-capture.doc';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function(){URL.revokeObjectURL(url)},2000);
    showToast('Draft exported as Word document');
  }catch(e){
    showToast('Download blocked here — use Copy Draft instead');
  }
}
function legacyCopy(text){
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
  try{localStorage.removeItem(STORAGE_KEY);storageBlocked=false;storageOk=true;setText(els.saveStatus,'Workspace cleared')}catch(e){showToast('Browser storage could not be cleared. Reset was not completed.');return}
  state=defaults();
  current=1;
  timerSeconds=480;
  stopTimer(false);
  render();
  showToast('All workshop notes cleared');
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
  state.phases[current].context=e.target.value;
  els.promptText.textContent=phase().prompt(e.target.value.trim()||'[Insert '+phase().label+']');
  save();
});
els.notesInput.addEventListener('input',function(e){state.phases[current].notes=e.target.value;save()});
els.discussionInput.addEventListener('input',function(e){state.phases[current].discussion=e.target.value;save()});
els.captureFields.addEventListener('input',function(e){
  if(!e.target.dataset.capture)return;
  state.phases[current].capture[e.target.dataset.capture]=e.target.value;
  state.phases[current].approved=false;
  els.approveSection.checked=false;
  setText(els.phasePill,'Needs review');save();
});
els.approveSection.addEventListener('change',function(e){
  var s=state.phases[current];
  if(e.target.checked&&!SandboxState.hasCapture(s)){e.target.checked=false;showToast('Capture at least one human decision before approving.');return}
  s.approved=e.target.checked;setText(els.phasePill,s.approved?'Approved for strategy':'Needs review');save();
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
  setText(e.currentTarget,on?'Show Draft':'Focus Mode');
  showToast(on?'Draft panel hidden':'Draft panel shown');
});

buildTabs();
updateTimerReadout();
render();
