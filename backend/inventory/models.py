from django.db import models
from accounts.models import User


class Product(models.Model):
    CATEGORY_CHOICES = [
        ("dairy", "Dairy"),
        ("snacks", "Snacks"),
        ("beverages", "Beverages"),
        ("groceries", "Groceries"),
        ("personal_care", "Personal Care"),
        ("household", "Household"),
    ]

    retailer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="products"
    )

    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100, unique=True)

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    current_stock = models.PositiveIntegerField(default=0)
    reorder_level = models.PositiveIntegerField(default=10)

    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    supplier = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    expiry_date = models.DateField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CustomerOrder(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("ready", "Ready for Pickup"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]
    retailer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="customer_orders")
    customer_name = models.CharField(max_length=255)
    customer_phone = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(CustomerOrder, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price_at_time = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"