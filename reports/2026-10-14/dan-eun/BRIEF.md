# Add a Surgical Genealogy profile for Daniel D. Eun (owner request, October 14, 2026)

Owner: "Add Dan Eun to surgical genealogy. Not GURS but a huge impact on recon." He already exists as a bare node (`id: 'daniel-eun'`) in `src/data/surgeons.ts` (around line 632) with no profile page.

Repository: /Users/joyboy/Documents/WARWIKI/warwiki. Read CLAUDE.md sections "Surgeon Profiles" and the October 2 profile-criteria note, and STYLE.md. Do NOT run `npm run build` (the orchestrator builds), do not commit, do not touch other profiles' content.

You may write only:
- `docs/07-roots/surgeons/a-g/daniel-eun.mdx` (new)
- the `daniel-eun` entry in `src/data/surgeons.ts`, plus adding `'daniel-eun'` to a mentor's `traineeIds` or setting `mentorId` on a trainee that already exists in the file, only when verified
- `reports/2026-10-14/dan-eun/` (notes, report)

## Steps

1. Research his career from primary institutional sources (Temple Health / Lewis Katz School of Medicine faculty page, society pages, TURNS members page if listed, CoRRU, peer-reviewed bios). Record each fact's URL. Never guess: medical school, residency, fellowship (and with whom), current position and leadership roles must each be sourced; omit what you cannot verify.
2. Find his WARWIKI-cited work: `grep -rl "Eun D" docs` (about 11 pages: robotic buccal mucosa graft ureteroplasty, robotic bladder neck / VUAS reconstruction, downward nephropexy, ICG, ureteral stricture, simple prostatectomy, etc.). Contributions must name real papers he authored, each with its DOI resolved against Crossref (`curl -s https://api.crossref.org/works/<doi>`; confirm title, first author, year, journal) and a "Cited on WARWIKI:" link to the page path that cites it (use the URL form other profiles use; strip numeric top-level prefixes).
3. Write the profile MDX exactly following the house template of `docs/07-roots/surgeons/s-z/lee-zhao.mdx` (frontmatter `title`, `hide_title: true`; imports of `SurgeonProfile`, `@site/src/data/surgeon-profiles/daniel-eun.json` as `profile`, and `@site/src/data/surgeon-citations/daniel-eun.json` as `citations`; "Training and career" card in `<div className="sp-facts">` with bold-labeled bullets; "Contributions" with an opening sentence and 3-5 bullets of verified signature work; footnotes with accessed dates "Accessed October 2026"). No "Known for" heading, no superlatives, no "pioneer". Keep it factual and brief like the Zhao page.
4. Update the `daniel-eun` entry in `src/data/surgeons.ts`: add `path: 'a-g/daniel-eun'`, `name` as his professional name (e.g. 'Daniel D. Eun'), `title`, `institution`, `country`/`countryFlag` (career base, sourced), `photo` (a hotlinked URL of his official institutional headshot that returns HTTP 200 with an image content type; omit if none), and mentor/trainee links only where a source states the training relationship (for example whether Ziho Lee, who has a profile, trained with him). Keep the entry where it is unless a school/section placement is clearly more correct; explain any move in the report.
5. Check: `node scripts/genealogy/gen-profile-lineage.js` (or whatever the prebuild uses to generate `src/data/surgeon-profiles/*.json` and `surgeon-citations/*.json`; find it in package.json) runs without error and creates the two JSON files for daniel-eun. Run `npm run lint:links` and `npm run lint:orphans`.
6. Write `reports/2026-10-14/dan-eun/REPORT.md`: every fact with its source URL, every DOI with its Crossref check result, links added, anything unverified and omitted.
