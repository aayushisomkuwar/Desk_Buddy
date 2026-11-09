import { pick } from './messages';
// Mock AI. To use a real model, replace the body with a fetch('/api/chat', ...) to YOUR backend,
// which holds the API key. Never put keys in this frontend.
function mock(x, { pending, top, pomo, min }) {
  x = x.toLowerCase();
  if (/overwhelm|stress|too much|anxious/.test(x)) return top ? `Hey, breathe. You have ${pending} pending, but we only need one: let’s start with “${top.t}”. 25 minutes, I’ll sit with you.` : 'Your list looks clear, so this might be a feelings thing. Want to talk it out?';
  if (/motivat|dsa|study/.test(x)) return pick(['Every DSA problem you solve rewires your brain a tiny bit. One problem, then we reassess?', 'Future-you will be so grateful. Let’s do one Pomodoro, then decide.']);
  if (/next|work on|what should/.test(x)) return top ? `I’d start with “${top.t}” (${top.p} priority${top.due ? ', due ' + top.due : ''}). Shall we focus on it?` : 'Nothing pending! Add a task, or treat yourself to a break.';
  if (/pomodoro|finished|done/.test(x)) return `Yesss! That’s ${pomo} session${pomo === 1 ? '' : 's'} and ${min} focused minutes today. Hydrate, then we go again?`;
  if (/don.t feel|lazy|tired|can.t/.test(x)) return pick(['That’s okay. Let’s make it tiny: just 5 minutes on anything. Deal?', 'No guilt. Rest counts too. Want to try one short session and see how it feels?']);
  return pick(['Tell me more! I’m listening.', `I’m here. ${pending ? pending + ' tasks waiting, whenever you’re ready.' : 'Your list is clear, so you’re free.'}`]);
}
export const askBuddy = (text, ctx) => new Promise((res, rej) => setTimeout(() => { try { res(mock(text, ctx)); } catch (e) { rej(e); } }, 700 + Math.random() * 500));
