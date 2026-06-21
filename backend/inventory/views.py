from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.db.models import Q
import random
import requests
import json
import io
try:
    import google.generativeai as genai
    from PIL import Image
except ImportError:
    pass
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

        store_data_pool = [{"name": n, "lat": None, "lng": None} for n in STORE_NAMES]

        # Try to fetch real stores from Google Places API if lat/lng are provided
        if lat and lng and getattr(settings, "GOOGLE_MAPS_API_KEY", None):
            try:
                url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=2000&type=supermarket|grocery_or_supermarket|store&key={settings.GOOGLE_MAPS_API_KEY}"
                resp = requests.get(url, timeout=5)
                if resp.status_code == 200:
                    data = resp.json()
                    results = data.get("results", [])
                    if results:
                        real_stores = []
                        for r in results:
                            name = r.get("name")
                            loc = r.get("geometry", {}).get("location", {})
                            if name and loc:
                                real_stores.append({"name": name, "lat": loc.get("lat"), "lng": loc.get("lng")})
                        
                        if real_stores:
                            store_data_pool = random.sample(real_stores, min(len(real_stores), 10))
            except Exception as e:
                print("Google Places API error:", e)
                pass

        # Find matching products from DB (just to get a baseline price/details)
        matching = Product.objects.filter(name__icontains=q).first()
        base_price = matching.unit_price if matching else round(random.uniform(20, 200), 2)

        stores = []
        # Generate mock inventory for the stores (real or fake)
        num_stores = random.randint(3, len(store_data_pool))
        selected_stores = random.sample(store_data_pool, num_stores)

        for store in selected_stores:
            stock = random.randint(0, 50)
            if stock == 0:
                stock_status = "Out of Stock"
            elif stock <= 5:
                stock_status = "Low Stock"
            else:
                stock_status = "In Stock"

            store_price = float(base_price) * random.uniform(0.9, 1.1)
            
            # If no real coordinates, simulate them slightly around user's location if available
            s_lat = store["lat"]
            s_lng = store["lng"]
            if not s_lat and lat and lng:
                s_lat = float(lat) + random.uniform(-0.015, 0.015)
                s_lng = float(lng) + random.uniform(-0.015, 0.015)

            stores.append({
                "store_name": store["name"],
                "lat": s_lat,
                "lng": s_lng,
                "distance": f"{round(random.uniform(0.3, 4.5), 1)} km",
                "status": stock_status,
                "price": round(store_price, 2) if stock > 0 else None,
                "stock": stock,
            })

        priority = {"In Stock": 0, "Low Stock": 1, "Out of Stock": 2}
        stores.sort(key=lambda x: priority.get(x["status"], 3))

        key = q.lower().strip()
        alt_names = ALTERNATIVES_MAP.get(key, [])
        if not alt_names:
            for k, v in ALTERNATIVES_MAP.items():
                if k in key or key in k:
                    alt_names = v
                    break

        alternatives = []
        for alt in alt_names:
            alternatives.append({
                "name": alt.title(),
                "nearest_store": random.choice(store_data_pool)["name"] if store_data_pool else "Local Store",
                "distance": f"{round(random.uniform(0.2, 3.0), 1)} km",
                "status": random.choice(["In Stock", "In Stock", "Low Stock"]),
                "price": round(random.uniform(20, 150), 0),
            })
            
        # REAL PRODUCTS FOR ADD TO CART
        real_products = Product.objects.filter(name__icontains=q, current_stock__gt=0).select_related("retailer")
        db_products = []
        for rp in real_products:
            db_products.append({
                "id": rp.id,
                "name": rp.name,
                "price": float(rp.unit_price),
                "stock": rp.current_stock,
                "retailer_id": rp.retailer.id,
                "store_name": f"{rp.retailer.username.title()}'s Store",
                "lat": float(lat) + random.uniform(-0.01, 0.01) if lat else None,
                "lng": float(lng) + random.uniform(-0.01, 0.01) if lng else None,
            })

        return Response({"stores": stores, "alternatives": alternatives, "db_products": db_products})


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

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk, retailer=request.user)
            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_invoice(request):
    if not getattr(settings, "GEMINI_API_KEY", None):
        return Response({"error": "Gemini API key not configured"}, status=500)
    
    if "image" not in request.FILES:
        return Response({"error": "No image uploaded"}, status=400)
        
    image_file = request.FILES["image"]
    try:
        img = Image.open(image_file)
        if hasattr(genai, "configure"):
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel('gemini-1.5-pro')
        else:
            return Response({"error": "Google GenAI not installed properly"}, status=500)
        
        prompt = """
        You are a highly accurate OCR and data extraction AI. 
        Read the attached wholesale grocery invoice.
        Extract all line items. 
        Return ONLY a JSON array. Each object in the array should have:
        - "name": string (the product name, clean it up to look like a standard product name)
        - "quantity": integer (number of items)
        - "unit_price": float (price per single unit, calculate if only total price is given)
        Do not include any markdown formatting, just the raw JSON array.
        """
        
        response = model.generate_content([prompt, img])
        
        text_resp = response.text.strip()
        # Clean up markdown if any
        if text_resp.startswith("```json"):
            text_resp = text_resp[7:]
        if text_resp.startswith("```"):
            text_resp = text_resp[3:]
        if text_resp.endswith("```"):
            text_resp = text_resp[:-3]
            
        items = json.loads(text_resp.strip())
        return Response({"items": items})
    except Exception as e:
        print("Invoice upload error:", e)
        return Response({"error": "Failed to parse invoice: " + str(e)}, status=500)
class NotificationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from .models import CustomerOrder
        
        products = Product.objects.filter(
            retailer=request.user
        )

        notifications = []

        # 1. Incoming Order Notifications
        pending_orders = CustomerOrder.objects.filter(retailer=request.user, status="pending")
        for order in pending_orders:
            notifications.append({
                "type": "order",
                "message": f"New incoming order #{order.id} for ₹{order.total_amount}. Needs review.",
            })

        # 2. Inventory Alerts
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
        if not getattr(settings, "GEMINI_API_KEY", None):
            return Response([{"type": "warning", "title": "AI Offline", "message": "Gemini API key is missing."}])

        products = Product.objects.filter(retailer=request.user)
        if not products.exists():
            return Response([{"type": "healthy", "title": "No Inventory", "message": "Add some products to get AI insights."}])

        inventory_data = []
        for p in products:
            inventory_data.append({
                "name": p.name,
                "category": p.category,
                "stock": p.current_stock,
                "reorder_level": p.reorder_level,
                "price": float(p.unit_price)
            })

        try:
            if hasattr(genai, "configure"):
                genai.configure(api_key=settings.GEMINI_API_KEY)
                model = genai.GenerativeModel('gemini-1.5-flash')
                
                prompt = f"""
                You are an expert AI retail consultant for Kirana store owners in India.
                Analyze the following real-time inventory data and write a detailed, highly structured Markdown report.
                Include:
                1. A brief executive summary.
                2. Critical Restock Alerts (if any).
                3. Capital Optimization Opportunities (e.g. overstocked items).
                4. Strategic Retail Advice.
                
                Use headings (##), bold text (**), and bullet points to make it extremely readable.
                
                Inventory Data:
                {json.dumps(inventory_data)}
                """
                
                response = model.generate_content(prompt)
                return Response({"insights": response.text.strip()})
                
            else:
                return Response({"insights": "Google GenAI is not installed properly."})
        except Exception as e:
            print("Gemini Insight Error:", e)
            return Response({"insights": "Failed to generate AI insights right now."})

from .models import CustomerOrder, OrderItem
from .serializers import CustomerOrderSerializer
from django.db import transaction

