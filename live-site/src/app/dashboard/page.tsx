'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, LogOut, Loader2, Target, Zap, ChevronRight, Flame, Award } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function DashboardHub() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [qpProgress, setQpProgress] = useState<any>(null);
  const [peProgress, setPeProgress] = useState<any>(null);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/auth/login'); return; }

      const [profileRes, progressRes, qpRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('user_progress').select('*').eq('user_id', user.id).single(),
        fetch('/api/quick-pill/progress'),
      ]);

      setProfile(profileRes.data);
      setPeProgress(progressRes.data);
      if (qpRes.ok) {
        const data = await qpRes.json();
        setQpProgress(data);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const peTasks = peProgress?.tasks_completed || 0;
  const peAvg = peProgress?.average_score ? Math.round(peProgress.average_score) : 0;
  const peLevel = peProgress?.level || 'novice';
  const qpPills = qpProgress?.progress?.pills_completed || 0;
  const qpTotal = qpProgress?.totalPills || 15;
  const qpStreak = qpProgress?.progress?.streak_days || 0;
  const qpLevel = qpProgress?.progress?.level || 'curious';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-gray-900">AIProof</span>
          </div>
          <div className="flex items-center gap-3">
            {profile?.subscription_tier !== 'free' && (
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                Pro
              </span>
            )}
            <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {profile?.full_name ? `Welcome back, ${profile.full_name.split(' ')[0]}` : 'Welcome back'}
          </h1>
          <p className="text-gray-500">What would you like to work on today?</p>
        </div>

        {/* Module cards */}
        <div className="grid gap-5">
          {/* Prompt Empowerment */}
          <Link href="/dashboard/empowerment" className="group block">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Prompt Empowerment</h2>
                    <p className="text-sm text-gray-500 mb-3">Full AI workflow exercises personalized to your role. Practice real tasks, get expert-level feedback.</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        {peTasks} tasks completed
                      </span>
                      {peAvg > 0 && (
                        <span>Avg: {peAvg}/100</span>
                      )}
                      <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">15-45 min</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 transition mt-1" />
              </div>
            </div>
          </Link>

          {/* Quick Pill */}
          <Link href="/quick-pill" className="group block">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Quick Pill</h2>
                    <p className="text-sm text-gray-500 mb-3">5-minute micro-learning. One AI concept, one hands-on task, instant feedback. Learn something you can use today.</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        {qpPills}/{qpTotal} pills
                      </span>
                      {qpStreak > 0 && (
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-orange-500" />
                          {qpStreak}d streak
                        </span>
                      )}
                      <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">5 min</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-600 transition mt-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* Future modules placeholder - extensible */}
      </main>
    </div>
  );
}
