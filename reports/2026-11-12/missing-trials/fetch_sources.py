#!/usr/bin/env python3
"""Pre-fetch each missing trial's primary and listed later reports (Crossref record, PubMed abstract, PubMed Central
full text when open) into reports/audit-v2/sources-local/trials-2026-11-12/<doi slug>.txt with an index.json.
Ported from WHITWIKI's missing-trials kit (November 11, 2026). Usage: fetch_sources.py [id ...] (default: all 183).
Also: fetch_sources.py --dois DOI[=PMID] ... fetches extra DOIs cited by the drafts."""
import html, json, re, sys, time, urllib.parse, urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SD = ROOT / 'reports/audit-v2/sources-local/trials-2026-11-12'
SD.mkdir(parents=True, exist_ok=True)
E = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
UA = {'User-Agent': 'evidence-source-fetch'}
DOI = re.compile(r'10\.\d{4,9}/[^\s"<>]+')


def slug(d):
    return re.sub(r'[^a-z0-9]+', '_', d.lower()).strip('_')


def get(url):
    for a in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                b = r.read(); time.sleep(0.35)
                return b.decode('utf-8', 'replace')
        except Exception:
            time.sleep(2 + 2 * a)
    return None


def strip_xml(x):
    x = re.sub(r'<(table-wrap-foot|ref-list|back)[\s\S]*?</\1>', ' ', x)
    x = re.sub(r'</(p|title|tr|caption|label|sec)>', '\n', x)
    x = re.sub(r'</t[dh]>', ' | ', x)
    x = re.sub(r'<[^>]+>', '', x)
    x = html.unescape(x)
    return re.sub(r'\n\s*\n+', '\n\n', re.sub(r'[ \t]+', ' ', x)).strip()


def fetch(doi, pmid, idx):
    doi = doi.rstrip('.').lower()
    if any(r['doi'] == doi for r in idx):
        return
    f = SD / (slug(doi) + '.txt')
    parts, row = [], {'doi': doi, 'file': str(f), 'pmid': pmid, 'pmcid': None, 'fulltext': False}
    cr = get('https://api.crossref.org/works/' + urllib.parse.quote(doi))
    if cr:
        try:
            m = json.loads(cr)['message']
            meta = {'title': (m.get('title') or [''])[0], 'authors': [f"{a.get('family', '')} {''.join(w[0] for w in a.get('given', '').split() if w)}".strip() for a in m.get('author', [])[:6]],
                    'journal': (m.get('container-title') or [''])[0], 'volume': m.get('volume', ''), 'issue': m.get('issue', ''), 'page': m.get('page', ''),
                    'year': (m.get('issued', {}).get('date-parts') or [[None]])[0][0]}
            parts.append('=== CROSSREF ===\n' + json.dumps(meta, ensure_ascii=False))
        except Exception:
            pass
    if not pmid:
        s = get(E + 'esearch.fcgi?' + urllib.parse.urlencode({'db': 'pubmed', 'term': doi + '[aid]', 'retmode': 'json'}))
        ids = json.loads(s)['esearchresult'].get('idlist', []) if s else []
        pmid = ids[0] if len(ids) == 1 else None
        row['pmid'] = pmid
    if pmid:
        ab = get(E + 'efetch.fcgi?' + urllib.parse.urlencode({'db': 'pubmed', 'id': pmid, 'rettype': 'abstract', 'retmode': 'text'}))
        if ab:
            parts.append(f'=== PUBMED ABSTRACT (https://pubmed.ncbi.nlm.nih.gov/{pmid}/, read 2026-11-12) ===\n' + ab.strip())
        conv = get('https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?' + urllib.parse.urlencode({'ids': pmid, 'format': 'json'}))
        try:
            pmc = json.loads(conv)['records'][0].get('pmcid') if conv else None
        except Exception:
            pmc = None
        if pmc:
            row['pmcid'] = pmc
            x = get(E + 'efetch.fcgi?' + urllib.parse.urlencode({'db': 'pmc', 'id': pmc, 'retmode': 'xml'}))
            if x and '<body' in x:
                tabs = '\n\n'.join(strip_xml(t) for t in re.findall(r'<table-wrap[\s\S]*?</table-wrap>', x))
                parts.append(f'=== FULL TEXT (https://pmc.ncbi.nlm.nih.gov/articles/{pmc}/, read 2026-11-12) ===\n' + strip_xml(x[x.find('<body'):]) + ('\n\n=== TABLES ===\n' + tabs if tabs else ''))
                row['fulltext'] = True
    if not parts:
        print('nothing for', doi); return
    f.write_text('\n\n'.join(parts) + '\n')
    idx.append(row)
    json.dump(idx, open(SD / 'index.json', 'w'), indent=1)
    print(doi, pmid, 'FT' if row['fulltext'] else '', flush=True)


