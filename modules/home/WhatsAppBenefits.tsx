
import React, { useEffect, useRef, useState } from 'react';

const WABAItem: React.FC<{ icon: string, title: string, content: string, delay: string }> = ({ icon, title, content, delay }) => {
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

const WhatsAppBenefits: React.FC = () => {
  const points = [
    {
      icon: 'fa-users',
      title: 'Direct Customer Engagement',
      content: "The WhatsApp Business API connects you with customers easily. It's the top messaging app, so your message gets through fast. There are no delays or spam filters."
    },
    {
      icon: 'fa-robot',
      title: 'Automate Business Messaging',
      content: 'Set up auto-replies and reminders. Engage with customers around the clock. This system helps you never miss a chance to connect and enhances satisfaction.'
    },
    {
      icon: 'fa-chart-line',
      title: 'Higher Open & Response Rates',
      content: 'WhatsApp messages have a 90% open rate, much higher than emails or SMS. This means customers are more likely to see and engage with your official messages.'
    },
    {
      icon: 'fa-file-invoice-dollar',
      title: 'Share Multimedia & Documents',
      content: 'Send images, videos, documents, and payment links in one message. This helps share all information clearly and significantly speeds up customer decisions.'
    },
    {
      icon: 'fa-user-check',
      title: 'Verified & Secure Communication',
      content: "Using an official Meta-approved channel keeps communications safe. It builds deep trust and enhances your business's overall professionalism."
    },
    {
      icon: 'fa-globe',
      title: 'Global Reach, Local Feel',
      content: 'Connect with customers globally in their own language. WhatsApp makes interactions personal, making it easier to build lasting brand trust and loyalty.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50/30 relative overflow-hidden">
      {/* Professional Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Benefit Cards Grid */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {points.map((p, i) => (
                <WABAItem 
                  key={i} 
                  icon={p.icon} 
                  title={p.title} 
                  content={p.content} 
                  delay={`${i * 80}ms`} 
                />
              ))}
            </div>
          </div>

          {/* Right Side: Header & Context */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50 shadow-sm">
               <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
               <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.25em]">Cloud Connectivity</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              The Impact of <br />
              <span className="text-blue-600">WhatsApp Business.</span>
            </h2>
            
            <p className="text-slate-500 font-medium leading-relaxed max-w-xl text-base md:text-lg">
              Empower your communication with official Meta-approved API channels. Connect with your audience instantly, automate your workflow, and ensure 100% deliverability on the world's favorite messaging platform.
            </p>
            
            <div className="pt-8 flex items-center gap-4 border-t border-slate-100">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 shadow-md">
                       <img src={`https://i.pravatar.cc/100?img=${i+45}`} alt="user" className="w-full h-full object-cover rounded-full" />
                    </div>
                  ))}
               </div>
               <div className="space-y-0.5">
                 <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                   Trusted Globally
                 </p>
                 <p className="text-[10px] font-bold text-blue-500 uppercase">
                   Used by 1,200+ Enterprise Clients
                 </p>
               </div>
            </div>

            <div className="pt-4">
               <a href="https://wa.me/8801302669333" className="inline-flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-widest hover:gap-5 transition-all group">
                 Consult an API Expert <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
               </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatsAppBenefits;
