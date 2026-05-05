import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <MainLayout>
      <div className="pt-24 px-6">

        {/* HERO */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold">
            Simple, transparent pricing
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Choose the plan that fits your business.  
            No hidden fees. Upgrade anytime.
          </p>
        </section>

        {/* PRICING CARDS */}
        <section className="mt-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {/* FREE PLAN */}
          <div className="border rounded-2xl p-6 flex flex-col">
            <h3 className="text-xl font-semibold">Starter</h3>
            <p className="text-gray-500 text-sm mt-1">For small stores</p>

            <div className="mt-6 text-3xl font-bold">
              ₹0 <span className="text-sm text-gray-500">/month</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">

                            <li className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                Basic product availability tracking
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                Limited alternative suggestions
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                Manual updates
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                Basic dashboard
                            </li>

                            </ul>

            <Link
              to="/signup"
              className="mt-auto bg-gray-100 text-center py-3 rounded-lg mt-6 hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>

          {/* PRO PLAN (HIGHLIGHTED) */}
          <div className="border-2 border-orange-500 rounded-2xl p-6 flex flex-col shadow-lg scale-105">

            <div className="text-xs text-orange-500 font-semibold mb-2">
              MOST POPULAR
            </div>

            <h3 className="text-xl font-semibold">Pro</h3>
            <p className="text-gray-500 text-sm mt-1">For growing businesses</p>

            <div className="mt-6 text-3xl font-bold">
              ₹499 <span className="text-sm text-gray-500">/month</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                Real-time availability tracking
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                Smart product alternatives
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                AI restocking predictions
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                Multi-store support
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                Analytics dashboard
              </li>
            </ul>

            <Link
              to="/signup"
              className="mt-8 bg-orange-500 text-white text-center py-3 rounded-lg mt-6 hover:bg-orange-600"
            >
              Start Free Trial
            </Link>
          </div>

          {/* BUSINESS PLAN */}
          <div className="border rounded-2xl p-6 flex flex-col">
            <h3 className="text-xl font-semibold">Business</h3>
            <p className="text-gray-500 text-sm mt-1">For large retailers</p>

            <div className="mt-6 text-3xl font-bold">
              Custom
            </div>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                Everything in Pro
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                Advanced AI insights
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                Dedicated support
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                API access
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                Custom integrations
              </li>
            </ul>

            <Link
              to="/signup"
              className="mt-auto bg-gray-100 text-center py-3 rounded-lg mt-6 hover:bg-gray-200"
            >
              Contact Sales
            </Link>
          </div>

        </section>

        {/* TRUST / NOTE */}
        <section className="text-center mt-16 text-gray-500 text-sm">
          No credit card required. Cancel anytime.
        </section>
        {/* FAQ SECTION */}
<section className="mt-24 max-w-4xl mx-auto px-6">

  <h2 className="text-3xl font-semibold text-center">
    Frequently Asked Questions
  </h2>

  <div className="mt-10 space-y-4">

    {/* ITEM */}
    <details className="group border rounded-lg p-5 cursor-pointer">
      <summary className="flex justify-between items-center font-medium">
        Do I need a credit card to start?
        <span className="transition group-open:rotate-45 text-xl">+</span>
      </summary>
      <p className="text-gray-600 mt-3 text-sm">
        No, you can start using KiranaIQ without entering any payment details.
        Upgrade anytime when you’re ready.
      </p>
    </details>

    <details className="group border rounded-lg p-5 cursor-pointer">
      <summary className="flex justify-between items-center font-medium">
        Can I change my plan later?
        <span className="transition group-open:rotate-45 text-xl">+</span>
      </summary>
      <p className="text-gray-600 mt-3 text-sm">
        Yes, you can upgrade or downgrade your plan anytime based on your needs.
      </p>
    </details>

    <details className="group border rounded-lg p-5 cursor-pointer">
      <summary className="flex justify-between items-center font-medium">
        How accurate are the AI predictions?
        <span className="transition group-open:rotate-45 text-xl">+</span>
      </summary>
      <p className="text-gray-600 mt-3 text-sm">
        Our models use historical and real-time data to provide highly reliable
        demand predictions that improve over time.
      </p>
    </details>

    <details className="group border rounded-lg p-5 cursor-pointer">
      <summary className="flex justify-between items-center font-medium">
        Is this suitable for small kirana stores?
        <span className="transition group-open:rotate-45 text-xl">+</span>
      </summary>
      <p className="text-gray-600 mt-3 text-sm">
        Absolutely. KiranaIQ is designed to scale from small local shops to
        large retail chains.
      </p>
    </details>

  </div>

</section>
<footer className="mt-32 border-t border-gray-200 px-6 py-16">

    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

      {/* LEFT SIDE — BIG STATEMENT */}
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight max-w-md">
          We simplify <span className="text-orange-500">retail decisions </span>  
          so businesses can grow smarter.
        </h2>
      </div>

      {/* RIGHT SIDE — LINKS */}
      <div className="grid grid-cols-2 gap-8">

        {/* PRODUCT */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li className="hover:text-black cursor-pointer">Features</li>
            <li className="hover:text-black cursor-pointer">How it Works</li>
            <li className="hover:text-black cursor-pointer">Pricing</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li className="hover:text-black cursor-pointer">About</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
            <li className="hover:text-black cursor-pointer">Privacy</li>
          </ul>
        </div>

      </div>

    </div>

  <div className="mt-12">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

      {/* LEFT — LOGO */}
      <div className="font-semibold text-lg">
        <span className="text-orange-500">Kirana</span>
        <span className="text-orange-300 ml-1">IQ</span>
      </div>

      {/* RIGHT — COPYRIGHT + CONNECT */}
      <div className="mt-3 md:mt-0 flex items-center gap-6">

        <span>© {new Date().getFullYear()} KiranaIQ</span>

        <div className="flex items-center gap-4">
          <span className="text-gray-400">Connect:</span>

          <a href="https://linkedin.com/in/YOUR_ID" target="_blank" className="hover:text-black">
            Linkedin
          </a>

          <a href="https://github.com/YOUR_ID" target="_blank" className="hover:text-black">
            Github
          </a>

          <a href="mailto:your@email.com" className="hover:text-black">
            Mail
          </a>
        </div>

      </div>

    </div>
  </div>

  </footer>


      </div>
    </MainLayout>
  );
}

export default Pricing;