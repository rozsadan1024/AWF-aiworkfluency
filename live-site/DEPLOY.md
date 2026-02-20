# AIProof — Deploy on Hostinger KVM2 (alongside OpenClaw + Caddy)

## Architecture

```
Internet → Caddy (ports 80/443, auto-SSL)
              ├── yourdomain.com      → OpenClaw (existing)
              └── aiproof.domain.com  → Docker:3100 → Next.js AIProof
```

AIProof runs as a Docker container on port 3100. Caddy reverse-proxies to it and handles SSL automatically.

---

## Prerequisites

### 1. Subdomain
Add an A record pointing to your VPS IP:
- `aiproof.yourdomain.com` → `YOUR_VPS_IP`

### 2. Supabase (free)
1. [supabase.com](https://supabase.com) → New Project
2. SQL Editor → paste `supabase-schema.sql` → Run
3. Settings → API → copy:
   - Project URL
   - anon key
   - service_role key
4. Authentication → URL Configuration:
   - Site URL: `https://aiproof.yourdomain.com`
   - Redirect URLs: `https://aiproof.yourdomain.com/auth/callback`

### 3. Kimi API Key
[platform.moonshot.ai](https://platform.moonshot.ai) → Create key → Add $5 credit

---

## Deploy

### Automated

```bash
# Upload to VPS
scp aiproof.tar.gz root@YOUR_VPS_IP:/opt/

# SSH in
ssh root@YOUR_VPS_IP
cd /opt && tar xzf aiproof.tar.gz && cd aiproof

# Fill in credentials
cp .env.example .env
nano .env

# Deploy
chmod +x deploy.sh
bash deploy.sh
```

The script will:
1. Build the Docker container
2. Start it on 127.0.0.1:3100
3. Find your Caddyfile and add the AIProof block
4. Reload Caddy

### Manual

```bash
# 1. Get files on server
cd /opt/aiproof

# 2. Configure
cp .env.example .env
nano .env   # fill in all values

# 3. Build & start
docker compose build
docker compose up -d

# 4. Add to Caddyfile (wherever yours lives)
nano /etc/caddy/Caddyfile
```

Add this block:

```caddy
aiproof.yourdomain.com {
    reverse_proxy localhost:3100
    encode gzip

    @static path /_next/static/*
    header @static Cache-Control "public, max-age=31536000, immutable"
}
```

Then reload:
```bash
sudo systemctl reload caddy
```

---

## .env Reference

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

KIMI_API_KEY=sk-...
KIMI_BASE_URL=https://api.moonshot.ai/v1
KIMI_MODEL=kimi-k2-0711

NEXT_PUBLIC_APP_URL=https://aiproof.yourdomain.com
```

---

## Manage

```bash
cd /opt/aiproof
docker compose logs -f aiproof       # Live logs
docker compose restart aiproof       # Restart
docker compose up -d --build         # Rebuild after code changes
docker compose down                  # Stop
```

## Troubleshooting

**502 from Caddy** → Container not ready yet: `docker compose logs aiproof`

**Container won't start** → Check .env: `docker compose config`

**Tasks not generating** → Kimi key issue: check logs for API errors

**Auth not working** → Verify Supabase redirect URL matches your domain exactly
