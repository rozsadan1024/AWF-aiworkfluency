'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Task, Submission, PromptScorecard } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, ArrowLeft, Copy, Check, Clock, Wrench, Lightbulb, BookOpen, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

function CopyButton({ text, t }: { text: string; t: Record<string, string> }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium"
    >
      {copied ? <><Check className="w-3 h-3" /> {t.course_copied}</> : <><Copy className="w-3 h-3" /> {t.course_copy_prompt}</>}
    </button>
  );
}

// Detect which WHAT/HOW/WHY dimensions are present in a prompt (heuristic, used for user prompts)
function analyzePrompt(prompt: string) {
  const lower = prompt.toLowerCase();
  return {
    hasRole: /you are|act as|as a |as an |expert|professional|specialist|senior|analyst|writer|assistant|te egy|legyél|szerepe|szakértő/.test(lower),
    hasAudience: /\bfor\b.{0,30}(team|manager|client|customer|audience|reader|stakeholder|user|boss|colleague|vp|ceo|director|leadership|executive)|(vp|ceo|director|leadership|executive|team|manager|client|customer|audience|reader|stakeholder|user|boss|colleague).{0,30}\breads?\b|számára|részére|vezetőnek|csapatnak|ügyfélnek/.test(lower),
    hasFormat: /format|structure|bullet|list|table|paragraph|section|heading|summary|outline|numbered|markdown|json|formátum|felsorolás|táblázat|összefoglaló/.test(lower),
    hasTone: /\btone\b|\bstyle\b|formal|informal|friendly|professional|concise|detailed|simple|casual|authoritative|hangnem|stílus|hivatalos|barátságos|tömör/.test(lower),
    hasContext: /because|in order to|goal|purpose|context|background|so that|the reason|we need|we want|to help|to enable|deadline|situation|mert|azért|cél|kontextus|háttér|szükségünk/.test(lower),
  };
}

