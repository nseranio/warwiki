# new-pages verdicts

Group N4 (genitourinary injury during other specialties' operations). Three
new pages in
`docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/procedures-causing-gu-injury/`,
following the existing `cesarean-section.mdx` pattern. No overlap found with
any existing page (`rg -il` for "radical hysterectomy", "pelvic exenteration"
showed no prior WARWIKI treatment of operation-specific GU injury for these
topics).

## docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/procedures-causing-gu-injury/hysterectomy.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| MCFPS-006-001 | adopt | Built as the full page. Used the chapter's attributed operative teaching (anatomic danger zones, approach-specific vaginal-hysterectomy technique, the "universal cystoscopy" recommendation framed as attributed opinion rather than a universal standard, and the stance against routine prophylactic stenting). Went well beyond the seed with independently verified route-specific and risk-factor epidemiology (cystoscopy-based, NSQIP, and large administrative-database series) and delayed-presentation/fistula data, since the seed explicitly deferred new rate estimates to separate verification. | MCFPS ch. 6 (Selle, Gebhart), new ref1; 12 independently verified primary papers, new refs 3-13 (Kiran 2016 BJOG doi 10.1111/1471-0528.13576; Ibeanu 2009 Obstet Gynecol doi 10.1097/AOG.0b013e31818f6219; Dallas 2019 Obstet Gynecol doi 10.1097/AOG.0000000000003353; Wallis 2016 Urology doi 10.1016/j.urology.2016.06.037; Petersen 2018 J Minim Invasive Gynecol doi 10.1016/j.jmig.2018.01.004; Adelman 2014 J Minim Invasive Gynecol doi 10.1016/j.jmig.2014.01.006; Sandberg 2017 J Minim Invasive Gynecol doi 10.1016/j.jmig.2016.10.020; AAGL 2012 J Minim Invasive Gynecol doi 10.1016/j.jmig.2012.05.001; Bhandari Randhawa 2026 Urogynecology doi 10.1097/SPV.0000000000001934; Hilton 2012 BJOG doi 10.1111/j.1471-0528.2012.03474.x), plus Karram/Gebhart cystotomy-repair chapter (new ref2) |

13 references, contiguous, `lint:citations` clean.

Hub: added a `section-stack` card (replacing the "Hysterectomy" line in
"Planned additions") in
`procedures-causing-gu-injury/index.mdx`. Cross-links added: inline pointer
from
[Ureterovaginal Fistula](/docs/clinical-conditions/03f-fistulas/in-females/ureterovaginal)
and
[Vesicovaginal Fistula](/docs/clinical-conditions/03f-fistulas/in-females/vesicovaginal)
(both already had a "for the operative settings that produce the fistula"
pointer sentence; extended it to include this page and the radical-
hysterectomy page below).

Uncertain: the finding's "chapter authors advocate universal cystoscopy" is
preserved explicitly as attributed opinion rather than site-wide policy, per
the seed's own instruction, since the existing cystoscopy pages elsewhere on
the site frame use by risk and procedure rather than universally.

## docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/procedures-causing-gu-injury/radical-hysterectomy-pelvic-lymphadenectomy.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| MCFPS-032-001 | adopt | Used for the Pelvic and Paraaortic Lymphadenectomy sections (Prevention Adjuncts for Lymphadenectomy; Recognition), framed as attributed operative guidance for difficult anatomy, not a routine protocol, as instructed. | MCFPS ch. 32 (Hoffman, Shames, Bochner), new ref6; Martin 2021 Gynecol Oncol (verified primary paper behind the chapter's background citation), new ref7 |
| MCFPS-033-001 | adopt | Used for the bulk of the page: ureteral-injury anatomy/technique, the stent-stiffening caveat as attributed opinion, the 1-2% ureteral / up to-4% bladder injury ranges explicitly flagged as a heterogeneous, non-harmonized estimate, bladder-injury anatomy and recognition, and postoperative bladder-care practices. Did not adopt the chapter's internally inconsistent "&lt;100 mL PVR" sentence (the seed itself flags it as inconsistent with the described inability to empty) — used the independently verified Novackova 2020 and Maneschi 2012 urodynamic series instead for quantified postoperative voiding data, and the verified Plante 2024 NEJM trial and Landoni 2001 trial for how radicality trades against urinary morbidity, rather than citing the chapter's own pooled literature synthesis for those specific numbers. | MCFPS ch. 33 (Hoffman, Bou Zgheib, Avila, Chern), new ref2; Querleu-Morrow 2017 classification (already cited elsewhere on the site, e.g. cervix.mdx ref22; reused here as new ref1); Landoni 2001 Gynecol Oncol (new ref3); Plante 2024 NEJM (new ref4); Kiran 2016 BJOG (new ref5); Novackova 2020 Int Urogynecol J (new ref8); Maneschi 2012 Int J Gynecol Cancer (new ref9); Campbell 2017 J Obstet Gynaecol (new ref10); Ramirez 2018 NEJM LACC trial (new ref11, added for context on approach and oncologic outcome, which the seed did not request but which a reconstructive urologist needs to understand what operation a referred patient actually had) |

11 references, contiguous, `lint:citations` clean. Caught and fixed two DOIs
initially mistyped from memory (Campbell 2017 and Martin 2021) by re-running
`pubmed.py pmid` before finalizing; both now copied exactly from tool output.

Hub: added a `section-stack` card (replacing the "Radical hysterectomy &
pelvic lymphadenectomy" line in "Planned additions") in
`procedures-causing-gu-injury/index.mdx`. Cross-links added: same
vesicovaginal/ureterovaginal pointer-sentence extension as above.

Uncertain: the chapter-level 1-2%/up-to-4% injury rates (ref2) are presented
explicitly as a non-harmonized, order-of-magnitude estimate per the seed's
own caveat, rather than a precise contemporary rate; the page also carries
the better-sourced Kiran 2016 cohort rate (10.7% for abdominal radical
hysterectomy for uterine cancer) alongside it for contrast.

## docs/05-special-populations/05a-trauma-emergencies/intraoperative-consultation/procedures-causing-gu-injury/pelvic-tumor-resection.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| MCFPS-026-001 | adopt | Used for the page's General Principles section (identify-both-ureters-first, segmental adventitial blood supply, the margin-vs-reconstruction judgment for benign/low-grade tumors versus sarcoma), framed as attributed chapter-author guidance, not a universal rule. | MCFPS ch. 26 (Zervos, Vohra), new ref1 |
| MCFPS-034-001 | adopt | Used for the full Ovarian Cancer Cytoreduction section (mechanism, stenting/ICG/lighted-stent adjuncts explicitly framed as unproven in this operation, recognition including the extrapolation caveat on cystoscopy evidence, delayed-presentation workup). | MCFPS ch. 34 (Long, Cliby), new ref2; independently verified White 2021 Colorectal Dis (new ref4), Boyan 2017 Ann Transl Med (new ref5), Abu-Zaid 2017 Ir J Med Sci (new ref6), Teeluckdharry 2015 Obstet Gynecol (new ref7) |
| MCFPS-039-001 | adopt | Used for the Recurrent and Extended Pelvic Resection section (composite urinary-complication rate explicitly flagged as a broad composite not a per-injury rate, operative anatomy/prevention, recognition, prophylactic-stent evidence flagged as conflicting and extrapolated from other specialties). | MCFPS ch. 39 (McDonald, Gonzalez), new ref3; independently verified Solomon 2015 Br J Surg (new ref9), Daix 2022 Gynecol Oncol (new ref10), Feng 2020 Transl Androl Urol (new ref11, already cited elsewhere on the site as ureteral-trauma.mdx ref15), Merola 2018 JAMA Surg (new ref12), da Silva 2012 Asian J Endosc Surg (new ref13) |

Beyond the three seeds: added a Retroperitoneal Sarcoma section (new ref8,
Sohail 2021 Med J Malaysia, a vascularized appendix-interposition ureteral
reconstruction case report — kept brief and explicitly framed as a described
technique, not an outcome series) and a "Urinary Reconstruction After Pelvic
Exenteration" subsection under the Recurrent/Extended section, since the
three seeds all converge on exenterative/extended pelvic surgery but none
addresses what happens when exenteration includes planned cystectomy and
diversion — judged a necessary half-page to avoid leaving the GU-reconstruction
half of exenteration undescribed. Sourced independently: Martinez-Gomez 2021
Int J Gynecol Cancer diversion-type comparison (new ref14), Wright 2023
Surgeon double-barrel wet colostomy (new ref15), Lazarovich 2024 Heliyon
pelvic-exenteration urological outcomes (new ref16).

16 references, contiguous, `lint:citations` clean. Caught and fixed six DOIs
initially mistyped from memory (White, Boyan, Abu-Zaid, Daix, Merola, Wright)
and one citation detail error (Sohail — wrong author list and page range) by
re-running `pubmed.py pmid`/`cite` before finalizing.

Scope note: the page's opening paragraph explicitly excludes primary rectal-
cancer LAR/APR/TME (already a separate "planned addition" on the index and
already has colorectal-specific risk data on `ureteral-trauma.mdx`), to avoid
duplicating that future page.

Hub: added a new `section-stack` card to
`procedures-causing-gu-injury/index.mdx` (this topic was not previously in
"Planned additions" at all; added per the brief). Cross-link added: one-line
pointer from
[The Presacral Space](/docs/foundations/anatomy-physiology/pelvis-support/presacral-anatomy)
(existing posterior-pelvic-exenteration sentence) to this page.

Uncertain: nothing left unresolved on this page. The "up to 25%" composite
urinary-complication figure (MCFPS-039-001) is presented explicitly as a
composite across several injury types from an extended/selected operative
population, per the seed's instruction, not as a per-injury-type rate.

## Checks

`npm run lint:citations`, `npm run lint:links`, `npm run lint:orphans`,
`npm run lint:scope` and `npm run lint:cards` all run clean on the three new
pages, the index, and the five pointer edits (`ureterovaginal.mdx`,
`vesicovaginal.mdx`, `presacral-anatomy.mdx`). The link and citation checks
each still report a handful of pre-existing issues in other agents'
in-progress files (`ectopic-ureter-ureterocele.mdx`, `bladder-diverticula.mdx`,
`bladder-diverticulectomy.mdx`, `acquired-vaginal-stenosis-repair.mdx`,
`groin-defect-reconstruction.mdx`) — none of those files were touched by this
group and none of the reported issues involve this group's pages or edits.

## Group N2 (female genital, pelvic floor and flaps)

Five new pages. Checked for overlap first with `rg -il` across `docs/` for
each topic; no existing page covered any of the five (closest neighbors —
`perineoplasty-de-adhesion.mdx` for LS introital scarring,
`neovaginal-stenosis-management.mdx` for GAS neovaginal stenosis,
`chronic-pelvic-pain.mdx` for vestibulodynia diagnosis,
`genital-lymphedema.mdx` for lymphadenectomy as a cause of lymphedema, and
`sacrocolpopexy.mdx`/individual flap pages for the other three — address
related but distinct material and are cross-linked, not duplicated).

### docs/04-surgical-techniques/04e-genital-reconstruction/acquired-vaginal-stenosis-repair.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| APAGS2020-060-002 | adopt | Built as the page's core: etiology table, evaluation/classification, dilation first-line, surgical release by extent of scar (ring/band, post-episiotomy, lateral/circumferential flap, graft, salvage neovagina), reworded as "has been described" chapter-author teaching throughout, not adopted as validated technique or outcomes. | APAGS2020 ch. 60 (Gebhart, Karram), new ref1 |
| APAGS2020-101-001 | adopt | Used for the post-episiotomy scar-release/posterior-advancement example under "Surgical release for a focal ring or band." | APAGS2020 ch. 101 (Karram), new ref2 |

Went beyond the two seeds: added a radiation-specific dilation-evidence
subsection (Cochrane review found no RCTs and no proof dilation prevents
stenosis; the companion systematic review's acute-phase-injury caution),
a mesh-constriction subsection citing a urogynecology-perspective review, and
an Outcomes section citing a real (if etiologically distinct — caustic
injury, not the radiation/surgery/fistula causes this page otherwise covers)
21-patient surgical-outcomes series as a caution against assuming high
success in severe stenosis; its population is explicitly flagged as
non-generalizable to the page's main causes. 6 references, contiguous,
`lint:citations` clean. All new citations verified via `pubmed.py`
search/pmid; none taken from the textbook's own reference list without
independent verification.

Hub/database: added to the `vulvar.mdx` treatment database under a new
"Other Acquired Vaginal / Vestibular — Surgical" domain. Cross-links added:
`ftsg.mdx` (vaginal stenosis/foreshortening section, pointing to this page
for the broader framework) and the `vulvar.mdx` Concurrent Procedures row
for inguinofemoral lymphadenectomy is unrelated to this page and was not
touched for it.

Uncertain: nothing left unresolved. The chapter's specific Z-plasty/graft
dimensions are kept explicitly attributed as the chapter's own operative
figures, not validated thresholds, per the seed's own caution.

### docs/04-surgical-techniques/04e-genital-reconstruction/vestibulectomy.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| TFUUG1-066-002 | adopt | Built as the page's operative-technique section, attributed explicitly to contributing author Irwin Goldstein's described approach rather than a universal standard, per the seed's caution. The unverifiable 1% Bartholin-cyst figure (no denominator in the chapter passage) was dropped as instructed. | TFUUG1 ch. 66 (Uloko, Goldstein), new ref1 |

Went well beyond the seed: added the 2015 ISSVD/ISSWSH/IPPS terminology and
patient-selection framing (reusing the same Bornstein 2016 reference the site
already cites on `chronic-pelvic-pain.mdx` for this exact consensus), and
replaced the chapter's unverifiable 1% Bartholin-cyst estimate with a
verified, current (2024) systematic review of surgery for provoked
vulvodynia (29 studies) giving real success-rate ranges (52-97%), a sourced
9% Bartholin-cyst complication rate, and the review's own call for better
trials — substantially stronger evidence than the single-chapter seed
offered. 3 references, contiguous, `lint:citations` clean. All citations
verified via `pubmed.py`.

Hub/database: added to the `vulvar.mdx` treatment database under the new
"Other Acquired Vaginal / Vestibular — Surgical" domain (shared with the
stenosis page above). Cross-link added: inline pointer from the
vestibulodynia section of `chronic-pelvic-pain.mdx` ("Vestibulodynia —
cotton-swab test and clock-face mapping") to this page, as the brief
specified.

Uncertain: nothing left unresolved.

### docs/04-surgical-techniques/04e-genital-reconstruction/groin-defect-reconstruction.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| AMUGRS-046-001 | adopt, with a correction | Used for the sartorius-transposition technique (division near the ASIS, limited mobilization, medial rotation) and for placing abdominal-advancement and scrotal-advancement flaps in context, exactly as the seed suggested, but NOT cited to the textbook alone. The textbook's own cited primary source for the abdominal-advancement-flap technique (Tabatabaei & McDougal 2003) was independently verified and cited directly instead of the chapter paraphrase. The chapter's specific anatomic claim ("most proximal pedicle about 6 cm distal to the ASIS") was dropped because a verified cadaveric angiographic study (Mojallal 2011) describes the sartorius's major-pedicle clusters at 18-25 cm and 35-44 cm from the ASIS — a different metric (major-pedicle cluster vs. the chapter's own first-pedicle landmark) but close enough to the chapter's number that citing both without reconciling them risked presenting contradictory anatomy; Mojallal's verified numbers were used for the vascular-anatomy claim and the chapter's technique description was kept without the specific unreconciled distance. | AMUGRS ch. 46 (Brandes, Eswara), new ref1; Tabatabaei 2003 *J Urol* (new ref2, independently verified, the same paper the chapter itself cites); Mojallal 2011 *Plast Reconstr Surg* (new ref5, independently verified cadaveric anatomy, not from the chapter) |

Went beyond the seed: added a "Reconstructive Problem" section with current
wound-complication epidemiology from two independently sourced series
(Stuiver 2013, 163 patients/237 dissections; Schifano 2023, 421
patients/660 dissections with a fascial-sparing technique), including the
explicit, important caution that sartorius transposition was itself
associated with higher odds of grade ≥2 wound complications in the Stuiver
cohort (worded as an association, not causation, per STYLE.md) — this
tempers the seed's framing of sartorius coverage as straightforwardly
protective. Also added a Lymphatic Complications section cross-linking
`genital-lymphedema.mdx`. Kept the page strictly to reconstruction, not
oncologic ILND indications or nodal boundaries, per the brief. 5 references,
contiguous, `lint:citations` clean. All citations independently verified via
`pubmed.py`; none taken on the textbook's word alone.

Hub: linked from the `04e-genital-reconstruction/index.mdx` See Also list,
from the `vulvar.mdx` Concurrent Procedures row for inguinofemoral
lymphadenectomy, and from `genital-lymphedema.mdx`'s inguinal-lymphadenectomy
etiology bullet.

Uncertain: the Mojallal-vs-chapter pedicle-distance question above. Also
flagging for the record that this file's final path is
`groin-defect-reconstruction.mdx` per the task's explicit instruction, not
`groin-defect-reconstruction-after-ilnd.mdx` as named in
`batches/new-pages.json`/the AMUGRS finding itself.

### docs/04-surgical-techniques/04g-prolapse-repair/apical/cesa-vasa.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| TFUUG2-104-001 | adopt, substantially upgraded | Used for the technique description (PVDF strips, S1 tack fixation, CESA-vs-VASA distinction) and the chapter's own cited prospective outcomes, but the seed's own continence-rate figures were superseded by directly reading the primary papers the chapter draws on, which turned out to be far better evidence than a single book chapter: a 2022 systematic review (Page, Deprest) and two primary cohort papers (Rexhepi 2018, n=120; Ludwig 2025, n=145 open-vs-laparoscopic) not mentioned in the seed finding at all. The seed's 71-patient figure (33%/62% pre-tape, 71%/77% post-tape) was dropped in favor of the better-sourced, more current numbers from these three papers, since AGENT-BRIEF rule 6 prohibits merging figures from different studies and the seed's own Ludwig/Stumm reference (an open-access journal case series) could not be independently verified via PubMed. | TFUUG2 ch. 104 (Jeffery, Jere), new ref1; Page 2022 *Eur J Obstet Gynecol Reprod Biol* systematic review (new ref2, independently found via `pubmed.py search`, not in the seed); Rexhepi 2018 *J Endourol* (new ref3, same); Ludwig 2025 *J Clin Med* (new ref4, same) |

Also added an explicit Limitations section: no AUA/SUFU/ICS/AUGS endorsement,
no randomized comparison against sacrocolpopexy/SSLF/USLS, a different mesh
material (PVDF) and fixation (tacks) than standard sacrocolpopexy, and a
conflict-of-interest note (several outcome series' authors disclose a
consulting/financial relationship with the mesh manufacturer, visible in the
PubMed-indexed conflict-of-interest statements) — none of this was in the
seed, which only flagged the material as "a proposed concise reference page,
not established comparative evidence." 4 references, contiguous,
`lint:citations` clean.

Hub/database: added a row to the `prolapseProcs` database in
`04g-prolapse-repair/index.mdx` (Apical compartment, between Pectopexy and
the historical transvaginal-mesh row). Cross-link added: one sentence in
`sacrocolpopexy.mdx`'s intro paragraph, alongside its existing pointers to
Supracervical Hysterectomy/Sacrohysteropexy/Pectopexy.

Uncertain: whether CESA/VASA belongs in the apical sub-comparison table
further down `04g-prolapse-repair/index.mdx` alongside USLS/SSLF/
Sacrocolpopexy/Manchester — left out for now since the evidence is too thin
for a head-to-head row; a database entry with explicit caveats seemed more
honest than forcing it into that comparison table.

### docs/01-foundations/surgical-principles/flaps/pelvic-perineal-flap-postoperative-care.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| MCFPS-041-001 | adopt | Built as the page's core structure (positioning/offloading, drain management, serial flap assessment and salvage thresholds), reworded throughout as attributed chapter-author recommendation, not a validated protocol, per the seed's own caution. | MCFPS ch. 41 (Pribaz, Whalen), new ref1 |
| PERIREC-008-001 | adopt | Used for the lotus-petal/gluteal V-Y positioning and mobilization/catheter/discharge timing. | PERIREC ch. 8 (Loh, Niranjan), new ref3 |
| PERIREC-009-002 | adopt | Used for the gracilis donor-site hip-motion and sitting limits. | PERIREC ch. 9 (Kolehmainen, Suominen), new ref4 |
| PERIREC-010-002 | adopt | Used for the PAP-specific positioning, turning interval and sitting duration. | PERIREC ch. 10 (Kosutic), new ref5 |

Went beyond all four seeds: led the Positioning section with a 2025
randomized controlled trial (51 patients) of early mobilization versus 5
days' bed rest after IPAP flap reconstruction of irradiated
abdominoperineal-resection defects, found independently via `pubmed.py` (it
was already cited on `lotus-petal.mdx` as ref22, so reused rather than
re-verified from scratch) — a direct, current counter-point to the
textbook chapters' more conservative bed-rest teaching, explicitly framed as
not generalizable beyond IPAP reconstruction. Also added a Hackenberger 2019
medicinal-leech review (independently verified; already cited in the MCFPS
chapter's own reference list, confirmed via `pubmed.py` rather than copied
from the chapter) for the leech-therapy claim in Serial Flap Assessment. 6
references, contiguous, `lint:citations` clean.

Hub/individual pages: added a "Postoperative Care" pointer section to
`flaps-gu-reconstruction.mdx` (the flaps hub), plus one-line cross-links in
`gracilis.mdx` ("Postoperative Care" subsection), `vram.mdx` ("Donor-Site
Management" section), `posterior-thigh.mdx` ("See Also") and
`lotus-petal.mdx` ("See Also"), per the brief's explicit instruction to link
from the hub and the individual flap pages.

Uncertain: nothing left unresolved.

## Checks (Group N2)

`npm run lint:citations`, `npm run lint:links` and `npm run lint:orphans` all
ran clean for this group's five new pages and eleven cross-link edits
(`vulvar.mdx`, `ftsg.mdx`, `chronic-pelvic-pain.mdx`, `genital-lymphedema.mdx`,
`04e-genital-reconstruction/index.mdx`, `04g-prolapse-repair/index.mdx`,
`sacrocolpopexy.mdx`, `flaps-gu-reconstruction.mdx`, `gracilis.mdx`,
`vram.mdx`, `posterior-thigh.mdx`, `lotus-petal.mdx`). `npm run lint:scope`
ran clean across the whole repository. The link check's 4 pre-existing
broken-link failures and the N4 group's note above both belong to other
groups' in-progress files and do not involve any page this group touched.
`npm run build` was not run, per the brief.

## Group N1 (bladder, diversion, upper tract)

Five new pages. Checked for overlap first (`rg -il` for "diverticul",
"vesicoureteral reflux"/"VUR", "ureterocele", "ectopic ureter", "sigmoid
neobladder" across `docs/`) — no existing page covered any of these five
topics; closest neighbors were `urethral-diverticula.mdx` (a different organ),
`sigmoid-cystoplasty.mdx` (augmentation, not total replacement), and scattered
one-line mentions in embryology/imaging/urodynamics pages.

### docs/03-clinical-conditions/03b-voiding-outlet/bladder-diverticula.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| CWW13-122-001 | adopt | Used for the obstruction-first evaluation/management framework, the pressure-sink urodynamic caveat, and the catheter-drainage/endoscopic fallback for poor surgical candidates. The chapter's own book_refs (Pacella 2019, Powell/Kreder 2009, Schulze/Hald 1983, Adot Zurbano 2005) were all independently verified on PubMed and cited directly as primary sources rather than through the textbook; only the overall evaluation/management sequence is attributed to the textbook chapter itself (ref1). | CWW13 ch. 122 (Cox, Rovner), new ref1; Powell/Kreder 2009 PMID 19942049 (ref2); Wilson/Klufio 1985 PMID (already on site, urodynamics.mdx ref63) (ref3); Adot Zurbano 2005 (already on site, urodynamics.mdx ref64) (ref4); Pacella 2019 PMID 31577098 (ref7); Schulze/Hald 1983 PMID 6417773 (ref9) |

Went beyond the seed: added a "Cancer risk within a diverticulum" section
(the seed did not raise this), sourced independently via `pubmed.py search` —
Fang 2019 PLoS One population-based cohort (HR 2.63 for bladder cancer after
documented diverticulum) and DeWitt-Foy 2023 institutional cohort (764
patients, cancer in 13.3% overall / within the diverticulum in 35.3% of
those) — because an adult reconstructive page on this topic needs the
malignancy-risk framing before it can responsibly tell a reader "size alone
is not an indication for surgery." Also added a laparoscopic-vs-endoscopic
comparative study (Pacella 2018, ref8) for the nonoperative-alternatives
section, since the seed's only cited endoscopic series had no comparator.

9 references, contiguous, `lint:citations` clean. Caught and corrected one
case where I had initially mis-copied a DOI pattern by analogy rather than
from tool output — re-ran `pubmed.py pmid` for every new reference before
finalizing (see Checks).

Hub: this is a visible sidebar category (`03b-voiding-outlet`, no
`sidebar-hidden-category` class), so the page is sidebar-reachable without a
database row. Cross-links added: inline link from
[Bladder Outlet Obstruction](/docs/clinical-conditions/03b-voiding-outlet/bladder-outlet-obstruction)
("Bladder diverticula and trabeculation" complication bullet) and from
[Simple Prostatectomy](/docs/surgical-techniques/bph-male-luts/simple-prostatectomy)
(the "large diverticula" indication bullet, which now also links to the
diverticulectomy procedure page). Condition page and procedure page
cross-link each other in the opening paragraph and See Also, per the brief.

Uncertain: nothing left open. The chapter gives no validated diverticulum-size
cutoff for surgery, and the page says so explicitly rather than inventing one.

### docs/04-surgical-techniques/04b-bladder-reconstruction/bladder-diverticulectomy.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| CWW13-124-001 | adopt | Used for the open intravesical technique description (bladder distension, diverticular-sac catheterization, circumferential mucosal incision ~0.5 cm from the neck, two-layer closure) and the open-vs-minimally-invasive approach framing, explicitly worded as one description of the operation rather than a fixed specification, per the finding's own caution. The chapter's cited book_refs (Khonsari 2004, Porpiglia 2004, Macejko 2008, Abdel-Hakim 2007) were checked on PubMed; Khonsari and Abdel-Hakim were kept as cited primary sources, Porpiglia and Macejko were superseded by larger/more recent robotic series found independently (see below) and dropped from the final reference list to avoid citing a weaker, older comparison when stronger evidence exists on the same point. | CWW13 ch. 124 (Ferguson, Kaouk), new ref1; Khonsari 2004 PMID 15035845 (ref5, DOI corrected after re-verification — see Checks); Abdel-Hakim 2007 PMID 17263616 (ref4, DOI corrected after re-verification) |

Went well beyond the seed on outcomes: the finding explicitly said the
chapter reports no randomized comparison of approach, so I built a
"Robotic series and outcomes" comparison table from independently verified
modern series (`pubmed.py search "robotic bladder diverticulectomy outcomes"`
and "bladder diverticulum adult bladder outlet obstruction management") —
Davidiuk 2015 (external-vs-internal dissection technique and operative-time
difference), Tufek 2016 (concurrent TURP/PVP), Giannarini 2022 (IPSS/PVR
outcomes at 6 months), and Gibson 2024 (28-patient multi-surgeon series,
including malignant cases). None of these were in the seed finding; they
were the obvious "research beyond the seed" step for a page whose only
chapter-sourced evidence was explicitly non-comparative.

10 references, contiguous, `lint:citations` clean.

Hub: added a "Bladder Diverticulectomy" row to the `bladderTechniques`
database and a new "Diverticulectomy" badge color in
`04b-bladder-reconstruction/index.mdx` (the existing two domains, Capacity/
Reservoir and Catheterizable Channels, did not fit). Cross-links added:
inline link from
[Simple Prostatectomy](/docs/surgical-techniques/bph-male-luts/simple-prostatectomy)
alongside the condition-page link above. Condition/procedure pages
cross-link each other per the brief.

Uncertain: no randomized trial compares open, laparoscopic, and robotic
diverticulectomy, or concurrent versus staged outlet treatment; the page
says this explicitly rather than ranking the approaches.

### docs/04-surgical-techniques/04c-urinary-diversion/sigmoid-neobladder.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| TRUS08-041-001 | adopt | Used for the operative-technique description (sigmoid-artery pedicle, medial-tenia detubularization, dependent-U configuration, submucosal antireflux ureteral implantation, tension-free urethral anastomosis), explicitly attributed to the Reddy/Reddy chapter and worded as the authors' own practice, not a validated specification, per the finding's caution. The chapter's own primary papers (Reddy 1991, Reddy 1987) were verified on PubMed and cited directly rather than through the textbook for the outcome numbers they actually report (1-year capacity/pressure/continence data). | TRUS08 ch. 41 (Reddy AK, Reddy PK), new ref2; Reddy 1991 PMID 1984098 (ref1); Reddy 1987 PMID 3625847 (ref4) |

Went well beyond the seed: the finding explicitly said not to transfer the
chapter's "broad continence, pressure, or voiding-frequency ranges without
source-level denominators," so rather than using the chapter's pooled ranges
I built the outcomes section entirely from independently verified modern
series with their own denominators and follow-up — Nicita 2016 (160
patients, mean 6.8-year follow-up), Miyake 2010 (82 patients, SF-36
quality-of-life comparison), Xu 2013 (210 patients, detaenialized
non-detubularized variant), and El-Helaly 2019 (52-patient sigmoid-vs-ileal
comparison, the only head-to-head data found for this specific question).
This is a low-priority, evidence-limited topic per the finding, so the page
is kept proportionally short rather than padded.

7 references, contiguous, `lint:citations` clean.

Hub: added a "Sigmoid Colon Neobladder" row (Continent Orthotopic family) to
the `diversionData` database in `04c-urinary-diversion/index.mdx`, following
the existing `mansoura-neobladder.mdx`-style pattern (`sidebar_class_name:
sidebar-hidden-item`, reached via the database). Cross-link added:
[Sigmoid Cystoplasty](/docs/surgical-techniques/04b-bladder-reconstruction/sigmoid-cystoplasty)
now distinguishes itself from the neobladder page in its opening paragraph
(augmentation retaining the native bladder vs. total orthotopic
replacement).

Uncertain: nothing left open. The reported continence range (45%-100%
complete continence across series) is presented explicitly as reflecting
differences in selection, technique and definition rather than a single
expected outcome, since no comparative trial resolves it.

### docs/03-clinical-conditions/03e-upper-tract/adult-vesicoureteral-reflux.mdx

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| TLCCU-016-001 | adopt | Used for the primary-vs-secondary-reflux framing, the adult evaluation sequence, and the Köhler 2001 adult surgery-vs-prophylaxis comparison (33% vs 72% pyelonephritis), explicitly flagged as predating current antibiotic-stewardship practice and not a current guideline position, per the finding's own caution. The chapter's cited pregnancy sources (El-Khatib 1994, Mor 2003) were superseded by newer, better evidence found independently (see below) rather than used directly, since more recent systematic review-level data exists on the same question. | TLCCU ch. 16 (Friedman, Hanna), new ref1; Köhler 2001 PMID 11208994 (ref5, author list and page range corrected to match the verified PubMed record rather than the chapter's citation — see Checks) |

Went well beyond the seed, which explicitly said its pregnancy and
pyelonephritis-nephropathy content was "candidate elements from a 2015
narrative review... not current guideline recommendations." I therefore
built the Reflux Nephropathy and Pregnancy sections mainly from independently
verified, more current sources: Mattoo 2011 (reflux-nephropathy review,
sex-based presentation difference), Attini 2018 (systematic review/
meta-analysis of 434 women/879 pregnancies, 2000-2016, giving sourced odds
ratios for pregnancy-induced hypertension and pre-eclampsia that the 2015
chapter did not have), and Hollowell 2008 (the key "scarring, not reflux
itself, drives pregnancy morbidity" review). Also added a modern-evidence
Treatment section the seed did not request: Murphy 2011 (endoscopic Deflux
injection in 19 adult women, 96% eventual success) and Duty/Barry 2015
(reflux after renal transplantation), since "after kidney transplant" was
explicitly named in this group's brief as an adult presentation to cover and
the 2015 textbook chapter does not address it at all.

7 references, contiguous, `lint:citations` clean.

Hub: visible sidebar category (`03e-upper-tract`), sidebar-reachable without
a database row. Cross-link added: inline link from
[Ureteral Reimplantation](/docs/surgical-techniques/04d-upper-tract-reconstruction/ureteral-reimplantation)
("Adult Distal Reconstruction" section, pointing readers with reflux rather
than structural disease to this page).

Uncertain: nothing left open.

### docs/03-clinical-conditions/03e-upper-tract/ectopic-ureter-ureterocele.mdx

Combined page per this group's brief (filename
`ectopic-ureter-ureterocele.mdx`, differing from the seed JSON's two separate
proposed filenames, `ureterocele-ectopic-ureter.mdx` and `ureterocele.mdx`,
which the brief's explicit instruction superseded).

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| TRUS08-023-001 | adopt (reframed for adults) | Used only for the general anatomy-and-function decision framework (single vs. duplex, obstruction, reflux, moiety function) and the classic clinical clues (continuous leakage in girls, recurrent epididymitis in boys), reworded around the adult-presentation versions of those same clues. Explicitly did not carry forward any of the chapter's dated incidence/outcome percentages, per the finding's own instruction. | TRUS08 ch. 23 (Lee, Palmer), new ref2 |
| URETER-005-001 | adopt (partial) | Used only for the classification framing (intravesical/orthotopic vs. ectopic, anatomy-and-function-based management) and the general "individualized management" statement. Rejected the chapter's 44-patient monopolar-vs-holmium-laser comparison: it is a pediatric endoscopic-technique comparison with no group sizes or denominators given even in the chapter, and this group's brief frames the page for adults with stone management and pediatric operative technique explicitly out of scope. | URETER ch. 5 (Fahmy); title/editors corrected to the `BOOKS.md` canonical entry (Abdel-Gawad, Ali-El-Dein, Barry, Stenzl, eds., *The Ureter: A Comprehensive Review*) rather than the chapter's own running head, which named a different, non-canonical title — new ref3 |
| HINMAN5-039-001 | reject | Pure pediatric endoscopic operative technique (puncture location, T-configuration incision for an ectopic outlet, Crede-maneuver check, laser "watering-can" puncture parameters). This group's brief frames the page for adults, with childhood operations as background only, not as a site for pediatric operative-technique instruction; none of this content is adult-relevant decision-making. Not cited. |
| CWW13-052-001 | adopt (as background) | Used in a dedicated "Background" subsection to explain why an adult patient may present with a history of more than one prior childhood procedure (reoperation risk after endoscopic incision), explicitly labeled as pediatric outcome data and not adult guidance, per this group's brief. Cited the chapter's own underlying primary sources directly instead of the chapter: Byun/Merguerian 2006 meta-analysis and Sander 2015 single-institution series, both verified on PubMed, which also resolved the chapter's own stated internal inconsistency (de novo reflux "0-50%" vs. "0-60%") by using Sander's actual reported single-system/duplex figures (55.6%/14.9% cure, 27.8%/56.2% de novo reflux, 3.8%/73.7% reoperation, n=83) with their real denominator instead of the chapter's unsourced range. | Byun 2006 PMID 16945677 (ref8); Sander 2015 PMID 25167992 (ref11) |
| CWW13-052-003 | adopt | Used for the "Sequelae of childhood ureterocele repair" section (bladder-base/trigonal-support mechanism, lateral VCUG/videourodynamics/antegrade-cystoscopy-via-suprapubic-puncture evaluation, and reconstruction/catheterization/bulking management options), preserving the finding's instruction to keep the differing Abrahamsson vs. other-series bladder-dysfunction rates as attributed observations rather than a single reconciled rate. | CWW13 ch. 52 p. 1059 (Stanasel, Peters), new ref9; Abrahamsson 1998 PMID 9751395 (ref10, DOI corrected after re-verification — see Checks) |

Went beyond the seeds on the core adult-presentation material, since none of
the five seeds actually described how an adult presents with these
anomalies (all five are pediatric-evaluation or pediatric-technique
findings). Built the "Adult Presentations" section — the page's core content
— from an independent literature search: Toia 2019 (the only dedicated adult
case series found, 9 women/1 man, MRI as the preferred imaging modality,
bladder-neck-reconstruction outcomes, and the 8% retained-stump malignancy
estimate), MacDonald 1986 (classic male ectopic-ureter description), and two
incidental-adult-ureterocele case reports (Thilagarajah 2000, found during
hypertension workup; Leventis 2000, found during prostate cancer treatment).

11 references, contiguous, `lint:citations` clean. Caught and corrected two
DOIs I had initially typed from memory rather than copying from the tool
output (Köhler 2001 author list/pages on the sibling adult-VUR page, and
Abrahamsson 1998's DOI here), and one textbook-citation error (used the
chapter's own non-canonical book title/editors for URETER ch. 5 instead of
the `BOOKS.md` entry) — all fixed by re-running `pubmed.py pmid` and
re-checking `BOOKS.md` before finalizing. Also caught and fixed a citation
placed against the wrong source (a sentence about adult incidental-ureterocele
management was initially marked with the Byun 2006 pediatric meta-analysis
citation, which does not support it; repointed to the three textbook
sources that do, and removed the resulting duplicate Byun reference entry).

Hub: visible sidebar category (`03e-upper-tract`), sidebar-reachable without
a database row. Cross-links added: inline links from
[GU Embryology](/docs/foundations/anatomy-physiology/pelvis-support/gu-embryology)
(the existing Ureterocele/Ectopic ureter bullet definitions), and from
[Urethral Prolapse](/docs/clinical-conditions/03b-voiding-outlet/urethral-prolapse)
(the "Prolapsed ureterocele" differential-diagnosis table row).

Uncertain: adult-specific comparative outcome data for ureterocele management
(as opposed to ectopic ureter, where Toia 2019 gives real adult numbers) is
essentially limited to case reports; the page says this directly rather than
extrapolating pediatric endoscopic-incision outcome rates onto adult
decision-making.

## Checks (group N1)

`npm run lint:citations`, `npm run lint:links`, `npm run lint:orphans` and
`npm run lint:scope` all run clean on this group's five new pages and all
nine edited files (`04b-bladder-reconstruction/index.mdx`,
`04c-urinary-diversion/index.mdx`, `bladder-outlet-obstruction.mdx`,
`simple-prostatectomy.mdx`, `sigmoid-cystoplasty.mdx`,
`ureteral-reimplantation.mdx`, `gu-embryology.mdx`, `urethral-prolapse.mdx`).
`git diff --check` is clean on all of this group's files. The only remaining
`lint:citations`/`lint:links` failures at the end of this session are in
`congenital-penile-curvature.mdx`, which another agent is actively editing
and which this group did not touch.

---

Group N3 (functional, neuro, pain, male genital). Five pages, four of them
condition/procedure pages that sit beside an existing comprehensive page
rather than duplicating it.

## docs/04-surgical-techniques/04f-incontinence-procedures/procedures/pudendal-neuromodulation.mdx

No overlap (`rg -il "pudendal neuromodulation"` found only the brief mention
on `neuromodulation.mdx`, which already covers the Peters 2005 sacral-vs-pudendal
crossover trial in detail).

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| FGPFR-015-001 | adopt (corrected) | Built the page: lead-localization technique (Peters/Hoang Roberts), FDA status, complications. Rejected the finding's own attribution of "76.9% trial success, 46.1% trial cure, 5/9 >50% improvement" to the Peters 2015 *Low Urin Tract Symptoms* 19-patient paper — that paper's real numbers (3 complete relief, 3 almost complete, 10 significant, 3 slight; 5/19 later explanted) do not match. The matching numbers are in Hoang Roberts 2021 (StimWave feasibility study, n=13), which the finding separately listed as ch.15 ref #78; I cited that paper for those numbers instead. Also dropped the finding's "15.3% lead migration" figure — could not confirm it in any available abstract; used Hoang Roberts' own reported complications (2 migration, 1 broken wire, 2 nonfunctioning antenna of 9 implants) instead, stated as counts, not a rate. Kept both the StimWave pilot and the separate Peters 2015 series, each with its own numbers, per the no-merging-different-studies rule. | Hoang Roberts 2021 PMID 34196055; Peters 2015 PMID 26663728; Heinze 2015 PMID 24777254; Peters 2005 PMID (existing site ref, not duplicated); FGPFR ch.15 cited as the textbook chapter for the technique/FDA-status claims with no primary paper |

Wired into the [Neuromodulation](/docs/surgical-techniques/04f-incontinence-procedures/procedures/neuromodulation) hub table and the existing pudendal-stimulation bullet (cross-link added both ways). 1 cross-link from [Chronic Pelvic Pain](/docs/clinical-conditions/03h-pelvic-pain/chronic-pelvic-pain) via the new decompression page's See Also.

## docs/03-clinical-conditions/03h-pelvic-pain/laparoscopic-pudendal-nerve-decompression.mdx

No overlap (`chronic-pelvic-pain.mdx` names decompression as an option with a
one-line citation but has no operative detail). Placement: kept at the
proposed path in `03h-pelvic-pain/` rather than moving to
`04-surgical-techniques/`. Checked neighbors — every page in `03h-pelvic-pain/`
and every other `03-clinical-conditions/` subfolder is a condition page; no
subfolder of `04-surgical-techniques/` fits a pelvic-pain procedure, and
`chronic-pelvic-pain.mdx` itself documents surgical options inline rather than
spinning off per-technique pages in this area. Creating a new top-level `04-`
category for one page was judged outside the scope of this task.

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| FGPFR-019-002 | adopt (corrected) | Built the page from the two primary papers rather than the chapter. Verified Bollens 2021 directly: the published series is 235 patients (not "more than 400"), reports 18.7% postoperative complications with no severe Clavien-Dindo events, one intraoperative pudendal-artery laceration controlled laparoscopically, and real VAS/IIEF-5/USP/PAC-SYM numbers. Could not confirm the chapter's claims of ">400 patients," "~80% global success," an erectile-sequelae pudendal-artery injury, or a separate obturator-nerve injury anywhere in the published paper, so dropped all four and used only the verified published outcomes instead. | Bollens 2021 doi 10.1007/s00464-020-08092-4 (PMID 33048235); Erdogru 2014 doi 10.1007/s00464-013-3248-1 (PMID 24149853); reused the existing Ahmed 2026 pudendal-neuralgia review already cited on `chronic-pelvic-pain.mdx` |

Cross-linked from [Chronic Pelvic Pain](/docs/clinical-conditions/03h-pelvic-pain/chronic-pelvic-pain) (the "Pudendal nerve decompression" surgical-therapies bullet) and from the new pudendal-neuromodulation page's See Also.

## docs/03-clinical-conditions/03i-defecatory-disorders/neurogenic-bowel.mdx

No overlap (`rg -il "neurogenic bowel"` found only passing mentions on
`fecal-incontinence.mdx`, `nlutd-spina-bifida.mdx`, and the excluded
`nlutd-spinal-cord-injury.mdx`; no page classifies by reflex phenotype or
gives an integrated bowel-program ladder).

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| NEUROURO-018-001 | adopt (rebuilt on primary sources) | Used the chapter only for the reflexic/areflexic framing and the "injury level is a guide, not a substitute for exam" point (cited to the MASCIP guideline, which the chapter itself cites). Replaced every numeric claim with independently verified primary papers: Christensen 2006 RCT (n=87, real Cleveland Clinic/St Mark's/NBD scores, not summarized generically as the finding did), Krassioukov 2010 systematic review, Chan 2016 ACE meta-analysis (426 patients, 74.3% pooled success), Randell 2001 and Branagan 2003 colostomy quality-of-life studies (real subject counts, not the finding's vague framing), and Kelly 2020 (National Spina Bifida Registry, 3,670 patients, 45% continent) for the spina-bifida-specific ACE/MACE point the finding only gestured at. Added Preziosi 2018 for MS (the finding named MS and spina bifida in scope but supplied only SCI-specific sources). Reused the existing Vollebregt 2025 TAI systematic review already cited on `fecal-incontinence.mdx` (same citation, not duplicated). | Christensen 2006 PMID 16952543; Krassioukov 2010 PMID 20212501; Chan 2016 PMID 26830062; Randell 2001 PMID 11438845; Branagan 2003 PMID 14639447; Kelly 2020 doi 10.3233/PRM-190667; Preziosi 2018 doi 10.2147/DNND.S138835; Emmanuel 2013 consensus review (flagged in-page as industry-sponsored, not an independent guideline); MASCIP 2012 guideline |

Added to the [Defecatory Disorders](/docs/clinical-conditions/03i-defecatory-disorders) hub's article list and cross-linked from [Fecal Incontinence](/docs/clinical-conditions/03i-defecatory-disorders/fecal-incontinence) and [Spina Bifida](/docs/clinical-conditions/03d-nlutd/nlutd-spina-bifida) (the "link from NLUTD and defecatory hubs" instruction).

## docs/03-clinical-conditions/03g-genital-scrotal/congenital-penile-curvature.mdx

No overlap for a dedicated condition page (`tunica-plication.mdx` has extensive
congenital-curvature operative/outcome content but no clinical-overview page
exists; `peyronies-disease.mdx` does not mention congenital curvature at all).

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| TRUS08-081-001 | adopt (partially) | Used the chapter for the Devine-Horton five-type classification (framed explicitly as historical, not a current standard, per the finding's own caution) and verified the 3-in-500 (0.6%) incidence directly against Yachia 1993's abstract (a single-institution, 500-neonate sample — matches exactly). Dropped the finding's "&gt;85% surgical success" figure entirely: it has no linked denominator or study in the finding, and I could not confirm it in Devine & Horton 1973, Kramer 1982, or Yachia 1993/1994. Replaced it with a verified, much stronger source found independently: Britton 2022, a systematic review of 55 studies / 2,956 adult CPC patients (straightening 75-100% plication, 73-100% corporoplasty), which also let the page explicitly avoid pooling a single number across heterogeneous reporting, as that review itself warns against. Also added a "Recurrence After Childhood Repair" section from a strong, independently found paper (Abosena 2020, 59 adolescents/young adults) not in the seed findings at all, because it directly supports both this page and the new redo-hypospadias page. | Devine & Horton 1973 doi 10.1016/s0022-5347(17)60183-6; Kramer 1982 doi 10.1016/s0022-5347(17)53045-1; Yachia 1993 doi 10.1016/s0022-5347(17)35816-0; Britton 2022 doi 10.1016/j.jsxm.2021.11.017; Abosena 2020 doi 10.1016/j.jpurol.2019.11.013; TRUS08 ch.81 (Bepple, McCammon) cited for the proposed embryologic mechanism with no primary paper; reused the existing EAU Sexual and Reproductive Health citation already used on `tunica-plication.mdx` for the management recommendation |

Cross-linked both ways with [Peyronie's Disease](/docs/clinical-conditions/03g-genital-scrotal/peyronies-disease) and [Tunica Plication](/docs/surgical-techniques/04j-sexual-dysfunction/peyronies-disease/tunica-plication) (added one line to each page's See Also), and to/from the new redo-hypospadias page and (link only, per instruction) `hypospadias-epispadias.mdx`.

## docs/04-surgical-techniques/04a-urethral-reconstruction/redo-hypospadias-adults.mdx

**Overlap check result: significant overlap with an existing page, scope
narrowed accordingly.** `hypospadias-epispadias.mdx` (excluded from editing —
another agent is working on it) already has an extensive "Reoperative / failed
hypospadias" subsection with the master decision framework, Morrison/Verla/
Aldamanhori/Snodgrass-2014 series, graft-material comparison, risk-escalation-
per-reoperation data, and the full summary algorithm. Building a second page
that reproduced this would duplicate rather than add. Instead this page is the
**operative/technical companion**: it opens by pointing to the lifelong-care
page for the full clinical picture and does not restate its statistics, and
covers only material genuinely absent from the site — none of the eight
seed findings below are addressed anywhere else.

Nearly all seed findings for this page were pediatric primary-repair chapter
technique (POST score, Deshpande's TIP sequence, G-TIP, MAGPI, onlay-flap
tapering, STAC, staged preputial graft, watch technique) — per the user's
brief, these appear only as brief background to explain what was done, not as
full operative sequences. Most were accordingly rejected or merged into one
compressed background paragraph; two had genuinely new, verifiable, adult/
redo-specific content and were adopted more fully.

| Finding | Verdict | Note | Source added |
|---|---|---|---|
| SURGURO-020-001 | reject | POST score / curvature-threshold decision algorithm is pediatric primary-repair chapter teaching; kept only as unexpanded background naming the technique family (MAGPI/TIP/onlay/staged graft), not the POST/UPR scoring detail, per the brief's "background only" instruction. | — |
| SURGURO-021-001 (Deshpande TIP sequence) | reject | Pediatric primary-TIP operative detail (suture gauge, stent size, glans-wing technique); out of scope for an adult-redo technical page per the brief; TIP is already named generically in the background paragraph and detailed on the existing lifelong-care page. | — |
| SURGURO-022-001 (G-TIP) | adopt (numbers only, corrected) | Used only the Alshafei 2020 meta-analysis numbers (9.4% vs 4.9% urethrocutaneous fistula, TIP vs G-TIP) as background explaining a predisposing complication, in the "Why These Patients Return" section. Corrected the finding's framing: it called the result "a trend" toward G-TIP superiority, but the actual published abstract states the pooled difference did not reach statistical significance for any endpoint (fistula, stenosis, dehiscence, or total complications) — worded accordingly rather than implying a trend. Rejected the chapter's G-TIP operative-sequence detail itself as out of scope for this page. | Alshafei 2020 PMID 32061491 |
| SURGURO-023-001 (staged preputial graft) | adopt (reworded) | Used only Pippi Salle 2016's reoperation-rate numbers (52.6% TIP, 52.1% G-TIP, 28% staged repair in the same 140-patient 10-year series) as the lead evidence for "Why These Patients Return," directly verified against the paper's own abstract rather than the chapter's secondhand summary. Rejected the chapter's own staged-graft operative sequence and its separate, conflicting vacuum-physiotherapy schedule (the finding itself flagged this schedule as inconsistent with SURGURO ch.20's schedule and asked that they not be combined without reconciliation — resolved by dropping vacuum therapy from this page entirely). | Pippi Salle 2016 PMID 26279102 |
| SURGURO-024-001 (watch technique) | reject | Single illustrated case report with no denominator beyond that case; too weak to help a subspecialist and out of scope for an adult-redo page. | — |
| SURGURO-025-001 (adult single-stage pedicled preputial tube + BMG patch) | adopt | This is the one seed finding squarely about adults, so it got full technique treatment as a distinct "single-stage option for severe, minimally treated adult disease," explicitly distinguished from the heavily reoperated "hypospadias cripple" population and from staged repair as the dominant paradigm. Attributed to the chapter authors throughout; stated plainly that no cohort, complication rate, or follow-up exists for this specific operation. | Joshi PM, Abbas TO. Single-stage approach for proximal hypospadias. In: *Surgical Atlas of Urethroplasty.* Springer; 2024:223-229 (textbook chapter, no primary paper for this proposed operation) |
| TRUS08-049-001 (onlay-flap tapering) | reject | Pediatric primary-repair operative detail (flap-tapering dimension); out of scope for the adult-redo page. | — |
| TRUS08-049-002 (MAGPI selection/bailout) | reject | Pediatric primary-repair selection teaching; MAGPI is named only in the background paragraph. | — |
| TRUS08-050-001 (prostatic utricle / catheter passage) | adopt | Directly useful, genuinely absent intraoperative pearl for redo/proximal cases: attempt catheter passage before starting, cystoscopic guidewire bailout if it fails. Added to a new "Preoperative Evaluation" section, cross-linked to the existing utricle-diagnosis content on `hypospadias-epispadias.mdx` rather than repeating it. | TRUS08 ch.50 (Ross), cited as the textbook chapter — the finding itself notes no reference is attached to this teaching |
| HINMAN5-127-002 (Thiersch-Duplay/TIP tension test) | reject | Pediatric primary-repair operative branch point; out of scope for the adult-redo page. | — |
| HINMAN5-128-001 (STAC three-stage + graft-contracture data) | adopt (partially) | Used only the authors' own paired-measurement series (graft contracture ≥50% requiring revision in roughly 1/7 staged-preputial-graft cases vs 1/70 of their three-stage STAC technique) as a second concrete "why redo happens" data point, explicitly labeled as single-center, uncited, author-reported experience, not a validated comparison. Rejected the full three-stage STAC operative sequence itself as pediatric primary-repair detail out of scope here. | Snodgrass W, Bush NC. STAC repair for hypospadias with 30° or more curvature. In: *Hinman's Atlas of Urologic Surgery.* 5th ed. Elsevier; 2025:1005-1011 (textbook chapter; the finding states no citation is linked to this specific data) |
| AMGUS-004-003 (Bush/Snodgrass corporotomy + tunica-vaginalis flap for persistent curvature) | reject | Superseded: an independent search surfaced Abosena 2020 (59 adolescents/young adults, real outcome denominators, techniques including urethral mobilization with corporal/dermal grafting) describing essentially the same curvature-correction scenario far more rigorously than this uncited chapter-author sequence. Used Abosena instead, in the "Persistent or Recurrent Curvature" section, cross-linked to the new congenital-penile-curvature page where the same series is also cited. | Abosena 2020 doi 10.1016/j.jpurol.2019.11.013 (used instead, not a source for this rejected finding) |

Wired into the [Male Urethroplasty](/docs/surgical-techniques/04a-urethral-reconstruction/male-urethroplasty) technique database (new "Staged" row) and cross-linked from the new congenital-penile-curvature page. Per the task instruction, added the link to `hypospadias-epispadias.mdx` only from this new page's side; did not edit that page.

### Not verifiable / dropped

- FGPFR-015-001's "15.3% lead migration" figure and its specific attribution of the 76.9%/46.1%/5-of-9 numbers to the Peters 2015 *Low Urin Tract Symptoms* paper — numbers belong to Hoang Roberts 2021 instead; see above.
- FGPFR-019-002's ">400 patients," "~80% global success," erectile-sequelae pudendal-artery injury, and separate obturator-nerve injury — not found in the published Bollens 2021 paper; used the paper's actual reported outcomes instead.
- TRUS08-081-001's "&gt;85% surgical success" for congenital curvature — no linked denominator or study in the finding; not found in any of the three cited classic papers; replaced with the verified Britton 2022 systematic review.

### Checks

`npm run lint:citations`, `npm run lint:links`, `npm run lint:orphans`, and
`npm run lint:scope` all pass after these five pages and eight wiring edits
(no build or git commands run, per instructions).
