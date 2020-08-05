#!/usr/bin/env bash

rm -rf browser_data dist pkg *_modules *lock* *.log*

pushd backend
rm -rf __pycache__
popd

pushd frontend
rm -rf pkg
pushd rust
rm -rf target *lock*
popd
popd