import React, { useEffect, useState } from "react";
import {
  Bell,
  AlertTriangle,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import { getNotifications } from "../../services/auth";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
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
          Loading notifications...
        </div>
      </RetailerLayout>
    );
  }

  return (
    <RetailerLayout>
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Notifications
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Inventory alerts and store activity updates.
        </p>
      </div>

      {/* EMPTY STATE */}
      {notifications.length === 0 ? (
        <div className="mt-12 bg-white border border-gray-200 rounded-3xl p-16 shadow-sm text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-green-100 flex items-center justify-center">
            <PackageCheck className="w-10 h-10 text-green-500" />
          </div>

          <h2 className="text-3xl font-semibold mt-8">
            All caught up! 🎉
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            No pending orders or low-stock alerts right now.
          </p>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-5">
          {notifications.map((notification, index) => {
            const isCritical = notification.type === "critical";
            const isOrder = notification.type === "order";
            const isLow = notification.type === "low";

            // Determine styling based on type
            let containerStyle = "";
            let iconBgStyle = "";
            let iconTextStyle = "";
            let badgeStyle = "";
            let title = "";
            let IconComponent = AlertTriangle;

            if (isOrder) {
              containerStyle = "bg-purple-50 border-purple-200";
              iconBgStyle = "bg-purple-100";
              iconTextStyle = "text-purple-600";
              badgeStyle = "bg-purple-200 text-purple-800";
              title = "Incoming Order";
              IconComponent = ShoppingBag;
            } else if (isCritical) {
              containerStyle = "bg-red-50 border-red-200";
              iconBgStyle = "bg-red-100";
              iconTextStyle = "text-red-500";
              badgeStyle = "bg-red-200 text-red-700";
              title = "Critical Alert";
              IconComponent = AlertTriangle;
            } else {
              containerStyle = "bg-orange-50 border-orange-200";
              iconBgStyle = "bg-orange-100";
              iconTextStyle = "text-orange-500";
              badgeStyle = "bg-orange-200 text-orange-700";
              title = "Low Stock Alert";
              IconComponent = AlertTriangle;
            }

            return (
              <div
                key={index}
                className={`rounded-3xl p-6 border shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1 ${containerStyle}`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${iconBgStyle}`}
                >
                  <IconComponent className={`w-8 h-8 ${iconTextStyle}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">
                      {title}
                    </h3>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-bold ${badgeStyle}`}
                    >
                      {isOrder ? "NEW" : notification.type.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-2 text-lg">
                    {notification.message}
                  </p>
                </div>

                <Bell className="w-6 h-6 text-gray-400" />
              </div>
            );
          })}
        </div>
      )}
    </RetailerLayout>
  );
}

export default Notifications;