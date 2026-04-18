# WARWIKI — Claude Session Reference

This file is for Claude to read at the start of every session. It captures the project architecture, conventions, component patterns, and everything needed to continue work seamlessly.

---

## Project Overview

**WARWIKI** is a Docusaurus v3 medical reference wiki for functional urology and genitourinary reconstruction. It is authored and edited by **Nicolas Seranio, MD** (Editor in Chief) and advised by **Humberto Villarreal, MD** (Senior Advisor). The site is deployed at **https://www.warwiki.org**.

- **Tagline:** *Reconstruction, codified.*
- **Homepage:** `WARWIKI` heading is a link to `/docs/foundations`; large "Where should we start?" search pill below opens the Algolia DocSearch modal. No ENTER button.
- **Target audience:** urology residents, fellows, reconstructive surgeons, urogynecologists. Content is written for specialists, not patients.
- **Brand aesthetic:** deep blue (`#185FA5`), clean and academic, inspired by medical journals. NOT a consumer health site.

---

## Repository Structure

```
warwiki/
├── docs/                          # All MDX content
│   ├── 01-foundations/            # → /docs/foundations
│   ├── 02-evaluation/             # → /docs/evaluation
│   ├── 03-clinical-conditions/    # → /docs/clinical-conditions
│   ├── 04-surgical-techniques/    # → /docs/surgical-techniques
│   ├── 05-special-populations/    # → /docs/special-populations
│   ├── 06-journal-club/           # → /docs/journal-club
│   ├── 07-roots/                  # → /docs/roots (history + surgeon profiles) — section label: "History & Lineage"
│   └── 08-resources/              # → /docs/resources (includes hidden-curriculum/ subfolder)
├── src/
│   ├── css/custom.css             # ALL custom styling — single source of truth
│   ├── components/
│   │   ├── SurgeonProfile.tsx     # Surgeon profile page component
│   │   ├── SurgeonDirectory.tsx   # Searchable list of surgeons (accepts `subspecialty` prop)
│   │   ├── SurgeonTree.tsx        # Lineage tree view (accepts `subspecialty` prop)
│   │   ├── SurgeonsExplorer.tsx   # Wraps tree + directory with GURS / URPS subspecialty tabs
│   │   ├── VideoCards.tsx         # Reusable lazy-loading YouTube thumbnail grid
│   │   ├── CurriculumViewer.tsx   # URPS / GURS curriculum viewer (used on Foundations index)
│   │   └── ComingSoon.tsx         # Placeholder for stub pages
│   ├── data/
│   │   ├── surgeons.ts            # All ~80 surgeon records (GURS + URPS) + dynasty data
│   │   └── curriculum.ts          # URPS and GURS curriculum blueprints
│   └── pages/
│       ├── about.mdx              # /about page
│       ├── index.tsx              # Homepage (hero + search + WARWIKI-as-link)
│       └── index.module.css       # Homepage styling (light gradient, gradient title, search pill)
├── static/
│   └── img/
│       ├── favicon.svg            # Solid vector W on brand-blue square (renders consistently in tabs)
│       ├── warwiki-social-card.png / .svg   # OG social card — current aesthetic + 'Reconstruction, codified.'
│       ├── anatomy/               # Gray's, OpenStax, and Blausen plates used in anatomy articles
│       └── team/                  # Team headshots
├── docusaurus.config.ts
├── sidebars.ts
├── vercel.json                    # cleanUrls: true, trailingSlash: false
└── CLAUDE.md                      # ← this file
```

### URL Pattern
Docusaurus strips the **numeric prefix only** from top-level directories:
- `docs/03-clinical-conditions/` → `/docs/clinical-conditions/`
- `docs/04-surgical-techniques/04a-urethral-reconstruction/` → `/docs/surgical-techniques/04a-urethral-reconstruction/`

The alphanumeric prefix (`04a-`, `03b-`, etc.) is **retained** in URLs on subdirectories.

Vercel uses `cleanUrls: true` + `trailingSlash: false` — `/docs/foundations` serves `foundations.html` without redirect.

---

## Article Structure Convention

Every clinical article follows this structure:

```mdx
---
title: Short Title for Sidebar
sidebar_position: N
---

# Full Article Title (Can Be Longer Than Frontmatter Title)

Opening paragraph — 2–4 sentences establishing clinical significance, prevalence framing,
and why this matters to reconstructive urologists. End first sentence with a citation.

---

## Epidemiology
## Etiology / Pathophysiology
## Clinical Presentation / Diagnosis
## Classification / Staging
## Management
## Complications
## Outcomes / Follow-Up
## References

<a id="ref1"></a>1. Last FM, Last FM. "Article Title." *Journal Name.* Year;Vol(Issue):Pages. doi:[10.xxxx/...](https://doi.org/10.xxxx/...)
```

### Anatomy-article pattern ("The X")

Anatomy-and-physiology articles use a different convention that prioritises **reconstructive-surgery framing** over organ-system overview:

- **Title format:** `The Kidneys`, `The Ureters`, `The Bladder`, `The Prostate & Seminal Vesicles`, `The Testicles & Scrotum`, `The Vulva`, `The Vagina`, `The Cervix`, `The Uterus`, `The Adnexa`, `The Perineum`, `The Anal Canal`, `The Presacral Space`, `The Retropubic Space`. Male Urethra and Female Urethra are exceptions (kept paired for sidebar symmetry).
- **Opening paragraph** states *why this organ matters to a reconstructive urologist / urogynecologist*, not its general-medicine importance.
- **Sections** (typical): Gross / Surgical Anatomy → Vascular Supply → Innervation → Physiology (only at reconstructive depth) → Clinical Correlations for the Reconstructive Surgeon → Videos (optional) → References.
- **Cross-links** at top to related organ articles (see also [...]) to keep navigation cohesive.
- **Image convention:** embed one image (usually OpenStax / Blausen / Gray's) near the top before "Surgical Anatomy", with an italicised caption line. See `static/img/anatomy/` for the available set. Caption-only figure blocks (no image) are *not* used — either embed a real image or omit.
- **Videos (if present):** use the `<VideoCards />` component before the References section. See below.

### Citation Style
- **Inline:** `<sup>[[1]](#ref1)</sup>` — renders as a superscript linked number
- Multiple inline: `<sup>[[1]](#ref1)[[2]](#ref2)</sup>`
- **Reference list:** `<a id="refN"></a>N. Author et al. "Title." *Journal.* Year;Vol:Pages. doi:[...](...)`
- References go at the **very end** of the article, after a `---` separator
- Every factual claim should be cited. Aim for **8–16+** references per article
- Use **real, verifiable** citations. Include DOI links where available
- Cite specific guidelines (AUA, EAU, WPATH SOC8, Endocrine Society, ASCRS, AGA-ACG) when applicable

### GAS Articles Citation Style (Footnote Variant)
Gender-affirming surgery articles use footnote-style citations: inline `[^N]`, bottom `[^N]: …`. MDX footnote format — keep consistent within GAS section.

### Callout Boxes (Admonitions)
```mdx
:::info[Title]
Content
:::

:::danger[Title]
Content
:::

:::warning
:::note
```

### MDX Gotchas
- **Angle brackets** in prose MUST be escaped: `&lt;35 kg/m²` not `<35 kg/m²` (MDX 3 parses `<` followed by a letter or digit as the start of a JSX tag — this breaks the build).
- **`&gt;` before numbers or units** in prose is usually safe, but escape if MDX complains.
- **Ampersands** in JSX attributes: use `&amp;` (e.g., `RUG &amp; VCUG`).
- Do NOT use raw HTML tags mid-sentence unless they're valid JSX.
- `<a id="refN"></a>` reference anchors and `<sup>[[N]](#refN)</sup>` links are the established citation pattern and render correctly.
- `$$...$$` LaTeX math is **not** supported — no remark-math / rehype-katex plugin; use plain-text formulas in bold or code spans.

---

## Foundations Landing Page

The Foundations index `docs/01-foundations/index.mdx` now contains:
1. Site-mission opening (WARWIKI framed around the two **reconstructive subspecialties** — URPS and GURS — not "fellowships")
2. Summary of the Foundations subsections using the `<ul className="toc-list">` grid with **`.toc-links` inline text-link style** (not chips — quieter)
3. `<CurriculumViewer />` embedded directly (standalone curriculum page was deleted; no `/docs/foundations/curriculum` page exists)

---

## Section Index Pages (`index.mdx`)

Every section has an `index.mdx` with frontmatter slug, `hide_title: true`, and a `<ul className="toc-list">` grid.

### toc-list Pattern

```mdx
<ul className="toc-list">
  <li>
    <a href="/docs/section/page"><strong>Section Title</strong></a>
    <span className="toc-desc">Short description of what's inside</span>
    <div className="toc-chips">
      <a href="/docs/section/subsection/page1">Label 1</a>
    </div>
  </li>
</ul>
```

**Rules:**
- Section with an `index.mdx` → use `<a>` linked title
- Section without landing page → use `<span className="toc-section">` (grey, non-clickable)
- For multi-page sections, add **either** `<div className="toc-chips">` (button-like pills) **or** `<span className="toc-links">` (minimal inline text links separated by `·`) with anchor children.
  - Use `.toc-chips` when the sub-items are prominent entry points.
  - Use `.toc-links` when the index page is copy-heavy and you want a quieter list (e.g., Foundations index).
- On mobile the grid collapses to single column.

### CSS Classes Reference

| Class | Purpose |
|---|---|
| `.toc-list` | 2-column CSS grid for section index |
| `.toc-desc` | Muted description text below section title |
| `.toc-section` | Non-clickable grey bold title (no landing page) |
| `.toc-chips` | Flex row of pill links to sub-pages |
| `.toc-chips a` | Individual pill — small, bordered, brand-colored |
| `.toc-links` | Middot-separated inline text links (quieter alternative to chips) |
| `.sidebar-hidden-category` | Applied via `_category_.json` `className` to hide an entire sidebar category |

---

## `_category_.json` Convention

Every subdirectory needs a `_category_.json`. For subsections that link to a real first doc:

```json
{
  "label": "Section Label",
  "position": N,
  "link": {
    "type": "doc",
    "id": "section/subsection/first-doc-filename"
  }
}
```

Add `"className": "sidebar-hidden-category"` to hide an entire sidebar category (see: Surgeons directory hidden from sidebar — profiles reached via the Surgeons & Lineage page).

---

## Surgeon Profile System

### `src/data/surgeons.ts`

All surgeon records live here. The `Surgeon` interface now includes **subspecialty**:

```ts
export type Subspecialty = 'GURS' | 'URPS';

export interface Surgeon {
  id: string;
  path: string;            // e.g. 'h-r/jack-mcaninch' — used for lineage links
  name: string;
  subspecialty?: Subspecialty;  // defaults to 'GURS' when absent
  photo?: string;
  country?: string;
  countryFlag?: string;
  born?: string;
  died?: string;
  bioUrl?: string;
  mentorId?: string;
  traineeIds?: string[];
  institution?: string;
  title?: string;
  website?: string;
  youtube?: string;
  twitter?: string;
  instagram?: string;
  keyPubs?: string[];
  instruments?: string[];
}

export interface Dynasty {
  id: string;
  label: string;
  rootId: string;
  color: string;
  subspecialty?: Subspecialty;
}
```

Helpers (preferred access in components):
```ts
getSubspecialty(surgeon)          // returns 'GURS' if absent
surgeonsBySubspecialty(sub)
dynastiesBySubspecialty(sub)
SUBSPECIALTIES                    // label/color/fullName table for UI
```

### Current inventory
- **~58 GURS surgeons** (pre-existing) + **~20 URPS surgeons** (seeded this session) = ~80 records.
- **GURS dynasties:** McAninch, Turner-Warwick, Webster, Santucci, **Devine-Jordan School (EVMS)**.
- **URPS dynasties:** Raz, Nitti, Comiter, Ginsberg (each with confirmed mentor–trainee links: Cohen←Raz, Enemchukwu←Nitti, Burton←Comiter, Rude←Ginsberg).

### Components

- **`SurgeonProfile`** — individual surgeon page layout. Used in every `docs/07-roots/surgeons/{alpha-group}/{name}.mdx` stub.
- **`SurgeonDirectory`** — searchable list. Accepts optional `subspecialty` prop to filter.
- **`SurgeonTree`** — lineage tree by dynasty. Accepts optional `subspecialty` prop; renders an empty-state message if the chosen subspecialty has no dynasties.
- **`SurgeonsExplorer`** — wraps tree + directory with a top-level GURS / URPS tab switcher. Used on the Surgeons & Lineage page.

### The Surgical Genealogy page

`docs/07-roots/surgical-lineage.mdx` (sidebar label: **"Surgical Genealogy"**) hosts `<SurgeonsExplorer defaultSubspecialty="GURS" />`. The auto-generated "Surgeons" sidebar category (58+ names) is **hidden** via `className: "sidebar-hidden-category"` on `docs/07-roots/surgeons/_category_.json` — all profiles are reached through the Directory on this page.

**Critical:** `SurgeonDirectory` and `SurgeonTree` must link using `s.path` (e.g. `h-r/jack-mcaninch`), **not** `s.id` — the alpha-group subfolder is required. Using `s.id` produces 404s.

Surgeon pages live at `docs/07-roots/surgeons/{alpha-group}/{surgeon-name}.mdx` (alpha groups: `a-g/`, `h-r/`, `s-z/`).

---

## VideoCards component

Reusable YouTube thumbnail grid with lazy-loading iframes. Used instead of raw iframe embeds for any article with video.

```mdx
import VideoCards from '@site/src/components/VideoCards';

<VideoCards videos={[
  { id: 'JVOycQzgHN0', title: 'Kidney anatomy', subtitle: 'Gross and vascular overview' },
  { id: '-0XwzgGX0LE', title: 'The nephron' },
]} />
```

- `id` is the YouTube video ID only (the part after `youtu.be/` and before `?si=`).
- Clicks the play button → replaces thumbnail with an autoplaying `youtube-nocookie.com/embed/{id}` iframe in-place.
- Responsive grid collapses to single column on mobile.
- CSS lives under `.vc-*` classes in `custom.css`.
- Place the section with `## Videos` immediately before `## References`.

---

## Anatomy Images

Located in `static/img/anatomy/`. Current set (all public-domain or CC-licensed):

| File | Source | Used in |
|---|---|---|
| `openstax-kidney.jpg` | OpenStax (CC BY 4.0) | The Kidneys |
| `openstax-bladder.jpg` | OpenStax (CC BY 4.0) | The Bladder |
| `openstax-male-perineum.png` / `openstax-female-perineum.png` | OpenStax (CC BY 4.0) | The Perineum |
| `blausen-female-repro.png` | Blausen Medical (CC BY 3.0) | The Vagina |
| `ovary-follicle-stages.jpg` | Wikimedia Commons | The Adnexa |
| `gray1142-urethra.png` | Gray's Anatomy (public domain) | Male Urethra |
| `penis-lateral-cross-section.jpg` | Preexisting | The Penis |
| `gray1143-testis.png` | Gray's Anatomy | The Testicles & Scrotum |
| `gray1160-prostate.png` | Gray's Anatomy | The Prostate & Seminal Vesicles |
| `gray589-female-external.png` | Gray's Anatomy | The Vulva |
| `gray1170-uterus-broad-lig.png` | Gray's Anatomy | The Uterus |

**Embed pattern:** `![Alt](/img/anatomy/file.ext)` followed by an italic caption line underneath.

---

## Search (Algolia DocSearch)

Configured via `themeConfig.algolia` in `docusaurus.config.ts`:
- `appId: GYFUZH5C10`
- `apiKey: cff8e1468c9ff78226494ff86aef7e09` (search-only key — safe to commit)
- `indexName: WARWIKI`
- `contextualSearch: true`

Navbar search box sits **between Library and About** (placed via explicit `{type: 'search', position: 'right'}` navbar entry). Styling overrides `.DocSearch-Button` to match navbar height. Site-verification meta tag (`algolia-site-verification`) is injected via `headTags` in config.

---

## Design Tokens (from `custom.css`)

```css
--ifm-color-primary:         #185FA5;   /* Deep Blue — brand color */
--ifm-color-primary-light:   #1B6CBD;
--ifm-color-primary-lightest:#3691E2;
--warwiki-bg:                #F7F9FC;
--warwiki-bg-subtle:         #EEF2F8;
--warwiki-border:            #DDE3ED;
--warwiki-border-strong:     #C2CBD9;
--warwiki-text:              #111827;
--warwiki-text-muted:        #4B5767;
--warwiki-text-subtle:       #8494A8;
```

Dark mode overrides use `[data-theme='dark']` selectors. Always add dark mode variants for new CSS that uses light-only values.

---

## Navigation (docusaurus.config.ts)

Navbar order:
1. Foundations, Evaluation, Clinical Conditions, Treatment Atlas, Special Populations (left, docSidebar types)
2. Library dropdown → **Journal Club**, **Resources**, **History & Lineage** (in that order)
3. **Search** (Algolia DocSearch)
4. About → `/about`
5. GitHub icon (SVG mark, no text) → `className: 'header-github-link'`

Hidden Curriculum is **no longer a top-level dropdown item** — it lives as a subfolder under Resources (`08-resources/hidden-curriculum/`, served by `resourcesSidebar`). The `hiddenCurriculumSidebar` in `sidebars.ts` was removed.

The GitHub icon is pure CSS using a `::before` pseudo-element with an SVG `data:` URI.

---

## Homepage (`src/pages/index.tsx`)

- `WARWIKI` heading is a `<Link to="/docs/foundations">` rendered in a blue gradient.
- Tagline: *Reconstruction, codified.*
- Below tagline: large search pill that triggers the navbar DocSearch button on click. Placeholder text: *Where should we start?*
- Background: soft white → light-blue gradient with subtle radial blue / violet accents.
- No ENTER button.
- Styling in `index.module.css` using `.heroBanner`, `.heroInner`, `.heroTitle`, `.heroTitleLink`, `.heroSearch`, etc.

---

## About Page (`src/pages/about.mdx`)

Team section uses CSS module classes from `about.module.css`:
- `.teamCard` — flex row, border-left accent
- `.teamPhoto` — 160px circle, `object-fit: cover`
- `.teamPhotoNick` — override: `object-position: center 22%`

Team members:
1. **Nicolas Seranio, MD** — Editor in Chief (`nick-seranio.jpg`)
2. **Humberto Villarreal, MD** — Senior Advisor (`humberto-villarreal.jpg`)

The "contact" link in About uses a mailto obfuscation — link text says "WARWIKI" but resolves to `nseranio@gmail.com`.

The Turner-Warwick reference links to his surgeon profile at `/docs/roots/surgeons/s-z/richard-turner-warwick`.

---

## Content Standards

### Article voice — frame for the reconstructive urologist / urogynecologist

**Any article on a general-medicine topic must be reframed around surgical / operative relevance.** Compress nephrology-, internist-, or colorectal-level detail to the depth a GU reconstructionist actually needs. This is a hard rule — see the memory file `feedback_article_voice.md` and the established anatomy articles for the pattern.

Examples of what to keep vs cut:
- Kidney article: **keep** fascial compartments, vascular pedicle, warm-ischemia targets, hyperfiltration; **cut** detailed tubular-transporter tables and ammoniagenesis biochemistry.
- Bowel article: **keep** SMA/IMA branches relevant to urinary diversion, terminal-ileum B12/bile-salt absorption, detubularization biomechanics; **cut** mucosal-immunity, IBD pathophysiology, microbiome composition detail.
- Cervix article: **keep** ureter anatomy, cardinal/uterosacral ligaments for Level-I apical support, nerve-sparing radical hysterectomy; **cut** mucin biochemistry, HPV molecular biology, pregnancy ripening biomechanics beyond the principle.

### Reference quality
- Only cite **real, published papers**. Do not fabricate citations.
- Prefer: AUA / EAU guidelines, WPATH SOC8, ACOG / ASCRS / AGA-ACG guidelines, landmark RCTs, systematic reviews, high-volume case series.
- Journal abbreviations: *J Urol*, *Eur Urol*, *Urology*, *BJU Int*, *J Sex Med*, *Nat Rev Urol*, *JAMA Surg*, *Ann Surg*, *N Engl J Med*.
- Always include first author + "et al." for 4+ authors, journal, year, volume, issue, pages, DOI.

### Clinical accuracy
- Content written for **specialists**, not patients — correct anatomical and clinical terminology.
- Be specific: percentages, complication rates, success rates with citations.
- Mention when data is limited or evidence quality is low.
- Distinguish guideline recommendations from expert consensus.

### Tone
- Formal academic prose, active voice where possible.
- No hedging ("it is important to note", "it should be mentioned").
- No consumer health disclaimers.
- Tables preferred over prose lists for comparative data.

### Site scope — what belongs on WARWIKI

**In-scope:** reconstructive urology (GURS), urogynecology & reconstructive pelvic surgery (URPS), and functional urology — urethroplasty, ureteral reconstruction, reimplant, pyeloplasty, bladder augmentation, Mitrofanoff, VVF / UVF / RUF / USF repair, incontinence surgery, AUS / IPP, Peyronie's, ED surgery, phalloplasty / vaginoplasty / GAS, hypospadias, prolapse surgery, perineal reconstruction after trauma / Fournier's / radiation, neurogenic bladder, functional voiding disorders.

**Out-of-scope (do not use as primary examples or applications):** endourology (PCNL, ureteroscopy for stones) and urologic oncology (radical cystectomy for cancer, radical nephrectomy for cancer, radical prostatectomy for cancer).

**Gray zone — acceptable only as the reconstructive consequence:** post-radiation reconstruction, urinary diversion framed as reconstructive (not cancer staging), reconstruction after extirpative oncology, urethral stricture after prostatectomy or radiation, RUFs after prostate cancer treatment.

When framing a new article, ask: is the reader here to learn reconstructive / functional / urogynecologic practice? If the article's principal value is teaching cancer surgery or stone management, **it does not belong on WARWIKI**. See `feedback_site_scope.md` for the full rule.

---

## Deployment

- Builds with `npm run build`; deploys via **Vercel** from `main`.
- Dev server: `npm start` (Docusaurus dev server; `.claude/launch.json` configured to run this on port 3001 for preview tooling).
- `vercel.json` sets `cleanUrls: true` + `trailingSlash: false` so `/docs/foundations` → `foundations.html` without redirect.

**Common build errors:**
- MDX JSX parse errors from unescaped `<` in prose → use `&lt;` / `&gt;`. *Any* `<` followed by a letter or digit in a table cell, paragraph, or admonition will break the build.
- Missing `_category_.json` `link` entries → 404 flash on sidebar click.
- Broken TOC hrefs pointing to directory URLs without `index.mdx` → 404 flash.

---

## Section Inventory

| Section | Path | Notes |
|---|---|---|
| Foundations | `01-foundations/` | Landing page has toc-list + **embedded `<CurriculumViewer />`**; standalone `/curriculum` was deleted |
| Evaluation | `02-evaluation/` | physical-exam and imaging have index.mdx; **history-symptom-assessment was deleted**; Imaging now sits above Ancillary Testing in sidebar + index |
| Clinical Conditions | `03-clinical-conditions/` | 8 subsections (03a–03h); all have `_category_.json` with `link.type: doc` |
| Treatment Atlas | `04-surgical-techniques/` | 10 subsections; 04c (urinary diversion) has no index.mdx |
| Special Populations | `05-special-populations/` | 4 subsections (05a, 05c, 05d, 05e); 05b (oncologic) was DELETED |
| Journal Club | `06-journal-club/` | journal-database.mdx, guidelines-white-papers.mdx |
| History & Lineage | `07-roots/` | Renamed from "Roots of Reconstruction". **Surgical Genealogy** page uses `<SurgeonsExplorer />` with GURS/URPS tabs; surgeons/ category hidden from sidebar |
| Resources | `08-resources/` | Textbooks, podcasts, websites, videos, patient resources + **Hidden Curriculum subfolder** |

### Foundations — anatomy-physiology status

All articles in `docs/01-foundations/anatomy-physiology/` have been populated (no remaining stubs):

- **Urinary tract:** The Kidneys, The Ureters, The Bladder, Male Urethra, Female Urethra
- **Genitalia:** The Penis, The Prostate & Seminal Vesicles, The Testicles & Scrotum, The Vulva, The Vagina, The Cervix, The Uterus, The Adnexa
- **Pelvis & Support:** Bony Pelvic Anatomy, Retropubic (The Retropubic Space), Abdominal Wall, Pelvic Vascular Anatomy, Pelvic Neuroanatomy, Bowel Anatomy, GU Embryology, Perineum, Anal Anatomy (The Anal Canal), Presacral Anatomy (The Presacral Space)
- **Lower Extremity:** The Leg & Thigh (gracilis anatomy + PTNS ankle anatomy — NEW)
- **Oral Cavity:** The Oral Cavity (buccal / lingual / labial mucosa for urethroplasty — NEW)

### Foundations — Surgical Principles status

Populated: wound-healing, reconstructive-ladder, plastic-surgery-principles, principles-gu-reconstruction, radiation-tissue-effects, flaps-gu-reconstruction, grafts-gu-reconstruction, **incisions-closure**, **bowel-anastomosis**, **sutures**, **needles**, **surgical-ergonomics**.

**Flap subdirectory** — `flaps/` hosts 11 stub pages (hidden category) reachable only via links from the main Flaps article:
- **Fully built out:** gracilis, vram, peritoneal, vastus-lateralis, omental
- **Stubs ready for expansion:** penile-preputial, radial-forearm, anterolateral-thigh, scip, blandy, martius

**Graft subdirectory** — `grafts/` hosts 10 stub pages (hidden category) reachable only via links from the main Grafts article:
- **buccal-mucosa** ← **fully built out** (biological properties, harvest technique, GU applications, named placement techniques table, donor site morbidity, outcomes, comparison with alternatives — 22 citations)
- lingual-mucosa, labial-mucosa, intestinal-segments, penile-preputial-skin, saphenous-vein, posterior-auricular, stsg, ftsg, bladder-mucosa (stubs)

### Foundations — Perioperative Care restructured (Temporal + Protocols framework)

Old folders `preoperative/`, `anesthesia-pain/`, `postoperative/` were reorganized into:

```
perioperative-care/
├── preoperative-assessment/    # risk-calculators, cardiovascular-risk, frailty, diabetes, steroids, immunosuppression
├── intraoperative-care/        # anesthesia (new), analgesia, nerve-blocks, nausea-vomiting, positioning-nerve-injury
├── postoperative-management/   # constipation, electrolyte-abnormalities, nutrition (renamed from tpn-ppn), pulmonary-embolism
└── perioperative-protocols/    # eras, antithrombotic-therapy (crosscutting protocols)
```

All 16 articles are populated. URL paths changed from the old flat structure — internal cross-links were updated; external inbound links to `/docs/foundations/perioperative-care/{preoperative,anesthesia-pain,postoperative}/*` will 404.

### Foundations — Tools / Robotics subsection (NEW)

`docs/01-foundations/tools/robotics/` — three-article subsection:
- **platforms.mdx** — da Vinci (Si/Xi/X/SP/5), Hugo RAS, Versius, Senhance, Avatera, Hinotori, REVO-I, KangDuo, MicroHand S, Toumai, Dexter — manufacturer profiles + feature axes
- **reconstructive-applications.mdx** — by anatomic region (upper tract, bladder, urethra, andrologic microsurgery)
- **single-port.mdx** — SP incision atlas (periumbilical, mini-Pfannenstiel, midline suprapubic, LAA, SARA) + approaches (transvesical, LAA, SARA, transperitoneal, retroperitoneal, extraperitoneal)

### Hidden Curriculum (now under Resources)

`docs/08-resources/hidden-curriculum/` — operational-literacy layer for the reconstructive urologist. **No longer a top-level navbar item** — accessible via Library → Resources → Hidden Curriculum. Served by `resourcesSidebar`. URLs changed from `/docs/hidden-curriculum/*` → `/docs/resources/hidden-curriculum/*`.

- **index.mdx** — section landing (slug: `/resources/hidden-curriculum`)
- **overview.mdx** — "Clinical Operator Mindset"
- **healthcare-finance.mdx** — revenue cycle, RVU decomposition, payment models
- **billing-coding.mdx** — CPT/ICD-10/modifier reference for GU reconstruction

---

## Key Files to Know

| File | Purpose |
|---|---|
| `src/css/custom.css` | All styles (VideoCards, SurgeonsExplorer, toc-links, video-embed, sidebar-hidden-category) |
| `src/data/surgeons.ts` | ~80 surgeons with `subspecialty` field + `SUBSPECIALTIES` / helper exports |
| `src/components/SurgeonsExplorer.tsx` | GURS/URPS tab wrapper around tree + directory |
| `src/components/VideoCards.tsx` | Thumbnail-grid YouTube embed |
| `src/pages/index.tsx` / `index.module.css` | Homepage hero + search + linked WARWIKI title |
| `docusaurus.config.ts` | Site config, navbar, Algolia block, tagline, `headTags` |
| `vercel.json` | `cleanUrls: true` + `trailingSlash: false` |
| `docs/01-foundations/index.mdx` | toc-list + `.toc-links` pattern + `<CurriculumViewer />` |
| `docs/07-roots/surgical-lineage.mdx` | `<SurgeonsExplorer />` host — page title/sidebar label: **"Surgical Genealogy"** |
| `docs/07-roots/surgeons/_category_.json` | Has `className: sidebar-hidden-category` |

---

## Recent History

- **Anatomy-and-physiology articles fully rewritten** for the GU-reconstructionist voice (all 22 articles in `docs/01-foundations/anatomy-physiology/`). The "The X" title convention was established during this pass. Article-voice memory (`feedback_article_voice.md`) captures the rule.
- **New components:** `SurgeonsExplorer` (GURS/URPS tabs), `VideoCards` (lazy YouTube thumbnail grid).
- **Surgeon data model extended** with `subspecialty` field + helpers; URPS surgeons seeded (~20) with 4 URPS dynasties (Raz, Nitti, Comiter, Ginsberg) and four confirmed mentor→trainee links.
- **Sidebar "Surgeons" auto-category hidden** — profiles now only reachable via the Directory on Surgeons & Lineage.
- **Algolia DocSearch** integrated; search box between Library and About; site-verification meta tag injected.
- **Homepage redesigned** — light gradient hero, WARWIKI-as-link, large search pill, no ENTER button. Tagline changed to *Reconstruction, codified.* Footer simplified to `© YEAR WARWIKI`.
- **Vercel fix** — `cleanUrls: true` / `trailingSlash: false` added; previously caused 404s on all extensionless URLs.
- **Favicon** replaced with solid vector W so it renders consistently without web-font access.
- **Social card** regenerated to match new aesthetic + new tagline.
- **Foundations page** — standalone curriculum page deleted; `<CurriculumViewer />` now embedded in the Foundations index page.
- **Evaluation section** — `history-symptom-assessment.mdx` deleted; Imaging and Ancillary Testing sidebar positions swapped (Imaging now above Ancillary).
- **Image set** — public-domain / CC-licensed anatomy images downloaded into `static/img/anatomy/` and embedded in the anatomy articles. No caption-only figure blocks — either real image or nothing.

### Session of 2026-04-17

- **Surgeon profile links fixed** — `SurgeonDirectory` and `SurgeonTree` were using `s.id` instead of `s.path`, causing 404s on all profile links. Fixed to use `s.path` (includes alpha-group subfolder).
- **Library dropdown reordered** — Journal Club → Resources → History & Lineage.
- **"Roots of Reconstruction" renamed to "History & Lineage"** — `_category_.json`, `index.mdx` title, and navbar label all updated.
- **"Surgical Lineage" renamed to "Surgical Genealogy"** — `surgical-lineage.mdx` title and sidebar label updated.
- **Hidden Curriculum moved into Resources** — `09-hidden-curriculum/` deleted; files moved to `08-resources/hidden-curriculum/`; `hiddenCurriculumSidebar` removed from `sidebars.ts`; all internal links updated; Resources index updated.
- **Surgeon biographies recovered** — McAninch, Jordan, Devine, Zinman bios (commit `579eb75`) were on an unmerged worktree branch; cherry-picked onto main.
- **Buccal Mucosa Graft article fully built out** — 22 citations; biological properties, harvest technique, donor site management (closure vs nonclosure RCT), GU applications, named placement techniques table (Barbagli/Asopa/Kulkarni/Palminteri), morbidity tables, outcomes by stricture type and lichen sclerosus, comparative data vs lingual mucosa and penile skin grafts.
- **`bypassPermissions` set globally** — `~/.claude/settings.json` updated; takes effect on next session start.

### Session of 2026-04-16 — Foundations expansion wave

- **New top-level section 09 Hidden Curriculum** — see section above. Billing & Coding moved from Resources.
- **Perioperative Care restructured** into Temporal + Protocols framework (preoperative-assessment / intraoperative-care / postoperative-management / perioperative-protocols). All 16 articles populated.
- **Surgical Principles fully built out** — incisions-closure, bowel-anastomosis, sutures, needles added; flap and graft subdirectories created with individual clickable pages.
- **Robotics subsection** added under Tools — 3 articles (platforms, reconstructive-applications, single-port).
- **Anatomy subsections added** — Lower Extremity (leg-thigh) and Oral Cavity.
- **Broken links fixed** — 3 pre-existing broken links (to deleted 05b-oncologic-radiation section, to nonexistent /docs/foundations/biomaterials) repointed to valid targets.
- **Navbar updated** — Hidden Curriculum added to Library dropdown; Docusaurus build clean.

---

## Image Wishlist — High-Value Additions

Today's additions were text-only. The following new pages would benefit from images when appropriate public-domain / CC assets are available. Listed by priority:

### Highest priority — directly improves comprehension

1. **`flaps/gracilis.mdx`** — diagram of the gracilis muscle + medial circumflex femoral artery pedicle anatomy. Gray's Anatomy plate exists for the adductor compartment.
2. **`flaps/vram.mdx`** — diagram of rectus abdominis + DIEA pedicle + arcuate line. Gray's or open-source anatomy illustration.
3. **`flaps/omental.mdx`** — diagram of the gastroepiploic arcade (right and left) along the greater curvature.
4. **`flaps/vastus-lateralis.mdx`** — diagram of LCFA descending branch and perforator distribution.
5. **`anatomy-physiology/lower-extremity/leg-thigh.mdx`** — anatomy article has zero images; should match the image-per-article convention of the other anatomy articles. Gray's plates for gracilis and medial ankle cross-section (for PTNS anatomy) are public domain.
6. **`anatomy-physiology/oral-cavity/oral-cavity.mdx`** — anatomy article has zero images; Gray's plate of buccal mucosa and oral cavity cross-section.
7. **`surgical-principles/incisions-closure.mdx`** — diagram showing the incision atlas (midline, Pfannenstiel, Gibson, flank, Chevron, Makuuchi, thoracoabdominal, dorsal lumbotomy, perineal) as anatomic overlays.

### Medium priority — supporting visualization

8. **`surgical-principles/bowel-anastomosis.mdx`** — diagrams of end-to-end, end-to-side, and functional end-to-end (GIA-stapled) configurations; ICG fluorescence example.
9. **`surgical-principles/sutures.mdx`** — table already scaffolds comparisons; a suture-size / needle-type diagram would help.
10. **`surgical-principles/needles.mdx`** — cross-section diagrams of cutting vs reverse-cutting vs taper vs blunt-taper vs taper-cut tips.
11. **`tools/robotics/single-port.mdx`** — incision-site map on an abdominal/pelvic silhouette.
12. **`tools/robotics/platforms.mdx`** — the platforms table could be enhanced with logos/photos if CC-licensed (Intuitive / Medtronic / CMR / Asensus press images may be available).

### Lower priority — could benefit but text is sufficient

- Perioperative Care articles (ERAS, antithrombotic, cardiovascular risk, diabetes, frailty) — the tables convey most of the value; flow diagrams of decision trees (e.g., 2024 AHA/ACC stepwise, ERAS pathway, RCRI) would be elegant if appropriate Creative Commons versions exist.
- Hidden Curriculum articles — healthcare-finance might benefit from a revenue-cycle schematic.

### Source-finding conventions (from earlier sessions)

- **Gray's Anatomy** plates are public domain; Wikimedia Commons hosts them with the `Gray####` convention.
- **OpenStax Anatomy & Physiology** plates are CC BY 4.0 and suitable for direct use.
- **Blausen Medical** plates are CC BY 3.0; limited number available on Wikimedia.
- Use `curl -sL "https://commons.wikimedia.org/wiki/Special:FilePath/FILENAME.png"` to download Wikimedia Commons files reliably (direct URLs sometimes serve error HTML instead).
- Store in `static/img/anatomy/` and reference as `/img/anatomy/filename.ext` with an italicized caption underneath.
- **Never** create caption-only figure blocks — either embed a real image or omit the figure.

---

## Maintenance Caveats — 2026-04-16

- **Broken links fixed:** `radiation-tissue-effects.mdx` (now points to `clinical-conditions/03d-bladder-disorders/radiation-cystitis` and the `03b`/`03e` stricture articles instead of deleted `05b-oncologic-radiation`). `reconstructive-ladder.mdx` (now points to `tools/biomaterials` instead of `/docs/foundations/biomaterials`). **Build is 100% broken-link-free.**
- **URL change log** for external-link auditing:
  - `/docs/hidden-curriculum` → `/docs/resources/hidden-curriculum`
  - `/docs/hidden-curriculum/overview` → `/docs/resources/hidden-curriculum/overview`
  - `/docs/hidden-curriculum/healthcare-finance` → `/docs/resources/hidden-curriculum/healthcare-finance`
  - `/docs/hidden-curriculum/billing-coding` → `/docs/resources/hidden-curriculum/billing-coding`
  - `/docs/resources/billing-coding` → `/docs/resources/hidden-curriculum/billing-coding`
  - `/docs/foundations/perioperative-care/preoperative/*` → `/docs/foundations/perioperative-care/preoperative-assessment/*`
  - `/docs/foundations/perioperative-care/anesthesia-pain/*` → `/docs/foundations/perioperative-care/intraoperative-care/*`
  - `/docs/foundations/perioperative-care/postoperative/positioning-nerve-injury` → `/docs/foundations/perioperative-care/intraoperative-care/positioning-nerve-injury`
  - `/docs/foundations/perioperative-care/postoperative/{constipation,electrolyte-abnormalities,pulmonary-embolism,tpn-ppn}` → `/docs/foundations/perioperative-care/postoperative-management/{constipation,electrolyte-abnormalities,pulmonary-embolism,nutrition}`
  - `/docs/foundations/perioperative-care/postoperative/{eras,antithrombotic-therapy}` → `/docs/foundations/perioperative-care/perioperative-protocols/{eras,antithrombotic-therapy}`
  - `/docs/foundations/perioperative-care/postoperative/tpn-ppn` → `/docs/foundations/perioperative-care/postoperative-management/nutrition`
- **Docusaurus URL-collapse quirk** — when a file is named the same as its parent directory (e.g., `oral-cavity/oral-cavity.mdx`), Docusaurus collapses the URL to `/docs/foundations/anatomy-physiology/oral-cavity` (not `.../oral-cavity/oral-cavity`). Use the collapsed path in cross-links.
- **Hidden-category pattern** — `{"className": "sidebar-hidden-category"}` in `_category_.json` hides a subdirectory from the sidebar while keeping its pages linkable. Used for: `surgeons/`, `flaps/`, `grafts/`. The category `position: 99` with hidden className is the standard idiom.

---

*Last updated: 2026-04-17*
