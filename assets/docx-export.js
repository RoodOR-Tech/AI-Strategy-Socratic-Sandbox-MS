(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.StrategyDocx=factory()})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  // Remove XML 1.0-invalid controls and repair isolated UTF-16 surrogates.
  function clean(value){return Array.from(String(value)).map(function(c){var n=c.codePointAt(0);return (n===9||n===10||n===13||(n>=32&&n<=0xd7ff)||(n>=0xe000&&n<=0xfffd)||(n>=0x10000&&n<=0x10ffff))?c:''}).join('')}
  function filename(metadata){
    function part(value,fallback,max){var p=clean(value).normalize('NFC').replace(/[<>:"/\\|?*\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/g,'').replace(/\s+/g,'-').replace(/^[. -]+|[. -]+$/g,'');return Array.from(p||fallback).slice(0,max).join('')}
    return part(metadata.agency,'Agency',80)+'-AI-Adoption-Strategy-v'+part(metadata.version.replace(/^v(?=\d)/i,''),'1.0',20)+'.docx';
  }
  function document(model,d,t,generated){
    var date=(generated||new Date()).toISOString().slice(0,10);
    function para(text,options){var config=Object.assign({},options||{}),run=config.run||{};delete config.run;config.children=[new d.TextRun(Object.assign({text:clean(text)},run))];return new d.Paragraph(config)}
    function blocks(list){return list.map(function(b){return para(b.text,b.bullet?{numbering:{reference:'strategy-bullets',level:0}}:{})})}
    function heading(text,level,options){return para(text,Object.assign({heading:level,keepNext:true},options||{}))}
    var title=model.metadata.title.trim()||'AI Adoption Strategy';
    var content=[];
    if(model.metadata.agency.trim())content.push(para(model.metadata.agency,{spacing:{before:960,after:240},run:{size:28}}));
    content.push(heading(title,d.HeadingLevel.TITLE,{spacing:{before:240,after:360}}));
    Object.keys(t.identificationLabels).forEach(function(k){if(model.metadata[k].trim())content.push(para(t.identificationLabels[k]+': '+model.metadata[k]))});
    content.push(para('Generated '+date+' · Socratic Sandbox '+t.version,{spacing:{before:360,after:120},run:{size:18,color:'525B62'}}));
    model.sections.forEach(function(s,i){
      content.push(heading(s.id+'. '+s.title,d.HeadingLevel.HEADING_1,{pageBreakBefore:i===0,keepNext:s.fields.length>0}));
      s.fields.forEach(function(f){content.push(heading(f.label,d.HeadingLevel.HEADING_2));content.push.apply(content,blocks(f.blocks))});
    });
    if(model.priorities.length){
      content.push(heading(t.roadmapTitle,d.HeadingLevel.HEADING_1));
      model.priorities.forEach(function(p,i){
        content.push(heading(p.priority.trim()||'Priority '+(i+1),d.HeadingLevel.HEADING_2));
        var labels={action:'Immediate next action',owner:'Accountable owner',dependency:'Major dependency',timeframe:'Target timeframe',risks:'Unresolved decisions / risks'};
        Object.keys(labels).forEach(function(k){if(p[k].trim()){
          var lines=p[k].replace(/\r\n?/g,'\n').split('\n').filter(function(s){return s.trim()}).map(function(s){return {bullet:/^\s*[-*•]\s+/.test(s),text:s.replace(/^\s*[-*•]\s+/,'').trim()}});
          if(!lines[0].bullet){content.push(new d.Paragraph({children:[new d.TextRun({text:labels[k]+': ',bold:true}),new d.TextRun(clean(lines.shift().text))],spacing:{after:100}}));}
          else content.push(para(labels[k],{keepNext:true,spacing:{before:100,after:60},run:{bold:true}}));
          content.push.apply(content,blocks(lines));
        }});
      });
    }
    return new d.Document({
      creator:clean(model.metadata.agency.trim())||'Agency workshop',title:clean(title),description:'Agency AI Adoption Strategy',
      styles:{default:{document:{run:{font:t.font,size:t.bodySize,color:t.bodyColor},paragraph:{spacing:{after:t.paragraphAfter,line:t.line},widowControl:true}},title:{run:{font:t.headingFont,size:t.titleSize,color:'000000'},paragraph:{keepNext:true}},heading1:{run:{font:t.headingFont,size:t.heading1Size,color:t.headingColor},paragraph:{spacing:{before:280,after:160},keepNext:true}},heading2:{run:{font:t.headingFont,size:t.heading2Size,color:t.headingColor},paragraph:{spacing:{before:180,after:100},keepNext:true}}}},
      numbering:{config:[{reference:'strategy-bullets',levels:[{level:0,format:d.LevelFormat.BULLET,text:'•',alignment:d.AlignmentType.LEFT,style:{paragraph:{indent:{left:360,hanging:180}}}}]}]},
      sections:[{properties:{page:{size:{width:t.page.width,height:t.page.height},margin:t.page.margin}},
        footers:{default:new d.Footer({children:[new d.Paragraph({children:[new d.TextRun({text:'Generated '+date+' · V'+t.version+'  |  Page ',size:16,color:'525B62'}),new d.TextRun({children:[d.PageNumber.CURRENT],size:16,color:'525B62'})],alignment:d.AlignmentType.RIGHT})]})},children:content}]
    });
  }
  return {document:document,filename:filename,clean:clean};
});
