-- =============================================
-- Quick Pill Module Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Curated knowledge pills (admin-managed)
CREATE TABLE public.qp_pills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  theme TEXT NOT NULL CHECK (theme IN ('prompt_craft','ai_literacy','workflow_hacks','tool_spotlight','critical_thinking','ai_news')),
  title TEXT NOT NULL,
  knowledge_text TEXT NOT NULL,
  task_prompt TEXT NOT NULL,
  task_type TEXT NOT NULL CHECK (task_type IN ('rewrite','classify','generate','analyze','compare')),
  difficulty TEXT DEFAULT 'easy' CHECK (difficulty IN ('easy','medium')),
  estimated_minutes INTEGER DEFAULT 5,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  source_url TEXT,
  source_date DATE,
  expires_at DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User submissions
CREATE TABLE public.qp_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pill_id UUID REFERENCES public.qp_pills(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Evaluations (3 metrics)
CREATE TABLE public.qp_evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID REFERENCES public.qp_submissions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  pill_id UUID REFERENCES public.qp_pills(id) ON DELETE CASCADE,
  overall_score INTEGER CHECK (overall_score BETWEEN 0 AND 100),
  understanding_score INTEGER CHECK (understanding_score BETWEEN 0 AND 100),
  application_score INTEGER CHECK (application_score BETWEEN 0 AND 100),
  readiness_score INTEGER CHECK (readiness_score BETWEEN 0 AND 100),
  understanding_feedback TEXT,
  application_feedback TEXT,
  readiness_feedback TEXT,
  feedback_summary TEXT,
  practical_tip TEXT,
  evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress (gamification)
CREATE TABLE public.qp_user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  pills_completed INTEGER DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  theme_scores JSONB DEFAULT '{}',
  streak_days INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_pill_at TIMESTAMPTZ,
  badges JSONB DEFAULT '[]',
  level TEXT DEFAULT 'curious' CHECK (level IN ('curious','explorer','practitioner','specialist','sage')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.qp_pills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qp_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qp_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qp_user_progress ENABLE ROW LEVEL SECURITY;

-- Pills: all authenticated users can read active pills
CREATE POLICY "Authenticated users can read active pills" ON public.qp_pills
  FOR SELECT USING (auth.role() = 'authenticated' AND active = TRUE);

-- Submissions: users CRUD their own
CREATE POLICY "Users can view own qp_submissions" ON public.qp_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own qp_submissions" ON public.qp_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Evaluations: users view their own
CREATE POLICY "Users can view own qp_evaluations" ON public.qp_evaluations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own qp_evaluations" ON public.qp_evaluations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Progress: users CRUD their own
CREATE POLICY "Users can view own qp_progress" ON public.qp_user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own qp_progress" ON public.qp_user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own qp_progress" ON public.qp_user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Index for fast pill lookup by user completion
CREATE INDEX idx_qp_evaluations_user_pill ON public.qp_evaluations(user_id, pill_id);
CREATE INDEX idx_qp_submissions_user_pill ON public.qp_submissions(user_id, pill_id);
