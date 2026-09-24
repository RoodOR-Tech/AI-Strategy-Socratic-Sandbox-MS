const test=require('node:test');
const assert=require('node:assert/strict');
const S=require('../assets/state.js');
test('fresh state is independent and contains ten phases and optional metadata',()=>{
  const a=S.defaults(),b=S.defaults();a.phases[1].capture.field0='Decision';
  assert.equal(Object.keys(a.phases).length,10);assert.equal(b.phases[1].capture.field0,undefined);
  assert.equal(a.metadata.title,'AI Adoption Strategy');assert.equal(a.synthesis.priorities.length,3);
});
test('roundtrip preserves Unicode, notes, approval and roadmap',()=>{
  const a=S.defaults();a.metadata.agency='Oregon & 公共';a.phases[5].notes='PRIVATE';a.phases[5].capture.field0='Human decision';a.phases[5].approved=true;a.synthesis.priorities[0].owner='CIO';
  assert.deepEqual(S.normalize(JSON.parse(JSON.stringify(a))),a);
});
test('load validates types, schema and unsafe fields without importing V1',()=>{
  assert.throws(()=>S.normalize({schemaVersion:1}));
  const raw=S.defaults();raw.metadata.agency={bad:true};raw.phases[1].capture=JSON.parse('{"__proto__":"bad","field0":"ok","extra":"no"}');raw.phases[1].approved='true';
  const a=S.normalize(raw);assert.equal(a.metadata.agency,'');assert.deepEqual(a.phases[1].capture,{field0:'ok'});assert.equal(a.phases[1].approved,false);
  assert.ok(S.load({getItem:()=>'{broken'},'v2').error);
  assert.ok(S.load({getItem:()=>{throw Error('Denied')}},'v2').error);
  assert.equal(S.load({getItem:()=>null},'v2').error,null);
  const empty=S.defaults();empty.phases[1].approved=true;empty.synthesis.approved=true;
  assert.equal(S.normalize(empty).phases[1].approved,false);assert.equal(S.normalize(empty).synthesis.approved,false);
});
