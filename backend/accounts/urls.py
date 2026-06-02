from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import signup, login, onboard_retailer

urlpatterns = [
    path("signup/", signup),
    path("login/", login),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("onboard/", onboard_retailer),
]