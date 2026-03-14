'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Shield, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, XCircle, Clock, FileText, Users, BookOpen, ShieldCheck, Building2, Sparkles, EyeOff } from 'lucide-react';

const locales = ['en', 'hu'] as const;

/* ────────────────────────────────────────────
   COPY
   ──────────────────────────────────────────── */

const ui = {
  en: {
    title: 'EU AI Act Compliance Assessment',
    subtitle: 'Answer these questions to find out how prepared your organization is for Article 4 compliance.',
    step: 'Section',
    of: 'of',
    next: 'Next Section',
    prev: 'Previous Section',
    submit: 'See My Results',
    required: 'Please answer all questions before continuing.',
    yes: 'Yes',
    no: 'No',
    not_sure: 'Not sure',
    partially: 'Partially',
    in_progress: 'In progress',
    skipped_note: 'Some questions were skipped based on your previous answers.',
    // results
    results_title: 'Your Compliance Assessment Results',
    score_label: 'Compliance Readiness Score',
    level_critical: 'Critical \u2014 Immediate Action Required',
    level_at_risk: 'At Risk \u2014 Significant Gaps',
    level_partial: 'Partially Ready \u2014 Some Gaps Remain',
    level_good: 'Well Prepared \u2014 Minor Adjustments Needed',
    section_results: 'Section Breakdown',
    recommendations: 'Recommendations',
    // CTA
    cta_h2: 'Compliance + Real AI Skills. In One Package.',
    cta_sub: 'We don\'t just make you compliant \u2014 we make your team genuinely good at AI. Our training fulfills every EU AI Act requirement, while delivering ultra-personalized, role-specific daily practice tasks that build real skills. Compliance documentation, audit-ready reports, and measurable productivity gains \u2014 all included.',
    cta_button_contact: 'Talk to Our Compliance Expert',
    cta_button_service: 'See How the Training Works',
    cta_sub2: 'Free 15-minute consultation. No obligation.',
    restart: 'Retake Assessment',
    disclaimer: 'This assessment provides an indicative overview. It does not constitute legal advice. For a definitive compliance evaluation, consult with qualified legal counsel.',
    // Contact form
    form_title: 'Talk to Our Compliance Expert',
    form_name: 'Full name',
    form_email: 'Work email',
    form_company: 'Company name',
    form_phone: 'Phone (optional)',
    form_message: 'Anything else we should know? (optional)',
    form_submit: 'Send',
    form_sending: 'Sending...',
    form_success: 'Thank you! We\'ll be in touch within 24 hours.',
    form_error: 'Something went wrong. Please try again or email us directly at hello@aiworkfluency.com.',
    form_close: 'Close',
    // Shadow AI
    shadow_title: 'Are you sure? Shadow AI is more common than you think.',
    shadow_desc: 'Even if your organization doesn\'t officially use AI, studies show that over 50% of employees already use AI tools at work without their employer\'s knowledge. This is called <strong>Shadow AI</strong>.',
    shadow_examples_title: 'What does Shadow AI look like in practice?',
    shadow_example_1: 'Employees paste customer data, contracts, or internal documents into ChatGPT to summarize or rewrite them',
    shadow_example_2: 'Someone uses an AI tool to draft proposals, reports, or emails — without anyone reviewing the output',
    shadow_example_3: 'A team member uploads confidential spreadsheets to an AI analytics tool to "quickly get insights"',
    shadow_example_4: 'Developers use AI code assistants (Copilot, Cursor) with access to proprietary codebases',
    shadow_example_5: 'HR uses AI to pre-screen CVs or draft interview questions — without a formal policy',
    shadow_point_1: 'Under the EU AI Act, your organization is liable regardless of whether AI use is official or unofficial.',
    shadow_point_2: 'Without an AI policy, training, and documentation, your company has no protection if a regulator investigates.',
    shadow_point_3: 'The safest approach: assume your employees are already using AI, and build the compliance framework now.',
    shadow_cta: 'Talk to Our Compliance Expert',
    shadow_continue: 'Continue Assessment Anyway',
  },
  hu: {
    title: 'EU AI Act Megfelelőségi Felmérés',
    subtitle: 'Válaszoljon az alábbi kérdésekre, hogy megtudja, mennyire felkészült a szervezete a 4. cikk szerinti megfelelőségre.',
    step: 'Szekció',
    of: '/',
    next: 'Következő szekció',
    prev: 'Előző szekció',
    submit: 'Eredmények megtekintése',
    required: 'Kérjük, válaszoljon minden kérdésre a folytatáshoz.',
    yes: 'Igen',
    no: 'Nem',
    not_sure: 'Nem tudom',
    partially: 'Részben',
    in_progress: 'Folyamatban',
    skipped_note: 'Néhány kérdés kihagyásra került a korábbi válaszai alapján.',
    // results
    results_title: 'Az Ön megfelelőségi felmérésének eredményei',
    score_label: 'Megfelelőségi készültségi pontszám',
    level_critical: 'Kritikus \u2014 Azonnali intézkedés szükséges',
    level_at_risk: 'Veszélyeztetett \u2014 Jelentős hiányosságok',
    level_partial: 'Részben felkészült \u2014 Vannak még hiányosságok',
    level_good: 'Jól felkészült \u2014 Kisebb kiigazítások szükségesek',
    section_results: 'Szekciónkénti eredmények',
    recommendations: 'Javaslatok',
    // CTA
    cta_h2: 'Megfelelőség + valódi AI-készségek. Egy csomagban.',
    cta_sub: 'Nem csak megfelelővé tesszük a cégét \u2014 hanem a csapatát ténylegesen jóvá tesszük AI-ban. Képzésünk teljesíti az EU AI Act minden követelményét, miközben ultra-személyre szabott, szerepkör-specifikus napi gyakorlófeladatokkal valódi készségeket épít. Megfelelőségi dokumentáció, auditálásra kész riportok és mérhető produktivitásnövekedés \u2014 minden benne van.',
    cta_button_contact: 'Beszéljen megfelelőségi szakértőnkkel',
    cta_button_service: 'Ismerje meg a képzést',
    cta_sub2: 'Ingyenes 15 perces konzultáció. Nincs kötelezettség.',
    restart: 'Felmérés újrakezdése',
    disclaimer: 'Ez a felmérés tájékoztató jellegű áttekintést nyújt. Nem minősül jogi tanácsadásnak. Végleges megfelelőségi értékeléshez forduljon képzett jogi tanácsadóhoz.',
    // Contact form
    form_title: 'Beszéljen megfelelőségi szakértőnkkel',
    form_name: 'Teljes név',
    form_email: 'Munkahelyi email',
    form_company: 'Cégnév',
    form_phone: 'Telefon (opcionális)',
    form_message: 'Van még valami, amit tudnunk kell? (opcionális)',
    form_submit: 'Küldés',
    form_sending: 'Küldés...',
    form_success: 'Köszönjük! 24 órán belül felvesszük Önnel a kapcsolatot.',
    form_error: 'Hiba történt. Kérjük, próbálja újra, vagy írjon nekünk: hello@aiworkfluency.com.',
    form_close: 'Bezárás',
    // Shadow AI
    shadow_title: 'Biztos benne? A Shadow AI elterjedtebb, mint gondolná.',
    shadow_desc: 'Akkor is, ha szervezete hivatalosan nem használ AI-t, a felmérések szerint a munkavállalók több mint 50%-a már használ AI eszközöket a munkában — a munkáltatójuk tudta nélkül. Ezt hívjuk <strong>Shadow AI</strong>-nak.',
    shadow_examples_title: 'Hogyan néz ki a Shadow AI a gyakorlatban?',
    shadow_example_1: 'Munkatársak ügyféladatokat, szerződéseket vagy belső dokumentumokat másolnak be a ChatGPT-be összefoglaláshoz vagy átíráshoz',
    shadow_example_2: 'Valaki AI-val készít ajánlatokat, riportokat vagy emaileket — anélkül, hogy bárki ellenőrizné a kimenetet',
    shadow_example_3: 'Egy csapattag bizalmas táblázatokat tölt fel AI analitikai eszközbe, hogy "gyorsan kapjon elemzést"',
    shadow_example_4: 'Fejlesztők AI kód-asszisztenseket használnak (Copilot, Cursor), amelyek hozzáférnek a cég kódbázisához',
    shadow_example_5: 'A HR AI-val szűri előzetesen az önéletrajzokat vagy készít interjúkérdéseket — formális szabályzat nélkül',
    shadow_point_1: 'Az EU AI Act értelmében a szervezet felelős, függetlenül attól, hogy az AI-használat hivatalos vagy nem hivatalos.',
    shadow_point_2: 'AI szabályzat, képzés és dokumentáció nélkül a cégének nincs védelme, ha a hatóság vizsgálatot indít.',
    shadow_point_3: 'A legbiztonságosabb megközelítés: tételezze fel, hogy munkatársai már használnak AI-t, és építse ki a megfelelőségi keretrendszert most.',
    shadow_cta: 'Beszéljen megfelelőségi szakértőnkkel',
    shadow_continue: 'Felmérés folytatása',
  },
} as const;

