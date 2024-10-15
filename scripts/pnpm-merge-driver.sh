#!/bin/sh

# $1 = ancestor, $2 = current, $3 = other
# This example simply runs `pnpm install` to resolve conflicts

# Run pnpm install to regenerate the lock file
pnpm install --lockfile-only

# If successful, exit with code 0
exit 0