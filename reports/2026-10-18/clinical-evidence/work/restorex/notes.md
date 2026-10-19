# RestoreX trial file: notes

## Sources opened

| Item | Identifier | Where read | Level |
|---|---|---|---|
| Primary report, Ziegelmann et al., J Urol 2019;202(3):599-610 | DOI 10.1097/JU.0000000000000245, PMID 30916626 | PubMed record via NCBI eutils (abstract, authors, ClinicalTrials.gov link, electronic date 2019-08-08); Crossref (volume, issue, pages, seven authors) | **abstract only** |
| Open-label and follow-up report, Joseph et al., J Sex Med 2020;17(12):2462-2471 | DOI 10.1016/j.jsxm.2020.10.003, PMID 33223425 | PubMed abstract; Crossref (online 2020-11-20) | **abstract only** |
| ClinicalTrials.gov NCT03389854 (results posted 2020-08-12) | api v2 JSON, read verbatim: participant flow, baseline, all outcome measures with analyses, adverse events module, arms, masking description | https://clinicaltrials.gov/api/v2/studies/NCT03389854 | registry results |
| Protocol and SAP, April 9, 2018 | https://cdn.clinicaltrials.gov/large-docs/54/NCT03389854/Prot_SAP_000.pdf | downloaded and read with pdftotext (12 pages): eligibility, randomization strata, power analysis, non-compliance definition, conflict of interest | full text |
| EAU Guidelines on Sexual and Reproductive Health, limited update March 2026 | `/Users/joyboy/Documents/uro-oral-boards-anki/text/EAU-Sexual-and-Reproductive-Health-2026.txt` (PDF `/Users/joyboy/Downloads/EAU-Guidelines-on-Sexual-and-Reproductive-Health-2026.pdf`) | sections 8.2.3.a.3 (penile traction therapy, guideline p 83) and 8.2.3.a.4 recommendation (pp 84-85); references 1031-1038 | full text |

**Could not open:** the full text of the primary report and of Joseph 2020. Both are paywalled and not in PMC (Europe PMC: `inPMC N`); auajournals.org, doi.org, ScienceDirect, the J Sex Med site and academic.oup.com returned HTTP 403 (Cloudflare) to curl and WebFetch. No local copy exists in `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads`. Consequences:

