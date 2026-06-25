import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Arm scroll/load reveals before first paint so above-the-fold content starts
// hidden (no flash) and animates in. Without JS the class is never set, so all
// content stays visible — reveals are pure enhancement.
document.documentElement.classList.add('reveal-on');

// NB: no StrictMode — its dev-only double mount/unmount races the Paper-Design
// shaders' WebGL setup and can leave canvases sized 0x0.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
