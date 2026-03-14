'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, LogOut, Users, UserPlus, BarChart3, Award, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface TeamMemberRow {
  id: string;
  invited_email: string | null;
  status: string;
  joined_at: string | null;
  user_id: string | null;
  profile?: {
    full_name: string | null;
    email: string;
  };
  progress?: {
    tasks_completed: number;
    average_score: number;
    level: string;
    last_activity_at: string | null;
    streak_days: number;
  };
}

export default function TeamDashboardPage() {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState<TeamMemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  const loadData = useCallback(async () => {
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
      .select('*')
      .eq('leader_id', user.id)
      .single();

    if (!team) {
      setError(t.team_error_no_team);
      setLoading(false);
      return;
    }

    setTeamName(team.name);

    const { data: teamMembers } = await supabase
      .from('team_members')
      .select('*')
      .eq('team_id', team.id)
      .order('created_at', { ascending: true });

    if (!teamMembers) {
      setMembers([]);
      setLoading(false);
      return;
    }

    const enrichedMembers: TeamMemberRow[] = [];
    for (const m of teamMembers) {
      const row: TeamMemberRow = { ...m };
      if (m.user_id && m.status === 'active') {
        const [profileRes, progressRes] = await Promise.all([
          supabase.from('profiles').select('full_name, email').eq('id', m.user_id).single(),
          supabase.from('user_progress').select('tasks_completed, average_score, level, last_activity_at, streak_days').eq('user_id', m.user_id).single(),
        ]);
        if (profileRes.data) row.profile = profileRes.data;
        if (progressRes.data) row.progress = progressRes.data;
      }
      enrichedMembers.push(row);
    }

    setMembers(enrichedMembers);
    setLoading(false);
  }, [router, t]);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
          <p className="text-gray-600">{t.team_loading}</p>
        </div>
      </div>
    );
  }

  const activeMembers = members.filter(m => m.status === 'active');
  const invitedMembers = members.filter(m => m.status === 'invited');
  const avgTeamScore = activeMembers.length > 0
    ? Math.round(activeMembers.reduce((sum, m) => sum + (m.progress?.average_score || 0), 0) / activeMembers.length)
    : 0;
  const totalTasks = activeMembers.reduce((sum, m) => sum + (m.progress?.tasks_completed || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-brand-600" />
              <span className="text-xl font-bold">{t.common_brand}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">{t.team_nav_tasks}</Link>
              <span className="text-gray-300">|</span>
              <span className="text-brand-600 font-medium">{t.team_nav_team}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600" title={t.common_logout}>
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{teamName}</h1>
            <p className="text-gray-600 mt-1">{members.length} {t.team_members_count} ({activeMembers.length} {t.team_active}, {invitedMembers.length} {t.team_invited})</p>
          </div>
          <Link href="/team/invite" className="btn-primary flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> {t.team_invite_button}
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">{error}</div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <Users className="w-6 h-6 text-brand-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-900">{activeMembers.length}</div>
            <div className="text-xs text-gray-500">{t.team_stat_active}</div>
          </div>
          <div className="card text-center">
            <BarChart3 className="w-6 h-6 text-brand-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-900">{avgTeamScore}</div>
            <div className="text-xs text-gray-500">{t.team_stat_avg_score}</div>
          </div>
          <div className="card text-center">
            <Award className="w-6 h-6 text-brand-600 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
            <div className="text-xs text-gray-500">{t.team_stat_tasks_done}</div>
          </div>
        </div>

        {members.length === 0 ? (
          <div className="card text-center py-12">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.team_no_members}</h3>
            <p className="text-gray-600 mb-4">{t.team_no_members_desc}</p>
            <Link href="/team/invite" className="btn-primary inline-flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> {t.team_invite_button}
            </Link>
          </div>
        ) : (
          <div className="card overflow-hidden p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.team_th_name}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.team_th_status}</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.team_th_tasks}</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.team_th_score}</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.team_th_level}</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.team_th_last_active}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {m.profile?.full_name || m.invited_email || t.team_unknown}
                        </p>
                        {m.profile?.email && (
                          <p className="text-xs text-gray-500">{m.profile.email}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        m.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {m.status === 'active' ? t.team_status_active : t.team_status_invited}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">
                      {m.progress?.tasks_completed ?? '-'}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">
                      {m.progress?.average_score ? Math.round(m.progress.average_score) : '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {m.progress?.level ? (
                        <span className="text-xs font-medium capitalize text-gray-700">
                          {m.progress.level}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-gray-500">
                      {m.progress?.last_activity_at
                        ? new Date(m.progress.last_activity_at).toLocaleDateString()
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
