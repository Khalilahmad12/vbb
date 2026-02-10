
import React, { useEffect, useRef, useState } from 'react';

const ContactInfo: React.FC<{ icon: string, title: string, content: string | React.ReactNode, bgColor: string, textColor: string, delay: string }> = ({ icon, title, content, bgColor, textColor, delay }) => {
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

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      style={{ animationDelay: delay }}
      className={`group space-y-5 p-6 rounded-[2rem] transition-all duration-500 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 ${isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'}`}
    >
      <div className={`w-14 h-14 ${bgColor} ${textColor} rounded-2xl flex items-center justify-center shadow-sm transition-all duration-700 group-hover:scale-110 group-hover:rotate-[360deg] group-hover:shadow-lg group-hover:shadow-blue-100`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <div className="transition-transform duration-500 group-hover:translate-x-1">
        <h4 className="font-black text-slate-800 text-[10px] uppercase tracking-[0.3em] mb-2 group-hover:text-blue-600 transition-colors">{title}</h4>
        <div className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-slate-900 transition-colors">{content}</div>
      </div>
    </div>
  );
};

const Location: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      
      <div className="container mx-auto px-6 relative z-10">
         <div 
            ref={sectionRef}
            className={`bg-white rounded-[4rem] p-8 lg:p-20 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {/* Left Column: Contact Content */}
            <div className="flex-1 space-y-12">
               <div className="space-y-5">
                  <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100/50">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></span>
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em]">Direct Connectivity</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                    Reach Our <br />
                    <span className="text-blue-600">Global Center.</span>
                  </h2>
                  <p className="text-slate-500 font-medium text-base md:text-lg max-w-md leading-relaxed">
                    Our team of verified asset specialists is available 24/7 to ensure your advertising operations never stop. Connect with us through any channel.
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
                  <ContactInfo 
                    icon="fa-map-marker-alt" 
                    title="Postal Address" 
                    content={<p>Madergonj, Pirgonj, Rangpur,<br />Bangladesh - 5470</p>} 
                    bgColor="bg-blue-50" 
                    textColor="text-blue-600"
                    delay="100ms"
                  />
                  <ContactInfo 
                    icon="fa-clock" 
                    title="Work Hours" 
                    content={<p>Sat - Fri: 8:00 - 23:00<br />Support: 24/7 Online</p>} 
                    bgColor="bg-amber-50" 
                    textColor="text-amber-600"
                    delay="200ms"
                  />
                  <ContactInfo 
                    icon="fa-whatsapp" 
                    title="WhatsApp Support" 
                    content={<a href="https://wa.me/8801302669333" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">+88 013 0266 9333</a>} 
                    bgColor="bg-emerald-50" 
                    textColor="text-emerald-600"
                    delay="300ms"
                  />
                  <ContactInfo 
                    icon="fa-envelope" 
                    title="Official Email" 
                    content={<p>info@verifiedbmbuy.com<br />verifiedbmbuy@gmail.com</p>} 
                    bgColor="bg-indigo-50" 
                    textColor="text-indigo-600"
                    delay="400ms"
                  />
               </div>
            </div>

            {/* Right Column: Visual Map / Hub */}
            <div className="flex-1 w-full relative">
               <div className="aspect-[4/3] bg-slate-100 rounded-[3.5rem] overflow-hidden border-[12px] border-white shadow-2xl relative group transition-all duration-700 hover:shadow-blue-200/50">
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Map Image with Zoom Effect */}
                  <img 
                    src="https://picsum.photos/1200/900?grayscale" 
                    alt="Map View" 
                    className="w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-[4000ms] ease-out" 
                  />
                  
                  {/* Floating Marker Card */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                     <div className="bg-white/95 backdrop-blur-xl px-8 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-5 animate-bounce-slow border border-white group/marker hover:scale-105 transition-transform duration-500">
                        <div className="relative">
                           <div className="absolute inset-0 bg-blue-400 rounded-2xl animate-ping opacity-20"></div>
                           <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-300 relative z-10 transition-transform duration-500 group-hover/marker:rotate-[15deg]">
                              <i className="fas fa-map-marker-alt text-2xl"></i>
                           </div>
                        </div>
                        <div>
                           <p className="font-black text-slate-900 uppercase tracking-widest text-[9px] mb-1 opacity-60">Global Headquarters</p>
                           <p className="text-xl font-black text-slate-800 tracking-tighter">VBB Hub, Bangladesh</p>
                           <div className="flex items-center gap-2 mt-1">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                              <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Always Online</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Aesthetic Grid Pattern on Map */}
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
               </div>

               {/* Decorative floating elements behind map */}
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default Location;
