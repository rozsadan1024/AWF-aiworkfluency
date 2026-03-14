'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { QuickPill, QPEvaluation, QPTheme } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Pill, Loader2, Send, CheckCircle2, BookOpen, PenTool, Lightbulb, ArrowRight } from 'lucide-react';

const THEME_COLORS: Record<QPTheme, { bg: string; text: string; accent: string }> = {
  prompt_craft: { bg: 'bg-purple-50', text: 'text-purple-700', accent: 'bg-purple-600' },
  ai_literacy: { bg: 'bg-blue-50', text: 'text-blue-700', accent: 'bg-blue-600' },
  workflow_hacks: { bg: 'bg-green-50', text: 'text-green-700', accent: 'bg-green-600' },
  tool_spotlight: { bg: 'bg-amber-50', text: 'text-amber-700', accent: 'bg-amber-600' },
  critical_thinking: { bg: 'bg-red-50', text: 'text-red-700', accent: 'bg-red-600' },
  ai_news: { bg: 'bg-teal-50', text: 'text-teal-700', accent: 'bg-teal-600' },
};

const THEME_LABELS: Record<QPTheme, string> = {
  prompt_craft: 'Prompt Craft',
  ai_literacy: 'AI Literacy',
  workflow_hacks: 'Workflow Hacks',
  tool_spotlight: 'Tool Spotlight',
  critical_thinking: 'Critical Thinking',
  ai_news: 'AI News',
};

function ScoreRing({ score, label, size = 80 }: { score: number; label: string; size?: number }) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : score >= 25 ? '#f97316' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth="4" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth="4" fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000" />
      </svg>
      <span className="text-xl font-bold text-gray-900 -mt-14">{score}</span>
      <span className="text-xs text-gray-500 mt-6">{label}</span>
    </div>
  );
}

type Phase = 'read' | 'task' | 'submitting' | 'results';

export default function PillDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pill, setPill] = useState<QuickPill | null>(null);
  const [evaluation, setEvaluation] = useState<QPEvaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>('read');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/auth/login'); return; }

      const res = await fetch(`/api/quick-pill/${id}`);
      if (!res.ok) { router.push('/quick-pill'); return; }

      const data = await res.json();
      setPill(data.pill);
      if (data.evaluation) {
        setEvaluation(data.evaluation);
        setPhase('results');
      }
      setLoading(false);
    }
    load();
  }, [id, router]);

  async function handleSubmit() {
    if (!answer.trim()) return;
    setPhase('submitting');
    setError('');

    try {
      const res = await fetch(`/api/quick-pill/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer_text: answer }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      const { evaluation: eval_ } = await res.json();
      setEvaluation(eval_);
      setPhase('results');
    } catch (e: any) {
      setError(e.message);
      setPhase('task');
    }
  }

  if (loading || !pill) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const theme = THEME_COLORS[pill.theme];
  const themeLabel = THEME_LABELS[pill.theme];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/quick-pill" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${theme.bg} ${theme.text}`}>
            {themeLabel}
          </span>
          <h1 className="text-sm font-semibold text-gray-900 truncate">{pill.title}</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Phase indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { step: 1, label: 'Read', done: phase !== 'read', active: phase === 'read' },
            { step: 2, label: 'Practice', done: phase === 'results', active: phase === 'task' || phase === 'submitting' },
            { step: 3, label: 'Results', done: false, active: phase === 'results' },
          ].map((s, i) => (
            <div key={s.step} className="flex items-center gap-2">
              {i > 0 && <div className="w-8 h-0.5 bg-gray-300" />}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                s.active ? `${theme.accent} text-white`
                : s.done ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
              }`}>
                {s.step}
              </div>
            </div>
          ))}
          <span className="text-xs text-gray-400 ml-2">
            {phase === 'read' ? 'Read' : phase === 'task' || phase === 'submitting' ? 'Practice' : 'Results'}
          </span>
        </div>

        {/* PHASE: READ */}
        {phase === 'read' && (
          <div>
            <div className={`rounded-xl p-6 ${theme.bg} mb-6`}>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className={`w-5 h-5 ${theme.text}`} />
                <h2 className={`text-lg font-bold ${theme.text}`}>{pill.title}</h2>
              </div>
              <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                {pill.knowledge_text}
              </div>
            </div>
            <button
              onClick={() => setPhase('task')}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              I have read this — show me the task
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* PHASE: TASK */}
        {(phase === 'task' || phase === 'submitting') && (
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <PenTool className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-900">Your Task</h2>
              </div>
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {pill.task_prompt}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your response
              </label>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-48 p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={phase === 'submitting'}
                maxLength={3000}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">{answer.length}/3000</span>
                <button
                  onClick={() => setPhase('read')}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Re-read the knowledge bit
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-600 mt-2">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={!answer.trim() || phase === 'submitting'}
                className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {phase === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Evaluating your response...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* PHASE: RESULTS */}
        {phase === 'results' && evaluation && (
          <div>
            {/* Overall score */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-4 text-center">
              <ScoreRing score={evaluation.overall_score} label="Overall" size={100} />
              <p className="text-gray-600 text-sm mt-4">{evaluation.feedback_summary}</p>
            </div>

            {/* Dimension scores */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { key: 'understanding', label: 'Understanding', score: evaluation.understanding_score, feedback: evaluation.understanding_feedback },
                { key: 'application', label: 'Application', score: evaluation.application_score, feedback: evaluation.application_feedback },
                { key: 'readiness', label: 'Readiness', score: evaluation.readiness_score, feedback: evaluation.readiness_feedback },
              ].map(dim => (
                <div key={dim.key} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
                  <ScoreRing score={dim.score} label={dim.label} size={70} />
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3">{dim.feedback}</p>
                </div>
              ))}
            </div>

            {/* Practical tip */}
            {evaluation.practical_tip && (
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <h3 className="font-semibold text-amber-800">Try This Tomorrow</h3>
                </div>
                <p className="text-sm text-amber-700">{evaluation.practical_tip}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Link
                href="/quick-pill"
                className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition text-center"
              >
                Back to Pills
              </Link>
              <Link
                href="/quick-pill"
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition text-center flex items-center justify-center gap-2"
              >
                <Pill className="w-4 h-4" />
                Try Another
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
