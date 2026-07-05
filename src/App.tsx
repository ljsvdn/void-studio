import Nav from './components/Nav';
import Hero from './components/Hero';
import Process from './components/Process';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import { ShaderProvider } from './shaders/ShaderStore';

export default function App() {
  return (
    <ShaderProvider>
      <Cursor />

      {/* header + hero share the first screen */}
      <div className="firstview">
        <Nav />
        <Hero />
      </div>
      <main>
        <Process />
      </main>
      <Footer />
    </ShaderProvider>
  );
}


