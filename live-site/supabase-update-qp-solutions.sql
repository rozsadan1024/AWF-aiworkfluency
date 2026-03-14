-- Update all 15 pills with example_solution and takeaway

UPDATE qp_pills SET
  example_solution = 'Act as a marketing coordinator at a tech startup (role). I need to summarize our Q1 customer feedback — mostly complaints about slow response times — for my team meeting tomorrow (context). The audience is my direct team of 6 people who already know the product but need the key themes highlighted (audience). Format it as 3-5 bullet points with a one-line recommendation at the end (format). Keep it under 150 words, professional but conversational since it is an internal meeting (tone).',
  takeaway = 'Before every AI prompt, ask yourself three questions: Who should the AI think like? Who will read this? What should it look like?'
WHERE title = 'The Role-Audience-Format Triangle';

UPDATE qp_pills SET
  example_solution = 'I need to write weekly internal update intros for our company all-hands email. Match the exact style of this example:

"Happy Monday, team! This week we shipped the new dashboard, welcomed 3 new hires in Engineering, and hit our Q1 pipeline target. Here is what matters for your week ahead."

Write 3 more weekly update intros in this same style. Each should: start with a greeting, mention 2-3 specific achievements/events, and end with a forward-looking sentence. Keep each to 2-3 sentences. Vary the greeting and the achievements but maintain the upbeat, specific, concise tone.',
  takeaway = 'Instead of describing what you want, show AI one example. It communicates tone, length, and structure faster than any description.'
WHERE title = 'The Power of Examples (Few-Shot Prompting)';

UPDATE qp_pills SET
  example_solution = 'Constraints I am applying:
1. Length: Maximum 4 sentences
2. Tone: Direct but empathetic — acknowledge the inconvenience without over-apologizing
3. Structure: Open with the news, explain briefly, close with next steps
4. Exclusion: Do NOT use the word "unfortunately" or blame language

My prompt: "Write a Slack message to my project team (8 people). The website launch is delayed from Monday to Wednesday due to a vendor API integration issue. Keep it to 4 sentences maximum. Be direct but empathetic. Do not use the word unfortunately. Start with the news, give a one-sentence reason, then state next steps."',
  takeaway = 'More constraints = better output. If AI output feels generic, you have not given enough constraints. Add length, tone, structure, or exclusion rules.'
WHERE title = 'Constraint-Driven Prompting';

UPDATE qp_pills SET
  example_solution = 'Likely hallucinated statements:
1. "Dr. Sarah Chen" — AI frequently invents founder names with plausible-sounding credentials. No way to verify without searching.
2. "47% increase in enterprise adoption in Q3 2025 according to their latest SEC filing" — Specific percentage + SEC filing reference sounds authoritative but AI invents these constantly. Also, if the company is "TechPulse Analytics," it may not even be publicly traded (SEC filings are only for public companies).
3. "Stanford AI Benchmark Index" — This specific benchmark name does not exist. AI often creates official-sounding institutional references. Always Google benchmark names.

The "main competitor DataStream Inc." claim is also suspect but harder to verify without research. When in doubt, verify every proper noun and specific number.',
  takeaway = 'AI confidence does not equal accuracy. Any specific number, person name, or citation in AI output should be verified before you use it professionally.'
WHERE title = 'Why AI Hallucinates (And How to Catch It)';

UPDATE qp_pills SET
  example_solution = '(1) This happened because of the context window limitation. After 15 messages, the AI''s working memory is stretched. It pays the most attention to the beginning and end of the conversation, so a constraint from message 3 is literally in the zone where the AI is least likely to retain information — the "lost in the middle" problem.

(2) To fix it: I would restate the constraint directly in my next message: "Important reminder: the project MUST be completed before the holiday weekend on [date]. Please revise the timeline you just suggested to respect this hard deadline." This puts the constraint at the end of the conversation where the AI will pay attention to it again.',
  takeaway = 'AI forgets things in long conversations. If it ignores an earlier instruction, do not assume it is being difficult — just repeat the constraint in your latest message.'
WHERE title = 'The Context Window: Why AI Forgets';

