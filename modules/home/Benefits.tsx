
import React, { useEffect, useRef, useState } from 'react';

const BenefitItem: React.FC<{ icon: string, title: string, content: string, delay: string }> = ({ icon, title, content, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

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

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={itemRef}
      style={{ animationDelay: delay }}
      className={`group relative p-5 rounded-[2rem] bg-white border border-slate-100 transition-all duration-500 hover:border-blue-400 hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-1.5 cursor-default overflow-hidden ${isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-6'}`}
    >
      {/* Glossy Overlay effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex gap-4 relative z-10">
        <div className="shrink-0">
          <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200">
            <i className={`fas ${icon} text-base transition-transform duration-[800ms] ease-in-out group-hover:rotate-[360deg]`}></i>
          </div>
        </div>
        <div className="space-y-1 transition-transform duration-500 group-hover:translate-x-1">
          <h3 className="text-[17px] font-black text-slate-900 leading-tight tracking-tight group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-500 leading-relaxed text-[13px] font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-300">
            {content}
          </p>
        </div>
      </div>
      
      {/* Magnetic Bottom Indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50 overflow-hidden">
        <div className="w-0 h-full bg-blue-600 transition-all duration-700 ease-out group-hover:w-full"></div>
      </div>
    </div>
  );
};

const Benefits: React.FC = () => {
  const benefitsData = [
    {
      icon: 'fa-certificate',
      title: 'Trust & Credibility',
      content: 'A verified business account confirms your legitimacy, reducing scam risks and significantly boosting your brand reputation.'
    },
    {
      icon: 'fa-user-shield',
      title: 'Enhanced Security',
      content: 'Get superior protection against cyber threats and simplified account recovery for any unauthorized access attempts.'
    },
    {
      icon: 'fa-ban',
      title: 'No Ad Restrictions',
      content: 'Verified accounts face fewer red flags, allowing you to scale your business without the constant fear of sudden suspensions.'
    },
    {
      icon: 'fa-store',
      title: 'Premium Commerce',
      content: 'Unlock exclusive features like Facebook Shops and Marketplace with secure checkout options and wider audience reach.'
    },
    {
      icon: 'fa-rocket',
      title: 'Advanced Ad Tools',
      content: 'Utilize custom audience targeting, API integrations, and Facebook Pay to streamline marketing and maximize your ROI.'
    },
    {
      icon: 'fa-redo-alt',
      title: 'Rapid Recovery',
      content: 'Instantly prove your identity to Meta for faster recovery if your business manager is ever restricted or disabled.'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Minimalist Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Header & Context (50%) */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
               <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
               <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">Authority Shield</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Why Experts Trust <br />
              <span className="text-blue-600">Our Verified Assets.</span>
            </h2>
            
            <p className="text-slate-500 font-medium leading-relaxed max-w-xl text-base md:text-lg">
              Establish a bulletproof foundation for your advertising. Our verified assets are engineered for stability, high spending limits, and global scalability. Build credibility and scale without limits.
            </p>
            
            <div className="pt-8 flex items-center gap-4 border-t border-slate-50">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 shadow-sm">
                       <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt="user" className="w-full h-full object-cover rounded-full" />
                    </div>
                  ))}
               </div>
               <div className="space-y-0.5">
                 <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                   Trusted Authority
                 </p>
                 <p className="text-[10px] font-bold text-blue-500 uppercase">
                   Preferred by 800+ Top Agencies
                 </p>
               </div>
            </div>
            
            <div className="pt-4">
               <a href="#shop" className="inline-flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-widest hover:gap-5 transition-all group">
                 Secure Your Account <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
               </a>
            </div>
          </div>
          
          {/* Right Side: Benefit Cards Grid (50%) */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefitsData.map((b, i) => (
                <BenefitItem 
                  key={i} 
                  icon={b.icon} 
                  title={b.title} 
                  content={b.content} 
                  delay={`${i * 80}ms`} 
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;
