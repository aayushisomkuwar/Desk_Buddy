import { useState, useEffect, useRef, useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Timer from './components/Timer';
import TaskManager from './components/TaskManager';
import Chat from './components/Chat';
import { Stats, WeekChart } from './components/Stats';
import Settings from './components/Settings';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTasks } from './hooks/useTasks';
import { useTimer } from './hooks/useTimer';
import { useBuddy } from './hooks/useBuddy';
import { computeStats } from './lib/stats';
import { dk, fmt } from './lib/dates';
import { P, pick, pendingMsg, greeting } from './lib/messages';
import { askNotify, notify } from './lib/notify';

const DEF = { name: 'friend', dur: { focus: 25, short: 5, long: 15 }, theme: '' };

export default function App() {
  const [view, setView] = useState('home');
  const [settings, setSettings, e1] = useLocalStorage('pb.settings', DEF);
  const [log, setLog, e2] = useLocalStorage('pb.log', {});
  const T = useTasks();
  const sayRef = useRef(() => {});
  const timer = useTimer(settings.dur, (wasFocus) => {
    if (wasFocus) setLog((l) => { const k = dk(), d = l[k] || { min: 0, pomo: 0 }; return { ...l, [k]: { min: d.min + settings.dur.focus, pomo: d.pomo + 1 } }; });
    sayRef.current(wasFocus ? pick(P.brk) : 'Break’s over. Ready when you are!', 'happy', 4500);
    notify(wasFocus ? 'Focus session done. Take a break!' : 'Break over. Back to it?');
  });
  const buddy = useBuddy(timer.run ? (timer.mode === 'focus' ? 'focusing' : 'sleeping') : 'idle', P.hello[0]);
  sayRef.current = buddy.say;

  const stats = useMemo(() => computeStats(T.tasks, log), [T.tasks, log]);
  const pending = T.tasks.filter((t) => !t.done);
  const ctx = { pending: pending.length, top: pending.find((t) => t.p === 'High') || pending[0], pomo: stats.pomo, min: stats.min };

  useEffect(() => { settings.theme ? (document.documentElement.dataset.theme = settings.theme) : document.documentElement.removeAttribute('data-theme'); }, [settings.theme]);
  useEffect(() => { document.title = timer.run ? `${fmt(timer.left)} · Buddy` : 'Project Buddy'; }, [timer.run, timer.left]);

  const toggleTimer = () => { if (!timer.run) { buddy.say(pick(timer.mode === 'focus' ? P.start : P.brk)); askNotify(); } timer.toggle(); };
  const startFocus = () => { setView('focus'); if (!timer.run) toggleTimer(); };
  const toggleTask = (t) => { T.toggle(t.id); if (!t.done) buddy.say(pick(P.done), 'happy'); };
  const addTask = (t, p, due) => { T.add(t, p, due); buddy.say(pendingMsg(pending.length + 1), 'encouraging', 3000); };
  const set = (patch) => setSettings((s) => ({ ...s, ...patch }));

  const hero = <Hero buddy={buddy} greeting={greeting(settings.name)} onGo={setView} onFocus={startFocus} onCheer={() => buddy.say(pick(P.cheer), 'encouraging', 4000)} />;
  const timerCard = <Timer timer={timer} pomo={stats.pomo} onToggle={toggleTimer} />;
  const tasksCard = <TaskManager tasks={T.tasks} onAdd={addTask} onUpdate={T.update} onToggle={toggleTask} onRemove={T.remove} />;
  const chat = (compact) => <Chat compact={compact} ctx={ctx} onThinking={() => buddy.say(null, 'thinking', 8000)} onReply={(r) => buddy.say(r, 'encouraging', 3500)} />;

  return (
    <div className="app">
      <Sidebar view={view} onChange={setView} />
      <main>
        {(e1 || e2 || T.err) && <div className="banner" role="alert"><AlertTriangle size={16} /> Couldn’t save to this browser (private mode or full storage). Your changes won’t survive a refresh.</div>}
        {view === 'home' && <div className="home"><div className="col">{hero}{timerCard}<Stats s={stats} /></div><div className="col">{tasksCard}{chat(true)}</div></div>}
        {view === 'tasks' && <div className="narrow">{tasksCard}</div>}
        {view === 'focus' && <div className="home wide">{hero}{timerCard}</div>}
        {view === 'chat' && <div className="home wide">{hero}{chat(false)}</div>}
        {view === 'progress' && <div className="col narrow"><Stats s={stats} /><WeekChart week={stats.week} /></div>}
        {view === 'settings' && <div className="narrow"><Settings settings={settings} onChange={set} /></div>}
      </main>
    </div>
  );
}
