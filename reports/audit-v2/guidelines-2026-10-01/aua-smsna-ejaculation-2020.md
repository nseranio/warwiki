# AUA/SMSNA Disorders of Ejaculation — 2020 guideline check

Date: 2026-10-01. Source: `reports/audit-v2/sources-local/dl-2026-10-01/aua-smsna-ejaculation-2020.txt`; journal publication: Shindel 2022, *J Urol* 207(3):504–512.

**Access limit:** the supplied four-page website-print PDF/extraction has collapsed Discussion panels. References below to p1/p2 use that print PDF's pagination, not an unabridged guideline. Statement text and definitions were checked; absent discussions, dose tables and procedure-specific outcomes were not cleared.

## Pages edited and claim → fix → location

| Page path | Claim → fix | Guideline location / citation |
|---|---|---|
| `docs/01-foundations/anatomy-physiology/urinary-tract/male-urethra.mdx` | Rhabdosphincter propels semen → pudendal-driven bulbospongiosus/ischiocavernous contractions. Alpha-blocker dry ejaculation and prostate operations all equated with bladder-neck incompetence → distinguish reduced/absent antegrade ejaculation from urine-directed retrograde flow; preserve sexual-function/fertility counseling. | p1, Sexual Response Cycle, lines 205–228 and 274–284; Other Ejaculatory Disorders, lines 397–417. Added ref20. |
| `docs/01-foundations/anatomy-physiology/genitalia/prostate-seminal-vesicle.mdx` | “Emission and bladder-neck-closure phases” → closure occurs within emission. Primary citation added to the dry-versus-retrograde distinction, separately from EAU procedure outcomes. | p1, Sexual Response Cycle and Other Ejaculatory Disorders. Added ref19. |
| `docs/01-foundations/pharmacology/voiding-outlet/alpha-agonists.mdx` | Alpha-blocker effects all described as retrograde ejaculation → define true retrograde flow; reduced/absent antegrade output alone does not establish it. Retained EAU sympathomimetic options and study regimens. | p1, Sexual Response Cycle; Other Ejaculatory Disorders. Added ref18. |
| `docs/01-foundations/pharmacology/neuropathic-pelvic-pain/snris.mdx` | Incomplete first-line summary and “2022 guideline” → 2020 guideline, published 2022; exact daily SSRI/on-demand clomipramine or available dapoxetine/topical-anesthetic list, Strong/Grade B. SNRI absence scoped to that list. | Statement 9. Reused verified ref39; primary citation attached to its recommendation. |
| `docs/01-foundations/pharmacology/neuropathic-pelvic-pain/gabapentinoids.mdx` | “Not in current PE guidelines” → pregabalin absent from AUA/SMSNA 2020 first-line list; preserve investigational trial and adverse-effect discussion. | Statement 9, Strong/Grade B. Added ref47. |
| `docs/01-foundations/pharmacology/sexual-medicine-andrology/pde5-inhibitors.mdx` | EAU-only PE recommendation context → add AUA comorbid-ED treatment, Expert Opinion, and its different first-line PE list, Strong/Grade B. Retain EAU 2026 strong recommendation for PDE5 inhibitors in PE without ED. | Statements 12 and 9. Added ref49; existing EAU ref17 retained. No AUA prohibition inferred. |
| `docs/04-surgical-techniques/04m-bph-male-luts/turp.mdx` | “Destruction” of the bladder-neck mechanism → impaired closure during emission permits bladder-directed semen flow; orgasm usually persists, with possible qualitative change. | p1, Other Ejaculatory Disorders, lines 397–401. Added ref27 beside secondary ref26. |
| `docs/04-surgical-techniques/04j-sexual-dysfunction/psychosexual-therapy.mdx` | 2022 edition label → 2020, published 2022. Added primary-guideline support for combined behavioral/pharmacological PE therapy beside existing combined-treatment evidence. Referral remains “consider,” Moderate/C. | Statements 8 (Moderate/C) and 13 (Moderate/B). Reused verified ref6. |
| `docs/04-surgical-techniques/04j-sexual-dysfunction/li-eswt.mdx` | Experimental PE section had only later secondary reviews → add the general AUA alternative-therapy insufficient-evidence position, without calling it a shockwave-specific recommendation. Preserve later review results. | Statement 14, Expert Opinion. Added ref44. |
| `docs/03-clinical-conditions/03b-voiding-outlet/primary-bladder-neck-obstruction.mdx` | Uncited general bladder-neck-incision ejaculatory risk → attach primary guideline only to that sentence. | p1, Other Ejaculatory Disorders. Added ref28; no citation attached to sperm banking or outcome rates. |

