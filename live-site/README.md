# AIProof Live Site

**Current deployment:** https://aiworkfluency.com/

**Last synced from production:** 2026-02-20

---

## About

This is the **LIVE production site** — a Next.js app currently deployed at https://aiworkfluency.com/.

**Brand:** AIProof  
**Positioning:** B2C (individuals worried about AI job displacement)  
**Language:** English  
**Tech stack:** Next.js, TypeScript, Supabase, Tailwind CSS, Kimi AI

---

## Structure

```
live-site/
├── src/
│   ├── app/                 # Next.js 13+ app router
│   │   ├── page.tsx         # Homepage
│   │   ├── assessment/      # Free assessment funnel
│   │   ├── dashboard/       # User dashboard
│   │   ├── task/[id]/       # Task pages (view, submit, evaluation, course)
│   │   ├── auth/            # Login/signup/callback
│   │   └── api/             # API routes (task generation, evaluation, profile parsing)
│   ├── lib/
│   │   ├── kimi/            # Kimi AI client + prompts
│   │   ├── supabase/        # Supabase client (auth + DB)
│   │   ├── assessment/      # Assessment questions + scoring
│   │   └── knowledge-base/  # Admin utilities
│   └── types/               # TypeScript types
├── public/                  # Static assets (empty in current deploy)
├── Dockerfile               # Docker build config
├── docker-compose.yml       # Docker Compose config
├── deploy.sh                # Deployment script
└── supabase-schema.sql      # Database schema
```

---

## Current Positioning (As Deployed)

**Hero:**
> "AIProof — Keep Your Job in the AI Era"  
> "89% of HR leaders say AI will impact jobs in 2026"

**Value prop:**
> "Personalized practice tasks that mirror your actual daily work. Use AI to solve them, get scored on your approach, and learn the expert way. Think Duolingo, but for keeping your job."

**Fear-based stats:**
- 85M jobs displaced by AI by 2026 (WEF)
- 50% of middle management positions at risk (WEF)
- 78K tech jobs lost to AI in first half of 2025
- 41% of employers plan to reduce staff due to AI

---

## How It Works (Current)

1. **Get a Real Task** — Based on YOUR actual job
2. **Solve It with AI** — Use any tools (ChatGPT, Claude, etc.)
3. **Get Scored & Learn** — 7-dimension evaluation + expert benchmark

---

## Deployment

**Server:** VPS at srv833178  
**Port:** 3100 (Docker container, proxied via Caddy)  
**Domain:** aiworkfluency.com  
**Reverse proxy:** Caddy (config at `/etc/caddy/Caddyfile`)

**To deploy updates:**
```bash
cd /opt/aiproof
./deploy.sh
```

---

## Separate from B2B Hungarian Landing Page

**This live-site/** is the **current production app** (English, B2C, fear-based).

**landing/index.html** (in parent directory) is the **proposed Hungarian B2B version** (EU AI Act compliance, enterprise licensing, 9,900 HUF/fő/hó pricing).

They are **different products/positionings** under the same repo for now.

---

## Environment Variables (Not Committed)

The `.env` file (excluded from git) contains:
- Supabase URL + keys
- Kimi AI API credentials
- NextAuth secrets

See `.env.example` for structure.

---

## Notes

- Task generation uses Kimi AI (Chinese LLM)
- Scoring/evaluation also uses Kimi
- User data stored in Supabase
- Assessment flow generates personalized risk score
- No payment integration yet (assessment is free)
