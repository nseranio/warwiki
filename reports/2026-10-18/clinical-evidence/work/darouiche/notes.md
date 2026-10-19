# Darouiche notes (checked 2026-10-18/19)

## Sources opened
- Primary report: Darouiche RO, et al. N Engl J Med 2010;362(1):18-26, DOI 10.1056/NEJMoa0810988, PMID 20054046, NCT00290290. FULL TEXT read (all 9 PDF pages, journal pp18-26, Tables 1-4, Figures 1-2) from an NEJM-formatted PDF mirror at https://cirugia.facmed.unam.mx/wp-content/uploads/2018/07/Chlorhexidina-vs-Iodopovidona.pdf (downloaded to the session scratchpad, text extracted with pdftotext; not in sources-local or PMC; nejm.org returned 403). `source.file` is null in the trial file (read online). PDF p = journal p minus 17. The Supplementary Appendix (Tables 1-5: ITT/per-protocol detail, antibiotic type, risk factors, microbiology) was NOT available and not read.
- DOI/PMID/authors/volume/pages verified on Crossref (api.crossref.org) and PubMed efetch (PMID 20054046): 12 authors, 362(1):18-26, published 2010-01-07.
- WHO Global Guidelines for the Prevention of Surgical Site Infection, 2nd ed., 2018, full text (PDF via medbox.org mirror; WHO IRIS and NCBI Bookshelf were behind a captcha). Read section 4.7 (recommendation text, rationale, evidence summary, reference 22 = this trial). Publication URL https://www.who.int/publications/i/item/9789241550475 returns 200.
- CDC/HICPAC guideline, JAMA Surg 2017;152(8):784-791 (PDF at vumc.org). Read statement 8B ("Perform intraoperative skin preparation with an alcohol-based antiseptic agent unless contraindicated", Category IA, high-quality evidence). The article text I could read does not cite or discuss this trial (rationale is in an eAppendix I did not read), so it is NOT on the page.
- Local guideline copies searched (reports/audit-v2/sources-local): EAU Urological Infections 2026 (sec 3.18.1.b: "weak evidence ... skin preparation using alcoholic solutions or chlorhexidine result in a lower rate of SSI than iodine solutions", cites Cochrane Dumville 2015, ref 604, not this trial), AUA best practice policy statement on antimicrobial prophylaxis 2019 (mentions chlorhexidine-alcohol skin prep as a non-antibiotic measure, cites Tanner hair-removal review, not this trial), ASHP 2013 (no mention). None cites the trial, so none is on the page.

## Reports considered and left out
- No follow-up or secondary report of this trial was found or opened. The 2010 report is the only publication; the trial has no long-term follow-up (30-day outcome).
- Later chlorhexidine-alcohol versus iodine-alcohol trials (PICASSO 2024, PREPARE 2024, Tuuli 2020) are separate trials, not reports of this one; not opened.
- Cochrane review Dumville 2015 (CD003949, clean surgery): not opened.

## Disagreements and checks against the OLD JOURNAL CLUB RECORD
- n 849: matches the intention-to-treat population; 897 were randomized (431/466). The new file uses 897 as `design.n` and 849 in the population sentence.
- 9.5% vs 16.1%, RR 0.59, P = 0.004: match Table 2 (39/409 vs 71/440; RR 0.59, 0.41-0.85).
- "significant reductions in both superficial and deep incisional infection": superficial P = 0.008 is solid; deep incisional is P = 0.05 with RR 0.33 (95% CI 0.11-1.01), whose interval includes 1. The abstract calls it significant; the new file reports the interval and P as printed and does not call it significant.
- "Excluded contaminated/dirty cases": the paper restricts eligibility to clean-contaminated surgery; the listed exclusions are allergy to chlorhexidine/alcohol/iodophors, infection at or near the site, and inability to follow for 30 days. Twenty-five randomized patients turned out to have clean surgery and were dropped from the per-protocol analysis only. Contaminated/dirty exclusion is implied by eligibility, not stated as an exclusion criterion.
- "alcohol-based preps require dry time and fire-safety precautions": the paper mentions only the small risk of fire or chemical burn with flammable alcohol products (none occurred); it says nothing about dry time. Dry-time statements belong to WHO/CDC/ACOG, not this trial. Not carried onto the page.
- Old "guidelineImpact" (WHO, CDC, society guidance): WHO 2018 verified (strong recommendation, low to moderate quality of evidence; this trial is in its evidence review). CDC 2017 statement verified as a guideline statement but its link to this trial was not read. "Society" guidance not verified.
- Old record says "SSI-prevention step for every reconstructive case" and "default patient skin prep": editorial lead; not used. Only 61 of 849 operations were urologic (26 vs 35) and 82 gynecologic.

## Disagreements with other WARWIKI pages
- No docs page cites or reports numbers from this trial (grep for the DOI, PMID, "Darouiche" 2010 and "chlorhexidine-alcohol" found none that report it; other Darouiche hits are different papers: bacterial interference, short vs long CAUTI antibiotics, penile prosthesis antibiotic treatment).
- `docs/01-foundations/perioperative-care/intraoperative-care/draping-skin-antisepsis.mdx` row "Intact abdominal skin" says "WHO's own Recommendation 12 is a strong recommendation, low-to-moderate quality evidence". The WHO 2018 (2nd ed.) text numbers this recommendation as section 4.7 and I could not find a "Recommendation 12" label in that edition; the strength and quality wording match. Check whether the page means the 2016 first edition. Also the same page says earlier comparisons favoring chlorhexidine-alcohol over aqueous povidone-iodine "do not isolate the effect of chlorhexidine from that of alcohol": consistent with this trial's design (alcohol applicator scrub vs aqueous scrub and paint) and with the Limitations section written here.
- The page `src/data/trials.ts` (old Journal Club) entry is the "old record" above.

## Source oddities and things not verified
- Discussion states a number needed to treat of "approximately 17"; 1/(0.161 - 0.095) is about 15. Left out of the file and page rather than propagate it.
- Microbiology paragraph says cultures from "60 of 61 infected patients" grew organisms, while 110 patients had infection and the parenthetical gives 23/39 and 37/71 (60 total). Not used.
- Subgroup point differences (-8.0 and -4.3 percentage points) are derived by subtraction of the printed percentages; the printed 95% CIs and P = 0.009 (abdominal) are from the text. The nonabdominal text gives no P value.
- `status.sourceRead` is full-text; claimsChecked and clinicalReview are null. The trial file passed `scripts/check-clinical-evidence.mjs` when copied into a scratch copy of the data tree with the existing trial files (47 families, 0 errors); the MDX page was not built or linted in the repo (no edits outside OUT_DIR).
- Relations are empty: none of the other trial ids shares a direct connection (WHO checklist is in a different lane).
- No FDA clearance statement included (ChloraPrep labeling was not opened from fda.gov or accessdata.fda.gov).
