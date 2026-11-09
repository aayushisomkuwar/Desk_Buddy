import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
// Timestamp-based and persisted: survives tab throttling AND page refresh.
// A session that ended while the page was closed finishes on load.
export function useTimer(dur, onFinish) {
  const [t, setT] = useLocalStorage('pb.timer', { mode: 'focus', run: false, end: 0, left: dur.focus * 6e4, cycle: 0 });
  const [now, setNow] = useState(Date.now());
  const cb = useRef(onFinish); cb.current = onFinish;
  const fired = useRef(0), prev = useRef(dur);
  useEffect(() => { if (!t.run) return; setNow(Date.now()); const i = setInterval(() => setNow(Date.now()), 250); return () => clearInterval(i); }, [t.run]);
  useEffect(() => {
    if (!t.run || now < t.end || fired.current === t.end) return;
    fired.current = t.end;
    const wasFocus = t.mode === 'focus', cycle = t.cycle + (wasFocus ? 1 : 0), mode = wasFocus ? (cycle % 4 === 0 ? 'long' : 'short') : 'focus';
    setT({ mode, run: false, end: 0, left: dur[mode] * 6e4, cycle }); cb.current(wasFocus);
  }, [now, t, dur, setT]);
  useEffect(() => { if (prev.current !== dur && !t.run) setT((p) => ({ ...p, left: dur[p.mode] * 6e4 })); prev.current = dur; }, [dur]); // eslint-disable-line
  const reset = (m) => setT((p) => ({ ...p, mode: m || p.mode, run: false, left: dur[m || p.mode] * 6e4 }));
  return { mode: t.mode, run: t.run, cycle: t.cycle, total: dur[t.mode] * 6e4, left: t.run ? Math.max(0, t.end - now) : t.left,
    toggle: () => setT((p) => (p.run ? { ...p, run: false, left: Math.max(0, p.end - Date.now()) } : { ...p, run: true, end: Date.now() + p.left })),
    reset: () => reset(), setMode: (m) => reset(m) };
}
