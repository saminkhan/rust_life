#!/usr/bin/env bash

PKG_DIR=pkg
VENV_PATH=${PKG_DIR}/py_venv

cp -rf backend ${PKG_DIR}
cp -rf dist ${PKG_DIR}
cp run.py ${PKG_DIR}
cp settings.ini ${PKG_DIR}

chmod -R 777 ${VENV_PATH}
source ${VENV_PATH}/bin/activate
pip install --isolated -r requirements.txt
deactivate