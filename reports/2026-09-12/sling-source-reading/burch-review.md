# Burch colposuspension page audit

Date: September 12, 2026. Reviewer: sling_study_tables.

Page: `docs/04-surgical-techniques/04f-incontinence-procedures/procedures/burch-colposuspension.mdx`.

## Page read and edit scope

The entire original 14,319-character MDX was read and backed up to `/tmp/warwiki-burch-original.mdx`, SHA-256 `405b22ae188f8396d33cddc8e4839ca3d1e061c3a04a3998f0e98b7cb7728a0f`. After the parent removed unused references and renumbered, the entire final 18,350-character MDX was personally read in contiguous Python intervals `[0:10000]` and `[10000:18350]`. Final SHA-256: `2f0ba1e3f2128e5440a5966e64a2ab4e55df8a8d1d66a98fb2321802a96530bf`.

This reviewer edited only the Burch MDX. Parent handles the shared ledger/history, diagram asset withdrawal, validation, commit and deployment. No clinician sign-off is represented.

## Corrections made

- Corrected CARE's three-month composite outcome to **33.6% versus 57.4%**, citing the 2016 correction and actual author correspondence. Distinguished existing, occult and absent SUI; abdominal CARE is not universal prophylactic-Burch evidence for every minimally invasive sacrocolpopexy.
- Removed the falsely attributed 82% five-year / 55–69% ten-year cure claim from the 2026 prolapse review. Its population, procedures and outcomes do not support isolated-Burch cure rates.
- Rebuilt selection around current AUA/NICE guidance. Removed mandatory urodynamics for every uncomplicated primary patient, automatic AUS selection for low leak-point pressure, and simplistic preference claims based on narrow introitus or previous vaginal surgery.
- Replaced rigid operative spacing/tightening instructions with anatomic support, protection of mucosa/bladder/urethra, avoidance of excessive elevation and cystoscopic assessment. Removed the misleading schematic embed; precise visual findings and original asset hash are in the JSON.
- Replaced universal success rates with defined comparisons: SISTEr and E-SISTEr time-to-event endpoints, the suture-only laparoscopic Cochrane estimate and the matched observational Karmakar cohort. Preserved denominators, different follow-up, outcome definitions, attrition and the difference between satisfaction and dryness.
- Corrected Conrad's 90.5% to cure **or substantial improvement**. Ye's 39/57 result has only 57/84 follow-up. Karmakar's 11/336 versus 11/1,008 prolapse endpoint means later surgery, not prevalence of any anatomical prolapse.
- Distinguished suture Burch from historical mesh/staple laparoscopic colposuspension, and educational technique videos from comparative clinical trials. The small 2026 trial remains one brief paragraph limited to the available abstract.
- Clarified early/late complications: SISTEr voiding dysfunction was 2% with Burch versus 14% with sling; new treated UUI occurred in 11 women in each arm. Updated follow-up and reassessment, removing unsupported fixed complication/recovery rules.

## Complete sources and actual figures read

1. **Veit-Rubin 2019**, DOI 10.1002/nau.23905: entire 44,332-character article text, table 1, all 79 references, disclosures and eight figure captions. **All eight actual JPEG figures personally inspected**, `/tmp/warwiki-burch/NAU-38-553-g001.jpg` through `g008.jpg`. Their low resolution limits precise anatomic detail; operative validation is not implied.
2. **Freites 2019 laparoscopic Cochrane**, DOI 10.1002/14651858.CD002239.pub4: **every 262,664 characters**, entire main, four Summary of Findings tables, additional and study-characteristic tables, all references, history and appendices. **All 33 actual figures personally inspected.** Exact 20 read intervals, asset paths, URLs, hashes and findings are in `/tmp/warwiki-laparoscopic-burch-cochrane-review.md` and `.json`.
3. **CARE author correction letter**, DOI 10.1056/NEJMc1605817: complete Burch letter plus actual journal page 2295 read. Authors Brubaker, Brown and Weber; corrected 33.6%/57.4% confirmed. The detailed correction notice's changed Table 3 and original CARE main remain unread.
4. **Team-owned sources:** SISTEr's full 13-page extracted main/tables/captions/appendix/references and E-SISTEr's full main/all four actual figures are documented in `/tmp/warwiki-sling-current-evidence.md`. The open 2017 Cochrane full text and other figures were assigned to the parent's other two readers; their reports govern completion. This reviewer personally viewed only open-review figure 103, not its entire main.
5. **Current guidelines:** relevant AUA/NICE recommendations were read in defined scopes, not as entire guidelines. Exact local paths, line ranges and version checks are in the JSON.

