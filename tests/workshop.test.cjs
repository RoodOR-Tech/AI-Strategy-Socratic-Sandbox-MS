const test=require('node:test'),assert=require('node:assert/strict');
const S=require('../assets/workshop-state.js');
test('V1-shaped phases are independent and defaults contain no workflow gates',()=>{
 const a=S.defaults(),b=S.defaults();a.phases[1].consensus='Human decision';assert.equal(b.phases[1].consensus,'');assert.equal(Object.keys(a.phases).length,10);assert.equal(a.synthesis,undefined);assert.equal(a.phases[1].approved,undefined);
});
test('refresh state roundtrips and validates types',()=>{
 const a=S.defaults();a.phases[5]={context:'Sensitive data types',notes:'PRIVATE',consensus:'Café & 公共 <safe>'};a.metadata.agency='Agency';assert.deepEqual(S.normalize(JSON.parse(JSON.stringify(a))),a);
 a.phases[1].consensus={bad:true};a.metadata.agency=[];const b=S.normalize(a);assert.equal(b.phases[1].consensus,'');assert.equal(b.metadata.agency,'');assert.throws(()=>S.normalize({schemaVersion:2}));
});
test('safe V1 copying preserves original data and explicit empty reset prevents reimport',()=>{
 const old=JSON.stringify({1:{context:'Original context',notes:'AI notes',consensus:'Original decision'}}),values={v1:old};const storage={getItem:k=>values[k]??null};let r=S.load(storage,'refresh','v1');assert.equal(r.migrated,true);assert.equal(r.state.phases[1].consensus,'Original decision');assert.equal(values.v1,old);
 values.refresh=JSON.stringify(S.defaults());r=S.load(storage,'refresh','v1');assert.equal(r.migrated,false);assert.equal(r.state.phases[1].consensus,'');assert.equal(values.v1,old);
});
test('corrupt and unavailable storage never throws into the UI',()=>{
 assert.ok(S.load({getItem:()=>'{broken'},'refresh','v1').error);assert.ok(S.load({getItem:()=>{throw Error('denied')}},'refresh','v1').error);assert.equal(S.load({getItem:()=>null},'refresh','v1').error,null);
});
