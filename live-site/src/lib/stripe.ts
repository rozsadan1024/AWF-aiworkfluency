import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
    });
  }
  return _stripe;
}

// Keep backward-compatible export (lazy getter)
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as any)[prop];
  },
});

export const TIER_PRICE_MAP: Record<string, string> = {
  basic: process.env.STRIPE_PRICE_BASIC || '',
  pro: process.env.STRIPE_PRICE_PRO || '',
};

export function priceIdToTier(priceId: string): 'basic' | 'pro' | null {
  for (const [tier, id] of Object.entries(TIER_PRICE_MAP)) {
    if (id === priceId) return tier as 'basic' | 'pro';
  }
  return null;
}
