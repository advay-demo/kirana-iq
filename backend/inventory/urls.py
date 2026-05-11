from django.urls import path
from .views import (
    ProductListCreateView,
    DashboardStatsView,
    ProductDetailView,
    NotificationsView,
    AnalyticsView,
    AIInsightsView
)

urlpatterns = [
    path("products/", ProductListCreateView.as_view()),
    path("dashboard/", DashboardStatsView.as_view()),
    path("products/<int:product_id>/", ProductDetailView.as_view()),
    path("notifications/", NotificationsView.as_view()),
    path("analytics/", AnalyticsView.as_view()),
    path("ai-insights/", AIInsightsView.as_view()),
]