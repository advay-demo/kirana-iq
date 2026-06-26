from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["retailer", "created_at"]

from .models import CustomerOrder, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_name", "quantity", "price_at_time"]

class CustomerOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = CustomerOrder
        fields = "__all__"
        read_only_fields = ["retailer", "status", "total_amount", "created_at"]

from .models import SupplierOrder, SupplierOrderItem

class SupplierOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplierOrderItem
        fields = ["id", "product_name", "brand", "quantity", "unit_price"]

class SupplierOrderSerializer(serializers.ModelSerializer):
    items = SupplierOrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = SupplierOrder
        fields = "__all__"
        read_only_fields = ["retailer", "total_amount", "created_at"]

from .models import Distributor, DistributorCatalogItem

class DistributorCatalogItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistributorCatalogItem
        fields = "__all__"

class DistributorSerializer(serializers.ModelSerializer):
    catalog = DistributorCatalogItemSerializer(many=True, read_only=True)

    class Meta:
        model = Distributor
        fields = ["id", "name", "rating", "category_type", "catalog"]