# nitti-oab notes (checked 2026-10-18)

## Sources opened

| Source | Identifier | Where | Level |
|---|---|---|---|
| Nitti 2013, J Urol 189(6):2186-93 (primary) | DOI 10.1016/j.juro.2012.12.022, PMID 23246476 | PubMed XML via E-utilities (abstract). Full text is closed: Europe PMC `inEPMC: N`, Unpaywall `is_oa: false`, no local copy under `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads`. | abstract only |
| Nitti 2016, J Urol 196(3):791-800 (3.5-year extension) | DOI 10.1016/j.juro.2016.03.146, PMID 27038769 | PubMed XML (abstract). Closed access. | abstract only |
| ClinicalTrials.gov NCT00910845 (Allergan 191622-095) | API v2 JSON | Participant flow, baseline, outcome measures (arm means, SDs), adverse events (cycle 1; 278 vs 272 safety population). No p-values or TBS/continence results are posted. | registry results |
| FDA BOTOX label, Reference ID 3247784, revised 01/2013 | https://www.accessdata.fda.gov/drugsatfda_docs/label/2013/103000s5251lbl.pdf | PDF pages cited in the file (p5 section 2.3, p12 Tables 6-7, p13 Table 10, p14 Table 11, p20-21 Tables 16-17, p22 duration of response). Gives Study OAB-1 ANCOVA least-squares means, differences and CIs. | full label |
| FDA approval letter sBLA 103000/5251, 01/18/2013 | https://www.accessdata.fda.gov/drugsatfda_docs/appletter/2013/103000Orig1s5251ltr.pdf | indication wording and date | full letter |
| AUA/SUFU OAB guideline 2024 | `reports/audit-v2/sources-local/aua-oab-2024-unabridged.txt` (statements 24-26, evidence text pp32-33, reference 239 = Nitti) | local copy | full text |
| EAU Non-Neurogenic Female LUTS, limited update March 2026 | `reports/audit-v2/sources-local/eau-non-neurogenic-female-luts-2026.txt` (section 4.1.4.c.1, recommendations p34; reference 242 = Nitti) | local copy | full text |
| Crossref for 10.1016/j.juro.2012.12.022, 10.1016/j.juro.2016.03.146, 10.1097/JU.0000000000003985 | authors, volume, pages checked | | |

I also sent one request to the auajournals.org article URL for the primary paper before reading the rule that the AUA site is off limits; it returned HTTP 403 and nothing was read or used. No auanet.org page was opened.

## How the label's Study OAB-1 was matched to this trial

The label does not name its studies. Study OAB-1 (N = 278 and 272, baselines 5.5/5.1 incontinence episodes, 12.0/11.2 micturitions, 156/161 mL) matches this trial's registry safety population (278 and 272) and baseline means (5.47/5.09, 11.98/11.20, 156.4/161.1). Study OAB-2 (N = 275/269, baseline 5.7 in placebo) matches the companion trial NCT00910520 (n = 548). The effect differences and confidence intervals in the trial file come from the label's OAB-1 table; the paper itself (not read) may report different adjusted values.

## Reports

Included (2): primary 2013 report; 3.5-year extension 2016 (pooled patients from both phase 3 trials, abstract only).

Left out:
- Chapple 2013, Eur Urol 64:249 (PMID 23608668): separate companion trial, NCT00910520, n = 548; belongs to its own family if it gets one.
- Nitti 2017, J Urol 197(2S):S216-S223 (PMID 28012773): republication of the 2013 paper with an identical abstract.
- Nitti 2024 pooled analysis (Neurourol Urodyn 43:1765, PMID 38973548), Ginsberg 2017 HRQoL long-term analysis (PMID 28536084), Sievert 2014 subgroup analysis (PMID 24754838), Dmochowski 2010 phase 2 dose-ranging (PMID 20952013): not opened beyond titles; not needed for the question.

## Could not verify (full text of the primary report not opened)

