# New-page proposals — review

Reviews every proposed target page in `batches/new-pages.json` (40 page paths,
70 findings) plus `CWW13-124-001` (bladder diverticulectomy) from
`verdicts/c02.md`, which that run deferred under the no-new-pages rule.
41 proposals, 71 findings total.

For each: does the site already cover this somewhere (by search), and one of
**create** / **fold** / **skip**. "Fold" names the existing page and
section. Sizes are rough: *short* = reference page, a few hundred words plus
a table; *medium* = full section treatment; *full* = complete article with
several sections.

## Summary table

| Proposed topic | Recommendation | Where | Findings | Reason |
|---|---|---|---|---|
| Hypospadias primary/redo repair (pediatric operative atlas) | **Create** — full article | new, `04a-urethral-reconstruction/` | AMGUS-004-003, HINMAN5-127-002, HINMAN5-128-001, SURGURO-020/021/022/023/024/025-001, TRUS08-049-001, TRUS08-049-002, TRUS08-050-001 (12) | 5 source books converge on one real gap; existing `hypospadias-epispadias.mdx` is adult/lifelong-care only, no pediatric operative sequence anywhere on site |
| Isolated male epispadias + functional/incontinent epispadias repair | **Fold** | `05f-lifelong-care/bladder-exstrophy-epispadias.mdx` — new Operative Technique subsection | AMGUS-004-004, SURGURO-026-001 (2) | Single-author, no-outcome operative descriptions; natural home already exists and already covers epispadias at the lifelong-care level |
| Vasovasostomy / vasoepididymostomy | **Skip** | — | AMGUS-009-001, HINMAN5-111-001, TRUS08-089-001 (3) | Vasectomy reversal = fertility restoration, explicitly out of WARWIKI scope (site-scope memory excludes infertility/vasectomy reversal) |
| Penile-cancer nodal surgery (sentinel node, inguinal/pelvic lymphadenectomy) | **Skip** | — | AMGUS-011-001 (1) | Primary oncologic staging/treatment, not reconstruction; Non-Negotiables excludes primary urologic oncology |
| Permanent urethral stent (UroLume) explantation + reconstruction | **Create** — short | new, `04a-urethral-reconstruction/minimally-invasive/` | AMUGRS-026-001, URETHRS-021-003 (2) | Real, if niche, gap — legacy-stent patients still present; nothing on site covers explant technique |
| Synchronous (multi-level) urethral strictures — operative sequencing | **Create** — short | new, `04a-urethral-reconstruction/` | AMUGRS-031-001 (1) | Practical planning topic with no current coverage; single retrospective series (n=30), frame accordingly |
| Pediatric urethral stricture | **Create** — medium | new, `03b-voiding-outlet/` | AMUGRS-037-001 (1) | Adult `urethral-stricture.mdx` has no pediatric content at all; natural condition-page pairing |
| Groin-defect reconstruction after inguinal lymphadenectomy | **Create** — short/medium | new, `04e-genital-reconstruction/` | AMUGRS-046-001 (1) | Reconstructive consequence of oncologic surgery (in scope); no page integrates sartorius/ALT/TFL/gracilis choice for this defect |
| Acquired vaginal stenosis/stricture repair (non-GAS) | **Create** — medium | new, `04e-genital-reconstruction/` | APAGS2020-060-002, APAGS2020-101-001 (2) | Distinct from GAS neovaginal-stenosis management and from LS-specific perineoplasty; real gap for post-surgical/radiation/episiotomy scar |
| Total laparoscopic hysterectomy (urogyn context) | **Fold** | `04g-prolapse-repair/apical/supracervical-hysterectomy.mdx` — Technique section (already opens with "Laparoscopic or robotic hysterectomy usually uses the same access...") | APAGS2020-114-001 (1) | Generic gyn operative steps, not urogyn-distinctive; route selection and outcomes already covered in `vaginal-hysterectomy.mdx` and here |
| Implanted pudendal neuromodulation | **Create** — short | new, `04f-incontinence-procedures/procedures/` | FGPFR-015-001 (1) | Distinct from SNM/PTNS/PFES, which are the only stimulation modalities currently covered; real device/technique gap |
| Laparoscopic pudendal nerve decompression | **Create** — short/medium | new, `03h-pelvic-pain/` | FGPFR-019-002 (1) | `chronic-pelvic-pain.mdx` only lists decompression as an option; no technique page anywhere |
| Ureterocele / ectopic ureter (combine with URETER-005-001 below) | **Create** — full article, single combined page | new, `03e-upper-tract/` | HINMAN5-039-001, TRUS08-023-001, CWW13-052-001, CWW13-052-003, URETER-005-001 (5) | No dedicated condition page exists at all; two separate proposals in the batch (`ureterocele-ectopic-ureter.mdx` and `ureterocele.mdx`) cover the same ground and should become one page, not two |
| Enterocele purse-string bowel-check maneuver | **Fold** (page already exists) | `04g-prolapse-repair/posterior-enterocele/moschcowitz-procedure.mdx` | HINMAN5-085-001 (1) | The proposed path omitted the `posterior-enterocele/` subfolder — this page already exists on site; the finding is a small addition to it, not a new page |
| USLS + concurrent enterocele repair sequencing | **Fold** (page already exists) | `04g-prolapse-repair/apical/uterosacral-ligament-suspension.mdx` | HINMAN5-085-002 (1) | Same path artifact — this page already exists; fold the sequencing note in |
| Hysterectomy — GU injury mechanism | **Create** | new, `05a-trauma-emergencies/.../procedures-causing-gu-injury/` | MCFPS-006-001 (1) | Explicitly named in the parent index's own "Planned additions" list; matches the `cesarean-section.mdx` precedent exactly |
| Pelvic tumor resection (non-gyn/ovarian cytoreduction/recurrent sidewall) — GU injury mechanism | **Create** — medium (can combine the 3 sub-scenarios into one page) | new, same family | MCFPS-026-001, MCFPS-034-001, MCFPS-039-001 (3) | Fits the established pattern even though not on the explicit planned list; add it to that list too |
| Radical hysterectomy & pelvic lymphadenectomy — GU injury mechanism | **Create** | new, same family | MCFPS-032-001, MCFPS-033-001 (2) | Explicitly named in the parent index's "Planned additions" list |
| Pelvic/perineal flap postoperative care (positioning, drains, salvage) | **Create** — medium | new, `01-foundations/surgical-principles/flaps/` | MCFPS-041-001, PERIREC-008-001, PERIREC-009-002, PERIREC-010-002 (4) | Cross-cutting gap — VRAM/gracilis/lotus-petal/IGAP/PAP pages each handle postop care separately with no shared reference; 2 source books converge |
| Neurogenic bowel (consolidated) | **Create** — medium | new, `03i-defecatory-disorders/` | NEUROURO-018-001 (1) | Currently scattered across SCI/spina-bifida/fecal-incontinence pages with no integrated reflex-phenotype/bowel-program overview |
| Sacral anterior root stimulation (Brindley) | **Fold** | `03d-nlutd/nlutd-spinal-cord-injury.mdx` — expand the existing Brindley/SARS bullet | NEUROURO-024-001 (1) | Already has a sourced paragraph on this page (same pattern as the already-adopted CWW13-115-001 finding there); device is niche/largely historical in US practice — doesn't clear the bar for a standalone procedure page |
| Glans-preserving dorsal-inlay BMG urethroplasty (De Win) | **Create** — short (lowest priority of the urethral-technique group) | new, `04a-urethral-reconstruction/meatal-perineal/` | SURGURO-036-001 (1) | Fits the site's existing pattern of narrow named-technique pages in this folder; evidence is thin (single-author, no technique-specific outcomes) — flag that clearly on the page |
| Female external urine-collection devices (PureWick-type) | **Create** — short | new, `04f-incontinence-procedures/procedures/` | TFUUG1-044-001 (1) | Parallels the existing `condom-catheters.mdx`; no female-specific external-collection page exists |
| Vestibulectomy for refractory vestibulodynia | **Create** — short/medium | new, `04e-genital-reconstruction/` | TFUUG1-066-002 (1) | Vestibulodynia diagnosis/nonsurgical treatment already well covered on `chronic-pelvic-pain.mdx`; the surgical escalation step is the missing piece |
| Multidisciplinary pelvic-floor review / referral pathways | **Skip** | — | TFUUG1-067-001 (1) | Administrative/service-model content (which disciplines, when to refer), not anatomic/operative; evidence is a single guideline plus tertiary-unit service reports, not outcome data; a one-line pointer in an existing page is enough if wanted |
| Female readjustable slings (REMEEX/SAFYRE) | **Fold** | `04f-incontinence-procedures/female-sui/female-stress-incontinence-database.mdx` — expand the existing REMEEX paragraph | TFUUG2-076-002 (1) | REMEEX in women is already substantially covered (205-patient series, EAU 2026 restriction); SAFYRE T crossover salvage is an uncontrolled 16-woman series — add a sentence, not a page |
| CESA/VASA (cervicosacropexy/vaginosacropexy) | **Create** — short | new, `04g-prolapse-repair/apical/` | TFUUG2-104-001 (1) | Fits the established pattern of named apical-suspension pages (pectopexy, iliococcygeus-suspension, etc.); real technique with a published series (n=71) |
| Adult vesicoureteral reflux | **Create** — short/medium | new, `03e-upper-tract/` | TLCCU-016-001 (1) | No VUR condition page exists at all (pediatric or adult) — only `ureteral-reimplantation.mdx` touches it procedurally |
| Pediatric bladder-exstrophy primary closure (staged and complete-primary-repair) | **Create** — full article | new, `04b-bladder-reconstruction/` | TRUS08-028-001, TRUS08-029-001, CWW13-043-001/002/003/004 (6) | Rich pediatric operative content (osteotomy selection, timing, cloacal-exstrophy variant, reclosure) entirely absent from the adult/lifelong-care BEEC page; 2 source books converge |
| Sigmoid neobladder (orthotopic substitution) | **Create** — short/medium | new, `04c-urinary-diversion/` | TRUS08-041-001 (1) | Strong fit with the existing atlas pattern of ~15 named diversion/pouch pages; distinct operation from the existing sigmoid *augmentation* cystoplasty page |
| Urethral duplication | **Create** — short (consider combining with megalourethra below, same source chapter/pages) | new, `05f-lifelong-care/` | TRUS08-051-001 (1) | Genuine gap; only tangentially touched by fistula-differential-diagnosis pages |
| Megalourethra | **Create** — short (consider combining with urethral duplication above) | new, `05f-lifelong-care/` | TRUS08-051-002 (1) | Genuine gap; fits the existing rare-congenital-condition pattern (prune-belly, PUV, etc.) |
| Secrest single-stage scrotal island flap urethroplasty | **Create** — short (lowest priority of the flap group) | new, `04a-urethral-reconstruction/flap/` | TRUS08-058-001 (1) | Distinct from the existing Turner-Warwick two-stage inlay page; single historical author's technique, thin evidence |
| Pediatric urogenital sinus / cloacal reconstruction | **Create** — full article | new, `04e-genital-reconstruction/` | TRUS08-073-002, CWW13-060-002 (2) | Real gap the DSD and ARM pages already point toward; rich technique content (confluence-based planning, TUM/PUM selection, PSARVUP) |
| Congenital penile curvature / chordee without hypospadias (clinical overview) | **Create** — short | new, `03g-genital-scrotal/` | TRUS08-081-001 (1) | `tunica-plication.mdx` already covers the operative side including congenital cases; this is the missing diagnostic/classification condition page to pair with it |
| Ureterocele (standalone) | **Merge** | folded into the combined ureterocele/ectopic-ureter page above, not a separate page | URETER-005-001 (1) | Duplicate scope with the HINMAN5/TRUS08/CWW13 proposal — one page, not two |
| Pediatric bladder-bowel dysfunction | **Fold** | `03b-voiding-outlet/dysfunctional-voiding.mdx` — expand the existing BBD paragraph | CWW13-047-001 (1) | Page already carries a sourced BBD/bowel-first paragraph; broadens it rather than duplicating a new condition page for what is fundamentally the same entity |
| Bladder diverticula (adult, acquired) | **Create** — short/medium | new, `03b-voiding-outlet/` | CWW13-122-001 (1) | No dedicated condition page; pairs naturally with the diverticulectomy procedure page below (same pattern as urethral-stricture + urethroplasty) |
| Bladder diverticulectomy (procedure) | **Create** — short/medium | new, `04b-bladder-reconstruction/` | CWW13-124-001 (1, from `verdicts/c02.md`) | Already flagged by the auditor as worth a page and deferred only by the no-new-pages rule; pairs with the condition page above |
| Urine leak after partial nephrectomy | **Fold** | `05a-trauma-emergencies/renal-trauma.mdx` — expand the existing urine-leak/urinoma bullet to cover the non-traumatic, post-partial-nephrectomy scenario | CWW13-141-001 (1) | Narrow, single-source management algorithm; the page already has a urine-leak framework that can be broadened rather than duplicated |

