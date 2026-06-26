import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Bell,
  Settings,
  Brain,
  ShoppingCart,
  Truck,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNotifications } from "../services/auth";
import { useDarkMode } from "../context/useDarkMode";
import { useAuth } from "@clerk/react";

function RetailerLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { dark } = useDarkMode();
  const { signOut } = useAuth();
  const [notificationCount, setNotificationCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "Retailer";

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    await signOut();
    navigate("/login");
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    fetchNotificationCount();
    const interval = setInterval(fetchNotificationCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotificationCount = async () => {
    try {
      const data = await getNotifications();
      setNotificationCount(data.length);
    } catch (error) {
      console.error(error);
    }
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
      count: notificationCount,
    },
    {
      name: "Orders",
      path: "/retailer/orders",
      icon: ShoppingCart,
    },
    {
      name: "Distributors",
      path: "/retailer/distributors",
      icon: Truck,
    },
    {
      name: "Settings",
      path: "/retailer/settings",
      icon: Settings,
    },
  ];

  /* Shared sidebar content used in both mobile & desktop */
  const sidebarContent = (
    <>
      <div>
        {/* LOGO */}
        <Link to="/" className="font-semibold text-2xl mb-12 block">
          <span className="text-orange-500">Kirana</span>
          <span className="text-orange-300 ml-1">IQ</span>
        </Link>

        {/* NAV */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  active
                    ? "bg-orange-50 dark:bg-orange-900/30 text-orange-500 font-medium"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
                {item.count > 0 && (
                  <span className="ml-auto bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full min-w-[22px] text-center">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* USER */}
      <div className="border border-gray-200 dark:border-gray-600 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-orange-500 font-semibold">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-medium dark:text-white">{userName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
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
    </>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900 flex">

      {/* MOBILE HAMBURGER BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 px-6 py-8 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {sidebarContent}
      </aside>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 px-6 py-8 flex-col justify-between">
        {sidebarContent}
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 pt-16 lg:pt-8 dark:bg-gray-900">
        {children}
      </main>

    </div>
  );
}

export default RetailerLayout;