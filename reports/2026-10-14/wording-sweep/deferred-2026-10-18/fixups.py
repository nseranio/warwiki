#!/usr/bin/env python3
"""Hand fixes after apply_fixes.py for the nine pages where a held-back edit left a reference uncited
(orphans.py). Evidence the deletion would have lost is restored as a plain statement; a caveat-only sentence
gets its source moved to the statement it supports. Run from the repo root, once, after apply_fixes.py."""
import pathlib
def ed(f, a, b):
    p = pathlib.Path(f); t = p.read_text(); assert a in t, (f, a[:60]); p.write_text(t.replace(a, b, 1))
G = "docs/04-surgical-techniques/"
# Redmond comparator kept without its non-transfer sentence
ed(G + "04a-urethral-reconstruction/graft/palminteri-double-face.mdx",
   "namely in tight or near-obliterative strictures.<sup>[[3]](#ref3)</sup>\n\n---",
   "namely in tight or near-obliterative strictures.<sup>[[3]](#ref3)</sup>\n\nA single-center retrospective cohort (221 augmented anastomotic repairs and 286 dorsal onlays) associated augmented anastomotic repair with more recurrence than pure dorsal onlay (adjusted HR 4.8, p = 0.002).<sup>[[13]](#ref13)</sup>\n\n---")
# lb:t12-32: Pfitzenmaier figures kept as a Mainz I result
ed(G + "04c-urinary-diversion/indiana-pouch.mdx", "\nRenal comparisons need similar care.",
   "\nIn Pfitzenmaier's 94-patient Mainz I cohort, 37% used alkali and B12 supplementation was recommended in 32%, including some patients with low-normal B12 results.<sup>[[22]](#ref22)</sup>\n\nRenal comparisons need similar care.")
# ba:t13-03: Kaiser T-pouch ileostomy data kept; only the non-transfer sentence goes
ed(G + "04c-urinary-diversion/kock-pouch.mdx", "\nThe urinary reconstruction choice should balance bowel availability",
   "\nThe T-pouch valve was later adapted for continent ileostomy. Kaiser's first report described six patients with complete continence, and his 10-year analysis of 40 patients (median follow-up 6.2 years) reported questionnaire-based good continence in 92%, pouch-related major abdominal surgery in 30% and willingness to repeat the operation in 87.5%.<sup>[[34]](#ref34)[[35]](#ref35)</sup> The urinary reconstruction choice should balance bowel availability")
# bb:t21-06
ed(G + "04e-genital-reconstruction/gulino-everted-urethral-flap.mdx",
   "technique-specific perfusion data.<sup>[[5]](#ref5)[[6]](#ref6)</sup>\n",
   "technique-specific perfusion data.<sup>[[5]](#ref5)[[6]](#ref6)</sup>\n- Cavernospongious shunts connect the corpora cavernosa with the corpus spongiosum within the penis.<sup>[[7]](#ref7)[[8]](#ref8)</sup>\n")
# bb:t22-08
ed(G + "04e-genital-reconstruction/modified-charles-procedure.mdx",
   "five-to-seven-day genital protocol.<sup>[[5]](#ref5)[[6]](#ref6)</sup>\n\n## What the Genital Evidence Shows",
   "five-to-seven-day genital protocol.<sup>[[5]](#ref5)[[6]](#ref6)</sup>\n\nMiller's 1980 warning reported three amputations among five patients after the Charles procedure for leg lymphedema.<sup>[[7]](#ref7)</sup>\n\n## What the Genital Evidence Shows")
# f04:f04-06-12: Hamad review moved to the hidradenitis row it supports
ed(G + "04e-genital-reconstruction/scrotal-reconstruction.mdx",
   "and total scrotectomy is not automatic. |", "and total scrotectomy is not automatic.<sup>[[7]](#ref7)</sup> |")
# Gobbo citation kept on its own sentence
ed(G + "04e-genital-reconstruction/shaeer-rectus-myofascial-neoglans.mdx",
   "Gobbo 2025 reviewed phalloplasty after penectomy for penile cancer. The original",
   "Gobbo 2025 reviewed phalloplasty after penectomy for penile cancer.<sup>[[19]](#ref19)</sup> The original")
# bc:t31-23
ed(G + "04g-prolapse-repair/apical/sacrospinous-hysteropexy.mdx", "\nConcomitant continence surgery remains",
   "\nKapoor's 2017 review and meta-analysis summarizes sacrospinous hysteropexy outcomes and study methods.<sup>[[2]](#ref2)</sup>\n\nConcomitant continence surgery remains")
# sp:s112: Spinoit review moved to the male fertility row
ed("docs/05-special-populations/05f-lifelong-care/hypospadias-epispadias.mdx",
   "some require assisted reproduction |", "some require assisted reproduction<sup>[[37]](#ref37)</sup> |")
