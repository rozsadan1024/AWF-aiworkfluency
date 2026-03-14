-- =============================================
-- Quick Pill Seed Data — 15 Curated Pills
-- Run AFTER supabase-schema-qp.sql
-- =============================================

-- PROMPT CRAFT (3 pills)

INSERT INTO public.qp_pills (theme, title, knowledge_text, task_prompt, task_type, difficulty, sort_order) VALUES
('prompt_craft', 'The Role-Audience-Format Triangle',
'Most people type a request into AI and hope for the best. The difference between a mediocre result and a great one often comes down to three things you specify upfront: Role, Audience, and Format.

Role tells the AI WHO it should think like. "Act as a senior marketing manager" produces very different output than "Act as an intern." The AI adjusts vocabulary, depth, and assumptions based on the role you assign.

Audience tells the AI WHO will read the output. Writing for a CEO is different from writing for a new hire. When you specify "this will be read by non-technical board members," the AI strips jargon and adds context automatically.

Format tells the AI WHAT the output should look like. "Give me a bullet-point summary" vs "Write a formal memo" vs "Create a comparison table" — same information, completely different delivery.

The magic happens when you combine all three: "Act as a financial analyst (role), writing for our CEO who needs to present this to investors (audience), in a one-page executive summary with 3 key metrics highlighted (format)."

Try adding just these three elements to your next AI prompt and notice the difference.',
'Here is a task you might face at work: You need to summarize last quarter''s customer feedback (mostly complaints about slow response times) for your team meeting tomorrow.

Write a prompt that includes all three elements of the Role-Audience-Format triangle. Your prompt should be ready to paste into ChatGPT or Claude.',
'generate', 'easy', 1),

('prompt_craft', 'The Power of Examples (Few-Shot Prompting)',
'One of the most effective ways to get better AI output is embarrassingly simple: show it an example of what you want.

This technique is called "few-shot prompting." Instead of describing what you want in abstract terms, you show the AI one or two concrete examples, then ask it to follow the same pattern.

Why does this work so well? Because AI is fundamentally a pattern-matching system. When you show it an example, you are giving it a precise template to follow — far more precise than any verbal description.

Bad prompt: "Write professional email subject lines for our product updates."
Good prompt: "Write professional email subject lines for our product updates. Here are examples of the style I want:
- Feature X is here: 3 ways it saves you time
- Your monthly product digest: What changed in March
Now write 5 more in this exact style for our April updates."

The examples communicate tone, length, structure, and style all at once — things that would take a paragraph to describe in words.

You can use this for any repeating task: email templates, report formats, data categorization, meeting agendas, feedback writing. Show one good example, and the AI will produce dozens more in the same style.',
'Your company sends weekly internal updates to all staff. Here is an example of a good update intro:

"Happy Monday, team! This week we shipped the new dashboard, welcomed 3 new hires in Engineering, and hit our Q1 pipeline target. Here is what matters for your week ahead."

Using the few-shot technique, write a prompt that asks AI to generate 3 more weekly update intros in this same style. Your prompt must include the example above and clear instructions.',
'generate', 'easy', 2),

('prompt_craft', 'Constraint-Driven Prompting',
'Here is a counterintuitive truth about AI: giving it MORE constraints produces BETTER output. When you say "write me an email," the AI has infinite choices and usually picks something generic. When you say "write a 3-sentence email, opening with a question, closing with a specific ask, in a warm but professional tone" — the constraints force creativity within boundaries.

Think of it like poetry: a haiku is more powerful than a rambling paragraph because the 5-7-5 constraint forces precision.

Useful constraints to add to any prompt:
- Length: "in exactly 5 bullet points" or "under 100 words"
- Structure: "start with the conclusion, then support it"
- Exclusions: "do NOT use jargon" or "avoid the word innovative"
- Perspective: "write as if explaining to someone who disagrees"
- Time: "this needs to be actionable by Friday"

The more specific your constraints, the less editing you will need afterward. A well-constrained prompt often produces output you can use with zero changes.

Pro tip: if AI output feels too generic, you probably have not given enough constraints. Add two more and try again.',
'You need to write a Slack message to your team about a project delay. The project was supposed to launch Monday but will now launch Wednesday due to a vendor issue.

Write a prompt with at least 4 specific constraints (length, tone, structure, content rules, etc.) that would produce a message you could send without editing. List your constraints clearly before the prompt itself.',
'generate', 'medium', 3);

