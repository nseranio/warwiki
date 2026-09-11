const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { identifiers, citationUnits, auditReferences } = require('../audit-references');

test('normalizes DOI case/encoding/parentheses and PMID forms without conflating the namespaces', () => {
  assert.deepEqual(identifiers('[doi](https://doi.org/10.1016%2FS0022-5347(01)00001-1). DOI:10.1016/S0022-5347(01)00001-1; PMID: 12345. https://www.ncbi.nlm.nih.gov/pubmed/12345/ https://pubmed.ncbi.nlm.nih.gov/12345/').map(r => r.key), ['doi:10.1016/s0022-5347(01)00001-1', 'pmid:12345']);
  assert.deepEqual(identifiers('https://doi.org/not-a-doi https://pubmed.ncbi.nlm.nih.gov/?term=12345 PMID 0'), []);
});
test('bibliography parsing keeps separate references and multiline footnotes separate', () => {
  const units = citationUnits('1. Clinical step\n## References\n<a id="ref1"></a>1. Authors. Title. doi:10.1000/one\n\n<a id="ref2"></a>2. Other. Second.\n PMID: 12345\n## Other\n[^x]: Citation.\n doi:10.1000/three');
  assert.equal(units.length, 3);
  assert.equal(units[0].anchor, 'ref1');
  assert.equal(units[1].anchor, 'ref2');
  assert.equal(units[2].anchor, 'fn-x');
  assert.equal(identifiers(units[0].text).length, 1);
  assert.equal(identifiers(units[1].text)[0].key, 'pmid:12345');
});
test('inventory is deterministic and maps reuse, differing titles, companions, and short pages without merging', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'warwiki-refs-'));
  try {
    const dir = path.join(root, 'docs/04-surgical-techniques');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'a.mdx'), '---\ntitle: Named Technique\n---\n## References\n<a id="ref1"></a>1. Author A. "A study about stress urinary incontinence." *J Urol.* doi:10.1000/Test PMID:12345');
    fs.writeFileSync(path.join(dir, 'b.mdx'), '---\ntitle: Named Technique\n---\n## References\n<a id="ref1"></a>1. Author B. "An unrelated topic about renal cancer survival." *J Urol.* [DOI](https://doi.org/10.1000/test)');
    const report = auditReferences(root);
    assert.deepEqual(report, auditReferences(root));
    assert.equal(report.summary.identifiers, 2);
    assert.equal(report.summary.identifiersOnMultiplePages, 1);
    assert.equal(report.summary.suspectedTitleConflicts, 1);
    assert.equal(report.sameTitlePages.length, 1);
    assert.equal(report.shortTechniqueCandidates.length, 2);
    assert.equal(report.identifiers[0].dependentPages.length, 2);
    assert.deepEqual(report.identifiers[0].coCitedIdentifiers, ['pmid:12345']);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
