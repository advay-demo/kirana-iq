import React, { useEffect, useState } from "react";
import {
  Brain,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import { getAIInsights,
  createOrder,
 } from "../../services/auth";

function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] =
  useState(false);

const [selectedProduct, setSelectedProduct] =
  useState(null);

const [orderData, setOrderData] = useState({
  quantity: "",
  supplier_name: "",
});
const handleQuickReorder = (product) => {
  setSelectedProduct(product);

  setOrderData({
    quantity: product.reorder_level * 2,
    supplier_name: product.supplier || "",
  });

  setShowOrderModal(true);
};
const handleCreateQuickOrder = async (e) => {
  e.preventDefault();

  try {
    await createOrder({
      product: selectedProduct.id,
      quantity: Number(orderData.quantity),
      supplier_name: orderData.supplier_name,
      status: "pending",
    });

    setShowOrderModal(false);
    alert("Supplier order created");
  } catch (error) {
    console.error(error);
    alert("Failed to create order");
  }
};

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const data = await getAIInsights();
      setInsights(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getInsightConfig = (type) => {
    switch (type) {
      case "critical":
        return {
          icon: AlertTriangle,
          bg: "bg-red-50",
          border: "border-red-200",
          iconBg: "bg-red-100",
          iconColor: "text-red-500",
          badge: "bg-red-200 text-red-700",
        };

      case "warning":
        return {
          icon: AlertTriangle,
          bg: "bg-orange-50",
          border: "border-orange-200",
          iconBg: "bg-orange-100",
          iconColor: "text-orange-500",
          badge: "bg-orange-200 text-orange-700",
        };

      case "overstock":
        return {
          icon: TrendingUp,
          bg: "bg-blue-50",
          border: "border-blue-200",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-500",
          badge: "bg-blue-200 text-blue-700",
        };

      default:
        return {
          icon: ShieldCheck,
          bg: "bg-green-50",
          border: "border-green-200",
          iconBg: "bg-green-100",
          iconColor: "text-green-500",
          badge: "bg-green-200 text-green-700",
        };
    }
  };

  if (loading) {
    return (
      <RetailerLayout>
        <div className="text-2xl font-medium">
          Loading AI insights...
        </div>
      </RetailerLayout>
    );
  }

  return (
    <RetailerLayout>
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
            <Brain className="w-7 h-7 text-orange-500" />
          </div>

          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              AI Insights
            </h1>

            <p className="text-gray-500 mt-1 text-lg">
              Smart recommendations powered by your inventory intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="mt-10">
        <div className="bg-black rounded-3xl p-10 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-orange-400" />

            <p className="text-orange-400 uppercase tracking-wide text-sm">
              AI Recommendation Engine
            </p>
          </div>

          <h2 className="text-5xl font-semibold leading-tight max-w-3xl">
            Optimize stock decisions before issues impact your store.
          </h2>

          <p className="text-gray-400 mt-6 text-lg max-w-2xl">
            KiranaIQ analyzes inventory patterns and flags restocking risks,
            inefficiencies, and optimization opportunities.
          </p>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="mt-10 flex flex-col gap-6">
        {insights.map((insight, index) => {
          const config = getInsightConfig(insight.type);
          const Icon = config.icon;

          return (
            <div
              key={index}
              className={`${config.bg} ${config.border} border rounded-3xl p-7 shadow-sm flex items-start gap-5`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${config.iconBg}`}
              >
                <Icon
                  className={`w-8 h-8 ${config.iconColor}`}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 flex-wrap">
                  <h3 className="text-2xl font-semibold">
                    {insight.title}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${config.badge}`}
                  >
                    {insight.type}
                  </span>
                </div>

                <p className="text-gray-600 mt-3 text-lg leading-relaxed">
                  {insight.message}
                </p>
                {(insight.type === "critical" ||
                  insight.type === "warning") && (
                  <button
                    onClick={() => handleQuickReorder(insight.product)}
                    className="mt-5 bg-orange-500 text-white px-5 py-3 rounded-2xl font-medium hover:bg-orange-600 transition"
                  >
                    Quick Reorder
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {showOrderModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[600px] rounded-3xl p-8 shadow-2xl">
      <h2 className="text-3xl font-semibold mb-8">
        Quick Supplier Order
      </h2>

      <form
        onSubmit={handleCreateQuickOrder}
        className="grid gap-5"
      >
        <input
          type="text"
          value={selectedProduct?.name || ""}
          disabled
          className="border border-gray-200 rounded-2xl px-4 py-4 bg-gray-50"
        />

        <input
          type="number"
          value={orderData.quantity}
          onChange={(e) =>
            setOrderData({
              ...orderData,
              quantity: e.target.value,
            })
          }
          className="border border-gray-200 rounded-2xl px-4 py-4"
        />

        <input
          type="text"
          value={orderData.supplier_name}
          onChange={(e) =>
            setOrderData({
              ...orderData,
              supplier_name: e.target.value,
            })
          }
          placeholder="Supplier name"
          className="border border-gray-200 rounded-2xl px-4 py-4"
        />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setShowOrderModal(false)}
            className="flex-1 border border-gray-200 py-4 rounded-2xl"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 bg-orange-500 text-white py-4 rounded-2xl hover:bg-orange-600"
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </RetailerLayout>
  );
}

export default AIInsights;