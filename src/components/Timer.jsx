import { Play, Pause, RotateCcw } from 'lucide-react';
import { fmt } from '../lib/dates';
const L = { focus: 'Focus', short: 'Short break', long: 'Long break' };
export default function Timer({ timer, pomo, onToggle }) {
  return (
    <section className="card"><h2>Pomodoro</h2>
      <div className="row tabs">{Object.keys(L).map((k) => <button key={k} className={timer.mode === k ? 'on' : ''} aria-pressed={timer.mode === k} onClick={() => timer.setMode(k)}>{L[k]}</button>)}</div>
      <div className="ring" role="timer" aria-label={`${L[timer.mode]}, ${fmt(timer.left)} remaining`} style={{ '--p': (1 - timer.left / timer.total) * 100 + '%' }}><div>{fmt(timer.left)}</div></div>
      <div className="row">
        <button className="b" onClick={onToggle}>{timer.run ? <Pause size={17} /> : <Play size={17} />}{timer.run ? 'Pause' : 'Start'}</button>
        <button className="b alt" onClick={timer.reset}><RotateCcw size={16} />Reset</button>
      </div>
      <p className="sub" style={{ textAlign: 'center', margin: 0 }}>{pomo} session{pomo === 1 ? '' : 's'} today · long break after {4 - (timer.cycle % 4)} more</p>
    </section>
  );
}
