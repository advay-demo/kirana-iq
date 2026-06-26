import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Plus,
  X,
  Download,
  ScanLine,
  UploadCloud,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import { Link } from "react-router-dom";
import {
  getProducts,
  createProduct,
  apiFetch,
} from "../../services/auth";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "groceries",
    current_stock: "",
    reorder_level: "",
    unit_price: "",
    supplier: "",
  });

  // --- Scan State ---
  const [scanFile, setScanFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState([]);
  const [isAddingScanned, setIsAddingScanned] = useState(false);
  const fileInputRef = useRef(null);

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
    if (stock <= reorderLevel / 2) return { label: "Critical", style: "bg-red-100 text-red-500" };
    if (stock <= reorderLevel) return { label: "Low", style: "bg-orange-100 text-orange-500" };
    return { label: "Stable", style: "bg-green-100 text-green-500" };
  };

  const handleExportCSV = () => {
    const headers = ["Product Name", "SKU", "Category", "Current Stock", "Reorder Level", "Unit Price", "Supplier", "Status"];
    const rows = filteredProducts.map((product) => {
      const status = getStatus(product.current_stock, product.reorder_level).label;
      return [product.name, product.sku, product.category, product.current_stock, product.reorder_level, product.unit_price, product.supplier || "", status];
    });
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "inventory_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const productStatus = getStatus(product.current_stock, product.reorder_level).label.toLowerCase();
    const matchesStatus = statusFilter === "all" || productStatus === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        name: "", sku: "", category: "groceries", current_stock: "", reorder_level: "", unit_price: "", supplier: "",
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  };

  // --- Scan Handlers ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setScanFile(file);
    setIsScanning(true);
    
    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const res = await apiFetch(`${(import.meta.env.VITE_API_URL || "http://127.0.0.1:8001/api")}/inventory/upload-invoice/`, {
        method: "POST",
        body: uploadData, // no Content-Type so browser sets multipart/form-data
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to scan");
      
      const mapped = data.items.map((item, idx) => ({
        id: idx,
        name: item.name,
        category: "groceries",
        current_stock: item.quantity,
        reorder_level: 10,
        unit_price: item.unit_price,
        sku: "AI-" + Math.floor(Math.random() * 1000000),
      }));
      setScannedItems(mapped);
    } catch (err) {
      console.error(err);
      alert("AI Scan failed: " + err.message);
      setScanFile(null);
    } finally {
      setIsScanning(false);
    }
  };

  const handleScannedItemChange = (id, field, value) => {
    setScannedItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeScannedItem = (id) => {
    setScannedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleConfirmScan = async () => {
    setIsAddingScanned(true);
    try {
      for (const item of scannedItems) {
        await createProduct({
          name: item.name,
          sku: item.sku,
          category: item.category,
          current_stock: Number(item.current_stock),
          reorder_level: Number(item.reorder_level),
          unit_price: Number(item.unit_price),
        });
      }
      setShowScanModal(false);
      setScanFile(null);
      setScannedItems([]);
      fetchProducts();
    } catch (err) {
      alert("Failed to add some products. Check console.");
      console.error(err);
    } finally {
      setIsAddingScanned(false);
    }
  };

  if (loading) {
    return (
      <RetailerLayout>
        <div className="text-2xl font-medium">Loading inventory...</div>
      </RetailerLayout>
    );
  }

  return (
    <RetailerLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Inventory</h1>
          <p className="text-gray-500 mt-2 text-lg">Manage stock, availability, and product insights.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-white border border-gray-200 px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-gray-50 transition shadow-sm font-medium"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>

          <button
            onClick={() => setShowScanModal(true)}
            className="bg-purple-100 text-purple-600 border border-purple-200 px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-purple-200 transition shadow-sm font-bold"
          >
            <ScanLine className="w-5 h-5" />
            Scan Invoice ✨
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 text-white px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-orange-600 transition shadow-sm font-bold"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex items-center gap-4 mt-10 flex-wrap">
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 w-[350px] shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full bg-transparent font-medium"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm font-medium outline-none"
        >
          <option value="all">All Categories</option>
          <option value="groceries">Groceries</option>
          <option value="dairy">Dairy</option>
          <option value="snacks">Snacks</option>
          <option value="beverages">Beverages</option>
          <option value="personal_care">Personal Care</option>
          <option value="household">Household</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm font-medium outline-none"
        >
          <option value="all">All Status</option>
          <option value="stable">Stable</option>
          <option value="low">Low</option>
          <option value="critical">Critical</option>
        </select>

        <div className="ml-auto text-gray-500 font-medium">
          {filteredProducts.length} Products
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
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-400">No matching products found.</td>
              </tr>
            ) : (
              filteredProducts.map((product) => {
                const status = getStatus(product.current_stock, product.reorder_level);
                return (
                  <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-8 py-6">
                      <div>
                        <Link to={`/retailer/products/${product.id}`} className="hover:text-orange-500 transition font-bold text-gray-900">
                          {product.name}
                        </Link>
                        <p className="text-gray-400 text-sm mt-1">{product.sku}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 capitalize text-gray-600 font-medium">{product.category.replace("_", " ")}</td>
                    <td className="px-8 py-6 font-semibold text-gray-900">{product.current_stock}</td>
                    <td className="px-8 py-6 font-semibold text-gray-900">₹{product.unit_price}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${status.style}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-gray-500 font-medium">{product.supplier || "-"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* AI SCAN MODAL */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => { setShowScanModal(false); setScanFile(null); setScannedItems([]); }}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <ScanLine className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">AI Invoice Scanner ✨</h2>
                <p className="text-gray-500 text-sm">Upload a bill to automatically extract and add products.</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {!scanFile && !isScanning && (
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-purple-200 bg-purple-50/50 hover:bg-purple-50 rounded-3xl p-16 flex flex-col items-center justify-center text-center cursor-pointer transition group"
                >
                  <UploadCloud className="w-16 h-16 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Click to upload an invoice</h3>
                  <p className="text-gray-500">Supports JPG, PNG, WEBP (Max 5MB)</p>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                </div>
              )}

              {isScanning && (
                <div className="py-24 flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-16 h-16 text-purple-500 animate-spin mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Gemini is reading your invoice...</h3>
                  <p className="text-gray-500">Extracting product names, quantities, and prices.</p>
                </div>
              )}

              {scannedItems.length > 0 && !isScanning && (
                <div className="animate-fade-in">
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 mb-6">
                    <CheckCircle2 className="text-green-600 w-6 h-6" />
                    <div>
                      <p className="text-green-800 font-bold">Successfully extracted {scannedItems.length} items</p>
                      <p className="text-green-700 text-sm">Review the details below before adding to inventory.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {scannedItems.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="col-span-4">
                          <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 block">Product Name</label>
                          <input type="text" value={item.name} onChange={(e) => handleScannedItemChange(item.id, "name", e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-medium outline-none focus:border-purple-400" />
                        </div>
                        <div className="col-span-3">
                          <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 block">Category</label>
                          <select value={item.category} onChange={(e) => handleScannedItemChange(item.id, "category", e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-medium outline-none focus:border-purple-400">
                            <option value="groceries">Groceries</option>
                            <option value="dairy">Dairy</option>
                            <option value="snacks">Snacks</option>
                            <option value="beverages">Beverages</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 block">Qty</label>
                          <input type="number" value={item.current_stock} onChange={(e) => handleScannedItemChange(item.id, "current_stock", e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-medium outline-none focus:border-purple-400" />
                        </div>
                        <div className="col-span-2">
                          <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 block">Price</label>
                          <input type="number" step="0.01" value={item.unit_price} onChange={(e) => handleScannedItemChange(item.id, "unit_price", e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-medium outline-none focus:border-purple-400" />
                        </div>
                        <div className="col-span-1 flex justify-end pt-5">
                          <button onClick={() => removeScannedItem(item.id)} className="text-gray-400 hover:text-red-500 transition p-2 bg-white rounded-lg border border-gray-200 shadow-sm"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end gap-3">
                    <button onClick={() => { setScanFile(null); setScannedItems([]); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">Cancel</button>
                    <button onClick={handleConfirmScan} disabled={isAddingScanned} className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition flex items-center gap-2">
                      {isAddingScanned ? <><Loader2 className="w-4 h-4 animate-spin" /> Adding...</> : <><Plus className="w-4 h-4" /> Add All to Inventory</>}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STANDARD ADD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[700px] rounded-3xl p-8 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <X />
            </button>
            <h2 className="text-3xl font-semibold mb-8">Add Product</h2>
            <form onSubmit={handleCreateProduct} className="grid grid-cols-2 gap-5">
              <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required className="border border-gray-200 rounded-2xl px-4 py-4 outline-none" />
              <input name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} required className="border border-gray-200 rounded-2xl px-4 py-4 outline-none" />
              <select name="category" value={formData.category} onChange={handleChange} className="border border-gray-200 rounded-2xl px-4 py-4 outline-none">
                <option value="groceries">Groceries</option>
                <option value="dairy">Dairy</option>
                <option value="snacks">Snacks</option>
                <option value="beverages">Beverages</option>
                <option value="personal_care">Personal Care</option>
                <option value="household">Household</option>
              </select>
              <input name="supplier" placeholder="Supplier" value={formData.supplier} onChange={handleChange} className="border border-gray-200 rounded-2xl px-4 py-4 outline-none" />
              <input type="number" name="current_stock" placeholder="Current Stock" value={formData.current_stock} onChange={handleChange} required className="border border-gray-200 rounded-2xl px-4 py-4 outline-none" />
              <input type="number" name="reorder_level" placeholder="Reorder Level" value={formData.reorder_level} onChange={handleChange} required className="border border-gray-200 rounded-2xl px-4 py-4 outline-none" />
              <input type="number" step="0.01" name="unit_price" placeholder="Unit Price" value={formData.unit_price} onChange={handleChange} required className="border border-gray-200 rounded-2xl px-4 py-4 outline-none" />
              <button type="submit" className="col-span-2 bg-orange-500 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition shadow-lg">
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