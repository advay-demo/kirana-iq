import React from "react";
import { Link } from "react-router-dom";

function AuthNavbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">

      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LEFT — LOGO */}
        <Link to="/" className="text-orange-500 font-semibold text-lg">
          Kirana{" "}
          <span className="bg-orange-500 text-white px-2 py-0.5 rounded-md text-xs ml-1">
            IQ
          </span>
        </Link>

        {/* CENTER — LINKS */}
        <div className="flex gap-8 text-sm text-gray-600">
          <Link to="/" className="hover:text-black transition">
            Home
          </Link>
          <Link to="/pricing" className="hover:text-black transition">
            Pricing
          </Link>
        </div>

        {/* RIGHT — HELP */}
        <button className="text-sm text-gray-600 hover:text-black transition">
          Help
        </button>

      </div>

    </nav>
  );
}

export default AuthNavbar;