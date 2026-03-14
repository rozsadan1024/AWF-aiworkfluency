import Link from 'next/link';

export const metadata = {
  title: 'Adatvédelmi Tájékoztató — AI Work Fluency',
  description: 'Az AI Work Fluency adatvédelmi tájékoztatója. Hogyan gyűjtjük, használjuk és védjük az Ön adatait.',
};

export default function PrivacyPage() {
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
            <h1 className="font-serif-heading text-3xl sm:text-4xl text-white font-bold mb-4">Adatvédelmi Tájékoztató</h1>
            <p className="text-sm text-white/40">Utolsó frissítés: 2026. március 11.</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-12 text-[15px] text-gray-600 leading-relaxed">

              {/* 1. Adatkezelő */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">1. Az adatkezelő megnevezése</h2>
                <div className="border border-gray-200 p-6 space-y-2">
                  <p><strong className="text-[#051c2c]">Cégnév:</strong> Rebelframes Kft.</p>
                  <p><strong className="text-[#051c2c]">Szolgáltatás neve:</strong> AI Work Fluency</p>
                  <p><strong className="text-[#051c2c]">Weboldal:</strong> aiworkfluency.com</p>
                  <p><strong className="text-[#051c2c]">Telefonszám:</strong> +36 1 901 0721</p>
                  <p><strong className="text-[#051c2c]">E-mail:</strong> <a href="mailto:hello@aiworkfluency.com" className="text-[#00a9f4] hover:underline">hello@aiworkfluency.com</a></p>
                </div>
                <p className="mt-4">A Rebelframes Kft. (a továbbiakban: &quot;Adatkezelő&quot;, &quot;mi&quot;) üzemelteti az AI Work Fluency szolgáltatást. Jelen adatvédelmi tájékoztató ismerteti, hogyan gyűjtjük, kezeljük, tároljuk és védjük az Ön személyes adatait a GDPR (az Európai Parlament és a Tanács (EU) 2016/679 rendelete) és a magyar adatvédelmi jogszabályok (2011. évi CXII. törvény az információs önrendelkezési jogról és az információszabadságról) rendelkezéseivel összhangban.</p>
              </div>

              {/* 2. Gyűjtött adatok */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">2. Az általunk gyűjtött személyes adatok</h2>

                <h3 className="font-semibold text-[#051c2c] mb-2 mt-6">2.1 Az Ön által megadott adatok</h3>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span><strong className="text-[#051c2c]">Kapcsolattartási adatok:</strong> vezetéknév, keresztnév, e-mail cím, telefonszám</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span><strong className="text-[#051c2c]">Céges adatok:</strong> cégnév, beosztás, iparág, vállalatméret</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span><strong className="text-[#051c2c]">Fizetési adatok:</strong> számlázási név és cím (bankkártya adatokat közvetlenül a fizetési szolgáltató kezeli, mi nem tároljuk)</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span><strong className="text-[#051c2c]">Kommunikáció:</strong> az Ön által küldött e-mailek, kapcsolatfelvételi űrlapokon megadott információk</span></li>
                </ul>

                <h3 className="font-semibold text-[#051c2c] mb-2 mt-6">2.2 Automatikusan gyűjtött adatok</h3>
                <ul className="list-none space-y-2 ml-0">
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span><strong className="text-[#051c2c]">Használati adatok:</strong> meglátogatott oldalak, használt funkciók, a weboldalon eltöltött idő, interakciós minták</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span><strong className="text-[#051c2c]">Eszközadatok:</strong> böngésző típusa, operációs rendszer, IP-cím, képernyőfelbontás</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#00a9f4] mt-1">&#8212;</span><span><strong className="text-[#051c2c]">Cookie-k:</strong> munkamenet-azonosítók, preferencia-beállítások, analitikai azonosítók (részleteket lásd a 8. pontban)</span></li>
                </ul>
              </div>

              {/* 3. Adatkezelés célja */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">3. Az adatkezelés céljai</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Szolgáltatásnyújtás', desc: 'AI-jártassági képzés biztosítása, személyre szabott tartalom generálása, haladás nyomon követése, megfelelőségi dokumentáció készítése.' },
                    { title: 'Megfelelőségi értékelés', desc: 'Az Ön szervezetének EU AI Act megfelelőségi állapotának felmérése és a szükséges lépések meghatározása.' },
                    { title: 'Kommunikáció', desc: 'Kapcsolattartás az Önnel a szolgáltatásainkkal kapcsolatban, kérdések megválaszolása, tájékoztatás változásokról.' },
                    { title: 'Szolgáltatásfejlesztés', desc: 'Platformunk fejlesztése, új funkciók kidolgozása, felhasználói élmény javítása anonimizált használati adatok elemzésével.' },
                    { title: 'Jogi megfelelőség', desc: 'Jogszabályi kötelezettségek teljesítése, beleértve az EU AI Act dokumentációs követelményeit.' },
                    { title: 'Számlázás', desc: 'Fizetések feldolgozása, számlák kiállítása, pénzügyi nyilvántartás vezetése.' },
                  ].map((item, i) => (
                    <div key={i} className="border border-gray-200 p-5">
                      <h3 className="font-semibold text-[#051c2c] text-sm mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Jogalap */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">4. Az adatkezelés jogalapja</h2>
                <p className="mb-4">Személyes adatait az alábbi jogalapok alapján kezeljük a GDPR 6. cikk (1) bekezdése szerint:</p>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#00a9f4] pl-5">
                    <h3 className="font-semibold text-[#051c2c] mb-1">Hozzájárulás (GDPR 6. cikk (1) bek. a) pont)</h3>
                    <p className="text-sm text-gray-500">Marketing célú kommunikáció, analitikai cookie-k használata, hírlevél küldése. Hozzájárulását bármikor visszavonhatja.</p>
                  </div>
                  <div className="border-l-2 border-[#00a9f4] pl-5">
                    <h3 className="font-semibold text-[#051c2c] mb-1">Szerződés teljesítése (GDPR 6. cikk (1) bek. b) pont)</h3>
                    <p className="text-sm text-gray-500">A szolgáltatás nyújtásához szükséges adatkezelés, fiókkezelés, fizetés feldolgozása, képzési tartalom biztosítása.</p>
                  </div>
                  <div className="border-l-2 border-[#00a9f4] pl-5">
                    <h3 className="font-semibold text-[#051c2c] mb-1">Jogos érdek (GDPR 6. cikk (1) bek. f) pont)</h3>
                    <p className="text-sm text-gray-500">Szolgáltatás fejlesztése, biztonság fenntartása, csalásmegelőzés, anonimizált statisztikák készítése.</p>
                  </div>
                  <div className="border-l-2 border-[#00a9f4] pl-5">
                    <h3 className="font-semibold text-[#051c2c] mb-1">Jogi kötelezettség (GDPR 6. cikk (1) bek. c) pont)</h3>
                    <p className="text-sm text-gray-500">Számviteli és adójogi kötelezettségek teljesítése, hatósági megkeresések teljesítése.</p>
                  </div>
                </div>
              </div>

              {/* 5. Megőrzési idő */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">5. Adatmegőrzési időtartamok</h2>
                <div className="border border-gray-200">
                  <div className="grid grid-cols-2 border-b border-gray-200 bg-[#f7f7f7]">
                    <div className="p-4 font-semibold text-sm text-[#051c2c]">Adattípus</div>
                    <div className="p-4 font-semibold text-sm text-[#051c2c]">Megőrzési idő</div>
                  </div>
                  {[
                    ['Felhasználói fiók adatok', 'A fiók törléséig, vagy a szolgáltatás megszűnéséig'],
                    ['Képzési előrehaladás, kompetenciapontszámok', 'A fiók törléséig + 30 nap (adatexport lehetőség)'],
                    ['Számlázási adatok', '8 év (számviteli törvény alapján)'],
                    ['Kommunikációs adatok', '3 év az utolsó interakciótól'],
                    ['Használati adatok, analitika', '26 hónap (Google Analytics alapértelmezés)'],
                    ['Cookie-adatok', 'A cookie típusától függően (lásd 8. pont)'],
                    ['Megfelelőségi dokumentáció', 'Az üzleti kapcsolat megszűnésétől számított 5 év'],
                  ].map((row, i) => (
                    <div key={i} className={`grid grid-cols-2 ${i < 6 ? 'border-b border-gray-200' : ''}`}>
                      <div className="p-4 text-sm text-gray-700">{row[0]}</div>
                      <div className="p-4 text-sm text-gray-500">{row[1]}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500">Az adatmegőrzési időszak lejártát követően az adatokat töröljük vagy visszafordíthatatlanul anonimizáljuk.</p>
              </div>

              {/* 6. Harmadik fél adatfeldolgozók */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">6. Harmadik fél adatfeldolgozók</h2>
                <p className="mb-4">A szolgáltatás nyújtása érdekében az alábbi harmadik fél adatfeldolgozókat vesszük igénybe:</p>
                <div className="space-y-4">
                  <div className="border border-gray-200 p-5">
                    <h3 className="font-semibold text-[#051c2c] text-sm mb-1">Supabase Inc.</h3>
                    <p className="text-sm text-gray-500">Adatbázis-szolgáltatás és felhasználói hitelesítés. Adattárolás helye: EU (Frankfurt, Németország). A Supabase adatfeldolgozási megállapodással (DPA) rendelkezik és megfelel a GDPR követelményeinek.</p>
                  </div>
                  <div className="border border-gray-200 p-5">
                    <h3 className="font-semibold text-[#051c2c] text-sm mb-1">Google Analytics (Google Ireland Limited)</h3>
                    <p className="text-sm text-gray-500">Weboldalhasználat elemzése, látogatói statisztikák. IP-anonimizálás engedélyezve. Az adatkezelés az EU-US Data Privacy Framework alapján történik.</p>
                  </div>
                  <div className="border border-gray-200 p-5">
                    <h3 className="font-semibold text-[#051c2c] text-sm mb-1">Microsoft Clarity (Microsoft Ireland Operations Limited)</h3>
                    <p className="text-sm text-gray-500">Felhasználói viselkedés elemzése, hőtérképek, munkamenet-visszajátszás a felhasználói élmény javítása érdekében. Az adatkezelés az EU-US Data Privacy Framework alapján történik.</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">Minden harmadik fél adatfeldolgozóval adatfeldolgozási megállapodást kötöttünk a GDPR 28. cikkének megfelelően. Személyes adatait harmadik feleknek nem adjuk el.</p>
              </div>

              {/* 7. Érintetti jogok */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">7. Az Ön jogai mint érintett</h2>
                <p className="mb-4">A GDPR alapján Önt az alábbi jogok illetik meg személyes adataival kapcsolatban:</p>
                <div className="space-y-3">
                  {[
                    { right: 'Hozzáférési jog (15. cikk)', desc: 'Tájékoztatást kérhet arról, hogy milyen személyes adatait kezeljük, és másolatot kérhet azokról.' },
                    { right: 'Helyesbítéshez való jog (16. cikk)', desc: 'Kérheti pontatlan személyes adatainak helyesbítését vagy hiányos adatainak kiegészítését.' },
                    { right: 'Törléshez való jog (17. cikk)', desc: 'Kérheti személyes adatainak törlését, amennyiben az adatkezelés célja megszűnt vagy hozzájárulását visszavonta.' },
                    { right: 'Adathordozhatósághoz való jog (20. cikk)', desc: 'Kérheti, hogy az Ön által megadott személyes adatokat géppel olvasható formátumban (pl. JSON, CSV) átadjuk Önnek vagy más adatkezelőnek.' },
                    { right: 'Tiltakozáshoz való jog (21. cikk)', desc: 'Jogos érdeken alapuló adatkezelés esetén tiltakozhat személyes adatainak kezelése ellen.' },
                    { right: 'Az adatkezelés korlátozásához való jog (18. cikk)', desc: 'Kérheti az adatkezelés korlátozását, ha vitatja az adatok pontosságát vagy az adatkezelés jogszerűségét.' },
                    { right: 'Hozzájárulás visszavonása', desc: 'Amennyiben az adatkezelés hozzájáruláson alapul, hozzájárulását bármikor, indokolás nélkül visszavonhatja. A visszavonás nem érinti a visszavonás előtti adatkezelés jogszerűségét.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 border border-gray-200 p-4">
                      <div className="w-1.5 h-1.5 bg-[#00a9f4] mt-2 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#051c2c] text-sm">{item.right}</span>
                        <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500">Jogainak gyakorlásához kérjük, írjon a <a href="mailto:hello@aiworkfluency.com" className="text-[#00a9f4] hover:underline">hello@aiworkfluency.com</a> címre. Kérelmére 30 napon belül válaszolunk.</p>
                <p className="mt-2 text-sm text-gray-500">Ha úgy ítéli meg, hogy személyes adatainak kezelése sérti a GDPR rendelkezéseit, panaszt nyújthat be a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH, <a href="https://www.naih.hu" className="text-[#00a9f4] hover:underline" target="_blank" rel="noopener noreferrer">www.naih.hu</a>).</p>
              </div>

              {/* 8. Cookie szabályzat */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">8. Cookie (süti) szabályzat</h2>
                <p className="mb-4">Weboldalunk cookie-kat (sütiket) használ a működés biztosítása, a felhasználói élmény javítása és a látogatottság elemzése céljából.</p>

                <h3 className="font-semibold text-[#051c2c] mb-2 mt-6">8.1 Szükséges cookie-k</h3>
                <p className="text-sm text-gray-500 mb-2">Ezek a cookie-k elengedhetetlenek a weboldal alapvető működéséhez. Jogalapjuk a jogos érdek.</p>
                <ul className="list-none space-y-1 text-sm text-gray-500">
                  <li>&#8212; Munkamenet-azonosító (session cookie)</li>
                  <li>&#8212; Cookie-hozzájárulási preferencia</li>
                  <li>&#8212; Biztonsági tokenek (CSRF védelm)</li>
                </ul>

                <h3 className="font-semibold text-[#051c2c] mb-2 mt-6">8.2 Analitikai cookie-k</h3>
                <p className="text-sm text-gray-500 mb-2">Ezek a cookie-k segítenek megérteni, hogyan használják látogatóink a weboldalt. Csak az Ön hozzájárulásával aktiválódnak.</p>
                <ul className="list-none space-y-1 text-sm text-gray-500">
                  <li>&#8212; Google Analytics (_ga, _gid) — élettartam: 2 év / 24 óra</li>
                  <li>&#8212; Microsoft Clarity (_clck, _clsk) — élettartam: 1 év / 1 nap</li>
                </ul>

                <h3 className="font-semibold text-[#051c2c] mb-2 mt-6">8.3 Cookie-beállítások módosítása</h3>
                <p className="text-sm text-gray-500">Cookie-beállításait bármikor módosíthatja a böngészője beállításaiban, vagy a weboldalunk alján megjelenő cookie-sávon keresztül. Az analitikai cookie-k elutasítása nem befolyásolja a weboldal alapvető funkcionalitását.</p>
              </div>

              {/* 9. Adatbiztonság */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">9. Adatbiztonság</h2>
                <p>Megfelelő technikai és szervezési intézkedéseket alkalmazunk személyes adatainak védelme érdekében, beleértve:</p>
                <ul className="list-none space-y-1 mt-2 text-sm text-gray-500">
                  <li>&#8212; Titkosítás az adatátvitel során (TLS/SSL) és nyugalmi állapotban</li>
                  <li>&#8212; Hozzáférés-szabályozás és jogosultságkezelés</li>
                  <li>&#8212; Rendszeres biztonsági felülvizsgálatok</li>
                  <li>&#8212; Adatvédelmi incidenskezelési eljárás</li>
                </ul>
              </div>

              {/* 10. Nemzetközi adattovábbítás */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">10. Nemzetközi adattovábbítás</h2>
                <p>Előfordulhat, hogy személyes adatait az EGT-n kívüli országokban dolgozzák fel. Ilyen esetben megfelelő garanciákat alkalmazunk, mint például az Európai Bizottság által jóváhagyott általános szerződési feltételek (Standard Contractual Clauses) vagy az EU-US Data Privacy Framework.</p>
              </div>

              {/* 11. Gyermekek */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">11. Kiskorúak védelme</h2>
                <p>Szolgáltatásaink nem 16 éven aluli személyeknek szólnak. Tudatosan nem gyűjtünk kiskorúaktól személyes adatokat. Ha tudomásunkra jut, hogy 16 éven aluli személy adatait kezeljük, azokat haladéktalanul töröljük.</p>
              </div>

              {/* 12. Tájékoztató módosítása */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">12. A tájékoztató módosítása</h2>
                <p>Fenntartjuk a jogot jelen adatvédelmi tájékoztató módosítására. A lényeges változásokról e-mailben vagy a weboldalunkon keresztül értesítjük Önt. A módosított tájékoztató a weboldalon történő közzététellel lép hatályba.</p>
              </div>

              {/* 13. Kapcsolat */}
              <div>
                <h2 className="font-serif-heading text-xl text-[#051c2c] font-bold mb-4">13. Kapcsolat adatvédelmi kérdésekben</h2>
                <div className="border border-gray-200 p-6 space-y-2">
                  <p>Adatvédelmi kérdéseivel, kérelmeivel kérjük, forduljon hozzánk:</p>
                  <p><strong className="text-[#051c2c]">E-mail:</strong> <a href="mailto:hello@aiworkfluency.com" className="text-[#00a9f4] hover:underline">hello@aiworkfluency.com</a></p>
                  <p><strong className="text-[#051c2c]">Telefon:</strong> +36 1 901 0721</p>
                  <p className="mt-4 text-sm text-gray-400">Felügyeleti hatóság: Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)<br />Cím: 1055 Budapest, Falk Miksa utca 9-11.<br />Telefon: +36 1 391 1400<br />Web: <a href="https://www.naih.hu" className="text-[#00a9f4] hover:underline" target="_blank" rel="noopener noreferrer">www.naih.hu</a></p>
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
                <Link href="/terms" className="hover:text-white transition-colors">Felhasználási feltételek</Link>
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
