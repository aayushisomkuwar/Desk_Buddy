import { Home, ListChecks, Timer, MessageCircle, BarChart3, Settings } from 'lucide-react';
const VIEWS = [['home', 'Home', Home], ['tasks', 'My Tasks', ListChecks], ['focus', 'Focus Room', Timer], ['chat', 'Chat', MessageCircle], ['progress', 'Progress', BarChart3], ['settings', 'Settings', Settings]];
export default function Sidebar({ view, onChange }) {
  return (
    <aside><div className="logo"><i />Project Buddy</div>
      <nav aria-label="Main">{VIEWS.map(([id, label, Icon]) => (
        <button key={id} className={view === id ? 'on' : ''} aria-current={view === id ? 'page' : undefined} onClick={() => onChange(id)}>
          <Icon size={19} aria-hidden="true" /><span className="lbl">{label}</span></button>))}
      </nav></aside>
  );
}
