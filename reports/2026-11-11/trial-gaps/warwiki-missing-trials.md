# Clinical Evidence library: trials still missing

November 11, 2026. Companion data: `warwiki-missing-trials.json` (same folder).

The library holds 65 trials, ported from the old Journal Club list. This list adds **64 must-know (tier 1)** and **119 should-know (tier 2)** trials, **9 later reports** of trials already in the library, and **10 new decision points with 43 new lanes** in all. SYNERGY, SYNERGY II and BESIDE are left out because they are being added separately.

**How it was built.** Candidates came from the reference lists of the guidelines on disk (AUA/SUFU OAB 2024, SUI 2023, BPH 2026, IC/BPS 2022, NLUTD 2021, recurrent UTI 2025, stricture 2023, GSM 2025, ED 2018, testosterone, IPT 2024, Peyronie's, male CPP 2025; EAU 2026 male LUTS, female LUTS, neuro-urology, strictures, infections, sexual health, chronic pelvic pain, MIBC; NICE NG123; NAMS 2020), from the script leads (`warwiki-named.tsv`, `warwiki-rcts.tsv`), and from FDA registration programs for drugs and devices used in this field. Every primary and follow-up report was resolved in PubMed on November 11, 2026; authors, title, journal, year, volume, pages, DOI and NCT come from the PubMed record. "Guidelines citing" in the JSON is a reference-list match (first author with volume and page, or year); PDFs with scrambled columns (AUA ED 2018, AUA Peyronie's, AUA testosterone, AUA IC/BPS) under-match, so a blank there does not mean the guideline ignores the trial.

**Tiers.** Tier 1: a registration (pivotal) trial for an FDA-approved drug or device used in this field, a trial a current guideline relies on for a recommendation, or a trial widely taught as practice-changing. Tier 2: confirmatory, negative, head-to-head or long-term trials a reader of the timeline would expect to see. Meta-analyses, cohorts and small single-center trials without guideline weight are left out.

| Section | Tier 1 | Tier 2 | Cited on 1+ WARWIKI page |
|---|---|---|---|
| Female stress and mixed incontinence | 5 | 13 | 11 of 18 |
| Overactive bladder: drugs and behavioral therapy | 15 | 9 | 3 of 24 |
| Overactive bladder: botulinum toxin, neuromodulation and urodynamics; neurogenic detrusor overactivity | 6 | 6 | 9 of 12 |
| Nocturia | 1 | 2 | 0 of 3 |
| Pelvic organ prolapse | 2 | 19 | 16 of 21 |
| IC/BPS, radiation cystitis and chronic pelvic pain | 3 | 12 | 9 of 15 |
| Recurrent UTI and intermittent catheter users | 3 | 14 | 8 of 17 |
| Genitourinary syndrome of menopause | 4 | 3 | 4 of 7 |
| Male incontinence | 1 | 1 | 1 of 2 |
| BPH and male LUTS | 12 | 10 | 9 of 22 |
| Urethral stricture | 0 | 4 | 4 of 4 |
| Erectile dysfunction and Peyronie's disease | 6 | 7 | 5 of 13 |
| Testosterone | 2 | 3 | 3 of 5 |
| Fecal incontinence and bowel | 3 | 6 | 7 of 9 |
| Urinary diversion | 1 | 5 | 5 of 6 |
| Perioperative care | 0 | 5 | 2 of 5 |
| **Total** | **64** | **119** | 96 of 183 |

33 of the 64 tier-1 trials are not cited on any WARWIKI page by their primary report: the four mirabegron registration trials, PILLAR and PLUS, every antimuscarinic registration trial, the desmopressin, pentosan polysulfate, ospemifene, Imvexxy, dutasteride, tamsulosin, tadalafil (BPH and ED), vardenafil and intracavernosal alprostadil registration trials, VUSIS-II, MAPS, the VA Cooperative BPH trial, ALFAUR, both HoLEP trials, nightly sildenafil after prostatectomy and TTrials. (InterStim, ospemifene and WATER II are cited only through a later report.)

**Check before authoring.** Trial acronyms not stated in the PubMed record are marked in the JSON `notes` (SCORPIO, CAPRICORN, TAURUS mapping; NOCTUPUS and REINVENT are listed under descriptive names). Cai 2012 (asymptomatic bacteriuria) is `verified: false`: PubMed indexes it as a clinical trial and the abstract does not say patients were randomized. Single-arm registration studies (eCoin, TITAN 2, WATER II, SNM for fecal incontinence, Eclipse) are flagged in `notes`. Five primaries have no DOI in PubMed (transdermal oxybutynin 2002, InterStim 1999, Stapleton 1990, vardenafil 2002, Montorsi 1997) and carry the PMID only.

## Female stress and mixed incontinence

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| PRIDE (`pride`) | 2009 | Behavioral weight-loss program vs structured education | Weight loss for incontinence in overweight women (NEJM 2009); cited in AUA OAB 2024 and EAU female LUTS 2026 for weight-loss advice. | 1 |
| Macroplastique pivotal trial (`macroplastique-pivotal`) | 2009 | Polydimethylsiloxane vs collagen | Polydimethylsiloxane registration trial (Macroplastique, FDA 2006); 2 WARWIKI pages cite it. | 1 |
| VUSIS-II (`vusis-ii`) | 2013 | Urodynamics before SUI surgery vs no urodynamics (noninferiority) | Dutch urodynamics-before-SUI-surgery RCT, the companion to VALUE; cited in EAU female LUTS 2026. | 1 |
| Bulkamid pivotal trial (`bulkamid-pivotal`) | 2014 | Polyacrylamide hydrogel vs collagen (Contigen) | Polyacrylamide hydrogel registration trial (Bulkamid, FDA PMA 2020); 3 WARWIKI pages cite it. | 1 |
| MUSA (`musa`) | 2025 | Midurethral sling vs onabotulinumtoxinA, mixed incontinence | PFDN trial of midurethral sling versus onabotulinumtoxinA for mixed incontinence (JAMA 2025); 3 WARWIKI pages cite it. | 1 |
| Bø 1999 PFMT versus electrical stimulation versus cones (`bo-1999`) | 1999 | PFMT vs electrical stimulation vs cones vs no treatment | Classic PFMT versus electrical stimulation versus cones trial; cited in EAU female LUTS 2026. | 2 |
| Durasphere pivotal trial (`durasphere-pivotal`) | 2001 | Carbon-coated beads vs collagen | Carbon-coated bead registration trial (Durasphere, FDA 1999). | 2 |
| Goode 2003 behavioral training with or without electrical stimulation (`goode-2003`) | 2003 | Behavioral training with or without electrical stimulation vs self-help booklet | Behavioral training with or without electrical stimulation for SUI (JAMA 2003). | 2 |
| Duloxetine North American SUI phase 3 (`duloxetine-sui`) | 2003 | Duloxetine 40 mg twice daily vs placebo | North American phase 3 duloxetine SUI trial (approved in Europe, not the US); basis for drug-therapy statements. | 2 |
| Coaptite pivotal trial (`coaptite-pivotal`) | 2007 | Calcium hydroxylapatite vs collagen | Calcium hydroxylapatite registration trial (Coaptite, FDA 2005). | 2 |
| Finnish TVT versus TVT-O trial (`finnish-tvt-tvto`) | 2007 | Retropubic TVT vs TVT-O | Nordic retropubic versus transobturator trial with 5-year follow-up; AUA SUI 2023 cites the 5-year report. | 2 |
| TVT versus TOT in intrinsic sphincter deficiency (`schierlitz-isd`) | 2008 | TVT vs TOT in intrinsic sphincter deficiency | TVT versus TOT in women with intrinsic sphincter deficiency. | 2 |
| TVT versus Pelvicol versus autologous fascial sling (`guerrero-sling-materials`) | 2010 | TVT vs porcine dermis vs autologous fascial sling | TVT versus porcine dermis versus autologous fascia; cited in AUA SUI 2023 and EAU female LUTS 2026. | 2 |
| CUPIDO 1 (`cupido-1`) | 2015 | Prolapse repair with vs without MUS, women with SUI | Prolapse repair with or without MUS in women with SUI; cited in EAU female LUTS 2026. | 2 |
| CUPIDO 2 (`cupido-2`) | 2016 | Prolapse repair with vs without MUS, occult SUI | Prolapse repair with or without MUS in women with occult SUI; cited in AUA SUI 2023 and EAU female LUTS 2026. | 2 |
| Burch versus midurethral sling at sacrocolpopexy (`trabuco-burch-sling`) | 2016 | Burch vs retropubic MUS at sacrocolpopexy | Burch versus retropubic sling at sacrocolpopexy, the abdominal counterpart to CARE. | 2 |
| OPAL (`opal`) | 2020 | PFMT with vs without EMG biofeedback | UK trial showing EMG biofeedback adds nothing to supervised PFMT (BMJ 2020); EAU cites the HTA report. | 2 |
| Dumoulin group versus individual PFMT in older women (`group-pfmt`) | 2020 | Group-based vs individual PFMT in older women | Group-based PFMT noninferior to individual PFMT in older women; cited in EAU female LUTS 2026. | 2 |

