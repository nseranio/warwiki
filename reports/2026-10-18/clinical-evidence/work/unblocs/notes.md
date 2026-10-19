# UNBLOCS notes (October 18-19, 2026)

## Sources opened
- Primary report: Hashim H, et al. Lancet 2020;396(10243):50-61, DOI 10.1016/S0140-6736(20)30537-7, PMID 32622397. FULL TEXT read online as CC BY full-text XML from Europe PMC (PMC7339133, https://www.ebi.ac.uk/europepmc/webservices/rest/PMC7339133/fullTextXML): abstract, methods, results, Tables 1 to 7, discussion. No local copy exists (nothing in `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads`), so `source.file` is null. Locators are table, section or abstract names, not PDF pages. The appendix and Figure 1 and 2 images were not read; Figure 1 counts come from the Results text.
- Secondary: Noble SM, et al. BJU Int 2020;126(5):595-603, DOI 10.1111/bju.15138, PMID 32558178. ABSTRACT only (Europe PMC); full text not opened. Used for cost, QALY and the 21-minute operative-time difference.
- Bibliographic checks: Crossref and PubMed (efetch) for both DOIs (authors, volume, issue, pages). Published dates: Lancet 2020-07-04 (PubMed PubDate; no separate electronic date exists), BJU Int 2020-08-10 (PubMed electronic date).
- Guideline: `reports/audit-v2/sources-local/eau-male-luts-2026.txt`, section 5.3.1.c (recommendation printed on p. 39 of the March 2026 update; evidence summary level 1b; strength Weak).
- Registry: ISRCTN00788389 (from the Lancet abstract); no NCT number.

## Reports considered and left out
- Worthington J, et al. Health Technol Assess 2020;24(41):1-96 (DOI 10.3310/hta24410, PMID 32901611): abstract read via Europe PMC; the NIHR page returned 403 and the NCBI Bookshelf copy (NBK561601) is behind a reCAPTCHA, so no full text. Left out because its abstract repeats the Lancet results. Its abstract states 25% of the ThuVARP arm did not receive the allocated operation and gives the same cost and QALY figures as the BJU Int paper.
- Study protocol (Worthington J, et al. Trials 2017;18:179, PMID 28412960): abstract only; not needed.
- Letters/comments (Enikeev, Montorsi, Bozzini; PMIDs 32958299, 33309032, 33386493): not opened; no data.
- No longer-term follow-up of UNBLOCS was found in Europe PMC (searches "UNBLOCS" and "ThuVARP").

## Data-handling decisions and source discrepancies
- Design type: the schema has no "equivalence" value, so `design.type` is `noninferiority` and the equivalence design is stated in `design.description`. `met` follows the prespecified equivalence margins (IPSS 2.5 points: true; Qmax 4 mL/s: false).
- Lancet internal inconsistency: the Results paragraph on complications says "96 [47%] of 203 men in the TURP group vs 91 [45%] of 204 men in the ThuVARP group", which transposes the arms. The abstract, Table 1 (ThuVARP n=203, TURP n=204) and Table 5 (no complication in 107 ThuVARP versus 113 TURP) agree with 96/203 for ThuVARP and 91/204 for TURP; the trial file follows those.
- Hospital stay: the abstract and Results text say "mean 48 h" in both arms; Table 5 reports medians (IQR). The file records the Table 5 medians.
- Table 3 gives n 197:199 for the analysis while the Results text says 310 men completed IPSS and 344 had Qmax recorded; the primary analysis used multiple imputation. Both are recorded.
- Derived values (marked "denominators by summing the grade rows" or "count by subtraction" in the file): bleeding, clot retention, stricture and UTI denominators in Table 4 (summed from the rows), and 53 ThuVARP-allocated men not receiving ThuVARP (205 minus 152).
- BJU Int cost difference is recorded as published (TURP minus ThuVARP, -9 GBP, CI -376 to 359); the HTA abstract states the mirror image (ThuVARP £9 higher, CI -359 to 376).
- EAU 2026 text says the TURP advantage for Qmax was strengthened in men under 70 and in those with LUTS rather than retention; that comes from the appendix or HTA report, which I did not read, so the page does not state it (the page reports the LUTS-versus-retention interaction p values from the Lancet text).
- Relation: one `parallel` link to `water` (both blind patients to randomization against a TURP comparator for an alternative BPH operation). No link to `pae-vs-turp` (its trial file did not exist yet and its content was not verified).
- Guidelines: AUA 2026 BPH guideline cites UNBLOCS (reference 432) only as one of the studies in a meta-analysis on retention (statement 59, Expert Opinion, resective technologies for catheter-dependent retention); it has no ThuVARP statement and does not rest on the trial, so it is omitted. NICE and FDA not checked (no local NICE BPH copy; a clearance for the laser was not searched).

## WARWIKI pages that cite or relate to the trial
- `docs/04-surgical-techniques/04m-bph-male-luts/turp.mdx` lines 207 and 235 and reference 20: cite UNBLOCS for "approximately 25,000 UK prostate operations annually ... TURP approximately 80%". This matches the Lancet introduction ("Around 25 000 prostate operations ... around 80%"; Lancet Introduction, paragraph 2). No disagreement.
- Possible disagreement, `docs/01-foundations/tools/technology/energy-devices.mdx` line 50: "EAU 2026 classifies thulium vaporization as under investigation." EAU 2026 section 5.3.1.c carries a weak recommendation to offer ThuVARP as an alternative to TURP; only "ThuVAP" appears under "Vaporisation techniques under investigation" (section 5.3.3.c). The sentence may conflate the two; the page does not mention UNBLOCS.
- No other docs page mentions UNBLOCS or ThuVARP. `docs/04-surgical-techniques/04m-bph-male-luts/index.mdx` names "thulium platforms" in a card description only.
- No old Journal Club record exists for this trial.

## Not verified
- The Lancet appendix (multiple-imputation detail, reasons for non-receipt of allocated operation, subgroup and sensitivity tables).
- Full text of the BJU Int cost-effectiveness paper (figures rely on its abstract).
- The 2010 NICE recommendation cited in the Lancet introduction (not opened).

Counts: 2 reports, 11 results, 11 harms, 3 references (plus 9 delivery facts).
