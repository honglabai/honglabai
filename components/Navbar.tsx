import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 ${
        isScrolled ? 'glass py-3 shadow-lg shadow-blue-900/20' : 'bg-dark/90 backdrop-blur-md py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2"
          onClick={() => scrollToSection(SectionId.HERO)}
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white text-lg font-robot">H</span>
          </div>
          <span className="text-white font-robot tracking-wide">HongLab<span className="text-primary-light">AI</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { id: SectionId.ABOUT, label: '소개' },
            { id: SectionId.SERVICES, label: '서비스' },
            { id: SectionId.CONTACT, label: '문의하기' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-300 hover:text-white hover:text-primary-light transition-colors text-sm font-medium tracking-wide"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection(SectionId.CONTACT)}
            className="px-5 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
          >
            프로젝트 시작
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark/95 backdrop-blur-lg border-b border-gray-800 animate-fade-in-down">
          <div className="flex flex-col p-6 space-y-4">
            <button onClick={() => scrollToSection(SectionId.ABOUT)} className="text-left text-gray-300 hover:text-white">소개</button>
            <button onClick={() => scrollToSection(SectionId.SERVICES)} className="text-left text-gray-300 hover:text-white">서비스</button>
            <button onClick={() => scrollToSection(SectionId.CONTACT)} className="text-left text-primary hover:text-primary-light font-bold">문의하기</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;