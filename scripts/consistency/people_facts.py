#!/usr/bin/env python3
"""Cross-page people and eponym consistency scan (discovery, not a lint).

For every surname in the lineage data (surgeons.ts, GURS and URPS lineage) and every bolded name on the History
pages, collect across docs/:
  - given-name forms written before the surname ("Amin Orandi" vs "Ahmad Orandi"),
  - lifespans written as "(YYYY–YYYY)" next to the surname,
  - years attached to eponym phrases ("Orandi flap ... 1968").
Groups with more than one variant are written to reports/audit-v2/sources-local/people-conflicts.json for triage.
Usage: python3 scripts/consistency/people_facts.py
"""
import json, re, pathlib, collections

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "reports/audit-v2/sources-local/people-conflicts.json"
NOUNS = r"(?:flap|procedure|operation|technique|urethroplasty|sling|pouch|neobladder|classification|repair|maneuver|manoeuvre|shunt|plication|corporoplasty|colposuspension|culdoplasty|colpocleisis|suspension|stitch|suture|retractor|clamp|sound|scissors|needle|reservoir|valve|test|sign|syndrome|system|grading|score|nomogram|incision|approach|graft|channel|ureterostomy|cystoplasty|catheter|prosthesis|speculum|fixation|urethrostomy)"
STOP = set("""The A An In On By For With From And Or Of To As At Its This That These Those Dr Professor Prof Sir Lord Saint St
After Before When While During Under Over Between Among Using Modified Classic Original Standard Later Early Late First Second Third
Both Each Modern Current See Also Figure Table Fig Note Notes Level Type Grade Stage Group Center Centre University Hospital Clinic
Female Male Adult Pediatric Robotic Open Laparoscopic Vaginal Abdominal Anterior Posterior Ventral Dorsal Distal Proximal Bulbar Penile
Perineal Transvaginal Transabdominal Combined Single Double Two One Three Ileal Colonic Buccal Free Pedicled Island Spiral Circular
Longitudinal Transverse American British European International Society Association Journal Mayo Lahey Indiana Mainz Kock Studer Hautmann""".split())


def surnames():
    names = set()
    ts = (ROOT / "src/data/surgeons.ts").read_text()
    names |= set(re.findall(r"name:\s*'([^']+)'", ts))
    for f in ("gurs-lineage.generated.json", "urps-lineage.generated.json"):
        p = ROOT / "src/data" / f
        if p.exists():
            names |= set(re.findall(r'"name":\s*"([^"]+)"', p.read_text()))
    for h in (ROOT / "docs/07-roots/history").glob("*.mdx"):
        t = h.read_text()
        names |= set(re.findall(r"\*\*([A-Z][A-Za-z.\- ]{3,40})\*\*", t))
        names |= set(re.findall(r"^#{2,4} ([A-Z][a-z]+(?: [A-Z][a-z.]+)? [A-Z][a-z\-]+)\b", t, re.M))
    for f in (ROOT / "docs").rglob("*.mdx"):
        m = re.search(r"^title:\s*\"?([^\n\"]+)", f.read_text()[:400], re.M)
        if m:
            for w in re.findall(r"\b([A-Z][a-z\-]{3,})\b", m.group(1)):
                if not re.search(r"(plasty|ectomy|ostomy|otomy|itis|osis|pexy|graphy|scopy|ation|ical|ary|ic|al|ous|ive|ing|ism|ia)$", w):
                    names.add("X " + w)
    out = set()
    for n in names:
        parts = [p for p in re.split(r"\s+", n.replace(",", " ")) if p not in ("Jr.", "Jr", "II", "III", "MD")]
        if len(parts) >= 2 and re.match(r"^[A-Z][a-zà-ÿ'\-]{2,}$", parts[-1]):
            out.add(parts[-1])
    common = {w.strip() for w in open("/usr/share/dict/words") if w[:1].islower()}
    return {w for w in out if w.lower() not in common}


def sentences(text):
    text = re.sub(r"^<a id=\"ref.*$", "", text, flags=re.M)
    text = text.split("\n## References")[0]
    return [s for s in re.split(r"(?<=[.!?])\s+|\n+", text) if s.strip()]


VERB = re.compile(r"\b(described|introduced|devised|designed|developed|first|originat\w*|pioneered|reported|published|proposed|named|founded|born|died|invented|popularized|modified)\b", re.I)


def main():
    sn = surnames()
    common = {w.strip() for w in open("/usr/share/dict/words") if w[:1].islower()}
    given = collections.defaultdict(lambda: collections.defaultdict(set))
    life = collections.defaultdict(lambda: collections.defaultdict(set))
    claims = collections.defaultdict(list)
    pat_sur = re.compile(r"\b(" + "|".join(sorted(map(re.escape, sn), key=len, reverse=True)) + r")\b")
    for f in sorted((ROOT / "docs").rglob("*.mdx")):
        rel = str(f.relative_to(ROOT))
        for s in sentences(f.read_text()):
            plain = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)
            plain = re.sub(r"<[^>]+>|\*\*|\*", "", plain)
            plain = re.sub(r"\[\[\d+\]\]\(#ref\d+\)", "", plain)
            found = set(pat_sur.findall(plain))
            if not found:
                continue
            for m in re.finditer(r"\b([A-Z][a-zà-ÿ]{2,})((?:\s[A-Z]\.)*)\s+(" + "|".join(map(re.escape, found)) + r")\b", plain):
                g = m.group(1)
                if g.lower() in common or g in STOP:
                    continue
                given[m.group(3)][g].add(rel)
            for sur in found:
                for m in re.finditer(re.escape(sur) + r"[^.()]{0,40}\(((?:1[5-9]|20)\d{2})\s*[–-]\s*((?:1[5-9]|20)\d{2})\)", plain):
                    life[sur][f"{m.group(1)}–{m.group(2)}"].add(rel)
                for m in re.finditer(re.escape(sur) + r"[^.]{0,60}\bdied\b[^.]{0,20}\b((?:1[5-9]|20)\d{2})", plain):
                    life[sur][f"died {m.group(1)}"].add(rel)
            if VERB.search(plain) and re.search(r"\b(1[5-9]\d{2}|20[0-2]\d)\b", plain):
                for sur in found:
                    claims[sur].append({"file": rel, "sentence": plain.strip()[:500]})
    res = {
        "given_names": {k: {g: sorted(fs) for g, fs in v.items()} for k, v in given.items() if len(v) >= 2},
        "lifespans": {k: {g: sorted(fs) for g, fs in v.items()} for k, v in life.items() if len(v) >= 2},
        "claims": {k: v for k, v in claims.items() if len({c["file"] for c in v}) >= 2},
    }
    OUT.write_text(json.dumps(res, indent=1, ensure_ascii=False))
    print({k: len(v) for k, v in res.items()}, "claim sentences:", sum(len(v) for v in res["claims"].values()), "surnames known:", len(sn))


if __name__ == "__main__":
    main()