// Uses structured scorecard for expert prompts (accurate), regex for user prompts (heuristic)
function PromptDimensions({ prompt, isExpert = false, scorecard, t }: { prompt: string; isExpert?: boolean; scorecard?: PromptScorecard; t: Record<string, string> }) {
  const a = analyzePrompt(prompt);
  const dims = scorecard
    ? [
        { present: scorecard.defines_role,    label: t.course_dim_role },
        { present: scorecard.defines_audience, label: t.course_dim_audience },
        { present: scorecard.specifies_format, label: t.course_dim_format },
        { present: scorecard.specifies_tone,   label: t.course_dim_tone },
        { present: scorecard.provides_context, label: t.course_dim_context },
      ]
    : [
        { present: a.hasRole,     label: t.course_dim_role },
        { present: a.hasAudience, label: t.course_dim_audience },
        { present: a.hasFormat,   label: t.course_dim_format },
        { present: a.hasTone,     label: t.course_dim_tone },
        { present: a.hasContext,  label: t.course_dim_context },
      ];
  return (
    <div>
      <div className="mt-2 flex flex-wrap gap-1">
        {dims.map(({ present, label }) => (
          <span key={label} className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            present
              ? 'bg-green-100 text-green-700'
              : isExpert
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-50 text-red-400 line-through'
          }`}>
            {present ? '✓' : '✗'} {label}
          </span>
        ))}
      </div>
      {scorecard?.rationale && (
        <p className="text-xs text-gray-500 mt-2 italic">{scorecard.rationale}</p>
      )}
    </div>
  );
}

function PromptGapExplanation({ userPrompt, t }: { userPrompt: string; t: Record<string, string> }) {
  const userA = analyzePrompt(userPrompt);
  const missing = [];
  if (!userA.hasRole)     missing.push(t.course_missing_role);
  if (!userA.hasAudience) missing.push(t.course_missing_audience);
  if (!userA.hasFormat)   missing.push(t.course_missing_format);
  if (!userA.hasTone)     missing.push(t.course_missing_tone);
  if (!userA.hasContext)  missing.push(t.course_missing_context);

  if (missing.length === 0) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
      <p className="text-sm font-bold text-amber-800 mb-2">{t.course_what_missing}</p>
      <ul className="space-y-1">
        {missing.map((m, i) => (
          <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
            <span className="text-amber-500 flex-shrink-0 mt-0.5">→</span>
            <span>{m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CoursePage() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: taskData } = await supabase.from('tasks').select('*').eq('id', id).single();
      if (!taskData) { router.push('/dashboard'); return; }
      setTask(taskData);

      const { data: subData } = await supabase
        .from('submissions')
        .select('*')
        .eq('task_id', id)
        .order('submitted_at', { ascending: false })
        .limit(1)
        .single();
      if (subData) setSubmission(subData);
    }
    load();
  }, [id, router]);

  if (!task) return null;

  const expert = task.expert_solution;
  const course = task.micro_course_content;
  const userPrompt = submission?.prompts_used;
  const expertPrompt = expert?.example_prompts?.[0];
  const hasComparison = !!(userPrompt && expertPrompt);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/task/${id}/evaluation`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" /> {t.course_back_eval}
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-600" />
            <span className="font-semibold">{t.common_brand}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-brand-600" />
          <span className="text-sm font-medium text-brand-600">{t.course_expert_approach}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
        <p className="text-gray-600 mb-8">{t.course_expert_intro}</p>

        {/* Micro Course */}
        {course && (
          <div className="card mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t.course_lesson}</h2>
            <div className="prose prose-gray max-w-none">
              {course.split('\n\n').map((p, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-3">{p}</p>
              ))}
            </div>
          </div>
        )}

        {/* Expert Approach */}
        {expert && (
          <>
            <div className="card mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">{t.course_step_by_step}</h2>
              <div className="prose prose-gray max-w-none">
                {expert.approach.split('\n').map((step, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-2">{step}</p>
                ))}
              </div>
            </div>

            {/* Recommended Tools */}
            <div className="card mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-5 h-5 text-brand-600" />
                <h2 className="text-lg font-bold text-gray-900">{t.course_recommended_tools}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {expert.recommended_tools?.map((tool, i) => (
                  <span key={i} className="bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full text-sm font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Expert Prompts */}
            {expert.example_prompts?.length > 0 && (
              <div className="card mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-brand-600" />
                  <h2 className="text-lg font-bold text-gray-900">{t.course_expert_prompts}</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">{t.course_expert_prompts_hint}</p>
                <div className="space-y-4">
                  {expert.example_prompts.map((prompt, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-gray-500">{t.course_prompt_n} {i + 1}</span>
                        <CopyButton text={prompt} t={t} />
                      </div>
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">{prompt}</pre>
                      <PromptDimensions prompt={prompt} isExpert scorecard={i === 0 ? expert.prompt_scorecard : undefined} t={t} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* YOUR PROMPT vs EXPERT PROMPT COMPARISON */}
            {hasComparison && (
              <div className="card mb-6 border-2 border-brand-200">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-brand-600" />
                    <h2 className="text-lg font-bold text-gray-900">{t.course_why_expert}</h2>
                  </div>
                  {showComparison
                    ? <ChevronUp className="w-5 h-5 text-gray-400" />
                    : <ChevronDown className="w-5 h-5 text-gray-400" />
                  }
                </button>
                <p className="text-sm text-gray-500 mt-1 mb-0">{t.course_see_comparison}</p>

                {showComparison && (
                  <div className="mt-6">
                    <div className="grid md:grid-cols-2 gap-4 mb-5">
                      {/* User prompt */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded-full">{t.course_your_prompt}</span>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[120px]">
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{userPrompt}</pre>
                        </div>
                        <PromptDimensions prompt={userPrompt!} t={t} />
                      </div>

                      {/* Expert prompt */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">{t.course_expert_prompt_label}</span>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 min-h-[120px]">
                          <pre className="text-sm text-green-800 whitespace-pre-wrap font-mono">{expertPrompt}</pre>
                        </div>
                        <PromptDimensions prompt={expertPrompt!} isExpert scorecard={expert.prompt_scorecard} t={t} />
                      </div>
                    </div>

                    <PromptGapExplanation userPrompt={userPrompt!} t={t} />

                    {/* Key Lesson */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-bold text-amber-800 mb-1">{t.course_key_lesson}</p>
                      <p className="text-sm text-amber-700">
                        {expert.key_lesson || t.course_key_lesson_default}
                      </p>
                    </div>

                    {/* Practice Exercise */}
                    <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
                      <p className="text-sm font-bold text-brand-800 mb-2">{t.course_try_rewrite}</p>
                      <p className="text-sm text-brand-700 mb-3">
                        {expert.practice_exercise
                          ? expert.practice_exercise.split("Format:")[0].trim()
                          : t.course_try_rewrite_desc}
                      </p>
                      <div className="bg-white border border-brand-200 rounded-lg p-3 mb-3">
                        <pre className="text-sm text-brand-900 font-mono whitespace-pre-wrap">
{`You are a [role].
[Task] for [audience],
focusing on [2-3 specific points].
Format: [structure — bullet list / table / paragraphs].
Tone: [style — professional / concise / friendly].`}
                        </pre>
                      </div>
                      <CopyButton text={`You are a [role].\n[Task] for [audience],\nfocusing on [2-3 specific points].\nFormat: [structure].\nTone: [style].`} t={t} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Key Insights */}
            {expert.key_insights && (
              <div className="card mb-6 bg-purple-50 border-purple-200">
                <h2 className="text-lg font-bold text-purple-900 mb-2">{t.course_key_insight}</h2>
                <p className="text-purple-800">{expert.key_insights}</p>
              </div>
            )}

            {/* Time Benchmark */}
            <div className="card mb-8 flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <span className="text-sm text-gray-600">{t.course_time_benchmark} </span>
                <span className="font-bold text-gray-900">{expert.time_benchmark} {t.course_time_unit}</span>
                <span className="text-xs text-gray-400 ml-2">{t.course_time_note}</span>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-4">
          <Link href="/dashboard" className="btn-primary">
            {t.course_back_dashboard}
          </Link>
        </div>
      </div>
    </div>
  );
}
