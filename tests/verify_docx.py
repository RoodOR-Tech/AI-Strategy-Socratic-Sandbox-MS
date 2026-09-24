"""Standard-library OOXML package validation for browser-generated QA fixtures."""
from zipfile import ZipFile
from xml.etree import ElementTree as ET
from pathlib import Path
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
files=list(Path('test-results').glob('*.docx'))
assert files, 'Run browser tests first'
for file in files:
    with ZipFile(file) as z:
        assert z.testzip() is None
        for name in z.namelist():
            if name.endswith(('.xml','.rels')): ET.fromstring(z.read(name))
        root=ET.fromstring(z.read('word/document.xml'))
        text='\n'.join(n.text or '' for n in root.findall('.//w:t',ns))
        assert 'SECRET_' not in text
        assert 'Awaiting' not in text and 'No approved' not in text
        for i in range(1,11): assert f'{i}. ' in text
        full=file.stem.endswith(('complete','edge'))
        headings=root.findall('.//w:pPr/w:pStyle',ns)
        assert sum(n.get('{'+ns['w']+'}val')=='Heading1' for n in headings)==(11 if full else 10)
        if full:
            assert 'Implementation Priorities' in text
            assert root.findall('.//w:numPr',ns)
        else: assert 'Implementation Priorities' not in text
        if file.stem.endswith('edge'): assert 'café 公共 😀 & < > "' in text
        size=root.find('.//w:pgSz',ns)
        assert size.get('{'+ns['w']+'}w')=='12240'
        assert size.get('{'+ns['w']+'}h')=='15840'
        assert '[Content_Types].xml' in z.namelist()
        print(file.name,'valid OOXML; headings, approval boundary, metadata and page geometry passed')
