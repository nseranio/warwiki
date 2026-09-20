#!/usr/bin/env node
'use strict';

/**
 * Reject a known editorial regression: public pages replaced by notices that
 * useful content was removed simply because its sources were not adjudicated.
 * This is a narrow prose check, not a completeness or clinical-accuracy check.
 */
const fs = require('node:fs');
const path = require('node:path');

function publicProse(content) {
  return content
    .replace(/^\uFEFF?---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
    .replace(/<!--[^]*?-->/g, '')
    .replace(/\{\/\*[^]*?\*\/\}/g, '')
    .replace(/^([ \t]*)(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\2[^\n]*(?:\n|$)/gm, '');
}

function checkContent(content) {
  const prose = publicProse(content);
  const issues = [];
  if (/\bremoved[-_ ]unadjudicated[-_ ]details\b/i.test(prose)) {
    issues.push('Public page contains a removed-unadjudicated-details placeholder.');
  }

  for (const paragraph of prose.split(/\n\s*\n/)) {
    const text = paragraph.replace(/[*_`]/g, '').replace(/\s+/g, ' ');
    const editorialSubject = /\b(?:the |this |these |inherited |previous )?(?:page|content|details|information|instructions)\b/i.test(text);
    const removal = /\b(?:have been removed|has been removed|was removed|were removed|(?:content|details|information|instructions) (?:removed|withheld)|not retained|not restored)\b/i.test(text);
    const unreviewedReason = /\b(?:unadjudicated|unverified|not (?:re[- ]?)?adjudicated|not (?:fully )?verified|not (?:fully )?reviewed|pending (?:full[- ]text |source |evidence )?review|lack(?:ing)? (?:of )?(?:clinical trials?|randomized trials?|RCTs))\b/i.test(text);

    if (editorialSubject && removal && unreviewedReason) {
      issues.push('Public page contains a blanket content-removal notice based on unreviewed sources. Restore useful material and correct specific claims.');
      break;
    }
  }
  return issues;
}

function listMdx(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? listMdx(file) : entry.name.endsWith('.mdx') ? [file] : [];
  }).sort();
}

function main() {
  const root = path.resolve(__dirname, '..');
  const files = listMdx(path.join(root, 'docs'));
  const problems = files.flatMap(file => checkContent(fs.readFileSync(file, 'utf8'))
    .map(issue => `${path.relative(root, file)}: ${issue}`));
  if (problems.length) {
    console.error(`✗ Content preservation: ${problems.length} issue(s):\n${problems.join('\n')}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ Content preservation: ${files.length} MDX files, no blanket-removal notices.`);
  }
}

if (require.main === module) main();
module.exports = {checkContent};
