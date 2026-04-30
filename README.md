# ⚡ GadgetZone — Electronics & Gadgets E-Commerce Platform

A full-featured React e-commerce capstone project with modern state management, smart filtering, and multi-step checkout.

## 🚀 Live Demo
[Deploy to Vercel and paste link here]

## 📸 Screenshots
[Add after running locally]

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 (Vite), JavaScript ES6+ |
| State | Redux Toolkit |
| Routing | React Router v6 |
| API | FakeStore API + Axios |
| Styling | Tailwind CSS |
| Fonts | Syne + DM Sans |
| Deployment | Vercel |

---

## ✨ Features

- 🔍 **Debounced Search** — 300ms delay prevents excessive re-renders
- 🎛️ **Filter + Sort** — by category, price range, rating, sort order
- 🌙 **Dark Mode Toggle** — persisted in localStorage
- 📝 **Multi-Step Checkout** — Shipping → Payment → Review with full validation
- 🛒 **Cart CRUD** — add, remove, update quantity (persisted in localStorage)
- 📄 **Pagination** — 8 products per page
- ⚡ **Lazy Loading** — all pages loaded on demand
- 🚨 **Error Boundary** — catches and displays runtime errors
- 💀 **Loading Skeletons** — shimmer placeholders while fetching
- 📱 **Responsive** — mobile-friendly with slide-out filter drawer

---

## 📁 Project Structure

```
src/
├── api/           → Axios instance and API call functions
├── app/           → Redux store configuration
├── components/    → Navbar, Footer, ProductCard, FilterSidebar,
│                    Pagination, Skeleton, ErrorBoundary
├── features/      → cartSlice, productSlice, filterSlice, themeSlice
├── hooks/         → useDebounce.js
├── pages/         → Home, Products, ProductDetail, Cart,
│                    Checkout, OrderSuccess, NotFound
└── utils/         → helpers.js (formatPrice, getFilteredProducts, validators)
```

---

## 🏁 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/gadgetzone.git
cd gadgetzone

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
http://localhost:5173
```

---

## 🌐 Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com)

---

## 📡 API Used

[FakeStore API](https://fakestoreapi.com) — Free, no auth required
- `GET /products` — All products
- `GET /products/:id` — Single product
- `GET /products/categories` — All categories

---

## 👨‍💻 Author

Your Name — Capstone Project, Web Development Course 2024
