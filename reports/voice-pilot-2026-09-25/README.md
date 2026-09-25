# Voice pilot, September 25, 2026

**Question.** Should WARWIKI adopt the GPT-drafted "encyclopedic, less AI" revision prompt, and what should replace it?

**Method.** Five pages already audited under v2 were snapshotted from `HEAD`:

- p1: RVF
- p2: β3-agonists
- p3: male slings chooser
- p4: Surgicel
- p5: NLUTD Parkinson's

Sonnet 5 (high effort) rewrote each page under each prompt without access to the cited sources. Each output was checked by `check_voice_diff.py`, a deterministic checker for frontmatter, references, headings, tables, citation markers, link targets and numbers. A blind Opus judge then audited each pair of versions for meaning drift and scored the voice from 1 to 10. Nothing in `docs/` was modified.

## Corpus baseline (docs/, 1,188 files, about 1.44M prose words)

The lexical "AI words" that GPT's prompt bans are rare, at about 1–1.5 per 1,000 words. The site's machine-writing signature is typographic and structural:

| Pattern | Hits | Pages |
|---|---|---|
| Em dash | 14,623 (about 10 per 1,000 words) | 790 |
| Bold label lead-ins (`**X:**`) | 3,126 | 614 |
| "rather than" | 1,441 | 725 |
| Arrow (→) in running text | 1,346 | 327 |
| "individualized" / "shared decision-making" | 521 | 353 |
| crucial / essential / critical | 513 | 318 |
| "This is / This means…" opener | 468 | 355 |

## Round 1: GPT revision prompt (A) versus style draft v1 (B)

| Page | Original voice | A voice | A drift (major/minor) | B voice | B drift (major/minor) | Judge preferred |
|---|---|---|---|---|---|---|
| p1 | 5 | 5.5 | 1 / 5 | 6.5 | 0 / 1 | B |
| p2 | 4 | 6 | 3 / 12 | 6 | 0 / 0 | B |
| p3 | 5 | 6.5 | 0 / 11 | 5.5 | 0 / 0 | B |
| p4 | 5 | 6 | 0 / 15 | 6 | 0 / 0 | B |
| p5 | 4 | 6.5 | 1 / 13 | 5 | 0 / 0 | B |

**Invariant checker:** A failed on 5 of 5 pages. The failures:

- dropped citation markers
- an altered reference list (p2)
- changed headings, which break inbound anchors (p3, p5)
- changed frontmatter (p3)
- altered table rows

B passed on 5 of 5.

Examples of A's major drift:

- p1: "a clinically important defect **may favor** concurrent sphincteroplasty" became "sphincter defect on EAUS or manometry **favors** … over ERAF alone".
- p5: the onabotulinumtoxinA evidence statement was rewritten with an added FDA-labeling claim under the EAU citation.

A's instruction to "retain only claims supported by the supplied sources" lets a model without sources delete and recalibrate content. That conflicts directly with the September 20 content-preservation policy.

## Round 2: v1 (B) versus v2 (C, self-checked against the invariant checker)

| Page | Original voice | v1 voice | v1 drift (major/minor) | v2 voice | v2 drift (major/minor) | Judge preferred |
|---|---|---|---|---|---|---|
| p1 | 5 | 5.5 | 0 / 2 | 6.5 | 0 / 2 | v2 |
| p2 | 4 | 5 | 0 / 1 | 6 | 0 / 2 | v2 |
| p3 | 5 | 5.5 | 0 / 0 | 6.5 | 0 / 1 | v2 |
| p4 | 4 | 5 | 0 / 0 | 5.5 | 0 / 3 | v1 |
| p5 | 4 | 5 | 0 / 0 | 6 | 0 / 5 | v1 |

v2 passed the checker on all 5 pages, and em dashes fell from 9–23 to 0–0.6 per 1,000 words.

v2 did more of the voice work but brought three new problems:

- Converting imperatives to "should" produced agentless passives, about 24 per page, which read like a device IFU.
- Filler verbs appeared ("Foul-smelling vaginal discharge occurs.").
- Splitting sentences sometimes left a citation on the wrong clause. The checker cannot detect this; only a judge or an auditor with the source can.

## Lessons folded into `STYLE-draft-v3.md`

1. Typography and word choice (Pass 1) can be fixed safely without sources: zero major drift across 10 rewrites.
2. The remaining machine voice is structural: bold label, then fragment, bullet after bullet. Fixing it means rebuilding sentences, which moves citations. That work (Pass 2) belongs in the source audit, where a moved claim can be checked against the paper.
3. Do not mass-convert imperatives. Keep them in operative steps, checklists and pearls. Elsewhere, describe practice in the active voice, and use "should" only for genuine recommendations.
4. Lists of symptoms, findings and instruments stay noun-phrase lists.
5. GPT's evidence-calibration section is sound. It belongs in the audit's editing rules (AUDIT.md step F), not in a voice pass run without sources.
6. The ceiling for a sources-free rewrite of these bullet-heavy pages was about 6.5/10. Going further needs Pass 2 structural editing.

## Files

- `prompts/`: A = GPT revision prompt (verbatim), B = style v1, C = style v2.
- `samples/`: for each page, the original plus the A, B and C outputs.
- `judging/`: full judge output, including every drift item with quotes.
- `scripts/voice/check_voice_diff.py`: invariant checker (moved from this folder on September 25). `scripts/voice/pass1.py` extracts and re-applies Pass 1 edits; `scripts/voice/voice-report.py` (`npm run lint:voice`) reports style metrics.
- `round3/` and `REVIEW.md`: the September 25 round 3 pilot of STYLE-draft-v3 on 10 pages, with the questions that need the owner's answer.
- `STYLE-draft-v3.md`: proposed `STYLE.md`. Piloted in round 3 (Pass 1 on 10 pages, Pass 1+2 demonstration on 3); awaiting review of `REVIEW.md` before adoption.
