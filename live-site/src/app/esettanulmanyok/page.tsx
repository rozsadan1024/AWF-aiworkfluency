import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Shield } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata = {
  title: 'Esettanulmányok — AI Work Fluency',
  description: 'Hogyan segít az AI Work Fluency valódi cégeknek? Nézd meg az eredményeket.',
};

const caseStudies = [
  {
    company: 'FinTech Startup',
    location: 'Budapest, 35 fő',
    icon: TrendingUp,
    result: 'A sales csapat érezhetően gyorsabban készít ajánlatokat',
    description: 'Egy gyorsan növekvő FinTech startup sales csapata küzdött az ajánlatkészítés sebességével. Az AI Work Fluency-vel minden sales munkatárs a saját munkakörére szabott feladatokon gyakorolt: ajánlat-sablonok AI-val történő készítése, ügyfél-kommunikáció optimalizálása, versenytárs-elemzés gyorsítása.',
    quote: '"Néhány hét után az ajánlatkészítés egyértelműen felgyorsult. A csapat magabiztosabban használja az AI-t a napi munkában."',
    quotee: 'Sales Director',
    metrics: [
      { label: 'Ajánlatkészítési idő', value: '~20% rövidebb' },
      { label: 'AI-használat a csapatban', value: '~70%' },
      { label: 'Időtartam', value: '6 hét' },
    ],
  },
  {
    company: 'HR SaaS Cég',
    location: 'Bécs, 120 fő',
    icon: Users,
    result: 'A HR csapat hatékonyabban kezeli a toborzási folyamatot',
    description: 'Egy nemzetközi HR SaaS vállalat saját HR csapata paradox módon nem használta hatékonyan az AI-t. Az AI Work Fluency segítségével a toborzók megtanulták AI-val szűrni az önéletrajzokat, gyorsítani az onboarding dokumentációt, és jobban előkészíteni az interjúkat.',
    quote: '"Az onboarding dokumentáció jelentős részét sikerült egyszerűsíteni. A toborzók több időt fordítanak arra, ami igazán fontos: az emberekre."',
    quotee: 'Head of People',
    metrics: [
      { label: 'Toborzási folyamat', value: 'gyorsabb' },
      { label: 'Adminisztráció csökkenés', value: '~30%' },
      { label: 'Időtartam', value: '8 hét' },
    ],
  },
  {
    company: 'Gyártóipari Vállalat',
    location: 'Debrecen, 500 fő',
    icon: Shield,
    result: 'Az EU AI Act felkészülés beindult, a csapat elkezdett AI-t használni',
    description: 'Egy nagyvállalat érintett dolgozóinak kellett AI-kompetencia képzést biztosítani az EU AI Act előírásaira felkészülve. Az AI Work Fluency minden dolgozónak a saját munkakörére szabott feladatokat generált — a minőségellenőrtől a logisztikai koordinátorig.',
    quote: '"A kollégák elkezdték használni az AI-t a napi munkában, és közben az EU AI Act felkészülés is halad. Kétszeres eredmény."',
    quotee: 'HR Igazgató',
    metrics: [
      { label: 'Érintett dolgozók', value: '85 fő' },
      { label: 'AI-képzés állapota', value: 'folyamatban' },
      { label: 'Bevezetés', value: '6 hét' },
    ],
  },
];

export default function CaseStudiesPage() {
  const t = getDictionary('hu');

  return (
    <div className="min-h-screen">
      <SiteNav t={t} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-orange-50" />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Esettanulmányok
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Hogyan segít az AI Work Fluency valódi cégeknek? Íme néhány példa.
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
          <h2 className="text-3xl font-bold text-white mb-4">Hasonló eredményeket szeretnél?</h2>
          <p className="text-lg text-brand-100 mb-8">Próbáld ki az AI Work Fluency-t és nézd meg, hogyan működik a gyakorlatban.</p>
          <Link href="/assessment?lang=hu" className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg py-4 px-10 rounded-lg inline-flex items-center gap-2 transition-colors">
            Kipróbálom
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <SiteFooter t={t} />
    </div>
  );
}
