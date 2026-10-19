# Codex task: fix existing WARWIKI pages that disagree with the Clinical Evidence trial reports

Repo: /Users/joyboy/Documents/WARWIKI/warwiki. Read CLAUDE.md and STYLE.md §12. Each `reports/2026-10-18/clinical-evidence/work/<id>/notes.md` lists sources used for a trial and disagreements with existing site pages (outside `docs/06-clinical-evidence/`). The trial's verified data are in `src/data/clinical-evidence/trials/<id>.json` (claim-gated; `report.source.file` points to the full text on disk, read the `.txt` beside a PDF or `pdftotext -layout`).

Known items (handbook): prostate-artery-embolization retreatment "not reported"; vesicovaginal fistula page (cystogram, WHO wording, IUGA/ICS); recurrent UTI page antibiotic use vs MERIT; urodynamics page UPSTREAM; energy-devices ThuVARP; sacrospinous-hysteropexy 5-year HR called primary; revi-system page errors; aquablation/greenlight Optilume "2.5%"; pelvic-organ-prolapse line ~322 pre-correction CARE values. Also scan every notes.md for any other page disagreement.

For each disagreement: open the existing page sentence, confirm against the full text on disk (not the trial JSON alone), and make the narrowest correct edit (number, attribution, endpoint label, timepoint), keeping the citation pointing to the right reference (add the correct reference if the page cites the wrong paper; resolve its DOI). If the page is right and the note is wrong, leave it. No caveat sentences, no audit notes on pages.

Rules: do not touch docs/06-clinical-evidence or src/data/clinical-evidence; do not run `npm run build`; run `npm run lint:citations` and `npm run lint:links`; do not commit.

Finish by writing `reports/2026-10-19/page-fixes/REPORT.md`: one row per item (page, old text, new text, source quote with page, or "no change: page correct" with reason), and `reports/2026-10-19/page-fixes/touched.json` (JSON list of edited page paths).
