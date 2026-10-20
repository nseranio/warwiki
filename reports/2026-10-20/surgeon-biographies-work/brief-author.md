# Task: narrative biographies for senior WARWIKI surgeon profiles (author pass)

Repo: /Users/joyboy/Documents/WARWIKI/warwiki (read-only for you except the work folder below).
Work folder (write here only): reports/2026-10-20/surgeon-biographies-work/

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

## Step 1: shortlist
Candidates to consider (at least): school roots in DYNASTIES (src/data/surgeons.ts ~line 1178: McAninch, Morey, Webster,
Kulkarni, Devine, Stanton, Cardozo, Dwyer, Ostergard, Drutz, Raz, Brubaker, Dmochowski, Kobashi, Benson, Karram, McGuire);
every deceased profiled surgeon (grep "Born and died" in profiles; also Leonard Zinman, Anne Cameron and any other profile
whose sources record a death); historic senior figures such as Frank Hinman Jr, Jack Robertson, Axel Ingelman-Sundberg,
Eric Glen, Saul Boyarsky, Charles DeProsse, Henry Thiede, Hugh Shingleton, Donald Skinner, Glenn Hurt, Bozo Kralj,
Ernest Kohorn, Carl-Gustaf Nilsson, Conrad Sweeting, Thomas Benson, Linda Cardozo, Edward McGuire, Charles Devine,
Gerald Jordan, Rudolf Hohenfellner, Richard Hautmann, Joachim Thuroff, Anthony Mundy, Paul Abrams, Alan Wein, Jerry Blaivas,
Shlomo Raz, Stuart Stanton, Jack McAninch, George Webster, Donald Ostergard, Harold Drutz, Helmut Madersbacher,
Mohamed Ghoneim, Ramon Virasoro, Guido Barbagli, Sanjay Kulkarni, Mamdouh Koraitim, Drogo Montague, Steven Wilson,
John Mulcahy, Bob Shull, Peggy Norton, John DeLancey, Gary Leach, Michael Chancellor, Tom Lue, Lewis Wall, Frank Hinman.
Skip Richard Turner-Warwick (done). Search the web for narrative sources for each. Write
`shortlist.md`: one row per candidate considered: name, profile path, decision (WRITE / SKIP), sources found (full citation +
URL/DOI/PMID, each opened and confirmed to be about this person), and for SKIP the reason (e.g. "only CV/faculty page",
"living, no narrative source found").
Pick at most 14 WRITE candidates, preferring deceased or retired figures with the richest documented narrative.

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
