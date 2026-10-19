# VUE notes (2026-10-18)

## Sources opened

| Source | Where | Level |
|---|---|---|
| Hemming C, et al. Health Technol Assess 2020;24(13):1-220, doi:10.3310/hta24130, PMID 32138809 | Full 256-page NIHR report PDF, https://njl-admin.nihr.ac.uk/document/download/2031996 (downloaded to the session scratch folder; no copy in the repo or the owner's folders, so `source.file` is null). Locators use the report's printed page numbers (roman numerals for the scientific summary), not PDF page numbers. | Full text |
| Same report, abstract | PMC7086306 (abstract and plain-language summary only; its full text is on NCBI Bookshelf NBK554725, which returned a reCAPTCHA challenge, so I did not use it) and the 6-page plain English summary, https://njl-admin.nihr.ac.uk/document/download/2031997 | Abstract |
| Glazener C, et al. Trials 2016;17:441 (protocol), doi:10.1186/s13063-016-1576-x, PMID 27609058 | Europe PMC full-text XML (PMC5016955) | Full text. Used for eligibility and the prespecified operations; not a results report, so it is not in `reports`. |
| Chang OH, et al. Urogynecology 2025;31(5):482-495, doi:10.1097/SPV.0000000000001667 | Local copy `reports/audit-v2/sources-local/augs-2026-09/the-role-of-uterine-preservation-at-the-time-of-pelvic-organ.txt` (Table 2 and the text of recommendation 6; VUE is its reference 43) | Full text |

DOIs and journal details for all three checked against Crossref. Dates: Crossref and PubMed give the HTA report as March 2020 only, so `published` is 2020-03-01 with `dateApprox: true`.

## Reports considered and left out

- No other results report exists. PubMed (title/abstract and author searches on Hemming, Constable, Glazener, Breeman) and Europe PMC (VUE, uterine and vault prolapse, 2019-2026) return only the HTA monograph and the 2016 protocol. The lead's "journal reports" could not be found; I did not open the 2018 ICS meeting abstract (ics.org/2018/abstract/405).
- Long-term follow-up (at least 6 years, up to 12 hoped; HTA p. 96) has not been published as far as these searches show, so the file has one report.

## Disagreements between WARWIKI pages and the source

Pages citing the trial: only `docs/03-clinical-conditions/03c-pelvic-support/apical-prolapse.mdx` (lines 83, 105; reference 15 is the HTA report). The two other hits for "VUE" are the unrelated SpaceOAR Vue device pages.

- Line 83 (vault trial, 208 women, similar 12-month symptom scores and serious adverse events, anterior stage 2b or more less frequent after abdominal repair): agrees with HTA pp. 60, 63, 67 (Tables 26, 28, 33).
- Line 105 (uterine trial, 563 women, similar 12-month symptom scores and serious adverse events): agrees with HTA pp. 30, 37 (Tables 9, 16).
- Reference 15 is correct (authors, title, journal, volume, pages, DOI).
- No disagreements found. The page does not mention the uterine-trial reoperation imbalance, the cost findings or the 12-month patient preference for hysterectomy.

## Inconsistencies inside the source (how I handled them)

1. Abstract: "563 out of 565 randomised women had uterine prolapse surgery." Chapter 4 says 563 were analyzed after 2 post-randomization exclusions, and only 215 of 280 preservation and 254 of 283 hysterectomy participants received the allocated apical operation (Table 8). I used the chapter. The same wording is used for the vault trial (208 of 209).
2. Table 16 percentages do not follow the printed N: 14/262 = 5.3% (printed 5.4%), 5/262 = 1.9% (printed 2.0%). The file and page quote the printed n (%) without a numerator/denominator pair. 16/269 = 5.9% is correct.
3. The serious-event effect 0.82 (0.38 to 1.75) is a "risk ratio" in the abstract and an odds ratio in the Table 16 footnote; the file gives the number without a type.
4. Vault cost-effectiveness: the Chapter 8 text gives £285,000 per QALY, but Table 35 gives £142,500 (£570 / 0.004). The file omits the ratio. The vault QALY interval is -0.031 to 0.041 in the abstract, scientific summary and Table 35 and -0.030 to 0.040 in the Chapter 8 text; I used the former.
5. Vault urinary incontinence: the text gives any incontinence as 30.8% (abdominal) versus 24.0% (vaginal); Table 30 gives 32/85 (37.6%) versus 25/86 (29.1%). Not used on the page.
6. Uterine trial: the text calls the odds ratio 2.71 for urgency a "MD" and describes urge incontinence, while Table 13's row is "Urgency". The file uses the table label and notes the text wording.
7. Recruitment start is March 2013 (scientific summary) or January 2013 (Chapter 3 text); 45 centers (Chapters 4, 7) versus 36 vault-recruiting centers (Chapter 6). The page gives March 2013 and omits the center count.
8. The uterine-trial discussion says re-admissions are in "Table 16"; they are in Table 15.
9. Chapter 5 counts 16 versus 8 further prolapse operations (cost analysis); Table 15 gives 15 versus 8 at 12 months after surgery. I used Table 15.

## Judgment calls for the integrator

- Two trials in one family. Arms are four (`preserve`, `hyst`, `abdominal`, `vaginal`), so `TrialQuickHit` joins four labels with "versus". `TrialComparison` shows the first control arm (vaginal hysterectomy) and the first primary result (the uterine POP-SS) for both the `uterine-preservation` and `native-tissue-vault` lanes, which is correct for the former only. Splitting the family into two trial files was not an option under the task.
- `design.n` is 774 randomized (565 + 209) and the arm `n` values are randomized counts (282, 283, 105, 104); result denominators are analyzed counts (280, 283, 104, 104).
- Verdict `negative` with `met: false` on the three primary outcomes: neither trial found a difference. The cost outcomes are `met: false` because the base cases were dominated (uterine) or cost £570 more for 0.004 QALY (vault), against the report's £20,000 to £30,000 per QALY threshold.
- `relations`: `prospect` (builds-on: HTA pp. 1, 8); `save-u` and `super` (confirms, taken from their own trial files); `apical-suspension` (ASPIRe; conflicts, with different endpoints and follow-up, stated in the note). ASPIRe's file does not point back to VUE; adding a `parallel` or `confirms` relation there would be reasonable.
- Guidelines: only the AUGS 2025 statement 6 (sexual function) cites VUE (reference 43, also cited for 12-month urinary outcomes in the text). I read no NICE, AUA, EAU or FDA statement resting on VUE; the local NICE NG123 copy does not cite it.
- Not verified: the arithmetic of every percentage in the source tables (I recounted those in the file against their numerators and denominators; only the Table 16 items above disagree); the HTA's lifetime Markov model (Chapter 9) was read in summary only and is not on the page.
