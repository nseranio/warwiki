#!/usr/bin/env python3
"""Mechanical safety check for coherence-sweep edits (STYLE.md section 14) before apply.

    REVIEW_WORK=<dir> python3 scripts/voice/coherence_check.py [--root REPO]

For every agreed or modified edit in WORK/verdicts that apply.py would list, check that the rewrite keeps every
number and every citation marker of the old text, adds no citation marker, adds no causal connective, and keeps
<sup> tags balanced. Writes WORK/coherence-check.json and prints the failing edit ids, ready for
`apply.py apply --skip <ids>`.
"""
import collections, glob, hashlib, json, os, re, sys

ARGS = sys.argv[1:]
ROOT = os.path.abspath(ARGS[ARGS.index("--root") + 1]) if "--root" in ARGS else \
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
WORK = os.path.join(ROOT, os.environ["REVIEW_WORK"])
MARK = re.compile(r"#ref(\d+)\)|\[\^(\d+)\]")
LINK = re.compile(r"\]\([^)]*\)|https?://\S+|<sup>.*?</sup>|\[\^\d+\]|<a [^>]*>")
NUM = re.compile(r"\d+(?:[.,]\d+)*")
CAUSAL = re.compile(r"\b(because|therefore|thus|hence|so that|consequently|leading to|which (?:raises|causes|explains|means)|as a result)\b", re.I)


def fid(v):
    return hashlib.sha1((v["page"] + (v.get("edit") or {}).get("old", "") + v.get("finding", "")).encode()).hexdigest()[:10]


def marks(t):
    return {a or b for a, b in MARK.findall(t)}


def nums(t):
    return collections.Counter(n.replace(",", "") for n in NUM.findall(LINK.sub(" ", t.replace("&lt;", "<").replace("&gt;", ">"))))


def main():
    done = json.load(open(os.path.join(WORK, "applied.json"))) if os.path.exists(os.path.join(WORK, "applied.json")) else {}
    fails, n = [], 0
    for f in sorted(glob.glob(os.path.join(WORK, "verdicts", "*.jsonl"))):
        for line in open(f):
            try:
                v = json.loads(line)
            except Exception:
                continue
            if v.get("verdict") not in ("agree", "modify") or not (v.get("edit") or {}).get("old"):
                continue
            i = fid(v)
            if i in done:
                continue
            n += 1
            old, new = v["edit"]["old"], v["edit"]["new"]
            prob = []
            lost = [k for k in nums(old) if k not in nums(new)]
            if lost:
                prob.append("numbers lost: " + ", ".join(lost[:8]))
            if marks(old) - marks(new):
                prob.append("citation markers lost: " + ", ".join(sorted(marks(old) - marks(new))))
            if marks(new) - marks(old):
                prob.append("citation markers added: " + ", ".join(sorted(marks(new) - marks(old))))
            if len(CAUSAL.findall(new)) > len(CAUSAL.findall(old)):
                prob.append("new causal connective: " + ", ".join(set(CAUSAL.findall(new)) - set(CAUSAL.findall(old))))
            if new.count("<sup>") != new.count("</sup>"):
                prob.append("unbalanced <sup>")
            page = os.path.join(ROOT, v["page"])
            if os.path.exists(page) and open(page).read().count(old) != 1:
                prob.append("old not found exactly once")
            if prob:
                fails.append({"id": i, "page": v["page"], "problems": prob})
    json.dump(fails, open(os.path.join(WORK, "coherence-check.json"), "w"), indent=1)
    print(f"{n} pending edits checked; {len(fails)} fail", file=sys.stderr)
    for x in fails:
        print(f"  {x['id']} {x['page']}: {'; '.join(x['problems'])}", file=sys.stderr)
    print(" ".join(x["id"] for x in fails))


if __name__ == "__main__":
    main()
