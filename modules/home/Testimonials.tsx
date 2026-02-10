
import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../../constants';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalCards = TESTIMONIALS.length;
  const visibleCards = 3;
  const maxIndex = totalCards - visibleCards;

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play logic for desktop slider
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <section ref={sectionRef} className="py-32 bg-slate-900 text-white overflow-hidden relative">
      {/* Decorative ambient backgrounds */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] rounded-full translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
      
      <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="text-center mb-20 space-y-6 max-w-2xl mx-auto">
          <div className="inline-block bg-blue-600/20 text-blue-400 text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.3em] border border-blue-500/20">
            Social Proof
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Success Stories</h2>
          <p className="text-slate-400 font-medium text-lg">
            Trusted by thousands of businesses scaling their advertising globally with premium verified assets.
          </p>
        </div>
        
        {/* Desktop Slider View (Hidden on Mobile) */}
        <div className="hidden lg:block relative group/slider">
          <div className="overflow-visible">
            <div 
              className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="w-1/3 px-4 shrink-0">
                  <div className="bg-slate-800/40 p-12 rounded-[3.5rem] border border-white/5 backdrop-blur-md h-full flex flex-col group relative transition-all duration-700 hover:bg-slate-800/80 hover:border-blue-500/40 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.25)]">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 rounded-[3.5rem] transition-colors duration-700 pointer-events-none"></div>
                    
                    <div className="flex gap-1.5 mb-8 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star text-sm transition-transform duration-500 group-hover:scale-110 ${i < t.rating ? 'text-amber-400' : 'text-slate-600'}`} style={{ transitionDelay: `${i * 50}ms` }}></i>
                      ))}
                    </div>
                    
                    <p className="text-slate-300 italic mb-10 text-lg leading-relaxed relative z-10 group-hover:text-white transition-colors">
                      "{t.content}"
                    </p>
                    
                    <div className="mt-auto flex items-center gap-5 relative z-10">
                      <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center font-black text-blue-400 text-xl border border-blue-500/20 transition-all duration-700 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl group-hover:text-blue-400 transition-colors">{t.name}</h4>
                        <p className="text-blue-500 font-black text-[10px] uppercase tracking-widest mt-1 opacity-80 group-hover:opacity-100">{t.role}</p>
                      </div>
                    </div>

                    <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-20 transition-opacity duration-700">
                      <i className="fas fa-quote-right text-6xl text-white"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-12">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-2 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-10 bg-blue-600' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                aria-label={`Go to slide ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-8">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <div 
              key={t.id} 
              style={{ animationDelay: `${i * 150}ms` }}
              className={`bg-slate-800/40 p-10 rounded-[3rem] border border-white/5 backdrop-blur-md ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
            >
              <div className="flex gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-amber-400 text-sm"></i>
                ))}
              </div>
              <p className="text-slate-300 italic mb-8 text-base leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center font-black text-blue-400 text-lg border border-blue-500/20">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <p className="text-blue-500 font-black text-[9px] uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
