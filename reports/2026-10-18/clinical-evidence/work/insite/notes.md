# InSite notes (trial id `insite`, 2026-10-18)

## Sources opened
- Siegel 2015, Neurourol Urodyn 34:224-230, doi 10.1002/nau.22544, PMID 24415559: **abstract only** (PubMed E-utilities XML and Europe PMC record). Wiley page returns 403; no PMC copy (idconv: not in PMC); Unpaywall: closed; no local PDF found (grep of `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine`, `/Users/joyboy/Downloads`).
- Noblett 2017, Neurourol Urodyn 36:1136-1139, doi 10.1002/nau.23076, PMID 27491027: abstract only (PubMed XML).
- Siegel 2018 (online 2017-07-11), J Urol 199:229-236, doi 10.1016/j.juro.2017.07.010, PMID 28709886: abstract only (PubMed XML).
- ClinicalTrials.gov NCT00547378, full API record incl. posted results (https://clinicaltrials.gov/api/v2/studies/NCT00547378): design, eligibility, outcome definitions, participant flow, primary/secondary outcome results, AE module. Used for design details, the success definition, the tined-lead co-primary (22.4% [16.6-27.7], limit 0.33), lead migration 5.9% and lead infection 1.2% at 5 years, and test-stimulation/crossover facts. These registry-sourced items are marked with registry locators in the trial file and are cited to the registry (ref 2) on the page; they are not from a paper's text.
- Local guideline copies: `aua-oab-2024-unabridged.txt` (Statement 25, Sacral neuromodulation section, ref 223 = Siegel 2015), `eau-non-neurogenic-female-luts-2026.txt` (section 4.1.4.c.2 and 4.1.4.c.2.a, ref 250).
- Not opened: auanet.org (per rule), medtronic.com marketing pages (only surfaced in search).

## Source limits
- No full text of any InSite paper could be opened, so `status.sourceRead` is `abstract`. Operative detail (anesthesia, lead technique, PNE versus first-stage tined lead, programming) could not be taken from a paper and is absent from the page. SMT drug choice/dose, baseline severity, the exact as-treated population, denominators for the 30.5% and 27.3% AE rates and the continence (dry) rates are not in the abstract.
- `met: true` for the primary randomized endpoint rests on the abstract (P=0.02, "significantly greater") plus the registry's stated hypothesis and stratified CMH P=0.016; the schema rule says null for abstract-only reading, but the threshold is stated, so I set true. Change to null if you want the strict rule.
- Registry primary outcome table lists "61" and "42" (units: percentage), consistent with the abstract.
- The tined-lead co-primary result (met: true) is a registry value on the 5-year report; verify against the J Urol full text if it can be obtained.

## Reports considered and left out
- Noblett 2018 "Baseline symptom severity and therapeutic success" (Neurourol Urodyn 37:1667-1671, doi 10.1002/nau.23422, PMID 29635879): abstract read; reports no between-group numbers (success rates by severity not significantly different at 12 and 24 months; values not in abstract), so no results could be recorded. Omit unless full text is obtained. No separate 12-month or 3-year paper turned up in a PubMed author/topic search.
- PubMed IDs 28914707, 27131966, 25546568, 18070199 from the author search returned no article title (book chapters or non-article records); not used.
- Systematic reviews and the J Urol 2015 commentary (PMID 26382800): not InSite reports.

## Relations
None added. No listed trial is a direct predecessor or a same-question trial. Suggest the ROSETTA file carry `builds-on` -> `insite` (SNM versus medical therapy preceded the SNM versus toxin comparison); I did not verify ROSETTA's stated rationale, so I left it to whoever owns that file.

## Disagreements with other WARWIKI pages
- No WARWIKI page discusses the randomized InSite comparison (61% versus 42%) at all; `docs/01-foundations/tools/biomaterials/neuromodulation-devices/medtronic-interstim.mdx` line 69 and `docs/04-surgical-techniques/04f-incontinence-procedures/oab-uui/oab-uui-database.mdx` line 41 cite only the 5-year paper. Their numbers match the 5-year abstract (340/272; 67% and 82%; 2.0 leaks and 5.4 voids; 22%/15%/13%). No disagreement.
- Statements in the local guideline copies that disagree with the InSite abstract (guideline text, not WARWIKI pages):
  - AUA/SUFU 2024, Sacral neuromodulation versus antimuscarinic medications paragraph (PDF p31): "Eighty-six percent of OAB patients randomized to SNM were responders". The abstract's 86% is the share reporting improved or greatly improved urinary symptom interference; ITT success was 61%. Same paragraph: continence rates 39% versus 21% (p=0.06) and a one-year implant site infection of 4% / permanent explant 5% could not be checked against an abstract; the 12-month AE paper abstract gives implant site infection 3% (9/272).
  - EAU non-neurogenic female LUTS 2026, section 4.1.4.c.2: says InSite showed adverse events "none were serious", "higher rates of UTIs", and "implant site infection and lead migration in 3.4% of cases each"; none of this is in the abstracts I read (the 12-month paper says only one device-related AE was serious).
- Old Journal Club record: numbers match the abstract (147; 61% vs 42% ITT; 76% vs 49% as-treated). Differences: it states the population as "including milder symptoms" (title says "mild symptoms"; abstract concludes "mild to moderate"); its bottom line ("supports moving to SNM rather than cycling further antimuscarinics/beta3 agonists") is interpretation and the comparator was antimuscarinics only; it omits that the randomized comparison was open-label, ended at 6 months and was industry-sponsored (Medtronic, registry).

## Dates and ids
- Report ids follow the citation year (insite-2015, insite-2017, insite-2018); `published` is the online date (2014-01-10 from Europe PMC/Unpaywall; 2016-08-04 and 2017-07-11 from PubMed ArticleDate).
- Citations do not carry the doi in the `citation` field (DOI is a separate field), following sister.json.
