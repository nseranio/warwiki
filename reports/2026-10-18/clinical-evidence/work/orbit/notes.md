# OrBIT notes

## Sources opened

- Primary report: Peters KM et al., J Urol 2009;182(3):1055-1061, doi 10.1016/j.juro.2009.05.045, PMID 19616802. **Abstract only** (PubMed efetch). Full text is paywalled (jurology.com returned 403; Europe PMC and Unpaywall list no open copy; no local copy under `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads`). Citation checked against Crossref (authors, volume, issue, pages) and PubMed (electronic date 2009-07-18).
- 12-month extension: MacDiarmid SA et al., J Urol 2010;183(1):234-240, doi 10.1016/j.juro.2009.08.160, PMID 19913821. **Abstract only** (PubMed). Crossref and PubMed give only the January 2010 issue date, so `published` is 2010-01-01 with `dateApprox`.
- ClinicalTrials.gov NCT00448175 (API v2, full record with posted results): enrollment 100, arm sizes 50/50, masking none, phase 4, primary outcome (change in voids/day at 12 weeks, described as noninferiority), eligibility, baseline (94 women, mean age 57.5 and 58.2), participant flow (completers 41/50 and 43/50; 35 PTNS responders continued, 25 completed 12 months), posted voids/day means, adverse events (serious 0/50 each; non-serious 6/50 versus 4/50), lead sponsor Uroplasty.
- AUA/SUFU OAB guideline 2024, local copy `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/aua-oab-2024-unabridged.txt`: Statement 25 (Moderate Recommendation; Evidence Level: Grade A) and the p32 discussion of OrBIT (voids/day -2.4 +/- 4.0 vs -2.5 +/- 3.9, P = 0.44; UUI -1.0 +/- 2.2 vs -1.7 +/- 3.8, P not reported) and of SUmiT (55% versus 21%).
- EAU Non-neurogenic Female LUTS guideline (limited update March 2026), local copy `.../sources-local/eau-non-neurogenic-female-luts-2026.txt`: section 4.1.4.a.5.d.1 evidence statement citing Peters 2009 (ref 150); recommendation "Offer posterior tibial nerve stimulation as an option for symptomatic improvement of OAB/UUI" (Strong), section 4.1.4.a.5.f.
- FDA 510(k) database page for K052025 (Urgent PC Neuromodulation System, Uroplasty, decision date October 17, 2005). The summary PDF itself returned HTML, so indications were not read; only the date and applicant are used.
- ICS meeting abstracts (ics.org/Abstracts/Publish/47/000242.pdf, 105/000261.pdf; read as downloaded PDFs): 6- and 12-month OrBIT results and the treatment-interval analysis.
- Secondary: PubMed search snippet and Urology Times news article (not used for any number on the page or file).

## Reports considered and left out

- The two ICS meeting abstracts (Peters 2008/9 "6 and 12 month results"; MacDiarmid "12 month treatment interval results"): duplicates of the J Urol 2010 extension. They give 35 qualifying responders, 30 and 25 diaries at 6 and 12 months, 11.4 +/- 5.6 additional treatments over 249 days, 19.6 days between treatments, and 1.2 to 4 treatments per month; not used because they differ from the published 2010 abstract.
- Cost-effectiveness analysis of PTNS versus tolterodine (urotoday abstract link 47675): not opened; economic model, not a trial report.
- Urology Times news article: reports 35/43 (80%) versus 23/42 (55%) and a physician-assessed cure of 75% versus 56%; secondary source, so excluded. Note the abstract's 79.5% implies 35/44, not 35/43, so that article's denominator is suspect.

## Limits and unverified points

- Primary report read at abstract level only: `met: null` on the two primary or key-secondary results; the noninferiority margin and the exact prespecified primary endpoint could not be confirmed from the paper. `design.type: noninferiority` and the voids/day primary come from the registry text. The page states the registry's primary outcome as "registered", not as the paper's.
- Voids/day and UUI values come from the AUA/SUFU guideline's summary and the registry, not the paper; the notes in the file say so.
- Harm counts (6/50 versus 4/50; serious 0/50) are registry values; the abstract only says no serious adverse events or device malfunctions. The news article's claim that constipation and dry mouth were less frequent with PTNS (P values not given) could not be checked.
- Discrepancy between sources on responders continuing PTNS: 33 (J Urol 2010 abstract) versus 35 (registry and ICS abstracts). The page uses 33; the file notes the registry's 35. The 2010 abstract has 32 and 25 completing 6 and 12 months; registry lists 25 completing 12 months.
- Whether the guideline "rests on" OrBIT: AUA mentions it as a pre-review-period RCT in its discussion; EAU cites it in a reference range [150-155] within a high-certainty evidence statement. Statement wording is quoted as published.
- Tolterodine arm: abstract and registry say 4 mg daily extended-release; a pooled-analysis table (Xia 2021) lists "4 mg/d or 2 mg/d" for Peters 2009, which could not be checked against the paper.
- Session duration (30 minutes) and needle gauge are not stated for OrBIT in any source I read; omitted.
- Relation to `sumit` is "parallel" (same device and first author; sham comparator). The `sumit` file does not exist yet in the repo at the time of writing, so `npm run lint:trials` will report the target as missing until it is added (as it does for `abc` in `rosetta.json`).

## Disagreements with WARWIKI pages

- No page under `docs/` mentions OrBIT, its DOI or the Peters 2009 report (grep for OrBIT, "Overactive Bladder Innovative", both DOIs). Nothing to correct.
- `docs/01-foundations/tools/biomaterials/neuromodulation-devices/ptns-systems.mdx` says Urgent PC received 510(k) clearance in 2005; consistent with K052025 decision date October 17, 2005.

## Disagreements with the old Journal Club record

- Authors/journal/year/n/DOI/comparison: agree (Peters et al., J Urol 2009, n = 100).
- "Change in OAB symptoms at 12 weeks": the abstract describes the outcome as reduction in OAB symptoms plus global response assessments; the registry primary is voids per day. Not contradictory.
- "Comparable objective improvement": agrees with the abstract.
- 79.5% versus 54.8%: agrees with the abstract (P = 0.01).
- "Equivalence beyond 12 weeks was not tested": true of the randomized comparison; the 12-month extension followed PTNS responders only, with no tolterodine comparison.
- The old record says "Adults with overactive bladder"; the abstract and registry say adults with urinary frequency / at least 8 voids a day; 94 of 100 were women.
