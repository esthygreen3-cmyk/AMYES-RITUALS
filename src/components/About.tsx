import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TRANSLATIONS } from '../translations';
import { Leaf, Award, Heart, Shield, HelpCircle, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  const { lang } = useApp();
  const t = UI_TRANSLATIONS[lang];
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  const valuesList = [
    {
      icon: <Leaf className="text-olive" size={24} />,
      title: t.valNature,
      desc: t.valNatureDesc
    },
    {
      icon: <Award className="text-savane" size={24} />,
      title: t.valAuth,
      desc: t.valAuthDesc
    },
    {
      icon: <Heart className="text-cacao" size={24} />,
      title: t.valWellness,
      desc: t.valWellnessDesc
    },
    {
      icon: <Shield className="text-gold" size={24} />,
      title: t.valHeritage,
      desc: t.valHeritageDesc
    },
    {
      icon: <HelpCircle className="text-emerald-700 dark:text-emerald-500" size={24} />,
      title: t.valDurab,
      desc: t.valDurabDesc
    }
  ];

  const timeline = [
    {
      year: '1998',
      title: t.time1Title,
      desc: t.time1Desc
    },
    {
      year: '2012',
      title: t.time2Title,
      desc: t.time2Desc
    },
    {
      year: '2019',
      title: t.time3Title,
      desc: t.time3Desc
    },
    {
      year: '2026',
      title: t.time4Title,
      desc: t.time4Desc
    }
  ];

  return (
    <section 
      id="history" 
      className="py-20 md:py-32 bg-ivoire dark:bg-zinc-950 text-charbon dark:text-ivoire transition-colors duration-300"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-savane dark:text-gold uppercase font-bold block mb-3">
            AMYES HERITAGE
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-cacao dark:text-sable mb-6">
            {t.historyTitle}
          </h2>
          <div className="w-16 h-1 bg-savane mx-auto mb-6 rounded-full" />
          <p className="text-sm md:text-base font-sans text-gray-600 dark:text-gray-300 italic font-light">
            "{t.historySubtitle}"
          </p>
        </div>

        {/* Story Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-24 md:mb-32">
          
          {/* Column 1: Image Frame */}
          <div className="relative group">
            {/* Elegant warm frame */}
            <div className="absolute -inset-2 rounded-2xl border-2 border-dashed border-savane/40 dark:border-zinc-800 -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[450px] md:h-[550px]">
              <img 
                src="https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80" 
                alt="Radiant African Skincare" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#F8F5F0]">
                <h4 className="font-serif text-xl tracking-wider mb-1">Moringa & Karité</h4>
                <p className="text-xs font-sans font-light tracking-wide opacity-90">
                  {lang === 'fr' ? 'Savoirs transmis de génération en génération' : 'Knowledge passed down between generations'}
                </p>
              </div>
            </div>
            {/* Soft decorative badge */}
            <div className="absolute -bottom-6 -right-6 bg-sable dark:bg-zinc-800 border border-gold dark:border-zinc-700 text-charbon dark:text-ivoire rounded-2xl p-4 shadow-xl max-w-xs hidden sm:block">
              <p className="text-xs font-serif leading-relaxed italic text-cacao dark:text-sable">
                {lang === 'fr' 
                  ? '"La sève des arbres détient l\'eau de jouvence du désert."' 
                  : '"The trees sap holds the desert fountain of youth."'}
              </p>
            </div>
          </div>

          {/* Column 2: Story Text */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3.5xl font-serif font-semibold text-cacao dark:text-sable leading-snug">
              {t.historyFounderTitle}
            </h3>
            
            <p className="text-sm md:text-base font-sans text-gray-700 dark:text-gray-300 leading-relaxed font-light">
              {t.historyText1}
            </p>
            
            <div className="p-6 md:p-8 rounded-2xl bg-[#F4EDE0] dark:bg-zinc-900 border-l-4 border-savane dark:border-gold">
              <p className="text-xs md:text-sm font-sans italic text-cacao dark:text-sable leading-relaxed font-medium">
                {t.historyFounderText}
              </p>
            </div>

            <p className="text-sm md:text-base font-sans text-gray-750 dark:text-gray-350 leading-relaxed font-light">
              {t.historyText2}
            </p>

            {/* Microstats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-sable/30 dark:border-zinc-800 text-center font-sans">
              <div>
                <span className="block text-2xl md:text-3xl font-serif font-bold text-olive dark:text-gold">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Naturel</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-serif font-bold text-olive dark:text-gold">+12k</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Clients</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-serif font-bold text-olive dark:text-gold">+15</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">Coopératives</span>
              </div>
            </div>
          </div>

        </div>

        {/* Timeline of Transmission Section */}
        <div className="mb-24 md:mb-32">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-cacao dark:text-sable mb-2">
              {t.timelineTitle}
            </h3>
            <p className="text-xs font-sans uppercase tracking-widest text-savane dark:text-gold">
              {lang === 'fr' ? 'La genèse d\'une marque d\'exception' : 'The genesis of an exceptional brand'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-sans">
            {timeline.map((step, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setActiveTimelineStep(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  idx === activeTimelineStep 
                    ? 'bg-[#EADECE]/40 border-savane dark:bg-zinc-900 dark:border-gold' 
                    : 'bg-white/40 border-sable/20 hover:border-savane/55 dark:bg-zinc-900/20 dark:border-zinc-800'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-serif font-extrabold text-savane dark:text-gold tracking-wider">
                    {step.year}
                  </span>
                  <div className={`w-3.5 h-3.5 rounded-full transition-all ${
                    idx === activeTimelineStep ? 'bg-olive scale-125' : 'bg-sable/80'
                  }`} />
                </div>
                <h4 className="text-sm font-semibold text-charbon dark:text-ivoire mb-2 font-serif">
                  {step.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values Bento Grid */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3.5xl font-serif font-bold text-cacao dark:text-sable">
              {lang === 'fr' ? 'Nos Valeurs Sacrées' : 'Our Sacred Values'}
            </h3>
            <div className="w-12 h-0.5 bg-savane mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {valuesList.map((val, idx) => (
              <div 
                key={idx}
                className="p-6 md:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-sable/20 dark:border-zinc-800 hover:shadow-xl dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 duration-300 text-center font-sans"
              >
                <div className="w-12 h-12 rounded-full bg-sable/30 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-5 border border-sable/20">
                  {val.icon}
                </div>
                <h4 className="font-serif font-bold text-sm text-charbon dark:text-ivoire mb-3 tracking-wide h-6 items-center justify-center flex">
                  {val.title}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
