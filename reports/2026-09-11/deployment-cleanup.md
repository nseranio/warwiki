# Vercel cleanup and maintenance activation — September 11, 2026

## Completed cleanup

GitHub and Vercel sign-ins are verified as `nseranio`. The existing user authorization covered publishing maintenance workflows and deleting obsolete builds.

**41 obsolete WARWIKI deployments were deleted: 40 successful builds and one canceled build.** The initial inventory contained 45 deployments; workflow release `76cadfd4` completed while cleanup was being prepared, making 46 before removal. The final paginated inventory at 15:43 UTC lists **five retained deployments**. No project, domain, Git history, source handout or local user file was deleted.

Before deletion, the actual `warwiki.org` alias was resolved and its READY state checked independently of the project's latest deployment pointer. Each candidate was checked for project identity, terminal state and current per-deployment aliases. Normal Vercel deletion was used, without force or purge. Every requested deletion returned success. Sanitized per-deployment responses and retained records are in [deployment-cleanup.json](deployment-cleanup.json).

Preserved releases:

| Deployment | Role |
|---|---|
| `dpl_5R8JGtynK4mvVmxfT9YhrWzS8vWR` | Live at cleanup completion; commit `76cadfd4` |
| `dpl_2Quu6iDEhcmxuksPpZTXmfgfQSft` | Verified reliability release; commit `eccd245a` |
| `dpl_3UCi5xVkFqt2eE9aZLXJLF8g7mgH` | Verified known-good smaller rollback; commit `a7768dd4` |
| `dpl_6hnPCcTifxbBU8MhvZmEn7maecwX` | Still has an active branch alias |
| `dpl_BWGTDxwMoKAGCW8zTyErDZqBCMYz` | Canceled handoff deployment, conservatively retained |

All eight alias records were preserved. Two older branch aliases reference IDs absent from the deployment listing; those IDs and aliases were left untouched. The live release may advance with subsequent validated changes; this table records the cleanup checkpoint.

## Storage accounting and prevention

The measured site output is about **140 MB**, compared with **566 MB** before handouts were excluded. Every production build enforces a **200 MB maximum**. Deployments are restricted to `main`, and report-only changes are skipped. All four Vercel retention categories already use 30 days; no retention or paid-plan change was needed.

The dashboard's refreshed 12-month view showed 14.72 GB while deletion was underway; the today view showed 0 B, which is not treated as a reliable post-cleanup measurement. The Hobby CLI usage endpoint returned `Costs not found (404)`. Therefore this report does **not** claim that measured account usage is already under 10 GB. Recheck the meter after accounting catches up: Vercel uses daily maxima/time-weighted storage, so old usage does not disappear retroactively. [Vercel storage accounting](https://vercel.com/docs/deployment-storage)

Thirty-day retention alone does not guarantee removal of old successful builds: current policy protects recent READY production and nonproduction releases, along with alias-related exceptions. The smaller output and limited deployment frequency reduce future accumulation. [Retention exceptions](https://vercel.com/docs/deployment-retention)

## Monthly checks now active

- Published workflows: `8881cd95`, `d592751e`, `76cadfd4`, all on Node 24.
- [CI 34617018910](https://github.com/nseranio/warwiki/actions/runs/34617018910): passed.
- [Literature watch 34617072232](https://github.com/nseranio/warwiki/actions/runs/34617072232): passed; artifact downloaded and inspected, 1,618 metadata candidates across seven topics, June 3–September 11. These are not 1,618 verified updates.
- [External links 34617068341](https://github.com/nseranio/warwiki/actions/runs/34617068341): executed correctly and uploaded its report; two DOI 404s caused an intentional failure. Both source identities were subsequently verified and corrected in the source files. A repeat cloud run will be recorded after publication.

GitHub collects literature on the first of each month at 06:23 UTC and checks links at 07:13 UTC. The existing local Codex editor runs on the second day and now explicitly prioritizes major guidelines, large trials, Cochrane reviews and practice-impacting evidence. See [maintenance.md](maintenance.md) for availability and inactivity limitations.
