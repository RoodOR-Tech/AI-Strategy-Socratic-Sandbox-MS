from zipfile import ZipFile
from xml.etree import ElementTree as E
from pathlib import Path
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
files=list(Path('test-results').glob('*-refresh-*.docx'))
assert files, 'Run browser tests first'
for f in files:
 with ZipFile(f) as z:
  assert z.testzip() is None
  for name in z.namelist():
   if name.endswith(('.xml','.rels')): E.fromstring(z.read(name))
  root=E.fromstring(z.read('word/document.xml'));text='\n'.join(n.text or '' for n in root.findall('.//w:t',ns))
  assert 'PRIVATE_' not in text and 'Awaiting' not in text and 'Implementation Priorities' not in text
  headings=root.findall('.//w:pPr/w:pStyle',ns)
  assert sum(n.get('{'+ns['w']+'}val')=='Heading1' for n in headings)==10
  for i in range(1,11):assert f'{i}. ' in text
  if f.stem.endswith(('complete','partial','edge')):assert root.findall('.//w:numPr',ns)
  if f.stem.endswith('edge'):assert 'café 公共 😀 & < > "' in text
  if f.stem.endswith('offline'):assert 'Offline human decision' in text
  print(f.name,'valid OOXML, ten headings, consensus-only content')
