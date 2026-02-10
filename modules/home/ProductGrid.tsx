
import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../../constants';
import { Product } from '../../types';

const ProductCard: React.FC<{ product: Product, index: number }> = ({ product, index }) => {
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
      style={{ animationDelay: `${(index % 4) * 100}ms` }}
      className={`bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-700 flex flex-col group h-full hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.15)] hover:-translate-y-3 hover:border-blue-200/50 ${isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-12'}`}
    >
      <div className="relative p-8 bg-slate-50/50 overflow-hidden">
        {product.isSale && (
          <span className="absolute top-6 left-6 z-10 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-rose-200 animate-pulse">Sale</span>
        )}
        <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-blue-600">
              <i className="fas fa-search-plus text-xs"></i>
           </div>
        </div>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-contain mix-blend-multiply transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2"
        />
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fas fa-star text-[10px] ${i < product.rating ? 'text-amber-400' : 'text-slate-200'}`}></i>
          ))}
          <span className="text-[10px] text-slate-400 font-bold ml-2 uppercase tracking-tighter">Certified Account</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-2 leading-snug group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-blue-500 text-[10px] font-black mb-6 uppercase tracking-[0.2em]">{product.category}</p>
        
        <div className="space-y-3 mb-8 flex-grow">
          {product.features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-500 text-sm group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <i className="fas fa-check text-emerald-500 text-[8px]"></i>
              </div>
              <span className="font-medium">{f}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-slate-300 line-through text-[11px] font-bold">{product.originalPrice}</span>
            )}
            <span className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-blue-700 transition-colors">
              {product.price}
            </span>
          </div>
          <a 
            href={product.link}
            target="_blank"
            rel="noopener"
            className="relative overflow-hidden bg-blue-600 text-white font-black py-3.5 px-7 rounded-2xl transition-all duration-500 flex items-center gap-2 text-sm shadow-xl shadow-blue-100 active:scale-95 group/btn"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
            <i className="fab fa-whatsapp relative z-10 text-base"></i>
            <span className="relative z-10">Order</span>
          </a>
        </div>
      </div>
    </div>
  );
};

interface ProductGridProps {
  limit?: number;
  onViewMore?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ limit, onViewMore }) => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Meta Verified BM', 'Facebook Ads Account', 'WhatsApp API (WABA)', 'Social Accounts'];
  
  // Use either the limit or filter based on tabs
  const filteredProducts = limit 
    ? PRODUCTS.slice(0, limit) 
    : (activeTab === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeTab));

  return (
    <section id="shop" className="py-24 bg-slate-50/50 relative overflow-hidden">
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-96 bg-blue-100/30 blur-3xl rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-block bg-blue-100 text-blue-700 text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.3em] mb-4">Premium Marketplace</div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Professional Services</h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mt-6"></div>
          <p className="text-slate-500 font-medium pt-4 text-lg">
            Empower your marketing efforts with high-authority Meta assets, verified for maximum performance and security.
          </p>
        </div>

        {!limit && (
          <div className="flex flex-wrap justify-center gap-3 mb-20 sticky top-24 z-40 bg-slate-50/80 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white/50 shadow-sm">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 overflow-hidden group ${
                  activeTab === tab 
                  ? 'text-white' 
                  : 'text-slate-400 hover:text-blue-600 hover:bg-white'
                }`}
              >
                {activeTab === tab && (
                  <span className="absolute inset-0 bg-blue-600 shadow-xl shadow-blue-200"></span>
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

        {/* View More Button shown below the 4 cards on Home view */}
        {limit && (
          <div className="mt-16 text-center">
            <button 
              onClick={onViewMore}
              className="group relative inline-flex items-center gap-4 bg-blue-600 text-white font-black py-5 px-12 rounded-[2rem] shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity"></span>
              <span className="text-[13px] uppercase tracking-[0.25em]">View All Products</span>
              <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <i className="fas fa-arrow-right text-xs"></i>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