-- AI LITERACY (3 pills)

INSERT INTO public.qp_pills (theme, title, knowledge_text, task_prompt, task_type, difficulty, sort_order) VALUES
('ai_literacy', 'Why AI Hallucinates (And How to Catch It)',
'AI does not "know" things the way you do. It predicts the most likely next word based on patterns in its training data. This means it can confidently produce text that sounds perfect but is completely wrong. This is called "hallucination."

Common hallucination patterns to watch for:
1. Fake citations — AI invents author names, journal titles, and URLs that look real but do not exist
2. Plausible statistics — "Studies show that 73% of..." with no actual study behind it
3. Fictional people and companies — AI creates realistic-sounding names for people and organizations that never existed
4. Confident wrong answers — AI says "The deadline is March 15" when no deadline was mentioned

How to catch hallucinations:
- Numbers: If AI gives you a specific statistic, ask "where is this number from?" If it cannot give you a real, verifiable source, the number is likely invented
- Names: Google any person, company, or publication the AI mentions
- Logic check: Does the output make sense given what you already know? Trust your domain expertise
- The "are you sure?" test: Ask the AI to verify its own claim. If it backtracks or changes the answer, the original was likely hallucinated

The rule of thumb: the more specific and confident an AI claim sounds, the more you should verify it.',
'Below is an AI-generated paragraph about a fictional company. It contains 3 hallucinated facts mixed with reasonable statements. Identify which statements are likely hallucinated and explain your reasoning.

"TechPulse Analytics, founded in 2019 by Dr. Sarah Chen, reported a 47% increase in enterprise adoption in Q3 2025 according to their latest SEC filing. The company''s proprietary NeuralSort algorithm processes data 3.2x faster than traditional methods, as verified by the Stanford AI Benchmark Index. Their main competitor, DataStream Inc., recently acquired a 12% market share in the Nordic region."',
'analyze', 'easy', 4),

('ai_literacy', 'The Context Window: Why AI Forgets',
'Every AI model has a "context window" — a maximum amount of text it can process at once. Think of it as the AI''s working memory. Once the conversation exceeds this limit, older messages get pushed out and the AI literally forgets what you discussed earlier.

Current context windows (approximate):
- ChatGPT-4: ~128,000 tokens (~100 pages)
- Claude Sonnet: ~200,000 tokens (~150 pages)
- Most free-tier models: ~4,000-8,000 tokens (~3-6 pages)

Even within the context window, AI pays less attention to information in the middle of a long conversation. This is called the "lost in the middle" problem — the AI remembers the beginning and the end best.

Practical implications for your work:
- Long conversations degrade quality. Start fresh when switching topics
- Put your most important instructions at the beginning or end of your prompt
- If AI seems to forget a constraint you set earlier, it probably did — repeat it
- For long documents, summarize first, then ask questions about the summary
- Copy-pasting a 50-page report into AI does not mean it read all 50 pages equally

When you notice AI contradicting something from earlier in the conversation, it is almost always a context window issue, not a "thinking" error.',
'You have been chatting with AI for 15 messages about a project plan. Now the AI suggests a timeline that contradicts a constraint you mentioned in message 3 (the project must be done before a holiday weekend).

Write 2-3 sentences explaining: (1) why this happened, and (2) what you would do to fix it in this conversation.',
'analyze', 'easy', 5),

