export const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export const formatClock = (d: Date): string =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export const formatDate = (d: Date): string =>
  d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

export const formatDuration = (sec: number): string => {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return h > 0
    ? `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`
    : `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
};
