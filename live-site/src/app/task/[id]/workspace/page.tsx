'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Task } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, ArrowLeft, ArrowRight, Send, Loader2, AlertTriangle, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

interface ConversationTurn {
  turn_number: number;
  user_message: string;
  ai_response: string;
}

export default function WorkspacePage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [turnsRemaining, setTurnsRemaining] = useState(5);
  const [showScenario, setShowScenario] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: taskData } = await supabase.from('tasks').select('*').eq('id', id).single();
      if (!taskData) { router.push('/dashboard'); return; }
      setTask(taskData);

      // Load existing conversation turns
      const { data: convData } = await supabase
        .from('conversations')
        .select('turn_number, user_message, ai_response')
        .eq('task_id', id)
        .order('turn_number', { ascending: true });

      if (convData && convData.length > 0) {
        setTurns(convData);
        // Estimate remaining turns based on loaded data
        setTurnsRemaining(Math.max(0, 5 - convData.length));
      }
      setLoading(false);
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
    setError('');

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
          setError(data.error || 'No turns remaining');
        } else {
          setError(data.error || 'Something went wrong');
        }
        // Restore the message so user doesn't lose it
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
      setError('Network error — please try again');
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

  if (loading || !task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  const exhausted = turnsRemaining <= 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/task/${id}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" /> Back to Task
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-600" />
            <span className="font-semibold">AIProof</span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-4 flex-1 flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-600" />
            <h1 className="text-lg font-bold text-gray-900">AI Workspace</h1>
          </div>
          <div className={`text-sm font-medium px-3 py-1 rounded-full ${
            turnsRemaining > 2
              ? 'bg-green-100 text-green-700'
              : turnsRemaining > 0
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700'
          }`}>
            {turnsRemaining > 0 ? `${turnsRemaining} turns left` : 'No turns left'}
          </div>
        </div>

        {/* Compliance notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-4 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">
            Practice environment — work with the scenario data provided. Do not enter real company information.
          </p>
        </div>

        {/* Collapsible scenario */}
        <button
          onClick={() => setShowScenario(!showScenario)}
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-700">Task: {task.title}</span>
          {showScenario ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
        {showScenario && (
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4 -mt-2 text-sm text-gray-600 max-h-48 overflow-y-auto">
            {task.scenario.split('\n').map((p, i) => (
              <p key={i} className="mb-2">{p}</p>
            ))}
            {task.input_materials && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="font-medium text-gray-700 mb-1">Materials:</p>
                <pre className="text-xs bg-gray-50 rounded p-2 whitespace-pre-wrap">
                  {typeof task.input_materials === 'string'
                    ? task.input_materials
                    : JSON.stringify(task.input_materials, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Chat area */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg mb-4 overflow-y-auto min-h-[300px] max-h-[500px]">
          {turns.length === 0 && !sending ? (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm p-8 text-center">
              <div>
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Write your prompt below to start working on this task.</p>
                <p className="mt-1 text-xs">Tip: Be specific about what you need — role, audience, format, and context.</p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {turns.map((turn, i) => (
                <div key={i} className="space-y-3">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-brand-600 text-white rounded-lg rounded-tr-sm px-4 py-2 max-w-[85%]">
                      <p className="text-xs opacity-70 mb-1">Prompt {turn.turn_number}</p>
                      <pre className="text-sm whitespace-pre-wrap font-sans">{turn.user_message}</pre>
                    </div>
                  </div>
                  {/* AI response */}
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-sm px-4 py-2 max-w-[85%]">
                      <p className="text-xs text-gray-500 mb-1">AI Response</p>
                      <div className="text-sm whitespace-pre-wrap">{turn.ai_response}</div>
                    </div>
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-500 rounded-lg px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        {exhausted ? (
          <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 mb-4 text-center">
            <p className="text-sm text-gray-600 font-medium">
              You have used all your turns. Review the AI responses above, then submit your final work.
            </p>
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex gap-2">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="input-field flex-1 min-h-[140px] max-h-[300px] resize-y text-base"
                placeholder="Type your prompt here... (Enter to send, Shift+Enter for new line)"
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
            <p className="text-xs text-gray-400 mt-1.5 ml-1">
              Tip: The more context you give, the better the response. Include who it&apos;s for, what format you need, and why.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-2 rounded-lg mb-4">{error}</div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pb-4">
          <Link
            href={`/task/${id}/submit`}
            className="btn-primary flex items-center gap-2"
          >
            Submit My Work <ArrowRight className="w-4 h-4" />
          </Link>
          {turns.length > 0 && (
            <span className="text-xs text-gray-400 self-center">
              Your conversation ({turns.length} turns) will be included in the evaluation.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
