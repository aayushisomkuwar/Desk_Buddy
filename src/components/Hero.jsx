import { Play, ListPlus, MessageCircle, Heart } from 'lucide-react';
import Buddy from './Buddy';
export default function Hero({ buddy, greeting, onGo, onFocus, onCheer }) {
  return (
    <section className="card hero" aria-label="Buddy">
      <div className="botwrap"><Buddy state={buddy.state} /></div>
      <h1>{greeting}</h1>
      <div className="bubble" aria-live="polite">{buddy.message}</div>
      <div className="row">
        <button className="b" onClick={onFocus}><Play size={16} />Start focus</button>
        <button className="b alt" onClick={() => onGo('tasks')}><ListPlus size={16} />Add a task</button>
        <button className="b alt" onClick={() => onGo('chat')}><MessageCircle size={16} />Chat</button>
        <button className="b alt" onClick={onCheer}><Heart size={16} />Cheer me up</button>
      </div>
    </section>
  );
}
