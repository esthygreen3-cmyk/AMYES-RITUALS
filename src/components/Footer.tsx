import React from 'react';
import { useApp } from '../context/AppContext';
import { UI_TRANSLATIONS } from '../translations';
import { Sparkles, ArrowRight, Instagram, Facebook, Youtube, Share, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, setOpenQuiz } = useApp();
  const t = UI_TRANSLATIONS[lang];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-cacao text-ivoire dark:bg-zinc-950 border-t border-sable/10 dark:border-zinc-850 font-sans transition-colors duration-300">
      
      {/* Decorative Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-sable via-savane to-gold" />

      {/* Main Grid content footer */}
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-12 border-b border-ivoire/15">
          
          {/* Column Logo & Bio */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-2xl font-serif font-semibold tracking-[0.25em] text-sable dark:text-gold block">
                AMYES
              </span>
              <span className="block text-[9px] font-sans font-light tracking-[0.6em] uppercase text-ivoire/70 mt-1">
                RITUALS
              </span>
            </div>
            
            <p className="text-xs text-ivoire/80 max-w-sm leading-relaxed font-light font-sans">
              {lang === 'fr' 
                ? 'AMYES RITUALS est une maison de beauté et de bien-être holistique d\'exception, formulant des soins d\'origine sauvage inspirés de la pharmacopée béninoise et ouest-africaine.'
                : 'AMYES RITUALS is a premium house of holistic wellbeing, crafting wild-harvested skincare ceremonies infused with West African and Beninese medicinal herbal wisdom.'}
            </p>

            {/* Simulated SSL & payment logos */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-[10px] tracking-widest text-sable dark:text-gold uppercase font-bold">SECURE CHECKOUT:</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded font-mono">VISA</span>
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded font-mono">MC</span>
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded font-mono">AMEX</span>
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded font-mono">APPLE</span>
              </div>
            </div>
          </div>

          {/* Column Shop categories */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-sable dark:text-gold font-serif">
              {t.footerColShop}
            </h4>
            <ul className="space-y-2.5 text-xs text-ivoire/80">
              <li>
                <button onClick={() => { handleScrollTo('shop'); }} className="hover:text-sable dark:hover:text-gold cursor-pointer transition-colors">
                  {t.filterVisage}
                </button>
              </li>
              <li>
                <button onClick={() => { handleScrollTo('shop'); }} className="hover:text-sable dark:hover:text-gold cursor-pointer transition-colors">
                  {t.filterCorps}
                </button>
              </li>
              <li>
                <button onClick={() => { handleScrollTo('wellness'); }} className="hover:text-sable dark:hover:text-gold cursor-pointer transition-colors">
                  {t.filterWellness}
                </button>
              </li>
              <li>
                <button onClick={() => setOpenQuiz(true)} className="hover:text-sable dark:hover:text-gold cursor-pointer transition-colors flex items-center gap-1 text-gold">
                  <Sparkles size={11} />
                  <span>{t.navRitual}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column Secondary items */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-sable dark:text-gold font-serif">
              {t.footerColAbout}
            </h4>
            <ul className="space-y-2.5 text-xs text-ivoire/80">
              <li>
                <button onClick={() => handleScrollTo('history')} className="hover:text-sable cursor-pointer transition-colors">
                  {t.navHistory}
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('blog')} className="hover:text-sable cursor-pointer transition-colors">
                  {t.navBlog}
                </button>
              </li>
              <li>
                <a href="#hero" className="hover:text-sable cursor-pointer transition-colors">
                  {t.navContact} (esthygreen3@gmail.com)
                </a>
              </li>
            </ul>
          </div>

          {/* Column Client service templates */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-sable dark:text-gold font-serif">
              {t.footerColClient}
            </h4>
            <ul className="space-y-2.5 text-xs text-ivoire/80">
              <li>
                <a href="#hero" className="hover:text-sable cursor-pointer transition-colors">
                  {t.footerShipping}
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-sable cursor-pointer transition-colors">
                  {t.footerReturns}
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-sable cursor-pointer transition-colors">
                  {t.footerFaq}
                </a>
              </li>
              {/* Core web vitals notice */}
              <li className="text-[10px] opacity-60 text-sable leading-relaxed mt-2 italic flex items-center gap-1">
                <span>⚡</span>
                <span>Shopify & WooCommerce ready</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower row with social and legal copy */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-ivoire/70">
          
          {/* Rights disclaimer */}
          <p className="text-[11px] font-light">
            © {new Date().getFullYear()} {t.brandName}. {t.allRightsReserved}
          </p>

          {/* Social Icons row */}
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-sable transition-colors" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-sable transition-colors" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-sable transition-colors" aria-label="YouTube">
              <Youtube size={18} />
            </a>
            <span className="text-[10px] tracking-widest font-bold uppercase bg-white/10 px-2.5 py-1 rounded">
              {lang === 'fr' ? 'FR • EUR' : 'EN • USD'}
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};
