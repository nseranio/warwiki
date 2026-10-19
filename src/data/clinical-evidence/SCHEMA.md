# Evidence data model

WARWIKI's Clinical Evidence section (trial pages, library, timelines and comparison tables) reads from this folder; ported from WHITWIKI on October 18, 2026. Numbers live here once; page prose interprets them and does not retype them. `npm run lint:trials` validates every file.

```
src/data/clinical-evidence/
  trials/<id>.json     one file per trial family (all of its reports)
  decisions.json       clinical decision points that trials answer
  events.json          dated guideline versions and regulatory actions
  types.ts             TypeScript types for all three
```

## Trial family (`trials/<id>.json`)

One file per trial, not per publication. `id` is the URL slug of its page.

| Field | Type | Notes |
|---|---|---|
| `id` | string | kebab-case; equals the page slug |
| `name` | string | display name, e.g. `ROSETTA` |
| `aliases` | string[] | other names and numbers (`KEYNOTE-A39`, `Alliance A031501`, `D933RC00001`) |
| `nct` | string or null | registry ID; `registry` free text when not NCT |
| `area` | string[] | `female-sui`, `oab`, `prolapse`, `male-sui`, `bph`, `stricture`, `sexual-medicine`, `fistula`, `bowel`, `infection`, `diversion`, `perioperative` (timeline groups in `timeline-groups.json`) |
| `decisions` | `{id, lane}`[] | decision point and lane on its timeline (see `decisions.json`) |
| `question` | string | one sentence, the clinical question |
| `design` | object | `phase`, `randomized` (bool), `blinding`, `type` (`superiority`, `noninferiority`, `single-arm`, `cohort`, `diagnostic`), `n` (randomized or enrolled), `arms[]` (`{key, label, n, role: experimental|control|single}`) |
| `verdict` | enum | `positive`, `negative`, `mixed`, `noninferior`, `inconclusive`, `descriptive`; judged on the primary endpoint(s) of the primary report |
| `verdictNote` | string | under 20 words, the one fact that qualifies the verdict (e.g. `EFS and OS improved; formal pCR missed its allocated alpha`) |
| `takeaway` | string | at most 45 words: what was compared, with the agents named, and what the primary report showed; shown first on the trial page (Bottom line box) and on decision timelines; gated as a claim against the primary report |
| `reports` | Report[] | ordered by date; exactly one has `kind: "primary"` |
| `relations` | Relation[] | typed links to other trials (below) |
| `page` | string or null | `/docs/clinical-evidence/studies/<id>`; null for a trial on the timeline without a page yet |
| `status` | object | `sourceRead` (`full-text`, `abstract`, `none`), `claimsChecked` (ISO date or null), `clinicalReview` (`{by, date}` or null). Never rendered as prose. |

### Report

| Field | Type | Notes |
|---|---|---|
| `id` | string | `<trial>-<year>[-suffix]` |
| `kind` | enum | `primary`, `updated` (later cutoff of the same endpoints), `final-os`, `pro`, `biomarker`, `secondary`, `post-hoc`, `correction`, `abstract` (meeting presentation) |
| `label` | string | short label for history tables, e.g. `5-year update` |
| `published` | ISO date | online publication date (timeline position) |
| `cutoff` | ISO date or null | data cutoff |
| `citation` | string | WARWIKI reference style: `Last FM, et al. Title. *Journal.* Year;Vol(Issue):Pages.` |
| `doi`, `pmid` | string or null | at least one, or `noDoi` with a reason |
| `followUp` | string | e.g. `median 42.3 mo (EFS, censored patients)` |
| `results` | Result[] | headline endpoints only; not every subgroup |
| `harms` | Harm[] | |
| `delivery` | Fact[] | surgery and treatment delivery facts (RC rate, timing, completion) |
| `source` | `{file, checked}` | private source path (never published) and date checked |

### Result

```json
{
  "endpoint": "EFS",
  "role": "primary",
  "measure": "24-month EFS",
  "values": {"exp": "67.8%", "ctl": "59.8%"},
  "effect": {"type": "HR", "value": 0.68, "ci": [0.56, 0.82], "p": "<0.001"},
  "met": true,
  "note": "",
  "locator": "PDF p7"
}
```

