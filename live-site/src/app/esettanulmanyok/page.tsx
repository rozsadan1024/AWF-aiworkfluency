import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Shield } from 'lucide-react';
import { getDictionary, defaultLocale } from '@/lib/i18n/dictionaries';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata = {
  title: 'Case Studies — AI Work Fluency',
  description: 'How does AI Work Fluency help real companies? See the results.',
};

export default function CaseStudiesPage() {
  const t = getDictionary(defaultLocale);

  const caseStudies = [
    {
      company: t.cases_1_company,
      location: t.cases_1_location,
      icon: TrendingUp,
      result: t.cases_1_result,
      description: t.cases_1_desc,
      quote: t.cases_1_quote,
      quotee: t.cases_1_quotee,
      metrics: [
        { label: t.cases_1_m1_label, value: t.cases_1_m1_value },
        { label: t.cases_1_m2_label, value: t.cases_1_m2_value },
        { label: t.cases_1_m3_label, value: t.cases_1_m3_value },
      ],
    },
    {
      company: t.cases_2_company,
      location: t.cases_2_location,
      icon: Users,
      result: t.cases_2_result,
      description: t.cases_2_desc,
      quote: t.cases_2_quote,
      quotee: t.cases_2_quotee,
      metrics: [
        { label: t.cases_2_m1_label, value: t.cases_2_m1_value },
        { label: t.cases_2_m2_label, value: t.cases_2_m2_value },
        { label: t.cases_2_m3_label, value: t.cases_2_m3_value },
      ],
    },
    {
      company: t.cases_3_company,
      location: t.cases_3_location,
      icon: Shield,
      result: t.cases_3_result,
      description: t.cases_3_desc,
      quote: t.cases_3_quote,
      quotee: t.cases_3_quotee,
      metrics: [
        { label: t.cases_3_m1_label, value: t.cases_3_m1_value },
        { label: t.cases_3_m2_label, value: t.cases_3_m2_value },
        { label: t.cases_3_m3_label, value: t.cases_3_m3_value },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <SiteNav t={t} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-orange-50" />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {t.cases_title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            {t.cases_subtitle}
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          {caseStudies.map((cs, i) => (
            <div key={i} className="card p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <cs.icon className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{cs.company}</h2>
                  <p className="text-sm text-gray-500">{cs.location}</p>
                </div>
              </div>

              <div className="bg-brand-50 rounded-lg p-4 mb-6">
                <p className="text-lg font-semibold text-brand-700">{cs.result}</p>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{cs.description}</p>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-extrabold text-brand-600">{m.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-4 border-brand-300 pl-4 italic text-gray-700">
                {cs.quote}
                <div className="text-sm text-gray-500 mt-2 not-italic">— {cs.quotee}</div>
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t.cases_cta_title}</h2>
          <p className="text-lg text-brand-100 mb-8">{t.cases_cta_desc}</p>
          <Link href="/assessment" className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg py-4 px-10 rounded-lg inline-flex items-center gap-2 transition-colors">
            {t.cases_cta_button}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <SiteFooter t={t} />
    </div>
  );
}
