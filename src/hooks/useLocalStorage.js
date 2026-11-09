import { useState, useEffect } from 'react';
// Returns [value, setValue, saveFailed]. Corrupt or missing data falls back to `init`.
export function useLocalStorage(key, init) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); if (!s) return init; const p = JSON.parse(s);
      return p && typeof p === 'object' && !Array.isArray(p) ? { ...init, ...p } : p ?? init; } catch { return init; }
  });
  const [err, setErr] = useState(false);
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); setErr(false); } catch { setErr(true); } }, [key, v]);
  return [v, setV, err];
}
