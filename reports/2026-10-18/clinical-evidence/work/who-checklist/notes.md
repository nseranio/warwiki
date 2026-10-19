# who-checklist notes

## Sources opened

Scratch folder S = /private/tmp/claude-501/-Users-joyboy-Documents-WARWIKI-warwiki/9d03f117-3fc6-4067-a0c4-5962e10dc9cb/scratchpad/who

| Source | Where | Level |
|---|---|---|
| Haynes 2009, NEJM, doi 10.1056/NEJMsa0810119, PMID 19144931 (primary report) | Publisher PDF (NEJM page images, Imperial College download stamp) from the Harvard DASH repository, https://dash.harvard.edu/server/api/core/bitstreams/c5287a52-75bc-4131-9262-4c598fcde8cc/content, saved as S/dash.pdf (text S/dash.txt; Table 6 checked on the rotated page image). PDF page = journal page minus 489. PubMed record also read (title, authors, volume, pages, DOI, abstract). | full text |
| Weiser 2010, Ann Surg, doi 10.1097/SLA.0b013e3181d970e3, PMID 20395848 | PubMed record (eutils). Harvard DASH full text returned 401; publisher not tried (paywalled). Issue date May 2010 from Crossref (published-print), so `published` is 2010-05-01 with `dateApprox`. | abstract |
| de Vries 2010 NEJM SURPASS, doi 10.1056/NEJMsa0911535, PMID 21067384 | PubMed record | abstract |
| Haugen 2015 Ann Surg, doi 10.1097/SLA.0000000000000716, PMID 24824415 | PubMed record | abstract |
| Urbach 2014 NEJM, doi 10.1056/NEJMsa1308261, PMID 24620866 | PubMed record (nejm.org returned 403) | abstract |
| WHO Implementation Manual, WHO Surgical Safety Checklist 2009 (ISBN 978 92 4 159859 0) | Copy hosted by the Leapfrog Group, https://www.leapfroggroup.org/sites/default/files/Files/WHO_SafeSurgeryChecklistImplementationManual.pdf, saved as S/impl.pdf (text S/impl.txt) | full text |

All DOIs and PMIDs above were resolved through PubMed; authors, year, journal, volume and pages match the page references.

## Could not open

- NEJM site directly (HTTP 403 for the full text and PDF; Unpaywall's publisher link also returns an HTML block page). The Harvard DASH copy replaced it.
- Weiser 2010 full text (DASH bitstream 401 Unauthorized; publisher paywalled). Its results rest on the abstract, so `met` is null for that report.
- WHO Guidelines for Safe Surgery 2009 (full guideline): NCBI Bookshelf and WHO IRIS PDF URLs returned HTML, not the PDF. The Implementation Manual was read instead and is the only WHO source cited.
- No local guideline copy under `reports/audit-v2/sources-local/` (AUA, EAU, NICE, AUGS, ASHP) mentions the WHO checklist or cites Haynes; I found no AUA/SUFU/EAU statement to cite. No FDA action applies. The WHO manual publishes no recommendation strength, so its bullet carries no `<Rec>` badge.
- A trial registration number for the 2009 study was not looked for beyond the paper, which gives none; `nct` is null.

## Reports considered and left out

- Haynes AB, et al. BMJ Qual Saf 2011;20:102-107 (PMID 21228082, doi 10.1136/bmjqs.2009.040022): safety-attitude survey from the same eight hospitals (SAQ score 3.91 to 4.01); abstract read. Left out: attitude and usability survey, not a clinical outcome report.
- Haugen, de Vries and Urbach (above): independent studies, not reports of this study; used only in the "In conversation" paragraph, abstract-level.
- Not opened: Bergs 2014 Br J Surg meta-analysis; other checklist observational studies.

## Recount notes

- Table 5 and Table 6 percentages are site-standardized, so no numerators exist in the paper to recount them against; raw counts are not given. Only denominators (3,733 and 3,955; Table 6 N values) are available.
- Weiser abstract: 151 of 842 is 17.9% and 102 of 908 is 11.2%, but the abstract's rates are 18.4% and 11.7% (consistent with site standardization, as in the primary report). Rates are entered as published; event counts are quoted in the JSON note.
- Derived values (marked in the JSON notes): absolute differences (-4.0, -0.7, -6.7, -2.3 percentage points), and the 36% fall quoted in the page is the paper's own Discussion wording (4.0/11.0 = 36%).

## Disagreements with WARWIKI pages and the old record

- Only `docs/01-foundations/perioperative-care/perioperative-protocols/eras.mdx` (line 106, ref 18) discusses this study. Its numbers (1.5% to 0.8%, P = .003; 11.0% to 7.0%, P < .001; eight hospitals; follow-up to discharge or day 30) all agree with the source. No disagreement.
- `docs/01-foundations/tools/instruments/forceps/kittner.mdx` cites the WHO Guidelines for Safe Surgery 2009 (ref 3) only as a general reference; nothing to compare.
- Old Journal Club record: numbers, n (7,688), design, hospital count and DOI agree. Differences in wording only: it calls the primary outcome "inpatient death and major complications"; the paper's primary endpoint is any major complication including death (death is a component, analyzed as a key secondary here). Its "reduction of more than one third" matches the 36% complication fall but not the death fall (47% relative by the published rates), so the sentence fits complications only. Its bottom line says "patients aged at least 16", which matches.
- No discrepancy found in the old record's DOI.
