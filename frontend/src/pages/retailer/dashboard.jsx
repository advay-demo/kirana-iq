import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Package,
  TrendingUp,
  Brain,
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import { getDashboardStats } from "../../services/auth";
import { useUser } from "@clerk/react";

function Dashboard() {
  const [stats, setStats] = useState({
    total_products: 0,
    low_stock: 0,
    critical_stock: 0,
    inventory_value: 0,
  });

  const [loading, setLoading] = useState(true);
  const { user } = useUser();



  const displayName = user?.firstName || localStorage.getItem("userName") || "Retailer";

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <RetailerLayout>
        <div className="text-2xl font-medium">
          Loading dashboard...
        </div>
      </RetailerLayout>
    );
  }

  return (
    <RetailerLayout>
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight">
            Welcome back, {displayName}
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Here's what's happening in your store today.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mt-10">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-lg">
              Low Stock
            </p>

            <h2 className="text-5xl font-semibold mt-3">
              {stats.low_stock}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-orange-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-lg">
              Critical Stock
            </p>

            <h2 className="text-5xl font-semibold mt-3">
              {stats.critical_stock}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
            <Brain className="w-7 h-7 text-red-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-lg">
              Inventory Value
            </p>

            <h2 className="text-4xl font-semibold mt-3">
              ₹{stats.inventory_value}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-green-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-lg">
              Products
            </p>

            <h2 className="text-5xl font-semibold mt-3">
              {stats.total_products}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
            <Package className="w-7 h-7 text-orange-500" />
          </div>
        </div>
      </div>

      {/* INSIGHT PANEL */}
      <div className="mt-10">
        <div className="bg-black rounded-3xl p-10 text-white max-w-xl">
          <p className="text-orange-400 text-sm uppercase tracking-wide">
            Live Store Insight
          </p>

          <h2 className="text-4xl font-semibold mt-4 leading-tight">
            {stats.low_stock > 0
              ? `${stats.low_stock} products need restocking soon.`
              : "Inventory looks healthy."}
          </h2>

          <p className="text-gray-400 mt-5 text-lg leading-relaxed">
            Real-time inventory monitoring powered by your backend data.
          </p>
        </div>
      </div>
    </RetailerLayout>
  );
}

export default Dashboard;