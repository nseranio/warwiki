# Bulk restoration: targeted correction carry-forward — September 20, 2026

## Scope and method

Read all **94 distinct prior change reports associated with the 120 pages** in `content-restoration-manifest.json`, using the path/report mapping in `content-removal-inventory.json`. Compared the recovered `9e36335a` material with the relevant `2e959bbb` claim text where the reports identified a concrete correction, rather than merely an unfinished source reread. Inspected current candidate sections and all added correction text. The JSON companion records all 120 page dispositions, associated reports, and final hashes.

**Eleven pages received narrow corrections.** Their practical descriptions, historical context, references, and media remain. The other 109 pages remain recovered existing content pending review; no new full-page or full-source clinical clearance is asserted for them. This task did not touch the retractor recovery, five selective exceptions, shared audit ledgers, or handoffs, and made no commit.

## Corrections retained

| Page | Concrete correction carried forward |
|---|---|
| Halban culdoplasty | Removed the false assignment of approximately 70% success and inferiority to McCall from a trial with **no Halban arm**. Preserved its sagittal operative description. Replaced unsupported lowest-ureteral-risk rankings and fixed safe-distance implications with anatomical rationale. Kept Baessler outcomes attached to the combined sacrocolpopexy operation. |
| Moschcowitz | Kept the **vaginal-hysterectomy** trial route and 3-year posterior-enterocele endpoint (10/33 vs 2/32 with McCall). Preserved operative steps and historical recommendations, without converting them into a universal modern mandate. Clarified that ureteral visualization alone does not establish patency and that the combined-operation bowel symptoms are not a closure-specific rate. |
| aOAP flap | Kept 119-person FGM/C results as **combined-program** outcomes, with aOAP used in 36%; separated the 61-person LS series and its 53 bilateral flaps. Removed the pooled 180-person safety denominator. Identified oncologic flap meta-analysis as indirect for LS/FGM/C. Attributed proposed corticosteroid-related tissue effects to the LS authors rather than declaring a comparative risk. |
| Bipedicled anterior scrotal flap | Preserved the stage-comparison table but distinguished significant fever/no-complication findings from **non-significant infection, dehiscence, and reoperation differences**. Kept the 12 questionnaire respondents separate from the 22-person cohort. Removed a ten-year complication claim beside a mean 2.3-year series. |
| Cecil-Culp | Distinguished penile embedding from Johanson, Pierce, and Turner-Warwick operations instead of treating all as synonyms. Preserved historical variants, stages, and reports. Retained the AUA prohibition against genital skin in LS-proven urethral stricture. Scoped the zero-fistula observation to 15 boys and mean 21 months. |
| FGM/C fat grafting | Kept the 13-person prospective series explicitly uncontrolled, VASS validation specific to LS, and wider scar studies indirect. Removed an unqualified standard-of-care inference. Replaced the impossible-as-standard-FSFI 43.8→68.6 presentation with the reported qualitative improvement pending instrument/scoring verification. |
| Foldès | Kept 866/2,938 (29%) one-year follow-up beside outcome claims and in takeaways. Preserved the very-low-certainty assessment. Separated O'Dey's combined program from Foldès and clarified that mixed-procedure scoping-review aggregates are not a Foldès-specific counseling probability. |
| Genitourinary VCA | Dated the five-transplant/two-explant history to the **2023 review**, corrected fertility and comparative reoperation assumptions, stated that testes were not transplanted in the extended Hopkins allograft, and removed an inference of immune tolerance from maintenance monotherapy. Retained cases, technical descriptions, and source-specific protocols. |
| Penile replantation | Preserved urgent specialist assessment/transfer and two-bag preservation. Removed universal 8/16-hour viability limits, guarantees of uniformly good function or zero necrosis, a fixed vascular-count guarantee, and a generalized 50% recurrent-self-injury estimate from 2/4 cases. Kept microsurgical descriptions and reported adjuncts, with antithrombotic treatment individualized. Identified VCA as investigational rather than an immediate emergency substitute. |
| Lateral suspension | Preserved the 106-operated/182-planned **preliminary** noninferiority-trial status and limited follow-up, the 93-enrolled/89-completer 2024 trial scope, and lack of proven durable equivalence. Distinguished odds ratios in an older observational mesh cohort from individual absolute-risk predictions. |
| Pectopexy | Preserved cadaveric fixation findings as laboratory observations and identified uterine-status/concomitant-surgery confounding in the 23/78/69-person retrospective comparison. Retained technique, mesh options, and reported outcomes. |

## Source access and limits

The primary basis was the documented source access in the dated prior reports, not a claim to have reread every underlying article. Relevant `2e959bbb` source-labelled passages were examined against the restored versions. The Cruikshank 1999 PubMed abstract was reopened successfully on this pass and directly confirms the three arms and 3-year event counts: [PMID 10203653](https://pubmed.ncbi.nlm.nih.gov/10203653/). The current ACS guideline PDF was opened successfully at its verified URL: [ACS 2025 genitourinary injuries](https://www.facs.org/media/ya5hcu0s/genitourinary_guidelines.pdf); prior documented reading of its penile-amputation section supports the retained emergency guidance.

Attempts to reopen Baessler/LLS/VCA through PubMed/PMC returned a browser-check page, and the AUA/MDPI endpoints returned 403/429 responses. Those attempts do not count as new full-text reads. Their corrections rely on the already recorded prior source review and plainly bounded study designs, not on invented new verification.

The radial-forearm report's newly cited mixed-setting donor-site review was a possible population-extrapolation issue, but that source was not asserted in the restored baseline text; no corresponding new correction was needed in this pass. Most remaining reports document unavailable full packages and wholesale deletion, not a demonstrated factual error in every removed technical detail. They therefore do not justify renewed blanket removal.

## Remaining review boundaries

The 120 recovered pages still need normal page-by-page review. In particular, source-specific device settings, flap dimensions, small-series percentages, dose regimens, historical timing, and asserted comparative advantages should be assessed against the appropriate manufacturer, anatomical, technical, or clinical sources. **Missing RCTs alone are not a reason to remove operative teaching or manufacturer instructions.** This correction pass is not a new comprehensive literature update or a statement that the other restored claims are all current and reliable.

## Checks

- All eleven correction diffs/additions read after editing; practical content and references retained.
- Reference-anchor targets checked for the eleven files; no unresolved local citation anchors.
- Targeted `git diff --check` passed. Integrated lint/build and release validation belong to the root task.
- A global diff check initially reported trailing blank lines in fourteen other restored files; root was notified for integrated cleanup.
