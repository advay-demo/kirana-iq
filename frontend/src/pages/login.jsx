import React from "react";
import AuthNavbar from "../components/AuthNavbar";
import AuthFooter from "../components/AuthFooter";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <AuthNavbar />

      {/* CENTER CONTENT */}
      <div className="flex flex-1 items-center justify-center px-4">

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">

          <h2 className="text-2xl font-semibold text-center">
            Welcome back
          </h2>

          <p className="text-sm text-gray-500 text-center mt-2">
            Log in to your KiranaIQ account
          </p>

          <form className="mt-6 flex flex-col gap-4">

            <input
              type="email"
              placeholder="Email"
              className="border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
            />

            <button className="bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition">
              Log in
            </button>

          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-orange-500 hover:underline">
            Sign up
            </Link>
          </p>

        </div>

      </div>

      <AuthFooter />

    </div>
  );
}

export default Login;