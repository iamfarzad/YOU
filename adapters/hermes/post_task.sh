#!/usr/bin/env bash
set -euo pipefail
summary="${1:-}" 
you capture --source hermes --text "$summary"
you process-inbox
you refresh-awareness
