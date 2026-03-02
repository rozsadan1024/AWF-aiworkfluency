import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, Clock, Shield, BookOpen } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata = {
  title: 'EU AI Act Útmutató — AI Work Fluency',
  description: 'Mit jelent az EU AI Act a cégeknek? Mikor kell megfelelni? Hogyan segít az AI Work Fluency?',
};

export default function EuAiActPage() {
  const t = getDictionary('hu');

  return (
    <div className="min-h-screen">
      <SiteNav t={t} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-orange-50" />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            EU AI Act Útmutató
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Mit jelent ez a cégeknek? Mikor kell megfelelni? És hogyan lehet a kötelezettségből versenyelőny?
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-16">

          {/* Mi az EU AI Act? */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Mi az EU AI Act?</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>Az EU AI Act (Mesterséges Intelligencia Szabályozás) az Európai Unió 2024-ben elfogadott rendelete, amely 2025-2026-ban fokozatosan lép hatályba.</p>
              <p>A rendelet egyik kulcspontja: <strong>kötelező AI-kompetencia képzés</strong> az AI rendszereket használó vagy azokkal érintett dolgozóknak. Ez nem opcionális ajánlás — ez jogszabályi követelmény.</p>
            </div>
          </div>

          {/* Kire vonatkozik? */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Kire vonatkozik?</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>Minden EU-s székhelyű cég, amely AI rendszereket használ munkafolyamatokban. Ha a dolgozóid használnak:</p>
              <ul className="space-y-2 ml-4">
                {['ChatGPT, Claude, Gemini vagy hasonló AI asszisztenseket', 'GitHub Copilot vagy AI kód-asszisztenseket', 'AI-alapú CRM, marketing vagy HR eszközöket', 'Bármilyen AI-t a döntéshozatalban vagy ügyfélkiszolgálásban'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-medium text-gray-800">...akkor a céged érintett.</p>
            </div>
          </div>

          {/* Mi a kötelező? */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Mi a kötelező?</h2>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              {[
                { title: 'AI-kompetencia felmérés', desc: 'Az érintett dolgozók AI-jártasságának mérése dokumentált módon.' },
                { title: 'Képzési program', desc: 'Strukturált, szerepre szabott AI-képzés biztosítása — nem elég egy általános webinár.' },
                { title: 'Mérhető eredmények', desc: 'A képzés hatékonyságát dokumentáltan kell igazolni. Részvételi igazolás önmagában nem elég.' },
                { title: 'Folyamatos fejlesztés', desc: 'Az AI-kompetencia fenntartása és fejlesztése rendszeres gyakorlással.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Mikor kell megfelelni?</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="card border-2 border-red-200 bg-red-50">
                <div className="text-sm font-bold text-red-600 mb-1">2025. február</div>
                <div className="text-lg font-bold text-gray-900 mb-2">Magas kockázatú AI rendszerek</div>
                <p className="text-sm text-gray-600">AI rendszerek, amelyek egészségügyi, jogi vagy biztonsági döntéseket hoznak. Ezekre már most vonatkozik a kötelezettség.</p>
              </div>
              <div className="card border-2 border-amber-200 bg-amber-50">
                <div className="text-sm font-bold text-amber-600 mb-1">2026. augusztus</div>
                <div className="text-lg font-bold text-gray-900 mb-2">Általános AI-jártasság</div>
                <p className="text-sm text-gray-600">Minden AI rendszert használó dolgozóra vonatkozó AI-kompetencia követelmény. Ez érinti a legtöbb céget.</p>
              </div>
            </div>
          </div>

          {/* Hogyan segít az AWF? */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Hogyan segít az AI Work Fluency?</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-3">
              <p>Az AI Work Fluency nem csak a megfelelőséget oldja meg — <strong>valódi kompetenciafejlesztést</strong> biztosít:</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {[
                { title: 'Szerepre szabott képzés', desc: 'Minden dolgozó a saját munkakörére generált feladatokat kap — nem általános AI-kurzust.' },
                { title: 'Mérhető fejlődés', desc: '5 dimenziós pontozás és haladási riportok — dokumentált eredmények az audit számára.' },
                { title: 'Vezetői dashboard', desc: 'Valós idejű áttekintés a csapat AI-kompetenciájáról — ki hol tart, kinek kell segítség.' },
                { title: 'Folyamatos gyakorlás', desc: 'Nem egyszeri tréning, hanem folyamatos fejlesztés valós munkahelyi feladatokkal.' },
              ].map((item) => (
                <div key={item.title} className="card">
                  <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Tegyük EU AI Act-megfelelővé a csapatodat</h2>
          <p className="text-lg text-brand-100 mb-8">Nézd meg, hogyan működik az AI Work Fluency a gyakorlatban.</p>
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
