'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Task } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Clock, ArrowRight, Loader2, ArrowLeft, AlertCircle, Send, MessageSquare, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  advanced: 'bg-red-100 text-red-700 border-red-200',
};

interface ConversationTurn {
  turn_number: number;
  user_message: string;
  ai_response: string;
}

export default function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useLanguage();

  // Workspace state
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [wsError, setWsError] = useState('');
  const [turnsRemaining, setTurnsRemaining] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const difficultyLabel = (d: string) =>
    t[`difficulty_${d}`] || d;

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase.from('tasks').select('*').eq('id', id).single();
      if (!data) { router.push('/dashboard'); return; }
      setTask(data);
      setLoading(false);

      if (data.status === 'pending') {
        await supabase.from('tasks').update({ status: 'in_progress' }).eq('id', id);
      }

      // Load existing conversation turns
      const { data: convData } = await supabase
        .from('conversations')
        .select('turn_number, user_message, ai_response')
        .eq('task_id', id)
        .order('turn_number', { ascending: true });

      if (convData && convData.length > 0) {
        setTurns(convData);
        setTurnsRemaining(Math.max(0, 5 - convData.length));
      }
    }
    load();
  }, [id, router]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns]);

  async function handleSend() {
    if (!message.trim() || sending || turnsRemaining <= 0) return;
    const userMsg = message.trim();
    setMessage('');
    setSending(true);
    setWsError('');

    try {
      const res = await fetch('/api/workspace/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: id, message: userMsg }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setTurnsRemaining(0);
          setWsError(data.error || t.ws_no_turns);
        } else {
          setWsError(data.error || t.common_error);
        }
        setMessage(userMsg);
        setSending(false);
        return;
      }

      setTurns(prev => [...prev, {
        turn_number: data.turn_number,
        user_message: userMsg,
        ai_response: data.response,
      }]);
      setTurnsRemaining(data.turns_remaining);
    } catch {
      setWsError(t.common_error);
      setMessage(userMsg);
    }
    setSending(false);
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  async function handleSubmitWork() {
    if (submitting || turns.length === 0) return;
    setSubmitting(true);
    setSubmitError('');

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Use the last AI response as the final output
      const lastTurn = turns[turns.length - 1];
      const finalOutput = lastTurn.ai_response;

      const { data: submission, error: subError } = await supabase.from('submissions').insert({
        task_id: id,
        user_id: user.id,
        final_output: finalOutput,
      }).select().single();

      if (subError) throw subError;

      await supabase.from('tasks').update({ status: 'submitted' }).eq('id', id);

      const evalRes = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submission_id: submission.id, task_id: id }),
      });

      if (!evalRes.ok) throw new Error('Evaluation failed');

      router.push(`/task/${id}/evaluation`);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : t.common_error);
      setSubmitting(false);
    }
  }

  if (loading || !task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  const exhausted = turnsRemaining <= 0;
  const isCompleted = task.status === 'submitted' || task.status === 'evaluated';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" /> {t.common_back_dashboard}
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-600" />
            <span className="font-semibold">{t.common_brand}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-sm font-medium px-3 py-1 rounded-full border ${DIFFICULTY_COLORS[task.difficulty]}`}>
              {difficultyLabel(task.difficulty)}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" /> ~{task.estimated_minutes} {t.task_minutes}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {task.skills_tested?.map(s => (
            <span key={s} className="text-xs bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full font-medium">
              {s.replace(/_/g, ' ')}
            </span>
          ))}
        </div>

        {/* Scenario */}
        <div className="card mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{t.task_scenario}</h2>
          <div className="prose prose-gray max-w-none">
            {task.scenario.split('\n').map((p, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-3">{p}</p>
            ))}
          </div>
        </div>

        {/* Input Materials */}
        {task.input_materials && (
          <div className="card mb-6 bg-blue-50 border-blue-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{t.task_materials}</h2>
            <div className="prose prose-gray max-w-none text-sm">
              <pre className="whitespace-pre-wrap bg-white rounded-lg p-4 border border-blue-200 text-gray-700">
                {typeof task.input_materials === 'string'
                  ? task.input_materials
                  : JSON.stringify(task.input_materials, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="card mb-8 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.task_how_to}</h3>
              <ol className="text-sm text-gray-700 space-y-2">
                <li><strong>1.</strong> {t.task_step_1}</li>
                <li><strong>2.</strong> {t.task_step_2}</li>
                <li><strong>3.</strong> {t.task_step_3}</li>
                <li><strong>4.</strong> {t.task_step_4}</li>
              </ol>
              <p className="text-sm text-amber-700 font-medium mt-3">
                {t.task_tip}
              </p>
            </div>
          </div>
        </div>

        {/* Inline AI Workspace */}
        {!isCompleted && (
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-900">{t.ws_title}</h2>
              </div>
              <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                turnsRemaining > 2
                  ? 'bg-green-100 text-green-700'
                  : turnsRemaining > 0
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
              }`}>
                {turnsRemaining > 0 ? `${turnsRemaining} ${t.ws_turns_left}` : t.ws_no_turns}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4 flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">{t.ws_compliance}</p>
            </div>

            {/* Chat history */}
            {turns.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg mb-4 max-h-[400px] overflow-y-auto">
                <div className="p-4 space-y-4">
                  {turns.map((turn, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-end">
                        <div className="bg-brand-600 text-white rounded-lg rounded-tr-sm px-4 py-2 max-w-[85%]">
                          <p className="text-xs opacity-70 mb-1">{t.ws_prompt_label} {turn.turn_number}</p>
                          <pre className="text-sm whitespace-pre-wrap font-sans">{turn.user_message}</pre>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white text-gray-800 rounded-lg rounded-tl-sm px-4 py-2 max-w-[85%] border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">{t.ws_ai_response}</p>
                          <div className="text-sm whitespace-pre-wrap">{turn.ai_response}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {sending && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-500 rounded-lg px-4 py-3 flex items-center gap-2 border border-gray-200">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">{t.ws_thinking}</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>
            )}

            {/* Input area */}
            {exhausted ? (
              <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-center">
                <p className="text-sm text-gray-600 font-medium">{t.ws_exhausted}</p>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="input-field flex-1 min-h-[100px] max-h-[200px] resize-y text-sm"
                    placeholder={t.ws_input_placeholder}
                    disabled={sending}
                    maxLength={4000}
                  />
                  <button
                    onClick={handleSend}
                    disabled={sending || !message.trim()}
                    className="btn-primary self-end px-4 py-3 flex items-center gap-1"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1.5 ml-1">{t.ws_input_tip}</p>
              </div>
            )}

            {wsError && (
              <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg mt-3">{wsError}</div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {isCompleted ? (
            <Link href={`/task/${task.id}/evaluation`} className="btn-primary flex items-center justify-center gap-2">
              {t.task_view_results} <ArrowRight className="w-4 h-4" />
            </Link>
          ) : turns.length > 0 ? (
            <>
              <button
                onClick={handleSubmitWork}
                disabled={submitting}
                className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.sub_submitting}
                  </>
                ) : (
                  <>
                    {t.task_submit_button} <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-xs text-gray-400 text-center">{t.ws_conv_included}</p>
            </>
          ) : null}
          {submitError && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{submitError}</div>
          )}
        </div>
      </div>
    </div>
  );
}
