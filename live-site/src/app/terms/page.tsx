import Link from 'next/link';

export const metadata = {
  title: 'Felhasználási Feltételek — AI Work Fluency',
  description: 'Az AI Work Fluency felhasználási feltételei. A szolgáltatás igénybevételének szabályai.',
};

export default function TermsPage() {
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
              <Link href="/rolunk" className="text-sm text-white/60 hover:text-white transition-colors">Rólunk</Link>
              <Link href="/lp/eu-compliance/v2/hu" className="bg-white text-[#051c2c] font-semibold text-sm py-2 px-5 hover:bg-gray-100 transition-colors">
                Megfelelőség
              </Link>
            </div>
          </div>
        </nav>

        {/* Header */}
        <section className="bg-[#051c2c] pt-16 pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-[2px] bg-[#00a9f4]" />
              <span className="text-[#00a9f4] text-xs font-semibold tracking-[0.2em] uppercase">Jogi dokumentum</span>
            </div>
            <h1 className="font-serif-heading text-3xl sm:text-4xl text-white font-bold mb-4">Felhasználási Feltételek</h1>
            <p className="text-sm text-white/40">Utolsó frissítés: 2026. március 11.</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-12 text-[15px] text-gray-600 leading-relaxed">

              {/* 1. Feltételek elfogadása */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">1. A feltételek elfogadása</h2>
                <p>Az AI Work Fluency szolgáltatás (a továbbiakban: &quot;Szolgáltatás&quot;) elérésével vagy használatával Ön elfogadja jelen Felhasználási Feltételeket. A Szolgáltatást a Rebelframes Kft. (a továbbiakban: &quot;Szolgáltató&quot;, &quot;mi&quot;) üzemelteti az aiworkfluency.com weboldalon.</p>
                <p className="mt-3">Amennyiben Ön egy szervezet nevében veszi igénybe a Szolgáltatást, szavatol azért, hogy jogosult az adott szervezet nevében eljárni és jelen feltételeket annak nevében elfogadni.</p>
              </div>

              {/* 2. Szolgáltatás leírása */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">2. A Szolgáltatás leírása</h2>
                <p className="mb-4">Az AI Work Fluency az alábbi szolgáltatásokat nyújtja:</p>
                <div className="space-y-3">
                  {[
                    { title: 'AI-jártassági képzés', desc: 'Személyre szabott, szerepkör-specifikus AI képzési programok, amelyek megfelelnek az EU AI Act 4. cikk szerinti jártassági követelményeknek.' },
                    { title: 'Megfelelőségi dokumentáció', desc: 'Automatikusan generált, auditálásra kész dokumentáció, amely igazolja a szervezet EU AI Act megfelelőségét.' },
                    { title: 'Megfelelőségi értékelés', desc: 'A szervezet jelenlegi AI-jártassági szintjének felmérése és a szükséges fejlesztési lépések meghatározása.' },
                    { title: 'Irányítási (governance) támogatás', desc: 'AI-használati szabályzatok kialakítása, kockázatkezelési keretrendszer, folyamatos megfelelőség-monitoring.' },
                  ].map((item, i) => (
                    <div key={i} className="border border-gray-200 p-5">
                      <h3 className="font-semibold text-[#051c2c] text-sm mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500">A Szolgáltatás keretében generált tartalmak (képzési anyagok, értékelések, dokumentáció) mesterséges intelligencia segítségével készülnek. Bár törekszünk a pontosságra, ezek nem helyettesítik a szakmai jogi tanácsadást.</p>
              </div>

              {/* 3. Felhasználói kötelezettségek */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">3. A Felhasználó kötelezettségei</h2>
                <p className="mb-3">A Szolgáltatás használata során a Felhasználó köteles:</p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>Valós és pontos adatokat megadni a regisztráció és a szolgáltatás igénybevétele során</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>Fiókjának hozzáférési adatait bizalmasan kezelni és azokat harmadik személyekkel nem megosztani</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>A Szolgáltatást kizárólag jogszerű célokra és rendeltetésszerűen használni</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>A fiókjával történő bármely jogosulatlan hozzáférésről haladéktalanul értesíteni a Szolgáltatót</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>Nem megkísérelni a Szolgáltatás forráskódjának visszafejtését, dekompilálását vagy feltörését</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>A Szolgáltatás működését nem zavarni, túlterhelni vagy automatizált eszközökkel nem használni</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>Jogellenes, káros vagy harmadik személyek jogait sértő tartalmat nem feltölteni</span></li>
                </ul>
                <p className="mt-3 text-sm text-gray-500">A Szolgáltatás használatához a felhasználónak legalább 16 évesnek kell lennie.</p>
              </div>

              {/* 4. Szellemi tulajdon */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">4. Szellemi tulajdon</h2>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#00a9f4] pl-5">
                    <h3 className="font-semibold text-[#051c2c] mb-1">A Szolgáltató szellemi tulajdona</h3>
                    <p className="text-sm text-gray-500">A Szolgáltatás, annak dizájnja, funkciói, képzési anyagai és az AI által generált tartalmak a Szolgáltató szellemi tulajdonát képezik vagy azokra vonatkozóan a Szolgáltató felhasználási joggal rendelkezik. Ezek másolása, terjesztése vagy felhasználása kizárólag a Szolgáltató előzetes írásbeli hozzájárulásával lehetséges.</p>
                  </div>
                  <div className="border-l-2 border-[#00a9f4] pl-5">
                    <h3 className="font-semibold text-[#051c2c] mb-1">A Felhasználó tartalma</h3>
                    <p className="text-sm text-gray-500">A Felhasználó megőrzi tulajdonjogát az általa feltöltött tartalmak felett. A tartalom feltöltésével a Felhasználó nem kizárólagos, térben és időben korlátlan felhasználási jogot biztosít a Szolgáltatónak a tartalom kezelésére, értékelésére és tárolására a Szolgáltatás nyújtásának céljából.</p>
                  </div>
                  <div className="border-l-2 border-[#00a9f4] pl-5">
                    <h3 className="font-semibold text-[#051c2c] mb-1">Visszajelzés</h3>
                    <p className="text-sm text-gray-500">A Felhasználó által adott javaslatok és visszajelzések a Szolgáltató által szabadon felhasználhatók a Szolgáltatás fejlesztése céljából, ezért ellenszolgáltatás nem jár.</p>
                  </div>
                </div>
              </div>

              {/* 5. Díjak és fizetési feltételek */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">5. Díjak és fizetési feltételek</h2>
                <div className="border border-gray-200">
                  <div className="p-5 border-b border-gray-200">
                    <h3 className="font-semibold text-[#051c2c] text-sm mb-1">Árazás</h3>
                    <p className="text-sm text-gray-500">A Szolgáltatás díjait a mindenkori árlistánk tartalmazza. Az árak magyar forintban (HUF) értendők és az ÁFA-t nem tartalmazzák, kivéve ha ezt külön jelezzük.</p>
                  </div>
                  <div className="p-5 border-b border-gray-200">
                    <h3 className="font-semibold text-[#051c2c] text-sm mb-1">Fizetési módok</h3>
                    <p className="text-sm text-gray-500">Banki átutalás, bankkártyás fizetés. Az online fizetéseket biztonságos, PCI DSS megfelelőséggel rendelkező fizetési szolgáltatón keresztül dolgozzuk fel.</p>
                  </div>
                  <div className="p-5 border-b border-gray-200">
                    <h3 className="font-semibold text-[#051c2c] text-sm mb-1">Számlázás</h3>
                    <p className="text-sm text-gray-500">Az előfizetési díjak a választott ciklus (havi vagy éves) szerint, előre esedékesek. Vállalati csomagok esetén egyedi számlázási feltételek állapíthatók meg.</p>
                  </div>
                  <div className="p-5 border-b border-gray-200">
                    <h3 className="font-semibold text-[#051c2c] text-sm mb-1">Lemondás</h3>
                    <p className="text-sm text-gray-500">Az előfizetés bármikor lemondható. Lemondás esetén a hozzáférés az aktuális számlázási időszak végéig fennmarad. A már kifizetett díjak időarányos visszatérítésére nincs lehetőség, kivéve ha jogszabály másképp rendelkezik.</p>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-[#051c2c] text-sm mb-1">Árváltoztatás</h3>
                    <p className="text-sm text-gray-500">A Szolgáltató fenntartja a jogot az árak módosítására. Árváltozásról a Felhasználót legalább 30 nappal a hatályba lépés előtt értesítjük. Az új ár elfogadásának hiányában a Felhasználó jogosult az előfizetés lemondására.</p>
                  </div>
                </div>
              </div>

              {/* 6. Felelősség korlátozása */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">6. Felelősség korlátozása</h2>
                <p className="mb-3">A Szolgáltató felelőssége a jogszabályok által megengedett legteljesebb mértékben korlátozott:</p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>A Szolgáltató nem felel a Szolgáltatás használatából eredő közvetett, következményes, eseti vagy büntető jellegű károkért.</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>A Szolgáltató teljes kártérítési felelőssége nem haladhatja meg a Felhasználó által az igény felmerülését megelőző 12 hónapban a Szolgáltatásért fizetett összeget.</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>A Szolgáltatás &quot;ahogy van&quot; és &quot;ahogy elérhető&quot; alapon nyújtott, mindenféle kifejezett vagy hallgatólagos szavatosság nélkül.</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>Az AI által generált tartalom esetleges pontatlanságaiért a Szolgáltató nem vállal felelősséget. A képzési anyagok nem minősülnek jogi tanácsadásnak.</span></li>
                </ul>
                <p className="mt-3 text-sm text-gray-500">A jelen pont nem érinti a fogyasztóvédelmi jogszabályokban biztosított jogokat, amelyektől a Szolgáltató nem térhet el a Felhasználó hátrányára.</p>
              </div>

              {/* 7. Megszüntetés */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">7. A szolgáltatás megszüntetése</h2>
                <p className="mb-3">A Szolgáltató jogosult a Felhasználó hozzáférését felfüggeszteni vagy megszüntetni:</p>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>A jelen Felhasználási Feltételek megsértése esetén, azonnali hatállyal</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>A Szolgáltatás üzleti alapú megszüntetése esetén, legalább 60 napos előzetes értesítés mellett</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span>Vis major esetén, a körülmények fennállásának időtartamára</span></li>
                </ul>
                <p className="mt-3">Megszüntetés esetén a Felhasználó jogosult adatainak exportjára a megszüntetéstől számított 30 napon belül. E határidő elteltével a Szolgáltató törli a Felhasználó adatait, a jogszabályi kötelezettségek keretében megőrzendő adatok kivételével.</p>
              </div>

              {/* 8. Irányadó jog és jogviták */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">8. Irányadó jog és jogviták rendezése</h2>
                <div className="border border-gray-200 p-6 space-y-3">
                  <p><strong className="text-[#051c2c]">Irányadó jog:</strong> Jelen Felhasználási Feltételekre a magyar jog és az Európai Unió vonatkozó jogszabályai az irányadók.</p>
                  <p><strong className="text-[#051c2c]">Vitarendezés:</strong> A felek törekednek a viták békés rendezésére. Amennyiben ez nem vezet eredményre, a jogviták eldöntésére a Budapesti II. és III. Kerületi Bíróság, illetve hatáskörtől függően a Fővárosi Törvényszék rendelkezik kizárólagos illetékességgel.</p>
                  <p><strong className="text-[#051c2c]">Online vitarendezés:</strong> Az Európai Bizottság online vitarendezési platformja elérhető a <a href="https://ec.europa.eu/consumers/odr" className="text-[#00a9f4] hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a> címen.</p>
                  <p><strong className="text-[#051c2c]">Fogyasztóvédelem:</strong> Fogyasztói jogvita esetén a Felhasználó a lakóhelye szerint illetékes békéltető testülethez fordulhat.</p>
                </div>
              </div>

              {/* 9. Vis major */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">9. Vis major</h2>
                <p>A Szolgáltató nem felel az olyan kötelezettségszegésért, amely az ellenőrzési körén kívül eső, előre nem látható körülmények miatt következik be, ideértve különösen: természeti katasztrófák, járványok, háború, terrorizmus, sztrájk, áramkimaradás, internetszolgáltatás kiesése, hatósági intézkedések.</p>
              </div>

              {/* 10. Feltételek módosítása */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">10. A feltételek módosítása</h2>
                <p>A Szolgáltató fenntartja a jogot jelen Felhasználási Feltételek módosítására. A lényeges változásokról legalább 15 nappal a hatályba lépés előtt e-mailben vagy a Szolgáltatáson keresztül értesítjük a Felhasználót. A módosított feltételek elfogadásának hiányában a Felhasználó jogosult az előfizetés lemondására.</p>
              </div>

              {/* 11. Egyéb rendelkezések */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">11. Egyéb rendelkezések</h2>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span><strong className="text-[#051c2c]">Részleges érvénytelenség:</strong> Ha jelen feltételek bármely rendelkezése érvénytelennek minősül, az a többi rendelkezés érvényességét nem érinti.</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span><strong className="text-[#051c2c]">Teljes megállapodás:</strong> Jelen Felhasználási Feltételek (az Adatvédelmi Tájékoztatóval együtt) a Szolgáltató és a Felhasználó közötti teljes megállapodást képezik.</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span><strong className="text-[#051c2c]">Joglemondás:</strong> A Szolgáltató bármely joga gyakorlásának elmulasztása nem jelenti az adott jogról való lemondást.</span></li>
                </ul>
              </div>

              {/* 12. Kapcsolat */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">12. Kapcsolat</h2>
                <div className="border border-gray-200 p-6 space-y-2">
                  <p>A Felhasználási Feltételekkel kapcsolatos kérdéseivel kérjük, forduljon hozzánk:</p>
                  <p><strong className="text-[#051c2c]">E-mail:</strong> <a href="mailto:hello@aiworkfluency.com" className="text-[#00a9f4] hover:underline">hello@aiworkfluency.com</a></p>
                  <p><strong className="text-[#051c2c]">Telefon:</strong> +36 1 901 0721</p>
                  <p><strong className="text-[#051c2c]">Üzemeltető:</strong> Rebelframes Kft.</p>
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
                <Link href="/privacy" className="hover:text-white transition-colors">Adatvédelem</Link>
                <Link href="/rolunk" className="hover:text-white transition-colors">Rólunk</Link>
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
