import React from "react";

import {
  LayoutDashboard,
  Package,
  BarChart3,
  Bell,
  Settings,
  Brain,
  ShoppingCart,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function RetailerLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/retailer/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Inventory",
      path: "/retailer/inventory",
      icon: Package,
    },

    {
      name: "Analytics",
      path: "/retailer/analytics",
      icon: BarChart3,
    },
    
    {
      name: "AI Insights",
      path: "/retailer/ai-insights",
      icon: Brain,
    },

    {
      name: "Notifications",
      path: "/retailer/notifications",
      icon: Bell,
      count: 3,
    },

    {
      name: "Settings",
      path: "/retailer/settings",
      icon: Settings,
    },
    {
      name: "Orders",
      path: "/retailer/orders",
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-200 px-6 py-8 flex flex-col justify-between">

        <div>

          {/* LOGO */}
          <Link
            to="/"
            className="font-semibold text-2xl mb-12 block"
          >
            <span className="text-orange-500">
              Kirana
            </span>

            <span className="text-orange-300 ml-1">
              IQ
            </span>
          </Link>

          {/* NAV */}
          <nav className="space-y-2">

            {navItems.map((item) => {
              const Icon = item.icon;

              const active =
                location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`w-full px-4 py-3 rounded-xl transition ${
                    active
                      ? "bg-orange-50 text-orange-500 font-medium"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon className="w-5 h-5" />

                    <span>{item.name}</span>

                    {item.count > 0 && (
                      <span className="ml-auto bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full min-w-[22px] text-center">
                        {item.count}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}

          </nav>

        </div>

        {/* USER */}
        <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-semibold">
            A
          </div>

          <div>
            <h3 className="font-medium">
              Advay
            </h3>

            <p className="text-sm text-gray-500">
              Retailer Account
            </p>

            <button
              onClick={handleLogout}
              className="text-xs text-red-500 hover:text-red-600 mt-1"
            >
              Logout
            </button>
          </div>

        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}

export default RetailerLayout;