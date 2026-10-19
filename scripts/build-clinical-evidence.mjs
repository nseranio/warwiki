import {readFile, readdir, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const dir = resolve(import.meta.dirname, '../src/data/clinical-evidence');
const files = (await readdir(resolve(dir, 'trials'))).filter(name => name.endsWith('.json')).sort();
const trials = await Promise.all(files.map(async name => {
  const trial = JSON.parse(await readFile(resolve(dir, 'trials', name), 'utf8'));
  return {...trial, reports: trial.reports.map(report => ({
    ...report, source: {...report.source, file: null},
  }))};
}));
await writeFile(resolve(dir, 'trials.generated.json'), JSON.stringify(trials, null, 2) + '\n');
const events = JSON.parse(await readFile(resolve(dir, 'events.json'), 'utf8'))
  .map(({privateLocator, ...event}) => event);
await writeFile(resolve(dir, 'events.generated.json'), JSON.stringify(events, null, 2) + '\n');
console.log(`Built clinical-evidence aggregate: ${trials.length} trials.`);
