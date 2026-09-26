#!/usr/bin/env python3
"""WARWIKI audit bookkeeping (see AUDIT.md).

  python3 scripts/audit/audit.py next [N]          next N unfinished pages in priority order (default 5)
  python3 scripts/audit/audit.py info <page.mdx>   status, prior reports and pre-audit diff size for one page
  python3 scripts/audit/audit.py record <page.mdx> <status> "<note>"
        status: checked | partial | not-clinical | escalate
  python3 scripts/audit/audit.py stats             progress by tier and status
  python3 scripts/audit/audit.py build-queue       regenerate reports/audit-v2/queue.json from docs/

Status lives in reports/audit-v2/status.json. Only `checked` and `not-clinical` count as done.
"""
import datetime
import fcntl
import hashlib
import json
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
DIR = ROOT / 'reports' / 'audit-v2'
QUEUE = DIR / 'queue.json'
STATUS = DIR / 'status.json'
BASELINE = 'e81c5b0d'  # last commit before the September 2026 audit edits began
DONE = {'checked', 'not-clinical'}
VALID = DONE | {'partial', 'escalate'}

# Tier 1: the user's core practice topics, in working order.
TIER1 = [
    'docs/03-clinical-conditions/03a-storage-incontinence/sui-female.mdx',
    'docs/03-clinical-conditions/03a-storage-incontinence/mixed-incontinence.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/female-sui/female-stress-incontinence-database.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/retropubic-midurethral-sling.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/female-slings-suspensions.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/single-incision-mini-sling.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/autologous-pubovaginal-sling.mdx',
    'docs/03-clinical-conditions/03a-storage-incontinence/urgency-incontinence-oab.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/oab-uui/oab-uui-database.mdx',
    'docs/01-foundations/pharmacology/storage-oab/anticholinergics.mdx',
    'docs/01-foundations/pharmacology/storage-oab/beta3-agonists.mdx',
    'docs/01-foundations/pharmacology/storage-oab/botulinum-toxin.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/intradetrusor-botox.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/sacral-neuromodulation.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/percutaneous-tibial-nerve-stimulation.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/implantable-tibial-nerve-stimulation.mdx',
    'docs/03-clinical-conditions/03c-pelvic-support/pelvic-organ-prolapse.mdx',
    'docs/04-surgical-techniques/04g-prolapse-repair/index.mdx',
    'docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrocolpopexy.mdx',
    'docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrospinous-ligament-fixation.mdx',
    'docs/04-surgical-techniques/04g-prolapse-repair/apical/uterosacral-ligament-suspension.mdx',
    'docs/04-surgical-techniques/04g-prolapse-repair/mesh-complications.mdx',
    'docs/03-clinical-conditions/03a-storage-incontinence/sui-male.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/male-sui/male-stress-incontinence-database.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx',
    'docs/04-surgical-techniques/04f-incontinence-procedures/procedures/male-urethral-slings.mdx',
    'docs/03-clinical-conditions/03b-voiding-outlet/bladder-outlet-obstruction.mdx',
    'docs/04-surgical-techniques/04m-bph-male-luts/index.mdx',
    'docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx',
    'docs/03-clinical-conditions/03b-voiding-outlet/posterior-urethral-stenosis.mdx',
    'docs/03-clinical-conditions/03b-voiding-outlet/vesicourethral-anastomotic-stenosis.mdx',
    'docs/03-clinical-conditions/03b-voiding-outlet/bladder-neck-stenosis.mdx',
    'docs/04-surgical-techniques/04a-urethral-reconstruction/male-urethroplasty.mdx',
    'docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/excision-primary-anastomosis.mdx',
    'docs/04-surgical-techniques/04a-urethral-reconstruction/minimally-invasive/dviu.mdx',
    'docs/05-special-populations/05e-womens-health/recurrent-uti.mdx',
    'docs/03-clinical-conditions/03g-genital-scrotal/erectile-dysfunction.mdx',
    'docs/04-surgical-techniques/04j-sexual-dysfunction/erectile-dysfunction.mdx',
    'docs/04-surgical-techniques/04j-sexual-dysfunction/penile-implants/index.mdx',
]


def tier(path):
    if path in TIER1:
        return 1
    if path.startswith(('docs/03-clinical-conditions/', 'docs/01-foundations/pharmacology/')):
        return 2  # remaining conditions (NLUTD, IC/BPS, ...) and drug safety
    if path.startswith(('docs/04-surgical-techniques/', 'docs/02-evaluation/', 'docs/05-special-populations/',
                        'docs/01-foundations/perioperative-care/', 'docs/01-foundations/surgical-principles/')):
        return 3
    return 4  # anatomy, instruments, biomaterials, journal club, history, resources


