# WARWIKI GU Clinical Trial Finder Claude Handoff

Prepared November 18, 2026. This is an implementation brief for Claude, with a historical interactive concept attached. The owner now wants the finder inside WARWIKI Resources so oncologists can identify relevant trials, find nearby enrolling sites, and prepare patients for study-team screening.

## Owner direction and authority

The latest request is: “I want to build this finder into WARWIKI as a resource so oncologists can look and set their patients up to enroll. Give me what i need for claude to pick this up and work on this project.”

This replaces the October request for a separate website. Implement in `/Users/joyboy/Documents/WARWIKI/warwiki`. The handbook normally excludes primary urologic oncology articles; the owner has explicitly authorized this GU oncology resource. Keep that exception specific to this finder. Do not broaden the site's article scope or modify WHITWIKI as part of this request.

Use **GU Clinical Trial Finder** as the descriptive resource title. “GU Compass” was suggested in chat but never adopted by the owner. “GU TrialScout” is only the old mockup label and should not become the product name.

Read `CLAUDE.md`, `AGENTS.md`, and applicable sections of `STYLE.md` first. This brief supplies the feature specification; current repository instructions supply the implementation and publishing conventions. Show a concise integrated design and implementation plan before substantial UI work. The owner prefers seeing the design before a substantial build. The old mockup supplies interaction ideas, not an approved WARWIKI visual design.

## Clinical problem

A clinician preparing for a patient should be able to answer: Which studies address this disease state, which nearby sites report that they are recruiting, which cohort might apply, and whom do I contact?

Two required scenarios define the initial depth:

1. High-grade upper-tract urothelial carcinoma before definitive surgery. Discover preoperative systemic-therapy studies, including EA8192, and find local study contacts such as the Stanford team.
2. High-grade Ta NMIBC after BCG, without CIS. Identify papillary-only cohorts; distinguish studies requiring CIS from those accepting disease without CIS; find whether the relevant local cohort is actually open. TAR-200 and other intravesical agents must be searchable even when a particular study has stopped enrolling.

“BCG refractory” in a clinician's informal description does not establish a protocol's definition of BCG-unresponsive disease. Preserve uncertainty until dosing, treatment dates, pathology, and recurrence interval have been checked.

## Product scope

Build a clinician-facing resource under WARWIKI's existing navigation and styling. The main path should be **Library → Resources → GU Clinical Trial Finder**, with proposed canonical URL `/docs/resources/clinical-trial-finder`.

The first release should cover adult GU cancer studies in the United States: urothelial/bladder/upper tract, prostate, kidney, testicular/germ-cell, and penile cancer. Provide basic disease, location, status, intervention/acronym/NCT search across these groups. Give UTUC and NMIBC the detailed disease-state/cohort controls first. Label the depth of available filters honestly; broad search for another cancer remains useful without implying fully structured eligibility matching. Do not ship empty cancer tabs as complete modules.

Include relevant basket studies when a GU population is explicitly supported. Define and document a defensible retrieval strategy for those studies; never describe a narrow keyword sample as all available trials. Default to interventional treatment studies, with a clearly separate option if observational studies are included.

Enrollment support means a referral-ready study and site summary, the source protocol criteria, and real contact routes. Study teams handle screening, consent, and enrollment. The resource does not submit patient details, make referrals automatically, or adjudicate eligibility.

## First screen and referral workflow

Use the existing site shell, Inter typography, accent tokens, light/dark styling, and compact resource layout. Adapt the attached concept into existing WARWIKI components; do not embed its standalone HTML or create a second navigation shell.

The main sequence is:

1. Choose cancer and disease state. For NMIBC, allow HG Ta, T1, CIS with or without papillary disease, and unknown; capture BCG category only to the extent it is known. For UTUC, distinguish grade and preoperative, postoperative, or advanced setting. Show only relevant controls.
2. Enter a US ZIP and radius. Support valid ZIPs nationwide, including leading zeros, with explicit treatment of ZIPs that lack usable coordinates. Offer a site/institution search and a nationwide view. Device geolocation is optional, not required.
3. Review studies grouped by NCT ID, with nearest relevant sites underneath. A study appearing at several institutions is one study with several site options. Show the number of studies and the number of sites separately.
4. Open the cohort/criteria detail. Show why the study was surfaced, what remains unknown, the source eligibility passage, and an outbound registry link. Distinguish reviewed cohort information from unreviewed registry text.
5. Select a site. Show facility, city/state, site recruitment status, approximate distance, listed contact, public phone/email, and listed PI where available. Missing information stays missing. If only a central contact exists, label it as central.
6. Save studies to a browser-local shortlist. Copy or print a referral-preparation summary containing study and site facts, source links, and questions to resolve with the coordinator. Supply the real site's referral link if one has been verified. Never invent an enrollment form URL.

