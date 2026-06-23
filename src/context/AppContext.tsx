import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface AppContextType {
  lang: 'fr' | 'en';
  toggleLanguage: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  selectedDetailProduct: Product | null;
  setSelectedDetailProduct: (product: Product | null) => void;
  openCart: boolean;
  setOpenCart: (open: boolean) => void;
  openWishlist: boolean;
  setOpenWishlist: (open: boolean) => void;
  openQuiz: boolean;
  setOpenQuiz: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage getItem blocked or unavailable:', e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage setItem blocked or unavailable:', e);
    }
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Multilingual State (FR by default)
  const [lang, setLang] = useState<'fr' | 'en'>(() => {
    const saved = safeLocalStorage.getItem('amyes_lang');
    return (saved === 'en' || saved === 'fr') ? saved : 'fr';
  });

  // Dark Mode State (false by default for light luxury)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = safeLocalStorage.getItem('amyes_dark');
    return saved === 'true';
  });

  // Shopping Cart & Wishlist lists
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = safeLocalStorage.getItem('amyes_cart');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = safeLocalStorage.getItem('amyes_wishlist');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Filters, search & modals
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  
  // Interface overlay states
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openWishlist, setOpenWishlist] = useState<boolean>(false);
  const [openQuiz, setOpenQuiz] = useState<boolean>(false);

  // Sync to localStorages
  useEffect(() => {
    safeLocalStorage.setItem('amyes_lang', lang);
  }, [lang]);

  useEffect(() => {
    safeLocalStorage.setItem('amyes_dark', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    safeLocalStorage.setItem('amyes_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    safeLocalStorage.setItem('amyes_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Actions
  const toggleLanguage = () => {
    setLang((prev) => (prev === 'fr' ? 'en' : 'fr'));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }
      return [...prev, { product, quantity }];
    });
    setOpenCart(true); // Automatically slide open cart drawer for luxurious feedback
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        toggleLanguage,
        darkMode,
        toggleDarkMode,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        activeFilter,
        setActiveFilter,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        selectedDetailProduct,
        setSelectedDetailProduct,
        openCart,
        setOpenCart,
        openWishlist,
        setOpenWishlist,
        openQuiz,
        setOpenQuiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
