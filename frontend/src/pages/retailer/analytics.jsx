import React from "react";

import {
  LayoutDashboard,
  Package,
  BarChart3,
  Bell,
  Settings,
  TrendingUp,
  Brain,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 2400 },
  { month: "Feb", sales: 3200 },
  { month: "Mar", sales: 2800 },
  { month: "Apr", sales: 4100 },
  { month: "May", sales: 5200 },
  { month: "Jun", sales: 6100 },
];

const demandData = [
  { day: "Mon", demand: 30 },
  { day: "Tue", demand: 45 },
  { day: "Wed", demand: 38 },
  { day: "Thu", demand: 60 },
  { day: "Fri", demand: 75 },
  { day: "Sat", demand: 58 },
];

function Analytics() {
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

            <Link
              to="/retailer/dashboard"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>

            <Link
              to="/retailer/inventory"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition"
            >
              <Package className="w-5 h-5" />
              Inventory
            </Link>

            <Link
              to="/retailer/analytics"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50 text-orange-500 font-medium"
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </Link>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition">
              <Bell className="w-5 h-5" />
              Notifications
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition">
              <Settings className="w-5 h-5" />
              Settings
            </button>

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

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-semibold">
              Analytics
            </h1>

            <p className="text-gray-500 mt-1">
              Monitor sales, demand trends, and AI-powered insights.
            </p>
          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 mt-10">

          {/* CARD */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Revenue Growth
                </p>

                <h2 className="text-3xl font-semibold mt-2">
                  +24%
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
                  AI Insights
                </p>

                <h2 className="text-3xl font-semibold mt-2">
                  18
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
                  Monthly Sales
                </p>

                <h2 className="text-3xl font-semibold mt-2">
                  ₹61K
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-500" />
              </div>

            </div>
          </div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          {/* SALES CHART */}
          <div className="col-span-2 bg-white border border-gray-200 rounded-3xl p-6">

            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-semibold">
                  Sales Overview
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Monthly sales performance
                </p>
              </div>
            </div>

            <div className="h-[320px]">

              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>

                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />

                  <XAxis dataKey="month" />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#f97316"
                    strokeWidth={3}
                  />

                </LineChart>
              </ResponsiveContainer>

            </div>
          </div>

          {/* AI INSIGHTS */}
          <div className="bg-black text-white rounded-3xl p-6 flex flex-col justify-between">

            <div>

              <span className="text-sm text-gray-400">
                AI Insight
              </span>

              <h2 className="text-2xl font-semibold mt-4 leading-snug">
                Snack category demand expected to increase this weekend.
              </h2>

              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                KiranaIQ predicts a 22% spike in snack sales based on
                historical weekend demand trends.
              </p>

            </div>

            <button className="mt-8 bg-white text-black rounded-xl py-3 hover:bg-gray-100 transition">
              View Details
            </button>

          </div>

        </div>

        {/* SECOND ROW */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 mt-8">

          <div className="mb-8">
            <h2 className="text-xl font-semibold">
              Weekly Demand Forecast
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI-powered demand trend analysis
            </p>
          </div>

          <div className="h-[320px]">

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demandData}>

                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />

                <XAxis dataKey="day" />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="#f97316"
                  fillOpacity={1}
                  fill="url(#colorDemand)"
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>
        </div>

      </main>
    </div>
  );
}

export default Analytics;