The summary should contain the title/acronym, NCT ID, intervention, selected site and contacts, relevant cohort, registry timestamps, unconfirmed criteria, and a short coordinator checklist. No patient names or identifiers are needed. A user-initiated email/phone link may open their app; no message is sent by the finder.

Search should understand an NCT number, acronym, intervention, institution, and investigator when that name is actually present in the source data. Include documented drug aliases where useful, such as the development name and current product name, without treating a drug approval as evidence that its trial is enrolling.

## Status and matching rules

Keep these concepts separate in the model and interface:

| Concept | Meaning and display |
| --- | --- |
| Overall study status | Registry value for the entire study. |
| Location status | Registry value for this particular location; it can be missing or differ from overall status. |
| Cohort opening | Whether this cohort is accepting patients at this site. Unknown unless specifically confirmed. |
| Available slot | Whether a patient can currently be screened/enrolled. A recruiting label does not establish a slot. |
| Patient eligibility | Requires full protocol and study-team review. Disease-state similarity does not settle it. |

Default nearby-enrolling results require both overall study status `RECRUITING` and an in-radius location explicitly marked `RECRUITING`. If overall/location statuses conflict, surface the inconsistency for review rather than silently selecting the more favorable label. Never promote a missing location status to recruiting. Offer an explicit “site status unreported” view and distinguish not-yet-recruiting/enrolling-by-invitation studies if those are offered.

If a study has a recruiting site far away and a closed site nearby, it does not have a nearby recruiting result. Apply radius filtering to individual qualifying locations, not just study-level search results. Calculate and sort by the nearest qualifying location, not the first location in the response. Do not broaden the radius silently.

For disease matching, use three outcomes: potentially relevant, needs clarification, and explicitly excluded. Apply a hard cohort exclusion only when the applicable rule is supported and the relevant input is known. Missing criteria or incomplete extraction are not proof of compatibility or incompatibility. Preserve mixed populations and cohort-specific rules; an exclusion in one arm does not automatically exclude every arm. Never infer “no CIS” from the absence of the word CIS.

Use structured, source-bound cohort annotations for the detailed NMIBC/UTUC filters. Each annotation needs the NCT ID, cohort label, relevant source section/passage, eligibility-text hash or source revision, reviewer status, and review date. An automated parser may suggest annotations but cannot manufacture clinician review. If the supporting criteria change, stop using that annotation for hard exclusions until it is rechecked. Registry-only studies remain discoverable under a needs-review label.

Use labels such as “Registry lists this site as recruiting,” “Papillary-only cohort described,” and “Cohort opening unconfirmed.” Do not show numerical match percentages, “you qualify,” or “available now” based solely on the registry. If no source-specific coordinator confirmation exists, cohort availability remains unknown.

Closed trials should be searchable by name or NCT, with a clear reason for exclusion from enrolling results. A historical TAR-200 trial is useful context, but must not look enrollable because a publication or old site listing says it is ongoing.

## Data source and retrieval

Use the public ClinicalTrials.gov API v2 as the primary registry source:

- Documentation: https://clinicaltrials.gov/data-api/api
- Structure: https://clinicaltrials.gov/data-api/about-api/study-data-structure
- Data/API version: https://clinicaltrials.gov/api/v2/version
- Studies: https://clinicaltrials.gov/api/v2/studies
- Individual record: `https://clinicaltrials.gov/api/v2/studies/{NCT_ID}`
- User-facing record: `https://clinicaltrials.gov/study/{NCT_ID}`

API version `2.0.5` and a data timestamp dated November 18, 2026 were observed during handoff preparation. Recheck the current schema and supported query parameters during implementation. The API documentation pages depend on JavaScript; inspect actual JSON/OpenAPI data when a text-only browser cannot read them. Use official documentation and actual responses rather than an unofficial wrapper's assumptions.

