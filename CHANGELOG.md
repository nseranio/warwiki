# WARWIKI Changelog

Running log of substantive content and platform changes. Extracted from session notes in CLAUDE.md on 2026-04-21 so that CLAUDE.md can remain pure rules and conventions.

For commit-level detail run `git log --oneline`.

---

## 2026-05-10 — 04e penile-reconstruction atlas overhaul + site-wide best-for standardization

Major 04e build-out (~ 25 new dedicated atlas pages), completing the hub-and-spoke fistula expansion for the remaining 04h both-genders types, and standardizing the `bestFor` / "Best for / indication" column across 11 additional treatment databases. Build clean across **967 files** (`npm run lint:links`, `npm run typecheck`, `npm run build` all pass).

### 04h both-genders fistula hub-and-spoke expansion

- **[Vesicocutaneous Fistula Repair](docs/04-surgical-techniques/04h-fistula-repair/both-genders/vesicocutaneous.mdx)** — three-stage framework (conservative catheter / VAC / transurethral cystorrhaphy / percutaneous catheter management → fistulectomy + multilayer closure → tissue interposition with omental, VRAM, rectus femoris, gracilis, perivesical fat, latissimus + serratus free flap), pelvic-fracture EBR special considerations, radiation-induced (Zhang 75% vs 10.8% irradiated failure), neurogenic-bladder (Raup 81% diversion), Watanabe sunitinib withdrawal closure.
- **[Post-Kidney-Transplant Urinary Fistula Repair](docs/04-surgical-techniques/04h-fistula-repair/both-genders/post-kidney-transplant.mdx)** — three-stage framework (acute stabilization → PCN ± antegrade stent with the **Goldstein 87% vs 13% failure-rate datum** / 8 Fr ureteral catheter / Foley alone → definitive surgery), full technique catalog (re-UNC, native UU / PU with robotic data, Boari flap ± psoas hitch with Boonjindasup / Kroczak / Pike data, direct pyelovesicostomy, pyelo-pyelostomy salvage, pedicled omental wrap for recurrent fistulae, ileal conduit, transplant nephrectomy), outcomes-summary table, special considerations (nephrostomy-first, immunosuppression management, sepsis damage control, conduit ladder).
- **[Ureteroarterial Fistula Repair](docs/04-surgical-techniques/04h-fistula-repair/both-genders/ureteroarterial.mdx)** — three-stage framework (stabilization with stent-in-situ tamponade → endovascular covered stent-graft ± IIA exclusion ± coil embolization → open arterial ligation + extra-anatomic bypass for contamination / infection / failed endo / pre-existing graft), hybrid approach, post-repair urologic management (PCN, stent removal, ligation, nephrectomy), special considerations (ileal conduit 14.3% graft infection, prior aortoiliac, metallic stent risk, long-term surveillance), outcomes-comparison table.
- **Both-genders DB** — all eight rows collapsed to single-line indication strings (pyeloenteric, nephropleural, ureterocolonic, colovesical / enterovesical, vesicocutaneous, post-transplant, ureteroarterial, fecal diversion).

### 04e penile reconstruction — major atlas build-out

#### Integrated workflow

- **[Buried Penis Repair](docs/04-surgical-techniques/04e-genital-reconstruction/buried-penis-repair.mdx)** — fully written from stub. PAS-axis-driven decision framework, six repair components (penile liberation + degloving, escutcheonectomy, skin resurfacing options, scrotoplasty, panniculectomy, staged Kulkarni urethroplasty for concurrent stricture), escutcheon-harvested STSG and FTSG techniques (Strother / Kovell, Monn / Mellon), bolster fixation (standard, Rook eggcrate-foam, fibrin sealant), STSG-vs-FTSG comparative outcomes (Gül 2026), outpatient vs inpatient pathways, full outcomes table, complications, preoperative optimization (BMI 12.7×, MFI 6.4×), brief pediatric section.

#### New dedicated component atlas pages

