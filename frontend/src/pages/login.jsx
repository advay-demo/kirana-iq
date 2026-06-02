import React, { useState } from "react";
import AuthNavbar from "../components/AuthNavbar";
import AuthFooter from "../components/AuthFooter";
import retailer from "../assets/images/retailer.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginUser, retailerSignup } from "../services/auth";

function Login() {
  const [searchParams] = useSearchParams();
  // "login" | "signup"
  const [panel, setPanel] = useState(searchParams.get("tab") === "signup" ? "signup" : "login");
  const navigate = useNavigate();

  /* ── LOGIN STATE ── */
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const response = await loginUser(loginData);
      localStorage.setItem("accessToken", response.tokens.access);
      localStorage.setItem("refreshToken", response.tokens.refresh);
      localStorage.setItem("userRole", response.user.role);
      localStorage.setItem("userName", response.user.name);
      localStorage.setItem("hasOnboarded", response.user.has_onboarded ? "true" : "false");
      navigate("/retailer/dashboard");
    } catch {
      setLoginError("Invalid phone number or password.");
    } finally {
      setLoginLoading(false);
    }
  };

  /* ── SIGNUP STATE ── */
  const [signupStep, setSignupStep] = useState(1); // 1 = phone+OTP, 2 = details
  const [signupData, setSignupData] = useState({
    fullName: "",
    phone: "",
    otp: "",
    shopName: "",
    shopCategory: "",
    city: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
  });
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!signupData.phone || signupData.phone.length < 10) {
      setSignupError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setSignupError("");
    setSignupStep(2);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");
    if (signupData.password !== signupData.confirmPassword) {
      setSignupError("Passwords do not match.");
      return;
    }
    setSignupLoading(true);
    try {
      const payload = {
        username: signupData.phone,
        password: signupData.password,
        phone: signupData.phone,
        role: "retailer",
        first_name: signupData.fullName,
      };
      const response = await retailerSignup(payload);
      localStorage.setItem("accessToken", response.tokens.access);
      localStorage.setItem("refreshToken", response.tokens.refresh);
      localStorage.setItem("userRole", response.user.role);
      localStorage.setItem("userName", response.user.name);
      localStorage.setItem("hasOnboarded", response.user.has_onboarded ? "true" : "false");
      navigate("/retailer/dashboard");
    } catch (err) {
      setSignupError(err.message || "Signup failed. Please try again.");
    } finally {
      setSignupLoading(false);
    }
  };

  const switchPanel = (to) => {
    setPanel(to);
    setLoginError("");
    setSignupError("");
    setSignupStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthNavbar />

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">

        {/* ── PILL TOGGLE ── */}
        <div className="mb-6 w-full max-w-xs">
          <div className="relative flex bg-gray-200 rounded-full p-1 shadow-inner">
            <div
              className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow-md transition-all duration-300 ${
                panel === "login" ? "left-1" : "left-[calc(50%-2px)]"
              }`}
            />
            <button
              id="tab-login"
              onClick={() => switchPanel("login")}
              className={`relative z-10 flex-1 py-2 text-sm font-semibold transition ${
                panel === "login" ? "text-orange-500" : "text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              id="tab-signup"
              onClick={() => switchPanel("signup")}
              className={`relative z-10 flex-1 py-2 text-sm font-semibold transition ${
                panel === "signup" ? "text-orange-500" : "text-gray-500"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* ── SLIDING CARD ── */}
        <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg border border-gray-200">
          <div
            className={`flex w-[200%] transition-transform duration-700 ease-in-out ${
              panel === "login" ? "translate-x-0" : "-translate-x-1/2"
            }`}
          >

            {/* ══ LOGIN PANEL ══ */}
            <div
              className="w-1/2 min-h-[460px] relative flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${retailer})` }}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
              <div className="relative z-10 w-full max-w-sm text-white text-center px-8 py-10">
                <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
                <p className="text-white/70 text-sm mb-8">
                  Login to your retailer account
                </p>

                {loginError && (
                  <div className="mb-4 bg-red-500/20 border border-red-400 text-red-200 text-sm rounded-lg px-4 py-2">
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
                  <div>
                    <label className="text-white/70 text-xs font-medium mb-1 block uppercase tracking-wide">
                      Phone Number / Username
                    </label>
                    <input
                      id="login-username"
                      name="username"
                      value={loginData.username}
                      onChange={handleLoginChange}
                      placeholder="e.g. 9876543210"
                      required
                      className="w-full bg-white/15 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 focus:bg-white/25 transition"
                    />
                  </div>

                  <div>
                    <label className="text-white/70 text-xs font-medium mb-1 block uppercase tracking-wide">
                      Password
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="••••••••"
                      required
                      className="w-full bg-white/15 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 focus:bg-white/25 transition"
                    />
                  </div>

                  <div className="flex justify-end -mt-1">
                    <Link
                      to="/forgot-password"
                      className="text-xs text-orange-300 hover:text-orange-200 transition"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    id="login-submit"
                    type="submit"
                    disabled={loginLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition mt-2 flex items-center justify-center gap-2"
                  >
                    {loginLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Logging in…
                      </>
                    ) : (
                      "Log in as Retailer"
                    )}
                  </button>
                </form>

                <p className="mt-6 text-sm text-white/60">
                  New here?{" "}
                  <button
                    onClick={() => switchPanel("signup")}
                    className="text-orange-300 hover:text-orange-200 font-medium transition"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </div>

            {/* ══ SIGNUP PANEL ══ */}
            <div
              className="w-1/2 min-h-[460px] relative flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${retailer})` }}
            >
              <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
              <div className="relative z-10 w-full max-w-sm text-white text-center px-8 py-10">

                {signupStep === 1 ? (
                  <>
                    <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                    <p className="text-white/70 text-sm mb-8">
                      Register your retail store on KiranaIQ
                    </p>

                    {signupError && (
                      <div className="mb-4 bg-red-500/20 border border-red-400 text-red-200 text-sm rounded-lg px-4 py-2">
                        {signupError}
                      </div>
                    )}

                    <form onSubmit={handleSendOTP} className="flex flex-col gap-4 text-left">
                      <div>
                        <label className="text-white/70 text-xs font-medium mb-1 block uppercase tracking-wide">
                          Full Name
                        </label>
                        <input
                          id="signup-fullname"
                          name="fullName"
                          value={signupData.fullName}
                          onChange={handleSignupChange}
                          placeholder="Your full name"
                          required
                          className="w-full bg-white/15 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 focus:bg-white/25 transition"
                        />
                      </div>

                      <div>
                        <label className="text-white/70 text-xs font-medium mb-1 block uppercase tracking-wide">
                          Mobile Number
                        </label>
                        <div className="flex rounded-lg overflow-hidden border border-white/30 focus-within:border-orange-400 transition">
                          <span className="bg-white/15 px-3 py-3 text-white/80 text-sm font-medium border-r border-white/30 flex items-center">
                            +91
                          </span>
                          <input
                            id="signup-phone"
                            type="tel"
                            name="phone"
                            value={signupData.phone}
                            onChange={handleSignupChange}
                            placeholder="10-digit number"
                            maxLength={10}
                            required
                            className="flex-1 bg-white/15 text-white placeholder-white/50 px-4 py-3 focus:outline-none focus:bg-white/25 transition"
                          />
                        </div>
                      </div>

                      <button
                        id="signup-send-otp"
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition mt-2"
                      >
                        Continue →
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <button
                        onClick={() => setSignupStep(1)}
                        className="text-white/60 hover:text-white transition text-sm"
                      >
                        ← Back
                      </button>
                      <div>
                        <h2 className="text-2xl font-bold text-left">Store Details</h2>
                        <p className="text-white/60 text-xs text-left">Step 2 of 2</p>
                      </div>
                    </div>

                    {signupError && (
                      <div className="mb-4 bg-red-500/20 border border-red-400 text-red-200 text-sm rounded-lg px-4 py-2">
                        {signupError}
                      </div>
                    )}

                    <form onSubmit={handleSignup} className="flex flex-col gap-3 text-left">
                      <input
                        id="signup-shopname"
                        name="shopName"
                        value={signupData.shopName}
                        onChange={handleSignupChange}
                        placeholder="Shop Name"
                        required
                        className="w-full bg-white/15 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 transition"
                      />

                      <select
                        id="signup-category"
                        name="shopCategory"
                        value={signupData.shopCategory}
                        onChange={handleSignupChange}
                        required
                        className="w-full bg-white/15 border border-white/30 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 transition appearance-none"
                      >
                        <option value="" className="text-black">Shop Category</option>
                        <option className="text-black" value="Kirana">Kirana</option>
                        <option className="text-black" value="Pharmacy">Pharmacy</option>
                        <option className="text-black" value="Clothing">Clothing</option>
                        <option className="text-black" value="Electronics">Electronics</option>
                        <option className="text-black" value="Stationery">Stationery</option>
                        <option className="text-black" value="Hardware">Hardware</option>
                        <option className="text-black" value="Cosmetics">Cosmetics</option>
                        <option className="text-black" value="Other">Other</option>
                      </select>

                      <input
                        id="signup-city"
                        name="city"
                        value={signupData.city}
                        onChange={handleSignupChange}
                        placeholder="City"
                        required
                        className="w-full bg-white/15 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 transition"
                      />

                      <input
                        id="signup-password"
                        type="password"
                        name="password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        placeholder="Create Password"
                        required
                        className="w-full bg-white/15 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 transition"
                      />

                      <input
                        id="signup-confirm-password"
                        type="password"
                        name="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        placeholder="Confirm Password"
                        required
                        className="w-full bg-white/15 border border-white/30 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 transition"
                      />

                      <button
                        id="signup-submit"
                        type="submit"
                        disabled={signupLoading}
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition mt-1 flex items-center justify-center gap-2"
                      >
                        {signupLoading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Creating Store…
                          </>
                        ) : (
                          "Create Store 🎉"
                        )}
                      </button>
                    </form>
                  </>
                )}

                <p className="mt-6 text-sm text-white/60">
                  Already have an account?{" "}
                  <button
                    onClick={() => switchPanel("login")}
                    className="text-orange-300 hover:text-orange-200 font-medium transition"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}

export default Login;