'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AssessmentScores, AssessmentAnswer } from '@/types';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Shield, ArrowRight, AlertTriangle, Loader2 } from 'lucide-react';

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="100" height="100" className="transform -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute mt-7 text-2xl font-bold" style={{ color }}>{score}</div>
      <p className="text-xs text-gray-600 mt-2 text-center font-medium">{label}</p>
    </div>
  );
}

const t = {
  en: {
    exposureHigh: 'Your role has significant overlap with what AI can do today. This is not a death sentence — but it means acting now gives you a real advantage.',
    exposureMod: 'Parts of your role will be affected by AI. You have time, but the professionals who adapt now will be the ones who thrive.',
    exposureLow: 'Your role has lower AI exposure than many office jobs. Still, building AI skills now makes you more valuable.',
    riskHigh: 'High', riskMod: 'Moderate', riskLow: 'Low',
    exposureLabel: 'Your AI Exposure:',
    scoreExposure: 'AI Exposure', scoreSkills: 'AI Skills', scoreAdapt: 'Adaptability', scoreGap: 'Awareness Gap', scoreReady: 'Action Ready',
    analysisTitle: 'Your Personalized Analysis', analysisLoading: 'Analyzing your responses...',
    scoresTitle: 'What Your Scores Mean',
    dimExposure: 'AI Exposure Score', dimExposureDesc: 'How much of your daily work overlaps with what AI can already do. Higher = more exposed.',
    dimCompetence: 'Current AI Competence', dimCompetenceDesc: 'Your current ability to use AI tools effectively for work. This is what AI Work Fluency helps you improve.',
    dimAdapt: 'Adaptability Index', dimAdaptDesc: 'Your psychological readiness to learn new ways of working. Good news: this can be developed.',
    dimGap: 'Awareness Gap', dimGapDesc: 'The delta between how safe you feel and how exposed you actually are. Above 50 = you may be underestimating the change coming.',
    dimReady: 'Action Readiness', dimReadyDesc: 'Your practical ability to act — time, autonomy, motivation. This determines how fast you can improve.',
    ctaTitle: 'Ready to start practicing?',
    ctaSub: 'Get personalized tasks that mirror your actual daily work. Practice solving them with AI. Get scored and learn the expert approach.',
    ctaButton: 'Create Free Account & Start',
    ctaNote: '3 free practice tasks included. No credit card needed.',
    fallback: 'Your assessment is complete. Sign up to get personalized practice tasks.',
    fallbackError: 'Your assessment is complete. Sign up to start practicing with personalized AI tasks tailored to your role.',
  },
  hu: {
    exposureHigh: 'A munkakörödnek jelentős átfedése van azzal, amit az AI ma már képes elvégezni. Ez nem végítélet — de azt jelenti, hogy aki most lép, annak igazi előnye lesz.',
    exposureMod: 'A munkaköreid egy részét érinti az AI. Van időd, de azok a szakemberek fognak nyerni, akik most alkalmazkodnak.',
    exposureLow: 'A munkakörödre kevésbé hat az AI, mint sok irodai pozícióra. De az AI-készségek fejlesztése most is értékesebbé tesz.',
    riskHigh: 'Magas', riskMod: 'Közepes', riskLow: 'Alacsony',
    exposureLabel: 'AI kitettséged:',
    scoreExposure: 'AI kitettség', scoreSkills: 'AI készségek', scoreAdapt: 'Alkalmazkodás', scoreGap: 'Tudatossági rés', scoreReady: 'Cselekvéskészség',
    analysisTitle: 'Személyre szabott elemzésed', analysisLoading: 'Válaszaid elemzése...',
    scoresTitle: 'Mit jelentenek a pontszámaid',
    dimExposure: 'AI kitettségi pontszám', dimExposureDesc: 'A napi munkád mekkora része fedi le azt, amit az AI már tud. Magasabb = nagyobb kitettség.',
    dimCompetence: 'Jelenlegi AI kompetencia', dimCompetenceDesc: 'A jelenlegi képességed az AI eszközök hatékony munkacélú használatára. Ebben segít az AI Work Fluency.',
    dimAdapt: 'Alkalmazkodási index', dimAdaptDesc: 'Pszichológiai felkészültséged az új munkamódszerek tanulására. Jó hír: ez fejleszthető.',
    dimGap: 'Tudatossági rés', dimGapDesc: 'A különbség aközött, mennyire érzed biztonságban magad, és mennyire vagy valójában kitéve. 50 felett = alábecsülheted a változást.',
    dimReady: 'Cselekvéskészség', dimReadyDesc: 'A gyakorlati képességed a cselekvésre — idő, autonómia, motiváció. Ez határozza meg, milyen gyorsan tudsz fejlődni.',
    ctaTitle: 'Készen állsz a gyakorlásra?',
    ctaSub: 'Személyre szabott feladatokat kapsz, amelyek a tényleges munkádat tükrözik. Oldd meg őket AI-val. Kapj pontszámot és tanuld meg a szakértői megközelítést.',
    ctaButton: 'Ingyenes fiók létrehozása',
    ctaNote: '3 ingyenes gyakorló feladat jár hozzá. Bankkártya nem szükséges.',
    fallback: 'A felmérésed elkészült. Regisztrálj a személyre szabott gyakorló feladatokhoz.',
    fallbackError: 'A felmérésed elkészült. Regisztrálj, és kezdj el gyakorolni a munkakörödre szabott AI feladatokkal.',
  },
};

