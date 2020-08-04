#!/usr/bin/env bash

rm -rf deploy dist *_modules *lock*

pushd backend
rm -rf __pycache__
popd

pushd frontend
rm -rf pkg
pushd rust
rm -rf target *lock*
popd
popd