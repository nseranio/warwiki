# SUmiT: notes

Files: `sumit.json`, `sumit.mdx`, this file. `status.sourceRead` is `abstract`: the SUmiT full text could not be opened (see limits).

## Sources opened

| Source | Identifier | Where | Level |
|---|---|---|---|
| Peters 2010 SUmiT (primary) | doi 10.1016/j.juro.2009.12.036, PMID 20171677 | abstract via Europe PMC REST and Crossref (title, authors, volume, issue, pages, dates verified); full text not accessible | abstract |
| ClinicalTrials.gov NCT00771264 | API v2 record, results posted, last update 2012-04-18 | https://clinicaltrials.gov/study/NCT00771264 | registry record with results (participant flow, baseline, primary outcome 60/110 vs 23/110, sample-size basis, adverse events, eligibility, sponsor, dates) |
| Sand, Peters, Carrico, ICS 2011 abstract 28 (Glasgow, 31 Aug 2011) | none | https://www.ics.org/Abstracts/Publish/106/000028.pdf, page https://www.ics.org/2011/abstract/28 | conference abstract with Tables 1 and 2 (6 vs 12 sessions, age strata, as-followed GRA, diary values, sham technique, 23 centers, 174 women and 46 men) |
| Peters 2013 STEP 24-month | doi 10.1002/nau.22266, PMID 22674493 | Europe PMC abstract; Crossref bibliographic data | abstract |
| Peters 2013 STEP 3-year | doi 10.1016/j.juro.2012.11.175, PMID 23219541 | Europe PMC abstract; Crossref bibliographic data | abstract |
| AUA/SUFU 2024 OAB guideline (Cameron et al.) | doi 10.1097/JU.0000000000003985 (Crossref: J Urol 2024;212(1):11-20) | local `reports/audit-v2/sources-local/aua-oab-2024-unabridged.txt`, statement 25 and the PTNS section (guideline pp 30-33, ref 227) | full text |
| EAU Non-Neurogenic Female LUTS guideline, limited update March 2026 | none | local `reports/audit-v2/sources-local/eau-non-neurogenic-female-luts-2026.txt`, sections 4.1.4.a.5.d.1 and 4.1.4.a.5.f; SUmiT is reference 154 within [150-155] | full text |
| Laborie Urgent PC clinical summary (manufacturer) | 20100G 07/18 | https://www.laborie.com/wp-content/uploads/resources/e5038910-70e7-4b4c-8548-adcf011be752/20100G_PTNS_Clinical_Summary_Original%20file.pdf | secondary, used only to cross-check numbers and to confirm OrBIT used Urgent PC; no page claim rests on it alone |

Limits: auajournals.org and jurology.com return 403; the paper is not in PMC (Unpaywall and OpenAlex: closed; Semantic Scholar: closed); no local PDF in `sources-local`, `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads`. Randomization method, concealment, blinding assessment, full eligibility wording and the paper's own tables were therefore not read. Eligibility and participant flow come from the registry; sham technique and secondary numbers come from the ICS abstract. If the owner can supply the PDF, recheck: the 110-per-arm and 60/23 counts (registry-derived), the exclusion list, the sham description, the diary tables (the ICS Table 2 P values differ in form from the ICS text, which says P < 0.0001 for "all parameters and time intervals"), and the adverse-event wording. A conflict inside the ICS abstract: urgency component sham row prints 24/103 (22.9%), but 24/103 is 23.3% and 24/105 is 22.9%; the file keeps 22.9% without a denominator.

The page's design facts that depend on the registry (September 2008 start, June 2009 primary completion, phase 4, double masking of participant and outcomes assessor) should be checked against the paper.

## Reports included

1. `sumit-2010` primary (abstract + registry).
2. `sumit-2011-ics` conference abstract (secondary analyses; `noDoi`).
3. `sumit-2012-step-24mo` (Neurourol Urodyn 2013;32(1):24-29, online 2012-06-05).
4. `sumit-2013-step-36mo` (J Urol 2013;189(6):2194-2201, online 2012-12-03; Crossref print date June 2013).

## Considered and left out

