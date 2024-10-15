#!/bin/sh

# Define the path to the pnpm-merge-driver script
DRIVER_SCRIPT="./pnpm-merge-driver.sh"

# Check if the merge driver is already set up
MERGE_DRIVER_NAME=$(git config --local --get merge.pnpm-driver.name)

if [ "$MERGE_DRIVER_NAME" = "pnpm merge driver" ]; then
  exit 0
fi

# Register the merge driver in the local git config
git config --local merge.pnpm-driver.name "pnpm merge driver"
git config --local merge.pnpm-driver.driver "$DRIVER_SCRIPT %O %A %B"

echo "Custom merge driver for pnpm-lock.yaml has been set up."
