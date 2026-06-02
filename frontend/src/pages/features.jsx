import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import {
  MapPin, Sparkles, TrendingUp, CheckCircle,
  Clock, AlertTriangle, ArrowRight, Zap, BarChart3,
  ShieldCheck, Brain, Package
} from "lucide-react";

import availability from "../assets/images/availability.jpg";
import alternatives from "../assets/images/alternatives.jpg";
import prediction from "../assets/images/prediction.jpg";

/* ── Intersection Observer fade-up ── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Small pill badge ── */
function Pill({ children, color = "orange" }) {
  const colors = {
    orange: "bg-orange-100 text-orange-600 border-orange-200",
    green:  "bg-green-100  text-green-700  border-green-200",
    amber:  "bg-amber-100  text-amber-700  border-amber-200",
    red:    "bg-red-100    text-red-600    border-red-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${colors[color]}`}>
      {children}
    </span>
  );
}

/* ── Live availability row ── */
function StockRow({ name, status, price, dist }) {
  const cfg = {
    "In Stock":  { dot: "bg-green-500",  badge: "bg-green-50 text-green-700" },
    "Low Stock": { dot: "bg-amber-400",  badge: "bg-amber-50 text-amber-700" },
    "Out":       { dot: "bg-red-400",    badge: "bg-red-50 text-red-600" },
  }[status];
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
      <div>
        <div className="text-white text-sm font-medium">{name}</div>
        <div className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3" /> {dist}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {price && <span className="text-white font-bold text-sm">₹{price}</span>}
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5 ${cfg.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {status}
        </span>
      </div>
    </div>
  );
}

