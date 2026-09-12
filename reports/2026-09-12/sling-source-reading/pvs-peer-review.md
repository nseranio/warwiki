# Independent peer review of revised PVS and fascia pages

Date: 2026-09-12. Read-only clinical/editorial review; no site files changed.

## Complete current MDX reading scope and hashes

Every character of all three files, including front matter and every reference entry, was read in untruncated outputs. PVS was read as contiguous slices [0:12000] and [12000:22867]; each companion was read in one complete output. Hashes were rechecked after reading and remained unchanged.

| File | Characters | Bytes | SHA-256 |
|---|---:|---:|---|
| `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/autologous-pubovaginal-sling.mdx` | 22,867 | 22,895 | `d23eebd94133ee7f600f278c85e1c337cc34f502ca8e69dcdf20ac9ae24ba415` |
| `docs/01-foundations/tools/biomaterials/autologous-tissue/rectus-fascia.mdx` | 14,711 | 14,725 | `2fab345e548748c87a5e3975cd0747fd106e2723a79f4f05d8498a9e3462bcae` |
| `docs/01-foundations/tools/biomaterials/autologous-tissue/fascia-lata.mdx` | 13,183 | 13,207 | `4959341f0a290ed8fab5b0875477c6f15d7217cb6c9a978ce6bcab1e46b0249e` |

## Actionable findings

### P2 — Separate satisfaction from cumulative survival estimates in the rectus-fascia E-SISTEr row

**Location:** `rectus-fascia.mdx:34`.

The row gives five-year composite continence of 30.8% versus 24.1%, then satisfaction of 83% versus 73%, then says “These are cumulative survival estimates that retain prior failure.” This can incorrectly classify the immediately preceding satisfaction percentages as cumulative survival estimates. E-SISTEr uses Kaplan–Meier estimation for continence, whereas Table 2 reports satisfaction at the five-year visit among respondents: 148/179 sling and 126/172 Burch. The categories must remain separate.

**Suggested replacement for the affected sentences:** “The five-year cumulative composite continence estimate was 30.8% after sling versus 24.1% after Burch; these estimates retain prior failure and do not represent cross-sectional dryness. At the five-year visit, satisfaction was 83% (148/179) versus 73% (126/172) among respondents.” Preserve the subsequent changed-endpoint and preferential-enrollment cautions.

Basis: complete original E-SISTEr main and actual four figures previously read; Table 2 and the Kaplan–Meier paragraph rechecked during this review in `/tmp/tools-PMC3586411-read.txt`.

### P3 — Remove discussion of rejected instructions from the public operative sequence

**Location:** `autologous-pubovaginal-sling.mdx:51–52`.

The text about a generic long-clamp instruction being insufficient, and the quotation “catheterize every perforation,” read as comments on an earlier draft. Their clinical cautions are reasonable, but the public operative sequence should state the intended actions directly.

**Suggested edit:** finish step 3 after the technique-dependent guidance sentence; finish step 4 with “Management of an injury depends on its location and extent.” Keep controlled passage, cystourethroscopy and reassessment after a revised passage. This is editorial, not an identified unsafe instruction in the revised version.

## Checks without further actionable findings

- PVS distinguishes the traditional bladder-neck operation from modified midurethral operations; Asfour's 6-cm skin incision and approximately 1 × 8-cm graft are now correctly separated.
- AUA fixed-urethra guidance, concurrent urethral-repair restrictions, remote healed surgery and intentionally obstructing salvage procedures retain appropriate distinctions. The text does not turn expert recommendations into comparative trial superiority.
- SISTEr cumulative outcomes, hypermobility inclusion and Burch comparator are explicit in PVS. E-SISTEr selection and changed endpoint are identified. Khan distinguishes dry/improved from completely dry; Nair correctly identifies 107 of 165 original participants and does not label satisfaction as dryness.
- The Cochrane row preserves the February 2017 incorporated-search cutoff, 34 trials/3,244 women, 458-woman medium-term MUS comparison, OR rather than RR, and heterogeneous traditional materials. It does not export the review's unresolved unit, labeling or denominator errors, nor infer equivalence from nonsignificance.
- The registry passage distinguishes 41,533 total cases from only 160 rectus and 81 fascia-lata cases, preserves missing variables, and avoids causal donor-site superiority.
- Both companions preserve free-graft versus vascularized-flap and autologous versus processed-allograft distinctions. No additional actionable factual contradiction was identified within this review's verified source basis.

## Source scope and limitations

This review used the previously personally read full original E-SISTEr main/four figures, full SISTEr author-rehosted main (actual figures still not personally inspected), full Asfour main (video unread), full Hong registry main (supplement unread), relevant complete AUA 2023 guideline pages, the complete original two-page ICS Khan conference report, and the independently viewed actual Nair flow figure. The current-access checks are recorded in `/tmp/warwiki-sling-current-evidence.md`.

For Cochrane, this reviewer personally read the first 120,000 characters earlier, and during peer review read the complete three complementary text-segment reports plus the complete first-half figure report and the clinical findings/limits of the second-half figure report (through the start of its asset-hash inventory). These team reports do not become personal original-trial or actual-figure reads. No blocked retrieval was repeated. Other cited donor-site, prolapse, penile, salvage and adjustment studies are not promoted to personally completed full reads by this peer review. No global clinical sign-off, page-source-completeness claim, diagram visual verification or build verification is implied.
