# Task: adversarially verify review findings for WARWIKI (do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md section 4 and reports/2026-09-20/content-preservation-policy.md. Your working directory is a scratch folder; the ONLY file you may create is OUTPUT.

INPUT lists finding files (JSON Lines) written by another reviewer, one finding per line, each with an exact proposed edit {old, new} or null. For every finding with severity high or medium, and every low finding whose category is reference: try to REFUTE it.

1. Open the page and confirm `old` is an exact substring of the current file and that the finding describes the page correctly (read the surrounding paragraph and the cited reference list).
2. Open the evidence yourself (PubMed abstract, PMC/open full text, guideline chapter, label). Confirm the source says what the finding claims, for the right population, endpoint and time point.
3. Judge the proposed `new` text: it must fix only the error, keep every citation marker attached, keep useful content (no deletions without a demonstrated error), follow STYLE.md evidence wording, and not introduce a new uncited claim. If it adds a new reference, the reference must be fully specified and verified (DOI/PMID you opened) and the edit must include the reference-list line; otherwise reject the addition or narrow the edit.
4. Verdict: `agree` (edit correct as proposed), `modify` (finding real, give a corrected edit), `reject` (finding wrong, unsupported, or the edit would cause harm), `no_edit` (finding real but needs the user or full text; say why).

Output JSON Lines at OUTPUT, one per verified finding: {"page":..., "finding": "<first 120 chars of the finding>", "severity":..., "verdict":..., "edit": {"old":...,"new":...} or null, "reason": "<one or two sentences with the source you opened>"}
Skip low findings that are not reference fixes. Finish by printing counts per verdict.
