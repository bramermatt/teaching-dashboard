export type DashboardMode = 'teaching' | 'planning' | 'grading';

export type CountdownTimer = {
  id: string;
  label: string;
  durationSec: number;
  endAt?: number;
  pausedRemainingSec: number;
};

export type BathroomPass = {
  id: string;
  student: string;
  outAt: number;
  inAt?: number;
};

export type LessonStage = {
  id: string;
  label: 'Bellringer' | 'Instruction' | 'Activity' | 'Lab' | 'Wrap-Up';
  completed: boolean;
};

export type QuickNote = {
  id: string;
  text: string;
  createdAt: number;
  pinned: boolean;
  done: boolean;
};

export type AppState = {
  mode: DashboardMode;
  subject: string;
  unit: string;
  lesson: string;
  objective: string;
  lessonStages: LessonStage[];
  timers: CountdownTimer[];
  activeTimerId?: string;
  bathroomActive: BathroomPass[];
  bathroomHistory: BathroomPass[];
  notes: QuickNote[];
  randomStudents: string[];
  pickedStudentIds: string[];
  quickLinks: { label: string; url: string }[];
};
