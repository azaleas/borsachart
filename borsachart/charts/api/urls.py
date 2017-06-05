from django.conf.urls import url, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('charts', views.ChartsViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]