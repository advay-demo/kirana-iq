import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Truck,
  Check
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import {
  getOrders,
  updateOrder,
  getSupplierOrders,
  updateSupplierOrderStatus
} from "../../services/auth";

function Orders() {
  const [activeTab, setActiveTab] = useState("customer");
  const [customerOrders, setCustomerOrders] = useState([]);
  const [supplierOrders, setSupplierOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [cOrders, sOrders] = await Promise.all([
        getOrders(),
        getSupplierOrders()
      ]);
      setCustomerOrders(cOrders);
      setSupplierOrders(sOrders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to update order");
    }
  };

  const handleSupplierStatusChange = async (orderId, newStatus) => {
    try {
      await updateSupplierOrderStatus(orderId, newStatus);
      if (newStatus === "delivered") {
        alert("Order delivered! Inventory has been automatically updated.");
      }
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to update supplier order");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-600";
      case "accepted":
      case "shipped":
        return "bg-blue-100 text-blue-600";
      case "ready":
        return "bg-indigo-100 text-indigo-600";
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <RetailerLayout>
        <div className="text-2xl font-medium">Loading orders...</div>
      </RetailerLayout>
    );
  }

  return (
    <RetailerLayout>
      {/* HEADER WITH TABS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Order Management</h1>
          <p className="text-gray-500 mt-2 text-lg">Manage incoming and outbound orders.</p>
        </div>

        <div className="flex bg-gray-200/50 p-1 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("customer")}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeTab === "customer" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Customer Orders
          </button>
          <button
            onClick={() => setActiveTab("supplier")}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              activeTab === "supplier" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Purchase Orders (B2B)
          </button>
        </div>
      </div>

      {activeTab === "customer" ? (
        /* ── CUSTOMER ORDERS ── */
        customerOrders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-16 shadow-sm text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-100 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-orange-500" />
            </div>
            <h2 className="text-3xl font-semibold mt-8">No customer orders yet</h2>
            <p className="text-gray-500 mt-4 text-lg">When customers place orders, they will appear here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {customerOrders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">Order #{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-500 font-medium mb-6">
                    {order.customer_name} • {order.customer_phone} • {new Date(order.created_at).toLocaleString()}
                  </p>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4">Items Ordered:</h4>
                    <ul className="space-y-3">
                      {order.items.map(item => (
                        <li key={item.id} className="flex justify-between items-center text-gray-700">
                          <span><span className="font-bold text-gray-900">{item.quantity}x</span> {item.product_name}</span>
                          <span className="font-medium">₹{item.price_at_time * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-gray-200 my-4"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-orange-600">₹{order.total_amount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[240px]">
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Update Status</p>
                  <select
                    value={order.status}
                    onChange={(e) => handleCustomerStatusChange(order.id, e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl font-bold outline-none border-2 appearance-none cursor-pointer ${getStatusStyle(order.status).replace('text-', 'border-').replace('bg-', 'bg-opacity-50 ')}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="ready">Ready for Pickup</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  
                  {order.status === 'pending' && (
                    <button onClick={() => handleCustomerStatusChange(order.id, 'accepted')} className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition shadow-sm mt-2">
                      Accept Order
                    </button>
                  )}
                  {order.status === 'accepted' && (
                    <button onClick={() => handleCustomerStatusChange(order.id, 'ready')} className="w-full bg-indigo-500 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition shadow-sm mt-2">
                      Mark Ready
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* ── SUPPLIER ORDERS (B2B) ── */
        supplierOrders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-16 shadow-sm text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 flex items-center justify-center">
              <Truck className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-3xl font-semibold mt-8">No purchase orders yet</h2>
            <p className="text-gray-500 mt-4 text-lg">Order inventory from Distributors to see them here.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {supplierOrders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">PO #{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-500 font-medium mb-6">
                    Distributor: <span className="text-gray-900 font-bold">{order.distributor_name}</span> • {new Date(order.created_at).toLocaleString()}
                  </p>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4">Items Ordered:</h4>
                    <ul className="space-y-3">
                      {order.items.map(item => (
                        <li key={item.id} className="flex justify-between items-center text-gray-700">
                          <span>
                            <span className="font-bold text-gray-900">{item.quantity}x</span> {item.product_name}
                            {item.brand && <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-600">{item.brand}</span>}
                          </span>
                          <span className="font-medium">₹{item.unit_price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-gray-200 my-4"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total Purchase</span>
                      <span className="text-xl font-bold text-blue-600">₹{order.total_amount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[240px]">
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Update Status</p>
                  <select
                    value={order.status}
                    onChange={(e) => handleSupplierStatusChange(order.id, e.target.value)}
                    disabled={order.status === 'delivered'}
                    className={`w-full px-4 py-3 rounded-xl font-bold outline-none border-2 appearance-none cursor-pointer ${getStatusStyle(order.status).replace('text-', 'border-').replace('bg-', 'bg-opacity-50 ')} ${order.status === 'delivered' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <button onClick={() => handleSupplierStatusChange(order.id, 'delivered')} className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition shadow-sm mt-2 flex items-center justify-center gap-2">
                      <Check className="w-5 h-5"/> Mark Delivered
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <p className="text-sm text-green-600 font-medium text-center mt-2 bg-green-50 p-2 rounded-xl border border-green-100">
                      Inventory has been updated!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </RetailerLayout>
  );
}

export default Orders;