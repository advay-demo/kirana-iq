import { SignIn } from "@clerk/react";
import MainLayout from "../layouts/MainLayout";

export default function Login() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 pt-20">
        <SignIn routing="path" path="/login" signUpUrl="/signup" forceRedirectUrl="/retailer/dashboard" />
      </div>
    </MainLayout>
  );
}