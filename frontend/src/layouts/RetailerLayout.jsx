import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import HowItWorks from "./pages/HowItWorks";
import Dashboard from "./pages/retailer/Dashboard";
import Inventory from "./pages/retailer/Inventory";
import Analytics from "./pages/retailer/Analytics";
import Notifications from "./pages/retailer/Notifications";
import Settings from "./pages/retailer/Settings";





function App() {
  return (
    <Routes>

      {/* MAIN SITE (with navbar/footer layout) */}
      <Route
        path="/"
        element={
          <MainLayout>
            <div className="pt-20">
              <Home />
            </div>
          </MainLayout>
        }
      />
      <Route path="/features" element={<Features />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/retailer/dashboard" element={<Dashboard />} />
      <Route path="/retailer/inventory" element={<Inventory />} />
      <Route path="/retailer/analytics" element={<Analytics />} />
      <Route path="/retailer/notifications"element={<Notifications />}/>
      <Route path="/retailer/settings" element={<div>Settings Page</div>} />

      

    </Routes>
  );
}

export default App;