'use client';

import { useState, useCallback, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, LogOut, ArrowLeft, UserPlus, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function InviteMembersPage() {
  const [emails, setEmails] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [result, setResult] = useState<{ added: number; duplicates: number; invalid: number } | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  const init = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/auth/login'); return; }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'leader') {
      router.push('/dashboard');
      return;
    }

    const { data: team } = await supabase
      .from('teams')
      .select('id')
      .eq('leader_id', user.id)
      .single();

    if (!team) {
      setError(t.team_error_no_team);
      setLoading(false);
      return;
    }

    setTeamId(team.id);
    setLoading(false);
  }, [router, t]);

  useEffect(() => { init(); }, [init]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!teamId || !emails.trim()) return;

    setSubmitting(true);
    setError('');
    setResult(null);

    const supabase = createClient();
    const emailList = emails
      .split(/[,\n]+/)
      .map(e => e.trim().toLowerCase())
      .filter(e => e.length > 0);

    const validEmails: string[] = [];
    let invalid = 0;
    for (const email of emailList) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        validEmails.push(email);
      } else {
        invalid++;
      }
    }

    const { data: existing } = await supabase
      .from('team_members')
      .select('invited_email')
      .eq('team_id', teamId);

    const existingEmails = new Set((existing || []).map(m => m.invited_email?.toLowerCase()));
    const newEmails = validEmails.filter(e => !existingEmails.has(e));
    const duplicates = validEmails.length - newEmails.length;

    if (newEmails.length > 0) {
      const { data: existingProfiles } = await supabase
        .from('profiles')
        .select('id, email')
        .in('email', newEmails);

      const profileMap = new Map((existingProfiles || []).map(p => [p.email.toLowerCase(), p.id]));

      const rows = newEmails.map(email => ({
        team_id: teamId,
        invited_email: email,
        user_id: profileMap.get(email) || null,
        status: profileMap.has(email) ? 'active' : 'invited',
        joined_at: profileMap.has(email) ? new Date().toISOString() : null,
      }));

      const { error: insertError } = await supabase
        .from('team_members')
        .insert(rows);

      if (insertError) {
        setError(t.team_inv_error_failed);
        setSubmitting(false);
        return;
      }
    }

    setResult({ added: newEmails.length, duplicates, invalid });
    setEmails('');
    setSubmitting(false);
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-600" />
            <span className="text-xl font-bold">{t.common_brand}</span>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600" title={t.common_logout}>
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/team" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> {t.team_inv_back}
        </Link>

        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="w-6 h-6 text-brand-600" />
            <h1 className="text-xl font-bold text-gray-900">{t.team_inv_title}</h1>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            {t.team_inv_desc}
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {result && (
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">{t.team_inv_processed}</span>
              </div>
              <ul className="ml-6 space-y-0.5">
                {result.added > 0 && <li>{result.added} {t.team_inv_added}</li>}
                {result.duplicates > 0 && <li>{result.duplicates} {t.team_inv_duplicates}</li>}
                {result.invalid > 0 && <li>{result.invalid} {t.team_inv_invalid}</li>}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.team_inv_email_label}
            </label>
            <textarea
              value={emails}
              onChange={e => setEmails(e.target.value)}
              placeholder={t.team_inv_email_placeholder}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm min-h-[120px] focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-y"
            />
            <p className="text-xs text-gray-500 mt-1 mb-4">
              {t.team_inv_email_hint}
            </p>

            <button
              type="submit"
              disabled={submitting || !emails.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> {t.team_inv_processing}
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> {t.team_inv_send}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
