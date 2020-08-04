import logging
from pyramid.view import view_config

logger = logging.getLogger(__name__)


@view_config(route_name='index', renderer='../dist/FirstRust.jinja2')
def main_view(request):
    return {}