UPDATE qp_pills SET
  example_solution = 'Hi Sarah, thanks for sharing that. I want to flag something important: ChatGPT does not actually have access to our employee satisfaction survey data or any of our internal systems. When you asked it about our survey results, it generated a plausible-sounding answer based on general patterns — but the specific claim about "declining morale in engineering" is entirely fabricated by the AI, not based on our actual data.

What you should do instead: download the actual survey results from our HR system, then paste the raw data (or a summary) into ChatGPT and ask it to analyze THAT specific data. When you give AI real data, it can genuinely help you find patterns. Without real data, it just makes things up that sound convincing.

This is a great learning moment — it is easy to mistake AI confidence for AI knowledge.',
  takeaway = 'AI does not know anything about your company unless you paste it in. Every "internal insight" from AI without your data is a fabrication.'
WHERE title = 'AI Cannot Access Your Company Data (Unless You Paste It)';

UPDATE qp_pills SET
  example_solution = 'My morning brief prompt:
"Here is my day. Organize this into a morning brief with: (1) my top 3 priorities ranked by urgency, (2) meetings I need to prepare for and what to prepare, (3) emails needing a response today, (4) anything I can skip or delegate.

Calendar: 9:00 Team standup, 10:30 Client call with Meridian Corp (Q2 review), 13:00 Lunch, 14:00 1:1 with manager, 16:00 All-hands meeting
Emails: RE: Q2 numbers attached, Urgent: server downtime last night, Team lunch Friday?, Your travel reimbursement approved, Meridian Corp - agenda for tomorrow''s call, Newsletter: Top 10 AI tools, FW: Budget approval needed by EOD
Tasks: Finish slide deck for all-hands, review intern''s report, submit expense report"

Expected output:
TOP 3 PRIORITIES: (1) Budget approval — needed by EOD, respond to forwarded email first. (2) Finish all-hands slide deck — presenting at 16:00. (3) Meridian Corp prep — client call at 10:30, review the Q2 numbers email and their agenda email before the call.

MEETING PREP: 10:30 Meridian — review Q2 numbers + their agenda. 14:00 Manager 1:1 — have intern report status ready. 16:00 All-hands — slide deck must be done.

RESPOND TODAY: "Urgent: server downtime" (check impact), "Budget approval needed by EOD" (action required), "Meridian Corp agenda" (confirm or add items).

SKIP/DELEGATE: Newsletter, travel reimbursement approved (just file), team lunch Friday (reply quickly or skip).',
  takeaway = 'One prompt each morning with your calendar + email subjects + tasks = a structured priority list in 60 seconds. No sensitive content needed — subject lines are enough.'
WHERE title = 'The Morning Brief: One Prompt to Start Your Day';

UPDATE qp_pills SET
  example_solution = 'Write 3 versions of an email to my client GreenLeaf Solutions responding to their request for a 3-week project extension. I can offer 1 extra week but not 3. I need to say yes to the 1 week while managing expectations about the remaining scope.

Version 1 — Formal and diplomatic: Open with appreciation for their transparency about the timeline. Confirm the 1-week extension. Frame the scope conversation as a collaborative discussion.

Version 2 — Friendly and direct: Get to the yes quickly. Be warm but clear that 3 weeks is not possible. Suggest a call to discuss scope priorities.

Version 3 — Brief and action-oriented: 4 sentences maximum. Confirm 1 week, state the constraint, propose next step.

Each version should be under 150 words, addressed to their PM (Alex), and should not sound apologetic — we are being accommodating, not making excuses.',
  takeaway = 'Never ask AI for one version of important communication. Ask for three different tones, pick the best parts from each, and combine. Faster than iterating one version five times.'
WHERE title = 'The "Draft 3 Versions" Trick';

UPDATE qp_pills SET
  example_solution = 'My custom instructions:

Role & Industry: I am a marketing manager at a B2B SaaS company (200 employees, selling project management software to mid-market companies). My team is 4 people.

Daily tasks: Email drafts to clients and partners, campaign briefs, quarterly reports, competitive analysis summaries, internal presentations.

Communication preferences: Use bullet points over paragraphs. Keep responses under 300 words unless I ask for more. Default to a professional but approachable tone — think "smart colleague," not "corporate robot."

Audience: Most of my writing goes to either (a) enterprise prospects/clients or (b) our executive team. Adjust formality based on which I specify.

