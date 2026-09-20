# Content-removal recovery inventory — September 20, 2026

Content/history inventory, not a new clinical or full-source review. All 144 MDX paths modified from 9e36335a through 2e959bbb examined structurally. Specific reports and representative pages/diffs were read to identify preservation exceptions; not all 144 source packages were read.

Comparison: `9e36335a` (last continuation checkpoint before the new truncations) through `2e959bbb`.

**144 changed MDX pages: 135 restore candidates, 5 selective restorations, 4 narrow updates to preserve.** These are editorial recovery dispositions, not clinical verification. 64 contain explicit blanket-deletion wording; many other severe reductions use only an evidence-orientation/boundary label.

A whole-docs textual screen found no additional files outside these 144 paths matching the blanket-removal phrases. This does not certify absence of every other form of overediting.

## Efficient recovery order

| Group | Paths | Restore content | Selective restoration | Preserve |
| --- | ---: | ---: | ---: | ---: |
| Anatomy and physiology | 20 | 20 | 0 | 0 |
| Genital reconstruction | 28 | 25 | 1 | 2 |
| Instruments | 47 | 47 | 0 | 0 |
| Landing | 1 | 0 | 0 | 1 |
| Named flaps | 28 | 28 | 0 | 0 |
| Prolapse techniques | 8 | 4 | 3 | 1 |
| Surgical principles | 7 | 6 | 1 | 0 |
| Surgical stitches | 5 | 5 | 0 | 0 |

Start with instrument pages including Lone Star. Preserve model-specific manufacturer facts and instructions with attribution. Use studies for comparative claims; the absence of a trial is not a reason to delete specifications, established anatomy, named operative descriptions, educational media or historical context. Existing content can remain while selective source checks are pending.

## Corrections to carry forward

- `docs/01-foundations/surgical-principles/barbed-sutures.mdx`: Restore technical/product/anatomic context selectively; preserve removal of deliberate VUA gap instruction, universal VUA standard-of-care and unsupported universal gauge-upsize/brand hierarchy. Keep directly read Li 2015, Zhang 2018 and Hu 2025 study scope and measured endpoints. Bench/animal/case reports can return explicitly as such, not clinical incidence estimates.
- `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrospinous-hysteropexy.mdx`: Restore useful contextual/technical material while retaining SAVE-U specific population/endpoints, SUPeR as Uphold LITE mesh not native tissue and non-proportional hazards, SAM point-D eligibility, and distinction between trial-specific suture placement and universal safe zone.
- `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrohysteropexy.mdx`: Restore useful technical/anatomic material; preserve LAVA 12-month noninferiority framing, limited pregnancy evidence, and endpoint/population caveats. Prior Sep13 source work distinguished mesh removal from exposure and 62/101 seven-year responders; do not resurrect general cure estimates.
- `docs/04-surgical-techniques/04e-genital-reconstruction/defibulation.mdx`: Restore technical detail with appropriate named source; preserve WHO 2025 conditional Type III deinfibulation recommendation, either antepartum or intrapartum timing, patient-controlled partner/family inclusion and no-reinfibulation boundary.
- `docs/04-surgical-techniques/04g-prolapse-repair/mesh-graft-augmented-repairs.mdx`: Restore historical/device/evidence context with dates; retain FDA 2019 transvaginal POP mesh marketing boundary and separate abdominal POP mesh/SUI sling categories. Preserve no prophylactic removal of asymptomatic existing implant solely because present.
- `docs/01-foundations/index.mdx`: Small landing-page wording change, not content deletion.
- `docs/04-surgical-techniques/04e-genital-reconstruction/glans-reconstruction.mdx`: Page expanded; retain added orientation unless separate review identifies a problem.
- `docs/04-surgical-techniques/04e-genital-reconstruction/vulvar.mdx`: TRAM database descriptor corrected; preserve this narrow dependent correction.
- `docs/04-surgical-techniques/04g-prolapse-repair/apical/manchester-fothergill.mdx`: Preserve actual SAM point-D eligibility, 2/212 stenosis, repeat-operation and PGI-I framing, economic setting and pregnancy evidence corrections.

## Ledger and boundary handling

