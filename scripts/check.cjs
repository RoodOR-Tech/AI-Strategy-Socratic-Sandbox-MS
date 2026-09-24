const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');assert.equal(html,fs.readFileSync('ai-strategy-socratic-sandbox.aspx','utf8'),'SharePoint copy differs');
for(const match of html.matchAll(/(?:src|href)="((?:assets|templates)\/[^"#]+)"/g))assert.ok(fs.existsSync(match[1]),'Missing '+match[1]);
for(const dir of ['assets','templates'])for(const file of fs.readdirSync(dir))if(file.endsWith('.js'))new vm.Script(fs.readFileSync(dir+'/'+file,'utf8'),{filename:file});
const hash=crypto.createHash('sha256').update(fs.readFileSync('assets/vendor/docx-9.6.1.iife.js')).digest('hex');
assert.equal(hash,'ecef72931c98461fc327aa6e95867820aced5db4c3d971ac5ad38ccda21dd360');
for(const file of ['assets/app.js','assets/state.js','assets/strategy-content.js','assets/docx-export.js'])assert.ok(!/\b(?:fetch\s*\(|XMLHttpRequest\b|sendBeacon\b|WebSocket\b)/.test(fs.readFileSync(file,'utf8')),'Unexpected network code: '+file);
console.log('Syntax, asset references, SharePoint parity, dependency checksum and no-network source checks passed.');