Tools: Google Workspace, HubSpot, Slack, Figma (for review). I work in CET timezone.

Always do: Include a one-line TL;DR at the top of any response longer than 200 words.
Never do: Use "delve," "leverage" as a verb, "in today''s fast-paced world," or start emails with "I hope this finds you well."',
  takeaway = 'Set custom instructions once in ChatGPT or Claude. It saves you from re-explaining your role, preferences, and context in every single conversation.'
WHERE title = 'Custom Instructions: Set It Once, Benefit Forever';

UPDATE qp_pills SET
  example_solution = 'I am using Google Sheets. Here are my column headers: A = Employee Name, B = Department, C = Start Date, D = Salary.

Prompt 1 (average salary): "I have a Google Sheets table with columns A (Employee Name), B (Department), C (Start Date), D (Salary). Write a formula that calculates the average salary for employees in the Engineering department only."
Expected formula: =AVERAGEIF(B:B, "Engineering", D:D)

Prompt 2 (employees after Jan 1 2025): "Same spreadsheet. Write a formula that counts how many employees have a Start Date after January 1, 2025."
Expected formula: =COUNTIF(C:C, ">"&DATE(2025,1,1))

Prompt 3 (highest paid name): "Same spreadsheet. Write a formula that returns the name of the employee with the highest salary."
Expected formula: =INDEX(A:A, MATCH(MAX(D:D), D:D, 0))',
  takeaway = 'Describe WHAT you want in plain English, not HOW to do it. Always tell AI which tool you use (Excel vs Google Sheets) and paste your column headers.'
WHERE title = 'AI + Spreadsheets: The Formulas You Never Have to Google Again';

UPDATE qp_pills SET
  example_solution = 'Prompt: "Here are raw notes from a project kickoff meeting. Extract and organize into: (1) Decisions Made, (2) Action Items with owner and deadline, (3) Open Questions needing follow-up. Format cleanly for pasting into Slack."

Expected output:
DECISIONS MADE:
- Tech stack: React (not Angular) — decided by team
- Budget: Approved at 45k
- Launch target: End of Q2 (mid-May realistic per Tom''s 8-week estimate)
- Meeting cadence: Weekly standups starting next Monday at 10am

ACTION ITEMS:
- Tom: Set up repo by Friday
- Lisa: Request Figma access from IT (no deadline stated — suggest Monday)
- Sarah: Send project brief to stakeholders by Wednesday
- Sarah: Check with finance re: extra contractor budget for Tom

OPEN QUESTIONS:
- Can we get budget for an extra contractor? (Sarah checking with finance)
- Lisa still waiting on brand guidelines from marketing — who is the contact?
- Is "end of Q2" a hard deadline or target? Sarah and Tom seem to disagree on timeline.',
  takeaway = 'Paste raw meeting notes into AI and ask for: decisions, action items with owners, and open questions. It takes 60 seconds and replaces 15 minutes of manual cleanup.'
WHERE title = 'Meeting Notes to Action Items in 60 Seconds';

UPDATE qp_pills SET
  example_solution = 'Items to verify before sending:

NAMES:
- "Jennifer" — Is this the right contact? Verify against your CRM/email thread.
- "Henderson Group" — Confirm exact company name spelling and that this is the correct project name.
- "Dr. Patel" — Does this person exist on the project? Verify against project roster. AI loves inventing names with "Dr." prefix.

NUMBERS:
- "67% completion" — Is this from your actual project tracker or did AI generate it? Check your PM tool.
- "$142,000 annually" — This is the highest-risk item. "Projected savings" with a specific dollar figure AND a claimed Gartner benchmark — almost certainly AI-generated. Verify both the number and the Gartner claim.
- "March 3rd" — Is this the actual date the data was pulled? Cross-check.

DATES:
- "last Tuesday" — Confirm the actual date of the call.
- "Friday, March 14th" — Does this Friday actually fall on March 14th? Check a calendar. Also, is this deadline realistic for the Gantt chart update?

SOURCES:
- "Gartner benchmark for companies your size" — This specific benchmark likely does not exist. If you cite Gartner to a client without a real source, you lose credibility instantly.',
  takeaway = 'Before sending any AI-assisted communication: scan for specific numbers, proper nouns, and dates. If you find any, verify them. Three seconds prevents career-damaging errors.'
