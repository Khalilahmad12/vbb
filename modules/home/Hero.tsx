
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-32 md:pb-40 bg-gradient-to-br from-white to-blue-50/50">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="container mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 animate-fadeInLeft">
          <span className="inline-flex bg-blue-100 text-blue-700 text-xs font-black px-4 py-2 rounded-full uppercase tracking-[0.2em]">
            Fully Verified • Instantly Delivered
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1]">
            Buy Verified BM <br />
            <span className="text-gradient">& Ads Assets</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            <b>Verified BM Buy</b> is a secure platform for <b>verified Facebook Business Manager</b> and <b>WhatsApp APIs</b>. All accounts come with genuine documentation, ensuring reliability for advertisers worldwide.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a href="#shop" className="bg-blue-600 text-white font-bold py-4 px-10 rounded-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-xl shadow-blue-200">
              Explore Meta Tools
            </a>
            <a href="https://wa.me/8801302669333" className="bg-white border-2 border-slate-200 text-slate-800 font-bold py-4 px-10 rounded-2xl hover:bg-slate-50 hover:border-blue-200 transition-all">
              Contact Support
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            {[
              { icon: 'shield-alt', text: 'Secure Pay', color: 'blue' },
              { icon: 'bolt', text: 'Fast Delivery', color: 'amber' },
              { icon: 'check-circle', text: 'Real Docs', color: 'emerald' },
              { icon: 'headset', text: '24/7 Support', color: 'indigo' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                <i className={`fas fa-${item.icon} text-${item.color}-500`}></i> {item.text}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative animate-fadeInRight">
          <div className="relative z-10 p-4 bg-white/50 rounded-[4rem] border border-white backdrop-blur-sm shadow-2xl overflow-hidden group">
            <img 
              src="https://verifiedbmbuy.com/wp-content/uploads/2025/02/cropped-verified-BM-Buy-buy-verified-facebook-business-manager-account.webp" 
              alt="Verified BM Illustration" 
              className="w-full h-auto rounded-[3.5rem] shadow-sm group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
