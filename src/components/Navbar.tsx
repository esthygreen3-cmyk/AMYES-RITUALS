import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UI_TRANSLATIONS } from '../translations';
import { ShoppingBag, Heart, Search, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    lang,
    toggleLanguage,
    darkMode,
    toggleDarkMode,
    cart,
    wishlist,
    setOpenCart,
    setOpenWishlist,
    searchQuery,
    setSearchQuery,
    setOpenQuiz
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const t = UI_TRANSLATIONS[lang];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { label: t.navHome, id: 'hero' },
    { label: t.navHistory, id: 'history' },
    { label: t.navProducts, id: 'shop' },
    { label: t.navWellness, id: 'wellness' },
    { label: t.navBlog, id: 'blog' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full transition-colors duration-300 border-b bg-ivoire/90 border-sable/30 backdrop-blur-md dark:bg-zinc-900/90 dark:border-zinc-800">
      {/* Top Banner */}
      <div className="w-full bg-cacao text-[#F8F5F0] py-1.5 px-4 text-xs font-sans tracking-widest text-center flex items-center justify-center gap-2">
        <Sparkles size={13} className="animate-pulse text-gold" />
        <span className="uppercase text-[10px] md:text-xs">
          {lang === 'fr' 
            ? 'LIVRAISON OFFERTE DÈS 60€ EN EUROPE & AFRIQUE' 
            : 'FREE DELIVERY WORLDWIDE FOR ORDERS OVER €60'}
        </span>
        <Sparkles size={13} className="animate-pulse text-gold" />
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleScrollTo('hero')}>
            <span className="text-xl md:text-2xl lg:text-3xl font-serif font-semibold tracking-[0.2em] text-cacao dark:text-sable">
              AMYES
            </span>
            <span className="block text-[8px] md:text-[9px] font-sans font-light tracking-[0.55em] uppercase text-savane dark:text-gold text-center">
              RITUALS
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 font-sans">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="text-xs font-medium tracking-widest uppercase cursor-pointer text-charbon hover:text-savane dark:text-ivoire dark:hover:text-gold transition-colors"
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setOpenQuiz(true)}
              className="text-xs font-semibold tracking-widest uppercase cursor-pointer text-olive hover:text-savane dark:text-amber-200 dark:hover:text-gold transition-colors flex items-center gap-1.5 bg-sable/20 px-3 py-1.5 rounded-full border border-sable/30"
              id="nav-quick-quiz"
            >
              <Sparkles size={11} className="text-gold" />
              {t.navRitual}
            </button>
          </div>

          {/* Search, Cart, Wishlist, Theme & Lang Options */}
          <div className="flex items-center space-x-2 md:space-x-4">
            
            {/* Search toggler */}
            <div className="relative">
              {showSearchBox ? (
                <div className="flex items-center border border-sable rounded-full px-3 py-1 bg-white dark:bg-zinc-800 dark:border-zinc-700 animate-slide-in">
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-32 md:w-48 text-xs bg-transparent border-none outline-none focus:ring-0 text-charbon dark:text-ivoire"
                    autoFocus
                  />
                  <button onClick={() => { setShowSearchBox(false); setSearchQuery(''); }}>
                    <X size={14} className="text-gray-400 hover:text-cacao" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchBox(true)}
                  className="p-1 px-2 rounded-full cursor-pointer hover:bg-sable/20 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Search"
                >
                  <Search size={18} className="text-cacao dark:text-sable" />
                </button>
              )}
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="text-xs font-bold tracking-widest cursor-pointer hover:text-savane dark:text-ivoire p-1 px-2.5 rounded border border-sable/40 dark:border-zinc-700 hover:bg-sable/20 dark:hover:bg-zinc-800 transition-all font-sans uppercase"
              title="Switch language"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-full cursor-pointer hover:bg-sable/20 dark:hover:bg-zinc-800 text-cacao dark:text-sable transition-colors"
              title="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setOpenWishlist(true)}
              className="relative p-1.5 rounded-full cursor-pointer hover:bg-sable/20 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={19} className="text-cacao dark:text-sable" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-olive text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setOpenCart(true)}
              className="relative p-2 rounded-full cursor-pointer bg-cacao text-ivoire dark:bg-gold dark:text-charbon hover:opacity-90 transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-olive text-white text-[10px] rounded-full flex items-center justify-center font-sans font-bold border-2 border-ivoire dark:border-zinc-950">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggler */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden p-1.5 rounded hover:bg-sable/20 dark:hover:bg-zinc-800 transition-colors text-cacao dark:text-sable"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full border-t border-sable/20 bg-[#F8F5F0] dark:bg-zinc-900 px-6 py-6 space-y-4 animate-slide-in shadow-xl">
          <div className="flex flex-col space-y-4 font-sans">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="text-left py-2 border-b border-sable/10 text-sm font-medium tracking-widest uppercase text-charbon hover:text-savane dark:text-ivoire dark:hover:text-gold transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setOpenQuiz(true);
              }}
              className="w-full text-center py-3 rounded-xl text-xs font-semibold tracking-widest uppercase text-[#F8F5F0] bg-olive hover:bg-cacao transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-gold" />
              {t.navRitual}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
