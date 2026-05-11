import { ReactNode } from 'react';
export function MissionControlLayout({ left, center, right }: { left: ReactNode; center: ReactNode; right: ReactNode }) {
  return <main className="h-screen bg-ops-bg p-2 text-ops-text"><div className="grid h-full grid-cols-12 gap-2"> <aside className="col-span-3 space-y-2 overflow-auto">{left}</aside><section className="col-span-6 space-y-2 overflow-auto">{center}</section><aside className="col-span-3 space-y-2 overflow-auto">{right}</aside></div></main>;
}
