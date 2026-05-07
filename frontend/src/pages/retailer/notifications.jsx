import React from "react";

import {
  LayoutDashboard,
  Package,
  BarChart3,
  Bell,
  Settings as SettingsIcon,
  Store,
  User,
  Shield,
  Brain,
  Moon,
} from "lucide-react";

import { Link } from "react-router-dom";

function Settings() {
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition"
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </Link>

            <Link
              to="/retailer/notifications"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-600 transition"
            >
              <Bell className="w-5 h-5" />
              Notifications
            </Link>

            <Link
              to="/retailer/settings"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50 text-orange-500 font-medium"
            >
              <SettingsIcon className="w-5 h-5" />
              Settings
            </Link>

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
        <div>
          <h1 className="text-3xl font-semibold">
            Settings
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your store preferences and account settings.
          </p>
        </div>

        {/* SETTINGS GRID */}
        <div className="grid grid-cols-2 gap-6 mt-10">

          {/* STORE SETTINGS */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center">
                <Store className="w-5 h-5 text-orange-500" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Store Information
                </h2>

                <p className="text-sm text-gray-500">
                  Update your business details
                </p>
              </div>

            </div>

            <div className="space-y-5">

              <div>
                <label className="text-sm text-gray-500">
                  Store Name
                </label>

                <input
                  type="text"
                  defaultValue="Advay Retail"
                  className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Email Address
                </label>

                <input
                  type="email"
                  defaultValue="advay@gmail.com"
                  className="w-full mt-2 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-orange-400"
                />
              </div>

              <button className="bg-orange-500 text-white px-5 py-3 rounded-2xl hover:bg-orange-600 transition">
                Save Changes
              </button>

            </div>
          </div>

          {/* ACCOUNT */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center">
                <User className="w-5 h-5 text-orange-500" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Account Preferences
                </h2>

                <p className="text-sm text-gray-500">
                  Customize your dashboard experience
                </p>
              </div>

            </div>

            <div className="space-y-5">

              {/* TOGGLE */}
              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-medium">
                    Email Notifications
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Receive alerts via email
                  </p>
                </div>

                <button className="w-12 h-7 bg-orange-500 rounded-full flex items-center px-1">
                  <div className="w-5 h-5 bg-white rounded-full ml-auto"></div>
                </button>

              </div>

              {/* TOGGLE */}
              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-medium">
                    Dark Mode
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Switch dashboard appearance
                  </p>
                </div>

                <button className="w-12 h-7 bg-gray-200 rounded-full flex items-center px-1">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </button>

              </div>

              {/* TOGGLE */}
              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-medium">
                    AI Recommendations
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Enable smart inventory insights
                  </p>
                </div>

                <button className="w-12 h-7 bg-orange-500 rounded-full flex items-center px-1">
                  <div className="w-5 h-5 bg-white rounded-full ml-auto"></div>
                </button>

              </div>

            </div>
          </div>

        </div>

        {/* SECURITY + AI */}
        <div className="grid grid-cols-2 gap-6 mt-6">

          {/* SECURITY */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-500" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Security
                </h2>

                <p className="text-sm text-gray-500">
                  Manage account protection
                </p>
              </div>

            </div>

            <div className="space-y-4">

              <button className="w-full border border-gray-200 rounded-2xl py-3 hover:bg-gray-50 transition">
                Change Password
              </button>

              <button className="w-full border border-gray-200 rounded-2xl py-3 hover:bg-gray-50 transition">
                Enable 2FA
              </button>

            </div>

          </div>

          {/* AI SETTINGS */}
          <div className="bg-black text-white rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-orange-400" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  AI Configuration
                </h2>

                <p className="text-sm text-gray-400">
                  Fine-tune AI prediction behavior
                </p>
              </div>

            </div>

            <div className="space-y-5">

              <div>
                <label className="text-sm text-gray-400">
                  Prediction Sensitivity
                </label>

                <input
                  type="range"
                  className="w-full mt-3 accent-orange-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Forecast Window
                </label>

                <select className="w-full mt-3 bg-white/10 border border-white/10 rounded-2xl px-4 py-3 outline-none">
                  <option>7 Days</option>
                  <option>14 Days</option>
                  <option>30 Days</option>
                </select>
              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Settings;