# Task: verify proposed voice rewrites on WARWIKI pages (do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md sections 1, 2, 4 and 5. Your working directory is a scratch folder; the ONLY file you may create is OUTPUT.

INPUT lists files of proposed voice edits ({old, new}, sometimes "delete": true). For EVERY edit, compare old and new in the context of the current page and try to find a reason to reject:

- Meaning changed: a limitation dropped or weakened, a hedge strengthened or softened, a recommendation strength changed, an association turned into causation, scope widened or narrowed.
- Content lost: a number, unit, denominator, trial or author name, citation marker (or marker moved to a different claim), link, warning or operative detail missing from `new`, unless the same fact is in the same paragraph or cell (then say where).
- Facts added that are not on the page or in its cited sources.
- Worse voice: longer, vaguer or more defensive than the original, or not house voice per STYLE.md.
- Broken MDX: bare `<`/`>` before a number, broken `<sup>` markup, table cell count changed.
- `old` not found exactly once in the current page.

Verdict per edit: `agree`, `modify` (give a corrected edit that fixes the problem), or `reject` (keep the original). Output JSON Lines at OUTPUT: {"page": ..., "finding": "<first 120 characters of the finding>", "severity": "medium", "verdict": ..., "edit": {"old": ..., "new": ...} or null, "reason": "<one sentence>"}. Copy "delete" when present. Finish by printing counts per verdict.
