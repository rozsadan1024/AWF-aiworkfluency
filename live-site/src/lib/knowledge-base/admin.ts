export const ADMIN_KNOWLEDGE_BASE = `
## ADMIN ROLE KNOWLEDGE BASE

### SUB-ROLES
1. Administrative Assistant: Calendar management, correspondence, filing, travel booking, meeting prep. 1-3 years exp. 
2. Executive Assistant: C-suite support, confidential docs, board meeting prep, strategic project coordination. 5-10 years.
3. Office Manager: Facility management, vendor relationships, budgets, onboarding, compliance, team coordination. 3-7 years.
4. Operations Coordinator: Process optimization, cross-department coordination, data tracking, reporting, inventory. 2-5 years.

### TASK CATEGORIES WITH AI EXPOSURE (0-1)
- Email management (0.85): Drafting, sorting, prioritizing, templates. AI: drafting replies, categorization, scheduling responses.
- Document preparation (0.80): Reports, memos, presentations, formatting. AI: drafting, summarizing, reformatting, translation.
- Calendar/scheduling (0.70): Meeting coordination, conflict resolution, room booking. AI: optimal scheduling, agenda prep.
- Data management (0.90): Spreadsheets, data entry, reporting, dashboards. AI: formula creation, data cleaning, visualization.
- Meeting support (0.75): Agendas, minutes, follow-ups, action tracking. AI: transcription, summarization, action extraction.
- Travel arrangements (0.65): Booking, itineraries, expense reports. AI: comparison shopping, itinerary optimization.
- Communication management (0.80): Internal comms, announcements, templates. AI: drafting, tone adjustment, translation.
- Process documentation (0.75): SOPs, workflows, training materials. AI: documentation drafting, flowchart creation.
- Vendor/budget management (0.60): Purchase orders, invoicing, budget tracking. AI: expense categorization, anomaly detection.
- HR support (0.70): Onboarding docs, policy drafts, scheduling interviews. AI: doc generation, screening assistance.

### AI TOOLS FOR ADMINS
- ChatGPT/Claude: Email drafting, document creation, brainstorming, data analysis, meeting prep
- Microsoft Copilot: Integrated in Office 365 — email summaries, Excel formulas, PowerPoint creation, Teams meeting notes
- Otter.ai: Meeting transcription and summarization
- Grammarly: Writing improvement, tone detection
- Zapier/Make: Workflow automation connecting apps
- Google Gemini: Research, summarization, document analysis

### PROMPTING PATTERNS FOR ADMINS
1. Context-Task-Format: "I'm [role] at [company]. I need to [task]. Format as [format]."
2. Role-Scenario-Constraints: "Act as [expert role]. Given [scenario], create [deliverable] considering [constraints]."
3. Data-Question-Output: "Here is [data]. Answer [question]. Present as [table/chart/summary]."
4. Iterative Refinement: Start broad → review → refine with specific feedback → polish
5. Template-Then-Fill: "Create a template for [document type]" → fill with specific details
6. Multi-Tool Workflow: Use different tools for different steps (e.g., Otter for transcription → ChatGPT for summary → Word for formatting)

### CRITICAL ANTI-PATTERNS (test these in tasks)
- Copy-Paste Without Review (CRITICAL): Using AI output directly without reading, editing, or verifying
- Confidential Data Leak (CRITICAL): Pasting sensitive employee data, financials, or proprietary info into AI tools
- Vague Prompting (HIGH): "Make this better" instead of specifying what "better" means
- AI for Everything (MEDIUM): Using AI for tasks faster done manually (e.g., simple calendar entry)
- No Prompt Library (MEDIUM): Rewriting prompts from scratch instead of building templates
- Ignoring Company Policy (HIGH): Using AI tools without checking if they're approved
- Secret AI Use (MEDIUM): Not disclosing AI assistance when it's expected or required
`;
