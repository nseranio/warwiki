# InhibiZone notes (2026-10-18)

## Sources opened

| Report / document | Identifier | Where read | Level |
|---|---|---|---|
| Carson CC III, Mulcahy JJ, Harsch MR. J Urol 2011;185(2):614-618 (primary) | DOI 10.1016/j.juro.2010.09.094, PMID 21168870 | PubMed abstract via NCBI efetch; Crossref for authors, affiliations, volume, pages | abstract only |
| Mulcahy JJ, Carson CC III. Eur Urol 2011;60(1):167-172 | DOI 10.1016/j.eururo.2011.01.046, PMID 21316145 | PubMed abstract; Crossref | abstract only |
| Nehra A, Carson CC III, Chapin AK, Ginkel AM. J Urol 2012;188(3):899-903 | DOI 10.1016/j.juro.2012.04.116, PMID 22819402 | PubMed abstract; Crossref | abstract only |
| Carson CC III. J Urol 2004;171(4):1611-1614 | DOI 10.1097/01.ju.0000118245.66976.e1, PMID 15017233 | PubMed abstract; cited on the page only for the definition of InhibiZone (rifampin plus minocycline hydrochloride surface treatment) | abstract only |
| AUA Erectile Dysfunction guideline, approved April 2018 | local copy `reports/audit-v2/sources-local/aua-ed-2018-website.txt` | statements 18-20 (lines ~134-146), "Infection" discussion (lines ~1878-1950), references 786-801, 887-888 | full text |
| FDA PMA record N970012 S205 | https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?id=N970012S205 | fetched raw HTML with curl; device title read verbatim | full record |
| openFDA PMA listing for N970012 (original approval 1998-11-02, "AMS 700 series") | api.fda.gov/device/pma.json | read as JSON; not used on the page | - |

Full text of the primary report could not be opened: auajournals.org, jurology.com and sciencedirect.com returned HTTP 403; Europe PMC lists the article as subscription-only and not in PMC. No copy exists under `reports/audit-v2/sources-local` or in `/Users/joyboy/Documents/Medicine` or `/Users/joyboy/Downloads` (searched by DOI, "InhibiZone", "Carson", "Mulcahy"). All values therefore come from abstracts (`met: null`, `status.sourceRead: abstract`). Nothing in the file or page is taken from an AI summary of a page; the FDA record was read from raw HTML.

## Reports considered and left out

- Carson 2004 (J Urol 171:1611, PMID 15017233): the 2011 abstract calls it the earlier 1-year report. Its PubMed record carries an erratum (J Urol 2004 Aug;172(2):781, two "ERRATA" items on that page in Crossref, DOIs 10.1097/00005392-200408000-00103 and -00104), whose text sits behind the publisher's paywall and was not read. Its 2001-2003 cohort also falls inside the 2011 window. Its numbers (60-day infection 0.28% versus 1.59%, 180-day 0.68% versus 1.61%, 2,261 versus 1,944 men, mean follow-up 5 versus 8 months, per the PubMed abstract) were therefore kept out of the trial file; the paper is cited only for the InhibiZone definition. If the erratum is obtained and does not change those figures, it could be added as a `secondary` report.
- Serefoglu EC, Mandava SH, Hellstrom WJ. "Re: Long-term infection outcomes..." J Urol 2012;187:1936-1937 (PMID 22436103) and the 2011 comment J Urol 185:619: commentary, no abstract data, not opened.
- Serefoglu 2012 (Coloplast Titan hydrophilic registry), Eid 2012 (coated device plus no-touch), Droggin 2005: other devices or designs; described only as summarized in the AUA guideline text.
- Wolter and Hellstrom 2004 (Titan), Wilson 2007, meta-analyses: not the same registry; not opened.

## Disagreements with WARWIKI pages (none found for the numbers)

Pages that discuss the study: `docs/04-surgical-techniques/04j-sexual-dysfunction/penile-implants/infection.mdx`, `.../implant-models.mdx`, `docs/01-foundations/pharmacology/infection-prophylaxis/prosthetic-infection-biofilm.mdx`, `docs/07-roots/history/prosthetics-ed.mdx`.

