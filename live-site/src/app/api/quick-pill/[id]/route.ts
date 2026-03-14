import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: pill, error } = await supabase
      .from('qp_pills')
      .select('*')
      .eq('id', params.id)
      .eq('active', true)
      .single();

    if (error || !pill) {
      return NextResponse.json({ error: 'Pill not found' }, { status: 404 });
    }

    // Check if user already completed this pill
    const { data: evaluation } = await supabase
      .from('qp_evaluations')
      .select('*')
      .eq('user_id', user.id)
      .eq('pill_id', params.id)
      .single();

    return NextResponse.json({ pill, evaluation: evaluation || null });
  } catch (error) {
    console.error('Quick Pill detail error:', error);
    return NextResponse.json({ error: 'Failed to load pill' }, { status: 500 });
  }
}
