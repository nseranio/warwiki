import trialsJson from './trials.generated.json';
import decisionsJson from './decisions.json';
import eventsJson from './events.generated.json';
import type {Decision, Event, Trial} from './types';

export const trials = trialsJson as Trial[];
export const decisions = decisionsJson as Decision[];
export const events = eventsJson as Event[];
export const trialById = (id: string) => trials.find(trial => trial.id === id);
export const decisionById = (id: string) => decisions.find(decision => decision.id === id);
export const primaryReport = (trial: Trial) => trial.reports.find(report => report.kind === 'primary')!;
