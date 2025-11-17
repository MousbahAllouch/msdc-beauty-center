/**
 * Main App Component
 * Root component that renders the entire Beauty Center website
 */

import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section with main banner */}
      <Hero />

      {/* Services grid section */}
      <Services />

      {/* Contact form and footer */}
      <Contact />
    </div>
  );
}

export default App;
