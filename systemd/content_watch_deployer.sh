#!/bin/bash
# Watch content directory for a deploy file, if found deploy site and remove deploy file.

PAGEGEN_DIR="/home/oliver/Documents/Projects/filaments"
CONTENT_DIR="$PAGEGEN_DIR/content"

inotifywait -m -r -e create -e modify -e move -e delete "$CONTENT_DIR" |
	while read directory action file; do
		sudo -u oliver bash <<EOF
cd "$PAGEGEN_DIR"
pagegen -g prod
EOF
	done

