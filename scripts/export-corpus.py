#!/usr/bin/env python3
"""Export WARWIKI article text as a small set of plain-text files.

Used for external review tools (for example the ChatGPT textbook-mining
prompt in reports/textbook-mining/) that need to know what each page already
says before proposing additions. Each page keeps its title, URL, headings,
prose and tables. Citation markers, figures, JSX components and code are
removed, and the reference list is condensed to a "Cited:" line of first
author and year so a reviewer can tell which studies a page already uses.

Usage: python3 scripts/export-corpus.py [output_dir]
Default output_dir: ~/Desktop/WARWIKI-textbook-mining/corpus
"""
import os
import re
import sys

DOCS = 'docs'
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/Desktop/WARWIKI-textbook-mining/corpus')

# Output files: (filename, list of path prefixes). First match wins.
GROUPS = [
    ('01-anatomy-skills-periop.txt', ['docs/01-foundations/anatomy-physiology', 'docs/01-foundations/surgical-skills',
                                       'docs/01-foundations/perioperative-care', 'docs/01-foundations/index']),
    ('02-surgical-principles.txt', ['docs/01-foundations/surgical-principles']),
    ('03-pharmacology.txt', ['docs/01-foundations/pharmacology']),
    ('04-tools-instruments-biomaterials.txt', ['docs/01-foundations/tools']),
    ('05-evaluation-and-conditions.txt', ['docs/02-evaluation', 'docs/03-clinical-conditions']),
    ('06-urethra-bladder-neck.txt', ['docs/04-surgical-techniques/04a-', 'docs/04-surgical-techniques/04ab-']),
    ('07-bladder-diversion-upper-tract.txt', ['docs/04-surgical-techniques/04b-', 'docs/04-surgical-techniques/04c-',
                                              'docs/04-surgical-techniques/04d-']),
    ('08-incontinence-prolapse-fistula.txt', ['docs/04-surgical-techniques/04f-', 'docs/04-surgical-techniques/04g-',
                                               'docs/04-surgical-techniques/04h-']),
    ('09-genital-sexual-bph.txt', ['docs/04-surgical-techniques/04e-', 'docs/04-surgical-techniques/04j-',
                                   'docs/04-surgical-techniques/04m-', 'docs/04-surgical-techniques/']),
    ('10-gas-cosmetic-special-populations.txt', ['docs/04-surgical-techniques/04k-', 'docs/04-surgical-techniques/04l-',
                                                 'docs/05-special-populations']),
]
SKIP = ('docs/07-roots', 'docs/08-resources')


def url_for(path, slug):
    parts = path[len(DOCS) + 1:].rsplit('.', 1)[0].split('/')
    parts[0] = re.sub(r'^\d+-', '', parts[0])
    if slug.startswith('/'):
        return '/docs' + slug
    if parts[-1] == 'index' or (len(parts) > 1 and parts[-1] == parts[-2]):
        parts = parts[:-1]
    if slug:
        parts = parts[:-1] + [slug]
    return '/docs/' + '/'.join(parts)


def strip_jsx_blocks(lines):
    """Drop import/export statements and JSX component blocks, tracking bracket depth."""
    out, depth = [], 0
    for line in lines:
        s = line.strip()
        if depth > 0:
            depth += s.count('{') + s.count('[') + s.count('(') - s.count('}') - s.count(']') - s.count(')')
            if depth <= 0 and (s.endswith('/>') or s.endswith(';') or s.endswith('}') or s.endswith(']') or s.endswith(')')):
                depth = 0
            continue
        if s.startswith('import ') or s.startswith('export '):
            depth = s.count('{') + s.count('[') + s.count('(') - s.count('}') - s.count(']') - s.count(')')
            depth = max(depth, 0)
            continue
        if re.match(r'^<[A-Z]', s):
            if not s.endswith('/>') and not re.search(r'</[A-Z]\w*>$', s):
                depth = max(s.count('{') + s.count('[') - s.count('}') - s.count(']'), 1)
            continue
        out.append(line)
    return out


