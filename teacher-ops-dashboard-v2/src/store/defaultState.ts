import type { AppState } from './types';

export const defaultState: AppState = {
  mode: 'teaching',
  subject: 'ICP',
  unit: 'Unit 7 — Nuclear Chemistry',
  lesson: 'Lesson 14 — Radiation Applications',
  objective: 'Explain common radiation applications and evaluate trade-offs.',
  lessonStages: [
    { id: 's1', label: 'Bellringer', completed: false },
    { id: 's2', label: 'Instruction', completed: false },
    { id: 's3', label: 'Activity', completed: false },
    { id: 's4', label: 'Lab', completed: false },
    { id: 's5', label: 'Wrap-Up', completed: false }
  ],
  timers: [
    { id: 't1', label: 'Bellringer', durationSec: 300, pausedRemainingSec: 300 },
    { id: 't2', label: 'Activity', durationSec: 900, pausedRemainingSec: 900 }
  ],
  activeTimerId: 't1',
  bathroomActive: [],
  bathroomHistory: [],
  notes: [],
  randomStudents: ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley'],
  pickedStudentIds: [],
  quickLinks: [
    { label: 'Periodic Table', url: 'https://ptable.com/' },
    { label: 'Calculator', url: 'https://www.desmos.com/scientific' }
  ]
};
