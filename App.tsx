
import React, { useState, useEffect } from 'react';
import Header from './modules/home/Header';
import Hero from './modules/home/Hero';
import TrustBadges from './modules/home/TrustBadges';
import ProductGrid from './modules/home/ProductGrid';
import Benefits from './modules/home/Benefits';
import WhatsAppBenefits from './modules/home/WhatsAppBenefits';
import WhatWeOffer from './modules/home/WhatWeOffer';
import Testimonials from './modules/home/Testimonials';
import FAQ from './modules/home/FAQ';
import Location from './modules/home/Location';
import Footer from './modules/home/Footer';
import ChatAssistant from './modules/home/ChatAssistant';

// Shop Modules
import ShopHero from './modules/shop/ShopHero';
import ShopProducts from './modules/shop/ShopProducts';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'shop'>('home');

  // Smooth scroll to top when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Header setView={setView} currentView={view} />
      <main className="pt-20">
        {view === 'home' ? (
          <>
            <Hero />
            <TrustBadges />
            {/* Limited grid showing 4 products + "View More" button below */}
            <ProductGrid limit={4} onViewMore={() => setView('shop')} />
            <Benefits />
            <WhatsAppBenefits />
            <WhatWeOffer />
            <Testimonials />
            <FAQ />
            <Location />
          </>
        ) : (
          <div className="animate-fadeInUp">
            {/* Modular Shop View Components */}
            <ShopHero onBack={() => setView('home')} />
            <ShopProducts />
          </div>
        )}
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default App;
