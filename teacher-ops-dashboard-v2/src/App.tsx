import { useEffect, useMemo, useState } from 'react';
import { Panel } from './components/Panel';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import type { BellPeriod, DashboardState, QuickTimer } from './types/dashboard';
import { formatClock, formatDate, formatDuration, toMinutes } from './utils/time';

const schedule: BellPeriod[] = [
  { label: 'Period 1', start: '07:45', end: '08:30', segments: [{ label: 'No RR', start: '07:45', end: '08:00' }, { label: 'RR Window', start: '08:00', end: '08:15' }, { label: 'No RR', start: '08:15', end: '08:30' }] },
  { label: 'Period 2', start: '08:35', end: '09:20', segments: [{ label: 'No RR', start: '08:35', end: '08:50' }, { label: 'RR Window', start: '08:50', end: '09:05' }, { label: 'No RR', start: '09:05', end: '09:20' }] },
  { label: 'Period 3', start: '09:25', end: '10:10', segments: [{ label: 'No RR', start: '09:25', end: '09:40' }, { label: 'RR Window', start: '09:40', end: '09:55' }, { label: 'No RR', start: '09:55', end: '10:10' }] },
  { label: 'Period 5', start: '11:55', end: '12:40', segments: [{ label: 'No RR', start: '11:55', end: '12:10' }, { label: 'RR Window', start: '12:10', end: '12:25' }, { label: 'No RR', start: '12:25', end: '12:40' }] }
];

const initialState: DashboardState = {
  unitTopic: 'Integrated Chemistry/Physics',
  notes: '',
  agenda: ['Warmup', 'Lab setup', 'Mini lesson', 'Exit ticket'],
  bathroom: [],
  timers: [
    { id: crypto.randomUUID(), label: 'Work Timer', durationSec: 180 },
    { id: crypto.randomUUID(), label: 'Transition', durationSec: 60 }
  ]
};

