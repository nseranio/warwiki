# Residual sample 6 (final validation): results (October 9, 2026)

Preregistered in [residual-sample-6-protocol.md](residual-sample-6-protocol.md) (`00590e64`) before any review. 60 pages drawn from 963 (sections 01–05 minus the 120 pages of samples 4 and 5), seed 20261009, revision `c39e438c`. Every page in the frame had had a full-page review. Classification: [residual-sample-6-classification.json](residual-sample-6-classification.json); statistics: `python3 scripts/quality/residual_stats.py reports/quality/residual-sample-6-classification.json`.

**Detector change.** Codex was unavailable, so Claude agents reviewed (residual brief, 6–8 pages per agent) and separate Claude agents verified. Samples 4 and 5 used Codex for both. This is a level under a different detector, not a trend.

## Deviation from the protocol

The Claude reviewers rated no finding high (0 high, 14 medium among 286 findings), and the verifiers, asked to re-rate, also rated none high. The preregistered rule counts only confirmed high-severity findings, so applied literally it gives **0 serious errors per page**. That figure reflects how the detector grades severity, not the absence of errors: the low-rated findings include a reversed guideline recommendation, a softened AUA statement, a wrong denominator and misdescribed classifications, the kinds of finding Codex rated high in samples 4 and 5.

Changes made after the reviews and before classification (no repair had been made):
1. Verifiers checked every accuracy, currency, consistency, completeness and reference finding of any severity, not only high and medium (addendum in `residual-sample-6/verify-addendum.md`). Each gave its own severity and labelled the finding error, omission, currency or other.
2. Claude classified every confirmed finding against the counting rule's own definition of a serious factual error (wrong, misattributed or overstated statement about a guideline recommendation, a clinical number, an indication, outcome or safety point, or a clinically used classification), ignoring the severity label. Excluded, as before: claims unsupported by the cited source but not shown wrong, citation placement, internal wording inconsistencies, history, navigation text and descriptive adjectives; omissions counted separately.

## Headline

| Measure | Value |
|---|---|
| Strict preregistered rule (confirmed high findings) | 0 per page |
| Confirmed errors the verifiers rated medium or high | **0.10** per page (95% CI 0.01–0.19); 6 errors on 5 pages |
| Serious factual errors by the rule's definition (primary for comparison) | **0.50** per page (95% CI 0.29–0.71); 30 errors |
| Pages with at least one | 19/60, 32% (exact CI 20–45%) |
| Consequential omissions per page | 0.63 (0.41–0.85) |
| Combined serious defects per page | 1.13 (0.80–1.46) |
| Negative audit (5 pages without a serious finding) | 0 serious errors (about 150 claims; [negatives](residual-sample-6-negatives.json)) |

Verifiers checked 121 findings (3 rejected); 91 confirmed findings described a page error, omission or currency gap. Of these, 30 were serious errors, 38 omissions or currency gaps, 1 a same-page duplicate and 22 excluded.

For reference, sample 5 (Codex, before the second full-page review of these sections) found 1.15 per page (0.75–1.55), 52% of pages. The detector changed, so the drop cannot be attributed to the site alone.

## By section

| Section | Pages | Serious errors | Pages affected |
|---|---|---|---|
| Foundations | 19 | 6 | 3 |
| Evaluation | 3 | 3 | 2 |
| Clinical Conditions | 7 | 7 | 4 |
| Treatment Atlas | 27 | 12 | 8 |
| Special Populations | 4 | 2 | 2 |

## What the errors are

Mostly guidance wording and study attribution, as before:
- **Guideline strength, direction or scope:** AUA testosterone case-finding softened from "should consider" to "may consider"; the EAU lichen sclerosus recommendation against genital skin read as a recommendation for augmentation; percutaneous tibial nerve stimulation broadened to all tibial devices; bipolar resection called "preferred" against AUA and EAU; an AUA/SUFU NLUTD statement presented as MS-specific; EAU fistula classification and cystography wording; ESMO-EURACAN said not to mention a technique it lists; SMSNA's penile dysmorphic disorder written as body dysmorphic disorder.
- **Numbers and denominators:** Besombes 169 patients written as implants; 134 of 593 abnormalities that were flowmetry/PVR only; an unsourced 86–100% PAE technical-success range; perforator positions attributed to the wrong series and territory.
- **Outcomes and indications:** McCall culdoplasty presented as acceptable for advanced prolapse against a randomized trial; an inverted urethral flap curvature rate and sensation data said not to exist; a fat-embolism case said to have no established source when the authors attributed it to intravascular injection; an endoscopic urethroplasty evidence base described as one case report when a 28-patient series exists.
- **Classifications:** Waaldijk type II subgroups and International Reflux Study grade II misdescribed.

## Caveats

- The classification step used Claude's judgement on findings that the detector itself rated low; a stricter or looser reading moves the figure between 0.10 and 0.50. The full list with reasons is in `residual-sample-6/high-confirmed.json` (ignored folder).
- One page (peritoneal pull-through vaginoplasty) was counted from its complete review (batch b09); an earlier interrupted review (b07) had left a partial file, set aside.
- Detection is imperfect and detector-dependent; these are detected-error rates.

## Repairs

123 verified edits on 48 of the sampled pages (117 from the review, 6 from the first final-text round), plus one sentence narrowed by Claude: the AFAB nullification page's "6/42 new incontinence" (Lange 2022) is not in the abstract and the full text could not be opened, so the number was removed and the paper added to `needed-from-user.md`. One veto (an upper-tract urothelial carcinoma addition on the flexible ureteroscope page; oncology is out of scope). One reference left uncited by an edit was removed (Sanyal 2021, vitamin B12 page). Two Claude final-text rounds (56 and 7 claims) confirmed every rewritten gated claim; the claim gate passes on all touched pages. Reference fixes the edit format could not carry are in [open-findings.md](open-findings.md).

## Implication

After two full-page reviews, the remaining detected errors are mostly guidance wording (strength, direction, scope) and study attribution, at roughly one page in three under a Claude detector. Guideline statements remain the most error-prone claim type; a targeted check of every AUA, EAU and SUFU statement against the local guideline copies would address the largest remaining class.
