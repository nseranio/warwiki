import type { QuizQuestion } from './types';

/**
 * Starter quiz pool — hand-tagged by subspecialty and linked to a source
 * WARWIKI page. To add a question: append to this array with a unique `id`,
 * accurate `subspecialty`, and a `source.href` that resolves on the site.
 *
 * Subspecialty tagging convention:
 *   - GURS:     male urethroplasty, upper-tract reconstruction, urinary
 *               diversion, GAS, hypospadias, Peyronie's, AUS/IPP
 *   - URPS:     female SUI / OAB, prolapse, fistula, female urethroplasty,
 *               urogynecologic reconstruction
 *   - combined: foundations (anatomy, pharmacology, instruments, perioperative),
 *               NLUTD, complications, ERAS, anything common to both fellowships
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ─── GURS ──────────────────────────────────────────────────────────
  {
    id: 'gurs-ileal-conduit-frequency',
    subspecialty: 'GURS',
    prompt: 'What approximate proportion of post-cystectomy urinary diversions are ileal conduits?',
    choices: [
      { letter: 'A', text: '~30%' },
      { letter: 'B', text: '~50%' },
      { letter: 'C', text: '~80%' },
      { letter: 'D', text: '~95%' },
    ],
    answer: 'C',
    explanation:
      'Ileal conduit (Bricker) accounts for >80% of post-cystectomy urinary diversions, reflecting the shortest operative time and fewest perioperative complications among diversion types.',
    source: {
      label: 'Bowel Segments — Urinary Diversion Comparative Outcomes',
      href: '/docs/foundations/tools/biomaterials/autologous-tissue/bowel-segments#urinary-diversion-after-cystectomy--comparative-outcomes',
    },
    tags: ['diversion', 'cystectomy'],
  },
  {
    id: 'gurs-terminal-ileum-spare',
    subspecialty: 'GURS',
    prompt: 'When harvesting ileum for orthotopic neobladder, what length of terminal ileum should be preserved to avoid B12 and bile-salt malabsorption?',
    choices: [
      { letter: 'A', text: '5 cm' },
      { letter: 'B', text: '15–25 cm' },
      { letter: 'C', text: '40 cm' },
      { letter: 'D', text: '60 cm' },
    ],
    answer: 'B',
    explanation:
      'Spare the terminal 15–25 cm of ileum and preserve the ileocecal valve. Resection of 55–60 cm of ileum proximal to this does not produce clinically significant bowel dysfunction when the valve is preserved (Fung 2011, Roth 2018).',
    source: {
      label: 'Reoperative Bowel Harvest §3 (Ileum)',
      href: '/docs/foundations/surgical-principles/reoperative-bowel-harvest#ileum',
    },
    tags: ['diversion', 'neobladder', 'B12'],
  },
  {
    id: 'gurs-icg-leak-reduction',
    subspecialty: 'GURS',
    prompt: 'Approximately what reduction in anastomotic leak rate is reported with ICG fluorescence angiography in meta-analyses of colorectal anastomoses?',
    choices: [
      { letter: 'A', text: '5–10%' },
      { letter: 'B', text: '15–20%' },
      { letter: 'C', text: '31–69%' },
      { letter: 'D', text: '>90%' },
    ],
    answer: 'C',
    explanation:
      'Meta-analyses report a 31–69% reduction in anastomotic leak with ICG-FA, largest effect in left-sided and rectal resections. Clinical assessment alone in experienced hands can still achieve leak rates as low as 1.6%.',
    source: {
      label: 'Bowel Anastomosis — ICG Fluorescence Angiography',
      href: '/docs/foundations/surgical-principles/bowel-anastomosis#perfusion-assessment--icg-fluorescence-angiography',
    },
    tags: ['anastomosis', 'ICG'],
  },
  {
    id: 'gurs-jejunum-conduit-syndrome',
    subspecialty: 'GURS',
    prompt: 'A patient with a jejunal conduit presents with metabolic derangement. What is the expected electrolyte / acid-base picture?',
    choices: [
      { letter: 'A', text: 'Hyperchloremic metabolic acidosis' },
      { letter: 'B', text: 'Hypochloremic metabolic alkalosis' },
      { letter: 'C', text: 'Hyponatremic, hypochloremic, hyperkalemic metabolic acidosis' },
      { letter: 'D', text: 'Pure respiratory acidosis' },
    ],
    answer: 'C',
    explanation:
      '"Jejunal conduit syndrome": massive Na⁺/Cl⁻ loss and K⁺/H⁺ secretion produce hyponatremic, hypochloremic, hyperkalemic metabolic acidosis. Jejunum is strongly discouraged for urinary reconstruction.',
    source: {
      label: 'Bowel Segments — Jejunum',
      href: '/docs/foundations/tools/biomaterials/autologous-tissue/bowel-segments#5-jejunum--avoid',
    },
    tags: ['diversion', 'metabolic'],
  },
  {
    id: 'gurs-lse-staging',
    subspecialty: 'GURS',
    prompt: 'In the 2025 LSE staging system for urethral stricture, what does the "S" stand for?',
    choices: [
      { letter: 'A', text: 'Severity' },
      { letter: 'B', text: 'Segment' },
      { letter: 'C', text: 'Stricture' },
      { letter: 'D', text: 'Spongiofibrosis' },
    ],
    answer: 'B',
    explanation:
      'LSE = Location, Segment, Etiology. "Segment" replaces the older "Severity" in the 2025 staging system, which spans I–V with substages and incorporates the Urethroplasty Triad Score.',
    source: {
      label: 'Urethral Stricture — Classification',
      href: '/docs/clinical-conditions/voiding-outlet/urethral-stricture',
    },
    tags: ['urethroplasty', 'staging'],
  },

  // ─── URPS ──────────────────────────────────────────────────────────
  {
    id: 'urps-sslf-pull-out-strength',
    subspecialty: 'URPS',
    prompt: 'In Lo 2026 cadaveric pull-out testing of SSLF anchor devices, which device demonstrated the highest pull-out strength?',
    choices: [
      { letter: 'A', text: 'Anchorsure (44.0 N)' },
      { letter: 'B', text: 'Capio' },
      { letter: 'C', text: 'Miya Hook (69.2 N)' },
      { letter: 'D', text: 'i-Stitch' },
    ],
    answer: 'C',
    explanation:
      'Miya Hook 69.2 N vs Anchorsure 44.0 N in Lo 2026. The Miya Hook (Frank S. Miyazaki 1987) remains the strongest-pull-out device in head-to-head testing despite the marketed advantages of suture-capture devices.',
    source: {
      label: 'Miya Hook (Urethral & Pelvic Specialty Instruments)',
      href: '/docs/foundations/tools/instruments/urethral-specialty/miya-hook',
    },
    tags: ['prolapse', 'SSLF'],
  },
  {
    id: 'urps-tot-vs-tvt-thigh-pain',
    subspecialty: 'URPS',
    prompt: 'In meta-analyses of midurethral slings, which approach has the highest reported rate of groin / thigh pain?',
    choices: [
      { letter: 'A', text: 'Retropubic (TVT)' },
      { letter: 'B', text: 'Transobturator (TOT/TVT-O)' },
      { letter: 'C', text: 'Single-incision mini-sling' },
      { letter: 'D', text: 'Burch colposuspension' },
    ],
    answer: 'B',
    explanation:
      'Transobturator slings traverse the adductor muscles and obturator membrane, producing a characteristic groin/thigh pain signal absent from retropubic placement.',
    source: {
      label: 'Midurethral Sling Trocars',
      href: '/docs/foundations/tools/instruments/urethral-specialty/midurethral-sling-trocars',
    },
    tags: ['SUI', 'sling'],
  },
  {
    id: 'urps-augs-iuga-nutrition',
    subspecialty: 'URPS',
    prompt: 'Per the AUGS-IUGA 2022 ERAS consensus for urogynecologic surgery, what is the standard recommendation for oral carbohydrate intake before elective surgery?',
    choices: [
      { letter: 'A', text: 'NPO from midnight' },
      { letter: 'B', text: 'Clear liquids up to 2 h preop, with carbohydrate loading 2–3 h preop' },
      { letter: 'C', text: 'Full diet up to induction' },
      { letter: 'D', text: 'Mechanical bowel prep only' },
    ],
    answer: 'B',
    explanation:
      'AUGS-IUGA 2022 + ACOG 750: clear liquids up to 2 h preop with carbohydrate-loading drinks 2–3 h preop reduces insulin resistance and post-op nausea without aspiration risk.',
    source: {
      label: 'Perioperative Nutrition — Urogynecologic ERAS',
      href: '/docs/foundations/perioperative-care/postoperative-management/nutrition',
    },
    tags: ['ERAS', 'urogyn'],
  },

  // ─── Combined ─────────────────────────────────────────────────────
  {
    id: 'combined-adhesiolysis-enterotomy',
    subspecialty: 'combined',
    prompt: 'What is the reported rate of bowel injury during adhesiolysis on entry into a previously operated abdomen?',
    choices: [
      { letter: 'A', text: '~1%' },
      { letter: 'B', text: '~10.5%' },
      { letter: 'C', text: '~25%' },
      { letter: 'D', text: '~45%' },
    ],
    answer: 'B',
    explanation:
      '10.5% bowel injury with adhesiolysis vs 0% without; 8% mortality when complicated by bowel defect. Sharp dissection (knife) beats blunt — blunt techniques cause more postoperative fistulas and abscesses.',
    source: {
      label: 'Intraoperative Bowel Handling & Injury Management',
      href: '/docs/foundations/surgical-principles/bowel-handling-injury-management',
    },
    tags: ['bowel', 'adhesions'],
  },
  {
    id: 'combined-alvimopan-impact',
    subspecialty: 'combined',
    prompt: 'Which single perioperative drug has the largest documented effect on postoperative ileus in cystectomy/diversion patients?',
    choices: [
      { letter: 'A', text: 'Metoclopramide' },
      { letter: 'B', text: 'Alvimopan (Entereg)' },
      { letter: 'C', text: 'Neostigmine' },
      { letter: 'D', text: 'Bisacodyl' },
    ],
    answer: 'B',
    explanation:
      'Alvimopan is the highest-impact single agent for POI prevention after radical cystectomy and bowel-using diversion — peripherally restricted μ-opioid antagonist, accelerates GI recovery and shortens LOS in dedicated RCTs.',
    source: {
      label: 'Post-op Bowel & Ileus Management — Alvimopan',
      href: '/docs/foundations/pharmacology/perioperative-eras/postop-bowel-ileus-management#1-alvimopan-entereg--the-highest-impact-single-agent',
    },
    tags: ['ERAS', 'ileus'],
  },
  {
    id: 'combined-handgrip-mortality',
    subspecialty: 'combined',
    prompt: 'What is the reported mortality odds ratio for low handgrip strength in patients undergoing major GI / abdominal surgery?',
    choices: [
      { letter: 'A', text: 'OR 1.2' },
      { letter: 'B', text: 'OR 2.5' },
      { letter: 'C', text: 'OR 7.28' },
      { letter: 'D', text: 'OR 15.0' },
    ],
    answer: 'C',
    explanation:
      'OR 7.28 for postoperative mortality in GI tumor surgery patients with low handgrip strength. A $200–400 Jamar dynamometer, 60 seconds, EWGSOP2 / AWGS / SDOC triple-cutoff framework — arguably the most actionable bedside preop tool.',
    source: {
      label: 'Handgrip Strength (Nutritional Assessment)',
      href: '/docs/evaluation/laboratory-studies/nutritional-assessment/handgrip-strength',
    },
    tags: ['preop', 'nutrition'],
  },
  {
    id: 'combined-vitamin-b12-monitoring',
    subspecialty: 'combined',
    prompt: 'When does B12 deficiency typically manifest after ileal-based urinary diversion or bladder augmentation?',
    choices: [
      { letter: 'A', text: '6–12 months postoperatively' },
      { letter: 'B', text: '2–3 years postoperatively' },
      { letter: 'C', text: '3–5 years (and frequently a decade or more) postoperatively' },
      { letter: 'D', text: 'Immediately postoperatively' },
    ],
    answer: 'C',
    explanation:
      '3–5 year hepatic B12 reserve produces the classic delayed presentation a decade post-cystectomy. Surveillance per AUA / SUFU: annual B12 monitoring; replace via IM or high-dose oral when low.',
    source: {
      label: 'Vitamin B12 (Nutritional Assessment)',
      href: '/docs/evaluation/laboratory-studies/nutritional-assessment/vitamin-b12',
    },
    tags: ['diversion', 'B12', 'surveillance'],
  },
];
