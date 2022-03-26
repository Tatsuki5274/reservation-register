#!/bin/sh
set -eux

pushd lambda/hello/
  npm i
  npx esbuild *.ts --platform=node --sourcemap --bundle --outdir=build
popd

