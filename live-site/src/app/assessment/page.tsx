'use client';

import { Suspense, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getQuestions, getBlockLabels } from '@/lib/assessment/questions';
import { calculateScores } from '@/lib/assessment/scoring';
import { AssessmentAnswer } from '@/types';
import { Shield, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const BLOCKS = ['your_work', 'ai_experience', 'your_goals'];

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <AssessmentContent />
    </Suspense>
  );
}

function AssessmentContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const isHu = lang === 'hu';

  const questions = useMemo(() => getQuestions(lang), [lang]);
  const blockLabels = useMemo(() => getBlockLabels(lang), [lang]);

  const [currentBlock, setCurrentBlock] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});
  const router = useRouter();

  const blockQuestions = useMemo(
    () => questions.filter(q => q.block === BLOCKS[currentBlock]),
    [currentBlock, questions]
  );

  const blockInfo = blockLabels[BLOCKS[currentBlock]];
  const progress = ((currentBlock + 1) / BLOCKS.length) * 100;

  function setAnswer(id: string, value: string | string[] | number) {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }

  function toggleMulti(id: string, option: string) {
    const current = (answers[id] as string[]) || [];
    if (current.includes(option)) {
      setAnswer(id, current.filter(v => v !== option));
    } else {
      setAnswer(id, [...current, option]);
    }
  }

  function canProceed() {
    return blockQuestions.every(q => {
      const a = answers[q.id];
      if (q.type === 'multi') return Array.isArray(a) && a.length > 0;
      if (q.type === 'slider') return typeof a === 'number';
      return a !== undefined && a !== '';
    });
  }

  function goToBlock(index: number) {
    setCurrentBlock(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleFinish() {
    const allAnswers: AssessmentAnswer[] = Object.entries(answers).map(
      ([question_id, value]) => ({ question_id, value })
    );
    const scores = calculateScores(allAnswers);

    sessionStorage.setItem('assessment_answers', JSON.stringify(allAnswers));
    sessionStorage.setItem('assessment_scores', JSON.stringify(scores));
    sessionStorage.setItem('assessment_lang', lang);
    router.push('/assessment/results');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href={isHu ? '/hu' : '/'} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <Shield className="w-5 h-5 text-brand-600" />
              <span className="font-semibold">AI Work Fluency</span>
            </Link>
            <span className="text-sm text-gray-500">
              {currentBlock + 1} / {BLOCKS.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-brand-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{blockInfo.title}</h1>
          <p className="text-gray-600">{blockInfo.description}</p>
        </div>

        <div className="space-y-8">
          {blockQuestions.map((q) => (
            <div key={q.id} className="card">
              <p className="font-medium text-gray-900 mb-4">{q.question}</p>

              {q.type === 'single' && q.options && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        answers[q.id] === opt.value
                          ? 'border-brand-500 bg-brand-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setAnswer(q.id, opt.value)}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        answers[q.id] === opt.value ? 'border-brand-600' : 'border-gray-300'
                      }`}>
                        {answers[q.id] === opt.value && (
                          <div className="w-3 h-3 rounded-full bg-brand-600" />
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {q.type === 'multi' && q.options && (
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const selected = ((answers[q.id] as string[]) || []).includes(opt.value);
                    return (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          selected ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleMulti(q.id, opt.value)}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selected ? 'border-brand-600 bg-brand-600' : 'border-gray-300'
                        }`}>
                          {selected && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-sm text-gray-700">{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {q.type === 'slider' && (
                <div className="px-2">
                  <input
                    type="range"
                    min={q.slider_min}
                    max={q.slider_max}
                    value={(answers[q.id] as number) ?? 50}
                    onChange={e => setAnswer(q.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{q.slider_labels?.[0]}</span>
                    <span className="font-semibold text-brand-600 text-base">{(answers[q.id] as number) ?? 50}%</span>
                    <span>{q.slider_labels?.[1]}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => goToBlock(Math.max(0, currentBlock - 1))}
            className="btn-secondary flex items-center gap-2"
            disabled={currentBlock === 0}
          >
            <ArrowLeft className="w-4 h-4" /> {isHu ? 'Vissza' : 'Back'}
          </button>

          {currentBlock < BLOCKS.length - 1 ? (
            <button
              onClick={() => goToBlock(currentBlock + 1)}
              className="btn-primary flex items-center gap-2"
              disabled={!canProceed()}
            >
              {isHu ? 'Tovább' : 'Continue'} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="btn-primary flex items-center gap-2 bg-green-600 hover:bg-green-700"
              disabled={!canProceed()}
            >
              {isHu ? 'Eredményeim megtekintése' : 'See My Results'} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
