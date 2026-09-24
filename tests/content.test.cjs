const test=require('node:test'),assert=require('node:assert/strict');
const S=require('../assets/state.js'),C=require('../assets/strategy-content.js'),phases=require('../assets/phases.js');
test('only approved human decisions enter all output formats',()=>{
 const s=S.defaults();s.phases[1].context='SECRET CONTEXT';s.phases[1].notes='SECRET AI';s.phases[1].discussion='SECRET DISCUSSION';s.phases[1].capture.field0='Decision & <safe>';s.phases[2].capture.field0='UNAPPROVED';s.phases[1].approved=true;
 const m=C.model(s,phases),html=C.html(m),text=C.text(m);
 assert.equal(m.sections.length,10);assert.ok(html.includes('Decision &amp; &lt;safe&gt;'));assert.ok(text.includes('Decision & <safe>'));assert.ok(!JSON.stringify(m).match(/SECRET|UNAPPROVED/));
});
test('bullets, multiline and all ten prompt guardrails',()=>{
 assert.deepEqual(C.blocks('Paragraph\r\n- One\n• Two'),[{bullet:false,text:'Paragraph'},{bullet:true,text:'One'},{bullet:true,text:'Two'}]);
 phases.forEach(p=>{assert.ok(p.prompt('context').includes('Distinguish facts from assumptions'));assert.ok(p.fields.length<=4)});
 assert.ok(!phases[4].prompt('context').includes('trace the exact path'));assert.ok(phases[3].prompt('context').includes('NIST AI RMF'));
});
