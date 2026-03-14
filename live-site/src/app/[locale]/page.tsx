import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle, AlertTriangle, Clock, Briefcase } from 'lucide-react';
import { getDictionary, locales, type Locale } from '@/lib/i18n/dictionaries';
import { FaqAccordion } from '@/components/FaqAccordion';
import { CheckoutButton } from '@/components/CheckoutButton';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function B2CHomePage({ params }: { params: { locale: string } }) {
  const t = getDictionary(params.locale);
  const locale = params.locale as Locale;

  const faqItems = [
    { question: t.b2c_faq_1_q, answer: t.b2c_faq_1_a },
    { question: t.b2c_faq_2_q, answer: t.b2c_faq_2_a },
    { question: t.b2c_faq_3_q, answer: t.b2c_faq_3_a },
    { question: t.b2c_faq_4_q, answer: t.b2c_faq_4_a },
    { question: t.b2c_faq_5_q, answer: t.b2c_faq_5_a },
    { question: t.b2c_faq_6_q, answer: t.b2c_faq_6_a },
  ];

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-brand-600" />
            <span className="text-xl font-bold text-gray-900">{t.nav_brand}</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#how" className="hover:text-brand-600 transition-colors">{t.b2c_nav_how}</a>
            <a href="#pricing" className="hover:text-brand-600 transition-colors">{t.b2c_nav_pricing}</a>
            <Link href={`/corp/${locale}`} className="hover:text-brand-600 transition-colors">{t.b2c_nav_for_business}</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn-secondary text-sm py-2 px-4 hidden sm:block">{t.nav_login}</Link>
            <Link href={`/assessment?lang=${locale}`} className="btn-primary text-sm py-2 px-4">{t.b2c_nav_get_started}</Link>
          </div>
        </div>
      </nav>

      {/* S1: Hero */}
      <section className="relative overflow-hidden min-h-[600px]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero.jpg')" }} />
        <div className="absolute inset-0 bg-gray-900/70" />
        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-28">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              {t.b2c_hero_h1}<br />
              {t.b2c_hero_h1_line2}<br />
              <span className="text-amber-400">{t.b2c_hero_h1_line3}</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: t.b2c_hero_sub }} />
            <Link href={`/assessment?lang=${locale}`} className="btn-primary text-lg py-4 px-8 inline-flex items-center gap-2">
              {t.b2c_hero_cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-400 mt-4">{t.b2c_hero_cta_sub}</p>
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

      {/* S2: Problem */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.b2c_problem_h2}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t.b2c_problem_1_title, desc: t.b2c_problem_1_desc },
              { title: t.b2c_problem_2_title, desc: t.b2c_problem_2_desc },
              { title: t.b2c_problem_3_title, desc: t.b2c_problem_3_desc },
            ].map((item) => (
              <div key={item.title} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3 text-amber-300">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S3: How It Works */}
      <section id="how" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.b2c_steps_h2}</h2>
          <div className="space-y-8">
            {[
              { title: t.b2c_step_1_title, desc: t.b2c_step_1_desc },
              { title: t.b2c_step_2_title, desc: t.b2c_step_2_desc },
              { title: t.b2c_step_3_title, desc: t.b2c_step_3_desc },
              { title: t.b2c_step_4_title, desc: t.b2c_step_4_desc },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="w-10 h-10 bg-brand-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S4: Show Me — Task Examples */}
      <section id="show" className="py-20 bg-gradient-to-br from-brand-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.b2c_show_h2}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { role: t.b2c_show_1_role, task: t.b2c_show_1_task, difficulty: t.b2c_show_1_difficulty, time: t.b2c_show_1_time },
              { role: t.b2c_show_2_role, task: t.b2c_show_2_task, difficulty: t.b2c_show_2_difficulty, time: t.b2c_show_2_time },
              { role: t.b2c_show_3_role, task: t.b2c_show_3_task, difficulty: t.b2c_show_3_difficulty, time: t.b2c_show_3_time },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-brand-600 text-white px-5 py-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="font-semibold text-sm">{card.role}</span>
                </div>
                <div className="p-5">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-700 leading-relaxed border border-gray-100">
                    &ldquo;{card.task}&rdquo;
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className={`px-2 py-1 rounded-full font-medium ${
                      card.difficulty === 'Advanced' || card.difficulty === 'Haladó'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {card.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {card.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">{t.b2c_show_sub}</p>
        </div>
      </section>

      {/* S5: Differentiation — Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.b2c_diff_h2}</h2>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="bg-gray-100 text-gray-500 font-semibold py-3 px-5 text-left">{t.b2c_diff_col_other}</th>
                  <th className="bg-brand-600 text-white font-semibold py-3 px-5 text-left">{t.b2c_diff_col_awf}</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((n) => (
                  <tr key={n} className={n % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-5 text-gray-500 border-t border-gray-100">{t[`b2c_diff_row_${n}_other`]}</td>
                    <td className="py-3 px-5 text-gray-900 font-medium border-t border-gray-100">{t[`b2c_diff_row_${n}_awf`]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* S6: Tools Trust Bar */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 mb-6">{t.b2c_tools_h2}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 text-xl font-semibold text-gray-400">
            <span>ChatGPT</span>
            <span>Claude</span>
            <span>Microsoft Copilot</span>
            <span>Gemini</span>
          </div>
        </div>
      </section>

      {/* S7: Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.b2c_pricing_h2}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <div className="card text-center border-2 border-gray-200">
              <div className="font-bold text-lg text-gray-900 mb-4">{t.b2c_pricing_free}</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">{t.b2c_pricing_free_price}</div>
              <div className="mt-6 space-y-3 text-sm text-left">
                {[t.b2c_pricing_free_f1, t.b2c_pricing_free_f2, t.b2c_pricing_free_f3, t.b2c_pricing_free_f4].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href={`/assessment?lang=${locale}`} className="btn-secondary w-full mt-6 text-sm py-2.5">{t.b2c_pricing_free_cta}</Link>
            </div>

            {/* Pro (highlighted) */}
            <div className="card text-center border-2 border-brand-500 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">{t.b2c_pricing_popular}</div>
              <div className="font-bold text-lg text-gray-900 mb-4">{t.b2c_pricing_pro}</div>
              <div className="text-4xl font-extrabold text-brand-600 mb-1">
                {t.b2c_pricing_pro_price}
                <span className="text-sm font-normal text-gray-500">{t.b2c_pricing_pro_period}</span>
              </div>
              <div className="mt-6 space-y-3 text-sm text-left">
                {[t.b2c_pricing_pro_f1, t.b2c_pricing_pro_f2, t.b2c_pricing_pro_f3, t.b2c_pricing_pro_f4].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <CheckoutButton tier="basic" locale={locale} className="btn-primary w-full mt-6 text-sm py-2.5">{t.b2c_pricing_pro_cta}</CheckoutButton>
            </div>

            {/* Pro+ */}
            <div className="card text-center border-2 border-gray-200">
              <div className="font-bold text-lg text-gray-900 mb-4">{t.b2c_pricing_proplus}</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">
                {t.b2c_pricing_proplus_price}
                <span className="text-sm font-normal text-gray-500">{t.b2c_pricing_proplus_period}</span>
              </div>
              <div className="mt-6 space-y-3 text-sm text-left">
                {[t.b2c_pricing_proplus_f1, t.b2c_pricing_proplus_f2, t.b2c_pricing_proplus_f3, t.b2c_pricing_proplus_f4].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <CheckoutButton tier="pro" locale={locale} className="btn-secondary w-full mt-6 text-sm py-2.5">{t.b2c_pricing_proplus_cta}</CheckoutButton>
            </div>
          </div>
        </div>
      </section>

      {/* S8: EU AI Act Urgency Banner */}
      <section className="py-16 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.b2c_euai_h2}</h2>
          <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">{t.b2c_euai_desc}</p>
          <Link href={`/eu-ai-act/${locale}`} className="btn-secondary inline-flex items-center gap-2">
            {t.b2c_euai_cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* S9: FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.b2c_faq_h2}</h2>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* S10: Final CTA */}
      <section className="py-20 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 leading-tight">{t.b2c_cta_h2}</h2>
          <Link href={`/assessment?lang=${locale}`} className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg py-4 px-10 rounded-lg inline-flex items-center gap-2 transition-colors">
            {t.b2c_cta_button}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-brand-200 mt-4 text-sm">{t.b2c_cta_sub}</p>
        </div>
      </section>

      {/* S11: Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-white font-semibold mb-4">{t.footer_product}</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#how" className="hover:text-white transition-colors">{t.b2c_nav_how}</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">{t.b2c_nav_pricing}</a></li>
                <li><Link href={`/corp/${locale}`} className="hover:text-white transition-colors">{t.b2c_footer_for_business}</Link></li>
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
