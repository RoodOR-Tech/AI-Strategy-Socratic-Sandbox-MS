const test=require('node:test'),assert=require('node:assert/strict');
const S=require('../assets/workshop-state.js'),R=require('../assets/report-content.js'),phases=require('../assets/phases.js');
test('report contains consensus directly but never local context or AI scratchpad',()=>{
 const s=S.defaults();s.phases[1]={context:'PRIVATE_CONTEXT',notes:'PRIVATE_AI',consensus:'Human decision & <safe>\n- First safeguard\n- Second safeguard'};const m=R.model(s,phases);assert.equal(m.sections.length,10);assert.equal(m.priorities.length,0);assert.ok(!JSON.stringify(m).includes('PRIVATE_'));assert.ok(R.html(m).includes('&amp; &lt;safe&gt;'));assert.ok(R.html(m).includes('<ul>'));assert.ok(R.text(m).includes('Human decision & <safe>'));assert.ok(!R.html(m).includes('Awaiting'));
});
test('the original ten exercises retain guidance cards, chips and guardrails',()=>{
 assert.equal(phases.length,10);phases.forEach(p=>{assert.equal(p.media.length,3);assert.equal(p.chips.length,3);assert.ok(p.prompt('Agency context').includes('Agency context'));assert.ok(p.prompt('Context').includes('Distinguish facts from assumptions'));assert.equal(p.fields,undefined)});assert.ok(phases[4].prompt('data').includes('do not invent'));assert.ok(phases[3].prompt('intake').includes('NIST AI RMF'));
});
