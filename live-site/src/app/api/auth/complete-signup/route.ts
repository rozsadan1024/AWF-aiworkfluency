import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { session_id, password, full_name } = await request.json();

    if (!session_id || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Retrieve Stripe session
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription'],
    });

    if (checkoutSession.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }

    const email = checkoutSession.customer_details?.email;
    if (!email) {
      return NextResponse.json({ error: 'No email found in checkout session' }, { status: 400 });
    }

    const stripeCustomerId = checkoutSession.customer as string;
    const tier = checkoutSession.metadata?.tier || 'basic';

    const serviceClient = createServiceClient();

    // Check if user with this email already exists
    const { data: existingUsers } = await serviceClient.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === email);

    if (existingUser) {
      // User exists — just update their profile with Stripe data
      await serviceClient
        .from('profiles')
        .update({
          stripe_customer_id: stripeCustomerId,
          subscription_tier: tier,
          subscription_expires_at: null,
        })
        .eq('id', existingUser.id);

      // Update Stripe customer metadata with user_id
      await stripe.customers.update(stripeCustomerId, {
        metadata: { user_id: existingUser.id },
      });

      return NextResponse.json({
        message: 'existing_user',
        email,
        redirect: '/auth/login',
      });
    }

    // Create new user with confirmed email (they proved ownership via Stripe)
    const { data: newUser, error: createError } = await serviceClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: full_name || '' },
    });

    if (createError) {
      console.error('User creation error:', createError);
      return NextResponse.json({ error: createError.message }, { status: 500 });
    }

    // Update profile with Stripe data and name
    await serviceClient
      .from('profiles')
      .update({
        stripe_customer_id: stripeCustomerId,
        subscription_tier: tier,
        subscription_expires_at: null,
        full_name: full_name || null,
      })
      .eq('id', newUser.user.id);

    // Update Stripe customer metadata with user_id
    await stripe.customers.update(stripeCustomerId, {
      metadata: { user_id: newUser.user.id },
    });

    // Also update subscription metadata
    const subscription = checkoutSession.subscription;
    if (subscription) {
      const subId = typeof subscription === 'string' ? subscription : subscription.id;
      await stripe.subscriptions.update(subId, {
        metadata: { user_id: newUser.user.id, tier },
      });
    }

    return NextResponse.json({
      message: 'user_created',
      email,
      redirect: '/onboarding',
    });
  } catch (error) {
    console.error('Complete signup error:', error);
    return NextResponse.json({ error: 'Failed to complete signup' }, { status: 500 });
  }
}
