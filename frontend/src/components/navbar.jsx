import React, { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  Boxes,
  Brain,
  BarChart3,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "@clerk/react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex items-center justify-between px-10 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-10">

          {/* LOGO */}
          <Link to="/" className="font-semibold text-xl">
            <span className="text-orange-500">Kirana</span>
            <span className="text-orange-300 ml-1">IQ</span>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">

            {/* PRODUCTS DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >

              <button className="flex items-center gap-1 hover:text-black transition">
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* MEGA MENU */}
              <div
                className={`absolute top-12 left-0 w-[720px] bg-white/95 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl transition-all duration-300 overflow-hidden ${
                  open
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-3"
                }`}
              >

                <div className="grid grid-cols-3">

                  {/* LEFT SIDE */}
                  <div className="col-span-2 p-8 border-r border-gray-100">

                    <h2 className="text-2xl font-semibold mb-2">
                      Inventory Intelligence Platform
                    </h2>

                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                      AI-powered retail tools built to simplify inventory
                      management, automate smarter restocking, and help
                      retailers make better decisions faster.
                    </p>

                    <div className="grid grid-cols-1 gap-4">

                      {/* FEATURE 1 */}
                      <Link
                        to="/features"
                        className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                          <Boxes className="w-5 h-5 text-orange-500" />
                        </div>

                        <div>
                          <h3 className="font-medium text-black">
                            Availability Tracking
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Real-time visibility into stock levels and supplier
                            inventory updates.
                          </p>
                        </div>
                      </Link>

                      {/* FEATURE 2 */}
                      <Link
                        to="/features"
                        className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                          <Brain className="w-5 h-5 text-orange-500" />
                        </div>

                        <div>
                          <h3 className="font-medium text-black">
                            Smart Alternatives
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            AI-generated product replacements when items go out
                            of stock.
                          </p>
                        </div>
                      </Link>

                      {/* FEATURE 3 */}
                      <Link
                        to="/features"
                        className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-orange-500" />
                        </div>

                        <div>
                          <h3 className="font-medium text-black">
                            AI Predictions
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Predict demand trends and optimize restocking before
                            shortages happen.
                          </p>
                        </div>
                      </Link>

                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="p-8 bg-gray-50">

                    <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-6">
                      What's New
                    </p>

                    <div className="space-y-6">

                      <div>
                        <h3 className="font-medium text-black">
                          AI Demand Forecasting
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                          Predict customer buying patterns using real-time AI
                          analytics.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium text-black">
                          Multi-store Sync
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                          Manage inventory seamlessly across all store branches.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium text-black">
                          Supplier Integrations
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                          Connect suppliers directly into KiranaIQ workflows.
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* OTHER LINKS */}
            <Link
              to="/how-it-works"
              className="hover:text-black transition"
            >
              How it Works
            </Link>

            <Link
              to="/pricing"
              className="hover:text-black transition"
            >
              Pricing
            </Link>

          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <button className="text-gray-600 hover:text-black transition">
            <Bell className="w-5 h-5" />
          </button>

          {!isSignedIn ? (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-black transition"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="bg-orange-500 text-white px-5 py-2 rounded-xl text-sm hover:bg-orange-600 transition-all duration-300 shadow-sm"
              >
                Sign up
              </Link>
            </>
          ) : (
            <Link
              to="/retailer/dashboard"
              className="bg-orange-500 text-white px-5 py-2 rounded-xl text-sm hover:bg-orange-600 transition-all duration-300 shadow-sm font-medium"
            >
              Dashboard
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;