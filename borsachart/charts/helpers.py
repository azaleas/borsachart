# Helper functions for API
import json
import ast
import time
import redis
from datetime import date, timedelta, datetime

from django.conf import settings
from django.utils import timezone
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from channels import Group

from .models import Ticker
from .quandl import get_ticker


r = redis.StrictRedis(host=settings.REDIS_HOST,
                    port=settings.REDIS_PORT)

def get_ticker_data(ticker):
    """
    Get the ticker data from DB if it's not older than a day.
    Otherwise, get the data from Quandl
    """
    date_cached = timezone.now() - timedelta(days=1)
    try:    
        ticker_data = Ticker.objects.get(
                    ticker=ticker, 
                    updated_date__gte=date_cached,
                )
        ticker_data = ticker_data.ticker_data
        
    except ObjectDoesNotExist:
        ticker_data = get_ticker_data_quandl(ticker)
        if ticker_data['datatable']['data']:
            Ticker.objects.update_or_create(
                ticker=ticker,
                ticker_data=ticker_data
            )
        else:
            return "not found"

    ticker_data_combined = {
        "ticker": ticker,
        "data": ticker_data
    }
    return json.dumps(ticker_data_combined)

def get_ticker_data_quandl(ticker):
    """
    Get the ticker data from Quandl. Limit the data to one year
    """
    start_date = (timezone.now() - timedelta(days=365)).strftime("%Y%m%d")
    end_date = timezone.now().strftime("%Y%m%d")
    ticker_quandl_data = get_ticker(ticker, start_date, end_date)
    return ticker_quandl_data


def redis_total_tickers():
    """
    Collect all tickers in Redis DB
    """
    total_tickers = []
    ticker_list = r.get('ticker_list')
    if ticker_list:
        ticker_list = ast.literal_eval(ticker_list.decode('utf-8'))
        for ticker in ticker_list:
            redis_data = r.get('ticker:{}:data'.format(ticker))
            data = json.loads(redis_data.decode('utf-8'))
            total_tickers.append(data)
    return total_tickers

def send_redis_data():
    """
    Send collected redis data to the group
    """
    total_tickers = redis_total_tickers()
    Group('charts').send({
        "text": json.dumps(total_tickers)
    })

def initial_client_connect():
    """
    Initial connection of client, send data from redis
    """
    total_tickers = redis_total_tickers()
    return total_tickers

def remove_ticker_redis(ticker):
    """
    Remove the ticker from redis db and send new list via websocket
    """
    r.delete("ticker:{}:data".format(ticker))
    ticker_list = r.get('ticker_list')
    if ticker_list:
        ticker_list = ast.literal_eval(ticker_list.decode('utf-8'))
        try:
            ticker_list.remove(ticker)
        except:
            pass
        r.set('ticker_list', ticker_list)
    send_redis_data()

def ticker_list(ticker):
    ticker_list = r.get('ticker_list')
    if not ticker_list:
        tickers = []
        tickers.append(ticker)
        r.set('ticker_list', json.dumps(tickers))
    else:
        ticker_list = ast.literal_eval(ticker_list.decode('utf-8'))
        if ticker not in ticker_list:
            ticker_list.append(ticker)
        else:
            print('{} ticker already exists in the list'.format(ticker))
        r.set('ticker_list', ticker_list)
