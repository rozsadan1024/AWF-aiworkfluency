# AI Work Fluency

**Live deployment:** https://aiworkfluency.com/
**Last updated:** 2026-03-03

---

## What This Is

AI Work Fluency is a **personalized AI skills training platform** for office/administrative professionals. It targets the **Hungarian B2B market** (enterprise team licenses for employee upskilling).

The core idea: instead of generic "Introduction to AI" courses, every employee gets practice tasks **generated specifically for their actual job**. A marketing manager practices campaign strategy. An HR coordinator practices onboarding workflows. An office manager practices expense reporting. Same platform, completely different training.

### The User Journey

```
Signup → Onboarding (describe your job) → Dashboard (3 personalized tasks) →
Open Task → Use AI Workspace (5 turns) → Submit Final Output →
AI Evaluation (7 dimensions, 0-100) → Expert Course (how a pro would do it)
```

### Key Differentiator: Hidden Traps

Every generated task contains a **hidden trap** — a subtle error, inconsistency, or judgment call woven into the scenario (e.g., numbers that don't add up, confidential data that shouldn't be forwarded, a deadline on a weekend). Users who catch the trap and handle it correctly score higher on the "Human Judgment" dimension. Users who blindly pass AI output through without noticing the trap score lower. This tests the critical skill that separates effective AI users from passive ones.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2.20 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (custom `brand` color palette) |
| Database + Auth | Supabase (PostgreSQL + Auth + RLS) |
| AI (task generation) | Anthropic Claude Haiku 4.5 |
| AI (evaluation) | Anthropic Claude Sonnet 4.5 |
| AI (workspace chat) | Anthropic Claude Haiku 4.5 |
| AI (profile parsing) | Anthropic Claude Sonnet 4.5 |
| i18n | Custom dictionary system (React Context) |
| Icons | Lucide React |
| Deployment | Docker (standalone Next.js) on VPS |
| Reverse proxy | Caddy |
| Testing | Playwright (E2E) |

---

## Project Structure

```
src/
├── app/                           # Next.js App Router pages
│   ├── page.tsx                   # Redirects to /hu (Hungarian landing)
│   ├── [locale]/page.tsx          # Bilingual B2B landing page (SSG)
│   ├── auth/
│   │   ├── login/page.tsx         # Login form
│   │   ├── signup/page.tsx        # Signup form
│   │   └── callback/route.ts     # Supabase auth callback
│   ├── assessment/                # Optional pre-signup AI readiness quiz
│   │   ├── page.tsx               # Assessment questions
│   │   └── results/page.tsx       # Assessment results + signup CTA
│   ├── onboarding/page.tsx        # Job description intake (4 fields)
│   ├── dashboard/page.tsx         # Task list + progress stats
│   ├── task/[id]/
│   │   ├── page.tsx               # Task detail + inline AI workspace
│   │   ├── submit/page.tsx        # Submit final deliverable
│   │   ├── evaluation/page.tsx    # Score breakdown (7 dimensions)
│   │   ├── course/page.tsx        # Expert approach + prompt comparison
│   │   └── workspace/page.tsx     # Standalone workspace (legacy)
│   ├── api/
│   │   ├── generate-tasks/route.ts    # Generate 3 personalized tasks
│   │   ├── generate-daily/route.ts    # Generate quick daily task
│   │   ├── evaluate/route.ts          # AI evaluation of submission
│   │   ├── workspace/chat/route.ts    # AI workspace conversation
│   │   ├── parse-profile/route.ts     # Parse job description → structured profile
│   │   └── generate-report/route.ts   # Assessment report generation
│   ├── team/                      # Team management (stub)
│   ├── roi-kalkulator/            # ROI calculator page
│   ├── eu-ai-act/                 # EU AI Act info page
│   ├── esettanulmanyok/           # Case studies page
│   └── rolunk/                    # About us page
├── components/
│   ├── Providers.tsx              # Client wrapper (LanguageProvider)
│   ├── SiteNav.tsx                # Landing page navigation
│   └── SiteFooter.tsx             # Landing page footer
├── lib/
│   ├── i18n/
│   │   ├── dictionaries.ts        # All UI strings (EN + HU, ~270 keys each)
│   │   └── LanguageContext.tsx     # React context: useLanguage() → { t, lang, setLang }
│   ├── kimi/                      # (named historically, uses Anthropic now)
│   │   ├── client.ts              # Anthropic SDK init + extractJSON helper
│   │   └── prompts.ts             # All AI prompts (task gen, evaluation, profile, report)
│   ├── supabase/
│   │   ├── client.ts              # Browser Supabase client
│   │   └── server.ts              # Server Supabase client (cookies-based)
│   ├── knowledge-base/
│   │   └── admin.ts               # Admin role knowledge base (sub-roles, task categories)
│   └── assessment/
│       ├── questions.ts           # Assessment quiz questions
│       └── scoring.ts             # Assessment scoring logic
├── middleware.ts                   # Auth protection for /dashboard, /task, /onboarding
└── types/index.ts                 # All TypeScript interfaces
```