## Pages confirmed without change

These are bounded confirmations, not whole-page or later-source clearance.

- `docs/01-foundations/pharmacology/neuropathic-pelvic-pain/local-anesthetics.mdx` — existing first-line topical-anesthetic/daily-SSRI/on-demand clomipramine or available dapoxetine recommendation and Strong/B label match Statement 9; ref64 already present.
- `docs/01-foundations/pharmacology/voiding-outlet/alpha-blockers.mdx` — distinguishes dry antegrade output from proven retrograde flow; consistent with p1 physiology/definitions. Agent-specific mechanisms and rates are not settled by this extraction.
- `docs/03-clinical-conditions/03h-pelvic-pain/chronic-pelvic-pain.mdx` — ejaculatory pain/pelvic-pain association matches p1 Other Ejaculatory Disorders; diagnostic treatment detail remains with the CPP guideline.
- `docs/03-clinical-conditions/03d-nlutd/nlutd-spinal-cord-injury.mdx` — separates retrograde ejaculation from failed emission; compatible with p1 definitions. PVS/EEJ, post-ejaculatory urine testing and fertility outcomes remain outside this check.
- `docs/03-clinical-conditions/03b-voiding-outlet/bladder-outlet-obstruction.mdx` — general alpha-blocker/5-ARI ejaculatory effects match p1 Sexual Response Cycle; comparative procedure rates remain outside this check.
- `docs/04-surgical-techniques/04m-bph-male-luts/tuip.mdx` — bladder-neck-incision ejaculatory risk compatible with p1 Other Ejaculatory Disorders; rates and preservation technique require their own sources.

## Citations and DOI check

One distinct guideline DOI, copied from the supplied “To cite” line:

`python3 scripts/audit/pubmed.py doi 10.1097/JU.0000000000002392` → **PMID 34961344**; **Shindel AW**, **2022**, title, *J Urol* **207(3):504–512** match.

Added eight reference entries: male-urethra 20; prostate-seminal-vesicle 19; alpha-agonists 18; gabapentinoids 47; PDE5 inhibitors 49; TURP 27; LI-ESWT 44; PBNO 28. Reused SNRI 39 and psychosexual 6; confirmed local-anesthetic 64. Numbering remains contiguous.

## Settled / still open

- **Settled:** propulsion muscles and emission-phase closure; dry/retrograde distinction; exact first-line PE agents and strength; PE referral/combined-therapy grades; general alternative-therapy wording; attribution of both AUA and EAU PDE5 positions.
- **Still open:** missing numbered Discussions and dose tables; SNRI dose/efficacy details (existing doses corroborated by the [journal publisher's indexed text](https://www.auajournals.org/doi/10.1097/JU.0000000000002392), but not present in the supplied extraction); alpha-blocker-specific emission mechanisms; oral DE drug risk/benefit details; pregabalin mechanism and trial details; later shockwave PE studies; procedure-specific ejaculation rates/preservation outcomes and retrograde-ejaculation drug efficacy/doses. Earlier page-specific open items are retained in each status note.
- **Search scope:** no standalone PE, DE, anejaculation, anorgasmia, retrograde-ejaculation, hematospermia or ejaculatory-pain page found. Remaining BPH procedure/device/instrument hits describe rates or techniques this source does not settle; congenital-condition fertility data, female orgasm, unrelated ED treatment and bibliography-only hits were excluded. No new pages created.

## Decisions for the user

- Expanded guideline discussions: recommend obtaining the unabridged PDF before closing dose, second-line PE drug and DE pharmacotherapy details. No treatment-selection conflict requires adjudication in this pass.

## Validation / records

- `npm run lint:citations` — PASS, 1,206 files.
- `npm run lint:links` — PASS, 1,206 files.
- Scoped `git diff --check` — PASS.
- Focused source/citation review — PASS; clarified that Statement 9's grade applies to its positive first-line list, not to pregabalin's omission.
- All 10 edited and 6 confirmed pages recorded `checked` with guideline-bounded notes and earlier notes preserved.
- No build, commit, push or git write command run; existing unrelated edits retained.
