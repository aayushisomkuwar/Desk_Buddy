export const BUDDY_STATES = ['idle', 'happy', 'thinking', 'sleeping', 'focusing', 'encouraging'];
const FX = { idle: '', happy: '🎉', thinking: '💭', sleeping: '💤', focusing: '📖', encouraging: '💜' };
// Pass `renderer` (a Spline or React Three Fiber component that accepts a `state` prop) to replace the CSS fallback.
export default function Buddy({ state = 'idle', renderer: Renderer }) {
  if (Renderer) return <Renderer state={state} />;
  return (
    <div id="bot" className={state} role="img" aria-label={`Buddy is ${state}`}>
      <div className="ant" /><div className="arm l" /><div className="arm r" /><div className="body"><b /></div>
      <div className="head"><div className="face"><div className="eye l" /><div className="eye r" /><div className="cheek l" /><div className="cheek r" /></div></div>
      <div className="fx" aria-hidden="true">{FX[state]}</div>
    </div>
  );
}
