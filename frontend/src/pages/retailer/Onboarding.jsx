import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, MapPin, Phone, ArrowRight, ArrowLeft, CheckCircle, Navigation } from "lucide-react";
import { apiFetch } from "../../services/auth";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  const [formData, setFormData] = useState({
    shop_name: "",
    shop_category: "Kirana",
    city: "",
    latitude: "",
    longitude: "",
    whatsapp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutoLocate = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((p) => ({
            ...p,
            latitude: pos.coords.latitude.toFixed(6),
            longitude: pos.coords.longitude.toFixed(6),
          }));
          setLocating(false);
        },
        (err) => {
          alert("Could not fetch location. Please ensure location permissions are granted.");
          setLocating(false);
        },
        { timeout: 7000 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLocating(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await apiFetch("http://127.0.0.1:8001/api/accounts/onboard/", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      localStorage.setItem("hasOnboarded", "true");
      navigate("/retailer/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isStep1Valid = formData.shop_name.trim().length > 2;
  const isStep2Valid = formData.city.trim().length > 2 && formData.latitude && formData.longitude;
  const isStep3Valid = formData.whatsapp.trim().length >= 10;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-100 blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-100 blur-3xl opacity-60" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="text-center mb-8">
          <div className="font-bold text-2xl text-gray-900 flex items-center justify-center gap-1.5 mb-6">
            <span className="text-orange-500">Kirana</span>
            <span className="text-orange-300">IQ</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Complete your profile</h2>
          <p className="mt-2 text-sm text-gray-500">
            Let's get your store set up so customers can find you.
          </p>
        </div>

        <div className="bg-white py-10 px-6 sm:px-10 shadow-xl shadow-orange-100/50 rounded-3xl border border-gray-100">
          
          {/* PROGRESS BAR */}
          <div className="mb-10 relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-orange-100">
              <div style={{ width: `${(step / 3) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 transition-all duration-500" />
            </div>
            <div className="flex justify-between text-xs font-semibold text-gray-400">
              <span className={step >= 1 ? "text-orange-500" : ""}>Basics</span>
              <span className={step >= 2 ? "text-orange-500" : ""}>Location</span>
              <span className={step >= 3 ? "text-orange-500" : ""}>Contact</span>
            </div>
          </div>

          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Shop Details</h3>
                  <p className="text-xs text-gray-500">What's the name of your store?</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Shop Name</label>
                  <input
                    type="text"
                    name="shop_name"
                    value={formData.shop_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                    placeholder="e.g. Sharma General Store"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                  <select
                    name="shop_category"
                    value={formData.shop_category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition bg-white"
                  >
                    <option>Kirana / Supermarket</option>
                    <option>Pharmacy / Chemist</option>
                    <option>Bakery / Sweets</option>
                    <option>Wholesale</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid}
                  className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Pin Location</h3>
                  <p className="text-xs text-gray-500">Help nearby customers find you.</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                    placeholder="e.g. Mumbai, Delhi"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Store Coordinates</label>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAutoLocate}
                      disabled={locating}
                      className="flex-1 flex items-center justify-center gap-2 bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 py-3 rounded-xl font-medium transition disabled:opacity-50 text-sm"
                    >
                      {locating ? "Locating..." : <><Navigation className="w-4 h-4" /> Auto-detect Location</>}
                    </button>
                  </div>
                  
                  {(formData.latitude && formData.longitude) && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-xl flex items-center gap-2 text-green-700 text-sm font-medium">
                      <CheckCircle className="w-4 h-4" /> Location captured successfully!
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-500 px-4 py-3 font-medium hover:text-gray-900 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!isStep2Valid}
                  className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONTACT */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Contact Details</h3>
                  <p className="text-xs text-gray-500">For important business updates.</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">WhatsApp Number</label>
                  <div className="flex bg-white rounded-xl border border-gray-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition overflow-hidden">
                    <span className="px-4 py-3 bg-gray-50 text-gray-500 font-medium border-r border-gray-200">+91</span>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 outline-none w-full"
                      placeholder="10-digit number"
                      maxLength="10"
                      autoFocus
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-400">We'll send low-stock alerts to this number.</p>
                </div>
              </div>

              <div className="mt-10 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-gray-500 px-4 py-3 font-medium hover:text-gray-900 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isStep3Valid || loading}
                  className="flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:shadow-none"
                >
                  {loading ? "Saving..." : "Finish Setup"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
