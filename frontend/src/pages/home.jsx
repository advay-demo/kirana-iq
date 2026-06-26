import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search, MapPin, TrendingUp, Sparkles, Brain,
  ArrowRight, CheckCircle, Star, Zap, Package,
  BarChart3, Clock, ChevronRight
} from "lucide-react";

import store1 from "../assets/images/store1.jpg";
import store2 from "../assets/images/store2.jpg";
import store3 from "../assets/images/store3.jpg";
import store4 from "../assets/images/store4.jpg";
import store5 from "../assets/images/store5.jpg";
import store6 from "../assets/images/store6.jpg";
import store7 from "../assets/images/store7.jpg";
import store8 from "../assets/images/store8.jpg";
import retailer from "../assets/images/retailer.jpg";
import customer from "../assets/images/customer.jpg";

/* ─── Flip placeholder words ─── */
const FLIP_WORDS = [
  "milk", "sugar", "rice", "bread", "atta",
  "dal", "cooking oil", "biscuits", "soap", "tea",
  "namkeen", "shampoo", "eggs", "butter", "maggi",
];

function FlipWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex(p => (p + 1) % FLIP_WORDS.length); setVisible(true); }, 280);
    }, 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className="text-orange-500 font-semibold"
      style={{
        display: "inline-block",
        transition: "opacity 0.25s ease, transform 0.28s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-10px)",
      }}
    >
      "{FLIP_WORDS[index]}"
    </span>
  );
}

