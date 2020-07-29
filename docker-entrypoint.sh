#!/bin/sh
set -e

if [ "$TARGET" = "static" ]; then
  npm run export
else
  npm run start
fi