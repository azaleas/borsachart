from .base import *  # We import everything we have previously set up on base.py
 
def get_secret(the_secret, debugging):
    """
    As a security measure, all secrets will be kept in a json file named
    secrets.json. This file will not be managed by the version control
    system, but will be available in our documentation repository or
    as an attached file. The main goal of this is that this file should
    not be viewable by no one except us or our team.
    """
    try:
        secrets_file = os.path.join(BASE_DIR, 'settings', 'secrets.json')

        secretjson = json.load(open(secrets_file))
        if debugging:
            return secretjson['local'][the_secret]
        else:
            return secretjson['production'][the_secret]
    except Exception as e:
        print("Something weird happened while retrieving a secret: {}".format(e))
        sys.exit(-1)
 
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
 
ALLOWED_HOSTS = ['.borsachartapp.com', 'localhost', '127.0.0.1', '[::1]'] 

MIDDLEWARE.append('borsachart.middleware.dev_cors_middleware')
 
# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'borsachart',
        'USER': get_secret('DB_USER', DEBUG),
        'PASSWORD': get_secret('DB_PASSWORD', DEBUG),
        'HOST': 'localhost',
        'PORT': '',
    }
}
 
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_secret('SECRET_KEY', DEBUG)

# Dev Email
EMAIL_HOST = 'localhost'
EMAIL_PORT = 1025

REDIS_HOST = get_secret('REDIS_HOST', DEBUG)
REDIS_PORT = get_secret('REDIS_PORT', DEBUG)

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "asgi_redis.RedisChannelLayer",
        "CONFIG": {
            "hosts": [(REDIS_HOST, REDIS_PORT)],
        },
        "ROUTING": "charts.routing.channel_routing",
    },
}

# LOGIN_REDIRECT_URL = 'http://localhost:3000/'
 
#########################################################
# Activate django-debug-toolbar if it is installed
#########################################################
try:
    import debug_toolbar
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware',]
    INSTALLED_APPS += ['debug_toolbar', ]
    def show_toolbar(request):
        return True
    DEBUG_TOOLBAR_CONFIG = {
        "SHOW_TOOLBAR_CALLBACK" : show_toolbar,
    }
except ImportError:
    pass
 
#########################################################
# Activate django-extensions if exist
#########################################################
try:
    import django_extensions
    INSTALLED_APPS += ['django_extensions', ]
except ImportError:
    pass
 
 
# LOGGING. An example of how to set up a basic logging facility
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': "[%(asctime)s] [%(levelname)s] [%(name)s] [%(lineno)s] %(message)s",
            'datefmt': "%d/%m/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
        'example_rotating_file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'formatter': 'verbose',
            'filename': os.path.join(logsdir, 'assets.log'),
            'maxBytes': 1024 * 1024 * 10,
            'backupCount': 10,
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
        'example': {
            'handlers': ['example_rotating_file'],
            'level': 'DEBUG',
        },
    }
}