# Search review (October 8, 2026)

Tested about 45 queries against the live `WARWIKI` index with the exact parameters the site sends (captured from the DocSearch request), then re-ranked the same hits locally under the proposed settings. Simulator: `sim.py` logic is summarized below; the before/after tables are from that run.

## What is wrong now

1. **Section weight outranks the text match.** The live ranking formula is `desc(weight.pageRank), desc(weight.level), words, filters, typo, attribute, proximity, exact, custom`. Every clinical section has pageRank 80 and History & Lineage 55, so any clinical-section record beats any history or profile record, whatever the match quality. `allen morey` shows Q-Flap, a typo match on "more" in Positioning, "Alken" in Mainz Pouch I and "fallen" in Vascular-Urinary Fistula before Allen F. Morey's own profile (13th). `chapple` opens with Modified Charles Procedure (2 typos); `webster` with Westerman.
2. **The dialog shows only 5 results.** DocSearch shows at most 5 hits per `lvl0` group, and `lvl0` is "Documentation" on every record: the crawler removes `.theme-doc-breadcrumbs` before the `lvl0` selector reads it. One page's subsections can fill all five slots (`ileal conduit`: the page plus four of its own headings).
3. **Canonical pages lose ties to longer titles.** When several page titles contain every query word, the order falls to `weight.position`, which is arbitrary. `vesicovaginal fistula` puts Martius Flap for VVF first and the VVF page fourth; `lichen sclerosus` and `buccal mucosa graft` likewise.
4. **Footer count is wrong** ("See all 15749 results" for a 22-hit query). DocSearch 4.7 adds each keystroke's `nbHits` to the previous total. Fixed in the repo (see below).
5. **Duplicate page titles** show as identical rows: Peyronie's Disease (3 pages), Neurogenic Lower Urinary Tract Dysfunction (hub and article), Scrotal Reconstruction (atlas and hidden overview), Gender-Affirming Surgery (two section landings).

## Proposed (simulated) result

| Query | Now, first result | Proposed, first results |
|---|---|---|
| allen morey | Q-Flap (Morey / Tran / Zinman) | Allen F. Morey; Q-Flap |
| chapple | Modified Charles Procedure | Christopher R. Chapple; Urethral Diverticulectomy (Chapple / Osman) |
| mundy | Enterourethroplasty section | Anthony R. Mundy |
| barbagli | Muscle-Sparing Urethroplasty section | Guido Barbagli |
| lichen sclerosus | Microfat & Nanofat Grafting | Lichen Sclerosus |
| vesicovaginal fistula | Martius Flap for VVF | Vesicovaginal Fistula |
| buccal mucosa graft | Phallic Urethra: Prelaminated BMG | BMG Ureteroplasty; Buccal Mucosa Graft (BMG) |
| urethral stricture, ileal conduit, sui, aus | already correct | unchanged first result; less same-page repetition |

## Changes to make in the Algolia dashboard

### A. Index → Configuration (Ranking and Sorting, Searchable attributes, Typo tolerance, Deduplication)

```json
{
  "ranking": ["words", "filters", "typo", "attribute", "proximity", "exact", "custom"],
  "customRanking": ["desc(weight.pageRank)", "desc(weight.level)", "asc(weight.titleWords)", "asc(weight.position)"],
  "searchableAttributes": [
    "unordered(hierarchy.lvl1)", "unordered(hierarchy.lvl2)", "unordered(hierarchy.lvl3)",
    "unordered(hierarchy.lvl4)", "unordered(hierarchy.lvl5)", "unordered(hierarchy.lvl6)", "content"
  ],
  "attributeForDistinct": "url_without_anchor",
  "distinct": 2,
  "minWordSizefor1Typo": 4,
  "minWordSizefor2Typos": 8,
  "removeStopWords": ["en"]
}
```

- Text match first, section weight only as a tie-breaker: fixes item 1.
- `lvl0` leaves the searchable list because it becomes the section name (B below); otherwise "history" or "treatment" would match every record in that section.
- `distinct: 2` on the page URL: at most two rows per page, so five slots cover more pages.
- Typo thresholds: no typo on 3-letter words (acronyms), two typos only from 8 letters.
- `weight.titleWords` exists only after the crawler change in B; add it to custom ranking after that reindex.

### B. Crawler → Editor (`recordExtractor`)

Section name as `lvl0` (the dialog then groups results under Clinical Conditions, Treatment Atlas, Foundations and so on, 5 per section), title length for tie-breaking, and a small edge for condition pages on exact ties:

```js
const SECTIONS = {
  'foundations': 'Foundations', 'evaluation': 'Evaluation', 'clinical-conditions': 'Clinical Conditions',
  'surgical-techniques': 'Treatment Atlas', 'special-populations': 'Special Populations',
  'roots': 'History & Lineage', 'resources': 'Resources',
};
const makeExtractor = (rank) => ({ url, helpers, $ }) => {
  const sectionKey = url.pathname.split('/')[2];
  const section = SECTIONS[sectionKey] || 'Documentation';
  const titleWords = $('article h1').first().text().trim().split(/\s+/).filter(Boolean).length || 99;
  // ...existing reference/table/breadcrumb stripping unchanged...
  const records = helpers.docsearch({
    recordProps: {
      lvl0: { selectors: '', defaultValue: section },
      lvl1: ['header h1', 'article h1'],
      lvl2: 'article h2', lvl3: 'article h3', lvl4: 'article h4', lvl5: 'article h5', lvl6: 'article h6',
      content: 'article p, article li',
      pageRank: String(sectionKey === 'clinical-conditions' ? rank + 2 : rank),
    },
    indexHeadings: true,
    aggregateContent: true,
  });
  return records.map((r) => ({ ...r, weight: { ...r.weight, titleWords } }));
};
```

After saving: URL Tester on `/docs/roots/surgeons/h-r/allen-morey` (expect `lvl0` "History & Lineage" and `weight.titleWords` 3), reindex, then apply A (including `asc(weight.titleWords)`).

## Changes in the repo

- Done: footer count reads the hit count of the exact query from the search response (`src/theme/SearchBar/index.tsx`, `hitCountsFrom` in `src/utils/search-aliases.ts`); shows "See all results" until known.
- Open (owner decision): disambiguate or merge the duplicate titles in item 5.
