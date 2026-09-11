#!/usr/bin/env node
// Inventory and editorial triage, not a clinical correctness score.
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
function inventory(root = ROOT) {
  const articles = walk(path.join(root, 'docs')).filter(p => /\.mdx?$/.test(p) && !path.basename(p).startsWith('_')).map(file => {
    const raw = fs.readFileSync(file, 'utf8');
    const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '';
    const field = name => fm.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.replace(/^["']|["']$/g, '');
    const parts = raw.replace(/^---[\s\S]*?---/, '').split(/^## (?:\d+\.\s*)?References\s*$/m);
    const prose = parts[0];
    const refs = [...raw.matchAll(/<a\s+id=["'](ref\d+)["']/g)].map(m => m[1]);
    const footnotes = [...raw.matchAll(/^\[\^([^\]]+)\]:/gm)].map(m => m[1]);
    const unlinkedBibliographyEntries = !refs.length && !footnotes.length ? ([...((parts[1] || '').matchAll(/^\d+\.\s/gm))].length) : 0;
    const images = [...raw.matchAll(/!\[([^\]]*)\]\((\/img\/[^)\s]+)\)/g)].map(m => ({ alt: m[1], asset: m[2], exists: fs.existsSync(path.join(root, 'static', m[2])) }));
    const rel = path.relative(root, file);
    const landing = path.basename(file) === 'index.mdx' || /hide_title:\s*true/.test(fm);
    const profile = rel.includes('/07-roots/surgeons/');
    return {
      file: rel, section: rel.split('/')[1], title: field('title') || path.basename(file),
      kind: profile ? 'profile' : landing ? 'landing/database' : 'article',
      wordsBeforeReferences: (prose.match(/\b[\p{L}\p{N}][\p{L}\p{N}'-]*\b/gu) || []).length,
      references: new Set([...refs, ...footnotes]).size,
      unlinkedBibliographyEntries,
      doiLinks: new Set([...raw.matchAll(/https?:\/\/(?:dx\.)?doi\.org\/([^\s)"<>]+)/g)].map(m => m[1].toLowerCase())).size,
      lastReviewed: field('lastReviewed') || null, reviewer: field('reviewer') || null,
      evidenceUpdated: field('evidenceUpdated') || null,
      figures: images, decisionTrees: (raw.match(/<DecisionTree\b/g) || []).length,
      videos: /<VideoCards\b/.test(raw),
      stub: /\*Stub\s*—\s*to be built out|\*Coming soon\./i.test(raw),
    };
  });
  const clinical = articles.filter(a => a.kind === 'article' && /^0[1-5]-/.test(a.section));
  const sections = [...new Set(articles.map(a => a.section))].sort().map(section => {
    const pages = articles.filter(a => a.section === section);
    const clinicalPages = clinical.filter(a => a.section === section);
    return { section, pages: pages.length, clinicalArticles: clinicalPages.length,
      reviewed: clinicalPages.filter(a => a.lastReviewed).length,
      references: pages.reduce((n, a) => n + a.references, 0),
      withFigures: pages.filter(a => a.figures.length).length,
      withDecisionTrees: pages.filter(a => a.decisionTrees).length };
  });
  return { generatedAt: new Date().toISOString(), methodology: 'All documentation source files. Heuristic counts, not a verification of clinical claims, citation accuracy, or diagram anatomy. Reference counts are page-local, not globally unique papers.',
    summary: { pages: articles.length, clinicalArticles: clinical.length,
      clinicalReviewDateMissing: clinical.filter(a => !a.lastReviewed).length,
      clinicalArticlesWithoutStructuredReferences: clinical.filter(a => !a.references).length,
      clinicalArticlesWithUnlinkedBibliography: clinical.filter(a => a.unlinkedBibliographyEntries).length,
      clinicalArticlesWithFigures: clinical.filter(a => a.figures.length).length,
      clinicalArticlesWithDecisionTrees: clinical.filter(a => a.decisionTrees).length,
      referenceEntries: articles.reduce((n, a) => n + a.references, 0),
      missingLocalImages: articles.flatMap(a => a.figures.filter(f => !f.exists).map(f => ({file:a.file, asset:f.asset}))),
      emptyAltText: articles.flatMap(a => a.figures.filter(f => !f.alt.trim()).map(f => ({file:a.file, asset:f.asset}))) },
    sections, priorityReviewCandidates: clinical.filter(a => !a.stub && a.wordsBeforeReferences >= 500 && a.references < 6).sort((a,b) => a.references-b.references || b.wordsBeforeReferences-a.wordsBeforeReferences), articles };
}
if (require.main === module) {
  const result = inventory();
  const outIndex = process.argv.indexOf('--out');
  if (outIndex !== -1) {
    const out = process.argv[outIndex + 1];
    if (!out || out.startsWith('--')) throw new Error('--out requires a path');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify(result, null, 2) + '\n');
  }
  console.log(JSON.stringify({summary: result.summary, sections: result.sections, priorityReviewCandidates: result.priorityReviewCandidates.map(a=>({file:a.file,words:a.wordsBeforeReferences,references:a.references}))}, null, 2));
}
module.exports = { inventory };
