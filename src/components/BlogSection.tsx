import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ARTICLES } from '../data';
import { Article } from '../types';
import { UI_TRANSLATIONS } from '../translations';
import { Calendar, User, Clock, ArrowRight, X, Heart, Sparkles } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { lang } = useApp();
  const t = UI_TRANSLATIONS[lang];

  // Active full article for premium editorial popup reading modal
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section 
      id="blog" 
      className="py-20 md:py-32 bg-ivoire dark:bg-zinc-950 text-charbon dark:text-ivoire transition-colors duration-300"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-savane dark:text-gold uppercase font-bold block mb-3">
            AMYES EDITORIAL
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-cacao dark:text-sable mb-4">
            {t.blogTitle}
          </h2>
          <div className="w-16 h-1 bg-savane mx-auto mb-6 rounded-full" />
          <p className="text-sm md:text-base font-sans text-gray-500 dark:text-gray-400 font-light max-w-md mx-auto">
            {t.blogSub}
          </p>
        </div>

        {/* 3-Column Magazine Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 font-sans">
          {ARTICLES.map((art) => {
            const artTrans = art.translation[lang];
            return (
              <article 
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-sable/15 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                {/* Article Card image frame */}
                <div className="relative h-56 w-full overflow-hidden bg-sable/30 dark:bg-zinc-800">
                  <img 
                    src={art.image} 
                    alt={artTrans.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute top-4 left-4 bg-ivoire/95 dark:bg-zinc-90 w/95 backdrop-blur shadow px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-cacao uppercase">
                    {art.category}
                  </div>
                </div>

                {/* Article Card core copy */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Metadata line */}
                    <div className="flex items-center gap-4 text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                      <span className="flex items-center gap-1.2">
                        <Calendar size={11} />
                        {art.date}
                      </span>
                      <span className="flex items-center gap-1.2">
                        <Clock size={11} />
                        {art.readTime}
                      </span>
                    </div>

                    {/* Bold Title */}
                    <h3 className="text-base md:text-lg font-serif font-bold text-charbon dark:text-ivoire mb-2.5 leading-snug group-hover:text-savane dark:group-hover:text-gold transition-colors">
                      {artTrans.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed line-clamp-3 mb-5">
                      {artTrans.excerpt}
                    </p>
                  </div>

                  {/* Actions line */}
                  <div className="flex items-center justify-between pt-4 border-t border-sable/10 dark:border-zinc-800">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-olive dark:text-gold group-hover:text-cacao dark:group-hover:text-sable transition-colors flex items-center gap-1">
                      <span>{t.blogReadMore}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {t.blogAuthor} {art.author}
                    </span>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* FULL ARTICLE MODAL POPUP FOR COMFORTABLE READING */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div 
              className="absolute inset-0" 
              onClick={() => setSelectedArticle(null)} 
            />

            <div className="relative w-full max-w-2xl bg-ivoire dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-sable/20 dark:border-zinc-800 z-10 max-h-[85vh] overflow-y-auto font-sans flex flex-col">
              
              {/* Image banner */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden bg-black/20 flex-shrink-0">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.translation[lang].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Category Badge overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gold bg-black/35 px-3 py-1 rounded-full inline-block mb-2">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight">
                    {selectedArticle.translation[lang].title}
                  </h3>
                </div>

                {/* Close Button top-right */}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-[#F8F5F0]/90 dark:bg-zinc-850/90 text-charbon dark:text-ivoire hover:bg-gold rounded-full shadow transition-all duration-300 z-15"
                  aria-label="Close article"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Prose body container */}
              <div className="p-6 md:p-10 overflow-y-auto space-y-6 text-left select-text">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-widest pb-4 border-b border-sable/10">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {selectedArticle.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {selectedArticle.readTime}
                    </span>
                  </div>
                  <span className="font-semibold text-savane dark:text-gold">
                    {t.blogAuthor} {selectedArticle.author}
                  </span>
                </div>

                {/* Intro bold block */}
                <p className="text-xs md:text-sm font-semibold text-cacao dark:text-sable italic leading-relaxed">
                  {selectedArticle.translation[lang].excerpt}
                </p>

                {/* Full Article Text Block */}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-light space-y-4">
                  {selectedArticle.translation[lang].content}
                </p>

                {/* Editorial signpost */}
                <div className="pt-6 border-t border-sable/15 dark:border-zinc-800 flex justify-between items-center bg-sable/5 p-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-gold animate-spin-slow" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-650">AMYES RITUALS JOURNAL</span>
                  </div>
                  
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="text-xs uppercase font-extrabold tracking-widest text-[#7A7D4E]"
                  >
                    {t.blogClose}
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
