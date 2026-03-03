'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.session) {
        router.push('/onboarding');
        router.refresh();
      } else {
        setEmailSent(true);
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      const errorMsg = err?.message || err?.error_description || String(err) || 'Unknown error';
      setError('Error: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-brand-600" />
            <span className="text-2xl font-bold">{t.common_brand}</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{t.auth_signup_title}</h1>
          <p className="text-gray-600 mt-1">{t.auth_signup_subtitle}</p>
        </div>

        <div className="card">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="label">{t.auth_signup_name}</label>
              <input
                type="text"
                className="input-field"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                placeholder={t.auth_signup_name_placeholder}
              />
            </div>
            <div>
              <label className="label">{t.auth_signup_email}</label>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder={t.auth_signup_email_placeholder}
              />
            </div>
            <div>
              <label className="label">{t.auth_signup_password}</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder={t.auth_signup_password_placeholder}
                minLength={6}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
            )}

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {t.auth_signup_button}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {t.auth_signup_has_account}{' '}
            <Link href="/auth/login" className="text-brand-600 font-medium hover:underline">{t.auth_signup_login_link}</Link>
          </div>
        </div>

        {emailSent && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <h3 className="font-bold text-green-800 mb-1">{t.auth_signup_email_sent_title}</h3>
            <p className="text-green-700 text-sm">
              {t.auth_signup_email_sent_desc} <strong>{email}</strong>.<br />
              {t.auth_signup_email_sent_action}
            </p>
            <p className="text-green-600 text-xs mt-3">{t.auth_signup_email_sent_note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
