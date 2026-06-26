import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { fetchUserProfile } from "../services/auth";
import { Loader2 } from "lucide-react";

function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchUserProfile()
        .then(data => {
          setProfile(data);
          setLoadingProfile(false);
        })
        .catch(err => {
          console.error("Failed to fetch user profile", err);
          setLoadingProfile(false);
        });
    } else if (isLoaded && !isSignedIn) {
      setLoadingProfile(false);
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  const role = profile?.user?.role;
  const hasOnboarded = profile?.user?.has_onboarded;

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