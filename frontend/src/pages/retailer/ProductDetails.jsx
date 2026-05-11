import React, { useEffect, useState } from "react";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  Truck,
  ArrowLeft,
  Edit,
  X,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import RetailerLayout from "../../layouts/RetailerLayout";
import {
  getProductDetail,
  updateProduct,
  deleteProduct,
} from "../../services/auth";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    current_stock: "",
    reorder_level: "",
    unit_price: "",
    supplier: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductDetail(id);
      setProduct(data);

      setFormData({
        name: data.name,
        sku: data.sku,
        category: data.category,
        current_stock: data.current_stock,
        reorder_level: data.reorder_level,
        unit_price: data.unit_price,
        supplier: data.supplier || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, {
        ...formData,
        current_stock: Number(formData.current_stock),
        reorder_level: Number(formData.reorder_level),
        unit_price: Number(formData.unit_price),
      });

      setShowModal(false);
      fetchProduct();
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };
  const handleDeleteProduct = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteProduct(id);
    navigate("/retailer/inventory");
  } catch (error) {
    console.error(error);
    alert("Failed to delete product");
  }
};

  if (loading) {
    return (
      <RetailerLayout>
        <div className="text-2xl font-medium">
          Loading product...
        </div>
      </RetailerLayout>
    );
  }

  if (!product) {
    return (
      <RetailerLayout>
        <div className="text-2xl font-medium text-red-500">
          Product not found.
        </div>
      </RetailerLayout>
    );
  }

  const stockStatus =
    product.current_stock <= product.reorder_level / 2
      ? "Critical"
      : product.current_stock <= product.reorder_level
      ? "Low"
      : "Stable";

  const stockStyle =
    stockStatus === "Critical"
      ? "bg-red-100 text-red-500"
      : stockStatus === "Low"
      ? "bg-orange-100 text-orange-500"
      : "bg-green-100 text-green-500";

  return (
    <RetailerLayout>
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => navigate("/retailer/inventory")}
            className="mb-6 flex items-center gap-2 text-gray-500 hover:text-orange-500 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Inventory
          </button>

          <p className="text-gray-400 uppercase tracking-wide text-sm">
            PRODUCT DETAILS
          </p>

          <h1 className="text-5xl font-semibold mt-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <span
              className={`px-5 py-2 rounded-full text-sm font-medium ${stockStyle}`}
            >
              {stockStatus}
            </span>

            <span className="text-gray-500">
              SKU: {product.sku}
            </span>

            <span className="text-gray-500">
              ₹{product.unit_price} / unit
            </span>

            <span className="text-gray-500">
              Supplier: {product.supplier || "Not specified"}
            </span>
          </div>
        </div>
<div className="flex gap-3">
  <button
    onClick={handleDeleteProduct}
    className="bg-red-500 text-white px-6 py-4 rounded-2xl hover:bg-red-600 transition"
  >
    Delete
  </button>

  <button
    onClick={() => setShowModal(true)}
    className="bg-orange-500 text-white px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-orange-600 transition"
  >
    <Edit className="w-5 h-5" />
    Edit Product
  </button>
</div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mt-10">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-lg">
              Current Stock
            </p>

            <h2 className="text-5xl font-semibold mt-3">
              {product.current_stock}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
            <Package className="w-7 h-7 text-orange-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-lg">
              Reorder Level
            </p>

            <h2 className="text-5xl font-semibold mt-3">
              {product.reorder_level}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-lg">
              Product Value
            </p>

            <h2 className="text-4xl font-semibold mt-3">
              ₹{product.current_stock * product.unit_price}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-green-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-lg">
              Supplier Status
            </p>

            <h2 className="text-2xl font-semibold mt-5">
              Active
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Truck className="w-7 h-7 text-blue-500" />
          </div>
        </div>
      </div>

      {/* INSIGHT */}
      <div className="mt-10">
        <div className="bg-black rounded-3xl p-10 text-white max-w-2xl">
          <p className="text-orange-400 text-sm uppercase tracking-wide">
            Product Insight
          </p>

          <h2 className="text-4xl font-semibold mt-4 leading-tight">
            {stockStatus === "Critical"
              ? "Immediate restock recommended."
              : stockStatus === "Low"
              ? "Stock running low. Plan reorder soon."
              : "Inventory level looks healthy."}
          </h2>

          <p className="text-gray-400 mt-5 text-lg leading-relaxed">
            Real-time product monitoring powered by backend inventory data.
          </p>
        </div>
      </div>

      {/* EDIT MODAL */}
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
              Edit Product
            </h2>

            <form
              onSubmit={handleUpdateProduct}
              className="grid grid-cols-2 gap-5"
            >
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <input
                name="sku"
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
                value={formData.supplier}
                onChange={handleChange}
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <input
                type="number"
                name="current_stock"
                value={formData.current_stock}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <input
                type="number"
                name="reorder_level"
                value={formData.reorder_level}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <input
                type="number"
                step="0.01"
                name="unit_price"
                value={formData.unit_price}
                onChange={handleChange}
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <button
                type="submit"
                className="col-span-2 bg-orange-500 text-white py-4 rounded-2xl font-medium hover:bg-orange-600 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </RetailerLayout>
  );
}

export default ProductDetail;