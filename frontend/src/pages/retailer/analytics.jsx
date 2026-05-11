import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import { getAnalytics } from "../../services/auth";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
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
          Loading analytics...
        </div>
      </RetailerLayout>
    );
  }

  if (!analytics) {
    return (
      <RetailerLayout>
        <div className="text-2xl font-medium text-red-500">
          Failed to load analytics.
        </div>
      </RetailerLayout>
    );
  }

  const stockHealth = analytics.stock_health;
  const COLORS = [
  "#22c55e",
  "#f97316",
  "#ef4444",
];

  const stockHealthData = [
    {
      name: "Healthy",
      value: stockHealth.healthy,
    },
    {
      name: "Low",
      value: stockHealth.low,
    },
    {
      name: "Critical",
      value: stockHealth.critical,
    },
  ];

  const categoryData = Object.entries(
    analytics.category_breakdown
  ).map(([category, count]) => ({
    category: category.replace("_", " "),
    count,
  }));

  return (
    <RetailerLayout>
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Visual insights powered by your inventory data.
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-4 gap-6 mt-10">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500">
              Inventory Value
            </p>

            <h2 className="text-4xl font-semibold mt-3">
              ₹{analytics.inventory_value}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-green-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500">
              Healthy
            </p>

            <h2 className="text-5xl font-semibold mt-3">
              {stockHealth.healthy}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-green-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500">
              Low Stock
            </p>

            <h2 className="text-5xl font-semibold mt-3">
              {stockHealth.low}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-orange-500" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500">
              Critical
            </p>

            <h2 className="text-5xl font-semibold mt-3">
              {stockHealth.critical}
            </h2>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
        </div>
      </div>

      {/* CHARTS */}
      {/* CHARTS */}
<div className="grid grid-cols-2 gap-8 mt-10">

  {/* PIE */}
  <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
    <h2 className="text-2xl font-semibold mb-6">
      Stock Health
    </h2>

    <div className="h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={stockHealthData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={120}
            innerRadius={55}
            paddingAngle={5}
          >
            {stockHealthData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* BAR */}
  <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
    <h2 className="text-2xl font-semibold mb-6">
      Category Breakdown
    </h2>

    <div className="h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={categoryData}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#f97316"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

</div>

      {/* INSIGHT */}
      <div className="mt-10">
        <div className="bg-black rounded-3xl p-10 text-white max-w-2xl">
          <p className="text-orange-400 text-sm uppercase tracking-wide">
            AI Insight Preview
          </p>

          <h2 className="text-4xl font-semibold mt-4 leading-tight">
            {stockHealth.critical > 0
              ? `${stockHealth.critical} critical stock risks detected.`
              : "Inventory health looks stable."}
          </h2>

          <p className="text-gray-400 mt-5 text-lg leading-relaxed">
            AI forecasting and smart reorder predictions coming next.
          </p>
        </div>
      </div>
    </RetailerLayout>
  );
}

export default Analytics;