---

## Database Schema (Supabase)

8 tables with Row-Level Security. Full schema in `supabase-schema.sql`.

| Table | Purpose | Key Fields |
|---|---|---|
| `profiles` | User accounts (extends auth.users) | `id`, `email`, `full_name`, `onboarding_completed` |
| `role_profiles` | Parsed job descriptions | `job_description`, `pain_point_task`, `typical_morning`, `tools_used`, `parsed_profile` (JSONB) |
| `assessments` | Optional AI readiness quiz results | `scores` (JSONB), `ai_exposure_score`, `current_ai_competence` |
| `tasks` | Generated practice tasks | `title`, `scenario`, `input_materials`, `difficulty`, `evaluation_rubric` (has `hidden_trap`), `expert_solution`, `micro_course_content`, `status` |
| `submissions` | User-submitted work | `final_output`, `tools_used`, `time_spent_minutes` |
| `evaluations` | AI-generated scores | `overall_score`, `dimension_scores` (7 dimensions), `feedback_text`, `improvement_tips` |
| `user_progress` | Gamification stats | `tasks_completed`, `average_score`, `streak_days`, `level` |
| `conversations` | Workspace chat turns | `task_id`, `turn_number`, `user_message`, `ai_response`, `model_used`, `input_tokens`, `output_tokens` |

**Note:** The `conversations` table was added after the initial schema. You may need to create it manually:

```sql
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  turn_number INTEGER NOT NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  model_used TEXT,
  input_tokens INTEGER,
  output_tokens INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own conversations" ON public.conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON public.conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
```

The `evaluations` table also has `top_strength` and `top_improvement` TEXT columns that may need adding:

```sql
ALTER TABLE public.evaluations ADD COLUMN IF NOT EXISTS top_strength TEXT;
ALTER TABLE public.evaluations ADD COLUMN IF NOT EXISTS top_improvement TEXT;
```

---

## Core Flows (Detailed)

### 1. Signup + Onboarding

```
/auth/signup → Supabase auth → trigger creates profiles row
    → redirect to /onboarding
    → User fills 4 fields: job description, pain point, typical morning, tools
    → POST /api/parse-profile → Claude parses free text → structured profile (JSONB)
    → Save role_profile + mark onboarding_completed = true
    → Initialize user_progress (score=0, level=novice)
    → Redirect to /dashboard
```

### 2. Task Generation

```
/dashboard detects no tasks → auto-triggers POST /api/generate-tasks
    → Loads role_profile + assessment for user context
    → Fires 3 parallel Claude Haiku calls (beginner, intermediate, advanced)
    → Each task is inserted to Supabase INDIVIDUALLY as it completes
    → Dashboard polls Supabase every 3s, shows tasks incrementally (1/3, 2/3, 3/3)
    → JSON repair logic handles malformed Haiku output (trailing commas, unescaped newlines, truncated JSON)
```

**Task generation prompt** (`TASK_GENERATION_PROMPT` in `prompts.ts`):
- Generates title, scenario, input_materials, evaluation_criteria (with hidden_trap), expert_solution (approach, example_prompts, prompt_scorecard), micro_course_content
- Rule #1 (MANDATORY): Every task must contain a hidden trap
- Uses Hungarian names and companies
- Expert prompts must be 10-15 lines, 150-250 words, natural language
- Includes admin knowledge base for realistic scenarios

### 3. Inline AI Workspace

```
User opens /task/[id] → reads scenario + materials + instructions
    → Types prompt in inline workspace textarea → POST /api/workspace/chat
    → API scopes AI to task scenario (system prompt includes scenario + materials)
    → AI response displayed inline, 5 turns max (2 for quick tasks)
    → Full conversation saved to `conversations` table
    → Conversation auto-included in evaluation
```

### 4. Submission + Evaluation