- `prosthetic-infection-biofilm.mdx` line 80: "1.1% of 35,737 treated versus 2.5% of 3,268 untreated initial implants, with follow-up up to 7.7 years" matches the abstract (the abstract does not say "treated" or "untreated"; it says impregnated and nonimpregnated).
- `infection.mdx` line 35: "InhibiZone original implants had follow-up extending to 7.7 years" matches. Its 2004 numbers (4,205 men, 0.68% versus 1.61% at 180 days) match the 2004 PubMed abstract, with the erratum caveat above.
- `infection.mdx` line 195 gives a different, label-based analysis (more than 43,000 patients, May 2001 to September 2007; 1.2% versus 2.5%). The 2011 report's window is May 1, 2001 to December 31, 2008 and its n is 39,005 (35,737 + 3,268); the two are different analyses and should not be merged. The label analysis was not opened here.
- `prosthetics-ed.mdx` line 99: "FDA cleared an infection-reduction promotional claim in 2009" could not be confirmed from any FDA page opened here (the openFDA/accessdata PMA N970012 listing shows no such entry; its pre-2010 supplements are largely absent from the data). Unverified.
- `prosthetics-ed.mdx` line 99 dates InhibiZone to 2001; the 2004 abstract's registry window begins May 1, 2001, which fits, but no FDA approval date for InhibiZone was found (the openFDA list of N970012 supplements with InhibiZone wording starts in 2010).
- AUA ED guideline (2018) text, "Infection": it describes the Carson 2011 comparison as antibiotic-impregnated inflatable devices "compared to non-inflatable devices". The abstract compares impregnated with nonimpregnated inflatable prostheses, so the guideline wording is a slip; the page does not repeat it. The same passage gives Mulcahy 1.5% of 6,071 versus 4.2% of 624 and Nehra 2.5% of 9,300 versus 3.7% of 1,764, which agree with the abstracts (1.47%/4.17% and 2.5%/3.7%).

## Disagreements with the old Journal Club record

- `domain: 'Male SUI / Prosthetics'` is wrong; the study concerns penile prostheses (area `sexual-medicine`).
- `design: 'Large comparative registry / cohort'`, n 39,005, 1.1% of 35,737 versus 2.5% of 3,268, up to 7.7 years, log-rank P < 0.0001 and life-table analysis all match the abstract.
- `population` and `comparison` match. The record calls the data "manufacturer-registered"; the abstract says patient information forms "voluntarily filed with the manufacturer", which the page uses.
- `caveat` ("cited as the practice-defining infection-prevention evidence") is not sourced and was not carried over.
- The record does not mention the 2001-2008 window, the diabetic-men report (Mulcahy 2011) or the replacement-implant report (Nehra 2012), which were added as secondary reports.

## Could not verify

- Whether the log-rank comparison was the only analysis, whether any adjustment was made, group follow-up distributions, event counts, and the surgical and perioperative details: all need the full text. The page therefore says only that the log-rank comparison does not control for patient, surgeon or perioperative differences.
- Whether the 1.1% and 2.5% are crude proportions or life-table estimates at the end of follow-up; both are reported as the abstract words them.
- That the registry's manufacturer was American Medical Systems for the 2011 paper: inferred from the first-author-adjacent affiliation of Harsch ("American Medical Systems, Minnetonka, Minnesota", Crossref), the 2004 abstract naming InhibiZone as an American Medical Systems product, and the Nehra abstract ("submitted to AMS"). The 2011 abstract itself says only "the manufacturer".
- Any FDA clearance or approval date for InhibiZone itself; the page states only the PMA record title.
- The Guidelines section has no `<Rec>` badge because the AUA text is a narrative discussion, not a graded statement (checked statements list; no statement addresses coated devices). EAU sexual-health guideline text is not among the local copies and was not checked.
- Relations: none added. Darouiche (skin antisepsis) shares the infection-prevention theme but not the question.
