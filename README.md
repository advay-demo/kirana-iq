<div align="center">
  <!-- PLACEHOLDER: Put your beautiful project logo here -->
  <img src="<!-- ADD_LOGO_IMAGE_URL_HERE -->" alt="KiranaIQ Logo" width="150"/>

  # KiranaIQ 🛒🚀

  **Empowering Indian Retailers with AI, Real-time Inventory, and Distributor Networks**

  [![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-blue?style=for-the-badge&logo=react)](https://thekiranaiq.vercel.app/)
  [![Backend](https://img.shields.io/badge/Backend-Django%20REST-darkgreen?style=for-the-badge&logo=django)](https://kirana-iq-backend.onrender.com/)
  [![Live Demo](https://img.shields.io/badge/Live-Demo_Available-success?style=for-the-badge&logo=vercel)](https://thekiranaiq.vercel.app/)

  <!-- PLACEHOLDER: Put a stunning full-width screenshot of your Dashboard or Home page here -->
  <img src="<!-- ADD_DASHBOARD_SCREENSHOT_URL_HERE -->" alt="KiranaIQ Dashboard Screenshot" width="100%"/>
</div>

---

## 🌟 Overview

**KiranaIQ** is a next-generation platform built specifically for Indian Kirana stores. It bridges the gap between traditional retail and modern technology by providing store owners with an all-in-one dashboard to manage inventory, discover new distributors, and leverage Artificial Intelligence for smart business decisions.

Forget manual ledger books. With KiranaIQ, retailers can track stock levels, order directly from local distributors via a geolocation-powered marketplace, and receive AI-driven insights to maximize profits.

---

## ✨ Key Features

- **🧠 AI-Powered Insights:** Integrated with Google Gemini AI to analyze sales trends and provide actionable suggestions for restocking and pricing.
- **📦 Smart Inventory Management:** Real-time tracking of critical and low-stock items with automated alerts.
- **🤝 Distributor Marketplace:** A geolocation-based directory connecting retailers directly with nearby verified distributors.
- **🗺️ Smart Location Tracking:** Auto-detects store location using HTML5 Geolocation (with IP-based fallback) to match you with hyper-local suppliers.
- **🔐 Secure Authentication:** Enterprise-grade security powered by Clerk.

<!-- PLACEHOLDER: Put a 2x2 grid of screenshots here showing different features (e.g. AI Insights page, Inventory page, Marketplace page) -->
> **📸 See it in action:**
> <br/>*Add an image of your AI Insights page here:* `<img src="<!-- ADD_AI_SCREENSHOT_HERE -->" width="48%">`
> <br/>*Add an image of your Marketplace page here:* `<img src="<!-- ADD_MARKETPLACE_SCREENSHOT_HERE -->" width="48%">`

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js + Vite
- **Styling:** TailwindCSS
- **Routing:** React Router DOM
- **Authentication:** Clerk
- **Hosting:** Vercel

### Backend
- **Framework:** Django + Django REST Framework (DRF)
- **Database:** PostgreSQL (Production) / SQLite (Local)
- **AI Integration:** Google Gemini API
- **Hosting:** Render

---

## 🚀 Live Demo

Check out the live production build here: **[KiranaIQ on Vercel](https://thekiranaiq.vercel.app)**

*(Note: The backend is hosted on a free Render instance, so it may take ~50 seconds to wake up on your first visit!)*

---

## 💻 Local Setup & Installation

Want to run KiranaIQ locally? Follow these steps:

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- Clerk Account & API Keys
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/advay-demo/kirana-iq.git
cd kirana-iq
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt

# Create a .env file and add your GEMINI_API_KEY
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create a .env file and add your VITE_CLERK_PUBLISHABLE_KEY and VITE_API_URL
npm run dev
```

<!-- PLACEHOLDER: Put a screenshot of a happy Kirana store owner, or a mockup of your site on a mobile phone here -->
<div align="center">
  <img src="<!-- ADD_MOBILE_MOCKUP_OR_STORE_IMAGE_HERE -->" alt="KiranaIQ Mobile View" width="300"/>
</div>

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/advay-demo/kirana-iq/issues).

## 📝 License
This project is licensed under the MIT License.
