# sildenafil-pivotal: notes

## Sources opened

| Report | Identifier | Where read | Level |
|---|---|---|---|
| Goldstein 1998 (primary), NEJM 338:1397-1404 | doi 10.1056/NEJM199805143382001, PMID 9580646 | nejm.org full text (Browser pane; curl is blocked by Cloudflare), plus Tables 1, 2 and 3 read as images from the NEJM asset URLs; Figure 1 and 2 values taken from the figure captions and Results text only (figure images not read) | full text; `source.file` null |
| Correction, NEJM 339:59 | doi 10.1056/NEJM199807023390121 (no PMID found) | nejm.org full text | full text |
| Morales 1998, Int J Impot Res 10:69-73 | doi 10.1038/sj.ijir.3900354, PMID 9647940 | PubMed efetch XML abstract; Crossref metadata | abstract |
| Steers 2001, Int J Impot Res 13:261-267 | doi 10.1038/sj.ijir.3900714, PMID 11890512 | PubMed efetch XML abstract; Crossref metadata | abstract |
| AUA Erectile Dysfunction guideline 2018 | doi 10.1016/j.juro.2018.05.004 (Crossref checked) | `/Users/joyboy/Documents/WARWIKI/warwiki/reports/audit-v2/sources-local/aua-ed-2018-website.txt` (statement 8 wording and grade; Goldstein 1998 is reference 168, inside the 112-303 trial range cited for statement 8) | full text |
| FDA NDA 020895 | accessdata.fda.gov overview page fetched with curl (original approval 03/27/1998, ORIG-1) and the 1998 label PDF (`viagralabel2.pdf`, revised November 1998; "VIAGRA is indicated for the treatment of erectile dysfunction.") | full text |

DOIs, authors, year, journal, volume, issue and pages for all four reports and the AUA guideline were checked against Crossref and PubMed.

No local copy of the NEJM paper was found (grep of `sources-local`, `/Users/joyboy/Documents/Medicine`, Downloads and Desktop by DOI, "sildenafil", "Goldstein").

## Considered and left out

- Rendell 1999 (JAMA, sildenafil in diabetic men), Boolell 1996 pilot, other Pfizer phase 3 studies (separate trials, not this report's two studies; not opened).
- NEJM letters (Sept 3, 1998) and the editorial "A Pill for Impotence" (Utiger): commentary, not opened.
- EAU, SMSNA/ICSM and NICE statements: no local copy that cites this report; not included. The EAU 2026 sexual-health guideline is not in `sources-local`.
- The FDA approval is not added to `events.json` (not permitted to edit it); an event for 1998-03-27 with the accessdata.fda.gov URL above would support the timeline.

## Reading notes

- The paper does not label endpoints "primary"; I coded IIEF questions 3 and 4 as the primary endpoints because they are the efficacy measures the Methods and Statistical Analysis build the analysis around, and the event-log success rate, domain scores and global question as key secondary. Phase is not stated in the paper (`phase: "not reported"`); no trial registry number exists in the report.
- Arm n: sildenafil 316 (102 + 107 + 107) + 163 = 479; placebo 216 + 166 = 382; total 861 (Table 1 and Methods).
- Table 3 dyspepsia at 50 mg reads 12 (11) at higher magnification; 12/107 = 11.2%.
- The correction notice (July 2, 1998) fixes the first abstract sentence ("hydrolysis") and says the baseline-difference sentence in Results refers to the dose-escalation study. Table 1 agrees (longer ED duration and fewer organic cases in the dose-escalation study). PubMed's abstract already carries the corrected wording.
- Placebo treatment-related discontinuation in the dose-escalation study appears as "1" without a percentage in Table 3.
- Morales 1998 and Steers 2001 were read at abstract level only (`met` is not required for their secondary results).
- Percentages that are not printed in the paper were computed (for example completion 154/163 = 94%); every printed percentage was recounted and matches its numerator and denominator.

## Disagreements with other WARWIKI pages

Pages mentioning the trial (grep): `docs/03-clinical-conditions/03g-genital-scrotal/erectile-dysfunction.mdx`, `docs/07-roots/history/prosthetics-ed.mdx`.

1. `docs/07-roots/history/prosthetics-ed.mdx` (line 192): "By 1997, over 4,500 subjects had received sildenafil, and 21 clinical trials had reported its efficacy." This precedes the Goldstein citation; neither the NEJM paper nor the Morales abstract states it (Morales reports more than 3,700 patients with 1,631 years of exposure in its safety analysis and 4,274 patients in double-blind studies). I could not verify the 4,500 or 21 figures from any source I read.
2. Same page (lines 188-190): the Pfizer program dates (1986, 1989, 1991, first ED study late 1993, 1992 volunteer erections) are not in the NEJM paper; they are attributed to ref 12, whose second item (Ghofrani 2006) I did not open.
3. Same page: the FDA approval date March 27, 1998 agrees with Drugs@FDA (ORIG-1, 03/27/1998). The citation (vol 338, no 20, pp 1397-1404, PMID 9580646) agrees with the source.
4. `erectile-dysfunction.mdx` (line 194 and ref 23): "Sildenafil pivotal trials · 1998" and the citation (Goldstein, Lue, Padma-Nathan et al., N Engl J Med 1998;338(20):1397-404) agree with the source. No result number is stated on that page.
5. `docs/01-foundations/pharmacology/sexual-medicine-andrology/pde5-inhibitors.mdx` does not cite this trial; its statement that common adverse effects are headache, flushing, dyspepsia and congestion matches the report (rhinitis, "congestion").

## Disagreements with the old Journal Club record

- `n: 861`, journal, year, DOI, 69% versus 22% (P<0.001), and "headache, flushing and dyspepsia" all agree with the paper.
- "Mean erection-question score doubled on 100 mg": correct for question 3 (2.0 to 4.0, a 100% increase); question 4 rose 130% (1.7 to 3.9). The old record does not say which question or study; it is the 24-week dose-response study, not the dose-escalation study where the 69% figure comes from.
- "Successful intercourse and IIEF erection scores" as the primary outcome: the IIEF question 3 and 4 scores were the main efficacy measures in both studies; successful intercourse attempts (event log) were reported for the dose-escalation study only.
- Old comparison "25/50/100 mg, dose-response + flexible-dose": the flexible study started at 50 mg with doubling or 50% reduction; final doses were 100 mg 74%, 50 mg 23%, 25 mg 2%.
- Old bottom line ("the single most practice-changing study in sexual medicine", "baseline against which every later ED therapy is judged") is interpretation and was not carried over.
- Old record lists no limits; the paper reports 25% partner questionnaire completion and the Pfizer funding and consultant disclosures.

## Could not verify

- Figure 1 and Figure 2 images were not read (values used come from the Results text and figure captions).
- The NEJM PDF page numbers were not available through the HTML view, so locators use table, figure and section names rather than PDF pages.
- Whether the AUA 2018 guideline's PDE5-inhibitor evidence table (Appendix B) lists this specific report as an included study: only the reference-list entry (168) and the 112-303 citation range for statement 8 were confirmed.
