# ginsberg-ndo notes (2026-10-18)

## Sources opened

| Source | Where | Level |
|---|---|---|
| Ginsberg 2012 J Urol 187:2131, DOI 10.1016/j.juro.2012.01.125, PMID 22503020 | Europe PMC REST record (abstract); Crossref metadata (authors, volume, pages); Unpaywall: closed access, no OA copy; not in PMC; no local copy found (grep of `reports/audit-v2/sources-local`, `~/Documents/Medicine`, `~/Downloads`) | abstract only |
| Kennelly 2017 Neurourol Urodyn 36:368, DOI 10.1002/nau.22934, PMID 26607743 (epub 2015-11-24) | Europe PMC abstract + Crossref. The CC BY-NC full text on Wiley returned 403 to curl/WebFetch and a Cloudflare challenge in the browser pane; not bypassed | abstract |
| Rovner 2016 J Urol 196:801, DOI 10.1016/j.juro.2016.04.046, PMID 27091236 | Europe PMC abstract + Crossref | abstract |
| Cruz 2011 Eur Urol 60:742, DOI 10.1016/j.eururo.2011.07.002, PMID 21798658 (replicate trial, NCT00461292) | Europe PMC abstract + Crossref | abstract |
| ClinicalTrials.gov NCT00311376 (study 191622-515, Allergan, enrollment 416, phase 3) | clinicaltrials.gov API v2 | registry record |
| BOTOX prescribing information (revised 11/2023) | local `reports/audit-v2/sources-local/pdfs-2026-10-06/label-botox.pdf` / `.txt`: sections 2.3, 5, 6.1, 14.1 (Tables 12, 13, 16; NDO-3) | full text |
| FDA approval letter BLA 103000/5232, August 24, 2011; 2011 label | accessdata.fda.gov (`appletter/2011/103000s5232ltr.pdf`, `label/2011/103000s5232lbl.pdf`), downloaded to scratch | full text |
| AUA/SUFU NLUTD guideline 2021 | local `aua-sufu-nlutd-2021-unabridged.txt` (statements 40-42, supporting text, ref 249 = Ginsberg 2012, MS exacerbation rates, "DIGNITY trials") | full text |
| EAU Neuro-Urology limited update March 2026 | local `eau-neuro-urology-2026.txt` (3.4.2.e.6-7; ref 332 = Ginsberg) | full text |
| Crossref for AUA/SUFU treatment paper DOI 10.1097/JU.0000000000002239 | api.crossref.org | metadata |

Could not open: the Ginsberg 2012 full text (paywalled, no local copy) and the Kennelly 2017 full text (Cloudflare). Everything in the trial file and page that says "abstract" rests on the PubMed abstract text. `met` is therefore null for the primary result, and no between-group differences, confidence intervals, baselines, PDF pages or adverse-event rates beyond those in the abstract are given. The trial's own injection technique (sites, volume, trigone, antibiotics, anesthesia) is not in the abstract, so the page gives the labeled technique and says so by attributing it to the label. Please run the full-text pass when the owner supplies the paper (J Urol 2012;187:2131-9).

## Reports included

1. Ginsberg 2012 (primary, abstract).
2. Kennelly 2017 (epub 2015-11-24): final results of the long-term open-label extension, up to six treatments / 4 years (kind `updated`, abstract).
3. Rovner 2016: year-by-year outcomes in 227 four-year completers (kind `secondary`, abstract).

The two extension abstracts say "a 52-week phase III trial" and do not name which; Kennelly 2013 states the extension integrated completers of both phase 3 trials. So the extension populations are probably not limited to this trial's patients. The page labels them "completers of a 52-week phase 3 trial", not "this trial's patients".

## Reports left out

