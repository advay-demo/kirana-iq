import { SignUp } from "@clerk/react";
import MainLayout from "../layouts/MainLayout";
import { CheckCircle } from "lucide-react";

export default function Signup() {
  return (
    <MainLayout>
      <div className="flex min-h-screen pt-20">
        
        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col justify-center w-1/2 bg-orange-50 p-16 xl:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10 max-w-lg">
            <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Manage your Kirana store with <span className="text-orange-500">AI Intelligence</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-10">
              Join thousands of retailers optimizing their inventory, predicting demand, and reducing stockouts effortlessly.
            </p>

            <div className="space-y-6">
              {[
                "Real-time availability tracking",
                "AI-driven restock predictions",
                "Smart product alternatives",
                "Seamless supplier integration"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="bg-orange-100 p-1 rounded-full">
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
          <SignUp routing="path" path="/signup" signInUrl="/login" forceRedirectUrl="/retailer/onboarding" />
        </div>

      </div>
    </MainLayout>
  );
}