import React, { useState, useEffect, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import {
  CheckCircle, X, Zap, Shield, Building2,
  ChevronDown, ArrowRight, Sparkles, Brain, TrendingUp,
  BarChart3, Package, Headphones, Code2, Star
} from "lucide-react";

/* ── Intersection-based fade ── */
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setVis(true); observer.disconnect(); } },
        { threshold: 0.1 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);
  return [ref, vis];
}

/* ── FAQ item ── */
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-orange-300 shadow-md shadow-orange-50" : "border-gray-200"}`}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-800 text-base">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-orange-500" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}>
        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ── Feature row ── */
function FeatureRow({ label, starter, pro, business }) {
  const cell = (v) =>
    v === true  ? <CheckCircle className="w-5 h-5 text-orange-500 mx-auto" /> :
    v === false ? <X className="w-4 h-4 text-gray-300 mx-auto" /> :
    <span className="text-sm text-gray-600 font-medium">{v}</span>;

  return (
    <tr className="border-b border-gray-100 hover:bg-orange-50/30 transition-colors">
      <td className="py-3.5 px-4 text-sm text-gray-700">{label}</td>
      <td className="py-3.5 px-4 text-center">{cell(starter)}</td>
      <td className="py-3.5 px-4 text-center bg-orange-50/50">{cell(pro)}</td>
      <td className="py-3.5 px-4 text-center">{cell(business)}</td>
    </tr>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState("monthly"); // monthly | annual
  const [heroRef, heroVis]   = useFadeIn();
  const [cardsRef, cardsVis] = useFadeIn(100);
  const [tableRef, tableVis] = useFadeIn(100);
  const [faqRef,   faqVis]   = useFadeIn(100);

  const fade = (vis) =>
    `transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  const price = (monthly, annual) =>
    billing === "annual" ? annual : monthly;

  const plans = [
    {
      id: "starter",
      icon: Zap,
      name: "Starter",
      tagline: "For small kirana stores",
      price: "Free",
      sub: "forever",
      cta: "Get Started",
      ctaStyle: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      border: "border-gray-200",
      features: [
        "Up to 50 products",
        "Basic availability tracking",
        "5 alternative suggestions/day",
        "Manual stock updates",
        "Standard dashboard",
      ],
      absent: ["AI restocking predictions", "Multi-store support", "Analytics", "Priority support"],
      highlight: false,
    },
    {
      id: "pro",
      icon: Sparkles,
      name: "Pro",
      tagline: "For growing businesses",
      price: price(499, 399),
      sub: `/mo${billing === "annual" ? " · billed annually" : ""}`,
      cta: "Start Free Trial",
      ctaStyle: "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-200",
      border: "border-orange-400",
      badge: "Most Popular",
      features: [
        "Unlimited products",
        "Real-time availability tracking",
        "Unlimited AI alternatives",
        "AI restocking predictions",
        "Multi-store support (up to 5)",
        "Full analytics dashboard",
        "Email + chat support",
      ],
      absent: ["Dedicated account manager", "Custom API access", "Custom integrations"],
      highlight: true,
    },
    {
      id: "business",
      icon: Building2,
      name: "Business",
      tagline: "For large retail chains",
      price: "Custom",
      sub: "contact for pricing",
      cta: "Contact Sales",
      ctaStyle: "bg-gray-900 text-white hover:bg-gray-800",
      border: "border-gray-200",
      features: [
        "Everything in Pro",
        "Unlimited stores",
        "Advanced AI insights",
        "Dedicated account manager",
        "Custom API access",
        "Custom integrations",
        "SLA & priority support",
      ],
      absent: [],
      highlight: false,
    },
  ];

  return (
    <MainLayout>
      <div className="pt-24 overflow-hidden">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className={`relative text-center px-6 py-16 max-w-4xl mx-auto ${fade(heroVis)}`}
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-64 bg-orange-100 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-0 right-1/4 w-80 h-64 bg-amber-100 rounded-full blur-3xl opacity-40" />
          </div>

          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" /> No hidden fees. Cancel anytime.
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Simple, transparent
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
              pricing.
            </span>
          </h1>
          <p className="text-gray-500 mt-5 text-xl max-w-xl mx-auto">
            Choose the plan that fits your store. Upgrade or downgrade anytime — no contracts.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${billing === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${billing === "annual" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Annual
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </section>

        {/* ── PRICING CARDS ─────────────────────────────────────── */}
        <section
          ref={cardsRef}
          className={`px-6 pb-16 max-w-6xl mx-auto ${fade(cardsVis)}`}
        >
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl border-2 ${plan.border} p-8 flex flex-col
                  ${plan.highlight
                    ? "bg-white shadow-2xl shadow-orange-100 scale-[1.03] z-10"
                    : "bg-white shadow-sm"
                  } transition-transform duration-300 hover:-translate-y-1`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${plan.highlight ? "bg-orange-500" : "bg-gray-100"}`}>
                  <plan.icon className={`w-5 h-5 ${plan.highlight ? "text-white" : "text-gray-600"}`} />
                </div>

                <div className="font-bold text-gray-900 text-lg">{plan.name}</div>
                <div className="text-gray-400 text-sm mt-0.5">{plan.tagline}</div>

                <div className="mt-6 flex items-end gap-1.5">
                  {plan.price !== "Custom" && plan.price !== "Free" && (
                    <span className="text-gray-400 text-lg font-semibold self-start mt-1">₹</span>
                  )}
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                </div>
                <div className="text-gray-400 text-xs mt-1">{plan.sub}</div>

                <div className="my-6 border-t border-gray-100" />

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {plan.absent.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/login?tab=signup"
                  className={`mt-8 block text-center py-3.5 rounded-xl font-semibold text-sm transition ${plan.ctaStyle}`}
                >
                  {plan.cta} {plan.highlight && <ArrowRight className="inline w-4 h-4 ml-1" />}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            No credit card required for Starter. Pro includes a 14-day free trial.
          </p>
        </section>

        {/* ── COMPARISON TABLE ──────────────────────────────────── */}
        <section
          ref={tableRef}
          className={`py-20 px-6 bg-gray-50 ${fade(tableVis)}`}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Compare plans</h2>
            <p className="text-gray-400 text-center mb-12">Everything side by side so you can choose with confidence.</p>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-5 px-4 text-left text-sm text-gray-400 font-medium w-2/5">Feature</th>
                    <th className="py-5 px-4 text-center text-sm font-bold text-gray-700">Starter</th>
                    <th className="py-5 px-4 text-center text-sm font-bold text-orange-600 bg-orange-50/50">
                      Pro <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full ml-1 font-semibold">Popular</span>
                    </th>
                    <th className="py-5 px-4 text-center text-sm font-bold text-gray-700">Business</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <td colSpan={4} className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Inventory</td>
                  </tr>
                  <FeatureRow label="Product catalogue limit" starter="50 items" pro="Unlimited" business="Unlimited" />
                  <FeatureRow label="Real-time availability" starter={false} pro={true} business={true} />
                  <FeatureRow label="Manual stock updates" starter={true} pro={true} business={true} />
                  <FeatureRow label="Multi-store support" starter={false} pro="Up to 5" business="Unlimited" />

                  <tr className="bg-gray-50 border-b border-gray-100">
                    <td colSpan={4} className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">AI Features</td>
                  </tr>
                  <FeatureRow label="Smart product alternatives" starter="5/day" pro="Unlimited" business="Unlimited" />
                  <FeatureRow label="AI restocking predictions" starter={false} pro={true} business={true} />
                  <FeatureRow label="Demand forecasting" starter={false} pro={true} business={true} />
                  <FeatureRow label="Advanced AI insights" starter={false} pro={false} business={true} />

                  <tr className="bg-gray-50 border-b border-gray-100">
                    <td colSpan={4} className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Analytics & Reports</td>
                  </tr>
                  <FeatureRow label="Basic dashboard" starter={true} pro={true} business={true} />
                  <FeatureRow label="Full analytics dashboard" starter={false} pro={true} business={true} />
                  <FeatureRow label="Custom reports" starter={false} pro={false} business={true} />

                  <tr className="bg-gray-50 border-b border-gray-100">
                    <td colSpan={4} className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Support & Access</td>
                  </tr>
                  <FeatureRow label="Email support" starter={true} pro={true} business={true} />
                  <FeatureRow label="Chat support" starter={false} pro={true} business={true} />
                  <FeatureRow label="Dedicated account manager" starter={false} pro={false} business={true} />
                  <FeatureRow label="API access" starter={false} pro={false} business={true} />
                  <FeatureRow label="Custom integrations" starter={false} pro={false} business={true} />
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL STRIP ─────────────────────────────────── */}
        <section className="py-20 px-6 bg-black text-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "KiranaIQ paid for itself in the first week. No more emergency stock calls at midnight.",
                name: "Ramesh Sharma",
                role: "Owner, Sharma General Store · Delhi",
              },
              {
                quote: "The AI predictions are scary accurate. I now know what to order 3 days before I run out.",
                name: "Priya Nair",
                role: "Manager, Fresh Needs Chain · Mumbai",
              },
              {
                quote: "From 3 stores to 8 in a year. KiranaIQ made scaling inventory actually manageable.",
                name: "Arun Patel",
                role: "Director, Patel Retail Group · Ahmedabad",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section
          ref={faqRef}
          className={`py-20 px-6 max-w-3xl mx-auto ${fade(faqVis)}`}
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Frequently asked questions</h2>
          <p className="text-gray-400 text-center mb-10">Still have questions? We're here to help.</p>

          <div className="space-y-3">
            {[
              {
                q: "Do I need a credit card to start?",
                a: "No. The Starter plan is completely free with no credit card required. For Pro, you get a 14-day free trial before any charges.",
              },
              {
                q: "Can I switch plans anytime?",
                a: "Yes. Upgrade or downgrade at any time. If you upgrade mid-cycle, you're only charged the prorated difference. Downgrades take effect at the next billing date.",
              },
              {
                q: "How accurate are the AI predictions?",
                a: "Our models are trained on historical sales patterns and real-time market signals. Accuracy improves over time as the system learns your specific inventory behaviour — typically 85–92% accuracy within the first month.",
              },
              {
                q: "Is KiranaIQ suitable for a small kirana with just one store?",
                a: "Absolutely. The Starter plan is built specifically for small, single-store owners to get started with zero cost. You can upgrade to Pro as you grow.",
              },
              {
                q: "What happens to my data if I cancel?",
                a: "Your data is retained for 30 days after cancellation. You can export everything before that window closes. After 30 days, data is permanently deleted.",
              },
              {
                q: "Is there a long-term contract for the Business plan?",
                a: "Business plans are typically annual contracts, but we work with each enterprise customer individually. Reach out to our sales team to discuss what works for you.",
              },
            ].map((item) => (
              <FAQ key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-28 px-6 bg-gradient-to-br from-orange-500 to-amber-400 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight">
              Start free. Grow at your pace.
            </h2>
            <p className="mt-4 text-orange-100 text-lg max-w-xl mx-auto">
              No contracts. No hidden fees. Just smarter inventory management from day one.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login?tab=signup"
                className="bg-white text-orange-600 font-semibold px-8 py-4 rounded-xl hover:bg-orange-50 transition shadow-lg"
              >
                Get Started for Free
              </Link>
              <Link
                to="/features"
                className="border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition"
              >
                Explore Features →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </MainLayout>
  );
}