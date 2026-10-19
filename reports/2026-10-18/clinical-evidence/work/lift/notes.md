# L.I.F.T. (lift): notes

## Sources opened

| Report | Identifier | What was read | Where |
|---|---|---|---|
| Primary: Roehrborn 2013, J Urol 190(6):2161-2167 | DOI 10.1016/j.juro.2013.05.116, PMID 23764081 | **Abstract only** (PubMed efetch XML) | Full text not obtainable: publisher (auajournals.org, jurology.com) returns HTTP 403 to automated fetches; Unpaywall and OpenAlex list no open copy; no PMC copy; not among the owner's local files (searched `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine`, `/Downloads`; only the UroLift 2 IFU and a BAUS patient leaflet exist locally). Crossref confirmed volume, pages and authors. |
| Sexual function analysis: McVary 2014, J Sex Med 11(1):279-287 | DOI 10.1111/jsm.12333, PMID 24119101 | Abstract only (PubMed) | Crossref confirmed DOI; online 2013-09-30 from PubMed ArticleDate. |
| 3-year: Roehrborn 2015, Can J Urol 22(3):7772-7782 | PMID 26068624 (no DOI) | Full text | Free PDF `https://mail.canjurol.com/html/free-articles/V22I3_05_FREE_DrRoehrborn.pdf`, saved as `/private/tmp/claude-501/lift/src/lift3y.pdf` (scratchpad, not durable). |
| 5-year: Roehrborn 2017, Can J Urol 24(3):8802-8813 | PMID 28646935 (no DOI) | Full text | PDF copy `https://www.imop.gr/sites/default/files/urolift-sos.pdf` (carries the CJU header), saved as `/private/tmp/claude-501/lift/src/lift5y.pdf`. |
| BPH6 (cited on the page only, not a report of this trial): Sønksen 2015, Eur Urol 68(4):643-652 | DOI 10.1016/j.eururo.2015.04.024, PMID 25937539 | Abstract | Crossref confirmed. |
| AUA 2026 BPH guideline | local | Statements 44 and 45 and the L.I.F.T. discussion (PDF pp 39-40) | `reports/audit-v2/sources-local/aua-bph-2026-unabridged.txt` |
| EAU Non-Neurogenic Male LUTS, March 2026 | local | Section 5.3.5.a | `reports/audit-v2/sources-local/eau-male-luts-2026.txt` |
| FDA De Novo DEN130023 | accessdata.fda.gov | Database record (name, regulation 21 CFR 876.5530, decision date 2013-09-13) | `https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/denovo.cfm?id=DEN130023`; openFDA lists the later UL400/UL500 510(k)s. The indication text was not read, so the page states only the classification and date. |
| ClinicalTrials.gov NCT01294150 | API | Registration, acronym LIFT, NeoTract (industry) sponsor | Not cited on the page. |

## Choices that affect how the file reads

