import React from "react";

function AuthFooter() {
  return (
    <footer className="w-full border-t border-gray-200">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center md:justify-end gap-6 text-sm text-gray-500">

        <span>© 2026 KiranaIQ</span>
        <a href="#" className="hover:text-black transition">Legal</a>
        <a href="#" className="hover:text-black transition">Privacy</a>

      </div>

    </footer>
  );
}

export default AuthFooter;