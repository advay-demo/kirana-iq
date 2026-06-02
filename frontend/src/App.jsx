import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import HowItWorks from "./pages/HowItWorks";
import Dashboard from "./pages/retailer/Dashboard";
import Inventory from "./pages/retailer/Inventory";
import Analytics from "./pages/retailer/Analytics";
import Notifications from "./pages/retailer/Notifications";
import Settings from "./pages/retailer/Settings";
import ProductDetails from "./pages/retailer/ProductDetails";
import AIInsights from "./pages/retailer/AIInsights";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/retailer/Orders";
import ProductSearchResults from "./pages/ProductSearchResults";
import Onboarding from "./pages/retailer/Onboarding";






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
      <Route path="/signup" element={<Navigate to="/login?tab=signup" replace />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/retailer/onboarding" element={<ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>} />
      <Route path="/retailer/dashboard" element={<ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>} />
      <Route path="/retailer/inventory" element={<ProtectedRoute>
        <Inventory />
      </ProtectedRoute>} />
      <Route path="/retailer/analytics" element={<ProtectedRoute>
        <Analytics />
      </ProtectedRoute>} />
      <Route path="/retailer/notifications"element={<ProtectedRoute>
        <Notifications />
      </ProtectedRoute>} />
      <Route path="/retailer/settings" element={<ProtectedRoute>
        <Settings />
      </ProtectedRoute>} />
      <Route path="/retailer/products/:id" element={<ProtectedRoute>
        <ProductDetails />
      </ProtectedRoute>} />
      <Route path="/retailer/ai-insights" element={<ProtectedRoute>
        <AIInsights />
      </ProtectedRoute>} />
      <Route path="/retailer/orders" element={ <ProtectedRoute> 
        <Orders />
    </ProtectedRoute> }/> 
    <Route
  path="/products/search"
  element={<ProductSearchResults />}
/>
      
    </Routes>
    
  );
}

export default App;