import { useState, useRef, useCallback, useEffect } from 'react';
// `base` is the state implied by the app (e.g. focusing during a session). say() adds a temporary reaction on top.
export function useBuddy(base, firstMessage) {
  const [react, setReact] = useState(null), [message, setMessage] = useState(firstMessage), tm = useRef();
  const say = useCallback((m, state, ms = 3500) => { if (m) setMessage(m); clearTimeout(tm.current); if (state) { setReact(state); tm.current = setTimeout(() => setReact(null), ms); } }, []);
  useEffect(() => () => clearTimeout(tm.current), []);
  return { state: react || base, message, say };
}