('ai_literacy', 'AI Cannot Access Your Company Data (Unless You Paste It)',
'A common misconception: people think AI "knows about" their company because it gives plausible-sounding answers about internal processes. It does not. Standard AI tools like ChatGPT and Claude have zero access to your internal systems, emails, documents, or databases.

When AI writes something that sounds like it knows your company, it is doing one of two things:
1. Generating generic business content that sounds specific (e.g., "Your Q3 results show positive momentum" — this sounds informed but means nothing)
2. Using information YOU pasted into the conversation

This has two important consequences:

First, if you ask AI about your company without providing context, every "fact" it states is invented. "Write our company''s vacation policy" without pasting the actual policy will produce a fictional policy that sounds professional.

Second, if you DO paste sensitive data into AI, you should know where it goes. Most consumer AI tools (ChatGPT, Claude web) may use your conversations for training unless you opt out. Enterprise versions (ChatGPT Enterprise, Claude for Business) contractually do not train on your data.

Before pasting anything into AI, ask: "Would I be comfortable if this appeared in someone else''s AI response?" If the answer is no, do not paste it — or use an enterprise-grade tool with data protection guarantees.',
'Your colleague says: "I asked ChatGPT to review our employee satisfaction survey results and it said morale is declining, especially in the engineering department. Should we act on this?"

Write a response to your colleague explaining what actually happened and what they should do instead. Keep it professional and helpful, not condescending.',
'generate', 'easy', 6);

-- WORKFLOW HACKS (2 pills)

INSERT INTO public.qp_pills (theme, title, knowledge_text, task_prompt, task_type, difficulty, sort_order) VALUES
('workflow_hacks', 'The Morning Brief: One Prompt to Start Your Day',
'Instead of spending 20 minutes scanning emails, calendars, and Slack messages to figure out what matters today, you can create a "morning brief" — a single prompt that synthesizes your day in 60 seconds.

The technique: every morning, copy-paste three things into AI — (1) your calendar for today, (2) the subject lines of your unread emails, and (3) any deadlines or to-dos from your task manager. Then ask AI to produce a structured brief.

Here is a template that works:

"Here is my day. Organize this into a morning brief with: (1) top 3 priorities, (2) meetings I need to prepare for, (3) emails that need a response today, (4) anything I can delegate or skip.

Calendar: [paste]
Emails: [paste subject lines]
Tasks: [paste]"

Why this works: AI is excellent at triaging and prioritizing information when given clear criteria. It catches things you might miss — like two back-to-back meetings with no prep time, or an email from your boss buried under 30 newsletters.

Important: only paste subject lines for emails, not full content. This keeps sensitive information out of AI while still letting it prioritize your inbox.',
'Here is a sample morning situation:

Calendar: 9:00 Team standup, 10:30 Client call with Meridian Corp (Q2 review), 13:00 Lunch, 14:00 1:1 with manager, 16:00 All-hands meeting
Emails (subject lines): "RE: Q2 numbers attached", "Urgent: server downtime last night", "Team lunch Friday?", "Your travel reimbursement approved", "Meridian Corp - agenda for tomorrow''s call", "Newsletter: Top 10 AI tools", "FW: Budget approval needed by EOD"
Tasks: Finish slide deck for all-hands, review intern''s report, submit expense report

Write a morning brief prompt using this data. Then write what you think the AI''s output should look like (your expected brief).',
'generate', 'easy', 7),

('workflow_hacks', 'The "Draft 3 Versions" Trick',
'When you need to write something important — an email to a client, a message to your boss, a response to a complaint — do not ask AI for one version. Ask for three.

Why? Because seeing three different approaches side by side is the fastest way to figure out what you actually want. It is much easier to point at Version B and say "this one, but with the opening from Version A" than to describe your ideal tone from scratch.

The prompt pattern: "Write 3 versions of [what you need]. Version 1: formal and diplomatic. Version 2: friendly and direct. Version 3: brief and action-oriented. Each version should be [length constraint]."

This works for:
- Emails (especially sensitive ones)
- Slack messages announcing changes
- Feedback for team members
- Responses to client complaints
- LinkedIn posts or social media updates

The hidden benefit: you often realize that the "right" answer is a mix of two versions. This is faster than iterating one version five times.

Power move: after picking your favorite, ask AI "combine the opening of Version 1 with the body of Version 3, and make it 20% shorter." This second prompt produces a polished result in seconds.',
'Scenario: A client (GreenLeaf Solutions) has asked for a project extension. You can give them 1 extra week, but not the 3 weeks they asked for. You need to say yes to 1 week while managing expectations about the remaining scope.

Write a "draft 3 versions" prompt that would generate 3 different email responses. Specify the tone for each version and any constraints. Make it specific enough that someone else on your team could use this prompt and get usable results.',
'generate', 'medium', 8);

