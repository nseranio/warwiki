# WARWIKI Changelog

Running log of substantive content and platform changes. Extracted from session notes in CLAUDE.md on 2026-04-21 so that CLAUDE.md can remain pure rules and conventions.

For commit-level detail run `git log --oneline`.

---

## 2026-06-07 — Visual overhaul continued: +22 original SVG schematics (diagrams 17–38)

**22 commits, all fast-forwarded to `main`. Lint/typecheck/build clean throughout; every figure rendered headless and Read before embedding.** Direct continuation of the 2026-06-06 diagrams-as-code work — picked up the bench items and kept going. Same house style (white figure card, brand-blue `#185FA5` primary, white-haloed labels, leader callouts, bottom legend, `(Original WARWIKI schematic)` caption, `role="img"` + `aria-label`). Generators in `scripts/diagrams/`. Diagram total **16 → 38**; image-bearing pages **~27 → ~45**.

**Both bench items shipped:**
- **Blandy U-flap** (`blandy-u-flap.js`, #18) — U-shaped anterior-vaginal-wall flap on a proximal pedicle, ventral (6 o'clock) urethrotomy, inlay over a Foley + ventral-onlay cross-section. → [Female Vaginal Flap Urethroplasty](docs/04-surgical-techniques/04a-urethral-reconstruction/female/female-vaginal-flap-urethroplasty.mdx).
- **Perineum layered architecture** (`perineal-layers.js`, #23) — coronal slice: skin → Colles' fascia → superficial pouch → perineal membrane → deep pouch → levator ani, each tagged with its surgical plane (kept *coronal* rather than the noted "sagittal" because the pouches stack legibly that way). → [The Perineum](docs/01-foundations/anatomy-physiology/pelvis-support/perineum.mdx).

**Reconstruction geometry / technique figures:**
- **Heineke-Mikulicz principle** (`heineke-mikulicz.js`, #17) — incise long / close transverse; widens caliber without transection. → [Non-Transecting Bulbar Urethroplasty](docs/04-surgical-techniques/04a-urethral-reconstruction/anastomotic/non-transecting-bulbar.mdx).
- **Psoas hitch vs Boari flap** (`boari-psoas.js`, #19) — bladder-based gap-bridging with reach brackets (~5–8 vs ~10–15 cm). → [Boari Flap & Psoas Hitch](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/boari-flap-psoas-hitch.mdx).
- **Antireflux reimplantation tunnels** (`reimplant-techniques.js`, #20) — Cohen cross-trigonal vs Politano-Leadbetter vs Lich-Gregoir, with a flap-valve cross-section inset. → [Ureteral Reimplantation](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reimplantation/ureteral-reimplantation.mdx).
- **TIP / Snodgrass** (`tip-snodgrass.js`, #21) — dorsal-midline plate incision enabling tubularization + a "why incise" cross-section ladder. → [Hypospadias & Epispadias](docs/05-special-populations/05f-lifelong-care/hypospadias-epispadias.mdx).
- **BMG graft placement** (`graft-placement.js`, #22) — dorsal onlay (Barbagli) vs ventral onlay vs dorsal inlay (Asopa) beds in cross-section. → [Principles of Urethral Reconstruction](docs/04-surgical-techniques/04a-urethral-reconstruction/urethral-reconstruction-principles.mdx).
- **Yang-Monti channel** (`yang-monti.js`, #26) — transverse re-tubularization (circumference → new length). → [Yang-Monti Channel](docs/04-surgical-techniques/04b-bladder-reconstruction/yang-monti.mdx).
- **Martius flap** (`martius-flap.js`, #28) — labial fat-pad harvest, dual pedicle, tunneled interposition; posterior-pedicle-for-anterior-target rule. → [Martius Flap](docs/01-foundations/surgical-principles/flaps/martius.mdx).
- **Appendicovesicostomy (Mitrofanoff)** (`appendicovesicostomy.js`, #33) — appendix flap-valve channel to a catheterizable stoma + flap-valve cross-section. → [Appendicovesicostomy](docs/04-surgical-techniques/04b-bladder-reconstruction/appendicovesicostomy.mdx).
- **PFUI Webster maneuvers** (`pfui-webster-steps.js`, #31) — 4-step escalation ladder (mobilize / split corpora / inferior pubectomy / supracrural reroute) closing a distraction defect. → [Abdominoperineal Urethroplasty](docs/04-surgical-techniques/04a-urethral-reconstruction/posterior/abdominoperineal-urethroplasty.mdx).

**Urogyn / device figures:**
- **Midurethral sling trajectories** (`sling-trajectories.js`, #24) — retropubic vs transobturator vs single-incision on an AP pelvis, one hammock. → [Female Slings & Suspensions](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/female-slings-suspensions.mdx).
- **Sacrocolpopexy Y-mesh** (`sacrocolpopexy.js`, #25) — sagittal vault-to-promontory mesh. → [Sacrocolpopexy](docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrocolpopexy.mdx).
- **Sacral neuromodulation** (`sacral-neuromodulation.js`, #27) — tined lead in the S3 foramen + the S3-response confirmation callout. → [Sacral Neuromodulation](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/sacral-neuromodulation.mdx).
- **AUS three components** (`aus-components.js`, #29) — cuff + scrotal pump + PRB with the fill/void cycle. → [Artificial Urinary Sphincter](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx).
- **Three-piece IPP** (`ipp-components.js`, #30) — cylinders + pump + reservoir, cross-section, inflate/deflate. → [Penile Implants](docs/04-surgical-techniques/04j-sexual-dysfunction/penile-implants/index.mdx).
- **DeLancey hammock hypothesis** (`continence-hammock.js`, #32) — normal vs lax suburethral support and why a cough leaks. → [Stress Urinary Incontinence (Female)](docs/03-clinical-conditions/03a-storage-incontinence/sui-female.mdx).
- **Sacrospinous ligament fixation** (`sslf.js`, #34) — apex-to-SSL suspension with the 1.5–2 cm-medial safe zone vs the pudendal/sciatic danger zone. → [SSLF](docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrospinous-ligament-fixation.mdx).
- **Uterosacral ligament suspension** (`usls.js`, #35) — bird's-eye vault-to-USL suspension with the ureter-danger (~1–2 cm lateral) and mandatory-cystoscopy teaching points; companion to SSLF. → [USLS](docs/04-surgical-techniques/04g-prolapse-repair/apical/uterosacral-ligament-suspension.mdx).
- **Studer orthotopic neobladder** (`studer-neobladder.js`, #36) — detubularized ileal sphere + afferent (Studer) limb + urethral anastomosis, with a why-detubularize (Laplace, low-pressure) inset. → [Modified Studer Pouch](docs/04-surgical-techniques/04c-urinary-diversion/modified-studer-pouch.mdx).
- **Transureteroureterostomy** (`tuu.js`, #37) — donor ureter crossed above the IMA/aortic bifurcation to an end-to-side anastomosis with the recipient; "the recipient ureter is the gatekeeper" caution. → [Transureteroureterostomy](docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/trans-ureteroureterostomy.mdx).
- **Buccal mucosa graft harvest** (`bmg-harvest.js`, #38) — intraoral cheek view: ovoid graft below Stensen's duct (opposite the 2nd maxillary molar), off the commissure, with margins; the workhorse substitution graft. → [Buccal Mucosa Graft](docs/01-foundations/surgical-principles/grafts/buccal-mucosa.mdx).

**Conventions reinforced (carry forward):** the per-figure loop held — `node scripts/diagrams/x.js` → headless-Chrome `--screenshot` → **Read the PNG** → fix → embed → `npm run build` → `git checkout -- src/data/stats.json` → commit+push. The single recurring defect was **bottom-legend / caption lines overrunning the card width** (caught on the render every time) — keep legend lines short or drop a clause; the right column of a 3-zone figure collides with leader-label text unless subs are trimmed. Device schematics (AUS/IPP) reuse one "components + cycle-callout + cross-section inset" layout; channel schematics (Yang-Monti/appendicovesicostomy) reuse the "flap-valve cross-section" inset. Still **not** drawing radiograph/CT/MRI/US appearances (the no-fake-radiograph rule).

---

## 2026-06-06 — Visual overhaul: 16 original SVG schematics (diagrams-as-code) + 6 public-domain plates + cohesion cleanup

**25 commits, all fast-forwarded to `main`. Lint/typecheck/build clean throughout; every figure verified by a headless-Chrome render before embedding.** Tackled the site's biggest gap — images — after a sweep found only **16 of 1,184 pages** carried any image, with **zero** across all of surgical-techniques, clinical-conditions, and evaluation (including the imaging pages that are literally about reading images).

**Audit that kicked it off.** Lint/typecheck/build already clean; no content cruft (the 18 "TODO" grep hits were the surgeon name "Ha­tzichris­todo­ulou"; the "undefined" hits were legitimate prose like "optimal dosing remains undefined"). Real issues were visual + cosmetic: the homepage never imports `HomepageFeatures` (dead starter cruft); three heading names for one concept ("See Also" 339 / "Cross-references" 54 / "Related" 38); 14 already-vetted public-domain plates sitting embedded nowhere. Checked and **cleared** a duplicate-`sidebar_position` worry (a per-folder sweep found none). User chose to start with cohesion cleanup, then approved the SVG-diagram approach via a proof-of-concept, then said "let it rip."

**Cohesion cleanup (2 commits):**
- `de11bdb` — removed dead Docusaurus starter cruft: the never-rendered `HomepageFeatures` component, its three `undraw_docusaurus_*.svg` illustrations, and the unused `docusaurus.png` / `docusaurus-social-card.jpg`. None referenced anywhere (the social card / favicon / logo all point at `warwiki-*` assets).
- `b377934` — standardized the generic cross-reference heading onto `## See Also` (339 → 441 pages): folded lowercase `## See also` (20), `## Cross-references` (54), `## Related Articles` (24), `## Related Topics` (3), `## Related Reading` (1). **Preserved the 15 typed sections** that carry real information (`## Related Instruments`/`Catheters`/`Agents`/`Devices`/`Trocars…`/`Propeller Flaps…`/`Techniques: Pippi Salle…`/`Entity — Pubovesical Fistula`/`Device — Veronikis…`, and the narrative `## Cross-Reference — What's Covered on…` pointers). The only inbound anchor link targets `#see-also` (unaffected by the rename).

**16 original SVG schematics** — all copyright-free, authored as re-runnable generator scripts in `scripts/diagrams/`, embedded with the house caption pattern ending **(Original WARWIKI schematic)**, build-validated:

1. **Cystometrogram** (`9cf127e`) — the proof-of-concept; multichannel filling CMG teaching the Pves−Pabd=Pdet subtraction (cough artifact rejected; phasic detrusor-overactivity wave on Pdet) + FSF/FDV/SDV milestones. → Urodynamics. Established + got user sign-off on the house style.
2. **POP-Q six points** (`dbc36e7`) — stylized sagittal vaginal canal with Aa/Ba/C/D/Ap/Bp relative to the hymen=0 plane, gh/pb/tvl landmarks, a "reading the points" key, and a stage ruler relating leading-edge position to stage. → Pelvic Organ Prolapse.
3. **OASIS depth ladder** (`cc71c8e`) — perineal tissue planes by depth + a severity bar per grade (1/2/3a/3b/3c/4) showing how deep each tear reaches, making the EAS-thickness (3a/3b) and IAS (3c) split legible. → Obstetric Perineal Injury.
4. **Perineal incisions** (`115cad8`) — midline-vertical / inverted-U / lambda drawn on the perineal field, colour-coded by wound-complication rate, midline flagged "preferred." → Male Urethroplasty Incisions.
5–6. **Pressure-flow nomogram + uroflowmetry** (`fc91732`) — ICS/Abrams-Griffiths obstructed/equivocal/unobstructed zones bounded by BOOI 40/20 with example points; normal smooth-bell vs obstructed low-plateau flow curves. → Urodynamics.
7. **Z-plasty geometry** (`fb947ed`) — the 60° central limb + two transposing triangular flaps + an angle→lengthening reference (30°/25% … 90°/120%, 60° highlighted). → Z-Plasty.
8. **Hypospadias meatal positions** (`026c2f5`) — lateral penis/scrotum/perineum with 8 numbered ventral positions grouped anterior/middle/posterior (~70/10/20%), aligned to the page's 3-group table. → Hypospadias & Epispadias.
9. **AAST renal grades I–V** (`aabafb5`) — five stylized kidney panels (contusion/subcapsular → shallow lac + perirenal hematoma → deep lac → into collecting system with extravasation → shattered/hilar avulsion) with Gerota's fascia + collecting system drawn. → Renal Trauma.
10. **Urethral cross-section** (`03b2fcc`) — normal open epithelium-lined lumen within the vascular corpus spongiosum vs a spongiofibrosis ring compressing the lumen to a pinhole (Devine depth note). → Urethral Stricture.
11. **Bladder rupture** (`195eadd`) — two coronal bladder panels: extraperitoneal (base tear below the peritoneal reflection; perivesical leak; catheter drainage) vs intraperitoneal (dome blow-out; urinary ascites among bowel; operative repair). → Bladder Trauma.
12. **Penile transverse cross-section** (`bfb2ec9`) — paired corpora cavernosa (tunica, deep cavernosal arteries, intercavernosal septum), ventral corpus spongiosum with urethra, the dorsal neurovascular bundle (deep dorsal vein / dorsal arteries / dorsal nerves), Buck's fascia and skin. → Penis anatomy (the page's first image).
13. **Ureteroenteric anastomosis** (`615557a`) — Bricker (each ureter sewn separately end-to-side to the closed proximal ileum) vs Wallace (ureters spatulated and joined into a single plate sewn to the open conduit end), with the stricture-rate trade-off. → Ileal Conduit.
14. **Clam ileocystoplasty cup-patch** (`fd326a7`) — three-step sequence: detubularize the ileal segment along its antimesenteric border into a flat plate; reconfigure into a U/S-shaped cup; anastomose to the bivalved (clam) native bladder at an equatorial suture line. → Ileocystoplasty.
15. **Pudendal-nerve course** (`fe75a0e`) — posterolateral course (S2–S4 roots → greater sciatic foramen below piriformis → hook around the ischial spine → lesser sciatic foramen → Alcock's canal on obturator internus → inferior rectal / perineal / dorsal branches), flagging the ischial-spine (SSLF suture zone + pudendal-block landmark) and Alcock's-canal (entrapment) risk zones. → Pelvic Neuroanatomy.
16. **Y-V plasty geometry** (`11a36e7`) — Y → V advancement: a Y-shaped incision whose triangular flap slides distally along the stem (never lifted off its base), so the wound closes as a V and the tissue lengthens by the advancement distance x with preserved blood supply (no undermining). Companion to the Z-plasty figure; covers BNC/VUAS, Foley Y-V pyeloplasty, and Y-V meatoplasty. → Y-V Plasty.

**6 public-domain plates embedded** (`5b534cd`) onto anatomy pages where they had been sitting unused: the renal vascular tree + nephron + tubular-transport plates (renal anatomy), a male-pelvis sagittal section + the bladder-trigone interior (bladder anatomy), and a coronal pelvic-floor/perineal-muscle section (perineum). **Verified each plate's actual content before captioning** — several filenames were misleading (`gray1128` "kidney-section" is the nephron diagram; `gray1140` "bladder-female" is the trigone interior; `gray1161` "female-pelvis" is the uterus/adnexa — wrong page, skipped) and `mayo-hegar.jpg` carries an "RS-Vetcon" vendor watermark (skipped — license). This is the "verify, don't trust the filename" lesson made concrete.

**Reverted: the RUG urethral-silhouette schematic** (originally committed `b57a904`, removed in this session). The user rejected it — a drawn imitation of a radiographic study reads as a cheap substitute for the real film. New rule (saved to memory `feedback_no_fake_radiograph_schematics`): **do not schematize the *appearance* of a real radiograph / CT / MRI / ultrasound** (RUG/VCUG contrast silhouettes, the "wine-glass sign", CT-urogram phases); embed a genuine PD/CC image or leave the section text-only. The clean-licensed real RUGs on Wikimedia Commons were sub-par — a German-annotated film photo (CC BY 3.0) and a crisp penile-fracture RUG (CC BY 4.0, but extravasation rather than a stricture) — so the RUG section was left image-less. This does **not** touch data plots: the urodynamics tracings, pressure-flow nomogram, and uroflowmetry are *graphs*, not faked photos, and remain.

**Post-review rebuild.** The AAST renal diagram (#9) was rebuilt for clarity (`78c6de9`) after the reviewer flagged that grade III appeared to enter the collecting system. Now the collecting system is clearly drawn in every panel; grade III's deep laceration stops SHORT of it ("spared"); grade IV breaches it with **amber** urinary extravasation (distinct from red blood); subcapsular (I) and perirenal (II) hematomas are distinguished by inside-vs-outside the capsule; and a **legend** labels every element. Also fixed a double-wrap bug in the crescent helper (a stray `<path` prefix that broke the SVG XML — the same render-verify loop caught it).

**Three reusable "engines"** are the template for the bench: **plot** (axes/grid/curves/zones), **classification ladder** (stacked layers + severity bars), **geometry panels** (shape comparison on a field).

**Conventions established / reinforced:**
- **Diagrams-as-code.** Original schematics live as `scripts/diagrams/*.js` generators emitting `static/img/diagrams/*.svg`. House style: white rounded "figure card", brand-blue `#185FA5` primary / slate `#334155` axes / brick-red `#C0392B` diagnostic channel, **white-haloed labels** via `paint-order="stroke"` + white stroke so text stays legible over any line, leader-line callouts parked in whitespace, severity green→amber→red. To tweak a figure, edit the script and re-run.
- **Render-verify loop is mandatory** per figure: `node scripts/diagrams/x.js` → headless-Chrome `--headless --screenshot` to PNG → **Read the PNG** to eyeball it → fix → embed in the page → `npm run build` → commit + push. This caught two bugs the build alone would not have flagged well: a function param-swap (SVG path strings rendered as visible text) and a raw `<` in label text breaking the SVG XML.
- **Escape `<`/`>`/`&` inside SVG text** (`&lt;`, `&#8804;`, `&amp;`) — a raw `<` is a malformed start-tag, the same hazard as in MDX prose.
- **Embed pattern**: `![alt](/img/diagrams/x.svg)` immediately followed by an italic caption that explains the figure and ends with **(Original WARWIKI schematic)**.
- **stats.json timestamp churn**: `npm run build`'s `prebuild` rewrites `src/data/stats.json`'s `generatedAt`; `git checkout -- src/data/stats.json` before each commit to keep diffs to real changes.
- **Process**: build ONE proof-of-concept first and get sign-off on the style (the cystometrogram was refined for label-overlap — white halos + callouts relocated into headroom — before scaling). Verify in-page in light **and** dark mode (the white figure card reads as an intentional plate in dark mode, like the existing raster anatomy images).

**Still on the bench (remaining high-value candidates, each reuses an engine):** Blandy female vaginal-flap (Heineke-Mikulicz) geometry · perineum layered sagittal anatomy. (Imaging-*appearance* sections — VCUG wine-glass, sonourethrogram, CT/MRI/US — are off the bench per the revert note above.) The remaining unused `static/img/anatomy/` plates are mostly mislabeled or redundant with existing figures — verify each before reuse.

---

## 2026-06-05 (later) — Urogyn hemostasis/technique build-out: locking stitch, hydrodissection, SPC, VH vessel sealing, TXA, Vasoconstrictors-stub cleanup, + Video Library re-sync

**7 commits, all fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean throughout.** A run of user source-dump incorporations across the urogyn/operative-skills space, each verified and cleaned before merge — the hemostasis trio (hydrodissection, VH vessel sealing, TXA) form a small **perioperative-hemostasis cluster** that now cross-links, capped by deleting the redundant Vasoconstrictors stub it absorbed.

- **New [Locking Stitch](docs/01-foundations/surgical-skills/locking-stitch.mdx)** (commit `ad12db5`; Surgical Skills, matching the heaney/parker-kerr/quilting named-stitch pattern). Running-locked suture: per-bite tension fixation, hemostasis on vascular mucosa, resistance to vaginal/tubular shortening; when to lock (vaginal mucosa, bleeding vaginal/cervical lacerations) vs not (muscle/skin, anticipated edema); and the "lock for hemostasis, not by habit" evidence trend (Cochrane/ACOG favor continuous non-locking overall). Dropped the dump's pancreaticojejunostomy figures/refs. 4 refs. Cross-linked from the Obstetric Perineal & Vaginal Lacerations suture subsection (satisfies the hidden-category orphan rule).
- **Built out [Hydrodissection](docs/01-foundations/pharmacology/intraoperative-adjuncts/hydrodissection-agents.mdx)** (commit `2c55cac`) from a "To be built out" stub → full page covering **both** the technique (principle; by-procedure injection for anterior/posterior colporrhaphy, vaginal hysterectomy, colpocleisis, mesh) and **the agents** (saline / epinephrine / vasopressin / ornipressin head-to-head with doses, blood-loss reduction, CV safety, availability, evidence level), plus the vasopressin cardiac-safety section, the "pubocervical fascia" plane debate (Schwarzman RCT — no plane degradation), microcirculation, and practice variation. **Retitled "Hydrodissection Agents" → "Hydrodissection"** (URL unchanged) and updated the pharmacology DB row. 17 refs.
- **Expanded [Suprapubic Catheter](docs/01-foundations/tools/biomaterials/urinary-catheters/suprapubic-catheter.mdx) placement** (commit `14a0ff8`): guidance-modalities block (US / cystoscopic / blind by bowel-injury risk), the **full hydrodissection-to-displace-bowel technique** (Chan & Speirs; 22-G, 30 mL = 10 mL 1% lidocaine + 20 mL sterile water, then 18-G Seldinger — cross-linked to the new Hydrodissection page), a **trocar-vs-Seldinger** head-to-head table (Roberts 2020) + the national bowel-injury fall (2.4% → 0.09%, Hall 2019), and a restructured **first-exchange timing/technique** subsection (passive deflation, guidewire/Van Buren-sound exchange, depth/scale markings, multifunctional-catheter RCT) plus a replacement-interval guideline-divergence note. 4 new refs.
- **Expanded vessel sealing on [Vaginal Hysterectomy](docs/04-surgical-techniques/04g-prolapse-repair/apical/vaginal-hysterectomy.mdx)** (commit `d1e42d5`): grew the one-line tissue-sealing adjunct bullet into a **"Vessel Sealing vs Suture Ligation"** section — clamp-cut-ligate baseline (~7 ligatures/case), bipolar sealers (LigaSure/BiClamp) vs ultrasonic shears, the evidence (Kroft meta −17.2 min/−47.7 mL; Bonavina 2024 network meta; ACOG/Jeppson), and practical points (biggest gain in difficult cases, inadequate-seal + thermal-injury hazards, suture still needed for cuff + apical suspension). 7 new refs (Jeppson already on page).
- **Built out [Tranexamic Acid](docs/01-foundations/pharmacology/intraoperative-adjuncts/tranexamic-acid.mdx)** (commit `bf34757`) from a stub → full page framed for the reconstructive/urogyn reader: mechanism + the **urinary-tract-fibrinolysis rationale** (urokinase/plasminogen — why TXA suits urologic bleeding *and* why upper-tract clot retention is the hazard), evidence across urologic surgery (**POISE-3 urologic subanalysis** headline — major bleeding 6.1% vs 9.5%, HR 0.63; Lin meta; prostate/cystectomy-TACT-vs-Egen-conflict/PCNL trials presented compactly as the *evidence base*, not primary topics — keeps endourology/oncology out of scope), hematuria management, dosing table, and a Safety section led by the **upper-urinary-tract-bleeding contraindication** (clot retention → obstructive uropathy; &lt;1% actual rate but standard). Dropped the dump's openevidence lay link + undefined forest-plot figure. 16 refs. **Link snag fixed:** the vaginal-hysterectomy slug drops the `apical/` folder, so both cross-links needed correcting before the build passed (`lint:links` caught it; fragments are stripped so only the route is validated).

- **Re-synced the Video Library registry** (commit `93a63c8`) — `npm run videos:sync` (fetch @warwikihq playlists → rebuild typed registry): **139 → 140 playlists, 1,531 → 1,535 unique videos** (140 playlists / 1,624 total items; combined 266 / GURS 959 / URPS 310). **Chunk count held at 7** (TS2590 guard re-verified); typecheck + build clean. Only `videos.ts` (+ `stats.json` timestamp) changed in git; `videos.generated.json` stays gitignored.
- **Deleted the redundant [Vasoconstrictors] stub** (commit `858720d`) — it was an empty "To be built out" page, fully redundant with the now-built Hydrodissection page (epinephrine/vasopressin/ornipressin). Removed its pharmacology DB row + intraoperative-adjuncts section-stack entry (relabeled the Hydrodissection link as the home for local vasoconstrictor agents), added a **vercel redirect** (vasoconstrictors → hydrodissection-agents), and **preserved the one useful DB-row pearl** — *avoid epinephrine in end-artery fields (penis, digits, IPP field)* — on the Hydrodissection epinephrine subsection. Page count 1185 → 1184.

**Convention reinforced:** the **named-stitch / dedicated-skill-page** pattern (locking stitch) and the **expand-in-place** pattern (hydrodissection stub, SPC bit, VH bit) both apply depending on whether the topic is a reusable standalone technique or a section of an existing page; in every case the source dump's irrelevant copy-paste figures/refs were dropped and the two papers a dump *names but does not give DOIs for* were verified (or, for SPC/VH, the supplied DOIs were standard-journal and consistent). **Consolidation note:** when a stub is fully absorbed by a built-out sibling, delete it rather than leaving an empty page — repoint its DB/index listings, redirect the old URL, and rescue any one-line pearl into the surviving page.

---

## 2026-06-05 — New page: Obstetric Perineal & Vaginal Lacerations (urogyn-framed)

**1 commit, fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean.** User asked to cover vaginal/perineal injury during childbirth, its acute management, and the urogynecologist's role. No page on the **acute** obstetric laceration existed (elective [perineorrhaphy](docs/04-surgical-techniques/04g-prolapse-repair/posterior-enterocele/perineorrhaphy.mdx), [anal sphincteroplasty](docs/04-surgical-techniques/04h-fistula-repair/female/anal-sphincteroplasty.mdx), and [episioproctotomy](docs/04-surgical-techniques/04h-fistula-repair/female/episioproctotomy.mdx) already did) — so this fills that gap.

- **New [Obstetric Perineal & Vaginal Lacerations](docs/03-clinical-conditions/03c-pelvic-support/obstetric-perineal-injury.mdx)** (clinical-conditions → 03c Pelvic Support Disorders, `sidebar_position: 4`; auto-listed, no DB/index to update). Sections: anatomy at risk (perineal body, EAS/IAS with the IAS-80%-resting-pressure point, levator), classification (1st–4th + OASIS 3a/3b/3c), overstretch mechanism + biomechanics (>3× stretch, perineal-body stretch ratio 1.95) and **levator-avulsion → prolapse** (19% primips, OR 7.3), risk-factor table (forceps 5.50, vacuum 3.98, midline episiotomy 3.82; midline-episiotomy-plus-forceps OR 5.65/10.55), prevention (intrapartum + antenatal with NNTs), the **acute immediate repair** (systematic exam, second-degree deep-to-superficial 3-stage technique, continuous-over-interrupted suture evidence, postop care), a dedicated **"crown stitch"** subsection, and a closing **"Urogynecologist's Role"** with an **acute-repair vs elective-perineorrhaphy comparison table** + downstream-sequelae cross-links (prolapse / FI / dyspareunia / RVF).
- **Crown stitch handled honestly** per the source's own caveat: framed as a **teaching term, not an ACOG/Cochrane/AAFP entity** — the fourchette/perineal-body transition stitch — with the tension trade-off (too tight → constricting ridge/dyspareunia; too loose → splayed fourchette) and the explicit tie-back to the elective perineorrhaphy checkpoint.
- **Corrected a garbled source stat:** the dump's OASIS "3a: 50% of EAS torn" → the standard Sultan/RCOG **3a = less than 50% of EAS thickness** (3b > 50%, 3c + IAS). Kept the rest of the OASIS subclassification standard-accurate.
- 15 refs (ACOG 198/214, Cochrane Kettle + Dwan 2024, DeLancey 2024 AJOG, Schmidt-Fenner, Arnold AAFP, biomechanics/risk-factor/perineorrhaphy-survey papers) with stable parallel anchors.

**Convention reinforced:** keep an honest **"not a standardized term"** framing when a user asks about a colloquial/teaching eponym (the crown stitch) rather than inventing guideline status for it; and correct obviously garbled classification stats from a dump against the standard scheme.

---

## 2026-06-04 (later) — Kulkarni page: Incisions & Access section (penoscrotal inversion + Mini-Kulkarni)

**1 commit, fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean.** User asked to broaden the [Kulkarni One-Stage page](docs/04-surgical-techniques/04a-urethral-reconstruction/graft/kulkarni-one-stage.mdx) beyond the perineal-invagination access to cover the other incision options, anchored on two named papers.

- New **"Incisions and Access Options"** section framing the one-sided dorsal-onlay principle as deliverable through four incisions chosen by **stricture location**, with an at-a-glance table: **circumcoronal degloving** (the traditional penile approach, with its degloving morbidity), **perineal + penile invagination** (standard Kulkarni), **penoscrotal + penile inversion** (Warner 2016 — no penile incision, single-stage, supine; 4/5 = 80% in 5 patients; plus Mathur's midline-penoscrotal tunica-albuginea onlay, 94.9% in 79 as a versatility example), and the glans-sparing **"Mini-Kulkarni"** (distal-third penile-shaft incision over the prepuce, lateral urethral rotation, dorsal BMG) for isolated fossa-navicularis / meatal strictures.
- **Both named papers verified by lit search before citing** (their DOIs weren't in the user's dump): Warner *Investig Clin Urol* 2016;57(2):135-140 and Oliveira *Research Square* preprint 2025 (rs.3.rs-6805479/v1). The **Mini-Kulkarni is flagged in a blockquote caveat as a 2025 preprint** (n = 6, 6-mo follow-up, not yet peer-reviewed) — emerging glans-sparing option, not a standard — with cross-links to better-validated distal techniques ([Asopa dorsal inlay], [meatotomy]). **Deliberately omitted Kanematsu 2025** from the draft: its verified abstract describes a *ventral* double-sided Heinecke-Mikulicz approach, not the "transperineal penile invagination" the dump claimed, so citing it for invagination access would have misattributed it.
- 4 new refs (12-15: Warner, Oliveira, Mathur, Verla 2019). Forward pointer added from technique step 1 to the new section.

**Convention reinforced:** when a source dump names a paper but supplies no DOI — or supplies a DOI for a *different* claim than the paper actually supports — verify against the literature before citing, and **drop the citation if the paper doesn't support the specific claim** (the Kanematsu invagination mismatch). Preprints are citable but must be labeled as such with their small-n / short-follow-up limits stated.

---

## 2026-06-04 — Anatomy & Physiology reorganized (4 groups) + Perineal-urethrostomy restructure (Midline / Augmented / Blandy fix)

**4 commits, all fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean; verified in-browser.** Two workstreams.

### Anatomy & Physiology reorganized into 4 reconstructive-lens groups (commit `fdb0e45`)

Replaced the **"Pelvis, Support & Other"** junk drawer and the two singleton categories (Lower Extremity, Oral Cavity) — and gave the orphan `skin.mdx` a home — with four role-based groups, framed as **target → surgical field → donor**:

- **Urinary Tract** — renal, ureter, bladder, male/female urethra, **+ GU embryology** (folded in).
- **Genitalia & Reproductive** — unchanged (8 pages).
- **Pelvic Floor, Spaces & Neurovascular** — relabeled from `pelvis-support`; bony pelvis, perineum, anal, presacral, retropubic, pelvic neuro/vascular (the 7 pages that stayed put — no move, no slug).
- **Donor & Harvest Sites** — new `donor-sites/` folder: oral cavity, skin, leg & thigh, bowel, abdominal wall.

The six moved pages each carry a **`slug:` override pinning their original public URL**, so all ~28 inbound links still resolve and no redirects were needed (the link checker honors `slug:` via `fileToUrl`). Empty `oral-cavity/` and `lower-extremity/` folders removed; index `section-stack` rewritten. **Cosmetic tradeoff:** a moved page's folder no longer matches its URL (e.g., `donor-sites/bowel-anatomy.mdx` still serves at `/pelvis-support/bowel-anatomy`) — the price of zero link churn. (User-decided scheme via AskUserQuestion; "clean-URL + redirect" pass offered as optional future work.)

### Perineal-urethrostomy restructure (commits `018e200`, `6ab25d9`)

User's read: the "7-flap" page was really about *going midline and then your options*, and augmented PU is approach-agnostic. Three changes:

- **Reframed the 7-flap page → [Midline Perineal Urethrostomy](docs/04-surgical-techniques/04a-urethral-reconstruction/meatal-perineal/midline-perineal-urethrostomy.mdx)** (`git mv` seven-flap → midline-perineal-urethrostomy.mdx, **slug kept stable** so the 9 inbound links + DB row don't break). New intro + "Why Midline, and the Two Options" section lead with the universal midline incision and the intraoperative **loop-vs-7-flap** decision; the 7-flap stays the centerpiece flap but is now one of two options. Removed the on-page BMG-augmented section (→ own page) and dropped its 3 now-unused refs.
- **New standalone page — [Augmented Perineal Urethrostomy](docs/04-surgical-techniques/04a-urethral-reconstruction/meatal-perineal/augmented-perineal-urethrostomy.mdx)** (slug `.../augmented-perineal-urethrostomy`, sidebar 43). Augmented PU is **approach-agnostic** — a dorsal onlay BMG added through either a midline OR an inverted-U/Blandy incision — so it no longer lives under the midline page. Built from the removed on-page content + two user source dumps: indications, step-by-step dorsal-BMG technique, rationale, outcomes (DeLong 80% with the case-mix caveat vs standard PU 94.8–95.1%), selection logic, the LS evidence pivot (Patel 93% PU vs BMG; Kurtzman meta 10%→18%), a PU-technique comparison table, and revision (Kamat). 14 refs. Dropped the dump's bled-in irrelevant figures/refs (female-urethra/metoidioplasty). Added to the male-urethroplasty atlas DB; short pointers from the midline + Blandy pages.
- **Fixed the Blandy flap geometry** (it was reversed *and* internally inconsistent — "posteriorly based" but "base directed anteriorly"). Correct, per Cleveland Clinic + plasticsurgerykey operative descriptions: the **rounded apex points anteriorly toward the scrotum**, the flap is **posteriorly based** (pedicle toward the anus, off the bulbocavernosus), and the **apex is parachuted to the proximal urethrotomy** (~3 cm anterior marking, ~3:1 base-to-length). Fixed the incision, elevation, and anastomosis steps.

DB: row "7-Flap Perineal Urethrostomy" → "Midline Perineal Urethrostomy"; new "Augmented Perineal Urethrostomy" row. Link labels updated across johanson-two-stage, propeller-flap, meatotomy (repointed the **dead `#bmg-augmented…` fragment** to the new page — `lint:links` strips fragments so it wouldn't have caught this), and the AFAB/AMAB nullification pages. Added the **Sean Elliott MD "Perineal Urethrostomy" video** (`3dKggq-K0cc`, title via oEmbed) to the midline page.

**Conventions reinforced:**

- **Repurposing a page = rename the file for clarity but keep the explicit `slug:`** so inbound links and DB rows stay intact (same URL-stability play as the anatomy reorg). The 7-flap → midline rename used this.
- **A spanning, approach-agnostic technique earns its own page**, not a section under one approach (augmented PU spans midline + Blandy) — same rule as the "one full page + short pointers" pattern.
- **`lint:links` strips URL fragments** — it validates the route, not the `#anchor`. When you delete a section that other pages deep-link to, the fragment link silently lands at page-top; fix those by hand (caught the meatotomy `#bmg-augmented…` link).
- **Verify an anatomical claim against the operative literature when challenged** — the Blandy apex/base orientation was confirmed against two independent sources before editing, not trusted either way.

---

## 2026-06-03 — New Skin anatomy page + flap-design science folded into the flaps index

**2 commits, both fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean.** User supplied two large source dumps — comprehensive skin anatomy/flap-design science, and random-pattern-flap best practices — and asked to "update the skin anatomy page and incorporate this knowledge of flaps and flap design." No skin anatomy page existed; per the user's placement choice (AskUserQuestion), the work split into a **new Anatomy & Physiology page for the skin** and a **fold of the flap-design science into the existing flaps index**.

- **New page — [Skin](docs/01-foundations/anatomy-physiology/skin.mdx)** (commit `8865f1b`; Anatomy & Physiology, `sidebar_position: 6`, top-level page serving at `/docs/foundations/anatomy-physiology/skin`). Reconstructively framed ("skin is both the donor and recipient of most genital/perineal/LUT reconstruction"):
  - **Layers** — epidermis (avascular; the de-epithelialize-don't-excise-dermis rule, tied to the 25.9% DIEP perfusion drop), dermis (papillary/reticular, subdermal plexus, RSTL origin), hypodermis; with a **donor-site thickness table** (radial forearm ~950/1,900 μm → DIEP intermediate/7,100 μm, Hwang 2016) anchoring thin-vs-bulky donor selection.
  - **Cutaneous vascular anatomy** — subdermal/subcutaneous/fascial plexuses, two-level perforators (above Scarpa's vs subdermal), direct/indirect linking vessels, Nakajima's five-type classification; defers the angiosome/perforasome detail to the flaps page.
  - **Biomechanics** — RSTLs/Langer's lines from reticular-dermis collagen alignment, parallel-vs-perpendicular wound mechanics, the ~21.6 MPa UTS / ~83.3 MPa modulus figures (Ní Annaidh 2012), age-related anisotropy.
  - **Neurovascular relationships** — accompanying-artery/neurovascular-flap basis (Taylor 1994), venoadipofascial flaps (Nakajima 1998), framed to sensate genital cover.
  - **Reconstructive relevance** + See Also (flaps index, plastic-surgery-principles, reconstructive ladder, wound healing, STSG/FTSG). **19 refs** with stable parallel anchors; linked into the anatomy index `section-stack`.
  - **Source cleanup:** dropped both supplied figure placeholders (`Figure 1` skin architecture, `Figure 5` perforasome map) — `undefined` captions, no embed rights (house no-caption-only-figure rule). Caught and consolidated a **duplicate Nakajima 1986 citation** the draft would have produced (cited in both the intro and the vascular section) — merged to one ref and renumbered 12–20 → 11–19 via a script (citation lint forbids numbering gaps).
- **Expanded — [Flaps in GU Reconstruction](docs/01-foundations/surgical-principles/flaps-gu-reconstruction.mdx)** (commit `7d1a063`):
  - **Nakajima five-type note** added to the Flap Classification Overview, with a lead cross-link to the new Skin page.
  - **New section "Vascular Basis of Flap Design — Angiosome and Perforasome"** — Taylor angiosome (43 territories; the validated "a flap safely captures one adjacent perforator territory, no more without delay" rule), Saint-Cyr perforasome (individual-perforator territory; vascular axis follows linking-vessel axiality; near-joint flow directs away from the joint; subdermal plexus + fascia both contribute); clinical translation = constant source arteries but variable perforators → Doppler/CTA/ICG mapping + a flexible plan, cross-linked to the GU propeller/perforator flaps (PMTP, SCIP, IGAP/IPAP, EPAP).
  - **New section "Random Pattern Flap Design Principles"** — explicitly framed on the library's *own* local random flaps (penile/preputial, scrotal, rhomboid/Limberg, bilobed, rotation, advancement): subdermal-plexus dependence + linear base-to-tip perfusion; length-to-width (1:1–2:1 trunk, up to 3:1 face, ~12.5 cm ceiling, laser-speckle confirmation); the arbor/tree geometry; RSTL orientation; undermining to ~3× defect diameter (+ the scalp 5 cm/83% vs 15 cm/92% subgaleal data); the **>250 g closing-tension necrosis threshold**; preserve-the-plexus (don't thin — 95.5% → 64.9%; preserve dermis when burying); the **delay phenomenon** (~5–7 d, VEGF peak ~d3/perfusion ~d5, microneedling alternative); pharmacologic adjuncts (pentoxifylline/sildenafil/α-blockers in the McFarlane model, limited clinical translation); + a summary table. **20 new refs (11–30)**, all real published sources with DOIs; bidirectional cross-links with the Skin page.

**Build snag fixed en route — `{#custom-id}` heading anchors break MDX.** The cross-page section link from Skin → flaps used a `## Heading {#vascular-basis-of-flap-design}` explicit-ID heading; MDX/acorn parsed the `{…}` as a (failed) JS expression — *"Could not parse expression with acorn"* — aggravated by the `&` in the heading text. **Fix/convention:** for a stable cross-page section target, drop the `{#id}` syntax and place an explicit `<a id="…"></a>` HTML anchor immediately above the heading (and prefer "and" over "&" in anchored headings). `npm run lint` does not catch this class of error — only the full `npm run build` does (same lesson as the `<sup>` tag-closure rule).

---

## 2026-06-02 (later 2) — Corporal-fibrosis build-out: expanded fibrosis section + 2 new instrument pages + VJSM video card

**4 commits, all fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean throughout.** A prosthetics-instruments arc, all anchored on managing **corporal fibrosis during penile-prosthesis surgery**.

- **Expanded the Corporal Scarring / Fibrosis section** of [penile-implants/revision-scenarios.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/penile-implants/revision-scenarios.mdx) (commit `349f575`) from a short causes/cavernotome/Carter-Trost stub into a full treatment: etiology with percentages (post-explant ~40–67%, priapism ~16–33%), **preoperative VED protocol** (Tsambarlis/Levine 2017, 0.92 cm length gain), **stepwise intraoperative escalation** (Hegar 8–12 mm → cutting cavernotomes ~60% → counter incisions → **Montague-Angermeier corporeal excavation** inverted-T → **grafting**), with Carter-Trost folded in as the named open-corporotomy variant; **cylinder selection** (narrow-base CXR / Titan NB at 10 vs 12 mm; Johnson 2025 CXR outcomes; **Wilson 2006 staged upsizing** as tissue expander); **unilateral (single) cylinder** salvage scenarios; and an at-a-glance technique table. Source cleanup: dropped the "Would you like…" prompt and an OpenEvidence lay link, rebuilt the mashed table. **15 new refs (12–26)** appended (page already not in strict appearance order, so contiguous append matched its existing pattern).
- **New instrument page — [Wilson Backward-Cutting Scissors](docs/01-foundations/tools/instruments/scissors/wilson-backward-cutting.mdx)** (commit `5d0bed6`; Scissors, `sidebar_position: 6.5`). The Freeman-Kaye / Gourney pattern (supplied by Uramix); the defining feature is that the **outer/convex blade edges are sharpened**, so the blades **cut when spread open inside scar** — used to carve the initial corporal channel before a cavernotome can be seated. Details pulled **verbatim** from the Fernandez Crespo 2024 *Transl Androl Urol* narrative review (confirmed against the source PDF, including the "outside of the scissor blade is sharp as well" wording and the Freeman-Kaye / Gourney synonyms). Two cutting modes table; lateral-cutting safety rule; distinguished from Metzenbaum (spreads to *separate*, doesn't cut). Index row added; woven into the fibrosis escalation ladder as the "Creating the starter channel" note (new ref 27 on the revision page, Fernandez Crespo 2024).
- **New instrument page — [Cavernotomes](docs/01-foundations/tools/instruments/sounds-bougies/cavernotomes.mdx)** (commit `b72c3d1`; Sounds & Bougies, `sidebar_position: 15`). **Consolidated single page** rather than one-per-design (the two families share ~all technique/outcomes/safety, and Carrión-Rossello has sparse primary data — per the consolidation rule). Covers: **Carrión-Rossello** (first-gen, Carrión's Small-Carrión 1975 lineage, required extensive resection + longer OR, historical) and **Mooreville-Wilson / Uramix** (5-instrument 6–13 mm set, 1 mm oscillating cuts, lateral edge); technique (scrotal access → blunt dilators first → sequential upsizing → oscillating advance → 11 Fr distal / 13 Fr proximal); outcomes (Mooreville 1999 n=16 100% implant, 87.5% downsized; Krughoff 2022 n=42, 59.5% use, 2.4% major complications); the **blind sub-tunical instrumentation** complications (31% proximal / 25% distal perforation); **direct-vision adjuncts** (Shaeer 2007 US-guided + corporoscopic, Montague-Angermeier excavation, narrow-base cylinders); and a **tissue-sparing meta-analysis** (Mohamed 2026). **13 refs.** Index row added; cross-linked from the fibrosis ladder (cavernotome step now links here) and the Wilson scissors page. **Accuracy call:** the source dump's "OR 95.92" for cavernosal-artery preservation looked garbled, so it was reported qualitatively ("significantly higher") with only the interpretable tumescence (87–89% vs 7–15%) and girth (+0.55–1.81 cm) figures quoted.
- **VJSM video card** on the cavernotomes page (commit `aabc659`). The user supplied a [vjsm.info link](https://www.vjsm.info/videos/all/augmentation-with-macroporous-polypropylene-mesh-as-a-salvage-maneuver-for-tunica-defects-in-ipp-revision-surgery-with-accidental-tunica-perforation-and-severe-fibrosis) (Karapanos, macroporous-polypropylene-mesh augmentation as salvage for tunical perforation in IPP revision). The page embeds a **Vimeo (ID 1181098222, author "ISSM")**; oEmbed returns **`domain_status_code: 403`** (restricted to the publisher domain), so it was added as an **external `web-card--video` link**, not an iframe — exactly the SUFU pattern. Topical fit: the video's salvage is for the tunical perforation the cavernotome can cause.

**Video-source architecture clarified (user question this session):** the two video systems are separate. **Page embeds** can be non-YouTube — YouTube → `<VideoCards>`; a public Vimeo/journal player → raw `<iframe>`; an embed-restricted player → external `web-card` link — the deciding test is the oEmbed `domain_status_code` (200 vs 403). **The Video Library**, by contrast, is auto-generated from the @warwikihq YouTube channel and **stays YouTube-only** by decision (it's the channel mirror; restricted journal videos can't render as playable cards anyway). Outside videos belong as page-level external cards with article context. A future *separate* "external curated picks" shelf was floated but not built.

---

## 2026-06-02 (later) — "Drain and Retain" prosthetic-reservoir maneuver added to IPP revision + AUS pages

**1 commit, fast-forwarded to `main`. Lint (scope/citations/orphans/links) clean; typecheck + build clean.** Incorporated the **"drain and retain"** maneuver — emptying and intentionally leaving an adherent prosthetic reservoir/balloon in situ rather than explanting it — from a user-supplied source dump.

- **Primary home — [penile-implants/revision-scenarios.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/penile-implants/revision-scenarios.mdx).** New `### Drain and Retain` subsection under *Reservoir Complications* (which already named "retained reservoir after prior infection explantation"): technique (aspirate → tubing on traction → transect proximally → new reservoir HSM/contralateral), rationale (avoids retropubic dissection off a reservoir adherent to bladder/iliac vessels/obturator nerve/bowel), safety data (Cefalu 2013 n=55, infection 1.8% vs 1.5% virgin p=0.88; Pereira 2026 n=233 across 7 centers, no retained-reservoir complications at 12.6 mo), and caveats (contraindicated when explanting for infection; long-term unknown). **3 new refs (9–11).**
- **Cross-linked brief note — [artificial-urinary-sphincter.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx) §7 (PRB Modification).** Same maneuver applies to the AUS pressure-regulating balloon; summarized + linked back to the IPP page rather than duplicated. **2 new refs (69–70)** (Cefalu, Pereira) reused with this page's numbering.

**Source-cleanup / accuracy notes:**

- Dropped the "Would you like to explore…" trailing prompt; converted `[1][2]` brackets to the `<sup>[[N]](#refN)</sup>` pattern.
- **Verified the Pereira DOI** rather than trusting the dump — a sibling article in *J Sex Med* 23(3) (`qdag034`) confirmed the `qdag` prefix, so the supplied `qdag024` was correct (briefly mis-"corrected" to `qdaf024`, then reverted). Reinforces: verify, don't assume, an unfamiliar DOI suffix.
- **Added a real safety counterpoint the dump only gestured at.** The draft's vague "controversial / theoretical risk" was made concrete with **Loloi et al. 2022 (*CUAJ* 16(7):E403–E405)** — two drained-and-retained reservoirs (one IPP, one AUS — the latter the first such AUS report) presenting later as **small bowel obstruction**, risk greatest with intraperitoneal position. Drove the practical pearl: confirm an extraperitoneal position and counsel the patient about delayed presentation.

**Convention reinforced — spanning-topic placement:** a technique that applies to two device families gets one full treatment on the most natural page (IPP revision) + a short cross-linked note on the other (AUS PRB section), never duplicated. Same pattern as urethrectomy/urethrolysis cross-linking.

---

## 2026-06-02 — Transitional Urology build-out: 5 new condition pages (PUV, BEEC, Prune Belly, DSD, ARM)

**5 commits, all fast-forwarded to `main`. Lint + typecheck + build clean throughout; every page verified in-browser.** Built out the [Transitional Urology](docs/05-special-populations/05f-lifelong-care/transitional-urology.mdx) section of Lifelong Urologic Care from one hub page into a hub + six dedicated condition pages. Each condition the hub names now has its own adult/lifelong-care page, framed for the reconstructive & functional urologist, with the hub carrying a transition-clinic summary that points to the deep-dive. All page content was supplied as source dumps and merged/deduplicated/cleaned per house rules (dropped "Would you like…" prompts, `undefined` figure-caption blocks, copyrighted figures, and truncated stats; reconciled reference lists; verified facts + DOIs).

**New pages (all under `docs/05-special-populations/05f-lifelong-care/`):**

- **[Posterior Urethral Valves](docs/05-special-populations/05f-lifelong-care/posterior-urethral-valves.mdx)** (37 refs) — delayed/adult presentation + VCUG, long-term renal outcomes (46% ESRD, −2.6 mL/min/yr, proteinuria + febrile UTIs as modifiable accelerators), valve bladder syndrome, stepwise bladder-management ladder (nocturnal emptying/CIC → antimuscarinic ± α-blocker → intravesical botox → augmentation + Mitrofanoff), renal preservation (RAS inhibition, SGLT2i, desmopressin for polyuria), transplantation with pre-transplant bladder optimization, sexual/reproductive outcomes, transition, surveillance table.
- **[Bladder Exstrophy-Epispadias Complex](docs/05-special-populations/05f-lifelong-care/bladder-exstrophy-epispadias.mdx)** (44 refs) — continence-reconstruction ladder (BNR ~64% → BNC + continent stoma 93%), continent diversion + long-term complications, augmentation metabolic/renal surveillance, ~694-fold malignancy risk, abdominal-wall reconstruction (no osteotomy in adults), male genital reconstruction/phalloplasty, sexual/fertility (sperm-banking), high-risk pregnancy/obstetric planning, psychosocial/QoL, untreated-adult management.
- **[Prune Belly Syndrome](docs/05-special-populations/05f-lifelong-care/prune-belly-syndrome.mdx)** (35 refs) — spectrum, renal preservation + transplantation (5-yr graft ~91%, PD feasible despite lax wall), the dynamic valve-bladder LUT workup with AUA/SUFU risk-stratified urodynamic surveillance, Monfort abdominoplasty's functional payoff, reproductive health (retrograde ejaculation, ~50% motile sperm, ICSI), malignancy surveillance, transition, QoL.
- **[Differences of Sex Development](docs/05-special-populations/05f-lifelong-care/differences-of-sex-development.mdx)** (29 refs) — **deliberately scoped to avoid redundancy** with existing pages: classification orientation, gonadal tumor surveillance vs gonadectomy timing, surgery-timing debate, feminizing-genitoplasty revision (vaginal stenosis), TART in CAH, androgen-insensitivity adult issues (vaginal dilation, bone health, HRT), compressed LUT/sexual/fertility. Cross-links OUT for reoperative hypospadias technique, the NLUTD ladder, and the transition process; dropped the mis-pasted copyrighted GAS figures.
- **[Anorectal Malformations](docs/05-special-populations/05f-lifelong-care/anorectal-malformations.mdx)** (34 refs) — associated urologic anomalies (50–65%, scaling with complexity), long-term sequelae table, the bowel–bladder intersection (combined ACE + catheterizable channel; sacral-agenesis cohort), a focused bowel-management ladder (senna → retrograde enemas → ACE → colostomy), psychosocial/QoL + high psychiatric burden (~52% depression/anxiety, ~31% SUD), transition. Bowel-management kept tight and cross-linked to catheterizable-channels / augmentation rather than reproduced.

**Hub consistency (user-requested):** every transitional-urology condition with a dedicated page now leads its hub subsection with the same **pointer-blockquote** ("See the dedicated … page … the summary below is the transition-clinic orientation") — Neurogenic Bladder, Hypospadias & Epispadias, BEEC, DSD, plus new subsections added for **Prune Belly Syndrome** and **Anorectal Malformations** (which previously appeared only in the core-conditions bullet list). Hub pointers for PBS/ARM cite existing hub refs so no renumbering was needed.

**Sidebar regroup (user-flagged "odd"):** the congenital/transitional condition pages now cluster after their hub, with Geriatric Urology moved to the end. Final order: **Lifelong Urologic Care → Transitional Urology → Hypospadias & Epispadias → Posterior Urethral Valves → Bladder Exstrophy-Epispadias Complex → Prune Belly Syndrome → Differences of Sex Development → Anorectal Malformations → Geriatric Urology**. Previously Geriatric Urology was wedged between the hub and its condition pages.

**Conventions reinforced:**

- **Pointer-blockquote pattern for hub → dedicated-page links.** When a hub section summarizes a topic that has its own page, lead with a blockquote pointer and keep the hub copy as a short orientation. Applied uniformly across all transitional-urology conditions.
- **Cross-link, don't duplicate (enforced hard on DSD + ARM).** Reoperative hypospadias technique, the NLUTD ladder, catheterizable-channel/augmentation operative detail, and the generic transition machinery each live on dedicated pages — the new condition pages point to them instead of reproducing them.
- **Reconcile + dedupe reference dumps before appending** — caught and repointed a duplicate Peña 1998 in ARM (→ NASPGHAN paper) to keep numbering contiguous; added a missing ref1 in DSD rather than leaving a gap.
- **Atlas landing slugs use the stripped form** — `/docs/surgical-techniques/urethral-reconstruction` (frontmatter `slug:` override), not the `04a-…` folder path; a wrong link was caught by `lint:links` + the build.

---

## 2026-06-01 — Pectopexy mesh-configuration expansion + 2 videos + Video Library re-sync (1528 → 1531)

**1 commit, fast-forwarded to `main`. Typecheck + lint + build clean; verified in-browser.** Expanded the [pectopexy](docs/04-surgical-techniques/04g-prolapse-repair/apical/pectopexy.mdx) Mesh configurations section from user-supplied source content, added two operative videos, then re-synced the Video Library.

- **Mesh configurations rebuilt.** Old 3-column table → 6-column reference (configuration · dimensions · material · vaginal/cervical fixation · lateral fixation · best-for), covering the standard **Noé 3 × 15 cm PVDF strip** (DynaMesh PRP), **8 × 15 cm T-shaped** cut, **inverted-T**, and **Y-shaped** mesh. Added prose on material choice (Type-1 polypropylene 46.7% vs PVDF "memory effect"; anterior-vs-posterior cervical placement equivalence per Biyik 2026), preparation/delivery (rolled through 10-mm trocar, smooth edge trimming, stay-suture at the Y-bifurcation, Chen transvaginal single-port Y-mesh series n=93), and a cross-anchor to the existing Biomechanical fixation note rather than duplicating it.
- **6 new references (19–24):** Noé 2021 JCM, Szymczak 2019 *Neurourol Urodyn* (distinct from the existing Szymczak 2022 *J Clin Med*), Kavallaris 2020, Biyik 2026, Chen 2018, Li 2021. The user's other cited papers were already in the reference list (Jongjakapun, Sauerwald, Pirtea, Chang, Zhang, Lyu, Yang) — reconciled against existing refs before appending, no duplicates.
- **Source cleanup:** dropped the trailing "Would you like to explore…" prompt; folded the dump into the existing house structure instead of bolting on a parallel section.
- **`## Videos` block** added before References: *da Vinci Xi Pectopexy* (Dr. A. Keck, `ysjLsBss99c`) and *Pectopexy for Urogenital Prolapse* (N. Moulay, `WFBAeUsC95E`). Titles/subtitles resolved via YouTube oEmbed. Added the `VideoCards` import.
- **Video Library re-synced** (`npm run videos:sync`): **137 → 139 playlists, 1528 → 1531 unique videos** (combined 264 / GURS 958 / URPS 309). `WFBAeUsC95E` is on the @warwikihq channel and is now in the registry; the da Vinci clip is not on the channel, so it lives only as a page embed. **Chunk count held at 7** — TS2590 guard re-verified. Only `videos.ts` + `stats.json` changed in git.

**Conventions reinforced:**

- **Reconcile a reference dump against the existing reference list before appending** — most of the supplied refs were already present under different numbers; only 6 were genuinely new. Saved a renumbering mess and duplicate citations.
- **Caption single video embeds from oEmbed, not from memory** (re-applied) — both card titles came from the oEmbed JSON.
- **External page-embed ≠ Video Library entry.** A video only enters the registry if it lives on the @warwikihq channel; embedding it on a page via `VideoCards` is independent of the channel sync.

**Minor open item flagged to user:** the intro credits "Banerjee and Noé in 2011" while the standard config table credits Noé alone — both attributions exist in the literature; left untouched pending a harmonization decision.

---

## 2026-05-30 (later 4) — Journal Club surfaced in the navbar

**1 commit, fast-forwarded to `main`. Build clean; navbar verified in-browser.** Added **Journal Club** to the left navbar between **Video Library** and **Resources**. It had been hidden from the navbar when the old 80-article journal database was retired (handoff 2026-05-27 codified "Hide-from-navbar ≠ delete… surface it back when the journal database is ready to grow"). That condition is now met — Journal Club has been rebuilt into the 52-trial Landmark Trials database (21 → 42 → 52), so it earns the slot.

- Wired as a plain `to: '/docs/journal-club'` link (matching Video Library), not a `docSidebar` — the section is a single `index.mdx`, so a one-item sidebar would be noise.
- Final left navbar: **Foundations · Evaluation · Clinical Conditions · Treatment Atlas · Special Populations · Video Library · Journal Club · Resources**. The three reference-style tools now sit together at the end of the nav.
- Journal Club remains in the footer (Resources column) as well, matching how Video Library and Resources appear in both places.

---

## 2026-05-30 (later 3) — Landmark Trials expanded 42 → 52 (exhaustive site sweep)

**1 commit, fast-forwarded to `main`. Typecheck + lint + build clean; verified in-browser.** A deliberate "what are we missing across the whole site" pass: mined the **recovered old 80-article `journals.ts`** (pulled from git history) plus **named trials cited in article prose** for studies not yet in the database. Added 10, each fact + DOI verified by literature search. Two new domains: **Urinary Diversion**, **Infection / Prophylaxis**.

- **Urethral Stricture:** BMG Harvest Closure meta-analysis (Güler, Arab J Urol 2022) — the buccal-graft closure-vs-non-closure question; non-closure at least as good.
- **OAB / Urgency:** Nitti (onabotA **100 U** for idiopathic OAB, J Urol 2013 — dose-distinct companion to the neurogenic 200 U Ginsberg trial), ARTISAN-SNM (rechargeable Axonics SNM, J Urol 2020), OASIS/Revi (implantable tibial neuromodulation, J Urol 2024).
- **Pelvic Organ Prolapse:** IMPROVE (perioperative vaginal estrogen — negative trial, JAMA 2023), PESSRI (ring vs Gellhorn pessary, AJOG 2007).
- **Urinary Diversion (new domain):** USC-STAR (Studer vs T-pouch neobladder, J Urol 2015 — antireflux T-pouch added morbidity without renal benefit). Framed as a diversion-reconstruction trial, not a cancer trial.
- **Infection / Prophylaxis (new domain):** ALTAR (methenamine hippurate vs antibiotic prophylaxis for recurrent UTI, BMJ 2022).
- **BPH / Male LUTS:** COURAGE (vibegron add-on for persistent OAB in BPH, J Urol 2024).
- **Surgical / Perioperative:** WHO Surgical Safety Checklist (Haynes, NEJM 2009 — death 1.5%→0.8%, complications 11%→7%).

**Final distribution (52):** OAB/Urgency 10 · Pelvic Organ Prolapse 10 · Stress Incontinence 7 · BPH/Male LUTS 7 · Surgical/Perioperative 4 · Urethral Stricture 4 · Male SUI/Prosthetics 3 · Sexual Medicine 3 · Mixed 1 · Fecal Incontinence 1 · Urinary Diversion 1 · Infection/Prophylaxis 1.

**Conventions reinforced:**

- **Mine the site before going external.** The deleted `journals.ts` and inline article citations were the richest candidate source — recover from git history rather than rebuild from memory.
- **Watch dose/version collisions.** Nitti (OAB 100 U) vs Ginsberg (NDO 200 U) are separate must-knows; the distinction is stated in each `bottomLine` so the two Botox entries don't read as duplicates.
- **Deliberately excluded non-landmark items** surfaced by the sweep: stricture staging / PRO-validation papers (LSE, USS-PRO, Stricture-fecta), single-institution TURNS cohorts, and "urethral/ureteral rest" retrospective series — good citations, not practice-defining RCTs/registries. A future "key cohorts" tier could surface them if wanted.

---

## 2026-05-30 (later 2) — Landmark Trials expanded 21 → 42

**2 commits, fast-forwarded to `main`. Typecheck + lint + build clean; verified in-browser.** Grew the [Journal Club Landmark Trials database](src/data/trials.ts) from 21 to 42 trials, adding three new domains (Sexual Medicine, Surgical / Perioperative, Fecal Incontinence). Every trial's facts and DOI were verified by literature search this session — no figures from memory. Per the user's "more the merrier" with the standing "no stone / no cancer" scope guard.

### Round 1 — +9 trials (commit ecaedc0)

- **Sexual Medicine (new domain):** Sildenafil pivotal (Goldstein, NEJM 1998 — 69% vs 22% successful intercourse), IMPRESS I & II (collagenase for Peyronie's, J Urol 2013 — 34% vs 18% curvature), RestoreX RCT (penile traction, J Urol 2019).
- **Male SUI:** MASTER (sling vs AUS, Eur Urol 2021 — sling noninferior on continence, AUS better on secondary outcomes).
- **OAB / Urgency:** Ginsberg NDO phase-3 (onabotA 200 U for neurogenic detrusor overactivity, J Urol 2012).
- **BPH:** CombAT (dutasteride + tamsulosin, Eur Urol 2010).
- **Surgical / Perioperative (new domain):** STITCH (small-bites closure, Lancet 2015 — hernia 13% vs 21%), Darouiche (CHG-alcohol vs povidone skin prep, NEJM 2010 — SSI 9.5% vs 16.1%), ChEETAh (glove + instrument change, Lancet 2022 — SSI 16.0% vs 18.9%). These tie directly to the wound-closure, skin-antisepsis, and gloving foundations pages.

### Round 2 — +12 trials (commit d1836ac)

- **Stress Incontinence:** Ward-Hilton (TVT vs colposuspension, BMJ 2002 — the sling-establishing trial), SIMS (mini-sling vs MUS, NEJM 2022), ATLAS (pessary vs behavioral, Obstet Gynecol 2010).
- **OAB / Urgency:** InSite (sacral neuromodulation vs medical therapy, Neurourol Urodyn 2015 — 61% vs 42%), EMPOWUR (vibegron, J Urol 2020).
- **Fecal Incontinence (new domain):** CAPABLe (biofeedback / loperamide, Lancet Gastroenterol Hepatol 2019 — no clear winner).
- **Pelvic Organ Prolapse:** Altman Nordic TVM (transvaginal mesh vs colporrhaphy, NEJM 2011 — more durable but mesh-specific harms; kits later FDA-withdrawn).
- **BPH / Male LUTS:** L.I.F.T. (UroLift, J Urol 2013), Rezūm (water vapor, J Urol 2016), WATER (Aquablation vs TURP, J Urol 2018), PINNACLE (Optilume BPH drug-coated balloon, J Urol 2023). All ejaculation-sparing device trials — the reconstructively-relevant slice of BPH.

**Final distribution (42):** Stress Incontinence 7 · Mixed 1 · OAB/Urgency 7 · Fecal Incontinence 1 · Pelvic Organ Prolapse 8 · Urethral Stricture 3 · Male SUI/Prosthetics 3 · Sexual Medicine 3 · BPH/Male LUTS 6 · Surgical/Perioperative 3.

**Conventions reinforced:**

- **Verify, don't recall.** Every trial's N, effect size, journal, year, and DOI was confirmed by literature search before writing — facts are sourced to the primary papers, not produced from memory.
- **Scope guard held:** no stone/endourology or primary-cancer-oncology trials. BPH entries are deliberately the *device/procedure* trials (UroLift, Rezūm, Aquablation, Optilume, MTOPS, CombAT), which fit the functional/reconstructive lens better than pure medical-therapy studies.
- **Registry/cohort entries are labeled.** Non-RCT but practice-defining studies (InhibiZone, AUS-COT) carry a `caveat` field flagging the distinction so the table doesn't overstate evidence level.
- **Two new domains added by appending to `DOMAIN_ORDER`** in [LandmarkTrials.tsx](src/components/LandmarkTrials.tsx) — domain filter and ordering update automatically from the data.

---

## 2026-05-30 (later) — New Surgical Scrub & Hand Antisepsis page

**1 commit, fast-forwarded to `main`. Lint + build clean.** Added [surgical-hand-antisepsis.mdx](docs/01-foundations/perioperative-care/intraoperative-care/surgical-hand-antisepsis.mdx) in the Intraoperative Care aseptic-technique cluster (`sidebar_position: 6.5`, between Draping & Skin Antisepsis and Surgical Gloving — the real scrub → glove workflow order). Covers both accepted techniques (water-based CHG/povidone scrub: 2-min minimum, 5-min first / 3-min subsequent, nail pick not brush, CHG > povidone on CFU; waterless ABHR: 4–6 mL, stay wet, three-aliquot technique, 90-sec floor, less skin damage), shared principles (no brushes, remove artificial nails, soap-and-water when soiled or for *C. difficile*, 15-sec non-surgical minimum), and the rub-vs-scrub equivalence bottom line (Feng 2020 meta — 7 trials / 764 HCWs, no CFU difference; WHO 2016; Tanner Cochrane 2016). 7 refs, framed for long GU/prosthetic cases. Cross-linked bidirectionally with Gloving and Draping (distinguishes surgeon-side hand antisepsis from patient-side skin antisepsis). NEJM "Waterless Scrub Technique" figure intentionally omitted — copyrighted, no usable embed (house rule against caption-only figure blocks); the NEJM technique ref is cited inline instead.

---

## 2026-05-30 — Journal Club rebuilt as a Landmark Trials database

**3 commits, all fast-forwarded to `main`. Typecheck + lint + build clean; Vitest 6/6.** Per a new direction, the Journal Club section was redirected from a broad literature index into a curated, must-know **trials** database — click a trial, learn the home-run facts fast.

### New data + component (commit 217e82e)

- **[src/data/trials.ts](src/data/trials.ts)** — 21 high-yield trials across 7 domains (Stress Incontinence, Mixed UI, OAB/Urgency, Pelvic Organ Prolapse, Urethral Stricture, Male SUI/Prosthetics, BPH). Each entry is a "home-run snippet": `bottomLine` first, then `population` / `comparison` / `primaryOutcome` / `result` / optional `guidelineImpact` + `caveat`, plus `doi`. Trials: SISTEr, TOMUS, VALUE, OPUS, OPTIMAL, CARE, PROSPECT, Apical Suspension (2024 JAMA Surg), SUPeR, SAVE-U, SAM (Manchester), ABC, ROSETTA, SUmiT, OrBIT, ESTEEM, OPEN, Scandinavian Urethroplasty, ROBUST, AUS-COT, MTOPS. Beyond the user's seed list I added ROSETTA, SUmiT, OrBIT, SAM/Manchester, OPUS, MTOPS, AUS-COT as field-defining studies.
- **[src/components/LandmarkTrials.tsx](src/components/LandmarkTrials.tsx)** — searchable, domain-filterable table; **each row expands in place** to the key-facts panel (no per-trial pages). Domain-ordered, "N of 21 trials" count, deep-links to the paper via DOI.
- **`.lt-*` CSS** block in [custom.css](src/css/custom.css) — expandable rows, bottom-line callout, fact grid, dark-mode variants, mobile single-column.

### Replace entirely (commit 217e82e)

The old searchable 80-article **Journal Database** and the **Guidelines & White Papers** pages were retired; the trials table is now the whole section. [journal-club/index.mdx](docs/06-journal-club/index.mdx) is trials-only. Repointed the one real inbound link (pelvic-organ-prolapse See Also) to `/docs/journal-club`. Surfaced **Journal Club — Landmark Trials** at the top of the [Resources landing](docs/08-resources/index.mdx) (kept off the top navbar).

### Cleanup (commit a56d3b8)

Deleted the now-unreferenced `JournalTable.tsx`, its test, and `journals.ts` (the 80-article source). Vitest drops 8→6 tests, all passing.

**Conventions reinforced:**

- **Curation bar for Landmark Trials** — a trial earns a slot only if a fellowship-trained reconstructive surgeon or urogynecologist would know it on sight (set a standard, settled a debate, or changed the workup). Codified in the `trials.ts` docblock.
- **Centralize trial data, render uniformly.** All content lives in `trials.ts`; the component is the single renderer — add a trial by appending one typed object.

---

## 2026-05-29 (later) — Condition→atlas link audit + view-count pipeline + matcher tool + ~108-page video rollout

**6 commits, all fast-forwarded to `main`. Lint + typecheck + build clean (1,175 files).** A two-front initiative: (1) make every clinical-condition page hop cleanly to its management pages in the Treatment Atlas, and (2) scale up video embedding across the clinical core, ranked by views + recency.

### Condition → Treatment-Atlas cross-link audit (commit f8295e5)

Full audit/standardize of all 68 clinical-condition pages to the [urgency-incontinence-oab](docs/03-clinical-conditions/03a-storage-incontinence/urgency-incontinence-oab.mdx) model: an **early inline pointer** to the relevant atlas database/landing + a **`## See Also` block** of atlas management links immediately before `## References`. 56 pages updated across all 9 subsections (parallelized one subagent per subsection; every link target verified to exist; lint:links clean). The central [neurogenic-bladder](docs/03-clinical-conditions/03d-nlutd/neurogenic-bladder.mdx) page got its Management table wired to botox / SNM / augmentation / catheterizable-channels / bladder-neck-closure / diversion atlas pages. Deliberately left without atlas links (no genuine surgical-atlas target): dysfunctional-voiding (conservative; page cautions against outlet surgery) and pelvic-venous-disorders (IR-managed).

### Video pipeline now captures view counts (commit 2a34fd7)

[fetch-youtube-playlists.js](scripts/fetch-youtube-playlists.js) now requests `part=contentDetails,statistics` and carries per-video `viewCount`; [build-videos-registry.js](scripts/build-videos-registry.js) adds `views` to `VideoEntry`. `publishedAt` was already captured per item. Re-synced: 1,528 entries now carry view counts. This is the data the "prefer higher-view, recently-uploaded" selection rule needs.

### suggest-page-videos.js matcher (commit 64fae68)

New review tool [scripts/suggest-page-videos.js](scripts/suggest-page-videos.js): for each page, ranks candidate Video Library videos by keyword relevance (page title/H1/slug vs playlist + video title, with a small acronym-expansion map and a relevance floor), tie-broken on a **0.6·log-views + 0.4·recency** blend. Prints a per-page report and optional JSON. It does NOT edit pages — it's the selection aid. Over the clinical core it surfaced 237 pages with on-topic candidates and no `## Videos` yet (and flagged 236 with no matching playlist). Precision is imperfect by design (e.g. it offered BPH→"Female Bladder Outlet Obstruction"), so picks always get human/agent judgment.

### ~108-page video rollout across the clinical core (commit f9aec90)

Nine subagents (split by atlas subsection + one for conditions), each fed the matcher's per-page candidates, selected the 1-2 genuinely on-topic videos per page (prefer high-view + recent), cleaned titles/attribution via YouTube **oEmbed**, and inserted the standard `## Videos` block. **Quality over coverage was the explicit rule** — agents skipped a large fraction where no candidate truly fit (wrong flap, conservative-vs-surgical mismatch, female-page-with-male-video, marketing clips), and dropped a few IDs whose oEmbed returned 401/unavailable (embedding disabled). Net: ~108 clinical-core pages gained video cards; 141 clinical-core pages now have a `## Videos` section. 1,022 insertions; build + lint clean; no malformed IDs, no missing imports, no duplicate sections.

### Conventions established

- **The video-add workflow is now: re-sync → `node scripts/suggest-page-videos.js` → curate per page.** The matcher is a starting point, never authoritative — always confirm the pick is actually about the page's procedure and clean the card title via oEmbed.
- **Condition pages link to management; they don't duplicate it.** Early inline pointer + `## See Also` is the standard; skip the link when no genuine atlas target exists rather than forcing a weak one.
- **Bulk JSX edits via subagents must build centrally.** Subagents don't run the full build (concurrent builds race the `build/` dir); the orchestrator runs one `npm run build` after, per the run-build-after-MDX-HTML rule.

---

## 2026-05-29 — Video-resource cards on six pages + Video Library re-sync (1,323 → 1,522 videos)

**3 commits, all fast-forwarded to `main`. Lints + typecheck + build clean.**

### AUA Core Curriculum video cards (commits 807f133, 5822e9c)

Added `## Videos` blocks (VideoCards, immediately before `## References`) to six instrument / evaluation / perioperative pages, sourced from AUA University Core Videos and one obstetric-fistula masterclass:

- [rigid-cystoscope.mdx](docs/01-foundations/tools/instruments/endoscopy/rigid-cystoscope.mdx) — Rigid Cystoscopy (2024)
- [lowsley-retractor.mdx](docs/01-foundations/tools/instruments/urethral-specialty/lowsley-retractor.mdx) — SPT Placement via the Lowsley Retractor (2024)
- [frailty.mdx](docs/01-foundations/perioperative-care/preoperative-assessment/frailty.mdx) — Geriatric Assessment with the Short Physical Performance Battery (2025); placed on the frailty page rather than the special-populations geriatric-urology page because the video is specifically about the SPPB tool the page already tabulates
- [flexible-cystoscope.mdx](docs/01-foundations/tools/instruments/endoscopy/flexible-cystoscope.mdx) — Flexible Cystoscopy ×2 (Procedural Techniques + Step-by-Step Guide, 2025)
- [mag3-renal-scintigraphy.mdx](docs/02-evaluation/imaging/mag3-renal-scintigraphy.mdx) — Pediatric MAG3 Renal Scan (2025)
- [lone-star.mdx](docs/01-foundations/tools/instruments/retractors/lone-star.mdx) — Lone Star Retractor in Fistula Surgery (Masterclass in Obstetric Fistula)

Video titles/subtitles resolved via the YouTube oEmbed endpoint (`https://www.youtube.com/oembed?url=…&format=json`) so the cards carry accurate names and source attribution.

### Video Library re-sync (commit 21cd21f)

User significantly restructured the WARWIKI YouTube playlists; re-ran `npm run videos:sync` (fetch → build). Registry regenerated from **122 → 137 playlists** and **1,323 → 1,522 unique videos** (1,608 total playlist items; dedup to 1,522). Subspecialty split **251 combined / 963 GURS / 308 URPS** (was 234/789/300). Topic buckets unchanged at 28; new top picks: 298 Urethroplasty, 264 Upper Tract Reconstruction, 177 Prolapse, **110 Fistula** (was 20 — the largest mover), 71 Bladder Reconstruction, 68 Penile Prosthesis, 55 Surgical Technique, 51 OAB/UUI, 47 Urinary Diversion. Chunked output now spans **7 × 250-entry constants** (was 6); TS2590 guard holds — typecheck clean. `src/data/videos.generated.json` remains gitignored; only `src/data/videos.ts` is committed.

---

## 2026-05-27 — Video Library — searchable, faceted index of 1,323 WARWIKI YouTube videos as a new top-level navbar item

**10 commits, all fast-forwarded to `main`. Lints + typecheck + build clean across 1,175 files.** New `/video-library` standalone page; YouTube Data API pipeline that pulls every video on the WARWIKI channel and emits a typed registry; topic facet derived from playlist names; default grouped-by-topic layout with sort dropdown; promoted from Resources subsection to top-level nav; Library dropdown flattened into a single Resources link.

### Video Library scaffold (commit 65ffac7)

New standalone page at [`src/pages/video-library.tsx`](src/pages/video-library.tsx) (mirrors the `/quiz` pattern). Backed by typed [`src/data/videos.ts`](src/data/videos.ts) with a `VideoEntry` interface — `id` (YouTube ID), `title`, `channel`, `playlist`, `subspecialty`, optional `articleSlug` back-link into wiki pages, optional `topic`, `duration`, `year`, `tags`, `curated`. New [`src/components/VideoLibrary.tsx`](src/components/VideoLibrary.tsx) renders search box + faceted dropdowns + click-to-play thumbnail grid. New `.vl-*` CSS block in [custom.css](src/css/custom.css) — reuses `.vc-grid` / `.td-search` / `.td-select` to stay visually consistent with VideoCards and GenericDatabase. Seeded with 9 placeholder entries to validate the schema. Linked from [Resources landing](docs/08-resources/index.mdx) and the [Videos & Surgical Atlases page](docs/08-resources/surgical-video-atlases.mdx).

### YouTube Data API extraction pipeline (commit 1d05793)

Replaced the 8 Rick-Astley placeholders with the full WARWIKI catalog via two scripts and an `npm run videos:sync` end-to-end command:

- **[scripts/fetch-youtube-playlists.js](scripts/fetch-youtube-playlists.js)** — resolves `@warwikihq` → channel ID via `channels.list?forHandle`, paginates `playlists.list` (50/page) for the channel, then paginates `playlistItems.list` per playlist, then batch-fetches `videos.list?part=contentDetails` for ISO-8601 durations (50 IDs/call). Emits an intermediate `src/data/videos.generated.json` cache (gitignored). Quota cost per run ≈ 200 units (well under the 10k/day default). **Retry-with-exponential-backoff on 403/429/5xx** to ride out Google's edge-cache propagation drift on key-restriction changes — first run hit 403 partway through ("Requests from referer `<empty>` are blocked"); diagnosed as inconsistent cached restrictions across edge nodes after the user loosened the key; retry logic resolves it cleanly.
- **[scripts/build-videos-registry.js](scripts/build-videos-registry.js)** — reads the JSON cache, applies keyword-based subspecialty classification on playlist title (URPS / GURS / combined; URPS patterns checked first so e.g. "Urethral Mass: Diverticulectomy" doesn't mis-match the broad Urethroplasty rule), then emits typed `src/data/videos.ts`. **Output is chunked into 250-entry constants concatenated into the public `VIDEOS: VideoEntry[]`** — TypeScript otherwise produces a union type too complex to represent (TS2590) at this cardinality (TS 6.0.2). Header marks the file AUTO-GENERATED with the `npm run videos:sync` command.
- **[.env](#)** (gitignored — added to .gitignore in this commit; the pasted YT_API_KEY was flagged for rotation since it appeared in chat logs) + **[.env.example](.env.example)** committed with a placeholder + link to the Cloud Console setup.

Result: **1,323 unique videos across 122 playlists** auto-tagged 234 combined / 789 GURS / 300 URPS. Real thumbnails, real titles, real durations, real years.

### Topic facet (commit a6815cd)

Added a `topic` field to `VideoEntry` and a `classifyTopic()` function in [build-videos-registry.js](scripts/build-videos-registry.js) that maps each playlist-title prefix to one of **28 clean topic buckets**. Top buckets: 287 Urethroplasty, 203 Upper Tract Reconstruction, 169 Prolapse, 68 Penile Prosthesis, 67 Bladder Reconstruction, 51 OAB/UUI, 46 BPH, 44 Male SUI, 40 Urinary Diversion, 39 Grafts & Flaps, 39 Surgical Technique, 36 Female SUI, 35 Peyronie's Disease, 29 Trauma & Emergencies, 26 Evaluation, 23 Women's Health, 22 Neurourology, 20 Fistula, 16 Gender-Affirming Surgery, 14 Genital Reconstruction, 13 Urethral Mass, 9 Hidden Curriculum, 7 Vaginal Masses, 5 Radiation Therapy, 5 Urethrectomy, 5 Mesh Complications, 3 Pelvic Pain, 2 Other.

Rule ordering catches edge cases: permissive `/^Urethroplas/i` covers both "Urethroplasty" and the misspelled "Urethroplasy" present in one playlist; "Parastomal Hernia Repair" routes to Urinary Diversion (a diversion complication); "Penile Implant: \*" + "Testicular Prosthesis" both → Penile Prosthesis; "Peyronie's: \*" → Peyronie's Disease; "Technique: \*" + "Plastic Surgery Principles" → Surgical Technique.

Exposed in the UI as a third facet alongside subspecialty and playlist. Topic chip rendered on each card. Topic + playlist dropdowns dynamically re-scope to the active subspecialty so no dead options ever appear (e.g., picking Urethroplasty narrows the playlist dropdown to its 18 specific playlists).

### Navbar promotion + subspecialty UI removal (commit fb3d661)

Per user-flagged UX simplification: deleted the GURS / URPS / All subspecialty tabs and the per-card subspecialty chip. Search + topic + playlist were doing all the discriminating work anyway. The `subspecialty` field stays in the registry for any future view that wants it.

Promoted `/video-library` from a Resources subsection to a **top-level navbar item between Special Populations and the Library dropdown** in [docusaurus.config.ts](docusaurus.config.ts). Asset is too valuable (1,323 videos) to live three clicks deep. Footer "Library" group also lists it above Journal Club.

### Lee Zhao card update + tip removal (commit f844261)

His new searchable video library at **[video.leezhaomd.org](https://video.leezhaomd.org)** supersedes the YouTube channel as the canonical resource. Updated his [surgical-video-atlases.mdx](docs/08-resources/surgical-video-atlases.mdx) card to point there, renamed from "Lee C. Zhao MD" → "Lee C. Zhao MD — Video Library". Also dropped the `:::tip` callout about "catalog of sources vs catalog of videos" — redundant signage now that Video Library is in the main nav.

### Navbar restructure: Library dropdown → flat Resources (commit 523d25c)

Now that Video Library is a top-level nav item, the Library dropdown was just three loose links. Replaced with a single **Resources** left-nav link → `/docs/resources`. **Journal Club is hidden from the navbar but the page remains** (reachable via direct URL + footer link). **History & Lineage** moved into the [Resources landing](docs/08-resources/index.mdx) after Hidden Curriculum. Footer column header renamed "Library" → "Resources".

Final navbar: **Foundations · Evaluation · Clinical Conditions · Treatment Atlas · Special Populations · Video Library · Resources** (left) + Search · About · GitHub (right).

### Resources landing reorder + Podcasts rename (commit 956f1ca)

Podcasts page renamed to **"Podcast Library"** (frontmatter title aligned with the page's existing H1). On the Resources landing: Podcast Library moved to sit directly under Videos & Surgical Atlases (parallels the Video Library ↔ Atlases pairing); Quiz moved down to sit under Textbooks. Final order: Videos & Surgical Atlases → Podcast Library → Patient Resources → Textbooks → Quiz → Websites & Online Tools → Hidden Curriculum → History & Lineage.

### Grouped-by-topic + sort dropdown (commits 1d26004 + 949c55d)

Initially added as a Grid / Grouped view toggle with a sort dropdown — five sort modes (Playlist order default / Recently uploaded / Longest first / Shortest first / Alphabetical), and a Grouped view that buckets cards under topic headings with a count chip per section. Group order follows the active sort mode (under "Recently uploaded" the topic with the newest upload appears first).

After user feedback ("the grouped version should just be the default"), **removed the toggle entirely** and made **grouped-by-topic the only view**. The `.vl-view-*` CSS block was deleted along with it. Sort dropdown remains — it now reorders both groups (by first item's sort key) and items within each group.

Also dropped the "About this library" `<details>` block from the page — unnecessary now that the page is in the main nav and the controls are self-explanatory.

### Video Library entry removed from Resources landing (commit cb92370)

Per user feedback ("video library does not need to live in the resources section"). Top-level navbar item replaces the need for a duplicate Resources tile.

### Conventions reinforced

- **API keys pasted into chat are compromised by definition** — they're in terminal scrollback, session logs, and any transcript downstream. Rotate-then-restrict (HTTP referrer for browser keys; IP / "none + secrecy" for server keys) is the only safe path. `.env` must be gitignored *before* the key gets near the repo.
- **Permissive `.env` gitignore** — plain `.env` was missing from [.gitignore](.gitignore) prior to this session; only `.env.local` / `.env.development.local` / etc. were listed. Added `.env` explicitly.
- **TypeScript TS2590 cardinality** — at ~1,300+ literal entries with an explicit `: VideoEntry[]` annotation, TS 6.0 still produces "union type too complex to represent" when widening element literals. Workaround: chunk the array (250-entry constants concatenated into the public export). Same pattern will fit any future large auto-generated registry.
- **Grouped-by-topic is the right default for large libraries.** A flat 1,323-card grid is hard to scan; topic-grouped reads like a textbook TOC and matches how reconstructive surgeons mentally index by procedure. Sort still applies *within* groups; a "playlist order" default keeps each group in the channel's curated sequence.
- **Hide-from-navbar ≠ delete.** Journal Club's page wasn't removed — only its nav-dropdown entry. Direct URL + footer link preserve access. Easy to re-surface whenever the journal database is ready to grow.
- **Subspecialty data outlives subspecialty UI.** Removing the GURS / URPS / All tabs didn't touch the `subspecialty` field in `videos.ts` — keeps optionality open for a future filtered view (e.g., a quiz-mode subspecialty filter or a per-subspecialty deep-link) without re-running the pipeline.

### Things to circle back on

- **Curated `articleSlug` back-links.** Zero `articleSlug` values are populated today. Hand-curating playlist-name → wiki-article-slug mapping (e.g., "Urethroplasty: Kulkarni" → `/docs/.../kulkarni-orandi`) would let the **Open article →** chip actually appear on cards. Realistic path: a `scripts/build-article-slug-map.ts` keyed by playlist title with ~120 entries, applied during `videos:build`.
- **Topic auto-tagging audit.** 28 topics is good shape, but some bucketings are heuristic — "Penile Implant" mapped to **combined** subspecialty (not classified by any GURS pattern); "OAB: Botox" mapped URPS; "Urethrectomy" stayed GURS despite being oncologic-adjacent. Worth a one-pass review before promoting to a public-facing resource.
- **Rotate `YT_API_KEY`.** Original key was pasted in chat and remains in conversation logs. New key should be IP-restricted (Cloud Run / dev box IP) for server-side use; the browser-side key (referrer-restricted) is a separate credential.
- **Decompacting auto-generated `videos.ts` diffs.** When the channel grows new playlists, the regenerated file diff is dense (chunked literal arrays). One option: emit each chunk to its own file (`videos-chunk-0.ts`, ...) so diffs stay per-chunk; videos.ts re-exports the union.

---

## 2026-05-26 — Female AUS expansion + new Urethrolysis page + new Urethrectomy page + rectal-injury management + CI permissions fix + 2 SUFU video link cards + IUGA channel

**9 commits, all fast-forwarded to `main`. Lints + typecheck + build clean across 1,174 files.** Two new procedure pages (Urethrolysis, Urethrectomy), one major section added to an existing foundations page (rectal-injury management on bowel-handling-injury-management), one major section added to an existing procedure page (Female AUS bladder-neck placement on the AUS procedure page), CI permissions fix for the external-links cron, plus three small video-resource additions.

### CI permissions fix (commit d93e00f)

The nightly external-links cron at [.github/workflows/external-links.yml](.github/workflows/external-links.yml) was failing on the auto-issue step with `HttpError: Resource not accessible by integration`. Root cause: default `GITHUB_TOKEN` is read-only on issues in newer repo defaults; `github.rest.issues.create` needs `issues: write`. Added an explicit `permissions:` block to the workflow (contents: read, issues: write). The Node 20 deprecation warning in the same run is informational and not actionable yet — no newer majors of `actions/checkout`, `actions/setup-node`, `actions/upload-artifact`, or `actions/github-script` are available; GitHub will force Node 24 in June 2026.

### Female AUS — Bladder Neck Placement section (commit e7fbff2)

[artificial-urinary-sphincter.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx) previously carried one marginal sentence on female AUS under Special Populations. Replaced with a full dedicated section covering:

- **Indications** — AUA/SUFU 2023 salvage framing (failed prior anti-incontinence surgery, severe ISD, neurogenic SUI). Expert consensus recommends referral after maximum two prior surgical procedures; pelvic radiotherapy is a relative contraindication.
- **Three surgical approaches** — open retropubic (vaginal route abandoned; consensus favors retropubic without opening the vagina, Grade B), laparoscopic (Bracchitta 2019 n=74, 78% complete continence / 19% improvement at 45 mo), and robot-assisted with anterior vs posterior variants. Dubois 2025 multicenter open-vs-robotic comparison (n=135) reported robotic with lower intraop complications (12.7% vs 27.4%), lower postop complications (15.5% vs 46.8%), higher full continence (83.3% vs 62.3%), and lower explantation (1.4% vs 27.4%).
- **Device specifications in women** — cuff size median 7.0 cm (range 6.5–8 cm, substantially larger than male bulbar 3.5–6 cm; 5.5–9 cm in neurogenic series), 61–70 cmH₂O PRB the default, 71–80 cmH₂O at surgeon discretion, PRB fill 22–27 mL, labia majora pump, activation at 4–6 weeks.
- **Outcomes** — Peyronnet 2019 meta of 964 women, 80% complete continence (95% CI 72–87) at 22 mo. Full complications table (mechanical failure 2–47%, vaginal/urethral erosion 0–27%, infection 0–46%, revision 6–44%, explantation 2–44%). Phé 2017 neurological cohort: 20-yr explantation-free survival >74% with ~50% requiring at least one revision by 5 yr.

13 new refs (56–68) appended with stable parallel `ref-author-year-journal` anchors. Source cleanup: dropped "Would you like to explore" trailing prompt, dropped `undefined` Figure 2 caption, rebuilt the mashed `ComplicationRate (Range)References` table with proper delimiters.

### Urethrolysis — new procedure page + step-by-step technique (commits 3df5d65 + ff8aa89)

New [urethrolysis.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/urethrolysis.mdx) at sidebar position 17. Salvage operation for iatrogenic BOO after anti-incontinence surgery — incidence 2.5–24% after anti-incontinence procedures, 50–75% of obstructed patients ultimately require surgical correction.

**Initial page (commit 3df5d65)** covered:
- Gleich/Goldman 2025 NUU terminology proposal (reserve "urethrolysis" for extensive dissection vs "sling incision/excision" for simpler procedures).
- Indications and diagnosis table (history, uroflow, PVR, multichannel UDS limits in women, cystoscopy); ACOG CO 694 6-week threshold for considering sling release after MUS.
- Approach comparison table — simple sling incision (70–90% success, ~20% recurrent SUI), transvaginal urethrolysis (73–85%), retropubic urethrolysis (78–86%), suprameatal (65–67%), lap/robotic feasibility.
- Outcomes — 60–90% BOO resolution, 20–40% recurrent SUI, higher PVR as failure predictor.
- Decision pearls (MUS → sling incision first; post-Burch → formal urethrolysis; Martius interposition for redo / heavy scarring / urethrotomy).
- 10 refs (Gleich 2025, Carr/Webster 1997, ACOG CO 694 2017, Petrou 1999, Moore/Goldman 2013, Cross/Cespedes 1998, Erdemoglu 2021, Orasanu 2014, Oliver/Raz 2018, Nitti/Raz 1994) with stable parallel anchors. Cross-links wired from [retropubic-midurethral-sling.mdx](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/retropubic-midurethral-sling.mdx) voiding-dysfunction row, [mesh-complications.mdx](docs/04-surgical-techniques/04g-prolapse-repair/mesh-complications.mdx) voiding-dysfunction section, and [underactive-bladder.mdx](docs/03-clinical-conditions/03b-voiding-outlet/underactive-bladder.mdx) sling-incision pearl.

**Step-by-step technique expansion (commit ff8aa89)** — new `## Operative Technique by Approach` major section with five detailed H3 blocks:

1. **Simple sling incision** — right-angle clamp + sharp transection workflow; cystoscope sheath as palpation aid when the sling is hard to locate; fascial-sling 2-week scar-in window where retropubic suture release alone is inadequate.
2. **Formal transvaginal urethrolysis** — periurethral dissection, endopelvic fascia perforation with heavy Mayo, sharp suture removal with right-angle clamp under finger guidance, manual-pressure hemostasis on the inferior pubis.
3. **Suprameatal urethrolysis** — semilunar 1 cm supra-meatal incision, perineal membrane perforation, index-finger sweep into retropubic space, endopelvic fascia preservation. Petrou 13/20 in urinary retention voided well.
4. **Open retropubic** — Pfannenstiel, Retzius dissection, index-finger plane as completion landmark, peritoneal/omental flap interposition. Anger 78% vs 43% post-Burch comparison.
5. **Martius fat-pad flap interposition** — sagittal labial incision, tunneled transfer, anchoring sutures in superficial detrusor. Carey 2003 87% resolution / 13% SUI; Oliver-Raz salvage emphasis.

New Postoperative Management table with five catheter-duration scenarios (sling-incision void trial; suprameatal+Martius 5 d; cystorrhaphy 1–2 wk; visualized injury 2 wk; inaccessible injury 2–3 wk + cystourethrogram).

2 new refs (Waterloos 2019 BiomedRes, Carey 2003 Urology). Deliberately NOT added to the female SUI database — urethrolysis treats a complication of SUI surgery rather than SUI itself; database row would mislead. Cross-links from the sling pages handle discoverability.

### Bowel injury — Rectum section (commit 0e7f057)

[bowel-handling-injury-management.mdx](docs/01-foundations/surgical-principles/bowel-handling-injury-management.mdx) previously covered small bowel and colon. Added a focused `### Rectum` subsection between Colon and Thermal:

- **Anatomy-first decision** — intraperitoneal upper-third managed as colon; extraperitoneal middle/lower-third still mostly diverted. Brown 2018 AAST multi-institutional (n=785): proximal diversion NOT associated with improved outcomes for intraperitoneal injuries (abdominal complications 22% with diversion vs 10% without, p=0.003). Junior 2026 international survey: ~81% of surgeons avoid routine colostomy for stable intraperitoneal injuries. EAST 2016 PMG (Bosarge) conditionally recommends proximal diversion for penetrating extraperitoneal injuries despite small evidence base (26 nondivert vs 532 divert).
- **AAST Rectum grading table** I (observe) → V (resect+divert) with per-grade default management.
- **Two-layer repair technique** — inner running absorbable (3-0/4-0 polyglactin) for mucosa-submucosa, outer interrupted seromuscular imbricating layer, optional third reinforcing layer; transverse closure when feasible; debridement of devitalized edges; TAMIS/TEM for low extraperitoneal injuries; **omental flap interposition between rectal repair and adjacent reconstruction** (urethrovesical anastomosis, vaginal cuff, AUS cuff) as the standard of care after RALP / RARC / RVF.
- **Abandoned adjuncts** — presacral drainage and distal rectal washout. AAST multi-institutional: presacral drain OR 2.6 (p=0.02), distal washout OR 3.4 (p=0.008) for abdominal complications. EAST and WSES against routine use.
- **Damage-control rules** — defer definitive repair; bowel discontinuity or diverting stoma; delayed primary anastomosis at 48–72 h relook; leak 16.7% damage-control vs 3.2% otherwise.
- **Decision pearls** — Yee/Ornstein 2008 RALP rectal-injury technique as the standard urology reference; prior pelvic radiation → divert without hesitation.

Also added a matching bullet to the Reconstructive-Urology / Urogyn Implications section pointing back to the new Rectum subsection.

10 new refs (28–37). Source cleanup: deduplicated 4 refs already in the page (Smyth WSES bowel injury, Tang meta, Coccolini source control, Manley loop ostomy); dropped two truncated obstetric-laceration refs (Arnold 2021, Tunney 2023) as out of GU-reconstruction scope; rebuilt the truncated Grade II row; dropped "Would you like to explore" trailing prompt.

### Urethrectomy — new page in Urethral Reconstruction atlas (commit 83a7a6e)

New [urethrectomy.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/urethrectomy.mdx) at sidebar position 30. Framed for reconstructive urologists as "masters of the urethra" who are routinely called to perform or assist with urethrectomy at radical cystectomy — the decision shapes orthotopic neobladder candidacy and, in proximal urethral carcinoma, phallic preservation. Primary urologic oncology is out of WARWIKI scope, but urethrectomy is the textbook reconstructive-consequence example.

- **Indications** — AUA/ASCO/SUO 2024 MIBC guideline (high-grade apical urethral margin, women not undergoing neobladder); classic Ahlering/Skinner 1984 indications; NCCN 2026 primary-urethral-carcinoma treatment table (T2 pendulous → distal urethrectomy or partial penectomy; T2 bulbar → urethrectomy ± cystoprostatectomy; T2 female proximal → urethrectomy + cystectomy; T3/T4 → chemoRT preferred).
- **Male technique** — prepubic workhorse (Joniau 2007 single-center 20-yr n=180, adds ~17 min); Hiebl 1999 urethral-stripping modification (18 Fr catheter + sutured distally + stripped free, 20–30 min); perineal "inside-out" technique; en bloc transpubic with March 2023 phallus-preservation arterial anatomy (superficial penile arteries from external pudendal as remnant blood supply); laparoscopic (Castillo 2007 5-port + perineal extraction); robotic side-docking (Chan 2015) + Zennami 2024 urethra-preserving technique (0/134 urethral recurrences).
- **Elshal 2011 prepubic-vs-perineal comparative outcomes table** — OR time 174 vs 209 min (p=0.003), LOS 14.5 vs 17.6 d (p=0.047), Clavien G4–5 9.5% vs 28% (p=0.033).
- **Female technique** — anterior exenteration framing; Hinata 2012 histology (vaginal-wall smooth muscle contributes to urethral wall; middle urethra tightly attached to vaginal smooth muscle with abundant veins at the interface; antegrade dissection EBL ~965 mL); Colleselli 1998 sphincter morphology (rhabdosphincter fibers in middle/caudal thirds); Parsons 2003 rectus abdominis myocutaneous flap vaginoplasty after anterior exenteration.
- **Risk-stratified oncologic outcomes** — Laukhtina 2022 multicenter (n=887): no overall benefit, high-risk subgroup HR 0.58 for progression (p=0.04); Hakozaki 2021 propensity-matched: 5-yr OS benefit in multiple-tumors / concomitant CIS (p=0.021); Mennes 2025 BJU propensity-matched n=332: 10-yr OS 47.3% vs 27.5% (p=0.002). Urethral recurrence after cystectomy without urethrectomy 4–18% with uniformly poor prognosis.
- **Reconstructive Implications section** — neobladder candidacy is committed before the diversion step; frozen-section apical margin is the intraoperative tool; phallus preservation as reconstructive contribution; rectus-flap vaginoplasty as reconstructive contribution to female anterior exenteration.

22 refs with stable parallel anchors. Source cleanup on the user's two-part draft: merged 4 overlapping refs (Holzbeierlein, NCCN, Joniau, Laukhtina appeared in both halves); dropped the Kawa Omar book chapter (weak citation metadata); dropped two "Would you like to explore" trailing prompts; dropped truncated NCCN PCU-2 placeholder + "Figure 19 ... undefined"; rebuilt the mashed complications table with proper delimiters.

Cross-links wired from [urinary-diversion-principles.mdx](docs/04-surgical-techniques/04c-urinary-diversion/urinary-diversion-principles.mdx) (Principle 6 Continence — the "neobladder candidacy is committed before diversion" point) and [ileal-conduit.mdx](docs/04-surgical-techniques/04c-urinary-diversion/ileal-conduit.mdx) See Also. Deliberately NOT added to the female/male urethroplasty databases — urethrectomy is destructive, not reconstructive, would mislead users browsing for stricture options.

### Three video-resource link additions

- **IUGA Vimeo channel** (commit ab7ca22) — added `https://vimeo.com/iuga` as a `web-card--urps` after AUGS in the Urogynecology & Pelvic Floor Channels section of [surgical-video-atlases.mdx](docs/08-resources/surgical-video-atlases.mdx).
- **SUFU operative video — transurethral dorsal BMG urethroplasty** (commit 531737a) — added a new `## Videos` section to [female-dorsal-inlay-bmg.mdx](docs/04-surgical-techniques/04a-urethral-reconstruction/female/female-dorsal-inlay-bmg.mdx) linking to the SUFU Surgical Video Library entry for the Linder/Jefferson technique. Direct Vimeo embed declined because the video has `domain_status_code: 403` on Vimeo's oEmbed (Vimeo PRO domain-restriction to sufuorg.com); external link card opens in a new tab.
- **SUFU 2026 vaginal-manipulator comparison video** (commit 7038486) — added a new `## Videos` section to [uterine-manipulator.mdx](docs/01-foundations/tools/instruments/urethral-specialty/uterine-manipulator.mdx) linking to the SUFU Surgical Video Library entry on "MIS Sacrocolpopexy: A Comparison of Vaginal Manipulators". Same domain-restriction pattern.

### Conventions reinforced

- **SUFU Surgical Video Library entries should use external link cards, not iframe embeds.** SUFU videos are Vimeo-hosted with domain-level privacy restricting embed to sufuorg.com. Vimeo oEmbed returns `domain_status_code: 403` — a quick way to detect this before wasting effort on an iframe that will fail. Saved as a feedback memory.
- **Section frontmatter** — `subspecialty: combined` is the right default when both URPS and GURS may participate (Urethrectomy, Urethrolysis, Female AUS — all GURS-leaning but URPS-relevant in multidisciplinary settings). `subspecialty: GURS` reserved for clearly fellowship-exclusive content. The "prove it" standard from 2026-05-23 holds.
- **Out-of-scope topics with strong reconstructive consequences are in-scope when framed correctly.** Urethrectomy is a urologic oncology procedure but is framed as the determinant of diversion candidacy + the locus of phallic preservation; this is the canonical "gray zone" pattern from CLAUDE.md's scope rules.
- **Destructive procedures do not belong in reconstructive databases.** Urethrectomy added to the Urethral Reconstruction atlas via sidebar position only, not as a row in the male/female urethroplasty treatment databases — the databases are for *restorative* options; adding ablative procedures would mislead readers browsing for stricture options. Same logic applied to Urethrolysis (treats a complication of SUI surgery; not a SUI treatment) which was also kept out of the female SUI database.
- **Always check existing reference list for duplicates before appending new ones.** The user-supplied bowel-rectal draft included 4 refs already on the page (Smyth WSES, Tang meta, Coccolini source control, Manley loop ostomy); the urethrectomy two-part draft included 4 overlapping refs (Holzbeierlein, NCCN, Joniau, Laukhtina). Caught and merged in both.

---

## 2026-05-23 — Platform infrastructure wave + quiz / decision tree / responsive table / freshness components + bowel-anastomosis expansion + new Stoma Site Marking page

**8 commits, all fast-forwarded to `main`. Lints + typecheck + build + 8/8 Vitest tests clean across 1,173 files.** A mixed platform + content session — the platform half added WARWIKI's first CI, test surface, contributor docs, and four pieces of authoring infrastructure (freshness lint, stable ref IDs, external-link rot, build-perf baseline); the content half integrated user-supplied Slieker 2013 detail into bowel-anastomosis, authored a new Stoma Site Marking foundations page from the ASCRS / WOCN / AUA evidence base, and seeded the new `lastReviewed:` frontmatter convention on the first two pages.

### Bowel cross-link mesh closed (commit 7c4bf14)

Wired all four bowel-related foundation pages into a bidirectional cross-link mesh so a reader on any one of [bowel-anastomosis](docs/01-foundations/surgical-principles/bowel-anastomosis.mdx) / [bowel-handling-injury-management](docs/01-foundations/surgical-principles/bowel-handling-injury-management.mdx) / [reoperative-bowel-harvest](docs/01-foundations/surgical-principles/reoperative-bowel-harvest.mdx) / [bowel-segments](docs/01-foundations/tools/biomaterials/autologous-tissue/bowel-segments.mdx) sees the other three as upstream/downstream phases. Fixed a **real broken link** in reoperative-bowel-harvest pointing to `/grafts/intestinal-segments` (page never existed at that path) — internal-link lint did not flag it because the page itself wasn't orphaned, only its outbound target was wrong. Bowel pages stay separated rather than merged: the 80%+-shared-content consolidation rule does not apply when three pages answer three different intraoperative questions (handling / harvest / anastomosis) with minimal content overlap.

### CI + CONTRIBUTING + scripts wave (commit 354321f)

**First WARWIKI CI pipeline** at [.github/workflows/ci.yml](.github/workflows/ci.yml) — runs `npm ci` → lint → typecheck → Vitest → build → freshness advisory (non-blocking) on every PR and push to main. Vercel previews continue to catch build errors; CI catches lint / typecheck / test regressions that Vercel did not.

**Nightly external-link cron** at [.github/workflows/external-links.yml](.github/workflows/external-links.yml) — runs [scripts/check-external-links.js](scripts/check-external-links.js) with a sample of 200 URLs/day, deterministic-by-day seed so the sample rotates but is reproducible within a day, uploads JSON artifact, opens an auto-issue tagged `link-rot` when broken links are detected. DOI links use GET (HEAD frequently returns 405); 429 / 403 treated as soft-fail (rate-limit or bot block, not real link rot).

**New advisory scripts:**

- **[scripts/check-freshness.js](scripts/check-freshness.js)** — scans every `docs/**/*.mdx` for `lastReviewed:` frontmatter; >18mo = warn, >30mo = stale, missing = unreviewed. Non-blocking. JSON mode for CI consumption. Index pages skipped (freshness is a per-article concern).
- **[scripts/check-external-links.js](scripts/check-external-links.js)** — described above; supports `--sample N`, `--all`, `--domain filter`, `--seed`, `--concurrency`, `--timeout`, `--json`.
- **[scripts/measure-build.js](scripts/measure-build.js)** — wraps `npm run build` with wall-clock + peak-RSS sampling + page count, appends one tab-delimited line per run to `build-perf.log` (gitignored). Surfaced as `npm run bench:build`. Long-term baseline for regression detection.
- **[scripts/migrate-stable-ref-ids.js](scripts/migrate-stable-ref-ids.js)** — dry-run-by-default tool that adds a parallel content-derived anchor (`<a id="ref-author-year-journal"></a>`) next to every numbered `<a id="refN"></a>`. Preserves numbered IDs so existing `<sup>[[N]](#refN)</sup>` inline cites keep working. Dry-run on the entire `surgical-principles/` directory shows 1,574 anchors across 62 files, 15 per-file collisions auto-resolved by numeric suffix. Recommended workflow: dry-run a subdirectory, eyeball proposed IDs, `--write` to that subdirectory, verify build, expand outward.

**[CONTRIBUTING.md](CONTRIBUTING.md) (new, 200+ lines).** First explicit contributor handbook. Captures scope (in / out / gray-zone), voice (formal academic, reconstructive-surgeon audience, no consumer disclaimers), citation pattern (anchored superscript + bottom anchor + GAS footnote variant), MDX gotchas (escape angle brackets, escape ampersands in JSX attrs, no `$$...$$` LaTeX), the new `lastReviewed` / `reviewer` / `subspecialty` / `key_point` frontmatter convention, stable-ref-ID convention, before-committing checklist, the consolidation rule (80%+ shared content), the split-medical-from-surgical-content rule (RPF ↔ ureterolysis, urethral stricture ↔ urethroplasty family), the treatment-atlas pattern (landing-page-as-database), hidden-page rule (must remain reachable from a visible hub), test workflow, authorship/review workflow, and a quarterly off-GitHub backup recommendation (git bundle + second remote mirror) as bus-factor insurance for a single-author wiki.

**package.json** — new scripts: `lint:freshness`, `lint:external-links`, `bench:build`, `test`, `test:watch`, `test:e2e`. `lint` composite unchanged (freshness is intentionally not part of the blocking suite).

### Test infrastructure (commit cce32b5)

**[vitest.config.ts](vitest.config.ts)** — jsdom env, `@vitejs/plugin-react` for automatic JSX, alias map for `@site` + stubbed `@docusaurus/Link` / `@docusaurus/useDocusaurusContext` so component unit tests don't need the Docusaurus router. **[vitest.setup.ts](vitest.setup.ts)** registers `@testing-library/jest-dom` matchers. Test stubs at [src/test/stubs/](src/test/stubs/).

**Component smoke tests (8 tests, all passing):**

- [GenericDatabase.test.tsx](src/components/GenericDatabase.test.tsx) — renders rows, renders headers, renders badge cells without crashing, filters when `filterKey` is provided.
- [JournalTable.test.tsx](src/components/JournalTable.test.tsx) — mounts without throwing, exercises the trial-acronym `<mark className="jt-acronym">` highlighting.
- [SurgeonsExplorer.test.tsx](src/components/SurgeonsExplorer.test.tsx) — renders tab list with default GURS, exercises subspecialty switch. **This test surfaced a real React duplicate-key warning** for `brian-inouye` in [src/data/surgeons.ts](src/data/surgeons.ts) — fixed in commit 8ae44e9 by removing the orphan duplicate record.

**[playwright.config.ts](playwright.config.ts)** + **[tests/e2e/sitemap.spec.ts](tests/e2e/sitemap.spec.ts)** — reads `build/sitemap.xml`, optionally samples a subset (`WARWIKI_E2E_SAMPLE=N`), asserts every URL returns <400 + renders a visible `<main>` + has no real console errors (Algolia / google-analytics warnings filtered as known-benign). Run sequence: `npm run build` → serve `build/` → `npm run test:e2e`. Designed for a separate CI job because it's slower than the lint+test+build path.

**New devDependencies:** `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@vitejs/plugin-react`, `@playwright/test`. CI's `npm ci` picks them up automatically.

### Site components + quiz (commit 7774b98)

**Quiz page at [/quiz](src/pages/quiz.tsx) (~250 lines).** Subspecialty tabs (GURS / URPS / Combined) persist via localStorage. SM-2-lite scheduler in [src/data/quiz/scheduler.ts](src/data/quiz/scheduler.ts) — Wrong resets interval to 1d + decrements ease 0.2; Hard interval × 1.2 with ease −0.15; Good interval × ease; Easy interval × ease × 1.3 with ease +0.15. Ease clamped 1.3–2.7. `dueScore = lastSeen + intervalDays − now`; sorting picks the most overdue first, randomizes among ties. Card UI shows subspecialty + tags, four answer buttons that visually show right/wrong on reveal, an evidence-grounded explanation, source-page link, and Wrong / Hard / Good / Easy rating chips. About panel includes a "Reset progress" button.

**12 starter questions** in [src/data/quiz/questions.ts](src/data/quiz/questions.ts) with stable IDs and source-page back-links. Final distribution after the user-requested audit (next bullet): **5 GURS / 3 URPS / 4 combined**. Subspecialty tagging docblock at the top of the file codifies the "prove it" rule with positive examples per bucket.

**Decision tree component** at [src/components/DecisionTree.tsx](src/components/DecisionTree.tsx) — radio-button-driven, deterministic, every leaf carries a `result`, a `rationale`, and optional citations back to source pages. First worked example in [src/data/decisionTrees/reoperative-bowel.ts](src/data/decisionTrees/reoperative-bowel.ts) codifies the algorithm in reoperative-bowel-harvest §3 (colostomy switch → exenteration / colon conduit → prior radiation / transverse colon → prior ileal resection / colon segment → standard ileal). Path crumb shows the question-answer history; "Start over" resets state.

**Responsive table component** at [src/components/ResponsiveTable.tsx](src/components/ResponsiveTable.tsx) — opt-in. Desktop renders a normal styled table reusing the existing CSS palette; mobile (≤640px) collapses to one card per row with the column header as label. CSS rules added to [src/css/custom.css](src/css/custom.css). Plus a separate **sticky-first-column rule** on standard markdown tables at ≤768px so horizontally-scrolling comparison tables keep the row label visible while the reader scans right.

**Freshness badge** at [src/components/FreshnessBadge.tsx](src/components/FreshnessBadge.tsx) — opt-in MDX import. Reads `lastReviewed` + optional `reviewer` props, computes months-since, renders a colored chip: ≤12mo green "FRESH" / 13–18mo blue "CURRENT" / 19–30mo amber "STALE SOON" / >30mo red "STALE". Renders `null` on missing or unparseable date so legacy pages degrade silently. Thresholds mirror `scripts/check-freshness.js`.

**Resources index** — quiz linked under "Videos & Surgical Atlases" (commit d85619b moved it to that position per user request; was originally at the top).

### Quiz subspecialty audit (commit d85619b)

User-requested audit applying the **"prove it" rule** — only claim GURS or URPS when the content is something the other fellowship would not be expected to own; default to combined when uncertain. Two reclassifications:

- **icg-leak-reduction**: GURS → combined. ICG fluorescence angiography is used across both fellowships (any abdominal-pelvic surgeon assesses tissue perfusion). Cannot prove GURS-exclusive.
- **vitamin-b12-monitoring**: combined → GURS. Surveillance schedule is specifically anchored to ileal-based diversion / neobladder / augmentation — GURS-side reconstructive procedures.

Other 10 questions held under the test. Final distribution: **5 GURS / 3 URPS / 4 combined**. Tagging docblock rewritten with explicit positive examples per bucket (GURS = post-cystectomy diversion / ileal-based reservoir / male urethroplasty / GAS / etc.; URPS = female SUI device-specific / apical prolapse / fistula / urogyn ERAS specifics / etc.; combined = anatomy / pharmacology / perioperative / ICG / NLUTD / nutrition / instruments) plus the default-to-combined rule. Physical section ordering in the file synchronized with the new tags so `combined-icg-leak-reduction` sits in the Combined block and `gurs-vitamin-b12-monitoring` sits in the GURS block.

### Surgeon data dedupe (commit 8ae44e9)

Vitest SurgeonsExplorer test surfaced "Encountered two children with the same key, `brian-inouye`" — duplicate entry in [src/data/surgeons.ts](src/data/surgeons.ts). One entry at line 456 in the Andrew Peterson fellows group with `mentorId: 'andrew-peterson'` (correct — matches Peterson's 2020–21 `traineeIds` list at line 427 and the existing `brian-inouye.mdx` profile page). Second entry at line 627 as an orphan record with no `mentorId`, mixed into the Jordan/Gonzalez section. Orphan removed. Confirms the new test surface is catching real signal.

### Bowel-anastomosis expansion (commit e46d78b)

Integrates user-supplied Slieker 2013 systematic-review detail (already cited as ref13) and adds **Burch 2000 RCT (new ref27)** for the polypropylene-as-acceptable-monofilament data point:

- **Suture Material** — dual recommendation. Slowly absorbable monofilament (PDS / polyglyconate) **or** nonabsorbable monofilament (3-0 polypropylene per Burch 2000 RCT). Added mechanistic notes on why multifilament (silk, polyglactin) harbors bacteria within interstices and why rapidly absorbable suture dissolves before adequate collagen deposition.
- **Inverting vs Everting** — **corrected**. Prior wording said "no clear advantage or disadvantage in experimental comparison," which understated Slieker's actual finding (5-fold increased anastomotic leak with everting vs inverting per RCT). Now reads as evidence-grounded. Adhesion-vs-stenosis trade-off noted as the only countervailing data point, but the leak signal dominates.
- **Specifications** — rebuilt as a 6-row evidence table. Greenall RCT (5 mm vs 10 mm bite, no significant leak difference, cited via Slieker). Yao 2016 rat-model intersuture data (1.5 mm vs 2.5 mm, preclinical). Submucosa always. Full-thickness or serosubmucosal both acceptable (0–4.4% cohort leak). Moderate tension (rat data only). Avoid eversion (cross-refs the 5× leak signal). Removed the prior "slight eversion acceptable" claim that contradicted the corrected Inverting vs Everting section.
- **New summary table** — "Ideal Single-Layer Continuous Anastomosis" recap with 8 parameters and evidence levels.
- **Burch 2000 reference** — added with both `<a id="ref27"></a>` and parallel stable anchor `<a id="ref-burch-2000-ann-surg"></a>`, demonstrating the stable-ID convention on a single new reference.
- **First page to use the new frontmatter convention** — `lastReviewed: 2026-05-23`, `reviewer: NS`, `subspecialty: combined` (bowel anastomosis principles are universal — both fellowships face them, even though the urinary-diversion use case is GURS-leaning), `key_point` summarizing the single-layer continuous inverting recommendation. Sets the precedent for retrofitting other pages.

### New page: Stoma Site Marking (commit 6db3fac)

[docs/01-foundations/surgical-principles/stoma-site-marking.mdx](docs/01-foundations/surgical-principles/stoma-site-marking.mdx) at sidebar_position 14.5 — sitting between bowel-anastomosis (14) and surgical-ergonomics (15), so it clusters with the other operative-principles pages relevant to any bowel-based diversion.

**Evidence base.** Davis 2022 ASCRS Clinical Practice Guidelines for Ostomy Surgery + Kim 2021 systematic review and meta-analysis (n = 2,109 pooled patients) + Burgess-Stocks 2022 WOCN Patient Bill of Rights validation. Headline OR signals: WOC-nurse preoperative marking reduces stoma + peristomal complications (OR 0.47), parastomal hernia (OR 0.25), peristomal skin breakdown (OR 0.52), improves self-care (OR 0.34), and improves health-related QoL. Baseline framing from Kouba 2007 — stomal complications occur in ~15% of ileal-conduit patients, with parastomal hernia the most common single event.

**Sections.** Why marking matters (with the systematic-review pooled outcomes). Who marks — WOC-nurse-vs-surgeon accuracy data: surgeons place stomas a median 2 cm off from the WOC-nurse-selected site, most "badly sited" stomas are too low, and seniority does not improve accuracy. Principles of site selection — RLQ for ileal conduit (one-third ASIS-to-umbilicus), through the rectus, supine/sitting/standing assessment, ≥5 cm peristomal flat skin, avoid scars / folds / beltline / iliac crest / costal margin / umbilicus, mark the day before with indelible ink plus a contralateral backup. Special populations — obese (upper-abdominal alternative, selective mesenteric ligation for conduit length, convex pouching, ostomy belt); wheelchair-bound / neurologically impaired (preop wheelchair-test per 5th ICI for ileal conduit in NLUTD); prior abdominal surgery. Construction linkages — Taneja & Godoy 2009 intracorporeal stoma preparation before abdominal-wall transposition improves symmetry and reduces retraction / stenosis; rosebud eversion 2–3 cm above skin; avoid flush stomas whenever technically feasible. Preoperative education — LOS 8 vs 10 d, time-to-ostomy-proficiency 5.5 vs 9 d per pooled data in the ASCRS guideline. Closing 9-step summary checklist.

**Source cleanup applied (per WARWIKI conventions).** Dropped the Cleveland Clinic "Figure 15" reference (no embed rights, `undefined` caption placeholder in the source dump). Dropped the Lightner & Holubar textbook chapter (source ref 3) because it was never cited inline in the body — renumbered the remaining 10 refs sequentially. Reconstructed a truncated `"p [1]"` statistic as significance-only reporting (exact p-value cut off in source). Stripped the trailing `"Would you like to explore..."` chatbot prompt.

**Frontmatter.** `lastReviewed: 2026-05-23`, `reviewer: NS`, `subspecialty: GURS` (urinary-diversion stoma marking is GURS turf — URPS fellows do not manage urostomies, even though the ASCRS / WOCN evidence base extends to fecal ostomies too). `key_point` summarizes the OR 0.47 / OR 0.34 headlines with the in-rectus / supine-sit-stand / avoid-scars-folds-beltline rule.

**Stable anchor demonstration.** Davis 2022 and Kim 2021 both got parallel `<a id="ref-davis-2022-dis-colon"></a>` and `<a id="ref-kim-2021-j-adv"></a>` anchors next to numbered ones — two more demonstrations of the migration convention.

**Cross-linking.** From [ileal-conduit.mdx](docs/04-surgical-techniques/04c-urinary-diversion/ileal-conduit.mdx): added to the Stoma Maturation key step AND the See Also list. From [cutaneous-ureterostomy.mdx](docs/04-surgical-techniques/04c-urinary-diversion/cutaneous-ureterostomy.mdx): added to the Stomal Stenosis section framing the soft-tissue (skin folds, beltline, pannus geometry) contribution to stomal failure that preoperative marking specifically addresses.

### Conventions established / reinforced

1. **`lastReviewed` / `reviewer` / `subspecialty` / `key_point` frontmatter** is the canonical freshness + quiz + provenance metadata. Two pages now use it (bowel-anastomosis, stoma-site-marking); freshness lint reports `2 fresh / 1103 unreviewed`.
2. **Subspecialty "prove it" standard** — claim GURS or URPS only when the content is something the other fellowship would not be expected to own; default to combined when uncertain. Codified in the quiz tagging docblock with positive examples per bucket.
3. **Stable parallel ref anchors** — when adding a new reference, also drop `<a id="ref-author-year-journal"></a>` next to the numbered anchor. Demonstrated on Burch 2000, Davis 2022, Kim 2021.
4. **CI runs every push** — lint + Vitest + typecheck + build. Fix red CI; do not bypass.
5. **External-link rot is now monitored** — nightly sample-200, auto-issue on broken links.
6. **Bus-factor insurance** — quarterly off-GitHub backup recommendation in CONTRIBUTING.md (git bundle to cloud storage + second remote mirror).
7. **Push-main cadence preserved** — 8 commits this session, each fast-forwarded and pushed to `origin/main` in the same step.

---

## 2026-05-22 — Pharmacology trim, video embeds, nonantibiotic-UTI + pyeloplasty expansions, three new aseptic-technique pages

24 commits, all fast-forwarded to `main`. Lints + build clean across **1,172 files**.

**Pharmacology landing trimmed.** [docs/01-foundations/pharmacology/index.mdx](docs/01-foundations/pharmacology/index.mdx) — deleted everything after the `<GenericDatabase />` block (the "Organizing Framework," "Out of Scope," and "Development Status" prose sections); the page now ends with the database. Separately, all **62 rows** of the pharmacology database had their **Clinical Use / Note column trimmed to ~8–12 words** each — the 13-category × 62-row table had grown too wide to scan.

**Video embeds (8 pages).** Added `## Videos` sections (VideoCards component, placed before `## References`) to: [parastomal-hernia](docs/04-surgical-techniques/04c-urinary-diversion/parastomal-hernia.mdx) (AUA ileal-conduit + Sean Elliott Mitrofanoff repair), [primary-endoscopic-realignment](docs/04-surgical-techniques/04a-urethral-reconstruction/posterior/primary-endoscopic-realignment.mdx) (TURNS PFUI realignment), [blandy-perineal-urethrostomy](docs/04-surgical-techniques/04a-urethral-reconstruction/meatal-perineal/blandy-perineal-urethrostomy.mdx) (AUA Core Videos PU), [retropubic-midurethral-sling](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/retropubic-midurethral-sling.mdx) (AUA Core Videos), [Blandy flap](docs/01-foundations/surgical-principles/flaps/blandy.mdx) + [female-urethral-stricture](docs/03-clinical-conditions/03b-voiding-outlet/female-urethral-stricture.mdx) (ICS female urethroplasty), [female-dorsal-onlay-urethroplasty](docs/04-surgical-techniques/04a-urethral-reconstruction/female/female-dorsal-onlay-urethroplasty.mdx) (Nikolavsky dorsal + Joshi anterior onlay), [glans-resurfacing](docs/04-surgical-techniques/04e-genital-reconstruction/glans-resurfacing.mdx) (AUA Core Videos 2025 STSG).

**Nasal speculum stub filled.** [docs/01-foundations/tools/instruments/retractors/nasal-speculum.mdx](docs/01-foundations/tools/instruments/retractors/nasal-speculum.mdx) — expanded from a ~25-line stub: design table (Cottle / Vienna / Killian by blade length), transurethral midurethral-sling mesh-erosion section (Plowright 2013 pediatric speculum, Solomon & Jelovsek 2015 ENT-instrument removal, Sobota 2019 / Karim 2020 EAU systematic-review framing), and an expanded posterior / redo urethroplasty deep-perineal-corridor role. 5 refs.

**New pharmacology page — [Vaginal Moisturizers & Lubricants](docs/01-foundations/pharmacology/hormonal-therapies/vaginal-moisturizers.mdx)** (Hormonal Therapies, sidebar 3.5). Nonhormonal first-line GSM therapy: moisturizer-vs-lubricant distinction, lubricant-type table, WHO osmolality/pH selection criterion (Dezzutti 2012, Wilkinson 2019, Palacios 2023), breast-cancer-survivor section (topical-lidocaine 88% dyspareunia reduction), Danan 2024 / Mitchell 2018 / Garcia de Arriba 2022 evidence. 13 refs. Wired into the section index + pharmacology database. The combined moisturizers-and-lubricants treatment was kept as one page rather than split (heavy shared framing).

**Nonantibiotic-UTI-prevention expansions.** Three `##` sections of [non-antibiotic-uti-prevention.mdx](docs/01-foundations/pharmacology/infection-prophylaxis/non-antibiotic-uti-prevention.mdx) substantially expanded in place (consolidated-page pattern — no per-agent pages): **cranberry** (Williams 2023 Cochrane population-specific RR table — no benefit in elderly institutionalized / pregnant / neurogenic bladder; tablets-powder subgroup RR 0.45; Xia 2021 trial sequential analysis; Jepson 2023 prevention-only caveat; warfarin/kidney-stone safety); **D-mannose** (FimH mechanism, the open-label-trial-vs-MERIT-null discrepancy and its reconciliation, glucose-metabolism safety); **methenamine** (Hodgkinson 2026 formaldehyde-detoxification resistance, Lee 2012 Cochrane anatomy-dependent efficacy — ineffective in neurogenic bladder, ALTAR post-treatment MDR paradox, sulfonamide contraindication + tartrazine caveat). 13 new refs (30–42).

**Pyeloplasty page expansions.** Three nondismembered-technique subsections of [pyeloplasty.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/anastomosis-repair/pyeloplasty.mdx) expanded: **Foley Y-V plasty** (Y-incision/V-flap geometry, crossing-vessel exclusion, outcomes vs Anderson-Hynes — Szydełko, Amón Sesmero, Subotic pediatric), **Fenger plasty** (Heineke-Mikulicz detail, Janetschek 98% series, ventral-vs-dorsal crossing-vessel nuance, mixed pediatric data Polok 91% vs Casale 43%, Gill percutaneous endopyeloplasty), **Culp-DeWeerd / Scardino-Prince spiral flaps** (flap geometry, large-extrarenal-pelvis requirement, Juliano laparoscopic comparison, modern spiral-flap adaptations). Also expanded the **Redo pyeloplasty** section with a BMG-augmented salvage paragraph, and cross-wired with [bmg-onlay-ureter.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/interposition-graft/bmg-onlay-ureter.mdx) via a new "Salvage BMG Pyeloplasty at the UPJ" subsection. Refs 45–56; **caught and fixed a duplicate Amón Sesmero 2016 citation** introduced mid-session (added as ref46 when already ref15).

**Three new aseptic-technique foundations pages:**

- **[Laparoscopic Access](docs/01-foundations/surgical-principles/laparoscopic-access.mdx)** (Surgical Principles → General Surgical Technique, sidebar 10.5). Veress / Hasson / direct / optical trocar techniques with comparative safety data (Cochrane, 2025 network meta-analysis ranking DTI first); Veress-placement confirmation tests; entry-site atlas (umbilicus, Palmer's point, supraumbilical, subxiphoid); entry-related complications (great-vessel, inferior-epigastric, bowel with the missed-injury 96-hour presentation, gas embolism, trocar-site hernia); high-risk-population strategy (obesity, hostile abdomen, portal hypertension, very thin patients). 40 refs.
- **[Draping & Skin Antisepsis](docs/01-foundations/perioperative-care/intraoperative-care/draping-skin-antisepsis.mdx)** (Intraoperative Care, sidebar 6). Drape types and the WHO 2016 / Cochrane evidence against adhesive incise drapes; chlorhexidine-alcohol skin prep and vaginal-prep agent selection (high-conc alcoholic CHG contraindicated vaginally); combined abdominal-perineal draping setup for lithotomy and robotic GU surgery; draping within the SSI-prevention bundle (Vij OR bundle, AUA prophylaxis). 13 refs.
- **[Surgical Gloving](docs/01-foundations/perioperative-care/intraoperative-care/surgical-gloving.mdx)** (Intraoperative Care, sidebar 7). Glove materials and the FDA powdered-glove ban; closed / open / gloves-first donning; double gloving and indicator systems; perforation rates and risk factors (61.7%-urologic-procedure signal); glove-change frequency and the ChEETAh change-before-closure trial; latex-allergy management. 21 refs.

**Conventions reinforced:**
- **Consolidated-page expansion** — when a topic already lives as a `##` section of a comprehensive consolidated page (non-antibiotic-uti-prevention, pyeloplasty nondismembered techniques), expand in place rather than spawning a per-agent / per-technique page; only the section pattern's own existing granularity is followed.
- **Source-cleanup workflow** continued for chatbot-assisted drafts: dropped `undefined` figure blocks, "Would you like to explore..." trailing prompts, mangled comparison tables (rebuilt as markdown), openevidence-style lay links; merged and deduplicated references across multi-block source dumps; renumbered sequentially.
- **Watch for cross-page duplicate citations** — adding a "new" ref that already exists elsewhere on the page (the Amón Sesmero collision); verify against the existing reference list before appending.

## 2026-05-18 (nutrition fill + RPF) — All 15 nutritional-assessment stubs filled + RPF / Ureterolysis pair

17 commits, all fast-forwarded to `main`. Lints + build clean across **1,168 files**.

**Nutritional-assessment stub backlog completed.** All 15 stub pages under [docs/02-evaluation/laboratory-studies/nutritional-assessment/](docs/02-evaluation/laboratory-studies/nutritional-assessment/) — created as scaffolds in the prior 2026-05-18 session — are now full evidence-based articles (150–250 lines each, ASPEN / EWGSOP2 / GLIM / KDOQI / AASLD / 2024 NEJM Cederholm / 2025 NEJM Cruz-Jentoft-Volkert / Endocrine Society 2024 / ACR 2026 frameworks) with a dedicated **Reconstructive Relevance** section anchoring each marker to specific reconstructive urology / urogynecology scenarios.

**Per-page highlights and defining reconstructive content:**

- **[serum-albumin.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/serum-albumin.mdx)** + **[prealbumin.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/prealbumin.mdx)** — ASPEN 2021 paradigm shift (Evans): visceral proteins are markers of inflammation + nutrition *risk*, NOT malnutrition. Why they fail as nutritional markers, what they DO predict (Alfertshofer 200k-pt cohort, Herzog free-flap, Panayi NSQIP). Davis 2012 prealbumin / CRP correlation. Dellière 2021 non-inflamed prealbumin cutoffs.
- **[transferrin.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/transferrin.mdx)** — Iron metabolism (TSAT, TIBC), sTfR / log ferritin index for IDA-vs-ACD differentiation, Roza 1984 / Ingenbleek 1975 / Morlese 1997 limitations as nutritional marker, HNF4α / hepatocyte-function biomarker role (Guldiken 2021), hemodialysis TIBC-SGA correlation (Kalantar-Zadeh 1998). PBM framing: TSAT &lt; 20% + ferritin &lt; 100 ng/mL → IV iron before cystectomy / diversion / phalloplasty.
- **[c-reactive-protein.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/c-reactive-protein.mdx)** — Biochemistry, standard-vs-hsCRP, Battistelli 2014 POD3 30-fold rise envelope (transferable to cystectomy / GAS / phalloplasty postop leak / abscess / SSI surveillance), Eckart 2020 OR 10.51, Dennis 2008 56% variance from inflammation, 2025 ACC universal hsCRP recommendation (Mensah / Ridker), CRP-vs-PCT table. Three-role reconstructive framing (GLIM anchor, postop surveillance, preop CV risk).
- **[vitamin-d.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/vitamin-d.mdx)** — 2024 Endocrine Society paradigm shift (no longer endorses specific thresholds; against routine screening), VITAL / D-Health / D2d trial data, MS Mendelian randomization, Calgary high-dose toxicity (Burt 2019). 5-scenario reconstructive framing: bowel-augmented bone disease, post-menopausal urogyn (AUGS-IUGA / NAMS), GAS hormonal-axis cohorts, post-bariatric, adult congenital / spina bifida transitional urology.
- **[iron-ferritin.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/iron-ferritin.mdx)** — Threshold table across WHO / AGA / IBD / HF / CKD / hemochromatosis (Al Ta'ani 2025 NHANES 56% prevalence jump at AGA threshold). Inflammation interpretation (sTfR / log ferritin index 41% → 92% sensitivity). Hyperferritinemic syndromes (MAS / AOSD / cAPS / septic shock + COVID / MDA5 / MIS expansion). HF (Cheema 2024 25% MACE reduction with IV iron). PBM operational tiers + 6 high-yield reconstructive scenarios.
- **[vitamin-b12.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/vitamin-b12.mdx)** — **Defining reconstructive scenario: ileal-bowel reconstruction** (conduit, neobladder, augmentation, Indiana / Mainz, ileal-ureter). Methylcobalamin + adenosylcobalamin coenzymes, terminal-ileum IF absorption pathway. Hepatic stores buffer 3–5 years → classic delayed presentation a decade post-cystectomy with subacute combined degeneration. Cochrane 2018 oral-vs-IM, Lacombe 2024 88.5% oral correction in PA, elevated B12 as cancer warning (HR 5.9 solid cancer). Full surveillance schedule per AUA / SUFU + copper-mimic trap for myeloneuropathy.
- **[folate.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/folate.mdx)** — One-carbon metabolism, USPSTF A-rec NTD prevention (50–70% reduction, 4 mg / d high-risk), MTHFR C677T (no routine genotyping), HOPE-2 / NORVIT / WENBIT null + Li 2016 10% stroke signal, dual-modulator CRC hypothesis (B-PROOF HR 1.77 CRC), drug interactions (MTX, anticonvulsants, valproate teratogen, alcohol), B12-masking safety (FDA 0.1 mg threshold, Selhub NHANES OR 5.0 cognitive impairment). 5-scenario reconstructive framing including adult congenital / spina bifida transitional urology (4 mg dose + valproate / anticonvulsant NTD risk).
- **[zinc.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/zinc.mdx)** — Wound healing (Lansdown 2007 MMP cofactor, topical zinc-oxide paste / Unna boot in pelvic-perineal wound care, Kjaer 2020 multinutrient bundle), AREDS / AREDS2, ACG 2025 cirrhosis / HE (84–96% deficiency), AASLD 2022 Wilson disease (150 mg / d enterocyte metallothionein mechanism), Dutta 2026 systematic review of zinc-induced copper deficiency. **THE copper-myelopathy trap**: long-term zinc users (cold prevention, AMD, denture cream) present with myeloneuropathy + new neurogenic bladder mimicking B12 SCD.
- **[vitamin-a.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/vitamin-a.mdx)** — Retinoid biochem, hepatic stellate cell 80–90% storage, WHO serum retinol cutoffs, xerophthalmia spectrum, Imdad 24% all-cause childhood mortality reduction meta-analysis, measles age-specific dosing per WHO / AAP, retinoids in dermatology (isotretinoin, acitretin, bexarotene), ATRA in APL (&gt; 90% CR), hypervitaminosis (HSC retinoid → fibrosis → cirrhosis, PTH-independent hypercalcemia), teratogenicity (Rothman 1995 NEJM 10,000 IU threshold, isotretinoin 26% embryopathy + iPLEDGE). **5 high-yield scenarios: (1) THE chronic-corticosteroid pearl — Hunt 1969 → 25,000 IU/day × 7–10 days perioperatively reverses steroid wound suppression in IBD / transplant / vasculitis / autoimmune patients facing reconstruction**; (2) post-bariatric (BPD/DS ~ 50%, ASMBS 10,000 IU/d); (3) teratogenicity counseling; (4) chronic pelvic / perineal wound healing; (5) cirrhotic paradox.
- **[thiamine.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/thiamine.mdx)** — TPP cofactor for PDH / αKGD / transketolase, 2–4 wk depletion timeline, ETKAC assay, three classic syndromes (dry / wet / Wernicke-Korsakoff), Caine criteria (triad &lt; 10–33%), Wernicke MRI pattern, ASPEN 500 mg IV TID treatment, post-bariatric 27% deficiency (Bahardoust 2022), HF nuances (Keith 2019 + AHA 2023 against routine), negative metabolic-resuscitation RCTs (VITAMINS / ACTS / VICTAS). **Universal rule: thiamine BEFORE glucose** in any post-bariatric / AUD / hyperemetic / long-NPO patient with altered mental status. 5 reconstructive scenarios including refeeding-syndrome prevention (post-cystectomy ileus, ECF, radiation enteritis, post-exenteration).
- **[copper.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/copper.mdx)** — 25 cuproenzymes, key enzyme table, ceruloplasmin as acute-phase reactant, **MDS-mimic hematologic syndrome** (Gabreyes 2013 Scottish review 93% cytopenia resolution; 9/16 patients on denture fixatives), **copper-deficiency myeloneuropathy** (Chen 2024 SR 198 cases; gastric surgery 36.2%; denture cream 19.9%; only 24% neuro improvement; only 5.1% baseline recovery), Menkes (ATP7A, copper histidinate, Kaler 2026 droxidopa for dysautonomia), Wilson (ATP7B, AASLD 2022, chelation vs zinc maintenance), cuproptosis emerging concept. **Defining urologic presentation**: adult on chronic zinc / denture cream / post-gastric-surgery with progressive sensory ataxia + NEW NEUROGENIC BLADDER mimicking B12 SCD but B12 is normal. Plus 4 secondary scenarios incl D-penicillamine wound-healing caveat via lysyl oxidase chelation.
- **[body-composition.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/body-composition.mdx)** — Compartment models (2C / 3C / 4C), seven-method comparison table, BIA variants + ASPEN caution, **phase angle prognostics across 6 settings** (RR 1.82 ICU mortality, 4.05–5.05° sarcopenia cutoff, cirrhosis 4.6°, HF / older-adult disability, cardiovascular surgery tertiles), CT L3 SMI methodology + alternative T4 / T10 / T12 levels, ACR 2026 Appropriateness Criteria, "hidden sarcopenia" (Khristenko 2024 79.7% normal-BMI pancreatic cancer cohort), GLIM / EWGSOP2 integration, VAT vs SAT (UK Biobank DXA R = 0.94 vs BIA R = 0.49). **6 reconstructive scenarios anchored on opportunistic CT L3-SMI on existing scans + BIA phase angle as 5-min bedside preop biomarker.**
- **[handgrip-strength.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/handgrip-strength.mdx)** — Protocol (ASHT Jamar second-position), normative table by age / sex, ethnicity / geography per PURE (Leong 2015), **triple sarcopenia-cutoff framework** (EWGSOP2 &lt; 27/&lt; 16, AWGS 2019 &lt; 28/&lt; 18, SDOC &lt; 35.5/&lt; 20), UK Biobank 502k mortality (5 kg decrease → 16–20% all-cause mortality), PURE HGS &gt; SBP, López-Bueno marginal structural models, Jiang 2022 GI tumor surgery meta-analysis (mortality OR 7.28), Montanari 2026 HGS &gt; age for postop LOS, KDOQI 2020 HGS &gt; DXA for dialysis mortality, optimal resistance-training dose. **THE most actionable bedside preop tool** — $200–400 Jamar dynamometer, 60 sec, no lab / imaging.
- **[screening-tools.mdx](docs/02-evaluation/laboratory-studies/nutritional-assessment/screening-tools.mdx)** — Full text on 8 tools per NEJM Cederholm 2024: MST (AND 2020 single preferred), MUST (**Petra 2025 multicenter n=1,649 best surgical validity**; Lima 2022 86.8% accuracy with GLIM pairing), NRS-2002, MNA-SF (NEJM 2025 best geriatric tool, AUC 0.83, sens 94–99%), SNAQ, SGA (reference standard), PG-SGA (ASPEN oncology), NUTRIC / mNUTRIC (SCCM / ASPEN ICU), SARC-F (EWGSOP2). **GLIM two-step framework + Trollebø 2022** (NRS-2002 missed 37 / 114 GLIM-diagnosed patients — screening ≠ diagnosis). 6 reconstructive scenarios + serum-biomarker rule (do NOT use albumin / prealbumin / transferrin per ACG / ASPEN 2021).

**Source-cleanup convention applied across all 15 pages:**
- Truncated values (e.g., "BMI [N]" with no threshold, missing measles dosing, missing CKD eGFR cutoffs) reconstructed from clinical context.
- Mangled comparison tables (no delimiters) rebuilt as proper markdown.
- `undefined` / wrong-caption / case-record figures removed.
- External openevidence lay-source links dropped per WARWIKI policy.
- Trailing "Would you like to explore..." prompts removed.
- **Stray copy-paste refs** filtered out (B12 refs in vitamin-A list, zinc refs in copper list, vitamin-D refs in folate list, etc.) — pattern seen across most pages as bleed-through from earlier source generations.
- All body citations and reference lists renumbered sequentially.

**New page pair — Retroperitoneal Fibrosis (RPF) clinical condition + Ureterolysis surgical technique:**

- New [retroperitoneal-fibrosis.mdx](docs/03-clinical-conditions/03e-upper-tract/retroperitoneal-fibrosis.mdx) (Upper Tract Disorders sidebar position 3). Epidemiology (0.1 / 100k incidence, 2–3:1 M:F, 50–60 yo), classification (idiopathic incl. IgG4-RD vs secondary — drugs / malignancy / infection / radiation), immunopathogenesis, clinical presentation (60–80% ureteral obstruction, 40% renal decline, 75% elevated ESR / CRP), diagnosis (CT 92% / MRI / FDG-PET prognostic; medial-vs-lateral ureteral deviation as malignancy discriminator), medical treatment (prednisone 0.5–1 mg / kg / d induction, **Vaglio 2011 RCT prednisone &gt; tamoxifen**, combination immunosuppressant 98.9% vs 85.1% response, **rituximab 88% radiologic improvement** in refractory), monitoring (FDG-PET positive at EOT HR 3.47 relapse), prognosis (38–50% relapse, 21 / 41 / 48% cumulative at 5 / 10 / 15 yr; survival 95 / 84 / 68%). 22 refs.
- New [ureterolysis.mdx](docs/04-surgical-techniques/04d-upper-tract-reconstruction/ureterolysis.mdx) (Upper Tract Reconstruction, position 18). Temporary urinary drainage (stent vs PCN; **Santiago 2021 69% conservative resolution** at median stent 16 mo, 15% ultimately need ureterolysis at median 2.2 yr). Indications. **Three-approach comparison table** (open 87.5–96% / 12% Clavien III–IV vs lap 91–93.8% / shorter LOS vs robotic ~100% small series / 33 mL EBL). **O'Brien 2017 timing data** (+25% GFR stent-failure group vs −10% nephrostomy-dependent group — defining "don't delay" data point). Inflammatory AAA section (5–10% of all AAA, SVS retroperitoneal-approach OSR or EVAR first-line; hydronephrosis resolution 69% open vs 38% EVAR per Capoccia 2015 Cochrane). 19 refs.
- Wired ureterolysis into [upper-tract-reconstruction index database](docs/04-surgical-techniques/04d-upper-tract-reconstruction/index.mdx) (Substitution / Salvage domain row); cross-linked from [ureteral-stricture.mdx](docs/03-clinical-conditions/03e-upper-tract/ureteral-stricture.mdx) etiology table (closes hub-spoke loop for inflammatory / infiltrative ureteral-stricture etiology category).

**Conventions reinforced:**

- **Split medical-content from surgical-content** when a clinical condition has a substantial dedicated reconstructive technique. Antipattern: cramming full ureterolysis details into the RPF condition page. Pattern: condition page describes disease + medical therapy, technique page describes operations + decision framework, both cross-linked. Same split already used for urethral stricture ↔ urethroplasty family.
- **Reconstructive-relevance section is non-negotiable** for any new article on a general-medicine topic — anchor the lab / drug / device to specific reconstructive urology / urogynecology scenarios (cystectomy / diversion, urogyn prolapse, GAS, BMG, fistula, urethroplasty, exenteration, post-radiation, adult congenital).
- **Source-cleanup pattern** (truncated values / mangled tables / undefined figures / openevidence links / trailing prompts / stray refs) is the standard recovery workflow for chatbot-assisted page drafts. Confirmed across 17 pages this session.

---

## 2026-05-18 (extended) — Algolia search overhaul + 25+ instruments page rebuild + build fix

Major instruments-section rebuild plus complete Algolia search overhaul. ~30 commits, all fast-forwarded to `main`.

**Algolia search rebuilt** (dashboard-only, not in repo):
- Crawler Editor recordExtractor strips reference lists (`<a id="refN">`, GAS footnotes, inline `<sup>` citations) and nav scaffolding (`.section-stack`, `.toc-list`, `.toc-chips`, `.GenericDatabase`, tables, breadcrumbs)
- Section-tier pageRank: Tier 1 = 80 for clinical-conditions / surgical-techniques / foundations / evaluation / special-populations; Tier 2 = 55 for roots / resources; default 40
- Landing penalty (−3 / −5) so deep article pages outrank section landings within the same tier
- `searchableAttributes` reordered with `unordered(hierarchy.lvl1)` first → page title beats body match
- `customRanking` first entry `desc(weight.pageRank)`
- `exclusionPatterns` for homepage, /about, /docs/journal-club
- SafeReindex threshold bumped to 70% for the one-time republish (drop back to 30 after)
- New `algolia-synonyms.json` at repo root with ~90 multi-way synonym groups (BMG, AUS, IPP, DVIU, VVF/RVF/RUF, BNC, VUAS, OAB/SUI/UUI, NLUTD/NDO/DSD, LS/BXO, GAS, RARC/ORC, Mitrofanoff/Monti, ileal conduit/Bricker, Y-V pyeloplasty, GLP-1 brand names, etc.)
- Memory file `reference_algolia_crawler_config.md` saved for full rebuild

**docusaurus.config.ts**: bumped Algolia DocSearch `hitsPerPage` from default 5 → 20.

**New instrument pages**:
- [LigaSure](docs/01-foundations/tools/instruments/cautery/ligasure.mdx) — open/lap electrothermal bipolar vessel sealer (Landman 2003 burst pressures, ~7 mm vessel ceiling)
- [Lowsley Retractor](docs/01-foundations/tools/instruments/urethral-specialty/lowsley-retractor.mdx) — Lowsley-assisted SPT in NLUTD/hostile abdomen (Edokpolo 2011), vesicourethral-anastomotic tension reduction at lap/robotic prostatectomy (Garrett 2006)
- [Ellik Evacuator](docs/01-foundations/tools/instruments/suction/ellik-evacuator.mdx) — bladder chip/clot evacuation with Goel 2011 wall-suction salvage, enzymatic / H2O2 adjuncts
- [Toomey Syringe](docs/01-foundations/tools/instruments/suction/toomey-syringe.mdx) — CATCH-22 protocol (Clarebrough 2018); corrected eponym to David Toomey
- [Gelman Visualizing Sound (CS7001)](docs/01-foundations/tools/instruments/sounds-bougies/gelman-visualizing-sound.mdx) — hollow Joel Gelman sound for direct-vision proximal-lumen ID in posterior anastomotic urethroplasty
- [Haygrove Sound (restored)](docs/01-foundations/tools/instruments/sounds-bougies/haygrove.mdx) — earlier deleted, restored as sourced page; Haygrove-vs-Gelman decision table
- [Gelman RUG Adapter](docs/01-foundations/tools/instruments/urethral-specialty/gelman-rug-adapter.mdx) — CS Surgical 1997 cone-shaped meatal-occlusion device; Foley balloon dilates 24 Fr fossa to 50 Fr circumference

**Expanded pages** (full sourced rebuilds):
- [Ravini Speculum](docs/01-foundations/tools/instruments/urethral-specialty/ravini.mdx), [Raz-Pereyra](docs/01-foundations/tools/instruments/urethral-specialty/raz-pereyra.mdx), [Mouth Retractors BMG](docs/01-foundations/tools/instruments/retractors/mouth-retractors.mdx)
- SSLF device family: [Capio](docs/01-foundations/tools/instruments/urethral-specialty/capio-device.mdx), [Anchorsure](docs/01-foundations/tools/instruments/urethral-specialty/anchorsure.mdx), [Saffron](docs/01-foundations/tools/instruments/urethral-specialty/saffron-fixation-system.mdx), [i-Stitch](docs/01-foundations/tools/instruments/urethral-specialty/i-stitch.mdx) (Manning 2014 vascular signal + Chene 2024/2025 NanoScope), [Endostitch](docs/01-foundations/tools/instruments/urethral-specialty/endostitch.mdx) (corrected attribution to Schlesinger 1997 from fabricated 'Lantzsch'), [Miya Hook](docs/01-foundations/tools/instruments/urethral-specialty/miya-hook.mdx) (corrected to Frank S. Miyazaki 1987; Lo 2026 strongest pull-out 69.2 vs 44.0 N Anchorsure), [Deschamps](docs/01-foundations/tools/instruments/urethral-specialty/deschamps-ligature-carrier.mdx) (Amiri 2024 highest-blood-transfusion signal + Veronikis VLC subsection)
- Suction family: [Yankauer](docs/01-foundations/tools/instruments/suction/yankauer.mdx) (rebalanced to remove anesthesia/airway content per scope), [Frazier](docs/01-foundations/tools/instruments/suction/frazier.mdx) (3–12 Fr size-by-procedure routing)
- Graft-harvest family: [Dermatome Overview](docs/01-foundations/tools/instruments/graft-harvest/dermatome.mdx), [Zimmer Air](docs/01-foundations/tools/instruments/graft-harvest/zimmer-air-dermatome.mdx) (Egro 2020 71.6% market + 0.1%/yr laceration risk), [Padgett](docs/01-foundations/tools/instruments/graft-harvest/padgett-dermatome.mdx) (Models B/PI/S, Hattori 2020 free-flap de-epithelialization), [Humby](docs/01-foundations/tools/instruments/graft-harvest/humby-dermatome.mdx) (corrected to George Humby 1934, Tehrani 2006 medicolegal data, Cohen 2020 pomelo simulator), [Goulian/Weck](docs/01-foundations/tools/instruments/graft-harvest/goulian-dermatome.mdx) (Dicran Goulian attribution, Jeffery 2007 shelving), [Padgett-Hood Drum](docs/01-foundations/tools/instruments/graft-harvest/drum-dermatome.mdx) (reframed around contemporary niches — Kuo 2003 reused-graft technique uniquely capable via adhesive drum), [Skin Mesher](docs/01-foundations/tools/instruments/graft-harvest/mesher.mdx) (Henderson 2012 nominal-vs-actual expansion, over-vs-cross-meshing rule, Meek comparison)
- [Staplers (GIA) Hub](docs/01-foundations/tools/instruments/staplers/index.mdx) — added Kracht 1993 hemicolectomy RCT (stapled leak 2.8% vs handsewn 8.3%), Emile 2025 stapling-failures SR, Reddy 2023 MAUDE 24-yr mortality (676 deaths), Wexner Quadruple Intraoperative Assessment protocol

**Index trimming**: deleted Specimen Retrieval Bag (Endo Catch), Laparoscopic Needle Holder, Gore Suture Passer rows (out of scope). Earlier in session deleted Guyon / Haygrove / Gelman stub sound pages (Haygrove later restored as a sourced page). Removed "Key Use" column from instruments index database.

**Title-disambiguation memory + Algolia synonyms** uploaded by user via dashboard.

**Build fix (recovery commit)**: malformed `<sup>` closing tag in [mouth-retractors.mdx:91](docs/01-foundations/tools/instruments/retractors/mouth-retractors.mdx) (`</sup>` was typed as `]`) broke `npm run build` and the Vercel deploy across multiple recent pushes. Diagnosed by running `npm run build` locally; fixed in this push. Build now passes cleanly.

**Convention reinforced — run `npm run build` before declaring a push complete** when MDX contains raw HTML (sup, custom tags). Lint catches citation pairing and broken internal links but does NOT validate JSX/HTML tag closure inside `<sup>`. This convention saved to user memory.

Lint + typecheck + build all clean. Total files: 1,166.

---

## 2026-05-18 — Nutrition deep-dive, LSE classification, ICUD page, four new retractor pages, orphan-lint overhaul, title-disambiguation convention

Large session — **14 commits, all fast-forwarded to `main`**. Lints / typecheck / build clean across ~1,162 files.

**New dedicated atlas pages**:

- [Intracorporeal Urinary Diversion (ICUD)](docs/04-surgical-techniques/04c-urinary-diversion/intracorporeal-urinary-diversion.mdx) — relocated Principle 12 into its own page with full robotic step-by-step (ileal conduit + orthotopic neobladder), Bricker vs Wallace, ICUD-vs-ECUD outcomes (IRCC, Katayama 2021, Zhang 2020, Mastroianni 2024 RCT, Rich 2025, Teoh 2021, Mazzone 2021), and learning curve. Removed Principle 12 + refs 30–38 from [urinary-diversion-principles](docs/04-surgical-techniques/04c-urinary-diversion/urinary-diversion-principles.mdx); replaced with a one-line pointer. 25 refs.
- [Intraoperative Bowel Handling & Injury Management](docs/01-foundations/surgical-principles/bowel-handling-injury-management.mdx) — new foundations page (sibling to Bowel Anastomosis). Prevention table (ASRM gentle-handling, laparoscopy halves adhesions per Krielen 2020 SCAR, intestinal isolation bag Adelson 1991, atraumatic graspers, sharp-vs-blunt adhesiolysis with ten Broek 2013 10.5% enterotomy / 8% mortality data, bipolar over monopolar, powder-free gloves, Seprafilm caveat). Iatrogenic-injury algorithm (small-bowel primary repair WSES 1B, colon paradigm shift to liberal primary repair / anastomosis per Fitzgerald 2025 EAST and Mitchao 2022, thermal-injury resect-don't-repair rule with Bishoff 1999 69%-missed signal, missed-injury warning signs, damage-control 48–72 h relook, EAF prevention / ChimneyVAC). Reconstructive-urology / urogyn implications block. 27 refs.

**New instrument pages** (all + index rows on [tools/instruments/index.mdx](docs/01-foundations/tools/instruments/index.mdx)):

- [Collins retractor](docs/01-foundations/tools/instruments/retractors/collins.mdx) — Balfour-family wound-edge self-retainer for transverse (Pfannenstiel) incisions; Charité Alexis-vs-Collins SSI RCT (8% vs 1% non-obese; benefit lost at BMI ≥ 40 per Scolari Childress 2016 and Waring 2018 meta); femoral-neuropathy safety; WHO + SHEA/IDSA framing. 14 refs.
- [Gelpi retractor](docs/01-foundations/tools/instruments/retractors/gelpi.mdx) — single-sharp-prong scissor-style self-retainer; Weitlaner sibling for firm-tissue (fascia / muscle) retraction. Scrotal / inguinal / perineal / gracilis-harvest / microsurgical RU framing. Datta 2004 paraspinal perfusion 60-min periodic-relaxation rule. 3 refs.
- [O-Ring / Plastic Sheath Wound Retractor](docs/01-foundations/tools/instruments/retractors/o-ring-wound-protector.mdx) (Alexis, Mobius, O Trac) — dual-ring polyurethane-sheath device covering design, 4 SSI-reduction mechanisms (barrier, atraumatic retraction, humidity, no femoral-nerve risk), insertion technique, RU/urogyn applications, JAMA Surg 2024 Korean RCT (46.8% RRR), ASCRS 2024 strong recommendation, WSES 2020 Grade 1B dual-vs-single-ring, BMI-dependent cesarean signal, off-label uses (TORS, transoral thyroidectomy, VP-shunt, specimen extraction, giant ovarian cyst). Added a **cost-effectiveness section** (Chomsky-Higgins 2019 dominant in colorectal: +230 QALYs / $2.2M savings per 1,000; ROSSINI 2014 single-ring not-cost-effective signal; Lawson 2019 hernia exposure-per-incision-length 12.25 vs 6.17 cm²; reconciliation table). 21 refs total.
- [Viscera Retainer (FISH / Glassman)](docs/01-foundations/tools/instruments/retractors/viscera-retainer.mdx) — flexible shield placed under fascial edges at laparotomy closure to protect bowel from needle puncture. FISH plastic / Glassman metal variants, the malleable / lap-pad improvised alternatives, the defining "withdraw before last suture" limitation with mitigations, and the Kaymakcalan 2017 biodegradable CC-DHA in-situ alternative. **Evidence-gap section**: no clinical trials show outcome reduction; framed against 1.9% AHSQC enterotomy incidence (Krpata 2018), 12.8% with adhesiolysis (ten Broek 2012), 19–20% in reoperative abdominal (Van Der Krabben 2000); WSES 2023 ECLAPTE blunt-vs-sharp no-recommendation. 6 refs.

**New evaluation subsection — [Nutritional Assessment](docs/02-evaluation/laboratory-studies/nutritional-assessment/index.mdx)**:

Comprehensive landing under Evaluation → Laboratory Studies with the ACS NSQIP / Strong-for-Surgery framework, full lab table (visceral proteins + CRP + micronutrient panel), screening-tool comparison (MUST / NRS-2002 / MNA-SF), GLIM phenotypic + etiologic diagnostic criteria, physical / functional / body-composition workup, and a practical bottom-line recipe. 11 refs.

Plus **15 per-test stub pages** (real fillable skeletons with key cutoffs, reconstructive-specific framing, and explicit "To Be Expanded" sections): serum-albumin, prealbumin, transferrin, c-reactive-protein, vitamin-d, iron-ferritin, vitamin-b12, folate, zinc, vitamin-a, thiamine, copper, screening-tools, handgrip-strength, body-composition. Wired into the Laboratory Studies landing and cross-linked from the perioperative nutrition page.

**Foundations Perioperative Nutrition expansion** ([nutrition.mdx](docs/01-foundations/perioperative-care/postoperative-management/nutrition.mdx)) — three new sections, 28 new refs (32–59):

- **Nutrition and Wound Healing — The Reconstructive Evidence**: 200k-pt albumin analysis (Alfertshofer 2026 — 36.5% vs 10.4% complications at ≤ 3.3 g/dL), Bruno 2026 abdominoplasty protein RCT (dehiscence 6% vs 17%, seroma 9% vs 18%, healing −4 days), Herzog 2024 H&N flap 3.4× failure, Panayi 2024 frailty + hypoalbuminemia NSQIP n = 34,571, Saeg 2021 micronutrient-by-wound-type table, Kjaer 2020 multinutrient collagen-synthesis RCT.
- **Expanded urology immunonutrition block**: Khaleel 2021 RC IMN (infection 25% vs 45%), Hamilton-Reeves 2018 pilot RCT (Th1/Th2 shift, IL-6 −43%), Amer 2025 RCT (LOS 7.8 vs 10.6 d; flatus 40 vs 65 h), Cochrane Burden 2019, INCyst trial protocol Derré 2024. New **Urogynecologic ERAS Nutrition** subsection (AUGS-IUGA 2022 + ACOG 750 + ASCRS-SAGES carb-loading).
- **GLP-1 Receptor Agonists in Perioperative Care** (full new section): candidacy expansion (Sidhu 2025 DIEP n = 5,618), conflicting wound-healing signal with mechanistic reconciliation via protein deficit (Lee 2025, Koenig 2026, Aschen 2025), Friedman 2025 lower albumin / prealbumin signal, preclinical pro-healing paradox (Ghebrehiwet-Kuflom 2025), ADA 2026 personalized aspiration-risk framework, **OCULUS RCT** (holding doesn't empty the stomach), Mehta 2025 protein-timing protocol, practical surgeon checklist.

Cross-link added from [wound-healing.mdx](docs/01-foundations/surgical-principles/wound-healing.mdx) Malnutrition row.

**Urethral-stricture classification rebuild** ([urethral-stricture.mdx](docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx)) — corrected "Severity" → **Segment** in LSE, added the full Erickson 2020 LSE classification (L1–3 / S1–3 / E1–6, interrater reliability 0.79), the 2025 LSE staging system (I–V with substages, Urethroplasty Triad Score, head-to-head superiority over LSE-score and U-score), and a comparison table with the U-Score / ULTRA / cystoscopy / Gombe systems anchored on the John 2021 SR. Kurtzman 2022 head-to-head LSE vs U-Score. 6 new refs.

**Lichen sclerosus reconstructive build-out** ([lichen-sclerosus.mdx](docs/03-clinical-conditions/03g-genital-scrotal/lichen-sclerosus.mdx)) — replaced the brief "use oral mucosa" paragraph with a comprehensive reconstructive block: Calvo 2024 long-term outcomes, AUA 2023 surgical principles (genital skin contraindicated, oral mucosa mandatory, SCC biopsy, no endoscopic Tx for penile strictures), **Kurtzman 2021 one-stage BMG meta-analysis** (n = 625; 10% / 18% at 24 mo recurrence; penile-invagination superiority p = 0.004), Esperto 2022 SR (88% vs 60% single vs staged), Wan 2023 Kulkarni vs Asopa in LS, two-stage BMG data (Patel 2016, Palminteri 2022 12-mo interval rule, Levine 2007, Figler 2018, Verla 2019), **perineal urethrostomy** evidence (Patel 93% vs 75%; Fuchs 94.8% vs 78.5% / 78.2%; Klemm 2024 84% at 55 mo; Zhao 2025 meta no difference vs urethroplasty), LS decision-framework table, cross-links to Kulkarni / Asopa / Johanson / Blandy technique pages and the LSE-staging anchor. 14 new refs (37–50, with duplicate Chung 2020 collapsed and 39–50 renumbered to 38–49).

**"Shorter ureters, fewer strictures"** — Das 2024 (*Urology* n = 204; OR 0.73, 95% CI 0.58–0.92; median resection 2.3 cm vs 1.65 cm in non-stricturing vs stricturing) added to [ileal-conduit](docs/04-surgical-techniques/04c-urinary-diversion/ileal-conduit.mdx) Ureteroileal-anastomosis section as the perfusion-driven counter-intuitive principle, with the conflicting Richards 2015 multifactorial signal and the four core technical principles (spatulation, periureteral preservation, tension-free mucosa-to-mucosa, single-J stents). Cross-callout added to [urinary-diversion-principles](docs/04-surgical-techniques/04c-urinary-diversion/urinary-diversion-principles.mdx) Principle 5 (Achilles heel).

**Orphan-lint overhaul + cross-link cleanup**:

- Fixed [scripts/check-orphans.js](scripts/check-orphans.js) on two dimensions: (1) honor frontmatter `slug:` overrides when deriving served URLs (most 04a urethroplasty atlas pages flatten via slug); (2) count GenericDatabase / data-array `slug:` entries as valid inbound paths. Result: **95 false-positive orphans → 4 real orphans → 0 after cleanup**.
- Real orphans fixed: added Lotus Petal + Singapore (pudendal-thigh / IPAP) flap rows to the male-urethroplasty Pedicled Flaps DB; added Laminated Gracilis Flap to the Combined (Graft + Flap) DB; cross-linked Tissue-Engineered Grafts & Bioscaffolds from the grafts-gu-reconstruction hub.
- Wired Peyronies [prosthesis-with-straightening.mdx](docs/04-surgical-techniques/04j-sexual-dysfunction/peyronies-disease/prosthesis-with-straightening.mdx) inline at first mention to deep-dive companions (scratch-technique, manual-modeling, sliding-slicing-techniques) — the pattern the user raised re: hidden pages findable only by search.

**Title-disambiguation convention applied** — 22 files updated with parenthetical suffix:

- Identical-title pairs: AUS → **(Device)** / **(Procedure)**; Erectile Dysfunction → **(Condition)** / **(Procedures)**; Testicular Reimplantation → **(Condition)** / **(Procedure)**; Botulinum Toxin → **(Neuromodulation Adjunct)** / **(OAB / Storage)**; PDE5 Inhibitors → **(Pharmacology)** / **(Procedures)**; Non-Binary / Nullification → **(Procedures)** / **(Special Population)**.
- BPH device/procedure pairs standardized to (Device) / (Procedure): ProACT, iTind, Optilume BPH, Aquablation.
- Same-eponym instrument pairs got instrument type: Iris **Forceps**, Heaney **Clamp** (siblings already had "Scissors" and "Needle Driver").
- Fistula pairs (5) left alone — verb-based "...Repair" suffix already disambiguates. drug-coated-balloon legacy pair and overview.mdx section-disambiguated pages also left alone. Convention saved to user memory.

**CSS** — table top-margin tightened ([custom.css](src/css/custom.css:240)) when a table directly follows a paragraph: ~ 44 px gap → ~ 20 px (only the `<p>` bottom margin). Triggered by user-reported "extra gap above tables" on the new ICUD page.

**Algolia search** (no repo commit, dashboard-only) — diagnosed two-part issue: (1) PageRank originally backward (boosting landings over canonical deep pages), (2) GenericDatabase row descriptions / TOC blurbs polluting `content`. Recommended Algolia-Crawler-Editor recordExtractor with reversed pageRank tiers (deep pages 50, landings 30, hubs 55), exclusion of references / `.section-stack` / `.toc-list` / tables / `.GenericDatabase` wrappers, `lvl0` anchored to breadcrumb, and `desc(weight.pageRank)` as first custom-ranking attribute. Owner applied dashboard-side and confirmed improvement; reference-strip drop triggered Algolia SafeReindex 30% threshold which owner raised to 70% for the one-time republish.

**Conventions reinforced**:

- **Disambiguate duplicate page titles with parenthetical suffix** when (and only when) titles actually collide across sections; URLs unchanged.
- **Hidden pages must be reachable** via inline prose cross-link from the consolidated parent — search-only access is not acceptable for deep-dive content (user-stated philosophy: "if there is more info on a topic it should be easily found on the website and not hidden").
- **GenericDatabase slugs count as inbound links** for orphan-lint purposes — taught the lint script accordingly.

---

## 2026-05-16 — Instruments build-out: endoscopy + robotic subdirectories, sounds-bougies completion, urinary-diversion principles

Continued the comprehensive instruments-section expansion from 2026-05-15. **~50 commits across ~40 new / expanded instrument pages and one urinary-diversion principles update.** Created two new instrument subdirectories (`endoscopy/`, `robotic/`), completed the sounds-bougies family, expanded the urethral-specialty subdir, and applied the same consolidation pattern (used earlier for needle drivers and vessel sealers) to demonstrate redundancy-control. Lints clean throughout (~1,140 files). All fast-forwarded to `main` per the new push-main-cadence feedback.

### Sounds & Bougies completion

Added new pages: [hegar-dilators](docs/01-foundations/tools/instruments/sounds-bougies/hegar-dilators.mdx) (metric 1–26 mm; Kaplan 2015 postmenopausal labial-fusion separation; hysteroscopy thresholds 6/8–9/10–11), [dittel](docs/01-foundations/tools/instruments/sounds-bougies/dittel.mdx) (straight female / distal-male sound; Sarin 2021 49% pooled female-stricture-dilation success, 75.1% → 26.6% on re-dilation; Santucci 2008 office-dilation overutilization), [s-dilators](docs/01-foundations/tools/instruments/sounds-bougies/s-dilators.mdx) (Herschorn/Carrington 2007 double-curve over-the-wire; Dewan 2003 pediatric 0/0 false-passage/sepsis), [filiforms-followers](docs/01-foundations/tools/instruments/sounds-bougies/filiforms-followers.mdx) (Heyns 1998 RCT 55–60% stricture-free at 24 mo; Beaghler 1994 displacement by flexible-cystoscopy), [otis-urethrotome](docs/01-foundations/tools/instruments/sounds-bougies/otis-urethrotome.mdx) (blind 12-o'clock cut; Schultz 1989 vs Nielsen 1989 pre-TURP debate), [sachse-urethrotome](docs/01-foundations/tools/instruments/sounds-bougies/sachse-urethrotome.mdx) (21 Fr DVIU workhorse; Giannakopoulos 1997 25% vs 70% at 5 yr single-vs-Guillemin; Farrell 2017 MMC 75% at 25.8 mo), [balloon-dilator](docs/01-foundations/tools/instruments/sounds-bougies/balloon-dilator.mdx) (radial-vs-axial mechanism; anatomic-hub table routing to anterior urethra / BNC-VUAS / ureter / Optilume BPH / DCB pages), and [guidewires](docs/01-foundations/tools/instruments/sounds-bougies/guidewires.mdx) (four functional categories; Amasyali 2020 hydrophilic 70.67% vs hybrid 36.67% vs standard 0% impacted-stone bypass; Ulvik 2013 / Dutta 2016 safety-wire-evolution; Freid-Smith Glidewire technique). Substantially expanded [van-buren](docs/01-foundations/tools/instruments/sounds-bougies/van-buren.mdx) (Wyner 2018 SPT-tenting; AUA 2023 ~50–60% short-bulbar durability; EAU 2026 visually-controlled trend). **Deleted** the Goodwin Sound index row (no page existed; Willard Goodwin attribution likely a fabrication).

### Retractors

Added [pederson](docs/01-foundations/tools/instruments/retractors/pederson.mdx) (narrow flat-blade bivalve; ACOG-recommended with Huffman for the initial reproductive-health visit; Thomas 2001 RCT comfort data) and [lighted-retractors](docs/01-foundations/tools/instruments/retractors/lighted-retractors.mdx) (Lumitex LightMat® and integrated-LED platforms; deep-pelvic / perineal urethroplasty / transperineal RUF / vaginal-vault prolapse uses; Kokosis 2020 headlamp-pain OR 2.5 surgeon-ergonomics rationale; Hefermehl 2014 thermal-spread context). Fixed the broken Pedersen cross-link on the Graves page.

### Urethral & Pelvic Specialty expansion

Added: [midurethral-sling-trocars](docs/01-foundations/tools/instruments/urethral-specialty/midurethral-sling-trocars.mdx) (renamed from "TVT / TOT Tunneler" to standard WARWIKI "trocar" convention; trocar-family table including IVS / TVT / TVT-Exact / TOT outside-in / TVT-O inside-out / mini-sling / Stamey-substitute; Petros 90°→120° angle-change rationale; Zahn 2007 anatomic cadaveric data; Ludwig 2016 TOT 8/4 standardization; TOMUS Richter 2010; Kim 2019 high-risk meta favoring retropubic), [single-tooth-tenaculum](docs/01-foundations/tools/instruments/urethral-specialty/single-tooth-tenaculum.mdx) (Andrews 2023 RCT 55% bleeding; Samy 2019 network-meta lidocaine-prilocaine; ACOG 2025 Consensus; deleted the Bozeman row), [jacobs-tenaculum](docs/01-foundations/tools/instruments/urethral-specialty/jacobs-tenaculum.mdx) (multi-tooth complement for friable / atrophic cervix / vaginal cuff), [vessel-loops](docs/01-foundations/tools/instruments/urethral-specialty/vessel-loops.mdx) (Moore/Manship 1985 SEM "vessel-loop vs all rigid-clamp" endothelial-injury data; Pons-Riverola 2025 Potts vs Rummel force; shoelace-technique RCTs Kakagia/Johnson/Onoe/Arumugam), [probe-grooved-director](docs/01-foundations/tools/instruments/urethral-specialty/probe-grooved-director.mdx) (fistula / sinus / diverticulum tract probe-and-divide), [bladder-scanner](docs/01-foundations/tools/instruments/urethral-specialty/bladder-scanner.mdx) (Chrouser 2024 RAND/UCLA ≥500 mL threshold; Palese 2010 CAUTI OR 0.27; Mavani 2025 obesity ICC 0.55; post-augmentation non-validation caveat), [laparotomy-pads](docs/01-foundations/tools/instruments/urethral-specialty/laparotomy-pads.mdx) (Stone 1983 damage-control 7%→65% survival; Brown 2025 ACOG accreta packing; Inaba 2016 RFD 100% sensitivity; Gawande 2003 88% falsely-correct counts in retained-sponge cases), and [ray-tec-sponges](docs/01-foundations/tools/instruments/urethral-specialty/ray-tec-sponges.mdx) (4×4 sponge-stick blunt-dissection workhorse; never-in-abdomen body-cavity rule; Rupp 2012 RFD adjunct).

### Clamps

Added [backhaus](docs/01-foundations/tools/instruments/clamps/backhaus.mdx) — penetrating sharp-tip towel clip; penetrating-vs-non-penetrating (Edna/Lorna) table; Lhotka 1998 nickel-allergy data; David 2020 negative-pressure COVID drape non-penetrating rationale.

### NEW `endoscopy/` subdirectory (8 pages)

Created with `_category_.json` at sidebar position 13. Pages: [rigid-cystoscope](docs/01-foundations/tools/instruments/endoscopy/rigid-cystoscope.mdx) (lens-angle 0°/12°/30°/70°/120° table; sheath sizes; AUGS 2018 cystoscopy-at-prolapse-repair; Otis-Chapados 2022 AUS-cuff-safe-passage table), [flexible-cystoscope](docs/01-foundations/tools/instruments/endoscopy/flexible-cystoscope.mdx) (chip-on-tip vs fiberoptic; single-use-vs-reusable Holmes 2023 / Seyam 2020 / Anderson 2024 SR / Assmus 2022 $185-vs-$272; Ordonez 2022 recurrent-UTI 74% abnormal findings), [semi-rigid-ureteroscope](docs/01-foundations/tools/instruments/endoscopy/semi-rigid-ureteroscope.mdx) (Dretler/Cho 1989; Omar 2022 4.5/6 Fr vs 6/7.5 Fr safety advantages; Sunaryo 2022 OR 1.71 URS stricture; Cumpanas 2025 PULS-3 OR 40), [flexible-ureteroscope](docs/01-foundations/tools/instruments/endoscopy/flexible-ureteroscope.mdx) (270–316° deflection; single-use Belkovsky 2024 meta; Gauhar 2025 dusting-vs-popcorning + TFL signal; AUA/SUO 2023 UTUC kidney-sparing criteria), [resectoscope](docs/01-foundations/tools/instruments/endoscopy/resectoscope.mdx) (Iglesias 1975 continuous-flow; Cochrane Alexander 2019 monopolar-vs-bipolar TUR-syndrome 18 vs 3 / 1000; Teoh 2024 ERBT phase-3 29% vs 38%), [collins-knife](docs/01-foundations/tools/instruments/endoscopy/collins-knife.mdx) (hook-shaped electrode for TUIP / TUIBNC / external sphincterotomy / NU bladder-cuff; Allard 2013 oncologic equivalence; deleted Cold-Cup Biopsy Forceps and Bugbee Electrode rows), [resection-loop](docs/01-foundations/tools/instruments/endoscopy/resection-loop.mdx) (Bhalla 2007 90% tensile loss at 30° angulation; Sharma 2021 bipolar OR 0.27 severe-artifact; Mancon 2025 bipolar ERBT HR 0.24 recurrence), [vaporization-electrode](docs/01-foundations/tools/instruments/endoscopy/vaporization-electrode.mdx) (pure-vaporization Wedge/VaporTrode/button-bipolar vs vaporesection Wing/Vapor-Cut/Wedge; Hoekstra 2010 10-yr 11% vs 23% failure favoring TURP; Huang 2019 network-meta favoring enucleation).

### NEW `robotic/` subdirectory (~10 pages)

Created with `_category_.json` at sidebar position 14. **Bipolar trio**: [maryland-bipolar](docs/01-foundations/tools/instruments/robotic/maryland-bipolar.mdx) (fine-tip dissector + discrete-vessel coag; Hefermehl 2014 thermal-spread 2.2 mm at 1 s with heat-sink pearl), [fenestrated-bipolar](docs/01-foundations/tools/instruments/robotic/fenestrated-bipolar.mdx) (broad fenestrated for retraction + diffuse-bleed control; double-bipolar method Ochi 2024 / Katsuno 2022 / Chiarella 2025 MAMBA), [force-bipolar](docs/01-foundations/tools/instruments/robotic/force-bipolar.mdx) (8 mm strongest-grip countertraction; Ballouhey 2018 small-cavity OSATS data). **Grasper trio**: [prograsp](docs/01-foundations/tools/instruments/robotic/prograsp.mdx) (non-energized 4th-arm retraction default; Mucksavage 2011 grip-force range; Lee 2015 1.84–3.37× posture-dependent grip; Ramirez 2016 three-instrument 40% cost-reduction RARP), [cadiere](docs/01-foundations/tools/instruments/robotic/cadiere.mdx) (bowel-handling specialist for urinary diversion; Single-Site availability), [tip-up-fenestrated](docs/01-foundations/tools/instruments/robotic/tip-up-fenestrated.mdx) (perpendicular-lift vector for bladder-dome / sigmoid retraction). **Energy instruments**: [monopolar-curved-scissors](docs/01-foundations/tools/instruments/robotic/monopolar-curved-scissors.mdx) (workhorse primary dissector; cold-only-for-NVB-and-ureteral pearl; Overbey 2021 stray-energy data, Wikiel 2023 cVRG vs cPRG generator 4.4 vs 41.1 °C), [cautery-hook](docs/01-foundations/tools/instruments/robotic/cautery-hook.mdx) (hook-elevate-divide alternative; Lee 2020 colectomy LN harvest signal), [harmonic-ace](docs/01-foundations/tools/instruments/robotic/harmonic-ace.mdx) (ultrasonic 55.5 kHz, ≤5 mm seal capacity, **no-EndoWrist limitation as defining trade-off**, assistant-port workflow Kakeji 2015 251 vs 306 min). **Consolidated pages**: [needle-drivers](docs/01-foundations/tools/instruments/robotic/needle-drivers.mdx) (single page covering Large / Mega / SutureCut / Mega SutureCut / Black Diamond Micro with anchor-fragment routing; Ricchiuti 2010 35% monofilament loss; Diks 2007 ePTFE preserves; Massoud 2013 single-driver V-Loc 8.5-vs-11.5 min; Lai 2019 Black Diamond microvascular series + Sudarman 2026 meta-analysis 96% flap-survival vs dedicated Symani/MUSA platforms; **sacrocolpopexy mesh-to-vagina (SutureCut) and mesh-to-promontory (Mega SutureCut) emphasis** added per request) and [vessel-sealers](docs/01-foundations/tools/instruments/robotic/vessel-sealers.mdx) (single page covering Vessel Sealer Extend + SynchroSeal with anchors; Pilz da Cunha 2024 propensity-matched 48 vs 95 mL EBL; Kong 2017 design-rationale; Harold 2003 burst-pressure data; Birgin 2026 SAMBA wet-sealing). [robotic-stapler](docs/01-foundations/tools/instruments/robotic/robotic-stapler.mdx) (EndoWrist/SureForm; Saxena 2025 ileo-ileal during RARC n = 170; Holzmacher 2017 cost / fires-per-patient; Perkins 2018 donor-nephrectomy cost trade-off; cross-link to comprehensive [staplers index](docs/01-foundations/tools/instruments/staplers/index.mdx)).

### Biomaterials linking and creation

Created [open-ended-ureteral-catheter](docs/01-foundations/tools/biomaterials/ureteral-stents/open-ended-ureteral-catheter.mdx) (4–7 Fr non-self-retaining; end-hole / sidehole / flexi-tip / whistle / cone variants; Pace 2003 sidehole 5.1 vs 2.6 mL aspiration; Gönen 2019 tubeless-PCNL VAS 3.37 vs 6.17; Zhou 2017 EUC vs DJ-stent), [ureteral-access-sheath](docs/01-foundations/tools/biomaterials/ureteral-stents/ureteral-access-sheath.mdx) (Traxer 2013 PULS classification 46.5% / 13.3% severe; Ali 2026 6 N force-guided threshold; FANS-suction sheaths Xie 2025 / Arikan 2025; Stern 2019 / Cooper 2020 reassuring long-term stricture; CROES SFR debate), [three-way-catheter](docs/01-foundations/tools/biomaterials/urinary-catheters/three-way-catheter.mdx) (Davis 2016 CSA-not-French rule; Braasch 2006 brand-dependent flow; Clarebrough 2018 CATCH-22 manual-washout protocol; Rieger 2022 gentamicin 0% CAUTI). Linked [double-j-stent](docs/01-foundations/tools/biomaterials/ureteral-stents/double-j-stent.mdx) and [nephrostomy-tube](docs/01-foundations/tools/biomaterials/ureteral-stents/nephrostomy-tube.mdx) instrument-index rows to the existing comprehensive biomaterials pages (rather than duplicate).

### Surgical-principles update

Added **Principle 12 — Intracorporeal Reconstruction Is Now the Default Robotic Approach** to [urinary-diversion-principles](docs/04-surgical-techniques/04c-urinary-diversion/urinary-diversion-principles.mdx). IRCC adoption curve 9% (2005) → 97% (2015) per Hussein 2018; ICUD-vs-ECUD outcomes table (transfusion 4% vs 19%, OR time 357 vs 400 min, 90-d major-complications OR 0.57 at high-volume centers, LN yield +3.68 mean difference); Mastroianni 2022 / 2024 only RCT vs open RC (transfusion 22% vs 41%); volume + comorbidity modifiers (Katayama 2021 high-volume signal; Mazzone 2021 ICUD-helps-most-comorbid interaction); practical implications cross-link to [robotic stapler](docs/01-foundations/tools/instruments/robotic/robotic-stapler.mdx) for ileo-ileal anastomosis (Saxena 2025) and [staplers index](docs/01-foundations/tools/instruments/staplers/index.mdx) for the stapled-vs-handsewn neobladder debate. 9 new refs (30–38).

### Consolidation pattern

When the user flagged the multi-row needle-driver redundancy in the index, **consolidated** five Large / Mega / SutureCut / Mega SutureCut / Black Diamond Micro index rows into a single **Needle Drivers (da Vinci)** row pointing to [needle-drivers.mdx](docs/01-foundations/tools/instruments/robotic/needle-drivers.mdx). Same pattern applied to the **Vessel Sealer Extend / SynchroSeal** rows. Vercel redirects added for the deleted `synchroseal`, `large-needle-driver`, and `mega-needle-driver` slugs. **Pattern documented for future use**: when 2–5 variants share 80%+ content, consolidate into one page with anchor-fragment routing per variant from the index rows. The bipolar trio (Maryland / Fenestrated / Force) and grasper trio (ProGrasp / Cadiere / Tip-Up Fenestrated) remain separate because their roles are genuinely complementary, not variants.

### Conventions reinforced

- **Push-main-cadence memory** saved: every commit must fast-forward `main` and push `origin main` in the same step, not just push the feature branch (Vercel deploys from main).
- **Index-row use-column conciseness**: rebalanced 7 sounds-bougies / retractors rows after the user flagged the table getting too spaced out — house style is ~ 10–15 word descriptions, not 30–40-word sentences.
- **Sex/gender language** continues — "patient" / "all patients" / "regardless of sex"; preserve ICD-10 / citation-title language verbatim where billing or fidelity requires it.

### Deletions

- **Goodwin Sound** (no page; attribution to Willard Goodwin appears to be a fabrication)
- **Bozeman Uterine Dressing Forceps** (no page; Nathan Bozeman attribution sound but instrument out of WARWIKI scope)
- **Cold-Cup Biopsy Forceps**, **Bugbee Electrode** (no pages; absorbed into the cystoscope / resectoscope ecosystem)
- **Large Needle Driver page**, **Mega Needle Driver page** (consolidated into the [needle-drivers](docs/01-foundations/tools/instruments/robotic/needle-drivers.mdx) page; redirects in place)
- **SynchroSeal page** (consolidated into [vessel-sealers](docs/01-foundations/tools/instruments/robotic/vessel-sealers.mdx))

---

## 2026-05-15 — Full instruments-section rewrite

Comprehensive evidence-based expansion of the entire `01-foundations/tools/instruments/` directory. **43 commits across ~55 instrument pages** plus the landing-page database. Lints clean throughout (~1,095 files). All fast-forwarded to `main`.

### Tissue forceps (8 pages)

- [Adson](docs/01-foundations/tools/instruments/forceps/adson.mdx) — 4 variants (1×2 toothed / smooth-serrated / Adson-Brown 7×7 / double-ended); toothed-vs-smooth trade-off.
- [Olsen-Hegar](docs/01-foundations/tools/instruments/needle-holders/olsen-hegar.mdx) — combination needle holder + scissor.
- [Singley](docs/01-foundations/tools/instruments/forceps/singley.mdx) — **corrected** the prior "long angled tips with serrations" framing; defining feature is the fenestrated oval tip on a spring-action thumb forceps.
- [Wangensteen](docs/01-foundations/tools/instruments/forceps/wangensteen.mdx) — **corrected** the prior "long fine-tipped" framing; defining feature is the 3×3 interlocking-tooth pattern.
- [Iris](docs/01-foundations/tools/instruments/forceps/iris.mdx) — ~ 10 cm fine thumb forceps; iris-vs-Adson distinction; hypospadias / glansplasty / labiaplasty default.
- [Lahey](docs/01-foundations/tools/instruments/forceps/lahey.mdx) — 2×2 / 3×3 interlocking-tooth traction-grasping forceps; Frank Lahey RLN historical context.
- [Ring (Sponge / Foerster / Rampley) Forceps](docs/01-foundations/tools/instruments/forceps/ring-forceps.mdx) — ring-jaw ratcheted forceps; prep, packing, sponge-stick dissection, Kittner handle, atraumatic cervical grasp.
- [Kittner (Peanut) Dissector](docs/01-foundations/tools/instruments/forceps/kittner.mdx) — peanut sponge for atraumatic plane development.

### Needle holders (2 pages)

- [Olsen-Hegar](docs/01-foundations/tools/instruments/needle-holders/olsen-hegar.mdx) (above).
- [Mayo-Hegar](docs/01-foundations/tools/instruments/needle-holders/mayo-hegar.mdx) — workhorse ring-handled ratcheted needle holder. Seki 1988 Grip-1-vs-Grip-2 accuracy data (1.4 vs 2.0 mm). **Corrected** historical attribution to Alfred Hegar (not Ernst). Abidin 1990 TC-insert mechanics.

### Clamps (14 pages)

- [Allis](docs/01-foundations/tools/instruments/clamps/allis.mdx) — Andrews 2023 RCT 6.3% vs 55.3% post-removal bleeding vs single-tooth tenaculum.
- [Babcock](docs/01-foundations/tools/instruments/clamps/babcock.mdx), [Kocher](docs/01-foundations/tools/instruments/clamps/kocher.mdx) — atraumatic-vs-traumatic spectrum (Babcock → Allis → Kocher).
- [Kelly](docs/01-foundations/tools/instruments/clamps/kelly.mdx) — distal-half-only serrations; Kellyclasia liver-transection context. Johns Hopkins "Big Four" historical context.
- [Péan](docs/01-foundations/tools/instruments/clamps/pean.mdx) — Péan-vs-Kelly serration-length distinction; Jules-Émile Péan as founder of modern hemostatic surgery + 1893 first shoulder arthroplasty.
- [Crile](docs/01-foundations/tools/instruments/clamps/crile.mdx) — George Washington Crile: radical neck dissection 1905–06, first direct human blood transfusion 1906, anoci-association, G-suit forerunner, Cleveland Clinic principal founder.
- [Halsted Mosquito](docs/01-foundations/tools/instruments/clamps/halsted-mosquito.mdx) — Halsted "Big Four"; radical mastectomy 1894; rubber surgical gloves 1889; Halstedian principles.
- [Jacobson](docs/01-foundations/tools/instruments/clamps/jacobson.mdx) — Julius H. Jacobson II as father of microsurgery (first to apply the operating microscope to vascular surgery).
- [Schnidt (Tonsil)](docs/01-foundations/tools/instruments/clamps/schnidt.mdx) — long curved deep-pelvic hemostat.
- [Rochester-Péan](docs/01-foundations/tools/instruments/clamps/rochester-pean.mdx) — long Mayo-Clinic-refined Péan variant.
- [Mixter (Right Angle)](docs/01-foundations/tools/instruments/clamps/mixter.mdx) — Broglia 1994 modification engineered for radical retropubic prostatectomy + cystectomy DVC encirclement.
- [Gemini](docs/01-foundations/tools/instruments/clamps/gemini.mdx) — ultra-fine right-angle. Eponym note: catalog designation, not surgeon eponym.
- [Heaney clamp](docs/01-foundations/tools/instruments/clamps/heaney.mdx) — stepwise Heaney vaginal-hysterectomy technique; ACOG 2017 vaginal-hysterectomy-as-preferred guidance; Pergialiotis 2014 / Jeppson 2017 vessel-sealer-vs-clamp meta-analysis.
- [Masterson](docs/01-foundations/tools/instruments/clamps/masterson.mdx) — straight long-jawed abdominal-hysterectomy counterpart to the Heaney. Samaan 2014 ureter "water under the bridge" anatomy.

### Scissors — new subdirectory `scissors/` (8 pages)

- [Mayo](docs/01-foundations/tools/instruments/scissors/mayo.mdx), [Metzenbaum](docs/01-foundations/tools/instruments/scissors/metzenbaum.mdx) — Pepper 2026 Anglo-American common-core data; role-segregation principle (straight Mayo for non-tissue, curved Mayo for tissue, Metzenbaum for fine planes).
- [Potts](docs/01-foundations/tools/instruments/scissors/potts.mdx) — angled 25 / 45 / 60° for vessel / ureter / urethra spatulation.
- [Iris Scissors](docs/01-foundations/tools/instruments/scissors/iris.mdx) — paired with iris forceps for the fine-skin tray.
- [Tenotomy](docs/01-foundations/tools/instruments/scissors/tenotomy.mdx) (Stevens / Westcott / Castroviejo).
- [Jorgensen](docs/01-foundations/tools/instruments/scissors/jorgensen.mdx) — heavy long curved blunt-tip scissor at the high-force end (Metzenbaum → Mayo → Jorgensen).
- [Scalpel Handles](docs/01-foundations/tools/instruments/scissors/scalpel-handles.mdx) — handle numbering (#3 / #3L / #4 / #4L / #7 / #9), pencil-vs-palmar grip, Bard-Parker historical context. Watt 2010 / DeGirolamo 2013 sharps-injury data. 12 refs.
- [Scalpel Blades](docs/01-foundations/tools/instruments/scissors/scalpel-blades.mdx) — blade numbering (#10 / #11 / #15 / #15c / #20). **Awadalla 2016 objective-sharpness data** (force-to-cut in N: razor 0.395 / dermablade 0.46 / plastic #15 0.541 / #15c 0.575 / #10 0.647 / standard #15 0.664). **Cold-steel vs energy-device wound-healing comparison** (Sowa 1985 — epithelial migration POD 1 vs POD 7; Sinha 2003 — re-epithelialization POD 7 vs POD 28; Kakarala 2010 — oncologic margin clarity advantage over monopolar electrosurgery). **Mathilde Schott 1890 patent** (US431153) for the detachable blade — recovered by Elson 2023 *Am Surg* historical paper. 13 refs.

### Cautery (3 pages)

- [Electrosurgical Pencil](docs/01-foundations/tools/instruments/cautery/electrosurgical-pencil.mdx) — full Bovie/Cushing 1926 history; ESU physics; peak-power table (30 W set = 90/228/1154 W cut/blend/coag); FDA 20-yr data (178 deaths / 3,553 injuries); CIED management; capacitive-coupling mitigation; Charoenkwan 2017 Cochrane.
- [Bovie Tips](docs/01-foundations/tools/instruments/cautery/bovie-tip.mdx) — **new page replacing the deleted Colorado Tip**. Consolidates standard blade / needle (Colorado) / extended / ball / loop / bent / laparoscopic-hook. Papay 1998 needle-vs-cold-scalpel alopecia.
- [Gerald Bipolar](docs/01-foundations/tools/instruments/cautery/gerald-bipolar.mdx) — **corrected** the prior "fine-tipped" framing; defining feature is the broad flat 1–2 mm platform tip. Mikami 2004 gold-plated-tip data.
- **Deleted**: `malis-bipolar.mdx` (consolidated into the Gerald Bipolar mirror-finish reference; Malis credited in the historical-context paragraph as the 1960s neurosurgical bipolar pioneer).

### Retractors (22 pages)

- [Adson-Beckman](docs/01-foundations/tools/instruments/retractors/adson-beckman.mdx), [Lone Star](docs/01-foundations/tools/instruments/retractors/lone-star.mdx) — expanded with **Tranchart 2008** cutaneous perianal recurrence at hook sites in J-pouch coloanal anastomosis for rectal cancer, framed for the RU/urogyn surgeon as a tissue-seeding caveat.
- [Sims](docs/01-foundations/tools/instruments/retractors/sims.mdx) — with the **explicit ethics-and-legacy section** acknowledging Sims's technique development on enslaved Black women (Anarcha, Betsey, Lucy) without anesthesia and the 2018 Central Park statue removal.
- [Senn](docs/01-foundations/tools/instruments/retractors/senn.mdx) — Senn-Miller blunt-prong default; Nicholas Senn historical context.
- [Langenbeck](docs/01-foundations/tools/instruments/retractors/langenbeck.mdx) — Bernhard von Langenbeck (Halle chief of surgery, early German Lister-antisepsis adopter, von Langenbeck palatoplasty 1861, Hueter-Volkmann law, "Richard Leander" children's literature).
- [S Retractor](docs/01-foundations/tools/instruments/retractors/s-retractor.mdx) — bridges the Richardson-to-Deaver gap.
- [Deaver](docs/01-foundations/tools/instruments/retractors/deaver.mdx) — Kvist-Poulsen 1982 11.6% femoral neuropathy with deep lateral self-retaining blades.
- [Richardson](docs/01-foundations/tools/instruments/retractors/richardson.mdx) — **corrected** historical attribution to **Maurice Howe Richardson** (MGH; collaborator with Reginald Heber Fitz on early appendectomy), not Edward Peirson Richardson.
- [Army-Navy](docs/01-foundations/tools/instruments/retractors/army-navy.mdx) — non-eponymous (US Army/Navy Medical Corps standardization). Rankin 2014 PLA 3D-printed retractor at ~ $0.46 / unit + 13.6 kg tangential force; Chambers 2020 Air Force Retractor for expeditionary medicine.
- [Volkmann (Rake)](docs/01-foundations/tools/instruments/retractors/volkmann.mdx) — 1–6-prong variants; Volkmann's ischemic contracture 1869 / Hueter-Volkmann law historical context.
- [Malleable (Ribbon)](docs/01-foundations/tools/instruments/retractors/malleable.mdx) — shape-adaptable visceral retractor + shield. **Rodrigues 2006 retained-instrument case** (33 × 5 cm ribbon retained 14 years; copper radiopaque on plain film).
- [Weighted Speculum](docs/01-foundations/tools/instruments/retractors/weighted-speculum.mdx) — **rewritten as the full Auvard Weighted Speculum page**. **Vilos 2003 thermal-burn safety** section (ball > 45 °C for > 30 min after autoclaving; ≥ 1 L saline cools to < 40 °C in 1 min).
- [Skin Hooks](docs/01-foundations/tools/instruments/retractors/skin-hooks.mdx) — Joseph / Guthrie / Gillies / double-prong / Walton / retractable variants. **No-crush mechanism** as the defining advantage over forceps. Clark 2019 (85.1% utilization), Talebi-Liasi 2023 (56.7% past-year sharps-injury rate), LoPiccolo 2012 (no exposures with blunt hooks).
- [Breisky-Navratil](docs/01-foundations/tools/instruments/retractors/breisky.mdx) — **rewritten** with August Breisky + Josef Navratil joint attribution. Vitale 2018 sacrospinous-fixation context.
- [Weitlaner](docs/01-foundations/tools/instruments/retractors/weitlaner.mdx) — hinged scissor-style self-retaining.
- [Balfour](docs/01-foundations/tools/instruments/retractors/balfour.mdx) — Donald Church Balfour 1912 Mayo Clinic three-point retraction.
- [Omni-Tract](docs/01-foundations/tools/instruments/retractors/omni-tract.mdx) — articulating-arm alternative to ring-based Bookwalter. Mehrara 2003 pediatric-Omni for microsurgical recipient-vessel work.
- [Thompson](docs/01-foundations/tools/instruments/retractors/thompson.mdx) — obesity bar + sidebar architecture; independently releasable per-arm joints. Chang 2010 Modified Makuuchi + Thompson.
- [Denis Browne](docs/01-foundations/tools/instruments/retractors/denis-browne.mdx) — Sir Denis Browne (Great Ormond Street; father of modern UK pediatric surgery). Architectural ancestor of the Lone Star / Alexis.
- [Graves Speculum](docs/01-foundations/tools/instruments/retractors/graves.mdx) — bivalve duckbill office workhorse. **Historical attribution corrected** to William P. Graves (Boston gynecologist), not Robert James Graves of Graves' disease (Irish internist; Feliciano 2023). ACOG 2020 size-selection guidance.
- [Bookwalter](docs/01-foundations/tools/instruments/retractors/bookwalter.mdx) — table-fixed self-retaining ring retractor. Noldus 2002 > 4,000-case safety review (4 bowel injuries — all delayed POD 2–7; 1 femoral neuropathy).
- [Perineal Bookwalter](docs/01-foundations/tools/instruments/retractors/perineal-bookwalter.mdx) — **expanded** to a two-modification family page covering both **Jordan** (perineal urethroplasty) and **Brooke** (perineal prostatectomy) blade modifications.
- [Turner-Warwick](docs/01-foundations/tools/instruments/retractors/turner-warwick.mdx) — **corrected** the prior "retropubic" description; this is the self-retaining ring-based **perineal** retractor purpose-built by Richard Turner-Warwick.

**Index cleanup**: deleted **Heiss**, **O'Connor-O'Sullivan**, **Suture Scissors**, and multiple additional-list duplicates (Mosquito-Halsted, Schnidt, Mixter, Sponge-Holding, Kelly, Auvard, Mayo-Hegar) after promoting their primary slugged entries. Replaced **Rumi Uterine Manipulator** and **Koh Colpotomizer** rows with a single consolidated [Uterine Manipulators](docs/01-foundations/tools/instruments/urethral-specialty/uterine-manipulator.mdx) entry.

### Urethral & Pelvic Specialty (3 pages)

- [Crawford Fascial Stripper](docs/01-foundations/tools/instruments/urethral-specialty/crawford-stripper.mdx) — **historical-attribution corrected** from "Edmund Sterling Crawford" (vascular surgeon, different person) to **J. Stewart Crawford** (Canadian oculoplastic surgeon, 1956 frontalis sling). Framed for the urogyn surgeon: autologous fascia-lata pubovaginal sling (PVS) for SUI / ISD / recurrent SUI / mesh-avoidant patients, salvage sling after mesh erosion, fascia-lata interposition for VVF / RVF / RUF, pediatric BNR, urethroplasty buttress, mesh-free sacrocolpopexy. Johnson 2024 + Delu 2024 urogynecologic donor-site data; Bleyen 2009 pediatric outcomes.
- [Stamey Needle](docs/01-foundations/tools/instruments/urethral-specialty/stamey-needle.mdx) — full **Pereyra → Stamey → Raz → Burch → TVT** lineage. Long-term-decline outcomes (Kondo 71.5% at 14 yr; Nigam 28% at 9 yr with all repeat needle ops failing; Clemens 44% at 15 yr). Glazener 2017 Cochrane showing needle suspension inferior to Burch (71% vs 84% cure). Type III ISD as contraindication.
- [Uterine Manipulators](docs/01-foundations/tools/instruments/urethral-specialty/uterine-manipulator.mdx) — general family page (RUMI + Koh / VCare / Hohl / Clermont-Ferrand / Colpo-Probe / myoma screw / Boztosun). Pan 2025 cadaveric ureteral-displacement (1.4 → 6.2 cm). Husslein 2017 RCT (Hohl vs Colpo-Probe). Melnyk 2025 carbon-footprint / cost analysis (reusable saves $16–43k over 300 uses). Endometrial-cancer manipulator-safety debate framed as out-of-scope but mentioned for multidisciplinary awareness.

### Stub-fill resolution

Mid-session, **15 stale uncommitted doc-page edits** from a prior unmerged 2026-05-11 launch-stub-sweep session were salvaged and applied on top of current main (immunosuppression, intestinal-segments, gelman sound, drug-coated-balloon, adjustable-continence-devices, neuromodulation, lotus-petal-flap, ventral-onlay-glanuloplasty, laminated-gracilis-flap, transperineal-reanastomosis, glans-reconstruction, penile-skin-reconstruction, pde5-inhibitors, intracavernosal-injections, muse-intraurethral). Stale CLAUDE.md / CHANGELOG.md / _STATUS.md / stats.json from the same uncommitted set were discarded as superseded. Fixed one `/04h-fistula-repair/both-genders/` → `/all-patients/` broken link to match the 2026-05-12 rename.

### Conventions reinforced for instrument pages

- **House-style structure**: bold-lead one-paragraph summary → Design → RU/urogyn Uses (organized by anatomic / procedural use case) → Comparison table vs adjacent instruments → Technique pearls → Safety profile → Historical Context → cross-links → References.
- **Historical-attribution corrections** when warranted (Crawford, Richardson, Hegar, Graves, Turner-Warwick) — flag the prior index error, give the correct attribution, anchor to a citation.
- **Index promotion pattern**: instrument moves from the "additional" list (no slug) to a primary slugged entry once a dedicated page exists; the additional-list duplicate is removed in the same commit.
- **Scope-framing rule**: instruments that originated in non-RU specialties are framed for WARWIKI scope by leading with the RU/urogyn use cases and noting cross-disciplinary context briefly. Out-of-scope cancer-surgery topics are explicitly framed as such.
- **Subdirectory creation**: new `scissors/` subdirectory created with `_category_.json` at sidebar position 12.

Verification: `npm run lint:citations`, `npm run lint:links` clean across **1,095 files**. 43 commits, all fast-forwarded to `main`.

---

## 2026-05-14 — Database-gap pass: new biomaterials, pharmacology, and instrument pages

Cross-site audit for branded products, agents, and instruments mentioned in clinical articles but missing dedicated entries in the relevant database. Resulted in **6 new substantive pages, 4 MIST-BPH device stubs, 4 forceps / needle-holder expansions, and 1 Tutoplast major-expansion follow-up.** All commits fast-forwarded to `main`. Lints clean throughout (~1,053 files).

### Audit method

Listed inventories in `tools/biomaterials/`, `tools/instruments/`, and `pharmacology/` and grepped `docs/` for branded products (Tutoplast, AlloDerm, FlexHD, ProACT, ATOMS, Argus, Remeex, AdVance, Botox, imiquimod, Optilume, Rezūm, etc.). Cross-referenced against the existing directory contents to find items repeatedly mentioned in procedure / clinical-condition articles but lacking dedicated foundations entries. The user's exemplar — **Tutoplast** — had not been caught by the prior biomaterials-section rewrite.

### New biomaterials pages

- **[Tutoplast-Processed Allografts](docs/01-foundations/tools/biomaterials/biological-grafts/tutoplast-allografts.mdx)** — first created with 19 refs, then **substantially expanded to 39 refs** in a follow-up commit incorporating user-supplied source material. Final coverage spans the Tutoplast process (osmotic / oxidative / alkaline / solvent-dehydration / 17.8–25 kGy gamma; Moore 1997, Vangsness 2006, Grieb 2006); Peyronie's pericardium series (8 series including Levine & Estrada 2003 n = 40, **Taylor & Levine 2008 n = 81 mean 58 mo** — the longest published series, Hellstrom & Reddy 2000, Egydio 2002 / 2008, Hatzichristou 2002, Usta 2004, Pathak 2020); Kovac & Brock 2007 head-to-head table (Tutoplast vs dermal vs SIS — **100% straightening but 23% length / 39% rigidity preservation**); new **Complex Penile-Prosthesis Corporoplasty** section anchored on Palese & Burnett 2001 and Farrell 2019; expanded female-SUI section with direct Suspend-Tutoplast comparators (**McBride 2005**: USI recurrence **41.7% Tutoplast vs 0% autograft, p = 0.007**; **Howden 2006**: 3–4× higher failure / women-year for cadaveric vs autologous); new **Pelvic Organ Prolapse — Sacrocolpopexy** section (Loffeld 2009 Tutoplast vs Prolene RR 2.9 reintervention; Maher 2016 Cochrane; ACOG 2019). Venous-reconstruction cross-link (Coleman 2014 bovine). Comparative summary table; Advantages / Limitations / Current Status sections.
- **[Human Acellular Dermal Matrix](docs/01-foundations/tools/biomaterials/biological-grafts/human-acellular-dermal-matrix.mdx)** — AlloDerm family page (18 refs). Product table (AlloDerm, AlloDerm RTU, FlexHD, Belladerm, Repriza, AlloMax, AxisDermis, Epiflex, DermaMatrix); processing detail; Peyronie's PIG outcomes (Cosentino 2016, Liu 2016, Adamakis Epiflex 2010); IPP-revision and phalloplasty applications; parastomal-hernia data; **cautionary cosmetic-girth data** (Solomon 2013 42% infection / exposure, Xu 2019 60% erectile discomfort).
- **[ProACT Adjustable Balloons](docs/01-foundations/tools/biomaterials/prosthetics/proact-balloons.mdx)** — device-level entry (10 refs). Paired silicone-balloon + titanium scrotal-port construction; **bilateral focal compression at bladder neck** (mechanism distinct from all sling devices that act at the bulbar urethra); postoperative percutaneous titration; iso-osmolar radiocontrast fill; MR-conditional construction; device-level comparison table vs AUS / AdVance / Virtue / ATOMS / Argus / Remeex; **Uromedica → Laborie 2018** regulatory timeline; failure-mode profile (mechanical balloon failure, migration, erosion).
- **[Male Continence Implants — Sling Devices](docs/01-foundations/tools/biomaterials/prosthetics/male-continence-implants.mdx)** — sling-family device page (8 refs). Covers AdVance / AdVance XP, Virtue, ATOMS, Argus, Remeex MRS, legacy InVance / I-STOP TOMS. Component-and-materials breakdown for each; **mechanistic comparison** (compressive vs repositioning, fixed vs postoperatively adjustable); materials-by-class summary (Type 1 polypropylene, silicone elastomer, titanium ports); US regulatory status; shared device-level failure modes.
- **Four MIST BPH device stubs under `adjunct-specialty/`** (3 refs each): **[Rezūm](docs/01-foundations/tools/biomaterials/adjunct-specialty/rezum.mdx)** (Boston Scientific convective water-vapor), **[iTind](docs/01-foundations/tools/biomaterials/adjunct-specialty/itind.mdx)** (Olympus 5–7 day temporary nitinol), **[Aquablation](docs/01-foundations/tools/biomaterials/adjunct-specialty/aquablation.mdx)** (Procept AquaBeam robotic waterjet), **[Optilume BPH](docs/01-foundations/tools/biomaterials/adjunct-specialty/optilume-bph.mdx)** (Laborie paclitaxel DCB, PINNACLE RCT). Each covers components, mechanism, indications, reconstructive-urology relevance, and cross-links to its procedure page and sibling MIST devices.

### New pharmacology pages

- **[Botulinum Toxin](docs/01-foundations/pharmacology/storage-oab/botulinum-toxin.mdx)** — onabotulinumtoxinA (Botox) page (14 refs). SNARE-cleavage mechanism with dual motor and sensory effects; FDA-approved OAB (100 U, Nitti / Chapple) and NDO (200 U, Cruz / Ginsberg); off-label DSD sphincter chemodenervation, primary bladder-neck obstruction, IC/BPS; adverse-effect profile with the **OAB vs NDO retention split (6% vs 30%)**; retreatment / antibody resistance; non-interchangeable formulation comparison (Dysport, Xeomin, Jeuveau, Daxxify, MyoBloc). The previously missing canonical foundations entry for the agent referenced across NLUTD pages, OAB DB, and intradetrusor-botox procedure.
- **[HPV / Condyloma Topical Agents](docs/01-foundations/pharmacology/dermatologic-topical-urethral/hpv-topical-agents.mdx)** — imiquimod, sinecatechins (Veregen EGCG), podophyllotoxin / podophyllin, TCA, off-label topical 5-FU, intralesional interferon (9 refs). Patient-applied vs clinician-applied; CDC 2021 STI guidelines and Cochrane SR efficacy / recurrence; pregnancy-safe agents (TCA, surgical); immunosuppressed-patient regimens; intraurethral / meatal lesion management; **9-valent HPV vaccination** as prevention.

### Forceps and needle-holder expansions

Five existing instrument pages substantially expanded from short stubs into comprehensive entries:

- **[Russian Tissue Forceps](docs/01-foundations/tools/instruments/forceps/russian.mdx)** — corrected the prior "multiple small teeth" framing (concentric **serrations**, not teeth). Comparison table vs DeBakey / Adson / Bonney / Gerald; reconstructive-urology use cases (bladder, ureter, fascial harvest, flap handling, tunica, renal pelvis, suture-edge eversion); historical context. 5 refs (Kirkup 1996 spring-forceps history; Cheng 2016 FEA grasper mechanics; Sachs 1998; Chandler 2017 real-time tissue-trauma; Sakaguchi 2018 force-limiting grasper).
- **[Gerald Tissue Forceps](docs/01-foundations/tools/instruments/forceps/gerald.mdx)** — **new page** (the Gerald entry was missing). Smooth, fine-serrated, and 1×2 toothed variants; **Marucci 2000 instrument-tissue-interface trade-off** as the central framing; Smooth-vs-Toothed selection guide by clinical scenario (vasovasostomy mucosa vs muscularis, tunica albuginea, BMG, dartos, fine genital skin); comparison vs Adson-toothed; reconstructive-urology use across vas / ureter / Peyronie's / IPP / urethroplasty / hypospadias. 8 refs.
- **[Bonney Tissue Forceps](docs/01-foundations/tools/instruments/forceps/bonney.mdx)** — design detail (1×2 teeth, 3–4 mm broad tips, cross-hatched heavy shaft, firm spring); Marucci 2000 grip-trauma trade-off anchored on **Rodrigues 2012** tractive-force data (fascia ~ 11.4 N tolerance vs fallopian tube ~ 1.25 N); explicit Bonney-vs-Adson-toothed distinction; full forceps-family comparison; fascial-closure primary use grounded on the **STITCH small-bites RCT** (13-yr incisional hernia 49% → 34%) and **EHS/AHS 2022** closure guidelines; Wertheim-Bonney historical context; expanded urologic applications (radical nephrectomy / prostatectomy / cystectomy, Gibson incision, Gerota's fascia, pubovaginal-sling fascial harvest); avoid-list. 10 refs.
- **[DeBakey Tissue Forceps](docs/01-foundations/tools/instruments/forceps/debakey.mdx)** — serration-pattern anatomy (2–3 rows of rounded longitudinal ridges with interdigitating central groove); tip-width / length / variant taxonomy (15 / 19 / 24 / 30 cm; standard / broad / extra-fine; titanium variants); friction-vs-penetration mechanism contrast; endothelial-integrity historical rationale (Mansfield 1978, Zeebregts 2003); biomechanical-evidence table (Marucci wave-vs-tooth p &lt; 0.001, Cheng FEA, **Heijnsdijk 2004** contact-area-and-profile optimum at 37 N pinch / 3 N slip, Bos 2013 rounded-edge peak-pressure, Darçin 2004 clamp-injury); MIS-jaw-design adoption; DeBakey instrument-family overview (vascular / Satinsky / needle-holder / Bahnson / Cooley / bulldog clamps). 12 refs.
- **[Ryder Needle Holder](docs/01-foundations/tools/instruments/needle-holders/ryder.mdx)** — smooth-vs-TC-insert jaw variants (**Abidin 1989 / 1990** atraumatic-rounded-edge and metallurgically-bonded evidence); physical dimensions; biomechanics of needle security (Edlich 1990 clamping-moment-and-bending relationship; Abidin 1989 needle-damage on cross-hatched jaws) and suture integrity; side-by-side comparison vs Mayo-Hegar / Crile-Wood / Castroviejo; explicit Ryder-vs-Castroviejo and Ryder-vs-Mayo-Hegar distinctions; expanded urologic uses (ureter, bladder, renal pelvis, urethroplasty, penile, renal transplant, AUS / sling / fistula); training notes with **Seki 1988** grip-technique and **Durand 2022** force-sensing data (experts &lt; 2 N, trainees up to 8 N). 11 refs.
- **[Heaney Needle Driver](docs/01-foundations/tools/instruments/needle-holders/heaney.mdx)** — detailed curved-jaw and TC-insert variant detail; four-point biomechanical rationale for curvature (angle of approach, needle trajectory, wrist ergonomics with **Basager 2024** small-hand musculoskeletal data + **Berguer 1999** ergonomics, visualization); full needle-holder comparison; explicit Heaney-vs-Mayo-Hegar and Heaney-vs-Ryder distinctions; expanded reconstructive-urology uses (open RP urethrovesical anastomosis, radical cystectomy diversion anastomoses, perineal urethroplasty, fistula repair, apical prolapse suspension); gynecologic / colorectal applications with **Pickett 2023 Cochrane** vaginal-hysterectomy preference; Heaney instrument family (clamp, retractor, **pedicle stitch**); variants (Heaney-Ballentine, Stratte, Finochietto, Sarot, Thorlakson); Heaney-stitch technique anchored on **Balgobin 2019** simulation curriculum (pass rates 3.3–46.7%). 11 refs.

### Index updates

- Registered new entries in the biomaterials landing-page database: Tutoplast-Processed Allografts, Human Acellular Dermal Matrix, ProACT Adjustable Balloons, Male Continence Implants (Slings), and the four MIST BPH device stubs.
- Updated the storage-oab and dermatologic-topical-urethral pharmacology indices.
- Added Gerald to the instruments landing-page database; refined the Russian database row description (the prior "star-burst tip" gloss was inaccurate — concentric serrations).
- Corrected the pre-existing "Bovine Dermal Graft / Permacol" row in the biomaterials landing — Permacol is porcine, not bovine; row updated to Peri-Guard / Veritas / Xenform.

### Conventions reinforced

- For named-device biomaterial pages with an existing procedure page (ProACT, ATOMS, Argus, AdVance, Virtue, Remeex, Rezūm, iTind, Aquablation, Optilume BPH): the **device page** covers components, materials, mechanism, device-level comparison, regulatory status, and failure modes, with explicit cross-links to the procedure page for technique / outcomes / clinical positioning. Mirrors the IPP / AUS / PTNS pattern already established.
- When user-supplied source material contains a reference list, **deduplicate against the existing page** before integrating — the Tutoplast follow-up initially had a Hellstrom 2000 entry as both ref 1 and ref 17.
- Renumbering refs after deduplication: do a single complete-rewrite rather than chained sed passes — sequential `N → N-1` replacements cascade when ranges overlap (one earlier attempt collapsed refs 18–40 → 17 across the file).

---

## 2026-05-12 (biomaterials) — Full biomaterials-section rewrite

End-to-end evidence-based rewrite of the entire `docs/01-foundations/tools/biomaterials/` directory. ~40 commits across ~30 device / material pages, all fast-forwarded to `main`. Lints clean (1,042 files). Common rewrite pattern: history → mechanism → design / device-by-device comparison → indication-specific outcomes tables → contraindications → complications → comparative effectiveness → clinical bottom line, with house-style citations and DOI-linked anchors throughout.

### Bulking agents

Every page in `biomaterials/bulking-agents/` substantially expanded:

- **Bulkamid (PAHG)** — 24 refs. FDA 2020, particle-free polyacrylamide hydrogel composition / mechanism, 10/2/5/7-o'clock submucosal injection, Sokol pivotal RCT vs Contigen, Elmelund / Nosal predictors, Lose / Toozs-Hobson / Lamblin / Sze outcomes table, the **Helsinki TVT-vs-PAHG 5-yr NEJM Evidence 2025 RCT** (PAHG did not meet noninferiority for satisfaction — 74.7% vs 92.7% — but had half the complications and 86% subjective cure at 5 yr), head-to-head sling table, Braga 80% post-failed-MUS cure, Myhr Norwegian registry, post-prostatectomy framing inferior to AUS, Ramsay 71% pediatric VUR, AUA/SUFU 2023 96-mo persistence.
- **Macroplastique (PDMS)** — 28 refs. Textured PDMS macroparticles in PVP, foreign-body-encapsulation mechanism, MIS non-endoscopic delivery, 3D EVUS placement predictors (OR 22 for proximal+circumferential), Ghoniem 2009 pivotal RCT vs Contigen (61.5% vs 48% statistical superiority), Ghoniem-Miller meta cure curve, ROSE 5-yr 47.6% / Kusin 2024 7.4-yr 43%, three-way comparison vs Bulkamid, **2.4% urethral exposure signal** at median 48 mo, FDG-PET pitfall, Imamoglu RCT vs AUS for post-prostatectomy SUI, Moore prospective vs Deflux 90% vs 81% pediatric VUR.
- **Coaptite (CaHA)** — 12 refs. 75–125 μm CaHA microspheres in CMC gel, non-immunogenic radiopaque Radiesse-equivalent, Unger 2016 sonographic **40–46% 3-mo volume loss** correlated with efficacy decline, Mayer 2007 pivotal RCT vs Contigen, AUA/SUFU 73.2-mo persistence, three-way comparison headlining the **34–41% transient retention** (highest among bulking agents), erosion / Gafni-Kane granuloma signal, Mevorach pediatric VUR data **inferior** to Macroplastique and Deflux.
- **Durasphere** — 17 refs. Pyrolytic carbon-coated ZrO₂ beads 212–500 μm in beta-glucan (EXP 90–212 μm), historical FDA 1999 as first non-collagen agent, Madjar 4-o'clock + hydrodissection technique, Lightner 2001 pivotal RCT vs Contigen (80.3% vs 69.1%), **Chrouser 2004 defining long-term data showing only 21% effective at 36 mo**, Pannek 2001 documented lymph-node migration despite > 80 μm bead size, Madjar 2006 2.9% periurethral mass formation at 14.7 mo, fecal-incontinence Maeda Cochrane head-to-head vs PTQ silicone (Durasphere significantly worse) with type-III hypersensitivity case, ASCRS 2023 non-recommendation.
- **Urolastic (PDMS-U)** — 12 refs. In-situ-polymerizing PDMS distinct from Macroplastique macroparticles, no-cystoscopy 10/2/4/8 periurethral injection, Capobianco 2018 SR (pooled 57% objective, 20% reinjection), Futyma 2016 24-mo (32.7% objective with **4.5% intravesical material** unique complication, 25.8% complication rate), Casteleijn 2020 with **18% excision rate**, Casteleijn 2023 PDMS-U vs MUS (MUS objective cure 90% vs 63% but PDMS-U cheaper €3,567 vs €6,688), Hoe 2021 SR with erosion **up to 24.6%** (highest of any urethral bulking agent), Casteleijn 2023 learning-curve study finding **physician experience did not improve safety**.
- **Deflux (Dx/HA, NASHA/Dx)** — 35 refs. Dextranomer + NASHA biodegradable composition with the four-phase mechanism (94% giant-cell granuloma, 69% calcification histologically), STING/HIT/Double HIT comparison with Yap meta showing HIT superior (82.5% vs 71.4%) and 92% practice shift to double HIT, resolution-by-grade table (79% I–II to 51% V), major-studies table (Puri 2012 87.1%, Friedmacher 2018 69.5% at 8.5 yr, Moore 2014 81% vs 90% Macroplastique, Lee 2009 true 1-yr 46.1%), the **Swedish Reflux Trial** caveat that resolution does NOT reduce febrile UTIs or renal scarring vs antibiotic prophylaxis, Cochrane 2019 favoring Macroplastique, comprehensive late-complications section (delayed obstruction 1 mo to 8 yr post-injection with **asymptomatic renal function loss** across Papagiannopoulos / Rubenwolf / Pham / Romain / Nseyo / Vandersteen), **Solesta extension for adult fecal incontinence** (52% vs 31% sham response), dedicated "Why This Matters for Reconstructive Urology" section.

### Historical bulking agents (split out)

The single `historical-agents.mdx` hub was split into four dedicated pages, with the hub slimmed to a navigation index:

- **Teflon (PTFE / Polytef)** — 32 refs. Politano 1964 as first urologic bulking agent ever, Puri 1981 STING origin, the critical 3–100 μm particle-size design flaw with phagocytosable fraction &lt; 50 μm, **Malizia 1984 JAMA migration study** with Aaronson / Vandenbossche / Claes / Aragona confirmation, the **Puri-Granata multicenter 12,251-ureter VUR experience** with Chertin 11–17 yr 95% reflux-free, McKinney 9-year-out BOO teflonoma, laryngeal teflonomas. Never FDA-approved for urologic use.
- **Contigen (GAX-collagen)** — 37 refs. First FDA-approved (1993), **gold-standard comparator** in every subsequent pivotal trial until C.R. Bard discontinued 2011, mandatory skin testing with HLA-DR2/DR4 and 28% antibody formation, **dermatomyositis SIR 18.8**, female SUI outcomes including Gorton 26% at &gt; 5 yr and Chrouser 5% at 62 mo (worst long-term durability), the four pivotal head-to-head RCTs (Ghoniem PDMS-superior, Lightner / Mayer equivalent, Sokol Bulkamid non-inferior), Westney 6.3-mo mean response in men.
- **Autologous fat** — 21 refs. Kato three-zone fat-graft remodeling, **Lee 2001 RCT showing 22.2% fat vs 20.7% saline (no benefit) with a fatal pulmonary fat embolism** — the only treatment-related death in any bulking-agent RCT, JAMA scientific review NNH 5, periurethral venous-plexus embolism mechanism, Palma 1994 VUR only 1/17 ureters corrected, 17–49% resorption range. Cochrane 2017: autologous fat should not be used as a bulking agent. Contrasting laryngology success story preserved. Adjacent ADRC / SVF regenerative programs (ADRESU 37.2%, Gotoh 69-mo, Maene SVF + PRF pilot).
- **Autologous chondrocytes** — 13 refs. Atala / Diamond tissue-engineered cartilage program: 1993 preclinical 94% cartilage in mice, 1994 mini-pig VUR, **Diamond-Caldamone 1999 clinical VUR 83% → Caldamone-Diamond 2001 long-term 65% at 1 yr** with mound volume loss / shifting on cystoscopy, Bent 2001 only-clinical-SUI study 50% dry with single injection but no control arm, Paltiel sonographic 34% mound volume loss, **Gargollo 2009 long-term 37% mound calcification at 9 yr** (3 cases mimicked UVJ stones). Detailed "why abandoned" framing and reconstructive-urology relevance.

### Biological grafts

- **Porcine Acellular Collagen Matrix** — 26 refs. Broadened scope to umbrella family (SIS + UBM + porcine dermis), decellularization protocol, commercial product map (Surgisis, Pelvisoft/Pelvicol discontinued, ACell UBM), urethroplasty evidence (Chen/Atala rabbit, Mantovani first clinical, narrow onlay-only scope with tubularized-graft failure ~20%), Springer pediatric urethrocutaneous fistula 100%, Ansari/Karram female posterior urethral reconstruction, UROGRAFT composite scaffold, full SUI sling decline curve (Barrington 85% short-term → Giri 54% vs 80.4% autologous → Broussard 42.9% → Siracusano 69% at 76 mo), PROSPECT / ACOG 214 for POP, nuanced Culligan / Deprest sacrocolpopexy data.
- **Porcine SIS** — 47 refs. Comprehensive Surgisis page. **Palminteri 2024 propensity-matched urethroplasty at 156 mo (SIS 68% vs BMG 83.4%)**, Peyronie's as strongest contemporary indication (Knoll 91%, Sayedahmed bicentric 74.4%, Rosenhammer matched-pair vs collagen fleece showing more SIS recurrence/shortening), Zhang/Liao bladder augmentation long-term 60% with cannot-replace-enterocystoplasty caveat, ureteral onlay-works-vs-tubularized-fails pattern, hypospadias corporal grafting 1-ply safe vs 4-ply higher complications, Farahat VVF 91.3%, **Cour 2022 LUT prosthesis perforation 100% as Martius alternative**, Rutner → Siracusano sling decline, **John 2008 31.3% intense inflammatory reaction** with 4-ply/8-ply SIS slings, transvaginal POP recurrence, Deprest sacrocolpopexy 21% vs 3% PP with histopathology showing SIS entirely replaced by connective tissue.
- **Bovine-derived grafts** — 25 refs. Broadened from dermis-only to umbrella family of bovine pericardium (Peri-Guard glutaraldehyde-fixed, Veritas non-crosslinked) and dermis (Xenform non-crosslinked bovine fetal dermis). Crosslinked-vs-non-crosslinked load-bearing distinction. Peyronie's as strongest indication (Otero 80.5%, Choi/Lee 70° → 5°, Caraceni Xenform 75% straightening with the **43.8% glans-sensitivity-loss / 25% ED safety signal**), Lara canine urethroplasty 80% fistula rate, mixed bladder-augmentation preclinical, Guerette 2009 anterior-colporrhaphy RCT no benefit, **Lipetskaia 2022 FDA-designed Xenform study with 36-mo 83.6% noninferiority to native tissue with 0.9% exposure / no erosion**.

### Autologous tissue

- **Rectus fascia** — 29 refs. Broadened from PVS-focused to multi-application: Cardenas-Trowers safety-zone harvest anatomy (5.4 cm superior to symphysis), full PVS evidence (Grigoryan 2024 SR, Khan 10-yr RCT 75.4% vs 73% TVT with higher dry rate and zero reoperations, Wu NEJM, Zargham, Athanasopoulos 85%), midurethral "sling on a string" (Osman 87.8%, Fayyad laparoscopic), autologous transobturator (Kilinc RCT, Vasudeva meta), sacrocolpopexy (Wang 2022 0% / 6.8% failure at 1 / 5 yr), Cormio trapezoidal cystocele sling (no recurrence at 62.6 mo), Peyronie's dorsal-lamina-of-rectus-sheath graft (Craatz histology), Pathak corporal reconstruction during IPP, full pediatric neurogenic bladder-neck toolkit (Bauer sling, Walker wrap, Bugg cinch, Kolligian myofascial wrap, Smith RAM flap, Horton epispadias/exstrophy), Johnsen metoidioplasty urethrocutaneous fistula repair.
- **Fascia lata** — 25 refs. Urology/urogyn-focused per user instruction (skipped ophthalmology, orthopedic SCR, neurosurgical skull-base). ITB anatomy and biomechanics (Hutchinson, Otsuka), Lemer tensile equivalence to rectus, Crawford-stripper minimally invasive harvest, PVS evidence (Latini 85%, Brown/Govier 90%), **Nair 17-yr RCT durable improvement**, Patel 2022 / Vereeck 2026 / Bock robotic sacrocolpopexy, Australia mesh-unavailable context, Peyronie's (Kargi 100%, Kalsi Tutoplast 79%, Burnett seminal series), pediatric bladder neck (Snodgrass Leadbetter-Mitchell 82%), Buckley 201-patient donor-site morbidity (17% any-issue, 1% hernia at 12 mo).
- **Bowel segments** — 54 refs. Comprehensive segment-by-segment reference. Detubularization first principle with LaPlace and the 34% vs 10% tubular-vs-patch contraction data; full **ileum** coverage (cystoplasty neurogenic 22.7% → 81.8% continence, adult capacity 166 → 572 mL and detrusor pressure 53 → 14 cmH₂O, multi-configuration neobladders, **Hautmann 35-yr 87% spontaneous voiding**, Bricker conduit, ileal ureter multi-institutional 91.7% with bilateral 3.7× renal-function risk, Yang-Monti, Monti channels); **ileocecal** pouches (Mainz 91% / Indiana ~100% with **16-yr revision-free survival** / Charleston / Miami); sigmoid neobladder meta vs ileal; **gastrocystoplasty "now largely abandoned"** framing with HDS 17–51% / alkalosis / **Castellan 10.3% reservoir malignancy**; jejunal-syndrome avoidance; appendix Mitrofanoff with lower revision than Monti. Full metabolic-complications table, **Somani 8-yr bowel-dysfunction data with 24% regret**, Chan 2026 pediatric obesity signal, secondary-malignancy table (ureterosigmoidostomy 2.58% → ileal conduit 0.02%) with 20–36 yr latency and 5-yr / 10-yr surveillance schedule, Higuchi caveat about the underlying congenital bladder as the risk driver.

### Synthetic meshes

- **Polypropylene** — 23 refs. Material / Amid classification, lightweight-vs-heavy outcomes (Page 2023: 7.3% vs 22.8% sacrocolpopexy complications), MUS evidence with the **Gurol-Urganci 95,057-woman UK cohort** (6.9% 9-yr reoperation), sacrocolpopexy data with the explicit **FDA-scope caveat that the 2019 transvaginal POP order does NOT apply to MUS or sacrocolpopexy**, complications (Chughtai NY 36,195 cohort 7-yr erosion 3.7% / reoperation 6.7%, Priyatini 2026 risk factors), ACOG 694 management framework, full 2008–2019 regulatory timeline.
- **Absorbable mesh** — 17 refs. Filtered to RU / urogyn scope (skipping hernia). Materials by degradation window (short-term Vicryl / PGA / PDS vs long-term P4HB / PLA / BIO-A / TIGR), the urine-specific degradation problem (PGA loses 64% strength by 10 d in sterile urine, total loss in 1 d with *Proteus*), 2024 Cochrane verdict against transvaginal POP, **Guler 2-yr P4HB sheep model with 0% vs 50% exposure vs PP**, PLGA cell-seeded bladder augmentation, biodegradable PLGA stents.
- **Coated / Hybrid mesh** — 22 refs. Three-category framing (partially absorbable, reinforced tissue matrices, electrospun / tissue-engineered scaffolds). Full transvaginal-POP partially-absorbable table (Farthmann 2013 PA 3.4% vs PP 7.5% exposure, Lensen 5% vs 12%, Quemener, Steures 2019 no benefit vs native tissue, Cho). **Redundancy resolved**: absorbable-mesh page's partially-absorbable subsection collapsed to a pointer here.

### Prosthetics

- **Inflatable Penile Prosthesis** — 57 refs. Full Scott 1973 → AMS 800 1983 history through 2002 ectopic-reservoir and 2001–2002 antibiotic-coating milestones to Rigicon and Zephyr entrants; three-piece component anatomy with AMS 700 / Coloplast Titan / Rigicon Infla 10 comparison; penoscrotal-vs-infrapubic equivalence; **high-submuscular reservoir placement with the Baumgarten Five-Step Technique** (1.0% revision, zero deep pelvic complications, ~5× further from bladder / iliac vessels than SOR); no-touch technique reducing infection to 0.46% (Eid); Chawareb 2025 perioperative antifungal prophylaxis OR 0.22; Miller meta-analysis device survival 93.3% at 1 yr → 52.9% at 20 yr with modern 5-yr improvement to 90.6%; Cocci 2025 92,777-patient complication SR; **changing microbiology to 90.5% virulent gram-negative / fungal organisms**; manufacturer-specific mechanical-failure profiles (BSCI no predominant site vs Coloplast 78–83% tubing fracture); full Peyronie's stepwise approach including PICS 84% and scratch + VED; early-IPP for ischaemic priapism (Ralph 2009 immediate insertion, 96% satisfaction, Dighero 100% no-regret); gender-affirming phalloplasty with **Levy 2026 Delphi consensus** and 42–78% 5-yr retention / 43% revision; combined IPP + AUS safety.
- **Malleable Penile Prosthesis** — 28 refs. Full history from Bogaraz 1936 rib cartilage through Small-Carrion 1975 to Rigi10 2019 and ZSI FTM; six-device current-market table (Tactra / Genesis / Rigi10 / ZSI 100 / ZSI 100 FTM / TUBE-Shah); design principles; expanded indication list with **MIST infection salvage**, refractory priapism, phalloplasty, resource-limited settings, hostile pelvis, length preservation; surgical technique with ~72-vs-87 min OR-time advantage; satisfaction data (Akdemir 96.2%, **Cayan 7.7% MPP-to-IPP conversion vs 0.2% reverse**); Habous penile-length preservation; **Rigi10 99.2% 3-yr device survival**; Kohl 2026 real-world EHR n = 29,385 showing mechanical-breakdown advantage (6.7% vs 9.1%) but higher explantation; full MIST data (Gross 93% / **Angulo-Llanos 2026 VA 29.5% reinfection with diabetic predictor**); phalloplasty (Fraiman meta 37% vs 38%, Sun infrapubic, Pigot ZSI 100 FTM, Levy 2025–2026 cohorts, Levy Delphi consensus).
- **Artificial Urinary Sphincter** — 43 refs. **Scoped to the device** (history, design, components, outcomes, alternative devices) with explicit cross-link to the AUS procedure page for the Hourglass / capsulotomy / same-size-replacement / tandem / TC / distal-double-cuff revision strategies from the prior session. Scott 1972 → AS 721/742/791-792 → **AMS 800 1983** (16 vs 7.6 patient-years mechanical-failure breakthrough); AUSCO 2025 prospective (94% &gt; 50% pad-weight reduction, 60% pad-free, 7.8% revision, zero infections); long-term reintervention-free survival table across France 8,475-patient database, Mayo 1,082-case Linder, Bentellis 16-center European, Ontario population, Léon long-term French 15-yr, **Cotte women-vs-men mid-term advantage**; MASTER RCT vs male sling, Sacco propensity-matched for moderate SUI; fragile-urethra erosion signal; prolonged-catheterization risk and deactivation-before-instrumentation imperative; **radiation as the single biggest risk factor** (HR 4.32–7.57) with the &gt; 1.74-yr post-RT timing signal; alternative-device table (Victo adjustable / ZSI 375 one-piece / FlowSecure / electronic) with the Victo postoperative-pressure-adjustability differentiator.

### Neuromodulation devices

- **Medtronic InterStim** — 50 refs. Schmidt / Tanagho 1970s NIH work → 1997 FDA approval → 2019–2020 InterStim Micro; three-generation comparison with the original-vs-InterStim-II battery longevity asymmetry (7.3 vs 5.9 yr) and MRI-labeling progression; real-world Swiss 1.5T non-head MRI safety with device off; expanded mechanism (somatic-afferent modulation, supraspinal effects on cingulate / PAG / limbic, neural plasticity, reversibility); four FDA indications plus off-label IC/BPS (84% success) and neurogenic bladder (84.2% permanent SNM success); testing-phase options including 44% PNE-failure rescue with tined-lead testing and &gt; 61–65% single-stage cost-effectiveness threshold; indication-specific outcomes (**InSite 67–82% 5-yr OAB**, 71% retention at 5 yr, FI pivotal 86% at 3 yr, **French 10-yr KM 64%**); full **ROSETTA** detail (6-mo OnaBT edge, 24-mo equivalence, **BTX higher UTI 24% vs 10%**) and cost-effectiveness against SNM; complications / reintervention table across six cohorts including **Medicare 8-yr 43% cumulative reoperation**; the **Cohen 2025 rechargeable-class real-world signal** (revision-free survival 64% vs 82%); Okocha 62% regret in FI cohort; guideline matrix.
- **Axonics SNM** — 15 refs. 2012 founding through 2024 BSCI acquisition; three-way device-spec table (Axonics r-SNM vs InterStim II vs InterStim Micro) plus post-acquisition F15 / R20 recharge-free variants; **ARTISAN-SNM pivotal data through 2 yr (90% / 89% / 93% responder rates, 37% completely dry at 2 yr)**; FI 6-mo data 87–92%; Cohen 2025 rechargeable-class real-world signal with trial-vs-real-world charging-acceptability discrepancy; Amundsen 2025 SR / meta vs iTNM showing comparable efficacy without trial phase.
- **Revi (BlueWind)** — 16 refs. RENOVA → OASIS history through FDA clearance for non-refractory UUI (**first-ever for an implantable neuromodulation device**); three-component architecture (battery-free implant + RF-coupled wearable + clinician programmer); no-internal-battery design advantage over SNM and eCoin; subfascial implantation under local in 34 min; OASIS pivotal outcomes showing **remarkably stable responder rates 78 / 82 / 79 / 79% across 6 mo / 12 mo / 2 yr / 3 yr** with 95–97% satisfaction and **zero device- or procedure-related SAEs through 3 yr**; **Sutherland 2026 QoL signal that 83% of non-responders still reported benefit** and 100% willing to continue.
- **eCoin (ITNS)** — 7 refs. FDA 2022, n = 137 pivotal 48-wk 68% responder rate, 2-yr extension 78% / 22% dry, TITAN 2 comparator data.
- **PTNS systems (biomaterials index)** — tightened to device-focused index (Urgent PC, NURO) with prominent cross-link at the top to the canonical [PTNS procedure page](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/percutaneous-tibial-nerve-stimulation.mdx). The two pages are not redundant: biomaterials page = device / hardware index (matches eCoin / Revi / Altaviva / Bulkamid pattern); procedure page = canonical clinical reference (mechanism, technique, SUmiT sham RCT, comparators, FI evidence, TTNS).
- **Altaviva** — discrepancy flagged: user pasted content described Altaviva as a Boston Scientific non-rechargeable SNM with full-body MRI, whereas the current WARWIKI page describes it as Medtronic's implantable tibial neuromodulator (TITAN 2 device, FDA-cleared Sept 2025). After confirmation, **current page kept**; pasted content treated as hallucination.

### Ureteral stents

- **Double-J stent** — 60 refs. Full Zimskind 1967 → Gibbons 1972 (CPT 52332) → Finney 1978 → Andriole 1984 history; Nestler 2020 smaller-stent advantage (4.7 Fr vs 7 Fr); three-method length selection with Barrett CT-measurement showing 100% vs 71% ideal positioning; comprehensive transplant evidence (Patterson 2024 Cochrane RR 0.25 leak / 0.42 stricture, Patel 2017 RCT early-vs-late removal 7.6% vs 28.6% complications, **Amara 2026 NSQIP n = 3,407 UTI signal OR 2.22**, Oudmaijer DJ-vs-single-J, Yin 2026 meta); Ordonez 2019 Cochrane stenting-vs-no-stenting with Pais OR 1.63 and Allam / Reddy RCTs; Katsimperis SR optimal 10–14 d dwell with Heidenberg 3-vs-7-d RCT; full **stent-on-string** evidence (Liu, Harrison SR, Oliver SR, Inoue controlled trial, Juliebø-Jones pediatric); Bosio 2019 USSQ data (**62% would be dissatisfied with further stenting**); Bhojani 2026 CEGSSS new short-dwell-time questionnaire; **Hinojosa-Gonzalez 2023 Bayesian network meta** identifying silodosin 8 mg + solifenacin 10 mg as top combination; Pricop 2024 combination-vs-mono RCT; Lamb α-blocker pain RR 0.59; Legrand 2021 / Maxim 2025 encrustation time curves; **Zhang 2020 6-year forgotten-stent case** with 4.2 cm bladder stone; Thomas 98% retrograde-URS-with-holmium success; full **metallic-stent evidence** (Chow Resonance 4-mo functional advantage, Kim 2018 CMS RCT 239 vs 80 days, Khoo SR, Ong, Benson, Law); Wang 2023 biodegradable mesh; drug-eluting landscape.
- **Percutaneous nephrostomy (PCN)** — 20 refs. Full indication list, SIR high-bleeding-risk workup with the ~7% pyo septic-shock framing; detailed Seldinger technique including posterolateral subcostal access, Brödel's-line posterior-calyx puncture at 20–30°, catheter sizing 8–12 Fr adult / 5–10 Fr pediatric, non-dilated-system challenge ~80–90% success; SIR quality-improvement complication thresholds with explicit "**asymptomatic bacteriuria should NOT be treated**"; PCN-vs-RUS evidence (Ahmad meta lower failure with PCN, **Kim antegrade 98.4% vs retrograde 47.4%** in MUO, QoL preference for internal stents); special populations (pregnancy US-only ALARA, pediatrics, malignancy); tract-tumor-seeding caveat for UTUC.
- **Nephroureteral stent (PCNU)** — 15 refs. PCN-vs-PCNU-vs-DJ comparison up top; full indication list with the **13% vs 87% surgical-ureteral-repair failure data**, Spradling hemorrhagic-cystitis case series, transplant complications, bridge-to-internalization, ileal-conduit setting; unique capping-trial use case; two-stage standard plus Arslan 2024 single-stage first-hand approach with shorter fluoro and 3× lower complications; **Moon 2024 MarketScan real-world exchange-interval data** (41% within 29 d vs 90-d recommendation); transileal retrograde NU catheter 91.8% / 89.8% in ileal-conduit patients; MUO antegrade vs retrograde 98.4% vs 47.4%.
- **Metal &amp; long-term ureteral stents** — 35 refs (post-cleanup). Rationale with **6.3/yr → 1.4/yr** exchange-frequency reduction and 43% annual cost reduction; five stent types each in depth — **Resonance** (full-length coiled Ni-Co-Cr-Mo with the **Blaschko no-central-lumen interstitial-flow mechanism that cannot be completely occluded by extrinsic compression**, 11.7-mo median functional survival, 1% lowest migration, active-urolithiasis caveat); **Memokath-051** (thermo-expandable nitinol with the cold-water-collapse removal feature, NICE ≥ 30-mo cost-saving framing, **5-yr 72% complication rate including 46% migration**); **Allium URS** (covered nitinol with curative-intent benign-stricture data **92.9% for ≤ 2 cm with 12–24 mo dwell**, Bian meta showing 81% 1–2 yr vs 65% &gt; 2 yr success, 321-patient prospective 3-yr 74% primary patency, radiation 54.7%); **Uventa** (PTFE-mesh with the **Kim 2016 long-term-safety alarm of 28% major complications including ureteroarterial fistula and OR 20.4 for placement ≥ 24 months**); **Detour extra-anatomic nephrovesical bypass**. Four-way comparison, polymer-vs-metallic data, specific contraindications including prostate-cancer-bladder-invasion Resonance failure HR 6.50.

### Adjunct specialty

- **Glean Urodynamics System** — 9 refs. Conventional-UDS limitations with Gross 2026 catheter-impairs-voiding data in neurogenic bladder; ring-shaped 45 mm OD / 5.1 mm (15.3 Fr) intravesical sensor anatomy; operational workflow (median insertion 33.6 sec / removal 5.7 sec, 100% voiding success with sensor in place); full MUSE pivotal feasibility (n = 38, 97% insertion success, **zero serious AEs**); **Hamson 2026 bench-top comparative data showing Glean significantly outperformed Laborie Goby air-charged catheter across rise time / fall time / bandwidth / accuracy / linearity**; UroMonitor developmental lineage (Frainey 2023 98% event capture); broader TAUM landscape (UroMOCA, WiCa, Bladder Pill). Removed the prior page's unverified "Bright Uro / FDA 510(k) 2025 / Cleveland Clinic June 2025" specifics absent confirmation.

### Conventions / cross-cutting

- **Device-vs-procedure scope discipline**: device pages (AUS, IPP, MPP, InterStim, Axonics, PTNS) cover device-level content with explicit cross-links to the procedure pages in `04-surgical-techniques/` rather than duplicating the surgical-technique and revision content.
- **Hub-trimming pattern**: when dedicated sub-pages exist (Teflon, Contigen, autologous fat, autologous chondrocytes), the parent hub (`historical-agents.mdx`) is slimmed to a navigation index.
- **Citation hygiene**: extensive user-supplied content often contained mid-list reference fabrications from search systems (eg penile-prosthesis citations on a stent page). Discipline: filter to citations actually used in the body and renumber contiguously — enforced by `npm run lint:citations` which catches both gaps and orphan anchors.
- **Altaviva-style verification**: when user-supplied content conflicts with the existing page's identity for a device, the existing page wins absent positive confirmation. Existing-page-correct, pasted-content-treated-as-hallucination is the default.

---

## 2026-05-12 (later) — Launch-asset session (external; no repo changes)

Working session focused on launch marketing materials. No commits to the repo — all deliverables saved to `~/Downloads/`. Recorded here so the next session knows what exists and what was tried.

**Pottred font experiment (reverted).** Owner shared a chunky decorative TTF (`~/Downloads/pottred/Pottred.ttf`) to try on the homepage hero wordmark. Wired via `@font-face` in `src/css/custom.css` and `font-family: 'Pottred', ...` on `.heroTitleLink` in `src/pages/index.module.css`, with the file copied to `static/fonts/`. Rendered fine but overflowed the viewport at the existing `clamp(3rem, 8vw, 5.75rem)` size, and the existing `-0.025em` letter-spacing crowded Pottred's already-tight glyphs. Owner chose to revert. All three changes (font file, `@font-face` rule, `font-family` override) removed from both this worktree and the main repo; repo tree returned to clean.

**Launch assets (external, in `~/Downloads/`):**

- `warwiki-homepage.png` — 2880×1620 headless-Chrome screenshot of the live homepage at desktop width for trailer use.
- `warwiki-end-card.png` — 3840×2160 (1920×1080 @ 2×) trailer end card: WARWIKI gradient title + "Reconstruction, codified." + `warwiki.org` on the homepage gradient. Source HTML at `/tmp/warwiki-end.html`.
- `warwiki-end-card-vertical.png` — 2160×3840 (1080×1920 @ 2×) 9:16 version of the end card for Reels/TikTok/Shorts. Source at `/tmp/warwiki-end-vertical.html`.
- `warwiki-infographic-instagram.png` — 2160×2700 (1080×1350 @ 2×) single-slide IG carousel post. Header "An open-access platform for functional reconstructive urology & urogynecology"; five feature blocks (Comprehensive · Evidence-first · Curated playlists · Listenable · In your pocket) with icons in the brand-blue rounded tile style; footer `warwiki.org` / "Reconstruction, codified." Source at `/tmp/warwiki-infographic.html`.
- `warwiki-infographic-twitter.png` — 1600×900 (16:9) two-column variant of the same infographic for Twitter/X. Source at `/tmp/warwiki-infographic-twitter.html`.

**Caption / post copy drafted** in conversation (not saved to disk):

- IG carousel slide-by-slide rewrite (10 slides → distilled to the four-quality "Comprehensive / Evidence-first / Curated playlists / Listenable / In your pocket" infographic that ended up being the single-slide deliverable).
- Trailer post captions for two trailers (vintage clips + modern clips) in two strategies (paired post vs separate posts), plus platform-specific notes for Twitter/Instagram/TikTok/YouTube Shorts.
- Quote-tweet copy options for the announcement (sincere/restrained/mission-first/direct/community variants).

**Platform decisions confirmed in the conversation:**

- Trailer aspect ratio: post **vertical (9:16) even on Twitter** — mobile feed is ~80% of views and gives vertical clips ~3× the real estate of 16:9.
- Trailer hosting: upload **natively to Twitter** rather than linking YouTube. External-link posts are deprioritized; YouTube can host the discoverability copy separately.
- Tone preference for all launch copy: concise, not boastful — drop "proud to announce" framing and superlatives.

---

## 2026-05-12 — Launch-day pass: polish, inclusive language, navigation consistency, new content

Twelve commits to `main` covering site polish, inclusive-language remediation, structural consistency, and three new clinical pages. Build clean across ~1,038 files.

### Anki deck — added and reverted

Built a 2,038-card Anki spaced-repetition deck (commit `267a77f`) covering the four in-scope sections — foundations, evaluation, clinical conditions, special populations — explicitly excluding the treatment atlas and library per the owner's direction. Three parallel agents extracted cards from each section into TSV temp files; a defensive dedup merge produced the final CSV at `static/anki/warwiki-anki-v1.csv` with a resource page at `docs/08-resources/anki-deck.mdx`. Cards followed a uniform shape (Front ≤ 200 chars, Back ≤ 350, hierarchical tag `WARWIKI::Section::Subsection::Topic`). The owner reviewed and chose to remove it (commit `6052c0a`); content lives in git history for a future iteration. The taxonomy and parallel-agent generation pattern are documented in CLAUDE.md for the next attempt.

### AUS revision / salvage expansion (commit `ac88819`)

Major expansion of the Revision and Salvage Techniques section on the [Artificial Urinary Sphincter](docs/04-surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter.mdx) page.

**New conceptual subsection** — "The Hourglass Debate: Capsulotomy and the Atrophy Question":

- Bugeja / Mundy / UCLH 2016 demonstration that the hourglass deformity at the cuff site resolves on capsulectomy and is largely an artifact of the constrictive fibrous pseudocapsule; concurrent manometry of explanted PRBs showed pressure loss in all cases, supporting **PRB material failure**, not true atrophy, as the dominant NOMECA mechanism. 12/14 (85.7%) success with same-size cuff + same-pressure PRB replacement.
- Terlecki / Wilson 2022 "Wilson's Workshop 11" paradigm: (1) capsulotomy / capsulectomy at cuff site; (2) measure urethra after capsule release; (3) replace with same-size cuff; (4) complete device replacement (cuff + PRB + pump).
- Capsulotomy also relevant around the PRB (Khouri 2020 PRB herniation 3.2% as correctable cause of malfunction) and the scrotal pump.
- Bentellis 2021 "larger cuff size as only independent revision predictor" framing.

**Expanded outcomes per technique:**

- Cuff downsizing — Krughoff 2023 (97% subjective improvement, −2.2 pads/day, 70.6% in-place at 1.8 yr); Saffarian 2003 original-atrophy data; 3.5 cm cuff impact (22.2% → 4.7% revision rate).
- Cuff repositioning — Couillard / Stone 1995 proximal (5/6 improved at > 1 yr); benefit depends on appropriate re-sizing.
- Tandem cuff — DiMarco / Elliott 4.3 → 1.6 pads/day; O'Connor 2008 single-vs-double no continence difference but 12 vs 7 reoperations; Manka / Wright cadaver model showed tandem cuff did not improve LPP vs single (p = 0.44) — benefit may reflect more-proximal placement rather than dual-cuff mechanism; Yafi AMS PIF database (selection bias); Ahyai 2016 high-vs-low-risk (5.7× higher late explantation in double-cuff).
- Transcorporal cuff — Domínguez Gutiérrez 2025 SR / meta-analysis (revision OR 2.99, infection OR 0.33, erosion OR 0.35); Wiedemann 2013 functional outcomes; Ortiz 2020 erosion heat-map (18.3% TC vs 6.1% standard); Mock 2015 urethral risk factors (≥ 2 risk factors drop 35-mo erosion-free survival from 100% to 64%); Moser 2018 TC after prior erosion (irradiated patients remain high-risk).
- New: Tandem transcorporal cuff (Magera / Elliott pad data).
- New: Distal double cuff vs transcorporal head-to-head (Maurer 2019 prospective; DC→TC sequential salvage strategy).
- PRB modification — Khouri PRB herniation; Loh-Doyle predictors; caution against routine upsizing in atrophic tissue.

Updated Key Principles of Revision and Salvage to surface the capsulotomy + same-size replacement default, the cadaver-model qualifier on tandem cuff benefit, and the DC → TC sequential salvage paradigm. **16 new references (40–55).**

### Site polish

- Replaced the underbuilt Surgical Genealogy page (`docs/07-roots/surgical-lineage.mdx`) with a concise two-sentence "in development" placeholder + call for collaborators routed to `warwikihq@gmail.com`. Tightened the `07-roots/index.mdx` description.
- Standardized the public contact email to `warwikihq@gmail.com` and scrubbed the personal `nseranio@gmail.com` from all tracked files (was lingering in AGENTS.md historical notes).
- Removed per-page last-update author name from rendered docs (`showLastUpdateAuthor: false`); timestamp preserved.
- Auto-fixed citation-anchor gaps / orphans across 75 files via `scripts/fix-citations.js` — concentrated in foundations flaps (igap, epap, posterior-thigh, mcfap, island-groin), 04ab BNC/VUAS (8 procedures), 04b bladder-reconstruction (9), 04c urinary-diversion, 04d upper-tract, 04e genital-reconstruction (22), 04g prolapse (8), 04h fistula-repair (10), and 04l cosmetic (2). Added missing `hide_title: true` to the 04a urethral-reconstruction index.

### Sex/gender language sweep

- Renamed `both-genders` to `all-patients` across the fistula taxonomy: `04h-fistula-repair/both-genders/` → `all-patients/`, `03f-fistulas/in-both-genders/` → `all-patients/`, `both-genders-fistula.mdx` → `all-patients-fistula.mdx`. Updated category labels, the JS export in the landing's `GenericDatabase` array, all inbound `/docs/` links, and added three permanent `vercel.json` redirects covering the old URL families.
- Display prose: "Both-Genders Fistula Repair" → "Fistula Repair (All Patients)"; "Fistulas in Both Genders" → "Fistulas (All Patients)"; "in both sexes" → "across sexes"; "across both sexes" → "across all patients". One "nontranssexual patients" cohort descriptor in radial-forearm.mdx → "patients undergoing phalloplasty for non-gender-affirming indications". One "male-to-female gender-reassignment surgery" in singapore-flap.mdx → "vaginoplasty (gender-affirming surgery)".
- Added a header disclaimer to `docs/08-resources/hidden-curriculum/billing-coding.mdx` acknowledging that several ICD-10 code descriptors (F64.0 Transsexualism, Q56.0–Q56.4 Hermaphroditism / Pseudohermaphroditism, Z87.890 Personal history of sex reassignment) use outdated and sometimes stigmatizing language but are preserved verbatim for billing accuracy.

### New clinical content

- **[Pelvic Venous Disorders](docs/03-clinical-conditions/03h-pelvic-pain/pelvic-venous-disorders.mdx)** — full PeVD / PCS picture (anatomy with embryologic basis, deep uterine vein as surgical landmark, US Uterus Transplant Consortium superior/inferior uterine vein nomenclature, reflux-vs-obstruction pathophysiology including nutcracker and May-Thurner, hormonal contribution, post-coital pain as pathognomonic feature, four pelvic escape points + bottom-up paradigm, SVP classification, imaging hierarchy through IVUS, endovascular management with Hansrani 2023 RCT + Daniels SR, the 2026 Emory POTS / orthostatic-intolerance association at 83% PeVD prevalence with 44% complete resolution after iliac stenting). 36 deduplicated references.
- **[Glove Wetting for Knot Tying](docs/01-foundations/surgical-skills/glove-wetting.mdx)** — new operative-pearl page in `surgical-skills/`. Friction-reduction rationale; wet-conditions-reduce-knot-slippage evidence (Pietschmann, Savage, Coleridge, Muffly); glove perforation literature (Enz 2023 25–37%; Martinez 2013; Battersby 2016); Enz 2026 global gloving consensus. Renamed the `surgical-skills/_category_.json` label from "Named Stitches" to "Surgical Skills" so the directory accommodates non-stitch pearls.
- **[Suture Lubrication](docs/01-foundations/surgical-skills/suture-lubrication.mdx)** — bacitracin / petroleum / saline practice page. Petroleum-based agents reduce knot failure load (Muffly 116.7 vs 123.8 N, p = 0.002); bacitracin adds an anaphylaxis pathway and allergic-contact-dermatitis cost (Smack 1996 JAMA RCT n = 922). Bottom line: saline for lubrication, triclosan-coated sutures for antimicrobial coverage.
- **[Radiation Safety](docs/02-evaluation/imaging/radiation-safety.mdx)** — new occupational-safety page in evaluation/imaging. ICRP/NCRP dose limits, FLASH UK reference levels (PCNL 24.1 Gy·cm² as the high-dose outlier), shielding stack reducing trunk dose 95% / genital 99% / leg 97%, the inverse-square law, pulsed half-dose / collimation / last-image hold for 30% entrance-skin-dose reduction, procedure-specific pearls, pregnancy considerations. Cross-linked bidirectionally with `surgical-principles/radiation-tissue-effects.mdx`.

### Taxonomy decision codified

Where disparate technique pearls live going forward:
- **Named techniques / maneuvers / operative pearls** → `01-foundations/surgical-skills/`.
- **Physical instruments** → `01-foundations/tools/instruments/`.
- **Broader principles / concepts** → `01-foundations/surgical-principles/`.

### Landing-page / sidebar ordering pass

Audited every `index.mdx` against sibling sidebar order. Fixed real mismatches:

- `06-journal-club/index.mdx` — Guidelines & White Papers now precedes Journal Database.
- `05a-trauma-emergencies/index.mdx` — reordered to match explicit `sidebar_position` (gu-injury-overview → trauma-assessment; PFUI → bladder → ureteral → renal → penile → scrotal).
- `surgical-principles/index.mdx` — added the missing Hyperbaric Oxygen Therapy entry.
- `04-surgical-techniques` — realigned all 13 `_category_.json` `position` fields so the sidebar matches the landing's clinical narrative (urethral → BNC → bladder → diversion → upper-tract → genital → incontinence → BPH → prolapse → fistula → GAS → male SD → cosmetic).

### Treatment Atlas `bestFor` tightening

Rewrote ~137 `bestFor` indication strings across 15 atlas files so every row is ≤ 120 chars. Stripped citation residue, n-values, percentages, technique enumerations, and stepwise algorithms while preserving the load-bearing clinical scenario per row.

| metric | before | after |
| --- | --- | --- |
| longest | 594 chars | 120 chars |
| mean | 132 | 84 |
| p90 | 243 | 105 |
| median | 98 | 84 |
| rows > 200 chars | 57 | 0 |
| rows > 120 chars | 113+ | 0 |

---

## 2026-05-11 (priapism atlas) — Full rewrite of priapism shunts & decompression page

Comprehensive page-level rewrite of `docs/04-surgical-techniques/04j-sexual-dysfunction/priapism-shunts-decompression.mdx` across **seven commits** pushed to both `claude/kind-wiles-84dcfe` and `main`. Replaced the GenericDatabase block with a 10-row markdown summary table, removed the now-unused `GenericDatabase` import, and expanded every named technique from a one-row stub into a full surgeon-oriented subsection. Reference list grew from **17 → 47** entries.

### Distal corporoglanular shunts (Winter / Ebbehoj / T-Shunt / Al-Ghorab)

- **Winter** — feature table; Nixon's 92%-of-reoperated-patients-had-Winter signal; **Snake-incompatible** framing because core is too small to accept a Hegar dilator.
- **Ebbehoj** — 1974 origin as a No. 11 blade modification of the Winter; positioning between Winter and Al-Ghorab; urethral-injury caveat if directed too ventrally.
- **T-Shunt (Lue)** — full **Brant–Lue 9-step technique** (lateral glans entry at 2 / 10 o'clock, No. 10 blade, 90° rotation, Foley protection, optional corporal biopsy); outcomes-by-duration table (< 24 h ~ 100%, 24–48 h ~ 60–75%, > 48 h ~ 30% with **100% necrotic smooth muscle on biopsy**); four named efficacy series — Brant/Lue 2009 92%, Zacharakis 2014 100% if < 48 h, Ortaç 2019 84.2% ED, Unal/Burnett 2024 **92.3% Snake vs 53.6% no-Snake** (p < 0.001).
- **Al-Ghorab** — 1973 origin; "largest tunical window, direct vision, lowest reoperation rate"; step-by-step including **Shiraishi–Matsuyama blunt-cavernosotomy salvage** (Pean forceps for 5–7 day priapism refractory to T-shunt/Snake; 2/2 immediate resolution); four-shunt comparison table; five efficacy series.

### Burnett Snake Maneuver

- Full Burnett–Pierorazio 9-step technique anchored on why Winter and Ebbehoj windows are too small to accept a 7–8 mm Hegar dilator while T-shunt and Al-Ghorab are compatible.
- Shunt-compatibility matrix; five-row efficacy table culminating in Unal/Burnett 2024 comparative (**92.3% vs 53.6%** resolution, **recurrence 4.2% vs 26.6%**, EF at follow-up 42.8% vs 50% NS).
- Complication profile from the Segal series (1/10 wound infection, 1/10 urethral injury with subsequent urethrocutaneous fistula); Shiraishi–Matsuyama salvage call-back.
- VanDyke practice-pattern signal — corporoglanular tunneling remains favored first-line (71.2%) and more widely performed (89.9% vs 62.8% PSD).

### Penoscrotal Decompression (PSD)

- Rationale vs immediate MPP — Fuchs documented **37.5% revision rate** for immediate MPP after failed distal shunting with **50% distal extrusion / 25% impending lateral extrusion**; PSD's glans-sparing approach was designed to break this loop.
- Original Fuchs 2018 penoscrotal incision vs **Basile 2025 proximal-shaft modification**.
- Four-row evidence table: **Fuchs 2018** 6/6 resolution with 0% revision vs MPP 37.5%; **Baumgarten 2020** mean 71 h duration, 48% with prior failed shunting, **bilateral PSD 0% recurrence vs unilateral 20%**, 60% spontaneous EF, median IIEF-5 drop 3.5; **Basile 2025** longest follow-up — 96% immediate detumescence, 92% pain relief, 69% overall success (73% bilateral), 86% satisfactory EF (± PP); **VanDyke 2023/2024 surgeon survey** — 47.3% rated PSD "Very/Extremely Effective" vs 18.7% for corporoglanular tunneling (p < 0.001).
- Comparison table across distal shunts / Snake / PSD / immediate MPP; prosthesis-preservation framing.

### Proximal and Venous Shunts

- **Quackels** — 1964 origin; lithotomy + perineal corporospongiosal-anastomosis step-by-step; Quackels-vs-Grayhack head-to-head; five efficacy series (Cosgrove 1974 → EAU 2024 abandonment recommendation); Quackels-specific complications anchored to **Manjunath 2015** (simultaneous urethrocutaneous + urethrocavernous fistula after proximal corporospongiosal shunt requiring suprapubic diversion), **Robbins 1984** (late urethrocavernous fistula 3 mo post-shunt), and **Kulmala 1995** (19.2% permanent open shunt on cavernosography; **100% impotence reversal by shunt closure**).
- **Grayhack** — Grayhack/McCullough/O'Conor/Trippel 1964 cavernovenous concept; full saphenous-graft step-by-step; eight-row efficacy table (Cosgrove → **Resnick 1975 pediatric Grayhack** → **Moloney 1975 with the 3-mo graft-ligation rule** → Richard 1979 87.5%/62.5% → Nixon → Kulmala 19.2% → Zheng → EAU 2024); Grayhack-vs-Quackels head-to-head emphasizing higher persistent-shunt + PE risk vs lower urethral-injury risk; modern cavernovenous variants — Barry 1976, **Chiou 2009** DDV + saphenous-vein graft (100% resolution / 69% EF in n = 16 with 10 prior failed shunts; Doppler-confirmed shunt patency in 100% and restored cavernosal arterial flow in 92%), Kilinc 2009 temporary cavernosal-cephalic angiocath-and-serum-set bedside construct (86.7%).
- **Barry / Caverno-Dorsal Vein** — promoted from one-row mention to full subsection. Penile venous-anatomy primer (superficial DV / deep dorsal vein as principal flaccid-state drainage / cavernosal-crural). Original 1976 Barry technique. Four modifications: **Micoogullari 2021 planned 2-month closure** with 0.01% adrenaline irrigation × 5 protocol (the direct procedural answer to the Kulmala/Moloney permanent-open-shunt physiology); Chiou DDV+SVG hybrid; Kilinc temporary cephalic-vein; Soydaş 2025 algorithm. Four-row efficacy table — Barry 2/2, Chiou 100%/69%, Micoogullari 100%/80%, Kilinc 86.7%/77%. Nuanced positioning that the Barry-shunt-specific data **exceed** pooled proximal-shunt outcomes (EAU 5.7–100% / 11.1–77.2%) while acknowledging absence from AUA/SMSNA 2022 and EAU 2024 recommendations.

### Early Malleable Penile Prosthesis (renamed from "Early Penile Prosthesis Transition")

- Pathophysiological rationale with the 48-h irreversibility threshold and the four simultaneous functions of acute MPP (mechanical detumescence, length preservation, proactive ED treatment, avoidance of the dense-fibrosis surgery problem).
- **MRI-guided patient selection** anchored to **Ralph 2010 BJU Int** (100% sensitivity of T2-weighted gadolinium-enhanced penile MRI for nonviable smooth muscle vs corporal-biopsy reference) and the **ISSM survey gap** (< 40% currently use MRI / biopsy).
- Guideline positioning (EAU 2024 / AUA-SMSNA 2022 > 36 h / Pang 2025 / Calopedos 2025); malleable-vs-IPP head-to-head table; full step-by-step including **Salem 2010 sling-suture distal-erosion prophylaxis** (0% distal erosion in 11/12 patients with prior failed shunting at median 15-mo follow-up).
- **Seven-row evidence table**: **Ralph 2009 UCLH landmark** (n = 50, 100% resolution / 84% intercourse / 96% satisfaction / **0% penile shortening**); **Zacharakis 2014 UCLH early-vs-delayed** (96% vs 60% satisfaction; **80% of delayed implantations required a second corporotomy and downsized cylinders**); **Barham 2023 multicenter IPP** (0% complication rate when placed ≤ 6 mo vs **40.5% when placed > 6 mo**); **Tausch 2015 cost-effectiveness** (mean preop **US $83,818** in repeated interventions; all discharged ≤ 24 h after MPP); Salem 2010; **Dighero 2025 long-term QoLSPP** (n = 39 at median 9-yr follow-up; **100% would not regret the prosthesis**); **Butaney 2019 ISSM survey** (70.9% more comfortable with MPP than shunt, yet ~ 80% still favor shunts first-line — the practice gap Calopedos 2025 explicitly challenges).
- Elective **MPP → IPP exchange** at 6–12 mo; Clavijo 2017 IPP-into-fibrotic-corpora tips; special-population notes (SCD, prior failed shunting); algorithmic biases table; head-to-head prosthesis-vs-shunt table.

### References added (refs 18–47)

Mireku-Boateng 2001, Yassin 2023, Ortaç 2019, Shiraishi-Matsuyama 2013, Schifano 2025, Quackels 1964, Cosgrove-LaRocque 1974, Tabibi 2010, Zheng 2013, Manjunath 2015, Robbins 1984, Kulmala 1995, Grayhack 1964, Resnick-Grayhack 1975, Moloney 1975, Richard 1979, Barry 1976, Chiou 2009, Kilinc 2009, Calopedos 2025, Ralph 2009 EUR Urol, Zacharakis 2014, Ralph 2010 MRI, Butaney 2019 ISSM, Tausch 2015, Salem 2010, Barham 2023, Dighero 2025, Clavijo 2017, Cocci 2025 PPI complications SR, von Stempel 2024 imaging review.

Verification: `npm run lint:links` clean across 1,034 files; `npm run lint:citations` clean for this page; `npm run build` succeeds. Seven content commits + one docs commit pushed to both `claude/kind-wiles-84dcfe` and `main` as fast-forward.

### Follow-up navigation fix (commit `c70f97c`)

Converted bare procedure names to anchor links after a "techniques are not clickable" report. All 10 rows of the Procedure Summary Table at the bottom of the priapism atlas page now link to the corresponding on-page subsection anchors (Winter, Ebbehoj, T-Shunt, Al-Ghorab, Snake, PSD, Quackels, Grayhack, Barry, Early MPP). The shunt tables on the emergency-condition priapism page in `docs/05-special-populations/05a-trauma-emergencies/priapism.mdx` now cross-link each Winter / Ebbehoj / T-shunt / Al-Ghorab / Quackels / Grayhack / Snake / PSD row to the matching atlas-page anchor; a missing Barry-shunt bullet was added to the proximal-shunt list. Lint + build clean; pushed to `main`.

---

## 2026-05-11 (LS surgical ladder) — Regenerative VLS / GSM expansion + four new LS / FGM/C atlas pages + DB audit

LS-surgical-ladder build-out spanning the full conservative → maximal spectrum, thorough regenerative VLS + GSM expansion of the existing microfat / nanofat grafting page, new FGM/C clinical-condition page under 03g, and a vulvar-DB audit + cleanup pass. **10 commits**. Build clean across **1,010 files**.

### Microfat / nanofat grafting page (04l) — three substantial expansions

- **VLS section** — three-pillar ADSC mechanism table (anti-fibrotic / immunomodulatory / pro-angiogenic) anchored to Lichen-SVF histologic p-values; full evidence table across 5 series (~166 patients): **Boero 2015 n = 36** (94% improved trophism, 95% stopped routine TCS), **Tedesco 2020** RCT n = 40 (combination superior in early-stage; discouraged in late-stage), **Gutierrez-Ontalvilla 2022 RCT** n = 20 (the only RCT vs TCS; significant ↓ inflammatory cells but no elasticity improvement), **Casabona 2023 n = 72** (largest cohort; Skindex-29 −31.8, FSFI +7.6, DLQI −9, all p &lt; 0.001), **Lichen-SVF 2025 n = 18** (histologic reversal — ↓ hyalinization p = 0.0036, ↓ CD3+ T-cells p = 0.0068, ↑ microvascular density p = 0.0121). Comparison table vs PRP monotherapy / Nd:YAG-Er:YAG laser / perineoplasty / aOAP flap. Positioning subsection noting ACOG 2020 / German S3 2026 keep TCS first-line and frame fat grafting as complementary, not curative; Lichen-SVF protocol maintained low-dose TCS throughout follow-up.
- **PRP + fat-grafting synergy subsection** — three of five VLS series (132 of 166 patients) used PRP + fat / SVF combinations. **&gt; 4× VEGF amplification** when MSCs co-cultured with PRP (Myung 2020); ADSC pluripotency upregulation (NANOG, SOX2) by platelet-rich-fibrin extract (Wachtel 2025); platelet → ADSC **mitochondrial transfer** restoring mitochondrial function and reducing ROS in chronically inflamed VLS bed (Ke 2025); **i-PRF direct fibroreduction** via TGF-β / SMAD3 inhibition (Sun 2025). Tedesco early-stage therapeutic-window caveat.
- **GSM section** — positioning comparison table vs vaginal estrogen / DHEA / ospemifene / CO₂-Er:YAG laser anchored to the **2025 AUA / SUFU / AUGS guideline** (low-dose vaginal estrogen first-choice pharmacotherapy). The postmenopausal **estrogen paradox**: low E2 paradoxically improves volumetric graft retention (**79% vs 35%** in OVX-mouse model; clinical mirror in elderly cohorts with AQP-7-mediated adipocyte hypertrophy) but postmenopausal ASCs are transcriptomically distinct (~2,299 DEGs; M1 polarization), giving a plausible mechanism for the **9–12 mo gradual peak** observed by Casarotti. **GSM in breast cancer survivors** — highest-unmet-need population (up to 60% incidence, AI-driven); no fat-grafting-specific study yet, ER-upregulation theoretical caveat for HR+ disease, Chen 2025 PRP-BCS pilot (n = 20, 65% on AIs) as proof of concept. **FDA regulatory positioning** of microfat / MFAT (minimally manipulated, practice of medicine), enzymatic SVF (351 HCT/P), and mechanical SVF / nanofat (gray area, product- and indication-specific). References extended through ref 48 across all three expansions.

### New FGM/C clinical condition page (03g)

[Female Genital Mutilation / Cutting (FGM/C)](docs/03-clinical-conditions/03g-genital-scrotal/female-genital-mutilation-cutting.mdx) at sidebar_position 1.7, framed for reconstructive surgeons and urogynecologists. WHO Type I–IV classification table with the anatomic note that the clitoral body (8–10 cm) and crura are preserved beneath the visible scar (operative substrate for the Foldès reconstruction). Epidemiology — pooled global prevalence 36.9%, Somalia 99.2% in women, Mali 72.7% in girls, sub-Saharan pooled 53.5%, &gt; 500k US women / girls at risk. Risk-factor AORs (family history 13.71, lower maternal education 3.28, rural residency 2.27, poverty 1.38). Complications table organized by reconstructive-urology / urogyn relevance — urinary (urethral stricture, meatal obstruction, recurrent UTI / pyelonephritis); vulvovaginal (introital stenosis, hematocolpos, epidermoid inclusion cysts, post-FGM neuromas); sexual (dyspareunia OR 2.47); obstetric (prolonged labor OR 2.04, perineal tears OR 2.63, episiotomy OR 1.89, PPH, fetal distress); mental health (PTSD ~ 55%). AAP 2020 framework — never perform any form; counsel families pre-travel; recommend defibulation for all Type III regardless of symptoms; document with ICD-10 N90.810–N90.818. Defibulation timing (2nd-trimester ideal, up to ~ 34 wk acceptable) and anesthesia (avoid local; flashback risk). US legal framework with the **2020 STOP FGM Act re-criminalization** correcting the post-*US v Nagarwala* (2018) status; 35 states with specific statutes; Transport for FGM Act 2013 against "vacation cutting". 2025 WHO integrated-systems framing. Cross-linked to the four existing FGM/C atlas pages.

### LS surgical ladder — four new / expanded atlas pages

- **[Perineoplasty + De-Adhesion](docs/04-surgical-techniques/04e-genital-reconstruction/perineoplasty-de-adhesion.mdx)** (new) — seven depth-organized component subsections from simplest to most complex: Fenton's median perineotomy (Heineke–Mikulicz analogue, mild-to-moderate posterior band); CO₂ laser adhesiolysis with **Breech 2000 Surgicel re-adhesion prophylaxis** in adolescents; **posterior vestibuloplasty with vaginal mucosal advancement** as the workhorse (Rouzier 2002 90% dyspareunia improvement; Lauber 2021 90% satisfaction; mandatory histopathology to exclude VIN / SCC; ~ 25-min OR time per Frigerio); clitoral de-hooding with dorsal-nerve-of-the-clitoris caution; **investigational anterior vestibuloplasty with free full-thickness vaginal mucosal graft** (Burger 2016; 1 / 5 required reoperation for graft contraction / keratinization); local skin-flap advancement (cross-link to the dedicated page); aOAP cross-link. New **"Choosing the appropriate technique"** decision table mapping 8 clinical scenarios (mild posterior band → Fenton's; isolated adhesions → CO₂ + Surgicel; moderate-severe posterior → vestibuloplasty; clitoral phimosis → de-hooding; anterior → mucosal-graft vestibuloplasty; multi-site → combined session; extensive / salvage → local flaps; severe refractory → aOAP). Outcomes table for ~191 patients across 5 series. Perioperative principles — preop topical control, mandatory histology, indefinite postoperative clobetasol, dilator considerations, SCC surveillance.
- **[aOAP Flap](docs/04-surgical-techniques/04e-genital-reconstruction/aoap-flap.mdx)** (expanded LSA section) — replaced the brief LSA stub with patient-selection criteria (failure of maximal medical therapy + simpler surgery, histologic LS confirmation, VIN / SCC exclusion). Three-component **operative steps** explicitly distinguishing skinning vulvectomy (epidermis + superficial dermis only; preserves subcutaneous fat / muscles / nerves / vasculature) from simple or radical vulvectomy. Outcomes table for O'Dey n = 61 (87% bilateral aOAP, 1-yr follow-up, dyspareunia and apareunia both p &lt; 0.001). LS-specific complication framing — TCS-induced epidermal atrophy and impaired healing; 180-patient combined LS + FGM/C denominator with **1 total flap loss** and 21–33% minor wound complication ceiling; 8.4% revision rate. Durability caveat — 50% historical LS-vulvectomy recurrence and Rangatchew 38% severe relapse at 8.4 yr vs the 1-yr O'Dey window. New perioperative-management section and **"Skinning vulvectomy — historical context"** subsection covering the VIN origin, the STSG era (Lavoué QOL data), and the O'Dey innovation of replacing the graft with a vascularized fasciocutaneous flap. References extended through ref 13.
- **[Local Skin Flaps for LS Sequelae (Long-Term Outcomes)](docs/04-surgical-techniques/04e-genital-reconstruction/local-flaps-ls-sequelae.mdx)** (new) — anchored on the unique long-term data the perineoplasty / aOAP pages cannot host. **Rangatchew 2017 mean 8.4 yr follow-up** — the only decade-scale LS surgical series; 38 consecutive histologically verified LS patients; central stratification at 8 yr: **12% no relapse / 50% minor LS relapse (coitus preserved) / 38% severe LS relapse (apareunia recurs)**; 75% reported surgical benefit / 74% satisfied / 58% improved sexual life. **Brauer 2016 qualitative-couple study** — the only qualitative LS-surgery study; 68% decreased sexual pain (4 pain-free, 9 "pain → discomfort"); **4 of 5 non-improvers had partner-communication failure**, supporting preoperative sexological couple-based consultation. LS-specific psychosexual-burden context (Jabłonowska, Sadownik). Flap-menu breakdown: **sliding designs** (Y-V advancement, V-Y workhorse, pubolabial V-Y amplified) for the contracture-dominant LS deformity; **pivoting designs** (rhomboid / Limberg, lotus-petal / pudendal-thigh, gluteal-fold) for tissue deficit. Complication-profile table — Reid 1997 207-flap historical (89.9% primary healing), Burke 1994 (87%), Kwong 2025 (92.6%), Commenge 2025 (78.3% at 4 wk). Comparison across the full LS surgical ladder showing the time-dependent erosion of benefit Rangatchew uniquely captures. **Six counseling points** including indefinite topical clobetasol maintenance (0% vs 4.7% SCC in adherent vs non-adherent 507-patient cohort).
- **[Defibulation (Type III FGM/C)](docs/04-surgical-techniques/04e-genital-reconstruction/defibulation.mdx)** (new) — most common FGM/C operation worldwide; AAP 2020 universal recommendation for all Type III regardless of symptoms. Historical context — traditional non-surgical opening by husband (North Sudan, Somalia, southern Egypt) or birth attendant at marriage (Djibouti) replaced by medicalized defibulation. Expanded indications (menstrual obstruction with rare hematocolpos / hematometra, painful neuromas from entrapped nerves or retained foreign bodies, gynecologic-exam access, pre-conception preparation, recurrent UTI, pregnancy). **Tiered timing table** including first-stage-of-labor and at-crowning rows for late presenters (unstudied caveat) plus the survivor-vs-clinician timing-preference asymmetry from the Jones FGM Sister qualitative study (survivors lean pre-pregnancy; clinicians lean antenatal). **Anesthesia by patient population** — young children GA in all cases; non-pregnant adolescents / adults regional or GA; pregnant spinal preferred; AAP-vs-WHO local-anesthesia divergence with the AAP flashback-risk rationale. Outcomes — Okusanya 2026 meta n = 3,166: emergency CD **OR 0.16 (95% CI 0.06–0.42)**, genital-tract lacerations **OR 0.48 (95% CI 0.29–0.79)**, antepartum may shorten labor vs intrapartum. Berg 2017 SR (71 studies, **50–100% satisfaction**, sexual-function most consistent) and the Somali-cohort 94% recommend / 100% pleased. **Re-infibulation prohibition** subsection — classified as FGM/C, illegal in many countries, AAP-prohibited regardless of patient or family request. Counseling / psychosocial section covering virginity concerns, **Johansen 2017 qualitative work on male-perceived virility / pleasure** as a specific deterrent to medicalized defibulation, mental-health-provision deficit, adolescent-autonomy / best-interest considerations.

### Vulvar DB audit + cleanup

Slug-and-content audit of the [Vulvar Reconstruction database](docs/04-surgical-techniques/04e-genital-reconstruction/vulvar.mdx) surfaced four issues, all corrected:

- **Merged** the two LS fat-grafting rows ("Autologous Fat Grafting for VLS" + "Combined PRP + Fat Grafting for VLS") into one concise row **"Fat Grafting (± PRP / SVF) for Vulvar LS"** — both indications now sit on the canonical microfat / nanofat grafting page with a unified VLS section and PRP-synergy subsection.
- **Added** a Defibulation row under FGM/C Reconstruction pointing to the new defibulation atlas page.
- **Repointed** all three regenerative fat-grafting slugs from the catch-all `genital-reconstruction-principles` / PRP-pharmacology slugs to the canonical `microfat-nanofat-grafting` page.
- **Tightened** the VLS and GSM `bestFor` strings to concrete evidence — VLS: "~166 patients across 5 series; histologic ↓ hyalinization, ↓ CD3+ T-cells, ↑ microvascular density; complementary to topical maintenance, not curative"; GSM: "Menkes n=50 VHI/FSD significant at 18 mo; Casarotti MFAT n=35 99% resolution sustained 36 mo; ER upregulation + neoangiogenesis + lactobacilli restoration; not yet in AUA/SUFU/AUGS 2025."
- Three LS-surgical DB rows (Perineoplasty / De-Adhesion, Skinning Vulvectomy + aOAP, Local Skin Flaps for LS Sequelae) repointed from the principles page to their new dedicated pages.

All 38 vulvar-DB anchors verified against the live rendered HTML (the IGAP / gluteal-fold Part 2 / Part 3 anchors with double-hyphens were the suspected breakage; both match the Docusaurus-rendered IDs exactly — the em-dash is stripped but the adjacent spaces preserve as a double-hyphen).

### Verification

`npm run lint:links` (1,010 files clean), `npm run lint:citations`, `npm run typecheck`, `npm run build` all pass. **10 commits** pushed to `main` as fast-forward (b8f0e7d → 05eaf0b).

---

## 2026-05-11 (later) — Lymphedema named-technique atlas + vulvar-reconstruction consolidation + new foundations flap pages

Six new genital-lymphedema named-technique atlas pages, a complete vulvar-reconstruction atlas + DB overhaul under a newly established hybrid consolidation policy (10 redundant atlas pages collapsed back to foundations after initial expansion), four new foundations flap pages (**IPAP / TFL / DIEP / TRAM**), four new FGM/C-specific atlas pages, and resolution of audit-identified misroutings (labial-flap / mons-pubis / PAP-DFAP / IGAP). **31 commits**. Build clean across **1,006 files**.

### New genital-lymphedema atlas pages (all retained — substantial named-technique content with no foundations equivalent)

- **[3R / SCIP-LFT (Yamamoto)](docs/04-surgical-techniques/04e-genital-reconstruction/3r-scip-lft.mdx)** — Radical Reduction and Reconstruction technique. SCIA branch anatomy (Yoshimatsu cadaveric, Gandolfi, Jeong axiality, Fernandez-Garrido extended SCIP, Yoshimatsu transverse-branch landmark), lymphatic-system inclusion (LYST concept), Yoshimatsu proximal-to-distal harvest, the four operative steps (radical resection + SCIP-LFT + chimeric pure-skin perforator for penis + primary donor closure), Yamamoto n = 7 / 22.7 mo with 0% complications and 0% recurrence and no compression required (GLS 6.7 → 0.3), Abdelfattah n = 26 / 44.9 mo with GLS 6.2 → 0.05 and GBI +41, LYST long-term Yoshimatsu data, prophylactic L-SCIP after groin dissection (Caretto), and head-to-head with excision-only / Modified Charles / excision+flap / free VLNT.
- **[CHASCIP (Ciudad)](docs/04-surgical-techniques/04e-genital-reconstruction/chascip.mdx)** — Combined Charles' Procedure + Bilateral Lymphatic SCIP Flap. Hybrid Charles excision + bilateral SCIP-LFT for scrotum + hypogastric FTSG for penis. Ciudad 2025 n = 8 / 34 mo with 0% recurrence and 87.5% → 0% sexual dysfunction (p &lt; 0.001), 160-min OR time, 200.6 mL EBL despite ~1.8 kg excision. ISL Stage III penoscrotal positioning vs Yamamoto 3R and Abdelfattah.
- **[Complete Functional Lymphatic-System Pedicled Transfer (Abdelfattah)](docs/04-surgical-techniques/04e-genital-reconstruction/complete-functional-lymphatic-pedicled-transfer.mdx)** — Largest SCIP-LFT genital series. Single SCIP-lymphatic flap covers both scrotum and penis. Maruccia podoplanin-positive vessel-density rise (7.92 → 11.79 vessels/mm²), Aschen LN transplant mechanism, Yoshimatsu LYST principle. Abdelfattah 2023 n = 26 / 44.9 mo with 100% flap survival, GLS 6.2 → 0.05, GBI +41. Combined SILN + distal LVA approach for concurrent scrotal + LE lymphedema (Abdelfattah 2020 Microsurgery).
- **[LYST (Yoshimatsu / Yamamoto)](docs/04-surgical-techniques/04e-genital-reconstruction/lyst.mdx)** — Lymphatic System Transfer framework (cross-region concept). Conceptual evolution beyond VLNT — deliberately includes afferent lymphatic vessels with their draining nodes. Scaglioni / Suami inguinal-LN subgroup anatomy, safe-harvest zone (lateral to femoral artery; superolateral abdominal-draining nodes). Free SCIP-LYST (Yoshimatsu 2025), pedicled SCIP-LYST + distal LVA for LE-LE with CVI (Xu 2026), Zone-4 lymphatic SCIP + DIEP for simultaneous breast reconstruction + BCRL (Yoshimatsu 2022), perforator-to-perforator SCIP-LYST (Meroni / Scaglioni 2024), Lymphatic Flow-Through (LyFT) SCIP + LVA (Scaglioni 2023). Reverse lymphatic mapping with ICG / SPECT/CT (Pons / Dayan / Broyles).
- **[SAPL / Liposuction (Brorson)](docs/04-surgical-techniques/04e-genital-reconstruction/sapl-liposuction.mdx)** — Suction-Assisted Protein Lipectomy. Two-component (fluid vs solid) lymphedema model — the fibroadipose component is not reachable by CDT / LVA / VLNT. LAT pathobiology (Karaman multi-omics, Koc). Brorson dry-PAL protocol with circumferential 3–4 mm stab incisions, distal-to-proximal radial cannula passes, immediate compression before tourniquet release, lifelong compression with &gt; 40 mmHg (lower leg) / &gt; 20 mmHg (thigh) threshold pressures. Standalone outcomes across 8 series (85–117% excess-volume reduction). Chen 2025 meta-analysis (n = 2,334; 99.7% standalone vs 87.3% combined with LVA / VLNT). Brazio-Nguyen and Chen ISTL "3L" algorithms. AAPS Grade 1C. Limited role in genital lymphedema (anatomic / compression / fibrosis constraints push toward excisional + SCIP-LFT approaches).
- **[BLOOM (Sim)](docs/04-surgical-techniques/04e-genital-reconstruction/bloom-bariatric-vlnt.mdx)** — Bariatric Lymphedema One-Stage Operative Management. Single-stage laparoscopic sleeve gastrectomy + gastroepiploic VLNT repurposed from the resected greater-curvature specimen. Bidirectional obesity-lymphedema vicious cycle. Sim 2025 first case (BMI 35 + secondary LE LE). Gastroepiploic anatomy and station-4d LN distribution (Yoo). Single-case evidence; limitations include warm-ischemia time, pedicle-length feasibility from the resected specimen, LN viability vs intact harvest, and BMI ≥ 35 effects on VLNT efficacy.

### New vulvar atlas pages (retained)

- **[Vulvar Primary Closure](docs/04-surgical-techniques/04e-genital-reconstruction/vulvar-primary-closure.mdx)** — indications by anatomy (anterior more mobile; posterior under-tension dehiscence risk), 2-0 chromic / Vicryl with layered SFS repair, Muallem n = 177 PC vs RS equivalent wound healing, Dutch multicenter n = 394 with 46.7% wound complications, ACOG obstetric vulvar-laceration practice, Larsen vulvar-abscess primary-closure variant.
- **[Vulvar Skin Graft (STSG / FTSG)](docs/04-surgical-techniques/04e-genital-reconstruction/vulvar-skin-graft.mdx)** — consolidated row covering both STSG (scalp donor) and FTSG (groin donor). VIN / Paget skinning-vulvectomy indication, Lavoué QOL + occult-cancer-detection (31%), NPWT perineal adjunct evidence (Lee perineal-specific, Cao RCT, Lee meta-analysis: +8.3% take, OR 1.86 success, OR 0.31 reoperation), Toulouse positioning vs flaps.
- **[Genito-Crural Island Perforator Flap (GCIPF)](docs/04-surgical-techniques/04e-genital-reconstruction/vulvar-gcipf.mdx)** — Toulouse-named technique unifying several historically related labiocrural-fold flaps. O'Dey 2010 cadaveric vascular foundation (aOAP present in 100% of specimens; 80% MC vs 20% SC; 1.3 cm-lateral-to-IPR landmark; ~7 × 15 cm sulcus genitofemoralis territory). Commenge 2025 series — n = 46 flaps, 0% total flap necrosis, 78.3% healing within 4 wk, median 4-d LOS, no adjuvant-RT delay. First-line in the Toulouse 2025 algorithm. Head-to-head with IPAP / DFAP / EPAP; Han 2023 vulvo-thigh-crease decision rule (IPAP 12.9% vs PAP-TUG 37.5% wound complications, p = 0.04).
- **[Foldès Clitoral Reconstruction](docs/04-surgical-techniques/04e-genital-reconstruction/foldes-clitoral-reconstruction.mdx)** — 95% of published FGM/C cases. Anatomic premise (deeper clitoral body and dorsal NVB remain intact beneath the scar). Six-step technique (scar excision → suspensory-ligament transection → NVB preservation → ≥ 5 mm neoglans → anti-retraction fixation → closure). O'Dey OD-preputial-flap / NMCS / aOAP complements. Foldès 2012 n = 2,938 with 51% orgasm at 1 y. Meremikwu 2026 SR / meta-analysis (OR 79.67 for pain / dyspareunia reduction). Almadori 2024 scoping (n = 7,274 with 94% improvement, 3% complication rate). AAP adolescent caveat. Wilson / Mañero / Manin adjuncts.
- **[Mañero Vaginal Mucosal Graft](docs/04-surgical-techniques/04e-genital-reconstruction/manero-vaginal-graft.mdx)** — Only published non-Foldès FGM/C clitorolabial-reconstruction technique. Free vaginal-mucosal graft for neoclitoral coverage + labial reconstruction. Mañero & Labanca 2018 n = 32 with FSFI 16 → 29 (p &lt; 0.001). Only non-Foldès technique in the Meremikwu 2026 SR.
- **[aOAP Flap](docs/04-surgical-techniques/04e-genital-reconstruction/aoap-flap.mdx)** — O'Dey anterior-obturator-artery-perforator flap. FGM/C vulvovestibular reconstruction (36% of O'Dey 2024 n = 119); refractory LSA last-resort with 87% of n = 61 receiving bilateral aOAP after skinning vulvectomy. O'Dey 2010 cadaveric foundation; three-technique FGM/C system (OD 85% + NMCS 82% + aOAP 36%). Single-surgeon evidence. Cross-linked to GCIPF (same vascular territory, oncologic application).
- **[Fat Grafting for FGM/C Vulvar Scars](docs/04-surgical-techniques/04e-genital-reconstruction/fgm-fat-grafting.mdx)** — Almadori 2025 first and only clinical application. Dual mechanism (mechanical rigottomy + biological ADSC-mediated ECM remodeling). Kang 2025 decorin-mediated TGF-β1 trapping. M2-macrophage / pro-regenerative immune shift, neoangiogenesis, PGP-9.5 neuropathic-pain reduction. n = 13 with VASS p &lt; 0.001, FGSIS p = 0.001, FSFI p = 0.019, HADS p = 0.002. VASS scale (Almadori 2020 — 6 aesthetic units, ICC 0.928–0.944). Supporting evidence (Krastev 45-study meta, Spiekman histology, Huang neuropathic pain). Minimally invasive, cost-effective, scalable to low-resource settings; potentially combinable with Foldès.

### Vulvar DB expansion + consolidation

- **Round 1 expansion** — added 9 missing flap rows: IGAP / MCFAP / EPAP / PAP-DFAP / vPMT propeller / TUG / TRAM / gluteal-fold / sigmoid; split the previously-combined Lotus Petal / Pudendal-Thigh / Singapore row into two distinct rows.
- **Round 1 indication-string tightening** — all 30 `bestFor` strings rewritten to one-line indications stripping series names / n-values / p-values / percentage outcomes; full operative detail remains on the linked foundations flap pages.
- **Round 2 consolidation** — after initially creating 9 dedicated vulvar atlas pages for the perforator family + V-Y + Limberg flaps, audit revealed that foundations pages (lotus-petal, singapore-pudendal-thigh, igap-gluteal-fold, epap, mcfap, v-y-advancement, rhomboid-limberg) already comprehensively cover the vulvar applications with named modifications and Höckel / Toulouse / Negosanti / Salgarello algorithm positioning. Collapsed 9 redundant atlas pages back to anchored foundations sections. Deleted the Sigmoid Colon Flap row.

### New foundations flap pages

- **[IPAP](docs/01-foundations/surgical-principles/flaps/ipap.mdx)** — promoted from a vulvar-specific atlas page to a foundations entity (IPAP applies across vulvar / vaginal / perineal-APR-ELAPE / anal / buttock-PIPAP / Fournier / penoscrotal / chronic-wound domains). Historical lineage (Yii 1996 → Hashimoto 2001 cadaveric → Jin 2009 microdissection → Hashimoto 2014 formal IPAP → Giroux 2021 no-imaging), perforator anatomy (3–5 perforators in the anogenital triangle, 27.3 mm from ischial tuberosity), Tham three-territory framework, sensate innervation, broad indication menu, propeller / V-Y / transposition design options with routine flap thinning, seven named variants (IPAT / PTO / bilobed / gull-wing / PIPAP / IPAP-propeller / Loreti rotation-island-propeller), outcomes across 12 series (0% total flap failures everywhere; 5.6% partial necrosis), Coltro 2015 sensibility-preservation study (all four modalities at 12 mo), head-to-head vs PAP/TUG (Han 2023: 12.9 vs 37.5 percent wound complications, p = 0.04), Coltro 2017 APR risk-factor analysis, Han 2023 vulvo-thigh-crease decision algorithm.
- **[TFL](docs/01-foundations/surgical-principles/flaps/tfl.mdx)** — Hill / Nahai 1978 origin → Hubmer 2009 perforator anatomy (mean 2.5 perforators per TFL; septocutaneous more constant and larger than musculocutaneous; 8–12 cm-from-ASIS hot spot) → Powers 2018 CTA → Gandolfi 2024 SCIA / IGA accessory-vascularization data → Bulstrode 2006 free-TFL n = 85 / 93% success. Gosain three-zone extended-flap model (distal skin paddle unreliable 8–10 cm above the knee). Nine named variants (standard MC / extended / V-Y / island V-Y FC / subcutaneous-pedicle / transverse / free perforator / pedicled perforator / free MFC). Clinical applications across trochanteric pressure sores / groin-post-LND / vulvar-perineal / head-and-neck / abdominal-wall / lower-limb domains. Höckel **first-choice for inguinal-region vulvar defects**. Nirmal 2011 prophylactic TFL reduces post-LND major flap necrosis from 75% → 17% after ilioinguinal dissection (p = 0.001).
- **[DIEP](docs/01-foundations/surgical-principles/flaps/diep.mdx)** — Conceptual evolution from TRAM / VRAM. Rozen 2010 in-vivo branching pattern classification (Type II bifurcating most favorable; Type III trifurcating most muscle dissection). Perforator anatomy (Ireton SR, El-Mrakby microdissection, Meyerov CTA, Bailey single-dominant-medial-row). Schaverien medial vs lateral row perforasome perfusion. SIEV-inferior thinning plane. Six named variants. The Ferron Toulouse pedicled-vertical-DIEP technique for circumferential neovagina after pelvic exenteration. Eight clinical outcomes series (including Qiu DIEP-vs-TRAM head-to-head and Pividori n = 34 multicenter with 3% major donor morbidity and 0% hernia). Four operative-efficiency benchmarks (Haddock-Teotia 54.8-min faculty, Feingold antegrade, Kim 2023 short-fasciotomy n = 304, Hivelin / Wittesaele minimally invasive). Negosanti **two-flap algorithm** — Type II vulvar + vaginal resection = pedicled DIEP first-line.
- **[TRAM](docs/01-foundations/surgical-principles/flaps/tram.mdx)** — Hartrampf 1982 birth, Moon-Taylor 1988 DSEA-DIEA anastomotic patterns (Type I 29% / II 57% / III 14%), Hartrampf-Hallock zone classification with the Holm 2006 zone-II-III swap (zone IV perfusion completely absent in 33%), MS-0/1/2/DIEP-MS-3 classification spectrum, pedicled-superior vs pedicled-inferior vs free configuration comparison, six vulvar / perineal / vaginal clinical series (Patsner-Hetzler n = 5 first inferiorly-based neovulvar TRAM, Pursell n = 22, Skene, Carlson, Bell, Soper VRAM-vs-TRAM), three vascular-enhancement procedures (Restifo-Erdmann delay → DSEA diameter 1.3 → 1.8 mm and flow 7.25 → 18.2 mL/min; Kajikawa supercharging; Semple turbocharging), Jeong meta-analysis (n = 3,968), Espinosa hernia / bulge meta, Knox 12-y DIEP-vs-pTRAM (21.2% vs 3.1% hernia; 5× adjusted odds), Man-Selber-Serletti free-TRAM-vs-DIEP meta, Wan mesh-effect (mesh reduces TRAM abdominal morbidity to DIEP-equivalent), Qiu n = 28 vaginal-reconstruction head-to-head (TRAM 62% vs DIEP 100% survival).

### VRAM page change

- Added a brief Transverse Rectus Abdominis Myocutaneous (TRAM) Variant cross-link subsection after the Free VRAM subsection.

### Misrouting audit fixes

| DB row | From | To |
|---|---|---|
| Labial flap (anterior / posterior-based) | `martius` (wrong scope — Martius is fibroadipose interposition) | `labia-majora-fasciocutaneous` (correct — axial-pattern fasciocutaneous) |
| Mons-pubis flap | `v-y-advancement` (wrong — mons pubis is SEPA axial-pattern) | `epap#the-external-pudendal-flap-family` (correct — Mayer SEPA pedicle flap is the EPA family's pre-perforator-era predecessor) |
| PAP / DFAP | `posterior-thigh` (Friedman-Reece is distinct from PAP) | `medial-thigh#profunda-artery-perforator-pap-flap` (medial-thigh has a dedicated PAP section) |
| IGAP | `igap-gluteal-fold` (whole page) | `igap-gluteal-fold#part-2--inferior-gluteal-artery-perforator-igap-flap` (anchor to the IGAP-specific Part 2) |
| TFL | `anterolateral-thigh` (wrong — TFL is a distinct LCFA-ascending-branch flap) | new `foundations/flaps/tfl` |
| DIEP × 2 (pedicled + free) | `vram` (no DIEP section) | new `foundations/flaps/diep` |
| TRAM | `vram` (no TRAM section initially) | new `foundations/flaps/tram` |

### Hybrid consolidation policy established

**Foundations flap pages are the canonical home** for vascular anatomy, surgical technique, donor-site morbidity, complication profiles, and cross-flap comparisons. **Per-region atlas pages are retained only when they carry substantial region-specific algorithm content, named-technique focus, or comparative-series data that does not fit cleanly into a foundations subsection.**

Retained vulvar atlas pages meeting the criterion:
- Toulouse-named GCIPF (Commenge 2025 single-center series, no foundations equivalent)
- FGM/C-specific Foldès / Mañero / aOAP / fat grafting (region-specific clinical applications)
- Vulvar Primary Closure (region-specific clinical practice with no foundations counterpart)
- Vulvar Skin Graft (consolidated STSG + FTSG with VIN / Paget skinning-vulvectomy + NPWT perineal evidence)

Retained scrotal-side lymphedema atlas pages (all named operations with substantial dedicated literature):
- 3R / SCIP-LFT, CHASCIP, Abdelfattah Complete Functional Lymphatic Pedicled Transfer, LYST, SAPL, BLOOM

Folded back to foundations (the perforator-flap family + V-Y / Limberg / sigmoid):
- IPAP, EPAP, MCFAP, Lotus Petal, Singapore / pudendal-thigh, Gluteal-Fold / sulcus, medial-thigh V-Y, gluteal V-Y, pubolabial V-Y, Limberg / rhomboid, sigmoid bowel flap

Verification: `npm run lint:links`, `npm run lint:citations`, `npm run typecheck`, `npm run build` all pass across 1,006 files.

---

## 2026-05-11 — 04e scrotal-reconstruction + genital-lymphedema overhaul

Comprehensive build-out of the scrotal-reconstruction atlas, full restructuring of the scrotal-reconstruction DB, broadening of the lymphedema clinical-conditions section from scrotal to genital scope, expansion of five foundations flap pages, addition of a male-cosmetic Scrotox row, and a new GUVCA atlas page mirrored across the scrotal and penile DBs. **28 commits**. Build clean across **988 files**.

### New 04e atlas pages

- **[Scrotal Primary Closure](docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-primary-closure.mdx)** — anatomy, indications, layered closure, ten mobilization maneuvers (septum / dartos / gubernaculum / cord + orchidopexy / component separation / delayed primary closure / rapid intraop expansion / two-stage V-Y / superthin groin / thigh-pouch bridge), defect-size selection, outcomes vs STSG and flaps (cosmesis, spermatogenesis per Demir animal model, sexual function per Czymek, convalescence).
- **[Scrotal Skin Grafting (STSG / FTSG)](docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-stsg.mdx)** — STSG vs FTSG selection, donor sites, recipient-bed hierarchy (tunica vaginalis vs dartos vs tunica albuginea), stepwise technique with orchidopexy, Konofaos two-stage wrap-around, NPWT bed-prep and −80 mmHg fixation (Cao RCT, Lee meta-analysis).
- **[Testicular Thigh Pouch](docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-thigh-pouch.mdx)** — Okwudili temporary bridge with manual return, Staniorski definitive + fasciocutaneous flap, Mandel Hiawatha pseudocapsule neoscrotum, Berli salvage flap, technical pearls, spermatogenesis / thermoregulation physiology.
- **[Testicular Prosthesis](docs/04-surgical-techniques/04e-genital-reconstruction/testicular-prosthesis.mdx)** — 1941 Vitallium → 2002 Torosa → Rigicon Testi10™ (99.8% KM at 54 mo) history, saline vs silicone-gel head-to-head, indications including GAS neoscrotal augmentation, the 91% offer-rate counseling gap, Musi 2020 simultaneous-at-orchiectomy safety, Osemlak suprascrotal pediatric advantage, Besombes fixation evidence, emerging hormone-eluting / tissue-engineered designs.
- **[Scrotal Flap Reconstruction](docs/04-surgical-techniques/04e-genital-reconstruction/scrotal-flaps.mdx)** — consolidated 13-flap comparison linking each row to its foundations deep-dive; selection by clinical scenario (Fournier's per Alammar 2026, EMPD per Kim algorithm, HS, penile-shaft EPAP, lymphedema SCIP-LFT and VLNT).
- **[Genitourinary VCA](docs/surgical-techniques/04e-genital-reconstruction/genitourinary-vca.mdx)** — penile + total-penis-scrotum-lower-abdominal-wall VCA: 5-case global series, Johns Hopkins extended composite with bone-marrow-based immunomodulation → tacrolimus monotherapy at 3 yr, Baltimore Criteria 2023, Tuffaha perfusion-territory anatomy, Ruiz anterior-pubic-osteotomy model, Knoedler 2026 rejection SR, Sopko cavernous-physiology evidence, Caplan ethical framework, Cristofari trans-masculine GUVCA feasibility, VCA-vs-RFFF comparison.
- **[Modified Charles Procedure](docs/04-surgical-techniques/04e-genital-reconstruction/modified-charles-procedure.mdx)** — Sir Havelock Charles 1912 origin, FTSG-from-specimen vs STSG (Miller 1980 amputation warning), NPWT delayed-grafting modification (van der Walt ~100% take), CHAHOVA Charles + Homan's + VLNT, full urologic application with Singh / Modolin / Salako / Wisenbaugh / Torio-Padron data, four evolving combined excisional-physiologic alternatives.
- **[Debulking Scrotoplasty](docs/04-surgical-techniques/04e-genital-reconstruction/debulking-scrotoplasty.mdx)** — most common GL excisional approach (46.4% of GL surgeries, 10% complications per Guiotto SR), Torio-Padron integrated CDP model (6% revision), the &lt; 50%-diseased-skin threshold, etiology-stratified recurrence (50% MLL, 2% filarial, 9% giant scrotal), Wisenbaugh 1.3 → 7.7 QoL with weight-loss-plan requirement.
- **[Excision + Flap Reconstruction (GL)](docs/04-surgical-techniques/04e-genital-reconstruction/excision-flap-reconstruction-lymphedema.mdx)** — second-most-common (39.1%) but highest-complication (54.2%) GL surgery. Full flap catalog organized into local/perineal (Halperin perirectal-lymphatic-preserving, Yormuk U-shaped, Mendel bilateral scrotal for penile coverage), regional pedicled (pudendal-thigh, ALT with Guiotto composite + fascia lata, gracilis with Kayikçioğlu short variant, MCFAP, TFL lymphatic-absorption, IPAP propeller), and lymphatic flaps (SCIP-LFT, 3R).
- **[Complex Decongestive Therapy (CDT)](docs/04-surgical-techniques/04e-genital-reconstruction/complex-decongestive-therapy.mdx)** — 2024 ACS Lymphedema Summit consensus, four core pillars, two-phase model, Torio-Padron integrated perioperative concept (6% complication rate with no flaps/grafts needed), Lu MRL-guided treatment algorithm, adjuncts (IPC per Forner-Cordero non-inferiority RCT, NPCDs per 2026 AVF/AVLS position statement).
- **[Lymphaticovenous Anastomosis (LVA)](docs/04-surgical-techniques/04e-genital-reconstruction/lymphaticovenous-anastomosis.mdx)** — Hara ultrasound + Yoshimatsu milestone-swirl Stage-III expansion, NECST classification, Rodriguez-Yamamoto 6-step technique, EEA / ESA / SEA configurations with Kwon SEA superiority, genital-specific techniques (Mukenge spermatic-cord LVA, Yamamoto multi-site LVA, Hara & Mihara GAL algorithm), Boccardo 5-yr patency data, Kang 2026 hemodynamic critique, **prophylactic LYMPHA** (Boccardo 15-yr 2.5% vs 45% LE incidence, Hinson 69% risk reduction meta-analysis) with explicit urologic translation to PLND.
- **[Vascularized Lymph Node Transfer (VLNT)](docs/04-surgical-techniques/04e-genital-reconstruction/vascularized-lymph-node-transfer.mdx)** — four mechanisms (Maruccia neolymphangiogenesis, HEV-mediated pump, immune restoration, hyaluronidase fibrosis reduction), six donor-site comparison, four genital-specific techniques (Ehrl free lateral-thoracic curative algorithm with 0% recurrence at 49 mo, Phan submental, SCIP-LFT/3R, Abdelfattah pedicled VLNT + LVA), reverse lymphatic mapping (Pons ICG, Broyles SPECT/CT), Hamdi 60%→18% seroma learning curve.

### New 04l (male cosmetic) atlas pages

- **[V-I Penoscrotal Reconfiguration (Bagnara)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/v-i-penoscrotal-reconfiguration.mdx)** — El-Koutby grading, flap-free V-incision + dartos-band release + I-closure protocol, Bagnara 2024 n=21 outcomes (0% complications, 0% redo, 81% Likert 4/5).
- **[Xu Longitudinal Penoplasty](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/xu-longitudinal-penoplasty.mdx)** — four-step protocol (degloving / longitudinal incision / tunica-to-dartos fixation / closure), Alter principle and cross-technique parallels (Casale, Yang, Borsellino), longitudinal-vs-Z-plasty trade-offs, Xu n=41 outcomes.
- **[Reduction Scrotoplasty + Z-Plasty (Combined)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/reduction-scrotoplasty-zplasty-combined.mdx)** — third Thomas & Navia pathway for coexistent laxity + webbing; integrated incision design with T-junction vascular-safety considerations; application variants (scrotal MLL in obesity per Machol, concurrent IPP per Miranda-Sousa).
- **[Scrotal BoNT/A Injection ("Scrotox")](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/scrotal-botox.mdx)** — off-label aesthetic dartos relaxation with Gibson 2002 pharmacology (α-1 noradrenergic, myosin-phosphatase-mediated thermosensitivity), four genital BoNT/A applications, Mehdizadeh 2026 off-label-aesthetic SR (94% satisfaction), Breikaa rat-fertility safety signal with required counseling.

### New 03g clinical-conditions pages

- **[Genital Lymphedema](docs/clinical-conditions/03g-genital-scrotal/genital-lymphedema.mdx)** — renamed from `scrotal-lymphedema.mdx` and broadened in scope. Epidemiology (filariasis, prostate / gynecologic / pediatric / OIL-MLL), full primary vs secondary etiology including Crohn's ano-genital granulomatosis, pathophysiology, ISL / GLS / Ehrl / Lu-MRL staging, full conservative management (CDT, PCDs, ketoprofen with Tian LTB₄ mechanism, immunomodulators, antifilarials, PATCH-trial penicillin prophylaxis), weight management with BLOOM, all excisional approaches, and the full physiologic-reconstruction spectrum (LVA / VLNT / Yamamoto 3R / Abdelfattah / Ciudad CHASCIP / Yoshimatsu LYST), with a synthesized stage-by-stage algorithm.
- **[Giant Penoscrotal Lymphedema](docs/clinical-conditions/03g-genital-scrotal/giant-penoscrotal-lymphedema.mdx)** — end-stage ISL III deep-dive: epidemiology, etiology, pathophysiology (Th1/Th17 filarial, Wolbachia, dartos hyperplasia in obesity MLL), histopathology with Stewart-Treves risk, five classification systems, clinical presentation with extreme resected-weight cases (up to 61 kg / 134 lbs), differential emphasizing sarcoma exclusion, imaging (US per ACR, ICG with Klein 2026 posterior-scrotum-drainage finding, MRL per Lu algorithm), full surgical spectrum, and the four physiologic-reconstruction pillars synthesized into an expertise-driven algorithm.

### Expanded existing 04l pages

- [Reduction Scrotoplasty](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/reduction-scrotoplasty.mdx) — vertical-midline stepwise operative protocol, Bal local-anesthesia evidence (100% success / 92% would repeat), Rezaee 2022 NSQIP risk-factor table (n=12,917, 4.1% 30-day event rate), CPT 55175/55180 coding.
- [Penoscrotal-Web Correction (Z-plasty)](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/penoscrotal-web-correction.mdx) — Z-plasty geometry table (Roggendorf 1982 angle/lengthening/reorientation), stepwise operative protocol, variations including Chen & Song five-flap, Qiu 2019 flap-necrosis risk factors, CPT 55180.
- [V-Y Advancement Plasty](docs/04-surgical-techniques/04l-cosmetic-genital-surgery/v-y-plasty-male.mdx) — broadened from male-cosmetic-only to **three-context** framework (dorsal penopubic SLD, ventral penoscrotal webbing, scrotal reconstruction); added Andrades 2005 geometric foundation, Rapp 2005 tissue-expanded V-Y scrotoplasty, Kim 2014 reverse Y-V for paraffin lipogranuloma.

### Expanded foundations flap pages

- [EPAP flap](docs/01-foundations/surgical-principles/flaps/epap.mdx) — full external-pudendal-artery anatomy (SEPA / DEPA / inferior EPA, Carrera three-territory model, Jin perineal perforators), three EPAP innovations over traditional scrotal flaps, the broader EPA family (STEPA cadaveric, SEPAP per Kim 2023, DEPAP per Kim 2025, Mayer 1991, Lee 2020 KDPIF keystone), penile-resurfacing comparison vs STSG / ALT / SCIP.
- [Posterior thigh flap](docs/01-foundations/surgical-principles/flaps/posterior-thigh.mdx) — Hurwitz / Achauer / Rubin / Windhofer / Friedman-Reece chronology, dual IGA-descending-branch + PFA-perforator anatomy with Pan-Taylor angiosomes, PFCN innervation, Friedman-Reece full outcome table (96.3% survival), Hurwitz bilateral-deepithelialized dead-space obliteration, six modifications (Ordenana WPGTPF, Chrelias G-PPF, Myers bilateral V-Y, Komuro U-shape, Li free third-perforator, Fukunaga venous-supercharged freestyle).
- [IGAP / SGAP / gluteal-fold flap](docs/01-foundations/surgical-principles/flaps/igap-gluteal-fold.mdx) — four-part disambiguation of SGAP (above piriformis) / IGAP (below piriformis) / gluteal-fold-and-infragluteal-perforator (direct cutaneous descending IGA, preserving the descending branch for future flaps) / gluteal turnover flap; Tuinder sc-GAP and Rad LSGAP variants; Gould n=194 IGAP 0% loss; Benedict IGAP-vs-VRAM equivalence; Johal V-IGAP 70% return to sexual activity; **BIOPEX-2 RCT** showing reduced presacral abscess (22% → 9%, p=0.02) for gluteal turnover flap.
- [MCFAP flap](docs/01-foundations/surgical-principles/flaps/mcfap.mdx) — nomenclature disambiguation (MCFAP vs gracilis perforator vs upper-medial-thigh freestyle vs TMG/TUG), full MCFA + gracilis-pedicle anatomy (Tomaszewski 4,351-limb meta-analysis, Peek 43-cadaver perforator data with the constant intramuscular anastomosis extending the flap to 27 cm), three operative variants, six clinical applications, MCFAP-vs-TMG-vs-PAP head-to-head with Borrelli SR (PAP 0.6% vs TUG 5.0% vascular complications), combined/chimeric configurations (Ciudad TUGPAP, Sharp PAP+bilateral gracilis, Weinstein bilobed gracilis).
- [Island groin flap (SCIA-axial)](docs/01-foundations/surgical-principles/flaps/island-groin.mdx) — McGregor & Jackson 1972 axial-pattern introduction → Daniel & Taylor 1973 first-ever microsurgical free transfer → Koshima 2004 SCIP refinement → Goh & Hong 2015 "thinnest available" 210-flap series; full SCIA anatomy with Yoshimatsu deep-branch / transverse-branch landmark; Sahai & Singh 30-yr scrotal protocol; composite / chimeric configurations (osteocutaneous, Chao C-C/M-C/O-C, Yamamoto quadruple-component, SCIP+SIEA/DIEP); Scaglioni 2023 SCIP+LVA novel lymph-flow-through technique.

### New foundations flap stubs

Added five **stub pages** for flaps referenced in the scrotal-reconstruction literature but missing from the foundations catalog (later expanded above): [island-groin](docs/01-foundations/surgical-principles/flaps/island-groin.mdx), [MCFAP](docs/01-foundations/surgical-principles/flaps/mcfap.mdx), [IGAP / gluteal-fold](docs/01-foundations/surgical-principles/flaps/igap-gluteal-fold.mdx), [posterior thigh](docs/01-foundations/surgical-principles/flaps/posterior-thigh.mdx), [EPAP](docs/01-foundations/surgical-principles/flaps/epap.mdx). All five indexed in [flaps-gu-reconstruction.mdx](docs/01-foundations/surgical-principles/flaps-gu-reconstruction.mdx).

### Scrotal-reconstruction DB restructuring

The scrotal-reconstruction DB was substantially restructured:

- **Renamed column** "Indications" → "Best for / indications" on scrotal-primary-closure page (alignment with site-wide standardization).
- **Skin grafting** — two rows (STSG, FTSG) collapsed to a single "Scrotal Skin Grafting (STSG / FTSG)" row.
- **Thigh pouch** — two rows (temporary, definitive) collapsed to a single row covering all three paradigms (Okwudili, Staniorski, Hiawatha).
- **Aesthetic procedures** — all four aesthetic rows (reduction scrotoplasty, penoscrotal-web Z-plasty, Bagnara V-I, Borsellino raphe) **moved from scrotal DB to male cosmetic DB**; Aesthetic badge color removed from scrotal DB.
- **Duplicate Penoscrotal-Web Z-Plasty** dropped from Surgical Lengthening (canonical Scrotal Aesthetic version retained).
- **Flap reconstruction** — eight flap rows (6 Pedicled Flap + 2 Lymphatic Flap) collapsed to a single "Scrotal Flap Reconstruction (all flap families)" row under a unified Flap Reconstruction domain.
- **NPWT row** removed (the technique is covered in the scrotal-reconstruction hub and foundations wound-healing-adjuncts page).
- **Testicular prosthesis** — four rows (saline, silicone, intravaginal at orchiectomy, pediatric) collapsed to a single row.
- **New Lymphedema Surgery domain** added with **10 rows**: CDT, LVA, VLNT, modified Charles, SCIP-LFT/3R, CHASCIP, Abdelfattah complete functional lymphatic-system transfer, LYST, SAPL, BLOOM.
- **Combined / Salvage** — Ehrl giant penoscrotal lymphedema row renamed and re-pointed to the new giant-penoscrotal-lymphedema page; VCA row re-pointed to the new genitourinary-vca page.

### Penile DB additions

- Added Genitourinary VCA row under Staged / Salvage so both treatment databases surface the GUVCA option.

### Male cosmetic DB additions

- Bagnara V-I, Borsellino raphe, Reduction Scrotoplasty + Z-Plasty (combined), Scrotal BoNT/A ("Scrotox"), Xu longitudinal-incision-with-penoscrotal-angle-reconstruction rows added under Scrotal Aesthetic.

### Verification

`npm run lint:links` clean across **988 files**; `npm run build` clean; `npm run typecheck` clean.

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
