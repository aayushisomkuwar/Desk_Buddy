import { useLocalStorage } from './useLocalStorage';
import { dk } from '../lib/dates';
const id = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
export function useTasks() {
  const [tasks, setTasks, err] = useLocalStorage('pb.tasks', []);
  return { tasks, err,
    add: (t, p, due) => setTasks((a) => [{ id: id(), t, p, due, done: false, doneAt: null }, ...a]),
    update: (i, patch) => setTasks((a) => a.map((x) => (x.id === i ? { ...x, ...patch } : x))),
    toggle: (i) => setTasks((a) => a.map((x) => (x.id === i ? { ...x, done: !x.done, doneAt: x.done ? null : dk() } : x))),
    remove: (i) => setTasks((a) => a.filter((x) => x.id !== i)) };
}
