'use strict';


var STORAGE_KEY='ai-strategy-socratic-sandbox-v2:'+location.pathname;
var APP_NAME='AI Strategy Socratic Sandbox';
var currentView='setup';
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
    t.setAttribute('aria-label','Phase '+p.id+': '+p.short+(captured?', approved':', not approved'));
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
  setText($('nextCaptureBtn'),current===10?'Continue to Strategy Synthesis':'Continue to next section');
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
  showView('phase',false);
  current=Math.min(phases.length,Math.max(1,id));
  stopTimer(false);
  timerSeconds=480;
  updateTimerReadout();
  render();
  window.scrollTo({top:0,behavior:reducedMotion&&reducedMotion.matches?'auto':'smooth'});
  if(opts.focusTab){$('tab-'+current).focus()}
  else if(!opts.focusHeading){els.phaseTitle.focus()}
  else if(opts.focusHeading){els.phaseTitle.focus()}
}
function nextPhase(){if(currentView==='synthesis'||(currentView==='phase'&&current===10)){showView('synthesis',true);return}setPhase(currentView==='setup'?1:current+1,{focusHeading:true})}
function prevPhase(){if(currentView==='synthesis'){setPhase(10,{focusHeading:true});return}if(currentView==='setup'||current===1)showView('setup',true);else setPhase(current-1,{focusHeading:true})}

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
var exportInProgress=false;
async function exportWord(){
  if(exportInProgress)return;
  exportInProgress=true;
  var buttons=[els.exportWordBtn,els.exportTopBtn,$('exportSynthesisBtn')];
  buttons.forEach(function(b){b.disabled=true});showToast('Preparing DOCX on this device…');
  try{
    var model=strategyModel();
    var blob=await docx.Packer.toBlob(StrategyDocx.document(model,docx,OregonStrategyTemplate));
    var url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=StrategyDocx.filename(model.metadata);document.body.appendChild(a);a.click();a.remove();
    setTimeout(function(){URL.revokeObjectURL(url)},60000);
    showToast('DOCX download requested — approved strategy content only.');
  }catch(e){showToast('DOCX export failed or is blocked here. Use Copy Draft to preserve approved content.');}
  finally{exportInProgress=false;buttons.forEach(function(b){b.disabled=false})}
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
  renderMetadata();showView('setup',true);
  showToast('All V2 workshop data cleared; V1 storage preserved');
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

var metadataLabels={agency:'Agency name',title:'Strategy title',version:'Strategy version',date:'Workshop date',facilitator:'Facilitator',participants:'Participants or participating functions',agencyPlan:'Agency strategic-plan reference',itPlan:'IT strategic-plan reference'};
function renderMetadata(){
  $('metadataFields').innerHTML=SandboxState.metadataKeys.map(function(k){return '<label for="meta-'+k+'">'+metadataLabels[k]+'<input id="meta-'+k+'" type="'+(k==='date'?'date':'text')+'" data-meta="'+k+'" value="'+esc(state.metadata[k])+'"></label>'}).join('');
}
function showView(view,focus){
  currentView=view;stopTimer(false);
  $('setupPanel').hidden=view!=='setup';
  $('synthesisPanel').hidden=view!=='synthesis';
  $('synthesisBtn').setAttribute('aria-pressed',String(view==='synthesis'));
  if(view==='synthesis'){renderSynthesis();document.title='Strategy synthesis — '+APP_NAME;if(focus)$('synthesisTitle').focus()}
  els.phaseTabs.hidden=view!=='phase';els.phasePanel.hidden=view!=='phase';
  $('setupBtn').setAttribute('aria-pressed',String(view==='setup'));
  if(view==='setup'){document.title='Workshop setup — '+APP_NAME;if(focus)$('setupTitle').focus()}
}
$('metadataFields').addEventListener('input',function(e){if(e.target.dataset.meta){state.metadata[e.target.dataset.meta]=e.target.value;save()}});
$('setupBtn').addEventListener('click',function(){showView('setup',true)});
$('synthesisBtn').addEventListener('click',function(){showView('synthesis',true)});
$('nextCaptureBtn').addEventListener('click',nextPhase);
$('reviewSectionsBtn').addEventListener('click',function(){setPhase(1,{focusHeading:true})});
$('exportSynthesisBtn').addEventListener('click',exportWord);
function priorityHasContent(p){return SandboxState.priorityKeys.some(function(k){return p[k].trim()})}
function synthesisStatus(){
  var count=state.synthesis.priorities.filter(priorityHasContent).length;
  $('approveSynthesis').checked=state.synthesis.approved;
  setText($('synthesisStatus'),count+' priorities drafted · '+(state.synthesis.approved?'Approved for strategy':'Needs group review')+(count<3?' · Aim for 3–5 priorities.':''));
  $('addPriorityBtn').disabled=state.synthesis.priorities.length>=5;
}
function renderSynthesis(){
  var labels=Object.assign({priority:'Strategic priority'},StrategyContent.priorityLabels);
  $('priorityFields').innerHTML=state.synthesis.priorities.map(function(p,i){return '<details class="card priority-card"'+(i===0?' open':'')+'><summary id="priority-summary-'+i+'">Priority '+(i+1)+(p.priority.trim()?' — '+esc(p.priority):'')+'</summary><div class="card-body">'+SandboxState.priorityKeys.map(function(k){return '<label for="priority-'+i+'-'+k+'">'+labels[k]+'<textarea rows="2" id="priority-'+i+'-'+k+'" data-priority="'+i+'" data-key="'+k+'">'+esc(p[k])+'</textarea></label>'}).join('')+(i>=3?'<button type="button" class="btn ghost" data-remove="'+i+'">Remove priority '+(i+1)+'</button>':'')+'</div></details>'}).join('');
  synthesisStatus();
}
$('priorityFields').addEventListener('input',function(e){
  if(e.target.dataset.priority===undefined)return;
  var i=Number(e.target.dataset.priority),k=e.target.dataset.key;
  state.synthesis.priorities[i][k]=e.target.value;state.synthesis.approved=false;
  if(k==='priority')setText($('priority-summary-'+i),'Priority '+(i+1)+(e.target.value.trim()?' — '+e.target.value:''));
  synthesisStatus();save();
});
$('priorityFields').addEventListener('click',function(e){
  if(e.target.dataset.remove===undefined)return;
  var i=Number(e.target.dataset.remove);
  if(priorityHasContent(state.synthesis.priorities[i])&&!window.confirm('Remove this priority and its captured action details?'))return;
  state.synthesis.priorities.splice(i,1);state.synthesis.approved=false;renderSynthesis();save();$('addPriorityBtn').focus();
});
$('addPriorityBtn').addEventListener('click',function(){
  if(state.synthesis.priorities.length>=5)return;
  state.synthesis.priorities.push(SandboxState.priority());state.synthesis.approved=false;renderSynthesis();save();
  var card=$('priorityFields').lastElementChild;card.open=true;card.querySelector('textarea').focus();
});
$('approveSynthesis').addEventListener('change',function(e){
  if(e.target.checked&&!state.synthesis.priorities.some(priorityHasContent)){e.target.checked=false;showToast('Capture a priority or next action before approving.');return}
  state.synthesis.approved=e.target.checked;synthesisStatus();save();
});
$('beginBtn').addEventListener('click',function(){setPhase(1,{focusHeading:true})});
buildTabs();updateTimerReadout();render();renderMetadata();showView('setup',false);
