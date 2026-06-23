import React from 'react';
import { useApp } from '../context/AppContext';
import { UI_TRANSLATIONS } from '../translations';
import { ArrowRight, Leaf, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { lang, setOpenQuiz } = useApp();
  const t = UI_TRANSLATIONS[lang];

  const handleExplore = () => {
    const element = document.getElementById('shop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-ivoire dark:bg-zinc-950 transition-colors duration-300"
    >
      {/* Background Savannah Image with warm overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=80" 
          alt="African Savannah Sunset"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 select-none brightness-[0.75] dark:brightness-[0.45]"
        />
        {/* Boho sun warmth color gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-cacao/40 via-savane/25 to-black/30 mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ivoire dark:from-zinc-950 to-transparent" />
      </div>

      {/* Decorative Traditional Geometric Lines and Badges */}
      <div className="absolute top-12 left-12 hidden xl:block w-32 border-l border-t border-sable/30 h-32 opacity-60" />
      <div className="absolute bottom-24 right-12 hidden xl:block w-32 border-r border-b border-sable/30 h-32 opacity-60" />

      {/* Hero content container */}
      <div className="relative z-10 px-4 mx-auto max-w-5xl text-center sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#F8F5F0]/95 dark:bg-zinc-900/90 shadow-md backdrop-blur border border-gold/40 animate-fade-in">
          <Leaf size={14} className="text-olive" />
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-sans font-bold text-cacao dark:text-sable">
            {lang === 'fr' ? '100% ORGANIQUE & ETHIQUE' : '100% ORGANIC & ETHICAL'}
          </span>
          <Sparkles size={12} className="text-gold" />
        </div>

        {/* Elegant display heading with serif */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#F8F5F0] mb-8 leading-[1.12]">
          <span className="block font-serif font-light italic">
            {lang === 'fr' ? 'Révélez votre' : 'Reveal your'}
          </span>
          <span className="block font-serif font-bold uppercase tracking-wide text-sable dark:text-gold mt-2">
            {lang === 'fr' ? 'Beauté Naturelle' : 'Natural Beauty'}
          </span>
          <span className="block font-serif font-light italic mt-2">
            {lang === 'fr' ? 'à travers les rituels africains.' : 'through African rituals.'}
          </span>
        </h1>

        {/* Readable beautiful paragraph */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-ivoire/90 font-sans font-light leading-relaxed mb-12 tracking-wide">
          {t.heroSubtitle}
        </p>

        {/* Elegant button dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          
          <button
            onClick={handleExplore}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs md:text-sm font-semibold tracking-widest uppercase cursor-pointer text-charbon bg-sable hover:bg-gold hover:text-black transition-all duration-300 shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2 group border border-transparent"
          >
            {t.heroBtnCollection}
            <ArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />
          </button>
          
          <button
            onClick={() => setOpenQuiz(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs md:text-sm font-semibold tracking-widest uppercase cursor-pointer text-[#F8F5F0] bg-transparent hover:bg-[#F8F5F0]/10 transition-all duration-300 border-2 border-[#F8F5F0] flex items-center justify-center gap-2"
          >
            <Sparkles size={16} className="text-gold" />
            {t.heroBtnRitual}
          </button>

        </div>

        {/* Client trust logos */}
        <div className="mt-16 pt-8 border-t border-[#F8F5F0]/15 flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-75">
          <div className="text-[10px] md:text-xs font-serif italic text-sable tracking-widest uppercase">🌿 ECO-CERTIFIÉ</div>
          <div className="text-[10px] md:text-xs font-serif italic text-sable tracking-widest uppercase">🤝 COOPÉRATIVE SOLIDAIRE</div>
          <div className="text-[10px] md:text-xs font-serif italic text-sable tracking-widest uppercase">✨ VEGAN & SANS CRUAUTÉ</div>
          <div className="text-[10px] md:text-xs font-serif italic text-sable tracking-widest uppercase">🐇 SANS PARABEN</div>
        </div>

      </div>
    </section>
  );
};
