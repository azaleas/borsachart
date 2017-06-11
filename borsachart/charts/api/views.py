import json
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route
import redis
from channels import Group

from ..models import Ticker
from .serializers import TickerSerializer

from ..helpers import get_ticker_data, send_redis_data, initial_client_connect, ticker_list

r = redis.StrictRedis(host=settings.REDIS_HOST,
                    port=settings.REDIS_PORT)

class ChartsViewSet(viewsets.ViewSet):
    """
    Viewset to deal with search and view method
    """
    queryset = Ticker.objects.all()
    serializer_class = TickerSerializer

    def list(self, request):
        return Response("BorsaChart - Charting app, using Quandl API")

    @list_route(methods=['post', 'get'])
    def searchticker(self, request):
        if request.method == 'GET':
            r.flushall()
            return Response('Search for ticker...', status.HTTP_200_OK)
        else:
            serializer = TickerSerializer(data=request.data)
            if serializer.is_valid():
                ticker = (request.data['ticker']).lower()
                json_data = get_ticker_data(ticker)
                if json_data == 'not found':
                    return Response("not found", status.HTTP_404_NOT_FOUND)
                else:
                    r.set('ticker:{}:data'.format(ticker), json_data)
                    ticker_list(ticker)
                    send_redis_data()
                    return Response("ok", status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['get'])
    def first_connect(self, request):
        return Response(initial_client_connect(), status.HTTP_200_OK)
 