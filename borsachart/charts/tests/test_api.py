import json

from unittest.mock import patch, MagicMock

from django.contrib.auth.models import User
from django.conf import settings

from rest_framework.test import APITestCase

import redis

from charts.models import Ticker

from .mock_data import quandl_results_json, \
     quandl_results_not_found_json, \
     db_data_json

r = redis.StrictRedis(host=settings.REDIS_HOST,
                    port=settings.REDIS_PORT)

"""
Run the Redis server on different port to have a clean redis for tests
redis-server --port somePortNumber(i.e. 7777)
"""

class ChartsAPITestCase(APITestCase):

    # Initial Setup

    def setUp(self):
        r.flushall()
        self.ticker1 = Ticker.objects.create(
            ticker = "g",
            ticker_data = db_data_json
        )

    def tearUp(self):
        r.flushall()

    # TEST FUNCTIONS
    def test_search_in_cache(self):
        """
        Test if we can fetch the data from local DB
        """

        response = self.client.post(
            '/api/v1/charts/searchticker/',
            data={
                "ticker": "g",
            },
            format="json"
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, "ok")

    @patch('charts.quandl.get_ticker')
    def test_search_quandl_fetch(self, mock_quandl_search):
        """
        Test API fetch from Quandl API
        """
        mock_quandl_search.status_code = 200
        mock_quandl_search.return_value = quandl_results_json
        response = self.client.post(
            '/api/v1/charts/searchticker/',
            data={
                "ticker": "v",
            },
            format="json"
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, "ok")

