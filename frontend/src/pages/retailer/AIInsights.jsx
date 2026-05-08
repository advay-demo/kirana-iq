import React from "react";
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  BarChart3,
  PackageSearch,
  ArrowUpRight,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import RetailerLayout from "../../layouts/RetailerLayout";

const forecastData = [
  { day: "Mon", demand: 42 },
  { day: "Tue", demand: 48 },
  { day: "Wed", demand: 53 },
  { day: "Thu", demand: 61 },
  { day: "Fri", demand: 74 },
  { day: "Sat", demand: 88 },
  { day: "Sun", demand: 95 },
];

const recommendations = [
  {
    title: "Rice demand expected to rise sharply",
    desc:
      "Based on current purchase velocity and seasonal patterns, rice inventory may deplete 28% faster than usual.",
    confidence: "94%",
  },
  {
    title: "Tata Salt likely to stock out in 2 days",
    desc:
      "Demand remains stable while supplier replenishment lag suggests urgent reorder action.",
    confidence: "91%",
  },
  {
    title: "Milk category showing weekend spike",
    desc:
      "Historical sales data indicates dairy purchases increase significantly before weekends.",
    confidence: "89%",
  },
];

const alternatives = [
  {
    unavailable: "Tata Salt",
    options: ["Catch Salt", "Aashirvaad Salt", "Nature Fresh Salt"],
  },
  {
    unavailable: "Parle-G Family Pack",
    options: ["Britannia Marie", "Sunfeast Glucose", "Good Day Value Pack"],
  },
];

