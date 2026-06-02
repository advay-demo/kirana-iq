import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { MapPin, CheckCircle, AlertTriangle, XCircle, Sparkles, ArrowLeft, Search } from "lucide-react";

function ProductSearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";

  const [data, setData] = useState({ stores: [], alternatives: [] });
  const [loading, setLoading] = useState(true);
  const [locationState, setLocationState] = useState({ state: 'pending', lat: null, lng: null });
  const [searchInput, setSearchInput] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch Location
  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setLocationState(p => ({ ...p, state: 'pending' }));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationState({ state: 'success', lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.warn("Geolocation blocked/failed:", err);
          setLocationState({ state: 'failed', lat: null, lng: null });
        },
        { timeout: 5000 }
      );
    } else {
      setLocationState({ state: 'failed', lat: null, lng: null });
    }
  }, [query]);

  // Fetch results once location is resolved (success or failed)
  useEffect(() => {
    if (!query || locationState.state === 'pending') return;
    
    let url = `http://127.0.0.1:8001/api/inventory/search/?q=${encodeURIComponent(query)}`;
    if (locationState.lat && locationState.lng) {
      url += `&lat=${locationState.lat}&lng=${locationState.lng}`;
    }

    fetch(url)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [query, locationState]);

  // Autocomplete
  useEffect(() => {
    if (searchInput.length < 2) { setSuggestions([]); return; }
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8001/api/inventory/suggest/?q=${encodeURIComponent(searchInput)}`);
        setSuggestions(await res.json());
        setShowSuggestions(true);
      } catch { setSuggestions([]); }
    }, 220);
    return () => clearTimeout(t);
  }, [searchInput]);

  const doSearch = (q) => {
    const term = (q || searchInput).trim();
    if (!term) return;
    setShowSuggestions(false);
    navigate(`/products/search?q=${encodeURIComponent(term)}`);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "In Stock":    return { icon: CheckCircle,   color: "text-green-600",  bg: "bg-green-50",  badge: "bg-green-100 text-green-700",  dot: "bg-green-500" };
      case "Low Stock":   return { icon: AlertTriangle, color: "text-amber-600",  bg: "bg-amber-50",  badge: "bg-amber-100 text-amber-700",   dot: "bg-amber-400" };
      default:            return { icon: XCircle,       color: "text-red-500",    bg: "bg-red-50",    badge: "bg-red-100 text-red-600",       dot: "bg-red-400"   };
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* ── BACK + SEARCH BAR ── */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {/* Inline search re-do */}
          <div className="relative flex-1 max-w-xl">
            <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <Search className="w-4 h-4 text-gray-400 ml-4 flex-shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => { setSearchInput(e.target.value); if (e.target.value.length < 2) setShowSuggestions(false); }}
                onKeyDown={(e) => e.key === "Enter" && doSearch()}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="flex-1 px-3 py-3 text-sm text-gray-800 outline-none"
              />
              <button
                onClick={() => doSearch()}
                className="bg-orange-500 text-white px-5 py-3 text-sm font-medium hover:bg-orange-600 transition"
              >
                Search
              </button>
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onMouseDown={() => { setSearchInput(s); doSearch(s); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2.5 transition border-b border-gray-100 last:border-0"
                  >
                    <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── HEADING ── */}
        <div className="mb-10">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Search Results</p>
          <h1 className="text-4xl font-bold text-gray-900">
            Availability for <span className="text-orange-500">"{query}"</span>
          </h1>
        </div>

        {loading ? (
          /* ── SKELETON ── */
          <div className="grid md:grid-cols-3 gap-5">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-2xl border border-gray-100 p-6 animate-pulse bg-gray-50">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-6" />
                <div className="h-6 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* ── NEARBY STORES ── */}
            <section className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Nearby Stores
                </h2>
                <span className="text-sm text-gray-400">
                  {data.stores.length} store{data.stores.length !== 1 ? "s" : ""} found
                </span>
              </div>

              {data.stores.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <div className="text-4xl mb-3">🏪</div>
                  <p className="text-gray-500 font-medium">No nearby stores carry this product yet.</p>
                  <p className="text-gray-400 text-sm mt-1">Check the alternatives below.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {data.stores.map((store, i) => {
                    const cfg = getStatusConfig(store.status);
                    const Icon = cfg.icon;
                    return (
                      <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition group">
                        {/* Store name + distance */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition">
                              {store.store_name}
                            </h3>
                            <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                              <MapPin className="w-3 h-3" />
                              {store.distance} away
                            </div>
                          </div>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.badge} flex items-center gap-1`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {store.status}
                          </span>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-3" />

                        {/* Price + icon */}
                        <div className="flex items-center justify-between">
                          {store.price ? (
                            <span className="text-2xl font-bold text-gray-900">₹{store.price}</span>
                          ) : (
                            <span className="text-gray-400 text-sm italic">Unavailable</span>
                          )}
                          <Icon className={`w-5 h-5 ${cfg.color}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* ── SMART ALTERNATIVES ── */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900">Smart Alternatives</h2>
                <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-0.5 rounded-full">AI Powered</span>
              </div>

              {data.alternatives.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-400 text-sm">No alternatives found for this product.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {data.alternatives.map((alt, i) => {
                    const cfg = getStatusConfig(alt.status);
                    return (
                      <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-orange-200 transition cursor-pointer group"
                        onClick={() => doSearch(alt.name)}
                      >
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition text-sm leading-tight mb-2">
                          {alt.name}
                        </h3>

                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{alt.nearest_store}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge} flex items-center gap-1`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {alt.distance}
                          </span>
                          <span className="text-sm font-bold text-gray-800">₹{alt.price}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default ProductSearchResults;