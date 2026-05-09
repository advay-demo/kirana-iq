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

  const handleSendOTP = (e) => {
    e.preventDefault();
    setRetailerStep(2);
  };

  const handleRetailerSignup = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      username: retailerData.phone,
      password: "temp12345",
      phone: retailerData.phone,
      role: "retailer",
      first_name: retailerData.fullName,
    };

    const response = await retailerSignup(payload);

    localStorage.setItem("accessToken", response.tokens.access);
    localStorage.setItem("refreshToken", response.tokens.refresh);
    localStorage.setItem("userRole", response.user.role);
    localStorage.setItem("userName", response.user.name);

    navigate("/retailer/dashboard");

  } catch (error) {
    console.error(error);
    alert("Signup failed");
  }
};
  const [retailerData, setRetailerData] = useState({
  fullName: "",
  phone: "",
  otp: "",
  shopName: "",
  shopCategory: "",
  city: "",
  area: "",
  whatsapp: "",
});
const handleRetailerChange = (e) => {
  setRetailerData({
    ...retailerData,
    [e.target.name]: e.target.value,
  });
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthNavbar />

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {/* ROLE TOGGLE */}
        <div className="mb-8 w-full max-w-md">
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
        <div className="w-full max-w-4xl h-[500px] overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white relative">
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
                <h2 className="text-2xl font-bold mb-6 drop-shadow-md">
                  Customer Signup
                </h2>

                <form className="flex flex-col gap-4">
                  <input
                    className="bg-white/90 rounded-lg px-4 py-3 outline-none text-black"
                    placeholder="Full Name"
                  />
                  <input
                    className="bg-white/90 rounded-lg px-4 py-3 outline-none text-black"
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    className="bg-white/90 rounded-lg px-4 py-3 outline-none text-black"
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
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

              <div className="relative z-10 w-full max-w-md text-white text-center px-6">
                <h2 className="text-2xl font-bold mb-6">
                  Retailer Signup
                </h2>

                {retailerStep === 1 ? (
                  <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
                    <div className="flex bg-white/90 rounded-lg overflow-hidden">
                      <span className="px-4 py-3 text-black font-medium border-r">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={retailerData.phone}
                        onChange={handleRetailerChange}
                        placeholder="Mobile Number"
                        className="flex-1 px-4 py-3 outline-none text-black"
                      />
                    </div>

                    <p className="text-sm text-gray-200">
                      OTP will be sent via SMS
                    </p>

                    <button
                      type="submit"
                      className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
                    >
                      Send OTP
                    </button>
                  </form>
                ) : (
                  <form
                    onSubmit={handleRetailerSignup}
                    className="flex flex-col gap-4"
                  >
                    <input
                      name="otp"
                      value={retailerData.otp}
                      onChange={handleRetailerChange}
                      className="bg-white/90 rounded-lg px-4 py-3 outline-none text-black"
                      placeholder="Enter OTP"
                    />

                    <input
                      name="shopName"
                      value={retailerData.shopName}
                      onChange={handleRetailerChange}
                      className="bg-white/90 rounded-lg px-4 py-3 outline-none text-black"
                      placeholder="Shop Name"
                    />
                    

                    <select
                        name="shopCategory"
                        value={retailerData.shopCategory}
                        onChange={handleRetailerChange}
                        className="bg-white/90 rounded-lg px-4 py-3 outline-none text-black"
                      >
                      <option>Select Shop Category</option>
                      <option>Kirana</option>
                      <option>Pharmacy</option>
                      <option>Clothing</option>
                      <option>Electronics</option>
                      <option>Stationery</option>
                      <option>Hardware</option>
                      <option>Cosmetics</option>
                      <option>Other</option>
                    </select>

                    <input
                      name="city"
                      value={retailerData.city}
                      onChange={handleRetailerChange}
                      className="bg-white/90 rounded-lg px-4 py-3 outline-none text-black"
                      placeholder="City"
                    />

                    <input
                      name="city"
                      value={retailerData.city}
                      onChange={handleRetailerChange}
                      className="bg-white/90 rounded-lg px-4 py-3 outline-none text-black"
                      placeholder="City"
                    />

                    <input
                      name="whatsapp"
                      value={retailerData.whatsapp}
                      onChange={handleRetailerChange}
                      className="bg-white/90 rounded-lg px-4 py-3 outline-none text-black"
                      placeholder="WhatsApp Number (Optional)"
                    />

                    <button
                      type="submit"
                      className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
                    >
                      Create Store
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* LOGIN */}
        <div className="w-full max-w-4xl mt-4 flex justify-end">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
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