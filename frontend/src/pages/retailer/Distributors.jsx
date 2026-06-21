import React, { useState } from "react";
import { Search, ShoppingCart, TrendingUp, PackageOpen } from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";

const MOCK_DISTRIBUTORS = [
  { id: 1, name: "Reliance B2B", rating: 4.8, type: "Groceries & FMCG" },
  { id: 2, name: "Udaan Wholesale", rating: 4.5, type: "Snacks & Beverages" },
  { id: 3, name: "Metro Cash & Carry", rating: 4.9, type: "All Categories" }
];

const MOCK_CATALOG = [
  { id: 101, brand: "Parle", name: "Parle-G Gold 1kg", price: 95, mrp: 120, min_qty: 10, distId: 1 },
  { id: 102, brand: "Britannia", name: "Good Day Cashew", price: 40, mrp: 50, min_qty: 20, distId: 1 },
  { id: 103, brand: "Aashirvaad", name: "Select Wheat Atta 5kg", price: 240, mrp: 280, min_qty: 5, distId: 3 },
  { id: 104, brand: "Haldiram", name: "Bhujia Sev 1kg", price: 210, mrp: 260, min_qty: 10, distId: 2 },
  { id: 105, brand: "Amul", name: "Pure Ghee 1L", price: 540, mrp: 600, min_qty: 6, distId: 1 },
  { id: 106, brand: "Coca-Cola", name: "Thums Up 2L x 6", price: 480, mrp: 540, min_qty: 2, distId: 2 },
];

function Distributors() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to purchase order!`);
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    alert(`B2B Order placed successfully for ${cart.length} items! Your inventory will be updated upon delivery.`);
    setCart([]);
  };

  const filtered = MOCK_CATALOG.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));

  return (
    <RetailerLayout>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Distributor Marketplace</h1>
          <p className="text-gray-500 mt-2 text-lg">Order inventory directly from top B2B suppliers.</p>
        </div>
        <button 
          onClick={placeOrder}
          className="bg-orange-500 text-white px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-orange-600 transition font-bold"
        >
          <ShoppingCart className="w-5 h-5" />
          Checkout ({cart.length})
        </button>
      </div>

      {/* Distributors */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {MOCK_DISTRIBUTORS.map(d => (
          <div key={d.id} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
              <PackageOpen className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{d.name}</h3>
              <p className="text-sm text-gray-500">{d.type} • ⭐ {d.rating}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FMCG catalog..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
          <button className="bg-gray-100 text-gray-700 px-6 py-4 rounded-2xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> Fast Movers
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition bg-gray-50/50">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{p.brand}</div>
              <h4 className="font-bold text-gray-900 text-lg mb-4">{p.name}</h4>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="text-2xl font-bold text-gray-900">₹{p.price} <span className="text-sm text-gray-400 font-normal">/ unit</span></div>
                  <div className="text-sm text-green-600 font-medium mt-1">Margin: {Math.round(((p.mrp - p.price) / p.mrp) * 100)}% (MRP ₹{p.mrp})</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-2 rounded-xl">Min: {p.min_qty}</span>
                <button 
                  onClick={() => addToCart(p)}
                  className="flex-1 bg-gray-900 text-white py-2 rounded-xl font-medium hover:bg-black transition"
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RetailerLayout>
  );
}

export default Distributors;
