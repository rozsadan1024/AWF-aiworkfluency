'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AssessmentScores, AssessmentAnswer } from '@/types';
import Link from 'next/link';
import { Shield, ArrowRight, AlertTriangle, TrendingUp, Brain, Eye, Rocket, Loader2 } from 'lucide-react';

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="100" height="100" className="transform -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute mt-7 text-2xl font-bold" style={{ color }}>{score}</div>
      <p className="text-xs text-gray-600 mt-2 text-center font-medium">{label}</p>
    </div>
  );
}

export default function ResultsPage() {
  const [scores, setScores] = useState<AssessmentScores | null>(null);
  const [answers, setAnswers] = useState<AssessmentAnswer[] | null>(null);
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const raw = sessionStorage.getItem('assessment_scores');
    const rawAnswers = sessionStorage.getItem('assessment_answers');
    if (!raw || !rawAnswers) {
      router.push('/assessment');
      return;
    }
    const s = JSON.parse(raw) as AssessmentScores;
    const a = JSON.parse(rawAnswers) as AssessmentAnswer[];
    setScores(s);
    setAnswers(a);
    generateReport(s);
  }, [router]);

  async function generateReport(s: AssessmentScores) {
    try {
      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores: s }),
      });
      const data = await res.json();
      setReport(data.report || 'Your assessment is complete. Sign up to get personalized practice tasks.');
    } catch {
      setReport('Your assessment is complete. Sign up to start practicing with personalized AI tasks tailored to your role.');
    }
    setLoading(false);
  }

  async function handleSignupAndSave() {
    setSaving(true);
    // Store scores for post-signup saving
    sessionStorage.setItem('pending_assessment', 'true');
    router.push('/auth/signup');
  }

  if (!scores) return null;

  const riskLevel = scores.ai_exposure_score >= 70 ? 'High' : scores.ai_exposure_score >= 40 ? 'Moderate' : 'Low';
  const riskColor = scores.ai_exposure_score >= 70 ? '#ef4444' : scores.ai_exposure_score >= 40 ? '#f59e0b' : '#22c55e';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-600" />
            <span className="text-xl font-bold">AIProof</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Risk Banner */}
        <div className={`rounded-xl p-6 mb-8 ${
          riskLevel === 'High' ? 'bg-red-50 border border-red-200' :
          riskLevel === 'Moderate' ? 'bg-amber-50 border border-amber-200' :
          'bg-green-50 border border-green-200'
        }`}>
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" style={{ color: riskColor }} />
            <div>
              <h2 className="text-xl font-bold" style={{ color: riskColor }}>
                Your AI Exposure: {riskLevel} ({scores.ai_exposure_score}/100)
              </h2>
              <p className="text-gray-700 mt-1">
                {riskLevel === 'High'
                  ? 'Your role has significant overlap with what AI can do today. This is not a death sentence — but it means acting now gives you a real advantage.'
                  : riskLevel === 'Moderate'
                  ? 'Parts of your role will be affected by AI. You have time, but the professionals who adapt now will be the ones who thrive.'
                  : 'Your role has lower AI exposure than many office jobs. Still, building AI skills now makes you more valuable.'}
              </p>
            </div>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { score: scores.ai_exposure_score, label: 'AI Exposure', color: riskColor, icon: AlertTriangle },
            { score: scores.current_ai_competence, label: 'AI Skills', color: '#3b82f6', icon: Brain },
            { score: scores.adaptability_index, label: 'Adaptability', color: '#8b5cf6', icon: TrendingUp },
            { score: scores.awareness_gap, label: 'Awareness Gap', color: '#f59e0b', icon: Eye },
            { score: scores.action_readiness, label: 'Action Ready', color: '#22c55e', icon: Rocket },
          ].map((item) => (
            <div key={item.label} className="card flex flex-col items-center relative py-8">
              <ScoreRing score={item.score} label={item.label} color={item.color} />
            </div>
          ))}
        </div>

        {/* Report */}
        <div className="card mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Personalized Analysis</h3>
          {loading ? (
            <div className="flex items-center gap-3 text-gray-500 py-8 justify-center">
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing your responses...
            </div>
          ) : (
            <div className="prose prose-gray max-w-none">
              {report.split('\n\n').map((p, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          )}
        </div>

        {/* Dimension Breakdown */}
        <div className="card mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">What Your Scores Mean</h3>
          <div className="space-y-4">
            {[
              { label: 'AI Exposure Score', score: scores.ai_exposure_score, desc: 'How much of your daily work overlaps with what AI can already do. Higher = more exposed.' },
              { label: 'Current AI Competence', score: scores.current_ai_competence, desc: 'Your current ability to use AI tools effectively for work. This is what AIProof helps you improve.' },
              { label: 'Adaptability Index', score: scores.adaptability_index, desc: 'Your psychological readiness to learn new ways of working. Good news: this can be developed.' },
              { label: 'Awareness Gap', score: scores.awareness_gap, desc: 'The delta between how safe you feel and how exposed you actually are. Above 50 = you may be underestimating the change coming.' },
              { label: 'Action Readiness', score: scores.action_readiness, desc: 'Your practical ability to act — time, autonomy, motivation. This determines how fast you can improve.' },
            ].map((dim) => (
              <div key={dim.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{dim.label}</span>
                  <span className="text-sm font-bold text-gray-900">{dim.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                  <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{
                      width: `${dim.score}%`,
                      backgroundColor: dim.score >= 70 ? '#ef4444' : dim.score >= 40 ? '#f59e0b' : '#22c55e',
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card bg-brand-600 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to start practicing?</h3>
          <p className="text-brand-100 mb-6">
            Get personalized tasks that mirror your actual daily work.
            Practice solving them with AI. Get scored and learn the expert approach.
          </p>
          <button
            onClick={handleSignupAndSave}
            className="bg-white text-brand-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-colors"
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Create Free Account & Start
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-brand-200 text-sm mt-3">3 free practice tasks included. No credit card needed.</p>
        </div>
      </div>
    </div>
  );
}
