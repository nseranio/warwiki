// ─────────────────────────────────────────────────────────
//  WARWIKI — Surgical Lineage Data
//  Source: Notion export + manual curation
// ─────────────────────────────────────────────────────────

export type Subspecialty = 'GURS' | 'URPS';

export interface Surgeon {
  id: string;
  /** Subfolder-relative path used for linking, e.g. "h-r/jack-mcaninch" */
  path: string;
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
    photo: 'http://jacksonholeseminars.com/wp-content/uploads/2016/07/McAninch_Jac-216x300-216x300.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [
      'allen-morey', 'hunter-wessells', 'jeremy-meyers', 'benjamin-breyer',
      'sean-elliott', 'jill-buckley', 'michael-metro', 'steve-brandes',
      'bryan-voelzke', 'bradley-erickson',
      'noel-armenakas', 'reynaldo-gomez',
    ],
  },
  {
    id: 'allen-morey',
    path: 'h-r/allen-morey',
    name: 'Allen F. Morey',
    photo: 'https://thcds.com/media/3136/dr-allen-morey.jpg',
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
    id: 'jeremy-meyers',
    path: 'h-r/jeremy-meyers',
    name: 'Jeremy Meyers',
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
    photo: 'http://www.turnsresearch.org/perch/resources/jillbuckley-w800.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'michael-metro',
    path: 'h-r/michael-metro',
    name: 'Michael Metro',
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
    id: 'bryan-voelzke',
    path: 's-z/bryan-voelzke',
    name: 'Bryan B. Voelzke',
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
    institution: 'University of Alberta',
    mentorId: 'gerald-jordan',
    traineeIds: [],
  },
  {
    id: 'noel-armenakas',
    path: 'a-g/noel-armenakas',
    name: 'Noel A. Armenakas',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'reynaldo-gomez',
    path: 'a-g/reynaldo-gomez',
    name: 'Reynaldo Gomez',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  // Morey trainees
  {
    id: 'steve-hudak',
    path: 'h-r/steve-hudak',
    name: 'Steve Hudak',
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
    id: 'maia-vandyke',
    path: 's-z/maia-vandyke',
    name: 'Maia VanDyke',
    mentorId: 'allen-morey',
    traineeIds: [],
  },
  {
    id: 'michael-davenport',
    path: 'a-g/michael-davenport',
    name: 'Michael Davenport',
    mentorId: 'allen-morey',
    traineeIds: [],
  },
  // Wessells trainees
  {
    id: 'judith-hagedorn',
    path: 'h-r/judith-hagedorn',
    name: 'Judith Hagedorn',
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
    id: 'joshua-broghammer',
    path: 'a-g/joshua-broghammer',
    name: 'Joshua A. Broghammer',
    photo: 'https://turnsresearch.org/perch/resources/broghammer-w800.jpg',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  {
    id: 'thomas-smith-iii',
    path: 's-z/thomas-smith-iii',
    name: 'Thomas G. Smith III',
    photo: 'https://faculty.mdanderson.org/content/dam/mdanderson/images/fis/thomas_smithiii.jpg',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  {
    id: 'bradley-figler',
    path: 'a-g/bradley-figler',
    name: 'Bradley Figler',
    photo: 'https://www.transhealthcare.org/wp-content/uploads/dr-brad-figler.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  // Zhao trainee
  {
    id: 'min-jun',
    path: 'h-r/min-jun',
    name: 'Min Jun',
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
      'bernard-goldwasser',   // 1984–1985
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
  { id: 'steve-silhelnik',    path: 's-z/steve-silhelnik',    name: 'Steve Silhelnik',           mentorId: 'george-webster', traineeIds: [] },
  { id: 'bernard-goldwasser', path: 'a-g/bernard-goldwasser', name: 'Bernard Z. Goldwasser',     mentorId: 'george-webster', traineeIds: [] },
  { id: 'william-bonney',     path: 'a-g/william-bonney',     name: 'William Bonney',            mentorId: 'george-webster', traineeIds: [] },
  { id: 'niall-galloway',     path: 'a-g/niall-galloway',     name: 'Niall T.M. Galloway',       mentorId: 'george-webster', traineeIds: [] },
  { id: 'jacob-ramon',        path: 'h-r/jacob-ramon',        name: 'Jacob Ramon',               mentorId: 'george-webster', traineeIds: [] },
  // christopher-chapple is kept under Turner-Warwick (primary mentor); also listed in Webster's traineeIds
  { id: 'karl-kreder',        path: 'h-r/karl-kreder',        name: 'Karl J. Kreder',            mentorId: 'george-webster', traineeIds: [] },
  { id: 'joseph-khoury',      path: 'h-r/joseph-khoury',      name: 'Joseph M. Khoury',          mentorId: 'george-webster', traineeIds: [] },
  { id: 'susan-timmons',      path: 's-z/susan-timmons',      name: 'Susan L. Timmons',          mentorId: 'george-webster', traineeIds: [] },
  { id: 'scott-macdiarmid',   path: 'h-r/scott-macdiarmid',   name: 'Scott A. MacDiarmid',       mentorId: 'george-webster', traineeIds: [] },
  { id: 'stephen-mark',       path: 'h-r/stephen-mark',       name: 'Stephen Mark',              mentorId: 'george-webster', traineeIds: [] },
  { id: 'steve-waxman',       path: 's-z/steve-waxman',       name: 'Steve Waxman',              mentorId: 'george-webster', traineeIds: [] },
  { id: 'david-couillard',    path: 'a-g/david-couillard',    name: 'David R. Couillard',        mentorId: 'george-webster', traineeIds: [] },
  { id: 'lesley-carr',        path: 'a-g/lesley-carr',        name: 'Lesley K. Carr',            mentorId: 'george-webster', traineeIds: [] },
  { id: 'james-wright',       path: 's-z/james-wright',       name: 'E. James Wright',           mentorId: 'george-webster', traineeIds: [] },
  { id: 'christophe-iselin',  path: 'h-r/christophe-iselin',  name: 'Christophe E. Iselin',      mentorId: 'george-webster', traineeIds: [] },
  {
    id: 'henry-ruiz',
    path: 'h-r/henry-ruiz',
    name: 'Henry E. Ruiz',
    mentorId: 'george-webster',
    traineeIds: [],
  },
  { id: 'michael-guralnick',  path: 'a-g/michael-guralnick',  name: 'Michael L. Guralnick',      mentorId: 'george-webster', traineeIds: [] },
  { id: 'elizabeth-miller',   path: 'h-r/elizabeth-miller',   name: 'Elizabeth A. Miller',       mentorId: 'george-webster', traineeIds: [] },
  { id: 'khai-lee-toh',       path: 's-z/khai-lee-toh',       name: 'Khai Lee Toh',              mentorId: 'george-webster', traineeIds: [] },
  {
    id: 'brian-flynn',
    path: 'a-g/brian-flynn',
    name: 'Brian J. Flynn',
    photo: 'https://som.cuanschutz.edu/FIMS/Content/faculty/3122/CU-Doctors-3122.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'george-webster',
    traineeIds: ['dmitriy-nikolavsky', 'humberto-villarreal'],
  },
  {
    id: 'andrew-peterson',
    path: 'h-r/andrew-peterson',
    name: 'Andrew C. Peterson',
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
  { id: 'jennifer-tash',      path: 's-z/jennifer-tash',      name: 'Jennifer A. Tash',          mentorId: 'george-webster', traineeIds: [] },
  { id: 'neil-sherman',       path: 's-z/neil-sherman',       name: 'Neil D. Sherman',           mentorId: 'george-webster', traineeIds: [] },
  { id: 'elizabeth-anoia',    path: 'a-g/elizabeth-anoia',    name: 'Elizabeth J. Anoia',        mentorId: 'george-webster', traineeIds: [] },
  { id: 'neil-grafstein',     path: 'a-g/neil-grafstein',     name: 'Neil H. Grafstein',         mentorId: 'george-webster', traineeIds: [] },
  {
    id: 'jack-walter',
    path: 's-z/jack-walter',
    name: 'Jack R. Walter',
    mentorId: 'george-webster',
    traineeIds: [],
  },
  { id: 'daniel-rapoport',    path: 'h-r/daniel-rapoport',    name: 'Daniel Rapoport',           mentorId: 'george-webster', traineeIds: [] },
  { id: 'kristy-borawski',    path: 'a-g/kristy-borawski',    name: 'Kristy Borawski',           mentorId: 'george-webster', traineeIds: [] },
  { id: 'aaron-lentz',        path: 'h-r/aaron-lentz',        name: 'Aaron Lentz',               mentorId: 'george-webster', traineeIds: [] },
  { id: 'joshua-lohri',       path: 'h-r/joshua-lohri',       name: 'Joshua Lohri',              mentorId: 'george-webster', traineeIds: [] },
  { id: 'danielle-stackhouse',path: 's-z/danielle-stackhouse',name: 'Danielle Stackhouse',       mentorId: 'george-webster', traineeIds: [] },

  // Peterson fellows (2013–present) ─────────────────────────
  { id: 'crystal-dover',         path: 'a-g/crystal-dover',         name: 'Crystal Dover',              mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'michael-belsante',      path: 'a-g/michael-belsante',      name: 'Michael Belsante',           mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'uwais-zaid',            path: 's-z/uwais-zaid',            name: 'Uwais B. Zaid',              mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'ramiro-madden-fuentes', path: 'h-r/ramiro-madden-fuentes', name: 'Ramiro J. Madden-Fuentes',   mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'arman-kahokehr',        path: 'h-r/arman-kahokehr',        name: 'Arman A. Kahokehr',          mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'urszula-kowalick',      path: 'h-r/urszula-kowalick',      name: 'Urszula Kowalick',           mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'william-boysen',        path: 'a-g/william-boysen',        name: 'William Boysen',             mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'brian-inouye',          path: 'h-r/brian-inouye',          name: 'Brian Inouye',               mentorId: 'andrew-peterson', traineeIds: [] },
  { id: 'kevin-krughoff',        path: 'h-r/kevin-krughoff',        name: 'Kevin Krughoff',             mentorId: 'andrew-peterson', traineeIds: [] },

  // Flynn trainees (from his later Colorado practice) ───────
  {
    id: 'dmitriy-nikolavsky',
    path: 'h-r/dmitriy-nikolavsky',
    name: 'Dmitriy Nikolavsky',
    photo: 'https://www.upstate.edu/urology/images/rwd/transgender-nikolavsky.jpg',
    mentorId: 'brian-flynn',
    traineeIds: [],
  },
  {
    id: 'humberto-villarreal',
    path: 's-z/humberto-villarreal',
    name: 'Humberto Villarreal',
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
    id: 'curtis-crane',
    path: 'a-g/curtis-crane',
    name: 'Curtis Crane',
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
    photo: 'http://jacksonholeseminars.com/wp-content/uploads/2014/11/Gerald-H.-Jordan-MD.jpg',
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
    id: 'kurt-mccammon',
    path: 'h-r/kurt-mccammon',
    name: 'Kurt A. McCammon',
    photo: 'http://jacksonholeseminars.com/wp-content/uploads/2021/10/McCammonBOD2018-3-684x1024.jpg',
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
    id: 'maurice-garcia',
    path: 'a-g/maurice-garcia',
    name: 'Maurice Garcia',
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
    id: 'ryan-terlecki',
    path: 's-z/ryan-terlecki',
    name: 'Ryan Terlecki',
    photo: 'https://wp02-media.cdn.ihealthspot.com/wp-content/uploads/sites/382/2019/02/Terlecki-web.png',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'akio-horiguchi',
    path: 'h-r/akio-horiguchi',
    name: 'Akio Horiguchi',
    photo: 'https://cise2025.org/wp-content/uploads/2024/11/PROF.-Akio-Horiguchi-MD.png',
    country: 'Japan',
    countryFlag: '🇯🇵',
    traineeIds: [],
  },
  {
    id: 'paul-perito',
    path: 'h-r/paul-perito',
    name: 'Paul Perito',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'f-brantley-scott',
    path: 's-z/f-brantley-scott',
    name: 'F. Brantley Scott',
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
    id: 'jessica-delong',
    path: 'a-g/jessica-delong',
    name: 'Jessica M. DeLong',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'gerald-jordan',
    traineeIds: [],
  },
  {
    id: 'chris-gonzalez',
    path: 'a-g/chris-gonzalez',
    name: 'Chris Gonzalez',
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
    id: 'brian-inouye',
    path: 'h-r/brian-inouye',
    name: 'Brian Inouye',
    traineeIds: [],
  },
  {
    id: 'krishnan-venkatesan',
    path: 's-z/krishnan-venkatesan',
    name: 'Krishnan Venkatesan',
    traineeIds: [],
  },
  {
    id: 'nathan-shaw',
    path: 's-z/nathan-shaw',
    name: 'Nathan Shaw',
    traineeIds: [],
  },
  {
    id: 'daniel-eun',
    path: 'a-g/daniel-eun',
    name: 'Daniel Eun',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'kunlin-yang',
    path: 's-z/kunlin-yang',
    name: 'Kunlin Yang',
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
    subspecialty: 'URPS',
    path: 'a-g/claire-burton',
    name: 'Claire Burton',
    country: 'United States',
    countryFlag: '🇺🇸',
    title: 'MD',
    mentorId: 'craig-comiter',
  },
  {
    id: 'seth-cohen',
    subspecialty: 'URPS',
    path: 'a-g/seth-cohen',
    name: 'Seth D. Cohen',
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
    subspecialty: 'URPS',
    path: 'a-g/ekene-enemchukwu',
    name: 'Ekene Enemchukwu',
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
    subspecialty: 'URPS',
    path: 'h-r/cheryl-iglesia',
    name: 'Cheryl B. Iglesia',
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
    subspecialty: 'URPS',
    path: 'h-r/kathleen-kobashi',
    name: 'Kathleen C. Kobashi',
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
    subspecialty: 'URPS',
    path: 'h-r/eric-rovner',
    name: 'Eric S. Rovner',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Medical University of South Carolina',
    title: 'MD',
  },
  {
    id: 'temitope-rude',
    subspecialty: 'URPS',
    path: 'h-r/temitope-rude',
    name: 'Temitope Rude',
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
    subspecialty: 'URPS',
    path: 's-z/sandip-vasavada',
    name: 'Sandip P. Vasavada',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Cleveland Clinic',
    title: 'MD',
  },
  {
    id: 'mark-walters',
    subspecialty: 'URPS',
    path: 's-z/mark-walters',
    name: 'Mark D. Walters',
    country: 'United States',
    countryFlag: '🇺🇸',
    institution: 'Cleveland Clinic (Emeritus)',
    title: 'MD',
  },
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
  { id: 'jordan',         label: 'Jordan School (EVMS)',   rootId: 'gerald-jordan',           color: '#0284c7', subspecialty: 'GURS' },
  // URPS dynasties — grow these as mentor/trainee links are confirmed
  { id: 'raz',            label: 'Raz School',             rootId: 'shlomo-raz',              color: '#9333EA', subspecialty: 'URPS' },
  { id: 'nitti',           label: 'Nitti School',            rootId: 'victor-nitti',             color: '#0EA5E9', subspecialty: 'URPS' },
  { id: 'comiter',         label: 'Comiter School',          rootId: 'craig-comiter',            color: '#DC2626', subspecialty: 'URPS' },
  { id: 'ginsberg',        label: 'Ginsberg School',         rootId: 'david-ginsberg',           color: '#059669', subspecialty: 'URPS' },
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