/* ─── Intersection fade-up hook ─── */
function useFadeIn(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

const fade = (vis, extra = "") =>
  `transition-all duration-700 ${extra} ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`;

/* ─── Live stock card inside hero ─── */
function LiveStockCard() {
  const rows = [
    { name: "Amul Taza 500ml",  dist: "0.4 km", status: "In Stock",  price: 28 },
    { name: "Tata Salt 1kg",    dist: "0.7 km", status: "Low Stock", price: 22 },
    { name: "Parle-G 100g",     dist: "1.2 km", status: "In Stock",  price: 10 },
    { name: "Fortune Oil 1L",   dist: "1.8 km", status: "Out",       price: null },
  ];
  const cfg = {
    "In Stock":  { dot: "bg-green-400",  text: "text-green-700",  bg: "bg-green-50" },
    "Low Stock": { dot: "bg-amber-400",  text: "text-amber-700",  bg: "bg-amber-50" },
    "Out":       { dot: "bg-red-400",    text: "text-red-600",    bg: "bg-red-50" },
  };
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-5 w-80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-bold text-gray-900 text-sm">Live Availability</div>
          <div className="text-gray-400 text-xs mt-0.5">4 stores near you</div>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full border border-green-100">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> LIVE
        </span>
      </div>
      {rows.map((r) => (
        <div key={r.name} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
          <div>
            <div className="text-gray-800 text-xs font-medium">{r.name}</div>
            <div className="text-gray-400 text-[10px] flex items-center gap-0.5 mt-0.5">
              <MapPin className="w-2.5 h-2.5" /> {r.dist}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {r.price && <span className="text-gray-900 text-xs font-bold">₹{r.price}</span>}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${cfg[r.status].bg} ${cfg[r.status].text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg[r.status].dot}`} />
              {r.status}
            </span>
          </div>
        </div>
      ))}
      <div className="mt-3 text-[10px] text-gray-400 flex items-center gap-1">
        <Clock className="w-3 h-3" /> Updated just now
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSug, setShowSug] = useState(false);
  const searchRef = useRef(null);

  const [featRef,   featVis]   = useFadeIn();
  const [howRef,    howVis]    = useFadeIn();
  const [forRef,    forVis]    = useFadeIn();
  const [statsRef,  statsVis]  = useFadeIn();
  const [ctaRef,    ctaVis]    = useFadeIn();

  /* autocomplete */
  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return; }
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8001/api"}/inventory/suggest/?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSuggestions(data);
        setShowSug(true);
      } catch { setSuggestions([]); }
    }, 220);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const h = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowSug(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const doSearch = (q) => {
    const term = (q || query).trim();
    if (!term) return;
    setShowSug(false);
    navigate(`/products/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* background blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-100 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-amber-100 rounded-full blur-[100px] opacity-50" />
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-orange-50 rounded-full blur-[80px] opacity-40 -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* trust badge */}
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold px-4 py-2 rounded-full mb-8 animate-fade-in">
          <Zap className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
          AI-powered inventory intelligence for kirana stores
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight max-w-4xl">
          Find any product.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
            Anywhere. Instantly.
          </span>
        </h1>

        <p className="mt-6 text-gray-500 text-xl max-w-2xl leading-relaxed">
          Track availability, predict restocking, and discover smart alternatives —
          all powered by AI built for Indian retail.
        </p>

        {/* ── Search Bar ── */}
        <div ref={searchRef} className="relative mt-10 w-full max-w-2xl">
          <form
            onSubmit={(e) => { e.preventDefault(); doSearch(); }}
            className="flex items-center bg-white border-2 border-gray-200 hover:border-orange-300 focus-within:border-orange-400 rounded-2xl shadow-xl shadow-gray-100 overflow-hidden transition-all duration-200"
          >
            <Search className="w-5 h-5 text-gray-400 ml-5 flex-shrink-0" />

            {/* animated placeholder */}
            {query === "" && (
              <div className="absolute left-[52px] top-1/2 -translate-y-1/2 text-sm pointer-events-none flex items-center gap-1.5 text-gray-400">
                search <FlipWord />
              </div>
            )}

            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (e.target.value.length < 2) setShowSug(false); }}
              onFocus={() => suggestions.length > 0 && setShowSug(true)}
              placeholder=""
              className="flex-1 px-4 py-4 outline-none bg-transparent text-gray-800 text-sm"
            />

            <button
              type="submit"
              className="bg-orange-500 text-white px-7 py-4 font-semibold hover:bg-orange-600 transition text-sm flex items-center gap-2"
            >
              Search <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* suggestions */}
          {showSug && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onMouseDown={() => { setQuery(s); doSearch(s); }}
                  className="w-full text-left px-5 py-3.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-3 transition border-b border-gray-100 last:border-0"
                >
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* quick search chips */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {["Amul Butter", "Tata Salt", "Parle-G", "Maggi Noodles", "Fortune Oil"].map(chip => (
            <button
              key={chip}
              onClick={() => { setQuery(chip); doSearch(chip); }}
              className="text-xs text-gray-500 hover:text-orange-600 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 px-3.5 py-1.5 rounded-full transition"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* floating live card — desktop only */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 animate-float">
          <LiveStockCard />
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
        </div>
      </section>

      {/* ══ SOCIAL PROOF TICKER ═══════════════════════════════ */}
      <section className="py-5 bg-gray-50 border-y border-gray-200 overflow-hidden">
        <div className="flex gap-10 w-max animate-scroll">
          {[...Array(3)].flatMap(() => [
            "Real-time stock tracking",
            "AI-powered alternatives",
            "Demand forecasting",
            "Multi-store support",
            "Restocking alerts",
            "Live price comparison",
            "Trusted by 10,000+ retailers",
            "99.9% uptime",
          ]).map((t, i) => (
            <span key={i} className="flex items-center gap-2.5 text-sm text-gray-500 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ══ FEATURE PILLARS ═══════════════════════════════════ */}
      <section ref={featRef} className={`py-24 px-6 ${fade(featVis)}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase">What we do</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 max-w-2xl mx-auto">
              Three powerful tools. One intelligent platform.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                color: "text-orange-500", bg: "bg-orange-50", border: "hover:border-orange-200",
                title: "Real-time Availability",
                desc: "See live stock levels across all registered stores near you. No calls, no guesswork — just instant visibility.",
                link: "/features",
              },
              {
                icon: Sparkles,
                color: "text-amber-600", bg: "bg-amber-50", border: "hover:border-amber-200",
                title: "Smart Alternatives",
                desc: "When a product is out of stock, AI instantly surfaces the best substitutes from nearby stores.",
                link: "/features",
              },
              {
                icon: Brain,
                color: "text-orange-400", bg: "bg-orange-50", border: "hover:border-orange-200",
                title: "AI Restocking Predictions",
                desc: "Analyse demand trends and seasonal patterns to know exactly what to restock — before you run out.",
                link: "/features",
              },
            ].map(({ icon: Icon, color, bg, border, title, desc, link }) => (
              <Link
                key={title}
                to={link}
                className={`group bg-white border-2 border-gray-100 ${border} rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{desc}</p>
                <div className={`mt-5 flex items-center gap-1.5 text-sm font-semibold ${color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ROW ═════════════════════════════════════════ */}
      <section ref={statsRef} className={`py-20 px-6 bg-black text-white ${fade(statsVis)}`}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10,000+", label: "Retailers using KiranaIQ" },
            { number: "5M+",     label: "Products tracked daily" },
            { number: "92%",     label: "AI prediction accuracy" },
            { number: "3 hrs",   label: "Average time saved/day" },
          ].map(({ number, label }) => (
            <div key={label}>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                {number}
              </div>
              <div className="text-gray-400 text-sm mt-2">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════ */}
      <section ref={howRef} className={`py-24 px-6 ${fade(howVis)}`}>
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase">How it works</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Up and running in 3 steps.
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            No complex onboarding. Start finding smarter inventory insights in minutes.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8 relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200" />

            {[
              {
                num: "01", icon: Search,
                title: "Search a product",
                desc: "Type any product name — milk, sugar, rice, or any item in your inventory. Our engine starts scanning instantly.",
              },
              {
                num: "02", icon: BarChart3,
                title: "See live results",
                desc: "Get real-time stock levels, prices, and store distances all ranked and sorted for you automatically.",
              },
              {
                num: "03", icon: TrendingUp,
                title: "Act on AI insights",
                desc: "Get restock alerts, alternative suggestions, and demand forecasts tailored to your store's history.",
              },
            ].map(({ num, icon: Icon, title, desc }) => (
              <div key={num} className="flex flex-col items-center text-center relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-100 mb-6 z-10">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-orange-500 text-xs font-bold tracking-widest mb-2">{num}</div>
                <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xs">{desc}</p>
              </div>
            ))}
          </div>

          <Link
            to="/how-it-works"
            className="mt-14 inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all"
          >
            See the full walkthrough <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ══ STORE IMAGE MARQUEE ═══════════════════════════════ */}
      <section className="py-8 overflow-hidden">
        <p className="text-xs text-center tracking-widest text-gray-400 mb-6 uppercase">
          Trusted by retailers across India
        </p>
        <div className="overflow-hidden w-full">
          <div className="flex gap-5 w-max animate-scroll">
            {[store1,store2,store3,store4,store5,store6,store7,store8,
              store1,store2,store3,store4,store5,store6,store7,store8].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Indian kirana store"
                className="h-52 w-80 object-cover rounded-2xl flex-shrink-0 hover:scale-[1.02] transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ BUILT FOR BOTH ════════════════════════════════════ */}
      <section ref={forRef} className={`py-24 px-6 bg-gray-50 ${fade(forVis)}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase">Who it's for</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">
              Built for retailers and customers.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Retailer */}
            <div className="relative group overflow-hidden rounded-3xl">
              <img
                src={retailer}
                alt="Indian street market retailer"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">For Retailers</div>
                <h3 className="text-2xl font-bold text-white">Manage your inventory smarter</h3>
                <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                  Get AI restock alerts, track competitors, and never miss a sale due to empty shelves.
                </p>
                <div className="mt-4 space-y-1.5">
                  {["Real-time stock tracking", "AI restocking predictions", "Sales analytics"].map(f => (
                    <div key={f} className="flex items-center gap-2 text-gray-200 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <Link
                  to="/login?tab=signup"
                  className="mt-5 inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition"
                >
                  Join as Retailer <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Customer */}
            <div className="relative group overflow-hidden rounded-3xl">
              <img
                src={customer}
                alt="Customer shopping with cart"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">For Customers</div>
                <h3 className="text-2xl font-bold text-white">Find what you need, instantly</h3>
                <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                  Search products, compare prices, and find alternatives — all from your phone.
                </p>
                <div className="mt-4 space-y-1.5">
                  {["Live product availability", "Price comparison", "Smart alternatives nearby"].map(f => (
                    <div key={f} className="flex items-center gap-2 text-gray-200 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <Link
                  to="/login?tab=signup"
                  className="mt-5 inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-orange-50 transition"
                >
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase">Testimonials</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3">What retailers say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I used to spend 2 hours every morning checking stock manually. KiranaIQ cut that to 10 minutes.",
                name: "Ramesh Sharma",
                role: "Sharma General Store, Delhi",
              },
              {
                quote: "The AI alternatives feature is a lifesaver. Customers never leave empty-handed anymore.",
                name: "Priya Nair",
                role: "Nair Provisions, Mumbai",
              },
              {
                quote: "Restocking predictions are surprisingly accurate. I haven't had a stockout in 3 months.",
                name: "Arun Patel",
                role: "Patel Retail, Ahmedabad",
              },
            ].map((t) => (
              <div key={t.name} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-orange-200 hover:shadow-md transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <section ref={ctaRef} className={`py-28 px-6 bg-gradient-to-br from-orange-500 to-amber-400 text-white text-center relative overflow-hidden ${fade(ctaVis)}`}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Start making smarter<br />retail decisions today.
          </h2>
          <p className="mt-4 text-orange-100 text-lg max-w-xl mx-auto">
            Join KiranaIQ and take control of your inventory, insights, and availability tracking — free forever to start.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login?tab=signup"
              className="bg-white text-orange-600 font-semibold px-8 py-4 rounded-xl hover:bg-orange-50 transition shadow-lg text-sm"
            >
              Get Started as Customer
            </Link>
            <Link
              to="/login?tab=signup"
              className="border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition text-sm"
            >
              Join as Retailer →
            </Link>
          </div>
          <p className="mt-6 text-orange-200 text-xs">No credit card required · Free forever to start</p>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer className="border-t border-gray-200 px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight max-w-md">
              We simplify <span className="text-orange-500">retail decisions</span>{" "}
              so businesses can grow smarter.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-700">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><Link to="/features" className="hover:text-black">Features</Link></li>
                <li><Link to="/how-it-works" className="hover:text-black">How it Works</Link></li>
                <li><Link to="/pricing" className="hover:text-black">Pricing</Link></li>
              </ul>
            </div>
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
        <div className="mt-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <div className="font-semibold text-lg">
            <span className="text-orange-500">Kirana</span>
            <span className="text-orange-300 ml-1">IQ</span>
          </div>
          <div className="mt-3 md:mt-0 flex items-center gap-6">
            <span>© {new Date().getFullYear()} KiranaIQ</span>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Connect:</span>
              <a href="https://linkedin.com/in/advaybhagat" target="_blank" rel="noreferrer" className="hover:text-black">LinkedIn</a>
              <a href="https://github.com/advay-demo" target="_blank" rel="noreferrer" className="hover:text-black">GitHub</a>
              <a href="mailto:hello@kiranaiq.com" className="hover:text-black">Mail</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}