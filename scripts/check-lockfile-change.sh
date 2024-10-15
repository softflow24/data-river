#!/bin/sh

# Get the current and previous commit hashes
OLD_COMMIT=$1
NEW_COMMIT=$2

# Check if pnpm-lock.yaml was changed between the two commits
if [ "$OLD_COMMIT" != "0000000000000000000000000000000000000000" ]; then
  if git diff --name-only "$OLD_COMMIT" "$NEW_COMMIT" | grep -q "pnpm-lock.yaml"; then
    echo "⚠️  Detected a change in pnpm-lock.yaml. Please run 'pnpm install' to update dependencies."
  fi
else
  # If this is the first checkout
  echo "First checkout detected. Please run 'pnpm install' to update dependencies before running 'pnpm run dev'."
fi
