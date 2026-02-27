import Link from 'next/link';
import { Shield, TrendingUp, ArrowRight, BarChart3, BookOpen, Users, LineChart, ChevronRight } from 'lucide-react';
import { getDictionary, locales, type Locale } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function B2BHomePage({ params }: { params: { locale: string } }) {
  const t = getDictionary(params.locale);
  const locale = params.locale as Locale;

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-brand-600" />
            <span className="text-xl font-bold text-gray-900">{t.nav_brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#companies" className="hover:text-brand-600 transition-colors">{t.nav_companies}</a>
            <a href="#how" className="hover:text-brand-600 transition-colors">{t.nav_how}</a>
            <a href="#pricing" className="hover:text-brand-600 transition-colors">{t.nav_pricing}</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 text-xs border border-gray-200 rounded-md overflow-hidden">
              {locales.map((l) => (
                <Link key={l} href={`/${l}`} className={`px-2 py-1 transition-colors ${l === locale ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            <Link href="/auth/login" className="btn-secondary text-sm py-2 px-4 hidden sm:block">{t.nav_login}</Link>
            <Link href="/assessment" className="btn-primary text-sm py-2 px-4">{t.nav_try}</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[600px]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero.jpg')" }} />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {t.hero_h1}
            </h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
              {t.hero_sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/assessment" className="btn-primary text-lg py-4 px-8 flex items-center gap-2 justify-center">
                {t.hero_cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#demo" className="bg-white/20 text-white hover:bg-white/30 border border-white/30 font-semibold text-lg py-4 px-8 rounded-lg flex items-center gap-2 justify-center transition-colors">
                {t.hero_cta_demo}
              </Link>
            </div>
            <p className="text-sm text-gray-300 mt-4">{t.hero_cta_sub}</p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.problem_h2}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t.problem_1_title, desc: t.problem_1_desc, icon: Users },
              { title: t.problem_2_title, desc: t.problem_2_desc, icon: BookOpen },
              { title: t.problem_3_title, desc: t.problem_3_desc, icon: LineChart },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-red-300">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.solution_h2}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.solution_sub}</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-brand-50 p-6 rounded-xl">
                <div className="text-brand-600 font-bold mb-3">{t.solution_input_title}</div>
                <ul className="space-y-2">
                  {[t.solution_input_1, t.solution_input_2, t.solution_input_3].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700">
                      <ChevronRight className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="text-green-700 font-bold mb-3">{t.solution_output_title}</div>
                <p className="text-gray-700 leading-relaxed">{t.solution_output_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task Examples */}
      <section className="py-20 bg-gradient-to-br from-brand-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.examples_h2}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.examples_sub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { role: t.examples_mm1_role, ctx: t.examples_mm1_context, task: t.examples_mm1_task },
              { role: t.examples_mm2_role, ctx: t.examples_mm2_context, task: t.examples_mm2_task },
              { role: t.examples_hr_role, ctx: t.examples_hr_context, task: t.examples_hr_task },
              { role: t.examples_pm_role, ctx: t.examples_pm_context, task: t.examples_pm_task },
              { role: t.examples_sl1_role, ctx: t.examples_sl1_context, task: t.examples_sl1_task },
              { role: t.examples_sl2_role, ctx: t.examples_sl2_context, task: t.examples_sl2_task },
            ].map((ex, i) => (
              <div key={i} className="card bg-white">
                <div className="text-sm font-semibold text-brand-600 mb-1">{ex.role}</div>
                <div className="text-xs text-gray-500 mb-3">{ex.ctx}</div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed italic">{ex.task}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-lg font-semibold text-brand-600">{t.examples_tagline}</p>
        </div>
      </section>

      {/* For Companies */}
      <section id="companies" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.companies_h2}</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { title: t.companies_1_title, desc: t.companies_1_desc, icon: TrendingUp },
              { title: t.companies_2_title, desc: t.companies_2_desc, icon: BarChart3 },
              { title: t.companies_3_title, desc: t.companies_3_desc, icon: LineChart },
              { title: t.companies_4_title, desc: t.companies_4_desc, icon: Shield },
            ].map((item) => (
              <div key={item.title} className="card flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.how_h2}</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Manager View */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="text-brand-600 font-bold text-lg mb-6">{t.how_manager_title}</div>
              <div className="space-y-4">
                {[t.how_manager_1, t.how_manager_2, t.how_manager_3, t.how_manager_4].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</div>
                    <p className="text-gray-700 pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Employee View */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="text-green-700 font-bold text-lg mb-6">{t.how_employee_title}</div>
              <div className="space-y-4">
                {[t.how_employee_1, t.how_employee_2, t.how_employee_3, t.how_employee_4].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</div>
                    <p className="text-gray-700 pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t.pricing_h2}</h2>
          <div className="mb-12" />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            {/* Starter */}
            <div className="card text-center border-2 border-gray-200">
              <div className="font-bold text-lg text-gray-900 mb-1">{t.pricing_starter}</div>
              <div className="text-sm text-gray-500 mb-4">{t.pricing_starter_seats}</div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">&euro;19<span className="text-sm font-normal text-gray-500">{t.pricing_per_seat}</span></div>
              <Link href="/assessment" className="btn-secondary w-full mt-4 text-sm py-2">{t.pricing_cta}</Link>
            </div>
            {/* Growth */}
            <div className="card text-center border-2 border-brand-500 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">Népszerű</div>
              <div className="font-bold text-lg text-gray-900 mb-1">{t.pricing_growth}</div>
              <div className="text-sm text-gray-500 mb-4">{t.pricing_growth_seats}</div>
              <div className="text-3xl font-extrabold text-brand-600 mb-1">&euro;26<span className="text-sm font-normal text-gray-500">{t.pricing_per_seat}</span></div>
              <Link href="/assessment" className="btn-primary w-full mt-4 text-sm py-2">{t.pricing_cta}</Link>
            </div>
            {/* Enterprise */}
            <div className="card text-center border-2 border-gray-200">
              <div className="font-bold text-lg text-gray-900 mb-1">{t.pricing_enterprise}</div>
              <div className="text-sm text-gray-500 mb-4">{t.pricing_enterprise_seats}</div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">{t.pricing_custom}</div>
              <Link href="#demo" className="btn-secondary w-full mt-4 text-sm py-2">{t.nav_demo}</Link>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">{t.pricing_annual}</p>
          <p className="text-center text-sm text-gray-500 mt-2">{t.pricing_includes}</p>
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="py-20 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t.cta_h2}</h2>
          <p className="text-lg text-brand-100 mb-8">{t.cta_sub}</p>
          <Link href="/assessment" className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg py-4 px-10 rounded-lg inline-flex items-center gap-2 transition-colors">
            {t.cta_button}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-brand-200 mt-4 text-sm">{t.cta_demo}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-white font-semibold mb-4">{t.footer_product}</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#companies" className="hover:text-white transition-colors">{t.nav_companies}</a></li>
                <li><a href="#how" className="hover:text-white transition-colors">{t.nav_how}</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">{t.nav_pricing}</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">{t.footer_resources}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/esettanulmanyok" className="hover:text-white transition-colors">{t.footer_case}</Link></li>
                <li><Link href="/roi-kalkulator" className="hover:text-white transition-colors">{t.footer_roi}</Link></li>
                <li><Link href="/eu-ai-act" className="hover:text-white transition-colors">{t.footer_euai}</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">{t.footer_company}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/rolunk" className="hover:text-white transition-colors">{t.footer_about}</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer_contact}</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">{t.footer_legal}</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer_privacy}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer_terms}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-500" />
              <span className="font-semibold text-gray-300">{t.nav_brand}</span>
            </div>
            <div className="flex gap-1 text-xs border border-gray-700 rounded-md overflow-hidden">
              {locales.map((l) => (
                <Link key={l} href={`/${l}`} className={`px-2 py-1 transition-colors ${l === locale ? 'bg-brand-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            <p className="text-sm">{t.footer_copy}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
