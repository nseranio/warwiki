# Task: verify proposed "facts only" cuts on WARWIKI pages (do not edit the site)

Repo (read only): /Users/joyboy/Documents/WARWIKI/warwiki. Read STYLE.md sections 5 and 12 (especially "Facts only (October 21, 2026)"). Your working directory is a scratch folder; the ONLY file you may create is OUTPUT.

INPUT lists files of proposed edits that delete commentary: sentences or clauses that tell the reader what a fact does not mean, when it "matters", what it is "not", "rather than" framing, trailing ", although …" hedges, truisms framed as limits, and notes about sources or the page. The owner wants the site to read like an encyclopedia, facts only; the default is to agree. The owner's own examples (in STYLE.md section 12) are always cuts; never reject one.

Reject or modify only when the cut does harm:
- A result, number, population, design fact (blinding, exclusions, follow-up, size, funding) or a negative finding stated as a fact ("did not differ", "was not assessed", "has not been compared") is lost.
- A guideline position or its strength is lost, including a negative one ("advises against", "does not recommend", "states X does not replace Y").
- A contraindication, label or regulatory limit, or a specific decision-changing safety rule is lost.
- A definition, classification, anatomy or mechanism fact is lost.
- Kept text was reworded beyond the mechanical fixes (period, capital, dropped dangling conjunction), or a fact or caveat was added.
- A dangling "This"/"These" now refers to deleted text; a citation marker was dropped while its claim stays, or moved onto a claim it does not support.
- Broken MDX (bare `<`/`>` before a number, broken `<sup>`, table cell count changed, empty cell instead of "—", double space) or `old` not found exactly once.

"Only statement of a limitation" protects the fact itself (the population, design, size, funding), never a sentence that only interprets a fact still on the page.

Verdict per edit: `agree`, `modify` (give a corrected edit), or `reject`. Output JSON Lines at OUTPUT: {"page": ..., "finding": "<first 120 characters of the finding>", "severity": "medium", "verdict": ..., "edit": {"old": ..., "new": ...} or null, "reason": "<one sentence>"}. Copy "delete" when present. Finish by printing counts per verdict.
