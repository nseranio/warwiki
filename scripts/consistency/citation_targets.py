#!/usr/bin/env python3
"""Citations that point to the wrong reference: the sentence names an author or a trial, the cited reference does not
match it, and another reference on the same page does.

Usage: python3 scripts/consistency/citation_targets.py
Output: reports/audit-v2/sources-local/citation-targets.json (candidates for triage; a named senior author or a
secondary source citing the named study can be legitimate).
"""
import json, re, pathlib, unicodedata

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "reports/audit-v2/sources-local/citation-targets.json"
REFLINE = re.compile(r'^(?:<a id="[^"]*"></a>\s*)*(\d+)\.\s*(?:<a id="[^"]*"></a>\s*)*(.*)$')
SUP = re.compile(r"<sup>((?:\[\[\d+\]\]\(#ref\d+\))+)</sup>")
NAMED = re.compile(r"\b([A-Z][a-zà-ÿ’']+(?:[- ][A-Z][a-zà-ÿ]+)?)(?:’s|'s)?(?: et al\.?| and colleagues| and [A-Z][a-z]+)?,? \(?((?:19|20)\d\d)\)?")
TRIAL = re.compile(r"\b([A-Z][A-Z0-9-]{3,}(?: ?II| ?III)?)\b")
NOT_TRIALS = set("AUA EAU NICE ACOG AUGS SUFU ICS IUGA FDA EMA SMSNA ISSM GURS ASCRS ACS CUA BAUS WHO CMS MRI IPSS IIEF PVR TURP HOLEP OAB SUI POP BPH LUTS NLUTD UTI VVF RUF DVIU BMG OMG CIC SNM PTNS AUS IPP CCH ESWT HPV ICD CPT ASA BMI ICU ERAS EBL RCT RCTS CI OR HR RR NNT MDX USA UK CT US VCUG RUG UDS DO DSD MAOI NSAID HIV LS ED PD PE BCG NMIBC MIBC ESGO ASRM SOGC RCOG ACR ASPEN ESPEN AACE NCCN EORTC RTOG CTCAE ASCO ASTRO SUO GPT PDF HTML DOI PMID".split())


def fold(s):
    return "".join(c for c in unicodedata.normalize("NFKD", s or "") if not unicodedata.combining(c)).lower()


def authors(line):
    head = re.split(r'["“]|\*', line, maxsplit=1)[0]
    return {fold(w) for w in re.findall(r"([A-Z][A-Za-zÀ-ÿ'’\-]+)(?= [A-Z]{1,3}\b| [A-Z]\.)", head)}


def main():
    out = []
    for f in sorted(ROOT.glob("docs/**/*.mdx")):
        if "/07-roots/surgeons/" in str(f):
            continue
        s = f.read_text()
        if "## References" not in s:
            continue
        body, refpart = s.split("## References", 1)
        refs = {}
        for line in refpart.splitlines():
            m = REFLINE.match(line.strip())
            if m:
                refs[m.group(1)] = {"line": m.group(2), "authors": authors(m.group(2)), "fold": fold(m.group(2))}
        for para in body.split("\n"):
            for sm in SUP.finditer(para):
                nums = re.findall(r"#ref(\d+)", sm.group(1))
                cited = [refs[n] for n in nums if n in refs]
                if not cited:
                    continue
                start = max(para.rfind(". ", 0, sm.start()), para.rfind("|", 0, sm.start()), para.rfind("</sup>", 0, sm.start()))
                seg = para[start + 1:sm.start()]
                cand = []
                for nm in NAMED.finditer(seg):
                    name = fold(nm.group(1).replace("’s", "").replace("'s", "")).split()[-1]
                    if len(name) < 3 or any(name in r["authors"] for r in cited):
                        continue
                    alt = [n for n, r in refs.items() if name in r["authors"] and n not in nums]
                    if alt:
                        cand.append(("author", nm.group(0), alt))
                for tm in TRIAL.finditer(seg):
                    t = tm.group(1)
                    if t in NOT_TRIALS or len(t) < 4 or t.isdigit():
                        continue
                    tf = fold(t)
                    if any(tf in r["fold"] for r in cited):
                        continue
                    named = re.compile(r"\(" + re.escape(t) + r"[\s)]|\b" + re.escape(t) + r"\b[^.]{0,3}\b(?:trial|study|randomi[sz]ed)", re.I)
                    alt = [n for n, r in refs.items() if named.search(r["line"]) and n not in nums]
                    in_seg = re.search(re.escape(t) + r"[\w\s-]{0,12}\b(?:trial|study|RCT|cohort|registry)|(?:trial|study)\s+\(?" + re.escape(t), seg, re.I)
                    common = sum(1 for r in refs.values() if tf in r["fold"]) >= 3
                    if alt and in_seg and not common:
                        cand.append(("trial", t, alt))
                if cand:
                    out.append({"page": str(f.relative_to(ROOT)), "segment": seg.strip()[-400:], "cited": nums,
                                "cited_refs": {n: refs[n]["line"][:220] for n in nums if n in refs},
                                "signals": [{"kind": k, "text": t, "candidates": {n: refs[n]["line"][:220] for n in a}} for k, t, a in cand]})
    OUT.write_text(json.dumps(out, indent=1, ensure_ascii=False))
    print(len(out), "candidates on", len({o["page"] for o in out}), "pages")


if __name__ == "__main__":
    main()
