from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.db.models import Q
import random
import requests
from django.conf import settings

from .models import Product
from django.db import models
from .serializers import ProductSerializer


# ── PUBLIC SEARCH ──────────────────────────────────────────
ALTERNATIVES_MAP = {
    "milk":       ["toned milk", "soy milk", "almond milk", "buffalo milk"],
    "bread":      ["brown bread", "multigrain bread", "pav", "roti"],
    "rice":       ["basmati rice", "sona masoori", "brown rice", "poha"],
    "sugar":      ["jaggery", "brown sugar", "honey", "stevia"],
    "atta":       ["maida", "multigrain atta", "besan", "sooji"],
    "dal":        ["moong dal", "masoor dal", "chana dal", "toor dal"],
    "oil":        ["sunflower oil", "mustard oil", "groundnut oil", "ghee"],
    "tea":        ["green tea", "herbal tea", "coffee", "masala tea"],
    "soap":       ["hand wash", "body wash", "neem soap", "dettol soap"],
    "biscuits":   ["cookies", "crackers", "rusk", "wafers"],
    "shampoo":    ["conditioner", "hair oil", "dry shampoo", "reetha"],
    "detergent":  ["washing powder", "liquid detergent", "surf excel", "vim"],
    "eggs":       ["tofu", "paneer", "soy chunks", "mushrooms"],
    "butter":     ["margarine", "ghee", "cream cheese", "coconut oil"],
    "namkeen":    ["chips", "popcorn", "roasted peanuts", "murukku"],
}

STORE_NAMES = [
    "Sharma General Store", "Patel Kirana", "Lakshmi Provisions",
    "Singh Mart", "Om Namah Stores", "New India Grocery",
    "Gupta & Sons", "Sri Venkateshwara Stores", "Metro Kirana",
    "Daily Needs", "Fresh Corner", "Jai Hind Provisions",
]


class ProductSuggestView(APIView):
    """Autocomplete: returns matching product names (no auth needed)"""
    permission_classes = [AllowAny]

    def get(self, request):
        q = request.query_params.get("q", "").strip()
        if not q or len(q) < 2:
            return Response([])

        # Match from DB products
        db_names = list(
            Product.objects.filter(name__icontains=q)
            .values_list("name", flat=True)
            .distinct()[:6]
        )

        # Also match from our static alternatives map keys
        static = [k for k in ALTERNATIVES_MAP if q.lower() in k]

        combined = list(dict.fromkeys(db_names + static))[:8]
        return Response(combined)


class ProductSearchView(APIView):
    """Full search results page data (no auth needed)"""
    permission_classes = [AllowAny]

    def get(self, request):
        q = request.query_params.get("q", "").strip()
        lat = request.query_params.get("lat")
        lng = request.query_params.get("lng")

        if not q:
            return Response({"stores": [], "alternatives": []})

        store_names_to_use = STORE_NAMES.copy()

        # Try to fetch real stores from Google Places API if lat/lng are provided
        if lat and lng and getattr(settings, "GOOGLE_MAPS_API_KEY", None):
            try:
                url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=2000&type=supermarket|grocery_or_supermarket|store&key={settings.GOOGLE_MAPS_API_KEY}"
                resp = requests.get(url, timeout=5)
                if resp.status_code == 200:
                    data = resp.json()
                    results = data.get("results", [])
                    if results:
                        real_stores = [r.get("name") for r in results if r.get("name")]
                        # Randomly pick up to 10 real stores to mix in
                        store_names_to_use = random.sample(real_stores, min(len(real_stores), 10))
            except Exception as e:
                print("Google Places API error:", e)
                pass

        # Find matching products from DB (just to get a baseline price/details)
        matching = Product.objects.filter(name__icontains=q).first()
        base_price = matching.unit_price if matching else round(random.uniform(20, 200), 2)

        stores = []
        # Generate mock inventory for the stores (real or fake)
        num_stores = random.randint(3, len(store_names_to_use))
        selected_stores = random.sample(store_names_to_use, num_stores)

        for store_name in selected_stores:
            stock = random.randint(0, 50)
            if stock == 0:
                stock_status = "Out of Stock"
            elif stock <= 5:
                stock_status = "Low Stock"
            else:
                stock_status = "In Stock"

            # slight price variation per store
            store_price = float(base_price) * random.uniform(0.9, 1.1)

            stores.append({
                "store_name": store_name,
                "distance": f"{round(random.uniform(0.3, 4.5), 1)} km",
                "status": stock_status,
                "price": round(store_price, 2) if stock > 0 else None,
                "stock": stock,
            })

        # Sort by status priority: In Stock > Low Stock > Out of Stock
        priority = {"In Stock": 0, "Low Stock": 1, "Out of Stock": 2}
        stores.sort(key=lambda x: priority.get(x["status"], 3))

        # Alternatives — from map or generic
        key = q.lower().strip()
        alt_names = ALTERNATIVES_MAP.get(key, [])
        if not alt_names:
            # fuzzy: check if any key is a substring
            for k, v in ALTERNATIVES_MAP.items():
                if k in key or key in k:
                    alt_names = v
                    break

        # Build alternative store cards (mock nearest availability)
        alternatives = []
        for alt in alt_names:
            alternatives.append({
                "name": alt.title(),
                "nearest_store": random.choice(store_names_to_use),
                "distance": f"{round(random.uniform(0.2, 3.0), 1)} km",
                "status": random.choice(["In Stock", "In Stock", "Low Stock"]),
                "price": round(random.uniform(20, 150), 0),
            })

        return Response({"stores": stores, "alternatives": alternatives})


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