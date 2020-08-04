#!/usr/bin/env bash

DEPLOY_DIR=deploy
VENV_PATH=${DEPLOY_DIR}/py_venv

chmod -R 777 ${VENV_PATH}
source ${VENV_PATH}/bin/activate
pip install --isolated -r requirements.txt
deactivate

cp -rf backend ${DEPLOY_DIR}
cp -rf dist ${DEPLOY_DIR}
cp run.py ${DEPLOY_DIR}
cp settings.ini ${DEPLOY_DIR}