`role`: `primary`, `key-secondary`, `secondary`, `exploratory`, `descriptive`. `met` is required for primary and key-secondary endpoints (true, false, or `"not-tested"` when hierarchy stopped). `values` keys match `design.arms[].key`. `effect.type`: `HR`, `RR`, `OR`, `difference`, `none`. `locator` is required for every number.

### Harm and Fact

`{label, values: {exp, ctl}, locator, note}`; a Fact may use `value` instead of `values`.

### Relation

Directed, from this trial to `target` (a trial id; the target need not have a page). The renderer derives the inverse wording.

| `type` | Meaning | Inverse shown on the target |
|---|---|---|
| `builds-on` | used the target's result as its control arm or rationale | `Built on by` |
| `confirms` | same question, concordant result | `Confirmed by` |
| `conflicts` | same question, discordant result | `Conflicts with` |
| `supersedes` | displaced the standard the target established | `Superseded by` |
| `parallel` | same program or design, different population | `Parallel to` |
| `extends` | later trial testing the next step (escalation, de-escalation, omission) | `Extended by` |

Each relation carries a `note` of under 25 words that states the actual connection (`Same adjuvant question; nivolumab improved DFS where atezolizumab did not`). Trials sharing a decision lane are shown as contemporaries automatically, so do not add `parallel` for that alone.

## Decision points (`decisions.json`)

```json
{
  "id": "oab-third-line",
  "area": "oab",
  "title": "Botulinum toxin and neuromodulation for refractory OAB",
  "question": "Which third-line therapy should treat refractory overactive bladder or neurogenic detrusor overactivity?",
  "page": "/docs/clinical-conditions/03a-storage-incontinence/urgency-incontinence-oab",
  "lanes": [
    {"id": "botulinum-idiopathic", "label": "Botulinum toxin, idiopathic OAB"},
    {"id": "sacral-neuromodulation", "label": "Sacral neuromodulation"}
  ],
  "compare": ["Urgency incontinence episodes", "Treatment success"]
}
```

`compare` lists the endpoints the comparison table shows, in order.

## Events (`events.json`)

```json
{
  "id": "fda-2013-01-18-onabotulinumtoxina-oab",
  "date": "2013-01-18",
  "kind": "regulatory",
  "body": "FDA",
  "title": "OnabotulinumtoxinA approved for overactive bladder",
  "decisions": ["oab-third-line"],
  "trials": ["nitti-oab"],
  "url": "https://www.fda.gov/...",
  "checked": "2026-10-18"
}
```

`kind`: `regulatory` (FDA, EMA), `guideline` (add `version` and `statement`, the recommendation as published with its strength), `practice` (other dated practice-changing event, rarely). Every event needs an official `url` or a locator in a private source.

## Rendering

| Component | Input | Shows |
|---|---|---|
| `TrialQuickHit` | `id` | design, population, arms, primary endpoints with met or not met, harms, follow-up, registry and DOI links |
| `ReportHistory` | `id` | every report: date, kind, cutoff, headline result, citation |
| `InConversation` | `id` | explicit relations and their inverses, contemporaries in the same lane, guideline and regulatory events that cite the trial |
| `EvidenceTimeline` | `decision` | lanes by date; each trial's reports joined on one line, colored by verdict; events on their own lane; links to pages |
| `TrialComparison` | `decision`, optional `lane` | one row per trial: year, population, control, primary endpoint, values, effect, met, follow-up (primary report unless `report` given) |

## WARWIKI notes

- Pages live in `docs/06-clinical-evidence/studies/<id>.mdx` (URL `/docs/clinical-evidence/studies/<id>`); the template is `TEMPLATE.md` in this folder.
- Trial ids keep the old Journal Club ids (`sister`, `rosetta`, ...): `/docs/journal-club#trial-<id>` (the Anki decks' links) redirects to the landing page, which forwards to the trial page.
- Every Result, Harm, delivery Fact and the takeaway is a claim in the claim gate (`scripts/review/gate.py`, `trial_units`), bound to its report DOI.
- `src/data/trials.ts` (the old Journal Club data) is retired; `reports/anki-deck` scripts still read it for card history.
