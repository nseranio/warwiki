// ─────────────────────────────────────────────────────────
//  WARWIKI — Surgical Lineage Data
//  Source: Notion export + manual curation
// ─────────────────────────────────────────────────────────

export interface Surgeon {
  id: string;
  name: string;
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
    name: 'Richard Turner-Warwick',
    photo: 'https://www.baus.org.uk/_userfiles/pages/images/museum/urologists/RTWBoatRace.jpg',
    country: 'England',
    countryFlag: '🇬🇧',
    born: '1925',
    died: '2020',
    bioUrl: 'https://en.wikipedia.org/wiki/Richard_Turner-Warwick',
    traineeIds: ['sanjay-kulkarni', 'leonard-zinman', 'christopher-chapple'],
  },
  {
    id: 'sanjay-kulkarni',
    name: 'Sanjay Kulkarni',
    photo: 'https://baileyandlove.tandf.co.uk/wp-content/uploads/2024/12/Sanjay-Balwant-Kulkarni.jpg',
    country: 'India',
    countryFlag: '🇮🇳',
    mentorId: 'richard-turner-warwick',
    traineeIds: ['pankaj-joshi'],
  },
  {
    id: 'leonard-zinman',
    name: 'Leonard N. Zinman',
    photo: 'https://urologichistory.museum/Images/collections/scope-of-urology/Summer%202021/Leonard-Zinman.png',
    mentorId: 'richard-turner-warwick',
    traineeIds: [],
  },
  {
    id: 'christopher-chapple',
    name: 'Christopher R. Chapple',
    photo: 'https://www.ics.org/gfx/ContactPhoto/200/000014641.png',
    country: 'England',
    countryFlag: '🇬🇧',
    mentorId: 'richard-turner-warwick',
    traineeIds: [],
  },
  {
    id: 'pankaj-joshi',
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
    name: 'Jack W. McAninch',
    photo: 'http://jacksonholeseminars.com/wp-content/uploads/2016/07/McAninch_Jac-216x300-216x300.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [
      'allen-morey', 'hunter-wessells', 'jeremy-meyers', 'benjamin-breyer',
      'sean-elliott', 'jill-buckley', 'michael-metro', 'steve-brandes',
      'bryan-voelzke', 'bradley-erickson', 'keith-rourke',
      'noel-armenakas', 'reynaldo-gomez',
    ],
  },
  {
    id: 'allen-morey',
    name: 'Allen F. Morey',
    photo: 'https://thcds.com/media/3136/dr-allen-morey.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'jack-mcaninch',
    traineeIds: ['steve-hudak', 'jay-simhan', 'lee-zhao', 'maia-vandyke', 'michael-davenport'],
  },
  {
    id: 'hunter-wessells',
    name: 'Hunter Wessells',
    photo: 'https://urology.uw.edu/sites/default/files/2022-09/Wessells_Hunter_sq.jpeg',
    mentorId: 'jack-mcaninch',
    traineeIds: ['judith-hagedorn', 'alex-vanni', 'joshua-broghammer', 'thomas-smith-iii', 'bradley-figler'],
  },
  {
    id: 'jeremy-meyers',
    name: 'Jeremy Meyers',
    photo: 'https://medicine.utah.edu/sites/g/files/zrelqx351/files/styles/portrait_laptop/public/media/images/2022/myers-chief.jpeg',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'benjamin-breyer',
    name: 'Benjamin N. Breyer',
    photo: 'https://cdn-images.kyruus.com/providermatch/ucsf/photos/orig/breyer-benjamin-1316160211.jpg',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'sean-elliott',
    name: 'Sean P. Elliott',
    photo: 'https://www.nbrg.org/perch/resources/elliott-w800.jpg',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'jill-buckley',
    name: 'Jill C. Buckley',
    photo: 'http://www.turnsresearch.org/perch/resources/jillbuckley-w800.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'michael-metro',
    name: 'Michael Metro',
    photo: 'https://img-vitals.lb.wbmdstatic.com/lhd/provider/810750_db52e8e8-e492-400f-abbd-2b869cd10dc0.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'steve-brandes',
    name: 'Steve Brandes',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'bryan-voelzke',
    name: 'Bryan B. Voelzke',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'bradley-erickson',
    name: 'Bradley A. Erickson',
    photo: 'https://urology.ucsf.edu/sites/default/files/styles/sa_square_540/public/2025-07/Bradley%20A.%20Erickson%2C%20MD%2C%20MS.jpeg.webp',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'keith-rourke',
    name: 'Keith F. Rourke',
    country: 'Canada',
    countryFlag: '🇨🇦',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'noel-armenakas',
    name: 'Noel A. Armenakas',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  {
    id: 'reynaldo-gomez',
    name: 'Reynaldo Gomez',
    mentorId: 'jack-mcaninch',
    traineeIds: [],
  },
  // Morey trainees
  {
    id: 'steve-hudak',
    name: 'Steve Hudak',
    photo: 'https://d38sso7f6qz01j.cloudfront.net/images/Steven-Hudak-432x432.width-400.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'allen-morey',
    traineeIds: [],
  },
  {
    id: 'jay-simhan',
    name: 'Jay Simhan',
    photo: 'https://www.foxchase.org/sites/default/files/styles/person_photo/public/photo/Jay-Simhan-860x640.jpg',
    mentorId: 'allen-morey',
    traineeIds: [],
  },
  {
    id: 'lee-zhao',
    name: 'Lee Zhao',
    photo: 'https://nyulangone.org/images/doctors/z/zhao/1679729297/lee-c-zhao-square.jpg',
    mentorId: 'allen-morey',
    traineeIds: ['min-jun'],
  },
  {
    id: 'maia-vandyke',
    name: 'Maia VanDyke',
    mentorId: 'allen-morey',
    traineeIds: [],
  },
  {
    id: 'michael-davenport',
    name: 'Michael Davenport',
    mentorId: 'allen-morey',
    traineeIds: [],
  },
  // Wessells trainees
  {
    id: 'judith-hagedorn',
    name: 'Judith Hagedorn',
    photo: 'https://www.fredhutch.org/content/dam/www/provider-photos/h/judith-hagedorn/provider-judith-hagedorn-profile-2x.jpg',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  {
    id: 'alex-vanni',
    name: 'Alex J. Vanni',
    photo: 'https://pbs.twimg.com/profile_images/1052006135798976512/tLjCglpl_400x400.jpg',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  {
    id: 'joshua-broghammer',
    name: 'Joshua A. Broghammer',
    photo: 'https://turnsresearch.org/perch/resources/broghammer-w800.jpg',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  {
    id: 'thomas-smith-iii',
    name: 'Thomas G. Smith III',
    photo: 'https://faculty.mdanderson.org/content/dam/mdanderson/images/fis/thomas_smithiii.jpg',
    mentorId: 'hunter-wessells',
    traineeIds: [],
  },
  {
    id: 'bradley-figler',
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
    name: 'Min Jun',
    photo: 'https://www.transhealthcare.org/wp-content/uploads/dr-min-jun-2.jpg',
    mentorId: 'lee-zhao',
    traineeIds: [],
  },

  // ── Webster School ──────────────────────────────────────
  {
    id: 'george-webster',
    name: 'George D. Webster',
    photo: 'https://scholars.duke.edu/profile-images/full/0108871.jpg',
    traineeIds: ['brian-flynn', 'andrew-peterson', 'jack-walter', 'henry-ruiz'],
  },
  {
    id: 'brian-flynn',
    name: 'Brian Flynn',
    photo: 'https://som.cuanschutz.edu/FIMS/Content/faculty/3122/CU-Doctors-3122.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    mentorId: 'george-webster',
    traineeIds: ['dmitriy-nikolavsky', 'humberto-villarreal'],
  },
  {
    id: 'andrew-peterson',
    name: 'Andrew C. Peterson',
    photo: 'https://www.dukehealth.org/sites/default/files/styles/doctor_profile/public/physician/andrew-c-peterson-md.jpg',
    mentorId: 'george-webster',
    traineeIds: [],
  },
  {
    id: 'jack-walter',
    name: 'Jack Walter',
    mentorId: 'george-webster',
    traineeIds: [],
  },
  {
    id: 'henry-ruiz',
    name: 'Henry E. Ruiz',
    mentorId: 'george-webster',
    traineeIds: [],
  },
  // Flynn trainees
  {
    id: 'dmitriy-nikolavsky',
    name: 'Dmitriy Nikolavsky',
    photo: 'https://www.upstate.edu/urology/images/rwd/transgender-nikolavsky.jpg',
    mentorId: 'brian-flynn',
    traineeIds: [],
  },
  {
    id: 'humberto-villarreal',
    name: 'Humberto Villarreal',
    photo: 'https://pbs.twimg.com/profile_images/1640549546513289216/kGpy8t6Z_400x400.jpg',
    mentorId: 'brian-flynn',
    traineeIds: [],
  },

  // ── Santucci School ─────────────────────────────────────
  {
    id: 'richard-santucci',
    name: 'Richard Santucci',
    traineeIds: ['curtis-crane'],
  },
  {
    id: 'curtis-crane',
    name: 'Curtis Crane',
    mentorId: 'richard-santucci',
    traineeIds: [],
  },

  // ── Independent Figures ─────────────────────────────────
  {
    id: 'gerald-jordan',
    name: 'Gerald H. Jordan',
    photo: 'http://jacksonholeseminars.com/wp-content/uploads/2014/11/Gerald-H.-Jordan-MD.jpg',
    traineeIds: [],
  },
  {
    id: 'charles-devine',
    name: 'Charles J. Devine Jr.',
    photo: 'https://societygurs.org/wp-content/uploads/2019/10/Devine.jpg',
    traineeIds: [],
  },
  {
    id: 'kurt-mccammon',
    name: 'Kurt A. McCammon',
    photo: 'http://jacksonholeseminars.com/wp-content/uploads/2021/10/McCammonBOD2018-3-684x1024.jpg',
    traineeIds: [],
  },
  {
    id: 'guido-barbagli',
    name: 'Guido Barbagli',
    photo: 'http://www.uretra.it/wp-content/gallery/cv-guido-barbagli/cv-barbagli-GuidoBarbagli.jpg',
    bioUrl: 'http://www.uretra.it/cv-guido-barbagli-medici/?lang=en',
    traineeIds: [],
  },
  {
    id: 'anthony-mundy',
    name: 'Anthony R. Mundy',
    photo: 'https://www.cromwellhospital.com/wp-content/uploads/2023/04/Prof-Anthony-Mundy-scaled-e1683802581164-1824x2048.jpg',
    traineeIds: [],
  },
  {
    id: 'maurice-garcia',
    name: 'Maurice Garcia',
    photo: 'https://www.transhealthcare.org/wp-content/uploads/dr-maurice-garcia.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'joel-gelman',
    name: 'Joel Gelman',
    photo: 'https://centerforreconstructiveurology.org/wp-content/uploads/2023/03/joel-gelman.jpg',
    traineeIds: [],
  },
  {
    id: 'ryan-terlecki',
    name: 'Ryan Terlecki',
    photo: 'https://wp02-media.cdn.ihealthspot.com/wp-content/uploads/sites/382/2019/02/Terlecki-web.png',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'akio-horiguchi',
    name: 'Akio Horiguchi',
    photo: 'https://cise2025.org/wp-content/uploads/2024/11/PROF.-Akio-Horiguchi-MD.png',
    country: 'Japan',
    countryFlag: '🇯🇵',
    traineeIds: [],
  },
  {
    id: 'paul-perito',
    name: 'Paul Perito',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'f-brantley-scott',
    name: 'F. Brantley Scott',
    traineeIds: [],
  },
  {
    id: 'ramon-virasoro',
    name: 'Ramon Virasoro',
    traineeIds: [],
  },
  {
    id: 'chris-gonzalez',
    name: 'Chris Gonzalez',
    photo: 'https://grandroundsinurology.com/wp-content/uploads/2021/05/Gonzalez_M_400x400-300x300.jpg',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'ziho-lee',
    name: 'Ziho Lee',
    photo: 'https://deptcommon.fsm.northwestern.edu/profile-images/51913.jpeg',
    traineeIds: [],
  },
  {
    id: 'brian-inouye',
    name: 'Brian Inouye',
    traineeIds: [],
  },
  {
    id: 'krishnan-venkatesan',
    name: 'Krishnan Venkatesan',
    traineeIds: [],
  },
  {
    id: 'nathan-shaw',
    name: 'Nathan Shaw',
    traineeIds: [],
  },
  {
    id: 'daniel-eun',
    name: 'Daniel Eun',
    country: 'United States',
    countryFlag: '🇺🇸',
    traineeIds: [],
  },
  {
    id: 'kunlin-yang',
    name: 'Kunlin Yang',
    country: 'China',
    countryFlag: '🇨🇳',
    traineeIds: [],
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
}

export const DYNASTIES: Dynasty[] = [
  { id: 'mcaninch',       label: 'McAninch School',       rootId: 'jack-mcaninch',             color: '#185FA5' },
  { id: 'turner-warwick', label: 'Turner-Warwick School',  rootId: 'richard-turner-warwick',    color: '#0D9373' },
  { id: 'webster',        label: 'Webster School',         rootId: 'george-webster',            color: '#7c3aed' },
  { id: 'santucci',       label: 'Santucci School',        rootId: 'richard-santucci',          color: '#b45309' },
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
