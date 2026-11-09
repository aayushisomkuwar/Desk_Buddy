# Project Buddy v0.2 (React + Vite)
    npm install
    npm run dev      # http://localhost:5173
    npm run build
src/lib = pure logic, src/hooks = state (tasks, timer, buddy, storage), src/components = UI.
3D robot: pass a Spline / React Three Fiber component as `renderer` in components/Buddy.jsx (it receives `state`).
Real AI: replace the body of src/lib/chat.js with a call to your own backend that holds the API key.
