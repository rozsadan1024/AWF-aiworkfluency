# AIWorkFluency — QA Review Brief

**Date:** 2026-03-14
**Purpose:** This document provides everything needed for an independent AI reviewer to understand the platform, its evaluation system, and the QA test results, and to judge whether the evaluation pipeline is working correctly.

---

## 1. What Is AIWorkFluency?

An AI literacy training platform (https://aiworkfluency.com) for office professionals. The core loop:

1. **Assessment** — User answers 13 questions about their work, AI experience, and goals. System calculates 5 scores (0-100): AI Exposure, Adaptability, AI Competence, Awareness Gap, Action Readiness.
2. **Task Generation** — Claude (Haiku) generates personalized work tasks based on the user's profile. Each task includes a scenario, input materials, a hidden trap, evaluation criteria, and an expert solution.
3. **Submission** — User completes the task (optionally using an AI workspace with max 5 chat turns) and submits their output.
4. **Evaluation** — Claude (Sonnet) evaluates the submission across 5 weighted dimensions and produces feedback text.
5. **Progress** — Scores feed into user progress tracking (levels, streaks, skill scores).

**Stack:** Next.js 14, Supabase (PostgreSQL + Auth), Anthropic Claude API, Stripe billing, Docker/Caddy deployment.

---

## 2. How Evaluation Scoring Works

### 2.1 Five Dimensions (0-100 each)

| Dimension | Weight | What It Measures |
|---|---|---|
| Output Quality | 35% | Is the deliverable professional, complete, accurate? Would a manager accept it? |
| AI Leverage | 25% | Did the user use AI effectively — not too little, not blindly? |
| Prompt Sophistication | 15% | Were prompts specific, contextualized, well-structured? |
| Human Judgment | 15% | Did the user add value beyond AI? Catch errors? Handle nuance? |
| Iteration Skill | 10% | Did the user refine through multiple rounds? |

### 2.2 Overall Score

Always calculated server-side as the weighted average:
```
overall = (OQ × 0.35) + (AL × 0.25) + (PS × 0.15) + (HJ × 0.15) + (IS × 0.10)
```
Claude's own `overall_score` is always overridden by this calculation.

### 2.3 Server-Side Caps (Hard Rules)

These caps are enforced in code regardless of what Claude returns:

| Condition | Cap Applied |
|---|---|
| No workspace conversation exists | iteration_skill ≤ 30 |
| No prompts shared AND no conversation | prompt_sophistication ≤ 35 |
| Submission is truncated (ends mid-word, very short, etc.) | output_quality ≤ 40 |

### 2.4 Prompt-Level Rules (Soft — Depend on Claude Following Instructions)

| Rule | Effect |
|---|---|
| Hidden trap MISSED (no evidence of detection) | human_judgment ≤ 30 |
| Hidden trap CAUGHT (explicit evidence quoted) | human_judgment ≥ 60 |
| No prompts or conversation data | prompt_sophistication 15-35 |
| No iteration evidence | iteration_skill ≤ 30 |
| Incomplete/truncated submission | output_quality ≤ 40 |

### 2.5 Scoring Calibration Anchors

- **0-25 MINIMAL:** Task barely attempted, output unusable
- **26-50 BASIC:** "Typed it into ChatGPT and copied the result"
- **51-75 COMPETENT:** Good prompt with 2-3 dimensions, usable output
- **76-100 STRONG:** Professional-grade, evidence of iteration, human judgment visible. 90+ is rare.

### 2.6 Hidden Traps

Every task contains exactly one hidden trap woven naturally into the scenario/data (wrong numbers, confidential data, name inconsistencies, weekend deadlines, etc.). The trap is documented in `evaluation_rubric.hidden_trap` — only the evaluator sees it. The user who catches and corrects it scores higher on human_judgment.

---

## 3. The QA Testing System

### 3.1 Architecture

The QA system (`qa-tester/`) replicates the exact same flow as the live platform:
- Creates real Supabase users via admin API
- Calculates assessment scores using the identical `calculateScores()` function
- Calls Claude with the identical prompts and models used in production
- Applies the identical server-side caps and weighted average
- Then adds a meta-evaluation layer: an independent Claude call judges whether the platform's evaluation was correct

### 3.2 Synthetic Profiles (6)

| Profile | Description | AI Level |
|---|---|---|
| Junior Marketing | Surface-level AI user, low confidence | Beginner |
| Senior Finance | AI skeptic, no AI experience | None |
| Mid HR | Moderate user, overwhelmed | Intermediate |
| Junior Admin | No AI, resistant to change | None |
| Senior PM | Power user, high confidence | Advanced |
| Mid Sales | Curious beginner | Beginner |

### 3.3 Response Quality Levels

| Quality | Expected Score Range | What It Simulates |
|---|---|---|
| excellent | 55-85 | Expert-level work, catches trap, sophisticated prompts |
| good | 40-75 | Correct, professional, but not exceptional |
| mediocre | 20-50 | Surface-level, generic, first draft quality |
| bad | 8-35 | Misunderstood task, poor quality, missed everything |
| gibberish | 0-10 | Random incoherent text |
| empty | 0-5 | Whitespace only |
| off_topic | 0-20 | Completely unrelated response |
| copy_paste | 5-25 | Task description copied back verbatim |

Note: Expected ranges account for the server-side caps (iteration_skill ≤ 30, prompt_sophistication ≤ 35 in test conditions), which pull overall scores ~5-10 points lower.

### 3.4 Meta-Evaluator Criteria

The meta-evaluator (independent Claude call) judges each test on:

1. **Scoring Accuracy** — Is the platform's overall_score within the expected range for this quality level?
   - accurate: within range ±5
   - too_lenient / too_harsh: 5-15 points off
   - wildly_off: >15 points off

2. **Feedback Quality (1-5)** — Is feedback specific, actionable, calibrated to the user?

3. **Expert Solution Quality (1-5)** — Is the expert solution genuinely better than the submission?

4. **Task Relevance (1-5)** — Does the task match the user's profile, industry, and AI level?

5. **Trap Handling** — Did the platform correctly assess whether the user caught or missed the hidden trap?

**Verdict:** PASS (all good), WARNING (minor issues), FAIL (scoring wildly off or critical quality failures)

---

## 4. QA Test Results — 4 Iterations

### 4.1 What Changed Between Iterations

| Iteration | What Was Fixed |
|---|---|
| Baseline (2 tests) | No fixes — measured original behavior |
| Iteration 1 (10 tests) | Added: completeness check, trap miss penalty (≤30), trap catch bonus (≥60), single-attempt penalty, calibration anchors |
| Iteration 2 (10 tests) | Fixed: unique email generation (auth collisions), rewrote trap evaluation as binary 2-step process |
| Iteration 3 (10 tests) | Added: server-side hard caps (iteration_skill ≤ 30, prompt_sophistication ≤ 35, truncation detection ≤ 40), adjusted expected score ranges |
| Iteration 4 (10 tests) | Final run with all fixes in place |

### 4.2 Results Progression

| Metric | Baseline | Iter 1 | Iter 2 | Iter 3 | Iter 4 (final) |
|---|---|---|---|---|---|
| Tests | 2 | 10 | 10 | 10 | 10 |
| PASS | 0% | 10% | 60% | 40% | **50%** |
| WARNING | 100% | 30% | 10% | 50% | **40%** |
| FAIL | 0% | 60% | 30% | 10% | **10%** |
| Feedback Quality | — | 3.6/5 | 4.9/5 | 4.1/5 | **4.0/5** |
| Expert Quality | — | 4.4/5 | 5/5 | 4.8/5 | **4.9/5** |
| Task Relevance | — | 5/5 | 5/5 | 5/5 | **5/5** |
| "good" avg score | 83 | — | 76 | 72 | **57** |
| "bad" avg score | 22 | — | 26 | 35 | **30** |

### 4.3 Known Remaining Issues

1. **LLM hallucination (1/10 in iter 4):** Platform discussed content not present in the submission. Scored 65 for a "bad" quality response. This is an inherent LLM limitation — the evaluator occasionally fabricates observations about the submission text. Cannot be fully fixed via prompts.

2. **Minor calibration drift (±5 points):** Some "good" quality submissions score 2-5 points above the expected range. The meta-evaluator flags these as WARNING, not FAIL. Acceptable variance for LLM-based evaluation.

3. **Prompt-level caps not always followed:** Despite explicit instructions, Claude sometimes ignores the human_judgment ≤ 30 cap for trap misses. The server-side caps for iteration_skill and prompt_sophistication are hard-enforced, but human_judgment and output_quality truncation caps currently rely on Claude following the prompt.

---

## 5. Key Source Files for Review

| File | Purpose |
|---|---|
| `live-site/src/lib/kimi/prompts.ts` | All system prompts (TASK_GENERATION_PROMPT, EVALUATION_PROMPT) |
| `live-site/src/app/api/evaluate/route.ts` | Evaluation API route with server-side caps |
| `live-site/src/app/api/generate-tasks/route.ts` | Task generation API route |
| `live-site/src/lib/assessment/scoring.ts` | Assessment score calculation |
| `live-site/src/types/index.ts` | TypeScript type definitions |
| `qa-tester/src/platform/replayer.ts` | QA system's platform replay logic |
| `qa-tester/src/meta-eval/meta-evaluator.ts` | Meta-evaluator prompt and logic |
| `qa-tester/src/generators/response-generator.ts` | Synthetic response generation |
| `qa-tester/src/config.ts` | Expected score ranges per quality level |

---

## 6. Questions for the Reviewer

1. Are the server-side caps (iteration_skill ≤ 30, prompt_sophistication ≤ 35) appropriate, or do they make scoring too harsh for users who submit strong single-attempt work?

2. The human_judgment trap penalty (≤ 30 for miss, ≥ 60 for catch) is currently a prompt-level instruction that Claude sometimes ignores. Should this also be enforced server-side? The challenge: the server doesn't know if the trap was caught — only Claude's evaluation text contains that assessment.

3. Is the truncation detection regex too aggressive or too permissive? Current signals: ends mid-word without punctuation, ends with "..." under 500 chars, or total length under 100 chars.

4. The "good" quality synthetic responses sometimes score in the 55-70 range (expected 40-75). Is this expected behavior or should we tighten the evaluation further?

5. Is the meta-evaluator itself calibrated correctly? It uses expected score ranges that we adjusted in iteration 3. An independent check of whether those ranges are reasonable would be valuable.

---

## 7. Report File Locations

All reports are on the server at:
```
/home/molt/projekt/AWF-aiworkfluency/qa-tester/reports/
```

| File | Description |
|---|---|
| `qa-2026-03-14T08-52-03.json` | Baseline (2 tests) |
| `qa-2026-03-14T09-02-35.json` | Iteration 1 (10 tests) |
| `qa-2026-03-14T12-10-15.json` | Iteration 2 (10 tests) |
| `qa-2026-03-14T12-28-36.json` | Iteration 3 (10 tests) |
| `qa-2026-03-14T12-49-41.json` | Iteration 4 — FINAL (10 tests) |

Each `.json` file contains the complete audit trail: profile used, task generated, synthetic response, platform evaluation (all dimension scores + feedback), meta-evaluation verdict, token usage, and timing. Corresponding `.html` files are visual dashboards.
