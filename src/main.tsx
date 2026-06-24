import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// NB: no StrictMode — its dev-only double mount/unmount races the Paper-Design
// shaders' WebGL setup and can leave canvases sized 0x0.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
