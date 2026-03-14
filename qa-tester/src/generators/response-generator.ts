// Generates synthetic user responses at controlled quality levels
// This is the QA system's OWN Claude call — NOT a replay of the platform

import Anthropic from '@anthropic-ai/sdk';
import { CONFIG, ResponseQuality } from '../config.js';
import { ReplayedTask } from '../platform/replayer.js';
import { TestProfile } from '../profiles/types.js';

const anthropic = new Anthropic({ apiKey: CONFIG.anthropic.apiKey });

interface GeneratedResponse {
  content: string;
  promptsUsed: string | null;
  tokens: number;
}

const QUALITY_INSTRUCTIONS: Record<ResponseQuality, string> = {
  excellent: `You are roleplaying as an office professional completing a work task.
Produce an EXCELLENT quality response:
- Read the scenario carefully and catch ANY inconsistencies, errors, or traps in the data
- Write a sophisticated, well-structured deliverable that a manager would immediately accept
- Show evidence of critical thinking — question assumptions, flag issues, add professional context
- If you notice any errors in the input data (wrong numbers, name inconsistencies, date problems), explicitly mention and correct them
- Format professionally with appropriate headers, bullet points, etc.
- Add your own professional judgment and context beyond what AI would produce
Also generate a high-quality prompt that you "would have used" to get AI help — make it specific with role, audience, format, tone, and context.`,

  good: `You are roleplaying as an office professional completing a work task.
Produce a GOOD quality response:
- Complete the task correctly and professionally
- The output should be usable but not exceptional
- You may miss subtle issues in the data (it's okay to not catch hidden traps)
- Use reasonable formatting and structure
- Show some professional judgment but don't overthink it
Also generate a decent prompt you "would have used" — include some context but don't make it perfect.`,

  mediocre: `You are roleplaying as an office professional completing a work task.
Produce a MEDIOCRE quality response:
- Complete the task but in a surface-level way
- Use generic language that could apply to any similar task
- Don't add much original thinking — just process the information
- Miss any subtle issues or traps in the data
- Format is basic — maybe a few paragraphs, no real structure
- Output feels like a first draft that needs work
Include a basic, vague prompt like "Help me with this task" or "Write a summary of this data".`,

  bad: `You are roleplaying as an office professional completing a work task.
Produce a BAD quality response:
- Misunderstand or partially address the task
- Include some irrelevant content
- Miss obvious issues in the data
- Poor formatting — wall of text or incomplete
- Show no critical thinking
- The output would need major revision before being usable
Include a very vague, lazy prompt like "do this for me" or "summarize this".`,

  gibberish: `You are roleplaying as someone who doesn't understand the task.
Produce GIBBERISH:
- Write 2-3 sentences of random, incoherent text
- It should be clear this person didn't engage with the task at all
- Mix random words, fragments, maybe some lorem ipsum
Do NOT include any prompt.`,

  empty: `Respond with ONLY whitespace or a single period. Nothing else.
Do NOT include any prompt.`,

  off_topic: `You are roleplaying as someone who completely misunderstood the task.
Write 3-5 paragraphs about a COMPLETELY different topic (e.g., a recipe, a movie review, travel tips).
The response should have nothing to do with the actual task.
Do NOT include any prompt.`,

  copy_paste: `You are roleplaying as someone who just copies the task description back.
Take the scenario text and input materials and paste them back almost verbatim.
Maybe add "Here is the task:" at the beginning.
Do NOT include any prompt — this person clearly didn't use AI.`,
};

export async function generateSyntheticResponse(
  task: ReplayedTask,
  profile: TestProfile,
  quality: ResponseQuality,
): Promise<GeneratedResponse> {
  if (quality === 'empty') {
    return { content: ' ', promptsUsed: null, tokens: 0 };
  }

  if (quality === 'copy_paste') {
    const content = `Here is the task:\n\n${task.scenario}\n\n${task.input_materials ? JSON.stringify(task.input_materials) : ''}`;
    return { content, promptsUsed: null, tokens: 0 };
  }

  const workArea = profile.assessment.find(a => a.question_id === 'q1_work_area')?.value || 'general office';
  const confidence = profile.assessment.find(a => a.question_id === 'q11_confidence')?.value || '3';

  const response = await anthropic.messages.create({
    model: CONFIG.models.responseGen,
    max_tokens: 3000,
    system: QUALITY_INSTRUCTIONS[quality],
    messages: [{
      role: 'user',
      content: `TASK SCENARIO:
${task.scenario}

INPUT MATERIALS:
${task.input_materials ? (typeof task.input_materials === 'string' ? task.input_materials : JSON.stringify(task.input_materials, null, 2)) : '(none)'}

DELIVERABLE EXPECTED:
${task.evaluation_rubric?.deliverables || '(See scenario)'}

YOUR PROFILE:
- Work area: ${workArea}
- AI confidence level: ${confidence}/5
- Industry: ${profile.roleProfile.industry}

Respond with ONLY a JSON object:
{
  "response": "Your complete task response here",
  "prompt_used": "The prompt you would have used to get AI help (or null if not applicable)"
}`,
    }],
  });

  const totalTokens = (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);
  const raw = response.content[0].type === 'text' ? response.content[0].text : '{}';

  let parsed: any;
  try {
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    parsed = JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
  } catch {
    // If JSON parsing fails, use raw text as response
    parsed = { response: raw, prompt_used: null };
  }

  return {
    content: parsed.response || raw,
    promptsUsed: parsed.prompt_used || null,
    tokens: totalTokens,
  };
}
