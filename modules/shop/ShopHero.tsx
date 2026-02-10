
import React from 'react';

interface ShopHeroProps {
  onBack: () => void;
}

const ShopHero: React.FC<ShopHeroProps> = ({ onBack }) => {
  return (
    <div className="bg-slate-900 py-20 md:py-28 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-500 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-blue-500 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 animate-fadeInDown">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
          All Premium <span className="text-blue-500">Assets</span>
        </h1>
        <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">
          Browse our complete inventory of high-authority verified accounts and advertising tools.
        </p>
        
        <button 
          onClick={onBack}
          className="mt-10 group inline-flex items-center gap-3 text-blue-400 hover:text-white font-black text-xs uppercase tracking-[0.25em] transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-full border border-blue-400/30 flex items-center justify-center group-hover:border-white group-hover:-translate-x-1 transition-all">
            <i className="fas fa-arrow-left"></i>
          </div>
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default ShopHero;