export function App() {
  const [now, setNow] = useState(() => Date.now());
  const [student, setStudent] = useState('');
  const [state, setState] = useLocalStorageState<DashboardState>('teacher-ops-v2-state', initialState);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const nowMin = useMemo(() => {
    const d = new Date(now);
    return d.getHours() * 60 + d.getMinutes();
  }, [now]);

  const currentPeriod = schedule.find((p) => nowMin >= toMinutes(p.start) && nowMin < toMinutes(p.end));
  const nextPeriod = schedule.find((p) => nowMin < toMinutes(p.start));

  const addBathroom = () => {
    if (!student.trim()) return;
    setState((s) => ({ ...s, bathroom: [{ id: crypto.randomUUID(), student: student.trim(), outAt: Date.now() }, ...s.bathroom] }));
    setStudent('');
  };

  const markIn = (id: string) => setState((s) => ({ ...s, bathroom: s.bathroom.map((b) => (b.id === id ? { ...b, inAt: Date.now() } : b)) }));

  const updateTimer = (id: string, fn: (t: QuickTimer) => QuickTimer) => setState((s) => ({ ...s, timers: s.timers.map((t) => (t.id === id ? fn(t) : t)) }));

  return (
    <main className="h-screen overflow-hidden bg-ops-bg p-3 font-mono text-ops-text">
      <div className="grid h-full grid-cols-12 gap-3">
        <div className="col-span-3 grid gap-3">
          <Panel title="Current Time">
            <div className="text-3xl font-bold">{formatClock(new Date(now))}</div>
            <div className="text-xs text-ops-muted">{formatDate(new Date(now))}</div>
          </Panel>
          <Panel title="Current Class / Unit">
            <div className="text-lg">{currentPeriod?.label ?? 'Outside Class'}</div>
            <div className="mt-2 text-sm text-ops-accent">{state.unitTopic}</div>
          </Panel>
          <Panel title="Bell Countdowns">
            <div className="text-sm">Now: {currentPeriod ? `${currentPeriod.label} (${currentPeriod.start}-${currentPeriod.end})` : 'Passing/Off'}</div>
            <div className="mt-1 text-sm">Next: {nextPeriod ? `${nextPeriod.label} in ${formatDuration((toMinutes(nextPeriod.start) - nowMin) * 60)}` : 'Done for day'}</div>
          </Panel>
        </div>

        <div className="col-span-6 grid gap-3">
          <Panel title="Bathroom Tracker">
            <div className="mb-2 flex gap-2">
              <input className="flex-1 rounded border border-ops-border bg-ops-panel2 p-2" value={student} onChange={(e) => setStudent(e.target.value)} placeholder="Student name" onKeyDown={(e) => e.key === 'Enter' && addBathroom()} />
              <button className="rounded bg-ops-accent px-3 py-2 text-black" onClick={addBathroom}>Out</button>
            </div>
            <div className="max-h-64 overflow-auto space-y-2 text-sm">
              {state.bathroom.map((b) => {
                const elapsed = ((b.inAt ?? now) - b.outAt) / 1000;
                return <div key={b.id} className="rounded border border-ops-border p-2">
                  <div className="flex justify-between"><span>{b.student}</span><span className={elapsed > 600 ? 'text-ops-danger' : 'text-ops-ok'}>{formatDuration(elapsed)}</span></div>
                  <div className="text-xs text-ops-muted">Out: {new Date(b.outAt).toLocaleTimeString()} {b.inAt ? `• In: ${new Date(b.inAt).toLocaleTimeString()}` : ''}</div>
                  {!b.inAt && <button className="mt-1 rounded bg-ops-ok px-2 py-1 text-xs text-black" onClick={() => markIn(b.id)}>Mark In</button>}
                </div>;
              })}
            </div>
          </Panel>

          <Panel title="Daily Notes / Scratchpad">
            <textarea className="h-44 w-full rounded border border-ops-border bg-ops-panel2 p-2 text-sm" value={state.notes} onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))} placeholder="Type quick notes, callouts, follow-ups..." />
          </Panel>
        </div>

        <div className="col-span-3 grid gap-3">
          <Panel title="Quick Timers">
            <div className="space-y-2 text-sm">
              {state.timers.map((t) => {
                const activeLeft = t.endAt ? Math.max(0, Math.floor((t.endAt - now) / 1000)) : t.pausedRemainingSec ?? t.durationSec;
                return <div key={t.id} className="rounded border border-ops-border p-2">
                  <div className="flex justify-between"><span>{t.label}</span><span>{formatDuration(activeLeft)}</span></div>
                  <div className="mt-1 flex gap-1">
                    <button className="rounded bg-ops-accent px-2 text-xs text-black" onClick={() => updateTimer(t.id, (x) => ({ ...x, endAt: Date.now() + (x.pausedRemainingSec ?? x.durationSec) * 1000, pausedRemainingSec: undefined }))}>Start</button>
                    <button className="rounded bg-ops-warn px-2 text-xs text-black" onClick={() => updateTimer(t.id, (x) => ({ ...x, pausedRemainingSec: x.endAt ? Math.max(0, Math.floor((x.endAt - Date.now()) / 1000)) : x.pausedRemainingSec ?? x.durationSec, endAt: undefined }))}>Pause</button>
                    <button className="rounded bg-ops-danger px-2 text-xs text-black" onClick={() => updateTimer(t.id, (x) => ({ ...x, endAt: undefined, pausedRemainingSec: x.durationSec }))}>Reset</button>
                  </div>
                </div>;
              })}
            </div>
          </Panel>

          <Panel title="Today's Agenda / Tasks">
            <ul className="space-y-1 text-sm">
              {state.agenda.map((item, i) => <li key={item + i}>[{i + 1}] {item}</li>)}
            </ul>
          </Panel>

          <Panel title="Period Tracker">
            <div className="space-y-1 text-xs">
              {schedule.map((p) => <div key={p.label} className={`rounded border p-1 ${currentPeriod?.label === p.label ? 'border-ops-accent bg-ops-panel2' : 'border-ops-border'}`}>{p.label} {p.start}-{p.end}</div>)}
            </div>
          </Panel>
        </div>
      </div>
    </main>
  );
}
