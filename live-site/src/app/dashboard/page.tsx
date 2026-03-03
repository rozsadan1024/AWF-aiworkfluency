'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Task, UserProgress, Profile } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, LogOut, Clock, Zap, BarChart3, Award, Loader2, RefreshCw, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-red-100 text-red-700',
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [genCount, setGenCount] = useState(0);
  const router = useRouter();
  const { t } = useLanguage();
  const generatingRef = useRef(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const genStartRef = useRef<string | null>(null);

  const difficultyLabel = (d: string) =>
    t[`difficulty_${d}`] || d;

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/auth/login'); return; }

    const [profileRes, tasksRes, progressRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('tasks').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('user_progress').select('*').eq('user_id', user.id).single(),
    ]);

    if (profileRes.data && !profileRes.data.onboarding_completed) {
      router.push('/onboarding');
      return;
    }

    setProfile(profileRes.data);
    setTasks(tasksRes.data || []);
    setProgress(progressRes.data);

    // Auto-generate tasks if none exist — set generating BEFORE loading=false to avoid flash of empty state
    if (!tasksRes.data?.length && !generatingRef.current) {
      setGenerating(true);
      setLoading(false);
      generateTasks();
    } else {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { loadData(); }, [loadData]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => { stopPolling(); };
  }, [stopPolling]);

  async function generateTasks() {
    // Guard against double generation
    if (generatingRef.current) return;
    generatingRef.current = true;
    setGenerating(true);
    setGenCount(0);

    const startTime = new Date().toISOString();
    genStartRef.current = startTime;

    // Fire-and-forget: start API call
    const apiPromise = fetch("/api/generate-tasks", { method: "POST" })
      .then(async (res) => {
        if (!res.ok) console.error("Task generation failed:", await res.text());
      })
      .catch((e) => console.error("Task generation error:", e))
      .finally(() => {
        // API done — stop polling after a final check
        setTimeout(() => {
          stopPolling();
          pollForTasks(startTime, true); // one final poll
        }, 1000);
      });

    // Poll Supabase every 3s for new tasks
    pollRef.current = setInterval(() => {
      pollForTasks(startTime, false);
    }, 3000);

    // Timeout: stop after 180s
    setTimeout(() => {
      stopPolling();
      if (generatingRef.current) {
        generatingRef.current = false;
        setGenerating(false);
      }
    }, 180000);

    await apiPromise;
  }

  async function pollForTasks(startTime: string, isFinal: boolean) {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: newTasks } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', startTime)
        .order('created_at', { ascending: true });

      if (newTasks && newTasks.length > 0) {
        setGenCount(newTasks.length);

        // Merge new tasks into existing list (avoiding duplicates)
        setTasks(prev => {
          const existingIds = new Set(prev.map(t => t.id));
          const toAdd = newTasks.filter(t => !existingIds.has(t.id));
          if (toAdd.length === 0) return prev;
          return [...toAdd, ...prev];
        });

        if (newTasks.length >= 3 || isFinal) {
          stopPolling();
          generatingRef.current = false;
          setGenerating(false);
        }
      } else if (isFinal) {
        generatingRef.current = false;
        setGenerating(false);
      }
    } catch (e) {
      console.error('Poll error:', e);
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  function handleNewTasks() {
    if (!generating) {
      generatingRef.current = false;
      generateTasks();
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
          <p className="text-gray-600">{t.auth_loading_dashboard}</p>
        </div>
      </div>
    );
  }

  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress');
  const completedTasks = tasks.filter(t => t.status === 'evaluated');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-600" />
            <span className="text-xl font-bold">{t.common_brand}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{profile?.full_name || profile?.email}</span>
            <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600" title={t.common_logout}>
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        {progress && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <Award className="w-6 h-6 text-brand-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-900">{progress.tasks_completed}</div>
              <div className="text-xs text-gray-500">{t.dash_tasks_done}</div>
            </div>
            <div className="card text-center">
              <BarChart3 className="w-6 h-6 text-brand-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-900">{Math.round(progress.average_score)}</div>
              <div className="text-xs text-gray-500">{t.dash_avg_score}</div>
            </div>
            <div className="card text-center">
              <Zap className="w-6 h-6 text-amber-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-900">{progress.streak_days}</div>
              <div className="text-xs text-gray-500">{t.dash_streak}</div>
            </div>
            <div className="card text-center">
              <Award className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-gray-900 capitalize">{progress.level}</div>
              <div className="text-xs text-gray-500">{t.dash_level}</div>
            </div>
          </div>
        )}

        {/* Generating state — incremental progress */}
        {generating && (
          <div className="card mb-8 text-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-brand-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {genCount > 0
                ? `${genCount} ${t.dash_gen_progress}`
                : t.dash_gen_preparing
              }
            </h3>
            <p className="text-gray-600">{t.dash_generating_desc}</p>
            {/* Progress dots */}
            <div className="flex justify-center gap-3 mt-4">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    i < genCount ? 'bg-brand-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{t.dash_your_tasks}</h2>
              <button onClick={handleNewTasks} className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1" disabled={generating}>
                <RefreshCw className="w-4 h-4" /> {t.dash_new_tasks}
              </button>
            </div>
            <div className="grid gap-4">
              {pendingTasks.map((task) => (
                <Link key={task.id} href={`/task/${task.id}`} className="card hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[task.difficulty]}`}>
                          {difficultyLabel(task.difficulty)}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.estimated_minutes} {t.dash_min}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.scenario.slice(0, 150)}...</p>
                      <div className="flex gap-2 mt-3">
                        {task.skills_tested?.slice(0, 3).map(s => (
                          <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {s.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand-600 ml-4 flex-shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t.dash_completed}</h2>
            <div className="grid gap-3">
              {completedTasks.map((task) => (
                <Link key={task.id} href={`/task/${task.id}/evaluation`} className="card hover:shadow-sm transition-shadow opacity-80">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[task.difficulty]}`}>
                          {difficultyLabel(task.difficulty)}
                        </span>
                        <span className="text-xs text-green-600 font-medium">{t.dash_evaluated}</span>
                      </div>
                      <h3 className="font-medium text-gray-700">{task.title}</h3>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!generating && tasks.length === 0 && (
          <div className="card text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.dash_no_tasks}</h3>
            <p className="text-gray-600 mb-4">{t.dash_no_tasks_desc}</p>
            <button onClick={handleNewTasks} className="btn-primary">{t.dash_generate_button}</button>
          </div>
        )}
      </div>
    </div>
  );
}
