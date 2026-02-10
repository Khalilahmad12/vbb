
import React, { useEffect, useRef, useState } from 'react';

const TrustBadge: React.FC<{ icon: string, title: string, desc: string, delay: string }> = ({ icon, title, desc, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

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

    if (badgeRef.current) {
      observer.observe(badgeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={badgeRef}
      style={{ animationDelay: delay }}
      className={`flex flex-col md:flex-row items-center gap-6 p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-700 group hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.12)] hover:-translate-y-2 border-transparent hover:border-blue-100/50 ${isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'}`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-blue-50 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500 ease-out"></div>
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 relative z-10 transition-all duration-700 ease-in-out group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-[360deg] shadow-inner group-hover:shadow-lg group-hover:shadow-blue-200">
          <i className={`fas ${icon} text-2xl transition-transform duration-700`}></i>
        </div>
      </div>
      <div className="text-center md:text-left">
        <h4 className="font-black text-slate-900 text-sm uppercase tracking-[0.2em] mb-1.5 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-slate-400 text-xs font-bold leading-relaxed tracking-wide">
          {desc}
        </p>
      </div>
    </div>
  );
};

const TrustBadges: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-100 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-100 to-transparent"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TrustBadge icon="fa-trophy" title="Best Quality" desc="Trusted market leader" delay="0ms" />
          <TrustBadge icon="fa-headset" title="24/7 Support" desc="Experts on standby" delay="150ms" />
          <TrustBadge icon="fa-shipping-fast" title="Instant Delivery" desc="Immediate access" delay="300ms" />
          <TrustBadge icon="fa-undo" title="7 Days Guarantee" desc="Hassle-free replacement" delay="450ms" />
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
