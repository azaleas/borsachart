from django.contrib import admin
from .models import Ticker

# Register your models here.

class TickerAdmin(admin.ModelAdmin):
    list_display = ['ticker', 'created_date', 'updated_date']
    list_filter = ['updated_date', 'created_date']

admin.site.register(Ticker, TickerAdmin)