## Overactive bladder: drugs and behavioral therapy

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| Tolterodine extended-release pivotal trial (`tolterodine-er`) | 2001 | Tolterodine ER vs tolterodine IR vs placebo | Tolterodine ER registration trial (FDA 2000); tolterodine ER is the comparator in OrBIT, TAURUS and STAR. | 1 |
| Transdermal oxybutynin pivotal trials (`oxybutynin-transdermal`) | 2002 | Transdermal oxybutynin vs placebo (and oral tolterodine) | Transdermal oxybutynin registration trials (Oxytrol, FDA 2003). | 1 |
| Solifenacin pivotal trials (`solifenacin-pivotal`) | 2004 | Solifenacin 5 or 10 mg vs placebo (and tolterodine) | Solifenacin registration trials (FDA 2004); no solifenacin trial is in the library. | 1 |
| Trospium pivotal trials (`trospium-pivotal`) | 2004 | Trospium 20 mg twice daily vs placebo | Trospium US phase 3 registration trials (FDA 2004). | 1 |
| Darifenacin pivotal trial (`darifenacin-pivotal`) | 2004 | Darifenacin vs placebo | Darifenacin registration trial (FDA 2004), the M3-selective antimuscarinic. | 1 |
| TIMES (`times`) | 2006 | Tolterodine ER, tamsulosin, both, or placebo in men | Tolterodine plus tamsulosin in men with LUTS and OAB; EAU male LUTS 2026 cites it for antimuscarinic add-on in men. | 1 |
| Fesoterodine pivotal trials (`fesoterodine-pivotal`) | 2007 | Fesoterodine 4 or 8 mg vs placebo (and tolterodine ER) | Fesoterodine registration trials (FDA 2008); EAU female LUTS cites the fesoterodine program. | 1 |
| Oxybutynin chloride topical gel pivotal trial (`oxybutynin-gel`) | 2009 | Oxybutynin gel vs placebo gel | Oxybutynin gel registration trial (FDA 2009). | 1 |
| SCORPIO (`scorpio`) | 2013 | Mirabegron 50 or 100 mg vs placebo vs tolterodine ER, 12 weeks | Mirabegron registration trial (FDA 2012); AUA OAB 2024 and EAU cite it for β3-agonist efficacy. No WARWIKI page cites it. | 1 |
| ARIES (`aries`) | 2013 | Mirabegron 50 or 100 mg vs placebo, 12 weeks | Mirabegron North American registration trial (FDA 2012); cited in AUA OAB 2024. | 1 |
| CAPRICORN (`capricorn`) | 2013 | Mirabegron 25 or 50 mg vs placebo, 12 weeks | Third 12-week mirabegron registration trial (25 and 50 mg; FDA 2012); cited in AUA OAB 2024. | 1 |
| TAURUS (`taurus`) | 2013 | Mirabegron 50 or 100 mg vs tolterodine ER, 12 months | 12-month mirabegron safety registration trial against tolterodine (FDA 2012); cited in AUA OAB 2024 and EAU. | 1 |
| PILLAR (`pillar`) | 2020 | Mirabegron vs placebo in adults 65 or older | Mirabegron in adults 65 or older; AUA OAB 2024 cites it for β3 agonists in older patients. | 1 |
| PLUS (`plus`) | 2020 | Mirabegron vs placebo added to tamsulosin in men | Mirabegron add-on in men on tamsulosin; cited in AUA BPH 2026 and EAU male LUTS 2026 for add-on therapy. | 1 |
| Burgio 2020 combined behavioral and drug therapy in men (`burgio-2020-men`) | 2020 | Behavioral therapy plus drug vs drug alone in men | Behavioral plus drug therapy for OAB in men; cited in AUA OAB 2024, AUA BPH 2026 and EAU male LUTS 2026. | 1 |
| OPERA (`opera`) | 2003 | Oxybutynin ER vs tolterodine IR | Head-to-head oxybutynin ER versus tolterodine ER in women; widely taught class comparison. | 2 |
| STAR (`star-solifenacin`) | 2005 | Solifenacin vs tolterodine ER | Head-to-head solifenacin versus tolterodine ER (flexible dose). | 2 |
| Tolterodine safety in men with bladder outlet obstruction (`tolterodine-boo-safety`) | 2006 | Tolterodine vs placebo in men with BOO (retention safety) | Retention safety of tolterodine in men with urodynamic BOO; EAU male LUTS 2026 cites it. | 2 |
| BE-DRI (`be-dri`) | 2008 | Drug plus behavioral therapy vs drug alone, then drug discontinuation | UITN trial of behavioral therapy to allow drug discontinuation in women with urge incontinence (negative). | 2 |
| Fesoterodine versus tolterodine ER head-to-head (`fesoterodine-vs-tolterodine`) | 2010 | Fesoterodine 8 mg vs tolterodine ER vs placebo | Head-to-head fesoterodine versus tolterodine ER; cited in EAU female LUTS 2026. | 2 |
| MOTIVE (`motive`) | 2011 | Behavioral therapy vs oxybutynin in men | Behavioral therapy versus drug therapy for OAB in men (veterans); AUA BPH 2026 cites it. | 2 |
| SENIOR (`senior`) | 2013 | Solifenacin vs oxybutynin vs placebo, cognition in MCI | Cognitive safety of solifenacin versus oxybutynin in mild cognitive impairment; cited in EAU female LUTS 2026. | 2 |
| NEPTUNE (`neptune`) | 2013 | Solifenacin plus tamsulosin OCAS vs tamsulosin vs placebo | Fixed-dose solifenacin plus tamsulosin in men with storage and voiding LUTS; cited in EAU male LUTS 2026. | 2 |
| SOFIA (`sofia`) | 2014 | Fesoterodine vs placebo in vulnerable elderly | Fesoterodine in vulnerable elderly; EAU female LUTS 2026 cites it for antimuscarinics in older adults. | 2 |

