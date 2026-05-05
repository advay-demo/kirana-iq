import React from "react";

function AuthFooter() {
  return (
    <footer className="w-full border-t border-gray-200 py-4 mt-auto">
      <div className="flex justify-center items-center text-sm text-gray-500 gap-4">
        <span>© 2026 KiranaIQ</span>
        <a href="#" className="hover:text-black transition">Legal</a>
        <a href="#" className="hover:text-black transition">Privacy</a>
      </div>
    </footer>
  );
}

export default AuthFooter;