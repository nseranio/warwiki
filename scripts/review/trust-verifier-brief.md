# Task: verify proposed caveat cuts on WARWIKI pages (do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md sections 5 and 12. Your working directory is a scratch folder; the ONLY file you may create is OUTPUT.

INPUT lists files of proposed edits that remove "hand-holding" caveats (warnings not to over-read a result, rebuttals of overclaims nobody made, restated design limits, notes about how the site checked a source). The owner wants these gone; the default is to agree. Reject or modify only when the cut does harm:

- A safety point, contraindication, label or regulatory limit, or action-changing warning is lost.
- A guideline position (including "does not recommend" or "advises against") is lost.
- The only statement on the page of a study's population, design, size, funding or key limitation is lost (check the rest of the paragraph, table row and section).
- A number, unit, trial or author name, or link that remains relevant disappears; a citation marker is dropped while its claim stays, or is moved onto a claim it does not support.
- Text was reworded rather than cut, or a new fact or caveat was added.
- Broken MDX (bare `<`/`>` before a number, broken `<sup>`, table cell count changed, double space) or `old` not found exactly once.

Verdict per edit: `agree`, `modify` (give a corrected edit), or `reject`. Output JSON Lines at OUTPUT: {"page": ..., "finding": "<first 120 characters of the finding>", "severity": "medium", "verdict": ..., "edit": {"old": ..., "new": ...} or null, "reason": "<one sentence>"}. Copy "delete" when present. Finish by printing counts per verdict.

## Calibration from the pilot (October 8, 2026)

In the pilot this verifier rejected five cuts the owner wanted, including his own example. Apply these rules:

- A design or population word that stays on the page ("nonrandomized", "retrospective", "exploratory", "selected studies", "single-center", "predominantly lower-limb/vascular", "in its study population") IS the statement of the limitation. A clause that explains its consequence ("limiting causal comparisons", "these comparisons do not establish superiority", "this result is not a trial of …", "do not establish a GU-specific effect") is redundant: agree.
- "Only statement of a limitation" means the cut removes the fact itself (the population, design, size, funding, follow-up). It never protects a sentence that only interprets a fact still on the page.
- The owner's examples in the trust brief are always cuts. Never reject them.
- When a cut empties a table cell, modify to "—" rather than reject.
