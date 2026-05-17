import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Plus,
  X,
} from "lucide-react";
import RetailerLayout from "../../layouts/RetailerLayout";
import {
  getOrders,
  createOrder,
  getProducts,
  updateOrder,
} from "../../services/auth";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    supplier_name: "",
    status: "pending",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersData, productsData] =
        await Promise.all([
          getOrders(),
          getProducts(),
        ]);

      setOrders(ordersData);
      setProducts(productsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();

    try {
      await createOrder({
        ...formData,
        product: Number(formData.product),
        quantity: Number(formData.quantity),
      });

      setShowModal(false);

      setFormData({
        product: "",
        quantity: "",
        supplier_name: "",
        status: "pending",
      });

      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to create order");
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

      case "ordered":
        return "bg-blue-100 text-blue-600";

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
            Orders
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Manage supplier purchase orders.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-6 py-4 rounded-2xl flex items-center gap-2 hover:bg-orange-600 transition"
        >
          <Plus className="w-5 h-5" />
          Create Order
        </button>
      </div>

      {/* EMPTY */}
      {orders.length === 0 ? (
        <div className="mt-12 bg-white border border-gray-200 rounded-3xl p-16 shadow-sm text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-100 flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-orange-500" />
          </div>

          <h2 className="text-3xl font-semibold mt-8">
            No supplier orders yet
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Create your first restock order.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-3xl mt-10 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-gray-400">
              <tr>
                <th className="px-8 py-6 font-medium">
                  Product
                </th>

                <th className="px-8 py-6 font-medium">
                  Quantity
                </th>

                <th className="px-8 py-6 font-medium">
                  Supplier
                </th>

                <th className="px-8 py-6 font-medium">
                  Status
                </th>

                <th className="px-8 py-6 font-medium">
                  Created
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-gray-100"
                >
                  <td className="px-8 py-6 font-medium">
                    {order.product_name}
                  </td>

                  <td className="px-8 py-6">
                    {order.quantity}
                  </td>

                  <td className="px-8 py-6">
                    {order.supplier_name}
                  </td>

                  <td className="px-8 py-6">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value
                        )
                      }
                      className={`px-4 py-2 rounded-full text-sm font-medium border-none outline-none ${getStatusStyle(order.status)}`}
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="ordered">
                        Ordered
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>

                  <td className="px-8 py-6 text-gray-500">
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[650px] rounded-3xl p-8 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <X />
            </button>

            <h2 className="text-3xl font-semibold mb-8">
              Create Supplier Order
            </h2>

            <form
              onSubmit={handleCreateOrder}
              className="grid gap-5"
            >
              <select
                value={formData.product}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    product: e.target.value,
                  })
                }
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              >
                <option value="">
                  Select Product
                </option>

                {products.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: e.target.value,
                  })
                }
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Supplier Name"
                value={formData.supplier_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supplier_name: e.target.value,
                  })
                }
                required
                className="border border-gray-200 rounded-2xl px-4 py-4 outline-none"
              />

              <button
                type="submit"
                className="bg-orange-500 text-white py-4 rounded-2xl font-medium hover:bg-orange-600 transition"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </RetailerLayout>
  );
}

export default Orders;