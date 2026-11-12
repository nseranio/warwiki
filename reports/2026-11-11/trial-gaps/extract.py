#!/usr/bin/env python3
"""Candidate trials missing from a site's evidence library.
Usage: extract.py <repo> <trials dir> <docs dir> <out prefix>
Writes <out>-named.tsv (acronym-named trials mentioned in docs, with page counts) and
<out>-rcts.tsv (randomized-trial references cited in docs, deduped by DOI/title, with page counts),
both excluding trials already in the library (by name, alias or report DOI)."""
import json, re, sys, pathlib, collections
repo, tdir, ddir, out = map(pathlib.Path, sys.argv[1:5])
have_names, have_dois = set(), set()
for f in (repo / tdir).glob('*.json'):
    t = json.loads(f.read_text())
    for n in [t.get('name', ''), t['id'], *t.get('aliases', [])]:
        have_names.add(re.sub(r'[^a-z0-9]', '', n.lower()))
    for r in t.get('reports', []):
        if r.get('doi'): have_dois.add(r['doi'].lower())
STOP = set("""AUA EAU SUFU AUGS ACOG NICE IUGA ICS FDA NIH NCCN ASCO ESMO RCT RCTS CI HR OR RR NNT IPSS QOL PVR UTI OAB SUI POP BPH ED TURP HOLEP SNM PTNS UDS MUI UUI NDO DO LUTS CT MRI US BMI ICIQ IIEF EPIC PFDI PFIQ UDI IIQ PGI PGII SF EQ VAS NA III II IV USA UK EU AE AES SAE MUS TVT TOT TVTO SIS ISD MESA CISC PFMT BOT BTX ICI ASA IQR SD SE NS NR NIHR HTA DOI PMID PMC ISBN WHO CDC USPSTF HIV HPV BCG MIBC NMIBC RCC PCA PSA ADT RP RT EBRT IMRT SBRT OS PFS DFS EFS MFS CSS ORR CR PR AND THE FOR WITH NOT VERSUS VS ALL LOW HIGH MID OPEN EARLY LATE NEW USE SAFE IUGA ECOG KPS RECIST CTCAE GU GI ICU OR ER JAMA NEJM BJU BMJ""".split())
named = collections.defaultdict(set)
rcts = {}
cite_pat = re.compile(r'<a id="ref\d+"></a>\s*\d+\.\s*(.+)')
acr = re.compile(r'\b([A-Z][A-Za-z]*[A-Z][A-Z0-9]*(?:[- ](?:II|III|IV|2|3|[0-9]{1,2}))?)\b')
ctx = re.compile(r'(trial|study|RCT|randomi[sz]ed|investigators|group)', re.I)
for p in (repo / ddir).rglob('*.mdx'):
    rel = str(p.relative_to(repo)); text = p.read_text(errors='ignore')
    body, _, refs = text.partition('## References')
    for m in acr.finditer(text):
        tok = m.group(1)
        if tok.upper() in STOP or len(re.sub(r'[^A-Z]', '', tok)) < 3: continue
        if sum(c.isupper() for c in tok) < 0.6 * sum(c.isalpha() for c in tok): continue
        win = text[max(0, m.start() - 60): m.end() + 60]
        if ctx.search(win):
            named[tok].add(rel)
    for line in refs.splitlines():
        m = cite_pat.search(line)
        if not m: continue
        c = m.group(1)
        if not re.search(r'randomi[sz]ed|\btrial\b', c, re.I): continue
        if re.search(r'meta-analys|systematic review|protocol|design and rationale|secondary analysis|post hoc|cost', c, re.I): continue
        d = re.search(r'10\.\d{4,9}/[^\s\)\]]+', c)
        key = d.group(0).lower().rstrip('.') if d else re.sub(r'[^a-z]', '', c.lower())[:80]
        if d and key in have_dois: continue
        e = rcts.setdefault(key, {'cite': re.sub(r'\s+', ' ', c)[:300], 'pages': set()})
        e['pages'].add(rel)
with open(f'{out}-named.tsv', 'w') as f:
    f.write('name\tpages\texample_pages\n')
    for k, v in sorted(named.items(), key=lambda kv: -len(kv[1])):
        if re.sub(r'[^a-z0-9]', '', k.lower()) in have_names: continue
        f.write(f"{k}\t{len(v)}\t{'; '.join(sorted(v)[:4])}\n")
with open(f'{out}-rcts.tsv', 'w') as f:
    f.write('pages\tdoi_or_key\tcitation\texample_pages\n')
    for k, v in sorted(rcts.items(), key=lambda kv: -len(kv[1]['pages'])):
        f.write(f"{len(v['pages'])}\t{k}\t{v['cite']}\t{'; '.join(sorted(v['pages'])[:3])}\n")
print(len(named), 'named tokens;', len(rcts), 'rct refs')
