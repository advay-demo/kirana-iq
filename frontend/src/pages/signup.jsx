import React, { useState } from "react";
import AuthNavbar from "../components/AuthNavbar";
import AuthFooter from "../components/AuthFooter";
import customer from "../assets/images/customer.jpg";
import retailer from "../assets/images/retailer.jpg";
import { Link } from "react-router-dom";

function Signup() {
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
          className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
            role === "customer" ? "left-1" : "left-[50%]"
          }`}
        />

        {/* Buttons */}
        <button
          onClick={() => setRole("customer")}
          className={`relative z-10 flex-1 py-2 text-sm font-medium transition ${
            role === "customer" ? "text-black" : "text-gray-500"
          }`}
        >
          Customer
        </button>

        <button
          onClick={() => setRole("retailer")}
          className={`relative z-10 flex-1 py-2 text-sm font-medium transition ${
            role === "retailer" ? "text-black" : "text-gray-500"
          }`}
        >
          Retailer
        </button>

      </div>
    </div>
        {/* SLIDER CARD */}
        <div className="w-full max-w-4xl h-[440px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white relative">

          <div
            className={`flex w-[200%] h-full transition-transform duration-700 ease-in-out ${
              role === "customer" ? "translate-x-0" : "-translate-x-1/2"
            }`}
          >

            {/* CUSTOMER PANEL */}
            <div
              className="w-1/2 h-full relative flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${customer})` }}
            >
              <div className="absolute inset-0 bg-orange-500/20 backdrop-blur-[2px]" />

              <div className="relative z-10 w-full max-w-md text-white text-center">
                <h2 className="text-2xl font-bold mb-6 drop-shadow-md">
                  Customer Signup
                </h2>

                <form className="flex flex-col gap-4">
                  <input
                    className="bg-white/90 rounded-lg px-4 py-3 outline-none"
                    placeholder="Full Name"
                  />
                  <input
                    className="bg-white/90 rounded-lg px-4 py-3 outline-none"
                    placeholder="Email"
                  />
                  <input
                    className="bg-white/90 rounded-lg px-4 py-3 outline-none"
                    placeholder="Password"
                  />

                  <button className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">
                    Sign up as customer
                  </button>
                </form>
              </div>
            </div>

            {/* RETAILER PANEL */}
            <div
              className="w-1/2 h-full relative flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${retailer})` }}
            >
              <div className="absolute inset-0 bg-black/30" />

              <div className="relative z-10 w-full max-w-md text-white text-center">
                <h2 className="text-2xl font-bold mb-6">
                  Retailer Signup
                </h2>

                <form className="flex flex-col gap-4">
                  <input
                    className="bg-white/90 rounded-lg px-4 py-3 outline-none"
                    placeholder="Store Name"
                  />
                  <input
                    className="bg-white/90 rounded-lg px-4 py-3 outline-none"
                    placeholder="Email"
                  />
                  <input
                    className="bg-white/90 rounded-lg px-4 py-3 outline-none"
                    placeholder="Password"
                  />

                  <Link
                    to="/retailer/dashboard"
                    className="bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition shadow-md text-center"
                  >
                    Sign up as retailer
                  </Link>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* LOGIN LINK */}
        <div className="w-full max-w-4xl mt-4 flex justify-end">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-orange-500 hover:underline">
              Log in
            </a>
          </p>
        </div>

      </div>

      <AuthFooter />

    </div>
  );
}

export default Signup;