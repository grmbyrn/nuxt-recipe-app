#!/usr/bin/env sh
# husky shim for CI environments — minimal stub to allow direct execution
# If this file is sourced by a hook script, `exit` would terminate the parent shell.
# Use `return` when possible to avoid that. If not in a function/context that supports
# return, fall back to exiting.
if [ -z "$1" ]; then
  (return 0 2>/dev/null) || exit 0
fi
