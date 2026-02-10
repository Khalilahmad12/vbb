
import React, { useEffect, useRef, useState } from 'react';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const columnClass = (delay: string) => 
    `transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`;

  return (
    <footer ref={footerRef} className="bg-slate-900 pt-32 pb-12 text-slate-400 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className={`${columnClass('0ms')} space-y-10`} style={{ transitionDelay: '0ms' }}>
            <img 
              src="https://verifiedbmbuy.com/wp-content/uploads/2025/12/Verified-BM-Buy-VBB-Store.png" 
              alt="VBB" 
              className="h-10 brightness-0 invert transition-all duration-500 hover:scale-110 hover:brightness-125 cursor-pointer" 
            />
            <p className="text-base leading-relaxed font-medium transition-colors hover:text-slate-300">
              The world's most trusted marketplace for verified advertising assets. Empowering digital marketing agencies since 2018.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'youtube', 'linkedin'].map(s => (
                <a 
                  key={s} 
                  href="#" 
                  className="w-12 h-12 rounded-[1.25rem] bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:-translate-y-2 hover:rotate-[8deg] transition-all duration-500 border border-white/5 shadow-lg group"
                >
                  <i className={`fab fa-${s} text-lg transition-transform duration-500 group-hover:scale-125`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Access Column */}
          <div className={`${columnClass('100ms')} transition-delay-[100ms]`} style={{ transitionDelay: '100ms' }}>
            <h4 className="font-black text-white text-xs uppercase tracking-[0.3em] mb-10 relative inline-block">
              Quick Access
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600 rounded-full"></span>
            </h4>
            <ul className="space-y-5 text-sm font-bold">
              {[
                { name: 'Buy BM Facebook', href: '#' },
                { name: 'Our Story', href: '#' },
                { name: 'Contact VBB', href: '#' },
                { name: 'Insights Blog', href: '#' }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:text-blue-400 transition-all duration-300 flex items-center gap-0 hover:gap-3 group">
                    <span className="w-0 h-0.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 group-hover:w-4 transition-all duration-500"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className={`${columnClass('200ms')}`} style={{ transitionDelay: '200ms' }}>
            <h4 className="font-black text-white text-xs uppercase tracking-[0.3em] mb-10 relative inline-block">
              Support Desk
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600 rounded-full"></span>
            </h4>
            <ul className="space-y-5 text-sm font-bold">
              {['Privacy & Data', 'Refund Policy', 'Service Terms', 'Compliance'].map((text, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-blue-400 transition-all duration-300 flex items-center gap-0 hover:gap-3 group">
                    <span className="w-0 h-0.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 group-hover:w-4 transition-all duration-500"></span>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Advantage Card Column */}
          <div className={`${columnClass('300ms')}`} style={{ transitionDelay: '300ms' }}>
            <div className="bg-blue-600/10 p-10 rounded-[3rem] border border-blue-500/10 relative group transition-all duration-500 hover:bg-blue-600/[0.15] hover:border-blue-500/30 hover:-translate-y-2 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
              
              <h4 className="font-black text-white text-xs uppercase tracking-[0.3em] mb-8 relative z-10">The VBB Advantage</h4>
              <ul className="space-y-4 text-xs font-black relative z-10">
                {[
                  { label: 'No Ban Policy', color: 'text-emerald-400' },
                  { label: 'Verified Docs', color: 'text-blue-400' },
                  { label: 'High Trust Score', color: 'text-amber-400' },
                  { label: 'Live Expert Help', color: 'text-indigo-400' }
                ].map((item, i) => (
                  <li key={i} className={`flex items-center gap-4 ${item.color} uppercase tracking-widest transition-transform duration-500 group-hover:translate-x-1`}>
                    <i className="fas fa-check-circle transition-transform duration-700 group-hover:scale-125 group-hover:rotate-[360deg]"></i> 
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className={`border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            © {new Date().getFullYear()} <span className="text-white hover:text-blue-500 transition-colors">Verified BM Buy</span>. Secure Network.
          </p>
          <div className="flex gap-6 items-center opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000 group">
             <img 
               src="https://verifiedbmbuy.com/wp-content/themes/woodmart/images/payments.png" 
               alt="Secure Payments" 
               className="h-6 transition-transform duration-700 group-hover:scale-110" 
             />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
