# Reference and media maintenance additions

## Reference inventory

`npm run audit:references -- --out reports/YYYY-MM-DD/reference-inventory.json --markdown reports/YYYY-MM-DD/reference-inventory.md` generates a deterministic source-only identifier index, citation occurrence locations, dependent-page mappings, co-cited identifiers, suspected inconsistent citation titles, matching article titles, and short named-technique candidates. It makes no network requests and edits no articles. DOI and PMID identifiers stay separate; shared co-citation is not enough to merge publications automatically.

The initial September 11 snapshot covered 1,186 pages, 10,974 DOI identifiers and 268 PMID identifiers. A total of 2,713 identifiers occurred on multiple pages. Ten conservative title inconsistency candidates were initially flagged; most are abbreviations or shortened titles. One actual mismatch was verified on PubMed: DOI `10.1038/ki.1989.15` is McDougal and Koch's **Effect of sulfate on calcium and magnesium homeostasis following urinary diversion**, not the alternative bone title used on the renal-metabolic surveillance page. That item and its overstated bone interpretation have now been corrected; the final inventory is regenerated after editorial changes. [Primary abstract](https://pubmed.ncbi.nlm.nih.gov/2709657/)

The final regenerated index contains 10,956 DOI identifiers and 234 PMID identifiers, with 2,717 identifiers used on multiple pages and nine remaining conservative title-conflict candidates. These current counts supersede the initial snapshot above.

The three identical-title pairs include two legitimate possible companions (Optilume pharmacology vs technique; Y–V flap principle vs bladder-neck use) and two scrotal reconstruction pages worth comparing for a canonical role. Do not merge based on titles alone. Six short technique pages warrant an editorial choice between expansion, intentional concise coverage, or parent-page consolidation. The complete locations are in `reference-inventory.json` and the compact triage is in `reference-inventory.md`.

`npm run lint:density -- --out reports/YYYY-MM-DD/reference-density.json` now retains articles above 1,500 words, counts unlinked numbered bibliographies, and excludes clinical indexes/databases and known stubs. The final advisory contains 130 substantial clinical articles after the focused imaging and clinical-reference repairs. It always exits successfully because bibliography structure and length do not by themselves establish inaccurate clinical content. The report helps prioritize actual source review; it is not a newly imposed hard failure on historical pages.

After a guideline/paper correction, find its canonical DOI/PMID record and review **all** `dependentPages`. Preserve the pharmacology/workflow and principle/procedure splits. Correct metadata against the publisher or PubMed before changing article wording. Publication-level deduplication should be manual when identifiers disagree.

## Media review queue

The existing YouTube collector already supports a separate output path. It was run on September 11 into `youtube-review-source.json`, preserving the published registry. It found 143 playlists / 1,553 unique videos, compared with the June 23 published baseline of 1,546. The new queue identifies 15 metadata changes (8 new-to-registry, 3 title changes, 4 marked private/deleted) and one prior video absent from current playlists. These are candidate maintenance actions, not 15 new educational recommendations or 15 post-June publications.

Use the existing collector with `npm run videos:fetch -- --out reports/YYYY-MM-DD/youtube-review-source.json` when its authorized YouTube API key is available. Then run `npm run media:review -- --date YYYY-MM-DD --collection reports/YYYY-MM-DD/youtube-review-source.json --verify-feeds --out reports/YYYY-MM-DD/media-review-queue.json --markdown reports/YYYY-MM-DD/media-review-queue.md`.

Without the key or a collection, omit `--collection`; the queue explicitly reports that no new video collection was performed and still creates the podcast source review tasks. Never interpret a stale/absent collection as proof that no new media exists. Do not run `videos:build` or `videos:sync` as part of unattended collection: those change the public registry.

The queue parses static TypeScript/MDX metadata without evaluating source code. Each candidate records its provider URL, collection time, provider date and a date caveat, plus blank human placement/reviewer/rationale fields. The legacy collector can substitute playlist-addition time when publication time is unavailable, so dates require provider-page confirmation. A provider-marked private/deleted item is an availability signal; simple absence from a playlist is not proof of deletion.

All eight existing podcast source URLs were checked with bounded requests. Four were reachable; two timed out and two returned indeterminate 307 responses. Those limitations remain visible. An HTTP response does not verify a podcast episode's date, content, quality or playback. The 42 existing curated episodes provide the comparison baseline; their publication dates are not uniformly recorded, so the queue directs reviewers to the provider before selecting or placing new episodes.

## Monthly integration

The GitHub literature collector can run `audit:references` and `lint:density` into its downloadable authoring artifacts; they need no secret, paid service or Vercel deploy. A media queue without a YouTube collection can also run offline, adding `--verify-feeds` only when URL checks are desired. A fresh YouTube comparison requires the existing key, so the local monthly editor can run the collector while preserving the output in a dated report directory. These outputs belong in source-only reports, not `src/data` or `static`.

The monthly editor should review flagged reference identities, then the changed media list, confirm primary source dates and availability, choose the appropriate article/library location, and run the normal checks before publication. Operative video sections stay near the end immediately before References; device mechanics and implantation technique belong on their respective pages. Queue generation never creates clinical claims or approves educational placement.
