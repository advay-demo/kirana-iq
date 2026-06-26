import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NotFound from "./pages/NotFound";

import Features from "./pages/features";
import Pricing from "./pages/pricing";
import HowItWorks from "./pages/howitworks";
import Dashboard from "./pages/retailer/dashboard";
import Inventory from "./pages/retailer/inventory";
import Analytics from "./pages/retailer/analytics";
import Notifications from "./pages/retailer/notifications";
import Settings from "./pages/retailer/settings";
import ProductDetails from "./pages/retailer/ProductDetails";
import AIInsights from "./pages/retailer/AIInsights";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/retailer/orders";
import ProductSearchResults from "./pages/ProductSearchResults";
import Onboarding from "./pages/retailer/Onboarding";
import Distributors from "./pages/retailer/Distributors";

function App() {
  return (
    <Routes>
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
      
      {/* Clerk Auth Routes */}
      <Route path="/login/*" element={<Login />} />
      <Route path="/signup/*" element={<Signup />} />

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
      <Route path="/retailer/distributors" element={ <ProtectedRoute> 
        <Distributors />
    </ProtectedRoute> }/> 
    <Route
  path="/products/search"
  element={<ProductSearchResults />}
/>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    
  );
}

export default App;