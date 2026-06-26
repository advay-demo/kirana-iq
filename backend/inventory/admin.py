from django.contrib import admin
from .models import Product, CustomerOrder, OrderItem, SupplierOrder, SupplierOrderItem

admin.site.register(Product)
admin.site.register(CustomerOrder)
admin.site.register(OrderItem)
admin.site.register(SupplierOrder)
admin.site.register(SupplierOrderItem)

from .models import Distributor, DistributorCatalogItem
admin.site.register(Distributor)
admin.site.register(DistributorCatalogItem)
