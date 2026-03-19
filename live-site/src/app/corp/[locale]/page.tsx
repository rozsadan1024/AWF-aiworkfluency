import Link from 'next/link';
import { Shield, ArrowRight, BarChart3, BookOpen, Users, LineChart, ChevronRight, CheckCircle, AlertTriangle, Briefcase, Building2 } from 'lucide-react';
import { getDictionary, locales, type Locale } from '@/lib/i18n/dictionaries';
import { FaqAccordion } from '@/components/FaqAccordion';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function B2BHomePage({ params }: { params: { locale: string } }) {
  const t = getDictionary(params.locale);
  const locale = params.locale as Locale;

  const faqItems = [
    { question: t.faq_corp_1_q, answer: t.faq_corp_1_a },
    { question: t.faq_corp_2_q, answer: t.faq_corp_2_a },
    { question: t.faq_corp_3_q, answer: t.faq_corp_3_a },
    { question: t.faq_corp_4_q, answer: t.faq_corp_4_a },
    { question: t.faq_corp_5_q, answer: t.faq_corp_5_a },
    { question: t.faq_corp_6_q, answer: t.faq_corp_6_a },
  ];

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/corp/${locale}`} className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-brand-600" />
            <span className="text-xl font-bold text-gray-900">{t.nav_brand}</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#target" className="hover:text-brand-600 transition-colors">{t.nav_companies}</a>
            <a href="#how" className="hover:text-brand-600 transition-colors">{t.nav_how}</a>
            <a href="#pricing" className="hover:text-brand-600 transition-colors">{t.nav_pricing}</a>
            <Link href={`/${locale}`} className="hover:text-brand-600 transition-colors">{t.nav_individual}</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn-secondary text-sm py-2 px-4 hidden sm:block">{t.nav_login}</Link>
            <Link href={`/assessment?lang=${locale}`} className="btn-primary text-sm py-2 px-4">{t.nav_try}</Link>
          </div>
        </div>
      </nav>

      {/* S1: Hero */}
      <section className="relative overflow-hidden min-h-[600px]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero.jpg')" }} />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              {t.hero_h1}<br />
              {t.hero_h1_line2}<br />
              <span className="text-amber-400">{t.hero_h1_line3}</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: t.hero_sub }} />
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/assessment${locale === 'hu' ? '?lang=hu' : ''}`} className="btn-primary text-lg py-4 px-8 flex items-center gap-2 justify-center">
                {t.hero_cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="mailto:hello@aiworkfluency.com" className="bg-white/20 text-white hover:bg-white/30 border border-white/30 font-semibold text-lg py-4 px-8 rounded-lg flex items-center gap-2 justify-center transition-colors">
                {t.hero_cta_demo}
              </a>
            </div>
            <p className="text-sm text-gray-300 mt-4">{t.hero_cta_sub}</p>
          </div>
        </div>
      </section>

      {/* EU AI Act mini-banner */}
      <section className="py-4 bg-amber-100 border-b border-amber-300">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span className="text-sm font-semibold text-amber-900">{t.hero_euai_warn}</span>
          </div>
          <Link href={`/eu-ai-act/${locale}`} className="text-sm font-bold text-brand-600 hover:text-brand-700 underline transition-colors">
            {t.hero_euai_cta}
          </Link>
        </div>
      </section>

      {/* S2: Target Audience Selector */}
      <section id="target" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.target_h2}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-50 rounded-xl p-8 border-2 border-brand-200 hover:border-brand-400 transition-colors">
              <div className="w-14 h-14 mb-5 bg-brand-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.target_small_title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.target_small_desc}</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-8 border-2 border-brand-200 hover:border-brand-400 transition-colors">
              <div className="w-14 h-14 mb-5 bg-brand-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.target_large_title}</h3>
              <p className="text-gray-600 leading-relaxed">{t.target_large_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* S3: Stakes */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <div className="text-brand-600 font-bold text-lg mb-4">{t.stakes_small_h3}</div>
              <p className="text-gray-600 leading-relaxed">{t.stakes_small_desc}</p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <div className="text-brand-600 font-bold text-lg mb-4">{t.stakes_large_h3}</div>
              <p className="text-gray-600 leading-relaxed">{t.stakes_large_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* S4: Problem */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.problem_h2}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t.problem_1_title, desc: t.problem_1_desc, icon: BookOpen },
              { title: t.problem_2_title, desc: t.problem_2_desc, icon: Users },
              { title: t.problem_3_title, desc: t.problem_3_desc, icon: LineChart },
            ].map((item) => (
              <div key={item.title} className="bg-gray-800 rounded-xl p-6">
                <div className="w-12 h-12 mb-4 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-red-300">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S5: Solution */}
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

      {/* S6: Case Studies */}
      <section className="py-20 bg-gradient-to-br from-brand-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.cases_h2}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{t.case_small_title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{t.case_small_desc}</p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{t.case_large_title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{t.case_large_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* S7: Social Proof */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{t.proof_h2}</h3>
          <p className="text-gray-600 mb-10 text-center">{t.proof_stat}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: t.proof_quote, quotee: t.proof_quotee },
              { quote: t.proof_quote_2, quotee: t.proof_quotee_2 },
              { quote: t.proof_quote_3, quotee: t.proof_quotee_3 },
            ].map((item, i) => (
              <blockquote key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                <p className="text-gray-800 italic mb-4 leading-relaxed">{item.quote}</p>
                <cite className="text-sm text-gray-500 not-italic">— {item.quotee}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* S8: EU AI Act */}
      <section className="py-20 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-4 mb-6">
            <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.euai_corp_h2}</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">{t.euai_corp_desc}</p>
          <p className="font-semibold text-gray-900 mb-4">{t.euai_corp_intro}</p>
          <ul className="space-y-3 mb-6">
            {[t.euai_corp_1, t.euai_corp_2, t.euai_corp_3, t.euai_corp_4].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed mb-8 font-medium">{t.euai_corp_closing}</p>
          <Link href={`/eu-ai-act/${locale}`} className="btn-secondary inline-flex items-center gap-2">
            {t.euai_corp_cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* S9: How It Works */}
      <section id="how" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.how_h2}</h2>
          <div className="grid md:grid-cols-2 gap-12">
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

      {/* S10: Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.pricing_h2}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
            <div className="card text-center border-2 border-brand-500 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">{t.pricing_popular}</div>
              <div className="font-bold text-xl text-gray-900 mb-1">{t.pricing_growth}</div>
              <div className="text-sm text-gray-500 mb-4">{t.pricing_growth_seats}</div>
              <div className="text-3xl font-extrabold text-brand-600 mb-1">{locale === 'hu' ? '7 500 Ft' : '€19'}<span className="text-sm font-normal text-gray-500">{t.pricing_per_seat}</span></div>
              <p className="text-xs text-gray-500 mt-3 mb-4">{t.pricing_growth_includes}</p>
              <Link href={`/assessment${locale === 'hu' ? '?lang=hu' : ''}`} className="btn-primary w-full mt-2 text-sm py-2">{t.pricing_cta}</Link>
            </div>
            <div className="card text-center border-2 border-gray-200">
              <div className="font-bold text-xl text-gray-900 mb-1">{t.pricing_scale}</div>
              <div className="text-sm text-gray-500 mb-4">{t.pricing_scale_seats}</div>
              <div className="text-3xl font-extrabold text-gray-900 mb-1">{locale === 'hu' ? '9 900 Ft' : '€26'}<span className="text-sm font-normal text-gray-500">{t.pricing_per_seat}</span></div>
              <p className="text-xs text-gray-500 mt-3 mb-4">{t.pricing_scale_includes}</p>
              <a href="mailto:hello@aiworkfluency.com" className="btn-secondary w-full mt-2 text-sm py-2">{t.hero_cta_demo}</a>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">{t.pricing_annual}</p>
        </div>
      </section>

      {/* S11: FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.faq_corp_h2}</h2>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* S12: Final CTA */}
      <section className="py-20 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 leading-tight">{t.cta_h2}</h2>
          <Link href={`/assessment${locale === 'hu' ? '?lang=hu' : ''}`} className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg py-4 px-10 rounded-lg inline-flex items-center gap-2 transition-colors">
            {t.cta_button}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-brand-200 mt-4 text-sm">
            {t.cta_demo}
          </p>
        </div>
      </section>

      {/* S13: Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-white font-semibold mb-4">{t.footer_product}</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#target" className="hover:text-white transition-colors">{t.nav_companies}</a></li>
                <li><a href="#how" className="hover:text-white transition-colors">{t.nav_how}</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">{t.nav_pricing}</a></li>
                <li><Link href={`/${locale}`} className="hover:text-white transition-colors">{t.nav_individual}</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">{t.footer_resources}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href={`/eu-ai-act/${locale}`} className="hover:text-white transition-colors">{t.footer_euai}</Link></li>
                <li><Link href="/roi-kalkulator" className="hover:text-white transition-colors">{t.footer_roi}</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">{t.footer_company}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/rolunk" className="hover:text-white transition-colors">{t.footer_about}</Link></li>
                <li><a href="mailto:hello@aiworkfluency.com" className="hover:text-white transition-colors">{t.footer_contact}</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-4">{t.footer_legal}</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">{t.footer_privacy}</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">{t.footer_terms}</Link></li>
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
                <Link key={l} href={`/corp/${l}`} className={`px-2 py-1 transition-colors ${l === locale ? 'bg-brand-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
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
