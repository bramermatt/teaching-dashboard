export type BellSegment = {
  label: string;
  start: string;
  end: string;
};

export type BellPeriod = {
  label: string;
  start: string;
  end: string;
  segments: BellSegment[];
};

export type BathroomEntry = {
  id: string;
  student: string;
  outAt: number;
  inAt?: number;
};

export type QuickTimer = {
  id: string;
  label: string;
  durationSec: number;
  endAt?: number;
  pausedRemainingSec?: number;
};

export type DashboardState = {
  unitTopic: string;
  notes: string;
  agenda: string[];
  bathroom: BathroomEntry[];
  timers: QuickTimer[];
};
