import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from inventory.models import Distributor, DistributorCatalogItem

def seed():
    # Clear existing data
    DistributorCatalogItem.objects.all().delete()
    Distributor.objects.all().delete()

    print("Seeding Distributors...")

    d1 = Distributor.objects.create(name="Reliance B2B", rating=4.8, category_type="Groceries & FMCG")
    d2 = Distributor.objects.create(name="Udaan Wholesale", rating=4.5, category_type="Snacks & Beverages")
    d3 = Distributor.objects.create(name="Metro Cash & Carry", rating=4.9, category_type="All Categories")

    print("Seeding Catalog Items...")

    DistributorCatalogItem.objects.create(distributor=d1, brand="Parle", name="Parle-G Gold 1kg", price=95, mrp=120, min_qty=10)
    DistributorCatalogItem.objects.create(distributor=d1, brand="Britannia", name="Good Day Cashew", price=40, mrp=50, min_qty=20)
    DistributorCatalogItem.objects.create(distributor=d1, brand="Amul", name="Pure Ghee 1L", price=540, mrp=600, min_qty=6)

    DistributorCatalogItem.objects.create(distributor=d2, brand="Haldiram", name="Bhujia Sev 1kg", price=210, mrp=260, min_qty=10)
    DistributorCatalogItem.objects.create(distributor=d2, brand="Coca-Cola", name="Thums Up 2L x 6", price=480, mrp=540, min_qty=2)

    DistributorCatalogItem.objects.create(distributor=d3, brand="Aashirvaad", name="Select Wheat Atta 5kg", price=240, mrp=280, min_qty=5)

    print("Seeding Complete!")

if __name__ == '__main__':
    seed()
