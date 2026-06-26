import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import MainLayout from "../layouts/MainLayout";

function NotFound() {
  return (
    <MainLayout>
      <div className="pt-20 min-h-[80vh] flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-orange-200">
          <AlertTriangle className="w-12 h-12 text-orange-500" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Page Not Found</h2>
        
        <p className="text-gray-500 text-center max-w-md mb-10 text-lg">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <Link 
          to="/" 
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl transition font-semibold shadow-lg shadow-orange-500/30"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </MainLayout>
  );
}

export default NotFound;