- `source.level` is `abstract` for both reports, `status.sourceRead` is `abstract`, and `met` is `null` for the primary safety result.
- Many results carry the locator "ClinicalTrials.gov results"; those values (analyzed n, SDs, corona/tip split, PDQ, all-men IIEF, 6-month original-group comparison, adverse-event counts) are from the registry, not the paper. The abstract and registry agree where they overlap (length 1.5 versus 0 cm matches the registry's length to the tip; curvature −11.7 versus +1.3 degrees; P values 0.001/0.01; 62 and 27 men). The claim gate binds claims to the report DOI, so these registry-derived rows may need the paper's tables or an explicit registry binding.
- Derived differences (subtractions) are marked in locators.
- Not taken because the paper was not read: the "primary curvature" figure on the penile-traction-therapy page (see below), the number of men analyzed per questionnaire in the paper, the paper's ITT/analysis-population definitions, and the paper's own adverse-event tabulation.

A Urology Times conference report (120 men, "+1.4 cm" and "-9 degrees") and UroToday were seen only in a search snippet or secondary fetch and were not used for any value.

## Reports considered and left out

- Toussi A, et al. J Urol 2021;206(2):416-426 (PMID 34060339) and Zganjar A, et al. BJU Int 2023;132(2):217-226 (PMID 37088866): RestoreX after radical prostatectomy, a different randomized trial and population (not Peyronie's disease); not part of this family. Only abstracts' bibliographic details checked.
- Alom M, et al. J Sex Med 2019;16(6):891-900 (PMID 30956106): nonrandomized CCH plus RestoreX registry, a separate study.
- Wymer K, et al. J Sex Med 2019;16(9):1421-1432 (PMID 31351851): Markov cost-effectiveness model that draws on institutional data, not a trial report.
- Green B, et al. J Urol 2023;210(5):791-802 (PMID 37811752): randomized CCH versus surgery, each with RestoreX and sildenafil; a different trial (no id on the site list).

## Checks performed

- DOIs and PMIDs resolved on Crossref and NCBI: author list, year, journal, volume, issue and pages match for both reports (Crossref lists the primary report as September 2019 print; electronic date 2019-08-08 from PubMed is used as `published`).
- Both electronic dates and the registry NCT number agree across PubMed (DataBank) and the registry.
- JSON parses; the repository validator `scripts/check-clinical-evidence.mjs` passes for this trial when run on a scratch copy (the only error it prints, `rosetta` relation to `abc`, comes from the other trial ids not being present yet). Percentages recomputed: 62/82 = 75.6%, 27/28 = 96.4%, 63/82 = 76.8%, 34/82 = 41.5%, 33/82 = 40.2%, 24/63 = 38.1% (removed), 19/63 = 30.2% (removed). Takeaway is 41 words; verdictNote 14 words.
- Prose numbers were checked against the JSON; the date and baseline figures that were not in the file were added as delivery facts.
- Relations left empty: none of the listed trial ids shares a connection with this trial that can be stated from sources read (the ed-peyronies lane has no other trial on the list; `sildenafil-pivotal` addresses ED).
- FDA: openFDA 510(k) searches for RestoreX, PathRight and penile traction returned no match, so no approval or clearance statement was written. The protocol states that penile traction devices with a deformity-correction claim are generally Class I (orthotic) devices.
- AUA 2015 Peyronie's guideline: no local copy and auanet.org is off limits, so no AUA statement was written.

## Registry internal inconsistencies noticed

- 3-month erythema: the outcome measure lists 43%, 41% and 37% by dose group, whereas the adverse events module counts 12/27, 12/28 and 10/27 (44%, 43%, 37%). The file and page use the counts (34/82).
- Registry open-label (6-month) adverse events: the outcome measure gives erythema 35% and mild new pain 27% of 63, whereas the adverse events module lists 24/63 and 19/63 for the open-label group. The file and page use the outcome-measure percentages; the module counts were dropped.
- Registry masking is "DOUBLE" (investigator and outcomes assessor), the paper is titled single-blind; the file uses "single-blind (blinded outcome assessment)".
- Abstract: no exclusion for prior Peyronie's therapy; protocol/registry excluded men currently on intralesional injections and asked others to stop therapy for 4 weeks. Both are on the page.
- The registry's IIEF outcome (all men: +2.5 versus −1.3, P = 0.06) does not name the domain; the abstract's significant IIEF-EF result is in men with erectile dysfunction only.

## Disagreements and unverifiable items on other WARWIKI pages

1. `/Users/joyboy/Documents/WARWIKI/warwiki/docs/04-surgical-techniques/04j-sexual-dysfunction/penile-traction-therapy.mdx` line 44: "**+1.5 cm vs 0 cm stretched length (p < 0.001), −8.5° vs −1.1° primary curvature (p < 0.001), and −11.7° vs +1.3° composite curvature (p < 0.01)**". The +1.5 versus 0 cm and −11.7 versus +1.3 figures match the abstract and registry (+1.5 versus 0.0 cm is length to the penile tip; length to the corona is +1.3 versus +0.3 cm, P = 0.001). The −8.5° versus −1.1° "primary curvature" values and their P < 0.001 appear in neither the abstract nor the registry; I could not verify them (Urology Times, a conference report on a different enrollment of 120, gave −9 versus −1.0 degrees). The "62 traction and 27 control men" matches the registry.
2. Same page, line 45 (and `docs/03-clinical-conditions/03g-genital-scrotal/peyronies-disease.mdx` line 189): "Among 37 original traction-arm men using RestoreX ≥15 min/day for 6 mo, 95% had length gains and 61% had curvature improvements" and "mean use 31 min/day". The Joseph abstract says 95% of men treated for 6 months had length gains and 61% curve improvements, and separately that the as-treated analysis used at least 15 minutes per day; it does not state that the 95% and 61% denominators are the 37 men who used the device at least 15 minutes daily, nor that 31.1 minutes is per day. The 37 comes from the registry (original traction men with 6-month data). Unverified without the full text.
3. `docs/04-surgical-techniques/04j-sexual-dysfunction/penile-traction-therapy.mdx` line 116: "gained an additional 0.6–0.8 cm of length during months 3–6". The abstract gives 0.6 to 0.8 cm of additional length without naming the interval (the report covers 6 and 9 months).
4. `docs/03-clinical-conditions/03g-genital-scrotal/peyronies-disease.mdx` line 189 describes the 6-month result as an "as-treated subgroup (n = 37 using RestoreX ≥15 min/day)"; same issue as item 2.
5. `docs/03-clinical-conditions/03g-genital-scrotal/peyronies-disease.mdx` line 188 and `peyronies-disease/index.mdx` line 156 agree with the abstract and registry (110 men, 3:1, 62 versus 27, −11.7 versus +1.3, +1.5 versus 0 cm).
6. Nothing found that contradicts the primary report on `docs/04-surgical-techniques/04j-sexual-dysfunction/peyronies.mdx`, `male-cosmetic.mdx` (those cite the prostatectomy trial) or `docs/07-roots/surgeons/s-z/matthew-ziegelmann.mdx` / `landon-trost.mdx` (the Landon Trost page says he invented RestoreX; the protocol's conflict-of-interest section confirms this).

## Disagreements with the old Journal Club record

- `primaryOutcome`: "Change in penile curvature and stretched length". The primary outcome was safety (abstract and registry); length and curvature were secondary.
- `result`: "significant improvements in curvature and length plus subjective and objective sexual-function measures". Per the abstract, the erectile-function gain was significant only in men with erectile dysfunction (IIEF-EF +4.3 versus −0.7, P = 0.01); in all men the registry IIEF difference was not significant (P = 0.06), and the Peyronie's Disease Questionnaire domains were not significant at 3 months (P = 0.07 to 0.26).
- `bottomLine`: "used alone or alongside intralesional therapy" and "most durable gains seen with consistent daily use". The trial tested traction alone against no therapy for 3 months; combination with CCH and the daily-use claim are not findings of the randomized phase (Joseph 2020 reported as-treated gains at 15 minutes or more per day).
- `design` "single-blind" is correct; "all-comers, acute or chronic phase" is correct for the abstract's description (no exclusions for complexity or prior treatment, curvature of at least 30 degrees); enrolling site is Mayo Clinic Rochester only.
- Authors, journal, year, n = 110 and DOI are correct (the first author is Ziegelmann; Trost was the principal investigator and device inventor).

## Full-text update, October 19

Source read: Ziegelmann et al., J Urol 2019;202(3):599-610, full text (`reports/audit-v2/sources-local/pdfs-2026-10-19/RestoreX-Ziegelmann-2019.pdf`, pdftotext plus the Figure 3 flow diagram viewed as an image). The primary report is now `source.level: full-text`, `source.checked: 2026-10-19`, and `status.sourceRead: full-text`. The 2020 report (Joseph) is still abstract-level and unchanged.

**Corrected (existing items that differed or were wrong):**
- Safety result: `met` is now `true` (Discussion, p607: "The primary outcome of safety was met"); the paper gives no numeric threshold. Values now state "no moderate or severe adverse events" with the 62-man denominator.
- Length to the corona: P is `<0.001` in the paper (registry gave 0.001).
- Adverse events: the registry-derived rows (erythema 34/82, 41%; pain 33/82, 40%; sensory change 10%, 14%, 16% by dose group; serious events 0/82) were replaced with the paper's Table 2 (62 men at 3 months): erythema or discoloration 45.2% (8.6% at baseline), new mild pain 53.2%, loss or abnormal sensation 25.8% (29.6% at baseline), cold glans 3.2%, swelling 3.2%, bump 1.6%, other 8.1%, no moderate or severe events. The registry denominator (82 randomized) does not match the paper's; the paper's counts agree with the registry for pain (33) but not for erythema.
- IIEF all-comers row: the registry did not name the domain; the paper names it (erectile function, 59 and 26 men). Scale ranges for the PDQ domains came from the registry and were dropped because the paper does not give them.
- Blinding: "blinded outcome assessment" became "single-blind (investigator)". The registry's "two independent reviewers plus a third arbitrating differences over 5 degrees or 0.5 cm" is not in the paper: length is the mean of two blinded providers; curvature photographs were reviewed by one blinded individual. That delivery fact was rewritten from the paper.
- Study period: "started October 2017; primary completion June 2019" (registry) became "enrolled October 2017 through August 2018" (paper p605).
- Power: the protocol's "25 men per dose group" was replaced by the paper's 20 men per arm to detect 0.6 cm (SD 1.0) and 10 degrees (SD 15), alpha 0.05, beta 0.8 as printed.
- Exclusions: the paper's are stretched length under 7 cm and severe diabetes with end-organ failure; the registry's additional erectile-dysfunction exclusion is kept and attributed to the registry. Men on other therapy stopped it at least 1 month before (paper), not 4 weeks (protocol wording).
- Limitations text: the "63 of 82 completed through 9 months" registry fact was removed; the paper shows 19 of 82 traction men and 1 of 28 controls withdrew before 3 months (Figure 3).
- Takeaway and opening: curvature is stated as composite curvature; "caused only transient, mild adverse events" became "had only transient, mild adverse events".
- Added alias for the IRB number printed in the paper (17-006161; the registry-derived alias 17-001283 was kept).

**Added:** arm-level values with SDs and denominators for length (tip and corona), primary and composite curvature, composite response (24.6% of 61 versus 4% of 25; the table prints "61 (24.6)" and "25 (4)"), IIEF erectile function in men with erectile dysfunction and all men, IIEF intercourse and overall satisfaction, Sexual Encounter Profile question 2 (4/8 versus 0/4), PDQ domains and question 12; key secondary endpoints classed `key-secondary` with `met` (the paper calls Table 3 "key secondary outcomes", with two-tailed P below 0.05 and no hierarchy or multiplicity adjustment); responder proportions (77% curvature, 94% length, with the 27%, 48% and 29% thresholds); device preference (15 men), first-line preference (74.1% of 54) and satisfaction; exploratory dose-group and total-minutes analyses; harms with denominators; baseline arm values, whole-cohort severity, recruitment (800 mailed, 110 randomized), randomization strata, power, analysis populations, withdrawals (6, 5, 8 and 1), compliance (100%, 82%, 47%), actual use (mean 43 minutes per day, range 16 to 84), counter-bending and white-line analyses, funding and disclosure; and a Spanish Penimaster PRO trial comparison to the In conversation paragraph (cited to the paper, no new reference).

**Judgment calls and paper inconsistencies:**
- The text's mean disease duration is 49.7 months, but Table 1's arm means (46.0 and 51.8 months) give about 47.5; the abstract's figure is reported as printed.
- The text of the counter-bending result prints "mean 5 vs −17 degrees" while the Figure 8 caption says positive values indicate improvement; the sign convention is ambiguous, so only the P value (< 0.01) is reported.
- The paper calls the analysis intent to treat, but 3-month data exist for 63 of 82 traction men and 27 of 28 controls; both are stated.
- The paper does not state the denominator for the 77% and 94% responder rates (Figure 4 waterfall plots); Table 3 evaluable counts are 62 and 27.
- Table 4 percentages for the nonstandardized questionnaires were mostly left out as exploratory and unvalidated.

**Disagreements with other WARWIKI pages revealed by the full text:**
1. `docs/04-surgical-techniques/04j-sexual-dysfunction/penile-traction-therapy.mdx` line 44: the "−8.5° vs −1.1° primary curvature (p < 0.001)" figure, which could not be verified from the abstract, is now verified (Table 3, p603: −8.5 (SD 10.1) versus −1.1 (SD 7.5), P < 0.001). The page's "−11.7° vs +1.3° composite (p < 0.01)" and "+1.5 cm vs 0 cm (p < 0.001)" also match. The mean use of 43 minutes per day (range 16 to 84) over the randomized phase is the paper's figure; the 31 minutes cited on that page is the open-label phase from Joseph 2020 and still cannot be checked against this paper.
2. Same page and `peyronies-disease.mdx`: the 6-month 95% and 61% denominators (37 men using the device at least 15 minutes a day) remain unverified; they concern the Joseph report, not this paper.
3. Any page that describes RestoreX as having "no significant adverse events" or as free of mild events should add that 45.2% had erythema or discoloration and 53.2% new mild pain at 3 months (all mild and transient).
4. Any page giving the exclusion criteria should use the paper's (stretched length under 7 cm, severe diabetes with end-organ failure); the registry adds erectile dysfunction unresponsive to therapy.
5. Journal Club note (earlier): erectile-function benefit was significant only in men with erectile dysfunction (P = 0.01; all men P = 0.06); the IIEF overall-satisfaction domain (P = 0.03) was the only other significant IIEF domain.