- Retain original audit logs as history, but invalidate content-hash currency for restored pages; mark source status pending selective verification.
- A restored existing page is not a fresh full MDX read or a full-source read and must not inherit a later placeholder review status.
- Keep provenance fields for actual prior scoped checks without implying all restored content was verified.
- Retain actual post-baseline source readings as reusable work; merge only claim-specific corrections instead of preserving blanket deletion.
- Quiz and /clinic removal, hidden History navigation and deployment-excluded patient handouts were user directed and are not candidates.
- Before-baseline SSLF/Burch/PVS erroneous diagram withdrawals and other documented clinical corrections are preserved by content restoration to 9e36335a.
- Do not reset whole Git commits, components, figures, source-read reports or publication records; restore selected MDX content only.

## Per-page recovery map

The JSON includes full revisions/hashes, old/current character and line counts, old headings, source-type clues, prior external-source domains, manufacturer/textbook excerpts and associated audit reports. The table below shows the content loss and exact recovery parent.

| Page | Action | Old → current characters | Change commit | Pre-removal revision |
| --- | --- | ---: | --- | --- |
| `docs/01-foundations/anatomy-physiology/donor-sites/abdominal-wall.mdx` | Restore | 24,173 → 4,839 | `da98f3a0` | `2e3e22bd` |
| `docs/01-foundations/anatomy-physiology/donor-sites/bowel-anatomy.mdx` | Restore | 21,302 → 5,649 | `b0c93a37` | `da98f3a0` |
| `docs/01-foundations/anatomy-physiology/donor-sites/leg-thigh.mdx` | Restore | 24,172 → 4,191 | `2989a8d8` | `b0c93a37` |
| `docs/01-foundations/anatomy-physiology/genitalia/adnexa.mdx` | Restore | 22,823 → 3,462 | `1bfbaa16` | `2989a8d8` |
| `docs/01-foundations/anatomy-physiology/genitalia/cervix.mdx` | Restore | 21,012 → 3,444 | `0d91e408` | `1bfbaa16` |
| `docs/01-foundations/anatomy-physiology/genitalia/female-external-genitalia.mdx` | Restore | 19,035 → 3,372 | `3bfc6a05` | `0d91e408` |
| `docs/01-foundations/anatomy-physiology/genitalia/penis-anatomy-physiology.mdx` | Restore | 25,383 → 5,146 | `6be9395b` | `3bfc6a05` |
| `docs/01-foundations/anatomy-physiology/genitalia/prostate-seminal-vesicle.mdx` | Restore | 20,539 → 5,189 | `02dffc8f` | `6be9395b` |
| `docs/01-foundations/anatomy-physiology/genitalia/testicles-scrotum.mdx` | Restore | 24,283 → 4,436 | `65e6da6c` | `02dffc8f` |
| `docs/01-foundations/anatomy-physiology/genitalia/uterus.mdx` | Restore | 25,388 → 4,815 | `09bbc84d` | `65e6da6c` |
| `docs/01-foundations/anatomy-physiology/genitalia/vaginal-anatomy.mdx` | Restore | 23,395 → 4,474 | `3b819909` | `09bbc84d` |
| `docs/01-foundations/anatomy-physiology/pelvis-support/pelvic-neuroanatomy.mdx` | Restore | 19,564 → 4,050 | `3bce3894` | `f2f97cd6` |
| `docs/01-foundations/anatomy-physiology/pelvis-support/perineum.mdx` | Restore | 33,164 → 5,177 | `7c1ffa9e` | `3bce3894` |
| `docs/01-foundations/anatomy-physiology/pelvis-support/retropubic-anatomy.mdx` | Restore | 14,259 → 3,716 | `44780269` | `7c1ffa9e` |
| `docs/01-foundations/anatomy-physiology/urinary-tract/bladder-anatomy-physiology.mdx` | Restore | 19,812 → 4,739 | `ec362e3c` | `44780269` |
| `docs/01-foundations/anatomy-physiology/urinary-tract/female-urethra.mdx` | Restore | 22,002 → 4,522 | `12509d5a` | `ec362e3c` |
| `docs/01-foundations/anatomy-physiology/urinary-tract/gu-embryology.mdx` | Restore | 29,223 → 4,463 | `db7f8c6f` | `12509d5a` |
| `docs/01-foundations/anatomy-physiology/urinary-tract/male-urethra.mdx` | Restore | 18,161 → 3,769 | `24c4ace4` | `db7f8c6f` |
| `docs/01-foundations/anatomy-physiology/urinary-tract/renal-anatomy-physiology.mdx` | Restore | 14,924 → 5,170 | `bd14b06d` | `24c4ace4` |
| `docs/01-foundations/anatomy-physiology/urinary-tract/ureter-anatomy-physiology.mdx` | Restore | 14,517 → 3,782 | `3f85fc05` | `bd14b06d` |
| `docs/01-foundations/index.mdx` | Preserve | 3,096 → 2,727 | `0c79e1f4` | `3f85fc05` |
| `docs/01-foundations/surgical-principles/barbed-sutures.mdx` | Selective restore | 28,882 → 8,616 | `98600501` | `c657ba89` |
| `docs/01-foundations/surgical-principles/flaps-gu-reconstruction.mdx` | Restore | 34,664 → 5,388 | `68fed3ca` | `e94802cd` |
| `docs/01-foundations/surgical-principles/flaps/anterolateral-thigh.mdx` | Restore | 33,511 → 4,310 | `4099b253` | `0c79e1f4` |
| `docs/01-foundations/surgical-principles/flaps/bilobed.mdx` | Restore | 18,985 → 3,293 | `6aee57af` | `4099b253` |
| `docs/01-foundations/surgical-principles/flaps/bladder-flap.mdx` | Restore | 17,661 → 2,808 | `a64bf057` | `6aee57af` |
| `docs/01-foundations/surgical-principles/flaps/blandy.mdx` | Restore | 14,367 → 3,343 | `387700a1` | `a64bf057` |
| `docs/01-foundations/surgical-principles/flaps/diep.mdx` | Restore | 30,978 → 3,809 | `389a3844` | `387700a1` |
| `docs/01-foundations/surgical-principles/flaps/epap.mdx` | Restore | 14,462 → 2,928 | `88cc3103` | `389a3844` |
| `docs/01-foundations/surgical-principles/flaps/heineke-mikulicz.mdx` | Restore | 12,059 → 2,538 | `8166ae91` | `88cc3103` |
| `docs/01-foundations/surgical-principles/flaps/igap-gluteal-fold.mdx` | Restore | 30,420 → 3,616 | `cf8c09ee` | `8166ae91` |
| `docs/01-foundations/surgical-principles/flaps/ipap.mdx` | Restore | 26,931 → 3,123 | `430b33e3` | `cf8c09ee` |
| `docs/01-foundations/surgical-principles/flaps/island-groin.mdx` | Restore | 32,197 → 3,344 | `5673c329` | `430b33e3` |
| `docs/01-foundations/surgical-principles/flaps/labia-majora-fasciocutaneous.mdx` | Restore | 16,849 → 3,747 | `f33c8e5d` | `5673c329` |
| `docs/01-foundations/surgical-principles/flaps/lotus-petal.mdx` | Restore | 24,891 → 3,033 | `a654fd95` | `f33c8e5d` |
| `docs/01-foundations/surgical-principles/flaps/mcfap.mdx` | Restore | 25,082 → 3,023 | `bf8115dc` | `a654fd95` |
| `docs/01-foundations/surgical-principles/flaps/medial-thigh.mdx` | Restore | 21,760 → 3,259 | `2cfe47ef` | `bf8115dc` |
| `docs/01-foundations/surgical-principles/flaps/pmtp-propeller.mdx` | Restore | 29,091 → 2,888 | `d29b1e8c` | `2cfe47ef` |
| `docs/01-foundations/surgical-principles/flaps/posterior-thigh.mdx` | Restore | 22,484 → 3,056 | `e75ca745` | `d29b1e8c` |
| `docs/01-foundations/surgical-principles/flaps/propeller-flap.mdx` | Restore | 23,751 → 2,779 | `018a61d7` | `e75ca745` |
| `docs/01-foundations/surgical-principles/flaps/radial-forearm.mdx` | Restore | 29,968 → 3,849 | `290487c6` | `018a61d7` |
| `docs/01-foundations/surgical-principles/flaps/rhomboid-limberg.mdx` | Restore | 19,091 → 2,981 | `3e3fad45` | `290487c6` |
| `docs/01-foundations/surgical-principles/flaps/scip.mdx` | Restore | 21,031 → 3,813 | `9e1b3013` | `3e3fad45` |
| `docs/01-foundations/surgical-principles/flaps/singapore-pudendal-thigh.mdx` | Restore | 30,689 → 3,500 | `48e8d302` | `9e1b3013` |
| `docs/01-foundations/surgical-principles/flaps/tfl.mdx` | Restore | 27,532 → 2,594 | `f78d10a4` | `48e8d302` |
| `docs/01-foundations/surgical-principles/flaps/tram.mdx` | Restore | 33,629 → 3,162 | `bf98d6a5` | `f78d10a4` |
| `docs/01-foundations/surgical-principles/flaps/v-y-advancement.mdx` | Restore | 19,433 → 3,766 | `31e86ebc` | `bf98d6a5` |
| `docs/01-foundations/surgical-principles/flaps/vastus-lateralis.mdx` | Restore | 28,323 → 3,617 | `3bb29449` | `31e86ebc` |
| `docs/01-foundations/surgical-principles/flaps/vram.mdx` | Restore | 26,705 → 3,616 | `76f2b7ca` | `3bb29449` |
| `docs/01-foundations/surgical-principles/flaps/y-v-plasty.mdx` | Restore | 17,420 → 3,628 | `cad39393` | `76f2b7ca` |
| `docs/01-foundations/surgical-principles/flaps/z-plasty.mdx` | Restore | 20,748 → 4,630 | `e94802cd` | `cad39393` |
| `docs/01-foundations/surgical-principles/needles.mdx` | Restore | 14,937 → 3,854 | `81e349c3` | `68fed3ca` |
| `docs/01-foundations/surgical-principles/plastic-surgery-principles.mdx` | Restore | 10,645 → 2,801 | `dc6dff2c` | `81e349c3` |
| `docs/01-foundations/surgical-principles/reconstructive-ladder.mdx` | Restore | 12,177 → 2,632 | `1f8464e1` | `dc6dff2c` |
| `docs/01-foundations/surgical-principles/surgical-ergonomics.mdx` | Restore | 23,541 → 2,915 | `aba750b6` | `1f8464e1` |
| `docs/01-foundations/surgical-principles/sutures.mdx` | Restore | 28,961 → 4,853 | `13c80477` | `aba750b6` |
| `docs/01-foundations/surgical-skills/heaney-stitch.mdx` | Restore | 2,366 → 1,642 | `36fba8ba` | `13c80477` |
| `docs/01-foundations/surgical-skills/locking-stitch.mdx` | Restore | 4,915 → 1,858 | `36fba8ba` | `13c80477` |
| `docs/01-foundations/surgical-skills/parker-kerr-stitch.mdx` | Restore | 6,804 → 1,376 | `36fba8ba` | `13c80477` |
| `docs/01-foundations/surgical-skills/quilting-stitch.mdx` | Restore | 26,381 → 2,710 | `36fba8ba` | `13c80477` |
| `docs/01-foundations/surgical-skills/suture-lubrication.mdx` | Restore | 10,166 → 2,195 | `36fba8ba` | `13c80477` |
| `docs/01-foundations/tools/instruments/endoscopy/collins-knife.mdx` | Restore | 9,667 → 3,056 | `7289b23c` | `36fba8ba` |
| `docs/01-foundations/tools/instruments/endoscopy/flexible-cystoscope.mdx` | Restore | 17,345 → 4,484 | `bc49e80a` | `7289b23c` |
| `docs/01-foundations/tools/instruments/endoscopy/flexible-ureteroscope.mdx` | Restore | 15,994 → 3,358 | `8fd62777` | `bc49e80a` |
| `docs/01-foundations/tools/instruments/endoscopy/resection-loop.mdx` | Restore | 15,143 → 1,998 | `a269ed14` | `8fd62777` |
| `docs/01-foundations/tools/instruments/endoscopy/resectoscope.mdx` | Restore | 13,962 → 2,311 | `a269ed14` | `8fd62777` |
| `docs/01-foundations/tools/instruments/endoscopy/rigid-cystoscope.mdx` | Restore | 13,781 → 2,047 | `a269ed14` | `8fd62777` |
| `docs/01-foundations/tools/instruments/endoscopy/semi-rigid-ureteroscope.mdx` | Restore | 14,385 → 2,187 | `a269ed14` | `8fd62777` |
| `docs/01-foundations/tools/instruments/endoscopy/vaporization-electrode.mdx` | Restore | 15,669 → 1,947 | `a269ed14` | `8fd62777` |
| `docs/01-foundations/tools/instruments/forceps/adson.mdx` | Restore | 6,858 → 1,547 | `d300f3c0` | `a269ed14` |
| `docs/01-foundations/tools/instruments/forceps/bonney.mdx` | Restore | 13,202 → 1,621 | `d300f3c0` | `a269ed14` |
| `docs/01-foundations/tools/instruments/forceps/debakey.mdx` | Restore | 15,458 → 1,650 | `d300f3c0` | `a269ed14` |
| `docs/01-foundations/tools/instruments/forceps/gerald.mdx` | Restore | 10,187 → 1,568 | `d300f3c0` | `a269ed14` |
| `docs/01-foundations/tools/instruments/forceps/iris.mdx` | Restore | 7,138 → 1,510 | `d300f3c0` | `a269ed14` |
| `docs/01-foundations/tools/instruments/forceps/kittner.mdx` | Restore | 6,045 → 1,120 | `8eafae2a` | `d300f3c0` |
| `docs/01-foundations/tools/instruments/forceps/lahey.mdx` | Restore | 8,646 → 1,633 | `8eafae2a` | `d300f3c0` |
| `docs/01-foundations/tools/instruments/forceps/ring-forceps.mdx` | Restore | 6,347 → 1,198 | `8eafae2a` | `d300f3c0` |
| `docs/01-foundations/tools/instruments/forceps/russian.mdx` | Restore | 6,617 → 1,530 | `ce386f2b` | `8eafae2a` |
| `docs/01-foundations/tools/instruments/forceps/singley.mdx` | Restore | 5,642 → 1,567 | `ce386f2b` | `8eafae2a` |
| `docs/01-foundations/tools/instruments/forceps/wangensteen.mdx` | Restore | 6,587 → 1,518 | `ce386f2b` | `8eafae2a` |
| `docs/01-foundations/tools/instruments/graft-harvest/dermatome.mdx` | Restore | 11,167 → 1,460 | `87ea8a90` | `ce386f2b` |
| `docs/01-foundations/tools/instruments/graft-harvest/drum-dermatome.mdx` | Restore | 10,332 → 1,323 | `87ea8a90` | `ce386f2b` |
| `docs/01-foundations/tools/instruments/graft-harvest/goulian-dermatome.mdx` | Restore | 8,805 → 1,340 | `87ea8a90` | `ce386f2b` |
| `docs/01-foundations/tools/instruments/graft-harvest/humby-dermatome.mdx` | Restore | 11,774 → 1,293 | `0e860b50` | `87ea8a90` |
| `docs/01-foundations/tools/instruments/graft-harvest/mesher.mdx` | Restore | 13,314 → 1,185 | `0e860b50` | `87ea8a90` |
| `docs/01-foundations/tools/instruments/graft-harvest/padgett-dermatome.mdx` | Restore | 8,120 → 1,258 | `0e860b50` | `87ea8a90` |
| `docs/01-foundations/tools/instruments/graft-harvest/zimmer-air-dermatome.mdx` | Restore | 8,228 → 1,272 | `0e860b50` | `87ea8a90` |
| `docs/01-foundations/tools/instruments/needle-holders/castroviejo.mdx` | Restore | 1,286 → 920 | `afc0dedf` | `0e860b50` |
| `docs/01-foundations/tools/instruments/needle-holders/heaney.mdx` | Restore | 17,454 → 1,056 | `afc0dedf` | `0e860b50` |
| `docs/01-foundations/tools/instruments/needle-holders/mayo-hegar.mdx` | Restore | 11,503 → 1,076 | `afc0dedf` | `0e860b50` |
| `docs/01-foundations/tools/instruments/needle-holders/olsen-hegar.mdx` | Restore | 7,377 → 963 | `afc0dedf` | `0e860b50` |
| `docs/01-foundations/tools/instruments/needle-holders/ryder.mdx` | Restore | 15,423 → 1,098 | `afc0dedf` | `0e860b50` |
| `docs/01-foundations/tools/instruments/needle-holders/turner-warwick-ryder.mdx` | Restore | 6,883 → 998 | `4dcc7b78` | `afc0dedf` |
| `docs/01-foundations/tools/instruments/retractors/adson-beckman.mdx` | Restore | 8,446 → 937 | `4dcc7b78` | `afc0dedf` |
| `docs/01-foundations/tools/instruments/retractors/army-navy.mdx` | Restore | 11,881 → 954 | `4dcc7b78` | `afc0dedf` |
| `docs/01-foundations/tools/instruments/retractors/balfour.mdx` | Restore | 7,809 → 932 | `4dcc7b78` | `afc0dedf` |
| `docs/01-foundations/tools/instruments/retractors/bookwalter.mdx` | Restore | 10,630 → 1,036 | `4dcc7b78` | `afc0dedf` |
| `docs/01-foundations/tools/instruments/retractors/breisky.mdx` | Restore | 7,560 → 969 | `da9e2154` | `4dcc7b78` |
| `docs/01-foundations/tools/instruments/retractors/collins.mdx` | Restore | 11,845 → 943 | `da9e2154` | `4dcc7b78` |
| `docs/01-foundations/tools/instruments/retractors/deaver.mdx` | Restore | 11,356 → 951 | `da9e2154` | `4dcc7b78` |
| `docs/01-foundations/tools/instruments/retractors/denis-browne.mdx` | Restore | 8,929 → 971 | `da9e2154` | `4dcc7b78` |
| `docs/01-foundations/tools/instruments/retractors/gelpi.mdx` | Restore | 6,692 → 898 | `da9e2154` | `4dcc7b78` |
| `docs/01-foundations/tools/instruments/retractors/graves.mdx` | Restore | 10,208 → 916 | `14577c47` | `da9e2154` |
| `docs/01-foundations/tools/instruments/retractors/heaney-retractor.mdx` | Restore | 1,004 → 871 | `14577c47` | `da9e2154` |
| `docs/01-foundations/tools/instruments/retractors/langenbeck.mdx` | Restore | 15,741 → 940 | `14577c47` | `da9e2154` |
| `docs/01-foundations/tools/instruments/retractors/lighted-retractors.mdx` | Restore | 13,502 → 954 | `14577c47` | `da9e2154` |
| `docs/01-foundations/tools/instruments/retractors/lone-star.mdx` | Restore | 11,271 → 975 | `14577c47` | `da9e2154` |
| `docs/01-foundations/tools/instruments/retractors/malleable.mdx` | Restore | 12,849 → 970 | `2e959bbb` | `14577c47` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/aoap-flap.mdx` | Restore | 19,183 → 6,491 | `46a022b2` | `cffa35a4` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/bipedicled-anterior-scrotal-flap.mdx` | Restore | 12,836 → 6,469 | `b7fb5c29` | `46a022b2` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/cecil-culp-procedure.mdx` | Restore | 28,149 → 5,378 | `2bb4fb63` | `fe133d21` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/defibulation.mdx` | Selective restore | 10,805 → 4,952 | `31a0a451` | `2bb4fb63` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/epap-hemi-scrotal-flap.mdx` | Restore | 23,045 → 4,006 | `5efa46b4` | `31a0a451` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/fgm-fat-grafting.mdx` | Restore | 22,993 → 4,421 | `da921d1f` | `5efa46b4` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/foldes-clitoral-reconstruction.mdx` | Restore | 13,156 → 5,643 | `6a73f757` | `da921d1f` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/genitourinary-vca.mdx` | Restore | 22,367 → 6,654 | `9174b3e2` | `6a73f757` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/glans-reconstruction.mdx` | Preserve | 2,525 → 4,533 | `926ba3c0` | `9174b3e2` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/glans-resurfacing.mdx` | Restore | 29,095 → 4,729 | `2d3494c7` | `926ba3c0` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/glansectomy-stsg.mdx` | Restore | 20,041 → 4,420 | `096deca6` | `2d3494c7` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/glanuloplasty-flaps.mdx` | Restore | 19,261 → 5,014 | `5ee2cc4d` | `096deca6` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/gulino-everted-urethral-flap.mdx` | Restore | 22,154 → 4,154 | `c4fda34a` | `5ee2cc4d` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/inverted-urethral-flap.mdx` | Restore | 24,098 → 4,182 | `c4f03b00` | `c4fda34a` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/manero-vaginal-graft.mdx` | Restore | 11,129 → 3,747 | `586ecde7` | `c4f03b00` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/mazza-scrotal-flap-glanuloplasty.mdx` | Restore | 23,425 → 3,853 | `294bc956` | `586ecde7` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/muranyi-scrotal-tunnel-flap.mdx` | Restore | 14,648 → 3,332 | `ddf72cb6` | `294bc956` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/paraffinoma-excision.mdx` | Restore | 15,234 → 4,452 | `3b923d20` | `ddf72cb6` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/penile-replantation.mdx` | Restore | 23,710 → 3,613 | `2851ee69` | `3b923d20` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/perineoplasty-de-adhesion.mdx` | Restore | 14,929 → 3,684 | `5dae2b32` | `2851ee69` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/reverse-anterior-scrotal-flap.mdx` | Restore | 17,781 → 3,322 | `4857f52b` | `5dae2b32` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/shaeer-rectus-myofascial-neoglans.mdx` | Restore | 23,276 → 3,462 | `731af77a` | `4857f52b` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/staged-scrotal-flap.mdx` | Restore | 17,666 → 3,795 | `e623b025` | `731af77a` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/testicular-prosthesis.mdx` | Restore | 21,633 → 4,279 | `a8e7ee4d` | `e623b025` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/testicular-reimplantation.mdx` | Restore | 15,363 → 4,397 | `993da926` | `a8e7ee4d` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/total-anterior-scrotal-flap.mdx` | Restore | 20,398 → 3,065 | `c29b77bb` | `993da926` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/ventral-slit-scrotal-flap.mdx` | Restore | 17,066 → 2,817 | `2e3e22bd` | `c29b77bb` |
| `docs/04-surgical-techniques/04e-genital-reconstruction/vulvar.mdx` | Preserve | 31,332 → 31,155 | `31e86ebc` | `bf98d6a5` |
| `docs/04-surgical-techniques/04g-prolapse-repair/apical/laparoscopic-lateral-suspension.mdx` | Restore | 18,472 → 7,612 | `5eb7f5b6` | `57ae0aa0` |
| `docs/04-surgical-techniques/04g-prolapse-repair/apical/manchester-fothergill.mdx` | Preserve | 16,133 → 15,581 | `0bf58891` | `98600501` |
| `docs/04-surgical-techniques/04g-prolapse-repair/apical/pectopexy.mdx` | Restore | 24,155 → 7,850 | `57ae0aa0` | `86e6914f` |
| `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrohysteropexy.mdx` | Selective restore | 20,906 → 7,746 | `c657ba89` | `9e36335a` |
| `docs/04-surgical-techniques/04g-prolapse-repair/apical/sacrospinous-hysteropexy.mdx` | Selective restore | 14,574 → 8,048 | `c657ba89` | `9e36335a` |
| `docs/04-surgical-techniques/04g-prolapse-repair/mesh-graft-augmented-repairs.mdx` | Selective restore | 19,722 → 5,751 | `a12356f9` | `5eb7f5b6` |
| `docs/04-surgical-techniques/04g-prolapse-repair/posterior-enterocele/halban-culdoplasty.mdx` | Restore | 13,921 → 4,906 | `cffa35a4` | `f849bdf2` |
| `docs/04-surgical-techniques/04g-prolapse-repair/posterior-enterocele/moschcowitz-procedure.mdx` | Restore | 12,507 → 5,550 | `f849bdf2` | `a12356f9` |