## Overactive bladder: botulinum toxin, neuromodulation and urodynamics; neurogenic detrusor overactivity

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| InterStim pivotal trials (Sacral Nerve Stimulation Study Group) (`interstim-pivotal`) | 1999 | Sacral nerve stimulation implant vs delayed implant/standard care | Sacral Nerve Stimulation Study Group trials behind FDA approval of InterStim (urge incontinence 1997; urgency-frequency and retention 1999); EAU cites Schmidt 1999. | 1 |
| Cruz NDO OnabotulinumtoxinA phase 3 (`cruz-ndo`) | 2011 | OnabotulinumtoxinA 200 or 300 U vs placebo, NDO | Second NDO registration trial (DIGNITY 516; FDA 2011), the twin of ginsberg-ndo; cited in AUA/SUFU NLUTD 2021; 4 WARWIKI pages cite it. | 1 |
| Chapple OnabotulinumtoxinA OAB phase 3 (`chapple-oab-botox`) | 2013 | OnabotulinumtoxinA 100 U vs placebo, idiopathic OAB | Second 100 U onabotulinumtoxinA registration trial for idiopathic OAB (FDA 2013), the twin of nitti-oab; cited in AUA OAB 2024 and EAU. | 1 |
| eCoin pivotal study (`ecoin-pivotal`) | 2021 | Leadless tibial stimulator, single arm | Registration trial for the leadless eCoin tibial stimulator (FDA 2022); cited in AUA OAB 2024; 3 WARWIKI pages cite it. | 1 |
| FUTURE (`future`) | 2025 | Urodynamics plus clinical assessment vs clinical assessment alone before third-line OAB therapy | UK RCT of invasive urodynamics before third-line treatment of refractory OAB in women (Lancet 2025); EAU female LUTS cites the protocol; 3 WARWIKI pages cite it. | 1 |
| TITAN 2 (`titan-2`) | 2026 | Implantable tibial neuromodulation, single arm | Registration study for Medtronic's implantable tibial neuromodulation system (Altaviva, FDA September 2025); 3 WARWIKI pages cite it. | 1 |
| Schurch botulinum toxin A NDO trial (`schurch-ndo`) | 2005 | Botulinum toxin A 200 or 300 U vs placebo, NDO | First multicenter placebo-controlled botulinum toxin A trial in NDO; cited in EAU neuro-urology 2026. | 2 |
| OnabotulinumtoxinA idiopathic OAB dose-ranging trial (`botox-oab-dose-ranging`) | 2010 | OnabotulinumtoxinA 50 to 300 U vs placebo | Phase 2 dose-ranging trial that set 100 U for idiopathic OAB; cited in AUA OAB 2024. | 2 |
| Finazzi-Agrò PTNS versus sham (`ptns-sham-finazzi`) | 2010 | PTNS vs sham | Sham-controlled PTNS trial with urodynamic outcomes; cited in EAU female LUTS 2026. | 2 |
| OnabotulinumtoxinA or solifenacin versus placebo phase 3b (`botox-vs-solifenacin`) | 2017 | OnabotulinumtoxinA vs solifenacin vs placebo | Phase 3b onabotulinumtoxinA versus solifenacin versus placebo; cited in AUA OAB 2024. | 2 |
| Low-dose OnabotulinumtoxinA in noncatheterizing MS (`botox-ms-100u`) | 2018 | OnabotulinumtoxinA 100 U vs placebo, MS without catheterization | 100 U onabotulinumtoxinA in noncatheterizing MS patients; cited in AUA/SUFU NLUTD 2021 and EAU neuro-urology 2026. | 2 |
| Intibia sham-controlled trial (`intibia-sham`) | 2026 | Implantable tibial stimulation vs sham | First sham-controlled RCT of an implantable tibial nerve system; 4 WARWIKI pages cite it. | 2 |

## Nocturia

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| Low-dose desmopressin ODT pivotal trials (`nocdurna-pivotal`) | 2013 | Low-dose desmopressin ODT vs placebo (men; women) | Low-dose desmopressin registration trials in men and women (Nocdurna, FDA 2018); cited in EAU male LUTS 2026. No nocturia trial is in the library. | 1 |
| Desmopressin (Minirin) nocturia trials in men and women (`noctupus`) | 2002 | Desmopressin vs placebo (men; women) | Original desmopressin nocturia trials in men and women; EAU female LUTS 2026 cites the women's trial. | 2 |
| SER120 (Noctiva) pivotal trials (`noctiva-pivotal`) | 2018 | Desmopressin nasal spray vs placebo (pooled DB3/DB4) | Desmopressin nasal spray registration trials (Noctiva, FDA 2017); WARWIKI discusses the NOCTIVA label. | 2 |

## Pelvic organ prolapse

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| Maher 2004 abdominal sacrocolpopexy versus sacrospinous colpopexy (`maher-2004`) | 2004 | Abdominal sacrocolpopexy vs vaginal sacrospinous colpopexy (vault) | Classic RCT of abdominal sacrocolpopexy versus vaginal sacrospinous colpopexy for vault prolapse. | 1 |
| PEOPLE (`people`) | 2022 | Pessary vs surgery as first treatment | Pessary versus surgery as first treatment for prolapse (JAMA 2022); 3 WARWIKI pages cite it. | 1 |
| Benson 1996 vaginal versus abdominal reconstructive surgery (`benson-1996`) | 1996 | Vaginal vs abdominal reconstructive surgery | Early vaginal versus abdominal reconstructive surgery RCT. | 2 |
| Weber 2001 anterior colporrhaphy techniques (`weber-anterior`) | 2001 | Standard vs ultralateral colporrhaphy vs absorbable mesh | Three anterior colporrhaphy techniques (standard, ultralateral, absorbable mesh). | 2 |
| Paraiso 2006 rectocele repair techniques (`paraiso-rectocele`) | 2006 | Posterior colporrhaphy vs site-specific vs porcine graft | Three rectocele repairs including porcine graft augmentation; 2 WARWIKI pages cite it. | 2 |
| Iglesia vaginal mesh trial (`iglesia-mesh`) | 2010 | Vaginal mesh kit vs native-tissue colpopexy | US vaginal mesh RCT stopped early for mesh exposure. | 2 |
| Maher 2011 laparoscopic sacrocolpopexy versus total vaginal mesh (`maher-2011`) | 2011 | Laparoscopic sacrocolpopexy vs total vaginal mesh (vault) | Laparoscopic sacrocolpopexy versus total vaginal mesh for vault prolapse. | 2 |
| Paraiso laparoscopic versus robotic sacrocolpopexy (`paraiso-lap-robotic`) | 2011 | Laparoscopic vs robotic sacrocolpopexy | Laparoscopic versus robotic sacrocolpopexy (time, cost, pain). | 2 |
| Withagen trocar-guided mesh in recurrent prolapse (`withagen-recurrent`) | 2011 | Trocar-guided mesh vs conventional repair, recurrent prolapse | Trocar-guided mesh versus native tissue for recurrent prolapse. | 2 |
| Menefee colporrhaphy versus mesh or graft paravaginal repair (`menefee-paravaginal`) | 2011 | Colporrhaphy vs mesh or graft paravaginal repair | Colporrhaphy versus mesh- or graft-reinforced paravaginal repair. | 2 |
| Anger robotic versus laparoscopic sacrocolpopexy (`anger-robotic`) | 2014 | Robotic vs laparoscopic sacrocolpopexy | Robotic versus laparoscopic sacrocolpopexy cost trial. | 2 |
| Cheung pessary versus no treatment (`cheung-pessary`) | 2016 | Pessary plus PFMT vs PFMT alone | Pessary versus no treatment for symptomatic prolapse; cited in EAU female LUTS 2026. | 2 |
| SALTO (`salto`) | 2017 | Laparoscopic vs open sacrocolpopexy (vault) | Laparoscopic versus open sacrocolpopexy for vault prolapse, with long-term follow-up. | 2 |
| PREVPROL (`prevprol`) | 2017 | PFMT vs leaflet after childbirth (prolapse prevention) | PFMT for secondary prevention of prolapse after childbirth; cited in EAU female LUTS 2026. | 2 |
| ReCOUP (`recoup`) | 2017 | Liberal vs restricted activity after prolapse surgery | Liberal versus restricted activity after prolapse surgery. | 2 |
| PROSPERE (`prospere`) | 2018 | Transvaginal mesh vs laparoscopic sacropexy for cystocele | Transvaginal mesh versus laparoscopic sacropexy for cystocele (Eur Urol 2018). | 2 |
| LAVA (`lava`) | 2020 | Laparoscopic sacrohysteropexy vs vaginal sacrospinous hysteropexy | Laparoscopic sacrohysteropexy versus vaginal sacrospinous hysteropexy; 2 WARWIKI pages cite it. | 2 |
| SALTO-2 (`salto-2`) | 2023 | Laparoscopic sacrocolpopexy vs sacrospinous fixation (vault) | Laparoscopic sacrocolpopexy versus sacrospinous fixation for vault prolapse (BJOG 2023); 2 WARWIKI pages cite it. | 2 |
| O'Shea standard restrictions versus expedited activity (`expedited-activity`) | 2023 | Expedited activity vs standard restrictions after prolapse surgery | Standard restrictions versus expedited activity after prolapse surgery (JAMA Surg 2023). | 2 |
| Zhou intravaginal conjugated oestrogen with pessary (`pessary-estrogen-zhou`) | 2025 | Vaginal conjugated oestrogen vs placebo with pessary | Vaginal conjugated oestrogen and pessary continuation (BMJ 2025); 6 WARWIKI pages cite it. | 2 |
| EVA (`eva`) | 2026 | Vaginal oestrogen vs placebo before prolapse surgery | Dutch placebo-controlled trial of vaginal oestrogen before prolapse surgery, confirmatory to IMPROVE; 5 WARWIKI pages cite it. | 2 |

