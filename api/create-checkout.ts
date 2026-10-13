import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

// This is a template Vercel Serverless function for creating a Stripe Checkout session.
// Deploy to Vercel and set the secret `STRIPE_SECRET_KEY` in the project environment variables.

const stripeSecret = process.env.STRIPE_SECRET_KEY ?? '';
const stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { items, successUrl, cancelUrl } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'No items provided' });
      return;
    }

    const line_items = items.map((it: any) => ({
      price_data: {
        currency: it.currency || 'sar',
        product_data: {
          name: it.name,
        },
        unit_amount: Math.round((it.unit_price || it.price || 0) * 100),
      },
      quantity: it.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl || (process.env.STRIPE_SUCCESS_URL ?? 'https://your-site.com/success'),
      cancel_url: cancelUrl || (process.env.STRIPE_CANCEL_URL ?? 'https://your-site.com/cancel'),
    });

    res.status(200).json({ id: session.id });
  } catch (err: any) {
    console.error('Stripe checkout error', err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
