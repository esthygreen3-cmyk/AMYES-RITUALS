import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TRANSLATIONS } from '../translations';
import { X, Star, Heart, Check, Minus, Plus, ShoppingBag, Sparkles } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    lang, 
    selectedDetailProduct, 
    setSelectedDetailProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  if (!selectedDetailProduct) return null;

  const product = selectedDetailProduct;
  const t = UI_TRANSLATIONS[lang];
  const pTrans = product.translation[lang];
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 2000);
  };

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fade-in font-sans">
      
      {/* Absolute Backdrop Closers */}
      <div 
        className="absolute inset-0" 
        onClick={() => setSelectedDetailProduct(null)} 
      />

      {/* Main Card */}
      <div className="relative w-full max-w-4xl bg-ivoire dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-sable/20 dark:border-zinc-800 z-10 transition-transform flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button Top Right */}
        <button
          onClick={() => setSelectedDetailProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#F8F5F0]/80 dark:bg-zinc-850/80 text-charbon dark:text-ivoire hover:bg-gold transition-colors shadow-sm"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Column 1: Image Scroll */}
        <div className="w-full md:w-1/2 relative bg-[#F4EDE0] dark:bg-zinc-800 md:h-full min-h-[300px]">
          <img 
            src={product.image} 
            alt={pTrans.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center absolute inset-0"
          />
          
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 label">
            {product.isBestseller && (
              <span className="inline-block px-3 py-1 text-[9px] font-bold tracking-widest uppercase rounded-full bg-gold text-[#F8F5F0] shadow-sm">
                {t.bestsellerBadge}
              </span>
            )}
            {product.isNew && (
              <span className="inline-block px-3 py-1 text-[9px] font-bold tracking-widest uppercase rounded-full bg-olive text-white shadow-sm">
                {t.newBadge}
              </span>
            )}
          </div>
        </div>

        {/* Column 2: Specific product notes */}
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto md:max-h-[90vh] flex flex-col justify-between">
          <div>
            {/* Category / Subtitle */}
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-savane dark:text-gold block mb-2 font-sans">
              AMYES RITUALS • {product.subcategory}
            </span>

            {/* Title */}
            <h3 className="text-2xl md:text-3.5xl font-bold font-serif text-cacao dark:text-sable mb-1 select-text">
              {pTrans.name}
            </h3>

            {/* Tagline */}
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-light italic mb-4">
              {pTrans.tagline}
            </p>

            {/* Stars and verified review logs */}
            <div className="flex items-center gap-2 mb-6 p-2 rounded-xl bg-sable/10 border border-sable/10 justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                      className={i < Math.floor(product.rating) ? '' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-0.5">{product.rating}</span>
              </div>
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#7A7D4E] font-semibold">
                ✓ {t.ratingsText}
              </span>
            </div>

            {/* Price / Volume Size */}
            <div className="flex items-baseline gap-4 mb-6 pt-1.5 border-b border-sable/10 pb-4">
              <span className="text-2xl md:text-3xl font-serif font-bold text-cacao dark:text-gold block">
                {product.price.toFixed(2)} €
              </span>
              <span className="text-xs font-sans tracking-widest uppercase text-gray-400 dark:text-gray-500">
                {t.volumeLabel}: {product.volume}
              </span>
            </div>

            {/* Formular descriptions */}
            <div className="space-y-6 text-xs md:text-sm text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-6 select-text">
              <p>{pTrans.description}</p>
              
              {/* Ingredients block */}
              <div>
                <h4 className="font-serif font-bold text-cacao dark:text-sable text-sm uppercase tracking-wide mb-1.5">
                  🌿 {t.ingredientsLabel}
                </h4>
                <p className="bg-[#5C4533]/5 dark:bg-white/5 p-3 rounded-xl border border-sable/20 italic text-[11.5px] font-sans">
                  {pTrans.ingredients}
                </p>
              </div>

              {/* Usage guidelines */}
              <div>
                <h4 className="font-serif font-bold text-cacao dark:text-sable text-sm uppercase tracking-wide mb-1.5">
                  ✨ {t.usageLabel}
                </h4>
                <p className="italic text-[11.5px] font-sans font-light">
                  {pTrans.usage}
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer Drawer block */}
          <div className="pt-6 border-t border-sable/20 dark:border-zinc-800 space-y-4">
            
            <div className="flex items-center justify-between gap-4 font-sans">
              
              {/* Active quantity adjust */}
              <div className="flex items-center border border-sable/50 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-800 p-1">
                <button
                  onClick={decrementQty}
                  className="p-1.5 rounded-full hover:bg-sable/10 text-charbon dark:text-ivoire"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-xs font-bold text-charbon dark:text-ivoire">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  className="p-1.5 rounded-full hover:bg-sable/10 text-charbon dark:text-ivoire"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Wishlist triggers */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-full border shadow-sm transition-colors ${
                  wishlisted 
                    ? 'bg-[#E15A5A]/10 border-[#E15A5A] text-[#E15A5A]' 
                    : 'bg-white border-sable/40 text-charbon hover:text-[#E15A5A] dark:bg-zinc-800 dark:border-zinc-700 dark:text-ivoire'
                }`}
                aria-label="Wishlist"
              >
                <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>

            </div>

            {/* Final checkout CTA */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-full bg-cacao text-[#F8F5F0] hover:bg-olive transition-colors font-semibold tracking-widest uppercase text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag size={15} />
                {t.btnAddToCart}
              </button>

              {addedMessage && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-olive font-bold text-center animate-pulse">
                  <Check size={14} />
                  <span>{t.itemAdded}</span>
                </div>
              )}
            </div>

            {/* Environmental claim bullet */}
            <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400 uppercase tracking-wider text-center">
              <Sparkles size={11} className="text-gold" />
              <span>{t.cartSecure}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