-- TOOL SPOTLIGHT (3 pills)

INSERT INTO public.qp_pills (theme, title, knowledge_text, task_prompt, task_type, difficulty, sort_order) VALUES
('tool_spotlight', 'Custom Instructions: Set It Once, Benefit Forever',
'Most people start every AI conversation from zero. They re-explain their role, their preferences, and their context every single time. This is like introducing yourself to your assistant every morning.

Both ChatGPT and Claude offer "Custom Instructions" (or "System Prompts" in Claude) — a place to set persistent context that applies to every conversation. Once configured, the AI always knows who you are.

What to include in your custom instructions:
- Your role and industry: "I am a marketing manager at a B2B SaaS company with 200 employees"
- Your communication preferences: "I prefer bullet points over paragraphs. Keep responses under 300 words unless I ask for more"
- Your audience: "Most of my writing is for C-level executives and enterprise clients"
- Your tools: "I use Google Workspace, Salesforce, and Slack daily"
- Your pet peeves: "Never use the word ''delve.'' Do not start emails with ''I hope this finds you well''"

In ChatGPT: Settings → Personalization → Custom Instructions
In Claude: Start a new Project with a system prompt

The compound effect is significant. Over a month of daily use, custom instructions save you from typing the same context thousands of times — and every response is better calibrated to your actual needs.',
'Write your own custom instructions (8-12 lines) that you would set in ChatGPT or Claude. Include: your role, industry, typical tasks, communication preferences, and at least one specific thing you want AI to always do or never do. Make it specific to YOUR actual work, not generic.',
'generate', 'easy', 9),

('tool_spotlight', 'AI + Spreadsheets: The Formulas You Never Have to Google Again',
'If you have ever spent 20 minutes Googling an Excel or Google Sheets formula, AI has already solved this problem for you. Modern AI is remarkably good at writing spreadsheet formulas — often better than dedicated formula generators.

The key is describing WHAT you want, not HOW to do it:
- Bad: "Write me a VLOOKUP formula"
- Good: "I have employee names in column A and their departments in column B. I need a formula that counts how many employees are in the Marketing department"

AI handles complex formulas that would take an expert to write:
- Nested IF statements with multiple conditions
- XLOOKUP with fuzzy matching
- Array formulas for dynamic ranges
- Conditional formatting rules
- Pivot table suggestions based on your data structure

Pro tips:
- Always tell AI which tool you use (Excel vs Google Sheets — formulas differ slightly)
- Paste your column headers so AI knows your data structure
- Ask AI to explain the formula so you can modify it later
- Test on a small dataset before applying to your full spreadsheet

The workflow: describe the problem in plain English → get the formula → paste it → verify on 3-5 rows → apply to full dataset.',
'You have a spreadsheet with these columns: A = Employee Name, B = Department, C = Start Date, D = Salary. You need to find out:
1. The average salary in the Engineering department
2. How many employees started after January 1, 2025
3. The highest-paid employee''s name

Write the prompts you would give to AI to get these three formulas. Specify whether you are using Excel or Google Sheets.',
'generate', 'easy', 10),

