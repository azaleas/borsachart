**Borsachart- Demo app with Django Channels and React**
----------

Objective: Test out Django Channels, Celery and React integration and build a demo prototype with Quandl EOD data.

Built with:

 - **Django**
 - **Django-rest-framework**
 - **Django Channels**
 - **Postgresql**
 - **Celery**
 - **Redis**
 - **React**

For API endpoints, see [here](https://github.com/azaleas/borsachart/blob/master/API.md).

----------

**For Local Setup:**

- Install requirements from requirements/local.txt
 - whitenoise can be uninstalled if it's not required (it's recommended for heroku). Also, clear up wsgi.py to avoid any issues:
```
import os

from django.core.wsgi import get_wsgi_application

#Remove this
from whitenoise.django import DjangoWhiteNoise

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "borsachart.settings")

application = get_wsgi_application()

#Remove this
application = DjangoWhiteNoise(application)
```
- Create a secrets.json file(rename secrets.json.example) and fill in the required keys and values.
- create a Postgresql DB with name **borsachart** and add the credentials to secrets.json
- Install and run redis server and add the necessary information to secrets.json
- For celery:
	- in one terminal run ``` celery -A borsachart worker -l info```
	- in another terminal run ```celery -A borsachart beat -l info``` to run the async update of existing redis data.
 

- To test emails, **python -m smtpd -n -c DebuggingServer localhost:1025** can be run on a separate console. Port and host definitions are set in local.py.

- Create a secrets.json file(rename secrets.json.example) and fill in the required keys and values.
- **adapter.py** inside polls application takes care of twitter redirect to React. 
- **middleware.py** takes care of adding CORS headers for Webpack proxy.
- FrontendAppView serves the index.html, from build folder of React app.
- In react app, set the URL variable to local server, see frontend/src/utils/variables;

**python manage.py runserver --settings=borsachart.settings.local** to run local server

- To update the frontend, run ```npm start``` in borsachart/frontend folder. Make sure to comment out build folder usage in base.py:

```
# React App, for production build
# Comment these lines

FRONT_END_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

REACT_APP_DIR = os.path.join(FRONT_END_DIR, 'frontend')

STATICFILES_DIRS = [
    os.path.join(REACT_APP_DIR, 'build', 'static'),
]
```

**Tests:**

 - borsachart/charts/tests - for DRF tests
 - borsachart/frontend/src/tests - for React tests