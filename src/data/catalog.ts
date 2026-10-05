import type { BannerAd, Deal, Merchant, Product } from './types';

export const products: Product[] = [
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2',
    category: 'Audio',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    reviews: 1240,
    description: 'Noise cancellation, spatial audio, and long battery life for daily work and travel.',
    tags: ['Wireless', 'Audio', 'Best Seller'],
    featured: true,
    sponsored: true,
    bestOfferId: 'amazon-airpods',
    offers: [
      {
        id: 'amazon-airpods',
        source: 'amazon',
        sourceLabel: 'Amazon',
        price: 849,
        currency: 'SAR',
        shipping: 'Free shipping',
        stock: 'In stock',
        href: 'https://www.amazon.com/s?k=airpods+pro+2&tag=globalmarket-20',
        isAffiliate: true,
        badge: 'Affiliate',
        notes: 'Commission eligible purchase'
      },
      {
        id: 'noon-airpods',
        source: 'noon',
        sourceLabel: 'Noon',
        price: 819,
        currency: 'SAR',
        shipping: '2-day delivery',
        stock: 'Low stock',
        href: 'https://www.noon.com/saudi-en/search?q=airpods%20pro%202&tag=globalmarket',
        isAffiliate: true,
        badge: 'Affiliate',
        notes: 'Eligible for commission'
      },
      {
        id: 'store-airpods',
        source: 'our-store',
        sourceLabel: 'Our Store',
        price: 799,
        currency: 'SAR',
        shipping: 'Same day shipping',
        stock: 'In stock',
        href: '#',
        isAffiliate: false,
        badge: 'Direct',
        notes: 'Fast local fulfillment'
      },
      {
        id: 'local-airpods',
        source: 'local',
        sourceLabel: 'Local Merchant',
        price: 785,
        currency: 'SAR',
        shipping: 'Pickup in Riyadh',
        stock: '3 left',
        href: '#',
        isAffiliate: false,
        badge: 'Local',
        notes: 'Same-day pickup available'
      }
    ]
  },
  {
    id: 'galaxy-watch-6',
    name: 'Galaxy Watch 6',
    category: 'Wearables',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
    reviews: 980,
    description: 'Fitness tracking, AMOLED display, and excellent health insights in a premium design.',
    tags: ['Smartwatch', 'Health', 'Popular'],
    featured: true,
    bestOfferId: 'store-watch',
    offers: [
      {
        id: 'store-watch',
        source: 'our-store',
        sourceLabel: 'Our Store',
        price: 899,
        currency: 'SAR',
        shipping: 'Free shipping',
        stock: 'In stock',
        href: '#',
        isAffiliate: false,
        badge: 'Direct',
        notes: 'Best direct price'
      },
      {
        id: 'amazon-watch',
        source: 'amazon',
        sourceLabel: 'Amazon',
        price: 929,
        currency: 'SAR',
        shipping: 'Prime arrival',
        stock: 'In stock',
        href: 'https://www.amazon.com/s?k=galaxy+watch+6&tag=globalmarket-20',
        isAffiliate: true,
        badge: 'Affiliate',
        notes: 'Commission eligible'
      },
      {
        id: 'local-watch',
        source: 'local',
        sourceLabel: 'Local Merchant',
        price: 910,
        currency: 'SAR',
        shipping: 'Pickup available',
        stock: 'In stock',
        href: '#',
        isAffiliate: false,
        badge: 'Local',
        notes: 'Same-day support'
      }
    ]
  },
  {
    id: 'air-fryer',
    name: 'Philips Air Fryer',
    category: 'Home',
    brand: 'Philips',
    image: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?auto=format&fit=crop&w=900&q=80',
    rating: 4.6,
    reviews: 640,
    description: 'Quick cooking with less oil and one-touch presets for everyday family meals.',
    tags: ['Kitchen', 'Smart', 'Healthy'],
    featured: false,
    bestOfferId: 'noon-airfryer',
    offers: [
      {
        id: 'noon-airfryer',
        source: 'noon',
        sourceLabel: 'Noon',
        price: 469,
        currency: 'SAR',
        shipping: '1-2 day delivery',
        stock: 'In stock',
        href: 'https://www.noon.com/saudi-en/search?q=philips%20air%20fryer&tag=globalmarket',
        isAffiliate: true,
        badge: 'Affiliate',
        notes: 'Commission eligible'
      },
      {
        id: 'local-airfryer',
        source: 'local',
        sourceLabel: 'Local Merchant',
        price: 449,
        currency: 'SAR',
        shipping: '2-4 day delivery',
        stock: 'Available',
        href: '#',
        isAffiliate: false,
        badge: 'Local',
        notes: 'Fulfilled from local warehouse'
      },
      {
        id: 'store-airfryer',
        source: 'our-store',
        sourceLabel: 'Our Store',
        price: 479,
        currency: 'SAR',
        shipping: 'Free shipping',
        stock: 'In stock',
        href: '#',
        isAffiliate: false,
        badge: 'Direct',
        notes: 'Includes warranty'
      }
    ]
  },
  {
    id: 'portable-power-bank',
    name: 'PowerCore 20K Portable Charger',
    category: 'Electronics',
    brand: 'Anker',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    reviews: 2720,
    description: 'High-capacity battery with fast charging for phones, tablets, and laptops.',
    tags: ['Power', 'Travel', 'Chargers'],
    featured: true,
    sponsored: true,
    bestOfferId: 'amazon-powerbank',
    offers: [
      {
        id: 'amazon-powerbank',
        source: 'amazon',
        sourceLabel: 'Amazon',
        price: 349,
        currency: 'SAR',
        shipping: 'Prime delivery',
        stock: 'In stock',
        href: 'https://www.amazon.com/s?k=anker+powercore+20k&tag=globalmarket-20',
        isAffiliate: true,
        badge: 'Affiliate',
        notes: 'Eligible commission'
      },
      {
        id: 'store-powerbank',
        source: 'our-store',
        sourceLabel: 'Our Store',
        price: 329,
        currency: 'SAR',
        shipping: 'Same-day dispatch',
        stock: 'In stock',
        href: '#',
        isAffiliate: false,
        badge: 'Direct',
        notes: 'Includes 12-month warranty'
      },
      {
        id: 'local-powerbank',
        source: 'local',
        sourceLabel: 'Local Merchant',
        price: 338,
        currency: 'SAR',
        shipping: 'Available in Jeddah',
        stock: '5 left',
        href: '#',
        isAffiliate: false,
        badge: 'Local',
        notes: 'Pickup available'
      }
    ]
  },
  {
    id: 'nike-running-shoes',
    name: 'Nike Running Shoes',
    category: 'Fashion',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
    reviews: 880,
    description: 'Responsive cushioning and breathable knit built for workouts and everyday movement.',
    tags: ['Footwear', 'Fitness', 'Trending'],
    featured: false,
    bestOfferId: 'local-shoes',
    offers: [
      {
        id: 'local-shoes',
        source: 'local',
        sourceLabel: 'Local Merchant',
        price: 559,
        currency: 'SAR',
        shipping: 'Pickup in Dubai',
        stock: 'Available',
        href: '#',
        isAffiliate: false,
        badge: 'Local',
        notes: 'Exclusive local bundle'
      },
      {
        id: 'amazon-shoes',
        source: 'amazon',
        sourceLabel: 'Amazon',
        price: 589,
        currency: 'SAR',
        shipping: 'Prime shipping',
        stock: 'In stock',
        href: 'https://www.amazon.com/s?k=nike+running+shoes&tag=globalmarket-20',
        isAffiliate: true,
        badge: 'Affiliate',
        notes: 'Commission eligible'
      },
      {
        id: 'store-shoes',
        source: 'our-store',
        sourceLabel: 'Our Store',
        price: 579,
        currency: 'SAR',
        shipping: 'Free shipping',
        stock: 'In stock',
        href: '#',
        isAffiliate: false,
        badge: 'Direct',
        notes: 'Limited return window'
      }
    ]
  },
  {
    id: 'hp-laptop-14',
    name: 'HP Laptop 14',
    category: 'Computers',
    brand: 'HP',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    rating: 4.5,
    reviews: 710,
    description: 'Thin laptop built for work, study, and everyday productivity with good battery life.',
    tags: ['Laptop', 'Work', 'Office'],
    featured: true,
    bestOfferId: 'store-laptop',
    offers: [
      {
        id: 'store-laptop',
        source: 'our-store',
        sourceLabel: 'Our Store',
        price: 2249,
        currency: 'SAR',
        shipping: 'Free shipping',
        stock: 'In stock',
        href: '#',
        isAffiliate: false,
        badge: 'Direct',
        notes: 'Includes warranty'
      },
      {
        id: 'amazon-laptop',
        source: 'amazon',
        sourceLabel: 'Amazon',
        price: 2399,
        currency: 'SAR',
        shipping: 'Prime eligible',
        stock: 'In stock',
        href: 'https://www.amazon.com/s?k=hp+laptop+14&tag=globalmarket-20',
        isAffiliate: true,
        badge: 'Affiliate',
        notes: 'Eligible commission'
      },
      {
        id: 'noon-laptop',
        source: 'noon',
        sourceLabel: 'Noon',
        price: 2309,
        currency: 'SAR',
        shipping: '2-day',
        stock: 'Low stock',
        href: 'https://www.noon.com/saudi-en/search?q=HP%20Laptop%2014&tag=globalmarket',
        isAffiliate: true,
        badge: 'Affiliate',
        notes: 'Limited stock'
      }
    ]
  }
];

