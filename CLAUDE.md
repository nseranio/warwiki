# WARWIKI - Claude Session Reference

Read this at the start of a session. Keep it small: this file is the working handbook, not the project archive. Put substantive history in `CHANGELOG.md`; use `docs/_STATUS.md` for the stub backlog.

---

## Current Handoff - 2026-05-08

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

Previous prolapse-atlas, GAS phalloplasty, and older session history are archived in `CHANGELOG.md`; keep this file as the compact working handbook.

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

Last compacted: 2026-05-07.
