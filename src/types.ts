export interface Product {
  id: string;
  name: string;
  category: 'visage' | 'corps' | 'bien-etre';
  subcategory: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
  volume: string;
  
  // Multilingual properties
  translation: {
    en: {
      name: string;
      tagline: string;
      description: string;
      ingredients: string;
      usage: string;
    };
    fr: {
      name: string;
      tagline: string;
      description: string;
      ingredients: string;
      usage: string;
    };
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  avatar: string;
  date: string;
  translation: {
    en: {
      comment: string;
      skinType: string;
    };
    fr: {
      comment: string;
      skinType: string;
    };
  };
}

export interface Article {
  id: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
  translation: {
    en: {
      title: string;
      excerpt: string;
      content: string;
    };
    fr: {
      title: string;
      excerpt: string;
      content: string;
    };
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}
