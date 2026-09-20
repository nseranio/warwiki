#!/usr/bin/env python3
"""Check audit record consistency. This cannot establish clinical correctness."""
import argparse
import hashlib
import json
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COVERAGE = {"evaluation", "treatment", "numbers", "doseDeviceSafety", "anatomyTechnique",
            "followUp", "importedDataFigures", "references", "currency"}
ACCESS = {"full-text", "relevant-sections", "abstract-only", "manufacturer-document",
          "prior-review", "indexed-excerpts", "unavailable"}


def validate(batch, root=ROOT, require_current=True):
    errors = []

    def need(condition, message):
        if not condition:
            errors.append(message)

    def text(value):
        return isinstance(value, str) and bool(value.strip())

    need(text(batch.get("batchId")), "batchId is required")
    try:
        date.fromisoformat(batch.get("reviewedAt", ""))
    except (ValueError, TypeError):
        errors.append("reviewedAt must be an ISO date")
    for key in ("model", "reasoningEffort"):
        need(text(batch.get(key)), f"{key} is required")
    sources = batch.get("sources", [])
    need(isinstance(sources, list), "sources must be a list")
    if not isinstance(sources, list):
        sources = []
    ids = set()
    for source in sources:
        if not isinstance(source, dict):
            errors.append("source must be an object")
            continue
        sid = source.get("id")
        need(text(sid) and sid not in ids, "source IDs must be nonempty and unique")
        if isinstance(sid, str):
            ids.add(sid)
        for key in ("url", "version", "readScope"):
            need(text(source.get(key)), f"{sid}: {key} required")
        need(source.get("access") in ACCESS, f"{sid}: invalid access scope")
        if source.get("access") == "prior-review":
            need(text(source.get("reusedFrom")), f"{sid}: name the reused report")

    pages = batch.get("pages", [])
    need(isinstance(pages, list) and bool(pages), "pages must be a nonempty list")
    if not isinstance(pages, list):
        return errors
    files = set()
    for page in pages:
        if not isinstance(page, dict):
            errors.append("page must be an object")
            continue
        file = page.get("file", "")
        valid_path = isinstance(file, str) and file.startswith("docs/") and ".." not in Path(file).parts
        need(valid_path and file not in files, "page paths must be unique docs paths")
        if not valid_path:
            continue
        files.add(file)
        path = root / file
        sha = page.get("sourceSha256", "")
        need(isinstance(sha, str) and bool(re.fullmatch(r"[a-f0-9]{64}", sha)), f"{file}: invalid SHA256")
        need(path.is_file(), f"{file}: page does not exist")
        if require_current and path.is_file():
            need(hashlib.sha256(path.read_bytes()).hexdigest() == sha, f"{file}: stale content hash")
        need(page.get("status") in {"checked", "updated", "unresolved"}, f"{file}: invalid ledger status")
        need(type(page.get("fullTextRead")) is bool, f"{file}: fullTextRead must be boolean")
        need(type(page.get("clinicalVerificationComplete")) is bool, f"{file}: clinicalVerificationComplete must be boolean")
        for key in ("readScope", "preservationReview", "reviewRecord"):
            need(text(page.get(key)), f"{file}: {key} required")
        record = page.get("reviewRecord", "")
        need(isinstance(record, str) and record.startswith("reports/") and ".." not in Path(record).parts
             and (root / record).is_file(), f"{file}: reviewRecord must name an existing report")
        disposition = page.get("auditDisposition")
        need(disposition in {"partial", "blocked", "complete", "not-clinical"}, f"{file}: invalid auditDisposition")
        coverage = page.get("coverage", {})
        need(isinstance(coverage, dict) and COVERAGE <= coverage.keys(), f"{file}: incomplete coverage map")
        if not isinstance(coverage, dict):
            coverage = {}
        need(all(text(v) for v in coverage.values()), f"{file}: blank coverage explanation")
        gaps = page.get("unresolvedClaims")
        need(isinstance(gaps, list) and all(text(v) for v in gaps), f"{file}: unresolvedClaims must be a list of descriptions")
        claims = page.get("claimChecks", [])
        need(isinstance(claims, list), f"{file}: claimChecks must be a list")
        if not isinstance(claims, list):
            claims = []
        unresolved = False
        for claim in claims:
            if not isinstance(claim, dict):
                errors.append(f"{file}: claim must be an object")
                continue
            for key in ("claim", "locator", "note"):
                need(text(claim.get(key)), f"{file}: claim {key} required")
            verdict = claim.get("verdict")
            need(verdict in {"supported", "corrected", "unresolved"}, f"{file}: invalid verdict")
            source_ids = claim.get("sourceIds", [])
            need(isinstance(source_ids, list) and all(isinstance(s, str) and s in ids for s in source_ids), f"{file}: unknown source ID")
            if verdict in {"supported", "corrected"}:
                need(bool(source_ids), f"{file}: supported/corrected claim needs a source")
            unresolved |= verdict == "unresolved"
        review = page.get("reviewCheck")
        need(review in {"pending", "passed"}, f"{file}: invalid reviewCheck")
        if page.get("clinicalVerificationComplete"):
            need(disposition == "complete", f"{file}: partial/nonclinical record cannot claim clinical completion")
        if disposition in {"complete", "not-clinical"}:
            need(page.get("fullTextRead") is True, f"{file}: closure requires a full current-page read")
            need(gaps == [] and not unresolved, f"{file}: unresolved claims prevent closure")
            need(review == "passed", f"{file}: closure requires a passed review")
            need(not any(re.search(r"\b(pending|partial|unreviewed|unread|unresolved)\b", str(v), re.I)
                         for v in coverage.values()), f"{file}: unfinished coverage prevents closure")
            if disposition == "complete":
                need(bool(claims), f"{file}: clinical closure requires claim checks")
                need(page.get("clinicalVerificationComplete") is True, f"{file}: complete disposition must agree with clinicalVerificationComplete")
                used = {sid for c in claims if isinstance(c, dict) for sid in c.get("sourceIds", []) if isinstance(sid, str)}
                need(not any(s.get("id") in used and s.get("access") in {"indexed-excerpts", "abstract-only", "unavailable"}
                             for s in sources if isinstance(s, dict)), f"{file}: abstract/excerpt-only source work cannot close a clinical audit")
            else:
                need(text(page.get("nonclinicalReason")), f"{file}: explain nonclinical disposition")
    return errors


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("batch", type=Path)
    parser.add_argument("--allow-stale", action="store_true", help="Historical schema check only; never for current-page review credit")
    args = parser.parse_args()
    try:
        result = validate(json.loads(args.batch.read_text()), require_current=not args.allow_stale)
    except (OSError, ValueError, TypeError) as exc:
        parser.exit(1, f"Invalid audit record: {exc}\n")
    if result:
        parser.exit(1, "\n".join(result) + "\n")
    print("Audit record is internally consistent; clinical correctness and completeness still require source review.")
