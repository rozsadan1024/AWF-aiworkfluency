import Link from 'next/link';
import { ArrowRight, CheckCircle, BookOpen, FileText, Shield, Users, AlertTriangle, ClipboardCheck, Scale, BarChart3, FolderCheck, FileCheck2, ListChecks } from 'lucide-react';
import { locales } from '@/lib/i18n/dictionaries';
import { ScrollToTop } from '@/components/ScrollToTop';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'EU AI Act megfelelőség — AI Work Fluency',
  description: 'Teljes körű EU AI Act megfelelőségi megoldás: AI-jártassági képzés, governance dokumentáció, kockázatkezelés és auditálásra kész dokumentumcsomagok.',
};

export default function EuAiActPage({ params }: { params: { locale: string } }) {
  return (
    <>
      <ScrollToTop />
      {/* Google Fonts for serif headings */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{ __html: `
        .font-serif-heading { font-family: 'Libre Baskerville', Georgia, 'Times New Roman', serif; }
      `}} />

      <div className="min-h-screen bg-white text-gray-900">
        {/* Nav — dark navy, McKinsey-style */}
        <nav className="bg-[#051c2c] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/lp/eu-compliance/v2/hu" className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-white/80 flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-tight">AWF</span>
              </div>
              <span className="text-[15px] font-semibold text-white tracking-wide">AI Work Fluency</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/lp/eu-compliance/v2/hu" className="bg-[#00a9f4] hover:bg-[#0090d0] text-white font-semibold text-sm py-2 px-5 transition-colors">
                Megfelelőségi felmérés
              </Link>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#051c2c_0%,#0a3152_50%,#051c2c_100%)]" />
          <div className="relative max-w-5xl mx-auto px-6 pt-20 sm:pt-28 pb-24">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-[2px] bg-[#00a9f4]" />
                <span className="text-[#00a9f4] text-xs font-semibold tracking-[0.2em] uppercase">EU AI Act — Teljes körű megfelelőség</span>
              </div>

              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.15] mb-8 font-bold">
                Az EU AI Act{' '}
                <span className="text-[#00a9f4]">nem csak képzés.</span><br />
                Teljes megfelelőséget kíván.
              </h1>
              <p className="text-base sm:text-lg text-white/70 mb-10 leading-relaxed max-w-2xl">
                Az EU AI Act a szervezetek számára átfogó kötelezettségrendszert határoz meg: az AI-jártassági képzéstől a governance dokumentáción át a kockázatkezelésig. Az AI Work Fluency mindezekben partner — hogy a megfelelőség ne teher, hanem versenyelőny legyen.
              </p>
              <Link href="/lp/eu-compliance/v2/hu" className="bg-[#00a9f4] hover:bg-[#0090d0] text-white font-semibold text-base py-3.5 px-8 inline-flex items-center gap-3 transition-colors group">
                Kérjen ingyenes felmérést
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <p className="text-sm text-white/40 mt-4">15 perces konzultáció, kötelezettség nélkül.</p>
            </div>
          </div>
        </section>

        {/* PILLAR 1 — AI Literacy (Article 4) */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">1. pillér</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#051c2c] mb-4 font-bold">AI-jártasság (4. cikk)</h2>
              <p className="text-base text-gray-500 max-w-2xl">
                A 4. cikk 2025. február 2. óta hatályban van. Minden AI rendszert használó vagy üzemeltető szervezetnek biztosítania kell, hogy munkatársai megfelelő szintű AI-jártassággal rendelkezzenek.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-px bg-gray-200">
              {[
                { title: 'Szerepkör-specifikus képzés', desc: 'Minden AI-val dolgozó munkatársnak a pozíciójához és kockázati szintjéhez igazított, dokumentált képzésben kell részesülnie.', icon: BookOpen },
                { title: 'Dokumentált bizonyítékok', desc: 'Ellenőrizhető nyilvántartás szükséges: ki, mikor, milyen tartalommal és milyen eredménnyel végezte el a képzést.', icon: FileText },
                { title: 'Folyamatos fejlesztés', desc: 'A képzés nem egyszeri pipa. Az AI rendszerek és szabályozások fejlődésével párhuzamosan kell naprakészen tartani.', icon: ListChecks },
                { title: 'Kockázatarányos megközelítés', desc: 'A képzés mélysége az alkalmazott AI rendszerek kockázati besorolásához igazodik — magasabb kockázat, szigorúbb követelmények.', icon: Shield },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon className="w-5 h-5 text-[#051c2c]/40" />
                    <h3 className="font-semibold text-[#051c2c]">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PILLAR 2 — Governance Documentation */}
        <section className="py-20 bg-[#f7f7f7]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">2. pillér</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#051c2c] mb-4 font-bold">Governance dokumentáció</h2>
              <p className="text-base text-gray-500 max-w-2xl">
                A szabályozás megköveteli, hogy a szervezetek átlátható irányítási keretrendszert hozzanak létre az AI használatukhoz. Ez nem opcionális — a hatóságok a governance dokumentációt kérik elsőként.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: 'AI-használati szabályzat', desc: 'Formális vállalati policy, amely rögzíti az AI eszközök használatának kereteit, engedélyezett alkalmazásait és korlátait.', icon: FileText },
                { title: 'Felelősségi mátrix', desc: 'Egyértelműen definiált szerepkörök és felelősségek: ki felel az AI rendszerek felügyeletéért, a megfelelőségért és az incidenskezelésért.', icon: Users },
                { title: 'Döntéshozatali keretrendszer', desc: 'Strukturált folyamat új AI rendszerek bevezetésére, értékelésére és az alkalmazás feltételeinek meghatározására.', icon: Scale },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 p-8 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#051c2c] flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#051c2c]">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PILLAR 3 — Risk Management */}
        <section className="py-20 bg-[#051c2c]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#00a9f4]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00a9f4]/70">3. pillér</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-white mb-4 font-bold">Kockázatkezelés</h2>
              <p className="text-base text-white/60 max-w-2xl">
                Az EU AI Act kockázatalapú megközelítést alkalmaz. A szervezeteknek azonosítaniuk, osztályozniuk és nyilvántartaniuk kell az általuk használt AI rendszereket, és a kockázati szintnek megfelelő intézkedéseket kell hozniuk.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: 'AI rendszer-nyilvántartás', desc: 'A szervezetnek teljes körű leltárt kell vezetnie az összes alkalmazott AI rendszerről, beleértve azok célját, felhasználóit és adatforrásait.' },
                { title: 'Kockázati besorolás', desc: 'Minden AI rendszert a jogszabály szerinti négy kategória egyikébe kell sorolni: elfogadhatatlan, magas, korlátozott vagy minimális kockázatú.' },
                { title: 'Hatásvizsgálat', desc: 'Magas kockázatú rendszereknél kötelező a rendszeres hatásvizsgálat, amely dokumentálja a potenciális kockázatokat és az azok kezelésére tett lépéseket.' },
                { title: 'Incidenskezelési protokoll', desc: 'Előre definiált eljárásrend AI-hoz köthető incidensek (hibás kimenetek, adatvédelmi sértések, elfogultságok) kezelésére és jelentésére.' },
              ].map((item, i) => (
                <div key={i} className="border border-white/10 p-6 hover:border-white/20 transition-colors">
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BASE DOCUMENTS — What AWF provides */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">Amit biztosítunk</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#051c2c] mb-4 font-bold">Alapdokumentumok az AI Work Fluency-től</h2>
              <p className="text-base text-gray-500 max-w-2xl">
                A megfelelőség nem állhat meg a képzésnél. Az AI Work Fluency kész, testreszabható dokumentumcsomagokat biztosít, amelyekkel a szervezet azonnal auditálható állapotba kerül.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200">
              {[
                { title: 'AI-használati szabályzatok', desc: 'Testre szabható vállalati AI policy dokumentumok, amelyek lefedik a használat kereteit, engedélyezett eszközöket és korlátokat.', icon: FileText },
                { title: 'Kockázatértékelési sablonok', desc: 'Strukturált sablonok az AI rendszerek kockázati besorolásához és a kötelező hatásvizsgálatok elvégzéséhez.', icon: AlertTriangle },
                { title: 'Képzési elvégzési nyilvántartás', desc: 'Automatikusan generált, munkavállalónkénti dokumentáció a képzési dátumokról, tartalmakról és kompetenciaeredményekről.', icon: ClipboardCheck },
                { title: 'Governance keretrendszer dokumentumok', desc: 'Teljes irányítási keretrendszer: szervezeti felépítés, döntéshozatali folyamatok, felügyeleti mechanizmusok az AI használathoz.', icon: FolderCheck },
                { title: 'Auditálásra kész riportcsomagok', desc: 'Hatósági vizsgálatra kész, strukturált bizonyítékcsomagok, amelyek egy helyen tartalmazzák az összes megfelelőségi dokumentumot.', icon: FileCheck2 },
                { title: 'Felelősségi mátrix sablonok', desc: 'RACI-alapú mátrix sablonok, amelyek egyértelműen kijelölik az AI governance felelősségeit a szervezet minden szintjén.', icon: BarChart3 },
              ].map((item, i) => (
                <div key={i} className={`p-8 ${i < 3 ? 'border-b border-gray-200' : ''} ${i % 3 !== 2 ? 'lg:border-r border-gray-200' : ''} ${i % 2 === 0 && i < 4 ? 'sm:border-r lg:border-r-0 border-gray-200' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#051c2c] flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-[#051c2c] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY AWF — Differentiators */}
        <section className="py-20 bg-[#f7f7f7]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">Miért az AI Work Fluency</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#051c2c] mb-4 font-bold">Egy partner, teljes megfelelőség</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Nem csak képzés, hanem rendszer', desc: 'Az AI Work Fluency nem egy újabb e-learning platform. Átfogó megfelelőségi rendszert biztosítunk: képzés, dokumentáció, nyilvántartás és riportálás egy integrált megoldásban.' },
                { title: 'Azonnal bevezethető', desc: 'Nem kell hónapokig fejleszteni a belső keretrendszert. Kész, bevált sablonjaink és folyamataink azonnali bevezetést tesznek lehetővé.' },
                { title: 'Hatósági szemmel tervezve', desc: 'Dokumentumaink és riportjaink a szabályozói elvárásoknak megfelelően készülnek — nem a szervezet belső igényeihez, hanem az audit követelményeihez igazodnak.' },
                { title: 'Folyamatos naprakészség', desc: 'A szabályozás fejlődik, a dokumentumok és képzések automatikusan frissülnek. Nem kell külön figyelni a jogszabályváltozásokat.' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 p-8 hover:shadow-sm transition-shadow">
                  <h3 className="font-semibold text-[#051c2c] mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">Határidők</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#051c2c] font-bold">A megfelelőség ütemterve</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 relative">
              <div className="hidden sm:block absolute top-5 left-[16%] right-[16%] h-[1px] bg-[#051c2c]/15" />
              {[
                { date: '2025. február 2.', title: 'AI-jártassági kötelezettség hatályba lép', desc: 'A 4. cikk alkalmazandóvá válik. Minden AI-t használó szervezetnek biztosítania kell munkatársai AI-jártasságát.', status: 'active' },
                { date: '2026. augusztus 2.', title: 'Hatósági kikényszerítés indul', desc: 'A nemzeti hatóságok megkezdhetik a vizsgálatokat és akár 35 millió eurós bírságot szabhatnak ki.', status: 'upcoming' },
                { date: '2027. augusztus 2.', title: 'Magas kockázatú rendszerek teljes megfelelősége', desc: 'A magas kockázatú AI rendszerekre vonatkozó összes követelmény alkalmazandóvá válik, beleértve a részletes dokumentációs kötelezettségeket.', status: 'future' },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className={`w-10 h-10 font-semibold text-sm flex items-center justify-center mb-5 relative z-10 ${item.status === 'active' ? 'bg-red-600 text-white' : item.status === 'upcoming' ? 'bg-[#00a9f4] text-white' : 'bg-[#051c2c] text-white'}`}>
                    {i + 1}
                  </div>
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${item.status === 'active' ? 'text-red-600' : item.status === 'upcoming' ? 'text-[#00a9f4]' : 'text-[#051c2c]/50'}`}>
                    {item.date}
                  </div>
                  <h3 className="font-semibold text-[#051c2c] mb-2 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — Final */}
        <section className="py-24 bg-[#051c2c]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-white mb-6 leading-tight font-bold">
              A kötelezettség már él.<br />A kérdés az, hogy Ön felkészült-e.
            </h2>
            <p className="text-base text-white/50 mb-10 max-w-xl mx-auto">
              Az AI Work Fluency nem csak a képzési kötelezettségben segít — teljes körű megfelelőségi partnert kap, aki a governance dokumentációtól a kockázatkezelésen át az auditálásra kész riportcsomagokig mindent biztosít.
            </p>
            <Link href="/lp/eu-compliance/v2/hu" className="bg-[#00a9f4] hover:bg-[#0090d0] text-white font-semibold text-base py-3.5 px-10 inline-flex items-center gap-3 transition-colors group">
              Ingyenes megfelelőségi felmérés
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-white/30 mt-4 text-sm">Nincs kötelezettség. 15 perces konzultáció. Teljes tisztánlátás.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#031018] text-white/40 py-10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border border-white/20 flex items-center justify-center">
                  <span className="text-white/60 font-bold text-[8px]">AWF</span>
                </div>
                <div>
                  <span className="text-white/60 text-sm font-semibold">AI Work Fluency</span>
                  <span className="text-white/30 text-sm ml-2">by Rebelframes Kft.</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm">
                <span className="text-white/40">+36 1 901 0721</span>
                <Link href="/lp/eu-compliance/v2/hu" className="hover:text-white transition-colors">EU AI Act megfelelőség</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">Adatvédelmi irányelvek</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Felhasználási feltételek</Link>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6">
              <p className="text-[11px] text-white/25 leading-relaxed max-w-3xl">
                Jogi tájékoztató: Az oldalon található információk tájékoztató jellegűek, és nem minősülnek hivatalos jogi tanácsadásnak. Az EU AI Act értelmezése és alkalmazása az adott szervezet egyedi körülményeitől függ. Javasoljuk, hogy a konkrét megfelelőségi kérdésekben kérje szakértő jogi tanácsadó véleményét. Az AI Work Fluency szolgáltatásai a megfelelőségi felkészülést támogatják, de nem helyettesítik a jogi tanácsadást.
              </p>
              <p className="text-[11px] text-white/20 mt-4">&copy; 2026 Rebelframes Kft. Minden jog fenntartva.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
