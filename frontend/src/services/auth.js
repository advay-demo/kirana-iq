const BASE = "http://127.0.0.1:8001/api";

// ── TOKEN REFRESH ─────────────────────────────────────────────────
async function refreshAccessToken() {
  const refresh = localStorage.getItem("refreshToken");
  if (!refresh) throw new Error("No refresh token");

  const res = await fetch(`${BASE}/accounts/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    // Just remove the expired access token — ProtectedRoute will redirect
    localStorage.removeItem("accessToken");
    throw new Error("Session expired. Please log in again.");
  }

  const data = await res.json();
  localStorage.setItem("accessToken", data.access);
  return data.access;
}

// ── SMART FETCH (auto-retries once after refreshing token) ─────────
export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("accessToken");

  const doRequest = (tok) =>
    fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(tok ? { Authorization: `Bearer ${tok}` } : {}),
      },
    });

  let res = await doRequest(token);

  // Auto-refresh on 401 then retry once
  if (res.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      res = await doRequest(newToken);
    } catch {
      throw new Error("Unauthorized");
    }
  }

  return res;
}

// ── AUTH ──────────────────────────────────────────────────────────
export async function loginUser(userData) {
  const res = await fetch(`${BASE}/accounts/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function retailerSignup(userData) {
  const res = await fetch(`${BASE}/accounts/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Signup failed");
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
  const res = await apiFetch(`${BASE}/orders/`);
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
  const res = await apiFetch(`${BASE}/orders/`, {
    method: "PATCH",
    body: JSON.stringify({ order_id: orderId, ...updates }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to update order");
  return data;
}
