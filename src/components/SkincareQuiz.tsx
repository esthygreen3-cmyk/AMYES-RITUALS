import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TRANSLATIONS } from '../translations';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Check, ShoppingBag, Gift } from 'lucide-react';

export const SkincareQuiz: React.FC = () => {
  const { lang, addToCart, openQuiz, setOpenQuiz, setOpenCart } = useApp();
  const t = UI_TRANSLATIONS[lang];

  // Selected Quiz Answers
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string>('');
  const [skinType, setSkinType] = useState<string>('');
  const [preference, setPreference] = useState<string>('');
  const [hasAddedRoutine, setHasAddedRoutine] = useState(false);

  if (!openQuiz) return null;

  const handleStepNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleStepBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Algorithmic matching representing ancestral phytotherapy formulas
  const calculateRoutine = (): Product[] => {
    const routine: Product[] = [];
    
    // Core selection matching logic
    if (skinType === 'dry' || goal === 'hydration') {
      const p1 = PRODUCTS.find(p => p.id === 'baume-celeste');
      const p2 = PRODUCTS.find(p => p.id === 'serum-sacre');
      if (p1) routine.push(p1);
      if (p2) routine.push(p2);
    } else if (skinType === 'sensible' || goal === 'relaxation') {
      const p1 = PRODUCTS.find(p => p.id === 'elixir-savane');
      const p2 = PRODUCTS.find(p => p.id === 'brume-sommeil');
      const p3 = PRODUCTS.find(p => p.id === 'infusion-reine');
      if (p1) routine.push(p1);
      if (p2) routine.push(p2);
      if (p3) routine.push(p3);
    } else if (goal === 'energy' || goal === 'glow' || preference === 'powders') {
      const p1 = PRODUCTS.find(p => p.id === 'rosee-hibiscus');
      const p2 = PRODUCTS.find(p => p.id === 'poudre-baobab');
      const p3 = PRODUCTS.find(p => p.id === 'energie-sauvage');
      if (p1) routine.push(p1);
      if (p2) routine.push(p2);
      if (p3) routine.push(p3);
    } else {
      // Oily / Mixed / Purification
      const p1 = PRODUCTS.find(p => p.id === 'savon-noir-royal');
      const p2 = PRODUCTS.find(p => p.id === 'larme-desert');
      if (p1) routine.push(p1);
      if (p2) routine.push(p2);
    }

    // Fallback if somehow empty
    if (routine.length === 0) {
      const p1 = PRODUCTS.find(p => p.id === 'serum-sacre');
      if (p1) routine.push(p1);
    }

    return routine;
  };

  const recommendedProducts = calculateRoutine();
  const totalPrice = recommendedProducts.reduce((acc, p) => acc + p.price, 0);

  const handleAddRoutineToCart = () => {
    recommendedProducts.forEach((prod) => {
      addToCart(prod, 1);
    });
    setHasAddedRoutine(true);
    setTimeout(() => {
      setHasAddedRoutine(false);
      setOpenQuiz(false); // Close quiz overlay
      setOpenCart(true);  // Pop back up cart drawer
    }, 1800);
  };

  const handleRestart = () => {
    setGoal('');
    setSkinType('');
    setPreference('');
    setStep(1);
    setHasAddedRoutine(false);
  };

  const goalChoices = [
    { id: 'hydration', label: t.qGoal1, description: lang === 'fr' ? 'Éliminer les sensations de tiraillement.' : 'Banish dry uncomfortable tightness.' },
    { id: 'glow', label: t.qGoal2, description: lang === 'fr' ? 'Atténuer les taches et réveiller le teint.' : 'Target spots and awaken dull tones.' },
    { id: 'purification', label: t.qGoal3, description: lang === 'fr' ? 'Réguler le sébum et désincruster les pores.' : 'Refine sebum build up and detox pores.' },
    { id: 'aging', label: t.qGoal4, description: lang === 'fr' ? 'Repulper les rides et raffermir la peau.' : 'Firm up elasticity and lift cells.' },
    { id: 'relaxation', label: t.qGoal5, description: lang === 'fr' ? 'Évacuer le stress et dormir paisiblement.' : 'Relieve physical anxiety and sleep well.' },
    { id: 'energy', label: t.qGoal6, description: lang === 'fr' ? 'Dynamiser le corps et stimuler l\'immunité.' : 'Awake raw energy and physical vitality.' },
  ];

  const skinChoices = [
    { id: 'dry', label: t.qSkin1, info: lang === 'fr' ? 'La peau pèle ou est inconfortable.' : 'My skin flakes or feels coarse.' },
    { id: 'mixed', label: t.qSkin2, info: lang === 'fr' ? 'Zone T grasse et joues normales.' : 'Oily t-zone with dry checks.' },
    { id: 'oily', label: t.qSkin3, info: lang === 'fr' ? 'Imperfections fréquentes et éclat lourd.' : 'Frequent breakouts and visible shine.' },
    { id: 'sensible', label: t.qSkin4, info: lang === 'fr' ? 'Rougit facilement au soleil ou vent.' : 'Prone to burning and wind reactivity.' },
  ];

  const prefChoices = [
    { id: 'oils', label: t.qPref1, detail: lang === 'fr' ? 'Nourrissantes, pénètrent sans fini gras.' : 'Nourishing, fast dermal absorption.' },
    { id: 'creams', label: t.qPref2, detail: lang === 'fr' ? 'Onctueuses, scellent l\'hydratation.' : 'Silky layer to lock moisture.' },
    { id: 'soaps', label: t.qPref3, detail: lang === 'fr' ? 'Saponifiés ancestraux ultra purifiants.' : 'Traditional heavy lathering clarify.' },
    { id: 'powders', label: t.qPref4, detail: lang === 'fr' ? 'Feuilles séchées ou super-aliments bruts.' : 'Raw botanical powders & leaves.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      
      {/* Backdrop clicks */}
      <div className="absolute inset-0" onClick={() => setOpenQuiz(false)} />

      {/* Main Container Card */}
      <div className="relative w-full max-w-3xl bg-ivoire dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-sable/20 dark:border-zinc-800 z-10 p-6 md:p-10 max-h-[92vh] overflow-y-auto flex flex-col justify-between">
        
        {/* Closure x top right */}
        <button
          onClick={() => setOpenQuiz(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-sable/30 dark:hover:bg-zinc-800 text-charbon dark:text-ivoire transition-colors"
          aria-label="Close Quiz"
        >
          <ArrowLeft size={20} className="inline mr-1" />
          <span className="text-[10px] uppercase tracking-widest font-bold">{t.closeLabel}</span>
        </button>

        {/* Diagnostic Header */}
        <div className="text-center max-w-xl mx-auto mb-8 mt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sable/30 border border-gold/40 text-[10px] tracking-widest uppercase font-bold text-cacao mb-3">
            <Sparkles size={11} className="text-gold animate-spin" />
            <span>Diagnostic Holistique</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-cacao dark:text-sable mb-2">
            {t.quizTitle}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-light">
            {t.quizSubtitle}
          </p>
        </div>

        {/* Step Indicator bar */}
        {step <= 3 && (
          <div className="mb-8 max-w-md mx-auto">
            <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
              <span>{t.quizStep} {step} / 3</span>
              <span>{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-sable/20 rounded-full overflow-hidden dark:bg-zinc-800">
              <div 
                className="h-full bg-olive dark:bg-gold transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Diagnostic Steps Body */}
        <div className="flex-grow py-4">
          
          {/* STEP 1: Goal */}
          {step === 1 && (
            <div className="animate-fade-in space-y-4">
              <h3 className="text-sm md:text-base font-serif font-semibold text-center text-charbon dark:text-ivoire uppercase tracking-wider mb-6">
                ✨ {t.quizQuestion1}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goalChoices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => { setGoal(choice.id); handleStepNext(); }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      goal === choice.id 
                        ? 'bg-cacao text-ivoire border-transparent shadow shadow-cacao/40' 
                        : 'bg-white border-sable/20 hover:border-savane/50 text-charbon dark:bg-zinc-805 dark:border-zinc-800 dark:text-ivoire'
                    }`}
                  >
                    <div className="font-bold text-xs md:text-sm tracking-wide mb-1 flex items-center justify-between">
                      <span>{choice.label}</span>
                      {goal === choice.id && <Check size={14} className="text-gold" />}
                    </div>
                    <p className={`text-[11px] font-light leading-relaxed ${goal === choice.id ? 'opacity-90' : 'text-gray-400 dark:text-gray-400'}`}>
                      {choice.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Skin profile */}
          {step === 2 && (
            <div className="animate-fade-in space-y-4">
              <h3 className="text-sm md:text-base font-serif font-semibold text-center text-charbon dark:text-ivoire uppercase tracking-wider mb-6">
                🌿 {t.quizQuestion2}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skinChoices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => { setSkinType(choice.id); handleStepNext(); }}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      skinType === choice.id 
                        ? 'bg-cacao text-ivoire border-transparent shadow' 
                        : 'bg-white border-sable/20 hover:border-savane/50 text-charbon dark:bg-zinc-850 dark:border-zinc-800 dark:text-ivoire'
                    }`}
                  >
                    <div className="font-bold text-xs md:text-sm tracking-wide mb-1 flex items-center justify-between">
                      <span>{choice.label}</span>
                      {skinType === choice.id && <Check size={14} className="text-gold" />}
                    </div>
                    <p className={`text-[11px] font-light ${skinType === choice.id ? 'opacity-90' : 'text-gray-450'}`}>
                      {choice.info}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Texture Preference */}
          {step === 3 && (
            <div className="animate-fade-in space-y-4">
              <h3 className="text-sm md:text-base font-serif font-semibold text-center text-charbon dark:text-ivoire uppercase tracking-wider mb-6">
                🍵 {t.quizQuestion3}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prefChoices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => { setPreference(choice.id); handleStepNext(); }}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      preference === choice.id 
                        ? 'bg-cacao text-ivoire border-transparent shadow' 
                        : 'bg-white border-sable/20 hover:border-savane/50 text-charbon dark:bg-zinc-850 dark:border-zinc-800 dark:text-ivoire'
                    }`}
                  >
                    <div className="font-bold text-xs md:text-sm tracking-wide mb-1 flex items-center justify-between">
                      <span>{choice.label}</span>
                      {preference === choice.id && <Check size={14} className="text-gold" />}
                    </div>
                    <p className={`text-[11px] font-light ${preference === choice.id ? 'opacity-90' : 'text-gray-450'}`}>
                      {choice.detail}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RESULTS SPLASH */}
          {step === 4 && (
            <div className="animate-fade-in py-2 space-y-6">
              
              {/* Routine header info */}
              <div className="text-center pb-4 border-b border-sable/20 dark:border-zinc-800">
                <Gift size={32} className="mx-auto text-gold mb-3 animate-bounce" />
                <h3 className="text-xl md:text-2xl font-serif font-bold text-olive dark:text-gold">
                  {t.quizResultTitle}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto leading-relaxed">
                  {t.quizResultIntro}
                </p>
              </div>

              {/* Routine Cards Horizontal lists */}
              <div className="space-y-4">
                {recommendedProducts.map((prod, idx) => {
                  const rTrans = prod.translation[lang];
                  return (
                    <div 
                      key={prod.id}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-850 border border-sable/10 dark:border-zinc-800 shadow-sm"
                    >
                      {/* Step index circle */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-olive text-white flex items-center justify-center font-serif text-sm font-bold">
                        {idx + 1}
                      </div>

                      {/* Small Thumbnail */}
                      <img 
                        src={prod.image} 
                        alt={rTrans.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-xl bg-[#F4EDE0]" 
                      />

                      {/* Product copy details */}
                      <div className="flex-grow min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-savane dark:text-gold block">
                          {prod.subcategory} • {prod.volume}
                        </span>
                        <h4 className="text-sm font-bold font-serif text-charbon dark:text-ivoire truncate">
                          {rTrans.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                          {rTrans.tagline}
                        </p>
                      </div>

                      {/* Cash tag */}
                      <div className="text-sm font-serif font-bold text-cacao dark:text-gold pr-2">
                        {prod.price.toFixed(2)} €
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom bonus summary and bulk purchase panel */}
              <div className="p-5 rounded-2xl bg-[#5C4533]/5 dark:bg-zinc-800/50 border border-sable/30 dark:border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[10px] tracking-widest text-gray-400 uppercase font-bold block mb-1">
                    {lang === 'fr' ? 'RITUEL GLOBAL CONSEILLÉ' : 'TOTAL ROUTINE PRICING'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif font-bold text-cacao dark:text-gold">
                      {totalPrice.toFixed(2)} €
                    </span>
                    <span className="text-[10px] text-olive dark:text-green-400 font-bold uppercase tracking-widest">
                      ({recommendedProducts.length} {lang === 'fr' ? 'SÉLECTIONS' : 'SOINS'})
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  <button
                    onClick={handleAddRoutineToCart}
                    disabled={hasAddedRoutine}
                    className={`w-full py-3.5 px-6 rounded-full font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                      hasAddedRoutine 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-cacao text-ivoire hover:bg-olive hover:shadow-olive/20 hover:scale-103'
                    }`}
                  >
                    {hasAddedRoutine ? (
                      <>
                        <Check size={15} />
                        <span>{lang === 'fr' ? 'RITUEL ENREGISTRÉ !' : 'ROUTINE ADDED !'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} />
                        <span>{t.quizAddSelectionToCart}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Stepper Controllers Bottom Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-sable/20 dark:border-zinc-800">
          
          {step > 1 ? (
            <button
              onClick={handleStepBack}
              disabled={hasAddedRoutine}
              className="py-2.5 px-5 rounded-full border border-sable text-xs font-bold text-cacao hover:bg-sable/20 dark:border-zinc-700 dark:text-ivoire dark:hover:bg-zinc-800 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>{t.quizBack}</span>
            </button>
          ) : (
            <div /> // alignment placeholder
          )}

          {step <= 3 ? (
            <button
              onClick={handleStepNext}
              disabled={
                (step === 1 && !goal) ||
                (step === 2 && !skinType) ||
                (step === 3 && !preference)
              }
              className="py-2.5 px-6 rounded-full bg-olive text-[#F8F5F0] hover:bg-cacao text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{t.quizNext}</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleRestart}
              className="py-2.5 px-5 rounded-full border border-sable text-xs font-bold text-cacao hover:bg-sable/20 dark:border-zinc-700 dark:text-ivoire dark:hover:bg-zinc-800 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>{t.quizRestart}</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
