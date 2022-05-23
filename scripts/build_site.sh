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
  tail -n60 "$log"
  exit 1
}


trap "chrash" ERR


# Start time in seconds since Epoch
start_time="$(date +%s)"
start_time_long="$(date --iso-8601=s)"

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

log "Setting file permissions for build"
find "$content_dir" -type f -exec chmod u-x {} \;

log "cd to site_dir: $site_dir"
cd "$site_dir"

log "Enabling Pagegen virtual environment"
source "$site_dir/venv/bin/activate"

log "Building site"
pagegen -g prod

log "Deleting old site: $public_dir"
rm -Rf "$public_dir"

log "Deploying .htaccess"
sed "s#HTPASSWD_PATH#$htpasswd_path#" < "$site_dir/htaccess" > "$site_dir/site/prod/.htaccess"

log "Setting file permissions for web"
find "$site_dir/site/prod" -type f -exec chmod 644 {} \;
find "$site_dir/site/prod" -type d -exec chmod 755 {} \;

log "Deploying new site to public_dir: $public_dir"
mv "$site_dir/site/prod" "$public_dir"

log "Truncating log file: $log"
echo "$(tail -10 "$log")" > "$log"

log "Site deployment complete"

# End time in seconds since Epoch
end_time="$(date +%s)"

let build_time=$end_time-$start_time
echo "$start_time_long;$start_time;$end_time;$build_time" >> "$build_stats"

