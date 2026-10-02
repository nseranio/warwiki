// ─────────────────────────────────────────────────────────
//  WARWIKI — Surgical Lineage Data
//  Source: Notion export + manual curation
// ─────────────────────────────────────────────────────────

export type Subspecialty = 'GURS' | 'URPS';

export interface Surgeon {
  id: string;
  /** Subfolder-relative profile path, e.g. "h-r/jack-mcaninch". Absent when the surgeon has no profile page. */
  path?: string;
  name: string;
  /** Reconstructive subspecialty. Defaults to 'GURS' when absent. */
  subspecialty?: Subspecialty;
  photo?: string;
  country?: string;
  countryFlag?: string;
  born?: string;
  died?: string;
  bioUrl?: string;
  mentorId?: string;
  traineeIds?: string[];
  // Future fields (populate as individual pages are built)
  institution?: string;
  title?: string;
  website?: string;
  youtube?: string;
  twitter?: string;
  instagram?: string;
  keyPubs?: string[];
  instruments?: string[];
}

// ── All surgeons ─────────────────────────────────────────
export const SURGEONS: Surgeon[] = [
  // ── Turner-Warwick School ──────────────────────────────
  {
    id: 'richard-turner-warwick',
    path: 's-z/richard-turner-warwick',
    name: 'Richard Turner-Warwick',
    photo: 'https://www.baus.org.uk/_userfiles/pages/images/museum/urologists/RTWBoatRace.jpg',
    country: 'England',
    countryFlag: '🇬🇧',
    born: '1925',
    died: '2020',
    institution: 'The Middlesex Hospital, London',
    title: 'CBE FRCS FRCP FRCOG',
    bioUrl: 'https://en.wikipedia.org/wiki/Richard_Turner-Warwick',
    traineeIds: ['sanjay-kulkarni', 'leonard-zinman', 'christopher-chapple', 'george-webster'],
    keyPubs: [
      'Turner-Warwick R, Wynne EJC, Handley-Ashken M. "The use of the omental pedicle graft in the repair and reconstruction of the urinary tract." Br J Surg. 1967;54(10):849–853. PMID 6047268',
      'Turner-Warwick R. "The repair of urethral strictures in the region of the membranous urethra." J Urol. 1968;100(3):303–314.',
      'Warwick R, Worth PHL. "The psoas bladder-hitch procedure for the replacement of the lower third of the ureter." Br J Urol. 1969;41:701–709.',
      'Turner-Warwick R. "The use of pedicle grafts in the repair of urinary tract fistulae." Br J Urol. 1972;44:644–656.',
      'Warwick R et al. "A urodynamic view of prostatic obstruction and the results of prostatectomy." Br J Urol. 1973;45(6):631–645.',
      'Turner-Warwick R. "The use of the omental pedicle graft in urinary tract reconstruction." J Urol. 1976;116(3):341–347. PMID 785032',
      'Turner-Warwick R. "Complex traumatic posterior urethral strictures." J Urol. 1977;118(4):564–574.',
      'Turner-Warwick R, Chapple CR. Functional Reconstruction of the Urinary Tract and Gynaeco-Urology. Blackwell Science; 2002.',
    ],
  },
  {
    id: 'sanjay-kulkarni',
    path: 'h-r/sanjay-kulkarni',
    name: 'Sanjay Kulkarni',
    photo: 'https://baileyandlove.tandf.co.uk/wp-content/uploads/2024/12/Sanjay-Balwant-Kulkarni.jpg',
    country: 'India',
    countryFlag: '🇮🇳',
    mentorId: 'richard-turner-warwick',
    traineeIds: ['pankaj-joshi'],
  },
  {
    id: 'leonard-zinman',
    path: 's-z/leonard-zinman',
    name: 'Leonard N. Zinman',
    photo: 'https://urologichistory.museum/Images/collections/scope-of-urology/Summer%202021/Leonard-Zinman.png',
    mentorId: 'richard-turner-warwick',
    traineeIds: [],
  },
  {
    id: 'christopher-chapple',
    path: 'a-g/christopher-chapple',
    name: 'Christopher R. Chapple',
    photo: 'https://www.ics.org/gfx/ContactPhoto/200/000014641.png',
    country: 'England',
    countryFlag: '🇬🇧',
    mentorId: 'richard-turner-warwick',
    traineeIds: [],
  },
  {
    id: 'pankaj-joshi',
    path: 'h-r/pankaj-joshi',
    name: 'Pankaj Joshi',
    photo: 'https://pbs.twimg.com/profile_images/1186092162435276800/cBvhvGvc_400x400.jpg',
    country: 'India',
    countryFlag: '🇮🇳',
    mentorId: 'sanjay-kulkarni',
    traineeIds: [],
  },

  // ── McAninch School ─────────────────────────────────────
  {
    id: 'jack-mcaninch',
    path: 'h-r/jack-mcaninch',
    name: 'Jack W. McAninch',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [
      'allen-morey', 'hunter-wessells', 'jeremy-myers', 'benjamin-breyer',
      'sean-elliott', 'jill-buckley', 'michael-metro', 'steve-brandes',
      'bryan-voelzke', 'bradley-erickson',
      'noel-armenakas', 'reynaldo-gomez',
    ],
  },
  {
    id: 'allen-morey',
    path: 'h-r/allen-morey',
    name: 'Allen F. Morey',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'jack-mcaninch',
    traineeIds: ['steve-hudak', 'jay-simhan', 'lee-zhao', 'maia-vandyke', 'michael-davenport'],
  },
  {
    id: 'hunter-wessells',
    path: 's-z/hunter-wessells',
    name: 'Hunter Wessells',
    photo: 'https://urology.uw.edu/sites/default/files/2022-09/Wessells_Hunter_sq.jpeg',
    mentorId: 'jack-mcaninch',
    traineeIds: ['judith-hagedorn', 'alex-vanni', 'joshua-broghammer', 'thomas-smith-iii', 'bradley-figler'],
  },
  {
    id: 'jeremy-myers',
    path: 'h-r/jeremy-myers',
    name: 'Jeremy B. Myers',
    photo: 'https://medicine.utah.edu/sites/g/files/zrelqx351/files/styles/portrait_laptop/public/media/images/2022/myers-chief.jpeg',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'benjamin-breyer',
    path: 'a-g/benjamin-breyer',
    name: 'Benjamin N. Breyer',
    photo: 'https://cdn-images.kyruus.com/providermatch/ucsf/photos/orig/breyer-benjamin-1316160211.jpg',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'sean-elliott',
    path: 'a-g/sean-elliott',
    name: 'Sean P. Elliott',
    photo: 'https://www.nbrg.org/perch/resources/elliott-w800.jpg',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'jill-buckley',
    path: 'a-g/jill-buckley',
    name: 'Jill C. Buckley',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'michael-metro', name: 'Michael Metro',
    photo: 'https://img-vitals.lb.wbmdstatic.com/lhd/provider/810750_db52e8e8-e492-400f-abbd-2b869cd10dc0.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'steve-brandes',
    path: 'a-g/steve-brandes',
    name: 'Steve Brandes',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'bryan-voelzke', name: 'Bryan B. Voelzke',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'bradley-erickson',
    path: 'a-g/bradley-erickson',
    name: 'Bradley A. Erickson',
    photo: 'https://urology.ucsf.edu/sites/default/files/styles/sa_square_540/public/2025-07/Bradley%20A.%20Erickson%2C%20MD%2C%20MS.jpeg.webp',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'keith-rourke',
    path: 'h-r/keith-rourke',
    name: 'Keith F. Rourke',
    country: 'Canada',
    countryFlag: '🇨🇦',
    institution: 'UC Irvine School of Medicine',
    mentorId: 'gerald-jordan',
    traineeIds: [],
  },
  {
    id: 'noel-armenakas', name: 'Noel A. Armenakas',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'reynaldo-gomez', name: 'Reynaldo Gomez',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  // Morey trainees
  {
    id: 'steve-hudak', name: 'Steve Hudak',
    photo: 'https://d38sso7f6qz01j.cloudfront.net/images/Steven-Hudak-432x432.width-400.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'allen-morey',
    traineeIds: [],
  },
  {
    id: 'jay-simhan',
    path: 's-z/jay-simhan',
    name: 'Jay Simhan',
    photo: 'https://www.foxchase.org/sites/default/files/styles/person_photo/public/photo/Jay-Simhan-860x640.jpg',
    mentorId: 'allen-morey',
    traineeIds: [],
  },
  {
    id: 'lee-zhao',
    path: 's-z/lee-zhao',
    name: 'Lee Zhao',
    photo: 'https://nyulangone.org/images/doctors/z/zhao/1679729297/lee-c-zhao-square.jpg',
    mentorId: 'allen-morey',
    traineeIds: ['min-jun'],
  },
  {
    id: 'maia-vandyke', name: 'Maia VanDyke',
    mentorId: 'allen-morey',
    traineeIds: [],
  },
  {
    id: 'michael-davenport', name: 'Michael Davenport',
    mentorId: 'allen-morey',
    traineeIds: [],
  },
  // Wessells trainees
  {
    id: 'judith-hagedorn', name: 'Judith Hagedorn',
    photo: 'https://www.fredhutch.org/content/dam/www/provider-photos/h/judith-hagedorn/provider-judith-hagedorn-profile-2x.jpg',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  {
    id: 'alex-vanni',
    path: 's-z/alex-vanni',
    name: 'Alex J. Vanni',
    photo: 'https://pbs.twimg.com/profile_images/1052006135798976512/tLjCglpl_400x400.jpg',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  {
    id: 'joshua-broghammer', name: 'Joshua A. Broghammer',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  {
    id: 'thomas-smith-iii', name: 'Thomas G. Smith III',
    photo: 'https://faculty.mdanderson.org/content/dam/mdanderson/images/fis/thomas_smithiii.jpg',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  {
    id: 'bradley-figler', name: 'Bradley Figler',
    photo: 'https://www.transhealthcare.org/wp-content/uploads/dr-brad-figler.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  // Zhao trainee
  {
    id: 'min-jun', name: 'Min Jun',
    photo: 'https://www.transhealthcare.org/wp-content/uploads/dr-min-jun-2.jpg',
    mentorId: 'lee-zhao',
    traineeIds: [],
  },

  // ── Webster School ──────────────────────────────────────
  // Duke Reconstructive Urology Fellowship. Webster directly mentored 32
  // consecutive fellows 1983–2013; Andrew C. Peterson has directed the
  // fellowship since 2013 (combined program since 2016).
  {
    id: 'george-webster',
    path: 's-z/george-webster',
    name: 'George D. Webster',
    photo: 'https://scholars.duke.edu/profile-images/full/0108871.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Duke University Medical Center',
    title: 'Professor Emeritus of Urology',
    bioUrl: 'https://scholars.duke.edu/person/george.webster',
    mentorId: 'richard-turner-warwick',
    traineeIds: [
      // 1983–2013, in chronological order of fellowship year
      'steve-silhelnik',      // 1983–1984
      'benad-goldwasser',   // 1984–1985
      'william-bonney',       // 1986–1987
      'niall-galloway',       // 1987–1988
      'jacob-ramon',          // 1988–1989
      'christopher-chapple',  // 1988–1989 (also T-W trainee; primary mentorId retained as T-W)
      'karl-kreder',          // 1989–1990
      'joseph-khoury',        // 1990–1991
      'susan-timmons',        // 1990–1991
      'scott-macdiarmid',     // 1991–1992
      'stephen-mark',         // 1992–1993
      'steve-waxman',         // 1993–1994
      'david-couillard',      // 1994–1995
      'lesley-carr',          // 1995–1996
      'james-wright',         // 1996–1997
      'christophe-iselin',    // 1997–1998
      'henry-ruiz',           // 1998–1999
      'michael-guralnick',    // 1999–2000
      'elizabeth-miller',     // 2000–2001
      'khai-lee-toh',         // 2000–2001
      'brian-flynn',          // 2001–2002
      'andrew-peterson',      // 2002–2003 (later fellowship director from 2013)
      'jennifer-tash',        // 2003–2004
      'neil-sherman',         // 2004–2005
      'elizabeth-anoia',      // 2005–2006
      'neil-grafstein',       // 2006–2007
      'jack-walter',          // 2007–2008
      'daniel-rapoport',      // 2008–2009
      'kristy-borawski',      // 2009–2010
      'aaron-lentz',          // 2010–2011
      'joshua-lohri',         // 2011–2012
      'danielle-stackhouse',  // 2012–2013
    ],
  },

  // Webster fellows (chronological) ─────────────────────────
  { id: 'steve-silhelnik', name: 'Steve Silhelnik',           mentorId: 'george-webster', traineeIds: [] },
  { id: 'benad-goldwasser', name: 'Benad Goldwasser',     mentorId: 'george-webster', traineeIds: [] },
  { id: 'william-bonney', name: 'William Bonney',            mentorId: 'george-webster', traineeIds: [] },
  { id: 'niall-galloway', name: 'Niall T.M. Galloway',       mentorId: 'george-webster', traineeIds: [] },
  { id: 'jacob-ramon', name: 'Jacob Ramon',               mentorId: 'george-webster', traineeIds: [] },
  // christopher-chapple is kept under Turner-Warwick (primary mentor); also listed in Webster's traineeIds
  { id: 'karl-kreder', name: 'Karl J. Kreder',            mentorId: 'george-webster', traineeIds: [] },
  { id: 'joseph-khoury', name: 'Joseph M. Khoury',          mentorId: 'george-webster', traineeIds: [] },
  { id: 'susan-timmons', name: 'Susan L. Timmons',          mentorId: 'george-webster', traineeIds: [] },
  { id: 'scott-macdiarmid', name: 'Scott A. MacDiarmid',       mentorId: 'george-webster', traineeIds: [] },
  { id: 'stephen-mark', name: 'Stephen Mark',              mentorId: 'george-webster', traineeIds: [] },
  { id: 'steve-waxman', name: 'Steve Waxman',              mentorId: 'george-webster', traineeIds: [] },
  { id: 'david-couillard', name: 'David R. Couillard',        mentorId: 'george-webster', traineeIds: [] },
  { id: 'lesley-carr', name: 'Lesley K. Carr',            mentorId: 'george-webster', traineeIds: [] },
  { id: 'james-wright', name: 'E. James Wright',           mentorId: 'george-webster', traineeIds: [] },
  { id: 'christophe-iselin', name: 'Christophe E. Iselin',      mentorId: 'george-webster', traineeIds: [] },
  {
    id: 'henry-ruiz', name: 'Henry E. Ruiz',
    mentorId: 'george-webster',
    traineeIds: [],
  },
  { id: 'michael-guralnick', name: 'Michael L. Guralnick',      mentorId: 'george-webster', traineeIds: [] },
  { id: 'elizabeth-miller', name: 'Elizabeth A. Miller',       mentorId: 'george-webster', traineeIds: [] },
  { id: 'khai-lee-toh', name: 'Khai Lee Toh',              mentorId: 'george-webster', traineeIds: [] },
  {
    id: 'brian-flynn', name: 'Brian J. Flynn',
    photo: 'https://som.cuanschutz.edu/FIMS/Content/faculty/3122/CU-Doctors-3122.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'george-webster',
    traineeIds: ['dmitriy-nikolavsky', 'humberto-villarreal'],
  },
  {
    id: 'andrew-peterson', name: 'Andrew C. Peterson',
    photo: 'https://www.dukehealth.org/sites/default/files/styles/doctor_profile/public/physician/andrew-c-peterson-md.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Duke University Medical Center',
    title: 'Fellowship Director — Duke Reconstructive Urology / GU Cancer Survivorship',
    mentorId: 'george-webster',
    traineeIds: [
      // Peterson as fellowship director, 2013–present
      'crystal-dover',          // 2013–2014
      'michael-belsante',       // 2014–2015
      'uwais-zaid',             // 2015–2016
      'ramiro-madden-fuentes',  // 2016–2017
      'arman-kahokehr',         // 2017–2018
      'urszula-kowalick',       // 2018–2019
      'william-boysen',         // 2019–2020
      'brian-inouye',           // 2020–2021
      'kevin-krughoff',         // 2021–2022
    ],
  },
  { id: 'jennifer-tash', name: 'Jennifer A. Tash',          mentorId: 'george-webster', traineeIds: [] },
  { id: 'neil-sherman', name: 'Neil D. Sherman',           mentorId: 'george-webster', traineeIds: [] },
  { id: 'elizabeth-anoia', name: 'Elizabeth J. Anoia',        mentorId: 'george-webster', traineeIds: [] },
  { id: 'neil-grafstein', name: 'Neil H. Grafstein',         mentorId: 'george-webster', traineeIds: [] },
  {
    id: 'jack-walter', name: 'Jack R. Walter',
    mentorId: 'george-webster',
    traineeIds: [],
  },
  { id: 'daniel-rapoport', name: 'Daniel Rapoport',           mentorId: 'george-webster', traineeIds: [] },
  { id: 'kristy-borawski', name: 'Kristy Borawski',           mentorId: 'george-webster', traineeIds: [] },
  { id: 'aaron-lentz', name: 'Aaron Lentz',               mentorId: 'george-webster', traineeIds: [] },
  { id: 'joshua-lohri', name: 'Joshua Lohri',              mentorId: 'george-webster', traineeIds: [] },
  { id: 'danielle-stackhouse', name: 'Danielle Stackhouse',       mentorId: 'george-webster', traineeIds: [] },

  // Peterson fellows (2013–present) ─────────────────────────
  { id: 'crystal-dover', name: 'Crystal Dover',              mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'michael-belsante', name: 'Michael Belsante',           mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'uwais-zaid', name: 'Uwais B. Zaid',              mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'ramiro-madden-fuentes', name: 'Ramiro J. Madden-Fuentes',   mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'arman-kahokehr', name: 'Arman A. Kahokehr',          mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'urszula-kowalick', name: 'Urszula Kowalick',           mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'william-boysen', name: 'William Boysen',             mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'brian-inouye', name: 'Brian Inouye',               mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'kevin-krughoff', name: 'Kevin Krughoff',             mentorId: 'andrew-peterson', traineeIds: [] },

  // Flynn trainees (from his later Colorado practice) ───────
  {
    id: 'dmitriy-nikolavsky',
    path: 'h-r/dmitriy-nikolavsky',
    name: 'Dmitriy Nikolavsky',
    mentorId: 'brian-flynn',
    traineeIds: [],
  },
  {
    id: 'humberto-villarreal', name: 'Humberto Villarreal',
    photo: 'https://pbs.twimg.com/profile_images/1640549546513289216/kGpy8t6Z_400x400.jpg',
    mentorId: 'brian-flynn',
    traineeIds: [],
  },

  // ── Santucci School ─────────────────────────────────────
  {
    id: 'richard-santucci',
    path: 's-z/richard-santucci',
    name: 'Richard Santucci',
    traineeIds: ['curtis-crane'],
  },
  {
    id: 'curtis-crane', name: 'Curtis Crane',
    mentorId: 'richard-santucci',
    traineeIds: [],
  },

  // ── Jordan School (Eastern Virginia Medical School) ─────
  // Charles J. Devine Jr. founded the EVMS reconstructive tradition; Gerald Jordan
  // was his protégé and successor and in turn trained the next generation,
  // including Kurt McCammon (current EVMS director), Joel Gelman (UCI),
  // Ramon Virasoro, Keith Rourke (Alberta), and Jessica DeLong.
  {
    id: 'charles-devine',
    path: 'a-g/charles-devine',
    name: 'Charles J. Devine Jr.',
    photo: 'https://societygurs.org/wp-content/uploads/2019/10/Devine.jpg',
    institution: 'Eastern Virginia Medical School',
    traineeIds: ['gerald-jordan'],
  },
  {
    id: 'gerald-jordan',
    path: 'h-r/gerald-jordan',
    name: 'Gerald H. Jordan',
    institution: 'Eastern Virginia Medical School',
    mentorId: 'charles-devine',
    traineeIds: [
      'kurt-mccammon',
      'joel-gelman',
      'ramon-virasoro',
      'keith-rourke',
      'jessica-delong',
    ],
  },
  {
    id: 'kurt-mccammon', name: 'Kurt A. McCammon',
    institution: 'Eastern Virginia Medical School',
    mentorId: 'gerald-jordan',
    traineeIds: [],
  },
  {
    id: 'guido-barbagli',
    path: 'a-g/guido-barbagli',
    name: 'Guido Barbagli',
    photo: 'http://www.uretra.it/wp-content/gallery/cv-guido-barbagli/cv-barbagli-GuidoBarbagli.jpg',
    bioUrl: 'http://www.uretra.it/cv-guido-barbagli-medici/?lang=en',
    traineeIds: [],
  },
  {
    id: 'anthony-mundy',
    path: 'h-r/anthony-mundy',
    name: 'Anthony R. Mundy',
    photo: 'https://www.cromwellhospital.com/wp-content/uploads/2023/04/Prof-Anthony-Mundy-scaled-e1683802581164-1824x2048.jpg',
    traineeIds: [],
  },
  {
    id: 'maurice-garcia', name: 'Maurice Garcia',
    photo: 'https://www.transhealthcare.org/wp-content/uploads/dr-maurice-garcia.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'joel-gelman',
    path: 'a-g/joel-gelman',
    name: 'Joel Gelman',
    photo: 'https://centerforreconstructiveurology.org/wp-content/uploads/2023/03/joel-gelman.jpg',
    institution: 'UC Irvine, Center for Reconstructive Urology',
    mentorId: 'gerald-jordan',
    traineeIds: [],
  },
  {
    id: 'ryan-terlecki', name: 'Ryan Terlecki',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'akio-horiguchi',
    path: 'h-r/akio-horiguchi',
    name: 'Akio Horiguchi',
    country: 'Japan',
    countryFlag: '🇯🇵',
    traineeIds: [],
  },
  {
    id: 'paul-perito', name: 'Paul Perito',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'f-brantley-scott', name: 'F. Brantley Scott',
    traineeIds: [],
  },
  {
    id: 'ramon-virasoro',
    path: 's-z/ramon-virasoro',
    name: 'Ramon Virasoro',
    mentorId: 'gerald-jordan',
    traineeIds: [],
  },
  {
    id: 'jessica-delong', name: 'Jessica M. DeLong',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'gerald-jordan',
    traineeIds: [],
  },
  {
    id: 'chris-gonzalez', name: 'Chris Gonzalez',
    photo: 'https://grandroundsinurology.com/wp-content/uploads/2021/05/Gonzalez_M_400x400-300x300.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'ziho-lee',
    path: 'h-r/ziho-lee',
    name: 'Ziho Lee',
    photo: 'https://deptcommon.fsm.northwestern.edu/profile-images/51913.jpeg',
    traineeIds: [],
  },
  {
    id: 'krishnan-venkatesan', name: 'Krishnan Venkatesan',
    traineeIds: [],
  },
  {
    id: 'nathan-shaw', name: 'Nathan Shaw',
    traineeIds: [],
  },
  {
    id: 'daniel-eun', name: 'Daniel Eun',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'kunlin-yang', name: 'Kunlin Yang',
    country: 'China',
    countryFlag: '🇨🇳',
    traineeIds: [],
  },

  // ── URPS — Urogynecology & Reconstructive Pelvic Surgery ───────────────
  // Seed set of well-known URPS / former-FPMRS surgeons. Training-lineage
  // relationships are left unset pending verified data; add mentorId /
  // traineeIds as those links are confirmed.
  {
    id: 'john-delancey',
    subspecialty: 'URPS',
    path: 'a-g/john-delancey',
    name: 'John O. L. DeLancey',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'University of Michigan',
    title: 'MD',
  },
  {
    id: 'matthew-barber',
    subspecialty: 'URPS',
    path: 'a-g/matthew-barber',
    name: 'Matthew D. Barber',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Duke University (Chair, Obstetrics & Gynecology)',
    title: 'MD MHS',
  },
  {
    id: 'linda-brubaker',
    subspecialty: 'URPS',
    path: 'a-g/linda-brubaker',
    name: 'Linda Brubaker',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'UC San Diego',
    title: 'MD MS',
  },
  {
    id: 'claire-burton',
    subspecialty: 'URPS', name: 'Claire Burton',
    country: 'United States',
    countryFlag: '🇺🇸',
    title: 'MD',
    mentorId: 'craig-comiter',
  },
  {
    id: 'seth-cohen',
    subspecialty: 'URPS', name: 'Seth D. Cohen',
    country: 'United States',
    countryFlag: '🇺🇸',
    title: 'MD',
    mentorId: 'shlomo-raz',
  },
  {
    id: 'craig-comiter',
    subspecialty: 'URPS',
    path: 'a-g/craig-comiter',
    name: 'Craig V. Comiter',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Stanford University',
    title: 'MD',
    traineeIds: ['claire-burton'],
  },
  {
    id: 'roger-dmochowski',
    subspecialty: 'URPS',
    path: 'a-g/roger-dmochowski',
    name: 'Roger R. Dmochowski',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Vanderbilt University Medical Center',
    title: 'MD MMHC FACS',
  },
  {
    id: 'ekene-enemchukwu',
    subspecialty: 'URPS', name: 'Ekene Enemchukwu',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Stanford University',
    title: 'MD MPH',
    mentorId: 'victor-nitti',
  },
  {
    id: 'david-ginsberg',
    subspecialty: 'URPS',
    path: 'a-g/david-ginsberg',
    name: 'David A. Ginsberg',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'USC Keck School of Medicine',
    title: 'MD',
    traineeIds: ['temitope-rude'],
  },
  {
    id: 'howard-goldman',
    subspecialty: 'URPS',
    path: 'a-g/howard-goldman',
    name: 'Howard B. Goldman',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Cleveland Clinic',
    title: 'MD',
  },
  {
    id: 'cheryl-iglesia',
    path: 'h-r/cheryl-iglesia',
    subspecialty: 'URPS', name: 'Cheryl B. Iglesia',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'MedStar Washington Hospital Center / Georgetown University',
    title: 'MD',
  },
  {
    id: 'mickey-karram',
    subspecialty: 'URPS',
    path: 'h-r/mickey-karram',
    name: 'Mickey Karram',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'The Christ Hospital, Cincinnati',
    title: 'MD',
  },
  {
    id: 'kathleen-kobashi',
    path: 'h-r/kathleen-kobashi',
    subspecialty: 'URPS', name: 'Kathleen C. Kobashi',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Houston Methodist Hospital (Chair, Urology)',
    title: 'MD FACS',
  },
  {
    id: 'victor-nitti',
    subspecialty: 'URPS',
    path: 'h-r/victor-nitti',
    name: 'Victor W. Nitti',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'UCLA',
    title: 'MD',
    traineeIds: ['ekene-enemchukwu'],
  },
  {
    id: 'holly-richter',
    subspecialty: 'URPS',
    path: 'h-r/holly-richter',
    name: 'Holly E. Richter',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'University of Alabama at Birmingham',
    title: 'PhD MD',
  },
  {
    id: 'eric-rovner',
    path: 'h-r/eric-rovner',
    subspecialty: 'URPS', name: 'Eric S. Rovner',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Medical University of South Carolina',
    title: 'MD',
  },
  {
    id: 'temitope-rude',
    subspecialty: 'URPS', name: 'Temitope Rude',
    country: 'United States',
    countryFlag: '🇺🇸',
    title: 'MD',
    mentorId: 'david-ginsberg',
  },
  {
    id: 'shlomo-raz',
    subspecialty: 'URPS',
    path: 's-z/shlomo-raz',
    name: 'Shlomo Raz',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'UCLA',
    title: 'MD',
    traineeIds: ['seth-cohen'],
  },
  {
    id: 'sandip-vasavada',
    path: 's-z/sandip-vasavada',
    subspecialty: 'URPS', name: 'Sandip P. Vasavada',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Cleveland Clinic',
    title: 'MD',
  },
  {
    id: 'mark-walters',
    path: 's-z/mark-walters',
    subspecialty: 'URPS', name: 'Mark D. Walters',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Cleveland Clinic (Emeritus)',
    title: 'MD',
  },
  // ── Fellowship-tree surgeons with cited work (profiles added October 2026) ──
  { id: 'anne-cameron', subspecialty: 'URPS', path: 'a-g/anne-cameron', name: 'Anne P. Cameron' },
  { id: 'anthony-atala', path: 'a-g/anthony-atala', name: 'Anthony Atala' },
  { id: 'arthur-burnett', path: 'a-g/arthur-burnett', name: 'Arthur L. Burnett' },
  { id: 'asif-muneer', path: 'h-r/asif-muneer', name: 'Asif Muneer' },
  { id: 'brian-linder', subspecialty: 'URPS', path: 'h-r/brian-linder', name: 'Brian J. Linder' },
  { id: 'cecile-ferrando', subspecialty: 'URPS', path: 'a-g/cecile-ferrando', name: 'Cecile A. Ferrando' },
  { id: 'cindy-amundsen', subspecialty: 'URPS', path: 'a-g/cindy-amundsen', name: 'Cindy L. Amundsen' },
  { id: 'dae-yul-yang', path: 's-z/dae-yul-yang', name: 'Dae Yul Yang' },
  { id: 'david-ralph', path: 'h-r/david-ralph', name: 'David J. Ralph' },
  { id: 'donald-skinner', path: 's-z/donald-skinner', name: 'Donald G. Skinner' },
  { id: 'edward-mcguire', subspecialty: 'URPS', path: 'h-r/edward-mcguire', name: 'Edward J. McGuire' },
  { id: 'emmanuel-chartier-kastler', subspecialty: 'URPS', path: 'a-g/emmanuel-chartier-kastler', name: 'Emmanuel Chartier-Kastler' },
  { id: 'eric-chung', path: 'a-g/eric-chung', name: 'Eric Chung' },
  { id: 'faysal-yafi', path: 's-z/faysal-yafi', name: 'Faysal A. Yafi' },
  { id: 'gary-alter', path: 'a-g/gary-alter', name: 'Gary J. Alter' },
  { id: 'gerald-brock', path: 'a-g/gerald-brock', name: 'Gerald B. Brock' },
  { id: 'giulio-garaffa', path: 'a-g/giulio-garaffa', name: 'Giulio Garaffa' },
  { id: 'hann-chorng-kuo', subspecialty: 'URPS', path: 'h-r/hann-chorng-kuo', name: 'Hann-Chorng Kuo' },
  { id: 'henry-lai', subspecialty: 'URPS', path: 'h-r/henry-lai', name: 'H. Henry Lai' },
  { id: 'irwin-goldstein', path: 'a-g/irwin-goldstein', name: 'Irwin Goldstein' },
  { id: 'jens-berli', path: 'a-g/jens-berli', name: 'Jens U. Berli' },
  { id: 'jerry-blaivas', subspecialty: 'URPS', path: 'a-g/jerry-blaivas', name: 'Jerry G. Blaivas' },
  { id: 'joachim-thuroff', path: 's-z/joachim-thuroff', name: 'Joachim W. Thüroff' },
  { id: 'john-gebhart', subspecialty: 'URPS', path: 'a-g/john-gebhart', name: 'John B. Gebhart' },
  { id: 'john-mulhall', path: 'h-r/john-mulhall', name: 'John P. Mulhall' },
  { id: 'john-stein', path: 's-z/john-stein', name: 'John P. Stein' },
  { id: 'kenneth-peters', subspecialty: 'URPS', path: 'h-r/kenneth-peters', name: 'Kenneth M. Peters' },
  { id: 'landon-trost', path: 's-z/landon-trost', name: 'Landon W. Trost' },
  { id: 'laurence-levine', path: 'h-r/laurence-levine', name: 'Laurence A. Levine' },
  { id: 'mamdouh-koraitim', path: 'h-r/mamdouh-koraitim', name: 'Mamdouh M. Koraitim' },
  { id: 'marco-falcone', path: 'a-g/marco-falcone', name: 'Marco Falcone' },
  { id: 'marcus-drake', subspecialty: 'URPS', path: 'a-g/marcus-drake', name: 'Marcus J. Drake' },
  { id: 'margit-fisch', path: 'a-g/margit-fisch', name: 'Margit Fisch' },
  { id: 'marjan-waterloos', path: 's-z/marjan-waterloos', name: 'Marjan Waterloos' },
  { id: 'matthew-ziegelmann', path: 's-z/matthew-ziegelmann', name: 'Matthew J. Ziegelmann' },
  { id: 'melissa-kaufman', subspecialty: 'URPS', path: 'h-r/melissa-kaufman', name: 'Melissa R. Kaufman' },
  { id: 'michael-baggish', subspecialty: 'URPS', path: 'a-g/michael-baggish', name: 'Michael S. Baggish' },
  { id: 'michael-chancellor', subspecialty: 'URPS', path: 'a-g/michael-chancellor', name: 'Michael B. Chancellor' },
  { id: 'miroslav-djordjevic', path: 'a-g/miroslav-djordjevic', name: 'Miroslav L. Djordjevic' },
  { id: 'mohamed-ghoneim', path: 'a-g/mohamed-ghoneim', name: 'Mohamed A. Ghoneim' },
  { id: 'nadir-osman', path: 'h-r/nadir-osman', name: 'Nadir I. Osman' },
  { id: 'nicolaas-lumen', path: 'h-r/nicolaas-lumen', name: 'Nicolaas Lumen' },
  { id: 'paolo-capogrosso', path: 'a-g/paolo-capogrosso', name: 'Paolo Capogrosso' },
  { id: 'paul-abrams', subspecialty: 'URPS', path: 'a-g/paul-abrams', name: 'Paul Abrams' },
  { id: 'philippe-zimmern', subspecialty: 'URPS', path: 's-z/philippe-zimmern', name: 'Philippe E. Zimmern' },
  { id: 'rachel-bluebond-langner', path: 'a-g/rachel-bluebond-langner', name: 'Rachel Bluebond-Langner' },
  { id: 'richard-hautmann', path: 'h-r/richard-hautmann', name: 'Richard E. Hautmann' },
  { id: 'rudolf-hohenfellner', path: 'h-r/rudolf-hohenfellner', name: 'Rudolf Hohenfellner' },
  { id: 'sender-herschorn', subspecialty: 'URPS', path: 'h-r/sender-herschorn', name: 'Sender Herschorn' },
  { id: 'steven-kaplan', subspecialty: 'URPS', path: 'h-r/steven-kaplan', name: 'Steven A. Kaplan' },
  { id: 'steven-wilson', path: 's-z/steven-wilson', name: 'Steven K. Wilson' },
  { id: 'timothy-boone', subspecialty: 'URPS', path: 'a-g/timothy-boone', name: 'Timothy B. Boone' },
  { id: 'tobias-kohler', path: 'h-r/tobias-kohler', name: 'Tobias S. Köhler' },
  { id: 'tom-lue', path: 'h-r/tom-lue', name: 'Tom F. Lue' },
  { id: 'wesley-verla', path: 's-z/wesley-verla', name: 'Wesley Verla' },
  { id: 'wouter-van-der-sluis', path: 's-z/wouter-van-der-sluis', name: 'Wouter B. van der Sluis' },
  { id: 'ying-long-sa', path: 's-z/ying-long-sa', name: 'Ying-Long Sa' },
  { id: 'yue-min-xu', path: 's-z/yue-min-xu', name: 'Yue-Min Xu' },
  { id: 'aaron-weinberg', name: 'Aaron C. Weinberg' },
  { id: 'adam-baumgarten', name: 'Adam S. Baumgarten' },
  { id: 'alexander-rozanski', name: 'Alexander T. Rozanski' },
  { id: 'alexander-skokan', name: 'Alexander J. Skokan' },
  { id: 'alysen-demzik', name: 'Alysen Demzik' },
  { id: 'amanda-chung', name: 'Amanda Chung' },
  { id: 'amjad-alwaal', name: 'Amjad H. Alwaal' },
  { id: 'andre-cavalcanti', name: 'André Cavalcanti' },
  { id: 'ashley-alford', name: 'Ashley V. Alford' },
  { id: 'benjamin-cedars', name: 'Benjamin E. Cedars' },
  { id: 'benjamin-mccormick', name: 'Benjamin J. McCormick' },
  { id: 'billy-cordon', name: 'Billy H. Cordon' },
  { id: 'boyd-viers', name: 'Boyd R. Viers' },
  { id: 'brian-chao', name: 'Brian W. Chao' },
  { id: 'bridget-findlay', name: 'Bridget L. Findlay' },
  { id: 'carlos-ignacio-calvo', name: 'Carlos Ignacio Calvo' },
  { id: 'catherine-harris', name: 'Catherine R. Harris' },
  { id: 'charles-powell', name: 'Charles R. Powell' },
  { id: 'charles-secrest', name: 'Charles Secrest' },
  { id: 'christopher-dixon', name: 'Christopher M. Dixon' },
  { id: 'christopher-loftus', name: 'Christopher J. Loftus' },
  { id: 'connor-policastro', name: 'Connor G. Policastro' },
  { id: 'daniel-dugi', path: 'a-g/daniel-dugi', name: 'Daniel D. Dugi III' },
  { id: 'daniela-andrich', path: 'a-g/daniela-andrich', name: 'Daniela Andrich' },
  { id: 'david-barham', name: 'David W. Barham' },
  { id: 'david-hadley', name: 'David A. Hadley' },
  { id: 'devang-desai', name: 'Devang J. Desai' },
  { id: 'dylan-hoare', name: 'Dylan Hoare' },
  { id: 'elaine-redmond', name: 'Elaine J. Redmond' },
  { id: 'elisa-berdondini', name: 'Elisa Berdondini' },
  { id: 'elizabeth-bearrick', name: 'Elizabeth N. Bearrick' },
  { id: 'enzo-palminteri', path: 'h-r/enzo-palminteri', name: 'Enzo Palminteri' },
  { id: 'felicia-balzano', name: 'Felicia L. Balzano' },
  { id: 'geolani-dy', path: 'a-g/geolani-dy', name: 'Geolani W. Dy' },
  { id: 'george-koch', name: 'George E. Koch' },
  { id: 'gregory-amend', name: 'Gregory Amend' },
  { id: 'hadley-wood', name: 'Hadley M. Wood' },
  { id: 'helen-sun', name: 'Helen H. Sun' },
  { id: 'hiren-patel', name: 'Hiren V. Patel' },
  { id: 'jairam-eswara', name: 'Jairam Eswara' },
  { id: 'james-furr', name: 'James R. Furr' },
  { id: 'jane-kurtzman', name: 'Jane T. Kurtzman' },
  { id: 'jaspreet-sandhu', name: 'Jaspreet S. Sandhu' },
  { id: 'jeffery-lin', name: 'Jeffery Lin' },
  { id: 'jennifer-anger', name: 'Jennifer T. Anger' },
  { id: 'jerilyn-latini', name: 'Jerilyn M. Latini' },
  { id: 'jimena-navarro', name: 'Jimena Navarro' },
  { id: 'joceline-fuchs', name: 'Joceline S. Fuchs' },
  { id: 'john-barnard', name: 'John T. Barnard II' },
  { id: 'john-myrga', name: 'John M. Myrga' },
  { id: 'jonathan-warner', path: 's-z/jonathan-warner', name: 'Jonathan Warner' },
  { id: 'jordan-siegel', name: 'Jordan A. Siegel' },
  { id: 'joseph-pariser', name: 'Joseph J. Pariser' },
  { id: 'joshua-roth', name: 'Joshua D. Roth' },
  { id: 'joshua-sterling', name: 'Joshua Sterling' },
  { id: 'justin-chee', name: 'Justin Chee' },
  { id: 'justin-han', name: 'Justin S. Han' },
  { id: 'katherine-cotter', name: 'Katherine Cotter' },
  { id: 'kenan-celtik', name: 'Kenan Celtik' },
  { id: 'kenichiro-ojima', name: 'Kenichiro Ojima' },
  { id: 'kenneth-angermeier', path: 'a-g/kenneth-angermeier', name: 'Kenneth W. Angermeier' },
  { id: 'kevin-flynn', name: 'Kevin J. Flynn' },
  { id: 'kevin-hebert', name: 'Kevin J. Hebert' },
  { id: 'khushabu-kasabwala', name: 'Khushabu D. Kasabwala' },
  { id: 'kirtishri-mishra', name: 'Kirtishri Mishra' },
  { id: 'kyle-scarberry', name: 'Kyle Scarberry' },
  { id: 'larry-yeung', name: 'Lawrence L. Yeung' },
  { id: 'lindsay-hampson', name: 'Lindsay A. Hampson' },
  { id: 'luke-wiegand', name: 'Lucas R. Wiegand' },
  { id: 'maria-monn', name: 'Maria Monn' },
  { id: 'maria-ocampo', name: 'María Ocampo' },
  { id: 'mary-soyster', name: 'Mary E. Soyster' },
  { id: 'masayuki-shinchi', name: 'Masayuki Shinchi' },
  { id: 'massimo-lazzeri', path: 'h-r/massimo-lazzeri', name: 'Massimo Lazzeri' },
  { id: 'matthias-hofer', name: 'Matthias D. Hofer' },
  { id: 'maxim-mckibben', name: 'Maxim J. McKibben' },
  { id: 'michael-chua', name: 'Michael E. Chua' },
  { id: 'michael-granieri', name: 'Michael A. Granieri' },
  { id: 'michaela-sljivich', name: 'Michaela Sljivich' },
  { id: 'nabeel-shakir', path: 's-z/nabeel-shakir', name: 'Nabeel A. Shakir' },
  { id: 'nadya-cinman', name: 'Nadya M. Cinman' },
  { id: 'nathan-hoy', name: 'Nathan Y. Hoy' },
  { id: 'nejd-alsikafi', name: 'Nejd F. Alsikafi' },
  { id: 'nicolas-ortiz', name: 'Nicolas M. Ortiz' },
  { id: 'niels-johnsen', path: 'h-r/niels-johnsen', name: 'Niels Johnsen' },
  { id: 'nima-baradaran', name: 'Nima Baradaran' },
  { id: 'paul-chung', name: 'Paul H. Chung' },
  { id: 'paul-rusilko', name: 'Paul J. Rusilko' },
  { id: 'philip-cheng', name: 'Philip J. Cheng' },
  { id: 'rachel-mann', name: 'Rachel A. Mann' },
  { id: 'rachel-moses', name: 'Rachel A. Moses' },
  { id: 'rajveer-purohit', name: 'Rajveer S. Purohit' },
  { id: 'roger-khouri', name: 'Roger K. Khouri Jr.' },
  { id: 'ronak-gor', name: 'Ronak A. Gor' },
  { id: 'ryan-farrell', name: 'M. Ryan Farrell' },
  { id: 'samantha-nealon', name: 'Samantha W. Nealon' },
  { id: 'samuel-ivan', name: 'Samuel J. Ivan' },
  { id: 'shyam-sukumar', name: 'Shyam S. Sukumar' },
  { id: 'stephen-blakely', name: 'Stephen A. Blakely' },
  { id: 'tamsin-greenwell', path: 'a-g/tamsin-greenwell', name: 'Tamsin Greenwell' },
  { id: 'thomas-fuller', name: 'Thomas Fuller' },
  { id: 'timothy-tausch', name: 'Timothy J. Tausch' },
  { id: 'travis-pagliara', name: 'Travis J. Pagliara' },
  { id: 'ty-higuchi', name: 'Ty T. Higuchi' },
  { id: 'uzoma-anele', name: 'Uzoma A. Anele' },
  // ── URPS fellowship-tree surgeons with cited work and URPS school founders (profiles added October 2026) ──
  { id: 'anna-rosamilia', subspecialty: 'URPS', path: 'h-r/anna-rosamilia', name: 'Anna Rosamilia' },
  { id: 'benjamin-brucker', subspecialty: 'URPS', path: 'a-g/benjamin-brucker', name: 'Benjamin M. Brucker' },
  { id: 'bilal-chughtai', subspecialty: 'URPS', path: 'a-g/bilal-chughtai', name: 'Bilal Chughtai' },
  { id: 'casey-kowalik', subspecialty: 'URPS', path: 'h-r/casey-kowalik', name: 'Casey Kowalik' },
  { id: 'chris-maher', subspecialty: 'URPS', path: 'h-r/chris-maher', name: 'Chris Maher' },
  { id: 'david-rahn', subspecialty: 'URPS', path: 'h-r/david-rahn', name: 'David Rahn' },
  { id: 'donald-ostergard', subspecialty: 'URPS', path: 'h-r/donald-ostergard', name: 'Donald Ostergard' },
  { id: 'gamal-ghoniem', subspecialty: 'URPS', path: 'a-g/gamal-ghoniem', name: 'Gamal M. Ghoniem' },
  { id: 'harold-drutz', subspecialty: 'URPS', path: 'a-g/harold-drutz', name: 'Harold Drutz' },
  { id: 'jennifer-wu', subspecialty: 'URPS', path: 's-z/jennifer-wu', name: 'Jennifer M. Wu' },
  { id: 'john-occhino', subspecialty: 'URPS', path: 'h-r/john-occhino', name: 'John Occhino' },
  { id: 'john-stoffel', subspecialty: 'URPS', path: 's-z/john-stoffel', name: 'John T. Stoffel' },
  { id: 'joshua-cohn', subspecialty: 'URPS', path: 'a-g/joshua-cohn', name: 'Joshua Cohn' },
  { id: 'judith-goh', subspecialty: 'URPS', path: 'a-g/judith-goh', name: 'Judith Goh' },
  { id: 'kaven-baessler', subspecialty: 'URPS', path: 'a-g/kaven-baessler', name: 'Kaven Baessler' },
  { id: 'kavita-mishra', subspecialty: 'URPS', path: 'h-r/kavita-mishra', name: 'Kavita Mishra' },
  { id: 'lewis-wall', subspecialty: 'URPS', path: 's-z/lewis-wall', name: 'Lewis Wall' },
  { id: 'linda-cardozo', subspecialty: 'URPS', path: 'a-g/linda-cardozo', name: 'Linda Cardozo' },
  { id: 'lysanne-campeau', subspecialty: 'URPS', path: 'a-g/lysanne-campeau', name: 'Lysanne Campeau' },
  { id: 'margaret-mueller', subspecialty: 'URPS', path: 'h-r/margaret-mueller', name: 'Margaret Mueller' },
  { id: 'marlene-corton', subspecialty: 'URPS', path: 'a-g/marlene-corton', name: 'Marlene Corton' },
  { id: 'nazema-siddiqui', subspecialty: 'URPS', path: 's-z/nazema-siddiqui', name: 'Nazema Siddiqui' },
  { id: 'nirit-rosenblum', subspecialty: 'URPS', path: 'h-r/nirit-rosenblum', name: 'Nirit Rosenblum' },
  { id: 'peter-dwyer', subspecialty: 'URPS', path: 'a-g/peter-dwyer', name: 'Peter Dwyer' },
  { id: 'peter-jeppson', subspecialty: 'URPS', path: 'h-r/peter-jeppson', name: 'Peter Jeppson' },
  { id: 'ramy-goueli', subspecialty: 'URPS', path: 'a-g/ramy-goueli', name: 'Ramy Goueli' },
  { id: 'roger-goldberg', subspecialty: 'URPS', path: 'a-g/roger-goldberg', name: 'Roger Goldberg' },
  { id: 'rufus-cartwright', subspecialty: 'URPS', path: 'a-g/rufus-cartwright', name: 'Rufus Cartwright' },
  { id: 'shawn-menefee', subspecialty: 'URPS', path: 'h-r/shawn-menefee', name: 'Shawn Menefee' },
  { id: 'stuart-stanton', subspecialty: 'URPS', path: 's-z/stuart-stanton', name: 'Stuart Stanton' },
  { id: 'thomas-benson', subspecialty: 'URPS', path: 'a-g/thomas-benson', name: 'J. Thomas Benson' },
  { id: 'victoria-handa', subspecialty: 'URPS', path: 'h-r/victoria-handa', name: 'Victoria Handa' },
  { id: 'vivian-sung', subspecialty: 'URPS', path: 's-z/vivian-sung', name: 'Vivian W. Sung' },
];

// ── Lookup helpers ────────────────────────────────────────
export const SURGEONS_BY_ID = new Map<string, Surgeon>(
  SURGEONS.map(s => [s.id, s])
);

/** Surgeons with no known mentor — the "roots" of each dynasty */
export const ROOT_SURGEONS = SURGEONS.filter(s => !s.mentorId);

/** Dynasties for the tree view */
export interface Dynasty {
  id: string;
  label: string;
  rootId: string;
  color: string;
  subspecialty?: Subspecialty;
}

export const DYNASTIES: Dynasty[] = [
  { id: 'mcaninch',       label: 'McAninch School',        rootId: 'jack-mcaninch',           color: '#185FA5', subspecialty: 'GURS' },
  { id: 'turner-warwick', label: 'Turner-Warwick School',  rootId: 'richard-turner-warwick',  color: '#0D9373', subspecialty: 'GURS' },
  { id: 'webster',        label: 'Webster School',         rootId: 'george-webster',          color: '#7c3aed', subspecialty: 'GURS' },
  { id: 'santucci',       label: 'Santucci School',        rootId: 'richard-santucci',        color: '#b45309', subspecialty: 'GURS' },
  { id: 'jordan',         label: 'Devine-Jordan School (EVMS)', rootId: 'charles-devine',     color: '#0284c7', subspecialty: 'GURS' },
  // URPS dynasties: the largest roots of the URPS fellowship tree (urps-lineage.generated.json).
  // Urology-based: Raz, McGuire, Dmochowski, Kobashi. OB/GYN-based: Stanton, Ostergard, Drutz, Brubaker, Karram.
  { id: 'stanton',        label: 'Stanton School',         rootId: 'stuart-stanton',          color: '#0D9373', subspecialty: 'URPS' },
  { id: 'ostergard',      label: 'Ostergard School',       rootId: 'donald-ostergard',        color: '#185FA5', subspecialty: 'URPS' },
  { id: 'drutz',          label: 'Drutz School',           rootId: 'harold-drutz',            color: '#b45309', subspecialty: 'URPS' },
  { id: 'raz',            label: 'Raz School',             rootId: 'shlomo-raz',              color: '#9333EA', subspecialty: 'URPS' },
  { id: 'brubaker',       label: 'Brubaker School',        rootId: 'linda-brubaker',          color: '#DC2626', subspecialty: 'URPS' },
  { id: 'dmochowski',     label: 'Dmochowski School',      rootId: 'roger-dmochowski',        color: '#0284c7', subspecialty: 'URPS' },
  { id: 'kobashi',        label: 'Kobashi School',         rootId: 'kathleen-kobashi',        color: '#059669', subspecialty: 'URPS' },
  { id: 'karram',         label: 'Karram School',          rootId: 'mickey-karram',           color: '#7c3aed', subspecialty: 'URPS' },
  { id: 'mcguire',        label: 'McGuire School',         rootId: 'edward-mcguire',          color: '#0EA5E9', subspecialty: 'URPS' },
];

/** Subspecialty of a surgeon, defaulting to 'GURS' for legacy records that don't set it. */
export function getSubspecialty(s: Surgeon): Subspecialty {
  return s.subspecialty ?? 'GURS';
}

/** Filter surgeons by subspecialty (treating missing field as GURS). */
export function surgeonsBySubspecialty(sub: Subspecialty): Surgeon[] {
  return SURGEONS.filter(s => getSubspecialty(s) === sub);
}

/** Filter dynasties by subspecialty (treating missing field as GURS). */
export function dynastiesBySubspecialty(sub: Subspecialty): Dynasty[] {
  return DYNASTIES.filter(d => (d.subspecialty ?? 'GURS') === sub);
}

export const SUBSPECIALTIES: { id: Subspecialty; label: string; fullName: string; color: string }[] = [
  { id: 'GURS', label: 'GURS', fullName: 'Genitourinary Reconstructive Surgery',          color: '#185FA5' },
  { id: 'URPS', label: 'URPS', fullName: 'Urogynecology & Reconstructive Pelvic Surgery', color: '#0D9373' },
];

/** Build a recursive tree node from a surgeon ID */
export interface TreeNode {
  surgeon: Surgeon;
  children: TreeNode[];
}

export function buildTree(id: string): TreeNode {
  const surgeon = SURGEONS_BY_ID.get(id)!;
  return {
    surgeon,
    children: (surgeon.traineeIds ?? []).map(buildTree),
  };
}

/** Get initials for a surgeon name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(w => !w.match(/^(Jr\.|Sr\.|III|II|IV|MD|DO|FACS|FRCSC)$/i))
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
