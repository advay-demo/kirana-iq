from django.urls import path
from .views import me, onboard_retailer, retailer_profile_view

urlpatterns = [
    path("me/", me),
    path("onboard/", onboard_retailer),
    path("profile/", retailer_profile_view),
]