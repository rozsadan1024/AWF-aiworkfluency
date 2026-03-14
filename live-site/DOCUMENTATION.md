# AI Work Fluency - Project Documentation

**Last updated:** 2026-03-06
**Version:** 0.1.0
**Status:** Production (deployed)

---

## 1. Overview

AI Work Fluency is an AI skills training platform serving both B2C individuals and B2B companies. Instead of generic AI courses, it generates personalized practice tasks based on each user's actual job role. Every task includes a hidden trap (subtle error, inconsistency, or judgment call) that tests whether users blindly accept AI output or apply critical thinking.

**Two audiences:**
- **B2C (/)** — Individuals who want to future-proof their careers with measurable AI skills. Pricing: $9/mo Basic, $19/mo Pro.
- **B2B (/corp)** — Companies training entire teams. Pricing: €19-€26/seat, enterprise custom.

**Core flow:** Signup → Role Onboarding → 3 Personalized Tasks (beginner/intermediate/advanced) → AI Workspace (3 turns) → Submit Deliverable → AI Evaluation (5 dimensions) → Expert Course

**Live URL:** https://aiworkfluency.com/
**Deployment:** Docker on VPS (31.97.33.174), reverse-proxied by Caddy with basic auth

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router, standalone) | 14.2.20 |
| Language | TypeScript | 5.7.0 |
| Styling | Tailwind CSS | 3.4.17 |
| Icons | Lucide React | 0.460.0 |
| Database + Auth | Supabase (PostgreSQL) | 2.49.0 |
| AI - Task Gen | Claude Haiku 4.5 | claude-haiku-4-5-20251001 |
| AI - Evaluation | Claude Sonnet 4.5 | claude-sonnet-4-5-20250929 |
| AI - Workspace | Claude Haiku 4.5 | claude-haiku-4-5-20251001 |
| AI - Profile Parse | Claude Sonnet 4.5 | claude-sonnet-4-5-20250929 |
| Anthropic SDK | @anthropic-ai/sdk | 0.74.0 |
| Validation | Zod | 3.24.0 |
| Charts | Recharts | 2.15.0 |
| Testing | Playwright | 1.58.2 |
| Reverse Proxy | Caddy | latest |

---

## 3. Project Structure

```
live-site/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Root redirect → /en
│   │   ├── layout.tsx                  # Root layout + Providers
│   │   ├── globals.css
│   │   ├── [locale]/page.tsx           # B2C homepage (en/hu)
│   │   ├── corp/[locale]/page.tsx     # B2B homepage (en/hu)
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── callback/route.ts       # OAuth email confirmation
│   │   ├── assessment/
│   │   │   ├── page.tsx                # 3-block quiz
│   │   │   └── results/page.tsx
│   │   ├── onboarding/page.tsx         # Role profile intake
│   │   ├── dashboard/page.tsx          # Task list + progress
│   │   ├── task/[id]/
│   │   │   ├── page.tsx                # Task detail
│   │   │   ├── workspace/page.tsx      # AI chat workspace
│   │   │   ├── submit/page.tsx         # Submit deliverable
│   │   │   ├── evaluation/page.tsx     # Evaluation results
│   │   │   └── course/page.tsx         # Expert approach lesson
│   │   ├── team/
│   │   │   ├── page.tsx                # Team dashboard (manager)
│   │   │   └── invite/page.tsx         # Invite members
│   │   ├── eu-ai-act/page.tsx          # Compliance info
│   │   ├── esettanulmanyok/page.tsx     # Case studies
│   │   ├── rolunk/page.tsx             # About us
│   │   ├── roi-kalkulator/page.tsx     # ROI calculator
│   │   └── api/
│   │       ├── generate-tasks/route.ts
│   │       ├── evaluate/route.ts
│   │       ├── workspace/chat/route.ts
│   │       ├── parse-profile/route.ts
│   │       ├── generate-report/route.ts
│   │       └── generate-daily/route.ts
│   ├── components/
│   │   ├── Providers.tsx               # LanguageProvider wrapper
│   │   ├── SiteNav.tsx
│   │   └── SiteFooter.tsx
│   ├── lib/
│   │   ├── i18n/
│   │   │   ├── dictionaries.ts         # EN/HU translations (700+ keys)
│   │   │   └── LanguageContext.tsx      # React context + useLanguage()
│   │   ├── supabase/
│   │   │   ├── server.ts               # SSR client (cookies)
│   │   │   └── client.ts               # Browser client (anon key)
│   │   ├── kimi/
│   │   │   ├── client.ts               # Anthropic SDK instance + extractJSON()
│   │   │   └── prompts.ts              # All system prompts (~2000 lines)
│   │   ├── assessment/
│   │   │   ├── scoring.ts              # Score calculation (5 metrics)
│   │   │   └── questions.ts            # Quiz questions
│   │   └── knowledge-base/
│   │       └── admin.ts                # Admin role knowledge for task gen
│   ├── types/index.ts                  # TypeScript interfaces
│   └── middleware.ts                   # Auth middleware (Edge runtime)
├── public/                             # Static assets
├── next.config.js                      # Standalone output, redirects
├── Dockerfile                          # Multi-stage (node:22-alpine)
├── .dockerignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── supabase-schema.sql                 # Database DDL
```

