#!/usr/bin/env bash
# Régénère les fichiers vidéo du teaser à partir du master (plan vertical 9:16).
#
#   scripts/optimize-video.sh chemin/vers/master.mp4
#
# Sortie dans web/public/video/ :
#   teaser-720.mp4   bureau  (720 px de large, ≈ 8 Mo pour 57 s)
#   teaser-540.mp4   mobile  (540 px de large, ≈ 5 Mo pour 57 s)
# et l'image d'attente web/public/poster/teaser.webp (image à 4 s).
#
# Le master ne se commite PAS dans web/public : il serait servi tel quel (80 Mo).
# Nécessite ffmpeg et, pour le poster, Node avec `sharp` (déjà dans web/).
set -euo pipefail

SRC="${1:?usage: $0 master.mp4}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/web/public"

enc() { # largeur crf débit-audio sortie
  ffmpeg -v error -y -i "$SRC" -vf "scale=$1:-2" -c:v libx264 -preset slow -crf "$2" \
    -pix_fmt yuv420p -profile:v main -movflags +faststart -c:a aac -b:a "$3" -ac 2 "$4"
}
enc 720 27 96k "$OUT/video/teaser-720.mp4"
enc 540 28 64k "$OUT/video/teaser-540.mp4"

TMP="$(mktemp -d)"
ffmpeg -v error -y -ss 4 -i "$SRC" -frames:v 1 -vf scale=720:-2 "$TMP/poster.png"
(cd "$(dirname "$0")/../web" && node -e "require('sharp')('$TMP/poster.png').webp({quality:70}).toFile('$OUT/poster/teaser.webp')")
rm -rf "$TMP"
ls -la "$OUT/video"/teaser-*.mp4 "$OUT/poster/teaser.webp"
