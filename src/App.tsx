import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import { useReducedMotion } from './hooks/useReducedMotion';

export default function App() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <Nav />
      <main>
        <Hero reducedMotion={reducedMotion} />
        <Work reducedMotion={reducedMotion} />
        <About reducedMotion={reducedMotion} />
        <Contact reducedMotion={reducedMotion} />
      </main>
    </>
  );
}