function AIInsights() {
  return (
    <RetailerLayout>

      {/* HEADER */}
      <div className="flex items-start justify-between">

        <div>
          <p className="text-orange-500 font-medium tracking-wide uppercase text-sm">
            AI Intelligence Layer
          </p>

          <h1 className="text-5xl font-semibold mt-3 leading-tight">
            Predict smarter. <br />
            Restock before shortages happen.
          </h1>

          <p className="text-gray-500 text-lg mt-5 max-w-3xl leading-relaxed">
            KiranaIQ continuously analyzes inventory movement, supplier behavior,
            purchase velocity, and demand trends to generate predictive retail intelligence.
          </p>
        </div>

        <div className="bg-black text-white rounded-3xl p-6 w-[320px] shadow-sm">
          <div className="flex items-center gap-3 text-orange-400 mb-4">
            <Brain />
            <span>AI Confidence Engine</span>
          </div>

          <h2 className="text-4xl font-semibold">
            92%
          </h2>

          <p className="text-gray-400 mt-3">
            Average recommendation confidence across all predictions.
          </p>
        </div>

      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <p className="text-gray-500">Predicted Shortages</p>

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-5xl font-semibold">8</h2>

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <p className="text-gray-500">Demand Spikes</p>

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-5xl font-semibold">5</h2>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <TrendingUp className="text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <p className="text-gray-500">Alternatives Found</p>

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-5xl font-semibold">16</h2>

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <Sparkles className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">
          <p className="text-gray-500">Forecast Models</p>

          <div className="flex items-center justify-between mt-5">
            <h2 className="text-5xl font-semibold">12</h2>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <BarChart3 className="text-blue-500" />
            </div>
          </div>
        </div>

      </div>

      {/* CHART + EXPLAINABILITY */}
      <div className="grid grid-cols-3 gap-6 mt-10">

        {/* FORECAST */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

          <div>
            <h2 className="text-2xl font-semibold">
              Weekly Demand Forecast
            </h2>

            <p className="text-gray-500 mt-2">
              AI-generated demand projection based on historical purchasing trends.
            </p>
          </div>

          <div className="h-[340px] mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="#f97316"
                  fill="#fed7aa"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* WHY PANEL */}
        <div className="bg-black text-white rounded-3xl p-8 shadow-sm">

          <div className="flex items-center gap-3 text-orange-400">
            <Brain />
            <span>Why AI recommended this</span>
          </div>

          <h2 className="text-3xl font-semibold mt-8 leading-tight">
            Recommendation explainability layer
          </h2>

          <div className="mt-8 space-y-5 text-gray-300 leading-relaxed">
            <p>• 6 weeks purchase history analyzed</p>
            <p>• supplier lead times factored in</p>
            <p>• weekend demand multiplier detected</p>
            <p>• current depletion rate exceeds baseline</p>
          </div>

        </div>

      </div>

      {/* RECOMMENDATIONS */}
      <div className="mt-10 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

        <h2 className="text-2xl font-semibold">
          AI Recommendations Feed
        </h2>

        <div className="space-y-5 mt-8">

          {recommendations.map((item, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-3xl p-6 hover:border-orange-200 transition"
            >
              <div className="flex justify-between items-start">

                <div>
                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-3 max-w-4xl leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full font-medium">
                  {item.confidence}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>

      {/* ALTERNATIVES */}
      {/* SUPPLIER RECOMMENDATIONS */}
<div className="mt-10 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

  <div className="flex items-center gap-3 mb-8">
    <PackageSearch className="text-orange-500" />
    <h2 className="text-2xl font-semibold">
      Supplier Restock Recommendations
    </h2>
  </div>

  <p className="text-gray-500 mb-8 max-w-3xl leading-relaxed">
    KiranaIQ evaluates supplier pricing, stock availability, delivery speed,
    and historical reliability to recommend the most efficient restocking options.
  </p>

  <div className="grid grid-cols-2 gap-6">

    {/* CARD 1 */}
    <div className="border border-gray-100 rounded-3xl p-6 hover:border-orange-200 transition">

      <p className="text-gray-400 text-sm uppercase tracking-wide">
        Product requiring action
      </p>

      <h3 className="text-3xl font-semibold mt-2">
        Tata Salt
      </h3>

      <div className="mt-6 space-y-4">

        <div className="bg-gray-50 rounded-2xl p-5 flex justify-between items-center">
          <div>
            <h4 className="font-medium">Metro Wholesale</h4>
            <p className="text-sm text-gray-500 mt-1">
              ₹31/unit • delivery in 1 day
            </p>
          </div>

          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
            Available
          </span>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 flex justify-between items-center">
          <div>
            <h4 className="font-medium">FreshMart Supply</h4>
            <p className="text-sm text-gray-500 mt-1">
              ₹32/unit • delivery in 2 days
            </p>
          </div>

          <span className="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm">
            Limited
          </span>
        </div>

      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          AI confidence score
        </span>

        <span className="text-orange-500 font-semibold">
          94%
        </span>
      </div>

    </div>

    {/* CARD 2 */}
    <div className="border border-gray-100 rounded-3xl p-6 hover:border-orange-200 transition">

      <p className="text-gray-400 text-sm uppercase tracking-wide">
        Product requiring action
      </p>

      <h3 className="text-3xl font-semibold mt-2">
        Parle-G Family Pack
      </h3>

      <div className="mt-6 space-y-4">

        <div className="bg-gray-50 rounded-2xl p-5 flex justify-between items-center">
          <div>
            <h4 className="font-medium">QuickRetail Distributors</h4>
            <p className="text-sm text-gray-500 mt-1">
              ₹8.5/unit • same day delivery
            </p>
          </div>

          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
            Available
          </span>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 flex justify-between items-center">
          <div>
            <h4 className="font-medium">BulkKart Supply</h4>
            <p className="text-sm text-gray-500 mt-1">
              ₹8/unit • delivery in 2 days
            </p>
          </div>

          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
            Reliable
          </span>
        </div>

      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          AI confidence score
        </span>

        <span className="text-orange-500 font-semibold">
          91%
        </span>
      </div>

    </div>

  </div>

</div>

    </RetailerLayout>
  );
}

export default AIInsights;