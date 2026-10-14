# Site-wide podcast matching (owner request, October 14, 2026) — CANDIDATE LIST ONLY

Owner: "Site wide add podcasts to relevant pages; for SUI add 'Management of Female Stress Incontinence and Pelvic Organ Prolapse' by BackTable Urology." The SUI example is already done (see `## Podcasts` in `docs/03-clinical-conditions/03a-storage-incontinence/sui-female.mdx`, component `src/components/PodcastCards.tsx`).

Repository: /Users/joyboy/Documents/WARWIKI/warwiki. Do NOT edit any MDX or source file. Write only inside `reports/2026-10-14/podcasts/`.

## Task

1. Build an episode catalog (`catalog.tsv`: show, ep, title, year, guests, url, one-line topic) from podcasts with stable per-episode web pages, focused on reconstructive urology, functional urology/neurourology, urogynecology, male incontinence and prosthetics, Peyronie's, GU trauma, urinary diversion, gender-affirming GU surgery, pelvic pain/sexual medicine:
   - BackTable Urology (backtable.com/shows/urology/podcasts/<n>/<slug>) and BackTable OBGYN (backtable.com/shows/obgyn/podcasts/...): walk the full episode lists.
   - SUFU podcast, AUA (AUAUniversity / AUA podcasts with per-episode pages), Grand Rounds in Urology podcast episodes, ICS/IUGA/AUGS podcasts if they have per-episode pages.
   - Also the 57 entries already in `docs/08-resources/podcasts.mdx` (some point to show pages only; those cannot be page matches).
   Skip episodes whose primary subject is stones/endourology or urologic oncology (out of scope), and pediatric-primary topics.
2. Match episodes to WARWIKI pages (`docs/**/*.mdx`). A match requires the episode's MAIN subject to be the page's topic (a sling episode goes on the sling/SUI pages, not on every pelvic floor page). Up to 3 episodes per page; one episode may go on up to 3 pages. Prefer clinical/operative episodes over career or industry chat. Quality over coverage: a wrong match is worse than none.
3. Check every candidate URL returns HTTP 200 (curl -sIL) and that the page title matches the episode title.
4. Output `candidates.tsv` with columns: page_path, episode_title, show (e.g. "BackTable Urology, Ep. 66"), year, guests (comma-separated names as listed, or blank), url, match_reason (≤15 words), confidence (high/medium). Exclude low confidence. Sort by page_path.
5. Write `REPORT.md`: counts (episodes catalogued per show, pages matched, candidates by confidence), shows skipped and why, and any episodes that should be added to the Podcast Library page (`library-additions.tsv` with feed id, topic id from podcasts.mdx, title, ep, guest, url, year, one-sentence takeaway).
