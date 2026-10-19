# COURAGE: notes (2026-10-18)

Counts: 3 reports, 15 results, 11 harms, 6 page references. Also 8 delivery facts (primary 6, bladder-function 2).

## Sources opened

- Primary report: Staskin 2024, J Urol 212(2):256-266, doi 10.1097/JU.0000000000003999, PMID 38708869. Full text via PMC12721610 (efetch XML, read online; no page numbers in that text, so locators name sections, tables and figures with the PMC id). Resolved on Crossref and PubMed: authors (Staskin, Owens-Grillo, Thomas, Rovner, Cline, Mujais), year, volume, pages match. Online date 2024-05-06 (PubMed); print Aug 2024.
- Bladder-function and urodynamics report: Rovner 2026, Neurourol Urodyn 45(2):299-304, doi 10.1002/nau.70199, PMID 41363221. Full text via PMC12893031. Online 2025-12-09 (Crossref), issue Feb 2026.
- Responder analysis: Peters 2025, Urology 206:150-156, doi 10.1016/j.urology.2025.08.051, PMID 40902908. PubMed abstract only (ScienceDirect returned 403; no PMC copy). Online 2025-09-01. `source.level` is `abstract`, `met` is null on its three results.
- Registry: ClinicalTrials.gov API NCT03902080 (participant flow: 551 vibegron and 554 placebo started, 1,105 total; completed 484 + 481 = 965). Used only for the arm sizes in `design.arms`; the paper's text does not give randomized arm sizes. Sponsor on registry: Urovant Sciences GmbH (not cited on the page).
- Guidelines (local copies): `reports/audit-v2/sources-local/aua-bph-2026-unabridged.txt` (statement 28 at p. 28, text citing ref 205 = COURAGE; summary list p. 3); `reports/audit-v2/sources-local/eau-male-luts-2026.txt` (section 5.2.7.c, recommendation "Weak" and COURAGE text on p. 34). AUA OAB 2024 unabridged was read: statement 33 (BPH plus OAB, Conditional, Grade B) does not cite COURAGE, so it is not on the page.
- Guideline citation resolved on PubMed: AUA BPH Guideline 2026 Part II, Medical Management, J Urol 216(2):152-160, doi 10.1097/JU.0000000000005098 (PMID 42095477). The statement text was read from the local unabridged copy, not the journal.
- FDA: approval letter NDA 213006/S-011 (accessdata.fda.gov appletter/2024/213006Orig1s011ltr.pdf; fetched through WebFetch, signature date 12/18/2024) and openFDA drugsfda record (supplement 11, Efficacy, approved 2024-12-18). The direct curl download of the accessdata URL returned an HTML 404 page; the PDF came through WebFetch.
- Not opened: auanet.org (never).

## Reports considered and left out

- Saadat/Bhojani/Elterman/Chughtai 2025, Transl Androl Urol 14(4):888-892 (editorial on COURAGE, PMID 40376518): commentary, not a trial report.
- Letters (Batur 2024 PMID 39052488; Yu 2024 PMID 39172801) and the authors' reply (Staskin 2025, J Urol 213(2):252-253, doi 10.1097/JU.0000000000004291, PMID 39440683): not opened; correspondence.
- Yajima 2026 (World J Urol, PMID 42803972, add-on therapy network analysis), Gill 2026 (Adv Ther narrative review, PMC13499721) and Fields 2026 (Expert Opin Drug Metab Toxicol review): reviews, not opened.
- The optional 28-week extension: no publication found on PubMed.
- Nothing local in `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads` matched vibegron, COURAGE or Staskin.

## Disagreements with WARWIKI pages

No page statement contradicts the primary source. Items to be aware of:

- `docs/01-foundations/pharmacology/storage-oab/beta3-agonists.mdx` line 158: "urinary-retention adverse events in 5/553 (0.9%) with vibegron and 3/551 (0.5%) with placebo". Matches primary Table 2 (AESI urinary retention). The Rovner report counts 5/553 (0.9%) versus 4/551 (0.7%) for the same safety set (its Table 2, "Urinary retention"); the two reports differ by one placebo case. The trial file keeps 3/551 in the primary report and 4/551 in the Rovner report; the page states both.
- Same file, line 99-107: the table gives the micturition difference as "P<0.001"; the source states P < .0001 (not an error). Heading text "1,105 men on α-blocker ± 5-ARI" matches.
- `docs/03-clinical-conditions/03a-storage-incontinence/urgency-incontinence-oab.mdx` line 139: 1,105 randomized, 1,080 in the full analysis set, urgency difference 0.95 (95% CI 0.54-1.37): all match the source. The EAU "weak recommendation" sentence matches EAU p. 34.
- `docs/04-surgical-techniques/04f-incontinence-procedures/oab-uui/oab-uui-database.mdx` line 33: "Study 3005 used an alpha-blocker with or without a 5-alpha-reductase inhibitor" matches (URO-901-3005).
- Page statements that vibegron's BPH indication is "2024" match the FDA letter date December 18, 2024.

## Discrepancies with the old Journal Club record (`src/data/trials.ts`, id courage)

- `n: 965` is wrong for the trial size: 965 is the number who completed (87.3%); 1,105 were randomized, 1,104 dosed, 1,080 in the full analysis set. The trial file uses n = 1,105.
- Old record gives the 12-week coprimary endpoints correctly but omits the 24-week treatment duration, the sequential secondary endpoints and the numeric results.
- Old record says "UTI and retention rates similar to placebo": supported (UTI 2.5% versus 2.2%; retention 0.9% versus 0.5%, both under 1%). The older bottom line ("directly addresses treated the prostate, still has urgency") omits that men with postvoid residual of 100 mL or more, prior retention or Qmax below 5 mL/s were excluded; the page states this in Design and Limitations.
- Old record's DOI 10.1097/JU.0000000000003999 is correct.

## Could not verify or noted for review

- Peters 2025 responder analysis: abstract only. Responder definitions in the abstract: 8 or fewer daily micturitions, 1 or fewer nocturia, 1 or fewer daily urge incontinence episodes (post hoc). The abstract gives no risk differences or confidence intervals, and no week 24 values.
- Rovner 2026 gives "20 (3.7%)" for participants with a postvoid residual rise of 100 mL or more at more than one consecutive visit (versus 7, 1.3%); 20/553 is 3.6%. Those figures are not used in the trial file or page.
- Rovner 2026 detrusor-pressure noninferiority: the conventional least-squares interval (upper limit 19.25 cmH2O) exceeds the 15 cmH2O margin, and the authors' post hoc bootstrap one-sided interval (upper limit 14.61) does not. `met` is left off these substudy results and the note says so.
- Paper dates the study "March 7, 2019" to "June 15, 2023" (page cites the paper); the registry lists start 2019-03-26 and completion 2023-06-15.
- Arm sizes 551/554 are registry participant-flow counts (assigned arm); 2 men assigned placebo took vibegron, so the safety set is 553/551.
- Primary-report page numbers are not in the PMC text; locators name sections, tables and figures. A pass against the journal PDF could add page numbers.
- `relations`: `extends` to `empowur` uses the EAU statement that EMPOWUR's population was mostly female (85%); the EMPOWUR paper itself was not opened here.
- `npm run lint:trials` was not run (output files stay in the work folder); the validator rules were checked by hand: report order by date, arm-key matching, `met` on primary and key-secondary results, takeaway at most 45 words (44), verdictNote under 20 (17), relation note under 25 (19), DOI on page. The `empowur` relation target must exist as a trial file when this is merged.
