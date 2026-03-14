import Link from 'next/link';
import { ArrowRight, CheckCircle, Phone, Mail, Download, AlertTriangle, Building2, Users, Shield, FileText, BookOpen, ClipboardCheck } from 'lucide-react';
import { locales, type Locale } from '@/lib/i18n/dictionaries';
import RiskCalculator from './RiskCalculator';
import FaqAccordion from './FaqAccordion';
import CallbackForm from './CallbackForm';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  en: {
    // Nav
    nav_solution: 'Solution',
    nav_process: 'Process',
    nav_pricing: 'Pricing',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',

    // Urgency bar
    urgency_badge: 'In Effect',
    urgency_text: 'EU AI Act Article 4 has been in effect since February 2, 2025. Regulatory investigations begin: August 2, 2026.',

    // Hero
    hero_eyebrow: 'EU AI Act (2024/1689) — Article 4',
    hero_h1_plain: 'Employee AI use is now',
    hero_h1_highlight: 'the CEO\'s responsibility.',
    hero_sub: 'Even if the employee uses it in secret. If there is no documentation proving your staff knows how to use AI properly —',
    hero_sub_bold: 'that\'s hard to explain during a regulatory audit.',
    hero_date_note: 'Regulatory investigations begin on August 2, 2026.',
    hero_cta_primary: 'Free Assessment — 15 minutes',
    hero_cta_secondary: 'Download Exec Summary',
    stat_1_value: '€35M',
    stat_1_label: 'maximum regulatory fine',
    stat_2_value: '50%+',
    stat_2_label: 'of employees already use AI in secret',
    stat_3_value: '3–4 weeks',
    stat_3_label: 'full compliance rollout time',

    // Segment
    segment_label: 'Which fits your situation?',
    segment_1_size: '10 — 100 employees',
    segment_1_title: 'Fast, admin-free compliance',
    segment_1_desc: 'Turnkey training + documentation package. Your team completes the program in 3–4 weeks, you get audit-preparatory documentation. No IT integration needed.',
    segment_2_size: '100 — 500+ employees',
    segment_2_title: 'Board-ready governance & HR integration',
    segment_2_desc: 'Department-level rollout, custom policies, risk classification, manager dashboards. We integrate with your existing HR and compliance workflows.',

    // Problems
    problems_tag: 'The Three Questions',
    problems_h2: 'What most leaders don\'t know until the audit.',
    problems_lead: 'Over 50% of employees already use AI tools at work — often without management\'s knowledge. The EU AI Act doesn\'t distinguish between authorized and unauthorized use: the organization is liable.',
    problem_1_tag: 'Shadow AI',
    problem_1_title: 'Who in your company is using AI, and for what?',
    problem_1_desc: 'Most leaders have no visibility into which employees use ChatGPT, Copilot, or other AI tools daily. Without a registry, you can\'t demonstrate compliance.',
    problem_2_tag: 'Documentation Gap',
    problem_2_title: 'Is there proof your employees know the rules?',
    problem_2_desc: 'Article 4 requires documented evidence that employees received role-appropriate AI literacy training. A policy document alone is not enough.',
    problem_3_tag: 'Audit Readiness',
    problem_3_title: 'What goes on the table when the authority walks in?',
    problem_3_desc: 'Regulators expect a structured evidence package: training records, governance documents, risk assessments. Can you produce this today?',

    // Solution
    solution_tag: 'The AI Work Fluency Solution',
    solution_h2: 'What you get: training, policies, and a package you can put on the table.',
    solution_lead: 'We don\'t just train your employees. We build the complete compliance infrastructure — so when the auditor asks, you have an answer.',
    solution_1_number: '01',
    solution_1_title: 'Employee AI Training',
    solution_1_items: [
      'EU AI Act Article 4 compliant curriculum',
      'Role-specific content, not generic slides',
      'Practical daily micro-tasks (15 min/day)',
      'Individual competency tracking',
      'Completion records per employee',
    ],
    solution_2_number: '02',
    solution_2_title: 'Internal Policies & Registry',
    solution_2_items: [
      'AI usage policy tailored to your organization',
      'Employee roles & responsibilities framework',
      'Internal AI tool registry and risk classification',
      'Clear guidelines for approved vs. prohibited use',
    ],
    solution_3_number: '03',
    solution_3_title: 'Audit-Preparatory Documentation Package',
    solution_3_items: [
      'One-click audit-preparatory report bundle',
      'Complete compliance timeline & evidence trail',
      'Structured per AI Act documentation requirements',
      'Regulatory liaison support if investigation starts',
    ],

    // Process
    process_tag: 'Process',
    process_h2: 'From zero to audit-ready in 3–4 weeks',
    process_1_week: 'Week 1',
    process_1_title: 'Assessment & Setup',
    process_1_desc: 'We assess your current AI literacy level, map AI tool usage, and configure the training paths.',
    process_2_week: 'Week 1–2',
    process_2_title: 'Policy & Governance',
    process_2_desc: 'AI usage policy drafted, roles defined, internal registry initiated. Board-level summary delivered.',
    process_3_week: 'Week 2–3',
    process_3_title: 'Training Rollout',
    process_3_desc: 'Employees receive daily micro-tasks. Progress tracked in real-time. Manager dashboards activated.',
    process_4_week: 'Week 3–4',
    process_4_title: 'Documentation & Handover',
    process_4_desc: 'Completion records issued. Full audit-preparatory package delivered. You\'re covered.',

    // Numbers band
    numbers_1_value: 'Feb 2, 2025',
    numbers_1_label: 'Article 4 in effect since',
    numbers_2_value: 'Aug 2, 2026',
    numbers_2_label: 'Regulatory investigations begin',
    numbers_3_value: '€35M',
    numbers_3_label: 'Maximum fine per violation',
    numbers_4_value: '3–4 weeks',
    numbers_4_label: 'Full compliance rollout',

    // Risk calculator
    risk_tag: 'Risk Exposure',
    risk_h2: '€35M',
    risk_sub: 'or 7% of annual revenue',
    risk_desc: 'That\'s the maximum fine for non-compliance with the EU AI Act. The actual penalty depends on your company size, revenue, and the severity of the violation. Use the calculator to estimate your exposure.',

    // Pricing
    pricing_tag: 'Pricing',
    pricing_h2: 'Choose Your Protection Level',
    pricing_1_name: 'Starter — AI Literacy',
    pricing_1_desc: 'Recommended: if your only goal is quick Article 4 AI literacy compliance',
    pricing_1_price: 'HUF 8,000',
    pricing_1_period: '/person',
    pricing_1_features: [
      'EU AI Act Article 4 compliant training',
      'Role-appropriate AI literacy content',
      'Individual competency assessment',
      'AI literacy training completion record per employee',
    ],
    pricing_1_cta: 'Start Now',
    pricing_2_name: 'Professional — Full Protection',
    pricing_2_desc: 'Complete organizational compliance package with governance',
    pricing_2_price: 'HUF 16,000',
    pricing_2_period: '/person',
    pricing_2_features: [
      'Everything in Starter',
      'Documentation structured per AI Act requirements',
      'AI governance framework setup',
      'Risk management & AI tool registry',
      'Manager dashboard & team reports',
      'Department-level compliance tracking',
      'Audit-preparatory documentation package',
      'Dedicated compliance support',
    ],
    pricing_2_cta: 'Get Started',
    pricing_popular: 'Recommended',
    pricing_explainer_title: 'Why ongoing — not one-time',
    pricing_explainer_text: 'AI compliance isn\'t a checkbox you tick once. AI technology evolves weekly — new tools, new risks, new regulatory guidance. Your employees need to stay current. That\'s why AI Work Fluency provides personalized daily real-world tasks for every employee, and an AI coaching system that adapts to each person\'s role and progress. This isn\'t a generic course — it\'s a living compliance program.',
    pricing_note: 'Volume discounts for 100+ employees. Custom enterprise packages available.',
    pricing_headcount_label: 'Team size',
    pricing_total_label: 'Estimated total',

    // FAQ
    faq_tag: 'FAQ',
    faq_h2: 'Frequently Asked Questions',
    faq_items: [
      {
        q: 'Does the EU AI Act really apply to my company?',
        a: 'If your company operates in the EU and your employees use any AI tools (including ChatGPT, Copilot, Gemini, etc.), then yes — Article 4 applies to you. It doesn\'t matter if the usage is official or unofficial.',
      },
      {
        q: 'What exactly does Article 4 require?',
        a: 'Article 4 mandates that all organizations deploying or using AI systems must ensure adequate AI literacy among their staff. This means documented, role-appropriate training — not just a policy document or a one-time presentation.',
      },
      {
        q: 'Is an online course enough for compliance?',
        a: 'A one-time course alone is unlikely to satisfy requirements. The regulation requires ongoing, documented, role-appropriate training with verifiable competency outcomes — plus governance documentation.',
      },
      {
        q: 'How long does it take to get compliant?',
        a: 'Most organizations can achieve baseline compliance within 3–4 weeks of starting the program, depending on team size and current AI literacy levels.',
      },
      {
        q: 'What happens if we\'re not compliant by August 2026?',
        a: 'National authorities can launch investigations and impose fines up to €35 million or 7% of annual global turnover — whichever is higher. They can also order suspension of AI system use until compliance is demonstrated.',
      },
      {
        q: 'Can you help if a regulatory investigation starts?',
        a: 'Yes. Our Professional package includes regulatory liaison support. We help prepare all documentation, evidence packages, and can assist in communications with authorities.',
      },
    ],

    // Dual CTA
    cta_h2: 'August 2, 2026. Covered in three weeks.',
    cta_sub: 'Choose which fits your situation.',
    cta_kkv_title: 'SME (10–100 employees)',
    cta_kkv_desc: 'Talk to us directly. We\'ll walk you through the process in 15 minutes.',
    cta_kkv_phone: '+36 20 918 5354',
    cta_kkv_person: 'Dániel Rózsa · AI Consultant',
    cta_kkv_cta: 'Call now',
    cta_enterprise_title: 'Enterprise (100–500+)',
    cta_enterprise_desc: 'Get the executive summary with compliance requirements, timelines, and pricing for your organization.',
    cta_enterprise_cta: 'Download Exec Summary',
    cta_enterprise_email: 'daniel.rozsa@aiworkfluency.com',
    cta_enterprise_email_label: 'Or email us directly:',

    // Footer
    footer: '© 2026 AI Work Fluency. All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_home: 'Main Site',
    footer_company: 'Rebelframes Kft.',
    footer_phone: '+36 20 918 5354',
    footer_legal: 'Legal notice: This service does not constitute legal advice and does not guarantee full regulatory compliance. Ultimate compliance responsibility lies with the organization in all cases.',
  },
  hu: {
    // Nav
    nav_solution: 'Megoldás',
    nav_process: 'Folyamat',
    nav_pricing: 'Árak',
    nav_faq: 'GYIK',
    nav_contact: 'Kapcsolat',

    // Urgency bar
    urgency_badge: 'Hatályban',
    urgency_text: 'Az EU AI Act 4. cikke 2025. február 2. óta érvényes. Hatósági vizsgálatok indulnak: 2026. augusztus 2.',

    // Hero
    hero_eyebrow: 'EU AI Act (2024/1689) — 4. cikk',
    hero_h1_plain: 'A munkavállalói AI-használat mostantól',
    hero_h1_highlight: 'a cégvezető felelőssége.',
    hero_sub: 'Akkor is, ha a munkavállaló titokban használja. Ha nincs dokumentálva, hogy a dolgozók tudják, hogyan szabad AI-t alkalmazni —',
    hero_sub_bold: 'hatósági ellenőrzéskor ezt nehéz megmagyarázni.',
    hero_date_note: '2026. augusztus 2-án megkezdődnek a hatósági vizsgálatok.',
    hero_cta_primary: 'Ingyenes felmérés — 15 perc',
    hero_cta_secondary: 'Exec summary letöltése',
    stat_1_value: '35M EUR',
    stat_1_label: 'maximális hatósági bírság',
    stat_2_value: '50%+',
    stat_2_label: 'dolgozó már használ AI-t titokban',
    stat_3_value: '3–4 hét',
    stat_3_label: 'teljes megfelelőség bevezetési idő',

    // Segment
    segment_label: 'Melyik illik az önök helyzetéhez?',
    segment_1_size: '10 — 100 fős vállalkozás',
    segment_1_title: 'Gyors, adminisztrációmentes megfelelőség',
    segment_1_desc: 'Kulcsrakész képzés + dokumentációs csomag. A csapat 3–4 hét alatt végez, Ön audit-felkészítő dokumentációt kap. IT integráció nem szükséges.',
    segment_2_size: '100 — 500+ fős szervezet',
    segment_2_title: 'Board-ready governance és HR-integráció',
    segment_2_desc: 'Osztályszintű bevezetés, egyedi szabályzatok, kockázati besorolás, vezetői dashboardok. Integráljuk a meglévő HR és compliance folyamataiba.',

    // Problems
    problems_tag: 'A három kérdés',
    problems_h2: 'Amit a legtöbb vezető nem tud hatósági vizsgálatig.',
    problems_lead: 'A munkavállalók több mint 50%-a már használ AI eszközöket a munkában — gyakran a vezetőség tudta nélkül. Az EU AI Act nem tesz különbséget engedélyezett és nem engedélyezett használat között: a szervezet felel.',
    problem_1_tag: 'Shadow AI',
    problem_1_title: 'Ki használ AI-t a cégben, és mire?',
    problem_1_desc: 'A legtöbb vezető nem látja, melyik munkatárs használ naponta ChatGPT-t, Copilotot vagy más AI eszközt. Nyilvántartás nélkül nem igazolható a megfelelőség.',
    problem_2_tag: 'Dokumentációs rés',
    problem_2_title: 'Van papír arról, hogy a dolgozók tudják, hogyan szabad?',
    problem_2_desc: 'A 4. cikk dokumentált bizonyítékot követel arról, hogy a munkavállalók szerepkörüknek megfelelő AI-jártassági képzésben részesültek. Egy szabályzat önmagában nem elég.',
    problem_3_tag: 'Audit-készültség',
    problem_3_title: 'Mi kerül az asztalra, ha bejön a hatóság?',
    problem_3_desc: 'A hatóság strukturált bizonyítékcsomagot vár: képzési nyilvántartások, governance dokumentumok, kockázatértékelések. Ezt ma elő tudná állítani?',

    // Solution
    solution_tag: 'Az AI Work Fluency megoldás',
    solution_h2: 'Amit kap: képzés, szabályzat, és egy csomag, amit le tud tenni az asztalra.',
    solution_lead: 'Nem csak képezzük a dolgozókat. Felépítjük a teljes megfelelőségi infrastruktúrát — hogy amikor az auditor kérdez, legyen válasz.',
    solution_1_number: '01',
    solution_1_title: 'Munkavállalói AI-képzés',
    solution_1_items: [
      'EU AI Act 4. cikk szerinti tananyag',
      'Szerepkör-specifikus tartalom, nem generikus prezentáció',
      'Gyakorlati napi mikro-feladatok (15 perc/nap)',
      'Egyéni kompetenciakövetés',
      'Teljesítési igazolás munkatársanként',
    ],
    solution_2_number: '02',
    solution_2_title: 'Belső szabályzat és nyilvántartás',
    solution_2_items: [
      'AI-használati szabályzat a szervezetre szabva',
      'Munkavállalói szerepkörök és felelősségek keretrendszere',
      'Belső AI eszköz-nyilvántartás és kockázati besorolás',
      'Egyértelmű irányelvek az engedélyezett és tiltott használatról',
    ],
    solution_3_number: '03',
    solution_3_title: 'Audit-felkészítő dokumentációs csomag',
    solution_3_items: [
      'Gombnyomásra generált audit-felkészítő riportcsomag',
      'Teljes megfelelőségi időszak és bizonyítékok',
      'AI Act követelmények szerint strukturált dokumentáció',
      'Hatósági kapcsolattartási támogatás vizsgálat esetén',
    ],

    // Process
    process_tag: 'Folyamat',
    process_h2: 'A nulláról audit-készültig 3–4 hét alatt',
    process_1_week: '1. hét',
    process_1_title: 'Felmérés és beállítás',
    process_1_desc: 'Felmérjük a jelenlegi AI-jártassági szintet, feltérképezzük az AI eszközhasználatot, és konfiguráljuk a képzési útvonalakat.',
    process_2_week: '1–2. hét',
    process_2_title: 'Szabályzat és governance',
    process_2_desc: 'AI-használati szabályzat kidolgozása, szerepkörök definiálása, belső nyilvántartás elindítása. Board-szintű összefoglaló átadása.',
    process_3_week: '2–3. hét',
    process_3_title: 'Képzés bevezetése',
    process_3_desc: 'A munkavállalók napi mikro-feladatokat kapnak. A haladás valós időben követhető. Vezetői dashboardok aktiválása.',
    process_4_week: '3–4. hét',
    process_4_title: 'Dokumentáció és átadás',
    process_4_desc: 'Teljesítési igazolások kiadása. Teljes audit-felkészítő csomag átadása. Lefedve.',

    // Numbers band
    numbers_1_value: '2025. feb. 2.',
    numbers_1_label: '4. cikk hatályos',
    numbers_2_value: '2026. aug. 2.',
    numbers_2_label: 'Hatósági vizsgálatok indulnak',
    numbers_3_value: '35M EUR',
    numbers_3_label: 'Maximális bírság jogsértésenként',
    numbers_4_value: '3–4 hét',
    numbers_4_label: 'Teljes bevezetés',

    // Risk calculator
    risk_tag: 'Kockázati kitettség',
    risk_h2: '35M EUR',
    risk_sub: 'vagy az éves árbevétel 7%-a',
    risk_desc: 'Ez a maximális bírság az EU AI Act megsértéséért. A tényleges szankció a cégmérettől, árbevételtől és a jogsértés súlyosságától függ. A kalkulátorral becsülje meg a kitettségét.',

    // Pricing
    pricing_tag: 'Árak',
    pricing_h2: 'Válassza ki a védelmi szintet',
    pricing_1_name: 'Alap csomag — AI Literacy',
    pricing_1_desc: 'Ajánlott: ha csak a 4. cikk gyors AI-literacy teljesítése a cél',
    pricing_1_price: '8 000 Ft',
    pricing_1_period: '/fő',
    pricing_1_features: [
      'EU AI Act 4. cikk szerinti képzés',
      'Szerepkörre szabott AI-jártassági tartalom',
      'Egyéni kompetenciafelmérés',
      'AI literacy képzés teljesítési igazolás munkatársanként',
    ],
    pricing_1_cta: 'Kezdés most',
    pricing_2_name: 'Professional csomag — Teljes védelem',
    pricing_2_desc: 'Teljes szervezeti megfelelőségi csomag governance-szel',
    pricing_2_price: '16 000 Ft',
    pricing_2_period: '/fő',
    pricing_2_features: [
      'Minden, ami az Alap csomagban',
      'AI Act követelmények szerint strukturált dokumentáció',
      'AI governance keretrendszer felépítése',
      'Kockázatkezelés és AI eszköz-nyilvántartás',
      'Vezetői dashboard és csapatriportok',
      'Osztályszintű megfelelőség-követés',
      'Audit-felkészítő dokumentációs csomag',
      'Dedikált megfelelőségi támogatás',
    ],
    pricing_2_cta: 'Indítás',
    pricing_popular: 'Ajánlott',
    pricing_explainer_title: 'Miért folyamatos — nem egyszeri',
    pricing_explainer_text: 'Az AI-megfelelőség nem egy pipa, amit egyszer bejelölsz. Az AI technológia hetente változik — új eszközök, új kockázatok, új szabályozói iránymutatások. A munkatársaknak naprakésznek kell maradniuk. Ezért az AI Work Fluency minden dolgozónak személyre szabott, napi valós feladatokat ad, és egy AI coaching rendszer igazodik mindenkinek a szerepköréhez és haladásához. Ez nem egy generikus tanfolyam — ez egy élő megfelelőségi program.',
    pricing_note: '100+ fő felett kedvezményes árazás. Egyedi enterprise csomagok elérhetők.',
    pricing_headcount_label: 'Csapatméret',
    pricing_total_label: 'Becsült összeg',

    // FAQ
    faq_tag: 'GYIK',
    faq_h2: 'Gyakran ismételt kérdések',
    faq_items: [
      {
        q: 'Tényleg vonatkozik ránk az EU AI Act?',
        a: 'Ha a cége az EU-ban működik és a munkavállalói bármilyen AI eszközt használnak (beleértve a ChatGPT-t, Copilotot, Geminit stb.), akkor igen — a 4. cikk Önökre is vonatkozik. Nem számít, hogy a használat hivatalos vagy nem.',
      },
      {
        q: 'Pontosan mit követel a 4. cikk?',
        a: 'A 4. cikk előírja, hogy minden AI rendszert üzemeltető vagy használó szervezetnek biztosítania kell a munkatársak megfelelő AI-jártasságát. Ez dokumentált, szerepkörnek megfelelő képzést jelent — nem elég egy szabályzat vagy egy egyszeri előadás.',
      },
      {
        q: 'Elég egy online kurzus a megfelelőséghez?',
        a: 'Egy egyszeri kurzus önmagában valószínűleg nem elégíti ki a követelményeket. A szabályozás folyamatos, dokumentált, szerepkör-specifikus képzést vár el, ellenőrizhető kompetencia-eredményekkel — plusz governance dokumentációt.',
      },
      {
        q: 'Mennyi idő alatt érjük el a megfelelőséget?',
        a: 'A legtöbb szervezet 3–4 héten belül elérheti az alap megfelelőséget a program elindításától, a csapat méretétől és a jelenlegi AI-jártassági szinttől függően.',
      },
      {
        q: 'Mi történik, ha 2026 augusztusáig nem vagyunk megfelelőek?',
        a: 'A nemzeti hatóságok vizsgálatokat indíthatnak és akár 35 millió eurós vagy az éves globális árbevétel 7%-ának megfelelő bírságot szabhatnak ki — amelyik magasabb. Elrendelhetik az AI rendszerek használatának felfüggesztését is a megfelelőség igazolásáig.',
      },
      {
        q: 'Tudtok segíteni, ha hatósági vizsgálat indul?',
        a: 'Igen. A Professional csomagunk tartalmazza a hatósági kapcsolattartási támogatást. Segítünk az összes dokumentáció és bizonyítékcsomag előkészítésében, és támogatjuk a hatósági kommunikációt.',
      },
    ],

    // Dual CTA
    cta_h2: '2026. augusztus 2. Három hét alatt lefedett.',
    cta_sub: 'Válassza, melyik az önök helyzete.',
    cta_kkv_title: 'KKV (10–100 fő)',
    cta_kkv_desc: 'Beszéljünk közvetlenül. 15 perc alatt végigvezetjük a folyamaton.',
    cta_kkv_phone: '+36 20 918 5354',
    cta_kkv_person: 'Rózsa Dániel · AI Consultant',
    cta_kkv_cta: 'Hívjon most',
    cta_enterprise_title: 'Nagyvállalat (100–500+)',
    cta_enterprise_desc: 'Kérje az executive summary-t a megfelelőségi követelményekről, határidőkről és az önök szervezetére szabott árazásról.',
    cta_enterprise_cta: 'Exec summary letöltése',
    cta_enterprise_email: 'daniel.rozsa@aiworkfluency.com',
    cta_enterprise_email_label: 'Vagy írjon nekünk:',

    // Footer
    footer: '© 2026 AI Work Fluency. Minden jog fenntartva.',
    footer_privacy: 'Adatvédelmi irányelvek',
    footer_terms: 'Felhasználási feltételek',
    footer_home: 'Főoldal',
    footer_company: 'Rebelframes Kft.',
    footer_phone: '+36 20 918 5354',
    footer_legal: 'A szolgáltatás nem minősül jogi tanácsadásnak, és nem garantálja a teljes szabályozási megfelelést. A végső megfelelési felelősség minden esetben a szervezetet terheli.',
  },
} as const;

