import Link from 'next/link';
import { ArrowRight, CheckCircle, AlertTriangle, Clock, Pill, Stethoscope, Activity, HeartPulse, Shield, ThermometerSun, BadgeCheck } from 'lucide-react';
import { locales, type Locale } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  en: {
    // Hero
    hero_eyebrow: 'PRESCRIPTION STRENGTH AI TRAINING',
    hero_h1_1: 'Anti AI-Anxiety Pills.',
    hero_h1_2: 'Take One Daily.',
    hero_sub: 'Your team is stressed about AI. Some are paralyzed. Some are pretending. Some are panicking quietly. There\'s a treatment: one small, <strong><u>ultra-personalized</u></strong> AI practice task per day. Taken consistently, symptoms disappear within weeks.',
    hero_cta: 'Get Your Free Diagnosis',
    hero_cta_sub: '3-minute AI skills assessment. No side effects. No credit card.',
    hero_rx: 'Rx: AI Work Fluency — 1 task/day, with meals optional',

    // Symptoms
    symptoms_h2: 'Recognize the Symptoms?',
    symptoms_sub: 'AI Anxiety Disorder (AAD) is spreading through organizations at an alarming rate.',
    symptom_1_title: 'The Avoider',
    symptom_1_desc: '"I\'ll learn AI when it\'s more mature." Translation: never. Meanwhile, their colleagues are doing in 2 hours what takes them 2 days.',
    symptom_2_title: 'The Faker',
    symptom_2_desc: 'Uses ChatGPT to rewrite emails. Tells everyone they\'re "leveraging AI." Couldn\'t write a useful prompt if their job depended on it. (It does.)',
    symptom_3_title: 'The Panicker',
    symptom_3_desc: 'Bought 3 online courses. Watched 40 minutes of the first one. Bookmarked 200 AI tools. Uses none of them. Anxiety intensifies.',
    symptom_4_title: 'The Denier',
    symptom_4_desc: '"AI can\'t do what I do." Correct — for now. But their replacement won\'t be AI. It\'ll be someone who knows how to use it.',

    // Diagnosis
    diagnosis_h2: 'The Diagnosis',
    diagnosis_desc: 'The problem isn\'t intelligence. It\'s not motivation. It\'s not access to tools. The problem is that nobody practices. Your team has information about AI. They don\'t have fluency in AI. And those are very different things.',
    diagnosis_highlight: 'Knowing about AI ≠ Being good at AI',

    // Prescription
    rx_h2: 'The Prescription',
    rx_sub: 'AI Work Fluency — daily micro-doses of real AI practice, personalized to each employee\'s actual job.',
    rx_1_title: 'Dosage',
    rx_1_desc: 'One practice task per day. 15-20 minutes. Based on YOUR actual work — not generic exercises from a textbook.',
    rx_2_title: 'Administration',
    rx_2_desc: 'Use any AI tool you want — ChatGPT, Claude, Copilot, Gemini. Submit your work. Get scored on 5 dimensions. See how an expert would\'ve done it.',
    rx_3_title: 'Treatment Duration',
    rx_3_desc: 'Measurable improvement in 2-3 weeks. Full fluency development is ongoing — like fitness, not a one-time certification.',
    rx_4_title: 'Active Ingredients',
    rx_4_desc: 'Role-specific task generation • AI-powered evaluation • 5-dimension scoring • Expert comparison • Progress tracking',

    // Side effects
    side_h2: 'Side Effects',
    side_sub: 'Clinical trials report the following effects after 30 days of consistent use:',
    side_1: '3-5 hours saved per week per employee',
    side_2: 'Dramatically reduced email-about-AI-to-actual-AI-use ratio',
    side_3: 'Spontaneous confidence when someone mentions AI in meetings',
    side_4: 'Involuntary productivity gains across departments',
    side_5: 'May cause colleagues to ask "how did you do that so fast?"',
    side_6: 'In rare cases: career advancement',

    // vs other
    vs_h2: 'Why Other Treatments Failed',
    vs_1_label: 'Online Courses',
    vs_1_desc: '8% completion rate. Passive. Generic. The equivalent of reading about exercise.',
    vs_2_label: 'Workshops',
    vs_2_desc: 'Fun for a day. Forgotten by Monday. No measurable outcome. Expensive.',
    vs_3_label: 'PDF Guides',
    vs_3_desc: '"Top 50 AI Prompts" — collecting dust in everyone\'s Downloads folder since 2024.',
    vs_4_label: 'AI Work Fluency',
    vs_4_desc: 'Daily practice on real tasks. Measurable improvement. 5-8x higher completion than anything else. Actually works.',

    // Proof
    proof_h2: 'Clinical Evidence',
    proof_stat: 'Based on practice tasks generated across multiple industries and roles',
    proof_1: '"We stopped guessing whether our team was AI-ready. Now we have actual data."',
    proof_1_cite: 'Head of L&D, SaaS company (120 employees)',
    proof_2: '"The completion rate shocked us. People actually do these tasks because they\'re relevant to their work."',
    proof_2_cite: 'HR Director, Financial Services (300 employees)',

    // Pricing
    pricing_h2: 'Choose Your Treatment Plan',
    pricing_individual: 'Self-Medication',
    pricing_individual_desc: 'For individuals',
    pricing_individual_price: 'Free',
    pricing_individual_features: ['Personal AI skills assessment', 'Daily practice tasks for your role', 'AI-powered scoring & feedback', 'Progress tracking'],
    pricing_individual_cta: 'Start Free',
    pricing_team: 'Group Therapy',
    pricing_team_desc: 'For teams',
    pricing_team_price: 'From €19',
    pricing_team_period: '/seat/month',
    pricing_team_features: ['Everything in Self-Medication', 'Manager dashboard', 'Team progress reports', 'Department-level fluency scores'],
    pricing_team_cta: 'Start Team Trial',
    pricing_popular: 'Most Prescribed',

    // EU AI Act
    euai_warn: '⚠️ The EU AI Act AI literacy obligation is already in effect (since Feb 2025). From August 2026, national authorities can enforce compliance and impose fines.',
    euai_cta: 'Read the EU AI Act Guide',

    // Final CTA
    cta_h2: 'Your Team\'s AI Anxiety Won\'t Cure Itself.',
    cta_sub: 'One task a day. That\'s all it takes. The assessment takes 3 minutes and shows you exactly where the gaps are.',
    cta_button: 'Get Your Free Diagnosis',
    cta_sub2: 'No side effects. No commitment. Just clarity.',

    // Footer
    footer: '© 2026 AI Work Fluency. All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_home: 'Main Site',
  },
  hu: {
    hero_eyebrow: 'RECEPTKÖTELES AI KÉPZÉS',
    hero_h1_1: 'Anti AI-Szorongás Tabletta.',
    hero_h1_2: 'Napi egy adag.',
    hero_sub: 'A csapatod stresszel az AI miatt. Egyesek lebénultak. Mások úgy tesznek, mintha értenék. Megint mások csendben pánikban vannak. Van kezelés: napi egy kis, <strong><u>ultra-személyre szabott</u></strong> AI gyakorlófeladat. Következetesen szedve a tünetek heteken belül eltűnnek.',
    hero_cta: 'Ingyenes diagnózis',
    hero_cta_sub: '3 perces AI készségfelmérés. Mellékhatások nélkül. Bankkártya nélkül.',
    hero_rx: 'Rx: AI Work Fluency — 1 feladat/nap, étkezés opcionális',

    symptoms_h2: 'Felismered a tüneteket?',
    symptoms_sub: 'Az AI Szorongási Zavar (ASZ) riasztó ütemben terjed a szervezetekben.',
    symptom_1_title: 'Az Elkerülő',
    symptom_1_desc: '"Majd megtanulom az AI-t, ha érettebb lesz." Fordítás: soha. Eközben a kollégái 2 óra alatt megcsinálják, ami nekik 2 napba telik.',
    symptom_2_title: 'A Színlelő',
    symptom_2_desc: 'ChatGPT-vel újraírja az emaileket. Mindenkinek mondja, hogy "AI-t használ." Nem tudna hasznos promptot írni, ha az állása múlna rajta. (Az múlik.)',
    symptom_3_title: 'A Pánikológus',
    symptom_3_desc: 'Vett 3 online kurzust. Az elsőből 40 percet nézett meg. Könyvjelzőzött 200 AI eszközt. Egyiket sem használja. A szorongás fokozódik.',
    symptom_4_title: 'A Tagadó',
    symptom_4_desc: '"Az AI nem tudja csinálni, amit én." Igaz — egyelőre. De a helyettese nem az AI lesz. Hanem valaki, aki tudja használni.',

    diagnosis_h2: 'A Diagnózis',
    diagnosis_desc: 'A probléma nem az intelligencia. Nem a motiváció. Nem az eszközökhöz való hozzáférés. A probléma az, hogy senki nem gyakorol. A csapatodnak van információja az AI-ról. Nincs jártassága az AI-ban. És ez két nagyon különböző dolog.',
    diagnosis_highlight: 'Tudni az AI-ról ≠ Jónak lenni AI-ban',

    rx_h2: 'A Recept',
    rx_sub: 'AI Work Fluency — napi mikro-adagok valódi AI gyakorlatból, minden alkalmazott tényleges munkakörére személyre szabva.',
    rx_1_title: 'Adagolás',
    rx_1_desc: 'Napi egy gyakorlófeladat. 15-20 perc. A TE tényleges munkádra alapozva — nem tankönyvi általános gyakorlatok.',
    rx_2_title: 'Alkalmazás',
    rx_2_desc: 'Használj bármilyen AI eszközt — ChatGPT, Claude, Copilot, Gemini. Add be a munkádat. Kapj pontszámot 5 dimenzióban. Nézd meg, hogyan csinálta volna egy szakértő.',
    rx_3_title: 'Kezelés időtartama',
    rx_3_desc: 'Mérhető javulás 2-3 héten belül. A teljes jártassági fejlesztés folyamatos — mint a fitnesz, nem egyszeri tanúsítvány.',
    rx_4_title: 'Hatóanyagok',
    rx_4_desc: 'Szerepre szabott feladatgenerálás • AI-alapú értékelés • 5 dimenziós pontozás • Szakértői összehasonlítás • Haladáskövetés',

    side_h2: 'Mellékhatások',
    side_sub: 'Klinikai vizsgálatok az alábbi hatásokat jelentik 30 nap következetes használat után:',
    side_1: 'Heti 3-5 óra megtakarítás alkalmazottanként',
    side_2: 'Drámaian csökkent AI-ról-emailezés-a-tényleges-AI-használathoz arány',
    side_3: 'Spontán magabiztosság, amikor valaki meetingen megemlíti az AI-t',
    side_4: 'Akaratlan produktivitásnövekedés minden osztályon',
    side_5: 'Okozhatja, hogy kollégák megkérdezik: "hogyan csináltad ilyen gyorsan?"',
    side_6: 'Ritka esetekben: karrier előrelépés',

    vs_h2: 'Miért buktak el a korábbi kezelések',
    vs_1_label: 'Online kurzusok',
    vs_1_desc: '8% befejezési arány. Passzív. Általános. Az edzésről olvasás megfelelője.',
    vs_2_label: 'Workshopok',
    vs_2_desc: 'Egy napig szórakoztató. Hétfőre elfelejtve. Nincs mérhető eredmény. Drága.',
    vs_3_label: 'PDF útmutatók',
    vs_3_desc: '"Top 50 AI Prompt" — 2024 óta porosodik mindenki Letöltések mappájában.',
    vs_4_label: 'AI Work Fluency',
    vs_4_desc: 'Napi gyakorlat valós feladatokon. Mérhető fejlődés. 5-8x magasabb befejezés, mint bármi más. Tényleg működik.',

    proof_h2: 'Klinikai bizonyítékok',
    proof_stat: 'Számos iparágban és munkakörben generált gyakorlófeladatok alapján',
    proof_1: '"Nem kellett többé találgatnunk, hogy a csapatunk AI-kész-e. Most már vannak adataink."',
    proof_1_cite: 'L&D vezető, SaaS cég (120 fő)',
    proof_2: '"A befejezési arány megdöbbentett minket. Az emberek tényleg megcsinálják ezeket a feladatokat, mert relevánsak a munkájukban."',
    proof_2_cite: 'HR igazgató, Pénzügyi szolgáltatások (300 fő)',

    pricing_h2: 'Válaszd ki a kezelési tervedet',
    pricing_individual: 'Öngyógyítás',
    pricing_individual_desc: 'Egyéneknek',
    pricing_individual_price: 'Ingyenes',
    pricing_individual_features: ['Személyes AI készségfelmérés', 'Napi gyakorlófeladatok a munkakörödre', 'AI-alapú pontozás és visszajelzés', 'Haladáskövetés'],
    pricing_individual_cta: 'Ingyenes kezdés',
    pricing_team: 'Csoportterápia',
    pricing_team_desc: 'Csapatoknak',
    pricing_team_price: '7 500 Ft-tól',
    pricing_team_period: '/fő/hó',
    pricing_team_features: ['Minden, ami az Öngyógyításban', 'Vezetői dashboard', 'Csapat haladási riportok', 'Osztályszintű jártassági pontszámok'],
    pricing_team_cta: 'Csapat próba indítása',
    pricing_popular: 'Leggyakrabban felírt',

    euai_warn: '⚠️ Az EU AI Act AI-jártassági kötelezettsége már hatályban van (2025 feb. óta). 2026 augusztusától a nemzeti hatóságok vizsgálatokat indíthatnak és bírságokat szabhatnak ki.',
    euai_cta: 'EU AI Act útmutató',

    cta_h2: 'A csapatod AI-szorongása nem gyógyul meg magától.',
    cta_sub: 'Napi egy feladat. Ennyi kell. A felmérés 3 percet vesz igénybe és megmutatja, pontosan hol vannak a hiányosságok.',
    cta_button: 'Ingyenes diagnózis',
    cta_sub2: 'Nincs mellékhatás. Nincs kötelezettség. Csak tisztánlátás.',

    footer: '© 2026 AI Work Fluency. Minden jog fenntartva.',
    footer_privacy: 'Adatvédelmi irányelvek',
    footer_terms: 'Felhasználási feltételek',
    footer_home: 'Főoldal',
  },
} as const;

