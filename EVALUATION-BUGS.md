# AIProof Evaluation System — Bug Fix Specification

**Date:** 2026-03-13  
**Codebase:** `/home/molt/projekt/AWF-aiworkfluency/live-site`  
**Affected files:**
- `src/lib/kimi/prompts.ts`
- `src/app/api/evaluate/route.ts`
- `src/app/api/generate-tasks/route.ts`
- `src/types/index.ts`

---

## BUG #1 — CRITICAL: Trap detection hallucination

**File:** `src/lib/kimi/prompts.ts` → `EVALUATION_PROMPT`  
**Problem:** The evaluator gives `human_judgment` credit for catching the hidden trap without requiring explicit evidence in the user's submission. Claude assumes the user caught it based on the trap description alone.  
**Impact:** Users who submit "csináld" + raw data receive inflated scores with praise for catching traps they never saw.

**Fix:** Replace the `HIDDEN TRAP EVALUATION` section in `EVALUATION_PROMPT` with:

```
HIDDEN TRAP EVALUATION:
DEFAULT ASSUMPTION: The user MISSED the trap unless their submission contains explicit, verifiable evidence of noticing it — a correction, a warning note, a modified output, or explicit mention of the issue. Do NOT infer trap detection. Do NOT give credit if the submission accidentally avoids the trap. Only boost human_judgment if you can quote the exact part of the submission that demonstrates awareness. If no such evidence exists, note it constructively in human_judgment feedback: "Next time, watch for [trap type]..."
```

---

## BUG #2 — CRITICAL: `prompts_used` and `process_description` silently dropped

**File:** `src/app/api/evaluate/route.ts`  
**Problem:** The submission contains `prompts_used` (the actual prompts the user typed) and `process_description` (how they worked), but these fields are never included in the evaluation prompt. `prompt_sophistication` is therefore scored blind.

**Fix:** Add both fields to the evaluation context block in `route.ts`:

```typescript
// Current (broken):
Tools used: ${submission.tools_used?.join(', ') || '(Not specified)'}
Time spent: ${submission.time_spent_minutes || '(Not specified)'} minutes

// Fixed:
Prompts used by user:
${submission.prompts_used || '(User did not share their prompts — score prompt_sophistication lower, max 35)'}

Process description:
${submission.process_description || '(Not provided)'}

Tools used: ${submission.tools_used?.join(', ') || '(Not specified)'}
Time spent: ${submission.time_spent_minutes || '(Not specified)'} minutes
```

---

## BUG #3 — CRITICAL: No server-side weighted average validation

**File:** `src/app/api/evaluate/route.ts`  
**Problem:** Claude calculates `overall_score` itself. It frequently inflates the score above the mathematical weighted average. There is no server-side check.

**Weights:** output_quality 35% · ai_leverage 25% · prompt_sophistication 15% · human_judgment 15% · iteration_skill 10%

**Fix:** After parsing `evalResult`, add server-side recalculation before the DB insert:

```typescript
// Add after: let evalResult: any = JSON.parse(cleaned);
const ds = evalResult.dimension_scores || {};
const oq = ds.output_quality?.score ?? 50;
const al = ds.ai_leverage?.score ?? 50;
const ps = ds.prompt_sophistication?.score ?? 50;
const hj = ds.human_judgment?.score ?? 50;
const is_ = ds.iteration_skill?.score ?? 50;
const weightedAvg = Math.round(oq * 0.35 + al * 0.25 + ps * 0.15 + hj * 0.15 + is_ * 0.10);
evalResult.overall_score = weightedAvg; // always override Claude's calculation
```

---

## BUG #4 — HIGH: `evaluation_rubric` mislabeled as "Expected deliverable"

**File:** `src/app/api/evaluate/route.ts`  
**Problem:** The evaluation context sends:
```typescript
Expected deliverable: ${JSON.stringify(task.evaluation_rubric)}
```
But `task.evaluation_rubric` is NOT the deliverable — it is the full `evaluation_criteria` object (containing output_quality description, ai_leverage, hidden_trap, red_flags, etc.). Labeling it "Expected deliverable" confuses Claude's interpretation.

**Fix:** Change the label:
```typescript
// Current:
Expected deliverable: ${JSON.stringify(task.evaluation_rubric)}

// Fixed:
Evaluation criteria (rubric): ${JSON.stringify(task.evaluation_rubric)}
Explicit deliverable: ${task.evaluation_rubric?.deliverables || '(See scenario)'}
```

---

## BUG #5 — HIGH: `deliverables` field never saved to DB

