import React from "react";

import {
  Search,
  TrendingUp,
  AlertTriangle,
  Brain,
  Package,
  Bell,
  ArrowUpRight,
} from "lucide-react";

import RetailerLayout from "../../layouts/RetailerLayout";

function Dashboard() {
  return (
    <RetailerLayout>

      {/* TOP BAR */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-5xl font-semibold tracking-tight">
            Good evening, Advay 👋
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Here’s what’s happening in your store today.
          </p>
        </div>

        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 w-96 shadow-sm">

            <Search className="w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search inventory..."
              className="outline-none w-full bg-transparent text-gray-700"
            />

          </div>

          {/* NOTIFICATION */}
          <button className="w-14 h-14 bg-white border border-gray-200 rounded-2xl flex items-center justify-center hover:border-orange-200 transition-all duration-300">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mt-10">

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 shadow-sm">

          <p className="text-gray-500 text-lg">
            Low Stock
          </p>

          <div className="flex items-center justify-between mt-6">

            <h2 className="text-6xl font-semibold">
              12
            </h2>

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="text-orange-500 w-7 h-7" />
            </div>

          </div>

        </div>

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 shadow-sm">

          <p className="text-gray-500 text-lg">
            AI Suggestions
          </p>

          <div className="flex items-center justify-between mt-6">

            <h2 className="text-6xl font-semibold">
              28
            </h2>

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Brain className="text-orange-500 w-7 h-7" />
            </div>

          </div>

        </div>

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 shadow-sm">

          <p className="text-gray-500 text-lg">
            Predicted Demand
          </p>

          <div className="flex items-center justify-between mt-6">

            <h2 className="text-6xl font-semibold">
              +18%
            </h2>

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
              <TrendingUp className="text-orange-500 w-7 h-7" />
            </div>

          </div>

        </div>

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 shadow-sm">

          <p className="text-gray-500 text-lg">
            Products
          </p>

          <div className="flex items-center justify-between mt-6">

            <h2 className="text-6xl font-semibold">
              1,284
            </h2>

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Package className="text-orange-500 w-7 h-7" />
            </div>

          </div>

        </div>

      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-3 gap-6 mt-10">

        {/* INVENTORY TABLE */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-semibold">
              Inventory Overview
            </h2>

            <button className="text-orange-500 hover:text-orange-600 transition">
              View all
            </button>

          </div>

          <table className="w-full">

            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">

                <th className="pb-4 font-medium">
                  Product
                </th>

                <th className="pb-4 font-medium">
                  Stock
                </th>

                <th className="pb-4 font-medium">
                  Status
                </th>

                <th className="pb-4 font-medium">
                  Trend
                </th>

              </tr>
            </thead>

            <tbody className="text-lg">

              <tr className="border-b border-gray-100">
                <td className="py-5">Amul Milk</td>
                <td>24</td>

                <td>
                  <span className="text-orange-500">
                    Low
                  </span>
                </td>

                <td>↑ 12%</td>
              </tr>

              <tr className="border-b border-gray-100">
                <td className="py-5">Parle-G</td>
                <td>120</td>

                <td>
                  <span className="text-green-500">
                    Stable
                  </span>
                </td>

                <td>↑ 4%</td>
              </tr>

              <tr className="border-b border-gray-100">
                <td className="py-5">Tata Salt</td>
                <td>12</td>

                <td>
                  <span className="text-red-500">
                    Critical
                  </span>
                </td>

                <td>↑ 18%</td>
              </tr>

              <tr>
                <td className="py-5">Maggi</td>
                <td>48</td>

                <td>
                  <span className="text-orange-500">
                    Low
                  </span>
                </td>

                <td>↑ 9%</td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* AI CARD */}
        <div className="bg-black rounded-3xl p-8 text-white flex flex-col justify-between shadow-sm">

          <div>

            <div className="flex items-center gap-2 text-orange-400 mb-6">

              <Brain className="w-5 h-5" />

              <span>
                AI Insight
              </span>

            </div>

            <h2 className="text-5xl font-semibold leading-tight">
              Rice demand may increase by 18% next week.
            </h2>

            <p className="text-gray-400 mt-6 text-lg leading-relaxed">
              Based on historical trends and current demand patterns,
              restocking is recommended within the next 3 days.
            </p>

          </div>

          <button className="mt-10 bg-white text-black py-4 rounded-2xl hover:bg-gray-100 transition font-medium text-lg">
            View Insights
          </button>

        </div>

      </div>

      {/* ACTIVITY */}
      <div className="mt-10 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-semibold">
            Recent Activity
          </h2>

          <button className="text-orange-500 hover:text-orange-600 transition">
            View history
          </button>

        </div>

        <div className="space-y-5 mt-8">

          {/* ITEM */}
          <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-5 hover:border-orange-200 transition-all duration-300">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <Brain className="w-5 h-5 text-orange-500" />
              </div>

              <div>
                <h3 className="font-medium text-lg">
                  AI suggested restocking Maggi
                </h3>

                <p className="text-gray-500">
                  Demand expected to rise this weekend.
                </p>
              </div>

            </div>

            <span className="text-gray-400">
              2 min ago
            </span>

          </div>

          {/* ITEM */}
          <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-5 hover:border-orange-200 transition-all duration-300">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>

              <div>
                <h3 className="font-medium text-lg">
                  Tata Salt stock dropped below threshold
                </h3>

                <p className="text-gray-500">
                  Inventory level marked as critical.
                </p>
              </div>

            </div>

            <span className="text-gray-400">
              15 min ago
            </span>

          </div>

          {/* ITEM */}
          <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-5 hover:border-orange-200 transition-all duration-300">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              </div>

              <div>
                <h3 className="font-medium text-lg">
                  Inventory synced successfully
                </h3>

                <p className="text-gray-500">
                  Supplier data updated automatically.
                </p>
              </div>

            </div>

            <span className="text-gray-400">
              1 hour ago
            </span>

          </div>

        </div>

      </div>

    </RetailerLayout>
  );
}

export default Dashboard;