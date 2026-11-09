import { dk, lastDays } from './dates';
// Single source of truth: tasks carry doneAt, focus time lives in log. Nothing is counted twice.
export function computeStats(tasks, log) {
  const today = dk(), d = log[today] || { min: 0, pomo: 0 };
  const active = (k) => (log[k]?.pomo > 0) || tasks.some((t) => t.doneAt === k);
  let streak = 0; const c = new Date();
  if (!active(dk(c))) c.setDate(c.getDate() - 1);
  while (active(dk(c))) { streak++; c.setDate(c.getDate() - 1); }
  return { doneToday: tasks.filter((t) => t.doneAt === today).length, min: d.min, pomo: d.pomo, streak,
    week: lastDays(7).map((x) => ({ label: x.toLocaleDateString('en', { weekday: 'short' }), min: log[dk(x)]?.min || 0 })) };
}
