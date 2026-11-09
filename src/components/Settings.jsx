import { useState } from 'react';
import { Bell, Moon } from 'lucide-react';
import { askNotify } from '../lib/notify';
const KEYS = ['pb.tasks', 'pb.log', 'pb.timer', 'pb.settings', 'pb.chat'];
export default function Settings({ settings, onChange }) {
  const [sure, setSure] = useState(false);
  const setDur = (k) => (e) => { const n = +e.target.value; if (n) onChange({ dur: { ...settings.dur, [k]: Math.min(90, Math.max(1, n)) } }); };
  const wipe = () => { if (!sure) { setSure(true); setTimeout(() => setSure(false), 3000); return; } KEYS.forEach((k) => localStorage.removeItem(k)); location.reload(); };
  const dark = settings.theme === 'dark' || (!settings.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  return (
    <section className="card"><h2>Settings</h2>
      <p><label>Your name <input value={settings.name} maxLength={30} onChange={(e) => onChange({ name: e.target.value })} /></label></p>
      <p className="sub">Durations (minutes)</p>
      <div className="row" style={{ justifyContent: 'flex-start' }}>{[['focus', 'Focus'], ['short', 'Short'], ['long', 'Long']].map(([k, l]) => <label key={k}>{l} <input type="number" min="1" max="90" style={{ width: 70 }} value={settings.dur[k]} onChange={setDur(k)} /></label>)}</div>
      <div className="row" style={{ justifyContent: 'flex-start' }}>
        <button className="b alt" onClick={askNotify}><Bell size={16} />Enable notifications</button>
        <button className="b alt" onClick={() => onChange({ theme: dark ? 'light' : 'dark' })}><Moon size={16} />Toggle dark mode</button>
        <button className="b" onClick={wipe}>{sure ? 'Tap again to confirm' : 'Reset all data'}</button>
      </div>
    </section>
  );
}