## IC/BPS, radiation cystitis and chronic pelvic pain

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| Pentosan polysulfate pivotal trials (`pps-pivotal`) | 1990 | Pentosan polysulfate vs placebo | Placebo-controlled trials behind FDA approval of pentosan polysulfate (Elmiron, 1996); AUA IC/BPS 2022 discusses both. No IC/BPS trial is in the library. | 1 |
| Myofascial physical therapy trial (ICCRN) (`myofascial-pt-ic`) | 2012 | Myofascial physical therapy vs global massage | Myofascial physical therapy versus global massage in IC/BPS; AUA IC/BPS 2022 cites it for manual physical therapy. | 1 |
| RICH-ART (`rich-art`) | 2019 | Hyperbaric oxygen vs standard care for radiation cystitis | Hyperbaric oxygen for radiation cystitis (Lancet Oncol 2019; long-term 2025); 4 WARWIKI pages cite it. | 1 |
| Perez-Marrero DMSO crossover trial (`dmso-ic`) | 1988 | Intravesical DMSO vs saline (crossover) | Placebo-controlled DMSO crossover trial; AUA IC/BPS 2022 cites it. | 2 |
| ICCTG pentosan polysulfate and hydroxyzine trial (`icctg-pps-hydroxyzine`) | 2003 | Pentosan, hydroxyzine, both, or placebo | ICCTG factorial trial of pentosan and hydroxyzine; cited in AUA IC/BPS 2022. | 2 |
| van Ophoven amitriptyline trial (`amitriptyline-van-ophoven`) | 2004 | Amitriptyline vs placebo | Placebo-controlled amitriptyline trial; cited in AUA IC/BPS 2022. | 2 |
| CPCRN ciprofloxacin or tamsulosin trial (`cpcrn-cipro-tamsulosin`) | 2004 | Ciprofloxacin, tamsulosin, both, or placebo | CPCRN ciprofloxacin or tamsulosin for CP/CPPS (negative); cited in AUA male CPP 2025 and EAU. | 2 |
| Cyclosporine A versus pentosan polysulfate (`cyclosporine-ic`) | 2005 | Cyclosporine A vs pentosan polysulfate | Cyclosporine A versus pentosan polysulfate; AUA IC/BPS 2022 cites it for refractory disease. | 2 |
| ICCTG intravesical BCG trial (`icctg-bcg`) | 2005 | Intravesical BCG vs placebo | Negative intravesical BCG trial; AUA IC/BPS 2022 cites it. | 2 |
| ICCRN amitriptyline trial (`icrn-amitriptyline`) | 2010 | Amitriptyline plus education vs placebo plus education | ICCRN amitriptyline trial in treatment-naive IC/BPS; cited in AUA IC/BPS 2022. | 2 |
| CPCRN pregabalin trial (`pregabalin-cpps`) | 2010 | Pregabalin vs placebo | CPCRN pregabalin trial; cited in AUA male CPP 2025 and EAU. | 2 |
| Pentosan polysulfate dose and placebo trial (`pps-dose-nickel`) | 2015 | Pentosan 100 mg daily vs three times daily vs placebo | Placebo-controlled pentosan dose trial with no benefit over placebo; cited in EAU chronic pelvic pain 2026. | 2 |
| Kuo intravesical botulinum toxin for IC/BPS (`botox-ic-kuo`) | 2016 | Botulinum toxin A plus hydrodistension vs saline plus hydrodistension | Multicenter placebo-controlled intravesical onabotulinumtoxinA trial in IC/BPS. | 2 |
| GaPP2 (`gapp2`) | 2020 | Gabapentin vs placebo, chronic pelvic pain in women | Gabapentin for chronic pelvic pain in women (negative); cited in EAU chronic pelvic pain 2026. | 2 |
| Sun acupuncture for CP/CPPS (`acupuncture-cpps`) | 2021 | Acupuncture vs sham acupuncture | Sham-controlled acupuncture for CP/CPPS (Ann Intern Med 2021); cited in AUA male CPP 2025 and EAU. | 2 |

