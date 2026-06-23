import { Product, Review, Article } from './types';
// @ts-ignore
import sacredSerumGlowImg from './assets/images/sacred_serum_glow_1782227930236.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'serum-sacre',
    name: 'Sérum Sacré',
    category: 'visage',
    subcategory: 'Sérum Éclat',
    price: 49,
    rating: 4.9,
    reviewsCount: 124,
    image: sacredSerumGlowImg,
    isNew: false,
    isBestseller: true,
    volume: '30 ml',
    translation: {
      en: {
        name: 'Sacred Serum',
        tagline: 'Kalahari Melon & Marula Glow',
        description: 'An ultimate botanical nectar formulated with cold-pressed Kalahari Melon seeds and organic Marula oil. Rich in vitamins A, C, and E, it deeply regenerates, illuminates dull complexions, and fights signs of aging.',
        ingredients: 'Kalahari Melon Seed Oil, Marula Oil, Baobab Seed Oil, Neroli Essential Oil, Vitamin E.',
        usage: 'Apply 3-4 drops morning and evening onto face and neck, massaging gently in circular motions.'
      },
      fr: {
        name: 'Sérum Sacré',
        tagline: 'Glow au Melon du Kalahari & Marula',
        description: 'Un nectar botanique ultime formulé à base de graines de Melon du Kalahari pressées à froid et d\'huile de Marula bio. Riche en vitamines A, C et E, il régénère en profondeur, illumine le teint terne et repulpe la peau.',
        ingredients: 'Huile de pépins de Melon du Kalahari, Huile de Marula, Huile de Baobab, Huile essentielle de Néroli, Vitamine E.',
        usage: 'Appliquez 3 à 4 gouttes matin et soir sur le visage et le cou parfaitement nettoyés, en massant doucement.'
      }
    }
  },
  {
    id: 'baume-celeste',
    name: 'Baume Céleste',
    category: 'corps',
    subcategory: 'Beurre Corporel',
    price: 36,
    rating: 4.8,
    reviewsCount: 248,
    image: 'https://images.unsplash.com/photo-1590156546746-c22408ea4c01?auto=format&fit=crop&w=600&q=80',
    isNew: false,
    isBestseller: true,
    volume: '200 ml',
    translation: {
      en: {
        name: 'Celestial Balm',
        tagline: 'Wild Whipped Shea & Neroli',
        description: 'A luxurious organic raw African shea butter whipped with precious botanical oils. Its melt-on-skin texture provides 48h barrier protection, deep nourishment, and leaves a divine aroma of Neroli and Madagascar Vanilla.',
        ingredients: 'Wild Grade-A Raw Shea Butter, Sweet Almond Oil, Baobab Oil, Neroli Extract, Madagascar Vanilla Extract, Jojoba Oil.',
        usage: 'Warm a dollop between your palms and massage generously all over your body, focusing on dry areas.'
      },
      fr: {
        name: 'Baume Céleste',
        tagline: 'Beurre de Karité Fouetté & Néroli',
        description: 'Un beurre de karité sauvage brut de qualité supérieure, fouetté et infusé d\'huiles précieuses. Sa texture aérienne fond délicieusement sur la peau pour l\'hydrater en profondeur durant 48 heures, parfumant le corps de Néroli divin et Vanille de Madagascar.',
        ingredients: 'Beurre de Karité Sauvage Éco-responsable, Huile d\'Amande Douce, Huile de Baobab, Extrait de Néroli, Oléorésine de Vanille de Madagascar.',
        usage: 'Réchauffez une noisette de baume au creux des mains et appliquez sur tout le corps en mouvements circulaires.'
      }
    }
  },
  {
    id: 'rosee-hibiscus',
    name: 'Rosée d\'Hibiscus',
    category: 'visage',
    subcategory: 'Lotion Tonique',
    price: 28,
    rating: 4.7,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    isNew: true,
    isBestseller: false,
    volume: '150 ml',
    translation: {
      en: {
        name: 'Hibiscus Elixir',
        tagline: 'Revitalizing Botanical Glow Mist',
        description: 'A refreshing floral water concentrated with Hibiscus (Bissap) petals and Aloe Vera. Intensely hydrating, it tightens pores, balances PHP levels, and enhances natural skin radiance with its rich antioxidant profile.',
        ingredients: 'Organic Hibiscus Flower Hydrosol, Aloe Vera Leaf Juice, Rose Water, Witch Hazel, Vegetable Glycerin.',
        usage: 'Spray onto face and neck after cleansing, or at any time of day to immediately refresh and glow.'
      },
      fr: {
        name: 'Rosée d\'Hibiscus',
        tagline: 'Lotion Botanique Éclat Instantané',
        description: 'Une rosée parfumée et régénérante concentrée en pétales d\'Hibiscus (Bissap) et d\'Aloe Vera. Véritable trésor antioxydant, elle équilibre le pH, resserre les pores et redonne immédiatement éclat aux teints fatigués.',
        ingredients: 'Hydrolat de Fleurs d\'Hibiscus Bio, Jus d\'Aloe Vera, Hydrolat de Rose de Damas, Glycérine Végétale, Acide Hyaluronique Botanique.',
        usage: 'Vaporisez sur le visage et le cou préalablement nettoyés, ou tout au long de la journée pour un coup d\'éclat.'
      }
    }
  },
  {
    id: 'savon-noir-royal',
    name: 'Savon Noir Royal',
    category: 'corps',
    subcategory: 'Savon Nettoyant',
    price: 18,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1607006342411-1a90e63b6ecc?auto=format&fit=crop&w=600&q=80',
    isNew: false,
    isBestseller: true,
    volume: '150 g',
    translation: {
      en: {
        name: 'Royal Black Soap',
        tagline: 'Artisanal Purification & Raw Honey',
        description: 'Crafted using a generations-old recipe from Cocoa Pod ashes, Plantain skins, and raw Honey. Formulated with extra virgin Moringa oil to gently clean, treat acne, reduce dark spots, and soften your skin barrier.',
        ingredients: 'Saponified Shea Butter, Cocoa Pod Ash, Plantain Skin Ash, Raw Savannah Honey, Moringa Oil, Tea Tree Wood Oil.',
        usage: 'Lather between wet hands, massage onto damp face or body, then rinse thoroughly. Use 2-3 times a week.'
      },
      fr: {
        name: 'Savon Noir Royal',
        tagline: 'Purification Artisanale & Miel Brut',
        description: 'Fabriqué selon une recette ancestrale à partir de cendres de cabosses de Cacao, peaux de Banane plantain et Miel brut de savane. Enrichi en huile de Moringa pour nettoyer en profondeur, réguler le sébum et lisser le grain de peau.',
        ingredients: 'Beurre de Karité Saponifié, Cendres de Cabosses de Cacao, Cendres d\'épluchures de Plantain, Miel Sauvage Brut, Huile de Moringa, Huile essentielle de Tea Tree.',
        usage: 'Faites mousser entre vos mains humides, massez doucement sur le visage ou le corps, puis rincez à l\'eau tiède.'
      }
    }
  },
  {
    id: 'larme-desert',
    name: 'Larme du Désert',
    category: 'visage',
    subcategory: 'Crème Visage',
    price: 42,
    rating: 4.75,
    reviewsCount: 108,
    image: 'https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?auto=format&fit=crop&w=600&q=80',
    isNew: true,
    isBestseller: false,
    volume: '50 ml',
    translation: {
      en: {
        name: 'Desert Tear Cream',
        tagline: 'Baobab & Desert Date Rejuvenation',
        description: 'An advanced moisture barrier cream fusing legendary Baobab extract with Desert Date oil. Deeply hydrating, non-greasy, and protective against urban pollution. Perfect for morning radiance and evening therapy.',
        ingredients: 'Desert Date Leaf & Seed Extract, Baobab Fruit Extract, Hyaluronic acid, Aloe Vera juice, Frankincense Essential Oil.',
        usage: 'Apply a small amount to clean face and neck in upward strokes until completely absorbed.'
      },
      fr: {
        name: 'Larme du Désert',
        tagline: 'Crème Divine au Dattier du Désert & Baobab',
        description: 'Une crème hydratante fusionnant l\'huile sacrée de Dattier du Désert et la pulpe de Baobab. Elle scelle l\'hydratation cellulaire, protège contre la pollution urbaine et redonne de la densité aux peaux matures.',
        ingredients: 'Huile de Dattier du Désert, Extrait de Pulpe de Baobab, Hydrolat d\'Aloe Vera, Acide Hyaluronique, Huile essentielle d\'Encens (Frankincense).',
        usage: 'Appliquez une noisette de crème sur le visage propre matin et soir en effectuant de légers mouvements de lissage vers le haut.'
      }
    }
  },
  {
    id: 'sable-or- scrub',
    name: 'Sable d\'Or',
    category: 'corps',
    subcategory: 'Gommage Corporel',
    price: 29,
    rating: 4.85,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    isNew: false,
    isBestseller: false,
    volume: '250 g',
    translation: {
      en: {
        name: 'Golden Sand Scrub',
        tagline: 'Exfoliating Ivory Coast Sugar & Coffee',
        description: 'A sensory body scrub blending pure cane sugar, premium Robusta coffee beans, and nourishing Coconut oil. It gently sloughs off dead cells, improves circulation, targets cellulite, and leaves the skin with a satin gold glow.',
        ingredients: 'Unrefined Brown Sugar, Ground Ivory Coast Robusta Coffee, Coconut Oil, Sweet Almond Oil, Gold Micaceous Powder.',
        usage: 'Massage in circular motions over damp skin during your shower, paying special attention to rough spots, then rinse.'
      },
      fr: {
        name: 'Sable d\'Or',
        tagline: 'Gommage Exfoliant Sucre & Café de Côte d\'Ivoire',
        description: 'Un gommage corporel sensoriel alliant sucre de canne brut, grains fins de Café Robusta de Côte d\'Ivoire et huile de Coco vierge. Il élimine efficacement les peaux mortes, stimule la microcirculation et laisse un fini satiné doré.',
        ingredients: 'Sucre Roux Aromatique, Café Robusta Moulu, Huile de Coco, Huile d\'Amande Douce, Nacres Dorées Naturelles, Huile essentielle de Vanille.',
        usage: 'Appliquez sous la douche sur peau humide en massages circulaires toniques. Insistez sur les zones rebelles puis rincez.'
      }
    }
  },
  {
    id: 'elixir-savane',
    name: 'Élixir de la Savane',
    category: 'corps',
    subcategory: 'Huile Rituelle',
    price: 34,
    rating: 4.95,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    isNew: true,
    isBestseller: false,
    volume: '100 ml',
    translation: {
      en: {
        name: 'Savannah Elixir',
        tagline: 'Sacred Baobab & Jojoba Massage Oil',
        description: 'A luxurious dry oil formulated with legendary Baobab, Jojoba, and Evening Primrose botanical oils. Naturally scented with relaxing Lavender and Sweet Orange extracts to soothe both body and spirit.',
        ingredients: 'Cold-pressed Baobab Oil, Jojoba Oil, Argan Oil, Lavender Essential Oil, Sweet Orange Essential Oil.',
        usage: 'Warm in your hands and massage onto dry or slightly damp body for a divine, soothing self-care ritual.'
      },
      fr: {
        name: 'Élixir de la Savane',
        tagline: 'Huile Rituelle Sacrée au Baobab & Lavande',
        description: 'Une huile sèche divinement sensorielle formulée à base d\'huile pure de Baobab, de Jojoba et d\'Argan. Délicatement parfumée aux essences relaxantes de Lavande sauvage et d\'Orange douce pour apaiser le corps et l\'esprit.',
        ingredients: 'Huile de Baobab pure, Huile de Jojoba, Huile d\'Argan, Huile essentielle de Lavande Vraie, Huile essentielle d\'Orange Douce.',
        usage: 'Faites chauffer quelques pressions d\'huile au creux des mains et appliquez sur le corps après le bain ou en massage apaisant.'
      }
    }
  },
  {
    id: 'infusion-reine',
    name: 'Infusion de Reine',
    category: 'bien-etre',
    subcategory: 'Tisane Apaisante',
    price: 19,
    rating: 4.88,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=600&q=80',
    isNew: false,
    isBestseller: true,
    volume: '80 g',
    translation: {
      en: {
        name: 'Queen\'s Herbal Infusion',
        tagline: 'Wild Kinkéliba, Rooibos & Lemongrass',
        description: 'A traditional wellness recipe centered on the legendary West African Kinkéliba leaves, known as the "herb of long life". Paired with restorative Rooibos and fresh Lemongrass to detoxify, soothe digestion, and promote deep calm.',
        ingredients: 'Wild harvested Kinkéliba leaves, Organic South African Green Rooibos, Lemongrass stalk, Mint leaves.',
        usage: 'Incorporate 1 tablespoon of herbs in 95°C water. Let steep for 7-10 minutes. Enjoy hot or cold.'
      },
      fr: {
        name: 'Infusion de Reine',
        tagline: 'Kinkéliba Sauvage, Rooibos & Citronnelle',
        description: 'Une recette bien-être ancestrale centrée sur la feuille mythique d\'Afrique de l\'Ouest, le Kinkéliba ("tisane de longue vie"). Associé au Rooibos vert et à la Citronnelle fraîche pour purifier l\'organisme, favoriser la digestion et le calme mental.',
        ingredients: 'Feuilles séchées de Kinkéliba Sauvage, Rooibos Vert Bio d\'Afrique du Sud, Citronnelle Odorante, Feuilles de Menthe Douce.',
        usage: 'Ajoutez une cuillère à soupe du mélange dans une eau frémissante (95°C). Laissez infuser 7 à 10 minutes. Dégustez chaud ou glacé.'
      }
    }
  },
  {
    id: 'poudre-baobab',
    name: 'Poudre Sacrée de Baobab & Moringa',
    category: 'bien-etre',
    subcategory: 'Super-aliment',
    price: 24,
    rating: 4.79,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1340453319-5ce911bafcde?auto=format&fit=crop&w=600&q=80',
    isNew: false,
    isBestseller: false,
    volume: '150 g',
    translation: {
      en: {
        name: 'Sacred Baobab & Moringa Powder',
        tagline: 'Supreme Vitality & Detox Blend',
        description: 'An advanced raw superfood powder fusing organic Baobab fruit pulp (packed with Vitamin C and fibers) and Moringa leaves (iron, calcium, and amino acids). It strengthens the immune system and energizes the body.',
        ingredients: '100% Organic Raw Baobab Fruit Pulp Powder, 100% Organic Moringa Leaf Powder.',
        usage: 'Mix 1 teaspoon daily into your breakfast smoothies, organic fruit juices, yogurt, or oatmeal.'
      },
      fr: {
        name: 'Poudre Sacrée de Baobab & Moringa',
        tagline: 'Synergie Super-aliment Vitalité & Antioxydant',
        description: 'Un complexe brut fusionnant la pulpe de fruit de Baobab bio (surconcentrée en Vitamine C et fibres) et les feuilles de Moringa (antioxydants, fer, calcium). Booste le système immunitaire et apporte une énergie saine au quotidien.',
        ingredients: 'Pulpe de Baobab sauvage pur bio en poudre, Feuilles de Moringa Oleifera bio en poudre.',
        usage: 'Intégrez 1 à 2 cuillères à café par jour dans vos jus de fruits, smoothies, yaourts ou bols de céréales.'
      }
    }
  },
  {
    id: 'brume-sommeil',
    name: 'Brume de Sommeil',
    category: 'bien-etre',
    subcategory: 'Brume d\'Armoire & Oreiller',
    price: 22,
    rating: 4.82,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1519735797-402baa75a794?auto=format&fit=crop&w=600&q=80',
    isNew: true,
    isBestseller: false,
    volume: '100 ml',
    translation: {
      en: {
        name: 'Deep Sleep Pillow Mist',
        tagline: 'Eucalyptus, Lavandin & Sweet Chamomile',
        description: 'An exquisite wellness aromatherapic spray to release daily physical and mental tension. Sprayed in the bedroom and over linens, it relaxes the nervous system and cradles you into peaceful, restorative sleep.',
        ingredients: 'Organic Distilled Water, Eucalyptus Globulus Oil, Lavandin Super Oil, Roman Chamomile Oil, Vetiver Root Oil.',
        usage: 'Spritz lightly over pillows, linens, and curtains 10 minutes before bedtime to create a serene sanctuary.'
      },
      fr: {
        name: 'Brume de Sommeil',
        tagline: 'Relaxation Profonde Eucalyptus & Camomille',
        description: 'Une brume d\'oreiller aromathérapeutique précieuse conçue pour relâcher les tensions physiques et mentales. Vaporisée dans l\'atmosphère ou sur le linge de lit, elle apaise le système nerveux pour un sommeil réparateur.',
        ingredients: 'Eau distillée florale, Huile essentielle d\'Eucalyptus sauvage, Huile essentielle de Lavande fine, Huile essentielle de Camomille romaine, Huile de Vétiver.',
        usage: 'Vaporisez 3 à 4 pressions sur vos draps et oreillers 10 minutes avant de vous coucher pour créer un cocon de sérénité.'
      }
    }
  },
  {
    id: 'energie-sauvage',
    name: 'Tisane Énergie Sauvage',
    category: 'bien-etre',
    subcategory: 'Infusion Énergisante',
    price: 19,
    rating: 4.84,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=600&q=80',
    isNew: true,
    isBestseller: false,
    volume: '80 g',
    translation: {
      en: {
        name: 'Wild Energy Tisane',
        tagline: 'Invigorating Ginger, Hibiscus & Lemon',
        description: 'A vibrant herbal blend that sparks pure physical and mental vitality. Powered by rich Hibiscus petals and organic African ginger roots, this caffeine-free infusion stimulates natural immunity and gives long-lasting daily energy.',
        ingredients: 'Organic Hibiscus petals, African Ginger slices, Dried lemon peels, Lemongrass.',
        usage: 'Brew 1-2 teaspoons per cup in 95°C water for 5-8 minutes. Deliciously energizing served hot in the morning or iced in summer.'
      },
      fr: {
        name: 'Tisane Énergie Sauvage',
        tagline: 'Tonique Éclatant Gingembre, Hibiscus & Citron',
        description: 'Une infusion énergisante sans théine et intensément fruitée. Grâce aux pétales d\'Hibiscus et aux racines de Gingembre d\'Afrique, ce rituel stimule l\'immunité naturelle et réveille l\'éclat physique et intellectuel sans exciter.',
        ingredients: 'Fleurs d\'Hibiscus entières secouées, Racines de Gingembre africain bio, Écorces de Citron séchées, Kinkéliba.',
        usage: 'Laissez infuser une cuillère à soupe du mélange dans une eau frémissante durant 5 à 8 minutes. Savourez chaud le matin ou bien glacé avec une rondelle de citron.'
      }
    }
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Awa Diop',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=150&q=80',
    date: '2026-06-15',
    translation: {
      en: {
        comment: 'The Sacred Serum completely healed my hyperpigmentation in just three weeks. My skin has never been so radiant! The scent is divine, simple and therapeutic.',
        skinType: 'Skin Type: Normal to Dry'
      },
      fr: {
        comment: 'Le Sérum Sacré a complètement transformé ma peau en trois semaines. Plus aucune tache d\'hyperpigmentation, mon teint est lumineux et unifié. L\'odeur est divine, naturelle et envoûtante.',
        skinType: 'Type de peau : Normale à Sèche'
      }
    }
  },
  {
    id: 'rev-2',
    author: 'Inès Touré',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80',
    date: '2026-06-10',
    translation: {
      en: {
        comment: 'Celestial Balm has a magical whipped texture. It immediately melts on touch. I love using it after my daily warm bath. The nerf scent relaxes me entirely.',
        skinType: 'Skin Type: Dry & Sensitive'
      },
      fr: {
        comment: 'Le Baume Céleste est une merveille absolue. Sa mousse fouettée fond immédiatement sur le corps. C\'est devenu mon rituel du soir indispensable après la douche. Peau nourrie au maximum.',
        skinType: 'Type de peau : Très Sèche & Sensible'
      }
    }
  },
  {
    id: 'rev-3',
    author: 'Marc N\'Diaye',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: '2026-06-02',
    translation: {
      en: {
        comment: 'Finally a natural soap that doesn\'t strip my face! The Royal Black Soap deeply purifies while keeping external hydration. Highly recommend to everyone.',
        skinType: 'Skin Type: Combination (Acne prone)'
      },
      fr: {
        comment: 'Enfin un savon noir artisanal qui n\'assèche pas du tout ma peau ! Le Savon Noir Royal régule le sébum à la perfection et prévient l\'apparition de petites imperfections.',
        skinType: 'Type de peau : Mixte à Grasse'
      }
    }
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    category: 'Traditions',
    readTime: '5 min',
    date: '2026-06-18',
    image: 'https://images.unsplash.com/photo-1533038590840-1cde6b66b706?auto=format&fit=crop&w=600&q=80',
    author: 'Amina Amyes',
    translation: {
      en: {
        title: 'Secrets of Sacred African Plants: Kinkéliba and Moringa',
        excerpt: 'Discover the ancient virtues of wild African flora and learn why ancestors refer to them as "herbs of continuous life and strength".',
        content: 'For centuries, African botanicals have served as the core of holistic beauty and health secrets. Kinkéliba, native to West Africa dry plains, is extremely rich in catechins and polyphenols, facilitating cell detox and skin radiance. Moringa, called the "never-die tree", holds all 8 essential amino acids, bringing exceptional food values to the cells. Incorporating these plants into your daily wellness rituals helps balance internal body systems and restores high glowing skin resilience.'
      },
      fr: {
        title: 'Les Secrets des Plantes Sacrées d\'Afrique : Le Kinkéliba et le Moringa',
        excerpt: 'Découvrez les vertus millénaires de la flore sauvage africaine et pourquoi nos ancêtres les considéraient comme des trésors de vie éternelle.',
        content: 'Depuis des siècles, la flore africaine offre des remèdes exceptionnels pour le bien-être holistique. Le Kinkéliba, originaire du Sahel, est un détoxifiant puissant qui purifie le foie et clarifie le teint de l\'intérieur. Le Moringa, plante aux mille vertus, apporte une dose colossale de vitamines et de minéraux essentiels à la barrière cutanée. Adopter ces deux plantes emblématiques, c\'est renouer avec un héritage de santé naturelle et vibrante.'
      }
    }
  },
  {
    id: 'art-2',
    category: 'Rituels',
    readTime: '4 min',
    date: '2026-06-12',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    author: 'Sophie Diallo',
    translation: {
      en: {
        title: 'The Perfect Three-Step Skincare Ritual for Glowing Skin',
        excerpt: 'Achieve ultimate dermal equilibrium by layering cleansers, floral tonics, and cold-pressed seed oils tailored to contemporary lives.',
        content: 'A perfect skincare ritual doesn\'t require dozens of products, but rather the right active nutrients. First, Purify with the Royal Black Soap to establish a fresh dermal landscape. Second, Balance and Illuminate with our freshly pressed Hibiscus Mist to introduce hydration and antioxidants. Third, Nourish and Seal with the Kalahari Sacred Serum. This ritual mimics traditional practices of restoring natural glow through simplistic skin nourishment.'
      },
      fr: {
        title: 'Le Rituel Beauté en 3 Étapes pour une Peau Naturellement Lumineuse',
        excerpt: 'Une routine simplifiée et hautement efficace pour nourrir la barrière cutanée et révéler un fini satiné sain.',
        content: 'Nul besoin d\'accumuler des dizaines de cosmétiques chimiques : le secret réside dans le minimalisme botanique. Étape 1 : Purifier en douceur avec le Savon Noir Royal pour libérer la peau des impuretés accumulées. Étape 2 : Tonifier et revitaliser avec la Rosée d\'Hibiscus, gorgée de vitamine C naturelle. Étape 3 : Nourrir et fortifier avec le Sérum Sacré d\'Afrique. Trois gestes ancestraux réinventés pour la femme moderne.'
      }
    }
  },
  {
    id: 'art-3',
    category: 'Karité',
    readTime: '6 min',
    date: '2026-06-05',
    image: 'https://images.unsplash.com/photo-1489440543286-a69330151c0b?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. Chloé Mendy',
    translation: {
      en: {
        title: 'Shea Butter: Gold of African Women',
        excerpt: 'Raw shea butter is an incredible skin doctor. Understand its sustainable production cycle and its immense healing and protective benefits.',
        content: 'Produced exclusively in African countries, Shea Butter (often called "Women\'s Gold") has been used for age-old skin relief. Cold pressed by co-operatives, raw shea butter has unrivaled levels of fatty acids and cinnamic esters that heal scars, relieve eczema, and act as a powerful barrier against solar and environmental dehydration. Our Celestial Whipped Balm honors this heritage with high-grade, fair-trade shea collected in total harmony with West African ecosystems.'
      },
      fr: {
        title: 'Le Karité : L\'Or Vert Sacré des Femmes d\'Afrique',
        excerpt: 'Véritable médecin de la peau, le Beurre de Karité brut est légendaire. Découvrez les secrets de sa récolte durable et ses propriétés cicatrisantes.',
        content: 'Surnommé "l\'Or des Femmes", le beurre de karité brut est l\'allié absolu de la souplesse corporelle. Utilisé dès l\'enfance pour masser et protéger la peau du soleil et du vent de l\'Harmattan, il contient des phytostérols cicatrisants et des lipides nobles ultra-nourrissants. Chez AMYES RITUALS, nous sourçons notre karité sauvage auprès de coopératives de femmes au Bénin et au Burkina Faso, garantissant une juste rémunération et un produit brut d\'une pureté médicinale.'
      }
    }
  }
];
