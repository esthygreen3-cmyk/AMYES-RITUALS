import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TRANSLATIONS } from '../translations';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { lang } = useApp();
  const t = UI_TRANSLATIONS[lang];

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#EADECE]/40 dark:bg-zinc-900/60 text-charbon dark:text-ivoire transition-colors duration-300">
      <div className="px-4 mx-auto max-w-5xl sm:px-6 lg:px-8">
        
        {/* Curved boho panel card */}
        <div className="relative rounded-3xl overflow-hidden bg-ivoire dark:bg-zinc-900 border border-sable/35 dark:border-zinc-850 p-8 md:p-14 shadow-xl text-center">
          
          {/* Background vector accents representing savannah grass */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sable/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-olive/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* Sparkles circle logo */}
            <div className="w-12 h-12 rounded-full bg-sable/30 dark:bg-zinc-800 flex items-center justify-center mx-auto border border-sable/10 shadow-sm mb-4">
              <Mail className="text-cacao dark:text-gold" size={20} />
            </div>

            {/* Newsletter Header */}
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-cacao dark:text-sable">
              {t.newsTitle}
            </h3>
            
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-sans font-light leading-relaxed max-w-md mx-auto">
              {t.newsText}
            </p>

            {submitted ? (
              /* Success confirmation state */
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900 max-w-md mx-auto flex items-center gap-4 animate-fade-in text-left">
                <CheckCircle className="text-emerald-500 flex-shrink-0" size={26} />
                <div className="font-sans">
                  <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest mb-0.5">
                    {lang === 'fr' ? 'INSCRIPTION RÉUSSIE' : 'REGISTRATION SUCCESSFUL'}
                  </h4>
                  <p className="text-[11.5px] text-emerald-700 dark:text-emerald-300 leading-normal font-light">
                    {t.newsSuccess}
                  </p>
                </div>
              </div>
            ) : (
              /* Email submission Form */
              <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-4">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-grow flex items-center border border-sable rounded-full px-4 py-3.5 bg-white dark:bg-zinc-850 dark:border-zinc-750 shadow-sm focus-within:ring-1 focus-within:ring-savane transition-all">
                    <input
                      type="email"
                      required
                      placeholder={t.newsPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs bg-transparent border-none outline-none focus:ring-0 text-charbon dark:text-ivoire font-sans"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="py-3.5 px-8 rounded-full bg-olive hover:bg-cacao text-[#F8F5F0] font-sans font-semibold uppercase tracking-widest text-xs shadow-lg transition-all transform hover:scale-102 cursor-pointer flex-shrink-0"
                    id="btn-subscribe"
                  >
                    {t.newsSubscribe}
                  </button>
                </div>

                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-sans pt-4 flex items-center justify-center gap-1">
                  <Sparkles size={11} className="text-gold" />
                  <span>{lang === 'fr' ? '100% de respect de la vie privée. Désinscription en 1 clic.' : '100% private. Unsubscribe in single click.'}</span>
                </p>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
