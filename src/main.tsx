import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Arm scroll/load reveals before first paint so above-the-fold content starts
// hidden (no flash) and animates in. Without JS the class is never set, so all
// content stays visible - reveals are pure enhancement.
document.documentElement.classList.add('reveal-on');

// Always start at the top - prevents browser scroll-restoration from dropping
// the user mid-page on refresh.
history.scrollRestoration = 'manual';
if (!window.location.hash) {
  window.scrollTo(0, 0);
}

// NB: no StrictMode - its dev-only double mount/unmount races the Paper-Design
// shaders' WebGL setup and can leave canvases sized 0x0.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

if (window.location.hash) {
  const scrollToHash = (attempt = 0) => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) {
      target.scrollIntoView();
      return;
    }
    if (attempt < 20) {
      window.setTimeout(() => scrollToHash(attempt + 1), 50);
    }
  };

  requestAnimationFrame(() => scrollToHash());
}

