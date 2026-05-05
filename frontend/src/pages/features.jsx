import React, { useEffect, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import availability from "../assets/images/availability.jpg";
import alternatives from "../assets/images/alternatives.jpg";
import prediction from "../assets/images/prediction.jpg";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function Features() {
  const lineRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Timeline line animation
    gsap.fromTo(
      lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );

    // Sections animation
    sectionsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <MainLayout>
      <div className="pt-24">

        {/* HERO */}
        <section className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold leading-tight">
            Smarter inventory decisions <br />
            <span className="text-orange-500">powered by AI</span>
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Track availability, discover alternatives, and predict demand —
            all in one intelligent system built for modern retail.
          </p>
        </section>

        {/* TIMELINE WRAPPER */}
        <div className="relative max-w-6xl mx-auto mt-24 px-6">

          {/* VERTICAL LINE */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 w-[2px] bg-orange-400 -translate-x-1/2"
          />

          <div className="flex flex-col gap-32">

            {/* FEATURE 1 */}
            <div
              ref={(el) => (sectionsRef.current[0] = el)}
              className="relative flex items-center justify-between"
            >
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full z-10"></div>

              <img
                src={availability}
                className="w-[45%] rounded-xl shadow-md hover:scale-105 transition duration-500"
              />

              <div className="w-[45%]">
                <h2 className="text-2xl font-semibold">
                  Real-time Product Availability
                </h2>
                <p className="text-gray-600 mt-3">
                  Get instant visibility into product availability across multiple suppliers and platforms.
                  No more manual checks or outdated spreadsheets — everything stays updated automatically.
                  Quickly identify what’s in stock, what’s running low, and what needs attention.
                  Reduce delays, avoid missed sales, and keep your operations running smoothly.
                  Make faster, more confident decisions with live inventory insights.
                </p>
              </div>
            </div>

            {/* FEATURE 2 */}
            <div
              ref={(el) => (sectionsRef.current[1] = el)}
              className="relative flex items-center justify-between"
            >
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full z-10"></div>

              <div className="w-[45%] text-right">
                <h2 className="text-2xl font-semibold">
                  Smart Product Alternatives
                </h2>
                <p className="text-gray-600 mt-3">
                  Never lose a sale because a product is out of stock.
                  KiranaIQ suggests relevant alternatives in real time based on product similarity and demand.
                  Ensure your shelves stay filled with options your customers are likely to choose.
                  Adapt instantly to supply changes without disrupting your business flow.
                  Keep customers satisfied while maintaining consistent product availability.
                </p>
              </div>

              <img
                src={alternatives}
                className="w-[45%] rounded-xl shadow-md hover:scale-105 transition duration-500"
              />
            </div>

            {/* FEATURE 3 */}
            <div
              ref={(el) => (sectionsRef.current[2] = el)}
              className="relative flex items-center justify-between"
            >
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full z-10"></div>

              <img
                src={prediction}
                className="w-[45%] rounded-xl shadow-md hover:scale-105 transition duration-500"
              />

              <div className="w-[45%]">
                <h2 className="text-2xl font-semibold">
                  AI-Powered Restocking Predictions
                </h2>
                <p className="text-gray-600 mt-3">
                  Stay ahead of demand with intelligent, data-driven forecasting.
                  Analyze past trends, seasonal patterns, and real-time signals effortlessly.
                  Know exactly when and what to restock to avoid shortages or overstocking.
                  Reduce inventory waste while maximizing product availability and efficiency.
                  Make smarter decisions with AI insights designed for modern retail.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* WHY SECTION */}
        <section className="mt-32 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">Why KiranaIQ?</h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Built for modern retailers, KiranaIQ combines real-time data,
            smart recommendations, and predictive intelligence to simplify
            inventory management and boost efficiency.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold">Save Time</h3>
              <p className="text-gray-600 text-sm mt-2">
                Automate tracking and reduce manual inventory checks.
              </p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold">Increase Sales</h3>
              <p className="text-gray-600 text-sm mt-2">
                Never lose customers due to out-of-stock products.
              </p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="font-semibold">Make Better Decisions</h3>
              <p className="text-gray-600 text-sm mt-2">
                Use AI insights to plan smarter restocking strategies.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center px-6">
          <h2 className="text-3xl font-semibold">
            Ready to transform your inventory management?
          </h2>

          <p className="text-gray-600 mt-3">
            Join retailers already using KiranaIQ to make smarter decisions.
          </p>

          <Link
            to="/signup"
            className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
            >
            Get Started
          </Link>
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

export default Features;