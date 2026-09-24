/* Pure, browser/Node-compatible V2 state model. No network or DOM dependencies. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.SandboxState=factory();
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  var VERSION=2;
  var metadataKeys=['agency','title','version','date','facilitator','participants','agencyPlan','itPlan'];
  var priorityKeys=['priority','action','owner','dependency','timeframe','risks'];
  function priority(){return {priority:'',action:'',owner:'',dependency:'',timeframe:'',risks:''}}
  function defaults(){
    var phases={};
    for(var i=1;i<=10;i++)phases[i]={context:'',notes:'',discussion:'',capture:{},approved:false};
    return {schemaVersion:VERSION,appVersion:'2.0.0',metadata:{agency:'',title:'AI Adoption Strategy',version:'1.0',date:'',facilitator:'',participants:'',agencyPlan:'',itPlan:''},phases:phases,synthesis:{priorities:[priority(),priority(),priority()],approved:false}};
  }
  function record(value){return value!==null&&typeof value==='object'&&!Array.isArray(value)}
  function strings(target,source,keys){
    if(!record(source))return;
    keys.forEach(function(k){if(typeof source[k]==='string')target[k]=source[k]});
  }
  function normalize(raw){
    if(!record(raw)||raw.schemaVersion!==VERSION)throw new Error('Unsupported workshop schema');
    var out=defaults();
    strings(out.metadata,raw.metadata,metadataKeys);
    if(record(raw.phases))for(var i=1;i<=10;i++){
      var src=raw.phases[i],dst=out.phases[i];
      if(!record(src))continue;
      strings(dst,src,['context','notes','discussion']);
      if(record(src.capture))Object.keys(src.capture).forEach(function(k){
        if(/^field[0-3]$/.test(k)&&typeof src.capture[k]==='string')dst.capture[k]=src.capture[k];
      });
      dst.approved=src.approved===true;
    }
    if(record(raw.synthesis)){
      if(Array.isArray(raw.synthesis.priorities)){
        out.synthesis.priorities=raw.synthesis.priorities.slice(0,5).map(function(p){var dst=priority();strings(dst,p,priorityKeys);return dst});
        while(out.synthesis.priorities.length<3)out.synthesis.priorities.push(priority());
      }
      out.synthesis.approved=raw.synthesis.approved===true;
    }
    return out;
  }
  function load(storage,key){
    try{var raw=storage.getItem(key);return {state:raw===null?defaults():normalize(JSON.parse(raw)),error:null}}
    catch(error){return {state:defaults(),error:error}}
  }
  function hasCapture(p){return Object.keys(p.capture).some(function(k){return p.capture[k].trim()})}
  return {defaults:defaults,normalize:normalize,load:load,priority:priority,hasCapture:hasCapture,metadataKeys:metadataKeys,priorityKeys:priorityKeys};
});
