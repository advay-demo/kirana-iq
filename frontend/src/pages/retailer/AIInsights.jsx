import React, { useEffect, useState } from "react";
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import { getAIInsights } from "../../services/auth";

function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const data = await getAIInsights();
      setInsights(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getInsightConfig = (type) => {
    switch (type) {
      case "critical":
        return {
          icon: AlertTriangle,
          bg: "bg-red-50",
          border: "border-red-200",
          iconBg: "bg-red-100",
          iconColor: "text-red-500",
          badge: "bg-red-200 text-red-700",
        };

      case "warning":
        return {
          icon: AlertTriangle,
          bg: "bg-orange-50",
          border: "border-orange-200",
          iconBg: "bg-orange-100",
          iconColor: "text-orange-500",
          badge: "bg-orange-200 text-orange-700",
        };

      case "overstock":
        return {
          icon: TrendingUp,
          bg: "bg-blue-50",
          border: "border-blue-200",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-500",
          badge: "bg-blue-200 text-blue-700",
        };

      default:
        return {
          icon: ShieldCheck,
          bg: "bg-green-50",
          border: "border-green-200",
          iconBg: "bg-green-100",
          iconColor: "text-green-500",
          badge: "bg-green-200 text-green-700",
        };
    }
  };

  if (loading) {
    return (
      <RetailerLayout>
        <div className="text-2xl font-medium">
          Loading AI insights...
        </div>
      </RetailerLayout>
    );
  }

  return (
    <RetailerLayout>
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
            <Brain className="w-7 h-7 text-orange-500" />
          </div>

          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              AI Insights
            </h1>

            <p className="text-gray-500 mt-1 text-lg">
              Smart recommendations powered by your inventory intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="mt-10">
        <div className="bg-black rounded-3xl p-10 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-orange-400" />

            <p className="text-orange-400 uppercase tracking-wide text-sm">
              AI Recommendation Engine
            </p>
          </div>

          <h2 className="text-5xl font-semibold leading-tight max-w-3xl">
            Optimize stock decisions before issues impact your store.
          </h2>

          <p className="text-gray-400 mt-6 text-lg max-w-2xl">
            KiranaIQ analyzes inventory patterns and flags restocking risks,
            inefficiencies, and optimization opportunities.
          </p>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="mt-10 flex flex-col gap-6">
        {insights.map((insight, index) => {
          const config = getInsightConfig(insight.type);
          const Icon = config.icon;

          return (
            <div
              key={index}
              className={`${config.bg} ${config.border} border rounded-3xl p-7 shadow-sm flex items-start gap-5`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${config.iconBg}`}
              >
                <Icon
                  className={`w-8 h-8 ${config.iconColor}`}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 flex-wrap">
                  <h3 className="text-2xl font-semibold">
                    {insight.title}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${config.badge}`}
                  >
                    {insight.type}
                  </span>
                </div>

                <p className="text-gray-600 mt-3 text-lg leading-relaxed">
                  {insight.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </RetailerLayout>
  );
}

export default AIInsights;