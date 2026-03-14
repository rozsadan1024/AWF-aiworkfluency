import Link from 'next/link';
import { ArrowRight, CheckCircle, AlertTriangle, Clock, Shield, FileText, Users, BarChart3, BookOpen, Scale, Building2, CalendarClock, ShieldCheck, ClipboardCheck, EyeOff, Phone, Mail, X, Layers, Award, Briefcase, Search } from 'lucide-react';
import { locales, type Locale } from '@/lib/i18n/dictionaries';
import ContactFormSection from './ContactFormSection';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  en: {
    // Nav
    nav_contact: 'Contact',

    // Hero
    hero_eyebrow: 'EU AI ACT — ARTICLE 4 ALREADY IN EFFECT',
    hero_deadline_label: 'Enforcement starts',
    hero_deadline: 'August 2, 2026',
    hero_h1_1: 'Your Company Is',
    hero_h1_2: 'Already Required to Act.',
    hero_h1_3: 'Are You Ready?',
    hero_sub: 'The EU AI Act\'s AI literacy obligation has been <strong>in effect since February 2, 2025</strong>. Every company using AI must ensure its employees have adequate AI literacy. From August 2026, national authorities can launch investigations and impose fines up to <strong>\u20ac35 million or 7% of annual turnover</strong>.',
    hero_cta: 'Get a Free Compliance Assessment',
    hero_cta_sub: '5 minutes. No obligation. Full visibility into your company\'s AI risks.',

    // Shadow AI warning
    shadow_h2: 'Even If Your Employees Use AI in Secret, Your Company Is Liable.',
    shadow_desc: 'Studies show that over 50% of employees already use AI tools at work — often without their employer\'s knowledge. Under the EU AI Act, it doesn\'t matter whether AI use is official or unofficial: <strong>the organization bears responsibility</strong> for ensuring AI literacy.',
    shadow_emphasis: 'Policy is not enough. Training is not enough. Only documented, role-specific literacy counts.',

    // Why us
    why_h2: 'You Don\'t Just Get Training. You Get Complete Protection.',
    why_sub: 'AI literacy is just the first step. We guide you through the entire EU AI Act compliance journey.',
    why_1_title: 'Article 4 Expertise',
    why_1_desc: 'AI literacy compliance is our specialty. We know exactly what authorities expect: not theoretical exams, but role-specific, continuously documented competencies.',
    why_2_title: 'Governance Documentation',
    why_2_desc: 'We go further: we help you build the complete AI governance framework. Policies, risk management, registries — everything you can present during a regulatory audit.',
    why_3_title: 'Legal & Practical Background',
    why_3_desc: 'We\'re not just trainers. We understand the legal traps in every article and the challenges of daily operations. We build at the intersection of both.',
    why_4_title: 'Audit-Preparatory Documentation',
    why_4_desc: 'Authorities won\'t take your word for it. We generate an audit-preparatory report package at the push of a button — covering training, governance documents, and the complete compliance history.',

    // What the law says
    law_h2: 'Article 4 Is Just the Beginning. Here\'s How Full Compliance Works.',
    law_sub: 'Article 4 of the EU AI Act mandates AI literacy for all organizations deploying or using AI systems. This obligation has been applicable since February 2, 2025.',
    law_1_title: 'AI Literacy Training',
    law_1_desc: 'All employees interacting with AI must receive documented training appropriate to their role and risk exposure.',
    law_2_title: 'Documented Proof',
    law_2_desc: 'Organizations must maintain verifiable records of who was trained, when, on what, and to what standard.',
    law_3_title: 'Ongoing Compliance',
    law_3_desc: 'This isn\'t a one-time checkbox. Training must be kept current as AI systems and regulations evolve.',
    law_4_title: 'Risk-Appropriate',
    law_4_desc: 'Training depth must match the risk level of AI systems used — higher risk means more rigorous requirements.',
    law_extra_h3: 'What We Also Handle for You:',
    law_extra_1_title: 'Governance Framework',
    law_extra_1_desc: 'AI policies, roles and responsibilities design.',
    law_extra_2_title: 'Risk Management System',
    law_extra_2_desc: 'Risk classification and registry of AI tools in use.',
    law_extra_3_title: 'Authority Liaison',
    law_extra_3_desc: 'We stand ready if an investigation is launched.',

    // Risk
    risk_h2: '\u20ac35 Million. Or 7% of Revenue.',
    risk_sub: 'That\'s what it can cost without demonstrable AI literacy and a governance system.',
    risk_1_title: 'Financial Penalties',
    risk_1_desc: 'Fines up to \u20ac35 million or 7% of global annual turnover — whichever is higher.',
    risk_2_title: 'Regulatory Action',
    risk_2_desc: 'National authorities can order suspension of AI system use until compliance is demonstrated.',
    risk_3_title: 'Reputational Damage',
    risk_3_desc: 'Non-compliance becomes public record. Clients, partners, and talent notice.',
    risk_4_title: 'Competitive Disadvantage',
    risk_4_desc: 'Compliant competitors win tenders and partnerships that require EU AI Act alignment.',

    // Solution
    solution_h2: 'One Platform. Two Goals. Full Compliance.',
    solution_sub: 'We build employee AI literacy AND corporate governance systems simultaneously.',
    solution_layer1_title: 'Literacy Training (Article 4)',
    solution_layer1_items: [
      'Role-specific AI literacy program',
      'Practical daily micro-tasks, not slides',
      'Individual competency tracking & certificates',
    ],
    solution_layer2_title: 'Governance System',
    solution_layer2_items: [
      'AI policies & responsibility frameworks',
      'Risk classification of AI tools in use',
      'Internal AI usage registry',
    ],
    solution_layer3_title: 'Audit Package',
    solution_layer3_items: [
      'One-click audit-preparatory report bundle',
      'Complete compliance timeline & evidence',
      'Documentation format structured per AI Act requirements',
    ],

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
    process_h2: '4 Steps to Full Compliance',
    process_1_step: '1',
    process_1_title: 'Assessment',
    process_1_desc: 'We assess your company\'s current AI literacy level, governance maturity, and identify gaps against EU requirements.',
    process_2_step: '2',
    process_2_title: 'Rollout',
    process_2_desc: 'Role-appropriate training paths are activated. Governance documentation is initiated. Each employee gets daily 15-minute AI practice tasks.',
    process_3_step: '3',
    process_3_title: 'Track & Report',
    process_3_desc: 'Real-time dashboard shows progress. Compliance and governance reports are generated automatically.',
    process_4_step: '4',
    process_4_title: 'Certify',
    process_4_desc: 'Upon completion, each employee receives documentation. Your company gets a complete audit-preparatory compliance and governance documentation package.',

    // CTA mid
    mid_cta_h2: 'The Obligation Is Already in Effect. Enforcement Is Coming.',
    mid_cta_button: 'Talk to Our Compliance Team',

    // Pricing
    pricing_h2: 'Choose Your Protection Level',
    pricing_1_name: 'Starter — Training',
    pricing_1_desc: 'Recommended: if your only goal is quick Article 4 AI literacy compliance',
    pricing_1_price: 'HUF 8,000',
    pricing_1_period: '/person',
    pricing_1_features: ['EU AI Act Article 4 compliant training', 'Role-appropriate AI literacy content', 'Individual competency assessment', 'AI literacy training completion record per employee'],
    pricing_1_cta: 'Start Now',
    pricing_2_name: 'Professional — Full Protection',
    pricing_2_desc: 'Complete organizational compliance package with governance',
    pricing_2_price: 'HUF 16,000',
    pricing_2_period: '/person',
    pricing_2_features: ['Everything in Starter', 'Documentation structured per AI Act requirements', 'AI governance framework setup', 'Risk management & AI tool registry', 'Manager dashboard & team reports', 'Department-level compliance tracking', 'Audit-preparatory documentation package', 'Dedicated compliance support'],
    pricing_2_cta: 'Get Started',
    pricing_popular: 'Recommended',
    pricing_note: 'Volume discounts for 100+ employees. Custom enterprise packages available.',

    // FAQ
    faq_h2: 'Answers to the Most Important Questions',
    faq_1_q: 'Does the EU AI Act really apply to my company?',
    faq_1_a: 'If your company operates in the EU and your employees use any AI tools (including ChatGPT, Copilot, Gemini, etc.), then yes — Article 4 applies to you. It doesn\'t matter if the usage is official or unofficial.',
    faq_2_q: 'What\'s the difference between AI literacy training and full compliance?',
    faq_2_a: 'Article 4 mandates AI literacy — that\'s the minimum. But full EU AI Act compliance also requires governance documentation, risk management, and audit-ready evidence. Our Professional package covers all of this.',
    faq_3_q: 'Is an online course enough for compliance?',
    faq_3_a: 'A one-time course alone is unlikely to satisfy requirements. The regulation requires ongoing, documented, role-appropriate training with verifiable competency outcomes — plus governance documentation.',
    faq_4_q: 'How long does it take to get compliant?',
    faq_4_a: 'Most organizations can achieve baseline compliance within 4-8 weeks of starting the program, depending on team size and current AI literacy levels.',
    faq_5_q: 'Can you help if a regulatory investigation starts?',
    faq_5_a: 'Yes. Our Professional package includes regulatory liaison support. We help prepare all documentation, evidence packages, and can assist in communications with authorities.',

    // Final CTA
    cta_h2: 'Enforcement Starts August 2, 2026. The Obligation Is Already in Effect.',
    cta_sub: 'Don\'t wait for the fine. Let us show you where your company stands right now, and exactly what you need for full compliance — from Article 4 to governance.',
    cta_button: 'Free 15-Minute Compliance Assessment',
    cta_sub2: 'No obligation. Complete clarity.',

    // Footer
    footer: '\u00a9 2026 AI Work Fluency. All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_home: 'Main Site',
    footer_company: 'Rebelframes Kft.',
    footer_phone: '+36 1 901 0721',
    footer_legal: 'Legal notice: This service does not constitute legal advice and does not guarantee full regulatory compliance. Ultimate compliance responsibility lies with the organization in all cases.',

    // Contact form
    contact_title: 'Contact Us',
    contact_name: 'Name',
    contact_email: 'Email',
    contact_company: 'Company',
    contact_phone: 'Phone (optional)',
    contact_message: 'Message',
    contact_submit: 'Send Message',
    contact_close: 'Close',
  },
  hu: {
    // Nav
    nav_contact: 'Kapcsolat',

    // Hero
    hero_eyebrow: 'EU AI ACT \u2014 4. CIKK MÁR HATÁLYBAN',
    hero_deadline_label: 'Hatósági kikényszerítés indul',
    hero_deadline: '2026. augusztus 2.',
    hero_h1_1: 'A munkavállalói AI (pl. ChatGPT) használat mostantól a cégvezető felelőssége.',
    hero_h1_2: 'Akkor is, ha a munkavállaló titokban használja.',
    hero_h1_3: '',
    hero_sub: 'Az EU AI Act AI-jártassági kötelezettsége <strong>2025. február 2. óta hatályban van</strong>. Minden AI-t használó vállalatnak biztosítania kell munkavállalói megfelelő AI-jártasságát. 2026 augusztusától a nemzeti hatóságok vizsgálatokat indíthatnak és akár <strong>35 millió eurós vagy az éves árbevétel 7%-ának megfelelő bírságot</strong> szabhatnak ki.',
    hero_cta: 'Ingyenes megfelelőségi felmérés',
    hero_cta_sub: '5 perc. Semmi kötelezettség. Teljes rálátás a cége AI-kockázataira.',

    // Shadow AI warning
    shadow_h2: 'Ha munkatársai titokban használnak AI-t, a felelősség akkor is a cégét terheli.',
    shadow_desc: 'A felmérések szerint a munkavállalók több mint 50%-a már használ AI eszközöket a munkában — gyakran a munkáltatójuk tudta nélkül. Az EU AI Act szerint nem számít, hogy az AI-használat hivatalos vagy nem hivatalos: <strong>a szervezet felel</strong> az AI-jártasság biztosításáért.',
    shadow_emphasis: 'A szabályzat nem elég. A képzés nem elég. Csak a dokumentált, szerepkör-specifikus jártasság számít.',

    // Why us
    why_h2: 'Nem csak oktatást kap. Teljes védelmet.',
    why_sub: 'Az AI-jártasság csak az első lépés. Mi végigkísérjük a teljes EU AI Act megfelelőségi útján.',
    why_1_title: '4. cikk szakértelem',
    why_1_desc: 'Az AI-jártassági kötelezettség a mi specialitásunk. Pontosan tudjuk, mit vár el a hatóság: nem elméleti vizsgát, hanem szerepkör-specifikus, folyamatosan dokumentált készségeket.',
    why_2_title: 'Governance dokumentáció',
    why_2_desc: 'De megyünk tovább: segítünk felépíteni a teljes AI governance keretrendszert. Szabályzatok, kockázatkezelés, nyilvántartások — minden, amit egy hatósági vizsgálatkor felmutathat.',
    why_3_title: 'Jogi és gyakorlati háttér',
    why_3_desc: 'Nem csak oktatók vagyunk. Értjük a rendelet minden cikkének jogi csapdáját és a mindennapi működés kihívásait. A kettő találkozásánál építkezünk.',
    why_4_title: 'Audit-felkészítő dokumentáció',
    why_4_desc: 'A hatóság nem hisz a szavunknak. Mi generálunk Önnek gombnyomásra egy audit-felkészítő riportcsomagot, ami tartalmazza a képzést, a governance dokumentumokat és a megfelelőség teljes történetét.',

    // What the law says
    law_h2: 'A 4. cikk csak a kezdet. Így épül fel a teljes megfelelőség.',
    law_sub: 'Az EU AI Act 4. cikke AI-jártassági képzést ír elő minden AI rendszert használó vagy üzemeltető szervezet számára. Ez a kötelezettség 2025. február 2. óta alkalmazandó.',
    law_1_title: 'AI-jártassági képzés',
    law_1_desc: 'Minden AI-val érintkező munkavállalónak dokumentált, szerepkörének és kockázati szintjének megfelelő képzésben kell részesülnie.',
    law_2_title: 'Dokumentált bizonyítékok',
    law_2_desc: 'A szervezeteknek ellenőrizhető nyilvántartást kell vezetniük arról, hogy kit, mikor, mire és milyen szinten képeztek.',
    law_3_title: 'Folyamatos megfelelőség',
    law_3_desc: 'Ez nem egyszeri pipa. A képzésnek naprakésznek kell lennie, ahogy az AI rendszerek és szabályozások fejlődnek.',
    law_4_title: 'Kockázatarányos',
    law_4_desc: 'A képzés mélységének igazodnia kell a használt AI rendszerek kockázati szintjéhez — magasabb kockázat, szigorúbb követelmények.',
    law_extra_h3: 'Amit még vállalunk Ön helyett:',
    law_extra_1_title: 'Governance keretrendszer',
    law_extra_1_desc: 'AI szabályzatok, felelősségi körök kialakítása.',
    law_extra_2_title: 'Kockázatkezelési rendszer',
    law_extra_2_desc: 'A használt AI eszközök kockázati besorolása és nyilvántartása.',
    law_extra_3_title: 'Hatósági kapcsolattartás',
    law_extra_3_desc: 'Készenlétben állunk, ha vizsgálat indul.',

    // Risk
    risk_h2: '35 millió euró. Vagy az árbevétel 7%-a.',
    risk_sub: 'Ennyibe kerülhet, ha nincs bizonyítható AI-jártassága és governance rendszere.',
    risk_1_title: 'Pénzügyi szankciók',
    risk_1_desc: 'Akár 35 millió eurós vagy a globális éves árbevétel 7%-ának megfelelő bírság — amelyik magasabb.',
    risk_2_title: 'Hatósági intézkedés',
    risk_2_desc: 'A nemzeti hatóságok elrendelhetik az AI rendszerek használatának felfüggesztését a megfelelőség igazolásáig.',
    risk_3_title: 'Reputációs kár',
    risk_3_desc: 'A meg nem felelés nyilvános lesz. Ügyfelek, partnerek és tehetségek észreveszik.',
    risk_4_title: 'Versenyhátány',
    risk_4_desc: 'A megfelelő versenytársak nyerik el azokat a tendereket és partnerségeket, amelyek EU AI Act megfelelőséget követelnek.',

    // Solution
    solution_h2: 'Egy platform. Két cél. Teljes megfelelőség.',
    solution_sub: 'Egyszerre építjük a munkavállalói AI-jártasságot ÉS a céges governance rendszert.',
    solution_layer1_title: 'Jártassági képzés (4. cikk)',
    solution_layer1_items: [
      'Szerepkör-specifikus AI-jártassági program',
      'Gyakorlati napi mikro-feladatok, nem prezentációk',
      'Egyéni kompetenciakövetés és tanúsítványok',
    ],
    solution_layer2_title: 'Governance rendszer',
    solution_layer2_items: [
      'AI szabályzatok és felelősségi keretrendszer',
      'Használt AI eszközök kockázati besorolása',
      'Belső AI-használati nyilvántartás',
    ],
    solution_layer3_title: 'Audit csomag',
    solution_layer3_items: [
      'Gombnyomásra generált audit-felkészítő riportcsomag',
      'Teljes megfelelőségi időszak és bizonyítékok',
      'AI Act követelmények szerint strukturált dokumentációs formátum',
    ],

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
    process_h2: '4 lépésben a teljes megfelelőség felé',
    process_1_step: '1',
    process_1_title: 'Felmérés',
    process_1_desc: 'Felmérjük a cég jelenlegi AI-jártassági szintjét, governance érettségét és azonosítjuk a hiányosságokat az EU követelményekhez képest.',
    process_2_step: '2',
    process_2_title: 'Bevezetés',
    process_2_desc: 'Szerepkör-specifikus képzési útvonalak aktiválása. Governance dokumentáció elindítása. Minden munkavállaló napi 15 perces AI gyakorlófeladatokat kap.',
    process_3_step: '3',
    process_3_title: 'Követés és riportálás',
    process_3_desc: 'Valós idejű dashboard mutatja a haladást. A megfelelőségi és governance riportok automatikusan generálódnak.',
    process_4_step: '4',
    process_4_title: 'Dokumentáció',
    process_4_desc: 'Teljesítéskor minden munkavállaló dokumentációt kap. A cég teljes audit-felkészítő megfelelőségi és governance dokumentációs csomagot kap.',

    // CTA mid
    mid_cta_h2: 'A kötelezettség már él. A kikényszerítés közeleg.',
    mid_cta_button: 'Beszéljen megfelelőségi csapatunkkal',

    // Pricing
    pricing_h2: 'Válassza ki a védelmi szintet',
    pricing_1_name: 'Alap csomag \u2014 Oktatás',
    pricing_1_desc: 'Ajánlott: ha csak a 4. cikk gyors AI-literacy teljesítése a cél',
    pricing_1_price: '8 000 Ft',
    pricing_1_period: '/fő',
    pricing_1_features: ['EU AI Act 4. cikk szerinti képzés', 'Szerepkörre szabott AI-jártassági tartalom', 'Egyéni kompetenciafelmérés', 'AI literacy képzés teljesítési igazolás munkatársanként'],
    pricing_1_cta: 'Kezdés most',
    pricing_2_name: 'Professional csomag \u2014 Teljes védelem',
    pricing_2_desc: 'Teljes szervezeti megfelelőségi csomag governance-szel',
    pricing_2_price: '16 000 Ft',
    pricing_2_period: '/fő',
    pricing_2_features: ['Minden, ami az Alap csomagban', 'AI Act követelmények szerint strukturált dokumentáció', 'AI governance keretrendszer felépítése', 'Kockázatkezelés és AI eszköz-nyilvántartás', 'Vezetői dashboard és csapatriportok', 'Osztályszintű megfelelőség-követés', 'Audit-felkészítő dokumentációs csomag', 'Dedikált megfelelőségi támogatás'],
    pricing_2_cta: 'Indítás',
    pricing_popular: 'Ajánlott',
    pricing_note: '100+ fő felett kedvezményes árazás. Egyedi enterprise csomagok elérhetők.',

    // FAQ
    faq_h2: 'Válaszok a legfontosabb kérdésekre',
    faq_1_q: 'Tényleg vonatkozik ránk az EU AI Act?',
    faq_1_a: 'Ha a cége az EU-ban működik és a munkavállalói bármilyen AI eszközt használnak (beleértve a ChatGPT-t, Copilotot, Geminit stb.), akkor igen — a 4. cikk Önökre is vonatkozik. Nem számít, hogy a használat hivatalos vagy nem.',
    faq_2_q: 'Mi a különbség az AI-jártassági képzés és a teljes megfelelőség között?',
    faq_2_a: 'A 4. cikk az AI-jártasságot írja elő — ez a minimum. De a teljes EU AI Act megfelelőséghez governance dokumentáció, kockázatkezelés és auditálásra kész bizonyítékok is kellenek. A Professional csomagunk mindezt lefedi.',
    faq_3_q: 'Elég egy online kurzus a megfelelőséghez?',
    faq_3_a: 'Egy egyszeri kurzus önmagában valószínűleg nem elégíti ki a követelményeket. A szabályozás folyamatos, dokumentált, szerepkör-specifikus képzést vár el, ellenőrizhető kompetencia-eredményekkel — plusz governance dokumentációt.',
    faq_4_q: 'Mennyi idő alatt érjük el a megfelelőséget?',
    faq_4_a: 'A legtöbb szervezet 4-8 héten belül elérheti az alap megfelelőséget a program elindításától, a csapat méretétől és a jelenlegi AI-jártassági szinttől függően.',
    faq_5_q: 'Segítesz, ha hatósági vizsgálat indul?',
    faq_5_a: 'Igen. A Professional csomagunk tartalmazza a hatósági kapcsolattartási támogatást. Segítünk az összes dokumentáció és bizonyítékcsomag előkészítésében, és támogatjuk a hatósági kommunikációt.',

    // Final CTA
    cta_h2: '2026. augusztus 2-án indulnak a vizsgálatok. A kötelezettség már él.',
    cta_sub: 'Ne várja meg, amíg a bírság jön. Hadd mutassuk meg, hol tart most a cége, és pontosan mire van szüksége a teljes megfeleléshez — a 4. cikktől a governance-ig.',
    cta_button: 'Ingyenes, 15 perces megfelelőségi felmérés',
    cta_sub2: 'Nincs kötelezettség. Teljes tisztánlátás.',

    // Footer
    footer: '\u00a9 2026 AI Work Fluency. Minden jog fenntartva.',
    footer_privacy: 'Adatvédelmi irányelvek',
    footer_terms: 'Felhasználási feltételek',
    footer_home: 'Főoldal',
    footer_company: 'Rebelframes Kft.',
    footer_phone: '+36 1 901 0721',
    footer_legal: 'A szolgáltatás nem minősül jogi tanácsadásnak, és nem garantálja a teljes szabályozási megfelelést. A végső megfelelési felelősség minden esetben a szervezetet terheli.',

    // Contact form
    contact_title: 'Kapcsolat',
    contact_name: 'Név',
    contact_email: 'Email',
    contact_company: 'Cég',
    contact_phone: 'Telefon (opcionális)',
    contact_message: 'Üzenet',
    contact_submit: 'Üzenet küldése',
    contact_close: 'Bezárás',
  },
} as const;

