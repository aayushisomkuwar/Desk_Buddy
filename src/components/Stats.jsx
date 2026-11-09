import { Flame } from 'lucide-react';
export function Stats({ s }) {
  return (
    <section className="card"><h2>Today</h2><div className="stats">
      {[['Tasks done', s.doneToday], ['Focus time', s.min + ' min'], ['Sessions', s.pomo], ['Day streak', <>{s.streak} <Flame size={18} style={{ verticalAlign: -3 }} /></>]].map(([l, v]) => <div className="stat" key={l}><b>{v}</b><span className="sub">{l}</span></div>)}
    </div></section>
  );
}
export function WeekChart({ week }) {
  const mx = Math.max(30, ...week.map((d) => d.min));
  return (
    <section className="card"><h2>Weekly focus (minutes)</h2>
      <div className="week" role="img" aria-label={'Focus minutes: ' + week.map((d) => `${d.label} ${d.min}`).join(', ')}>
        {week.map((d) => <div key={d.label}><i style={{ height: (d.min / mx) * 100 }} />{d.label}<br />{d.min}</div>)}</div>
    </section>
  );
}
