import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import {
  Search, MapPin, Sparkles, TrendingUp, CheckCircle,
  AlertTriangle, ArrowRight, Package, BarChart3, Brain,
  ShoppingCart, Zap, Shield
} from "lucide-react";

/* ── tiny hook: animate number counting up ── */
function useCountUp(target, duration = 1500) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return [val, ref];
}

/* ── mock store card ── */
function StoreCard({ name, dist, status, price, delay = 0 }) {
  const cfg = {
    "In Stock":   { dot: "#22c55e", badge: "#dcfce7", text: "#15803d" },
    "Low Stock":  { dot: "#f59e0b", badge: "#fef3c7", text: "#92400e" },
    "Out":        { dot: "#ef4444", badge: "#fee2e2", text: "#991b1b" },
  }[status];
  return (
    <div
      className="bg-white rounded-2xl p-4 shadow-md border border-gray-100"
      style={{ animation: `slideUp 0.5s ease ${delay}s both` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-800 text-sm">{name}</span>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"
          style={{ background: cfg.badge, color: cfg.text }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: cfg.dot }} />
          {status}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{dist}</span>
        {price && <span className="font-bold text-gray-800 text-sm">₹{price}</span>}
      </div>
    </div>
  );
}

/* ── stat card ── */
function Stat({ target, suffix, label }) {
  const [val, ref] = useCountUp(target);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-bold text-white">{val}{suffix}</div>
      <div className="text-gray-400 mt-2 text-sm">{label}</div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <MainLayout>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .float { animation: floatY 4s ease-in-out infinite; }
        .float-slow { animation: floatY 6s ease-in-out infinite; }
      `}</style>

      <div className="pt-24 overflow-hidden">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6">
          {/* Background blobs */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-50" />
          </div>

          <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-4 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
            How KiranaIQ Works
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl mt-4">
            Inventory decisions,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
              made intelligently.
            </span>
          </h1>

          <p className="text-gray-500 mt-6 text-xl max-w-2xl leading-relaxed">
            From tracking availability to predicting demand —
            KiranaIQ simplifies every step of your retail inventory workflow.
          </p>

          {/* Floating search preview */}
          <div className="float mt-14 bg-white border border-gray-200 rounded-2xl shadow-xl px-6 py-4 flex items-center gap-4 max-w-md w-full">
            <Search className="w-5 h-5 text-orange-400 flex-shrink-0" />
            <div className="flex-1 text-left">
              <span className="text-gray-400 text-sm">search </span>
              <span className="text-gray-800 font-medium text-sm">"Amul Milk 500ml"</span>
            </div>
            <div className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium">Search</div>
          </div>

          {/* Scroll cue */}
          <div className="mt-16 flex flex-col items-center gap-2 text-gray-400 text-xs animate-bounce">
            <span>Scroll to explore</span>
            <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1">
              <div className="w-1 h-2 bg-gray-400 rounded-full" />
            </div>
          </div>
        </section>

        {/* ── STEPS ────────────────────────────────────────────── */}

        {/* STEP 1 */}
        <section className="py-28 px-6 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#431407_0%,_transparent_60%)]" />
          <div className="max-w-6xl mx-auto relative grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold mb-6">
                <span className="w-8 h-8 rounded-full border border-orange-500 flex items-center justify-center text-xs">01</span>
                Search & Discover
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Search any product
                <br />
                <span className="text-orange-400">across all stores.</span>
              </h2>
              <p className="text-gray-400 mt-6 text-lg leading-relaxed">
                Type any product name — milk, atta, dal, soap. KiranaIQ instantly
                scans all registered nearby kirana stores and shows you who has it,
                at what price, and how far away.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Real-time stock", "Price comparison", "Distance sorted"].map(t => (
                  <span key={t} className="flex items-center gap-2 bg-white/10 text-sm px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4 text-orange-400" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual: search + store cards */}
            <div className="float-slow space-y-3">
              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 flex items-center gap-3 mb-4">
                <Search className="w-5 h-5 text-orange-400" />
                <span className="text-white text-sm">search "Amul Taza 500ml"</span>
              </div>
              <StoreCard name="Sharma General Store" dist="0.4 km" status="In Stock" price={28} delay={0.1} />
              <StoreCard name="Patel Kirana" dist="0.9 km" status="Low Stock" price={27} delay={0.2} />
              <StoreCard name="Daily Needs" dist="1.5 km" status="Out" price={null} delay={0.3} />
            </div>
          </div>
        </section>

        {/* STEP 2 */}
        <section className="py-28 px-6 bg-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-orange-50 -z-10 rounded-l-[80px]" />
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

            {/* Visual: alternatives grid */}
            <div className="float grid grid-cols-2 gap-3">
              {[
                { name: "Toned Milk", store: "Singh Mart", price: 24, status: "In Stock" },
                { name: "Soy Milk", store: "Metro Kirana", price: 55, status: "In Stock" },
                { name: "Buffalo Milk", store: "Om Namah", price: 32, status: "Low Stock" },
                { name: "Almond Milk", store: "Fresh Corner", price: 89, status: "In Stock" },
              ].map((a, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-orange-200 transition">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center mb-3">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="font-semibold text-gray-800 text-sm">{a.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{a.store}</div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-gray-900">₹{a.price}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${a.status === "In Stock" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {a.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-orange-500 text-sm font-semibold mb-6">
                <span className="w-8 h-8 rounded-full border border-orange-400 flex items-center justify-center text-xs">02</span>
                Smart Alternatives
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                Never lose a sale
                <br />
                <span className="text-orange-500">to out-of-stock.</span>
              </h2>
              <p className="text-gray-500 mt-6 text-lg leading-relaxed">
                When a product isn't available, KiranaIQ's AI engine surfaces smart
                alternatives — similar products from nearby stores with their live
                availability and prices. Customers find what they need, you retain the sale.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["AI-matched products", "Nearest store pinned", "Live pricing"].map(t => (
                  <span key={t} className="flex items-center gap-2 bg-orange-50 text-orange-700 text-sm px-4 py-2 rounded-full border border-orange-200">
                    <CheckCircle className="w-4 h-4" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STEP 3 */}
        <section className="py-28 px-6 bg-gray-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#1c1917_0%,_transparent_60%)]" />
          <div className="max-w-6xl mx-auto relative grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold mb-6">
                <span className="w-8 h-8 rounded-full border border-orange-500 flex items-center justify-center text-xs">03</span>
                AI Restocking
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Know what to restock
                <br />
                <span className="text-orange-400">before you run out.</span>
              </h2>
              <p className="text-gray-400 mt-6 text-lg leading-relaxed">
                KiranaIQ's AI analyses your stock levels, sales velocity, and seasonal
                patterns to generate precise restock recommendations — so you're always
                prepared, never overstocked, never caught short.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  { icon: Brain,      label: "AI demand forecasting" },
                  { icon: TrendingUp, label: "Sales velocity tracking" },
                  { icon: Zap,        label: "Proactive reorder alerts" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <Icon className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual: AI insights cards */}
            <div className="float-slow space-y-3">
              {[
                { type: "critical", product: "Amul Butter 500g", msg: "Stock out in ~2 days. Reorder now.", color: "#ef4444" },
                { type: "warning",  product: "Britannia Bread",   msg: "Running low. Reorder recommended.",color: "#f59e0b" },
                { type: "good",     product: "Tata Salt 1kg",     msg: "Inventory looks healthy.",          color: "#22c55e" },
              ].map((ins, i) => (
                <div key={i} className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: ins.color + "22" }}>
                    {ins.type === "critical" ? <AlertTriangle className="w-5 h-5" style={{ color: ins.color }} />
                      : ins.type === "warning" ? <TrendingUp className="w-5 h-5" style={{ color: ins.color }} />
                      : <CheckCircle className="w-5 h-5" style={{ color: ins.color }} />}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{ins.product}</div>
                    <div className="text-gray-400 text-xs mt-1">{ins.msg}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FLOW DIAGRAM ─────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white text-center">
          <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase">The Full Flow</span>
          <h2 className="text-4xl font-bold mt-4 text-gray-900">From search to decision in seconds</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">Every step connected, every insight automated.</p>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-0 max-w-4xl mx-auto">
            {[
              { icon: Search,    label: "Search",        sub: "Type any product",       bg: "bg-orange-500" },
              { icon: MapPin,    label: "Availability",  sub: "See nearby stores",      bg: "bg-amber-500" },
              { icon: Sparkles,  label: "Alternatives",  sub: "AI-matched options",     bg: "bg-orange-400" },
              { icon: TrendingUp,label: "Insights",      sub: "Predict & restock",      bg: "bg-amber-400" },
            ].map((step, i, arr) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center text-center w-40">
                  <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-gray-800 mt-3 text-sm">{step.label}</div>
                  <div className="text-gray-400 text-xs mt-1">{step.sub}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex items-center justify-center text-gray-300 px-2 mb-8 md:mb-0">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ── STATS BAR ────────────────────────────────────────── */}
        <section className="bg-black py-20 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat target={2500} suffix="+" label="Retailers onboarded" />
            <Stat target={98}   suffix="%" label="Uptime guaranteed" />
            <Stat target={40}   suffix="%" label="Less stockouts reported" />
            <Stat target={3}    suffix="s"  label="Avg. search response" />
          </div>
        </section>

        {/* ── WHO IT'S FOR ─────────────────────────────────────── */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900">Built for every kirana</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">Whether you run one shop or many, KiranaIQ scales with you.</p>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                { icon: ShoppingCart, title: "Small Kirana Owners",   desc: "Track stock, get alerts, never run out of essentials again.", color: "text-orange-500", bg: "bg-orange-50" },
                { icon: BarChart3,    title: "Chain Retailers",        desc: "Unified dashboard across multiple stores with deep analytics.", color: "text-amber-600", bg: "bg-amber-50" },
                { icon: Shield,       title: "Suppliers & Wholesalers", desc: "Understand demand patterns and fulfil orders proactively.",    color: "text-orange-400", bg: "bg-orange-50" },
              ].map(({ icon: Icon, title, desc, color, bg }) => (
                <div key={title} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition text-left">
                  <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-28 px-6 bg-gradient-to-br from-orange-500 to-amber-400 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-bold max-w-2xl mx-auto leading-tight">
            Ready to run a smarter store?
          </h2>
          <p className="mt-4 text-orange-100 text-lg max-w-xl mx-auto">
            Join thousands of retailers already using KiranaIQ to make better decisions every day.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login?tab=signup"
              className="bg-white text-orange-600 font-semibold px-8 py-4 rounded-xl hover:bg-orange-50 transition shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/features"
              className="border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition"
            >
              Explore Features →
            </Link>
          </div>
        </section>

      </div>
    </MainLayout>
  );
}