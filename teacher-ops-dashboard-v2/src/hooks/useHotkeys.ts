import { useEffect } from 'react';

export function useHotkeys(bindings: Record<string, (e: KeyboardEvent) => void>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const combo = `${e.ctrlKey ? 'ctrl+' : ''}${key}`;
      const fn = bindings[combo] || bindings[key];
      if (fn) {
        e.preventDefault();
        fn(e);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bindings]);
}
