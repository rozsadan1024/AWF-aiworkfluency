#!/bin/bash
set -e

# ==========================================
# AIProof Deploy — alongside OpenClaw + Caddy
# ==========================================

DOMAIN=""
APP_DIR="/opt/aiproof"

echo "======================================"
echo "  AIProof Deploy (Caddy + OpenClaw)"
echo "======================================"
echo ""

# Domain
if [ -z "$DOMAIN" ]; then
  read -p "Enter domain for AIProof (e.g. aiproof.yourdomain.com): " DOMAIN
fi

echo "→ Domain: $DOMAIN"
echo "→ App will listen on 127.0.0.1:3100"
echo ""

# Step 1: Copy project
echo "▸ Step 1/5: Setting up project directory..."
sudo mkdir -p $APP_DIR
if [ -f "package.json" ] && [ -f "Dockerfile" ]; then
  sudo cp -r . $APP_DIR/
  echo "  ✓ Files copied to $APP_DIR"
else
  echo "  ⚠ Run this from the project root"
  exit 1
fi
cd $APP_DIR

# Step 2: Environment
echo "▸ Step 2/5: Environment..."
if [ ! -f ".env" ]; then
  cp .env.example .env
  sed -i "s|NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=https://$DOMAIN|" .env
  echo ""
  echo "  ┌─────────────────────────────────────┐"
  echo "  │  Edit .env with your credentials:   │"
  echo "  │  nano $APP_DIR/.env                 │"
  echo "  │                                     │"
  echo "  │  You need:                          │"
  echo "  │   - Supabase URL + keys (3 values)  │"
  echo "  │   - Kimi API key                    │"
  echo "  └─────────────────────────────────────┘"
  echo ""
  read -p "  Press Enter after editing .env... "
else
  sed -i "s|NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=https://$DOMAIN|" .env
  echo "  ✓ .env exists, updated APP_URL"
fi

# Step 3: Build & start container
echo "▸ Step 3/5: Building Docker container..."
docker compose build --no-cache
docker compose up -d
echo "  ✓ AIProof running on 127.0.0.1:3100"

# Step 4: Add to Caddy
echo "▸ Step 4/5: Configuring Caddy..."

# Find Caddyfile
CADDYFILE=""
for path in /etc/caddy/Caddyfile /root/Caddyfile /home/*/Caddyfile /opt/*/Caddyfile; do
  if [ -f "$path" ]; then
    CADDYFILE="$path"
    break
  fi
done

if [ -z "$CADDYFILE" ]; then
  # Try to find it
  FOUND=$(find / -name "Caddyfile" -type f 2>/dev/null | head -1)
  if [ -n "$FOUND" ]; then
    CADDYFILE="$FOUND"
  fi
fi

if [ -n "$CADDYFILE" ]; then
  echo "  Found Caddyfile at: $CADDYFILE"

  # Check if already configured
  if grep -q "aiproof" "$CADDYFILE" 2>/dev/null; then
    echo "  ✓ AIProof block already exists in Caddyfile"
  else
    # Backup
    cp "$CADDYFILE" "${CADDYFILE}.bak.$(date +%s)"
    echo "  Backup created"

    # Append AIProof block
    cat >> "$CADDYFILE" << CADDYEOF

# ---- AIProof ----
$DOMAIN {
	reverse_proxy localhost:3100

	header {
		X-Frame-Options "SAMEORIGIN"
		X-Content-Type-Options "nosniff"
		Strict-Transport-Security "max-age=63072000"
	}

	encode gzip

	@static path /_next/static/*
	header @static Cache-Control "public, max-age=31536000, immutable"
}
CADDYEOF
    echo "  ✓ Added AIProof block to Caddyfile"
  fi

  # Step 5: Reload Caddy
  echo "▸ Step 5/5: Reloading Caddy..."
  # Try systemd first, then direct command
  if systemctl is-active --quiet caddy 2>/dev/null; then
    sudo systemctl reload caddy
    echo "  ✓ Caddy reloaded (systemd)"
  elif command -v caddy &>/dev/null; then
    caddy reload --config "$CADDYFILE" 2>/dev/null || caddy reload
    echo "  ✓ Caddy reloaded"
  else
    echo "  ⚠ Could not auto-reload Caddy. Please reload manually:"
    echo "    sudo systemctl reload caddy"
    echo "    OR: caddy reload --config $CADDYFILE"
  fi

else
  echo "  ⚠ Caddyfile not found automatically."
  echo ""
  echo "  Add this block to your Caddyfile manually:"
  echo ""
  echo "  $DOMAIN {"
  echo "    reverse_proxy localhost:3100"
  echo "    encode gzip"
  echo "  }"
  echo ""
  echo "  Then reload: sudo systemctl reload caddy"
  echo ""
  read -p "  Press Enter after adding the Caddy block... "
fi

echo ""
echo "======================================"
echo "  ✅ AIProof is live at https://$DOMAIN"
echo "======================================"
echo ""
echo "Commands:"
echo "  cd $APP_DIR"
echo "  docker compose logs -f aiproof   # Logs"
echo "  docker compose restart aiproof   # Restart"
echo "  docker compose up -d --build     # Rebuild"
echo ""
