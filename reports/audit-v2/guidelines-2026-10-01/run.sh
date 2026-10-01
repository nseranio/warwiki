#!/bin/zsh
# Runs one fresh Codex session per guideline, sequentially (pages and status.json overlap, so no parallel runs).
# Skips a guideline whose report already exists, so re-running resumes.
cd /Users/joyboy/Documents/WARWIKI/warwiki || exit 1
D=reports/audit-v2/guidelines-2026-10-01
mkdir -p $D/logs
while IFS='|' read -r stem hints; do
  [[ -z $stem ]] && continue
  if [[ -f $D/$stem.md ]]; then echo "skip $stem (report exists)"; continue; fi
  echo "=== $stem $(date '+%H:%M')"
  git diff --name-only > $D/logs/$stem.before.txt
  /Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex exec --dangerously-bypass-approvals-and-sandbox -C "$PWD" \
    -o $D/logs/$stem.last.txt \
    "Follow reports/audit-v2/guidelines-2026-10-01/BRIEF.md exactly. Guideline text: reports/audit-v2/sources-local/dl-2026-10-01/$stem.txt. Report file: $D/$stem.md. Page hints: $hints" \
    > $D/logs/$stem.log 2>&1 < /dev/null
  git diff --name-only > $D/logs/$stem.after.txt
  echo "done $stem $(date '+%H:%M') report:$([[ -f $D/$stem.md ]] && echo yes || echo MISSING)"
done <<'EOF'
aua-urotrauma-2020|gu-injury-overview, renal-trauma, bladder-trauma, pfui, trauma-assessment, primary-endoscopic-realignment, core-through-urethrotomy, urethral-reconstruction-principles, ureterovaginal, cystography, rug-vcug, ct-urogram, penile-doppler-ultrasound; also grep ureteral injury, penile fracture, genital and scrotal trauma, urethral injury pages.
aua-smsna-priapism-2022|05a-trauma-emergencies/priapism, priapism-shunts-decompression, pharmacology priapism-management, intracavernosal-injections, intracavernosal-injection-agents, penile-doppler-ultrasound, both pde5-inhibitors pages, penile-implants (immediate prosthesis for ischemic priapism), hardrock-sandwich-technique, genitourinary-vca, penis-anatomy-physiology.
aua-male-cpp-2025|this is the AUA Male Chronic Pelvic Pain guideline (CP/CPPS and chronic scrotal content pain). Grep CP/CPPS, chronic prostatitis, orchialgia, chronic scrotal pain, microdenervation, spermatic cord block, pelvic floor physical therapy, pudendal; include musculoskeletal pelvic pain and any male pelvic pain pages.
aua-smsna-ejaculation-2020|AUA/SMSNA Disorders of Ejaculation (Shindel 2022 J Urol). Grep ejaculation (premature, delayed, anejaculation, anorgasmia, retrograde, hematospermia, ejaculatory pain) across sexual-medicine pharmacology and condition pages, and retrograde-ejaculation statements on BPH procedure and alpha-blocker pages.
nccn-penile-v2-2026|glans-resurfacing, glansectomy-stsg, glanuloplasty-flaps, mazza-scrotal-flap-glanuloplasty, shaeer-rectus-myofascial-neoglans, gulino-everted-urethral-flap, partial and total penectomy reconstruction, perineal urethrostomy pages, lichen-sclerosus (malignant transformation), cancer-survivorship index.
nccn-bladder-v3-2026|urethrectomy (currently cites NCCN Bladder v3.2024: update), urinary-diversion pages (ileal-conduit, neobladders, continent pouches, urinary-diversion-principles), renal-function-metabolic-surveillance, vitamin-b12 pages, cancer-survivorship index, rigid-cystoscope, resectoscope.
aua-suo-nmibc-2026|urethrectomy, cancer-survivorship, rigid-cystoscope, resectoscope, flexible-cystoscope, microscopic hematuria pages, intravesical therapy complications or contracted bladder after BCG if covered.
aua-suo-utuc-2023|ureteral reconstruction and reimplantation pages (distal ureterectomy with reimplantation, psoas hitch, Boari flap, ileal ureter), ureteral-stricture, urethrectomy, flexible-ureteroscope, ct-urogram, cancer-survivorship.
aua-astro-localized-prostate-2026|post-prostatectomy incontinence and male SUI pages (male-stress-incontinence-database, artificial-urinary-sphincter, male slings), erectile dysfunction and penile rehabilitation, rectourethral fistula, radiation cystitis, VUAS/bladder neck contracture, cancer-survivorship, urethral stricture after radiation.
aua-astro-suo-salvage-prostate-2024|salvage prostatectomy and salvage radiation consequences: rectourethral fistula, AUS after radiation, VUAS, radiation cystitis, pubosymphyseal fistula, urinary diversion after radiation, cancer-survivorship.
EOF
echo "ALL DONE $(date '+%H:%M')"