def fetch_pmid(pmid, idx):
    """A report without a DOI: PubMed abstract (and PMC full text) as pmid_<PMID>.txt, indexed under doi 'pmid:<PMID>'."""
    key = 'pmid:' + pmid
    if any(r['doi'] == key for r in idx):
        return
    f = SD / f'pmid_{pmid}.txt'
    row = {'doi': key, 'file': str(f), 'pmid': pmid, 'pmcid': None, 'fulltext': False}
    parts = []
    ab = get(E + 'efetch.fcgi?' + urllib.parse.urlencode({'db': 'pubmed', 'id': pmid, 'rettype': 'abstract', 'retmode': 'text'}))
    if ab:
        parts.append(f'=== PUBMED ABSTRACT (https://pubmed.ncbi.nlm.nih.gov/{pmid}/, read 2026-11-12) ===\n' + ab.strip())
    conv = get('https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?' + urllib.parse.urlencode({'ids': pmid, 'format': 'json'}))
    try:
        pmc = json.loads(conv)['records'][0].get('pmcid') if conv else None
    except Exception:
        pmc = None
    if pmc:
        row['pmcid'] = pmc
        x = get(E + 'efetch.fcgi?' + urllib.parse.urlencode({'db': 'pmc', 'id': pmc, 'retmode': 'xml'}))
        if x and '<body' in x:
            parts.append(f'=== FULL TEXT (https://pmc.ncbi.nlm.nih.gov/articles/{pmc}/, read 2026-11-12) ===\n' + strip_xml(x[x.find('<body'):]))
            row['fulltext'] = True
    if not parts:
        print('nothing for', key); return
    f.write_text('\n\n'.join(parts) + '\n')
    idx.append(row)
    json.dump(idx, open(SD / 'index.json', 'w'), indent=1)
    print(key, 'FT' if row['fulltext'] else '', flush=True)


def main():
    idx = json.load(open(SD / 'index.json')) if (SD / 'index.json').exists() else []
    a = sys.argv[1:]
    if a and a[0] == '--dois':
        for x in a[1:]:
            d, _, p = x.partition('=')
            fetch(d, p or None, idx)
        return
    m = json.load(open(ROOT / 'reports/2026-11-11/trial-gaps/warwiki-missing-trials.json'))
    for t in m['trials']:
        if a and t['id'] not in a:
            continue
        p = t['primary']
        if p.get('doi'):
            fetch(p['doi'], p.get('pmid'), idx)
        elif p.get('pmid'):
            fetch_pmid(p['pmid'], idx)
        for fu in t['followups']:
            d = DOI.search(fu); pm = re.search(r'PMID:\s*(\d+)', fu)
            if d:
                fetch(d.group(0), pm.group(1) if pm else None, idx)
            elif pm:
                fetch_pmid(pm.group(1), idx)
    print(len(idx), 'sources;', sum(r['fulltext'] for r in idx), 'with PMC full text')


if __name__ == '__main__':
    main()