('tool_spotlight', 'Meeting Notes to Action Items in 60 Seconds',
'Meetings generate a lot of talk and very little structured output. The gap between "we discussed it" and "here is who does what by when" is where most projects lose momentum.

AI excels at this exact transformation: unstructured meeting notes → structured action items. The technique is simple but the prompt matters.

The prompt template:
"Here are my raw meeting notes. Extract: (1) Decisions made, (2) Action items with owner and deadline, (3) Open questions that need follow-up, (4) Key discussion points for the record. Format as a clean summary I can paste into Slack/email."

Tips for better results:
- Include attendee names in your notes (even just first names) so AI can assign action items
- Capture direct quotes for important decisions: "Maria said: approved" is more useful than "budget discussed"
- Note disagreements and unresolved items — AI will flag these as open questions
- If you use a transcription tool (Otter, Teams, Zoom), paste the raw transcript — AI handles messy text well

This works for any meeting type: standups, 1:1s, client calls, brainstorms, all-hands. The 60 seconds you spend prompting AI saves 15-20 minutes of manual note cleanup.',
'Here are raw, messy meeting notes from a project kickoff:

"Met with Sarah, Tom and Lisa. Project Apollo, launching new customer portal. Sarah wants it done by end of Q2 but Tom says eng needs at least 8 weeks so maybe mid-May realistic. Lisa handling design, needs brand guidelines from marketing — hasn''t received them yet. Budget approved at 45k, Tom asked if we can get an extra contractor, Sarah said maybe, needs to check with finance. Decided to use React, not Angular. Weekly standups starting next Monday 10am. Tom will set up the repo by Friday. Lisa needs access to Figma — ask IT. Sarah will send project brief to stakeholders by Wednesday."

Write a prompt that transforms these notes into a structured summary. Then write what you expect the output to look like.',
'generate', 'medium', 11);

-- CRITICAL THINKING (2 pills)

INSERT INTO public.qp_pills (theme, title, knowledge_text, task_prompt, task_type, difficulty, sort_order) VALUES
('critical_thinking', 'The 3-Second Sanity Check: Numbers, Names, Dates',
'Before you use ANY AI output in professional communication, run a 3-second sanity check on three things: numbers, names, and dates. These are the three categories where AI hallucination causes the most real-world damage.

Numbers: AI invents statistics constantly. "Revenue grew 23% year-over-year" — did it? Check against the actual data. Any percentage, dollar amount, or count that AI generates should be treated as a placeholder until verified. This takes 10 seconds and prevents embarrassing corrections.

Names: AI generates plausible-sounding names for people, companies, products, and publications. If AI mentions a person by name in a summary you did not provide, that person might not exist. If it cites a report or study by name, Google it. Sending a client an email that references a "McKinsey 2024 AI Adoption Report" that does not exist destroys credibility instantly.

Dates: AI is particularly bad with dates. It might say "the EU AI Act takes effect in March 2025" when the actual date is different. It confuses announcement dates with enforcement dates, fiscal years with calendar years, and deadlines with publication dates.

The habit to build: every time you are about to send, post, or present AI-generated content, scan it once for specific numbers, proper nouns, and dates. If you find any, verify them. This 3-second habit will save you from the most common AI-caused professional mistakes.',
'Below is an AI-generated email summary your colleague wants to send to a client. Apply the 3-second sanity check. List every number, name, and date that should be verified before sending, and explain WHY each one is risky.

"Hi Jennifer, Following up on our call last Tuesday. As we discussed, the Henderson Group project is tracking well — we are at 67% completion as of March 3rd, slightly ahead of the timeline Dr. Patel outlined in the Phase 2 report. The projected savings of $142,000 annually align with the Gartner benchmark for companies your size. I will send the updated Gantt chart by Friday, March 14th. Best, Alex"',
'analyze', 'easy', 12),

('critical_thinking', 'When NOT to Use AI: The Decision Framework',
'AI is not always the answer. Sometimes it is faster, better, or safer to do things manually. Knowing when NOT to use AI is just as important as knowing how to use it.

Use AI when:
- The task is repetitive and template-based (emails, reports, summaries)
- You need a first draft to react to (easier to edit than to create from scratch)
- You are stuck and need ideas (brainstorming, alternative approaches)
- The task involves transforming data from one format to another
- You need to process more text than a human can read in the available time

Do NOT use AI when:
- The task takes less than 2 minutes manually (writing the prompt takes longer)
- Accuracy is critical and you cannot verify (legal documents, medical advice, financial figures)
- The content is highly confidential (trade secrets, employee PII, unreleased financials)
- You need original creative work with your personal voice (opinion pieces, personal messages)
- The task requires real-time or live data (stock prices, current weather, today''s news)
- You are making a decision that affects people''s lives or careers

The hidden cost of AI: even when AI CAN do something, the time spent prompting, reviewing, and correcting might exceed the time to do it yourself. A 30-second task does not need AI. A 30-minute task probably does.

Build the habit: before opening AI, ask yourself "Would a 2-minute Google search or 3-minute manual effort solve this faster?"',
'Below are 6 work scenarios. For each one, decide: USE AI or DO IT MANUALLY. Write a one-sentence justification for each.

1. Writing a thank-you note to a colleague who helped you on a project
2. Summarizing a 15-page quarterly report for your manager
3. Looking up your company''s current stock price
4. Creating 20 variations of a product description for A/B testing
5. Responding to an angry customer complaint about a billing error
6. Converting a CSV file with 500 rows into a formatted table with conditional highlighting',
'classify', 'easy', 13);

