export const pick = (a) => a[Math.floor(Math.random() * a.length)];
export const P = {
  hello: ['Heyyy! You’re finally here. Ready to make today count?'],
  done: ['LOOK AT YOU GO! One more victory!', 'Task crushed. I’m doing a little dance.', 'Another one down! You’re unstoppable today.'],
  start: ['Okay bestie, let’s lock in. I’ll be right here.', 'Focus mode on. I’ll study right next to you.', 'Deep breath, here we go. Together.'],
  brk: ['You did amazing. Now please go drink some water.', 'Break time! Stretch, sip, stare at something far away.', 'Session done! I’m taking a tiny nap, you rest too.'],
  pend: ['We have a little work to do, but don’t worry. We’ll tackle it together.', 'A few things on the list, nothing we can’t handle.'],
  none: ['Nothing pending. Add a task or just enjoy the calm.', 'Clear list! Suspiciously peaceful.'],
  cheer: ['You don’t have to do everything today. Just the next small thing.', 'Missed something? No guilt. Tomorrow is a fresh page.', 'I’m proud of you for showing up. Seriously.'],
};
export const pendingMsg = (n) => (n ? `${pick(P.pend)} (${n} pending)` : pick(P.none));
export const greeting = (name) => { const h = new Date().getHours(); return `${h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'}, ${name}!`; };
