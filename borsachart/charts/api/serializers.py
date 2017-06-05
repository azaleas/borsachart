from rest_framework import serializers

from ..models import Ticker

class TickerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ticker
        fields = ['id', 'ticker']
