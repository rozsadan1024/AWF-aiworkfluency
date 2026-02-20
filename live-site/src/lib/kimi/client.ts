import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929';

// Robustly extract JSON from a response that may contain extra text or markdown
export function extractJSON(text: string): string {
  // Try to find JSON object boundaries
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1);
  }
  // Fallback: strip markdown fences
  return text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
}
