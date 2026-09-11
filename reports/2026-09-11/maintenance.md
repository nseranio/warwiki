# WARWIKI maintenance runbook

## Monthly operation

**Publication status, September 11:** GitHub and Vercel sign-ins are complete. The monthly GitHub workflows are published on `main` in commits `8881cd95`, `d592751e` and `76cadfd4`, using Node 24 LTS. CI run [34617018910](https://github.com/nseranio/warwiki/actions/runs/34617018910) passed. The local Codex automation is also active. The reliability release `eccd245a` was verified live; further work and deployment cleanup are described in [implementation-followup.md](implementation-followup.md).

Two complementary mechanisms are active:

1. **GitHub, first day of each month:** at **06:23 UTC**, `Monthly literature watch` runs a free Europe PMC metadata search and produces a downloadable `literature-inbox` artifact, retained for 90 days. It uses seven topic searches, a 100-day overlap, pagination, duplicate detection, and correction/retraction screening. It uses no paid AI API and makes no Vercel deployment. At **07:13 UTC**, `External link check` separately samples 200 URLs and saves a report.
2. **This Codex task, second day of each month:** the active `WARWIKI monthly evidence update` automation reviews primary sources, compares existing pages, integrates verified meaningful updates, runs checks, and commits/pushes under the standing user instruction. It reports meaningful changes or failures. Ambiguous findings stay in a review queue. Automation ID: `warwiki-monthly-evidence-update`.

The local editor needs this computer on, the app running, and the repository available. The GitHub collector runs independently of the laptop. This is not a promise of unattended cloud clinical editing. If the editor misses a run, the next run must search back to the last completed update, not merely assume that 100 days covers the gap. [Official scheduled-task guidance](https://learn.chatgpt.com/docs/automations?surface=app)

The first manually dispatched literature run, [34617072232](https://github.com/nseranio/warwiki/actions/runs/34617072232), passed and saved **1,618 metadata candidates across seven topics for June 3–September 11**. They are candidates for screening, not verified clinical updates. Initial external-link run [34617068341](https://github.com/nseranio/warwiki/actions/runs/34617068341) completed its check and artifact upload, then correctly failed because two DOI URLs returned 404. Repair and repeat verification are in progress; this is not an authentication or runner setup failure.

GitHub schedules can be delayed and public-repository schedules are disabled after 60 days without repository activity. The old nightly external-link workflow was found disabled for this reason on September 11. Check the Actions page when returning after a long absence; the monthly editor checks this state too. This is a known limitation, not an always-on SLA. [GitHub schedule behavior](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)

## Evidence review sequence

**Current review priority:** audit the entire site, with a page-by-page log of errors, source currency and unresolved items. Prioritize major guidelines, large trials, Cochrane reviews and findings likely to change practice. Isolated small studies should not drive routine updates without meaningful context. The seven-topic collector supports this work but does not establish complete coverage of every page.

1. Establish the last actual clinical update from the changelog and scoped `evidenceUpdated` notes; Git edit times and handoff saves are not clinical reviews.
2. Download the latest artifact or run `npm run literature:scan -- --from YYYY-MM-DD --to YYYY-MM-DD`. A failed topic fails the collection rather than silently publishing an incomplete inbox.
3. Screen official AUA, EAU, AUGS and FDA sources separately. They are listed in `config/literature-watch.json`; the PubMed-source API is not comprehensive for society or device announcements.
4. Verify the earliest **publisher** online date. Index metadata sometimes uses the issue date. A 2026 issue is not proof of post-June publication. Check study design, population, intervention, comparator, denominators, endpoint, follow-up, uncertainty, harms, and any correction/retraction/expression of concern.
5. Distinguish full-text review, published-article abstract access, conference abstract and preprint. Record access limitations. A screening priority or a statistically significant result does not establish clinical importance.
6. Compare against the actual page and its companion. Keep dose/label facts in pharmacology and procedure decisions in the treatment/workflow article. Do not accumulate contradictory historical paragraphs.
7. Add `evidenceUpdated: YYYY-MM-DD` and a narrow `evidenceNote` on materially updated pages. `lastReviewed` and `reviewer` record an actual clinical review and must not be fabricated. These are retained as editorial metadata; the public page uses only its existing last-updated display.
8. Record included, excluded, already-covered and unresolved findings in a dated report. Do not label a partial search an exhaustive systematic review.

The initial search of June 28–September 11 produced 1,212 deduplicated records, including late indexing and out-of-scope search hits. These are **candidates**, not 1,212 verified updates. Only source-checked, relevant findings were integrated. Metadata and bibliography are retained; abstracts/full texts are not republished by the collector.

## Publication checks

Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:maintenance`, `npm run build`, `npm run audit:size`, and `git diff --check`. Inspect changed pages and diagrams in a browser. The lint checks structure and references, not clinical truth.

Every production build now enforces a 200 MB deployment-output budget after asset optimization and compiled-link checking. This runs locally, in GitHub CI and on Vercel. Deliberately restoring handouts also requires revisiting that limit. The external-link extractor preserves balanced parentheses in DOI URLs; its focused tests run with the rest of the maintenance suite.

Before pushing, review the diff and stage only task changes. Preserve unrelated files. Push completed changes to `main` / `origin/main`, then verify GitHub and Vercel outcomes. A successful push is not evidence of a successful deployment. Do not push a report-only timestamp change as a public release.

## Keeping deployment storage small

- Patient handouts are paused and unlisted. Every default production build omits `build/handouts/` and `build/img/handouts/`; original PDFs and JPEGs remain in `static/` and Git for recovery. Hiding the gallery alone would not save storage.
- To restore deliberately, set `WARWIKI_INCLUDE_HANDOUTS=true` for the build. This enables the gallery and retains optimized preview JPEGs. Restore the navigation/CTA and remove the page's `noIndex` setting when ready to advertise it again. Verify the restored gallery and all language downloads first.
- The quiz route and its data were removed. `/quiz` redirects to Resources. History & Lineage remains linked discreetly from About, rather than Resources or the footer.
- Automatic Vercel deployment is restricted to `main`; report-only changes are skipped. New article/API/config changes still build.
- Device speech is the default. Paid cloud speech needs an explicit `WARWIKI_ENABLE_CLOUD_TTS=true` build/runtime setting and access/rate controls. This is separate from Deployment Storage.
- Changing the build does not reclaim earlier deployments. Review storage retention and old deployment inventory using the hosting report. The authorized cleanup deleted 41 obsolete deployments; see [deployment-cleanup.md](deployment-cleanup.md) for preserved releases and the storage-accounting caveat.

## Before Epic reuse

**Epic is explicitly paused.** Retrieve [EPIC-ROADMAP.md](../../EPIC-ROADMAP.md) when the user asks to resume; no deadlines or Epic jobs are active. The public wiki is the evidence reference. Personal operative examples and patient-specific documentation belong outside this public repository. Use the practice roadmap to build a small initial library, validate its Epic mappings in the institution's environment, and expand after real use. A source update should identify dependent templates for review; it must not silently replace already-approved personal clinical documentation.

## Account access and deployment cleanup

GitHub and Vercel authentication are complete. The user has explicitly allowed browser/UI interaction again. The earlier background-only restriction and expired-credential blocker are resolved; do not ask for the same authorization again.

Cleanup deleted all 41 obsolete candidates after verifying project, terminal state and aliases; five deployments remain in the listing, including the live release and verified rollbacks. All aliases were preserved. See [deployment-cleanup.md](deployment-cleanup.md); account storage has not yet been reliably remeasured. Never infer deployment IDs or safe deletion from age alone, and do not equate local output bytes with Vercel's metered storage.

Reference and media maintenance now have reproducible source-only queues: see [reference-media-maintenance.md](reference-media-maintenance.md). The media collector does not automatically approve a video, place it on a clinical page, or turn it into evidence.

## Quarterly user-supplied OpenEvidence survey

Use [OPEN-EVIDENCE-PROMPT.md](../../OPEN-EVIDENCE-PROMPT.md) for the reusable prompt. The user plans to supply a broad survey approximately every three months, independently of the monthly maintenance. Save the supplied response, reconcile original sources against existing pages, and log included/already-covered/deferred/rejected items. The September 11 survey contains 110 references; [its reconciliation](open-evidence/README.md) is in progress. Do not treat a supplied summary as verified evidence.
