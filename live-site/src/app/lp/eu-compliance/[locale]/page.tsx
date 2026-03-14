import Link from 'next/link';
import { ArrowRight, CheckCircle, AlertTriangle, Clock, Shield, FileText, Users, BarChart3, BookOpen, Scale, Building2, CalendarClock, ShieldCheck, ClipboardCheck, EyeOff } from 'lucide-react';
import { locales, type Locale } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  en: {
    // Hero
    hero_eyebrow: 'EU AI ACT — ARTICLE 4 ALREADY IN EFFECT',
    hero_deadline_label: 'Enforcement starts',
    hero_deadline: 'August 2, 2026',
    hero_h1_1: 'Your Company Is',
    hero_h1_2: 'Already Required to Act.',
    hero_h1_3: 'Are You Ready?',
    hero_sub: 'The EU AI Act\'s AI literacy obligation has been <strong>in effect since February 2, 2025</strong>. Every company using AI must ensure its employees have adequate AI literacy. From August 2026, national authorities can launch investigations and impose fines up to <strong>\u20ac35 million or 7% of annual turnover</strong>.',
    hero_cta: 'Get a Free Compliance Assessment',
    hero_cta_sub: 'We\'ll show you exactly where your company stands — and what you need.',

    // Shadow AI warning
    shadow_h2: 'Even If Your Employees Use AI in Secret, Your Company Is Liable.',
    shadow_desc: 'Studies show that over 50% of employees already use AI tools at work — often without their employer\'s knowledge. This is called <strong>Shadow AI</strong>. Under the EU AI Act, it doesn\'t matter whether AI use is official or unofficial: <strong>the organization bears responsibility</strong> for ensuring AI literacy. No policy, no training, no documentation = full liability.',

    // What the law says
    law_h2: 'What the EU AI Act Requires',
    law_sub: 'Article 4 of the EU AI Act mandates AI literacy for all organizations deploying or using AI systems. This obligation has been applicable since February 2, 2025.',
    law_1_title: 'AI Literacy Training',
    law_1_desc: 'All employees interacting with AI must receive documented training appropriate to their role and risk exposure.',
    law_2_title: 'Documented Proof',
    law_2_desc: 'Organizations must maintain verifiable records of who was trained, when, on what, and to what standard.',
    law_3_title: 'Ongoing Compliance',
    law_3_desc: 'This isn\'t a one-time checkbox. Training must be kept current as AI systems and regulations evolve.',
    law_4_title: 'Risk-Appropriate',
    law_4_desc: 'Training depth must match the risk level of AI systems used — higher risk means more rigorous requirements.',

    // Risk
    risk_h2: 'The Cost of Doing Nothing',
    risk_1_title: 'Financial Penalties',
    risk_1_desc: 'Fines up to \u20ac35 million or 7% of global annual turnover — whichever is higher.',
    risk_2_title: 'Regulatory Action',
    risk_2_desc: 'National authorities can order suspension of AI system use until compliance is demonstrated.',
    risk_3_title: 'Reputational Damage',
    risk_3_desc: 'Non-compliance becomes public record. Clients, partners, and talent notice.',
    risk_4_title: 'Competitive Disadvantage',
    risk_4_desc: 'Compliant competitors win tenders and partnerships that require EU AI Act alignment.',

    // Solution
    solution_h2: 'We Handle Everything',
    solution_sub: 'AI Work Fluency provides a complete EU AI Act compliance package — training, documentation, and audit-ready reports.',
    solution_1_title: 'Compliance-Ready Training',
    solution_1_desc: 'Our training program includes all EU-mandated AI literacy content: understanding AI systems, recognizing risks, responsible use, and role-specific competencies.',
    solution_2_title: 'Audit-Ready Documentation',
    solution_2_desc: 'Automatically generated compliance reports per employee: training dates, content covered, competency scores, and completion certificates.',
    solution_3_title: 'Authority-Accepted Reports',
    solution_3_desc: 'Structured documentation that meets regulatory requirements — ready for auditors, ready for authorities.',
    solution_4_title: 'Company-Wide Rollout',
    solution_4_desc: 'From management to front-line: role-appropriate training paths that cover your entire organization systematically.',

    // What's included
    included_h2: 'What\'s in the Training',
    included_sub: 'EU-mandated content built into practical, daily micro-tasks — not boring compliance slides.',
    included_items: [
      'Understanding AI systems and their capabilities',
      'Recognizing AI-generated content and outputs',
      'Risk awareness and responsible AI use',
      'Data privacy and AI ethics fundamentals',
      'Role-specific AI competencies',
      'Practical AI tool proficiency (not just theory)',
      'Critical evaluation of AI outputs',
      'Understanding AI limitations and biases',
    ],
    included_note: 'All EU-mandated topics are woven into real, role-specific practice tasks — so your team builds actual skills while fulfilling compliance requirements.',

    // Process
    process_h2: 'How It Works',
    process_1_step: '1',
    process_1_title: 'Assessment',
    process_1_desc: 'We assess your company\'s current AI literacy level and identify gaps against EU requirements.',
    process_2_step: '2',
    process_2_title: 'Rollout',
    process_2_desc: 'Role-appropriate training paths are activated. Each employee gets daily 15-minute AI practice tasks.',
    process_3_step: '3',
    process_3_title: 'Track & Report',
    process_3_desc: 'Real-time dashboard shows progress. Compliance reports are generated automatically.',
    process_4_step: '4',
    process_4_title: 'Certify',
    process_4_desc: 'Upon completion, each employee receives documentation. Your company gets audit-ready compliance proof.',

    // CTA mid
    mid_cta_h2: 'The Obligation Is Already in Effect. Enforcement Is Coming.',
    mid_cta_button: 'Talk to Our Compliance Team',

    // Pricing
    pricing_h2: 'Compliance Packages',
    pricing_1_name: 'Starter',
    pricing_1_desc: 'Employee AI literacy compliance',
    pricing_1_price: 'HUF 8,000',
    pricing_1_period: '/person',
    pricing_1_features: ['EU AI Act Article 4 compliant training', 'Role-appropriate AI literacy content', 'Individual competency assessment', 'Completion certificate per employee'],
    pricing_1_cta: 'Start Now',
    pricing_2_name: 'Professional',
    pricing_2_desc: 'Full organizational compliance package',
    pricing_2_price: 'HUF 16,000',
    pricing_2_period: '/person',
    pricing_2_features: ['Everything in Starter', 'Audit-ready compliance documentation', 'Manager dashboard & team reports', 'Department-level compliance tracking', 'Regulatory-ready evidence package', 'Dedicated compliance support'],
    pricing_2_cta: 'Get Started',
    pricing_popular: 'Recommended',
    pricing_note: 'Volume discounts for 100+ employees. Custom enterprise packages available.',

    // FAQ
    faq_h2: 'Frequently Asked Questions',
    faq_1_q: 'Does the EU AI Act really apply to my company?',
    faq_1_a: 'If your company operates in the EU and your employees use any AI tools (including ChatGPT, Copilot, Gemini, etc.), then yes — Article 4 applies to you.',
    faq_2_q: 'What happens if we haven\'t taken any steps yet?',
    faq_2_a: 'The AI literacy obligation is already applicable. From August 2026, national authorities can actively investigate compliance and impose fines up to \u20ac35 million or 7% of global annual turnover. They can also order suspension of AI systems until compliance is demonstrated.',
    faq_3_q: 'Is an online course enough for compliance?',
    faq_3_a: 'A one-time course alone is unlikely to satisfy requirements. The regulation requires ongoing, documented, role-appropriate training with verifiable competency outcomes.',
    faq_4_q: 'How long does it take to get compliant?',
    faq_4_a: 'Most organizations can achieve baseline compliance within 4-8 weeks of starting the program, depending on team size and current AI literacy levels.',

    // Final CTA
    cta_h2: 'Enforcement Starts August 2026.',
    cta_sub: 'The obligation already applies. Every day without action is a day closer to regulatory scrutiny. Let us show you where you stand.',
    cta_button: 'Free Compliance Assessment',
    cta_sub2: 'No obligation. 15-minute call. Complete clarity.',

    // Footer
    footer: '\u00a9 2026 AI Work Fluency. All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_home: 'Main Site',
  },
  hu: {
    // Hero
    hero_eyebrow: 'EU AI ACT \u2014 4. CIKK MÁR HATÁLYBAN',
    hero_deadline_label: 'Hatósági kikényszerítés indul',
    hero_deadline: '2026. augusztus 2.',
    hero_h1_1: 'A cége',
    hero_h1_2: 'már most köteles lépni.',
    hero_h1_3: 'Készen állnak?',
    hero_sub: 'Az EU AI Act AI-jártassági kötelezettsége <strong>2025. február 2. óta hatályban van</strong>. Minden AI-t használó vállalatnak biztosítania kell munkavállalói megfelelő AI-jártasságát. 2026 augusztusától a nemzeti hatóságok vizsgálatokat indíthatnak és akár <strong>35 millió eurós vagy az éves árbevétel 7%-ának megfelelő bírságot</strong> szabhatnak ki.',
    hero_cta: 'Ingyenes megfelelőségi felmérés',
    hero_cta_sub: 'Megmutatjuk, pontosan hol tart a cége — és mire van szükség.',

    // Shadow AI warning
    shadow_h2: 'Ha munkatársai titokban használnak AI-t, a felelősség akkor is a cégét terheli.',
    shadow_desc: 'A felmérések szerint a munkavállalók több mint 50%-a már használ AI eszközöket a munkában — gyakran a munkáltatójuk tudta nélkül. Ezt hívjuk <strong>Shadow AI</strong>-nak. Az EU AI Act szerint nem számít, hogy az AI-használat hivatalos vagy nem hivatalos: <strong>a szervezet felel</strong> az AI-jártasság biztosításáért. Nincs szabályzat, nincs képzés, nincs dokumentáció = teljes felelősség.',

    // What the law says
    law_h2: 'Mit követel az EU AI Act',
    law_sub: 'Az EU AI Act 4. cikke AI-jártassági képzést ír elő minden AI rendszert használó vagy üzemeltető szervezet számára. Ez a kötelezettség 2025. február 2. óta alkalmazandó.',
    law_1_title: 'AI-jártassági képzés',
    law_1_desc: 'Minden AI-val érintkező munkavállalónak dokumentált, szerepkörének és kockázati szintjének megfelelő képzésben kell részesülnie.',
    law_2_title: 'Dokumentált bizonyítékok',
    law_2_desc: 'A szervezeteknek ellenőrizhető nyilvántartást kell vezetniük arról, hogy kit, mikor, mire és milyen szinten képeztek.',
    law_3_title: 'Folyamatos megfelelőség',
    law_3_desc: 'Ez nem egyszeri pipa. A képzésnek naprakésznek kell lennie, ahogy az AI rendszerek és szabályozások fejlődnek.',
    law_4_title: 'Kockázatarányos',
    law_4_desc: 'A képzés mélységének igazodnia kell a használt AI rendszerek kockázati szintjéhez — magasabb kockázat, szigorúbb követelmények.',

    // Risk
    risk_h2: 'A tétlenség ára',
    risk_1_title: 'Pénzügyi szankciók',
    risk_1_desc: 'Akár 35 millió eurós vagy a globális éves árbevétel 7%-ának megfelelő bírság — amelyik magasabb.',
    risk_2_title: 'Hatósági intézkedés',
    risk_2_desc: 'A nemzeti hatóságok elrendelhetik az AI rendszerek használatának felfüggesztését a megfelelőség igazolásáig.',
    risk_3_title: 'Reputációs kár',
    risk_3_desc: 'A meg nem felelés nyilvános lesz. Ügyfelek, partnerek és tehetségek észreveszik.',
    risk_4_title: 'Versenyhátány',
    risk_4_desc: 'A megfelelő versenytársak nyerik el azokat a tendereket és partnerségeket, amelyek EU AI Act megfelelőséget követelnek.',

    // Solution
    solution_h2: 'Mindent megoldunk',
    solution_sub: 'Az AI Work Fluency teljes EU AI Act megfelelőségi csomagot biztosít — képzés, dokumentáció és auditálásra kész riportok.',
    solution_1_title: 'Megfelelőségi képzés',
    solution_1_desc: 'Képzési programunk tartalmazza az összes EU által előírt AI-jártassági tartalmat: AI rendszerek megértése, kockázatfelismerés, felelős használat és szerepkör-specifikus kompetenciák.',
    solution_2_title: 'Auditálásra kész dokumentáció',
    solution_2_desc: 'Automatikusan generált megfelelőségi riportok munkavállalónként: képzési dátumok, feldolgozott tartalom, kompetenciapontszámok és elvégzési tanúsítványok.',
    solution_3_title: 'Hatóság által elfogadott riportok',
    solution_3_desc: 'Strukturált dokumentáció, amely megfelel a szabályozási követelményeknek — kész az auditorok, kész a hatóságok számára.',
    solution_4_title: 'Céges szintű bevezetés',
    solution_4_desc: 'A vezetőségtől a frontvonaling: szerepkör-specifikus képzési útvonalak, amelyek szisztematikusan lefedik az egész szervezetet.',

    // What's included
    included_h2: 'Mit tartalmaz a képzés',
    included_sub: 'EU által előírt tartalmak beépítve a gyakorlati, napi mikro-feladatokba — nem unalmas compliance prezentációk.',
    included_items: [
      'AI rendszerek megértése és képességeik',
      'AI által generált tartalmak és kimenetek felismerése',
      'Kockázattudatosság és felelős AI-használat',
      'Adatvédelem és AI-etikai alapok',
      'Szerepkör-specifikus AI kompetenciák',
      'Gyakorlati AI-eszköz jártasság (nem csak elmélet)',
      'AI kimenetek kritikus értékelése',
      'AI korlátok és torzítások megértése',
    ],
    included_note: 'Minden EU által előírt témakör bele van szőve a valódi, szerepkör-specifikus gyakorlófeladatokba — így a csapat tényleges készségeket épít, miközben teljesíti a megfelelőségi követelményeket.',

    // Process
    process_h2: 'Hogyan működik',
    process_1_step: '1',
    process_1_title: 'Felmérés',
    process_1_desc: 'Felmérjük a cég jelenlegi AI-jártassági szintjét és azonosítjuk a hiányosságokat az EU követelményekhez képest.',
    process_2_step: '2',
    process_2_title: 'Bevezetés',
    process_2_desc: 'Szerepkör-specifikus képzési útvonalak aktiválása. Minden munkavállaló napi 15 perces AI gyakorlófeladatokat kap.',
    process_3_step: '3',
    process_3_title: 'Követés és riportálás',
    process_3_desc: 'Valós idejű dashboard mutatja a haladást. A megfelelőségi riportok automatikusan generálódnak.',
    process_4_step: '4',
    process_4_title: 'Tanúsítás',
    process_4_desc: 'Teljesítéskor minden munkavállaló dokumentációt kap. A cég auditálásra kész megfelelőségi igazolást kap.',

    // CTA mid
    mid_cta_h2: 'A kötelezettség már él. A kikényszerítés közeleg.',
    mid_cta_button: 'Beszéljen megfelelőségi csapatunkkal',

    // Pricing
    pricing_h2: 'Megfelelőségi csomagok',
    pricing_1_name: 'Alap',
    pricing_1_desc: 'Munkatársak AI-jártassági megfelelősége',
    pricing_1_price: '8 000 Ft',
    pricing_1_period: '/fő',
    pricing_1_features: ['EU AI Act 4. cikk szerinti képzés', 'Szerepkörre szabott AI-jártassági tartalom', 'Egyéni kompetenciafelmérés', 'Elvégzési tanúsítvány munkatársanként'],
    pricing_1_cta: 'Kezdés most',
    pricing_2_name: 'Professional',
    pricing_2_desc: 'Teljes szervezeti megfelelőségi csomag',
    pricing_2_price: '16 000 Ft',
    pricing_2_period: '/fő',
    pricing_2_features: ['Minden, ami az Alapban', 'Auditálásra kész megfelelőségi dokumentáció', 'Vezetői dashboard és csapatriportok', 'Osztályszintű megfelelőség-követés', 'Hatósági vizsgálatra kész bizonyítékcsomag', 'Dedikált megfelelőségi támogatás'],
    pricing_2_cta: 'Indítás',
    pricing_popular: 'Ajánlott',
    pricing_note: '100+ fő felett kedvezményes árazás. Egyedi enterprise csomagok elérhetők.',

    // FAQ
    faq_h2: 'Gyakran ismételt kérdések',
    faq_1_q: 'Tényleg vonatkozik ránk az EU AI Act?',
    faq_1_a: 'Ha a cége az EU-ban működik és a munkavállalói bármilyen AI eszközt használnak (beleértve a ChatGPT-t, Copilotot, Geminit stb.), akkor igen — a 4. cikk Önökre is vonatkozik.',
    faq_2_q: 'Mi történik, ha a cégünk nem tett semmit eddig?',
    faq_2_a: 'Az AI-jártassági kötelezettség már alkalmazandó. 2026 augusztusától a nemzeti hatóságok aktívan vizsgálhatják a megfelelőséget, és akár 35 millió eurós vagy a globális éves árbevétel 7%-ának megfelelő bírságot szabhatnak ki. Elrendelhetik az AI rendszerek felfüggesztését is.',
    faq_3_q: 'Elég egy online kurzus a megfelelőséghez?',
    faq_3_a: 'Egy egyszeri kurzus önmagában valószínűleg nem elégíti ki a követelményeket. A szabályozás folyamatos, dokumentált, szerepkör-specifikus képzést vár el, ellenőrizhető kompetencia-eredményekkel.',
    faq_4_q: 'Mennyi idő alatt érjük el a megfelelőséget?',
    faq_4_a: 'A legtöbb szervezet 4-8 héten belül elérheti az alap megfelelőséget a program elindításától, a csapat méretétől és a jelenlegi AI-jártassági szinttől függően.',

    // Final CTA
    cta_h2: 'A hatósági vizsgálatok 2026 augusztusában indulnak.',
    cta_sub: 'A kötelezettség már él. Minden tétlenül töltött nap egy nappal közelebb a hatósági vizsgálatokhoz. Hadd mutassuk meg, hol tart a cége.',
    cta_button: 'Ingyenes megfelelőségi felmérés',
    cta_sub2: 'Nincs kötelezettség. 15 perces beszélgetés. Teljes tisztánlátás.',

    // Footer
    footer: '© 2026 AI Work Fluency. Minden jog fenntartva.',
    footer_privacy: 'Adatvédelmi irányelvek',
    footer_terms: 'Felhasználási feltételek',
    footer_home: 'Főoldal',
  },
} as const;