-- AI NEWS (2 pills)

INSERT INTO public.qp_pills (theme, title, knowledge_text, task_prompt, task_type, difficulty, sort_order) VALUES
('ai_news', 'The EU AI Act: What Every Office Worker Should Know',
'The European Union''s AI Act is the world''s first comprehensive AI regulation. Even if you are not in Europe, it matters because many global companies must comply if they serve EU customers. Here is what affects your daily work:

What is it? A law that classifies AI systems by risk level and sets rules for each:
- Unacceptable risk (banned): AI that manipulates people, social scoring systems
- High risk (heavily regulated): AI used in hiring, credit scoring, law enforcement
- Limited risk (transparency required): Chatbots must disclose they are AI
- Minimal risk (no restrictions): Most office AI tools like ChatGPT, Claude, Copilot

What does this mean for you?
1. If your company uses AI for hiring or HR decisions, those systems need human oversight and documentation
2. If you use AI chatbots to interact with customers, you must disclose that it is AI
3. AI-generated content must be labeled as such in certain contexts
4. Your company needs an AI policy — if it does not have one, ask about it

Key dates: The Act entered into force in August 2024. Banned practices took effect February 2025. Most provisions apply from August 2026.

Your action item: find out if your company has an AI usage policy. If it does not, you now know enough to suggest one should be created.',
'Your manager asks: "Can we use ChatGPT to screen job applications and automatically reject candidates who score below a threshold?"

Write a 3-4 sentence response that addresses: (1) whether this is allowed under the EU AI Act, (2) what risk category this falls into, and (3) what the company would need to do if they want to proceed.',
'analyze', 'medium', 14),

('ai_news', 'AI Agents: What They Are and Why They Matter for Your Job',
'You have probably heard the term "AI agents" — it is one of the biggest shifts in AI for 2025-2026. Understanding what agents are will help you prepare for how your work will change.

What is an AI agent? Unlike a chatbot that answers one question at a time, an AI agent can plan a multi-step task, use tools (browse the web, write files, send emails), and work somewhat autonomously. Think of it as the difference between asking someone a question (chatbot) and delegating a task to them (agent).

Current examples:
- Claude and ChatGPT can now browse the web, run code, and analyze files in a single conversation
- Microsoft Copilot can draft an email, check your calendar for conflicts, and suggest a meeting time — all in one request
- AI coding agents can read a bug report, find the relevant code, write a fix, and submit it for review

What this means for office work:
- Tasks that currently take 5 steps ("find data → analyze → draft report → format → send") will be done in 1 prompt
- You will shift from "doing tasks" to "reviewing AI''s work" — quality control becomes your primary skill
- The ability to write clear task descriptions (scope, constraints, deliverable) becomes more valuable than technical skills
- Repetitive multi-step processes (expense reports, onboarding checklists, weekly reports) are the first to be automated

This is not about replacement — it is about the nature of your work changing. The people who understand agents and can direct them effectively will have a significant advantage.',
'Imagine AI agents become widely available in your workplace next month. Pick one recurring multi-step task from your work (or use this example: "preparing a weekly status report by collecting updates from 3 team members, compiling them, and sending to the manager").

Describe: (1) how you do this task today (the steps), (2) how an AI agent could handle it, and (3) what YOUR role would become (what you still need to do that the agent cannot).',
'compare', 'medium', 15);
