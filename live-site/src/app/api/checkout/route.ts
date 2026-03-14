import { NextResponse } from 'next/server';
import { createServerSupabase, createServiceClient } from '@/lib/supabase/server';
import { stripe, TIER_PRICE_MAP } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { tier, locale } = await request.json();
    if (!tier || !TIER_PRICE_MAP[tier]) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;

    // Check if user is logged in
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // --- Authenticated flow: existing user upgrading ---
      const serviceClient = createServiceClient();
      const { data: profile } = await serviceClient
        .from('profiles')
        .select('stripe_customer_id, email, full_name')
        .eq('id', user.id)
        .single();

      let stripeCustomerId = profile?.stripe_customer_id;

      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: profile?.email || user.email,
          name: profile?.full_name || undefined,
          metadata: { user_id: user.id },
        });
        stripeCustomerId = customer.id;

        await serviceClient
          .from('profiles')
          .update({ stripe_customer_id: stripeCustomerId })
          .eq('id', user.id);
      }

      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        mode: 'subscription',
        line_items: [{ price: TIER_PRICE_MAP[tier], quantity: 1 }],
        success_url: `${origin}/dashboard?checkout=success`,
        cancel_url: `${origin}/dashboard?checkout=cancel`,
        // automatic_tax: { enabled: true }, // Enable after configuring Stripe Tax (head office address)
        metadata: { user_id: user.id, tier },
        subscription_data: {
          metadata: { user_id: user.id, tier },
        },
      });

      return NextResponse.json({ url: session.url });
    } else {
      // --- Guest flow: pay first, register after ---
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: TIER_PRICE_MAP[tier], quantity: 1 }],
        success_url: `${origin}/auth/complete-signup?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/${locale || 'en'}`,
        // automatic_tax: { enabled: true }, // Enable after configuring Stripe Tax (head office address)
        metadata: { tier, guest: 'true' },
        subscription_data: {
          metadata: { tier },
        },
      });

      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
