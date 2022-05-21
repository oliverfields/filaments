#!/bin/bash

# Halt on error
set -e

conf_file="$( cd -- "$(dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)"
conf_file="${conf_file%/*}/build.conf"

# Load config variables
. "$conf_file"


function log() {
  timestamp="$(date --iso-8601=s)"

  # log is from config
  echo "$timestamp $1" >> "$log"
}

function chrash() {
  log "CHRASHED AND BURNED"
}


trap "chrash" ERR

log "Site deployment started"


# Make or clear build dir and enter it
if [ -d "$build_dir" ]; then
  log "Clearing $build_dir"
  rm -Rf "$build_dir"
fi

log "Creating $build_dir"
mkdir -p "$build_dir"

log "cd to build_dir: $build_dir"
cd "$build_dir"


# Download content from Dropbox
log "Downloading: $dropbox_download_url"
wget -q -O "$dropbox_zip" "$dropbox_download_url"


# Prepare downloaded content for build
log "Unzipping: $dropbox_zip"
# -qq = Quiet, -x / = to deal with Dropbox zip file oddity
unzip -qq "$dropbox_zip" -d 'content' -x /


# Remove all .txt extensions that Dropbox forces on us
log  "Removing txt file extensions in $PWD"
find . -iname '*.txt' -type f -print0 | while read -d '' f; do mv "$f" "${f%.txt}"; done

if [ -e "$content_dir" ]; then
  log "Removing $content_dir"
  rm -Rf "$content_dir"
fi

log "Moving dropbox content to content_dir"
mv "$build_dir/content" "$content_dir"

log "cd to site_dir: $site_dir"
cd "$site_dir"

log "Removing execute on files"
find content -type f -exec chmod u-x {} \;

log "Enabling Pagegen virtual environment"
source "$site_dir/venv/bin/activate"

log "Building site"
pagegen -g prod

log "Deleting old site: $public_dir"
rm -Rf "$public_dir"

log "Deploying .htaccess"
sed "s#HTPASSWD_PATH#$htpasswd_path#" < "$site_dir/htaccess" > "$site_dir/site/prod/.htaccess"

log "Deploying new site to public_dir: $public_dir"
mv "$site_dir/site/prod" "$public_dir"

log "Truncating log file"
sed -i '1001,$ d' "$log"

log "Site deployment complete"
