export type Locale = 'en' | 'hu';

export const defaultLocale: Locale = 'hu';
export const locales: Locale[] = ['en', 'hu'];

export const dictionaries: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    nav_brand: 'AI Work Fluency',
    nav_companies: 'For Companies',
    nav_how: 'How It Works',
    nav_pricing: 'Pricing',
    nav_individual: 'For Individuals',
    nav_demo: 'Book a Demo',
    nav_try: 'Try It Now',
    nav_login: 'Log in',

    // Hero
    hero_h1: 'Make AI your team\'s unfair advantage.',
    hero_sub: 'An ultra-specialized private AI coach for every employee — real-world tasks created just for them, fluency you can actually measure.',
    hero_cta: 'Try It Yourself — Free',
    hero_cta_demo: 'Book a Demo',
    hero_cta_sub: 'See what your employees would practice. No signup required.',

    // Problem
    problem_h2: 'The Problem with Generic AI Training',
    problem_1_title: 'Same course for everyone',
    problem_1_desc: 'Your marketing manager and your HR coordinator get the same "Introduction to AI" module. Neither learns anything useful.',
    problem_2_title: 'Theory, not practice',
    problem_2_desc: 'Employees watch videos and pass quizzes. Then they go back to work and use AI exactly the same way as before.',
    problem_3_title: 'No measurable outcomes',
    problem_3_desc: 'You spent \u20AC10k on training. Can you measure if your team actually got faster? No.',

    // Solution
    solution_h2: 'How AI Work Fluency Is Different',
    solution_sub: 'Every employee gets tasks generated for THEIR role. A marketing manager practices campaign strategy. An HR coordinator practices onboarding workflows. Same platform. Completely different training.',
    solution_input_title: 'Each employee tells us:',
    solution_input_1: 'Their job title and actual responsibilities',
    solution_input_2: 'The tools they use every day',
    solution_input_3: 'Their industry and company size',
    solution_output_title: 'We generate:',
    solution_output_desc: 'Practice scenarios that feel like they came from their boss \u2014 not a textbook. Every task is unique. Every task is relevant.',

    // Examples
    examples_h2: 'Same Job Title. Different Company. Unique Tasks.',
    examples_sub: 'See how the same role gets completely different training based on context.',
    examples_tagline: 'No other platform does this.',
    examples_mm1_role: 'Marketing Manager',
    examples_mm1_context: 'SaaS Startup, 25 employees',
    examples_mm1_task: '"Your CEO wants to cut the paid ads budget by 30% but maintain lead volume. Draft a reallocation plan: which channels to pause, which to double down on, and a content strategy to fill the gap."',
    examples_mm2_role: 'Marketing Manager',
    examples_mm2_context: 'Fortune 500 Manufacturing',
    examples_mm2_task: '"Sales is complaining that marketing leads aren\'t qualified. Your CMO wants a joint presentation: current lead scoring criteria, proposed changes, and a 90-day implementation plan."',
    examples_hr_role: 'HR Coordinator',
    examples_hr_context: '80-person Remote Tech Startup',
    examples_hr_task: '"A new engineer starts Monday in APAC timezone. Create their full onboarding schedule, coordinate IT for laptop shipping, draft the welcome Slack message, and set up first 1:1s."',
    examples_pm_role: 'Project Manager',
    examples_pm_context: 'Regional Construction Firm',
    examples_pm_task: '"A subcontractor missed the electrical deadline by 3 days. Draft an email to the client explaining the delay, update the Procore timeline, and propose a recovery plan."',
    examples_sl1_role: 'Sales Lead',
    examples_sl1_context: 'B2B SaaS, Mid-Market',
    examples_sl1_task: '"Your AE has a $120k deal stuck in legal review for 6 weeks. Draft a Slack message with 3 tactical moves to unstick it, then write the follow-up email to the prospect\'s VP."',
    examples_sl2_role: 'Sales Lead',
    examples_sl2_context: 'Enterprise SaaS, Fortune 1000',
    examples_sl2_task: '"A $2M deal is at risk \u2014 their new CTO wants to re-evaluate all vendors. You have one 15-minute call. Draft the deck outline (5 slides), prep 3 objection responses."',

    // For Companies
    companies_h2: 'Why Companies Choose AI Work Fluency',
    companies_1_title: 'Real productivity gains',
    companies_1_desc: 'Employees practice on tasks that mirror their actual work. Skills transfer immediately \u2014 not after watching 10 hours of video.',
    companies_2_title: 'Manager dashboard',
    companies_2_desc: 'See which employees are improving, who needs help, and where the team\'s AI skills stand. Real data, not participation certificates.',
    companies_3_title: 'Measurable ROI',
    companies_3_desc: 'Track time-to-completion improvements per employee. Know exactly what your training investment delivers.',
    companies_4_title: 'EU AI Act ready',
    companies_4_desc: 'AI literacy training is becoming mandatory. We make your team compliant while actually making them better.',

    // How It Works
    how_h2: 'How It Works',
    how_manager_title: 'For You (the Manager)',
    how_manager_1: 'Enroll your team in 5 minutes',
    how_manager_2: 'Each employee fills out their role profile',
    how_manager_3: 'Track progress on your dashboard',
    how_manager_4: 'See improvement metrics after 30 days',
    how_employee_title: 'For Your Employees',
    how_employee_1: 'Get a practice task based on their actual job',
    how_employee_2: 'Solve it using any AI tools',
    how_employee_3: 'Get scored on 5 dimensions',
    how_employee_4: 'See how an expert would have done it',

    // Pricing
    pricing_h2: 'Simple Per-Seat Pricing',
    pricing_pilot: '',
    pricing_pilot_desc: '',
    pricing_starter: 'Starter',
    pricing_starter_seats: 'Up to 25 seats',
    pricing_growth: 'Growth',
    pricing_growth_seats: 'Up to 50 seats',
    pricing_enterprise: 'Enterprise',
    pricing_enterprise_seats: '50+ seats',
    pricing_per_seat: '/seat/month',
    pricing_custom: 'Custom',
    pricing_annual: 'Annual billing. Monthly available at +20%.',
    pricing_includes: 'All plans include: personalized tasks, 5-dimension scoring, manager dashboard, progress reports',
    pricing_cta: 'Try It Now',

    // CTA
    cta_h2: 'See it in action. Try it yourself.',
    cta_sub: 'Enter your job title and see what kind of task AI Work Fluency would generate for you. Then imagine that \u2014 for every employee on your team.',
    cta_button: 'Try It Now \u2014 Free',
    cta_demo: 'Or book a 15-minute demo',

    // Footer
    footer_product: 'Product',
    footer_resources: 'Resources',
    footer_company: 'Company',
    footer_legal: 'Legal',
    footer_roi: 'ROI Calculator',
    footer_euai: 'EU AI Act Guide',
    footer_case: 'Case Studies',
    footer_about: 'About',
    footer_contact: 'Contact',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service',
    footer_copy: '\u00A9 2026 AI Work Fluency. All rights reserved.',
  },

  hu: {
    // Nav
    nav_brand: 'AI Work Fluency',
    nav_companies: 'C\u00E9geknek',
    nav_how: 'Hogyan m\u0171k\u00F6dik',
    nav_pricing: '\u00C1raz\u00E1s',
    nav_individual: 'Egy\u00E9ni felhaszn\u00E1l\u00F3knak',
    nav_demo: 'Demo foglal\u00E1s',
    nav_try: 'Pr\u00F3b\u00E1ld ki most',
    nav_login: 'Bejelentkez\u00E9s',

    // Hero
    hero_h1: 'Tedd az AI-t a csapatod titkos fegyver\u00E9v\u00E9.',
    hero_sub: 'Ultra-specializ\u00E1lt, priv\u00E1t AI coach minden alkalmazottnak \u2014 val\u00F3s munkahelyi feladatokkal, m\u00E9rhet\u0151 fejl\u0151d\u00E9ssel.',
    hero_cta: 'Pr\u00F3b\u00E1ld ki magad \u2014 Ingyenes',
    hero_cta_demo: 'Demo foglal\u00E1s',
    hero_cta_sub: 'N\u00E9zd meg, mit gyakoroln\u00E1nak az alkalmazottaid. Regisztr\u00E1ci\u00F3 n\u00E9lk\u00FCl.',

    // Problem
    problem_h2: 'Mi a baj az \u00E1ltal\u00E1nos AI tr\u00E9ningekkel?',
    problem_1_title: 'Mindenki ugyanazt kapja',
    problem_1_desc: 'A marketing managered \u00E9s a HR koordin\u00E1torod ugyanazt a "Bevezet\u00E9s az AI-ba" modult kapja. Egyik\u00FCk sem tanul semmi hasznosat.',
    problem_2_title: 'Elm\u00E9let, nem gyakorlat',
    problem_2_desc: 'Az alkalmazottak vide\u00F3kat n\u00E9znek \u00E9s kv\u00EDzeket t\u00F6ltenek ki. Azt\u00E1n vissza\u00FClnek dolgozni \u00E9s pontosan ugyan\u00FAgy haszn\u00E1lj\u00E1k az AI-t, mint el\u0151tte.',
    problem_3_title: 'Nincs m\u00E9rhet\u0151 eredm\u00E9ny',
    problem_3_desc: 'Elk\u00F6lt\u00F6tt\u00E9l 3 milli\u00F3 forintot tr\u00E9ningre. Meg tudod m\u00E9rni, hogy a csapatod t\u00E9nyleg gyorsabb lett? Nem.',

    // Solution
    solution_h2: 'Miben m\u00E1s az AI Work Fluency?',
    solution_sub: 'Minden alkalmazott az \u0150 munkak\u00F6r\u00E9re gener\u00E1lt feladatokat kap. A marketing manager kamp\u00E1nystrat\u00E9gi\u00E1t gyakorol. A HR koordin\u00E1tor onboarding folyamatokat. Ugyanaz a platform. Teljesen m\u00E1s tr\u00E9ning.',
    solution_input_title: 'Minden alkalmazott megadja:',
    solution_input_1: 'A munkak\u00F6r\u00E9t \u00E9s t\u00E9nyleges feladatait',
    solution_input_2: 'A napi eszk\u00F6zeit',
    solution_input_3: 'Az ipar\u00E1gat \u00E9s c\u00E9gm\u00E9retet',
    solution_output_title: 'Mi gener\u00E1lunk:',
    solution_output_desc: 'Gyakorl\u00F3feladatokat, amelyek olyanok, mintha a f\u0151n\u00F6k\u00FCk adta volna \u2014 nem egy tank\u00F6nyvb\u0151l. Minden feladat egyedi. Minden feladat relev\u00E1ns.',

    // Examples
    examples_h2: 'Ugyanaz a poz\u00EDci\u00F3. M\u00E1s c\u00E9g. Egyedi feladat.',
    examples_sub: 'N\u00E9zd meg, hogyan kap teljesen m\u00E1s tr\u00E9ninget ugyanaz a poz\u00EDci\u00F3 m\u00E1s kontextusban.',
    examples_tagline: 'M\u00E1s platform ezt nem tudja.',
    examples_mm1_role: 'Marketing Manager',
    examples_mm1_context: 'SaaS Startup, 25 f\u0151',
    examples_mm1_task: '\u201CA CEO 30%-kal cs\u00F6kkenten\u00E9 a hirdet\u00E9si k\u00F6lts\u00E9gkeretet, de tartani kell a lead mennyis\u00E9get. K\u00E9sz\u00EDts \u00E1tcsoportos\u00EDt\u00E1si tervet: melyik csatorn\u00E1t \u00E1ll\u00EDtsuk le, melyikre k\u00F6lts\u00FCnk t\u00F6bbet.\u201D',
    examples_mm2_role: 'Marketing Manager',
    examples_mm2_context: 'Fortune 500 Gy\u00E1rt\u00F3 C\u00E9g',
    examples_mm2_task: '\u201CA sales panaszkodik, hogy a marketing leadek nem min\u0151s\u00EDtettek. A CMO k\u00F6z\u00F6s prezent\u00E1ci\u00F3t k\u00E9r: jelenlegi lead scoring, javasolt v\u00E1ltoztat\u00E1sok \u00E9s 90 napos implement\u00E1ci\u00F3s terv.\u201D',
    examples_hr_role: 'HR Koordin\u00E1tor',
    examples_hr_context: '80 f\u0151s Remote Tech Startup',
    examples_hr_task: '\u201CH\u00E9tf\u0151n kezd egy \u00FAj fejleszt\u0151 APAC id\u0151z\u00F3n\u00E1b\u00F3l. K\u00E9sz\u00EDtsd el a teljes onboarding \u00FCtemtervet, koordin\u00E1ld az IT-vel a laptop sz\u00E1ll\u00EDt\u00E1st, \u00EDrd meg az \u00FCdv\u00F6zl\u0151 Slack \u00FCzenetet.\u201D',
    examples_pm_role: 'Projektmenedzser',
    examples_pm_context: 'Region\u00E1lis \u00C9p\u00EDt\u0151ipari C\u00E9g',
    examples_pm_task: '\u201CAz alv\u00E1llalkoz\u00F3 3 napot cs\u00FAszott a villanyszerel\u00E9si hat\u00E1rid\u0151vel. \u00CDrj emailt az \u00FCgyf\u00E9lnek a cs\u00FAsz\u00E1s magyar\u00E1zat\u00E1r\u00F3l, fr\u00EDss\u00EDtsd az \u00FCtemtervet \u00E9s javasolj megold\u00E1st.\u201D',
    examples_sl1_role: 'Sales Vezet\u0151',
    examples_sl1_context: 'B2B SaaS, Mid-Market',
    examples_sl1_task: '\u201CAz AE-d 120K doll\u00E1ros dealje 6 hete jogi fel\u00FClvizsg\u00E1laton akad. \u00CDrj Slack \u00FCzenetet 3 taktikai l\u00E9p\u00E9ssel a felold\u00E1sra, majd follow-up emailt a prospect VP-nek.\u201D',
    examples_sl2_role: 'Sales Vezet\u0151',
    examples_sl2_context: 'Enterprise SaaS, Fortune 1000',
    examples_sl2_task: '\u201CEgy 2M doll\u00E1ros deal vesz\u00E9lybe ker\u00FClt \u2014 az \u00FAj CTO minden besz\u00E1ll\u00EDt\u00F3t \u00FAjra\u00E9rt\u00E9kel. Van egy 15 perces h\u00EDv\u00E1sod. K\u00E9sz\u00EDtsd el a prezent\u00E1ci\u00F3 v\u00E1zlat\u00E1t (5 slide), 3 ellenvet\u00E9s-kezel\u00E9st.\u201D',

    // For Companies
    companies_h2: 'Mi\u00E9rt v\u00E1lasztj\u00E1k a c\u00E9gek az AI Work Fluency-t?',
    companies_1_title: 'Val\u00F3di produktivit\u00E1sn\u00F6veked\u00E9s',
    companies_1_desc: 'Az alkalmazottak a t\u00E9nyleges munk\u00E1jukat t\u00FCkr\u00F6z\u0151 feladatokon gyakorolnak. A tud\u00E1s azonnal \u00E1t\u00FCltethet\u0151 \u2014 nem 10 \u00F3ra vide\u00F3n\u00E9z\u00E9s ut\u00E1n.',
    companies_2_title: 'Vezet\u0151i dashboard',
    companies_2_desc: 'L\u00E1sd, melyik alkalmazott fejl\u0151dik, kinek kell seg\u00EDts\u00E9g, \u00E9s hol tart a csapat AI-k\u00E9pess\u00E9ge. Val\u00F3di adat, nem r\u00E9szv\u00E9teli igazol\u00E1s.',
    companies_3_title: 'M\u00E9rhet\u0151 ROI',
    companies_3_desc: 'K\u00F6vesd a feladatv\u00E9gz\u00E9si id\u0151 javul\u00E1s\u00E1t alkalmazottank\u00E9nt. Tudd pontosan, mit hoz a tr\u00E9ning befektet\u00E9sed.',
    companies_4_title: 'EU AI Act megfelel\u0151s\u00E9g',
    companies_4_desc: 'Az AI-\u00EDr\u00E1stud\u00E1s tr\u00E9ning hamarosan k\u00F6telez\u0151 lesz. Megfeleltett\u00FCk a csapatodat \u2014 mik\u00F6zben t\u00E9nyleg jobb\u00E1 is tessz\u00FCk \u0151ket.',

    // How It Works
    how_h2: 'Hogyan m\u0171k\u00F6dik',
    how_manager_title: 'Neked (a vezet\u0151nek)',
    how_manager_1: 'Regisztr\u00E1ld a csapatodat 5 perc alatt',
    how_manager_2: 'Minden alkalmazott kit\u00F6lti a munkak\u00F6r profilt',
    how_manager_3: 'K\u00F6vesd a halad\u00E1st a dashboardon',
    how_manager_4: 'L\u00E1sd a fejl\u0151d\u00E9si mutat\u00F3kat 30 nap ut\u00E1n',
    how_employee_title: 'Az alkalmazottaidnak',
    how_employee_1: 'A munkak\u00F6r\u00FCkre szabott feladatot kapnak',
    how_employee_2: 'B\u00E1rmilyen AI eszk\u00F6zzel megoldhatj\u00E1k',
    how_employee_3: '5 dimenzi\u00F3 ment\u00E9n pontoz\u00F3dnak',
    how_employee_4: 'Megl\u00E1tj\u00E1k, hogyan oldotta volna meg egy szak\u00E9rt\u0151',

    // Pricing
    pricing_h2: 'Egyszer\u0171, alkalmazottank\u00E9nti \u00E1raz\u00E1s',
    pricing_pilot: '',
    pricing_pilot_desc: '',
    pricing_starter: 'Starter',
    pricing_starter_seats: 'Max 25 f\u0151',
    pricing_growth: 'Growth',
    pricing_growth_seats: 'Max 50 f\u0151',
    pricing_enterprise: 'Enterprise',
    pricing_enterprise_seats: '50+ f\u0151',
    pricing_per_seat: '/f\u0151/h\u00F3',
    pricing_custom: 'Egyedi',
    pricing_annual: '\u00C9ves sz\u00E1ml\u00E1z\u00E1s. Havi +20%-kal el\u00E9rhet\u0151.',
    pricing_includes: 'Minden csomag tartalmazza: szem\u00E9lyre szabott feladatok, 5 dimenzi\u00F3s pontoz\u00E1s, vezet\u0151i dashboard, halad\u00E1si riportok',
    pricing_cta: 'Kipróbálom',

    // CTA
    cta_h2: 'Pr\u00F3b\u00E1ld ki magad. N\u00E9zd meg \u00E9l\u0151ben.',
    cta_sub: '\u00CDrd be a munkak\u00F6reidet \u00E9s n\u00E9zd meg, milyen feladatot gener\u00E1lna az AI Work Fluency neked. Azt\u00E1n k\u00E9pzeld el ezt \u2014 a csapatod minden tagj\u00E1nak.',
    cta_button: 'Pr\u00F3b\u00E1ld ki most \u2014 Ingyenes',
    cta_demo: 'Vagy foglalj egy 15 perces dem\u00F3t',

    // Footer
    footer_product: 'Term\u00E9k',
    footer_resources: 'Forr\u00E1sok',
    footer_company: 'C\u00E9g',
    footer_legal: 'Jogi',
    footer_roi: 'ROI Kalkul\u00E1tor',
    footer_euai: 'EU AI Act \u00DAtmutat\u00F3',
    footer_case: 'Esettanulm\u00E1nyok',
    footer_about: 'R\u00F3lunk',
    footer_contact: 'Kapcsolat',
    footer_privacy: 'Adatv\u00E9delmi ir\u00E1nyelvek',
    footer_terms: 'Felhaszn\u00E1l\u00E1si felt\u00E9telek',
    footer_copy: '\u00A9 2026 AI Work Fluency. Minden jog fenntartva.',
  },
};

export function getDictionary(locale: string): Record<string, string> {
  if (locale in dictionaries) {
    return dictionaries[locale as Locale];
  }
  return dictionaries[defaultLocale];
}