/* ────────────────────────────────────────────
   QUESTIONS
   ──────────────────────────────────────────── */

type QType = 'yesno' | 'yesno3' | 'single' | 'multi';

interface Question {
  id: string;
  type: QType;
  weight: number;
  /** Return false to hide this question based on current answers */
  showIf?: (answers: Record<string, string | string[]>) => boolean;
  en: { q: string; options?: string[]; help?: string };
  hu: { q: string; options?: string[]; help?: string };
}

interface Section {
  id: string;
  en: { title: string; desc: string };
  hu: { title: string; desc: string };
  icon: typeof Shield;
  questions: Question[];
}

// Helper: does the user have some form of training?
function hasAnyTraining(answers: Record<string, string | string[]>): boolean {
  const v = answers.has_training;
  if (!v || typeof v !== 'string') return false;
  // "No" / "Nem" = no training
  return v !== 'No' && v !== 'Nem';
}

// Helper: does the user use high-risk AI?
function usesHighRisk(answers: Record<string, string | string[]>): boolean {
  return answers.high_risk === 'yes';
}

const sections: Section[] = [
  // ═══════════════ 1. AI USAGE ═══════════════
  {
    id: 'ai_usage',
    en: { title: 'AI System Usage', desc: 'Understanding what AI tools and systems your organization uses.' },
    hu: { title: 'AI rendszerek használata', desc: 'A szervezete által használt AI eszközök és rendszerek felmérése.' },
    icon: Building2,
    questions: [
      {
        id: 'uses_ai',
        type: 'yesno',
        weight: 0,
        en: { q: 'Does your organization use any AI tools or systems?', help: 'This includes ChatGPT, Microsoft Copilot, Google Gemini, AI-powered analytics, automated decision-making systems, etc.' },
        hu: { q: 'Használ a szervezete bármilyen AI eszközt vagy rendszert?', help: 'Ide tartozik a ChatGPT, Microsoft Copilot, Google Gemini, AI-alapú analitika, automatizált döntéshozó rendszerek stb.' },
      },
      {
        id: 'ai_tools',
        type: 'multi',
        weight: 0,
        showIf: (a) => a.uses_ai === 'yes',
        en: { q: 'Which AI tools/systems are used in your organization?', options: ['ChatGPT / OpenAI', 'Microsoft Copilot', 'Google Gemini', 'GitHub Copilot', 'AI-powered CRM/ERP', 'AI analytics/BI tools', 'Custom/internal AI systems', 'AI in recruitment/HR', 'AI in customer service (chatbots)', 'Other AI tools'] },
        hu: { q: 'Milyen AI eszközöket/rendszereket használnak a szervezetben?', options: ['ChatGPT / OpenAI', 'Microsoft Copilot', 'Google Gemini', 'GitHub Copilot', 'AI-alapú CRM/ERP', 'AI analitika/BI eszközök', 'Saját/belső AI rendszerek', 'AI a toborzásban/HR-ben', 'AI ügyfélszolgálatban (chatbotok)', 'Egyéb AI eszközök'] },
      },
      {
        id: 'ai_users_count',
        type: 'single',
        weight: 0,
        showIf: (a) => a.uses_ai === 'yes',
        en: { q: 'How many employees use AI tools in their work?', options: ['1-10', '11-50', '51-200', '201-500', '500+'] },
        hu: { q: 'Hány munkavállaló használ AI eszközöket a munkája során?', options: ['1-10', '11-50', '51-200', '201-500', '500+'] },
      },
      {
        id: 'develops_ai',
        type: 'yesno',
        weight: 0,
        en: { q: 'Does your organization develop its own AI systems or models?' },
        hu: { q: 'Fejleszt a szervezete saját AI rendszereket vagy modelleket?' },
      },
    ],
  },
  // ═══════════════ 2. RISK CLASSIFICATION ═══════════════
  {
    id: 'risk_classification',
    en: { title: 'Risk Classification', desc: 'The EU AI Act categorizes AI systems by risk level. Higher risk = stricter requirements.' },
    hu: { title: 'Kockázati besorolás', desc: 'Az EU AI Act kockázati szint szerint kategorizálja az AI rendszereket. Magasabb kockázat = szigorúbb követelmények.' },
    icon: AlertTriangle,
    questions: [
      {
        id: 'has_inventory',
        type: 'yesno3',
        weight: 10,
        en: { q: 'Does your organization maintain a documented inventory of all AI systems in use?', help: 'The EU AI Act requires organizations to know exactly which AI systems they operate or deploy.' },
        hu: { q: 'Rendelkezik a szervezete dokumentált leltárral az összes használatban lévő AI rendszerről?', help: 'Az EU AI Act megköveteli, hogy a szervezetek pontosan tudják, milyen AI rendszereket üzemeltetnek.' },
      },
      {
        id: 'risk_classified',
        type: 'yesno3',
        weight: 10,
        en: { q: 'Have you classified your AI systems by EU AI Act risk categories (unacceptable, high, limited, minimal)?', help: 'Risk classification determines the level of compliance obligations for each system.' },
        hu: { q: 'Besorolták az AI rendszereiket az EU AI Act kockázati kategóriái szerint (elfogadhatatlan, magas, korlátozott, minimális)?', help: 'A kockázati besorolás határozza meg az egyes rendszerekre vonatkozó megfelelőségi kötelezettségek szintjét.' },
      },
      {
        id: 'high_risk',
        type: 'yesno3',
        weight: 5,
        en: { q: 'Do you use AI in any high-risk areas?', help: 'High-risk areas include: recruitment/HR decisions, credit scoring, biometric identification, safety-critical systems, education assessment, law enforcement support.' },
        hu: { q: 'Használnak AI-t magas kockázatú területeken?', help: 'Magas kockázatú területek: toborzás/HR döntések, hitelbírálat, biometrikus azonosítás, biztonságkritikus rendszerek, oktatási értékelés, bűnüldözés támogatása.' },
      },
      {
        id: 'risk_documented',
        type: 'yesno3',
        weight: 10,
        en: { q: 'Are the specific risks of each AI system documented?' },
        hu: { q: 'Dokumentálták az egyes AI rendszerek specifikus kockázatait?' },
      },
    ],
  },
  // ═══════════════ 3. TRAINING ═══════════════
  {
    id: 'training',
    en: { title: 'AI Literacy Training', desc: 'Article 4 requires that all staff interacting with AI have adequate, role-appropriate training.' },
    hu: { title: 'AI-jártassági képzés', desc: 'A 4. cikk megköveteli, hogy minden AI-val érintkező munkavállaló megfelelő, szerepkör-specifikus képzésben részesüljön.' },
    icon: BookOpen,
    questions: [
      {
        id: 'has_training',
        type: 'single',
        weight: 15,
        en: { q: 'Does your organization have an AI literacy training program?', options: ['Yes, comprehensive', 'Yes, basic', 'In progress', 'No'] },
        hu: { q: 'Rendelkezik a szervezete AI-jártassági képzési programmal?', options: ['Igen, átfogó', 'Igen, alapszintű', 'Folyamatban', 'Nem'] },
      },
      {
        id: 'training_role_specific',
        type: 'yesno3',
        weight: 10,
        showIf: hasAnyTraining,
        en: { q: 'Is the training tailored to different roles?', help: 'The regulation requires that training depth matches the role: developers, managers, deployers, and end-users need different levels of training.' },
        hu: { q: 'A képzés a különböző szerepkörökhöz igazodik?', help: 'A szabályozás megköveteli, hogy a képzés mélysége illeszkedjen a szerepkörhöz: fejlesztők, vezetők, üzemeltetők és végfelhasználók különböző szintű képzést igényelnek.' },
      },
      {
        id: 'training_coverage',
        type: 'single',
        weight: 10,
        showIf: hasAnyTraining,
        en: { q: 'What percentage of AI-using employees have completed training?', options: ['100%', '75-99%', '50-74%', '25-49%', 'Under 25%', '0%'] },
        hu: { q: 'Az AI-t használó munkavállalók hány százaléka végezte el a képzést?', options: ['100%', '75-99%', '50-74%', '25-49%', '25% alatt', '0%'] },
      },
      {
        id: 'training_content',
        type: 'multi',
        weight: 10,
        showIf: hasAnyTraining,
        en: { q: 'Which topics does your training cover?', options: ['How AI systems work (basics)', 'Recognizing AI-generated content', 'Risks and limitations of AI', 'Responsible/ethical AI use', 'Data privacy and AI', 'Role-specific AI competencies', 'EU AI Act obligations', 'Critical evaluation of AI outputs'] },
        hu: { q: 'Milyen témákat fed le a képzésük?', options: ['AI rendszerek működése (alapok)', 'AI által generált tartalom felismerése', 'AI kockázatai és korlátai', 'Felelős/etikus AI-használat', 'Adatvédelem és AI', 'Szerepkör-specifikus AI kompetenciák', 'EU AI Act kötelezettségek', 'AI kimenetek kritikus értékelése'] },
      },
      {
        id: 'training_frequency',
        type: 'single',
        weight: 5,
        showIf: hasAnyTraining,
        en: { q: 'How often is the training updated?', options: ['Quarterly or more often', 'Twice a year', 'Annually', 'It was a one-time event', 'Never updated'] },
        hu: { q: 'Milyen gyakran frissítik a képzést?', options: ['Negyedévente vagy gyakrabban', 'Félévente', 'Évente', 'Egyszeri alkalom volt', 'Soha nem frissítették'] },
      },
    ],
  },
  // ═══════════════ 4. DOCUMENTATION ═══════════════
  {
    id: 'documentation',
    en: { title: 'Documentation & Records', desc: 'Authorities will require verifiable evidence of your AI literacy measures.' },
    hu: { title: 'Dokumentáció és nyilvántartás', desc: 'A hatóságok ellenőrizhető bizonyítékokat fognak kérni az AI-jártassági intézkedésekről.' },
    icon: FileText,
    questions: [
      {
        id: 'training_documented',
        type: 'yesno3',
        weight: 10,
        showIf: hasAnyTraining,
        en: { q: 'Are training sessions documented with dates, attendees, and content covered?' },
        hu: { q: 'Dokumentálják a képzéseket dátummal, résztvevőkkel és a feldolgozott tartalommal?' },
      },
      {
        id: 'individual_records',
        type: 'yesno3',
        weight: 10,
        showIf: hasAnyTraining,
        en: { q: 'Do you maintain individual-level training records for each employee?', help: 'Regulators may ask for proof of who was trained, when, and to what standard.' },
        hu: { q: 'Vezetnek egyéni szintű képzési nyilvántartást minden munkavállalóról?', help: 'A hatóságok kérhetnek bizonyítékot arról, hogy kit, mikor és milyen szinten képeztek.' },
      },
      {
        id: 'competency_measured',
        type: 'yesno3',
        weight: 5,
        showIf: hasAnyTraining,
        en: { q: 'Do you measure/assess employee competency after training?' },
        hu: { q: 'Mérik/értékelik a munkavállalók kompetenciáját a képzés után?' },
      },
      {
        id: 'audit_ready',
        type: 'yesno3',
        weight: 10,
        en: { q: 'Can you generate audit-ready compliance reports on demand?', help: 'If an authority requests evidence of your AI literacy measures, can you provide structured documentation within days?' },
        hu: { q: 'Tudnak igény szerint auditálásra kész megfelelőségi riportokat generálni?', help: 'Ha egy hatóság bizonyítékot kér az AI-jártassági intézkedéseikről, tudnak strukturált dokumentációt biztosítani napokon belül?' },
      },
    ],
  },
  // ═══════════════ 5. GOVERNANCE ═══════════════
  {
    id: 'governance',
    en: { title: 'Governance & Policies', desc: 'Organizational structures and policies that support ongoing AI compliance.' },
    hu: { title: 'Irányítás és szabályzatok', desc: 'Szervezeti struktúrák és szabályzatok, amelyek támogatják a folyamatos AI-megfelelőséget.' },
    icon: ShieldCheck,
    questions: [
      {
        id: 'ai_responsible',
        type: 'yesno3',
        weight: 5,
        en: { q: 'Is there a designated person or team responsible for AI governance and literacy?' },
        hu: { q: 'Van kijelölt személy vagy csapat, aki felelős az AI irányításért és jártasságért?' },
      },
      {
        id: 'ai_policy',
        type: 'yesno3',
        weight: 5,
        en: { q: 'Does your organization have a written AI usage policy?', help: 'A policy covering acceptable use, data handling, risk management, and employee responsibilities when using AI.' },
        hu: { q: 'Rendelkezik a szervezete írásos AI használati szabályzattal?', help: 'Szabályzat az elfogadható használatról, adatkezelésről, kockázatkezelésről és a munkavállalók felelősségéről AI használat során.' },
      },
      {
        id: 'integrated_lnd',
        type: 'yesno3',
        weight: 5,
        en: { q: 'Is AI literacy integrated into your HR/Learning & Development processes?', help: 'E.g., part of onboarding, performance reviews, or continuous development plans.' },
        hu: { q: 'Integrálták az AI-jártasságot a HR/tanulás- és fejlesztési folyamatokba?', help: 'Pl. a betanulás, teljesítményértékelés vagy folyamatos fejlesztési tervek része.' },
      },
      {
        id: 'incident_process',
        type: 'yesno3',
        weight: 5,
        en: { q: 'Do you have procedures for AI-related incidents or concerns?' },
        hu: { q: 'Van eljárásrendjük AI-val kapcsolatos incidensekre vagy aggályokra?' },
      },
      {
        id: 'high_risk_oversight',
        type: 'yesno3',
        weight: 5,
        showIf: usesHighRisk,
        en: { q: 'For high-risk AI systems: do oversight personnel receive enhanced, system-specific training?' },
        hu: { q: 'Magas kockázatú AI rendszereknél: az ellenőrző személyzet kap-e emelt szintű, rendszer-specifikus képzést?' },
      },
    ],
  },
];

