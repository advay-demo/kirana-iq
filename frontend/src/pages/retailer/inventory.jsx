import React from "react";
import {
  Search,
  Plus,
  Filter,
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import { Link } from "react-router-dom";

function Inventory() {
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

        <button className="bg-orange-500 text-white px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-orange-600 transition shadow-sm">
          <Plus className="w-5 h-5" />
          Add Product
        </button>

      </div>

      {/* SEARCH + FILTER */}
      <div className="flex items-center justify-between mt-10">

        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-4 w-[360px] shadow-sm">
            <Search className="w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              className="outline-none w-full bg-transparent text-gray-700"
            />
          </div>

          {/* FILTER */}
          <button className="bg-white border border-gray-200 rounded-2xl px-6 py-4 flex items-center gap-2 hover:bg-gray-50 transition shadow-sm">
            <Filter className="w-5 h-5" />
            Filters
          </button>

        </div>

        <div className="text-gray-500 text-lg">
          1,284 Products
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
              <th className="px-8 py-6 font-medium">Status</th>
              <th className="px-8 py-6 font-medium">Trend</th>
            </tr>
          </thead>

          <tbody className="text-base">

            {/* ROW */}
            <tr className="border-t border-gray-100 hover:bg-gray-50 transition">

              <td className="px-8 py-6">
                <div>
                  <Link
                    to="/retailer/products/amul-milk"
                    className="hover:text-orange-500 transition"
                  >
                    Amul Milk
                  </Link>

                  <p className="text-gray-400 text-sm mt-1">
                    SKU-29384
                  </p>
                </div>
              </td>

              <td className="px-8 py-6 text-gray-600">
                Dairy
              </td>

              <td className="px-8 py-6">
                24
              </td>

              <td className="px-8 py-6">
                <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-500 text-sm font-medium">
                  Low
                </span>
              </td>

              <td className="px-8 py-6 text-green-500 font-medium">
                ↑ 12%
              </td>

            </tr>

            {/* ROW */}
            <tr className="border-t border-gray-100 hover:bg-gray-50 transition">

              <td className="px-8 py-6">
                <div>
                  <Link
                    to="/retailer/products/parle-g"
                    className="hover:text-orange-500 transition"
                  >
                    Parle-G
                  </Link>

                  <p className="text-gray-400 text-sm mt-1">
                    SKU-93821
                  </p>
                </div>
              </td>

              <td className="px-8 py-6 text-gray-600">
                Snacks
              </td>

              <td className="px-8 py-6">
                120
              </td>

              <td className="px-8 py-6">
                <span className="px-4 py-2 rounded-full bg-green-100 text-green-500 text-sm font-medium">
                  Stable
                </span>
              </td>

              <td className="px-8 py-6 text-green-500 font-medium">
                ↑ 4%
              </td>

            </tr>

            {/* ROW */}
            <tr className="border-t border-gray-100 hover:bg-gray-50 transition">

              <td className="px-8 py-6">
                <div>
                  <Link
                    to="/retailer/products/tata-salt"
                    className="hover:text-orange-500 transition"
                  >
                    Tata Salt
                  </Link>

                  <p className="text-gray-400 text-sm mt-1">
                    SKU-18293
                  </p>
                </div>
              </td>

              <td className="px-8 py-6 text-gray-600">
                Essentials
              </td>

              <td className="px-8 py-6">
                12
              </td>

              <td className="px-8 py-6">
                <span className="px-4 py-2 rounded-full bg-red-100 text-red-500 text-sm font-medium">
                  Critical
                </span>
              </td>

              <td className="px-8 py-6 text-red-500 font-medium">
                ↑ 18%
              </td>

            </tr>

            {/* ROW */}
            <tr className="border-t border-gray-100 hover:bg-gray-50 transition">

              <td className="px-8 py-6">
                <div>
                  <Link
                    to="/retailer/products/maggi"
                    className="hover:text-orange-500 transition"
                  >
                    Maggi
                  </Link>

                  <p className="text-gray-400 text-sm mt-1">
                    SKU-77291
                  </p>
                </div>
              </td>

              <td className="px-8 py-6 text-gray-600">
                Instant Food
              </td>

              <td className="px-8 py-6">
                48
              </td>

              <td className="px-8 py-6">
                <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-500 text-sm font-medium">
                  Low
                </span>
              </td>

              <td className="px-8 py-6 text-green-500 font-medium">
                ↑ 9%
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </RetailerLayout>
  );
}

export default Inventory;