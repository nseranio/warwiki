# Needed from you: decisions and sources (compiled September 26, 2026)

Everything here is what Claude cannot settle alone. The full source list (131 entries, with the pages each would settle) is [sources-needed.md](sources-needed.md); this file is the short version, ordered by value. Sources you supplied on September 26 are listed at the end so they are not requested again.

## A. Decisions (answer in one line each)

**Answered September 26 (applied and pushed):** 1 keep both; 2 softened to "not recommended, outcomes unknown"; 3 keep "may be considered"; 4 coudé page now leads with the EAU gentle-attempt-by-experienced-staff position, ACS beside it; 5 TRAVERSE PE rating changed to "Low to Moderate"; 6 transfeminine breast screening aligned to Endocrine Society rec 4.5 and WPATH 15.6; 7 reimplantation page now carries the 2026 EAU text only (2023 sentence and its reference removed); 8 RCOG and IUGA OASIS sections merged; 9 B12 caveat added to the B12 lab page, urethrectomy frozen-section lines consolidated; 10 no hierarchy (pages already follow the statements). Items 11 to 26 remain open. Campbell-Walsh-Wein 13th ed and Wieder's Pocket Guide are in the general urology folder (remove from the not-found list; not yet indexed).

**Guideline wording and page stance**
1. **AUS washout with immediate replacement.** The AUS procedure page says it "has not been shown reliable" (guideline line); Frazier 2024 is more permissive for selected stable patients. Both are on the page, attributed. Keep both, or pick one stance?
2. **Peyronie's, surgery in the active phase.** `peyronies.mdx` and `peyronies-disease/index.mdx` say "contraindicated". The AUA says only that outcomes are unknown. Soften to "not recommended, outcomes unknown"?
3. **Fournier's gangrene, hyperbaric oxygen.** The page says "may be considered". EAU's weak recommendation is no adjuncts outside trials. Change the page's position, or keep with the EAU line beside it?
4. **Coude catheter page.** It now carries both the ACS advice (straight tip, retrograde urethrogram first) and the EAU advice (gentle attempt by experienced staff, suprapubic tube if difficult). Keep both?
5. **Testosterone (TRAVERSE).** The evidence table rates the pulmonary embolism signal "Moderate". PE was 24 vs 12 events with no prespecified hazard ratio. Change to "Low to Moderate"?
6. **Transfeminine breast screening (`gender-affirming-hormone-therapy.mdx`).** Wording follows ACR and secondary sources; Endocrine Society 2017 rec 4.5 says to follow female screening guidelines. Align to the guideline?
7. **Reimplantation page.** It keeps the older 2023 EAU/ESPU sentence beside the 2026 EAU text. Replace it with the 2026 text only?
8. **Obstetric perineal injury page.** RCOG paragraphs sit beside the IUGA-based section, so there are two guideline voices. Merge them?
9. **MIBC pages.** (a) The B12 caveat ("no consensus" in EAU's follow-up table) is on `vitamin-b12-supplementation` only. Add to the other diversion and B12 pages? (b) `urethrectomy.mdx` carries two differently worded frozen-section lines (EAU and AUA-attributed). Consolidate?
10. **IC/BPS.** The guideline discussion says "second-line" for oral and intravesical agents; its statements say no hierarchy. Pages follow the statements. Confirm.

**Citations and page metadata**
11. **ASRA citation date.** The PDF says first published 29 January 2025; four pages say "Published online October 17, 2025". Which?
12. **NLUTD.** Add the Diagnosis and Evaluation paper (doi 10.1097/JU.0000000000002235) to `renal-function-metabolic-surveillance.mdx` (Statements 14 to 15 sit there)?
13. **`penile-implants/index.mdx` evidence date.** The evidence note now states September 26, 2026, which changes the public last-updated display. Acceptable?
14. **Optilume.** (a) The Basic IFU (1151-001 Rev C) contradicts itself ("ureteral sections" in the description, urethral strictures in the indication). I followed the indication and cited it as the uncoated pre-dilation catheter. Confirm. (b) Is the FDA-posted Optilume BPH label the same revision as your Urotronic PDF (1124-004 Rev A)?
15. **Manufacturer data.** (a) AMS 800 device page: add the manufacturer's prospective study (85 men, 79.5% two-year revision-free) and registry (24,257 implants; 87.6% with InhibiZone vs 79.4% without) numbers? I left them out as manufacturer data. (b) AMS 700: keep the "data on file" length-expansion and InhibiZone elution claims, labeled as marketing?
16. **Shared status notes.** The EAU sexual-and-reproductive-health agent may have overwritten status notes that other agents wrote after the last commit on shared pages (intralesional-corticosteroids, platelet-rich-plasma, graft pages, penis-anatomy, testicles-scrotum). Have those re-checked next session?
**Answered later on September 26 (applied):** 11 ASRA date now January 29, 2025; 12 NLUTD Diagnosis and Evaluation paper added; 13 accepted; 14a accepted; 14b dropped (cite IFU 1124-004 Rev A); 15a no manufacturer AMS 800 data; 15b marketing data removed from AMS 700 pages; 16 status notes re-checked (all accurate); 19 transfer age now "ideally 18 to 21" (2011 AAP/AAFP/ACP text; 2018 full text unreadable); 21 Carter-Trost stays removed (no real citation); 22 three evidenceNotes reworded. MASTER 12-month figures: undecided, pages unchanged.

**New sources supplied and checked September 26 (evening):** AUA/ASCO/SUO MIBC 2024, AUA antimicrobial best practice statement 2019/2020, IDSA asymptomatic bacteriuria 2019, EAU 2026 Non-Neurogenic Male LUTS and Chronic Pelvic Pain, ACS GU injury guidelines 2025, Haylen 2011 IUGA/ICS complications, AHA/ACC 2024 perioperative, ESE/Endocrine Society 2024 glucocorticoid, WHO 2025 FGM, ASRA LAST checklist, Axonics MRI guidelines and Model 5101/4101 implant manuals (Canadian editions), eCoin patient manual.

**New decisions -- answered September 27, applied and pushed (`3cc31c2f`, `053d48ac`, `4106a5c6`):**
27. `evidenceNote`/`evidenceUpdated` frontmatter is not rendered anywhere on the public page (checked every theme/component file) -- internal bookkeeping only. Per the user's conditional ("if on the page, remove"), left as-is; no page changes.
28. Removed the Spectra, Genesis and TUBE sell-sheet citations on `implant-models.mdx`. Found legitimate non-marketing replacements instead of deleting the content outright: AMS Spectra now cites its FDA 510(k) summary (K082006); Genesis and Promedon Tube now cite a peer-reviewed device review (Chung & Wang 2023, *Ther Adv Urol*). One unverifiable claim was dropped (Genesis "silver wire coil and helix core"; Promedon Tube "radiopaque" RTEs) since neither source supports it.
29. Confirmed: "Table 8" is the real table number in the published ESE/Endocrine Society guideline (Beuschlein 2024) -- not an arbitrary internal label. No page change; both positions stay side by side as before.
30. Confirmed: keep both AUA and EAU positions on female urethrectomy without neobladder; no page change needed (already the case).
31. Added AUA/ASCO/SUO 2024 MIBC Statement 31 metabolic-surveillance cadence to `mainz-pouch-ii.mdx`, cross-linked to `renal-function-metabolic-surveillance.mdx`.
32. `genital-scrotal-trauma.mdx` abuse-assessment section reordered to lead with ACS as the primary standard; the forensic-medicine view is now stated as a secondary alternative.
33. Confirmed: state the pentosan polysulfate split as-is (EAU strong-for / CUA conditional-against / AUA retinal caution); no page change needed (already the case).
34. Confirmed: keep both GreenLight 80 W positions stated (EAU strong-recommend vs. AUA less-effective finding); no page change needed (already the case).
35. Found and downloaded the three matching US-English Axonics editions (MRI Patient Guidelines, Model 4101 and Model 5101 IPG Implant Manuals) directly from axonics.com; extracted to `sources-local/dl-2026-09-26/` alongside the existing Canadian editions.

**Still open decisions and MASTER 12-month figures (applied September 27, `4106a5c6`):**
(a) PTNS pages already keep the US-cleared (OAB-only) and international (broader IFU) labeling separate and clearly marked -- checked, no change needed.
(b) ASCRS diverticular-disease chapter citation fixed on 3 pages to "*The ASCRS Textbook of Colon and Rectal Surgery.* 4th ed. Springer; 2022," per the user's supplied detail.
(f) MIBC VTE Statement 16 was already applied to `vte-prophylaxis.mdx` in an earlier batch -- confirmed done, not a repeat action.
**MASTER 12-month figures.** OpenEvidence review of the primary paper (Abrams 2021, *Eur Urol*) confirmed both the 3.6% risk difference and the 1.4-point ICIQ difference are correct, distinct 12-month endpoints, not a conflation -- not flagged/softened. Applied the recommended clarity edits (label the risk difference as favoring AUS; state both the 2021-article and HTA-monograph ICIQ values) across `advance-sling.mdx`, `male-urethral-slings.mdx`, `male-stress-incontinence-database.mdx` and `artificial-urinary-sphincter.mdx`. Along the way, caught and fixed a real citation error on the latter two pages: what was cited as "the HTA report" was actually a different, later Constable paper (the 2026 24-month follow-up) -- the true 2022 HTA monograph (doi:10.3310/TBFZ0277) wasn't cited on either page at all. Added it as a new reference on both and corrected the mismatched citation.

(c) and (d) received September 27 (texts in `sources-local/dl-2026-09-27/`, gitignored):
- **ASCRS 2020 left-sided diverticulitis guideline** (Hall, DCR 2020;63(6):728-747), full text. Settled the fistula colectomy grade (strong recommendation, moderate-quality evidence, 1B; verbatim) on the five fistula pages that cite it. Also added its CT (1B), post-complicated-diverticulitis colonoscopy (1C), extent-of-resection (1C) and minimally invasive (1A) statements where the pages discuss them, corrected "extent individualized" on the fistula hub, and scoped the continuity statement to the emergency-surgery section. The guideline has no ureteral-stent or one-stage-vs-staged fistula statement. The ASCRS 2026 update (PMID 42478484) is still unread.
- **US MRI Guidelines for InterStim systems** (M980291A040 Rev A, 2025-04-15). Every full-body condition matches the UK checklist already used. Added the head-only rules (X/II with 3093/3889 leads and Model 3023 at 1.5 T with a head T/R coil; Twin not eligible), the test-phase MRI warning, POR reset and the multiple-implant rule. Changed pages: InterStim device page, SNM technique page and PNE page (new trial-phase MRI row).
- **Revi surgical technique guide** (US, G02-CLU-0131 Rev 03, 2023). The supplied FCC-ID capture holds only 48 of 81 page images; OCR text is saved. Settled specifications, contraindications, energy-procedure warnings, OASIS primary endpoint (76.4% ITT; the ITNS page's 78% was corrected) and 12-month AE rates, and supplied the implantation technique now on the ITNS page. **Still open:** the guide's MRI section (pp 6-8) is missing from the capture, so Revi MRI scan conditions (1.5/3 T, 30 T/m, SAR) still rest on the manufacturer's safety-information page. The full PDF (fcc.report or fccid.io, document 6966169) sits behind a CAPTCHA; the user could download it or save pages 6-8.
(e) remains open (24-month MASTER SAE counts are unpublished).

**Sources supplied later on September 26 (checked, pushed):** NICE NG239 and NG112, ADA 2026 hospital chapter, AUA VUR guideline (2010, amended 2017), ASCRS Constipation 2024, Hemorrhoids 2024, Ostomy 2022, Crohn's 2020, Rectal Prolapse 2017, ASCRS diverticular textbook chapter, Urgent PC IFU, K132561 (NURO 510k), UCSD PTNS procedure, InterStim MRI checklist (UK), Revi patient therapy guide, Rezum Canada IFU, MASTER HTA monograph 2022 (12-month figures settled: the pages had the 2021 article values; the ICIQ-UI 1.4 was the 24-month value), Erickson LSE 2020, Larson 2013. The NLUTD 2024 amendment and the Medtronic NURO IFU could not be found by the user and are dropped from the wanted list. ACOG documents wait until the user has access.
**Applied without a decision:** renal-function-metabolic-surveillance B12 clause tightened to NICE.
**Still open from this round:** (a) state the US label separately on the PTNS page (Urgent PC IFU lists fecal incontinence internationally; NURO 510(k) covers OAB only)? (b) diverticular textbook chapter has no year: cite undated? (c) ASCRS 2020 left-sided diverticulitis guideline would close one fistula-page grade. (d) Revi surgical technique guide and US InterStim MRI guidelines wanted. (e) 24-month MASTER SAE counts are unpublished. (f) AUA MIBC VTE Statement 16 not yet applied to `vte-prophylaxis.mdx`.

**Older open items (from the earlier handoff)**
18. Fournier severity index cutoffs versus Laor 1995: closed September 27. Laor abstract confirms 78%/75%; the full FGSI scoring table (Tufano 2023 J Pers Med, PMC10532663; 2021 validation PMC8200139) corrected sodium to >=180 and added bicarbonate >52 (`31acc8cd`).
19. Transitional urology transfer age (changed to 18 to 22 from a secondary summary of White and Cooley 2018): confirm from the primary text.
20. Endocrine Society 2017 criteria on `simple-orchiectomy.mdx`: closed September 27 -- no page change needed.
21. Carter-Trost technique reference (removed from three penile implant pages): restore only with a real citation.
22. Some frontmatter `evidenceNote` fields still contain audit-style wording (Backhaus, Mixter, vaginal anatomy). Reword by hand?
23. Cloud voice: done and verified live (September 27). Created the `warwiki-blob` Vercel Blob store (Public access, matching the code's explicit `access: 'public'` writes); set `WARWIKI_ENABLE_CLOUD_TTS=true` and `WARWIKI_TTS_MONTHLY_BUDGET_USD=10` (the user's own $10/month cap, not the code's $45 default); `OPENAI_API_KEY` was already present from an earlier attempt. Along the way found and fixed a real bug in `api/tts.ts`: `isNotFound()`/`isConflict()` checked the thrown error's `.name`, but `@vercel/blob`'s `BlobError` subclasses never override `Error.prototype.name` (it stays generic `"Error"`), so the checks never matched and the Blob-backed budget ledger could never initialize -- cloud TTS would have failed with 503 "Cloud audio paused" on any store, not just a fresh one. Fixed with `instanceof` checks against the SDK's actual exported error classes (`03783ae1`). Verified end to end: `POST /api/tts` returns real MP3 audio (200, `audio/mpeg`, cache MISS on first call, HIT on repeat), and the Blob store shows both `tts/budget/` and `tts/audio/` written.
24. ~~Codex CLI is still broken~~ Resolved October 2: Codex 0.157.1 is installed and logged in. The configured default model `gpt-6.1-sol` is rejected for the ChatGPT login; `codex exec -m gpt-6-sol ...` works. Optional: change `model` in `~/.codex/config.toml` to `gpt-6-sol`.

**MASTER (new this session)**
- **12-month figures on the male sling pages.** The pages give a 12-month risk difference of 3.6% (CI -11.6 to 4.6, p = 0.003) and an ICIQ-UI SF mean difference of 1.4 (p = 0.02). The first looks inconsistent with 87.0% vs 84.2% incontinent (a 2.8-point gap) and the second is identical to the 24-month value, so it may be a conflation. Left unchanged; needs the 12-month paper (see B) to settle. Correct or drop once checked?

**Hold lifted September 27 (textbook mining); textbook fix still queued behind it**
25. Textbook fix (`docs/08-resources/textbooks.mdx`): done September 27. Checked against local title pages, Crossref and Open Library. Corrected: Urinary Diversion (Daneshmand, Springer 2017), Karram and Maher (real title *Surgical Management of Pelvic Organ Prolapse*, 2013), Video Atlas Series (Karram series editor; Roovers removed), *Practical Urodynamics* (Nitti 1998), Wilson's Pearls (Kohler, Gupta, Wilson, 2nd ed 2018), Male Infertility (du Plessis, Agarwal, Sabanegh, Springer 2014), Genital GAS (Maurice Garcia, 2024). Removed as unfindable: Pelvic Floor Dysfunction (Iacobellis, Luciano), Urogynaecology handbook (Robinson, Doumouchtsis), Clinical Urodynamics in Obstetrics and Gynaecology (Jha, Radley). Confirmed unchanged: Principles of Transgender Medicine and Surgery (Ettner, Monstrey, Coleman, 2nd ed 2016). Also: Campbell-Walsh-Wein 13th ed editors corrected to Dmochowski, Kavoussi, Peters (Partin is in memoriam on the title page); Pocket Guide to Urology confirmed 6th ed 2021, Jeff A. Wieder.
26. Textbook mining pilot: hold lifted, queue approved. The user reviewed and finalized the book list directly (not a Codex library survey) -- see [library-queue.md](../textbook-mining/library-queue.md) for the 19-book order and reasoning. Run the pilot (book 1, *Advanced Male Urethral and Genital Reconstructive Surgery*) in a fresh session per CODEX-PROMPT.md Steps 2-3, then stop for the user's approval before continuing the queue.

**Out of scope, no action:** surgeon profiles (removed from the queue); history-page claims are low priority.

## B. Sources still needed, by value

**Guidelines and consensus (highest value first)**
1. (Dropped: no NLUTD 2024 amendment could be found.)
2. (Supplied September 26 evening: AUA/ASCO/SUO MIBC 2024.)
3. The 2025 AUGS-IUGA complications update (Haylen 2011 now supplied and the C/T/S table closed).
4. ACOG documents: Practice Bulletins 214 (prolapse), 213 (sexual dysfunction), 155 (urinary incontinence), 210 (fecal incontinence), 218 (chronic pelvic pain); Committee Opinions 694 (mesh complications), 795 (cosmetic genital surgery), 823 (transgender care). Practice Bulletin 198 (obstetric lacerations, 2018 interim update) was received October 3, 2026 and checked against the six pages that cite it (vulva, perineum, locking stitch, obstetric perineal lacerations, vulvar primary closure, anal sphincteroplasty).
5. (Supplied: EAU 2026 Male LUTS, Chronic Pelvic Pain, ACS GU Injury 2025.)
6. ASCRS guidelines other than the two supplied: Constipation (2024), Hemorrhoids (2024), Ostomy (2022), Diverticulitis, Crohn's, Rectal Prolapse.
7. AUA VUR guideline and other AUA/SUFU/AUGS documents not yet supplied.
8. Perioperative: ADA Standards 2026, NICE (NG112, NG239). (AHA/ACC 2024, ESE 2024, IDSA 2019, WHO 2025 supplied.)
9. Full ASRA LAST advisory text (the 30-minute monitoring claim on `nerve-blocks.mdx`; the one-page checklist does not settle it).

**Papers (full text)**
1. Biardeau 2015 ICS AUS Consensus (*Neurourol Urodyn* 2016;35 Suppl 2:S8-24).
2. MASTER 12-month results paper (the 24-month abstract is now supplied and added to six pages; the 12-month paper settles the primary result, the serious-adverse-event counts and the two figures flagged in A).
3. Laor 1995 (Fournier severity index original table).
4. Erickson 2020 (LSE classification); the original urethroplasty technique papers (Jordan 2007, Morey 2001, Wee and Joseph 1989, Yii/Niranjan 1996, Blandy 1968, Asopa 2001, Kulkarni 2009, Sa/Xu 2021).
5. EVA trial (vaginal estrogen before prolapse surgery), Larson 2013 (Michigan four-wall), ASPIRe, OPTIMAL and E-OPTIMAL.
6. Frazier 2024 companions and other AUS series: Cotte 2023 (female AUS), Phé 2017, Peyronnet 2019.
7. Trimix efficacy series; ATOMS (Esquinas/Angulo); Tagliaferri; Holm 2026, Furr 2019, VanDyke 2021.
8. Paywalled batch (institutional access): Wu NEJM 2021, Davis NEJM 2024, Le Cleach NEJM 2012, Goodman NEJM 2019, Diamond Lancet 2017.

**Manufacturer documents**
1. Coloplast Titan, Titan Touch, Genesis IFUs (the AMS 800, AMS 700 and Tactra IFUs and the AMS 700 operating room manual are supplied); the AMS 800 male, female and pediatric operating room manual (92116967).
2. (Dropped: Medtronic NURO IFU not findable; PTNS technique now checked against Urgent PC IFU, the NURO 510(k) and the UCSD protocol.)
3. MRI manuals: Altaviva, eCoin, and pages 6-8 (MRI section) of the Revi surgical technique guide. (InterStim US MRI guidelines received September 27; Axonics US editions September 26.)
4. ProACT, ATOMS, Argus/Virtue, Remeex IFUs; Rezum, UroLift, Aquablation, iTind IFUs.
5. Drug labels: vaginal estrogen (Vagifem, Imvexxy, Premarin, Estring), Botox (post-11/2023), Nocdurna, Xiaflex, Vibegron, Ialuril, Elmiron.
6. Intuitive manuals (X/Xi, SP), stapler IFUs, and current instrument catalogs (Sklar, Teleflex, Aesculap, Aspen, CooperSurgical, KLS Martin, STERIS, B. Braun).

**Books not found in your library folders:** Campbell-Walsh-Wein 13th ed, Blandy's Urology 3rd ed, Gurtner/Neligan and Mathes-Nahai, Oxford Handbook of Urology 4th ed, Wieder Pocket Guide 6th ed, Feliciano's Trauma.

## C. Supplied on September 26, 2026 (checked; do not resupply)

EAU 2026: Sexual and Reproductive Health, Urological Trauma, Muscle-Invasive and Metastatic Bladder Cancer, Paediatric Urology, Urological Infections (May 2026 edition; identical to the March 2026 update already held). AUA: Peyronie's 2015, IC/BPS 2022, Neurogenic LUTD 2021 (no 2024 amendment in the file), Microhematuria 2020/2025 amendment, AUA/ASRM Infertility 2020/2024. ASCRS Fecal Incontinence 2023 and Anorectal Abscess, Fistula-in-Ano and Rectovaginal Fistula. RCOG GTG 29. ASRA 5th edition (2025). Endocrine Society 2017 and 2018. WPATH SOC 8. ASRM MAC2021. IUGA-ICS fistula consensus, AUGS-IUGA bladder pain report, IUGA urodynamics reporting, IUGA pelvic floor physical therapy consensus, mid-urethral sling position statements (IUGA, RANZCOG-UGSA, AUGS-SUFU). AMS 800 (four documents), AMS 700 and Tactra (seven), Optilume (three) IFUs. TRAVERSE (NEJM 2023), Frazier 2024 AUS review, MASTER protocol, MASTER 24-month abstract (article preview only; full text still wanted). Two NIDDK Path to Prevention documents and the IUGA practice survey (no page cites them; the survey is a blank questionnaire).

All extracted text is local in `reports/audit-v2/sources-local/dl-2026-09-26/` (gitignored). The PDFs remain in `~/Downloads`.
