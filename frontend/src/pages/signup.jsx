import React, { useState } from "react";
import AuthNavbar from "../components/AuthNavbar";
import AuthFooter from "../components/AuthFooter";
import customer from "../assets/images/customer.jpg";
import retailer from "../assets/images/retailer.jpg";
import { Link, useNavigate } from "react-router-dom";
import { retailerSignup } from "../services/auth";

function Signup() {
  const [role, setRole] = useState("customer");
  const [retailerStep, setRetailerStep] = useState(1);
  const navigate = useNavigate();

  const [retailerData, setRetailerData] = useState({
    phone: "",
    otp: "",
  });

  const handleRetailerChange = (e) => {
    setRetailerData({
      ...retailerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (retailerData.phone.length < 10) return;
    setRetailerStep(2);
  };

  const handleRetailerSignup = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        username: retailerData.phone,
        password: "temp12345", // Mock OTP behavior
        phone: retailerData.phone,
        role: "retailer",
      };

      const response = await retailerSignup(payload);

      localStorage.setItem("accessToken", response.tokens.access);
      localStorage.setItem("refreshToken", response.tokens.refresh);
      localStorage.setItem("userRole", response.user.role);
      localStorage.setItem("userName", response.user.name);
      localStorage.setItem("hasOnboarded", response.user.has_onboarded ? "true" : "false");

      // Redirect to dashboard, which will route to onboarding if needed
      navigate("/retailer/dashboard");

    } catch (error) {
      console.error(error);
      alert("Signup failed. User may already exist.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthNavbar />

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {/* ROLE TOGGLE */}
        <div className="mb-8 w-full max-w-md mt-10">
          <div className="relative flex bg-gray-200 rounded-full p-1 shadow-inner">
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow-md transition-all duration-300 ease-in-out ${
                role === "customer" ? "left-1" : "left-[50%]"
              }`}
            />
            <button
              onClick={() => {
                setRole("customer");
                setRetailerStep(1);
              }}
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
        <div className="w-full max-w-4xl h-[450px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white relative mb-10">
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

              <div className="relative z-10 w-full max-w-md text-white text-center px-6">
                <h2 className="text-3xl font-bold mb-2 drop-shadow-md">Join KiranaIQ</h2>
                <p className="text-orange-50 mb-8">Find real-time availability for any product nearby.</p>

                <form className="flex flex-col gap-4">
                  <input className="bg-white/90 rounded-lg px-4 py-3.5 outline-none text-black" placeholder="Full Name" />
                  <input className="bg-white/90 rounded-lg px-4 py-3.5 outline-none text-black" placeholder="Email" />
                  <input type="password" className="bg-white/90 rounded-lg px-4 py-3.5 outline-none text-black" placeholder="Password" />
                  <button className="bg-orange-500 text-white font-semibold py-3.5 rounded-lg hover:bg-orange-600 transition shadow-lg mt-2">
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
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

              <div className="relative z-10 w-full max-w-md text-white text-center px-6">
                <h2 className="text-3xl font-bold mb-2">Partner with us</h2>
                <p className="text-gray-300 mb-8">Manage inventory, predict stockouts, and grow sales.</p>

                {retailerStep === 1 ? (
                  <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
                    <div className="flex bg-white/95 rounded-lg overflow-hidden shadow-inner">
                      <span className="px-4 py-3.5 text-gray-500 font-medium border-r border-gray-200 bg-gray-50">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={retailerData.phone}
                        onChange={handleRetailerChange}
                        placeholder="Mobile Number"
                        className="flex-1 px-4 py-3.5 outline-none text-black font-medium tracking-wide"
                        maxLength="10"
                        autoFocus
                      />
                    </div>
                    <p className="text-xs text-gray-300 text-left px-1">We'll send an OTP to verify your number.</p>
                    <button type="submit" className="bg-orange-500 text-white font-semibold py-3.5 rounded-lg hover:bg-orange-600 transition mt-2 shadow-lg shadow-orange-500/30">
                      Send OTP
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRetailerSignup} className="flex flex-col gap-4">
                    <div className="text-left mb-2">
                      <p className="text-sm text-gray-300">Enter OTP sent to +91 {retailerData.phone}</p>
                      <button type="button" onClick={() => setRetailerStep(1)} className="text-orange-400 text-xs font-semibold hover:underline">Change number</button>
                    </div>
                    <input
                      name="otp"
                      value={retailerData.otp}
                      onChange={handleRetailerChange}
                      className="bg-white/95 rounded-lg px-4 py-3.5 outline-none text-black font-bold tracking-[0.5em] text-center"
                      placeholder="••••••"
                      maxLength="6"
                      autoFocus
                    />
                    <button type="submit" className="bg-orange-500 text-white font-semibold py-3.5 rounded-lg hover:bg-orange-600 transition mt-2 shadow-lg shadow-orange-500/30">
                      Verify & Continue
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* LOGIN LINK */}
        <div className="w-full max-w-4xl flex justify-center pb-10">
          <p className="text-sm text-gray-500 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-bold ml-1 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}

export default Signup;