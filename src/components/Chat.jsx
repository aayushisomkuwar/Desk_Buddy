import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { askBuddy } from '../lib/chat';
import { P } from '../lib/messages';
export default function Chat({ ctx, onThinking, onReply, compact }) {
  const [msgs, setMsgs] = useLocalStorage('pb.chat', [{ r: 'b', t: P.hello[0] }]);
  const [txt, setTxt] = useState(''), [busy, setBusy] = useState(false), log = useRef();
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [msgs, busy]);
  async function send(e) {
    e.preventDefault(); const t = txt.trim(); if (!t || busy) return;
    setTxt(''); setMsgs((m) => [...m.slice(-49), { r: 'u', t }]); setBusy(true); onThinking();
    try { const r = await askBuddy(t, ctx); setMsgs((m) => [...m, { r: 'b', t: r }]); onReply(r); }
    catch { setMsgs((m) => [...m, { r: 'b', t: 'Oops, my circuits tangled. Try again?' }]); onReply('Oops, something went wrong.'); }
    finally { setBusy(false); }
  }
  return (
    <section className="card"><h2>Chat with Buddy</h2>
      <div id="log" ref={log} role="log" aria-live="polite" style={compact ? { height: 220 } : undefined}>
        {msgs.map((m, i) => <div key={i} className={'m' + (m.r === 'u' ? ' u' : '')}>{m.t}</div>)}
        {busy && <div className="m dots" aria-label="Buddy is typing"><i /><i /><i /></div>}
      </div>
      <form className="cf" onSubmit={send}>
        <input aria-label="Message Buddy" value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Tell Buddy how it’s going…" autoComplete="off" />
        <button className="b" disabled={busy} aria-label="Send"><Send size={16} /></button>
      </form>
    </section>
  );
}
