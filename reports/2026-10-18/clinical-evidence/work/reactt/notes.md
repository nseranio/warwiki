# REACTT notes (2026-10-18/19)

## Sources opened

| Report / source | ID | Where read | Level |
|---|---|---|---|
| Montorsi 2014, Eur Urol 65:587 (primary) | doi 10.1016/j.eururo.2013.09.051, PMID 24169081 | PubMed XML via eutils (structured abstract, read verbatim); no local copy (grep of `reports/audit-v2/sources-local`, `/Users/joyboy/Documents/Medicine`, `/Users/joyboy/Downloads` found none); publisher page blocked by a Cloudflare challenge (not bypassed); Europe PMC lists it as subscription only | abstract |
| ClinicalTrials.gov NCT01026818 results record | api v2 JSON (`clinicaltrials.gov/api/v2/studies/NCT01026818`) | participant flow, primary and secondary outcome measures with analyses and denominators, adverse events, eligibility. Used for the primary report's denominators, month-9 and month-13.5 proportions, IIEF-EF change, harms and completion counts | registry (raw JSON read) |
| Moncada 2015, World J Urol 33:1031 | doi 10.1007/s00345-014-1377-3, PMID 25155034, PMC4480825 | Europe PMC full-text XML | full text |
| Brock 2015, Urology 85:1090 | doi 10.1016/j.urology.2014.11.058, PMID 25813656 | PubMed XML | abstract |
| Patel 2015, BMC Urol 15:31 | doi 10.1186/s12894-015-0022-9, PMID 25879460, PMC4419565 | Europe PMC full-text XML (tables are not in the XML body; table values not used) | full text |
| Stolzenburg 2015, BJU Int 116:241 | doi 10.1111/bju.13030, PMID 25560809 | PubMed XML | abstract |
| Montorsi 2016, Eur Urol 70:529 | doi 10.1016/j.eururo.2016.02.036, PMID 26947602, PMC5478190 | NCBI PMC efetch XML | full text |
| Mulhall 2016, J Sex Med 13:679 | doi 10.1016/j.jsxm.2016.01.022, PMID 27045264 | PubMed XML | abstract |
| AUA Erectile Dysfunction guideline 2018 | doi 10.1016/j.juro.2018.05.004 (Crossref checked) | local `reports/audit-v2/sources-local/aua-ed-2018-website.txt`: statement 11 (lines 107-109), rationale text near lines 1405-1440, reference 430 | full text (local) |
| EAU Prostate Cancer guidelines, limited update March 2026 | no DOI | local `reports/audit-v2/sources-local/eau-2026-extra/EAU-EANM-ESTRO-ESUR-ISUP-SIOG-Guidelines-on-Prostate-Cancer-2026_2026-03-12-221052_zxex.txt`, section 8.3.2.a (lines ~10183-10192) and reference 1622 | full text (local) |

Every DOI resolved on Crossref with matching authors, year, journal, volume and pages (the AUA DOI after a retry). No Rec badge or numbers were taken from an AI summary; the WebFetch/WebSearch summaries were used only to find the PMID and were not used for any value.

## Limits

- The primary paper's full text could not be opened (paywalled; publisher page blocked). `status.sourceRead` and the primary `source.level` are therefore `abstract`. Primary-report numbers beyond the abstract (denominators, month-9 and month-13.5 proportions, IIEF-EF change, all harms, completion) come from the ClinicalTrials.gov results record and are labeled so in each locator. The registry record has not been confirmed against the paper's tables. Please compare the harms with the paper's adverse-event table if a copy arrives (registry combines double-blind treatment and washout, and lists non-serious events at a zero threshold).
- The primary paper's own adverse-event wording (for example "no new safety signals", quoted by Patel 2015) was not read in the primary text, so the page does not use it.
- Table values in the Patel 2015 and Montorsi 2016 full texts were not in the XML; only prose and abstract numbers were used. EPIC-26 arm changes (27.5, 20.7, 18.0) come from the Patel Discussion text and match the registry values (27.53, 20.66, 17.98); the file's unit is the 0-100 scale, which the Discussion writes as a percentage.
- Penile length: abstract (Brock 2015 and the primary abstract) gives 4.1 mm (95% CI 0.4-7.8, P = 0.032); the registry's posted analysis gives 4.20 (0.47-7.93; P = 0.028). The file and page use the paper's figure.
- Age limit: the primary abstract says "≤ 68 yr"; Moncada, Patel and Montorsi 2016 say "<68". The page says "68 or younger" (primary abstract). Brock's abstract also says "≤68".
- Moncada's text lists placebo completers of double-blind treatment as 155 ("114/122/155"); the registry participant flow says 115 and 141 minus 26 not completed equals 115, so the file uses 115.
- Registry month-9 IIEF-EF change values (7.73, 6.53, 4.93) are labeled "mean change"; differences agree with the paper-reported LS-mean difference 2.8 (Moncada text) so they are LS means in all likelihood, but the registry does not label them.
- Relation to `sildenafil-pivotal` (type `extends`) is a judgment: the site's pivotal sildenafil file is on-demand treatment of established ED, REACTT is the post-prostatectomy rehabilitation question. Drop it if the editor wants only direct lineage.
- FDA: no approval statement included; REACTT did not lead to a labeled rehabilitation indication that I could verify at fda.gov, and I did not check, so the page omits any FDA claim.
- Guidelines: the EAU Sexual and Reproductive Health guideline (which the WARWIKI ED page cites as EAU 2026) is not among the local copies, so its statements are not on the page. The EAU Prostate Cancer text is discussion without a strength rating, so no Rec badge. Other guidelines (NCCN survivorship, SMSNA, ASCO) were not available locally.

## Reports considered and left out

- Brock 2015 reply to Letter to the Editor (Urology 86:1243, PMID 26391385): correspondence, no new data.
- Cochrane review of penile rehabilitation (Philippou 2018, CD012414) and the AUA meta-analysis: pooled analyses, not REACTT reports (AUA pooled RR is quoted on the page from the local guideline).
- Conference abstracts and the REACTT supplement figures were not sought.

## WARWIKI pages that cite REACTT

1. `docs/03-clinical-conditions/03g-genital-scrotal/erectile-dysfunction.mdx` (summary row line 172, "Selected evidence" line 194, ref 24 line 270).
2. `docs/01-foundations/pharmacology/sexual-medicine-andrology/pde5-inhibitors.mdx` (bullet line 112, ref 11 line 189).

No disagreements with the sources found:
- pde5-inhibitors line 112: "423 men ... 5 mg daily, 20 mg on demand or placebo for nine months ... 20.9%, 16.9% and 19.1% ... neither tadalafil comparison was significant ... reduced measured length loss by a mean 4.1 mm" matches the abstract. "Daily tadalafil improved drug-assisted outcomes" matches the abstract conclusion.
- erectile-dysfunction line 172: "REACTT improved assisted function during treatment but did not establish unassisted recovery after washout" matches. Ref 24 matches Crossref (Eur Urol 2014;65(3):587-596).
- Minor, not an error: the pde5-inhibitors page ref 11 is the correct DOI but lists "Montorsi F, et al." only; page 596 end page is correct.
- pde5-inhibitors line 113 states the Jo 2018 result "differs from REACTT's unassisted-function endpoint"; consistent with this file (not verified against the Jo source here).

No old Journal Club record exists for this trial.
