#!/bin/bash
# Watch media directory for changes, if found sync to web server.

MEDIA_DIR="/home/oliver/Documents/Projects/filaments/media"

inotifywait -m -r -e create,modify,move,delete "$MEDIA_DIR" |
	while read directory event file; do
		sudo -u oliver bash -c "rsync -ap --delete -e 'ssh -i /home/oliver/.ssh/id_ed25519' '$MEDIA_DIR/' 'phnd@login.domeneshop.no:filaments_media/'"
	done
