import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, REVIEWS } from '../data';
import { ProductCard } from './ProductCard';
import { UI_TRANSLATIONS } from '../translations';
import { Sparkles, ArrowRight, Heart, Leaf, Star, Smile, Coffee, Eye, ArrowLeft, Sun, Shield } from 'lucide-react';

export const HomeMain: React.FC = () => {
  const { 
    lang, 
    activeFilter, 
    setActiveFilter, 
    searchQuery, 
    sortBy, 
    setSortBy,
    setOpenQuiz
  } = useApp();

  const t = UI_TRANSLATIONS[lang];

  // Catalog tab handles
  const [activeCatalogTab, setActiveCatalogTab] = useState<'all' | 'visage' | 'corps' | 'bien-etre'>('all');

  // Interactive Reviews state (for Carousel if they want to scroll comments)
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Filters for Best-sellers
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller === true);
  
  // Filters for New Arrivals
  const newArrivals = PRODUCTS.filter((p) => p.isNew === true);

  // Filters for Visage specific collection display
  const visageProducts = PRODUCTS.filter((p) => p.category === 'visage').slice(0, 3);

  // Filters for Corps specific collection display
  const corpsProducts = PRODUCTS.filter((p) => p.category === 'corps').slice(0, 3);

  // Filtering + Sorting algorithm for "Toute la collection"
  const getCatalogProducts = () => {
    let result = [...PRODUCTS];

    // 1. Filter by active category tab
    if (activeCatalogTab !== 'all') {
      result = result.filter((p) => p.category === activeCatalogTab);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.translation[lang].name.toLowerCase().includes(q) ||
          p.translation[lang].description.toLowerCase().includes(q) ||
          p.translation[lang].ingredients.toLowerCase().includes(q)
      );
    }

    // 3. Sort by
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Popularity (Rating descending)
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  };

  const catalogProducts = getCatalogProducts();

  // Testimonials slider controllers
  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };
  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <div className="text-charbon dark:text-ivoire font-sans transition-colors duration-300">
      
      {/* ======================================= */}
      {/* SECTION 3: NOS BEST-SELLERS            */}
      {/* ======================================= */}
      <section id="bestsellers" className="py-20 md:py-28 bg-white dark:bg-zinc-950">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          
          {/* Section titles */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-savane dark:text-gold uppercase font-bold block mb-3">
              RITUELS ESSENTIELS
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-cacao dark:text-sable mb-4">
              {t.secBestsellers}
            </h2>
            <div className="w-16 h-1 bg-savane mx-auto mb-4 rounded-full" />
            <p className="text-xs md:text-sm font-sans text-gray-500 dark:text-gray-400 font-light">
              {t.secBestsellersSub}
            </p>
          </div>

          {/* Grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

        </div>
      </section>

      {/* ======================================= */}
      {/* SECTION 4: LES NOUVEAUTÉS               */}
      {/* ======================================= */}
      <section id="new-arrivals" className="py-20 md:py-24 bg-ivoire dark:bg-zinc-900/40 border-y border-sable/20 dark:border-zinc-850">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          
          {/* Layout split with description and side items carousel scrolling */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Promo Card Left */}
            <div className="lg:pr-8 text-left space-y-6">
              <span className="inline-block px-3 py-1 rounded bg-olive/15 dark:bg-gold/15 text-olive dark:text-gold text-[10px] tracking-widest font-bold uppercase">
                {t.newBadge}
              </span>
              <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-cacao dark:text-sable leading-tight">
                {t.secNew}
              </h2>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                {t.secNewSub}
              </p>
              
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900 border border-sable/20 dark:border-zinc-800 space-y-2">
                <p className="text-xs font-serif font-semibold text-cacao dark:text-gold flex items-center gap-1">
                  <Leaf size={14} />
                  <span>{lang === 'fr' ? 'La quintessence de la biodiversité' : 'The pinnacle of raw seed science'}</span>
                </p>
                <p className="text-[11px] text-gray-500 font-light">
                  {lang === 'fr' 
                    ? 'Découvrez nos toutes dernières formules exclusives pressées à froid au coucher du soleil dans nos laboratoires de coopératives solidaires.'
                    : 'Discover our newest cold-pressed infusions crafted locally under strict sustainable oversight.'}
                </p>
              </div>

              <button
                onClick={() => setOpenQuiz(true)}
                className="inline-flex items-center gap-2 text-xs font-bold text-olive hover:text-cacao dark:text-gold transition-colors tracking-widest uppercase cursor-pointer"
              >
                <span>{lang === 'fr' ? 'Créer mon rituel personnalisé' : 'Design my personalized ritual'}</span>
                <ArrowRight size={14} className="animate-pulse" />
              </button>
            </div>

            {/* List Right */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {newArrivals.slice(0, 2).map((prod) => (
                <div key={prod.id} className="relative">
                  <div className="absolute -top-3 -left-3 bg-olive text-[#F8F5F0] text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow z-10">
                    Latest
                  </div>
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ======================================= */}
      {/* SECTION 5: COLLECTION VISAGE            */}
      {/* ======================================= */}
      <section id="visage-collection" className="py-20 md:py-28 bg-white dark:bg-zinc-950">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-12">
            
            <div className="lg:col-span-1 relative group rounded-3xl overflow-hidden h-[450px] md:h-[500px] shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=80" 
                alt="Face flowers" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] dark:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cacao/70 via-black/15 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8DCC8]">AMYES FACIALS</span>
                <h3 className="text-3xl font-serif font-bold text-white leading-tight">
                  {t.secVisage}
                </h3>
                <p className="text-xs font-light text-[#F8F5F0]/80">
                  {t.secVisageSub}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visageProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ======================================= */}
      {/* SECTION 6: COLLECTION CORPS             */}
      {/* ======================================= */}
      <section id="corps-collection" className="py-20 md:py-28 bg-ivoire dark:bg-zinc-900/20 border-y border-sable/20 dark:border-zinc-850">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 order-2 lg:order-1">
              {corpsProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>

            <div className="lg:col-span-1 relative group rounded-3xl overflow-hidden h-[450px] md:h-[500px] shadow-xl order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1590156546746-c22408ea4c01?auto=format&fit=crop&w=700&q=80" 
                alt="Body care details" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.9] dark:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5C4533]/80 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8DCC8]">AMYES BOTANICAL BODY</span>
                <h3 className="text-3xl font-serif font-bold text-white leading-tight">
                  {t.secCorps}
                </h3>
                <p className="text-xs font-light text-[#F8F5F0]/80">
                  {t.secCorpsSub}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================= */}
      {/* SECTION 7: TOUTE LA COLLECTION (SHOP)   */}
      {/* ======================================= */}
      <section id="shop" className="py-20 md:py-28 bg-white dark:bg-zinc-950">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          
          {/* Section banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-savane dark:text-gold uppercase font-bold block mb-3">
              EXPLORATEUR BOTANIQUE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-cacao dark:text-sable">
              {t.secAllCollection}
            </h2>
            <div className="w-16 h-1 bg-savane mx-auto mt-4 rounded-full" />
          </div>

          {/* Filtering control grid panel bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-6 border-b border-sable/20 dark:border-zinc-800 font-sans">
            
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {[
                { id: 'all', label: t.filterAll },
                { id: 'visage', label: t.filterVisage },
                { id: 'corps', label: t.filterCorps },
                { id: 'bien-etre', label: t.filterWellness }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCatalogTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all uppercase cursor-pointer ${
                    activeCatalogTab === tab.id
                      ? 'bg-cacao text-ivoire shadow-md dark:bg-gold dark:text-charbon'
                      : 'bg-[#F4EDE0]/50 text-charbon hover:bg-[#F4EDE0] dark:bg-zinc-900 dark:text-ivoire dark:hover:bg-zinc-800 border border-sable/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Price Popular sorting triggers */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-xs text-gray-400 uppercase tracking-widest whitespace-nowrap">
                {t.sortLabel}:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold bg-[#F8F5F0] dark:bg-zinc-900 border border-sable/25 dark:border-zinc-800 rounded-full py-2.5 px-4 outline-none focus:ring-1 focus:ring-savane text-charbon dark:text-ivoire cursor-pointer flex-grow md:flex-grow-0"
              >
                <option value="popular">{t.sortPopular}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
              </select>
            </div>

          </div>

          {/* Core catalog listings */}
          {catalogProducts.length === 0 ? (
            /* Empty state */
            <div className="py-20 text-center font-sans">
              <span className="text-3xl text-gray-400">🔍</span>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-4 leading-normal">
                {t.noProductsFound}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {catalogProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ======================================= */}
      {/* SECTION 9: BIEN-ÊTRE ET SANTÉ           */}
      {/* ======================================= */}
      <section id="wellness" className="py-20 md:py-28 bg-[#F4EDE0]/50 dark:bg-zinc-905 border-t border-sable/20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          
          {/* Section banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-savane dark:text-gold uppercase font-bold block mb-3">
              HOLISTIQUE & ENTHÉOGÈNE
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-cacao dark:text-sable">
              {t.secWellness}
            </h2>
            <div className="w-16 h-1 bg-savane mx-auto mt-4 rounded-full" />
            <p className="text-xs md:text-sm text-gray-500 mt-4 font-light leading-relaxed">
              {t.secWellnessSub}
            </p>
          </div>

          {/* Wellness dynamic highlights with premium lists with icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1: Tisanes Naturelles */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-sable/20 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sable/35 dark:bg-zinc-800 flex items-center justify-center text-olive dark:text-gold mb-6 border border-sable/20">
                  <Coffee size={24} />
                </div>
                <h3 className="text-lg font-serif font-bold text-charbon dark:text-ivoire mb-3 uppercase tracking-wide">
                  {lang === 'fr' ? 'Tisanes & Infusions' : 'Infusions & Teas'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-6">
                  {lang === 'fr' 
                    ? 'Formulées avec du Kinkéliba sauvage, de la Citronnelle et de l\'Hibiscus du Sahel pour nettoyer et dynamiser le corps de l\'intérieur.'
                    : 'Brewed with wild Kinkéliba leaves, Lemongrass, and Sahelian Hibiscus to restore structural energy from the inside out.'}
                </p>
              </div>
              <ul className="space-y-2 border-t border-sable/10 pt-4 text-xs font-light text-gray-600 dark:text-gray-350">
                <li className="flex items-center gap-2">🌿 SANS CAFÉINE NI EXCITANT</li>
                <li className="flex items-center gap-2">🍵 SOURCÉ SOLIDAIRE</li>
              </ul>
            </div>

            {/* Box 2: Huiles essentielles */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-sable/20 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sable/35 dark:bg-zinc-800 flex items-center justify-center text-olive dark:text-gold mb-6 border border-sable/20">
                  <Sun size={24} />
                </div>
                <h3 className="text-lg font-serif font-bold text-charbon dark:text-ivoire mb-3 uppercase tracking-wide">
                  {lang === 'fr' ? 'Huiles Ancestrales' : 'Sacred Plant Oils'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-6">
                  {lang === 'fr' 
                    ? 'Baobab sauvage, Dattier du désert et graine de Melon d\'eau. Des élixirs sacrés chargés en lipides protecteurs.'
                    : 'Wild Baobab, healing Desert Date, and Kalahari melon seed essences. Liquid gold for lipid boundary reconstruction.'}
                </p>
              </div>
              <ul className="space-y-2 border-t border-sable/10 pt-4 text-xs font-light text-gray-600 dark:text-gray-350">
                <li className="flex items-center gap-2">✨ PRESSION À FROID GARANTIE</li>
                <li className="flex items-center gap-2">🧴 TEXTURES SÈCHES SANS FILM GRAS</li>
              </ul>
            </div>

            {/* Box 3: Super-aliments */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-sable/20 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sable/35 dark:bg-zinc-800 flex items-center justify-center text-olive dark:text-gold mb-6 border border-sable/20">
                  <Shield size={24} />
                </div>
                <h3 className="text-lg font-serif font-bold text-charbon dark:text-ivoire mb-3 uppercase tracking-wide">
                  {lang === 'fr' ? 'Super-aliments' : 'Raw Superfoods'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-6">
                  {lang === 'fr' 
                    ? 'Feuilles de Moringa finement pulvérisées et poudre d\'arbre à pain (Baobab), extraordinairement riches en micronutriments.'
                    : 'Sustainably milled Moringa oleifera leaves and wild Baobab fruit powders, dense with natural Vitamin C, Iron, and Calcium.'}
                </p>
              </div>
              <ul className="space-y-2 border-t border-sable/10 pt-4 text-xs font-light text-gray-600 dark:text-gray-350">
                <li className="flex items-center gap-2">⚡ ÉNERGIE SAUVAGE LONGUE DURÉE</li>
                <li className="flex items-center gap-2">💪 RENFORCE L\'IMMUNITÉ NATURELLE</li>
              </ul>
            </div>

          </div>

          {/* Quick CTA to shop all wellness infusions */}
          <div className="mt-14 text-center">
            <button
              onClick={() => { setActiveCatalogTab('bien-etre'); handleScrollTo('shop'); }}
              className="px-8 py-3.5 rounded-full bg-cacao text-ivoire hover:bg-olive transition-colors text-xs font-semibold tracking-widest uppercase shadow shadow-cacao/40 cursor-pointer"
            >
              {lang === 'fr' ? 'Explorer notre herboristerie' : 'Browse herbal dispensary'}
            </button>
          </div>

        </div>
      </section>

      {/* ======================================= */}
      {/* SECTION 10: TÉMOIGNAGES (REVIEWS)       */}
      {/* ======================================= */}
      <section className="py-20 md:py-28 bg-[#F8F5F0] dark:bg-zinc-950 text-charbon dark:text-ivoire border-t border-sable/20">
        <div className="px-4 mx-auto max-w-5xl sm:px-6 lg:px-8">
          
          {/* Section banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-savane dark:text-gold uppercase font-bold block mb-3">
              AVIS DES CLIENTS
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-cacao dark:text-sable">
              {t.testiTitle}
            </h2>
            <div className="w-16 h-1 bg-savane mx-auto mt-4 rounded-full" />
            <p className="text-xs font-sans text-gray-500 mt-3 font-light">
              {t.testiSub}
            </p>
          </div>

          {/* Animated/Controllable slider box */}
          <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-sable/20 dark:border-zinc-850 p-8 md:p-14 shadow-lg focus:outline-none select-none">
            
            <div className="space-y-6 text-center max-w-3xl mx-auto">
              
              {/* Stars */}
              <div className="flex text-amber-500 justify-center">
                {[...Array(REVIEWS[activeReviewIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* Translation comment text */}
              <blockquote className="text-sm md:text-md italic text-gray-650 dark:text-gray-300 font-sans leading-relaxed">
                "{REVIEWS[activeReviewIndex].translation[lang].comment}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col items-center justify-center pt-2">
                <img
                  src={REVIEWS[activeReviewIndex].avatar}
                  alt={REVIEWS[activeReviewIndex].author}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-sable"
                />
                
                <h4 className="font-serif font-bold text-sm text-cacao dark:text-gold mt-3">
                  {REVIEWS[activeReviewIndex].author}
                </h4>
                
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#7A7D4E] font-semibold mt-1">
                  {REVIEWS[activeReviewIndex].translation[lang].skinType}
                </span>
                
                <span className="text-[9px] text-gray-400 mt-1 uppercase">
                  Verified Purchase • {REVIEWS[activeReviewIndex].date}
                </span>

              </div>
            </div>

            {/* Left and Right directional arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-3 md:left-6">
              <button
                onClick={prevReview}
                className="p-2 sm:p-3 rounded-full border border-sable/35 bg-white hover:bg-sable/10 text-charbon dark:bg-zinc-800 dark:border-zinc-700 dark:text-ivoire transition-colors hover:scale-105"
                aria-label="Previous review"
              >
                <ArrowLeft size={14} />
              </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-3 md:right-6">
              <button
                onClick={nextReview}
                className="p-2 sm:p-3 rounded-full border border-sable/35 bg-white hover:bg-sable/10 text-charbon dark:bg-zinc-800 dark:border-zinc-700 dark:text-ivoire transition-colors hover:scale-105"
                aria-label="Next review"
              >
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

          {/* Indicators bullet dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveReviewIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeReviewIndex ? 'bg-olive w-5' : 'bg-sable'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

const handleScrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
