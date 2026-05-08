import React from "react";
import {
  TrendingUp,
  Brain,
  BarChart3,
} from "lucide-react";

import RetailerLayout from "../../layouts/RetailerLayout";

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
    <RetailerLayout>

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Monitor sales, demand trends, and AI-powered insights.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mt-10">

        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm hover:-translate-y-1 hover:border-orange-200 transition-all duration-300">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-lg">
                Revenue Growth
              </p>

              <h2 className="text-5xl font-semibold mt-4">
                +24%
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-orange-500" />
            </div>

          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm hover:-translate-y-1 hover:border-orange-200 transition-all duration-300">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-lg">
                AI Insights
              </p>

              <h2 className="text-5xl font-semibold mt-4">
                18
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Brain className="w-7 h-7 text-orange-500" />
            </div>

          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm hover:-translate-y-1 hover:border-orange-200 transition-all duration-300">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-lg">
                Monthly Sales
              </p>

              <h2 className="text-5xl font-semibold mt-4">
                ₹61K
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-orange-500" />
            </div>

          </div>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-3 gap-6 mt-8">

        {/* SALES */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold">
              Sales Overview
            </h2>

            <p className="text-gray-500 mt-1">
              Monthly sales performance
            </p>
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

        {/* AI CARD */}
        <div className="bg-black text-white rounded-3xl p-8 flex flex-col justify-between shadow-sm">

          <div>

            <span className="text-orange-400 text-sm">
              AI Insight
            </span>

            <h2 className="text-3xl font-semibold mt-5 leading-snug">
              Snack category demand expected to increase this weekend.
            </h2>

            <p className="text-gray-400 mt-5 leading-relaxed">
              KiranaIQ predicts a 22% spike in snack sales based on
              historical weekend demand patterns.
            </p>

          </div>

          <button className="mt-8 bg-white text-black rounded-2xl py-4 hover:bg-gray-100 transition font-medium">
            View Details
          </button>

        </div>

      </div>

      {/* DEMAND CHART */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 mt-8 shadow-sm">

        <div className="mb-8">
          <h2 className="text-2xl font-semibold">
            Weekly Demand Forecast
          </h2>

          <p className="text-gray-500 mt-1">
            AI-powered demand trend analysis
          </p>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={demandData}>

              <defs>
                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
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

    </RetailerLayout>
  );
}

export default Analytics;