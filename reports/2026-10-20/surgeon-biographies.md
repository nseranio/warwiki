# Surgeon profile biographies (October 20, 2026)

Narrative `## Biography` sections were added to 10 senior or historically important surgeon profiles, modeled on Richard Turner-Warwick's. They tell what problem each surgeon took on, what changed and how the work spread, without repeating the "Training and career" card.

## Method

- Codex (gpt-6-sol) searched for narrative sources for 64 candidates (school roots in `DYNASTIES`, every deceased profile, senior society figures) and drafted biographies with a claim-by-claim table quoting the supporting passage for each sentence (`surgeon-biographies-work/shortlist.md`, `drafts/`).
- A separate Codex verifier reopened every source, resolved the DOIs, checked each sentence and the footnote numbering, and returned FIX for all 10 drafts (mainly causal or interpretive wording the sources do not support, and one date-order error for Zinman); corrected text in `surgeon-biographies-work/verify/`.
- Claude read the corrected drafts, cut remaining interpretive filler, fixed attribution (Hale is Douglass Hale; Devine "among the founders" of GURS rather than sole founder), and folded the old short sections into the narrative: the CV-style biographies of Ingelman-Sundberg, Hinman and Robertson were replaced, and the duplicate "The Lahey Center", "The EVMS Fellowship" and "The UCSF Fellowship" sections were merged into the new biographies (their facts and footnotes kept).
- The claim gate (`gate.py pending`) found no gated claims on these profiles (surgeon profiles are outside its scope). Lint and build pass.

## Profiles with a new biography

| Surgeon | Profile | Sources |
|---|---|---|
| Axel Ingelman-Sundberg | `docs/07-roots/surgeons/h-r/axel-ingelman-sundberg.mdx` | Drutz HP. *Int Urogynecol J* 2010;21:259–260, doi:10.1007/s00192-010-1105-5 (new footnote 6) |
| Charles J. Devine Jr. | `docs/07-roots/surgeons/a-g/charles-devine.mdx` | Jordan GH, tribute in *SPU Dialogues* (existing footnote 2); EVMS fellowship sentence keeps existing footnote 1 |
| Donald G. Skinner | `docs/07-roots/surgeons/s-z/donald-skinner.mdx` | Daneshmand S, "In memoriam," Keck School of Medicine of USC, 2025 (existing footnote 3) |
| Frank Hinman Jr. | `docs/07-roots/surgeons/h-r/frank-hinman.mdx` | *San Francisco Chronicle* obituary, 2011 (existing footnote 4); Johns Hopkins professorship history (existing footnote 1) |
| Jack McAninch | `docs/07-roots/surgeons/h-r/jack-mcaninch.mdx` | "Celebrating Jack McAninch," UCSF Department of Urology, 2014 (existing footnote 2) |
| Jack R. Robertson | `docs/07-roots/surgeons/h-r/jack-robertson.mdx` | Drutz HP. *Int Urogynecol J* 2015;26:1717–1718, doi:10.1007/s00192-015-2844-0 (existing footnote 1); IUGA and AUGS president years keep existing footnotes 3 and 4 |
| Leonard N. Zinman | `docs/07-roots/surgeons/s-z/leonard-zinman.mdx` | Brezniak Funeral Directors obituary, 2021 (existing footnote 1, also republished in the *Hartford Courant*); existing footnote 2 for his 50 years at Lahey |
| Linda Cardozo | `docs/07-roots/surgeons/a-g/linda-cardozo.mdx` | Robinson D, "In Loving Memory of Linda," IUGA, 2023 (new footnote 4) |
| Stuart L. Stanton | `docs/07-roots/surgeons/s-z/stuart-stanton.mdx` | Dwyer PL, "In Memory of Stuart Stanton," ICS, 2024 (existing footnote 2) |
| J. Thomas Benson | `docs/07-roots/surgeons/a-g/thomas-benson.mdx` | Hale DS. *Int Urogynecol J* 2009;20:3–4, doi:10.1007/s00192-008-0730-8 (new footnote 3) |

## Narrative source found, not written in this pass (candidates for a second round)