- Cruz 2011 (replicate trial, n=275): a separate trial, not a report of this one. It appears in "In conversation" with a reference; a `cruz-ndo` trial file would be a reasonable addition.
- Kennelly 2013 Urology 81:491 (interim extension, PMID 23290144): superseded by Kennelly 2017 and Rovner 2016.
- Chancellor 2013 and other pooled analyses, Tullman 2018 (100 U in MS), FDA pediatric work: different questions or not opened.
- The FDA label's Study 1 / Study 2 efficacy tables (Table 11/12 in the 2011 label; Tables 27/28 in the current one): Study 1 (n=134 versus 146 at week 6, LOCF/ANCOVA change -19.9 versus -10.6, treatment difference -9.2, 95% CI -13.1 to -5.3) almost certainly is this trial (691 = 416 + 275; arm totals 227/223/241 = 135+92 / 132+91 / 149+92), but the label does not name investigators, so these numbers were not entered as trial results. The abstract's -21 versus -9 are unadjusted means; the label's are ANCOVA-adjusted.

## Disagreements with WARWIKI pages

No numeric disagreements. Checked against the source:

- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/intradetrusor-botox.mdx` line 39: CIC 42% / 35% / 10% (300 U / 200 U / placebo) correct for Ginsberg (abstract). The sentence cites refs 11, 12, 13 together; Cruz (ref 12) reports 12% / 30% / 42% for placebo / 200 U / 300 U, so the Ginsberg percentages rest on ref 11 alone. Line 47: 275 + 416 participants, median re-treatment 256 versus 92 days (ref 11), and 21.8 versus 13.2 for Cruz (ref 12) all match.
- `docs/03-clinical-conditions/03d-nlutd/nlutd-multiple-sclerosis.mdx` line 86: "about 21-23 vs 9", 35% / 42% / 10%, n=416: correct.
- `docs/03-clinical-conditions/03d-nlutd/nlutd-spinal-cord-injury.mdx` line 88: 256 days after 200 U in a mixed MS/SCI trial: correct (placebo 92 days; 300 U 254).
- `docs/01-foundations/pharmacology/neuromodulation-adjuncts/botulinum-toxin.mdx` line 99 and `storage-oab/botulinum-toxin.mdx` lines 59-60: 691 patients, 10% / 35% / 42%: correct.
- `docs/03-clinical-conditions/03d-nlutd/neurogenic-bladder.mdx` cites the trial as ref 12 only in the reference list (no number to check).

## Disagreements with the old Journal Club record

- `result`: "cut leaks by 21/week vs 9/week" is correct for 200 U (300 U: 23); "35% of non-catheterizing patients started CIC" is the 200 U figure (300 U: 42%; placebo 10%).
- `bottomLine` "300 U adds risk, not efficacy": the abstract says CIC initiation "appeared to increase in a dose dependent fashion" and finds no clinically relevant efficacy or duration benefit; the page states this without "adds risk".
- `guidelineImpact`: "endorsement of intradetrusor onabotulinumtoxinA 200 U" is not what AUA/SUFU 2021 statement 40 says; the statement names no dose (supporting text: no efficacy difference between 200 U and 300 U). The 200 U dose comes from the FDA label.
- `n: 416`, MS/SCI, 14 or more episodes per week, primary endpoint, DOI: correct. "Phase-3 evidence behind FDA approval": the approval letter (2011-08-24) does not cite studies; the label's clinical-studies enrollment (691) equals this trial plus Cruz. The page says only that.

## Not verified / to do

- Full-text pass: injection technique in the trial, exclusion criteria, analysis population, between-group differences and CIs, adverse-event rates and denominators, PDF pages for locators (all locators are "abstract").
- Alias "DIGNITY": taken from the AUA/SUFU 2021 text, which calls the trials it cites as refs 247 and 249 (Cruz, Ginsberg) "the DIGNITY trials"; the Ginsberg abstract itself does not use the name. Alias "Study 191622-515" is the registry's org study ID.
- `events.json` is empty; a regulatory event for the FDA approval of 2011-08-24 (url `https://www.accessdata.fda.gov/drugsatfda_docs/appletter/2011/103000s5232ltr.pdf`) and AUA/SUFU 2021 statement 40 would let `InConversation` show them.
- Validation: the trial file passes `scripts/check-clinical-evidence.mjs` in a scratch copy except `relation target does not exist: nitti-oab` (that file is not in the repo yet).
