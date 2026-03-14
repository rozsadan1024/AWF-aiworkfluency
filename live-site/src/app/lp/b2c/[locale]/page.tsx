import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, Pill, Stethoscope, Activity, HeartPulse, Shield, ThermometerSun, BadgeCheck, Sparkles } from 'lucide-react';
import { locales, type Locale } from '@/lib/i18n/dictionaries';
import { CheckoutButton } from '@/components/CheckoutButton';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  en: {
    // Hero
    hero_eyebrow: 'PERSONAL AI TRAINING — PRESCRIPTION STRENGTH',
    hero_h1_1: 'Anti AI-Anxiety Pills.',
    hero_h1_2: 'Take One Daily.',
    hero_sub: 'You keep hearing about AI. You know you should be using it. But every time you try, you end up staring at a blank prompt. There\'s a treatment: one small, <strong><u>ultra-personalized</u></strong> AI practice task per day. Taken consistently, the anxiety disappears within weeks.',
    hero_cta: 'Get Your Free Diagnosis',
    hero_cta_sub: '3-minute AI skills assessment. No side effects. No credit card.',
    hero_rx: 'Rx: AI Work Fluency — 1 task/day, taken with morning coffee',

    // Symptoms
    symptoms_h2: 'Which One Are You?',
    symptoms_sub: 'AI Anxiety Disorder affects millions of professionals. Symptoms include:',
    symptom_1_title: 'The Procrastinator',
    symptom_1_desc: '"I\'ll learn AI next month." You\'ve been saying that since 2023. Meanwhile, that colleague who started? They\'re doing your 2-day tasks in 2 hours.',
    symptom_2_title: 'The Surface-Level User',
    symptom_2_desc: 'You use ChatGPT to fix typos and rewrite emails. You tell people you "use AI daily." Deep down you know that\'s like saying you\'re a chef because you use a microwave.',
    symptom_3_title: 'The Overwhelmed Collector',
    symptom_3_desc: 'You bought courses. Bookmarked 200 AI tools. Downloaded prompt collections. Used none of them properly. The pile of unfinished resources is now part of the anxiety.',
    symptom_4_title: 'The Skeptic',
    symptom_4_desc: '"AI can\'t do real creative work." Maybe. But the person who gets your next promotion won\'t be AI — it\'ll be someone who learned to use it while you were debating.',

    // Diagnosis
    diagnosis_h2: 'The Diagnosis',
    diagnosis_desc: 'You don\'t lack intelligence. You don\'t lack motivation. You don\'t lack access to AI tools — they\'re literally free. What you lack is practice. You have information about AI. You don\'t have fluency. And the gap between those two is where careers stall.',
    diagnosis_highlight: 'Watching tutorials about AI ≠ Being good at AI',

    // Prescription
    rx_h2: 'The Prescription',
    rx_sub: 'AI Work Fluency — daily micro-doses of real AI practice, personalized to YOUR actual job.',
    rx_1_title: 'Dosage',
    rx_1_desc: 'One practice task per day. 15-20 minutes. Based on your real work — your role, your industry, your challenges. Not generic "write a poem" exercises.',
    rx_2_title: 'Administration',
    rx_2_desc: 'Use any AI tool — ChatGPT, Claude, Copilot, Gemini. Complete the task. Submit it. Get scored on 5 dimensions. See how an expert would\'ve done it. Learn. Repeat.',
    rx_3_title: 'Treatment Duration',
    rx_3_desc: 'Noticeable confidence boost in 1-2 weeks. Real fluency in 30 days. Like going to the gym — except each session is 15 minutes and you actually stick with it.',
    rx_4_title: 'Active Ingredients',
    rx_4_desc: 'Role-specific task generation \u2022 AI-powered evaluation \u2022 5-dimension scoring \u2022 Expert comparison \u2022 Personal progress tracking',

    // Side effects
    side_h2: 'Side Effects',
    side_sub: 'Users report the following after 30 days of daily use:',
    side_1: 'Finishing work 2-3 hours earlier every week',
    side_2: 'Actually knowing what to type into ChatGPT (not just "help me with this")',
    side_3: 'Confidence when AI comes up in meetings — you\'re the one with answers now',
    side_4: 'That satisfying feeling when your boss asks "how did you do that so fast?"',
    side_5: 'Spontaneous urge to automate boring tasks you used to do manually',
    side_6: 'In rare cases: promotion, raise, or job offers from people who noticed',

    // vs other
    vs_h2: 'Why Everything Else Failed You',
    vs_1_label: 'YouTube Tutorials',
    vs_1_desc: 'Watched 4 hours. Felt inspired. Did nothing different on Monday. Repeat monthly.',
    vs_2_label: 'Online Courses',
    vs_2_desc: 'Paid. Started. Got to module 3. Life happened. It sits in your "I\'ll finish it" folder with the others.',
    vs_3_label: 'Prompt Libraries',
    vs_3_desc: '"500 Best AI Prompts" — saved, never opened again. Because copy-pasting prompts isn\'t the same as knowing how to think with AI.',
    vs_4_label: 'AI Work Fluency',
    vs_4_desc: '15 minutes. One task. YOUR work. Every day. No willpower needed — it\'s already relevant. That\'s why people actually do it.',

    // Social proof
    proof_h2: 'What Users Say',
    proof_stat: 'From professionals who started with zero AI confidence',
    proof_1: '"I went from dreading AI conversations to being the person people ask for help. In three weeks."',
    proof_1_cite: 'Marketing Manager, Budapest',
    proof_2: '"I tried courses, YouTube, prompt guides — nothing stuck. This works because it\'s my actual work, not theory."',
    proof_2_cite: 'Financial Analyst, Vienna',

    // Pricing
    pricing_h2: 'Choose Your Treatment Plan',
    pricing_free: 'Starter Dose',
    pricing_free_desc: 'See if it works for you',
    pricing_free_price: 'Free',
    pricing_free_features: ['Personal AI skills assessment', '3 practice exercises to try', 'AI-powered scoring & feedback', 'Personalized to your role'],
    pricing_free_cta: 'Try 3 Free Exercises',
    pricing_free_note: 'No credit card required',
    pricing_pro: 'Full Treatment',
    pricing_pro_desc: 'For serious improvement',
    pricing_pro_price: '\u20ac9',
    pricing_pro_period: '/month',
    pricing_pro_features: ['Up to 5 exercises per day', 'Expert-level solution comparisons', 'Advanced difficulty progression', 'Detailed skill gap analysis', 'Full progress tracking & analytics'],
    pricing_pro_cta: 'Subscribe Now',
    pricing_pro_note: 'No assessment required — start practicing immediately',
    pricing_popular: 'Most Popular',

    // Final CTA
    cta_h2: 'Your AI Anxiety Won\'t Cure Itself.',
    cta_sub: 'One task a day. 15 minutes. That\'s the entire prescription. The assessment takes 3 minutes and shows you exactly where you stand.',
    cta_button: 'Get Your Free Diagnosis',
    cta_sub2: 'No side effects. No commitment. Just clarity.',

    // Footer
    footer: '\u00a9 2026 AI Work Fluency. All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_home: 'Main Site',
    footer_b2b: 'For Companies',
  },
  hu: {
    hero_eyebrow: 'SZEM\u00c9LYES AI K\u00c9PZ\u00c9S \u2014 RECEPTK\u00d6TELES ER\u0150SS\u00c9G\u0170',
    hero_h1_1: 'Anti AI-Szorong\u00e1s Tabletta.',
    hero_h1_2: 'Napi egy adag.',
    hero_sub: 'Folyamatosan hallasz az AI-r\u00f3l. Tudod, hogy k\u00e9ne haszn\u00e1lnod. De valah\u00e1nyszor megpr\u00f3b\u00e1lod, egy \u00fcres prompt el\u0151tt b\u00e1mulsz. Van kezel\u00e9s: napi egy kis, <strong><u>ultra-szem\u00e9lyre szabott</u></strong> AI gyakorl\u00f3feladat. K\u00f6vetkezetesen szedve a szorong\u00e1s heteken bel\u00fcl elt\u0171nik.',
    hero_cta: 'Ingyenes diagn\u00f3zis',
    hero_cta_sub: '3 perces AI k\u00e9szs\u00e9gfelm\u00e9r\u00e9s. Mell\u00e9khat\u00e1sok n\u00e9lk\u00fcl. Bankk\u00e1rtya n\u00e9lk\u00fcl.',
    hero_rx: 'Rx: AI Work Fluency \u2014 1 feladat/nap, reggeli k\u00e1v\u00e9hoz',

    symptoms_h2: 'Melyik vagy te?',
    symptoms_sub: 'Az AI Szorong\u00e1si Zavar milli\u00f3kat \u00e9rint. A t\u00fcnetek:',
    symptom_1_title: 'A Halogatag',
    symptom_1_desc: '"J\u00f6v\u0151 h\u00f3napban megtanulom az AI-t." Ezt mondod 2023 \u00f3ta. Ezk\u00f6zben az a koll\u00e9ga, aki elkezdete? 2 \u00f3ra alatt megcsin\u00e1lja, ami neked 2 napba telik.',
    symptom_2_title: 'A Felsz\u00ednes Haszn\u00e1l\u00f3',
    symptom_2_desc: 'ChatGPT-vel jav\u00edtod a helyes\u00edr\u00e1st \u00e9s \u00e1t\u00edrod az emaileket. Mindenkinek mondod, hogy "napi szinten haszn\u00e1lod az AI-t." Bel\u00fcl tudod, hogy ez olyan, mintha az\u00e9rt h\u00edvn\u00e1d magad s\u00e9fnek, mert haszn\u00e1lod a mikr\u00f3t.',
    symptom_3_title: 'A T\u00falterhelt Gy\u0171jt\u0151',
    symptom_3_desc: 'Vettel kurzusokat. K\u00f6nyvjelz\u0151zt\u00e9l 200 AI eszk\u00f6zt. Let\u00f6lt\u00f6tt\u00e9l prompt gy\u0171jtem\u00e9nyeket. Egyiket sem haszn\u00e1ltad rendesen. A befejezetlen anyagok halmaza m\u00e1r a szorong\u00e1s r\u00e9sze.',
    symptom_4_title: 'A K\u00e9tked\u0151',
    symptom_4_desc: '"Az AI nem tud igaz\u00e1n kreat\u00edv munk\u00e1t v\u00e9gezni." Tal\u00e1n. De aki megkapja a k\u00f6vetkez\u0151 el\u0151l\u00e9ptet\u00e9sedet, az nem az AI lesz \u2014 hanem valaki, aki megtanulta haszn\u00e1lni, am\u00edg te vit\u00e1t\u00e1l.',

    diagnosis_h2: 'A Diagn\u00f3zis',
    diagnosis_desc: 'Nem az intelligenci\u00e1ddal van baj. Nem a motiv\u00e1ci\u00f3ddal. Nem az eszk\u00f6z\u00f6kh\u00f6z val\u00f3 hozz\u00e1f\u00e9r\u00e9ssel \u2014 sz\u00f3 szerint ingyenesek. Ami hi\u00e1nyzik, az a gyakorlat. Van inform\u00e1ci\u00f3d az AI-r\u00f3l. Nincs j\u00e1rtass\u00e1god benne. \u00c9s e kett\u0151 k\u00f6z\u00f6tti szakad\u00e9kban akadnak el a karierek.',
    diagnosis_highlight: 'Tutorialokat n\u00e9zni az AI-r\u00f3l \u2260 J\u00f3nak lenni AI-ban',

    rx_h2: 'A Recept',
    rx_sub: 'AI Work Fluency \u2014 napi mikro-adagok val\u00f3di AI gyakorlatb\u00f3l, a TE t\u00e9nyleges munk\u00e1dra szem\u00e9lyre szabva.',
    rx_1_title: 'Adagol\u00e1s',
    rx_1_desc: 'Napi egy gyakorl\u00f3feladat. 15-20 perc. A val\u00f3s munk\u00e1dra \u00e9p\u00fcl \u2014 a munk\u00e1k\u00f6r\u00f6dre, az ipar\u00e1gadra, a kih\u00edv\u00e1saidra. Nem \u00e1ltal\u00e1nos "\u00edrj egy verset" gyakorlatok.',
    rx_2_title: 'Alkalmaz\u00e1s',
    rx_2_desc: 'Haszn\u00e1lj b\u00e1rmilyen AI eszk\u00f6zt \u2014 ChatGPT, Claude, Copilot, Gemini. Csin\u00e1ld meg a feladatot. Add be. Kapj pontsz\u00e1mot 5 dimenzi\u00f3ban. N\u00e9zd meg, hogyan csin\u00e1lta volna egy szak\u00e9rt\u0151. Tanulj. Ism\u00e9teld.',
    rx_3_title: 'Kezel\u00e9s id\u0151tartama',
    rx_3_desc: '\u00c9szrevehet\u0151 magabiztoss\u00e1g-n\u00f6veked\u00e9s 1-2 h\u00e9t alatt. Val\u00f3di j\u00e1rtass\u00e1g 30 nap alatt. Mint az edz\u0151terem \u2014 csak itt minden alkalom 15 perc \u00e9s t\u00e9nyleg kitartasz.',
    rx_4_title: 'Hat\u00f3anyagok',
    rx_4_desc: 'Szerepre szabott feladatgener\u00e1l\u00e1s \u2022 AI-alap\u00fa \u00e9rt\u00e9kel\u00e9s \u2022 5 dimenzi\u00f3s pontoz\u00e1s \u2022 Szak\u00e9rt\u0151i \u00f6sszehasonl\u00edt\u00e1s \u2022 Szem\u00e9lyes halad\u00e1sk\u00f6vet\u00e9s',

    side_h2: 'Mell\u00e9khat\u00e1sok',
    side_sub: 'Felhaszn\u00e1l\u00f3k a k\u00f6vetkez\u0151ket jelzik 30 nap napi haszn\u00e1lat ut\u00e1n:',
    side_1: 'Heti 2-3 \u00f3r\u00e1val hamarabb v\u00e9gzel a munk\u00e1val',
    side_2: 'T\u00e9nyleg tudod, mit \u00edrj be a ChatGPT-be (nem csak azt, hogy "seg\u00edts")',
    side_3: 'Magabiztoss\u00e1g, amikor meetingen sz\u00f3ba ker\u00fcl az AI \u2014 te vagy, akinek vannak v\u00e1laszai',
    side_4: 'Az az \u00e9rz\u00e9s, amikor a f\u0151n\u00f6k\u00f6d megk\u00e9rdezi: "hogyan csin\u00e1ltad ilyen gyorsan?"',
    side_5: 'Spontan k\u00e9sztet\u00e9s, hogy automatiz\u00e1ld az unalmas feladatokat, amiket eddig k\u00e9zzel csin\u00e1lt\u00e1l',
    side_6: 'Ritka esetekben: el\u0151l\u00e9ptet\u00e9s, fizet\u00e9semel\u00e9s, vagy \u00e1ll\u00e1saj\u00e1nlat olyanokt\u00f3l, akik \u00e9szrevett\u00e9k',

    vs_h2: 'Mi\u00e9rt bukott el minden m\u00e1s',
    vs_1_label: 'YouTube vide\u00f3k',
    vs_1_desc: 'N\u00e9ztel 4 \u00f3r\u00e1t. Inspir\u00e1lt voltd. H\u00e9tf\u0151n semmit nem csin\u00e1lt\u00e1l m\u00e1sk\u00e9nt. Havonta ism\u00e9tl\u0151dik.',
    vs_2_label: 'Online kurzusok',
    vs_2_desc: 'Fizettel. Elkezdted. A 3. modulig jutott\u00e1l. J\u00f6tt az \u00e9let. Ott \u00fcl a "majd befejezem" mapp\u00e1ban a t\u00f6bbivel.',
    vs_3_label: 'Prompt gy\u0171jtem\u00e9nyek',
    vs_3_desc: '"500 legjobb AI prompt" \u2014 elmentve, soha t\u00f6bb\u00e9 meg nem nyitva. Mert promptokat m\u00e1solgatni nem ugyanaz, mint AI-val gondolkodni.',
    vs_4_label: 'AI Work Fluency',
    vs_4_desc: '15 perc. Egy feladat. A TE munk\u00e1d. Minden nap. Nem kell akarater\u0151 \u2014 m\u00e1r eleve relev\u00e1ns. Ez\u00e9rt csin\u00e1lj\u00e1k meg t\u00e9nyleg az emberek.',

    proof_h2: 'Mit mondanak a felhaszn\u00e1l\u00f3k',
    proof_stat: 'Szakemberekt\u0151l, akik nulla AI-magabiztoss\u00e1ggal kezdtek',
    proof_1: '"H\u00e1rom h\u00e9t alatt eljutottam oda, hogy t\u0151lem k\u00e9rnek seg\u00edts\u00e9get AI-\u00fcgyekben, nem ford\u00edtva."',
    proof_1_cite: 'Marketing menedzser, Budapest',
    proof_2: '"Pr\u00f3b\u00e1ltam kurzusokat, YouTube-ot, prompt \u00fatmutat\u00f3kat \u2014 semmi nem ragadt meg. Ez m\u0171k\u00f6dik, mert a t\u00e9nyleges munk\u00e1m, nem elm\u00e9let."',
    proof_2_cite: 'P\u00e9nz\u00fcgyi elemz\u0151, B\u00e9cs',

    pricing_h2: 'V\u00e1laszd ki a kezel\u00e9si tervedet',
    pricing_free: 'Kezd\u0151 adag',
    pricing_free_desc: 'N\u00e9zd meg, m\u0171k\u00f6dik-e neked',
    pricing_free_price: 'Ingyenes',
    pricing_free_features: ['Személyes AI készségfelmérés', '3 gyakorlófeladat kipróbálásra', 'AI-alapú pontozás és visszajelzés', 'Munkakörödre szabva'],
    pricing_free_cta: 'Próbálj ki 3 feladatot ingyen',
    pricing_free_note: 'Bankkártya nem szükséges',
    pricing_pro: 'Teljes kezelés',
    pricing_pro_desc: 'Komoly fejlődéshez',
    pricing_pro_price: '\u20ac9',
    pricing_pro_period: '/hó',
    pricing_pro_features: ['Napi 5 gyakorlat', 'Szakértői szintű megoldás-összehasonlítás', 'Haladó nehézségi progresszió', 'Részletes készséghiány-elemzés', 'Teljes haladáskövetés és analitika'],
    pricing_pro_cta: 'Előfizetés',
    pricing_pro_note: 'Felmérés nélkül is — azonnal gyakorolhatsz',
    pricing_popular: 'Legnépszerűbb',

    cta_h2: 'Az AI-szorong\u00e1sod nem gy\u00f3gyul meg mag\u00e1t\u00f3l.',
    cta_sub: 'Napi egy feladat. 15 perc. Ez az eg\u00e9sz recept. A felm\u00e9r\u00e9s 3 percet vesz ig\u00e9nybe \u00e9s megmutatja, pontosan hol tartasz.',
    cta_button: 'Ingyenes diagn\u00f3zis',
    cta_sub2: 'Nincs mell\u00e9khat\u00e1s. Nincs k\u00f6telezetts\u00e9g. Csak tiszt\u00e1nl\u00e1t\u00e1s.',

    footer: '\u00a9 2026 AI Work Fluency. Minden jog fenntartva.',
    footer_privacy: 'Adatv\u00e9delmi ir\u00e1nyelvek',
    footer_terms: 'Felhaszn\u00e1l\u00e1si felt\u00e9telek',
    footer_home: 'F\u0151oldal',
    footer_b2b: 'C\u00e9geknek',
  },
} as const;

