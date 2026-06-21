import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Check,
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import {
  getOrders,
  updateOrder,
} from "../../services/auth";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {
    try {
      await updateOrder(orderId, {
        status: newStatus,
      });

      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to update order");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-600";
      case "accepted":
        return "bg-blue-100 text-blue-600";
      case "ready":
        return "bg-green-100 text-green-600";
      case "completed":
        return "bg-gray-100 text-gray-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <RetailerLayout>
        <div className="text-2xl font-medium">
          Loading orders...
        </div>
      </RetailerLayout>
    );
  }

  return (
    <RetailerLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Customer Orders
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Manage incoming orders from customers.
          </p>
        </div>
      </div>

      {/* EMPTY */}
      {orders.length === 0 ? (
        <div className="mt-12 bg-white border border-gray-200 rounded-3xl p-16 shadow-sm text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-100 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-orange-500" />
          </div>

          <h2 className="text-3xl font-semibold mt-8">
            No customer orders yet
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            When customers place orders, they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 mt-10">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 justify-between"
            >
              <div>
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

              <div className="flex flex-col gap-3 min-w-[200px]">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Update Status</p>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl font-bold outline-none border-2 appearance-none cursor-pointer
                    ${order.status === 'pending' ? 'border-orange-200 bg-orange-50 text-orange-700' : 
                      order.status === 'accepted' ? 'border-blue-200 bg-blue-50 text-blue-700' :
                      order.status === 'ready' ? 'border-green-200 bg-green-50 text-green-700' :
                      'border-gray-200 bg-gray-50 text-gray-700'
                    }`}
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="ready">Ready for Pickup</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                {order.status === 'pending' && (
                  <button onClick={() => handleStatusChange(order.id, 'accepted')} className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition shadow-sm mt-2">
                    Accept Order
                  </button>
                )}
                {order.status === 'accepted' && (
                  <button onClick={() => handleStatusChange(order.id, 'ready')} className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition shadow-sm mt-2">
                    Mark Ready
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </RetailerLayout>
  );
}

export default Orders;