## Recurrent UTI and intermittent catheter users

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| Raz and Stamm vaginal estriol trial (`raz-stamm-estriol`) | 1993 | Vaginal estriol cream vs placebo | Vaginal estriol prevents recurrent UTI after menopause (NEJM 1993); cited in AUA rUTI 2025, AUA/SUFU/AUGS GSM 2025 and NAMS. | 1 |
| AnTIC (`antic`) | 2018 | Low-dose antibiotic prophylaxis vs none in CISC users | Low-dose antibiotic prophylaxis in intermittent-catheter users; cited in AUA/SUFU NLUTD 2021 and EAU female LUTS 2026. | 1 |
| Hooton increased water intake trial (`hooton-water`) | 2018 | Additional 1.5 L water daily vs usual intake | Increased water intake reduces recurrent cystitis; AUA rUTI 2025 cites it for fluid advice. | 1 |
| Stamm placebo-controlled prophylaxis trial (`stamm-1980`) | 1980 | TMP-SMX, trimethoprim or nitrofurantoin prophylaxis vs placebo | Original placebo-controlled antimicrobial prophylaxis trial; cited in AUA rUTI 2025. | 2 |
| Stapleton postcoital prophylaxis trial (`stapleton-postcoital`) | 1990 | Postcoital TMP-SMX vs placebo | Postcoital prophylaxis trial; cited in AUA rUTI 2025. | 2 |
| Eriksen estradiol vaginal ring trial (`eriksen-estring`) | 1999 | Estradiol vaginal ring vs no treatment | Estradiol vaginal ring for recurrent UTI; cited in AUA rUTI 2025, AUA/SUFU/AUGS GSM 2025 and NAMS. | 2 |
| OM-89 (Uro-Vaxom) long-term trial (`om-89`) | 2005 | Oral E. coli lysate vs placebo | Oral E. coli lysate (OM-89) long-term trial; basis for EAU immunoprophylaxis statements. | 2 |
| NAPRUTI cranberry versus TMP-SMX (`napruti-cranberry`) | 2011 | Cranberry capsules vs TMP-SMX | Cranberry versus TMP-SMX prophylaxis; cited in AUA rUTI 2025. | 2 |
| Lactin-V intravaginal Lactobacillus crispatus trial (`lactin-v`) | 2011 | Intravaginal Lactobacillus crispatus vs placebo | Intravaginal Lactobacillus crispatus probiotic; cited in AUA rUTI 2025. | 2 |
| Cardenas hydrophilic catheter trial in acute SCI (`hydrophilic-catheter-sci`) | 2011 | Hydrophilic vs uncoated catheters in acute SCI | Hydrophilic versus uncoated catheters after acute SCI; cited in AUA/SUFU NLUTD 2021. | 2 |
| Cai asymptomatic bacteriuria treatment study (`cai-asb`) | 2012 | No treatment vs antibiotic treatment of asymptomatic bacteriuria | Not treating asymptomatic bacteriuria in women with recurrent UTI; cited in AUA rUTI 2025 and EAU infections 2026. | 2 |
| NAPRUTI lactobacilli versus TMP-SMX (`napruti-lactobacilli`) | 2012 | Oral lactobacilli vs TMP-SMX | Oral lactobacilli versus TMP-SMX after menopause; cited in AUA rUTI 2025. | 2 |
| Ferrante vaginal estrogen RCT (`ferrante-vaginal-estrogen`) | 2021 | Vaginal estrogen vs placebo | Contemporary vaginal estrogen RCT for recurrent UTI; cited in AUA rUTI 2025 and AUA/SUFU/AUGS GSM 2025. | 2 |
| Methenamine hippurate versus trimethoprim (`botros-methenamine`) | 2022 | Methenamine hippurate vs trimethoprim | Methenamine versus trimethoprim; cited in AUA rUTI 2025. | 2 |
| MV140 sublingual bacterial vaccine trial (`mv140`) | 2022 | Sublingual MV140 (3 or 6 months) vs placebo | Sublingual bacterial vaccine (NEJM Evid 2022); cited in AUA rUTI 2025. | 2 |
| ImpresU (`impresu`) | 2025 | Methenamine hippurate vs placebo, older women | Placebo-controlled methenamine trial in older women (2025); 3 WARWIKI pages cite it. | 2 |
| COMPARE (`compare-catheters`) | 2026 | Reusable vs single-use intermittent catheters | Single-use versus reusable intermittent catheters (JAMA Netw Open 2026); 2 WARWIKI pages cite it. | 2 |

## Genitourinary syndrome of menopause

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| Ospemifene pivotal trials (`ospemifene-pivotal`) | 2010 | Ospemifene 30 or 60 mg vs placebo | Ospemifene registration trials (Osphena, FDA 2013); cited in AUA/SUFU/AUGS GSM 2025 and NAMS. No GSM trial is in the library. | 1 |
| Prasterone (intravaginal DHEA) pivotal trial (`prasterone-pivotal`) | 2016 | Intravaginal prasterone vs placebo | Intravaginal prasterone registration trial (Intrarosa, FDA 2016). | 1 |
| REJOICE (`rejoice`) | 2017 | Estradiol vaginal insert 4, 10 or 25 µg vs placebo | Estradiol vaginal insert registration trial (Imvexxy, FDA 2018); cited in AUA/SUFU/AUGS GSM 2025. | 1 |
| Li fractional CO2 laser versus sham (`laser-sham-li`) | 2021 | Fractional CO2 laser vs sham | Fractional CO2 laser no better than sham for postmenopausal vaginal symptoms (JAMA 2021); cited in AUA/SUFU/AUGS GSM 2025. | 1 |
| Ultra-low-dose estradiol vaginal tablet trial (`vagifem-10`) | 2008 | Estradiol 10 µg vaginal tablet vs placebo | Registration trial for the 10 µg estradiol vaginal tablet; cited in NAMS 2020. | 2 |
| Mitchell vaginal estradiol or moisturizer versus placebo (`msflash-vaginal`) | 2018 | Vaginal estradiol vs moisturizer vs placebo gel | MsFLASH trial of vaginal estradiol or moisturizer versus placebo gel (no difference); cited in AUA/SUFU/AUGS GSM 2025 and NAMS. | 2 |
| Paraiso vaginal laser versus vaginal estrogen (`laser-vs-estrogen-paraiso`) | 2020 | Vaginal CO2 laser vs vaginal estrogen cream | Vaginal laser versus vaginal estrogen; cited in AUA/SUFU/AUGS GSM 2025 and NAMS. | 2 |

## Male incontinence

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| MAPS (`maps`) | 2011 | One-to-one PFMT vs standard care after prostatectomy or TURP | PFMT after radical prostatectomy or TURP (Lancet 2011); cited in EAU male LUTS 2026. The male-SUI timeline has no conservative-care trial. | 1 |
| Goode 2011 behavioral therapy for persistent postprostatectomy incontinence (`goode-2011`) | 2011 | Behavioral therapy with or without biofeedback and stimulation vs delayed treatment | Behavioral therapy with or without biofeedback and stimulation for persistent post-prostatectomy incontinence; cited in AUA IPT 2024 and EAU. | 2 |

