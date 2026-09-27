# AMUGRS pilot review (book 1 of 19)

Reviewed September 27, 2026. Covers the completed Codex mining pass over
*Advanced Male Urethral and Genital Reconstructive Surgery* (2014, Humana
Press), run September 26 into `~/Desktop/WARWIKI-textbook-mining/findings/AMUGRS/`.
This review is itself read-only: no WARWIKI page or mining output file was
edited to produce it. Four parallel checks were run: process compliance,
the 18 high/medium findings + 3 new-page proposals, all 11 conflicts, and a
15-item spot-check of the 54 low-priority findings.

## Verdict: approve the pilot

The mining process followed CODEX-PROMPT.md correctly with no fabrication,
no rule violations, and accurate citation handling. Two small process
corrections (below) should be passed to Codex before it continues to book 2.
Content adoption is a separate decision from process approval -- see
"Adoption status" below for what's ready to write into WARWIKI now.

## Process compliance (full pass, no issues)

- Triage and progress files are complete and accurate for all 50 chapters;
  partial-scope/partial-read chapters (7, 36, and the ones with missing
  printed pages) are correctly flagged, not silently skipped.
- 11 sampled chapter files (ch001, 005, 009, 013, 018, 020, 024, 031, 040,
  044, 049) all match the required YAML schema exactly. Every `addition`
  field is genuine paraphrase, never a long verbatim lift. `book_refs`
  entries are real, fully specified citations or explicitly
  `none cited (textbook teaching)` -- none looked vague or invented.
- 38 of 39 sampled `target_file` paths exist in the repo; the one exception
  is a `new_page` proposal, where a not-yet-existing path is correct by
  definition.
- Both claimed PDF anomalies independently confirmed against the raw
  `text/AMUGRS.txt`: printed p. 272 (ch. 18) is genuinely absent from the
  text layer, and chapter 49's inline citation really does point to the
  wrong reference number (#24, urethral erosion, instead of #23, Soljanik,
  the actual repeat-sling study).
- `session-log.md` correctly records git HEAD and `git status --porcelain`
  at start and end; the repo was not modified by the mining task.

## Two process corrections to send to Codex before book 2

1. **`ch026.md` has a stray leaked code snippet appended after the content**
   (an unexecuted Python fragment, not part of any finding). Clean it up,
   and watch for this kind of tool-output leakage into findings files going
   forward.
2. **AMUGRS-026-001 (Urolume explantation salvage reference) should be typed
   `new_page`, not `new`** -- its target file doesn't exist yet. Apply the
   `new_page` type whenever `target_file` points to a path that isn't on
   the site yet, even for a short/consolidated reference rather than a full
   article.

Two smaller judgment notes worth passing along, not blocking:

3. When a finding's proposed numbers come from a study WARWIKI already
   cites elsewhere on the same page under different figures (as with
   AMUGRS-012-001, where the EPA page already cites Terlecki 2010 with
   different percentages), flag it as "reconcile with the page's existing
   citation of this study" rather than presenting it as a clean new
   statistic.
4. Attribute chapter-author operative detail (e.g. AMUGRS-017-001's Q-flap
   dimensions, which are the chapter author Guidice's own description) to
   that author specifically, not to the original technique's originating
   citation, when the two differ.

## Adoption status of the 18 high/medium findings + 3 new-page proposals

**Adopt as proposed (12):** AMUGRS-001-002, 002-001, 005-001, 031-001 (new
page: Synchronous Urethral Strictures), 040-002, 043-001, 044-001, 045-001,
045-002, 046-001 (new page: Groin Defect Reconstruction After ILND),
047-002, 050-001.

**Adopt with a specific edit (3):**
- AMUGRS-040-001 -- add only as an explicitly superseded historical
  footnote on the priapism page, never as an alternative current option.
- AMUGRS-012-001 -- reconcile with the EPA page's existing Terlecki 2010
  citation instead of adding a second, differently-numbered statistic from
  the same study.
- AMUGRS-017-001 -- attribute the width/tension detail to chapter author
  Guidice, not to Morey's original 2000 series.

**Needs more information before deciding (2):**
- AMUGRS-037-001 (proposed Pediatric Male Urethral Stricture page) --
  placement is unclear (adult-focused 03b-voiding-outlet vs. Special
  Populations/Lifelong Care, where WARWIKI already houses other
  pediatric-onset topics), and the cited series are small and 1997-2008;
  needs a placement decision plus a current-literature check before writing.
- AMUGRS-044-004 (penile-fracture catheter duration) -- check whether the
  page's already-cited ACS 2025 guideline stratifies duration by injury
  severity before importing the textbook's complexity split.

**Reject (1):**
- AMUGRS-050-002 -- not a gap. `urodynamics.mdx` already discusses the
  McGuire myelodysplasia origin of the 40 cm H2O figure and already
  cautions against a universal threshold.

## Conflicts (11 reviewed)

9 of Codex's "keep WARWIKI's current position, note the textbook's as
historical" calls are sound and the cited WARWIKI text matches what the
finding claims:
AMUGRS-040-001, 050-002, 041-001, 043-002, 044-002, 046-003, 047-004,
049-002, and 044-003 (interval kept, see caveat below).

2 deserve a nuance addition to the page, not a reversal of current
guidance:
- **AMUGRS-047-003** (reservoir herniation) -- the reservoir-placement page
  currently states revision surgery unconditionally, with no citation and
  no symptom-based branch. Add: a small, asymptomatic hernia may reasonably
  be observed rather than always revised.
- **AMUGRS-044-004** (penile-fracture catheter duration) -- see above,
  contingent on the ACS-2025 stratification check.

Separately flagged, not from the textbook but surfaced by this review:
WARWIKI's own penile-fracture page states its 4-6 week abstinence interval
(AMUGRS-044-003) and its 7-14 day catheter duration
(AMUGRS-044-004) with **no citation on the page itself**. Keeping both
positions is still correct -- the textbook's older, small counter-series
don't establish otherwise -- but both deserve a real citation independent
of this book.

## Low-priority batch (54 total, 15 spot-checked)

Trustworthy as a group -- every checked `warwiki_currently` claim held up
against the actual page, every citation was real or honestly marked
uncited, and hedging language matched the source's actual evidence level
throughout. Safe to skim rather than deep-review individually.

Two flagged for slightly closer attention before writing, not for
fabrication risk:
- **AMUGRS-024-001** (transureteral embolization for refractory fistula) --
  the source cohort is mixed-sex and cancer-heavy, further from WARWIKI's
  target population than most findings; make sure the hedging survives
  into any published text.
- **AMUGRS-026-001** -- see process correction #2 above (retype as
  `new_page`).

## Recommended next steps

1. Tell Codex the pilot is approved, with the two process corrections
   above, and let it continue the queue starting at book 2 (*Major
   Complications of Female Pelvic Surgery*, per `library-queue.md`).
2. Separately, decide whether to start writing the 12 clear-adopt findings
   (plus the 3 adopt-with-edit ones) into WARWIKI now, or batch that with
   later books. This review does not itself make any site edits.
