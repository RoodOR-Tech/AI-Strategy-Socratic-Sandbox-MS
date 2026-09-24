/* Only human consensus and optional report identification enter the output model. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.ReportContent=factory()})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function blocks(v){return v.replace(/\r\n?/g,'\n').split('\n').filter(function(s){return s.trim()}).map(function(s){return {bullet:/^\s*[-*•]\s+/.test(s),text:s.replace(/^\s*[-*•]\s+/,'').trim()}})}
  function model(state,phases){return {metadata:Object.assign({},state.metadata),sections:phases.map(function(p){var c=state.phases[p.id].consensus;return {id:p.id,title:p.title,fields:c.trim()?[{label:'',blocks:blocks(c)}]:[]}}),priorities:[]}}
  function blockHtml(list){var out='',open=false;list.forEach(function(b){if(b.bullet&&!open){out+='<ul>';open=true}if(!b.bullet&&open){out+='</ul>';open=false}out+=b.bullet?'<li>'+esc(b.text)+'</li>':'<p>'+esc(b.text)+'</p>'});return out+(open?'</ul>':'')}
  function html(m,preview,current){var titleTag=preview?'h3':'h1',sectionTag=preview?'h3':'h2';var out='<div class="document-cover">'+(m.metadata.agency.trim()?'<p>'+esc(m.metadata.agency)+'</p>':'')+'<'+titleTag+'>'+esc(m.metadata.title.trim()||'AI Adoption Strategy')+'</'+titleTag+'>';
    ['version','date'].forEach(function(k){if(m.metadata[k].trim())out+='<p>'+ (k==='version'?'Version: ':'Workshop date: ')+esc(m.metadata[k])+'</p>'});out+='</div>';
    m.sections.forEach(function(s){out+='<article class="draft-section'+(s.id===current?' current':'')+'"><'+sectionTag+'>'+s.id+'. '+esc(s.title)+'</'+sectionTag+'>';s.fields.forEach(function(f){out+=blockHtml(f.blocks)});if(preview&&!s.fields.length)out+='<p class="small">Awaiting group consensus.</p>';out+='</article>'});return out}
  function text(m){var out=[m.metadata.agency,m.metadata.title.trim()||'AI Adoption Strategy'];if(m.metadata.version.trim())out.push('Version: '+m.metadata.version);if(m.metadata.date.trim())out.push('Workshop date: '+m.metadata.date);m.sections.forEach(function(s){out.push('',s.id+'. '+s.title);s.fields.forEach(function(f){f.blocks.forEach(function(b){out.push((b.bullet?'• ':'')+b.text)})})});return out.join('\n')}
  return {model:model,html:html,text:text,blocks:blocks};
});
