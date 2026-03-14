import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { anthropic, MODEL, extractJSON } from '@/lib/kimi/client';
import { DAILY_TASK_PROMPT } from '@/lib/kimi/prompts';
import { ADMIN_KNOWLEDGE_BASE } from '@/lib/knowledge-base/admin';

const DAILY_TASK_LIMIT = 5;

export async function POST() {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Check subscription tier — daily tasks are paid-only
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const tier = profile?.subscription_tier || 'free';
    if (tier === 'free') {
      return NextResponse.json({
        error: 'upgrade_required',
        message: 'Daily tasks require a Pro subscription.',
      }, { status: 403 });
    }

    // Check daily limit across all task types
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: todayTotal } = await supabase
      .from('tasks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', today.toISOString());

    if ((todayTotal || 0) >= DAILY_TASK_LIMIT) {
      return NextResponse.json({
        error: 'daily_limit_reached',
        message: 'Daily task limit reached. Come back tomorrow!',
        limit: DAILY_TASK_LIMIT,
      }, { status: 429 });
    }

    // Check if user already has a quick task created today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { data: existingToday } = await supabase
      .from('tasks')
      .select('id, title, status')
      .eq('user_id', user.id)
      .eq('difficulty', 'quick')
      .gte('created_at', todayStart.toISOString())
      .limit(1)
      .single();

    if (existingToday) {
      return NextResponse.json({ task: existingToday, already_exists: true });
    }

    // Load user profile
    const [roleRes, assessRes] = await Promise.all([
      supabase.from('role_profiles').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
      supabase.from('assessments').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
    ]);

    const roleProfile = roleRes.data;
    const assessment = assessRes.data;

    const userContext = roleProfile
      ? `USER PROFILE:
- Job: ${roleProfile.job_description}
- Pain point: ${roleProfile.pain_point_task}
- Typical morning: ${roleProfile.typical_morning}
- Tools: ${roleProfile.tools_used?.join(', ')}
- Parsed role: ${JSON.stringify(roleProfile.parsed_profile || {})}
${assessment ? `- AI Competence: ${assessment.current_ai_competence}/100\n- AI Exposure: ${assessment.ai_exposure_score}/100` : ''}`
      : 'USER PROFILE: Administrative professional, general office work, uses Microsoft Office.';

    // Count previous quick tasks for variety
    const { count: previousCount } = await supabase
      .from('tasks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('difficulty', 'quick');

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 3000,
      system: `${DAILY_TASK_PROMPT}\n\n${ADMIN_KNOWLEDGE_BASE}`,
      messages: [
        {
          role: 'user',
          content: `${userContext}\n\nThis is daily task #${(previousCount || 0) + 1} for this user. Make it different from typical email/report tasks if they have done several already. Respond with valid JSON only.`,
        },
      ],
    });

    const raw = response.content[0].type === 'text' ? response.content[0].text : '{}';
    const cleaned = extractJSON(raw);
    const taskData = JSON.parse(cleaned);

    const { data: inserted, error: insertError } = await supabase.from('tasks').insert({
      user_id: user.id,
      title: taskData.title || 'Daily Quick Task',
      scenario: taskData.scenario || 'Complete this quick task.',
      input_materials: taskData.input_materials || null,
      difficulty: 'quick',
      estimated_minutes: 5,
      skills_tested: taskData.skills_tested || ['prompting'],
      evaluation_rubric: taskData.evaluation_criteria || {},
      expert_solution: taskData.expert_solution || {},
      micro_course_content: taskData.micro_course_content || null,
      status: 'pending',
    }).select().single();

    if (insertError) throw insertError;

    return NextResponse.json({ task: inserted });
  } catch (error) {
    console.error('Daily task generation error:', error);
    return NextResponse.json({ error: 'Daily task generation failed' }, { status: 500 });
  }
}