- **Source level.** `status.sourceRead` and the primary report's `source.level` are `abstract`, because only the abstract of the 2013 report could be read. The primary report's AUASI result (11.1 versus 5.9, P=0.003) and the lift-arm 12-month values come from that abstract. `met: true` for the AUASI endpoint rests on the abstract's own statement that the primary endpoint was met.
- **Qmax and IPSS quality-of-life, randomized comparison.** The sham-arm values (Qmax 4.28 versus 1.98 mL/s, P=0.005; quality of life 2.2 versus 1.0, P<0.001) are in the 2013 full text but not its abstract. They are taken from the 5-year paper's account of the 3-month comparison (Can J Urol 2017 PDF p4) and agree with the AUA 2026 guideline text. They sit under the primary report with that locator. The claim gate binds claims to a report DOI; the 5-year paper has no DOI, so these two rows need that exception or a move to the 5-year report.
- **Difference and interval for AUASI and quality of life** (5.2 points, CI 2.96 to 7.44; 1.2 points, CI 0.73 to 1.67) are quoted from the AUA 2026 guideline (PDF p39), not computed by the trial report; noted in each row.
- **Dates.** Both Canadian Journal of Urology reports have no online date or DOI; `published` is the first of the issue month (June 2015, June 2017) with `dateApprox` and `dateLocator`.
- **Per-protocol versus intention to treat.** Headline follow-up values are per protocol (as the papers' abstracts report); intention-to-treat values are in the row notes.
- **Relations.** None. `rezum`, `pinnacle` and other sham-controlled device trials share the lane but are separate programs; BPH6 is not in the allowed list.
- **Verdict** is `positive` on the 3-month primary endpoint; the verdict note records that the randomized comparison ended at 3 months.

## Reports considered and left out

- **2-year report** (Roehrborn 2015, Urol Pract 2(1):26-32, "Durability of the prostatic urethral lift: 2-year results of the L.I.F.T. study"): not opened. The manufacturer-hosted PDF (`urolift.com/content/dam/urolift/en/pdf/01-Roehrborn-2015-Urology-Practice.pdf`) returned 404, PubMed title search found no match, and its 24-month values are repeated in the 3-year and 5-year papers' tables.
- **Crossover study** (Cantwell 2014, BJU Int 113(4):615-622, PMID 24765680; Rukstalis 2016, BJU Int 118 Suppl 3:14-22): abstract of the first seen; sham crossover men, a separate uncontrolled design. Left out.
- **MedLift** (Rukstalis 2019, Prostate Cancer Prostatic Dis 22:411-419): obstructive median lobes, non-randomized, separate study.
- **Pilot and early series** (Woo 2011; Chin 2012 two-year pilot; McNicholas 2013): other studies.
- **Shore 2014** (patient experience, Can J Urol 21(1):7094): cited in the 5-year paper for a seven-site follow-on (catheterization 20%, return to activity 5 days); not opened.

## Disagreements with WARWIKI pages

`docs/04-surgical-techniques/04m-bph-male-luts/urolift-pul.mdx`:

1. "12-month paired results: IPSS from 21.8 to 11.1 (n = 123); Qmax +4.0 mL/s (n = 103)." The 3-year report, Table 3a (PDF p6, journal p7777), gives per-protocol IPSS 22.13 to 11.52 (n = 123) at 12 months and Qmax +4.03 (n = 102). The 11.1 is the intention-to-treat lift-arm value in the primary abstract (22.1 to 11.1, n = 140); 21.8 is the baseline of the 24-month paired set (21.82, n = 103).
2. "Mean procedure time in L.I.F.T. was 66.2 ± 23.8 minutes." The 3-year report, Table 2 (PDF p5, journal p7776), gives 66.16 ± 24.09 (per-protocol set, n = 137). The 23.8 could not be found; it may come from the 2013 full text (full lift set).
3. "40/140 treated men received a catheter by site protocol; 68/100 of the others avoided catheterization after a voiding trial." Neither the 3-year nor the 5-year report contains these counts. Both state that 32% required catheterization for a failed voiding trial (mean catheter duration 0.9 days over the whole cohort; 5-year PDF p4), which fits 32/100 but not 40/140. Unverified without the 2013 full text.
4. Table row "3 mo ... Qmax +4.4 mL/s" is the lift-arm figure from the abstract; the randomized comparison reports 4.28 (lift) versus 1.98 mL/s (sham). Not an error, but the sham comparison is absent.
5. "an 88% greater improvement" matches (5-year PDF p4, intention to treat).

`docs/04-surgical-techniques/04m-bph-male-luts/aquablation.mdx` (comparison table, UroLift row, citing the 2013 report as ref 30): "−11.0" and "+4.0 mL/s". The abstract's 3-month AUASI is a score of 11.0 (change −11.1); +4.0 mL/s is the 12-month Qmax change (3-month +4.4 in the abstract, 4.28 in the randomized comparison), and the row gives no timepoint.

`docs/04-surgical-techniques/04m-bph-male-luts/optilume-bph.mdx` (comparison table, UroLift row): "−11.0 at 1 mo; +4.3 at 1 mo" is cited to a JAMA review, not to L.I.F.T. L.I.F.T. 1-month intention-to-treat IPSS change was −9.89 (5-year PDF p6, Table 2a), and Qmax was not measured at 1 month in the tables read.

`docs/04-surgical-techniques/04m-bph-male-luts/itind.mdx` (UroLift row "−10.6 (paired); +4.0 (paired)", cited to Elterman 2021): identical to the L.I.F.T. 12-month per-protocol values (−10.61; +4.03), so confirm that Elterman reports those numbers rather than L.I.F.T.

Consistent with the sources: 206 men randomized 2:1; 13.6% retreatment at 5 years (19/140) and 10.7% at 3 years; the 24-, 36- and 60-month table values; 36% IPSS, 50% quality-of-life and 44% Qmax improvement at 5 years; removal of 10 encrusted and 3 prophylactic implants; 8.6 days to preoperative activity; no de novo sustained erectile or ejaculatory dysfunction.

## Differences from the old Journal Club record

- n 206, population, comparison, primary outcome, 11.1 versus 5.9 (P=0.003) and DOI all match.
- "Qmax rose ~4 mL/s" omits the sham comparison (4.28 versus 1.98 mL/s at 3 months, P=0.005).
- "no de novo sustained sexual dysfunction" matches the abstract (none of ejaculatory or erectile dysfunction) and the 3- and 5-year reports.
- The old bottom line ("at the cost of more modest flow gains") is a comparison with resection that this trial did not test; the page leaves it to the BPH6 and EAU paragraph.

## Other items

- Source-level dependency: the 2013 full text would settle the unverified counts above (catheterization 40/140 and 68/100, mean procedure time SD, adverse event table with the sham arm, baseline table for all 206 men) and allow `status.sourceRead: full-text`.
- Candidate entries for `events.json` (not written): FDA De Novo DEN130023, 2013-09-13 (url above); AUA 2026 statements 44 and 45 and EAU March 2026 section 5.3.5.a (local copies, privateLocator).
- The two Canadian Journal of Urology PDFs and their `source.file` paths are in the session scratchpad; copy them to a durable folder if the paths must persist.
- Validated: the trial file and page pass a copy of `scripts/check-clinical-evidence.mjs` run against a temporary folder (JSON parse, schema fields, report order, DOI on page, component bindings); reference markers 1 to 8 resolve and appear in first-use order.