export default function EuComplianceLandingPageV2({ params }: { params: { locale: string } }) {
  const locale = (params.locale === 'hu' ? 'hu' : 'en') as keyof typeof copy;
  const t = copy[locale];
  const isHu = locale === 'hu';

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
        {/* Nav — dark navy, McKinsey-style */}
        <nav className="bg-[#051c2c] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            <Link href={`/lp/eu-compliance/v2/${locale}`} className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-white/80 flex items-center justify-center">
                <span className="text-white font-bold text-[10px] sm:text-xs tracking-tight">AWF</span>
              </div>
              <span className="text-sm sm:text-[15px] font-semibold text-white tracking-wide hidden xs:inline">AI Work Fluency</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex gap-0.5 text-xs border border-white/20 rounded overflow-hidden">
                {locales.map((l) => (
                  <Link key={l} href={`/lp/eu-compliance/v2/${l}`} className={`px-2 sm:px-2.5 py-1 transition-colors ${l === locale ? 'bg-white text-[#051c2c]' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                    {l.toUpperCase()}
                  </Link>
                ))}
              </div>
              <a href="#contact" className="hidden sm:inline-flex border border-white/30 text-white font-semibold text-sm py-2 px-5 hover:bg-white/10 transition-colors">
                {t.nav_contact}
              </a>
              <Link href={`/lp/eu-compliance/assessment/${locale}`} className="bg-white text-[#051c2c] font-semibold text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-5 hover:bg-gray-100 transition-colors whitespace-nowrap">
                {isHu ? 'Felmérés' : 'Assessment'}
              </Link>
            </div>
          </div>
        </nav>

        {/* HERO — clean, editorial */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#051c2c]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#051c2c_0%,#0a3152_50%,#051c2c_100%)]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-20 lg:pt-28 pb-14 sm:pb-24">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-10">
                <div className="w-8 sm:w-12 h-[2px] bg-[#00a9f4]" />
                <span className="text-[#00a9f4] text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase">{t.hero_eyebrow}</span>
              </div>

              {/* Deadline indicator */}
              <div className="mb-5 sm:mb-10 flex items-center gap-4">
                <div className="border border-white/15 px-3 sm:px-5 py-2 sm:py-3">
                  <span className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider block mb-0.5">{t.hero_deadline_label}</span>
                  <span className="text-base sm:text-lg font-semibold text-white">{t.hero_deadline}</span>
                </div>
              </div>

              {isHu ? (
                <h1 className="font-serif-heading text-2xl sm:text-4xl lg:text-[2.75rem] text-white leading-[1.5] mb-5 sm:mb-8 font-bold">
                  {t.hero_h1_1}<br />
                  <span className="text-[#00a9f4]">{t.hero_h1_2}</span>
                </h1>
              ) : (
                <h1 className="font-serif-heading text-2xl sm:text-5xl lg:text-6xl text-white leading-[1.5] mb-5 sm:mb-8 font-bold">
                  {t.hero_h1_1}{' '}
                  <span className="text-[#00a9f4]">{t.hero_h1_2}</span><br />
                  {t.hero_h1_3}
                </h1>
              )}
              <p className="text-sm sm:text-lg text-white/70 mb-6 sm:mb-10 leading-relaxed max-w-2xl [&_strong]:text-white [&_strong]:font-semibold" dangerouslySetInnerHTML={{ __html: t.hero_sub }} />
              <Link href={`/lp/eu-compliance/assessment/${locale}`} className="bg-[#00a9f4] hover:bg-[#0090d0] text-white font-semibold text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-8 inline-flex items-center gap-2 sm:gap-3 transition-colors group">
                {t.hero_cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <p className="text-xs sm:text-sm text-white/40 mt-3 sm:mt-4">{t.hero_cta_sub}</p>
            </div>
          </div>
        </section>

        {/* SHADOW AI WARNING — subtle dark band */}
        <section className="py-8 sm:py-10 bg-[#0a1628] border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-12 h-12 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <EyeOff className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="font-serif-heading text-lg sm:text-xl text-white mb-3 font-bold">{t.shadow_h2}</h2>
                <p className="text-sm text-white/50 leading-relaxed mb-4 [&_strong]:text-white/80 [&_strong]:font-semibold" dangerouslySetInnerHTML={{ __html: t.shadow_desc }} />
                <p className="text-sm text-amber-400 font-semibold">{t.shadow_emphasis}</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY US — 4 columns */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">{isHu ? 'Miért mi?' : 'Why Us?'}</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#051c2c] mb-4 font-bold">{t.why_h2}</h2>
              <p className="text-base text-gray-500 max-w-2xl">{t.why_sub}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t.why_1_title, desc: t.why_1_desc, icon: Award },
                { title: t.why_2_title, desc: t.why_2_desc, icon: FileText },
                { title: t.why_3_title, desc: t.why_3_desc, icon: Scale },
                { title: t.why_4_title, desc: t.why_4_desc, icon: ClipboardCheck },
              ].map((item, i) => (
                <div key={i} className="border border-gray-200 p-6 hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 bg-[#051c2c] flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#051c2c] mb-2 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT THE LAW SAYS — clean white with thin borders */}
        <section className="py-12 sm:py-20 bg-[#f7f7f7]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">Regulatory Requirements</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#051c2c] mb-4 font-bold">{t.law_h2}</h2>
              <p className="text-base text-gray-500 max-w-2xl">{t.law_sub}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-px bg-gray-200">
              {[
                { title: t.law_1_title, desc: t.law_1_desc, icon: BookOpen },
                { title: t.law_2_title, desc: t.law_2_desc, icon: FileText },
                { title: t.law_3_title, desc: t.law_3_desc, icon: CalendarClock },
                { title: t.law_4_title, desc: t.law_4_desc, icon: ShieldCheck },
              ].map((item, i) => (
                <div key={i} className="bg-[#f7f7f7] p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon className="w-5 h-5 text-[#051c2c]/40" />
                    <h3 className="font-semibold text-[#051c2c]">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Extra governance items */}
            <div className="mt-12">
              <h3 className="font-serif-heading text-xl text-[#051c2c] mb-6 font-bold">{t.law_extra_h3}</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { title: t.law_extra_1_title, desc: t.law_extra_1_desc, icon: Building2 },
                  { title: t.law_extra_2_title, desc: t.law_extra_2_desc, icon: BarChart3 },
                  { title: t.law_extra_3_title, desc: t.law_extra_3_desc, icon: Shield },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="w-4 h-4 text-[#00a9f4]" />
                      <h4 className="font-semibold text-[#051c2c] text-sm">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RISK — dark section with structured grid */}
        <section className="py-12 sm:py-20 bg-[#051c2c]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-red-400" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-red-400/70">Risk Assessment</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-white mb-4 font-bold">{t.risk_h2}</h2>
              <p className="text-base text-white/50 max-w-2xl">{t.risk_sub}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: t.risk_1_title, desc: t.risk_1_desc },
                { title: t.risk_2_title, desc: t.risk_2_desc },
                { title: t.risk_3_title, desc: t.risk_3_desc },
                { title: t.risk_4_title, desc: t.risk_4_desc },
              ].map((item, i) => (
                <div key={i} className="border border-white/10 p-6 hover:border-white/20 transition-colors">
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTION — rewritten with layers + training checklist */}
        <section className="py-12 sm:py-20 bg-[#f7f7f7]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">Our Solution</span>
              </div>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#051c2c] mb-4 font-bold">{t.solution_h2}</h2>
              <p className="text-base text-gray-500 max-w-2xl">{t.solution_sub}</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: 3 layers */}
              <div className="space-y-6">
                {[
                  { title: t.solution_layer1_title, items: t.solution_layer1_items, icon: BookOpen, color: 'bg-[#00a9f4]' },
                  { title: t.solution_layer2_title, items: t.solution_layer2_items, icon: Building2, color: 'bg-[#051c2c]' },
                  { title: t.solution_layer3_title, items: t.solution_layer3_items, icon: ClipboardCheck, color: 'bg-[#051c2c]' },
                ].map((layer, i) => (
                  <div key={i} className="bg-white border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 ${layer.color} flex items-center justify-center`}>
                        <layer.icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-[#051c2c]">{layer.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {layer.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#00a9f4] flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Right: training content checklist */}
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-[2px] bg-[#051c2c]" />
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">{isHu ? 'Képzési tartalom' : 'Training Content'}</span>
                </div>
                <h3 className="font-serif-heading text-xl text-[#051c2c] mb-4 font-bold">{t.included_h2}</h3>
                <p className="text-sm text-gray-500 mb-6">{t.included_sub}</p>
                <div className="space-y-3">
                  {t.included_items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#00a9f4] flex-shrink-0 mt-0.5" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-[#f7f7f7] border border-gray-200 p-4">
                  <p className="text-xs text-gray-500">{t.included_note}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS — horizontal steps with line */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">Process</span>
              </div>
              <h2 className="font-serif-heading text-3xl text-[#051c2c] font-bold">{t.process_h2}</h2>
            </div>
            <div className="grid sm:grid-cols-4 gap-8 relative">
              {/* Connecting line */}
              <div className="hidden sm:block absolute top-5 left-[12.5%] right-[12.5%] h-[1px] bg-[#051c2c]/15" />
              {[
                { step: t.process_1_step, title: t.process_1_title, desc: t.process_1_desc },
                { step: t.process_2_step, title: t.process_2_title, desc: t.process_2_desc },
                { step: t.process_3_step, title: t.process_3_title, desc: t.process_3_desc },
                { step: t.process_4_step, title: t.process_4_title, desc: t.process_4_desc },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="w-10 h-10 bg-[#051c2c] text-white font-semibold text-sm flex items-center justify-center mb-5 relative z-10">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-[#051c2c] mb-2 text-sm uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MID CTA — understated */}
        <section className="py-10 sm:py-16 bg-[#051c2c]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-serif-heading text-2xl sm:text-3xl text-white mb-8 font-bold">{t.mid_cta_h2}</h2>
            <a href="#contact" className="bg-white hover:bg-gray-100 text-[#051c2c] font-semibold text-base py-3.5 px-10 inline-flex items-center gap-3 transition-colors group">
              {t.mid_cta_button}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </section>

        {/* PRICING — refined cards */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-14">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">Packages</span>
                <div className="w-10 h-[2px] bg-[#051c2c]" />
              </div>
              <h2 className="font-serif-heading text-3xl text-[#051c2c] text-center font-bold">{t.pricing_h2}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-0 max-w-2xl mx-auto border border-gray-200">
              {/* Starter */}
              <div className="p-8 border-b sm:border-b-0 sm:border-r border-gray-200">
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
                <a href="#contact" className="block w-full text-center border border-[#051c2c] text-[#051c2c] hover:bg-[#051c2c] hover:text-white font-semibold py-3 transition-colors text-sm">
                  {t.pricing_1_cta}
                </a>
              </div>
              {/* Professional */}
              <div className="p-8 relative bg-[#fafbfc]">
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
                <a href="#contact" className="block w-full text-center bg-[#051c2c] hover:bg-[#0a3152] text-white font-semibold py-3 transition-colors text-sm">
                  {t.pricing_2_cta}
                </a>
              </div>
            </div>
            <p className="text-center text-sm text-gray-400 mt-6">{t.pricing_note}</p>
          </div>
        </section>

        {/* FAQ — editorial style, no boxes */}
        <section className="py-12 sm:py-20 bg-[#f7f7f7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-[#051c2c]" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#051c2c]/50">FAQ</span>
              </div>
              <h2 className="font-serif-heading text-3xl text-[#051c2c] font-bold">{t.faq_h2}</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {[
                { q: t.faq_1_q, a: t.faq_1_a },
                { q: t.faq_2_q, a: t.faq_2_a },
                { q: t.faq_3_q, a: t.faq_3_a },
                { q: t.faq_4_q, a: t.faq_4_a },
                { q: t.faq_5_q, a: t.faq_5_a },
              ].map((item, i) => (
                <div key={i} className="py-6">
                  <h3 className="font-semibold text-[#051c2c] mb-2">{item.q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA — clean, dark */}
        <section className="py-14 sm:py-24 bg-[#051c2c]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-white mb-6 leading-tight font-bold">{t.cta_h2}</h2>
            <p className="text-base text-white/50 mb-10 max-w-xl mx-auto">{t.cta_sub}</p>
            <Link href={`/lp/eu-compliance/assessment/${locale}`} className="bg-[#00a9f4] hover:bg-[#0090d0] text-white font-semibold text-base py-3.5 px-10 inline-flex items-center gap-3 transition-colors group">
              {t.cta_button}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-white/30 mt-4 text-sm">{t.cta_sub2}</p>
          </div>
        </section>

        {/* CONTACT FORM — inline section */}
        <ContactFormSection
          title={t.contact_title}
          nameLabel={t.contact_name}
          emailLabel={t.contact_email}
          companyLabel={t.contact_company}
          phoneLabel={t.contact_phone}
          messageLabel={t.contact_message}
          submitLabel={t.contact_submit}
        />

        {/* Footer — minimal, refined */}
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