## "Create page" candidates, in priority order

High confidence — multi-source convergence, clear gap, rich content:

1. **Hypospadias primary/redo repair** (`04a-urethral-reconstruction/`) — 12 findings, 5 books
2. **Pediatric bladder-exstrophy primary closure** (`04b-bladder-reconstruction/`) — 6 findings, 2 books
3. **Pediatric urogenital sinus / cloacal reconstruction** (`04e-genital-reconstruction/`) — 2 findings, 2 books
4. **Pelvic/perineal flap postoperative care** (`01-foundations/surgical-principles/flaps/`) — 4 findings, 2 books
5. **Ureterocele / ectopic ureter** (combined page, `03e-upper-tract/`) — 5 findings, 4 books

Good single-source gaps, real content, worth building:

6. **Adult vesicoureteral reflux** (`03e-upper-tract/`)
7. **Bladder diverticula** (condition, `03b-voiding-outlet/`) + **bladder diverticulectomy** (procedure, `04b-bladder-reconstruction/`) — build as a pair
8. **Pediatric urethral stricture** (`03b-voiding-outlet/`)
9. **Sigmoid neobladder** (`04c-urinary-diversion/`)
10. **Acquired vaginal stenosis repair** (`04e-genital-reconstruction/`)
11. **Vestibulectomy** (`04e-genital-reconstruction/`)
12. **Groin-defect reconstruction after ILND** (`04e-genital-reconstruction/`)
13. **Implanted pudendal neuromodulation** + **laparoscopic pudendal nerve decompression** (`04f-incontinence-procedures/` and `03h-pelvic-pain/`)
14. **CESA/VASA** (`04g-prolapse-repair/apical/`)
15. **Congenital penile curvature** (`03g-genital-scrotal/`)
16. **Neurogenic bowel** (`03i-defecatory-disorders/`)
17. **Hysterectomy** and **radical hysterectomy & pelvic lymphadenectomy** GU-injury pages (`05a-trauma-emergencies/.../procedures-causing-gu-injury/`) — already on the parent index's planned list
18. **Pelvic tumor resection** GU-injury page (same family, not yet on the planned list — add it)

