#!/usr/bin/env bash
# Push FundHuntr to github.com/F3mi33/fundhuntr.
# Run from inside the FundHuntr folder.

set -e

GH_USER="F3mi33"
REPO_NAME="fundhuntr"
REPO_URL="https://github.com/${GH_USER}/${REPO_NAME}.git"

cd "$(dirname "$0")"

# Make sure we're a git repo
if [ ! -d .git ]; then
  echo "→ Initializing git repo"
  git init -q
  git branch -M main
fi

# Stage and commit anything pending
git add -A
if ! git diff --cached --quiet; then
  git commit -m "FundHuntr build snapshot"
fi

# Ensure 'main' branch
git branch -M main

# Add or update the remote
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo "  Ready to push to: $REPO_URL"
echo ""
echo "  If you haven't yet, create the empty repo first:"
echo "    https://github.com/new"
echo "    → owner: $GH_USER"
echo "    → name:  $REPO_NAME"
echo "    → leave README/.gitignore/license UNCHECKED"
echo ""
echo "  Or if you have the GitHub CLI installed:"
echo "    gh repo create $GH_USER/$REPO_NAME --public --source=. --remote=origin --push"
echo "════════════════════════════════════════════════════════════"
echo ""

read -p "Repo already created on github.com? Push now? [y/N] " ans
if [[ "$ans" =~ ^[Yy]$ ]]; then
  git push -u origin main
  echo ""
  echo "✓ Pushed. Visit: https://github.com/${GH_USER}/${REPO_NAME}"
fi