The full available abstracts of 15 of the 18 original citations were read. Wu, Rogers and ACOG had metadata only and no available abstract. The complete 43,897-character abstract bundle was read, plus the separately resolved Norton abstract. **This does not mean all 18 original papers were read in full.**

## Reference preservation and access gaps

There are 18 final public references: 13 original references retained plus five new guideline, follow-up and correction sources. Parent removed the five unused original citations 1, 3, 6, 11 and 12 after the rewrite; their complete citations and access status remain below and in the JSON. Removal does not close an unread-source gap. All original citations are accounted for.

### Original reference 1

Wu JM. Stress incontinence in women. *N Engl J Med.* 2021;384(25):2428-2436. doi:[10.1056/NEJMcp1914037](https://doi.org/10.1056/NEJMcp1914037).

**Disposition:** Removed from public bibliography because unused after rewrite; complete citation and access gap preserved here. Final number: not applicable.

**Read/access scope:** Bibliographic metadata only; no abstract available. Direct NEJM full text returned 403. Full article, figures and supplements unread.

### Original reference 2

Lapitan MCM, Cody JD, Mashayekhi A. Open retropubic colposuspension for urinary incontinence in women. *Cochrane Database Syst Rev.* 2017;7:CD002912. doi:[10.1002/14651858.CD002912.pub7](https://doi.org/10.1002/14651858.CD002912.pub7).

**Disposition:** Retained in rewritten public bibliography. Final number: 1.

**Read/access scope:** Complete abstract personally read. The entire 409,658-character open 2017 review text was split between sling_source_read and sling_appendix_refs; their exact reports govern completion. Personally inspected actual figure 103 only; the other figures were assigned to other readers. Underlying original trial reads are not implied.

### Original reference 3

Norton P, Brubaker L. Urinary incontinence in women. *Lancet.* 2006;367(9504):57-67. doi:[10.1016/S0140-6736(06)67925-7](https://doi.org/10.1016/S0140-6736(06)67925-7).

**Disposition:** Removed from public bibliography because unused after rewrite; complete citation and access gap preserved here. Final number: not applicable.

**Read/access scope:** Complete Europe PMC abstract read after resolving PMID 16399154; the initial DOI query had no hit. A candidate Citeseer PDF route returned 500/an unsafe archived redirect. Full review unread.

### Original reference 4

Baessler K, Christmann-Schmid C, Haya N, et al. Surgery for women with pelvic organ prolapse with or without stress urinary incontinence. *Cochrane Database Syst Rev.* 2026;2:CD013108. doi:[10.1002/14651858.CD013108.pub2](https://doi.org/10.1002/14651858.CD013108.pub2).

**Disposition:** Retained in rewritten public bibliography. Final number: 2.

**Read/access scope:** Complete official abstract and plain-language summary read by the CARE reviewer; complete abstract personally read. PMC full article is embargoed until 2027-02-06. Full review, forest plots, tables and supplements unread.

### Original reference 5

Albo ME, Richter HE, Brubaker L, et al. Burch colposuspension versus fascial sling to reduce urinary stress incontinence. *N Engl J Med.* 2007;356(21):2143-2155. doi:[10.1056/NEJMoa070416](https://doi.org/10.1056/NEJMoa070416).

**Disposition:** Retained in rewritten public bibliography. Final number: 3.

**Read/access scope:** Complete abstract personally read. The team source reader read the full 13-page original SISTEr extracted main, including both tables, four figure captions/labels, appendix, all 40 references and disclosures. Actual four figures, external protocol and supplements were not read. Public author rehost; see the team source report.

### Original reference 6

Rogers RG. Urinary stress incontinence in women. *N Engl J Med.* 2008;358(10):1029-1036. doi:[10.1056/NEJMcp0707023](https://doi.org/10.1056/NEJMcp0707023).

**Disposition:** Removed from public bibliography because unused after rewrite; complete citation and access gap preserved here. Final number: not applicable.

**Read/access scope:** Bibliographic metadata only; no abstract available. Direct NEJM full text returned 403. Full article, figures and supplements unread.

### Original reference 7

Veit-Rubin N, Dubuisson J, Ford A, et al. Burch colposuspension. *Neurourol Urodyn.* 2019;38(2):553-562. doi:[10.1002/nau.23905](https://doi.org/10.1002/nau.23905).

**Disposition:** Retained in rewritten public bibliography. Final number: 4.

**Read/access scope:** Entire 44,332-character XML-derived full text personally read, including table 1, all 79 references, eight figure captions and disclosures. All eight actual JPEG figures personally inspected. No separate supplement identified. This older narrative review does not override current guidelines.

### Original reference 8

Aleksandrov A, Meshulam M, Rabischong B, Botchorishvili R. Laparoscopic TOT-like Burch colposuspension: back to the future? *J Minim Invasive Gynecol.* 2021;28(1):24-25. doi:[10.1016/j.jmig.2020.04.018](https://doi.org/10.1016/j.jmig.2020.04.018).

**Disposition:** Retained in rewritten public bibliography. Final number: 5.

**Read/access scope:** Complete educational technique-video abstract read. The full accompanying main/video was not retrieved or watched. No clinical superiority claim inferred.

### Original reference 9

Freites J, Stewart F, Omar MI, Mashayekhi A, Agur WI. Laparoscopic colposuspension for urinary incontinence in women. *Cochrane Database Syst Rev.* 2019;12:CD002239. doi:[10.1002/14651858.CD002239.pub4](https://doi.org/10.1002/14651858.CD002239.pub4).

**Disposition:** Retained in rewritten public bibliography. Final number: 6.

**Read/access scope:** Entire 262,664-character review personally read in 20 contiguous, untruncated intervals: all tables, study characteristics, references, history, appendices and disclosures. All 33 actual JPEG figures visually read. A detailed JSON/Markdown record is separate. No original trial full reads inferred.

### Original reference 10

Hill AJ, Jallad K, Walters MD. Laparoscopic Burch colposuspension using a 3-trocar system: tips and tricks. *J Minim Invasive Gynecol.* 2017;24(3):344. doi:[10.1016/j.jmig.2016.08.816](https://doi.org/10.1016/j.jmig.2016.08.816).

**Disposition:** Retained in rewritten public bibliography. Final number: 7.

**Read/access scope:** Complete educational technique-video abstract read. The full accompanying main/video was not retrieved or watched. No comparative effect claim inferred.

### Original reference 11

ACOG Practice Bulletin No. 155: urinary incontinence in women. *Obstet Gynecol.* 2015;126(5):e66-e81. doi:[10.1097/AOG.0000000000001148](https://doi.org/10.1097/AOG.0000000000001148).

**Disposition:** Removed from public bibliography because unused after rewrite; complete citation and access gap preserved here. Final number: not applicable.

**Read/access scope:** Bibliographic metadata only; no abstract available. A candidate LWW access route returned 402; DOI access was unavailable. Full bulletin and supplements unread. Current AUA/NICE recommendations were used for page decisions.

### Original reference 12

Sohlberg EM, Elliott CS. Burch colposuspension. *Urol Clin North Am.* 2019;46(1):53-59. doi:[10.1016/j.ucl.2018.08.002](https://doi.org/10.1016/j.ucl.2018.08.002).

**Disposition:** Removed from public bibliography because unused after rewrite; complete citation and access gap preserved here. Final number: not applicable.

**Read/access scope:** Complete abstract read. The DOI full-source route was unavailable and the full main was not retrieved. All tables, figures and supplements unread.

### Original reference 13

Brubaker L, Cundiff GW, Fine P, et al. Abdominal sacrocolpopexy with Burch colposuspension to reduce urinary stress incontinence. *N Engl J Med.* 2006;354(15):1557-1566. doi:[10.1056/NEJMoa054208](https://doi.org/10.1056/NEJMoa054208).

**Disposition:** Retained in rewritten public bibliography. Final number: 8.

**Read/access scope:** Complete corrected current CARE abstract read; full main returned 403. The complete author correction letter text and actual journal page were read. The detailed correction notice was read only through indexed metadata/opening, not its complete changed Table 3. CARE full main, tables, figures, protocol and supplement remain unread.

### Original reference 14

Oyama K, Ikeda S, Yuda M. Does concurrent Burch colposuspension reduce postoperative stress urinary incontinence in laparoscopic sacrocolpopexy? An interim analysis. *J Minim Invasive Gynecol.* 2025. doi:[10.1016/j.jmig.2025.05.009](https://doi.org/10.1016/j.jmig.2025.05.009).

**Disposition:** Retained in rewritten public bibliography. Final number: 9.

**Read/access scope:** Complete abstract read; full main not retrieved from the DOI route. Actual tables, figures and supplements unread. This is a 20-woman nonrandomized interim cohort with patient-selected treatment and mixed baseline continence, not an RCT.

### Original reference 15

Karmakar D, Dwyer PL, Murray C, et al. Long-term effectiveness and safety of open Burch colposuspension vs retropubic midurethral sling for stress urinary incontinence — results from a large comparative study. *Am J Obstet Gynecol.* 2021;224(6):593.e1-593.e8. doi:[10.1016/j.ajog.2020.11.043](https://doi.org/10.1016/j.ajog.2020.11.043).

**Disposition:** Retained in rewritten public bibliography. Final number: 10.

**Read/access scope:** Complete structured abstract read; full ScienceDirect endpoint returned 403. Original tables, figures and supplements unread. This matched observational cohort of 1,344 women has different endpoints and follow-up from SISTEr.

### Original reference 16

Ye Y, Wang Y, Tian W, et al. Burch colposuspension for stress urinary incontinence: a 14-year prospective follow-up. *Sci China Life Sci.* 2022;65(8):1667-1672. doi:[10.1007/s11427-021-2042-9](https://doi.org/10.1007/s11427-021-2042-9).

**Disposition:** Retained in rewritten public bibliography. Final number: 11.

**Read/access scope:** Complete abstract read; full main not retrieved from the DOI route. Original tables, figures and supplements unread. Only 57/84 participants were retained; 39/57 reported no SUI.

### Original reference 17

Conrad DH, Pacquee S, Saar TD, et al. Long-term patient-reported outcomes after laparoscopic Burch colposuspension. *Aust N Z J Obstet Gynaecol.* 2019;59(6):850-855. doi:[10.1111/ajo.13048](https://doi.org/10.1111/ajo.13048).

**Disposition:** Retained in rewritten public bibliography. Final number: 12.

**Read/access scope:** Complete abstract read; full main not retrieved from the DOI route. Original tables, figures and supplements unread. The 90.5% endpoint combines cure or substantial improvement, not dryness alone.

### Original reference 18

Abughanima MF, Elazab AS, Shalaby M, et al. "Laparoscopic Burch Colposuspension Versus Transobturator Tape for the Treatment of Stress Urinary Incontinence in Egyptian Women: A 12-Month Randomized Controlled Trial." *Neurourol Urodyn.* Published online August 11, 2026. doi:[10.1002/nau.70403](https://doi.org/10.1002/nau.70403)

**Disposition:** Retained in rewritten public bibliography. Final number: 13.

**Read/access scope:** Complete publisher abstract page read, including all 28 references, disclosures, data availability and four supplementary figure captions. The /doi/full route redirected to /doi/abs. Full main and actual supplementary Figures S1–S4 unread. This small 26-per-arm, 12-month trial is not presented as a practice-changing headline.

## Source inconsistencies requiring caution

The complete laparoscopic Cochrane package exposes arm-label reversals in the one-versus-two-suture Summary of Findings table, a reversed objective-cure discussion statement, mixed TVT/SPARC labels and discrepant Foote denominators, unpooled bladder-injury claims inconsistent with trial characteristics, and differences between fixed- and random-effects models. Its quality-of-life pooling also needs score-direction checking before clinical reuse. These are recorded in the dedicated laparoscopic report; none was turned into an unsupported page claim.

The open 2017 review's update added economic commentary; it did not refresh all clinical evidence to 2017. The 2026 concomitant POP review cannot be used as a standalone Burch durability review. The 2019 narrative bibliography contains Prezioso 2013, explicitly excluded as retracted in the 2019 Cochrane; outcome claims from that citation path are avoided.

## Remaining access work

Literal completion of every original source still requires full articles now represented by metadata or abstracts; CARE's original main and detailed changed Table 3; actual SISTEr figures and external protocol/supplement; the current 2026 concomitant Cochrane after embargo or through authorized access; educational video assets; and Abughanima's actual supplementary Figures S1–S4. Do not report these as read because a DOI or abstract was checked. No author contact was made. No actual surgeon review of operative anatomy has occurred.
