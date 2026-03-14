import Link from 'next/link';
import { ArrowRight, Shield, Target, BarChart3, Scale, BookOpen, Users, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Rólunk — AI Work Fluency',
  description: 'Az AI Work Fluency csapata. EU AI Act megfelelőség, AI-jártassági képzés és vállalati AI governance szakértők.',
};

export default function AboutPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{ __html: `
        .font-serif-heading { font-family: 'Libre Baskerville', Georgia, 'Times New Roman', serif; }
      `}} />

      <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Nav */}
        <nav className="bg-[#051c2c] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-white/80 flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-tight">AWF</span>
              </div>
              <span className="text-[15px] font-semibold text-white tracking-wide">AI Work Fluency</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/eu-ai-act/hu" className="text-sm text-white/60 hover:text-white transition-colors">EU AI Act</Link>
              <Link href="/lp/eu-compliance/v2/hu" className="bg-white text-[#051c2c] font-semibold text-sm py-2 px-5 hover:bg-gray-100 transition-colors">
                Megfelelőség
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#051c2c]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#051c2c_0%,#0a3152_50%,#051c2c_100%)]" />
          <div className="relative max-w-5xl mx-auto px-6 pt-20 sm:pt-28 pb-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-[2px] bg-[#00a9f4]" />
                <span className="text-[#00a9f4] text-xs font-semibold tracking-[0.2em] uppercase">Rólunk</span>
              </div>
              <h1 className="font-serif-heading text-4xl sm:text-5xl text-white leading-[1.15] mb-8 font-bold">
                A szabályozás és a{' '}
                <span className="text-[#00a9f4]">gyakorlati megvalósítás</span>{' '}
                közötti híd.
              </h1>
              <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
                Az AI Work Fluency abból a felismerésből született, hogy az EU AI Act megfelelőség nem egy jogi checklist — hanem egy szervezeti képesség. Mi ezt a képességet építjük fel a cégek számára: gyakorlatias, mérhető, auditálható módon.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">Küldetésünk</span>
              </div>
              <h2 className="font-serif-heading text-3xl text-[#051c2c] mb-6 font-bold">Miért létezünk</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-12">
              <div className="space-y-4 text-[15px] text-gray-600 leading-relaxed">
                <p>Az EU AI Act 4. cikke 2025. február 2. óta hatályban van. Minden AI-t használó szervezetnek biztosítania kell munkavállalói AI-jártasságát. 2026 augusztusától a nemzeti hatóságok vizsgálatokat indíthatnak és jelentős bírságokat szabhatnak ki.</p>
                <p>A legtöbb cég tudja, hogy lépnie kell — de nem tudja, <strong className="text-[#051c2c]">hogyan</strong>. A jogi szöveg nem mondja meg, milyen képzés elegendő. A compliance tanácsadók nem foglalkoznak a gyakorlati megvalósítással. Az AI oktatók nem értik a szabályozást.</p>
              </div>
              <div className="space-y-4 text-[15px] text-gray-600 leading-relaxed">
                <p>Mi ezt a három világot kötjük össze. Olyan csapat vagyunk, amely érti a szabályozást, képes azt lefordítani gyakorlati követelményekre, és rendelkezik a technológiával, hogy vállalati szinten megvalósítsa.</p>
                <p>Nem elméleti tananyagot adunk. <strong className="text-[#051c2c]">Mérhető AI-jártasságot építünk</strong>, auditálásra kész dokumentációval, ami megáll a hatóság előtt.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-20 bg-[#f7f7f7]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">Kompetenciáink</span>
              </div>
              <h2 className="font-serif-heading text-3xl text-[#051c2c] mb-4 font-bold">Amiben szakértők vagyunk</h2>
              <p className="text-base text-gray-500 max-w-2xl">Három területen rendelkezünk mély szakértelemmel — és ezek metszéspontja tesz egyedülállóvá.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Scale,
                  title: 'Szabályozási szakértelem',
                  items: ['EU AI Act teljes körű ismerete', '4. cikk (AI literacy) mélyreható értelmezése', 'Magyar és EU adatvédelmi jog', 'Hatósági elvárások és audit-felkészültség'],
                },
                {
                  icon: BookOpen,
                  title: 'AI-jártassági képzés',
                  items: ['Szerepkör-specifikus képzési programok', 'Kompetencia-alapú értékelési keretrendszer', 'Gyakorlati, nem elméleti megközelítés', 'Mesterséges intelligenciával támogatott feladatgenerálás'],
                },
                {
                  icon: Users,
                  title: 'Vállalati megvalósítás',
                  items: ['Nagyvállalati szintű bevezetés', 'Vezetői dashboard és riportálás', 'HR és compliance rendszerintegrációk', 'Folyamatos megfelelőség-monitoring'],
                },
              ].map((area, i) => (
                <div key={i} className="bg-white border border-gray-200 p-8">
                  <div className="w-12 h-12 bg-[#051c2c] flex items-center justify-center mb-6">
                    <area.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#051c2c] mb-4">{area.title}</h3>
                  <ul className="space-y-2">
                    {area.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-[#00a9f4] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why trust us */}
        <section className="py-20 bg-[#051c2c]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#00a9f4]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00a9f4]/70">Miért mi</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-white mb-4 font-bold">Miért minket válasszanak</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'Nem elméleti, hanem gyakorlati',
                  desc: 'Nem slide-okat küldünk, hanem működő képzési rendszert adunk, amely napról napra építi a csapat tényleges AI-kompetenciáját. A munkavállalók a saját munkakörükben releváns feladatokon tanulnak.',
                },
                {
                  title: 'Mérhető eredmények',
                  desc: 'Minden munkavállaló haladása nyomon követhető. Kompetenciapontszámok, elvégzési arányok, fejlődési görbék — valós adatok, nem szubjektív benyomások.',
                },
                {
                  title: 'Auditálásra kész dokumentáció',
                  desc: 'Automatikusan generált megfelelőségi riportok, amelyek igazolják a hatóság felé: ki, mikor, milyen képzésben részesült, és milyen szintre jutott.',
                },
                {
                  title: 'Teljes körű megoldás',
                  desc: 'Nem kell külön compliance tanácsadót, AI oktatót és IT rendszert összehangolnia. Egyetlen platformon kezeljük a képzést, az értékelést és a dokumentációt.',
                },
                {
                  title: 'Magyar piaci jelenlét',
                  desc: 'Magyar nyelvű képzési tartalom, magyar jogi háttérrel, magyar ügyfélszolgálattal. Értjük a helyi üzleti környezetet és a magyar hatósági elvárásokat.',
                },
                {
                  title: 'Skálázható technológia',
                  desc: '10 fős csapattól 10 000 fős vállalatokig. A platform AI-alapú feladatgenerálása biztosítja, hogy minden munkavállaló releváns, személyre szabott tartalmakat kapjon.',
                },
              ].map((item, i) => (
                <div key={i} className="border border-white/10 p-6 hover:border-white/20 transition-colors">
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">Értékeink</span>
              </div>
              <h2 className="font-serif-heading text-3xl text-[#051c2c] mb-4 font-bold">Amiben hiszünk</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-px bg-gray-200">
              {[
                {
                  icon: Shield,
                  title: 'Megfelelőség az első',
                  desc: 'Minden, amit fejlesztünk, a szabályozási megfelelőség szemszögéből indul. A képzési tartalom, az értékelési keretrendszer és a dokumentáció egyaránt az EU AI Act követelményeire épül.',
                },
                {
                  icon: Target,
                  title: 'Gyakorlatias megközelítés',
                  desc: 'Nem hiszünk az általános, mindenki számára egyforma képzésekben. A valódi AI-jártasság csak a munkakörben releváns, gyakorlati feladatokon keresztül építhető fel.',
                },
                {
                  icon: BarChart3,
                  title: 'Mérhető kimenet',
                  desc: 'Amit nem lehet mérni, azt nem lehet fejleszteni. Kompetencia-alapú értékeléseink pontos képet adnak a szervezet AI-felkészültségéről és a fejlődésről.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 text-center">
                  <div className="w-12 h-12 mx-auto mb-5 bg-[#051c2c] flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#051c2c] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#051c2c]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-white mb-6 leading-tight font-bold">
              Beszéljünk a cége megfelelőségéről.
            </h2>
            <p className="text-base text-white/50 mb-10 max-w-xl mx-auto">
              Ingyenes felmérésünk megmutatja, hol tart a szervezet az EU AI Act követelményeinek teljesítésében — és pontosan milyen lépések szükségesek.
            </p>
            <Link href="/lp/eu-compliance/v2/hu" className="bg-[#00a9f4] hover:bg-[#0090d0] text-white font-semibold text-base py-3.5 px-10 inline-flex items-center gap-3 transition-colors group">
              Ingyenes megfelelőségi felmérés
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-white/30 mt-4 text-sm">Nincs kötelezettség. 15 perces beszélgetés. Teljes tisztánlátás.</p>
          </div>
        </section>

        {/* Company info */}
        <section className="py-12 bg-[#0a1628] border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
              <div>
                <h3 className="font-semibold text-white text-sm mb-3">Céginformáció</h3>
                <div className="space-y-1 text-sm text-white/40">
                  <p>Rebelframes Kft.</p>
                  <p>Telefon: +36 1 901 0721</p>
                  <p>E-mail: <a href="mailto:hello@aiworkfluency.com" className="text-[#00a9f4] hover:underline">hello@aiworkfluency.com</a></p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-3">Hasznos linkek</h3>
                <div className="space-y-1 text-sm">
                  <p><Link href="/lp/eu-compliance/v2/hu" className="text-white/40 hover:text-white transition-colors">EU AI Act megfelelőség</Link></p>
                  <p><Link href="/eu-ai-act/hu" className="text-white/40 hover:text-white transition-colors">EU AI Act összefoglaló</Link></p>
                  <p><Link href="/privacy" className="text-white/40 hover:text-white transition-colors">Adatvédelmi tájékoztató</Link></p>
                  <p><Link href="/terms" className="text-white/40 hover:text-white transition-colors">Felhasználási feltételek</Link></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#031018] text-white/40 py-8">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border border-white/20 flex items-center justify-center">
                  <span className="text-white/60 font-bold text-[8px]">AWF</span>
                </div>
                <p className="text-white/40">&copy; 2026 AI Work Fluency. Minden jog fenntartva.</p>
              </div>
              <div className="flex gap-6">
                <Link href="/lp/eu-compliance/v2/hu" className="hover:text-white transition-colors">Megfelelőség</Link>
                <Link href="/eu-ai-act/hu" className="hover:text-white transition-colors">EU AI Act</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">Adatvédelem</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Feltételek</Link>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 text-center">
              <p className="text-[11px] text-white/20">Rebelframes Kft. &bull; +36 1 901 0721 &bull; hello@aiworkfluency.com</p>
              <p className="text-[10px] text-white/15 mt-1">Az oldalon található információk kizárólag tájékoztató jellegűek és nem minősülnek jogi tanácsadásnak. Konkrét jogi kérdésekben kérjük, forduljon szakértő jogászhoz.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
