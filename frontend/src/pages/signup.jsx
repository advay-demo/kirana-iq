import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import AuthNavbar from "../components/AuthNavbar";
import AuthFooter from "../components/AuthFooter";
import customer from "../assets/images/customer.jpg";
import retailer from "../assets/images/retailer.jpg";

function Signup() {
  const [role, setRole] = useState("customer");
  const imageRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
  if (!imageRef.current || !formRef.current) return;

  const tl = gsap.timeline();

  if (role === "customer") {
    tl.to(imageRef.current, {
      x: "0%",
      duration: 0.6,
      ease: "power3.inOut",
    }).fromTo(
      formRef.current,
      { x: "-100%" },
      {
        x: "0%",
        duration: 0.6,
        ease: "power3.inOut",
      },
      0
    );
  } else {
    tl.to(formRef.current, {
      x: "100%",
      duration: 0.6,
      ease: "power3.inOut",
    }).fromTo(
      imageRef.current,
      { x: "100%" },
      {
        x: "0%",
        duration: 0.6,
        ease: "power3.inOut",
      },
      0
    );
  }
}, [role]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <AuthNavbar />

      <div className="flex flex-1 flex-col items-center justify-center px-6">

        {/* TOGGLE ABOVE CARD */}
        <div className="mb-6 w-full max-w-md"
        >
          <div className="flex bg-gray-100 rounded-lg p-1 shadow-sm">
            
            <button
              onClick={() => setRole("customer")}
              className={`flex-1 py-2 text-sm rounded-md transition ${
                role === "customer"
                  ? "bg-white shadow"
                  : "text-gray-500"
              }`}
            >
              Customer
            </button>

            <button
              onClick={() => setRole("retailer")}
              className={`flex-1 py-2 text-sm rounded-md transition ${
                role === "retailer"
                  ? "bg-white shadow"
                  : "text-gray-500"
              }`}
            >
              Retailer
            </button>

          </div>
        </div>
<div className="relative z-10 w-full max-w-md text-white text-center">

  <h2 className="text-2xl font-bold mb-6 drop-shadow-md">
    Customer Signup
  </h2>

  <form className="flex flex-col gap-4">

    <input
      className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
      placeholder="Full Name"
    />

    <input
      className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
      placeholder="Email"
    />

    <input
      className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
      placeholder="Password"
    />

    <button className="bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition shadow-md">
      Sign up as customer
    </button>

  </form>

</div>
</div>

    {/* RIGHT PANEL (Retailer) */}
   <div
  className="w-1/2 h-full flex items-center justify-center bg-gray-50 bg-cover bg-center"
  style={{ backgroundImage: `url(${retailer})` }}
>
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Retailer Signup
        </h2>

        <form className="flex flex-col gap-4">
          <input className="border rounded-lg px-4 py-3" placeholder="Store Name" />
          <input className="border rounded-lg px-4 py-3" placeholder="Email" />
          <input className="border rounded-lg px-4 py-3" placeholder="Password" />

          <button className="bg-orange-500 text-white py-3 rounded-lg">
            Sign up as retailer
          </button>
        </form>
      </div>
    </div>

  </div>

</div>
<div className="w-full max-w-5xl mt-4 flex justify-end">
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