/* ────────────────────────────────────────────
   VISIBILITY HELPER
   ──────────────────────────────────────────── */

function getVisibleQuestions(section: Section, answers: Record<string, string | string[]>): Question[] {
  return section.questions.filter((q) => !q.showIf || q.showIf(answers));
}

/* ────────────────────────────────────────────
   SCORING
   ──────────────────────────────────────────── */

function calculateScore(answers: Record<string, string | string[]>): { total: number; max: number; sectionScores: { id: string; score: number; max: number }[] } {
  let total = 0;
  let max = 0;
  const sectionScores: { id: string; score: number; max: number }[] = [];

  for (const section of sections) {
    let sScore = 0;
    let sMax = 0;
    const visible = getVisibleQuestions(section, answers);

    for (const q of visible) {
      if (q.weight === 0) continue;
      sMax += q.weight;
      const a = answers[q.id];
      if (!a) continue;

      if (q.type === 'yesno') {
        if (a === 'yes') sScore += q.weight;
      } else if (q.type === 'yesno3') {
        if (a === 'yes') sScore += q.weight;
        else if (a === 'not_sure') sScore += q.weight * 0.2;
      } else if (q.type === 'single') {
        const opts = q.en.options || [];
        const huOpts = q.hu.options || [];
        const idx = typeof a === 'string' ? opts.indexOf(a) : -1;
        const huIdx = typeof a === 'string' ? huOpts.indexOf(a) : -1;
        const finalIdx = idx >= 0 ? idx : huIdx;
        if (finalIdx >= 0 && opts.length > 1) {
          const ratio = 1 - (finalIdx / (opts.length - 1));
          sScore += q.weight * ratio;
        }
      } else if (q.type === 'multi') {
        const selected = Array.isArray(a) ? a : [];
        const opts = q.en.options || [];
        const ratio = Math.min(selected.length / Math.max(opts.length * 0.6, 1), 1);
        sScore += q.weight * ratio;
      }
    }

    // If training questions were skipped because there's no training, count the skipped weight as 0 (worst)
    const allQuestions = section.questions.filter((q) => q.weight > 0);
    const skippedQuestions = allQuestions.filter((q) => q.showIf && !q.showIf(answers));
    for (const sq of skippedQuestions) {
      sMax += sq.weight; // add to max but score stays 0
    }

    sectionScores.push({ id: section.id, score: Math.round(sScore), max: sMax });
    total += sScore;
    max += sMax;
  }

  return { total: Math.round(total), max, sectionScores };
}