- Number of sites, randomization stratification, blinding procedures, technique details actually used in the trial (anesthesia, cystoscope, volume), the exact definition of the treatment benefit scale response and complete continence, the prespecified significance level and any multiplicity handling, discontinuation reasons, and the paper's own adverse-event table. The page therefore labels technique details as FDA label instructions or as AUA guideline statements about the group of trials.
- `met: true` on the two coprimary endpoints rests on the abstract's P < 0.001 for both; I did not see the statistical plan.
- Retention: the abstract states a 5.4% rate; the registry counts 16/278 (5.8%) with the term. Both are in the file and the page states each once. The paper's denominator is unknown.
- The label's AE and catheterization tables (Tables 6, 7, 10, 11) pool this trial with the companion trial and are labelled as pooled; the diabetes and residual-volume subgroup figures are not trial-specific.
- AUA statement 26 text: the page extraction drops the comparison symbol before "100-200 mL" in the sentence on the PVR exclusion criterion of references 222, 236 and 239; the page says "threshold in the 100 to 200 mL range".
- `published` date 2012-12-14 is the PubMed electronic date (Crossref created date the same); print issue is June 2013.
- "EMBARK" alias is the PubMed collective author name ("EMBARK Study Group"); no source read states it as the trial acronym.

## Disagreements and gaps on existing WARWIKI pages (not edited)

No number on the pages below disagrees with the abstract. Items that cannot be confirmed from the abstract or the sources above:
- `docs/01-foundations/pharmacology/neuromodulation-adjuncts/botulinum-toxin.mdx` (section "Pivotal phase 3 — Nitti 2013"): "Significant improvements across urgency, frequency, nocturia, and QoL (I-QOL, KHQ)". The abstract says all other OAB symptoms improved (P <= 0.05) and quality of life improved across multiple measures (P < 0.001); it names no instruments, and nocturia is not named. Also "Most common AEs: UTI and urinary retention": in the registry's cycle 1 list, dysuria (14.4%) and bacteriuria (8.3%) were more frequent than retention (5.8%) after UTI (24.5%).
- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/intradetrusor-botox.mdx` (efficacy table): "MCC increase / MDP decrease: Not measured in Nitti's pivotal OAB trial". The registry lists no urodynamic outcome, but the full paper was not read, so absence is unconfirmed. Its note that the 2017 J Urol 197(2S) publication is a reprint is consistent with the identical abstract.
- `docs/01-foundations/pharmacology/storage-oab/botulinum-toxin.mdx`: numbers (n = 557, -2.65 vs -0.87, 22.9% vs 6.5%) match the abstract; "FDA-approved 2013 based on the Nitti and Chapple trials" is consistent with the label's two OAB studies (the approval letter itself does not name the studies).
- `docs/07-roots/surgeons/h-r/victor-nitti.mdx` calls the trial "EMBARK phase 3"; the PubMed collective author supports the name.

## Old Journal Club record

Matches the abstract on n = 557, population, comparison, week 12, -2.65 vs -0.87 (not given in the record but consistent), 22.9% vs 6.5%, 60.8% vs 29.2%, UTI as most common event, 5.4% retention, DOI. Differences: its "bottomLine" calls this "the pivotal trial" for FDA approval; the label rests on two pivotal studies (this one and the companion). Its guideline text is consistent with AUA/SUFU 2024 statements 25 (Moderate Recommendation; Evidence Level: Grade A) and 24 (Expert Opinion); the new page cites statements 25 and 26 and the EAU 2026 recommendations because those cite this trial. Its "double-blind" is supported by the label and registry (quadruple masking), not by the abstract.

## Validation

`nitti-oab.json` parses; I ran `scripts/check-clinical-evidence.mjs` on a scratch copy of the repo data with the new files added: the only errors were the missing relation target `ginsberg-ndo` (not yet in the repo) and the pre-existing `rosetta` relation to `abc`. Percentages were recounted from numerators and denominators; MDX reference markers resolve and are numbered in order of first use.