WHERE title = 'The 3-Second Sanity Check: Numbers, Names, Dates';

UPDATE qp_pills SET
  example_solution = '1. Thank-you note to a colleague — DO IT MANUALLY. A personal note should sound like you, not AI. It takes 2 minutes to write and the personal touch matters more than polish.

2. Summarizing a 15-page report — USE AI. This is exactly what AI excels at: processing large volumes of text and extracting key points. Paste the report and ask for a structured summary.

3. Looking up current stock price — DO IT MANUALLY. AI does not have access to real-time data. Google "company name stock price" takes 5 seconds.

4. Creating 20 product description variations — USE AI. Repetitive content generation with variations is AI''s sweet spot. One prompt can produce all 20 in seconds.

5. Responding to angry customer complaint — DO IT MANUALLY (with AI assist). The emotional intelligence and specific account knowledge required makes this primarily a human task. You could ask AI for a draft structure, but the actual response needs your judgment.

6. Converting CSV to formatted table — USE AI. Data transformation and formatting is mechanical work that AI handles perfectly. Describe the conditional highlighting rules and paste the data.',
  takeaway = 'Before opening AI, ask: "Would 2 minutes of manual work solve this faster?" Use AI for volume, transformation, and drafting. Keep personal, real-time, and judgment-heavy tasks for yourself.'
WHERE title = 'When NOT to Use AI: The Decision Framework';

UPDATE qp_pills SET
  example_solution = 'This falls into HIGH-RISK AI under the EU AI Act.

Using AI to automatically screen and reject job applicants is classified as a "high-risk" AI system because it makes decisions that significantly affect people''s access to employment. This is explicitly listed in Annex III of the Act.

If the company wants to proceed, it would need to:
1. Conduct a conformity assessment documenting the AI system''s accuracy and bias testing
2. Ensure meaningful human oversight — a human must review AI recommendations before any rejection
3. Maintain transparency — candidates must be informed that AI is involved in the screening process
4. Keep detailed logs of all AI-assisted decisions for auditing
5. Implement regular bias monitoring to ensure the system does not discriminate against protected groups

Simply connecting ChatGPT to an ATS and auto-rejecting below a score threshold would violate the Act. The key requirement is that AI can assist human decision-making, but cannot replace it for employment decisions.',
  takeaway = 'AI that makes decisions about hiring, credit, or access to services is "high-risk" under the EU AI Act. It requires human oversight, transparency, and documentation — never full automation.'
WHERE title = 'The EU AI Act: What Every Office Worker Should Know';

UPDATE qp_pills SET
  example_solution = 'Task I chose: Preparing weekly status report (collecting updates from 3 team leads, compiling, sending to manager).

HOW I DO IT TODAY (manual):
1. Monday morning: Slack each of 3 team leads asking for their updates (5 min)
2. Wait for responses — often chase 1-2 people by Tuesday (10 min across the day)
3. Wednesday: Copy-paste their updates into a Google Doc template (10 min)
4. Rewrite each section for consistency in tone and format (15 min)
5. Add my own summary paragraph and flag any risks (10 min)
6. Send to manager (2 min)
Total: ~50 minutes spread across 3 days

HOW AN AI AGENT COULD HANDLE IT:
1. Agent automatically messages team leads on Monday via Slack with a structured template
2. Agent collects responses, sends reminders to non-responders on Tuesday
3. Agent compiles all updates into a consistent format, drafts a summary, and flags items that mention "delay," "risk," or "blocked"
4. Agent sends me a draft for review on Wednesday morning

MY REMAINING ROLE:
- Review the agent''s draft for accuracy (do the summaries match what I know?)
- Add context the agent cannot know (e.g., "the delay in Team B is expected and not a risk because we have buffer")
- Make judgment calls about what to escalate vs. what to downplay
- Approve and send — the "send" button stays with me',
  takeaway = 'AI agents turn multi-step tasks into single delegations. Your role shifts from doing the steps to reviewing the result and adding judgment the agent cannot have.'
WHERE title = 'AI Agents: What They Are and Why They Matter for Your Job';
