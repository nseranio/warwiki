# Notes: steenkamp-dilation (2026-10-19)

## Sources opened
- Primary J Urol 1997;157(1):98-101, PMID 8976225, DOI 10.1016/S0022-5347(01)65296-0: PubMed abstract only (efetch), plus Crossref metadata (authors, volume, pages verified). Full text not obtainable: auajournals.org/doi.org return 403; Scribd "dviu" is a stub; Stellenbosch repository (scholar.sun.ac.za/handle/10019.1/14132) has the record and abstract but no file (bundles empty). `source.file` is null.
- Heyns 1998 J Urol 160(2):356-358, PMID 9679876, DOI 10.1016/S0022-5347(01)62894-5: PubMed abstract only.
- Steenkamp 1997 S Afr J Surg 35(3):125-130, PMID 9429329 (no DOI): PubMed abstract; the same abstract is on the Stellenbosch repository (handle 10019.1/14515, no file).
- Heyns 2012 S Afr J Surg 50(3):82-87 (scielo.org.za PDF, full text read): background only; it describes the trial as run at the authors' hospital, January 1991 to January 1994, 106 filiform dilation versus 104 optical urethrotomy. Not cited on the page.
- Local guideline copies: `reports/audit-v2/sources-local/aua-urethral-stricture-2023-unabridged.txt` (statements 7 and 8; discussion citing refs 100-102, ref 102 is this trial; text layout is two-column so the attribution of the "100-102" discussion to statement 7 is by position) and `eau-urethral-strictures-2026.txt` (6.2.1.a.1, 6.2.1.c.4, 6.2.2.b, recommendations; ref [210] is this trial). Amendment citation (J Urol 2023;210(1):64-71) taken from `aua-stricture-amendment-2023.txt` and the DOI used on docs/03.../urethral-stricture.mdx.
- An AI web-search summary of the trial was used only to find the paper; no number comes from it.

## Left out or limited
- Numbers of stricture-free patients by arm, p values, stricture length distribution, baseline characteristics, etiology mix, follow-up duration of the primary report, and any complication counts: not in the abstracts, so absent (met is null on the primary result; values omitted). The primary hypothesis and any sample-size calculation could not be read.
- The EAU statement that the trial used retrograde urethrography at seven visits and "non-obliterative strictures at all locations" is the guideline's description, attributed as such on the page.
- J Urol 1997;157:102-3 (editorial comment on the trial) not opened. The Cochrane review cited by EAU and by the filiforms page was not opened.
- Pooled vs arm-specific: the length analyses (12-month rates, Cox HR) and the 1998 repeated-treatment estimates are stated in the abstracts without an arm split; the page says "both arms" only for length predicting failure in the Results sentence ("predicted failure in both arms" is the abstract conclusion "Both methods become less effective with increasing stricture length"), and "together" for the 1998 estimates.
- `relations` left empty: no allowed relation type runs correctly from this earlier trial to OPEN (urethroplasty versus urethrotomy) or ROBUST III (control: dilation or urethrotomy). Suggest `open` and `robust` files add `extends`/`builds-on` to `steenkamp-dilation` (inverse then shows here). The page links both in "In conversation".
- Dates: published months are approximate (PubMed gives only Jan 1997, Aug 1997, Aug 1998); marked `dateApprox`.

## Consistency with the rest of WARWIKI
Pages citing the trial: `docs/01-foundations/tools/instruments/sounds-bougies/filiforms-followers.mdx` (ref 7 is the 1998 report); `docs/04-surgical-techniques/04a-urethral-reconstruction/minimally-invasive/dviu.mdx` (AUA 35-70% statement, which the AUA cites to refs 100-102).
- filiforms-followers.mdx line 68: "In the Heyns 1998 RCT, 210 men were randomized to filiform dilation (106) or internal urethrotomy (104)". Numbers match the abstracts (210, 106, 104; 55-60%/50-60%; 30-50%/0-40%; 0% at 24 months). Wording: the 1998 paper is a repeated-treatment analysis of the 1991-1994 trial whose primary report is Steenkamp 1997; "Heyns 1998 RCT" could say "randomized trial (Steenkamp 1997; repeated-treatment analysis Heyns 1998)". The page cites only the 1998 report.
- Same line: "The Cochrane review of this trial found no significant difference ... at three years or in median time to recurrence" (ref 4): not checked here; the EAU text says the Cochrane review found no difference in intra-operative complications (single dilatation 14% vs DVIU 11%, RR 0.75, 95% CI 0.36-1.55, EAU 6.2.1.c.4), which is not the three-year claim.
- No stated disagreement with the source abstracts on any page found. No old Journal Club record exists.
