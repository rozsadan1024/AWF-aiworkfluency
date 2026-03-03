'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Task } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, ArrowLeft, Send, Loader2, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const TOOL_OPTIONS = [
  'ChatGPT', 'Claude', 'Copilot / Bing AI', 'Google Gemini',
  'Grammarly', 'Excel / Google Sheets', 'Word / Google Docs',
  'Zapier / Make', 'Other',
];

export default function SubmitPage() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [output, setOutput] = useState('');
  const [tools, setTools] = useState<string[]>([]);
  const [timeSpent, setTimeSpent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase.from('tasks').select('*').eq('id', id).single();
      if (!data) { router.push('/dashboard'); return; }
      setTask(data);
      setLoading(false);
    }
    load();
  }, [id, router]);

  function toggleTool(tool: string) {
    setTools(prev => prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!output.trim()) return;
    setSubmitting(true);
    setError('');

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: submission, error: subError } = await supabase.from('submissions').insert({
        task_id: id,
        user_id: user.id,
        final_output: output,
        tools_used: tools,
        time_spent_minutes: timeSpent ? parseInt(timeSpent) : null,
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
      setError(err instanceof Error ? err.message : t.common_error);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/task/${id}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" /> {t.common_back_task}
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-600" />
            <span className="font-semibold">{t.common_brand}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.sub_title} {task.title}</h1>
        <p className="text-gray-600 mb-8">{t.sub_subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <label className="font-semibold text-gray-900 block mb-2">{t.sub_output_label}</label>
            <p className="text-sm text-gray-500 mb-3">{t.sub_output_hint}</p>
            <textarea
              className="input-field min-h-[200px] font-mono text-sm"
              value={output}
              onChange={e => setOutput(e.target.value)}
              required
              placeholder={t.sub_output_placeholder}
            />
          </div>

          <div className="card">
            <label className="font-semibold text-gray-900 block mb-3">{t.sub_tools_label}</label>
            <div className="flex flex-wrap gap-2">
              {TOOL_OPTIONS.map(tool => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => toggleTool(tool)}
                  className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                    tools.includes(tool)
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <label className="font-semibold text-gray-900 block mb-2">{t.sub_time_label}</label>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <input
                type="number"
                className="input-field w-32"
                value={timeSpent}
                onChange={e => setTimeSpent(e.target.value)}
                min="1"
                max="300"
                placeholder="pl. 20"
              />
              <span className="text-sm text-gray-500">{t.sub_time_benchmark} ~{task.estimated_minutes} {t.sub_time_min}</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
          )}

          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
            disabled={submitting || !output.trim()}
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t.sub_submitting}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t.sub_submit_button}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