Lower priority — thin evidence or narrow niche, but no existing coverage:

19. Permanent urethral stent (UroLume) explantation
20. Synchronous urethral strictures
21. Female external urine-collection devices
22. Urethral duplication / megalourethra (rare-condition reference pages; consider one combined page)
23. Secrest scrotal island flap
24. Glans-preserving dorsal-inlay BMG urethroplasty (De Win)

## Skip

- **Vasovasostomy/vasoepididymostomy** — out of scope (fertility restoration)
- **Penile-cancer nodal surgery** — out of scope (primary oncology)
- **Multidisciplinary pelvic-floor review/referral pathways** — administrative content, thin evidence, doesn't fit the site's operative/anatomic focus

## Fold into existing pages (not new pages)

- Isolated male epispadias + functional/incontinent epispadias repair → `bladder-exstrophy-epispadias.mdx`
- Total laparoscopic hysterectomy technique → `supracervical-hysterectomy.mdx`
- Enterocele purse-string bowel-check maneuver → `moschcowitz-procedure.mdx` (**page already exists** — the batch's proposed path just omitted the `posterior-enterocele/` subfolder)
- USLS + enterocele sequencing → `uterosacral-ligament-suspension.mdx` (**page already exists** — same path artifact, omitted `apical/`)
- Sacral anterior root stimulation (Brindley) → `nlutd-spinal-cord-injury.mdx`
- Female readjustable slings (REMEEX/SAFYRE) → `female-stress-incontinence-database.mdx`
- Pediatric bladder-bowel dysfunction → `dysfunctional-voiding.mdx`
- Urine leak after partial nephrectomy → `renal-trauma.mdx`

## Notable finding

Two proposed "new pages" in the batch — `moschcowitz-procedure.mdx` and
`uterosacral-ligament-suspension.mdx` — are not new at all: both already
exist on the site at `posterior-enterocele/moschcowitz-procedure.mdx` and
`apical/uterosacral-ligament-suspension.mdx`. The batch's `target_file`
paths omitted those subfolders, which made the consolidation script treat
them as missing. The two findings attached to them (HINMAN5-085-001,
HINMAN5-085-002) are ordinary fold-in additions to existing pages, not page
proposals — worth checking whether other batches have the same subfolder-path
artifact before trusting their "new page" groupings at face value.

## User decision (September 30, 2026)

The user asked that new pages not be pediatric pages and chose **adult +
adult-framed**:

- **Build (16 adult pages):** bladder diverticula (condition) and bladder
  diverticulectomy (procedure); sigmoid neobladder; acquired vaginal stenosis
  repair; vestibulectomy; groin-defect reconstruction after inguinal node
  dissection; implanted pudendal neuromodulation; laparoscopic pudendal nerve
  decompression; CESA/VASA; neurogenic bowel; pelvic and perineal flap
  postoperative care; GU injury during hysterectomy, radical hysterectomy and
  pelvic tumor resection; adult vesicoureteral reflux.
- **Build, written for adult patients (3 pages):** redo hypospadias in
  adolescents and adults (primary pediatric repair as background only);
  ectopic ureter and ureterocele in adults; congenital penile curvature.
- **No standalone page; short "what the adult surgeon inherits" context on
  existing lifelong-care pages:** bladder-exstrophy primary closure,
  pediatric urogenital sinus and cloacal reconstruction, pediatric urethral
  stricture, urethral duplication and megalourethra.
- **Not now:** the five thin-evidence niche pages (UroLume explantation,
  synchronous strictures, Secrest flap, glans-preserving BMG, female
  external collection devices).
- Folds into existing pages and the out-of-scope skips proceed as listed
  above.
