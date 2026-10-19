# ROSETTA source and consistency notes

## Sources opened

| Source | Access and level | Use |
|---|---|---|
| Amundsen et al., *JAMA* 2016; DOI 10.1001/jama.2016.14617; PMID 27701661 | [Publisher full text](https://jamanetwork.com/journals/jama/fullarticle/2565290) and [Duke-hosted journal PDF](https://dukespace.lib.duke.edu/server/api/core/bitstreams/bc76724d-d974-4172-bf69-ffbf0c5ddc61/content), full text; [PubMed](https://pubmed.ncbi.nlm.nih.gov/27701661/) for bibliographic identity | Primary report; PDF pages and tables supply locators. |
| Amundsen et al., *Eur Urol* 2018; DOI 10.1016/j.eururo.2018.02.011; PMID 29482936 | [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC6004242/), full text; [PubMed](https://pubmed.ncbi.nlm.nih.gov/29482936/) for bibliographic identity | Planned two-year responder follow-up. |
| Harvie et al., *J Urol* 2020; DOI 10.1097/JU.0000000000000656; PMID 31738113 | [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC7204548/), full text; [PubMed](https://pubmed.ncbi.nlm.nih.gov/31738113/) for bibliographic identity | Trial-based economic analysis; published online 2019-11-18, in the 2020 volume. |
| AUA/SUFU *Guideline on the Diagnosis and Treatment of Idiopathic Overactive Bladder*, 2024 | `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/aua-oab-2024-unabridged.txt`, full text; statement 25 and discussion of ROSETTA on printed p 31 | Recommendation wording and strength. |
| EAU *Guidelines on Management of Non-Neurogenic Female Lower Urinary Tract Symptoms*, March 2026 limited update | `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/eau-non-neurogenic-female-luts-2026.txt`, full text; sections 4.1.4.c.1–2 | Recommendations, strength, and direct discussion of ROSETTA. |

No local ROSETTA or Amundsen paper was found by DOI/acronym in `reports/audit-v2/sources-local` or by filename in `/Users/joyboy/Documents/Medicine` and `/Users/joyboy/Downloads`. The guideline text hits were not copies of the primary paper. The three report `source.file` fields are therefore null: each report was read online. DOI, PMID, author order, year, journal, volume, issue, and pages were checked against the linked PubMed records.

## Reports considered and left out

- Amundsen et al., *Contemp Clin Trials* 2014 protocol: the primary report already supplies the technique and analysis plan needed here; a protocol has no outcomes to add.
- Richter et al., *J Urol* 2017 response and satisfaction predictors, DOI 10.1016/j.juro.2017.04.103: considered for patient selection. The Duke full-text link encountered a bot gate when opened, and its exploratory associations were not used as a treatment-selection rule.
- Hendrickson et al., 2024 longitudinal response fluctuation analysis: not included because its secondary endpoint does not alter the main efficacy, complication, or delivery comparison on this page.
- ROSETTA bowel and sexual-function secondary analysis: not included because it addresses different outcomes than this OAB treatment decision.

## Disagreements with existing WARWIKI pages

- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/sacral-neuromodulation.mdx:174` says, “the six-month difference is not a durable superiority claim.” The two-year analysis included **initial responders**, with outcome data for **260/298**, repeat injections and reprogramming; it did not retest the six-month primary comparison in the full randomized population. Source: Amundsen 2018, Methods and Results, clinical-responder population and Figure 2. A narrower statement is that no between-group episode difference was detected across 24 months among initial responders.

The other five ROSETTA-containing pages checked had no source-discordant ROSETTA number or statement: `docs/01-foundations/pharmacology/neuromodulation-adjuncts/botulinum-toxin.mdx`, `docs/01-foundations/tools/biomaterials/neuromodulation-devices/medtronic-interstim.mdx`, `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/intradetrusor-botox.mdx`, `docs/07-roots/surgeons/a-g/cindy-amundsen.mdx`, and `docs/07-roots/surgeons/s-z/halina-zyczynski.mdx`.

## Old Journal Club record

- Its six-month summary says only that toxin gave a “slightly greater reduction”; the primary report specifies **0.63 fewer episodes/day** (95% CI 0.13–1.14; P = 0.01) and met its prespecified superiority test. Source: Amundsen 2016, journal p 1371, Table 2.
- Its bottom line says to choose by side-effect tolerance, “not raw efficacy.” That omits the trial's positive six-month primary endpoint; the small effect size and harms belong alongside that result. Source: Amundsen 2016, journal pp 1370–1372, Tables 2–3.
- “SNM had more device revisions/removals” reads as an across-arm comparison, but revision/removal is an SNM-specific outcome: **6/178 (3%)** through six months. The toxin arm instead had catheterization and infection outcomes. Source: Amundsen 2016, journal p 1372, Table 3.
- The record's enrollment of **386** is correct; **381** women were in the eligible assigned-treatment groups and **364** entered the primary diary analysis. Source: Amundsen 2016, journal pp 1366, 1368 and 1370, Figure 1.

## Unverified or source-internal details

- The three reports did not supply a report-specific data-cutoff calendar date, so each `cutoff` is null. ROSETTA was not assigned a drug-development phase, represented as `"not applicable"`.
- The 2018 abstract gives P = 0.15 for the 24-month mean episode comparison, while its Results paragraph rounds this to P = 0.2. The file and page use the abstract value and record the discrepancy in the result note.
- No FDA approval or clearance statement was included because an official FDA record was not opened for this task.