Expected fields include `identificationModule`, `statusModule`, `conditionsModule`, `armsInterventionsModule`, `designModule`, `eligibilityModule`, and `contactsLocationsModule` under `protocolSection`. Preserve the fields needed for full eligibility review, including raw criteria and available protocol-document links, as well as location-specific status, coordinates, and contacts. Confirm optionality and enum values against real responses.

Retrieve broad disease pools with versioned synonym/query definitions, deduplicate by NCT ID, and exhaust pagination before claiming a complete retrieval. A `RECRUITING` study filter alone cannot answer the location question. Add direct NCT lookup for known trials even when they fall outside the default active pool. Record coverage limits and query provenance. Handle basket studies, disease synonyms, empty arrays, missing location status, and missing coordinates explicitly.

Store enough provenance to reproduce a result: query version, source API version/data timestamp, fetch time, successful refresh time, per-study last posted update and status verification date where present, and eligibility-text hash. A study update date is not a site confirmation date. Preserve source date precision, including month-only dates, without inventing a day. Keep retrievedAt, registryUpdatedAt, and any clinician/site confirmation date distinct.

## Recommended technical approach

Use a shared read-only data layer for public registry records and run ZIP/radius and clinical-context filtering locally where practical. Fetch public disease pools independently of an individual patient's ZIP or detailed clinical context. This supports caching and limits repeated registry requests. Load the finder and its data lazily; do not import a large trial corpus into every article bundle.

Preferred architecture: a bounded ingestion script produces versioned normalized JSON by disease and a coverage/refresh manifest; a scheduled job refreshes those public files in durable storage; the browser reads the last complete successful version. Existing Vercel Blob support may be reusable, but verify credentials, storage policy, costs, and a supported refresh execution path. Do not assume an existing TTS or Rounds secret authorizes a new storage setup. A read-only Vercel endpoint can expose a manifest or validated direct NCT lookup if needed; avoid an unrestricted proxy.

The implementation plan should choose the simplest workable persistence and refresh mechanism in this deployment. A checked-in static snapshot with a documented scheduled refresh is an acceptable fallback if runtime storage is unavailable, provided it actually refreshes and its age is visible. Account for full-site build cost if refreshes trigger deployment. Do not finish with only the six mockup studies or a manual-only refresh passed off as live search.

Proposed initial refresh target: daily, with a visible warning after 48 hours without a successful refresh. Make the thresholds configurable and show exact freshness dates. Retain the last good snapshot on network, schema, or pagination failures; never replace it with a partial or empty retrieval. Publish new files and their manifest atomically by version so users cannot load a mixture of revisions. An empty result from a successfully completed query must be distinguishable from a failed query.

Use bounded timeouts, retry/backoff for rate limits, validated input, response-size limits, and a completed-pagination check. Keep raw downloads and logs outside client bundles. Do not make upstream availability part of the main Docusaurus build succeeding. Distinguish cached/stale results, unavailable data, and a genuine zero-result search in the UI.

Use a licensed and documented nationwide ZIP coordinate source. A Census ZCTA is an approximation and is not identical to every postal ZIP. Do not silently substitute a city center or wrong ZIP for an unsupported location. Registry coordinates can also be coarse or inconsistent: distance is approximate straight-line distance, not travel time, and an obviously inconsistent facility/address/coordinate combination should be flagged or have distance withheld. Missing geocodes may appear in a clearly labeled unlocated list; do not pretend those sites are nearby.

All patient identifiers and free-text medical notes are outside scope. Do not send selected clinical context, a ZIP/diagnosis combination, or patient data to analytics, error trackers, third-party AI, email services, or a public database. Persist only study/site shortlist identifiers by default; keep clinical inputs in memory. Share links should carry public study/site identifiers rather than patient context. Inspect existing site analytics and URL-state behavior before adding filters.

A public admin editor, institutional accounts, automated coordinator outreach, protected referral submission, patient-record integration, and enrollment/consent are later projects. A source-bound staff-maintained confirmation overlay can be designed into the data model without claiming confirmations that have not happened.

## Repository integration map

Paths below were inspected on November 18, 2026. Proposed new paths are suggestions, not existing files.

