import React from "react";
import {
  AlertTriangle,
  Brain,
  TrendingUp,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import RetailerLayout from "../../layouts/RetailerLayout";

const notifications = [
  {
    type: "critical",
    title: "Tata Salt stock running critically low",
    description:
      "Current stock has dropped below the recommended safety threshold. Immediate restocking is suggested.",
    time: "2 mins ago",
    icon: AlertTriangle,
  },
  {
    type: "ai",
    title: "AI predicts increased snack demand this weekend",
    description:
      "Based on recent sales behavior and seasonal patterns, snack demand may rise by approximately 22%.",
    time: "12 mins ago",
    icon: Brain,
  },
  {
    type: "trend",
    title: "Milk category sales increased this week",
    description:
      "Dairy product sales have shown consistent upward growth compared to the previous week.",
    time: "1 hour ago",
    icon: TrendingUp,
  },
  {
    type: "system",
    title: "Inventory synchronization completed",
    description:
      "Supplier product data was successfully refreshed and synced across all tracked items.",
    time: "3 hours ago",
    icon: CheckCircle2,
  },
  {
    type: "system",
    title: "Daily AI forecast generated",
    description:
      "Your daily demand forecast report is now available for review in analytics.",
    time: "6 hours ago",
    icon: Clock3,
  },
];

function Notifications() {
  return (
    <RetailerLayout>

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Notifications
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Stay updated with alerts, inventory changes, and AI recommendations.
          </p>
        </div>

        <button className="bg-white border border-gray-200 px-6 py-4 rounded-2xl hover:bg-gray-50 transition shadow-sm">
          Mark all as read
        </button>

      </div>

      {/* FEED */}
      <div className="mt-10 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">
            Recent Activity
          </h2>

          <span className="text-sm text-gray-400">
            5 unread notifications
          </span>
        </div>

        <div className="space-y-5">

          {notifications.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-start justify-between border border-gray-100 rounded-3xl p-6 hover:border-orange-200 hover:-translate-y-1 transition-all duration-300"
              >

                <div className="flex gap-5">

                  {/* ICON */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      item.type === "critical"
                        ? "bg-red-100"
                        : item.type === "ai"
                        ? "bg-orange-100"
                        : item.type === "trend"
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        item.type === "critical"
                          ? "text-red-500"
                          : item.type === "ai"
                          ? "text-orange-500"
                          : item.type === "trend"
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    />
                  </div>

                  {/* TEXT */}
                  <div>
                    <div className="flex items-center gap-3">

                      <h3 className="text-lg font-semibold">
                        {item.title}
                      </h3>

                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>

                    </div>

                    <p className="text-gray-500 mt-3 leading-relaxed max-w-3xl">
                      {item.description}
                    </p>
                  </div>

                </div>

                {/* TIME */}
                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {item.time}
                </span>

              </div>
            );
          })}

        </div>

      </div>

      {/* AI SUMMARY */}
      <div className="mt-8 bg-black text-white rounded-3xl p-10 shadow-sm">

        <span className="text-orange-400 text-sm font-medium">
          Daily AI Summary
        </span>

        <h2 className="text-4xl font-semibold mt-5 leading-tight max-w-4xl">
          Inventory risk detected across 3 categories. Recommended restocking within the next 48 hours.
        </h2>

        <p className="text-gray-400 mt-6 max-w-3xl text-lg leading-relaxed">
          KiranaIQ analyzed sales velocity, historical purchasing patterns,
          supplier availability, and current stock behavior to generate
          today’s predictive insights.
        </p>

      </div>

    </RetailerLayout>
  );
}

export default Notifications;