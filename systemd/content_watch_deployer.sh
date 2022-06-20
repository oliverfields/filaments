#!/bin/bash
# Watch content directory for a deploy file, if found deploy site and remove deploy file.

PAGEGEN_DIR="/home/oliver/Documents/Projects/filaments"
CONTENT_DIR="$PAGEGEN_DIR/content"

inotifywait -m "$CONTENT_DIR" -e create |
	while read directory action file; do
		if [ "$file" = "deploy" ]; then
			sudo -u oliver bash <<EOF
cd "$PAGEGEN_DIR"
pagegen -g prod
rm "$CONTENT_DIR/deploy"
EOF
		fi
	done
