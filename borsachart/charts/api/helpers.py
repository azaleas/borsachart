# Helper functions for API
import json
import time
from datetime import date, timedelta, datetime

from django.utils import timezone

from ..models import Ticker

from .quandl import get_ticker

def get_ticker_data(ticker):
    """
    Get the ticker data from DB if it's not older than a day.
    Otherwise, get the data from Quandl
    """
    date_cached = timezone.now() - timedelta(days=1)
    ticker_data = Ticker.objects.filter(
                ticker=ticker, 
                updated_date__gte=date_cached,
            )

    if ticker_data:
        pass
    else:
        ticker_data = get_ticker_data_quandl(ticker)
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
