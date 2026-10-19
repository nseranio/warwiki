# STITCH notes

## Sources opened

- Lancet 2015 primary report, doi 10.1016/S0140-6736(15)60459-7, PMID 26188742: full text (7-page PDF, publisher layout) read in full with `pdftotext`. The PDF was a copy hosted at cinj.org (`https://cinj.org/sites/cinj/files/documents/Small%20bites%20versus%20large%20bites%20for%20closure%20of%20abdominal%20midline%20incisions%20%28STITCH%29%20-%20a%20double-blind%2C%20multicentre%2C%20randomised%20controlled%20trial.pdf`), fetched into the session scratchpad; no copy exists in `sources-local`, `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads`. `report.source.file` therefore points at the scratchpad copy (`.../scratchpad/dl/stitch.pdf`); change it to null if a private path is not wanted. Locators "PDF pN" are the page of that 7-page PDF (p1 = Lancet 1254).
- JAMA Surg 2026 13-year report, doi 10.1001/jamasurg.2026.0618, PMID 41920572: abstract only (PubMed efetch XML, plus the JAMA page, which shows the abstract and is paywalled beyond it). Not opened: full text and its Results and Tables. `source.level` is `abstract`; `met` is null for its primary result.
- EHS/AHS 2022 guideline, doi 10.1093/bjs/znac302, PMID 36026550, PMC10364727: full open-access text read through the Europe PMC full-text XML (recommendation, statement, rationale paragraph, reference 38 = STITCH). No local AUA/EAU/AUGS copy addresses fascial closure.
- Crossref and PubMed (esummary/efetch) checked for authors, year, journal, volume, issue, pages of all three papers.

## Reports considered and left out

- Harlaar et al. BMC Surgery 2011;11:20 (STITCH protocol, PMC3182877): appeared in search, not opened; it holds no results.
- Millbourn 2009 (Swedish quasi-randomized trial), ESTOIH short-stitch trial (Albertsmeier, Hernia 2022) and the small-bites meta-analyses (Asian J Surg 2023, World J Surg 2025): separate studies, not STITCH reports; not opened. Millbourn is described only as STITCH's own Discussion describes it.
- No other STITCH secondary publication was identified in a PubMed search on the NCT number.

## Things I could not verify or that need a decision

- Online date of the JAMA Surg paper: Crossref gives only the June 1, 2026 issue date (record created April 1, 2026). The file uses `2026-06-01` with `dateApprox: true`.
- The 13-year abstract gives n=559 (275 small bites, 284 control); the Lancet report randomized 560 (276 small bites, 284 large bites). The abstract does not explain the difference. The file keeps each report's own numbers.
- The Lancet Results text says "large bites group (n=248)"; the Summary, Table 1, Table 3 and the trial profile all say 284. The file uses 284 (typographical error in the text).
- Hernia repair numbers, p values for the 13-year primary result, and full 13-year methods were not available (abstract only).
- Guideline claims for WSES or other bodies in the old record ("Underpins the European Hernia Society and WSES recommendations") were not checked; only the 2022 EHS/AHS guideline was read. No FDA item applies.
- `relations` is empty: none of the listed trial ids tests the same question.

## Disagreements with the old Journal Club record (`src/data/trials.ts`)

- result: "Small-bites halved (roughly) the hernia rate": the absolute figures are 13% versus 21% (relative reduction about 37%); the adjusted OR is 0.52. "Halved" is accurate only for the odds ratio. 13% vs 21% (p=0.022) and about 4 extra minutes match the source (p=0.0220; 14 versus 10 minutes).
- bottomLine: "small-bites, 4:1 suture-length-to-wound-length technique": both arms aimed for a ratio of at least 4:1 (achieved 5.0 versus 4.3); the 4:1 ratio does not distinguish the arms. The arms differed in bite size and spacing (5 mm versus 1 cm), suture (2-0 versus looped size 1 PDS) and needle (31 versus 48 mm).
- comparison: "(5 mm × 5 mm, 2-0 suture) vs large-bites (1 cm × 1 cm)": matches, but the large-bites suture and needle are omitted; the source says bites "of at least 1 cm".
- guidelineImpact: "Underpins the European Hernia Society and WSES recommendations": the 2022 EHS/AHS guideline cites STITCH and suggests small bites (weak, low-quality evidence); WSES not read. "Established ... as the standard" overstates the guideline's weak recommendation (the trial authors themselves wrote that it "should become the standard").
- design "RCT (double-blind)" and n=560, population and primary outcome match the source.

## Disagreements with WARWIKI pages (`grep -rln "STITCH" docs`)

Numbers match the source on all pages; the items below are small wording points.

- `docs/01-foundations/surgical-principles/incisions-closure.mdx` line 76: "the large-bite arm used 10-mm bites/spacing"; source: bites "of at least 1 cm" and spacing of 1 cm (Lancet PDF p2, Procedures). Same page, same paragraph: "Emergency laparotomy was excluded" is correct only in the sense that only elective surgery was included (PDF p6, Discussion). Line 74: "Other complication rates did not differ significantly" matches Table 3 (PDF p5).
- `docs/01-foundations/tools/instruments/forceps/bonney.mdx` line 55 and `docs/01-foundations/anatomy-physiology/donor-sites/abdominal-wall.mdx` line 272: 13-year figures (34% versus 49%, HR 0.61, 0.43–0.86, median censoring 8 years, mean hernia 25 versus 43 mm, repair similar) match the JAMA Surg abstract; "randomized 559 patients" matches the abstract but not the original 560 (see above). Bonney line 55 states the control suture as "looped polydioxanone on a 48-mm needle" (abstract) without the size 1 gauge, which is fine.
- `docs/01-foundations/surgical-principles/sutures.mdx` lines 55 and 120 mention STITCH only as "2-0 (STITCH small-bites)" PDS; consistent with the source.
- Guideline wording on `bonney.mdx`: "weak recommendation, low-quality evidence"; the guideline prints "Quality of evidence: XX00 (low); Strength of recommendation: Weak". Consistent.
