import React from 'react';
import { useApp } from '../context/AppContext';
import { UI_TRANSLATIONS } from '../translations';
import { PRODUCTS } from '../data';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    lang,
    wishlist,
    toggleWishlist,
    addToCart,
    openWishlist,
    setOpenWishlist
  } = useApp();

  const t = UI_TRANSLATIONS[lang];

  if (!openWishlist) return null;

  // Find actual products that are wishlisted
  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleClose = () => {
    setOpenWishlist(false);
  };

  const handleAddToCart = (prod: any) => {
    addToCart(prod, 1);
  };

  const handleDiscover = () => {
    setOpenWishlist(false);
    const element = document.getElementById('shop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs font-sans">
      
      {/* Backdrop closers */}
      <div className="absolute inset-0 cursor-pointer" onClick={handleClose} />

      {/* Drawer content board */}
      <div className="relative w-full max-w-md bg-ivoire dark:bg-zinc-950 h-full shadow-2xl border-l border-sable/20 dark:border-zinc-800 flex flex-col justify-between z-10 transition-transform duration-300">
        
        {/* Header panel */}
        <div className="p-6 border-b border-sable/20 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart size={20} fill="currentColor" className="text-[#E15A5A]" />
            <h3 className="text-lg font-serif font-bold text-charbon dark:text-ivoire tracking-wide">
              {t.wishlistTitle}
            </h3>
          </div>
          <button 
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-sable/35 dark:hover:bg-zinc-800 text-charbon dark:text-ivoire"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Core Body */}
        <div className="flex-grow p-6 overflow-y-auto">
          {wishlistedProducts.length === 0 ? (
            /* Empty state */
            <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-sable/20 flex items-center justify-center text-savane dark:bg-zinc-900">
                <Heart size={24} />
              </div>
              <p className="text-xs font-serif italic text-gray-400 dark:text-gray-500">
                {t.wishlistEmpty}
              </p>
              <button
                onClick={handleDiscover}
                className="py-2.5 px-5 rounded-full text-xs font-bold text-[#F8F5F0] bg-cacao hover:bg-olive transition-all tracking-wider uppercase font-sans flex items-center gap-1.2"
                id="btn-discover-wishlist"
              >
                <span>{lang === 'fr' ? 'Découvrir nos soins' : 'Discover natural care'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ) : (
            /* Wishlist Items */
            <div className="space-y-4 divide-y divide-sable/10 dark:divide-zinc-805">
              {wishlistedProducts.map((p, idx) => {
                const itemTrans = p.translation[lang];
                return (
                  <div key={p.id} className={`flex gap-4 ${idx > 0 ? 'pt-4' : ''}`}>
                    {/* Small Image Thumbnail */}
                    <img 
                      src={p.image} 
                      alt={itemTrans.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-xl bg-[#F4EDE0] flex-shrink-0 shadow-sm"
                    />

                    {/* Description labels */}
                    <div className="flex-grow min-w-0 pr-1 text-left">
                      <span className="text-[10px] uppercase font-bold text-savane dark:text-gold block mb-0.5">
                        {p.subcategory}
                      </span>
                      <h4 className="text-sm font-bold font-serif text-charbon dark:text-ivoire truncate">
                        {itemTrans.name}
                      </h4>
                      <p className="text-xs font-serif font-bold text-cacao dark:text-gold mt-1">
                        {p.price.toFixed(2)} €
                      </p>
                    </div>

                    {/* Operational controls */}
                    <div className="flex flex-col justify-between items-end">
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="p-1 rounded text-gray-400 hover:text-red-500 transition-colors"
                        title={lang === 'fr' ? 'Supprimer' : 'Remove'}
                      >
                        <Trash2 size={13} />
                      </button>

                      <button
                        onClick={() => handleAddToCart(p)}
                        className="p-2 bg-olive text-white rounded-full hover:bg-cacao transition-colors text-xs flex items-center justify-center shadow-md scale-90"
                        title={t.btnAddToCart}
                      >
                        <ShoppingCart size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Minimal claim footer */}
        <div className="p-6 border-t border-sable/20 dark:border-zinc-800 text-center">
          <button
            onClick={handleClose}
            className="text-xs uppercase font-bold tracking-widest text-cacao hover:text-savane dark:text-sable dark:hover:text-gold transition-colors"
          >
            ← {lang === 'fr' ? 'Continuer mon voyage' : 'Continue tracking rituals'}
          </button>
        </div>

      </div>
    </div>
  );
};
