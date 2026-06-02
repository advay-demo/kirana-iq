import React, { useState } from "react";
import { Store, User, Shield, Brain } from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import { useDarkMode } from "../../context/useDarkMode";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { dark, toggle } = useDarkMode();
  const navigate = useNavigate();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <RetailerLayout>

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in">
          ✓ {toast}
        </div>
      )}

      <div>
        <h1 className="text-4xl font-semibold tracking-tight dark:text-white">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
          Manage your store preferences and account settings.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10">

        {/* Store Info */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Store className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold dark:text-white">Store Information</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Update your business details</p>
            </div>
          </div>
          <div className="space-y-4">
            <input
              defaultValue={localStorage.getItem("userName") || "My Store"}
              className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl px-5 py-4 outline-none focus:border-orange-400 transition"
              placeholder="Store name"
            />
            <input
              defaultValue=""
              className="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl px-5 py-4 outline-none focus:border-orange-400 transition"
              placeholder="Contact email"
            />
            <button
              onClick={() => showToast("Store info saved!")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-2xl transition font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Account Preferences */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <User className="w-6 h-6 text-orange-500" />
            </div>
            <h2 className="text-2xl font-semibold dark:text-white">Account Preferences</h2>
          </div>

          <div className="space-y-6">

            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium dark:text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Get alerts for low stock</p>
              </div>
              <button
                onClick={() => setEmailNotifs((p) => !p)}
                className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-300 ${
                  emailNotifs ? "bg-orange-500" : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                    emailNotifs ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-400">Switch to dark theme</p>
              </div>
              <button
                onClick={toggle}
                className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-300 ${
                  dark ? "bg-orange-500" : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                    dark ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="text-orange-500" />
            <h2 className="text-2xl font-semibold dark:text-white">Security</h2>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => navigate("/forgot-password")}
              className="w-full border border-gray-200 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl py-4 transition font-medium"
            >
              Change Password
            </button>
            <button
              onClick={() => showToast("2FA coming soon!")}
              className="w-full border border-gray-200 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl py-4 transition font-medium"
            >
              Enable 2FA
            </button>
          </div>
        </div>

        {/* AI Config */}
        <div className="bg-black rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <Brain className="text-orange-400" />
            <h2 className="text-2xl font-semibold text-white">AI Configuration</h2>
          </div>
          <p className="text-gray-400 text-sm mb-4">Prediction sensitivity</p>
          <input type="range" className="w-full accent-orange-500" />
          <p className="text-gray-400 text-sm mt-6 mb-2">Forecast window</p>
          <select className="w-full mt-1 bg-white/10 text-white rounded-2xl px-5 py-4 outline-none">
            <option>7 Days</option>
            <option>14 Days</option>
            <option>30 Days</option>
          </select>
        </div>

      </div>

    </RetailerLayout>
  );
}

export default Settings;