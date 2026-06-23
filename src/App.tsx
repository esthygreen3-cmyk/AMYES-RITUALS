import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { UI_TRANSLATIONS } from './translations';
import { PRODUCTS, REVIEWS, ARTICLES } from './data';
import { Article } from './types';

// Importing custom designed components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SkincareQuiz } from './components/SkincareQuiz';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';

// Lucide Icons
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  Mail, 
  ChevronRight, 
  BookOpen, 
  Timer, 
  User, 
  CheckCircle2, 
  X,
  Compass,
  Instagram,
  Facebook,
  Heart
} from 'lucide-react';

function MainLayout() {
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

  // Blog modal state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Newsletter form state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // 1. Filtering Products list
  const filteredProducts = PRODUCTS.filter((product) => {
    // Search query filter
    const searchMatch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.translation[lang].name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.translation[lang].tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.translation[lang].ingredients.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    if (!searchMatch) return false;

    // Category Filter tabs
    if (activeFilter === 'all') return true;
    if (activeFilter === 'visage') return product.category === 'visage';
    if (activeFilter === 'corps') return product.category === 'corps';
    if (activeFilter === 'bien-entre' || activeFilter === 'wellness') return product.category === 'bien-etre';
    if (activeFilter === 'new') return product.isNew;
    if (activeFilter === 'bestsellers') return product.isBestseller;

    return true;
  });

  // 2. Sorting products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') {
      return a.price - b.price;
    }
    if (sortBy === 'priceDesc') {
      return b.price - a.price;
    }
    // 'popular' sort defaults to top rating and reviews count
    return b.rating * b.reviewsCount - a.rating * a.reviewsCount;
  });

  // 3. Newsletter Submission handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] dark:bg-zinc-950 text-charbon dark:text-ivoire transition-colors duration-300 flex flex-col justify-between selection:bg-sable selection:text-cacao overflow-x-hidden">
      
      {/* Dynamic Navigation */}
      <Navbar />

      {/* Hero Header Presentation */}
      <Hero />

      {/* Brands Authentic About story */}
      <About />

      {/* 4. Core Shopping Section */}
      <section 
        id="shop" 
        className="py-20 md:py-28 px-4 bg-[#F5EDE0]/40 dark:bg-zinc-900/20 border-t border-sable/20 dark:border-zinc-900 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-savane dark:text-gold uppercase font-bold block mb-2.5">
              AMYES BOTANICALS
            </span>
            <h2 className="text-2xl md:text-4.5xl font-serif font-bold text-cacao dark:text-sable">
              {lang === 'fr' ? 'La Collection Ancestrale' : 'Ancestral Collection'}
            </h2>
            <div className="w-12 h-0.5 bg-savane mx-auto mt-4 mb-4" />
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-light">
              {lang === 'fr' 
                ? 'Chaque formulation sacrée est infusée d’ingrédients précieux sourcés en harmonie avec la Terre.' 
                : 'Each sacred formulation is infused with precious active nutrients harvested in complete harmony.'}
            </p>
          </div>

          {/* Filtering and Sorting Row Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 mb-10 border-b border-sable/25 dark:border-zinc-800">
            
            {/* Category selection Tabs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 max-w-full overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: t.filterAll },
                { id: 'visage', label: t.filterVisage },
                { id: 'corps', label: t.filterCorps },
                { id: 'wellness', label: t.filterWellness },
                { id: 'new', label: t.filterNew },
                { id: 'bestsellers', label: t.filterBestsellers },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold font-sans tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer border ${
                    activeFilter === tab.id
                      ? 'bg-cacao text-ivoire border-transparent shadow shadow-cacao/30'
                      : 'bg-white/50 hover:bg-white text-gray-600 border-sable/30 hover:border-savane/50 dark:bg-zinc-900/50 dark:text-gray-300 dark:border-zinc-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sorting controls dropdown */}
            <div className="flex items-center gap-3 font-sans shrink-0">
              <label htmlFor="sort-dropdown" className="text-xs text-gray-400 font-medium">
                {t.sortLabel} :
              </label>
              <select
                id="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold py-2 px-4 rounded-xl border border-sable/30 bg-white/70 dark:bg-zinc-900 dark:border-zinc-800 text-charbon dark:text-ivoire outline-none focus:ring-1 focus:ring-savane cursor-pointer"
              >
                <option value="popular">{t.sortPopular}</option>
                <option value="priceAsc">{t.sortPriceAsc}</option>
                <option value="priceDesc">{t.sortPriceDesc}</option>
              </select>
            </div>

          </div>

          {/* Search Result logs */}
          {searchQuery && (
            <div className="mb-8 text-center text-xs text-gray-400 font-sans italic">
              {lang === 'fr' ? 'Éléments correspondant à' : 'Elements matching'} "{searchQuery}" : {sortedProducts.length} {lang === 'fr' ? 'résultats trouvés' : 'results found'}
            </div>
          )}

          {/* Core Product Cards Grid */}
          {sortedProducts.length === 0 ? (
            /* Empty state if search or category is too dry */
            <div className="py-20 text-center max-w-md mx-auto space-y-4 font-sans border border-dashed border-sable/40 rounded-3xl bg-white/30">
              <span className="text-4xl">🌾</span>
              <h3 className="font-serif font-bold text-lg text-charbon dark:text-ivoire">{t.noProductsFound}</h3>
              <p className="text-xs text-gray-400 font-light">
                {lang === 'fr' ? 'Essayez de purifier vos filtres ou de chercher d’autres mots.' : 'Try resetting your filter options or searching for standard terms.'}
              </p>
              <button 
                onClick={() => { setActiveFilter('all'); }} 
                className="mt-2 text-xs font-bold text-olive uppercase tracking-widest hover:text-cacao"
              >
                ← {lang === 'fr' ? 'Voir toute la collection' : 'View absolute collection'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {sortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 5. Custom interactive Quiz banner promo */}
      <section 
        id="wellness" 
        className="py-24 bg-gradient-to-br from-cacao/10 via-savane/5 to-olive/5 border-y border-sable/30 dark:border-zinc-900 transition-colors duration-300"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-14 shadow-xl border border-sable/20 dark:border-zinc-800 flex flex-col md:flex-row items-center gap-10 md:gap-14 relative overflow-hidden">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-sable/20 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-olive/10 rounded-full blur-2xl -ml-16 -mb-16" />

            {/* Left Image column with traditional overlay badge */}
            <div className="w-full md:w-2/5 shrink-0 relative group">
              <div className="absolute -inset-2 rounded-2xl border border-dashed border-gold/45 -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
              <div className="w-full h-80 rounded-2xl overflow-hidden relative shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=80" 
                  alt="Ancestral herboristerie" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-cacao/10 mix-blend-multiply" />
              </div>
            </div>

            {/* Right descriptive text columns */}
            <div className="w-full md:w-3/5 text-left space-y-5">
              <div className="inline-flex items-center gap-1.5 text-[10px] tracking-widest font-bold font-sans uppercase text-savane dark:text-gold">
                <Compass size={12} className="animate-spin text-gold" />
                <span>Diagnostics Personnalisés</span>
              </div>
              
              <h3 className="text-2xl md:text-3.5xl font-serif font-bold text-charbon dark:text-sable leading-tight">
                {lang === 'fr' 
                  ? 'Découvrez votre signature de soin botanique d’Afrique' 
                  : 'Establish your signature Sub-Saharan wellness routine'}
              </h3>

              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed font-sans">
                {lang === 'fr'
                  ? 'Notre herboristerie holistique a fusionné les secrets sacrés du karité pur sauvage, du Kinkéliba et du melon du Kalahari avec la science dermatologique actuelle. Répondez à 3 questions rapides pour obtenir votre ordonnance de soin sur-mesure.'
                  : 'Our holistic wellness experts have compiled generations of West African phytotherapy into a smart dynamic ritual engine. Answer 3 quick steps to receive your bespoke botanical skin and body prescription.'}
              </p>

              {/* CTA button */}
              <div>
                <button
                  onClick={() => setOpenQuiz(true)}
                  className="px-6 py-3.5 rounded-full bg-olive hover:bg-cacao text-[#F8F5F0] transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-2 group cursor-pointer shadow-md hover:shadow-olive/20"
                >
                  <Sparkles size={14} className="text-gold animate-pulse" />
                  <span>{t.navRitual}</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-20 md:py-28 bg-ivoire dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-savane dark:text-gold uppercase font-bold block mb-3">
            VERIFIED EXPERIENCES
          </span>
          <h2 className="text-2xl md:text-4.5xl font-serif font-bold text-cacao dark:text-sable mb-4">
            {t.testiTitle}
          </h2>
          <div className="w-10 h-0.5 bg-savane mx-auto mb-12" />

          {/* Testimonial Cards Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => {
              const rTrans = review.translation[lang];
              return (
                <div 
                  key={review.id} 
                  className="bg-white dark:bg-zinc-900 border border-sable/20 dark:border-zinc-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left font-sans"
                >
                  {/* Quotes copy content */}
                  <div>
                    <div className="flex text-amber-500 mb-4 justify-between items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} fill="currentColor" className="text-gold" />
                        ))}
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">{review.date}</span>
                    </div>

                    <p className="text-xs md:text-sm text-gray-650 dark:text-gray-300 leading-relaxed italic font-light font-sans mb-6">
                      "{rTrans.comment}"
                    </p>
                  </div>

                  {/* Profile user header */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-sable/10 dark:border-zinc-800">
                    <img 
                      src={review.avatar} 
                      alt={review.author} 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover shadow-sm bg-sable" 
                    />
                    <div>
                      <h4 className="text-xs font-bold text-charbon dark:text-ivoire font-serif tracking-wide">{review.author}</h4>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-olive dark:text-gold block mt-0.5">
                        {rTrans.skinType}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Ritual Journal Section (Blog) */}
      <section 
        id="blog" 
        className="py-20 md:py-28 px-4 bg-[#F5EDE0]/20 dark:bg-zinc-900/10 border-t border-sable/15 dark:border-zinc-900 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-savane dark:text-gold uppercase font-bold block mb-3">
              BOTANICAL JOURNAL
            </span>
            <h2 className="text-2xl md:text-4.5xl font-serif font-bold text-cacao dark:text-sable">
              {t.blogTitle}
            </h2>
            <div className="w-12 h-0.5 bg-savane mx-auto mt-4 mb-4" />
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-light">
              {t.blogSub}
            </p>
          </div>

          {/* Journal Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((article) => {
              const aTrans = article.translation[lang];
              return (
                <article 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="group rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-sable/20 dark:border-zinc-800 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between font-sans"
                >
                  <div>
                    {/* Cover image */}
                    <div className="relative h-56 overflow-hidden bg-sable">
                      <img 
                        src={article.image} 
                        alt={aTrans.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute bottom-3 left-3 px-3 py-1 bg-[#F8F5F0] text-charbon dark:bg-zinc-800 dark:text-ivoire rounded-full text-[10px] uppercase font-bold tracking-widest shadow-sm">
                        {article.category}
                      </span>
                    </div>

                    {/* Descriptive Details */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3.5 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                        <span className="flex items-center gap-1"><Timer size={11} /> {article.readTime}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="text-base font-bold font-serif text-charbon dark:text-ivoire leading-snug tracking-wide group-hover:text-savane dark:group-hover:text-gold transition-colors">
                        {aTrans.title}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed line-clamp-2">
                        {aTrans.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read More bottom tab */}
                  <div className="px-6 pb-6 pt-2 select-none">
                    <button 
                      onClick={() => setSelectedArticle(article)}
                      className="text-xs font-bold text-cacao hover:text-olive dark:text-gold dark:hover:text-sable transition-colors tracking-widest uppercase flex items-center gap-1.5"
                    >
                      <span>{t.blogReadMore}</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>

                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. Newsletter Signup */}
      <section className="py-24 px-4 bg-cacao text-ivoire relative overflow-hidden">
        
        {/* Background graphic nodes */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="savannah-waves" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 10 10, 20 20 T 40 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#savannah-waves)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/15">
            <Mail size={18} className="text-gold animate-pulse" />
          </div>

          <h3 className="text-2xl md:text-4.5xl font-serif font-bold text-sable tracking-wide">
            {t.newsTitle}
          </h3>
          <p className="max-w-lg mx-auto text-xs md:text-sm text-ivoire/85 leading-relaxed font-light font-sans">
            {t.newsText}
          </p>

          {/* Form input elements */}
          {newsletterSubscribed ? (
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/10 border border-white/15 text-center space-y-2 animate-fade-in font-sans">
              <CheckCircle2 size={24} className="text-gold mx-auto animate-bounce" />
              <p className="text-xs md:text-sm font-semibold text-gold">
                {t.newsSuccess}
              </p>
              <div className="inline-block py-1 px-4 border border-dashed border-gold/40 rounded-full text-xs text-ivoire font-mono uppercase tracking-widest font-bold mt-2 bg-black/10">
                PROMO CODE: BIENVENUE
              </div>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2 font-sans">
              <input 
                type="email" 
                required
                placeholder={t.newsPlaceholder}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-grow py-3 px-5 rounded-full outline-none bg-white/10 border border-white/20 focus:border-gold focus:ring-1 focus:ring-gold text-xs placeholder:text-ivoire/50 text-ivoire text-center sm:text-left font-sans"
              />
              <button 
                type="submit"
                className="py-3 px-8 bg-sable hover:bg-gold text-charbon font-bold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer shadow flex items-center justify-center gap-1.5"
              >
                <span>{t.newsSubscribe}</span>
                <ArrowRight size={13} />
              </button>
            </form>
          )}

          {/* Micro trust guarantee */}
          <p className="text-[10px] text-ivoire/50 tracking-wider uppercase">
            🛡️ {lang === 'fr' ? 'Désinscription en 1 clic • Aucun spam garanti' : 'Unsubscribe anytime • Absolute privacy respect'}
          </p>

        </div>
      </section>

      {/* 9. Premium Footer */}
      <footer className="bg-charbon text-ivoire pt-16 pb-10 border-t border-[#3A3A3A] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-14 pb-14 border-b border-[#3A3A3A]">
            
            {/* Column 1: Brand description panel */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.25em] text-sable block">
                AMYES
              </span>
              <span className="block text-[8px] md:text-[9px] font-sans font-medium tracking-[0.55em] uppercase text-gold -mt-2">
                RITUALS
              </span>
              <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm pt-2 font-sans">
                {lang === 'fr'
                  ? 'Une maison de haute beauté naturelle, inspirée des traditions botaniques et remèdes d’Afrique subsaharienne pour élever le soin quotidien au rang d’art rituel.'
                  : 'A premium house of organic African skincare, designed to elevate your daily hygiene into a beautiful meditative botanical routine.'}
              </p>
              
              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="#instagram"
                  aria-label="Instagram"
                  className="p-2 bg-[#3A3A3A] hover:bg-gold hover:text-charbon rounded-full transition-all text-gray-300"
                >
                  <Instagram size={14} />
                </a>
                <a 
                  href="#facebook"
                  aria-label="Facebook"
                  className="p-2 bg-[#3A3A3A] hover:bg-gold hover:text-charbon rounded-full transition-all text-gray-300"
                >
                  <Facebook size={14} />
                </a>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest pl-1 font-bold">@amyesrituals</div>
              </div>
            </div>

            {/* Column 2: Categories */}
            <div className="space-y-4 text-left font-sans">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold text-left">{t.footerColShop}</h4>
              <ul className="space-y-2.5 text-xs text-gray-400 font-light">
                <li>
                  <button onClick={() => { setActiveFilter('visage'); const e = document.getElementById('shop'); e?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-sable transition-colors">
                    {t.filterVisage}
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveFilter('corps'); const e = document.getElementById('shop'); e?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-sable transition-colors">
                    {t.filterCorps}
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveFilter('wellness'); const e = document.getElementById('shop'); e?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-sable transition-colors">
                    {t.filterWellness}
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveFilter('new'); const e = document.getElementById('shop'); e?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-sable transition-colors">
                    {t.filterNew}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Custom page anchor options */}
            <div className="space-y-4 text-left font-sans">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold text-left">{t.footerColAbout}</h4>
              <ul className="space-y-2.5 text-xs text-gray-400 font-light">
                <li>
                  <a href="#history" className="hover:text-sable transition-colors">
                    {t.navHistory}
                  </a>
                </li>
                <li>
                  <a href="#wellness" className="hover:text-sable transition-colors">
                    {t.navWellness}
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-sable transition-colors">
                    {t.navBlog}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Client service support links */}
            <div className="space-y-4 text-left font-sans">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold text-left">{t.footerColClient}</h4>
              <ul className="space-y-2.5 text-xs text-gray-400 font-light">
                <li><span className="hover:text-sable transition-colors select-all cursor-pointer">📦 orders@amyes.com</span></li>
                <li><span className="hover:text-sable transition-colors">{t.footerShipping}</span></li>
                <li><span className="hover:text-sable transition-colors">{t.footerReturns}</span></li>
                <li><span className="hover:text-sable transition-colors">{t.footerFaq}</span></li>
              </ul>
            </div>

          </div>

          {/* Row Bottom footer copyright and claims */}
          <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-gray-500 font-sans tracking-wide">
            
            <div className="text-center md:text-left">
              &copy; 2026 {t.brandName}. {t.allRightsReserved}
            </div>

            {/* Environmental badges */}
            <div className="flex flex-wrap justify-center gap-6">
              <span>🌾 SANS SILICONE / PARABEN</span>
              <span>📦 EMBALLAGE 100% RECYCLABLE</span>
              <span>🤝 CRUAUTÉ FR / ET - VEGAN</span>
            </div>

          </div>

        </div>
      </footer>

      {/* 10. Drawer Overlays and Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SkincareQuiz />
      <ProductDetailModal />

      {/* 11. Modal: Blog Article Reader */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/75 backdrop-blur-xs font-sans">
          
          {/* Backdrop closer click */}
          <div className="absolute inset-0" onClick={() => setSelectedArticle(null)} />
          
          {/* Article Modal content */}
          <div className="relative w-full max-w-2xl bg-ivoire dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-sable/20 dark:border-zinc-800 z-10 max-h-[90vh] overflow-y-auto flex flex-col justify-between">
            
            {/* Header image cover */}
            <div className="relative h-64 md:h-72 bg-sable">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.translation[lang].title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Category tag */}
              <span className="absolute bottom-4 left-4 px-3 py-1 bg-white text-charbon dark:bg-zinc-800 dark:text-ivoire rounded-full text-[10px] uppercase font-bold tracking-widest shadow">
                {selectedArticle.category}
              </span>

              {/* Close Button x top right */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-gold text-charbon transition-all shadow-sm"
                aria-label="Close article"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="p-6 md:p-8 space-y-4 flex-grow text-left">
              
              <div className="flex items-center gap-3.5 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                <span className="flex items-center gap-1"><Timer size={11} /> {selectedArticle.readTime}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><User size={11} /> {t.blogAuthor} {selectedArticle.author}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-3xl font-serif font-bold text-cacao dark:text-sable leading-tight select-text">
                {selectedArticle.translation[lang].title}
              </h3>

              <div className="w-16 h-0.5 bg-savane" />

              {/* Dynamic fully fledged text render */}
              <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-light leading-relaxed space-y-4 select-text font-sans">
                <p className="font-medium text-charbon dark:text-ivoire">
                  {selectedArticle.translation[lang].excerpt}
                </p>
                <p className="whitespace-pre-line pt-2">
                  {selectedArticle.translation[lang].content}
                </p>
              </div>

            </div>

            {/* Footer action */}
            <div className="p-6 border-t border-sable/12 dark:border-zinc-800 text-center">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#F8F5F0] bg-cacao hover:bg-olive transition-colors"
              >
                {t.blogClose}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
