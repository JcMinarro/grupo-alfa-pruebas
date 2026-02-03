#!/usr/bin/env bash
set -euo pipefail

# Generate poster images for hero videos listed in heros.txt
# Usage: ./scripts/generate_hero_posters.sh [path/to/heros.txt]

HEROS_FILE=${1:-heros.txt}
OUT_DIR=${2:-public/assets/heros}
TMP_DIR=$(mktemp -d)

mkdir -p "$OUT_DIR"

if [[ ! -f "$HEROS_FILE" ]]; then
  echo "heros file not found: $HEROS_FILE" >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required but not found. Install ffmpeg and retry." >&2
  exit 1
fi

echo "Reading $HEROS_FILE -> extracting first frames into $OUT_DIR"

while IFS= read -r line || [[ -n "$line" ]]; do
  [[ -z "${line// /}" ]] && continue
  url=$(awk -F '->' '{print $2}' <<<"$line" | sed -e 's/^[ \t]*//; s/[ \t]*$//')
  label=$(awk -F '->' '{print $1}' <<<"$line" | sed -E 's/^[0-9]+\|[ \t]*-[ \t]*//; s/[ \t]*$//')

  # slugify label
  slug=$(echo "$label" | iconv -f utf8 -t ascii//TRANSLIT | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g' | sed -E 's/^-|-$//g')
  video_tmp="$TMP_DIR/$slug.mp4"
  poster="$OUT_DIR/$slug-poster.jpg"

  if [[ -f "$poster" ]]; then
    echo "Poster already exists: $poster"
    continue
  fi

  echo "Downloading $label -> $url"
  curl -L --fail --retry 3 --output "$video_tmp" "$url" || { echo "Failed to download $url" >&2; rm -f "$video_tmp"; continue; }

  echo "Extracting first frame to $poster"
  ffmpeg -y -i "$video_tmp" -vf "select=eq(n\,0)" -q:v 2 -frames:v 1 "$poster"

  rm -f "$video_tmp"
done < "$HEROS_FILE"

echo "Done. Posters saved to $OUT_DIR"
