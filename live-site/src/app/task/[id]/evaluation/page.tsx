'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { EvaluationResult, Task } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, ArrowLeft, ArrowRight, Loader2, Star, TrendingUp, Lightbulb } from 'lucide-react';

const DIMENSION_LABELS: Record<string, { label: string; weight: string }> = {
  output_quality: { label: 'Output Quality', weight: '30%' },
  ai_leverage: { label: 'AI Leverage', weight: '20%' },
  prompt_sophistication: { label: 'Prompt Skill', weight: '15%' },
  human_judgment: { label: 'Human Judgment', weight: '15%' },
  iteration_skill: { label: 'Iteration', weight: '10%' },
  time_efficiency: { label: 'Time Efficiency', weight: '5%' },
  tool_selection: { label: 'Tool Selection', weight: '5%' },
};

function scoreColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#3b82f6';
  if (score >= 40) return '#f59e0b';
  return '#ef4444';
}

function scoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Developing';
  return 'Needs Work';
}

export default function EvaluationPage() {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: taskData } = await supabase.from('tasks').select('*').eq('id', id).single();
      const { data: evalData } = await supabase
        .from('evaluations')
        .select('*')
        .eq('task_id', id)
        .order('evaluated_at', { ascending: false })
        .limit(1)
        .single();

      if (!taskData) { router.push('/dashboard'); return; }
      setTask(taskData);
      setEvaluation(evalData);
      setLoading(false);
    }
    load();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!evaluation || !task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card text-center">
          <p className="text-gray-600 mb-4">Evaluation not found or still processing.</p>
          <Link href="/dashboard" className="btn-primary">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const overallColor = scoreColor(evaluation.overall_score);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-600" />
            <span className="font-semibold">AIProof</span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Overall Score */}
        <div className="card text-center mb-8">
          <p className="text-sm text-gray-500 mb-2">{task.title}</p>
          <div className="text-7xl font-extrabold mb-2" style={{ color: overallColor }}>
            {Math.round(evaluation.overall_score)}
          </div>
          <p className="text-lg font-medium" style={{ color: overallColor }}>
            {scoreLabel(evaluation.overall_score)}
          </p>
        </div>

        {/* Dimension Scores */}
        <div className="card mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Score Breakdown</h2>
          <div className="space-y-5">
            {Object.entries(DIMENSION_LABELS).map(([key, { label, weight }]) => {
              const dim = evaluation.dimension_scores[key as keyof typeof evaluation.dimension_scores];
              if (!dim) return null;
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {label} <span className="text-gray-400 font-normal">({weight})</span>
                    </span>
                    <span className="text-sm font-bold" style={{ color: scoreColor(dim.score) }}>
                      {dim.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                      className="h-2.5 rounded-full transition-all duration-700"
                      style={{ width: `${dim.score}%`, backgroundColor: scoreColor(dim.score) }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{dim.feedback}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overall Feedback */}
        <div className="card mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Overall Feedback</h2>
          <div className="prose prose-gray max-w-none">
            {evaluation.feedback_text.split('\n\n').map((p, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-3">{p}</p>
            ))}
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="card bg-green-50 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Top Strength</h3>
            </div>
            <p className="text-green-700 text-sm">{evaluation.top_strength || 'See detailed feedback above.'}</p>
          </div>
          <div className="card bg-amber-50 border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-amber-800">Top Improvement Area</h3>
            </div>
            <p className="text-amber-700 text-sm">{evaluation.top_improvement || 'See detailed feedback above.'}</p>
          </div>
        </div>

        {/* Improvement Tips */}
        {evaluation.improvement_tips?.length > 0 && (
          <div className="card mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-brand-600" />
              <h2 className="text-lg font-bold text-gray-900">Quick Tips</h2>
            </div>
            <div className="space-y-2">
              {evaluation.improvement_tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-brand-600 font-bold flex-shrink-0">→</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA to Expert Course */}
        <div className="flex gap-4">
          <Link href={`/task/${id}/course`} className="btn-primary flex items-center gap-2 text-lg py-4 px-8">
            See How an Expert Would Do This <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/dashboard" className="btn-secondary flex items-center gap-2">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
