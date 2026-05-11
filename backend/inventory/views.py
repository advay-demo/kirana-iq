from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Product
from django.db import models
from .serializers import ProductSerializer


class ProductListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.filter(retailer=request.user)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(retailer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.filter(retailer=request.user)

        total_products = products.count()

        low_stock = products.filter(
            current_stock__lte=models.F("reorder_level")
        ).count()

        critical_stock = products.filter(
            current_stock__lte=models.F("reorder_level") / 2
        ).count()

        inventory_value = sum(
            product.current_stock * product.unit_price
            for product in products
        )

        return Response({
            "total_products": total_products,
            "low_stock": low_stock,
            "critical_stock": critical_stock,
            "inventory_value": inventory_value,
        })
class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, product_id):
        try:
            product = Product.objects.get(
                id=product_id,
                retailer=request.user
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProductSerializer(product)
        return Response(serializer.data)
    def patch(self, request, product_id):
        try:
            product = Product.objects.get(
                id=product_id,
                retailer=request.user
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProductSerializer(
            product,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    def delete(self, request, product_id):
        try:
            product = Product.objects.get(
                id=product_id,
                retailer=request.user
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        product.delete()
        return Response(
        {"message": "Product deleted successfully"},
        status=status.HTTP_204_NO_CONTENT
    )
class NotificationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.filter(
            retailer=request.user
        )

        notifications = []

        for product in products:
            if product.current_stock <= product.reorder_level / 2:
                notifications.append({
                    "type": "critical",
                    "message": f"{product.name} requires immediate restock.",
                })

            elif product.current_stock <= product.reorder_level:
                notifications.append({
                    "type": "low",
                    "message": f"{product.name} is running low on stock.",
                })

        return Response(notifications)
class AnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.filter(
            retailer=request.user
        )

        category_breakdown = {}
        healthy = 0
        low = 0
        critical = 0
        inventory_value = 0

        for product in products:
            category = product.category
            category_breakdown[category] = (
                category_breakdown.get(category, 0) + 1
            )

            inventory_value += (
                product.current_stock * product.unit_price
            )

            if product.current_stock <= product.reorder_level / 2:
                critical += 1
            elif product.current_stock <= product.reorder_level:
                low += 1
            else:
                healthy += 1

        return Response({
            "category_breakdown": category_breakdown,
            "stock_health": {
                "healthy": healthy,
                "low": low,
                "critical": critical,
            },
            "inventory_value": inventory_value,
        })
class AIInsightsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.filter(
            retailer=request.user
        )

        insights = []

        for product in products:
            if product.current_stock <= product.reorder_level / 2:
                insights.append({
                    "type": "critical",
                    "title": "Urgent Restock",
                    "message": f"{product.name} may stock out soon.",
                })

            elif product.current_stock <= product.reorder_level:
                insights.append({
                    "type": "warning",
                    "title": "Reorder Recommended",
                    "message": f"{product.name} stock is running low.",
                })

            elif product.current_stock > product.reorder_level * 4:
                insights.append({
                    "type": "overstock",
                    "title": "Inventory Optimization",
                    "message": f"Too much capital tied in {product.name}.",
                })

        if not insights:
            insights.append({
                "type": "healthy",
                "title": "Inventory Healthy",
                "message": "No major inventory risks detected.",
            })

        return Response(insights)