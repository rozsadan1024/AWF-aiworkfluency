import Link from 'next/link';
import { Shield, Target, TrendingUp, Brain, ArrowRight, Zap, BarChart3, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-brand-600" />
            <span className="text-xl font-bold text-gray-900">AIProof</span>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login" className="btn-secondary text-sm py-2 px-4">Log in</Link>
            <Link href="/assessment" className="btn-primary text-sm py-2 px-4">Take the Assessment</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-orange-50" />
        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
              <Zap className="w-4 h-4" />
              89% of HR leaders say AI will impact jobs in 2026
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              AI is changing your job.
              <br />
              <span className="text-brand-600">Are you ready?</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              AIProof gives you personalized practice tasks that mirror your actual daily work.
              Use AI to solve them, get scored on your approach, and learn the expert way.
              Think Duolingo, but for keeping your job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/assessment" className="btn-primary text-lg py-4 px-8 flex items-center gap-2 justify-center">
                Take the Free Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-gray-500 self-center">5 minutes. No signup required. See your AI Exposure Score.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '85M', label: 'Jobs displaced by AI by 2026 (WEF)' },
              { num: '50%', label: 'Of middle management positions at risk (WEF)' },
              { num: '78K', label: 'Tech jobs lost to AI in first half of 2025' },
              { num: '41%', label: 'Of employers plan to reduce staff due to AI' },
            ].map((stat) => (
              <div key={stat.num}>
                <div className="text-3xl sm:text-4xl font-extrabold text-brand-400 mb-2">{stat.num}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How AIProof Works</h2>
            <p className="text-lg text-gray-600">Learn by doing — not by watching tutorials</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                step: '1',
                title: 'Get a Real Task',
                desc: 'Based on YOUR actual job, we generate a realistic work scenario. Not a generic exercise — something that feels like it landed in your inbox this morning.',
              },
              {
                icon: Brain,
                step: '2',
                title: 'Solve It with AI',
                desc: 'Use any AI tools you want — ChatGPT, Claude, Copilot, whatever works. Submit your result along with your prompts and approach.',
              },
              {
                icon: BarChart3,
                step: '3',
                title: 'Get Scored & Learn',
                desc: "Our AI evaluates your work across 7 dimensions. Then you see exactly how an expert would've done it. The lesson sticks because you just experienced the challenge.",
              },
            ].map((item) => (
              <div key={item.step} className="card relative">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="pt-4">
                  <item.icon className="w-8 h-8 text-brand-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Office Professionals</h2>
            <p className="text-lg text-gray-600 mb-8">
              You spend your day in front of a computer — emails, spreadsheets, documents, scheduling.
              You&apos;ve read the headlines about AI replacing jobs. You know you should be doing something.
              You just don&apos;t know where to start.
            </p>
            <p className="text-lg text-gray-700 font-medium mb-10">
              AIProof is your starting point. Real practice. Real feedback. Real progress.
            </p>
            <Link href="/assessment" className="btn-primary text-lg py-4 px-8 inline-flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Start with the Free Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* 7 Dimensions */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">We Score You on 7 Dimensions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Output Quality', desc: 'Is your work professional and complete?' },
              { name: 'AI Leverage', desc: 'Did you use AI effectively, not blindly?' },
              { name: 'Prompt Skill', desc: 'Were your prompts specific and strategic?' },
              { name: 'Iteration', desc: 'Did you refine or accept the first draft?' },
              { name: 'Tool Selection', desc: 'Did you pick the right tools?' },
              { name: 'Efficiency', desc: 'How fast compared to expert benchmark?' },
              { name: 'Human Judgment', desc: 'Did you add value AI can\'t provide?' },
              { name: 'Overall Score', desc: 'Your combined AI readiness rating' },
            ].map((dim) => (
              <div key={dim.name} className="p-4 rounded-lg border border-gray-200 hover:border-brand-300 hover:shadow-sm transition-all">
                <div className="font-semibold text-gray-900 mb-1">{dim.name}</div>
                <div className="text-sm text-gray-500">{dim.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stop worrying. Start practicing.</h2>
          <p className="text-lg text-brand-100 mb-8">
            Take the free assessment and find out how exposed your job is to AI — and what to do about it.
          </p>
          <Link href="/assessment" className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg py-4 px-10 rounded-lg inline-flex items-center gap-2 transition-colors">
            Take the Assessment — It&apos;s Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-300">AIProof</span>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} AIProof. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
