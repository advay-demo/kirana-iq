const API_BASE = "http://127.0.0.1:8000/api/accounts";


export async function retailerSignup(userData) {
  const response = await fetch(`${API_BASE}/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Signup failed");
  }

  return data;
}


export async function loginUser(userData) {
  const response = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data;
}
export async function getProducts() {
  const token = localStorage.getItem("accessToken");

  const response = await fetch("http://127.0.0.1:8000/api/inventory/products/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return data;
}
export async function getDashboardStats() {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    "http://127.0.0.1:8000/api/inventory/dashboard/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return data;
}


export async function createProduct(productData) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch("http://127.0.0.1:8000/api/inventory/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return data;
}
export async function getProductDetail(productId) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `http://127.0.0.1:8000/api/inventory/products/${productId}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return data;
}
export async function updateProduct(productId, productData) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `http://127.0.0.1:8000/api/inventory/products/${productId}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return data;
}
export async function deleteProduct(productId) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `http://127.0.0.1:8000/api/inventory/products/${productId}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return true;
}
export async function getNotifications() {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    "http://127.0.0.1:8000/api/inventory/notifications/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return data;
}
export async function getAnalytics() {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    "http://127.0.0.1:8000/api/inventory/analytics/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return data;
}
export async function getAIInsights() {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    "http://127.0.0.1:8000/api/inventory/ai-insights/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch AI insights");
  }

  return data;
}
export async function getOrders() {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    "http://127.0.0.1:8000/api/orders/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return data;
}


export async function createOrder(orderData) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    "http://127.0.0.1:8000/api/orders/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return data;
}
export async function updateOrder(orderId, updates) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    "http://127.0.0.1:8000/api/orders/",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        order_id: orderId,
        ...updates,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update order");
  }

  return data;
}