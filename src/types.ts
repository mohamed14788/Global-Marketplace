export type OfferSource = 'our-store' | 'local' | 'amazon' | 'noon';

export type Offer = {
  id: string;
  source: OfferSource;
  sourceLabel: string;
  price: number;
  currency: 'SAR' | 'USD';
  shipping: string;
  stock: string;
  href: string;
  isAffiliate: boolean;
  badge?: string;
  notes?: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
  featured: boolean;
  sponsored?: boolean;
  offers: Offer[];
  bestOfferId: string;
};

export type Deal = {
  id: string;
  title: string;
  source: 'amazon' | 'noon';
  productName: string;
  price: number;
  oldPrice?: number;
  badge: string;
  href: string;
};

export type BannerAd = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  accent: string;
};

export type Merchant = {
  id: string;
  name: string;
  city: string;
  rating: number;
  delivery: string;
  speciality: string;
};
