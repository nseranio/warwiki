// Lists every link the automatic first-mention linker (plugins/autolink) would add.
//   node scripts/autolink-report.mjs [--json out.json] [--term "WATER"] [--page docs/...mdx]
// Use it before changing src/data/autolink.json: check a new alias, or find a term that links where it should not.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {createProcessor} from '@mdx-js/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import {VFile} from 'vfile';

const require = createRequire(import.meta.url);
const remarkAutolink = require('../plugins/autolink/remark-autolink.js');
const {buildRegistry} = require('../plugins/autolink/terms.js');

const args = process.argv.slice(2);
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : null);
const root = process.cwd();
const docsDir = path.join(root, 'docs');
const registry = buildRegistry(docsDir, path.join(root, 'src/data/autolink.json'));
const rows = [];
const processor = createProcessor({
  remarkPlugins: [remarkFrontmatter, remarkGfm, remarkDirective, [remarkAutolink, {siteDir: root, registry, report: (r) => rows.push(r)}]],
});

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (/\.mdx?$/.test(e.name)) files.push(full);
  }
})(docsDir);

const onlyPage = opt('--page');
let failed = 0;
for (const file of files) {
  if (onlyPage && path.resolve(onlyPage) !== file) continue;
  try {
    const vfile = new VFile({path: file, value: fs.readFileSync(file, 'utf8')});
    await processor.run(processor.parse(vfile), vfile);
  } catch (err) {
    failed += 1;
    console.error(`could not parse ${path.relative(root, file)}: ${String(err.message).split('\n')[0]}`);
  }
}

const term = opt('--term');
const shown = term ? rows.filter((r) => r.term === term) : rows;
if (opt('--json')) fs.writeFileSync(opt('--json'), JSON.stringify(rows));
const pages = new Set(rows.map((r) => r.file));
const byTerm = new Map();
for (const r of rows) byTerm.set(r.term, (byTerm.get(r.term) || 0) + 1);
console.log(`${registry.entries.length} terms; ${rows.length} links on ${pages.size} of ${files.length} pages (${failed} pages not parsed)`);
if (term || onlyPage) for (const r of shown) console.log(`${path.relative(root, r.file)}\n   …${r.context}…  ->  ${r.url}`);
else console.log([...byTerm.entries()].sort((a, b) => b[1] - a[1]).slice(0, 60).map(([t, n]) => `${n}\t${t}`).join('\n'));
