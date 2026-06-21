import { SignUp } from "@clerk/react";
import MainLayout from "../layouts/MainLayout";

export default function Signup() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 pt-20">
        <SignUp routing="path" path="/signup" signInUrl="/login" forceRedirectUrl="/retailer/onboarding" />
      </div>
    </MainLayout>
  );
}