## BPH and male LUTS

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| VA Cooperative BPH trial (`va-coop-bph`) | 1996 | Terazosin vs finasteride vs both vs placebo | Terazosin, finasteride or both (NEJM 1996); cited in EAU male LUTS 2026; the forerunner of MTOPS. | 1 |
| PLESS (`pless`) | 1998 | Finasteride vs placebo, 4 years | Finasteride reduced acute retention and BPH surgery (NEJM 1998); cited in AUA BPH 2026 and EAU male LUTS 2026. | 1 |
| Tamsulosin US pivotal trials (`tamsulosin-pivotal`) | 1998 | Tamsulosin 0.4 or 0.8 mg vs placebo | Tamsulosin US registration trials (FDA 1997). | 1 |
| Dutasteride ARIA pivotal trials (`aria-dutasteride`) | 2002 | Dutasteride vs placebo, 2 years | Dutasteride registration trials (FDA 2001); cited in AUA BPH 2026 and EAU. | 1 |
| Kuntz HoLEP versus open prostatectomy (over 100 g) (`holep-vs-open-kuntz`) | 2002 | HoLEP vs open prostatectomy, over 100 g | HoLEP versus open prostatectomy over 100 g with 5-year follow-up; cited in EAU male LUTS 2026. | 1 |
| ALFAUR (`alfaur`) | 2005 | Alfuzosin vs placebo before trial without catheter | Alfuzosin before trial without catheter in first acute retention; also lowered BPH surgery over 6 months. | 1 |
| Auckland HoLEP versus TURP trial (prostates over 40 g) (`holep-vs-turp-auckland`) | 2006 | HoLEP vs TURP, prostates over 40 g | HoLEP versus TURP in prostates over 40 g with 7-year follow-up; cited in AUA BPH 2026 and EAU. | 1 |
| Tadalafil once-daily BPH trials (`tadalafil-bph-pivotal`) | 2008 | Tadalafil 2.5 to 20 mg daily vs placebo (and tamsulosin) | Tadalafil 5 mg daily trials behind FDA approval for BPH and ED with BPH (2011). | 1 |
| BPH6 (`bph6`) | 2015 | Prostatic urethral lift vs TURP | Prostatic urethral lift versus TURP; EAU male LUTS 2026 cites it. | 1 |
| WATER II (`water-ii`) | 2019 | Aquablation, 80-150 mL prostates, single arm | Aquablation in 80-150 mL prostates, single arm with 5-year follow-up; cited in AUA BPH 2026 and EAU; 6 WARWIKI pages cite the 5-year report. | 1 |
| Pisco PAE versus sham (`pae-sham`) | 2020 | Prostatic artery embolization vs sham | PAE versus sham (Eur Urol 2020); cited in AUA BPH 2026 and EAU male LUTS 2026. | 1 |
| iTind US pivotal trial (`itind-pivotal`) | 2021 | iTind vs sham | US sham-controlled iTind trial (FDA De Novo 2020); cited in AUA BPH 2026 and EAU; 4 WARWIKI pages cite it. | 1 |
| VA TURP versus watchful waiting (`va-turp-watchful-waiting`) | 1995 | TURP vs watchful waiting | VA TURP versus watchful waiting (NEJM 1995); cited in EAU male LUTS 2026. | 2 |
| ALTESS (`altess`) | 2006 | Alfuzosin vs placebo, 2 years | Alfuzosin progression trial; cited in AUA BPH 2026 and EAU male LUTS 2026. | 2 |
| STEP (`step-saw-palmetto`) | 2006 | Saw palmetto vs placebo | Saw palmetto no better than placebo (NEJM 2006). | 2 |
| Naspro HoLEP versus open prostatectomy (over 70 g) (`holep-vs-open-naspro`) | 2006 | HoLEP vs open prostatectomy, over 70 g | HoLEP versus open prostatectomy over 70 g; cited in EAU male LUTS 2026. | 2 |
| Silodosin US pivotal trials (`silodosin-pivotal`) | 2009 | Silodosin 8 mg vs placebo | Silodosin US registration trials (FDA 2008). | 2 |
| CAMUS (`camus`) | 2011 | Escalating-dose saw palmetto vs placebo | High-dose saw palmetto no better than placebo (JAMA 2011). | 2 |
| Gao PAE versus TURP (`pae-vs-turp-gao`) | 2014 | PAE vs TURP | PAE versus TURP; cited in AUA BPH 2026. | 2 |
| PARTEM (`partem`) | 2023 | PAE vs medical therapy | PAE versus medical therapy (PARTEM); cited in AUA BPH 2026. | 2 |
| VAPEUR (`vapeur`) | 2026 | Rezum vs combination drug therapy | Rezum versus combination drug therapy (2026); 2 WARWIKI pages cite it. | 2 |
| WATER III (`water-iii`) | 2026 | Aquablation vs laser enucleation | Aquablation versus laser enucleation (Eur Urol Focus 2026); 4 WARWIKI pages cite it. | 2 |

## Urethral stricture

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| Dubey dorsal onlay buccal graft versus penile skin flap (`dubey-bmg-vs-flap`) | 2007 | Dorsal onlay buccal graft vs penile skin flap | Dorsal onlay buccal graft versus penile skin flap; cited in EAU strictures 2026; 7 WARWIKI pages cite it. | 2 |
| Mazdak mitomycin C after internal urethrotomy (`mazdak-mitomycin`) | 2007 | Mitomycin C vs saline injection at urethrotomy | Mitomycin C injection after urethrotomy; AUA stricture 2023 cites it. | 2 |
| Vasudeva dorsal versus ventral onlay buccal graft (`vasudeva-dorsal-ventral`) | 2015 | Dorsal vs ventral onlay buccal graft | Dorsal versus ventral onlay buccal graft; cited in EAU strictures 2026. | 2 |
| Soave buccal harvest-site closure versus nonclosure (`soave-harvest-closure`) | 2018 | Buccal harvest-site closure vs nonclosure | Buccal harvest-site closure versus nonclosure; cited in EAU strictures 2026; 5 WARWIKI pages cite it. | 2 |

## Erectile dysfunction and Peyronie's disease

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| Intracavernosal alprostadil pivotal trial (`alprostadil-ici-pivotal`) | 1996 | Intracavernosal alprostadil vs placebo, then open label | Intracavernosal alprostadil registration trial (Caverject, NEJM 1996); cited in AUA ED 2018. | 1 |
| MUSE pivotal trial (`muse-pivotal`) | 1997 | Transurethral alprostadil vs placebo | Transurethral alprostadil registration trial (MUSE, NEJM 1997); cited in AUA ED 2018 and EAU; 3 WARWIKI pages cite it. | 1 |
| Tadalafil ED pivotal trials (`tadalafil-ed-pivotal`) | 2002 | Tadalafil vs placebo (integrated pivotal trials) | Integrated analysis of the tadalafil ED registration trials (FDA 2003); cited in AUA ED 2018. | 1 |
| Vardenafil US pivotal trial (`vardenafil-pivotal`) | 2002 | Vardenafil vs placebo | Vardenafil US registration trial (FDA 2003); cited in AUA ED 2018. | 1 |
| Intralesional interferon α-2b trial (`interferon-peyronies`) | 2006 | Intralesional interferon α-2b vs placebo | Placebo-controlled intralesional interferon α-2b trial; AUA Peyronie's guideline (option) and EAU sexual health 2026 cite it. | 1 |
| Padma-Nathan nightly sildenafil after radical prostatectomy (`nightly-sildenafil-rp`) | 2008 | Nightly sildenafil vs placebo after nerve-sparing prostatectomy | Nightly sildenafil after nerve-sparing prostatectomy; stopped early, spontaneous erections in 14/51 versus 1/25; cited in AUA ED 2018. | 1 |
| Montorsi early intracavernous alprostadil after prostatectomy (`montorsi-1997`) | 1997 | Early alprostadil injections vs no treatment after prostatectomy | Early alprostadil injections after nerve-sparing prostatectomy, the first penile rehabilitation RCT. | 2 |
| POTABA trial (`potaba`) | 2005 | Potassium paraaminobenzoate vs placebo | Placebo-controlled potassium paraaminobenzoate trial; the AUA Peyronie's guideline judged efficacy unproven on this RCT. | 2 |
| Tadalafil once-daily ED trial (`tadalafil-daily-ed`) | 2006 | Tadalafil 5 or 10 mg daily vs placebo | Once-daily tadalafil for ED. | 2 |
| Montorsi 2008 nightly versus on-demand vardenafil after nerve-sparing prostatectomy (`reinvent`) | 2008 | Nightly vs on-demand vardenafil vs placebo after prostatectomy | Nightly versus on-demand vardenafil after nerve-sparing prostatectomy; cited in AUA ED 2018 and EAU sexual health 2026. | 2 |
| Palmieri shockwave therapy for Peyronie's disease (`eswt-peyronies`) | 2009 | Shockwave therapy vs sham | Sham-controlled shockwave trial (pain benefit only); cited in EAU sexual health 2026. | 2 |
| Avanafil pivotal trial (`avanafil-pivotal`) | 2012 | Avanafil vs placebo | Avanafil registration trial (FDA 2012); cited in AUA ED 2018 and EAU. | 2 |
| Collagenase versus surgery for Peyronie's disease (`cch-vs-surgery`) | 2023 | Collagenase injection vs surgery (plication or grafting) | Collagenase versus surgery for Peyronie's disease (J Urol 2023); cited in EAU sexual health 2026; 5 WARWIKI pages cite it. | 2 |

