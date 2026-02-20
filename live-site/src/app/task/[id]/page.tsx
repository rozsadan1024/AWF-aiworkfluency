'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Task } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Clock, ArrowRight, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  advanced: 'bg-red-100 text-red-700 border-red-200',
};

export default function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase.from('tasks').select('*').eq('id', id).single();
      if (!data) { router.push('/dashboard'); return; }
      setTask(data);
      setLoading(false);

      // Mark as in_progress
      if (data.status === 'pending') {
        await supabase.from('tasks').update({ status: 'in_progress' }).eq('id', id);
      }
    }
    load();
  }, [id, router]);

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
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-sm font-medium px-3 py-1 rounded-full border ${DIFFICULTY_COLORS[task.difficulty]}`}>
              {task.difficulty}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" /> ~{task.estimated_minutes} minutes
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
          <h2 className="text-lg font-semibold text-gray-900 mb-3">The Scenario</h2>
          <div className="prose prose-gray max-w-none">
            {task.scenario.split('\n').map((p, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-3">{p}</p>
            ))}
          </div>
        </div>

        {/* Input Materials */}
        {task.input_materials && (
          <div className="card mb-6 bg-blue-50 border-blue-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">📎 Materials & Data</h2>
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
              <h3 className="font-semibold text-gray-900 mb-2">How to complete this task</h3>
              <ol className="text-sm text-gray-700 space-y-2">
                <li><strong>1.</strong> Read the scenario carefully — details matter.</li>
                <li><strong>2.</strong> Use any AI tools you want (ChatGPT, Claude, Copilot, etc.).</li>
                <li><strong>3.</strong> Produce your deliverable.</li>
                <li><strong>4.</strong> Submit your output along with your prompts and process.</li>
              </ol>
              <p className="text-sm text-amber-700 font-medium mt-3">
                💡 We evaluate HOW you used AI, not just the result. Save your prompts!
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {task.status === 'submitted' || task.status === 'evaluated' ? (
            <Link href={`/task/${task.id}/evaluation`} className="btn-primary flex items-center gap-2">
              View Results <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link href={`/task/${task.id}/submit`} className="btn-primary flex items-center gap-2 text-lg py-4 px-8">
              I&apos;m Done — Submit My Work <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
