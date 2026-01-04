import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;