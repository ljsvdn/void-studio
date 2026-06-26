import { lazy, Suspense } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import Process from './components/Process';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import { ShaderProvider } from './shaders/ShaderStore';

// DEV-only shader tuner; the dynamic import is dead-code-eliminated in prod
// (import.meta.env.DEV is statically false there).
const ShaderTuner = import.meta.env.DEV ? lazy(() => import('./shaders/ShaderTuner')) : null;

export default function App() {
  return (
    <ShaderProvider>
      <Cursor />
      {/* analog texture overlays */}
      <div className="grain" aria-hidden="true" />
      <div className="scan" aria-hidden="true" />

      {/* header + hero share the first screen */}
      <div className="firstview">
        <Nav />
        <Hero />
      </div>
      <main>
        <Work />
        <Process />
      </main>
      <Footer />

      {ShaderTuner && (
        <Suspense fallback={null}>
          <ShaderTuner />
        </Suspense>
      )}
    </ShaderProvider>
  );
}