- **[Panniculectomy](docs/04-surgical-techniques/04e-genital-reconstruction/panniculectomy.mdx)** — four urologic indications (AABP PAS-A2, kidney transplant facilitation, SUI improvement, urostomy revision), three incision patterns (traditional transverse, fleur-de-lis, Figler modified trapezoid), operative steps, ciNPT wound management, complications, BMI / frailty / pannus-weight risk factors, LRT-PAN two-team choreography (Ngaage), CPT 15830 coding.
- **[Escutcheonectomy](docs/04-surgical-techniques/04e-genital-reconstruction/escutcheonectomy.mdx)** — anatomy vs panniculectomy distinction, PAS axis P driver, transverse curvilinear / modified-trapezoid incision, **anchoring fixation to rectus fascia / pubic periosteum**, dual role as STSG / FTSG donor, Baumgarten 2019 IPP-concurrent application, "why isolated escutcheonectomy fails" framing.
- **[Penile Skin Grafting](docs/04-surgical-techniques/04e-genital-reconstruction/penile-skin-grafting.mdx)** — cross-cutting workhorse covering STSG vs FTSG, donor-site options (thigh / escutcheon / pannus), harvest, mesh-vs-sheet, **on-stretch / pharmacologic-erection application** (Iblher PGE1 + tadalafil), four bolster techniques (traditional / Rook eggcrate-foam / NPWT with Lee 2025 + 8.3% take meta-analysis / TODGA / fibrin), indication catalog (AABP, Fournier's, lymphedema, glansectomy, HS, foreign-body granuloma, trauma), contracture management, outcomes from Plamadeala n = 204 + 3 cm length gain.
- **[Primary Closure ± Z-Plasty](docs/04-surgical-techniques/04e-genital-reconstruction/penile-primary-closure.mdx)** — on-stretch rationale, indications (Santucci Stage 1, concealed penis, penoscrotal webbing, chordee, hypospadias revision), Tausch decision algorithm (primary → Byar's → STSG), Alter / Ehrlich subdermis-to-tunica-albuginea anchoring as the dominant durability predictor, Z-plasty variants (penoscrotal, lateral, serial, double-opposing, Mokhless lengthening), Álvarez Vega 2025 100-patient outcomes (98% primary healing).

#### Scrotal-flap shaft techniques (each as its own dedicated page)

- **[Bipedicled Anterior Scrotal Flap (Fakin)](docs/04-surgical-techniques/04e-genital-reconstruction/bipedicled-anterior-scrotal-flap.mdx)** — n = 43 siliconoma cohort, 100% flap survival, 4.37 / 5 satisfaction.
- **[Modified Bipedicle Scrotal Tunnel Flap (Murányi)](docs/04-surgical-techniques/04e-genital-reconstruction/muranyi-scrotal-tunnel-flap.mdx)** — n = 49, two defining innovations (subcutaneous tunnel pull-through + inverted-V ventral closure replacing the necrosis-prone T-junction), Clavien-Dindo breakdown.
- **[Modified Bilateral Butterfly Scrotal Flap (Yao)](docs/04-surgical-techniques/04e-genital-reconstruction/yao-butterfly-scrotal-flap.mdx)** — only series with documented significant penile-length gain (n = 7, p < 0.05); dual independent anterior-scrotal-artery pedicles; end-to-end ventral midline avoids T-junction.
- **[Staged Bipedicled Scrotal Flap (Pribaz / McLaughlin)](docs/04-surgical-techniques/04e-genital-reconstruction/staged-scrotal-flap.mdx)** — two-stage burial-then-unburial; defining indication is contaminated / actively infected wound; Lumbiganon 83.3% complication-free two-stage vs 43.5% single-stage; Zucchi variant n = 10 median VAS 97 / 100.
- **[Ventral Slit Scrotal Flap (VSSF, Westerman / Tausch)](docs/04-surgical-techniques/04e-genital-reconstruction/ventral-slit-scrotal-flap.mdx)** — only AABP technique with 100% same-day discharge and 0% perioperative complications; Pariser Category I; **20% recurrence vs 3.9% in escutcheonectomy + STSG** counsels patients on the trade-off.
- **[Total Anterior Scrotal Flap (Zhao)](docs/04-surgical-techniques/04e-genital-reconstruction/total-anterior-scrotal-flap.mdx)** — only scrotal-flap technique integrating suspensory-ligament division with maximal-area coverage; triple-territory (bilateral anterior + central posterior) vascular supply; **100% deep and superficial sensation recovery** at mean 2.3-y follow-up.
- **[Reverse Bilateral Anterior Scrotal Artery Flap (Gao)](docs/04-surgical-techniques/04e-genital-reconstruction/reverse-anterior-scrotal-flap.mdx)** — only published reverse-flow scrotal flap; defining narrow indication is compromised proximal scrotal-root pedicle; Tanaka / Tajima all-or-nothing venous outflow; Torii venous-drainage mechanisms; Dhar delay-phenomenon choke-vessel conversion; single 10-y complication-free case.
- **[Sensate EPAP Hemi-Scrotal Flap (Tsukuura)](docs/04-surgical-techniques/04e-genital-reconstruction/epap-hemi-scrotal-flap.mdx)** — first true perforator-flap principles applied to scrotal penile reconstruction (perforator isolation + named anterior-scrotal-nerve preservation); single-hemiscrotum harvest with septum preservation; eliminates dyspareunia / stretching of fasciocutaneous-pedicle designs.

#### Tissue substitutes consolidation

- **[Penile Grafting With Tissue Substitutes](docs/04-surgical-techniques/04e-genital-reconstruction/penile-tissue-substitutes.mdx)** — single page consolidating Integra (Liguori, Jaskille, Ludolph, Valdatta, Payne), Matriderm (**Crane 2026 n = 36, 92.1% take — largest substrate evidence**; Kang Flex + NPWT), AlloDerm / Epiflex / porcine pericardium, tissue expanders (Harris, Kajbafzadeh, Mir-Hanna, Mathews), NPWT meta-analytic + Iblher penile data, Falcone RAFFF forearm donor-site comparative table, emerging substrates (amniotic, SIS-ECM, fish skin, ovine forestomach), comprehensive comparison + decision algorithm. Four redundant DB rows consolidated.

#### Glans / penile cancer

- **[Glans Resurfacing](docs/04-surgical-techniques/04e-genital-reconstruction/glans-resurfacing.mdx)** — fully built from stub. Three variants (TGR / PGR / CSGR); NCCN / EAU-ASCO 2023 strong recommendation; 20% occult-invasion-detection rationale; full 11-step technique with **TODGA vs quilting**; Elst 2025 multicenter n = 550 → 5-y CSS 99% despite 29% local recurrence; Falcone comparative IIEF-15 −6% vs WLE −23% vs glansectomy −24%; OMG section folded in (Albaghdady fenestrated, Pandey multi-indication, Beamer buccal belt, Favre dorsal onlay; Barbagli donor-site morbidity; OMG vs STSG comparison; LS-specific Kulkarni rationale; emerging tissue-engineered / EV / organoid directions).
- **[Glansectomy With STSG](docs/04-surgical-techniques/04e-genital-reconstruction/glansectomy-stsg.mdx)** — invasive cT1–T2 SCC confined to glans; standard-vs-salvage plane (over vs under Buck's, corporal-apex transection); FSE accuracy (Yunis 95.4%); Parnham n = 177, Tang n = 410, Pang 2026 SR n = 327 outcome tables; Roussel-vs-Elst debate on local-recurrence impact on survival; comparative IIEF-15 24% decline vs glans resurfacing 6%.
- **[Glanuloplasty With Flaps (umbrella)](docs/04-surgical-techniques/04e-genital-reconstruction/glanuloplasty-flaps.mdx)** + four split technique pages:
  - **[Inverted Urethral Flap (Belinky / Chavarriaga)](docs/04-surgical-techniques/04e-genital-reconstruction/inverted-urethral-flap.mdx)** — Chavarriaga n = 74, 6-y OS 86.5% / RFS 90.5%, IIEF-5 17.3, ICIQ-MLUTS 1.7, EQ-5D-3L 84.6%; 0% meatal stenosis vs 8.1% STSG; AJCC 8th-edition staging note; NCCN-vs-EAU-ASCO surveillance comparison.
  - **[Gulino Everted Urethral Flap](docs/04-surgical-techniques/04e-genital-reconstruction/gulino-everted-urethral-flap.mdx)** — n = 14; **100% thermal + tactile sensation** (best documented of any neoglans technique); eversion-vs-inversion distinction producing 0% vs 10% ventral curvature.
  - **[Scrotal Flap Glanuloplasty (Mazza / Cheliz)](docs/04-surgical-techniques/04e-genital-reconstruction/mazza-scrotal-flap-glanuloplasty.mdx)** — n = 34, mean 73.2 mo (longest follow-up of any neoglans series); **0% retraction** but 20.5% potency and 17.6% depilation; Gil-Vernet depilation protocol; modern single-stage / sensate alternatives.
  - **[Rectus Abdominis Myofascial Neoglans (Shaeer)](docs/04-surgical-techniques/04e-genital-reconstruction/shaeer-rectus-myofascial-neoglans.mdx)** — only neoglans technique using muscle / fascia rather than epithelial tissue; DIEA pedicle; corona built from muscle bulk by tucking; phalloplasty-tip / prosthesis-support context.

#### Trauma / replantation

- **[Microsurgical Penile / Glans Replantation](docs/04-surgical-techniques/04e-genital-reconstruction/penile-replantation.mdx)** — ACS 2025 Best Practices (two-bag preservation, 8 h glans / 16 h complete-penis viability, urgent microsurgical transfer); Wang / Luo 9-step protocol with optional IEPA repair (Lohasammakul) to prevent shaft skin necrosis; microscopic glans replantation (Jin JoVE); microsurgical-vs-macroscopic outcomes; Ching bipedicled-scrotal-flap salvage; leech (Banihani / Mousa / Mineo) and HBO (Landström / Zhong) adjuncts; van der Merwe penile allotransplant alternative. New **"Trauma / Replantation"** domain badge added to the 04e penile DB; "Penile / Glans Amputation" cross-link section added to [Genitoscrotal Trauma](docs/special-populations/05a-trauma-emergencies/genital-scrotal-trauma.mdx).

#### 04e penile DB consolidation

- Renamed the umbrella buried-penis row → **"Buried Penis Repair (overview)"**
- Deleted "Escutcheon-Derived FTSG for AABP + LS" (covered in escutcheonectomy + skin-grafting pages)
- Deleted standalone "STSG — Penile Shaft" and "FTSG — Penile Shaft" rows (superseded by unified Penile Skin Grafting row)
- Consolidated four tissue-substitute rows into single Penile Grafting With Tissue Substitutes row
- Consolidated two Bipedicled Anterior Scrotal Flap rows (general + siliconoma indication) into single Fakin row
- Deleted Wide Local Excision shaft tumor, Meatoplasty / Meatotomy Adjunct, Staged Skin Replacement after LS, Adjacent-Tissue Transfer / Advancement Flaps rows
- Removed orphaned "Tissue Expansion" badge color

### Site-wide DB best-for column standardization

Added concise one-line `bestFor` / "Best for / indication" indication strings across **11 additional treatment databases** (continuing the pattern established in the 04h fistula DBs):

| DB | Rows | Notes |
|---|---|---|
| 04b bladder-reconstruction | 18 | `notes` → `bestFor` |
| 04i tissue-transfer | (header rename) | existing Indication column |
| 04e penile | 23 | `notes` → `bestFor` |
| 04e vulvar | 30 | `notes` → `bestFor` |
| 04e scrotal | 24 | `notes` → `bestFor` |
| 04k feminizing GAS | 17 | `notes` → `bestFor` |
| 04k masculinizing GAS | 23 | `notes` → `bestFor` |
| 04k non-binary / nullification | 10 | `notes` → `bestFor` |
| 04l male-cosmetic | 16 | Rows lacked indication column; added |
| 04j ED | 13 | Indication column added alongside existing Tier / Invasiveness |
| 04j priapism | 10 | Role column repurposed as Best for / indication |

**Excluded by design** (per project rule that taxonomic catalogs do not need an indication column): 04m BPH / LUTS (technique-vs-flow comparison), foundations tool / instruments, foundations tool / biomaterials, and foundations / pharmacology indices.

### Verification

`npm run lint:links` — 967 files, 0 broken `/docs/` links.
`npm run typecheck` — passes.
`npm run build` — passes.

---

## 2026-05-09 (third pass) — 04h fistula repair atlas overhaul + foundations HBOT

Major restructuring session: collapsed redundant DB rows, built dedicated atlas pages for the major RUF / RVF techniques, consolidated cross-cutting topics, and added a comprehensive HBOT page in foundations.

### Female fistula DB consolidation

- **VVF / VUF / UretVF / UVF rows simplified.** Renamed `notes` → `bestFor` column ("Best for / indication") with concise indication strings. Beefed up Management section on [Ureterovaginal Fistula clinical page](docs/03-clinical-conditions/03f-fistulas/in-females/ureterovaginal.mdx) (Approach Selection table + Postoperative care subsection) and collapsed five UretVF rows to one row pointing at `#management`. Collapsed four VUF rows to a single "Vesicouterine Fistula Repair" row pointing at the existing comprehensive clinical page. Collapsed UVF row name to "Urethrovaginal Fistula Repair," with new dedicated [UVF Repair atlas page](docs/04-surgical-techniques/04h-fistula-repair/female/urethrovaginal-fistula-repair.mdx) covering eight surgical techniques.

### RVF — new dedicated atlas pages

- **[ERAF ± Sphincteroplasty](docs/04-surgical-techniques/04h-fistula-repair/female/eraf.mdx)** — full ASCRS framework, technique with optional de Parades muscular plication, when / how to add overlapping sphincteroplasty (Khanduja 1999 100% stool/flatus elimination, 70% perfect continence), Sonoda / Jones / de Parades / Corte / Li 2025 outcomes. Two ERAF rows merged.
- **[Episioproctotomy](docs/04-surgical-techniques/04h-fistula-repair/female/episioproctotomy.mdx)** — definition (conversion to fourth-degree laceration + layered repair), 10-step technique, Hull 2007/2011 + El-Gazzaz + Rahman outcomes (78–100%, 50%→8% incontinence reduction, 92% near-perfect continence, superior fecal/sexual function vs ERAF), cloaca subgroup 100%.
- **[Nonoperative RVF Management](docs/04-surgical-techniques/04h-fistula-repair/female/nonoperative-rvf-management.mdx)** — ASCRS 2022 + AGA + ACG 2025 framework: conservative wound care (52–66% obstetric closure), draining seton, Crohn's medical therapy (infliximab ACCENT II, ada/usteki/vedo, immunomodulators, calcineurin as last resort, seton + biologic 46% vs 13%), fecal diversion, fibrin glue / plug not recommended, vaginal-estrogen and microbiome adjuncts. Four RVF rows merged.
- **[Transabdominal RVF Repair](docs/04-surgical-techniques/04h-fistula-repair/female/transabdominal-rvf-repair.mdx)** — five techniques (resection + coloanal anastomosis, DCAA / Turnbull-Cutait, sleeve excision, lap omentoplasty, APR), Corte 2015 multivariate predictors (major procedure OR 6.4, diverting stoma OR 3.5, early surgery OR 2.3), full APR section (indications, technique with myocutaneous-flap closure for irradiated fields, 30–38% perineal-wound rate post-XRT, Zhong 2017 QoL, AGA shared-decision-making, Zelga radiation, Sapci Crohn's). Two transabdominal rows merged.
- **[Anal Sphincteroplasty](docs/04-surgical-techniques/04h-fistula-repair/female/anal-sphincteroplasty.mdx)** — placed in fistula section per request; full overlapping technique, end-to-end vs overlap evidence, short → very-long-term continence trajectory (85% → 10–14% at 5 yr → near baseline at 18 yr), sphincteroplasty-vs-SNM data (Emile 2025; 7-fold US volume drop 2009–2015).
- **Obstetric domain rows deleted** from the female fistula DB (same operative ladder as VVF — kept clinical-conditions obstetric page).

### Male fistula DB — dedicated RUF atlas pages

- **[Transperineal Gracilis for RUF](docs/04-surgical-techniques/04h-fistula-repair/male/transperineal-gracilis-ruf.mdx)** — gold-standard: rationale (Park 2022 8% vs 50% recurrence), 7-step technique, Sbizzera / Vanni / Ghoniem / Wexner / Guo / Park outcomes, Garoufalia 2023 meta-analysis 79.4%, radiation impact (~100% non-radiated → ~84% radiated, 31% permanent diversion), satisfaction 9/10, Khouri 2024 87% concurrent posterior urethroplasty.
- **[ERAF for RUF](docs/04-surgical-techniques/04h-fistula-repair/male/eraf-ruf.mdx)** — kept separate from RVF ERAF page (different anatomic position, etiology, sphincter-vs-urethral comparator): high-pressure-side principle, transanal step-by-step, al-Ali 1997 posterior transsphincteric variant (100%, 11/11), Garofalo / Joshi / Dreznik / Keller outcomes, head-to-head vs gracilis.
- **[York-Mason Repair](docs/04-surgical-techniques/04h-fistula-repair/male/york-mason.mdx)** — Mason 1970 history, Utah 40-yr Middleton/Renschler/Hadley experience, 8-step technique with color-coded sphincter-layer marking sutures, three modifications (gluteal fat graft McKibben 94%, dartos flap Dafnis 2024 100% at 70 mo, modified Montsouris), aggregate **0% fecal incontinence and 0% anal stenosis** despite deliberate sphincter division.
- **[Conservative Management of RUF](docs/04-surgical-techniques/04h-fistula-repair/male/conservative-ruf-management.mdx)** — Thomas 2010 fecaluria-driven algorithm, Keller 2015 algorithm, Roberts 87.5–100% prevention via intraoperative recognition + 2-layer repair + omental, fibrin sealant / fulguration / HBOT adjuncts (Marguet 0/4 standalone failure for radiated RUF), Venkatesan long-term-without-repair, permanent dual diversion as definitive management (Linder 86%/93%, Martins "legitimate primary option, not a failure"). Two conservative rows merged.
- **[Robotic Transabdominal RUF / RVF Repair](docs/04-surgical-techniques/04h-fistula-repair/male/robotic-transabdominal-ruf-rvf.mdx)** — shared atlas covering both fistula types (same operation, urinary closure differs): salvage prostatectomy section, four interposition options including Hwang 2023 perivesical fat, three technical variants, Medina 2022 / Sayegh 2023 / Gözen / Sotelo / Mundy & Andrich outcomes. Both DB rows repointed.

### Cross-cutting shared pages

- **[Transanal Minimally Invasive Repair (RVF / RUF)](docs/04-surgical-techniques/04h-fistula-repair/transanal-minimally-invasive-repair.mdx)** — shared 04h-root page covering MITAR / TAMIS / R-TAMIS / TEM / TEO with the comparative table that's the value (MITAR 100% RUF, TEM 92% RVF, TEO/TEM 25% RUF Serra-Aracil cautionary note). Embedded R-TAMIS RUF operative video paralleling Hebert 2021. Female and male DB rows repointed.
- **[Fecal Diversion](docs/04-surgical-techniques/04h-fistula-repair/fecal-diversion.mdx)** — shared atlas covering RVF / RUF / entero-urinary / Fournier's / refractory FI; loop ileostomy vs colostomy vs end colostomy vs Flexi-Seal trade-offs (Arndt 2026 OR 3.15 readmission, dehydration 60% vs 11%). New row added to female / male / both-genders DBs.

### Both-Genders DB collapse

- Collapsed the 26-row both-genders DB to **8 type-level rows** (Pyeloenteric, Nephropleural, Ureterocolonic, Colovesical/Enterovesical, Vesicocutaneous, Post-Kidney-Transplant, Ureteroarterial + Fecal Diversion). Each row's `bestFor` summarizes the full first-line / definitive / salvage ladder and links to the dedicated treatment article.

### Foundations — new HBOT atlas page

- **[Hyperbaric Oxygen Therapy](docs/01-foundations/surgical-principles/hyperbaric-oxygen-therapy.mdx)** — comprehensive foundations atlas covering mechanism (Henry/Dalton/Fick, Marx 8–9× neoangiogenesis, HIF-1 stabilization), standard protocols, and ten applications: radiation hemorrhagic cystitis (RICH-ART Level 1, 5-yr follow-up — 55% complete remission, 37% lower healthcare cost, 53% lower mortality), Fournier's gangrene (Toppen 2024 78% mortality reduction), complex fistula repair (Hammad 2026 — recurrence 5.9% vs 26.5% after stoma reversal), hypospadias reoperations (Bush & Snodgrass — graft failure 6% vs 28%), radiation-induced vaginal injury (Möring 2025 79% responders), IC/BPS (van Ophoven), ED (Hadanny positive non-surgical / Chiles negative post-RP RCT), radiation proctitis (ASCRS 1B; HOT2 negative), preoperative tissue conditioning (Boet 2020 SR), mesh complications. Adverse-effect table, contraindications, cancer-safety data, cost analysis, evidence-hierarchy summary, key takeaways. Wound-healing-adjuncts page tightened with summary + cross-link.

Verification: `npm run lint:links` passes (936 files); `npm run typecheck` passes; `npm run build` passes.

---

## 2026-05-09 — Style cleanup after site audit

### Style / hygiene

- **Removed disabled Docusaurus sample blog content.** Deleted the stock demo blog posts, sample author/tag files, and plushie image. The blog plugin was already disabled in `docusaurus.config.ts`, so this removes dormant template content without changing site navigation.
- **Cleaned editorial placeholders.** Removed image-placeholder comments from [Lone Star Retractor System](docs/01-foundations/tools/instruments/retractors/lone-star.mdx) and [Turner-Warwick Ryder Needle Holder](docs/01-foundations/tools/instruments/needle-holders/turner-warwick-ryder.mdx); rewrote the conversational draft note in [Gelman Urethral Sound](docs/01-foundations/tools/instruments/sounds-bougies/gelman.mdx); changed the pharmacology index wording from "placeholder page" to "template page."
- **Neutralized strange / overemphatic wording.** Replaced nonessential uses of "dramatic," "extraordinary," and "breakthrough" with more clinical phrasing across anatomy, trauma, fistula, catheter, urinary diversion, bladder reconstruction, urethral flap, BNC/VUAS, incontinence, penile prosthesis, cosmetic genital surgery, and history pages. Legitimate medical terms and article/reference titles were preserved.

Verification: `npm run typecheck` passes; `npm run build` passes; `npm run lint:links` passes; `git diff --check` passes. Full `npm run lint` remains blocked by pre-existing citation/orphan findings from the audit.

---

## 2026-05-09 (later) — 04h Both-Genders Fistula treatment-atlas section + female redundancy cleanup

### 04h fistula repair

- **New "Both-Genders Fistula Repair" section.** Dedicated treatment-atlas section paralleling Female and Male — landing page [`both-genders-fistula.mdx`](docs/04-surgical-techniques/04h-fistula-repair/both-genders-fistula.mdx) with decision-framework table + GenericDatabase (27 techniques across 7 fistula types), plus seven dedicated technique pages under hidden `both-genders/` category: [Pyeloenteric](docs/04-surgical-techniques/04h-fistula-repair/both-genders/pyeloenteric.mdx), [Nephropleural](docs/04-surgical-techniques/04h-fistula-repair/both-genders/nephropleural.mdx), [Ureterocolonic](docs/04-surgical-techniques/04h-fistula-repair/both-genders/ureterocolonic.mdx), [Colovesical/Enterovesical](docs/04-surgical-techniques/04h-fistula-repair/both-genders/colovesical-enterovesical.mdx), [Vesicocutaneous](docs/04-surgical-techniques/04h-fistula-repair/both-genders/vesicocutaneous.mdx), [Post-Kidney-Transplant](docs/04-surgical-techniques/04h-fistula-repair/both-genders/post-kidney-transplant.mdx), [Ureteroarterial](docs/04-surgical-techniques/04h-fistula-repair/both-genders/ureteroarterial.mdx). 04h `index.mdx` updated to surface the new section under Decision Framework & Treatment Database.
- **Female fistula redundancy cleanup.** Deleted `female/robotic-vvf-repair.mdx` (a "platform overview" that duplicated the dedicated [O'Conor](docs/04-surgical-techniques/04h-fistula-repair/female/oconor-vvf-repair.mdx) and [Extravesical](docs/04-surgical-techniques/04h-fistula-repair/female/extravesical-vvf-repair.mdx) robotic atlas pages). Database row in [`female-fistula.mdx`](docs/04-surgical-techniques/04h-fistula-repair/female-fistula.mdx) and "See Also" link in [`vaginal-fistula-flaps.mdx`](docs/04-surgical-techniques/04h-fistula-repair/vaginal-fistula-flaps.mdx) removed.

Verification: `npm run lint:links` passes; `npm run typecheck` passes; `npm run build` passes.

---

## 2026-05-09 — Resources cleanup + 04b/04c/04d/04h fistula and channel build-out + robotics

### Resources

- **Cleanup.** Filler removed from resources index, podcasts, patient resources, textbooks, websites, hidden-curriculum index/overview (deleted RVU-anecdote, "no MBA" stance, the "If you can't quote your numbers, you can't lead" section). Reordered websites so Professional Societies appears first. Textbooks: every card converted to a clickable link surfacing the Springer / PDF source.
- **Site-wide admonition eradication.** Stripped every `:::tip / :::note / :::warning / :::info / :::caution` block across **123 files**; titles preserved as bolded inline lead.
- **Billing & Coding restructure.** Tabs (CPT / ICD-10 / Modifiers / External Resources). ~120 new codes covering upper-tract reconstruction, bladder reconstruction & diversion, BNC/VUAS, vaginal recon & GAS, hypospadias / penile reconstruction, BPH, mesh / IPP / congenital / gender-incongruence / trauma / recurrent UTI codes.

### Cosmetic / Podcasts

- 04l female cosmetic database → static markdown table with a "Best for / indication" column.
- Podcasts "Contributing" section deleted.

### 04b — Continent catheterizable channels

- Yang-Monti Channel (incl. Double Monti, Casale spiral, Tapered, sigmoid / gastric variants).
- Tubularized Bladder Flap (Casale/Rink, Peard intussusception, Yachia rectus-strands, Stief-Becker Lich-Gregoir, Klauber-Cendron, Casella-Ost hybrid).
- Hemi-Kock Continent Stoma (mesentery stripping; Marlex-collar / metal-staple legacy → absorbable-Polysorb era; Herschorn 2022 n=109; valve-failure salvage).
- Indiana Augmentation Cystoplasty (IAC) — Khavari/Boone n=34, 100% continence at 31 mo; Redshaw cecocystoplasty vs tunneled-channel comparison (13% vs 50% secondary procedures).
- Cutaneous Vesicostomy (Blocksom + Lapides + permanent vesicostomy + bladder-neck-closure-with-continent-vesicostomy "last resort"; Benchekroun hydraulic-valve historical entry).
- 04b CCC principles page cross-linked to the new Parastomal Hernia page.

### 04c — Urinary diversion

- 04c diversion DB gained a "Best for / indication" column.
- New canonical Parastomal Hernia After Urinary Diversion page — conflicting prophylactic-mesh RCTs (Liedberg / PUBMIC / MSKCC), Tanaka oblique-passage technique (no mesh; PSH 19.6% → 3.5%), Sugarbaker / keyhole / sandwich / 3-D mesh repair, Maskal 2024 RCT (no significant difference at 2 yr), MIS-vs-open data, robotic-specific outcomes (Xu, Dewulf), continent-cutaneous-diversion PSH (Helal, Stout). Indexed from 04c and 04b.

### 04d — Upper-tract reconstruction

- Balloon Dilation (pooled 89%/54% data; length / vascular / multi-stricture failure predictors).
- Yang-Monti Ileal Ureter (Ali-El-Dein 2021 n=36; eGFR \<40 contraindication; double / triple Monti; onlay variant).
- Reconfigured Colon Ureteral Substitute (Pope/Koch 1996 → Lazica 2012 long-term; retroperitoneal access; safe in renal insufficiency / post-radiation).
- Pyelovesicostomy (Kennelly 1973 → Kim 2020 robotic; transplant + pelvic-ectopic-kidney indications; SPBG salvage).
- Simple (Benign) Nephrectomy (BAUS "benign nephrectomy" reframing; XGP / TB / ADPKD per KDIGO 2025; why benign is harder than radical).
- Transvaginal Ureteral Reimplantation (single-port robotic vNOTES; Kaouk SP, Hebert single-port, Laydner cadaver retroperitoneal NOTES, Crivellaro SARA).
- Existing UAS revision page un-hidden and expanded with hybrid Bricker/Wallace (Can 2024), Allium metallic stent (Gao 2021), expanded ICG-prevention section (63% decision-change rate, 61% perfusion discordance). 04c diversion principles cross-links to it.
- 04d DB `notes` column → `bestFor`. Deleted Lingual Mucosal Graft and solo Psoas Hitch rows.

### Foundations / robotics

- New vNOTES & Robotic vNOTES page covering platforms (da Vinci SP, Hominis), technique, indications, ACOG / RCOG guidance.

### 04h — Female fistula repair (full VVF atlas build-out)

Every row in the female-fistula database that previously slugged to the clinical-conditions page was renamed and repointed to a dedicated atlas page:

- Conservative VVF Management (replaces "Foley Catheter Drainage" — Bodner-Adler selection-bias caveat; Barone 2015 RCT 7-day non-inferiority).
- Endoscopic VVF Management (Bugbee fulguration, Ho:YAG laser, tissue adhesives, transurethral NOTES, transvesicoscopic, V-NOTES, lap / robotic / LESS).
- Transvaginal Latzko Repair (Latzko 1942 principle; Luo & Shen 100% in n=108 apical; Cardenas-Trowers separate fascial closure; Pushkar radiation-induced 48% primary / 80% cumulative).
- Transvaginal Sims-Simon Multilayered Closure (Sims 1845–49 / Simon 1860s–70s; Mörgeli & Tunn 2021 100% in 47 with median OR 40 min; Shaker RCT — no significant difference for trim vs no-trim).
- Martius Flap for VVF — VVF-specific page distinct from the foundations Martius. Rothenberger 2025 cadaveric mapping (right labium / lateral approach safer); Kapriniotis 2024 individualization; Lee 2013 long-term donor-site morbidity.
- O'Conor (Transabdominal Transvesical) VVF Repair — Nesrallah 100% (n=29); modified O'Conor (Dalela) 100% (n=26); Tavares 2026 robotic SR n=206 = 97% / 2.9% recurrence; transvesical-vs-extravesical equivalence.
- Extravesical Transabdominal VVF Repair — Miklos & Moore 1999 / 15-yr 98% without flap; statistically equivalent to transvesical (RR 0.98, 95% CI 0.94–1.02); modifications (LESS, rainbow-shaped peritoneal flap Yang 2025, Dayan-Schwartz 12-step, early extravesical Giusti).
- Robotic VVF Repair (platform overview) — ERUS 2020 consensus, Dayan-Schwartz 12-step extravesical (incl. post-oncologic chemo+immunotherapy patient), Sundaram-Hemal / Bora / Nóbrega / Occhino-Linder stepwise techniques, V-Loc barbed-suture practice, "one-stop" concurrent procedures (Boari, Burch, ureteral reimplant), complex/recurrent VVF data (Chandna n=33 = 93.9%).
- Vaginal Fistula — Interposition Flap Options umbrella catalog. Now also includes a dedicated **Native Vaginal-Wall Flaps** section (Shoukry rectangular reinforcement; Wang lateral transfer; Tang annular single-layer; Sayegh vaginal-cuff for robotic; Latzko-as-vaginal-flap), the **Labia Majora Fasciocutaneous flap** (vaginal-wall-deficit cases), the **Full-Thickness Martius graft with skin paddle** (large obstetric fistulae), and a full **Vaginal Advancement Flap (VAF) for RVF** section (VAF vs RAF — Ruffolo SR Crohn's data; Nosti +pedicled-flap zero-failure result; Li 2025 RAF; ASCRS 2022 guidance). Plus omental / rainbow peritoneal / sigmoid epiploicae / gracilis / VRAM / Singapore / TachoSil / SIS / PRP / amniotic / buccal. Flap-vs-no-flap controversy, flap-selection algorithm by clinical scenario, comparative summary.

Verification: `npm run lint:links` passes (~915 files); `npm run typecheck` passes; `npm run build` passes.

---

## 2026-05-08 — 04ab BNC/VUAS consolidation + 04b bladder-reconstruction build-out

- **04ab database consolidation:** collapsed three first-line VUAS endoscopic-incision rows (holmium / cold-knife / DVIU) into one TUIBNC row; deleted DVIU+MMC and DCB rows (DCB now under balloon dilation); deleted RBNR, Extraperitoneal Robotic, and Robotic Transperineal Urethral Advancement rows (subsumed by Primary Re-Anastomosis and Combined Abdominoperineal pages). Both BNC and VUAS databases switched from a long-form "Notes" column to a `bestFor` column ("Best for / indication") with concise indication strings. Removed Young-Dees-Leadbetter, Kropp, and Pippi-Salle outlet procedures and their pages.
- **New 04ab atlas pages:** TUITMR, Y-V Plasty (robotic + open), T-Plasty, Subtrigonal Inlay (BMG family), Tanagho Flap, Transvesical Approaches (RTV-BNR + TvRARP + Avallone subtrigonal), Primary Re-Anastomosis (open retropubic + open transperineal + robotic retropubic + robotic transvesical), Combined Abdominoperineal / Pull-Through (open + combined-robotic), Robotic Bladder Flap Posterior Urethroplasty (Zhao 2022), Salvage Prostatectomy reconstructive (moved from VUAS to BNC), BMG Endourethroplasty, focused Dorsal Onlay BMG for BNC/VUAS (Shahrour, with two operative videos).
- **VUAS algorithm:** added Lee 2025 robotic VUAS reconstruction algorithm (caliber + EUS involvement) attributed to Naser-Tavakolian and Lee, *Transl Androl Urol* 2025;14(8):2405–2418, doi:10.21037/tau-24-503.
- **04b bladder-reconstruction build-out:** dedicated pages for Ileocystoplasty, Ileocecocystoplasty (Mainz Pouch I + CCIC + hand-assist laparoscopic), Sigmoid Cystoplasty (Goodwin cup-patch + Hayashi 13.1-yr data + SCLU note), Autoaugmentation (Cartwright-Snow + Perovic rectus-backing + Lima nonsecretory + balloon-conformer + MacNeily-vs-Hansen durability debate), Ureterocystoplasty (Bellinger + Husmann selection + Gosalbez TUU + Kajbafzadeh teapot + Landau equivalence to ileum), Gastrocystoplasty (HDS, hypochloremic alkalosis, malignancy, current consensus against routine use), SCLU (Buson experimental + Gonzalez ALPP / intact-mucosa / no-CCC prerequisites + AUS synergy + hourglass mitigation), Ileovesicostomy (Schwartz/McGuire bladder-chimney + Leng dramatic complication reduction + 54% reoperation + Casale continent variant), Appendicovesicostomy / Mitrofanoff (gold-standard CCC + VQZ/VQ/VR/Kurzrock tip-preservation + adult-vs-pediatric outcomes + bladder-exstrophy 93% continence + split-appendix Mitrofanoff+MACE).
- **04c urinary diversion:** new Simple Cystectomy (benign disease) page under Complex / Salvage; new Supratrigonal Cystectomy page under 04b; both linked from IC/BPS.
- **Cross-database link audit:** added slugs to duplicate rows referring to suprapubic catheter, balloon dilation, indwelling catheter, Foley/Coudé/Council/Penrose so duplicates point at dedicated pages.
- **Instruments:** new Ski / J-Hook Needle page (operative video at 3:07); cross-linked from Dorsal Onlay BMG technique step.
- **Peyronie's-at-implant:** added Balzano *Can J Urol* 2022 curvature-direction algorithm and Brock 2006 intracorporeal-incision lineage to the IPP-with-adjunctive-straightening page; expanded TEP detail.

---

## 2026-05-07 — Prolapse atlas pilot + BNC build-outs

Heavy single-session arc on `main`. Three workstreams: prolapse pilot rollout (column shortening + pagination chain), prolapse procedure build-outs, and BNC endoscopic-treatment trio.

### Prolapse pilot — layout and pagination

- Database column shortening: header trimmed to **"Best For"**, every cell rewritten to a 15–25 word indication phrase, **Approach column removed**. The trailing column now sits much narrower.
- **Pagination chained in database row order** via `pagination_prev` / `pagination_next` frontmatter on every prolapse atlas page. Clicking Next at the bottom of any procedure page steps through the database in order, ignoring the apical / anterior / posterior-enterocele / obliterative-pessary subdir grouping. Order: Pessaries → Lifestyle → Anterior Colporrhaphy → Kelly → Paravaginal → Michigan Four-Wall → Posterior Colporrhaphy → Perineorrhaphy → SSLF → USLS → McCall → SS Hysteropexy → Manchester → ICG → VH → Supracervical Hysterectomy → Sacrocolpopexy → Sacrohysteropexy → Pectopexy → LLS → TVM → Moschcowitz → Halban → Colpocleisis. Pilot scoped to 04g for now; replicable across other treatment-atlas sections once validated.

### Prolapse merges and deletions

- **McCall vaginal + abdominal merged** into a single canonical [McCall Culdoplasty](docs/04-surgical-techniques/04g-prolapse-repair/posterior-enterocele/vaginal-mccall-culdoplasty.mdx) (slug `/mccall-culdoplasty`). Same anatomic operation, two routes, identical principles. Inbound links and database row collapsed.
- **Le Fort + Total Colpocleisis merged** into [Colpocleisis (Le Fort and Total)](docs/04-surgical-techniques/04g-prolapse-repair/obliterative-pessary/colpocleisis-total.mdx) (slug `/colpocleisis`). Le Fort stub deleted; database collapsed to a single row; cross-links updated in apical-prolapse, geriatric-urology, and the prolapse decision matrix.
- **Deleted**: CRISP technique, Raz transvaginal enterocele repair (both stubs without built-out content); pagination chain rewired to skip them.

### Prolapse procedure build-outs

- **Sacrospinous hysteropexy** — full atlas page covering technique (suture placement ≥ 2 cm medial to ischial spine), SAVE-U 5-yr 87% composite success vs 76% VH+USLS, SUPeR mesh-augmented arm, Enklaar 2023 RCT vs Manchester (77% vs 87%), gluteal-pain S3–S4 mechanism, anterior-recurrence mode, ACOG PB 214 framing.
- **Manchester-Fothergill** — Donald 1888 / Fothergill 1908 history, AUGS/IUGA 2020 definition, technique (cervical amputation + cardinal/USL plication, Sturmdorf reconstruction), Enklaar 2023 RCT superiority (87.3% vs 77%, 0% reoperation), BSUG database confirmation, cervical stenosis ~1%, completed-childbearing requirement, cost data (−€1,458 vs hysteropexy), cervical-elongation indication.
- **Iliococcygeus fascia suspension** — Inmon 1963 / Meeks 1994 history, prespinous suture-placement anatomy (1–2 cm anterior / medial to ischial spine), Serati 5-yr (84%) and 10-yr (74%) cure data, Maher 2001 vs SSLF matched comparison, Suh 2018 hysteropexy failure data (48% advanced uterine prolapse), Milani 2014 vs SCP.
- **Vaginal hysterectomy** — ACOG CO 701 framing (preferred MIS route), feasibility (no absolute contraindications), step-by-step technique with anterior cul-de-sac entry adjuncts, intraoperative aids (vasopressin −130 mL, sealing devices), morcellation in 11%, opportunistic salpingectomy guidance, comparative outcomes vs abdominal and laparoscopic (NSQIP 2026, Danish Database 2020), bladder-injury risk factors (prior CS OR 4.01, uterus ≥ 500 g OR 2.88), perioperative care.
- **Sacrocolpopexy** — Type-1 lightweight polypropylene mesh, open vs lap vs robotic comparison, robotic step-by-step (Giannini standardized suturing pattern with 0% mesh exposure, peritoneal tunneling), suture-attachment options (PDS / barbed / anchors), single- vs multi-port comparison, learning curve (efficiency 20–30 cases, proficiency ~78), mesh-exposure data (3.5% MIS, 10.5% CARE 7-yr), concomitant supracervical hysterectomy preference (mesh erosion 3.8% total vs 0.36% supracervical), Burch / sling for de novo SUI (44% → 24% with Burch), expedited recovery evidence.
- **New page — Sacrohysteropexy** — uterine-preserving SCP variant; technique with broad-ligament avascular plane, mesh configurations, LAVA RCT non-inferiority vs sacrospinous hysteropexy, 7-yr Izett-Kay vs VH+USLS, mesh exposure 0.4%, pregnancy outcomes, suture-only mesh-free alternative. Slotted into pagination chain between sacrocolpopexy and pectopexy.
- **Pectopexy** — Banerjee-Noé technique (Cooper's-ligament fixation), mesh configurations (T, inverted T, DynaMesh, Y), mesh-free variants (LNMCP cerclage, Salman's modification), LESS and robotic variants, learning curve (~12 cases), 10-yr durability data (Noé 2026 n = 832, 94.9% apical re-fixation), comparison vs sacrocolpopexy (34 min shorter, less bowel dysfunction).
- **Moschcowitz procedure** — 1912 history, abdominal technique with concentric purse-strings, ureteral safety landmark, Cruikshank 1999 RCT showing McCall superiority for enterocele prophylaxis (94% vs 70%), Halban orientation distinction, contemporary role as sacrocolpopexy adjunct.
- **Halban culdoplasty** — sagittal-suture technique with critical Moschcowitz distinction, Halban vs Moschcowitz vs McCall comparison table, lower-ureteral-risk rationale, lack of apical support, current niche role.
- **New page — Laparoscopic Lateral Suspension (LLS)** — Dubuisson technique with retroperitoneal mesh tunneling, mesh-erosion risk factors (Type 3 mesh OR 13.0, smoking OR 10.4, posterior mesh 5×), comparison vs sacrocolpopexy (43 min shorter, comparable outcomes), modifications (LLS-ULFS, robotic), 92.9% apical anatomical success. Slot into pagination chain between pectopexy and TVM. Embedded YouTube surgical demonstration.

### BNC atlas (04ab) — endoscopic treatment trio

- Replaced malformed `tuit-triamcinolone.mdx` stub with new comprehensive [Transurethral Incision of BNC (TUIBNC)](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/transurethral-incision-bnc.mdx) page. Coverage: Nealon / Ramirez bilateral 3 & 9 o'clock standardized technique, comparative outcomes (Nealon 82% / 94%, Ramirez, Rosenbaum, Abramowitz, Quarta), failure risk factors (≥ 2 prior procedures, smoking, radiation), SUI counseling and AUS placement timing, and full **Mitomycin-C vs corticosteroid adjunct comparison** with the Pang 2021 meta-analysis, the TURNS 7% serious-AE safety flag (cystectomy), Zhang 2021 / Sun 2022 repeat-triamcinolone protocols, and Nealon counterpoint that incision technique alone may drive most success.
- New page — [Transurethral Bladder Neck Resection (TURBN)](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/transurethral-bladder-neck-resection.mdx). AUA 2023 equivalence to incision, technique with anatomic safety boundaries (sphincter / orifices), Rosenbaum 2021 head-to-head data confirming no outcome difference vs incision, Zhang 2021 92.9% in highly recurrent BNC with repeat triamcinolone, Pfalzgraf 2017 practice-pattern heterogeneity, escalation pathway.
- New page — [Balloon Dilation for BNC](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/balloon-dilation-bnc.mdx). Standalone Ramchandani 1994 (59% / 0% incontinence), preparatory step before incision / resection (Nealon protocol; Sun 2023 day-surgery columnar balloon + holmium laser), drug-coated balloon evidence (Berg 2025 60% recurrence reduction, HR 0.40), comparison table across approaches, complication framing.

### Verification

`npm run lint:links` passed across 877 files; `npm run typecheck` passed; `npm run build` passed; stub count stable; stats regenerated.

---

## 2026-05-06 — Native tissue apical prolapse atlas fill: SSLF + USLS

- Built out `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrospinous-ligament-fixation.mdx` from a stub into a full SSLF atlas article. Scope: ACOG / AUGS guideline framing; Amreich / Richter / Morley-DeLancey history; sacrospinous ligament and coccygeus-SSL anatomy; right posterior vaginal approach; suture-passing devices; double-vs-loop suture evidence; OPTIMAL 2- and 5-year outcomes; SSLF vs USLS, sacrocolpopexy, and sacrospinous hysteropexy; complications including buttock pain and pudendal entrapment; anterior compartment recurrence mechanism; operative pearls; 21 references.
- Built out `docs/04-surgical-techniques/04g-prolapse-repair/apical/uterosacral-ligament-suspension.mdx` from a stub into a full USLS atlas article. Scope: ACOG / AUGS guideline framing; USL anatomy and ureter-distance table; intraperitoneal Shull-type technique; extraperitoneal, laparoscopic / robotic, and vNOTES variants; McCall culdoplasty comparison; OPTIMAL, 10-year high-USLS, and laparoscopic meta-analysis outcomes; USLS vs SSLF, sacrocolpopexy, and vaginal mesh hysteropexy; ureteral obstruction prevention; prognostic factors; operative pearls; 34 references.
- Cleaned pasted-source artifacts during conversion: removed `undefined` figure placeholders, prompt-tail text, smashed comparison tables, malformed p-value fragments, and duplicate guideline blocks. Converted source references to the site anchor pattern and kept cross-links to the apical prolapse hub, SSLF / USLS sibling pages, sacrospinous hysteropexy, and sacrocolpopexy.
- Updated `CLAUDE.md` into the current compact handoff for the apical prolapse batch; `src/data/stats.json` was regenerated after rebasing on the latest `origin/main`.
- Verification before rebase: focused citation-anchor checks passed for both pages; `npm run lint:links` passed across 852 files; `npm run status` passed with 5 stubs; `npm run typecheck` passed; `npm run build` passed; `git diff --check` passed. Full `npm run lint` still stops on pre-existing unrelated citation issues in older 04a / 04f / 04l files, not these pages.

---

## 2026-05-05 — Prolapse atlas buildout + Notes → Best for column rollout

Long single-day arc on branch `claude/wizardly-hofstadter-daeb68`. Two parallel work streams: **04g Prolapse Repair stub-fill marathon** (8 pages built from stub) and **column-structure rollout** ("Best for / indication" replacing Notes) across four key 04f databases.

### Arc 1 — PTNS / iTNM / AUS revision deep-dives

- **[PTNS](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/percutaneous-tibial-nerve-stimulation.mdx) rebuilt** — 21 DOI-linked refs covering mechanism (C-fiber recruitment, saphenous co-activation), technique parameters (20 Hz / 200 μs / 0.5–9 mA / 30 min × 12 wk), SUmiT pivotal RCT (54.5% vs 20.9%, p &lt; 0.001), Wang 2020 meta (68% pooled), 5-row comparison vs sham / antimuscarinics / SNM / BoNT / PFMT, fecal-incontinence section anchored on negative CONFIDeNT and NOTABLE sham-controlled RCTs, contraindications, TTNS section.
- **New [iTNM dedicated page](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/implantable-tibial-nerve-stimulation.mdx)** — 17 DOI-linked refs. eCoin (Valencia) — fully implanted, primary-battery, suprafascial, automatic low-duty-cycle stimulation (pivotal extension 78% UUI / 22% dry at 96 wk). Revi (BlueWind) — leadless battery-free subfascial implant powered by external ankle wearable (OASIS 3-yr 79% / 95% satisfaction, no device-related SAEs). TITAN 2 Medtronic 12-mo. Amundsen 2025 SNM-vs-iTNM meta (71.3% vs 71.8% — no trial phase required). Protect PNS pIPG. OAB-UUI database iTNM links repointed from PTNS slug to new page; database notes expanded with per-device evidence anchors.
- **[AUS revision arc expanded](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx)** — 7-strategy revision matrix (downsizing / repositioning / tandem / transcorporal / PRB modification / SIS wrap / complete vs partial replacement); preoperative-evaluation algorithm; staged erosion-salvage with **Rozanski 2014 in-situ-urethroplasty** (38% vs 85% stricture, p = 0.047, OR 4.2 for stricture if reapproximation without urethroplasty); 4-step sequential salvage paradigm ending in PUL or diversion. 18 new DOI-linked refs (Cousin, Linder mechanical, Findlay, Kaiho 2024 review, Simhan 3.5-cm cuff, Eswara revision techniques, DiMarco tandem cuff, Magera tandem-transcorporal, Guralnick transcorporal, Moser transcorporeal-after-radiation, Averbeck 6th ICI, Trost SIS wrap, Rozanski 2014, Linder 2014 reimplantation, Lai 2012 complex revision, Raj 2005 secondary AUS, Van Dyke 2021 PUL, Maurer 2019 distal-double-cuff vs transcorporal).

### Arc 2 — Notes → Best for / indication column rollout

User-locked column convention applied across the highest-yield 04f databases (audited case-by-case per the Notes-column 3-part rule — drop or replace when every row has a per-device page and other columns already triage). Each row's evidence-heavy Notes content compressed to a single-phrase indication / best-for cue; per-device pages retain the depth.

| Database | Rows converted | Pattern |
|---|---|---|
| [Female SUI database](docs/04-surgical-techniques/04f-incontinence-procedures/female-sui/female-stress-incontinence-database.mdx) | 17 | GenericDatabase: rename `notes` → `bestFor`, header → "Best for / indication" |
| [Male SUI database](docs/04-surgical-techniques/04f-incontinence-procedures/male-sui/male-stress-incontinence-database.mdx) | 20 | Same |
| [OAB-UUI database](docs/04-surgical-techniques/04f-incontinence-procedures/oab-uui/oab-uui-database.mdx) | 16 | Same |
| [04a Male urethroplasty database](docs/04-surgical-techniques/04a-urethral-reconstruction/male-urethroplasty.mdx) | 38 | TechniqueDatabase has built-in `indication` field that renders as "Best For" column; passed `hideNotes` to suppress evidence dumps |

Female urethroplasty was already in this format. **Deferred** with documented reasoning — 04h fistula databases (female + male) and 04e genital recon (penile / scrotal / vulvar): Notes there carry technique-specific clinical context tied to fistula type / reconstruction scenario, not duplicated decision support; compression would lose useful context.

### Arc 3 — 04g Prolapse Repair stub-fill marathon

Eight prolapse-atlas stubs converted to full deep-dives:

| Page | Refs | Headline anchors |
|---|---|---|
| [Prolapse pessaries](docs/04-surgical-techniques/04g-prolapse-repair/obliterative-pessary/prolapse-pessaries.mdx) | 12 | ACOG PB 214; IUGA 2025 chapter; Cochrane Bugge 2020; **van der Vaart 2022 *JAMA* surgery-vs-pessary RCT — noninferiority NOT met** (76.3% vs 81.5%; 24–49% discontinue at 12–24 mo); TOPSY self-management RCT; Sansone 2022 PRO meta. Tables for support-vs-space-filling pessary types, fitting by stage, symptom-improvement breakdown, follow-up cadence, and special populations. |
| [Lifestyle modifications for POP (new page)](docs/04-surgical-techniques/04g-prolapse-repair/lifestyle-modifications.mdx) | 9 | ACOG PB 214; **PEOPLE meta (Fitz 2023)** with the four key ORs (obesity 1.44, constipation 1.77, heavy lifting 1.86, chronic cough 1.52); Hadizadeh 2026 bariatric meta (32 prospective studies / 5,299 pts); IUC 2025 lifestyle chapter; POPPY + PREVPROL PFMT RCTs; "the Knack" instead of blanket exercise avoidance; modifiable-risk-factor summary table. Database row repointed. |
| [Anterior colporrhaphy](docs/04-surgical-techniques/04g-prolapse-repair/anterior/anterior-colporrhaphy.mdx) | 19 | Christmann-Schmid 2026 Cochrane (vs biological graft RR 1.53; vs TVM RR 3.21); ACOG PB 214; **Altman 2011 *NEJM*** mesh-vs-AC RCT; **Eilber 2013 Medicare 10-yr — concomitant apical 11.6% vs isolated AC 20.2% reoperation**; DAC technique (Graefe 2023); Šumak 98.5% satisfaction despite anatomic recurrence; Wei OPUS prophylactic-MUS trial. |
| [Kelly plication](docs/04-surgical-techniques/04g-prolapse-repair/anterior/kelly-plication.mdx) | 13 | **Glazener 2017 Cochrane** (anterior repair vs Burch — RR 2.29 failure / **RR 8.87 reoperation**); Imamura 2019 *BMJ* NMA; **Bergman 1995 5-yr RCT** (Kelly **37%** vs Burch **82%**); Park-Miller 1988; Beck 1991 25-yr / 519-case series. Framed as historical with explicit guideline positioning. |
| [Paravaginal repair](docs/04-surgical-techniques/04g-prolapse-repair/anterior/vaginal-paravaginal-repair.mdx) (merged) | 30 | **Two pages merged into one approach-agnostic article** at new slug `/paravaginal-repair` (transvaginal / open abdominal / laparoscopic / robotic + lattice variant). Richardson 1981 landmark; Cochrane Yeung 2024 + Maher 2016; Menefee 2011 / Minassian 2014 / Cai 2025 RCTs vs AC; **Colombo 1996 RCT — Burch 100% vs paravaginal 61%** for SUI; **Rude 2021 lattice technique** dedicated subsection (n = 109, 11% recurrence at 12 mo, 19% transient retention) + Huang 2022 modified cross-stitch + Kalis 2020 trans-obturator. **`posterior-enterocele/lattice-technique.mdx` deleted**; Vercel redirects added for both old slugs; database collapsed 2 rows → 1. |
| [Michigan four-wall SSLF](docs/04-surgical-techniques/04g-prolapse-repair/anterior/michigan-four-wall.mdx) | 8 | Kearney-DeLancey 2003 (apex at hysterectomy scar in only 9%); **Larson 2013 — 90% satisfaction at 8 yr in 453 pts** (57% had prior failed surgery; 86% support at or above hymen); Paraiso 1996 (37% anterior recurrence as the central problem); **Teilmann-Jørgensen 2026 Danish nationwide cohort — SSLF reoperation 30.7%, aHR 42.7 vs SCP**; OPTIMAL 2018; Menefee 2024 *JAMA Surg* apical-suspension RCT. Database row updated. |
| [Posterior colporrhaphy](docs/04-surgical-techniques/04g-prolapse-repair/posterior-enterocele/posterior-colporrhaphy.mdx) | 20 | **Mowat 2018 Cochrane — transvaginal RR 4.12 better than transanal**; Grimes 2019 SR; **ACOG PB 214 no-levatorplasty rule**; Paraiso 2006 RCT (colporrhaphy 86% vs graft 54%); Abramov 2005 midline-vs-site-specific (86% vs 67%); **Nüssler 2022 Swedish registry n = 32,086** (11% / 15% reoperation at 5 / 10 yr); FIGO 2020; ACG 2021; PC-vs-STARR (Gluck 2023); PC-vs-LVMR (Abdelnaby 2021). |
| [Perineorrhaphy](docs/04-surgical-techniques/04g-prolapse-repair/posterior-enterocele/perineorrhaphy.mdx) | 24 | **Kanter 2015 SGS survey** ("commonly performed yet poorly understood"); **DeLancey perineal-complex-triad 2024 + 3D MRI 2025** (urogenital hiatus 68% larger in POP); Mothes 2023 (29.5% GH reduction sustained); **Sutkin 2020 OPTIMAL secondary analysis — concomitant posterior repair did NOT improve surgical success**; **Handa 2019 — HR 9.0 for GH ≥ 3.5 cm**; **Cervantes 2026 — perineoplasty urinary retention 30.2% vs 19.1%**; Shakhaliev 2024 ongoing RCT (NCT05422209). |

### Editorial conventions reaffirmed

- **"Best for / indication" column rollout pattern** — applied case-by-case via the Notes-column 3-part rule. GenericDatabase: rename `notes` → `bestFor`, header → "Best for / indication". TechniqueDatabase: use built-in `indication` field with `hideNotes`. Don't blanket-roll to fistula / genital recon — Notes there carry technique-specific clinical context, not duplicated decision support.
- **Page merge discipline** — when two stub pages describe overlapping techniques (vaginal-paravaginal-repair + lattice-technique), merge into a single approach-agnostic article with the dominant variant as a dedicated subsection. `git rm` the redundant file, add Vercel redirect, repoint inbound links via `grep -rln "<old-slug>"`, collapse database rows to one.
- **Lattice / cross-stitch placement decision** — Rude 2021 lattice technique is conceptually a hybrid central+lateral repair (combines AC midline plication + paravaginal lateral fixation). Single-surgeon / 109-pt / 12-month evidence base doesn't yet warrant a standalone deep-dive. Best home: dedicated subsection within the paravaginal-repair page, alongside Huang 2022 modified cross-stitch and Kalis 2020 trans-obturator variants.
- **POP atlas deep-dive pattern** (locked) — every prolapse-atlas page has: (1) anatomic / mechanistic framing, (2) indication thresholds (POP-Q stage, GH size), (3) step-by-step technique, (4) variations table, (5) outcomes / functional outcomes / complications, (6) head-to-head vs adjacent procedures, (7) guideline summary, (8) See Also.
- **Honest "evidence does not support" framing** — for procedures where guideline / RCT data are mixed or negative (perineorrhaphy not proven to prevent recurrence, Kelly plication inferior to Burch, paravaginal not noninferior to AC, mesh ordered off market, lattice unproven long-term), frame the page around what the evidence does and does not show. Don't oversell.
- **OPTIMAL secondary analysis (Sutkin 2020)** is the foundational reference for the perineorrhaphy / posterior-repair-on-apical-suspension question — concomitant posterior repair did NOT improve surgical success at the apex.

### Lint state

`npm run lint:links` clean across 867 files at every commit point.

---

## 2026-05-05 — Urinary diversion + female urethroplasty restructure (10 new 04c pages, 9 female 04a builds + free-graft/BMG-Martius/tissue-engineered consolidations + database overhaul)

Two parallel arcs in a single long session: completing the **urinary-diversion per-device atlas** and overhauling the **female urethroplasty atlas + database**. Branch `claude/angry-jackson-f34f11`. **Commit-and-push-after-every-change cadence preserved.**

### Arc 1 — Urinary diversion: complete the per-device atlas

Ten new / rebuilt dedicated atlas pages under [04c-urinary-diversion/](docs/04-surgical-techniques/04c-urinary-diversion):

| Page | Refs | Headline anchors |
|---|---|---|
| [le-bag.mdx](docs/04-surgical-techniques/04c-urinary-diversion/le-bag.mdx) | 11 | Light & Engelmann 1986 ileocolonic neobladder; Vara/Shanberg 1992 urethral-cecal modification; Bejany/Politano 1993 trigone-like ureteral placement; Cleveland Clinic 1996 stapled construction; **Chen 2009 RCT** showing significantly worse nocturnal continence (48.5% vs 76.3%) due to lower compliance; B-Bladder (Baniel 2004) as the most refined modification. |
| [mansoura-neobladder.mdx](docs/04-surgical-techniques/04c-urinary-diversion/mansoura-neobladder.mdx) | 18 | Abol-Enein & Ghoneim 1994 SLET origin; **450-pt landmark series (2001) — 93.3%/80% day/night continence, 96.2% upper-tract preservation, 3% reflux**; **Osman 2009 RCT — SLET 0% vs T-limb 29% reflux (p=0.01)**; Wiesner 2007 long-term Mainz I comparison; pioneering female neobladder series (Ali-el-Dein); SLET versatility across continent cutaneous / catheterizable channel / ileal ureter / pediatric. |
| [kock-pouch.mdx](docs/04-surgical-techniques/04c-urinary-diversion/kock-pouch.mdx) | 33 | Nils Kock 1969 (fecal) / 1975 (urinary) origin; Skinner USC 250 → 531 → 802 patients; Mansoura urethral Kock evolution (Ghoneim 1987 → 1992); Elmajian 295-pt orthotopic; Copenhagen 166-pt long-term (5-yr stones 34%, B12 33%); Carr/Webster 53% revision rate; Arai polyester-collar erosion mechanism; 1998 T-pouch as direct evolutionary successor. |
| [mainz-pouch-i.mdx](docs/04-surgical-techniques/04c-urinary-diversion/mainz-pouch-i.mdx) | 21 | Thüroff/Hohenfellner 1983 detubularized ileocecal reservoir; **Wiesner 800+ pt CCUD experience (largest worldwide; 92.8% continence at 7.6 yr)**; **Wiesner 401-pt appendix-vs-nipple (92% vs 82% continence; 10% vs 20% stones)**; **Wiesner 458-pt ST-vs-SLET ureteral comparison (SLET 3.1% vs ST 13.9% obstruction in dilated ureters)**; Stein 70-pt pediatric / neurogenic 9.3-yr; Pfitzenmaier 9-yr metabolic safety. |
| [mainz-pouch-ii.mdx](docs/04-surgical-techniques/04c-urinary-diversion/mainz-pouch-ii.mdx) | 26 | Fisch/Hohenfellner 1991 detubularized rectosigmoid pouch — voids per rectum via native anal sphincter, no stoma / appliance / CIC; D'Elia 10-yr Mainz; Hadži-Djokić 220-pt largest series; Pahernik 38-pt pediatric / exstrophy 9.3-yr; Bastian QoL; Obek metabolic-mortality cohort; Kälble 2011 2.58% secondary-malignancy signal. Mandatory anal-sphincter competence + lifelong colonoscopic surveillance. |
| [florida-pouch.mdx](docs/04-surgical-techniques/04c-urinary-diversion/florida-pouch.mdx) | 13 | Lockhart/Pow-Sang/Persky USF 1986 detubularized right-colon reservoir with doubly plicated distal ileum + **direct nontunneled mucosa-to-mucosa ureteral reimplantation** (4.9% obstruction vs 13.3% tunneled; 7% reflux clinically insignificant); 179-pt cohort 93.3–97.2% continence; lowest reoperation rate (6–6.5%) of any major continent cutaneous diversion; Florida Pouch II conversion variant 58% metabolic complications. |
| [penn-pouch.mdx](docs/04-surgical-techniques/04c-urinary-diversion/penn-pouch.mdx) | 6 | University of Pennsylvania mid-1980s ileocecal reservoir using the intussuscepted ileocecal valve (stapled, historically reinforced with Marlex collar). Largely historical — supplanted by detubularized alternatives due to dessusception, foreign-body, and cecal-hyperactivity concerns. **Database row corrected** — prior notes incorrectly described it as appendix-based. |
| [double-t-pouch.mdx](docs/04-surgical-techniques/04c-urinary-diversion/double-t-pouch.mdx) | 13 | Stein/Skinner USC 2001 cutaneous adaptation of orthotopic T Pouch — applies SLET flap valve at both ends. Bochner pig-model validation (tunnel ≥2:1 ratio); Marino 2002 100%-continence 18-pt cutaneous series; Hemi-T (Kurzrock 2003) and PGIMER Yang-Monti modifications; **landmark USC-STAR RCT (n=484) showed orthotopic T-mechanism did NOT prevent renal-function decline vs Studer at 3 yr (p=0.35) and was associated with more secondary surgeries — fundamentally challenging the antireflux rationale**. |
| [colon-shuffle.mdx](docs/04-surgical-techniques/04c-urinary-diversion/colon-shuffle.mdx) | 12 | **Renamed from "Colostomy Shuffle"** per user instruction (prior name was a misnomer). Meijer/NKI-AVL 2015 modified incontinent colon-conduit diversion; 21-pt NKI-AVL series (90% prior radiation; 0% anastomotic leak / fecal peritonitis); Hebert 2026 multi-institutional 179-pt CCUD; Cotter 2017 NBA-vs-anastomosis comparison; Hagemans 2020 colon-vs-ileal exenteration data; Davis-Noble 1992 predecessor; Carter double-barreled-wet-colostomy comparison. Vercel redirect from old slug. |

**Database cleanup** in [04c-urinary-diversion/index.mdx](docs/04-surgical-techniques/04c-urinary-diversion/index.mdx):

- Dropped **Right Colon Pouch** (generic — subsumed by Indiana / Florida / Mainz I) and **Penn Pouch** (historical, sparse data) rows; pages remain reachable via cross-links.
- Dropped **Notes column entirely** — every row now has a per-device page, so notes had become redundant and drift-prone. Database is now a clean tap-target index with Diversion + Family columns only — matches the BPH and male-cosmetic Notes-column-drop pattern.

### Arc 2 — Female urethroplasty: per-device buildouts

Nine female urethral-reconstruction pages converted from stub to deep-dive:

| Page | Refs | Headline anchors |
|---|---|---|
| [dorsal-vaginal-flap.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/dorsal-vaginal-flap.mdx) | 10 | Tsivian-Sidi origin; Petrou 2012 (n=11; Qmax 7.3→21.8 mL/s; no SUI); Mittal meatal-sparing modification; Simonato/Romero-Maroto pedicled-flap variants; Katiyar 2021 prospective dorsal-vs-ventral RCT (91% comparable success); Higuchi 2026 head-to-head with DOBMGU (87.5% vs 57.1%). |
| [labia-minora-flap.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/labia-minora-flap.mdx) | 8 | Xu 2009 transpubic tubularized series (n=8); Xu 2013 multi-technique cohort (93.2% anatomical / 90.9% functional success across 44 pts); Radwan 2013 labia-minora-tube + TOT; Osman SR pooled 91% flap vs 80% graft vs 47% dilation; Jiang 2017 pediatric pelvic-fracture UVF; Bouchard 2025; Jena 2025 free-graft (n=204) contrast. |
| [bladder-wall-flap-urethroplasty.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/bladder-wall-flap-urethroplasty.mdx) | 9 | Covers all six named variants — Tanagho anterior bladder tube, Nayyar U-shaped (n=3, 100% continence), Pippi Salle anterior bladder-flap urethral lengthening, Mitsui flipped tube, Elkins anterior-bladder-wall advancement (obstetric VVF), Patidar 22-pt anterior+posterior series (82% socially dry / 68% complete continence). Salvage / last-resort framing. |
| [circular-bmg-female.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/circular-bmg-female.mdx) | 13 | Önol 2011 (n=2 — only published series); Aybek-Zumrutbas combined modification (Gülpınar 2021 100% in 14 pts); Jefferson 2025 combined dorsal+ventral inlay; AUA 2023 + Li 2026 / Ortac 2025 metas showing 92–95% single-surface alternatives. Honest framing as rarely-used salvage. |
| [vaginal-flap-bmg-combined.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/vaginal-flap-bmg-combined.mdx) | 11 | Reframed from stub as a **reconstructive principle** covering five distinct configurations: BMG with periurethral-fascia-flap reinforcement (Berdondini 2024 ventral onlay 98%); Martius-reinforced ventral BMG (Önol 2011); sequential VFU → BMG salvage (Blaivas 2012); segmental flap + graft for pan-urethral disease; combined dorsal BMG + ventral vaginal flap (Jefferson 2025). Kumar 2025 BMG-vs-vaginal-graft equivalence meta + Higuchi 2026 head-to-head. |
| [staged-bmg-female.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/staged-bmg-female.mdx) | 16 | Frames the technique honestly as a conceptual extrapolation from male principles (no female-specific series in print). Anchored on Palminteri 2002, Kozinn 2013 (n=91 multistage; 18.7% stage-1 revision; 90% overall), Patel 2016 LS-recurrence-in-graft caveat, Warner 2015 showing single-stage BMG outperforms staged Johanson — plus female alternatives that typically obviate staging. |
| [primary-end-to-end-female.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/primary-end-to-end-female.mdx) | 16 | **Patel 2017 BJU Int SR (n=158 female PFUI across 51 articles)** — primary anastomotic repair via vaginal approach as soon as hemodynamically stable is optimal, with significantly lower incontinence and vaginal stenosis vs delayed repair. Dorairajan pediatric same-day; Black 2006 long-term LUTS; Xu 2013 EPA cohort; male template (Morey SIU/ICUD 93.8%, Koraitim posterior, Nilsen Scandinavian RCT); ACS 2025 Best Practices. |
| [vaginal-wall-tubularization.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/vaginal-wall-tubularization.mdx) | 12 | Blaivas trilogy (1989 n=10 → 1996 n=49 → **Flisser/Blaivas 2003 n=74 — largest female urethral-reconstruction experience in print: 93% anatomical / 87% continence**). Hallmark three-layer construct (neourethra → Martius flap → fascial pubovaginal sling). Orandi-type lateral-pedicle variants (Simonato, Romero-Maroto), Hajebrahimi U-shaped hybrid, Blaivas 2012 long-term recurrence signal. |
| [urethral-prolapse-repair.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/urethral-prolapse-repair.mdx) | 12 | **New treatment-atlas page** distinct from the [clinical-conditions article](docs/03-clinical-conditions/03b-voiding-outlet/urethral-prolapse.mdx) — focuses on indications for surgery, conservative management, pediatric reduction under GA (Holbrook), four-quadrant excisional technique (Shurtleff / Pfeuti), historical / abandoned techniques, outcomes, complications, treatment algorithm. |

### Arc 3 — Female urethroplasty consolidations

- **Free graft pages merged by placement, not donor source** — eight rows → five. The dorsal-onlay article is now donor-source-agnostic, explicitly covering BMG (default), labial mucosa (Jena 2025 n=204; 93.5%), lingual mucosa (Simonato 2006, Goel 2014 lingual-vs-labial equivalence), and vaginal free graft (Borchert 2022; ~80%) within a single Graft Materials section. Deleted (with redirects to female-dorsal-onlay-urethroplasty): `dorsal-onlay-labial-mucosa.mdx`, `lingual-mucosal-graft-female.mdx`, `vaginal-free-graft.mdx`.
- **BMG + Martius merged into ventral onlay** — Martius-reinforced ventral BMG was a configuration of the ventral-onlay technique, not a distinct procedure. Folded into the ventral-onlay article as a "Martius-Reinforced Variant" subsection (Önol 2011 sling-erosion data + Malde diverticulectomy analog). Standalone `bmg-martius-combined.mdx` deleted with redirect.
- **Bladder-flap-tubularized merged into bladder-wall-flap** — duplicate row in F6 Urethral Loss eliminated; bladder-wall-flap page now covers all variants. `bladder-flap-tubularized.mdx` deleted with redirect.
- **Tissue-engineered consolidated to foundations** — both the male `tissue-engineered-oral-mucosa.mdx` and female `tissue-engineered-female.mdx` atlas pages deleted with redirects to a new canonical foundations article: [Tissue-Engineered Grafts & Bioscaffolds](docs/01-foundations/surgical-principles/grafts/tissue-engineered.mdx) (27 refs covering acellular bioscaffolds, cell-seeded scaffolds, TEOMG / MukoCell, and next-generation tech). Female "Emerging / Investigational" category dropped entirely from CATEGORY_ORDER.
- **Mandal/Nikolavsky ventral-inlay clarification** — the [female-ventral-inlay-bmg](docs/04-surgical-techniques/04a-urethral-reconstruction/female/female-ventral-inlay-bmg.mdx) article was restructured to clarify that Mandal/Gaur/Kumaraswamy "VIBMGU" and Sterling/Nikolavsky "transurethral ventral inlay BMG" are the same technique developed independently by two groups (operative steps identical; differences confined to catheter duration and emphasized indication).

### Arc 4 — Female urethroplasty database overhaul

- **F1–F8 prefix dropped** on female categories ("Endoscopic / Minimally Invasive", "Flap Urethroplasty", etc.); **1–8 prefix dropped on male categories for symmetry**. CATEGORY_ORDER in TechniqueDatabase.tsx remains the authoritative ordering source.
- **Eponym + Notes columns dropped** from the female database; replaced with a single concise **"Best For" indication column** capturing the decision-relevant clinical hook in a one-phrase tag (e.g., "Mid-urethral stricture, healthy vagina"; "Acute female PFUI"; "Total urethral loss"; "Salvage for obliterative disease (rarely needed)"). Male database is unchanged (still renders Technique / Eponym / Location / Notes).
- **TechniqueDatabase component enhanced** — added `indication?: string` field; added `hideEponym?: boolean` and `hideNotes?: boolean` props; render the "Best For" column when any row has indication; colSpan in category-header rows now computed from active columns; search includes indication.
- **Sidebar_position values renumbered 1–18** so page-level ordering mirrors the database row order (DVIU → distal urethrectomy → flaps → free grafts → combined → urethral loss → other). Previously some pages sat at 50–53 with duplicates at 12 — leftover placeholder values from when pages were originally built.
- **Decision Framework links** repointed to the new merged pages (combined ventral-onlay-with-Martius variant; combined-vaginal-flap+BMG for failed prior urethroplasty).

### Editorial conventions reaffirmed this session

- **Per-device pattern locked for urinary diversion** — every row in the diversion database now has a dedicated atlas page (`landing-IS-the-database` pattern). Notes-column-drop 3-part rule (every row has a per-device page; other columns triage; notes redundant with per-device page) applied successfully.
- **Per-device pattern locked for female urethroplasty** — every row in the female database has a dedicated atlas page. Eponym/notes drop pattern inverted: instead of dropping notes entirely (the BPH / male-cosmetic / urinary-diversion approach), added an Indication column that's smaller, more decision-relevant, and easier to keep in sync.
- **Free-graft organization by placement, not donor source** — when multiple donor sources (BMG, labial, lingual, vaginal) share the same operative technique (placement), they belong in one canonical page with donor-source as a Graft Materials subsection — not as separate per-donor pages.
- **Atlas-page-vs-clinical-conditions-page split for treatment-focused articles** — when a clinical-conditions page already covers the disease comprehensively, the atlas page should focus narrowly on **treatment** (indications, technique, outcomes, complications) and explicitly cross-link to the clinical page for pathophysiology / presentation / diagnosis. New urethral-prolapse-repair atlas page is the locked example.
- **Landing-page rename rule** — when a procedure is renamed (Colostomy Shuffle → Colon Shuffle), `git mv` the file, update slug to canonical form, add Vercel redirect, and `grep -rln "<old-slug>"` to verify no remaining references.
- **TechniqueDatabase component flexibility** — the `hideEponym` / `hideNotes` props allow each tab (male / female) to choose its own column structure without affecting the other. Future: a similar `hideLocation` extension or a fully configurable columns array if the tabbed pattern expands.

### Build / lint state

`npm run lint:links` clean across 866 files; `npm run typecheck` clean; production build (`npx docusaurus build --locale en`) clean. Live dev preview verified — female db renders 2 cols × 19 rows (Technique + Best For); male db unchanged at 4 cols.

---

## 2026-05-05 — ED + Peyronie's atlas / pharmacology buildout (5 new 04j pages + Peyronie's pharmacology hub from 25 → 76 refs + database compression)

**Five new canonical 04j pages:**

- [psychosexual-therapy.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/psychosexual-therapy.mdx) (17 refs) — cross-cutting canonical for sensate focus / CBT / MBI / PLISSIT / sex education / couples therapy. Cochrane 2007 + Frühauf 2013 meta + Qiangzhao 2026 NMA. Linked from ED database, Peyronie's, women's-health sexual-dysfunction, SPS / PDD.
- [penile-arterial-revascularization.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/penile-arterial-revascularization.mdx) (23 refs) — Michal 1973 origin + Dabaja 2014 + Manning 1998 + Cookson 1993 + Kawanishi 2004 + Kayıgil 2012 + Zuckerman 2012 PFUI cohort + Schönhofen 2021 / Mohan 2025 endovascular. **IEA → dorsal penile artery (Michal II)** is the contemporary standard donor; saphenous vein is NOT (corrected the prior database row).
- [stem-cell-therapy-ed.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/stem-cell-therapy-ed.mdx) (19 refs) — AUA 2018 investigational; Hinojosa-Gonzalez 2024 NMA; Phase-I evidence (Haahr 2018 / Bieri 2020 / Ji 2025).
- [venous-ligation.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/venous-ligation.mdx) (17 refs) — AUA 2018 NOT recommended; modern direction is embolization-first or combined (Allaire 2021/2025; Hoppe 2026 multicenter registry).

**Peyronie's pharmacology hub** [peyronies-disease-agents.mdx](docs/01-foundations/pharmacology/sexual-medicine-andrology/peyronies-disease-agents.mdx) grew from ~ 25 refs to **76 refs**:

- Pentoxifylline section (refs 26–32) — Smith 2011 calcified-plaque 91.9% as strongest niche signal.
- CoQ10 section (refs 33–40) — Safarinejad 2010 RCT with explicit data-integrity admonition.
- Vitamin E section (refs 41–48) — AUA Statement #6 Grade B; Miller 2005 high-dose mortality signal.
- Tamoxifen section (refs 49–60) — AUA Statement #6 Grade C; Ilg 2019 PDE5i synergy preclinical only; ~ 20% AE-discontinuation rate in men.
- Potaba section (refs 61–68) — Weidner 2005 RCT; strongest signal is curvature-progression PREVENTION.
- Xiaflex / CCH expansion (refs 69–76) — Lipshultz 2015 subgroup; Masterson 2020 + Cocci 2018 + Cahill & Trost 2025 predictors; Goldstein 2020 calcification subgroup; Yafi 2018 head-to-head vs surgery; Wymer 2019 cost-effectiveness; Sukumar 2020 NY State practice-impact.

**Database compression — atlas-wide pattern now LOCKED across 4 atlases (male-cosmetic, female-cosmetic, ED, Peyronie's):**

- ED database: 4 prosthesis rows collapsed into one "Penile Implant"; ICI rows merged; PDE5 / MUSE / TRT repointed to pharmacology hubs; Notes column dropped; bare-name rule applied. 13 rows total.
- Peyronie's database: Notes column dropped; bare-name rule applied. 28 rows total. Vitamin E / Tamoxifen / Potaba / investigational-IL rows repointed to canonical pharmacology hub.

Three-column atlas format (Treatment + Tier badge + Invasiveness) is now the locked structure when every row has a canonical destination.

**Lint state:** `npm run lint:links` clean across 851 files; `npm run lint:citations` clean.

---

## 2026-05-04 — Female cosmetic per-device buildout (10 new pages) + canonical-laser augmentation + atlas cleanup

**Ten new dedicated pages under [`04l-cosmetic-genital-surgery/`](docs/04-surgical-techniques/04l-cosmetic-genital-surgery):**

- **Labiaplasty** — [trim](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/trim-labiaplasty.mdx) (12 refs; Zahedi 2023 algorithm + Minikowski 2025 RCT), [wedge](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/wedge-labiaplasty.mdx) (18 refs; Alter 1998/2008 PRS hockey-stick n=407 + Sinnott 2020 dehiscence risk factors + Köle 2024 n=2,594), [de-epithelialization](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/de-epithelialization-labiaplasty.mdx) (9 refs; Choi-Kim 2000 founding + Géczi 2024 highest-satisfaction 97%), [laser-assisted](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/laser-assisted-labiaplasty.mdx) (18 refs; framed as surgical tool not technique; FDA 2018 distinction admonition).
- **Hybrid labiaplasty** — [combined wedge-edge resection (modified trim+wedge)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/combined-wedge-edge-labiaplasty.mdx) (10 refs; Cao 2015 hybrid n=49). Replaces the prior mis-cited "Modified Wedge with Trim Component" row.
- **Clitoral hoodoplasty** — [inverted-Y plasty](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/inverted-y-clitoral-hoodoplasty.mdx) (8 refs; Eserdağ 2021 n=63), [Liu-classification (bilateral triangular + inverted horizontal V)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/liu-classification-hoodoplasty.mdx) (9 refs; Liu 2022 n=789 — largest hoodoplasty cohort published, no paresthesia), [three-step / two-part composite](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/three-step-two-part-composite.mdx) (10 refs; Xia 2021 + Duan 2026).
- **Labia majora** — [augmentation (autologous fat grafting)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/labia-majora-augmentation.mdx) (14 refs; Jabbour 2017 SR + Menkes 2021 microfat+nanofat for GSM + Lai 2023 MAFT histology + Patel 2021 post-PIV), [reduction / majoraplasty](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/labia-majora-reduction.mdx) (11 refs; Saheb-Al-Zamani 2022 + Alter post-bariatric + Siliprandi 2026 vulvar-aging classification).
- **Mons pubis** — [monsplasty (reduction / lift)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/monsplasty.mdx) (15 refs; Hamdi 2023 JPRAS + El-Khatib 2011 ptosis grading + Bykowski 2017 UDI-6 data), [fat grafting to mons](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/fat-grafting-mons.mdx) (16 refs; Seleem 2023 normative volumes + Lai 2023 MAFT + Dong 2024 ADSC-assisted NMA SUCRA 82%).

**Canonical Vaginal Laser Therapy page augmented:**

- [vaginal-laser-therapy.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/vaginal-laser-therapy.mdx) refs 35 → 46. Added Er:YAG-specific data anchored on **Gambacciani 2020 113,000-patient safety dataset** (largest single dataset for any vaginal laser; no serious AEs); **Gaspar 2020** epithelial 45 → 153 µm histology; **Bayraktar 2024** sham-controlled shear-wave-elastography pilot; the **Phillips 2025 BJOG / O'Reilly 2024 IJGO / Lee 2025 AJOG** Er:YAG-SUI RCT trio (two positive, the largest negative); **Sathaworawong 2022** Er:YAG vaginal-laxity sham RCT; Avul 2023, Lin 2022, Vizintin 2015, Menkes 2026 (Er:YAG + plant-derived exosomes pilot). Explicit framing of the registry-vs-MAUDE discrepancy.

**Cosmetic atlas database cleanup:**

- **Vaginal Canal domain removed.** ACOG 2020: "rebranding" colporrhaphy / perineoplasty as cosmetic is misleading. Surgical Vaginoplasty / Vaginal Tightening + Perineoplasty rows deleted; these reconstructive procedures live in 04g Prolapse Repair, not cosmetic atlas. Decision Framework vaginal-laxity rows + Vaginal Laxity sub-comparison + Combined Procedures bullet all removed.
- **Energy-Based Devices collapsed to single pointer row.** Three rows (fractional CO₂, Er:YAG, RF) merged into one **Vaginal Laser Therapy (Fractional CO₂ / Er:YAG / RF)** row pointing at the canonical 04f page rather than duplicating cross-indication content.

**Editorial conventions locked / reaffirmed:**

- Female-cosmetic per-device pattern mirrors male-cosmetic (`sidebar_class_name: sidebar-hidden-item`; `:::warning[Society positioning]` with ACOG 795 + FIGO 2025 + ACOG 686).
- Tool-vs-technique distinction: laser-assisted = tool applied within other techniques; comparison logic targets other tools (scalpel / RF / electrocautery).
- FDA 2018 disambiguation as locked admonition pattern for any energy-based-device page.
- Centralize energy-based-device cross-indication content at the canonical [Vaginal Laser Therapy](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/vaginal-laser-therapy.mdx) page; cosmetic atlas holds a single pointer row.
- Reconstructive procedures (vaginoplasty = colporrhaphy, perineoplasty) stay out of the cosmetic atlas — apply this rule when auditing other cosmetic atlases.
- Database-row notes for cosmetic-female pages remain expanded; the male-cosmetic Notes-column-drop rule does not yet apply because not every row has a per-device page.

**Lint state:** `npm run lint:links` clean across 844 files; `npm run lint:citations` clean for all new and edited pages.

**Late-session additions (same day):**

- New page [hymenoplasty.mdx](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/hymenoplasty.mdx) (11 refs). Lahlali 2021 Moroccan n=529 + Eserdağ 2021 + Wei 2015 + Dogan 2024 temporary-vs-permanent comparative. Explicit legal-context call-out (UK ban) + ACOG 795/780 + Bawany 2017 Islamic ethico-legal perspectives. Distinguished from FGM/C.
- **Female-cosmetic database compression (LOCKED).** Notes column dropped entirely; "Genital Beautification Combined Packages" row deleted; row names trimmed to bare procedure names. Database is now 2 columns (Procedure + Domain), mirroring the May-4 male-cosmetic compression. The pattern is now applied consistently across both cosmetic atlases.
- New page [g-spot-amplification.mdx](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/g-spot-amplification.mdx) (11 refs). Puppo & Gruenwald 2012 anatomic-existence-debate as the central caveat; ACOG 2020 + FIGO 2025 not-medically-indicated; Clarke 2026 anterior-vaginal-wall PRP-vs-saline RCT (closest proxy — 69.2% vs 34.6% at 6 mo); adjacent vaginal-augmentation literature (Yi 2026 / Lai 2023 MAFT / Menkes 2021 / Bensmail 2025 / CIVIT Leylek 2025). Cosmetic-vs-therapeutic counseling distinction. Database row repointed from null slug to canonical page.
- New page [microfat-nanofat-grafting.mdx](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/microfat-nanofat-grafting.mdx) (24 refs). Therapeutic regenerative-medicine page covering GSM / VVA / refractory VLS. Tonnard 2013 founding nanofat description + Menkes 2021 (microfat labia + nanofat vagina; stable 18 mo) + Casarotti & Tremolada 2020 MFAT (no relapse at 36 mo) + Lai 2023 MAFT histologic anchor + Gutierrez-Ontalvilla 2022/2025 VLS RCT data + Wang 2020 fat-embolism case (dominant safety concern). Explicit therapeutic-vs-cosmetic distinction. With this addition every female-cosmetic database row now has a per-device page.

---

## 2026-04-22 — Lint harness + Surgical Skills collapse + IC/BPS build-out

**Platform / tooling:**

- **Lint harness** — new `scripts/` directory with three checks:
  - `check-scope.js` — flags out-of-scope titles/H1s against a forbidden-terms list (PCNL, cancer cystectomy/nephrectomy, etc.). Body mentions as reconstructive context remain fine.
  - `check-citations.js` — verifies every `<sup>[[N]](#refN)</sup>` has a matching anchor, detects numbering gaps, handles footnote `[^N]` style.
  - `check-orphans.js` — hidden-category pages without inbound links (exempts surgeon profiles + incontinence procedures rendered by React components from `src/data`).
- **Stub tracker** — `scripts/gen-status.js` → `docs/_STATUS.md`. 107 stubs cataloged with priority + notes, preserved across regenerations.
- **Citation auto-fix** — `scripts/fix-citations.js`: renumbers cited+anchored refs to contiguous 1..K, removes orphan anchor entries, detects unfixable orphan citations and skips those files.
- **Applied citation cleanup** to 88 articles — renumbered refs, removed orphan anchors. No body text altered; only citation numbers and reference-list entries.
- **`npm run lint`** now composes all three checks. `npm run status` regenerates the stub tracker.
- **CLAUDE.md prune** — 926 → 631 lines. Session history moved to `CHANGELOG.md`. Added "Rules for agents — read before writing" block at top (scope, voice, citations, lint checklist, common MDX/Docusaurus pitfalls).
- **`.gitignore`** — exclude `.claude/worktrees/` so Claude-spawned ephemeral worktrees don't pollute git status.

**Surgical Skills — collapse to GURS/URPS-signature techniques:**

- Deleted `knot-tying/`, `ligatures/`, and the generic stitches in `suturing/` (simple-interrupted, running-continuous, running-locking, figure-of-eight, horizontal-mattress, vertical-mattress, purse-string, subcuticular). Generic skills live in surgery textbooks.
- Kept (flattened to `surgical-skills/` root): bowel stitches (connell, cushing, lembert, halsted, parker-kerr) and signature techniques (heaney, quilting, ski-needle, van-velthoven-vua, barbed-sutures).
- Landing rewritten as a single **table of 10 techniques** grouped by signature use.
- **Learning Resources** section added — UCSF Surgical Skills Center, UCSF ATOSS, BBASS, and 4 curated video playlists (Behind The Knife Boot Camp, The Clean Scalpel, Basic Surgical Skills, WARWIKI Surgical Technique).
- Cross-links updated in 4 external pages (tools/instruments/..., tools/biomaterials/..., tools/intraoperative-adjuncts/...) and all 10 moved files.

**Quilting Stitch — comprehensive rewrite:**

- Expanded from 35-line stub to full 350-line article. Graft-survival phases, suture quilting techniques (Barbagli dorsal onlay, Asopa dorsal inlay, ventral onlay + spongio-/pseudospongioplasty, Palminteri double graft, transurethral fossa navicularis, VUAS periosteal quilting), fibrin glue fixation, barbed sutures, staged urethroplasty, skin graft fixation (tie-over, TODGA, NPWT, eggcrate foam). 40 DOI-linked references.
- Preserved flap-quilting content (scrotal, Fournier's, perineal, phalloplasty).

**IC/BPS — comprehensive article + deduplication:**

- Canonical article at `docs/03-clinical-conditions/03h-pelvic-pain/ic-pbs.mdx` — AUA 2022 framework, Hunner vs non-Hunner phenotyping, 7-mechanism pathophysiology, cystoscopy indications, validated instruments, behavioral/dietary/PFPT, oral meds with PPS maculopathy safety alert + FDA screening, intravesical agents with DMSO meta-analysis, procedures (hydrodistension, Hunner fulguration, Botox, SNM), major surgery, emerging therapies, modality-based algorithm. 28 DOI-linked refs.
- Deleted duplicate stub at `03d-bladder-disorders/painful-bladder-syndrome-ic.mdx`.
- Fixed the one inbound link in `uti-treatment-antibiotics.mdx`.

**Oral IC/BPS Agents — drug-class companion built out:**

- `docs/01-foundations/tools/pharmacology/bladder-pain-ic-bps/oral-ic-bps-agents.mdx` — amitriptyline, PPS, hydroxyzine, cimetidine, cyclosporine A. Mechanism table, phenotype-directed indications (Hunner → cyclosporine; pain/sleep → amitriptyline; atopic → hydroxyzine), dosing table, per-agent contraindications + monitoring (PPS maculopathy + FDA screening; cyclosporine team-monitoring; cimetidine CYP450), perioperative hold/continue table, evidence summary citing Sant 2003 ICCTG, Foster 2010, Sairanen 2005 (75% vs 19% responder rate), Thilagarajah 2001, Di 2021 Bayesian network MA, Imamura 2020 Cochrane. 11 refs.

**Evaluation — History & Physical bundle:**

- Collapsed flat `assessment-tools.mdx` and `physical-exam/` subdirectory into new `history-physical/` subsection. New landing + 3 children (assessment-tools, male-urogenital-exam, female-pelvic-examination).
- URL changes: `/docs/evaluation/assessment-tools` → `/docs/evaluation/history-physical/assessment-tools`; `/docs/evaluation/physical-exam/*` → `/docs/evaluation/history-physical/*`.

**Surgical Ergonomics — new article:**

- Added at `docs/01-foundations/surgical-principles/surgical-ergonomics.mdx`. WMSD overview + urology-specific section (endoscopic, laparoscopic, robotic, open, microsurgical). 19 DOI-linked refs.

**Citation cleanup, site-wide:**

- 88 articles had real citation-integrity issues (orphan anchors, numbering gaps). Auto-fix renumbered and removed orphans — every cited ref now has an anchor, every anchor is cited at least once.

---

## 2026-04-21 (continued) — Treatment Atlas restructure + platform fixes

**GenericDatabase dropdown fix:**
- `filterLabel="Category"` was rendering as "All Categorys". Fixed by: (1) smart pluralization in `GenericDatabase.tsx` (skip appending `s` if label already ends in `s`), (2) updating all database pages to pass `filterLabel="Categories"`. Affects instruments, biomaterials, pharmacology, incontinence, ED, male stress incontinence databases.

**Treatment Atlas — Incontinence section rebuilt:**
- `04h-prosthetics/` deleted entirely (5 files).
- `04f-incontinence-procedures/` renamed → sidebar label "Incontinence"; new `index.mdx` section landing with 3 subcategory cards.
- Three subcategories created, each with a `GenericDatabase`-powered searchable database:
  - `female-sui/female-stress-incontinence-database.mdx` — 10 treatments (PFPT, pessary, duloxetine, bulking agents, retropubic MUS, TOT, mini-sling, autologous fascial sling, Burch, AUS)
  - `male-sui/male-stress-incontinence-database.mdx` — 5 treatments
  - `oab-uui/oab-uui-database.mdx` — 10 treatments (behavioral, PFPT, anticholinergics, β3, combination, Botox, SNM, PTNS, eCoin/Revi, bladder augmentation)
- All 9 individual procedure pages moved into `procedures/` hidden subfolder (same pattern as `flaps/`, `grafts/`).
- Shared master PFPT page — `pelvic-floor-pt-male.mdx` replaced with `pelvic-floor-pt.mdx` covering male SUI, female SUI, and OAB/UUI.
- Invasiveness column dropped from all three databases for mobile optimization.

**URL changes:**
- `/docs/surgical-techniques/04h-prosthetics` → DELETED
- `/docs/surgical-techniques/04f-incontinence-procedures/[page]` → `/docs/surgical-techniques/04f-incontinence-procedures/procedures/[page]`
- `/docs/surgical-techniques/04f-incontinence-procedures/pelvic-floor-pt-male` → `/docs/surgical-techniques/04f-incontinence-procedures/procedures/pelvic-floor-pt`
- `/docs/surgical-techniques/04f-incontinence-procedures/male-stress-incontinence-database` → `/docs/surgical-techniques/04f-incontinence-procedures/male-sui/male-stress-incontinence-database`

**TTS visibility fix:**
- Replaced hardcoded 8-path `LANDING_PATHS` set with `useDoc().frontMatter.hide_title` check. Any page with `hide_title: true` suppresses ArticleListener. All section landings and sub-section index pages already use this convention — no per-page maintenance needed.

**History & Physical bundle (Evaluation):**
- Collapsed flat `assessment-tools.mdx` and `physical-exam/` into new `history-physical/` subsection.
- URL changes: `/docs/evaluation/assessment-tools` → `/docs/evaluation/history-physical/assessment-tools`; `/docs/evaluation/physical-exam/*` → `/docs/evaluation/history-physical/*`.

**Lint harness + stub tracker:**
- `scripts/check-scope.js` — flags out-of-scope titles/H1s against forbidden terms list.
- `scripts/check-citations.js` — verifies `<sup>[[N]](#refN)</sup>` anchors, numbering gaps, footnote-style consistency.
- `scripts/check-orphans.js` — hidden-category pages with no inbound links (exempts surgeon profiles + incontinence procedures which are linked dynamically from React components).
- `scripts/gen-status.js` → `docs/_STATUS.md` — stub tracker with priority + notes, preserved across regenerations.
- Wired to `npm run lint`, `npm run lint:scope`, `npm run lint:citations`, `npm run lint:orphans`, `npm run status`.

---

## 2026-04-20 to 2026-04-21 — Content expansion + Tools restructure

The largest multi-day expansion session to date. Themes: penile-implant / Peyronie's deep-dive, intraoperative-adjuncts library, pharmacology database, antibiotics, energy devices, Tools restructure.

**Penile Implants** — built out from overview to 8 articles (~60 refs total):
- `penile-implants/index.mdx` (overview with section-stack to 7 deep-dives)
- `infection.mdx` (29 refs; IPP infection evolution + 2026 Irrisept pivot)
- `preoperative-evaluation.mdx` (11 refs; CURSED framework)
- `intraoperative-setup.mdx` (12 refs; Eid no-touch protocol)
- `surgical-approaches.mdx` (6 refs; PS/IP/SC/TS)
- `reservoir-placement.mdx` (6 refs; SoR vs HSM ectopic vs 2-piece)
- `implant-models.mdx` (9 refs; AMS/Titan/Rigicon/Ambicor/Tactra/ZSI)
- `revision-scenarios.mdx` (9 refs; fibrosis, crossover, SST, salvage)
- `complications.mdx` (7 refs; erosion, glans ischemia, aneurysm)

**Peyronie's Disease** — converted to subsection with 5 surgical deep-dives (~50 refs total):
- `peyronies-disease/index.mdx` (overview + section-stack)
- `tunica-plication.mdx` (15 refs; Nesbit/16-dot/8-dot/Yachia/TAP/Dugi-Morey/Kiel Knots/Essed-Schröder/MPP)
- `plaque-incision-grafting.mdx` (10 refs; Hatzichristodoulou sealing; BMG meta)
- `prosthesis-with-straightening.mdx` (12 refs; adjunctive ladder Hammad 2025; PICS technique)
- `manual-modeling.mdx` (8 refs; Wilson 1994; Lucas optimal; Moncada home modeling)
- `scratch-technique.mdx` (8 refs; Antonini + vacuum; Shaeer punch)

**Trauma & Emergencies additions:**
- `priapism.mdx` (18 refs) — all 3 subtypes, TWIST, AUA/SMSNA 2021 algorithm, tunneling + PSD, early prosthesis for >36h
- `testicular-torsion.mdx` (20 refs) — TWIST score (AUC 0.924), salvage rates, 5 fixation techniques, TVF salvage

**Evaluation:** NEW `assessment-tools.mdx` (22 refs) — validated-instruments reference: SHIM/IIEF, full POP-Q, pad tests (1-hr/24-hr/7-day), MSIGS, bladder diaries, IPSS, PFDI-20/PFIQ-7, PISQ-IR, USS-PROM, Urethral Stricture Score, NIH-CPSI, ICIQ family, EQ-5D. *(Later moved to `history-physical/` subsection.)*

**Surgical skills expansion:**
- `knot-tying/self-locking-knots.mdx` — biomechanics terminology, Aberdeen (Ultimate), Forwarder, Middler/loop-lock, Loop Knot, Nice Knot (+ Modified), Cow Hitch (stiffest UHMWPE)
- `knot-tying/laparoscopic-knot.mdx` — deleted; repoint links to self-locking-knots
- `suturing/parker-kerr-stitch.mdx` — NEW
- `suturing/barbed-sutures.mdx` — NEW (26 refs)

**Flaps expansion — 5 new pages + geometric plasty framework:**
- `flaps/y-v-plasty.mdx` — BNC workhorse; 90-100% success refractory BNC; ICG/Firefly
- `flaps/medial-thigh.mdx` — Fournier's regional flap; 1.6% flap loss
- `flaps/labia-majora-fasciocutaneous.mdx` — distinct from Martius; Gupta 2022
- `flaps/pmtp-propeller.mdx` — posteromedial thigh perforator
- `flaps/singapore-pudendal-thigh.mdx` — bilateral for neovagina
- Main `flaps-gu-reconstruction.mdx` trimmed to pure index (detail on dedicated pages)
- Penile-preputial flap fully built (McAninch-Morey 13% vs 58% recurrence)

**Intraoperative Adjuncts** — NEW tools subsection (22 files, 2,032 lines) — visualization agents (ICG, methylene blue, indigo carmine, sodium fluorescein, pudexacianinium ASP-5354), hemostatic agents (Surgicel, Arista, Gelfoam/Surgiflo, FloSeal, thrombin), tissue sealants (Tisseel/Evicel/Artiss, TachoSil, cyanoacrylates, PEG sealants).

**Pharmacology** — converted to 13-category searchable database:
- Storage & OAB (anticholinergics, β3-agonists, desmopressin — fully built)
- Voiding outlet (α-blockers, 5-ARIs fully built + 4 stubs)
- Bladder pain IC/BPS, neuropathic pelvic pain, neuromodulation adjuncts
- Infection prophylaxis (UTI treatment + periop antibiotic fully built, 28 refs; 4 stubs)
- Sexual medicine andrology, hormonal therapies, dermatologic topical urethral
- Intraoperative adjuncts, perioperative ERAS, urinary-diversion-specific
- Legacy/low-evidence

**Tools restructure (2026-04-21) — Technology as new subsection:**
- `tools/technology/` container for robotics + energy devices
- Moved: `tools/robotics/` → `tools/technology/robotics/`, `tools/energy-devices.mdx` → `tools/technology/energy-devices.mdx`
- New `tools/index.mdx` section-stack landing
- New `tools/technology/index.mdx` section-stack to Robotics + Energy Devices

New Tools structure: (1) Instruments, (2) Technology, (3) Biomaterials, (4) Pharmacology, (5) Intraoperative Adjuncts, (6) Gear.

**Energy Devices** (~430 lines, 39 refs) — electrosurgery, Bipolar vs Monopolar TURP (Cochrane 59 RCTs), lasers (Ho:YAG / TFL / GreenLight / ThuVAP), Harmonic scalpel, LigaSure, Aquablation, morcellation, electrosurgical safety.

**Antibiotics expansion (in Pharmacology):**
- `uti-treatment-antibiotics.mdx` — 21 refs; stratified framework (uncomplicated cystitis → urosepsis → ESBL → DTR Pseudomonas → CRE → prostatitis → CAUTI → ASB); 2025 IDSA cUTI guideline
- `perioperative-antibiotic-prophylaxis.mdx` — 7 refs; AUA BPS 2020 + PUMP-era (Barham 2023, Abou Chawareb 2025); device-specific; MRSA decolonization

**Site audit (2026-04-21):** Build clean. Foundations landing fix — 3 of 5 section entries were non-clickable `<span>`; added `link: {type: "generated-index"}` and converted to `<a>`.

---

## 2026-04-19 — Fistula build-out + instruments/biomaterials databases + TTS platform

**Content:**
- Rectovesical Fistula article (27 citations) — RVF-vs-RUF distinction, Mundy-Andrich + Sotelo classifications, 4 approaches, 5 interposition options
- Urethropubic Fistula article (16 citations) — UPF spectrum, etiologic pathway (radiation → BNC → endoscopic BOO → UPF), UPF-as-osteomyelitis (88-97% histologic), 4-element operation
- Procedures Causing GU Injury / Cesarean Section (30 citations)
- Intraoperative Consultation subsection (8 references) under Trauma & Emergencies

**Instruments — refactored into searchable database:**
- 38 individual instrument pages across 9 subcategories (needle holders, forceps, clamps, cautery, retractors, sounds & bougies, urethral & pelvic specialty, suction, graft harvest)
- Notable: Turner-Warwick Ryder, Heaney, Lone Star, perineal Bookwalter (Jordan), Haygrove, Ravini, Raz-Pereyra, Gorget
- Later added: Bone Instruments (rongeur, pituitary rongeur, periosteal elevator, air drill, osteotome+mallet); TUITMR devices (JNW UrTrac, RD180, Ti-Knot); SSLF device expansion (Capio, Anchorsure, Saffron, i-Stitch, Endostitch, Miya Hook, Deschamps); Dermatome expansion (Zimmer Air, Padgett, Humby, Goulian, Drum/Padgett-Hood, Skin Mesher)

**Biomaterials — refactored into searchable database:**
- ~46 individual pages across 12 subcategories
- Added: Ureteral Stents (4), Urinary Catheters (6), Surgical Drains (3), Neuromodulation Devices (6 — InterStim II/Micro/X, Axonics r-SNM/F15/R20, PTNS, eCoin, Revi, Altaviva)
- Glean Urodynamics System (Bright Uro, FDA 2025)

**New Foundations subsection — Surgical Skills:** 4 sub-categories, 29 technique pages.

**New Tools subsection — Gear:** loupes, headlights, microscope, radiation protection, ergonomics, PPE, adjunct gear.

**Fistulas revamp by gender:** reorganized `03f-fistulas/` into 3 gender buckets.

**Platform features:**
- ArticleListener TTS — cloud (OpenAI) with browser fallback; progressive playback; section-based chunking with chapter picker
- CitationTooltips — hover-to-view reference text
- Both swizzled into `src/theme/DocItem/Content/index.tsx`

**Podcasts section** — `PodcastLibrary` component with ~40 curated episodes across 10 topics, 7 color-coded feeds.

**CSS fix:** database table headers were white-on-gray (unreadable) — raised specificity.

---

## 2026-04-18 — Intraoperative Consultation + Fistula gender-bucket reorg

- NEW Intraoperative Consultation subsection under Trauma & Emergencies (8 refs — WSES 2023, ACS 2025, Kato/Skokan, Sylla taTME)
- NEW Procedures Causing GU Injury subsection nested inside — first article Cesarean Section (30 citations; Palacios-Jaraquemada 2026 AJOG cited not figure-reproduced)
- Fistulas fully revamped — 3 gender buckets (in-both-genders, in-females, in-males); 13 new stubs; 4 articles moved; `cutaneous-complex.mdx` deleted (content rescued into landing page)

**URL changes:**
- `/docs/clinical-conditions/03f-fistulas/vesicovaginal` → `.../in-females/vesicovaginal`
- `/docs/clinical-conditions/03f-fistulas/ureterovaginal` → `.../in-females/ureterovaginal`
- `/docs/clinical-conditions/03f-fistulas/rectovaginal` → `.../in-females/rectovaginal`
- `/docs/clinical-conditions/03f-fistulas/rectourethral` → `.../in-males/rectourethral`
- `/docs/clinical-conditions/03f-fistulas/cutaneous-complex` → DELETED

---

## 2026-04-17 — Lineage + buccal mucosa + reorgs

- Surgeon profile link bug fixed (`s.id` → `s.path`)
- Library dropdown reordered: Journal Club → Resources → History & Lineage
- "Roots of Reconstruction" renamed to "History & Lineage"
- "Surgical Lineage" renamed to "Surgical Genealogy"
- Hidden Curriculum moved into Resources (`09-hidden-curriculum/` → `08-resources/hidden-curriculum/`)
- Buccal Mucosa Graft article fully built (22 citations) — biological properties, harvest technique, donor site RCT, GU applications, named placement techniques table (Barbagli/Asopa/Kulkarni/Palminteri)

---

## 2026-04-16 — Foundations expansion wave

- Perioperative Care restructured (preoperative-assessment / intraoperative-care / postoperative-management / perioperative-protocols); 16 articles populated
- Surgical Principles built out (incisions-closure, bowel-anastomosis, sutures, needles); flap + graft subdirectories created
- Robotics subsection added (platforms, reconstructive-applications, single-port)
- Anatomy subsections added (Lower Extremity, Oral Cavity)

**URL changes** (perioperative reshuffle):
- `/docs/foundations/perioperative-care/preoperative/*` → `.../preoperative-assessment/*`
- `/docs/foundations/perioperative-care/anesthesia-pain/*` → `.../intraoperative-care/*`
- `/docs/foundations/perioperative-care/postoperative/positioning-nerve-injury` → `.../intraoperative-care/positioning-nerve-injury`
- `/docs/foundations/perioperative-care/postoperative/{constipation,electrolyte-abnormalities,pulmonary-embolism,tpn-ppn}` → `.../postoperative-management/{constipation,electrolyte-abnormalities,pulmonary-embolism,nutrition}`
- `/docs/foundations/perioperative-care/postoperative/{eras,antithrombotic-therapy}` → `.../perioperative-protocols/{eras,antithrombotic-therapy}`

---

## Pre-2026-04-16 — Foundation era (summary)

- Anatomy-and-physiology articles (22) rewritten for the GU-reconstructionist voice; "The X" title convention established
- New components: `SurgeonsExplorer` (GURS/URPS tabs), `VideoCards` (lazy YouTube thumbnail grid)
- Surgeon data model extended with `subspecialty` field; ~20 URPS surgeons seeded + 4 URPS dynasties (Raz, Nitti, Comiter, Ginsberg)
- Sidebar "Surgeons" auto-category hidden
- Algolia DocSearch integrated
- Homepage redesigned — light gradient hero, WARWIKI-as-link, search pill, tagline *Reconstruction, codified.*
- Vercel fix — `cleanUrls: true` + `trailingSlash: false`
- Favicon replaced with solid vector W; social card regenerated
- Public-domain/CC-licensed anatomy images downloaded into `static/img/anatomy/`; no caption-only figure blocks (real image or nothing)