def condense_refs(ref_text):
    cites = []
    for m in re.finditer(r'<a id="ref\d+"></a>\s*\d+\.\s*(.+)', ref_text):
        entry = re.sub(r'<[^>]+>', '', m.group(1))
        author = re.split(r'[ ,.]', entry.strip(), maxsplit=1)[0].strip('*[')
        year = re.search(r'\b(1[89]\d\d|20\d\d)\b', entry)
        cites.append(f'{author} {year.group(1)}' if year else author)
    for m in re.finditer(r'^\[\^\d+\]:\s*(.+)$', ref_text, re.M):
        entry = m.group(1)
        author = re.split(r'[ ,.]', entry.strip(), maxsplit=1)[0].strip('*[')
        year = re.search(r'\b(1[89]\d\d|20\d\d)\b', entry)
        cites.append(f'{author} {year.group(1)}' if year else author)
    return cites


def clean(path):
    text = open(path, encoding='utf-8').read()
    fm = re.match(r'---\n(.*?)\n---\n', text, re.S)
    front = fm.group(1) if fm else ''
    body = text[fm.end():] if fm else text
    get = lambda k: (re.search(rf'^{k}:\s*(.+)$', front, re.M) or [None, ''])[1].strip().strip('"\'')
    slug = get('slug')

    ref_split = re.split(r'^##\s+References\s*$', body, maxsplit=1, flags=re.M)
    body, refs = ref_split[0], (ref_split[1] if len(ref_split) > 1 else '')
    body = re.sub(r'^\[\^\d+\]:.*$', '', body, flags=re.M)
    cites = condense_refs(refs if refs else text)

    body = re.sub(r'```.*?```', '', body, flags=re.S)
    body = re.sub(r'<!--.*?-->', '', body, flags=re.S)
    body = re.sub(r'\{/\*.*?\*/\}', '', body, flags=re.S)
    lines = strip_jsx_blocks(body.split('\n'))
    keep = []
    for line in lines:
        s = line.strip()
        if s.startswith('![') or s.startswith('<img') or re.match(r'^\*.*\((Original WARWIKI schematic|.*public domain.*|.*CC BY.*)\)\*$', s, re.I):
            continue
        if s in ('---', ':::', '<br />', '<br/>') or re.match(r'^:::\w*', s):
            continue
        line = re.sub(r'<sup>.*?</sup>', '', line)
        line = re.sub(r'\[\^\d+\]', '', line)
        line = re.sub(r'<a id="[^"]*"></a>', '', line)
        line = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', line)
        line = re.sub(r'</?(span|div|a|ul|li|strong|em|p|small|details|summary)\b[^>]*>', '', line)
        line = line.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&nbsp;', ' ')
        keep.append(line.rstrip())
    body = re.sub(r'\n{3,}', '\n\n', '\n'.join(keep)).strip()

    h1 = re.search(r'^# (.+)$', body, re.M)
    title = h1.group(1).strip() if h1 else get('title')
    body = re.sub(r'^# .+\n+', '', body, count=1)
    return title, url_for(path, slug), body, cites


def main():
    os.makedirs(OUT, exist_ok=True)
    buckets = {name: [] for name, _ in GROUPS}
    for root, _, files in os.walk(DOCS):
        for f in sorted(files):
            if not f.endswith(('.md', '.mdx')) or f.startswith('_'):
                continue
            path = os.path.join(root, f)
            if path.startswith(SKIP):
                continue
            name = next((n for n, prefixes in GROUPS if any(path.startswith(p) for p in prefixes)), None)
            if not name:
                continue
            title, url, body, cites = clean(path)
            if len(body) < 40:
                continue
            block = [f'===== PAGE: {title}', f'URL: {url}']
            if cites:
                block.append('Cited: ' + '; '.join(cites))
            block += ['', body, '']
            buckets[name].append((url, '\n'.join(block)))
    total = 0
    for name, pages in buckets.items():
        pages.sort()
        content = f'WARWIKI corpus export: {name}\nEach page starts with "===== PAGE:". Text only; citations condensed to the Cited line.\n\n'
        content += '\n'.join(p for _, p in pages)
        with open(os.path.join(OUT, name), 'w', encoding='utf-8') as fh:
            fh.write(content)
        total += len(content)
        print(f'{name}: {len(pages)} pages, {len(content) / 1e6:.2f} MB')
    print(f'total {total / 1e6:.2f} MB -> {OUT}')


if __name__ == '__main__':
    main()