interface Recommendation {
  priority: 'critical' | 'high' | 'medium';
  en: string;
  hu: string;
}

function getRecommendations(answers: Record<string, string | string[]>): Recommendation[] {
  const recs: Recommendation[] = [];
  const noTraining = !hasAnyTraining(answers);

  if (answers.has_inventory !== 'yes') {
    recs.push({ priority: 'critical', en: 'Create a documented inventory of all AI systems used in your organization. This is the foundation of compliance.', hu: 'Készítsen dokumentált leltárt a szervezetben használt összes AI rendszerről. Ez a megfelelőség alapja.' });
  }
  if (answers.risk_classified !== 'yes') {
    recs.push({ priority: 'critical', en: 'Classify all AI systems by EU AI Act risk categories. This determines your compliance obligations for each system.', hu: 'Sorolja be az összes AI rendszert az EU AI Act kockázati kategóriái szerint. Ez határozza meg az egyes rendszerekre vonatkozó kötelezettségeit.' });
  }
  if (noTraining) {
    recs.push({ priority: 'critical', en: 'Implement an AI literacy training program immediately. This is the core requirement of Article 4. Without any training, your organization is fully non-compliant.', hu: 'Azonnal vezessen be AI-jártassági képzési programot. Ez a 4. cikk alapvető követelménye. Képzés nélkül a szervezete teljes mértékben nem megfelelő.' });
    recs.push({ priority: 'critical', en: 'You will also need documented training records, individual-level tracking, and competency measurement \u2014 none of which are possible without a training program in place.', hu: 'Szüksége lesz dokumentált képzési nyilvántartásra, egyéni szintű követésre és kompetencia-mérésre is \u2014 ezek egyike sem lehetséges működő képzési program nélkül.' });
  } else {
    if (answers.training_role_specific !== 'yes') {
      recs.push({ priority: 'high', en: 'Make your training role-specific. The regulation requires training depth to match each person\'s role and risk exposure.', hu: 'Tegye szerepkör-specifikussá a képzést. A szabályozás megköveteli, hogy a képzés mélysége illeszkedjen az adott személy szerepköréhez és kockázati kitettségéhez.' });
    }
    if (answers.training_documented !== 'yes') {
      recs.push({ priority: 'critical', en: 'Start documenting all training activities with dates, attendees, and content. Without documentation, you cannot prove compliance.', hu: 'Kezdje el dokumentálni az összes képzési tevékenységet dátummal, résztvevőkkel és tartalommal. Dokumentáció nélkül nem tudja bizonyítani a megfelelőséget.' });
    }
    if (answers.individual_records !== 'yes') {
      recs.push({ priority: 'high', en: 'Implement individual-level training records. Regulators will ask for per-employee evidence.', hu: 'Vezessen be egyéni szintű képzési nyilvántartást. A hatóságok munkavállalónkénti bizonyítékot fognak kérni.' });
    }
    if (answers.competency_measured !== 'yes') {
      recs.push({ priority: 'medium', en: 'Introduce competency measurement after training to verify that employees actually gained the required skills.', hu: 'Vezessen be kompetencia-mérést a képzés után, hogy ellenőrizze, a munkavállalók ténylegesen elsajátították-e a szükséges készségeket.' });
    }
  }
  if (answers.audit_ready !== 'yes') {
    recs.push({ priority: 'high', en: 'Set up a system to generate audit-ready compliance reports on demand.', hu: 'Építsen ki rendszert auditálásra kész megfelelőségi riportok igény szerinti generálásához.' });
  }
  if (answers.ai_responsible !== 'yes') {
    recs.push({ priority: 'high', en: 'Designate a person or team responsible for AI governance and literacy compliance.', hu: 'Jelöljön ki egy személyt vagy csapatot, aki felelős az AI irányításért és a jártassági megfelelőségért.' });
  }
  if (answers.ai_policy !== 'yes') {
    recs.push({ priority: 'medium', en: 'Draft and implement a written AI usage policy covering acceptable use, data handling, and employee responsibilities.', hu: 'Dolgozzon ki és vezessen be írásos AI használati szabályzatot az elfogadható használatról, adatkezelésről és a munkavállalói felelősségről.' });
  }
  if (answers.risk_documented !== 'yes') {
    recs.push({ priority: 'medium', en: 'Document the specific risks associated with each AI system in use.', hu: 'Dokumentálja az egyes használatban lévő AI rendszerek specifikus kockázatait.' });
  }
  if (answers.incident_process !== 'yes') {
    recs.push({ priority: 'medium', en: 'Establish procedures for handling AI-related incidents and employee concerns.', hu: 'Dolgozzon ki eljárásrendet az AI-val kapcsolatos incidensek és munkavállalói aggályok kezelésére.' });
  }
  if (usesHighRisk(answers) && answers.high_risk_oversight !== 'yes') {
    recs.push({ priority: 'high', en: 'Implement enhanced, system-specific training for personnel overseeing high-risk AI systems.', hu: 'Vezessen be emelt szintű, rendszer-specifikus képzést a magas kockázatú AI rendszereket felügyelő személyzet számára.' });
  }

  const order = { critical: 0, high: 1, medium: 2 };
  recs.sort((a, b) => order[a.priority] - order[b.priority]);
  return recs;
}