def load(p, default):
    return json.loads(p.read_text()) if p.exists() else default


def build_queue():
    pages = sorted(str(p.relative_to(ROOT)) for p in (ROOT / 'docs').rglob('*.mdx'))
    missing = [p for p in TIER1 if p not in pages]
    if missing:
        raise SystemExit('Tier-1 paths not found:\n' + '\n'.join(missing))
    order = {p: i for i, p in enumerate(TIER1)}
    pages.sort(key=lambda p: (tier(p), order.get(p, 0), p))
    DIR.mkdir(parents=True, exist_ok=True)
    QUEUE.write_text(json.dumps({'generated': str(datetime.date.today()),
                                 'baselineCommit': BASELINE,
                                 'pages': [{'file': p, 'tier': tier(p)} for p in pages]}, indent=1) + '\n')
    print(f'{len(pages)} pages queued')


def prior_reports(path):
    name = pathlib.Path(path).stem
    try:
        out = subprocess.run(['git', 'grep', '-l', '--', name, 'reports/'], cwd=ROOT, capture_output=True, text=True).stdout
    except FileNotFoundError:
        return []
    return [l for l in out.splitlines() if not l.startswith('reports/audit-v2/')][:8]


def baseline_diff(path):
    old = subprocess.run(['git', 'show', f'{BASELINE}:{path}'], cwd=ROOT, capture_output=True, text=True)
    if old.returncode != 0:
        return 'new since baseline'
    before, now = len(old.stdout.split()), len((ROOT / path).read_text().split())
    return f'{before} words at baseline -> {now} now ({now - before:+d})'


def cmd_next(n):
    q, s = load(QUEUE, None), load(STATUS, {})
    if not q:
        raise SystemExit('Run build-queue first')
    shown = 0
    for item in q['pages']:
        st = s.get(item['file'], {}).get('status')
        if st in DONE or st == 'escalate':
            continue
        print(f"tier {item['tier']} | {item['file']}" + (f" | partial: {s[item['file']]['note']}" if st == 'partial' else ''))
        shown += 1
        if shown >= n:
            break


def cmd_info(path):
    s = load(STATUS, {})
    print('status:', json.dumps(s.get(path), indent=1) if path in s else 'not started')
    print('baseline:', baseline_diff(path))
    print('prior reports mentioning this page:')
    for r in prior_reports(path):
        print('  ', r)


def cmd_record(path, status, note):
    if status not in VALID:
        raise SystemExit(f'status must be one of {sorted(VALID)}')
    f = ROOT / path
    if not f.exists():
        raise SystemExit(f'no such page: {path}')
    # Lock so parallel auditors cannot overwrite each other's records.
    with open(str(STATUS) + '.lock', 'w') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        s = load(STATUS, {})
        s[path] = {'status': status, 'date': str(datetime.date.today()),
                   'sha256': hashlib.sha256(f.read_bytes()).hexdigest()[:16], 'note': note}
        STATUS.write_text(json.dumps(dict(sorted(s.items())), indent=1) + '\n')
    print(f'recorded {status}: {path}')


def cmd_stats():
    q, s = load(QUEUE, {'pages': []}), load(STATUS, {})
    rows = {}
    for item in q['pages']:
        st = s.get(item['file'], {}).get('status', 'not started')
        rows.setdefault(item['tier'], {}).setdefault(st, 0)
        rows[item['tier']][st] += 1
    for t in sorted(rows):
        total = sum(rows[t].values())
        done = sum(v for k, v in rows[t].items() if k in DONE)
        print(f'tier {t}: {done}/{total} done  ' + ', '.join(f'{k} {v}' for k, v in sorted(rows[t].items())))


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a:
        raise SystemExit(__doc__)
    if a[0] == 'next':
        cmd_next(int(a[1]) if len(a) > 1 else 5)
    elif a[0] == 'info' and len(a) == 2:
        cmd_info(a[1])
    elif a[0] == 'record' and len(a) == 4:
        cmd_record(a[1], a[2], a[3])
    elif a[0] == 'stats':
        cmd_stats()
    elif a[0] == 'build-queue':
        build_queue()
    else:
        raise SystemExit(__doc__)
