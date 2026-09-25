/* Maintainer-only packaging. Checked-in index.html runs by itself without this script. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function read(p){return fs.readFileSync(path.join(root,p),'utf8').replace(/\r\n/g,'\n')}
function data(p,mime){return 'data:'+mime+';base64,'+fs.readFileSync(path.join(root,p)).toString('base64')}
function script(p){return read(p).replace(/<\/script/gi,'<\\/script')}
function render(){
 let css=read('assets/styles.css').replace(/url\('brand\/([^']+)'\)/g,(_,file)=>'url("'+data('assets/brand/'+file,'font/ttf')+'")');
 let html=read('src/index.template.html').replace('<!-- INLINE_STYLE -->',()=>'<style>\n'+css+'\n</style>').replaceAll('@@LOGO@@',data('assets/brand/eis-logo.png','image/png'));
 const files=['assets/vendor/docx-9.6.1.iife.js','templates/oregon-strategy.js','assets/docx-export.js','assets/workshop-state.js','assets/report-content.js','assets/phases.js','assets/app.js'];
 html=html.replace('<!-- INLINE_SCRIPTS -->',()=>files.map(p=>'<script>\n'+script(p)+'\n</script>').join('\n'));
 const notices=['assets/vendor/docx-LICENSE','assets/vendor/THIRD-PARTY-NOTICES.txt','assets/brand/Inter-OFL.txt'].map(p=>p+'\n'+read(p)).join('\n\n');
 html=html.replace('</head>',()=>'<script type="text/plain" id="third-party-licenses">\n'+notices.replace(/<\/script/gi,'<\\/script')+'\n</script>\n</head>');
 return html;
}
if(require.main===module){const output=render();for(const name of ['index.html','ai-strategy-socratic-sandbox.aspx'])fs.writeFileSync(path.join(root,name),output);console.log('Packaged standalone HTML/ASPX: '+Buffer.byteLength(output)+' bytes each; no runtime asset files.')}
module.exports={render};