function getMonthsLeft(): number {
  const deadline = new Date('2026-08-02');
  const now = new Date();
  const months = (deadline.getFullYear() - now.getFullYear()) * 12 + (deadline.getMonth() - now.getMonth());
  return Math.max(0, months);
}

export default function EuComplianceLandingPage({ params }: { params: { locale: string } }) {
  const locale = (params.locale === 'hu' ? 'hu' : 'en') as keyof typeof copy;
  const t = copy[locale];
  const monthsLeft = getMonthsLeft();

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-600" />
            <span className="text-lg font-bold text-gray-900">AI Work Fluency</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 text-xs border border-gray-200 rounded-md overflow-hidden">
              {locales.map((l) => (
                <Link key={l} href={`/lp/eu-compliance/${l}`} className={`px-2 py-1 transition-colors ${l === locale ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            <Link href={`/lp/eu-compliance/assessment/${locale}`} className="btn-primary text-sm py-2 px-5">{t.hero_cta}</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-900 to-slate-900" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.3),transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-4 pt-16 sm:pt-24 pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold tracking-widest px-4 py-2 rounded-full mb-8 border border-amber-500/30">
              <AlertTriangle className="w-4 h-4" />
              {t.hero_eyebrow}
            </div>

            {/* Countdown badge */}
            <div className="mb-8">
              <div className="inline-flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl px-8 py-4 backdrop-blur-sm">
                <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t.hero_deadline_label}</span>
                <span className="text-lg font-bold text-amber-400">{t.hero_deadline}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
              {t.hero_h1_1}{' '}
              <span className="text-amber-400">{t.hero_h1_2}</span><br />
              {t.hero_h1_3}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t.hero_sub }} />
            <Link href={`/lp/eu-compliance/assessment/${locale}`} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold text-lg py-4 px-10 rounded-lg inline-flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20">
              {t.hero_cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-500 mt-4">{t.hero_cta_sub}</p>
          </div>
        </div>
      </section>

      {/* SHADOW AI WARNING */}
      <section className="py-12 bg-amber-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <EyeOff className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white mb-3">{t.shadow_h2}</h2>
              <p className="text-sm sm:text-base text-amber-200/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.shadow_desc }} />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT THE LAW SAYS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <Scale className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">{t.law_h2}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.law_sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: t.law_1_title, desc: t.law_1_desc, icon: BookOpen },
              { title: t.law_2_title, desc: t.law_2_desc, icon: FileText },
              { title: t.law_3_title, desc: t.law_3_desc, icon: CalendarClock },
              { title: t.law_4_title, desc: t.law_4_desc, icon: ShieldCheck },
            ].map((item, i) => (
              <div key={i} className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISK */}
      <section className="py-20 bg-red-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.risk_h2}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: t.risk_1_title, desc: t.risk_1_desc },
              { title: t.risk_2_title, desc: t.risk_2_desc },
              { title: t.risk_3_title, desc: t.risk_3_desc },
              { title: t.risk_4_title, desc: t.risk_4_desc },
            ].map((item, i) => (
              <div key={i} className="bg-red-900/50 rounded-2xl p-6 border border-red-800/50">
                <h3 className="font-bold text-red-300 mb-2">{item.title}</h3>
                <p className="text-sm text-red-200/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <Building2 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">{t.solution_h2}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.solution_sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: t.solution_1_title, desc: t.solution_1_desc, icon: BookOpen },
              { title: t.solution_2_title, desc: t.solution_2_desc, icon: ClipboardCheck },
              { title: t.solution_3_title, desc: t.solution_3_desc, icon: FileText },
              { title: t.solution_4_title, desc: t.solution_4_desc, icon: Users },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">{t.included_h2}</h2>
            <p className="text-lg text-gray-600">{t.included_sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {t.included_items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 border border-indigo-100">
                <CheckCircle className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-indigo-100 rounded-xl p-5 border border-indigo-200">
            <p className="text-sm text-indigo-900 text-center font-medium">{t.included_note}</p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-14 text-center">{t.process_h2}</h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { step: t.process_1_step, title: t.process_1_title, desc: t.process_1_desc },
              { step: t.process_2_step, title: t.process_2_title, desc: t.process_2_desc },
              { step: t.process_3_step, title: t.process_3_title, desc: t.process_3_desc },
              { step: t.process_4_step, title: t.process_4_title, desc: t.process_4_desc },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white font-black text-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MID CTA */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Clock className="w-10 h-10 text-indigo-200 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">{t.mid_cta_h2}</h2>
          <Link href={`/lp/eu-compliance/assessment/${locale}`} className="bg-white hover:bg-gray-100 text-indigo-700 font-bold text-lg py-4 px-10 rounded-lg inline-flex items-center gap-2 transition-colors">
            {t.mid_cta_button}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">{t.pricing_h2}</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 text-center">
              <div className="font-bold text-lg text-gray-900 mb-1">{t.pricing_1_name}</div>
              <div className="text-sm text-gray-500 mb-4">{t.pricing_1_desc}</div>
              <div className="text-4xl font-black text-gray-900 mb-1">{t.pricing_1_price}</div>
              <div className="text-sm text-gray-500 mb-5">{t.pricing_1_period}</div>
              <div className="space-y-3 text-sm text-left mb-6">
                {t.pricing_1_features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href={`/lp/eu-compliance/assessment/${locale}`} className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-xl transition-colors text-sm">{t.pricing_1_cta}</Link>
            </div>
            {/* Professional */}
            <div className="bg-white rounded-2xl p-6 border-2 border-indigo-400 shadow-lg text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">{t.pricing_popular}</div>
              <div className="font-bold text-lg text-gray-900 mb-1">{t.pricing_2_name}</div>
              <div className="text-sm text-gray-500 mb-4">{t.pricing_2_desc}</div>
              <div className="text-4xl font-black text-indigo-600 mb-1">{t.pricing_2_price}</div>
              <div className="text-sm text-gray-500 mb-5">{t.pricing_2_period}</div>
              <div className="space-y-3 text-sm text-left mb-6">
                {t.pricing_2_features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href={`/lp/eu-compliance/assessment/${locale}`} className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors text-sm">{t.pricing_2_cta}</Link>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">{t.pricing_note}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">{t.faq_h2}</h2>
          <div className="space-y-6">
            {[
              { q: t.faq_1_q, a: t.faq_1_a },
              { q: t.faq_2_q, a: t.faq_2_a },
              { q: t.faq_3_q, a: t.faq_3_a },
              { q: t.faq_4_q, a: t.faq_4_a },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-indigo-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <CalendarClock className="w-16 h-16 text-amber-400 mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">{t.cta_h2}</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">{t.cta_sub}</p>
          <Link href={`/lp/eu-compliance/assessment/${locale}`} className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold text-lg py-4 px-12 rounded-lg inline-flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20">
            {t.cta_button}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-500 mt-4 text-sm">{t.cta_sub2}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>{t.footer}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{t.footer_home}</Link>
            <Link href={`/eu-ai-act/${locale}`} className="hover:text-white transition-colors">EU AI Act</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{t.footer_privacy}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t.footer_terms}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