- **Sanjay Kulkarni:** Narrative interview found; deferred behind deceased profiles in this ten-draft pass.
- **Peter Dwyer:** Narrative interview found; deferred behind deceased profiles.
- **Donald Ostergard:** IUGA history/interview found; not selected within the ten-draft limit.
- **Harold Drutz:** Retirement tribute found; not selected within the ten-draft limit.
- **Bozo Kralj:** IUGA retrospective found; briefer historical sketch than selected tributes.
- **Carl-Gustaf Nilsson:** IUGA historical sketch found; deferred in this ten-draft pass.
- **Douglas Marchant:** Substantial memorial found; deferred behind selected profiles with reconstructive or continence turning points.
- **Eckhard Petri:** IUGA historical sketch found; deferred in this ten-draft pass.
- **Oscar Contreras Ortiz:** IUGA retrospective found; deferred in this ten-draft pass.
- **Paul Riss:** IUGA memorial found; deferred in this ten-draft pass.
- **Hugh Shingleton:** Society program tribute found; deferred behind profiles with a fuller problem-to-method narrative.
- **Richard Hautmann:** First-person career narrative found; deferred behind deceased profiles.
- **Alan Wein:** Narrative interview found; deferred behind deceased profiles.
- **John Mulcahy:** First-person career narrative found; deferred behind deceased profiles.
- **Tom Lue:** First-person career narrative found; deferred behind deceased profiles.

## Skipped (only career or CV facts found)

- **Allen Morey:** Faculty and publication summaries; no substantial opened narrative source retained.
- **George Webster:** Faculty and publication summaries; no substantial opened narrative source retained.
- **Gerald Jordan:** GURS and profile sources identify institutional role, but no substantial opened person-specific narrative retained.
- **Charles DeProsse:** Detailed life obituary found; limited account of the evolution of his urogynecologic methods.
- **Shlomo Raz:** Faculty and achievements pages; no substantial opened personal narrative retained.
- **Linda Brubaker:** Faculty and achievements pages; no substantial opened personal narrative retained.
- **Roger Dmochowski:** Faculty and achievements pages; no substantial opened personal narrative retained.
- **Kathleen Kobashi:** Faculty and achievements pages; no substantial opened personal narrative retained.
- **Mickey Karram:** Faculty and achievements pages; no substantial opened personal narrative retained.
- **Edward McGuire:** Opened institutional sources are career summaries, insufficient for a story. Didusch page was not used because it expressly bars AI use.
- **James Gibson:** No confirmed person-specific narrative source retained; name searches returned unrelated people.
- **Michael Aronson:** Obituary/CV facts only; no substantial field narrative confirmed.
- **Saul Boyarsky:** Family obituary has biographical facts, but little documented development of his surgical ideas.
- **Ernest Kohorn:** Opened obituary is largely career and family chronology.
- **Glenn Hurt:** No opened narrative source beyond profile career citations retained.
- **Paul Hodgkinson:** No confirmed person-specific narrative source retained.
- **Conrad Sweeting:** Funeral notice mainly gives life and career chronology.
- **Henry Thiede:** No substantial opened narrative source retained beyond memorial facts.
- **John Stein:** Search lead to an obituary, but full source was not opened and confirmed.
- **Eric Glen:** Historical and profile citations give career facts; no substantial opened narrative retained.
- **Rudolf Hohenfellner:** Career-history and publication summaries; no substantial opened personal narrative retained.
- **Joachim Thuroff:** Career and publication summaries; no substantial opened narrative retained.
- **Anthony Mundy:** Career and publication summaries; no substantial opened narrative retained.
- **Paul Abrams:** Interviews and career summaries located, but no substantial opened narrative retained for this pass.
- **Jerry Blaivas:** Career and publication summaries; no substantial opened narrative retained.
- **Helmut Madersbacher:** Career and society summaries; no substantial opened narrative retained.
- **Mohamed Ghoneim:** Career and publication summaries; no substantial opened narrative retained.
- **Ramon Virasoro:** Career and publication summaries; no substantial opened narrative retained.
- **Guido Barbagli:** Career and publication summaries; no substantial opened narrative retained.
- **Mamdouh Koraitim:** Career and publication summaries; no substantial opened narrative retained.
- **Drogo Montague:** Career and publication summaries; no substantial opened narrative retained.
- **Steven Wilson:** Career and publication summaries; no substantial opened narrative retained.
- **Bob Shull:** Career and publication summaries; no substantial opened narrative retained.
- **Peggy Norton:** Career and publication summaries; no substantial opened narrative retained.
- **John DeLancey:** Career and publication summaries; no substantial opened narrative retained.
- **Gary Leach:** Career and publication summaries; no substantial opened narrative retained.
- **Michael Chancellor:** Career and publication summaries; no substantial opened narrative retained.
- **Lewis Wall:** Career and publication summaries; no substantial opened narrative retained.
- **Anne Cameron:** University of Michigan reported current activity in 2026; do not treat as deceased. The opened source is an award notice, not a historical narrative.

## Issues found along the way

- **Didusch Museum pages:** the Edward McGuire page states its content may not be used by AI. McGuire's existing profile cites it as footnote 1; consider a replacement source.
- **GURS founding year:** Jordan's Devine tribute gives 1986; the Zinman obituary gives 1987. Both biographies omit the year.
- **IUGA founding year:** the ICS Stanton tribute gives 1975; the profiles and IUGA history give 1976. The Stanton biography omits the year.
