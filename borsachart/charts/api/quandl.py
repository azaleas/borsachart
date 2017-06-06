# Quandl API helper functions

import json
import requests

api_stem_wiki = "https://www.quandl.com/api/v3/datatables/WIKI/"
api_key = "swVUEnpJazpsoEPPnYFV"

def get_ticker(ticker, start_date, end_date):
    """
    Get ticker data for one year
    """
    api_url = api_stem_wiki \
        + "PRICES.json?" \
        + "date.gte=" + start_date \
        + "&date.lt=" + end_date \
        + "&ticker=" + ticker \
        + "&api_key=" + api_key

    ticker_data = requests.request('GET', api_url)
    ticker_data_json = ticker_data.json()