export default function Features() {
  const [heroRef, heroVis]   = useFadeIn();
  const [f1Ref,   f1Vis]     = useFadeIn();
  const [f2Ref,   f2Vis]     = useFadeIn();
  const [f3Ref,   f3Vis]     = useFadeIn();
  const [whyRef,  whyVis]    = useFadeIn();

  const fadeClass = (vis) =>
    `transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`;

  return (
    <MainLayout>
      <div className="pt-24 overflow-hidden">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className={`relative text-center px-6 py-20 max-w-5xl mx-auto ${fadeClass(heroVis)}`}
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-amber-100 rounded-full blur-3xl opacity-40" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Pill color="orange"><Zap className="w-3 h-3" /> Real-time Inventory</Pill>
            <Pill color="green"><Sparkles className="w-3 h-3" /> AI Alternatives</Pill>
            <Pill color="amber"><Brain className="w-3 h-3" /> Demand Forecasting</Pill>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Every feature built
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
              for smarter retail.
            </span>
          </h1>
          <p className="text-gray-500 mt-6 text-xl max-w-2xl mx-auto leading-relaxed">
            Track availability, discover alternatives, predict demand —
            all inside one intelligent platform designed for kirana stores.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/login?tab=signup"
              className="bg-orange-500 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-orange-600 transition shadow-md"
            >
              Start for Free
            </Link>
            <Link
              to="/how-it-works"
              className="border border-gray-300 text-gray-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
            >
              How it works <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── FEATURE 1 — AVAILABILITY ──────────────────────────── */}
        {/* Full-bleed image with dark overlay + floating UI card */}
        <section ref={f1Ref} className={`relative min-h-[90vh] flex items-center ${fadeClass(f1Vis)}`}>

          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={availability}
              alt="Kirana store at night"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-24">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold mb-6">
                <span className="w-8 h-8 rounded-full border border-orange-500 flex items-center justify-center text-xs font-bold">01</span>
                Real-time Availability
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                See exactly what's
                <br />
                <span className="text-orange-400">in stock, right now.</span>
              </h2>
              <p className="text-gray-300 mt-6 text-lg leading-relaxed">
                Stop guessing. KiranaIQ scans stock levels across all registered
                nearby stores in real time — so you and your customers always know
                what's available, where, and at what price.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "Live stock synced across all stores",
                  "Distance-sorted results instantly",
                  "Price comparison at a glance",
                ].map(t => (
                  <div key={t} className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating live UI card */}
            <div className="bg-black/60 backdrop-blur-md border border-white/15 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-white font-semibold">Amul Taza 500ml</div>
                  <div className="text-gray-400 text-xs mt-0.5">4 stores nearby</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              <StockRow name="Sharma General Store"  status="In Stock"  price={28} dist="0.4 km" />
              <StockRow name="Patel Kirana"          status="Low Stock" price={27} dist="0.9 km" />
              <StockRow name="Om Namah Provisions"   status="In Stock"  price={29} dist="1.1 km" />
              <StockRow name="Daily Needs Corner"    status="Out"       price={null} dist="1.5 km" />
              <div className="mt-4 text-xs text-gray-500 flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> Updated just now
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURE 2 — ALTERNATIVES ──────────────────────────── */}
        <section ref={f2Ref} className={`py-24 px-6 bg-white ${fadeClass(f2Vis)}`}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

            {/* Image: grocery aisle — clipped with styled frame */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-100 to-amber-50 rounded-3xl -z-10" />
              <img
                src={alternatives}
                alt="Packed grocery store aisle showing product alternatives"
                className="w-full h-[520px] object-cover rounded-2xl shadow-xl"
              />
              {/* Overlay badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl px-5 py-4 border border-gray-100">
                <div className="text-xs text-gray-400 mb-1">AI matched</div>
                <div className="flex -space-x-2">
                  {["#f97316", "#f59e0b", "#fb923c", "#fbbf24"].map((c, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center"
                      style={{ background: c }}>
                      <Package className="w-3 h-3 text-white" />
                    </div>
                  ))}
                </div>
                <div className="text-xs font-semibold text-gray-700 mt-1.5">4 alternatives found</div>
              </div>
            </div>

            {/* Text + alternative cards */}
            <div>
              <div className="inline-flex items-center gap-2 text-orange-500 text-sm font-semibold mb-6">
                <span className="w-8 h-8 rounded-full border border-orange-400 flex items-center justify-center text-xs font-bold">02</span>
                Smart Alternatives
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Out of stock?
                <br />
                <span className="text-orange-500">Never a dead end.</span>
              </h2>
              <p className="text-gray-500 mt-6 text-lg leading-relaxed">
                When a product isn't available, KiranaIQ's AI instantly surfaces
                the most relevant alternatives from nearby stores — matched by
                category, brand, and customer preference.
              </p>

              {/* Mini alternative cards */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { name: "Toned Milk 500ml",  store: "Singh Mart",    price: 24, match: "98%" },
                  { name: "Soy Milk 200ml",    store: "Metro Kirana",  price: 55, match: "91%" },
                  { name: "Buffalo Milk 1L",   store: "Om Namah",      price: 42, match: "87%" },
                  { name: "Almond Milk 200ml", store: "Fresh Corner",  price: 89, match: "82%" },
                ].map((a) => (
                  <div key={a.name} className="bg-gray-50 border border-gray-200 hover:border-orange-200 hover:bg-orange-50/50 transition rounded-xl p-4 cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <Sparkles className="w-4 h-4 text-orange-400" />
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-full">{a.match}</span>
                    </div>
                    <div className="font-semibold text-gray-800 text-sm leading-tight">{a.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{a.store}</div>
                    <div className="font-bold text-gray-900 mt-2">₹{a.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURE 3 — AI PREDICTIONS ────────────────────────── */}
        <section ref={f3Ref} className={`relative min-h-[90vh] flex items-center ${fadeClass(f3Vis)}`}>

          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={prediction}
              alt="Shopping cart representing customer demand"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/65 to-black/30" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-24">

            {/* AI insight cards */}
            <div className="space-y-4">
              {[
                {
                  type: "critical", icon: AlertTriangle,
                  product: "Amul Butter 500g",
                  detail: "Stock out predicted in 2 days",
                  action: "Reorder 20 units",
                  iconColor: "#ef4444", bg: "rgba(239,68,68,0.1)"
                },
                {
                  type: "warning", icon: TrendingUp,
                  product: "Britannia Good Day",
                  detail: "Demand spike: Festival season",
                  action: "Stock up 35 units",
                  iconColor: "#f59e0b", bg: "rgba(245,158,11,0.1)"
                },
                {
                  type: "good", icon: ShieldCheck,
                  product: "Tata Salt 1kg",
                  detail: "Inventory healthy for 14 days",
                  action: "No action needed",
                  iconColor: "#22c55e", bg: "rgba(34,197,94,0.1)"
                },
                {
                  type: "info", icon: BarChart3,
                  product: "Parle-G Biscuits",
                  detail: "Trending +18% this week",
                  action: "Consider bulk order",
                  iconColor: "#60a5fa", bg: "rgba(96,165,250,0.1)"
                },
              ].map((ins) => (
                <div key={ins.product}
                  className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-start gap-4 hover:border-white/20 transition">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: ins.bg }}>
                    <ins.icon className="w-5 h-5" style={{ color: ins.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm">{ins.product}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{ins.detail}</div>
                  </div>
                  <div className="text-xs font-semibold whitespace-nowrap px-2.5 py-1 rounded-full bg-white/10 text-gray-300">
                    {ins.action}
                  </div>
                </div>
              ))}
            </div>

            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold mb-6">
                <span className="w-8 h-8 rounded-full border border-orange-500 flex items-center justify-center text-xs font-bold">03</span>
                AI Predictions
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Know what to restock
                <br />
                <span className="text-orange-400">before you run out.</span>
              </h2>
              <p className="text-gray-300 mt-6 text-lg leading-relaxed">
                KiranaIQ's AI analyses your sales velocity, seasonal demand trends,
                and real-time signals to give you precise, timely restock alerts —
                so you're always prepared, never caught short.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Brain,      label: "Demand forecasting" },
                  { icon: Zap,        label: "Proactive alerts" },
                  { icon: TrendingUp, label: "Trend detection" },
                  { icon: BarChart3,  label: "Sales analytics" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <Icon className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY KIRANAIQ ─────────────────────────────────────── */}
        <section ref={whyRef} className={`py-24 px-6 bg-gray-50 ${fadeClass(whyVis)}`}>
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase">Why KiranaIQ</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">
              Built differently. For kirana stores.
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              Not another generic inventory tool — every feature is purpose-built
              for the way Indian retail actually works.
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  icon: Clock,
                  title: "Save Hours Daily",
                  desc: "Automate stock checks that used to take your whole morning. Real-time syncs mean your data is always current.",
                  color: "text-orange-500", bg: "bg-orange-50",
                },
                {
                  icon: TrendingUp,
                  title: "Grow Your Revenue",
                  desc: "Never lose a sale to out-of-stock. Smart alternatives keep customers buying from you even when one item isn't available.",
                  color: "text-amber-600", bg: "bg-amber-50",
                },
                {
                  icon: Brain,
                  title: "Decide with Confidence",
                  desc: "AI insights replace gut-feel with data. Know exactly what to order, how much, and when — every single time.",
                  color: "text-orange-400", bg: "bg-orange-50",
                },
              ].map(({ icon: Icon, title, desc, color, bg }) => (
                <div key={title} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
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
                to="/how-it-works"
                className="border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition"
              >
                See How It Works →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </MainLayout>
  );
}