class CreateOrderView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        retailer_id = data.get("retailer_id")
        customer_name = data.get("customer_name")
        customer_phone = data.get("customer_phone")
        items = data.get("items", []) # [{"product_id": 1, "quantity": 2}]

        if not (retailer_id and customer_name and customer_phone and items):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                order = CustomerOrder.objects.create(
                    retailer_id=retailer_id,
                    customer_name=customer_name,
                    customer_phone=customer_phone,
                    status="pending",
                    total_amount=0
                )
                
                total = 0
                for item in items:
                    product = Product.objects.get(id=item["product_id"], retailer_id=retailer_id)
                    qty = int(item["quantity"])
                    if product.current_stock < qty:
                        raise ValueError(f"Not enough stock for {product.name}")
                    
                    OrderItem.objects.create(
                        order=order,
                        product=product,
                        quantity=qty,
                        price_at_time=product.unit_price
                    )
                    
                    # Deduct stock
                    product.current_stock -= qty
                    product.save()
                    
                    total += (product.unit_price * qty)
                
                order.total_amount = total
                order.save()
                
                serializer = CustomerOrderSerializer(order)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Server Error"}, status=status.HTTP_500_BAD_REQUEST)

class RetailerOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = CustomerOrder.objects.filter(retailer=request.user).order_by("-created_at")
        serializer = CustomerOrderSerializer(orders, many=True)
        return Response(serializer.data)

class UpdateOrderStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, order_id):
        try:
            order = CustomerOrder.objects.get(id=order_id, retailer=request.user)
            new_status = request.data.get("status")
            if new_status in dict(CustomerOrder.STATUS_CHOICES):
                order.status = new_status
                order.save()
                return Response(CustomerOrderSerializer(order).data)
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
        except CustomerOrder.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

from .models import SupplierOrder, SupplierOrderItem
from .serializers import SupplierOrderSerializer

class CreateSupplierOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        distributor_name = data.get("distributor_name")
        items = data.get("items", []) # [{"name": "...", "brand": "...", "quantity": 10, "price": 100}]

        if not distributor_name or not items:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                order = SupplierOrder.objects.create(
                    retailer=request.user,
                    distributor_name=distributor_name,
                    status="pending",
                    total_amount=0
                )
                
                total = 0
                for item in items:
                    qty = int(item["quantity"])
                    price = float(item["price"])
                    SupplierOrderItem.objects.create(
                        order=order,
                        product_name=item["name"],
                        brand=item.get("brand", ""),
                        quantity=qty,
                        unit_price=price
                    )
                    total += (price * qty)
                
                order.total_amount = total
                order.save()
                
                return Response(SupplierOrderSerializer(order).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_BAD_REQUEST)

class ListSupplierOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = SupplierOrder.objects.filter(retailer=request.user).order_by("-created_at")
        return Response(SupplierOrderSerializer(orders, many=True).data)

class UpdateSupplierOrderStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, order_id):
        try:
            order = SupplierOrder.objects.get(id=order_id, retailer=request.user)
            new_status = request.data.get("status")
            
            if new_status not in dict(SupplierOrder.STATUS_CHOICES):
                return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

            # If moving to delivered for the FIRST time
            if new_status == "delivered" and order.status != "delivered":
                with transaction.atomic():
                    order.status = new_status
                    order.save()

                    # Increment inventory automatically!
                    for item in order.items.all():
                        # Try to find an existing product by name for this retailer
                        product = Product.objects.filter(retailer=request.user, name__iexact=item.product_name).first()
                        if product:
                            product.current_stock += item.quantity
                            product.save()
                        else:
                            # Create new product
                            Product.objects.create(
                                retailer=request.user,
                                name=item.product_name,
                                sku=f"SKU-{item.product_name.replace(' ', '-').upper()}-{item.id}",
                                category="groceries", # default
                                current_stock=item.quantity,
                                unit_price=item.unit_price * 1.2, # Add some default margin
                                supplier=order.distributor_name
                            )
            else:
                order.status = new_status
                order.save()

            return Response(SupplierOrderSerializer(order).data)
        except SupplierOrder.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)