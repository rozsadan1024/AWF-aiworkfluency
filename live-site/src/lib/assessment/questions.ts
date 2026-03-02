import { AssessmentQuestion } from '@/types';

type Lang = 'en' | 'hu';

const BLOCK_LABELS_ALL: Record<Lang, Record<string, { title: string; description: string }>> = {
  en: {
    your_work: { title: 'About Your Work', description: "Let's understand what you do every day." },
    ai_experience: { title: 'Your AI Experience', description: 'Where are you now with AI tools?' },
    your_goals: { title: 'Your Goals', description: 'Last few questions — almost done!' },
  },
  hu: {
    your_work: { title: 'A munkádról', description: 'Ismerjük meg, mit csinálsz a mindennapokban.' },
    ai_experience: { title: 'AI tapasztalatod', description: 'Hol tartasz most az AI eszközökkel?' },
    your_goals: { title: 'Céljaid', description: 'Utolsó pár kérdés — mindjárt kész!' },
  },
};

const QUESTIONS_EN: AssessmentQuestion[] = [
  {
    id: 'q1_work_area', block: 'your_work', type: 'single',
    question: 'Which best describes your work area?',
    options: [
      { value: 'admin_ops', label: 'Administration / Office Operations' },
      { value: 'finance', label: 'Finance / Accounting' },
      { value: 'hr', label: 'HR / People Operations' },
      { value: 'marketing', label: 'Marketing / Communications' },
      { value: 'sales', label: 'Sales' },
      { value: 'it_support', label: 'IT / Tech Support' },
      { value: 'project_mgmt', label: 'Project Management' },
      { value: 'customer_service', label: 'Customer Service' },
      { value: 'legal', label: 'Legal' },
      { value: 'management', label: 'Management / Leadership' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'q2_daily_tasks', block: 'your_work', type: 'multi',
    question: 'What do you spend the most time on in a typical work week? (Select your top 3)',
    options: [
      { value: 'writing', label: 'Writing documents / reports' },
      { value: 'data', label: 'Analyzing data / spreadsheets' },
      { value: 'clients', label: 'Communicating with clients' },
      { value: 'managing', label: 'Managing people / teams' },
      { value: 'presentations', label: 'Creating presentations' },
      { value: 'processing', label: 'Processing / organizing information' },
      { value: 'research', label: 'Research' },
      { value: 'scheduling', label: 'Scheduling / coordination' },
      { value: 'creative', label: 'Creative work / design' },
      { value: 'troubleshooting', label: 'Problem-solving / troubleshooting' },
      { value: 'physical', label: 'Manual / physical tasks' },
      { value: 'calls', label: 'Phone / video calls' },
    ],
  },
  {
    id: 'q3_computer_pct', block: 'your_work', type: 'slider',
    question: 'What percentage of your workday is spent in front of a computer?',
    slider_min: 0, slider_max: 100, slider_labels: ['0%', '100%'],
  },
  {
    id: 'q4_repetitive', block: 'your_work', type: 'single',
    question: 'How much of your daily work follows a predictable, repeatable pattern?',
    options: [
      { value: '1', label: 'Every day is completely different' },
      { value: '2', label: 'Mostly different with some routine' },
      { value: '3', label: 'About half routine, half new' },
      { value: '4', label: 'Mostly routine with some variety' },
      { value: '5', label: 'I do essentially the same things every day' },
    ],
  },
  {
    id: 'q8_tools_used', block: 'ai_experience', type: 'multi',
    question: 'Which of these have you personally used for work tasks?',
    options: [
      { value: 'chatgpt', label: 'ChatGPT' },
      { value: 'claude', label: 'Claude' },
      { value: 'copilot', label: 'Copilot / Bing AI' },
      { value: 'gemini', label: 'Google Gemini' },
      { value: 'image_ai', label: 'Midjourney / DALL-E' },
      { value: 'embedded', label: 'AI features in software I already use (e.g., Grammarly, Excel Copilot)' },
      { value: 'other', label: 'Other AI tools' },
      { value: 'none', label: 'None of these' },
    ],
  },
  {
    id: 'q9_ai_usage', block: 'ai_experience', type: 'multi',
    question: 'When you last used an AI tool for work, what did you do?',
    options: [
      { value: 'question', label: 'Asked it a simple question' },
      { value: 'write', label: 'Had it write or edit text' },
      { value: 'analyze', label: 'Used it to analyze data' },
      { value: 'brainstorm', label: 'Used it to brainstorm ideas' },
      { value: 'summarize', label: 'Used it to summarize something' },
      { value: 'code', label: 'Used it to code or create formulas' },
      { value: 'none', label: "I haven't used AI for work" },
    ],
  },
  {
    id: 'q10_ai_output', block: 'ai_experience', type: 'single',
    question: 'When AI gives you a response, what do you typically do?',
    options: [
      { value: 'as_is', label: 'Use it as-is' },
      { value: 'minor_edits', label: 'Make minor edits' },
      { value: 'major_rewrite', label: 'Substantially rewrite it' },
      { value: 'starting_point', label: 'Use it as a starting point and rebuild' },
      { value: 'revise', label: 'Ask AI to revise it' },
      { value: 'depends', label: 'It depends on the task' },
    ],
  },
  {
    id: 'q11_confidence', block: 'ai_experience', type: 'single',
    question: 'If asked to use AI to turn a messy dataset into an executive summary with recommendations, how confident would you feel?',
    options: [
      { value: '1', label: "I wouldn't know where to start" },
      { value: '2', label: "I'd struggle but could try" },
      { value: '3', label: 'I could probably figure it out' },
      { value: '4', label: "I'd be fairly comfortable" },
      { value: '5', label: 'I could do this easily right now' },
    ],
  },
  {
    id: 'q12_error_detection', block: 'ai_experience', type: 'single',
    question: 'Have you ever gotten a result from AI that was clearly wrong or misleading?',
    options: [
      { value: 'caught_fast', label: 'Yes — I caught it immediately' },
      { value: 'caught_slow', label: 'Yes — but it took me a while to notice' },
      { value: 'unsure', label: "I'm not sure" },
      { value: 'no', label: 'No' },
      { value: 'not_enough', label: "I haven't used AI enough to say" },
    ],
  },
  {
    id: 'q_new_tools', block: 'your_goals', type: 'single',
    question: 'How do you typically react when a new tool or process is introduced at work?',
    options: [
      { value: 'jump_in', label: 'I jump in and figure it out' },
      { value: 'show_me', label: "I'll try it if someone shows me first" },
      { value: 'wait', label: 'I wait until I have to use it' },
      { value: 'stick', label: 'I prefer sticking with what works' },
    ],
  },
  {
    id: 'q25_time_available', block: 'your_goals', type: 'single',
    question: 'How much time per week could you realistically dedicate to learning new skills?',
    options: [
      { value: '<1', label: 'Less than 1 hour' },
      { value: '1-2', label: '1-2 hours' },
      { value: '3-5', label: '3-5 hours' },
      { value: '5+', label: '5+ hours' },
      { value: 'none', label: 'I genuinely have no spare time' },
    ],
  },
  {
    id: 'q26_reason', block: 'your_goals', type: 'single',
    question: "What's the main reason you're taking this assessment?",
    options: [
      { value: 'worried', label: "I'm worried about my job security" },
      { value: 'ahead', label: 'I want to get ahead of the curve' },
      { value: 'company', label: 'My company suggested it' },
      { value: 'curious', label: "I'm just curious" },
      { value: 'learn', label: "I want to use AI better but don't know where to start" },
    ],
  },
  {
    id: 'q28_value', block: 'your_goals', type: 'single',
    question: 'What would be most valuable to you right now?',
    options: [
      { value: 'clear_picture', label: 'A clear picture of how AI affects my specific role' },
      { value: 'hands_on', label: 'Hands-on practice using AI for my actual work tasks' },
      { value: 'plan', label: 'A step-by-step plan to make myself more valuable' },
      { value: 'proof', label: "Proof I can show my employer that I'm AI-ready" },
      { value: 'peace', label: 'Honestly, just peace of mind' },
    ],
  },
];

const QUESTIONS_HU: AssessmentQuestion[] = [
  {
    id: 'q1_work_area', block: 'your_work', type: 'single',
    question: 'Melyik írja le legjobban a munkaterületedet?',
    options: [
      { value: 'admin_ops', label: 'Adminisztráció / Irodai műveletek' },
      { value: 'finance', label: 'Pénzügy / Könyvelés' },
      { value: 'hr', label: 'HR / Személyügyi műveletek' },
      { value: 'marketing', label: 'Marketing / Kommunikáció' },
      { value: 'sales', label: 'Értékesítés' },
      { value: 'it_support', label: 'IT / Technikai támogatás' },
      { value: 'project_mgmt', label: 'Projektmenedzsment' },
      { value: 'customer_service', label: 'Ügyfélszolgálat' },
      { value: 'legal', label: 'Jogi' },
      { value: 'management', label: 'Menedzsment / Vezetés' },
      { value: 'other', label: 'Egyéb' },
    ],
  },
  {
    id: 'q2_daily_tasks', block: 'your_work', type: 'multi',
    question: 'Egy átlagos munkahéten mire fordítod a legtöbb időt? (Válaszd ki a top 3-at)',
    options: [
      { value: 'writing', label: 'Dokumentumok / riportok írása' },
      { value: 'data', label: 'Adatelemzés / táblázatkezelés' },
      { value: 'clients', label: 'Ügyfélkommunikáció' },
      { value: 'managing', label: 'Csapatvezetés / emberek irányítása' },
      { value: 'presentations', label: 'Prezentációk készítése' },
      { value: 'processing', label: 'Információ feldolgozása / rendszerezése' },
      { value: 'research', label: 'Kutatás' },
      { value: 'scheduling', label: 'Időbeosztás / koordináció' },
      { value: 'creative', label: 'Kreatív munka / dizájn' },
      { value: 'troubleshooting', label: 'Problémamegoldás / hibaelhárítás' },
      { value: 'physical', label: 'Fizikai / kézi feladatok' },
      { value: 'calls', label: 'Telefonhívások / videóhívások' },
    ],
  },
  {
    id: 'q3_computer_pct', block: 'your_work', type: 'slider',
    question: 'A munkanapod hány százalékát töltöd számítógép előtt?',
    slider_min: 0, slider_max: 100, slider_labels: ['0%', '100%'],
  },
  {
    id: 'q4_repetitive', block: 'your_work', type: 'single',
    question: 'Mennyire követi a napi munkád kiszámítható, ismétlődő mintákat?',
    options: [
      { value: '1', label: 'Minden nap teljesen más' },
      { value: '2', label: 'Többnyire más, némi rutinnal' },
      { value: '3', label: 'Fele rutin, fele új' },
      { value: '4', label: 'Többnyire rutin, némi változatossággal' },
      { value: '5', label: 'Lényegében minden nap ugyanazt csinálom' },
    ],
  },
  {
    id: 'q8_tools_used', block: 'ai_experience', type: 'multi',
    question: 'Melyiket használtad már személyesen munkafeladatokra?',
    options: [
      { value: 'chatgpt', label: 'ChatGPT' },
      { value: 'claude', label: 'Claude' },
      { value: 'copilot', label: 'Copilot / Bing AI' },
      { value: 'gemini', label: 'Google Gemini' },
      { value: 'image_ai', label: 'Midjourney / DALL-E' },
      { value: 'embedded', label: 'AI funkciók a meglévő szoftverekben (pl. Grammarly, Excel Copilot)' },
      { value: 'other', label: 'Egyéb AI eszközök' },
      { value: 'none', label: 'Ezek közül egyiket sem' },
    ],
  },
  {
    id: 'q9_ai_usage', block: 'ai_experience', type: 'multi',
    question: 'Amikor legutóbb AI eszközt használtál munkára, mit csináltál?',
    options: [
      { value: 'question', label: 'Feltettem egy egyszerű kérdést' },
      { value: 'write', label: 'Szöveget írtam vagy szerkesztettem vele' },
      { value: 'analyze', label: 'Adatokat elemeztem vele' },
      { value: 'brainstorm', label: 'Ötleteltem vele' },
      { value: 'summarize', label: 'Összefoglalást készítettem' },
      { value: 'code', label: 'Kódot vagy képleteket készítettem' },
      { value: 'none', label: 'Nem használtam még AI-t munkára' },
    ],
  },
  {
    id: 'q10_ai_output', block: 'ai_experience', type: 'single',
    question: 'Amikor az AI ad egy választ, általában mit teszel?',
    options: [
      { value: 'as_is', label: 'Úgy használom, ahogy van' },
      { value: 'minor_edits', label: 'Kisebb szerkesztéseket végzek' },
      { value: 'major_rewrite', label: 'Jelentősen átírom' },
      { value: 'starting_point', label: 'Kiindulási pontként használom és újraépítem' },
      { value: 'revise', label: 'Megkérem az AI-t, hogy javítsa' },
      { value: 'depends', label: 'A feladattól függ' },
    ],
  },
  {
    id: 'q11_confidence', block: 'ai_experience', type: 'single',
    question: 'Ha arra kérnének, hogy AI-val egy rendezetlen adathalmazból vezetői összefoglalót készíts ajánlásokkal, mennyire lennél magabiztos?',
    options: [
      { value: '1', label: 'Fogalmam sem lenne, hol kezdjem' },
      { value: '2', label: 'Küszködnék, de megpróbálnám' },
      { value: '3', label: 'Valószínűleg kitalálnám' },
      { value: '4', label: 'Viszonylag magabiztosan csinálnám' },
      { value: '5', label: 'Könnyedén megoldanám most azonnal' },
    ],
  },
  {
    id: 'q12_error_detection', block: 'ai_experience', type: 'single',
    question: 'Kaptál már AI-tól egyértelműen hibás vagy félrevezető eredményt?',
    options: [
      { value: 'caught_fast', label: 'Igen — azonnal észrevettem' },
      { value: 'caught_slow', label: 'Igen — de csak később vettem észre' },
      { value: 'unsure', label: 'Nem vagyok benne biztos' },
      { value: 'no', label: 'Nem' },
      { value: 'not_enough', label: 'Nem használtam eleget ahhoz, hogy megmondjam' },
    ],
  },
  {
    id: 'q_new_tools', block: 'your_goals', type: 'single',
    question: 'Hogyan reagálsz általában, amikor új eszközt vagy folyamatot vezetnek be a munkahelyeden?',
    options: [
      { value: 'jump_in', label: 'Belevágok és kitalálom' },
      { value: 'show_me', label: 'Kipróbálom, ha valaki megmutatja' },
      { value: 'wait', label: 'Megvárom, amíg muszáj használnom' },
      { value: 'stick', label: 'Inkább maradok annál, ami bevált' },
    ],
  },
  {
    id: 'q25_time_available', block: 'your_goals', type: 'single',
    question: 'Hetente reálisan mennyi időt tudnál szánni új készségek tanulására?',
    options: [
      { value: '<1', label: 'Kevesebb, mint 1 óra' },
      { value: '1-2', label: '1-2 óra' },
      { value: '3-5', label: '3-5 óra' },
      { value: '5+', label: '5+ óra' },
      { value: 'none', label: 'Tényleg nincs rá szabad időm' },
    ],
  },
  {
    id: 'q26_reason', block: 'your_goals', type: 'single',
    question: 'Mi a fő oka annak, hogy kitöltöd ezt a kérdőívet?',
    options: [
      { value: 'worried', label: 'Aggódom a munkahelyem biztonsága miatt' },
      { value: 'ahead', label: 'Előnybe akarok kerülni' },
      { value: 'company', label: 'A cégem javasolta' },
      { value: 'curious', label: 'Csak kíváncsi vagyok' },
      { value: 'learn', label: 'Jobban akarom használni az AI-t, de nem tudom, hol kezdjem' },
    ],
  },
  {
    id: 'q28_value', block: 'your_goals', type: 'single',
    question: 'Mi lenne a legértékesebb számodra most?',
    options: [
      { value: 'clear_picture', label: 'Világos kép arról, hogyan érinti az AI a munkaköreimet' },
      { value: 'hands_on', label: 'Gyakorlati feladatok a tényleges munkámhoz' },
      { value: 'plan', label: 'Lépésről lépésre terv, hogyan lehetek értékesebb' },
      { value: 'proof', label: 'Bizonyíték a munkaadómnak, hogy AI-kész vagyok' },
      { value: 'peace', label: 'Őszintén szólva, csak nyugalom' },
    ],
  },
];

export function getBlockLabels(lang: string) {
  return BLOCK_LABELS_ALL[lang === 'hu' ? 'hu' : 'en'];
}

export function getQuestions(lang: string) {
  return lang === 'hu' ? QUESTIONS_HU : QUESTIONS_EN;
}

// Backwards-compatible exports for English (default)
export const BLOCK_LABELS = BLOCK_LABELS_ALL.en;
export const ASSESSMENT_QUESTIONS = QUESTIONS_EN;
