#!/bin/bash

# https://www.dropbox.com/developers/reference/webhooks
# https://dropbox.tech/developers/dropbox_hook-py-a-tool-for-testing-your-webhooks


#conf_file="$( cd -- "$(dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)"
#conf_file="${conf_file%/*}/build.conf"
conf_file='../../filaments/build.conf'

# Load config variables
. "$conf_file"


# Verification call
if [[ "$QUERY_STRING" =~ ^challenge= ]]; then
  echo "Content-Type: text/plain"
  echo "X-Content-Type-Options: nosniff"
  echo
  echo -n "${QUERY_STRING#challenge=}"

# Webhook call
else
  echo "Content-Type: text/plain"
  echo ""

  # First, check that the dropbox hash of the post content(payload), made with
  # the app secret matches the actual payload hash with same app secret to
  # ensure no tampering
  payload=$(cat)
  validation_signature=$(echo -n $payload | openssl sha256 -hmac "$app_secret")
  validation_signature="${validation_signature#(stdin)= }"

  # If sigs match this request is probably from dropbox, so build site 
  if [ "$validation_signature" = "$HTTP_X_DROPBOX_SIGNATURE" ]; then
    echo "Lets get the party started!"

    # Close stdout and stderr to close connection
    exec >&-
    exec 2>&-

    # Run build script
    "$build_script"
  fi
fi
