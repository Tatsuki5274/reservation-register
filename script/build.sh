#!/bin/sh
set -eux

pushd lambda/mailChecker/
  npm i
  npx esbuild *.ts --platform=node --sourcemap --bundle --outdir=build --minify
popd

