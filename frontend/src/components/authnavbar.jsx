import React from "react";

function AuthNavbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white">

      <h1 className="text-orange-500 font-semibold text-lg cursor-pointer">
        Kirana{" "}
        <span className="bg-orange-500 text-white px-2 py-0.5 rounded-md text-xs ml-1">
          IQ
        </span>
      </h1>

      <button className="text-sm text-gray-500 hover:text-black transition">
        Help
      </button>

    </nav>
  );
}

export default AuthNavbar;