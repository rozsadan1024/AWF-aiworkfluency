import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: progress } = await supabase
      .from('qp_user_progress')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Count total active pills for progress display
    const { count: totalPills } = await supabase
      .from('qp_pills')
      .select('id', { count: 'exact', head: true })
      .eq('active', true);

    return NextResponse.json({
      progress: progress || {
        pills_completed: 0,
        average_score: 0,
        theme_scores: {},
        streak_days: 0,
        longest_streak: 0,
        badges: [],
        level: 'curious',
      },
      totalPills: totalPills || 0,
    });
  } catch (error) {
    console.error('QP progress error:', error);
    return NextResponse.json({ error: 'Failed to load progress' }, { status: 500 });
  }
}
