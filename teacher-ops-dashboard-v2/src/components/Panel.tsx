import { PropsWithChildren } from 'react';

export function Panel({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="rounded-md border border-ops-border bg-ops-panel p-3 shadow-glow">
      <h2 className="mb-2 text-xs uppercase tracking-widest text-ops-muted">{title}</h2>
      {children}
    </section>
  );
}
