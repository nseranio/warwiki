#!/usr/bin/env node
'use strict';
// Optional read-only network check. Never rewrites evidence or publishes clinical advice.
const registry = require('../src/data/evidence-registry.json');

function inspectMetadata(record, result) {
  const errors = [];
  if (!result || String(result.doi).toLowerCase() !== record.source.doi.toLowerCase()) errors.push('DOI identity not confirmed');
  const notices = (result?.commentCorrectionList?.commentCorrection || []).filter(item => /erratum|correct|retract|concern/i.test(item.type));
  const retracted = (result?.pubTypeList?.pubType || []).some(item => /retracted|retraction/i.test(item)) || notices.some(item => /retract|concern/i.test(item.type));
  if (retracted) errors.push('Retraction or concern metadata requires editorial reassessment');
  if (notices.length && record.correction.status === 'not-identified') errors.push('New correction metadata requires review');
  return {id: record.id, doi: result?.doi || null, pmid: result?.id || null, title: result?.title || null, firstPublicationDate: result?.firstPublicationDate || null, notices, errors};
}

async function main() {
  const checks = [];
  for (const record of registry.records) {
    const query = new URL('https://www.ebi.ac.uk/europepmc/webservices/rest/search');
    query.search = new URLSearchParams({query: `DOI:"${record.source.doi}"`, format: 'json', resultType: 'core', pageSize: '10'}).toString();
    try {
      const response = await fetch(query, {signal: AbortSignal.timeout(20000)});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const result = data.resultList?.result?.find(item => String(item.doi).toLowerCase() === record.source.doi.toLowerCase() && item.source === 'MED');
      checks.push({...inspectMetadata(record, result), metadataUrl: query.toString()});
    } catch (error) {
      checks.push({id: record.id, errors: [`Source check unavailable: ${error.message}`], metadataUrl: query.toString()});
    }
  }
  console.log(JSON.stringify({checkedAt: new Date().toISOString().slice(0, 10), scope: 'Europe PMC indexed DOI identity and linked correction/retraction metadata only; not an exhaustive publisher/Crossmark review or clinical verification.', checks}, null, 2));
  if (checks.some(item => item.errors.length)) process.exitCode = 1;
}
if (require.main === module) main();
module.exports = {inspectMetadata};