## Testosterone

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| TTrials (`ttrials`) | 2016 | Testosterone gel vs placebo, 1 year, older men | Testosterone Trials in older men (NEJM 2016) with the sexual-function trial; cited in the AUA testosterone guideline and EAU. | 1 |
| TRAVERSE (`traverse`) | 2023 | Testosterone gel vs placebo, MACE noninferiority | Testosterone cardiovascular safety noninferiority trial (NEJM 2023); cited in EAU sexual health 2026; 5 WARWIKI pages cite it. | 1 |
| TOM (`tom-trial`) | 2010 | Testosterone gel vs placebo, older men with mobility limitation | Stopped early for cardiovascular events (NEJM 2010); cited in the AUA testosterone guideline. | 2 |
| T4DM (`t4dm`) | 2021 | Testosterone undecanoate vs placebo with lifestyle program | Testosterone to prevent type 2 diabetes; cited in EAU sexual health 2026. | 2 |
| Testosterone in prostate cancer survivors with hypogonadism (`testosterone-pca-survivors`) | 2026 | Testosterone vs placebo after prostate cancer treatment | Testosterone in hypogonadal prostate cancer survivors (JAMA Intern Med 2026); 3 WARWIKI pages cite it. | 2 |

## Fecal incontinence and bowel

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| Sacral nerve stimulation for fecal incontinence pivotal study (`snm-fi-pivotal`) | 2010 | Sacral nerve stimulation, single arm | Sacral nerve stimulation registration study for fecal incontinence (FDA 2011). | 1 |
| NASHA Dx sham-controlled trial (`nasha-dx`) | 2011 | NASHA Dx injection vs sham | Dextranomer-hyaluronic acid sham-controlled trial behind Solesta approval (FDA 2011). | 1 |
| CONFIDeNT (`confident`) | 2015 | PTNS vs sham | PTNS versus sham for faecal incontinence (Lancet 2015, negative); 4 WARWIKI pages cite it. | 1 |
| St Mark's biofeedback trial (`st-marks-biofeedback`) | 2003 | Biofeedback vs exercises vs standard care | St Mark's trial: biofeedback added nothing to standard care for fecal incontinence. | 2 |
| Fernando overlap versus end-to-end OASI repair (`oasi-repair-fernando`) | 2006 | Overlap vs end-to-end external sphincter repair | Overlap versus end-to-end repair of obstetric anal sphincter injury. | 2 |
| Christensen transanal irrigation in spinal cord injury (`transanal-irrigation-sci`) | 2006 | Transanal irrigation vs conservative bowel care | Transanal irrigation versus conservative bowel care in spinal cord injury. | 2 |
| Eclipse vaginal bowel-control system pivotal (`eclipse-pivotal`) | 2015 | Vaginal bowel-control insert, single arm | Single-arm registration study of the Eclipse vaginal bowel-control insert. | 2 |
| NOTABLe (`notable`) | 2022 | PTNS vs sham | PFDN PTNS versus sham for fecal incontinence (negative), confirming CONFIDeNT; 3 WARWIKI pages cite it. | 2 |
| SUBSoNIC (`subsonic`) | 2025 | Subsensory vs suprasensory vs off SNM (crossover) | Subsensory versus suprasensory SNM crossover trial; 3 WARWIKI pages cite it. | 2 |

## Urinary diversion

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| Alvimopan after radical cystectomy (`alvimopan-cystectomy`) | 2014 | Alvimopan vs placebo after radical cystectomy | Alvimopan after radical cystectomy (Eur Urol 2014); the AUA/ASCO/SUO MIBC guideline cites it; 4 WARWIKI pages cite it. | 1 |
| Osman serous-lined tunnel versus T-limb (`osman-antireflux`) | 2009 | Serous-lined extramural tunnel vs T-limb | Serous-lined extramural tunnel versus T-limb in orthotopic neobladder; 2 WARWIKI pages cite it. | 2 |
| RAZOR (`razor`) | 2018 | Robotic vs open radical cystectomy | Robotic versus open cystectomy noninferiority (Lancet 2018). | 2 |
| Liedberg prophylactic mesh at ileal conduit (`conduit-mesh-liedberg`) | 2020 | Prophylactic mesh vs none at ileal conduit | Prophylactic mesh for parastomal hernia at ileal conduit. | 2 |
| iROC (`iroc`) | 2022 | Robotic cystectomy with intracorporeal diversion vs open | Robotic cystectomy with intracorporeal diversion versus open (JAMA 2022); cited in EAU MIBC 2026. | 2 |
| MOSAIC (`mosaic`) | 2025 | Retrosigmoid vs conventional ileal conduit | Retrosigmoid versus conventional ileal conduit for left ureteroenteric stricture; 2 WARWIKI pages cite it. | 2 |

## Perioperative care

| Trial | Year | Compared | Why it matters | Tier |
|---|---|---|---|---|
| ENOXACAN II (`enoxacan-ii`) | 2002 | Enoxaparin 4 weeks vs 1 week after cancer surgery | Extended (4-week) enoxaparin after abdominal or pelvic cancer surgery. | 2 |
| Hakvoort catheter duration after prolapse surgery (`hakvoort-catheter`) | 2004 | Catheter removed after 1 day vs on day 5 | Catheter removal timing after vaginal prolapse surgery. | 2 |
| Geller retrograde versus spontaneous voiding trial (`geller-voiding-trial`) | 2011 | Retrograde-fill vs spontaneous voiding trial | Retrograde-fill versus spontaneous voiding trial after pelvic surgery. | 2 |
| BRIDGE (`bridge`) | 2015 | Bridging dalteparin vs placebo during warfarin interruption | No bridging for warfarin interruption in atrial fibrillation (NEJM 2015); 2 WARWIKI pages cite it. | 2 |
| POISE-3 (`poise-3`) | 2022 | Tranexamic acid vs placebo, noncardiac surgery | Tranexamic acid in noncardiac surgery (NEJM 2022). | 2 |

## Reports to add to trials already in the library

| Existing trial | Report | DOI | Why |
|---|---|---|---|
| `ginsberg-ndo` | Kennelly M, Dmochowski R, Ethans K, et al. Long-term efficacy and safety of onabotulinumtoxinA in patients with urinary incontinence due to neurogenic detrusor overactivity: an interim analysis. *Urology.* 2013;81(3):491-7. | 10.1016/j.urology.2012.11.010 | Interim report of the long-term extension study that enrolled patients from the phase 3 NDO trials; efficacy and safety over repeated injections. Also relevant to proposed cruz-ndo. |
| `rosetta` | Guirguis Hanna M, Bradley M, Zyczynski H, et al. The impact of postinjection urinary tract infection on efficacy of intravesical onabotulinumtoxinA-A secondary analysis. *Neurourol Urodyn.* 2023;42(6):1238-1244. | 10.1002/nau.25191 | Secondary analysis: effect of post-injection UTI on onabotulinumtoxinA efficacy in ROSETTA. |
| `rosetta` | Getaneh FW, Kolm P, Awulachew H, et al. Comparing Impact of Overactive Bladder Therapies on Nocturia. *Urogynecology (Phila).* 2024;30(3):264-271. | 10.1097/SPV.0000000000001465 | Secondary analysis of ABC and ROSETTA: nocturia change by OAB therapy (add to abc as well). |
| `abc` | Getaneh FW, Kolm P, Awulachew H, et al. Comparing Impact of Overactive Bladder Therapies on Nocturia. *Urogynecology (Phila).* 2024;30(3):264-271. | 10.1097/SPV.0000000000001465 | Secondary analysis of ABC and ROSETTA: nocturia change by OAB therapy (add to rosetta as well). |
| `pinnacle` | Copelan O, Moss J, Freedman S, et al. Preservation of sexual function with Optilume-a novel treatment for lower urinary tract symptoms secondary to benign prostatic hyperplasia. *J Sex Med.* 2025;22(3):446-453. | 10.1093/jsxmed/qdae206 | Sexual-function outcomes from PINNACLE (J Sex Med 2025). |
| `insite` | Noblett K, Siegel S, Mangel J, et al. Results of a prospective, multicenter study evaluating quality of life, safety, and efficacy of sacral neuromodulation at twelve months in subjects with symptoms of overactive bladder. *Neurourol Urodyn.* 2016;35(2):246-51. | 10.1002/nau.22707 | 12-month InSite results (the existing family has the 6-month primary and 5-year report). |
| `sildenafil-pivotal` | Rendell MS, Rajfer J, Wicker PA, et al. Sildenafil for treatment of erectile dysfunction in men with diabetes: a randomized controlled trial. Sildenafil Diabetes Study Group. *JAMA.* 1999;281(5):421-6. | 10.1001/jama.281.5.421 | Sildenafil Diabetes Study Group RCT in men with diabetes; part of the pivotal program (JAMA 1999). |
| `unblocs` | Worthington J, Lane JA, Taylor H, et al. Thulium laser transurethral vaporesection versus transurethral resection of the prostate for benign prostatic obstruction: the UNBLOCS RCT. *Health Technol Assess.* 2020;24(41):1-96. | 10.3310/hta24410 | Full NIHR HTA monograph of UNBLOCS (the family has the Lancet primary and BJU cost paper). |
| `opus` | Wang R, Tulikangas P, Sappenfield EC. Cost Effectiveness of Concurrent Midurethral Sling at the Time of Prolapse Repair: Results From a Randomized Controlled Trial. *Urogynecology (Phila).* 2023;29(5):461-468. | 10.1097/SPV.0000000000001306 | Within-trial cost-effectiveness analysis of OPUS (Urogynecology 2023). |

