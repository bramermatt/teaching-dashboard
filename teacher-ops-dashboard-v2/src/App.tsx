import { useEffect, useMemo, useState } from 'react';
import { AppStoreProvider, useAppStore } from './store/AppStore';
import { MissionControlLayout } from './layouts/MissionControlLayout';
import { Panel } from './components/Panel';
import { useHotkeys } from './hooks/useHotkeys';
import { formatClock, formatDate, formatDuration, toMinutes } from './utils/time';
import { schedule } from './lib/schedule';

function Dashboard() {
  const { state, dispatch } = useAppStore();
  const [now, setNow] = useState(Date.now());
  const [student, setStudent] = useState('');
  const [note, setNote] = useState('');
  const [newTimerLabel, setNewTimerLabel] = useState('Quick Timer');
  const [newTimerMin, setNewTimerMin] = useState(3);

  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);

  const nowDate = new Date(now);
  const nowMin = nowDate.getHours() * 60 + nowDate.getMinutes();
  const nowSec = nowDate.getHours() * 3600 + nowDate.getMinutes() * 60 + nowDate.getSeconds();
  const current = schedule.find((p) => nowMin >= toMinutes(p.start) && nowMin < toMinutes(p.end));

  const activeTimer = state.timers.find((t) => t.id === state.activeTimerId) ?? state.timers[0];
  useHotkeys({
    space: () => activeTimer && dispatch({ type: 'START_PAUSE_TIMER', id: activeTimer.id, now }),
    r: () => activeTimer && dispatch({ type: 'RESET_TIMER', id: activeTimer.id }),
    t: () => dispatch({ type: 'ADD_TIMER', label: 'Hotkey Timer', durationSec: 300 }),
    f: () => document.documentElement.requestFullscreen?.(),
    n: () => (document.getElementById('quickNoteInput') as HTMLInputElement | null)?.focus(),
    'ctrl+enter': () => note.trim() && (dispatch({ type: 'ADD_NOTE', text: note.trim(), now }), setNote('')),
    escape: () => (document.activeElement as HTMLElement | null)?.blur()
  });

  const left = <>
    <Panel title="Clock">
      <div className="text-4xl font-bold">{formatClock(nowDate)}</div><p className="text-xs text-ops-muted">{formatDate(nowDate)}</p>
      <p className="mt-2 text-sm">{current ? current.label : 'Outside class'}</p>
    </Panel>
    <Panel title="Bell Timers">
      <p className="text-sm">Class End: {current ? formatDuration(toMinutes(current.end) * 60 - nowSec) : '--:--'}</p>
      <p className="text-sm">RR Opens: {current ? formatDuration(Math.max(0, toMinutes(current.breakStart) * 60 - nowSec)) : '--:--'}</p>
      <p className="text-sm">RR Closes: {current ? formatDuration(Math.max(0, toMinutes(current.breakEnd) * 60 - nowSec)) : '--:--'}</p>
    </Panel>
    <Panel title="Mode">
      <div className="grid grid-cols-3 gap-1 text-xs">{(['teaching','planning','grading'] as const).map((m)=><button key={m} className={`rounded border px-2 py-1 ${state.mode===m?'border-ops-accent bg-ops-panel2':'border-ops-border'}`} onClick={()=>dispatch({type:'SET_MODE',mode:m})}>{m}</button>)}</div>
    </Panel>
  </>;

  const center = <>
    <Panel title="Class + Unit Management">
      <p>{state.subject}</p><p className="text-ops-accent">{state.unit}</p><p>{state.lesson}</p><p className="text-xs text-ops-muted">{state.objective}</p>
      <div className="mt-2 grid grid-cols-2 gap-1">{state.lessonStages.map((s)=><button key={s.id} className={`rounded border px-2 py-1 text-left text-xs ${s.completed?'border-ops-ok text-ops-ok':'border-ops-border'}`} onClick={()=>dispatch({type:'TOGGLE_STAGE',id:s.id})}>{s.completed?'[x]':'[ ]'} {s.label}</button>)}</div>
    </Panel>
    <Panel title="Bathroom Tracker">
      <div className="mb-2 flex gap-1"><input className="flex-1 rounded border border-ops-border bg-ops-panel2 p-2 text-sm" value={student} onChange={(e)=>setStudent(e.target.value)} placeholder="student name" onKeyDown={(e)=>e.key==='Enter'&&student.trim()&&(dispatch({type:'ADD_BATHROOM_OUT',student:student.trim(),now}),setStudent(''))}/><button className="rounded bg-ops-accent px-2 text-black" onClick={()=>student.trim()&&(dispatch({type:'ADD_BATHROOM_OUT',student:student.trim(),now}),setStudent(''))}>Out</button></div>
      <div className="space-y-1 text-sm">{state.bathroomActive.map((b)=><div key={b.id} className="rounded border border-ops-border p-1"><div className="flex justify-between"><span>{b.student}</span><span className={((now-b.outAt)/1000)>600?'text-ops-danger':'text-ops-ok'}>{formatDuration((now-b.outAt)/1000)}</span></div><button className="mt-1 rounded bg-ops-ok px-2 text-xs text-black" onClick={()=>dispatch({type:'MARK_BATHROOM_IN',id:b.id,now})}>In</button></div>)}</div>
    </Panel>
  </>;

  const right = <>
    <Panel title="Quick Timers">
      <div className="mb-2 flex gap-1"><input className="w-24 rounded border border-ops-border bg-ops-panel2 px-1 text-xs" value={newTimerLabel} onChange={(e)=>setNewTimerLabel(e.target.value)} /><input type="number" className="w-16 rounded border border-ops-border bg-ops-panel2 px-1 text-xs" value={newTimerMin} onChange={(e)=>setNewTimerMin(Number(e.target.value)||1)} /><button className="rounded bg-ops-accent px-2 text-xs text-black" onClick={()=>dispatch({type:'ADD_TIMER',label:newTimerLabel,durationSec:newTimerMin*60})}>Add</button></div>
      {state.timers.map((t)=>{const left=t.endAt?Math.max(0,Math.floor((t.endAt-now)/1000)):t.pausedRemainingSec; return <div key={t.id} className={`mb-1 rounded border p-1 text-xs ${state.activeTimerId===t.id?'border-ops-accent':'border-ops-border'}`} onClick={()=>dispatch({type:'SET_ACTIVE_TIMER',id:t.id})}><div className="flex justify-between"><span>{t.label}</span><span className={left<=30?'text-ops-danger':''}>{formatDuration(left)}</span></div><div className="mt-1 flex gap-1"><button className="rounded bg-ops-accent px-2 text-black" onClick={()=>dispatch({type:'START_PAUSE_TIMER',id:t.id,now})}>{t.endAt?'Pause':'Start'}</button><button className="rounded bg-ops-warn px-2 text-black" onClick={()=>dispatch({type:'RESET_TIMER',id:t.id})}>Reset</button></div></div>;})}
    </Panel>
    <Panel title="Quick Notes">
      <textarea id="quickNoteInput" className="h-20 w-full rounded border border-ops-border bg-ops-panel2 p-1 text-xs" value={note} onChange={(e)=>setNote(e.target.value)} placeholder="N focuses here • Ctrl+Enter saves" />
      <button className="mt-1 rounded bg-ops-accent px-2 py-1 text-xs text-black" onClick={()=>note.trim()&&(dispatch({type:'ADD_NOTE',text:note.trim(),now}),setNote(''))}>Save</button>
      <div className="mt-1 max-h-32 space-y-1 overflow-auto text-xs">{state.notes.map((n)=><div key={n.id} className="rounded border border-ops-border p-1"><label><input type="checkbox" checked={n.done} onChange={()=>dispatch({type:'TOGGLE_NOTE_DONE',id:n.id})} /> {n.text}</label></div>)}</div>
    </Panel>
    <Panel title="Utilities">
      <button className="mr-1 rounded bg-ops-accent px-2 py-1 text-xs text-black" onClick={()=>dispatch({type:'PICK_RANDOM_STUDENT'})}>Pick Student</button>
      <p className="mt-1 text-xs">Last pick: {state.pickedStudentIds[state.pickedStudentIds.length-1] ?? '—'}</p>
      <ul className="mt-2 text-xs">{state.quickLinks.map((l)=><li key={l.url}><a className="text-ops-accent" href={l.url} target="_blank" rel="noreferrer">{l.label}</a></li>)}</ul>
    </Panel>
  </>;

  return <MissionControlLayout left={left} center={center} right={right} />;
}

export function App() { return <AppStoreProvider><Dashboard /></AppStoreProvider>; }
