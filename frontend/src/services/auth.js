const BASE = "http://127.0.0.1:8001/api";

// ── SMART FETCH (using Clerk JWT) ─────────
export async function apiFetch(url, options = {}) {
  let token = null;
  if (window.Clerk && window.Clerk.session) {
    token = await window.Clerk.session.getToken();
  }

  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  return res;
}

// ── AUTH ──────────────────────────────────────────────────────────
export async function fetchUserProfile() {
  const res = await apiFetch(`${BASE}/accounts/me/`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
  return data;
}

// ── PRODUCTS ──────────────────────────────────────────────────────
export async function getProducts() {
  const res = await apiFetch(`${BASE}/inventory/products/`);
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch products");
  return data;
}

export async function createProduct(productData) {
  const res = await apiFetch(`${BASE}/inventory/products/`, {
    method: "POST",
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to create product");
  return data;
}

export async function getProductDetail(productId) {
  const res = await apiFetch(`${BASE}/inventory/products/${productId}/`);
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch product");
  return data;
}

export async function updateProduct(productId, productData) {
  const res = await apiFetch(`${BASE}/inventory/products/${productId}/`, {
    method: "PATCH",
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to update product");
  return data;
}

export async function deleteProduct(productId) {
  const res = await apiFetch(`${BASE}/inventory/products/${productId}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return true;
}

// ── DASHBOARD ─────────────────────────────────────────────────────
export async function getDashboardStats() {
  const res = await apiFetch(`${BASE}/inventory/dashboard/`);
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch dashboard stats");
  return data;
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────
export async function getNotifications() {
  const res = await apiFetch(`${BASE}/inventory/notifications/`);
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return data;
}

// ── ANALYTICS ─────────────────────────────────────────────────────
export async function getAnalytics() {
  const res = await apiFetch(`${BASE}/inventory/analytics/`);
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch analytics");
  return data;
}

// ── AI INSIGHTS ───────────────────────────────────────────────────
export async function getAIInsights() {
  const res = await apiFetch(`${BASE}/inventory/ai-insights/`);
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch AI insights");
  return data;
}

// ── ORDERS ────────────────────────────────────────────────────────
export async function getOrders() {
  const res = await apiFetch(`${BASE}/inventory/orders/retailer/`);
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch orders");
  return data;
}

export async function createOrder(orderData) {
  const res = await apiFetch(`${BASE}/orders/`, {
    method: "POST",
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to create order");
  return data;
}

export async function updateOrder(orderId, updates) {
  const res = await apiFetch(`${BASE}/inventory/orders/retailer/${orderId}/status/`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to update order");
  return data;
}
