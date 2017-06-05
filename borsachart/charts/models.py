from django.contrib.postgres.fields import JSONField
from django.db import models

class Ticker(models.Model):
    """
    Ticker model saves the data from Quandl API, cached for a day
    """
    ticker = models.CharField(max_length=300, unique=True, db_index=True)
    ticker_data = JSONField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True, db_index=True)

    class Meta:
        ordering = ['ticker']
        index_together = [
            ["ticker", "updated_date"]
        ]

    def __str__(self):
        return self.ticker
