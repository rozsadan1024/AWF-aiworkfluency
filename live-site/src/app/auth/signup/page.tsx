'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

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
      setLoading(false);
    } else if (data.session) {
      // Email confirmation disabled — session created immediately
      router.push('/onboarding');
      router.refresh();
    } else {
      // Email confirmation required — show check-your-email message
      setEmailSent(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-brand-600" />
            <span className="text-2xl font-bold">AI Work Fluency</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-600 mt-1">Start practicing AI skills for your job</p>
        </div>

        <div className="card">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="label">Full name</label>
              <input
                type="text"
                className="input-field"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                placeholder="Anna Kovács"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="At least 6 characters"
                minLength={6}
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
            )}

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-600 font-medium hover:underline">Log in</Link>
          </div>
        </div>

        {emailSent && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">📬</div>
            <h3 className="font-bold text-green-800 mb-1">Check your email</h3>
            <p className="text-green-700 text-sm">
              We sent a confirmation link to <strong>{email}</strong>.<br />
              Click it to activate your account and continue to onboarding.
            </p>
            <p className="text-green-600 text-xs mt-3">Your assessment results are saved and will be linked to your account.</p>
          </div>
        )}
      </div>
    </div>
  );
}
