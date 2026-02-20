import { NextResponse } from 'next/server';
import { anthropic, MODEL, extractJSON } from '@/lib/kimi/client';
import { PROFILE_PARSER_PROMPT } from '@/lib/kimi/prompts';

export async function POST(request: Request) {
  try {
    const { jobDescription, painPoint, typicalMorning, tools } = await request.json();

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: PROFILE_PARSER_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Analyze this professional's role:

JOB DESCRIPTION: ${jobDescription}

TASK THAT TOOK TOO LONG THIS WEEK: ${painPoint}

TYPICAL MONDAY MORNING: ${typicalMorning}

TOOLS USED DAILY: ${tools}`,
        },
      ],
    });

    const raw = response.content[0].type === 'text' ? response.content[0].text : '{}';
    const cleaned = extractJSON(raw);
    const profile = JSON.parse(cleaned);

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Profile parsing error:', error);
    return NextResponse.json({
      profile: {
        role_type: 'Administrative Professional',
        sub_role_match: 'admin_assistant',
        industry: 'general',
        company_size: 'medium',
        key_tasks: ['email management', 'document preparation', 'scheduling'],
        tools: ['Microsoft Office'],
        pain_points: ['time-consuming manual tasks'],
        ai_familiarity: 'basic',
      },
    });
  }
}
