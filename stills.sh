#!/bin/bash
# usage: ./stills.sh outdir frame1 frame2 ...   (renders PNG stills for visual QA)
OUT=$1; shift; mkdir -p $OUT
BR=${BROWSER:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}
for fr in "$@"; do npx remotion still src/index.ts AqlaniEthics $OUT/f$fr.png --frame=$fr --browser-executable=$BR --log=error 2>&1 | grep -v "^$" | head -5; done