export const featuredDeals: Deal[] = [
  {
    id: 'deal-amazon-1',
    title: 'Amazon daily deal',
    source: 'amazon',
    productName: 'AirPods Pro 2',
    price: 849,
    oldPrice: 969,
    badge: 'Hot Deal',
    href: 'https://www.amazon.com/s?k=airpods+pro+2&tag=globalmarket-20'
  },
  {
    id: 'deal-noon-1',
    title: 'Noon flash offer',
    source: 'noon',
    productName: 'Philips Air Fryer',
    price: 469,
    oldPrice: 579,
    badge: 'Flash Sale',
    href: 'https://www.noon.com/saudi-en/search?q=philips%20air%20fryer&tag=globalmarket'
  },
  {
    id: 'deal-amazon-2',
    title: 'Amazon pick of the week',
    source: 'amazon',
    productName: 'PowerCore 20K',
    price: 349,
    oldPrice: 429,
    badge: 'Top Rated',
    href: 'https://www.amazon.com/s?k=anker+powercore+20k&tag=globalmarket-20'
  }
];

export const bannerAds: BannerAd[] = [
  {
    id: 'banner-1',
    title: 'Exclusive seller campaign',
    subtitle: 'Boost your sales with a branded placement on top categories.',
    cta: 'Become a sponsor',
    href: '#',
    accent: 'linear-gradient(135deg, #2f6df6 0%, #2cc4d9 100%)'
  },
  {
    id: 'banner-2',
    title: 'Featured local deals',
    subtitle: 'Support merchants and show curated promotions in your city.',
    cta: 'View cities',
    href: '#',
    accent: 'linear-gradient(135deg, #ff8a00 0%, #ffd000 100%)'
  }
];

export const merchants: Merchant[] = [
  {
    id: 'm1',
    name: 'TechHub Riyadh',
    city: 'Riyadh',
    rating: 4.8,
    delivery: 'Same day',
    speciality: 'Electronics & gadgets'
  },
  {
    id: 'm2',
    name: 'HomeNest Jeddah',
    city: 'Jeddah',
    rating: 4.7,
    delivery: 'Next day',
    speciality: 'Home appliances'
  },
  {
    id: 'm3',
    name: 'StyleFlow Dubai',
    city: 'Dubai',
    rating: 4.9,
    delivery: '2-day',
    speciality: 'Fashion & accessories'
  }
];
