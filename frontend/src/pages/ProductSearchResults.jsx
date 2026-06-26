import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { MapPin, CheckCircle, AlertTriangle, XCircle, Sparkles, ArrowLeft, Search, MessageCircle, ShoppingBag, Plus, Minus } from "lucide-react";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function MapRecenter({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng]);
    }
  }, [lat, lng, map]);
  return null;
}

function ProductSearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";

  const [data, setData] = useState({ stores: [], alternatives: [], db_products: [] });
  const [loading, setLoading] = useState(true);
  const [locationState, setLocationState] = useState({ state: 'pending', lat: null, lng: null });
  const [searchInput, setSearchInput] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Cart state
  const [cart, setCart] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ name: '', phone: '' });

  // Fetch Location
  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setLocationState(p => ({ ...p, state: 'pending' }));

    const fallbackToIP = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.latitude && data.longitude) {
          setLocationState({ state: 'success', lat: data.latitude, lng: data.longitude });
        } else {
          setLocationState({ state: 'failed', lat: null, lng: null });
        }
      } catch (err) {
        console.warn("IP geolocation fallback failed:", err);
        setLocationState({ state: 'failed', lat: null, lng: null });
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationState({ state: 'success', lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.warn("Geolocation blocked/failed, trying IP fallback:", err);
          fallbackToIP();
        },
        { timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      fallbackToIP();
    }
  }, [query]);

  // Fetch results once location is resolved (success or failed)
  useEffect(() => {
    if (!query || locationState.state === 'pending') return;
    
    let url = `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8001/api"}/inventory/search/?q=${encodeURIComponent(query)}`;
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
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8001/api"}/inventory/suggest/?q=${encodeURIComponent(searchInput)}`);
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

  const defaultLat = locationState.lat || 23.2599;
  const defaultLng = locationState.lng || 77.4126;

  // Cart Functions
  const updateCart = (product, delta) => {
    setCart(prev => {
      const currentQty = prev[product.id]?.quantity || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        const newCart = { ...prev };
        delete newCart[product.id];
        return newCart;
      }
      return { ...prev, [product.id]: { ...product, quantity: newQty } };
    });
  };

  const cartTotalQty = Object.values(cart).reduce((a, b) => a + b.quantity, 0);
  const cartTotalPrice = Object.values(cart).reduce((a, b) => a + (b.price * b.quantity), 0);
  
  const submitOrder = async () => {
    if (!checkoutForm.name || !checkoutForm.phone) return alert("Please enter name and phone");
    
    // Group by retailer (assuming 1 retailer checkout for simplicity)
    const items = Object.values(cart);
    const retailer_id = items[0].retailer_id;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8001/api"}/inventory/orders/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          retailer_id,
          customer_name: checkoutForm.name,
          customer_phone: checkoutForm.phone,
          items: items.map(i => ({ product_id: i.id, quantity: i.quantity }))
        })
      });
      if (res.ok) {
        alert("Order Placed Successfully!");
        setCart({});
        setShowCheckout(false);
      } else {
        const err = await res.json();
        alert("Error: " + (err.error || "Failed to place order"));
      }
    } catch (e) {
      alert("Network error");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-10 relative">

        {/* Floating Cart Button */}
        {cartTotalQty > 0 && (
          <button 
            onClick={() => setShowCheckout(true)}
            className="fixed bottom-8 right-8 bg-orange-600 text-white p-4 rounded-full shadow-2xl hover:bg-orange-700 transition z-50 flex items-center gap-2 animate-bounce"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="font-bold text-lg">{cartTotalQty}</span>
          </button>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full m-4 shadow-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Checkout Pickup</h2>
                <button onClick={() => setShowCheckout(false)}><XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600"/></button>
              </div>
              <div className="mb-6 max-h-60 overflow-y-auto pr-2">
                {Object.values(cart).map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.store_name}</div>
                    </div>
                    <div className="font-medium text-gray-900">
                      {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xl font-bold text-right mb-6 text-orange-600">Total: ₹{cartTotalPrice}</div>
              <div className="space-y-4 mb-8">
                <input 
                  type="text" placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  value={checkoutForm.name} onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})}
                />
                <input 
                  type="tel" placeholder="Phone Number" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  value={checkoutForm.phone} onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                />
              </div>
              <button onClick={submitOrder} className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg">
                Confirm Order
              </button>
            </div>
          </div>
        )}

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
            {/* ── OFFICIAL KIRANAIQ PARTNERS (REAL DB PRODUCTS) ── */}
            {data.db_products && data.db_products.length > 0 && (
              <section className="mb-14">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Official Partners <span className="text-sm font-normal text-gray-500">(Order instantly)</span></h2>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {data.db_products.map((rp, i) => {
                    const qty = cart[rp.id]?.quantity || 0;
                    return (
                      <div key={`rp-${i}`} className="bg-white border-2 border-green-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900">{rp.store_name}</h3>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">Verified</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-4">{rp.name}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gray-900">₹{rp.price}</span>
                          {qty === 0 ? (
                            <button onClick={() => updateCart(rp, 1)} className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold hover:bg-green-600 transition">Add to Cart</button>
                          ) : (
                            <div className="flex items-center gap-3 bg-green-50 px-2 py-1.5 rounded-xl border border-green-200">
                              <button onClick={() => updateCart(rp, -1)} className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-green-600 hover:bg-green-50"><Minus className="w-4 h-4"/></button>
                              <span className="font-bold text-green-700 w-4 text-center">{qty}</span>
                              <button onClick={() => updateCart(rp, 1)} className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-green-600 hover:bg-green-50" disabled={qty >= rp.stock}><Plus className="w-4 h-4"/></button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* ── NEARBY STORES & MAP (MOCKS) ── */}
            <section className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Nearby Map Discovery
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
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* STORE LIST */}
                  <div className="lg:w-1/2 flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
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

                          {/* Price + Action */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {store.price ? (
                                <span className="text-2xl font-bold text-gray-900">₹{store.price}</span>
                              ) : (
                                <span className="text-gray-400 text-sm italic">Unavailable</span>
                              )}
                              <Icon className={`w-5 h-5 ${cfg.color} ml-2`} />
                            </div>
                            <a
                              href={`https://wa.me/?text=Hi%20${encodeURIComponent(store.store_name)},%20do%20you%20have%20${encodeURIComponent(query)}%20in%20stock?%20I%20saw%20it%20on%20KiranaIQ.`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white text-sm font-medium rounded-lg hover:bg-[#20bd5a] transition"
                            >
                              <MessageCircle className="w-4 h-4" /> Message
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* MAP CONTAINER */}
                  <div className="lg:w-1/2 h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-sm border border-gray-200 relative z-0">
                    <MapContainer center={[defaultLat, defaultLng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                      <MapRecenter lat={defaultLat} lng={defaultLng} />
                      <TileLayer 
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                      />
                      {/* User Location Marker */}
                      {locationState.lat && locationState.lng && (
                        <Marker position={[locationState.lat, locationState.lng]} opacity={0.6}>
                          <Popup>You are here</Popup>
                        </Marker>
                      )}
                      {/* Real Store DB Markers */}
                      {data.db_products && data.db_products.map((s, i) => s.lat && s.lng ? (
                        <Marker key={`rp-map-${i}`} position={[s.lat, s.lng]}>
                          <Popup>
                            <div className="font-bold text-green-600">✅ {s.store_name}</div>
                            <div className="text-sm">{s.name} - ₹{s.price}</div>
                          </Popup>
                        </Marker>
                      ) : null)}
                      {/* Mock Store Markers */}
                      {data.stores.map((s, i) => s.lat && s.lng ? (
                        <Marker key={i} position={[s.lat, s.lng]}>
                          <Popup>
                            <div className="font-semibold">{s.store_name}</div>
                            <div className="text-sm mt-1">{s.status} - {s.price ? `₹${s.price}` : 'Price unknown'}</div>
                            <a href={`https://wa.me/?text=Hi%20${encodeURIComponent(s.store_name)},%20do%20you%20have%20${encodeURIComponent(query)}%20in%20stock?`} target="_blank" rel="noreferrer" className="text-xs text-green-600 hover:underline mt-1 block">WhatsApp Store</a>
                          </Popup>
                        </Marker>
                      ) : null)}
                    </MapContainer>
                  </div>
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