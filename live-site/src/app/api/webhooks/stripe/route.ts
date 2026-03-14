import { NextResponse } from 'next/server';
import { stripe, priceIdToTier } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const serviceClient = createServiceClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const tier = session.metadata?.tier;
        const customerId = session.customer as string;
        const isGuest = session.metadata?.guest === 'true';

        if (isGuest) {
          // Guest checkout — user will be created in /api/auth/complete-signup
          // Nothing to do here yet; the complete-signup endpoint handles everything
          console.log('Guest checkout completed, awaiting user registration:', customerId);
        } else if (userId && tier) {
          await serviceClient
            .from('profiles')
            .update({
              subscription_tier: tier,
              stripe_customer_id: customerId,
              subscription_expires_at: null,
            })
            .eq('id', userId);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const status = subscription.status;

        const { data: profile } = await serviceClient
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          if (status === 'active' || status === 'trialing') {
            // Determine tier from the subscription's price
            const priceId = subscription.items.data[0]?.price?.id;
            const tier = priceId ? priceIdToTier(priceId) : null;
            const periodEnd = subscription.items.data[0]?.current_period_end
              ? new Date(subscription.items.data[0].current_period_end * 1000).toISOString()
              : null;

            await serviceClient
              .from('profiles')
              .update({
                subscription_tier: tier || subscription.metadata?.tier || 'basic',
                subscription_expires_at: periodEnd,
              })
              .eq('id', profile.id);
          } else {
            // canceled, past_due, unpaid, etc.
            await serviceClient
              .from('profiles')
              .update({
                subscription_tier: 'free',
                subscription_expires_at: null,
              })
              .eq('id', profile.id);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await serviceClient
          .from('profiles')
          .update({
            subscription_tier: 'free',
            subscription_expires_at: null,
          })
          .eq('stripe_customer_id', customerId);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.warn('Payment failed for customer:', invoice.customer);
        break;
      }
    }
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