export default function ResultsPage() {
  const [scores, setScores] = useState<AssessmentScores | null>(null);
  const [answers, setAnswers] = useState<AssessmentAnswer[] | null>(null);
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<'en' | 'hu'>('en');
  const router = useRouter();

  const l = t[lang];

  useEffect(() => {
    const raw = sessionStorage.getItem('assessment_scores');
    const rawAnswers = sessionStorage.getItem('assessment_answers');
    const urlLang = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('lang') : null;
    // Note: urlLang will be null during SSR, falls back to sessionStorage
    const sessionLang = typeof window !== 'undefined' ? sessionStorage.getItem('assessment_lang') : null;
    const storedLang = (urlLang === 'hu' || sessionLang === 'hu' ? 'hu' : 'en') as 'en' | 'hu';

    // Set lang state for UI, but also use it synchronously for the report call
    setLang(storedLang);

    if (!raw || !rawAnswers) {
      router.push('/assessment');
      return;
    }
    const s = JSON.parse(raw) as AssessmentScores;
    const a = JSON.parse(rawAnswers) as AssessmentAnswer[];
    setScores(s);
    setAnswers(a);
    // Pass storedLang directly — don't rely on state being updated yet
    generateReport(s, storedLang);
  }, [router]);

  async function generateReport(s: AssessmentScores, reportLang: 'en' | 'hu') {
    const fallbackText = t[reportLang].fallback;
    const fallbackError = t[reportLang].fallbackError;
    try {
      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores: s, lang: reportLang }),
      });
      const data = await res.json();
      setReport(data.report || fallbackText);
    } catch {
      setReport(fallbackError);
    }
    setLoading(false);
  }

  async function handleSignupAndSave() {
    setSaving(true);
    try {
      // Copy to localStorage so data survives email confirmation
      const scoresRaw = sessionStorage.getItem("assessment_scores");
      const answersRaw = sessionStorage.getItem("assessment_answers");
      const langRaw = sessionStorage.getItem("assessment_lang");
      if (scoresRaw) localStorage.setItem("assessment_scores", scoresRaw);
      if (answersRaw) localStorage.setItem("assessment_answers", answersRaw);
      if (langRaw) localStorage.setItem("assessment_lang", langRaw);
      localStorage.setItem("pending_assessment", "true");

      // Always redirect to signup - let auth flow handle logged-in users there
      await router.push("/auth/signup");
    } catch (err) {
      console.error("Signup redirect error:", err);
      try { await router.push("/auth/signup"); } catch (e) {}
    } finally {
      setSaving(false);
    }

  }

  if (!scores) return null;

  const riskLevel = scores.ai_exposure_score >= 70 ? 'high' : scores.ai_exposure_score >= 40 ? 'mod' : 'low';
  const riskColor = riskLevel === 'high' ? '#ef4444' : riskLevel === 'mod' ? '#f59e0b' : '#22c55e';
  const riskText = riskLevel === 'high' ? l.riskHigh : riskLevel === 'mod' ? l.riskMod : l.riskLow;
  const riskDesc = riskLevel === 'high' ? l.exposureHigh : riskLevel === 'mod' ? l.exposureMod : l.exposureLow;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={lang === 'hu' ? '/hu' : '/'} className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-600" />
            <span className="text-xl font-bold">AI Work Fluency</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Risk Banner */}
        <div className={`rounded-xl p-6 mb-8 ${
          riskLevel === 'high' ? 'bg-red-50 border border-red-200' :
          riskLevel === 'mod' ? 'bg-amber-50 border border-amber-200' :
          'bg-green-50 border border-green-200'
        }`}>
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" style={{ color: riskColor }} />
            <div>
              <h2 className="text-xl font-bold" style={{ color: riskColor }}>
                {l.exposureLabel} {riskText} ({scores.ai_exposure_score}/100)
              </h2>
              <p className="text-gray-700 mt-1">{riskDesc}</p>
            </div>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { score: scores.ai_exposure_score, label: l.scoreExposure, color: riskColor },
            { score: scores.current_ai_competence, label: l.scoreSkills, color: '#3b82f6' },
            { score: scores.adaptability_index, label: l.scoreAdapt, color: '#8b5cf6' },
            { score: scores.awareness_gap, label: l.scoreGap, color: '#f59e0b' },
            { score: scores.action_readiness, label: l.scoreReady, color: '#22c55e' },
          ].map((item) => (
            <div key={item.label} className="card flex flex-col items-center relative py-8">
              <ScoreRing score={item.score} label={item.label} color={item.color} />
            </div>
          ))}
        </div>

        {/* Report */}
        <div className="card mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{l.analysisTitle}</h3>
          {loading ? (
            <div className="flex items-center gap-3 text-gray-500 py-8 justify-center">
              <Loader2 className="w-5 h-5 animate-spin" />
              {l.analysisLoading}
            </div>
          ) : (
            <div className="prose prose-gray max-w-none">
              {report.split('\n\n').map((p, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          )}
        </div>

        {/* Dimension Breakdown */}
        <div className="card mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{l.scoresTitle}</h3>
          <div className="space-y-4">
            {[
              { label: l.dimExposure, score: scores.ai_exposure_score, desc: l.dimExposureDesc },
              { label: l.dimCompetence, score: scores.current_ai_competence, desc: l.dimCompetenceDesc },
              { label: l.dimAdapt, score: scores.adaptability_index, desc: l.dimAdaptDesc },
              { label: l.dimGap, score: scores.awareness_gap, desc: l.dimGapDesc },
              { label: l.dimReady, score: scores.action_readiness, desc: l.dimReadyDesc },
            ].map((dim) => (
              <div key={dim.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{dim.label}</span>
                  <span className="text-sm font-bold text-gray-900">{dim.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                  <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{
                      width: `${dim.score}%`,
                      backgroundColor: dim.score >= 70 ? '#ef4444' : dim.score >= 40 ? '#f59e0b' : '#22c55e',
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card bg-brand-600 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">{l.ctaTitle}</h3>
          <p className="text-brand-100 mb-6">{l.ctaSub}</p>
          <button
            onClick={handleSignupAndSave}
            className="bg-white text-brand-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-colors"
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {l.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-brand-200 text-sm mt-3">{l.ctaNote}</p>
        </div>
      </div>
    </div>
  );
}
