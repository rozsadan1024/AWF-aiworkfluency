import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDictionary, defaultLocale } from '@/lib/i18n/dictionaries';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { ROICalculatorWidget } from './ROICalculatorWidget';

export const metadata = {
  title: 'ROI Calculator — AI Work Fluency',
  description: 'Calculate how much AI Work Fluency can deliver for your company. Free ROI calculator.',
};

export default function ROICalculatorPage() {
  const t = getDictionary(defaultLocale);

  return (
    <div className="min-h-screen">
      <SiteNav t={t} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-orange-50" />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {t.roi_title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            {t.roi_subtitle}
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <ROICalculatorWidget />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t.roi_cta_title}</h2>
          <p className="text-lg text-brand-100 mb-8">{t.roi_cta_desc}</p>
          <Link href="/assessment" className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg py-4 px-10 rounded-lg inline-flex items-center gap-2 transition-colors">
            {t.roi_cta_button}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <SiteFooter t={t} />
    </div>
  );
}
