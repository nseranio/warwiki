export type Subspecialty = 'GURS' | 'URPS' | 'combined';

export type QuizChoice = {
  letter: string; // 'A', 'B', 'C', 'D', 'E'
  text: string;
};

export type QuizQuestion = {
  id: string; // stable kebab-case slug
  subspecialty: Subspecialty;
  prompt: string;
  choices: QuizChoice[];
  answer: string; // matching choice.letter
  explanation: string;
  source: { label: string; href: string };
  tags?: string[];
};

export type Rating = 'wrong' | 'hard' | 'good' | 'easy';

export type ProgressRecord = {
  lastSeenISO: string;
  intervalDays: number;
  ease: number; // 1.3 – 2.5
  reps: number;
};

export type ProgressMap = Record<string, ProgressRecord>;
