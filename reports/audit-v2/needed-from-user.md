# Needed from you: decisions and sources (compiled September 26, 2026)

Everything here is what Claude cannot settle alone. The full source list (131 entries, with the pages each would settle) is [sources-needed.md](sources-needed.md); this file is the short version, ordered by value. Sources you supplied on September 26 are listed at the end so they are not requested again.

## A. Decisions (answer in one line each)

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
**Older open items (from the earlier handoff)**
18. Fournier severity index cutoffs versus Laor 1995 (source needed: see B).
19. Transitional urology transfer age (changed to 18 to 22 from a secondary summary of White and Cooley 2018): confirm from the primary text.
20. Endocrine Society 2017 criteria on `simple-orchiectomy.mdx`: the 2017 guideline is now supplied and the page was confirmed unchanged, so this can probably be closed.
21. Carter-Trost technique reference (removed from three penile implant pages): restore only with a real citation.
22. Some frontmatter `evidenceNote` fields still contain audit-style wording (Backhaus, Mixter, vaginal anatomy). Reword by hand?
23. Cloud voice: needs your steps (OpenAI $50 limit, Vercel Blob store, `WARWIKI_ENABLE_CLOUD_TTS=true`, `WARWIKI_TTS_MONTHLY_BUDGET_USD=45`, redeploy). Stays off until the audit is finished.
24. Codex CLI is still broken (`npm install -g @openai/codex`); nothing is delegated to GPT.

**MASTER (new this session)**
- **12-month figures on the male sling pages.** The pages give a 12-month risk difference of 3.6% (CI -11.6 to 4.6, p = 0.003) and an ICIQ-UI SF mean difference of 1.4 (p = 0.02). The first looks inconsistent with 87.0% vs 84.2% incontinent (a 2.8-point gap) and the second is identical to the 24-month value, so it may be a conflation. Left unchanged; needs the 12-month paper (see B) to settle. Correct or drop once checked?

**On hold by your instruction**
25. Textbook fix (`docs/08-resources/textbooks.mdx`): nine entries could not be confirmed; your books are in `~/Documents/Medicine/Urology`, so the plan is to check the title pages there. Seven had no matching book (Wilson's Pearls, Perils and Pitfalls; Male Infertility; Female Pelvic Surgery Video Atlas Series; Pelvic Floor Dysfunction; Urogynaecology; Practical Aspects of Urodynamics; Clinical Urodynamics in Obstetrics and Gynaecology) and two were partial mismatches (Urinary Diversion; the Karram and Maher title). Two corrections came from recollection, not a search (the Coleman co-editor on Principles of Transgender Medicine and Surgery; "Maurice M. Garcia").
26. Textbook mining pilot (Codex plan in `reports/textbook-mining/CODEX-PROMPT.md`, run by Claude agents instead; pilot book *Advanced Male Urethral and Genital Reconstructive Surgery*).

**Out of scope, no action:** surgeon profiles (removed from the queue); history-page claims are low priority.

## B. Sources still needed, by value

**Guidelines and consensus (highest value first)**
1. AUA/SUFU Neurogenic LUTD 2024 amendment text (the supplied 2021 file has none).
2. AUA/ASCO/SUO Muscle-Invasive Bladder Cancer 2024 full text (statements 13 to 14, 31 to 32; urethrectomy in women).
3. IUGA/ICS complications classification (Haylen 2011) and the 2025 AUGS-IUGA update (the file `s00192-024-05923-z` is the bladder pain report, not this); it would close the C/T/S code table on `mesh-complications.mdx`.
4. ACOG documents: Practice Bulletins 214 (prolapse), 213 (sexual dysfunction), 155 (urinary incontinence), 210 (fecal incontinence), 198 (obstetric lacerations), 218 (chronic pelvic pain); Committee Opinions 694 (mesh complications), 795 (cosmetic genital surgery), 823 (transgender care).
5. EAU 2026: Male LUTS/BPH, Chronic Pelvic Pain; ACS Best Practices for Genitourinary Injury (2025).
6. ASCRS guidelines other than the two supplied: Constipation (2024), Hemorrhoids (2024), Ostomy (2022), Diverticulitis, Crohn's, Rectal Prolapse.
7. AUA/SUFU/AUGS documents not yet supplied: AUA antimicrobial best-practice statement (implant infection regimen), AUA VUR guideline.
8. Perioperative: AHA/ACC 2024, ADA Standards 2026, ESE 2024 glucocorticoid guideline (Table 8), IDSA 2019 asymptomatic bacteriuria, NICE (NG112, NG239), WHO 2025 female genital mutilation guideline.
9. ASRA local anesthetic systemic toxicity advisory (the 30-minute monitoring claim on `nerve-blocks.mdx`).

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
2. Medtronic NURO/Urgent PC PTNS IFU (needle placement may be conflated on the PTNS pages: highest technique priority).
3. MRI manuals: InterStim II/Micro/X, Axonics, Altaviva, Revi, eCoin.
4. ProACT, ATOMS, Argus/Virtue, Remeex IFUs; Rezum, UroLift, Aquablation, iTind IFUs.
5. Drug labels: vaginal estrogen (Vagifem, Imvexxy, Premarin, Estring), Botox (post-11/2023), Nocdurna, Xiaflex, Vibegron, Ialuril, Elmiron.
6. Intuitive manuals (X/Xi, SP), stapler IFUs, and current instrument catalogs (Sklar, Teleflex, Aesculap, Aspen, CooperSurgical, KLS Martin, STERIS, B. Braun).

**Books not found in your library folders:** Campbell-Walsh-Wein 13th ed, Blandy's Urology 3rd ed, Gurtner/Neligan and Mathes-Nahai, Oxford Handbook of Urology 4th ed, Wieder Pocket Guide 6th ed, Feliciano's Trauma.

## C. Supplied on September 26, 2026 (checked; do not resupply)

EAU 2026: Sexual and Reproductive Health, Urological Trauma, Muscle-Invasive and Metastatic Bladder Cancer, Paediatric Urology, Urological Infections (May 2026 edition; identical to the March 2026 update already held). AUA: Peyronie's 2015, IC/BPS 2022, Neurogenic LUTD 2021 (no 2024 amendment in the file), Microhematuria 2020/2025 amendment, AUA/ASRM Infertility 2020/2024. ASCRS Fecal Incontinence 2023 and Anorectal Abscess, Fistula-in-Ano and Rectovaginal Fistula. RCOG GTG 29. ASRA 5th edition (2025). Endocrine Society 2017 and 2018. WPATH SOC 8. ASRM MAC2021. IUGA-ICS fistula consensus, AUGS-IUGA bladder pain report, IUGA urodynamics reporting, IUGA pelvic floor physical therapy consensus, mid-urethral sling position statements (IUGA, RANZCOG-UGSA, AUGS-SUFU). AMS 800 (four documents), AMS 700 and Tactra (seven), Optilume (three) IFUs. TRAVERSE (NEJM 2023), Frazier 2024 AUS review, MASTER protocol, MASTER 24-month abstract (article preview only; full text still wanted). Two NIDDK Path to Prevention documents and the IUGA practice survey (no page cites them; the survey is a blank questionnaire).

All extracted text is local in `reports/audit-v2/sources-local/dl-2026-09-26/` (gitignored). The PDFs remain in `~/Downloads`.
