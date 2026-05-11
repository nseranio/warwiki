# WARWIKI - Claude Session Reference

Read this at the start of a session. Keep it small: this file is the working handbook, not the project archive. Put substantive history in `CHANGELOG.md`; use `docs/_STATUS.md` for the stub backlog.

---

## Current Handoff - 2026-05-10 — 04e penile-reconstruction overhaul + site-wide best-for standardization

Major 04e penile-reconstruction atlas build-out (~ 25 new dedicated atlas pages), full hub-and-spoke fistula-page expansion for the remaining 04h both-genders types, and a site-wide DB best-for / indication column standardization. Build clean across 967 files.

Highlights:

- **04h hub-and-spoke fistula expansion** — [Vesicocutaneous](docs/04-surgical-techniques/04h-fistula-repair/both-genders/vesicocutaneous.mdx), [Post-Kidney-Transplant](docs/04-surgical-techniques/04h-fistula-repair/both-genders/post-kidney-transplant.mdx), and [Ureteroarterial](docs/04-surgical-techniques/04h-fistula-repair/both-genders/ureteroarterial.mdx) atlas pages expanded with redundancy-avoidance opening paragraphs deferring etiology / presentation / diagnosis to the clinical-conditions pages while focusing the atlas on stepwise repair, surgical options, and outcomes. Both-genders DB `bestFor` collapsed to one-line indications.
- **04e penile-reconstruction major build-out** — buried penis repair fully written from stub; new dedicated pages for [Panniculectomy](docs/04-surgical-techniques/04e-genital-reconstruction/panniculectomy.mdx), [Escutcheonectomy](docs/04-surgical-techniques/04e-genital-reconstruction/escutcheonectomy.mdx), [Penile Skin Grafting](docs/04-surgical-techniques/04e-genital-reconstruction/penile-skin-grafting.mdx), [Primary Closure ± Z-Plasty](docs/04-surgical-techniques/04e-genital-reconstruction/penile-primary-closure.mdx); all seven scrotal-flap shaft techniques ([Fakin bipedicled](docs/04-surgical-techniques/04e-genital-reconstruction/bipedicled-anterior-scrotal-flap.mdx), [Murányi tunnel](docs/04-surgical-techniques/04e-genital-reconstruction/muranyi-scrotal-tunnel-flap.mdx), [Yao butterfly](docs/04-surgical-techniques/04e-genital-reconstruction/yao-butterfly-scrotal-flap.mdx), [Pribaz / McLaughlin staged](docs/04-surgical-techniques/04e-genital-reconstruction/staged-scrotal-flap.mdx), [VSSF](docs/04-surgical-techniques/04e-genital-reconstruction/ventral-slit-scrotal-flap.mdx), [Zhao total-anterior](docs/04-surgical-techniques/04e-genital-reconstruction/total-anterior-scrotal-flap.mdx), [Gao reverse-flow](docs/04-surgical-techniques/04e-genital-reconstruction/reverse-anterior-scrotal-flap.mdx), [Tsukuura sensate EPAP](docs/04-surgical-techniques/04e-genital-reconstruction/epap-hemi-scrotal-flap.mdx)); consolidated [Tissue Substitutes](docs/04-surgical-techniques/04e-genital-reconstruction/penile-tissue-substitutes.mdx); [Glans Resurfacing](docs/04-surgical-techniques/04e-genital-reconstruction/glans-resurfacing.mdx) with integrated OMG section; [Glansectomy + STSG](docs/04-surgical-techniques/04e-genital-reconstruction/glansectomy-stsg.mdx); [Glanuloplasty With Flaps (umbrella)](docs/04-surgical-techniques/04e-genital-reconstruction/glanuloplasty-flaps.mdx) plus four split technique pages ([Belinky / Chavarriaga IUF](docs/04-surgical-techniques/04e-genital-reconstruction/inverted-urethral-flap.mdx), [Gulino eversion](docs/04-surgical-techniques/04e-genital-reconstruction/gulino-everted-urethral-flap.mdx), [Mazza / Cheliz scrotal](docs/04-surgical-techniques/04e-genital-reconstruction/mazza-scrotal-flap-glanuloplasty.mdx), [Shaeer rectus myofascial](docs/04-surgical-techniques/04e-genital-reconstruction/shaeer-rectus-myofascial-neoglans.mdx)); and [Microsurgical Penile / Glans Replantation](docs/04-surgical-techniques/04e-genital-reconstruction/penile-replantation.mdx) with cross-link section added to [Genitoscrotal Trauma](docs/special-populations/05a-trauma-emergencies/genital-scrotal-trauma.mdx). New "Trauma / Replantation" domain badge added to the penile DB.
- **04e penile DB consolidation** — collapsed adjacent-tissue / overlapping graft / dermal-template / tissue-expansion rows into the new dedicated pages; removed redundant rows (Wide Local Excision shaft tumor, Meatoplasty / Meatotomy Adjunct, Staged Skin Replacement after LS); renamed the umbrella buried-penis row to "Buried Penis Repair (overview)".
- **Site-wide DB best-for column standardization** — added concise one-line `bestFor` indication strings across **11 additional treatment databases**: 04b bladder-reconstruction (18), 04i tissue-transfer (header rename), 04e penile (23) / vulvar (30) / scrotal (24), 04k feminizing (17), masculinizing (23), non-binary / nullification (10), 04l male-cosmetic (16), 04j ED (13), 04j priapism (10 — Role column repurposed). Excluded BPH/LUTS (technique-vs-flow comparison) and foundations tool / biomaterial / pharmacology indices (taxonomic catalogs).

