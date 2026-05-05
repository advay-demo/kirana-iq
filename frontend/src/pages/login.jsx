import React, { useState } from "react";
import AuthNavbar from "../components/AuthNavbar";
import AuthFooter from "../components/AuthFooter";
import customer from "../assets/images/customer.jpg";
import retailer from "../assets/images/retailer.jpg";

function Login() {
  const [role, setRole] = useState("customer");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <AuthNavbar />

      <div className="flex flex-1 flex-col items-center justify-center px-6">

        {/* TOGGLE */}
        <div className="mb-8 w-full max-w-md">
          <div className="relative flex bg-gray-200 rounded-full p-1 shadow-inner">

            {/* Sliding pill */}
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                role === "customer" ? "left-1" : "left-[50%]"
              }`}
            />

            <button
              onClick={() => setRole("customer")}
              className={`relative z-10 flex-1 py-2 text-sm font-medium ${
                role === "customer" ? "text-black" : "text-gray-500"
              }`}
            >
              Customer
            </button>

            <button
              onClick={() => setRole("retailer")}
              className={`relative z-10 flex-1 py-2 text-sm font-medium ${
                role === "retailer" ? "text-black" : "text-gray-500"
              }`}
            >
              Retailer
            </button>

          </div>
        </div>

        {/* SLIDING CARD */}
        <div className="w-full max-w-4xl h-[420px] overflow-hidden rounded-2xl border border-gray-200 shadow-md">

          <div
            className={`flex w-[200%] h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              role === "customer"
                ? "translate-x-0"
                : "-translate-x-1/2"
            }`}
          >

            {/* 🔥 CUSTOMER PANEL */}
            <div
              className="w-1/2 h-full bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${customer})` }}
            >
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 w-full max-w-md text-white text-center px-6">
                <h2 className="text-2xl font-bold mb-6">
                  Customer Login
                </h2>

                <form className="flex flex-col gap-4">

                  <input
                    placeholder="Email"
                    className="bg-white/90 text-black rounded-lg px-4 py-3"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-white/90 text-black rounded-lg px-4 py-3"
                  />

                  {/* Forgot */}
                  <div className="flex justify-end">
                    <a className="text-sm text-white/80 hover:text-white">
                      Forgot password?
                    </a>
                  </div>

                  <button className="bg-orange-500 py-3 rounded-lg font-medium">
                    Log in as customer
                  </button>

                </form>
              </div>
            </div>

            {/* 🔥 RETAILER PANEL */}
            <div
              className="w-1/2 h-full bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${retailer})` }}
            >
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 w-full max-w-md text-white text-center px-6">
                <h2 className="text-2xl font-bold mb-6">
                  Retailer Login
                </h2>

                <form className="flex flex-col gap-4">

                  <input
                    placeholder="Email"
                    className="bg-white/90 text-black rounded-lg px-4 py-3"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-white/90 text-black rounded-lg px-4 py-3"
                  />

                  <div className="flex justify-end">
                    <a className="text-sm text-white/80 hover:text-white">
                      Forgot password?
                    </a>
                  </div>

                  <button className="bg-orange-500 py-3 rounded-lg font-medium">
                    Log in as retailer
                  </button>

                </form>
              </div>
            </div>

          </div>
        </div>

        {/* SIGNUP LINK */}
        <div className="w-full max-w-4xl mt-4 flex justify-end">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="text-orange-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>

      </div>

      <AuthFooter />

    </div>
  );
}

export default Login;