#!/usr/bin/env sh
# husky shim for CI environments — minimal stub to allow direct execution
if [ -z "$1" ]; then
  exit 0
fi
