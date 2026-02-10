
import React, { useEffect, useRef, useState } from 'react';

const OfferCard: React.FC<{ icon: string, title: string, content: string, delay: string }> = ({ icon, title, content, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      style={{ animationDelay: delay }}
      className={`group relative bg-white p-10 rounded-[3rem] border border-slate-100 transition-all duration-500 hover:shadow-[0_50px_100px_-30px_rgba(37,99,235,0.1)] hover:-translate-y-4 hover:border-blue-100 flex flex-col h-full ${isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-12'}`}
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="mb-10 relative">
        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-blue-600 transition-all duration-700 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-blue-200 group-hover:rotate-[15deg]">
          <i className={`${icon.includes('fa-') ? 'fas' : 'fab'} ${icon} text-3xl`}></i>
        </div>
      </div>
      
      <div className="space-y-4 flex-grow">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-500 leading-relaxed font-medium">
          {content}
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
              <i className="fas fa-shield-check text-blue-500 text-[10px]"></i>
           </div>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">100% Verified</span>
        </div>
        <a href="https://wa.me/8801302669333" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
           <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};

const WhatWeOffer: React.FC = () => {
  const offers = [
    {
      icon: 'fa-user-check',
      title: 'Verified Facebook Business Manager Accounts',
      content: 'Get verified Business Manager accounts from Meta, ensuring your safety with real documentation and a 100% safety guarantee.'
    },
    {
      icon: 'fa-id-badge',
      title: 'Reinstated Profiles',
      content: 'We can easily recover your restricted or disabled accounts. Our reinstated profiles are fully verified.'
    },
    {
      icon: 'fa-whatsapp',
      title: 'WhatsApp API',
      content: 'Connect with customers worldwide using WhatsApp Cloud API. Enjoy automated messages and high deliverability. Communication is secure and Meta-approved.'
    },
    {
      icon: 'fa-rocket',
      title: 'Ballon BM',
      content: 'Maximize your marketing with Ballon BM. Simplify your campaigns. Improve targeting. Cut down on ad rejections.'
    },
    {
      icon: 'fa-ad',
      title: 'Facebook Ads Account For Advertising',
      content: 'Start advertising now with verified Facebook Ads accounts. They’re safe and trusted, making them perfect for quick campaign scaling. Get ready for immediate deployment!'
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Modern Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-100/50 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Authoritative Header */}
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-8">
           <div className="inline-flex items-center gap-3 bg-blue-50 px-6 py-2.5 rounded-full shadow-sm border border-blue-100/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.3em]">Verified Service Portfolio</span>
           </div>
           
           <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tighter">
             What Service <br />
             <span className="text-blue-600">"Verified BM Buy"</span> Is offering
           </h2>
           
           <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
             Boost your success with a verified business manager and WhatsApp API. Use trusted tools to take control of your ads and launch powerful campaigns without limits.
           </p>

           <div className="pt-4 flex flex-wrap justify-center gap-10 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center gap-2">
                 <i className="fas fa-shield-check text-blue-600"></i>
                 <span className="text-xs font-black uppercase tracking-widest text-slate-800">100% Trust</span>
              </div>
              <div className="flex items-center gap-2">
                 <i className="fas fa-bolt text-blue-600"></i>
                 <span className="text-xs font-black uppercase tracking-widest text-slate-800">Fast Setup</span>
              </div>
              <div className="flex items-center gap-2">
                 <i className="fas fa-headset text-blue-600"></i>
                 <span className="text-xs font-black uppercase tracking-widest text-slate-800">24/7 Support</span>
              </div>
           </div>
        </div>

        {/* Dynamic Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {offers.map((offer, i) => (
            <OfferCard 
              key={i} 
              icon={offer.icon} 
              title={offer.title} 
              content={offer.content} 
              delay={`${i * 100}ms`} 
            />
          ))}
          
          {/* Custom CTA Card for Grid completion */}
          <div className="lg:col-span-1 p-10 bg-slate-900 rounded-[3.5rem] flex flex-col justify-between overflow-hidden relative group animate-fadeInUp" style={{ animationDelay: '500ms' }}>
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full"></div>
             <div className="relative z-10 space-y-6">
                <i className="fas fa-shield-check text-blue-400 text-4xl mb-4"></i>
                <h4 className="text-3xl text-white font-black leading-tight">
                  Priority <br /> Security <span className="text-blue-500">& Trust.</span>
                </h4>
                <p className="text-slate-400 font-medium leading-relaxed text-sm">
                  At Verified BM Buy, we prioritize trust and security. Our services are not just reliable, they are a guarantee.
                </p>
             </div>
             <div className="mt-12 relative z-10">
                <a href="https://wa.me/8801302669333" className="w-full bg-blue-600 text-white font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-700 hover:scale-105 transition-all text-sm uppercase tracking-widest">
                   <i className="fab fa-whatsapp"></i> Get Started Now
                </a>
             </div>
          </div>
        </div>

        {/* Centered Safety Statement */}
        <div className="text-center pt-10 border-t border-slate-100">
           <div className="inline-flex items-center gap-4 bg-slate-50 px-8 py-4 rounded-3xl">
              <img src="https://verifiedbmbuy.com/wp-content/uploads/2025/12/Verified-BM-Buy-VBB-Store.png" className="h-4 opacity-50" alt="VBB" />
              <div className="h-4 w-px bg-slate-200"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">100% Safety Guarantee Transaction Protocol</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