---

## 4. Database Schema

All tables have Row Level Security (RLS). Users can only access their own data.

### Tables

**profiles** — extends auth.users
- `id` UUID (PK, FK → auth.users)
- `email`, `full_name`
- `subscription_tier` (free|basic|pro)
- `onboarding_completed` BOOLEAN

**role_profiles** — job role intake
- `user_id`, `job_description`, `pain_point_task`, `typical_morning`
- `tools_used` TEXT[]
- `parsed_profile` JSONB (structured role data from AI parsing)

**assessments** — quiz results
- `user_id`, `answers` JSONB, `scores` JSONB
- `ai_exposure_score`, `adaptability_index`, `current_ai_competence`
- `awareness_gap`, `action_readiness`, `report_text`

**tasks** — generated practice tasks
- `user_id`, `title`, `scenario`, `input_materials` JSONB
- `difficulty` (beginner|intermediate|advanced)
- `estimated_minutes`, `skills_tested` TEXT[]
- `evaluation_rubric` JSONB (includes hidden trap — not shown to user)
- `expert_solution` JSONB, `micro_course_content` TEXT
- `status` (pending → in_progress → submitted → evaluated)

**conversations** — workspace chat history
- `task_id`, `user_id`, `turn_number`
- `user_message`, `ai_response`
- `model_used`, `input_tokens`, `output_tokens`

**submissions** — task deliverables
- `task_id`, `user_id`, `final_output`
- `prompts_used`, `process_description`
- `tools_used` TEXT[], `time_spent_minutes`

**evaluations** — AI evaluation results
- `submission_id`, `task_id`, `user_id`
- `overall_score` DECIMAL
- `dimension_scores` JSONB (5 dimensions with score + feedback)
- `feedback_text`, `improvement_tips` TEXT[]

**user_progress** — progress tracking
- `user_id` (UNIQUE), `tasks_completed`, `average_score`
- `streak_days`, `skill_scores` JSONB
- `level` (novice|learner|practitioner|proficient|expert)

### Auto-trigger
`handle_new_user()` — Creates a profiles row automatically when auth.users gets a new signup.

---

## 5. API Routes

