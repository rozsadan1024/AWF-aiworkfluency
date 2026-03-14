import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Get all active pills
    const { data: pills, error: pillsError } = await supabase
      .from('qp_pills')
      .select('*')
      .eq('active', true)
      .order('sort_order');

    if (pillsError) throw pillsError;

    // Get user's completed evaluations
    const { data: evals } = await supabase
      .from('qp_evaluations')
      .select('pill_id, overall_score')
      .eq('user_id', user.id);

    const completedMap = new Map((evals || []).map(e => [e.pill_id, e.overall_score]));

    // Merge completion status
    const enriched = (pills || []).map(p => ({
      ...p,
      completed: completedMap.has(p.id),
      score: completedMap.get(p.id) ?? null,
    }));

    return NextResponse.json({ pills: enriched });
  } catch (error) {
    console.error('Quick Pill list error:', error);
    return NextResponse.json({ error: 'Failed to load pills' }, { status: 500 });
  }
}
