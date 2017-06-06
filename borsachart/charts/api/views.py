from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route

from ..models import Ticker
from .serializers import TickerSerializer

from .helpers import get_ticker_data

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
            return Response('Search for ticker...', status.HTTP_200_OK)
        else:
            serializer = TickerSerializer(data=request.data)
            if serializer.is_valid():
                ticker = request.data['ticker']
                json_data = get_ticker_data(ticker)
                return Response(ticker, status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