/* ────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────── */

export default function ComplianceAssessmentPage() {
  const params = useParams();
  const locale = (params.locale === 'hu' ? 'hu' : 'en') as 'en' | 'hu';
  const t = ui[locale];

  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showShadowAi, setShowShadowAi] = useState(false);

  const section = sections[currentSection];
  const visibleQuestions = useMemo(() => getVisibleQuestions(section, answers), [section, answers]);
  const progress = ((currentSection + 1) / sections.length) * 100;

  const allAnswered = useMemo(() => {
    return visibleQuestions.every((q) => {
      const a = answers[q.id];
      if (q.type === 'multi') return Array.isArray(a) && a.length > 0;
      return typeof a === 'string' && a.length > 0;
    });
  }, [answers, visibleQuestions]);

  function setAnswer(id: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setShowError(false);
  }

  function toggleMulti(id: string, value: string) {
    setAnswers((prev) => {
      const current = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [id]: next };
    });
    setShowError(false);
  }

  function handleNext() {
    if (!allAnswered) { setShowError(true); return; }
    // After Section 1 (AI Usage): if both uses_ai and develops_ai are "no", show Shadow AI warning
    if (currentSection === 0 && answers.uses_ai === 'no' && answers.develops_ai === 'no') {
      setShowShadowAi(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (currentSection < sections.length - 1) {
      setCurrentSection((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handlePrev() {
    if (currentSection > 0) {
      setCurrentSection((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ──── SHADOW AI INTERSTITIAL ────
  if (showShadowAi) {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `.font-serif-heading { font-family: 'Libre Baskerville', Georgia, 'Times New Roman', serif; }` }} />

        <div className="min-h-screen bg-white">
          <nav className="bg-[#051c2c] sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href={`/lp/eu-compliance/v2/${locale}`} className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-white/80 flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-tight">AWF</span>
                </div>
                <span className="text-[15px] font-semibold text-white tracking-wide">AI Work Fluency</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/rolunk" className="text-sm text-white/60 hover:text-white transition-colors">Rólunk</Link>
                <div className="flex gap-0.5 text-xs border border-white/20 overflow-hidden">
                  {locales.map((l) => (
                    <Link key={l} href={`/lp/eu-compliance/assessment/${l}`} className={`px-2.5 py-1 transition-colors ${l === locale ? 'bg-white text-[#051c2c]' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                      {l.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="max-w-2xl mx-auto px-4 py-16">
            <div className="bg-amber-950 p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
                <EyeOff className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mb-4">{t.shadow_title}</h2>
              <p className="text-amber-200/80 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: t.shadow_desc }} />

              {/* Concrete examples */}
              <div className="text-left mb-8">
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">{t.shadow_examples_title}</h3>
                <div className="space-y-2">
                  {[t.shadow_example_1, t.shadow_example_2, t.shadow_example_3, t.shadow_example_4, t.shadow_example_5].map((ex, i) => (
                    <div key={i} className="flex items-start gap-3 bg-amber-900/30 px-4 py-3">
                      <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0">&bull;</span>
                      <span className="text-sm text-amber-100/90">{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal consequences */}
              <div className="space-y-4 text-left mb-10">
                {[t.shadow_point_1, t.shadow_point_2, t.shadow_point_3].map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-amber-900/40 px-5 py-4 border border-amber-800/50">
                    <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-amber-100">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <Link href={`/lp/eu-compliance/v2/${locale}#contact`} className="bg-[#00a9f4] hover:bg-[#0095d9] text-white font-semibold py-4 px-8 inline-flex items-center justify-center gap-2 transition-colors">
                  {t.shadow_cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ──── RESULTS VIEW ────
  if (showResults) {
    const { total, max, sectionScores } = calculateScore(answers);
    const pct = max > 0 ? Math.round((total / max) * 100) : 0;
    const level = pct < 25 ? 'critical' : pct < 50 ? 'at_risk' : pct < 75 ? 'partial' : 'good';
    const levelLabel = t[`level_${level}` as keyof typeof t] as string;
    const levelColor = level === 'critical' ? 'red' : level === 'at_risk' ? 'amber' : level === 'partial' ? 'yellow' : 'green';
    const recommendations = getRecommendations(answers);

    const colorMap: Record<string, { bg: string; border: string; text: string; bar: string }> = {
      red: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', bar: 'bg-red-500' },
      amber: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700', bar: 'bg-amber-500' },
      yellow: { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', bar: 'bg-yellow-500' },
      green: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', bar: 'bg-green-500' },
    };
    const c = colorMap[levelColor];
    const LevelIcon = level === 'critical' ? XCircle : level === 'at_risk' ? AlertTriangle : level === 'partial' ? Clock : CheckCircle;

    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `.font-serif-heading { font-family: 'Libre Baskerville', Georgia, 'Times New Roman', serif; }` }} />

        <div className="min-h-screen bg-white">
          <nav className="bg-[#051c2c] sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href={`/lp/eu-compliance/v2/${locale}`} className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-white/80 flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-tight">AWF</span>
                </div>
                <span className="text-[15px] font-semibold text-white tracking-wide">AI Work Fluency</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/rolunk" className="text-sm text-white/60 hover:text-white transition-colors">Rólunk</Link>
                <div className="flex gap-0.5 text-xs border border-white/20 overflow-hidden">
                  {locales.map((l) => (
                    <Link key={l} href={`/lp/eu-compliance/assessment/${l}`} className={`px-2.5 py-1 transition-colors ${l === locale ? 'bg-white text-[#051c2c]' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                      {l.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#051c2c] mb-8 text-center">{t.results_title}</h1>

            {/* Score card */}
            <div className={`${c.bg} border-2 ${c.border} p-8 text-center mb-8`}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <LevelIcon className={`w-6 h-6 ${c.text}`} />
                <span className={`font-bold text-lg ${c.text}`}>{levelLabel}</span>
              </div>
              <div className="text-5xl font-bold text-[#051c2c] mb-2">{pct}%</div>
              <div className="text-sm text-gray-500">{t.score_label}</div>
              <div className="mt-4 w-full bg-gray-200 h-3 max-w-xs mx-auto">
                <div className={`${c.bar} h-3 transition-all duration-700`} style={{ width: `${pct}%` }} />
              </div>
            </div>

            {/* Section breakdown */}
            <div className="bg-white border border-gray-200 p-6 mb-8">
              <h2 className="font-semibold text-[#051c2c] mb-4">{t.section_results}</h2>
              <div className="space-y-4">
                {sectionScores.filter((s) => s.max > 0).map((s) => {
                  const sec = sections.find((x) => x.id === s.id)!;
                  const secPct = s.max > 0 ? Math.round((s.score / s.max) * 100) : 0;
                  const barColor = secPct < 25 ? 'bg-red-500' : secPct < 50 ? 'bg-amber-500' : secPct < 75 ? 'bg-yellow-500' : 'bg-green-500';
                  return (
                    <div key={s.id}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{sec[locale].title}</span>
                        <span className="text-sm font-bold text-[#051c2c]">{secPct}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2">
                        <div className={`${barColor} h-2 transition-all duration-700`} style={{ width: `${secPct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="bg-white border border-gray-200 p-6 mb-8">
                <h2 className="font-semibold text-[#051c2c] mb-4">{t.recommendations}</h2>
                <div className="space-y-3">
                  {recommendations.map((rec, i) => {
                    const prioColor = rec.priority === 'critical' ? 'bg-red-100 text-red-700 border-red-200' : rec.priority === 'high' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-blue-100 text-blue-700 border-blue-200';
                    const prioLabel = rec.priority === 'critical' ? (locale === 'hu' ? 'Kritikus' : 'Critical') : rec.priority === 'high' ? (locale === 'hu' ? 'Fontos' : 'High') : (locale === 'hu' ? 'Ajanlott' : 'Medium');
                    return (
                      <div key={i} className="flex items-start gap-3 border border-gray-100 px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 border flex-shrink-0 mt-0.5 ${prioColor}`}>{prioLabel}</span>
                        <span className="text-sm text-gray-700">{rec[locale]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-xs text-gray-400 text-center mb-10 max-w-lg mx-auto">{t.disclaimer}</p>

            {/* CTA */}
            <div className="bg-[#051c2c] p-8 sm:p-12 text-center">
              <Sparkles className="w-10 h-10 text-[#00a9f4] mx-auto mb-4" />
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-white mb-4">{t.cta_h2}</h2>
              <p className="text-gray-300 mb-10 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">{t.cta_sub}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/lp/eu-compliance/v2/${locale}#contact`} className="bg-[#00a9f4] hover:bg-[#0095d9] text-white font-semibold py-4 px-8 inline-flex items-center justify-center gap-2 transition-colors">
                  {t.cta_button_contact}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href={`/lp/eu-compliance/v2/${locale}`} className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 inline-flex items-center justify-center gap-2 transition-colors border border-white/20">
                  {t.cta_button_service}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-gray-500 mt-4 text-sm">{t.cta_sub2}</p>
            </div>

            {/* Restart */}
            <div className="text-center mt-8">
              <button onClick={() => { setShowResults(false); setCurrentSection(0); setAnswers({}); }} className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors">
                {t.restart}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ──── QUESTIONNAIRE VIEW ────
  const SectionIcon = section.icon;
  const hasSkippedQuestions = visibleQuestions.length < section.questions.length;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `.font-serif-heading { font-family: 'Libre Baskerville', Georgia, 'Times New Roman', serif; }` }} />

      <div className="min-h-screen bg-white">
        {/* Nav */}
        <nav className="bg-[#051c2c] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href={`/lp/eu-compliance/v2/${locale}`} className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-white/80 flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-tight">AWF</span>
              </div>
              <span className="text-[15px] font-semibold text-white tracking-wide">AI Work Fluency</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/rolunk" className="text-sm text-white/60 hover:text-white transition-colors">Rólunk</Link>
              <div className="flex gap-0.5 text-xs border border-white/20 overflow-hidden">
                {locales.map((l) => (
                  <Link key={l} href={`/lp/eu-compliance/assessment/${l}`} className={`px-2.5 py-1 transition-colors ${l === locale ? 'bg-white text-[#051c2c]' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                    {l.toUpperCase()}
                  </Link>
                ))}
              </div>
              <span className="text-sm text-white/60 font-medium">{t.step} {currentSection + 1} {t.of} {sections.length}</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-[#051c2c]">
            <div className="h-1 bg-[#00a9f4] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Section header */}
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-[#051c2c] flex items-center justify-center mx-auto mb-4">
              <SectionIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-serif-heading text-2xl font-bold text-[#051c2c] mb-2">{section[locale].title}</h1>
            <p className="text-gray-500">{section[locale].desc}</p>
          </div>

          {/* Questions */}
          <div className="space-y-8">
            {visibleQuestions.map((q) => {
              const qText = q[locale];
              const answer = answers[q.id];

              return (
                <div key={q.id} className="bg-white border border-gray-200 p-6">
                  <h3 className="font-semibold text-[#051c2c] mb-1">{qText.q}</h3>
                  {qText.help && <p className="text-sm text-gray-400 mb-4">{qText.help}</p>}

                  {/* Yes/No */}
                  {q.type === 'yesno' && (
                    <div className="flex gap-3 mt-3">
                      {['yes', 'no'].map((val) => (
                        <button key={val} onClick={() => setAnswer(q.id, val)} className={`flex-1 py-3 px-4 border-2 font-medium text-sm transition-all ${answer === val ? 'border-[#00a9f4] bg-[#00a9f4]/10 text-[#051c2c]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                          {val === 'yes' ? t.yes : t.no}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Yes/No/Not sure */}
                  {q.type === 'yesno3' && (
                    <div className="flex gap-3 mt-3">
                      {['yes', 'no', 'not_sure'].map((val) => (
                        <button key={val} onClick={() => setAnswer(q.id, val)} className={`flex-1 py-3 px-4 border-2 font-medium text-sm transition-all ${answer === val ? 'border-[#00a9f4] bg-[#00a9f4]/10 text-[#051c2c]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                          {t[val as keyof typeof t] as string}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Single choice */}
                  {q.type === 'single' && (
                    <div className="space-y-2 mt-3">
                      {(qText.options || []).map((opt) => (
                        <button key={opt} onClick={() => setAnswer(q.id, opt)} className={`w-full text-left py-3 px-4 border-2 text-sm transition-all ${answer === opt ? 'border-[#00a9f4] bg-[#00a9f4]/10 text-[#051c2c] font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Multi choice */}
                  {q.type === 'multi' && (
                    <div className="space-y-2 mt-3">
                      {(qText.options || []).map((opt) => {
                        const selected = Array.isArray(answer) && answer.includes(opt);
                        return (
                          <button key={opt} onClick={() => toggleMulti(q.id, opt)} className={`w-full text-left py-3 px-4 border-2 text-sm transition-all flex items-center gap-3 ${selected ? 'border-[#00a9f4] bg-[#00a9f4]/10 text-[#051c2c] font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                            <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center ${selected ? 'bg-[#00a9f4]' : 'bg-gray-100'}`}>
                              {selected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                            </div>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Skipped note */}
          {hasSkippedQuestions && (
            <div className="mt-6 bg-gray-50 border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-500">{t.skipped_note}</p>
            </div>
          )}

          {/* Error */}
          {showError && (
            <div className="mt-6 bg-red-50 border border-red-200 p-4 text-center">
              <p className="text-sm text-red-600 font-medium">{t.required}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button onClick={handlePrev} disabled={currentSection === 0} className={`flex items-center gap-2 text-sm font-medium py-3 px-5 transition-colors ${currentSection === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
              <ArrowLeft className="w-4 h-4" />
              {t.prev}
            </button>
            <button onClick={handleNext} className="bg-[#00a9f4] hover:bg-[#0095d9] text-white font-semibold text-sm py-3 px-8 flex items-center gap-2 transition-colors">
              {currentSection === sections.length - 1 ? t.submit : t.next}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
