'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { QuickPill, QPTheme } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowLeft, Pill, CheckCircle2, Clock, Loader2, Flame, Trophy } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const THEME_CONFIG: Record<QPTheme, { label: string; color: string; bg: string }> = {
  prompt_craft: { label: 'Prompt Craft', color: 'text-purple-700', bg: 'bg-purple-100' },
  ai_literacy: { label: 'AI Literacy', color: 'text-blue-700', bg: 'bg-blue-100' },
  workflow_hacks: { label: 'Workflow Hacks', color: 'text-green-700', bg: 'bg-green-100' },
  tool_spotlight: { label: 'Tool Spotlight', color: 'text-amber-700', bg: 'bg-amber-100' },
  critical_thinking: { label: 'Critical Thinking', color: 'text-red-700', bg: 'bg-red-100' },
  ai_news: { label: 'AI News', color: 'text-teal-700', bg: 'bg-teal-100' },
};

const ALL_THEMES: QPTheme[] = ['prompt_craft', 'ai_literacy', 'workflow_hacks', 'tool_spotlight', 'critical_thinking', 'ai_news'];

export default function QuickPillPage() {
  const [pills, setPills] = useState<QuickPill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTheme, setActiveTheme] = useState<QPTheme | 'all'>('all');
  const [progress, setProgress] = useState<any>(null);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/auth/login'); return; }

      const [pillsRes, progressRes] = await Promise.all([
        fetch('/api/quick-pill'),
        fetch('/api/quick-pill/progress'),
      ]);

      if (pillsRes.ok) {
        const { pills: p } = await pillsRes.json();
        setPills(p || []);
      }
      if (progressRes.ok) {
        const data = await progressRes.json();
        setProgress(data);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  const filtered = activeTheme === 'all' ? pills : pills.filter(p => p.theme === activeTheme);
  const completed = pills.filter(p => p.completed).length;
  const total = pills.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-indigo-600" />
              <h1 className="text-lg font-bold text-gray-900">Quick Pill</h1>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {progress?.progress?.streak_days > 0 && (
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" />
                {progress.progress.streak_days}d streak
              </span>
            )}
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              {completed}/{total}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress bar */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{completed} of {total} pills completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all"
              style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
            />
          </div>
          {progress?.progress?.average_score > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              Average score: {Math.round(progress.progress.average_score)}/100 | Level: {progress.progress.level}
            </p>
          )}
        </div>

        {/* Theme filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          <button
            onClick={() => setActiveTheme('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
              activeTheme === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {ALL_THEMES.map(theme => {
            const cfg = THEME_CONFIG[theme];
            const count = pills.filter(p => p.theme === theme).length;
            const done = pills.filter(p => p.theme === theme && p.completed).length;
            return (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  activeTheme === theme ? 'bg-indigo-600 text-white' : `${cfg.bg} ${cfg.color} hover:opacity-80`
                }`}
              >
                {cfg.label} {done}/{count}
              </button>
            );
          })}
        </div>

        {/* Pills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(pill => {
            const cfg = THEME_CONFIG[pill.theme];
            return (
              <Link
                key={pill.id}
                href={`/quick-pill/${pill.id}`}
                className={`bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition ${
                  pill.completed ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                    {cfg.label}
                  </span>
                  {pill.completed ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-bold text-green-600">{pill.score}</span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {pill.estimated_minutes}m
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{pill.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {pill.knowledge_text.slice(0, 100)}...
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    pill.difficulty === 'easy' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {pill.difficulty}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Pill className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No pills in this category yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
