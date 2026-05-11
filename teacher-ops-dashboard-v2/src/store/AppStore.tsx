import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { reducer } from './actions';
import { defaultState } from './defaultState';
import type { Action, } from './actions';
import type { AppState } from './types';

const Ctx = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);
const KEY = 'teacher-ops-v2-state';

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState, (seed) => {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed;
    try { return { ...seed, ...JSON.parse(raw) as AppState }; } catch { return seed; }
  });

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)); }, [state]);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAppStore must be used inside AppStoreProvider');
  return ctx;
}
