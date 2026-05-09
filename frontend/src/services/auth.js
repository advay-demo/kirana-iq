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