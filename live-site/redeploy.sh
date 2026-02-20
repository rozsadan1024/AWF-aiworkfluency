#!/bin/bash
set -e
# Quick redeploy after code changes
# Usage: bash redeploy.sh

cd /opt/aiproof
echo "▸ Pulling latest code..."
git pull origin main 2>/dev/null || echo "  (no git, using local files)"

echo "▸ Rebuilding..."
docker compose build --no-cache aiproof

echo "▸ Restarting..."
docker compose up -d aiproof

echo "✅ Redeployed. Logs: docker compose logs -f aiproof"
