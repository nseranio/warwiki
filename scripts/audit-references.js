#!/usr/bin/env node
// Source-only editorial inventory. Identifier reuse and title similarity are
// review signals, not proof that papers or articles are duplicates/correct.
const fs = require('node:fs');
const path = require('node:path');
const { inventory } = require('./audit-content');
const { extractUrls } = require('./check-external-links');
const ROOT = path.resolve(__dirname, '..');

function identifiers(text) {
  const found = new Map();
  function add(kind, value) {
    if (kind === 'doi') {
      try { value = decodeURIComponent(value); } catch { /* Preserve malformed source for review. */ }
      value = value.trim().replace(/[.,;:]+$/, '').toLowerCase();
      if (!/^10\.\d{4,9}\/.+/.test(value)) return;
    } else {
      value = value.replace(/^0+/, '');
      if (!/^[1-9]\d{0,8}$/.test(value)) return;
    }
    found.set(`${kind}:${value}`, { key: `${kind}:${value}`, kind, value,
      url: kind === 'doi' ? `https://doi.org/${value}` : `https://pubmed.ncbi.nlm.nih.gov/${value}/` });
  }
  for (const raw of extractUrls(text)) {
    let url;
    try { url = new URL(raw); } catch { continue; }
    if (/^(?:dx\.)?doi\.org$/i.test(url.hostname)) add('doi', url.pathname.slice(1));
    if (/^(?:www\.)?pubmed\.ncbi\.nlm\.nih\.gov$/i.test(url.hostname)) {
      const id = url.pathname.match(/^\/(\d+)\/?$/)?.[1];
      if (id) add('pmid', id);
    }
    if (/^(?:www\.)?ncbi\.nlm\.nih\.gov$/i.test(url.hostname)) {
      const id = url.pathname.match(/^\/pubmed\/(\d+)\/?$/)?.[1];
      if (id) add('pmid', id);
    }
  }
  for (const m of text.matchAll(/\bPMID\s*:?\s*(\d+)\b/gi)) add('pmid', m[1]);
  // Bare DOI labels are common in older bibliography entries. Balanced DOI
  // parentheses follow the same extraction rule as linked DOI destinations.
  for (const m of text.matchAll(/\bdoi\s*:\s*(10\.\d{4,9}\/[^\s<>"\[\]]+)/gi)) {
    const url = extractUrls(`https://doi.org/${m[1]}`)[0];
    if (url) add('doi', url.slice('https://doi.org/'.length));
  }
  return [...found.values()].sort((a, b) => a.key.localeCompare(b.key));
}
function normalizeTitle(title) {
  return title.toLowerCase().normalize('NFKD').replace(/\p{M}/gu, '').replace(/&(?:amp;)?/g, ' and ').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
function candidateTitle(text) {
  const clean = text.replace(/<[^>]*>/g, '').replace(/^\s*(?:\d+\.|\[\^[^\]]+\]:)\s*/, '');
  const quoted = clean.match(/[“"]([^”"\n]{20,})[”"]/);
  if (quoted) return { text: quoted[1].replace(/\.$/, ''), extraction: 'quoted' };
  const journal = clean.search(/\s\*[^*]+\*/);
  if (journal === -1) return null;
  const beforeJournal = clean.slice(0, journal).replace(/^.*?\.\s+/, '').replace(/\*|\[|\]/g, '').trim().replace(/\.$/, '');
  if (beforeJournal.split(/\s+/).length < 4 || /https?:|doi:|PMID/i.test(beforeJournal)) return null;
  return { text: beforeJournal, extraction: 'before-italic-journal' };
}
function citationUnits(raw) {
  const lines = raw.split(/\r?\n/);
  const units = [];
  let current = null;
  let inReferences = false;
  function flush() { if (current) units.push(current); current = null; }
  lines.forEach((line, index) => {
    if (/^#{1,6}\s/.test(line)) {
      flush();
      if (/\bReferences\b/i.test(line)) inReferences = true;
      else if (/^#{1,2}\s/.test(line)) inReferences = false;
    }
    const anchor = line.match(/^\s*<a\s+id=["']([^"']+)["'][^>]*>\s*<\/a>\s*(?:[A-Z]*\d+\.)?/)?.[1];
    const footnote = line.match(/^\s*\[\^([^\]]+)\]:/)?.[1];
    const numbered = inReferences && /^\s*\d+\.\s/.test(line);
    if (anchor || footnote || numbered) {
      flush();
      current = { line: index + 1, anchor: anchor || (footnote ? `fn-${footnote}` : null), text: line, bibliography: true };
    } else if (current) current.text += `\n${line}`;
    else if (identifiers(line).length) units.push({ line: index + 1, anchor: null, text: line, bibliography: false });
  });
  flush();
  return units;
}
function distinctTitles(occurrences) {
  const titles = new Map();
  for (const o of occurrences) if (o.title) {
    const key = normalizeTitle(o.title.text);
    if (!titles.has(key)) titles.set(key, { title: o.title.text, files: [] });
    if (!titles.get(key).files.includes(o.file)) titles.get(key).files.push(o.file);
  }
  return [...titles.entries()].sort(([a], [b]) => a.localeCompare(b));
}
function significantlyDifferent(a, b) {
  const aTokens = new Set(a.split(' ').filter(w => w.length > 2));
  const bTokens = new Set(b.split(' ').filter(w => w.length > 2));
  if (Math.min(aTokens.size, bTokens.size) < 4) return false;
  const shared = [...aTokens].filter(w => bTokens.has(w)).length;
  return shared / Math.min(aTokens.size, bTokens.size) < 0.85 && shared / new Set([...aTokens, ...bTokens]).size < 0.5;
}
function auditReferences(root = ROOT) {
  const content = inventory(root);
  const records = new Map();
  let unitsWithIdentifiers = 0;
  for (const article of [...content.articles].sort((a, b) => a.file.localeCompare(b.file))) {
    const raw = fs.readFileSync(path.join(root, article.file), 'utf8');
    for (const unit of citationUnits(raw)) {
      const ids = identifiers(unit.text);
      if (!ids.length) continue;
      unitsWithIdentifiers++;
      for (const id of ids) {
        if (!records.has(id.key)) records.set(id.key, { ...id, occurrences: [], coCitedIdentifiers: new Set() });
        const record = records.get(id.key);
        record.occurrences.push({ file: article.file, line: unit.line, anchor: unit.anchor,
          ...(unit.bibliography && candidateTitle(unit.text) ? { title: candidateTitle(unit.text) } : {}) });
        // Co-citation is recorded without asserting DOI/PMID identity. Bad
        // source metadata must not silently merge two different publications.
        if (unit.bibliography) for (const peer of ids) if (peer.key !== id.key) record.coCitedIdentifiers.add(peer.key);
      }
    }
  }
  const identifiersList = [...records.values()].sort((a, b) => a.key.localeCompare(b.key)).map(r => ({ ...r,
    dependentPages: [...new Set(r.occurrences.map(o => o.file))].sort(),
    coCitedIdentifiers: [...r.coCitedIdentifiers].sort() }));
  const suspectedTitleConflicts = identifiersList.flatMap(r => {
    const titles = distinctTitles(r.occurrences);
    return titles.some(([a], i) => titles.slice(i + 1).some(([b]) => significantlyDifferent(a, b)))
      ? [{ identifier: r.key, url: r.url, dependentPages: r.dependentPages, titles: titles.map(([, value]) => value) }] : [];
  }).sort((a, b) => b.dependentPages.length - a.dependentPages.length || a.identifier.localeCompare(b.identifier));
  const pageTitles = new Map();
  for (const article of content.articles.filter(a => a.kind === 'article' && /^0[1-5]-/.test(a.section))) {
    const title = normalizeTitle(article.title);
    if (!pageTitles.has(title)) pageTitles.set(title, []);
    pageTitles.get(title).push(article.file);
  }
  const sameTitlePages = [...pageTitles.entries()].filter(([, files]) => files.length > 1).sort(([a], [b]) => a.localeCompare(b)).map(([normalizedTitle, files]) => ({ normalizedTitle, files: files.sort() }));
  const shortTechniqueCandidates = content.articles.filter(a => a.section === '04-surgical-techniques' && a.kind === 'article' && a.wordsBeforeReferences < 350)
    .map(a => ({ file: a.file, title: a.title, words: a.wordsBeforeReferences, references: a.references, stub: a.stub }))
    .sort((a, b) => a.words - b.words || a.file.localeCompare(b.file));
  return { schemaVersion: 1,
    methodology: 'Deterministic source inventory, not a metadata or clinical verification. DOI case and URL encoding and PMID forms are normalized. Counts are identifiers, not unique papers: a DOI and PMID are kept separate; co-citation does not establish identity. Title extraction/similarity, matching page titles, and short techniques are editorial review signals only. No articles are merged or modified.',
    summary: { pages: content.articles.length, citationUnitsWithIdentifiers: unitsWithIdentifiers, identifiers: identifiersList.length,
      doi: identifiersList.filter(r => r.kind === 'doi').length, pmid: identifiersList.filter(r => r.kind === 'pmid').length,
      identifiersOnMultiplePages: identifiersList.filter(r => r.dependentPages.length > 1).length,
      suspectedTitleConflicts: suspectedTitleConflicts.length, sameTitlePageGroups: sameTitlePages.length,
      shortTechniqueCandidates: shortTechniqueCandidates.length },
    suspectedTitleConflicts, sameTitlePages, shortTechniqueCandidates, identifiers: identifiersList };
}
function markdownReport(report) {
  const lines = ['# Reference and duplicate-topic review inventory', '', report.methodology, '',
    `Scanned ${report.summary.pages} pages: ${report.summary.doi} DOI identifiers and ${report.summary.pmid} PMID identifiers; ${report.summary.identifiersOnMultiplePages} identifiers occur on multiple pages.`, '',
    `The complete JSON holds dependent-page/line mappings. The ${report.summary.suspectedTitleConflicts} suspected title inconsistencies require checking publisher/PubMed metadata before changing prose or identifiers. This report shows the first 30, ordered by number of dependent pages.`, '', '## Suspected inconsistent citation titles', ''];
  for (const conflict of report.suspectedTitleConflicts.slice(0, 30)) {
    lines.push(`- [${conflict.identifier}](${conflict.url}) — ${conflict.dependentPages.length} dependent pages. ${conflict.titles.map(t => `“${t.title}” (${t.files[0]}${t.files.length > 1 ? `; +${t.files.length - 1} pages` : ''})`).join('; ')}`);
  }
  lines.push('', '## Matching article titles', '', 'Matching titles can be intentional companions; decide the canonical role and cross-link before considering a merge.', '');
  for (const group of report.sameTitlePages) lines.push(`- ${group.normalizedTitle}: ${group.files.join('; ')}`);
  lines.push('', '## Short named-technique candidates', '', `${report.summary.shortTechniqueCandidates} technique articles have fewer than 350 source words before References (including MDX markup). The first 40 follow. Decide whether each merits expansion, a useful concise technique, or a parent-page section; word count alone is not a quality score.`, '');
  for (const page of report.shortTechniqueCandidates.slice(0, 40)) lines.push(`- ${page.file}: ${page.words} source words; ${page.references} structured references${page.stub ? '; explicitly marked stub' : ''}.`);
  return `${lines.join('\n')}\n`;
}
if (require.main === module) {
  const args = process.argv.slice(2);
  const report = auditReferences();
  for (const [option, value] of [['--out', JSON.stringify(report, null, 2) + '\n'], ['--markdown', markdownReport(report)]]) {
    const index = args.indexOf(option);
    if (index !== -1) {
      const output = args[index + 1];
      if (!output || output.startsWith('--')) throw new Error(`${option} requires a path`);
      fs.mkdirSync(path.dirname(output), { recursive: true });
      fs.writeFileSync(output, value);
    }
  }
  console.log(JSON.stringify(report.summary, null, 2));
}
module.exports = { identifiers, candidateTitle, citationUnits, auditReferences, markdownReport };
