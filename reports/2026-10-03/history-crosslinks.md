# History and profile cross-links (October 3, 2026)

Goal: a reader on a clinical or technique page reaches the people and history behind it in one click, without cluttering the page.

## Method

- Candidate map built from repo data: inverted `src/data/surgeon-citations/*.json`, profile Contributions bullets (with each bullet's DOI matched against page reference lists), profile surnames in page titles, sentences pairing a profiled surname with "described / introduced / developed / first", and outbound links from the three History pages (`docs/07-roots/history/`).
- Treatment Atlas 04a was triaged by Claude and calibrated with the user. Codex (read-only) drafted candidates for the other sections; Claude checked every row against the page text and its references before editing.
- Rules applied: link only originators or defining descriptions (named techniques, devices and classifications), or pages whose exact topic has a History section. Guideline panel members, trial investigators and large-series authors were not linked (the Mayo 1,082-case AUS cohort on the AUS device page was the one user-approved exception). Every attribution is backed by a reference already on the page or on the profile; no new historical claims or references were added.
- Placement: the existing attribution name was turned into a link wherever possible (no new words). Otherwise one short "see the History…" clause or sentence went in the page's own history section or orientation paragraph, or one bullet in an existing See Also. No new sections, callouts, bios or photos.

## Result

81 pages touched, 103 links added: 65 profile links (43 surgeons) and 38 History links. Commits: `a8d00c98`, `cff18683`, `f7f022b0`, `b5f06e48`, `c5dc38b4`, `60247924`, `8d12de07`.

| Section | Pages | What was linked |
|---|---|---|
| AUS (device and procedure) | 2 | AUS History section; Mulcahy (double cuff), Montague (long-term continence), Linder (Mayo cohort) |
| Urethral reconstruction (04a) | 26 | McAninch, Jordan (VS-EPA, Jordan flap, with Andrich and Mundy on non-transecting), Kulkarni, Barbagli, Palminteri, Morey and Zinman (Q-flap), Vanni and Zinman, Erickson, Joshi, Nikolavsky, Webster (AAU), Morey (7-flap PU), Xu (colonic mucosa), Blaivas (vaginal tubularization); History sections for Orandi, Johanson, Blandy, EPA, Waterhouse, Sachse DVIU and the male urethroplasty hub |
| Urinary diversion (04c) | 7 | Hautmann, Thüroff and Hohenfellner (Mainz I), Fisch and Hohenfellner (Mainz II), Ghoneim (Mansoura), Artibani (VIP), Stein and Skinner (T-pouch, Double T) |
| Incontinence, prolapse, fistula (04f–04h) | 14 | McGuire (pubovaginal sling), Comiter (Virtue), Wilson (transscrotal AUS), DeLancey (Michigan four-wall); History for Burch, TVT, Le Fort, sacrocolpopexy, SSLF, McCall, Manchester-Fothergill, Kelly, Sims, mesh controversy |
| Sexual dysfunction, GAS, cosmetic (04j–04l) | 10 | Mulcahy (distal corporoplasty), Morey (submuscular reservoir), Wilson (modeling), Devine (Devine–Horton graft), Lue (16-dot), Burnett (Snake), Djordjevic (Belgrade), Alter (central wedge); History for Michal revascularization, Nesbit, Chang–Hwang RFFF |
| Foundations and Evaluation | 13 | Gelman (visualizing sound, RUG adapter), Herschorn (S-dilators), McAninch (circular flap, sonourethrography), Kulkarni (spiral graft), Sultan (occult sphincter injury), Bump (POP-Q); History for the IPP, malleable prosthesis, Foley catheter, Kelly clamp, buccal mucosa graft |
| Clinical conditions and PFUI | 10 | DeLancey (levels, two pages), Madersbacher, Goh, Erickson (LSE), Levine (microdenervation), Webster (PFUI repair, with History); History See Also on urethral stricture, ED, lichen sclerosus and Peyronie's |

04ab, 04b, 04d, 04e, 04m and the drug-coated balloon page: no candidate met the rules.

## Notable skips

- **Senior-author techniques** (by user calibration on Sliding-T): Rourke (Sliding-T), Zhao and Shakir (robotic bladder flap urethroplasty), Flynn (subtrigonal inlay), Chen–Berli shaft-only phalloplasty.
- **Thin or derivative attributions:** Warner endoscopic urethroplasty (single case), augmented perineal urethrostomy (first author unprofiled), Yang–Monti ileal ureter (Ghoneim applied another's principle), Kock pouch (Skinner adapted it), urethral-sphincter-fistula organ-sparing repair ("Kaufman and Vanni group as described in reviews").
- **No attribution sentence to link:** VED (Osbon), intracavernosal injections (Virag, Brindley), PDE5 inhibitors, buried penis (Pariser–Santucci appears only in a heading), DeLancey hammock on the female SUI page (caption only), urodynamics nomograms (table labels).
- **Too generic for the History section:** robotic posterior urethroplasty, drug-coated balloon, uterosacral suspension, pessaries, anterior colporrhaphy, IC/BPS, obstetric fistula (Hamlin section), hypospadias lifelong care, Peyronie's drug page (Xiaflex section only).
- **Surname collisions rejected:** Lewis Wall ("wall"), David Richardson (Maurice Howe Richardson retractor), Lee Zhao (Zhao XW, Zhao YQ), Yue-Min Xu (other Xus), Melissa Kaufman (Kaufman DA), Irwin Goldstein (Goldstein M), Howard Goldman (PFUI classification is Goldman SM), Rufus Cartwright (Cartwright PC), Dae-yul Yang (Yang–Monti eponym not established as him), Donald Skinner (Ormond Skinner Culp).

## Flags for later (not changed)

- **Orandi:** the Orandi flap page says Amin Orandi; the History of Urethral Surgery section says Ahmad Orandi.
- **Mulcahy salvage date:** the prosthetics History heading says 1991; the penile-implant infection page and the Mulcahy profile cite the 1996 report. Salvage links were withheld until reconciled.
- **Turner-Warwick:** the Turner-Warwick retractor page gives his death as 2010; his profile and the urethral History page say 2020.
- **Bogoras:** the malleable prosthesis page spells "Bogaraz"; the History page and its reference spell "Bogoras".
- **Singapore flap:** the page calls Zinman the "originator" of the perineal-artery flap, which needs a source check.
- **Urethral stricture page:** the "Devine Classification (Spongiofibrosis Depth)" heading is uncited, and the Devine profile does not support it.
- **Reference details:** DeLancey 1992 title and pages differ between the apical-prolapse page and his profile; Madersbacher 1990 is in *Paraplegia* on the page and *Spinal Cord* on the profile (same DOI); Comiter 2014 page range differs by one page between the Virtue page and his profile.
- **PFUI History link:** the target heading is "Webster and Goldwasser (1986–1991)", while the page sentence cites Webster and Ramon (1991); the section body covers both.
