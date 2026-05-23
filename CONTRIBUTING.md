# Contributing to WARWIKI

This is a Docusaurus v3 medical reference wiki for functional urology and
genitourinary reconstruction. Audience: urology residents, fellows,
reconstructive surgeons, and urogynecologists. Read `CLAUDE.md` for the
working session handbook — this file documents the conventions that
matter when adding or reviewing content.

---

## Scope

In scope:

- Urethral, ureteral, bladder, and pelvic reconstruction
- Urinary diversion framed reconstructively
- Fistula repair, incontinence surgery, AUS/IPP
- Peyronie's, ED surgery, gender-affirming surgery
- Hypospadias, prolapse, perineal reconstruction
- Neurogenic bladder, voiding dysfunction, functional pelvic disorders

Out of scope as primary topics:

- Endourology for stones (PCNL, ureteroscopy for stones)
- Primary urologic oncology (radical cystectomy / nephrectomy /
  prostatectomy as cancer operations)

Gray zone (acceptable as reconstructive consequence only):

- Radiation injury, post-prostatectomy stricture, post-cystectomy
  diversion complications, RUF after prostate cancer treatment.

`npm run lint:scope` enforces these boundaries on top-level paths.

---

## Voice

- Formal academic prose, active voice.
- Written for reconstructive surgeons and urogynecologists, **not**
  patients or general medicine readers.
- No consumer-health disclaimers.
- Be specific with complication rates, success rates, follow-up
  intervals, and evidence quality.
- Prefer tables for comparison and operative decision logic.

---

## Article frontmatter

Required:

```yaml
---
title: Short Sidebar Title
sidebar_position: N
---
```

Optional but encouraged on every clinical article:

```yaml
lastReviewed: 2026-05-22    # YYYY-MM-DD of last evidence-and-claims review
reviewer: NS                # initials of the most recent reviewer
key_point: >                # one-sentence "core fact" surfaced in quiz mode
  Ileal conduit remains the most common urinary diversion, performed in
  >80% of post-cystectomy cases, with the shortest operative time and
  fewest perioperative complications of all diversion types.
subspecialty: GURS          # GURS | URPS | combined  (drives quiz routing)
---
```

The `lastReviewed` field is consumed by `scripts/check-freshness.js`,
which surfaces articles unreviewed for >18 months (warn) or >30 months
(stale) and is part of the CI advisory output.

The `key_point` + `subspecialty` fields feed the quiz at `/quiz`. A page
without `key_point` is silently excluded from quiz pools.

---

## Citation pattern

Inline citations use anchored superscript:

```mdx
The Vaglio 2011 RCT favored prednisone over tamoxifen.<sup>[[3]](#ref3)</sup>
```

Reference list at the bottom (after a `---` separator):

```mdx
<a id="ref3"></a>3. Vaglio A, Salvarani C, Buzio C. Retroperitoneal fibrosis.
*Lancet.* 2006;367(9506):241-251. doi:[10.1016/...](https://doi.org/10.1016/...)
```

Multiple in-line: `<sup>[[1]](#ref1)[[2]](#ref2)</sup>`.

GAS pages use footnote-style citations: `[^1]` inline, `[^1]: ...` at
bottom. Do not mix the two patterns within a page.

**Do not fabricate citations.** Use real published references with DOIs
when available. Spot-check a citation if a draft is chatbot-assisted.

### Stable reference IDs (parallel)

`scripts/migrate-stable-ref-ids.js` can add a parallel content-derived
anchor next to every numbered anchor:

```mdx
<a id="ref3"></a><a id="ref-vaglio-2006-lancet"></a>3. Vaglio A, ...
```

This insulates inbound tooltip and search links from future
renumbering. Run dry-first, write per-subdirectory.

---

## Before committing

```bash
npm run lint        # scope + citations + orphans + links + density
npm run typecheck   # if articles, components, or routes changed
npm run build       # if MDX with raw HTML, JSX, or routes changed
git diff --check
```

`npm run lint:freshness` is advisory only and does not block.

CI (`.github/workflows/ci.yml`) runs lint + typecheck + build on every
PR and main push. CI failures should be fixed, not bypassed.

---

## Authoring patterns

### Cross-link instead of duplicating

When a nearby hub already owns anatomy, pharmacology, physiology, or
workflow detail, link to it and keep the new page narrow. The
[bowel pages](docs/01-foundations/surgical-principles/bowel-anastomosis.mdx)
are the canonical worked example: handling / harvest / anastomosis /
segments are separate pages with bidirectional cross-links.

### Consolidation rule

Consolidate into one page only when 2–5 variants share ≥80% of their
content. Peer instruments with genuinely distinct roles stay separate.
Worked examples: Maryland / Fenestrated / Force bipolar trio (separate);
Large + Mega + SutureCut needle drivers (consolidated with anchors).

### Split medical-content from surgical-content

When a clinical condition has a substantial dedicated reconstructive
technique, split the medical content (condition page) from the
operative content (technique page) and cross-link. Worked examples:
RPF ↔ ureterolysis, urethral stricture ↔ urethroplasty family.

### Treatment-atlas pattern

1. Section landing page is itself the searchable database
   (`<GenericDatabase />`).
2. A short "General Principles" block appears above the database when
   useful.
3. Named technique pages are linked from database rows.
4. Redundant overview pages are hidden from the sidebar.

### Hidden pages

Hidden pages must remain reachable from a visible hub or database row.
`npm run lint:orphans` enforces this. `GenericDatabase` slug rows count
as inbound links.

---

## Tests

```bash
npm test                # Vitest — component smoke tests
npm run test:e2e        # Playwright — every page returns 200
```

When adding a new stateful React component (filters, toggles, charts),
add a smoke test next to it (`Component.test.tsx`). For pure
content-only MDX changes, no test is required.

---

## Authorship and review

Maintainer: Nicolas Seranio (NS).

When opening a PR:

1. Self-review the rendered page locally (`npm start`).
2. Run `npm run lint && npm run typecheck && npm run build`.
3. If the change is a new clinical article, set `lastReviewed` to today
   and `reviewer` to your initials.
4. CI must pass before merge.

---

## Resilience

The repo is the canonical store. Suggested off-GitHub backups:

- Quarterly `git bundle create warwiki-YYYYMMDD.bundle --all` to
  cloud storage.
- A mirror push to a second remote (gitlab, codeberg, self-hosted) on
  the same cadence as the main push.

This is a single-author project; provenance fields (`reviewer`,
`lastReviewed`) and CI exist to make future co-maintainership tractable.
