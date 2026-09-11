# WARWIKI hosting and performance review

Prepared September 11, 2026. Measurements describe local files; the Vercel account was not changed.

**The final local deployment output is 139.55 MB, down from 566.08 MB: a 75.3% reduction.** This reflects the approved handout pause, quiz removal and video rendering changes alongside the other site updates. Old Vercel deployments still need retention/cleanup; their stored outputs do not shrink when new source code is optimized.

## The reported limit is deployment storage

The supplied Vercel screenshot identifies **Deployment Storage: 10 GB included**, with WARWIKI at **13.87 GB** in the current Safari dashboard inspection and **14.92 GB** at the screenshot's selected historical point. This is stored release history, not a visitor traffic or analytics allowance. Turning off Analytics, reducing page requests, or adding browser cache headers does not clear it.

Vercel introduced its Deployment Storage announcement on August 21, 2026, including a 10 GB Hobby allowance. It said existing teams' pricing was unchanged at that point; the screenshot establishes this account's displayed allowance, not a new bill or a suspended website. [Vercel announcement](https://vercel.com/changelog/deployment-storage-keeps-your-deployments-rollback-ready)

Stored static/build output and Functions Storage are separate meters. Vercel records daily project maxima and time weights storage over the period; deleting old releases will not erase prior daily usage. Retained release count, output size, and retention duration are the relevant controls. [Storage accounting](https://vercel.com/docs/deployment-storage)

## What the repository contains

| Measurement | Before this work |
|---|---:|
| Existing local build output | 566.08 MB; 4,298 files |
| Static source assets | 443.82 MB |
| Patient handout PDFs | 308.93 MB; 881 PDFs |
| Patient handout preview JPEGs | 114.85 MB; 881 images |
| All JavaScript chunks in the build | 44.75 MB total, not one page download |
| Video library HTML | 1,829,600 bytes; 1,546 initial cards |
| Largest single source asset | 4.24 MB team headshot |

These use decimal MB. The existing build was an inherited local artifact rather than a freshly reproduced production deployment. Full baseline details are in `build-size-before.json`. The PDF collection remains preserved in the source repository, but the user has now chosen to pause its publication because it is unused and drives deployment size.

Twenty copies of a 566 MB output would total approximately 11.32 GB. This is an **illustration of scale**, not an inferred deployment count or exact billed total: historical outputs differ and no storage-deduplication guarantee was found in the current official accounting documentation. Actual deployment inventory is needed to reconcile the screenshot.

## Changes implemented

1. **Omit the paused handout collection from every normal deployment.** At the user's request, `postbuild` now removes only `build/handouts` and `build/img/handouts` after the static site is generated. `vercel.json` explicitly uses `npm run build` and the `build/` output directory so the postbuild exclusion is part of deployment. This removes **308.93 MB of PDFs plus 114.85 MB of original preview JPEGs**, approximately **423.79 MB per build** relative to the baseline. The gallery is paused and has no active download links; old direct PDF URLs will no longer serve files after this deployment. All 881 PDFs and 881 original previews remain in `static/` for private use or restoration. To restore publication, set `WARWIKI_INCLUDE_HANDOUTS=true` at build time; it enables the gallery and keeps the outputs. The restore path also compresses generated previews from **114.85 MB to 46.24 MB** while preserving dimensions and filenames. Every original PDF remains byte-identical.
2. **Render the first 24 video cards, with Show more.** Search and filters still inspect the complete registry, including videos that have not been rendered. The new HTML is **52,298 bytes instead of 1,829,600 bytes (97.1% smaller)**; gzip is **8,415 instead of 93,628 bytes (91.0% smaller)**. This cuts initial HTML and browser work; thumbnails were already lazy loaded and players already click-to-load. The registry remains available to the client, so this is not a claim that all video-related JavaScript disappears.
3. **Actually restrict automatic deployments to `main`.** The previous `{main: true}` configuration did not disable other branches. The explicit wildcard-false/main-true rule now does. Preview branches remain buildable through local/CI checks; Vercel preview deployments require deliberately enabling their branch again. [Vercel branch matching rules](https://vercel.com/docs/project-configuration/git-configuration)
4. **Skip report-only releases.** The Vercel ignored-build step compares with the last deployed Git revision. It skips only when every changed path is a known authoring-only report, social asset, README, changelog, or agent handbook. Article, media, API, dependency, and configuration changes still build. Missing history or uncertainty causes a build. This prevents a literature surveillance report from creating another whole-site release when no public content changed.
5. **Exclude authoring output from deployment uploads.** `.vercelignore` excludes reports, social assets, source-authoring material and local verification output. This is upload hygiene; it is not counted toward the measured handout build-output saving. Source handouts are not excluded, so the restore flag remains functional.
6. **Add a repeatable size audit.** `npm run audit:size` reports total size, extension totals, largest files and initial video cards. `npm run audit:size` enforces a 200 MB output budget and runs automatically in `postbuild` on local and Vercel production builds; this budget monitors output and is not a guarantee about account-level retained storage.
7. **Cache only content-hashed assets for one year.** The `/assets/` rule avoids repeat downloads; HTML and unversioned clinical PDFs do not receive immutable caching. This improves repeat visits but does not reduce the reported storage meter. [Cache-Control guidance](https://vercel.com/docs/caching/cache-control-headers)

### Separate finding: paid audio requests

The article listener previously requested every audio chunk concurrently at the first click; stopping playback did not cancel those requests. The public API accepted arbitrary text whenever an OpenAI key was present. Its POST cache headers also implied a shared CDN cache that cannot safely vary by request body.

Device/browser speech is now the default and sends no requests to the paid endpoint. Optional cloud speech requires `WARWIKI_ENABLE_CLOUD_TTS=true` at build time and in the Vercel function environment, plus the existing server-only `OPENAI_API_KEY`. When opted in, audio is generated only as playback reaches a chunk, cached in the browser by content, and pending client requests are aborted on Stop. Aborting a client request cannot guarantee an already-started upstream generation is not charged. Configure durable access/rate controls before opting into public cloud speech; the environment flag is an off switch, not authentication. No API key is exposed in site configuration. Analytics remains enabled because its quota is unrelated to this storage issue.

## What to do in Vercel now

The live Safari dashboard was inspected: **all four retention categories already use 30 days** (canceled, errored, pre-production, production). Nothing was changed. An indefinite-retention setting is not the cause established here; shortening from indefinite is not an applicable fix.

1. Keep the current production/rollback policy while reviewing what is actually retained. Shorter canceled/error/unused-preview periods can be considered if the dashboard offers them, but the protected-ready-deployment exceptions are more relevant to this account. [Retention configuration](https://vercel.com/docs/deployment-retention)
2. Review the actual deployment list and aliases. Preserve the release serving `warwiki.org`, a known-good rollback, and any specifically required historical releases. Review obsolete unaliased production/preview deployments for removal. **No deployments have been deleted in this work.** A bulk cleanup should begin with an explicit list of eligible deployment IDs/dates and preserve protected current/rollback releases.
3. Be aware that the current retention documentation protects the latest 20 ready production deployments and latest 20 ready non-production deployments, among other exceptions. A short retention setting alone can therefore leave substantial storage. The earlier April announcement mentioned a different protected count; use the current dashboard and current documentation. Policy deletion is asynchronous, and successful releases have a recovery period. [Current retention exceptions](https://vercel.com/docs/deployment-retention)
4. Recheck both Deployment Storage and Functions Storage after the policy/cleanup has taken effect and inspect usage over time. Smaller new builds do not rewrite old deployments. [Storage optimization workflow](https://vercel.com/docs/deployment-storage/optimize)

**Recommended order:** inventory the retained releases and aliases, review a specific obsolete-deployment cleanup list, deploy the substantially smaller build with handouts paused, then reassess. The user has authorized obsolete-deployment cleanup, but none has been performed: silent Vercel authentication refresh failed, and interactive sign-in is deferred while the user is watching a show. Avoid report-only/previews creating unnecessary releases going forward. The new output is smaller, but old releases still retain their original handout assets; this does not prove that today's account usage is already under 10 GB.

## If storage still grows

If the handouts are restored later, the strongest architectural option is to host their PDFs and previews once in a dedicated static asset/object-storage location rather than bundling the collection into every site release. PDFs plus optimized previews are about **355 MB**. Stable/versioned asset URLs would keep that collection outside retained deployment output. This would require selecting storage, preserving links, setting caching/access rules, and verifying every document and thumbnail. There is currently no reason to migrate the paused collection: retaining its originals in the repository satisfies the user's preservation request without publishing them.

For a full hosting move, Cloudflare is a plausible fit for this mostly static site. Its current documentation recommends **Workers Static Assets for new projects**; Pages is also available. Static hosting would preserve prebuilt articles, local filters and browser speech, but `/api/tts`, redirects, clean URLs and deployment configuration need explicit migration. No domain or hosting migration has been made. [Cloudflare platform direction](https://developers.cloudflare.com/pages/), [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)

| Option | Relevant constraints and fit |
|---|---|
| Stay with Vercel and manage history | Least migration work. Best immediate step for the known storage quota. Old release storage still needs cleanup/retention. |
| Cloudflare Workers Static Assets | Static asset requests are free and unlimited and asset storage has no additional charge. Worker/API execution is metered separately. This is Cloudflare's current recommendation for new static projects. [Billing and limits](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) |
| Cloudflare Pages | Current free-plan limits include 20,000 files, 25 MiB per asset, 500 builds/month and a 20-minute build timeout. The final site's measured 2,572 files and largest 4.24 MB asset fit those file limits. Pages Functions use Workers quotas separately. Validate full build duration and redirect migration. |
| GitHub Pages | Published site max 1 GB and soft bandwidth limit 100 GB/month. The static artifact fits, but there is no native Vercel `/api/tts` route. Its restrictions on online-business hosting also make it less attractive for future commercial practice-facing expansion. |

The Pages and GitHub comparisons use their current published [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) and [GitHub Pages limits and use restrictions](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## Verification

- All 881 compressed previews decode as JPEG and retain their source dimensions.
- Before exclusion was enabled, every one of the 881 generated PDF copies was byte-identical to the committed source. The default final build omits those copies; source PDFs remain unchanged.
- Urethroplasty preview was visually compared with its source; the original-resolution PDF remains the reading/printing artifact.
- Targeted tests verify progressive video rendering, searching unloaded videos, reset after filtering, lazy audio requests, cancellation, and zero paid requests for default device audio.
- The ignored-build step was exercised in a disposable repository: report-only commits skip, API edits build, and missing previous revision builds.
- All 38 component/API tests and 42 maintenance-script tests pass, and typecheck and the final production build (including postbuild) pass. The compiled-site checker validates 1,192 HTML pages, 102,789 local links/assets and 746 data-link literals with zero issues; the 200 MB local production budget is enforced. The final build emitted no SVG type warnings after the metadata repair; the affected SVGs also passed Chromium loading and the installed image-size detector.


## Final local output measurements

| Measure | Baseline inherited build | Final rebuilt output | Change |
|---|---:|---:|---:|
| Total bytes | 566,081,841 | 139,552,607 | −426,529,234 (75.3%) |
| Published files | 4,298 | 2,572 | −1,726 |
| Published handout PDFs | 881 | 0 | Sources retained |
| Published handout previews | 881 | 0 | Sources retained |
| Video library HTML bytes | 1,829,600 | 52,298 | −97.1% |
| Video library gzip bytes | 93,628 | 8,415 | −91.0% |
| Initial rendered video cards | 1,546 | 24 | Search still covers entire registry |

`build-size-after.json` contains the full final inventory. The 200 MB output budget passes. Both omitted handout directories are absent from `build/`, while their original `static/` directories remain. Twenty outputs at the new 139.55 MB scale would be roughly 2.79 GB; this remains an illustration, not a measured Vercel bill or a claim that old deployment storage has been removed. No deployed function bundle was fetched, and this audit does not assume that Functions Storage includes the static handout collection.