### POST /api/generate-tasks
Generates 3 personalized tasks (beginner, intermediate, advanced) in parallel.
- **Auth:** Required (reads user's role_profile + assessment)
- **AI:** 3x Claude Haiku calls (parallel via Promise.allSettled)
- **Max tokens:** 8192 per task
- **JSON repair:** Handles truncated/malformed output with bracket-closing logic
- **Retry:** Retries once on JSON parse failure
- **Output:** `{ tasks: Task[] }` (0-3 tasks, partial success allowed)

### POST /api/evaluate
Evaluates a submitted task deliverable.
- **Input:** `{ submission_id, task_id }`
- **AI:** Claude Sonnet (full workspace history included as context)
- **Dimensions:** output_quality (35%), ai_leverage (25%), prompt_sophistication (15%), human_judgment (15%), iteration_skill (10%)
- **Hidden trap check:** Boosts human_judgment if user caught the trap
- **Output:** EvaluationResult with scores, feedback, tips

### POST /api/workspace/chat
Multi-turn AI workspace for completing tasks.
- **Input:** `{ task_id, message }`
- **AI:** Claude Haiku
- **Turn limit:** 3 (configurable via WORKSPACE_MAX_TURNS)
- **Context:** Task scenario + input materials + conversation history
- **Output:** `{ response, turn_number, turns_used, turns_remaining }`

### POST /api/parse-profile
Parses narrative role description into structured data.
- **Input:** `{ jobDescription, painPoint, typicalMorning, tools }`
- **AI:** Claude Sonnet
- **Output:** Structured JSONB (role_type, industry, key_tasks, etc.)

### POST /api/generate-report
Generates personalized assessment narrative from quiz scores.
- **Input:** `{ scores, lang }`
- **AI:** Claude Sonnet

### GET /auth/callback
OAuth email confirmation callback. Exchanges code for session, redirects to /dashboard or /onboarding.

---

## 6. Evaluation System

### 5 Dimensions (weighted)

| Dimension | Weight | What it measures |
|---|---|---|
| Output Quality | 35% | Professional, complete, audience-appropriate deliverable |
| AI Leverage | 25% | Effective AI usage — not too little, not blindly |
| Prompt Sophistication | 15% | Specific prompts with role/audience/format/tone/context |
| Human Judgment | 15% | Value-add beyond AI, error catching, hidden trap detection |
| Iteration Skill | 10% | Refinement across multiple workspace turns |

### Score Calibration
- **0-25:** Minimal — little AI usage, copy-pasted first output
- **26-50:** Basic — some usage, generic prompts, minimal editing
- **51-75:** Competent — reasonable usage, 2-3 prompt dimensions, some editing
- **76-100:** Strong — skilled usage, 4-5 prompt dimensions, professional-grade

### Hidden Trap System
Every task contains exactly one hidden trap (e.g., numbers that don't add up, confidential data mixed with public, wrong recipient, contradictory info). The trap is stored in `evaluation_rubric.hidden_trap` and never shown to the user. If the user's submission shows they caught the trap, the human_judgment score gets a significant boost.

---

## 7. i18n System

**Approach:** Custom React Context + TypeScript dictionary (no i18n library).

- **Languages:** English (en), Hungarian (hu)
- **Default:** English
- **Key count:** 800+ per language
- **Detection:** URL param `?lang=en|hu` → localStorage `app_lang` → default

**Files:**
- `src/lib/i18n/dictionaries.ts` — All translations, keyed by feature prefix (auth_, dash_, task_, eval_, course_, team_, b2c_, etc.)
- `src/lib/i18n/LanguageContext.tsx` — `useLanguage()` hook returns `{ lang, t, setLang }`
- `src/components/Providers.tsx` — Wraps app with LanguageProvider

**AI content language:** Task generation and evaluation prompts enforce English output via `LANGUAGE — MANDATORY` instruction in system prompts, regardless of user input language.

**Progressive loading messages:** Both task generation (dashboard) and evaluation (submit) show rotating encouraging messages every 10 seconds during long AI operations. Dictionary keys: `dash_gen_msg_1..6` and `sub_eval_msg_1..5`.

---

## 8. Authentication & Middleware

**Auth provider:** Supabase Auth (email/password)

**Flow:**
1. Signup → email confirmation → `/auth/callback?next=/onboarding`
2. Onboarding → role profile → generates first tasks → `/dashboard`
3. Login → `/dashboard`

**Middleware** (`src/middleware.ts`):
- Runs on Edge runtime
- Protects: `/dashboard/*`, `/onboarding/*`, `/task/*`
- Auth paths: `/auth/login`, `/auth/signup`
- Uses Supabase SSR cookie refresh
- **Important:** `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be inlined at Docker build time (Edge runtime cannot read runtime env vars)

---

## 9. Environment Variables

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=           # Supabase project URL (build-time required)
NEXT_PUBLIC_SUPABASE_ANON_KEY=      # Supabase anon key (build-time required)
SUPABASE_SERVICE_ROLE_KEY=          # Service role key (server-side only)
NEXT_PUBLIC_APP_URL=                # App URL for auth callbacks

# Anthropic
ANTHROPIC_API_KEY=                  # Claude API key
ANTHROPIC_MODEL=                    # Evaluation model (claude-sonnet-4-5-20250929)

# Workspace
WORKSPACE_MODEL=                    # Workspace chat model (claude-haiku-4-5-20251001)
WORKSPACE_MAX_TURNS=3               # Max AI turns per task
WORKSPACE_QUICK_TURNS=2             # Quick task turn limit

# Task Generation (optional)
TASK_GEN_MODEL=                     # Defaults to claude-haiku-4-5-20251001
```

---

## 10. Deployment

### Build & Deploy

```bash
# Set build-time env vars and build Docker image
export $(grep 'NEXT_PUBLIC' /opt/aiproof/.env | xargs)
cd /home/molt/projekt/AWF-aiworkfluency/live-site
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
  -t aiproof-aiproof:latest .

# Deploy
cd /opt/aiproof
docker stop aiproof-app; docker rm aiproof-app
docker compose up -d
```

**Critical:** NEXT_PUBLIC_* vars must be passed as build args because Next.js inlines them at build time for client components and Edge middleware.

### Infrastructure
- **VPS:** 31.97.33.174
- **Reverse proxy:** Caddy with basic auth
- **Container:** `aiproof-app` on port 3100 (internal) → 3000 (container)
- **Runtime env:** Loaded from `/opt/aiproof/.env` via docker-compose `env_file`
- **Healthcheck:** wget to localhost:3000 every 30s

### Docker Architecture
Multi-stage build (node:22-alpine):
1. **deps** — `npm ci` (production + dev)
2. **builder** — `npm run build` with NEXT_PUBLIC_* inlined
3. **runner** — standalone output only, non-root user (nextjs:nodejs)

---

## 11. User Journey

```
B2C Homepage (/en) — or B2B Homepage (/corp/en)
    ↓
Assessment Quiz (/assessment) — optional, 3-block quiz (skipped if already logged in)
    ↓
Signup (/auth/signup) → Email confirmation → Callback
    ↓
Onboarding (/onboarding)
  - Job description, pain point, typical morning, tools
  - AI parses role → saves structured profile
    ↓
Dashboard (/dashboard)
  - Auto-generates 3 tasks (beginner/intermediate/advanced)
  - Tasks appear incrementally as they're generated
    ↓
Task Detail (/task/[id])
  - Read scenario + input materials
    ↓
AI Workspace (/task/[id]/workspace)
  - 3-turn AI conversation to complete the task
  - Context: task scenario + input materials
    ↓
Submit (/task/[id]/submit)
  - Paste final deliverable, select tools used
  - Triggers immediate AI evaluation
    ↓
Evaluation (/task/[id]/evaluation)
  - Overall score + 5 dimension scores
  - Top strength, top improvement, 3 tips
    ↓
Expert Course (/task/[id]/course)
  - Expert approach step-by-step
  - Expert prompts with copy buttons
  - Prompt dimension analysis (what's missing)
  - User vs expert prompt comparison
  - Key lesson + practice exercise
    ↓
Back to Dashboard → Generate new tasks
```

---

## 12. Key Design Decisions

1. **Haiku for generation, Sonnet for evaluation** — Haiku is faster and cheaper for task/workspace generation; Sonnet provides better judgment for evaluation scoring.

2. **Hidden traps in every task** — Core differentiator. Tests human judgment rather than just AI skill. Users who blindly forward AI output score lower.

3. **3 workspace turns** — Forces deliberate prompt crafting rather than trial-and-error. Users must think before prompting.

4. **No i18n library** — Simple dictionary + React Context is sufficient for 2 languages. Avoids heavy dependencies.

5. **Promise.allSettled for task generation** — Partial success: if 1 of 3 tasks fails, the other 2 still appear.

6. **JSON repair + retry** — LLM output is inherently unreliable. Multi-layer repair (strip fences, fix commas, close brackets, retry on failure).

7. **Standalone Next.js in Docker** — Minimal image size, no dev dependencies in production.

8. **Edge middleware for auth** — Fast auth checks without hitting Node.js server. But requires build-time env var inlining.

---

## 13. Routing Map

```
/                       → redirect to /en
/en                     → B2C homepage (individuals)
/hu                     → B2C homepage (Hungarian)
/corp/en                → B2B homepage (companies)
/corp/hu                → B2B homepage (Hungarian)
/assessment             → AI skills quiz (redirects to /dashboard if logged in)
/auth/login             → Login
/auth/signup            → Signup
/auth/callback          → OAuth callback
/onboarding             → Role profile intake (protected)
/dashboard              → Task list + progress (protected)
/task/[id]              → Task detail (protected)
/task/[id]/workspace    → AI chat workspace (protected)
/task/[id]/submit       → Submit deliverable (protected)
/task/[id]/evaluation   → Evaluation results (protected)
/task/[id]/course       → Expert approach lesson (protected)
/team                   → Team dashboard (protected)
/team/invite            → Invite members (protected)
/eu-ai-act              → EU AI Act compliance info
/esettanulmanyok        → Case studies
/rolunk                 → About us
/roi-kalkulator         → ROI calculator
```

---

## 14. Session Changes Log (2026-03-06)

### Changes made this session:

1. **B2B homepage moved to /corp** — `src/app/corp/[locale]/page.tsx` (copy of original with updated nav/locale links)
2. **New B2C homepage at /[locale]** — Individual-focused messaging, $9/$19/Teams pricing, urgency-driven copy
3. **~80 new B2C dictionary keys** (EN + HU) — `b2c_*` prefix in `dictionaries.ts`
4. **Progressive loading messages (task generation)** — 6 rotating messages every 10s in `dashboard/page.tsx`, keys `dash_gen_msg_1..6`
5. **Progressive loading messages (evaluation)** — 5 rotating messages every 10s in `submit/page.tsx`, keys `sub_eval_msg_1..5`
6. **All AI output forced to English** — `TASK_GENERATION_PROMPT`, `EVALUATION_PROMPT`, `DAILY_TASK_PROMPT` in `prompts.ts` now enforce English regardless of input language
7. **Assessment page skips for logged-in users** — Redirects to `/dashboard` if authenticated
8. **Hungarian marketing pages fully i18n'd** — eu-ai-act, esettanulmanyok, rolunk, roi-kalkulator all use `getDictionary(defaultLocale)` + dictionary keys
