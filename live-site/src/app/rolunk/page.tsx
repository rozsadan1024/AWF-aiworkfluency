import Link from 'next/link';
import { ArrowRight, Target, BarChart3, Shield } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata = {
  title: 'Rólunk — AI Work Fluency',
  description: 'Az AI Work Fluency mögött: miért csináljuk, hogyan gondolkodunk, és hogyan érhetsz el minket.',
};

export default function AboutPage() {
  const t = getDictionary('hu');

  return (
    <div className="min-h-screen">
      <SiteNav t={t} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-orange-50" />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Rólunk
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Az AI Work Fluency mögött
          </p>
        </div>
      </section>

      {/* Miért csináljuk */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Miért csináljuk?</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>Az AI-képzési piac tele van generikus videókurzusokkal, amelyeket mindenki megnéz, aztán azonnal elfelejt. A részvételi igazolás megvan, de a tudás nem.</p>
            <p>Mi másképp gondolkodunk. Az AI Work Fluency nem tanít — <strong>gyakoroltat</strong>. Minden alkalmazott a saját munkakörére szabott, valódi feladatokat kap. Nem elméletet, hanem gyakorlatot. Nem általánost, hanem személyre szabottat.</p>
            <p>Az eredmény: mérhetően jobb AI-kompetencia, nem csak egy pipa a megfelelőségi listán.</p>
          </div>
        </div>
      </section>

      {/* Megközelítés */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">A megközelítésünk</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Szerepre szabott',
                desc: 'Minden alkalmazott a saját munkakörére generált feladatokat kap. A marketing manager kampánystratégiát gyakorol, a HR koordinátor onboarding folyamatokat.',
              },
              {
                icon: BarChart3,
                title: 'Mérhető',
                desc: '5 dimenziós pontozás, haladási riportok, vezetői dashboard. Pontosan látod, ki mennyit fejlődött és hol tart a csapat.',
              },
              {
                icon: Shield,
                title: 'EU AI Act megfelelő',
                desc: 'Dokumentált képzési folyamat, mérhető eredmények. Egy rendszerrel teljesíted a megfelelőséget és fejleszted a csapatodat.',
              },
            ].map((item) => (
              <div key={item.title} className="card text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-brand-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="card border-2 border-brand-200 bg-brand-50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Próbáld ki magad</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nézd meg, hogyan működik az AI Work Fluency a gyakorlatban. Próbáld ki a platformot vagy foglalj egy demót.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/assessment?lang=hu" className="btn-primary flex items-center gap-2 justify-center">
                Kipróbálom
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/hu#demo" className="btn-secondary flex items-center gap-2 justify-center">
                Demo foglalás
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Elérhetőség</h2>
          <p className="text-gray-600 mb-6">Kérdésed van? Írj nekünk!</p>
          <a href="mailto:hello@aiworkfluency.com" className="text-brand-600 hover:text-brand-700 font-semibold text-lg transition-colors">
            hello@aiworkfluency.com
          </a>
        </div>
      </section>

      <SiteFooter t={t} />
    </div>
  );
}
