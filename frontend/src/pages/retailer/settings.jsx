import React from "react";
import {
  Store,
  User,
  Shield,
  Brain,
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";

function Settings() {
  return (
    <RetailerLayout>

      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Settings
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Manage your store preferences and account settings.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10">

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Store className="w-6 h-6 text-orange-500" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">
                Store Information
              </h2>

              <p className="text-gray-500 mt-1">
                Update your business details
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <input
              defaultValue="Advay Retail"
              className="w-full border border-gray-200 rounded-2xl px-5 py-4"
            />

            <input
              defaultValue="advay@gmail.com"
              className="w-full border border-gray-200 rounded-2xl px-5 py-4"
            />

            <button className="bg-orange-500 text-white px-6 py-4 rounded-2xl">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <User className="w-6 h-6 text-orange-500" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">
                Account Preferences
              </h2>
            </div>
          </div>

          <div className="space-y-8">

            <div className="flex justify-between">
              <span>Email Notifications</span>

              <button className="w-14 h-8 bg-orange-500 rounded-full flex items-center px-1">
                <div className="w-6 h-6 bg-white rounded-full ml-auto"></div>
              </button>
            </div>

            <div className="flex justify-between">
              <span>Dark Mode</span>

              <button className="w-14 h-8 bg-gray-200 rounded-full flex items-center px-1">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </button>
            </div>

          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="text-orange-500" />
            <h2 className="text-2xl font-semibold">
              Security
            </h2>
          </div>

          <div className="space-y-4">
            <button className="w-full border rounded-2xl py-4">
              Change Password
            </button>

            <button className="w-full border rounded-2xl py-4">
              Enable 2FA
            </button>
          </div>
        </div>

        <div className="bg-black text-white rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <Brain className="text-orange-400" />

            <h2 className="text-2xl font-semibold">
              AI Configuration
            </h2>
          </div>

          <input
            type="range"
            className="w-full accent-orange-500"
          />

          <select className="w-full mt-6 bg-white/10 rounded-2xl px-5 py-4">
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