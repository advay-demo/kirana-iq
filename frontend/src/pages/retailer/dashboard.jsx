import React from "react";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Bell,
  Settings,
  Search,
  TrendingUp,
  AlertTriangle,
  Brain,
} from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-200 px-6 py-8 flex flex-col justify-between">

        <div>

          {/* LOGO */}
          <div className="font-semibold text-2xl mb-12">
            <span className="text-orange-500">Kirana</span>
            <span className="text-orange-300 ml-1">IQ</span>
          </div>

          {/* NAVIGATION */}
          <nav className="space-y-2">

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50 text-orange-500 font-medium">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </button>

            <Link
                to="/retailer/inventory"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition"
                >
                <Package className="w-5 h-5" />
                Inventory
            </Link>

            <Link
                to="/retailer/analytics"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition"
                >
                <BarChart3 className="w-5 h-5" />
                Analytics
            </Link>

            <Link
                to="/retailer/notifications"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition"
                >
                <Bell className="w-5 h-5" />
                Notifications
            </Link>

            <Link
                to="/retailer/settings"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition"
                >
                <Settings className="w-5 h-5" />
                Settings
            </Link>

          </nav>
        </div>

        {/* USER */}
        <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-semibold">
            A
          </div>

          <div>
            <h3 className="font-medium">Advay</h3>
            <p className="text-sm text-gray-500">
              Retailer Account
            </p>
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">

        {/* TOPBAR */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-semibold">
              Good evening, Advay 👋
            </h1>

            <p className="text-gray-500 mt-1">
              Here’s what’s happening in your store today.
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 w-[280px]">
              <Search className="w-4 h-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search inventory..."
                className="outline-none text-sm w-full bg-transparent"
              />
            </div>

            <button className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mt-10">

          {/* CARD */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Low Stock
                </p>

                <h2 className="text-3xl font-semibold mt-2">
                  12
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>

            </div>
          </div>

          {/* CARD */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  AI Suggestions
                </p>

                <h2 className="text-3xl font-semibold mt-2">
                  28
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <Brain className="w-5 h-5 text-orange-500" />
              </div>

            </div>
          </div>

          {/* CARD */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Predicted Demand
                </p>

                <h2 className="text-3xl font-semibold mt-2">
                  +18%
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>

            </div>
          </div>

          {/* CARD */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Products
                </p>

                <h2 className="text-3xl font-semibold mt-2">
                  1,284
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-orange-500" />
              </div>

            </div>
          </div>

        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          {/* INVENTORY TABLE */}
          <div className="col-span-2 bg-white border border-gray-200 rounded-3xl p-6">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Inventory Overview
              </h2>

              <button className="text-sm text-orange-500 hover:underline">
                View all
              </button>
            </div>

            <table className="w-full">

              <thead>
                <tr className="text-left text-sm text-gray-400 border-b border-gray-100">
                  <th className="pb-4">Product</th>
                  <th className="pb-4">Stock</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Trend</th>
                </tr>
              </thead>

              <tbody className="text-sm">

                <tr className="border-b border-gray-100">
                  <td className="py-4">Amul Milk</td>
                  <td>24</td>
                  <td className="text-orange-500">Low</td>
                  <td>↑ 12%</td>
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="py-4">Parle-G</td>
                  <td>120</td>
                  <td className="text-green-500">Stable</td>
                  <td>↑ 4%</td>
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="py-4">Tata Salt</td>
                  <td>12</td>
                  <td className="text-red-500">Critical</td>
                  <td>↑ 18%</td>
                </tr>

              </tbody>

            </table>
          </div>

          {/* AI INSIGHTS */}
          <div className="bg-black text-white rounded-3xl p-6 flex flex-col justify-between">

            <div>
              <span className="text-sm text-gray-400">
                AI Insight
              </span>

              <h2 className="text-2xl font-semibold mt-3 leading-snug">
                Rice demand may increase by 18% next week.
              </h2>

              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                Based on historical trends and current demand patterns,
                restocking is recommended within the next 3 days.
              </p>
            </div>

            <button className="mt-8 bg-white text-black rounded-xl py-3 hover:bg-gray-100 transition">
              View Insights
            </button>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;