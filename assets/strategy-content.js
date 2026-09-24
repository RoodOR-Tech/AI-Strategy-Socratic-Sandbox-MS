/* Single approval boundary shared by preview, clipboard and DOCX export. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.StrategyContent=factory()})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function blocks(value){return value.replace(/\r\n?/g,'\n').split('\n').filter(function(s){return s.trim()}).map(function(s){var bullet=/^\s*[-*•]\s+/.test(s);return {bullet:bullet,text:s.replace(/^\s*[-*•]\s+/,'').trim()}})}
  function model(state,phases){
    return {metadata:Object.assign({},state.metadata),sections:phases.map(function(p){
      var section=state.phases[p.id];return {id:p.id,title:p.title,approved:section.approved,fields:section.approved?p.fields.filter(function(f){return (section.capture[f.key]||'').trim()}).map(function(f){return {label:f.label,blocks:blocks(section.capture[f.key])}}):[]};
    }),priorities:state.synthesis.approved?state.synthesis.priorities.filter(function(p){return Object.keys(p).some(function(k){return p[k].trim()})}).map(function(p){return Object.assign({},p)}):[]};
  }
  var metaLabels={version:'Version',date:'Workshop date',facilitator:'Facilitator',participants:'Participants / functions',agencyPlan:'Agency strategic plan',itPlan:'IT strategic plan'};
  var priorityLabels={action:'Immediate next action',owner:'Accountable owner',dependency:'Major dependency',timeframe:'Target timeframe',risks:'Unresolved decisions / risks'};
  function blockHtml(list){var result='',listOpen=false;list.forEach(function(b){if(b.bullet&&!listOpen){result+='<ul>';listOpen=true}if(!b.bullet&&listOpen){result+='</ul>';listOpen=false}result+=b.bullet?'<li>'+esc(b.text)+'</li>':'<p>'+esc(b.text)+'</p>'});return result+(listOpen?'</ul>':'')}
  function html(m,preview){
    var out='<div class="document-cover"><p>'+esc(m.metadata.agency)+'</p><h3>'+esc(m.metadata.title.trim()||'AI Adoption Strategy')+'</h3>';
    Object.keys(metaLabels).forEach(function(k){if(m.metadata[k].trim())out+='<p><strong>'+metaLabels[k]+':</strong> '+esc(m.metadata[k])+'</p>'});out+='</div>';
    m.sections.forEach(function(s){out+='<article class="draft-section"><h3>'+s.id+'. '+esc(s.title)+'</h3>';s.fields.forEach(function(f){out+='<h4>'+esc(f.label)+'</h4>'+blockHtml(f.blocks)});if(preview&&!s.fields.length)out+='<p class="small">No approved content yet.</p>';out+='</article>'});
    if(m.priorities.length){out+='<article class="draft-section"><h3>Implementation Priorities</h3>';m.priorities.forEach(function(p,i){out+='<h4>'+esc(p.priority||'Priority '+(i+1))+'</h4>';Object.keys(priorityLabels).forEach(function(k){if(p[k].trim())out+='<p><strong>'+priorityLabels[k]+'</strong></p>'+blockHtml(blocks(p[k]))})});out+='</article>'}return out;
  }
  function text(m){var out=[m.metadata.agency,m.metadata.title.trim()||'AI Adoption Strategy'];Object.keys(metaLabels).forEach(function(k){if(m.metadata[k].trim())out.push(metaLabels[k]+': '+m.metadata[k])});m.sections.forEach(function(s){out.push('',s.id+'. '+s.title);s.fields.forEach(function(f){out.push(f.label);f.blocks.forEach(function(b){out.push((b.bullet?'• ':'')+b.text)})})});if(m.priorities.length){out.push('','Implementation Priorities');m.priorities.forEach(function(p,i){out.push('',p.priority||'Priority '+(i+1));Object.keys(priorityLabels).forEach(function(k){if(p[k].trim())out.push(priorityLabels[k]+': '+p[k])})})}return out.join('\n')}
  return {model:model,html:html,text:text,blocks:blocks,metaLabels:metaLabels,priorityLabels:priorityLabels};
});