| Path | Purpose |
| --- | --- |
| `docs/08-resources/index.mdx` | Existing Resources hub; add a finder entry and update its description if needed. |
| `sidebars.ts` | Existing manual `resourcesSidebar`; add the same entry in the same order as the hub. |
| `docs/08-resources/clinical-trial-finder.mdx` | Proposed wrapper, title, short explanation, source links, and finder component. Set/verify the intended slug and actual route. |
| `src/components/ClinicalTrialFinder/` | Proposed React UI with component-scoped styles and accessible controls. |
| `src/lib/clinical-trials/` | Proposed pure normalization, classification, distance, and filtering functions. |
| `src/data/clinical-trial-finder/` | Proposed types, disease taxonomy, aliases, source-bound cohort annotations, and version schema. Keep it separate from published trial appraisals. |
| `scripts/clinical-trials/` | Proposed retrieval, pagination, validation, refresh, and coverage-report scripts. |
| `api/` | Existing Vercel functions: `tts.ts`, `rounds-sync.ts`. Add an endpoint only if the selected architecture needs it. |
| `src/components/PatientHandouts.tsx` | Existing resource/gallery interaction patterns, local persistence, and SSR considerations. |
| `src/css/custom.css` | Existing design tokens, dark mode, shared resource styles. |
| `src/data/clinical-evidence/`, `src/components/EvidenceExplorer.tsx` | Existing appraised trial evidence; do not use it as the enrollment database or change it to make the finder work. |
| `docusaurus.config.ts` | Existing Library menu already links Resources. Avoid a new top-level menu; check route metadata/search and bundle behavior. |
| `vercel.json`, `scripts/ignore-vercel-build.js` | Existing deployment behavior and authoring-only build skips. Preserve routes, headers, and existing APIs. |
| `.github/workflows/ci.yml` | Existing lint, typecheck, tests, build, and browser checks. |
| `.github/workflows/literature-watch.yml` | Existing quarterly literature collection, not a suitable unchanged cadence for enrolling-trial data. Keep its scope intact. |

The project is Docusaurus 3.10.2 / React 19 with Node 24 in the inspected package configuration. API routes already coexist with a static Docusaurus build. The current build-size cap is 250 MB; avoid large duplicate JSON imports. At handoff creation, branch `main` matched `origin/main`; `.claude/launch.json` had a pre-existing tracked modification and there were many unrelated untracked reports. Reinspect before editing; stage only this project's files and never sweep unrelated work into a commit.

The finder may link to WHITWIKI's existing disease reference pages where useful, but this request does not authorize changes to that checkout. Keep the finder reusable enough for a later explicit integration without building that integration now.

## Attached concept and historical records

`concept-october-28.html` is a copy of the prior interactive concept fragment. It contains six selected October 28 registry snapshots and two demo ZIP centers, 94304 and 19147. It is a visual/interaction reference only. It has no live fetch, a full ZIP database, comprehensive trial coverage, or actual enrollment integration. Its Codex-specific host helpers need replacement in production React.

Original location: `/Users/joyboy/.codex/visualizations/2026/10/29/01a18557-68b0-7fa0-b0d2-1ec73503550e/gu-trial-finder.html`. The original registry response is `registry-snapshot.json` in that directory. The original had 20 interaction/data checks and a syntax check; browser visual inspection was blocked by the file-URL policy. Those checks do not establish production functionality, current cohort openings, or visual QA of the integrated feature.

Requery these IDs as useful development examples. They are a starting set, not a coverage strategy:

| NCT ID | Example | Registry observation on November 18, 2026 |
| --- | --- | --- |
| NCT04628767 | EA8192, preoperative high-grade UTUC | Overall recruiting; Stanford location marked recruiting; posted update November 18. |
| NCT04640623 | SunRISe-1, TAR-200 | Active, not recruiting; posted update November 3. |
| NCT06211764 | SunRISe-5, TAR-200 | Active, not recruiting; posted update November 3. |
| NCT06567743 | Cretostimogene NMIBC study | Overall recruiting; posted update September 3. |
| NCT06503614 | ENHANCE | Overall recruiting; posted update October 5. |
| NCT04752722 | LEGEND, EG-70 | Overall recruiting; posted update August 7. |

Machine-readable retrieval metadata is in `source-check-november-18.json` alongside this handoff. These observations come from the individual API records at handoff preparation, not coordinator confirmation. The registry status can change before implementation. Validate cohort criteria from a fresh source; do not infer a particular papillary cohort is still open from the table.

