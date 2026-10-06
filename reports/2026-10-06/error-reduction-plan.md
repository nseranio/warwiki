# WARWIKI error reduction plan

Prepared October 6, 2026 against repository revision `1e1b54f8`. This is a proposed execution plan. It does not certify the site's accuracy or resume the audit by itself. The companion [Claude execution prompt](claude-error-reduction-prompt.md) starts the work when the owner gives it to Claude.

The priority is to make verification trustworthy, find errors across every published surface, correct their causes, and measure what remains with fresh independent reviews. More passes with the same prompt and the same blind spots will have diminishing returns. Literal zero cannot be established by AI review; the operational target is zero known critical errors, zero unjustified verification records, and progressively smaller measured residual error with explicit uncertainty.

## What the current evidence establishes

| Observation | Consequence for this plan | Repository evidence |
|---|---|---|
| The full-site second review covered 1,036 content pages; indexes and surgeon profiles were excluded. Index claims were subsequently brought into the gate. | Inventory current published surfaces rather than inheriting an old page denominator. | [Second review](../2026-10-04/full-site-second-review.md), [latest reliability pass](../2026-10-04/residual-error-sample.md#reliability-pass-after-the-cleanup-october-5-late-night) |
| Three historical random samples reported 1.57, 1.37, then 0.83 serious accuracy errors per page. The third affected 13/30 pages. | This is errors per page, not a percentage. The final random sample predates subsequent fixes and is not a measurement of current HEAD. | [Residual samples](../2026-10-04/residual-error-sample.md) |
| A later Claude cross-check found zero high-severity findings on 20 selected pages following targeted repair. | Useful evidence about those pages; it cannot establish a site-wide zero rate. | [Reliability pass](../2026-10-04/residual-error-sample.md#reliability-pass-after-the-cleanup-october-5-late-night) |
| `gate.py stats` at the preparation revision reports 361 active `source-needed` claim units, including dose and guideline claims. Claim kinds overlap. | Unknown support must remain unknown in metrics and release rules. Raw historical ledger counts are a different denominator. | [Claim gate](../../scripts/review/gate.py) |
| The gate accepts a hash's presence, regardless of its verdict. Its hash strips citations/link targets and omits surrounding context. | An unresolved claim can pass; a citation or table-context change can retain stale verification. Repair this before expanding the audit. | `gate.py`: `norm`, `key`, `unverified` |
| Rejected proposed fixes can become `ok-verifier`; applied edits can be recorded by fuzzy overlap with current claims. | Rejection of a correction does not prove the original correct. Similar text does not establish support for the final statement. | `gate.py`: `record` |
| CI already includes lint, TypeScript, unit/maintenance tests, build and blocking Chromium browser tests. | Extend existing coverage; do not rebuild controls that already exist or call Chromium coverage cross-browser coverage. | [CI](../../.github/workflows/ci.yml), [Playwright configuration](../../playwright.config.ts) |
| CI and the Vercel skip script ignore `reports/**`, which contains claim-gate inputs. The handbook says Vercel can deploy despite failed CI. | Changes to safety-relevant ledger/policy inputs must trigger checks; verify production promotion settings separately. | [CI](../../.github/workflows/ci.yml), [skip script](../../scripts/ignore-vercel-build.js), [handbook](../../CLAUDE.md) |
| Retraction checking queries only DOIs absent from its cache. | A previously checked paper can acquire a later notice without being checked again. Add refresh and pagination/completeness controls. | [Retraction checker](../../scripts/refs/retractions.py) |

The gate findings are defects in assurance, not proof that every affected clinical statement is wrong. Counts, platform settings and available models must be refreshed when execution starts.

## Scope and boundaries

The main execution covers the active website: clinical and foundational articles, hubs, visible and hidden routes, imported tables/databases, reference bindings, figures/captions, videos, search, navigation, accessibility, APIs, code, build and deployment behavior. Inventory history, lineage/profile data and publicly served handouts too, so exclusions cannot disappear from a coverage count.

Respect the handbook's separate authorization boundaries. Surgeon-profile content audits, handout clinical rewriting/retranslation, WARWIKI Anki and off-repository SmartPhrases/masters remain separate tracks until the owner explicitly activates them. The main execution can check published routes, file availability, stale dependencies and affected-resource lists without rewriting those materials. A global accuracy claim must include these exclusions. Do not create a public template toolkit, new surgical schematics or standalone pediatric-primary pages.

Preserve useful anatomy, technique, device specifications, small-series evidence and history using sources suitable for their claims. Source inaccessibility alone is not grounds to delete substantive teaching. Keep patient data out of the repository and raw source files/working logs in the existing ignored source-work area. Follow `CLAUDE.md`, `STYLE.md` and the content-preservation policy.

## One error register with separate measures

Use one finding record across all tracks: stable ID, root-cause group, path/route and anchor, exact current text or reproducible behavior, content/source/context fingerprints, category, severity, evidence/access state, proposed correction, reviewer, independent verifier, verdict, affected occurrences, tests, applied commit and deployment verification. Claim records also need clinical risk if wrong: a correct dose can require high-risk verification without itself being an error. Preserve event history. A dismissed finding needs a reason; it must not disappear.

| Category | Examples and required checks |
|---|---|
| Clinical facts and operative teaching | Anatomy, decision criteria, diagnostic interpretation, operative sequence, contraindications, complications, follow-up; source-linked scrutiny of qualitative claims too. |
| Quantitative interpretation | Value, numerator/denominator, arm/subgroup, population, intervention, comparator, endpoint definition, follow-up, uncertainty, direction of effect and units. |
| Guidance and regulation | Exact recommendation and strength, version/date, population, jurisdiction, approval versus clearance, labeling versus study regimen. |
| Reference integrity and currency | Correct work and source binding, edition/chapter, DOI/PMID identity, citation drift, retractions, corrections and superseded guidance. |
| Completeness and consistency | Missing consequential warnings/branches, contradictions between condition/technique/hub pages, repeated misattribution, inconsistent data imported into multiple views. |
| Media and derivatives | Figure identity/orientation/labels, caption meaning and reuse credit, video procedure match, accessibility, outdated handout relationships and translation gating. |
| Product and engineering | Routes, anchors, MDX, hydration, component/data contracts, search relevance, state restoration, mobile tables, keyboard use, dark mode and error recovery. |
| Security, privacy and operations | API input validation, authorization, spend/rate controls, dependency exposure, secret/patient-data leakage, caching, failed CI promotion and exact deployed revision. |
| Editorial and provenance | Ambiguous wording, misplaced qualifiers/citations, scope/house-style violations, invented clinical sign-off and misleading review dates. |

Severity is consequence-based: **P0** plausible immediate serious harm, material patient-data exposure or a severe reachable vulnerability; **P1** consequential misinformation, a dangerous omission, broken core clinical lookup or substantial security/accessibility failure; **P2** limited factual or functional error; **P3** presentation/wording defect. Record suspected severity separately from confirmed severity. Disagreement and inaccessible evidence are states, not proof of error.

Keep separate counts for factual errors, consequential omissions, technical defects, editorial findings, source-needed claims and disputed interpretation. Also report both unique root causes and every published occurrence. Do not inflate improvements by counting citation attachment, style polish or duplicate occurrences as independent serious clinical errors.

## Execution sequence

### 1. Freeze the starting state and validate the detectors

Record HEAD, working-tree changes, deployed revision if accessible, current gate states and source backlog. Enumerate MDX/Markdown, generated and imported TS/JSON content, assets, APIs, redirects and actual built routes. Reconcile source inventory with the sitemap and discoverable navigation; a hidden or sitemap-missing route still counts if served. Keep enabled, disabled and protected tracks distinct.

Run current checks once and preserve failures. Create a coverage matrix showing surface × error class × detector × last checked revision × unresolved gaps. A detector returning no findings is different from never examining a surface.

Calibrate extraction and review on a scratch corpus with known historical failures and controlled mutations: wrong endpoint, denominator, table header, citation swap, device model, dose route/unit, missing warning, qualitative overclaim, footnote, JSX/imported data claim, stale source version and omitted reviewer output. Never introduce these mutations into published content. Report missed defects and false positives by class; repair the detectors before claiming exhaustive coverage.

### 2. Repair the claim gate and review pipeline

This is the first implementation batch.

1. Replace ledger membership with validated status and evidence requirements. Separate `verified-supported`, `verified-corrected`, `unverifiable`, `needs-expert`, `stale` and genuinely non-substantive `not-applicable` records. Adapt existing states with an explicit migration; never mass-relabel legacy entries as supported.
2. Bind verification to exact semantic claim, reference identity/content, relevant surrounding qualifiers, table headers/units, imported source data, source version and extraction schema version. A change to any meaning-bearing dependency invalidates it. Formatting-only changes can retain support through a tested semantic fingerprint.
3. Eliminate fuzzy matching as a closure mechanism. Record deterministic final claim IDs and recheck the applied text in its final context. Reference renumbering must preserve source identity. Multi-claim rows need separately scoped bindings.
4. A rejected proposed fix leaves the original supported only when the verifier separately establishes that support. `style`/`voice` cannot supply clinical support; they may preserve an existing valid binding when semantics are unchanged.
5. Validate output schemas and completeness: every expected claim has one valid status, every consequential finding has a verdict, failures and empty/truncated files are not completion. Check return codes and source access; reconcile duplicate IDs, stale snapshots and missing batches.
6. Verify a sample of reviewer `ok` results independently, with 100% independent verification of new/changed high-risk claims (potential P0/P1 consequences if wrong) and P0/P1 corrections. Existing verifiers inspect findings; that alone does not challenge silent false negatives.
7. Cover captions, table headers/cells, footnotes, multiline blocks, MDX components and imported content. Use structured parsing where suitable and reconcile extracted units with rendered content. If a surface cannot yet be parsed reliably, assign explicit manual review; do not report full coverage.
8. Ensure changes to claim ledgers, baseline/exception policy and extraction logic trigger CI. Safety-relevant inputs under `reports/` are not ordinary authoring-only reports.

Use meaningful regression tests for these failures. Migrate incrementally with compatibility tests and a migration summary: preserve historical records/access evidence; retain evidenced support where the binding can be established; mark missing bindings as legacy-unresolved; queue existing high-risk units first. The repaired gate can be implemented before every old claim is reread, while enforcing strict bindings immediately for new/changed claims. Unchanged inaccessible legacy claims can remain under the standing preservation policy with explicit internal status and risk tracking. They must not count as verified. New/changed high-risk claims without sufficient support block release; any exception requires a documented owner decision and expiry, never a fresh bulk baseline.

### 3. Check sources first, then compare every occurrence

Group claims by source and shared concept. Read a source once into a structured fact record, then compare every citing statement and imported display against it. A fact record needs the exact locator and the population/intervention/comparator/endpoint/time/denominator tuple; one verified figure cannot approve all claims citing that paper.

For numbers, independently reproduce the relevant calculation when appropriate, explain rounding, and distinguish percentage points, relative changes, risks, rates and time-to-event estimates. Never recompute a Kaplan–Meier estimate from raw fractions or impose an unsupported interpretation. For treatment guidance, compare the actual recommendation and strength in the current source, not its mention in a review or search snippet.

Use sources according to claim type: current guidelines and major comparative evidence for recommendations; original studies for quoted outcomes; labels/IFUs for doses, compatibility and device specifications; anatomy texts/atlases and technical sources for anatomy and operative teaching; verified primary/archival material for historical assertions where that track is authorized. AI summaries and OpenEvidence are retrieval leads.

Store `not-accessed`, `metadata-only`, `abstract`, `full-text`, `guideline-section`, `label/IFU`, and `conflicting-source` explicitly. Abstracts support only what they contain. For gated details in tables, operative descriptions or subgroup analyses, retrieve the appropriate full text. Reuse prior evidence only when its exact content, locator, scope and current binding can be verified.

Prioritize doses, device warnings, contraindications, emergency branches, indications and consequential counseling figures; then other quantitative and qualitative claims. Do not restrict review to sentences matching number/absolute/guideline regexes. Inspect omissions with a source-based decision checklist; a preference for more detail alone is not a P1 omission.

Every confirmed error triggers a search for other occurrences by study, concept, figure, wording and imported data. Update the authoritative home and all affected surfaces. Record cause → systemic repair → regression check, so fixing one copy does not leave its twins behind.

### 4. Run independent specialist passes

Separate source reading from editorial repair. Use Claude as the single writer/coordinator and a fresh independent reviewer where available. Independent verification means opening the evidence and reaching a verdict; agreement between model outputs is insufficient. Do not share prior conclusions with the residual reviewer before they finish.

Use short, coherent batches and retain the current source-access history. Resolve supported P0/P1 fixes first. Route conflicting guidance or operative judgment to an appropriately qualified clinician with the exact question and source passages; AI must not invent clinical sign-off. Continue other work while source or expert questions remain open.

Add focused passes for anatomy/operative meaning, dose/IFU/regulation, evidence interpretation, and safety omissions. Each has a distinct checklist and source requirements. Use a small calibration pilot to estimate detection quality, source-access success, tokens and time before scaling; choose review settings from those results rather than prescribing ultra reasoning everywhere. Keep runs bounded and serial by default: the handbook warns about usage limits and nested helpers. Set explicit low worker counts; the current orchestrator otherwise defaults to eight reviewers and three verifiers. Increase concurrency only after checking current instructions and resource availability; never overlap writers or builds.

### 5. Complete engineering and media coverage

Preserve the existing blocking Chromium sitemap/component suite. Add representative WebKit/Firefox and mobile behavior, keyboard/focus flows, accessible names, contrast and zoom, dark-mode media, wide tables, hydration in supported timezones, filter/back/forward state, citation previews, search modal/results parity and failure fallbacks. Automated accessibility checks need manual keyboard/reading-order inspection too.

Create a clinician-query benchmark with expected destination, acceptable alternatives and top-three success criteria for common abbreviations, ambiguous terms, synonyms and misspellings. Validate results against the actual deployed search index; local UI tests alone do not establish search relevance.

Inventory external URLs from MDX, TS/JSON, profiles, components and rendered media. Retain the existing quarterly full/monthly sampled link check, but distinguish broken destinations from bot blocks, timeouts, consent gates and temporary failure. Use GET or browser confirmation when HEAD is inconclusive. Third-party images excluded from browser failure checks still need an explicit availability track.

Inspect figures visually against the published figure and caption, videos against the operation and source article, and accessibility/fallback behavior. A working URL cannot establish correct content or reuse rights. Do not create replacement surgical schematics.

Review APIs and dependencies for demonstrable reachable risks, validation, authorization, input bounds, error handling, spending/rate limits, cache isolation and public/private boundaries. Avoid paid production TTS calls merely to test a page. Reconfirm current platform settings and official technical guidance when changing configuration; never report a vulnerability scan as an exploit test.

Refresh retraction/correction caches using timestamps and an explicit refresh option; verify API pagination, query completeness, failed requests and non-DOI references. Add source-update dependencies so a correction, retraction or new guideline invalidates affected verifications. New metadata is a review trigger, not an automatic rewrite.

### 6. Measure residual errors on an untouched sample

Use a predeclared taxonomy and source-evidence standard throughout. Keep the existing 30-page samples as historical evidence, noting differences in counting and detection methods; do not present them as a controlled experiment.

Draw a new reproducible probability sample of 60 current clinical/foundational pages for diagnostic measurement, spanning sessions as needed. The eligible frame includes clinically substantive evaluation, surgical-technique, special-population and hub pages and their imported teaching content. Record the full frame, exclusions, seed, revision and inclusion probabilities before review. Name the result eligible clinical/foundational-page prevalence, not whole-website accuracy. Add a separate targeted sample of high-risk/recently changed pages and protected surfaces when authorized. Never blend targeted yield into the probability-sample estimate; history, protected derivatives and engineering/media coverage need separate statements.

The fresh reviewer sees the frozen pages and sources, without previous findings or proposed edits. Record errors before repairs. Independently adjudicate positives and audit some negatives. Retain every selected page; never replace inaccessible pages or shrink the denominator. Report affected, unknown and fully assessed counts. If a consequential sampled claim cannot be checked, record unknown; the page cannot be called fully checked and error-free, and the zero-error acceptance rule cannot be applied to an incompletely assessed sample. An independent source-grounded reviewer should challenge extracted-claim coverage as well as claim correctness.

Report:

- Serious factual errors per page and proportion of pages with at least one, with confidence intervals appropriate to the actual sampling design.
- Consequential omissions separately, plus a combined serious-defect measure.
- Verified-support coverage and inaccessible/disputed/stale claims by severity.
- Findings and technical-test coverage by surface; critical-path failures separately.
- Unweighted targeted yield separately from probability-sample estimates.

After cause-based repair, use at most one further diagnostic probability sample in the initial execution, then proceed to the preregistered final validation or document why the system is not ready. Further rounds need a stated unresolved failure mechanism and finite objective. Do not turn a repaired sample into evidence of the untouched site's rate. Use page-cluster-aware intervals for claim/error counts and design weights if strata are sampled disproportionately. Publish the scripts and counting rules so another person can reproduce them.

For intuition, if zero pages have detectable serious errors in an independent equal-probability binomial sample, the one-sided 95% upper bound on affected-page prevalence is `1 − 0.05^(1/n)`: about 4.87% for 60 pages, 0.99% for 300. This bounds detectable affected pages under the model, not actual errors, and not errors per page. For sampling without replacement from this finite wiki, use the finite-population calculation; for strata, use a suitable design-based method. Imperfect detection makes all such claims conditional.

Once the repaired controls and diagnostic rounds are stable, preregister one final validation sample and criterion. A proposed stretch target is a 95% upper bound below 1% for pages with detectable P0/P1 factual errors; 300 zero-error pages illustrates the scale under the binomial model, not a mandated token spend. Choose the exact sample size from the current finite frame and current constraints. Do not repeatedly sample until a lucky zero appears or pool repaired rounds. If the criterion is missed or source access is inadequate, report it honestly and continue targeted repair or leave a checkpoint.

### 7. Release, verify and prevent recurrence

For each patch, independently verify final P0/P1 corrections and new high-risk consequential claims; run focused regression checks and the central claim gate. Group validated patches into coherent release checkpoints and run the complete relevant suite before publishing each checkpoint. The coordinator runs builds serially. Scope Git staging to owned files and preserve unrelated work. Honor the standing main-push instruction for completed validated work.

The complete site/code release suite is `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:maintenance`, `npm run build`, `npm run test:e2e`, and `git diff --check`; include new coverage added by this execution. Follow the handbook's mandatory and conditional checks for every commit. Reports-only checkpoints need document/link/data-schema and diff checks, not a site rebuild. Run `npm run status` when filling/adding stubs. Preserve prebuild/postbuild hooks; distinguish meaningful count changes from generated stats timestamps.

Verify CI, deployment and live representative routes for the exact published commit. Check that production promotion waits for the required checks; repository code cannot establish dashboard settings. Configure the gate when authorized access allows it; otherwise report the missing control and the concrete owner action. A successful local build is not successful deployment or clinical clearance.

Maintain per-change checks for semantic claim/source/context edits, data/media/API changes and affected derivative mappings. Add a monthly rotating independent sample and source-notice refresh, plus the existing quarterly evidence review/full-link cadence. Remain within the quarterly clinical-update policy. These are proposed maintenance routines; do not create a new Codex scheduled automation merely from this plan.

For protected derivatives, produce an impact list keyed to source revisions now. When activated, review English handouts against final articles before translations, preserve Anki IDs and search the entire deck for duplicates, and review SmartPhrases off-repo. Keep untranslated/outdated languages out of the public build and never synthesize clinician review dates.

## Definition of done

**Controls complete:** exact support/context bindings; tested invalidation; no closure from fuzzy match, mere membership or rejection; complete batch output validation; scoped safety-input CI triggers; documented coverage exclusions and production gate status.

**Known defects controlled:** no open confirmed P0/P1 on surfaces declared complete; no unresolved new/changed high-risk claim represented as verified; corrections verified against final text and propagated; remaining inaccessible/disputed legacy claims explicit, prioritized and separate from support coverage. Owner-accepted time-limited release exceptions remain open defects and do not justify marking their surfaces complete. Source-blocked surfaces remain incomplete and cannot receive the completion designation.

**Technical release complete:** all required checks for the exact revision pass; no known reproducible critical-path failure; deployment/live verification recorded where access allows it. Protected tracks and unavailable dashboard controls remain explicit incomplete items.

**Residual accuracy measured:** an untouched independent probability sample reports serious factual errors, omissions, uncertainty and unknown source coverage. “Zero detected in N pages at revision X under method Y” is acceptable; “WARWIKI is error-free” is not.

If inaccessible sources, expert decisions or resources prevent completion, deliver the exact source request/decision, completed work, remaining coverage and reproducible next command. Never mark the entire project complete because one pass ends or credits run out.

## Execution artifacts

Keep concise tracked outputs under `reports/quality/`: coverage matrix, versioned error taxonomy, finding register, baseline and residual-measurement reports, unresolved source/expert requests, regression cases and next-session checkpoint. Keep raw source material and detailed per-batch scratch data under the ignored `reports/audit-v2/sources-local/quality/` area. Reuse current tooling rather than create a second incompatible audit system.

The first milestone is the gate/pipeline repair and its migration report. The second is the surface inventory, calibrated detectors and independent diagnostic baseline. Subsequent milestones are source-group repairs, engineering/media closure and final independent measurement. Checkpoint each milestone and each coherent source cluster, roughly 10–20 pages or 20–40 claims, without treating batch size as a limit on eventual coverage. Quality gains must be demonstrated by correct bindings and fresh evidence, not by edit totals.
