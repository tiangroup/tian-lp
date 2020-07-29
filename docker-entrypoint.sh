#!/bin/sh
set -e

if [ "$TARGET" = "static" ]; then
  npm run export
else
  echo "npm run start"
  npm run start
fi