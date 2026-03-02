'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Shield, ArrowRight, Loader2, Briefcase, Clock, Wrench } from 'lucide-react';

export default function OnboardingPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const [typicalMorning, setTypicalMorning] = useState('');
  const [tools, setTools] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

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

      // Save pending assessment if exists — check localStorage first (persists across tabs),
      // then fall back to sessionStorage (same tab only)
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
        // Clean up both storage locations
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
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-brand-600" />
          <span className="text-xl font-bold">AI Work Fluency</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your actual job</h1>
          <p className="text-gray-600">
            The more detail you give, the more realistic your practice tasks will be.
            Write naturally — there are no wrong answers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-brand-600" />
              <label className="font-semibold text-gray-900">Describe your actual job in your own words</label>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Not the official job title — what do you actually do? What lands on your desk?
            </p>
            <textarea
              className="input-field min-h-[120px]"
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              required
              placeholder="Example: I'm the office manager at a real estate company with about 50 people. I handle pretty much everything that isn't sales — scheduling, office supplies, coordinating with building management, helping with onboarding new people, managing the budget for office expenses, and creating reports for the monthly leadership meeting."
            />
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-brand-600" />
              <label className="font-semibold text-gray-900">What task this week took longer than you wished?</label>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Think of something that felt like it should have been faster.
            </p>
            <textarea
              className="input-field min-h-[100px]"
              value={painPoint}
              onChange={e => setPainPoint(e.target.value)}
              required
              placeholder="Example: I spent almost 2 hours pulling together data from three different spreadsheets to create the monthly expense report. Then another hour formatting it into a nice-looking document for the CEO."
            />
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-brand-600" />
              <label className="font-semibold text-gray-900">What does a typical Monday morning look like for you?</label>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Walk us through your first 2 hours at work.
            </p>
            <textarea
              className="input-field min-h-[100px]"
              value={typicalMorning}
              onChange={e => setTypicalMorning(e.target.value)}
              required
              placeholder="Example: I get in around 8:30, check email (usually 30-40 new messages over the weekend), prioritize them, respond to urgent ones. Then I check the week's calendar for conflicts, prepare the Monday standup agenda, and make sure the meeting room is set up."
            />
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-5 h-5 text-brand-600" />
              <label className="font-semibold text-gray-900">What software and tools do you use daily?</label>
            </div>
            <p className="text-sm text-gray-500 mb-3">Separate with commas.</p>
            <input
              type="text"
              className="input-field"
              value={tools}
              onChange={e => setTools(e.target.value)}
              required
              placeholder="Example: Outlook, Excel, Word, Teams, SharePoint, SAP"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
          )}

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 text-lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing your role & generating tasks...
              </>
            ) : (
              <>
                Generate My Practice Tasks
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
