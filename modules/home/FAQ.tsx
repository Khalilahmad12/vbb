
import React, { useState, useEffect, useRef } from 'react';
import { FAQS } from '../../constants';

const FAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className={`container mx-auto px-6 max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Common Questions</h2>
          <p className="text-slate-500 font-medium">Everything you need to know about purchasing and managing your verified assets.</p>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`rounded-[2rem] transition-all duration-500 border ${isOpen ? 'bg-blue-50/50 border-blue-100 shadow-xl shadow-blue-50' : 'bg-white border-slate-100 hover:border-slate-200'}`}
              >
                <button 
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left group"
                >
                  <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-blue-700' : 'text-slate-700 group-hover:text-blue-600'}`}>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                    <i className="fas fa-chevron-down text-[10px]"></i>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-8 px-8' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-500 leading-relaxed font-medium pl-2 border-l-2 border-blue-200">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
