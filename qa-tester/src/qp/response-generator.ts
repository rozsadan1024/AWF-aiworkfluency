import Anthropic from '@anthropic-ai/sdk';
import { CONFIG } from '../config.js';
import { QPPill } from './types.js';

const anthropic = new Anthropic({ apiKey: CONFIG.anthropic.apiKey });

export type QPQuality = 'excellent' | 'good' | 'bad' | 'gibberish';

export const QP_QUALITY_RANGES: Record<QPQuality, [number, number]> = {
  excellent: [65, 95],
  good: [40, 78],
  bad: [8, 40],
  gibberish: [0, 15],
};

const QUALITY_INSTRUCTIONS: Record<QPQuality, string> = {
  excellent: `You are roleplaying as a professional who just read a knowledge bit about AI and is completing a practice task.
Produce an EXCELLENT response:
- Demonstrate clear understanding of the concept from the knowledge bit
- Apply it correctly and specifically to the task
- Show practical awareness — connect it to real work scenarios
- Use proper structure and professional language
- Go slightly beyond what was asked — show you internalized the concept`,

  good: `You are roleplaying as a professional completing a practice task after reading about AI.
Produce a GOOD but not exceptional response:
- Show you understood the main concept
- Apply it to the task correctly but without extra sophistication
- Keep it practical but don't add much beyond what was asked
- Some minor gaps in understanding are okay`,

  bad: `You are roleplaying as someone who barely read the knowledge bit.
Produce a BAD response:
- Misunderstand or oversimplify the concept
- Apply it incorrectly or superficially
- Miss the point of the task
- Keep it short and vague
- Show little practical awareness`,

  gibberish: `Produce 1-2 sentences of irrelevant text that has nothing to do with the task. Maybe mention lunch plans or the weather.`,
};

export async function generateQPResponse(
  pill: QPPill,
  quality: QPQuality,
): Promise<{ content: string; tokens: number }> {
  if (quality === 'gibberish') {
    return { content: 'I had a really good sandwich for lunch today. The weather is nice outside.', tokens: 0 };
  }

  const response = await anthropic.messages.create({
    model: CONFIG.models.responseGen,
    max_tokens: 2000,
    system: QUALITY_INSTRUCTIONS[quality],
    messages: [{
      role: 'user',
      content: `KNOWLEDGE BIT YOU JUST READ:
${pill.knowledge_text}

TASK:
${pill.task_prompt}

Write your response to this task. Respond with ONLY your answer, no meta-commentary.`,
    }],
  });

  const tokens = (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);
  const content = response.content[0].type === 'text' ? response.content[0].text : '';
  return { content, tokens };
}
