import { createServerSupabase } from '@/lib/supabase/server';

export type SubscriptionTier = 'free' | 'basic' | 'pro';

const TIER_LEVELS: Record<SubscriptionTier, number> = {
  free: 0,
  basic: 1,
  pro: 2,
};

export async function getUserTier(): Promise<{ tier: SubscriptionTier; userId: string | null }> {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { tier: 'free', userId: null };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_tier')
    .eq('id', user.id)
    .single();

  return {
    tier: (profile?.subscription_tier as SubscriptionTier) || 'free',
    userId: user.id,
  };
}

export function hasTier(userTier: SubscriptionTier, requiredTier: SubscriptionTier): boolean {
  return TIER_LEVELS[userTier] >= TIER_LEVELS[requiredTier];
}

export async function requireTier(requiredTier: SubscriptionTier): Promise<
  { authorized: true; tier: SubscriptionTier; userId: string } |
  { authorized: false; tier: SubscriptionTier; userId: string | null }
> {
  const { tier, userId } = await getUserTier();

  if (!userId || !hasTier(tier, requiredTier)) {
    return { authorized: false, tier, userId };
  }

  return { authorized: true, tier, userId };
}
