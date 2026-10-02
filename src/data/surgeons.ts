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
    photo: 'https://assets.auanet.org/SITES/AUAnet/common/images/photos/LA__Zinman_photo.jpg',
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
    photo: 'https://urokul.com/wp-content/uploads/2025/12/3.png',
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
    photo: 'https://urology.ucsf.edu/sites/default/files/styles/responsive_350w/public/uploaded-images/faculty-member/McAninch112912_2802.jpg.webp?itok=XN-I7nZB',
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
    photo: 'https://urologyclinics.com/wp-content/uploads/2024/12/Morey-copy.webp',
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
    photo: 'https://researcherprofiles.org/profile/Modules/CustomViewPersonGeneralInfo/PhotoHandler.ashx?NodeID=184219&cachekey=600e39ff-1d9c-4017-a327-edfb474a5e44',
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
    photo: 'https://dmgwebprodstorage.blob.core.windows.net/dmgprodweb/physician-headshots/Brandes_Steven_MD_Urology-1-Retouched.jpg',
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
    photo: 'https://cdn-images.kyruus.com/providermatch/ucihealth/photos/orig/rourke-keith-1922727478.png',
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
    photo: 'https://dmcdn-prod.consumerism.pressganey.com/provider_photos/190/Profile/Live/871_202403281339181822.jpg',
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
    id: 'brian-flynn', path: 'a-g/brian-flynn', name: 'Brian J. Flynn',
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
    photo: 'https://cranects.com/wp-content/uploads/sites/307/2024/12/Santucci-811x1024.jpg.webp',
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
    photo: 'https://assets.auanet.org/SITES/AUAnet/common/images/photos/LA%20-%20Jordan.jpg',
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
    photo: 'https://urokul.com/wp-content/uploads/2026/01/Dr.GB_.png',
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
    photo: 'https://plaza.umin.ac.jp/strictureurethra/wp-content/uploads/2026/06/profile-img.jpg',
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
    photo: 'https://www.conferenceharvester.com/uploads/harvester/photos/cropXQZSXBOR-Presenter-VirasoroR.jpg',
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
    photo: 'https://medschool.umich.edu/sites/default/files/styles/square_1_1/public/2025-12/profile-johnodelancey-2025.jpg.jpg?h=2a479378&itok=pb9imG3S',
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
    photo: 'https://www.dukehealth.org/sites/default/files/styles/doctor_profile/public/physician/matthew-d-barber-md-mhs.jpg?itok=vjSOa2HC',
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
    photo: 'https://researcherprofiles.org/profile/Modules/CustomViewPersonGeneralInfo/PhotoHandler.ashx?NodeID=190813&cachekey=18c5d68e-e644-41a5-bc8d-7fc4d6a6922e',
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
    photo: 'https://med.stanford.edu/services/api/cap/profiles/photocache.8413.jpg',
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
    photo: 'https://www.vumc.org/urology/sites/default/files/people/dmochowski_roger.small_.jpg',
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
    photo: 'https://researcherprofiles.org/profile/Modules/CustomViewPersonGeneralInfo/PhotoHandler.ashx?NodeID=177872&cachekey=b206fe14-b7de-458a-bc5a-887e218dd0b8',
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
    photo: 'https://assets.clevelandclinic.org/transform/74c3f83e-2c9d-4ad4-8b64-29e36c8ea8dc/howard-b-goldman-md',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Cleveland Clinic',
    title: 'MD',
  },
  {
    id: 'cheryl-iglesia',
    path: 'h-r/cheryl-iglesia',
    subspecialty: 'URPS', name: 'Cheryl B. Iglesia', photo: 'https://medstarhealth-delivery.sitecorecontenthub.cloud/api/public/content/IGLESIA_Cheryl_600?v=6ecc4c1c',
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
    photo: 'https://webcentral.uc.edu/eprof/media/repository/0215KarramMickey1320.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'The Christ Hospital, Cincinnati',
    title: 'MD',
  },
  {
    id: 'kathleen-kobashi',
    path: 'h-r/kathleen-kobashi',
    subspecialty: 'URPS', name: 'Kathleen C. Kobashi', photo: 'https://scholars.houstonmethodist.org/files-asset/130716277/kobashi_k_2022.jpg?f=jpg&w=160',
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
    photo: 'https://www.uclahealth.org/sites/default/files/styles/portrait_3x4_010000_300x400/public/images/nitti-victor-1003800806.jpg?f=9d1e01a9&h=e2eab2ac&itok=VYsc6dZQ',
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
    photo: 'https://www.uab.edu/medicine/obgyn/images/faculty/Holly_Richter.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'University of Alabama at Birmingham',
    title: 'PhD MD',
  },
  {
    id: 'eric-rovner',
    path: 'h-r/eric-rovner',
    subspecialty: 'URPS', name: 'Eric S. Rovner', photo: 'https://www.getcare.muschealth.org/images/width%3D194%2Cheight%3D248%2Cfit%3Dcover/https%3A//a.mktgcdn.com/p/HnJQWFcyYXCgZMsUrv6h0_J3rYGUi1Z2oRiDTtR4TMw/3855x5397.jpg',
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
    photo: 'https://www.uclahealth.org/sites/default/files/styles/portrait_3x4_010000_300x400/public/images/Shlomo-Raz.jpg?f=8a46532b&h=55541bb6&itok=wBUVl98n',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'UCLA',
    title: 'MD',
    traineeIds: ['seth-cohen'],
  },
  {
    id: 'sandip-vasavada',
    path: 's-z/sandip-vasavada',
    subspecialty: 'URPS', name: 'Sandip P. Vasavada', photo: 'https://assets.clevelandclinic.org/transform/36a519c9-6ced-4fe5-b9a9-d601a87f97f5/sandip-p-vasavada-md',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Cleveland Clinic',
    title: 'MD',
  },
  {
    id: 'mark-walters',
    path: 's-z/mark-walters',
    subspecialty: 'URPS', name: 'Mark D. Walters', photo: 'https://www.augs.org/wp-content/uploads/2025/04/02cf231185df4ed6a0180b8cd340a8681-e1746303955536.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Cleveland Clinic (Emeritus)',
    title: 'MD',
  },
  // ── Fellowship-tree surgeons with cited work (profiles added October 2026) ──
  { id: 'anne-cameron', subspecialty: 'URPS', path: 'a-g/anne-cameron', name: 'Anne P. Cameron', photo: 'https://medschool.umich.edu/sites/default/files/styles/square_1_1/public/2023-10/_Anne_Kathleen_Pelletier_Cameron_MD.jpg.jpg?h=d94c4b90&itok=Q9HLtPQV', },
  { id: 'anthony-atala', path: 'a-g/anthony-atala', name: 'Anthony Atala' },
  { id: 'arthur-burnett', path: 'a-g/arthur-burnett', name: 'Arthur L. Burnett', photo: 'https://image-service-api.prd2.healthsparq.com/api/image?f=webp&fp=auto&h=250&limit-resize=false&url=https%3A%2F%2Fcdn-images.kyruus.com%2Fprovidermatch%2Fjohnshopkins%2Fphotos%2Forig%2Fburnett-arthur-1992762165.jpg&w=200', },
  { id: 'asif-muneer', path: 'h-r/asif-muneer', name: 'Asif Muneer', photo: 'https://res.cloudinary.com/welbeck/image/upload/w_176%2Ch_176%2Cc_fill%2Cg_auto/dpr_1/q_60/v1768987106/asif-muneer-urology-andrology-london-id-1084.webp', },
  { id: 'brian-linder', subspecialty: 'URPS', path: 'h-r/brian-linder', name: 'Brian J. Linder', photo: 'https://www.mayo.edu/-/media/kcms/employees/2018/06/16/22/40/brian-linder-15263533.jpg', },
  { id: 'cecile-ferrando', subspecialty: 'URPS', path: 'a-g/cecile-ferrando', name: 'Cecile A. Ferrando', photo: 'https://obgyn.ucsd.edu/_images/education-training/fellowships/urogynecology/Cecile-Ferrando-Fellowship-Director.png', },
  { id: 'cindy-amundsen', subspecialty: 'URPS', path: 'a-g/cindy-amundsen', name: 'Cindy L. Amundsen', photo: 'https://www.dukehealth.org/sites/default/files/styles/doctor_profile/public/physician/cindy-l-amundsen-md.jpg?itok=EomKwW03', },
  { id: 'dae-yul-yang', path: 's-z/dae-yul-yang', name: 'Dae Yul Yang', photo: 'https://www.kdh.or.kr/file/1693463832/%EC%96%91%EB%8C%80%EC%97%B4.jpg', },
  { id: 'david-ralph', path: 'h-r/david-ralph', name: 'David J. Ralph', photo: 'https://www.david-ralph.co.uk/template/davidralph/images/david-ralph.jpg', },
  { id: 'donald-skinner', path: 's-z/donald-skinner', name: 'Donald G. Skinner', photo: 'https://today.usc.edu/wp-content/uploads/2011/05/Skinner-768x768.jpg', },
  { id: 'edward-mcguire', subspecialty: 'URPS', path: 'h-r/edward-mcguire', name: 'Edward J. McGuire' },
  { id: 'emmanuel-chartier-kastler', subspecialty: 'URPS', path: 'a-g/emmanuel-chartier-kastler', name: 'Emmanuel Chartier-Kastler', photo: 'https://www.conferenceharvester.com/uploads/harvester/photos/cropBGECBBTX-Presenter-ChartierKastlerE.jpg', },
  { id: 'eric-chung', path: 'a-g/eric-chung', name: 'Eric Chung', photo: 'https://about.uq.edu.au/sites/default/files/profiles/6386.jpeg', },
  { id: 'faysal-yafi', path: 's-z/faysal-yafi', name: 'Faysal A. Yafi', photo: 'https://uciurology.com/wp-content/uploads/2026/01/Faysal-A.-Yafi-MD-FRCSC.jpg', },
  { id: 'gary-alter', path: 'a-g/gary-alter', name: 'Gary J. Alter', photo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Alter%2C_Gary_%28Luke_Ford%29_1.JPG', },
  { id: 'gerald-brock', path: 'a-g/gerald-brock', name: 'Gerald B. Brock', photo: 'https://www.schulich.uwo.ca/urology/img/faculty_160x180/Faculty-Brock-Gerald-160x180.jpg', },
  { id: 'giulio-garaffa', path: 'a-g/giulio-garaffa', name: 'Giulio Garaffa', photo: 'https://hssh.health/wp-content/uploads/2026/09/Dr.-Giulio-Garaffa-Profile-Picture.jpeg', },
  { id: 'hann-chorng-kuo', subspecialty: 'URPS', path: 'h-r/hann-chorng-kuo', name: 'Hann-Chorng Kuo', photo: 'https://storage.unitedwebnetwork.com/files/1237/b96dff9eaa71917aae6a1e3b97038f79.jpg', },
  { id: 'henry-lai', subspecialty: 'URPS', path: 'h-r/henry-lai', name: 'H. Henry Lai', photo: 'https://uihc.org/sites/default/files/styles/600x900/public/2026-02/Lai_Henry_2026_09A-small.jpg.webp?h=89aecc28&itok=mtv37XpF', },
  { id: 'irwin-goldstein', path: 'a-g/irwin-goldstein', name: 'Irwin Goldstein', photo: 'https://www.isswsh.org/images/pic-for-web/board/Goldstein.I.png', },
  { id: 'jens-berli', path: 'a-g/jens-berli', name: 'Jens U. Berli', photo: 'https://www.ohsu.edu/sites/default/files/2023-03/Berli%2C%20Jens_18%20-%20200%20pix.jpg', },
  { id: 'jerry-blaivas', subspecialty: 'URPS', path: 'a-g/jerry-blaivas', name: 'Jerry G. Blaivas', photo: 'https://www.mountsinai.org/files/images/fad-images/0000076810067365518001.jpg', },
  { id: 'joachim-thuroff', path: 's-z/joachim-thuroff', name: 'Joachim W. Thüroff' },
  { id: 'john-gebhart', subspecialty: 'URPS', path: 'a-g/john-gebhart', name: 'John B. Gebhart', photo: 'https://www.mayoclinic.org/-/media/kcms/employees/2018/06/16/21/45/john-gebhart-11904976.jpg', },
  { id: 'john-mulhall', path: 'h-r/john-mulhall', name: 'John P. Mulhall', photo: 'https://www.mskcc.org/sites/default/files/styles/width_600/public/node/446/image/mulhall-john.jpg', },
  { id: 'john-stein', path: 's-z/john-stein', name: 'John P. Stein' },
  { id: 'kenneth-peters', subspecialty: 'URPS', path: 'h-r/kenneth-peters', name: 'Kenneth M. Peters', photo: 'https://www.oakland.edu/media/Oakland/Assets/OUWB/images/faculty-staff/Peters-Kenneth.jpg', },
  { id: 'landon-trost', path: 's-z/landon-trost', name: 'Landon W. Trost', photo: 'https://malefertilityandpeyroniesclinic.com/wp-content/uploads/bb-plugin/cache/Untitled-21-portrait-755b513a51d98b184ae510bef696f814-5d73bad5c4f45.jpg', },
  { id: 'laurence-levine', path: 'h-r/laurence-levine', name: 'Laurence A. Levine', photo: 'https://www.rushu.rush.edu/sites/default/files/styles/faculty_profile/public/legacy/Rush%20Medical%20College/levine_laurence_jacket_rmc.jpg?itok=xLAmbmTh', },
  { id: 'mamdouh-koraitim', path: 'h-r/mamdouh-koraitim', name: 'Mamdouh M. Koraitim' },
  { id: 'marco-falcone', path: 'a-g/marco-falcone', name: 'Marco Falcone', photo: 'https://esgurs.uroweb.org/wp-content/uploads/2025/06/Dr-Falcone.jpg', },
  { id: 'marcus-drake', subspecialty: 'URPS', path: 'a-g/marcus-drake', name: 'Marcus J. Drake' },
  { id: 'margit-fisch', path: 'a-g/margit-fisch', name: 'Margit Fisch', photo: 'https://www.urologenportal.de/fileadmin/_processed_/a/e/csm_Fisch_Margit_2021_4f7579310e.jpg', },
  { id: 'marjan-waterloos', path: 's-z/marjan-waterloos', name: 'Marjan Waterloos', photo: 'https://www.mariamiddelares.be/public/doctors-image/Marjan-Waterloos-1500x1500.jpg', },
  { id: 'matthew-ziegelmann', path: 's-z/matthew-ziegelmann', name: 'Matthew J. Ziegelmann', photo: 'https://www.mayo.edu/-/media/kcms/employees/2019/05/02/14/02/matthew-ziegelmann-15737501.jpg', },
  { id: 'melissa-kaufman', subspecialty: 'URPS', path: 'h-r/melissa-kaufman', name: 'Melissa R. Kaufman' },
  { id: 'michael-baggish', subspecialty: 'URPS', path: 'a-g/michael-baggish', name: 'Michael S. Baggish', photo: 'https://9116.thankyou4caring.org/image/24/091924_Michael-S-Baggish.png', },
  { id: 'michael-chancellor', subspecialty: 'URPS', path: 'a-g/michael-chancellor', name: 'Michael B. Chancellor' },
  { id: 'miroslav-djordjevic', path: 'a-g/miroslav-djordjevic', name: 'Miroslav L. Djordjevic', photo: 'https://www.conferenceharvester.com/uploads/harvester/photos/cropXQZSXBOR-Presenter-DjordjevicM.jpg', },
  { id: 'mohamed-ghoneim', path: 'a-g/mohamed-ghoneim', name: 'Mohamed A. Ghoneim', photo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Mohamed_Ghoneim.png', },
  { id: 'nadir-osman', path: 'h-r/nadir-osman', name: 'Nadir I. Osman', photo: 'https://irp.cdn-website.com//3514f4de/dms3rep/multi/opt/Nadir-16-12-19-_9-1920w.jpg', },
  { id: 'nicolaas-lumen', path: 'h-r/nicolaas-lumen', name: 'Nicolaas Lumen', photo: 'https://www.crig.ugent.be/sites/default/files/styles/partner_desktop/public/media/image/nicolaaslumen.jpg?h=66f19ec5&itok=usHgz1qU', },
  { id: 'paolo-capogrosso', path: 'a-g/paolo-capogrosso', name: 'Paolo Capogrosso' },
  { id: 'paul-abrams', subspecialty: 'URPS', path: 'a-g/paul-abrams', name: 'Paul Abrams', photo: 'https://www.ics.org/Wasabi/Common/gfx/cms/xxl/000005324.jpg', },
  { id: 'philippe-zimmern', subspecialty: 'URPS', path: 's-z/philippe-zimmern', name: 'Philippe E. Zimmern', photo: 'https://d38sso7f6qz01j.cloudfront.net/original_images/zimmern-philippe-18350-200x200.jpg', },
  { id: 'rachel-bluebond-langner', path: 'a-g/rachel-bluebond-langner', name: 'Rachel Bluebond-Langner', photo: 'https://nyulangone.org/images/doctors/b/bluebond-langner/1902867393/rachel-bluebond-langner-thumb.jpg', },
  { id: 'richard-hautmann', path: 'h-r/richard-hautmann', name: 'Richard E. Hautmann', photo: 'https://canjurol.com/FreeArticles/2020/27-01/images/Image_003.png', },
  { id: 'rudolf-hohenfellner', path: 'h-r/rudolf-hohenfellner', name: 'Rudolf Hohenfellner' },
  { id: 'sender-herschorn', subspecialty: 'URPS', path: 'h-r/sender-herschorn', name: 'Sender Herschorn', photo: 'https://surgery.utoronto.ca/sites/default/files/styles/square_1_1_600/public/herschorn.jpeg?itok=jMv89eLh', },
  { id: 'steven-kaplan', subspecialty: 'URPS', path: 'h-r/steven-kaplan', name: 'Steven A. Kaplan', photo: 'https://www.mountsinai.org/files/images/fad-images/0000076810048627559131.jpg', },
  { id: 'steven-wilson', path: 's-z/steven-wilson', name: 'Steven K. Wilson', photo: 'https://grandroundsinurology.com/wp-content/uploads/2021/06/Wilson_S_Print-300x300.jpeg', },
  { id: 'timothy-boone', subspecialty: 'URPS', path: 'a-g/timothy-boone', name: 'Timothy B. Boone', photo: 'https://scholars.houstonmethodist.org/files-asset/1520239521/BooneT2026jpg.jpg?f=jpg&w=160', },
  { id: 'tobias-kohler', path: 'h-r/tobias-kohler', name: 'Tobias S. Köhler', photo: 'https://www.mayoclinic.org/-/media/kcms/employees/2018/06/16/22/09/tobias-kohler-13608991.jpg', },
  { id: 'tom-lue', path: 'h-r/tom-lue', name: 'Tom F. Lue', photo: 'https://urology.ucsf.edu/sites/default/files/styles/responsive_350w/public/2024-12/Dr.%20Tom%20Lue.png.webp?itok=m2LgYgi7', },
  { id: 'wesley-verla', path: 's-z/wesley-verla', name: 'Wesley Verla' },
  { id: 'wouter-van-der-sluis', path: 's-z/wouter-van-der-sluis', name: 'Wouter B. van der Sluis', photo: 'https://www.amsterdamumc.nl/upload_mm/c/c/5/97972_fullimage_sluis%2C%20wouter%20van%20der%20%23184485%20-%206956-ala-1_768x432.jpg', },
  { id: 'ying-long-sa', path: 's-z/ying-long-sa', name: 'Ying-Long Sa', photo: 'https://www.6thhosp.com/UploadFace/ys_2006759423518246.jpg', },
  { id: 'yue-min-xu', path: 's-z/yue-min-xu', name: 'Yue-Min Xu', photo: 'https://www.6thhosp.com/upload/photo/08154114.png', },
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
  { id: 'daniel-dugi', path: 'a-g/daniel-dugi', name: 'Daniel D. Dugi III', photo: 'https://www.ohsu.edu/sites/default/files/2021-11/Dugi%20headshot%202.jpg', },
  { id: 'daniela-andrich', path: 'a-g/daniela-andrich', name: 'Daniela Andrich', photo: 'https://andrichurology.com/wp-content/themes/yootheme/cache/1f/dr-daniela-andrich-1f986791.jpeg', },
  { id: 'david-barham', name: 'David W. Barham' },
  { id: 'david-hadley', name: 'David A. Hadley' },
  { id: 'devang-desai', name: 'Devang J. Desai' },
  { id: 'dylan-hoare', name: 'Dylan Hoare' },
  { id: 'elaine-redmond', name: 'Elaine J. Redmond' },
  { id: 'elisa-berdondini', name: 'Elisa Berdondini' },
  { id: 'elizabeth-bearrick', name: 'Elizabeth N. Bearrick' },
  { id: 'enzo-palminteri', path: 'h-r/enzo-palminteri', name: 'Enzo Palminteri', photo: 'https://www.clinicacellini.it/wp-content/uploads/2025/04/00cf1ff7-dcdf-4b0a-bc9c-e2ce9de07c75.jpg', },
  { id: 'felicia-balzano', name: 'Felicia L. Balzano' },
  { id: 'geolani-dy', path: 'a-g/geolani-dy', name: 'Geolani W. Dy', photo: 'https://iprsoftwaremedia.com/296/files/20224/626ffa4bb3aed37410233bb2_20220427%20Geolani%20Dy%2010/20220427%20Geolani%20Dy%2010_mid.jpg?v=2f5d109b-64b2-4d9f-b98a-bf1c8431766b', },
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
  { id: 'jonathan-warner', path: 's-z/jonathan-warner', name: 'Jonathan Warner', photo: 'https://www.mayoclinic.org/-/media/kcms/employees/2021/09/16/11/54/j-warner-14886804.jpg', },
  { id: 'jordan-siegel', name: 'Jordan A. Siegel' },
  { id: 'joseph-pariser', name: 'Joseph J. Pariser' },
  { id: 'joshua-roth', name: 'Joshua D. Roth' },
  { id: 'joshua-sterling', name: 'Joshua Sterling' },
  { id: 'justin-chee', name: 'Justin Chee' },
  { id: 'justin-han', name: 'Justin S. Han' },
  { id: 'katherine-cotter', name: 'Katherine Cotter' },
  { id: 'kenan-celtik', name: 'Kenan Celtik' },
  { id: 'kenichiro-ojima', name: 'Kenichiro Ojima' },
  { id: 'kenneth-angermeier', path: 'a-g/kenneth-angermeier', name: 'Kenneth W. Angermeier', photo: 'https://assets.clevelandclinic.org/transform/57b8d8ae-40ff-4704-93a2-d36bc5b3e61a/kenneth-w-angermeier-md', },
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
  { id: 'massimo-lazzeri', path: 'h-r/massimo-lazzeri', name: 'Massimo Lazzeri', photo: 'https://fondazionehumanitasricerca.it/wp-content/uploads/2022/03/5-domande-al-dottor-Massimo-Lazzeri-Blueone-Fondazione-Humanitas-Ricerca.png', },
  { id: 'matthias-hofer', name: 'Matthias D. Hofer' },
  { id: 'maxim-mckibben', name: 'Maxim J. McKibben' },
  { id: 'michael-chua', name: 'Michael E. Chua' },
  { id: 'michael-granieri', name: 'Michael A. Granieri' },
  { id: 'michaela-sljivich', name: 'Michaela Sljivich' },
  { id: 'nabeel-shakir', path: 's-z/nabeel-shakir', name: 'Nabeel A. Shakir', photo: 'https://www.henryford.com/-/media/project/hfhs/henryford/physician-directory/physicians/n/nabeel-shakir.jpg?extension=webp', },
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
  { id: 'tamsin-greenwell', path: 'a-g/tamsin-greenwell', name: 'Tamsin Greenwell', photo: 'https://www.urologynews.uk.com/media/39136/uro-onex-dec24-tamsin-greenwell.jpg', },
  { id: 'thomas-fuller', name: 'Thomas Fuller' },
  { id: 'timothy-tausch', name: 'Timothy J. Tausch' },
  { id: 'travis-pagliara', name: 'Travis J. Pagliara' },
  { id: 'ty-higuchi', name: 'Ty T. Higuchi' },
  { id: 'uzoma-anele', name: 'Uzoma A. Anele' },
  // ── URPS fellowship-tree surgeons with cited work and URPS school founders (profiles added October 2026) ──
  { id: 'anna-rosamilia', subspecialty: 'URPS', path: 'h-r/anna-rosamilia', name: 'Anna Rosamilia', photo: 'https://www.iuga.org/images/2025/11/28/rosamilia-headshot-modified.png', },
  { id: 'benjamin-brucker', subspecialty: 'URPS', path: 'a-g/benjamin-brucker', name: 'Benjamin M. Brucker', photo: 'https://nyulangone.org/images/doctors/b/brucker/1235295619/benjamin-m-brucker-square.jpg', },
  { id: 'bilal-chughtai', subspecialty: 'URPS', path: 'a-g/bilal-chughtai', name: 'Bilal Chughtai', photo: 'https://careinnovation.weill.cornell.edu/sites/default/files/events/6ad8365ebb0e0dfb5fa0c39a22c5e62c69d2e310.jpg', },
  { id: 'casey-kowalik', subspecialty: 'URPS', path: 'h-r/casey-kowalik', name: 'Casey Kowalik', photo: 'https://cdn-images.kyruus.com/providermatch/ukhs/photos/200/kowalik-casey-1083925127.jpg', },
  { id: 'chris-maher', subspecialty: 'URPS', path: 'h-r/chris-maher', name: 'Chris Maher', photo: 'https://about.uq.edu.au/sites/default/files/profiles/7189.jpeg', },
  { id: 'david-rahn', subspecialty: 'URPS', path: 'h-r/david-rahn', name: 'David Rahn', photo: 'https://d38sso7f6qz01j.cloudfront.net/original_images/rahn-david-49553-400x400.jpg', },
  { id: 'donald-ostergard', subspecialty: 'URPS', path: 'h-r/donald-ostergard', name: 'Donald Ostergard', photo: 'https://www.iuga.org/images/content/past-presidents/Donald.Ostergard.jpg', },
  { id: 'gamal-ghoniem', subspecialty: 'URPS', path: 'a-g/gamal-ghoniem', name: 'Gamal M. Ghoniem', photo: 'https://cdn-images.kyruus.com/providermatch/ucihealth/photos/orig/ghoniem-gamal-1467415919.png', },
  { id: 'harold-drutz', subspecialty: 'URPS', path: 'a-g/harold-drutz', name: 'Harold Drutz', photo: 'https://obgyn.utoronto.ca/sites/default/files/styles/square_1_1_600/public/assets/faculty/image/Harold.Drutz_.jpg?itok=rB6QduBP', },
  { id: 'jennifer-wu', subspecialty: 'URPS', path: 's-z/jennifer-wu', name: 'Jennifer M. Wu', photo: 'https://www.med.unc.edu/obgyn/wp-content/uploads/sites/1360/2023/08/Jennifer_by_PortraitMadame-4-WEB-e1709758910154.jpg', },
  { id: 'john-occhino', subspecialty: 'URPS', path: 'h-r/john-occhino', name: 'John Occhino', photo: 'https://www.mayoclinic.org/-/media/kcms/employees/2018/06/16/22/29/john-occhino-14786192.jpg', },
  { id: 'john-stoffel', subspecialty: 'URPS', path: 's-z/john-stoffel', name: 'John T. Stoffel', photo: 'https://medschool.umich.edu/sites/default/files/styles/square_1_1/public/2023-11/STOFFEL_John4x5_05.jpg.jpg?h=d94c4b90&itok=ISW0sy2k', },
  { id: 'joshua-cohn', subspecialty: 'URPS', path: 'a-g/joshua-cohn', name: 'Joshua Cohn', photo: 'https://www.templehealth.com/sites/default/files/styles/headshot_full/public/Joshua-Cohn-860x640.jpg?itok=tvmT8PkX', },
  { id: 'judith-goh', subspecialty: 'URPS', path: 'a-g/judith-goh', name: 'Judith Goh', photo: 'https://qpfs.com.au/wp-content/uploads/Prof-Judith-Goh-AO.jpg', },
  { id: 'kaven-baessler', subspecialty: 'URPS', path: 'a-g/kaven-baessler', name: 'Kaven Baessler', photo: 'https://d7es.franziskus-krankenhaus.berlin/sites/default/files/ansprechpartner/2021_Portraits_Baessler_FKH.jpg', },
  { id: 'kavita-mishra', subspecialty: 'URPS', path: 'h-r/kavita-mishra', name: 'Kavita Mishra', photo: 'https://stanfordhealthcare.org/content/dam/SHC/doctors-medicalstaff/m/mishra-kavita-md.jpg/jcr%3Acontent/renditions/original.transform/280x280-q76/image.jpg', },
  { id: 'lewis-wall', subspecialty: 'URPS', path: 's-z/lewis-wall', name: 'Lewis Wall', photo: 'https://anthropology.washu.edu/sites/anthropology.washu.edu/files/styles/square_1_1_1888w/public/2025-04/anthro_wall_l_p1055496.jpg.webp?h=3fa79387', },
  { id: 'linda-cardozo', subspecialty: 'URPS', path: 'a-g/linda-cardozo', name: 'Linda Cardozo', photo: 'https://www.kch.nhs.uk/wp-content/uploads/2023/09/Linda-Cardozo-August-2023-002.jpg', },
  { id: 'lysanne-campeau', subspecialty: 'URPS', path: 'a-g/lysanne-campeau', name: 'Lysanne Campeau', photo: 'https://www.mcgill.ca/surgery/files/surgery/styles/medium_focal__220_x_220_/public/lysanne_campeau_1034_print.jpg?itok=lfpm2Xhu', },
  { id: 'margaret-mueller', subspecialty: 'URPS', path: 'h-r/margaret-mueller', name: 'Margaret Mueller', photo: 'https://www.uchicagomedicine.org/_next/image?q=75&url=https%3A%2F%2Fedge.sitecorecloud.io%2Funichicagomc-81nbqnb3%2Fmedia%2Fimages%2Fucmc%2Fphysician-photos%2Fm-o%2Fmueller-margaret-bio-261x347.jpg&w=3840', },
  { id: 'marlene-corton', subspecialty: 'URPS', path: 'a-g/marlene-corton', name: 'Marlene Corton', photo: 'https://profileplus.swmed.edu/facultydata/23084/images/Corton_Marlene.jpg', },
  { id: 'nazema-siddiqui', subspecialty: 'URPS', path: 's-z/nazema-siddiqui', name: 'Nazema Siddiqui', photo: 'https://www.dukehealth.org/sites/default/files/styles/doctor_profile/public/physician/nazema-y-siddiqui-md-mhsc.jpg?itok=kYlfluxV', },
  { id: 'nirit-rosenblum', subspecialty: 'URPS', path: 'h-r/nirit-rosenblum', name: 'Nirit Rosenblum', photo: 'https://nyulangone.org/images/doctors/r/rosenblum/1144214693/nirit-rosenblum-square.jpg', },
  { id: 'peter-dwyer', subspecialty: 'URPS', path: 'a-g/peter-dwyer', name: 'Peter Dwyer', photo: 'https://sgs.memberclicks.net/assets/images/Peter-Dwyer_original-round.png', },
  { id: 'peter-jeppson', subspecialty: 'URPS', path: 'h-r/peter-jeppson', name: 'Peter Jeppson', photo: 'https://thewomanscenter.com/wp-content/uploads/2026/06/2503180.png', },
  { id: 'ramy-goueli', subspecialty: 'URPS', path: 'a-g/ramy-goueli', name: 'Ramy Goueli', photo: 'https://labs.utsouthwestern.edu/sites/default/files/styles/coh_small_square/public/2024-01/Untitled%20design%20%282%29.jpg?h=57024e64&itok=ViHukEYL', },
  { id: 'roger-goldberg', subspecialty: 'URPS', path: 'a-g/roger-goldberg', name: 'Roger Goldberg' },
  { id: 'rufus-cartwright', subspecialty: 'URPS', path: 'a-g/rufus-cartwright', name: 'Rufus Cartwright', photo: 'https://e522eqc3z66.exactdn.com/wp-content/uploads/Rufus-Cartwright.jpg?strip=all', },
  { id: 'shawn-menefee', subspecialty: 'URPS', path: 'h-r/shawn-menefee', name: 'Shawn Menefee', photo: 'https://www.kp-scalresearch.org/wp-content/uploads/2018/12/0033_Menefee_Shawn-LR-1.png', },
  { id: 'stuart-stanton', subspecialty: 'URPS', path: 's-z/stuart-stanton', name: 'Stuart Stanton' },
  { id: 'thomas-benson', subspecialty: 'URPS', path: 'a-g/thomas-benson', name: 'J. Thomas Benson', photo: 'https://www.augs.org/wp-content/uploads/2025/04/Benson1-e1746302690509.jpg', },
  { id: 'victoria-handa', subspecialty: 'URPS', path: 'h-r/victoria-handa', name: 'Victoria Handa', photo: 'https://image-service-api.prd2.healthsparq.com/api/image?f=webp&fp=auto&h=250&limit-resize=false&url=https%3A%2F%2Fcdn-images.kyruus.com%2Fprovidermatch%2Fjohnshopkins%2Fphotos%2Forig%2Fhanda-victoria-1730139163.jpg&w=200', },
  { id: 'vivian-sung', subspecialty: 'URPS', path: 's-z/vivian-sung', name: 'Vivian W. Sung', photo: 'https://vivo.brown.edu/profile-images/925/300/94/vsung_photo_.jpg', },
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
  // GURS. A school inside another (Webster within Turner-Warwick, Morey within
  // McAninch) keeps its own tab; the parent tab links to it instead of repeating it.
  { id: 'mcaninch',       label: 'McAninch School (UCSF)',            rootId: 'jack-mcaninch',          color: '#185FA5', subspecialty: 'GURS' },
  { id: 'morey',          label: 'Morey School (UT Southwestern)',    rootId: 'allen-morey',            color: '#b45309', subspecialty: 'GURS' },
  { id: 'turner-warwick', label: 'Turner-Warwick School (London)',    rootId: 'richard-turner-warwick', color: '#0D9373', subspecialty: 'GURS' },
  { id: 'webster',        label: 'Webster School (Duke)',             rootId: 'george-webster',         color: '#7c3aed', subspecialty: 'GURS' },
  { id: 'kulkarni',       label: 'Kulkarni School (Pune)',            rootId: 'sanjay-kulkarni',        color: '#DC2626', subspecialty: 'GURS' },
  { id: 'jordan',         label: 'Devine-Jordan School (EVMS)',       rootId: 'charles-devine',         color: '#0284c7', subspecialty: 'GURS' },
  // URPS: the largest roots of the URPS fellowship tree. Urology-based: Raz,
  // McGuire, Dmochowski, Kobashi. OB/GYN-based: Stanton (with Cardozo and Dwyer
  // inside it), Ostergard, Drutz, Brubaker, Benson, Karram.
  { id: 'stanton',        label: "Stanton School (St George's)",     rootId: 'stuart-stanton',         color: '#0D9373', subspecialty: 'URPS' },
  { id: 'cardozo',        label: "Cardozo School (King's College)",   rootId: 'linda-cardozo',          color: '#be185d', subspecialty: 'URPS' },
  { id: 'dwyer',          label: 'Dwyer School (Melbourne)',          rootId: 'peter-dwyer',            color: '#0891b2', subspecialty: 'URPS' },
  { id: 'ostergard',      label: 'Ostergard School (Harbor-UCLA)',    rootId: 'donald-ostergard',       color: '#185FA5', subspecialty: 'URPS' },
  { id: 'drutz',          label: 'Drutz School (Toronto)',            rootId: 'harold-drutz',           color: '#b45309', subspecialty: 'URPS' },
  { id: 'raz',            label: 'Raz School (UCLA)',                 rootId: 'shlomo-raz',             color: '#9333EA', subspecialty: 'URPS' },
  { id: 'brubaker',       label: 'Brubaker School (Loyola)',          rootId: 'linda-brubaker',         color: '#DC2626', subspecialty: 'URPS' },
  { id: 'dmochowski',     label: 'Dmochowski School (Vanderbilt)',    rootId: 'roger-dmochowski',       color: '#0284c7', subspecialty: 'URPS' },
  { id: 'kobashi',        label: 'Kobashi School (Virginia Mason)',   rootId: 'kathleen-kobashi',       color: '#059669', subspecialty: 'URPS' },
  { id: 'benson',         label: 'Benson School (Indiana)',           rootId: 'thomas-benson',          color: '#64748b', subspecialty: 'URPS' },
  { id: 'karram',         label: 'Karram School (Cincinnati)',        rootId: 'mickey-karram',          color: '#7c3aed', subspecialty: 'URPS' },
  { id: 'mcguire',        label: 'McGuire School (Michigan)',         rootId: 'edward-mcguire',         color: '#0EA5E9', subspecialty: 'URPS' },
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