export default function B2cPillsLandingPage({ params }: { params: { locale: string } }) {
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
                    <span className="text-red-400 text-lg">{'\u2717'}</span>
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

      {/* SOCIAL PROOF */}
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
                <cite className="text-sm text-gray-500 not-italic">{'\u2014'} {item.cite}</cite>
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
            {/* Free */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 text-center">
              <div className="font-bold text-lg text-gray-900 mb-1">{t.pricing_free}</div>
              <div className="text-sm text-gray-500 mb-4">{t.pricing_free_desc}</div>
              <div className="text-4xl font-black text-gray-900 mb-6">{t.pricing_free_price}</div>
              <div className="space-y-3 text-sm text-left mb-6">
                {t.pricing_free_features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href={`/assessment?lang=${locale}`} className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-xl transition-colors text-sm">{t.pricing_free_cta}</Link>
              <p className="text-xs text-gray-400 mt-2">{t.pricing_free_note}</p>
            </div>
            {/* Pro */}
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-400 shadow-lg text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">{t.pricing_popular}</div>
              <div className="font-bold text-lg text-gray-900 mb-1">{t.pricing_pro}</div>
              <div className="text-sm text-gray-500 mb-4">{t.pricing_pro_desc}</div>
              <div className="text-4xl font-black text-emerald-600 mb-1">{t.pricing_pro_price}</div>
              <div className="text-sm text-gray-500 mb-5">{t.pricing_pro_period}</div>
              <div className="space-y-3 text-sm text-left mb-6">
                {t.pricing_pro_features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <CheckoutButton tier="basic" locale={locale} className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors text-sm">{t.pricing_pro_cta}</CheckoutButton>
              <p className="text-xs text-gray-400 mt-2">{t.pricing_pro_note}</p>
            </div>
          </div>
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
            <Link href={`/lp/b2b/${locale}`} className="hover:text-white transition-colors">{t.footer_b2b}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{t.footer_privacy}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t.footer_terms}</Link>
          </div>
          <div className="flex gap-1 text-xs border border-gray-700 rounded-md overflow-hidden">
            {locales.map((l) => (
              <Link key={l} href={`/lp/b2c/${l}`} className={`px-2 py-1 transition-colors ${l === locale ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
