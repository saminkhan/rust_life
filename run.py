#!py_venv/bin/python3

try:
    SETTINGS_FILE = 'settings.ini'
    import logging.config
    logging.config.fileConfig(SETTINGS_FILE)
except Exception:
    exit('CRITICAL: invalid {}'.format(SETTINGS_FILE))

import logging
import mimetypes
import os
import socket
import subprocess

from argparse import ArgumentParser
from configparser import ConfigParser
from paste.translogger import TransLogger
from pyramid.config import Configurator
from shutil import which
from _thread import interrupt_main
from threading import Timer
from time import sleep
from waitress import serve

APP_NAME = 'FirstRust'
DELAY = 0.1
logger = logging.getLogger(__name__)
mimetypes.add_type('application/wasm', '.wasm')


def main():
    args = parse_args()

    if not args['env']:
        os.environ['PYRAMID_RELOAD_TEMPLATES'] = 'True'
        os.environ['PYRAMID_RELOAD_ASSETS'] = 'True'

    with Configurator() as config:
        config.include('pyramid_jinja2')
        config.add_route('index', '/')
        for i in []:    # placeholder for route handles
            config.add_route(i, '/' + i)
        config.add_static_view(name='static', path='dist')
        config.scan('backend')
        app = config.make_wsgi_app()

    def find_address(ip, port):
        with socket.socket() as s:
            try:
                s.bind((ip, int(port or 0)))
            except socket.error:
                s.bind(('0.0.0.0', 0))
            return s.getsockname()
    HOST, PORT = find_address(args['DEFAULT']['ip'], args['DEFAULT']['port'])

    # launch front-end UI on a separate thread
    def launcher(browser, ip, port, size=(1280, 800)):
        if browser:
            logger.info('launching {} with: {}'.format(APP_NAME, browser))
            with open(os.devnull, 'w') as NULL:
                proc = subprocess.Popen([
                    browser, '--app=http://{}:{}'.format(ip, port),
                    '--window-size={},{}'.format(size[0], size[1]),
                    '--user-data-dir=browser_data',
                    '--no-default-browser-check',
                    '--no-first-run'], stdout=NULL, stderr=subprocess.STDOUT)
            while proc.poll() is None:
                sleep(DELAY)
            interrupt_main()
    Timer(DELAY,
          lambda: launcher(which('google-chrome') or which('chromium-browser'),
                           HOST, PORT)).start()

    # launch back-end server
    logger.info('serving {} in {} mode'.format(
        APP_NAME, 'PRODUCTION' if args['env'] else 'DEVELOPMENT'))
    serve(TransLogger(app, setup_console_handler=False), host=HOST, port=PORT)


def parse_args():
    arg_parser = ArgumentParser(
        description='a Python-Pyramid web server for {}'.format(APP_NAME))
    arg_parser.add_argument('-e', '--env', default='', required=False,
                            help='dev/prod; overrides settings.ini')

    config_parser = ConfigParser()
    config_parser.read(SETTINGS_FILE)

    args = vars(arg_parser.parse_args())
    args['DEFAULT'] = dict(config_parser._defaults)

    if args['env'] in ['dev', 'prod']:
        args['env'] = args['env'] == 'prod'
    else:
        args['env'] = args['DEFAULT']['env'] == 'prod'

    return args


if __name__ == '__main__':
    main()
