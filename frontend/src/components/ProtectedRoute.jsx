import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  const hasOnboarded = localStorage.getItem("hasOnboarded") === "true";
  const role = localStorage.getItem("userRole");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If retailer and not onboarded, force to onboarding page (unless they are already there)
  if (role === "retailer" && !hasOnboarded && location.pathname !== "/retailer/onboarding") {
    return <Navigate to="/retailer/onboarding" replace />;
  }

  // If retailer and onboarded, prevent accessing onboarding again
  if (role === "retailer" && hasOnboarded && location.pathname === "/retailer/onboarding") {
    return <Navigate to="/retailer/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;