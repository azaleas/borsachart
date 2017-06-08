import re
import json
import time
from datetime import date, timedelta, datetime

import redis
from celery.task.schedules import crontab
from celery.decorators import periodic_task

from django.conf import settings
from django.utils import timezone
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from channels import Group

from .models import Ticker
from .helpers import send_redis_data, get_ticker_data_quandl


r = redis.StrictRedis(host=settings.REDIS_HOST,
                    port=settings.REDIS_PORT)


@periodic_task(run_every=(crontab(minute='*/60')), name="check_redis_db", ignore_result=True)
def check_redis_db():
    """
    Check redis db every hour. 
    Update tickers which are older than 24 hours
    """
    print('hello world')
    date_cached = timezone.now() - timedelta(days=1)
    updated = False
    for ticker in r.scan_iter(match='ticker:*'):    
        ticker_decoded = ticker.decode('utf-8')
        ticker_clean = re.findall(r':([^:]*):', ticker_decoded)[0]
        try:
            ticker_data = Ticker.objects.get(
                            ticker=ticker_clean,
                            updated_date__gte=date_cached,
                        )
        except ObjectDoesNotExist:
            updated = True
            ticker_data = get_ticker_data_quandl(ticker_clean)
            Ticker.objects.update_or_create(
                ticker=ticker_clean,
                ticker_data=ticker_data
            )

            ticker_data_combined = {
                "ticker": ticker_clean,
                "data": ticker_data
            }
            r.set('ticker:{}:data'.format(ticker_clean), json.dumps(ticker_data_combined))
    if updated:
        send_redis_data()