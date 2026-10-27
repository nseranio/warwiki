# Task: adversarial verification of drafted surgeon biographies

Repo: /Users/joyboy/Documents/WARWIKI/warwiki. Work folder (write only here): reports/2026-10-26/surgeon-biographies-r2/
Inputs: drafts/*.md (each has BIOGRAPHY, FOOTNOTES, CLAIMS), and the target profile docs/07-roots/surgeons/*/<id>.mdx.
You did not write these. For every draft:
1. Open every cited source yourself (web; resolve DOIs at doi.org/Crossref, PMIDs at PubMed). Confirm the source exists, is
   about this person, and that the footnote's author/title/year/URL are correct.
2. Check every factual sentence of the BIOGRAPHY against the cited source: supported, partly supported, or unsupported.
   Watch for dates, places, firsts, numbers, names of mentors/trainees, causal claims ("transformed", "led to"), and
   characterisations the source does not make. Check pronouns follow the source.
3. Check footnote numbering against the profile: reused numbers must point to the same source already defined there; new
   numbers must not collide with existing ones. Check nothing contradicts the profile's training card or Key Publications.
4. Check STYLE.md sections 11-12 (no hype, no hedges, no audit notes) and that it reads as a narrative, not a CV list.
Write verify/<id>.md: verdict PASS / FIX / REJECT, a list of problems, and for FIX the exact corrected BIOGRAPHY and
FOOTNOTES blocks (minimal edits: cut or narrow unsupported wording; do not add new unsourced material).
Then write verify/summary.md with one line per draft. Do not edit anything outside the work folder.
