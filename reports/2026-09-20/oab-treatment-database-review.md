# OAB treatment database — targeted source review (20 September 2026)

Read all 210 original MDX lines of `oab-uui-database.mdx`, including the complete exported treatment rows; reread the changed decision tables and rows. `GenericDatabase.tsx` was also read: it filters and displays these rows, with no imported clinical dataset. This is a **partial claim audit**, not full clinical clearance. The established OAB [pilot](sol-high-oab-pilot.md) was reused for its documented guideline and Botox source leads; the guideline sections needed for this page were checked directly here. The linked Botox procedure page and antimuscarinic/β3 pharmacology hubs were read for cross-page consistency, not re-credited as complete source audits.

## Source coverage

- [AUA/SUFU 2024 idiopathic OAB guideline, publisher-hosted full HTML](https://onlinelibrary.wiley.com/doi/10.1002/nau.25532): read the evaluation statements 1–6, pharmacotherapy 16–22, minimally invasive 23–29, invasive/catheter 30–31 and BPH/OAB 32–33, with adjacent discussions. Official AUA PDF returned 403 on both browser and direct request; no full-PDF or supplement read is claimed.
- [GEMTESA US prescribing information](https://www.gemtesa.com/files/gemtesa-prescribing-information.pdf), revised February 2025: read highlights and sections 1, 2.1, 5.1 and male-BPH safety excerpts. The **US dose is 75 mg once daily** and the male-on-BPH-pharmacotherapy indication is explicit. Full label outside those sections was not adjudicated.
- [BOTOX US prescribing information](https://www.rxabbvie.com/pdf/botox_pi.pdf), PDF marked revised November 2023: read indication/dose highlights, section 5.13 and Table 10. In pooled idiopathic-OAB trials, CIC started in **36/552 (6.5%)** on 100 U versus **2/542 (0.4%)** on placebo. This is neither an NDO rate nor a universal individual prediction.
- [Malcher 2022 primary study](https://pubmed.ncbi.nlm.nih.gov/35686842/): **abstract only**, including the class-exposure adjusted OR 1.48 after &gt;365 defined daily doses. This does not rank tolterodine, trospium or fesoterodine as uniquely safe/unsafe. Full article and other cognitive cohorts remain pending.

## Applied correction and preservation

The database had incorrectly made questionnaire, three-day diary and PVR mandatory in the initial evaluation. The guideline requires history, examination and urinalysis; the others are selective. It also conflated the Grade A recommendation **after inadequate response/intolerance** with the separate Expert Opinion permission for **earlier procedural access**. Both were separated in narrative and selection rows.

The clinical choice table's “vibegron 100 mg most efficacious” wording was unsafe in a US dosing context; it now states the labeled **75 mg daily**, matching the already-correct pharmacology hub. The prior class-wide “highest/best” BTX/SNM/iTNM ranking and fixed trial-to-trial responder comparison were qualified; the 100-U Botox label CIC rate replaced the unlabeled 5.4% retention shorthand. The “trospium does not cross the BBB” and “fesoterodine only dementia-safe agent” absolutes were corrected to limited-penetration and conflicting observational evidence. The augmentation row now says CIC **may** be needed, consistent with guideline counseling.

All treatment categories, procedure links, procedure-comparison rows, database entries and practical navigation remain. Two unsupported middle-risk tiers in the cognitive table were consolidated into one “other agent-specific evidence” row; agent details remain in the linked pharmacology hub. No section or media was removed. The agent-specific pharmacology pages remain the dose/safety source of truth. The site page now links directly to the guideline and relevant labels.

## Still unresolved

The published comparison percentages and device-specific duration/MRI/implant outcomes were not independently rechecked against every original study or current IFU. Neither the full cognitive cohort literature (including Sheyn), the Huang network meta-analysis, every linked procedure, nor the 2024 guideline's full official PDF/supplement was read in this batch. These gaps remain internal; no treatment-class superiority or whole-page clearance is claimed. Epic and new OpenEvidence pulls remain paused.

Local record/hash check, lint, typecheck, 32 unit tests, 58 maintenance tests, production build, rendered-link and 200-MB size checks, and whitespace checks passed. Build output: 131.13 MB. Desktop/mobile renderings were visually inspected; the wide comparison tables remain horizontally scrollable on mobile, with no document-level overflow. These technical checks do not substitute for clinical source review.
