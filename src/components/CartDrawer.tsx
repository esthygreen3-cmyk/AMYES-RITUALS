import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TRANSLATIONS } from '../translations';
import { X, Minus, Plus, Trash2, Tag, Percent, ArrowRight, ShieldCheck, ShoppingBag, Grid } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    lang,
    cart,
    updateCartQuantity,
    removeFromCart,
    openCart,
    setOpenCart,
    clearCart
  } = useApp();

  const t = UI_TRANSLATIONS[lang];

  // Promo code handles
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // value in %
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  
  // Checkout simulation
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!openCart) return null;

  // Pricing math
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const deliveryThreshold = 60;
  const isFreeDelivery = subtotal >= deliveryThreshold;
  const remainingForFree = deliveryThreshold - subtotal;
  
  const discountAmount = subtotal * (appliedDiscount / 100);
  const deliveryCost = isFreeDelivery || subtotal === 0 ? 0 : 5.90;
  const finalTotal = subtotal - discountAmount + deliveryCost;

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    
    if (code === 'RITUELS15') {
      setAppliedDiscount(15);
      setPromoSuccess(lang === 'fr' ? 'Code RITUELS15 appliqué (15% offerts !)' : 'RITUELS15 code applied (15% Off !)');
    } else if (code === 'BIENVENUE') {
      setAppliedDiscount(10);
      setPromoSuccess(lang === 'fr' ? 'Code BIENVENUE appliqué (10% offerts !)' : 'BIENVENUE code applied (10% Off !)');
    } else {
      setPromoError(lang === 'fr' ? 'Code invalide. Essayez : RITUELS15' : 'Invalid code. Try: RITUELS15');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate premium payment
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      clearCart();
    }, 2200);
  };

  const handleClose = () => {
    setOpenCart(false);
    // Reset confirmation status upon closure
    if (checkoutComplete) {
      setCheckoutComplete(false);
    }
  };

  const handleDiscoverMore = () => {
    setOpenCart(false);
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
            <ShoppingBag size={20} className="text-cacao dark:text-gold" />
            <h3 className="text-lg font-serif font-bold text-charbon dark:text-ivoire tracking-wide">
              {t.cartTitle}
            </h3>
          </div>
          <button 
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-sable/35 dark:hover:bg-zinc-800 text-charbon dark:text-ivoire"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Core Body */}
        <div className="flex-grow p-6 overflow-y-auto">
          
          {checkoutComplete ? (
            /* Successful Checkout splash screen */
            <div className="h-full flex flex-col justify-center items-center text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-serif font-bold text-charbon dark:text-ivoire">
                {t.checkoutSuccess}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-light max-w-sm leading-relaxed">
                {lang === 'fr'
                  ? 'Votre colis de rituels botaniques sacrés est en cours de préparation par notre herboristerie. Un email de suivi vous sera envoyé sous peu.'
                  : 'Your sacred parcel of botanical infusions and oils is currently being packed with care. A tracking link will be emailed to you shortly.'}
              </p>
              <button
                onClick={handleClose}
                className="py-3 px-8 rounded-full bg-olive text-white text-xs font-semibold tracking-widest uppercase shadow hover:bg-cacao transition-colors"
                id="btn-close-thanks"
              >
                {t.closeLabel}
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout simulation loading screen */
            <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-12 h-12 border-4 border-sable border-t-cacao rounded-full animate-spin dark:border-zinc-800 dark:border-t-gold" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7A7D4E] animate-pulse">
                {lang === 'fr' ? 'Vérification bancaire sécurisée...' : 'Securing payment gateway...'}
              </p>
              <span className="text-[10px] text-gray-400 uppercase font-sans">
                {t.cartSecure}
              </span>
            </div>
          ) : cart.length === 0 ? (
            /* Empty state */
            <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-sable/20 flex items-center justify-center text-savane dark:bg-zinc-900">
                <ShoppingBag size={24} />
              </div>
              <p className="text-xs font-serif italic text-gray-500 dark:text-gray-400">
                {t.cartEmpty}
              </p>
              <button
                onClick={handleDiscoverMore}
                className="py-3 px-6 rounded-full text-xs font-bold text-[#F8F5F0] bg-cacao hover:bg-olive transition-all tracking-wider uppercase font-sans flex items-center gap-1.5"
                id="btn-discover-more-empty"
              >
                <Grid size={13} />
                <span>{lang === 'fr' ? 'Découvrir la collection' : 'Discover the shop'}</span>
              </button>
            </div>
          ) : (
            /* Filled Cart items listings */
            <div className="space-y-6">
              
              {/* Delivery Goal meter */}
              <div className="p-4 rounded-2xl bg-sable/35 dark:bg-zinc-900 border border-sable/20 dark:border-zinc-800 font-sans">
                {isFreeDelivery ? (
                  <div className="text-xs font-bold text-olive dark:text-gold flex items-center justify-center gap-1.5 uppercase tracking-wide">
                    🎉 <span>{t.cartFreeDeliveryBadge}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 font-medium text-center">
                      {lang === 'fr' 
                        ? `Ajoutez ${remainingForFree.toFixed(0)}€ de soins pour la LIVRAISON OFFERTE.` 
                        : `Add €${remainingForFree.toFixed(0)} more for FREE DELIVERY.`}
                    </p>
                    <div className="w-full h-1 bg-white/50 rounded-full dark:bg-zinc-800 overflow-hidden">
                      <div 
                        className="h-full bg-olive rounded-full" 
                        style={{ width: `${(subtotal / deliveryThreshold) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items lists */}
              <div className="divide-y divide-sable/10 dark:divide-zinc-800">
                {cart.map((item) => {
                  const itemTrans = item.product.translation[lang];
                  return (
                    <div key={item.product.id} className="py-4 flex gap-4">
                      {/* Image Thumbnail */}
                      <img
                        src={item.product.image}
                        alt={itemTrans.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-xl bg-[#F4EDE0] shadow-sm flex-shrink-0"
                      />

                      {/* Info Block */}
                      <div className="flex-grow min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-serif font-bold text-sm text-charbon dark:text-ivoire truncate">
                              {itemTrans.name}
                            </h4>
                            <span className="font-serif font-bold text-xs text-cacao dark:text-gold flex-shrink-0">
                              {(item.product.price * item.quantity).toFixed(2)} €
                            </span>
                          </div>
                          
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                            {item.product.volume}
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-between items-center mt-2.5">
                          {/* Quantity picker */}
                          <div className="flex items-center border border-sable/40 dark:border-zinc-700 rounded-full bg-white dark:bg-zinc-800 p-0.5">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 rounded-full text-charbon hover:bg-sable/10 dark:text-ivoire"
                              aria-label="Reduce"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="w-6 text-center text-[11px] font-bold text-charbon dark:text-ivoire">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 rounded-full text-charbon hover:bg-sable/10 dark:text-ivoire"
                              aria-label="Increase"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          {/* Delete trash button */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                            aria-label="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

        {/* Footer Checkout action board */}
        {!checkoutComplete && cart.length > 0 && (
          <div className="p-6 border-t border-sable/20 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 space-y-4 font-sans">
            
            {/* Promo Code Fields */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-grow flex items-center border border-sable rounded-full px-3 py-1 bg-white dark:bg-zinc-800 dark:border-zinc-750">
                  <Tag size={13} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder={t.cartPromoCode}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full text-xs bg-transparent border-none outline-none focus:ring-0 text-charbon dark:text-ivoire uppercase"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-sable hover:bg-gold text-charbon font-bold text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer"
                >
                  {t.cartPromoApply}
                </button>
              </div>

              {promoSuccess && (
                <div className="flex items-center gap-1.5 text-[11px] text-green-600 font-semibold pl-1">
                  <Percent size={11} />
                  <span>{promoSuccess}</span>
                </div>
              )}
              {promoError && (
                <p className="text-[11px] text-red-500 font-medium pl-1">
                  {promoError}
                </p>
              )}
            </div>

            {/* Calculations lines */}
            <div className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 border-b border-sable/10 dark:border-zinc-800 pb-4">
              <div className="flex justify-between">
                <span>{lang === 'fr' ? 'Sous-total articles' : 'Items subtotal'}</span>
                <span className="font-semibold text-charbon dark:text-ivoire">{subtotal.toFixed(2)} €</span>
              </div>
              
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>{t.cartPromoDiscount} (-{appliedDiscount}%)</span>
                  <span>-{discountAmount.toFixed(2)} €</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{lang === 'fr' ? 'Frais d\'envoi' : 'Delivery fees'}</span>
                <span>
                  {deliveryCost === 0 
                    ? <span className="text-olive dark:text-gold uppercase font-bold text-[10px] tracking-wider">{t.cartFreeDeliveryBadge}</span> 
                    : `${deliveryCost.toFixed(2)} €`}
                </span>
              </div>
            </div>

            {/* Total Lines */}
            <div className="flex justify-between items-baseline pt-1.5">
              <span className="text-sm font-bold uppercase tracking-wider text-charbon dark:text-ivoire">Total</span>
              <span className="text-xl md:text-2xl font-serif font-extrabold text-cacao dark:text-gold">
                {finalTotal.toFixed(2)} €
              </span>
            </div>

            {/* Checkout push CTAs */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-full bg-cacao text-ivoire hover:bg-olive transition-colors font-semibold tracking-widest uppercase text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-olive/20"
            >
              <ShieldCheck size={16} />
              <span>{t.cartCheckout}</span>
              <ArrowRight size={14} />
            </button>

            {/* Secure warning badge */}
            <p className="text-[10px] text-gray-400 uppercase tracking-wider text-center flex items-center justify-center gap-1">
              <span>🛡️</span>
              <span>{t.cartSecure}</span>
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
