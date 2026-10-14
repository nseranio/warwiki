# Site-wide podcast matching — candidate list

**As checked October 14, 2026.** This is a curation list only. No MDX, component, or other source file was edited. The existing BackTable Urology Ep. 66 card on the female SUI page is already present and is not repeated as a new candidate.

## Results

| Show | In-scope episodes in `catalog.tsv` |
|---|---:|
| BackTable Urology | 65 |
| BackTable OBGYN | 29 |
| ICS Podcast | 42 |
| SUFU Podcast | 27 |
| IUGA Podcast | 12 |
| AUAUniversity Podcast | 8 |
| GRUrocast | 1 |
| **Total** | **184** |

`candidates.tsv` has **76 candidate placements** on **53 distinct WARWIKI pages**, representing **62 distinct episode URLs**: **61 high** and **15 medium** confidence. No page has more than three proposed episodes, and no episode is proposed for more than three pages. The SUI page has two proposed additions alongside its existing Ep. 66 card. `library-additions.tsv` has **15** proposed additions, all with existing feed and topic IDs from the Podcast Library and all present among the checked candidate URLs.

Every distinct candidate URL was checked with `curl -sIL` for final HTTP **200**, followed by a GET to compare the publisher/host page title or episode heading to the catalog title. All 62 passed; the individual results are in `url-checks.tsv`. A 200 landing page does **not** establish that the audio plays without an account. In particular, [ICS marks many episodes as members-only](https://www.ics.org/podcast). Some older AUA index entries led to a generic LMS shell despite returning 200; those were excluded from candidates and the catalog.

## Inventory and decisions

- [BackTable's sitemap](https://www.backtable.com/sitemap.xml) exposed 559 Urology/OBGYN episode or transcript URLs: 331 canonical Urology episode paths and 136 canonical OBGYN episode paths. We parsed all 467 canonical episode pages, retrying 13 transient misses. `backtable-all.tsv` and `backtable-all-urls.txt` preserve this crawl; they are raw inventory, not recommendations. Catalog inclusion was limited to episodes whose primary subject fit the requested scope. Cross-posts on the two feeds remain separate episode pages.
- [SUFU's Apple Podcasts listing](https://podcasts.apple.com/us/podcast/sufu-podcast/id1453215610) lists 91 episodes; 27 focused clinical episodes have stable episode-specific Apple URLs in the catalog. SUFU does not consistently publish episode numbers, so its `ep` cells are blank rather than treating Apple's internal track IDs as episode numbers.
- The [AUAUniversity podcast index](https://cme.auanet.org/Page/podcast) was searched for relevant clinical episodes. Of 43 selected index entries checked, eight had identifiable episode content on their own pages. The rest returned a generic LMS shell or failed to identify the listed episode. The eight verified pages are catalogued; a generic 200 page was never used as a candidate.
- The [ICS podcast index](https://www.ics.org/podcast) contains 85 numeric episode pages; 42 in-scope episodes were catalogued. Candidate pages have 200 status and matching titles, while audio access may be restricted to members.
- The [IUGA podcast directory](https://www.iuga.org/education/podcasts) links 23 episode pages; 12 focused episodes with identifiable Spotify titles and dates were catalogued. A fistula episode redirected to a generic Spotify for Podcasters page, so it was omitted from placements.
- The [GRUrocast directory](https://grandroundsinurology.com/grurocast-podcast/) embeds 13 Spotify episodes. One functional/reconstructive-urology discussion fit the catalog, but its broad overview was not forced onto a clinical page. Other Grand Rounds in Urology talks are video/lecture pages, not podcast episodes, and were not relabeled as podcasts.
- [AUGS online learning](https://www.augs.org/education-meetings/online-learning/) offered webinars and courses, without a comparable episode-specific public podcast index in this search. AUA Inside Tract and the other show-level links in the WARWIKI library did not yield a focused, independently verified episode page for this candidate list.

The current `docs/08-resources/podcasts.mdx` contains **50** episode objects, although the request refers to 57. Thirty-five of those objects have BackTable episode URLs and 15 point to show or topic pages. Thirty-three of the 35 episode URLs are in this catalog. The excluded two are the pediatric-primary hypospadias episode and the vaginal-rejuvenation episode, whose main subject is outside this matching scope. Show and topic landing pages were not matched to articles.

## Matching standard

A placement reflects the episode's **main** subject and the page's actual topic. Broad conversations about practice, training, career paths, and industry were kept out of clinical page matches. Closely related but distinct topics were also left unmatched: female outlet obstruction is not automatically female urethroplasty; vaginal mesh surgery is not automatically a mesh-complications episode; pelvic floor therapy after vaginoplasty is not a vaginoplasty-technique episode. Medium confidence is reserved for a relevant broader discussion or a workshop preview. No low-confidence placements are included.

The BackTable and AUA catalogues may contain adjacent functional-urology material that has no sufficiently precise WARWIKI page match. `catalog.tsv` is the episode inventory; `candidates.tsv` is the implementation shortlist. Library additions are suggestions for editorial review, not edits to the Podcast Library.
