import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { UI_TRANSLATIONS } from '../translations';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { lang, addToCart, toggleWishlist, isInWishlist, setSelectedDetailProduct, setOpenCart } = useApp();
  const t = UI_TRANSLATIONS[lang];

  const wishlisted = isInWishlist(product.id);
  const pTrans = product.translation[lang];

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDetailProduct(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div 
      onClick={() => setSelectedDetailProduct(product)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-sable/20 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:shadow-black/60 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer select-none font-sans"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F4EDE0] dark:bg-zinc-800">
        
        {/* Real Product Image with Hover Zoom */}
        <img 
          src={product.image} 
          alt={pTrans.name} 
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
        />

        {/* Shadow overlays */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Badges container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="inline-block px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase rounded-full bg-gold text-[#F8F5F0] shadow">
              {t.bestsellerBadge}
            </span>
          )}
          {product.isNew && (
            <span className="inline-block px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase rounded-full bg-olive text-white shadow">
              {t.newBadge}
            </span>
          )}
        </div>

        {/* Love / Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md backdrop-blur transition-all duration-300 ${
            wishlisted 
              ? 'bg-[#E15A5A] text-white' 
              : 'bg-[#F8F5F0]/90 text-charbon hover:text-[#E15A5A] dark:bg-zinc-800/90 dark:text-ivoire'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Hover overlay controllers */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          
          <button
            onClick={handleQuickView}
            className="p-3 rounded-full bg-[#F8F5F0] text-charbon hover:bg-gold hover:text-black transition-colors duration-300 shadow-md scale-90 group-hover:scale-100 transform"
            title={t.btnQuickView}
          >
            <Eye size={18} />
          </button>
          
          <button
            onClick={handleAddToCart}
            className="p-3 rounded-full bg-cacao text-ivoire hover:bg-olive transition-colors duration-300 shadow-md scale-90 group-hover:scale-100 transform"
            title={t.btnAddToCart}
          >
            <ShoppingCart size={18} />
          </button>

        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        
        <div>
          {/* Subcategory & Volume line */}
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-savane dark:text-gold mb-1.5 font-sans">
            <span>{product.subcategory}</span>
            <span className="opacity-75 font-light">{product.volume}</span>
          </div>

          {/* Premium product name */}
          <h4 className="text-base font-bold font-serif text-charbon dark:text-ivoire mb-1 leading-snug tracking-wide group-hover:text-savane dark:group-hover:text-gold transition-colors">
            {pTrans.name}
          </h4>

          {/* Tagline */}
          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-light truncate mb-2.5">
            {pTrans.tagline}
          </p>

          {/* Stars and Rating */}
          <div className="flex items-center gap-1 mb-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                  className={i < Math.floor(product.rating) ? '' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-350 mt-0.5">
              {product.rating}
            </span>
            <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-0.5">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Pricing and Direct Buy trigger */}
        <div className="flex items-center justify-between pt-1.5 border-t border-sable/10 dark:border-zinc-800">
          <span className="text-base font-serif font-semibold text-cacao dark:text-gold">
            {product.price.toFixed(2)} €
          </span>
          
          <button
            onClick={handleAddToCart}
            className="text-xs font-semibold uppercase tracking-widest text-olive hover:text-cacao dark:text-sable dark:hover:text-gold transition-colors flex items-center gap-1.5"
          >
            <ShoppingCart size={13} />
            <span>{t.btnAddToCart}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