```
User clicks "Submit" → /task/[id]/submit
    → Fills: final output (required), tools used (toggle buttons), time spent
    → Insert to `submissions` table → POST /api/evaluate
    → API loads: submission + task + conversations + hidden_trap
    → Claude Sonnet evaluates on 7 weighted dimensions:
        - Output Quality (30%)
        - AI Leverage (20%)
        - Prompt Sophistication (15%)
        - Human Judgment (15%) ← hidden trap detection here
        - Iteration Skill (10%)
        - Time Efficiency (5%)
        - Tool Selection (5%)
    → Returns 0-100 overall score + per-dimension scores + feedback
    → Saves to `evaluations` table, updates `user_progress`
    → Redirect to /task/[id]/evaluation
```

### 5. Expert Course

```
/task/[id]/course → shows micro_course_content (300-500 word lesson)
    → Expert step-by-step approach
    → Expert prompt with dimensions tagged (WHO, FOR WHOM, HOW, STYLE, WHY)
    → Side-by-side comparison: user prompt vs expert prompt (if available)
    → Gap analysis: what dimensions user missed
    → Practice exercise: ready-to-copy rewrite
```

---

## AI Prompts

All prompts are in `src/lib/kimi/prompts.ts`. There are 5:

| Prompt | Model | Purpose |
|---|---|---|
| `TASK_GENERATION_PROMPT` | Haiku 4.5 | Generate personalized work tasks with hidden traps |
| `EVALUATION_PROMPT` | Sonnet 4.5 | Score submissions on 7 dimensions (0-100) |
| `PROFILE_PARSER_PROMPT` | Sonnet 4.5 | Parse free-text job description → structured JSON |
| `REPORT_GENERATOR_PROMPT` | Sonnet 4.5 | Generate assessment report narrative |
| `DAILY_TASK_PROMPT` | — | Generate quick 5-minute daily tasks |

The workspace chat uses an inline system prompt in `api/workspace/chat/route.ts` (scoped to the specific task scenario).

### Evaluation Scoring Calibration

- **0-25 Minimal:** No meaningful AI usage
- **26-50 Basic:** "Typed it into ChatGPT and copied the result"
- **51-75 Competent:** Decent prompt, some editing, usable result
- **76-100 Strong:** Expert-level, iteration, professional-grade output
- **90+:** Reserved for genuinely impressive work

---

## Internationalization (i18n)

The app uses a lightweight custom i18n system (no external library):

- **`src/lib/i18n/dictionaries.ts`** — ~270 key-value pairs per locale (EN and HU)
- **`src/lib/i18n/LanguageContext.tsx`** — React context providing `{ t, lang, setLang }`
- **`src/components/Providers.tsx`** — Wraps the app in `LanguageProvider`
- Default language: `hu` (Hungarian)
- Language stored in `localStorage('app_lang')`
- All UI strings use `t.key_name` pattern (e.g., `t.dash_your_tasks`, `t.eval_excellent`)

