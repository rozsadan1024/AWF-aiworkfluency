'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Shield, Loader2, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Suspense } from 'react';

function CompleteSignupContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const router = useRouter();
  const { t } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [sessionValid, setSessionValid] = useState(false);

  // Verify the session is valid on mount
  useEffect(() => {
    if (!sessionId) {
      router.push('/');
      return;
    }
    // Simple check — the actual validation happens server-side
    setVerifying(false);
    setSessionValid(true);
  }, [sessionId, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/complete-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          password,
          full_name: fullName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      if (data.message === 'existing_user') {
        // Already had an account — just log them in
        router.push('/auth/login');
        return;
      }

      // New user created — log them in
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push('/onboarding');
      router.refresh();
    } catch (err) {
      console.error('Complete signup error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!sessionValid) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-brand-600" />
            <span className="text-2xl font-bold">{t.common_brand || 'AI Work Fluency'}</span>
          </div>

          {/* Success indicator */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">
                {t.complete_payment_success || 'Payment successful!'}
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            {t.complete_title || 'One last step — create your account'}
          </h1>
          <p className="text-gray-600 mt-1">
            {t.complete_subtitle || 'Set a password to access your Pro subscription.'}
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">{t.auth_signup_name || 'Full name'}</label>
              <input
                type="text"
                className="input-field"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                placeholder={t.auth_signup_name_placeholder || 'Your name'}
              />
            </div>
            <div>
              <label className="label">{t.auth_signup_password || 'Password'}</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder={t.complete_password_placeholder || 'Choose a password (min. 6 characters)'}
                minLength={6}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {t.complete_button || 'Create Account & Start'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CompleteSignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-600" /></div>}>
      <CompleteSignupContent />
    </Suspense>
  );
}
