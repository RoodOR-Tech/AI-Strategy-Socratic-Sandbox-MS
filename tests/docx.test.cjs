const test=require('node:test'),assert=require('node:assert/strict');
const E=require('../assets/docx-export.js');
test('filename strips unsafe characters, bounds length, keeps Unicode and normalizes version',()=>{
 const name=E.filename({agency:'../Agency: <Demo>/\\?*"| & 公共 '.repeat(20),version:'v2.1'});
 assert.ok(name.endsWith('-v2.1.docx'));assert.ok(!/[<>:"/\\|?*]/.test(name));assert.ok(name.length<150);assert.ok(E.filename({agency:'',version:''}).startsWith('Agency-'));
});
test('XML-invalid controls and isolated surrogates never enter OOXML',()=>{
 assert.equal(E.clean('A\u0000B\u000bC\ud800D & <é> 😀'),'ABCD & <é> 😀');
});
