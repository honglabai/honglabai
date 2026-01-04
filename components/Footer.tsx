import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
             <div className="text-xl font-bold tracking-tighter text-white mb-2">
              HongLab<span className="text-primary-light">AI</span>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} HongLabAI. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;