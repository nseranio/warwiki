// Links the first mention of a topic that has its own page, the way Wikipedia does.
// Runs at build time on the parsed page, so the MDX source is never edited.
//   - one link per target page, at its first mention in running text
//   - never in headings, existing links, code, JSX blocks, or from the References / See Also / Videos sections on
//   - never to the page itself, and not when the page already links to that target by hand
// Terms: page titles plus src/data/autolink.json (aliases and excluded terms). Opt a page out with `autolink: false`.
const path = require('path');
const {buildRegistry, frontmatter} = require('./terms');

const STOP_HEADINGS = /^(references|see also|videos|further reading|sources)$/i;
const SKIP = new Set(['heading', 'link', 'linkReference', 'definition', 'code', 'inlineCode', 'html', 'yaml', 'image',
  'imageReference', 'mdxjsEsm', 'mdxJsxFlowElement', 'mdxJsxTextElement', 'mdxFlowExpression', 'mdxTextExpression',
  'footnoteDefinition', 'footnoteReference']);

const textOf = (node) => (node.value != null ? node.value : (node.children || []).map(textOf).join(''));
const cleanUrl = (u) => String(u || '').split('#')[0].split('?')[0].replace(/\/$/, '');

function remarkAutolink(options = {}) {
  const siteDir = options.siteDir || process.cwd();
  const docsDir = options.docsDir || path.join(siteDir, 'docs');
  const registry = options.registry || buildRegistry(docsDir, options.config || path.join(siteDir, 'src/data/autolink.json'));
  const report = options.report;

  return function transformer(tree, file) {
    if (!registry.pattern) return;
    const filePath = file.path || (file.history && file.history[0]) || '';
    if (filePath && !path.resolve(filePath).startsWith(path.resolve(docsDir) + path.sep)) return;
    const fm = (file.data && file.data.frontMatter) || frontmatter(String(file.value || ''));
    if (String(fm.autolink) === 'false' || String(fm.hide_title) === 'true') return;

    const used = new Set();
    const collect = (node) => {
      if (node.type === 'link') used.add(cleanUrl(node.url));
      if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
        for (const a of node.attributes || []) if (a.name === 'href' && typeof a.value === 'string') used.add(cleanUrl(a.value));
      }
      for (const c of node.children || []) collect(c);
    };
    collect(tree);

    let stopped = false;
    const visit = (node) => {
      if (stopped || !node.children) return;
      const out = [];
      for (const child of node.children) {
        if (child.type === 'heading') {
          if (child.depth <= 2 && STOP_HEADINGS.test(textOf(child).trim())) stopped = true;
          out.push(child);
          continue;
        }
        if (stopped || SKIP.has(child.type)) { out.push(child); continue; }
        if (child.type !== 'text') { visit(child); out.push(child); continue; }

        const value = child.value;
        let last = 0;
        registry.pattern.lastIndex = 0;
        for (let m = registry.pattern.exec(value); m; m = registry.pattern.exec(value)) {
          const entry = registry.lookup(m[0]);
          if (!entry) continue;
          const target = cleanUrl(entry.url);
          if (used.has(target) || (filePath && path.resolve(entry.file) === path.resolve(filePath))) continue;
          used.add(target);
          if (m.index > last) out.push({type: 'text', value: value.slice(last, m.index)});
          out.push({type: 'link', url: entry.url, title: null, data: {hProperties: {className: 'autolink'}},
            children: [{type: 'text', value: m[0]}]});
          last = m.index + m[0].length;
          if (report) report({file: filePath, term: entry.term, text: m[0], url: entry.url,
            context: value.slice(Math.max(0, m.index - 50), m.index + m[0].length + 50).replace(/\s+/g, ' ')});
        }
        if (last === 0) out.push(child);
        else if (last < value.length) out.push({type: 'text', value: value.slice(last)});
      }
      node.children = out;
    };
    visit(tree);
  };
}

module.exports = remarkAutolink;
