# Task: narrative biographies for senior WARWIKI surgeon profiles (author pass)

Repo: /Users/joyboy/Documents/WARWIKI/warwiki (read-only for you except the work folder below).
Work folder (write here only): reports/2026-10-26/surgeon-biographies-r2/

## Goal
The owner wants real narrative biographies for older, historically important surgeons on WARWIKI's surgeon profiles
(docs/07-roots/surgeons/{a-g,h-r,s-z}/*.mdx). NOT a list of training posts (the "Training and career" card already covers that).
An actual story: what problem the surgeon took on, what they changed in the field, turning points, how their ideas spread,
character where documented. Not every surgeon gets one: only where published narrative sources exist (journal obituaries,
society tributes/In Memoriam pieces, historical articles, autobiographical lectures, oral histories, Festschrift pieces,
named-lecture tributes, museum/society history pages such as the BAUS Virtual Museum, Didusch/AUA history, ICS/IUGA/AUGS/SUFU
tributes). Skip anyone where only CV facts exist.

Model: docs/07-roots/surgeons/s-z/richard-turner-warwick.mdx has a "## Biography" section between the sp-facts card and
`<a id="contributions"></a>`. Your sections go in the same place with the same heading "## Biography". Keep ours shorter than
Turner-Warwick's: 3 to 5 paragraphs (about 250 to 500 words), plain prose, no ### subsections, no quotes block, no honours table.
Read STYLE.md (especially sections 11 and 12): direct statements, no hype ("legendary", "visionary", "giant"), no hedging or
audit notes, no relevance lists. Do not repeat the training card line by line. Use they/them unless a source states pronouns
(an obituary using he/she counts as a source; then use what it uses).

## Step 1: round-2 list (owner, October 26)
This is round 2. Round 1 (October 20) wrote 10 biographies; its shortlist with the narrative sources it found is
reports/2026-10-20/surgeon-biographies-work/shortlist.md, and its finished drafts in that folder's drafts/ show the
expected format and quality. Write biographies for these 15, whose narrative sources round 1 already found:
Sanjay Kulkarni, Peter Dwyer, Donald Ostergard, Harold Drutz, Bozo Kralj, Carl-Gustaf Nilsson, Douglas Marchant,
Eckhard Petri, Oscar Contreras Ortiz, Paul Riss, Hugh Shingleton, Richard Hautmann, Alan Wein, John Mulcahy, Tom Lue.
Start from the sources listed for each in that shortlist; open each again and confirm it; you may add further narrative
sources you find and open. The Didusch Museum pages bar AI use: do not use them. Write `shortlist.md` in your work folder
(one row per name: profile path, WRITE/SKIP, sources opened, reason for SKIP). If a name's sources turn out to be too thin
for 3 paragraphs of story (problem, change, spread, character), write a shorter 2-paragraph section only if every sentence
is sourced, otherwise SKIP it.

## Step 2: drafts
For each WRITE candidate write `drafts/<profile-id>.md` containing:
1. `BIOGRAPHY:` the ready-to-paste MDX block starting with `## Biography`.
2. `FOOTNOTES:` the new footnote definitions to append before `</SurgeonProfile>`.
3. `CLAIMS:` a table: every sentence's factual claims -> footnote -> the exact supporting passage (short quote, under 30 words)
   from the source.
Citation rules (strict):
- Every factual sentence ends with a footnote `[^N]`. Profiles use GFM footnotes `[^N]: ...` at the bottom (look at the
  existing file). Reuse an existing footnote number when you cite the same source already defined in that profile; NEW
  footnotes must use numbers higher than any existing footnote number in that file (check, including unused numbers).
- Only real, opened sources. Resolve every DOI at doi.org/Crossref and every PMID at PubMed; confirm author, year, title.
  Web pages: give title, publisher, URL, "Accessed October 2026." Format like the existing footnotes in the file.
- Nothing from memory. Never infer nationality, birth/death dates or death itself without a source saying so.
- Do not contradict the existing training card or Key Publications in that file; if a source contradicts them, note it under
  `CONFLICTS:` in the draft instead of writing it.
- No patient-identifying content. No claims of "first" or "father of" unless a source states it, and then attribute
  ("described by X as ...") only if it is the source's judgment.
If, while drafting, the sources turn out to be CV-only, move the candidate to SKIP in shortlist.md and do not write a draft.

Finish by writing `final-summary.md`: WRITE list, SKIP count, any problems. Do not edit any file outside the work folder.
