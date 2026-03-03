'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Shield, ArrowRight, Loader2, Briefcase, Clock, Wrench } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function OnboardingPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const [typicalMorning, setTypicalMorning] = useState('');
  const [tools, setTools] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/auth/login'); return; }

    try {
      // Parse profile via API
      const parseRes = await fetch('/api/parse-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, painPoint, typicalMorning, tools }),
      });
      const parsed = await parseRes.json();

      // Save role profile
      const { error: dbError } = await supabase.from('role_profiles').insert({
        user_id: user.id,
        job_description: jobDescription,
        pain_point_task: painPoint,
        typical_morning: typicalMorning,
        tools_used: tools.split(',').map(t => t.trim()).filter(Boolean),
        parsed_profile: parsed.profile,
      });

      if (dbError) throw dbError;

      // Save pending assessment if exists
      const pendingScores = localStorage.getItem('assessment_scores') || sessionStorage.getItem('assessment_scores');
      const pendingAnswers = localStorage.getItem('assessment_answers') || sessionStorage.getItem('assessment_answers');
      if (pendingScores && pendingAnswers) {
        const scores = JSON.parse(pendingScores);
        const answers = JSON.parse(pendingAnswers);
        await supabase.from('assessments').insert({
          user_id: user.id,
          answers,
          scores,
          ai_exposure_score: scores.ai_exposure_score,
          adaptability_index: scores.adaptability_index,
          current_ai_competence: scores.current_ai_competence,
          awareness_gap: scores.awareness_gap,
          action_readiness: scores.action_readiness,
        });
        localStorage.removeItem('assessment_scores');
        localStorage.removeItem('assessment_answers');
        localStorage.removeItem('pending_assessment');
        localStorage.removeItem('assessment_lang');
        sessionStorage.removeItem('assessment_scores');
        sessionStorage.removeItem('assessment_answers');
        sessionStorage.removeItem('pending_assessment');
        sessionStorage.removeItem('assessment_lang');
      }

      // Mark onboarding complete
      await supabase.from('profiles').update({ onboarding_completed: true }).eq('id', user.id);

      // Initialize progress
      await supabase.from('user_progress').upsert({
        user_id: user.id,
        tasks_completed: 0,
        average_score: 0,
        streak_days: 0,
        skill_scores: {},
        level: 'novice',
      });

      router.push('/dashboard');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.common_error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-brand-600" />
          <span className="text-xl font-bold">{t.common_brand}</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.onb_title}</h1>
          <p className="text-gray-600">{t.onb_subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-brand-600" />
              <label className="font-semibold text-gray-900">{t.onb_job_label}</label>
            </div>
            <p className="text-sm text-gray-500 mb-3">{t.onb_job_hint}</p>
            <textarea
              className="input-field min-h-[120px]"
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              required
              placeholder={t.onb_job_placeholder}
            />
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-brand-600" />
              <label className="font-semibold text-gray-900">{t.onb_pain_label}</label>
            </div>
            <p className="text-sm text-gray-500 mb-3">{t.onb_pain_hint}</p>
            <textarea
              className="input-field min-h-[100px]"
              value={painPoint}
              onChange={e => setPainPoint(e.target.value)}
              required
              placeholder={t.onb_pain_placeholder}
            />
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-brand-600" />
              <label className="font-semibold text-gray-900">{t.onb_morning_label}</label>
            </div>
            <p className="text-sm text-gray-500 mb-3">{t.onb_morning_hint}</p>
            <textarea
              className="input-field min-h-[100px]"
              value={typicalMorning}
              onChange={e => setTypicalMorning(e.target.value)}
              required
              placeholder={t.onb_morning_placeholder}
            />
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-5 h-5 text-brand-600" />
              <label className="font-semibold text-gray-900">{t.onb_tools_label}</label>
            </div>
            <p className="text-sm text-gray-500 mb-3">{t.onb_tools_hint}</p>
            <input
              type="text"
              className="input-field"
              value={tools}
              onChange={e => setTools(e.target.value)}
              required
              placeholder={t.onb_tools_placeholder}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
          )}

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 text-lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t.onb_loading}
              </>
            ) : (
              <>
                {t.onb_button}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