- OrBIT (Peters 2009, J Urol 182:1055): separate trial with its own file; used only as a relation (`extends`).
- MacDiarmid 2010 (J Urol 183:234-240, 12-month PTNS durability in 33 responders): a different cohort, not opened.
- Finazzi-Agro 2010 sham-controlled PTNS trial and the Burton and Wang meta-analyses: other studies, not opened.
- FDA: Urgent PC 510(k) summaries K052025 (2005) and K101847 (2010) on accessdata.fda.gov were opened and do not mention SUmiT, so no approval row was written.
- NICE NG123 (rec 1.4.15, do not offer percutaneous PTNS unless MDT review, drug failure and the woman declines botulinum toxin or percutaneous sacral nerve stimulation): read, but it does not cite SUmiT, so it is not in the guidelines section.
- `/Users/joyboy/Documents/Important Documents/Seranio - Nicolas - SUMIT - mmphx ...pdf`: a personal document, not opened.

## Disagreements with other WARWIKI pages

Pages mentioning SUmiT: `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/percutaneous-tibial-nerve-stimulation.mdx`, `.../implantable-tibial-nerve-stimulation.mdx`, `docs/01-foundations/tools/biomaterials/neuromodulation-devices/ptns-systems.mdx`, `docs/01-foundations/anatomy-physiology/donor-sites/leg-thigh.mdx`, `docs/07-roots/surgeons/h-r/kenneth-peters.mdx`.

- `percutaneous-tibial-nerve-stimulation.mdx` line 69 (comparison table): "Superior for all OAB parameters; 54.5% vs. 20.9% improvement (SUmiT)". The abstract supports significant diary differences for frequency, nighttime voids, moderate-to-severe urgency and urge incontinence, and the global response for overall symptoms; the ICS abstract shows no significant overall difference at week 7 (P = 0.07). "All OAB parameters" is broader than the sources (locator: abstract; ICS Table 1). Everything else on that page (n = 220, 54.5% vs 20.9%, P < 0.001, diary outcomes, 0.5-9 mA protocol, STEP 35 at 24 months, 1.3 per month, five mild events) matches.
- `leg-thigh.mdx` line 161: "55% receiving PTNS versus 21%" is a rounding of 54.5% and 20.9%; consistent. Line 160 protocol (34-gauge, 0.5-9 mA, 20 Hz, 30 minutes weekly for 12 weeks) matches the AUA/SUFU description and ICS abstract.
- `ptns-systems.mdx` lines 25 and 27: 220 participants, 54.5% vs 20.9%, STEP 50 enrolled, 29 completed three years, median 1.1 treatments per month, Bayesian 77% (95% CI 64-90) all match the abstracts.
- `kenneth-peters.mdx` line 41: "multicenter randomized sham-controlled trial" matches.
- AUA/SUFU 2024 guideline (local copy, p 31) reports SUmiT as "55% ... versus 21% ... (p<0.01)"; the abstract and registry-era data give P < 0.001. The page uses P < 0.001 from the abstract.

## Disagreements with the old Journal Club record

- n 220, 60/110 (54.5%) vs 23/110 (20.9%) and P < 0.001: confirmed (counts from the registry, percentages from the abstract). The primary analysis is intention to treat; 103 and 105 completed, so as-followed values are 58.3% and 21.9%.
- Name: the registry title is "Study of Urgent PC Versus Sham Effectiveness in Treatment of Overactive Bladder Symptoms"; the record shortened it.
- Population "Adults with overactive bladder" is too broad: 174 women and 46 men with frequency above 10 per 24 hours, failed conservative care, off antimuscarinics for 2 weeks, with neurogenic bladder and primary stress incontinence excluded (registry).
- Bottom line: "the 2024 AUA/SUFU guideline permits its use without prior therapy trials through shared decision-making (Expert Opinion)" is Statement 24 and applies to minimally invasive therapies as a group; it does not cite SUmiT. The statement that does (Statement 25, Moderate Recommendation, Evidence Level: Grade A) offers PTNS after inadequate response or intolerance to pharmacotherapy or behavioral therapy. The page uses Statement 25.
- Word "pivotal" appears in the abstract's conclusion; the page does not repeat it.
- No tibial-nerve-stimulation approval or clearance row was written (see above).

## Counts

Reports 4; results 20 (primary report 2, ICS abstract 10, STEP 24-month 3, STEP 3-year 5); harms 6 (primary 3, ICS 1, STEP 1 each); delivery facts 9; references on the page 7.

## Validation

`sumit.json` parses; `scripts/check-clinical-evidence.mjs` run in a scratch copy of the data folder reports only that relation target `orbit` does not exist yet (it is on the site's trial list but has no file in this scratch copy). All percentages recomputed from their numerators and denominators. Page numbers equal the file; reference markers 1-7 appear in first-use order and all resolve.