export default function AiPillsLandingPage({ params }: { params: { locale: string } }) {
  const locale = (params.locale === 'hu' ? 'hu' : 'en') as keyof typeof copy;
  const t = copy[locale];

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Nav */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-600" />
            <span className="text-lg font-bold text-gray-900">AI Work Fluency</span>
          </Link>
          <Link href={`/assessment?lang=${locale}`} className="btn-primary text-sm py-2 px-5">{t.hero_cta}</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50" />
        <div className="relative max-w-5xl mx-auto px-4 pt-16 sm:pt-24 pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold tracking-widest px-4 py-2 rounded-full mb-8">
              <Pill className="w-4 h-4" />
              {t.hero_eyebrow}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
              {t.hero_h1_1}<br />
              <span className="text-emerald-600">{t.hero_h1_2}</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t.hero_sub }} />
            <Link href={`/assessment?lang=${locale}`} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg py-4 px-10 rounded-full inline-flex items-center gap-2 transition-colors shadow-lg shadow-emerald-200">
              {t.hero_cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-400 mt-4">{t.hero_cta_sub}</p>
          </div>
          {/* Rx label */}
          <div className="mt-12 max-w-md mx-auto bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm transform rotate-[-1deg]">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <Stethoscope className="w-4 h-4" />
              PRESCRIPTION
            </div>
            <p className="font-mono text-sm text-gray-700">{t.hero_rx}</p>
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">{t.symptoms_h2}</h2>
            <p className="text-gray-400 text-lg">{t.symptoms_sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[t.symptom_1_title, t.symptom_2_title, t.symptom_3_title, t.symptom_4_title].map((title, i) => {
              const desc = [t.symptom_1_desc, t.symptom_2_desc, t.symptom_3_desc, t.symptom_4_desc][i];
              return (
                <div key={i} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 font-bold text-sm">
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-bold text-red-300">{title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIAGNOSIS */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Activity className="w-12 h-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-gray-900 mb-6">{t.diagnosis_h2}</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">{t.diagnosis_desc}</p>
          <div className="inline-block bg-amber-50 border-2 border-amber-200 rounded-xl px-8 py-4">
            <p className="text-xl font-black text-amber-800">{t.diagnosis_highlight}</p>
          </div>
        </div>
      </section>

      {/* PRESCRIPTION */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <Pill className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">{t.rx_h2}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.rx_sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: t.rx_1_title, desc: t.rx_1_desc, icon: Clock },
              { title: t.rx_2_title, desc: t.rx_2_desc, icon: Activity },
              { title: t.rx_3_title, desc: t.rx_3_desc, icon: HeartPulse },
              { title: t.rx_4_title, desc: t.rx_4_desc, icon: ThermometerSun },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIDE EFFECTS */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">{t.side_h2}</h2>
            <p className="text-gray-600">{t.side_sub}</p>
          </div>
          <div className="space-y-4">
            {[t.side_1, t.side_2, t.side_3, t.side_4, t.side_5, t.side_6].map((effect, i) => (
              <div key={i} className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{effect}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY OTHERS FAILED */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">{t.vs_h2}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { label: t.vs_1_label, desc: t.vs_1_desc, fail: true },
              { label: t.vs_2_label, desc: t.vs_2_desc, fail: true },
              { label: t.vs_3_label, desc: t.vs_3_desc, fail: true },
              { label: t.vs_4_label, desc: t.vs_4_desc, fail: false },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-6 border-2 ${item.fail ? 'bg-white border-gray-200' : 'bg-emerald-50 border-emerald-400 shadow-lg'}`}>
                <div className="flex items-center gap-2 mb-3">
                  {item.fail ? (
                    <span className="text-red-400 text-lg">✗</span>
                  ) : (
                    <BadgeCheck className="w-5 h-5 text-emerald-600" />
                  )}
                  <h3 className={`font-bold ${item.fail ? 'text-gray-500' : 'text-emerald-700'}`}>{item.label}</h3>
                </div>
                <p className={`text-sm leading-relaxed ${item.fail ? 'text-gray-400' : 'text-gray-700 font-medium'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLINICAL EVIDENCE */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-3 text-center">{t.proof_h2}</h2>
          <p className="text-gray-500 text-center mb-12">{t.proof_stat}</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { quote: t.proof_1, cite: t.proof_1_cite },
              { quote: t.proof_2, cite: t.proof_2_cite },
            ].map((item, i) => (
              <blockquote key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <p className="text-gray-800 italic mb-4 leading-relaxed">{item.quote}</p>
                <cite className="text-sm text-gray-500 not-italic">— {item.cite}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">{t.pricing_h2}</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Individual */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 text-center">
              <div className="font-bold text-lg text-gray-900 mb-1">{t.pricing_individual}</div>
              <div className="text-sm text-gray-500 mb-4">{t.pricing_individual_desc}</div>
              <div className="text-4xl font-black text-gray-900 mb-6">{t.pricing_individual_price}</div>
              <div className="space-y-3 text-sm text-left mb-6">
                {t.pricing_individual_features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href={`/assessment?lang=${locale}`} className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-xl transition-colors text-sm">{t.pricing_individual_cta}</Link>
            </div>
            {/* Team */}
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-400 shadow-lg text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">{t.pricing_popular}</div>
              <div className="font-bold text-lg text-gray-900 mb-1">{t.pricing_team}</div>
              <div className="text-sm text-gray-500 mb-4">{t.pricing_team_desc}</div>
              <div className="text-4xl font-black text-emerald-600 mb-1">{t.pricing_team_price}</div>
              <div className="text-sm text-gray-500 mb-5">{t.pricing_team_period}</div>
              <div className="space-y-3 text-sm text-left mb-6">
                {t.pricing_team_features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href={`/assessment?lang=${locale}`} className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors text-sm">{t.pricing_team_cta}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* EU AI ACT WARNING */}
      <section className="py-8 bg-amber-100 border-y border-amber-300">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <p className="text-sm text-amber-900 font-medium">{t.euai_warn}</p>
          <Link href={`/eu-ai-act/${locale}`} className="text-sm font-bold text-brand-600 hover:text-brand-700 underline whitespace-nowrap transition-colors">
            {t.euai_cta}
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Pill className="w-16 h-16 text-emerald-400 mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">{t.cta_h2}</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">{t.cta_sub}</p>
          <Link href={`/assessment?lang=${locale}`} className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg py-4 px-12 rounded-full inline-flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/30">
            {t.cta_button}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-500 mt-4 text-sm">{t.cta_sub2}</p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-gray-950 text-gray-500 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>{t.footer}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{t.footer_home}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{t.footer_privacy}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t.footer_terms}</Link>
          </div>
          <div className="flex gap-1 text-xs border border-gray-700 rounded-md overflow-hidden">
            {locales.map((l) => (
              <Link key={l} href={`/lp/b2b/${l}`} className={`px-2 py-1 transition-colors ${l === locale ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