export default function EuComplianceLandingPageV3({ params }: { params: { locale: string } }) {
  const locale = (params.locale === 'hu' ? 'hu' : 'en') as keyof typeof copy;
  const t = copy[locale];
  const isHu = locale === 'hu';

  const solutionColors = ['bg-[#00a9f4]', 'bg-[#7c3aed]', 'bg-[#10b981]'];

  return (
    <>
      {/* Google Fonts for serif headings */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style dangerouslySetInnerHTML={{ __html: `
        .font-serif-heading { font-family: 'Libre Baskerville', Georgia, 'Times New Roman', serif; }
      `}} />

      <div className="min-h-screen bg-white text-gray-900">

        {/* ============================================= */}
        {/* 1. NAV — sticky dark navy */}
        {/* ============================================= */}
        <nav className="bg-[#051c2c] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            <Link href={`/lp/eu-compliance/v3/${locale}`} className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-white/80 flex items-center justify-center">
                <span className="text-white font-bold text-[10px] sm:text-xs tracking-tight">AWF</span>
              </div>
              <span className="text-sm sm:text-[15px] font-semibold text-white tracking-wide hidden xs:inline">AI Work Fluency</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-5 text-sm text-white/60">
                <a href="#megoldas" className="hover:text-white transition-colors">{t.nav_solution}</a>
                <a href="#folyamat" className="hover:text-white transition-colors">{t.nav_process}</a>
                <a href="#arak" className="hover:text-white transition-colors">{t.nav_pricing}</a>
                <a href="#gyik" className="hover:text-white transition-colors">{t.nav_faq}</a>
              </div>
              {/* Language switcher */}
              <div className="flex gap-0.5 text-xs border border-white/20 overflow-hidden">
                {locales.map((l) => (
                  <Link key={l} href={`/lp/eu-compliance/v3/${l}`} className={`px-2 sm:px-2.5 py-1 transition-colors ${l === locale ? 'bg-white text-[#051c2c]' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                    {l.toUpperCase()}
                  </Link>
                ))}
              </div>
              {/* CTA */}
              <a href="#kapcsolat" className="bg-[#00a9f4] hover:bg-[#0090d0] text-white font-semibold text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-5 transition-colors whitespace-nowrap">
                {t.nav_contact}
              </a>
            </div>
          </div>
        </nav>

        {/* ============================================= */}
        {/* 2. URGENCY BAR */}
        {/* ============================================= */}
        <div className="bg-gradient-to-r from-[#1a0a2e] via-[#2d1854] to-[#1a0a2e] py-2.5 sm:py-3">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
            <span className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider flex-shrink-0">
              {t.urgency_badge}
            </span>
            <p className="text-white/80 text-xs sm:text-sm">{t.urgency_text}</p>
          </div>
        </div>

        {/* ============================================= */}
        {/* 3. HERO */}
        {/* ============================================= */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#051c2c]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(0,169,244,0.08)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(124,58,237,0.06)_0%,transparent_50%)]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-20 lg:pt-28 pb-14 sm:pb-24">
            <div className="max-w-3xl">
              {/* Eyebrow pill */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 mb-6 sm:mb-10">
                <span className="text-[#00a9f4] text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase">{t.hero_eyebrow}</span>
              </div>

              {/* H1 */}
              <h1 className="font-serif-heading text-2xl sm:text-4xl lg:text-[2.75rem] text-white leading-[1.4] sm:leading-[1.35] mb-5 sm:mb-8 font-bold">
                {t.hero_h1_plain}{' '}
                <span className="text-[#00a9f4]">{t.hero_h1_highlight}</span>
              </h1>

              {/* Sub */}
              <p className="text-sm sm:text-lg text-white/70 mb-3 sm:mb-4 leading-relaxed max-w-2xl">
                {t.hero_sub} <strong className="text-white font-semibold">{t.hero_sub_bold}</strong>
              </p>

              {/* Date note */}
              <p className="text-sm font-semibold text-amber-400 mb-6 sm:mb-10">
                {t.hero_date_note}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-16">
                <Link href={`/lp/eu-compliance/assessment/${locale}`} className="bg-[#00a9f4] hover:bg-[#0090d0] text-white font-semibold text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-8 inline-flex items-center justify-center gap-2 sm:gap-3 transition-colors group">
                  {t.hero_cta_primary}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a href="/AiWorkFluencyPitch.pdf" target="_blank" rel="noopener noreferrer" className="border border-white/30 text-white font-semibold text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-8 inline-flex items-center justify-center gap-2 sm:gap-3 hover:bg-white/5 transition-colors">
                  <Download className="w-4 h-4" />
                  {t.hero_cta_secondary}
                </a>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-white/10 pt-8">
                {[
                  { value: t.stat_1_value, label: t.stat_1_label },
                  { value: t.stat_2_value, label: t.stat_2_label },
                  { value: t.stat_3_value, label: t.stat_3_label },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl sm:text-3xl font-bold text-white font-serif-heading">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* 4. SEGMENT SECTION */}
        {/* ============================================= */}
        <section className="py-12 sm:py-20 bg-[#f7f7f7]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">{isHu ? 'Célcsoportok' : 'Segments'}</span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#051c2c] font-bold">{t.segment_label}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { size: t.segment_1_size, title: t.segment_1_title, desc: t.segment_1_desc, icon: Building2 },
                { size: t.segment_2_size, title: t.segment_2_title, desc: t.segment_2_desc, icon: Users },
              ].map((card, i) => (
                <a key={i} href="#kapcsolat" className="bg-white border border-gray-200 p-6 sm:p-8 hover:shadow-md hover:border-[#00a9f4]/30 transition-all group block">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#051c2c] flex items-center justify-center flex-shrink-0">
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-[#00a9f4]">{card.size}</span>
                  </div>
                  <h3 className="font-serif-heading text-lg sm:text-xl text-[#051c2c] font-bold mb-3">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{card.desc}</p>
                  <span className="text-sm font-semibold text-[#00a9f4] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t.nav_contact}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* 5. PROBLEMS SECTION */}
        {/* ============================================= */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">{t.problems_tag}</span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-4xl text-[#051c2c] mb-4 font-bold">{t.problems_h2}</h2>
              <p className="text-base text-gray-500 max-w-2xl">{t.problems_lead}</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { num: '01', tag: t.problem_1_tag, tagColor: 'bg-amber-500', title: t.problem_1_title, desc: t.problem_1_desc },
                { num: '02', tag: t.problem_2_tag, tagColor: 'bg-red-500', title: t.problem_2_title, desc: t.problem_2_desc },
                { num: '03', tag: t.problem_3_tag, tagColor: 'bg-[#00a9f4]', title: t.problem_3_title, desc: t.problem_3_desc },
              ].map((item, i) => (
                <div key={i} className="relative border border-gray-200 p-6 sm:p-8">
                  {/* Large faded number */}
                  <div className="absolute top-4 right-4 text-6xl sm:text-7xl font-bold text-gray-100 font-serif-heading select-none">{item.num}</div>
                  <div className="relative">
                    <span className={`${item.tagColor} text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider inline-block mb-4`}>
                      {item.tag}
                    </span>
                    <h3 className="font-serif-heading text-lg text-[#051c2c] font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* 6. SOLUTION SECTION */}
        {/* ============================================= */}
        <section id="megoldas" className="py-12 sm:py-20 bg-[#051c2c]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#00a9f4]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00a9f4]/70">{t.solution_tag}</span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-4xl text-white mb-4 font-bold">{t.solution_h2}</h2>
              <p className="text-base text-white/50 max-w-2xl">{t.solution_lead}</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { number: t.solution_1_number, title: t.solution_1_title, items: t.solution_1_items, color: 'bg-[#00a9f4]' },
                { number: t.solution_2_number, title: t.solution_2_title, items: t.solution_2_items, color: 'bg-[#7c3aed]' },
                { number: t.solution_3_number, title: t.solution_3_title, items: t.solution_3_items, color: 'bg-[#10b981]' },
              ].map((card, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 sm:p-8">
                  <div className={`${card.color} w-10 h-10 flex items-center justify-center mb-5`}>
                    <span className="text-white font-bold text-sm">{card.number}</span>
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-4">{card.title}</h3>
                  <ul className="space-y-3">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/60">
                        <CheckCircle className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* 7. PROCESS SECTION */}
        {/* ============================================= */}
        <section id="folyamat" className="py-12 sm:py-20 bg-[#f7f7f7]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">{t.process_tag}</span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-4xl text-[#051c2c] font-bold">{t.process_h2}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
              {/* Connecting line (desktop only) */}
              <div className="hidden sm:block absolute top-[28px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-[2px] bg-gray-200" />
              {[
                { week: t.process_1_week, title: t.process_1_title, desc: t.process_1_desc, borderColor: 'border-[#00a9f4]' },
                { week: t.process_2_week, title: t.process_2_title, desc: t.process_2_desc, borderColor: 'border-[#7c3aed]' },
                { week: t.process_3_week, title: t.process_3_title, desc: t.process_3_desc, borderColor: 'border-amber-500' },
                { week: t.process_4_week, title: t.process_4_title, desc: t.process_4_desc, borderColor: 'border-[#10b981]' },
              ].map((step, i) => (
                <div key={i} className="relative text-center sm:text-left">
                  <div className={`w-14 h-14 border-2 ${step.borderColor} flex items-center justify-center mx-auto sm:mx-0 mb-4 bg-[#f7f7f7] relative z-10`}>
                    <span className="text-[#051c2c] font-bold text-sm">{i + 1}</span>
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#051c2c]/40 mb-2">{step.week}</div>
                  <h3 className="font-semibold text-[#051c2c] mb-2 text-sm">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* 8. NUMBERS BAND */}
        {/* ============================================= */}
        <section className="py-8 sm:py-12 bg-[#00a9f4]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
              {[
                { value: t.numbers_1_value, label: t.numbers_1_label },
                { value: t.numbers_2_value, label: t.numbers_2_label },
                { value: t.numbers_3_value, label: t.numbers_3_label },
                { value: t.numbers_4_value, label: t.numbers_4_label },
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-xl sm:text-2xl font-bold text-white font-serif-heading">{item.value}</div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* 9. RISK CALCULATOR SECTION */}
        {/* ============================================= */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[#051c2c]" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">{t.risk_tag}</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 items-start">
              {/* Left: big number + context */}
              <div>
                <div className="text-5xl sm:text-7xl font-bold text-red-600 font-serif-heading mb-2">{t.risk_h2}</div>
                <div className="text-lg sm:text-xl text-[#051c2c] font-semibold mb-4">{t.risk_sub}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{t.risk_desc}</p>
              </div>
              {/* Right: calculator */}
              <div>
                <RiskCalculator locale={locale} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* 10. PRICING SECTION */}
        {/* ============================================= */}
        <section id="arak" className="py-12 sm:py-20 bg-[#f7f7f7]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">{t.pricing_tag}</span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-4xl text-[#051c2c] font-bold">{t.pricing_h2}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Starter */}
              <div className="bg-white border border-gray-200 p-8">
                <div className="font-semibold text-base text-[#051c2c] mb-1">{t.pricing_1_name}</div>
                <div className="text-sm text-gray-400 mb-5">{t.pricing_1_desc}</div>
                <div className="text-3xl font-bold text-[#051c2c] mb-1 font-serif-heading">{t.pricing_1_price}</div>
                <div className="text-sm text-gray-400 mb-6">{t.pricing_1_period}</div>
                <div className="space-y-3 text-sm mb-8">
                  {t.pricing_1_features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#00a9f4] flex-shrink-0 mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href={`/lp/eu-compliance/assessment/${locale}`} className="block w-full text-center border-2 border-[#051c2c] text-[#051c2c] hover:bg-[#051c2c] hover:text-white font-semibold py-3 transition-colors text-sm">
                  {t.pricing_1_cta}
                </Link>
              </div>
              {/* Professional */}
              <div className="p-8 relative bg-white border border-gray-200">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00a9f4]" />
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-base text-[#051c2c]">{t.pricing_2_name}</span>
                  <span className="bg-[#051c2c] text-white text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider">{t.pricing_popular}</span>
                </div>
                <div className="text-sm text-gray-400 mb-5">{t.pricing_2_desc}</div>
                <div className="text-3xl font-bold text-[#051c2c] mb-1 font-serif-heading">{t.pricing_2_price}</div>
                <div className="text-sm text-gray-400 mb-6">{t.pricing_2_period}</div>
                <div className="space-y-3 text-sm mb-8">
                  {t.pricing_2_features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#00a9f4] flex-shrink-0 mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href={`/lp/eu-compliance/assessment/${locale}`} className="block w-full text-center bg-[#051c2c] hover:bg-[#0a3152] text-white font-semibold py-3 transition-colors text-sm">
                  {t.pricing_2_cta}
                </Link>
              </div>
            </div>
            {/* Explainer box */}
            <div className="mt-10 bg-white border border-gray-200 p-6 sm:p-8">
              <h3 className="font-serif-heading text-lg sm:text-xl text-[#051c2c] font-bold mb-3">{t.pricing_explainer_title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t.pricing_explainer_text}</p>
            </div>
            <p className="text-center text-sm text-gray-400 mt-6">{t.pricing_note}</p>
          </div>
        </section>

        {/* ============================================= */}
        {/* 11. FAQ SECTION */}
        {/* ============================================= */}
        <section id="gyik" className="py-12 sm:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">{t.faq_tag}</span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#051c2c] font-bold">{t.faq_h2}</h2>
            </div>
            <FaqAccordion items={t.faq_items} />
          </div>
        </section>

        {/* ============================================= */}
        {/* 12. DUAL CTA SECTION */}
        {/* ============================================= */}
        <section id="kapcsolat" className="py-12 sm:py-20 bg-[#051c2c]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="font-serif-heading text-2xl sm:text-4xl text-white mb-4 font-bold">{t.cta_h2}</h2>
              <p className="text-base text-white/50">{t.cta_sub}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mb-10 sm:mb-14">
              {/* KKV card */}
              <div className="bg-amber-500/10 border border-amber-500/20 p-6 sm:p-8">
                <h3 className="font-serif-heading text-lg text-white font-bold mb-3">{t.cta_kkv_title}</h3>
                <p className="text-sm text-white/60 mb-5">{t.cta_kkv_desc}</p>
                <a href={`tel:${t.cta_kkv_phone.replace(/\s/g, '')}`} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-3 px-6 inline-flex items-center gap-2 transition-colors mb-4">
                  <Phone className="w-4 h-4" />
                  {t.cta_kkv_cta}
                </a>
                <div className="text-sm text-white/40">
                  <span className="text-white/60 font-semibold">{t.cta_kkv_phone}</span>
                  <br />
                  {t.cta_kkv_person}
                </div>
              </div>
              {/* Enterprise card */}
              <div className="bg-[#00a9f4]/10 border border-[#00a9f4]/20 p-6 sm:p-8">
                <h3 className="font-serif-heading text-lg text-white font-bold mb-3">{t.cta_enterprise_title}</h3>
                <p className="text-sm text-white/60 mb-5">{t.cta_enterprise_desc}</p>
                <a href="/AiWorkFluencyPitch.pdf" target="_blank" rel="noopener noreferrer" className="bg-[#00a9f4] hover:bg-[#0090d0] text-white font-semibold text-sm py-3 px-6 inline-flex items-center gap-2 transition-colors mb-4">
                  <Download className="w-4 h-4" />
                  {t.cta_enterprise_cta}
                </a>
                <div className="text-sm text-white/40">
                  {t.cta_enterprise_email_label}
                  <br />
                  <a href={`mailto:${t.cta_enterprise_email}`} className="text-[#00a9f4] hover:underline">{t.cta_enterprise_email}</a>
                </div>
              </div>
            </div>
            {/* Callback form */}
            <div className="max-w-2xl mx-auto">
              <CallbackForm locale={locale} />
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* 13. FOOTER */}
        {/* ============================================= */}
        <footer className="bg-[#031018] text-white/40 py-6 sm:py-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border border-white/20 flex items-center justify-center">
                  <span className="text-white/60 font-bold text-[8px]">AWF</span>
                </div>
                <p className="text-white/40">{t.footer}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-white/50">
                <span>{t.footer_company}</span>
                <span className="hidden sm:inline">|</span>
                <span>{t.footer_phone}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm mb-6">
              <div />
              <div className="flex gap-6">
                <Link href={`/${locale}`} className="hover:text-white transition-colors">{t.footer_home}</Link>
                <Link href="/rolunk" className="hover:text-white transition-colors">{isHu ? 'Rólunk' : 'About'}</Link>
                <Link href={`/eu-ai-act/${locale}`} className="hover:text-white transition-colors">EU AI Act</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">{t.footer_privacy}</Link>
                <Link href="/terms" className="hover:text-white transition-colors">{t.footer_terms}</Link>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-[10px] text-white/25 leading-relaxed">{t.footer_legal}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
