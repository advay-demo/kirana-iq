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