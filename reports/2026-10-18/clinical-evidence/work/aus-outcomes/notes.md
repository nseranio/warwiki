# aus-outcomes (AUSCO) notes

## Sources opened
- Primary report: Kaufman MR et al., J Urol 2026;215(2):194-202, doi 10.1097/JU.0000000000004796, PMID 41042705, PMC12794701. FULL TEXT read online (PMC JATS XML via NCBI efetch, including Tables 1-5). No local copy exists (searched reports/audit-v2/sources-local, Downloads, Medicine; only the owner's journal-club slide deck `/Users/joyboy/Documents/Medicine/Urology/Fellowship/My Presentations/AUSCO JC.pptx` was found and not used). `source.file` is therefore null. Supplementary tables (jurology.com) not opened; no value in the file comes from them. The PMC text has no PDF page numbers; locators use table numbers and section names.
- Radiotherapy subgroup: Chandrasekhar V et al., Neurourol Urodyn 2026;45(7):1357-1365, doi 10.1002/nau.70321, PMID 42226712, PMC13481893. FULL TEXT (PMC XML), Tables 1-5.
- Emotional health: Peterson AC et al., Urology 2026;207:227-232, doi 10.1016/j.urology.2025.09.037, PMID 41043618. ABSTRACT only (PubMed/Europe PMC).
- Toileting habits: Wood HM et al., Eur Urol Focus 2026;12(2):248-255, doi 10.1016/j.euf.2025.11.001, PMID 41314869. ABSTRACT only (PubMed/Europe PMC).
- Sexual quality of life: Jones L et al., J Sex Med 2026;23(6):qdag144, doi 10.1093/jsxmed/qdag144, PMID 42184104. PubMed has no abstract; numbers come from the publisher page (academic.oup.com/jsm/article/doi/10.1093/jsxmed/qdag144/8692734) read through WebFetch, which returns a model-generated summary, not verbatim text. Marked `level: abstract`; the percentages recompute from the stated n/N (39/90, 11/90, 4/8, 2/8) but the P values and wording should be rechecked against the article. Online date 2025-05-25 is Crossref `published-online`; the issue date is 2026-05-11.
- DOIs, titles, volumes, pages and author lists for all five reports were checked on Crossref and PubMed. Urology epub date (2025-10-01) is PubMed's epubdate; Crossref lists only the January 2026 issue.

## Reports left out
- None found beyond these. PubMed search ("AUSCO", "Artificial Urinary Sphincter Clinical Outcomes Trial", Kaufman/Wood/Terlecki) returned only the five above. No long-term (beyond 12 months) AUSCO report was found.

## Decisions
- Guidelines and approvals section omitted: the AUA/GURS/SUFU incontinence after prostate treatment 2024 guideline (local copy `aua-ipt-2024-unabridged.txt`) predates the publication and does not cite AUSCO (grep for AUSCO: no match). No EAU or other local guideline cites it. No FDA statement is needed (study used standard-of-care AMS 800 implants).
- Verdict `descriptive` (single-arm against a performance goal); the primary result has `met: true` against the prespecified 65% goal.
- One relation, `parallel` to `master`, justified by the shared comparator device question; MASTER details were not asserted (not read).
- The Urology emotional-health report (online 2025-10-01) precedes the primary report (2025-10-03) by two days, so it is listed first in `reports` (lint requires date order).

## Disagreements with other WARWIKI pages
No numeric disagreements with the source. Minor items:
- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx` line 149 and `docs/01-foundations/tools/biomaterials/prosthetics/artificial-urinary-sphincter.mdx` line 64: "serious device-related event" / "adjudicated device- or procedure-related" for the 10 (8.7%); the source term is serious adverse device effect (device or procedure related, Table 3). Equivalent.
- Reference titles on the procedure page (ref12), the male SUI database page (ref4) and the foundations page differ from the published title "The Artificial Urinary Sphincter Clinical Outcomes Trial: Primary Results" (they insert "(AUSCO)" or write "Trial (AUSCO): primary results"); the procedure page ref12 says "Clinical Outcomes (AUSCO) trial".
- `docs/07-roots/surgeons/h-r/melissa-kaufman.mdx` line 41: "Led the prospective multicenter AUSCO study"; the source shows Kaufman as first and corresponding author and Peterson as last author; "led" is not stated in the paper.
- Prior-radiotherapy detail: the primary report lists 23 external beam and 2 brachytherapy; the radiotherapy paper says 23 had radiotherapy as adjuvant therapy and 2 as primary therapy and that 2 received brachytherapy. The page uses each as written.

## Disagreements with the old Journal Club record
- None in numbers (94% 91/97, 60% 61/101, 15% serious, 8.7% serious device-related, 7.8% revisions with mechanical 3 and erosion 2, none for infection all match Tables 2-3). The record omits the 65% performance goal, the worst-case 79% analysis, 17 sites, the United States and Australia, and the exclusion of prior radiation until protocol version C. "Industry-sponsored" is accurate (Boston Scientific supported the study; two authors are affiliated with it). Year 2026 is the issue year; online 2025-10-03.

## Not verified
- Supplementary Tables 1-6 and Figure 1 (jurology.com).
- Full texts of the Urology, Eur Urol Focus and J Sex Med papers.
- Whether the two Boston Scientific-affiliated authors are employees (the paper lists the affiliation only; the page says "affiliated").
