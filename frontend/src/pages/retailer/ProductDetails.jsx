import React from "react";
import {
  Package,
  TrendingUp,
  Brain,
  Truck,
  AlertTriangle,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import RetailerLayout from "../../layouts/RetailerLayout";

const trendData = [
  { day: "Mon", stock: 90 },
  { day: "Tue", stock: 82 },
  { day: "Wed", stock: 75 },
  { day: "Thu", stock: 61 },
  { day: "Fri", stock: 48 },
  { day: "Sat", stock: 32 },
];

function ProductDetails() {
  return (
    <RetailerLayout>

      {/* HEADER */}
      <div className="flex items-start justify-between">

        <div className="flex gap-6">

          {/* PRODUCT IMAGE */}
          <div className="w-40 h-40 rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
              alt="Amul Milk"
              className="w-full h-full object-cover"
            />
          </div>

          {/* INFO */}
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Dairy Product
            </p>

            <h1 className="text-5xl font-semibold mt-2">
              Amul Milk
            </h1>

            <div className="flex items-center gap-4 mt-5 flex-wrap">

              <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-500 font-medium">
                Low Stock
              </span>

              <span className="text-gray-500">
                SKU: AM-29384
              </span>

              <span className="text-gray-500">
                ₹32 / unit
              </span>

              <span className="text-gray-500">
                Supplier: Fresh Dairy Ltd
              </span>

            </div>
          </div>

        </div>

      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <p className="text-gray-500">Current Stock</p>

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-5xl font-semibold">32</h2>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Package className="text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <p className="text-gray-500">Weekly Demand</p>

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-5xl font-semibold">+18%</h2>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <TrendingUp className="text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <p className="text-gray-500">Reorder Level</p>

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-5xl font-semibold">50</h2>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <p className="text-gray-500">Lead Time</p>

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-5xl font-semibold">2d</h2>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Truck className="text-orange-500" />
            </div>
          </div>
        </div>

      </div>

      {/* CHART + AI */}
      <div className="grid grid-cols-3 gap-6 mt-10">

        {/* TREND */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold">
              Stock Movement Trend
            </h2>

            <p className="text-gray-500 mt-1">
              Inventory depletion over the week
            </p>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="stock"
                  stroke="#f97316"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* AI CARD */}
        <div className="bg-black text-white rounded-3xl p-8 flex flex-col justify-between shadow-sm">

          <div>

            <div className="flex items-center gap-2 text-orange-400 mb-6">
              <Brain className="w-5 h-5" />
              <span>AI Recommendation</span>
            </div>

            <h2 className="text-4xl font-semibold leading-tight">
              Restock within 3 days to avoid stockout.
            </h2>

            <p className="text-gray-400 mt-6 text-lg leading-relaxed">
              Based on demand velocity, historical purchasing behavior,
              and supplier lead time.
            </p>

          </div>

          <button className="mt-8 bg-white text-black py-4 rounded-2xl font-medium hover:bg-gray-100 transition">
            Create Restock Order
          </button>

        </div>

      </div>

      {/* SUPPLIERS */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 mt-10 shadow-sm">

        <h2 className="text-2xl font-semibold mb-8">
          Supplier Comparison
        </h2>

        <table className="w-full">

          <thead className="text-left text-gray-400 border-b border-gray-100">
            <tr>
              <th className="pb-5">Supplier</th>
              <th className="pb-5">Price</th>
              <th className="pb-5">Availability</th>
              <th className="pb-5">Delivery</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b border-gray-100">
              <td className="py-5">Fresh Dairy Ltd</td>
              <td>₹32</td>
              <td className="text-green-500">Available</td>
              <td>2 days</td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="py-5">Metro Wholesale</td>
              <td>₹34</td>
              <td className="text-orange-500">Limited</td>
              <td>1 day</td>
            </tr>

            <tr>
              <td className="py-5">Retail Hub Supply</td>
              <td>₹31</td>
              <td className="text-red-500">Unavailable</td>
              <td>—</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* TIMELINE */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 mt-10 shadow-sm">

        <h2 className="text-2xl font-semibold mb-8">
          Recent Activity
        </h2>

        <div className="space-y-5">

          <div className="flex items-center justify-between border rounded-2xl p-5">
            <div className="flex gap-4 items-center">
              <Brain className="text-orange-500" />
              <div>
                <h3 className="font-medium">
                  AI suggested reorder
                </h3>
                <p className="text-gray-500">
                  Stock trend indicates upcoming shortage
                </p>
              </div>
            </div>
            <span className="text-gray-400">10 mins ago</span>
          </div>

          <div className="flex items-center justify-between border rounded-2xl p-5">
            <div className="flex gap-4 items-center">
              <Clock3 className="text-orange-500" />
              <div>
                <h3 className="font-medium">
                  Inventory synced
                </h3>
                <p className="text-gray-500">
                  Supplier availability refreshed
                </p>
              </div>
            </div>
            <span className="text-gray-400">1 hour ago</span>
          </div>

          <div className="flex items-center justify-between border rounded-2xl p-5">
            <div className="flex gap-4 items-center">
              <ArrowUpRight className="text-orange-500" />
              <div>
                <h3 className="font-medium">
                  Demand spike detected
                </h3>
                <p className="text-gray-500">
                  Milk sales increased 18%
                </p>
              </div>
            </div>
            <span className="text-gray-400">Yesterday</span>
          </div>

        </div>

      </div>

    </RetailerLayout>
  );
}

export default ProductDetails;