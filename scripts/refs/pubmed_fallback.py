#!/usr/bin/env python3
"""Second-pass PubMed search for unresolved DOI-discovery journal references.

Uses author, publication-year window and unquoted title terms. PubMed's
quoted-title phrase search misses valid records, so every hit is then checked
against the full reference before editing.
"""
import collections
import csv
import json
import pathlib
import random
import re
import urllib.parse

import discover_plain_dois as D

ROOT = D.ROOT
LEDGER = ROOT / "reports/2026-10-11/doi-discovery.tsv"
CACHE = D.CACHE


def search(row):
    translit = row["author"].translate(str.maketrans({"ł": "l", "Ł": "L", "ø": "o", "Ø": "O", "ß": "ss", "æ": "ae", "Æ": "Ae"}))
    author = D.norm(translit).replace(" ", "")
    words = [w for w in D.norm(row["title"]).split() if w not in {"the", "of", "in", "and", "for", "to", "a", "an"}]
    title = " ".join(words[:3])
    if not author or not row["year"] or len(words) < 2:
        return []
    term = f"{author}[Author] AND {row['year']-1}:{row['year']+1}[dp] AND {title}[Title]"
    url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?" + urllib.parse.urlencode(
        dict(db="pubmed", term=term, retmode="json", retmax=10,
             tool="WARWIKI_DOI_Discovery", email=D.EMAIL))
    data = D.request(url)
    return (data or {}).get("esearchresult", {}).get("idlist", [])


def save(cache):
    CACHE.write_text(json.dumps(cache, ensure_ascii=False))


def report(rows):
    counts = collections.Counter(r["decision"] for r in rows)
    added = [r for r in rows if r["decision"] in ("added DOI", "added PMID")]
    examples = random.Random(20261011).sample(added, min(20, len(added)))
    lines = ["# DOI discovery (October 11, 2026)", "",
             f"Scanned: **{len(rows)}** plain-text or PMID-only references under `## References`.", "",
             f"Added DOI: **{counts['added DOI']}**; added PMID: **{counts['added PMID']}**; ambiguous: **{counts['ambiguous']}**; none: **{counts['none']}**; binding conflicts: **{counts['binding-conflict']}**.", "",
             "Existing references with non-PubMed links were outside this plain-text queue. The ledger includes every scanned line. Ambiguous matches and binding conflicts were left unedited.", "",
             "PubMed fallback used author, a publication-year window (±1), and unquoted title terms; each retrieved record was checked against the full reference.", "",
             "## Random added examples", ""]
    for r in examples:
        lines.append(f"- `{r['page']}:{r['ref number']}` — {r['DOI or PMID']}. {r['match evidence']}")
    (ROOT / "reports/2026-10-11/doi-discovery.md").write_text("\n".join(lines) + "\n")
    print(dict(counts), flush=True)


def main():
    with LEDGER.open(newline="") as f:
        reader = csv.DictReader(f, delimiter="\t")
        fields = reader.fieldnames
        rows = list(reader)
    cache = json.loads(CACHE.read_text())
    searches = cache.setdefault("pubmed_search_relaxed", {})
    todo = [r for r in rows if r["decision"] in ("none", "ambiguous") and
            D.metadata(r["reference text"])["journal"] and not D.PMID.search(r["reference text"])]
    print(f"{len(todo)} unresolved journal references", flush=True)
    for i, entry in enumerate(todo, 1):
        row = {**D.metadata(entry["reference text"]), "text": entry["reference text"]}
        key = entry["reference text"]
        if key not in searches:
            searches[key] = search(row)
        for pmid in searches[key]:
            if pmid not in cache["pubmed"]:
                cache["pubmed"][pmid] = D.pubmed(pmid)
        if i % 20 == 0:
            save(cache)
            print(f"searched {i}/{len(todo)}", flush=True)
    save(cache)
    edits = 0
    for entry in todo:
        row = {**D.metadata(entry["reference text"]), "text": entry["reference text"]}
        found = []
        for pmid in searches.get(entry["reference text"], []):
            item = cache["pubmed"].get(pmid)
            if item:
                item = {**item, "pmid": pmid}
                m = D.match(row, item)
                if m[0]:
                    found.append((item, m[2]))
        unique = {x[0].get("doi") or "pmid:" + x[0]["pmid"] for x in found}
        if len(unique) > 1:
            entry["decision"] = "ambiguous"
            entry["match evidence"] = "Multiple matching PubMed records: " + ", ".join(sorted(unique))
            continue
        if not found:
            continue
        item, evidence = found[0]
        doi = item.get("doi")
        if doi:
            cross = next((c for c in cache["queries"].get(entry["reference text"], []) or []
                          if (c.get("doi") or "").lower() == doi.lower()), None)
            if not cross or not D.match(row, cross)[0]:
                entry["decision"] = "ambiguous"
                entry["match evidence"] = evidence + "; Crossref metadata does not confirm the DOI belongs to this cited item"
                continue
            if doi not in cache["doi"]:
                cache["doi"][doi] = D.doi_resolves(doi)
            if not cache["doi"][doi][0]:
                entry["decision"] = "ambiguous"
                entry["match evidence"] = evidence + "; doi.org did not resolve"
                continue
            decision, ident = "added DOI", doi
            suffix = f" doi:[{doi}](https://doi.org/{doi})"
            evidence += "; doi.org redirect=" + cache["doi"][doi][1]
        else:
            decision, ident = "added PMID", item["pmid"]
            suffix = f" [PMID {ident}](https://pubmed.ncbi.nlm.nih.gov/{ident}/)"
            evidence += "; PubMed record verified, no DOI"
        path = ROOT / entry["page"]
        lines = path.read_text().splitlines(keepends=True)
        hits = [j for j, line in enumerate(lines) if entry["reference text"] in line and
                re.match(r'^(?:<a id="[^"]*"></a>\s*)*' + re.escape(entry["ref number"]) + r'\.\s*', line)]
        if len(hits) != 1:
            raise RuntimeError(f"Reference line changed or non-unique: {entry['page']}:{entry['ref number']}")
        j = hits[0]
        old = lines[j]
        lines[j] = old.rstrip("\n\r") + suffix + ("\n" if old.endswith("\n") else "")
        path.write_text("".join(lines))
        entry.update({"decision": decision, "DOI or PMID": ident, "match evidence": evidence})
        edits += 1
    save(cache)
    with LEDGER.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields, delimiter="\t")
        w.writeheader(); w.writerows(rows)
    print(f"added {edits} links", flush=True)
    report(rows)


if __name__ == "__main__":
    main()
