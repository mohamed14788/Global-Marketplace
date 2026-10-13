import { products as catalogProducts } from '../data/catalog';
import type { Product } from '../types';
import { getSupabaseClient } from './supabase';

export async function getMarketplaceProducts(): Promise<Product[]> {
  const client = getSupabaseClient();

  if (!client) {
    return catalogProducts;
  }

  try {
    const { data, error } = await client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return catalogProducts;
    }

    return data as Product[];
  } catch (error) {
    console.warn('Supabase catalog unavailable; using local demo data.', error);
    return catalogProducts;
  }
}
