#!/usr/bin/env python3
"""Check references added since a git revision: DOI resolves, and no retraction or expression of concern.

Usage:
  python3 scripts/refs/check_new_refs.py [--since REV] [FILES...]

Reads reference lines added in the diff (working tree against REV, default HEAD) of the given MDX files, or of every
changed MDX file. For each new reference:
  - every DOI must resolve on Crossref (HTTP 200; 429 is retried);
  - the PubMed record (found by DOI, or by an explicit PMID link) must not be a Retracted Publication or carry a
    RetractionIn or ExpressionOfConcernIn notice;
  - errata (ErratumIn) are reported but do not fail.
Exit 1 when any DOI fails to resolve or any reference is retracted or under an expression of concern.
Added November 15, 2026 after a retracted cost model nearly reached a page (STYLE.md section 10).
"""
import json
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

UA = {"User-Agent": "WARWIKI-refcheck/1.0 (mailto:warwikihq@gmail.com)"}
REF_LINE = re.compile(r'^\+\s*(?:\d+\.\s*)?<a id="ref[^"]*"></a>')
DOI = re.compile(r"(?:doi\.org/|doi:\s*\[?)(10\.\d{4,9}/[^\s>\]\"'<)]+)", re.I)
PMID = re.compile(r"(?:pubmed\.ncbi\.nlm\.nih\.gov/|PMID:?\s*\[?)(\d{5,9})", re.I)
EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/"


def get(url, tries=5):
    for a in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.status, r.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            if e.code == 429 and a < tries - 1:
                time.sleep(2 + 2 * a)
                continue
            return e.code, ""
        except Exception:  # noqa: BLE001
            time.sleep(2 + 2 * a)
    return 0, ""


def added_refs(since, files):
    cmd = ["git", "diff", "-U0", since, "--"] + (files or ["docs"])
    diff = subprocess.run(cmd, capture_output=True, text=True, check=True).stdout
    page, out = None, []
    for line in diff.splitlines():
        if line.startswith("+++ b/"):
            page = line[6:]
        elif REF_LINE.match(line) and page and page.endswith(".mdx"):
            out.append((page, line[1:].strip()))
    return out


def pmid_for_doi(doi):
    q = urllib.parse.urlencode({"db": "pubmed", "term": f"{doi}[doi]", "retmode": "json"})
    _, body = get(EUTILS + "esearch.fcgi?" + q)
    time.sleep(0.4)
    try:
        ids = json.loads(body)["esearchresult"]["idlist"]
        return ids[0] if len(ids) == 1 else None
    except Exception:  # noqa: BLE001
        return None


def notices(pmid):
    _, body = get(EUTILS + "efetch.fcgi?" + urllib.parse.urlencode({"db": "pubmed", "id": pmid, "retmode": "xml"}))
    time.sleep(0.4)
    try:
        root = ET.fromstring(body)
    except ET.ParseError:
        return None
    types = [t.text or "" for t in root.iter("PublicationType")]
    found = {c.get("RefType"): c.findtext("RefSource") for c in root.iter("CommentsCorrections")}
    return {
        "retracted": "Retracted Publication" in types or "RetractionIn" in found,
        "concern": "ExpressionOfConcernIn" in found,
        "erratum": found.get("ErratumIn"),
    }


def main():
    a = sys.argv[1:]
    since = a[a.index("--since") + 1] if "--since" in a else "HEAD"
    files = [x for x in a if x.endswith(".mdx")]
    refs = added_refs(since, files)
    if not refs:
        print("No added reference lines.")
        return 0
    bad = 0
    for page, line in refs:
        dois = DOI.findall(line)
        pmids = PMID.findall(line)
        label = re.sub(r"<[^>]+>", "", line)[:90]
        for d in dois:
            code, _ = get("https://api.crossref.org/works/" + urllib.parse.quote(d, safe="/"))
            if code != 200:
                bad += 1
                print(f"FAIL doi {d} -> HTTP {code} | {page} | {label}")
        if not pmids and dois:
            p = pmid_for_doi(dois[0])
            pmids = [p] if p else []
        for p in pmids:
            n = notices(p)
            if n is None:
                print(f"WARN PMID {p}: PubMed record unreadable | {page}")
                continue
            if n["retracted"] or n["concern"]:
                bad += 1
                print(f"FAIL PMID {p}: {'retracted' if n['retracted'] else 'expression of concern'} | {page} | {label}")
            elif n["erratum"]:
                print(f"NOTE PMID {p}: erratum {n['erratum']} | {page} | {label}")
        if not dois and not pmids:
            print(f"WARN no DOI or PMID | {page} | {label}")
    print(f"{len(refs)} added references checked; {bad} failure(s).")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
