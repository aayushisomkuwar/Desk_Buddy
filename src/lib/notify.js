export const askNotify = () => { try { if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission(); } catch { /* unsupported */ } };
export const notify = (body) => { try { if ('Notification' in window && Notification.permission === 'granted') new Notification('Project Buddy', { body }); } catch { /* unsupported */ } };
