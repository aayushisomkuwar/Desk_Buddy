import { useState } from 'react';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';
import { dk } from '../lib/dates';
const FILTERS = ['All', 'Pending', 'Completed'], EMPTY = { t: '', p: 'Medium', due: '' };
export default function TaskManager({ tasks, onAdd, onUpdate, onToggle, onRemove }) {
  const [flt, setFlt] = useState('All'), [form, setForm] = useState(EMPTY), [edit, setEdit] = useState(null);
  const done = tasks.filter((t) => t.done).length, pct = tasks.length ? (done / tasks.length) * 100 : 0;
  const list = tasks.filter((t) => flt === 'All' || (flt === 'Pending') !== t.done);
  const up = tasks.filter((t) => !t.done && t.due).sort((a, b) => (a.due > b.due ? 1 : -1)).slice(0, 3);
  const set = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));
  const reset = () => { setForm(EMPTY); setEdit(null); };
  const submit = (e) => { e.preventDefault(); const t = form.t.trim(); if (!t) return; edit ? onUpdate(edit, { t, p: form.p, due: form.due }) : onAdd(t, form.p, form.due); reset(); };
  const startEdit = (t) => { setEdit(t.id); setForm({ t: t.t, p: t.p, due: t.due || '' }); };
  return (
    <section className="card"><h2>Today’s tasks</h2>
      <form className="tform" onSubmit={submit}>
        <input type="text" aria-label="Task title" placeholder="What needs doing?" maxLength={120} value={form.t} onChange={set('t')} />
        <select aria-label="Priority" value={form.p} onChange={set('p')}><option>Low</option><option>Medium</option><option>High</option></select>
        <input type="date" aria-label="Due date" value={form.due} onChange={set('due')} />
        <div className="row" style={{ gridColumn: '1/-1', justifyContent: 'stretch' }}>
          <button className="b" style={{ flex: 1 }}>{edit ? <><Check size={16} />Save changes</> : <><Plus size={16} />Add task</>}</button>
          {edit && <button type="button" className="b alt" onClick={reset}><X size={16} />Cancel</button>}
        </div>
      </form>
      <div className="row tabs" style={{ justifyContent: 'flex-start' }}>{FILTERS.map((f) => <button key={f} className={flt === f ? 'on' : ''} aria-pressed={flt === f} onClick={() => setFlt(f)}>{f}</button>)}</div>
      <div className="sub">{done} of {tasks.length} completed</div>
      <div className="bar" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label="Task completion"><i style={{ width: pct + '%' }} /></div>
      {list.length === 0 && <p className="empty">{tasks.length ? 'Nothing in this filter.' : 'No tasks yet. Add your first one above!'}</p>}
      {list.map((t) => (
        <div key={t.id} className={'task' + (t.done ? ' done' : '')}>
          <input type="checkbox" checked={t.done} aria-label={`Mark “${t.t}” ${t.done ? 'incomplete' : 'complete'}`} onChange={() => onToggle(t)} />
          <span>{t.t}{t.due && <small className={'sub' + (!t.done && t.due < dk() ? ' late' : '')}> · due {t.due}</small>}</span>
          <em className={'tag ' + t.p}>{t.p}</em>
          <button className="ic" aria-label={`Edit “${t.t}”`} onClick={() => startEdit(t)}><Pencil size={15} /></button>
          <button className="ic" aria-label={`Delete “${t.t}”`} onClick={() => onRemove(t.id)}><Trash2 size={15} /></button>
        </div>))}
      {up.length > 0 && <p className="sub"><b>Upcoming:</b> {up.map((t) => `${t.t} (${t.due})`).join(' · ')}</p>}
    </section>
  );
}
