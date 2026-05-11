import type { AppState, DashboardMode } from './types';

export type Action =
  | { type: 'SET_MODE'; mode: DashboardMode }
  | { type: 'TOGGLE_STAGE'; id: string }
  | { type: 'ADD_TIMER'; label: string; durationSec: number }
  | { type: 'START_PAUSE_TIMER'; id: string; now: number }
  | { type: 'RESET_TIMER'; id: string }
  | { type: 'SET_ACTIVE_TIMER'; id: string }
  | { type: 'ADD_BATHROOM_OUT'; student: string; now: number }
  | { type: 'MARK_BATHROOM_IN'; id: string; now: number }
  | { type: 'ADD_NOTE'; text: string; now: number }
  | { type: 'TOGGLE_NOTE_DONE'; id: string }
  | { type: 'PICK_RANDOM_STUDENT' };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_MODE': return { ...state, mode: action.mode };
    case 'TOGGLE_STAGE': return { ...state, lessonStages: state.lessonStages.map((s) => s.id === action.id ? { ...s, completed: !s.completed } : s) };
    case 'ADD_TIMER': {
      const id = crypto.randomUUID();
      return { ...state, timers: [{ id, label: action.label, durationSec: action.durationSec, pausedRemainingSec: action.durationSec }, ...state.timers], activeTimerId: id };
    }
    case 'START_PAUSE_TIMER': return { ...state, timers: state.timers.map((t) => {
      if (t.id !== action.id) return t;
      if (t.endAt) return { ...t, pausedRemainingSec: Math.max(0, Math.floor((t.endAt - action.now) / 1000)), endAt: undefined };
      return { ...t, endAt: action.now + t.pausedRemainingSec * 1000 };
    })};
    case 'RESET_TIMER': return { ...state, timers: state.timers.map((t) => t.id === action.id ? { ...t, pausedRemainingSec: t.durationSec, endAt: undefined } : t) };
    case 'SET_ACTIVE_TIMER': return { ...state, activeTimerId: action.id };
    case 'ADD_BATHROOM_OUT': return { ...state, bathroomActive: [{ id: crypto.randomUUID(), student: action.student, outAt: action.now }, ...state.bathroomActive] };
    case 'MARK_BATHROOM_IN': {
      const target = state.bathroomActive.find((b) => b.id === action.id); if (!target) return state;
      return { ...state, bathroomActive: state.bathroomActive.filter((b) => b.id !== action.id), bathroomHistory: [{ ...target, inAt: action.now }, ...state.bathroomHistory] };
    }
    case 'ADD_NOTE': return { ...state, notes: [{ id: crypto.randomUUID(), text: action.text, createdAt: action.now, pinned: false, done: false }, ...state.notes] };
    case 'TOGGLE_NOTE_DONE': return { ...state, notes: state.notes.map((n) => n.id === action.id ? { ...n, done: !n.done } : n) };
    case 'PICK_RANDOM_STUDENT': {
      const available = state.randomStudents.filter((s) => !state.pickedStudentIds.includes(s));
      if (!available.length) return { ...state, pickedStudentIds: [] };
      const picked = available[Math.floor(Math.random() * available.length)];
      return { ...state, pickedStudentIds: [...state.pickedStudentIds, picked] };
    }
    default: return state;
  }
}
