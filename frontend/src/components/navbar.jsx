import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">

        {/* LEFT — LOGO */}
        <Link to="/" className="font-semibold text-lg">
          <span className="text-orange-500">Kirana</span>
          <span className="text-orange-300 ml-1">IQ</span>
        </Link>

        {/* CENTER — NAV LINKS */}
        <div className="flex gap-8 text-sm text-gray-600 ml-12">

          <Link to="/features" className="hover:text-black transition">
            Features
          </Link>

          <Link to="/how-it-works" className="hover:text-black transition">
            How it Works
          </Link>

          <Link to="/pricing" className="hover:text-black transition">
            Pricing
          </Link>

        </div>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-4">

          <button className="text-gray-600 hover:text-black transition">
            <Bell className="w-5 h-5" />
          </button>

          <Link to="/login" className="text-sm text-gray-600 hover:text-black">
            Log in
          </Link>

          <Link
            to="/signup"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600"
          >
            Sign up
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;