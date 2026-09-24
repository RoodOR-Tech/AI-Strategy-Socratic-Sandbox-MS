/* V1 interaction model with isolated refresh storage and safe one-time V1 copying. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.WorkshopState=factory()})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function defaults(){var phases={};for(var i=1;i<=10;i++)phases[i]={context:'',notes:'',consensus:''};return {schemaVersion:'1.1',appVersion:'1.1.0',metadata:{agency:'',title:'AI Adoption Strategy',version:'1.0',date:'',facilitator:'',participants:'',agencyPlan:'',itPlan:''},phases:phases}}
  function record(v){return v!==null&&typeof v==='object'&&!Array.isArray(v)}
  function copyPhases(target,source){if(!record(source))throw Error('Invalid workshop data');for(var i=1;i<=10;i++){if(!record(source[i]))continue;['context','notes','consensus'].forEach(function(k){if(typeof source[i][k]==='string')target[i][k]=source[i][k]})}}
  function normalize(raw){if(!record(raw)||raw.schemaVersion!=='1.1')throw Error('Unsupported refresh schema');var result=defaults();copyPhases(result.phases,raw.phases);if(record(raw.metadata))Object.keys(result.metadata).forEach(function(k){if(typeof raw.metadata[k]==='string')result.metadata[k]=raw.metadata[k]});return result}
  function load(storage,key,v1key){try{var raw=storage.getItem(key);if(raw!==null)return {state:normalize(JSON.parse(raw)),error:null,migrated:false};var fresh=defaults(),old=storage.getItem(v1key);if(old!==null){copyPhases(fresh.phases,JSON.parse(old));return {state:fresh,error:null,migrated:true}}return {state:fresh,error:null,migrated:false}}catch(error){return {state:defaults(),error:error,migrated:false}}}
  return {defaults:defaults,normalize:normalize,load:load};
});