## Proposed decision points and lanes

New decision points (`new: true` in the JSON) and new lanes on existing decision points. Trials whose `decision` or `lane` starts with `NEW:` use these ids. The `combination` lane of `oab-pharmacotherapy` (SYNERGY) is already in the uncommitted working copy of `decisions.json` and is used as existing.

| Decision point | Status | Area | Lanes | Trials |
|---|---|---|---|---|
| `nocturia`: Nocturia | new | oab | `desmopressin` Desmopressin | 3 |
| `ic-bps-treatment`: Interstitial cystitis/bladder pain syndrome | new | oab * | `oral-therapy` Oral therapy; `physical-therapy` Pelvic floor physical therapy; `intravesical-therapy` Intravesical and intradetrusor therapy | 10 |
| `radiation-cystitis`: Radiation cystitis | new | oab * | `hyperbaric-oxygen` Hyperbaric oxygen | 1 |
| `chronic-pelvic-pain`: Chronic pelvic pain in women and men | new | oab * | `female-cpp` Chronic pelvic pain in women; `male-cpps` Chronic prostatitis/chronic pelvic pain syndrome | 4 |
| `postoperative-voiding`: Bladder management after pelvic surgery | new | perioperative | `voiding-trial` Voiding trial and catheter duration | 2 |
| `gsm-treatment`: Genitourinary syndrome of menopause | new | sexual-medicine * | `nonestrogen-drugs` Ospemifene and prasterone; `vaginal-estrogen` Vaginal estrogen products; `energy-devices` Vaginal laser and energy devices | 7 |
| `male-sui-conservative`: Conservative care for incontinence after prostate treatment | new | male-sui | `pelvic-floor-training` Pelvic floor training after prostate surgery | 2 |
| `testosterone-therapy`: Testosterone therapy | new | sexual-medicine | `cardiovascular-safety` Cardiovascular and prostate safety; `efficacy` Symptom and sexual-function benefit | 5 |
| `urinary-diversion-surgery`: Cystectomy and urinary diversion: approach, recovery and stoma | new | diversion | `recovery` Recovery after cystectomy and diversion; `approach` Robotic versus open cystectomy and diversion; `conduit-and-stoma` Ileal conduit and stoma | 5 |
| `thrombosis-and-bleeding`: Perioperative thrombosis and bleeding | new | perioperative | `vte-prophylaxis` VTE prophylaxis; `anticoagulant-interruption` Anticoagulant interruption; `tranexamic-acid` Tranexamic acid | 3 |
| `oab-pharmacotherapy`: Behavioral and drug treatment for overactive bladder | existing, new lanes | oab | `older-adults` Older and frail adults | 3 |
| `oab-third-line`: Botulinum toxin and neuromodulation for refractory OAB | existing, new lanes | oab | `urodynamics` Urodynamics before third-line therapy | 1 |
| `sui-primary-surgery`: Primary surgery for female stress incontinence | existing, new lanes | female-sui | `mixed-incontinence` Mixed incontinence, sling versus bladder-directed treatment; `sling-material` Synthetic versus autologous or biologic slings | 2 |
| `pop-apical-suspension`: Apical suspension | existing, new lanes | prolapse | `sacrocolpopexy-approach` Open, laparoscopic and robotic sacrocolpopexy | 3 |
| `pop-grafts`: Mesh and grafts in vaginal prolapse repair | existing, new lanes | prolapse | `compartment-repair` Anterior and posterior repair technique | 3 |
| `recurrent-uti-prophylaxis`: Prevention of recurrent urinary tract infection | existing, new lanes | infection | `vaginal-estrogen` Vaginal estrogen; `nonantibiotic` Fluids, cranberry, probiotics and other nonantibiotic measures; `asymptomatic-bacteriuria` Asymptomatic bacteriuria; `immunoprophylaxis` Immunoprophylaxis; `catheter-users` Intermittent catheter users | 12 |
| `bph-medical`: Medical therapy for BPH | existing, new lanes | bph | `5-alpha-reductase` 5α-reductase inhibitors; `alpha-blockers` Alpha-blockers; `pde5` Tadalafil; `acute-retention` Acute urinary retention; `phytotherapy` Phytotherapy | 9 |
| `bph-procedures`: Procedures for BPH | existing, new lanes | bph | `large-glands` Enucleation and large prostates; `surgery-vs-watchful-waiting` Surgery versus watchful waiting | 6 |
| `stricture-treatment`: Treatment of anterior urethral stricture | existing, new lanes | stricture | `urethrotomy-adjuncts` Adjuncts to urethrotomy | 1 |
| `fecal-incontinence`: Treatment of fecal incontinence | existing, new lanes | bowel | `neuromodulation` Neuromodulation; `bulking-and-devices` Bulking agents and devices; `obstetric-sphincter` Obstetric anal sphincter injury repair; `neurogenic-bowel` Neurogenic bowel | 8 |

\* No SCHEMA area fits IC/BPS, radiation cystitis, chronic pelvic pain or GSM. They are filed under `oab` and `sexual-medicine` for now; a `pelvic-pain` group and a `gsm` group in `timeline-groups.json` would fit them better.

## Considered and left out

- **VeSpAR** (vessel-sparing versus transecting anastomotic urethroplasty): only the protocol (Trials 2020) and a 2026 meeting abstract are published; add when the full report appears.
- **PAUSE** (perioperative DOAC interruption): a prospective management cohort, not a randomized trial.
- **CLOTS 3** (cited on 7 WARWIKI pages): intermittent pneumatic compression after stroke; population outside this field.
- **SIMS later follow-up**: no report beyond the 2022 NEJM and HTA papers was found in PubMed.
- Small single-center trials from the leads without guideline weight (for example VVF interposition flap, Pee'BuSt, fibrin glue versus Martius flap, NPWT for skin grafts), cosmetic filler trials, primary oncology trials (NeuroSAFE PROOF, PACE-B, SHAPE), and Look AHEAD (secondary analysis of a diabetes trial).
- Lower-yield duplicates of listed trials: vibegron Japanese phase 3 and BEYOND (mirabegron versus solifenacin), Lenger D-mannose, Juthani-Mehta and Babar cranberry trials, verapamil trials for Peyronie's disease (Rehman 1998, Shirazi 2009; very small).

Counts: tier 1 = 64; tier 2 = 119; reports to add = 9; new decision points = 10; new lanes = 43.
