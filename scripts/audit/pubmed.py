#!/usr/bin/env python3
"""PubMed helper for the WARWIKI audit.

Usage:
  python3 scripts/audit/pubmed.py doi 10.1097/JU.0000000000005279 [more DOIs]
  python3 scripts/audit/pubmed.py pmid 33556448 [more PMIDs]
  python3 scripts/audit/pubmed.py search "radiation bulbomembranous urethroplasty" [--max 10] [--since 2023]
  python3 scripts/audit/pubmed.py cite 33556448 [more PMIDs]

doi/pmid print a house-style reference line and the abstract for each record.
search prints PMID, year, first author, title and journal.
cite prints reference lines only, ready to paste after <a id="refN"></a>N.

The NCBI E-utilities host may be blocked by the Claude Code sandbox; run with the
sandbox disabled for this command if requests return nothing.
"""
import json
import re
import sys
import time
import urllib.parse
import urllib.request

BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
MONTHS = 'January February March April May June July August September October November December'.split()


def get(endpoint, **params):
    url = BASE + endpoint + '?' + urllib.parse.urlencode(params)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=30) as r:
                time.sleep(0.35)  # stay under the 3 requests/second limit
                return r.read().decode()
        except Exception as e:  # noqa: BLE001
            if attempt == 2:
                raise SystemExit(f'PubMed request failed: {e}')
            time.sleep(1.5)


def doi_to_pmid(doi):
    data = json.loads(get('esearch.fcgi', db='pubmed', term=f'{doi}[doi]', retmode='json'))
    ids = data['esearchresult']['idlist']
    return ids[0] if ids else None


def summaries(pmids):
    return json.loads(get('esummary.fcgi', db='pubmed', id=','.join(pmids), retmode='json'))['result']


def abstracts(pmids):
    text = get('efetch.fcgi', db='pubmed', id=','.join(pmids), rettype='abstract', retmode='text')
    out = {}
    for rec in re.split(r'\n\n(?=\d+\. )', text):
        m = re.search(r'PMID: (\d+)', rec)
        if m:
            rec = re.sub(r'Author information:.*?\n\n', '', rec, flags=re.S)
            out[m.group(1)] = rec.strip()
    return out


def cite(r):
    names = [a['name'] for a in r.get('authors', []) if a.get('authtype') == 'Author']
    authors = ', '.join(names[:3]) + (', et al.' if len(names) > 3 else '.')
    title = r['title'].rstrip()
    if not title.endswith(('.', '?')):
        title += '.'
    doi = next((x['value'] for x in r['articleids'] if x['idtype'] == 'doi'), None)
    vol, iss, pages = r.get('volume', ''), r.get('issue', ''), r.get('pages', '')
    if vol:
        loc = f"{r['pubdate'][:4]};{vol}{f'({iss})' if iss else ''}:{pages}."
    else:  # online ahead of print
        parts = (r.get('epubdate') or r['pubdate']).split()
        loc = f'Published online {parts[0]}.'
        if len(parts) == 3:
            loc = f"Published online {MONTHS[['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].index(parts[1])]} {int(parts[2])}, {parts[0]}."
    link = f' doi:[{doi}](https://doi.org/{doi})' if doi else f" [PMID {r['uid']}](https://pubmed.ncbi.nlm.nih.gov/{r['uid']}/)"
    return f"{authors} {title} *{r['source']}.* {loc}{link}"


def show(pmids, with_abstract=True):
    s = summaries(pmids)
    a = abstracts(pmids) if with_abstract else {}
    for p in pmids:
        if p not in s:
            print(f'PMID {p}: not found\n')
            continue
        print(f'PMID {p}')
        print(cite(s[p]))
        if with_abstract:
            print()
            print(a.get(p, '(no abstract available)'))
        print('\n' + '#' * 60 + '\n')


def main(argv):
    if len(argv) < 2:
        raise SystemExit(__doc__)
    cmd, args = argv[0], argv[1:]
    if cmd == 'doi':
        pmids = []
        for d in args:
            p = doi_to_pmid(d)
            print(f'{d} -> {p or "NOT FOUND IN PUBMED"}')
            if p:
                pmids.append(p)
        print()
        if pmids:
            show(pmids)
    elif cmd in ('pmid', 'cite'):
        show(args, with_abstract=(cmd == 'pmid'))
    elif cmd == 'search':
        query, mx, since = args[0], 10, None
        if '--max' in args:
            mx = int(args[args.index('--max') + 1])
        if '--since' in args:
            since = args[args.index('--since') + 1]
            query += f' AND {since}:3000[dp]'
        ids = json.loads(get('esearch.fcgi', db='pubmed', term=query, retmax=mx, sort='relevance',
                             retmode='json'))['esearchresult']['idlist']
        if not ids:
            print('No results')
            return
        s = summaries(ids)
        for p in ids:
            r = s[p]
            first = r['authors'][0]['name'] if r.get('authors') else '?'
            print(f"{p} | {r['pubdate'][:4]} | {first} | {r['title']} | {r['source']}")
    else:
        raise SystemExit(__doc__)


if __name__ == '__main__':
    main(sys.argv[1:])
