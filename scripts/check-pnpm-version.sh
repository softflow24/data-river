#!/bin/sh

REQUIRED_PNPM_VERSION=$(cat .npmrc | grep "pnpm-version=" | cut -d '=' -f 2)
INSTALLED_PNPM_VERSION=$(pnpm --version)

# Function to compare version numbers
version_ge() {
    printf '%s\n%s\n' "$2" "$1" | sort -V -C
}

if ! version_ge "$INSTALLED_PNPM_VERSION" "$REQUIRED_PNPM_VERSION"; then
    echo "⚠️  Your pnpm version is $INSTALLED_PNPM_VERSION, but the required minimum version is $REQUIRED_PNPM_VERSION."
    echo "Please run 'pnpm env use $REQUIRED_PNPM_VERSION' or upgrade by running 'pnpm add -g pnpm' to switch to the correct version."
    exit 1
fi
