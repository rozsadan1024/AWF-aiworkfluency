-- =============================================
-- AIProof Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'pro')),
  subscription_expires_at TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT FALSE
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Assessment results
CREATE TABLE public.assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  scores JSONB NOT NULL,
  ai_exposure_score DECIMAL(5,2),
  adaptability_index DECIMAL(5,2),
  current_ai_competence DECIMAL(5,2),
  awareness_gap DECIMAL(5,2),
  action_readiness DECIMAL(5,2),
  report_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role profiles (from deep-dive)
CREATE TABLE public.role_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_description TEXT,
  pain_point_task TEXT,
  typical_morning TEXT,
  tools_used TEXT[],
  industry TEXT,
  company_size TEXT,
  parsed_profile JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  scenario TEXT NOT NULL,
  input_materials JSONB,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_minutes INTEGER,
  skills_tested TEXT[],
  evaluation_rubric JSONB,
  expert_solution JSONB,
  micro_course_content TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'submitted', 'evaluated')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Submissions
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  final_output TEXT NOT NULL,
  prompts_used TEXT,
  process_description TEXT,
  tools_used TEXT[],
  time_spent_minutes INTEGER,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Evaluations
CREATE TABLE public.evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
  overall_score DECIMAL(5,2),
  dimension_scores JSONB,
  feedback_text TEXT,
  improvement_tips TEXT[],
  evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  tasks_completed INTEGER DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ,
  skill_scores JSONB DEFAULT '{}',
  level TEXT DEFAULT 'novice' CHECK (level IN ('novice', 'learner', 'practitioner', 'proficient', 'expert')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Row Level Security
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Assessments: users can CRUD their own
CREATE POLICY "Users can view own assessments" ON public.assessments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own assessments" ON public.assessments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Role profiles: users can CRUD their own
CREATE POLICY "Users can view own role_profiles" ON public.role_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own role_profiles" ON public.role_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own role_profiles" ON public.role_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Tasks: users can view/update their own
CREATE POLICY "Users can view own tasks" ON public.tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tasks" ON public.tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks" ON public.tasks FOR UPDATE USING (auth.uid() = user_id);

-- Submissions: users can CRUD their own
CREATE POLICY "Users can view own submissions" ON public.submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON public.submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Evaluations: users can view their own
CREATE POLICY "Users can view own evaluations" ON public.evaluations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own evaluations" ON public.evaluations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Progress: users can CRUD their own
CREATE POLICY "Users can view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- Conversations (Workspace Chat)
-- =============================================

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

-- =============================================
-- Schema additions (added after initial deploy)
-- =============================================

ALTER TABLE public.evaluations ADD COLUMN IF NOT EXISTS top_strength TEXT;
ALTER TABLE public.evaluations ADD COLUMN IF NOT EXISTS top_improvement TEXT;
