import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  X,
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import { Link } from "react-router-dom";
import {
  getProducts,
  createProduct,
} from "../../services/auth";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "groceries",
    current_stock: "",
    reorder_level: "",
    unit_price: "",
    supplier: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (stock, reorderLevel) => {
    if (stock <= reorderLevel / 2) {
      return {
        label: "Critical",
        style: "bg-red-100 text-red-500",
      };
    }

    if (stock <= reorderLevel) {
      return {
        label: "Low",
        style: "bg-orange-100 text-orange-500",
      };
    }

    return {
      label: "Stable",
      style: "bg-green-100 text-green-500",
    };
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        ...formData,
        current_stock: Number(formData.current_stock),
        reorder_level: Number(formData.reorder_level),
        unit_price: Number(formData.unit_price),
      });

      setShowModal(false);

      setFormData({
        name: "",
        sku: "",
        category: "groceries",
        current_stock: "",
        reorder_level: "",
        unit_price: "",
        supplier: "",
      });

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  };

  if (loading) {
    return (
      <RetailerLayout>
        <div className="text-2xl font-medium">
          Loading inventory...
        </div>
      </RetailerLayout>
    );
  }

  return (
    <RetailerLayout>
      {/* TOPBAR */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Inventory
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Manage stock, availability, and product insights.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-orange-600 transition shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 w-[360px] shadow-sm">
            <Search className="w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              className="outline-none w-full bg-transparent text-gray-700"
            />
          </div>

          <button className="bg-white border border-gray-200 rounded-2xl px-6 py-4 flex items-center gap-2 hover:bg-gray-50 transition shadow-sm">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="text-gray-500 text-lg">
          {products.length} Products
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-3xl mt-10 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-gray-400">
            <tr>
              <th className="px-8 py-6 font-medium">Product</th>
              <th className="px-8 py-6 font-medium">Category</th>
              <th className="px-8 py-6 font-medium">Stock</th>
              <th className="px-8 py-6 font-medium">Price</th>
              <th className="px-8 py-6 font-medium">Status</th>
              <th className="px-8 py-6 font-medium">Supplier</th>
            </tr>
          </thead>

          <tbody className="text-base">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const status = getStatus(
                  product.current_stock,
                  product.reorder_level
                );

                return (
                  <tr
                    key={product.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-8 py-6">
                      <div>
                        <Link
                          to={`/retailer/products/${product.id}`}
                          className="hover:text-orange-500 transition font-medium"
                        >
                          {product.name}
                        </Link>

                        <p className="text-gray-400 text-sm mt-1">
                          {product.sku}
                        </p>
                      </div>
                    </td>

                    <td className="px-8 py-6 text-gray-600 capitalize">
                      {product.category.replace("_", " ")}
                    </td>

                    <td className="px-8 py-6">
                      {product.current_stock}
                    </td>

                    <td className="px-8 py-6">
                      ₹{product.unit_price}
                    </td>

                    <td className="px-8 py-6">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${status.style}`}
                      >
                        {status.label}
                      </span>
                    </td>

                    <td className="px-8 py-6 text-gray-600">
                      {product.supplier || "-"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[700px] rounded-3xl p-8 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <X />
            </button>

            <h2 className="text-3xl font-semibold mb-8">
              Add Product
            </h2>

            <form
              onSubmit={handleCreateProduct}
              className="grid grid-cols-2 gap-5"
            >
              <input
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <input
                name="sku"
                placeholder="SKU"
                value={formData.sku}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              >
                <option value="groceries">Groceries</option>
                <option value="dairy">Dairy</option>
                <option value="snacks">Snacks</option>
                <option value="beverages">Beverages</option>
                <option value="personal_care">Personal Care</option>
                <option value="household">Household</option>
              </select>

              <input
                name="supplier"
                placeholder="Supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <input
                type="number"
                name="current_stock"
                placeholder="Current Stock"
                value={formData.current_stock}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <input
                type="number"
                name="reorder_level"
                placeholder="Reorder Level"
                value={formData.reorder_level}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <input
                type="number"
                step="0.01"
                name="unit_price"
                placeholder="Unit Price"
                value={formData.unit_price}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <button
                type="submit"
                className="col-span-2 bg-orange-500 text-white py-4 rounded-2xl font-medium hover:bg-orange-600 transition"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      )}
    </RetailerLayout>
  );
}

export default Inventory;