**File:** `src/app/api/generate-tasks/route.ts`  
**Problem:** The task generation prompt produces a `deliverables` field (explicit description of what the user must submit), but the DB insert discards it. It is never stored, so the evaluator never sees it.

**Fix:** Either (A) save it as a separate column, or (B) merge it into `evaluation_rubric`:

```typescript
// Option B (no schema change needed):
evaluation_rubric: {
  ...(taskData.evaluation_criteria || {}),
  deliverables: taskData.deliverables || null,
},
```

---

## BUG #6 — HIGH: Full expert solution exposed to evaluator creates bias

**File:** `src/app/api/evaluate/route.ts`  
**Problem:** The evaluator receives the complete `expert_solution` including `example_prompts`, `approach`, and `key_insights`. Claude may match the user's output against the expert solution and award points for accidental similarity rather than actual skill.

**Fix:** Strip the example prompts and approach from what the evaluator sees; only pass scoring-relevant metadata:

```typescript
// Current:
Expert solution: ${JSON.stringify(task.expert_solution)}

// Fixed:
Expert solution reference (for calibration only — do NOT compare user output directly to this):
- Time benchmark: ${task.expert_solution?.time_benchmark} minutes
- Skills expected: ${task.skills_tested?.join(', ')}
- Key lesson: ${task.expert_solution?.key_lesson || ''}
- Prompt scorecard (what an expert prompt would contain): ${JSON.stringify(task.expert_solution?.prompt_scorecard || {})}
```

---

## BUG #7 — MEDIUM: Phantom dimensions in EvaluationResult type

**File:** `src/types/index.ts`  
**Problem:** `EvaluationResult.dimension_scores` declares `tool_selection` and `time_efficiency` dimensions, but `EVALUATION_PROMPT` only scores 5 dimensions: `output_quality`, `ai_leverage`, `prompt_sophistication`, `human_judgment`, `iteration_skill`. The phantom fields will always be `undefined`.

**Fix:** Remove `tool_selection` and `time_efficiency` from the type:

```typescript
// Current:
dimension_scores: {
  output_quality: DimensionScore;
  ai_leverage: DimensionScore;
  prompt_sophistication: DimensionScore;
  iteration_skill: DimensionScore;
  tool_selection: DimensionScore;       // ← DELETE
  time_efficiency: DimensionScore;      // ← DELETE
  human_judgment: DimensionScore;
};

// Fixed:
dimension_scores: {
  output_quality: DimensionScore;
  ai_leverage: DimensionScore;
  prompt_sophistication: DimensionScore;
  human_judgment: DimensionScore;
  iteration_skill: DimensionScore;
};
```

---

## BUG #8 — MEDIUM: No cap on prompt_sophistication when prompts not provided

**File:** `src/lib/kimi/prompts.ts` → `EVALUATION_PROMPT`  
**Problem:** When `prompts_used` is null and there is no workspace conversation, Claude still scores `prompt_sophistication` — it has no data to base this on and defaults to a generous estimate.

**Fix:** After fixing Bug #2, add an explicit rule in `EVALUATION_PROMPT`:

```
PROMPT SOPHISTICATION RULE: If neither "Prompts used by user" nor workspace conversation turns are provided, score prompt_sophistication between 15-35 maximum. You have no evidence of prompt quality — do not guess upward.
```

---

## Summary table

| # | Severity | File | Fix type |
|---|---|---|---|
| 1 | 🔴 Critical | prompts.ts | Prompt text change |
| 2 | 🔴 Critical | evaluate/route.ts | Add 2 fields to context |
| 3 | 🔴 Critical | evaluate/route.ts | Add server-side math |
| 4 | 🟠 High | evaluate/route.ts | Fix label string |
| 5 | 🟠 High | generate-tasks/route.ts | Save deliverables to rubric |
| 6 | 🟠 High | evaluate/route.ts | Strip expert solution |
| 7 | 🟡 Medium | types/index.ts | Delete 2 fields from type |
| 8 | 🟡 Medium | prompts.ts | Add rule to prompt |

---

## Implementation notes

- **No DB schema changes required** for bugs 1–4, 6–8
- **Bug #5** requires no schema change if using Option B (merge into `evaluation_rubric` JSONB)
- **Recommended order:** Fix #3 first (server-side math) as it prevents all score inflation immediately with one code change; then #2 (prompts_used); then #1 (trap); then remaining
- **Test case:** Submit a task with only "csináld" + pasted data, no prompts shared → expected overall_score after fixes: 20–40 range