## Implementation sequence

1. Inspect current instructions, routing, styling, APIs, test setup, and worktree state. Read this brief and the concept. Propose the integrated page design, retrieval coverage, matching rules, and refresh architecture before substantial changes. Resolve only decisions that materially change scope or introduce a paid service.
2. Build the pure data adapter, model, fixture coverage, ZIP handling, and filtering/ranking logic. Exercise the two required clinical scenarios, ambiguity states, and location-status conflicts before UI polish.
3. Build the native WARWIKI finder, source-linked cohort details, site contact panels, shortlist, and copy/print referral-preparation summary. Include basic GU-wide search and clearly scoped structured filters.
4. Connect real retrieval and a working refresh path. Add source-bound cohort annotations and document the source, reviewer status, and behavior when annotations become outdated. Re-fetch the seed studies and additional cancers, sites, and basket studies for representative coverage checks.
5. Integrate the Resources hub/sidebar, metadata, search discoverability, and actual canonical route. Validate the complete workflow on mobile and desktop, with keyboard navigation and both themes.
6. Run required checks, inspect the final diff, then follow the standing publishing instructions for completed work: commit only this feature and push to `main`. Verify deployment and report separately what was built, what is live, what data was refreshed, and what clinical/site confirmations remain unperformed.

## Acceptance checks

The feature is ready when the following can be demonstrated:

- It is reachable from the Resources hub and manual sidebar, with a working canonical URL and unchanged existing site navigation.
- A fresh full retrieval, rather than six fixed examples, supplies the results. Each supported cancer family has a representative retrieval check; the coverage manifest records query strategy, pagination completion, and known limits.
- High-grade UTUC and papillary-only HG Ta after BCG produce inspectable population/cohort reasons. CIS-required studies do not appear as confirmed papillary-only matches, and unknown CIS/BCG status remains unknown.
- Multiple cohorts do not become one overbroad eligibility rule. Changed supporting criteria invalidate the corresponding reviewed exclusion rule.
- A nearby nonrecruiting site plus a distant recruiting site never becomes a nearby recruiting match. Missing and contradictory site statuses have explicit states.
- Study deduplication, separate study/site counts, nearest qualifying-site sorting, nationwide search, radius boundaries, missing coordinates, and leading-zero ZIPs work.
- Acronym, NCT, intervention/alias, institution, and sourced investigator search work; direct NCT lookup can show a closed trial and why it is excluded from enrolling results.
- Contacts come from the right location or are clearly central; absence of a contact never results in an invented coordinator. Study-team confirmation and slots are never inferred from registry status.
- Copy/print produces a useful study/site summary without patient identifiers; shortlist persistence does not retain clinical context by default.
- Successful zero results, partial/failed retrieval, stale cached data, unsupported ZIP, and missing geocode are distinct experiences. A failed refresh preserves the last complete good snapshot.
- Refresh execution, last-success reporting, a configurable stale threshold, and version-consistent publication work in the deployed environment.
- SSR/hydration is stable; no browser-only API runs on the server. Network data cannot inject HTML. Aborted/out-of-order responses cannot overwrite a newer search.
- Phone and narrow-screen layouts, keyboard controls, screen-reader labels/status updates, light/dark mode, and a complete search-to-summary flow are checked in an actual browser. Report any unavailable browser check explicitly.
- Required repository checks pass: `npm run lint`, `npm run typecheck`, appropriate Vitest/maintenance tests, `npm run build`, relevant existing browser checks, and `git diff --check`. Review new clinical prose/annotations under the applicable claim-review rules; technical success is not clinician sign-off.
- The 250 MB build cap and existing APIs remain intact. No patient context, identifiers, or clinical query strings are captured in telemetry or public URLs.

Use deterministic fixtures for dangerous filtering cases and API failure/pagination behavior. Keep fresh-network smoke checks separate from deterministic tests so changes in recruitment or site counts do not break tests merely because the registry changed.

## What remains for Claude

The handoff and historical concept exist. No integrated route, React component, data pipeline, refresh job, or enrollment workflow has been implemented in WARWIKI. Claude should choose and implement the documented architecture, validate real coverage and cohort rules, and complete the current repository's review and publishing process. Treat any new service setup, missing credentials, or owner-only enrollment facts as concrete setup items rather than silently substituting demo data.