Full session detail in `CHANGELOG.md`. Verification: `npm run lint:links`, `npm run typecheck`, `npm run build` all pass across 967 files.

## Previous Handoff - 2026-05-09 (third pass — fistula-atlas overhaul + HBOT)

Major 04h fistula-repair restructuring + new foundations HBOT page. Build clean across 936 files.

Highlights:

- **Female fistula DB consolidated** — `notes` → `bestFor` column with concise indication strings; UVF / VUF / UretVF rows collapsed to one-row-per-type linking to clinical-page Management anchors or new dedicated atlas pages. Obstetric domain rows deleted (same ladder as VVF — kept clinical-conditions obstetric page).
- **New RVF atlas pages** — [ERAF ± Sphincteroplasty](docs/04-surgical-techniques/04h-fistula-repair/female/eraf.mdx), [Episioproctotomy](docs/04-surgical-techniques/04h-fistula-repair/female/episioproctotomy.mdx), [Nonoperative RVF Management](docs/04-surgical-techniques/04h-fistula-repair/female/nonoperative-rvf-management.mdx), [Transabdominal RVF Repair](docs/04-surgical-techniques/04h-fistula-repair/female/transabdominal-rvf-repair.mdx) with full APR section, [Anal Sphincteroplasty](docs/04-surgical-techniques/04h-fistula-repair/female/anal-sphincteroplasty.mdx), [Urethrovaginal Fistula Repair](docs/04-surgical-techniques/04h-fistula-repair/female/urethrovaginal-fistula-repair.mdx).
- **New RUF atlas pages** — [Transperineal Gracilis](docs/04-surgical-techniques/04h-fistula-repair/male/transperineal-gracilis-ruf.mdx), [ERAF for RUF](docs/04-surgical-techniques/04h-fistula-repair/male/eraf-ruf.mdx) (kept separate from RVF ERAF — different anatomic position, etiology, comparator), [York-Mason](docs/04-surgical-techniques/04h-fistula-repair/male/york-mason.mdx), [Conservative Management of RUF](docs/04-surgical-techniques/04h-fistula-repair/male/conservative-ruf-management.mdx), [Robotic Transabdominal RUF/RVF Repair](docs/04-surgical-techniques/04h-fistula-repair/male/robotic-transabdominal-ruf-rvf.mdx) shared between RUF and RVF (same operation, urinary closure differs).
- **Cross-cutting shared pages** — [Transanal MIS Repair](docs/04-surgical-techniques/04h-fistula-repair/transanal-minimally-invasive-repair.mdx) at the 04h root with R-TAMIS operative video, comparative MITAR/TEM/TAMIS table; [Fecal Diversion](docs/04-surgical-techniques/04h-fistula-repair/fecal-diversion.mdx) referenced from all three fistula DBs.
- **Both-genders DB collapsed** from 26 rows to 8 (one row per fistula type + Fecal Diversion).
- **New foundations HBOT page** — [Hyperbaric Oxygen Therapy](docs/01-foundations/surgical-principles/hyperbaric-oxygen-therapy.mdx): RICH-ART Level 1 evidence, ten applications (radiation cystitis, Fournier's, fistula adjunct, hypospadias graft conditioning, radiation vaginal injury, IC/BPS, ED, radiation proctitis, preoperative tissue conditioning, mesh complications); adverse-effect profile and cost analysis. Wound-healing-adjuncts tightened to summary + cross-link.

Full session detail in `CHANGELOG.md`. Verification: `npm run lint:links`, `npm run typecheck`, `npm run build` all pass.

Older handoffs (2026-05-09 style cleanup, 2026-05-09 later, 2026-05-09, 2026-05-08, and earlier) are archived in `CHANGELOG.md` to keep this file compact.

<!-- Older detailed handoffs preserved in CHANGELOG.md; uncomment if needed for quick reference -->

<!-- ## Previous Handoff - 2026-05-09

Long fistula / catheterizable-channel / upper-tract / robotics build-out session. All work pushed to `main`. Build clean across ~915 files.

Highlights of this session:

- **Resources cleanup** — drop filler intros from resources index, podcasts, patient resources, textbooks, websites, hidden curriculum (deleted RVU-anecdote / "no MBA" / "If you can't quote your numbers, you can't lead" lines). Reorder websites so Professional Societies appears first. Textbooks: every card is a clickable link to a Google search surfacing the Springer / PDF source. Site-wide eradication of `:::tip / :::note / :::warning / :::info / :::caution` admonitions across **123 files** (titles preserved as bolded inline lead). Billing & Coding restructured into Tabs (CPT / ICD-10 / Modifiers / External Resources) with ~120 new codes covering upper-tract reconstruction, bladder reconstruction & diversion, BNC/VUAS, vaginal recon & GAS, hypospadias / penile recon, BPH, mesh / IPP / congenital / gender-incongruence / trauma / rUTI codes.
- **Female cosmetic database** → static markdown table with a "Best for / indication" column. **Podcasts** "Contributing" section deleted.
- **04b bladder reconstruction — full catheterizable-channel build-out**:
  [Yang-Monti Channel](docs/04-surgical-techniques/04b-bladder-reconstruction/yang-monti.mdx) (incl. Double Monti, Casale spiral, Tapered, sigmoid/gastric variants),
  [Tubularized Bladder Flap](docs/04-surgical-techniques/04b-bladder-reconstruction/tubularized-bladder-flap.mdx),
  [Hemi-Kock Continent Stoma](docs/04-surgical-techniques/04b-bladder-reconstruction/hemi-kock.mdx),
  [Indiana Augmentation Cystoplasty (IAC)](docs/04-surgical-techniques/04b-bladder-reconstruction/indiana-augmentation-cystoplasty.mdx),
  [Cutaneous Vesicostomy (Blocksom / Lapides + Benchekroun history)](docs/04-surgical-techniques/04b-bladder-reconstruction/cutaneous-vesicostomy.mdx).
- **04c urinary diversion** — new [Parastomal Hernia After Urinary Diversion](docs/04-surgical-techniques/04c-urinary-diversion/parastomal-hernia.mdx) (canonical home; cross-linked from 04b CCC principles section 9). 04c diversion DB gained a "Best for / indication" column.
- **04d upper-tract reconstruction — major build-out**:
  [Balloon Dilation](docs/04-surgical-techniques/04d-upper-tract-reconstruction/balloon-dilation.mdx),
  [Yang-Monti Ileal Ureter](docs/04-surgical-techniques/04d-upper-tract-reconstruction/yang-monti-ileal-ureter.mdx),
  [Reconfigured Colon Ureteral Substitute](docs/04-surgical-techniques/04d-upper-tract-reconstruction/reconfigured-colon.mdx),
  [Pyelovesicostomy](docs/04-surgical-techniques/04d-upper-tract-reconstruction/pyelovesicostomy.mdx),
  [Simple (Benign) Nephrectomy](docs/04-surgical-techniques/04d-upper-tract-reconstruction/simple-nephrectomy.mdx),
  [Transvaginal Ureteral Reimplantation (single-port robotic vNOTES)](docs/04-surgical-techniques/04d-upper-tract-reconstruction/transvaginal-ureteral-reimplant.mdx).
  Existing UAS revision page un-hidden and expanded with hybrid Bricker/Wallace, Allium stent, and ICG-prevention discordance data; cross-linked from 04c diversion principles.
  Database `notes` column → `bestFor`. Deleted Lingual Mucosal Graft and solo Psoas Hitch rows.
- **Foundations / robotics** — new [vNOTES & Robotic vNOTES](docs/01-foundations/tools/technology/robotics/vnotes.mdx) page covering platforms, technique, indications, ACOG/RCOG guidance.
- **04h fistula repair — full VVF atlas build-out** (all renamed and repointed from clinical-conditions slug to dedicated atlas pages):
  [Conservative VVF Management](docs/04-surgical-techniques/04h-fistula-repair/female/conservative-vvf-management.mdx) (replaces the old "Foley Catheter Drainage" row),
  [Endoscopic VVF Management](docs/04-surgical-techniques/04h-fistula-repair/female/endoscopic-vvf-repair.mdx) (cystoscopic Bugbee, Ho:YAG laser, tissue adhesives, NOTES, transvesicoscopic, V-NOTES, lap/robotic/LESS),
  [Transvaginal Latzko Repair](docs/04-surgical-techniques/04h-fistula-repair/female/transvaginal-latzko.mdx),
  [Transvaginal Sims-Simon Multilayered Closure](docs/04-surgical-techniques/04h-fistula-repair/female/transvaginal-sims-simon.mdx),
  [Martius Flap for VVF](docs/04-surgical-techniques/04h-fistula-repair/female/martius-flap-vvf.mdx),
  [O'Conor (Transabdominal Transvesical) VVF Repair](docs/04-surgical-techniques/04h-fistula-repair/female/oconor-vvf-repair.mdx),
  [Extravesical Transabdominal VVF Repair](docs/04-surgical-techniques/04h-fistula-repair/female/extravesical-vvf-repair.mdx),
  [Robotic VVF Repair (platform overview)](docs/04-surgical-techniques/04h-fistula-repair/female/robotic-vvf-repair.mdx),
  and the unifying [Vaginal Fistula — Interposition Flap Options](docs/04-surgical-techniques/04h-fistula-repair/vaginal-fistula-flaps.mdx) catalog. Now also covers a dedicated **Native Vaginal-Wall Flaps** section (Shoukry rectangular reinforcement, Wang lateral transfer, Tang annular single-layer, Sayegh vaginal-cuff for robotic, Latzko-as-vaginal-flap), the **Labia Majora Fasciocutaneous flap** (vaginal-wall-deficit cases), the **Full-Thickness Martius graft with skin paddle** (large obstetric fistulae), and a full **Vaginal Advancement Flap (VAF) for RVF** section (VAF vs RAF — Ruffolo SR Crohn's data; Nosti +pedicled-flap zero-failure result; Li 2025 RAF; ASCRS 2022 guidance). Plus omental / rainbow peritoneal / sigmoid epiploicae / gracilis / VRAM / Singapore / TachoSil / SIS / PRP / amniotic / buccal. Female-fistula DB rows repointed; intro repair-strategy table cross-links updated.

Verification: `npm run lint:links` passes; `npm run typecheck` passes; `npm run build` passes.

Previous Heavy 04ab BNC/VUAS + 04b bladder-reconstruction build-out highlights are archived in `CHANGELOG.md`; keep this file as the compact working handbook.

## Previous Handoff - 2026-05-08

Heavy 04ab BNC/VUAS consolidation + 04b bladder-reconstruction build-out session. All work pushed to `main` via `git push origin HEAD:main`. Build clean across ~890+ files.

Highlights of this session:

- **04ab BNC/VUAS database consolidation** — collapsed redundant rows: holmium / cold-knife / DVIU into one TUIBNC row; deleted DVIU+MMC and DCB rows (DCB now under balloon dilation); deleted RBNR, Extraperitoneal Robotic, and Robotic Transperineal Urethral Advancement (subsumed by Primary Re-Anastomosis and Combined Abdominoperineal). Removed Young-Dees-Leadbetter, Kropp, and Pippi-Salle outlet procedures and their pages. Both DBs use `bestFor` column (header "Best for / indication") — short indication strings instead of long-form notes.
- **New 04ab atlas pages** — [TUITMR](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/transurethral-incision-transverse-mucosal-realignment.mdx), [Y-V Plasty (Robotic + Open)](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/yv-plasty.mdx), [T-Plasty](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/t-plasty-bnc.mdx), [Subtrigonal Inlay (BMG family)](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/subtrigonal-inlay.mdx), [Tanagho Flap](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/tanagho-flap.mdx), [Transvesical Approaches](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/transvesical-approaches.mdx) (RTV-BNR + TvRARP), [Primary Re-Anastomosis](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/primary-reanastomosis.mdx), [Combined Abdominoperineal / Pull-Through](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/combined-abdominoperineal.mdx), [Robotic Bladder Flap Posterior Urethroplasty](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/robotic-bladder-flap-urethroplasty.mdx), [Salvage Prostatectomy (reconstructive)](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/outlet-continence/salvage-prostatectomy.mdx) — moved from VUAS to BNC, [BMG Endourethroplasty](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/endourethroplasty.mdx), focused [Dorsal Onlay BMG for VUAS/BNC](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/dorsal-bmg-bnc.mdx) (Shahrour technique only; 2 operative videos).
- **VUAS Lee 2025 algorithm** — caliber + EUS-involvement decision tree (Naser-Tavakolian & Lee, *Transl Androl Urol* 2025;14(8):2405–2418, doi:[10.21037/tau-24-503](https://doi.org/10.21037/tau-24-503)) keys non-transecting flap (≥10 Fr no EUS), excision + primary anastomosis vs anterior bladder flap (\<10 Fr no EUS), or urethral pull-through (any caliber past EUS).
- **04b bladder-reconstruction build-out** — eight new dedicated atlas pages with full content + database slugs updated:
  [Ileocystoplasty](docs/04-surgical-techniques/04b-bladder-reconstruction/ileocystoplasty.mdx),
  [Ileocecocystoplasty](docs/04-surgical-techniques/04b-bladder-reconstruction/ileocecal-cystoplasty.mdx),
  [Sigmoid Cystoplasty](docs/04-surgical-techniques/04b-bladder-reconstruction/sigmoid-cystoplasty.mdx),
  [Autoaugmentation](docs/04-surgical-techniques/04b-bladder-reconstruction/autoaugmentation.mdx),
  [Ureterocystoplasty](docs/04-surgical-techniques/04b-bladder-reconstruction/ureterocystoplasty.mdx),
  [Gastrocystoplasty](docs/04-surgical-techniques/04b-bladder-reconstruction/gastrocystoplasty.mdx),
  [SCLU](docs/04-surgical-techniques/04b-bladder-reconstruction/seromuscular-colocystoplasty.mdx),
  [Ileovesicostomy](docs/04-surgical-techniques/04b-bladder-reconstruction/ileovesicostomy.mdx),
  [Appendicovesicostomy / Mitrofanoff](docs/04-surgical-techniques/04b-bladder-reconstruction/appendicovesicostomy.mdx).
- **04c urinary diversion** — new [Simple Cystectomy (Benign Disease)](docs/04-surgical-techniques/04c-urinary-diversion/simple-cystectomy.mdx) page added to the Complex / Salvage family.
- **04b** — new [Supratrigonal Cystectomy + Augmentation](docs/04-surgical-techniques/04b-bladder-reconstruction/supratrigonal-cystectomy.mdx) page; both linked from the IC/BPS clinical page.
- **Cross-database link audit** — added slugs to duplicate rows referring to suprapubic catheter, balloon dilation, indwelling catheter, Foley/Coudé/Council/Penrose so all duplicate rows now point at their dedicated pages.
- **Instruments** — new [Ski / J-Hook Needle](docs/01-foundations/tools/instruments/urethral-specialty/ski-needle-j-hook.mdx) page (operative video at 3:07); cross-linked from the [Dorsal Onlay BMG](docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/bnc-vuas/dorsal-bmg-bnc.mdx) technique step.
- **Peyronie's-at-implant** — added the **Balzano** *Can J Urol* 2022 curvature-direction algorithm and the **Brock 2006** intracorporeal-incision lineage to the [IPP-with-adjunctive-straightening](docs/04-surgical-techniques/04j-sexual-dysfunction/peyronies-disease/prosthesis-with-straightening.mdx) page; expanded TEP detail.

Verification: `npm run lint:links` passes; `npm run typecheck` passes; `npm run build` passes.

Previous prolapse-atlas, GAS phalloplasty, and older session history are archived in `CHANGELOG.md`; keep this file as the compact working handbook. -->

---

## Non-Negotiables

Before writing or modifying an article:

1. Scope: primary topics must fit reconstructive urology, functional urology, or urogynecology. Out of scope as primary topics: endourology for stones and primary urologic oncology. Reconstructive consequences are fine.
2. Voice: write for reconstructive surgeons and urogynecologists, not patients or general medicine readers. Keep operative relevance, anatomy, decision points, complications, and outcomes.
3. Citations: use real published references only. Default citation pattern is inline `<sup>[[N]](#refN)</sup>` plus `<a id="refN"></a>N. ...` anchors. GAS pages use footnotes (`[^N]`). Do not fabricate citations.
4. Cross-link instead of duplicating: when a nearby hub already owns anatomy, pharmacology, physiology, or workflow detail, link to it and keep the new page narrow.
5. Hidden atlas pages must still be reachable through explicit database or hub links so orphan lint passes.

Before committing:

1. Run `npm run lint`.
2. If stubs were added or filled, run `npm run status`.
3. If articles, links, routes, MDX, or React changed, run `npm run typecheck` and `npm run build`.
4. Run `git diff --check`.

---

## Commands

| Task | Command |
|---|---|
| Dev server | `npm start` |
| Production build | `npm run build` |
| TypeScript | `npm run typecheck` |
| Full lint | `npm run lint` |
| Scope lint | `npm run lint:scope` |
| Citation lint | `npm run lint:citations` |
| Orphan lint | `npm run lint:orphans` |
| Internal links | `npm run lint:links` |
| Reference-density advisory | `npm run lint:density` |
| Stub tracker | `npm run status` |
| Regenerate stats | `npm run stats` |

`npm run build` runs `prebuild` and regenerates `src/data/stats.json`.

---

## Project Shape

WARWIKI is a Docusaurus v3 medical reference wiki for functional urology and genitourinary reconstruction. Audience: urology residents, fellows, reconstructive surgeons, and urogynecologists.

Top-level docs:

| Directory | URL |
|---|---|
| `docs/01-foundations/` | `/docs/foundations` |
| `docs/02-evaluation/` | `/docs/evaluation` |
| `docs/03-clinical-conditions/` | `/docs/clinical-conditions` |
| `docs/04-surgical-techniques/` | `/docs/surgical-techniques` |
| `docs/05-special-populations/` | `/docs/special-populations` |
| `docs/06-journal-club/` | `/docs/journal-club` |
| `docs/07-roots/` | `/docs/roots` |
| `docs/08-resources/` | `/docs/resources` |

URL rules:

- Docusaurus strips numeric prefixes from top-level dirs only: `03-clinical-conditions` becomes `/docs/clinical-conditions`.
- Alphanumeric subsection prefixes stay in URLs: `04a-urethral-reconstruction` stays `04a-urethral-reconstruction`.
- Same-name file/dir collapses: `oral-cavity/oral-cavity.mdx` serves at `/docs/.../oral-cavity`.
- Vercel uses `cleanUrls: true` and `trailingSlash: false`.

Key files:

| File | Purpose |
|---|---|
| `docusaurus.config.ts` | Site config, navbar, Algolia, metadata, broken-link behavior |
| `sidebars.ts` | Sidebar wiring |
| `src/css/custom.css` | Main custom styling and reusable classes |
| `src/components/GenericDatabase.tsx` | Searchable/filterable database component |
| `src/components/VideoCards.tsx` | Lazy YouTube card grid |
| `src/components/SurgeonsExplorer.tsx` | GURS/URPS genealogy explorer |
| `src/data/surgeons.ts` | Surgeon records and dynasty data |
| `src/data/stats.json` | Generated article/reference counts |
| `scripts/check-*.js` | Lint checks |
| `scripts/gen-status.js` | Stub tracker generator |
| `docs/_STATUS.md` | Current stubs and priorities |
| `CHANGELOG.md` | Session history archive |

---

## Article Pattern

Default clinical article:

```mdx
---
title: Short Sidebar Title
sidebar_position: N
---

# Full Article Title

Opening paragraph with reconstructive relevance and an early citation.

---

## Epidemiology
## Etiology / Pathophysiology
## Clinical Presentation / Diagnosis
## Classification / Staging
## Management
## Complications
## Outcomes / Follow-Up
## References

<a id="ref1"></a>1. Last FM, et al. "Article Title." *Journal.* Year;Volume(Issue):Pages. doi:[10.xxxx/...](https://doi.org/10.xxxx/...)
```

Citation rules:

- Inline: `<sup>[[1]](#ref1)</sup>`.
- Multiple: `<sup>[[1]](#ref1)[[2]](#ref2)</sup>`.
- References go after a `---` separator at the end.
- Include DOI links when available.
- Cite guidelines, RCTs, systematic reviews, and high-volume series when applicable.
- Keep reference numbering contiguous; use `scripts/fix-citations.js` only when appropriate and review the result.

GAS citation variant:

- Use footnotes consistently within GAS pages: inline `[^1]`, bottom `[^1]: ...`.

MDX gotchas:

- Escape prose angle brackets: `&lt;35 kg/m2`, not `<35 kg/m2`.
- Escape ampersands in JSX attributes: `RUG &amp; VCUG`.
- No `$$...$$` LaTeX; math plugins are not installed.
- Raw HTML must be valid JSX.
- Landing pages use `hide_title: true`, which also suppresses the TTS ArticleListener.

---

## Content Standards

Scope:

- In scope: urethroplasty, ureteral reconstruction, reimplantation, pyeloplasty, bladder augmentation, catheterizable channels, urinary diversion framed reconstructively, fistula repair, incontinence surgery, AUS/IPP, Peyronie's, ED surgery, GAS, hypospadias, prolapse, perineal reconstruction, neurogenic bladder, voiding dysfunction, and functional pelvic disorders.
- Out of scope as primary topics: PCNL, ureteroscopy for stones, radical cystectomy/nephrectomy/prostatectomy as cancer operations.
- Gray zone: acceptable only when framed as reconstructive consequence, such as radiation injury, post-prostatectomy stricture, post-cystectomy diversion complications, or RUF after prostate cancer treatment.

Voice and accuracy:

- Formal academic prose, active voice, no consumer-health disclaimers.
- Be specific with complication rates, success rates, follow-up intervals, and evidence quality.
- Tables are preferred for comparisons and operative decision logic.
- Cut general-medicine depth that does not alter reconstructive decisions.

Source cleanup for chatbot-assisted drafts:

- Remove trailing "Would you like..." prompt text.
- Remove placeholder figure text unless embedding a real image.
- Rebuild mashed markdown tables.
- Convert bracket citations to the site citation pattern.
- Check that every cited reference supports the claim and that every anchor is used.
- Watch for copied `undefined`, malformed `p[N]`, and wrong acronym links.

---

## Atlas And Database Conventions

Treatment-atlas preferred pattern:

1. Section landing page is itself the searchable database.
2. A short "General Principles" block appears above the database when useful.
3. Named technique pages are linked from database rows.
4. Redundant overview pages are hidden from the sidebar when the landing already serves that role.

Database row naming:

- Use bare procedure names with optional acronym only.
- Do not add indication, uniqueness, FDA status, evidence claims, or long parentheticals to row names.
- Keep notes only when not every row has a dedicated page. Once every row has a full page, drop duplicated notes if the section pattern supports it.

Hidden pages:

- Page frontmatter can use `sidebar_class_name: sidebar-hidden-item`.
- Hidden directories use `_category_.json` with `"className": "sidebar-hidden-category"`.
- Hidden pages still need explicit links from a visible hub/database.

Current locked examples:

- Male cosmetic database: notes dropped after every row gained a dedicated page.
- Female cosmetic database: notes remain until every row has a dedicated per-device page.
- Energy-device cosmetic pages must distinguish surgical cutting-tool use from nonsurgical "rejuvenation" marketing and FDA warnings.

---

## Index And Landing Pages

Every section has an `index.mdx` with `hide_title: true`.

Top-level landings use `section-stack`:

```mdx
<ul className="section-stack">
  <li>
    <a href="/docs/section/subsection" className="section-stack-title section-stack-link">Subsection Title</a>
    <span className="section-stack-desc">One-line description.</span>
  </li>
</ul>
```

Deeper indexes may use `toc-list` and optional `toc-chips`:

```mdx
<ul className="toc-list">
  <li>
    <a href="/docs/.../page"><strong>Page Title</strong></a>
    <span className="toc-desc">Description.</span>
    <div className="toc-chips">
      <a href="/docs/.../child">Child</a>
    </div>
  </li>
</ul>
```

Use linked `<a>` titles for sections with real landings; use `<span className="toc-section">` for non-clickable headings.

---

## Components And Assets

VideoCards:

```mdx
import VideoCards from '@site/src/components/VideoCards';

<VideoCards videos={[
  { id: 'JVOycQzgHN0', title: 'Kidney anatomy', subtitle: 'Gross and vascular overview' },
]} />
```

- `id` is only the YouTube ID.
- Place `## Videos` immediately before `## References`.

Anatomy images:

- Store in `static/img/anatomy/`.
- Embed as `![Alt text](/img/anatomy/file.ext)` followed by an italic caption.
- Use public-domain or CC sources such as Gray's Anatomy, OpenStax, and Blausen.
- Never create caption-only figure blocks.

Surgeon profiles:

- Profiles live at `docs/07-roots/surgeons/{a-g|h-r|s-z}/{name}.mdx`.
- `SurgeonDirectory` and `SurgeonTree` must link with `s.path`, not `s.id`, because alpha-group folders are part of the URL.
- `docs/07-roots/surgical-lineage.mdx` hosts `<SurgeonsExplorer defaultSubspecialty="GURS" />`; the surgeons category is hidden from the sidebar.

---

## Design And Navigation

Brand:

- Primary blue: `#185FA5`.
- Clean academic style, not consumer health.
- Add dark-mode CSS variants for new light-only colors.

Navbar:

1. Foundations, Evaluation, Clinical Conditions, Treatment Atlas, Special Populations.
2. Library dropdown: Journal Club, Resources, History & Lineage.
3. Search.
4. About.
5. GitHub icon.

Homepage:

- `WARWIKI` title links to `/docs/foundations`.
- Tagline: `Reconstruction, codified.`
- Search pill text: `Where should we start?`

---

## Current Section Notes

- Foundations: Anatomy & Physiology, Surgical Principles, Surgical Skills, Perioperative Care, Pharmacology, Tools.
- Treatment Atlas: landing-page-as-database pattern is preferred; 04b bladder, 04a urethral, and 04c urinary diversion are examples.
- Incontinence lives under `04f-incontinence-procedures/`; old `04h-prosthetics/` was deleted.
- History & Lineage uses `SurgeonsExplorer`; hidden surgeon pages are reached through the genealogy page.
- Hidden Curriculum now lives under Resources at `docs/08-resources/hidden-curriculum/`.

Current stub list is generated in `docs/_STATUS.md`. Run `npm run status` after filling stubs.

---

## History

Keep only the live handoff and durable conventions here. For historical detail:

- `CHANGELOG.md` has the rolling session archive.
- `git log --oneline` has commit-level history.
- `docs/_STATUS.md` has the active stub backlog.

Last compacted: 2026-05-10.
