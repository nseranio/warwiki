#!/usr/bin/env python3
"""Check cited DOIs for Crossref retractions, concerns, and corrections.

Usage: python3 scripts/refs/retractions.py [--max-age-days 30] [--refresh]
Cache: reports/audit-v2/sources-local/crossref-updates-cache.json (gitignored).
Output: reports/audit-v2/sources-local/retractions.json. The output remains a
list of records with doi, pages, and notices; each DOI also has checked, and
each page with DOI-free references has a record with doi=null and no_doi=count.
"""
import argparse
import collections
from datetime import datetime, timedelta, timezone
import html
import json
import pathlib
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]
LOCAL = ROOT / "reports/audit-v2/sources-local"
CACHE = LOCAL / "crossref-updates-cache.json"
OUT = LOCAL / "retractions.json"
MAILTO = "warwikihq@gmail.com"
UA = {"User-Agent": f"WARWIKI-refregistry/1.0 (mailto:{MAILTO})"}
DOI = re.compile(r"(?:doi\.org/|doi:\s*\[?)(10\.\d{4,9}/[^\s>\]\"'<]+)", re.I)
REFERENCE = re.compile(r'^\s*(?:<a id="[^"]*"></a>\s*)*(?:\d+\.|\[\^\d+\]:)')
ROWS = 1000
BATCH = 40


def clean(d):
    d = urllib.parse.unquote(html.unescape(d.replace("\\", ""))).rstrip(".,;:")
    while d.endswith(")") and d.count(")") > d.count("("):
        d = d[:-1].rstrip(".,;:")
    return d.lower()


def cited():
    pages = collections.defaultdict(set)
    no_doi = collections.Counter()
    for f in ROOT.glob("docs/**/*.mdx"):
        page = str(f.relative_to(ROOT))
        in_references = False
        reference = []

        def record_reference():
            if not reference:
                return
            dois = {clean(m.group(1)) for m in DOI.finditer(" ".join(reference))}
            if dois:
                for doi in dois:
                    pages[doi].add(page)
            else:
                no_doi[page] += 1

        for line in f.read_text().splitlines():
            if re.match(r"^## References\b", line, re.I):
                record_reference()
                reference = []
                in_references = True
                continue
            if in_references and re.match(r"^##? ", line):
                record_reference()
                reference = []
                in_references = False
            if not in_references:
                continue
            if REFERENCE.match(line):
                record_reference()
                reference = [line]
            elif not line.strip():
                record_reference()
                reference = []
            elif reference:
                reference.append(line)
        record_reference()
    return pages, no_doi


def load_cache():
    raw = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    cache = {}
    for doi, entry in raw.items():
        if isinstance(entry, list):  # Original cache: no successful-check timestamp.
            cache[doi] = {"checked": None, "notices": entry}
        else:
            cache[doi] = {"checked": entry.get("checked"), "notices": entry["notices"]}
    return cache


def stale(entry, now, max_age_days):
    if max_age_days == 0 or not entry or not entry.get("checked"):
        return True
    try:
        checked = datetime.fromisoformat(entry["checked"].replace("Z", "+00:00"))
        return checked.tzinfo is None or now - checked >= timedelta(days=max_age_days)
    except (TypeError, ValueError):
        return True


def fetch_page(url):
    """Network boundary, replaced by unit tests."""
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as response:
        return json.load(response)


def get_page(url):
    for attempt in range(4):
        try:
            return fetch_page(url)
        except Exception:  # A partial or malformed page must not become a successful check.
            if attempt == 3:
                raise
            time.sleep(3 * (attempt + 1))


def fetch_updates(chunk):
    """Read every result page before treating the DOI batch as checked."""
    q = ",".join("updates:" + doi for doi in chunk)
    cursor = "*"
    seen_cursors = set()
    items = []
    while True:
        if cursor in seen_cursors:
            raise ValueError("Crossref repeated a cursor before the result set ended")
        seen_cursors.add(cursor)
        url = "https://api.crossref.org/works?" + urllib.parse.urlencode(
            {"filter": q, "rows": ROWS, "cursor": cursor, "mailto": MAILTO}
        )
        message = get_page(url)["message"]
        page = message["items"]
        if not isinstance(page, list):
            raise ValueError("Crossref items is not a list")
        items.extend(page)
        total = message.get("total-results")
        if total is not None:
            if not isinstance(total, int) or total < 0:
                raise ValueError("Crossref total-results is invalid")
            if len(items) >= total:
                break
            if not page:
                raise ValueError("Crossref returned an empty page before total-results")
        elif len(page) < ROWS:
            break
        next_cursor = message.get("next-cursor")
        if not next_cursor or next_cursor == cursor:
            raise ValueError("Crossref result set is incomplete: no new cursor")
        cursor = next_cursor
        time.sleep(0.3)
    return items


def notices_for(chunk, items):
    notices = {doi: [] for doi in chunk}
    for item in items:
        for update in item.get("update-to") or []:
            doi = clean(update.get("DOI") or "")
            if doi in notices:
                notices[doi].append({
                    "notice": item.get("DOI"), "type": update.get("type"),
                    "label": update.get("label"), "source": update.get("source"),
                    "date": (update.get("updated") or {}).get("date-parts"),
                    "title": (item.get("title") or [""])[0][:200],
                })
    return notices


def unique_notices(notices):
    seen = set()
    result = []
    for notice in notices:
        key = (notice["notice"], notice["type"])
        if key not in seen:
            seen.add(key)
            result.append(notice)
    return result


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--max-age-days", type=int, default=30)
    parser.add_argument("--refresh", action="store_true")
    args = parser.parse_args(argv)
    if args.max_age_days < 0:
        parser.error("--max-age-days must be non-negative")

    pages, no_doi = cited()
    cache = load_cache()
    now = datetime.now(timezone.utc)
    todo = [doi for doi in pages if args.refresh or stale(cache.get(doi), now, args.max_age_days)]
    print(len(pages), "cited DOIs;", len(todo), "to query")
    failed = []
    for start in range(0, len(todo), BATCH):
        chunk = todo[start:start + BATCH]
        try:
            notices = notices_for(chunk, fetch_updates(chunk))
        except Exception as exc:
            failed.extend(chunk)
            print(f"failed DOIs ({', '.join(chunk)}): {exc}", file=sys.stderr)
            continue
        checked = datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
        for doi in chunk:
            cache[doi] = {"checked": checked, "notices": unique_notices(notices[doi])}
        if (start // BATCH) % 20 == 19:  # checkpoint: an interrupted run keeps its completed checks
            CACHE.write_text(json.dumps(cache, ensure_ascii=False))
        time.sleep(0.3)

    CACHE.write_text(json.dumps(cache, ensure_ascii=False))
    output = [
        {"doi": doi, "pages": sorted(citing_pages),
         "notices": unique_notices(cache.get(doi, {}).get("notices", [])),
         "checked": cache.get(doi, {}).get("checked"), "failed": doi in failed}
        for doi, citing_pages in sorted(pages.items())
    ]
    output.extend(
        {"doi": None, "pages": [page], "notices": [], "checked": None, "no_doi": count}
        for page, count in sorted(no_doi.items())
    )
    OUT.write_text(json.dumps(output, indent=1, ensure_ascii=False))
    with_notices = [record for record in output if record["doi"] and record["notices"]]
    counts = collections.Counter(n["type"] for record in with_notices for n in record["notices"])
    print("DOIs with notices:", len(with_notices), dict(counts))
    print("References without DOI:", sum(no_doi.values()), "on", len(no_doi), "pages")
    print("Failed DOIs:", len(failed))
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