Key naming convention:
- `auth_*` — login/signup pages
- `dash_*` — dashboard
- `onb_*` — onboarding
- `task_*` — task detail
- `ws_*` — workspace
- `sub_*` — submit page
- `eval_*` — evaluation page
- `common_*` — shared strings
- `difficulty_*` — beginner/intermediate/advanced labels

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key (public, used client-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase service role key (server-side only) |
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key for Claude |
| `ANTHROPIC_MODEL` | No | Evaluation model (default: `claude-sonnet-4-5-20250929`) |
| `TASK_GEN_MODEL` | No | Task generation model (default: `claude-haiku-4-5-20251001`) |
| `WORKSPACE_MODEL` | No | Workspace chat model (default: `claude-haiku-4-5-20251001`) |
| `WORKSPACE_MAX_TURNS` | No | Max workspace turns per task (default: `5`) |
| `WORKSPACE_QUICK_TURNS` | No | Max turns for quick tasks (default: `2`) |

**Important:** `NEXT_PUBLIC_*` variables are inlined at build time by Next.js. They must be present in the Docker build stage (see Dockerfile).

---

## Deployment

### Architecture

```
Internet → Caddy (HTTPS, reverse proxy) → Docker container (port 3100) → Next.js standalone (port 3000)
```

### Production Setup

- **Server:** VPS
- **Container name:** `aiproof-app`
- **Internal port:** 3000 (container) → 3100 (host) → Caddy → HTTPS
- **Domain:** aiworkfluency.com
- **Docker image:** Built from this directory, tagged as `aiproof-aiproof:latest`
- **Production directory:** `/opt/aiproof/` (has docker-compose.yml + .env)

### Deploy Flow

```bash
# From /home/molt/projekt/AWF-aiworkfluency/live-site/
# NEXT_PUBLIC_* vars must be passed as build args (Next.js inlines them at build time)
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key \
  -t aiproof-aiproof:latest .

# From /opt/aiproof/
docker stop aiproof-app && docker rm aiproof-app
docker compose up -d
```

### Docker Build Notes

The Dockerfile uses a multi-stage build:
1. **deps** — `npm ci` (production + dev dependencies)
2. **builder** — `npm run build` (Next.js standalone output). `NEXT_PUBLIC_*` env vars are passed as build args and set as ENV because Next.js inlines them at build time.
3. **runner** — Production image with standalone output only. Runtime secrets (like `ANTHROPIC_API_KEY`) are passed via `.env` file / docker-compose `env_file`.

---

## Testing

### Playwright E2E Test

The full-flow test (`tests/full-flow.spec.ts`) walks through the complete user journey:

1. **Signup** — Creates account with unique email
2. **Onboarding** — Fills 4 job description fields
3. **Dashboard** — Waits for task generation (incremental display)
4. **Task Detail** — Opens first task, verifies Hungarian UI + inline workspace
5. **Workspace** — Sends a prompt, verifies AI response
6. **Submit** — Fills final output, selects tools, sets time
7. **Evaluation** — Verifies score (0-100), Hungarian labels, dimension breakdown

```bash
# Run tests (requires the app running on localhost:3100)
npx playwright test tests/full-flow.spec.ts

# Configuration in playwright.config.ts:
# - baseURL: http://localhost:3100
# - timeout: 180s per test
# - headless: true
# - screenshots on failure
```

---

## Gamification / Progress System

| Level | Requirements |
|---|---|
| Novice | Default |
| Learner | 3+ tasks completed |
| Practitioner | 6+ tasks, avg score >= 55 |
| Proficient | 12+ tasks, avg score >= 65 |
| Expert | 20+ tasks, avg score >= 75 |

- **Streak:** Incremented when user completes a task on consecutive days
- **Skill scores:** Exponential moving average (70% old + 30% new) per dimension
- **Progress displayed:** On dashboard as 4 stat cards (tasks done, avg score, streak, level)

---

## Authentication Flow

- Supabase Auth handles signup/login/session
- `middleware.ts` protects `/dashboard`, `/task`, `/onboarding` routes
- Unauthenticated users redirected to `/auth/login?redirect=<original_path>`
- Logged-in users accessing `/auth/*` redirected to `/dashboard`
- Supabase trigger auto-creates `profiles` row on signup
- Session managed via cookies (`@supabase/ssr`)

---

## Landing Page

The landing page at `/[locale]/page.tsx` is a **B2B marketing page** targeting Hungarian companies:

- **Hero:** "Tedd az AI-t a csapatod titkos fegyverévé" (Make AI your team's secret weapon)
- **Problem section:** Generic AI training doesn't work (same for everyone, theory not practice, no measurable outcomes)
- **Solution:** Every employee gets tasks generated for THEIR role
- **Examples:** Same job title, different company → completely different tasks
- **For Companies:** Real productivity gains, manager dashboard, measurable ROI, EU AI Act compliance
- **Pricing:** Per-seat monthly (Starter/Growth/Enterprise)
- **CTA:** "Próbáld ki most — Ingyenes" (Try it now — Free)

Static-generated for both `en` and `hu` locales. Root `/` redirects to `/hu`.

---

## Known Limitations / Technical Debt

1. **Course page not i18n'd** — `task/[id]/course/page.tsx` still has hardcoded English strings
2. **Conversations table missing from schema file** — Must be created manually (see SQL above)
3. **Build args for Supabase keys** — `NEXT_PUBLIC_*` Supabase keys must be passed as `--build-arg` during Docker build because Next.js inlines them. The Anthropic API key is runtime-only (passed via `.env`).
4. **No payment integration** — Pricing page exists but no actual billing
5. **Team management stub** — `/team` and `/team/invite` pages exist but are not fully functional
6. **Assessment flow optional** — Users can skip straight to signup without taking the assessment
7. **Workspace page redundant** — `/task/[id]/workspace/page.tsx` still exists as a standalone page but the main flow uses the inline workspace on `/task/[id]/page.tsx`
8. **JSON repair for Haiku** — Task generation includes multi-level JSON repair because Haiku occasionally produces malformed output (trailing commas, unescaped newlines, truncated JSON)
