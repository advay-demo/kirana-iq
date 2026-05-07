import React from "react";

import {
  LayoutDashboard,
  Package,
  BarChart3,
  Bell,
  Settings,
  Search,
  Plus,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

function Inventory() {
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

          {/* NAV */}
          <nav className="space-y-2">

            <Link to="/retailer/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>

            <Link to="/retailer/inventory" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50 text-orange-500 font-medium">
              <Package className="w-5 h-5" />
              Inventory
            </Link>

            <Link to="/retailer/analytics" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition">
              <BarChart3 className="w-5 h-5" />
              Analytics
            </Link>

            <Link to="/retailer/notifications" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition">
              <Bell className="w-5 h-5" />
              Notifications
            </Link  >

            <Link to="/retailer/settings" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition">
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

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* TOPBAR */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-semibold">
              Inventory
            </h1>

            <p className="text-gray-500 mt-1">
              Manage stock, availability, and product insights.
            </p>
          </div>

          <button className="bg-orange-500 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-orange-600 transition">
            <Plus className="w-4 h-4" />
            Add Product
          </button>

        </div>

        {/* SEARCH + FILTERS */}
        <div className="flex items-center justify-between mt-8">

          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 w-[320px]">
              <Search className="w-4 h-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search products..."
                className="outline-none text-sm w-full bg-transparent"
              />
            </div>

            {/* FILTER */}
            <button className="bg-white border border-gray-200 rounded-2xl px-5 py-3 flex items-center gap-2 hover:bg-gray-50 transition">
              <Filter className="w-4 h-4" />
              Filters
            </button>

          </div>

          <div className="text-sm text-gray-500">
            1,284 Products
          </div>

        </div>

        {/* INVENTORY TABLE */}
        <div className="bg-white border border-gray-200 rounded-3xl mt-8 overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50 text-left text-sm text-gray-400">
              <tr>
                <th className="px-6 py-5 font-medium">Product</th>
                <th className="px-6 py-5 font-medium">Category</th>
                <th className="px-6 py-5 font-medium">Stock</th>
                <th className="px-6 py-5 font-medium">Status</th>
                <th className="px-6 py-5 font-medium">Trend</th>
              </tr>
            </thead>

            <tbody className="text-sm">

              {/* ROW */}
              <tr className="border-t border-gray-100 hover:bg-gray-50 transition">

                <td className="px-6 py-5">
                  <div>
                    <h3 className="font-medium">
                      Amul Milk
                    </h3>

                    <p className="text-gray-400 text-xs mt-1">
                      SKU-29384
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 text-gray-600">
                  Dairy
                </td>

                <td className="px-6 py-5">
                  24
                </td>

                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-500 text-xs font-medium">
                    Low
                  </span>
                </td>

                <td className="px-6 py-5 text-green-500">
                  ↑ 12%
                </td>

              </tr>

              {/* ROW */}
              <tr className="border-t border-gray-100 hover:bg-gray-50 transition">

                <td className="px-6 py-5">
                  <div>
                    <h3 className="font-medium">
                      Parle-G
                    </h3>

                    <p className="text-gray-400 text-xs mt-1">
                      SKU-93821
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 text-gray-600">
                  Snacks
                </td>

                <td className="px-6 py-5">
                  120
                </td>

                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-500 text-xs font-medium">
                    Stable
                  </span>
                </td>

                <td className="px-6 py-5 text-green-500">
                  ↑ 4%
                </td>

              </tr>

              {/* ROW */}
              <tr className="border-t border-gray-100 hover:bg-gray-50 transition">

                <td className="px-6 py-5">
                  <div>
                    <h3 className="font-medium">
                      Tata Salt
                    </h3>

                    <p className="text-gray-400 text-xs mt-1">
                      SKU-18293
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 text-gray-600">
                  Essentials
                </td>

                <td className="px-6 py-5">
                  12
                </td>

                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-500 text-xs font-medium">
                    Critical
                  </span>
                </td>

                <td className="px-6 py-5 text-red-500">
                  ↑ 18%
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </main>
    </div>
  );
}

export default Inventory;