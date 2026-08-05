#!/usr/bin/env bash
# Dump the production database to a timestamped file.
#
# Free-plan Supabase keeps only limited automated backups, so this is the
# operator-run safety net. Requires the Supabase CLI and a linked project
# (`supabase link --project-ref <ref>`).
#
# Usage:
#   scripts/backup.sh              # schema + data -> backups/
#   scripts/backup.sh --data-only  # rows only, smaller and faster
#
# The output contains every inquiry, i.e. personal data. Keep it out of the
# repo (backups/ is gitignored) and off shared drives.

set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v supabase >/dev/null 2>&1; then
  echo "supabase CLI not found. Install: brew install supabase/tap/supabase" >&2
  exit 1
fi

mkdir -p backups
stamp="$(date +%Y%m%d-%H%M%S)"

if [ "${1:-}" = "--data-only" ]; then
  out="backups/data-${stamp}.sql"
  supabase db dump --data-only -f "$out"
else
  out="backups/full-${stamp}.sql"
  supabase db dump -f "$out"
  supabase db dump --data-only -f "backups/data-${stamp}.sql"
fi

echo "Wrote $out ($(du -h "$out" | cut -f1))"

# Keep the last 10 dumps so this can run on a schedule without filling the disk.
ls -1t backups/*.sql 2>/dev/null | tail -n +11 | while read -r old; do
  echo "Pruning $old"
  rm -f "$old"
done
