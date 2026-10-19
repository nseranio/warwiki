# burgio-behavioral notes

## Sources opened
- Primary: Burgio 1998, JAMA 280(23):1995-2000, doi 10.1001/jama.280.23.1995, PMID 9863850. Full text (6-page PDF of the journal article) downloaded from the jacobimed.org curriculum folder and saved as `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/trials-2026-10-19/burgio-1998-jama.pdf` (the `source.file`). Every number in the primary report was read from `pdftotext` output of this PDF; Figure 3 bar values were checked against their n/N.
- Burgio, Locher, Goode, JAGS 2000;48(4):370-374, doi 10.1111/j.1532-5415.2000.tb04692.x, PMID 10798461: PubMed abstract only (efetch XML). DOI resolved on Crossref (authors, journal, volume, pages match).
- Goode et al., JAGS 2002;50(5):808-816, doi 10.1046/j.1532-5415.2002.50204.x, PMID 12028165: PubMed abstract only; Crossref checked.
- Johnson et al., JAGS 2005;53(5):846-850, doi 10.1111/j.1532-5415.2005.53260.x, PMID 15877562: PubMed abstract only; Crossref checked.
- AUA/SUFU OAB guideline 2024: local copy `reports/audit-v2/sources-local/aua-oab-2024-unabridged.txt` (Statement 14 and the discussion paragraph citing reference 139; reference list entry 139 is this trial). Published version DOI 10.1097/JU.0000000000003985 resolved on Crossref (J Urol 2024;212(1):11-20).
- EAU Non-Neurogenic Female LUTS 2026 (local copy): cites this trial (ref 31) only for a bladder diary having a therapeutic benefit in section 3.3; no recommendation rests on it, so it is not on the page.

## Reports left out
- Burgio KL, Locher JL, Roth DL, Goode PS. J Gerontol B Psychol Sci Soc Sci 2001;56(1):P46-51 (PMID 11192337): psychological distress (SCL-90-R) fell similarly in all three groups. Not a surgeon-facing endpoint; abstract seen only.
- Burgio et al., JAMA 2002;288:2293-9 (behavioral training with and without biofeedback): a different trial. Burgio et al., JAMA Intern Med 2020 (combined behavioral and drug therapy in men): a different trial (cited on the OAB page and in the AUA/SUFU reference list), not in the site's trial list.
- No registry number was found; no NCT is given.

## Flags and checks
- Dates for the three later reports are first-of-month approximations (PubMed gives month only); `dateApprox` is set.
- Primary report: Table 3 column headers read "No." but the values (96.9, 34.9) can only be percentages of n = 63, 65, 62; the file labels them as percent.
- The paper states no prespecified hypothesis or noninferiority margin; pairwise tests were Duncan range tests after rank-based ANOVA. `met: true` for the primary result rests on the trial's own alpha .05 and is annotated in `note`. The 12.2-point difference is a subtraction of reported means (no CI reported).
- Goode 2002 abstract vs primary report, same 105-woman cystometry subsample: oxybutynin bladder-capacity change +68.9 mL vs +70.9 mL, placebo -6.0 vs -5.9 mL. Both are reported as printed; the page states the difference once.
- Goode 2002 abstract says detrusor instability resolved in "12.0%" of one of seven women in the behavioral group (1/7 is 14.3%); the file gives counts only (1 of 7, 7 of 8, 7 of 12).
- Primary-report withdrawal for adverse effects (7 oxybutynin, 4 placebo) is from the Figure 2 legend; the text separately gives 10.4% of subjects unable to continue oxybutynin (7/67 = 10.4%). Behavioral group: none listed.
- The Burgio 2000 extension reports, per its abstract, 8 (12.7%) and 27 (41.5%) crossovers; percentages match 8/63 and 27/65.
- Final oxybutynin dose percentages in the primary report sum to 96.1% (the remainder is not itemized); printed as in the source.
- Checker: `scripts/check-clinical-evidence.mjs` run on a scratch copy of the tree with this file added gave no error for burgio-behavioral (relation target `orbit` exists).

## WARWIKI pages that cite this trial
- `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/behavioral-therapy-incontinence.mdx` line 82 (ref 7, correct citation: JAMA 1998;280(23):1995-2000). Its statement (197 women; 190 analyzed; 80.7%, 68.5% (P = .04), 39.4%) agrees with the source (PDF p3-4, Table 4). No disagreement found.
- No other page under `docs` cites doi 10.1001/jama.280.23.1995. `urgency-incontinence-oab.mdx` cites Burgio 2020 (men), not this trial. `pelvic-floor-pt.mdx` cites Burgio 2002 (biofeedback vs behavioral training) and Goode 2011, different trials.
- No old Journal Club record exists for this trial.
