import {describe, expect, it} from 'vitest';
import path from 'path';
import fs from 'fs';
import os from 'os';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const remarkAutolink = require('../../plugins/autolink/remark-autolink.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {buildRegistry} = require('../../plugins/autolink/terms.js');

type Node = {type: string; value?: string; url?: string; depth?: number; children?: Node[]};
const text = (value: string): Node => ({type: 'text', value});
const para = (...children: Node[]): Node => ({type: 'paragraph', children});
const links = (n: Node, out: Node[] = []): Node[] => {
  if (n.type === 'link') out.push(n);
  (n.children || []).forEach((c) => links(c, out));
  return out;
};

describe('automatic first-mention linker', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'autolink-'));
  const docs = path.join(dir, 'docs');
  const write = (rel: string, title: string) => {
    const f = path.join(docs, rel);
    fs.mkdirSync(path.dirname(f), {recursive: true});
    fs.writeFileSync(f, `---\ntitle: ${title}\n---\n\n# ${title}\n`);
    return f;
  };
  const ecoin = write('01-foundations/devices/ecoin.mdx', 'eCoin');
  write('04-surgical-techniques/procedures/sacral-neuromodulation.mdx', 'Sacral Neuromodulation');
  write('06-clinical-evidence/studies/water.mdx', 'WATER');
  write('01-foundations/anatomy/bladder.mdx', 'The Bladder');
  const trial = write('06-clinical-evidence/studies/ecoin-pivotal.mdx', 'eCoin pivotal study');
  const config = path.join(dir, 'autolink.json');
  fs.writeFileSync(config, JSON.stringify({
    aliases: {Intibia: '/docs/foundations/devices/ecoin'},
    exclude: ['Bladder'],
  }));
  const run = (tree: Node, file = trial) => {
    remarkAutolink({siteDir: dir, docsDir: docs, config})(tree, {path: file, data: {}, value: ''});
    return tree;
  };

  it('links the first mention only, keeping the words as written', () => {
    const tree = run({type: 'root', children: [para(text('The eCoin device and sacral neuromodulation; eCoin again.'))]});
    const found = links(tree);
    expect(found.map((l) => l.url)).toEqual([
      '/docs/foundations/devices/ecoin',
      '/docs/surgical-techniques/procedures/sacral-neuromodulation',
    ]);
    expect(found[1].children?.[0].value).toBe('sacral neuromodulation');
  });

  it('keeps acronyms case-sensitive and honours aliases and exclusions', () => {
    const tree = run({type: 'root', children: [para(text('Water and the bladder are not linked; WATER and Intibia are.'))]});
    expect(links(tree).map((l) => l.children?.[0].value)).toEqual(['WATER', 'Intibia']);
  });

  it('skips headings, existing links, the page itself, and everything from References on', () => {
    const tree = run({type: 'root', children: [
      {type: 'heading', depth: 2, children: [text('Sacral Neuromodulation')]},
      para({type: 'link', url: '/docs/clinical-evidence/studies/water', children: [text('the trial')]}, text(' WATER again')),
      {type: 'heading', depth: 2, children: [text('References')]},
      para(text('eCoin')),
    ]}, ecoin);
    expect(links(tree)).toHaveLength(1);
  });

  it('rejects an alias that points to a missing page', () => {
    const bad = path.join(dir, 'bad.json');
    fs.writeFileSync(bad, JSON.stringify({aliases: {Nope: '/docs/does/not/exist'}}));
    expect(() => buildRegistry(docs, bad)).toThrow(/does not exist/);
  });
});
