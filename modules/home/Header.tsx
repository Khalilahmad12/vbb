
import React, { useState } from 'react';
import { NAV_LIN_KS } from '../../constants';

interface HeaderProps {
  setView: (view: 'home' | 'shop') => void;
  currentView: 'home' | 'shop';
}

const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (name: string, href: string) => {
    if (name === 'Home') {
      setView('home');
    } else if (name === 'Shop' || href === '#shop') {
      setView('shop');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-100/50 transition-all duration-500 animate-fadeInDown">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-10">
          <button onClick={() => setView('home')} className="relative group overflow-hidden outline-none">
            <img 
              src="https://verifiedbmbuy.com/wp-content/uploads/2025/12/Verified-BM-Buy-VBB-Store.png" 
              alt="VBB LOGO" 
              className="h-8 w-auto transition-all duration-500 group-hover:scale-105 group-hover:filter group-hover:brightness-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LIN_KS.map(link => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.name, link.href)}
                className={`text-[13px] font-bold transition-all duration-300 relative group flex flex-col items-center outline-none ${
                  (link.name === 'Home' && currentView === 'home') || (link.name === 'Shop' && currentView === 'shop')
                  ? 'text-blue-600'
                  : 'text-slate-500 hover:text-blue-600'
                }`}
              >
                <span className="group-hover:-translate-y-0.5 transition-transform duration-300 uppercase tracking-widest">
                  {link.name}
                </span>
                <span className={`absolute -bottom-1 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100 shadow-[0_0_8px_rgba(37,99,235,0.6)] ${
                  (link.name === 'Home' && currentView === 'home') || (link.name === 'Shop' && currentView === 'shop') ? 'w-full opacity-100' : ''
                }`}></span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Actions Section */}
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden md:flex items-center gap-2.5">
            {['facebook', 'twitter', 'instagram', 'youtube', 'telegram'].map(s => (
              <a 
                key={s} 
                href="#" 
                className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-white relative group overflow-hidden transition-all duration-500"
              >
                <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                <i className={`fab fa-${s} text-xs relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-[360deg]`}></i>
              </a>
            ))}
          </div>

          <a 
            href="https://wa.me/8801302669333" 
            className="hidden lg:flex group relative overflow-hidden bg-blue-600 text-white font-black py-3 px-8 rounded-2xl transition-all duration-500 hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.5)] active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <div className="relative flex items-center gap-3 text-[13px] uppercase tracking-wider">
              <i className="fab fa-whatsapp text-lg animate-pulse-slow"></i>
              <span>WhatsApp Now</span>
            </div>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"></div>
          </a>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-slate-50 text-slate-600 transition-all active:scale-90"
          >
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out border-t border-slate-100/50 bg-white ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col p-6 space-y-4">
          {NAV_LIN_KS.map(link => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.name, link.href)}
              className="text-sm font-bold text-left text-slate-600 hover:text-blue-600 py-2 border-b border-slate-50 transition-colors uppercase tracking-widest outline-none"
            >
              {link.name}
            </button>
          ))}
          
          <a 
            href="https://wa.me/8801302669333" 
            className="flex items-center justify-center gap-3 bg-blue-600 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-blue-100 transition-all active:scale-95 uppercase tracking-widest text-sm"
          >
            <i className="fab fa-whatsapp text-xl"></i>
            <span>WhatsApp Now</span>
          </a>

          <div className="flex items-center justify-center gap-4 pt-4">
            {['facebook', 'twitter', 'instagram', 'youtube', 'telegram'].map(s => (
              <a 
                key={s} 
                href="#" 
                className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"
              >
                <i className={`fab fa-${s} text-sm`}></i>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
