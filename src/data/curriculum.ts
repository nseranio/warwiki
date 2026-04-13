export interface CurriculumItem {
  title: string;
  items: string[];
}

export interface CurriculumSection {
  number: string;
  title: string;
  content: CurriculumItem[];
}

export interface Curriculum {
  id: string;
  label: string;
  fullName: string;
  color: string;
  sections: CurriculumSection[];
}

export const CURRICULA: Curriculum[] = [
  {
    id: 'urps',
    label: 'URPS',
    fullName: 'Urogynecology & Reconstructive Pelvic Surgery',
    color: '#0D9373',
    sections: [
      {
        number: 'I',
        title: 'Pelvic Floor Anatomy and Physiology',
        content: [
          {
            title: 'Anatomical Systems',
            items: ['Knowledge of genital, urinary, colorectal, and musculoskeletal elements'],
          },
          {
            title: 'Support Mechanisms',
            items: ['Bony pelvis, pelvic floor nerves and musculature, and connective tissue'],
          },
          {
            title: 'Neuroanatomy',
            items: ['Central, spinal, and peripheral nervous system roles in pelvic floor function'],
          },
          {
            title: 'Physiological Function',
            items: ['Mechanisms of storage, micturition, colorectal function, and uterovaginal changes before and after menopause'],
          },
          {
            title: 'Geriatrics',
            items: ['Impact of geriatric physiology on major organ systems and the concept of successful aging'],
          },
        ],
      },
      {
        number: 'II',
        title: 'Urinary Incontinence (UI) and Lower Urinary Tract Symptoms (LUTS)',
        content: [
          {
            title: 'Patient Evaluation',
            items: ['Comprehensive history and physical exams, including stress testing, POP-Q, and myofascial triggers'],
          },
          {
            title: 'Diagnostic Testing',
            items: ['Use and interpretation of voiding diaries, pad tests, urinalysis', 'Advanced testing including urodynamics and cystourethroscopy'],
          },
          {
            title: 'Non-Surgical Treatments',
            items: ['Pelvic floor physical therapy', 'Pharmacologic agents (anticholinergics, beta-3 agonists)', 'Pessary fitting'],
          },
          {
            title: 'Surgical Treatments',
            items: ['Office-based procedures (PTNS)', 'Endoscopic injections (Botox, bulking agents)', 'Vaginal procedures (slings)', 'Minimally invasive suspensions'],
          },
        ],
      },
      {
        number: 'III',
        title: 'Pelvic Organ Prolapse (POP)',
        content: [
          {
            title: 'Diagnosis and Staging',
            items: ['Differentiating types of POP and documenting findings using standard terminology'],
          },
          {
            title: 'Pathophysiology',
            items: ['Relationship between POP and symptoms like occult stress incontinence or bowel dysfunction'],
          },
          {
            title: 'Non-Surgical Management',
            items: ['Pessary management', 'Pelvic floor physical therapy'],
          },
          {
            title: 'Surgical Management',
            items: ['Native tissue repairs', 'Apical suspensions (uterosacral / sacrospinous ligament)', 'Obliterative procedures (colpocleisis)'],
          },
          {
            title: 'Materials',
            items: ['Knowledge of graft and mesh materials (autograft, synthetic)', 'Complications and their management'],
          },
        ],
      },
      {
        number: 'IV',
        title: 'Fecal Incontinence (FI) and Defecatory Dysfunction (DD)',
        content: [
          {
            title: 'Evaluation',
            items: ['Anorectal manometry', 'Endoanal ultrasound', 'Defecography'],
          },
          {
            title: 'Non-Surgical Care',
            items: ['Dietary changes and fiber supplementation', 'Pharmacologic management', 'Pelvic floor physical therapy'],
          },
          {
            title: 'Surgical Options',
            items: ['Anal sphincteroplasty', 'Sacral neuromodulation (SNM)', 'Colostomy'],
          },
        ],
      },
      {
        number: 'V',
        title: 'Urogenital Fistulas (UF) and Urethral Diverticula (UD)',
        content: [
          {
            title: 'Fistula Diagnosis',
            items: ['Tampon testing', 'Cystourethroscopy', 'Imaging (fistulogram, MRI)'],
          },
          {
            title: 'Fistula Repair',
            items: ['Vaginal repair (Latzko technique)', 'Abdominal and minimally invasive approaches', 'Flap interposition (Martius graft)'],
          },
          {
            title: 'Urethral Diverticula',
            items: ['Diagnosis and surgical excision (diverticulectomy)'],
          },
        ],
      },
      {
        number: 'VI',
        title: 'Painful Bladder Syndrome (PBS) and Pelvic Floor Dysfunction (PFD)',
        content: [
          {
            title: 'Diagnosis',
            items: ['Identification of Hunner\'s lesions', 'Myofascial trigger point assessment'],
          },
          {
            title: 'Multidisciplinary Treatment',
            items: ['Behavioral therapy', 'Pain management with neuropathic agents', 'Bladder instillations'],
          },
          {
            title: 'Interventions',
            items: ['Hydrodistension', 'Trigger point injections', 'Pudendal nerve blocks'],
          },
        ],
      },
      {
        number: 'VII',
        title: 'Urinary Tract Infection (UTI) and Hematuria',
        content: [
          {
            title: 'UTI Management',
            items: ['Differentiating acute, chronic, and complicated UTIs', 'Antibiotic and non-antibiotic prophylaxis (vaginal estrogen, D-mannose)'],
          },
          {
            title: 'Hematuria Evaluation',
            items: ['Risk categorization for malignancy', 'Advanced diagnostic testing (CT urogram, urine cytology)'],
          },
        ],
      },
      {
        number: 'VIII',
        title: 'Neuro-Urology and Neurogenic LUT Dysfunction',
        content: [
          {
            title: 'Condition Impact',
            items: ['Impact of MS, Parkinsonism, and spinal cord injuries on bladder control'],
          },
          {
            title: 'Special Management',
            items: ['Management of autonomic dysreflexia', 'Monitoring upper urinary tract risk'],
          },
        ],
      },
      {
        number: 'IX',
        title: 'Other Urogenital Conditions',
        content: [
          {
            title: 'Rectovaginal Fistulas (RVF)',
            items: ['Epidemiology related to obstetric injury or inflammatory bowel disease', 'Principles of surgical repair'],
          },
          {
            title: 'Genitourinary Syndrome of Menopause (GSM)',
            items: ['Pathophysiology and hormonal treatments (DHEA, estrogen)', 'Non-hormonal options'],
          },
          {
            title: 'Congenital Anomalies',
            items: ['Diagnosis of Müllerian anomalies', 'Neovagina surgical procedures (McIndoe, Davydov)'],
          },
        ],
      },
      {
        number: 'X',
        title: 'General Peri-Operative Management',
        content: [
          {
            title: 'Pre-Operative',
            items: ['Informed consent', 'Geriatric functional assessment', 'Anticoagulation management'],
          },
          {
            title: 'Intra-Operative',
            items: ['Patient positioning', 'VTE prophylaxis', 'Management of intraoperative injuries (bladder, ureteral, bowel)'],
          },
          {
            title: 'Post-Operative',
            items: ['Managing medical complications', 'Prolonged catheterization protocols'],
          },
        ],
      },
      {
        number: 'XI',
        title: 'Scholarly Activity and Core Competencies',
        content: [
          {
            title: 'Research and Statistics',
            items: ['Study design and hypothesis testing', 'Statistical methods (ANOVA, regression analysis)'],
          },
          {
            title: 'Quality Improvement',
            items: ['Common frameworks (PDSA, Lean, Six Sigma) for system safety'],
          },
          {
            title: 'Professionalism',
            items: ['Ethics and interpersonal communication', 'Addressing health disparities'],
          },
        ],
      },
    ],
  },
  {
    id: 'gurs',
    label: 'GURS',
    fullName: 'Genitourinary Reconstructive Surgery',
    color: '#185FA5',
    sections: [
      {
        number: 'I',
        title: 'Core Professional Competencies',
        content: [
          {
            title: 'Fundamental Principles',
            items: ['Tissue healing and plastic surgery principles (grafts, flaps, microvascular surgery)'],
          },
          {
            title: 'Diagnostic Imaging and Evaluation',
            items: ['Retrograde Urethrograms (RUG) and Voiding Cystourethrograms (VCUG)', 'Interpretation of urodynamics'],
          },
          {
            title: 'Multidisciplinary Trauma Management',
            items: ['Acute and delayed management of renal, bladder, and genital injuries'],
          },
          {
            title: 'Academic and Leadership Skills',
            items: ['Clinical research methodology and statistical analysis', 'Leading surgical teams'],
          },
        ],
      },
      {
        number: 'II',
        title: 'Urethral Reconstruction (Urethroplasty)',
        content: [
          {
            title: 'Anterior Urethral Strictures',
            items: ['Bulbar, penile, and fossa navicularis strictures', 'Anastomotic and substitution techniques'],
          },
          {
            title: 'Posterior Urethral Injuries',
            items: ['Complex repair of Pelvic Fracture Urethral Injuries (PFUI)', 'Radiation-induced strictures'],
          },
          {
            title: 'Pan-urethral and Complex Disease',
            items: ['Long-segment stricture management', 'Lichen sclerosus (BXO)'],
          },
          {
            title: 'Urethral Fistulae',
            items: ['Rectourethral fistula repair', 'Vesicovaginal and cutaneous fistula repair'],
          },
          {
            title: 'Hypospadias and Epispadias',
            items: ['Primary surgery for congenital urethral anomalies', 'Salvage and revision surgery'],
          },
        ],
      },
      {
        number: 'III',
        title: 'Genital Reconstruction and Aesthetics',
        content: [
          {
            title: 'Peyronie\'s Disease',
            items: ['Penile plication', 'Plaque incision/excision and grafting'],
          },
          {
            title: 'Acquired Deformities',
            items: ['Buried penis management', 'Scrotal lymphedema', 'Hidradenitis suppurativa'],
          },
          {
            title: 'Penile and Scrotal Trauma',
            items: ['Reconstruction following trauma or infection (necrotizing fasciitis)', 'Post-oncologic genital reconstruction'],
          },
          {
            title: 'Graft and Flap Harvesting',
            items: ['Buccal and lingual mucosa harvest', 'Split-thickness skin grafts', 'Gracilis and other muscle/fasciocutaneous flaps'],
          },
        ],
      },
      {
        number: 'IV',
        title: 'Urologic Prosthetics and Incontinence',
        content: [
          {
            title: 'Erectile Dysfunction',
            items: ['High-volume implantation of Inflatable Penile Prostheses (IPP)', 'Revision and explant surgery'],
          },
          {
            title: 'Male Stress Incontinence',
            items: ['Artificial Urinary Sphincter (AUS) placement', 'Male urethral slings'],
          },
          {
            title: 'Advanced Prosthetics',
            items: ['Management of complex redo cases', 'Complications from prior implants (infection salvage)'],
          },
        ],
      },
      {
        number: 'V',
        title: 'Abdominal and Upper Tract Reconstruction',
        content: [
          {
            title: 'Ureteral Reconstruction',
            items: ['Pyeloplasty', 'Ureteral reimplantation (psoas hitch, Boari flap)', 'Ileal ureter creation'],
          },
          {
            title: 'Bladder Reconstruction',
            items: ['Bladder neck reconstruction for refractory stenosis', 'Bladder augmentation', 'Continent and incontinent urinary diversion'],
          },
          {
            title: 'Surgical Approaches',
            items: ['Multi-port robotic surgery', 'Single-port (SP) robotic surgery', 'Laparoscopic and open approaches'],
          },
        ],
      },
      {
        number: 'VI',
        title: 'Gender-Affirming Surgery (GAS)',
        content: [
          {
            title: 'Feminizing Procedures',
            items: ['Vaginoplasty (penile inversion, peritoneal, colon techniques)', 'Orchiectomy and vulvar revision'],
          },
          {
            title: 'Masculinizing Procedures',
            items: ['Phalloplasty (radial forearm, lateral thigh, abdominal flaps)', 'Metoidioplasty, scrotoplasty, and urethral lengthening'],
          },
          {
            title: 'Revision and Non-Binary Options',
            items: ['Salvage procedures for GAS complications', 'Genital nullification surgeries'],
          },
        ],
      },
      {
        number: 'VII',
        title: 'Men\'s Health and Sexual Medicine',
        content: [
          {
            title: 'Andrology',
            items: ['Medical and surgical management of low testosterone', 'BPH and sexual dysfunction'],
          },
          {
            title: 'Male Infertility',
            items: ['Varicocelectomy', 'Vasovasostomy', 'Sperm harvesting techniques'],
          },
          {
            title: 'Cancer Survivorship',
            items: ['Long-term urologic morbidities following pelvic malignancy treatment'],
          },
        ],
      },
      {
        number: 'VIII',
        title: 'Functional and Neuro-Urology',
        content: [
          {
            title: 'Neurogenic Bladder',
            items: ['Management in spinal cord injury, spina bifida, and cerebral palsy'],
          },
          {
            title: 'Transitional Urology',
            items: ['Continued care for adult patients with congenital urological conditions'],
          },
          {
            title: 'Neuromodulation',
            items: ['Sacral neuromodulation for refractory bladder symptoms'],
          },
        ],
      },
    ],
  },
];
