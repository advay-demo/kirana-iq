from django.urls import path
from .views import me, onboard_retailer

urlpatterns = [
    path("me/", me),
    path("onboard/", onboard_retailer),
]