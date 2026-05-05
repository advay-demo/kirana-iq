import React from "react";
import MainLayout from "../layouts/MainLayout";


function HowItWorks() {
  return (
    <MainLayout>
      <div className="pt-24">

        {/* HERO */}
        <section className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl">
            Inventory decisions,
            <br />
            <span className="text-orange-500">made intelligently.</span>
          </h1>

          <p className="text-gray-600 mt-6 text-lg max-w-2xl">
            From tracking availability to predicting demand —
            KiranaIQ simplifies every step of inventory management.
          </p>
        </section>

        {/* STEP 1 — DARK */}
        <section className="bg-black text-white py-32 px-6">
          <div className="max-w-5xl mx-auto">

            <span className="text-gray-400 text-sm">01</span>

            <h2 className="text-4xl md:text-5xl font-semibold mt-4 leading-tight">
              You search for a product
              <br />
              across your inventory
            </h2>

            <p className="text-gray-400 mt-6 max-w-2xl text-lg">
              Instead of manually checking stock across suppliers and platforms,
              KiranaIQ aggregates real-time data into one unified dashboard.
              Everything updates automatically — so you always work with the latest information.
            </p>

          </div>
        </section>

        {/* STEP 2 — LIGHT */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-5xl mx-auto">

            <span className="text-gray-400 text-sm">02</span>

            <h2 className="text-4xl md:text-5xl font-semibold mt-4 leading-tight">
              We analyze availability
              <br />
              and suggest alternatives
            </h2>

            <p className="text-gray-600 mt-6 max-w-2xl text-lg">
              If a product is unavailable, KiranaIQ instantly recommends
              similar alternatives based on demand trends and product similarity.
              This ensures your shelves stay filled and customers always have options.
            </p>

          </div>
        </section>

        {/* STEP 3 — DARK */}
        <section className="bg-black text-white py-32 px-6">
          <div className="max-w-5xl mx-auto">

            <span className="text-gray-400 text-sm">03</span>

            <h2 className="text-4xl md:text-5xl font-semibold mt-4 leading-tight">
              AI predicts what you’ll need
              <br />
              before you run out
            </h2>

            <p className="text-gray-400 mt-6 max-w-2xl text-lg">
              Using historical sales data, seasonal patterns, and real-time signals,
              KiranaIQ forecasts demand so you can restock proactively.
              No more overstocking or last-minute shortages.
            </p>

          </div>
        </section>

        {/* FLOW SECTION */}
        <section className="py-32 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            A seamless flow from search to decision
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 text-gray-600">

            <div className="px-6 py-3 border rounded-lg">
              Search Product
            </div>

            <span>→</span>

            <div className="px-6 py-3 border rounded-lg">
              View Availability
            </div>

            <span>→</span>

            <div className="px-6 py-3 border rounded-lg">
              Get Alternatives
            </div>

            <span>→</span>

            <div className="px-6 py-3 border rounded-lg">
              Predict & Restock
            </div>

          </div>
        </section>

        {/* BIG STATEMENT SECTION */}
        <section className="bg-gray-100 py-32 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

            <h2 className="text-4xl md:text-5xl font-semibold max-w-xl">
              Smarter inventory decisions
              <br />
              start with better data.
            </h2>

            <p className="text-gray-600 max-w-md text-lg">
              KiranaIQ gives you clarity, speed, and confidence —
              so you can focus on growing your business instead of managing stock.
            </p>

          </div>
        </section>

      </div>

    </MainLayout>
  );
}

export default HowItWorks;